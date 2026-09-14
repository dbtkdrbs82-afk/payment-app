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
  
  
    const merchantId =
      Number(
        req.body?.merchantId || 0
      )
  
  
    const ownerName =
      String(
        req.body?.ownerName || ''
      ).trim()
  
  
    const phone =
      String(
        req.body?.phone || ''
      )
        .replace(/\D/g, '')
  
  
    const email =
      String(
        req.body?.email || ''
      )
        .trim()
        .toLowerCase()
  
  
    const password =
      String(
        req.body?.password || ''
      )
  
  
    if (
      !merchantId ||
      !ownerName ||
      !phone ||
      !email ||
      !password
    ) {
  
      return res
        .status(400)
        .json({
          success: false,
          message:
            '가입신청 정보를 확인해주세요.'
        })
    }
  
  
    if (
      password.length < 8
    ) {
  
      return res
        .status(400)
        .json({
          success: false,
          message:
            '비밀번호는 8자리 이상이어야 합니다.'
        })
    }
  
  
    if (
      !/[A-Za-z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
  
      return res
        .status(400)
        .json({
          success: false,
          message:
            '비밀번호는 영문과 숫자를 모두 포함해야 합니다.'
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
          owner_name,
          phone,
          email,
          status,
          merchant_login_id
        `)
        .eq(
          'id',
          merchantId
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
            '가입신청 정보를 찾을 수 없습니다.'
        })
    }
  
  
    if (
      merchant.status !== '신청'
    ) {
  
      return res
        .status(403)
        .json({
          success: false,
          message:
            '가입신청 상태에서만 비밀번호를 등록할 수 있습니다.'
        })
    }
  
  
    if (
      String(
        merchant.merchant_login_id ||
        ''
      ).trim()
    ) {
  
      return res
        .status(403)
        .json({
          success: false,
          message:
            '이미 로그인 계정이 발급된 가맹점입니다.'
        })
    }
  
  
    const savedOwnerName =
      String(
        merchant.owner_name ||
        ''
      ).trim()
  
  
    const savedPhone =
      String(
        merchant.phone ||
        ''
      )
        .replace(/\D/g, '')
  
  
    const savedEmail =
      String(
        merchant.email ||
        ''
      )
        .trim()
        .toLowerCase()
  
  
    if (
      savedOwnerName !== ownerName ||
      savedPhone !== phone ||
      savedEmail !== email
    ) {
  
      return res
        .status(403)
        .json({
          success: false,
          message:
            '가입신청자 정보가 일치하지 않습니다.'
        })
    }
  
  
    const {
      data: existingAuth,
      error: authCheckError
    } =
      await supabase
        .from('merchant_auth')
        .select('merchant_id')
        .eq(
          'merchant_id',
          merchantId
        )
        .maybeSingle()
  
  
    if (authCheckError) {
  
      return res
        .status(500)
        .json({
          success: false,
          message:
            '비밀번호 등록상태 확인에 실패했습니다.'
        })
    }
  
  
    if (existingAuth) {
  
      return res
        .status(409)
        .json({
          success: false,
          message:
            '이미 비밀번호가 등록되어 있습니다.'
        })
    }
  
  
    const passwordHash =
      createPasswordHash(
        password
      )
  
  
    const now =
      new Date()
        .toISOString()
  
  
    const {
      error: insertError
    } =
      await supabase
        .from('merchant_auth')
        .insert({
          merchant_id:
            merchantId,
  
          password_hash:
            passwordHash,
  
          password_changed_at:
            now,
  
          password_reset_required:
            false,
  
          updated_at:
            now
        })
  
  
    if (insertError) {
  
      return res
        .status(500)
        .json({
          success: false,
          message:
            '비밀번호 저장 실패: ' +
            insertError.message
        })
    }
  
  
    return res
      .status(200)
      .json({
        success: true
      })
  }