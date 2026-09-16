import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'
import { createHmac } from 'crypto'

const SUPABASE_URL =
  process.env.SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  ''

const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  ''

const ADMIN_SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  ''

function makeAdminSessionToken(payload: {
  id: number
  login_id: string
  role: string
  exp: number
}) {
  const body = Buffer.from(
    JSON.stringify(payload)
  ).toString('base64url')

  const signature = createHmac(
    'sha256',
    ADMIN_SESSION_SECRET
  )
    .update(body)
    .digest('base64url')

  return `${body}.${signature}`
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'POST 요청만 가능합니다.',
    })
  }

  if (
    !SUPABASE_URL ||
    !SUPABASE_SERVICE_ROLE_KEY ||
    !ADMIN_SESSION_SECRET
  ) {
    console.error('관리자 로그인 환경변수가 설정되지 않았습니다.')

    return res.status(500).json({
      success: false,
      message: '서버 설정 오류입니다.',
    })
  }

  try {
    const loginId = String(
      req.body?.loginId || ''
    )
      .trim()
      .toUpperCase()

    const password = String(
      req.body?.password || ''
    ).trim()

    if (!loginId || !password) {
      return res.status(400).json({
        success: false,
        message: '아이디와 비밀번호를 입력해주세요.',
      })
    }

    const supabase = createClient(
      SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    )

    const { data: adminUser, error } =
      await supabase
        .from('admin_users')
        .select(
          'id, login_id, password, admin_name, role, status'
        )
        .eq('login_id', loginId)
        .eq('status', '사용중')
        .maybeSingle()

    if (error) {
      console.error(
        '관리자 로그인 조회 오류:',
        error.message
      )

      return res.status(500).json({
        success: false,
        message: '로그인 처리 중 오류가 발생했습니다.',
      })
    }

    /*
     * 현재 시스템과 호환시키기 위한 1차 단계입니다.
     * 기존 DB 비밀번호 값을 서버에서만 비교합니다.
     * 다음 단계에서 비밀번호 해시 방식으로 변경합니다.
     */
    if (
      !adminUser ||
      String(adminUser.password || '') !== password
    ) {
      return res.status(401).json({
        success: false,
        message: '아이디 또는 비밀번호가 올바르지 않습니다.',
      })
    }

    const token = makeAdminSessionToken({
      id: Number(adminUser.id),
      login_id: String(adminUser.login_id),
      role: String(adminUser.role || ''),
      exp: Date.now() + 8 * 60 * 60 * 1000,
    })

    res.setHeader(
      'Set-Cookie',
      [
        `nxg_admin_session=${token}`,
        'Path=/',
        'HttpOnly',
        'Secure',
        'SameSite=Strict',
        'Max-Age=28800',
      ].join('; ')
    )

    return res.status(200).json({
      success: true,

      admin: {
        login_id: adminUser.login_id,
        admin_name: adminUser.admin_name || '',
        role: adminUser.role || '',
      },
    })
  } catch (error) {
    console.error(
      '관리자 로그인 API 오류:',
      error
    )

    return res.status(500).json({
      success: false,
      message: '로그인 처리 중 오류가 발생했습니다.',
    })
  }
}