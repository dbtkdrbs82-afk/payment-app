import type {
    VercelRequest,
    VercelResponse
  } from '@vercel/node'
  
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
  
    const secretKey =
      process.env.TOSS_SECRET_KEY?.trim()
  
    if (!secretKey) {
      return res.status(500).json({
        success: false,
        message: '토스 Secret Key가 없습니다.'
      })
    }
  
    const {
      amount,
      orderId,
      orderName,
      type,
      customerIdentityNumber,
      taxFreeAmount
    } = req.body || {}
  
    const receiptAmount =
      Number(amount || 0)
  
    const cleanOrderId =
      String(orderId || '').trim()
  
    const cleanOrderName =
      String(orderName || '').trim()
  
    const cleanIdentityNumber =
      String(customerIdentityNumber || '')
        .replace(/[^0-9]/g, '')
  
    const receiptType =
      String(type || '').trim()
  
    const receiptTaxFreeAmount =
      Math.max(
        Number(taxFreeAmount || 0),
        0
      )
  
    if (
      !Number.isInteger(receiptAmount) ||
      receiptAmount <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: '결제금액을 정확히 입력해주세요.'
      })
    }
  
    if (
      cleanOrderId.length < 6 ||
      cleanOrderId.length > 64 ||
      !/^[A-Za-z0-9_-]+$/.test(cleanOrderId)
    ) {
      return res.status(400).json({
        success: false,
        message:
          '주문번호는 영문, 숫자, -, _ 조합의 6~64자여야 합니다.'
      })
    }
  
    if (
      !cleanOrderName ||
      cleanOrderName.length > 100
    ) {
      return res.status(400).json({
        success: false,
        message:
          '품목명은 1~100자로 입력해주세요.'
      })
    }
  
    if (
      receiptType !== '소득공제' &&
      receiptType !== '지출증빙'
    ) {
      return res.status(400).json({
        success: false,
        message:
          '현금영수증 구분을 선택해주세요.'
      })
    }
  
    if (!cleanIdentityNumber) {
      return res.status(400).json({
        success: false,
        message:
          receiptType === '지출증빙'
            ? '사업자등록번호를 입력해주세요.'
            : '휴대폰번호 또는 현금영수증 카드번호를 입력해주세요.'
      })
    }
  
    if (
      receiptType === '지출증빙' &&
      cleanIdentityNumber.length !== 10
    ) {
      return res.status(400).json({
        success: false,
        message:
          '사업자등록번호는 숫자 10자리여야 합니다.'
      })
    }
  
    if (receiptTaxFreeAmount > receiptAmount) {
      return res.status(400).json({
        success: false,
        message:
          '면세금액은 결제금액보다 클 수 없습니다.'
      })
    }
  
    const authorization =
      'Basic ' +
      Buffer.from(secretKey + ':')
        .toString('base64')
  
    try {
      const tossResponse = await fetch(
        'https://api.tosspayments.com/v1/cash-receipts',
        {
          method: 'POST',
          headers: {
            Authorization: authorization,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            amount: receiptAmount,
            orderId: cleanOrderId,
            orderName: cleanOrderName,
            type: receiptType,
            customerIdentityNumber:
              cleanIdentityNumber,
            taxFreeAmount:
              receiptTaxFreeAmount
          })
        }
      )
  
      const responseText =
        await tossResponse.text()
  
      let tossResult: any
  
      try {
        tossResult =
          JSON.parse(responseText)
      } catch {
        return res.status(500).json({
          success: false,
          message:
            '토스 현금영수증 API가 JSON이 아닌 응답을 반환했습니다.',
          status: tossResponse.status,
          responsePreview:
            responseText.slice(0, 300)
        })
      }
  
      if (!tossResponse.ok) {
        return res
          .status(tossResponse.status)
          .json({
            success: false,
            message:
              tossResult?.message ||
              '현금영수증 발급 요청에 실패했습니다.',
            code:
              tossResult?.code || '',
            data:
              tossResult
          })
      }
  
      return res.status(200).json({
        success: true,
        message:
          '현금영수증 발급 요청이 완료되었습니다.',
        data:
          tossResult
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : '현금영수증 발급 중 오류가 발생했습니다.'
      })
    }
  }

  