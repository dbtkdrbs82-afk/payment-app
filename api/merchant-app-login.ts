import type {
    VercelRequest,
    VercelResponse
  } from '@vercel/node'
  
  import {
    createClient
  } from '@supabase/supabase-js'
  
  
  export default async function handler(
    req: VercelRequest,
    res: VercelResponse
  ) {
  
    if (req.method !== 'POST') {
      return res.status(405).json({
        success: false,
        message: 'POST 요청만 가능합니다.'
      })
    }
  
  
    try {
  
      const loginId =
        String(
          req.body?.loginId || ''
        ).trim()
  
      const password =
        String(
          req.body?.password || ''
        ).trim()
  
  
      if (!loginId || !password) {
        return res.status(400).json({
          success: false,
          message:
            '아이디와 비밀번호를 입력해주세요.'
        })
      }
  
  
      const supabaseUrl =
        process.env.SUPABASE_URL?.trim() ||
        process.env.VITE_SUPABASE_URL?.trim()
  
      const serviceRoleKey =
        process.env
          .SUPABASE_SERVICE_ROLE_KEY
          ?.trim()
  
  
      if (
        !supabaseUrl ||
        !serviceRoleKey
      ) {
        return res.status(500).json({
          success: false,
          message:
            '서버 환경설정을 확인해주세요.'
        })
      }
  
  
      const supabase =
        createClient(
          supabaseUrl,
          serviceRoleKey,
          {
            auth: {
              persistSession: false,
              autoRefreshToken: false
            }
          }
        )
  
  
      const {
        data: merchant,
        error
      } = await supabase
        .from('merchants')
        .select(`
          id,
          merchant_name,
          merchant_login_id,
          merchant_login_password,
          register_type,
          status
        `)
        .eq(
          'merchant_login_id',
          loginId
        )
        .maybeSingle()
  
  
      if (error) {
        throw error
      }
  
  
      if (!merchant) {
        return res.status(401).json({
          success: false,
          message:
            '아이디 또는 비밀번호를 확인해주세요.'
        })
      }
  
  
      if (
        String(
          merchant.merchant_login_password ||
          ''
        ) !== password
      ) {
        return res.status(401).json({
          success: false,
          message:
            '아이디 또는 비밀번호를 확인해주세요.'
        })
      }
  
  
      return res.status(200).json({
        success: true,
  
        merchant: {
          id: merchant.id,
          name:
            merchant.merchant_name || '',
          loginId:
            merchant.merchant_login_id || '',
          type:
            merchant.register_type || '',
          status:
            merchant.status || ''
        }
      })
  
  
    } catch (error) {
  
      console.error(
        '모바일 가맹점 로그인 오류:',
        error
      )
  
      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : '로그인 중 오류가 발생했습니다.'
      })
  
    }
  
  }