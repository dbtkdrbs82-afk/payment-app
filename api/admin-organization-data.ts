import type {
    VercelRequest,
    VercelResponse,
  } from '@vercel/node'
  
  import { createClient } from '@supabase/supabase-js'
  import {
    createHmac,
    timingSafeEqual,
  } from 'crypto'
  
  const SUPABASE_URL =
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    ''
  
  const SUPABASE_SERVICE_ROLE_KEY =
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  
  const ADMIN_SESSION_SECRET =
    process.env.ADMIN_SESSION_SECRET || ''
  
  function getCookie(
    cookieHeader: string | undefined,
    name: string
  ) {
    if (!cookieHeader) return ''
  
    for (const cookie of cookieHeader.split(';')) {
      const [key, ...rest] =
        cookie.trim().split('=')
  
      if (key === name) {
        return rest.join('=')
      }
    }
  
    return ''
  }
  
  function verifyAdminSession(
    token: string
  ) {
    if (
      !token ||
      !ADMIN_SESSION_SECRET
    ) {
      return null
    }
  
    const parts = token.split('.')
  
    if (parts.length !== 2) {
      return null
    }
  
    const [body, signature] =
      parts
  
    const expectedSignature =
      createHmac(
        'sha256',
        ADMIN_SESSION_SECRET
      )
        .update(body)
        .digest('base64url')
  
    const receivedBuffer =
      Buffer.from(signature)
  
    const expectedBuffer =
      Buffer.from(
        expectedSignature
      )
  
    if (
      receivedBuffer.length !==
        expectedBuffer.length ||
      !timingSafeEqual(
        receivedBuffer,
        expectedBuffer
      )
    ) {
      return null
    }
  
    try {
      const payload =
        JSON.parse(
          Buffer.from(
            body,
            'base64url'
          ).toString('utf8')
        )
  
      if (
        !payload?.id ||
        !payload?.login_id ||
        !payload?.exp ||
        Number(payload.exp) <
          Date.now()
      ) {
        return null
      }
  
      return payload
    } catch {
      return null
    }
  }
  
  export default async function handler(
    req: VercelRequest,
    res: VercelResponse
  ) {
    res.setHeader(
      'Cache-Control',
      'no-store'
    )
  
    if (req.method !== 'GET') {
      return res.status(405).json({
        success: false,
        message: 'GET 요청만 가능합니다.',
      })
    }
  
    const token =
      getCookie(
        req.headers.cookie,
        'nxg_admin_session'
      )
  
    const adminSession =
      verifyAdminSession(token)
  
    if (!adminSession) {
      return res.status(401).json({
        success: false,
        message:
          '관리자 로그인이 필요합니다.',
      })
    }
  
    if (
      !SUPABASE_URL ||
      !SUPABASE_SERVICE_ROLE_KEY
    ) {
      return res.status(500).json({
        success: false,
        message:
          '서버 설정 오류입니다.',
      })
    }
  
    try {
      const supabase =
        createClient(
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
       * 로그인 관리자 확인
       */
      const {
        data: actor,
        error: actorError,
      } =
        await supabase
          .from('admin_users')
          .select(`
            id,
            login_id,
            role,
            status
          `)
          .eq(
            'id',
            Number(
              adminSession.id
            )
          )
          .eq(
            'login_id',
            String(
              adminSession.login_id
            )
          )
          .eq(
            'status',
            '사용중'
          )
          .maybeSingle()
  
      if (
        actorError ||
        !actor
      ) {
        return res.status(401).json({
          success: false,
          message:
            '관리자 인증정보가 올바르지 않습니다.',
        })
      }
  
      /*
       * 권한별 가맹점 조회
       */
      let merchantQuery =
        supabase
          .from('merchants')
          .select(`
            id,
            merchant_name,
            settlement_cycle,
            branch_admin_id,
            agency_admin_id,
            manager_admin_id
          `)
  
      if (
        actor.role === 'BRANCH'
      ) {
        merchantQuery =
          merchantQuery.eq(
            'branch_admin_id',
            Number(actor.id)
          )
      } else if (
        actor.role === 'AGENCY'
      ) {
        merchantQuery =
          merchantQuery.eq(
            'agency_admin_id',
            Number(actor.id)
          )
      } else if (
        actor.role === 'MANAGER'
      ) {
        merchantQuery =
          merchantQuery.eq(
            'manager_admin_id',
            Number(actor.id)
          )
      } else if (
        actor.role !== 'MASTER'
      ) {
        return res.status(403).json({
          success: false,
          message:
            '조직정보 조회 권한이 없습니다.',
        })
      }
  
      const {
        data: merchants,
        error: merchantError,
      } =
        await merchantQuery
  
      if (merchantError) {
        console.error(
          '조직 가맹점 조회 오류:',
          merchantError.message
        )
  
        return res.status(500).json({
          success: false,
          message:
            '조직 가맹점 정보를 불러오지 못했습니다.',
        })
      }
  
      const merchantIds =
        (merchants || [])
          .map(
            (merchant) =>
              Number(merchant.id)
          )
          .filter(
            (id) =>
              Number.isFinite(id)
          )
  
      /*
       * 소속 가맹점 결제만 조회
       */
      let payments: any[] = []
  
      if (
        merchantIds.length > 0
      ) {
        const {
          data: paymentData,
          error: paymentError,
        } =
          await supabase
            .from('payments')
            .select(`
              id,
              merchant_id,
              amount,
              status,
              approved_at,
              created_at
            `)
            .eq(
              'status',
              'paid'
            )
            .in(
              'merchant_id',
              merchantIds
            )
  
        if (paymentError) {
          console.error(
            '조직 매출 조회 오류:',
            paymentError.message
          )
  
          return res.status(500).json({
            success: false,
            message:
              '조직 매출 정보를 불러오지 못했습니다.',
          })
        }
  
        payments =
          paymentData || []
      }
  
      return res.status(200).json({
        success: true,
        merchants:
          merchants || [],
        payments,
      })
    } catch (error) {
      console.error(
        '조직관리 데이터 API 오류:',
        error
      )
  
      return res.status(500).json({
        success: false,
        message:
          '조직정보를 불러오는 중 오류가 발생했습니다.',
      })
    }
  }