import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'POST only' })
  }

  const { paymentKey, secretKey, cancelReason } = req.body || {}

  if (!paymentKey || !secretKey) {
    return res.status(400).json({
      message: 'paymentKey 또는 secretKey가 없습니다.'
    })
  }

  const encodedSecretKey = Buffer
    .from(secretKey + ':')
    .toString('base64')

  const response = await fetch(
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
        cancelReason: cancelReason || '관리자 취소'
      })
    }
  )

  const data = await response.json()

  if (!response.ok) {
    return res.status(response.status).json(data)
  }

  return res.status(200).json(data)
}