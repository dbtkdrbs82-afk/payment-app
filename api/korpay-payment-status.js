// 결제완료 화면 진입 전 코페이 승인 저장 여부를 서버에서 확인합니다.
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'GET') return res.status(405).json({ verified: false })

  const orderId = String(req.query.orderId || '')
  const paymentKey = String(req.query.paymentKey || '')
  const merchantId = Number(req.query.merchantId || 0)
  if (!/^[a-zA-Z0-9_-]{6,100}$/.test(orderId) || !paymentKey || paymentKey.length > 200 || !Number.isSafeInteger(merchantId) || merchantId <= 0) {
    return res.status(400).json({ verified: false })
  }

  const base = String(process.env.SUPABASE_URL || '').replace(/\/$/, '')
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!base || !key) return res.status(503).json({ verified: false })

  try {
    const params = new URLSearchParams({
      select: 'id,amount,status,pg_company,merchant_id',
      order_id: `eq.${orderId}`,
      payment_key: `eq.${paymentKey}`,
      merchant_id: `eq.${merchantId}`,
      limit: '2'
    })
    const response = await fetch(`${base}/rest/v1/payments?${params}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: 'no-store'
    })
    if (!response.ok) return res.status(502).json({ verified: false })

    const rows = await response.json()
    const payment = rows.length === 1 ? rows[0] : null
    if (!payment || payment.status !== 'paid' || payment.pg_company !== '코페이') {
      return res.status(404).json({ verified: false })
    }
    return res.status(200).json({ verified: true, id: payment.id, amount: Number(payment.amount), merchantId: Number(payment.merchant_id) })
  } catch (error) {
    console.error('[Korpay] 결제조회 오류', error?.message)
    return res.status(502).json({ verified: false })
  }
}
