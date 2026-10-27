import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createHash, randomBytes } from 'node:crypto'

function onlyDigits(value: unknown): string {
  return String(value ?? '').replace(/\D/g, '')
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'POST only'
    })
  }

  const supabaseUrl = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({
      success: false,
      message: 'Supabase 환경변수가 없습니다.'
    })
  }

  try {   
    const {
      merchantId,
      amount,
      cardNumber,
      expiryYymm,
      installment,
      buyerName,
      billingIds,
      goodsName,
      customerPhone
    } = req.body || {}

    const merchantDbId = Number(merchantId)
const goodsAmt = Number(amount)
const cardNo = onlyDigits(cardNumber)
const expiry = onlyDigits(expiryYymm)

const quotaMon = onlyDigits(installment || '00').padStart(2, '0')
const ordHp = onlyDigits(customerPhone)

    if (!Number.isInteger(merchantDbId) || merchantDbId <= 0) {
      return res.status(400).json({
        success: false,
        message: '가맹점 정보가 올바르지 않습니다.'
      })
    }

    if (!Number.isFinite(goodsAmt) || goodsAmt <= 0) {
      return res.status(400).json({
        success: false,
        message: '결제금액이 올바르지 않습니다.'
      })
    }

    if (!/^\d{13,19}$/.test(cardNo)) {
      return res.status(400).json({
        success: false,
        message: '카드번호를 확인해주세요.'
      })
    }

    if (!/^\d{4}$/.test(expiry)) {
      return res.status(400).json({
        success: false,
        message: '유효기간은 YYMM 4자리로 입력해주세요.'
      })
    }

    
    
    

    const supabaseHeaders = {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json'
    }

    const merchantResponse = await fetch(
      `${supabaseUrl}/rest/v1/merchants` +
        `?select=id,merchant_name,korpay_manual_mid,korpay_manual_mkey` +
        `&id=eq.${merchantDbId}` +
        `&limit=1`,
      {
        method: 'GET',
        headers: supabaseHeaders
      }
    )

    const merchantRows =
      await merchantResponse.json()

    if (!merchantResponse.ok) {
      return res.status(500).json({
        success: false,
        message: '가맹점 조회에 실패했습니다.',
        detail: merchantRows
      })
    }

    const merchant =
      Array.isArray(merchantRows) &&
      merchantRows.length > 0
        ? merchantRows[0]
        : null

    if (!merchant) {
      return res.status(404).json({
        success: false,
        message: '가맹점을 찾을 수 없습니다.'
      })
    }


    /* =========================================
       코페이 수기결제 다중 MID 조회
    ========================================= */

    const manualMidResponse =
      await fetch(
        `${supabaseUrl}/rest/v1/merchant_korpay_manual_mids` +
          `?select=id,merchant_id,mid,mkey,priority,monthly_limit,status` +
          `&merchant_id=eq.${merchantDbId}` +
          `&status=eq.${encodeURIComponent('사용중')}` +
          `&order=priority.asc,id.asc`,
        {
          method: 'GET',
          headers: supabaseHeaders
        }
      )

    const manualMidResult =
      await manualMidResponse.json()

    if (!manualMidResponse.ok) {
      return res.status(500).json({
        success: false,
        message:
          '코페이 수기결제 MID 목록 조회에 실패했습니다.',
        detail: manualMidResult
      })
    }


    let manualMidRows: any[] =
      Array.isArray(manualMidResult)
        ? manualMidResult
        : []


    /*
     * 기존 merchants MID도 당분간 fallback으로 유지
     * 새 테이블에 데이터가 없는 기존 가맹점 보호
     */
    if (
      manualMidRows.length === 0 &&
      String(
        merchant.korpay_manual_mid || ''
      ).trim() &&
      String(
        merchant.korpay_manual_mkey || ''
      ).trim()
    ) {

      manualMidRows = [
        {
          mid:
            String(
              merchant.korpay_manual_mid
            ).trim(),

          mkey:
            String(
              merchant.korpay_manual_mkey
            ).trim(),

          priority: 1,

          monthly_limit:
            5000000,

          status:
            '사용중'
        }
      ]
    }


    if (manualMidRows.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          '사용 가능한 코페이 수기결제 MID가 없습니다.'
      })
    }


    /* =========================================
       한국시간 기준 이번 달 범위 계산
    ========================================= */

    const koreaDateParts =
      new Intl.DateTimeFormat(
        'en-US',
        {
          timeZone:
            'Asia/Seoul',

          year:
            'numeric',

          month:
            '2-digit'
        }
      ).formatToParts(
        new Date()
      )


    const koreaYear =
      Number(
        koreaDateParts.find(
          (part) =>
            part.type === 'year'
        )?.value || 0
      )


    const koreaMonth =
      Number(
        koreaDateParts.find(
          (part) =>
            part.type === 'month'
        )?.value || 0
      )


    if (
      !koreaYear ||
      !koreaMonth
    ) {

      return res.status(500).json({
        success: false,
        message:
          '월 결제한도 기준일 계산에 실패했습니다.'
      })
    }


    const monthStart =
      new Date(
        `${koreaYear}-` +
        `${String(koreaMonth).padStart(2, '0')}-` +
        `01T00:00:00+09:00`
      )


    const nextMonthYear =
      koreaMonth === 12
        ? koreaYear + 1
        : koreaYear


    const nextMonthValue =
      koreaMonth === 12
        ? 1
        : koreaMonth + 1


    const nextMonthStart =
      new Date(
        `${nextMonthYear}-` +
        `${String(nextMonthValue).padStart(2, '0')}-` +
        `01T00:00:00+09:00`
      )


    const monthStartIso =
      monthStart.toISOString()

    const nextMonthStartIso =
      nextMonthStart.toISOString()


      /* =========================================
       MID별 월 잔여한도 + 1회 100만원 기준
       자동 분할 계획 생성
    ========================================= */

    const PER_PAYMENT_LIMIT =
      1000000


    const splitPlan: Array<{
      mid: string
      mkey: string
      amount: number
      priority: number
      monthlyUsed: number
      monthlyLimit: number
    }> = []


    let remainingAmount =
      goodsAmt


    for (
      const manualMid of manualMidRows
    ) {

      if (remainingAmount <= 0) {
        break
      }


      const candidateMid =
        String(
          manualMid.mid || ''
        ).trim()


      const candidateMkey =
        String(
          manualMid.mkey || ''
        ).trim()


      const candidateMonthlyLimit =
        Number(
          manualMid.monthly_limit ||
          5000000
        )


      if (
        !candidateMid ||
        !candidateMkey ||
        !Number.isFinite(
          candidateMonthlyLimit
        ) ||
        candidateMonthlyLimit <= 0
      ) {
        continue
      }


      const monthlyPaymentResponse =
        await fetch(
          `${supabaseUrl}/rest/v1/payments` +
            `?select=amount` +
            `&pg_mid=eq.${encodeURIComponent(candidateMid)}` +
            `&pg_company=eq.${encodeURIComponent('코페이')}` +
            `&merchant_id=eq.${merchantDbId}` +
            `&status=eq.paid` +
            `&created_at=gte.${encodeURIComponent(monthStartIso)}` +
            `&created_at=lt.${encodeURIComponent(nextMonthStartIso)}`,
          {
            method: 'GET',
            headers: supabaseHeaders
          }
        )


      const monthlyPaymentRows =
        await monthlyPaymentResponse.json()


      if (!monthlyPaymentResponse.ok) {

        console.error(
          '코페이 MID 월 사용금액 조회 실패:',
          candidateMid,
          monthlyPaymentRows
        )

        continue
      }


      const monthlyUsed =
        (
          Array.isArray(
            monthlyPaymentRows
          )
            ? monthlyPaymentRows
            : []
        ).reduce(
          (
            sum: number,
            payment: any
          ) =>
            sum +
            Number(
              payment.amount || 0
            ),
          0
        )


      const monthlyRemaining =
        Math.max(
          0,
          candidateMonthlyLimit -
          monthlyUsed
        )


      if (monthlyRemaining <= 0) {
        continue
      }


      const requiredSplitAmount =
        Math.min(
          remainingAmount,
          PER_PAYMENT_LIMIT
        )


      if (
        monthlyRemaining <
        requiredSplitAmount
      ) {
        continue
      }


      const splitAmount =
        requiredSplitAmount


      if (splitAmount <= 0) {
        continue
      }


      splitPlan.push({
        mid:
          candidateMid,

        mkey:
          candidateMkey,

        amount:
          splitAmount,

        priority:
          Number(
            manualMid.priority || 0
          ),

        monthlyUsed,

        monthlyLimit:
          candidateMonthlyLimit
      })


      remainingAmount -=
        splitAmount
    }


    /*
     * 등록된 MID 전체를 사용해도
     * 총 결제금액을 처리할 수 없는 경우
     */
    if (remainingAmount > 0) {

      return res.status(400).json({
        success: false,

        message:
          '등록된 코페이 수기결제 MID의 월 잔여한도가 부족합니다.',

        resultCode:
          'MONTHLY_LIMIT_EXCEEDED',

        requestedAmount:
          goodsAmt,

        shortageAmount:
          remainingAmount
      })
    }


    console.log(
      '[코페이 수기결제 분할계획]',
      {
        merchantId:
          merchantDbId,

        totalAmount:
          goodsAmt,

        splits:
          splitPlan.map(
            (item) => ({
              mid:
                item.mid,

              amount:
                item.amount,

              priority:
                item.priority,

              monthlyUsed:
                item.monthlyUsed,

              monthlyLimit:
                item.monthlyLimit
            })
          )
      }
    )


    const korpayUrl =
      process.env
        .KORPAY_MANUAL_PAY_URL ||
      'https://staging-pgapi.korpay.com/api/manualpay'


    const korpayCancelUrl =
      process.env
        .KORPAY_CANCEL_URL ||
      'https://staging-pgapi.korpay.com/api/cancel'


    type ApprovedSplit = {
      ordNo: string
      mid: string
      amount: number
      tid: string
      approvalNumber: string | null
      approvedAt: string | null
      cardCompany: string | null
      cardNumber: string | null
      response: Record<string, unknown>
    }


    const approvedSplits:
      ApprovedSplit[] = []


    /*
     * 중간 실패시
     * 앞에서 승인된 건 전체 자동취소
     */
    const rollbackApprovedSplits =
      async () => {

        const rollbackErrors:
          string[] = []


        for (
          const approved of
          [...approvedSplits].reverse()
        ) {

          try {

            const cancelResponse =
              await fetch(
                korpayCancelUrl,
                {
                  method:
                    'POST',

                  headers: {
                    'Content-Type':
                      'application/json'
                  },

                  body:
                    JSON.stringify({
                      ordNo:
                        approved.ordNo,

                      canAmt:
                        String(
                          approved.amount
                        ),

                      mid:
                        approved.mid,

                      canNm:
                        String(
                          buyerName ||
                          merchant.merchant_name ||
                          '가맹점'
                        )
                          .trim()
                          .slice(
                            0,
                            30
                          ),

                      canMsg:
                        '분할결제 중간실패 자동취소',

                      partCanFlg:
                        '0'
                    })
                }
              )


            const cancelText =
              await cancelResponse.text()


            let cancelData:
              Record<string, any> = {}


            try {

              cancelData =
                JSON.parse(
                  cancelText
                )

            } catch {

              cancelData = {
                raw:
                  cancelText
              }
            }


            const cancelCode =
              String(
                cancelData.res_code ||
                cancelData.resCode ||
                ''
              ).trim()


            if (
              !cancelResponse.ok ||
              cancelCode !== '0000'
            ) {

              rollbackErrors.push(
                approved.mid +
                ' / ' +
                approved.amount +
                '원'
              )
            }

          } catch (error) {

            rollbackErrors.push(
              approved.mid +
              ' / ' +
              approved.amount +
              '원'
            )

            console.error(
              '분할결제 자동취소 오류:',
              error
            )
          }
        }


        return rollbackErrors
      }


    /*
     * 분할계획 순서대로 실제 승인
     */
    for (
      let index = 0;
      index < splitPlan.length;
      index += 1
    ) {

      const split =
        splitPlan[index]


      const ordNo =
        Date.now()
          .toString()
          .padStart(
            13,
            '0'
          )
          .slice(
            -13
          ) +
        Array.from(
          randomBytes(17),
          (byte) =>
            String(
              byte % 10
            )
        ).join('')


      const hashKey =
        createHash(
          'sha256'
        )
          .update(
            split.mid +
            String(
              split.amount
            )
          )
          .digest(
            'hex'
          )
          .toLowerCase()


      const korpayRequest = {
        ordNo,

        mkey:
          split.mkey,

        mid:
          split.mid,

        goodsAmt:
          String(
            split.amount
          ),

        cardNo,

        expireYymm:
          expiry,

        quotaMon,

        buyer_nm:
          String(
            buyerName ||
            '구매자'
          ).trim(),

        goodsNm:
          String(
            goodsName ||
            '일반 카드결제'
          ).trim(),

        ordHp,

        hashKey
      }


      const korpayResponse =
        await fetch(
          korpayUrl,
          {
            method:
              'POST',

            headers: {
              'Content-Type':
                'application/json'
            },

            body:
              JSON.stringify(
                korpayRequest
              )
          }
        )


      const responseText =
        await korpayResponse.text()


      let korpayData:
        Record<string, any>


      try {

        korpayData =
          JSON.parse(
            responseText
          )

      } catch {

        const rollbackErrors =
          await rollbackApprovedSplits()


        return res.status(502).json({
          success: false,

          message:
            '코페이 응답 형식이 올바르지 않습니다.',

          detail:
            responseText,

          rollbackErrors
        })
      }


      const resultCode =
        String(
          korpayData.res_code ??
          korpayData.resultCode ??
          ''
        ).trim()


      if (
        !korpayResponse.ok ||
        resultCode !== '0000'
      ) {

        const rollbackErrors =
          await rollbackApprovedSplits()


        return res.status(
          korpayResponse.ok
            ? 400
            : korpayResponse.status
        ).json({

          success:
            false,

          message:
            String(
              korpayData.res_msg ||
              korpayData.resMsg ||
              ''
            ).trim() ||
            '카드결제가 승인되지 않았습니다.',

          resultCode,

          failedSplit:
            index + 1,

          failedAmount:
            split.amount,

          usedMid:
            split.mid,

          usedMkeyLast4:
            split.mkey.slice(
              -4
            ),

          rollbackSuccess:
            rollbackErrors.length ===
            0,

          rollbackErrors,

          detail:
            korpayData
        })
      }


      const paymentTid =
        String(
          korpayData.TID ||
          korpayData.tid ||
          ''
        ).trim()


      if (!paymentTid) {

        const rollbackErrors =
          await rollbackApprovedSplits()


        return res.status(502).json({
          success: false,

          message:
            '결제는 승인됐지만 코페이 TID를 받지 못했습니다.',

          rollbackSuccess:
            rollbackErrors.length ===
            0,

          rollbackErrors
        })
      }


      const approvalNumber =
        String(
          korpayData.APP_NO ||
          korpayData.app_no ||
          korpayData.approval_number ||
          korpayData.approvalNo ||
          ''
        ).trim() ||
        null


      const approvedAt =
        String(
          korpayData.APP_DATE ||
          korpayData.appDate ||
          ''
        ).trim() ||
        null


      const cardCompany =
        String(
          korpayData.VAN_ISS_CP_CD ||
          korpayData.cardCompany ||
          ''
        ).trim() ||
        null


      const resultCardNumber =
        String(
          korpayData.CARD_NO ||
          korpayData.cardNo ||
          ''
        ).trim() ||
        null


      approvedSplits.push({
        ordNo,

        mid:
          split.mid,

        amount:
          split.amount,

        tid:
          paymentTid,

        approvalNumber,

        approvedAt,

        cardCompany,

        cardNumber:
          resultCardNumber,

        response:
          korpayData
      })
    }


    /*
     * 모든 승인 성공 후
     * payments 한번에 저장
     */

    const normalizedBillingIds =
      Array.isArray(
        billingIds
      )
        ? billingIds
            .map(
              (id) =>
                Number(id)
            )
            .filter(
              (id) =>
                id > 0
            )
        : []


    const baseMessage =
      normalizedBillingIds.length > 0
        ? (
            '아카데미 정기결제 / 청구ID ' +
            normalizedBillingIds.join(',')
          )
        : String(
            goodsName ||
            '수기결제'
          ).trim()


    const paymentRows =
      approvedSplits.map(
        (
          approved,
          index
        ) => ({

          order_id:
            approved.ordNo,

          payment_key:
            approved.tid,

          pg_order_no:
            approved.ordNo,

          pg_mid:
            approved.mid,

          merchant_id:
            merchantDbId,

          merchant_name:
            merchant.merchant_name ||
            null,

          amount:
            approved.amount,

          status:
            'paid',

          pg_company:
            '코페이',

          payment_method:
            '수기결제',

          sender_name:
            String(
              buyerName ||
              ''
            ).trim() ||
            null,

          message:
            approvedSplits.length > 1
              ? (
                  baseMessage +
                  ' / 분할 ' +
                  (index + 1) +
                  '/' +
                  approvedSplits.length
                )
              : baseMessage,

          approval_number:
            approved.approvalNumber,

          card_number:
            approved.cardNumber,

          card_company:
            approved.cardCompany,

          installment_months:
            quotaMon ||
            '00',

          approved_at:
            new Date()
              .toISOString(),

          settlement_status:
            '정산대기',

          payout_status:
            '출금대기',

          duplicate_status:
            '정상'
        })
      )


      for (const paymentRow of paymentRows) {

        const paymentKey =
          String(
            paymentRow.payment_key || ''
          ).trim()
      
      
        const existingPaymentResponse =
          await fetch(
            `${supabaseUrl}/rest/v1/payments` +
              `?select=id` +
              `&payment_key=eq.${encodeURIComponent(paymentKey)}` +
              `&limit=1`,
            {
              method: 'GET',
              headers: supabaseHeaders
            }
          )
      
      
        const existingPaymentRows =
          await existingPaymentResponse.json()
      
      
        if (!existingPaymentResponse.ok) {
      
          console.error(
            '코페이 기존 결제 조회 실패:',
            existingPaymentRows
          )
      
      
          const rollbackErrors =
            await rollbackApprovedSplits()
      
      
          return res.status(500).json({
            success: false,
      
            message:
              '결제내역 확인 중 오류가 발생했습니다.',
      
            rollbackSuccess:
              rollbackErrors.length === 0,
      
            rollbackErrors
          })
        }
      
      
        const existingPayment =
          Array.isArray(existingPaymentRows) &&
          existingPaymentRows.length > 0
            ? existingPaymentRows[0]
            : null
      
      
        let paymentSaveResponse: Response
      
      
        if (existingPayment?.id) {
      
          /*
           * 코페이 Noti가 먼저 저장한 경우
           * 같은 TID 행을 새로 만들지 않고 업데이트
           */
          paymentSaveResponse =
            await fetch(
              `${supabaseUrl}/rest/v1/payments` +
                `?id=eq.${existingPayment.id}`,
              {
                method: 'PATCH',
      
                headers: {
                  ...supabaseHeaders,
                  Prefer: 'return=minimal'
                },
      
                body:
                  JSON.stringify(
                    paymentRow
                  )
              }
            )
      
        } else {
      
          /*
           * 아직 Noti 저장건이 없으면 신규 저장
           */
          paymentSaveResponse =
            await fetch(
              `${supabaseUrl}/rest/v1/payments`,
              {
                method: 'POST',
      
                headers: {
                  ...supabaseHeaders,
                  Prefer: 'return=minimal'
                },
      
                body:
                  JSON.stringify(
                    paymentRow
                  )
              }
            )
        }
      
      
        if (!paymentSaveResponse.ok) {

          const paymentSaveError =
            await paymentSaveResponse.text()

          /*
           * DB UNIQUE 충돌이 발생한 경우
           * 같은 payment_key 행을 찾아 기존 행에 병합한다.
           * 실제 승인건을 중복 저장 오류 때문에 취소하지 않는다.
           */
          if (
            paymentSaveResponse.status === 409 &&
            paymentKey
          ) {

            const conflictFindResponse =
              await fetch(
                `${supabaseUrl}/rest/v1/payments` +
                  `?select=id` +
                  `&payment_key=eq.${encodeURIComponent(paymentKey)}` +
                  `&limit=1`,
                {
                  method: 'GET',
                  headers: supabaseHeaders
                }
              )

            const conflictRows =
              await conflictFindResponse.json()

            const conflictPayment =
              Array.isArray(conflictRows) &&
              conflictRows.length > 0
                ? conflictRows[0]
                : null

            if (
              conflictFindResponse.ok &&
              conflictPayment?.id
            ) {

              const conflictMergeResponse =
                await fetch(
                  `${supabaseUrl}/rest/v1/payments` +
                    `?id=eq.${conflictPayment.id}`,
                  {
                    method: 'PATCH',

                    headers: {
                      ...supabaseHeaders,
                      Prefer: 'return=minimal'
                    },

                    body:
                      JSON.stringify(
                        paymentRow
                      )
                  }
                )

              if (conflictMergeResponse.ok) {

                console.log(
                  '코페이 중복 TID 충돌 병합 완료:',
                  paymentKey
                )

                continue
              }
            }
          }

          console.error(
            '코페이 분할결제 payments 저장 실패:',
            paymentSaveError
          )

          const rollbackErrors =
            await rollbackApprovedSplits()

          return res.status(500).json({
            success: false,

            message:
              '코페이 결제는 승인됐지만 결제내역 저장에 실패했습니다.',

            rollbackSuccess:
              rollbackErrors.length === 0,

            rollbackErrors,

            detail:
              paymentSaveError
          })
        }
      }


    const firstApproved =
      approvedSplits[0]


    return res.status(200).json({

      success:
        true,

      message:
        approvedSplits.length > 1
          ? (
              '총 ' +
              goodsAmt.toLocaleString() +
              '원이 ' +
              approvedSplits.length +
              '건으로 분할 승인되었습니다.'
            )
          : '결제가 승인되었습니다.',

      totalAmount:
        goodsAmt,

      splitCount:
        approvedSplits.length,

      orderId:
        firstApproved?.ordNo ||
        null,

      approvalNumber:
        firstApproved
          ?.approvalNumber ||
        null,

      approvedAt:
        firstApproved
          ?.approvedAt ||
        null,

      tid:
        firstApproved?.tid ||
        null,

      cardCompany:
        firstApproved
          ?.cardCompany ||
        null,

      usedMid:
        firstApproved?.mid ||
        null,

      splitPayments:
        approvedSplits.map(
          (
            approved,
            index
          ) => ({
            split:
              index + 1,

            amount:
              approved.amount,

            mid:
              approved.mid,

            orderId:
              approved.ordNo,

            tid:
              approved.tid,

            approvalNumber:
              approved.approvalNumber
          })
        )
    })  
  } catch (error) {
    console.error('Korpay manual payment error:', error)

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다.'
    })
  }
}