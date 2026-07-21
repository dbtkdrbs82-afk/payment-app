import type { VercelRequest, VercelResponse } from '@vercel/node'

function korpayDateToIso(value: unknown): string | null {
  const text = String(value || '').trim()

  if (!/^\d{14}$/.test(text)) {
    return null
  }

  const year = text.slice(0, 4)
  const month = text.slice(4, 6)
  const day = text.slice(6, 8)
  const hour = text.slice(8, 10)
  const minute = text.slice(10, 12)
  const second = text.slice(12, 14)

  return `${year}-${month}-${day}T${hour}:${minute}:${second}+09:00`
}

function normalizeBody(body: unknown): Record<string, string> {
  if (body && typeof body === 'object' && !Array.isArray(body)) {
    return Object.fromEntries(
      Object.entries(body as Record<string, unknown>).map(([key, value]) => [
        key,
        String(value ?? '')
      ])
    )
  }

  if (typeof body === 'string') {
    return Object.fromEntries(new URLSearchParams(body).entries())
  }

  return {}
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'POST only'
    })
  }

  const supabaseUrl = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({
      result: 'ERROR',
      message: 'Supabase environment variables are missing'
    })
  }

  try {
    const noti = normalizeBody(req.body)

    console.log('========== KORPAY NOTI ==========')
    console.log(noti)

    const tid = noti.tid?.trim()
const korpayMid = noti.mid?.trim()
const pgOrderNo = String(noti.ordNo || '').trim()
const cancelYN = noti.cancelYN?.toUpperCase() || 'N'
const amount = Number(noti.amt || 0)

    if (!tid) {
      return res.status(400).json({
        result: 'ERROR',
        message: 'tid가 없습니다.'
      })
    }

    if (!korpayMid) {
      return res.status(400).json({
        result: 'ERROR',
        message: 'mid가 없습니다.'
      })
    }

    if (!Number.isFinite(amount) || amount < 0) {
      return res.status(400).json({
        result: 'ERROR',
        message: '결제금액이 올바르지 않습니다.'
      })
    }

    const headers = {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json'
    }

   // 코페이 취소 Noti 처리
if (cancelYN === 'Y') {
  const originalTid =
    String(noti.otid || '').trim()

  if (!originalTid) {
    return res.status(400).json({
      result: 'ERROR',
      message: '취소 원거래 otid가 없습니다.'
    })
  }

  const originalResponse = await fetch(
    `${supabaseUrl}/rest/v1/payments` +
      `?select=id,amount,fee_rate` +
      `&payment_key=eq.${encodeURIComponent(originalTid)}` +
      `&limit=1`,
    {
      method: 'GET',
      headers
    }
  )

  const originalRows = await originalResponse.json()

  if (!originalResponse.ok) {
    return res.status(500).json({
      result: 'ERROR',
      message: '취소 원거래 조회 실패',
      detail: originalRows
    })
  }

  const originalPayment =
    Array.isArray(originalRows) && originalRows.length > 0
      ? originalRows[0]
      : null

  if (!originalPayment) {
    return res.status(404).json({
      result: 'ERROR',
      message: '취소할 원거래를 찾을 수 없습니다.',
      otid: originalTid
    })
  }

  const originalAmount =
    Number(originalPayment.amount || 0)

  const cancelAmount =
    Math.abs(amount)

  const remainingAmount =
    Math.max(originalAmount - cancelAmount, 0)

  const originalFeeRate =
    Number(originalPayment.fee_rate || 0)

  const remainingFeeAmount =
    Math.round(
      (remainingAmount * originalFeeRate) / 100
    )

  const remainingSettlementAmount =
    remainingAmount - remainingFeeAmount

  const isFullCancel =
    cancelAmount >= originalAmount

  const cancelData = {
    status: isFullCancel
      ? 'cancel'
      : 'partial_cancel',

    canceled_at:
      korpayDateToIso(noti.canDtm) ||
      new Date().toISOString(),

    original_payment_key: originalTid,
    cancel_payment_key: tid,
    cancel_amount: cancelAmount,
    cancel_reason:
      noti.canMsg ||
      noti.cancelReason ||
      '코페이 취소',

    fee_amount: isFullCancel
      ? 0
      : remainingFeeAmount,

    settlement_amount: isFullCancel
      ? 0
      : remainingSettlementAmount,

    settlement_status: isFullCancel
      ? '취소'
      : '정산대기',

    payout_status: isFullCancel
      ? '출금제외'
      : '출금대기',

    payout_excluded: isFullCancel,
    payout_excluded_reason: isFullCancel
      ? '코페이 결제취소'
      : null
  }

  const cancelResponse = await fetch(
    `${supabaseUrl}/rest/v1/payments` +
      `?id=eq.${originalPayment.id}`,
    {
      method: 'PATCH',
      headers: {
        ...headers,
        Prefer: 'return=representation'
      },
      body: JSON.stringify(cancelData)
    }
  )

  const canceledPayment =
    await cancelResponse.json()

  if (!cancelResponse.ok) {
    return res.status(500).json({
      result: 'ERROR',
      message: '코페이 취소 저장 실패',
      detail: canceledPayment
    })
  }

  return res.status(200).json({
    result: 'OK',
    canceled: true,
    fullCancel: isFullCancel,
    originalTid,
    cancelTid: tid,
    cancelAmount,
    payment: canceledPayment
  })
}

    const findResponse = await fetch(
      `${supabaseUrl}/rest/v1/payments` +
        `?select=id` +
        `&payment_key=eq.${encodeURIComponent(tid)}` +
        `&limit=1`,
      {
        method: 'GET',
        headers
      }
    )

    const existingRows = await findResponse.json()

    if (!findResponse.ok) {
      console.error('중복조회 실패:', existingRows)

      return res.status(500).json({
        result: 'ERROR',
        message: '기존 거래 조회 실패',
        detail: existingRows
      })
    }

    const merchantResponse = await fetch(
      `${supabaseUrl}/rest/v1/merchants` +
        `?select=id,merchant_name,fee_rate,manager_admin_id,manager_admin_name,agency_admin_id,agency_admin_name,branch_admin_id,branch_admin_name` +
        `&or=(` +
          `korpay_terminal_mid.eq.${encodeURIComponent(korpayMid)},` +
          `korpay_manual_mid.eq.${encodeURIComponent(korpayMid)},` +
          `korpay_pg_mid.eq.${encodeURIComponent(korpayMid)}` +
        `)` +
        `&limit=1`,
      {
        method: 'GET',
        headers
      }
    )

    const merchantRows = await merchantResponse.json()

    if (!merchantResponse.ok) {
      console.error('가맹점 조회 실패:', merchantRows)

      return res.status(500).json({
        result: 'ERROR',
        message: '가맹점 조회 실패',
        detail: merchantRows
      })
    }

    const merchant =
      Array.isArray(merchantRows) && merchantRows.length > 0
        ? merchantRows[0]
        : null

    if (!merchant) {
      console.error('등록되지 않은 코페이 단말기 MID:', korpayMid)

      return res.status(400).json({
        result: 'ERROR',
        message: '등록된 가맹점을 찾을 수 없습니다.',
        mid: korpayMid
      })
    }

    const approvedAt = korpayDateToIso(noti.appDtm)
const canceledAt = korpayDateToIso(noti.canDtm)

const feeRate = Number(merchant.fee_rate || 0)
const feeAmount = Math.round((amount * feeRate) / 100)
const settlementAmount = amount - feeAmount

const paymentData = {
      order_id: noti.ordNo || tid,
      payment_key: tid,
      pg_order_no: pgOrderNo || null,
      amount,
      status: cancelYN === 'Y' ? 'cancel' : 'paid',

      created_at:
        approvedAt ||
        canceledAt ||
        new Date().toISOString(),

      merchant_id: merchant.id,
      merchant_name: merchant.merchant_name || null,

      pg_company: '코페이',
      payment_method:
  merchant.korpay_terminal_mid === korpayMid
    ? '무선단말기'
    : merchant.korpay_manual_mid === korpayMid
    ? '수기결제'
    : '온라인인증',

      approval_number: noti.appNo || null,
      card_company: noti.fnNm || null,
      card_number: noti.cardNo || null,
      installment_months: noti.quota || '00',

      approved_at: approvedAt,
      canceled_at:
        cancelYN === 'Y'
          ? canceledAt || new Date().toISOString()
          : null,

          fee_rate: feeRate,
          fee_amount: feeAmount,
          settlement_amount: settlementAmount,

      manager_admin_id: merchant.manager_admin_id || null,
      manager_admin_name: merchant.manager_admin_name || null,

      agency_admin_id: merchant.agency_admin_id || null,
      agency_admin_name: merchant.agency_admin_name || null,

      branch_admin_id: merchant.branch_admin_id || null,
      branch_admin_name: merchant.branch_admin_name || null,

      settlement_status: '정산대기',
      payout_status: '출금대기',
      duplicate_status: '정상',

      message: noti.goodsName || '코페이 무선단말기 결제'
    }
    console.log({
      feeRate,
      feeAmount,
      settlementAmount
    })
    let saveResponse: Response

    if (Array.isArray(existingRows) && existingRows.length > 0) {
      saveResponse = await fetch(
        `${supabaseUrl}/rest/v1/payments` +
          `?payment_key=eq.${encodeURIComponent(tid)}`,
        {
          method: 'PATCH',
          headers: {
            ...headers,
            Prefer: 'return=representation'
          },
          body: JSON.stringify(paymentData)
        }
      )
    } else {
      saveResponse = await fetch(
        `${supabaseUrl}/rest/v1/payments`,
        {
          method: 'POST',
          headers: {
            ...headers,
            Prefer: 'return=representation'
          },
          body: JSON.stringify(paymentData)
        }
      )
    }

    const savedData = await saveResponse.json()

    if (!saveResponse.ok) {
      console.error('payments 저장 실패:', savedData)

      return res.status(500).json({
        result: 'ERROR',
        message: 'payments 저장 실패',
        detail: savedData
      })
    }

    return res.status(200).json({
      result: 'OK',
      saved: true,
      duplicate:
        Array.isArray(existingRows) && existingRows.length > 0,
    
      feeRate,
      feeAmount,
      settlementAmount,
    
      payment: savedData
    })
  } catch (error) {
    console.error('Korpay Noti API error:', error)

    return res.status(500).json({
      result: 'ERROR',
      message:
        error instanceof Error
          ? error.message
          : 'Unknown error'
    })
  }
}