import './merchant-app.css'

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

} else {

  renderMerchantLogin()

}