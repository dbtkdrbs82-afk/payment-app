// NXG 코페이 온라인 인증결제 콜백. 인증 결과는 승인 결과가 아닙니다.
const asText = (value) => String(value ?? '').trim()

function normalizeBody(body) {
  if (typeof body === 'string') return Object.fromEntries(new URLSearchParams(body))
  if (body && typeof body === 'object' && !Array.isArray(body)) return body
  return {}
}

function replyPage(res, heading, detail, status = 200) {
  const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c])
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  return res.status(status).send(
    `<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body style="font-family:sans-serif;padding:32px;line-height:1.7"><h2>${escapeHtml(heading)}</h2><p>${escapeHtml(detail)}</p></body></html>`
  )
}

function kstDate(value) {
  const v = asText(value)
  if (/^\d{14}$/.test(v)) {
    return `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6, 8)}T${v.slice(8, 10)}:${v.slice(10, 12)}:${v.slice(12, 14)}+09:00`
  }
  if (v && Number.isFinite(Date.parse(v))) return new Date(v).toISOString()
  return new Date().toISOString()
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return replyPage(res, '허용되지 않은 요청', 'POST만 허용됩니다.', 405)

  const body = normalizeBody(req.body)
  const code = asText(body.resultCode)
  const authKey = asText(body.paymentKey)
  const orderId = asText(body.orderNumber)
  const mid = asText(body.merchantId)
  const merchantId = Number(asText(body.reserved))
  const expectedAmount = Number(body.amount)

  if (code !== '0000' || !authKey) {
    return replyPage(res, '코페이 카드 인증 실패', '카드 승인 내역을 확인한 뒤 다시 시도해 주세요.', 400)
  }

  if (!/^[a-zA-Z0-9_-]{6,100}$/.test(orderId) ||
      !mid || authKey.length > 500 ||
      !Number.isSafeInteger(merchantId) || merchantId <= 0 ||
      !Number.isSafeInteger(expectedAmount) || expectedAmount <= 0) {
    return replyPage(res, '결제정보 확인 실패', '주문정보가 올바르지 않습니다. 관리자에게 문의해 주세요.', 400)
  }

  const supabaseUrl = asText(process.env.SUPABASE_URL).replace(/\/$/, '')
  const key = asText(process.env.SUPABASE_SERVICE_ROLE_KEY)
  if (!supabaseUrl || !key) {
    console.error('[Korpay] Supabase 환경변수 누락')
    return replyPage(res, '결제 처리 확인 필요', '관리자에게 결제 상태 확인을 요청해 주세요.', 503)
  }

  const headers = { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }
  const base = `${supabaseUrl}/rest/v1`
  const dbGet = async (url) => {
    const response = await fetch(url, { headers, cache: 'no-store' })
    if (!response.ok) throw new Error(`DB 조회 ${response.status}`)
    return response.json()
  }

  const successPage = (payment) => {
    const source = orderId.startsWith('SMSKORPAY') ? 'sms' : 'kiosk'
    const query = new URLSearchParams({
      source, pg: '코페이', orderId,
      amount: String(payment.amount), paymentKey: String(payment.payment_key),
      merchantId: String(merchantId)
    })
    const url = `/success?${query}`
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.setHeader('Cache-Control', 'no-store')
    return res.status(200).send(
      `<!doctype html><html lang="ko"><meta charset="utf-8"><body>` +
      `<script>window.location.replace(${JSON.stringify(url).replace(/</g, '\\u003c')})</script>` +
      `<p>승인 확인 완료. 결제완료 화면으로 이동합니다.</p></body></html>`
    )
  }

  try {
    // 코페이 MID가 이 가맹점에 실제 등록돼 있는지 서버에서 검증합니다.
    const merchants = await dbGet(`${base}/merchants?select=id,merchant_name,fee_rate,korpay_pg_mid,manager_admin_id,manager_admin_name,agency_admin_id,agency_admin_name,branch_admin_id,branch_admin_name&id=eq.${merchantId}&limit=1`)
    const merchant = merchants[0]
    if (!merchant || asText(merchant.korpay_pg_mid) !== mid) {
      return replyPage(res, '가맹점 확인 실패', '코페이 MID와 가맹점 정보를 확인해 주세요.', 400)
    }

    // 이미 승인된 주문을 다시 승인하지 않습니다.
    const oldRows = await dbGet(`${base}/payments?select=id,order_id,payment_key,merchant_id,pg_mid,amount,status,pg_company&order_id=eq.${encodeURIComponent(orderId)}&limit=2`)
    if (oldRows.length) {
      const old = oldRows[0]
      if (oldRows.length === 1 && old.status === 'paid' && old.pg_company === '코페이' &&
          Number(old.merchant_id) === merchantId && asText(old.pg_mid) === mid && Number(old.amount) === expectedAmount) {
        return successPage(old)
      }
      return replyPage(res, '결제 상태 확인 필요', '이 주문은 이미 처리 이력이 있습니다. 중복 결제를 시도하지 말고 관리자에게 확인해 주세요.', 409)
    }

    /* NXG_SMS_AMOUNT_GUARD */
    if (orderId.startsWith('SMSKORPAY')) {
      if (!/^SMSKORPAY[0-9a-f]{24}$/.test(orderId)) {
        return replyPage(
          res,
          '결제정보 확인 실패',
          'SMS 주문번호가 올바르지 않습니다.',
          400
        )
      }

      const smsQuery = new URLSearchParams({
        select: 'merchant_id,amount,status,payment_method',
        pg_order_id: `eq.${orderId}`,
        limit: '2'
      })

      const smsRows = await dbGet(
        `${base}/sms_payment_requests?${smsQuery}`
      )

      const smsRequest =
        smsRows.length === 1 ? smsRows[0] : null

      if (
        !smsRequest ||
        smsRequest.status !== 'processing' ||
        smsRequest.payment_method !== 'mobile' ||
        Number(smsRequest.merchant_id) !== merchantId ||
        Number(smsRequest.amount) !== expectedAmount
      ) {
        return replyPage(
          res,
          '결제정보 확인 실패',
          'SMS 결제금액 또는 진행 상태가 일치하지 않습니다.',
          409
        )
      }
    }

    // 코페이 공식 샘플: 인증 paymentKey로 서버 간 승인 호출.
    const confirmUrl = `https://payments.korpay.com/v1/payments/confirm?paymentKey=${encodeURIComponent(authKey)}`
    let response
    try {
      response = await fetch(confirmUrl, {
        method: 'POST', headers: { Accept: 'application/json', 'User-Agent': 'NXG-Korpay-Confirm/1.0' },
        signal: AbortSignal.timeout(20000)
      })
    } catch (error) {
      console.error('[Korpay] 승인 통신 실패 또는 타임아웃', error?.name)
      return replyPage(res, '결제 상태 확인 필요', '승인 결과가 불확실합니다. 재결제하지 말고 코페이 거래내역을 확인해 주세요.', 502)
    }

    const result = await response.json().catch(() => ({}))
    if (!response.ok || asText(result.resultCode) !== '3001') {
      console.error('[Korpay] 승인 거절', response.status, asText(result.resultCode))
      return replyPage(res, '결제 승인 실패', '코페이 승인에 실패했습니다. 관리자에게 확인해 주세요.', 400)
    }

    const approvedAmount = Number(result.amount)
    const approvedMid = asText(result.merchantId)
    const approvedOrder = asText(result.orderNumber)
    const tid = asText(result.tid)
    if (!tid || approvedOrder !== orderId || approvedMid !== mid || approvedAmount !== expectedAmount) {
      console.error('[Korpay] 승인 데이터 불일치', { orderMatch: approvedOrder === orderId, midMatch: approvedMid === mid, amountMatch: approvedAmount === expectedAmount })
      return replyPage(res, '결제 상태 확인 필요', '승인은 발생했을 수 있지만 거래정보 검증에 실패했습니다. 재결제하지 말고 관리자에게 문의해 주세요.', 502)
    }

    const feeRate = Number(merchant.fee_rate || 0)
    const feeAmount = Math.round(approvedAmount * feeRate / 100)
    const card = result.card || {}
    const digits = asText(card.cardNumber).replace(/[^0-9]/g, '')
    const safeCard = /^\d{13,19}$/.test(digits) ? `****${digits.slice(-4)}` : asText(card.cardNumber)
    const payment = {
      order_id: orderId, payment_key: tid, pg_order_no: orderId, pg_mid: approvedMid,
      merchant_id: merchantId, merchant_name: merchant.merchant_name || '',
      manager_admin_id: merchant.manager_admin_id || null,
      manager_admin_name: merchant.manager_admin_name || null,
      agency_admin_id: merchant.agency_admin_id || null,
      agency_admin_name: merchant.agency_admin_name || null,
      branch_admin_id: merchant.branch_admin_id || null,
      branch_admin_name: merchant.branch_admin_name || null,
      pg_company: '코페이', payment_method: '온라인인증', amount: approvedAmount, status: 'paid',
      fee_rate: feeRate, fee_amount: feeAmount, settlement_amount: approvedAmount - feeAmount,
      approval_number: asText(card.approvalNumber) || null,
      card_company: asText(card.approvalCode) || null,
      card_number: safeCard || null, installment_months: asText(card.installment) || '00',
      approved_at: kstDate(result.approvedAt),
      settlement_status: '정산대기', payout_status: '출금대기', duplicate_status: '정상',
      message: asText(result.productName) || '코페이 온라인 결제'
    }

    const saved = await fetch(`${base}/payments`, {
      method: 'POST', headers: { ...headers, Prefer: 'return=representation' },
      body: JSON.stringify(payment)
    })
    if (!saved.ok) {
      // Noti와 동시 저장 등 UNIQUE 충돌이면, 승인된 동일 거래인지 확인합니다.
      const rows = await dbGet(`${base}/payments?select=id,order_id,payment_key,merchant_id,pg_mid,amount,status,pg_company&payment_key=eq.${encodeURIComponent(tid)}&limit=2`)
      const old = rows[0]
      if (rows.length === 1 && old.status === 'paid' && old.order_id === orderId &&
          old.pg_company === '코페이' && Number(old.amount) === approvedAmount &&
          Number(old.merchant_id) === merchantId && asText(old.pg_mid) === mid) {
        return successPage(old)
      }
      console.error('[Korpay] 승인 성공 후 DB 저장 실패', saved.status)
      return replyPage(res, '결제 상태 확인 필요', '카드 승인은 성공했지만 저장 확인이 필요합니다. 재결제하지 말고 관리자에게 문의해 주세요.', 502)
    }

    const savedRows = await saved.json()
    return successPage(savedRows[0] || payment)
  } catch (error) {
    console.error('[Korpay] 콜백 오류', error?.message)
    return replyPage(res, '결제 상태 확인 필요', '처리 결과가 불확실합니다. 재결제하지 말고 관리자에게 확인해 주세요.', 502)
  }
}
