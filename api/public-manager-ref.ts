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
    res.setHeader(
      'Cache-Control',
      'no-store'
    )
  
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
        .replace(/\D/g, '')
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
        message: '추천코드가 올바르지 않습니다.',
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
        data: userData,
        error: userError,
      } = await supabase
        .from('admin_users')
        .select(
          'id, admin_name, login_id, phone, role, status, parent_admin_id'
        )
        .eq('status', '사용중')
        .in(
          'role',
          [
            'BRANCH',
            'AGENCY',
            'MANAGER',
          ]
        )
  
      if (userError) {
        console.error(
          '추천 조직 조회 오류:',
          userError.message
        )
  
        return res.status(500).json({
          success: false,
          message:
            '담당자 정보를 확인하지 못했습니다.',
        })
      }
  
      const matchedUsers =
        (userData || []).filter(
          (user) =>
            String(user.phone || '')
              .replace(/\D/g, '')
              .endsWith(refCode)
        )
  
      /*
        같은 전화번호가 여러 조직에 등록된 경우
  
        1. 담당자
        2. 지사
        3. 대리점
  
        순서로 찾습니다.
  
        현재 99382962는
        MANAGER 계정이 없고
        BRANCH 계정이 있으므로
        지사로 연결됩니다.
      */
  
      const matchedUser =
        matchedUsers.find(
          (user) =>
            user.role === 'MANAGER'
        ) ||
        matchedUsers.find(
          (user) =>
            user.role === 'BRANCH'
        ) ||
        matchedUsers.find(
          (user) =>
            user.role === 'AGENCY'
        ) ||
        null
  
      if (!matchedUser) {
        return res.status(200).json({
          success: true,
          manager: null,
          agency: null,
          branch: null,
        })
      }
  
      let matchedManager: any = null
      let matchedAgency: any = null
      let matchedBranch: any = null
  
      /*
        담당자 링크
      */
  
      if (matchedUser.role === 'MANAGER') {
        matchedManager = matchedUser
  
        if (matchedUser.parent_admin_id) {
          const {
            data: parentData,
            error: parentError,
          } = await supabase
            .from('admin_users')
            .select(
              'id, admin_name, login_id, phone, role, status, parent_admin_id'
            )
            .eq(
              'id',
              Number(
                matchedUser.parent_admin_id
              )
            )
            .eq('status', '사용중')
            .maybeSingle()
  
          if (parentError) {
            console.error(
              '담당자 상위조직 조회 오류:',
              parentError.message
            )
          }
  
          if (
            parentData?.role === 'AGENCY'
          ) {
            matchedAgency = parentData
  
            if (
              parentData.parent_admin_id
            ) {
              const {
                data: branchData,
                error: branchError,
              } = await supabase
                .from('admin_users')
                .select(
                  'id, admin_name, login_id, phone, role, status, parent_admin_id'
                )
                .eq(
                  'id',
                  Number(
                    parentData.parent_admin_id
                  )
                )
                .eq('status', '사용중')
                .maybeSingle()
  
              if (branchError) {
                console.error(
                  '지사 조회 오류:',
                  branchError.message
                )
              }
  
              if (
                branchData?.role ===
                'BRANCH'
              ) {
                matchedBranch =
                  branchData
              }
            }
          }
  
          if (
            parentData?.role === 'BRANCH'
          ) {
            matchedBranch = parentData
          }
        }
      }
  
      /*
        대리점 링크
      */
  
      if (matchedUser.role === 'AGENCY') {
        matchedAgency = matchedUser
  
        if (matchedUser.parent_admin_id) {
          const {
            data: branchData,
            error: branchError,
          } = await supabase
            .from('admin_users')
            .select(
              'id, admin_name, login_id, phone, role, status, parent_admin_id'
            )
            .eq(
              'id',
              Number(
                matchedUser.parent_admin_id
              )
            )
            .eq('status', '사용중')
            .maybeSingle()
  
          if (branchError) {
            console.error(
              '대리점 상위 지사 조회 오류:',
              branchError.message
            )
          }
  
          if (
            branchData?.role === 'BRANCH'
          ) {
            matchedBranch = branchData
          }
        }
      }
  
      /*
        지사 링크
      */
  
      if (matchedUser.role === 'BRANCH') {
        matchedBranch = matchedUser
      }
  
      return res.status(200).json({
        success: true,
  
        manager: matchedManager
          ? {
              id: matchedManager.id,
              admin_name:
                matchedManager.admin_name ||
                '',
              phone:
                matchedManager.phone || '',
            }
          : null,
  
        agency: matchedAgency
          ? {
              id: matchedAgency.id,
              admin_name:
                matchedAgency.admin_name ||
                '',
            }
          : null,
  
        branch: matchedBranch
          ? {
              id: matchedBranch.id,
              admin_name:
                matchedBranch.admin_name ||
                '',
            }
          : null,
      })
    } catch (error) {
      console.error(
        '추천코드 API 오류:',
        error
      )
  
      return res.status(500).json({
        success: false,
        message:
          '담당자 정보를 확인하지 못했습니다.',
      })
    }
  }