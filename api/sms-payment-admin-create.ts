import type {
  VercelRequest,
  VercelResponse
} from '@vercel/node'

import {
  createHash,
  createHmac,
  randomBytes,
  timingSafeEqual
} from 'node:crypto'

import { createClient } from '@supabase/supabase-js'

const BASE = 'https://app.nxgsoft.co.kr'

function getCookie(header: string | undefined, name: string) {
  for (const part of (header || '').split(';')) {
    const [key, ...rest] = part.trim().split('=')
    if (key === name) return rest.join('=')
  }
  return ''
}

function verifySession(token: string, secret: string) {
  if (!token || !secret) return null

  const parts = token.split('.')
  if (parts.length !== 2) return null

  const [body, signature] = parts

  const expected = createHmac('sha256', secret)
    .update(body)
    .digest('base64url')

  const a = Buffer.from(signature)
  const b = Buffer.from(expected)

  if (
    a.length !== b.length ||
    !timingSafeEqual(a, b)
  ) return null

  try {
    const data = JSON.parse(
      Buffer.from(body, 'base64url').toString('utf8')
    )

    if (
      !Number.isSafeInteger(Number(data.id)) ||
      Number(data.id) <= 0 ||
      !data.login_id ||
      Number(data.exp) <= Date.now()
    ) return null

    return data
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

  if (req.headers.origin !== BASE) {
    return res.status(403).json({
      success: false,
      message: '허용되지 않은 요청입니다.'
    })
  }

  const secret = process.env.ADMIN_SESSION_SECRET?.trim() || ''
  const url =
    process.env.SUPABASE_URL?.trim() ||
    process.env.VITE_SUPABASE_URL?.trim() ||
    ''
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || ''

  if (!secret || !url || !key) {
    return res.status(503).json({
      success: false,
      message: '서버 설정 오류입니다.'
    })
  }

  const session = verifySession(
    getCookie(req.headers.cookie, 'nxg_admin_session'),
    secret
  )

  if (!session) {
    return res.status(401).json({
      success: false,
      message: '관리자 재로그인이 필요합니다.'
    })
  }

  const merchantId = Number(req.body?.merchantId)
  const productName = String(req.body?.productName || '').trim()
  const amount = Number(req.body?.amount)

  if (
    !Number.isSafeInteger(merchantId) ||
    merchantId <= 0 ||
    !productName ||
    productName.length > 100 ||
    !Number.isSafeInteger(amount) ||
    amount < 100
  ) {
    return res.status(400).json({
      success: false,
      message: '가맹점, 상품명, 결제금액을 확인해주세요.'
    })
  }

  try {
    const db = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    })

    const { data: admin, error: adminError } = await db
      .from('admin_users')
      .select('id,role')
      .eq('id', Number(session.id))
      .eq('login_id', String(session.login_id))
      .eq('status', '사용중')
      .maybeSingle()

    if (adminError || !admin || admin.role !== 'MASTER') {
      return res.status(403).json({
        success: false,
        message: '최고관리자 권한이 필요합니다.'
      })
    }

    const { data: merchant, error: merchantError } =
      await db
        .from('merchants')
        .select('id')
        .eq('id', merchantId)
        .eq('status', '운영')
        .maybeSingle()

    if (merchantError || !merchant) {
      return res.status(404).json({
        success: false,
        message: '운영 중인 가맹점을 찾을 수 없습니다.'
      })
    }

    const token = randomBytes(24).toString('base64url')
    const tokenHash = createHash('sha256')
      .update(token)
      .digest('hex')

    const { error } = await db
      .from('sms_payment_requests')
      .insert({
        token_hash: tokenHash,
        merchant_id: merchantId,
        product_name: productName,
        amount,
        status: 'pending'
      })

    if (error) {
      console.error('관리자 결제링크 저장 오류:', error.code)
      return res.status(500).json({
        success: false,
        message: '결제요청 저장에 실패했습니다.'
      })
    }

    return res.status(200).json({
      success: true,
      paymentLink: BASE + '/pay?t=' + token
    })

  } catch (error) {
    console.error('관리자 결제링크 생성 오류:', error)

    return res.status(500).json({
      success: false,
      message: '결제링크 생성 중 오류가 발생했습니다.'
    })
  }
}