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
  
  
    if (req.method !== 'POST') {
      return res.status(405).json({
        success: false,
        message:
          'POST 요청만 가능합니다.',
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
  
  
    const merchantId =
      Number(
        req.body?.merchantId ||
        0
      )
  
  
    if (
      !Number.isInteger(
        merchantId
      ) ||
      merchantId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          '가맹점 ID가 올바르지 않습니다.',
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
  
  
      /*
       * 기존 화면 권한 유지
       * MASTER / BRANCH만 삭제 가능
       */
      if (
        actor.role !== 'MASTER' &&
        actor.role !== 'BRANCH'
      ) {
        return res.status(403).json({
          success: false,
          message:
            '가맹점 삭제 권한이 없습니다.',
        })
      }
  
  
      const {
        data: merchant,
        error: merchantError,
      } =
        await supabase
          .from('merchants')
          .select(`
            id,
            merchant_name,
            branch_admin_id
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
            '가맹점을 찾을 수 없습니다.',
        })
      }
  
  
      /*
       * 지사는 자기 소속만 삭제
       */
      if (
        actor.role === 'BRANCH' &&
        Number(
          merchant.branch_admin_id ||
          0
        ) !==
          Number(actor.id)
      ) {
        return res.status(403).json({
          success: false,
          message:
            '이 가맹점을 삭제할 권한이 없습니다.',
        })
      }
  
  
      const {
        error: deleteError,
      } =
        await supabase
          .from('merchants')
          .delete()
          .eq(
            'id',
            merchantId
          )
  
  
      if (deleteError) {
        console.error(
          '가맹점 삭제 오류:',
          deleteError.message
        )
  
        return res.status(500).json({
          success: false,
          message:
            '가맹점 삭제에 실패했습니다.',
        })
      }
  
  
      return res.status(200).json({
        success: true,
        message:
          '삭제되었습니다.',
      })
  
    } catch (error) {
  
      console.error(
        '관리자 가맹점 삭제 API 오류:',
        error
      )
  
  
      return res.status(500).json({
        success: false,
        message:
          '가맹점 삭제 중 오류가 발생했습니다.',
      })
    }
  }