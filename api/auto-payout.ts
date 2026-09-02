import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

function formatDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getKoreaToday() {
  const koreaTime = new Date(
    new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Seoul',
    })
  )

  return formatDate(koreaTime)
}

function getPayoutDate(
  createdAt: string,
  settlementCycle: string,
  holidaySet: Set<string>
) {
  /*
   * 결제일을 한국시간 날짜 기준으로 변환
   * Vercel 서버 UTC 시간 때문에
   * 결제일이 하루 밀리는 문제도 방지
   */
  const createdDate =
    new Date(createdAt)

  const koreaDate =
    new Date(
      createdDate.getTime() +
      9 * 60 * 60 * 1000
    )

  const payoutDate =
    new Date(
      Date.UTC(
        koreaDate.getUTCFullYear(),
        koreaDate.getUTCMonth(),
        koreaDate.getUTCDate()
      )
    )

  const formatPayoutDate = (
    date: Date
  ) => {
    const year =
      date.getUTCFullYear()

    const month =
      String(
        date.getUTCMonth() + 1
      ).padStart(2, '0')

    const day =
      String(
        date.getUTCDate()
      ).padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  const cycleText =
    String(
      settlementCycle || '1일'
    ).trim()

  const cycleNumberMatch =
    cycleText.match(/\d+/)

  const cycleDays =
    cycleNumberMatch
      ? Number(cycleNumberMatch[0])
      : 1

  /*
   * 0일 정산
   * 결제일이 영업일이면 당일
   * 주말/공휴일이면 다음 영업일
   */
  if (cycleDays === 0) {
    while (true) {
      const dayOfWeek =
        payoutDate.getUTCDay()

      const dateText =
        formatPayoutDate(
          payoutDate
        )

      const isWeekend =
        dayOfWeek === 0 ||
        dayOfWeek === 6

      const isHoliday =
        holidaySet.has(
          dateText
        )

      if (
        !isWeekend &&
        !isHoliday
      ) {
        return dateText
      }

      payoutDate.setUTCDate(
        payoutDate.getUTCDate() + 1
      )
    }
  }

  /*
   * 정산주기는 영업일 기준으로 계산
   */
  let addedBusinessDays = 0

  while (
    addedBusinessDays <
    cycleDays
  ) {
    payoutDate.setUTCDate(
      payoutDate.getUTCDate() + 1
    )

    const dayOfWeek =
      payoutDate.getUTCDay()

    const dateText =
      formatPayoutDate(
        payoutDate
      )

    const isWeekend =
      dayOfWeek === 0 ||
      dayOfWeek === 6

    const isHoliday =
      holidaySet.has(
        dateText
      )

    if (
      isWeekend ||
      isHoliday
    ) {
      continue
    }

    addedBusinessDays += 1
  }

  return formatPayoutDate(
    payoutDate
  )
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'GET 요청만 가능합니다.',
    })
  }

  

  const cronSecret =
  process.env.CRON_SECRET?.trim()

if (!cronSecret) {
  return res.status(500).json({
    success: false,
    message: 'CRON_SECRET이 없습니다.',
  })
}

const authorization =
  String(req.headers.authorization || '')

