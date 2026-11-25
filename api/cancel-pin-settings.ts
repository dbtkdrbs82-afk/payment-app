import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'
import { createHmac, timingSafeEqual } from 'crypto'

const URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || ''
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const MERCHANT_SECRET = process.env.MERCHANT_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET || ''
const ADMIN_SECRET = process.env.ADMIN_SESSION_SECRET || ''

function cookie(header: string | undefined, name: string): string {
  return (header || '').split(';').map(x => x.trim())
    .find(x => x.startsWith(name + '='))?.slice(name.length + 1) || ''
}

function session(token: string, secret: string): { id: number; login_id: string } | null {
  if (!token || !secret) return null
  const parts = token.split('.')
  if (parts.length !== 2) return null
  const [body, signature] = parts
  const expected = createHmac('sha256', secret).update(body).digest('base64url')
  if (signature.length !== expected.length ||
      !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null
  try {
    const data = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'))
    if (!data.id || !data.login_id || !data.exp || Number(data.exp) < Date.now()) return null
    return data
  } catch { return null }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('Vary', 'Origin')
  const origin = String(req.headers.origin || '')
  const nativeOrigins = ['https://localhost', 'http://localhost', 'capacitor://localhost']
  const ownOrigin = `https://${req.headers.host || ''}`
  if (nativeOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
  }
  if (req.method === 'OPTIONS') return res.status(nativeOrigins.includes(origin) ? 204 : 403).end()
  if (origin && origin !== ownOrigin && !nativeOrigins.includes(origin)) {
    return res.status(403).json({ success: false, message: '허용되지 않는 요청입니다.' })
  }
  if (!['GET', 'POST'].includes(req.method || '')) return res.status(405).end()
  if (!URL || !KEY || !MERCHANT_SECRET) return res.status(500).json({ success: false, message: '서버 설정 오류' })

  const db = createClient(URL, KEY, { auth: { persistSession: false, autoRefreshToken: false } })
  try {
    // HQ reset uses existing signed admin session; never checks payment PIN.
    if (req.method === 'POST' && req.body?.action === 'reset') {
      const targetMerchantId = Number(req.body?.merchantId)
      if (!Number.isSafeInteger(targetMerchantId) || targetMerchantId <= 0) {
        return res.status(400).json({ success: false, message: '가맹점 번호가 올바르지 않습니다.' })
      }
      const admin = session(cookie(req.headers.cookie, 'nxg_admin_session'), ADMIN_SECRET)
      if (!admin) return res.status(401).end()
      const { data: actor } = await db.from('admin_users').select('id,login_id,role,status')
        .eq('id', admin.id).eq('login_id', admin.login_id).eq('status', '사용중').maybeSingle()
      if (actor?.role !== 'MASTER') return res.status(403).end()
      const { error } = await db.from('nxg_merchant_cancel_auth').delete()
        .eq('merchant_id', targetMerchantId)
      if (error) throw error
      return res.status(200).json({ success: true })
    }

    const bearer = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '')
    const merchant = session(cookie(req.headers.cookie, 'nxg_merchant_session'), MERCHANT_SECRET)
      || session(bearer, MERCHANT_SECRET)
    if (!merchant) return res.status(401).end()
    const { data: actor } = await db.from('merchants').select('id,merchant_login_id,status')
      .eq('id', merchant.id).eq('merchant_login_id', merchant.login_id)
      .eq('status', '운영').maybeSingle()
    if (!actor) return res.status(401).end()

    if (req.method === 'GET') {
      const { data, error } = await db.from('nxg_merchant_cancel_auth')
        .select('pin_hash').eq('merchant_id', actor.id).maybeSingle()
      if (error) throw error
      return res.status(200).json({ success: true, pinVerifier: data?.pin_hash || null })
    }

    // Store a client-generated verifier. The server does not verify cancellation PINs.
    const verifier = String(req.body?.pinVerifier || '')
    if (!/^v1\.[0-9a-f]{32}\.[0-9a-f]{64}$/.test(verifier)) {
      return res.status(400).json({ success: false, message: '비밀번호 형식이 올바르지 않습니다.' })
    }
    const { error } = await db.from('nxg_merchant_cancel_auth').upsert({
      merchant_id: actor.id, pin_hash: verifier,
      failed_attempts: 0, locked_until: null, updated_at: new Date().toISOString()
    }, { onConflict: 'merchant_id' })
    if (error) throw error
    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('취소 PIN 설정 API 오류:', error)
    return res.status(500).json({ success: false, message: '취소 비밀번호 설정 처리 실패' })
  }
}
