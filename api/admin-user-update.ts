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

    const adminUserId = Number(req.body?.id)

    if (!adminUserId) {
      return res.status(400).json({
        success: false,
        message: '담당자 ID가 올바르지 않습니다.',
      })
    }

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

    const { data: target, error: targetError } =
      await supabase
        .from('admin_users')
        .select(
          'id, login_id, role, status, parent_admin_id'
        )
        .eq('id', adminUserId)
        .single()

    if (targetError || !target) {
      return res.status(404).json({
        success: false,
        message: '담당자 정보를 찾지 못했습니다.',
      })
    }

    const isSelf =
      Number(actor.id) === Number(target.id)

    const isRootMaster =
      target.login_id === 'NXGMASTER16'

    let canManage = false

    if (actor.role === 'MASTER') {
      canManage = true
    } else if (isSelf) {
      canManage = true
    } else if (actor.role === 'BRANCH') {
      if (
        target.role === 'AGENCY' &&
        Number(target.parent_admin_id) === Number(actor.id)
      ) {
        canManage = true
      }

      if (target.role === 'MANAGER') {
        if (
          Number(target.parent_admin_id) === Number(actor.id)
        ) {
          canManage = true
        } else if (target.parent_admin_id) {
          const { data: parentAgency } =
            await supabase
              .from('admin_users')
              .select('id, role, parent_admin_id')
              .eq('id', Number(target.parent_admin_id))
              .maybeSingle()

          if (
            parentAgency?.role === 'AGENCY' &&
            Number(parentAgency.parent_admin_id) ===
              Number(actor.id)
          ) {
            canManage = true
          }
        }
      }
    } else if (actor.role === 'AGENCY') {
      if (
        target.role === 'MANAGER' &&
        Number(target.parent_admin_id) === Number(actor.id)
      ) {
        canManage = true
      }
    }

    if (!canManage) {
      return res.status(403).json({
        success: false,
        message: '담당자를 수정할 권한이 없습니다.',
      })
    }

    if (
      isRootMaster &&
      actor.login_id !== 'NXGMASTER16'
    ) {
      return res.status(403).json({
        success: false,
        message: '대표관리자 정보는 수정할 수 없습니다.',
      })
    }

    const newName =
      String(req.body?.admin_name || '').trim()

    const newPassword =
      String(req.body?.password || '').trim()

    const newPhone =
      String(req.body?.phone || '').trim()

    const newEmail =
      String(req.body?.email || '').trim()

    const newResidentNumber =
      String(req.body?.resident_number || '').trim()

    const newCompanyName =
      String(req.body?.company_name || '').trim()

    const newBusinessNumber =
      String(req.body?.business_number || '').trim()

    const newBankName =
      String(req.body?.bank_name || '').trim()

    const newAccountNumber =
      String(req.body?.account_number || '').trim()

    const newAccountHolder =
      String(req.body?.account_holder || '').trim()

    const newMemo =
      String(req.body?.memo || '').trim()

    if (!newName) {
      return res.status(400).json({
        success: false,
        message: '이름을 입력해주세요.',
      })
    }

    const updateData: Record<string, any> = {
      admin_name: newName,
      password: newPassword,
      phone: newPhone,
      email: newEmail,
      resident_number: newResidentNumber,
      company_name: newCompanyName,
      business_number: newBusinessNumber,

      commission_rate_1day:
        Number(req.body?.commission_rate_1day || 0),

      commission_rate_3day:
        Number(req.body?.commission_rate_3day || 0),

      commission_rate_4day:
        Number(req.body?.commission_rate_4day || 0),

      commission_rate_7day:
        Number(req.body?.commission_rate_7day || 0),

      bank_name: newBankName,
      account_number: newAccountNumber,
      account_holder: newAccountHolder,
      memo: newMemo,
    }

    /*
     * 대표관리자는 기존처럼
     * 역할 / 상태 / 아이디 / 상위조직을 변경하지 않습니다.
     *
     * 자기 자신을 수정하는 하위 관리자도
     * 권한 상승을 막기 위해 조직정보는 변경하지 않습니다.
     */
    if (!isRootMaster && !isSelf) {
      const newRole =
        String(req.body?.role || target.role).trim()

      const newStatus =
        String(req.body?.status || target.status).trim()

      const newParentAdminId =
        Number(req.body?.parent_admin_id || 0)

      const allowedRoles =
        actor.role === 'MASTER'
          ? ['MASTER', 'BRANCH', 'AGENCY', 'MANAGER']
          : actor.role === 'BRANCH'
            ? ['AGENCY', 'MANAGER']
            : actor.role === 'AGENCY'
              ? ['MANAGER']
              : []

      if (!allowedRoles.includes(newRole)) {
        return res.status(403).json({
          success: false,
          message: '해당 권한으로 변경할 수 없습니다.',
        })
      }

      if (actor.role === 'BRANCH') {
        if (
          newRole === 'AGENCY' &&
          newParentAdminId !== Number(actor.id)
        ) {
          return res.status(403).json({
            success: false,
            message: '상위조직 설정이 올바르지 않습니다.',
          })
        }

        if (newRole === 'MANAGER') {
          let validParent =
            newParentAdminId === Number(actor.id)

          if (!validParent && newParentAdminId) {
            const { data: parentAgency } =
              await supabase
                .from('admin_users')
                .select('id, role, parent_admin_id')
                .eq('id', newParentAdminId)
                .maybeSingle()

            validParent =
              parentAgency?.role === 'AGENCY' &&
              Number(parentAgency.parent_admin_id) ===
                Number(actor.id)
          }

          if (!validParent) {
            return res.status(403).json({
              success: false,
              message: '상위조직 설정이 올바르지 않습니다.',
            })
          }
        }
      }

      if (
        actor.role === 'AGENCY' &&
        (
          newRole !== 'MANAGER' ||
          newParentAdminId !== Number(actor.id)
        )
      ) {
        return res.status(403).json({
          success: false,
          message: '상위조직 설정이 올바르지 않습니다.',
        })
      }

      let newLoginId = target.login_id

      if (target.role !== newRole) {
        const prefix =
          newRole === 'BRANCH'
            ? 'S'
            : newRole === 'AGENCY'
              ? 'A'
              : newRole === 'MANAGER'
                ? 'B'
                : 'NXGMASTER'

        if (newRole !== 'MASTER') {
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

          newLoginId =
            prefix +
            String(nextNumber).padStart(4, '0')
        }
      }

      updateData.role = newRole
      updateData.status = newStatus
      updateData.login_id = newLoginId
      updateData.parent_admin_id =
        newParentAdminId || null
    }

    const { data: updatedUser, error: updateError } =
      await supabase
        .from('admin_users')
        .update(updateData)
        .eq('id', adminUserId)
        .select(
          'id, login_id, admin_name, role, status'
        )
        .single()

    if (updateError || !updatedUser) {
      console.error(
        '담당자 수정 오류:',
        updateError?.message
      )

      return res.status(500).json({
        success: false,
        message: '담당자 수정에 실패했습니다.',
      })
    }

    return res.status(200).json({
      success: true,
      adminUser: updatedUser,
    })
  } catch (error) {
    console.error(
      '담당자 수정 API 오류:',
      error
    )

    return res.status(500).json({
      success: false,
      message: '담당자 수정 중 오류가 발생했습니다.',
    })
  }
}