import type { VercelRequest, VercelResponse } from '@vercel/node'
import { compactDecrypt } from 'jose'

function getEncryptionKey() {
  const encryptionKey = process.env.TOSS_ENCRYPTION_KEY?.trim()

  if (!encryptionKey) {
    throw new Error('TOSS_ENCRYPTION_KEY가 없습니다.')
  }

  if (!/^[0-9a-fA-F]{64}$/.test(encryptionKey)) {
    throw new Error('TOSS_ENCRYPTION_KEY 형식이 올바르지 않습니다.')
  }

  return Buffer.from(encryptionKey, 'hex')
}

async function decryptPayload(
  encryptedText: string,
  encryptionKey: Buffer
) {
  const { plaintext } = await compactDecrypt(
    encryptedText,
    encryptionKey
  )

  const decodedText = new TextDecoder().decode(plaintext)

  try {
    return JSON.parse(decodedText)
  } catch {
    return decodedText
  }
}

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
    const refSellerId = String(req.query.refSellerId || '').trim()

    if (!secretKey) {
      return res.status(500).json({
        message: 'TOSS_SECRET_KEY가 없습니다.',
      })
    }

    if (!refSellerId) {
      return res.status(400).json({
        message: 'refSellerId가 없습니다.',
      })
    }

    const authorization = Buffer.from(
      `${secretKey}:`
    ).toString('base64')

    const tossResponse = await fetch(
      `https://api.tosspayments.com/v2/sellers/${encodeURIComponent(
        refSellerId
      )}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Basic ${authorization}`,
          'TossPayments-api-security-mode': 'ENCRYPTION',
        },
      }
    )

    const responseText = await tossResponse.text()

    let result: unknown

    try {
      result = await decryptPayload(
        responseText,
        getEncryptionKey()
      )
    } catch {
      try {
        result = JSON.parse(responseText)
      } catch {
        result = {
          message: responseText,
        }
      }
    }

    return res.status(tossResponse.status).json({
      success: tossResponse.ok,
      status: tossResponse.status,
      data: result,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : '셀러 조회 중 오류가 발생했습니다.',
    })
  }
}