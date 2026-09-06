import type {
    VercelRequest,
    VercelResponse
  } from '@vercel/node'
  
  
  export default async function handler(
    req: VercelRequest,
    res: VercelResponse
  ) {
  
    if (req.method !== 'POST') {
  
      return res.status(405).json({
        success: false,
        message: 'POST 요청만 가능합니다.'
      })
    }
  
  
    try {
  
      const secretKey =
        process.env.TOSS_SECRET_KEY?.trim()
  
  
      if (!secretKey) {
  
        return res.status(500).json({
          success: false,
          message: 'TOSS_SECRET_KEY가 없습니다.'
        })
      }
  
  
      const receiptKey =
        String(
          req.body?.receiptKey || ''
        ).trim()
  
  
      if (!receiptKey) {
  
        return res.status(400).json({
          success: false,
          message: '현금영수증 receiptKey가 없습니다.'
        })
      }
  
  
      const authorization =
        Buffer.from(
          `${secretKey}:`
        ).toString('base64')
  
  
      const tossResponse =
        await fetch(
          `https://api.tosspayments.com/v1/cash-receipts/${encodeURIComponent(
            receiptKey
          )}/cancel`,
          {
            method: 'POST',
  
            headers: {
              Authorization:
                `Basic ${authorization}`,
  
              'Content-Type':
                'application/json'
            },
  
            body:
              JSON.stringify({})
          }
        )
  
  
      const responseText =
        await tossResponse.text()
  
  
      let result: any
  
  
      try {
  
        result =
          JSON.parse(
            responseText
          )
  
      } catch {
  
        result = {
          message:
            responseText
        }
      }
  
  
      if (!tossResponse.ok) {
  
        return res
          .status(tossResponse.status)
          .json({
            success: false,
  
            message:
              result?.message ||
              '현금영수증 취소에 실패했습니다.',
  
            data:
              result
          })
      }
  
  
      return res.status(200).json({
        success: true,
        data: result
      })
  
  
    } catch (error) {
  
      console.error(
        '현금영수증 취소 오류:',
        error
      )
  
  
      return res.status(500).json({
        success: false,
  
        message:
          error instanceof Error
            ? error.message
            : '현금영수증 취소 중 오류가 발생했습니다.'
      })
    }
  }