import type {
    VercelRequest,
    VercelResponse
  } from '@vercel/node'
  
  import autoPayoutHandler from './auto-payout.js'
  
  export default async function handler(
    req: VercelRequest,
    res: VercelResponse
  ) {
    req.query.pg = '토스페이먼츠'
  
    return autoPayoutHandler(
      req,
      res
    )
  }