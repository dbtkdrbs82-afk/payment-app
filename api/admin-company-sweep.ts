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
    if (!cookieHeader) return ''
  
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
  
  function getBaseUrl(
    req: VercelRequest
  ) {
    const forwardedHost =
      String(
        req.headers[
          'x-forwarded-host'
        ] ||
        req.headers.host ||
        ''
      )
        .split(',')[0]
        .trim()
  
    if (!forwardedHost) {
      return ''
    }
  
    const forwardedProto =
      String(
        req.headers[
          'x-forwarded-proto'
        ] || ''
      )
        .split(',')[0]
        .trim()
  
    const protocol =
      forwardedProto ||
      (
        forwardedHost.startsWith(
          'localhost'
        )
          ? 'http'
          : 'https'
      )
  
    return (
      protocol +
      '://' +
      forwardedHost
    )
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
  
    const password =
      String(
        req.body?.password || ''
      )
  
    const withdrawAmount =
      Number(
        req.body?.amount
      )
  
    if (!password) {
      return res.status(400).json({
        success: false,
        message:
          '관리자 비밀번호를 입력해주세요.',
      })
    }
  
    if (
      !Number.isInteger(
        withdrawAmount
      ) ||
      withdrawAmount <= 0 ||
      withdrawAmount >=
        1000000000
    ) {
      return res.status(400).json({
        success: false,
        message:
          '회수금액이 올바르지 않습니다.',
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
            password,
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
  
      if (
        actor.role !== 'MASTER' ||
        actor.login_id !==
          'NXGMASTER16'
      ) {
        return res.status(403).json({
          success: false,
          message:
            '대표관리자만 회사계좌 회수를 할 수 있습니다.',
        })
      }
  
      if (
        String(
          actor.password || ''
        ) !== password
      ) {
        return res.status(401).json({
          success: false,
          message:
            '관리자 비밀번호가 올바르지 않습니다.',
        })
      }
  
      const baseUrl =
        getBaseUrl(req)
  
      if (!baseUrl) {
        return res.status(500).json({
          success: false,
          message:
            '서버 주소를 확인할 수 없습니다.',
        })
      }
  
      /*
       * 서버에서 실제 토스 잔액 재확인
       */
      const balanceResponse =
        await fetch(
          `${baseUrl}/api/toss-balance`,
          {
            method: 'GET',
            headers: {
              Cookie:
                req.headers.cookie ||
                '',
            },
          }
        )
  
      const balanceResult =
        await balanceResponse.json()
  
      if (
        !balanceResponse.ok ||
        !balanceResult?.success
      ) {
        return res.status(500).json({
          success: false,
          message:
            balanceResult?.message ||
            '토스 지급가능 잔액 조회에 실패했습니다.',
        })
      }
  
      const availableAmount =
        Number(
          balanceResult?.data
            ?.entityBody
            ?.availableAmount
            ?.value ??
          balanceResult?.data
            ?.availableAmount
            ?.value ??
          0
        )
  
      if (
        withdrawAmount >
        availableAmount
      ) {
        return res.status(400).json({
          success: false,
          message:
            '현재 가상계좌잔액보다 큰 금액은 회수할 수 없습니다.',
          available_amount:
            availableAmount,
        })
      }
  
      /*
       * 서버에서 NXGSOFT01 셀러 검색
       */
      const sellerResponse =
        await fetch(
          `${baseUrl}/api/toss-seller-get`,
          {
            method: 'GET',
            headers: {
              Cookie:
                req.headers.cookie ||
                '',
            },
          }
        )
  
      const sellerResult =
        await sellerResponse.json()
  
      if (
        !sellerResponse.ok ||
        !sellerResult?.success
      ) {
        return res.status(500).json({
          success: false,
          message:
            sellerResult?.message ||
            '회사 회수용 셀러 조회에 실패했습니다.',
        })
      }
  
      const sellers =
        sellerResult?.data
          ?.entityBody
          ?.items || []
  
      const sweepSeller =
        sellers.find(
          (seller: any) =>
            String(
              seller.refSellerId ||
              ''
            ).trim() ===
            'NXGSOFT01'
        )
  
      if (!sweepSeller?.id) {
        return res.status(404).json({
          success: false,
          message:
            'NXGSOFT01 회수용 셀러를 찾을 수 없습니다.',
        })
      }
  
      if (
        sweepSeller.status !==
        'APPROVED'
      ) {
        return res.status(400).json({
          success: false,
          message:
            'NXGSOFT01 셀러가 지급가능 상태가 아닙니다.',
        })
      }
  
      /*
       * 목적지는 브라우저에서 받지 않음
       * 서버가 NXGSOFT01을 직접 선택
       */
      const refPayoutId =
        'SWEEP-' +
        Date.now() +
        '-' +
        withdrawAmount
  
      const payoutResponse =
        await fetch(
          `${baseUrl}/api/toss-payout`,
          {
            method: 'POST',
  
            headers: {
              'Content-Type':
                'application/json',
  
              Cookie:
                req.headers.cookie ||
                '',
            },
  
            body:
              JSON.stringify({
                destination:
                  sweepSeller.id,
  
                amount:
                  withdrawAmount,
  
                transactionDescription:
                  '잔액회수',
  
                refPayoutId,
              }),
          }
        )
  
      const payoutResult =
        await payoutResponse.json()
  
      if (
        !payoutResponse.ok ||
        !payoutResult?.success
      ) {
        const errorMessage =
          payoutResult?.data
            ?.error?.message ||
          payoutResult?.data
            ?.message ||
          payoutResult?.message ||
          '회사계좌 회수에 실패했습니다.'
  
        return res
          .status(
            payoutResponse.status ||
            500
          )
          .json({
            success: false,
            message:
              errorMessage,
          })
      }
  
      return res.status(200).json({
        success: true,
  
        amount:
          withdrawAmount,
  
        available_amount_before:
          availableAmount,
  
        processed_by:
          actor.login_id,
  
        ref_payout_id:
          refPayoutId,
      })
    } catch (error) {
      console.error(
        '회사계좌 회수 API 오류:',
        error
      )
  
      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : '회사계좌 회수 중 오류가 발생했습니다.',
      })
    }
  }