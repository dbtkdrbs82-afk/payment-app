import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

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

  try {
    const supabaseUrl =
      process.env.VITE_SUPABASE_URL?.trim()

    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()

    if (!supabaseUrl) {
      return res.status(500).json({
        success: false,
        message: 'VITE_SUPABASE_URL이 없습니다.',
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

    const { data: payments, error } = await supabase
      .from('payments')
      .select(`
        id,
        merchant_id,
        merchant_name,
        pg_company,
        amount,
        fee_amount,
        settlement_amount,
        payout_status,
        payout_hold,
        created_at
      `)
      .eq('payout_status', '출금대기')
      .or('payout_hold.is.null,payout_hold.eq.false')
      .order('created_at', {
        ascending: true,
      })

    if (error) {
      return res.status(500).json({
        success: false,
        message: '출금대기 조회 실패',
        error: error.message,
      })
    }

    const payoutRows = payments || []

    const totalSettlementAmount =
      payoutRows.reduce(
        (sum, payment) =>
          sum +
          Number(
            payment.settlement_amount ||
            0
          ),
        0
      )

    return res.status(200).json({
      success: true,
      message: '자동정산 대상 조회 완료',
      executedAt: new Date().toISOString(),
      paymentCount: payoutRows.length,
      totalSettlementAmount,
      payments: payoutRows,
    })
  } catch (error) {
    console.error('자동정산 조회 오류:', error)

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : '자동정산 조회 중 오류가 발생했습니다.',
    })
  }
}