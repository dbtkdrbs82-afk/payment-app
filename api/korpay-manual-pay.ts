import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createHash } from 'node:crypto'

function onlyDigits(value: unknown): string {
  return String(value ?? '').replace(/\D/g, '')
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'POST only'
    })
  }

  const supabaseUrl = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({
      success: false,
      message: 'Supabase 환경변수가 없습니다.'
    })
  }

  try {
    const {
      merchantId,
      amount,
      cardNumber,
      expiryYymm,
      installment,
      buyerName,
      goodsName,
      customerPhone
    } = req.body || {}

    const merchantDbId = Number(merchantId)
    const goodsAmt = Number(amount)
    const cardNo = onlyDigits(cardNumber)
    const expiry = onlyDigits(expiryYymm)
    const quotaMon = onlyDigits(installment || '00').padStart(2, '0')
    const ordHp = onlyDigits(customerPhone)

    if (!Number.isInteger(merchantDbId) || merchantDbId <= 0) {
      return res.status(400).json({
        success: false,
        message: '가맹점 정보가 올바르지 않습니다.'
      })
    }

    if (!Number.isFinite(goodsAmt) || goodsAmt <= 0) {
      return res.status(400).json({
        success: false,
        message: '결제금액이 올바르지 않습니다.'
      })
    }

    if (!/^\d{13,19}$/.test(cardNo)) {
      return res.status(400).json({
        success: false,
        message: '카드번호를 확인해주세요.'
      })
    }

    if (!/^\d{4}$/.test(expiry)) {
      return res.status(400).json({
        success: false,
        message: '유효기간은 YYMM 4자리로 입력해주세요.'
      })
    }

    const supabaseHeaders = {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json'
    }

    const merchantResponse = await fetch(
      `${supabaseUrl}/rest/v1/merchants` +
        `?select=id,merchant_name,korpay_manual_mid,korpay_manual_mkey` +
        `&id=eq.${merchantDbId}` +
        `&limit=1`,
      {
        method: 'GET',
        headers: supabaseHeaders
      }
    )

    const merchantRows = await merchantResponse.json()

    if (!merchantResponse.ok) {
      return res.status(500).json({
        success: false,
        message: '가맹점 조회에 실패했습니다.',
        detail: merchantRows
      })
    }

    const merchant =
      Array.isArray(merchantRows) && merchantRows.length > 0
        ? merchantRows[0]
        : null

    if (!merchant) {
      return res.status(404).json({
        success: false,
        message: '가맹점을 찾을 수 없습니다.'
      })
    }

    const mid = String(merchant.korpay_manual_mid || '').trim()
    const mkey = String(merchant.korpay_manual_mkey || '').trim()

    if (!mid || !mkey) {
      return res.status(400).json({
        success: false,
        message: '코페이 수기결제 MID 또는 MKEY가 등록되지 않았습니다.'
      })
    }

    const ordNo =
  'NXG' +
  Date.now().toString().slice(-12) +
  Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0')

    const hashKey = createHash('sha256')
      .update(mid + String(goodsAmt))
      .digest('hex')
      .toLowerCase()

    const korpayRequest = {
      ordNo,
      mkey,
      mid,
      goodsAmt: String(goodsAmt),
      cardNo,
      expireYymm: expiry,
      quotaMon,
      buyer_nm: String(buyerName || '구매자').trim(),
      goodsNm: String(goodsName || '일반 카드결제').trim(),
      ordHp,
      hashKey
    }

    const korpayUrl =
      process.env.KORPAY_MANUAL_PAY_URL ||
      'https://staging-pgapi.korpay.com/api/manualpay'

    const korpayResponse = await fetch(korpayUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(korpayRequest)
    })

    const responseText = await korpayResponse.text()

    let korpayData: Record<string, unknown>

    try {
      korpayData = JSON.parse(responseText)
    } catch {
      return res.status(502).json({
        success: false,
        message: '코페이 응답 형식이 올바르지 않습니다.',
        detail: responseText
      })
    }

    if (!korpayResponse.ok) {
      return res.status(korpayResponse.status).json({
        success: false,
        message: '코페이 수기결제 요청에 실패했습니다.',
        detail: korpayData
      })
    }

    const resultCode = String(
      korpayData.res_code ??
      korpayData.resultCode ??
      ''
    )

    if (resultCode !== '0000') {
      return res.status(400).json({
        success: false,
        message:
          String(korpayData.res_msg || '') ||
          '카드결제가 승인되지 않았습니다.',
        detail: korpayData
      })
    }

    return res.status(200).json({
      success: true,
      message: '결제가 승인되었습니다.',
      orderId: ordNo,
      approvalNumber: korpayData.APP_NO || null,
      approvedAt: korpayData.APP_DATE || null,
      tid: korpayData.TID || null,
      cardCompany: korpayData.VAN_ISS_CP_CD || null,
      response: korpayData
    })
  } catch (error) {
    console.error('Korpay manual payment error:', error)

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다.'
    })
  }
}