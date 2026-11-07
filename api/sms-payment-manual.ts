import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createHash, randomBytes } from 'node:crypto'
import { createClient } from '@supabase/supabase-js'
import korpayManualPay from './korpay-manual-pay.js'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false })
  }

  const origin = String(req.headers.origin || '')
  if (origin && origin !== 'https://app.nxgsoft.co.kr') {
    return res.status(403).json({ success: false })
  }

  const token = String(req.body?.token || '')
  const cardNumber = String(req.body?.cardNumber || '').replace(/\D/g, '')
  const expiryYymm = String(req.body?.expiryYymm || '').replace(/\D/g, '')
  const installment = String(req.body?.installment || '00')
  const buyerName = String(req.body?.buyerName || '').trim().slice(0, 40)
  const customerPhone = String(req.body?.customerPhone || '').replace(/\D/g, '')

  if (
    !/^[a-zA-Z0-9_-]{32}$/.test(token) ||
    !/^\d{13,19}$/.test(cardNumber) ||
    !/^\d{4}$/.test(expiryYymm) ||
    !/^(00|0[2-9]|1[0-2])$/.test(installment) ||
    customerPhone.length > 12
  ) {
    return res.status(400).json({
      success: false,
      message: '카드정보 또는 결제요청을 확인해주세요.'
    })
  }

  const url = process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL || ''
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

  if (!url || !key) {
    return res.status(503).json({
      success: false,
      message: '서버 설정 오류'
    })
  }

  const db = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false }
  })

  const tokenHash = createHash('sha256')
    .update(token).digest('hex')

  try {
    const { data: request, error } = await db
      .from('sms_payment_requests')
      .select('merchant_id,product_name,amount,status,expires_at')
      .eq('token_hash', tokenHash)
      .maybeSingle()

    if (
      error || !request ||
      request.status !== 'pending' ||
      new Date(request.expires_at).getTime() <= Date.now()
    ) {
      return res.status(409).json({
        success: false,
        message: '결제요청 상태를 확인해주세요.'
      })
    }

    const { data: merchant, error: merchantError } = await db
      .from('merchants')
      .select('id,status')
      .eq('id', request.merchant_id)
      .eq('status', '운영')
      .maybeSingle()

    if (merchantError || !merchant) {
      return res.status(403).json({
        success: false,
        message: '가맹점 정보를 확인해주세요.'
      })
    }

    const reference = 'SMSMANUAL' +
      randomBytes(12).toString('hex')

    const { data: locked, error: lockError } = await db
      .from('sms_payment_requests')
      .update({
        status: 'processing',
        payment_method: 'manual',
        pg_order_id: reference,
        payment_started_at: new Date().toISOString()
      })
      .eq('token_hash', tokenHash)
      .eq('status', 'pending')
      .gt('expires_at', new Date().toISOString())
      .select('merchant_id,product_name,amount')
      .maybeSingle()

    if (lockError || !locked) {
      return res.status(409).json({
        success: false,
        message: '다른 결제가 진행 중입니다.'
      })
    }

    let providerStatus = 500
    let providerResult: any = null

    const captured: any = {
      setHeader: () => captured,
      status: (code: number) => {
        providerStatus = code
        return captured
      },
      json: (value: any) => {
        providerResult = value
        return captured
      }
    }

    await korpayManualPay(
      {
        ...req,
        method: 'POST',
        body: {
          merchantId: locked.merchant_id,
          amount: locked.amount,
          goodsName: 'SMS결제 / ' + locked.product_name,
          cardNumber,
          expiryYymm,
          installment,
          buyerName,
          customerPhone,
          billingIds: []
        }
      } as VercelRequest,
      captured as VercelResponse
    )

    if (providerStatus !== 200 || providerResult?.success !== true) {
      // 첫 거래에서 PG사가 명확히 승인 거절했고 취소할 선승인 건도 없을 때만 해제
      const confirmedDecline =
        providerStatus === 400 &&
        providerResult?.failedSplit === 1 &&
        providerResult?.rollbackSuccess === true &&
        typeof providerResult?.resultCode === 'string' &&
        providerResult.resultCode !== '0000'

      if (confirmedDecline) {
        const { error: resetError } = await db
          .from('sms_payment_requests')
          .update({
            status: 'pending',
            pg_order_id: null,
            payment_method: null,
            payment_started_at: null
          })
          .eq('token_hash', tokenHash)
          .eq('status', 'processing')
          .eq('pg_order_id', reference)
        if (!resetError) {
          return res.status(400).json({
            success: false,
            message: '카드 승인이 거절됐습니다. 카드정보를 확인해 다시 시도해주세요.'
          })
        }
      }
      return res.status(409).json({
        success: false,
        message: '승인 결과 확인이 필요합니다. 재결제하지 말고 가맹점에 문의해주세요.'
      })
    }

    const splits = providerResult.splitPayments

    if (
      !Array.isArray(splits) ||
      splits.length === 0 ||
      Number(providerResult.totalAmount) !== Number(locked.amount)
    ) {
      return res.status(409).json({
        success: false,
        message: '승인금액 확인이 필요합니다.'
      })
    }

    const orderIds = splits.map((item: any) => String(item.orderId || ''))

    if (
      orderIds.some((id: string) => !/^\d{30}$/.test(id)) ||
      new Set(orderIds).size !== orderIds.length
    ) {
      return res.status(409).json({
        success: false,
        message: '승인번호 확인이 필요합니다.'
      })
    }

    const { data: payments, error: paymentError } = await db
      .from('payments')
      .select('order_id,amount,status,pg_company,payment_method')
      .eq('merchant_id', locked.merchant_id)
      .in('order_id', orderIds)

    if (
      paymentError ||
      payments?.length !== splits.length ||
      payments.some((payment: any) =>
        payment.status !== 'paid' ||
        payment.pg_company !== '코페이' ||
        payment.payment_method !== '수기결제'
      ) ||
      payments.reduce(
        (sum: number, payment: any) => sum + Number(payment.amount),
        0
      ) !== Number(locked.amount)
    ) {
      return res.status(409).json({
        success: false,
        message: '결제 승인내역 확인이 필요합니다.'
      })
    }

    const { data: completed, error: completionError } = await db
      .from('sms_payment_requests')
      .update({
        status: 'paid',
        paid_at: new Date().toISOString()
      })
      .eq('token_hash', tokenHash)
      .eq('pg_order_id', reference)
      .eq('status', 'processing')
      .select('id')
      .maybeSingle()

    if (completionError || !completed) {
      return res.status(500).json({
        success: false,
        message: '카드 승인은 완료됐으나 SMS 상태 확인이 필요합니다.'
      })
    }

    return res.status(200).json({
      success: true,
      status: 'paid',
      amount: Number(locked.amount)
    })

  } catch {
    return res.status(500).json({
      success: false,
      message: '결제 처리 결과를 확인해야 합니다. 재결제하지 마세요.'
    })
  }
}
