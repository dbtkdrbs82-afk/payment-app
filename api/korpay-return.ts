export default async function handler(req: any, res: any) {
  const body = req.body || {}

  const params = new URLSearchParams({
    source: 'kiosk',
    orderId: body.orderNumber || '',
    amount: body.amount || '',
    paymentKey: body.paymentKey || '',
    merchantId: body.reserved || '',
  })

  res.writeHead(302, {
    Location: `/success?${params.toString()}`
  })

  res.end()
}