import type { VercelRequest, VercelResponse } from '@vercel/node'
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
    const [key, ...rest] = cookie.trim().split('=')

    if (key === name) {
      return rest.join('=')
    }
  }

  return ''
}

function verifyAdminSession(token: string) {
  if (!token || !ADMIN_SESSION_SECRET) {
    return null
  }

  const parts = token.split('.')

  if (parts.length !== 2) {
    return null
  }

  const [body, signature] = parts

  const expectedSignature = createHmac(
    'sha256',
    ADMIN_SESSION_SECRET
  )
    .update(body)
    .digest('base64url')

  const receivedBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expectedSignature)

  if (
    receivedBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(receivedBuffer, expectedBuffer)
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

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'POST 요청만 가능합니다.',
    })
  }

  const token = getCookie(
    req.headers.cookie,
    'nxg_admin_session'
  )

  const adminSession = verifyAdminSession(token)

  if (!adminSession) {
    return res.status(401).json({
      success: false,
      message: '관리자 로그인이 필요합니다.',
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

    const { data: actor, error: actorError } =
      await supabase
        .from('admin_users')
        .select(
          'id, login_id, role, status, parent_admin_id'
        )
        .eq('id', Number(adminSession.id))
        .eq('login_id', String(adminSession.login_id))
        .eq('status', '사용중')
        .single()

    if (actorError || !actor) {
      return res.status(401).json({
        success: false,
        message: '관리자 인증정보가 올바르지 않습니다.',
      })
    }

    const role =
      String(req.body?.role || '').trim()

    const adminName =
      String(req.body?.admin_name || '').trim()

    const password =
      String(req.body?.password || '1234').trim()

    const parentAdminId =
      Number(req.body?.parent_admin_id || 0)

    if (!adminName) {
      return res.status(400).json({
        success: false,
        message: '이름을 입력해주세요.',
      })
    }

    if (!parentAdminId) {
      return res.status(400).json({
        success: false,
        message: '상위조직을 선택해주세요.',
      })
    }

    const allowedRoles =
      actor.role === 'MASTER'
        ? ['BRANCH', 'AGENCY', 'MANAGER']
        : actor.role === 'BRANCH'
          ? ['AGENCY', 'MANAGER']
          : actor.role === 'AGENCY'
            ? ['MANAGER']
            : []

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({
        success: false,
        message: '해당 권한을 등록할 수 없습니다.',
      })
    }

    const { data: parentAdmin, error: parentError } =
      await supabase
        .from('admin_users')
        .select(
          'id, role, parent_admin_id, status'
        )
        .eq('id', parentAdminId)
        .eq('status', '사용중')
        .single()

    if (parentError || !parentAdmin) {
      return res.status(400).json({
        success: false,
        message: '상위조직 정보가 올바르지 않습니다.',
      })
    }

    if (
      role === 'BRANCH' &&
      parentAdmin.role !== 'MASTER'
    ) {
      return res.status(400).json({
        success: false,
        message: '지사의 상위조직은 본사여야 합니다.',
      })
    }

    if (
      role === 'AGENCY' &&
      parentAdmin.role !== 'BRANCH'
    ) {
      return res.status(400).json({
        success: false,
        message: '대리점의 상위조직은 지사여야 합니다.',
      })
    }

    if (
      role === 'MANAGER' &&
      !['BRANCH', 'AGENCY'].includes(parentAdmin.role)
    ) {
      return res.status(400).json({
        success: false,
        message: '담당자의 상위조직이 올바르지 않습니다.',
      })
    }

    if (actor.role === 'BRANCH') {
      const parentIsOwnBranch =
        Number(parentAdmin.id) === Number(actor.id)

      const parentIsOwnAgency =
        parentAdmin.role === 'AGENCY' &&
        Number(parentAdmin.parent_admin_id) ===
          Number(actor.id)

      if (
        !parentIsOwnBranch &&
        !parentIsOwnAgency
      ) {
        return res.status(403).json({
          success: false,
          message: '다른 지사의 조직에는 등록할 수 없습니다.',
        })
      }
    }

    if (
      actor.role === 'AGENCY' &&
      Number(parentAdmin.id) !== Number(actor.id)
    ) {
      return res.status(403).json({
        success: false,
        message: '다른 대리점에는 담당자를 등록할 수 없습니다.',
      })
    }

    const prefix =
      role === 'BRANCH'
        ? 'S'
        : role === 'AGENCY'
          ? 'A'
          : 'B'

    const { data: lastUsers, error: lastError } =
      await supabase
        .from('admin_users')
        .select('login_id')
        .like('login_id', prefix + '%')
        .order('id', { ascending: false })
        .limit(1)

    if (lastError) {
      return res.status(500).json({
        success: false,
        message: '아이디 생성에 실패했습니다.',
      })
    }

    let nextNumber = 1

    if (
      lastUsers &&
      lastUsers.length > 0
    ) {
      const lastLoginId =
        String(lastUsers[0].login_id || '')

      const numberPart =
        Number(
          lastLoginId.replace(prefix, '')
        )

      if (!isNaN(numberPart)) {
        nextNumber = numberPart + 1
      }
    }

    const loginId =
      prefix +
      String(nextNumber).padStart(4, '0')

    const { error: insertError } =
      await supabase
        .from('admin_users')
        .insert({
          admin_name: adminName,
          login_id: loginId,
          password,
          role,
          status: '사용중',
          parent_admin_id: parentAdminId,

          resident_number:
            String(
              req.body?.resident_number || ''
            ).trim(),

          company_name:
            String(
              req.body?.company_name || ''
            ).trim(),

          business_number:
            String(
              req.body?.business_number || ''
            ).trim(),

          commission_rate:
            Number(
              req.body?.commission_rate || 0
            ),

          bank_name:
            String(
              req.body?.bank_name || ''
            ).trim(),

          account_number:
            String(
              req.body?.account_number || ''
            ).trim(),

          account_holder:
            String(
              req.body?.account_holder || ''
            ).trim(),

          memo:
            String(
              req.body?.memo || ''
            ).trim(),
        })

    if (insertError) {
      console.error(
        '담당자 등록 오류:',
        insertError.message
      )

      return res.status(500).json({
        success: false,
        message: '담당자 저장에 실패했습니다.',
      })
    }

    return res.status(200).json({
      success: true,
      login_id: loginId,
    })
  } catch (error) {
    console.error(
      '담당자 등록 API 오류:',
      error
    )

    return res.status(500).json({
      success: false,
      message: '담당자 등록 중 오류가 발생했습니다.',
    })
  }
}