if (
  authorization !== `Bearer ${cronSecret}`
) {
  return res.status(401).json({
    success: false,
    message: '자동정산 실행 권한이 없습니다.',
  })
}

  try {
    const supabaseUrl =
      process.env.SUPABASE_URL?.trim() ||
      process.env.VITE_SUPABASE_URL?.trim()

    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()

    if (!supabaseUrl) {
      return res.status(500).json({
        success: false,
        message: 'SUPABASE_URL이 없습니다.',
      })
    }

    if (!serviceRoleKey) {
      return res.status(500).json({
        success: false,
        message: 'SUPABASE_SERVICE_ROLE_KEY가 없습니다.',
      })
    }

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    )

    const [
      paymentsResult,
      merchantsResult,
      holidaysResult,
    ] = await Promise.all([
      supabase
        .from('payments')
        .select(`
          id,
          merchant_id,
          merchant_name,
          pg_company,
          settlement_amount,
          payout_status,
          payout_hold,
          created_at,
          status,
          settlement_status
        `)
        .eq('payout_status', '출금대기')
        .gte('created_at', '2026-08-02T15:00:00.000Z')
        .or('payout_hold.is.null,payout_hold.eq.false'),

      supabase
        .from('merchants')
        .select('id, settlement_cycle'),

      supabase
        .from('holidays')
        .select('holiday_date'),
    ])

    if (paymentsResult.error) {
      throw paymentsResult.error
    }

    if (merchantsResult.error) {
      throw merchantsResult.error
    }

    if (holidaysResult.error) {
      throw holidaysResult.error
    }

    const settlementCycleMap =
      new Map<number, string>()

    ;(merchantsResult.data || []).forEach(
      (merchant: any) => {
        settlementCycleMap.set(
          Number(merchant.id),
          String(
            merchant.settlement_cycle || '1일'
          )
        )
      }
    )

    const holidaySet = new Set<string>(
      (holidaysResult.data || []).map(
        (holiday: any) =>
          String(holiday.holiday_date)
      )
    )

    const today = getKoreaToday()

    const payoutGroupMap: Record<
      string,
      {
        merchantId: string
        merchantName: string
        pgCompany: string
        payoutDate: string
        paymentCount: number
        settlementAmount: number
        paymentIds: number[]
      }
    > = {}

    ;(paymentsResult.data || []).forEach(
      (payment: any) => {
        if (
          !payment.merchant_id ||
          payment.status === 'cancel' ||
          payment.settlement_status === '취소'
        ) {
          return
        }

        const settlementAmount =
          Number(payment.settlement_amount || 0)

        if (settlementAmount <= 0) {
          return
        }

        const settlementCycle =
          settlementCycleMap.get(
            Number(payment.merchant_id)
          ) || '1일'

        const payoutDate = getPayoutDate(
          payment.created_at,
          settlementCycle,
          holidaySet
        )

        if (payoutDate !== today) {
            return
        }

        const merchantId =
          String(payment.merchant_id)

        const groupKey =
          merchantId + '_' + payoutDate

        if (!payoutGroupMap[groupKey]) {
          payoutGroupMap[groupKey] = {
            merchantId,
            merchantName:
              payment.merchant_name || '-',
            pgCompany:
              payment.pg_company || '-',
            payoutDate,
            paymentCount: 0,
            settlementAmount: 0,
            paymentIds: [],
          }
        }

        payoutGroupMap[groupKey].paymentCount += 1

        payoutGroupMap[groupKey]
          .settlementAmount += settlementAmount

        payoutGroupMap[groupKey]
          .paymentIds.push(Number(payment.id))
      }
    )

    const payoutGroups =
  Object.values(payoutGroupMap)

const baseUrl = 'https://payment-app-lv6a.vercel.app'

const sellerResponse = await fetch(
  `${baseUrl}/api/toss-seller-get`
)

const sellerResponseText =
  await sellerResponse.text()

let sellerResult: any

try {
  sellerResult = JSON.parse(sellerResponseText)
} catch {
  return res.status(500).json({
    success: false,
    message: '토스 셀러 조회 API가 JSON이 아닌 응답을 반환했습니다.',
    requestUrl: `${baseUrl}/api/toss-seller-get`,
    status: sellerResponse.status,
    responsePreview: sellerResponseText.slice(0, 300),
  })
}

if (
  !sellerResponse.ok ||
  !sellerResult.success
) {
  return res.status(500).json({
    success: false,
    message: '토스 셀러 목록 조회에 실패했습니다.',
    data: sellerResult,
  })
}

const sellers =
  sellerResult?.data?.entityBody?.items || []

const results: any[] = []

