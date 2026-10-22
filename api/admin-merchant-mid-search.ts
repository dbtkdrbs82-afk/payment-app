import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'
import { createHmac, timingSafeEqual } from 'crypto'

const SUPABASE_URL =
  process.env.SUPABASE_URL?.trim() ||
  process.env.VITE_SUPABASE_URL?.trim() || ''

const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || ''

const ADMIN_SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET?.trim() || ''

function getCookie(cookieHeader: string | undefined, name: string) {
  if (!cookieHeader) return ''

  for (const cookie of cookieHeader.split(';')) {
    const [key, ...rest] = cookie.trim().split('=')
    if (key === name) return rest.join('=')
  }

  return ''
}

function verifyAdminSession(token: string) {
  if (!token || !ADMIN_SESSION_SECRET) return null

  const parts = token.split('.')
  if (parts.length !== 2) return null

  const [body, signature] = parts
  const expectedSignature = createHmac('sha256', ADMIN_SESSION_SECRET)
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
      message: 'POST 요청만 가능합니다.'
    })
  }

  if (
    !SUPABASE_URL ||
    !SUPABASE_SERVICE_ROLE_KEY ||
    !ADMIN_SESSION_SECRET
  ) {
    return res.status(500).json({
      success: false,
      message: '서버 환경변수를 확인해주세요.'
    })
  }

  const session = verifyAdminSession(
    getCookie(req.headers.cookie, 'nxg_admin_session')
  )

  if (!session) {
    return res.status(401).json({
      success: false,
      message: '관리자 로그인이 필요합니다.'
    })
  }
  
  const keyword = String(req.body?.keyword || '').trim()

  if (!keyword || keyword.length > 100) {
    return res.status(400).json({
      success: false,
      message: '검색할 MID를 확인해주세요.'
    })
  }

  try {
    const supabase = createClient(
      SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: { persistSession: false, autoRefreshToken: false }
      }
    )

    const { data: actor, error: actorError } = await supabase
      .from('admin_users')
      .select('id,login_id,role,status')
      .eq('id', Number(session.id))
      .eq('login_id', String(session.login_id))
      .eq('status', '사용중')
      .maybeSingle()

    if (actorError || !actor) {
      return res.status(401).json({
        success: false,
        message: '관리자 인증정보가 올바르지 않습니다.'
      })
    }

    const scopeField: Record<string, string> = {
      BRANCH: 'branch_admin_id',
      AGENCY: 'agency_admin_id',
      MANAGER: 'manager_admin_id'
    }

    if (actor.role !== 'MASTER' && !scopeField[actor.role]) {
      return res.status(403).json({
        success: false,
        message: 'MID 조회 권한이 없습니다.'
      })
    }

    // PostgreSQL ILIKE 와일드카드를 이스케이프하여 문자 그대로 검색합니다.
    const escapedKeyword = keyword.replace(/[\\%_]/g, '\\$&')
    const matchingMerchantIds = new Set<number>()
    const pageSize = 1000

    for (let offset = 0; ; offset += pageSize) {
      const { data: rows, error: midError } = await supabase
        .from('merchant_korpay_manual_mids')
        .select('merchant_id')
        .ilike('mid', `%${escapedKeyword}%`)
        .order('id', { ascending: true })
        .range(offset, offset + pageSize - 1)

      if (midError) throw midError

      for (const row of rows || []) {
        const id = Number(row.merchant_id)
        if (Number.isSafeInteger(id) && id > 0) {
          matchingMerchantIds.add(id)
        }
      }

      if ((rows || []).length < pageSize) break
    }

    const candidateIds = [...matchingMerchantIds]
    const allowedIds: number[] = []

    // 서비스 키 조회 결과라도 로그인 관리자가 볼 수 있는 가맹점만 반환합니다.
    for (let i = 0; i < candidateIds.length; i += 200) {
      const batch = candidateIds.slice(i, i + 200)
      let query = supabase
        .from('merchants')
        .select('id')
        .in('id', batch)

      if (actor.role !== 'MASTER') {
        query = query.eq(scopeField[actor.role], Number(actor.id))
      }

      const { data: merchants, error: merchantError } = await query
      if (merchantError) throw merchantError

      for (const merchant of merchants || []) {
        allowedIds.push(Number(merchant.id))
      }
    }

    return res.status(200).json({
      success: true,
      merchantIds: allowedIds
    })
  } catch (error) {
    console.error('관리자 복수 MID 검색 오류:', error)
    return res.status(500).json({
      success: false,
      message: '복수 MID 조회에 실패했습니다.'
    })
  }
}