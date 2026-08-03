import type { VercelRequest, VercelResponse } from '@vercel/node'
import { CompactEncrypt, compactDecrypt } from 'jose'
import { randomUUID } from 'crypto'

function getIssuedAt() {
  return new Date()
    .toISOString()
    .replace(/\.\d{3}Z$/, '+00:00')
}

function getEncryptionKey() {
  const encryptionKey = process.env.TOSS_ENCRYPTION_KEY?.trim()

  if (!encryptionKey) {
    throw new Error('TOSS_ENCRYPTION_KEY가 없습니다.')
  }

  if (!/^[0-9a-fA-F]{64}$/.test(encryptionKey)) {
    throw new Error(
      'TOSS_ENCRYPTION_KEY는 64자리 Hex 문자열이어야 합니다.'
    )
  }

  return Buffer.from(encryptionKey, 'hex')
}

async function encryptPayload(
  payload: Record<string, unknown>,
  encryptionKey: Buffer
) {
  const text = JSON.stringify(payload)

  return await new CompactEncrypt(
    new TextEncoder().encode(text)
  )
    .setProtectedHeader({
      alg: 'dir',
      enc: 'A256GCM',
      iat: getIssuedAt(),
      nonce: randomUUID(),
    })
    .encrypt(encryptionKey)
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
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'POST 요청만 가능합니다.',
    })
  }

  try {
    const secretKey = process.env.TOSS_SECRET_KEY?.trim()

    if (!secretKey) {
      return res.status(500).json({
        message: 'TOSS_SECRET_KEY가 없습니다.',
      })
    }

    const {
      refSellerId,
      businessType,
      company,
      individual,
      account,
      metadata,
    } = req.body || {}

    if (!refSellerId) {
      return res.status(400).json({
        message: 'refSellerId가 없습니다.',
      })
    }

    if (!businessType) {
      return res.status(400).json({
        message: 'businessType이 없습니다.',
      })
    }

    if (!account) {
      return res.status(400).json({
        message: 'account 정보가 없습니다.',
      })
    }

    const sellerData: Record<string, unknown> = {
      refSellerId,
      businessType,
      account,
    }

    if (company) {
      sellerData.company = company
    }

    if (individual) {
      sellerData.individual = individual
    }

    if (metadata) {
      sellerData.metadata = metadata
    }

    const encryptionKey = getEncryptionKey()
    const encryptedBody = await encryptPayload(
      sellerData,
      encryptionKey
    )

    const authorization = Buffer.from(
      `${secretKey}:`
    ).toString('base64')

    const tossResponse = await fetch(
      'https://api.tosspayments.com/v2/sellers',
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${authorization}`,
          'Content-Type': 'text/plain',
          'TossPayments-api-security-mode': 'ENCRYPTION',
        },
        body: encryptedBody,
      }
    )

    const responseText = await tossResponse.text()

    let result: unknown

    try {
      result = await decryptPayload(
        responseText,
        encryptionKey
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
    console.error('토스 셀러 등록 오류:', error)

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : '셀러 등록 중 오류가 발생했습니다.',
    })
  }
}