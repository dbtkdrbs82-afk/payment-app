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

  if (!/^[a-zA-Z0-9_-]{32}$/.test(token)) {
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
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || ''

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

    const { data: request, error } = await supabase
      .from('sms_payment_requests')
      .select(`
        merchant_id,
        amount,
        status,
        expires_at,
        payment_started_at,
        pg_order_id
      `)
      .eq('token_hash', tokenHash)
      .maybeSingle()

    if (error) {
      throw error
    }

    if (!request) {
      return res.status(404).json({
        success: false,
        message: '결제요청을 찾을 수 없습니다.'
      })
    }

    const orderId = String(request.pg_order_id || '')

    // 실제 저장된 승인내역을 최우선으로 확인
    if (orderId) {
      /* NXG_SMS_MANUAL_STATUS_V1 */
      if (/^SMSMANUAL[0-9a-f]{24}$/.test(orderId)) {
        return res.status(200).json({
          success: true,
          status: request.status === 'paid' ? 'paid' : 'review'
        })
      }

      const pgCompany = orderId.startsWith('SMSKORPAY')
        ? '코페이'
        : orderId.startsWith('SMSTOSS')
          ? '토스페이먼츠'
          : ''

      if (!pgCompany) {
        return res.status(200).json({
          success: true,
          status: 'review'
        })
      }

      const { data: payments, error: paymentError } =
        await supabase
          .from('payments')
          .select('id,amount,status,pg_company')
          .eq('order_id', orderId)
          .eq('merchant_id', request.merchant_id)
          .limit(2)

      if (paymentError) {
        throw paymentError
      }

      const payment =
        payments?.length === 1 ? payments[0] : null

      if (
        payment &&
        payment.status === 'paid' &&
        payment.pg_company === pgCompany &&
        Number(payment.amount) === Number(request.amount)
      ) {
        return res.status(200).json({
          success: true,
          status: 'paid',
          needsFinish: request.status !== 'paid'
        })
      }

      if (payments?.length) {
        return res.status(200).json({
          success: true,
          status: 'review'
        })
      }
    }

    if (request.status === 'paid') {
      return res.status(200).json({
        success: true,
        status: 'review'
      })
    }

    if (
      request.status === 'pending' &&
      new Date(request.expires_at).getTime() <= Date.now()
    ) {
      return res.status(200).json({
        success: true,
        status: 'expired'
      })
    }

    /* NXG_SMS_PROCESSING_REVIEW */
    if (request.status === 'processing') {
      const startedAt = new Date(request.payment_started_at || '').getTime()
      if (!Number.isFinite(startedAt) || Date.now() - startedAt >= 900000) {
        return res.status(200).json({ success: true, status: 'review' })
      }
    }
    return res.status(200).json({
      success: true,
      status: request.status
    })

  } catch (error) {
    console.error('SMS 결제 상태 조회 오류:', error)

    return res.status(500).json({
      success: false,
      message: '결제 상태 확인에 실패했습니다.'
    })
  }
}