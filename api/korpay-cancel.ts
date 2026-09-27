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
  amount: number | string | null
  status: string | null
  pg_order_no: string | null
  pg_mid: string | null
  order_id: string | null
  pg_company: string | null
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
    Buffer.from(
      signature
    )


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
        ).toString(
          'utf8'
        )
      )


    if (
      !payload?.id ||
      !payload?.login_id ||
      !payload?.exp ||
      Number(
        payload.exp
      ) < Date.now()
    ) {
      return null
    }


    return payload

  } catch {

    return null
  }
}


function getKoreaDate(
  value: string | Date
) {
  const date =
    value instanceof Date
      ? value
      : new Date(
          value
        )


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
  ).format(
    date
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


  if (
    req.method !== 'POST'
  ) {

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


  try {

    const paymentId =
      Number(
        req.body?.paymentId ||
        0
      )


    const cancelMessage =
      String(
        req.body?.cancelMessage ||
        '결제 취소'
      )
        .trim()
        .slice(
          0,
          100
        )


    if (
      !Number.isInteger(
        paymentId
      ) ||
      paymentId <= 0
    ) {

      return res.status(400).json({
        success: false,
        message:
          '결제 ID가 올바르지 않습니다.',
      })
    }


    const supabase =
      createClient(
        SUPABASE_URL,
        SUPABASE_SERVICE_ROLE_KEY,
        {
          auth: {
            persistSession:
              false,

            autoRefreshToken:
              false,
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
          .from(
            'admin_users'
          )
          .select(`
            id,
            login_id,
            admin_name,
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
          .from(
            'merchants'
          )
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
     * 결제 조회
     */
    const {
      data: paymentData,
      error: paymentError,
    } =
      await supabase
        .from(
          'payments'
        )
        .select(`
          id,
          merchant_id,
          amount,
          status,
          pg_order_no,
          pg_mid,
          order_id,
          pg_company,
          approved_at,
          created_at
        `)
        .eq(
          'id',
          paymentId
        )
        .maybeSingle()


    if (
      paymentError ||
      !paymentData
    ) {

      return res.status(404).json({
        success: false,
        message:
          '취소할 결제를 찾을 수 없습니다.',
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
     * 코페이 결제인지 확인
     */
    if (
      !String(
        payment.pg_company ||
        ''
      ).includes(
        '코페이'
      )
    ) {

      return res.status(400).json({
        success: false,
        message:
          '코페이 결제가 아닙니다.',
      })
    }


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
          data:
            targetMerchant,
        } =
          await supabase
            .from(
              'merchants'
            )
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
     * 가맹점은 자기 결제만 허용
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


    /*
     * 이미 취소된 결제
     */
    if (
      payment.status ===
        'cancel' ||
      payment.status ===
        '취소'
    ) {

      return res.status(400).json({
        success: false,
        message:
          '이미 취소된 결제입니다.',
      })
    }


    /*
     * 가맹점 직접취소는
     * 당일 결제만 허용
     */
    if (
      merchantAllowed &&
      !adminAllowed
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
        paymentDate !==
        today
      ) {

        return res.status(403).json({
          success: false,
          message:
            '당일 결제건만 직접 취소할 수 있습니다. 본사 승인요청을 이용해주세요.',
        })
      }
    }


    const pgOrderNo =
      String(
        payment.pg_order_no ||
        ''
      ).trim()


    const pgMid =
      String(
        payment.pg_mid ||
        ''
      ).trim()


    const cancelAmount =
      Number(
        payment.amount ||
        0
      )


    if (!pgOrderNo) {

      return res.status(400).json({
        success: false,
        message:
          '코페이 주문번호가 저장되지 않았습니다.',
      })
    }


    if (!pgMid) {

      return res.status(400).json({
        success: false,
        message:
          '결제에 사용된 코페이 MID가 없습니다.',
      })
    }


    if (
      !Number.isFinite(
        cancelAmount
      ) ||
      cancelAmount <= 0
    ) {

      return res.status(400).json({
        success: false,
        message:
          '취소금액이 올바르지 않습니다.',
      })
    }


    /*
     * 취소자명은 클라이언트 값을 믿지 않고
     * 로그인 세션에서 결정
     */
    const cancelName =
      adminAllowed
        ? String(
            adminActor?.admin_name ||
            adminActor?.login_id ||
            '관리자'
          )
            .trim()
            .slice(
              0,
              30
            )
        : String(
            merchantActor
              ?.merchant_name ||
            '가맹점'
          )
            .trim()
            .slice(
              0,
              30
            )


    const korpayCancelUrl =
      process.env
        .KORPAY_CANCEL_URL ||
      'https://staging-pgapi.korpay.com/api/cancel'


    /*
     * 코페이 실제 취소
     */
    const korpayResponse =
      await fetch(
        korpayCancelUrl,
        {
          method:
            'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body:
            JSON.stringify({
              ordNo:
                pgOrderNo,

              canAmt:
                String(
                  cancelAmount
                ),

              mid:
                pgMid,

              canNm:
                cancelName,

              canMsg:
                cancelMessage,

              partCanFlg:
                '0',
            }),
        }
      )


    const responseText =
      await korpayResponse
        .text()


    let korpayData:
      Record<string, any>


    try {

      korpayData =
        JSON.parse(
          responseText
        )

    } catch {

      korpayData = {
        raw:
          responseText,
      }
    }


    if (
      !korpayResponse.ok
    ) {

      return res.status(502).json({
        success: false,
        message:
          '코페이 취소 서버 요청에 실패했습니다.',
        detail:
          korpayData,
      })
    }


    const resultCode =
      String(
        korpayData.res_code ||
        korpayData.resCode ||
        ''
      ).trim()


    const resultMessage =
      String(
        korpayData.res_msg ||
        korpayData.resMsg ||
        '코페이 취소 실패'
      )


    if (
      resultCode !==
      '0000'
    ) {

      return res.status(400).json({
        success: false,
        message:
          resultMessage,
        resultCode,
        korpay:
          korpayData,
      })
    }


    const canceledAt =
      new Date()
        .toISOString()


    /*
     * 우리 결제 DB 반영
     */
    const {
      data:
        updatedPayment,
      error:
        updateError,
    } =
      await supabase
        .from(
          'payments'
        )
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
          '코페이 취소는 성공했지만 우리 결제정보 수정에 실패했습니다.',
        korpay:
          korpayData,
        detail:
          updateError.message,
      })
    }


    /*
     * 본사 취소요청 상태 보정
     */
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


    let cancelRequestWarning =
      ''


    if (
      cancelRequestError
    ) {

      cancelRequestWarning =
        '취소요청 상태 변경 실패: ' +
        cancelRequestError.message
    }


    return res.status(200).json({
      success: true,

      message:
        '코페이 결제가 취소되었습니다.',

      paymentId:
        payment.id,

      cancelAmount,

      canceledAt,

      resultCode,

      cancelDate:
        korpayData
          .cancel_date ||
        null,

      cancelTime:
        korpayData
          .cancel_time ||
        null,

      cancelTid:
        korpayData
          .tid ||
        null,

      originalTid:
        korpayData
          .otid ||
        null,

      cancelRequestWarning,

      payment:
        updatedPayment,
    })

  } catch (error) {

    console.error(
      'Korpay cancel API error:',
      error
    )


    return res.status(500).json({
      success: false,

      message:
        error instanceof Error
          ? error.message
          : '코페이 취소 처리 중 오류가 발생했습니다.',
    })
  }
}