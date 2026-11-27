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

const MID_TYPES = ['pg', 'terminal', 'manual']

function getCookie(header: string | undefined, name: string) {
  for (const cookie of (header || '').split(';')) {
    const [key, ...rest] = cookie.trim().split('=')
    if (key === name) return rest.join('=')
  }
  return ''
}

function verifySession(token: string) {
  if (!token || !ADMIN_SESSION_SECRET) return null

  const parts = token.split('.')
  if (parts.length !== 2) return null

  const [body, signature] = parts

  const expected = createHmac('sha256', ADMIN_SESSION_SECRET)
    .update(body)
    .digest('base64url')

  const a = Buffer.from(signature)
  const b = Buffer.from(expected)

  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return null
  }

  try {
    const session = JSON.parse(
      Buffer.from(body, 'base64url').toString('utf8')
    )

    if (
      !session?.id ||
      !session?.login_id ||
      !Number.isFinite(Number(session.exp)) ||
      Number(session.exp) <= Date.now()
    ) {
      return null
    }

    return session
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
    !String(req.headers['content-type'] || '')
      .toLowerCase().startsWith('application/json') ||
    req.headers['sec-fetch-site'] === 'cross-site'
  ) {
    return res.status(403).json({
      success: false,
      message: '허용되지 않은 요청입니다.'
    })
  }

  if (
    !SUPABASE_URL ||
    !SUPABASE_SERVICE_ROLE_KEY ||
    !ADMIN_SESSION_SECRET
  ) {
    return res.status(500).json({
      success: false,
      message: '서버 설정을 확인해주세요.'
    })
  }

  const session = verifySession(
    getCookie(req.headers.cookie, 'nxg_admin_session')
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

    const { data: actor, error: actorError } = await supabase
      .from('admin_users')
      .select('id,login_id,role,status')
      .eq('id', Number(session.id))
      .eq('login_id', String(session.login_id))
      .eq('status', '사용중')
      .maybeSingle()

    if (
      actorError ||
      !actor ||
      actor.role !== 'MASTER' ||
      actor.login_id !== 'NXGMASTER16'
    ) {
      return res.status(403).json({
        success: false,
        message: '대표관리자만 사용할 수 있습니다.'
      })
    }

    const action = String(req.body?.action || '')

    // nxg-terminal-mid-only: the existing MASTER session check above applies.
    if (action === 'terminal_mid_only') {
      const merchantId = Number(req.body?.merchant_id)
      const expectedMid = req.body?.expected_mid
      const newMid = typeof req.body?.new_mid === 'string' ? req.body.new_mid.trim() : ''
      if (!Number.isSafeInteger(merchantId) || merchantId <= 0 ||
          typeof expectedMid !== 'string' || !expectedMid.trim() ||
          !newMid || newMid.length > 200 || /[\x00-\x1f\x7f]/.test(newMid)) {
        return res.status(400).json({ success: false, message: '단말기 MID를 확인해주세요.' })
      }
      const { data, error } = await supabase.rpc('nxg_change_terminal_mid_only', {
        p_merchant_id: merchantId,
        p_expected_mid: expectedMid,
        p_new_mid: newMid
      })
      if (error) throw error
      return res.status(200).json({ success: true, mid: data.mid })
    }

    const cycles = ['1일', '3일']

    // 정산주기별 MID 목록 조회
    if (action === 'list') {
      const midType = String(req.body?.mid_type || '')
      const cycle = req.body?.settlement_cycle

      if (
        !MID_TYPES.includes(midType) ||
        (cycle !== null && !cycles.includes(cycle))
      ) {
        return res.status(400).json({
          success: false,
          message: 'MID 종류와 정산주기를 확인해주세요.'
        })
      }

      let query = supabase
        .from('korpay_mid_pool')
        .select('id,mid_type,mid,mkey,settlement_cycle,created_at')
        .eq('mid_type', midType)

      query = cycle === null
        ? query.is('settlement_cycle', null)
        : query.eq('settlement_cycle', cycle)

      const { data, error } = await query
        .order('created_at', { ascending: true })
        .order('id', { ascending: true })

      if (error) throw error

      return res.status(200).json({
        success: true,
        items: (data || []).map(({ mkey, ...row }) => ({
          ...row,
          has_mkey: Boolean(String(mkey || '').trim())
        }))
      })
    }

    // 1일 / 3일 MID 개별 및 일괄 등록
    if (action === 'register') {
      const items = req.body?.items

      if (
        !Array.isArray(items) ||
        items.length < 1 ||
        items.length > 100
      ) {
        return res.status(400).json({
          success: false,
          message: '1~100개씩 등록해주세요.'
        })
      }

      const normalized = items.map((row: any) => ({
        mid_type: String(row?.mid_type || '').trim(),
        settlement_cycle: String(row?.settlement_cycle || '').trim(),
        mid: String(row?.mid || '').trim(),
        mkey: String(row?.mkey || '').trim()
      }))

      if (normalized.some(row =>
        !MID_TYPES.includes(row.mid_type) ||
        !cycles.includes(row.settlement_cycle) ||
        !row.mid ||
        (row.mid_type !== 'terminal' && !row.mkey)
      )) {
        return res.status(400).json({
          success: false,
          message: 'MID / MKEY와 정산주기를 확인해주세요.'
        })
      }

      const { data, error } = await supabase.rpc(
        'nxg_korpay_pool_register_v2',
        { p_items: normalized }
      )

      if (error) throw error

      return res.status(200).json({
        success: true,
        count: data,
        message: 'MID 등록 완료'
      })
    }

    // 선택한 MID와 짝이 맞는 MKEY 자동입력
    if (action === 'preview') {
      const poolId = String(req.body?.pool_id || '')
      const midType = String(req.body?.mid_type || '')
      const cycle = req.body?.settlement_cycle

      if (
        !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(poolId) ||
        !MID_TYPES.includes(midType) ||
        !cycles.includes(cycle)
      ) {
        return res.status(400).json({
          success: false,
          message: 'MID 선택정보가 올바르지 않습니다.'
        })
      }

      const { data, error } = await supabase
        .from('korpay_mid_pool')
        .select('id,mid_type,mid,mkey,settlement_cycle')
        .eq('id', poolId)
        .eq('mid_type', midType)
        .eq('settlement_cycle', cycle)
        .maybeSingle()

      if (error) throw error

      if (!data || (midType !== 'terminal' && !data.mkey)) {
        return res.status(409).json({
          success: false,
          message: 'MID가 변경되었거나 존재하지 않습니다.'
        })
      }

      return res.status(200).json({
        success: true,
        item: data
      })
    }

    // 결제 유형 및 정산주기 변경 / 삭제
    if (action === 'correct') {
      const poolId = String(req.body?.pool_id || '')
      const expectedType = String(req.body?.mid_type || '')
      const expectedCycle = req.body?.settlement_cycle
      const correction = String(req.body?.correction || '')
      const newType = String(req.body?.new_type || '')
      const newCycle = req.body?.new_cycle

      if (
        !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(poolId) ||
        !MID_TYPES.includes(expectedType) ||
        (
          expectedCycle !== null &&
          !cycles.includes(expectedCycle)
        ) ||
        !['change_type', 'delete'].includes(correction) ||
        (
          correction === 'change_type' &&
          (
            !MID_TYPES.includes(newType) ||
            !cycles.includes(newCycle)
          )
        )
      ) {
        return res.status(400).json({
          success: false,
          message: 'MID 변경정보를 확인해주세요.'
        })
      }

      const { data, error } = await supabase.rpc(
        'nxg_korpay_pool_correct_v2',
        {
          p_pool_id: poolId,
          p_action: correction,
          p_expected_type: expectedType,
          p_expected_cycle: expectedCycle,
          p_new_type: correction === 'change_type'
            ? newType
            : null,
          p_new_cycle: correction === 'change_type'
            ? newCycle
            : null
        }
      )

      if (error) throw error

      return res.status(200).json({
        success: true,
        data,
        message: correction === 'delete'
          ? 'MID 삭제 완료'
          : 'MID 종류 및 정산주기 변경 완료'
      })
    }

    // 기존 즉시 배정 금지 유지
    if (action === 'assign') {
      return res.status(409).json({
        success: false,
        message: '가맹점 최종 저장 버튼으로 저장해주세요.'
      })
    }

    return res.status(400).json({
      success: false,
      message: '올바르지 않은 요청입니다.'
    })

  } catch (error: any) {
    if (error?.code === 'P0001') {
      return res.status(400).json({
        success: false,
        message: String(error.message)
      })
    }

    if (error?.code === '23505') {
      return res.status(409).json({
        success: false,
        message: '중복된 MID가 있습니다.'
      })
    }

    if (error?.code === '55P03') {
      return res.status(409).json({
        success: false,
        message: '다른 작업이 진행 중입니다. 다시 시도해주세요.'
      })
    }

    console.error('MID pool API error:', error?.code || 'unknown')

    return res.status(500).json({
      success: false,
      message: 'MID 처리 중 오류가 발생했습니다.'
    })
  }
}