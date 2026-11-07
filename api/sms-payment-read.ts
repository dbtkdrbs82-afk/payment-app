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
  res.setHeader('Referrer-Policy', 'no-referrer')
  res.setHeader('X-Content-Type-Options', 'nosniff')

  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'GET 요청만 가능합니다.'
    })
  }

  const token = req.query.t

  if (
    typeof token !== 'string' ||
    !/^[a-zA-Z0-9_-]{32}$/.test(token)
  ) {
    return res.status(400).json({
      success: false,
      message: '올바르지 않은 결제 링크입니다.'
    })
  }

  const supabaseUrl =
    process.env.SUPABASE_URL?.trim() ||
    process.env.VITE_SUPABASE_URL?.trim() ||
    ''

  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || ''

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({
      success: false,
      message: '서버 설정 오류입니다.'
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

    const tokenHash = createHash('sha256')
      .update(token)
      .digest('hex')

    const { data: request, error } = await supabase
      .from('sms_payment_requests')
      .select(`
        merchant_id,
        product_name,
        amount,
        status,
        expires_at
      `)
      .eq('token_hash', tokenHash)
      .maybeSingle()

    if (error) {
      return res.status(500).json({
        success: false,
        message: '결제정보 조회에 실패했습니다.'
      })
    }

    if (!request) {
      return res.status(404).json({
        success: false,
        message: '결제요청을 찾을 수 없습니다.'
      })
    }

    if (
      (request.status !== 'pending' && request.status !== 'processing') ||
      !request.expires_at ||
      new Date(request.expires_at).getTime() <= Date.now()
    ) {
      return res.status(410).json({
        success: false,
        message: '만료되었거나 사용할 수 없는 결제요청입니다.'
      })
    }

    const { data: merchant, error: merchantError } =
      await supabase
        .from('merchants')
        .select('merchant_name,status')
        .eq('id', request.merchant_id)
        .maybeSingle()

    if (
      merchantError ||
      !merchant ||
      merchant.status !== '운영'
    ) {
      return res.status(404).json({
        success: false,
        message: '가맹점 정보를 확인할 수 없습니다.'
      })
    }

    return res.status(200).json({
      success: true,
      merchantId: request.merchant_id,
      merchantName: merchant.merchant_name,
      productName: request.product_name,
      amount: request.amount,
      expiresAt: request.expires_at
    })

  } catch (error) {
    console.error('SMS 결제정보 조회 오류:', error)

    return res.status(500).json({
      success: false,
      message: '결제정보 처리 중 오류가 발생했습니다.'
    })
  }
}