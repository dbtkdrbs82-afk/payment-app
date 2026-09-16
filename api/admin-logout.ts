import type {
    VercelRequest,
    VercelResponse,
  } from '@vercel/node'
  
  export default function handler(
    req: VercelRequest,
    res: VercelResponse
  ) {
    if (req.method !== 'POST') {
      return res.status(405).json({
        success: false,
      })
    }
  
    res.setHeader(
      'Set-Cookie',
      [
        'nxg_admin_session=',
        'Path=/',
        'HttpOnly',
        'Secure',
        'SameSite=Strict',
        'Max-Age=0',
      ].join('; ')
    )
  
    return res.status(200).json({
      success: true,
    })
  }