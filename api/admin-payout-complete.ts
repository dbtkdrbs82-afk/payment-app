import type {
    VercelRequest,
    VercelResponse,
  } from '@vercel/node'
  
  import {
    createHmac,
    timingSafeEqual,
  } from 'crypto'
  
  import { createClient } from '@supabase/supabase-js'
  
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
      'https'
  
    const forwardedHost =
      String(
        req.headers[
          'x-forwarded-host'
        ] || ''
      )
        .split(',')[0]
        .trim()
  
    const host =
      forwardedHost ||
      String(
        req.headers.host || ''
      ).trim()
  
    if (!host) {
      return ''
    }
  
    return `${protocol}://${host}`
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
  
    if (
      action !== 'preview' &&
      action !== 'execute'
    ) {
      return res.status(400).json({
        success: false,
        message:
          '출금 처리 구분이 올바르지 않습니다.',
      })
    }
  
    const rawPaymentIds =
      Array.isArray(
        req.body?.payment_ids
      )
        ? req.body.payment_ids
        : []
  
        const paymentIds: number[] =
        Array.from(
          new Set<number>(
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
      paymentIds.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          '출금대상 결제정보가 없습니다.',
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
  
      if (
        actor.role !== 'MASTER' ||
        actor.login_id !==
          'NXGMASTER16'
      ) {
        return res.status(403).json({
          success: false,
          message:
            '대표관리자만 출금처리를 할 수 있습니다.',
        })
      }
  
      const {
        data: paymentRows,
        error: paymentError,
      } =
        await supabase
          .from('payments')
          .select(`
            id,
            merchant_id,
            merchant_name,
            settlement_amount,
            payout_status,
            payout_hold,
            status
          `)
          .in(
            'id',
            paymentIds
          )
  
      if (paymentError) {
        throw paymentError
      }
  
      if (
        !paymentRows ||
        paymentRows.length !==
          paymentIds.length
      ) {
        return res.status(400).json({
          success: false,
          message:
            '일부 결제정보를 찾을 수 없습니다.',
        })
      }
  
      const cancelledPayment =
        paymentRows.some(
          (row: any) =>
            row.status === 'cancel'
        )
  
      if (cancelledPayment) {
        return res.status(400).json({
          success: false,
          message:
            '취소된 결제건이 포함되어 있습니다.',
        })
      }
  
      const completedPayment =
        paymentRows.some(
          (row: any) =>
            row.payout_status ===
            '출금완료'
        )
  
      if (completedPayment) {
        return res.status(400).json({
          success: false,
          message:
            '이미 출금완료된 결제건이 포함되어 있습니다.',
        })
      }
  
      const processingPayment =
        paymentRows.some(
          (row: any) =>
            row.payout_status ===
            '출금처리중'
        )
  
      if (processingPayment) {
        return res.status(400).json({
          success: false,
          message:
            '이미 출금처리중인 결제건이 포함되어 있습니다.',
        })
      }
  
      const holdPayment =
        paymentRows.some(
          (row: any) =>
            row.payout_hold === true ||
            row.payout_status ===
              '출금보류'
        )
  
      if (holdPayment) {
        return res.status(400).json({
          success: false,
          message:
            '출금보류된 결제건이 포함되어 있습니다.',
        })
      }
  
      const merchantIds =
        [
          ...new Set(
            paymentRows
              .map(
                (row: any) =>
                  String(
                    row.merchant_id ||
                    ''
                  ).trim()
              )
              .filter(Boolean)
          ),
        ]
  
      if (
        merchantIds.length !== 1
      ) {
        return res.status(400).json({
          success: false,
          message:
            '서로 다른 가맹점의 결제건은 함께 출금할 수 없습니다.',
        })
      }
  
      const rawMerchantId =
        merchantIds[0]
  
      const merchantId =
        rawMerchantId.startsWith(
          'MER'
        )
          ? rawMerchantId
          : 'MER' +
            rawMerchantId.padStart(
              4,
              '0'
            )
  
      const merchantName =
        String(
          paymentRows[0]
            .merchant_name ||
          merchantId
        )
  
      const payoutAmount =
        paymentRows.reduce(
          (
            sum: number,
            row: any
          ) =>
            sum +
            Number(
              row.settlement_amount ||
              0
            ),
          0
        )
  
      if (
        !Number.isInteger(
          payoutAmount
        ) ||
        payoutAmount <= 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            '출금예정금액이 올바르지 않습니다.',
        })
      }
  
      /*
       * 미리보기는 여기까지만
       */
      if (action === 'preview') {
        return res.status(200).json({
          success: true,
          merchant_id:
            merchantId,
          merchant_name:
            merchantName,
          amount:
            payoutAmount,
          payment_count:
            paymentIds.length,
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
       * 출금처리중으로 먼저 선점
       */
      const {
        data: claimedRows,
        error: claimError,
      } =
      await supabase
      .from('payments')
      .update({
        payout_status:
          '출금처리중',
      })
      .in(
        'id',
        paymentIds
      )
      .or(
        'payout_status.is.null,' +
        'payout_status.eq.출금대기,' +
        'payout_status.eq.출금오류,' +
        'payout_status.eq.계좌오류,' +
        'payout_status.eq.계좌인증'
      )
      .or(
        'payout_hold.is.null,' +
        'payout_hold.eq.false'
      )
      .select('id')
  
      if (claimError) {
        throw claimError
      }
  
      if (
        !claimedRows ||
        claimedRows.length !==
          paymentIds.length
      ) {
        if (
          claimedRows &&
          claimedRows.length > 0
        ) {
          await supabase
            .from('payments')
            .update({
              payout_status:
                '출금대기',
            })
            .in(
              'id',
              claimedRows.map(
                (row: any) =>
                  row.id
              )
            )
        }
  
        return res.status(409).json({
          success: false,
          message:
            '출금상태가 변경되었습니다. 새로고침 후 다시 확인해주세요.',
        })
      }
  
      try {
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
          throw new Error(
            '토스 셀러 조회에 실패했습니다.'
          )
        }
  
        const sellers =
          sellerResult?.data
            ?.entityBody
            ?.items || []
  
        const seller =
          sellers.find(
            (item: any) =>
              String(
                item.refSellerId ||
                ''
              ).trim() ===
              merchantId
          )
  
        if (!seller?.id) {
          throw new Error(
            merchantId +
            ' 가맹점이 토스 셀러로 등록되어 있지 않습니다.'
          )
        }
  
        if (
          seller.status !==
            'PARTIALLY_APPROVED' &&
          seller.status !==
            'APPROVED'
        ) {
          throw new Error(
            '토스 셀러가 지급가능 상태가 아닙니다.\n현재 상태: ' +
            seller.status
          )
        }
  
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
          throw new Error(
            '토스 지급가능 잔액 조회에 실패했습니다.'
          )
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
          availableAmount <
          payoutAmount
        ) {
          throw new Error(
            '토스 지급대행 잔액이 부족합니다.\n\n' +
            '지급 가능 잔액: ' +
            availableAmount.toLocaleString() +
            '원\n' +
            '출금 예정 금액: ' +
            payoutAmount.toLocaleString() +
            '원'
          )
        }
  
        const minPaymentId =
          Math.min(
            ...paymentIds
          )
  
        const maxPaymentId =
          Math.max(
            ...paymentIds
          )
  
        const refPayoutId =
          'NXG-' +
          merchantId +
          '-' +
          minPaymentId +
          '-' +
          maxPaymentId
  
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
                    seller.id,
  
                  amount:
                    payoutAmount,
  
                  transactionDescription:
                    '가맹점정산',
  
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
          const message =
            payoutResult?.data
              ?.error?.message ||
            payoutResult?.data
              ?.message ||
            payoutResult?.message ||
            '토스 지급 요청에 실패했습니다.'
  
          throw new Error(
            message
          )
        }
  
        const {
          error: completeError,
        } =
          await supabase
            .from('payments')
            .update({
              payout_status:
                '출금완료',
  
              payout_time:
                new Date()
                  .toISOString(),
            })
            .in(
              'id',
              paymentIds
            )
  
        if (completeError) {
          console.error(
            '출금완료 DB 저장 오류:',
            completeError
          )
  
          return res.status(500).json({
            success: false,
            payout_sent: true,
            message:
              '토스 지급은 완료됐지만 DB 저장에 실패했습니다. 중복 출금하지 말고 확인해주세요.',
          })
        }
  
        return res.status(200).json({
          success: true,
          merchant_id:
            merchantId,
          merchant_name:
            merchantName,
          amount:
            payoutAmount,
          payment_count:
            paymentIds.length,
        })
      } catch (error) {
        await supabase
          .from('payments')
          .update({
            payout_status:
              '출금대기',
          })
          .in(
            'id',
            paymentIds
          )
  
        return res.status(400).json({
          success: false,
          message:
            error instanceof Error
              ? error.message
              : '출금 처리 중 오류가 발생했습니다.',
        })
      }
    } catch (error) {
      console.error(
        '관리자 출금처리 API 오류:',
        error
      )
  
      return res.status(500).json({
        success: false,
        message:
          '출금 처리 중 오류가 발생했습니다.',
      })
    }
  }