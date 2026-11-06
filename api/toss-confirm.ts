import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: '허용되지 않은 요청입니다.'
    })
  }

  const secretKey = process.env.TOSS_SECRET_KEY

  if (!secretKey) {
    return res.status(500).json({
      message: '토스 Secret Key가 없습니다.'
    })
  }

  const { paymentKey, orderId, amount } = req.body

  if (!paymentKey || !orderId || !amount) {
    return res.status(400).json({
      message: '결제 승인 정보가 부족합니다.'
    })
  }

  const authorization =
    'Basic ' +
    Buffer.from(secretKey + ':').toString('base64')

  try {
    /* NXG_SMS_AMOUNT_GUARD */
    if (String(orderId || '').startsWith('SMSTOSS')) {
      if (
        !/^SMSTOSS[0-9a-f]{24}$/.test(String(orderId)) ||
        !Number.isSafeInteger(Number(amount)) ||
        Number(amount) < 100
      ) {
        return res.status(400).json({
          message: 'SMS 결제 주문정보가 올바르지 않습니다.'
        })
      }

      const dbUrl = String(
        process.env.SUPABASE_URL ||
        process.env.VITE_SUPABASE_URL ||
        ''
      ).replace(/\/$/, '')

      const dbKey = String(
        process.env.SUPABASE_SERVICE_ROLE_KEY || ''
      )

      if (!dbUrl || !dbKey) {
        return res.status(503).json({
          message: 'SMS 결제정보 검증 서버 설정 오류'
        })
      }

      const query = new URLSearchParams({
        select: 'merchant_id,amount,status,payment_method',
        pg_order_id: `eq.${orderId}`,
        limit: '2'
      })

      const checkResponse = await fetch(
        `${dbUrl}/rest/v1/sms_payment_requests?${query}`,
        {
          headers: {
            apikey: dbKey,
            Authorization: `Bearer ${dbKey}`
          },
          cache: 'no-store'
        }
      )

      if (!checkResponse.ok) {
        return res.status(503).json({
          message: 'SMS 결제금액 확인에 실패했습니다.'
        })
      }

      const rows = await checkResponse.json()

      if (
        !Array.isArray(rows) ||
        rows.length !== 1 ||
        rows[0].status !== 'processing' ||
        rows[0].payment_method !== 'mobile' ||
        Number(rows[0].amount) !== Number(amount)
      ) {
        return res.status(409).json({
          message: 'SMS 결제요청 금액 또는 상태가 일치하지 않습니다.'
        })
      }
    }

    const tossResponse = await fetch(
      'https://api.tosspayments.com/v1/payments/confirm',
      {
        method: 'POST',
        headers: {
          Authorization: authorization,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          paymentKey,
          orderId,
          amount: Number(amount)
        })
      }
    )

    const result = await tossResponse.json()

    if (!tossResponse.ok) {
      return res.status(tossResponse.status).json(result)
    }

    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({
      message: '토스 결제 승인 실패'
    })
  }
}