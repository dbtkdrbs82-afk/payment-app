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
  const requestedOrderId = String(req.body?.orderId || '')
  const hasOrderId = /^(SMSTOSS|SMSKORPAY)[0-9a-f]{24}$/.test(requestedOrderId)

  if (!hasOrderId && !/^[a-zA-Z0-9_-]{32}$/.test(token)) {
    return res.status(400).json({
      success: false,
      message: '결제요청 번호가 올바르지 않습니다.'
    })
  }

  const url =
    process.env.SUPABASE_URL?.trim() ||
    process.env.VITE_SUPABASE_URL?.trim() ||
    ''

  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    ''

  if (!url || !key) {
    return res.status(500).json({
      success: false,
      message: '서버 설정 오류입니다.'
    })
  }

  try {
    const supabase = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    })

    const tokenHash = createHash('sha256')
      .update(token)
      .digest('hex')

    const { data: request, error: requestError } =
      await supabase
        .from('sms_payment_requests')
        .select(`
          merchant_id,
          amount,
          status,
          pg_order_id
        `)
        .eq(hasOrderId ? 'pg_order_id' : 'token_hash', hasOrderId ? requestedOrderId : tokenHash)
        .maybeSingle()

    if (requestError || !request) {
      return res.status(404).json({
        success: false,
        message: '결제요청을 찾을 수 없습니다.'
      })
    }

    if (
      request.status !== 'processing' &&
      request.status !== 'paid'
    ) {
      return res.status(409).json({
        success: false,
        message: '결제 진행 상태를 확인해주세요.'
      })
    }

    const orderId = String(request.pg_order_id || '')

    const pgCompany = orderId.startsWith('SMSKORPAY')
      ? '코페이'
      : orderId.startsWith('SMSTOSS')
        ? '토스페이먼츠'
        : ''

    if (!pgCompany) {
      return res.status(400).json({
        success: false,
        message: '결제 주문번호를 확인할 수 없습니다.'
      })
    }

    const { data: payments, error: paymentError } =
      await supabase
        .from('payments')
        .select('id,amount,status,merchant_id,pg_company')
        .eq('order_id', orderId)
        .eq('merchant_id', request.merchant_id)
        .limit(2)

    if (paymentError) {
      return res.status(500).json({
        success: false,
        message: '승인 내역 조회에 실패했습니다.'
      })
    }

    const payment =
      payments?.length === 1 ? payments[0] : null

    if (
      !payment ||
      payment.status !== 'paid' ||
      payment.pg_company !== pgCompany ||
      Number(payment.amount) !== Number(request.amount)
    ) {
      return res.status(409).json({
        success: false,
        message:
          '결제 승인 저장을 확인하지 못했습니다. ' +
          '중복 결제하지 말고 관리자에게 확인해주세요.'
      })
    }

    if (request.status === 'paid') {
      return res.status(200).json({
        success: true,
        status: 'paid'
      })
    }

    const { data: updated, error: updateError } =
      await supabase
        .from('sms_payment_requests')
        .update({
          status: 'paid',
          paid_at: new Date().toISOString()
        })
        .eq('pg_order_id', orderId)
        .eq('pg_order_id', orderId)
        .eq('status', 'processing')
        .select('id')
        .maybeSingle()

    if (updateError) {
      return res.status(500).json({
        success: false,
        message: '결제 완료 상태 저장에 실패했습니다.'
      })
    }

    if (!updated) {
      return res.status(409).json({
        success: false,
        message: '결제요청 상태를 다시 확인해주세요.'
      })
    }

    return res.status(200).json({
      success: true,
      status: 'paid'
    })

  } catch (error) {
    console.error('SMS 결제 완료 확인 오류:', error)

    return res.status(500).json({
      success: false,
      message: '결제 완료 확인 중 오류가 발생했습니다.'
    })
  }
}