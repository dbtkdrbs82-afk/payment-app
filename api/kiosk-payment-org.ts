import type {
    VercelRequest,
    VercelResponse,
  } from '@vercel/node'
  
  import { createClient } from '@supabase/supabase-js'
  
  const SUPABASE_URL =
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    ''
  
  const SUPABASE_SERVICE_ROLE_KEY =
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  
  export default async function handler(
    req: VercelRequest,
    res: VercelResponse
  ) {
    res.setHeader(
      'Cache-Control',
      'no-store'
    )
  
    if (req.method !== 'POST') {
      return res.status(405).json({
        success: false,
        message: 'POST 요청만 가능합니다.',
      })
    }
  
    if (
      !SUPABASE_URL ||
      !SUPABASE_SERVICE_ROLE_KEY
    ) {
      return res.status(500).json({
        success: false,
        message: '서버 설정 오류입니다.',
      })
    }
  
    const merchantId =
      Number(req.body?.merchant_id || 0)
  
    const orderNo =
      String(
        req.body?.order_no || ''
      ).trim()
  
    if (
      !merchantId ||
      !Number.isFinite(merchantId) ||
      merchantId <= 0 ||
      !orderNo
    ) {
      return res.status(400).json({
        success: false,
        message: '주문 정보가 올바르지 않습니다.',
      })
    }
  
    try {
      const supabase = createClient(
        SUPABASE_URL,
        SUPABASE_SERVICE_ROLE_KEY,
        {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          },
        }
      )
  
      /*
       * 1. 실제 저장된 주문 확인
       */
  
      const {
        data: orderRows,
        error: orderError,
      } = await supabase
        .from('orders')
        .select(`
          order_no,
          merchant_id,
          total_amount,
          payment_status,
          beauty_staff_id,
          reservation_date,
          reservation_time
        `)
        .eq(
          'order_no',
          orderNo
        )
        .eq(
          'merchant_id',
          merchantId
        )
        .limit(1)
  
      if (orderError) {
        console.error(
          '키오스크 주문 확인 오류:',
          orderError.message
        )
  
        return res.status(500).json({
          success: false,
          message:
            '주문 정보를 확인하지 못했습니다.',
        })
      }
  
      const order =
        orderRows?.[0]
  
      if (!order) {
        return res.status(404).json({
          success: false,
          message:
            '저장된 주문 정보를 찾을 수 없습니다.',
        })
      }
  
      if (
        String(
          order.payment_status || ''
        ) !== '결제완료'
      ) {
        return res.status(400).json({
          success: false,
          message:
            '결제완료된 주문이 아닙니다.',
        })
      }
  
      /*
       * 2. 중복 결제내역 방지
       */
  
      const {
        data: existingPayments,
        error: existingPaymentError,
      } = await supabase
        .from('payments')
        .select('id')
        .eq(
          'order_id',
          orderNo
        )
        .limit(1)
  
      if (existingPaymentError) {
        console.error(
          '기존 결제 확인 오류:',
          existingPaymentError.message
        )
  
        return res.status(500).json({
          success: false,
          message:
            '기존 결제정보를 확인하지 못했습니다.',
        })
      }
  
      if (
        existingPayments &&
        existingPayments.length > 0
      ) {
        return res.status(200).json({
          success: true,
          already_saved: true,
        })
      }
  
      /*
       * 3. 가맹점 정보
       */
  
      const {
        data: merchant,
        error: merchantError,
      } = await supabase
        .from('merchants')
        .select(`
          id,
          merchant_name,
          fee_rate,
          settlement_cycle,
          branch_admin_id,
          agency_admin_id,
          manager_admin_id
        `)
        .eq(
          'id',
          merchantId
        )
        .maybeSingle()
  
      if (
        merchantError ||
        !merchant
      ) {
        return res.status(404).json({
          success: false,
          message:
            '가맹점 정보를 찾을 수 없습니다.',
        })
      }
  
      const settlementCycle =
        String(
          merchant.settlement_cycle ||
          '4일'
        )
  
      const getCommissionRate = (
        adminUser: any
      ) => {
        if (!adminUser) return 0
  
        if (
          settlementCycle === '1일'
        ) {
          return Number(
            adminUser
              .commission_rate_1day || 0
          )
        }
  
        if (
          settlementCycle === '3일'
        ) {
          return Number(
            adminUser
              .commission_rate_3day || 0
          )
        }
  
        if (
          settlementCycle === '7일'
        ) {
          return Number(
            adminUser
              .commission_rate_7day || 0
          )
        }
  
        return Number(
          adminUser
            .commission_rate_4day || 0
        )
      }
  
      const getAdmin = async (
        adminId: number
      ) => {
        const {
          data,
          error,
        } = await supabase
          .from('admin_users')
          .select(`
            id,
            admin_name,
            parent_admin_id,
            commission_rate_1day,
            commission_rate_3day,
            commission_rate_4day,
            commission_rate_7day
          `)
          .eq(
            'id',
            adminId
          )
          .maybeSingle()
  
        if (error) {
          throw error
        }
  
        return data
      }
  
      /*
       * 4. 조직 수수료 계산
       */
  
      let managerAdminId =
        merchant.manager_admin_id
          ? Number(
              merchant.manager_admin_id
            )
          : null
  
      let managerAdminName = ''
      let managerFeeRate = 0
  
      let agencyAdminId =
        merchant.agency_admin_id
          ? Number(
              merchant.agency_admin_id
            )
          : null
  
      let agencyAdminName = ''
      let agencyFeeRate = 0
  
      let branchAdminId =
        merchant.branch_admin_id
          ? Number(
              merchant.branch_admin_id
            )
          : null
  
      let branchAdminName = ''
      let branchFeeRate = 0
  
      if (managerAdminId) {
        const manager =
          await getAdmin(
            managerAdminId
          )
  
        if (manager) {
          managerAdminName =
            manager.admin_name || ''
  
          managerFeeRate =
            getCommissionRate(
              manager
            )
  
          if (
            !agencyAdminId &&
            manager.parent_admin_id
          ) {
            agencyAdminId =
              Number(
                manager.parent_admin_id
              )
          }
        }
      }
  
      if (agencyAdminId) {
        const agency =
          await getAdmin(
            agencyAdminId
          )
  
        if (agency) {
          agencyAdminName =
            agency.admin_name || ''
  
          agencyFeeRate =
            getCommissionRate(
              agency
            )
  
          if (
            !branchAdminId &&
            agency.parent_admin_id
          ) {
            branchAdminId =
              Number(
                agency.parent_admin_id
              )
          }
        }
      }
  
      if (branchAdminId) {
        const branch =
          await getAdmin(
            branchAdminId
          )
  
        if (branch) {
          branchAdminName =
            branch.admin_name || ''
  
          branchFeeRate =
            getCommissionRate(
              branch
            )
        }
      }
  
      /*
       * 5. 결제금액 / 가맹점 수수료
       */
  
      const amount =
        Number(
          order.total_amount || 0
        )
  
      const feeRate =
        Number(
          merchant.fee_rate || 0
        )
  
      const feeAmount =
        Math.floor(
          amount *
          feeRate /
          100
        )
  
      const settlementAmount =
        amount - feeAmount
  
      /*
       * 6. payments 저장
       */
  
      const {
        error: paymentError,
      } = await supabase
        .from('payments')
        .insert({
          order_id:
            orderNo,
  
          payment_key:
            'kiosk-' + orderNo,
  
          amount,
  
          fee_rate:
            feeRate,
  
          fee_amount:
            feeAmount,
  
          settlement_amount:
            settlementAmount,
  
          status:
            'paid',
  
          merchant_id:
            merchantId,
  
          merchant_name:
            merchant.merchant_name || '',
  
          beauty_staff_id:
            order.beauty_staff_id || null,
  
          reservation_date:
            order.reservation_date || null,
  
          reservation_time:
            order.reservation_time || null,
  
          manager_admin_id:
            managerAdminId,
  
          manager_admin_name:
            managerAdminName,
  
          manager_fee_rate:
            managerFeeRate,
  
          agency_admin_id:
            agencyAdminId,
  
          agency_admin_name:
            agencyAdminName,
  
          agency_fee_rate:
            agencyFeeRate,
  
          branch_admin_id:
            branchAdminId,
  
          branch_admin_name:
            branchAdminName,
  
          branch_fee_rate:
            branchFeeRate,
  
          order_status:
            '준비중',
  
          pg_company:
            '코페이',
        })
  
      if (paymentError) {
        console.error(
          '키오스크 결제 저장 오류:',
          paymentError.message
        )
  
        return res.status(500).json({
          success: false,
          message:
            '결제내역 저장에 실패했습니다.',
        })
      }
  
      return res.status(200).json({
        success: true,
        already_saved: false,
      })
    } catch (error) {
      console.error(
        '키오스크 결제 저장 API 오류:',
        error
      )
  
      return res.status(500).json({
        success: false,
        message:
          '결제내역 저장 중 오류가 발생했습니다.',
      })
    }
  }