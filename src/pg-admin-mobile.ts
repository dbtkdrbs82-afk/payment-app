export async function renderPgAdminMobile(
    app: HTMLDivElement,
    supabase: any
  ) {
  
    const adminId =
      sessionStorage.getItem('admin_id') || ''
  
    const adminName =
      sessionStorage.getItem('admin_name') || ''
  
    const adminRole =
      sessionStorage.getItem('admin_role') || ''
  
  
    if (!adminId) {
      location.replace('/admin-login')
      return
    }
  
  
    const escapeHtml = (
      value: unknown
    ) => {
      return String(
        value ?? ''
      )
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
    }
  
  
    const formatMoney = (
      value: unknown
    ) => {
      return Number(
        value || 0
      ).toLocaleString() + '원'
    }
  
  
    const formatDate = (
      value: unknown
    ) => {
  
      if (!value) {
        return '-'
      }
  
      try {
  
        return new Date(
          String(value)
        ).toLocaleString(
          'ko-KR',
          {
            timeZone:
              'Asia/Seoul'
          }
        )
  
      } catch {
  
        return String(value)
  
      }
  
    }
  
  
    const roleText = (
      role: string
    ) => {
  
      if (role === 'MASTER') {
        return '최고관리자'
      }
  
      if (role === 'BRANCH') {
        return '지사'
      }
  
      if (role === 'AGENCY') {
        return '대리점'
      }
  
      if (role === 'MANAGER') {
        return '담당자'
      }
  
      return role || '-'
    }
  
  
    const todayText =
      new Intl.DateTimeFormat(
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
        new Date()
      )
  
  
    const {
      data: allAdminUsers,
      error: adminUsersError
    } =
      await supabase
        .from(
          'admin_users'
        )
        .select('*')
        .order(
          'id',
          {
            ascending:
              true
          }
        )
  
  
    if (adminUsersError) {
  
      alert(
        '조직정보를 불러오지 못했습니다.\n' +
        adminUsersError.message
      )
  
      return
    }
  
  
    const adminUsers =
      allAdminUsers || []
  
  
    const currentAdmin =
      adminUsers.find(
        (user: any) =>
          String(
            user.login_id || ''
          ).toUpperCase() ===
          adminId.toUpperCase()
      )
  
  
    if (
      !currentAdmin &&
      adminRole !== 'MASTER'
    ) {
  
      alert(
        '현재 관리자 정보를 확인하지 못했습니다.'
      )
  
      return
    }
  
  
    const currentAdminDbId =
      Number(
        currentAdmin?.id || 0
      )
  
  
    const {
      data: allMerchants,
      error: merchantError
    } =
      await supabase
        .from(
          'merchants'
        )
        .select('*')
        .order(
          'id',
          {
            ascending:
              false
          }
        )
  
  
    if (merchantError) {
  
      alert(
        '가맹점 정보를 불러오지 못했습니다.\n' +
        merchantError.message
      )
  
      return
    }
  
  
    const getVisibleMerchants = () => {
  
      let merchants =
        [
          ...(
            allMerchants ||
            []
          )
        ]
  
  
      if (
        adminRole ===
        'MANAGER'
      ) {
  
        merchants =
          merchants.filter(
            (merchant: any) =>
              Number(
                merchant
                  .manager_admin_id
              ) ===
              currentAdminDbId
          )
  
      }
  
  
      if (
        adminRole ===
        'AGENCY'
      ) {
  
        merchants =
          merchants.filter(
            (merchant: any) =>
              Number(
                merchant
                  .agency_admin_id
              ) ===
              currentAdminDbId
          )
  
      }
  
  
      if (
        adminRole ===
        'BRANCH'
      ) {
  
        merchants =
          merchants.filter(
            (merchant: any) =>
              Number(
                merchant
                  .branch_admin_id
              ) ===
              currentAdminDbId
          )
  
      }
  
  
      return merchants
    }
  
  
    const getVisibleAdminUsers =
      () => {
  
        if (
          adminRole ===
          'MASTER'
        ) {
  
          return [
            ...adminUsers
          ]
  
        }
  
  
        if (
          adminRole ===
          'BRANCH'
        ) {
  
          const branchId =
            currentAdminDbId
  
  
          const agencyIds =
            adminUsers
              .filter(
                (user: any) =>
                  user.role ===
                    'AGENCY' &&
                  Number(
                    user
                      .parent_admin_id
                  ) ===
                    branchId
              )
              .map(
                (user: any) =>
                  Number(
                    user.id
                  )
              )
  
  
          return adminUsers
            .filter(
              (user: any) =>
                Number(
                  user.id
                ) ===
                  branchId ||
  
                agencyIds.includes(
                  Number(
                    user.id
                  )
                ) ||
  
                (
                  user.role ===
                    'MANAGER' &&
                  (
                    Number(
                      user
                        .parent_admin_id
                    ) ===
                      branchId ||
  
                    agencyIds.includes(
                      Number(
                        user
                          .parent_admin_id
                      )
                    )
                  )
                )
            )
  
        }
  
  
        if (
          adminRole ===
          'AGENCY'
        ) {
  
          const agencyId =
            currentAdminDbId
  
  
          return adminUsers
            .filter(
              (user: any) =>
                Number(
                  user.id
                ) ===
                  agencyId ||
  
                (
                  user.role ===
                    'MANAGER' &&
                  Number(
                    user
                      .parent_admin_id
                  ) ===
                    agencyId
                )
            )
  
        }
  
  
        if (
          adminRole ===
          'MANAGER'
        ) {
  
          return adminUsers
            .filter(
              (user: any) =>
                Number(
                  user.id
                ) ===
                currentAdminDbId
            )
  
        }
  
  
        return []
  
      }
  
  
    const mobileStyle =
      `
      <style>
  
        body {
          margin: 0;
          background: #f2f5f9;
          font-family:
            Arial,
            "Noto Sans KR",
            sans-serif;
        }
  
        .nxg-mobile-admin {
          width: 100%;
          min-height: 100vh;
          background: #f2f5f9;
          color: #111827;
        }
  
        .nxg-mobile-admin-header {
          background: #071d38;
          color: white;
          padding:
            18px 18px 16px;
          position: sticky;
          top: 0;
          z-index: 50;
        }
  
        .nxg-mobile-admin-header-top {
          display: flex;
          align-items: center;
          justify-content:
            space-between;
          gap: 10px;
        }
  
        .nxg-mobile-admin-logo {
          font-size: 15px;
          font-weight: 900;
          letter-spacing: .5px;
          color: #46a5ff;
        }
  
        .nxg-mobile-admin-logout {
          border: 1px solid
            rgba(255,255,255,.3);
          background: #174981;
          color: white;
          border-radius: 8px;
          padding: 9px 12px;
          font-weight: 800;
        }
  
        .nxg-mobile-admin-user {
          margin-top: 10px;
        }
  
        .nxg-mobile-admin-user strong {
          display: block;
          font-size: 21px;
        }
  
        .nxg-mobile-admin-user span {
          display: inline-block;
          margin-top: 6px;
          background:
            rgba(255,255,255,.12);
          padding: 5px 9px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 800;
        }
  
        .nxg-mobile-admin-tabs {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 8px;
          padding: 12px;
          background: white;
          border-bottom:
            1px solid #dbe3ec;
          position: sticky;
          top: 101px;
          z-index: 40;
        }
  
        .nxg-mobile-admin-tabs.manager {
          grid-template-columns:
            repeat(2, 1fr);
        }
  
        .nxg-mobile-admin-tab {
          min-height: 46px;
          border: 1px solid #cbd7e5;
          background: white;
          color: #17375e;
          border-radius: 9px;
          font-size: 14px;
          font-weight: 900;
        }
  
        .nxg-mobile-admin-tab.active {
          background: #174981;
          color: white;
          border-color: #174981;
        }
  
        .nxg-mobile-admin-content {
          padding: 14px;
        }
  
        .nxg-mobile-title {
          margin-bottom: 14px;
        }
  
        .nxg-mobile-title h2 {
          margin: 0;
          font-size: 21px;
        }
  
        .nxg-mobile-title p {
          margin:
            6px 0 0;
          color: #6b7280;
          font-size: 13px;
        }
  
        .nxg-mobile-summary {
          display: grid;
          grid-template-columns:
            repeat(2, 1fr);
          gap: 10px;
          margin-bottom: 14px;
        }
  
        .nxg-mobile-summary-card {
          background: white;
          border: 1px solid #d7e0ea;
          border-radius: 12px;
          padding: 15px;
          box-shadow:
            0 5px 18px
            rgba(25,50,80,.05);
        }
  
        .nxg-mobile-summary-card span {
          display: block;
          color: #6b7280;
          font-size: 12px;
          font-weight: 700;
        }
  
        .nxg-mobile-summary-card strong {
          display: block;
          margin-top: 8px;
          color: #083a73;
          font-size: 24px;
        }
  
        .nxg-mobile-summary-card.danger
        strong {
          color: #d7261e;
        }
  
        .nxg-mobile-filter {
          background: white;
          border: 1px solid #d7e0ea;
          border-radius: 12px;
          padding: 12px;
          margin-bottom: 14px;
        }
  
        .nxg-mobile-filter-grid {
          display: grid;
          grid-template-columns:
            1fr 1fr;
          gap: 8px;
        }
  
        .nxg-mobile-filter input,
        .nxg-mobile-filter select {
          width: 100%;
          box-sizing: border-box;
          height: 44px;
          border: 1px solid #cbd7e5;
          border-radius: 8px;
          padding: 0 10px;
          background: white;
          font-size: 14px;
        }
  
        .nxg-mobile-filter-button {
          width: 100%;
          height: 46px;
          margin-top: 9px;
          border: 0;
          border-radius: 8px;
          background: #174981;
          color: white;
          font-size: 14px;
          font-weight: 900;
        }
  
        .nxg-mobile-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
  
        .nxg-mobile-card {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #d6e0ea;
          background: white;
          border-radius: 12px;
          padding: 15px;
          text-align: left;
          box-shadow:
            0 5px 16px
            rgba(25,50,80,.05);
        }
  
        button.nxg-mobile-card {
          cursor: pointer;
        }
  
        .nxg-mobile-card-top {
          display: flex;
          justify-content:
            space-between;
          align-items:
            flex-start;
          gap: 10px;
        }
  
        .nxg-mobile-card-title {
          color: #123f73;
          font-size: 17px;
          font-weight: 900;
        }
  
        .nxg-mobile-card-id {
          margin-top: 4px;
          color: #6b7280;
          font-size: 12px;
          font-weight: 700;
        }
  
        .nxg-mobile-status {
          flex: 0 0 auto;
          padding: 5px 8px;
          border-radius: 20px;
          background: #e9f2fc;
          color: #174981;
          font-size: 11px;
          font-weight: 900;
        }
  
        .nxg-mobile-card-info {
          display: grid;
          grid-template-columns:
            90px 1fr;
          gap: 7px 8px;
          margin-top: 14px;
          font-size: 13px;
        }
  
        .nxg-mobile-card-info span {
          color: #6b7280;
        }
  
        .nxg-mobile-card-info strong {
          word-break: break-all;
        }
  
        .nxg-mobile-empty {
          background: white;
          border: 1px solid #d7e0ea;
          border-radius: 12px;
          padding: 35px 20px;
          color: #777;
          text-align: center;
        }
  
        .nxg-mobile-back {
          width: 100%;
          height: 46px;
          margin-bottom: 12px;
          border: 1px solid #174981;
          border-radius: 9px;
          background: white;
          color: #174981;
          font-weight: 900;
        }
  
        .nxg-mobile-detail {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
  
        .nxg-mobile-detail-section {
          background: white;
          border: 1px solid #d7e0ea;
          border-radius: 12px;
          padding: 15px;
        }
  
        .nxg-mobile-detail-section h3 {
          margin:
            0 0 13px;
          color: #123f73;
          font-size: 16px;
        }
  
        .nxg-mobile-detail-row {
          display: grid;
          grid-template-columns:
            105px 1fr;
          gap: 8px;
          padding: 8px 0;
          border-bottom:
            1px solid #eef2f6;
          font-size: 13px;
        }
  
        .nxg-mobile-detail-row:last-child {
          border-bottom: 0;
        }
  
        .nxg-mobile-detail-row span {
          color: #777;
        }
  
        .nxg-mobile-detail-row strong {
          word-break: break-all;
        }
  
        .nxg-mobile-payment-amount {
          color: #174981;
          font-size: 18px;
          font-weight: 900;
        }
  
        .nxg-mobile-org-level {
          margin-bottom: 16px;
        }
  
        .nxg-mobile-org-level-title {
          margin-bottom: 8px;
          font-size: 15px;
          font-weight: 900;
          color: #123f73;
        }
  
        .nxg-mobile-org-card {
          background: white;
          border: 1px solid #d7e0ea;
          border-radius: 10px;
          padding: 13px;
          margin-bottom: 8px;
        }
  
        .nxg-mobile-org-card strong {
          font-size: 15px;
        }
  
        .nxg-mobile-org-card div {
          margin-top: 5px;
          color: #6b7280;
          font-size: 12px;
        }
  
        .nxg-mobile-section-count {
          margin-left: 6px;
          color: #6b7280;
          font-size: 12px;
        }
  
      </style>
    `
  
  
    app.innerHTML =
      mobileStyle +
      `
        <div class="nxg-mobile-admin">
  
          <header
            class="nxg-mobile-admin-header"
          >
  
            <div
              class="nxg-mobile-admin-header-top"
            >
  
              <div
                class="nxg-mobile-admin-logo"
              >
                XNG PICK
              </div>
  
              <button
                id="mobile-admin-logout"
                class="nxg-mobile-admin-logout"
                type="button"
              >
                로그아웃
              </button>
  
            </div>
  
            <div
              class="nxg-mobile-admin-user"
            >
  
              <strong>
                ${
                  escapeHtml(
                    adminName ||
                    adminId
                  )
                }
              </strong>
  
              <span>
                ${
                  escapeHtml(
                    roleText(
                      adminRole
                    )
                  )
                }
              </span>
  
            </div>
  
          </header>
  
  
          <nav
            class="nxg-mobile-admin-tabs ${
              adminRole ===
              'MANAGER'
                ? 'manager'
                : ''
            }"
          >
  
            <button
              type="button"
              class="
                nxg-mobile-admin-tab
                active
              "
              data-mobile-admin-page="merchant"
            >
              가맹점관리
            </button>
  
            <button
              type="button"
              class="
                nxg-mobile-admin-tab
              "
              data-mobile-admin-page="payment"
            >
              결제관리
            </button>
  
            ${
              adminRole ===
              'MANAGER'
                ? ''
                : `
                  <button
                    type="button"
                    class="
                      nxg-mobile-admin-tab
                    "
                    data-mobile-admin-page="organization"
                  >
                    조직관리
                  </button>
                `
            }
  
          </nav>
  
  
          <main
            id="mobile-admin-content"
            class="nxg-mobile-admin-content"
          >
          </main>
  
        </div>
      `
  
  
    const content =
      document.querySelector<HTMLDivElement>(
        '#mobile-admin-content'
      )!
  
  
    document
      .querySelector(
        '#mobile-admin-logout'
      )
      ?.addEventListener(
        'click',
        async () => {
  
          if (
            !confirm(
              '로그아웃 하시겠습니까?'
            )
          ) {
            return
          }
  
  
          try {
  
            await fetch(
              '/api/admin-logout',
              {
                method:
                  'POST',
  
                credentials:
                  'include'
              }
            )
  
          } catch (
            error
          ) {
  
            console.error(
              '관리자 로그아웃 오류:',
              error
            )
  
          }
  
  
          sessionStorage.removeItem(
            'admin_id'
          )
  
          sessionStorage.removeItem(
            'admin_name'
          )
  
          sessionStorage.removeItem(
            'admin_role'
          )
  
  
          location.href =
  '/pg-admin-mobile-login'
  
        }
      )
  
  
    const renderMerchantDetail =
      (
        merchant: any
      ) => {
  
        content.innerHTML =
          `
            <button
              type="button"
              id="mobile-merchant-back"
              class="nxg-mobile-back"
            >
              이전
            </button>
  
            <div
              class="nxg-mobile-title"
            >
  
              <h2>
                ${
                  escapeHtml(
                    merchant
                      .merchant_name ||
                    '가맹점'
                  )
                }
              </h2>
  
              <p>
                MER${
                  String(
                    merchant.id
                  ).padStart(
                    4,
                    '0'
                  )
                }
              </p>
  
            </div>
  
  
            <div
              class="nxg-mobile-detail"
            >
  
              <section
                class="
                  nxg-mobile-detail-section
                "
              >
  
                <h3>
                  기본정보
                </h3>
  
                <div
                  class="
                    nxg-mobile-detail-row
                  "
                >
                  <span>상태</span>
                  <strong>
                    ${
                      escapeHtml(
                        merchant.status ||
                        '-'
                      )
                    }
                  </strong>
                </div>
  
                <div
                  class="
                    nxg-mobile-detail-row
                  "
                >
                  <span>대표자</span>
                  <strong>
                    ${
                      escapeHtml(
                        merchant.owner_name ||
                        '-'
                      )
                    }
                  </strong>
                </div>
  
                <div
                  class="
                    nxg-mobile-detail-row
                  "
                >
                  <span>연락처</span>
                  <strong>
                    ${
                      escapeHtml(
                        merchant.phone ||
                        '-'
                      )
                    }
                  </strong>
                </div>
  
                <div
                  class="
                    nxg-mobile-detail-row
                  "
                >
                  <span>사업자번호</span>
                  <strong>
                    ${
                      escapeHtml(
                        merchant
                          .business_number ||
                        '-'
                      )
                    }
                  </strong>
                </div>
  
                <div
                  class="
                    nxg-mobile-detail-row
                  "
                >
                  <span>유형</span>
                  <strong>
                    ${
                      escapeHtml(
                        merchant
                          .merchant_type ||
                        '-'
                      )
                    }
                  </strong>
                </div>
  
              </section>
  
  
              <section
                class="
                  nxg-mobile-detail-section
                "
              >
  
                <h3>
                  결제 / 정산
                </h3>
  
                <div
                  class="
                    nxg-mobile-detail-row
                  "
                >
                  <span>PG</span>
                  <strong>
                    ${
                      escapeHtml(
                        merchant
                          .pg_company ||
                        '-'
                      )
                    }
                  </strong>
                </div>
  
                <div
                  class="
                    nxg-mobile-detail-row
                  "
                >
                  <span>수수료율</span>
                  <strong>
                    ${
                      Number(
                        merchant
                          .fee_rate ||
                        0
                      )
                    }%
                  </strong>
                </div>
  
                <div
                  class="
                    nxg-mobile-detail-row
                  "
                >
                  <span>정산주기</span>
                  <strong>
                    ${
                      escapeHtml(
                        merchant
                          .settlement_cycle ||
                        '-'
                      )
                    }
                  </strong>
                </div>
  
              </section>
  
  
              <section
                class="
                  nxg-mobile-detail-section
                "
              >
  
                <h3>
                  조직정보
                </h3>
  
                <div
                  class="
                    nxg-mobile-detail-row
                  "
                >
                  <span>지사</span>
                  <strong>
                    ${
                      escapeHtml(
                        merchant
                          .branch_admin_name ||
                        '-'
                      )
                    }
                  </strong>
                </div>
  
                <div
                  class="
                    nxg-mobile-detail-row
                  "
                >
                  <span>대리점</span>
                  <strong>
                    ${
                      escapeHtml(
                        merchant
                          .agency_admin_name ||
                        merchant
                          .agency_name ||
                        '-'
                      )
                    }
                  </strong>
                </div>
  
                <div
                  class="
                    nxg-mobile-detail-row
                  "
                >
                  <span>담당자</span>
                  <strong>
                    ${
                      escapeHtml(
                        merchant
                          .manager_admin_name ||
                        '-'
                      )
                    }
                  </strong>
                </div>
  
              </section>
  
            </div>
          `
  
  
        document
          .querySelector(
            '#mobile-merchant-back'
          )
          ?.addEventListener(
            'click',
            () => {
              void renderMerchantPage()
            }
          )
  
      }
  
  
    const renderMerchantPage =
      async () => {
  
        const visibleMerchants =
          getVisibleMerchants()
  
  
        const waitingCount =
          visibleMerchants.filter(
            (merchant: any) =>
              merchant.status ===
              '신청'
          ).length
  
  
        const approvedCount =
          visibleMerchants.filter(
            (merchant: any) =>
              [
                '승인',
                '승인완료',
                '운영',
                '대기'
              ].includes(
                merchant.status || ''
              )
          ).length
  
  
        const rejectedCount =
          visibleMerchants.filter(
            (merchant: any) =>
              merchant.status ===
              '반려'
          ).length
  
  
        content.innerHTML =
          `
            <div
              class="nxg-mobile-title"
            >
              <h2>
                가맹점관리
              </h2>
  
              <p>
                권한 범위 내 가맹점을 조회합니다.
              </p>
            </div>
  
  
            <div
              class="nxg-mobile-summary"
            >
  
              <div
                class="
                  nxg-mobile-summary-card
                "
              >
                <span>
                  전체 가맹점
                </span>
  
                <strong>
                  ${
                    visibleMerchants.length
                  }건
                </strong>
              </div>
  
              <div
                class="
                  nxg-mobile-summary-card
                "
              >
                <span>
                  신청대기
                </span>
  
                <strong>
                  ${
                    waitingCount
                  }건
                </strong>
              </div>
  
              <div
                class="
                  nxg-mobile-summary-card
                "
              >
                <span>
                  승인완료
                </span>
  
                <strong>
                  ${
                    approvedCount
                  }건
                </strong>
              </div>
  
              <div
                class="
                  nxg-mobile-summary-card
                  danger
                "
              >
                <span>
                  반려
                </span>
  
                <strong>
                  ${
                    rejectedCount
                  }건
                </strong>
              </div>
  
            </div>
  
  
            <div
              class="nxg-mobile-filter"
            >
  
              <div
                class="
                  nxg-mobile-filter-grid
                "
              >
  
                <select
                  id="mobile-merchant-status"
                >
                  <option value="">
                    전체 상태
                  </option>
  
                  <option value="신청">
                    신청
                  </option>
  
                  <option value="운영">
                    운영
                  </option>
  
                  <option value="반려">
                    반려
                  </option>
                </select>
  
                <input
                  id="mobile-merchant-keyword"
                  placeholder="가맹점명 / 대표자 / 연락처"
                />
  
              </div>
  
              <button
                id="mobile-merchant-search"
                class="
                  nxg-mobile-filter-button
                "
                type="button"
              >
                검색
              </button>
  
            </div>
  
  
            <div
              id="mobile-merchant-list"
              class="nxg-mobile-list"
            >
            </div>
          `
  
  
        const renderMerchantCards =
          () => {
  
            const status =
              document.querySelector<HTMLSelectElement>(
                '#mobile-merchant-status'
              )?.value || ''
  
  
            const keyword =
              (
                document.querySelector<HTMLInputElement>(
                  '#mobile-merchant-keyword'
                )?.value || ''
              )
                .trim()
                .toLowerCase()
  
  
            let merchants =
              [
                ...visibleMerchants
              ]
  
  
            if (status) {
  
              merchants =
                merchants.filter(
                  (merchant: any) =>
                    String(
                      merchant.status ||
                      ''
                    ) ===
                    status
                )
  
            }
  
  
            if (keyword) {
  
              merchants =
                merchants.filter(
                  (merchant: any) => {
  
                    const text =
                      [
                        merchant
                          .merchant_name,
                        merchant
                          .owner_name,
                        merchant.phone,
                        merchant
                          .business_number,
                        merchant
                          .merchant_login_id
                      ]
                        .join(' ')
                        .toLowerCase()
  
  
                    return text.includes(
                      keyword
                    )
  
                  }
                )
  
            }
  
  
            const list =
              document.querySelector<HTMLDivElement>(
                '#mobile-merchant-list'
              )
  
  
            if (!list) {
              return
            }
  
  
            if (
              merchants.length ===
              0
            ) {
  
              list.innerHTML =
                `
                  <div
                    class="nxg-mobile-empty"
                  >
                    조회된 가맹점이 없습니다.
                  </div>
                `
  
              return
            }
  
  
            list.innerHTML =
              merchants
                .map(
                  (merchant: any) =>
                    `
                      <button
                        type="button"
                        class="
                          nxg-mobile-card
                          mobile-merchant-card
                        "
                        data-id="${
                          merchant.id
                        }"
                      >
  
                        <div
                          class="
                            nxg-mobile-card-top
                          "
                        >
  
                          <div>
  
                            <div
                              class="
                                nxg-mobile-card-title
                              "
                            >
                              ${
                                escapeHtml(
                                  merchant
                                    .merchant_name ||
                                  '-'
                                )
                              }
                            </div>
  
                            <div
                              class="
                                nxg-mobile-card-id
                              "
                            >
                              MER${
                                String(
                                  merchant.id
                                ).padStart(
                                  4,
                                  '0'
                                )
                              }
                            </div>
  
                          </div>
  
                          <span
                            class="
                              nxg-mobile-status
                            "
                          >
                            ${
                              escapeHtml(
                                merchant.status ||
                                '-'
                              )
                            }
                          </span>
  
                        </div>
  
  
                        <div
                          class="
                            nxg-mobile-card-info
                          "
                        >
  
                          <span>
                            대표자
                          </span>
  
                          <strong>
                            ${
                              escapeHtml(
                                merchant
                                  .owner_name ||
                                '-'
                              )
                            }
                          </strong>
  
                          <span>
                            연락처
                          </span>
  
                          <strong>
                            ${
                              escapeHtml(
                                merchant.phone ||
                                '-'
                              )
                            }
                          </strong>
  
                          <span>
                            수수료
                          </span>
  
                          <strong>
                            ${
                              Number(
                                merchant
                                  .fee_rate ||
                                0
                              )
                            }%
                          </strong>
  
                          <span>
                            정산주기
                          </span>
  
                          <strong>
                            ${
                              escapeHtml(
                                merchant
                                  .settlement_cycle ||
                                '-'
                              )
                            }
                          </strong>
  
                        </div>
  
                      </button>
                    `
                )
                .join('')
  
  
            document
              .querySelectorAll<HTMLElement>(
                '.mobile-merchant-card'
              )
              .forEach(
                (card) => {
  
                  card
                    .addEventListener(
                      'click',
                      () => {
  
                        const id =
                          Number(
                            card
                              .dataset
                              .id ||
                            0
                          )
  
  
                        const merchant =
                          visibleMerchants
                            .find(
                              (
                                item:
                                any
                              ) =>
                                Number(
                                  item.id
                                ) ===
                                id
                            )
  
  
                        if (
                          merchant
                        ) {
  
                          renderMerchantDetail(
                            merchant
                          )
  
                        }
  
                      }
                    )
  
                }
              )
  
          }
  
  
        document
          .querySelector(
            '#mobile-merchant-search'
          )
          ?.addEventListener(
            'click',
            renderMerchantCards
          )
  
  
        renderMerchantCards()
  
      }
  
  
    const renderPaymentPage =
      async () => {
  
        const visibleMerchants =
          getVisibleMerchants()
  
  
        const merchantIds =
          new Set(
            visibleMerchants
              .map(
                (merchant: any) =>
                  Number(
                    merchant.id
                  )
              )
          )
  
  
        const {
          data: paymentData,
          error: paymentError
        } =
          await supabase
            .from(
              'payments'
            )
            .select('*')
            .order(
              'created_at',
              {
                ascending:
                  false
              }
            )
  
  
        if (paymentError) {
  
          alert(
            '결제내역을 불러오지 못했습니다.\n' +
            paymentError.message
          )
  
          return
        }
  
  
        let visiblePayments =
          (
            paymentData ||
            []
          ).filter(
            (payment: any) =>
              merchantIds.has(
                Number(
                  payment
                    .merchant_id
                )
              )
          )
  
  
        if (
          adminRole ===
          'MASTER'
        ) {
  
          visiblePayments =
            paymentData ||
            []
  
        }
  
  
        content.innerHTML =
          `
            <div
              class="nxg-mobile-title"
            >
  
              <h2>
                결제관리
              </h2>
  
              <p>
                조직 권한 범위의 결제내역입니다.
              </p>
  
            </div>
  
  
            <div
              class="nxg-mobile-filter"
            >
  
              <div
                class="
                  nxg-mobile-filter-grid
                "
              >
  
                <input
                  id="mobile-payment-start"
                  type="date"
                  value="${todayText}"
                />
  
                <input
                  id="mobile-payment-end"
                  type="date"
                  value="${todayText}"
                />
  
                <select
                  id="mobile-payment-pg"
                >
                  <option value="">
                    전체 PG
                  </option>
  
                  <option value="토스">
                    토스
                  </option>
  
                  <option value="코페이">
                    코페이
                  </option>
                </select>
  
                <input
                  id="mobile-payment-keyword"
                  placeholder="가맹점 / 승인번호 / 주문번호"
                />
  
              </div>
  
              <button
                id="mobile-payment-search"
                class="
                  nxg-mobile-filter-button
                "
                type="button"
              >
                조회
              </button>
  
            </div>
  
  
            <div
              id="mobile-payment-summary"
              class="nxg-mobile-summary"
            >
            </div>
  
  
            <div
              id="mobile-payment-list"
              class="nxg-mobile-list"
            >
            </div>
          `
  
  
        const renderPaymentCards =
          () => {
  
            const startDate =
              document.querySelector<HTMLInputElement>(
                '#mobile-payment-start'
              )?.value || ''
  
  
            const endDate =
              document.querySelector<HTMLInputElement>(
                '#mobile-payment-end'
              )?.value || ''
  
  
            const pg =
              document.querySelector<HTMLSelectElement>(
                '#mobile-payment-pg'
              )?.value || ''
  
  
            const keyword =
              (
                document.querySelector<HTMLInputElement>(
                  '#mobile-payment-keyword'
                )?.value || ''
              )
                .trim()
                .toLowerCase()
  
  
            let payments =
              [
                ...visiblePayments
              ]
  
  
            if (startDate) {
  
              payments =
                payments.filter(
                  (payment: any) =>
                    String(
                      payment
                        .created_at ||
                      ''
                    )
                      .slice(
                        0,
                        10
                      ) >=
                      startDate
                )
  
            }
  
  
            if (endDate) {
  
              payments =
                payments.filter(
                  (payment: any) =>
                    String(
                      payment
                        .created_at ||
                      ''
                    )
                      .slice(
                        0,
                        10
                      ) <=
                      endDate
                )
  
            }
  
  
            if (pg) {
  
              payments =
                payments.filter(
                  (payment: any) =>
                    String(
                      payment
                        .pg_company ||
                      ''
                    ).includes(
                      pg
                    )
                )
  
            }
  
  
            if (keyword) {
  
              payments =
                payments.filter(
                  (payment: any) => {
  
                    const text =
                      [
                        payment
                          .merchant_name,
                        payment
                          .approval_number,
                        payment
                          .order_number,
                        payment
                          .order_id,
                        payment
                          .sender_name
                      ]
                        .join(' ')
                        .toLowerCase()
  
  
                    return text.includes(
                      keyword
                    )
  
                  }
                )
  
            }
  
  
            const normalPayments =
              payments.filter(
                (payment: any) =>
                  payment.status ===
                    'paid' ||
                  payment.status ===
                    '승인'
              )
  
  
            const totalAmount =
              normalPayments.reduce(
                (
                  sum: number,
                  payment: any
                ) =>
                  sum +
                  Number(
                    payment.amount ||
                    0
                  ),
                0
              )
  
  
            const summary =
              document.querySelector<HTMLDivElement>(
                '#mobile-payment-summary'
              )
  
  
            if (summary) {
  
              summary.innerHTML =
                `
                  <div
                    class="
                      nxg-mobile-summary-card
                    "
                  >
                    <span>
                      결제건수
                    </span>
  
                    <strong>
                      ${
                        normalPayments
                          .length
                      }건
                    </strong>
                  </div>
  
                  <div
                    class="
                      nxg-mobile-summary-card
                    "
                  >
                    <span>
                      승인금액
                    </span>
  
                    <strong
                      style="
                        font-size:18px;
                      "
                    >
                      ${
                        formatMoney(
                          totalAmount
                        )
                      }
                    </strong>
                  </div>
                `
  
            }
  
  
            const list =
              document.querySelector<HTMLDivElement>(
                '#mobile-payment-list'
              )
  
  
            if (!list) {
              return
            }
  
  
            if (
              payments.length ===
              0
            ) {
  
              list.innerHTML =
                `
                  <div
                    class="nxg-mobile-empty"
                  >
                    결제내역이 없습니다.
                  </div>
                `
  
              return
            }
  
  
            list.innerHTML =
              payments
                .map(
                  (payment: any) =>
                    `
                      <div
                        class="nxg-mobile-card"
                      >
  
                        <div
                          class="
                            nxg-mobile-card-top
                          "
                        >
  
                          <div>
  
                            <div
                              class="
                                nxg-mobile-card-title
                              "
                            >
                              ${
                                escapeHtml(
                                  payment
                                    .merchant_name ||
                                  '-'
                                )
                              }
                            </div>
  
                            <div
                              class="
                                nxg-mobile-card-id
                              "
                            >
                              ${
                                escapeHtml(
                                  payment
                                    .order_number ||
                                  payment
                                    .order_id ||
                                  '-'
                                )
                              }
                            </div>
  
                          </div>
  
                          <span
                            class="
                              nxg-mobile-status
                            "
                          >
                            ${
                              payment.status ===
                              'paid'
                                ? '승인'
                                : payment.status ===
                                  'cancel'
                                  ? '취소'
                                  : escapeHtml(
                                      payment.status ||
                                      '-'
                                    )
                            }
                          </span>
  
                        </div>
  
  
                        <div
                          style="
                            margin-top:14px;
                          "
                          class="
                            nxg-mobile-payment-amount
                          "
                        >
                          ${
                            formatMoney(
                              payment.amount
                            )
                          }
                        </div>
  
  
                        <div
                          class="
                            nxg-mobile-card-info
                          "
                        >
  
                          <span>
                            PG
                          </span>
  
                          <strong>
                            ${
                              escapeHtml(
                                payment
                                  .pg_company ||
                                '-'
                              )
                            }
                          </strong>
  
                          <span>
                            승인번호
                          </span>
  
                          <strong>
                            ${
                              escapeHtml(
                                payment
                                  .approval_number ||
                                '-'
                              )
                            }
                          </strong>
  
                          <span>
                            결제방법
                          </span>
  
                          <strong>
                            ${
                              escapeHtml(
                                payment
                                  .payment_method ||
                                '-'
                              )
                            }
                          </strong>
  
                          <span>
                            결제일시
                          </span>
  
                          <strong>
                            ${
                              escapeHtml(
                                formatDate(
                                  payment
                                    .approved_at ||
                                  payment
                                    .created_at
                                )
                              )
                            }
                          </strong>
  
                        </div>
  
                      </div>
                    `
                )
                .join('')
  
          }
  
  
        document
          .querySelector(
            '#mobile-payment-search'
          )
          ?.addEventListener(
            'click',
            renderPaymentCards
          )
  
  
        renderPaymentCards()
  
      }
  
  
    const renderOrganizationPage =
      async () => {
  
        const visibleAdmins =
          getVisibleAdminUsers()
  
  
        const branches =
          visibleAdmins.filter(
            (user: any) =>
              user.role ===
              'BRANCH'
          )
  
  
        const agencies =
          visibleAdmins.filter(
            (user: any) =>
              user.role ===
              'AGENCY'
          )
  
  
        const managers =
          visibleAdmins.filter(
            (user: any) =>
              user.role ===
              'MANAGER'
          )
  
  
        const visibleMerchants =
          getVisibleMerchants()
  
  
        content.innerHTML =
          `
            <div
              class="nxg-mobile-title"
            >
  
              <h2>
                조직관리
              </h2>
  
              <p>
                PC 관리자와 동일한 조직 권한으로 조회합니다.
              </p>
  
            </div>
  
  
            <div
              class="nxg-mobile-summary"
            >
  
              <div
                class="
                  nxg-mobile-summary-card
                "
              >
                <span>
                  지사
                </span>
  
                <strong>
                  ${
                    branches.length
                  }
                </strong>
              </div>
  
              <div
                class="
                  nxg-mobile-summary-card
                "
              >
                <span>
                  대리점
                </span>
  
                <strong>
                  ${
                    agencies.length
                  }
                </strong>
              </div>
  
              <div
                class="
                  nxg-mobile-summary-card
                "
              >
                <span>
                  담당자
                </span>
  
                <strong>
                  ${
                    managers.length
                  }
                </strong>
              </div>
  
              <div
                class="
                  nxg-mobile-summary-card
                "
              >
                <span>
                  가맹점
                </span>
  
                <strong>
                  ${
                    visibleMerchants
                      .length
                  }
                </strong>
              </div>
  
            </div>
  
  
            <section
              class="nxg-mobile-org-level"
            >
  
              <div
                class="
                  nxg-mobile-org-level-title
                "
              >
                지사
                <span
                  class="
                    nxg-mobile-section-count
                  "
                >
                  ${branches.length}명
                </span>
              </div>
  
              ${
                branches.length
                  ? branches
                      .map(
                        (user: any) =>
                          `
                            <div
                              class="
                                nxg-mobile-org-card
                              "
                            >
                              <strong>
                                ${
                                  escapeHtml(
                                    user
                                      .company_name ||
                                    user
                                      .admin_name ||
                                    '-'
                                  )
                                }
                              </strong>
  
                              <div>
                                ${
                                  escapeHtml(
                                    user.login_id ||
                                    '-'
                                  )
                                }
                                ·
                                ${
                                  escapeHtml(
                                    user.status ||
                                    '-'
                                  )
                                }
                              </div>
                            </div>
                          `
                      )
                      .join('')
                  : `
                      <div
                        class="nxg-mobile-empty"
                      >
                        표시할 지사가 없습니다.
                      </div>
                    `
              }
  
            </section>
  
  
            <section
              class="nxg-mobile-org-level"
            >
  
              <div
                class="
                  nxg-mobile-org-level-title
                "
              >
                대리점
                <span
                  class="
                    nxg-mobile-section-count
                  "
                >
                  ${agencies.length}명
                </span>
              </div>
  
              ${
                agencies.length
                  ? agencies
                      .map(
                        (user: any) =>
                          `
                            <div
                              class="
                                nxg-mobile-org-card
                              "
                            >
                              <strong>
                                ${
                                  escapeHtml(
                                    user
                                      .company_name ||
                                    user
                                      .admin_name ||
                                    '-'
                                  )
                                }
                              </strong>
  
                              <div>
                                ${
                                  escapeHtml(
                                    user.login_id ||
                                    '-'
                                  )
                                }
                                ·
                                ${
                                  escapeHtml(
                                    user.status ||
                                    '-'
                                  )
                                }
                              </div>
                            </div>
                          `
                      )
                      .join('')
                  : `
                      <div
                        class="nxg-mobile-empty"
                      >
                        표시할 대리점이 없습니다.
                      </div>
                    `
              }
  
            </section>
  
  
            <section
              class="nxg-mobile-org-level"
            >
  
              <div
                class="
                  nxg-mobile-org-level-title
                "
              >
                담당자
                <span
                  class="
                    nxg-mobile-section-count
                  "
                >
                  ${managers.length}명
                </span>
              </div>
  
              ${
                managers.length
                  ? managers
                      .map(
                        (user: any) => {
  
                          const merchantCount =
                            visibleMerchants
                              .filter(
                                (
                                  merchant:
                                  any
                                ) =>
                                  Number(
                                    merchant
                                      .manager_admin_id
                                  ) ===
                                  Number(
                                    user.id
                                  )
                              )
                              .length
  
  
                          return `
                            <div
                              class="
                                nxg-mobile-org-card
                              "
                            >
                              <strong>
                                ${
                                  escapeHtml(
                                    user
                                      .admin_name ||
                                    '-'
                                  )
                                }
                              </strong>
  
                              <div>
                                ${
                                  escapeHtml(
                                    user.login_id ||
                                    '-'
                                  )
                                }
                                ·
                                가맹점
                                ${merchantCount}개
                              </div>
                            </div>
                          `
  
                        }
                      )
                      .join('')
                  : `
                      <div
                        class="nxg-mobile-empty"
                      >
                        표시할 담당자가 없습니다.
                      </div>
                    `
              }
  
            </section>
          `
  
      }
  
  
    const selectPage =
      async (
        page:
          'merchant' |
          'payment' |
          'organization'
      ) => {
  
        document
          .querySelectorAll(
            '.nxg-mobile-admin-tab'
          )
          .forEach(
            (tab) =>
              tab.classList.remove(
                'active'
              )
          )
  
  
        document
          .querySelector(
            '[data-mobile-admin-page="' +
            page +
            '"]'
          )
          ?.classList.add(
            'active'
          )
  
  
        sessionStorage.setItem(
          'mobile_admin_page',
          page
        )
  
  
        if (
          page ===
          'merchant'
        ) {
  
          await renderMerchantPage()
          return
  
        }
  
  
        if (
          page ===
          'payment'
        ) {
  
          await renderPaymentPage()
          return
  
        }
  
  
        if (
          page ===
          'organization' &&
          adminRole !==
          'MANAGER'
        ) {
  
          await renderOrganizationPage()
  
        }
  
      }
  
  
    document
      .querySelectorAll<HTMLElement>(
        '.nxg-mobile-admin-tab'
      )
      .forEach(
        (tab) => {
  
          tab.addEventListener(
            'click',
            () => {
  
              const page =
                tab.dataset
                  .mobileAdminPage as
                    'merchant' |
                    'payment' |
                    'organization'
  
  
              void selectPage(
                page
              )
  
            }
          )
  
        }
      )
  
  
    const savedPage =
      sessionStorage.getItem(
        'mobile_admin_page'
      )
  
  
    if (
      savedPage ===
        'payment'
    ) {
  
      await selectPage(
        'payment'
      )
  
    } else if (
      savedPage ===
        'organization' &&
      adminRole !==
        'MANAGER'
    ) {
  
      await selectPage(
        'organization'
      )
  
    } else {
  
      await selectPage(
        'merchant'
      )
  
    }
  
  }