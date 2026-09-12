import './merchant-app.css'

import {
    createClient
  } from '@supabase/supabase-js'
  import {
    loadTossPayments
  } from '@tosspayments/payment-sdk'
  import QRCode from 'qrcode'

  const supabaseUrl = 'https://rnmptlxdeihvfwegoqnf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJubXB0bHhkZWlodmZ3ZWdvcW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MzcwMDMsImV4cCI6MjA5NDIxMzAwM30.5SeOiuZgFmU7RUu5kzLpLBUwC91SYI3WxqRFoafMrG8'

const supabase = createClient(supabaseUrl, supabaseKey)

const clientKey = 'live_ck_GjLJoQ1aVZ2QXB2vMWyPVw6KYe2R'

const apiBaseUrl =
  'https://payment-app-ybtf.vercel.app'

  function getKorpayEdiDate() {

    const now =
      new Date()
  
    const yyyy =
      String(
        now.getFullYear()
      )
  
    const MM =
      String(
        now.getMonth() + 1
      ).padStart(
        2,
        '0'
      )
  
    const dd =
      String(
        now.getDate()
      ).padStart(
        2,
        '0'
      )
  
    const HH =
      String(
        now.getHours()
      ).padStart(
        2,
        '0'
      )
  
    const mm =
      String(
        now.getMinutes()
      ).padStart(
        2,
        '0'
      )
  
    const ss =
      String(
        now.getSeconds()
      ).padStart(
        2,
        '0'
      )
  
    return (
      yyyy +
      MM +
      dd +
      HH +
      mm +
      ss
    )
  }
  
  
  async function createKorpayHash(
    merchantId: string,
    ediDate: string,
    amount: number,
    mKey: string
  ) {
  
    const text =
      merchantId +
      ediDate +
      String(amount) +
      mKey
  
    const encoder =
      new TextEncoder()
  
    const data =
      encoder.encode(
        text
      )
  
    const hashBuffer =
      await crypto.subtle.digest(
        'SHA-256',
        data
      )
  
    const hashArray =
      Array.from(
        new Uint8Array(
          hashBuffer
        )
      )
  
    return hashArray
      .map(
        (byte) =>
          byte
            .toString(16)
            .padStart(2, '0')
      )
      .join('')
  }

const app =
  document.querySelector<HTMLDivElement>('#app')!

const path =
  window.location.pathname

const merchantLoginKeys = [
  'login_merchant_id',
  'login_merchant_code',
  'login_merchant_name',
  'login_merchant_type'
]

/* =========================================
   무선단말기 모바일
========================================= */

async function renderMerchantWirelessTerminal() {

  const merchantId =
    sessionStorage.getItem(
      'login_merchant_id'
    ) ||
    localStorage.getItem(
      'login_merchant_id'
    )

  if (!merchantId) {
    location.replace(
      '/merchant-app'
    )
    return
  }


  const merchantName =
    sessionStorage.getItem(
      'login_merchant_name'
    ) ||
    localStorage.getItem(
      'login_merchant_name'
    ) ||
    '가맹점'


  const getLocalDateValue =
    (date: Date) => {

      const year =
        date.getFullYear()

      const month =
        String(
          date.getMonth() + 1
        ).padStart(2, '0')

      const day =
        String(
          date.getDate()
        ).padStart(2, '0')

      return (
        year +
        '-' +
        month +
        '-' +
        day
      )
    }


  const today =
    getLocalDateValue(
      new Date()
    )


  const dateParams =
    new URLSearchParams(
      window.location.search
    )


  const selectedStartDate =
    dateParams.get(
      'terminal_start_date'
    ) || today


  const selectedEndDate =
    dateParams.get(
      'terminal_end_date'
    ) || today


  const {
    data: terminalPayments,
    error: terminalPaymentError
  } =
    await supabase
      .from('payments')
      .select(`
        id,
        created_at,
        approved_at,
        canceled_at,
        approval_number,
        order_id,
        payment_key,
        amount,
        settlement_amount,
        status,
        payout_status,
        settlement_status,
        pg_company
      `)
      .eq(
        'merchant_id',
        merchantId
      )
      .order(
        'created_at',
        {
          ascending: false
        }
      )
      .limit(500)


  if (terminalPaymentError) {
    console.error(
      '무선단말기 거래내역 조회 실패:',
      terminalPaymentError
    )
  }


  const allPayments =
    terminalPayments || []


  const selectedDatePayments =
    allPayments.filter(
      (payment: any) => {

        const dateText =
          payment.status === 'cancel'
            ? (
                payment.canceled_at ||
                payment.approved_at ||
                payment.created_at
              )
            : (
                payment.approved_at ||
                payment.created_at
              )

        if (!dateText) {
          return false
        }

        const paymentDate =
          getLocalDateValue(
            new Date(dateText)
          )

        return (
          paymentDate >=
            selectedStartDate &&
          paymentDate <=
            selectedEndDate
        )
      }
    )


  const paidPayments =
    selectedDatePayments.filter(
      (payment: any) =>
        payment.status === 'paid'
    )


  const cancelPayments =
    selectedDatePayments.filter(
      (payment: any) =>
        payment.status === 'cancel'
    )


  const approvedAmount =
    paidPayments.reduce(
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


  const canceledAmount =
    cancelPayments.reduce(
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


  const netAmount =
    approvedAmount -
    canceledAmount


  /* =========================================
     정산일 계산
  ========================================= */

  const {
    data: settlementMerchant
  } =
    await supabase
      .from('merchants')
      .select(
        'settlement_cycle'
      )
      .eq(
        'id',
        merchantId
      )
      .single()


  const settlementCycle =
    String(
      settlementMerchant
        ?.settlement_cycle ||
      '1일'
    )


  const {
    data: holidayData
  } =
    await supabase
      .from('holidays')
      .select(
        'holiday_date'
      )


  const holidaySet =
    new Set(
      (holidayData || [])
        .map(
          (holiday: any) =>
            String(
              holiday.holiday_date
            )
        )
    )


  const getPayoutDate =
    (
      createdAt: string
    ) => {

      const payoutDate =
        new Date(createdAt)


      const cycleMatch =
        settlementCycle.match(
          /\d+/
        )


      const cycleDays =
        cycleMatch
          ? Number(
              cycleMatch[0]
            )
          : 1


      let addedDays = 0


      while (
        addedDays <
        cycleDays
      ) {

        payoutDate.setDate(
          payoutDate.getDate() + 1
        )


        const dateValue =
          getLocalDateValue(
            payoutDate
          )


        const day =
          payoutDate.getDay()


        const isWeekend =
          day === 0 ||
          day === 6


        const isHoliday =
          holidaySet.has(
            dateValue
          )


        if (
          isWeekend ||
          isHoliday
        ) {
          continue
        }


        addedDays += 1
      }


      return getLocalDateValue(
        payoutDate
      )
    }


  const settlementPayments =
    allPayments.filter(
      (payment: any) => {

        if (
          payment.status !==
          'paid'
        ) {
          return false
        }


        const dateText =
          payment.approved_at ||
          payment.created_at


        if (!dateText) {
          return false
        }


        const payoutDate =
          getPayoutDate(
            dateText
          )


        return (
          payoutDate >=
            selectedStartDate &&
          payoutDate <=
            selectedEndDate
        )
      }
    )


  const settlementAmount =
    settlementPayments.reduce(
      (
        sum: number,
        payment: any
      ) =>
        sum +
        Number(
          payment
            .settlement_amount ||
          0
        ),
      0
    )

    const terminalSettlementPaymentDates =
    settlementPayments
      .map(
        (payment: any) => {

          const dateText =
            payment.approved_at ||
            payment.created_at

          if (!dateText) {
            return ''
          }

          return getLocalDateValue(
            new Date(dateText)
          )
        }
      )
      .filter(Boolean)
      .sort()


  let terminalSettlementPaymentDateLabel =
    ''


  if (
    terminalSettlementPaymentDates.length > 0
  ) {

    const firstDate =
      terminalSettlementPaymentDates[0]

    const lastDate =
      terminalSettlementPaymentDates[
        terminalSettlementPaymentDates.length - 1
      ]


    const formatShortDate =
      (dateValue: string) => {

        const [
          year,
          month,
          day
        ] =
          dateValue.split('-')

        return (
          year.slice(2) +
          '.' +
          month +
          '.' +
          day
        )
      }


    terminalSettlementPaymentDateLabel =
      firstDate === lastDate
        ? formatShortDate(
            firstDate
          )
        : (
            formatShortDate(
              firstDate
            ) +
            '~' +
            formatShortDate(
              lastDate
            )
          )
  }

    const page =
    Math.max(
      1,
      Number(
        dateParams.get(
          'terminal_page'
        ) || 1
      )
    )


  const pageSize =
    Math.max(
      1,
      Number(
        dateParams.get(
          'terminal_page_size'
        ) || 10
      )
    )


  const totalPages =
    Math.max(
      1,
      Math.ceil(
        selectedDatePayments.length /
        pageSize
      )
    )


  const safePage =
    Math.min(
      page,
      totalPages
    )


  const startIndex =
    (safePage - 1) *
    pageSize


  const pagedPayments =
    selectedDatePayments.slice(
      startIndex,
      startIndex +
      pageSize
    )


  const getStatusText =
    (status: string) => {

      if (status === 'paid') {
        return '승인'
      }

      if (status === 'cancel') {
        return '취소'
      }

      if (status === 'ready') {
        return '대기'
      }

      return status || '-'
    }


  const getDateText =
    (payment: any) => {

      const dateText =
        payment.status === 'cancel'
          ? (
              payment.canceled_at ||
              payment.approved_at ||
              payment.created_at
            )
          : (
              payment.approved_at ||
              payment.created_at
            )

      if (!dateText) {
        return '-'
      }

      return new Date(
        dateText
      ).toLocaleString(
        'ko-KR'
      )
    }

  app.innerHTML = `
    <div class="merchant-mobile-home">

      <header class="merchant-mobile-header">

        <div>

          <div class="merchant-mobile-brand">
            NXG PICK
          </div>

          <div class="merchant-mobile-store">
            ${merchantName}
          </div>

        </div>

        <button
          id="merchant-mobile-logout"
          class="merchant-mobile-logout"
          type="button"
        >
          로그아웃
        </button>

      </header>


      <main class="merchant-mobile-content">

        <section class="merchant-mobile-welcome">

          <div class="merchant-mobile-welcome-label">
            무선단말기
          </div>

          <h1>
            거래내역
          </h1>

          <div class="merchant-mobile-type">
            ${merchantName}
          </div>

        </section>


        <section class="terminal-mobile-date">

          <div class="terminal-mobile-date-inputs">

            <input
              type="date"
              id="terminal-mobile-start-date"
              value="${selectedStartDate}"
            />

            <span>
              ~
            </span>

            <input
              type="date"
              id="terminal-mobile-end-date"
              value="${selectedEndDate}"
            />

          </div>


          <div class="terminal-mobile-date-buttons">

            <button
              id="terminal-mobile-prev"
              type="button"
            >
              이전
            </button>

            <button
              id="terminal-mobile-today"
              type="button"
            >
              오늘
            </button>

            <button
              id="terminal-mobile-next"
              type="button"
            >
              다음
            </button>

            <button
              id="terminal-mobile-month"
              type="button"
            >
              당월
            </button>

            <button
              id="terminal-mobile-search"
              type="button"
            >
              조회
            </button>

          </div>

        </section>


        <section class="terminal-mobile-dashboard">

          <div class="terminal-mobile-card">

            <span>
              총매출
            </span>

            <strong>
              ${approvedAmount.toLocaleString()}원
            </strong>

            <small>
              승인 ${paidPayments.length.toLocaleString()}건
            </small>

          </div>


          <div class="terminal-mobile-card">

            <span>
              취소금액
            </span>

            <strong>
              ${canceledAmount.toLocaleString()}원
            </strong>

            <small>
              취소 ${cancelPayments.length.toLocaleString()}건
            </small>

          </div>


          <div class="terminal-mobile-card">

            <span>
              순매출
            </span>

            <strong>
              ${netAmount.toLocaleString()}원
            </strong>

            <small>
              총 거래 ${selectedDatePayments.length.toLocaleString()}건
            </small>

          </div>


          <div class="terminal-mobile-card">

            <span>
              정산금액
            </span>

            <strong>
              ${settlementAmount.toLocaleString()}원
            </strong>

            <small
  style="
    display:block;
    margin-top:5px;
    color:#d93025;
    font-weight:700;
  "
>
  정산대상 ${settlementPayments.length.toLocaleString()}건${
    terminalSettlementPaymentDateLabel
      ? ' · ' +
        terminalSettlementPaymentDateLabel +
        ' 결제건'
      : ''
  }
</small>

          </div>

        </section>

                <section class="terminal-mobile-history">

          <div class="terminal-mobile-history-top">

            <strong>
              거래내역
            </strong>

            <select
              id="terminal-mobile-page-size"
            >
              <option
                value="10"
                ${pageSize === 10 ? 'selected' : ''}
              >
                10개씩
              </option>

              <option
                value="20"
                ${pageSize === 20 ? 'selected' : ''}
              >
                20개씩
              </option>

              <option
                value="50"
                ${pageSize === 50 ? 'selected' : ''}
              >
                50개씩
              </option>

            </select>

          </div>


          <div class="terminal-mobile-history-list">

            ${
              pagedPayments.length === 0

                ? `
                  <div class="terminal-mobile-empty">
                    등록된 무선단말기 거래내역이 없습니다.
                  </div>
                `

                : pagedPayments
                    .map(
                      (payment: any) => `

                        <div class="terminal-mobile-history-card">

                          <div class="terminal-mobile-history-head">

                            <strong>
                              ${Number(
                                payment.amount || 0
                              ).toLocaleString()}원
                            </strong>

                            <span
                              class="${
                                payment.status === 'cancel'
                                  ? 'cancel'
                                  : 'paid'
                              }"
                            >
                              ${getStatusText(
                                payment.status
                              )}
                            </span>

                          </div>


                          <div class="terminal-mobile-history-row">

                            <span>
                              거래일시
                            </span>

                            <strong>
                              ${getDateText(
                                payment
                              )}
                            </strong>

                          </div>


                          <div class="terminal-mobile-history-row">

                            <span>
                              승인번호
                            </span>

                            <strong>
                              ${
                                payment.approval_number ||
                                '-'
                              }
                            </strong>

                          </div>


                          <div class="terminal-mobile-history-row">

                            <span>
                              거래번호
                            </span>

                            <strong>
                              ${
                                payment.order_id ||
                                payment.payment_key ||
                                '-'
                              }
                            </strong>

                          </div>


                          <div class="terminal-mobile-history-row">

                            <span>
                              정산상태
                            </span>

                            <strong>
                              ${
                                payment.payout_status ||
                                payment.settlement_status ||
                                '정산대기'
                              }
                            </strong>

                          </div>

                        </div>

                      `
                    )
                    .join('')
            }

          </div>


          <div class="terminal-mobile-pagination">

            <button
              id="terminal-mobile-page-prev"
              type="button"
              ${safePage <= 1 ? 'disabled' : ''}
            >
              이전
            </button>

            <strong>
              ${safePage} / ${totalPages}
            </strong>

            <button
              id="terminal-mobile-page-next"
              type="button"
              ${safePage >= totalPages ? 'disabled' : ''}
            >
              다음
            </button>

          </div>

        </section>

      </main>

    </div>
  `


  const moveDate =
    (
      dateText: string,
      amount: number
    ) => {

      const date =
        new Date(
          dateText +
          'T00:00:00'
        )

      date.setDate(
        date.getDate() +
        amount
      )

      return getLocalDateValue(
        date
      )
    }


  const applyDate =
    (
      startDate: string,
      endDate: string
    ) => {

      const params =
        new URLSearchParams(
          window.location.search
        )

      params.set(
        'terminal_start_date',
        startDate
      )

      params.set(
        'terminal_end_date',
        endDate
      )

      location.href =
        window.location.pathname +
        '?' +
        params.toString()
    }


  document
    .querySelector(
      '#terminal-mobile-search'
    )
    ?.addEventListener(
      'click',
      () => {

        const startInput =
          document.querySelector<HTMLInputElement>(
            '#terminal-mobile-start-date'
          )

        const endInput =
          document.querySelector<HTMLInputElement>(
            '#terminal-mobile-end-date'
          )

        if (
          !startInput?.value ||
          !endInput?.value
        ) {
          return
        }

        applyDate(
          startInput.value,
          endInput.value
        )
      }
    )


  document
    .querySelector(
      '#terminal-mobile-today'
    )
    ?.addEventListener(
      'click',
      () => {

        applyDate(
          today,
          today
        )
      }
    )


  document
    .querySelector(
      '#terminal-mobile-prev'
    )
    ?.addEventListener(
      'click',
      () => {

        applyDate(
          moveDate(
            selectedStartDate,
            -1
          ),
          moveDate(
            selectedEndDate,
            -1
          )
        )
      }
    )


  document
    .querySelector(
      '#terminal-mobile-next'
    )
    ?.addEventListener(
      'click',
      () => {

        applyDate(
          moveDate(
            selectedStartDate,
            1
          ),
          moveDate(
            selectedEndDate,
            1
          )
        )
      }
    )


  document
    .querySelector(
      '#terminal-mobile-month'
    )
    ?.addEventListener(
      'click',
      () => {

        const now =
          new Date()

        const monthStart =
          new Date(
            now.getFullYear(),
            now.getMonth(),
            1
          )

        const monthEnd =
          new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            0
          )

        applyDate(
          getLocalDateValue(
            monthStart
          ),
          getLocalDateValue(
            monthEnd
          )
        )
      }
    )

    document
    .querySelector(
      '#terminal-mobile-page-prev'
    )
    ?.addEventListener(
      'click',
      () => {

        const params =
          new URLSearchParams(
            window.location.search
          )

        params.set(
          'terminal_page',
          String(
            Math.max(
              1,
              safePage - 1
            )
          )
        )

        location.href =
          window.location.pathname +
          '?' +
          params.toString()
      }
    )


  document
    .querySelector(
      '#terminal-mobile-page-next'
    )
    ?.addEventListener(
      'click',
      () => {

        const params =
          new URLSearchParams(
            window.location.search
          )

        params.set(
          'terminal_page',
          String(
            Math.min(
              totalPages,
              safePage + 1
            )
          )
        )

        location.href =
          window.location.pathname +
          '?' +
          params.toString()
      }
    )


  document
    .querySelector(
      '#terminal-mobile-page-size'
    )
    ?.addEventListener(
      'change',
      (event) => {

        const select =
          event.target as HTMLSelectElement

        const params =
          new URLSearchParams(
            window.location.search
          )

        params.set(
          'terminal_page_size',
          select.value
        )

        params.set(
          'terminal_page',
          '1'
        )

        location.href =
          window.location.pathname +
          '?' +
          params.toString()
      }
    )


  

  document
    .querySelector(
      '#merchant-mobile-logout'
    )
    ?.addEventListener(
      'click',
      () => {

        merchantLoginKeys.forEach(
          (key) => {

            sessionStorage
              .removeItem(key)

            localStorage
              .removeItem(key)

          }
        )

        location.replace(
          '/merchant-app'
        )
      }
    )
}

/* =========================================
   모바일 홈
========================================= */

function renderMerchantHome() {

  const merchantId =
    sessionStorage.getItem(
      'login_merchant_id'
    ) ||
    localStorage.getItem(
      'login_merchant_id'
    )

  if (!merchantId) {
    location.replace(
      '/merchant-app'
    )
    return
  }


  merchantLoginKeys.forEach(
    (key) => {

      if (
        !sessionStorage.getItem(key)
      ) {

        const savedValue =
          localStorage.getItem(key)

        if (savedValue !== null) {
          sessionStorage.setItem(
            key,
            savedValue
          )
        }

      }

    }
  )


  const merchantName =
    sessionStorage.getItem(
      'login_merchant_name'
    ) || '가맹점'

    const merchantType =
    sessionStorage.getItem(
      'login_merchant_type'
    ) ||
    localStorage.getItem(
      'login_merchant_type'
    ) ||
    '일반매장'


  const isNormalStore =
    merchantType === '일반매장'

  const isWirelessTerminal =
    merchantType === '무선단말기'

  const isAcademy =
    merchantType === '아카데미'

  const isBeauty =
    merchantType === '뷰티'

  const isHotel =
    merchantType === '호텔'


  if (isWirelessTerminal) {
    void renderMerchantWirelessTerminal()
    return
  }

  let merchantHomeMenu = ''


  if (isNormalStore) {

    merchantHomeMenu = `
      <button
        type="button"
        class="merchant-mobile-menu-card"
        data-menu="orders"
      >
        <span class="merchant-mobile-menu-icon">📋</span>
        <strong>주문관리</strong>
        <small>주문 및 결제내역 관리</small>
      </button>

      <button
        type="button"
        class="merchant-mobile-menu-card"
        data-menu="products"
      >
        <span class="merchant-mobile-menu-icon">🛍️</span>
        <strong>상품관리</strong>
        <small>상품 등록 및 수정</small>
      </button>

      <button
        type="button"
        class="merchant-mobile-menu-card"
        data-menu="qr"
      >
        <span class="merchant-mobile-menu-icon">📱</span>
        <strong>PICK QR</strong>
        <small>가맹점 QR 확인 및 관리</small>
      </button>

      <button
        type="button"
        class="merchant-mobile-menu-card"
        data-menu="card"
      >
        <span class="merchant-mobile-menu-icon">💳</span>
        <strong>카드결제</strong>
        <small>OCR · 수기 · 현금영수증</small>
      </button>
    `

  } else if (isAcademy) {

    merchantHomeMenu = `
      <button type="button" class="merchant-mobile-menu-card" data-menu="members">
        <span class="merchant-mobile-menu-icon">👥</span>
        <strong>회원관리</strong>
        <small>회원 등록 및 관리</small>
      </button>

      <button type="button" class="merchant-mobile-menu-card" data-menu="billings">
        <span class="merchant-mobile-menu-icon">🧾</span>
        <strong>청구관리</strong>
        <small>청구 및 납부 관리</small>
      </button>

      <button type="button" class="merchant-mobile-menu-card" data-menu="academy-card">
        <span class="merchant-mobile-menu-icon">💳</span>
        <strong>수기결제</strong>
<small>일괄 수기결제</small>
      </button>

      <button type="button" class="merchant-mobile-menu-card" data-menu="academy-payments">
        <span class="merchant-mobile-menu-icon">📋</span>
        <strong>결제내역</strong>
        <small>결제 및 취소내역</small>
      </button>
    `

  } else if (isBeauty) {

    merchantHomeMenu = `
      <button type="button" class="merchant-mobile-menu-card" data-menu="beauty-orders">
        <span class="merchant-mobile-menu-icon">📋</span>
        <strong>주문관리</strong>
        <small>예약 및 결제내역</small>
      </button>

      <button type="button" class="merchant-mobile-menu-card" data-menu="beauty-staff">
        <span class="merchant-mobile-menu-icon">👤</span>
        <strong>직원관리</strong>
        <small>직원 및 서비스 관리</small>
      </button>

      <button type="button" class="merchant-mobile-menu-card" data-menu="beauty-products">
        <span class="merchant-mobile-menu-icon">✂️</span>
        <strong>서비스관리</strong>
        <small>서비스 등록 및 수정</small>
      </button>

      <button type="button" class="merchant-mobile-menu-card" data-menu="beauty-hours">
        <span class="merchant-mobile-menu-icon">🕒</span>
        <strong>영업시간</strong>
        <small>영업시간 및 스케줄</small>
      </button>

      <button type="button" class="merchant-mobile-menu-card" data-menu="qr">
        <span class="merchant-mobile-menu-icon">📱</span>
        <strong>PICK QR</strong>
        <small>가맹점 QR 확인 및 관리</small>
      </button>

      <button type="button" class="merchant-mobile-menu-card" data-menu="card">
        <span class="merchant-mobile-menu-icon">💳</span>
        <strong>카드결제</strong>
        <small>카드 결제 관리</small>
      </button>
    `

  } else if (isHotel) {

    merchantHomeMenu = `
      <button type="button" class="merchant-mobile-menu-card" data-menu="hotel-orders">
        <span class="merchant-mobile-menu-icon">📋</span>
        <strong>주문/결제내역</strong>
        <small>객실 주문 및 결제내역</small>
      </button>

      <button type="button" class="merchant-mobile-menu-card" data-menu="hotel-products">
        <span class="merchant-mobile-menu-icon">🛍️</span>
        <strong>상품관리</strong>
        <small>호텔 상품 관리</small>
      </button>

      <button type="button" class="merchant-mobile-menu-card" data-menu="hotel-rooms">
        <span class="merchant-mobile-menu-icon">🏨</span>
        <strong>객실관리</strong>
        <small>객실 등록 및 관리</small>
      </button>

      <button type="button" class="merchant-mobile-menu-card" data-menu="hotel-preview">
        <span class="merchant-mobile-menu-icon">📱</span>
        <strong>고객 결제창</strong>
        <small>호텔 고객 결제창</small>
      </button>

      <button type="button" class="merchant-mobile-menu-card" data-menu="card">
        <span class="merchant-mobile-menu-icon">💳</span>
        <strong>카드결제</strong>
        <small>카드 결제 관리</small>
      </button>
    `

  }

  app.innerHTML = `
    <div class="merchant-mobile-home">

      <header class="merchant-mobile-header">

        <div>
          <div class="merchant-mobile-brand">
            NXG PICK
          </div>

          <div class="merchant-mobile-store">
            ${merchantName}
          </div>
        </div>

        <button
          id="merchant-mobile-logout"
          class="merchant-mobile-logout"
          type="button"
        >
          로그아웃
        </button>

      </header>


      <main class="merchant-mobile-content">

        <section class="merchant-mobile-welcome">

          <div class="merchant-mobile-welcome-label">
            가맹점 모바일
          </div>

          <h1>
            ${merchantName}
          </h1>

          <div class="merchant-mobile-type">
            ${merchantType}
          </div>

        </section>


                <section class="merchant-mobile-menu">
          ${merchantHomeMenu}
        </section>

      </main>

    </div>
  `


  document
    .querySelector(
      '#merchant-mobile-logout'
    )
    ?.addEventListener(
      'click',
      () => {

        merchantLoginKeys.forEach(
          (key) => {

            sessionStorage.removeItem(key)
            localStorage.removeItem(key)

          }
        )

        location.replace(
          '/merchant-app'
        )

      }
    )
    document
    .querySelector(
      '.merchant-mobile-menu'
    )
    ?.addEventListener(
      'click',
      (event) => {

        const button =
          (
            event.target as HTMLElement
          ).closest<HTMLButtonElement>(
            '[data-menu]'
          )

        if (!button) {
          return
        }

        const menu =
          button.dataset.menu || ''


        const menuRoutes:
          Record<string, string> = {

            orders:
              '/merchant-app/orders',

            products:
              '/merchant-app/products',

            qr:
              '/merchant-app/qr',

            card:
              '/merchant-app/card',


              members:
              '/merchant-members',
            
            billings:
              '/merchant-billings',
            
            'academy-card':
              '/merchant-batch',
            
            'academy-payments':
              '/merchant-academy-payments',


            'beauty-orders':
              '/merchant-app/beauty/orders',

            'beauty-staff':
              '/merchant-app/beauty/staff',

            'beauty-products':
              '/merchant-app/beauty/products',

            'beauty-hours':
              '/merchant-app/beauty/hours',


            'hotel-orders':
              '/merchant-app/hotel/orders',

            'hotel-products':
              '/merchant-app/hotel/products',

            'hotel-rooms':
              '/merchant-app/hotel/rooms',

            'hotel-preview':
              '/merchant-app/hotel/preview'
          }


        const targetRoute =
          menuRoutes[menu]


        if (!targetRoute) {
          return
        }


        location.href =
          targetRoute
      }
    )
  }
/* =========================================
   모바일 주문관리
========================================= */

