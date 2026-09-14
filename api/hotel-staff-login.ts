import type {
    VercelRequest,
    VercelResponse
  } from '@vercel/node'
  
  import {
    createClient
  } from '@supabase/supabase-js'
  
  import {
    pbkdf2Sync,
    timingSafeEqual
  } from 'crypto'
  
  
  const supabaseUrl =
    'https://rnmptlxdeihvfwegoqnf.supabase.co'
  
  
  function verifyHotelStaffPassword(
    password: string,
    storedHash: string
  ) {
  
    const parts =
      String(storedHash || '')
        .split('$')
  
  
    if (
      parts.length !== 4 ||
      parts[0] !== 'pbkdf2'
    ) {
      return false
    }
  
  
    const iterations =
      Number(parts[1])
  
  
    if (
      !Number.isFinite(iterations) ||
      iterations <= 0
    ) {
      return false
    }
  
  
    try {
  
      const salt =
        Buffer.from(
          parts[2],
          'base64'
        )
  
  
      const savedHash =
        Buffer.from(
          parts[3],
          'base64'
        )
  
  
      const calculatedHash =
        pbkdf2Sync(
          password,
          salt,
          iterations,
          savedHash.length,
          'sha256'
        )
  
  
      if (
        calculatedHash.length !==
        savedHash.length
      ) {
        return false
      }
  
  
      return timingSafeEqual(
        calculatedHash,
        savedHash
      )
  
    } catch {
  
      return false
  
    }
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
      )
        .trim()
        .toUpperCase()
  
  
    const password =
      String(
        req.body?.password || ''
      )
  
  
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
      data: staff,
      error: staffError
    } =
      await supabase
        .from('hotel_staff')
        .select(`
          id,
          merchant_id,
          staff_name,
          login_id,
          password_hash,
          status,
          role
        `)
        .eq(
          'login_id',
          loginId
        )
        .maybeSingle()
  
  
    if (
      staffError ||
      !staff
    ) {
  
      return res
        .status(401)
        .json({
          success: false,
          message:
            '아이디 또는 비밀번호가 올바르지 않습니다.'
        })
    }
  
  
    if (
      staff.status !==
      '사용중'
    ) {
  
      return res
        .status(403)
        .json({
          success: false,
          message:
            '사용이 중지된 직원 계정입니다.'
        })
    }
  
  
    const passwordOk =
      verifyHotelStaffPassword(
        password,
        staff.password_hash
      )
  
  
    if (!passwordOk) {
  
      return res
        .status(401)
        .json({
          success: false,
          message:
            '아이디 또는 비밀번호가 올바르지 않습니다.'
        })
    }
  
  
    const {
      data: merchant,
      error: merchantError
    } =
      await supabase
        .from('merchants')
        .select(`
          id,
          merchant_name,
          merchant_type
        `)
        .eq(
          'id',
          Number(
            staff.merchant_id
          )
        )
        .maybeSingle()
  
  
    if (
      merchantError ||
      !merchant
    ) {
  
      return res
        .status(404)
        .json({
          success: false,
          message:
            '호텔 정보를 찾을 수 없습니다.'
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
            '호텔 직원 계정이 아닙니다.'
        })
    }
  
  
    await supabase
      .from('hotel_staff')
      .update({
        last_login_at:
          new Date()
            .toISOString(),
  
        updated_at:
          new Date()
            .toISOString()
      })
      .eq(
        'id',
        staff.id
      )
  
  
    return res
      .status(200)
      .json({
        success: true,
  
        staff: {
          id:
            staff.id,
  
          staffName:
            staff.staff_name,
  
          loginId:
            staff.login_id,
  
          role:
            staff.role
        },
  
        merchant: {
          id:
            merchant.id,
  
          name:
            merchant.merchant_name,
  
          type:
            merchant.merchant_type
        }
      })
  }