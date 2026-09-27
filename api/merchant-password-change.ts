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
  
  
  const MERCHANT_SESSION_SECRET =
    process.env.MERCHANT_SESSION_SECRET?.trim() ||
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
  
  
  function verifyMerchantSession(
    token: string
  ) {
    if (
      !token ||
      !MERCHANT_SESSION_SECRET
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
        MERCHANT_SESSION_SECRET
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
      !MERCHANT_SESSION_SECRET
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
        'nxg_merchant_session'
      )
  
  
    const merchantSession =
      verifyMerchantSession(
        token
      )
  
  
    if (!merchantSession) {
      return res.status(401).json({
        success: false,
        message:
          '가맹점 로그인이 필요합니다.',
      })
    }
  
  
    const currentPassword =
      String(
        req.body?.currentPassword ||
        ''
      ).trim()
  
  
    const newPassword =
      String(
        req.body?.newPassword ||
        ''
      ).trim()
  
  
    if (
      !currentPassword ||
      !newPassword
    ) {
      return res.status(400).json({
        success: false,
        message:
          '현재 비밀번호와 새 비밀번호를 입력해주세요.',
      })
    }
  
  
    if (
      newPassword.length < 8
    ) {
      return res.status(400).json({
        success: false,
        message:
          '새 비밀번호는 8자리 이상 입력해주세요.',
      })
    }
  
  
    if (
      !/[A-Za-z]/.test(
        newPassword
      ) ||
      !/[0-9]/.test(
        newPassword
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          '새 비밀번호는 영문과 숫자를 모두 포함해주세요.',
      })
    }
  
  
    if (
      currentPassword ===
      newPassword
    ) {
      return res.status(400).json({
        success: false,
        message:
          '현재 비밀번호와 다른 비밀번호를 입력해주세요.',
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
        data: merchant,
        error: merchantError,
      } =
        await supabase
          .from('merchants')
          .select(`
            id,
            merchant_login_id,
            merchant_password,
            status
          `)
          .eq(
            'id',
            Number(
              merchantSession.id
            )
          )
          .eq(
            'merchant_login_id',
            String(
              merchantSession.login_id
            )
          )
          .eq(
            'status',
            '운영'
          )
          .maybeSingle()
  
  
      if (
        merchantError ||
        !merchant
      ) {
        return res.status(401).json({
          success: false,
          message:
            '가맹점 인증정보가 올바르지 않습니다.',
        })
      }
  
  
      if (
        String(
          merchant
            .merchant_password ||
          ''
        ).trim() !==
        currentPassword
      ) {
        return res.status(400).json({
          success: false,
          message:
            '현재 비밀번호가 일치하지 않습니다.',
        })
      }
  
  
      const {
        error: updateError,
      } =
        await supabase
          .from('merchants')
          .update({
            merchant_password:
              newPassword,
          })
          .eq(
            'id',
            Number(
              merchant.id
            )
          )
  
  
      if (updateError) {
        return res.status(500).json({
          success: false,
          message:
            '비밀번호 변경에 실패했습니다.',
        })
      }
  
  
      return res.status(200).json({
        success: true,
        message:
          '비밀번호가 변경되었습니다.',
      })
  
    } catch (error) {
  
      console.error(
        '가맹점 비밀번호 변경 API 오류:',
        error
      )
  
  
      return res.status(500).json({
        success: false,
        message:
          '비밀번호 변경 중 오류가 발생했습니다.',
      })
    }
  }