import type {
    VercelRequest,
    VercelResponse,
  } from '@vercel/node'
  
  import {
    createClient,
  } from '@supabase/supabase-js'
  
  import {
    createHmac,
    timingSafeEqual,
  } from 'crypto'
  
  
  const SUPABASE_URL =
    process.env.SUPABASE_URL?.trim() ||
    process.env.VITE_SUPABASE_URL?.trim() ||
    ''
  
  
  const SUPABASE_SERVICE_ROLE_KEY =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    ''
  
  
  const ADMIN_SESSION_SECRET =
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    ''
  
  
  function getCookie(
    cookieHeader: string | undefined,
    name: string
  ) {
    if (!cookieHeader) {
      return ''
    }
  
    for (
      const cookie of cookieHeader.split(';')
    ) {
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
  
  
    const parts =
      token.split('.')
  
  
    if (parts.length !== 2) {
      return null
    }
  
  
    const [
      body,
      signature,
    ] = parts
  
  
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
        message:
          'GET 요청만 가능합니다.',
      })
    }
  
  
    if (
      !SUPABASE_URL ||
      !SUPABASE_SERVICE_ROLE_KEY ||
      !ADMIN_SESSION_SECRET
    ) {
      return res.status(500).json({
        success: false,
        message:
          '서버 환경변수를 확인해주세요.',
      })
    }
  
  
    const token =
      getCookie(
        req.headers.cookie,
        'nxg_admin_session'
      )
  
  
    const adminSession =
      verifyAdminSession(
        token
      )
  
  
    if (!adminSession) {
      return res.status(401).json({
        success: false,
        message:
          '관리자 로그인이 필요합니다.',
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
  
  
      let merchantQuery =
        supabase
          .from('merchants')
          .select(`
            id,
            merchant_name,
            owner_name,
            phone,
            fee_rate,
            settlement_cycle,
            status,
            created_at,
            pg_company,
            business_number,
            resident_number,
            cpid,
            pg_mid,
            korpay_pg_mid,
            korpay_manual_mid,
            toss_mid,
            toss_client_key,
            daou_pg_mid,
            daou_manual_mid,
            terminal_mid,
            korpay_terminal_mid,
            daou_terminal_mid
          `)
          .order(
            'id',
            {
              ascending: true,
            }
          )
  
  
      if (
        actor.role ===
        'BRANCH'
      ) {
        merchantQuery =
          merchantQuery.eq(
            'branch_admin_id',
            Number(actor.id)
          )
      }
  
  
      if (
        actor.role ===
        'AGENCY'
      ) {
        merchantQuery =
          merchantQuery.eq(
            'agency_admin_id',
            Number(actor.id)
          )
      }
  
  
      if (
        actor.role ===
        'MANAGER'
      ) {
        merchantQuery =
          merchantQuery.eq(
            'manager_admin_id',
            Number(actor.id)
          )
      }
  
  
      if (
        ![
          'MASTER',
          'BRANCH',
          'AGENCY',
          'MANAGER',
        ].includes(
          String(actor.role)
        )
      ) {
        return res.status(403).json({
          success: false,
          message:
            '가맹점 조회 권한이 없습니다.',
        })
      }
  
  
      const {
        data: merchants,
        error: merchantError,
      } =
        await merchantQuery
  
  
      if (merchantError) {
        console.error(
          '관리자 가맹점 조회 오류:',
          merchantError.message
        )
  
        return res.status(500).json({
          success: false,
          message:
            '가맹점 목록을 불러오지 못했습니다.',
        })
      }
  
  
      const safeMerchants =
  (merchants || []).map(
    (merchant: any) => {
      const {
        merchant_password,
        ...safeMerchant
      } = merchant

      return safeMerchant
    }
  )


return res.status(200).json({
  success: true,

  merchants:
    safeMerchants,
})
  
    } catch (error) {
  
      console.error(
        '관리자 가맹점 목록 API 오류:',
        error
      )
  
  
      return res.status(500).json({
        success: false,
        message:
          '가맹점 목록 조회 중 오류가 발생했습니다.',
      })
    }
  }