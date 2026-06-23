export default function handler(req: any, res: any) {
    res.writeHead(302, {
      Location: '/kiosk-success'
    })
    res.end()
  }