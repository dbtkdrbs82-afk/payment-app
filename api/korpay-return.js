module.exports = function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).send('korpay-return api ok')
    return
  }

  const body = req.body || {}

  const orderId = encodeURIComponent(body.orderNumber || '')
  const amount = encodeURIComponent(body.amount || '')
  const paymentKey = encodeURIComponent(body.paymentKey || '')
  const merchantId = encodeURIComponent(body.reserved || '')

  const redirectUrl =
    'https://payment-app-ybtf.vercel.app/success' +
    '?source=kiosk' +
    '&orderId=' + orderId +
    '&amount=' + amount +
    '&paymentKey=' + paymentKey +
    '&merchantId=' + merchantId

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.status(200).send(
    '<!doctype html>' +
    '<html><head><meta charset="utf-8"></head>' +
    '<body>' +
    '<script>window.location.href="' + redirectUrl + '";</script>' +
    '결제 완료 처리 중입니다...' +
    '</body></html>'
  )
}