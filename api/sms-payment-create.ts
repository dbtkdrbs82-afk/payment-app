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

const BASE_URL = 'https://app.nxgsoft.co.kr'

const allowedOrigins = [
  BASE_URL,
  'https://localhost',
  'http://localhost',
  'capacitor://localhost'
]

function getCookie(
  header: string | undefined,
  name: string
): string {
  for (const item of (header || '').split(';')) {
    const [key, ...value] = item.trim().split('=')

    if (key === name) {
      return value.join('=')
    }
  }

  return ''
}

function verifySession(
  token: string,
  secret: string
): { id: number; login_id: string } | null {
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
  ) {
    return null
  }

  try {
    const payload = JSON.parse(
      Buffer.from(body, 'base64url').toString('utf8')
    )

    const id = Number(payload.id)
    const loginId = String(payload.login_id || '')
    const expires = Number(payload.exp)

    if (
      !Number.isSafeInteger(id) ||
      id <= 0 ||
      !loginId ||
      !Number.isFinite(expires) ||
      expires <= Date.now()
    ) {
      return null
    }

    return { id, login_id: loginId }
  } catch {
    return null
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('Vary', 'Origin')

  const origin = String(req.headers.origin || '')

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader(
      'Access-Control-Allow-Methods',
      'POST, OPTIONS'
    )
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Authorization, Content-Type'
    )
  }

  if (req.method === 'OPTIONS') {
    return res.status(
      allowedOrigins.includes(origin) ? 204 : 403
    ).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'POST 요청만 가능합니다.'
    })
  }

  if (!allowedOrigins.includes(origin)) {
    return res.status(403).json({
      success: false,
      message: '허용되지 않은 요청입니다.'
    })
  }

  const secret =
    process.env.MERCHANT_SESSION_SECRET?.trim() ||
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    ''

  const supabaseUrl =
    process.env.SUPABASE_URL?.trim() ||
    process.env.VITE_SUPABASE_URL?.trim() ||
    ''

  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || ''

  if (!secret || !supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({
      success: false,
      message: '서버 설정을 확인해주세요.'
    })
  }

  const authorization =
    String(req.headers.authorization || '')

  const bearerToken = /^Bearer\s+/i.test(authorization)
    ? authorization.replace(/^Bearer\s+/i, '').trim()
    : ''

  const cookieToken = getCookie(
    req.headers.cookie,
    'nxg_merchant_session'
  )

  const session =
    verifySession(bearerToken, secret) ||
    verifySession(cookieToken, secret)

  if (!session) {
    return res.status(401).json({
      success: false,
      message: '가맹점 재로그인이 필요합니다.'
    })
  }

  const productName =
    String(req.body?.productName || '').trim()

  const amount = Number(req.body?.amount)

  if (!productName || productName.length > 100) {
    return res.status(400).json({
      success: false,
      message: '상품명을 확인해주세요.'
    })
  }

  if (!Number.isSafeInteger(amount) || amount < 100) {
    return res.status(400).json({
      success: false,
      message: '결제금액을 확인해주세요.'
    })
  }

  try {
    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false
        }
      }
    )

    const { data: merchant, error: merchantError } =
      await supabase
        .from('merchants')
        .select('id,merchant_login_id,status')
        .eq('id', session.id)
        .eq('merchant_login_id', session.login_id)
        .eq('status', '운영')
        .maybeSingle()

    if (merchantError) {
      return res.status(500).json({
        success: false,
        message: '가맹점 확인에 실패했습니다.'
      })
    }

    if (!merchant) {
      return res.status(403).json({
        success: false,
        message: '결제요청 권한이 없습니다.'
      })
    }

    const token = randomBytes(24).toString('base64url')

    const tokenHash = createHash('sha256')
      .update(token)
      .digest('hex')

    const { data, error } = await supabase
      .from('sms_payment_requests')
      .insert({
        token_hash: tokenHash,
        merchant_id: session.id,
        product_name: productName,
        amount,
        status: 'pending'
      })
      .select('expires_at')
      .single()

    if (error || !data) {
      console.error(
        'SMS 결제요청 저장 실패:',
        error?.code || 'unknown'
      )

      return res.status(500).json({
        success: false,
        message: '결제요청 저장에 실패했습니다.'
      })
    }

    return res.status(200).json({
      success: true,
      paymentLink: BASE_URL + '/pay?t=' + token,
      expiresAt: data.expires_at
    })

  } catch (error) {
    console.error('SMS 결제요청 생성 오류:', error)

    return res.status(500).json({
      success: false,
      message: '결제요청 처리 중 오류가 발생했습니다.'
    })
  }
}