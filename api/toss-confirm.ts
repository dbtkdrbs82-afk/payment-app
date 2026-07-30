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