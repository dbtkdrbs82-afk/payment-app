import type { VercelRequest, VercelResponse } from '@vercel/node'

const BASE_URL = 'https://payment-app-ybtf.vercel.app'
const SWEEP_SELLER_ID = 'NXGSOFT01'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'GET 요청만 가능합니다.',
    })
  }

  const cronSecret = process.env.CRON_SECRET?.trim()

  if (!cronSecret) {
    return res.status(500).json({
      success: false,
      message: 'CRON_SECRET이 없습니다.',
    })
  }

  const authorization = String(
    req.headers.authorization || ''
  )

  if (authorization !== `Bearer ${cronSecret}`) {
    return res.status(401).json({
      success: false,
      message: '자동회수 실행 권한이 없습니다.',
    })
  }

  try {
    const balanceResponse = await fetch(
      `${BASE_URL}/api/toss-balance`
    )

    const balanceResponseText =
      await balanceResponse.text()

    let balanceResult: any

    try {
      balanceResult = JSON.parse(balanceResponseText)
    } catch {
      return res.status(500).json({
        success: false,
        message:
          '토스 잔액조회 API가 JSON이 아닌 응답을 반환했습니다.',
        requestUrl: `${BASE_URL}/api/toss-balance`,
        status: balanceResponse.status,
        responsePreview: balanceResponseText.slice(0, 300),
      })
    }

    if (!balanceResponse.ok || !balanceResult.success) {
      return res.status(500).json({
        success: false,
        message: '토스 잔액조회에 실패했습니다.',
        data: balanceResult,
      })
    }

    const availableAmount = Number(
        balanceResult?.data?.data?.availableAmount?.value || 0
      )

    console.log(
        'AUTO_SWEEP_BALANCE',
        availableAmount
      )

    if (
      !Number.isInteger(availableAmount) ||
      availableAmount < 0
    ) {
      return res.status(500).json({
        success: false,
        message: '회수 가능한 잔액 형식이 올바르지 않습니다.',
        data: balanceResult,
      })
    }

    if (availableAmount < 10000) {
        return res.status(200).json({
          success: true,
          swept: false,
          amount: availableAmount,
          minimumAmount: 10000,
          message: '회수 대상이 아닙니다. (1만원 이상부터 자동회수)',
        })
      }

    const sellerResponse = await fetch(
      `${BASE_URL}/api/toss-seller-get`
    )

    const sellerResponseText =
      await sellerResponse.text()

    let sellerResult: any

    try {
      sellerResult = JSON.parse(sellerResponseText)
    } catch {
      return res.status(500).json({
        success: false,
        message:
          '토스 셀러 조회 API가 JSON이 아닌 응답을 반환했습니다.',
        requestUrl: `${BASE_URL}/api/toss-seller-get`,
        status: sellerResponse.status,
        responsePreview: sellerResponseText.slice(0, 300),
      })
    }

    if (!sellerResponse.ok || !sellerResult.success) {
      return res.status(500).json({
        success: false,
        message: '토스 셀러 목록 조회에 실패했습니다.',
        data: sellerResult,
      })
    }

    const sellers =
      sellerResult?.data?.entityBody?.items || []

    const sweepSeller = sellers.find(
      (seller: any) =>
        String(seller.refSellerId || '').trim() ===
        SWEEP_SELLER_ID
    )

    console.log(
        'AUTO_SWEEP_SELLER',
        sweepSeller
      )

    if (!sweepSeller?.id) {
      return res.status(404).json({
        success: false,
        message:
          `${SWEEP_SELLER_ID} 회수용 셀러를 찾을 수 없습니다.`,
      })
    }

    if (sweepSeller.status !== 'APPROVED') {
      return res.status(400).json({
        success: false,
        message:
          `${SWEEP_SELLER_ID} 셀러가 지급가능 상태가 아닙니다.`,
        sellerStatus: sweepSeller.status,
      })
    }

    const now = new Date()

    const refPayoutId =
      'SWEEP-' +
      now.toISOString().replace(/\D/g, '').slice(0, 17) +
      '-' +
      availableAmount

    const payoutResponse = await fetch(
      `${BASE_URL}/api/toss-payout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination: sweepSeller.id,
          amount: availableAmount,
          transactionDescription: '잔액회수',
          refPayoutId,
        }),
      }
    )

    const payoutResponseText =
      await payoutResponse.text()

      console.log(
        'AUTO_SWEEP_PAYOUT',
        payoutResponse.status,
        payoutResponseText
      )

    let payoutResult: any

    try {
      payoutResult = JSON.parse(payoutResponseText)
    } catch {
      return res.status(500).json({
        success: false,
        message:
          '토스 지급 API가 JSON이 아닌 응답을 반환했습니다.',
        requestUrl: `${BASE_URL}/api/toss-payout`,
        status: payoutResponse.status,
        responsePreview: payoutResponseText.slice(0, 300),
      })
    }

    if (!payoutResponse.ok || !payoutResult.success) {
      return res.status(payoutResponse.status || 500).json({
        success: false,
        swept: false,
        amount: availableAmount,
        refPayoutId,
        message:
          payoutResult?.data?.error?.message ||
          payoutResult?.data?.message ||
          payoutResult?.message ||
          '잔액 자동회수 요청에 실패했습니다.',
        data: payoutResult,
      })
    }

    return res.status(200).json({
      success: true,
      swept: true,
      sellerId: SWEEP_SELLER_ID,
      destination: sweepSeller.id,
      amount: availableAmount,
      refPayoutId,
      message: '가상계좌 잔액 전액 회수 완료',
      data: payoutResult,
    })
  } catch (error) {
    console.error('가상계좌 잔액 자동회수 오류:', error)

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : '가상계좌 잔액 자동회수 중 오류가 발생했습니다.',
    })
  }
}