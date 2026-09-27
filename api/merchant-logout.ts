import type {
    VercelRequest,
    VercelResponse,
  } from '@vercel/node'
  
  export default async function handler(
    req: VercelRequest,
    res: VercelResponse
  ) {
    res.setHeader(
      'Cache-Control',
      'no-store'
    )
  
    if (req.method !== 'POST') {
      return res.status(405).json({
        success: false,
        message:
          'POST 요청만 가능합니다.',
      })
    }
  
    res.setHeader(
      'Set-Cookie',
      [
        'nxg_merchant_session=',
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