async function renderMerchantOrders() {

    const merchantIdText =
      sessionStorage.getItem(
        'login_merchant_id'
      ) ||
      localStorage.getItem(
        'login_merchant_id'
      )
  
    if (!merchantIdText) {
      location.replace(
        '/merchant-app'
      )
      return
    }
  
    const merchantId =
      Number(merchantIdText)
  
    const merchantName =
      sessionStorage.getItem(
        'login_merchant_name'
      ) ||
      localStorage.getItem(
        'login_merchant_name'
      ) ||
      '가맹점'
  
  
    const params =
      new URLSearchParams(
        location.search
      )
  
  
    const getKoreaDate = (
      date: Date
    ) => {
  
      return new Intl.DateTimeFormat(
        'en-CA',
        {
          timeZone: 'Asia/Seoul',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }
      ).format(date)
    }
  
  
    const todayDate =
  getKoreaDate(new Date())

const startDate =
  params.get('start') ||
  todayDate

const endDate =
  params.get('end') ||
  todayDate
  
  
  const startIso =
  new Date(
    startDate +
    'T00:00:00+09:00'
  ).toISOString()

const endIso =
  new Date(
    endDate +
    'T23:59:59.999+09:00'
  ).toISOString()
  
  
    app.innerHTML = `
      <div class="merchant-mobile-home">
  
        <header class="merchant-mobile-header">
  
          <div>
            <div class="merchant-mobile-brand">
              NXG PICK
            </div>
  
            <div class="merchant-mobile-store">
              ${merchantName}
            </div>
          </div>
  
          <button
            id="mobile-order-home"
            class="merchant-mobile-logout"
            type="button"
          >
            홈
          </button>
  
        </header>
  
  
        <main class="merchant-mobile-content">
  
          <div class="merchant-mobile-page-title">
            <h1>주문관리</h1>
  
            <span>
              주문접수
            </span>
          </div>
  
  
          <div class="merchant-mobile-date-nav">

  <button
    id="mobile-order-prev"
    type="button"
  >
    이전
  </button>

  <button
    id="mobile-order-today"
    type="button"
  >
    오늘
  </button>

  <button
    id="mobile-order-next"
    type="button"
  >
    다음
  </button>

  <button
    id="mobile-order-month"
    type="button"
  >
    당월
  </button>

</div>


<div class="merchant-mobile-date-range">

  <div>
    <label>시작일</label>

    <input
      id="mobile-order-start-date"
      type="date"
      value="${startDate}"
    >
  </div>

  <div>
    <label>종료일</label>

    <input
      id="mobile-order-end-date"
      type="date"
      value="${endDate}"
    >
  </div>
</div>

          <div
            id="mobile-order-summary"
            class="merchant-mobile-order-summary"
          >
            주문을 불러오는 중입니다.
          </div>
  
          <div class="merchant-mobile-order-filter">

  <button type="button" data-status="전체">
    전체
  </button>

  <button type="button" data-status="접수">
    접수
  </button>

  <button type="button" data-status="완료">
    완료
  </button>

  <button type="button" data-status="취소요청">
    취소요청
  </button>

  <button type="button" data-status="취소완료">
    취소완료
  </button>

</div>
  
          <div
            id="mobile-order-list"
            class="merchant-mobile-order-list"
          ></div>

          <div
  id="mobile-order-pagination"
  class="merchant-mobile-order-pagination"
></div>
  
        </main>
  
      </div>
    `
  
  
    document
      .querySelector(
        '#mobile-order-home'
      )
      ?.addEventListener(
        'click',
        () => {
          location.href =
            '/merchant-app/home'
        }
      )
  
  
      const moveDateRange = (
        amount: number
      ) => {
      
        const start =
          new Date(
            startDate +
            'T00:00:00+09:00'
          )
      
        const end =
          new Date(
            endDate +
            'T00:00:00+09:00'
          )
      
        start.setDate(
          start.getDate() + amount
        )
      
        end.setDate(
          end.getDate() + amount
        )
      
        location.href =
          '/merchant-app/orders?start=' +
          getKoreaDate(start) +
          '&end=' +
          getKoreaDate(end)
      }
      
      
      document
        .querySelector(
          '#mobile-order-prev'
        )
        ?.addEventListener(
          'click',
          () => {
            moveDateRange(-1)
          }
        )
      
      
      document
        .querySelector(
          '#mobile-order-today'
        )
        ?.addEventListener(
          'click',
          () => {
      
            const today =
              getKoreaDate(
                new Date()
              )
      
            location.href =
              '/merchant-app/orders?start=' +
              today +
              '&end=' +
              today
          }
        )
      
      
      document
        .querySelector(
          '#mobile-order-next'
        )
        ?.addEventListener(
          'click',
          () => {
            moveDateRange(1)
          }
        )
      
      
      document
        .querySelector(
          '#mobile-order-month'
        )
        ?.addEventListener(
          'click',
          () => {
      
            const today =
              getKoreaDate(
                new Date()
              )
      
            const monthStart =
              today.slice(0, 7) +
              '-01'
      
            location.href =
              '/merchant-app/orders?start=' +
              monthStart +
              '&end=' +
              today
          }
        )
      
      
      const autoSearchOrderDate = () => {
      
        const startInput =
          document.querySelector<HTMLInputElement>(
            '#mobile-order-start-date'
          )
      
        const endInput =
          document.querySelector<HTMLInputElement>(
            '#mobile-order-end-date'
          )
      
        const selectedStart =
          startInput?.value || ''
      
        const selectedEnd =
          endInput?.value || ''
      
        if (
          !selectedStart ||
          !selectedEnd
        ) {
          return
        }
      
        if (
          selectedStart >
          selectedEnd
        ) {
          return
        }
      
        location.href =
          '/merchant-app/orders?start=' +
          selectedStart +
          '&end=' +
          selectedEnd
      }
      
      
      document
        .querySelector(
          '#mobile-order-start-date'
        )
        ?.addEventListener(
          'change',
          autoSearchOrderDate
        )
      
      
        document
        .querySelector(
          '#mobile-order-end-date'
        )
        ?.addEventListener(
          'change',
          autoSearchOrderDate
        )

        const [
            orderResult,
            merchantResult,
            paymentResult
          ] =
            await Promise.all([
  
        supabase
          .from('orders')
          .select('*')
          .eq(
            'merchant_id',
            merchantId
          )
          .gte(
            'created_at',
            startIso
          )
          .lte(
            'created_at',
            endIso
          )
          .order(
            'created_at',
            {
              ascending: false
            }
          ),
  
          supabase
          .from('merchants')
          .select(`
            voice_enabled,
            call_message,
            merchant_name,
            owner_name,
            business_number,
            corporate_number,
            phone,
            address,
            address_detail,
            toss_mid,
            korpay_mid
          `)
          .eq(
            'id',
            merchantId
          )
          .maybeSingle(),
        
        supabase
          .from('payments')
          .select(`
            id,
            order_id,
            payment_key,
            amount,
            settlement_amount,
            approval_number,
            card_number,
            card_company,
            pg_company,
            approved_at,
            created_at,
            status,
            canceled_at
          `)
          .eq(
            'merchant_id',
            merchantId
          )
          .gte(
            'created_at',
            startIso
          )
          .lte(
            'created_at',
            endIso
          )
  
      ])
  
  
    const orderList =
      document.querySelector<HTMLDivElement>(
        '#mobile-order-list'
      )
  
    const summary =
      document.querySelector<HTMLDivElement>(
        '#mobile-order-summary'
      )
  
    if (!orderList || !summary) {
      return
    }
  
  
    if (orderResult.error) {
  
      summary.textContent =
        '주문 조회 실패'
  
      orderList.innerHTML = `
        <div class="merchant-mobile-order-empty">
          ${orderResult.error.message}
        </div>
      `
  
      return
    }
  
  
    const orders =
  orderResult.data || []


const selectedStatus =
  params.get('status') ||
  '전체'


const requestedPage =
  Math.max(
    1,
    Number(
      params.get('page') || 1
    )
  )


const pageSize =
  Math.max(
    1,
    Number(
      params.get('size') || 10
    )
  )


const getOrderStatus = (
  order: any
) => {

  if (
    order.cancel_status ===
    '취소요청'
  ) {
    return '취소요청'
  }

  if (
    order.order_status ===
    '취소완료' ||
    order.cancel_status ===
    '취소완료'
  ) {
    return '취소완료'
  }

  if (
    order.order_status ===
    '완료'
  ) {
    return '완료'
  }

  return '접수'
}


const filteredOrders =
  selectedStatus === '전체'
    ? orders
    : orders.filter(
        (order: any) =>
          getOrderStatus(order) ===
          selectedStatus
      )


const totalPages =
  Math.max(
    1,
    Math.ceil(
      filteredOrders.length /
      pageSize
    )
  )


const currentPage =
  Math.min(
    requestedPage,
    totalPages
  )


const pageOrders =
  filteredOrders.slice(
    (currentPage - 1) *
      pageSize,

    currentPage *
      pageSize
  )


const merchantSetting =
  merchantResult.data

      const payments =
  paymentResult.data || []


const paidPayments =
  payments.filter(
    (payment: any) =>
      payment.status === 'paid'
  )


const salesTotal =
  paidPayments.reduce(
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


const settlementTotal =
  paidPayments.reduce(
    (
      sum: number,
      payment: any
    ) =>
      sum +
      Number(
        payment.settlement_amount || 0
      ),
    0
  )


  const receivedCount =
  orders.filter(
    (order: any) =>
      order.order_status === '접수' &&
      order.cancel_status !== '취소요청'
  ).length


const completedCount =
  orders.filter(
    (order: any) =>
      order.order_status === '완료' &&
      order.cancel_status !== '취소요청'
  ).length


const averageAmount =
  orders.length > 0
    ? Math.floor(
        salesTotal /
        orders.length
      )
    : 0


summary.innerHTML = `

  <div class="beauty-mobile-order-summary-grid">

    <div>
      <strong>
        주문수
      </strong>

      <span>
        ${orders.length}건
      </span>
    </div>


    <div>
      <strong>
        접수
      </strong>

      <span>
        ${receivedCount}건
      </span>
    </div>


    <div>
      <strong>
        완료
      </strong>

      <span>
        ${completedCount}건
      </span>
    </div>


    <div>
      <strong>
        매출합계
      </strong>

      <span>
        ${salesTotal.toLocaleString()}원
      </span>
    </div>


    <div>
      <strong>
        평균객단가
      </strong>

      <span>
        ${averageAmount.toLocaleString()}원
      </span>
    </div>


    <div>
      <strong>
        정산예정금액
      </strong>

      <span>
        ${settlementTotal.toLocaleString()}원
      </span>

      <small class="beauty-mobile-settlement-wait">
        대기
      </small>
    </div>

  </div>
`
  
  
if (filteredOrders.length === 0) {

    orderList.innerHTML = `
      <div class="merchant-mobile-order-empty">
        주문내역이 없습니다.
      </div>
    `
  
  }
  
  
    pageOrders.forEach(
      (order: any, index: number) => {
  
        const orderNumber =
          order.order_no
            ?.split('-')[1] ||
          order.order_no ||
          index + 1
  
  
        const orderItems =
          Array.isArray(order.items)
            ? order.items
                .map(
                  (item: any) =>
                    (
                      item.name ||
                      item.product_name ||
                      '-'
                    ) +
                    ' x ' +
                    Number(
                      item.quantity || 1
                    )
                )
                .join(', ')
            : '-'
  
            const paymentForOrder =
            payments.find(
              (payment: any) => {
          
                const paymentOrderId =
                  String(
                    payment.order_id || ''
                  ).replace(
                    /[^a-zA-Z0-9]/g,
                    ''
                  )
          
                  

                const orderPgId =
                  String(
                    order.pg_order_id || ''
                  ).replace(
                    /[^a-zA-Z0-9]/g,
                    ''
                  )
          
                const sameOrderId =
                  paymentOrderId &&
                  orderPgId &&
                  paymentOrderId ===
                    orderPgId
          
                const samePaymentKey =
                  order.payment_key &&
                  payment.payment_key &&
                  String(
                    order.payment_key
                  ) ===
                  String(
                    payment.payment_key
                  )
          
                const sameAmount =
                  Number(
                    payment.amount || 0
                  ) ===
                  Number(
                    order.total_amount || 0
                  )
          
                const timeGap =
                  Math.abs(
                    new Date(
                      payment.created_at
                    ).getTime() -
                    new Date(
                      order.created_at
                    ).getTime()
                  )
          
                return (
                  sameOrderId ||
                  samePaymentKey ||
                  (
                    sameAmount &&
                    timeGap <
                      1000 * 60 * 5
                  )
                )
              }
            ) 
            
           
  
            const statusText =
            getOrderStatus(order)
  
  
        const card =
          document.createElement(
            'div'
          )
  
        card.className =
          'merchant-mobile-order-card'
  
  
        card.innerHTML = `
  
          <div class="merchant-mobile-order-card-top">
  
            <button
  type="button"
  class="merchant-mobile-receipt-button"
  data-order-id="${order.id}"
>
  ${orderNumber}번
</button>
  
            <span>
              ${Number(
                order.total_amount || 0
              ).toLocaleString()}원
            </span>
  
          </div>
  
  
          <div class="merchant-mobile-order-date">
  
            ${new Date(
              order.created_at
            ).toLocaleString(
              'ko-KR'
            )}
  
          </div>

          <button
  type="button"
  class="merchant-mobile-cancel-open"
  data-order-id="${order.id}"
>
  승인번호 ${
    paymentForOrder?.approval_number ||
    '-'
  }
</button>
  
  
          <div class="merchant-mobile-order-items">
  
            ${orderItems}
  
          </div>
  
  
          <div class="merchant-mobile-order-bottom">
  
           <span
  class="merchant-mobile-order-status"
  data-status="${statusText}"
>
  ${statusText}
</span>
  
  
            ${
              statusText ===
              '취소완료'
                ? ''
                : `
                  <button
                    type="button"
                    class="merchant-mobile-call-button"
                    data-id="${order.id}"
                    data-number="${orderNumber}"
                  >
                    ${
                      statusText ===
                      '완료'
                        ? '재호출'
                        : '고객호출'
                    }
                  </button>
                `
            }
  
          </div>
        `
  
  
        orderList.appendChild(
          card
        )

        const cancelOpenButton =
  card.querySelector<HTMLButtonElement>(
    '.merchant-mobile-cancel-open'
  )

cancelOpenButton
  ?.addEventListener(
    'click',
    () => {

      document
        .querySelector(
          '#merchant-mobile-cancel-modal'
        )
        ?.remove()


      document.body.insertAdjacentHTML(
        'beforeend',
        `
          <div
            id="merchant-mobile-cancel-modal"
            class="merchant-mobile-cancel-modal"
            data-order-id="${order.id}"
            data-created-at="${order.created_at || ''}"
            data-payment-id="${paymentForOrder?.id || ''}"
          >

            <div
              class="merchant-mobile-cancel-box"
            >

              <h2>
                결제 취소
              </h2>

              <p>
                주문번호
                <strong>
                  ${orderNumber}번
                </strong>
              </p>

              <p>
                결제금액
                <strong>
                  ${Number(
                    order.total_amount || 0
                  ).toLocaleString()}원
                </strong>
              </p>

              <input
                id="merchant-mobile-cancel-password"
                type="password"
                placeholder="취소 비밀번호 입력"
              >

              <textarea
                id="merchant-mobile-cancel-reason"
                placeholder="취소 사유 입력"
              ></textarea>


              <div
                class="merchant-mobile-cancel-actions"
              >

                <button
                  id="merchant-mobile-direct-cancel"
                  type="button"
                >
                  직접 취소
                </button>

                <button
                  id="merchant-mobile-request-cancel"
                  type="button"
                >
                  본사 승인요청
                </button>

                <button
                  id="merchant-mobile-close-cancel"
                  type="button"
                >
                  닫기
                </button>

              </div>

            </div>

          </div>
        `
      )


      document
        .querySelector(
          '#merchant-mobile-close-cancel'
        )
        ?.addEventListener(
          'click',
          () => {

            document
              .querySelector(
                '#merchant-mobile-cancel-modal'
              )
              ?.remove()
          }
        )

        document
        .querySelector(
          '#merchant-mobile-direct-cancel'
        )
        ?.addEventListener(
          'click',
          async () => {
      
            const modal =
              document.querySelector<HTMLElement>(
                '#merchant-mobile-cancel-modal'
              )
      
            if (!modal) {
              return
            }
      
      
            const paymentId =
              Number(
                modal.dataset.paymentId || 0
              )
      
            const orderId =
              Number(
                modal.dataset.orderId || 0
              )
      
      
            const password =
              (
                document.querySelector<HTMLInputElement>(
                  '#merchant-mobile-cancel-password'
                )?.value || ''
              ).trim()
      
      
            const reason =
              (
                document.querySelector<HTMLTextAreaElement>(
                  '#merchant-mobile-cancel-reason'
                )?.value || ''
              ).trim()
      
      
            if (!paymentId) {
              alert(
                '취소할 결제정보를 찾을 수 없습니다.'
              )
              return
            }
      
      
            if (password !== '1234') {
              alert(
                '취소 비밀번호가 일치하지 않습니다.'
              )
              return
            }
      
      
            if (!reason) {
              alert(
                '취소 사유를 입력해주세요.'
              )
              return
            }
      
      
            const paymentDateSource =
              paymentForOrder?.approved_at ||
              paymentForOrder?.created_at ||
              order.created_at
      
      
            const paymentDate =
              getKoreaDate(
                new Date(
                  paymentDateSource
                )
              )
      
            const today =
              getKoreaDate(
                new Date()
              )
      
      
            if (
              paymentDate !== today
            ) {
      
              alert(
                '당일 결제건만 직접 취소할 수 있습니다.\n' +
                '본사 승인요청을 이용해주세요.'
              )
      
              return
            }
      
      
            const {
              data: payment,
              error: paymentError
            } =
              await supabase
                .from('payments')
                .select(`
                  id,
                  pg_company,
                  payment_key,
                  status
                `)
                .eq(
                  'id',
                  paymentId
                )
                .single()
      
      
            if (
              paymentError ||
              !payment
            ) {
      
              alert(
                '결제정보를 불러오지 못했습니다.'
              )
      
              return
            }
      
      
            if (
              payment.status === 'cancel'
            ) {
      
              alert(
                '이미 취소된 결제입니다.'
              )
      
              return
            }
      
      
            const directButton =
              document.querySelector<HTMLButtonElement>(
                '#merchant-mobile-direct-cancel'
              )
      
      
            if (directButton) {
      
              directButton.disabled =
                true
      
              directButton.textContent =
                '취소 중...'
            }
      
      
            try {
      
              if (
                payment.pg_company ===
                '코페이'
              ) {
      
                const response =
                  await fetch(
                    apiBaseUrl + '/api/korpay-cancel',
                    {
                      method: 'POST',
      
                      headers: {
                        'Content-Type':
                          'application/json'
                      },
      
                      body:
                        JSON.stringify({
                          paymentId:
                            payment.id,
      
                          cancelName:
                            merchantName,
      
                          cancelMessage:
                            reason
                        })
                    }
                  )
      
      
                const data =
                  await response.json()
      
      
                if (
                  !response.ok ||
                  !data.success
                ) {
      
                  alert(
                    '코페이 실제 취소에 실패했습니다.\n\n' +
                    (
                      data.message ||
                      '알 수 없는 오류'
                    )
                  )
      
                  return
                }
      
              } else if (
                payment.pg_company ===
                '토스페이먼츠'
              ) {
      
                if (
                  !payment.payment_key
                ) {
      
                  alert(
                    '토스 paymentKey가 없습니다.'
                  )
      
                  return
                }
      
      
                const response =
                  await fetch(
                    apiBaseUrl + '/api/toss-cancel',
                    {
                      method: 'POST',
      
                      headers: {
                        'Content-Type':
                          'application/json'
                      },
      
                      body:
                        JSON.stringify({
                          paymentKey:
                            payment.payment_key,
      
                          cancelReason:
                            reason
                        })
                    }
                  )
      
      
                const data =
                  await response.json()
      
      
                if (
                  !response.ok ||
                  !data.success
                ) {
      
                  alert(
                    '토스 실제 취소에 실패했습니다.\n\n' +
                    (
                      data.message ||
                      '알 수 없는 오류'
                    )
                  )
      
                  return
                }
      
              } else {
      
                alert(
                  '직접 취소를 지원하지 않는 PG사입니다.\n' +
                  'PG사: ' +
                  (
                    payment.pg_company ||
                    '-'
                  )
                )
      
                return
              }
      
      
              const {
                error: orderUpdateError
              } =
                await supabase
                  .from('orders')
                  .update({
                    order_status:
                      '취소완료',
      
                    cancel_status:
                      '취소완료',
      
                    cancel_reason:
                      reason,
      
                    cancel_requested_at:
                      new Date()
                        .toISOString()
                  })
                  .eq(
                    'id',
                    orderId
                  )
      
      
              if (orderUpdateError) {
      
                alert(
                  '결제 취소는 성공했지만 주문상태 변경에 실패했습니다.\n' +
                  orderUpdateError.message
                )
      
                return
              }
      
      
              alert(
                '결제가 취소되었습니다.'
              )
      
              location.reload()
      
            } catch (error) {
      
              console.error(error)
      
              alert(
                '취소 처리 중 오류가 발생했습니다.'
              )
      
            } finally {
      
              if (directButton) {
      
                directButton.disabled =
                  false
      
                directButton.textContent =
                  '직접 취소'
              }
            }
      
          }
        )   
        
        document
  .querySelector(
    '#merchant-mobile-request-cancel'
  )
  ?.addEventListener(
    'click',
    async () => {

      const modal =
        document.querySelector<HTMLElement>(
          '#merchant-mobile-cancel-modal'
        )

      if (!modal) {
        return
      }


      const paymentId =
        Number(
          modal.dataset.paymentId || 0
        )

      const orderId =
        Number(
          modal.dataset.orderId || 0
        )


      const reason =
        (
          document.querySelector<HTMLTextAreaElement>(
            '#merchant-mobile-cancel-reason'
          )?.value || ''
        ).trim()


      if (!paymentId) {
        alert(
          '취소할 결제정보를 찾을 수 없습니다.'
        )
        return
      }


      if (!reason) {
        alert(
          '취소 사유를 입력해주세요.'
        )
        return
      }


      const requestButton =
        document.querySelector<HTMLButtonElement>(
          '#merchant-mobile-request-cancel'
        )


      if (requestButton) {
        requestButton.disabled = true
        requestButton.textContent =
          '요청 처리 중...'
      }


      try {

        const {
          data: payment,
          error: paymentError
        } =
          await supabase
            .from('payments')
            .select(`
              id,
              merchant_id,
              merchant_name,
              amount,
              settlement_amount,
              manager_admin_id,
              manager_admin_name,
              status
            `)
            .eq(
              'id',
              paymentId
            )
            .single()


        if (
          paymentError ||
          !payment
        ) {

          alert(
            '결제정보를 불러오지 못했습니다.'
          )

          return
        }


        if (
          payment.status === 'cancel'
        ) {

          alert(
            '이미 취소된 결제입니다.'
          )

          return
        }


        const {
          data: existingRequest
        } =
          await supabase
            .from('cancel_requests')
            .select('id')
            .eq(
              'payment_id',
              paymentId
            )
            .eq(
              'status',
              '요청중'
            )
            .maybeSingle()


        if (existingRequest) {

          alert(
            '이미 본사 승인요청이 접수된 거래입니다.'
          )

          return
        }


        const {
          error: requestError
        } =
          await supabase
            .from('cancel_requests')
            .insert({
              payment_id:
                paymentId,

              merchant_id:
                Number(
                  payment.merchant_id
                ),

              manager_admin_id:
                payment.manager_admin_id ||
                null,

              manager_admin_name:
                payment.manager_admin_name ||
                null,

              reason:
                reason,

              status:
                '요청중'
            })


        if (requestError) {

          alert(
            '본사 승인요청 저장에 실패했습니다.\n' +
            requestError.message
          )

          return
        }


        const {
          error: holdError
        } =
          await supabase
            .from('payments')
            .update({
              payout_hold:
                true,

              payout_hold_reason:
                '익일 취소 본사 승인요청: ' +
                reason,

              payout_hold_at:
                new Date()
                  .toISOString(),

              payout_status:
                '지급정지'
            })
            .eq(
              'id',
              paymentId
            )


        if (holdError) {

          alert(
            '취소요청은 접수됐지만 지급정지 처리에 실패했습니다.\n' +
            holdError.message
          )

          return
        }


        const {
          error: orderError
        } =
          await supabase
            .from('orders')
            .update({
              cancel_status:
                '취소요청',

              cancel_reason:
                reason,

              cancel_requested_at:
                new Date()
                  .toISOString()
            })
            .eq(
              'id',
              orderId
            )


        if (orderError) {

          alert(
            '본사 승인요청은 접수됐지만 주문상태 변경에 실패했습니다.\n' +
            orderError.message
          )

          return
        }


        alert(
          '본사 승인요청이 접수되었습니다.'
        )

        location.reload()

      } catch (error) {

        console.error(error)

        alert(
          '본사 승인요청 중 오류가 발생했습니다.'
        )

      } finally {

        if (requestButton) {
          requestButton.disabled = false
          requestButton.textContent =
            '본사 승인요청'
        }
      }

    }
  )
    }
  )

        const receiptButton =
  card.querySelector<HTMLButtonElement>(
    '.merchant-mobile-receipt-button'
  )

receiptButton?.addEventListener(
  'click',
  () => {

    const paymentDate =
      paymentForOrder?.approved_at ||
      paymentForOrder?.created_at ||
      order.created_at

    const approvalNumber =
      paymentForOrder?.approval_number ||
      '-'

    const paymentKey =
      paymentForOrder?.payment_key ||
      '-'

    const cardNumber =
      paymentForOrder?.card_number ||
      '-'

    const cardCompany =
      paymentForOrder?.card_company ||
      '신용카드'

    const pgCompany =
      paymentForOrder?.pg_company ||
      '-'

    const isCanceled =
      order.cancel_status ===
        '취소완료' ||
      order.order_status ===
        '취소완료' ||
      paymentForOrder?.status ===
        'cancel'

    const canceledAt =
      paymentForOrder?.canceled_at ||
      order.cancel_requested_at ||
      ''

    const amount =
      Number(
        order.total_amount || 0
      )

    const taxableAmount =
      Math.floor(
        (amount * 10) / 11
      )

    const vatAmount =
      amount -
      taxableAmount


    document
      .querySelector(
        '#merchant-mobile-receipt-modal'
      )
      ?.remove()


    document.body.insertAdjacentHTML(
      'beforeend',
      `
        <div
          id="merchant-mobile-receipt-modal"
          class="merchant-mobile-receipt-modal"
        >

          <div
            class="merchant-mobile-receipt-box"
          >

            <div
              class="merchant-mobile-receipt-header"
            >

              <strong>
                NXG PICK
              </strong>

              <h2>
                신용카드 매출전표
                ${
                  isCanceled
                    ? '(취소)'
                    : '(승인)'
                }
              </h2>

            </div>


            <section
              class="merchant-mobile-receipt-section"
            >

              <h3>
                결제정보
              </h3>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>카드사</span>
                <strong>
                  ${cardCompany}
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>카드번호</span>
                <strong>
                  ${cardNumber}
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>승인번호</span>
                <strong>
                  ${approvalNumber}
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>PG사</span>
                <strong>
                  ${pgCompany}
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>결제일시</span>
                <strong>
                  ${
                    paymentDate
                      ? new Date(
                          paymentDate
                        ).toLocaleString(
                          'ko-KR'
                        )
                      : '-'
                  }
                </strong>
              </div>

              ${
                isCanceled
                  ? `
                    <div
                      class="merchant-mobile-receipt-row"
                    >
                      <span>취소일시</span>

                      <strong>
                        ${
                          canceledAt
                            ? new Date(
                                canceledAt
                              ).toLocaleString(
                                'ko-KR'
                              )
                            : '-'
                        }
                      </strong>
                    </div>
                  `
                  : ''
              }

            </section>


            <section
              class="merchant-mobile-receipt-section"
            >

              <h3>
                주문정보
              </h3>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>주문번호</span>
                <strong>
                  ${orderNumber}번
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>상품</span>
                <strong>
                  ${orderItems}
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>거래번호</span>
                <strong>
                  ${paymentKey}
                </strong>
              </div>

            </section>


            <section
              class="merchant-mobile-receipt-section"
            >

              <h3>
                결제금액
              </h3>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>과세금액</span>
                <strong>
                  ${taxableAmount.toLocaleString()}원
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>부가세</span>
                <strong>
                  ${vatAmount.toLocaleString()}원
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-total"
              >
                <span>
                  총 결제금액
                </span>

                <strong>
                  ${
                    isCanceled
                      ? '-'
                      : ''
                  }${amount.toLocaleString()}원
                </strong>
              </div>

            </section>


            <section
              class="merchant-mobile-receipt-section"
            >

              <h3>
                상점정보
              </h3>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>상점명</span>
                <strong>
                  ${
                    merchantSetting
                      ?.merchant_name ||
                    merchantName
                  }
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>대표자</span>
                <strong>
                  ${
                    merchantSetting
                      ?.owner_name ||
                    '-'
                  }
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>사업자번호</span>
                <strong>
                  ${
                    merchantSetting
                      ?.business_number ||
                    merchantSetting
                      ?.corporate_number ||
                    '-'
                  }
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>문의</span>
                <strong>
                  ${
                    merchantSetting
                      ?.phone ||
                    '-'
                  }
                </strong>
              </div>

            </section>


            <div
              class="merchant-mobile-receipt-actions"
            >

              <button
                id="merchant-mobile-receipt-share"
                type="button"
              >
                공유
              </button>

              <button
                id="merchant-mobile-receipt-print"
                type="button"
              >
                인쇄
              </button>

              <button
                id="merchant-mobile-receipt-close"
                type="button"
              >
                닫기
              </button>

            </div>

          </div>

        </div>
      `
    )


    document
      .querySelector(
        '#merchant-mobile-receipt-close'
      )
      ?.addEventListener(
        'click',
        () => {

          document
            .querySelector(
              '#merchant-mobile-receipt-modal'
            )
            ?.remove()

        }
      )


    document
      .querySelector(
        '#merchant-mobile-receipt-print'
      )
      ?.addEventListener(
        'click',
        () => {
          window.print()
        }
      )


    document
      .querySelector(
        '#merchant-mobile-receipt-share'
      )
      ?.addEventListener(
        'click',
        async () => {

          const shareText =
            '[NXG PICK 영수증]\n' +
            '상점명: ' +
            (
              merchantSetting
                ?.merchant_name ||
              merchantName
            ) +
            '\n주문번호: ' +
            orderNumber +
            '번\n승인번호: ' +
            approvalNumber +
            '\n상품: ' +
            orderItems +
            '\n결제금액: ' +
            amount.toLocaleString() +
            '원'


          if (navigator.share) {

            await navigator.share({
              title:
                'NXG PICK 영수증',
              text:
                shareText
            })

            return
          }


          await navigator.clipboard
            .writeText(
              shareText
            )

          alert(
            '영수증 내용이 복사되었습니다.'
          )

        }
      )

  }
)
      }
    )
  
    const changeOrderParams = (
        values: Record<string, string>
      ) => {
      
        const newParams =
          new URLSearchParams(
            location.search
          )
      
        Object.entries(values)
          .forEach(
            ([key, value]) => {
      
              newParams.set(
                key,
                value
              )
      
            }
          )
      
      
        const nextUrl =
          '/merchant-app/orders?' +
          newParams.toString()
      
      
        window.history.replaceState(
          null,
          '',
          nextUrl
        )
      
      
        void renderMerchantOrders()
      }
      
      
      document
        .querySelectorAll<HTMLButtonElement>(
          '.merchant-mobile-order-filter button'
        )
        .forEach(
          (button) => {
      
            const status =
              button.dataset.status ||
              '전체'
      
            if (
              status === selectedStatus
            ) {
              button.classList.add(
                'active'
              )
            }
      
      
            button.addEventListener(
                'click',
                (event) => {
              
                  const target =
                    event.currentTarget as HTMLButtonElement
              
                  changeOrderParams({
                    status:
                      target.dataset.status || '전체',
              
                    page:
                      '1'
                  })
                }
              )
          }
        )
      
      
      const pagination =
        document.querySelector<HTMLDivElement>(
          '#mobile-order-pagination'
        )
      
      
      if (pagination) {
      
        pagination.innerHTML = `
      
          <select
            id="mobile-order-page-size"
          >
      
            <option
              value="10"
              ${
                pageSize === 10
                  ? 'selected'
                  : ''
              }
            >
              10개씩 보기
            </option>
      
            <option
              value="20"
              ${
                pageSize === 20
                  ? 'selected'
                  : ''
              }
            >
              20개씩 보기
            </option>
      
            <option
              value="30"
              ${
                pageSize === 30
                  ? 'selected'
                  : ''
              }
            >
              30개씩 보기
            </option>
      
          </select>
      
      
          <div
            class="merchant-mobile-order-page-buttons"
          >
      
            <button
              id="mobile-order-page-prev"
              type="button"
              ${
                currentPage <= 1
                  ? 'disabled'
                  : ''
              }
            >
              이전
            </button>
      
      
            <strong>
              ${currentPage} / ${totalPages}
            </strong>
      
      
            <button
              id="mobile-order-page-next"
              type="button"
              ${
                currentPage >= totalPages
                  ? 'disabled'
                  : ''
              }
            >
              다음
            </button>
      
          </div>
        `
      
      
        document
          .querySelector<HTMLSelectElement>(
            '#mobile-order-page-size'
          )
          ?.addEventListener(
            'change',
            (event) => {
      
              changeOrderParams({
                size:
                  (
                    event.target as HTMLSelectElement
                  ).value,
      
                page:
                  '1'
              })
            }
          )
      
      
        document
          .querySelector(
            '#mobile-order-page-prev'
          )
          ?.addEventListener(
            'click',
            () => {
      
              if (
                currentPage <= 1
              ) {
                return
              }
      
              changeOrderParams({
                page:
                  String(
                    currentPage - 1
                  )
              })
            }
          )
      
      
        document
          .querySelector(
            '#mobile-order-page-next'
          )
          ?.addEventListener(
            'click',
            () => {
      
              if (
                currentPage >=
                totalPages
              ) {
                return
              }
      
              changeOrderParams({
                page:
                  String(
                    currentPage + 1
                  )
              })
            }
          )
      }
  
    document
      .querySelectorAll<HTMLButtonElement>(
        '.merchant-mobile-call-button'
      )
      .forEach(
        (button) => {
  
          button.addEventListener(
            'click',
            async () => {
  
              if (
                merchantSetting
                  ?.voice_enabled !== true
              ) {
  
                alert(
                  '음성 호출 사용이 꺼져 있습니다.\n' +
                  'PC 매장 설정에서 음성 호출 사용을 확인해주세요.'
                )
  
                return
              }
  
  
              const orderNumber =
                button.dataset.number ||
                '0'
  
              const orderId =
                Number(
                  button.dataset.id
                )
  
  
              const callMessage =
                orderNumber +
                '번 고객님 ' +
                (
                  merchantSetting
                    ?.call_message ||
                  '주문이 준비되었습니다.'
                )
  
  
              window
                .speechSynthesis
                .cancel()
  
  
              const speech =
                new SpeechSynthesisUtterance(
                  callMessage
                )
  
              speech.lang =
                'ko-KR'
  
              speech.rate =
                0.95
  
  
              window
                .speechSynthesis
                .speak(speech)
  
  
              const {
                error
              } =
                await supabase
                  .from('orders')
                  .update({
                    order_status:
                      '완료'
                  })
                  .eq(
                    'id',
                    orderId
                  )
  
  
              if (error) {
  
                alert(
                  '주문상태 변경 실패: ' +
                  error.message
                )
  
                return
              }
  
  
              button.textContent =
                '호출완료'
  
  
              const card =
                button.closest(
                  '.merchant-mobile-order-card'
                )
  
              const status =
                card?.querySelector(
                  '.merchant-mobile-order-status'
                )
  
              if (status) {
                status.textContent =
                  '완료'
              }
  
            }
          )
  
        }
      )
  }

  /* =========================================
   뷰티 모바일 주문관리
========================================= */

async function renderBeautyOrders() {

  const merchantIdText =
    sessionStorage.getItem(
      'login_merchant_id'
    ) ||
    localStorage.getItem(
      'login_merchant_id'
    )


  if (!merchantIdText) {

    location.replace(
      '/merchant-app'
    )

    return
  }


  const merchantId =
    Number(
      merchantIdText
    )


  const merchantName =
    sessionStorage.getItem(
      'login_merchant_name'
    ) ||
    localStorage.getItem(
      'login_merchant_name'
    ) ||
    '가맹점'

    const params =
    new URLSearchParams(
      location.search
    )


  const getBeautyKoreaDate = (
    date: Date
  ) => {

    return new Intl.DateTimeFormat(
      'en-CA',
      {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }
    ).format(date)

  }


  const beautyToday =
    getBeautyKoreaDate(
      new Date()
    )


  const beautyStartDate =
    params.get('start') ||
    beautyToday


  const beautyEndDate =
    params.get('end') ||
    beautyToday

    const beautyViewMode =
    params.get('view') ||
    'schedule'

  const isBeautySalesView =
    beautyViewMode ===
    'sales'
  

  app.innerHTML = `
    <div class="merchant-mobile-home">

      <header class="merchant-mobile-header">

        <div>

          <div class="merchant-mobile-brand">
            NXG PICK
          </div>

          <div class="merchant-mobile-store">
            ${merchantName}
          </div>

        </div>

        <button
          id="beauty-mobile-order-home"
          class="merchant-mobile-logout"
          type="button"
        >
          홈
        </button>

      </header>


      <main class="merchant-mobile-content">

        <div class="merchant-mobile-page-title">

          <h1>
            뷰티 주문관리
          </h1>

          <span>
            예약접수
          </span>

        </div>

        <div class="merchant-mobile-date-nav beauty-mobile-date-nav">

  <button
    id="beauty-mobile-order-date-prev"
    type="button"
  >
    이전
  </button>

  <button
    id="beauty-mobile-order-date-today"
    type="button"
  >
    오늘
  </button>

  <button
    id="beauty-mobile-order-date-next"
    type="button"
  >
    다음
  </button>

  <button
    id="beauty-mobile-order-date-month"
    type="button"
  >
    당월
  </button>

  <button
  id="beauty-mobile-order-excel"
  type="button"
>
  엑셀 다운로드
</button>

</div>


<div class="merchant-mobile-date-range">

  <div>
    <label>시작일</label>

    <input
      id="beauty-mobile-order-start"
      type="date"
      value="${beautyStartDate}"
    >
  </div>

  <div>
    <label>종료일</label>

    <input
      id="beauty-mobile-order-end"
      type="date"
      value="${beautyEndDate}"
    >
  </div>
<button
  id="beauty-mobile-order-date-search"
  type="button"
>
  조회
</button>
</div>

        <div class="merchant-mobile-order-filter beauty-mobile-order-filter">

  <button
    type="button"
    data-beauty-status="전체"
  >
    전체
  </button>

  <button
    type="button"
    data-beauty-status="준비중"
  >
    준비중
  </button>

  <button
    type="button"
    data-beauty-status="완료"
  >
    완료
  </button>

</div>

        <div
          id="beauty-mobile-order-summary"
          class="merchant-mobile-order-summary"
        >
          주문을 불러오는 중입니다.
        </div>

                <div class="beauty-mobile-order-view">

          <button
            id="beauty-mobile-schedule-view"
            type="button"
            class="${
              !isBeautySalesView
                ? 'active'
                : ''
            }"
          >
            예약 스케줄
          </button>

          <button
            id="beauty-mobile-sales-view"
            type="button"
            class="${
              isBeautySalesView
                ? 'active'
                : ''
            }"
          >
            전체 매출
          </button>

        </div>

        <div
          id="beauty-mobile-order-list"
          class="merchant-mobile-order-list"
        ></div>

        <div
  id="beauty-mobile-order-pagination"
  class="merchant-mobile-order-pagination"
></div>

      </main>

    </div>
  `


  document
    .querySelector(
      '#beauty-mobile-order-home'
    )
    ?.addEventListener(
      'click',
      () => {

        location.href =
          '/merchant-app/home'

      }
    )

    document
    .querySelector(
      '#beauty-mobile-schedule-view'
    )
    ?.addEventListener(
      'click',
      () => {

        const nextParams =
          new URLSearchParams(
            window.location.search
          )

        nextParams.delete(
          'view'
        )

        const queryText =
          nextParams.toString()

        location.href =
          '/merchant-app/beauty/orders' +
          (
            queryText
              ? '?' + queryText
              : ''
          )

      }
    )


  document
    .querySelector(
      '#beauty-mobile-sales-view'
    )
    ?.addEventListener(
      'click',
      () => {

        const nextParams =
          new URLSearchParams(
            window.location.search
          )

        nextParams.set(
          'view',
          'sales'
        )

        location.href =
          '/merchant-app/beauty/orders?' +
          nextParams.toString()

      }
    )

    const moveBeautyOrderDate = (
      amount: number
    ) => {
  
      const start =
        new Date(
          beautyStartDate +
          'T00:00:00+09:00'
        )
  
      const end =
        new Date(
          beautyEndDate +
          'T00:00:00+09:00'
        )
  
      start.setDate(
        start.getDate() + amount
      )
  
      end.setDate(
        end.getDate() + amount
      )
  
      const nextParams =
  new URLSearchParams(
    window.location.search
  )

nextParams.set(
  'start',
  getBeautyKoreaDate(start)
)

nextParams.set(
  'end',
  getBeautyKoreaDate(end)
)

location.href =
  '/merchant-app/beauty/orders?' +
  nextParams.toString()
    }
  
  
    document
      .querySelector(
        '#beauty-mobile-order-date-prev'
      )
      ?.addEventListener(
        'click',
        () => {
  
          moveBeautyOrderDate(-1)
  
        }
      )
  
  
    document
      .querySelector(
        '#beauty-mobile-order-date-today'
      )
      ?.addEventListener(
        'click',
        () => {
  
          const nextParams =
  new URLSearchParams(
    window.location.search
  )

nextParams.set(
  'start',
  beautyToday
)

nextParams.set(
  'end',
  beautyToday
)

location.href =
  '/merchant-app/beauty/orders?' +
  nextParams.toString()
  
        }
      )
  
  
    document
      .querySelector(
        '#beauty-mobile-order-date-next'
      )
      ?.addEventListener(
        'click',
        () => {
  
          moveBeautyOrderDate(1)
  
        }
      )
  
  
    document
      .querySelector(
        '#beauty-mobile-order-date-month'
      )
      ?.addEventListener(
        'click',
        () => {
  
          const monthStart =
            beautyToday.slice(
              0,
              7
            ) +
            '-01'
  
            const nextParams =
            new URLSearchParams(
              window.location.search
            )
          
          nextParams.set(
            'start',
            monthStart
          )
          
          nextParams.set(
            'end',
            beautyToday
          )
          
          location.href =
            '/merchant-app/beauty/orders?' +
            nextParams.toString()
  
        }
      )
  
  
    document
      .querySelector(
        '#beauty-mobile-order-date-search'
      )
      ?.addEventListener(
        'click',
        () => {
  
          const start =
            document.querySelector<HTMLInputElement>(
              '#beauty-mobile-order-start'
            )?.value || ''
  
          const end =
            document.querySelector<HTMLInputElement>(
              '#beauty-mobile-order-end'
            )?.value || ''
  
  
          if (
            !start ||
            !end
          ) {
            return
          }
  
  
          if (
            start > end
          ) {
  
            alert(
              '시작일이 종료일보다 늦을 수 없습니다.'
            )
  
            return
          }
  
  
          const nextParams =
          new URLSearchParams(
            window.location.search
          )
        
        nextParams.set(
          'start',
          start
        )
        
        nextParams.set(
          'end',
          end
        )
        
        location.href =
          '/merchant-app/beauty/orders?' +
          nextParams.toString()
  
        }
      )
  
  
    let beautyOrderQuery =
      supabase
        .from('orders')
        .select('*')
        .eq(
          'merchant_id',
          merchantId
        )
  
  
    if (
      isBeautySalesView
    ) {
  
      beautyOrderQuery =
        beautyOrderQuery
          .gte(
            'created_at',
            beautyStartDate +
            'T00:00:00'
          )
          .lte(
            'created_at',
            beautyEndDate +
            'T23:59:59'
          )
  
    }
  
  
    const {
      data,
      error
    } =
      await beautyOrderQuery
        .order(
          'created_at',
          {
            ascending: false
          }
        )


  const summary =
    document.querySelector<HTMLDivElement>(
      '#beauty-mobile-order-summary'
    )


  const orderList =
    document.querySelector<HTMLDivElement>(
      '#beauty-mobile-order-list'
    )


  if (
    !summary ||
    !orderList
  ) {
    return
  }


  if (error) {

    summary.textContent =
      '주문 조회 실패'

    orderList.innerHTML = `
      <div class="merchant-mobile-order-empty">
        ${error.message}
      </div>
    `

    return
  }


  const beautySearchStartDate =
  beautyStartDate

  const beautySearchEndDate =
  beautyEndDate


const orders =
  isBeautySalesView
    ? (data || [])
    : (data || []).filter(
        (order: any) => {

          const beautyItemDates =
            Array.isArray(
              order.items
            )
              ? order.items
                  .map(
                    (item: any) =>
                      item.reservation_date ||
                      ''
                  )
                  .filter(
                    (date: string) =>
                      !!date
                  )
              : []

          const checkDates =
            beautyItemDates.length > 0
              ? beautyItemDates
              : [
                  order.reservation_date ||
                  ''
                ]

          return checkDates.some(
            (date: string) =>
              date >=
                beautySearchStartDate &&
              date <=
                beautySearchEndDate
          )

        }
      )

      const receivedOrders =
      orders.filter(
        (order: any) =>
          order.order_status !==
          '완료'
      )

const completedOrders =
  orders.filter(
    (order: any) =>
      order.order_status ===
      '완료'
  )

const totalSales =
  orders.reduce(
    (
      sum: number,
      order: any
    ) => {

      return (
        sum +
        Number(
          order.total_amount ||
          0
        )
      )

    },
    0
  )

const averageAmount =
  orders.length > 0
    ? Math.floor(
        totalSales /
        orders.length
      )
    : 0

    const {
      data: settlementMerchant,
      error: settlementMerchantError
    } =
      await supabase
        .from('merchants')
        .select('settlement_cycle')
        .eq(
          'id',
          merchantId
        )
        .single()
  
  
    if (settlementMerchantError) {
  
      console.error(
        '정산주기 조회 실패:',
        settlementMerchantError
      )
  
    }
  
  
    const settlementCycle =
      String(
        settlementMerchant
          ?.settlement_cycle ||
        '1일'
      )
  
  
    const {
      data: settlementHolidayData,
      error: settlementHolidayError
    } =
      await supabase
        .from('holidays')
        .select('holiday_date')
  
  
    if (settlementHolidayError) {
  
      console.error(
        '공휴일 조회 실패:',
        settlementHolidayError
      )
  
    }
  
  
    const settlementHolidaySet =
      new Set(
        (
          settlementHolidayData ||
          []
        ).map(
          (holiday: any) =>
            String(
              holiday.holiday_date
            )
        )
      )
  
  
    const formatSettlementDate =
      (date: Date) => {
  
        const year =
          date.getFullYear()
  
        const month =
          String(
            date.getMonth() + 1
          ).padStart(
            2,
            '0'
          )
  
        const day =
          String(
            date.getDate()
          ).padStart(
            2,
            '0'
          )
  
        return (
          year +
          '-' +
          month +
          '-' +
          day
        )
  
      }
  
  
    const getSettlementPayoutDate =
      (
        createdAt: string
      ) => {
  
        const payoutDate =
          new Date(
            createdAt
          )
  
        const cycleNumberMatch =
          settlementCycle.match(
            /\d+/
          )
  
        const cycleDays =
          cycleNumberMatch
            ? Number(
                cycleNumberMatch[0]
              )
            : 1
  
  
        if (
          cycleDays === 0
        ) {
  
          while (true) {
  
            const dateText =
              formatSettlementDate(
                payoutDate
              )
  
            const dayOfWeek =
              payoutDate.getDay()
  
            const isWeekend =
              dayOfWeek === 0 ||
              dayOfWeek === 6
  
            const isHoliday =
              settlementHolidaySet.has(
                dateText
              )
  
            if (
              !isWeekend &&
              !isHoliday
            ) {
              return dateText
            }
  
            payoutDate.setDate(
              payoutDate.getDate() +
              1
            )
  
          }
  
        }
  
  
        let addedBusinessDays =
          0
  
  
        while (
          addedBusinessDays <
          cycleDays
        ) {
  
          payoutDate.setDate(
            payoutDate.getDate() +
            1
          )
  
          const dateText =
            formatSettlementDate(
              payoutDate
            )
  
          const dayOfWeek =
            payoutDate.getDay()
  
          const isWeekend =
            dayOfWeek === 0 ||
            dayOfWeek === 6
  
          const isHoliday =
            settlementHolidaySet.has(
              dateText
            )
  
          if (
            isWeekend ||
            isHoliday
          ) {
            continue
          }
  
          addedBusinessDays +=
            1
  
        }
  
  
        return formatSettlementDate(
          payoutDate
        )
  
      }

      const {
        data: settlementPayments,
        error: settlementError
      } =
        await supabase
          .from('payments')
          .select(`
            settlement_amount,
            payout_status,
            created_at,
            status
          `)
          .eq(
            'merchant_id',
            merchantId
          )
    
    
      if (settlementError) {
    
        console.error(
          '정산예정금액 조회 실패:',
          settlementError
        )
    
      }
    
    
      const settlementTargetPayments =
        (
          settlementPayments ||
          []
        ).filter(
          (payment: any) => {
    
            if (
              payment.status !==
              'paid'
            ) {
              return false
            }
    
            if (
              !payment.created_at
            ) {
              return false
            }
    
            const payoutDate =
              getSettlementPayoutDate(
                payment.created_at
              )
    
              if (
                beautyStartDate &&
                beautyEndDate
              ) {
                return (
                  payoutDate >=
                    beautyStartDate &&
                  payoutDate <=
                    beautyEndDate
                )
              }
              
              return true
    
          }
        )
    
    
      const settlementAmount =
        settlementTargetPayments.reduce(
          (
            sum: number,
            payment: any
          ) => {
    
            return (
              sum +
              Number(
                payment
                  .settlement_amount ||
                0
              )
            )
    
          },
          0
        )

        const settlementComplete =
        settlementTargetPayments.length > 0 &&
        settlementTargetPayments.every(
          (payment: any) =>
            payment.payout_status ===
            '출금완료'
        )
    
    
      const settlementPaymentDates =
        settlementTargetPayments
          .map(
            (payment: any) => {
    
              if (
                !payment.created_at
              ) {
                return ''
              }
    
              return formatSettlementDate(
                new Date(
                  payment.created_at
                )
              )
    
            }
          )
          .filter(Boolean)
          .sort()
    
    
      let settlementPaymentDateLabel =
        ''
    
    
      if (
        settlementPaymentDates.length >
        0
      ) {
    
        const firstDate =
          settlementPaymentDates[0]
    
        const lastDate =
          settlementPaymentDates[
            settlementPaymentDates.length -
            1
          ]
    
    
        const formatShortSettlementDate =
          (
            dateText: string
          ) => {
    
            const [
              year,
              month,
              day
            ] =
              dateText.split('-')
    
            return (
              year.slice(-2) +
              '.' +
              month +
              '.' +
              day
            )
    
          }
    
    
        settlementPaymentDateLabel =
          firstDate === lastDate
            ? formatShortSettlementDate(
                firstDate
              )
            : formatShortSettlementDate(
                firstDate
              ) +
              '~' +
              formatShortSettlementDate(
                lastDate
              )
    
      }

      summary.innerHTML = `

      <div class="beauty-mobile-order-summary-grid">
  
        <div>
          <strong>
            주문수
          </strong>
  
          <span>
            ${orders.length}건
          </span>
        </div>
  
  
        <div>
          <strong>
            접수
          </strong>
  
          <span>
            ${receivedOrders.length}건
          </span>
        </div>
  
  
        <div>
          <strong>
            완료
          </strong>
  
          <span>
            ${completedOrders.length}건
          </span>
        </div>
  
  
        <div>
          <strong>
            매출합계
          </strong>
  
          <span>
            ${totalSales.toLocaleString()}원
          </span>
        </div>
  
  
        <div>
          <strong>
            평균객단가
          </strong>
  
          <span>
            ${averageAmount.toLocaleString()}원
          </span>
        </div>
  
  
        <div>
          <strong>
            정산예정금액
          </strong>
  
          <span>
            ${settlementAmount.toLocaleString()}원
          </span>
  
          <small
            class="${
              settlementComplete
                ? 'beauty-mobile-settlement-complete'
                : 'beauty-mobile-settlement-wait'
            }"
          >
            ${
              settlementComplete
                ? '완료'
                : '대기'
            }
          </small>
  
          ${
            settlementTargetPayments.length > 0
              ? `
                <em>
                  정산대상 ${settlementTargetPayments.length.toLocaleString()}건${
                    settlementPaymentDateLabel
                      ? ' · ' +
                        settlementPaymentDateLabel +
                        ' 결제건'
                      : ''
                  }
                </em>
              `
              : ''
          }
  
        </div>
  
      </div>
    `


  if (
    orders.length === 0
  ) {

    orderList.innerHTML = `
      <div class="merchant-mobile-order-empty">
        예약 주문내역이 없습니다.
      </div>
    `

    return
  }


  orderList.innerHTML =
    orders
      .map(
        (
          order: any,
          index: number
        ) => {

          const orderNumber =
            order.order_no
              ?.split('-')[1] ||
            order.order_no ||
            index + 1


          const reservationDates =
            Array.isArray(
              order.items
            )
              ? Array.from(
                  new Set(
                    order.items.map(
                      (item: any) =>
                        item.reservation_date ||
                        order.reservation_date ||
                        '-'
                    )
                  )
                ).join('<br>')
              : (
                  order.reservation_date ||
                  '-'
                )


          const reservationTimes =
            Array.isArray(
              order.items
            )
              ? order.items
                  .map(
                    (item: any) =>
                      item.reservation_time ||
                      order.reservation_time ||
                      '-'
                  )
                  .join('<br>')
              : (
                  order.reservation_time ||
                  '-'
                )


          const beautyItems =
            Array.isArray(
              order.items
            )
              ? order.items
                  .map(
                    (item: any) => {

                      const staffName =
                        item.beauty_staff_name ||
                        (
                          item.beauty_staff_id ||
                          order.beauty_staff_id
                            ? '직원ID ' +
                              (
                                item.beauty_staff_id ||
                                order.beauty_staff_id
                              )
                            : '-'
                        )


                      return (
                        (
                          item.name ||
                          item.product_name ||
                          '-'
                        ) +
                        ' / ' +
                        staffName +
                        ' x ' +
                        Number(
                          item.quantity || 1
                        )
                      )

                    }
                  )
                  .join('<br>')
              : '-'


          const statusText =
            order.cancel_status ===
              '취소요청'
              ? '취소요청'
              : order.order_status ===
                  '취소완료'
                ? '취소완료'
                : order.order_status ===
                    '완료'
                  ? '완료'
                  : '접수'


          return `
            <div
              class="merchant-mobile-order-card beauty-mobile-order-card"
              data-status="${order.order_status || '접수'}"
            >

              <div class="merchant-mobile-order-card-top">

                <strong>
                  ${orderNumber}번
                </strong>

                <span>
                  ${Number(
                    order.total_amount || 0
                  ).toLocaleString()}원
                </span>

              </div>


              <div class="beauty-mobile-order-row">

                <span>
                  예약자
                </span>

                <strong>
                  ${order.customer_name || '-'}
                </strong>

              </div>


              <div class="beauty-mobile-order-row">

                <span>
                  연락처
                </span>

                <strong>
                  ${order.customer_phone || '-'}
                </strong>

              </div>


              <div class="beauty-mobile-order-row">

                <span>
                  예약일
                </span>

                <strong>
                  ${reservationDates}
                </strong>

              </div>


              <div class="beauty-mobile-order-row">

                <span>
                  예약시간
                </span>

                <strong>
                  ${reservationTimes}
                </strong>

              </div>


              <div class="beauty-mobile-order-service">

                <span>
                  서비스 / 직원
                </span>

                <strong>
                  ${beautyItems}
                </strong>

              </div>


              <div class="merchant-mobile-order-bottom">

                <span
                  class="merchant-mobile-order-status"
                  data-status="${statusText}"
                >
                  ${statusText}
                </span>


                ${
                  order.order_status ===
                  '완료'

                    ? `
                      <strong>
                        완료
                      </strong>
                    `

                    : `
                      <button
                        type="button"
                        class="beauty-mobile-order-complete"
                        data-id="${order.id}"
                      >
                        완료처리
                      </button>
                    `
                }

              </div>

            </div>
          `

        }
      )
      .join('')


  document
    .querySelectorAll<HTMLButtonElement>(
      '.beauty-mobile-order-complete'
    )
    .forEach(
      (button) => {

        button.addEventListener(
          'click',
          async () => {

            const orderId =
              Number(
                button.dataset.id ||
                0
              )


            if (!orderId) {
              return
            }


            const {
              error
            } =
              await supabase
                .from('orders')
                .update({
                  order_status:
                    '완료'
                })
                .eq(
                  'id',
                  orderId
                )


            if (error) {

              alert(
                '완료 처리 실패: ' +
                error.message
              )

              return
            }


            void renderBeautyOrders()

          }
        )

      }
    )

    let currentBeautyOrderFilter =
    '전체'

  let currentBeautyPage =
    1

  let currentBeautyPageSize =
    10


  const applyBeautyOrderView =
    () => {

      const cards =
        Array.from(
          document.querySelectorAll<HTMLElement>(
            '.beauty-mobile-order-card'
          )
        )


      const filteredCards =
        cards.filter(
          (card) => {

            const status =
              card.dataset.status ||
              '접수'


            if (
              currentBeautyOrderFilter ===
              '전체'
            ) {
              return true
            }


            if (
              currentBeautyOrderFilter ===
              '준비중'
            ) {
              return status !==
                '완료'
            }


            return status ===
              '완료'

          }
        )


      const totalPages =
        Math.max(
          1,
          Math.ceil(
            filteredCards.length /
            currentBeautyPageSize
          )
        )


      currentBeautyPage =
        Math.min(
          currentBeautyPage,
          totalPages
        )


      cards.forEach(
        (card) => {

          card.style.display =
            'none'

        }
      )


      const startIndex =
        (
          currentBeautyPage - 1
        ) *
        currentBeautyPageSize


      filteredCards
        .slice(
          startIndex,
          startIndex +
            currentBeautyPageSize
        )
        .forEach(
          (card) => {

            card.style.display =
              ''

          }
        )


      const pagination =
        document.querySelector<HTMLDivElement>(
          '#beauty-mobile-order-pagination'
        )


      if (!pagination) {
        return
      }


      pagination.innerHTML = `

        <select
          id="beauty-mobile-order-page-size"
        >

          <option value="10">
            10개씩 보기
          </option>

          <option value="20">
            20개씩 보기
          </option>

          <option value="30">
            30개씩 보기
          </option>
          <option value="50">
  50개씩 보기
</option>

<option value="100">
  100개씩 보기
</option>

        </select>


        <div
          class="merchant-mobile-order-page-buttons"
        >

          <button
            id="beauty-mobile-order-prev"
            type="button"
            ${
              currentBeautyPage <= 1
                ? 'disabled'
                : ''
            }
          >
            이전
          </button>

          <strong>
            ${currentBeautyPage} / ${totalPages}
          </strong>

          <button
            id="beauty-mobile-order-next"
            type="button"
            ${
              currentBeautyPage >= totalPages
                ? 'disabled'
                : ''
            }
          >
            다음
          </button>

        </div>
      `


      const sizeSelect =
        document.querySelector<HTMLSelectElement>(
          '#beauty-mobile-order-page-size'
        )


      if (sizeSelect) {

        sizeSelect.value =
          String(
            currentBeautyPageSize
          )


        sizeSelect.addEventListener(
          'change',
          () => {

            currentBeautyPageSize =
              Number(
                sizeSelect.value
              )

            currentBeautyPage =
              1

            applyBeautyOrderView()

          }
        )

      }


      document
        .querySelector(
          '#beauty-mobile-order-prev'
        )
        ?.addEventListener(
          'click',
          () => {

            if (
              currentBeautyPage <= 1
            ) {
              return
            }

            currentBeautyPage -= 1

            applyBeautyOrderView()

          }
        )


      document
        .querySelector(
          '#beauty-mobile-order-next'
        )
        ?.addEventListener(
          'click',
          () => {

            if (
              currentBeautyPage >=
              totalPages
            ) {
              return
            }

            currentBeautyPage += 1

            applyBeautyOrderView()

          }
        )

    }


  document
    .querySelectorAll<HTMLButtonElement>(
      '[data-beauty-status]'
    )
    .forEach(
      (button) => {

        button.addEventListener(
          'click',
          () => {

            currentBeautyOrderFilter =
              button.dataset
                .beautyStatus ||
              '전체'

            currentBeautyPage =
              1


            document
              .querySelectorAll<HTMLButtonElement>(
                '[data-beauty-status]'
              )
              .forEach(
                (item) => {

                  item.classList.remove(
                    'active'
                  )

                }
              )


            button.classList.add(
              'active'
            )


            applyBeautyOrderView()

          }
        )

      }
    )


  document
    .querySelector<HTMLButtonElement>(
      '[data-beauty-status="전체"]'
    )
    ?.classList.add(
      'active'
    )


  applyBeautyOrderView()
}

/* =========================================
   뷰티 모바일 직원관리
========================================= */

async function renderBeautyStaffMobile() {

  const merchantIdText =
    sessionStorage.getItem(
      'login_merchant_id'
    ) ||
    localStorage.getItem(
      'login_merchant_id'
    )


  if (!merchantIdText) {

    location.replace(
      '/merchant-app'
    )

    return
  }


  const merchantId =
    Number(
      merchantIdText
    )


  const merchantName =
    sessionStorage.getItem(
      'login_merchant_name'
    ) ||
    localStorage.getItem(
      'login_merchant_name'
    ) ||
    '가맹점'


  const {
    data,
    error
  } =
    await supabase
      .from('beauty_staff')
      .select('*')
      .eq(
        'merchant_id',
        merchantId
      )
      .order(
        'id',
        {
          ascending: false
        }
      )


  const staffList =
    data || []

    const workingCount =
    staffList.filter(
      (staff: any) =>
        (
          staff.status ||
          '근무중'
        ) === '근무중'
    ).length

  const stoppedCount =
    staffList.length -
    workingCount

    const beautyStaffToday =
    new Date()

  const beautyStaffWeekOffset =
    Number(
      sessionStorage.getItem(
        'beauty_mobile_staff_week_offset'
      ) || '0'
    )

  const beautyStaffMonday =
    new Date(
      beautyStaffToday
    )

  const beautyStaffCurrentDay =
    beautyStaffToday.getDay()

  const beautyStaffMondayOffset =
    beautyStaffCurrentDay === 0
      ? -6
      : 1 -
        beautyStaffCurrentDay

  beautyStaffMonday.setDate(
    beautyStaffToday.getDate() +
    beautyStaffMondayOffset +
    beautyStaffWeekOffset * 7
  )

  beautyStaffMonday.setHours(
    0,
    0,
    0,
    0
  )

  const beautyStaffWeekDates =
    Array.from(
      {
        length: 7
      },
      (_, index) => {

        const date =
          new Date(
            beautyStaffMonday
          )

        date.setDate(
          beautyStaffMonday.getDate() +
          index
        )

        const dateValue =
          date.getFullYear() +
          '-' +
          String(
            date.getMonth() + 1
          ).padStart(
            2,
            '0'
          ) +
          '-' +
          String(
            date.getDate()
          ).padStart(
            2,
            '0'
          )

        return {
          dateValue,

          dayLabel:
            [
              '월',
              '화',
              '수',
              '목',
              '금',
              '토',
              '일'
            ][index],

          dateLabel:
            String(
              date.getMonth() + 1
            ) +
            '/' +
            String(
              date.getDate()
            )
        }

      }
    )

  const beautyStaffWeekRangeText =
    beautyStaffWeekDates[0].dateLabel +
    ' ~ ' +
    beautyStaffWeekDates[6].dateLabel

    const beautyStaffWeekStart =
    beautyStaffWeekDates[0].dateValue

  const beautyStaffWeekEnd =
    beautyStaffWeekDates[6].dateValue


  const {
    data: beautyStaffWeeklyRows,
    error: beautyStaffWeeklyError
  } =
    await supabase
      .from(
        'beauty_staff_schedule'
      )
      .select(`
        staff_id,
        schedule_date,
        schedule_time,
        status,
        order_id
      `)
      .eq(
        'merchant_id',
        merchantId
      )
      .gte(
        'schedule_date',
        beautyStaffWeekStart
      )
      .lte(
        'schedule_date',
        beautyStaffWeekEnd
      )


  if (
    beautyStaffWeeklyError
  ) {

    alert(
      '주간 스케줄 조회 실패: ' +
      beautyStaffWeeklyError.message
    )

  }

  const beautyStaffDayTimes: string[] =
  []

for (
  let minutes = 0;
  minutes < 24 * 60;
  minutes += 30
) {

  const hour =
    String(
      Math.floor(
        minutes / 60
      )
    ).padStart(
      2,
      '0'
    )

  const minute =
    String(
      minutes % 60
    ).padStart(
      2,
      '0'
    )

  beautyStaffDayTimes.push(
    `${hour}:${minute}`
  )

}


const isBeautyMobileStaffDayOff = (
  staffId: number,
  dateValue: string
) => {

  return beautyStaffDayTimes.every(
    (time) => {

      const row =
        (
          beautyStaffWeeklyRows ||
          []
        ).find(
          (item: any) =>
            Number(
              item.staff_id
            ) === staffId &&
            String(
              item.schedule_date
            ) === dateValue &&
            String(
              item.schedule_time ||
              ''
            ).slice(
              0,
              5
            ) === time
        )

      if (
        row?.order_id ||
        row?.status ===
          '예약완료'
      ) {
        return true
      }

      return (
        row?.status ===
        '예약불가'
      )

    }
  )

}

  app.innerHTML = `
    <div class="merchant-mobile-home">

      <header class="merchant-mobile-header">

        <div>

          <div class="merchant-mobile-brand">
            NXG PICK
          </div>

          <div class="merchant-mobile-store">
            ${merchantName}
          </div>

        </div>

        <button
          id="beauty-mobile-staff-home"
          class="merchant-mobile-logout"
          type="button"
        >
          홈
        </button>

      </header>


      <main class="merchant-mobile-content">

        <div class="merchant-mobile-page-title">

          <h1>
            직원관리
          </h1>

          <span>
            등록 직원 ${staffList.length}명
          </span>

        </div>

        <button
  id="beauty-mobile-staff-create-open"
  type="button"
  class="merchant-mobile-product-create-open"
>
  + 직원 등록
</button>

<div class="merchant-mobile-order-summary">

  <span>
    총 직원 :
    <strong>
      ${staffList.length}명
    </strong>
  </span>

  <span>
    근무중 :
    <strong>
      ${workingCount}명
    </strong>
  </span>

  <span>
    근무중지 :
    <strong>
      ${stoppedCount}명
    </strong>
  </span>

</div>

        <div
          id="beauty-mobile-staff-list"
          class="merchant-mobile-order-list"
        >

          ${
            error

              ? `
                <div class="merchant-mobile-order-empty">
                  직원 조회 실패 :
                  ${error.message}
                </div>
              `

              : staffList.length === 0

                ? `
                  <div class="merchant-mobile-order-empty">
                    등록된 직원이 없습니다.
                  </div>
                `

                : staffList
                    .map(
                      (staff: any) => `

                        <div
                          class="merchant-mobile-order-card"
                        >

                          <div
                            class="merchant-mobile-order-card-top"
                          >

                            <strong>
                              ${
                                staff.staff_name ||
                                '이름 없음'
                              }
                            </strong>

                            <span>
                              ${
                                staff.status ||
                                '근무중'
                              }
                            </span>

                          </div>


                          ${
                            staff.photo_url
                              ? `
                                <div
                                  style="
                                    margin:12px 0;
                                    text-align:center;
                                  "
                                >
                                  <img
                                    src="${staff.photo_url}"
                                    alt=""
                                    style="
                                      width:90px;
                                      height:90px;
                                      object-fit:cover;
                                      border-radius:14px;
                                    "
                                  >
                                </div>
                              `
                              : ''
                          }


                          <div
                            class="beauty-mobile-order-row"
                          >

                            <span>
                              직원명
                            </span>

                            <strong>
                              ${
                                staff.staff_name ||
                                '-'
                              }
                            </strong>

                          </div>


                          <div
  class="beauty-mobile-order-row"
>

  <span>
    직급
  </span>

  <strong>
    ${
      staff.position ||
      '-'
    }
  </strong>

</div>


<button
  type="button"
  class="beauty-mobile-staff-schedule"
  data-staff-id="${staff.id}"
>
  스케줄관리
</button>

                        </div>

                      `
                    )
                    .join('')
          }

              </div>


        <div
          class="beauty-mobile-staff-weekly"
        >

          <div
            class="beauty-mobile-staff-weekly-head"
          >

            <h2>
              주간 근무표
            </h2>

            <div
              class="beauty-mobile-staff-week-nav"
            >

              <button
                id="beauty-mobile-staff-prev-week"
                type="button"
              >
                이전주
              </button>

              <strong>
                ${beautyStaffWeekRangeText}
              </strong>

              <button
                id="beauty-mobile-staff-next-week"
                type="button"
              >
                다음주
              </button>

            </div>

          </div>


          <div
            class="beauty-mobile-staff-week-scroll"
          >

            
  <div
  class="beauty-mobile-staff-week-list"
>

  ${
    beautyStaffWeekDates
      .map(
        (date) => `

          <div
            class="beauty-mobile-staff-day"
          >

            <div
              class="beauty-mobile-staff-day-title"
            >
              <strong>
                ${date.dayLabel}
              </strong>

              <span>
                ${date.dateLabel}
              </span>
            </div>


            <div
              class="beauty-mobile-staff-day-workers"
            >

              ${
                staffList
                  .map(
                    (staff: any) => {

                      const isDayOff =
                        isBeautyMobileStaffDayOff(
                          Number(
                            staff.id
                          ),
                          date.dateValue
                        )


                      return `
                        <button
                          type="button"
                          class="
                            beauty-mobile-staff-day-worker
                            beauty-mobile-staff-week-button
                            ${
                              isDayOff
                                ? 'beauty-mobile-staff-week-off'
                                : ''
                            }
                          "
                          data-staff-id="${staff.id}"
                          data-date="${date.dateValue}"
                          data-current-status="${
                            isDayOff
                              ? 'OFF'
                              : 'WORK'
                          }"
                        >

                          <strong>
                            ${
                              staff.staff_name ||
                              '이름 없음'
                            }
                          </strong>

                          <span>
                            ${
                              isDayOff
                                ? 'OFF'
                                : '근무'
                            }
                          </span>

                        </button>
                      `

                    }
                  )
                  .join('')
              }

            </div>

          </div>

        `
      )
      .join('')
  }

</div>

          </div>

        </div>


      </main>

    </div>
  `


  document
    .querySelector(
      '#beauty-mobile-staff-home'
    )
    ?.addEventListener(
      'click',
      () => {

        location.href =
          '/merchant-app/home'

      }
    )

    document
    .querySelectorAll<HTMLButtonElement>(
      '.beauty-mobile-staff-schedule'
    )
    .forEach(
      (button) => {

        button.addEventListener(
          'click',
          () => {

            const staffId =
              button.dataset.staffId

            if (!staffId) {
              return
            }

            location.href =
  '/merchant-app/beauty/schedule?staff_id=' +
  encodeURIComponent(
    staffId
  )

          }
        )

      }
    )

    document
    .querySelectorAll<HTMLButtonElement>(
      '.beauty-mobile-staff-week-button'
    )
    .forEach(
      (button) => {

        button.addEventListener(
          'click',
          async () => {

            const staffId =
              Number(
                button.dataset.staffId ||
                0
              )

            const scheduleDate =
              button.dataset.date ||
              ''

            const currentStatus =
              button.dataset.currentStatus ||
              'WORK'


            if (
              !staffId ||
              !scheduleDate
            ) {
              return
            }


            button.disabled =
              true


            /* =========================
               OFF → 근무
            ========================= */

            if (
              currentStatus ===
              'OFF'
            ) {

              const {
                error: workError
              } =
                await supabase
                  .from(
                    'beauty_staff_schedule'
                  )
                  .delete()
                  .eq(
                    'merchant_id',
                    merchantId
                  )
                  .eq(
                    'staff_id',
                    staffId
                  )
                  .eq(
                    'schedule_date',
                    scheduleDate
                  )
                  .is(
                    'order_id',
                    null
                  )


              if (workError) {

                alert(
                  '근무 전환 실패: ' +
                  workError.message
                )

                button.disabled =
                  false

                return
              }


              button.dataset.currentStatus =
                'WORK'

                const statusText =
                button.querySelector<HTMLSpanElement>(
                  'span'
                )
              
              if (statusText) {
                statusText.textContent =
                  '근무'
              }

              button.classList.remove(
                'beauty-mobile-staff-week-off'
              )

              button.disabled =
                false

              return
            }


            /* =========================
               근무 → OFF
            ========================= */

            const {
              data: dayScheduleRows,
              error: dayScheduleError
            } =
              await supabase
                .from(
                  'beauty_staff_schedule'
                )
                .select(`
                  schedule_time,
                  status,
                  order_id
                `)
                .eq(
                  'merchant_id',
                  merchantId
                )
                .eq(
                  'staff_id',
                  staffId
                )
                .eq(
                  'schedule_date',
                  scheduleDate
                )


            if (dayScheduleError) {

              alert(
                '직원 스케줄 조회 실패: ' +
                dayScheduleError.message
              )

              button.disabled =
                false

              return
            }


            const reservationTimes =
              new Set<string>()


            ;(
              dayScheduleRows ||
              []
            ).forEach(
              (row: any) => {

                if (
                  row.order_id ||
                  row.status ===
                    '예약완료'
                ) {

                  reservationTimes.add(
                    String(
                      row.schedule_time ||
                      ''
                    ).slice(
                      0,
                      5
                    )
                  )

                }

              }
            )


            const offRows =
              beautyStaffDayTimes
                .filter(
                  (time) =>
                    !reservationTimes.has(
                      time
                    )
                )
                .map(
                  (time) => ({
                    merchant_id:
                      merchantId,

                    staff_id:
                      staffId,

                    schedule_date:
                      scheduleDate,

                    schedule_time:
                      time,

                    status:
                      '예약불가'
                  })
                )


            const {
              error: offError
            } =
              await supabase
                .from(
                  'beauty_staff_schedule'
                )
                .upsert(
                  offRows,
                  {
                    onConflict:
                      'staff_id,schedule_date,schedule_time'
                  }
                )


            if (offError) {

              alert(
                'OFF 설정 실패: ' +
                offError.message
              )

              button.disabled =
                false

              return
            }


            button.dataset.currentStatus =
              'OFF'

              const statusText =
              button.querySelector<HTMLSpanElement>(
                'span'
              )
            
            if (statusText) {
              statusText.textContent =
                'OFF'
            }

            button.classList.add(
              'beauty-mobile-staff-week-off'
            )

            button.disabled =
              false

          }
        )

      }
    )

    document
    .querySelector(
      '#beauty-mobile-staff-prev-week'
    )
    ?.addEventListener(
      'click',
      () => {

        sessionStorage.setItem(
          'beauty_mobile_staff_week_offset',
          String(
            beautyStaffWeekOffset - 1
          )
        )

        void renderBeautyStaffMobile()

      }
    )


  document
    .querySelector(
      '#beauty-mobile-staff-next-week'
    )
    ?.addEventListener(
      'click',
      () => {

        sessionStorage.setItem(
          'beauty_mobile_staff_week_offset',
          String(
            beautyStaffWeekOffset + 1
          )
        )

        void renderBeautyStaffMobile()

      }
    )

    document
  .querySelector(
    '#beauty-mobile-staff-create-open'
  )
  ?.addEventListener(
    'click',
    () => {

      document
        .querySelector(
          '#beauty-mobile-staff-create-modal'
        )
        ?.remove()

      document.body.insertAdjacentHTML(
        'beforeend',
        `
          <div
            id="beauty-mobile-staff-create-modal"
            class="merchant-mobile-product-modal"
          >

            <div
              class="merchant-mobile-product-modal-box"
            >

              <h2>
                직원 등록
              </h2>

              <label>
                직원 사진
              </label>

              <input
                id="beauty-mobile-staff-photo"
                type="file"
                accept="image/*"
              >

              <div
                id="beauty-mobile-staff-photo-preview"
                class="merchant-mobile-product-preview"
              >
                <span>
                  사진 미리보기
                </span>
              </div>

              <label>
                직원명
              </label>

              <input
                id="beauty-mobile-staff-name"
                type="text"
                placeholder="예: 김민지"
              >

              <label>
                직급
              </label>

              <select
                id="beauty-mobile-staff-position"
              >
                <option value="원장">원장</option>
                <option value="실장">실장</option>
                <option value="디자이너" selected>디자이너</option>
                <option value="네일리스트">네일리스트</option>
                <option value="관리사">관리사</option>
                <option value="타투이스트">타투이스트</option>
                <option value="기타">기타</option>
              </select>

              <div
                class="merchant-mobile-product-modal-actions"
              >

                <button
                  id="beauty-mobile-staff-create-save"
                  type="button"
                >
                  직원 등록
                </button>

                <button
                  id="beauty-mobile-staff-create-close"
                  type="button"
                >
                  닫기
                </button>

              </div>

            </div>

          </div>
        `
      )

      document
        .querySelector(
          '#beauty-mobile-staff-create-close'
        )
        ?.addEventListener(
          'click',
          () => {

            document
              .querySelector(
                '#beauty-mobile-staff-create-modal'
              )
              ?.remove()

          }
        )

        const photoInput =
        document.querySelector<HTMLInputElement>(
          '#beauty-mobile-staff-photo'
        )

      const photoPreview =
        document.querySelector<HTMLDivElement>(
          '#beauty-mobile-staff-photo-preview'
        )


      photoInput
        ?.addEventListener(
          'change',
          () => {

            const file =
              photoInput.files?.[0]

            if (
              !file ||
              !photoPreview
            ) {
              return
            }


            if (
              !file.type.startsWith(
                'image/'
              )
            ) {

              alert(
                '이미지 파일만 선택할 수 있습니다.'
              )

              photoInput.value = ''

              return
            }


            const previewUrl =
              URL.createObjectURL(
                file
              )


            photoPreview.innerHTML = `
              <img
                src="${previewUrl}"
                alt=""
                style="
                  width:100%;
                  height:100%;
                  object-fit:cover;
                "
              >
            `

          }
        )


      document
        .querySelector(
          '#beauty-mobile-staff-create-save'
        )
        ?.addEventListener(
          'click',
          async () => {

            const staffName =
              (
                document.querySelector<HTMLInputElement>(
                  '#beauty-mobile-staff-name'
                )?.value || ''
              ).trim()


            const position =
              document.querySelector<HTMLSelectElement>(
                '#beauty-mobile-staff-position'
              )?.value ||
              '디자이너'


            const photoFile =
              photoInput?.files?.[0]


            if (!staffName) {

              alert(
                '직원명을 입력해주세요.'
              )

              return
            }


            if (!photoFile) {

              alert(
                '직원 사진을 선택해주세요.'
              )

              return
            }


            const saveButton =
              document.querySelector<HTMLButtonElement>(
                '#beauty-mobile-staff-create-save'
              )


            if (saveButton) {

              saveButton.disabled =
                true

              saveButton.textContent =
                '등록 중...'

            }


            const extension =
              photoFile.name
                .split('.')
                .pop()
                ?.toLowerCase() ||
              'jpg'


            const filePath =
              merchantId +
              '/' +
              Date.now() +
              '-' +
              crypto.randomUUID() +
              '.' +
              extension


            const {
              error: uploadError
            } =
              await supabase.storage
                .from(
                  'beauty-staff'
                )
                .upload(
                  filePath,
                  photoFile,
                  {
                    cacheControl:
                      '3600',

                    upsert:
                      false
                  }
                )


            if (uploadError) {

              alert(
                '직원 사진 업로드 실패: ' +
                uploadError.message
              )


              if (saveButton) {

                saveButton.disabled =
                  false

                saveButton.textContent =
                  '직원 등록'

              }

              return
            }


            const {
              data: publicUrlData
            } =
              supabase.storage
                .from(
                  'beauty-staff'
                )
                .getPublicUrl(
                  filePath
                )


            const photoUrl =
              publicUrlData.publicUrl


            const {
              error: insertError
            } =
              await supabase
                .from(
                  'beauty_staff'
                )
                .insert({
                  merchant_id:
                    merchantId,

                  staff_name:
                    staffName,

                  position:
                    position,

                  photo_url:
                    photoUrl,

                  phone:
                    '',

                  work_start:
                    '10:00',

                  work_end:
                    '19:00',

                  break_start:
                    null,

                  break_end:
                    null,

                  off_days:
                    [],

                  status:
                    '근무중'
                })


            if (insertError) {

              await supabase.storage
                .from(
                  'beauty-staff'
                )
                .remove([
                  filePath
                ])


              alert(
                '직원 등록 실패: ' +
                insertError.message
              )


              if (saveButton) {

                saveButton.disabled =
                  false

                saveButton.textContent =
                  '직원 등록'

              }

              return
            }


            alert(
              '직원이 등록되었습니다.'
            )


            document
              .querySelector(
                '#beauty-mobile-staff-create-modal'
              )
              ?.remove()


            void renderBeautyStaffMobile()

          }
        )

    }
  )

}

/* =========================================
   뷰티 모바일 직원 스케줄관리
========================================= */

async function renderBeautyScheduleMobile() {

  const merchantIdText =
    sessionStorage.getItem(
      'login_merchant_id'
    ) ||
    localStorage.getItem(
      'login_merchant_id'
    )

  if (!merchantIdText) {

    location.replace(
      '/merchant-app'
    )

    return
  }


  const merchantId =
    Number(
      merchantIdText
    )


  const merchantName =
    sessionStorage.getItem(
      'login_merchant_name'
    ) ||
    localStorage.getItem(
      'login_merchant_name'
    ) ||
    '가맹점'


  const params =
    new URLSearchParams(
      window.location.search
    )


  const staffId =
    Number(
      params.get(
        'staff_id'
      ) || 0
    )


  if (!staffId) {

    location.href =
      '/merchant-app/beauty/staff'

    return
  }


  const getBeautyMobileDate =
    (
      date: Date
    ) => {

      return new Intl.DateTimeFormat(
        'en-CA',
        {
          timeZone:
            'Asia/Seoul',

          year:
            'numeric',

          month:
            '2-digit',

          day:
            '2-digit'
        }
      ).format(
        date
      )

    }


  const today =
    getBeautyMobileDate(
      new Date()
    )


  const scheduleDate =
    params.get(
      'date'
    ) ||
    today


  const {
    data: staff,
    error: staffError
  } =
    await supabase
      .from(
        'beauty_staff'
      )
      .select(
        'id, staff_name, position, photo_url'
      )
      .eq(
        'merchant_id',
        merchantId
      )
      .eq(
        'id',
        staffId
      )
      .single()


  if (
    staffError ||
    !staff
  ) {

    alert(
      '직원 정보를 불러오지 못했습니다.'
    )

    location.href =
      '/merchant-app/beauty/staff'

    return
  }


  const {
    data: scheduleRows,
    error: scheduleError
  } =
    await supabase
      .from(
        'beauty_staff_schedule'
      )
      .select(`
        schedule_time,
        status,
        order_id
      `)
      .eq(
        'merchant_id',
        merchantId
      )
      .eq(
        'staff_id',
        staffId
      )
      .eq(
        'schedule_date',
        scheduleDate
      )


  if (scheduleError) {

    alert(
      '스케줄 조회 실패: ' +
      scheduleError.message
    )

    return
  }


  const scheduleMap =
    new Map<
      string,
      any
    >()


  ;(
    scheduleRows || []
  ).forEach(
    (
      row: any
    ) => {

      const time =
        String(
          row.schedule_time ||
          ''
        ).slice(
          0,
          5
        )

      if (time) {

        scheduleMap.set(
          time,
          row
        )

      }

    }
  )


  const times: string[] =
    []


  for (
    let minutes = 0;
    minutes < 24 * 60;
    minutes += 30
  ) {

    const hour =
      String(
        Math.floor(
          minutes / 60
        )
      ).padStart(
        2,
        '0'
      )


    const minute =
      String(
        minutes % 60
      ).padStart(
        2,
        '0'
      )


    times.push(
      hour +
      ':' +
      minute
    )

  }


  app.innerHTML = `
    <div class="merchant-mobile-home">

      <header class="merchant-mobile-header">

        <div>

          <div class="merchant-mobile-brand">
            NXG PICK
          </div>

          <div class="merchant-mobile-store">
            ${merchantName}
          </div>

        </div>


        <button
          id="beauty-mobile-schedule-back"
          class="merchant-mobile-logout"
          type="button"
        >
          이전
        </button>

      </header>


      <main class="merchant-mobile-content">

        <div class="merchant-mobile-page-title">

          <h1>
            스케줄관리
          </h1>

          <span>
            ${staff.staff_name}
          </span>

        </div>


        <div
          style="
            background:#ffffff;
            border:1px solid #e0e6ef;
            border-radius:16px;
            padding:16px;
            margin-bottom:14px;
          "
        >

          <strong
            style="
              display:block;
              font-size:18px;
              margin-bottom:4px;
            "
          >
            ${staff.staff_name}
          </strong>

          <span
            style="
              color:#7a8595;
              font-size:13px;
            "
          >
            ${staff.position || '-'}
          </span>

        </div>


        <div
          class="merchant-mobile-date-nav"
        >

          <button
            id="beauty-mobile-schedule-prev"
            type="button"
          >
            이전
          </button>

          <button
            id="beauty-mobile-schedule-today"
            type="button"
          >
            오늘
          </button>

          <button
            id="beauty-mobile-schedule-next"
            type="button"
          >
            다음
          </button>

          <button
            id="beauty-mobile-schedule-reset"
            type="button"
          >
            리셋
          </button>

        </div>


        <input
          id="beauty-mobile-schedule-date"
          type="date"
          value="${scheduleDate}"
          style="
            width:100%;
            height:44px;
            margin-top:10px;
            padding:0 12px;
            border:1px solid #d7e0eb;
            border-radius:10px;
            background:#ffffff;
            box-sizing:border-box;
          "
        >


        <div
          style="
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:8px;
            margin:14px 0;
          "
        >

          <button
            id="beauty-mobile-schedule-all-on"
            type="button"
            class="merchant-mobile-btn-primary"
          >
            전체 ON
          </button>

          <button
            id="beauty-mobile-schedule-all-off"
            type="button"
            class="merchant-mobile-btn-secondary"
          >
            전체 OFF
          </button>

        </div>


        <div
  style="
    display:grid;
    grid-template-columns:repeat(2, minmax(0, 1fr));
    gap:7px;
    padding-bottom:30px;
  "
>

          ${
            times
              .map(
                (
                  time
                ) => {

                  const row =
                    scheduleMap.get(
                      time
                    )


                  const status =
                    String(
                      row?.status ||
                      '예약가능'
                    )


                  const orderLinked =
                    !!row?.order_id


                  const statusColor =
                    status ===
                    '예약가능'
                      ? '#15803d'
                      : status ===
                          '예약불가'
                        ? '#dc2626'
                        : status ===
                            '예약완료'
                          ? '#2563eb'
                          : '#ca8a04'


                  return `
                    <div
  style="
    display:grid;
    grid-template-columns:48px minmax(0, 1fr);
    align-items:center;
    gap:5px;
    min-height:50px;
    padding:6px 7px;
    background:#ffffff;
    border:1px solid #e0e6ef;
    border-radius:10px;
  "
>

                      <strong
  style="
    text-align:center;
    font-size:12px;
  "
>
  ${time}
</strong>


                      <select
                        class="beauty-mobile-schedule-status"
                        data-time="${time}"
                        data-order-linked="${
                          orderLinked
                            ? 'true'
                            : 'false'
                        }"
                        style="
                          width:100%;
                          height:40px;
                          padding:0 10px;
                          border:1px solid #d7e0eb;
                          border-radius:9px;
                          background:#ffffff;
                          color:${statusColor};
                          font-size:11px;
                          font-weight:800;
                        "
                      >

                        <option
                          value="예약가능"
                          ${
                            status ===
                            '예약가능'
                              ? 'selected'
                              : ''
                          }
                        >
                          예약가능
                        </option>

                        <option
                          value="예약불가"
                          ${
                            status ===
                            '예약불가'
                              ? 'selected'
                              : ''
                          }
                        >
                          예약불가
                        </option>

                        <option
                          value="휴게"
                          ${
                            status ===
                            '휴게'
                              ? 'selected'
                              : ''
                          }
                        >
                          휴게
                        </option>

                        <option
                          value="예약완료"
                          ${
                            status ===
                            '예약완료'
                              ? 'selected'
                              : ''
                          }
                        >
                          예약완료
                        </option>

                      </select>

                    </div>
                  `

                }
              )
              .join('')
          }

        </div>

      </main>

    </div>
  `


  const moveScheduleDate =
    (
      amount: number
    ) => {

      const date =
        new Date(
          scheduleDate +
          'T00:00:00+09:00'
        )

      date.setDate(
        date.getDate() +
        amount
      )

      const nextDate =
        getBeautyMobileDate(
          date
        )

      location.href =
        '/merchant-app/beauty/schedule' +
        '?staff_id=' +
        encodeURIComponent(
          String(
            staffId
          )
        ) +
        '&date=' +
        encodeURIComponent(
          nextDate
        )

    }


  document
    .querySelector(
      '#beauty-mobile-schedule-back'
    )
    ?.addEventListener(
      'click',
      () => {

        location.href =
          '/merchant-app/beauty/staff'

      }
    )


  document
    .querySelector(
      '#beauty-mobile-schedule-prev'
    )
    ?.addEventListener(
      'click',
      () => {

        moveScheduleDate(
          -1
        )

      }
    )


  document
    .querySelector(
      '#beauty-mobile-schedule-next'
    )
    ?.addEventListener(
      'click',
      () => {

        moveScheduleDate(
          1
        )

      }
    )


  document
    .querySelector(
      '#beauty-mobile-schedule-today'
    )
    ?.addEventListener(
      'click',
      () => {

        location.href =
          '/merchant-app/beauty/schedule' +
          '?staff_id=' +
          encodeURIComponent(
            String(
              staffId
            )
          ) +
          '&date=' +
          encodeURIComponent(
            today
          )

      }
    )


  document
    .querySelector<HTMLInputElement>(
      '#beauty-mobile-schedule-date'
    )
    ?.addEventListener(
      'change',
      (
        event
      ) => {

        const date =
          (
            event.target as HTMLInputElement
          ).value

        if (!date) {
          return
        }

        location.href =
          '/merchant-app/beauty/schedule' +
          '?staff_id=' +
          encodeURIComponent(
            String(
              staffId
            )
          ) +
          '&date=' +
          encodeURIComponent(
            date
          )

      }
    )


  const getStatusColor =
    (
      status: string
    ) => {

      if (
        status ===
        '예약가능'
      ) {
        return '#15803d'
      }

      if (
        status ===
        '예약불가'
      ) {
        return '#dc2626'
      }

      if (
        status ===
        '예약완료'
      ) {
        return '#2563eb'
      }

      return '#ca8a04'

    }


  document
    .querySelectorAll<HTMLSelectElement>(
      '.beauty-mobile-schedule-status'
    )
    .forEach(
      (
        select
      ) => {

        select.addEventListener(
          'change',
          async () => {

            const time =
              select.dataset.time ||
              ''

            const status =
              select.value


            if (!time) {
              return
            }


            select.disabled =
              true


            const {
              error
            } =
              await supabase
                .from(
                  'beauty_staff_schedule'
                )
                .upsert(
                  {
                    merchant_id:
                      merchantId,

                    staff_id:
                      staffId,

                    schedule_date:
                      scheduleDate,

                    schedule_time:
                      time,

                    status:
                      status
                  },
                  {
                    onConflict:
                      'staff_id,schedule_date,schedule_time'
                  }
                )


            if (error) {

              alert(
                '스케줄 저장 실패: ' +
                error.message
              )

              select.disabled =
                false

              return
            }


            select.style.color =
              getStatusColor(
                status
              )


            select.disabled =
              false

          }
        )

      }
    )


  const setAllSchedule =
    async (
      status:
        '예약가능' |
        '예약불가'
    ) => {

      const selects =
        Array.from(
          document.querySelectorAll<HTMLSelectElement>(
            '.beauty-mobile-schedule-status'
          )
        )


      const editableSelects =
        selects.filter(
          (
            select
          ) =>
            select.dataset
              .orderLinked !==
            'true'
        )


      if (
        editableSelects.length ===
        0
      ) {
        return
      }


      const rows =
        editableSelects.map(
          (
            select
          ) => ({

            merchant_id:
              merchantId,

            staff_id:
              staffId,

            schedule_date:
              scheduleDate,

            schedule_time:
              select.dataset.time,

            status:
              status

          })
        )


      const {
        error
      } =
        await supabase
          .from(
            'beauty_staff_schedule'
          )
          .upsert(
            rows,
            {
              onConflict:
                'staff_id,schedule_date,schedule_time'
            }
          )


      if (error) {

        alert(
          '전체 스케줄 저장 실패: ' +
          error.message
        )

        return
      }


      editableSelects.forEach(
        (
          select
        ) => {

          select.value =
            status

          select.style.color =
            getStatusColor(
              status
            )

        }
      )

    }


  document
    .querySelector(
      '#beauty-mobile-schedule-all-on'
    )
    ?.addEventListener(
      'click',
      async () => {

        await setAllSchedule(
          '예약가능'
        )

      }
    )


  document
    .querySelector(
      '#beauty-mobile-schedule-all-off'
    )
    ?.addEventListener(
      'click',
      async () => {

        await setAllSchedule(
          '예약불가'
        )

      }
    )


  document
    .querySelector(
      '#beauty-mobile-schedule-reset'
    )
    ?.addEventListener(
      'click',
      async () => {

        if (
          !confirm(
            '예약완료 시간을 제외하고 스케줄을 초기화할까요?'
          )
        ) {
          return
        }


        const {
          error
        } =
          await supabase
            .from(
              'beauty_staff_schedule'
            )
            .delete()
            .eq(
              'merchant_id',
              merchantId
            )
            .eq(
              'staff_id',
              staffId
            )
            .eq(
              'schedule_date',
              scheduleDate
            )
            .is(
              'order_id',
              null
            )


        if (error) {

          alert(
            '스케줄 초기화 실패: ' +
            error.message
          )

          return
        }


        document
          .querySelectorAll<HTMLSelectElement>(
            '.beauty-mobile-schedule-status'
          )
          .forEach(
            (
              select
            ) => {

              if (
                select.dataset
                  .orderLinked ===
                'true'
              ) {
                return
              }

              select.value =
                '예약가능'

              select.style.color =
                '#15803d'

            }
          )

      }
    )

}

  /* =========================================
   모바일 상품관리
========================================= */

