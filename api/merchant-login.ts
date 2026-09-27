import type {
  VercelRequest,
  VercelResponse,
} from '@vercel/node'

import {
  createClient,
} from '@supabase/supabase-js'

import {
  createHmac,
} from 'crypto'


const supabaseUrl =
  process.env.SUPABASE_URL?.trim() ||
  process.env.VITE_SUPABASE_URL?.trim() ||
  'https://rnmptlxdeihvfwegoqnf.supabase.co'


const MERCHANT_SESSION_SECRET =
  process.env.MERCHANT_SESSION_SECRET?.trim() ||
  process.env.ADMIN_SESSION_SECRET?.trim() ||
  ''


function createMerchantSession(
  merchant: {
    id: number
    login_id: string
  }
) {
  if (!MERCHANT_SESSION_SECRET) {
    return ''
  }

  const payload = {
    id:
      Number(merchant.id),

    login_id:
      String(
        merchant.login_id ||
        ''
      ),

    exp:
      Date.now() +
      8 * 60 * 60 * 1000,
  }


  const body =
    Buffer.from(
      JSON.stringify(payload)
    ).toString('base64url')


  const signature =
    createHmac(
      'sha256',
      MERCHANT_SESSION_SECRET
    )
      .update(body)
      .digest('base64url')


  return (
    body +
    '.' +
    signature
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

    return res
      .status(405)
      .json({
        success: false,
        message:
          'POST 요청만 가능합니다.',
      })
  }


  const serviceRoleKey =
    process.env
      .SUPABASE_SERVICE_ROLE_KEY


  if (!serviceRoleKey) {

    return res
      .status(500)
      .json({
        success: false,
        message:
          '서버 환경변수를 확인해주세요.',
      })
  }


  if (
    !MERCHANT_SESSION_SECRET
  ) {

    return res
      .status(500)
      .json({
        success: false,
        message:
          '가맹점 세션 환경변수를 확인해주세요.',
      })
  }


  const supabase =
    createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    )


  const loginId =
    String(
      req.body?.loginId || ''
    )
      .trim()
      .toUpperCase()


  const password =
    String(
      req.body?.password || ''
    ).trim()


  if (
    !loginId ||
    !password
  ) {

    return res
      .status(400)
      .json({
        success: false,
        message:
          '아이디와 비밀번호를 입력해주세요.',
      })
  }


  const {
    data: merchants,
    error,
  } =
    await supabase
      .from('merchants')
      .select(`
        id,
        merchant_login_id,
        merchant_password,
        merchant_name,
        merchant_type,
        status
      `)
      .eq(
        'merchant_login_id',
        loginId
      )


  if (error) {

    console.error(
      '가맹점 로그인 조회 실패:',
      error.message
    )

    return res
      .status(500)
      .json({
        success: false,
        message:
          '로그인 정보를 확인하지 못했습니다.',
      })
  }


  const merchant =
    (merchants || [])
      .find(
        (item: any) =>
          String(
            item.merchant_password ||
            ''
          ).trim() ===
          password
      )


  if (!merchant) {

    return res
      .status(401)
      .json({
        success: false,
        message:
          '아이디 또는 비밀번호가 올바르지 않습니다.',
      })
  }


  if (
    merchant.status !== '운영'
  ) {

    return res
      .status(403)
      .json({
        success: false,
        message:
          '아직 개통되지 않은 가맹점입니다.',
      })
  }


  const merchantSession =
    createMerchantSession({
      id:
        Number(
          merchant.id
        ),

      login_id:
        String(
          merchant.merchant_login_id ||
          ''
        ),
    })


  if (!merchantSession) {

    return res
      .status(500)
      .json({
        success: false,
        message:
          '가맹점 로그인 세션 생성에 실패했습니다.',
      })
  }


  res.setHeader(
    'Set-Cookie',
    [
      'nxg_merchant_session=' +
        merchantSession,

      'Path=/',

      'HttpOnly',

      'Secure',

      'SameSite=Strict',

      'Max-Age=28800',
    ].join('; ')
  )


  return res
    .status(200)
    .json({
      success: true,

      merchant: {

        id:
          merchant.id,

        loginId:
          merchant.merchant_login_id,

        name:
          merchant.merchant_name,

        type:
          merchant.merchant_type ||
          '일반매장',
      },

      passwordResetRequired:
        false,
    })
}