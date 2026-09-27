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


type PaymentRow = {
  id: number
  merchant_id: number | string | null
  status: string | null
  payment_key: string | null
  approved_at: string | null
  created_at: string | null
}


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


const MERCHANT_SESSION_SECRET =
  process.env.MERCHANT_SESSION_SECRET?.trim() ||
  ADMIN_SESSION_SECRET


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


function verifySignedSession(
  token: string,
  secret: string
) {
  if (
    !token ||
    !secret
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
      secret
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


async function readJson(
  response: Response
) {
  const text =
    await response.text()

  if (!text) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch {
    return {
      raw: text,
    }
  }
}


function isAlreadyCanceledTossError(
  data: any
) {
  const code =
    String(
      data?.code || ''
    ).toUpperCase()

  const message =
    String(
      data?.message || ''
    )

  return (
    code.includes('ALREADY') ||
    (
      message.includes('이미') &&
      message.includes('취소')
    )
  )
}


function getKoreaDate(
  value: string | Date
) {
  const date =
    value instanceof Date
      ? value
      : new Date(value)

  return new Intl.DateTimeFormat(
    'en-CA',
    {
      timeZone:
        'Asia/Seoul',

      year:
        'numeric',

      month:
        '2-digit',

      day:
        '2-digit',
    }
  ).format(date)
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
    !SUPABASE_SERVICE_ROLE_KEY
  ) {
    return res.status(500).json({
      success: false,
      message:
        'Supabase 환경변수가 설정되지 않았습니다.',
    })
  }


  const secretKey =
    process.env.TOSS_SECRET_KEY


  if (!secretKey) {
    return res.status(500).json({
      success: false,
      message:
        'TOSS_SECRET_KEY가 설정되지 않았습니다.',
    })
  }


  const paymentKey =
    String(
      req.body?.paymentKey || ''
    ).trim()


  const cancelReason =
    String(
      req.body?.cancelReason ||
      '결제 취소'
    )
      .trim()
      .slice(
        0,
        200
      )


  if (!paymentKey) {
    return res.status(400).json({
      success: false,
      message:
        'paymentKey가 없습니다.',
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
     * 관리자 세션 확인
     */
    const adminToken =
      getCookie(
        req.headers.cookie,
        'nxg_admin_session'
      )


    const adminSession =
      verifySignedSession(
        adminToken,
        ADMIN_SESSION_SECRET
      )


    let adminActor: any =
      null


    if (adminSession) {
      const {
        data,
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


      adminActor =
        data || null
    }


    /*
     * 가맹점 세션 확인
     */
    const merchantToken =
      getCookie(
        req.headers.cookie,
        'nxg_merchant_session'
      )


    const merchantSession =
      verifySignedSession(
        merchantToken,
        MERCHANT_SESSION_SECRET
      )


    let merchantActor: any =
      null


    if (merchantSession) {
      const {
        data,
      } =
        await supabase
          .from('merchants')
          .select(`
            id,
            merchant_login_id,
            merchant_name,
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


      merchantActor =
        data || null
    }


    if (
      !adminActor &&
      !merchantActor
    ) {
      return res.status(401).json({
        success: false,
        message:
          '로그인 인증이 필요합니다.',
      })
    }


    /*
     * 취소 대상 결제 조회
     */
    const {
      data: paymentData,
      error: paymentError,
    } =
      await supabase
        .from('payments')
        .select(`
          id,
          merchant_id,
          status,
          payment_key,
          approved_at,
          created_at
        `)
        .eq(
          'payment_key',
          paymentKey
        )
        .maybeSingle()


    if (
      paymentError ||
      !paymentData
    ) {
      return res.status(404).json({
        success: false,
        message:
          'paymentKey와 연결된 결제를 찾지 못했습니다.',
      })
    }


    const payment =
      paymentData as PaymentRow


    const paymentMerchantId =
      Number(
        payment.merchant_id ||
        0
      )


    /*
     * 관리자 권한 확인
     */
    let adminAllowed =
      false


    if (adminActor) {

      if (
        adminActor.role ===
        'MASTER'
      ) {

        adminAllowed =
          true

      } else {

        const {
          data: targetMerchant,
        } =
          await supabase
            .from('merchants')
            .select(`
              id,
              branch_admin_id,
              agency_admin_id,
              manager_admin_id
            `)
            .eq(
              'id',
              paymentMerchantId
            )
            .maybeSingle()


        if (targetMerchant) {

          if (
            adminActor.role ===
              'BRANCH' &&
            Number(
              targetMerchant
                .branch_admin_id ||
              0
            ) ===
              Number(
                adminActor.id
              )
          ) {
            adminAllowed =
              true
          }


          if (
            adminActor.role ===
              'AGENCY' &&
            Number(
              targetMerchant
                .agency_admin_id ||
              0
            ) ===
              Number(
                adminActor.id
              )
          ) {
            adminAllowed =
              true
          }


          if (
            adminActor.role ===
              'MANAGER' &&
            Number(
              targetMerchant
                .manager_admin_id ||
              0
            ) ===
              Number(
                adminActor.id
              )
          ) {
            adminAllowed =
              true
          }
        }
      }
    }


    /*
     * 가맹점은 자기 결제만 취소 가능
     */
    const merchantAllowed =
      !!merchantActor &&
      Number(
        merchantActor.id
      ) ===
        paymentMerchantId


    if (
      !adminAllowed &&
      !merchantAllowed
    ) {
      return res.status(403).json({
        success: false,
        message:
          '이 결제를 취소할 권한이 없습니다.',
      })
    }


    const dbAlreadyCanceled =
      payment.status === 'cancel' ||
      payment.status === '취소'


    /*
     * 가맹점 직접취소는 당일 결제만 허용
     * 관리자 취소는 날짜 제한 없음
     */
    if (
      merchantAllowed &&
      !adminAllowed &&
      !dbAlreadyCanceled
    ) {
      const paymentDateSource =
        payment.approved_at ||
        payment.created_at


      if (!paymentDateSource) {
        return res.status(400).json({
          success: false,
          message:
            '결제일자를 확인할 수 없습니다.',
        })
      }


      const paymentDate =
        getKoreaDate(
          paymentDateSource
        )


      const today =
        getKoreaDate(
          new Date()
        )


      if (
        paymentDate !== today
      ) {
        return res.status(403).json({
          success: false,
          message:
            '당일 결제건만 직접 취소할 수 있습니다. 본사 승인요청을 이용해주세요.',
        })
      }
    }


    let tossData: any =
      null

    let tossAlreadyCanceled =
      false


    /*
     * 아직 취소되지 않은 경우에만
     * 토스 실제 취소 실행
     */
    if (!dbAlreadyCanceled) {

      const encodedSecretKey =
        Buffer
          .from(
            secretKey + ':'
          )
          .toString(
            'base64'
          )


      const tossResponse =
        await fetch(
          'https://api.tosspayments.com/v1/payments/' +
            encodeURIComponent(
              paymentKey
            ) +
            '/cancel',
          {
            method:
              'POST',

            headers: {
              Authorization:
                'Basic ' +
                encodedSecretKey,

              'Content-Type':
                'application/json',
            },

            body:
              JSON.stringify({
                cancelReason,
              }),
          }
        )


      tossData =
        await readJson(
          tossResponse
        )


      tossAlreadyCanceled =
        !tossResponse.ok &&
        isAlreadyCanceledTossError(
          tossData
        )


      if (
        !tossResponse.ok &&
        !tossAlreadyCanceled
      ) {
        return res
          .status(
            tossResponse.status
          )
          .json({
            success: false,

            message:
              tossData?.message ||
              '토스 취소 요청에 실패했습니다.',

            toss:
              tossData,
          })
      }
    }


    const canceledAt =
      (
        Array.isArray(
          tossData?.cancels
        ) &&
        tossData.cancels[0]
          ?.canceledAt
      )
        ? tossData
            .cancels[0]
            .canceledAt
        : new Date()
            .toISOString()


    /*
     * 결제 DB 취소 반영
     */
    const {
      data: updatedPayment,
      error: updateError,
    } =
      await supabase
        .from('payments')
        .update({
          status:
            'cancel',

          canceled_at:
            canceledAt,

          fee_amount:
            0,

          settlement_amount:
            0,

          settlement_status:
            '취소',

          payout_status:
            '출금제외',
        })
        .eq(
          'id',
          Number(
            payment.id
          )
        )
        .select()


    if (updateError) {
      return res.status(500).json({
        success: false,
        message:
          '토스 취소는 되었지만 우리 DB 반영에 실패했습니다.',
        toss:
          tossData,
        detail:
          updateError.message,
      })
    }


    /*
     * 본사 승인요청이 있었다면 승인완료 처리
     */
    let cancelRequestWarning =
      ''


    const {
      error:
        cancelRequestError,
    } =
      await supabase
        .from(
          'cancel_requests'
        )
        .update({
          status:
            '승인완료',

          processed_at:
            new Date()
              .toISOString(),
        })
        .eq(
          'payment_id',
          Number(
            payment.id
          )
        )
        .eq(
          'status',
          '요청중'
        )


    if (cancelRequestError) {
      cancelRequestWarning =
        '취소요청 상태 변경 실패: ' +
        cancelRequestError.message
    }


    return res
      .status(200)
      .json({
        success: true,

        message:
          tossAlreadyCanceled ||
          dbAlreadyCanceled
            ? '이미 취소된 토스 결제를 우리 DB에 보정했습니다.'
            : '토스 결제 취소와 DB 반영이 완료되었습니다.',

        paymentId:
          payment.id,

        paymentKey,

        tossAlreadyCanceled,

        dbAlreadyCanceled,

        cancelRequestWarning,

        toss:
          tossData,

        payment:
          updatedPayment,
      })

  } catch (error) {

    console.error(
      'Toss cancel API error:',
      error
    )


    return res.status(500).json({
      success: false,

      message:
        error instanceof Error
          ? error.message
          : '토스 취소 처리 중 오류가 발생했습니다.',
    })
  }
}