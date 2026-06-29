export default async function handler(req: any, res: any) {
  const body = req.body || {}

  const params = new URLSearchParams({
    source: 'kiosk',
    orderId: body.orderNumber || '',
    amount: body.amount || '',
    paymentKey: body.paymentKey || '',
    merchantId: body.reserved || '',
  })

  const redirectUrl = `/success?${params.toString()}`

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.status(200).send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <script>
          window.location.href = "${redirectUrl}";
        </script>
      </head>
      <body>
        결제 완료 처리 중입니다...
      </body>
    </html>
  `)
}