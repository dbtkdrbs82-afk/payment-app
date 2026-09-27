import type {
    VercelRequest,
    VercelResponse,
  } from '@vercel/node'
  
  import { createClient } from '@supabase/supabase-js'
  
  const SUPABASE_URL =
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    ''
  
  const SUPABASE_SERVICE_ROLE_KEY =
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  
  export default async function handler(
    req: VercelRequest,
    res: VercelResponse
  ) {
    res.setHeader('Cache-Control', 'no-store')
  
    if (req.method !== 'GET') {
      return res.status(405).json({
        success: false,
        message: 'GET 요청만 가능합니다.',
      })
    }
  
    if (
      !SUPABASE_URL ||
      !SUPABASE_SERVICE_ROLE_KEY
    ) {
      return res.status(500).json({
        success: false,
        message: '서버 설정 오류입니다.',
      })
    }
  
    const refCode =
      String(req.query.ref || '')
        .replace(/-/g, '')
        .trim()
  
    if (!refCode) {
      return res.status(200).json({
        success: true,
        manager: null,
        agency: null,
        branch: null,
      })
    }
  
    if (!/^[0-9]+$/.test(refCode)) {
      return res.status(400).json({
        success: false,
        message: '담당자 코드가 올바르지 않습니다.',
      })
    }
  
    try {
      const supabase = createClient(
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
        data: managerData,
        error: managerError,
      } = await supabase
        .from('admin_users')
        .select(
          'id, admin_name, phone, parent_admin_id'
        )
        .eq('role', 'MANAGER')
        .eq('status', '사용중')
  
      if (managerError) {
        console.error(
          '담당자 조회 오류:',
          managerError.message
        )
  
        return res.status(500).json({
          success: false,
          message:
            '담당자 정보를 확인하지 못했습니다.',
        })
      }
  
      const matchedManager =
        (managerData || []).find(
          (user) =>
            String(user.phone || '')
              .replace(/-/g, '')
              .endsWith(refCode)
        )
  
      if (!matchedManager) {
        return res.status(200).json({
          success: true,
          manager: null,
          agency: null,
          branch: null,
        })
      }
  
      let matchedAgency: any = null
      let matchedBranch: any = null
  
      if (matchedManager.parent_admin_id) {
        const {
          data: agencyData,
          error: agencyError,
        } = await supabase
          .from('admin_users')
          .select(
            'id, admin_name, role, parent_admin_id'
          )
          .eq(
            'id',
            matchedManager.parent_admin_id
          )
          .maybeSingle()
  
        if (agencyError) {
          console.error(
            '대리점 조회 오류:',
            agencyError.message
          )
        } else {
          matchedAgency = agencyData || null
        }
      }
  
      if (matchedAgency?.parent_admin_id) {
        const {
          data: branchData,
          error: branchError,
        } = await supabase
          .from('admin_users')
          .select(
            'id, admin_name, role'
          )
          .eq(
            'id',
            matchedAgency.parent_admin_id
          )
          .maybeSingle()
  
        if (branchError) {
          console.error(
            '지사 조회 오류:',
            branchError.message
          )
        } else {
          matchedBranch = branchData || null
        }
      }
  
      return res.status(200).json({
        success: true,
  
        manager: {
          id: matchedManager.id,
          admin_name:
            matchedManager.admin_name || '',
          phone:
            matchedManager.phone || '',
        },
  
        agency: matchedAgency
          ? {
              id: matchedAgency.id,
              admin_name:
                matchedAgency.admin_name || '',
            }
          : null,
  
        branch: matchedBranch
          ? {
              id: matchedBranch.id,
              admin_name:
                matchedBranch.admin_name || '',
            }
          : null,
      })
    } catch (error) {
      console.error(
        '담당자 추천코드 API 오류:',
        error
      )
  
      return res.status(500).json({
        success: false,
        message:
          '담당자 정보를 확인하지 못했습니다.',
      })
    }
  }