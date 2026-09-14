import type {
    VercelRequest,
    VercelResponse
  } from '@vercel/node'
  
  import {
    createClient
  } from '@supabase/supabase-js'
  
  import {
    pbkdf2Sync,
    randomBytes
  } from 'crypto'
  
  
  const supabaseUrl =
    'https://rnmptlxdeihvfwegoqnf.supabase.co'
  
  
  function createPasswordHash(
    password: string
  ) {
  
    const iterations =
      210000
  
    const salt =
      randomBytes(16)
  
    const hash =
      pbkdf2Sync(
        password,
        salt,
        iterations,
        32,
        'sha256'
      )
  
  
    return (
      'pbkdf2$' +
      iterations +
      '$' +
      salt.toString('base64') +
      '$' +
      hash.toString('base64')
    )
  }
  
  
  export default async function handler(
    req: VercelRequest,
    res: VercelResponse
  ) {
  
    if (req.method !== 'POST') {
  
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
            'SUPABASE_SERVICE_ROLE_KEY를 확인해주세요.'
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
  
  
    const action =
      String(
        req.body?.action || ''
      ).trim()
  
  
    const merchantId =
      Number(
        req.body?.merchantId || 0
      )
  
  
    const merchantLoginId =
      String(
        req.body?.merchantLoginId || ''
      ).trim()
  
      const merchantPassword =
  String(
    req.body?.merchantPassword || ''
  ).trim()
  
  if (
    !merchantId ||
    !merchantLoginId ||
    !merchantPassword
  ) {
  
    return res
      .status(400)
      .json({
        success: false,
        message:
          '호텔 관리자 인증정보를 확인할 수 없습니다.'
      })
  }
  
  
    /*
     * 요청한 호텔이
     * 현재 로그인 호텔과 일치하는지 확인
     */
    const {
      data: merchant,
      error: merchantError
    } =
      await supabase
        .from('merchants')
        .select(`
          id,
          merchant_name,
          merchant_login_id,
          merchant_type
        `)
        .eq(
          'id',
          merchantId
        )
        .eq(
          'merchant_login_id',
          merchantLoginId
        )

        .eq(
            'merchant_password',
            merchantPassword
          )
        .maybeSingle()
  
  
    if (
      merchantError ||
      !merchant
    ) {
  
      return res
        .status(403)
        .json({
          success: false,
          message:
            '호텔 관리자 정보를 확인할 수 없습니다.'
        })
    }
  
  
    if (
      merchant.merchant_type !==
      '호텔'
    ) {
  
      return res
        .status(403)
        .json({
          success: false,
          message:
            '호텔 가맹점에서만 사용할 수 있습니다.'
        })
    }
  
  
    /*
     * 직원 목록
     */
    if (
      action ===
      'list'
    ) {
  
      const {
        data,
        error
      } =
        await supabase
          .from('hotel_staff')
          .select(`
            id,
            merchant_id,
            staff_name,
            login_id,
            status,
            role,
            last_login_at,
            created_at,
            updated_at
          `)
          .eq(
            'merchant_id',
            merchantId
          )
          .order(
            'id',
            {
              ascending: true
            }
          )
  
  
      if (error) {
  
        return res
          .status(500)
          .json({
            success: false,
            message:
              '직원 목록 조회 실패: ' +
              error.message
          })
      }
  
  
      return res
        .status(200)
        .json({
          success: true,
          staff:
            data || []
        })
    }
  
  
    /*
     * 직원 등록
     */
    if (
      action ===
      'create'
    ) {
  
      const staffName =
        String(
          req.body?.staffName || ''
        ).trim()
  
  
      const loginId =
        String(
          req.body?.loginId || ''
        )
          .trim()
          .toUpperCase()
  
  
      const password =
        String(
          req.body?.password || ''
        )
  
  
      if (!staffName) {
  
        return res
          .status(400)
          .json({
            success: false,
            message:
              '직원명을 입력해주세요.'
          })
      }
  
  
      if (
        !/^[A-Z0-9_-]{4,30}$/
          .test(loginId)
      ) {
  
        return res
          .status(400)
          .json({
            success: false,
            message:
              '로그인 아이디 형식을 확인해주세요.'
          })
      }
  
  
      if (
        password.length <
        6
      ) {
  
        return res
          .status(400)
          .json({
            success: false,
            message:
              '비밀번호는 6자리 이상 입력해주세요.'
          })
      }
  
  
      const {
        data: existingStaff
      } =
        await supabase
          .from('hotel_staff')
          .select('id')
          .eq(
            'login_id',
            loginId
          )
          .maybeSingle()
  
  
      if (existingStaff) {
  
        return res
          .status(409)
          .json({
            success: false,
            message:
              '이미 사용 중인 로그인 아이디입니다.'
          })
      }
  
  
      const passwordHash =
        createPasswordHash(
          password
        )
  
  
      const {
        data,
        error
      } =
        await supabase
          .from('hotel_staff')
          .insert({
            merchant_id:
              merchantId,
  
            staff_name:
              staffName,
  
            login_id:
              loginId,
  
            password_hash:
              passwordHash,
  
            status:
              '사용중',
  
            role:
              'STAFF',
  
            updated_at:
              new Date()
                .toISOString()
          })
          .select(`
            id,
            staff_name,
            login_id,
            status,
            role,
            created_at
          `)
          .single()
  
  
      if (error) {
  
        return res
          .status(500)
          .json({
            success: false,
            message:
              '직원 등록 실패: ' +
              error.message
          })
      }
  
  
      return res
        .status(200)
        .json({
          success: true,
          staff: data
        })
    }
  
  
    /*
     * 직원 사용중 / 사용중지
     */
    if (
      action ===
      'status'
    ) {
  
      const staffId =
        Number(
          req.body?.staffId || 0
        )
  
  
      const status =
        String(
          req.body?.status || ''
        ).trim()
  
  
      if (!staffId) {
  
        return res
          .status(400)
          .json({
            success: false,
            message:
              '직원 정보를 확인할 수 없습니다.'
          })
      }
  
  
      if (
        status !== '사용중' &&
        status !== '사용중지'
      ) {
  
        return res
          .status(400)
          .json({
            success: false,
            message:
              '직원 상태값을 확인해주세요.'
          })
      }
  
  
      const {
        data,
        error
      } =
        await supabase
          .from('hotel_staff')
          .update({
            status,
  
            updated_at:
              new Date()
                .toISOString()
          })
          .eq(
            'id',
            staffId
          )
          .eq(
            'merchant_id',
            merchantId
          )
          .select('id')
          .maybeSingle()
  
  
      if (
        error ||
        !data
      ) {
  
        return res
          .status(500)
          .json({
            success: false,
            message:
              '직원 상태 변경에 실패했습니다.'
          })
      }
  
  
      return res
        .status(200)
        .json({
          success: true
        })
    }
  
  
    /*
     * 직원 비밀번호 변경
     */
    if (
      action ===
      'password'
    ) {
  
      const staffId =
        Number(
          req.body?.staffId || 0
        )
  
  
      const password =
        String(
          req.body?.password || ''
        )
  
  
      if (!staffId) {
  
        return res
          .status(400)
          .json({
            success: false,
            message:
              '직원 정보를 확인할 수 없습니다.'
          })
      }
  
  
      if (
        password.length <
        6
      ) {
  
        return res
          .status(400)
          .json({
            success: false,
            message:
              '비밀번호는 6자리 이상 입력해주세요.'
          })
      }
  
  
      const passwordHash =
        createPasswordHash(
          password
        )
  
  
      const {
        data,
        error
      } =
        await supabase
          .from('hotel_staff')
          .update({
            password_hash:
              passwordHash,
  
            updated_at:
              new Date()
                .toISOString()
          })
          .eq(
            'id',
            staffId
          )
          .eq(
            'merchant_id',
            merchantId
          )
          .select('id')
          .maybeSingle()
  
  
      if (
        error ||
        !data
      ) {
  
        return res
          .status(500)
          .json({
            success: false,
            message:
              '비밀번호 변경에 실패했습니다.'
          })
      }
  
  
      return res
        .status(200)
        .json({
          success: true
        })
    }
  
  
    return res
      .status(400)
      .json({
        success: false,
        message:
          '지원하지 않는 요청입니다.'
      })
  }