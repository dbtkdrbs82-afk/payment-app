import type {
  VercelRequest,
  VercelResponse
} from '@vercel/node'

import { createHash } from 'node:crypto'
import { createClient } from '@supabase/supabase-js'

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

  const origin = String(req.headers.origin || '')

  if (origin && origin !== 'https://app.nxgsoft.co.kr') {
    return res.status(403).json({
      success: false,
      message: '허용되지 않은 요청입니다.'
    })
  }

  const token = String(req.body?.token || '')
  const orderId = String(req.body?.orderId || '')

  if (
    !/^[a-zA-Z0-9_-]{32}$/.test(token) ||
    !/^SMSKORPAY[0-9a-f]{24}$/.test(orderId)
  ) {
    return res.status(400).json({
      success: false,
      message: 'SMS 결제정보가 올바르지 않습니다.'
    })
  }

  const dbUrl =
    process.env.SUPABASE_URL?.trim() ||
    process.env.VITE_SUPABASE_URL?.trim() ||
    ''

  const dbKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || ''

  if (!dbUrl || !dbKey) {
    return res.status(503).json({
      success: false,
      message: '서버 설정 오류입니다.'
    })
  }

  try {
    const db = createClient(dbUrl, dbKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    })

    const tokenHash = createHash('sha256')
      .update(token)
      .digest('hex')

    const { data: payment, error: paymentError } =
      await db
        .from('sms_payment_requests')
        .select(`
          merchant_id,
          product_name,
          amount,
          status,
          payment_method,
          expires_at
        `)
        .eq('token_hash', tokenHash)
        .eq('pg_order_id', orderId)
        .maybeSingle()

    if (
      paymentError ||
      !payment ||
      payment.status !== 'processing' ||
      payment.payment_method !== 'mobile' ||
      !Number.isSafeInteger(Number(payment.amount)) ||
      Number(payment.amount) < 100 ||
      new Date(payment.expires_at).getTime() <= Date.now()
    ) {
      return res.status(409).json({
        success: false,
        message: '결제요청 상태 또는 금액을 확인할 수 없습니다.'
      })
    }

    const { data: merchant, error: merchantError } =
      await db
        .from('merchants')
        .select(`
          id,
          status,
          online_pg_company_1,
          korpay_pg_mid,
          korpay_pg_mkey
        `)
        .eq('id', payment.merchant_id)
        .maybeSingle()

    if (
      merchantError ||
      !merchant ||
      merchant.status !== '운영' ||
      merchant.online_pg_company_1 !== '코페이'
    ) {
      return res.status(403).json({
        success: false,
        message: '코페이 결제 가능한 가맹점이 아닙니다.'
      })
    }

    const mid = String(merchant.korpay_pg_mid || '')
    const mkey = String(merchant.korpay_pg_mkey || '')

    if (!mid.trim() || !mkey.trim()) {
      return res.status(400).json({
        success: false,
        message: '코페이 가맹점 설정을 확인해주세요.'
      })
    }

    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23'
    }).formatToParts(new Date())

    const values: Record<string, string> = {}

    for (const part of parts) {
      values[part.type] = part.value
    }

    const ediDate =
      values.year +
      values.month +
      values.day +
      values.hour +
      values.minute +
      values.second

    const amount = Number(payment.amount)

    // 기존 코페이 SHA-256 계산 방식과 동일
    const hashKey = createHash('sha256')
      .update(mid + ediDate + String(amount) + mkey)
      .digest('hex')

    return res.status(200).json({
      success: true,
      merchantId: merchant.id,
      mid,
      orderId,
      productName: payment.product_name,
      amount,
      ediDate,
      hashKey
    })

  } catch (error) {
    console.error('SMS 코페이 인증정보 생성 오류:', error)

    return res.status(500).json({
      success: false,
      message: '코페이 결제 준비 중 오류가 발생했습니다.'
    })
  }
}