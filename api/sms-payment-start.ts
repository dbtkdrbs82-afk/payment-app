import type {
  VercelRequest,
  VercelResponse
} from '@vercel/node'

import {
  createHash,
  randomBytes
} from 'node:crypto'

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

  if (
    origin &&
    origin !== 'https://app.nxgsoft.co.kr'
  ) {
    return res.status(403).json({
      success: false,
      message: '허용되지 않은 요청입니다.'
    })
  }

  const token = String(req.body?.token || '')
  const method = String(req.body?.method || '')

  if (!/^[a-zA-Z0-9_-]{32}$/.test(token)) {
    return res.status(400).json({
      success: false,
      message: '올바르지 않은 결제 링크입니다.'
    })
  }

  // 고객 공개용 수기결제는 별도 보안 연결 후 활성화
  if (method !== 'mobile') {
    return res.status(400).json({
      success: false,
      message: '지원하지 않는 결제방식입니다.'
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

    const { data: request, error: readError } =
      await supabase
        .from('sms_payment_requests')
        .select(`
          merchant_id,
          product_name,
          amount,
          status,
          payment_method,
          pg_order_id,
          expires_at
        `)
        .eq('token_hash', tokenHash)
        .maybeSingle()

    if (readError || !request) {
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
      return res.status(409).json({
        success: false,
        message: '이미 진행 중이거나 만료된 결제입니다.'
      })
    }

    const { data: merchant, error: merchantError } =
      await supabase
        .from('merchants')
        .select('id,status,online_pg_company_1')
        .eq('id', request.merchant_id)
        .maybeSingle()

    if (
      merchantError ||
      !merchant ||
      merchant.status !== '운영'
    ) {
      return res.status(403).json({
        success: false,
        message: '결제 가능한 가맹점이 아닙니다.'
      })
    }

    const pgCompany = String(
      merchant.online_pg_company_1 || ''
    ).trim()

    if (
      pgCompany !== '토스페이먼츠' &&
      pgCompany !== '코페이'
    ) {
      return res.status(400).json({
        success: false,
        message: '온라인 결제사가 설정되지 않았습니다.'
      })
    }


    // SMS ????: ???? ?? ?? ???? ???
    if (request.status === 'processing') {
      const existingOrderId = String(request.pg_order_id || '');
      const prefix = pgCompany === '\uCF54\uD398\uC774' ? 'SMSKORPAY' : 'SMSTOSS';

      if (
        request.payment_method !== 'mobile' ||
        !existingOrderId.startsWith(prefix) ||
        !/^(SMSKORPAY|SMSTOSS)[0-9a-f]{24}$/.test(existingOrderId)
      ) {
        return res.status(409).json({
          success: false,
          message: '?? ?? ??? ??????.'
        });
      }

      const { data: rows, error: checkError } = await supabase
        .from('payments')
        .select('id')
        .eq('order_id', existingOrderId)
        .eq('merchant_id', request.merchant_id)
        .limit(1);

      if (checkError || rows?.length) {
        return res.status(409).json({
          success: false,
          message: '?? ???? ??? ?????.'
        });
      }

      return res.status(200).json({
        success: true,
        merchantId: request.merchant_id,
        productName: request.product_name,
        amount: request.amount,
        orderId: existingOrderId,
        pgCompany
      });
    }

    const orderId =
      (pgCompany === '코페이'
        ? 'SMSKORPAY'
        : 'SMSTOSS') +
      randomBytes(12).toString('hex')

    const { data: started, error: startError } =
      await supabase
        .from('sms_payment_requests')
        .update({
          status: 'processing',
          pg_order_id: orderId,
          payment_method: 'mobile',
          payment_started_at: new Date().toISOString()
        })
        .eq('token_hash', tokenHash)
        .eq('status', 'pending')
        .gt('expires_at', new Date().toISOString())
        .select(`
          merchant_id,
          product_name,
          amount,
          pg_order_id
        `)
        .maybeSingle()

    if (startError) {
      console.error(
        'SMS 결제 시작 오류:',
        startError.code
      )

      return res.status(500).json({
        success: false,
        message: '결제 시작 처리에 실패했습니다.'
      })
    }

    if (!started) {
      return res.status(409).json({
        success: false,
        message: '이미 다른 결제가 진행 중입니다.'
      })
    }

    return res.status(200).json({
      success: true,
      merchantId: started.merchant_id,
      productName: started.product_name,
      amount: started.amount,
      orderId: started.pg_order_id,
      pgCompany
    })

  } catch (error) {
    console.error('SMS 결제 시작 오류:', error)

    return res.status(500).json({
      success: false,
      message: '결제 시작 중 오류가 발생했습니다.'
    })
  }
}