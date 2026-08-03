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
  const payoutDate = new Date(createdAt)

  const cycleText =
    String(settlementCycle || '1일').trim()

  const cycleNumberMatch = cycleText.match(/\d+/)

  const cycleDays = cycleNumberMatch
    ? Number(cycleNumberMatch[0])
    : 1

  payoutDate.setDate(
    payoutDate.getDate() + cycleDays
  )

  while (true) {
    const dayOfWeek = payoutDate.getDay()
    const dateText = formatDate(payoutDate)

    const isWeekend =
      dayOfWeek === 0 || dayOfWeek === 6

    const isHoliday =
      holidaySet.has(dateText)

    if (!isWeekend && !isHoliday) {
      return dateText
    }

    payoutDate.setDate(
      payoutDate.getDate() + 1
    )
  }
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

    const totalSettlementAmount =
      payoutGroups.reduce(
        (sum, group) =>
          sum + group.settlementAmount,
        0
      )

    return res.status(200).json({
      success: true,
      message: '가맹점별 자동정산 대상 계산 완료',
      today,
      groupCount: payoutGroups.length,
      paymentCount: payoutGroups.reduce(
        (sum, group) =>
          sum + group.paymentCount,
        0
      ),
      totalSettlementAmount,
      payoutGroups,
    })
  } catch (error) {
    console.error('자동정산 계산 오류:', error)

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : '자동정산 계산 중 오류가 발생했습니다.',
    })
  }
}