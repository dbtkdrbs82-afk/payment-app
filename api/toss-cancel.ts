import type { VercelRequest, VercelResponse } from '@vercel/node'

type PaymentRow = {
  id: number
  status: string | null
  payment_key: string | null
}

async function readJson(response: Response) {
  const text = await response.text()

  if (!text) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch {
    return {
      raw: text
    }
  }
}

function isAlreadyCanceledTossError(data: any) {
  const code =
    String(data?.code || '').toUpperCase()

  const message =
    String(data?.message || '')

  return (
    code.includes('ALREADY') ||
    (
      message.includes('이미') &&
      message.includes('취소')
    )
  )
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'POST 요청만 가능합니다.'
    })
  }

  const paymentKey =
    String(req.body?.paymentKey || '').trim()

  const cancelReason =
    String(req.body?.cancelReason || '관리자 취소')
      .trim()
      .slice(0, 200)

  if (!paymentKey) {
    return res.status(400).json({
      success: false,
      message: 'paymentKey가 없습니다.'
    })
  }

  const secretKey =
    process.env.TOSS_SECRET_KEY

  const supabaseUrl =
    process.env.SUPABASE_URL

  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!secretKey) {
    return res.status(500).json({
      success: false,
      message: 'TOSS_SECRET_KEY가 설정되지 않았습니다.'
    })
  }

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({
      success: false,
      message: 'Supabase 환경변수가 설정되지 않았습니다.'
    })
  }

  const supabaseHeaders = {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    'Content-Type': 'application/json'
  }

  try {
    const encodedPaymentKey =
      encodeURIComponent(paymentKey)

    const paymentResponse = await fetch(
      `${supabaseUrl}/rest/v1/payments` +
        `?select=id,status,payment_key` +
        `&payment_key=eq.${encodedPaymentKey}` +
        `&limit=1`,
      {
        method: 'GET',
        headers: supabaseHeaders
      }
    )

    const paymentRows =
      await readJson(paymentResponse)

    if (!paymentResponse.ok) {
      return res.status(500).json({
        success: false,
        message: '결제정보 조회에 실패했습니다.',
        detail: paymentRows
      })
    }

    const payment: PaymentRow | null =
      Array.isArray(paymentRows) &&
      paymentRows.length > 0
        ? paymentRows[0]
        : null

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'paymentKey와 연결된 결제를 찾지 못했습니다.'
      })
    }

    let tossData: any = null
    let tossAlreadyCanceled = false

    const dbAlreadyCanceled =
      payment.status === 'cancel' ||
      payment.status === '취소'

    if (!dbAlreadyCanceled) {
      const encodedSecretKey = Buffer
        .from(secretKey + ':')
        .toString('base64')

      const tossResponse = await fetch(
        'https://api.tosspayments.com/v1/payments/' +
          encodeURIComponent(paymentKey) +
          '/cancel',
        {
          method: 'POST',
          headers: {
            Authorization: 'Basic ' + encodedSecretKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cancelReason
          })
        }
      )

      tossData =
        await readJson(tossResponse)

      tossAlreadyCanceled =
        !tossResponse.ok &&
        isAlreadyCanceledTossError(tossData)

      if (!tossResponse.ok && !tossAlreadyCanceled) {
        return res.status(tossResponse.status).json({
          success: false,
          message:
            tossData?.message ||
            '토스 취소 요청에 실패했습니다.',
          toss: tossData
        })
      }
    }

    const canceledAt =
      (
        Array.isArray(tossData?.cancels) &&
        tossData.cancels[0]?.canceledAt
      )
        ? tossData.cancels[0].canceledAt
        : new Date().toISOString()

    const updateResponse = await fetch(
      `${supabaseUrl}/rest/v1/payments` +
        `?payment_key=eq.${encodedPaymentKey}`,
      {
        method: 'PATCH',
        headers: {
          ...supabaseHeaders,
          Prefer: 'return=representation'
        },
        body: JSON.stringify({
          status: 'cancel',
          canceled_at: canceledAt,
          fee_amount: 0,
          settlement_amount: 0,
          settlement_status: '취소',
          payout_status: '출금제외'
        })
      }
    )

    const updatedPayment =
      await readJson(updateResponse)

    if (!updateResponse.ok) {
      return res.status(500).json({
        success: false,
        message:
          '토스 취소는 되었지만 우리 DB 반영에 실패했습니다.',
        toss: tossData,
        detail: updatedPayment
      })
    }

    let cancelRequestWarning = ''

    const cancelRequestResponse = await fetch(
      `${supabaseUrl}/rest/v1/cancel_requests` +
        `?payment_id=eq.${payment.id}` +
        `&status=eq.${encodeURIComponent('요청중')}`,
      {
        method: 'PATCH',
        headers: {
          ...supabaseHeaders,
          Prefer: 'return=minimal'
        },
        body: JSON.stringify({
          status: '승인완료',
          processed_at: new Date().toISOString()
        })
      }
    )

    if (!cancelRequestResponse.ok) {
      const cancelRequestError =
        await readJson(cancelRequestResponse)

      cancelRequestWarning =
        '취소요청 상태 변경 실패: ' +
        (
          cancelRequestError?.message ||
          '알 수 없는 오류'
        )
    }

    return res.status(200).json({
      success: true,
      message:
        tossAlreadyCanceled || dbAlreadyCanceled
          ? '이미 취소된 토스 결제를 우리 DB에 보정했습니다.'
          : '토스 결제 취소와 DB 반영이 완료되었습니다.',
      paymentId: payment.id,
      paymentKey,
      tossAlreadyCanceled,
      dbAlreadyCanceled,
      cancelRequestWarning,
      toss: tossData,
      payment: updatedPayment
    })
  } catch (error) {
    console.error('Toss cancel API error:', error)

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : '토스 취소 처리 중 오류가 발생했습니다.'
    })
  }
}