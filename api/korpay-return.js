module.exports = function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).send('korpay-return api ok')
    return
  }

  const body = req.body || {}

  const params = new URLSearchParams({
    source: 'kiosk',
    orderId: body.orderNumber || '',
    amount: body.amount || '',
    paymentKey: body.paymentKey || '',
    merchantId: body.reserved || '',
  })

  const redirectUrl =
    'https://payment-app-ybtf.vercel.app/success?' + params.toString()

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.status(200).send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <script>
          window.location.replace("${redirectUrl}");
        </script>
      </head>
      <body>결제 완료 처리 중입니다...</body>
    </html>
  `)
}