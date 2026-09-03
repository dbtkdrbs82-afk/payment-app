import type { VercelRequest, VercelResponse } from '@vercel/node'
import autoPayoutHandler from './auto-payout'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  req.query.pg = '코페이'

  return autoPayoutHandler(req, res)
}
