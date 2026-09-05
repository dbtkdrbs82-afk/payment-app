import './merchant-app.css'

import {
    createClient
  } from '@supabase/supabase-js'

  const supabaseUrl = 'https://rnmptlxdeihvfwegoqnf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJubXB0bHhkZWlodmZ3ZWdvcW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MzcwMDMsImV4cCI6MjA5NDIxMzAwM30.5SeOiuZgFmU7RUu5kzLpLBUwC91SYI3WxqRFoafMrG8'

const supabase = createClient(supabaseUrl, supabaseKey)

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
    ) || '일반매장'


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

  <button
    type="button"
    class="merchant-mobile-menu-card"
    data-menu="orders"
  >
    <span class="merchant-mobile-menu-icon">
      📋
    </span>

    <strong>
      주문관리
    </strong>

    <small>
      주문 및 결제내역 관리
    </small>
  </button>


  <button
    type="button"
    class="merchant-mobile-menu-card"
    data-menu="products"
  >
    <span class="merchant-mobile-menu-icon">
      🛍️
    </span>

    <strong>
      상품관리
    </strong>

    <small>
      상품 등록 및 수정
    </small>
  </button>


  <button
    type="button"
    class="merchant-mobile-menu-card"
    data-menu="qr"
  >
    <span class="merchant-mobile-menu-icon">
      📱
    </span>

    <strong>
      PICK QR
    </strong>

    <small>
      가맹점 QR 확인 및 관리
    </small>
  </button>


  <button
    type="button"
    class="merchant-mobile-menu-card"
    data-menu="card"
  >
    <span class="merchant-mobile-menu-icon">
      💳
    </span>

    <strong>
      카드결제
    </strong>

    <small>
      OCR · 수기 · 메뉴결제 · 현금영수증
    </small>
  </button>

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
    '[data-menu="orders"]'
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
    '[data-menu="products"]'
  )
  ?.addEventListener(
    'click',
    () => {
      location.href =
        '/merchant-app/products'
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


summary.innerHTML = `
  <span>
    주문수 :
    <strong>
      ${orders.length}건
    </strong>
  </span>

  <span>
    매출합계 :
    <strong>
      ${salesTotal.toLocaleString()}원
    </strong>
  </span>

  <span>
    정산예정금액 :
    <strong>
      ${settlementTotal.toLocaleString()}원
    </strong>
  </span>
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
                    '/api/korpay-cancel',
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
                    '/api/toss-cancel',
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
        amount / 1.1
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


              placeholder="카테고리 직접 입력"


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

          const response =
            await fetch(
              '/api/merchant-app-login',
              {
                method: 'POST',

                headers: {
                  'Content-Type':
                    'application/json'
                },

                body: JSON.stringify({
                  loginId,
                  password
                })
              }
            )


          const result =
            await response.json()


          if (
            !response.ok ||
            !result.success
          ) {

            if (message) {
              message.textContent =
                result.message ||
                '로그인에 실패했습니다.'
            }

            return
          }


          const merchant =
            result.merchant


          const merchantLoginData:
            Record<string, string> = {

              login_merchant_id:
                String(
                  merchant.id || ''
                ),

              login_merchant_code:
                String(
                  merchant.loginId || ''
                ),

              login_merchant_name:
                String(
                  merchant.name || ''
                ),

              login_merchant_type:
                String(
                  merchant.type || ''
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
    path === '/merchant-app/products'
  ) {
  
    void renderMerchantProducts()
  
  } else {
  
    renderMerchantLogin()
  
  }