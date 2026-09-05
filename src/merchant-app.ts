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
  
  
    const selectedDate =
      params.get('date') ||
      getKoreaDate(new Date())
  
  
    const startIso =
      new Date(
        selectedDate +
        'T00:00:00+09:00'
      ).toISOString()
  
    const endIso =
      new Date(
        selectedDate +
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
  
          </div>
  
  
          <div class="merchant-mobile-selected-date">
            ${selectedDate}
          </div>
  
  
          <div
            id="mobile-order-summary"
            class="merchant-mobile-order-summary"
          >
            주문을 불러오는 중입니다.
          </div>
  
  
          <div
            id="mobile-order-list"
            class="merchant-mobile-order-list"
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
  
  
    const changeDate = (
      amount: number
    ) => {
  
      const date =
        new Date(
          selectedDate +
          'T00:00:00+09:00'
        )
  
      date.setDate(
        date.getDate() + amount
      )
  
      location.href =
        '/merchant-app/orders?date=' +
        getKoreaDate(date)
    }
  
  
    document
      .querySelector(
        '#mobile-order-prev'
      )
      ?.addEventListener(
        'click',
        () => {
          changeDate(-1)
        }
      )
  
  
    document
      .querySelector(
        '#mobile-order-next'
      )
      ?.addEventListener(
        'click',
        () => {
          changeDate(1)
        }
      )
  
  
    document
      .querySelector(
        '#mobile-order-today'
      )
      ?.addEventListener(
        'click',
        () => {
  
          location.href =
            '/merchant-app/orders?date=' +
            getKoreaDate(
              new Date()
            )
        }
      )
  
  
    const [
      orderResult,
      merchantResult
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
            call_message
          `)
          .eq(
            'id',
            merchantId
          )
          .maybeSingle()
  
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
  
    const merchantSetting =
      merchantResult.data
  
  
    summary.textContent =
      '주문수 : ' +
      orders.length +
      '건'
  
  
    if (orders.length === 0) {
  
      orderList.innerHTML = `
        <div class="merchant-mobile-order-empty">
          주문내역이 없습니다.
        </div>
      `
  
      return
    }
  
  
    orders.forEach(
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
  
  
        const card =
          document.createElement(
            'div'
          )
  
        card.className =
          'merchant-mobile-order-card'
  
  
        card.innerHTML = `
  
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
  
  
          <div class="merchant-mobile-order-date">
  
            ${new Date(
              order.created_at
            ).toLocaleString(
              'ko-KR'
            )}
  
          </div>
  
  
          <div class="merchant-mobile-order-items">
  
            ${orderItems}
  
          </div>
  
  
          <div class="merchant-mobile-order-bottom">
  
            <span
              class="merchant-mobile-order-status"
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
      }
    )
  
  
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
  
  } else {
  
    renderMerchantLogin()
  
  }