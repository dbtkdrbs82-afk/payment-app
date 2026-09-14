import type {
    VercelRequest,
    VercelResponse
  } from '@vercel/node'
  
  import {
    createClient
  } from '@supabase/supabase-js'
  
  import {
    pbkdf2Sync,
    randomBytes,
    timingSafeEqual
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
  
  
  function verifyPassword(
    password: string,
    storedHash: string
  ) {
  
    const parts =
      String(
        storedHash || ''
      ).split('$')
  
  
    if (
      parts.length !== 4 ||
      parts[0] !== 'pbkdf2'
    ) {
      return false
    }
  
  
    const iterations =
      Number(
        parts[1]
      )
  
  
    if (
      !Number.isFinite(
        iterations
      ) ||
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
        savedHash.length !==
        calculatedHash.length
      ) {
        return false
      }
  
  
      return timingSafeEqual(
        savedHash,
        calculatedHash
      )
  
    } catch {
  
      return false
    }
  }
  
  
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
      data: merchant,
      error: merchantError
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
        .maybeSingle()
  
  
    if (
      merchantError ||
      !merchant
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
      merchant.status !==
      '운영'
    ) {
  
      return res
        .status(403)
        .json({
          success: false,
          message:
            '아직 개통되지 않은 가맹점입니다.'
        })
    }
  
  
    const {
      data: merchantAuth,
      error: authError
    } =
      await supabase
        .from('merchant_auth')
        .select(`
          merchant_id,
          password_hash,
          password_reset_required
        `)
        .eq(
          'merchant_id',
          merchant.id
        )
        .maybeSingle()
  
  
    if (authError) {
  
      return res
        .status(500)
        .json({
          success: false,
          message:
            '로그인 인증정보를 확인하지 못했습니다.'
        })
    }
  
  
    /*
     * 신규 비밀번호 방식
     */
    if (merchantAuth) {
  
      const passwordOk =
        verifyPassword(
          password,
          merchantAuth.password_hash
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
            Boolean(
              merchantAuth
                .password_reset_required
            )
        })
    }
  
  
    /*
     * 기존 가맹점 계정
     * merchant_password 사용
     */
    const legacyPassword =
      String(
        merchant.merchant_password ||
        ''
      )
  
  
    if (
      legacyPassword !== password
    ) {
  
      return res
        .status(401)
        .json({
          success: false,
          message:
            '아이디 또는 비밀번호가 올바르지 않습니다.'
        })
    }
  
  
    /*
     * 기존 계정 로그인 성공 시
     * 자동으로 새 해시 방식으로 이전
     */
    const now =
      new Date()
        .toISOString()
  
  
    const passwordHash =
      createPasswordHash(
        password
      )
  
  
    const {
      error: migrateError
    } =
      await supabase
        .from('merchant_auth')
        .insert({
          merchant_id:
            merchant.id,
  
          password_hash:
            passwordHash,
  
          password_changed_at:
            now,
  
          password_reset_required:
            false,
  
          updated_at:
            now
        })
  
  
    if (migrateError) {
  
      console.error(
        '기존 가맹점 비밀번호 이전 실패:',
        migrateError.message
      )
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