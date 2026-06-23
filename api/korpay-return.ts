export default function handler(req: any, res: any) {
  const orderNo = req.body?.orderNumber || req.body?.orderNo || req.query?.orderNo || ''

  res.writeHead(302, {
    Location: '/kiosk-success?orderNo=' + encodeURIComponent(orderNo)
  })
  res.end()
}