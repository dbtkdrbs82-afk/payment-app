import{o as e}from"./chunk-jRWAZmH_.js";import{n as t,r as n,t as r}from"./browser-F7CVyOIs.js";var i=e(r(),1),a=t(`https://rnmptlxdeihvfwegoqnf.supabase.co`,`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJubXB0bHhkZWlodmZ3ZWdvcW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MzcwMDMsImV4cCI6MjA5NDIxMzAwM30.5SeOiuZgFmU7RUu5kzLpLBUwC91SYI3WxqRFoafMrG8`),o=`live_ck_GjLJoQ1aVZ2QXB2vMWyPVw6KYe2R`,s=`https://payment-app-ybtf.vercel.app`;function c(){let e=new Date,t=String(e.getFullYear()),n=String(e.getMonth()+1).padStart(2,`0`),r=String(e.getDate()).padStart(2,`0`),i=String(e.getHours()).padStart(2,`0`),a=String(e.getMinutes()).padStart(2,`0`),o=String(e.getSeconds()).padStart(2,`0`);return t+n+r+i+a+o}async function l(e,t,n,r){let i=e+t+String(n)+r,a=new TextEncoder().encode(i),o=await crypto.subtle.digest(`SHA-256`,a);return Array.from(new Uint8Array(o)).map(e=>e.toString(16).padStart(2,`0`)).join(``)}var u=document.querySelector(`#app`),d=window.location.pathname,f=[`login_merchant_id`,`login_merchant_code`,`login_merchant_name`,`login_merchant_type`];async function p(){let e=sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`);if(!e){location.replace(`/merchant-app`);return}let t=sessionStorage.getItem(`login_merchant_name`)||localStorage.getItem(`login_merchant_name`)||`가맹점`,n=e=>{let t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,`0`),r=String(e.getDate()).padStart(2,`0`);return t+`-`+n+`-`+r},r=n(new Date),i=new URLSearchParams(window.location.search),o=i.get(`terminal_start_date`)||r,s=i.get(`terminal_end_date`)||r,{data:c,error:l}=await a.from(`payments`).select(`
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
      `).eq(`merchant_id`,e).order(`created_at`,{ascending:!1}).limit(500);l&&console.error(`무선단말기 거래내역 조회 실패:`,l);let d=c||[],p=d.filter(e=>{let t=e.status===`cancel`?e.canceled_at||e.approved_at||e.created_at:e.approved_at||e.created_at;if(!t)return!1;let r=n(new Date(t));return r>=o&&r<=s}),m=p.filter(e=>e.status===`paid`),h=p.filter(e=>e.status===`cancel`),g=m.reduce((e,t)=>e+Number(t.amount||0),0),_=h.reduce((e,t)=>e+Number(t.amount||0),0),v=g-_,{data:y}=await a.from(`merchants`).select(`settlement_cycle`).eq(`id`,e).single(),b=String(y?.settlement_cycle||`1일`),{data:x}=await a.from(`holidays`).select(`holiday_date`),S=new Set((x||[]).map(e=>String(e.holiday_date))),C=e=>{let t=new Date(e),r=b.match(/\d+/),i=r?Number(r[0]):1,a=0;for(;a<i;){t.setDate(t.getDate()+1);let e=n(t),r=t.getDay(),i=r===0||r===6,o=S.has(e);i||o||(a+=1)}return n(t)},w=d.filter(e=>{if(e.status!==`paid`)return!1;let t=e.approved_at||e.created_at;if(!t)return!1;let n=C(t);return n>=o&&n<=s}),T=w.reduce((e,t)=>e+Number(t.settlement_amount||0),0),E=Math.max(1,Number(i.get(`terminal_page`)||1)),D=Math.max(1,Number(i.get(`terminal_page_size`)||10)),O=Math.max(1,Math.ceil(p.length/D)),k=Math.min(E,O),A=(k-1)*D,j=p.slice(A,A+D),M=e=>e===`paid`?`승인`:e===`cancel`?`취소`:e===`ready`?`대기`:e||`-`,N=e=>{let t=e.status===`cancel`?e.canceled_at||e.approved_at||e.created_at:e.approved_at||e.created_at;return t?new Date(t).toLocaleString(`ko-KR`):`-`};u.innerHTML=`
    <div class="merchant-mobile-home">

      <header class="merchant-mobile-header">

        <div>

          <div class="merchant-mobile-brand">
            NXG PICK
          </div>

          <div class="merchant-mobile-store">
            ${t}
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
            ${t}
          </div>

        </section>


        <section class="terminal-mobile-date">

          <div class="terminal-mobile-date-inputs">

            <input
              type="date"
              id="terminal-mobile-start-date"
              value="${o}"
            />

            <span>
              ~
            </span>

            <input
              type="date"
              id="terminal-mobile-end-date"
              value="${s}"
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
              ${g.toLocaleString()}원
            </strong>

            <small>
              승인 ${m.length.toLocaleString()}건
            </small>

          </div>


          <div class="terminal-mobile-card">

            <span>
              취소금액
            </span>

            <strong>
              ${_.toLocaleString()}원
            </strong>

            <small>
              취소 ${h.length.toLocaleString()}건
            </small>

          </div>


          <div class="terminal-mobile-card">

            <span>
              순매출
            </span>

            <strong>
              ${v.toLocaleString()}원
            </strong>

            <small>
              총 거래 ${p.length.toLocaleString()}건
            </small>

          </div>


          <div class="terminal-mobile-card">

            <span>
              정산금액
            </span>

            <strong>
              ${T.toLocaleString()}원
            </strong>

            <small>
              정산대상 ${w.length.toLocaleString()}건
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
                ${D===10?`selected`:``}
              >
                10개씩
              </option>

              <option
                value="20"
                ${D===20?`selected`:``}
              >
                20개씩
              </option>

              <option
                value="50"
                ${D===50?`selected`:``}
              >
                50개씩
              </option>

            </select>

          </div>


          <div class="terminal-mobile-history-list">

            ${j.length===0?`
                  <div class="terminal-mobile-empty">
                    등록된 무선단말기 거래내역이 없습니다.
                  </div>
                `:j.map(e=>`

                        <div class="terminal-mobile-history-card">

                          <div class="terminal-mobile-history-head">

                            <strong>
                              ${Number(e.amount||0).toLocaleString()}원
                            </strong>

                            <span
                              class="${e.status===`cancel`?`cancel`:`paid`}"
                            >
                              ${M(e.status)}
                            </span>

                          </div>


                          <div class="terminal-mobile-history-row">

                            <span>
                              거래일시
                            </span>

                            <strong>
                              ${N(e)}
                            </strong>

                          </div>


                          <div class="terminal-mobile-history-row">

                            <span>
                              승인번호
                            </span>

                            <strong>
                              ${e.approval_number||`-`}
                            </strong>

                          </div>


                          <div class="terminal-mobile-history-row">

                            <span>
                              거래번호
                            </span>

                            <strong>
                              ${e.order_id||e.payment_key||`-`}
                            </strong>

                          </div>


                          <div class="terminal-mobile-history-row">

                            <span>
                              정산상태
                            </span>

                            <strong>
                              ${e.payout_status||e.settlement_status||`정산대기`}
                            </strong>

                          </div>

                        </div>

                      `).join(``)}

          </div>


          <div class="terminal-mobile-pagination">

            <button
              id="terminal-mobile-page-prev"
              type="button"
              ${k<=1?`disabled`:``}
            >
              이전
            </button>

            <strong>
              ${k} / ${O}
            </strong>

            <button
              id="terminal-mobile-page-next"
              type="button"
              ${k>=O?`disabled`:``}
            >
              다음
            </button>

          </div>

        </section>

      </main>

    </div>
  `;let P=(e,t)=>{let r=new Date(e+`T00:00:00`);return r.setDate(r.getDate()+t),n(r)},F=(e,t)=>{let n=new URLSearchParams(window.location.search);n.set(`terminal_start_date`,e),n.set(`terminal_end_date`,t),location.href=window.location.pathname+`?`+n.toString()};document.querySelector(`#terminal-mobile-search`)?.addEventListener(`click`,()=>{let e=document.querySelector(`#terminal-mobile-start-date`),t=document.querySelector(`#terminal-mobile-end-date`);!e?.value||!t?.value||F(e.value,t.value)}),document.querySelector(`#terminal-mobile-today`)?.addEventListener(`click`,()=>{F(r,r)}),document.querySelector(`#terminal-mobile-prev`)?.addEventListener(`click`,()=>{F(P(o,-1),P(s,-1))}),document.querySelector(`#terminal-mobile-next`)?.addEventListener(`click`,()=>{F(P(o,1),P(s,1))}),document.querySelector(`#terminal-mobile-month`)?.addEventListener(`click`,()=>{let e=new Date,t=new Date(e.getFullYear(),e.getMonth(),1),r=new Date(e.getFullYear(),e.getMonth()+1,0);F(n(t),n(r))}),document.querySelector(`#terminal-mobile-page-prev`)?.addEventListener(`click`,()=>{let e=new URLSearchParams(window.location.search);e.set(`terminal_page`,String(Math.max(1,k-1))),location.href=window.location.pathname+`?`+e.toString()}),document.querySelector(`#terminal-mobile-page-next`)?.addEventListener(`click`,()=>{let e=new URLSearchParams(window.location.search);e.set(`terminal_page`,String(Math.min(O,k+1))),location.href=window.location.pathname+`?`+e.toString()}),document.querySelector(`#terminal-mobile-page-size`)?.addEventListener(`change`,e=>{let t=e.target,n=new URLSearchParams(window.location.search);n.set(`terminal_page_size`,t.value),n.set(`terminal_page`,`1`),location.href=window.location.pathname+`?`+n.toString()}),document.querySelector(`#merchant-mobile-logout`)?.addEventListener(`click`,()=>{f.forEach(e=>{sessionStorage.removeItem(e),localStorage.removeItem(e)}),location.replace(`/merchant-app`)})}function m(){if(!(sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`))){location.replace(`/merchant-app`);return}f.forEach(e=>{if(!sessionStorage.getItem(e)){let t=localStorage.getItem(e);t!==null&&sessionStorage.setItem(e,t)}});let e=sessionStorage.getItem(`login_merchant_name`)||`가맹점`,t=sessionStorage.getItem(`login_merchant_type`)||localStorage.getItem(`login_merchant_type`)||`일반매장`,n=t===`일반매장`,r=t===`무선단말기`,i=t===`아카데미`,a=t===`뷰티`,o=t===`호텔`;if(r){p();return}let s=``;n?s=`
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
    `:i?s=`
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
    `:a?s=`
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
    `:o&&(s=`
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
    `),u.innerHTML=`
    <div class="merchant-mobile-home">

      <header class="merchant-mobile-header">

        <div>
          <div class="merchant-mobile-brand">
            NXG PICK
          </div>

          <div class="merchant-mobile-store">
            ${e}
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
            ${e}
          </h1>

          <div class="merchant-mobile-type">
            ${t}
          </div>

        </section>


                <section class="merchant-mobile-menu">
          ${s}
        </section>

      </main>

    </div>
  `,document.querySelector(`#merchant-mobile-logout`)?.addEventListener(`click`,()=>{f.forEach(e=>{sessionStorage.removeItem(e),localStorage.removeItem(e)}),location.replace(`/merchant-app`)}),document.querySelector(`.merchant-mobile-menu`)?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-menu]`);if(!t)return;let n={orders:`/merchant-app/orders`,products:`/merchant-app/products`,qr:`/merchant-app/qr`,card:`/merchant-app/card`,members:`/merchant-members`,billings:`/merchant-billings`,"academy-card":`/merchant-batch`,"academy-payments":`/merchant-academy-payments`,"beauty-orders":`/merchant-app/beauty/orders`,"beauty-staff":`/merchant-app/beauty/staff`,"beauty-products":`/merchant-app/beauty/products`,"beauty-hours":`/merchant-app/beauty/hours`,"hotel-orders":`/merchant-app/hotel/orders`,"hotel-products":`/merchant-app/hotel/products`,"hotel-rooms":`/merchant-app/hotel/rooms`,"hotel-preview":`/merchant-app/hotel/preview`}[t.dataset.menu||``];n&&(location.href=n)})}async function h(){let e=sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`);if(!e){location.replace(`/merchant-app`);return}let t=Number(e),n=sessionStorage.getItem(`login_merchant_name`)||localStorage.getItem(`login_merchant_name`)||`가맹점`,r=new URLSearchParams(location.search),i=e=>new Intl.DateTimeFormat(`en-CA`,{timeZone:`Asia/Seoul`,year:`numeric`,month:`2-digit`,day:`2-digit`}).format(e),o=i(new Date),c=r.get(`start`)||o,l=r.get(`end`)||o,d=new Date(c+`T00:00:00+09:00`).toISOString(),f=new Date(l+`T23:59:59.999+09:00`).toISOString();u.innerHTML=`
      <div class="merchant-mobile-home">
  
        <header class="merchant-mobile-header">
  
          <div>
            <div class="merchant-mobile-brand">
              NXG PICK
            </div>
  
            <div class="merchant-mobile-store">
              ${n}
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
      value="${c}"
    >
  </div>

  <div>
    <label>종료일</label>

    <input
      id="mobile-order-end-date"
      type="date"
      value="${l}"
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
    `,document.querySelector(`#mobile-order-home`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/home`});let p=e=>{let t=new Date(c+`T00:00:00+09:00`),n=new Date(l+`T00:00:00+09:00`);t.setDate(t.getDate()+e),n.setDate(n.getDate()+e),location.href=`/merchant-app/orders?start=`+i(t)+`&end=`+i(n)};document.querySelector(`#mobile-order-prev`)?.addEventListener(`click`,()=>{p(-1)}),document.querySelector(`#mobile-order-today`)?.addEventListener(`click`,()=>{let e=i(new Date);location.href=`/merchant-app/orders?start=`+e+`&end=`+e}),document.querySelector(`#mobile-order-next`)?.addEventListener(`click`,()=>{p(1)}),document.querySelector(`#mobile-order-month`)?.addEventListener(`click`,()=>{let e=i(new Date),t=e.slice(0,7)+`-01`;location.href=`/merchant-app/orders?start=`+t+`&end=`+e});let m=()=>{let e=document.querySelector(`#mobile-order-start-date`),t=document.querySelector(`#mobile-order-end-date`),n=e?.value||``,r=t?.value||``;!n||!r||n>r||(location.href=`/merchant-app/orders?start=`+n+`&end=`+r)};document.querySelector(`#mobile-order-start-date`)?.addEventListener(`change`,m),document.querySelector(`#mobile-order-end-date`)?.addEventListener(`change`,m);let[g,_,v]=await Promise.all([a.from(`orders`).select(`*`).eq(`merchant_id`,t).gte(`created_at`,d).lte(`created_at`,f).order(`created_at`,{ascending:!1}),a.from(`merchants`).select(`
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
          `).eq(`id`,t).maybeSingle(),a.from(`payments`).select(`
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
          `).eq(`merchant_id`,t).gte(`created_at`,d).lte(`created_at`,f)]),y=document.querySelector(`#mobile-order-list`),b=document.querySelector(`#mobile-order-summary`);if(!y||!b)return;if(g.error){b.textContent=`주문 조회 실패`,y.innerHTML=`
        <div class="merchant-mobile-order-empty">
          ${g.error.message}
        </div>
      `;return}let x=g.data||[],S=r.get(`status`)||`전체`,C=Math.max(1,Number(r.get(`page`)||1)),w=Math.max(1,Number(r.get(`size`)||10)),T=e=>e.cancel_status===`취소요청`?`취소요청`:e.order_status===`취소완료`||e.cancel_status===`취소완료`?`취소완료`:e.order_status===`완료`?`완료`:`접수`,E=S===`전체`?x:x.filter(e=>T(e)===S),D=Math.max(1,Math.ceil(E.length/w)),O=Math.min(C,D),k=E.slice((O-1)*w,O*w),A=_.data,j=v.data||[],M=j.filter(e=>e.status===`paid`),N=M.reduce((e,t)=>e+Number(t.amount||0),0),P=M.reduce((e,t)=>e+Number(t.settlement_amount||0),0);b.innerHTML=`
  <span>
    주문수 :
    <strong>
      ${x.length}건
    </strong>
  </span>

  <span>
    매출합계 :
    <strong>
      ${N.toLocaleString()}원
    </strong>
  </span>

  <span>
    정산예정금액 :
    <strong>
      ${P.toLocaleString()}원
    </strong>
  </span>
`,E.length===0&&(y.innerHTML=`
      <div class="merchant-mobile-order-empty">
        주문내역이 없습니다.
      </div>
    `),k.forEach((e,t)=>{let r=e.order_no?.split(`-`)[1]||e.order_no||t+1,o=Array.isArray(e.items)?e.items.map(e=>(e.name||e.product_name||`-`)+` x `+Number(e.quantity||1)).join(`, `):`-`,c=j.find(t=>{let n=String(t.order_id||``).replace(/[^a-zA-Z0-9]/g,``),r=String(e.pg_order_id||``).replace(/[^a-zA-Z0-9]/g,``),i=n&&r&&n===r,a=e.payment_key&&t.payment_key&&String(e.payment_key)===String(t.payment_key),o=Number(t.amount||0)===Number(e.total_amount||0),s=Math.abs(new Date(t.created_at).getTime()-new Date(e.created_at).getTime());return i||a||o&&s<1e3*60*5}),l=T(e),u=document.createElement(`div`);u.className=`merchant-mobile-order-card`,u.innerHTML=`
  
          <div class="merchant-mobile-order-card-top">
  
            <button
  type="button"
  class="merchant-mobile-receipt-button"
  data-order-id="${e.id}"
>
  ${r}번
</button>
  
            <span>
              ${Number(e.total_amount||0).toLocaleString()}원
            </span>
  
          </div>
  
  
          <div class="merchant-mobile-order-date">
  
            ${new Date(e.created_at).toLocaleString(`ko-KR`)}
  
          </div>

          <button
  type="button"
  class="merchant-mobile-cancel-open"
  data-order-id="${e.id}"
>
  승인번호 ${c?.approval_number||`-`}
</button>
  
  
          <div class="merchant-mobile-order-items">
  
            ${o}
  
          </div>
  
  
          <div class="merchant-mobile-order-bottom">
  
           <span
  class="merchant-mobile-order-status"
  data-status="${l}"
>
  ${l}
</span>
  
  
            ${l===`취소완료`?``:`
                  <button
                    type="button"
                    class="merchant-mobile-call-button"
                    data-id="${e.id}"
                    data-number="${r}"
                  >
                    ${l===`완료`?`재호출`:`고객호출`}
                  </button>
                `}
  
          </div>
        `,y.appendChild(u),u.querySelector(`.merchant-mobile-cancel-open`)?.addEventListener(`click`,()=>{document.querySelector(`#merchant-mobile-cancel-modal`)?.remove(),document.body.insertAdjacentHTML(`beforeend`,`
          <div
            id="merchant-mobile-cancel-modal"
            class="merchant-mobile-cancel-modal"
            data-order-id="${e.id}"
            data-created-at="${e.created_at||``}"
            data-payment-id="${c?.id||``}"
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
                  ${r}번
                </strong>
              </p>

              <p>
                결제금액
                <strong>
                  ${Number(e.total_amount||0).toLocaleString()}원
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
        `),document.querySelector(`#merchant-mobile-close-cancel`)?.addEventListener(`click`,()=>{document.querySelector(`#merchant-mobile-cancel-modal`)?.remove()}),document.querySelector(`#merchant-mobile-direct-cancel`)?.addEventListener(`click`,async()=>{let t=document.querySelector(`#merchant-mobile-cancel-modal`);if(!t)return;let r=Number(t.dataset.paymentId||0),o=Number(t.dataset.orderId||0),l=(document.querySelector(`#merchant-mobile-cancel-password`)?.value||``).trim(),u=(document.querySelector(`#merchant-mobile-cancel-reason`)?.value||``).trim();if(!r){alert(`취소할 결제정보를 찾을 수 없습니다.`);return}if(l!==`1234`){alert(`취소 비밀번호가 일치하지 않습니다.`);return}if(!u){alert(`취소 사유를 입력해주세요.`);return}let d=c?.approved_at||c?.created_at||e.created_at;if(i(new Date(d))!==i(new Date)){alert(`당일 결제건만 직접 취소할 수 있습니다.
본사 승인요청을 이용해주세요.`);return}let{data:f,error:p}=await a.from(`payments`).select(`
                  id,
                  pg_company,
                  payment_key,
                  status
                `).eq(`id`,r).single();if(p||!f){alert(`결제정보를 불러오지 못했습니다.`);return}if(f.status===`cancel`){alert(`이미 취소된 결제입니다.`);return}let m=document.querySelector(`#merchant-mobile-direct-cancel`);m&&(m.disabled=!0,m.textContent=`취소 중...`);try{if(f.pg_company===`코페이`){let e=await fetch(s+`/api/korpay-cancel`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({paymentId:f.id,cancelName:n,cancelMessage:u})}),t=await e.json();if(!e.ok||!t.success){alert(`코페이 실제 취소에 실패했습니다.

`+(t.message||`알 수 없는 오류`));return}}else if(f.pg_company===`토스페이먼츠`){if(!f.payment_key){alert(`토스 paymentKey가 없습니다.`);return}let e=await fetch(s+`/api/toss-cancel`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({paymentKey:f.payment_key,cancelReason:u})}),t=await e.json();if(!e.ok||!t.success){alert(`토스 실제 취소에 실패했습니다.

`+(t.message||`알 수 없는 오류`));return}}else{alert(`직접 취소를 지원하지 않는 PG사입니다.
PG사: `+(f.pg_company||`-`));return}let{error:e}=await a.from(`orders`).update({order_status:`취소완료`,cancel_status:`취소완료`,cancel_reason:u,cancel_requested_at:new Date().toISOString()}).eq(`id`,o);if(e){alert(`결제 취소는 성공했지만 주문상태 변경에 실패했습니다.
`+e.message);return}alert(`결제가 취소되었습니다.`),location.reload()}catch(e){console.error(e),alert(`취소 처리 중 오류가 발생했습니다.`)}finally{m&&(m.disabled=!1,m.textContent=`직접 취소`)}}),document.querySelector(`#merchant-mobile-request-cancel`)?.addEventListener(`click`,async()=>{let e=document.querySelector(`#merchant-mobile-cancel-modal`);if(!e)return;let t=Number(e.dataset.paymentId||0),n=Number(e.dataset.orderId||0),r=(document.querySelector(`#merchant-mobile-cancel-reason`)?.value||``).trim();if(!t){alert(`취소할 결제정보를 찾을 수 없습니다.`);return}if(!r){alert(`취소 사유를 입력해주세요.`);return}let i=document.querySelector(`#merchant-mobile-request-cancel`);i&&(i.disabled=!0,i.textContent=`요청 처리 중...`);try{let{data:e,error:i}=await a.from(`payments`).select(`
              id,
              merchant_id,
              merchant_name,
              amount,
              settlement_amount,
              manager_admin_id,
              manager_admin_name,
              status
            `).eq(`id`,t).single();if(i||!e){alert(`결제정보를 불러오지 못했습니다.`);return}if(e.status===`cancel`){alert(`이미 취소된 결제입니다.`);return}let{data:o}=await a.from(`cancel_requests`).select(`id`).eq(`payment_id`,t).eq(`status`,`요청중`).maybeSingle();if(o){alert(`이미 본사 승인요청이 접수된 거래입니다.`);return}let{error:s}=await a.from(`cancel_requests`).insert({payment_id:t,merchant_id:Number(e.merchant_id),manager_admin_id:e.manager_admin_id||null,manager_admin_name:e.manager_admin_name||null,reason:r,status:`요청중`});if(s){alert(`본사 승인요청 저장에 실패했습니다.
`+s.message);return}let{error:c}=await a.from(`payments`).update({payout_hold:!0,payout_hold_reason:`익일 취소 본사 승인요청: `+r,payout_hold_at:new Date().toISOString(),payout_status:`지급정지`}).eq(`id`,t);if(c){alert(`취소요청은 접수됐지만 지급정지 처리에 실패했습니다.
`+c.message);return}let{error:l}=await a.from(`orders`).update({cancel_status:`취소요청`,cancel_reason:r,cancel_requested_at:new Date().toISOString()}).eq(`id`,n);if(l){alert(`본사 승인요청은 접수됐지만 주문상태 변경에 실패했습니다.
`+l.message);return}alert(`본사 승인요청이 접수되었습니다.`),location.reload()}catch(e){console.error(e),alert(`본사 승인요청 중 오류가 발생했습니다.`)}finally{i&&(i.disabled=!1,i.textContent=`본사 승인요청`)}})}),u.querySelector(`.merchant-mobile-receipt-button`)?.addEventListener(`click`,()=>{let t=c?.approved_at||c?.created_at||e.created_at,i=c?.approval_number||`-`,a=c?.payment_key||`-`,s=c?.card_number||`-`,l=c?.card_company||`신용카드`,u=c?.pg_company||`-`,d=e.cancel_status===`취소완료`||e.order_status===`취소완료`||c?.status===`cancel`,f=c?.canceled_at||e.cancel_requested_at||``,p=Number(e.total_amount||0),m=Math.floor(p*10/11),h=p-m;document.querySelector(`#merchant-mobile-receipt-modal`)?.remove(),document.body.insertAdjacentHTML(`beforeend`,`
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
                ${d?`(취소)`:`(승인)`}
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
                  ${l}
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>카드번호</span>
                <strong>
                  ${s}
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>승인번호</span>
                <strong>
                  ${i}
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>PG사</span>
                <strong>
                  ${u}
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>결제일시</span>
                <strong>
                  ${t?new Date(t).toLocaleString(`ko-KR`):`-`}
                </strong>
              </div>

              ${d?`
                    <div
                      class="merchant-mobile-receipt-row"
                    >
                      <span>취소일시</span>

                      <strong>
                        ${f?new Date(f).toLocaleString(`ko-KR`):`-`}
                      </strong>
                    </div>
                  `:``}

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
                  ${r}번
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>상품</span>
                <strong>
                  ${o}
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>거래번호</span>
                <strong>
                  ${a}
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
                  ${m.toLocaleString()}원
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>부가세</span>
                <strong>
                  ${h.toLocaleString()}원
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-total"
              >
                <span>
                  총 결제금액
                </span>

                <strong>
                  ${d?`-`:``}${p.toLocaleString()}원
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
                  ${A?.merchant_name||n}
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>대표자</span>
                <strong>
                  ${A?.owner_name||`-`}
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>사업자번호</span>
                <strong>
                  ${A?.business_number||A?.corporate_number||`-`}
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>문의</span>
                <strong>
                  ${A?.phone||`-`}
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
      `),document.querySelector(`#merchant-mobile-receipt-close`)?.addEventListener(`click`,()=>{document.querySelector(`#merchant-mobile-receipt-modal`)?.remove()}),document.querySelector(`#merchant-mobile-receipt-print`)?.addEventListener(`click`,()=>{window.print()}),document.querySelector(`#merchant-mobile-receipt-share`)?.addEventListener(`click`,async()=>{let e=`[NXG PICK 영수증]
상점명: `+(A?.merchant_name||n)+`
주문번호: `+r+`번
승인번호: `+i+`
상품: `+o+`
결제금액: `+p.toLocaleString()+`원`;if(navigator.share){await navigator.share({title:`NXG PICK 영수증`,text:e});return}await navigator.clipboard.writeText(e),alert(`영수증 내용이 복사되었습니다.`)})})});let F=e=>{let t=new URLSearchParams(location.search);Object.entries(e).forEach(([e,n])=>{t.set(e,n)});let n=`/merchant-app/orders?`+t.toString();window.history.replaceState(null,``,n),h()};document.querySelectorAll(`.merchant-mobile-order-filter button`).forEach(e=>{(e.dataset.status||`전체`)===S&&e.classList.add(`active`),e.addEventListener(`click`,e=>{let t=e.currentTarget;F({status:t.dataset.status||`전체`,page:`1`})})});let I=document.querySelector(`#mobile-order-pagination`);I&&(I.innerHTML=`
      
          <select
            id="mobile-order-page-size"
          >
      
            <option
              value="10"
              ${w===10?`selected`:``}
            >
              10개씩 보기
            </option>
      
            <option
              value="20"
              ${w===20?`selected`:``}
            >
              20개씩 보기
            </option>
      
            <option
              value="30"
              ${w===30?`selected`:``}
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
              ${O<=1?`disabled`:``}
            >
              이전
            </button>
      
      
            <strong>
              ${O} / ${D}
            </strong>
      
      
            <button
              id="mobile-order-page-next"
              type="button"
              ${O>=D?`disabled`:``}
            >
              다음
            </button>
      
          </div>
        `,document.querySelector(`#mobile-order-page-size`)?.addEventListener(`change`,e=>{F({size:e.target.value,page:`1`})}),document.querySelector(`#mobile-order-page-prev`)?.addEventListener(`click`,()=>{O<=1||F({page:String(O-1)})}),document.querySelector(`#mobile-order-page-next`)?.addEventListener(`click`,()=>{O>=D||F({page:String(O+1)})})),document.querySelectorAll(`.merchant-mobile-call-button`).forEach(e=>{e.addEventListener(`click`,async()=>{if(A?.voice_enabled!==!0){alert(`음성 호출 사용이 꺼져 있습니다.
PC 매장 설정에서 음성 호출 사용을 확인해주세요.`);return}let t=e.dataset.number||`0`,n=Number(e.dataset.id),r=t+`번 고객님 `+(A?.call_message||`주문이 준비되었습니다.`);window.speechSynthesis.cancel();let i=new SpeechSynthesisUtterance(r);i.lang=`ko-KR`,i.rate=.95,window.speechSynthesis.speak(i);let{error:o}=await a.from(`orders`).update({order_status:`완료`}).eq(`id`,n);if(o){alert(`주문상태 변경 실패: `+o.message);return}e.textContent=`호출완료`;let s=e.closest(`.merchant-mobile-order-card`)?.querySelector(`.merchant-mobile-order-status`);s&&(s.textContent=`완료`)})})}async function g(){let e=sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`);if(!e){location.replace(`/merchant-app`);return}let t=Number(e),n=sessionStorage.getItem(`login_merchant_name`)||localStorage.getItem(`login_merchant_name`)||`가맹점`,r=(sessionStorage.getItem(`login_merchant_type`)||localStorage.getItem(`login_merchant_type`)||`일반매장`)===`뷰티`;u.innerHTML=`
      <div class="merchant-mobile-home">
  
        <header class="merchant-mobile-header">
  
          <div>
  
            <div class="merchant-mobile-brand">
              NXG PICK
            </div>
  
            <div class="merchant-mobile-store">
              ${n}
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
    `,document.querySelector(`#mobile-product-home`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/home`}),document.querySelector(`#mobile-product-create-open`)?.addEventListener(`click`,()=>{document.querySelector(`#merchant-mobile-product-modal`)?.remove(),document.body.insertAdjacentHTML(`beforeend`,`
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


              ${r?``:`
                    <label>
                      카테고리
                    </label>
              
                    <input
                      id="mobile-product-category"
                      type="text"
                      placeholder="카테고리 직접 입력"
                    >
                  `}


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
        `);let e=document.querySelector(`#mobile-product-image-file`);e?.addEventListener(`change`,()=>{let t=e.files?.[0];if(!t)return;let n=document.querySelector(`#mobile-product-preview`),r=document.querySelector(`#mobile-product-preview-text`);n&&(n.src=URL.createObjectURL(t),n.style.display=`block`),r&&(r.style.display=`none`)}),document.querySelector(`#mobile-product-create-close`)?.addEventListener(`click`,()=>{document.querySelector(`#merchant-mobile-product-modal`)?.remove()}),document.querySelector(`#mobile-product-create`)?.addEventListener(`click`,async()=>{let e=(document.querySelector(`#mobile-product-name`)?.value||``).trim(),n=Number(document.querySelector(`#mobile-product-price`)?.value||0),i=r?`뷰티서비스`:document.querySelector(`#mobile-product-category`)?.value.trim()||`기타`,o=document.querySelector(`#mobile-product-image-file`)?.files?.[0];if(!e||!n){alert(`상품명과 가격을 입력해주세요.`);return}let s=``;if(o){let e=o.name.split(`.`).pop()||`png`,t=Date.now()+`_product.`+e,{error:n}=await a.storage.from(`merchant-files`).upload(t,o);if(n){alert(`상품 이미지 업로드 실패: `+n.message);return}let{data:r}=a.storage.from(`merchant-files`).getPublicUrl(t);s=r.publicUrl}let{error:c}=await a.from(`products`).insert({merchant_id:t,product_name:e,price:n,category:i,image_url:s,status:`판매중`});if(c){alert(`상품 등록 실패: `+c.message);return}alert(`상품이 등록되었습니다.`),document.querySelector(`#merchant-mobile-product-modal`)?.remove(),g()})});let{data:i,error:o}=await a.from(`products`).select(`*`).eq(`merchant_id`,t).order(`sort_order`,{ascending:!0}).order(`id`,{ascending:!0}),s=document.querySelector(`#mobile-product-list`);if(!s)return;if(o){s.innerHTML=`
        상품 조회 실패 :
        ${o.message}
      `;return}let c=i||[];if(c.length===0){s.innerHTML=`
        등록된 상품이 없습니다.
      `;return}s.innerHTML=c.map(e=>{let t=e.status||`판매중`;return`
          <div
            class="merchant-mobile-product-card"
          >

            <div
              class="merchant-mobile-product-image"
            >
              ${e.image_url?`
                    <img
                      src="${e.image_url}"
                      alt="${e.product_name||``}"
                    >
                  `:`
                    <span>
                      이미지 없음
                    </span>
                  `}
            </div>


            <div
              class="merchant-mobile-product-info"
            >

              <strong
                class="merchant-mobile-product-name"
              >
                ${e.product_name||`-`}
              </strong>

              <span
                class="merchant-mobile-product-category"
              >
                ${e.category||`기타`}
              </span>

              <strong
                class="merchant-mobile-product-price"
              >
                ${Number(e.price||0).toLocaleString()}원
              </strong>


      <div
  class="merchant-mobile-product-actions"
>

  <button
    type="button"
    class="merchant-mobile-product-edit"
    data-id="${e.id}"
  >
    수정
  </button>

  <button
    type="button"
    class="
      merchant-mobile-product-status
      ${t===`판매중`?`active`:`stop`}
    "
    data-id="${e.id}"
    data-status="${t}"
  >
    ${t}
  </button>

</div>


<div
  class="merchant-mobile-product-order-actions"
>

  <button
    type="button"
    class="merchant-mobile-product-up"
    data-id="${e.id}"
  >
    ▲ 위
  </button>

  <button
    type="button"
    class="merchant-mobile-product-down"
    data-id="${e.id}"
  >
    ▼ 아래
  </button>

  <button
    type="button"
    class="merchant-mobile-product-delete"
    data-id="${e.id}"
  >
    삭제
  </button>

</div>

            </div>

          </div>
        `}).join(``),document.querySelectorAll(`.merchant-mobile-product-status`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=Number(e.dataset.id||0),n=(e.dataset.status||`판매중`)===`판매중`?`판매중지`:`판매중`,{error:r}=await a.from(`products`).update({status:n}).eq(`id`,t);if(r){alert(`상태 변경 실패: `+r.message);return}e.dataset.status=n,e.textContent=n,e.classList.toggle(`active`,n===`판매중`),e.classList.toggle(`stop`,n===`판매중지`)})}),document.querySelectorAll(`.merchant-mobile-product-edit`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.id||0),n=c.find(e=>Number(e.id)===t);if(!n)return;document.querySelector(`#merchant-mobile-product-edit-modal`)?.remove(),document.body.insertAdjacentHTML(`beforeend`,`
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
                    value="${n.product_name||``}"
                  >


                  <label>
                    가격
                  </label>

                  <input
                    id="mobile-product-edit-price"
                    type="number"
                    value="${Number(n.price||0)}"
                  >


                  ${r?``:`
                        <label>
                          카테고리
                        </label>

                        <input
                          id="mobile-product-edit-category"
                          type="text"
                          value="${n.category||``}"
                        >
                      `}


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

                    ${n.image_url?`
                          <img
                            id="mobile-product-edit-preview"
                            src="${n.image_url}"
                            alt=""
                          >
                        `:`
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
                        `}

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
            `);let i=document.querySelector(`#mobile-product-edit-image-file`);i?.addEventListener(`change`,()=>{let e=i.files?.[0];if(!e)return;let t=document.querySelector(`#mobile-product-edit-preview`),n=document.querySelector(`#mobile-product-edit-preview-text`);t&&(t.src=URL.createObjectURL(e),t.style.display=`block`),n&&(n.style.display=`none`)}),document.querySelector(`#mobile-product-edit-close`)?.addEventListener(`click`,()=>{document.querySelector(`#merchant-mobile-product-edit-modal`)?.remove()}),document.querySelector(`#mobile-product-edit-save`)?.addEventListener(`click`,async()=>{let e=(document.querySelector(`#mobile-product-edit-name`)?.value||``).trim(),i=Number(document.querySelector(`#mobile-product-edit-price`)?.value||0),o=r?n.category||`뷰티서비스`:document.querySelector(`#mobile-product-edit-category`)?.value.trim()||`기타`;if(!e||!i){alert(`상품명과 가격을 입력해주세요.`);return}let s=n.image_url||``,c=document.querySelector(`#mobile-product-edit-image-file`)?.files?.[0];if(c){let e=c.name.split(`.`).pop()||`png`,t=Date.now()+`_product_edit.`+e,{error:n}=await a.storage.from(`merchant-files`).upload(t,c);if(n){alert(`이미지 업로드 실패: `+n.message);return}let{data:r}=a.storage.from(`merchant-files`).getPublicUrl(t);s=r.publicUrl}let{error:l}=await a.from(`products`).update({product_name:e,price:i,category:o,image_url:s}).eq(`id`,t);if(l){alert(`상품 수정 실패: `+l.message);return}alert(`상품이 수정되었습니다.`),document.querySelector(`#merchant-mobile-product-edit-modal`)?.remove(),g()})})});let l=async(e,t)=>{let n=c.findIndex(t=>Number(t.id)===e);if(n<0)return;let r=t===`up`?n-1:n+1;if(r<0||r>=c.length)return;let i=[...c],o=i[n];i[n]=i[r],i[r]=o;for(let e=0;e<i.length;e++){let{error:t}=await a.from(`products`).update({sort_order:e+1}).eq(`id`,i[e].id);if(t){alert(`상품 순서 변경 실패: `+t.message);return}}g()};document.querySelectorAll(`.merchant-mobile-product-up`).forEach(e=>{e.addEventListener(`click`,async()=>{await l(Number(e.dataset.id||0),`up`)})}),document.querySelectorAll(`.merchant-mobile-product-down`).forEach(e=>{e.addEventListener(`click`,async()=>{await l(Number(e.dataset.id||0),`down`)})}),document.querySelectorAll(`.merchant-mobile-product-delete`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=Number(e.dataset.id||0);if(!confirm(`정말 이 상품을 삭제할까요?`))return;let{error:n}=await a.from(`products`).delete().eq(`id`,t);if(n){alert(`상품 삭제 실패: `+n.message);return}alert(`상품이 삭제되었습니다.`),g()})})}async function _(){let e=sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`);if(!e){location.replace(`/merchant-app`);return}let t=Number(e),n=sessionStorage.getItem(`login_merchant_name`)||localStorage.getItem(`login_merchant_name`)||`가맹점`,r=(sessionStorage.getItem(`login_merchant_type`)||localStorage.getItem(`login_merchant_type`)||`일반매장`)===`아카데미`?s+`/academy-chrome?merchant_id=`+t:`https://nxgsoft.co.kr/pay/?merchant_id=`+t,{data:o,error:c}=await a.from(`merchants`).select(`qr_template_key`).eq(`id`,t).maybeSingle();c&&console.error(`QR 디자인 조회 실패:`,c);let l=o?.qr_template_key||`default`,d=l===`default`?`/qr-guide-poster.png`:`/qr-templates/${l}.png`;u.innerHTML=`
      <div class="merchant-mobile-home">
  
        <header class="merchant-mobile-header">
  
          <div>
  
            <div class="merchant-mobile-brand">
              NXG PICK
            </div>
  
            <div class="merchant-mobile-store">
              ${n}
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

    ${[{key:`default`,name:`기본형`,image:`/qr-guide-poster.png`},...Array.from({length:11},(e,t)=>{let n=String(t+1).padStart(2,`0`);return{key:`qr-design-${n}`,name:`디자인 ${t+1}`,image:`/qr-templates/qr-design-${n}.png`}})].map(e=>{let t=e.key===l;return`
              <button
                type="button"
                class="
                  merchant-mobile-qr-template
                  ${t?`active`:``}
                "
                data-template-key="${e.key}"
              >

                <img
                  src="${e.image}"
                  alt="${e.name}"
                >

                <strong>
                  ${e.name}
                  ${t?` ✓`:``}
                </strong>

              </button>
            `}).join(``)}

  </div>

</div>
  
          <div
            class="merchant-mobile-qr-card"
          >
  
            <strong
              class="merchant-mobile-qr-store"
            >
              ${n}
            </strong>
  
  
            <div
  class="
    merchant-mobile-qr-poster
    ${l===`default`?`default`:`design`}
  "
  data-template="${l}"
>

  <img
    src="${d}"
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
              ${r}
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
    `,document.querySelector(`#mobile-qr-home`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/home`});let f=document.querySelector(`#mobile-merchant-qr-box`);f&&i.toCanvas(r,{width:600,margin:1},(e,t)=>{if(e){alert(`QR 생성 실패`);return}f.innerHTML=``,f.appendChild(t)}),document.querySelectorAll(`.merchant-mobile-qr-template`).forEach(e=>{e.addEventListener(`click`,async()=>{let n=e.dataset.templateKey;if(!n)return;let{error:r}=await a.from(`merchants`).update({qr_template_key:n}).eq(`id`,t);if(r){alert(`QR 디자인 저장 실패: `+r.message);return}_()})});let p=async()=>{let e={default:{left:86,top:59,width:22},"qr-design-01":{left:70.5,top:53.5,width:35.9},"qr-design-02":{left:47,top:67,width:32.1},"qr-design-03":{left:49,top:68.5,width:29.5},"qr-design-04":{left:49,top:61,width:28.2},"qr-design-05":{left:50,top:61,width:28.2},"qr-design-06":{left:50,top:49,width:22.4},"qr-design-07":{left:49,top:69,width:19.2,rotate:-18},"qr-design-08":{left:50,top:68,width:43.6},"qr-design-09":{left:50,top:72,width:43.6},"qr-design-10":{left:50,top:70,width:43.6},"qr-design-11":{left:50,top:53,width:19.2}},t=new Image;await new Promise((e,n)=>{t.onload=()=>e(),t.onerror=()=>n(Error(`QR 디자인 이미지를 불러오지 못했습니다.`)),t.src=d});let n=document.createElement(`canvas`);n.width=t.naturalWidth,n.height=t.naturalHeight;let a=n.getContext(`2d`);if(!a)throw Error(`이미지 생성에 실패했습니다.`);a.drawImage(t,0,0,n.width,n.height);let o=document.createElement(`canvas`);await i.toCanvas(o,r,{width:900,margin:1});let s=e[l]||e.default,c=n.width*(s.width/100),u=n.width*(s.left/100),f=n.height*(s.top/100);return a.save(),a.translate(u,f),s.rotate&&a.rotate(s.rotate*Math.PI/180),a.drawImage(o,-c/2,-c/2,c,c),a.restore(),n};document.querySelector(`#mobile-qr-copy`)?.addEventListener(`click`,async()=>{await navigator.clipboard.writeText(r),alert(`주소가 복사되었습니다.`)}),document.querySelector(`#mobile-qr-open`)?.addEventListener(`click`,()=>{window.open(r,`_blank`)}),document.querySelector(`#mobile-qr-save`)?.addEventListener(`click`,async()=>{try{let e=await p(),t=await new Promise(t=>{e.toBlob(t,`image/png`)});if(!t){alert(`이미지 생성에 실패했습니다.`);return}let r=URL.createObjectURL(t),i=document.createElement(`a`),a=n.replace(/[\\/:*?"<>|]/g,`_`);i.href=r,i.download=a+`_PICK_QR.png`,document.body.appendChild(i),i.click(),i.remove(),URL.revokeObjectURL(r)}catch(e){console.error(e),alert(`QR 이미지 저장에 실패했습니다.`)}}),document.querySelector(`#mobile-qr-share`)?.addEventListener(`click`,async()=>{try{let e=await p(),t=await new Promise(t=>{e.toBlob(t,`image/png`)});if(!t)return;let r=new File([t],`NXG_PICK_QR.png`,{type:`image/png`});if(navigator.share&&(!navigator.canShare||navigator.canShare({files:[r]}))){await navigator.share({title:n+` PICK QR`,text:n+` 주문 QR`,files:[r]});return}alert(`이 기기에서는 이미지 공유를 지원하지 않습니다.`)}catch(e){if(e?.name===`AbortError`)return;console.error(e),alert(`QR 공유에 실패했습니다.`)}}),document.querySelector(`#mobile-qr-print`)?.addEventListener(`click`,async()=>{let e=window.open(``,`_blank`);if(!e){alert(`인쇄창을 열 수 없습니다.`);return}try{let t=(await p()).toDataURL(`image/png`),r=l===`default`?`landscape`:`portrait`;e.document.write(`
          <!doctype html>

          <html>

            <head>

              <title>
                ${n} PICK QR
              </title>

              <style>

                @page {
                  size: A4 ${r};
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
                src="${t}"
                onload="
                  window.print();
                  window.onafterprint = function () {
                    window.close();
                  };
                "
              >

            </body>

          </html>
        `),e.document.close()}catch(t){e.close(),console.error(t),alert(`QR 인쇄 준비에 실패했습니다.`)}})}function v(){if(!(sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`))){location.replace(`/merchant-app`);return}u.innerHTML=`
      <div class="merchant-mobile-home">
  
        <header class="merchant-mobile-header">
  
          <div>
  
            <div class="merchant-mobile-brand">
              NXG PICK
            </div>
  
            <div class="merchant-mobile-store">
              ${sessionStorage.getItem(`login_merchant_name`)||localStorage.getItem(`login_merchant_name`)||`가맹점`}
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
    `,document.querySelector(`#mobile-card-home`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/home`}),document.querySelector(`[data-card-menu="ocr"]`)?.addEventListener(`click`,()=>{alert(`OCR 카드결제는 준비중입니다.`)}),document.querySelector(`[data-card-menu="manual"]`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/card/manual`}),document.querySelector(`[data-card-menu="sms"]`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/card/sms`}),document.querySelector(`[data-card-menu="menu"]`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/card/menu`}),document.querySelector(`[data-card-menu="cash"]`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/card/cash`}),document.querySelector(`[data-card-menu="cash-history"]`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/card/cash-history`})}function y(){let e=sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`);if(!e){location.replace(`/merchant-app`);return}let t=Number(e);u.innerHTML=`
      <div class="merchant-mobile-home">
  
        <header class="merchant-mobile-header">
  
          <div>
  
            <div class="merchant-mobile-brand">
              NXG PICK
            </div>
  
            <div class="merchant-mobile-store">
              ${sessionStorage.getItem(`login_merchant_name`)||localStorage.getItem(`login_merchant_name`)||`가맹점`}
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
    `,document.querySelector(`#mobile-manual-card-back`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/card`});let n=document.querySelector(`#mobile-manual-card-number`);n?.addEventListener(`input`,()=>{n.value=n.value.replace(/[^0-9]/g,``).slice(0,16).replace(/(\d{4})(?=\d)/g,`$1-`)});let r=document.querySelector(`#mobile-manual-expiry`);r?.addEventListener(`input`,()=>{let e=r.value.replace(/[^0-9]/g,``).slice(0,4);e.length>2?r.value=e.slice(0,2)+`/`+e.slice(2):r.value=e}),document.querySelector(`#mobile-manual-submit`)?.addEventListener(`click`,async()=>{let e=Number(document.querySelector(`#mobile-manual-amount`)?.value||0),n=(document.querySelector(`#mobile-manual-goods-name`)?.value||`일반 카드결제`).trim(),r=(document.querySelector(`#mobile-manual-card-number`)?.value||``).replace(/[^0-9]/g,``),i=(document.querySelector(`#mobile-manual-expiry`)?.value||``).replace(/[^0-9]/g,``),o=document.querySelector(`#mobile-manual-installment`)?.value||`0`,c=(document.querySelector(`#mobile-manual-buyer-name`)?.value||`구매자`).trim(),l=(document.querySelector(`#mobile-manual-phone`)?.value||``).replace(/[^0-9]/g,``);if(!e||e<100){alert(`결제금액을 확인해주세요.`);return}if(r.length<13||r.length>19){alert(`카드번호를 확인해주세요.`);return}if(i.length!==4){alert(`유효기간을 MM/YY 형식으로 입력해주세요.`);return}let u=i.slice(0,2),d=i.slice(2,4);if(Number(u)<1||Number(u)>12){alert(`유효기간 월을 확인해주세요.`);return}let f=d+u;if(!confirm(n+`
`+e.toLocaleString()+`원을 결제할까요?`))return;let p=document.querySelector(`#mobile-manual-submit`);p&&(p.disabled=!0,p.textContent=`결제 처리 중...`);try{let i=await fetch(s+`/api/korpay-manual-pay`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({merchantId:t,amount:e,cardNumber:r,expiryYymm:f,installment:o,buyerName:c,billingIds:[],goodsName:n,customerPhone:l})}),u=await i.json();if(!i.ok||!u.success){alert(`결제 실패

`+(u.message||`카드결제가 승인되지 않았습니다.`));return}let d=String(u.orderId||``).trim();if(!d){alert(`결제는 승인됐지만 주문번호를 받지 못했습니다.
승인번호: `+(u.approvalNumber||`-`));return}let{data:p,error:m}=await a.rpc(`get_next_call_number`,{target_merchant_id:t});if(m||!p){alert(`결제는 승인됐지만 주문 대기번호 생성에 실패했습니다.
`+(m?.message||`번호를 받지 못했습니다.`));return}let h=Number(p),g=String(u.approvalNumber||``).trim(),_=/^\d{8}$/.test(g)?g:null,{error:v}=await a.from(`orders`).insert({merchant_id:t,order_no:String(h),call_number:h,pg_order_id:d,payment_key:u.tid||null,approval_number:_,items:[{name:n||`수기결제`,price:Number(e),quantity:1}],total_amount:Number(e),order_status:`접수`,payment_status:`결제완료`});if(v){alert(`결제는 승인됐지만 주문 저장에 실패했습니다.
`+v.message);return}alert(`결제가 승인되었습니다.

주문번호: `+h+`번
승인번호: `+(u.approvalNumber||`-`));let y=document.querySelector(`#mobile-manual-card-number`),b=document.querySelector(`#mobile-manual-expiry`);y&&(y.value=``),b&&(b.value=``)}catch(e){console.error(`모바일 수기결제 오류:`,e),alert(`결제 요청 중 오류가 발생했습니다.`)}finally{p&&(p.disabled=!1,p.textContent=`결제 요청`)}})}function b(){let e=sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`);if(!e){location.replace(`/merchant-app`);return}let t=sessionStorage.getItem(`login_merchant_name`)||localStorage.getItem(`login_merchant_name`)||`가맹점`;u.innerHTML=`
      <div class="merchant-mobile-home">
  
        <header class="merchant-mobile-header">
  
          <div>
  
            <div class="merchant-mobile-brand">
              NXG PICK
            </div>
  
            <div class="merchant-mobile-store">
              ${t}
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
    `,document.querySelector(`#mobile-sms-card-back`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/card`});let n=()=>{let n=(document.querySelector(`#mobile-sms-product-name`)?.value||``).trim(),r=Number(document.querySelector(`#mobile-sms-amount`)?.value||0);return n?!r||r<100?(alert(`결제금액을 확인해주세요.`),``):s+`/pay?merchantId=`+encodeURIComponent(String(e))+`&merchantName=`+encodeURIComponent(t)+`&productName=`+encodeURIComponent(n)+`&amount=`+r:(alert(`상품명을 입력해주세요.`),``)};document.querySelector(`#mobile-sms-send`)?.addEventListener(`click`,()=>{let e=(document.querySelector(`#mobile-sms-phone`)?.value||``).replace(/[^0-9]/g,``);if(!e){alert(`고객 휴대폰번호를 입력해주세요.`);return}let r=n();if(!r)return;let i=Number(document.querySelector(`#mobile-sms-amount`)?.value||0),a=`[NXG PICK]
`+t+` 결제요청
결제금액: `+i.toLocaleString()+`원

`+r;window.location.href=`sms:`+e+`?body=`+encodeURIComponent(a)}),document.querySelector(`#mobile-sms-copy`)?.addEventListener(`click`,async()=>{let e=n();e&&(await navigator.clipboard.writeText(e),alert(`결제링크가 복사되었습니다.`))})}function x(){let e=sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`);if(!e){location.replace(`/merchant-app`);return}let t=Number(e),n=sessionStorage.getItem(`login_merchant_name`)||localStorage.getItem(`login_merchant_name`)||`가맹점`;u.innerHTML=`
    <div class="merchant-mobile-home">

      <header class="merchant-mobile-header">

        <div>

          <div class="merchant-mobile-brand">
            NXG PICK
          </div>

          <div class="merchant-mobile-store">
            ${n}
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
  `,document.querySelector(`#mobile-cash-back`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/card`});let r=document.querySelector(`#mobile-cash-type`),i=document.querySelector(`#mobile-cash-number`),o=document.querySelector(`#mobile-cash-number-label`);r?.addEventListener(`change`,()=>{r.value===`지출증빙`?(o&&(o.textContent=`사업자번호`),i&&(i.placeholder=`사업자번호 10자리`)):(o&&(o.textContent=`휴대폰번호`),i&&(i.placeholder=`휴대폰번호 또는 현금영수증 카드번호`))}),document.querySelector(`#mobile-cash-submit`)?.addEventListener(`click`,async()=>{let e=document.querySelector(`#mobile-cash-type`)?.value||``,r=Number(document.querySelector(`#mobile-cash-amount`)?.value||0),i=(document.querySelector(`#mobile-cash-order-name`)?.value||`현금결제`).trim(),o=(document.querySelector(`#mobile-cash-number`)?.value||``).replace(/[^0-9]/g,``);if(!r||r<=0){alert(`결제금액을 입력해주세요.`);return}if(!o){alert(e===`지출증빙`?`사업자번호를 입력해주세요.`:`휴대폰번호를 입력해주세요.`);return}let c=`CASH-`+t+`-`+Date.now(),l=document.querySelector(`#mobile-cash-submit`);l&&(l.disabled=!0,l.textContent=`발급 중...`);try{let l=await fetch(s+`/api/toss-cash-receipt`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({amount:r,orderId:c,orderName:i,type:e,customerIdentityNumber:o,taxFreeAmount:0})}),u=await l.json();if(!l.ok||!u.success){alert(`현금영수증 발급 실패: `+(u.message||`알 수 없는 오류`));return}let d=u?.data?.entityBody||u?.data?.cashReceipt||u?.cashReceipt||u?.data||u,f=Math.floor(r*10/11),p=r-f,m=o.replace(/[^0-9]/g,``),h=m.length>=7?m.slice(0,3)+`****`+m.slice(-4):m,g=String(d?.issueStatus||``),_=d?.issueNumber||d?.approvalNumber?`발급완료`:g===`FAILED`?`발급실패`:`발급요청`,{error:v}=await a.from(`cash_receipts`).insert({merchant_id:t,merchant_name:n,order_id:c,order_name:i,receipt_type:e,identity_number_masked:h,amount:r,supply_amount:f,vat_amount:p,tax_free_amount:0,approval_number:d?.issueNumber||d?.approvalNumber||null,receipt_key:d?.receiptKey||null,pg_company:`토스페이먼츠`,status:_,issued_at:new Date().toISOString(),raw_response:u});if(v){alert(`현금영수증은 발급됐지만 내역 저장에 실패했습니다.
`+v.message);return}alert(`현금영수증 발급이 완료되었습니다.`);let y=document.querySelector(`#mobile-cash-amount`),b=document.querySelector(`#mobile-cash-order-name`),x=document.querySelector(`#mobile-cash-number`);y&&(y.value=``),b&&(b.value=``),x&&(x.value=``)}catch(e){console.error(`모바일 현금영수증 오류:`,e),alert(`현금영수증 발급 중 오류가 발생했습니다.`)}finally{l&&(l.disabled=!1,l.textContent=`현금영수증 발급`)}})}async function S(){let e=sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`);if(!e){location.replace(`/merchant-app`);return}let t=Number(e),n=sessionStorage.getItem(`login_merchant_name`)||localStorage.getItem(`login_merchant_name`)||`가맹점`,r=new URLSearchParams(location.search),i=(e=>new Intl.DateTimeFormat(`en-CA`,{timeZone:`Asia/Seoul`,year:`numeric`,month:`2-digit`,day:`2-digit`}).format(e))(new Date),o=r.get(`start`)||i,c=r.get(`end`)||i,l=new Date(o+`T00:00:00+09:00`).toISOString(),d=new Date(c+`T23:59:59.999+09:00`).toISOString(),{data:f,error:p}=await a.from(`cash_receipts`).select(`*`).eq(`merchant_id`,t).gte(`issued_at`,l).lte(`issued_at`,d).order(`issued_at`,{ascending:!1});if(p){alert(`현금영수증 내역 조회 실패: `+p.message);return}let m=f||[],h=m.filter(e=>e.status!==`취소완료`),g=h.reduce((e,t)=>e+Number(t.amount||0),0);u.innerHTML=`
    <div class="merchant-mobile-home">

      <header class="merchant-mobile-header">

        <div>

          <div class="merchant-mobile-brand">
            NXG PICK
          </div>

          <div class="merchant-mobile-store">
            ${n}
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
              value="${o}"
            >

          </div>


          <div>

            <label>
              종료일
            </label>

            <input
              id="mobile-cash-history-end"
              type="date"
              value="${c}"
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
              ${h.length}건
            </strong>
          </span>

          <span>
            승인금액 :
            <strong>
              ${g.toLocaleString()}원
            </strong>
          </span>

        </div>


        <div
          id="mobile-cash-history-list"
          class="merchant-mobile-order-list"
        >

          ${m.length===0?`
                <div
                  class="merchant-mobile-order-empty"
                >
                  현금영수증 내역이 없습니다.
                </div>
              `:m.map(e=>{let t=e.issued_at?new Date(e.issued_at).toLocaleString(`ko-KR`,{timeZone:`Asia/Seoul`}):`-`;return`
                      <div
                        class="merchant-mobile-order-card"
                      >

                        <div
                          class="merchant-mobile-order-card-top"
                        >

                          <strong>
                            ${e.order_name||`현금결제`}
                          </strong>

                          <span>
                            ${Number(e.amount||0).toLocaleString()}원
                          </span>

                        </div>


                        <div
                          class="merchant-mobile-order-date"
                        >
                          ${t}
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
                              ${e.approval_number||`-`}
                            </strong>
                          </div>

                          <div>
                            승인구분 :
                            ${e.receipt_type||`-`}
                          </div>

                          <div>
                            증빙번호 :
                            ${e.identity_number_masked||`-`}
                          </div>

                          <div>
                            물품가액 :
                            ${Number(e.supply_amount||0).toLocaleString()}원
                          </div>

                          <div>
                            부가세 :
                            ${Number(e.vat_amount||0).toLocaleString()}원
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
                            ${e.status||`-`}
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
                            data-id="${e.id}"
                          >
                            승인영수증
                          </button>


                          ${e.status===`취소완료`?`
                                <button
                                  type="button"
                                  class="mobile-cash-cancel-receipt"
                                  data-id="${e.id}"
                                >
                                  취소영수증
                                </button>
                              `:``}


                          ${e.status!==`취소완료`&&e.receipt_key?`
                                <button
                                  type="button"
                                  class="mobile-cash-cancel"
                                  data-id="${e.id}"
                                >
                                  취소처리
                                </button>
                              `:``}

                        </div>

                      </div>
                    `}).join(``)}

        </div>

      </main>

    </div>
  `,document.querySelector(`#mobile-cash-history-back`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/card`}),document.querySelector(`#mobile-cash-history-search`)?.addEventListener(`click`,()=>{let e=document.querySelector(`#mobile-cash-history-start`)?.value||i,t=document.querySelector(`#mobile-cash-history-end`)?.value||i;location.href=`/merchant-app/card/cash-history?start=`+encodeURIComponent(e)+`&end=`+encodeURIComponent(t)});let _=(e,t)=>{document.querySelector(`#merchant-mobile-receipt-modal`)?.remove();let r=t?e.canceled_at:e.issued_at,i=r?new Date(r).toLocaleString(`ko-KR`,{timeZone:`Asia/Seoul`}):`-`,a=e.cancel_response?.data?.entityBody||e.cancel_response?.data?.cashReceipt||e.cancel_response?.data||{},o=a?.issueNumber||a?.approvalNumber||e.cancel_receipt_key||`-`;document.body.insertAdjacentHTML(`beforeend`,`
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
                    ${t?`(취소)`:`(승인)`}
                  </h2>

                </div>


                <section
                  class="merchant-mobile-receipt-section"
                >

                  <h3>
                    ${t?`취소정보`:`승인정보`}
                  </h3>


                  <div
                    class="merchant-mobile-receipt-row"
                  >
                    <span>
                      가맹점
                    </span>

                    <strong>
                      ${n}
                    </strong>
                  </div>


                  <div
                    class="merchant-mobile-receipt-row"
                  >
                    <span>
                      거래일시
                    </span>

                    <strong>
                      ${i}
                    </strong>
                  </div>


                  <div
                    class="merchant-mobile-receipt-row"
                  >
                    <span>
                      ${t?`취소처리번호`:`승인번호`}
                    </span>

                    <strong>
                      ${t?o:e.approval_number||`-`}
                    </strong>
                  </div>


                  ${t?`
                        <div
                          class="merchant-mobile-receipt-row"
                        >

                          <span>
                            원승인번호
                          </span>

                          <strong>
                            ${e.approval_number||`-`}
                          </strong>

                        </div>
                      `:``}


                  <div
                    class="merchant-mobile-receipt-row"
                  >

                    <span>
                      승인구분
                    </span>

                    <strong>
                      ${e.receipt_type||`-`}
                    </strong>

                  </div>


                  <div
                    class="merchant-mobile-receipt-row"
                  >

                    <span>
                      증빙번호
                    </span>

                    <strong>
                      ${e.identity_number_masked||`-`}
                    </strong>

                  </div>


                  <div
                    class="merchant-mobile-receipt-row"
                  >

                    <span>
                      품목명
                    </span>

                    <strong>
                      ${e.order_name||`-`}
                    </strong>

                  </div>


                  <div
                    class="merchant-mobile-receipt-row"
                  >

                    <span>
                      물품가액
                    </span>

                    <strong>
                      ${Number(e.supply_amount||0).toLocaleString()}원
                    </strong>

                  </div>


                  <div
                    class="merchant-mobile-receipt-row"
                  >

                    <span>
                      부가세
                    </span>

                    <strong>
                      ${Number(e.vat_amount||0).toLocaleString()}원
                    </strong>

                  </div>


                  <div
                    class="merchant-mobile-receipt-row"
                  >

                    <span>
                      ${t?`취소금액`:`승인금액`}
                    </span>

                    <strong>
                      ${Number(t?e.cancel_amount||e.amount||0:e.amount||0).toLocaleString()}원
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
          `),document.querySelector(`#mobile-cash-receipt-close`)?.addEventListener(`click`,()=>{document.querySelector(`#merchant-mobile-receipt-modal`)?.remove()}),document.querySelector(`#mobile-cash-receipt-print`)?.addEventListener(`click`,()=>{window.print()})};document.querySelectorAll(`.mobile-cash-approval-receipt`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.id||0),n=m.find(e=>Number(e.id)===t);n&&_(n,!1)})}),document.querySelectorAll(`.mobile-cash-cancel-receipt`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.id||0),n=m.find(e=>Number(e.id)===t);n&&_(n,!0)})}),document.querySelectorAll(`.mobile-cash-cancel`).forEach(e=>{e.addEventListener(`click`,async()=>{let n=Number(e.dataset.id||0),r=m.find(e=>Number(e.id)===n);if(!r||!r.receipt_key){alert(`취소할 현금영수증 정보가 없습니다.`);return}let i=Number(r.amount||0);if(confirm(`현금영수증 ${i.toLocaleString()}원을 취소하시겠습니까?`)){e.disabled=!0,e.textContent=`취소 중...`;try{let e=await fetch(s+`/api/toss-cash-receipt-cancel`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({receiptKey:r.receipt_key})}),o=await e.json();if(!e.ok||!o.success){alert(`현금영수증 취소 실패: `+(o.message||`알 수 없는 오류`));return}let c=o?.data?.entityBody||o?.data?.cashReceipt||o?.data||o,{error:l}=await a.from(`cash_receipts`).update({status:`취소완료`,canceled_at:new Date().toISOString(),cancel_amount:i,cancel_receipt_key:c?.receiptKey||null,cancel_response:o}).eq(`id`,n).eq(`merchant_id`,t);if(l){alert(`현금영수증은 취소됐지만 내역 저장에 실패했습니다.
`+l.message);return}alert(`현금영수증 취소가 완료되었습니다.`),location.reload()}catch(e){console.error(`모바일 현금영수증 취소 오류:`,e),alert(`현금영수증 취소 중 오류가 발생했습니다.`)}finally{e.disabled=!1,e.textContent=`취소처리`}}})})}async function C(){let e=sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`);if(!e){location.replace(`/merchant-app`);return}let t=Number(e),r=sessionStorage.getItem(`login_merchant_name`)||localStorage.getItem(`login_merchant_name`)||`가맹점`;u.innerHTML=`
      <div class="merchant-mobile-home">
  
        <header class="merchant-mobile-header">
  
          <div>
  
            <div class="merchant-mobile-brand">
              NXG PICK
            </div>
  
            <div class="merchant-mobile-store">
              ${r}
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
    `,document.querySelector(`#mobile-menu-card-back`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/card`});let{data:i,error:d}=await a.from(`products`).select(`*`).eq(`merchant_id`,t).eq(`status`,`판매중`).order(`sort_order`,{ascending:!0}).order(`id`,{ascending:!0}),f=document.querySelector(`#mobile-menu-product-list`);if(!f)return;if(d){f.innerHTML=`상품 조회 실패: `+d.message;return}let p=i||[];if(p.length===0){f.innerHTML=`
        <div class="merchant-mobile-order-empty">
          판매중인 상품이 없습니다.
        </div>
      `;return}let m=new Map,h=()=>{let e=0;p.forEach(t=>{let n=m.get(Number(t.id))||0;e+=Number(t.price||0)*n});let t=document.querySelector(`#mobile-menu-total-amount`);return t&&(t.textContent=e.toLocaleString()+`원`),e};f.innerHTML=p.map(e=>`
            <div
              class="merchant-mobile-menu-product"
            >
  
              <div
                class="merchant-mobile-menu-product-image"
              >
  
                ${e.image_url?`
                      <img
                        src="${e.image_url}"
                        alt=""
                      >
                    `:`
                      <span>
                        이미지 없음
                      </span>
                    `}
  
              </div>
  
  
              <div
                class="merchant-mobile-menu-product-info"
              >
  
                <strong>
                  ${e.product_name||`-`}
                </strong>
  
                <span>
                  ${Number(e.price||0).toLocaleString()}원
                </span>
  
  
                <div
                  class="merchant-mobile-menu-quantity"
                >
  
                  <button
                    type="button"
                    data-menu-minus="${e.id}"
                  >
                    −
                  </button>
  
                  <strong
                    id="mobile-menu-quantity-${e.id}"
                  >
                    0
                  </strong>
  
                  <button
                    type="button"
                    data-menu-plus="${e.id}"
                  >
                    +
                  </button>
  
                </div>
  
              </div>
  
            </div>
          `).join(``),document.querySelectorAll(`[data-menu-plus]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.menuPlus||0),n=(m.get(t)||0)+1;m.set(t,n);let r=document.querySelector(`#mobile-menu-quantity-`+t);r&&(r.textContent=String(n)),h()})}),document.querySelectorAll(`[data-menu-minus]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.menuMinus||0),n=m.get(t)||0,r=Math.max(0,n-1);m.set(t,r);let i=document.querySelector(`#mobile-menu-quantity-`+t);i&&(i.textContent=String(r)),h()})}),document.querySelector(`#mobile-menu-payment-submit`)?.addEventListener(`click`,async()=>{let e=p.map(e=>{let t=m.get(Number(e.id))||0;return{id:e.id,name:e.product_name,product_name:e.product_name,price:Number(e.price||0),quantity:t}}).filter(e=>e.quantity>0),i=e.reduce((e,t)=>e+Number(t.price)*Number(t.quantity),0);if(e.length===0||i<=0){alert(`결제할 상품을 선택해주세요.`);return}let{data:u,error:d}=await a.from(`merchants`).select(`
                merchant_name,
                online_pg_company_1,
                toss_client_key,
                korpay_pg_mid,
                korpay_pg_mkey
              `).eq(`id`,t).single();if(d||!u){alert(`가맹점 결제정보를 불러오지 못했습니다.`);return}let f=String(u.online_pg_company_1||``).trim();if(f!==`토스페이먼츠`&&f!==`코페이`){alert(`온라인결제 1 PG사를 확인해주세요.`);return}let{data:h,error:g}=await a.rpc(`get_next_call_number`,{target_merchant_id:t});if(g||!h){alert(`주문번호 생성에 실패했습니다.`);return}let _=Number(h),v=(f===`코페이`?`KORPAY-`:`TOSS-`)+_+`-`+Date.now();if(sessionStorage.setItem(`kiosk_call_number`,String(_)),sessionStorage.setItem(`kiosk_order_no`,v),sessionStorage.setItem(`kiosk_merchant_id`,String(t)),sessionStorage.setItem(`kiosk_items`,JSON.stringify(e)),sessionStorage.setItem(`kiosk_total_amount`,String(i)),sessionStorage.setItem(`merchantId`,String(t)),sessionStorage.setItem(`merchantName`,u.merchant_name||r),sessionStorage.setItem(`message`,`모바일 메뉴결제`),sessionStorage.setItem(`selected_pg_company`,f),f===`코페이`){if(!u.korpay_pg_mid||!u.korpay_pg_mkey){alert(`코페이 PG MID 또는 MKEY가 등록되지 않았습니다.`);return}let n=c(),a=await l(String(u.korpay_pg_mid),n,i,String(u.korpay_pg_mkey)),o={merchantId:u.korpay_pg_mid,productName:e.length===1?e[0].name:e[0].name+` 외 `+(e.length-1)+`건`,orderNumber:v.replace(/[^a-zA-Z0-9]/g,``),amount:i,payMethod:`card`,returnUrl:s+`/api/korpay-return`,ediDate:n,hashKey:a,customerName:u.merchant_name||r,reserved:String(t),language:`ko`},d=window.KorpaySdk;if(!d){alert(`Korpay SDK를 찾을 수 없습니다.`);return}d.paymentTimeout=3e4,d.payment(`https://staging-payments.korpay.com/v1`,o,{onStart:()=>{let e=document.querySelector(`#mobile-menu-payment-submit`);e&&(e.disabled=!0,e.innerText=`결제창 호출 중...`)},onError:e=>{alert(String(e));let t=document.querySelector(`#mobile-menu-payment-submit`);t&&(t.disabled=!1,t.innerText=`카드 결제`)},onClose:()=>{let e=document.querySelector(`#mobile-menu-payment-submit`);e&&(e.disabled=!1,e.innerText=`카드 결제`)}});return}if(f===`토스페이먼츠`){let a=String(u.toss_client_key||o).trim();if(!a){alert(`토스 Client Key가 등록되지 않았습니다.`);return}await(await n(a)).requestPayment(`카드`,{amount:i,orderId:v.replace(/[^a-zA-Z0-9]/g,``),orderName:e.length===1?e[0].name:e[0].name+` 외 `+(e.length-1)+`건`,customerName:u.merchant_name||r,successUrl:window.location.origin+`/merchant-app/success?source=kiosk&pg=토스페이먼츠&merchantId=`+t+`&merchantName=`+encodeURIComponent(u.merchant_name||r),failUrl:window.location.origin+`/fail`});return}})}async function w(){let e=new URLSearchParams(window.location.search),t=e.get(`orderId`)||``,n=e.get(`paymentKey`)||``,r=e.get(`amount`)||``,i=e.get(`merchantId`)||sessionStorage.getItem(`kiosk_merchant_id`)||sessionStorage.getItem(`login_merchant_id`)||``,o=e.get(`merchantName`)||sessionStorage.getItem(`merchantName`)||sessionStorage.getItem(`login_merchant_name`)||`가맹점`;if(!t||!n||!r||!i){u.innerHTML=`
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
      `,document.querySelector(`#mobile-success-orders`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/orders`});return}let c=Number(i),l=Number(r);u.innerHTML=`
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
    `;try{let{data:e,error:i}=await a.from(`merchants`).select(`
            merchant_name,
            fee_rate
          `).eq(`id`,c).maybeSingle();if(i||!e)throw Error(`가맹점 정보를 불러오지 못했습니다.`);let d=Number(e.fee_rate||0),f=Math.floor(l*d/100),p=l-f,{data:m}=await a.from(`payments`).select(`id`).eq(`order_id`,t).maybeSingle(),h=null;if(!m){let i=await fetch(s+`/api/toss-confirm`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({paymentKey:n,orderId:t,amount:r})});if(!i.ok){let e=await i.json();throw Error(e.message||`토스 결제 승인에 실패했습니다.`)}h=await i.json();let u={"3K":`기업비씨`,46:`광주`,71:`롯데`,30:`산업`,31:`BC`,51:`삼성`,38:`새마을`,41:`신한`,62:`신협`,36:`씨티`,33:`우리`,W1:`우리`,37:`우체국`,39:`저축`,35:`전북`,42:`제주`,15:`카카오뱅크`,"3A":`케이뱅크`,24:`토스뱅크`,21:`하나`,61:`현대`,11:`국민`,91:`농협`,34:`수협`},m=h.card?.acquirerCode||h.card?.issuerCode||``,g=u[m]||m,{count:_}=await a.from(`payments`).select(`*`,{count:`exact`,head:!0}),v=(_||0)+1,{error:y}=await a.from(`payments`).insert({order_number:v,order_id:t,payment_key:n,amount:l,fee_rate:d,fee_amount:f,settlement_amount:p,status:`paid`,message:sessionStorage.getItem(`message`)||`모바일 메뉴결제`,merchant_id:c,merchant_name:e.merchant_name||o,pg_company:`토스페이먼츠`,payment_method:h.method||`카드`,approval_number:h.card?.approveNo||``,card_company:g,card_number:h.card?.number||``,installment_months:h.card?.installmentPlanMonths?String(h.card.installmentPlanMonths):`일시불`,approved_at:h.approvedAt||new Date().toISOString()});if(y)throw Error(`결제내역 저장 실패: `+y.message)}let g=sessionStorage.getItem(`kiosk_order_no`)||``,_=sessionStorage.getItem(`kiosk_items`),v=sessionStorage.getItem(`kiosk_total_amount`),y=sessionStorage.getItem(`kiosk_call_number`),b=g?g.replace(/[^a-zA-Z0-9]/g,``):t,{data:x}=await a.from(`orders`).select(`id`).eq(`merchant_id`,c).eq(`pg_order_id`,b).maybeSingle();if(!x&&_&&v){let e=JSON.parse(_),{error:t}=await a.from(`orders`).insert({merchant_id:c,order_no:y||`-`,call_number:y?Number(y):null,pg_order_id:b,payment_key:n,items:e,total_amount:Number(v),order_status:`접수`,payment_status:`결제완료`});if(t)throw Error(`주문 저장 실패: `+t.message)}sessionStorage.removeItem(`kiosk_order_no`),sessionStorage.removeItem(`kiosk_merchant_id`),sessionStorage.removeItem(`kiosk_items`),sessionStorage.removeItem(`kiosk_total_amount`),sessionStorage.removeItem(`kiosk_call_number`),window.history.replaceState({},``,`/merchant-app/success`),u.innerHTML=`
        <div class="merchant-mobile-home">
  
          <header class="merchant-mobile-header">
  
            <div>
  
              <div class="merchant-mobile-brand">
                NXG PICK
              </div>
  
              <div class="merchant-mobile-store">
                ${o}
              </div>
  
            </div>
  
          </header>
  
  
          <main class="merchant-mobile-content">
  
            <div class="merchant-mobile-manual-card">
  
              <h2>
                결제가 완료되었습니다.
              </h2>
  
              <p>
                ${l.toLocaleString()}원
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
      `,document.querySelector(`#mobile-success-orders`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/orders`}),document.querySelector(`#mobile-success-card`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/card`})}catch(e){console.error(`모바일 결제 완료 처리 오류:`,e),u.innerHTML=`
        <div class="merchant-mobile-home">
  
          <main class="merchant-mobile-content">
  
            <div class="merchant-mobile-manual-card">
  
              <h2>
                결제 처리 오류
              </h2>
  
              <p>
                ${e?.message||`결제 처리 중 오류가 발생했습니다.`}
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
      `,document.querySelector(`#mobile-success-orders`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/orders`})}}function T(){if(sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`)){location.replace(`/merchant-app/home`);return}u.innerHTML=`
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
  `,document.querySelector(`#mobile-merchant-login`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.querySelector(`#mobile-login-id`),n=document.querySelector(`#mobile-login-password`),r=document.querySelector(`#mobile-login-message`),i=document.querySelector(`.merchant-app-login-button`),o=t?.value.trim()||``,s=n?.value.trim()||``;if(!o||!s){r&&(r.textContent=`아이디와 비밀번호를 입력해주세요.`);return}i&&(i.disabled=!0,i.textContent=`로그인 중...`),r&&(r.textContent=``);try{let{data:e,error:t}=await a.from(`merchants`).select(`
                id,
                merchant_login_id,
                merchant_password,
                merchant_name,
                merchant_type
              `).eq(`merchant_login_id`,o);if(t){r&&(r.textContent=`로그인 조회 실패: `+t.message);return}let n=(e||[]).find(e=>String(e.merchant_password||``).trim()===s);if(!n){r&&(r.textContent=`아이디 또는 비밀번호가 올바르지 않습니다.`);return}let i={login_merchant_id:String(n.id||``),login_merchant_code:String(n.merchant_login_id||``),login_merchant_name:String(n.merchant_name||``),login_merchant_type:String(n.merchant_type||`일반매장`)};Object.entries(i).forEach(([e,t])=>{sessionStorage.setItem(e,t),localStorage.setItem(e,t)}),location.href=`/merchant-app/home`}catch(e){console.error(`모바일 로그인 오류:`,e),r&&(r.textContent=`로그인 중 오류가 발생했습니다.`)}finally{i&&(i.disabled=!1,i.textContent=`로그인`)}})}d===`/merchant-app/home`?m():d===`/merchant-app/orders`?h():d===`/merchant-app/products`?g():d===`/merchant-app/qr`?_():d===`/merchant-app/card`?v():d===`/merchant-app/card/manual`?y():d===`/merchant-app/card/sms`?b():d===`/merchant-app/card/cash`?x():d===`/merchant-app/card/cash-history`?S():d===`/merchant-app/card/menu`?C():d===`/merchant-app/success`?w():T();