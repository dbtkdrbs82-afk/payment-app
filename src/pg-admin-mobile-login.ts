export async function renderPgAdminMobileLogin(
    app: HTMLDivElement
  ) {
  
    const existingAdminId =
      sessionStorage.getItem(
        'admin_id'
      ) || ''
  
    if (existingAdminId) {
      location.replace(
        '/pg-admin-mobile'
      )
      return
    }
  
  
    app.innerHTML = `
      <style>
  
        body {
          margin: 0;
          background: #071d38;
          font-family:
            Arial,
            "Noto Sans KR",
            sans-serif;
        }
  
        .nxg-mobile-login-page {
          min-height: 100vh;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 18px;
          background:
            linear-gradient(
              160deg,
              #071d38 0%,
              #0b2e57 55%,
              #174981 100%
            );
        }
  
        .nxg-mobile-login-wrap {
          width: 100%;
          max-width: 420px;
        }
  
        .nxg-mobile-login-brand {
          text-align: center;
          margin-bottom: 28px;
          color: white;
        }
  
        .nxg-mobile-login-logo {
          color: #52adff;
          font-size: 17px;
          font-weight: 900;
          letter-spacing: 1px;
        }
  
        .nxg-mobile-login-brand h1 {
          margin: 12px 0 0;
          font-size: 27px;
          line-height: 1.3;
        }
  
        .nxg-mobile-login-brand p {
          margin: 10px 0 0;
          color: #b9cce1;
          font-size: 13px;
          line-height: 1.6;
        }
  
        .nxg-mobile-login-card {
          background: white;
          border-radius: 18px;
          padding: 26px 20px;
          box-shadow:
            0 18px 45px
            rgba(0,0,0,.22);
        }
  
        .nxg-mobile-login-badge {
          display: inline-block;
          padding: 5px 9px;
          margin-bottom: 10px;
          border-radius: 20px;
          background: #edf5ff;
          color: #174981;
          font-size: 11px;
          font-weight: 900;
        }
  
        .nxg-mobile-login-card h2 {
          margin: 0 0 22px;
          color: #102a46;
          font-size: 22px;
        }
  
        .nxg-mobile-login-input {
          width: 100%;
          height: 52px;
          box-sizing: border-box;
          margin-bottom: 12px;
          padding: 0 14px;
          border: 1px solid #ced9e5;
          border-radius: 10px;
          background: white;
          font-size: 16px;
          outline: none;
        }
  
        .nxg-mobile-login-input:focus {
          border-color: #174981;
          box-shadow:
            0 0 0 3px
            rgba(23,73,129,.10);
        }
  
        .nxg-mobile-login-button {
          width: 100%;
          height: 54px;
          margin-top: 5px;
          border: 0;
          border-radius: 10px;
          background: #174981;
          color: white;
          font-size: 16px;
          font-weight: 900;
          cursor: pointer;
        }
  
        .nxg-mobile-login-button:disabled {
          opacity: .65;
          cursor: default;
        }
  
        .nxg-mobile-login-footer {
          margin-top: 20px;
          text-align: center;
          color: #8795a5;
          font-size: 11px;
        }
  
      </style>
  
  
      <div
        class="nxg-mobile-login-page"
      >
  
        <div
          class="nxg-mobile-login-wrap"
        >
  
          <div
            class="nxg-mobile-login-brand"
          >
  
            <div
              class="nxg-mobile-login-logo"
            >
              NXG PAYMENT
            </div>
  
            <h1>
              모바일 관리자
            </h1>
  
            <p>
              가맹점과 결제내역을<br>
              모바일에서 확인합니다.
            </p>
  
          </div>
  
  
          <div
            class="nxg-mobile-login-card"
          >
  
            <div
              class="nxg-mobile-login-badge"
            >
              NXG MOBILE ADMIN
            </div>
  
            <h2>
              관리자 로그인
            </h2>
  
  
            <input
              id="mobile-admin-login-id"
              class="nxg-mobile-login-input"
              type="text"
              placeholder="아이디"
              autocomplete="username"
            />
  
  
            <input
              id="mobile-admin-login-password"
              class="nxg-mobile-login-input"
              type="password"
              placeholder="비밀번호"
              autocomplete="current-password"
            />
  
  
            <button
              id="mobile-admin-login-button"
              class="nxg-mobile-login-button"
              type="button"
            >
              로그인
            </button>
  
  
            <div
              class="nxg-mobile-login-footer"
            >
              NXG Payment Admin System
            </div>
  
          </div>
  
        </div>
  
      </div>
    `
  
  
    const login = async () => {
  
      const loginId =
        (
          document
            .querySelector<HTMLInputElement>(
              '#mobile-admin-login-id'
            )
            ?.value ||
          ''
        )
          .trim()
          .toUpperCase()
  
  
      const password =
        (
          document
            .querySelector<HTMLInputElement>(
              '#mobile-admin-login-password'
            )
            ?.value ||
          ''
        )
          .trim()
  
  
      if (
        !loginId ||
        !password
      ) {
  
        alert(
          '아이디와 비밀번호를 입력해주세요.'
        )
  
        return
      }
  
  
      const loginButton =
        document
          .querySelector<HTMLButtonElement>(
            '#mobile-admin-login-button'
          )
  
  
      if (loginButton) {
  
        loginButton.disabled =
          true
  
        loginButton.textContent =
          '로그인 중...'
  
      }
  
  
      try {
  
        const response =
          await fetch(
            '/api/admin-login',
            {
              method:
                'POST',
  
              headers: {
                'Content-Type':
                  'application/json'
              },
  
              credentials:
                'include',
  
              body:
                JSON.stringify({
                  loginId,
                  password
                })
            }
          )
  
  
        const result =
          await response.json()
  
  
        if (
          !response.ok ||
          !result?.success ||
          !result?.admin
        ) {
  
          alert(
            result?.message ||
            '아이디 또는 비밀번호가 올바르지 않습니다.'
          )
  
          if (loginButton) {
  
            loginButton.disabled =
              false
  
            loginButton.textContent =
              '로그인'
  
          }
  
          return
        }
  
  
        const adminUser =
          result.admin
  
  
        sessionStorage.setItem(
          'admin_id',
          adminUser.login_id
        )
  
  
        sessionStorage.setItem(
          'admin_name',
          adminUser.admin_name || ''
        )
  
  
        sessionStorage.setItem(
          'admin_role',
          adminUser.role || ''
        )
  
  
        sessionStorage.removeItem(
          'mobile_admin_page'
        )
  
  
        location.replace(
          '/pg-admin-mobile'
        )
  
  
      } catch (error) {
  
        console.error(
          '모바일 관리자 로그인 오류:',
          error
        )
  
  
        alert(
          '로그인 서버에 연결하지 못했습니다.'
        )
  
  
        if (loginButton) {
  
          loginButton.disabled =
            false
  
          loginButton.textContent =
            '로그인'
  
        }
  
      }
  
    }
  
  
    document
      .querySelector(
        '#mobile-admin-login-button'
      )
      ?.addEventListener(
        'click',
        () => {
          void login()
        }
      )
  
  
    document
      .querySelector(
        '#mobile-admin-login-password'
      )
      ?.addEventListener(
        'keydown',
        (event) => {
  
          if (
            (
              event as KeyboardEvent
            ).key ===
            'Enter'
          ) {
  
            void login()
  
          }
  
        }
      )
  
  }