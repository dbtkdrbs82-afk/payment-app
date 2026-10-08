import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createHash, randomBytes } from 'node:crypto'

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
      billingIds,
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

    const merchantRows =
      await merchantResponse.json()

    if (!merchantResponse.ok) {
      return res.status(500).json({
        success: false,
        message: '가맹점 조회에 실패했습니다.',
        detail: merchantRows
      })
    }

    const merchant =
      Array.isArray(merchantRows) &&
      merchantRows.length > 0
        ? merchantRows[0]
        : null

    if (!merchant) {
      return res.status(404).json({
        success: false,
        message: '가맹점을 찾을 수 없습니다.'
      })
    }


    /* =========================================
       코페이 수기결제 다중 MID 조회
    ========================================= */

    const manualMidResponse =
      await fetch(
        `${supabaseUrl}/rest/v1/merchant_korpay_manual_mids` +
          `?select=id,merchant_id,mid,mkey,priority,monthly_limit,status` +
          `&merchant_id=eq.${merchantDbId}` +
          `&status=eq.${encodeURIComponent('사용중')}` +
          `&order=priority.asc,id.asc`,
        {
          method: 'GET',
          headers: supabaseHeaders
        }
      )

    const manualMidResult =
      await manualMidResponse.json()

    if (!manualMidResponse.ok) {
      return res.status(500).json({
        success: false,
        message:
          '코페이 수기결제 MID 목록 조회에 실패했습니다.',
        detail: manualMidResult
      })
    }


    let manualMidRows: any[] =
      Array.isArray(manualMidResult)
        ? manualMidResult
        : []


    /*
     * 기존 merchants MID도 당분간 fallback으로 유지
     * 새 테이블에 데이터가 없는 기존 가맹점 보호
     */
    if (
      manualMidRows.length === 0 &&
      String(
        merchant.korpay_manual_mid || ''
      ).trim() &&
      String(
        merchant.korpay_manual_mkey || ''
      ).trim()
    ) {

      manualMidRows = [
        {
          mid:
            String(
              merchant.korpay_manual_mid
            ).trim(),

          mkey:
            String(
              merchant.korpay_manual_mkey
            ).trim(),

          priority: 1,

          monthly_limit:
            5000000,

          status:
            '사용중'
        }
      ]
    }


    if (manualMidRows.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          '사용 가능한 코페이 수기결제 MID가 없습니다.'
      })
    }


    /* =========================================
       한국시간 기준 이번 달 범위 계산
    ========================================= */

    const koreaDateParts =
      new Intl.DateTimeFormat(
        'en-US',
        {
          timeZone:
            'Asia/Seoul',

          year:
            'numeric',

          month:
            '2-digit'
        }
      ).formatToParts(
        new Date()
      )


    const koreaYear =
      Number(
        koreaDateParts.find(
          (part) =>
            part.type === 'year'
        )?.value || 0
      )


    const koreaMonth =
      Number(
        koreaDateParts.find(
          (part) =>
            part.type === 'month'
        )?.value || 0
      )


    if (
      !koreaYear ||
      !koreaMonth
    ) {

      return res.status(500).json({
        success: false,
        message:
          '월 결제한도 기준일 계산에 실패했습니다.'
      })
    }


    const monthStart =
      new Date(
        `${koreaYear}-` +
        `${String(koreaMonth).padStart(2, '0')}-` +
        `01T00:00:00+09:00`
      )


    const nextMonthYear =
      koreaMonth === 12
        ? koreaYear + 1
        : koreaYear


    const nextMonthValue =
      koreaMonth === 12
        ? 1
        : koreaMonth + 1


    const nextMonthStart =
      new Date(
        `${nextMonthYear}-` +
        `${String(nextMonthValue).padStart(2, '0')}-` +
        `01T00:00:00+09:00`
      )


    const monthStartIso =
      monthStart.toISOString()

    const nextMonthStartIso =
      nextMonthStart.toISOString()


    /* =========================================
       MID별 월 승인금액 확인 후 사용 MID 선택
    ========================================= */

    let selectedManualMid: any =
      null

    let selectedMonthlyUsed =
      0


    for (
      const manualMid of manualMidRows
    ) {

      const candidateMid =
        String(
          manualMid.mid || ''
        ).trim()


      const candidateMkey =
        String(
          manualMid.mkey || ''
        ).trim()


      const candidateMonthlyLimit =
        Number(
          manualMid.monthly_limit ||
          5000000
        )


      if (
        !candidateMid ||
        !candidateMkey ||
        !Number.isFinite(
          candidateMonthlyLimit
        ) ||
        candidateMonthlyLimit <= 0
      ) {
        continue
      }


      const monthlyPaymentResponse =
        await fetch(
          `${supabaseUrl}/rest/v1/payments` +
            `?select=amount` +
            `&pg_mid=eq.${encodeURIComponent(candidateMid)}` +
            `&pg_company=eq.${encodeURIComponent('코페이')}` +
            `&payment_method=eq.${encodeURIComponent('수기결제')}` +
            `&status=eq.paid` +
            `&created_at=gte.${encodeURIComponent(monthStartIso)}` +
            `&created_at=lt.${encodeURIComponent(nextMonthStartIso)}`,
          {
            method: 'GET',
            headers: supabaseHeaders
          }
        )


      const monthlyPaymentRows =
        await monthlyPaymentResponse.json()


      if (!monthlyPaymentResponse.ok) {

        console.error(
          '코페이 MID 월 사용금액 조회 실패:',
          candidateMid,
          monthlyPaymentRows
        )

        continue
      }


      const monthlyUsed =
        (
          Array.isArray(
            monthlyPaymentRows
          )
            ? monthlyPaymentRows
            : []
        ).reduce(
          (
            sum: number,
            payment: any
          ) =>
            sum +
            Number(
              payment.amount || 0
            ),
          0
        )


      if (
        monthlyUsed +
        goodsAmt <=
        candidateMonthlyLimit
      ) {

        selectedManualMid =
          manualMid

        selectedMonthlyUsed =
          monthlyUsed

        break
      }
    }


    if (!selectedManualMid) {

      return res.status(400).json({
        success: false,

        message:
          '등록된 코페이 수기결제 MID의 월 결제한도가 모두 부족합니다.',

        resultCode:
          'MONTHLY_LIMIT_EXCEEDED'
      })
    }


    const mid =
      String(
        selectedManualMid.mid
      ).trim()


    const mkey =
      String(
        selectedManualMid.mkey
      ).trim()


    const monthlyLimit =
      Number(
        selectedManualMid.monthly_limit ||
        5000000
      )


    console.log(
      '[코페이 수기결제 MID 선택]',
      {
        merchantId:
          merchantDbId,

        mid,

        monthlyUsed:
          selectedMonthlyUsed,

        paymentAmount:
          goodsAmt,

        monthlyLimit,

        priority:
          selectedManualMid.priority
      }
    )

    const ordNo =
  Date.now().toString().padStart(13, '0').slice(-13) +
  Array.from(
    randomBytes(17),
    (byte) => String(byte % 10)
  ).join('')

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
      
          resultCode,
          usedMid: mid,
          usedMkeyLast4: mkey.slice(-4),
      
          detail: korpayData
        })
      }

      const paymentTid =
  String(korpayData.TID || '').trim()



    const normalizedBillingIds =
    Array.isArray(billingIds)
      ? billingIds
          .map((id) => Number(id))
          .filter((id) => id > 0)
      : []
  
  
  const approvalNumber =
    String(
      korpayData.APP_NO ||
      korpayData.app_no ||
      korpayData.approval_number ||
      korpayData.approvalNo ||
      ''
    ).trim() || null
  
  
  const cardNumberResult =
    String(
      korpayData.CARD_NO ||
      korpayData.cardNo ||
      ''
    ).trim() || null
  
  
  const paymentMessage =
    normalizedBillingIds.length > 0
      ? (
          '아카데미 정기결제 / 청구ID ' +
          normalizedBillingIds.join(',')
        )
      : (
          String(
            goodsName ||
            '수기결제'
          ).trim()
        )
  
  
  const paymentSenderName =
    String(
      buyerName ||
      ''
    ).trim() || null
  
  
  if (paymentTid) {
  
    const paymentResponse =
      await fetch(
        `${supabaseUrl}/rest/v1/payments`,
        {
          method: 'POST',
  
          headers: {
            ...supabaseHeaders,
            Prefer: 'return=minimal'
          },
  
          body:
            JSON.stringify({
  
              order_id:
                ordNo,
  
              payment_key:
                paymentTid,
  
              pg_order_no:
                ordNo,
  
              pg_mid:
                mid,
  
              merchant_id:
                merchantDbId,
  
              merchant_name:
                merchant.merchant_name ||
                null,
  
              amount:
                goodsAmt,
  
              status:
                'paid',
  
              pg_company:
                '코페이',
  
              payment_method:
                '수기결제',
  
              sender_name:
                paymentSenderName,
  
              message:
                paymentMessage,
  
              approval_number:
                approvalNumber,
  
              card_number:
                cardNumberResult,
  
              installment_months:
                quotaMon || '00',
  
              approved_at:
                new Date().toISOString(),
  
              settlement_status:
                '정산대기',
  
              payout_status:
                '출금대기',
  
              duplicate_status:
                '정상'
            })
        }
      )
  
  
    if (!paymentResponse.ok) {
  
      const paymentSaveError =
        await paymentResponse.text()
  
      console.error(
        '코페이 수기결제 payments 저장 실패:',
        paymentSaveError
      )
  
      return res.status(500).json({
        success: false,
  
        message:
          '코페이 결제는 승인됐지만 결제내역 저장에 실패했습니다.',
  
        approvalNumber,
  
        tid:
          paymentTid,
  
        usedMid:
          mid
      })
    }
  }

    return res.status(200).json({
      success: true,
      message: '결제가 승인되었습니다.',
      orderId: ordNo,
      usedMid: mid,
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