import type {
    VercelRequest,
    VercelResponse
  } from '@vercel/node'
  
  import {
    createClient
  } from '@supabase/supabase-js'
  
  
  const supabaseUrl =
    'https://rnmptlxdeihvfwegoqnf.supabase.co'
  
  
  export default async function handler(
    req: VercelRequest,
    res: VercelResponse
  ) {
  
    if (
      req.method !== 'POST'
    ) {
  
      return res
        .status(405)
        .json({
          success: false,
          message:
            'POST 요청만 가능합니다.'
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
            '서버 환경변수를 확인해주세요.'
        })
    }
  
  
    const supabase =
      createClient(
        supabaseUrl,
        serviceRoleKey,
        {
          auth: {
            persistSession: false
          }
        }
      )
  
  
    const loginId =
      String(
        req.body?.loginId || ''
      ).trim()
  
  
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
            '아이디와 비밀번호를 입력해주세요.'
        })
    }
  
  
    const {
      data: merchants,
      error
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
            '로그인 정보를 확인하지 못했습니다.'
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
            '아이디 또는 비밀번호가 올바르지 않습니다.'
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
            '아직 개통되지 않은 가맹점입니다.'
        })
    }
  
  
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
            '일반매장'
        },
  
        passwordResetRequired:
          false
      })
  }