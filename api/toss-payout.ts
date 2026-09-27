import type {
  VercelRequest,
  VercelResponse,
} from '@vercel/node'

import {
  CompactEncrypt,
  compactDecrypt,
} from 'jose'

import {
  createHmac,
  timingSafeEqual,
  randomUUID,
} from 'crypto'

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL =
  process.env.SUPABASE_URL?.trim() ||
  process.env.VITE_SUPABASE_URL?.trim() ||
  ''

const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
  ''

const ADMIN_SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET?.trim() ||
  ''

function getCookie(
  cookieHeader: string | undefined,
  name: string
) {
  if (!cookieHeader) return ''

  for (
    const cookie of cookieHeader.split(';')
  ) {
    const [key, ...rest] =
      cookie.trim().split('=')

    if (key === name) {
      return rest.join('=')
    }
  }

  return ''
}

function verifyAdminSession(
  token: string
) {
  if (
    !token ||
    !ADMIN_SESSION_SECRET
  ) {
    return null
  }

  const parts =
    token.split('.')

  if (parts.length !== 2) {
    return null
  }

  const [
    body,
    signature,
  ] = parts

  const expectedSignature =
    createHmac(
      'sha256',
      ADMIN_SESSION_SECRET
    )
      .update(body)
      .digest('base64url')

  const receivedBuffer =
    Buffer.from(signature)

  const expectedBuffer =
    Buffer.from(
      expectedSignature
    )

  if (
    receivedBuffer.length !==
      expectedBuffer.length ||
    !timingSafeEqual(
      receivedBuffer,
      expectedBuffer
    )
  ) {
    return null
  }

  try {
    const payload =
      JSON.parse(
        Buffer.from(
          body,
          'base64url'
        ).toString('utf8')
      )

    if (
      !payload?.id ||
      !payload?.login_id ||
      !payload?.exp ||
      Number(payload.exp) <
        Date.now()
    ) {
      return null
    }

    return payload
  } catch {
    return null
  }
}

function getIssuedAt() {
  return new Date()
    .toISOString()
    .replace(
      /\.\d{3}Z$/,
      '+00:00'
    )
}

function getEncryptionKey() {
  const encryptionKey =
    process.env
      .TOSS_ENCRYPTION_KEY
      ?.trim()

  if (!encryptionKey) {
    throw new Error(
      'TOSS_ENCRYPTION_KEY가 없습니다.'
    )
  }

  if (
    !/^[0-9a-fA-F]{64}$/.test(
      encryptionKey
    )
  ) {
    throw new Error(
      'TOSS_ENCRYPTION_KEY는 64자리 Hex 문자열이어야 합니다.'
    )
  }

  return Buffer.from(
    encryptionKey,
    'hex'
  )
}

