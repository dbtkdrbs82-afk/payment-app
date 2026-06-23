export default function handler(req: any, res: any) {
  res.status(200).json({
    ok: true,
    method: req.method,
    body: req.body,
    query: req.query
  })
}