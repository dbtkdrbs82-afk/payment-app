import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      message: 'GET 요청만 가능합니다.',
    })
  }

  try {
    const secretKey = process.env.TOSS_SECRET_KEY?.trim()

    if (!secretKey) {
      return res.status(500).json({
        success: false,
        message: 'TOSS_SECRET_KEY가 없습니다.',
      })
    }

    const authorization = Buffer.from(
      `${secretKey}:`
    ).toString('base64')

    const tossResponse = await fetch(
        'https://api.tosspayments.com/v2/balances',
      {
        method: 'GET',
        headers: {
          Authorization: `Basic ${authorization}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const responseText = await tossResponse.text()

    let result: unknown

    try {
      result = JSON.parse(responseText)
    } catch {
      result = {
        message: responseText,
      }
    }

    return res.status(tossResponse.status).json({
      success: tossResponse.ok,
      status: tossResponse.status,
      data: result,
    })
  } catch (error) {
    console.error('토스 잔액 조회 오류:', error)

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : '잔액 조회 중 오류가 발생했습니다.',
    })
  }
}