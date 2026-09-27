import type {
    VercelRequest,
    VercelResponse,
  } from '@vercel/node'
  
  import { createClient } from '@supabase/supabase-js'
  import { createHmac, timingSafeEqual } from 'crypto'
  
  const SUPABASE_URL =
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    ''
  
  const SUPABASE_SERVICE_ROLE_KEY =
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  
  const ADMIN_SESSION_SECRET =
    process.env.ADMIN_SESSION_SECRET || ''
  
  function getCookie(
    cookieHeader: string | undefined,
    name: string
  ) {
    if (!cookieHeader) return ''
  
    for (const cookie of cookieHeader.split(';')) {
      const [key, ...rest] =
        cookie.trim().split('=')
  
      if (key === name) {
        return rest.join('=')
      }
    }
  
    return ''
  }
  
  function verifyAdminSession(token: string) {
    if (
      !token ||
      !ADMIN_SESSION_SECRET
    ) {
      return null
    }
  
    const parts = token.split('.')
  
    if (parts.length !== 2) {
      return null
    }
  
    const [body, signature] = parts
  
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
      Buffer.from(expectedSignature)
  
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
      const payload = JSON.parse(
        Buffer.from(
          body,
          'base64url'
        ).toString('utf8')
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
    res.setHeader(
      'Cache-Control',
      'no-store'
    )
  
    if (req.method !== 'GET') {
      return res.status(405).json({
        success: false,
        message: 'GET 요청만 가능합니다.',
      })
    }
  
    const token = getCookie(
      req.headers.cookie,
      'nxg_admin_session'
    )
  
    const adminSession =
      verifyAdminSession(token)
  
    if (!adminSession) {
      return res.status(401).json({
        success: false,
        message:
          '관리자 로그인이 필요합니다.',
      })
    }
  
    if (
      !SUPABASE_URL ||
      !SUPABASE_SERVICE_ROLE_KEY
    ) {
      return res.status(500).json({
        success: false,
        message: '서버 설정 오류입니다.',
      })
    }
  
    try {
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
  
      const {
        data: adminUser,
        error,
      } = await supabase
        .from('admin_users')
        .select(
          'id, login_id, admin_name, role, status, parent_admin_id'
        )
        .eq(
          'id',
          Number(adminSession.id)
        )
        .eq(
          'login_id',
          String(adminSession.login_id)
        )
        .eq('status', '사용중')
        .single()
  
      if (
        error ||
        !adminUser
      ) {
        return res.status(401).json({
          success: false,
          message:
            '관리자 정보를 확인하지 못했습니다.',
        })
      }
  
      return res.status(200).json({
        success: true,
  
        admin: {
          id: adminUser.id,
          login_id:
            adminUser.login_id,
          admin_name:
            adminUser.admin_name || '',
          role:
            adminUser.role || '',
          parent_admin_id:
            adminUser.parent_admin_id ||
            null,
        },
      })
    } catch (error) {
      console.error(
        '관리자 정보 API 오류:',
        error
      )
  
      return res.status(500).json({
        success: false,
        message:
          '관리자 정보를 확인하지 못했습니다.',
      })
    }
  }
  