async function renderMerchantProducts() {

    const merchantIdText =
      sessionStorage.getItem(
        'login_merchant_id'
      ) ||
      localStorage.getItem(
        'login_merchant_id'
      )
  
    if (!merchantIdText) {
      location.replace(
        '/merchant-app'
      )
      return
    }
  
  
    const merchantId =
      Number(
        merchantIdText
      )
  
  
    const merchantName =
      sessionStorage.getItem(
        'login_merchant_name'
      ) ||
      localStorage.getItem(
        'login_merchant_name'
      ) ||
      '가맹점'
      const merchantType =
  sessionStorage.getItem(
    'login_merchant_type'
  ) ||
  localStorage.getItem(
    'login_merchant_type'
  ) ||
  '일반매장'

const isBeauty =
  merchantType === '뷰티'
  
  
    app.innerHTML = `
      <div class="merchant-mobile-home">
  
        <header class="merchant-mobile-header">
  
          <div>
  
            <div class="merchant-mobile-brand">
              NXG PICK
            </div>
  
            <div class="merchant-mobile-store">
              ${merchantName}
            </div>
  
          </div>
  
          <button
            id="mobile-product-home"
            class="merchant-mobile-logout"
            type="button"
          >
            홈
          </button>
  
        </header>
  
  
        <main class="merchant-mobile-content">
  
          <div class="merchant-mobile-page-title">
  
            <h1>
              상품관리
            </h1>
  
            <span>
              상품 등록 및 수정
            </span>
  
          </div>
  
          <button
  id="mobile-product-create-open"
  type="button"
  class="merchant-mobile-product-create-open"
>
  + 상품 등록
</button>

          <div
            id="mobile-product-list"
          >
            상품을 불러오는 중입니다.
          </div>
  
        </main>
  
      </div>
    `
  
  
    document
      .querySelector(
        '#mobile-product-home'
      )
      ?.addEventListener(
        'click',
        () => {
          location.href =
            '/merchant-app/home'
        }
      )
  
      document
  .querySelector(
    '#mobile-product-create-open'
  )
  ?.addEventListener(
    'click',
    () => {

      document
        .querySelector(
          '#merchant-mobile-product-modal'
        )
        ?.remove()


      document.body.insertAdjacentHTML(
        'beforeend',
        `
          <div
            id="merchant-mobile-product-modal"
            class="merchant-mobile-product-modal"
          >

            <div
              class="merchant-mobile-product-modal-box"
            >

              <h2>
                상품 등록
              </h2>


              <label>
                상품명
              </label>

              <input
                id="mobile-product-name"
                type="text"
                placeholder="상품명"
              >


              <label>
                가격
              </label>

              <input
                id="mobile-product-price"
                type="number"
                placeholder="가격"
              >


              ${
                isBeauty
                  ? ''
                  : `
                    <label>
                      카테고리
                    </label>
              
                    <input
                      id="mobile-product-category"
                      type="text"
                      placeholder="카테고리 직접 입력"
                    >
                  `
              }


              <label>
                상품 이미지
              </label>

              <input
                id="mobile-product-image-file"
                type="file"
                accept="image/*"
              >


              <div
                class="merchant-mobile-product-preview"
              >
                <span
                  id="mobile-product-preview-text"
                >
                  이미지 미리보기
                </span>

                <img
                  id="mobile-product-preview"
                  alt=""
                  style="display:none;"
                >
              </div>


              <div
                class="merchant-mobile-product-modal-actions"
              >

                <button
                  id="mobile-product-create"
                  type="button"
                >
                  등록
                </button>

                <button
                  id="mobile-product-create-close"
                  type="button"
                >
                  닫기
                </button>

              </div>

            </div>

          </div>
        `
      )


      const imageInput =
        document.querySelector<HTMLInputElement>(
          '#mobile-product-image-file'
        )


      imageInput
        ?.addEventListener(
          'change',
          () => {

            const file =
              imageInput.files?.[0]

            if (!file) {
              return
            }


            const preview =
              document.querySelector<HTMLImageElement>(
                '#mobile-product-preview'
              )

            const previewText =
              document.querySelector<HTMLElement>(
                '#mobile-product-preview-text'
              )


            if (preview) {

              preview.src =
                URL.createObjectURL(
                  file
                )

              preview.style.display =
                'block'

            }


            if (previewText) {

              previewText.style.display =
                'none'

            }

          }
        )


      document
        .querySelector(
          '#mobile-product-create-close'
        )
        ?.addEventListener(
          'click',
          () => {

            document
              .querySelector(
                '#merchant-mobile-product-modal'
              )
              ?.remove()

          }
        )


      document
        .querySelector(
          '#mobile-product-create'
        )
        ?.addEventListener(
          'click',
          async () => {

            const productName =
              (
                document.querySelector<HTMLInputElement>(
                  '#mobile-product-name'
                )?.value || ''
              ).trim()


            const price =
              Number(
                document.querySelector<HTMLInputElement>(
                  '#mobile-product-price'
                )?.value || 0
              )


              const category =
              isBeauty
                ? '뷰티서비스'
                : (
                    document.querySelector<HTMLInputElement>(
                      '#mobile-product-category'
                    )?.value.trim() ||
                    '기타'
                  )


            const imageFile =
              document.querySelector<HTMLInputElement>(
                '#mobile-product-image-file'
              )?.files?.[0]


            if (
              !productName ||
              !price
            ) {

              alert(
                '상품명과 가격을 입력해주세요.'
              )

              return
            }


            let imageUrl = ''


            if (imageFile) {

              const fileExt =
                imageFile.name
                  .split('.')
                  .pop() ||
                'png'


              const fileName =
                Date.now() +
                '_product.' +
                fileExt


              const {
                error: uploadError
              } =
                await supabase.storage
                  .from(
                    'merchant-files'
                  )
                  .upload(
                    fileName,
                    imageFile
                  )


              if (uploadError) {

                alert(
                  '상품 이미지 업로드 실패: ' +
                  uploadError.message
                )

                return
              }


              const {
                data
              } =
                supabase.storage
                  .from(
                    'merchant-files'
                  )
                  .getPublicUrl(
                    fileName
                  )


              imageUrl =
                data.publicUrl

            }


            const {
              error
            } =
              await supabase
                .from(
                  'products'
                )
                .insert({
                  merchant_id:
                    merchantId,

                  product_name:
                    productName,

                  price:
                    price,

                  category:
                    category,

                  image_url:
                    imageUrl,

                  status:
                    '판매중'
                })


            if (error) {

              alert(
                '상품 등록 실패: ' +
                error.message
              )

              return
            }


            alert(
              '상품이 등록되었습니다.'
            )

            document
              .querySelector(
                '#merchant-mobile-product-modal'
              )
              ?.remove()


            void renderMerchantProducts()

          }
        )

    }
  )
  
    const {
      data,
      error
    } =
      await supabase
        .from('products')
        .select('*')
        .eq(
          'merchant_id',
          merchantId
        )
        .order(
          'sort_order',
          {
            ascending: true
          }
        )
        .order(
          'id',
          {
            ascending: true
          }
        )
  
  
    const productList =
      document.querySelector<HTMLDivElement>(
        '#mobile-product-list'
      )
  
  
    if (!productList) {
      return
    }
  
  
    if (error) {
  
      productList.innerHTML = `
        상품 조회 실패 :
        ${error.message}
      `
  
      return
    }
  
  
    const products =
      data || []
  
  
    if (
      products.length === 0
    ) {
  
      productList.innerHTML = `
        등록된 상품이 없습니다.
      `
  
      return
    }
  
  
    productList.innerHTML =
  products
    .map(
      (product: any) => {

        const status =
          product.status ||
          '판매중'

        return `
          <div
            class="merchant-mobile-product-card"
          >

            <div
              class="merchant-mobile-product-image"
            >
              ${
                product.image_url
                  ? `
                    <img
                      src="${product.image_url}"
                      alt="${product.product_name || ''}"
                    >
                  `
                  : `
                    <span>
                      이미지 없음
                    </span>
                  `
              }
            </div>


            <div
              class="merchant-mobile-product-info"
            >

              <strong
                class="merchant-mobile-product-name"
              >
                ${
                  product.product_name ||
                  '-'
                }
              </strong>

              <span
                class="merchant-mobile-product-category"
              >
                ${
                  product.category ||
                  '기타'
                }
              </span>

              <strong
                class="merchant-mobile-product-price"
              >
                ${
                  Number(
                    product.price || 0
                  ).toLocaleString()
                }원
              </strong>


      <div
  class="merchant-mobile-product-actions"
>

  <button
    type="button"
    class="merchant-mobile-product-edit"
    data-id="${product.id}"
  >
    수정
  </button>

  <button
    type="button"
    class="
      merchant-mobile-product-status
      ${
        status === '판매중'
          ? 'active'
          : 'stop'
      }
    "
    data-id="${product.id}"
    data-status="${status}"
  >
    ${status}
  </button>

</div>


<div
  class="merchant-mobile-product-order-actions"
>

  <button
    type="button"
    class="merchant-mobile-product-up"
    data-id="${product.id}"
  >
    ▲ 위
  </button>

  <button
    type="button"
    class="merchant-mobile-product-down"
    data-id="${product.id}"
  >
    ▼ 아래
  </button>

  <button
    type="button"
    class="merchant-mobile-product-delete"
    data-id="${product.id}"
  >
    삭제
  </button>

</div>

            </div>

          </div>
        `
      }
    )
    .join('')

    document
  .querySelectorAll<HTMLButtonElement>(
    '.merchant-mobile-product-status'
  )
  .forEach(
    (button) => {

      button.addEventListener(
        'click',
        async () => {

          const productId =
            Number(
              button.dataset.id || 0
            )

          const currentStatus =
            button.dataset.status ||
            '판매중'

          const nextStatus =
            currentStatus ===
            '판매중'
              ? '판매중지'
              : '판매중'


          const {
            error
          } =
            await supabase
              .from('products')
              .update({
                status:
                  nextStatus
              })
              .eq(
                'id',
                productId
              )


          if (error) {

            alert(
              '상태 변경 실패: ' +
              error.message
            )

            return
          }


          button.dataset.status =
            nextStatus

          button.textContent =
            nextStatus

          button.classList.toggle(
            'active',
            nextStatus === '판매중'
          )

          button.classList.toggle(
            'stop',
            nextStatus === '판매중지'
          )

        }
      )

    }
  )
  document
  .querySelectorAll<HTMLButtonElement>(
    '.merchant-mobile-product-edit'
  )
  .forEach(
    (button) => {

      button.addEventListener(
        'click',
        () => {

          const productId =
            Number(
              button.dataset.id || 0
            )

          const product =
            products.find(
              (item: any) =>
                Number(item.id) ===
                productId
            )


          if (!product) {
            return
          }


          document
            .querySelector(
              '#merchant-mobile-product-edit-modal'
            )
            ?.remove()


          document.body.insertAdjacentHTML(
            'beforeend',
            `
              <div
                id="merchant-mobile-product-edit-modal"
                class="merchant-mobile-product-modal"
              >

                <div
                  class="merchant-mobile-product-modal-box"
                >

                  <h2>
                    상품 수정
                  </h2>


                  <label>
                    상품명
                  </label>

                  <input
                    id="mobile-product-edit-name"
                    type="text"
                    value="${product.product_name || ''}"
                  >


                  <label>
                    가격
                  </label>

                  <input
                    id="mobile-product-edit-price"
                    type="number"
                    value="${Number(
                      product.price || 0
                    )}"
                  >


                  ${
                    isBeauty
                      ? ''
                      : `
                        <label>
                          카테고리
                        </label>

                        <input
                          id="mobile-product-edit-category"
                          type="text"
                          value="${product.category || ''}"
                        >
                      `
                  }


                  <label>
                    상품 이미지
                  </label>

                  <input
                    id="mobile-product-edit-image-file"
                    type="file"
                    accept="image/*"
                  >


                  <div
                    class="merchant-mobile-product-preview"
                  >

                    ${
                      product.image_url
                        ? `
                          <img
                            id="mobile-product-edit-preview"
                            src="${product.image_url}"
                            alt=""
                          >
                        `
                        : `
                          <span
                            id="mobile-product-edit-preview-text"
                          >
                            이미지 미리보기
                          </span>

                          <img
                            id="mobile-product-edit-preview"
                            alt=""
                            style="display:none;"
                          >
                        `
                    }

                  </div>


                  <div
                    class="merchant-mobile-product-modal-actions"
                  >

                    <button
                      id="mobile-product-edit-save"
                      type="button"
                    >
                      저장
                    </button>

                    <button
                      id="mobile-product-edit-close"
                      type="button"
                    >
                      닫기
                    </button>

                  </div>

                </div>

              </div>
            `
          )


          const imageInput =
            document.querySelector<HTMLInputElement>(
              '#mobile-product-edit-image-file'
            )


          imageInput
            ?.addEventListener(
              'change',
              () => {

                const file =
                  imageInput.files?.[0]

                if (!file) {
                  return
                }


                const preview =
                  document.querySelector<HTMLImageElement>(
                    '#mobile-product-edit-preview'
                  )

                const previewText =
                  document.querySelector<HTMLElement>(
                    '#mobile-product-edit-preview-text'
                  )


                if (preview) {

                  preview.src =
                    URL.createObjectURL(
                      file
                    )

                  preview.style.display =
                    'block'

                }


                if (previewText) {

                  previewText.style.display =
                    'none'

                }

              }
            )


          document
            .querySelector(
              '#mobile-product-edit-close'
            )
            ?.addEventListener(
              'click',
              () => {

                document
                  .querySelector(
                    '#merchant-mobile-product-edit-modal'
                  )
                  ?.remove()

              }
            )


          document
            .querySelector(
              '#mobile-product-edit-save'
            )
            ?.addEventListener(
              'click',
              async () => {

                const productName =
                  (
                    document.querySelector<HTMLInputElement>(
                      '#mobile-product-edit-name'
                    )?.value || ''
                  ).trim()


                const price =
                  Number(
                    document.querySelector<HTMLInputElement>(
                      '#mobile-product-edit-price'
                    )?.value || 0
                  )


                const category =
                  isBeauty
                    ? (
                        product.category ||
                        '뷰티서비스'
                      )
                    : (
                        document.querySelector<HTMLInputElement>(
                          '#mobile-product-edit-category'
                        )?.value.trim() ||
                        '기타'
                      )


                if (
                  !productName ||
                  !price
                ) {

                  alert(
                    '상품명과 가격을 입력해주세요.'
                  )

                  return
                }


                let imageUrl =
                  product.image_url || ''


                const newImageFile =
                  document.querySelector<HTMLInputElement>(
                    '#mobile-product-edit-image-file'
                  )?.files?.[0]


                if (newImageFile) {

                  const fileExt =
                    newImageFile.name
                      .split('.')
                      .pop() ||
                    'png'


                  const fileName =
                    Date.now() +
                    '_product_edit.' +
                    fileExt


                  const {
                    error: uploadError
                  } =
                    await supabase.storage
                      .from(
                        'merchant-files'
                      )
                      .upload(
                        fileName,
                        newImageFile
                      )


                  if (uploadError) {

                    alert(
                      '이미지 업로드 실패: ' +
                      uploadError.message
                    )

                    return
                  }


                  const {
                    data
                  } =
                    supabase.storage
                      .from(
                        'merchant-files'
                      )
                      .getPublicUrl(
                        fileName
                      )


                  imageUrl =
                    data.publicUrl

                }


                const {
                  error
                } =
                  await supabase
                    .from(
                      'products'
                    )
                    .update({
                      product_name:
                        productName,

                      price:
                        price,

                      category:
                        category,

                      image_url:
                        imageUrl
                    })
                    .eq(
                      'id',
                      productId
                    )


                if (error) {

                  alert(
                    '상품 수정 실패: ' +
                    error.message
                  )

                  return
                }


                alert(
                  '상품이 수정되었습니다.'
                )


                document
                  .querySelector(
                    '#merchant-mobile-product-edit-modal'
                  )
                  ?.remove()


                void renderMerchantProducts()

              }
            )

        }
      )

    }
  )
  const moveMobileProduct = async (
    productId: number,
    direction: 'up' | 'down'
  ) => {
  
    const currentIndex =
      products.findIndex(
        (product: any) =>
          Number(product.id) ===
          productId
      )
  
  
    if (currentIndex < 0) {
      return
    }
  
  
    const targetIndex =
      direction === 'up'
        ? currentIndex - 1
        : currentIndex + 1
  
  
    if (
      targetIndex < 0 ||
      targetIndex >= products.length
    ) {
      return
    }
  
  
    const reordered =
      [...products]
  
  
    const temp =
      reordered[currentIndex]
  
    reordered[currentIndex] =
      reordered[targetIndex]
  
    reordered[targetIndex] =
      temp
  
  
    for (
      let i = 0;
      i < reordered.length;
      i++
    ) {
  
      const {
        error
      } =
        await supabase
          .from('products')
          .update({
            sort_order:
              i + 1
          })
          .eq(
            'id',
            reordered[i].id
          )
  
  
      if (error) {
  
        alert(
          '상품 순서 변경 실패: ' +
          error.message
        )
  
        return
      }
  
    }
  
  
    void renderMerchantProducts()
  }
  
  
  document
    .querySelectorAll<HTMLButtonElement>(
      '.merchant-mobile-product-up'
    )
    .forEach(
      (button) => {
  
        button.addEventListener(
          'click',
          async () => {
  
            await moveMobileProduct(
              Number(
                button.dataset.id || 0
              ),
              'up'
            )
  
          }
        )
  
      }
    )
  
  
  document
    .querySelectorAll<HTMLButtonElement>(
      '.merchant-mobile-product-down'
    )
    .forEach(
      (button) => {
  
        button.addEventListener(
          'click',
          async () => {
  
            await moveMobileProduct(
              Number(
                button.dataset.id || 0
              ),
              'down'
            )
  
          }
        )
  
      }
    )
  
  
  document
    .querySelectorAll<HTMLButtonElement>(
      '.merchant-mobile-product-delete'
    )
    .forEach(
      (button) => {
  
        button.addEventListener(
          'click',
          async () => {
  
            const productId =
              Number(
                button.dataset.id || 0
              )
  
  
            if (
              !confirm(
                '정말 이 상품을 삭제할까요?'
              )
            ) {
              return
            }
  
  
            const {
              error
            } =
              await supabase
                .from('products')
                .delete()
                .eq(
                  'id',
                  productId
                )
  
  
            if (error) {
  
              alert(
                '상품 삭제 실패: ' +
                error.message
              )
  
              return
            }
  
  
            alert(
              '상품이 삭제되었습니다.'
            )
  
  
            void renderMerchantProducts()
  
          }
        )
  
      }
    )
  }

  /* =========================================
   모바일 PICK QR
========================================= */

