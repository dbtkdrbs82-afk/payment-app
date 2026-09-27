import type {
  VercelRequest,
  VercelResponse,
} from '@vercel/node'

import {
  createHmac,
  timingSafeEqual,
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

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader(
    'Cache-Control',
    'no-store'
  )

  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message:
        'GET 요청만 가능합니다.',
    })
  }

  /*
   * 자동정산 / 자동회수 인증
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
   * 관리자 인증
   */
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
          '잔액 조회 권한이 없습니다.',
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
          '대표관리자만 잔액을 조회할 수 있습니다.',
      })
    }
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

    const tossAuthorization =
      Buffer.from(
        `${secretKey}:`
      ).toString('base64')

    const tossResponse =
      await fetch(
        'https://api.tosspayments.com/v2/balances',
        {
          method: 'GET',
          headers: {
            Authorization:
              `Basic ${tossAuthorization}`,
            'Content-Type':
              'application/json',
          },
        }
      )

    const responseText =
      await tossResponse.text()

    let result: unknown

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

    return res
      .status(
        tossResponse.status
      )
      .json({
        success:
          tossResponse.ok,
        status:
          tossResponse.status,
        data:
          result,
      })
  } catch (error) {
    console.error(
      '토스 잔액 조회 오류:',
      error
    )

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : '잔액 조회 중 오류가 발생했습니다.',
    })
  }
}