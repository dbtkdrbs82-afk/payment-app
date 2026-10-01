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
  
  
  function verifyAdminSession(
    token: string
  ) {
    if (
      !token ||
      !ADMIN_SESSION_SECRET
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
        ADMIN_SESSION_SECRET
      )
        .update(body)
        .digest('base64url')
  
  
    const receivedBuffer =
      Buffer.from(signature)
  
  
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
          ).toString('utf8')
        )
  
  
      if (
        !payload?.id ||
        !payload?.login_id ||
        !payload?.exp ||
        Number(payload.exp) <
          Date.now()
      ) {
        return null
      }
  
  
      return payload
  
    } catch {
      return null
    }
  }
  
  
  function pickAllowedFields(
    source: Record<string, any>,
    fields: string[]
  ) {
    const result:
      Record<string, any> = {}
  
  
    for (
      const field of fields
    ) {
      if (
        Object.prototype
          .hasOwnProperty
          .call(
            source,
            field
          )
      ) {
        result[field] =
          source[field]
      }
    }
  
  
    return result
  }
  
  
  export default async function handler(
    req: VercelRequest,
    res: VercelResponse
  ) {
    res.setHeader(
      'Cache-Control',
      'no-store'
    )
  
  
    if (req.method !== 'POST') {
      return res.status(405).json({
        success: false,
        message:
          'POST 요청만 가능합니다.',
      })
    }
  
  
    if (
      !SUPABASE_URL ||
      !SUPABASE_SERVICE_ROLE_KEY ||
      !ADMIN_SESSION_SECRET
    ) {
      return res.status(500).json({
        success: false,
        message:
          '서버 환경변수를 확인해주세요.',
      })
    }
  
  
    const token =
      getCookie(
        req.headers.cookie,
        'nxg_admin_session'
      )
  
  
    const adminSession =
      verifyAdminSession(
        token
      )
  
  
    if (!adminSession) {
      return res.status(401).json({
        success: false,
        message:
          '관리자 로그인이 필요합니다.',
      })
    }
  
  
    const merchantId =
      Number(
        req.body?.merchantId ||
        0
      )
  
  
    const inputData =
      req.body?.data &&
      typeof req.body.data ===
        'object'
        ? req.body.data
        : {}

        const inputKorpayManualMids =
  Array.isArray(
    req.body?.korpayManualMids
  )
    ? req.body.korpayManualMids
    : []
  
  
    if (
      !Number.isInteger(
        merchantId
      ) ||
      merchantId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          '가맹점 ID가 올바르지 않습니다.',
      })
    }
  
  
    try {
      const supabase =
        createClient(
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
        data: actor,
        error: actorError,
      } =
        await supabase
          .from('admin_users')
          .select(`
            id,
            login_id,
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
  
  
      if (
        actorError ||
        !actor
      ) {
        return res.status(401).json({
          success: false,
          message:
            '관리자 인증정보가 올바르지 않습니다.',
        })
      }
  
  
      const {
        data: merchant,
        error: merchantError,
      } =
        await supabase
          .from('merchants')
          .select(`
            id,
            branch_admin_id,
            agency_admin_id,
            manager_admin_id
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
        return res.status(404).json({
          success: false,
          message:
            '가맹점을 찾을 수 없습니다.',
        })
      }
  
  
      let hasAccess =
        false
  
  
      if (
        actor.role ===
        'MASTER'
      ) {
        hasAccess =
          true
      }
  
  
      if (
        actor.role ===
          'BRANCH' &&
        Number(
          merchant.branch_admin_id ||
          0
        ) ===
          Number(actor.id)
      ) {
        hasAccess =
          true
      }
  
  
      if (
        actor.role ===
          'AGENCY' &&
        Number(
          merchant.agency_admin_id ||
          0
        ) ===
          Number(actor.id)
      ) {
        hasAccess =
          true
      }
  
  
      if (
        actor.role ===
          'MANAGER' &&
        Number(
          merchant.manager_admin_id ||
          0
        ) ===
          Number(actor.id)
      ) {
        hasAccess =
          true
      }
  
  
      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          message:
            '이 가맹점을 수정할 권한이 없습니다.',
        })
      }
  
  
      const contactFields = [
        'phone',
        'email',
        'zipcode',
        'address',
        'address_detail',
      ]
  
  
      const generalFields = [
        'merchant_name',
        'merchant_type',
        'owner_name',
        'phone',
        'fee_rate',
        'register_type',
  
        'pg_company',
        'online_pg_company_1',
        'online_pg_company_2',
        'manual_pg_company',
  
        'company_type',
        'status',
  
        'resident_number',
        'business_number',
        'email',
        'zipcode',
        'address',
        'address_detail',
  
        'cpid',
  
        'korpay_pg_mid',
        'korpay_pg_mkey',
        'korpay_terminal_mid',
        'korpay_terminal_mkey',
        'korpay_manual_mid',
        'korpay_manual_mkey',
  
        'toss_client_key',
        'toss_secret_key',
        'toss_mid',
  
        'daou_pg_mid',
        'daou_pg_mkey',
        'daou_terminal_mid',
        'daou_terminal_mkey',
        'daou_manual_mid',
        'daou_manual_mkey',
  
        'opened_at',
  
        'settlement_cycle',
  
        'installment_month',
        'daily_limit',
        'monthly_limit',
        'yearly_limit',
  
        'memo',
      ]
  
  
      let updateData:
        Record<string, any> = {}
  
  
      /*
       * 대리점 / 담당자
       * 연락처와 주소만 수정
       */
      if (
        actor.role ===
          'AGENCY' ||
        actor.role ===
          'MANAGER'
      ) {
        updateData =
          pickAllowedFields(
            inputData,
            contactFields
          )
      }
  
  
      /*
       * 지사
       */
      if (
        actor.role ===
        'BRANCH'
      ) {
        updateData =
          pickAllowedFields(
            inputData,
            [
              ...generalFields,
              'merchant_password',
            ]
          )
  
  
        updateData.branch_admin_id =
          Number(actor.id)
      }
  
  
      /*
       * 마스터
       */
      if (
        actor.role ===
        'MASTER'
      ) {
        updateData =
          pickAllowedFields(
            inputData,
            [
              ...generalFields,
  
              'merchant_password',
  
              'branch_admin_id',
              'agency_admin_id',
              'manager_admin_id',
  
              'bank_name',
              'account_number',
              'account_holder',
            ]
          )
      }
  
  
      if (
        ![
          'MASTER',
          'BRANCH',
          'AGENCY',
          'MANAGER',
        ].includes(
          String(actor.role)
        )
      ) {
        return res.status(403).json({
          success: false,
          message:
            '가맹점 수정 권한이 없습니다.',
        })
      }
  
  
      /*
       * 비밀번호가 빈값이면
       * 기존 비밀번호 유지
       */
      if (
        Object.prototype
          .hasOwnProperty
          .call(
            updateData,
            'merchant_password'
          ) &&
        !String(
          updateData
            .merchant_password ||
          ''
        ).trim()
      ) {
        delete updateData
          .merchant_password
      }
  
  
      /*
       * 계좌정보는
       * 루트 마스터만 수정 가능
       */
      if (
        String(
          actor.login_id
        ) !==
        'NXGMASTER16'
      ) {
        delete updateData.bank_name
        delete updateData.account_number
        delete updateData.account_holder
      }
  
  
      /*
       * 조직정보
       */
      if (
        actor.role ===
          'MASTER' ||
        actor.role ===
          'BRANCH'
      ) {
  
        let branchId =
          actor.role ===
          'BRANCH'
            ? Number(actor.id)
            : Number(
                inputData
                  .branch_admin_id ||
                0
              )
  
  
        const agencyId =
          Number(
            inputData
              .agency_admin_id ||
            0
          )
  
  
        const managerId =
          Number(
            inputData
              .manager_admin_id ||
            0
          )
  
  
        let branchName =
          ''
  
        let agencyName =
          ''
  
        let managerName =
          ''
  
        let managerPhone =
          ''
  
  
        if (branchId) {
          const {
            data: branch,
          } =
            await supabase
              .from('admin_users')
              .select(`
                id,
                admin_name,
                role,
                status
              `)
              .eq(
                'id',
                branchId
              )
              .eq(
                'role',
                'BRANCH'
              )
              .eq(
                'status',
                '사용중'
              )
              .maybeSingle()
  
  
          if (!branch) {
            return res.status(400).json({
              success: false,
              message:
                '선택한 지사 정보를 확인할 수 없습니다.',
            })
          }
  
  
          branchName =
            String(
              branch.admin_name ||
              ''
            )
        }
  
  
        if (agencyId) {
          const {
            data: agency,
          } =
            await supabase
              .from('admin_users')
              .select(`
                id,
                admin_name,
                role,
                status,
                parent_admin_id
              `)
              .eq(
                'id',
                agencyId
              )
              .eq(
                'role',
                'AGENCY'
              )
              .eq(
                'status',
                '사용중'
              )
              .maybeSingle()
  
  
          if (!agency) {
            return res.status(400).json({
              success: false,
              message:
                '선택한 대리점 정보를 확인할 수 없습니다.',
            })
          }
  
  
          if (
            branchId &&
            Number(
              agency.parent_admin_id ||
              0
            ) !==
              branchId
          ) {
            return res.status(400).json({
              success: false,
              message:
                '선택한 대리점이 해당 지사 소속이 아닙니다.',
            })
          }
  
  
          agencyName =
            String(
              agency.admin_name ||
              ''
            )
        }
  
  
        if (managerId) {
          const {
            data: manager,
          } =
            await supabase
              .from('admin_users')
              .select(`
                id,
                admin_name,
                phone,
                role,
                status,
                parent_admin_id
              `)
              .eq(
                'id',
                managerId
              )
              .eq(
                'role',
                'MANAGER'
              )
              .eq(
                'status',
                '사용중'
              )
              .maybeSingle()
  
  
          if (!manager) {
            return res.status(400).json({
              success: false,
              message:
                '선택한 담당자 정보를 확인할 수 없습니다.',
            })
          }
  
  
          const validParentId =
            agencyId ||
            branchId
  
  
          if (
            validParentId &&
            Number(
              manager.parent_admin_id ||
              0
            ) !==
              validParentId
          ) {
            return res.status(400).json({
              success: false,
              message:
                '선택한 담당자가 해당 조직 소속이 아닙니다.',
            })
          }
  
  
          managerName =
            String(
              manager.admin_name ||
              ''
            )
  
  
          managerPhone =
            String(
              manager.phone ||
              ''
            )
        }
  
  
        updateData.branch_admin_id =
          branchId || null
  
        updateData.branch_admin_name =
          branchName
  
        updateData.agency_admin_id =
          agencyId || null
  
        updateData.agency_name =
          agencyName
  
        updateData.agency_admin_name =
          agencyName
  
        updateData.manager_admin_id =
          managerId || null
  
        updateData.manager_admin_name =
          managerName
  
        updateData.manager_phone =
          managerPhone
      }
  
  
      if (
        Object.keys(
          updateData
        ).length === 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            '수정할 정보가 없습니다.',
        })
      }
  
  
      const {
        data: updatedMerchant,
        error: updateError,
      } =
        await supabase
          .from('merchants')
          .update(
            updateData
          )
          .eq(
            'id',
            merchantId
          )
          .select()
          .maybeSingle()
  
  
      if (updateError) {
        console.error(
          '가맹점 수정 오류:',
          updateError.message
        )
  
        return res.status(500).json({
          success: false,
          message:
            '가맹점 정보 수정에 실패했습니다.',
        })
      }
  
            /*
       * 코페이 수기 MID 1~10 저장
       * MASTER / BRANCH만 수정 가능
       */
            if (
              actor.role === 'MASTER' ||
              actor.role === 'BRANCH'
            ) {
      
              const normalizedManualMids =
                inputKorpayManualMids
                  .slice(0, 10)
                  .map(
                    (
                      row: any,
                      index: number
                    ) => {
      
                      const mid =
                        String(
                          row?.mid || ''
                        ).trim()
      
                      const mkey =
                        String(
                          row?.mkey || ''
                        ).trim()
      
                      const monthlyLimit =
                        Number(
                          row?.monthly_limit ||
                          5000000
                        )
      
                      return {
                        merchant_id:
                          merchantId,
      
                        mid,
      
                        mkey,
      
                        priority:
                          index + 1,
      
                        monthly_limit:
                          Number.isFinite(
                            monthlyLimit
                          ) &&
                          monthlyLimit > 0
                            ? monthlyLimit
                            : 5000000,
      
                        status:
                          String(
                            row?.status ||
                            '사용중'
                          ).trim() ||
                          '사용중'
                      }
                    }
                  )
                  .filter(
                    (row: any) =>
                      row.mid &&
                      row.mkey
                  )
      
      
              const {
                error:
                  manualMidDeleteError,
              } =
                await supabase
                  .from(
                    'merchant_korpay_manual_mids'
                  )
                  .delete()
                  .eq(
                    'merchant_id',
                    merchantId
                  )
      
      
              if (manualMidDeleteError) {
      
                console.error(
                  '코페이 수기 MID 기존정보 삭제 오류:',
                  manualMidDeleteError.message
                )
      
                return res.status(500).json({
                  success: false,
                  message:
                    '코페이 수기 MID 기존정보 정리에 실패했습니다.',
                })
              }
      
      
              if (
                normalizedManualMids.length > 0
              ) {
      
                const {
                  error:
                    manualMidInsertError,
                } =
                  await supabase
                    .from(
                      'merchant_korpay_manual_mids'
                    )
                    .insert(
                      normalizedManualMids
                    )
      
      
                if (manualMidInsertError) {
      
                  console.error(
                    '코페이 수기 MID 저장 오류:',
                    manualMidInsertError.message
                  )
      
                  return res.status(500).json({
                    success: false,
                    message:
                      '코페이 수기 MID 저장에 실패했습니다.',
                  })
                }
              }
      
      
              /*
               * 1번 MID는 기존 merchants 컬럼에도 유지
               */
              const firstManualMid =
                normalizedManualMids[0]
      
      
              const {
                error:
                  firstManualMidUpdateError,
              } =
                await supabase
                  .from(
                    'merchants'
                  )
                  .update({
                    korpay_manual_mid:
                      firstManualMid?.mid || '',
      
                    korpay_manual_mkey:
                      firstManualMid?.mkey || ''
                  })
                  .eq(
                    'id',
                    merchantId
                  )
      
      
              if (
                firstManualMidUpdateError
              ) {
      
                console.error(
                  '대표 코페이 수기 MID 저장 오류:',
                  firstManualMidUpdateError.message
                )
      
                return res.status(500).json({
                  success: false,
                  message:
                    '대표 코페이 수기 MID 저장에 실패했습니다.',
                })
              }
            }
  
      return res.status(200).json({
        success: true,
        message:
          '저장되었습니다.',
        merchant:
          updatedMerchant,
      })
  
    } catch (error) {
  
      console.error(
        '관리자 가맹점 수정 API 오류:',
        error
      )
  
  
      return res.status(500).json({
        success: false,
        message:
          '가맹점 정보 수정 중 오류가 발생했습니다.',
      })
    }
  }