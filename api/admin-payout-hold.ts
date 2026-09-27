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
  
    const action =
      String(
        req.body?.action || ''
      ).trim()
  
    const password =
      String(
        req.body?.password || ''
      )
  
    const holdReason =
      String(
        req.body?.hold_reason || ''
      ).trim()
  
    const rawPaymentIds =
      Array.isArray(
        req.body?.payment_ids
      )
        ? req.body.payment_ids
        : []
  
    const paymentIds =
      Array.from(
        new Set(
          rawPaymentIds
            .map(
              (id: unknown) =>
                Number(id)
            )
            .filter(
              (id: number) =>
                Number.isInteger(id) &&
                id > 0
            )
        )
      )
  
    if (
      action !== 'hold' &&
      action !== 'release'
    ) {
      return res.status(400).json({
        success: false,
        message:
          '처리 구분이 올바르지 않습니다.',
      })
    }
  
    if (!password) {
      return res.status(400).json({
        success: false,
        message:
          '관리자 비밀번호를 입력해주세요.',
      })
    }
  
    if (
      paymentIds.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          '처리 대상 결제정보가 없습니다.',
      })
    }
  
    if (
      paymentIds.length > 500
    ) {
      return res.status(400).json({
        success: false,
        message:
          '한 번에 처리할 수 있는 결제건수를 초과했습니다.',
      })
    }
  
    if (
      action === 'hold' &&
      !holdReason
    ) {
      return res.status(400).json({
        success: false,
        message:
          '출금보류 사유를 입력해주세요.',
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
       * 현재 로그인한 관리자 확인
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
  
      /*
       * 루트 MASTER만 허용
       */
      if (
        actor.role !== 'MASTER' ||
        actor.login_id !==
          'NXGMASTER16'
      ) {
        return res.status(403).json({
          success: false,
          message:
            '대표관리자만 처리할 수 있습니다.',
        })
      }
  
      /*
       * 비밀번호 확인
       * 현재 저장방식 유지
       */
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
  
      /*
       * 출금보류
       */
      if (action === 'hold') {
        const {
          data: updatedPayments,
          error: updateError,
        } =
          await supabase
            .from('payments')
            .update({
              payout_hold: true,
  
              payout_hold_reason:
                holdReason,
  
              payout_hold_at:
                new Date().toISOString(),
  
              payout_hold_by:
                actor.login_id,
  
              payout_status:
                '출금보류',
            })
            .in(
              'id',
              paymentIds
            )
            .select('id')
  
        if (updateError) {
          console.error(
            '출금보류 처리 오류:',
            updateError.message
          )
  
          return res.status(500).json({
            success: false,
            message:
              '출금보류 처리에 실패했습니다.',
          })
        }
  
        if (
          !updatedPayments ||
          updatedPayments.length === 0
        ) {
          return res.status(404).json({
            success: false,
            message:
              '출금보류 대상 결제정보를 찾을 수 없습니다.',
          })
        }
  
        return res.status(200).json({
          success: true,
          action: 'hold',
          updated_count:
            updatedPayments.length,
        })
      }
  
      /*
       * 출금보류 해제
       */
      const {
        data: updatedPayments,
        error: updateError,
      } =
        await supabase
          .from('payments')
          .update({
            payout_hold: false,
            payout_hold_reason: null,
            payout_hold_at: null,
            payout_hold_by: null,
            payout_status:
              '출금대기',
          })
          .in(
            'id',
            paymentIds
          )
          .select('id')
  
      if (updateError) {
        console.error(
          '출금보류 해제 오류:',
          updateError.message
        )
  
        return res.status(500).json({
          success: false,
          message:
            '보류해제 처리에 실패했습니다.',
        })
      }
  
      if (
        !updatedPayments ||
        updatedPayments.length === 0
      ) {
        return res.status(404).json({
          success: false,
          message:
            '보류해제 대상 결제정보를 찾을 수 없습니다.',
        })
      }
  
      return res.status(200).json({
        success: true,
        action: 'release',
        updated_count:
          updatedPayments.length,
      })
    } catch (error) {
      console.error(
        '출금보류 API 오류:',
        error
      )
  
      return res.status(500).json({
        success: false,
        message:
          '출금보류 처리 중 오류가 발생했습니다.',
      })
    }
  }