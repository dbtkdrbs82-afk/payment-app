import type {
    VercelRequest,
    VercelResponse
  } from '@vercel/node'
  
  type PaymentRow = {
    id: number
    amount: number | string | null
    status: string | null
    pg_order_no: string | null
    pg_mid: string | null
    order_id: string | null
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
  
    const supabaseUrl =
      process.env.SUPABASE_URL
  
    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY
  
    if (!supabaseUrl || !serviceRoleKey) {
      return res.status(500).json({
        success: false,
        message:
          'Supabase 환경변수가 설정되지 않았습니다.'
      })
    }
  
    try {
      const paymentId =
        Number(req.body?.paymentId || 0)
  
      const cancelName =
        String(req.body?.cancelName || '가맹점')
          .trim()
          .slice(0, 30)
  
      const cancelMessage =
        String(
          req.body?.cancelMessage ||
          '가맹점 결제취소'
        )
          .trim()
          .slice(0, 100)
  
      if (
        !Number.isInteger(paymentId) ||
        paymentId <= 0
      ) {
        return res.status(400).json({
          success: false,
          message: '결제 ID가 올바르지 않습니다.'
        })
      }
  
      const supabaseHeaders = {
        apikey: serviceRoleKey,
        Authorization:
          `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json'
      }
  
      /* 취소할 결제 조회 */
      const paymentResponse = await fetch(
        `${supabaseUrl}/rest/v1/payments` +
          `?select=id,amount,status,pg_order_no,pg_mid,order_id` +
          `&id=eq.${paymentId}` +
          `&limit=1`,
        {
          method: 'GET',
          headers: supabaseHeaders
        }
      )
  
      const paymentRows =
        await paymentResponse.json()
  
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
          message: '취소할 결제를 찾을 수 없습니다.'
        })
      }
  
      if (
        payment.status === 'cancel' ||
        payment.status === '취소'
      ) {
        return res.status(400).json({
          success: false,
          message: '이미 취소된 결제입니다.'
        })
      }
  
      const pgOrderNo =
        String(payment.pg_order_no || '').trim()
  
      const pgMid =
        String(payment.pg_mid || '').trim()
  
      const cancelAmount =
        Number(payment.amount || 0)
  
      if (!pgOrderNo) {
        return res.status(400).json({
          success: false,
          message:
            '코페이 주문번호가 저장되지 않았습니다.'
        })
      }
  
      if (!pgMid) {
        return res.status(400).json({
          success: false,
          message:
            '결제에 사용된 코페이 MID가 없습니다.'
        })
      }
  
      if (
        !Number.isFinite(cancelAmount) ||
        cancelAmount <= 0
      ) {
        return res.status(400).json({
          success: false,
          message: '취소금액이 올바르지 않습니다.'
        })
      }
  
      const korpayCancelUrl =
        process.env.KORPAY_CANCEL_URL ||
        'https://staging-pgapi.korpay.com/api/cancel'
  
      /* 코페이에 실제 취소 요청 */
      const korpayResponse = await fetch(
        korpayCancelUrl,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ordNo: pgOrderNo,
            canAmt: String(cancelAmount),
            mid: pgMid,
            canNm: cancelName,
            canMsg: cancelMessage,
            partCanFlg: '0'
          })
        }
      )
  
      const responseText =
        await korpayResponse.text()
  
      let korpayData: Record<string, unknown>
  
      try {
        korpayData =
          JSON.parse(responseText)
      } catch {
        korpayData = {
          raw: responseText
        }
      }
  
      if (!korpayResponse.ok) {
        return res.status(502).json({
          success: false,
          message:
            '코페이 취소 서버 요청에 실패했습니다.',
          detail: korpayData
        })
      }
  
      const resultCode =
        String(
          korpayData.res_code ||
          korpayData.resCode ||
          ''
        ).trim()
  
      const resultMessage =
        String(
          korpayData.res_msg ||
          korpayData.resMsg ||
          '코페이 취소 실패'
        )
  
      if (resultCode !== '0000') {
        return res.status(400).json({
          success: false,
          message: resultMessage,
          resultCode,
          korpay: korpayData
        })
      }
  
      /*
        코페이 취소 성공 즉시 우리 DB도 반영.
        이후 취소 Noti가 들어와도 같은 거래를
        다시 취소 상태로 갱신하므로 문제없음.
      */
      const canceledAt =
        new Date().toISOString()
  
      const updateResponse = await fetch(
        `${supabaseUrl}/rest/v1/payments` +
          `?id=eq.${payment.id}`,
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
        await updateResponse.json()
  
      if (!updateResponse.ok) {
        return res.status(500).json({
          success: false,
          message:
            '코페이 취소는 성공했지만 우리 결제정보 수정에 실패했습니다.',
          korpay: korpayData,
          detail: updatedPayment
        })
      }
  
      return res.status(200).json({
        success: true,
        message: '코페이 결제가 취소되었습니다.',
  
        paymentId: payment.id,
        cancelAmount,
        canceledAt,
  
        resultCode,
        cancelDate:
          korpayData.cancel_date || null,
        cancelTime:
          korpayData.cancel_time || null,
        cancelTid:
          korpayData.tid || null,
        originalTid:
          korpayData.otid || null,
  
        payment: updatedPayment
      })
    } catch (error) {
      console.error(
        'Korpay cancel API error:',
        error
      )
  
      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : '코페이 취소 처리 중 오류가 발생했습니다.'
      })
    }
  }