async function encryptPayload(
  payload: Record<
    string,
    unknown
  >[],
  encryptionKey: Buffer
) {
  return await new CompactEncrypt(
    new TextEncoder().encode(
      JSON.stringify(payload)
    )
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
  const { plaintext } =
    await compactDecrypt(
      encryptedText,
      encryptionKey
    )

  const decodedText =
    new TextDecoder().decode(
      plaintext
    )

  try {
    return JSON.parse(
      decodedText
    )
  } catch {
    return decodedText
  }
}

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

  /*
   * 인증 방식 1
   * 서버 자동정산 / 자동회수
   */
  const cronSecret =
    process.env.CRON_SECRET?.trim() ||
    ''

  const authorization =
    String(
      req.headers.authorization ||
      ''
    )

  const isCronAuthorized =
    !!cronSecret &&
    authorization ===
      `Bearer ${cronSecret}`

  /*
   * 인증 방식 2
   * 관리자 브라우저
   */
  let isMasterAuthorized = false

  if (!isCronAuthorized) {
    const token =
      getCookie(
        req.headers.cookie,
        'nxg_admin_session'
      )

    const adminSession =
      verifyAdminSession(token)

    if (!adminSession) {
      return res.status(401).json({
        success: false,
        message:
          '지급 요청 권한이 없습니다.',
      })
    }

    if (
      !SUPABASE_URL ||
      !SUPABASE_SERVICE_ROLE_KEY
    ) {
      return res.status(500).json({
        success: false,
        message:
          '서버 설정 오류입니다.',
      })
    }

    const supabase =
      createClient(
        SUPABASE_URL,
        SUPABASE_SERVICE_ROLE_KEY,
        {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          },
        }
      )

    const {
      data: actor,
      error: actorError,
    } =
      await supabase
        .from('admin_users')
        .select(`
          id,
          login_id,
          role,
          status
        `)
        .eq(
          'id',
          Number(
            adminSession.id
          )
        )
        .eq(
          'login_id',
          String(
            adminSession.login_id
          )
        )
        .eq(
          'status',
          '사용중'
        )
        .maybeSingle()

    if (
      actorError ||
      !actor
    ) {
      return res.status(401).json({
        success: false,
        message:
          '관리자 인증정보가 올바르지 않습니다.',
      })
    }

    if (
      actor.role !== 'MASTER' ||
      actor.login_id !==
        'NXGMASTER16'
    ) {
      return res.status(403).json({
        success: false,
        message:
          '대표관리자만 지급 처리를 할 수 있습니다.',
      })
    }

    isMasterAuthorized = true
  }

  if (
    !isCronAuthorized &&
    !isMasterAuthorized
  ) {
    return res.status(403).json({
      success: false,
      message:
        '지급 요청 권한이 없습니다.',
    })
  }

  try {
    const secretKey =
      process.env
        .TOSS_SECRET_KEY
        ?.trim()

    if (!secretKey) {
      return res.status(500).json({
        success: false,
        message:
          'TOSS_SECRET_KEY가 없습니다.',
      })
    }

    const {
      destination,
      amount,
      transactionDescription,
      refPayoutId,
    } =
      req.body || {}

    if (!destination) {
      return res.status(400).json({
        success: false,
        message:
          'destination 셀러 ID가 없습니다.',
      })
    }

    const payoutAmount =
      Number(amount)

    if (
      !Number.isInteger(
        payoutAmount
      ) ||
      payoutAmount <= 0 ||
      payoutAmount >=
        1000000000
    ) {
      return res.status(400).json({
        success: false,
        message:
          '지급 금액이 올바르지 않습니다.',
      })
    }

    const description =
      String(
        transactionDescription ||
        'NXG정산'
      ).trim()

    if (
      !description ||
      description.length > 7
    ) {
      return res.status(400).json({
        success: false,
        message:
          '적요는 1자 이상 7자 이하로 입력해주세요.',
      })
    }

    const payoutReference =
      String(
        refPayoutId || ''
      ).trim() ||
      `NXG-${Date.now()}-${randomUUID().slice(0, 8)}`

    const payoutData = [
      {
        refPayoutId:
          payoutReference,

        destination:
          String(
            destination
          ).trim(),

        scheduleType:
          'EXPRESS',

        amount: {
          currency: 'KRW',
          value:
            payoutAmount,
        },

        transactionDescription:
          description,

        metadata: {
          source: 'NXG',
        },
      },
    ]

    const encryptionKey =
      getEncryptionKey()

    const encryptedBody =
      await encryptPayload(
        payoutData,
        encryptionKey
      )

    const tossAuthorization =
      Buffer.from(
        `${secretKey}:`
      ).toString('base64')

    const idempotencyKey =
      randomUUID()

    const tossResponse =
      await fetch(
        'https://api.tosspayments.com/v2/payouts',
        {
          method: 'POST',

          headers: {
            Authorization:
              `Basic ${tossAuthorization}`,

            'Content-Type':
              'text/plain',

            'TossPayments-api-security-mode':
              'ENCRYPTION',

            'Idempotency-Key':
              idempotencyKey,
          },

          body:
            encryptedBody,
        }
      )

    const responseText =
      await tossResponse.text()

    let result: unknown

    try {
      result =
        await decryptPayload(
          responseText,
          encryptionKey
        )
    } catch {
      try {
        result =
          JSON.parse(
            responseText
          )
      } catch {
        result = {
          message:
            responseText,
        }
      }
    }

    return res
      .status(
        tossResponse.status
      )
      .json({
        success:
          tossResponse.ok,

        status:
          tossResponse.status,

        refPayoutId:
          payoutReference,

        data:
          result,
      })
  } catch (error) {
    console.error(
      '토스 지급대행 오류:',
      error
    )

    return res.status(500).json({
      success: false,

      message:
        error instanceof Error
          ? error.message
          : '지급대행 요청 중 오류가 발생했습니다.',
    })
  }
}