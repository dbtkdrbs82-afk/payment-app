import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { createClient } from '@supabase/supabase-js'

const base = 'https://app.nxgsoft.co.kr'
const origins = [base, 'https://localhost', 'http://localhost', 'capacitor://localhost']
const fields = 'id,merchant_id,title,body,starts_at,ends_at,popup,link_url,created_at,updated_at'
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
function cookie(header: string | undefined, name: string) {
  for (const item of (header || '').split(';')) {
    const [key, ...rest] = item.trim().split('=')
    if (key === name) return rest.join('=')
  }
  return ''
}
function verify(token: string, secret: string) {
  if (!secret || !token || token.length > 8192) return null
  const parts = token.split('.')
  if (parts.length !== 2) return null
  const [body, sig] = parts
  const expected = Buffer.from(createHmac('sha256', secret).update(body).digest('base64url'))
  const actual = Buffer.from(sig)
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null
  try {
    const p = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'))
    const id = Number(p.id)
    const exp = Number(p.exp)
    if (!Number.isSafeInteger(id) || id <= 0 || typeof p.login_id !== 'string' || !p.login_id || !Number.isFinite(exp) || exp <= Date.now()) return null
    return {id, login_id: p.login_id}
  } catch { return null }
}
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('Vary', 'Origin')
  const origin = String(req.headers.origin || '')
  if (origins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
  }
  if (req.method === 'OPTIONS') return res.status(origins.includes(origin) ? 204 : 403).end()
  const fail = (code: number, message: string) => res.status(code).json({success:false,message})
  if (req.method !== 'POST') return fail(405, 'POST only')
  if (origin && !origins.includes(origin)) return fail(403, '허용되지 않은 요청입니다.')
  const url = process.env.SUPABASE_URL?.trim() || process.env.VITE_SUPABASE_URL?.trim() || ''
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || ''
  if (!url || !key) return fail(503, '서버 설정 오류입니다.')
  const db = createClient(url, key, {auth:{persistSession:false,autoRefreshToken:false}})
  const input = req.body || {}
  const action = String(input.action || '')
  try {
    if (action === 'read') {
      const secret = process.env.MERCHANT_SESSION_SECRET?.trim() || process.env.ADMIN_SESSION_SECRET?.trim() || ''
      const bearer = String(req.headers.authorization || '').match(/^Bearer\s+(.+)$/i)?.[1] || ''
      const session = verify(bearer, secret) || verify(cookie(req.headers.cookie,'nxg_merchant_session'),secret)
      if (!session) return fail(401,'가맹점 로그인이 필요합니다.')
      const {data: merchant,error: me} = await db.from('merchants').select('id').eq('id',session.id).eq('merchant_login_id',session.login_id).eq('status','운영').maybeSingle()
      if (me || !merchant) return fail(403,'가맹점 권한을 확인할 수 없습니다.')
      const now = new Date().toISOString()
      const {data,error} = await db.from('nxg_notices').select(fields).or('merchant_id.is.null,merchant_id.eq.'+session.id).lte('starts_at',now).gt('ends_at',now).order('created_at',{ascending:false}).limit(100)
      if (error) throw error
      return res.status(200).json({success:true,notices:data || []})
    }
    // Only MASTER can list, create, edit or delete notices, regardless of client UI.
    if (origin !== base) return fail(403,'관리자 화면에서만 사용할 수 있습니다.')
    const admin = verify(cookie(req.headers.cookie,'nxg_admin_session'),process.env.ADMIN_SESSION_SECRET?.trim() || '')
    if (!admin) return fail(401,'관리자 재로그인이 필요합니다.')
    const {data: user,error: ue} = await db.from('admin_users').select('id,role').eq('id',admin.id).eq('login_id',admin.login_id).eq('status','사용중').maybeSingle()
    if (ue || !user || user.role !== 'MASTER') return fail(403,'최고관리자 권한이 필요합니다.')
    if (action === 'list') {
      const {data,error} = await db.from('nxg_notices').select(fields).order('created_at',{ascending:false}).limit(100)
      if (error) throw error
      return res.status(200).json({success:true,notices:data || []})
    }
    if (action === 'merchants') {
      const q = String(input.q || '').trim().slice(0,80)
      if (!q) return fail(400,'가맹점명 또는 번호를 입력해주세요.')
      let query = db.from('merchants').select('id,merchant_name').eq('status','운영')
      if (/^(?:MER)?\d+$/i.test(q)) {
        const id = Number(q.replace(/^MER/i,''))
        if (!Number.isSafeInteger(id) || id <= 0) return fail(400,'가맹점 번호를 확인해주세요.')
        query = query.eq('id',id)
      } else query = query.ilike('merchant_name','%'+q.replace(/[\\%_]/g,'\\$&')+'%')
      const {data,error} = await query.order('id',{ascending:true}).limit(30)
      if (error) throw error
      return res.status(200).json({success:true,merchants:data || []})
    }
    if (action === 'delete') {
      const id = String(input.id || '')
      if (!uuid.test(id)) return fail(400,'공지 번호를 확인해주세요.')
      const {error} = await db.from('nxg_notices').delete().eq('id',id)
      if (error) throw error
      return res.status(200).json({success:true})
    }
    if (action !== 'save') return fail(400,'지원하지 않는 요청입니다.')
    const id = String(input.id || '')
    const title = String(input.title || '').trim()
    const body = String(input.body || '').trim()
    const merchantId = input.merchant_id == null ? null : Number(input.merchant_id)
    const starts = Date.parse(String(input.starts_at || ''))
    const ends = Date.parse(String(input.ends_at || ''))
    const link = String(input.link_url || '').trim()
    if ((id && !uuid.test(id)) || !title || title.length > 120 || !body || body.length > 5000 || !Number.isFinite(starts) || !Number.isFinite(ends) || ends <= starts || (merchantId !== null && (!Number.isSafeInteger(merchantId) || merchantId <= 0))) return fail(400,'제목, 내용, 대상 및 공지기간을 확인해주세요.')
    if (link) {
      try {const u = new URL(link); if (u.protocol !== 'https:' || u.username || u.password || link.length > 1000) throw Error()} catch {return fail(400,'HTTPS 링크만 등록할 수 있습니다.')}
    }
    if (merchantId !== null) {
      const {data,error} = await db.from('merchants').select('id').eq('id',merchantId).eq('status','운영').maybeSingle()
      if (error || !data) return fail(400,'운영 중인 가맹점을 선택해주세요.')
    }
    const row = {merchant_id:merchantId,title,body,starts_at:new Date(starts).toISOString(),ends_at:new Date(ends).toISOString(),popup:input.popup === true,link_url:link || null,updated_at:new Date().toISOString()}
    const result = id ? await db.from('nxg_notices').update(row).eq('id',id).select('id').single() : await db.from('nxg_notices').insert(row).select('id').single()
    if (result.error) throw result.error
    return res.status(200).json({success:true,id:result.data.id})
  } catch (error) {
    console.error('NXG notice error:', (error as {code?:string})?.code || 'unknown')
    return fail(500,'공지사항 처리에 실패했습니다.')
  }
}
