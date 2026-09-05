import './merchant-app.css'

const app =
  document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('앱 영역을 찾을 수 없습니다.')
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
  .querySelector('#mobile-merchant-login')
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


        const merchantLoginData: Record<
          string,
          string
        > = {

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


        if (message) {
          message.textContent =
            merchant.name +
            ' 로그인 성공'
        }


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