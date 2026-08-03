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
  payload: Record<string, unknown>[],
  encryptionKey: Buffer
) {
  return await new CompactEncrypt(
    new TextEncoder().encode(JSON.stringify(payload))
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
        success: false,
        message: 'TOSS_SECRET_KEY가 없습니다.',
      })
    }

    const {
      destination,
      amount,
      transactionDescription,
      refPayoutId,
    } = req.body || {}

    if (!destination) {
      return res.status(400).json({
        success: false,
        message: 'destination 셀러 ID가 없습니다.',
      })
    }

    const payoutAmount = Number(amount)

    if (
      !Number.isInteger(payoutAmount) ||
      payoutAmount <= 0 ||
      payoutAmount >= 1000000000
    ) {
      return res.status(400).json({
        success: false,
        message: '지급 금액이 올바르지 않습니다.',
      })
    }

    const description = String(
      transactionDescription || 'NXG정산'
    ).trim()

    if (!description || description.length > 7) {
      return res.status(400).json({
        success: false,
        message: '적요는 1자 이상 7자 이하로 입력해주세요.',
      })
    }

    const payoutReference =
      String(refPayoutId || '').trim() ||
      `NXG-${Date.now()}-${randomUUID().slice(0, 8)}`

    const payoutData = [
      {
        refPayoutId: payoutReference,
        destination: String(destination).trim(),
        scheduleType: 'EXPRESS',
        amount: {
          currency: 'KRW',
          value: payoutAmount,
        },
        transactionDescription: description,
        metadata: {
          source: 'NXG',
        },
      },
    ]

    const encryptionKey = getEncryptionKey()

    const encryptedBody = await encryptPayload(
      payoutData,
      encryptionKey
    )

    const authorization = Buffer.from(
      `${secretKey}:`
    ).toString('base64')

    const idempotencyKey = randomUUID()

    const tossResponse = await fetch(
      'https://api.tosspayments.com/v2/payouts',
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${authorization}`,
          'Content-Type': 'text/plain',
          'TossPayments-api-security-mode': 'ENCRYPTION',
          'Idempotency-Key': idempotencyKey,
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
      refPayoutId: payoutReference,
      data: result,
    })
  } catch (error) {
    console.error('토스 지급대행 오류:', error)

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : '지급대행 요청 중 오류가 발생했습니다.',
    })
  }
}