for (const group of payoutGroups) {
  const rawMerchantId =
    String(group.merchantId || '').trim()

  const refSellerId =
    rawMerchantId.startsWith('MER')
      ? rawMerchantId
      : 'MER' + rawMerchantId.padStart(4, '0')

  const seller = sellers.find(
    (item: any) =>
      String(item.refSellerId || '').trim() ===
      refSellerId
  )

  if (!seller?.id) {
    await supabase
      .from('payments')
      .update({
        payout_status: '출금오류',
      })
      .in('id', group.paymentIds)

    results.push({
      merchantId: refSellerId,
      merchantName: group.merchantName,
      success: false,
      message: '토스 셀러가 등록되어 있지 않습니다.',
    })

    continue
  }

  if (seller.status !== 'APPROVED') {
    await supabase
      .from('payments')
      .update({
        payout_status: '출금오류',
      })
      .in('id', group.paymentIds)

    results.push({
      merchantId: refSellerId,
      merchantName: group.merchantName,
      success: false,
      message:
        '토스 셀러가 지급가능 상태가 아닙니다.',
      sellerStatus: seller.status,
    })

    continue
  }

  const minPaymentId =
    Math.min(...group.paymentIds)

  const maxPaymentId =
    Math.max(...group.paymentIds)

  const refPayoutId =
    'AUTO-' +
    today.replace(/-/g, '') +
    '-' +
    refSellerId +
    '-' +
    minPaymentId +
    '-' +
    maxPaymentId

  try {
    const payoutResponse = await fetch(
      `${baseUrl}/api/toss-payout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination: seller.id,
          amount: group.settlementAmount,
          transactionDescription: '자동정산',
          refPayoutId,
        }),
      }
    )

    const payoutResponseText =
  await payoutResponse.text()

let payoutResult: any

try {
  payoutResult = JSON.parse(payoutResponseText)
} catch {
  await supabase
    .from('payments')
    .update({
      payout_status: '출금오류',
    })
    .in('id', group.paymentIds)

  results.push({
    merchantId: refSellerId,
    merchantName: group.merchantName,
    amount: group.settlementAmount,
    success: false,
    refPayoutId,
    message: '토스 지급 API가 JSON이 아닌 응답을 반환했습니다.',
    status: payoutResponse.status,
    responsePreview: payoutResponseText.slice(0, 300),
  })

  continue
}

    if (
      !payoutResponse.ok ||
      !payoutResult.success
    ) {
      await supabase
        .from('payments')
        .update({
          payout_status: '출금오류',
        })
        .in('id', group.paymentIds)

      results.push({
        merchantId: refSellerId,
        merchantName: group.merchantName,
        amount: group.settlementAmount,
        success: false,
        refPayoutId,
        message:
          payoutResult?.data?.error?.message ||
          payoutResult?.message ||
          '토스 지급 요청에 실패했습니다.',
      })

      continue
    }

    const { error: payoutUpdateError } = await supabase
  .from('payments')
  .update({
    payout_status: '출금완료',
    payout_time: new Date().toISOString(),
  })
  .in('id', group.paymentIds)

if (payoutUpdateError) {
  results.push({
    merchantId: refSellerId,
    merchantName: group.merchantName,
    amount: group.settlementAmount,
    success: false,
    refPayoutId,
    message:
      '토스 지급은 성공했지만 출금완료 저장에 실패했습니다: ' +
      payoutUpdateError.message,
  })

  continue
}

results.push({
  merchantId: refSellerId,
  merchantName: group.merchantName,
  amount: group.settlementAmount,
  success: true,
  refPayoutId,
  message: '자동정산 완료',
})

    
  } catch (error) {
    await supabase
      .from('payments')
      .update({
        payout_status: '출금오류',
      })
      .in('id', group.paymentIds)

    results.push({
      merchantId: refSellerId,
      merchantName: group.merchantName,
      amount: group.settlementAmount,
      success: false,
      refPayoutId,
      message:
        error instanceof Error
          ? error.message
          : '자동정산 중 오류가 발생했습니다.',
    })
  }
}

return res.status(200).json({
    success: true,
    message: '자동정산 실행 완료',
    today,
    groupCount: payoutGroups.length,
    successCount: results.filter(
      (result) => result.success
    ).length,
    failureCount: results.filter(
      (result) => !result.success
    ).length,
    results,
  })
} catch (error) {
  console.error('자동정산 오류:', error)

  return res.status(500).json({
    success: false,
    message:
      error instanceof Error
        ? error.message
        : '자동정산 중 오류가 발생했습니다.',
  })
}
}