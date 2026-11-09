async function e(e,t){let n=sessionStorage.getItem(`admin_id`)||``,r=sessionStorage.getItem(`admin_name`)||``,i=sessionStorage.getItem(`admin_role`)||``;if(!n){location.replace(`/admin-login`);return}let a=e=>String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`),o=e=>Number(e||0).toLocaleString()+`원`,s=e=>{if(!e)return`-`;try{return new Date(String(e)).toLocaleString(`ko-KR`,{timeZone:`Asia/Seoul`})}catch{return String(e)}},c=e=>e===`MASTER`?`최고관리자`:e===`BRANCH`?`지사`:e===`AGENCY`?`대리점`:e===`MANAGER`?`담당자`:e||`-`,l=new Intl.DateTimeFormat(`en-CA`,{timeZone:`Asia/Seoul`,year:`numeric`,month:`2-digit`,day:`2-digit`}).format(new Date),u=[];try{let e=await fetch(`/api/admin-user-list`,{method:`GET`,credentials:`include`,cache:`no-store`}),t=await e.json();if(!e.ok||!t?.success)throw Error(t?.message||`조직정보를 불러오지 못했습니다.`);u=t.users||[]}catch(e){console.error(`모바일 관리자 조직정보 조회 오류:`,e),alert(e instanceof Error?e.message:`조직정보를 불러오지 못했습니다.`);return}let d=u.find(e=>String(e.login_id||``).toUpperCase()===n.toUpperCase());if(!d&&i!==`MASTER`){alert(`현재 관리자 정보를 확인하지 못했습니다.`);return}let f=Number(d?.id||0),{data:p,error:m}=await t.from(`merchants`).select(`*`).order(`id`,{ascending:!1});if(m){alert(`가맹점 정보를 불러오지 못했습니다.
`+m.message);return}let h=()=>{let e=[...p||[]];return i===`MANAGER`&&(e=e.filter(e=>Number(e.manager_admin_id)===f)),i===`AGENCY`&&(e=e.filter(e=>Number(e.agency_admin_id)===f)),i===`BRANCH`&&(e=e.filter(e=>Number(e.branch_admin_id)===f)),e},g=()=>{if(i===`MASTER`)return[...u];if(i===`BRANCH`){let e=f,t=u.filter(t=>t.role===`AGENCY`&&Number(t.parent_admin_id)===e).map(e=>Number(e.id));return u.filter(n=>Number(n.id)===e||t.includes(Number(n.id))||n.role===`MANAGER`&&(Number(n.parent_admin_id)===e||t.includes(Number(n.parent_admin_id))))}if(i===`AGENCY`){let e=f;return u.filter(t=>Number(t.id)===e||t.role===`MANAGER`&&Number(t.parent_admin_id)===e)}return i===`MANAGER`?u.filter(e=>Number(e.id)===f):[]};e.innerHTML=`
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
                ${a(r||n)}
              </strong>
  
              <span>
                ${a(c(i))}
              </span>
  
            </div>
  
          </header>
  
  
          <nav
            class="nxg-mobile-admin-tabs ${i===`MANAGER`?`manager`:``}"
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
  
            ${i===`MANAGER`?``:`
                  <button
                    type="button"
                    class="
                      nxg-mobile-admin-tab
                    "
                    data-mobile-admin-page="organization"
                  >
                    조직관리
                  </button>
                `}
  
          </nav>
  
  
          <main
            id="mobile-admin-content"
            class="nxg-mobile-admin-content"
          >
          </main>
  
        </div>
      `;let _=document.querySelector(`#mobile-admin-content`);document.querySelector(`#mobile-admin-logout`)?.addEventListener(`click`,async()=>{if(confirm(`로그아웃 하시겠습니까?`)){try{await fetch(`/api/admin-logout`,{method:`POST`,credentials:`include`})}catch(e){console.error(`관리자 로그아웃 오류:`,e)}sessionStorage.removeItem(`admin_id`),sessionStorage.removeItem(`admin_name`),sessionStorage.removeItem(`admin_role`),location.href=`/pg-admin-mobile-login`}});let v=e=>{_.innerHTML=`
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
                ${a(e.merchant_name||`가맹점`)}
              </h2>
  
              <p>
                MER${String(e.id).padStart(4,`0`)}
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
                    ${a(e.status||`-`)}
                  </strong>
                </div>
  
                <div
                  class="
                    nxg-mobile-detail-row
                  "
                >
                  <span>대표자</span>
                  <strong>
                    ${a(e.owner_name||`-`)}
                  </strong>
                </div>
  
                <div
                  class="
                    nxg-mobile-detail-row
                  "
                >
                  <span>연락처</span>
                  <strong>
                    ${a(e.phone||`-`)}
                  </strong>
                </div>
  
                <div
                  class="
                    nxg-mobile-detail-row
                  "
                >
                  <span>사업자번호</span>
                  <strong>
                    ${a(e.business_number||`-`)}
                  </strong>
                </div>
  
                <div
                  class="
                    nxg-mobile-detail-row
                  "
                >
                  <span>유형</span>
                  <strong>
                    ${a(e.merchant_type||`-`)}
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
                    ${a(e.pg_company||`-`)}
                  </strong>
                </div>
  
                <div
                  class="
                    nxg-mobile-detail-row
                  "
                >
                  <span>수수료율</span>
                  <strong>
                    ${Number(e.fee_rate||0)}%
                  </strong>
                </div>
  
                <div
                  class="
                    nxg-mobile-detail-row
                  "
                >
                  <span>정산주기</span>
                  <strong>
                    ${a(e.settlement_cycle||`-`)}
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
                    ${a(e.branch_admin_name||`-`)}
                  </strong>
                </div>
  
                <div
                  class="
                    nxg-mobile-detail-row
                  "
                >
                  <span>대리점</span>
                  <strong>
                    ${a(e.agency_admin_name||e.agency_name||`-`)}
                  </strong>
                </div>
  
                <div
                  class="
                    nxg-mobile-detail-row
                  "
                >
                  <span>담당자</span>
                  <strong>
                    ${a(e.manager_admin_name||`-`)}
                  </strong>
                </div>
  
              </section>
  
            </div>
          `,document.querySelector(`#mobile-merchant-back`)?.addEventListener(`click`,()=>{y()})},y=async()=>{let e=h(),t=e.filter(e=>e.status===`신청`).length,n=e.filter(e=>[`승인`,`승인완료`,`운영`,`대기`].includes(e.status||``)).length,r=e.filter(e=>e.status===`반려`).length;_.innerHTML=`
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
                  ${e.length}건
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
                  ${t}건
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
                  ${n}건
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
                  ${r}건
                </strong>
              </div>
  
            </div>
  
                        ${i===`MASTER`?``:`
                  <button
                    id="mobile-manager-apply-link"
                    class="nxg-mobile-filter-button"
                    type="button"
                    style="margin:0 0 14px;"
                  >
                    🔗 가입신청서 링크 생성
                  </button>
                `}
  
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
          `,document.querySelector(`#mobile-manager-apply-link`)?.addEventListener(`click`,async()=>{try{let e=await fetch(`/api/admin-my-apply-ref`,{method:`GET`,credentials:`include`,cache:`no-store`}),t=await e.json();if(!e.ok||!t?.success){alert(t?.message||`담당자 정보를 확인하지 못했습니다.`);return}let n=String(t.ref||``).replace(/[^0-9]/g,``).replace(/^010/,``);if(!n){alert(`담당자 연락처가 등록되지 않았습니다.`);return}let r=`https://payment-app-ybtf.vercel.app/merchant-apply-form?ref=`+encodeURIComponent(n);try{await navigator.clipboard.writeText(r),alert(`담당자 전용 가입신청서 링크가 복사되었습니다.

`+r)}catch{prompt(`링크를 길게 눌러 복사해주세요.`,r)}}catch(e){console.error(`가입신청서 링크 생성 오류:`,e),alert(`가입신청서 링크 생성에 실패했습니다.`)}});let o=()=>{let t=document.querySelector(`#mobile-merchant-status`)?.value||``,n=(document.querySelector(`#mobile-merchant-keyword`)?.value||``).trim().toLowerCase(),r=[...e];t&&(r=r.filter(e=>String(e.status||``)===t)),n&&(r=r.filter(e=>[e.merchant_name,e.owner_name,e.phone,e.business_number,e.merchant_login_id].join(` `).toLowerCase().includes(n)));let i=document.querySelector(`#mobile-merchant-list`);if(i){if(r.length===0){i.innerHTML=`
                  <div
                    class="nxg-mobile-empty"
                  >
                    조회된 가맹점이 없습니다.
                  </div>
                `;return}i.innerHTML=r.map(e=>`
                      <button
                        type="button"
                        class="
                          nxg-mobile-card
                          mobile-merchant-card
                        "
                        data-id="${e.id}"
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
                              ${a(e.merchant_name||`-`)}
                            </div>
  
                            <div
                              class="
                                nxg-mobile-card-id
                              "
                            >
                              MER${String(e.id).padStart(4,`0`)}
                            </div>
  
                          </div>
  
                          <span
                            class="
                              nxg-mobile-status
                            "
                          >
                            ${a(e.status||`-`)}
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
                            ${a(e.owner_name||`-`)}
                          </strong>
  
                          <span>
                            연락처
                          </span>
  
                          <strong>
                            ${a(e.phone||`-`)}
                          </strong>
  
                          <span>
                            수수료
                          </span>
  
                          <strong>
                            ${Number(e.fee_rate||0)}%
                          </strong>
  
                          <span>
                            정산주기
                          </span>
  
                          <strong>
                            ${a(e.settlement_cycle||`-`)}
                          </strong>
  
                        </div>
  
                      </button>
                    `).join(``),document.querySelectorAll(`.mobile-merchant-card`).forEach(t=>{t.addEventListener(`click`,()=>{let n=Number(t.dataset.id||0),r=e.find(e=>Number(e.id)===n);r&&v(r)})})}};document.querySelector(`#mobile-merchant-search`)?.addEventListener(`click`,o),o()},b=async()=>{let e=h(),n=new Set(e.map(e=>Number(e.id))),{data:r,error:c}=await t.from(`payments`).select(`*`).order(`created_at`,{ascending:!1});if(c){alert(`결제내역을 불러오지 못했습니다.
`+c.message);return}let u=(r||[]).filter(e=>n.has(Number(e.merchant_id)));i===`MASTER`&&(u=r||[]),_.innerHTML=`
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
                  value="${l}"
                />
  
                <input
                  id="mobile-payment-end"
                  type="date"
                  value="${l}"
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
          `;let d=()=>{let e=document.querySelector(`#mobile-payment-start`)?.value||``,t=document.querySelector(`#mobile-payment-end`)?.value||``,n=document.querySelector(`#mobile-payment-pg`)?.value||``,r=(document.querySelector(`#mobile-payment-keyword`)?.value||``).trim().toLowerCase(),i=[...u];e&&(i=i.filter(t=>String(t.created_at||``).slice(0,10)>=e)),t&&(i=i.filter(e=>String(e.created_at||``).slice(0,10)<=t)),n&&(i=i.filter(e=>String(e.pg_company||``).includes(n))),r&&(i=i.filter(e=>[e.merchant_name,e.approval_number,e.order_number,e.order_id,e.sender_name].join(` `).toLowerCase().includes(r)));let c=i.filter(e=>e.status===`paid`||e.status===`승인`),l=c.reduce((e,t)=>e+Number(t.amount||0),0),d=document.querySelector(`#mobile-payment-summary`);d&&(d.innerHTML=`
                  <div
                    class="
                      nxg-mobile-summary-card
                    "
                  >
                    <span>
                      결제건수
                    </span>
  
                    <strong>
                      ${c.length}건
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
                      ${o(l)}
                    </strong>
                  </div>
                `);let f=document.querySelector(`#mobile-payment-list`);if(f){if(i.length===0){f.innerHTML=`
                  <div
                    class="nxg-mobile-empty"
                  >
                    결제내역이 없습니다.
                  </div>
                `;return}f.innerHTML=i.map(e=>`
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
                              ${a(e.merchant_name||`-`)}
                            </div>
  
                            <div
                              class="
                                nxg-mobile-card-id
                              "
                            >
                              ${a(e.order_number||e.order_id||`-`)}
                            </div>
  
                          </div>
  
                          <span
                            class="
                              nxg-mobile-status
                            "
                          >
                            ${e.status===`paid`?`승인`:e.status===`cancel`?`취소`:a(e.status||`-`)}
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
                          ${o(e.amount)}
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
                            ${a(e.pg_company||`-`)}
                          </strong>
  
                          <span>
                            승인번호
                          </span>
  
                          <strong>
                            ${a(e.approval_number||`-`)}
                          </strong>
  
                          <span>
                            결제방법
                          </span>
  
                          <strong>
                            ${a(e.payment_method||`-`)}
                          </strong>
  
                          <span>
                            결제일시
                          </span>
  
                          <strong>
                            ${a(s(e.approved_at||e.created_at))}
                          </strong>
  
                        </div>
  
                      </div>
                    `).join(``)}};document.querySelector(`#mobile-payment-search`)?.addEventListener(`click`,d),d()},x=async()=>{let e=g(),n=e.filter(e=>e.role===`BRANCH`),r=e.filter(e=>e.role===`AGENCY`),i=e.filter(e=>e.role===`MANAGER`),o=h(),{data:s,error:c}=await t.from(`payments`).select(`
              id,
              merchant_id,
              amount,
              status,
              approved_at,
              created_at
            `).eq(`status`,`paid`);if(c){alert(`조직 매출정보를 불러오지 못했습니다.
`+c.message);return}let l=s||[],d=(e,t)=>e?Number(t===`1일`?e.commission_rate_1day||0:t===`3일`?e.commission_rate_3day||0:t===`7일`?e.commission_rate_7day||0:e.commission_rate_4day||0):0,f=e=>{let t=new Date,n=new Date(t.getFullYear(),t.getMonth(),1,0,0,0,0),r=new Date(t.getFullYear(),t.getMonth()+1,1,0,0,0,0);return l.filter(t=>{if(Number(t.merchant_id)!==e)return!1;let i=new Date(t.approved_at||t.created_at);return i>=n&&i<r}).reduce((e,t)=>e+Number(t.amount||0),0)},p=e=>{let t=[];if(e.role===`MANAGER`&&(t=o.filter(t=>Number(t.manager_admin_id)===Number(e.id))),e.role===`AGENCY`){let n=u.filter(t=>t.role===`MANAGER`&&Number(t.parent_admin_id)===Number(e.id)).map(e=>Number(e.id));t=o.filter(t=>Number(t.agency_admin_id)===Number(e.id)||n.includes(Number(t.manager_admin_id)))}if(e.role===`BRANCH`){let n=u.filter(t=>t.role===`AGENCY`&&Number(t.parent_admin_id)===Number(e.id)).map(e=>Number(e.id)),r=u.filter(t=>t.role===`MANAGER`&&(Number(t.parent_admin_id)===Number(e.id)||n.includes(Number(t.parent_admin_id)))).map(e=>Number(e.id));t=o.filter(t=>Number(t.branch_admin_id)===Number(e.id)||n.includes(Number(t.agency_admin_id))||r.includes(Number(t.manager_admin_id)))}let n=0,r=0;return t.forEach(t=>{let i=f(Number(t.id));if(i<=0)return;let a=d(e,String(t.settlement_cycle||`4일`));n+=i,r+=Math.floor(i*a/100)}),{totalSales:n,commissionAmount:r}};_.innerHTML=`
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
                  ${n.length}
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
                  ${r.length}
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
                  ${i.length}
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
                  ${o.length}
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
                  ${n.length}명
                </span>
              </div>
    
              ${n.length?n.map(e=>{let t=p(e),n=u.filter(t=>t.role===`AGENCY`&&Number(t.parent_admin_id)===Number(e.id)).length,r=u.filter(t=>t.role===`AGENCY`&&Number(t.parent_admin_id)===Number(e.id)).map(e=>Number(e.id)),i=u.filter(t=>t.role===`MANAGER`&&(Number(t.parent_admin_id)===Number(e.id)||r.includes(Number(t.parent_admin_id)))).length,s=o.filter(t=>Number(t.branch_admin_id)===Number(e.id)).length;return`
                            <div
                              class="
                                nxg-mobile-org-card
                              "
                            >
    
                              <strong>
                                🏢 ${a(e.company_name||e.admin_name||`-`)}
                              </strong>
    
                              <div>
                                대리점
                                ${n}개
                              </div>
    
                              <div>
                                담당자
                                ${i}명
                              </div>
    
                              <div>
                                가맹점
                                ${s}개
                              </div>
    
                              <div
                                style="
                                  margin-top:10px;
                                  color:#111827;
                                  font-weight:800;
                                "
                              >
                                총매출
                                ${t.totalSales.toLocaleString()}원
                              </div>
    
                              <div
                                style="
                                  margin-top:5px;
                                  color:#174981;
                                  font-size:16px;
                                  font-weight:900;
                                "
                              >
                                수수료
                                ${t.commissionAmount.toLocaleString()}원
                              </div>
    
                            </div>
                          `}).join(``):`
                      <div
                        class="nxg-mobile-empty"
                      >
                        표시할 지사가 없습니다.
                      </div>
                    `}
    
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
                  ${r.length}명
                </span>
              </div>
    
              ${r.length?r.map(e=>{let t=p(e),n=u.filter(t=>t.role===`MANAGER`&&Number(t.parent_admin_id)===Number(e.id)),r=n.map(e=>Number(e.id)),i=o.filter(t=>Number(t.agency_admin_id)===Number(e.id)||r.includes(Number(t.manager_admin_id))).length;return`
                            <div
                              class="
                                nxg-mobile-org-card
                              "
                            >
    
                              <strong>
                                🤝 ${a(e.company_name||e.admin_name||`-`)}
                              </strong>
    
                              <div>
                                담당자
                                ${n.length}명
                              </div>
    
                              <div>
                                가맹점
                                ${i}개
                              </div>
    
                              <div
                                style="
                                  margin-top:10px;
                                  color:#111827;
                                  font-weight:800;
                                "
                              >
                                총매출
                                ${t.totalSales.toLocaleString()}원
                              </div>
    
                              <div
                                style="
                                  margin-top:5px;
                                  color:#174981;
                                  font-size:16px;
                                  font-weight:900;
                                "
                              >
                                수수료
                                ${t.commissionAmount.toLocaleString()}원
                              </div>
    
                            </div>
                          `}).join(``):`
                      <div
                        class="nxg-mobile-empty"
                      >
                        표시할 대리점이 없습니다.
                      </div>
                    `}
    
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
                  ${i.length}명
                </span>
              </div>
    
              ${i.length?i.map(e=>{let t=p(e),n=o.filter(t=>Number(t.manager_admin_id)===Number(e.id)).length;return`
                            <div
                              class="
                                nxg-mobile-org-card
                              "
                            >
    
                              <strong>
                                👤 ${a(e.admin_name||`-`)}
                              </strong>
    
                              <div>
                                ${a(e.login_id||`-`)}
                              </div>
    
                              <div>
                                가맹점
                                ${n}개
                              </div>
    
                              <div
                                style="
                                  margin-top:10px;
                                  color:#111827;
                                  font-weight:800;
                                "
                              >
                                총매출
                                ${t.totalSales.toLocaleString()}원
                              </div>
    
                              <div
                                style="
                                  margin-top:5px;
                                  color:#174981;
                                  font-size:16px;
                                  font-weight:900;
                                "
                              >
                                수수료
                                ${t.commissionAmount.toLocaleString()}원
                              </div>
    
                            </div>
                          `}).join(``):`
                      <div
                        class="nxg-mobile-empty"
                      >
                        표시할 담당자가 없습니다.
                      </div>
                    `}
    
            </section>
          `},S=async e=>{if(document.querySelectorAll(`.nxg-mobile-admin-tab`).forEach(e=>e.classList.remove(`active`)),document.querySelector(`[data-mobile-admin-page="`+e+`"]`)?.classList.add(`active`),sessionStorage.setItem(`mobile_admin_page`,e),e===`merchant`){await y();return}if(e===`payment`){await b();return}e===`organization`&&i!==`MANAGER`&&await x()};document.querySelectorAll(`.nxg-mobile-admin-tab`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.mobileAdminPage;S(t)})});let C=sessionStorage.getItem(`mobile_admin_page`);C===`payment`?await S(`payment`):C===`organization`&&i!==`MANAGER`?await S(`organization`):await S(`merchant`)}export{e as renderPgAdminMobile};