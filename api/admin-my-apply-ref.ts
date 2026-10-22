import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'
import { createHmac, timingSafeEqual } from 'crypto'

const SUPABASE_URL =
  process.env.SUPABASE_URL?.trim() ||
  process.env.VITE_SUPABASE_URL?.trim() ||
  ''

const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || ''

const ADMIN_SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET?.trim() || ''

function readCookie(
  header: string | undefined,
  name: string
): string {
  if (!header) return ''

  const cookie = header.split(';').find((part) =>
    part.trim().startsWith(name + '=')
  )

  return cookie
    ? cookie.trim().slice(name.length + 1)
    : ''
}

function verifyAdminSession(token: string) {
  if (!token || !ADMIN_SESSION_SECRET) return null

  const parts = token.split('.')
  if (parts.length !== 2) return null

  const [body, signature] = parts

  const expected = createHmac(
    'sha256',
    ADMIN_SESSION_SECRET
  )
    .update(body)
    .digest('base64url')

  const received = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expected)

  if (
    received.length !== expectedBuffer.length ||
    !timingSafeEqual(received, expectedBuffer)
  ) {
    return null
  }

  try {
    const payload = JSON.parse(
      Buffer.from(body, 'base64url').toString('utf8')
    )

    if (
      !payload?.id ||
      !payload?.login_id ||
      !payload?.exp ||
      Number(payload.exp) < Date.now()
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
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'GET 요청만 가능합니다.'
    })
  }

  if (
    !SUPABASE_URL ||
    !SUPABASE_SERVICE_ROLE_KEY ||
    !ADMIN_SESSION_SECRET
  ) {
    return res.status(500).json({
      success: false,
      message: '서버 설정 오류입니다.'
    })
  }

  const session = verifyAdminSession(
    readCookie(
      req.headers.cookie,
      'nxg_admin_session'
    )
  )

  if (!session) {
    return res.status(401).json({
      success: false,
      message: '관리자 로그인이 필요합니다.'
    })
  }

  try {
    const supabase = createClient(
      SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false
        }
      }
    )

    const { data: actor, error } =
      await supabase
        .from('admin_users')
        .select('id,login_id,role,status,phone')
        .eq('id', Number(session.id))
        .eq('login_id', String(session.login_id))
        .eq('status', '사용중')
        .maybeSingle()

    if (error || !actor) {
      return res.status(401).json({
        success: false,
        message: '담당자 정보를 확인하지 못했습니다.'
      })
    }

    if (actor.role !== 'MANAGER') {
      return res.status(403).json({
        success: false,
        message: '담당자 계정으로 로그인해주세요.'
      })
    }

    const ref = String(actor.phone || '')
      .replace(/[^0-9]/g, '')

    if (ref.length < 8 || ref.length > 15) {
      return res.status(400).json({
        success: false,
        message: '담당자 연락처를 확인해주세요.'
      })
    }

    return res.status(200).json({
      success: true,
      ref
    })

  } catch (error) {
    console.error(
      '담당자 가입신청서 링크 조회 오류:',
      error
    )

    return res.status(500).json({
      success: false,
      message: '가입신청서 링크 생성에 실패했습니다.'
    })
  }
}