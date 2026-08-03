import type { VercelRequest, VercelResponse } from '@vercel/node'
import { CompactEncrypt, compactDecrypt } from 'jose'
import { randomUUID } from 'crypto'

function getIssuedAt() {
  const now = new Date()

  const year = now.getUTCFullYear()
  const month = String(now.getUTCMonth() + 1).padStart(2, '0')
  const day = String(now.getUTCDate()).padStart(2, '0')
  const hour = String(now.getUTCHours()).padStart(2, '0')
  const minute = String(now.getUTCMinutes()).padStart(2, '0')
  const second = String(now.getUTCSeconds()).padStart(2, '0')

  return `${year}-${month}-${day}T${hour}:${minute}:${second}+00:00`
}

async function encryptBody(
  data: Record<string, unknown>,
  securityKey: Uint8Array
) {
  const payload = new TextEncoder().encode(
    JSON.stringify(data)
  )

  return await new CompactEncrypt(payload)
    .setProtectedHeader({
      alg: 'dir',
      enc: 'A256GCM',
      iat: getIssuedAt(),
      nonce: randomUUID()
    })
    .encrypt(securityKey)
}

async function decryptBody(
  encryptedText: string,
  securityKey: Uint8Array
) {
  const { plaintext } = await compactDecrypt(
    encryptedText,
    securityKey
  )

  const decoded = new TextDecoder().decode(plaintext)

  return JSON.parse(decoded)
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'POST 요청만 가능합니다.'
    })
  }

  const secretKey = process.env.TOSS_SECRET_KEY
  const encryptionKey = process.env.TOSS_ENCRYPTION_KEY

  if (!secretKey || !encryptionKey) {
    return res.status(500).json({
      message:
        'TOSS_SECRET_KEY 또는 TOSS_ENCRYPTION_KEY가 없습니다.'
    })
  }

  if (!/^[0-9a-fA-F]{64}$/.test(encryptionKey)) {
    return res.status(500).json({
      message: '토스 보안 키 형식이 올바르지 않습니다.'
    })
  }

  const {
    refSellerId,
    businessType,
    company,
    individual,
    account,
    metadata
  } = req.body || {}

  if (!refSellerId || !businessType || !account) {
    return res.status(400).json({
      message:
        'refSellerId, businessType, account 정보가 필요합니다.'
    })
  }

  const sellerBody: Record<string, unknown> = {
    refSellerId,
    businessType,
    account
  }

  if (company) {
    sellerBody.company = company
  }

  if (individual) {
    sellerBody.individual = individual
  }

  if (metadata) {
    sellerBody.metadata = metadata
  }

  try {
    const securityKey = new Uint8Array(
      Buffer.from(encryptionKey, 'hex')
    )

    const encryptedBody = await encryptBody(
      sellerBody,
      securityKey
    )

    const authorization =
      'Basic ' +
      Buffer.from(secretKey + ':').toString('base64')

    const tossResponse = await fetch(
      'https://api.tosspayments.com/v2/sellers',
      {
        method: 'POST',
        headers: {
          Authorization: authorization,
          'Content-Type': 'text/plain',
          'TossPayments-api-security-mode': 'ENCRYPTION'
        },
        body: encryptedBody
      }
    )

    const responseText = await tossResponse.text()

    let result: any

    try {
      result = await decryptBody(
        responseText,
        securityKey
      )
    } catch {
      try {
        result = JSON.parse(responseText)
      } catch {
        result = {
          message: responseText || '응답을 확인할 수 없습니다.'
        }
      }
    }

    if (!tossResponse.ok) {
      return res.status(tossResponse.status).json(result)
    }

    return res.status(200).json({
      success: true,
      seller: result
    })
  } catch (error) {
    console.error('토스 셀러 등록 오류:', error)

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : '토스 셀러 등록 중 오류가 발생했습니다.'
    })
  }
}