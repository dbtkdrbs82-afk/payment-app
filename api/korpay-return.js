export default function handler(req, res) {
  const body = req.body || {}

  const orderId = encodeURIComponent(body.orderNumber || '')
  const amount = encodeURIComponent(body.amount || '')
  const paymentKey = encodeURIComponent(body.paymentKey || '')
  const merchantId = encodeURIComponent(body.reserved || '')

  const redirectUrl =
    '/success?source=kiosk&pg=코페이' +
    '&orderId=' + orderId +
    '&amount=' + amount +
    '&paymentKey=' + paymentKey +
    '&merchantId=' + merchantId

  res.status(200).send(
    '<!doctype html><html><head><meta charset="utf-8"></head><body>' +
    '<script>window.location.href="' + redirectUrl + '";</script>' +
    '결제 완료 처리 중입니다...' +
    '</body></html>'
  )
}