async function renderMerchantQr() {

    const merchantIdText =
      sessionStorage.getItem(
        'login_merchant_id'
      ) ||
      localStorage.getItem(
        'login_merchant_id'
      )
  
  
    if (!merchantIdText) {
  
      location.replace(
        '/merchant-app'
      )
  
      return
    }
  
  
    const merchantId =
      Number(
        merchantIdText
      )
  
  
    const merchantName =
      sessionStorage.getItem(
        'login_merchant_name'
      ) ||
      localStorage.getItem(
        'login_merchant_name'
      ) ||
      '가맹점'
  
  
    const merchantType =
      sessionStorage.getItem(
        'login_merchant_type'
      ) ||
      localStorage.getItem(
        'login_merchant_type'
      ) ||
      '일반매장'
  
  
    const kioskUrl =
      merchantType === '아카데미'
        ? (
            apiBaseUrl +
            '/academy-chrome?merchant_id=' +
            merchantId
          )
        : (
            'https://nxgsoft.co.kr/pay/?merchant_id=' +
            merchantId
          )

          const {
            data: qrTemplateMerchant,
            error: qrTemplateError
          } =
            await supabase
              .from('merchants')
              .select('qr_template_key')
              .eq(
                'id',
                merchantId
              )
              .maybeSingle()
          
          
          if (qrTemplateError) {
          
            console.error(
              'QR 디자인 조회 실패:',
              qrTemplateError
            )
          
          }
          
          
          const selectedQrTemplateKey =
            qrTemplateMerchant?.qr_template_key ||
            'default'

            const selectedQrPosterSrc =
  selectedQrTemplateKey === 'default'
    ? '/qr-guide-poster.png'
    : `/qr-templates/${selectedQrTemplateKey}.png`
          
          
          const qrTemplateList = [
            {
              key: 'default',
              name: '기본형',
              image: '/qr-guide-poster.png'
            },
          
            ...Array.from(
              {
                length: 11
              },
              (_, index) => {
          
                const number =
                  String(
                    index + 1
                  ).padStart(
                    2,
                    '0'
                  )
          
                return {
                  key:
                    `qr-design-${number}`,
          
                  name:
                    `디자인 ${index + 1}`,
          
                  image:
                    `/qr-templates/qr-design-${number}.png`
                }
          
              }
            )
          ]
  
  
    app.innerHTML = `
      <div class="merchant-mobile-home">
  
        <header class="merchant-mobile-header">
  
          <div>
  
            <div class="merchant-mobile-brand">
              NXG PICK
            </div>
  
            <div class="merchant-mobile-store">
              ${merchantName}
            </div>
  
          </div>
  
          <button
            id="mobile-qr-home"
            class="merchant-mobile-logout"
            type="button"
          >
            홈
          </button>
  
        </header>
  
  
        <main class="merchant-mobile-content">
  
          <div class="merchant-mobile-page-title">
  
            <h1>
              PICK QR
            </h1>
  
            <span>
              가맹점 주문 QR
            </span>
  
          </div>
  
          <div
  class="merchant-mobile-qr-template-section"
>

  <h2>
    QR 디자인 선택
  </h2>

  <div
    class="merchant-mobile-qr-template-grid"
  >

    ${
      qrTemplateList
        .map(
          (template) => {

            const isSelected =
              template.key ===
              selectedQrTemplateKey

            return `
              <button
                type="button"
                class="
                  merchant-mobile-qr-template
                  ${
                    isSelected
                      ? 'active'
                      : ''
                  }
                "
                data-template-key="${template.key}"
              >

                <img
                  src="${template.image}"
                  alt="${template.name}"
                >

                <strong>
                  ${template.name}
                  ${
                    isSelected
                      ? ' ✓'
                      : ''
                  }
                </strong>

              </button>
            `
          }
        )
        .join('')
    }

  </div>

</div>
  
          <div
            class="merchant-mobile-qr-card"
          >
  
            <strong
              class="merchant-mobile-qr-store"
            >
              ${merchantName}
            </strong>
  
  
            <div
  class="
    merchant-mobile-qr-poster
    ${
      selectedQrTemplateKey === 'default'
        ? 'default'
        : 'design'
    }
  "
  data-template="${selectedQrTemplateKey}"
>

  <img
    src="${selectedQrPosterSrc}"
    alt="QR 안내 디자인"
  >

  <div
    id="mobile-merchant-qr-box"
    class="merchant-mobile-qr-box"
  ></div>

</div>
  
  
            <div
              class="merchant-mobile-qr-message"
            >
              QR코드를 스캔해 주문해주세요
            </div>
  
  
            <div
              class="merchant-mobile-qr-url"
            >
              ${kioskUrl}
            </div>
  
  
            <div
              class="merchant-mobile-qr-actions"
            >
  
              <button
                id="mobile-qr-copy"
                type="button"
              >
                주소 복사
              </button>
  
              <button
                id="mobile-qr-open"
                type="button"
              >
                결제창 열기
              </button>

              <button
  id="mobile-qr-save"
  type="button"
>
  이미지 저장
</button>

<button
  id="mobile-qr-share"
  type="button"
>
  공유
</button>

<button
  id="mobile-qr-print"
  type="button"
>
  인쇄
</button>
  
            </div>
  
          </div>
  
        </main>
  
      </div>
    `
  
  
    document
      .querySelector(
        '#mobile-qr-home'
      )
      ?.addEventListener(
        'click',
        () => {
  
          location.href =
            '/merchant-app/home'
  
        }
      )
  
  
    const qrBox =
      document.querySelector<HTMLDivElement>(
        '#mobile-merchant-qr-box'
      )
  
  
    if (qrBox) {
  
        QRCode.toCanvas(
            kioskUrl,
            {
              width: 600,
              margin: 1
            },
        (
          error,
          canvas
        ) => {
  
          if (error) {
  
            alert(
              'QR 생성 실패'
            )
  
            return
          }
  
  
          qrBox.innerHTML = ''
  
          qrBox.appendChild(
            canvas
          )
  
        }
      )
  
    }
  
    document
  .querySelectorAll<HTMLButtonElement>(
    '.merchant-mobile-qr-template'
  )
  .forEach(
    (button) => {

      button.addEventListener(
        'click',
        async () => {

          const templateKey =
            button.dataset.templateKey

          if (!templateKey) {
            return
          }


          const {
            error
          } =
            await supabase
              .from('merchants')
              .update({
                qr_template_key:
                  templateKey
              })
              .eq(
                'id',
                merchantId
              )


          if (error) {

            alert(
              'QR 디자인 저장 실패: ' +
              error.message
            )

            return
          }


          void renderMerchantQr()

        }
      )

    }
  )

  const createMobileQrPosterCanvas =
  async () => {

    const placementMap:
      Record<
        string,
        {
          left: number
          top: number
          width: number
          rotate?: number
        }
      > = {

        default: {
          left: 86,
          top: 59,
          width: 22
        },

        'qr-design-01': {
          left: 70.5,
          top: 53.5,
          width: 35.9
        },

        'qr-design-02': {
          left: 47,
          top: 67,
          width: 32.1
        },

        'qr-design-03': {
          left: 49,
          top: 68.5,
          width: 29.5
        },

        'qr-design-04': {
          left: 49,
          top: 61,
          width: 28.2
        },

        'qr-design-05': {
          left: 50,
          top: 61,
          width: 28.2
        },

        'qr-design-06': {
          left: 50,
          top: 49,
          width: 22.4
        },

        'qr-design-07': {
          left: 49,
          top: 69,
          width: 19.2,
          rotate: -18
        },

        'qr-design-08': {
          left: 50,
          top: 68,
          width: 43.6
        },

        'qr-design-09': {
          left: 50,
          top: 72,
          width: 43.6
        },

        'qr-design-10': {
          left: 50,
          top: 70,
          width: 43.6
        },

        'qr-design-11': {
          left: 50,
          top: 53,
          width: 19.2
        }

      }


    const posterImage =
      new Image()


    await new Promise<void>(
      (
        resolve,
        reject
      ) => {

        posterImage.onload =
          () => resolve()

        posterImage.onerror =
          () => reject(
            new Error(
              'QR 디자인 이미지를 불러오지 못했습니다.'
            )
          )

        posterImage.src =
          selectedQrPosterSrc

      }
    )


    const canvas =
      document.createElement(
        'canvas'
      )


    canvas.width =
      posterImage.naturalWidth

    canvas.height =
      posterImage.naturalHeight


    const ctx =
      canvas.getContext(
        '2d'
      )


    if (!ctx) {

      throw new Error(
        '이미지 생성에 실패했습니다.'
      )

    }


    ctx.drawImage(
      posterImage,
      0,
      0,
      canvas.width,
      canvas.height
    )


    const qrCanvas =
      document.createElement(
        'canvas'
      )


    await QRCode.toCanvas(
      qrCanvas,
      kioskUrl,
      {
        width: 900,
        margin: 1
      }
    )


    const placement =
      placementMap[
        selectedQrTemplateKey
      ] ||
      placementMap.default


    const qrSize =
      canvas.width *
      (
        placement.width /
        100
      )


    const qrCenterX =
      canvas.width *
      (
        placement.left /
        100
      )


    const qrCenterY =
      canvas.height *
      (
        placement.top /
        100
      )


    ctx.save()


    ctx.translate(
      qrCenterX,
      qrCenterY
    )


    if (placement.rotate) {

      ctx.rotate(
        placement.rotate *
        Math.PI /
        180
      )

    }


    ctx.drawImage(
      qrCanvas,
      -qrSize / 2,
      -qrSize / 2,
      qrSize,
      qrSize
    )


    ctx.restore()


    return canvas

  }
  
    document
      .querySelector(
        '#mobile-qr-copy'
      )
      ?.addEventListener(
        'click',
        async () => {
  
          await navigator.clipboard
            .writeText(
              kioskUrl
            )
  
          alert(
            '주소가 복사되었습니다.'
          )
  
        }
      )
  
  
    document
      .querySelector(
        '#mobile-qr-open'
      )
      ?.addEventListener(
        'click',
        () => {
  
          window.open(
            kioskUrl,
            '_blank'
          )
  
        }
      )

      document
  .querySelector(
    '#mobile-qr-save'
  )
  ?.addEventListener(
    'click',
    async () => {

      try {

        const canvas =
          await createMobileQrPosterCanvas()


        const blob =
          await new Promise<Blob | null>(
            (resolve) => {

              canvas.toBlob(
                resolve,
                'image/png'
              )

            }
          )


        if (!blob) {

          alert(
            '이미지 생성에 실패했습니다.'
          )

          return
        }


        const url =
          URL.createObjectURL(
            blob
          )


        const link =
          document.createElement(
            'a'
          )


        const safeMerchantName =
          merchantName.replace(
            /[\\/:*?"<>|]/g,
            '_'
          )


        link.href =
          url

        link.download =
          safeMerchantName +
          '_PICK_QR.png'


        document.body.appendChild(
          link
        )

        link.click()

        link.remove()


        URL.revokeObjectURL(
          url
        )

      } catch (error) {

        console.error(error)

        alert(
          'QR 이미지 저장에 실패했습니다.'
        )

      }

    }
  )


document
  .querySelector(
    '#mobile-qr-share'
  )
  ?.addEventListener(
    'click',
    async () => {

      try {

        const canvas =
          await createMobileQrPosterCanvas()


        const blob =
          await new Promise<Blob | null>(
            (resolve) => {

              canvas.toBlob(
                resolve,
                'image/png'
              )

            }
          )


        if (!blob) {
          return
        }


        const file =
          new File(
            [
              blob
            ],
            'NXG_PICK_QR.png',
            {
              type:
                'image/png'
            }
          )


        if (
          navigator.share &&
          (
            !navigator.canShare ||
            navigator.canShare({
              files: [
                file
              ]
            })
          )
        ) {

          await navigator.share({
            title:
              merchantName +
              ' PICK QR',

            text:
              merchantName +
              ' 주문 QR',

            files: [
              file
            ]
          })

          return
        }


        alert(
          '이 기기에서는 이미지 공유를 지원하지 않습니다.'
        )

      } catch (error: any) {

        if (
          error?.name ===
          'AbortError'
        ) {
          return
        }


        console.error(error)

        alert(
          'QR 공유에 실패했습니다.'
        )

      }

    }
  )


document
  .querySelector(
    '#mobile-qr-print'
  )
  ?.addEventListener(
    'click',
    async () => {

      const printWindow =
        window.open(
          '',
          '_blank'
        )


      if (!printWindow) {

        alert(
          '인쇄창을 열 수 없습니다.'
        )

        return
      }


      try {

        const canvas =
          await createMobileQrPosterCanvas()


        const imageUrl =
          canvas.toDataURL(
            'image/png'
          )


        const orientation =
          selectedQrTemplateKey ===
          'default'
            ? 'landscape'
            : 'portrait'


        printWindow.document.write(`
          <!doctype html>

          <html>

            <head>

              <title>
                ${merchantName} PICK QR
              </title>

              <style>

                @page {
                  size: A4 ${orientation};
                  margin: 0;
                }

                html,
                body {
                  margin: 0;
                  padding: 0;
                  width: 100%;
                  height: 100%;
                }

                body {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background: #ffffff;
                }

                img {
                  display: block;
                  max-width: 100%;
                  max-height: 100vh;
                  object-fit: contain;
                }

              </style>

            </head>

            <body>

              <img
                src="${imageUrl}"
                onload="
                  window.print();
                  window.onafterprint = function () {
                    window.close();
                  };
                "
              >

            </body>

          </html>
        `)


        printWindow.document.close()

      } catch (error) {

        printWindow.close()

        console.error(error)

        alert(
          'QR 인쇄 준비에 실패했습니다.'
        )

      }

    }
  )
  }

  /* =========================================
   모바일 카드결제
========================================= */

function renderMerchantCard() {

    const merchantId =
      sessionStorage.getItem(
        'login_merchant_id'
      ) ||
      localStorage.getItem(
        'login_merchant_id'
      )
  
  
    if (!merchantId) {
  
      location.replace(
        '/merchant-app'
      )
  
      return
    }
  
  
    const merchantName =
      sessionStorage.getItem(
        'login_merchant_name'
      ) ||
      localStorage.getItem(
        'login_merchant_name'
      ) ||
      '가맹점'
  
  
    app.innerHTML = `
      <div class="merchant-mobile-home">
  
        <header class="merchant-mobile-header">
  
          <div>
  
            <div class="merchant-mobile-brand">
              NXG PICK
            </div>
  
            <div class="merchant-mobile-store">
              ${merchantName}
            </div>
  
          </div>
  
  
          <button
            id="mobile-card-home"
            class="merchant-mobile-logout"
            type="button"
          >
            홈
          </button>
  
        </header>
  
  
        <main class="merchant-mobile-content">
  
          <div
            class="merchant-mobile-page-title"
          >
  
            <h1>
              카드결제
            </h1>
  
            <span>
              결제방식 선택
            </span>
  
          </div>
  
  
          <div
            class="merchant-mobile-card-menu"
          >
  
            <button
              type="button"
              class="merchant-mobile-card-menu-item"
              data-card-menu="ocr"
            >
  
              <span>
                📷
              </span>
  
              <strong>
                OCR 카드결제
              </strong>
  
              <small>
                카드 촬영 후 결제
              </small>
  
            </button>
  
  
            <button
              type="button"
              class="merchant-mobile-card-menu-item"
              data-card-menu="manual"
            >
  
              <span>
                💳
              </span>
  
              <strong>
                수기 카드결제
              </strong>
  
              <small>
                카드정보 직접 입력
              </small>
  
            </button>
  
            <button
  type="button"
  class="merchant-mobile-card-menu-item"
  data-card-menu="sms"
>

  <span>
    📩
  </span>

  <strong>
    SMS결제
  </strong>

  <small>
    결제링크 문자 발송
  </small>

</button>
  
            
  
  
            <button
              type="button"
              class="merchant-mobile-card-menu-item"
              data-card-menu="cash"
            >
  
              <span>
                🧾
              </span>
  
              <strong>
                현금영수증
              </strong>
  
              <small>
                현금영수증 발급
              </small>
  
            </button>

            <button
  type="button"
  class="merchant-mobile-card-menu-item"
  data-card-menu="cash-history"
>

  <span>
    📄
  </span>

  <strong>
    현금영수증 내역
  </strong>

  <small>
    승인내역 · 취소 · 영수증
  </small>

</button>
  
          </div>
  
        </main>
  
      </div>
    `
  
  
    document
      .querySelector(
        '#mobile-card-home'
      )
      ?.addEventListener(
        'click',
        () => {
  
          location.href =
            '/merchant-app/home'
  
        }
      )
  
  
      document
      .querySelector(
        '[data-card-menu="ocr"]'
      )
      ?.addEventListener(
        'click',
        () => {
    
          alert(
            'OCR 카드결제는 준비중입니다.'
          )
    
        }
      )
  
  
    document
      .querySelector(
        '[data-card-menu="manual"]'
      )
      ?.addEventListener(
        'click',
        () => {
  
          location.href =
            '/merchant-app/card/manual'
  
        }
      )
  
      document
  .querySelector(
    '[data-card-menu="sms"]'
  )
  ?.addEventListener(
    'click',
    () => {

      location.href =
        '/merchant-app/card/sms'

    }
  )
  
  document
  .querySelector(
    '[data-card-menu="menu"]'
  )
  ?.addEventListener(
    'click',
    () => {

      location.href =
        '/merchant-app/card/menu'

    }
  )
  
  
    document
      .querySelector(
        '[data-card-menu="cash"]'
      )
      ?.addEventListener(
        'click',
        () => {
  
          location.href =
            '/merchant-app/card/cash'
  
        }
      )

      document
  .querySelector(
    '[data-card-menu="cash-history"]'
  )
  ?.addEventListener(
    'click',
    () => {

      location.href =
        '/merchant-app/card/cash-history'

    }
  )
  }

  /* =========================================
   모바일 수기 카드결제
========================================= */

function renderMerchantManualCard() {

    const merchantIdText =
      sessionStorage.getItem(
        'login_merchant_id'
      ) ||
      localStorage.getItem(
        'login_merchant_id'
      )
  
  
    if (!merchantIdText) {
  
      location.replace(
        '/merchant-app'
      )
  
      return
    }
  
  
    const merchantId =
      Number(
        merchantIdText
      )
  
  
    const merchantName =
      sessionStorage.getItem(
        'login_merchant_name'
      ) ||
      localStorage.getItem(
        'login_merchant_name'
      ) ||
      '가맹점'
  
  
    app.innerHTML = `
      <div class="merchant-mobile-home">
  
        <header class="merchant-mobile-header">
  
          <div>
  
            <div class="merchant-mobile-brand">
              NXG PICK
            </div>
  
            <div class="merchant-mobile-store">
              ${merchantName}
            </div>
  
          </div>
  
          <button
            id="mobile-manual-card-back"
            class="merchant-mobile-logout"
            type="button"
          >
            이전
          </button>
  
        </header>
  
  
        <main class="merchant-mobile-content">
  
          <div class="merchant-mobile-page-title">
  
            <h1>
              수기 카드결제
            </h1>
  
            <span>
              카드정보 직접 입력
            </span>
  
          </div>
  
  
          <div
            class="merchant-mobile-manual-card"
          >
  
            <label>
              결제금액
            </label>
  
            <input
              id="mobile-manual-amount"
              type="number"
              inputmode="numeric"
              min="100"
              placeholder="결제금액"
            >
  
  
            <label>
              상품명
            </label>
  
            <input
              id="mobile-manual-goods-name"
              type="text"
              placeholder="상품명"
            >
  
  
            <label>
              카드번호
            </label>
  
            <input
              id="mobile-manual-card-number"
              type="text"
              inputmode="numeric"
              maxlength="19"
              autocomplete="off"
              placeholder="0000-0000-0000-0000"
            >
  
  
            <label>
              유효기간
            </label>
  
            <input
              id="mobile-manual-expiry"
              type="text"
              inputmode="numeric"
              maxlength="5"
              autocomplete="off"
              placeholder="MM/YY"
            >
  
  
            <label>
              할부개월
            </label>
  
            <select
              id="mobile-manual-installment"
            >
  
              <option value="0">
                일시불
              </option>
  
              <option value="2">
                2개월
              </option>
  
              <option value="3">
                3개월
              </option>
  
              <option value="4">
                4개월
              </option>
  
              <option value="5">
                5개월
              </option>
  
              <option value="6">
                6개월
              </option>
  
              <option value="12">
                12개월
              </option>
  
            </select>
  
  
            <label>
              구매자명
            </label>
  
            <input
              id="mobile-manual-buyer-name"
              type="text"
              placeholder="선택 입력"
            >
  
  
            <label>
              구매자 연락처
            </label>
  
            <input
              id="mobile-manual-phone"
              type="tel"
              inputmode="numeric"
              maxlength="13"
              placeholder="선택 입력"
            >
  
  
            <button
              id="mobile-manual-submit"
              type="button"
            >
              결제 요청
            </button>
  
          </div>
  
        </main>
  
      </div>
    `
  
  
    document
      .querySelector(
        '#mobile-manual-card-back'
      )
      ?.addEventListener(
        'click',
        () => {
  
          location.href =
            '/merchant-app/card'
  
        }
      )
  
  
    const cardNumberInput =
      document.querySelector<HTMLInputElement>(
        '#mobile-manual-card-number'
      )
  
  
    cardNumberInput
      ?.addEventListener(
        'input',
        () => {
  
          const value =
            cardNumberInput.value
              .replace(
                /[^0-9]/g,
                ''
              )
              .slice(
                0,
                16
              )
  
  
          cardNumberInput.value =
            value
              .replace(
                /(\d{4})(?=\d)/g,
                '$1-'
              )
  
        }
      )
  
  
    const expiryInput =
      document.querySelector<HTMLInputElement>(
        '#mobile-manual-expiry'
      )
  
  
    expiryInput
      ?.addEventListener(
        'input',
        () => {
  
          const value =
            expiryInput.value
              .replace(
                /[^0-9]/g,
                ''
              )
              .slice(
                0,
                4
              )
  
  
          if (
            value.length > 2
          ) {
  
            expiryInput.value =
              value.slice(
                0,
                2
              ) +
              '/' +
              value.slice(
                2
              )
  
          } else {
  
            expiryInput.value =
              value
  
          }
  
        }
      )
  
  
    document
      .querySelector(
        '#mobile-manual-submit'
      )
      ?.addEventListener(
        'click',
        async () => {
  
          const amount =
            Number(
              document.querySelector<HTMLInputElement>(
                '#mobile-manual-amount'
              )?.value || 0
            )
  
  
          const goodsName =
            (
              document.querySelector<HTMLInputElement>(
                '#mobile-manual-goods-name'
              )?.value ||
              '일반 카드결제'
            ).trim()
  
  
          const cardNumber =
            (
              document.querySelector<HTMLInputElement>(
                '#mobile-manual-card-number'
              )?.value || ''
            )
              .replace(
                /[^0-9]/g,
                ''
              )
  
  
          const expiryText =
            (
              document.querySelector<HTMLInputElement>(
                '#mobile-manual-expiry'
              )?.value || ''
            )
              .replace(
                /[^0-9]/g,
                ''
              )
  
  
          const installment =
            document.querySelector<HTMLSelectElement>(
              '#mobile-manual-installment'
            )?.value ||
            '0'
  
  
          const buyerName =
            (
              document.querySelector<HTMLInputElement>(
                '#mobile-manual-buyer-name'
              )?.value ||
              '구매자'
            ).trim()
  
  
          const customerPhone =
            (
              document.querySelector<HTMLInputElement>(
                '#mobile-manual-phone'
              )?.value || ''
            )
              .replace(
                /[^0-9]/g,
                ''
              )
  
  
          if (
            !amount ||
            amount < 100
          ) {
  
            alert(
              '결제금액을 확인해주세요.'
            )
  
            return
          }
  
  
          if (
            cardNumber.length < 13 ||
            cardNumber.length > 19
          ) {
  
            alert(
              '카드번호를 확인해주세요.'
            )
  
            return
          }
  
  
          if (
            expiryText.length !== 4
          ) {
  
            alert(
              '유효기간을 MM/YY 형식으로 입력해주세요.'
            )
  
            return
          }
  
  
          const expiryMonth =
            expiryText.slice(
              0,
              2
            )
  
  
          const expiryYear =
            expiryText.slice(
              2,
              4
            )
  
  
          if (
            Number(expiryMonth) < 1 ||
            Number(expiryMonth) > 12
          ) {
  
            alert(
              '유효기간 월을 확인해주세요.'
            )
  
            return
          }
  
  
          const expiryYymm =
            expiryYear +
            expiryMonth
  
  
          if (
            !confirm(
              goodsName +
              '\n' +
              amount.toLocaleString() +
              '원을 결제할까요?'
            )
          ) {
            return
          }
  
  
          const submitButton =
            document.querySelector<HTMLButtonElement>(
              '#mobile-manual-submit'
            )
  
  
          if (submitButton) {
  
            submitButton.disabled =
              true
  
            submitButton.textContent =
              '결제 처리 중...'
  
          }
  
  
          try {
  
            const response =
              await fetch(
                apiBaseUrl + '/api/korpay-manual-pay',
                {
                  method:
                    'POST',
  
                  headers: {
                    'Content-Type':
                      'application/json'
                  },
  
                  body:
                    JSON.stringify({
                      merchantId,
                      amount,
                      cardNumber,
                      expiryYymm,
                      installment,
                      buyerName,
                      billingIds: [],
                      goodsName,
                      customerPhone
                    })
                }
              )
  
  
            const data =
              await response.json()
  
  
            if (
              !response.ok ||
              !data.success
            ) {
  
              alert(
                '결제 실패\n\n' +
                (
                  data.message ||
                  '카드결제가 승인되지 않았습니다.'
                )
              )
  
              return
            }
  
  
            const manualOrderNo =
  String(
    data.orderId || ''
  ).trim()


if (!manualOrderNo) {

  alert(
    '결제는 승인됐지만 주문번호를 받지 못했습니다.\n' +
    '승인번호: ' +
    (
      data.approvalNumber ||
      '-'
    )
  )

  return
}


const {
  data: nextManualCallNumber,
  error: manualCallNumberError
} =
  await supabase.rpc(
    'get_next_call_number',
    {
      target_merchant_id:
        merchantId
    }
  )


if (
  manualCallNumberError ||
  !nextManualCallNumber
) {

  alert(
    '결제는 승인됐지만 주문 대기번호 생성에 실패했습니다.\n' +
    (
      manualCallNumberError?.message ||
      '번호를 받지 못했습니다.'
    )
  )

  return
}


const manualCallNumber =
  Number(
    nextManualCallNumber
  )


const rawApprovalNumber =
  String(
    data.approvalNumber || ''
  ).trim()


const approvalNumber =
  /^\d{8}$/.test(
    rawApprovalNumber
  )
    ? rawApprovalNumber
    : null


const {
  error: orderSaveError
} =
  await supabase
    .from('orders')
    .insert({
      merchant_id:
        merchantId,

      order_no:
        String(
          manualCallNumber
        ),

      call_number:
        manualCallNumber,

      pg_order_id:
        manualOrderNo,

      payment_key:
        data.tid || null,

      approval_number:
        approvalNumber,

      items: [
        {
          name:
            goodsName ||
            '수기결제',

          price:
            Number(amount),

          quantity:
            1
        }
      ],

      total_amount:
        Number(amount),

      order_status:
        '접수',

      payment_status:
        '결제완료'
    })


if (orderSaveError) {

  alert(
    '결제는 승인됐지만 주문 저장에 실패했습니다.\n' +
    orderSaveError.message
  )

  return
}


alert(
  '결제가 승인되었습니다.\n\n' +
  '주문번호: ' +
  manualCallNumber +
  '번\n' +
  '승인번호: ' +
  (
    data.approvalNumber ||
    '-'
  )
)
  
  
            const cardInput =
              document.querySelector<HTMLInputElement>(
                '#mobile-manual-card-number'
              )
  
            const expiryField =
              document.querySelector<HTMLInputElement>(
                '#mobile-manual-expiry'
              )
  
  
            if (cardInput) {
              cardInput.value = ''
            }
  
            if (expiryField) {
              expiryField.value = ''
            }
  
  
          } catch (error) {
  
            console.error(
              '모바일 수기결제 오류:',
              error
            )
  
            alert(
              '결제 요청 중 오류가 발생했습니다.'
            )
  
  
          } finally {
  
            if (submitButton) {
  
              submitButton.disabled =
                false
  
              submitButton.textContent =
                '결제 요청'
  
            }
  
          }
  
        }
      )
  }

  /* =========================================
   모바일 SMS 결제
========================================= */

function renderMerchantSmsCard() {

    const merchantId =
      sessionStorage.getItem(
        'login_merchant_id'
      ) ||
      localStorage.getItem(
        'login_merchant_id'
      )
  
  
    if (!merchantId) {
  
      location.replace(
        '/merchant-app'
      )
  
      return
    }
  
  
    const merchantName =
      sessionStorage.getItem(
        'login_merchant_name'
      ) ||
      localStorage.getItem(
        'login_merchant_name'
      ) ||
      '가맹점'
  
  
    app.innerHTML = `
      <div class="merchant-mobile-home">
  
        <header class="merchant-mobile-header">
  
          <div>
  
            <div class="merchant-mobile-brand">
              NXG PICK
            </div>
  
            <div class="merchant-mobile-store">
              ${merchantName}
            </div>
  
          </div>
  
          <button
            id="mobile-sms-card-back"
            class="merchant-mobile-logout"
            type="button"
          >
            이전
          </button>
  
        </header>
  
  
        <main class="merchant-mobile-content">
  
          <div class="merchant-mobile-page-title">
  
            <h1>
              SMS결제
            </h1>
  
            <span>
              결제링크 문자 발송
            </span>
  
          </div>
  
  
          <div
  class="merchant-mobile-manual-card"
>

  <label>
    상품명
  </label>

  <input
    id="mobile-sms-product-name"
    type="text"
    placeholder="상품명"
  >


  <label>
    결제금액
  </label>

  <input
    id="mobile-sms-amount"
    type="number"
    inputmode="numeric"
    min="100"
    placeholder="결제금액"
  >


  <label>
    고객 휴대폰번호
  </label>

  <input
    id="mobile-sms-phone"
    type="tel"
    inputmode="numeric"
    placeholder="01012345678"
  >


  <div class="merchant-mobile-btn-row">

  <button
    id="mobile-sms-send"
    type="button"
    class="merchant-mobile-btn-primary"
  >
    결제링크 문자 발송
  </button>

  <button
    id="mobile-sms-copy"
    type="button"
    class="merchant-mobile-btn-secondary"
  >
    결제링크 복사
  </button>

</div>

</div>
  
        </main>
  
      </div>
    `
  
  
    document
      .querySelector(
        '#mobile-sms-card-back'
      )
      ?.addEventListener(
        'click',
        () => {
  
          location.href =
            '/merchant-app/card'
  
        }
      )

      const createSmsPaymentLink = () => {

        const productName =
          (
            document.querySelector<HTMLInputElement>(
              '#mobile-sms-product-name'
            )?.value || ''
          ).trim()
      
      
        const amount =
          Number(
            document.querySelector<HTMLInputElement>(
              '#mobile-sms-amount'
            )?.value || 0
          )
      
      
        if (!productName) {
      
          alert(
            '상품명을 입력해주세요.'
          )
      
          return ''
        }
      
      
        if (
          !amount ||
          amount < 100
        ) {
      
          alert(
            '결제금액을 확인해주세요.'
          )
      
          return ''
        }
      
      
        return (
          apiBaseUrl +
          '/pay' +
          '?merchantId=' +
          encodeURIComponent(
            String(merchantId)
          ) +
          '&merchantName=' +
          encodeURIComponent(
            merchantName
          ) +
          '&productName=' +
          encodeURIComponent(
            productName
          ) +
          '&amount=' +
          amount
        )
      
      }
      
      
      document
        .querySelector(
          '#mobile-sms-send'
        )
        ?.addEventListener(
          'click',
          () => {
      
            const phone =
              (
                document.querySelector<HTMLInputElement>(
                  '#mobile-sms-phone'
                )?.value || ''
              )
                .replace(
                  /[^0-9]/g,
                  ''
                )
      
      
            if (!phone) {
      
              alert(
                '고객 휴대폰번호를 입력해주세요.'
              )
      
              return
            }
      
      
            const paymentLink =
              createSmsPaymentLink()
      
      
            if (!paymentLink) {
              return
            }
      
      
            const amount =
              Number(
                document.querySelector<HTMLInputElement>(
                  '#mobile-sms-amount'
                )?.value || 0
              )
      
      
            const message =
              '[NXG PICK]\n' +
              merchantName +
              ' 결제요청\n' +
              '결제금액: ' +
              amount.toLocaleString() +
              '원\n\n' +
              paymentLink
      
      
            window.location.href =
              'sms:' +
              phone +
              '?body=' +
              encodeURIComponent(
                message
              )
      
          }
        )
      
      
      document
        .querySelector(
          '#mobile-sms-copy'
        )
        ?.addEventListener(
          'click',
          async () => {
      
            const paymentLink =
              createSmsPaymentLink()
      
      
            if (!paymentLink) {
              return
            }
      
      
            await navigator.clipboard
              .writeText(
                paymentLink
              )
      
      
            alert(
              '결제링크가 복사되었습니다.'
            )
      
          }
        )
  }

  /* =========================================
   모바일 현금영수증
========================================= */

function renderMerchantCashReceipt() {

  const merchantIdText =
    sessionStorage.getItem(
      'login_merchant_id'
    ) ||
    localStorage.getItem(
      'login_merchant_id'
    )


  if (!merchantIdText) {

    location.replace(
      '/merchant-app'
    )

    return
  }


  const merchantId =
    Number(
      merchantIdText
    )


  const merchantName =
    sessionStorage.getItem(
      'login_merchant_name'
    ) ||
    localStorage.getItem(
      'login_merchant_name'
    ) ||
    '가맹점'


  app.innerHTML = `
    <div class="merchant-mobile-home">

      <header class="merchant-mobile-header">

        <div>

          <div class="merchant-mobile-brand">
            NXG PICK
          </div>

          <div class="merchant-mobile-store">
            ${merchantName}
          </div>

        </div>


        <button
          id="mobile-cash-back"
          class="merchant-mobile-logout"
          type="button"
        >
          이전
        </button>

      </header>


      <main class="merchant-mobile-content">

        <div class="merchant-mobile-page-title">

          <h1>
            현금영수증
          </h1>

          <span>
            현금영수증 발급
          </span>

        </div>


        <div
          class="merchant-mobile-manual-card"
        >

          <label>
            구분
          </label>

          <select
            id="mobile-cash-type"
          >
            <option value="소득공제">
              소득공제
            </option>

            <option value="지출증빙">
              지출증빙
            </option>
          </select>


          <label>
            결제금액
          </label>

          <input
            id="mobile-cash-amount"
            type="number"
            inputmode="numeric"
            min="1"
            placeholder="결제금액"
          >


          <label>
            상품명
          </label>

          <input
            id="mobile-cash-order-name"
            type="text"
            placeholder="현금결제"
          >


          <label
            id="mobile-cash-number-label"
          >
            휴대폰번호
          </label>

          <input
            id="mobile-cash-number"
            type="text"
            inputmode="numeric"
            placeholder="휴대폰번호 또는 현금영수증 카드번호"
          >


   <button
  id="mobile-cash-submit"
  type="button"
  class="merchant-mobile-btn-block"
>
  현금영수증 발급
</button>

        </div>

      </main>

    </div>
  `


  document
    .querySelector(
      '#mobile-cash-back'
    )
    ?.addEventListener(
      'click',
      () => {

        location.href =
          '/merchant-app/card'

      }
    )


  const typeSelect =
    document.querySelector<HTMLSelectElement>(
      '#mobile-cash-type'
    )


  const numberInput =
    document.querySelector<HTMLInputElement>(
      '#mobile-cash-number'
    )


  const numberLabel =
    document.querySelector<HTMLElement>(
      '#mobile-cash-number-label'
    )


  typeSelect
    ?.addEventListener(
      'change',
      () => {

        if (
          typeSelect.value ===
          '지출증빙'
        ) {

          if (numberLabel) {
            numberLabel.textContent =
              '사업자번호'
          }

          if (numberInput) {
            numberInput.placeholder =
              '사업자번호 10자리'
          }

        } else {

          if (numberLabel) {
            numberLabel.textContent =
              '휴대폰번호'
          }

          if (numberInput) {
            numberInput.placeholder =
              '휴대폰번호 또는 현금영수증 카드번호'
          }

        }

      }
    )


  document
    .querySelector(
      '#mobile-cash-submit'
    )
    ?.addEventListener(
      'click',
      async () => {

        const type =
          (
            document.querySelector<HTMLSelectElement>(
              '#mobile-cash-type'
            )?.value || ''
          )


        const amount =
          Number(
            document.querySelector<HTMLInputElement>(
              '#mobile-cash-amount'
            )?.value || 0
          )


        const orderName =
          (
            document.querySelector<HTMLInputElement>(
              '#mobile-cash-order-name'
            )?.value ||
            '현금결제'
          ).trim()


        const customerIdentityNumber =
          (
            document.querySelector<HTMLInputElement>(
              '#mobile-cash-number'
            )?.value || ''
          )
            .replace(
              /[^0-9]/g,
              ''
            )


        if (
          !amount ||
          amount <= 0
        ) {

          alert(
            '결제금액을 입력해주세요.'
          )

          return
        }


        if (!customerIdentityNumber) {

          alert(
            type === '지출증빙'
              ? '사업자번호를 입력해주세요.'
              : '휴대폰번호를 입력해주세요.'
          )

          return
        }


        const orderId =
          'CASH-' +
          merchantId +
          '-' +
          Date.now()


        const submitButton =
          document.querySelector<HTMLButtonElement>(
            '#mobile-cash-submit'
          )


        if (submitButton) {

          submitButton.disabled =
            true

          submitButton.textContent =
            '발급 중...'

        }


        try {

          const response =
            await fetch(
              apiBaseUrl + '/api/toss-cash-receipt',
              {
                method:
                  'POST',

                headers: {
                  'Content-Type':
                    'application/json'
                },

                body:
                  JSON.stringify({
                    amount,
                    orderId,
                    orderName,
                    type,
                    customerIdentityNumber,
                    taxFreeAmount:
                      0
                  })
              }
            )


          const result =
            await response.json()


          if (
            !response.ok ||
            !result.success
          ) {

            alert(
              '현금영수증 발급 실패: ' +
              (
                result.message ||
                '알 수 없는 오류'
              )
            )

            return
          }

          const receiptData =
  result?.data?.entityBody ||
  result?.data?.cashReceipt ||
  result?.cashReceipt ||
  result?.data ||
  result


  const supplyAmount =
  Math.floor(
    (amount * 10) / 11
  )


const vatAmount =
  amount -
  supplyAmount


const identityDigits =
  customerIdentityNumber.replace(
    /[^0-9]/g,
    ''
  )


const maskedIdentity =
  identityDigits.length >= 7
    ? (
        identityDigits.slice(0, 3) +
        '****' +
        identityDigits.slice(-4)
      )
    : identityDigits


const issueStatus =
  String(
    receiptData?.issueStatus ||
    ''
  )


  const cashReceiptStatus =
  receiptData?.issueNumber ||
  receiptData?.approvalNumber
    ? '발급완료'
    : issueStatus === 'FAILED'
      ? '발급실패'
      : '발급요청'


const {
  error: cashReceiptSaveError
} =
  await supabase
    .from('cash_receipts')
    .insert({
      merchant_id:
        merchantId,

      merchant_name:
        merchantName,

      order_id:
        orderId,

      order_name:
        orderName,

      receipt_type:
        type,

      identity_number_masked:
        maskedIdentity,

      amount:
        amount,

      supply_amount:
        supplyAmount,

      vat_amount:
        vatAmount,

      tax_free_amount:
        0,

      approval_number:
        receiptData?.issueNumber ||
        receiptData?.approvalNumber ||
        null,

      receipt_key:
        receiptData?.receiptKey ||
        null,

      pg_company:
        '토스페이먼츠',

      status:
        cashReceiptStatus,

      issued_at:
        new Date()
          .toISOString(),

      raw_response:
        result
    })


if (cashReceiptSaveError) {

  alert(
    '현금영수증은 발급됐지만 내역 저장에 실패했습니다.\n' +
    cashReceiptSaveError.message
  )

  return
}

          alert(
            '현금영수증 발급이 완료되었습니다.'
          )


          const amountInput =
            document.querySelector<HTMLInputElement>(
              '#mobile-cash-amount'
            )

          const nameInput =
            document.querySelector<HTMLInputElement>(
              '#mobile-cash-order-name'
            )

          const identityInput =
            document.querySelector<HTMLInputElement>(
              '#mobile-cash-number'
            )


          if (amountInput) {
            amountInput.value = ''
          }

          if (nameInput) {
            nameInput.value = ''
          }

          if (identityInput) {
            identityInput.value = ''
          }


        } catch (error) {

          console.error(
            '모바일 현금영수증 오류:',
            error
          )

          alert(
            '현금영수증 발급 중 오류가 발생했습니다.'
          )


        } finally {

          if (submitButton) {

            submitButton.disabled =
              false

            submitButton.textContent =
              '현금영수증 발급'

          }

        }

      }
    )

}

/* =========================================
   모바일 현금영수증 내역
========================================= */

async function renderMerchantCashReceiptHistory() {

  const merchantIdText =
    sessionStorage.getItem(
      'login_merchant_id'
    ) ||
    localStorage.getItem(
      'login_merchant_id'
    )


  if (!merchantIdText) {

    location.replace(
      '/merchant-app'
    )

    return
  }


  const merchantId =
    Number(
      merchantIdText
    )


  const merchantName =
    sessionStorage.getItem(
      'login_merchant_name'
    ) ||
    localStorage.getItem(
      'login_merchant_name'
    ) ||
    '가맹점'


  const params =
    new URLSearchParams(
      location.search
    )


  const getKoreaDate = (
    date: Date
  ) => {

    return new Intl.DateTimeFormat(
      'en-CA',
      {
        timeZone:
          'Asia/Seoul',

        year:
          'numeric',

        month:
          '2-digit',

        day:
          '2-digit'
      }
    ).format(date)
  }


  const today =
    getKoreaDate(
      new Date()
    )


  const startDate =
    params.get('start') ||
    today


  const endDate =
    params.get('end') ||
    today


  const startIso =
    new Date(
      startDate +
      'T00:00:00+09:00'
    ).toISOString()


  const endIso =
    new Date(
      endDate +
      'T23:59:59.999+09:00'
    ).toISOString()


  const {
    data,
    error
  } =
    await supabase
      .from(
        'cash_receipts'
      )
      .select('*')
      .eq(
        'merchant_id',
        merchantId
      )
      .gte(
        'issued_at',
        startIso
      )
      .lte(
        'issued_at',
        endIso
      )
      .order(
        'issued_at',
        {
          ascending:
            false
        }
      )


  if (error) {

    alert(
      '현금영수증 내역 조회 실패: ' +
      error.message
    )

    return
  }


  const receipts =
    data || []


  const normalReceipts =
    receipts.filter(
      (receipt: any) =>
        receipt.status !==
        '취소완료'
    )


  const normalAmount =
    normalReceipts.reduce(
      (
        sum: number,
        receipt: any
      ) =>
        sum +
        Number(
          receipt.amount || 0
        ),
      0
    )


  app.innerHTML = `
    <div class="merchant-mobile-home">

      <header class="merchant-mobile-header">

        <div>

          <div class="merchant-mobile-brand">
            NXG PICK
          </div>

          <div class="merchant-mobile-store">
            ${merchantName}
          </div>

        </div>


        <button
          id="mobile-cash-history-back"
          class="merchant-mobile-logout"
          type="button"
        >
          이전
        </button>

      </header>


      <main class="merchant-mobile-content">

        <div class="merchant-mobile-page-title">

          <h1>
            현금영수증 내역
          </h1>

          <span>
            승인 · 취소 · 영수증
          </span>

        </div>


        <div class="merchant-mobile-date-range">

          <div>

            <label>
              시작일
            </label>

            <input
              id="mobile-cash-history-start"
              type="date"
              value="${startDate}"
            >

          </div>


          <div>

            <label>
              종료일
            </label>

            <input
              id="mobile-cash-history-end"
              type="date"
              value="${endDate}"
            >

          </div>

        </div>


        <button
          id="mobile-cash-history-search"
          type="button"
          style="
            width:100%;
            margin:10px 0 16px;
          "
        >
          조회
        </button>


        <div
          class="merchant-mobile-order-summary"
        >

          <span>
            정상 승인 :
            <strong>
              ${normalReceipts.length}건
            </strong>
          </span>

          <span>
            승인금액 :
            <strong>
              ${normalAmount.toLocaleString()}원
            </strong>
          </span>

        </div>


        <div
          id="mobile-cash-history-list"
          class="merchant-mobile-order-list"
        >

          ${
            receipts.length === 0

              ? `
                <div
                  class="merchant-mobile-order-empty"
                >
                  현금영수증 내역이 없습니다.
                </div>
              `

              :

              receipts
                .map(
                  (
                    receipt: any
                  ) => {

                    const issuedAt =
                      receipt.issued_at
                        ? new Date(
                            receipt.issued_at
                          )
                            .toLocaleString(
                              'ko-KR',
                              {
                                timeZone:
                                  'Asia/Seoul'
                              }
                            )
                        : '-'


                    return `
                      <div
                        class="merchant-mobile-order-card"
                      >

                        <div
                          class="merchant-mobile-order-card-top"
                        >

                          <strong>
                            ${
                              receipt.order_name ||
                              '현금결제'
                            }
                          </strong>

                          <span>
                            ${Number(
                              receipt.amount || 0
                            ).toLocaleString()}원
                          </span>

                        </div>


                        <div
                          class="merchant-mobile-order-date"
                        >
                          ${issuedAt}
                        </div>


                        <div
                          style="
                            margin-top:10px;
                            line-height:1.8;
                            font-size:14px;
                          "
                        >

                          <div>
                            승인번호 :
                            <strong>
                              ${
                                receipt.approval_number ||
                                '-'
                              }
                            </strong>
                          </div>

                          <div>
                            승인구분 :
                            ${
                              receipt.receipt_type ||
                              '-'
                            }
                          </div>

                          <div>
                            증빙번호 :
                            ${
                              receipt.identity_number_masked ||
                              '-'
                            }
                          </div>

                          <div>
                            물품가액 :
                            ${Number(
                              receipt.supply_amount || 0
                            ).toLocaleString()}원
                          </div>

                          <div>
                            부가세 :
                            ${Number(
                              receipt.vat_amount || 0
                            ).toLocaleString()}원
                          </div>

                        </div>


                        <div
                          class="merchant-mobile-order-bottom"
                          style="
                            margin-top:14px;
                          "
                        >

                          <span
                            class="merchant-mobile-order-status"
                          >
                            ${
                              receipt.status ||
                              '-'
                            }
                          </span>

                        </div>


                        <div
                          style="
                            display:flex;
                            flex-wrap:wrap;
                            gap:8px;
                            margin-top:10px;
                          "
                        >

                          <button
                            type="button"
                            class="mobile-cash-approval-receipt"
                            data-id="${receipt.id}"
                          >
                            승인영수증
                          </button>


                          ${
                            receipt.status ===
                            '취소완료'

                              ? `
                                <button
                                  type="button"
                                  class="mobile-cash-cancel-receipt"
                                  data-id="${receipt.id}"
                                >
                                  취소영수증
                                </button>
                              `

                              : ''
                          }


                          ${
                            receipt.status !==
                              '취소완료' &&
                            receipt.receipt_key

                              ? `
                                <button
                                  type="button"
                                  class="mobile-cash-cancel"
                                  data-id="${receipt.id}"
                                >
                                  취소처리
                                </button>
                              `

                              : ''
                          }

                        </div>

                      </div>
                    `
                  }
                )
                .join('')
          }

        </div>

      </main>

    </div>
  `


  document
    .querySelector(
      '#mobile-cash-history-back'
    )
    ?.addEventListener(
      'click',
      () => {

        location.href =
          '/merchant-app/card'

      }
    )


  document
    .querySelector(
      '#mobile-cash-history-search'
    )
    ?.addEventListener(
      'click',
      () => {

        const start =
          document
            .querySelector<HTMLInputElement>(
              '#mobile-cash-history-start'
            )
            ?.value || today


        const end =
          document
            .querySelector<HTMLInputElement>(
              '#mobile-cash-history-end'
            )
            ?.value || today


        location.href =
          '/merchant-app/card/cash-history' +
          '?start=' +
          encodeURIComponent(
            start
          ) +
          '&end=' +
          encodeURIComponent(
            end
          )

      }
    )


  const openReceipt =
    (
      receipt: any,
      cancelMode:
        boolean
    ) => {

      document
        .querySelector(
          '#merchant-mobile-receipt-modal'
        )
        ?.remove()


      const transactionDate =
        cancelMode
          ? receipt.canceled_at
          : receipt.issued_at


      const transactionDateText =
        transactionDate
          ? new Date(
              transactionDate
            )
              .toLocaleString(
                'ko-KR',
                {
                  timeZone:
                    'Asia/Seoul'
                }
              )
          : '-'


      const cancelData =
        receipt
          .cancel_response
          ?.data
          ?.entityBody ||

        receipt
          .cancel_response
          ?.data
          ?.cashReceipt ||

        receipt
          .cancel_response
          ?.data ||

        {}


      const cancelNumber =
        cancelData
          ?.issueNumber ||

        cancelData
          ?.approvalNumber ||

        receipt
          .cancel_receipt_key ||

        '-'


      document.body
        .insertAdjacentHTML(
          'beforeend',
          `
            <div
              id="merchant-mobile-receipt-modal"
              class="merchant-mobile-receipt-modal"
            >

              <div
                class="merchant-mobile-receipt-box"
              >

                <div
                  class="merchant-mobile-receipt-header"
                >

                  <strong>
                    NXG PICK
                  </strong>

                  <h2>
                    현금영수증
                    ${
                      cancelMode
                        ? '(취소)'
                        : '(승인)'
                    }
                  </h2>

                </div>


                <section
                  class="merchant-mobile-receipt-section"
                >

                  <h3>
                    ${
                      cancelMode
                        ? '취소정보'
                        : '승인정보'
                    }
                  </h3>


                  <div
                    class="merchant-mobile-receipt-row"
                  >
                    <span>
                      가맹점
                    </span>

                    <strong>
                      ${merchantName}
                    </strong>
                  </div>


                  <div
                    class="merchant-mobile-receipt-row"
                  >
                    <span>
                      거래일시
                    </span>

                    <strong>
                      ${transactionDateText}
                    </strong>
                  </div>


                  <div
                    class="merchant-mobile-receipt-row"
                  >
                    <span>
                      ${
                        cancelMode
                          ? '취소처리번호'
                          : '승인번호'
                      }
                    </span>

                    <strong>
                      ${
                        cancelMode
                          ? cancelNumber
                          : (
                              receipt.approval_number ||
                              '-'
                            )
                      }
                    </strong>
                  </div>


                  ${
                    cancelMode
                      ? `
                        <div
                          class="merchant-mobile-receipt-row"
                        >

                          <span>
                            원승인번호
                          </span>

                          <strong>
                            ${
                              receipt.approval_number ||
                              '-'
                            }
                          </strong>

                        </div>
                      `
                      : ''
                  }


                  <div
                    class="merchant-mobile-receipt-row"
                  >

                    <span>
                      승인구분
                    </span>

                    <strong>
                      ${
                        receipt.receipt_type ||
                        '-'
                      }
                    </strong>

                  </div>


                  <div
                    class="merchant-mobile-receipt-row"
                  >

                    <span>
                      증빙번호
                    </span>

                    <strong>
                      ${
                        receipt.identity_number_masked ||
                        '-'
                      }
                    </strong>

                  </div>


                  <div
                    class="merchant-mobile-receipt-row"
                  >

                    <span>
                      품목명
                    </span>

                    <strong>
                      ${
                        receipt.order_name ||
                        '-'
                      }
                    </strong>

                  </div>


                  <div
                    class="merchant-mobile-receipt-row"
                  >

                    <span>
                      물품가액
                    </span>

                    <strong>
                      ${Number(
                        receipt.supply_amount || 0
                      ).toLocaleString()}원
                    </strong>

                  </div>


                  <div
                    class="merchant-mobile-receipt-row"
                  >

                    <span>
                      부가세
                    </span>

                    <strong>
                      ${Number(
                        receipt.vat_amount || 0
                      ).toLocaleString()}원
                    </strong>

                  </div>


                  <div
                    class="merchant-mobile-receipt-row"
                  >

                    <span>
                      ${
                        cancelMode
                          ? '취소금액'
                          : '승인금액'
                      }
                    </span>

                    <strong>
                      ${Number(
                        cancelMode
                          ? (
                              receipt.cancel_amount ||
                              receipt.amount ||
                              0
                            )
                          : (
                              receipt.amount ||
                              0
                            )
                      ).toLocaleString()}원
                    </strong>

                  </div>

                </section>


                <div
                  class="merchant-mobile-receipt-actions"
                >

                  <button
                    id="mobile-cash-receipt-print"
                    type="button"
                  >
                    인쇄
                  </button>

                  <button
                    id="mobile-cash-receipt-close"
                    type="button"
                  >
                    닫기
                  </button>

                </div>

              </div>

            </div>
          `
        )


      document
        .querySelector(
          '#mobile-cash-receipt-close'
        )
        ?.addEventListener(
          'click',
          () => {

            document
              .querySelector(
                '#merchant-mobile-receipt-modal'
              )
              ?.remove()

          }
        )


      document
        .querySelector(
          '#mobile-cash-receipt-print'
        )
        ?.addEventListener(
          'click',
          () => {

            window.print()

          }
        )

    }


  document
    .querySelectorAll<HTMLButtonElement>(
      '.mobile-cash-approval-receipt'
    )
    .forEach(
      (
        button
      ) => {

        button
          .addEventListener(
            'click',
            () => {

              const id =
                Number(
                  button.dataset.id ||
                  0
                )


              const receipt =
                receipts.find(
                  (
                    item: any
                  ) =>
                    Number(
                      item.id
                    ) === id
                )


              if (receipt) {

                openReceipt(
                  receipt,
                  false
                )

              }

            }
          )

      }
    )


  document
    .querySelectorAll<HTMLButtonElement>(
      '.mobile-cash-cancel-receipt'
    )
    .forEach(
      (
        button
      ) => {

        button
          .addEventListener(
            'click',
            () => {

              const id =
                Number(
                  button.dataset.id ||
                  0
                )


              const receipt =
                receipts.find(
                  (
                    item: any
                  ) =>
                    Number(
                      item.id
                    ) === id
                )


              if (receipt) {

                openReceipt(
                  receipt,
                  true
                )

              }

            }
          )

      }
    )


  document
    .querySelectorAll<HTMLButtonElement>(
      '.mobile-cash-cancel'
    )
    .forEach(
      (
        button
      ) => {

        button
          .addEventListener(
            'click',
            async () => {

              const id =
                Number(
                  button.dataset.id ||
                  0
                )


              const receipt =
                receipts.find(
                  (
                    item: any
                  ) =>
                    Number(
                      item.id
                    ) === id
                )


              if (
                !receipt ||
                !receipt.receipt_key
              ) {

                alert(
                  '취소할 현금영수증 정보가 없습니다.'
                )

                return
              }


              const amount =
                Number(
                  receipt.amount ||
                  0
                )


              if (
                !confirm(
                  `현금영수증 ${amount.toLocaleString()}원을 취소하시겠습니까?`
                )
              ) {

                return
              }


              button.disabled =
                true

              button.textContent =
                '취소 중...'


              try {

                const response =
                  await fetch(
                    apiBaseUrl + '/api/toss-cash-receipt-cancel',
                    {
                      method:
                        'POST',

                      headers: {
                        'Content-Type':
                          'application/json'
                      },

                      body:
                        JSON.stringify({
                          receiptKey:
                            receipt.receipt_key
                        })
                    }
                  )


                const result =
                  await response.json()


                if (
                  !response.ok ||
                  !result.success
                ) {

                  alert(
                    '현금영수증 취소 실패: ' +
                    (
                      result.message ||
                      '알 수 없는 오류'
                    )
                  )

                  return
                }


                const cancelData =
                  result
                    ?.data
                    ?.entityBody ||

                  result
                    ?.data
                    ?.cashReceipt ||

                  result
                    ?.data ||

                  result


                const {
                  error:
                    updateError
                } =
                  await supabase
                    .from(
                      'cash_receipts'
                    )
                    .update({
                      status:
                        '취소완료',

                      canceled_at:
                        new Date()
                          .toISOString(),

                      cancel_amount:
                        amount,

                      cancel_receipt_key:
                        cancelData
                          ?.receiptKey ||
                        null,

                      cancel_response:
                        result
                    })
                    .eq(
                      'id',
                      id
                    )
                    .eq(
                      'merchant_id',
                      merchantId
                    )


                if (updateError) {

                  alert(
                    '현금영수증은 취소됐지만 내역 저장에 실패했습니다.\n' +
                    updateError.message
                  )

                  return
                }


                alert(
                  '현금영수증 취소가 완료되었습니다.'
                )


                location.reload()


              } catch (error) {

                console.error(
                  '모바일 현금영수증 취소 오류:',
                  error
                )


                alert(
                  '현금영수증 취소 중 오류가 발생했습니다.'
                )


              } finally {

                button.disabled =
                  false

                button.textContent =
                  '취소처리'

              }

            }
          )

      }
    )

}

  /* =========================================
   모바일 메뉴 카드결제
========================================= */

async function renderMerchantMenuCard() {

    const merchantIdText =
      sessionStorage.getItem(
        'login_merchant_id'
      ) ||
      localStorage.getItem(
        'login_merchant_id'
      )
  
  
    if (!merchantIdText) {
  
      location.replace(
        '/merchant-app'
      )
  
      return
    }
  
  
    const merchantId =
      Number(
        merchantIdText
      )
  
  
    const merchantName =
      sessionStorage.getItem(
        'login_merchant_name'
      ) ||
      localStorage.getItem(
        'login_merchant_name'
      ) ||
      '가맹점'
  
  
    app.innerHTML = `
      <div class="merchant-mobile-home">
  
        <header class="merchant-mobile-header">
  
          <div>
  
            <div class="merchant-mobile-brand">
              NXG PICK
            </div>
  
            <div class="merchant-mobile-store">
              ${merchantName}
            </div>
  
          </div>
  
          <button
            id="mobile-menu-card-back"
            class="merchant-mobile-logout"
            type="button"
          >
            이전
          </button>
  
        </header>
  
  
        <main class="merchant-mobile-content">
  
          <div class="merchant-mobile-page-title">
  
            <h1>
              메뉴결제
            </h1>
  
            <span>
              상품 선택 후 카드결제
            </span>
  
          </div>
  
  
          <div
            id="mobile-menu-product-list"
            class="merchant-mobile-menu-product-list"
          >
            상품을 불러오는 중입니다.
          </div>
  
  
          <div
            class="merchant-mobile-menu-total"
          >
            <span>
              결제금액
            </span>
  
            <strong
              id="mobile-menu-total-amount"
            >
              0원
            </strong>
          </div>
  
  
          <div
            class="merchant-mobile-manual-card"
          >
  
           <button
  id="mobile-menu-payment-submit"
  type="button"
  class="merchant-mobile-menu-pay-button"
>
  카드 결제
</button>
  
          </div>
  
        </main>
  
      </div>
    `
  
  
    document
      .querySelector(
        '#mobile-menu-card-back'
      )
      ?.addEventListener(
        'click',
        () => {
  
          location.href =
            '/merchant-app/card'
  
        }
      )
  
  
    const {
      data,
      error
    } =
      await supabase
        .from('products')
        .select('*')
        .eq(
          'merchant_id',
          merchantId
        )
        .eq(
          'status',
          '판매중'
        )
        .order(
          'sort_order',
          {
            ascending: true
          }
        )
        .order(
          'id',
          {
            ascending: true
          }
        )
  
  
    const productList =
      document.querySelector<HTMLDivElement>(
        '#mobile-menu-product-list'
      )
  
  
    if (!productList) {
      return
    }
  
  
    if (error) {
  
      productList.innerHTML =
        '상품 조회 실패: ' +
        error.message
  
      return
    }
  
  
    const products =
      data || []
  
  
    if (
      products.length === 0
    ) {
  
      productList.innerHTML = `
        <div class="merchant-mobile-order-empty">
          판매중인 상품이 없습니다.
        </div>
      `
  
      return
    }
  
  
    const cart =
      new Map<number, number>()
  
  
    const updateTotal = () => {
  
      let total = 0
  
  
      products.forEach(
        (product: any) => {
  
          const quantity =
            cart.get(
              Number(product.id)
            ) || 0
  
  
          total +=
            Number(
              product.price || 0
            ) *
            quantity
  
        }
      )
  
  
      const totalElement =
        document.querySelector<HTMLElement>(
          '#mobile-menu-total-amount'
        )
  
  
      if (totalElement) {
  
        totalElement.textContent =
          total.toLocaleString() +
          '원'
  
      }
  
  
      return total
    }
  
  
    productList.innerHTML =
      products
        .map(
          (product: any) => `
            <div
              class="merchant-mobile-menu-product"
            >
  
              <div
                class="merchant-mobile-menu-product-image"
              >
  
                ${
                  product.image_url
                    ? `
                      <img
                        src="${product.image_url}"
                        alt=""
                      >
                    `
                    : `
                      <span>
                        이미지 없음
                      </span>
                    `
                }
  
              </div>
  
  
              <div
                class="merchant-mobile-menu-product-info"
              >
  
                <strong>
                  ${product.product_name || '-'}
                </strong>
  
                <span>
                  ${Number(
                    product.price || 0
                  ).toLocaleString()}원
                </span>
  
  
                <div
                  class="merchant-mobile-menu-quantity"
                >
  
                  <button
                    type="button"
                    data-menu-minus="${product.id}"
                  >
                    −
                  </button>
  
                  <strong
                    id="mobile-menu-quantity-${product.id}"
                  >
                    0
                  </strong>
  
                  <button
                    type="button"
                    data-menu-plus="${product.id}"
                  >
                    +
                  </button>
  
                </div>
  
              </div>
  
            </div>
          `
        )
        .join('')
  
  
    document
      .querySelectorAll<HTMLButtonElement>(
        '[data-menu-plus]'
      )
      .forEach(
        (button) => {
  
          button.addEventListener(
            'click',
            () => {
  
              const productId =
                Number(
                  button.dataset.menuPlus || 0
                )
  
  
              const quantity =
                (
                  cart.get(
                    productId
                  ) || 0
                ) + 1
  
  
              cart.set(
                productId,
                quantity
              )
  
  
              const quantityElement =
                document.querySelector(
                  '#mobile-menu-quantity-' +
                  productId
                )
  
  
              if (quantityElement) {
  
                quantityElement.textContent =
                  String(
                    quantity
                  )
  
              }
  
  
              updateTotal()
  
            }
          )
  
        }
      )
  
  
    document
      .querySelectorAll<HTMLButtonElement>(
        '[data-menu-minus]'
      )
      .forEach(
        (button) => {
  
          button.addEventListener(
            'click',
            () => {
  
              const productId =
                Number(
                  button.dataset.menuMinus || 0
                )
  
  
              const currentQuantity =
                cart.get(
                  productId
                ) || 0
  
  
              const quantity =
                Math.max(
                  0,
                  currentQuantity - 1
                )
  
  
              cart.set(
                productId,
                quantity
              )
  
  
              const quantityElement =
                document.querySelector(
                  '#mobile-menu-quantity-' +
                  productId
                )
  
  
              if (quantityElement) {
  
                quantityElement.textContent =
                  String(
                    quantity
                  )
  
              }
  
  
              updateTotal()
  
            }
          )
  
        }
      )
  
  
    
  
  
      document
      .querySelector(
        '#mobile-menu-payment-submit'
      )
      ?.addEventListener(
        'click',
        async () => {
    
          const selectedItems =
            products
              .map(
                (product: any) => {
    
                  const quantity =
                    cart.get(
                      Number(
                        product.id
                      )
                    ) || 0
    
                  return {
                    id:
                      product.id,
    
                    name:
                      product.product_name,
    
                    product_name:
                      product.product_name,
    
                    price:
                      Number(
                        product.price || 0
                      ),
    
                    quantity:
                      quantity
                  }
    
                }
              )
              .filter(
                (item: any) =>
                  item.quantity > 0
              )
    
    
          const totalPrice =
            selectedItems.reduce(
              (
                sum: number,
                item: any
              ) =>
                sum +
                (
                  Number(item.price) *
                  Number(item.quantity)
                ),
              0
            )
    
    
          if (
            selectedItems.length === 0 ||
            totalPrice <= 0
          ) {
    
            alert(
              '결제할 상품을 선택해주세요.'
            )
    
            return
          }
    
    
          const {
            data: paymentMerchant,
            error: paymentMerchantError
          } =
            await supabase
              .from('merchants')
              .select(`
                merchant_name,
                online_pg_company_1,
                toss_client_key,
                korpay_pg_mid,
                korpay_pg_mkey
              `)
              .eq(
                'id',
                merchantId
              )
              .single()


          if (
            paymentMerchantError ||
            !paymentMerchant
          ) {

            alert(
              '가맹점 결제정보를 불러오지 못했습니다.'
            )

            return
          }


          const selectedOnlinePg =
            String(
              paymentMerchant
                .online_pg_company_1 ||
              ''
            ).trim()


          if (
            selectedOnlinePg !==
              '토스페이먼츠' &&
            selectedOnlinePg !==
              '코페이'
          ) {

            alert(
              '온라인결제 1 PG사를 확인해주세요.'
            )

            return
          }


          const {
            data: nextCallNumber,
            error: callNumberError
          } =
            await supabase.rpc(
              'get_next_call_number',
              {
                target_merchant_id:
                  merchantId
              }
            )


          if (
            callNumberError ||
            !nextCallNumber
          ) {

            alert(
              '주문번호 생성에 실패했습니다.'
            )

            return
          }


          const callNumber =
            Number(
              nextCallNumber
            )


          const orderNo =
            (
              selectedOnlinePg ===
                '코페이'
                ? 'KORPAY-'
                : 'TOSS-'
            ) +
            callNumber +
            '-' +
            Date.now()


          sessionStorage.setItem(
            'kiosk_call_number',
            String(
              callNumber
            )
          )

          sessionStorage.setItem(
            'kiosk_order_no',
            orderNo
          )

          sessionStorage.setItem(
            'kiosk_merchant_id',
            String(
              merchantId
            )
          )

          sessionStorage.setItem(
            'kiosk_items',
            JSON.stringify(
              selectedItems
            )
          )

          sessionStorage.setItem(
            'kiosk_total_amount',
            String(
              totalPrice
            )
          )

          sessionStorage.setItem(
            'merchantId',
            String(
              merchantId
            )
          )

          sessionStorage.setItem(
            'merchantName',
            paymentMerchant
              .merchant_name ||
              merchantName
          )

          sessionStorage.setItem(
            'message',
            '모바일 메뉴결제'
          )

          sessionStorage.setItem(
            'selected_pg_company',
            selectedOnlinePg
          )


          if (
            selectedOnlinePg ===
            '코페이'
          ) {

            if (
              !paymentMerchant
                .korpay_pg_mid ||
              !paymentMerchant
                .korpay_pg_mkey
            ) {

              alert(
                '코페이 PG MID 또는 MKEY가 등록되지 않았습니다.'
              )

              return
            }


            const ediDate =
              getKorpayEdiDate()


            const hashKey =
              await createKorpayHash(
                String(
                  paymentMerchant
                    .korpay_pg_mid
                ),
                ediDate,
                totalPrice,
                String(
                  paymentMerchant
                    .korpay_pg_mkey
                )
              )


            const paymentData = {

              merchantId:
                paymentMerchant
                  .korpay_pg_mid,

              productName:
                selectedItems.length === 1
                  ? selectedItems[0].name
                  : (
                      selectedItems[0].name +
                      ' 외 ' +
                      (
                        selectedItems.length -
                        1
                      ) +
                      '건'
                    ),

              orderNumber:
                orderNo.replace(
                  /[^a-zA-Z0-9]/g,
                  ''
                ),

              amount:
                totalPrice,

              payMethod:
                'card',

              returnUrl:
                apiBaseUrl +
                '/api/korpay-return',

              ediDate:
                ediDate,

              hashKey:
                hashKey,

              customerName:
                paymentMerchant
                  .merchant_name ||
                merchantName,

              reserved:
                String(
                  merchantId
                ),

              language:
                'ko'
            }


            const korpay =
              (window as any)
                .KorpaySdk


            if (!korpay) {

              alert(
                'Korpay SDK를 찾을 수 없습니다.'
              )

              return
            }


            korpay.paymentTimeout =
              30000


            korpay.payment(
              'https://staging-payments.korpay.com/v1',
              paymentData,
              {

                onStart: () => {

                  const payButton =
                    document.querySelector<HTMLButtonElement>(
                      '#mobile-menu-payment-submit'
                    )

                  if (payButton) {

                    payButton.disabled =
                      true

                    payButton.innerText =
                      '결제창 호출 중...'
                  }
                },


                onError: (
                  error: any
                ) => {

                  alert(
                    String(
                      error
                    )
                  )

                  const payButton =
                    document.querySelector<HTMLButtonElement>(
                      '#mobile-menu-payment-submit'
                    )

                  if (payButton) {

                    payButton.disabled =
                      false

                    payButton.innerText =
                      '카드 결제'
                  }
                },


                onClose: () => {

                  const payButton =
                    document.querySelector<HTMLButtonElement>(
                      '#mobile-menu-payment-submit'
                    )

                  if (payButton) {

                    payButton.disabled =
                      false

                    payButton.innerText =
                      '카드 결제'
                  }
                }

              }
            )

            return
          }


          if (
            selectedOnlinePg ===
            '토스페이먼츠'
          ) {

            const tossClientKey =
              String(
                paymentMerchant
                  .toss_client_key ||
                clientKey
              ).trim()


            if (!tossClientKey) {

              alert(
                '토스 Client Key가 등록되지 않았습니다.'
              )

              return
            }


            const tossPayments =
              await loadTossPayments(
                tossClientKey
              )


            await tossPayments
              .requestPayment(
                '카드',
                {

                  amount:
                    totalPrice,

                  orderId:
                    orderNo.replace(
                      /[^a-zA-Z0-9]/g,
                      ''
                    ),

                  orderName:
                    selectedItems.length === 1
                      ? selectedItems[0].name
                      : (
                          selectedItems[0].name +
                          ' 외 ' +
                          (
                            selectedItems.length -
                            1
                          ) +
                          '건'
                        ),

                  customerName:
                    paymentMerchant
                      .merchant_name ||
                    merchantName,

                  successUrl:
                    window.location.origin +
                    '/merchant-app/success?source=kiosk' +
                    '&pg=토스페이먼츠' +
                    '&merchantId=' +
                    merchantId +
                    '&merchantName=' +
                    encodeURIComponent(
                      paymentMerchant
                        .merchant_name ||
                      merchantName
                    ),

                  failUrl:
                    window.location.origin +
                    '/fail'
                }
              )

            return
          }

        }
      )
        
    }
      
    /* =========================================
   모바일 메뉴결제 성공
========================================= */

async function renderMerchantPaymentSuccess() {

    const params =
      new URLSearchParams(
        window.location.search
      )
  
  
    const orderId =
      params.get('orderId') || ''
  
    const paymentKey =
      params.get('paymentKey') || ''
  
    const amountText =
      params.get('amount') || ''
  
    const merchantIdText =
      params.get('merchantId') ||
      sessionStorage.getItem(
        'kiosk_merchant_id'
      ) ||
      sessionStorage.getItem(
        'login_merchant_id'
      ) ||
      ''
  
  
    const merchantName =
      params.get('merchantName') ||
      sessionStorage.getItem(
        'merchantName'
      ) ||
      sessionStorage.getItem(
        'login_merchant_name'
      ) ||
      '가맹점'
  
  
    if (
      !orderId ||
      !paymentKey ||
      !amountText ||
      !merchantIdText
    ) {
  
      app.innerHTML = `
        <div class="merchant-mobile-home">
  
          <main class="merchant-mobile-content">
  
            <div class="merchant-mobile-manual-card">
  
              <h2>
                결제정보를 확인할 수 없습니다.
              </h2>
  
              <button
                id="mobile-success-orders"
                type="button"
                class="merchant-mobile-menu-pay-button"
              >
                주문관리로 이동
              </button>
  
            </div>
  
          </main>
  
        </div>
      `
  
  
      document
        .querySelector(
          '#mobile-success-orders'
        )
        ?.addEventListener(
          'click',
          () => {
  
            location.href =
              '/merchant-app/orders'
  
          }
        )
  
      return
    }
  
  
    const merchantId =
      Number(
        merchantIdText
      )
  
  
    const paymentAmount =
      Number(
        amountText
      )
  
  
    app.innerHTML = `
      <div class="merchant-mobile-home">
  
        <main class="merchant-mobile-content">
  
          <div class="merchant-mobile-manual-card">
  
            <h2>
              결제 처리 중입니다.
            </h2>
  
            <p>
              잠시만 기다려주세요.
            </p>
  
          </div>
  
        </main>
  
      </div>
    `
  
  
    try {
  
      const {
        data: merchantData,
        error: merchantError
      } =
        await supabase
          .from('merchants')
          .select(`
            merchant_name,
            fee_rate
          `)
          .eq(
            'id',
            merchantId
          )
          .maybeSingle()
  
  
      if (
        merchantError ||
        !merchantData
      ) {
  
        throw new Error(
          '가맹점 정보를 불러오지 못했습니다.'
        )
  
      }
  
  
      const feeRate =
        Number(
          merchantData.fee_rate || 0
        )
  
  
      const feeAmount =
        Math.floor(
          paymentAmount *
          feeRate /
          100
        )
  
  
      const settlementAmount =
        paymentAmount -
        feeAmount
  
  
      const {
        data: existingPayment
      } =
        await supabase
          .from('payments')
          .select('id')
          .eq(
            'order_id',
            orderId
          )
          .maybeSingle()
  
  
      let confirmResult: any =
        null
  
  
      if (!existingPayment) {
  
        const confirmResponse =
          await fetch(
            apiBaseUrl + '/api/toss-confirm',
            {
              method:
                'POST',
  
              headers: {
                'Content-Type':
                  'application/json'
              },
  
              body:
                JSON.stringify({
                  paymentKey,
                  orderId,
                  amount:
                    amountText
                })
            }
          )
  
  
        if (!confirmResponse.ok) {
  
          const confirmError =
            await confirmResponse.json()
  
          throw new Error(
            confirmError.message ||
            '토스 결제 승인에 실패했습니다.'
          )
  
        }
  
  
        confirmResult =
          await confirmResponse.json()
  
  
        const tossCardCompanyMap:
          Record<string, string> = {
  
            '3K': '기업비씨',
            '46': '광주',
            '71': '롯데',
            '30': '산업',
            '31': 'BC',
            '51': '삼성',
            '38': '새마을',
            '41': '신한',
            '62': '신협',
            '36': '씨티',
            '33': '우리',
            'W1': '우리',
            '37': '우체국',
            '39': '저축',
            '35': '전북',
            '42': '제주',
            '15': '카카오뱅크',
            '3A': '케이뱅크',
            '24': '토스뱅크',
            '21': '하나',
            '61': '현대',
            '11': '국민',
            '91': '농협',
            '34': '수협'
          }
  
  
        const tossCardCompanyCode =
          confirmResult.card?.acquirerCode ||
          confirmResult.card?.issuerCode ||
          ''
  
  
        const tossCardCompany =
          tossCardCompanyMap[
            tossCardCompanyCode
          ] ||
          tossCardCompanyCode
  
  
        const {
          count
        } =
          await supabase
            .from('payments')
            .select(
              '*',
              {
                count:
                  'exact',
  
                head:
                  true
              }
            )
  
  
        const nextOrderNumber =
          (count || 0) + 1
  
  
        const {
          error: paymentSaveError
        } =
          await supabase
            .from('payments')
            .insert({
              order_number:
                nextOrderNumber,
  
              order_id:
                orderId,
  
              payment_key:
                paymentKey,
  
              amount:
                paymentAmount,
  
              fee_rate:
                feeRate,
  
              fee_amount:
                feeAmount,
  
              settlement_amount:
                settlementAmount,
  
              status:
                'paid',
  
              message:
                sessionStorage.getItem(
                  'message'
                ) ||
                '모바일 메뉴결제',
  
              merchant_id:
                merchantId,
  
              merchant_name:
                merchantData
                  .merchant_name ||
                merchantName,
  
              pg_company:
                '토스페이먼츠',
  
              payment_method:
                confirmResult.method ||
                '카드',
  
              approval_number:
                confirmResult.card?.approveNo ||
                '',
  
              card_company:
                tossCardCompany,
  
              card_number:
                confirmResult.card?.number ||
                '',
  
              installment_months:
                confirmResult.card
                  ?.installmentPlanMonths
                  ? String(
                      confirmResult.card
                        .installmentPlanMonths
                    )
                  : '일시불',
  
              approved_at:
                confirmResult.approvedAt ||
                new Date()
                  .toISOString()
            })
  
  
        if (paymentSaveError) {
  
          throw new Error(
            '결제내역 저장 실패: ' +
            paymentSaveError.message
          )
  
        }
  
      }
  
  
      const kioskOrderNo =
        sessionStorage.getItem(
          'kiosk_order_no'
        ) || ''
  
  
      const kioskItemsText =
        sessionStorage.getItem(
          'kiosk_items'
        )
  
  
      const kioskTotalAmount =
        sessionStorage.getItem(
          'kiosk_total_amount'
        )
  
  
      const callNumber =
        sessionStorage.getItem(
          'kiosk_call_number'
        )
  
  
      const pgOrderId =
        kioskOrderNo
          ? kioskOrderNo.replace(
              /[^a-zA-Z0-9]/g,
              ''
            )
          : orderId
  
  
      const {
        data: existingOrder
      } =
        await supabase
          .from('orders')
          .select('id')
          .eq(
            'merchant_id',
            merchantId
          )
          .eq(
            'pg_order_id',
            pgOrderId
          )
          .maybeSingle()
  
  
      if (
        !existingOrder &&
        kioskItemsText &&
        kioskTotalAmount
      ) {
  
        const items =
          JSON.parse(
            kioskItemsText
          )
  
  
        const {
          error: orderSaveError
        } =
          await supabase
            .from('orders')
            .insert({
              merchant_id:
                merchantId,
  
              order_no:
                callNumber ||
                '-',
  
              call_number:
                callNumber
                  ? Number(
                      callNumber
                    )
                  : null,
  
              pg_order_id:
                pgOrderId,
  
              payment_key:
                paymentKey,
  
              items:
                items,
  
              total_amount:
                Number(
                  kioskTotalAmount
                ),
  
              order_status:
                '접수',
  
              payment_status:
                '결제완료'
            })
  
  
        if (orderSaveError) {
  
          throw new Error(
            '주문 저장 실패: ' +
            orderSaveError.message
          )
  
        }
  
      }
  
  
      sessionStorage.removeItem(
        'kiosk_order_no'
      )
  
      sessionStorage.removeItem(
        'kiosk_merchant_id'
      )
  
      sessionStorage.removeItem(
        'kiosk_items'
      )
  
      sessionStorage.removeItem(
        'kiosk_total_amount'
      )
  
      sessionStorage.removeItem(
        'kiosk_call_number'
      )
  
  
      window.history.replaceState(
        {},
        '',
        '/merchant-app/success'
      )
  
  
      app.innerHTML = `
        <div class="merchant-mobile-home">
  
          <header class="merchant-mobile-header">
  
            <div>
  
              <div class="merchant-mobile-brand">
                NXG PICK
              </div>
  
              <div class="merchant-mobile-store">
                ${merchantName}
              </div>
  
            </div>
  
          </header>
  
  
          <main class="merchant-mobile-content">
  
            <div class="merchant-mobile-manual-card">
  
              <h2>
                결제가 완료되었습니다.
              </h2>
  
              <p>
                ${paymentAmount.toLocaleString()}원
              </p>
  
              <button
                id="mobile-success-orders"
                type="button"
                class="merchant-mobile-menu-pay-button"
              >
                주문관리 확인
              </button>
  
              <button
                id="mobile-success-card"
                type="button"
                class="merchant-mobile-menu-pay-button"
              >
                카드결제로 돌아가기
              </button>
  
            </div>
  
          </main>
  
        </div>
      `
  
  
      document
        .querySelector(
          '#mobile-success-orders'
        )
        ?.addEventListener(
          'click',
          () => {
  
            location.href =
              '/merchant-app/orders'
  
          }
        )
  
  
      document
        .querySelector(
          '#mobile-success-card'
        )
        ?.addEventListener(
          'click',
          () => {
  
            location.href =
              '/merchant-app/card'
  
          }
        )
  
  
    } catch (error: any) {
  
      console.error(
        '모바일 결제 완료 처리 오류:',
        error
      )
  
  
      app.innerHTML = `
        <div class="merchant-mobile-home">
  
          <main class="merchant-mobile-content">
  
            <div class="merchant-mobile-manual-card">
  
              <h2>
                결제 처리 오류
              </h2>
  
              <p>
                ${
                  error?.message ||
                  '결제 처리 중 오류가 발생했습니다.'
                }
              </p>
  
              <button
                id="mobile-success-orders"
                type="button"
                class="merchant-mobile-menu-pay-button"
              >
                주문관리로 이동
              </button>
  
            </div>
  
          </main>
  
        </div>
      `
  
  
      document
        .querySelector(
          '#mobile-success-orders'
        )
        ?.addEventListener(
          'click',
          () => {
  
            location.href =
              '/merchant-app/orders'
  
          }
        )
  
    }
  }

/* =========================================
   모바일 로그인
========================================= */

function renderMerchantLogin() {

  const savedMerchantId =
    sessionStorage.getItem(
      'login_merchant_id'
    ) ||
    localStorage.getItem(
      'login_merchant_id'
    )

  if (savedMerchantId) {
    location.replace(
      '/merchant-app/home'
    )
    return
  }


  app.innerHTML = `
    <div class="merchant-app-login-page">

      <section class="merchant-app-login-card">

        <div class="merchant-app-login-badge">
          NXG PICK ADMIN
        </div>

        <h1 class="merchant-app-login-title">
          가맹점 로그인
        </h1>

        <form id="mobile-merchant-login">

          <input
            id="mobile-login-id"
            class="merchant-app-login-input"
            type="text"
            autocomplete="username"
            placeholder="아이디"
          />

          <input
            id="mobile-login-password"
            class="merchant-app-login-input"
            type="password"
            autocomplete="current-password"
            placeholder="비밀번호"
          />

          <button
            type="submit"
            class="merchant-app-login-button"
          >
            로그인
          </button>

          <div
            id="mobile-login-message"
            class="merchant-app-login-message"
          ></div>

        </form>

        <div class="merchant-app-login-footer">
          NXG PICK Merchant System
        </div>

      </section>

    </div>
  `


  document
    .querySelector(
      '#mobile-merchant-login'
    )
    ?.addEventListener(
      'submit',
      async (event) => {

        event.preventDefault()


        const loginIdInput =
          document.querySelector<HTMLInputElement>(
            '#mobile-login-id'
          )

        const passwordInput =
          document.querySelector<HTMLInputElement>(
            '#mobile-login-password'
          )

        const message =
          document.querySelector<HTMLDivElement>(
            '#mobile-login-message'
          )

        const submitButton =
          document.querySelector<HTMLButtonElement>(
            '.merchant-app-login-button'
          )


        const loginId =
          loginIdInput?.value.trim() || ''

        const password =
          passwordInput?.value.trim() || ''


        if (!loginId || !password) {

          if (message) {
            message.textContent =
              '아이디와 비밀번호를 입력해주세요.'
          }

          return
        }


        if (submitButton) {
          submitButton.disabled = true
          submitButton.textContent =
            '로그인 중...'
        }

        if (message) {
          message.textContent = ''
        }


        try {

          const {
            data: merchants,
            error
          } =
            await supabase
              .from('merchants')
              .select(`
                id,
                merchant_login_id,
                merchant_password,
                merchant_name,
                merchant_type
              `)
              .eq(
                'merchant_login_id',
                loginId
              )
        
        
          if (error) {
        
            if (message) {
              message.textContent =
                '로그인 조회 실패: ' +
                error.message
            }
        
            return
          }
        
        
          const merchant =
            (merchants || []).find(
              (item: any) =>
                String(
                  item.merchant_password || ''
                ).trim() === password
            )
        
        
          if (!merchant) {
        
            if (message) {
              message.textContent =
                '아이디 또는 비밀번호가 올바르지 않습니다.'
            }
        
            return
          }
        
        
          const merchantLoginData:
            Record<string, string> = {
        
              login_merchant_id:
                String(
                  merchant.id || ''
                ),
        
              login_merchant_code:
                String(
                  merchant.merchant_login_id || ''
                ),
        
              login_merchant_name:
                String(
                  merchant.merchant_name || ''
                ),
        
              login_merchant_type:
                String(
                  merchant.merchant_type ||
                  '일반매장'
                )
            }
        
        
          Object.entries(
            merchantLoginData
          ).forEach(
            ([key, value]) => {
        
              sessionStorage.setItem(
                key,
                value
              )
        
              localStorage.setItem(
                key,
                value
              )
            }
          )
        
        
          location.href =
            '/merchant-app/home'


        } catch (error) {

          console.error(
            '모바일 로그인 오류:',
            error
          )

          if (message) {
            message.textContent =
              '로그인 중 오류가 발생했습니다.'
          }


        } finally {

          if (submitButton) {
            submitButton.disabled = false
            submitButton.textContent =
              '로그인'
          }

        }

      }
    )
}


/* =========================================
   모바일 앱 경로
========================================= */

if (
    path === '/merchant-app/home'
  ) {
  
    renderMerchantHome()
  
  } else if (
    path === '/merchant-app/orders'
  ) {
  
    void renderMerchantOrders()

  } else if (
    path === '/merchant-app/beauty/orders'
  ) {

    void renderBeautyOrders()

  } else if (
    path === '/merchant-app/beauty/staff'
  ) {
  
    void renderBeautyStaffMobile()

  } else if (
    path === '/merchant-app/beauty/schedule'
  ) {
  
    void renderBeautyScheduleMobile()
    
  } else if (
    path === '/merchant-app/products'
  ) {
  
    void renderMerchantProducts()
  
  } else if (
    path === '/merchant-app/qr'
  ) {
  
    void renderMerchantQr()
  
  } else if (
    path === '/merchant-app/card'
  ) {
  
    renderMerchantCard()
  
} else if (
    path === '/merchant-app/card/manual'
  ) {
  
    renderMerchantManualCard()
  
  } else if (
    path === '/merchant-app/card/sms'
  ) {
  
    renderMerchantSmsCard()

  } else if (
    path === '/merchant-app/card/cash'
  ) {
  
    renderMerchantCashReceipt()

  } else if (
    path === '/merchant-app/card/cash-history'
  ) {
  
    void renderMerchantCashReceiptHistory()
  
    
  
} else if (
    path === '/merchant-app/card/menu'
  ) {
  
    void renderMerchantMenuCard()
  
  } else if (
    path === '/merchant-app/success'
  ) {
  
    void renderMerchantPaymentSuccess()
  
  } else {
  
    renderMerchantLogin()
  
  }