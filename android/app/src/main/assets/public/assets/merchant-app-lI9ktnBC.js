const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/web-DoVIAWZl.js","assets/dist-1Myv_BFQ.js","assets/web-XEBgRt-q.js"])))=>i.map(i=>d[i]);
import{o as e}from"./chunk-jRWAZmH_.js";import{t}from"./preload-helper-DSXbuxSR.js";import{r as n,t as r}from"./dist-1Myv_BFQ.js";import{n as i,r as a,t as o}from"./browser-DdLi_Qtf.js";import{t as s}from"./dist-U4vKvSEI.js";var c=n(`App`,{web:()=>t(()=>import(`./web-DoVIAWZl.js`).then(e=>new e.AppWeb),__vite__mapDeps([0,1]))}),l;(function(e){e[e.UNKNOWN=0]=`UNKNOWN`,e[e.UPDATE_NOT_AVAILABLE=1]=`UPDATE_NOT_AVAILABLE`,e[e.UPDATE_AVAILABLE=2]=`UPDATE_AVAILABLE`,e[e.UPDATE_IN_PROGRESS=3]=`UPDATE_IN_PROGRESS`})(l||={});var u;(function(e){e[e.UNKNOWN=0]=`UNKNOWN`,e[e.PENDING=1]=`PENDING`,e[e.DOWNLOADING=2]=`DOWNLOADING`,e[e.INSTALLING=3]=`INSTALLING`,e[e.INSTALLED=4]=`INSTALLED`,e[e.FAILED=5]=`FAILED`,e[e.CANCELED=6]=`CANCELED`,e[e.DOWNLOADED=11]=`DOWNLOADED`})(u||={});var d;(function(e){e[e.OK=0]=`OK`,e[e.CANCELED=1]=`CANCELED`,e[e.FAILED=2]=`FAILED`,e[e.NOT_AVAILABLE=3]=`NOT_AVAILABLE`,e[e.NOT_ALLOWED=4]=`NOT_ALLOWED`,e[e.INFO_MISSING=5]=`INFO_MISSING`})(d||={});var f=n(`AppUpdate`,{web:()=>t(()=>import(`./web-XEBgRt-q.js`).then(e=>new e.AppUpdateWeb),__vite__mapDeps([2,1]))}),p=!1;async function m(){if(r.isNativePlatform()&&r.getPlatform()===`android`&&window.location.pathname===`/merchant-app/home`&&!p){p=!0;try{let e=await f.getAppUpdateInfo();if(e.updateAvailability!==l.UPDATE_AVAILABLE||window.location.pathname!==`/merchant-app/home`||document.getElementById(`nxg-update-dialog`))return;let t=String(e.availableVersionCode||`new`),n=Number(e.updatePriority||0)>=4,r=`nxg_update_later_`+t;if(!n){let e=Number(localStorage.getItem(r)||`0`);if(Date.now()<e)return}let i=document.createElement(`div`);i.id=`nxg-update-dialog`,i.style.cssText=`
      position:fixed;
      inset:0;
      z-index:2147483647;
      display:flex;
      align-items:center;
      justify-content:center;
      background:rgba(0,0,0,0.55);
      padding:20px;
      box-sizing:border-box;
    `;let a=document.createElement(`div`);a.style.cssText=`
      width:100%;
      max-width:360px;
      padding:24px;
      box-sizing:border-box;
      background:#ffffff;
      color:#172033;
      border-radius:16px;
      text-align:center;
      box-shadow:0 10px 36px rgba(0,0,0,0.2);
    `;let o=document.createElement(`h2`);o.textContent=n?`NXG PICK 필수 업데이트`:`NXG PICK 업데이트 안내`,o.style.cssText=`
      margin:0 0 14px;
      font-size:20px;
      font-weight:800;
    `;let s=document.createElement(`p`);s.textContent=n?`중요한 업데이트가 있습니다. 최신 버전으로 업데이트해 주세요.`:`새로운 버전이 출시되었습니다. 최신 버전으로 업데이트하시겠습니까?`,s.style.cssText=`
      font-size:15px;
      line-height:1.6;
      margin:0 0 22px;
    `;let c=document.createElement(`div`);c.style.cssText=`
      display:flex;
      gap:10px;
    `;let u=document.createElement(`button`);if(u.textContent=`업데이트`,u.style.cssText=`
      flex:1;
      padding:14px 10px;
      background:#1677ff;
      border:0;
      border-radius:9px;
      color:white;
      font-size:15px;
      font-weight:700;
      cursor:pointer;
    `,u.addEventListener(`click`,async()=>{u.disabled=!0;try{n&&e.immediateUpdateAllowed?await f.performImmediateUpdate():await f.openAppStore()}catch(e){console.error(`NXG 업데이트 실행 실패:`,e),alert(`업데이트 화면을 열지 못했습니다.`)}finally{u.disabled=!1}}),!n){let e=document.createElement(`button`);e.textContent=`나중에`,e.style.cssText=`
        flex:1;
        padding:14px 10px;
        background:#eef1f5;
        border:0;
        border-radius:9px;
        color:#333333;
        font-size:15px;
        font-weight:700;
        cursor:pointer;
      `,e.addEventListener(`click`,()=>{localStorage.setItem(r,String(Date.now()+1440*60*1e3)),i.remove()}),c.appendChild(e)}c.appendChild(u),a.appendChild(o),a.appendChild(s),a.appendChild(c),i.appendChild(a),document.body.appendChild(i)}catch(e){console.warn(`NXG 업데이트 확인 오류:`,e)}finally{p=!1}}}var h=e(o(),1),g=e(i(),1);function _(e){return window.Capacitor?.isNativePlatform?.()?`https://app.nxgsoft.co.kr`+e:e}async function v(){window.Capacitor?.isNativePlatform?.()&&await y(`clear`),sessionStorage.removeItem(`nxg_native_merchant_session`)}async function y(e,t=``){let n=window.Capacitor;if(typeof n?.nativePromise!=`function`)throw Error(`Android secure session unavailable`);return n.nativePromise(`NxgSecureSession`,e,e===`save`?{token:t}:{})}function b(e){try{let t=e.split(`.`)[0].replace(/-/g,`+`).replace(/_/g,`/`),n=JSON.parse(atob(t)),r=Number(n.exp);return!Number.isFinite(r)||Date.now()>=r}catch{return!0}}async function x(){if(!window.Capacitor?.isNativePlatform?.())return{};let e=sessionStorage.getItem(`nxg_native_merchant_session`)||``;if(!e)try{let t=await y(`load`);e=String(t?.token||``),e&&sessionStorage.setItem(`nxg_native_merchant_session`,e)}catch(e){console.error(`취소 인증 복구 실패:`,e)}if(!e)throw Error(`취소 인증정보가 없습니다. 로그아웃 후 다시 로그인해 주세요.`);if(b(e)){sessionStorage.removeItem(`nxg_native_merchant_session`);try{await y(`clear`)}catch(e){console.error(`만료 인증정보 삭제 실패:`,e)}throw Error(`취소 인증이 만료되었습니다. 로그아웃 후 다시 로그인해 주세요.`)}return{Authorization:`Bearer `+e}}async function S(e){let t=window.Capacitor;if(t?.getPlatform?.()===`android`){if(typeof t.nativePromise!=`function`)throw Error(`Android TTS bridge unavailable`);await t.nativePromise(`NxgTts`,`speak`,{text:e});return}if(!(`speechSynthesis`in window))throw Error(`Speech synthesis unavailable`);window.speechSynthesis.cancel();let n=new SpeechSynthesisUtterance(e);n.lang=`ko-KR`,n.rate=.95,n.volume=1,window.speechSynthesis.speak(n)}var C=s(`https://rnmptlxdeihvfwegoqnf.supabase.co`,`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJubXB0bHhkZWlodmZ3ZWdvcW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MzcwMDMsImV4cCI6MjA5NDIxMzAwM30.5SeOiuZgFmU7RUu5kzLpLBUwC91SYI3WxqRFoafMrG8`),w=`live_ck_GjLJoQ1aVZ2QXB2vMWyPVw6KYe2R`,T=`https://payment-app-ybtf.vercel.app`;function E(){let e=new Date,t=String(e.getFullYear()),n=String(e.getMonth()+1).padStart(2,`0`),r=String(e.getDate()).padStart(2,`0`),i=String(e.getHours()).padStart(2,`0`),a=String(e.getMinutes()).padStart(2,`0`),o=String(e.getSeconds()).padStart(2,`0`);return t+n+r+i+a+o}async function D(e,t,n,r){let i=e+t+String(n)+r,a=new TextEncoder().encode(i),o=await crypto.subtle.digest(`SHA-256`,a);return Array.from(new Uint8Array(o)).map(e=>e.toString(16).padStart(2,`0`)).join(``)}var O=document.querySelector(`#app`),k=window.location.pathname;window.Capacitor?.isNativePlatform?.()&&c.addListener(`backButton`,()=>{let e=window.location.pathname;if(!(e===`/merchant-app`||e===`/merchant-app/home`)){if(e.startsWith(`/merchant-app/card/`)){window.location.replace(`/merchant-app/card`);return}window.location.replace(`/merchant-app/home`)}});var A=null,j=()=>{let e=navigator.userAgent.toLowerCase(),t=e.includes(`android`),n=/iphone|ipad|ipod/.test(e),r=navigator.platform===`MacIntel`&&navigator.maxTouchPoints>1;return t||n||r},M=()=>{let e=navigator;return window.matchMedia(`(display-mode: standalone)`).matches||e.standalone===!0};window.addEventListener(`beforeinstallprompt`,e=>{e.preventDefault(),A=e}),window.addEventListener(`beforeinstallprompt`,e=>{e.preventDefault(),A=e;let t=document.querySelector(`#nxg-login-install-button`);t&&j()&&!M()&&(t.style.display=`block`)}),window.addEventListener(`appinstalled`,()=>{A=null;let e=document.querySelector(`#nxg-login-install-button`);e&&(e.style.display=`none`)});var N=[`login_merchant_id`,`login_merchant_code`,`login_merchant_name`,`login_merchant_type`,`hotel_staff_mode`,`hotel_staff_id`,`hotel_staff_name`,`hotel_staff_login_id`,`hotel_staff_role`],P=()=>{fetch(`/api/merchant-logout`,{method:`POST`,credentials:`include`,keepalive:!0}).catch(e=>{console.error(`가맹점 로그아웃 API 오류:`,e)})};async function F(){let e=sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`);if(!e){location.replace(`/merchant-app`);return}let t=sessionStorage.getItem(`login_merchant_name`)||localStorage.getItem(`login_merchant_name`)||`가맹점`,n=e=>{let t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,`0`),r=String(e.getDate()).padStart(2,`0`);return t+`-`+n+`-`+r},r=n(new Date),i=new URLSearchParams(window.location.search),a=i.get(`terminal_start_date`)||r,o=i.get(`terminal_end_date`)||r,{data:s,error:c}=await C.from(`payments`).select(`
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
      `).eq(`merchant_id`,e).order(`created_at`,{ascending:!1}).limit(500);c&&console.error(`무선단말기 거래내역 조회 실패:`,c);let l=s||[],u=l.filter(e=>{let t=e.status===`cancel`?e.canceled_at||e.approved_at||e.created_at:e.approved_at||e.created_at;if(!t)return!1;let r=n(new Date(t));return r>=a&&r<=o}),d=u.filter(e=>e.status===`paid`),f=u.filter(e=>e.status===`cancel`),p=d.reduce((e,t)=>e+Number(t.amount||0),0),m=f.reduce((e,t)=>e+Number(t.amount||0),0),h=p-m,{data:g}=await C.from(`merchants`).select(`settlement_cycle`).eq(`id`,e).single(),_=String(g?.settlement_cycle||`1일`),{data:y}=await C.from(`holidays`).select(`holiday_date`),b=new Set((y||[]).map(e=>String(e.holiday_date))),x=a===o&&b.has(a),S=e=>{let t=new Date(e),r=_.match(/\d+/),i=r?Number(r[0]):1,a=0;for(;a<i;){t.setDate(t.getDate()+1);let e=n(t),r=t.getDay(),i=r===0||r===6,o=b.has(e);i||o||(a+=1)}return n(t)},w=l.filter(e=>{if(e.status!==`paid`)return!1;let t=e.approved_at||e.created_at;if(!t)return!1;let n=S(t);return n>=a&&n<=o}),T=w.reduce((e,t)=>e+Number(t.settlement_amount||0),0),E=w.map(e=>{let t=e.approved_at||e.created_at;return t?n(new Date(t)):``}).filter(Boolean).sort(),D=``;if(E.length>0){let e=E[0],t=E[E.length-1],n=e=>{let[t,n,r]=e.split(`-`);return t.slice(2)+`.`+n+`.`+r};D=e===t?n(e):n(e)+`~`+n(t)}let k=Math.max(1,Number(i.get(`terminal_page`)||1)),A=Math.max(1,Number(i.get(`terminal_page_size`)||10)),j=Math.max(1,Math.ceil(u.length/A)),M=Math.min(k,j),F=(M-1)*A,I=u.slice(F,F+A),L=e=>e===`paid`?`승인`:e===`cancel`?`취소`:e===`ready`?`대기`:e||`-`,R=e=>{let t=e.status===`cancel`?e.canceled_at||e.approved_at||e.created_at:e.approved_at||e.created_at;return t?new Date(t).toLocaleString(`ko-KR`):`-`};O.innerHTML=`
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
              value="${a}"
            />

            <span>
              ~
            </span>

            <input
              type="date"
              id="terminal-mobile-end-date"
              value="${o}"
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
              ${p.toLocaleString()}원
            </strong>

            <small>
              승인 ${d.length.toLocaleString()}건
            </small>

          </div>


          <div class="terminal-mobile-card">

            <span>
              취소금액
            </span>

            <strong>
              ${m.toLocaleString()}원
            </strong>

            <small>
              취소 ${f.length.toLocaleString()}건
            </small>

          </div>


          <div class="terminal-mobile-card">

            <span>
              순매출
            </span>

            <strong>
              ${h.toLocaleString()}원
            </strong>

            <small>
              총 거래 ${u.length.toLocaleString()}건
            </small>

          </div>


          <div class="terminal-mobile-card">

            <span>
              정산금액
            </span>

            <strong>
              ${T.toLocaleString()}원
            </strong>

            <small
  style="
    display:block;
    margin-top:5px;
    color:#d93025;
    font-weight:700;
  "
>
  ${x?`공휴일`:`정산대상 ${w.length.toLocaleString()}건${D?` · `+D+` 결제건`:``}`}
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
                ${A===10?`selected`:``}
              >
                10개씩
              </option>

              <option
                value="20"
                ${A===20?`selected`:``}
              >
                20개씩
              </option>

              <option
                value="50"
                ${A===50?`selected`:``}
              >
                50개씩
              </option>

            </select>

          </div>


          <div class="terminal-mobile-history-list">

            ${I.length===0?`
                  <div class="terminal-mobile-empty">
                    등록된 무선단말기 거래내역이 없습니다.
                  </div>
                `:I.map(e=>`

                        <div class="terminal-mobile-history-card">

                          <div class="terminal-mobile-history-head">

                            <strong>
                              ${Number(e.amount||0).toLocaleString()}원
                            </strong>

                            <span
                              class="${e.status===`cancel`?`cancel`:`paid`}"
                            >
                              ${L(e.status)}
                            </span>

                          </div>


                          <div class="terminal-mobile-history-row">

                            <span>
                              거래일시
                            </span>

                            <strong>
                              ${R(e)}
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
              ${M<=1?`disabled`:``}
            >
              이전
            </button>

            <strong>
              ${M} / ${j}
            </strong>

            <button
              id="terminal-mobile-page-next"
              type="button"
              ${M>=j?`disabled`:``}
            >
              다음
            </button>

          </div>

        </section>

      </main>

    </div>
  `;let z=(e,t)=>{let r=new Date(e+`T00:00:00`);return r.setDate(r.getDate()+t),n(r)},B=(e,t)=>{let n=new URLSearchParams(window.location.search);n.set(`terminal_start_date`,e),n.set(`terminal_end_date`,t),location.href=window.location.pathname+`?`+n.toString()};document.querySelector(`#terminal-mobile-search`)?.addEventListener(`click`,()=>{let e=document.querySelector(`#terminal-mobile-start-date`),t=document.querySelector(`#terminal-mobile-end-date`);!e?.value||!t?.value||B(e.value,t.value)}),document.querySelector(`#terminal-mobile-today`)?.addEventListener(`click`,()=>{B(r,r)}),document.querySelector(`#terminal-mobile-prev`)?.addEventListener(`click`,()=>{B(z(a,-1),z(o,-1))}),document.querySelector(`#terminal-mobile-next`)?.addEventListener(`click`,()=>{B(z(a,1),z(o,1))}),document.querySelector(`#terminal-mobile-month`)?.addEventListener(`click`,()=>{let e=new Date,t=new Date(e.getFullYear(),e.getMonth(),1),r=new Date(e.getFullYear(),e.getMonth()+1,0);B(n(t),n(r))}),document.querySelector(`#terminal-mobile-page-prev`)?.addEventListener(`click`,()=>{let e=new URLSearchParams(window.location.search);e.set(`terminal_page`,String(Math.max(1,M-1))),location.href=window.location.pathname+`?`+e.toString()}),document.querySelector(`#terminal-mobile-page-next`)?.addEventListener(`click`,()=>{let e=new URLSearchParams(window.location.search);e.set(`terminal_page`,String(Math.min(j,M+1))),location.href=window.location.pathname+`?`+e.toString()}),document.querySelector(`#terminal-mobile-page-size`)?.addEventListener(`change`,e=>{let t=e.target,n=new URLSearchParams(window.location.search);n.set(`terminal_page_size`,t.value),n.set(`terminal_page`,`1`),location.href=window.location.pathname+`?`+n.toString()}),document.querySelector(`#merchant-mobile-logout`)?.addEventListener(`click`,async()=>{try{await v()}catch(e){console.error(`로그아웃 인증정보 삭제 실패:`,e),alert(`인증정보 삭제에 실패했습니다. 다시 시도해 주세요.`);return}P(),N.forEach(e=>{sessionStorage.removeItem(e),localStorage.removeItem(e)}),location.replace(`/merchant-app`)})}function I(){let e=sessionStorage.getItem(`login_merchant_id`);if(!e){location.replace(`/merchant-app`);return}if(sessionStorage.getItem(`hotel_staff_mode`)===`true`){location.replace(`/merchant-app/hotel/orders`);return}let t=sessionStorage.getItem(`login_merchant_name`)||`가맹점`,n=sessionStorage.getItem(`login_merchant_type`)||`일반매장`,r=n===`일반매장`,i=n===`무선단말기`,a=n===`아카데미`,o=n===`뷰티`,s=n===`호텔`,c=n===`테이블오더`,l=n===`수기결제`;if(i){F();return}let u=``;if(l)u=`
    <button
      type="button"
      class="merchant-mobile-menu-card"
      data-menu="manual-payment"
    >
      <span class="merchant-mobile-menu-icon">💳</span>
      <strong>수기결제</strong>
      <small>카드정보 직접 입력</small>
    </button>

    <button
      type="button"
      class="merchant-mobile-menu-card"
      data-menu="sms-payment"
    >
      <span class="merchant-mobile-menu-icon">📨</span>
      <strong>SMS결제</strong>
      <small>결제링크 문자 발송</small>
    </button>

    <button
      type="button"
      class="merchant-mobile-menu-card"
      data-menu="cash-receipt"
    >
      <span class="merchant-mobile-menu-icon">🧾</span>
      <strong>현금영수증</strong>
      <small>현금영수증 발급</small>
    </button>

    <button
      type="button"
      class="merchant-mobile-menu-card"
      data-menu="cash-history"
    >
      <span class="merchant-mobile-menu-icon">📄</span>
      <strong>현금영수증내역</strong>
      <small>승인 및 취소내역</small>
    </button>

    <button
  type="button"
  class="merchant-mobile-menu-card"
  data-menu="orders"
  style="grid-column: 1 / -1;"
>
  <span class="merchant-mobile-menu-icon">📋</span>
  <strong>주문관리</strong>
  <small>주문 및 결제내역 관리</small>
</button>
  `;else if(c)u=`
    <button
      type="button"
      class="merchant-mobile-menu-card"
      data-menu="orders"
    >
      <span class="merchant-mobile-menu-icon">📋</span>
      <strong>주문관리</strong>
      <small>테이블 주문 및 결제내역</small>
    </button>

    <button
      type="button"
      class="merchant-mobile-menu-card"
      data-menu="products"
    >
      <span class="merchant-mobile-menu-icon">🛍️</span>
      <strong>상품관리</strong>
      <small>메뉴 등록 및 수정</small>
    </button>

    <button
      type="button"
      class="merchant-mobile-menu-card"
      data-menu="tables"
    >
      <span class="merchant-mobile-menu-icon">🍽️</span>
      <strong>테이블관리</strong>
      <small>테이블 등록 및 QR · NFC 관리</small>
    </button>

    <button
      type="button"
      class="merchant-mobile-menu-card"
      data-menu="card"
    >
      <span class="merchant-mobile-menu-icon">💳</span>
      <strong>카드결제</strong>
      <small>카드 결제 관리</small>
    </button>
  `;else if(r)u=`
    <button
      type="button"
      class="merchant-mobile-menu-card"
      data-menu="card"
    >
      <span class="merchant-mobile-menu-icon">💳</span>
      <strong>카드결제</strong>
      <small>OCR · 수기 · 현금영수증</small>
    </button>

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
      <strong>QR관리</strong>
      <small>가맹점 QR 확인 및 관리</small>
    </button>
  `;else if(a)u=`
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
    `;else if(o)u=`
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
    `;else if(s){O.innerHTML=`
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
            id="hotel-admin-mobile-logout"
            class="merchant-mobile-logout"
            type="button"
          >
            로그아웃
          </button>

        </header>


        <main
          class="merchant-mobile-content"
          style="
            max-width:760px;
            margin:0 auto;
          "
        >

          <section
            style="
              margin-top:34px;
              background:#ffffff;
              border:1px solid #dbe3ee;
              border-radius:18px;
              padding:34px 28px;
              text-align:center;
              box-shadow:0 8px 24px rgba(15,35,60,0.05);
            "
          >

            <div
              style="
                display:inline-flex;
                align-items:center;
                justify-content:center;
                padding:7px 13px;
                border-radius:999px;
                background:#eef4fb;
                color:#174981;
                font-size:13px;
                font-weight:800;
                margin-bottom:18px;
              "
            >
              호텔 관리자 계정
            </div>


            <h1
              style="
                margin:0;
                font-size:27px;
                font-weight:900;
                color:#0b2342;
              "
            >
              ${t}
            </h1>


            <p
              style="
                margin:20px 0 0;
                font-size:17px;
                font-weight:800;
                color:#172033;
                line-height:1.7;
              "
            >
              호텔 모바일 서비스는<br>
              직원 전용 서비스입니다.
            </p>


            <p
              style="
                margin:14px 0 0;
                font-size:14px;
                color:#667085;
                line-height:1.8;
              "
            >
              상품관리, 객실관리, 직원관리 등<br>
              호텔 관리 기능은 PC 관리자에서 이용해주세요.
            </p>


            <div
              style="
                margin-top:26px;
                padding:18px;
                border-radius:12px;
                background:#f7f9fc;
                text-align:left;
                line-height:1.8;
                font-size:14px;
                color:#475467;
              "
            >
              <strong
                style="
                  display:block;
                  margin-bottom:5px;
                  color:#172033;
                "
              >
                직원 모바일 사용방법
              </strong>

              PC 관리자 → 직원관리에서 직원 계정을 등록한 후,
              직원별 아이디로 모바일에 로그인하면 객실 주문을
              접수하고 처리할 수 있습니다.
            </div>


            <button
              id="hotel-admin-open-pc"
              type="button"
              style="
                width:100%;
                margin-top:24px;
                padding:15px;
                border:0;
                border-radius:10px;
                background:#174981;
                color:#ffffff;
                font-size:15px;
                font-weight:800;
                cursor:pointer;
              "
            >
              PC 관리자 페이지 열기
            </button>


            <button
              id="hotel-admin-other-login"
              type="button"
              style="
                width:100%;
                margin-top:10px;
                padding:15px;
                border:1px solid #d0d7e2;
                border-radius:10px;
                background:#ffffff;
                color:#172033;
                font-size:15px;
                font-weight:800;
                cursor:pointer;
              "
            >
              다른 계정으로 로그인
            </button>

          </section>

        </main>

      </div>
    `,document.querySelector(`#hotel-admin-open-pc`)?.addEventListener(`click`,()=>{location.href=`/merchant-admin`});let e=async()=>{try{await v()}catch(e){console.error(`로그아웃 인증정보 삭제 실패:`,e),alert(`인증정보 삭제에 실패했습니다. 다시 시도해 주세요.`);return}P(),N.forEach(e=>{sessionStorage.removeItem(e),localStorage.removeItem(e)}),location.replace(`/merchant-app`)};document.querySelector(`#hotel-admin-other-login`)?.addEventListener(`click`,e),document.querySelector(`#hotel-admin-mobile-logout`)?.addEventListener(`click`,e);return}if(O.innerHTML=`
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

                ${r||l?`
              <section class="merchant-mobile-welcome merchant-mobile-qr-welcome">

                <div class="merchant-mobile-qr-guide">

                  <div class="merchant-mobile-qr-guide-title">
                    휴대폰으로<br>
                    촬영 해주세요.
                  </div>

                  <div class="merchant-mobile-qr-guide-type">
                    (${n})
                  </div>

                </div>

                <div
                  id="merchant-home-qr"
                  class="merchant-home-qr"
                ></div>

              </section>
           `:l?``:`
      <section class="merchant-mobile-welcome">

                <div class="merchant-mobile-welcome-label">
                  가맹점 모바일
                </div>

                <h1>
                  ${t}
                </h1>

                <div class="merchant-mobile-type">
                  ${n}
                </div>

              </section>
            `}


                <section class="merchant-mobile-menu">
          ${u}
        </section>

        <section
  style="
    margin-top:16px;
  "
>
  <button
    id="merchant-mobile-password-open"
    type="button"
    style="
      width:100%;
      height:50px;
      border:1px solid #d7e0eb;
      border-radius:12px;
      background:#ffffff;
      color:#172033;
      font-size:15px;
      font-weight:800;
      cursor:pointer;
    "
  >
    🔒 비밀번호 변경
  </button>
</section>

      </main>

    </div>
  `,r||l){let t=document.querySelector(`#merchant-home-qr`),n=`https://nxgsoft.co.kr/pay/?merchant_id=`+e;t&&h.toCanvas(n,{width:500,margin:1},(e,n)=>{if(e){console.error(`홈 QR 생성 실패`,e);return}n.className=`merchant-home-qr-canvas`,t.replaceChildren(n)})}document.querySelector(`#merchant-mobile-logout`)?.addEventListener(`click`,async()=>{try{await v()}catch(e){console.error(`로그아웃 인증정보 삭제 실패:`,e),alert(`인증정보 삭제에 실패했습니다. 다시 시도해 주세요.`);return}P(),N.forEach(e=>{sessionStorage.removeItem(e),localStorage.removeItem(e)}),location.replace(`/merchant-app`)}),document.querySelector(`#merchant-mobile-password-open`)?.addEventListener(`click`,()=>{document.querySelector(`#merchant-mobile-password-modal`)?.remove(),document.body.insertAdjacentHTML(`beforeend`,`
          <div
            id="merchant-mobile-password-modal"
            style="
              position:fixed;
              inset:0;
              z-index:99999;
              display:flex;
              align-items:center;
              justify-content:center;
              padding:20px;
              background:rgba(0,0,0,0.45);
              box-sizing:border-box;
            "
          >

            <div
              style="
                width:100%;
                max-width:420px;
                padding:24px;
                border-radius:16px;
                background:#ffffff;
                box-sizing:border-box;
              "
            >

              <h2
                style="
                  margin:0 0 22px;
                  font-size:21px;
                "
              >
                🔒 비밀번호 변경
              </h2>


              <label
                style="
                  display:block;
                  margin-bottom:7px;
                  font-weight:700;
                "
              >
                현재 비밀번호
              </label>

              <input
                id="merchant-mobile-current-password"
                type="password"
                autocomplete="current-password"
                style="
                  width:100%;
                  height:46px;
                  padding:0 12px;
                  margin-bottom:16px;
                  border:1px solid #d7e0eb;
                  border-radius:10px;
                  box-sizing:border-box;
                "
              >


              <label
                style="
                  display:block;
                  margin-bottom:7px;
                  font-weight:700;
                "
              >
                새 비밀번호
              </label>

              <input
                id="merchant-mobile-new-password"
                type="password"
                autocomplete="new-password"
                placeholder="영문/숫자 포함 8자리 이상"
                style="
                  width:100%;
                  height:46px;
                  padding:0 12px;
                  margin-bottom:16px;
                  border:1px solid #d7e0eb;
                  border-radius:10px;
                  box-sizing:border-box;
                "
              >


              <label
                style="
                  display:block;
                  margin-bottom:7px;
                  font-weight:700;
                "
              >
                새 비밀번호 확인
              </label>

              <input
                id="merchant-mobile-new-password-confirm"
                type="password"
                autocomplete="new-password"
                style="
                  width:100%;
                  height:46px;
                  padding:0 12px;
                  margin-bottom:20px;
                  border:1px solid #d7e0eb;
                  border-radius:10px;
                  box-sizing:border-box;
                "
              >


              <div
                style="
                  display:grid;
                  grid-template-columns:1fr 1fr;
                  gap:8px;
                "
              >

                <button
                  id="merchant-mobile-password-save"
                  type="button"
                  style="
                    height:46px;
                    border:0;
                    border-radius:10px;
                    background:#174981;
                    color:#ffffff;
                    font-weight:800;
                    cursor:pointer;
                  "
                >
                  변경
                </button>


                <button
                  id="merchant-mobile-password-cancel"
                  type="button"
                  style="
                    height:46px;
                    border:1px solid #d7e0eb;
                    border-radius:10px;
                    background:#ffffff;
                    font-weight:800;
                    cursor:pointer;
                  "
                >
                  취소
                </button>

              </div>

            </div>

          </div>
        `),document.querySelector(`#merchant-mobile-password-cancel`)?.addEventListener(`click`,()=>{document.querySelector(`#merchant-mobile-password-modal`)?.remove()}),document.querySelector(`#merchant-mobile-password-save`)?.addEventListener(`click`,async()=>{let e=(document.querySelector(`#merchant-mobile-current-password`)?.value||``).trim(),t=(document.querySelector(`#merchant-mobile-new-password`)?.value||``).trim(),n=(document.querySelector(`#merchant-mobile-new-password-confirm`)?.value||``).trim();if(!e||!t||!n){alert(`비밀번호를 모두 입력해주세요.`);return}if(t.length<8){alert(`새 비밀번호는 8자리 이상 입력해주세요.`);return}if(!/[A-Za-z]/.test(t)||!/[0-9]/.test(t)){alert(`새 비밀번호는 영문과 숫자를 모두 포함해주세요.`);return}if(t!==n){alert(`새 비밀번호 확인이 일치하지 않습니다.`);return}if(e===t){alert(`현재 비밀번호와 다른 비밀번호를 입력해주세요.`);return}let r=await fetch(`/api/merchant-password-change`,{method:`POST`,credentials:`include`,headers:{"Content-Type":`application/json`},body:JSON.stringify({currentPassword:e,newPassword:t})}),i=await r.json();if(!r.ok||!i?.success){alert(i?.message||`비밀번호 변경에 실패했습니다.`);return}alert(`비밀번호가 변경되었습니다.`),document.querySelector(`#merchant-mobile-password-modal`)?.remove()})}),document.querySelector(`.merchant-mobile-menu`)?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-menu]`);if(!t)return;let n={"manual-payment":`/merchant-app/card/manual`,"sms-payment":`/merchant-app/card/sms`,"cash-receipt":`/merchant-app/card/cash`,"cash-history":`/merchant-app/card/cash-history`,orders:`/merchant-app/orders`,products:`/merchant-app/products`,tables:`/merchant-app/tables`,qr:`/merchant-app/qr`,card:`/merchant-app/card`,members:`/merchant-members`,billings:`/merchant-billings`,"academy-card":`/merchant-batch`,"academy-payments":`/merchant-academy-payments`,"beauty-orders":`/merchant-app/beauty/orders`,"beauty-staff":`/merchant-app/beauty/staff`,"beauty-products":`/merchant-app/beauty/products`,"beauty-hours":`/merchant-app/beauty/hours`,"hotel-orders":`/merchant-app/hotel/orders`,"hotel-products":`/merchant-app/hotel/products`,"hotel-rooms":`/merchant-app/hotel/rooms`,"hotel-preview":`/merchant-app/hotel/preview`}[t.dataset.menu||``];n&&(location.href=n)})}var L=null;async function R(){L!==null&&(window.clearInterval(L),L=null);let e=sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`);if(!e){location.replace(`/merchant-app`);return}let t=Number(e),n=(sessionStorage.getItem(`login_merchant_type`)||localStorage.getItem(`login_merchant_type`)||``)===`테이블오더`,r=sessionStorage.getItem(`login_merchant_name`)||localStorage.getItem(`login_merchant_name`)||`가맹점`,i=new URLSearchParams(location.search),a=e=>new Intl.DateTimeFormat(`en-CA`,{timeZone:`Asia/Seoul`,year:`numeric`,month:`2-digit`,day:`2-digit`}).format(e),o=a(new Date),s=i.get(`start`)||o,c=i.get(`end`)||o,l=new Date(s+`T00:00:00+09:00`).toISOString(),u=new Date(c+`T23:59:59.999+09:00`).toISOString();O.innerHTML=`
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
      value="${s}"
    >
  </div>

  <div>
    <label>종료일</label>

    <input
      id="mobile-order-end-date"
      type="date"
      value="${c}"
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
    `;let d=`nxg_table_order_voice_`+t;if(n){let e=document.querySelector(`.merchant-mobile-page-title`),t=document.createElement(`button`);t.type=`button`,t.id=`table-order-voice-toggle`,t.style.cssText=`
  width:100%;
  padding:14px;
  margin:8px 0 14px;
  border:1px solid #d7e0eb;
  border-radius:12px;
  background:#174981;
  color:#ffffff;
  font-size:16px;
  font-weight:800;
  cursor:pointer;
`;let n=()=>{t.textContent=localStorage.getItem(d)===`1`?`🔔 새 주문 음성 알림 ON`:`🔕 새 주문 음성 알림 OFF`};n(),t.addEventListener(`click`,async()=>{let e=localStorage.getItem(d)!==`1`;if(localStorage.setItem(d,e?`1`:`0`),n(),e)try{await S(`주문 음성 알림이 켜졌습니다.`)}catch(e){console.error(`Voice toggle TTS failed:`,e),alert(`음성 안내를 재생할 수 없습니다.`)}else `speechSynthesis`in window&&window.speechSynthesis.cancel()}),e?.insertAdjacentElement(`afterend`,t)}document.querySelector(`#mobile-order-home`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/home`});let f=e=>{let t=new Date(s+`T00:00:00+09:00`),n=new Date(c+`T00:00:00+09:00`);t.setDate(t.getDate()+e),n.setDate(n.getDate()+e),location.href=`/merchant-app/orders?start=`+a(t)+`&end=`+a(n)};document.querySelector(`#mobile-order-prev`)?.addEventListener(`click`,()=>{f(-1)}),document.querySelector(`#mobile-order-today`)?.addEventListener(`click`,()=>{let e=a(new Date);location.href=`/merchant-app/orders?start=`+e+`&end=`+e}),document.querySelector(`#mobile-order-next`)?.addEventListener(`click`,()=>{f(1)}),document.querySelector(`#mobile-order-month`)?.addEventListener(`click`,()=>{let e=a(new Date),t=e.slice(0,7)+`-01`;location.href=`/merchant-app/orders?start=`+t+`&end=`+e});let p=()=>{let e=document.querySelector(`#mobile-order-start-date`),t=document.querySelector(`#mobile-order-end-date`),n=e?.value||``,r=t?.value||``;!n||!r||n>r||(location.href=`/merchant-app/orders?start=`+n+`&end=`+r)};document.querySelector(`#mobile-order-start-date`)?.addEventListener(`change`,p),document.querySelector(`#mobile-order-end-date`)?.addEventListener(`change`,p);let[m,h,g,v,y]=await Promise.all([C.from(`orders`).select(`*`).eq(`merchant_id`,t).gte(`created_at`,l).lte(`created_at`,u).order(`created_at`,{ascending:!1}),C.from(`merchants`).select(`
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
                korpay_mid,
                settlement_cycle
              `).eq(`id`,t).maybeSingle(),C.from(`payments`).select(`
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
              `).eq(`merchant_id`,t).gte(`created_at`,l).lte(`created_at`,u),C.from(`payments`).select(`
                settlement_amount,
                approved_at,
                created_at,
                status,
                payout_status
              `).eq(`merchant_id`,t),C.from(`holidays`).select(`holiday_date`)]),b=document.querySelector(`#mobile-order-list`),w=document.querySelector(`#mobile-order-summary`);if(!b||!w)return;if(m.error){w.textContent=`주문 조회 실패`,b.innerHTML=`
        <div class="merchant-mobile-order-empty">
          ${m.error.message}
        </div>
      `;return}let T=m.data||[],E=i.get(`status`)||`전체`,D=Math.max(1,Number(i.get(`page`)||1)),k=Math.max(1,Number(i.get(`size`)||10)),A=e=>e.cancel_status===`취소요청`?`취소요청`:e.order_status===`취소완료`||e.cancel_status===`취소완료`?`취소완료`:e.order_status===`완료`?`완료`:`접수`,j=E===`전체`?T:T.filter(e=>A(e)===E),M=sessionStorage.getItem(`login_merchant_type`)||localStorage.getItem(`login_merchant_type`)||``,N=M===`일반매장`||M===`테이블오더`?[...j].sort((e,t)=>{let n=[`완료`,`취소완료`].includes(A(e)),r=[`완료`,`취소완료`].includes(A(t));return n===r?new Date(e.created_at).getTime()-new Date(t.created_at).getTime()||Number(e.id)-Number(t.id):Number(n)-Number(r)}):j,P=Math.max(1,Math.ceil(N.length/k)),F=Math.min(D,P),I=N.slice((F-1)*k,F*k),z=h.data,{data:B}=await C.from(`holidays`).select(`holiday_date`),V=new Set((B||[]).map(e=>String(e.holiday_date))),H=s===c&&V.has(s),U=g.data||[],W=U.filter(e=>e.status===`paid`).reduce((e,t)=>e+Number(t.amount||0),0),ee=String(h.data?.settlement_cycle||`1일`),te=new Set((y.data||[]).map(e=>String(e.holiday_date))),G=e=>{let t=new Date(e),n=ee.match(/\d+/),r=n?Number(n[0]):1,i=0;for(;i<r;){t.setDate(t.getDate()+1);let e=a(t),n=new Date(e+`T12:00:00+09:00`).getDay(),r=n===0||n===6,o=te.has(e);r||o||(i+=1)}return a(t)},K=(v.data||[]).filter(e=>{if(e.status!==`paid`)return!1;let t=e.approved_at||e.created_at;if(!t)return!1;let n=G(t);return n>=s&&n<=c}),q=K.reduce((e,t)=>e+Number(t.settlement_amount||0),0),J=K.map(e=>{let t=e.approved_at||e.created_at;return t?a(new Date(t)):``}).filter(Boolean).sort(),Y=``;if(J.length>0){let e=J[0],t=J[J.length-1],n=e=>{let[t,n,r]=e.split(`-`);return t.slice(2)+`.`+n+`.`+r};Y=e===t?n(e):n(e)+`~`+n(t)}let X=T.filter(e=>e.order_status===`접수`&&e.cancel_status!==`취소요청`).length,Z=T.filter(e=>e.order_status===`완료`&&e.cancel_status!==`취소요청`).length,ne=T.length>0?Math.floor(W/T.length):0;w.innerHTML=`

  <div class="beauty-mobile-order-summary-grid">

    <div>
      <strong>
        주문수
      </strong>

      <span>
        ${T.length}건
      </span>
    </div>


    <div>
      <strong>
        접수
      </strong>

      <span>
        ${X}건
      </span>
    </div>


    <div>
      <strong>
        완료
      </strong>

      <span>
        ${Z}건
      </span>
    </div>


    <div>
      <strong>
        매출합계
      </strong>

      <span>
        ${W.toLocaleString()}원
      </span>
    </div>


    <div>
      <strong>
        평균객단가
      </strong>

      <span>
        ${ne.toLocaleString()}원
      </span>
    </div>


    <div>
  <strong>
    정산예정금액
  </strong>

  <span>
    ${q.toLocaleString()}원
  </span>

  <small
  class="beauty-mobile-settlement-wait"
  style="${H?`color:#d93025;font-weight:700;`:``}"
>
  ${H?`공휴일`:`대기`}
</small>

  ${K.length>0?`
        <em>
          정산대상 ${K.length.toLocaleString()}건${Y?` · `+Y+` 결제건`:``}
        </em>
      `:``}
</div>

  </div>
`,N.length===0&&(b.innerHTML=`
      <div class="merchant-mobile-order-empty">
        주문내역이 없습니다.
      </div>
    `),I.forEach((e,i)=>{let a=e.order_no?.split(`-`)[1]||e.order_no||i+1,o=Array.isArray(e.items)?e.items.map(e=>(e.name||e.product_name||`-`)+` x `+Number(e.quantity||1)).join(`, `):`-`,s=(n||(sessionStorage.getItem(`login_merchant_type`)||localStorage.getItem(`login_merchant_type`))===`일반매장`)&&Array.isArray(e.items)?e.items.map((t,n)=>{let r=(Array.isArray(e.served_item_indices)?e.served_item_indices:[]).includes(n),i=String(t.name||t.product_name||`-`).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`);return`
          <span
            class="merchant-served-item"
            data-item-index="${n}"
            style="
              cursor:pointer;
              text-decoration:${r?`line-through`:`none`};
              color:${r?`#9ca3af`:`inherit`};
            "
          >${i} x ${Number(t.quantity||1)}</span>
        `}).join(`, `):o,c=U.find(t=>{let n=String(t.order_id||``).replace(/[^a-zA-Z0-9]/g,``),r=String(e.pg_order_id||``).replace(/[^a-zA-Z0-9]/g,``),i=n&&r&&n===r,a=e.payment_key&&t.payment_key&&String(e.payment_key)===String(t.payment_key);return!!(i||a)}),l=A(e),u=document.createElement(`div`);u.className=`merchant-mobile-order-card`,u.innerHTML=`
  
          <div class="merchant-mobile-order-card-top">
  
            <button
  type="button"
  class="merchant-mobile-receipt-button"
  data-order-id="${e.id}"
>
${n?e.table_number?`TABLE `+e.table_number:`테이블번호 미확인`:`${a}번`}
  <span
    style="
      margin-left:8px;
      font-size:13px;
      font-weight:700;
      color:#6b7280;
    "
  >
    &lt;&lt; 영수증
  </span>
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

  <span
    style="
      margin-left:8px;
      font-size:13px;
      font-weight:700;
      color:#d93025;
    "
  >
    &lt;&lt; 결제취소
  </span>
</button>
  
  
          <div class="merchant-mobile-order-items">

  ${s}

</div>
  
  
          <div class="merchant-mobile-order-bottom">
  
           <span
  class="merchant-mobile-order-status"
  data-status="${l}"
>
  ${l}
</span>
  
  
${l===`취소완료`?``:n?l===`완료`?``:`
              <button
                type="button"
                class="merchant-mobile-table-complete"
                data-id="${e.id}"
              >
                완료처리
              </button>
            `:`
          <button
            type="button"
            class="merchant-mobile-call-button"
            data-id="${e.id}"
            data-number="${a}"
          >
            ${l===`완료`?`재호출`:`고객호출`}
          </button>
        `}
  
          </div>
        `,b.appendChild(u);let d=!1;u.querySelectorAll(`.merchant-served-item`).forEach(n=>{n.addEventListener(`click`,async()=>{if(d)return;let r=Number(n.dataset.itemIndex);if(!Number.isInteger(r))return;let i=Array.isArray(e.served_item_indices)?[...e.served_item_indices]:[],a=i.includes(r)?i.filter(e=>e!==r):[...i,r];d=!0;let{data:o,error:s}=await C.from(`orders`).update({served_item_indices:a}).eq(`id`,e.id).eq(`merchant_id`,t).select(`id`);if(d=!1,s||!o?.length){alert(`상품 제공 상태 저장 실패: `+(s?.message||`저장 권한을 확인해주세요.`));return}e.served_item_indices=a;let c=a.includes(r);n.style.textDecoration=c?`line-through`:`none`,n.style.color=c?`#9ca3af`:`inherit`})}),u.querySelector(`.merchant-mobile-cancel-open`)?.addEventListener(`click`,()=>{document.querySelector(`#merchant-mobile-cancel-modal`)?.remove(),document.body.insertAdjacentHTML(`beforeend`,`
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
                  ${a}번
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
        `),document.querySelector(`#merchant-mobile-close-cancel`)?.addEventListener(`click`,()=>{document.querySelector(`#merchant-mobile-cancel-modal`)?.remove()}),document.querySelector(`#merchant-mobile-direct-cancel`)?.addEventListener(`click`,async()=>{let e=document.querySelector(`#merchant-mobile-cancel-modal`);if(!e)return;let t=Number(e.dataset.paymentId||0),n=Number(e.dataset.orderId||0),i=(document.querySelector(`#merchant-mobile-cancel-password`)?.value||``).trim(),a=(document.querySelector(`#merchant-mobile-cancel-reason`)?.value||``).trim();if(!t){alert(`취소할 결제정보를 찾을 수 없습니다.`);return}if(i!==`1234`){alert(`취소 비밀번호가 일치하지 않습니다.`);return}if(!a){alert(`취소 사유를 입력해주세요.`);return}let{data:o,error:s}=await C.from(`payments`).select(`
                  id,
                  pg_company,
                  payment_key,
                  status
                `).eq(`id`,t).single();if(s||!o){alert(`결제정보를 불러오지 못했습니다.`);return}if(o.status===`cancel`){alert(`이미 취소된 결제입니다.`);return}let c=document.querySelector(`#merchant-mobile-direct-cancel`);c&&(c.disabled=!0,c.textContent=`취소 중...`);try{if(o.pg_company===`코페이`){let e=await fetch(_(`/api/korpay-cancel`),{method:`POST`,credentials:`include`,headers:{...await x(),"Content-Type":`application/json`},body:JSON.stringify({paymentId:o.id,cancelName:r,cancelMessage:a})}),t=await e.json();if(!e.ok||!t.success){alert(`코페이 실제 취소에 실패했습니다.

`+(t.message||`알 수 없는 오류`));return}}else if(o.pg_company===`토스페이먼츠`){if(!o.payment_key){alert(`토스 paymentKey가 없습니다.`);return}let e=await fetch(_(`/api/toss-cancel`),{method:`POST`,credentials:`include`,headers:{...await x(),"Content-Type":`application/json`},body:JSON.stringify({paymentKey:o.payment_key,cancelReason:a})}),t=await e.json();if(!e.ok||!t.success){alert(`토스 실제 취소에 실패했습니다.

`+(t.message||`알 수 없는 오류`));return}}else{alert(`직접 취소를 지원하지 않는 PG사입니다.
PG사: `+(o.pg_company||`-`));return}let{error:e}=await C.from(`orders`).update({order_status:`취소완료`,cancel_status:`취소완료`,cancel_reason:a,cancel_requested_at:new Date().toISOString()}).eq(`id`,n);if(e){alert(`결제 취소는 성공했지만 주문상태 변경에 실패했습니다.
`+e.message);return}alert(`결제가 취소되었습니다.`),location.reload()}catch(e){console.error(e),alert(e instanceof Error?`앱 취소 오류: `+e.message:`앱 취소 오류: `+String(e))}finally{c&&(c.disabled=!1,c.textContent=`직접 취소`)}}),document.querySelector(`#merchant-mobile-request-cancel`)?.addEventListener(`click`,async()=>{let e=document.querySelector(`#merchant-mobile-cancel-modal`);if(!e)return;let t=Number(e.dataset.paymentId||0),n=Number(e.dataset.orderId||0),r=(document.querySelector(`#merchant-mobile-cancel-reason`)?.value||``).trim();if(!t){alert(`취소할 결제정보를 찾을 수 없습니다.`);return}if(!r){alert(`취소 사유를 입력해주세요.`);return}let i=document.querySelector(`#merchant-mobile-request-cancel`);i&&(i.disabled=!0,i.textContent=`요청 처리 중...`);try{let{data:e,error:i}=await C.from(`payments`).select(`
              id,
              merchant_id,
              merchant_name,
              amount,
              settlement_amount,
              manager_admin_id,
              manager_admin_name,
              status
            `).eq(`id`,t).single();if(i||!e){alert(`결제정보를 불러오지 못했습니다.`);return}if(e.status===`cancel`){alert(`이미 취소된 결제입니다.`);return}let{data:a}=await C.from(`cancel_requests`).select(`id`).eq(`payment_id`,t).eq(`status`,`요청중`).maybeSingle();if(a){alert(`이미 본사 승인요청이 접수된 거래입니다.`);return}let{error:o}=await C.from(`cancel_requests`).insert({payment_id:t,merchant_id:Number(e.merchant_id),manager_admin_id:e.manager_admin_id||null,manager_admin_name:e.manager_admin_name||null,reason:r,status:`요청중`});if(o){alert(`본사 승인요청 저장에 실패했습니다.
`+o.message);return}let{error:s}=await C.from(`payments`).update({payout_hold:!0,payout_hold_reason:`익일 취소 본사 승인요청: `+r,payout_hold_at:new Date().toISOString(),payout_status:`지급정지`}).eq(`id`,t);if(s){alert(`취소요청은 접수됐지만 지급정지 처리에 실패했습니다.
`+s.message);return}let{error:c}=await C.from(`orders`).update({cancel_status:`취소요청`,cancel_reason:r,cancel_requested_at:new Date().toISOString()}).eq(`id`,n);if(c){alert(`본사 승인요청은 접수됐지만 주문상태 변경에 실패했습니다.
`+c.message);return}alert(`본사 승인요청이 접수되었습니다.`),location.reload()}catch(e){console.error(e),alert(`본사 승인요청 중 오류가 발생했습니다.`)}finally{i&&(i.disabled=!1,i.textContent=`본사 승인요청`)}})}),u.querySelector(`.merchant-mobile-receipt-button`)?.addEventListener(`click`,()=>{let t=c?.approved_at||c?.created_at||e.created_at,n=c?.approval_number||`-`,i=c?.card_number||`-`,s=c?.card_company||`신용카드`,l=c?.pg_company||`-`,u=e.cancel_status===`취소완료`||e.order_status===`취소완료`||c?.status===`cancel`,d=c?.canceled_at||e.cancel_requested_at||``,f=Number(e.total_amount||0),p=Math.floor(f*10/11),m=f-p;document.querySelector(`#merchant-mobile-receipt-modal`)?.remove(),document.body.insertAdjacentHTML(`beforeend`,`
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
                ${u?`(취소)`:`(승인)`}
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
                  ${s}
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>카드번호</span>
                <strong>
                  ${i}
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>승인번호</span>
                <strong>
                  ${n}
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>PG사</span>
                <strong>
                  ${l}
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

              ${u?`
                    <div
                      class="merchant-mobile-receipt-row"
                    >
                      <span>취소일시</span>

                      <strong>
                        ${d?new Date(d).toLocaleString(`ko-KR`):`-`}
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
                  ${a}번
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
                  ${p.toLocaleString()}원
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>부가세</span>
                <strong>
                  ${m.toLocaleString()}원
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-total"
              >
                <span>
                  총 결제금액
                </span>

                <strong>
                  ${u?`-`:``}${f.toLocaleString()}원
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
                  ${z?.merchant_name||r}
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>대표자</span>
                <strong>
                  ${z?.owner_name||`-`}
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>사업자번호</span>
                <strong>
                  ${z?.business_number||z?.corporate_number||`-`}
                </strong>
              </div>

              <div
                class="merchant-mobile-receipt-row"
              >
                <span>문의</span>
                <strong>
                  ${z?.phone||`-`}
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
상점명: `+(z?.merchant_name||r)+`
주문번호: `+a+`번
승인번호: `+n+`
상품: `+o+`
결제금액: `+f.toLocaleString()+`원`;if(navigator.share){await navigator.share({title:`NXG PICK 영수증`,text:e});return}await navigator.clipboard.writeText(e),alert(`영수증 내용이 복사되었습니다.`)})})});let Q=e=>{let t=new URLSearchParams(location.search);Object.entries(e).forEach(([e,n])=>{t.set(e,n)});let n=`/merchant-app/orders?`+t.toString();window.history.replaceState(null,``,n),R()};document.querySelectorAll(`.merchant-mobile-order-filter button`).forEach(e=>{(e.dataset.status||`전체`)===E&&e.classList.add(`active`),e.addEventListener(`click`,e=>{let t=e.currentTarget;Q({status:t.dataset.status||`전체`,page:`1`})})});let $=document.querySelector(`#mobile-order-pagination`);if($&&($.innerHTML=`
      
          <select
            id="mobile-order-page-size"
          >
      
            <option
              value="10"
              ${k===10?`selected`:``}
            >
              10개씩 보기
            </option>
      
            <option
              value="20"
              ${k===20?`selected`:``}
            >
              20개씩 보기
            </option>
      
            <option
              value="30"
              ${k===30?`selected`:``}
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
              ${F<=1?`disabled`:``}
            >
              이전
            </button>
      
      
            <strong>
              ${F} / ${P}
            </strong>
      
      
            <button
              id="mobile-order-page-next"
              type="button"
              ${F>=P?`disabled`:``}
            >
              다음
            </button>
      
          </div>
        `,document.querySelector(`#mobile-order-page-size`)?.addEventListener(`change`,e=>{Q({size:e.target.value,page:`1`})}),document.querySelector(`#mobile-order-page-prev`)?.addEventListener(`click`,()=>{F<=1||Q({page:String(F-1)})}),document.querySelector(`#mobile-order-page-next`)?.addEventListener(`click`,()=>{F>=P||Q({page:String(F+1)})})),document.querySelectorAll(`.merchant-mobile-table-complete`).forEach(e=>{e.addEventListener(`click`,async()=>{let n=Number(e.dataset.id);if(!n||!confirm(`주문을 완료처리 하시겠습니까?`))return;e.disabled=!0;let{data:r,error:i}=await C.from(`orders`).update({order_status:`완료`}).eq(`id`,n).eq(`merchant_id`,t).select(`id`);if(i||!r?.length){alert(`완료처리 실패: `+(i?.message||`변경된 주문이 없습니다.`)),e.disabled=!1;return}let a=e.closest(`.merchant-mobile-order-card`)?.querySelector(`.merchant-mobile-order-status`);a&&(a.textContent=`완료`,a.setAttribute(`data-status`,`완료`)),e.remove(),R()})}),document.querySelectorAll(`.merchant-mobile-call-button`).forEach(e=>{e.addEventListener(`click`,async()=>{if(z?.voice_enabled!==!0){alert(`음성 호출 사용이 꺼져 있습니다.
PC 매장 설정에서 음성 호출 사용을 확인해주세요.`);return}let t=e.dataset.number||`0`,n=Number(e.dataset.id),r=(e=>{let t=Number(e);if(!Number.isSafeInteger(t)||t<1||t>9999)return e;let n=[``,`일`,`이`,`삼`,`사`,`오`,`육`,`칠`,`팔`,`구`],r=[``,`십`,`백`,`천`],i=String(t),a=``;for(let e=0;e<i.length;e++){let t=Number(i[e]),o=i.length-e-1;t!==0&&(a+=(t===1&&o>0?``:n[t])+r[o])}return a})(t)+` 번 고객님 `+(z?.call_message||`주문이 준비되었습니다.`);try{await S(r)}catch(e){console.error(`Customer TTS failed:`,e),alert(`고객호출 음성 출력에 실패했습니다.`);return}let{error:i}=await C.from(`orders`).update({order_status:`완료`,last_called_at:new Date().toISOString(),customer_acknowledged_at:null}).eq(`id`,n);if(i){alert(`주문상태 변경 실패: `+i.message);return}e.textContent=`호출완료`;let a=e.closest(`.merchant-mobile-order-card`)?.querySelector(`.merchant-mobile-order-status`);a&&(a.textContent=`완료`),M===`일반매장`&&R()})}),n||M===`일반매장`){let e=Math.max(0,...T.map(e=>Number(e.id)||0)),r=JSON.stringify(T.map(e=>[e.id,e.order_status,e.cancel_status]).sort((e,t)=>Number(e[0])-Number(t[0]))),i=!1;L=window.setInterval(async()=>{if(!(document.visibilityState!==`visible`||location.pathname!==`/merchant-app/orders`||i)){i=!0;try{let{data:i,error:a}=await C.from(`orders`).select(`id,order_status,cancel_status`).eq(`merchant_id`,t).gte(`created_at`,l).lte(`created_at`,u).order(`id`,{ascending:!1});if(a){console.error(`신규 주문 확인 실패:`,a);return}let o=Number(i?.[0]?.id||0),s=JSON.stringify((i||[]).map(e=>[e.id,e.order_status,e.cancel_status]).sort((e,t)=>Number(e[0])-Number(t[0]))),c=o>e;if(s!==r){r=s,e=o,await R();let t=n?localStorage.getItem(d)===`1`:z?.voice_enabled===!0;if(c&&t)try{await S(`새 주문이 접수되었습니다.`)}catch(e){console.error(`New order TTS failed:`,e)}}}catch(e){console.error(`주문 자동갱신 오류:`,e)}finally{i=!1}}},5e3)}}async function z(){let e=sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`);if(!e){location.replace(`/merchant-app`);return}let t=Number(e),n=sessionStorage.getItem(`login_merchant_name`)||localStorage.getItem(`login_merchant_name`)||`가맹점`,r=new URLSearchParams(location.search),i=e=>new Intl.DateTimeFormat(`en-CA`,{timeZone:`Asia/Seoul`,year:`numeric`,month:`2-digit`,day:`2-digit`}).format(e),a=i(new Date),o=r.get(`start`)||a,s=r.get(`end`)||a,c=(r.get(`view`)||`schedule`)===`sales`;O.innerHTML=`
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
      value="${o}"
    >
  </div>

  <div>
    <label>종료일</label>

    <input
      id="beauty-mobile-order-end"
      type="date"
      value="${s}"
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
            class="${c?``:`active`}"
          >
            예약 스케줄
          </button>

          <button
            id="beauty-mobile-sales-view"
            type="button"
            class="${c?`active`:``}"
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
  `,document.querySelector(`#beauty-mobile-order-home`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/home`}),document.querySelector(`#beauty-mobile-schedule-view`)?.addEventListener(`click`,()=>{let e=new URLSearchParams(window.location.search);e.delete(`view`);let t=e.toString();location.href=`/merchant-app/beauty/orders`+(t?`?`+t:``)}),document.querySelector(`#beauty-mobile-sales-view`)?.addEventListener(`click`,()=>{let e=new URLSearchParams(window.location.search);e.set(`view`,`sales`),location.href=`/merchant-app/beauty/orders?`+e.toString()});let l=e=>{let t=new Date(o+`T00:00:00+09:00`),n=new Date(s+`T00:00:00+09:00`);t.setDate(t.getDate()+e),n.setDate(n.getDate()+e);let r=new URLSearchParams(window.location.search);r.set(`start`,i(t)),r.set(`end`,i(n)),location.href=`/merchant-app/beauty/orders?`+r.toString()};document.querySelector(`#beauty-mobile-order-date-prev`)?.addEventListener(`click`,()=>{l(-1)}),document.querySelector(`#beauty-mobile-order-date-today`)?.addEventListener(`click`,()=>{let e=new URLSearchParams(window.location.search);e.set(`start`,a),e.set(`end`,a),location.href=`/merchant-app/beauty/orders?`+e.toString()}),document.querySelector(`#beauty-mobile-order-date-next`)?.addEventListener(`click`,()=>{l(1)}),document.querySelector(`#beauty-mobile-order-date-month`)?.addEventListener(`click`,()=>{let e=a.slice(0,7)+`-01`,t=new URLSearchParams(window.location.search);t.set(`start`,e),t.set(`end`,a),location.href=`/merchant-app/beauty/orders?`+t.toString()}),document.querySelector(`#beauty-mobile-order-date-search`)?.addEventListener(`click`,()=>{let e=document.querySelector(`#beauty-mobile-order-start`)?.value||``,t=document.querySelector(`#beauty-mobile-order-end`)?.value||``;if(!e||!t)return;if(e>t){alert(`시작일이 종료일보다 늦을 수 없습니다.`);return}let n=new URLSearchParams(window.location.search);n.set(`start`,e),n.set(`end`,t),location.href=`/merchant-app/beauty/orders?`+n.toString()});let u=C.from(`orders`).select(`*`).eq(`merchant_id`,t);c&&(u=u.gte(`created_at`,o+`T00:00:00`).lte(`created_at`,s+`T23:59:59`));let{data:d,error:f}=await u.order(`created_at`,{ascending:!1}),p=document.querySelector(`#beauty-mobile-order-summary`),m=document.querySelector(`#beauty-mobile-order-list`);if(!p||!m)return;if(f){p.textContent=`주문 조회 실패`,m.innerHTML=`
      <div class="merchant-mobile-order-empty">
        ${f.message}
      </div>
    `;return}let h=o,g=s,_=c?d||[]:(d||[]).filter(e=>{let t=Array.isArray(e.items)?e.items.map(e=>e.reservation_date||``).filter(e=>!!e):[];return(t.length>0?t:[e.reservation_date||``]).some(e=>e>=h&&e<=g)}),v=_.filter(e=>e.order_status!==`완료`),y=_.filter(e=>e.order_status===`완료`),b=_.reduce((e,t)=>e+Number(t.total_amount||0),0),x=_.length>0?Math.floor(b/_.length):0,{data:S,error:w}=await C.from(`merchants`).select(`settlement_cycle`).eq(`id`,t).single();w&&console.error(`정산주기 조회 실패:`,w);let T=String(S?.settlement_cycle||`1일`),{data:E,error:D}=await C.from(`holidays`).select(`holiday_date`);D&&console.error(`공휴일 조회 실패:`,D);let k=new Set((E||[]).map(e=>String(e.holiday_date))),A=o===s&&k.has(o),j=e=>{let t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,`0`),r=String(e.getDate()).padStart(2,`0`);return t+`-`+n+`-`+r},M=e=>{let t=new Date(e),n=T.match(/\d+/),r=n?Number(n[0]):1;if(r===0)for(;;){let e=j(t),n=t.getDay(),r=n===0||n===6,i=k.has(e);if(!r&&!i)return e;t.setDate(t.getDate()+1)}let i=0;for(;i<r;){t.setDate(t.getDate()+1);let e=j(t),n=t.getDay(),r=n===0||n===6,a=k.has(e);r||a||(i+=1)}return j(t)},{data:N,error:P}=await C.from(`payments`).select(`
            settlement_amount,
            payout_status,
            created_at,
            status
          `).eq(`merchant_id`,t);P&&console.error(`정산예정금액 조회 실패:`,P);let F=(N||[]).filter(e=>{if(e.status!==`paid`||!e.created_at)return!1;let t=M(e.created_at);return o&&s?t>=o&&t<=s:!0}),I=F.reduce((e,t)=>e+Number(t.settlement_amount||0),0),L=F.length>0&&F.every(e=>e.payout_status===`출금완료`),R=F.map(e=>e.created_at?j(new Date(e.created_at)):``).filter(Boolean).sort(),B=``;if(R.length>0){let e=R[0],t=R[R.length-1],n=e=>{let[t,n,r]=e.split(`-`);return t.slice(-2)+`.`+n+`.`+r};B=e===t?n(e):n(e)+`~`+n(t)}if(p.innerHTML=`

      <div class="beauty-mobile-order-summary-grid">
  
        <div>
          <strong>
            주문수
          </strong>
  
          <span>
            ${_.length}건
          </span>
        </div>
  
  
        <div>
          <strong>
            접수
          </strong>
  
          <span>
            ${v.length}건
          </span>
        </div>
  
  
        <div>
          <strong>
            완료
          </strong>
  
          <span>
            ${y.length}건
          </span>
        </div>
  
  
        <div>
          <strong>
            매출합계
          </strong>
  
          <span>
            ${b.toLocaleString()}원
          </span>
        </div>
  
  
        <div>
          <strong>
            평균객단가
          </strong>
  
          <span>
            ${x.toLocaleString()}원
          </span>
        </div>
  
  
        <div>
          <strong>
            정산예정금액
          </strong>
  
          <span>
            ${I.toLocaleString()}원
          </span>
  
          <small
            class="${L?`beauty-mobile-settlement-complete`:`beauty-mobile-settlement-wait`}"
          >
            ${L?`완료`:`대기`}
          </small>
  
          ${A?`
                <em
                  style="
                    color:#d93025;
                    font-weight:700;
                  "
                >
                  공휴일
                </em>
              `:F.length>0?`
                  <em>
                    정산대상 ${F.length.toLocaleString()}건${B?` · `+B+` 결제건`:``}
                  </em>
                `:``}
  
        </div>
  
      </div>
    `,_.length===0){m.innerHTML=`
      <div class="merchant-mobile-order-empty">
        예약 주문내역이 없습니다.
      </div>
    `;return}m.innerHTML=_.map((e,t)=>{let n=e.order_no?.split(`-`)[1]||e.order_no||t+1,r=Array.isArray(e.items)?Array.from(new Set(e.items.map(t=>t.reservation_date||e.reservation_date||`-`))).join(`<br>`):e.reservation_date||`-`,i=Array.isArray(e.items)?e.items.map(t=>t.reservation_time||e.reservation_time||`-`).join(`<br>`):e.reservation_time||`-`,a=Array.isArray(e.items)?e.items.map(t=>{let n=t.beauty_staff_name||(t.beauty_staff_id||e.beauty_staff_id?`직원ID `+(t.beauty_staff_id||e.beauty_staff_id):`-`);return(t.name||t.product_name||`-`)+` / `+n+` x `+Number(t.quantity||1)}).join(`<br>`):`-`,o=e.cancel_status===`취소요청`?`취소요청`:e.order_status===`취소완료`?`취소완료`:e.order_status===`완료`?`완료`:`접수`;return`
            <div
              class="merchant-mobile-order-card beauty-mobile-order-card"
              data-status="${e.order_status||`접수`}"
            >

              <div class="merchant-mobile-order-card-top">

                <strong>
                  ${n}번
                </strong>

                <span>
                  ${Number(e.total_amount||0).toLocaleString()}원
                </span>

              </div>


              <div class="beauty-mobile-order-row">

                <span>
                  예약자
                </span>

                <strong>
                  ${e.customer_name||`-`}
                </strong>

              </div>


              <div class="beauty-mobile-order-row">

                <span>
                  연락처
                </span>

                <strong>
                  ${e.customer_phone||`-`}
                </strong>

              </div>


              <div class="beauty-mobile-order-row">

                <span>
                  예약일
                </span>

                <strong>
                  ${r}
                </strong>

              </div>


              <div class="beauty-mobile-order-row">

                <span>
                  예약시간
                </span>

                <strong>
                  ${i}
                </strong>

              </div>


              <div class="beauty-mobile-order-service">

                <span>
                  서비스 / 직원
                </span>

                <strong>
                  ${a}
                </strong>

              </div>


              <div class="merchant-mobile-order-bottom">

                <span
                  class="merchant-mobile-order-status"
                  data-status="${o}"
                >
                  ${o}
                </span>


                ${e.order_status===`완료`?`
                      <strong>
                        완료
                      </strong>
                    `:`
                      <button
                        type="button"
                        class="beauty-mobile-order-complete"
                        data-id="${e.id}"
                      >
                        완료처리
                      </button>
                    `}

              </div>

            </div>
          `}).join(``),document.querySelectorAll(`.beauty-mobile-order-complete`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=Number(e.dataset.id||0);if(!t)return;let{error:n}=await C.from(`orders`).update({order_status:`완료`}).eq(`id`,t);if(n){alert(`완료 처리 실패: `+n.message);return}z()})});let V=`전체`,H=1,U=10,W=()=>{let e=Array.from(document.querySelectorAll(`.beauty-mobile-order-card`)),t=e.filter(e=>{let t=e.dataset.status||`접수`;return V===`전체`?!0:V===`준비중`?t!==`완료`:t===`완료`}),n=Math.max(1,Math.ceil(t.length/U));H=Math.min(H,n),e.forEach(e=>{e.style.display=`none`});let r=(H-1)*U;t.slice(r,r+U).forEach(e=>{e.style.display=``});let i=document.querySelector(`#beauty-mobile-order-pagination`);if(!i)return;i.innerHTML=`

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
            ${H<=1?`disabled`:``}
          >
            이전
          </button>

          <strong>
            ${H} / ${n}
          </strong>

          <button
            id="beauty-mobile-order-next"
            type="button"
            ${H>=n?`disabled`:``}
          >
            다음
          </button>

        </div>
      `;let a=document.querySelector(`#beauty-mobile-order-page-size`);a&&(a.value=String(U),a.addEventListener(`change`,()=>{U=Number(a.value),H=1,W()})),document.querySelector(`#beauty-mobile-order-prev`)?.addEventListener(`click`,()=>{H<=1||(--H,W())}),document.querySelector(`#beauty-mobile-order-next`)?.addEventListener(`click`,()=>{H>=n||(H+=1,W())})};document.querySelectorAll(`[data-beauty-status]`).forEach(e=>{e.addEventListener(`click`,()=>{V=e.dataset.beautyStatus||`전체`,H=1,document.querySelectorAll(`[data-beauty-status]`).forEach(e=>{e.classList.remove(`active`)}),e.classList.add(`active`),W()})}),document.querySelector(`[data-beauty-status="전체"]`)?.classList.add(`active`),W()}async function B(){let e=sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`);if(!e){location.replace(`/merchant-app`);return}let t=Number(e),n=sessionStorage.getItem(`login_merchant_name`)||localStorage.getItem(`login_merchant_name`)||`가맹점`,{data:r,error:i}=await C.from(`beauty_staff`).select(`*`).eq(`merchant_id`,t).order(`id`,{ascending:!1}),a=r||[],o=a.filter(e=>(e.status||`근무중`)===`근무중`).length,s=a.length-o,c=new Date,l=Number(sessionStorage.getItem(`beauty_mobile_staff_week_offset`)||`0`),u=new Date(c),d=c.getDay(),f=d===0?-6:1-d;u.setDate(c.getDate()+f+l*7),u.setHours(0,0,0,0);let p=Array.from({length:7},(e,t)=>{let n=new Date(u);return n.setDate(u.getDate()+t),{dateValue:n.getFullYear()+`-`+String(n.getMonth()+1).padStart(2,`0`)+`-`+String(n.getDate()).padStart(2,`0`),dayLabel:[`월`,`화`,`수`,`목`,`금`,`토`,`일`][t],dateLabel:String(n.getMonth()+1)+`/`+String(n.getDate())}}),m=p[0].dateLabel+` ~ `+p[6].dateLabel,h=p[0].dateValue,g=p[6].dateValue,{data:_,error:v}=await C.from(`beauty_staff_schedule`).select(`
        staff_id,
        schedule_date,
        schedule_time,
        status,
        order_id
      `).eq(`merchant_id`,t).gte(`schedule_date`,h).lte(`schedule_date`,g);v&&alert(`주간 스케줄 조회 실패: `+v.message);let y=[];for(let e=0;e<1440;e+=30){let t=String(Math.floor(e/60)).padStart(2,`0`),n=String(e%60).padStart(2,`0`);y.push(`${t}:${n}`)}let b=(e,t)=>y.every(n=>{let r=(_||[]).find(r=>Number(r.staff_id)===e&&String(r.schedule_date)===t&&String(r.schedule_time||``).slice(0,5)===n);return r?.order_id||r?.status===`예약완료`?!0:r?.status===`예약불가`});O.innerHTML=`
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
            등록 직원 ${a.length}명
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
      ${a.length}명
    </strong>
  </span>

  <span>
    근무중 :
    <strong>
      ${o}명
    </strong>
  </span>

  <span>
    근무중지 :
    <strong>
      ${s}명
    </strong>
  </span>

</div>

        <div
          id="beauty-mobile-staff-list"
          class="merchant-mobile-order-list"
        >

          ${i?`
                <div class="merchant-mobile-order-empty">
                  직원 조회 실패 :
                  ${i.message}
                </div>
              `:a.length===0?`
                  <div class="merchant-mobile-order-empty">
                    등록된 직원이 없습니다.
                  </div>
                `:a.map(e=>`

                        <div
                          class="merchant-mobile-order-card"
                        >

                          <div
                            class="merchant-mobile-order-card-top"
                          >

                            <strong>
                              ${e.staff_name||`이름 없음`}
                            </strong>

                            <span>
                              ${e.status||`근무중`}
                            </span>

                          </div>


                          ${e.photo_url?`
                                <div
                                  style="
                                    margin:12px 0;
                                    text-align:center;
                                  "
                                >
                                  <img
                                    src="${e.photo_url}"
                                    alt=""
                                    style="
                                      width:90px;
                                      height:90px;
                                      object-fit:cover;
                                      border-radius:14px;
                                    "
                                  >
                                </div>
                              `:``}


                          <div
                            class="beauty-mobile-order-row"
                          >

                            <span>
                              직원명
                            </span>

                            <strong>
                              ${e.staff_name||`-`}
                            </strong>

                          </div>


                          <div
  class="beauty-mobile-order-row"
>

  <span>
    직급
  </span>

  <strong>
    ${e.position||`-`}
  </strong>

</div>


<button
  type="button"
  class="beauty-mobile-staff-schedule"
  data-staff-id="${e.id}"
>
  스케줄관리
</button>

                        </div>

                      `).join(``)}

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
                ${m}
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

  ${p.map(e=>`

          <div
            class="beauty-mobile-staff-day"
          >

            <div
              class="beauty-mobile-staff-day-title"
            >
              <strong>
                ${e.dayLabel}
              </strong>

              <span>
                ${e.dateLabel}
              </span>
            </div>


            <div
              class="beauty-mobile-staff-day-workers"
            >

              ${a.map(t=>{let n=b(Number(t.id),e.dateValue);return`
                        <button
                          type="button"
                          class="
                            beauty-mobile-staff-day-worker
                            beauty-mobile-staff-week-button
                            ${n?`beauty-mobile-staff-week-off`:``}
                          "
                          data-staff-id="${t.id}"
                          data-date="${e.dateValue}"
                          data-current-status="${n?`OFF`:`WORK`}"
                        >

                          <strong>
                            ${t.staff_name||`이름 없음`}
                          </strong>

                          <span>
                            ${n?`OFF`:`근무`}
                          </span>

                        </button>
                      `}).join(``)}

            </div>

          </div>

        `).join(``)}

</div>

          </div>

        </div>


      </main>

    </div>
  `,document.querySelector(`#beauty-mobile-staff-home`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/home`}),document.querySelectorAll(`.beauty-mobile-staff-schedule`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.staffId;t&&(location.href=`/merchant-app/beauty/schedule?staff_id=`+encodeURIComponent(t))})}),document.querySelectorAll(`.beauty-mobile-staff-week-button`).forEach(e=>{e.addEventListener(`click`,async()=>{let n=Number(e.dataset.staffId||0),r=e.dataset.date||``,i=e.dataset.currentStatus||`WORK`;if(!n||!r)return;if(e.disabled=!0,i===`OFF`){let{error:i}=await C.from(`beauty_staff_schedule`).delete().eq(`merchant_id`,t).eq(`staff_id`,n).eq(`schedule_date`,r).is(`order_id`,null);if(i){alert(`근무 전환 실패: `+i.message),e.disabled=!1;return}e.dataset.currentStatus=`WORK`;let a=e.querySelector(`span`);a&&(a.textContent=`근무`),e.classList.remove(`beauty-mobile-staff-week-off`),e.disabled=!1;return}let{data:a,error:o}=await C.from(`beauty_staff_schedule`).select(`
                  schedule_time,
                  status,
                  order_id
                `).eq(`merchant_id`,t).eq(`staff_id`,n).eq(`schedule_date`,r);if(o){alert(`직원 스케줄 조회 실패: `+o.message),e.disabled=!1;return}let s=new Set;(a||[]).forEach(e=>{(e.order_id||e.status===`예약완료`)&&s.add(String(e.schedule_time||``).slice(0,5))});let c=y.filter(e=>!s.has(e)).map(e=>({merchant_id:t,staff_id:n,schedule_date:r,schedule_time:e,status:`예약불가`})),{error:l}=await C.from(`beauty_staff_schedule`).upsert(c,{onConflict:`staff_id,schedule_date,schedule_time`});if(l){alert(`OFF 설정 실패: `+l.message),e.disabled=!1;return}e.dataset.currentStatus=`OFF`;let u=e.querySelector(`span`);u&&(u.textContent=`OFF`),e.classList.add(`beauty-mobile-staff-week-off`),e.disabled=!1})}),document.querySelector(`#beauty-mobile-staff-prev-week`)?.addEventListener(`click`,()=>{sessionStorage.setItem(`beauty_mobile_staff_week_offset`,String(l-1)),B()}),document.querySelector(`#beauty-mobile-staff-next-week`)?.addEventListener(`click`,()=>{sessionStorage.setItem(`beauty_mobile_staff_week_offset`,String(l+1)),B()}),document.querySelector(`#beauty-mobile-staff-create-open`)?.addEventListener(`click`,()=>{document.querySelector(`#beauty-mobile-staff-create-modal`)?.remove(),document.body.insertAdjacentHTML(`beforeend`,`
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
        `),document.querySelector(`#beauty-mobile-staff-create-close`)?.addEventListener(`click`,()=>{document.querySelector(`#beauty-mobile-staff-create-modal`)?.remove()});let e=document.querySelector(`#beauty-mobile-staff-photo`),n=document.querySelector(`#beauty-mobile-staff-photo-preview`);e?.addEventListener(`change`,()=>{let t=e.files?.[0];if(!(!t||!n)){if(!t.type.startsWith(`image/`)){alert(`이미지 파일만 선택할 수 있습니다.`),e.value=``;return}n.innerHTML=`
              <img
                src="${URL.createObjectURL(t)}"
                alt=""
                style="
                  width:100%;
                  height:100%;
                  object-fit:cover;
                "
              >
            `}}),document.querySelector(`#beauty-mobile-staff-create-save`)?.addEventListener(`click`,async()=>{let n=(document.querySelector(`#beauty-mobile-staff-name`)?.value||``).trim(),r=document.querySelector(`#beauty-mobile-staff-position`)?.value||`디자이너`,i=e?.files?.[0];if(!n){alert(`직원명을 입력해주세요.`);return}if(!i){alert(`직원 사진을 선택해주세요.`);return}let a=document.querySelector(`#beauty-mobile-staff-create-save`);a&&(a.disabled=!0,a.textContent=`등록 중...`);let o=i.name.split(`.`).pop()?.toLowerCase()||`jpg`,s=t+`/`+Date.now()+`-`+crypto.randomUUID()+`.`+o,{error:c}=await C.storage.from(`beauty-staff`).upload(s,i,{cacheControl:`3600`,upsert:!1});if(c){alert(`직원 사진 업로드 실패: `+c.message),a&&(a.disabled=!1,a.textContent=`직원 등록`);return}let{data:l}=C.storage.from(`beauty-staff`).getPublicUrl(s),u=l.publicUrl,{error:d}=await C.from(`beauty_staff`).insert({merchant_id:t,staff_name:n,position:r,photo_url:u,phone:``,work_start:`10:00`,work_end:`19:00`,break_start:null,break_end:null,off_days:[],status:`근무중`});if(d){await C.storage.from(`beauty-staff`).remove([s]),alert(`직원 등록 실패: `+d.message),a&&(a.disabled=!1,a.textContent=`직원 등록`);return}alert(`직원이 등록되었습니다.`),document.querySelector(`#beauty-mobile-staff-create-modal`)?.remove(),B()})})}async function V(){let e=sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`);if(!e){location.replace(`/merchant-app`);return}let t=Number(e),n=sessionStorage.getItem(`login_merchant_name`)||localStorage.getItem(`login_merchant_name`)||`가맹점`,r=new URLSearchParams(window.location.search),i=Number(r.get(`staff_id`)||0);if(!i){location.href=`/merchant-app/beauty/staff`;return}let a=e=>new Intl.DateTimeFormat(`en-CA`,{timeZone:`Asia/Seoul`,year:`numeric`,month:`2-digit`,day:`2-digit`}).format(e),o=a(new Date),s=r.get(`date`)||o,{data:c,error:l}=await C.from(`beauty_staff`).select(`id, staff_name, position, photo_url`).eq(`merchant_id`,t).eq(`id`,i).single();if(l||!c){alert(`직원 정보를 불러오지 못했습니다.`),location.href=`/merchant-app/beauty/staff`;return}let{data:u,error:d}=await C.from(`beauty_staff_schedule`).select(`
        schedule_time,
        status,
        order_id
      `).eq(`merchant_id`,t).eq(`staff_id`,i).eq(`schedule_date`,s);if(d){alert(`스케줄 조회 실패: `+d.message);return}let f=new Map;(u||[]).forEach(e=>{let t=String(e.schedule_time||``).slice(0,5);t&&f.set(t,e)});let p=[];for(let e=0;e<1440;e+=30){let t=String(Math.floor(e/60)).padStart(2,`0`),n=String(e%60).padStart(2,`0`);p.push(t+`:`+n)}O.innerHTML=`
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
            ${c.staff_name}
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
            ${c.staff_name}
          </strong>

          <span
            style="
              color:#7a8595;
              font-size:13px;
            "
          >
            ${c.position||`-`}
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
          value="${s}"
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

          ${p.map(e=>{let t=f.get(e),n=String(t?.status||`예약가능`);return`
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
  ${e}
</strong>


                      <select
                        class="beauty-mobile-schedule-status"
                        data-time="${e}"
                        data-order-linked="${t?.order_id?`true`:`false`}"
                        style="
                          width:100%;
                          height:40px;
                          padding:0 10px;
                          border:1px solid #d7e0eb;
                          border-radius:9px;
                          background:#ffffff;
                          color:${n===`예약가능`?`#15803d`:n===`예약불가`?`#dc2626`:n===`예약완료`?`#2563eb`:`#ca8a04`};
                          font-size:11px;
                          font-weight:800;
                        "
                      >

                        <option
                          value="예약가능"
                          ${n===`예약가능`?`selected`:``}
                        >
                          예약가능
                        </option>

                        <option
                          value="예약불가"
                          ${n===`예약불가`?`selected`:``}
                        >
                          예약불가
                        </option>

                        <option
                          value="휴게"
                          ${n===`휴게`?`selected`:``}
                        >
                          휴게
                        </option>

                        <option
                          value="예약완료"
                          ${n===`예약완료`?`selected`:``}
                        >
                          예약완료
                        </option>

                      </select>

                    </div>
                  `}).join(``)}

        </div>

      </main>

    </div>
  `;let m=e=>{let t=new Date(s+`T00:00:00+09:00`);t.setDate(t.getDate()+e);let n=a(t);location.href=`/merchant-app/beauty/schedule?staff_id=`+encodeURIComponent(String(i))+`&date=`+encodeURIComponent(n)};document.querySelector(`#beauty-mobile-schedule-back`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/beauty/staff`}),document.querySelector(`#beauty-mobile-schedule-prev`)?.addEventListener(`click`,()=>{m(-1)}),document.querySelector(`#beauty-mobile-schedule-next`)?.addEventListener(`click`,()=>{m(1)}),document.querySelector(`#beauty-mobile-schedule-today`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/beauty/schedule?staff_id=`+encodeURIComponent(String(i))+`&date=`+encodeURIComponent(o)}),document.querySelector(`#beauty-mobile-schedule-date`)?.addEventListener(`change`,e=>{let t=e.target.value;t&&(location.href=`/merchant-app/beauty/schedule?staff_id=`+encodeURIComponent(String(i))+`&date=`+encodeURIComponent(t))});let h=e=>e===`예약가능`?`#15803d`:e===`예약불가`?`#dc2626`:e===`예약완료`?`#2563eb`:`#ca8a04`;document.querySelectorAll(`.beauty-mobile-schedule-status`).forEach(e=>{e.addEventListener(`change`,async()=>{let n=e.dataset.time||``,r=e.value;if(!n)return;e.disabled=!0;let{error:a}=await C.from(`beauty_staff_schedule`).upsert({merchant_id:t,staff_id:i,schedule_date:s,schedule_time:n,status:r},{onConflict:`staff_id,schedule_date,schedule_time`});if(a){alert(`스케줄 저장 실패: `+a.message),e.disabled=!1;return}e.style.color=h(r),e.disabled=!1})});let g=async e=>{let n=Array.from(document.querySelectorAll(`.beauty-mobile-schedule-status`)).filter(e=>e.dataset.orderLinked!==`true`);if(n.length===0)return;let r=n.map(n=>({merchant_id:t,staff_id:i,schedule_date:s,schedule_time:n.dataset.time,status:e})),{error:a}=await C.from(`beauty_staff_schedule`).upsert(r,{onConflict:`staff_id,schedule_date,schedule_time`});if(a){alert(`전체 스케줄 저장 실패: `+a.message);return}n.forEach(t=>{t.value=e,t.style.color=h(e)})};document.querySelector(`#beauty-mobile-schedule-all-on`)?.addEventListener(`click`,async()=>{await g(`예약가능`)}),document.querySelector(`#beauty-mobile-schedule-all-off`)?.addEventListener(`click`,async()=>{await g(`예약불가`)}),document.querySelector(`#beauty-mobile-schedule-reset`)?.addEventListener(`click`,async()=>{if(!confirm(`예약완료 시간을 제외하고 스케줄을 초기화할까요?`))return;let{error:e}=await C.from(`beauty_staff_schedule`).delete().eq(`merchant_id`,t).eq(`staff_id`,i).eq(`schedule_date`,s).is(`order_id`,null);if(e){alert(`스케줄 초기화 실패: `+e.message);return}document.querySelectorAll(`.beauty-mobile-schedule-status`).forEach(e=>{e.dataset.orderLinked!==`true`&&(e.value=`예약가능`,e.style.color=`#15803d`)})})}async function H(){let e=sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`)||``,t=Number(e),n=sessionStorage.getItem(`login_merchant_name`)||localStorage.getItem(`login_merchant_name`)||`가맹점`;if(!t){alert(`가맹점 정보를 찾을 수 없습니다.`);return}let{data:r,error:i}=await C.from(`beauty_business_hours`).select(`
        id,
        weekday,
        open_time,
        close_time,
        is_closed,
        is_24_hours
      `).eq(`merchant_id`,t).order(`weekday`,{ascending:!0});if(i){alert(`영업시간 조회 실패: `+i.message);return}let a=[{value:1,label:`월요일`},{value:2,label:`화요일`},{value:3,label:`수요일`},{value:4,label:`목요일`},{value:5,label:`금요일`},{value:6,label:`토요일`},{value:0,label:`일요일`}],o=new Map;(r||[]).forEach(e=>{o.set(Number(e.weekday),e)});let s=[];for(let e=0;e<1440;e+=30){let t=String(Math.floor(e/60)).padStart(2,`0`),n=String(e%60).padStart(2,`0`);s.push(`${t}:${n}`)}O.innerHTML=`
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
        id="beauty-mobile-hours-home"
        class="merchant-mobile-logout"
        type="button"
      >
        홈
      </button>

    </header>


    <main class="merchant-mobile-content">

      <div class="merchant-mobile-page-title">

        <h1>
          영업시간
        </h1>

        <span>
          영업시간 및 휴무 설정
        </span>

      </div>


      <div
        id="beauty-mobile-hours-list"
        style="
          display:flex;
          flex-direction:column;
          gap:12px;
        "
      >

        ${a.map(e=>{let t=o.get(e.value),n=String(t?.open_time||`10:00`).slice(0,5),r=String(t?.close_time||`21:00`).slice(0,5),i=t?.is_closed===!0,a=t?.is_24_hours===!0;return`
                  <div
                    class="beauty-mobile-hours-row"
                    data-weekday="${e.value}"
                    style="
                      padding:16px;
                      background:#ffffff;
                      border:1px solid #e2e8f0;
                      border-radius:14px;
                      box-sizing:border-box;
                    "
                  >

                    <strong
                      style="
                        display:block;
                        margin-bottom:12px;
                        font-size:17px;
                      "
                    >
                      ${e.label}
                    </strong>


                    <div
                      style="
                        display:grid;
                        grid-template-columns:
                          minmax(0,1fr)
                          minmax(0,1fr);
                        gap:8px;
                      "
                    >

                      <select
                        class="beauty-mobile-hours-open"
                        ${i||a?`disabled`:``}
                        style="
                          width:100%;
                          min-width:0;
                          height:42px;
                          border:1px solid #cbd5e1;
                          border-radius:8px;
                          padding:0 8px;
                          box-sizing:border-box;
                        "
                      >

                        ${s.map(e=>`
                                <option
                                  value="${e}"
                                  ${e===n?`selected`:``}
                                >
                                  ${e}
                                </option>
                              `).join(``)}

                      </select>


                      <select
                        class="beauty-mobile-hours-close"
                        ${i||a?`disabled`:``}
                        style="
                          width:100%;
                          min-width:0;
                          height:42px;
                          border:1px solid #cbd5e1;
                          border-radius:8px;
                          padding:0 8px;
                          box-sizing:border-box;
                        "
                      >

                        ${s.map(e=>`
                                <option
                                  value="${e}"
                                  ${e===r?`selected`:``}
                                >
                                  ${e}
                                </option>
                              `).join(``)}

                      </select>

                    </div>


                    <div
                      style="
                        display:flex;
                        align-items:center;
                        gap:20px;
                        margin-top:12px;
                      "
                    >

                      <label
                        style="
                          display:flex;
                          align-items:center;
                          gap:6px;
                          cursor:pointer;
                        "
                      >

                        <input
                          class="beauty-mobile-hours-closed"
                          type="checkbox"
                          ${i?`checked`:``}
                        >

                        휴무

                      </label>


                      <label
                        style="
                          display:flex;
                          align-items:center;
                          gap:6px;
                          cursor:pointer;
                        "
                      >

                        <input
                          class="beauty-mobile-hours-24"
                          type="checkbox"
                          ${a?`checked`:``}
                        >

                        24시간

                      </label>

                    </div>

                  </div>
                `}).join(``)}

      </div>


      <button
        id="beauty-mobile-hours-save"
        type="button"
        style="
          width:100%;
          height:50px;
          margin-top:20px;
          border:0;
          border-radius:12px;
          background:#111827;
          color:#ffffff;
          font-size:16px;
          font-weight:800;
          cursor:pointer;
        "
      >
        영업시간 저장
      </button>

        </main>

  </div>
`,document.querySelector(`#beauty-mobile-hours-home`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/home`}),document.querySelectorAll(`.beauty-mobile-hours-row`).forEach(e=>{let t=e.querySelector(`.beauty-mobile-hours-open`),n=e.querySelector(`.beauty-mobile-hours-close`),r=e.querySelector(`.beauty-mobile-hours-closed`),i=e.querySelector(`.beauty-mobile-hours-24`),a=()=>{!t||!n||!r||!i||(t.disabled=r.checked||i.checked,n.disabled=r.checked||i.checked)};r?.addEventListener(`change`,a),i?.addEventListener(`change`,a)}),document.querySelector(`#beauty-mobile-hours-save`)?.addEventListener(`click`,async()=>{let e=Array.from(document.querySelectorAll(`.beauty-mobile-hours-row`)).map(e=>{let n=Number(e.dataset.weekday),r=e.querySelector(`.beauty-mobile-hours-open`)?.value||`10:00`,i=e.querySelector(`.beauty-mobile-hours-close`)?.value||`21:00`,a=e.querySelector(`.beauty-mobile-hours-closed`)?.checked||!1,o=e.querySelector(`.beauty-mobile-hours-24`)?.checked||!1;return{merchant_id:t,weekday:n,open_time:a||o?null:r,close_time:a||o?null:i,is_closed:a,is_24_hours:o}}),{error:n}=await C.from(`beauty_business_hours`).upsert(e,{onConflict:`merchant_id,weekday`});if(n){alert(`영업시간 저장 실패: `+n.message);return}alert(`영업시간이 저장되었습니다.`)})}async function U(){let e=sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`),t=sessionStorage.getItem(`hotel_staff_mode`)||localStorage.getItem(`hotel_staff_mode`),n=Number(sessionStorage.getItem(`hotel_staff_id`)||localStorage.getItem(`hotel_staff_id`)||0),r=sessionStorage.getItem(`hotel_staff_name`)||localStorage.getItem(`hotel_staff_name`)||``;if(!e||t!==`true`||!n||!r){location.replace(`/merchant-app`);return}let i=Number(e),a=sessionStorage.getItem(`login_merchant_name`)||localStorage.getItem(`login_merchant_name`)||`호텔`,o=new URLSearchParams(location.search),s=e=>new Intl.DateTimeFormat(`en-CA`,{timeZone:`Asia/Seoul`,year:`numeric`,month:`2-digit`,day:`2-digit`}).format(e),c=s(new Date),l=o.get(`date`)||c,u=new Date(l+`T00:00:00+09:00`).toISOString(),d=new Date(l+`T23:59:59.999+09:00`).toISOString(),{data:f,error:p}=await C.from(`orders`).select(`*`).eq(`merchant_id`,i).gte(`created_at`,u).lte(`created_at`,d).order(`created_at`,{ascending:!1});if(p){alert(`호텔 주문 조회 실패: `+p.message);return}let m=f||[],h=m.filter(e=>(e.hotel_service_status||`신규`)===`신규`).length,g=m.filter(e=>e.hotel_service_status===`처리중`).length,_=m.filter(e=>e.hotel_service_status===`완료`).length,v=e=>e?new Date(e).toLocaleTimeString(`ko-KR`,{hour:`2-digit`,minute:`2-digit`}):`-`,y=e=>{let t=new Date(l+`T00:00:00+09:00`);return t.setDate(t.getDate()+e),s(t)};O.innerHTML=`
    <div class="merchant-mobile-home">

      <header class="merchant-mobile-header">

        <div>

          <div class="merchant-mobile-brand">
            NXG PICK
          </div>

          <div class="merchant-mobile-store">
            ${a}
          </div>

        </div>


        <button
          id="hotel-staff-mobile-logout"
          class="merchant-mobile-logout"
          type="button"
        >
          로그아웃
        </button>

      </header>


      <main class="merchant-mobile-content">

        <div class="merchant-mobile-page-title">

          <div>

            <h1>
              호텔 주문
            </h1>

            <span>
              ${r} 직원
            </span>

          </div>

        </div>


        <div
  class="merchant-mobile-date-nav"
  style="
    width:100%;
    max-width:none;
    display:grid;
    grid-template-columns:repeat(3, minmax(0, 1fr));
    gap:6px;
  "
>

          <button
            id="hotel-staff-order-prev"
            type="button"
            style="width:100%;"
          >
            이전
          </button>


          <button
            id="hotel-staff-order-today"
            type="button"
            style="width:100%;"
          >
            오늘
          </button>


          <button
            id="hotel-staff-order-next"
            type="button"
            style="width:100%;"
          >
            다음
          </button>

        </div>


        <div
          style="
            text-align:center;
            font-size:15px;
            font-weight:700;
            margin:14px 0;
          "
        >
          ${l}
        </div>


        <div
          class="beauty-mobile-order-summary-grid"
        >

          <div
            class="merchant-mobile-order-summary-card"
          >

            <span>
              신규
            </span>

            <strong>
              ${h}건
            </strong>

          </div>


          <div
            class="merchant-mobile-order-summary-card"
          >

            <span>
              처리중
            </span>

            <strong>
              ${g}건
            </strong>

          </div>


          <div
            class="merchant-mobile-order-summary-card"
          >

            <span>
              완료
            </span>

            <strong>
              ${_}건
            </strong>

          </div>

        </div>


        <div
          class="merchant-mobile-order-list"
          style="margin-top:18px;"
        >

          ${m.length===0?`
                <div
                  class="merchant-mobile-order-empty"
                >
                  오늘 접수된 객실 주문이 없습니다.
                </div>
              `:m.map(e=>{let t=e.hotel_service_status||`신규`,r=e.room_number||`-`,i=Array.isArray(e.items)?e.items:[],a=i.length>0?i.map(e=>{let t=e.name||e.product_name||`-`,n=Number(e.quantity||e.qty||1);return t+` × `+n}).join(`<br>`):`-`,o=e.hotel_accepted_by_staff_name||``,s=e.hotel_completed_by_staff_name||``,c=Number(e.hotel_accepted_by_staff_id||0)===n,l=``;return l=t===`신규`?`
                          <button
                            type="button"
                            class="hotel-staff-order-start"
                            data-id="${e.id}"
                            style="
                              width:100%;
                              margin-top:14px;
                              padding:14px;
                              border:0;
                              border-radius:10px;
                              font-weight:800;
                              cursor:pointer;
                            "
                          >
                            처리 시작
                          </button>
                        `:t===`처리중`&&c?`
                          <button
                            type="button"
                            class="hotel-staff-order-complete"
                            data-id="${e.id}"
                            style="
                              width:100%;
                              margin-top:14px;
                              padding:14px;
                              border:0;
                              border-radius:10px;
                              font-weight:800;
                              cursor:pointer;
                            "
                          >
                            처리 완료
                          </button>
                        `:t===`처리중`?`
                          <div
                            style="
                              margin-top:14px;
                              padding:13px;
                              border-radius:10px;
                              text-align:center;
                              font-weight:800;
                              background:#f3f4f6;
                            "
                          >
                            ${o||`다른 직원`} 처리중
                          </div>
                        `:`
                          <div
                            style="
                              margin-top:14px;
                              padding:13px;
                              border-radius:10px;
                              text-align:center;
                              font-weight:800;
                              background:#f3f4f6;
                            "
                          >
                            ${s||o||`직원`} 처리완료
                          </div>
                        `,`
                        <article
                          class="merchant-mobile-order-card"
                        >

                          <div
                            style="
                              display:flex;
                              align-items:flex-start;
                              justify-content:space-between;
                              gap:12px;
                              margin-bottom:14px;
                            "
                          >

                            <div>

                              <div
                                style="
                                  font-size:12px;
                                  opacity:.65;
                                  margin-bottom:3px;
                                "
                              >
                                객실
                              </div>

                              <strong
                                style="
                                  font-size:28px;
                                  line-height:1;
                                "
                              >
                                ROOM ${r}
                              </strong>

                            </div>


                            <span
                              style="
                                padding:7px 11px;
                                border-radius:999px;
                                font-size:13px;
                                font-weight:800;
                                background:#f3f4f6;
                              "
                            >
                              ${t}
                            </span>

                          </div>


                          <div
                            class="beauty-mobile-order-row"
                          >

                            <span>
                              주문시간
                            </span>

                            <strong>
                              ${v(e.created_at)}
                            </strong>

                          </div>


                          <div
                            class="beauty-mobile-order-row"
                          >

                            <span>
                              주문내용
                            </span>

                            <strong
                              style="
                                text-align:right;
                                line-height:1.6;
                              "
                            >
                              ${a}
                            </strong>

                          </div>


                          ${e.customer_request?`
                                <div
                                  class="beauty-mobile-order-row"
                                >

                                  <span>
                                    요청사항
                                  </span>

                                  <strong
                                    style="
                                      text-align:right;
                                    "
                                  >
                                    ${e.customer_request}
                                  </strong>

                                </div>
                              `:``}


                          ${t===`처리중`?`
                                <div
                                  class="beauty-mobile-order-row"
                                >

                                  <span>
                                    담당직원
                                  </span>

                                  <strong>
                                    ${o||`-`}
                                  </strong>

                                </div>


                                <div
                                  class="beauty-mobile-order-row"
                                >

                                  <span>
                                    처리시작
                                  </span>

                                  <strong>
                                    ${v(e.hotel_accepted_at)}
                                  </strong>

                                </div>
                              `:``}


                          ${t===`완료`?`
                                <div
                                  class="beauty-mobile-order-row"
                                >

                                  <span>
                                    완료직원
                                  </span>

                                  <strong>
                                    ${s||o||`-`}
                                  </strong>

                                </div>


                                <div
                                  class="beauty-mobile-order-row"
                                >

                                  <span>
                                    완료시간
                                  </span>

                                  <strong>
                                    ${v(e.hotel_completed_at)}
                                  </strong>

                                </div>
                              `:``}


                          ${l}

                        </article>
                      `}).join(``)}

        </div>

      </main>

    </div>
  `,document.querySelector(`#hotel-staff-order-prev`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/hotel/orders?date=`+y(-1)}),document.querySelector(`#hotel-staff-order-today`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/hotel/orders?date=`+c}),document.querySelector(`#hotel-staff-order-next`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/hotel/orders?date=`+y(1)}),document.querySelectorAll(`.hotel-staff-order-start`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=Number(e.dataset.id||0);if(!t)return;e.disabled=!0;let{data:a,error:o}=await C.from(`orders`).update({hotel_service_status:`처리중`,hotel_accepted_by_staff_id:n,hotel_accepted_by_staff_name:r,hotel_accepted_at:new Date().toISOString()}).eq(`id`,t).eq(`merchant_id`,i).eq(`hotel_service_status`,`신규`).select(`id`);if(o){alert(`처리 시작 실패: `+o.message),e.disabled=!1;return}if(!a||a.length===0){alert(`다른 직원이 먼저 이 주문을 처리했습니다.`),location.reload();return}U()})}),document.querySelectorAll(`.hotel-staff-order-complete`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=Number(e.dataset.id||0);if(!t)return;e.disabled=!0;let{data:a,error:o}=await C.from(`orders`).update({hotel_service_status:`완료`,order_status:`완료`,hotel_completed_by_staff_id:n,hotel_completed_by_staff_name:r,hotel_completed_at:new Date().toISOString()}).eq(`id`,t).eq(`merchant_id`,i).eq(`hotel_service_status`,`처리중`).eq(`hotel_accepted_by_staff_id`,n).select(`id`);if(o){alert(`처리 완료 실패: `+o.message),e.disabled=!1;return}if(!a||a.length===0){alert(`이 주문은 현재 직원이 처리 중인 주문이 아닙니다.`),location.reload();return}U()})}),document.querySelector(`#hotel-staff-mobile-logout`)?.addEventListener(`click`,()=>{N.forEach(e=>{sessionStorage.removeItem(e),localStorage.removeItem(e)}),location.replace(`/merchant-app`)})}async function W(){let e=location.pathname.replace(`/table/`,``).trim();if(!e){O.innerHTML=`
      <div style="
        padding:40px 20px;
        text-align:center;
      ">
        잘못된 테이블 주소입니다.
      </div>
    `;return}let{data:t,error:n}=await C.from(`merchant_tables`).select(`id, merchant_id, table_number, table_name, status, public_token`).eq(`public_token`,e).maybeSingle();if(n||!t){console.error(n),O.innerHTML=`
      <div style="
        padding:40px 20px;
        text-align:center;
      ">
        사용할 수 없는 테이블입니다.
      </div>
    `;return}if(t.status!==`사용`){O.innerHTML=`
      <div style="
        padding:40px 20px;
        text-align:center;
      ">
        현재 사용할 수 없는 테이블입니다.
      </div>
    `;return}let{data:r,error:i}=await C.from(`merchants`).select(`id, merchant_name, merchant_type`).eq(`id`,t.merchant_id).maybeSingle();if(i||!r){console.error(i),O.innerHTML=`
      <div style="
        padding:40px 20px;
        text-align:center;
      ">
        가맹점 정보를 불러오지 못했습니다.
      </div>
    `;return}O.innerHTML=`
    <div
      style="
        max-width:600px;
        margin:0 auto;
        min-height:100vh;
        padding:24px 18px;
        background:#f5f7fa;
      "
    >

      <div
        style="
          padding:24px 20px;
          background:#ffffff;
          border-radius:16px;
          border:1px solid #e4e7ec;
        "
      >

        <div
          style="
            font-size:13px;
            font-weight:800;
            color:#174981;
          "
        >
          NXG PICK
        </div>

        <h1
          style="
            margin:8px 0 0;
            font-size:24px;
            color:#172033;
          "
        >
          ${r.merchant_name}
        </h1>

        <div
          style="
            margin-top:8px;
            font-size:16px;
            font-weight:800;
            color:#475467;
          "
        >
          ${t.table_name||t.table_number+`번 테이블`}
        </div>

      </div>

      <div
        style="
          margin-top:16px;
          padding:30px 20px;
          background:#ffffff;
          border-radius:16px;
          border:1px solid #e4e7ec;
          text-align:center;
        "
      >

        <div
          style="
            font-size:18px;
            font-weight:900;
            color:#172033;
          "
        >
          메뉴를 준비하고 있습니다.
        </div>

        <div
          style="
            margin-top:8px;
            font-size:14px;
            color:#667085;
          "
        >
          테이블 주문 화면 연결 테스트
        </div>

      </div>

    </div>
  `}async function ee(){let e=sessionStorage.getItem(`table_qr_number`),t=sessionStorage.getItem(`table_qr_url`);if(!e||!t){alert(`QR 정보를 불러오지 못했습니다.`),location.href=`/merchant-app/tables`;return}O.innerHTML=`
    <div
      style="
        max-width:500px;
        margin:0 auto;
        padding:24px 18px;
      "
    >

      <button
        id="table-qr-back"
        type="button"
        style="
          height:40px;
          padding:0 18px;
          border:1px solid #d0d5dd;
          border-radius:8px;
          background:#ffffff;
          font-weight:800;
          cursor:pointer;
        "
      >
        ← 테이블관리
      </button>

      
<style>
  #table-qr-print-area {
    position: relative;
    width: 320px;
    max-width: 100%;
    aspect-ratio: 54 / 85.6;
    margin: 20px auto 0;
    overflow: hidden;
    box-sizing: border-box;
  }

  #table-qr-print-area .nfc-card-background {
    display: block;
    width: 100%;
    height: 100%;
  }

  #table-qr-canvas {
    position: absolute;
    left: 50%;
    top: 79.5%;
    width: 25%;
    transform: translate(-50%, -50%);
    background: white;
  }

  #table-qr-canvas canvas {
    display: block;
    width: 100% !important;
    height: auto !important;
  }

  .nfc-table-number {
    position: absolute;
    top: 93.7%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    font-size: 16px;
    font-weight: 800;
    white-space: nowrap;
    text-align: center;
  }

  @page {
    size: A4 portrait;
    margin: 10mm;
  }

  @media print {
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      background: #ffffff !important;
      #table-qr-canvas {
  top: 79.9% !important;
}
    }

    body * {
      visibility: hidden !important;
    }

    #table-qr-print-area,
    #table-qr-print-area * {
      visibility: visible !important;
    }

    #table-qr-print-area {
      position: fixed !important;
      left: 0 !important;
      top: 0 !important;
      width: 54mm !important;
      height: 85.6mm !important;
      max-width: none !important;
      margin: 0 !important;
    }

    .nfc-table-number {
      font-size: 9pt !important;
    }
  }
</style>

<div id="table-qr-print-area">

  <img
    class="nfc-card-background"
    src="/nxg-pick-nfc.png"
    alt="NXG PICK NFC 카드"
  >

  <div id="table-qr-canvas"></div>

  <div class="nfc-table-number">
    TABLE ${e}
  </div>

</div>



      <button
        id="table-qr-print"
        type="button"
        style="
          width:100%;
          height:48px;
          margin-top:16px;
          border:0;
          border-radius:8px;
          background:#174981;
          color:#ffffff;
          font-size:16px;
          font-weight:900;
          cursor:pointer;
        "
      >
        인쇄
      </button>

    </div>
  `;let n=document.querySelector(`#table-qr-canvas`);n&&h.toCanvas(t,{width:280,margin:1},(e,t)=>{if(e){console.error(e);return}n.innerHTML=``,n.appendChild(t)}),document.querySelector(`#table-qr-back`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/tables`}),document.querySelector(`#table-qr-print`)?.addEventListener(`click`,()=>{window.print()})}function te(e,t){let n=document.querySelector(`#merchant-table-add`);if(!n)return;let r=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]||e);n.insertAdjacentHTML(`afterend`,`
    <button
      id="nfc-batch-open"
      type="button"
      style="
        width:100%;
        height:48px;
        margin-top:10px;
        border:1px solid #174981;
        border-radius:10px;
        background:#ffffff;
        color:#174981;
        font-weight:800;
        cursor:pointer;
      "
    >
      NFC 스티커 선택인쇄
    </button>

    <div
      id="nfc-batch-panel"
      style="
        display:none;
        padding:18px;
        margin-top:12px;
        background:#ffffff;
        border:1px solid #dbe3ee;
        border-radius:12px;
      "
    >
      <h3 style="margin:0 0 12px;">
        인쇄할 테이블 선택
      </h3>

      <label style="font-weight:800;">
        <input id="nfc-batch-all" type="checkbox">
        전체 선택
      </label>

      <div style="
        display:grid;
        grid-template-columns:repeat(2,1fr);
        gap:12px;
        margin:16px 0;
      ">
        ${e.map(e=>`
          <label style="
            padding:12px;
            border:1px solid #dbe3ee;
            border-radius:8px;
          ">
            <input
              class="nfc-batch-check"
              type="checkbox"
              value="${e.id}"
            >
            ${r(e.table_number)}번 테이블
          </label>
        `).join(``)}
      </div>

      <button
        id="nfc-batch-print"
        type="button"
        style="
          width:100%;
          height:48px;
          border:0;
          border-radius:8px;
          background:#174981;
          color:#ffffff;
          font-weight:800;
          cursor:pointer;
        "
      >
        선택한 테이블 인쇄
      </button>
    </div>
    `);let i=document.querySelector(`#nfc-batch-panel`);document.querySelector(`#nfc-batch-open`)?.addEventListener(`click`,()=>{i&&(i.style.display=i.style.display===`none`?`block`:`none`)});let a=document.querySelector(`#nfc-batch-all`),o=Array.from(document.querySelectorAll(`.nfc-batch-check`));a?.addEventListener(`change`,()=>{o.forEach(e=>{e.checked=a.checked})}),o.forEach(e=>{e.addEventListener(`change`,()=>{a&&(a.checked=o.length>0&&o.every(e=>e.checked))})}),document.querySelector(`#nfc-batch-print`)?.addEventListener(`click`,async()=>{let n=new Set(o.filter(e=>e.checked).map(e=>e.value)),i=e.filter(e=>n.has(String(e.id))).sort((e,t)=>String(e.table_number).localeCompare(String(t.table_number),`ko`,{numeric:!0}));if(i.length===0){alert(`인쇄할 테이블을 선택해주세요.`);return}if(i.some(e=>!e.public_token)){alert(`QR 정보가 없는 테이블이 있습니다.`);return}let a=window.open(``,`_blank`);if(!a){alert(`팝업 차단을 해제해주세요.`);return}a.document.write(`<h3 style="font-family:sans-serif;padding:24px;">NFC 스티커를 준비하고 있습니다...</h3>`),a.document.close();try{let e=await Promise.all(i.map(async e=>{let n=`https://nxgsoft.co.kr/pay/?merchant_id=`+t+`&table_token=`+e.public_token,i=await h.toDataURL(n,{width:400,margin:1,errorCorrectionLevel:`M`});return{number:r(e.table_number),qrImage:i}})),n=[];for(let t=0;t<e.length;t+=10)n.push(e.slice(t,t+10));let o=n.map(e=>`
          <section class="nfc-print-sheet">
            ${e.map(e=>`
              <div class="nfc-print-slot">
                <div class="nfc-print-card">

                  <img
                    class="nfc-print-bg"
                    src="${window.location.origin}/nxg-pick-nfc.png"
                  >

                  <img
                    class="nfc-print-qr"
                    src="${e.qrImage}"
                  >

                  <div class="nfc-print-number">
                    TABLE ${e.number}
                  </div>

                </div>
              </div>
            `).join(``)}
          </section>
        `).join(``);a.document.open(),a.document.write(`
        <!DOCTYPE html>
        <html lang="ko">
        <head>
          <meta charset="UTF-8">
          <title>NXG PICK NFC 스티커 인쇄</title>

          <style>
            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              background: #f1f3f6;
              font-family: Arial, sans-serif;
            }

            .nfc-print-toolbar {
              padding: 16px;
              text-align: center;
            }

            .nfc-print-toolbar button {
              padding: 12px 36px;
              border: 0;
              border-radius: 8px;
              background: #174981;
              color: white;
              font-weight: 800;
              cursor: pointer;
            }

            .nfc-print-sheet {
              width: 194mm;
              height: 281mm;
              margin: 12px auto;
              background: white;
              display: grid;
              grid-template-columns: repeat(2, 85.6mm);
              grid-template-rows: repeat(5, 54mm);
              column-gap: 4mm;
              row-gap: 2mm;
              align-content: center;
              justify-content: center;
            }

            .nfc-print-slot {
              position: relative;
              width: 85.6mm;
              height: 54mm;
              overflow: hidden;
            }

            .nfc-print-card {
              position: absolute;
              left: 50%;
              top: 50%;
              width: 54mm;
              height: 85.6mm;
              transform:
                translate(-50%, -50%)
                rotate(-90deg);
              overflow: hidden;
            }

            .nfc-print-bg {
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
            }

            .nfc-print-qr {
              position: absolute;
              left: 50%;
              top: 79.8%;
              width: 25%;
              height: auto;
              transform: translate(-50%, -50%);
              background: white;
            }

            .nfc-print-number {
              position: absolute;
              left: 50%;
              top: 93.2%;
              transform: translate(-50%, -50%);
              color: white;
              font-size: 9pt;
              font-weight: 800;
              white-space: nowrap;
            }

            @page {
              size: A4 portrait;
              margin: 8mm;
            }

            @media print {
              body {
                margin: 0 !important;
                background: white !important;
              }

              .nfc-print-toolbar {
                display: none !important;
              }

              .nfc-print-sheet {
                margin: 0 !important;
                break-inside: avoid;
                page-break-inside: avoid;
              }

              .nfc-print-sheet:not(:last-child) {
                break-after: page;
                page-break-after: always;
              }

              * {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
          </style>
        </head>

        <body>
          <div class="nfc-print-toolbar">
            <p>
              ${e.length}개 스티커 /
              A4 ${n.length}장
            </p>

            <p>
              실제 크기 100%로 인쇄해주세요.
            </p>

            <button id="nfc-start-print">
              인쇄하기
            </button>
          </div>

          ${o}

        </body>
        </html>
      `),a.document.close(),a.document.querySelector(`#nfc-start-print`)?.addEventListener(`click`,()=>{a.print()})}catch(e){console.error(`NFC 일괄인쇄 오류:`,e),a.document.body.textContent=`QR 생성에 실패했습니다.`}})}async function G(){let e=sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`);if(!e){location.replace(`/merchant-app`);return}let t=Number(e),n=sessionStorage.getItem(`login_merchant_name`)||localStorage.getItem(`login_merchant_name`)||``,{data:r,error:i}=await C.from(`merchant_tables`).select(`*`).eq(`merchant_id`,t).order(`id`,{ascending:!0});if(i){console.error(i),alert(`테이블 정보를 불러오지 못했습니다.`);return}O.innerHTML=`
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
          id="merchant-table-back"
          class="merchant-mobile-logout"
          type="button"
        >
          이전
        </button>

      </header>

      <main class="merchant-mobile-content">

        <section class="merchant-mobile-welcome">

          <div class="merchant-mobile-welcome-label">
            테이블오더
          </div>

          <h1>
            테이블관리
          </h1>

          <div class="merchant-mobile-type">
            테이블을 등록하고 관리합니다.
          </div>

        </section>


        <section
          style="
            margin-top:16px;
          "
        >

          <button
            id="merchant-table-add"
            type="button"
            style="
              width:100%;
              height:52px;
              border:0;
              border-radius:12px;
              background:#174981;
              color:#ffffff;
              font-size:16px;
              font-weight:800;
              cursor:pointer;
            "
          >
            + 테이블 등록
          </button>

        </section>


        <section
          style="
            margin-top:18px;
            display:grid;
            gap:12px;
          "
        >

                    ${r&&r.length>0?r.map(e=>`
                      <div
                        style="
                          display:flex;
                          align-items:center;
                          gap:10px;
                          padding:12px 14px;
                          background:#ffffff;
                          border:1px solid #dbe3ee;
                          border-radius:10px;
                        "
                      >

                        <div
                          style="
                            flex:1;
                            min-width:0;
                          "
                        >
                          <div
                            style="
                              font-size:15px;
                              font-weight:900;
                              color:#172033;
                            "
                          >
                            ${e.table_number}번 테이블
                          </div>

                          <div
                            style="
                              margin-top:3px;
                              font-size:12px;
                              color:#667085;
                            "
                          >
                            ${e.status}
                          </div>
                        </div>

                        <button
                          type="button"
                          data-table-qr-view="${e.id}"
                          data-table-number="${e.table_number}"
                          data-table-qr-url="https://nxgsoft.co.kr/pay/?merchant_id=${t}&table_token=${e.public_token}"
                          style="
                            width:82px;
                            height:38px;
                            flex-shrink:0;
                            border:0;
                            border-radius:8px;
                            background:#174981;
                            color:#ffffff;
                            font-size:13px;
                            font-weight:800;
                            cursor:pointer;
                          "
                        >
                          QR 보기
                        </button>

                        <button
  type="button"
  data-table-url-copy="https://nxgsoft.co.kr/pay/?merchant_id=${t}&table_token=${e.public_token}"
  style="
    width:82px;
    height:38px;
    flex-shrink:0;
    border:1px solid #174981;
    border-radius:8px;
    background:#ffffff;
    color:#174981;
    font-size:13px;
    font-weight:800;
    cursor:pointer;
  "
>
  주소 복사
</button>

                        <button
                          type="button"
                          data-table-delete="${e.id}"
                          style="
                            width:58px;
                            height:38px;
                            flex-shrink:0;
                            border:1px solid #dc2626;
                            border-radius:8px;
                            background:#ffffff;
                            color:#dc2626;
                            font-size:13px;
                            font-weight:800;
                            cursor:pointer;
                          "
                        >
                          삭제
                        </button>

                      </div>
                    `).join(``):`
                <div
                  style="
                    padding:30px 20px;
                    background:#ffffff;
                    border:1px solid #dbe3ee;
                    border-radius:14px;
                    text-align:center;
                    color:#667085;
                  "
                >
                  등록된 테이블이 없습니다.
                </div>
              `}

        </section>

      </main>

    </div>
  `,te(r||[],t),document.querySelector(`#merchant-table-back`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/home`}),document.querySelector(`#merchant-table-add`)?.addEventListener(`click`,async()=>{let e=prompt(`테이블 번호를 입력해주세요.
예: 1`);if(!e)return;let n=e.trim();if(!n)return;let{error:r}=await C.from(`merchant_tables`).insert({merchant_id:t,table_number:n,table_name:null,status:`사용`});if(r){console.error(r),alert(`테이블 등록에 실패했습니다.`);return}alert(`테이블이 등록되었습니다.`),G()}),document.querySelectorAll(`[data-table-delete]`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-table-delete`);if(!t||!confirm(`이 테이블을 삭제하시겠습니까?`))return;let{error:n}=await C.from(`merchant_tables`).delete().eq(`id`,t);if(n){console.error(n),alert(`테이블 삭제에 실패했습니다.`);return}alert(`테이블이 삭제되었습니다.`),G()})}),document.querySelectorAll(`[data-table-qr-view]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-table-number`),n=e.getAttribute(`data-table-qr-url`);!t||!n||(sessionStorage.setItem(`table_qr_number`,t),sessionStorage.setItem(`table_qr_url`,n),location.href=`/merchant-app/table-qr`)})}),document.querySelectorAll(`[data-table-url-copy]`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-table-url-copy`);if(t)try{await navigator.clipboard.writeText(t),alert(`주문주소가 복사되었습니다.`)}catch(e){console.error(e),alert(`주소 복사에 실패했습니다.`)}})})}async function K(){let e=sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`);if(!e){location.replace(`/merchant-app`);return}let t=Number(e),n=sessionStorage.getItem(`login_merchant_name`)||localStorage.getItem(`login_merchant_name`)||`가맹점`,r=(sessionStorage.getItem(`login_merchant_type`)||localStorage.getItem(`login_merchant_type`)||`일반매장`)===`뷰티`;O.innerHTML=`
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
  ${r?`서비스관리`:`상품관리`}
</h1>

<span>
  ${r?`서비스 등록 및 수정`:`상품 등록 및 수정`}
</span>
  
          </div>
  
          <button
  id="mobile-product-create-open"
  type="button"
  class="merchant-mobile-product-create-open"
>
${r?`+ 서비스 등록`:`+ 상품 등록`}
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
  ${r?`서비스 등록`:`상품 등록`}
</h2>


              <label>
  ${r?`서비스명`:`상품명`}
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


${r?`
      <label>
        소요시간
      </label>

      <select
        id="mobile-product-duration"
      >
        <option value="15">15분</option>
        <option value="30" selected>30분</option>
        <option value="45">45분</option>
        <option value="60">60분</option>
        <option value="90">90분</option>
        <option value="120">120분</option>
        <option value="150">150분</option>
        <option value="180">180분</option>
      </select>
    `:``}


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
        `);let e=document.querySelector(`#mobile-product-image-file`);e?.addEventListener(`change`,()=>{let t=e.files?.[0];if(!t)return;let n=document.querySelector(`#mobile-product-preview`),r=document.querySelector(`#mobile-product-preview-text`);n&&(n.src=URL.createObjectURL(t),n.style.display=`block`),r&&(r.style.display=`none`)}),document.querySelector(`#mobile-product-create-close`)?.addEventListener(`click`,()=>{document.querySelector(`#merchant-mobile-product-modal`)?.remove()}),document.querySelector(`#mobile-product-create`)?.addEventListener(`click`,async()=>{let e=(document.querySelector(`#mobile-product-name`)?.value||``).trim(),n=Number(document.querySelector(`#mobile-product-price`)?.value||0),i=r?Number(document.querySelector(`#mobile-product-duration`)?.value||30):null,a=r?`뷰티서비스`:document.querySelector(`#mobile-product-category`)?.value.trim()||`기타`,o=document.querySelector(`#mobile-product-image-file`)?.files?.[0];if(!e||!n){alert(`상품명과 가격을 입력해주세요.`);return}let s=``;if(o){let e=o.name.split(`.`).pop()||`png`,t=Date.now()+`_product.`+e,{error:n}=await C.storage.from(`merchant-files`).upload(t,o);if(n){alert(`상품 이미지 업로드 실패: `+n.message);return}let{data:r}=C.storage.from(`merchant-files`).getPublicUrl(t);s=r.publicUrl}let{error:c}=await C.from(`products`).insert({merchant_id:t,product_name:e,price:n,category:a,image_url:s,duration_minutes:r?i:null,status:`판매중`});if(c){alert(`상품 등록 실패: `+c.message);return}alert(`상품이 등록되었습니다.`),document.querySelector(`#merchant-mobile-product-modal`)?.remove(),K()})});let{data:i,error:a}=await C.from(`products`).select(`*`).eq(`merchant_id`,t).order(`sort_order`,{ascending:!0}).order(`id`,{ascending:!0}),o=document.querySelector(`#mobile-product-list`);if(!o)return;if(a){o.innerHTML=`
        상품 조회 실패 :
        ${a.message}
      `;return}let s=i||[],c=[],l=[];if(r){let{data:e,error:n}=await C.from(`beauty_staff`).select(`
        id,
        staff_name,
        position,
        status
      `).eq(`merchant_id`,t).order(`id`,{ascending:!0});if(n){alert(`직원 조회 실패: `+n.message);return}c=e||[];let{data:r,error:i}=await C.from(`beauty_staff_services`).select(`staff_id, service_id`).eq(`merchant_id`,t);if(i){alert(`담당직원 연결 조회 실패: `+i.message);return}l=r||[]}if(s.length===0){o.innerHTML=`
        등록된 상품이 없습니다.
      `;return}o.innerHTML=s.map(e=>{let t=e.status||`판매중`,n=l.filter(t=>Number(t.service_id)===Number(e.id)).map(e=>Number(e.staff_id)),i=c.filter(e=>n.includes(Number(e.id))),a=i.length>0?i.map(e=>e.staff_name||`-`).join(`, `):`미설정`;return`
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
  ${r?`소요시간 `+Number(e.duration_minutes||30)+`분`:e.category||`기타`}
</span>

${r?`
      <span
        style="
          font-size:13px;
          color:#475569;
          margin-top:4px;
        "
      >
        담당직원 : ${a}
      </span>

      <button
        type="button"
        class="beauty-mobile-service-staff-setting"
        data-id="${e.id}"
        style="
          margin-top:8px;
          width:100%;
          height:38px;
        "
      >
        담당직원 설정
      </button>
    `:``}

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
        `}).join(``),document.querySelectorAll(`.beauty-mobile-service-staff-setting`).forEach(e=>{e.addEventListener(`click`,async()=>{let n=Number(e.dataset.id||0),r=s.find(e=>Number(e.id)===n);if(!r)return;let i=l.filter(e=>Number(e.service_id)===n).map(e=>Number(e.staff_id));document.querySelector(`#beauty-mobile-service-staff-modal`)?.remove(),document.body.insertAdjacentHTML(`beforeend`,`
              <div
                id="beauty-mobile-service-staff-modal"
                class="merchant-mobile-product-modal"
              >

                <div
                  class="merchant-mobile-product-modal-box"
                >

                  <h2>
                    담당직원 설정
                  </h2>

                  <p
                    style="
                      margin:0 0 18px;
                      color:#64748b;
                      font-size:14px;
                    "
                  >
                    ${r.product_name||`서비스`}
                  </p>


                  <div
                    style="
                      display:flex;
                      flex-direction:column;
                      gap:10px;
                      margin-bottom:20px;
                    "
                  >

                    ${c.length>0?c.map(e=>{let t=i.includes(Number(e.id));return`
                                  <label
                                    style="
                                      display:flex;
                                      align-items:center;
                                      gap:10px;
                                      min-height:44px;
                                      padding:10px 12px;
                                      border:1px solid #e2e8f0;
                                      border-radius:10px;
                                      box-sizing:border-box;
                                    "
                                  >

                                    <input
                                      type="checkbox"
                                      class="beauty-mobile-service-staff-checkbox"
                                      value="${e.id}"
                                      ${t?`checked`:``}
                                    >

                                    <span>
                                      ${e.staff_name||`-`}
                                      ${e.position?` / `+e.position:``}
                                    </span>

                                  </label>
                                `}).join(``):`
                          <div
                            style="
                              padding:20px 0;
                              text-align:center;
                              color:#94a3b8;
                            "
                          >
                            등록된 직원이 없습니다.
                          </div>
                        `}

                  </div>


                  <div
                    class="merchant-mobile-product-modal-actions"
                  >

                    <button
                      id="beauty-mobile-service-staff-save"
                      type="button"
                    >
                      저장
                    </button>

                    <button
                      id="beauty-mobile-service-staff-close"
                      type="button"
                    >
                      닫기
                    </button>

                  </div>

                </div>

              </div>
            `),document.querySelector(`#beauty-mobile-service-staff-close`)?.addEventListener(`click`,()=>{document.querySelector(`#beauty-mobile-service-staff-modal`)?.remove()}),document.querySelector(`#beauty-mobile-service-staff-save`)?.addEventListener(`click`,async()=>{let e=Array.from(document.querySelectorAll(`.beauty-mobile-service-staff-checkbox`)).filter(e=>e.checked).map(e=>Number(e.value)),{error:r}=await C.from(`beauty_staff_services`).delete().eq(`merchant_id`,t).eq(`service_id`,n);if(r){alert(`기존 담당직원 삭제 실패: `+r.message);return}if(e.length>0){let r=e.map(e=>({merchant_id:t,staff_id:e,service_id:n})),{error:i}=await C.from(`beauty_staff_services`).insert(r);if(i){alert(`담당직원 저장 실패: `+i.message);return}}alert(`담당직원이 저장되었습니다.`),document.querySelector(`#beauty-mobile-service-staff-modal`)?.remove(),K()})})}),document.querySelectorAll(`.merchant-mobile-product-status`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=Number(e.dataset.id||0),n=(e.dataset.status||`판매중`)===`판매중`?`판매중지`:`판매중`,{error:r}=await C.from(`products`).update({status:n}).eq(`id`,t);if(r){alert(`상태 변경 실패: `+r.message);return}e.dataset.status=n,e.textContent=n,e.classList.toggle(`active`,n===`판매중`),e.classList.toggle(`stop`,n===`판매중지`)})}),document.querySelectorAll(`.merchant-mobile-product-edit`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.id||0),n=s.find(e=>Number(e.id)===t);if(!n)return;document.querySelector(`#merchant-mobile-product-edit-modal`)?.remove(),document.body.insertAdjacentHTML(`beforeend`,`
              <div
                id="merchant-mobile-product-edit-modal"
                class="merchant-mobile-product-modal"
              >

                <div
                  class="merchant-mobile-product-modal-box"
                >

                  <h2>
  ${r?`서비스 수정`:`상품 수정`}
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

                  ${r?`
                        <label>
                          소요시간
                        </label>
                  
                        <select
                          id="mobile-product-edit-duration"
                        >
                          <option
                            value="15"
                            ${Number(n.duration_minutes||30)===15?`selected`:``}
                          >
                            15분
                          </option>
                  
                          <option
                            value="30"
                            ${Number(n.duration_minutes||30)===30?`selected`:``}
                          >
                            30분
                          </option>
                  
                          <option
                            value="45"
                            ${Number(n.duration_minutes||30)===45?`selected`:``}
                          >
                            45분
                          </option>
                  
                          <option
                            value="60"
                            ${Number(n.duration_minutes||30)===60?`selected`:``}
                          >
                            60분
                          </option>
                  
                          <option
                            value="90"
                            ${Number(n.duration_minutes||30)===90?`selected`:``}
                          >
                            90분
                          </option>
                  
                          <option
                            value="120"
                            ${Number(n.duration_minutes||30)===120?`selected`:``}
                          >
                            120분
                          </option>
                  
                          <option
                            value="150"
                            ${Number(n.duration_minutes||30)===150?`selected`:``}
                          >
                            150분
                          </option>
                  
                          <option
                            value="180"
                            ${Number(n.duration_minutes||30)===180?`selected`:``}
                          >
                            180분
                          </option>
                        </select>
                      `:``}

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
            `);let i=document.querySelector(`#mobile-product-edit-image-file`);i?.addEventListener(`change`,()=>{let e=i.files?.[0];if(!e)return;let t=document.querySelector(`#mobile-product-edit-preview`),n=document.querySelector(`#mobile-product-edit-preview-text`);t&&(t.src=URL.createObjectURL(e),t.style.display=`block`),n&&(n.style.display=`none`)}),document.querySelector(`#mobile-product-edit-close`)?.addEventListener(`click`,()=>{document.querySelector(`#merchant-mobile-product-edit-modal`)?.remove()}),document.querySelector(`#mobile-product-edit-save`)?.addEventListener(`click`,async()=>{let e=(document.querySelector(`#mobile-product-edit-name`)?.value||``).trim(),i=Number(document.querySelector(`#mobile-product-edit-price`)?.value||0),a=r?Number(document.querySelector(`#mobile-product-edit-duration`)?.value||30):null,o=r?n.category||`뷰티서비스`:document.querySelector(`#mobile-product-edit-category`)?.value.trim()||`기타`;if(!e||!i){alert(`상품명과 가격을 입력해주세요.`);return}let s=n.image_url||``,c=document.querySelector(`#mobile-product-edit-image-file`)?.files?.[0];if(c){let e=c.name.split(`.`).pop()||`png`,t=Date.now()+`_product_edit.`+e,{error:n}=await C.storage.from(`merchant-files`).upload(t,c);if(n){alert(`이미지 업로드 실패: `+n.message);return}let{data:r}=C.storage.from(`merchant-files`).getPublicUrl(t);s=r.publicUrl}let{error:l}=await C.from(`products`).update({product_name:e,price:i,category:o,image_url:s,duration_minutes:r?a:n.duration_minutes}).eq(`id`,t);if(l){alert(`상품 수정 실패: `+l.message);return}alert(`상품이 수정되었습니다.`),document.querySelector(`#merchant-mobile-product-edit-modal`)?.remove(),K()})})});let u=async(e,t)=>{let n=s.findIndex(t=>Number(t.id)===e);if(n<0)return;let r=t===`up`?n-1:n+1;if(r<0||r>=s.length)return;let i=[...s],a=i[n];i[n]=i[r],i[r]=a;for(let e=0;e<i.length;e++){let{error:t}=await C.from(`products`).update({sort_order:e+1}).eq(`id`,i[e].id);if(t){alert(`상품 순서 변경 실패: `+t.message);return}}K()};document.querySelectorAll(`.merchant-mobile-product-up`).forEach(e=>{e.addEventListener(`click`,async()=>{await u(Number(e.dataset.id||0),`up`)})}),document.querySelectorAll(`.merchant-mobile-product-down`).forEach(e=>{e.addEventListener(`click`,async()=>{await u(Number(e.dataset.id||0),`down`)})}),document.querySelectorAll(`.merchant-mobile-product-delete`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=Number(e.dataset.id||0);if(!confirm(`정말 이 상품을 삭제할까요?`))return;let{error:n}=await C.from(`products`).delete().eq(`id`,t);if(n){alert(`상품 삭제 실패: `+n.message);return}alert(`상품이 삭제되었습니다.`),K()})})}async function q(){let e=sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`);if(!e){location.replace(`/merchant-app`);return}let t=Number(e),n=sessionStorage.getItem(`login_merchant_name`)||localStorage.getItem(`login_merchant_name`)||`가맹점`,r=(sessionStorage.getItem(`login_merchant_type`)||localStorage.getItem(`login_merchant_type`)||`일반매장`)===`아카데미`?T+`/academy-chrome?merchant_id=`+t:`https://nxgsoft.co.kr/pay/?merchant_id=`+t,{data:i,error:a}=await C.from(`merchants`).select(`qr_template_key`).eq(`id`,t).maybeSingle();a&&console.error(`QR 디자인 조회 실패:`,a);let o=i?.qr_template_key||`default`,s=o===`default`?`/qr-guide-poster.png`:`/qr-templates/${o}.png`;O.innerHTML=`
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

    ${[{key:`default`,name:`기본형`,image:`/qr-guide-poster.png`},...Array.from({length:11},(e,t)=>{let n=String(t+1).padStart(2,`0`);return{key:`qr-design-${n}`,name:`디자인 ${t+1}`,image:`/qr-templates/qr-design-${n}.png`}})].map(e=>{let t=e.key===o;return`
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
    ${o===`default`?`default`:`design`}
  "
  data-template="${o}"
>

  <img
    src="${s}"
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
    `,document.querySelector(`#mobile-qr-home`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/home`});let c=document.querySelector(`#mobile-merchant-qr-box`);c&&h.toCanvas(r,{width:600,margin:1},(e,t)=>{if(e){alert(`QR 생성 실패`);return}c.innerHTML=``,c.appendChild(t)}),document.querySelectorAll(`.merchant-mobile-qr-template`).forEach(e=>{e.addEventListener(`click`,async()=>{let n=e.dataset.templateKey;if(!n)return;let{error:r}=await C.from(`merchants`).update({qr_template_key:n}).eq(`id`,t);if(r){alert(`QR 디자인 저장 실패: `+r.message);return}q()})});let l=async()=>{let e={default:{left:86,top:59,width:22},"qr-design-01":{left:70.5,top:53.5,width:35.9},"qr-design-02":{left:47,top:67,width:32.1},"qr-design-03":{left:49,top:68.5,width:29.5},"qr-design-04":{left:49,top:61,width:28.2},"qr-design-05":{left:50,top:61,width:28.2},"qr-design-06":{left:50,top:49,width:22.4},"qr-design-07":{left:49,top:69,width:19.2,rotate:-18},"qr-design-08":{left:50,top:68,width:43.6},"qr-design-09":{left:50,top:72,width:43.6},"qr-design-10":{left:50,top:70,width:43.6},"qr-design-11":{left:50,top:53,width:19.2}},t=new Image;await new Promise((e,n)=>{t.onload=()=>e(),t.onerror=()=>n(Error(`QR 디자인 이미지를 불러오지 못했습니다.`)),t.src=s});let n=document.createElement(`canvas`);n.width=t.naturalWidth,n.height=t.naturalHeight;let i=n.getContext(`2d`);if(!i)throw Error(`이미지 생성에 실패했습니다.`);i.drawImage(t,0,0,n.width,n.height);let a=document.createElement(`canvas`);await h.toCanvas(a,r,{width:900,margin:1});let c=e[o]||e.default,l=n.width*(c.width/100),u=n.width*(c.left/100),d=n.height*(c.top/100);return i.save(),i.translate(u,d),c.rotate&&i.rotate(c.rotate*Math.PI/180),i.drawImage(a,-l/2,-l/2,l,l),i.restore(),n};document.querySelector(`#mobile-qr-copy`)?.addEventListener(`click`,async()=>{await navigator.clipboard.writeText(r),alert(`주소가 복사되었습니다.`)}),document.querySelector(`#mobile-qr-open`)?.addEventListener(`click`,()=>{window.open(r,`_blank`)}),document.querySelector(`#mobile-qr-save`)?.addEventListener(`click`,async()=>{try{let e=await l(),t=await new Promise(t=>{e.toBlob(t,`image/png`)});if(!t){alert(`이미지 생성에 실패했습니다.`);return}let r=URL.createObjectURL(t),i=document.createElement(`a`),a=n.replace(/[\\/:*?"<>|]/g,`_`);i.href=r,i.download=a+`_PICK_QR.png`,document.body.appendChild(i),i.click(),i.remove(),URL.revokeObjectURL(r)}catch(e){console.error(e),alert(`QR 이미지 저장에 실패했습니다.`)}}),document.querySelector(`#mobile-qr-share`)?.addEventListener(`click`,async()=>{try{let e=await l(),t=await new Promise(t=>{e.toBlob(t,`image/png`)});if(!t)return;let r=new File([t],`NXG_PICK_QR.png`,{type:`image/png`});if(navigator.share&&(!navigator.canShare||navigator.canShare({files:[r]}))){await navigator.share({title:n+` PICK QR`,text:n+` 주문 QR`,files:[r]});return}alert(`이 기기에서는 이미지 공유를 지원하지 않습니다.`)}catch(e){if(e?.name===`AbortError`)return;console.error(e),alert(`QR 공유에 실패했습니다.`)}}),document.querySelector(`#mobile-qr-print`)?.addEventListener(`click`,async()=>{let e=window.open(``,`_blank`);if(!e){alert(`인쇄창을 열 수 없습니다.`);return}try{let t=(await l()).toDataURL(`image/png`),r=o===`default`?`landscape`:`portrait`;e.document.write(`
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
        `),e.document.close()}catch(t){e.close(),console.error(t),alert(`QR 인쇄 준비에 실패했습니다.`)}})}function J(){if(!(sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`))){location.replace(`/merchant-app`);return}O.innerHTML=`
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
    `,document.querySelector(`#mobile-card-home`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/home`}),document.querySelector(`[data-card-menu="ocr"]`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/card/ocr`}),document.querySelector(`[data-card-menu="manual"]`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/card/manual`}),document.querySelector(`[data-card-menu="sms"]`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/card/sms`}),document.querySelector(`[data-card-menu="menu"]`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/card/menu`}),document.querySelector(`[data-card-menu="cash"]`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/card/cash`}),document.querySelector(`[data-card-menu="cash-history"]`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/card/cash-history`})}function Y(){if(!(sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`))){location.replace(`/merchant-app`);return}O.innerHTML=`
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
          id="mobile-ocr-card-back"
          class="merchant-mobile-logout"
          type="button"
        >
          이전
        </button>

      </header>


      <main class="merchant-mobile-content">

        <div class="merchant-mobile-page-title">

          <h1>
            OCR 카드결제
          </h1>

          <span>
            카드 촬영 인식 테스트 V2
          </span>

        </div>


        <div class="merchant-mobile-manual-card">

  <div
    style="
      padding: 16px;
      text-align: center;
    "
  >

    <strong
      style="
        display: block;
        font-size: 18px;
        margin-bottom: 6px;
      "
    >
      카드를 가이드 안에 맞춰주세요
    </strong>

    <div
  style="
    font-size: 13px;
    margin-bottom: 14px;
  "
>
  카드번호와 유효기간이 잘 보이도록 맞춰주세요.
</div>


  


<div
  id="ocr-v2-camera-wrap"
  style="
    position: relative;
    width: 100%;
    max-width: 560px;
    height: min(68vh, 620px);
    min-height: 420px;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 14px;
    background: #111;
  "
>

  <video
    id="ocr-v2-video"
    autoplay
    playsinline
    muted
    style="
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    "
  ></video>

  <div
  style="
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    display: flex;
    gap: 8px;
  "
>
  <button
    id="ocr-v2-guide-landscape"
    type="button"
    style="
      padding: 7px 14px;
      border: 0;
      border-radius: 18px;
      font-weight: 700;
    "
  >
    가로형
  </button>

  <button
    id="ocr-v2-guide-portrait"
    type="button"
    style="
      padding: 7px 14px;
      border: 0;
      border-radius: 18px;
      font-weight: 700;
    "
  >
    세로형
  </button>
</div>

  <div
  id="ocr-v2-card-guide"
  style="
    position: absolute;
    left: 50%;
    top: 50%;
    width: 90%;
    aspect-ratio: 1.586 / 1;
    transform: translate(-50%, -50%);
    border: 3px solid #fff;
    border-radius: 14px;
    box-sizing: border-box;
    pointer-events: none;
    box-shadow:
      0 0 0 9999px rgba(0,0,0,0.82);
  "
>


</div>


  <div
    id="ocr-v2-guide-label"
    style="
      position: absolute;
      left: 50%;
      bottom: 12px;
      transform: translateX(-50%);
      padding: 6px 12px;
      border-radius: 20px;
      background: rgba(0,0,0,0.65);
      color: #fff;
      font-size: 12px;
      white-space: nowrap;
      pointer-events: none;
    "
  >
    가로형 카드를 흰색 선에 맞춰주세요
  </div>

</div>


<canvas
  id="ocr-v2-canvas"
  style="display:none;"
></canvas>


    <button
      id="ocr-v2-capture"
      type="button"
      disabled
      style="
        width: 100%;
        margin-top: 10px;
      "
    >
      카드 촬영
    </button>


    <div
      id="ocr-v2-status"
      style="
        margin-top: 14px;
        font-size: 13px;
        line-height: 1.5;
      "
    >
      카메라를 켜주세요.
    </div>

  </div>

</div>

      </main>

    </div>
  `;let e=null,t=document.querySelector(`#ocr-v2-video`),n=document.querySelector(`#ocr-v2-card-guide`),r=document.querySelector(`#ocr-v2-guide-landscape`),i=document.querySelector(`#ocr-v2-guide-portrait`),a=!1;r?.addEventListener(`click`,()=>{n&&(a=!1,n.style.width=`90%`,n.style.height=`auto`,n.style.aspectRatio=`1.586 / 1`)}),i?.addEventListener(`click`,()=>{n&&(a=!0,n.style.width=`68%`,n.style.height=`auto`,n.style.aspectRatio=`1 / 1.586`)});let o=document.querySelector(`#ocr-v2-capture`),s=document.querySelector(`#ocr-v2-canvas`),c=document.querySelector(`#ocr-v2-status`),l=async()=>{if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){alert(`이 기기에서는 카메라를 사용할 수 없습니다.`);return}try{if(c&&(c.textContent=`카메라를 연결하고 있습니다...`),e&&e.getTracks().forEach(e=>{e.stop()}),e=await navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:{ideal:`environment`},width:{ideal:1920},height:{ideal:1080}}}),!t)throw Error(`카메라 화면을 찾을 수 없습니다.`);t.srcObject=e,await t.play(),o&&(o.disabled=!1),c&&(c.textContent=`카드를 흰색 가이드에 맞춰주세요.`)}catch{c&&(c.textContent=`카메라를 실행하지 못했습니다.`),alert(`카메라 권한을 허용해주세요.`)}},u=null,d=null;u||d||(d=(async()=>{try{let e=await(0,g.createWorker)(`eng`);await e.setParameters({tessedit_char_whitelist:`0123456789`,preserve_interword_spaces:`1`,tessedit_pageseg_mode:g.PSM.SINGLE_LINE}),u=e}catch(e){console.error(`OCR Worker 준비 실패`,e)}finally{d=null}})()),l(),o?.addEventListener(`click`,async()=>{let r=performance.now();if(!t||!s){alert(`촬영 화면을 준비하지 못했습니다.`);return}if(t.readyState<2||!t.videoWidth||!t.videoHeight){alert(`카메라 화면이 준비되지 않았습니다.`);return}let i=s.getContext(`2d`,{willReadFrequently:!0});if(!i){alert(`촬영 이미지를 처리하지 못했습니다.`);return}let f=t.videoWidth,p=t.videoHeight,m=t.clientWidth,h=t.clientHeight;if(!m||!h){alert(`카메라 화면 크기를 확인하지 못했습니다.`);return}let _=f/p,v=m/h,y=f,b=p,x=0,S=0;if(_>v?(y=p*v,x=(f-y)/2):(b=f/v,S=(p-b)/2),!n){alert(`카드 가이드 영역을 찾지 못했습니다.`);return}let C=t.getBoundingClientRect(),w=n.getBoundingClientRect(),T=w.left-C.left,E=w.top-C.top,D=y/m,O=b/h,k=x+T*D,A=S+E*O,j=w.width*D,M=w.height*O;s.width=Math.max(1,Math.round(j)),s.height=Math.max(1,Math.round(M)),i.clearRect(0,0,s.width,s.height),i.drawImage(t,k,A,j,M,0,0,s.width,s.height),e&&=(e.getTracks().forEach(e=>e.stop()),null),t.pause(),t.srcObject=null,c&&(c.textContent=`사진 촬영 완료 · 카드번호 분석 중...`),await new Promise(e=>requestAnimationFrame(()=>requestAnimationFrame(()=>e())));let N=(e,t)=>{let n=document.createElement(`canvas`),r=n.getContext(`2d`,{willReadFrequently:!0});if(!r)return null;let i=e.width,a=e.height;return t===90||t===270?(n.width=a,n.height=i):(n.width=i,n.height=a),r.save(),r.translate(n.width/2,n.height/2),r.rotate(t*Math.PI/180),r.drawImage(e,-i/2,-a/2),r.restore(),n},P=s,F=(a?[{y:.05,height:.38},{y:.22,height:.38},{y:.39,height:.38},{y:.56,height:.38}]:[{y:.16,height:.3},{y:.28,height:.3},{y:.4,height:.3}]).map(({y:e,height:t})=>{let n=document.createElement(`canvas`),r=n.getContext(`2d`,{willReadFrequently:!0});if(!r)return null;let i=Math.round(P.width*.02),a=Math.round(P.height*e),o=Math.round(P.width*.96),s=Math.round(P.height*t);return n.width=Math.max(1,o),n.height=Math.max(1,s),r.drawImage(P,i,a,o,s,0,0,n.width,n.height),n}).filter(e=>e!==null),I=(e=>{let t=document.createElement(`canvas`),n=t.getContext(`2d`,{willReadFrequently:!0});if(!n)return null;let r=Math.round(e.width*.02),i=Math.round(e.height*.52),a=Math.round(e.width*.96),o=Math.round(e.height*.42);return t.width=Math.max(1,a),t.height=Math.max(1,o),n.drawImage(e,r,i,a,o,0,0,t.width,t.height),t})(s),L=F.flatMap(e=>[N(e,0),N(e,90),N(e,180),N(e,270)].filter(e=>e!==null)),R=e=>{let t=[],n=()=>{let t=document.createElement(`canvas`);t.width=e.width*2,t.height=e.height*2;let n=t.getContext(`2d`,{willReadFrequently:!0});return n?(n.imageSmoothingEnabled=!0,n.imageSmoothingQuality=`high`,n.globalCompositeOperation=`copy`,n.filter=`contrast(1.2) brightness(1.05)`,n.drawImage(e,0,0,t.width,t.height),n.filter=`none`,n.globalCompositeOperation=`source-over`,{canvas:t,context:n}):null},r=n();r&&t.push(r.canvas);let i=n();if(!i)return t;let a=i.context.getImageData(0,0,i.canvas.width,i.canvas.height).data,o=0;for(let e=0;e<a.length;e+=4)o+=a[e]*.299+a[e+1]*.587+a[e+2]*.114;let s=a.length/4,c=s>0?o/s:128,l=Math.max(70,Math.min(195,c*.92));return(e=>{let r=n();if(!r)return;let i=r.context.getImageData(0,0,r.canvas.width,r.canvas.height),a=i.data;for(let t=0;t<a.length;t+=4){let n=a[t]*.299+a[t+1]*.587+a[t+2]*.114,r=n;e===`strongContrast`&&(n=Math.max(0,Math.min(255,(n-128)*2.2+128)),r=n),e===`contrast`&&(r=Math.max(0,Math.min(255,(n-128)*1.6+128))),e===`binary`&&(r=n>l?255:0),e===`inverse`&&(r=n>l?0:255),a[t]=r,a[t+1]=r,a[t+2]=r}r.context.putImageData(i,0,0),t.push(r.canvas)})(`contrast`),i.canvas.width=0,i.canvas.height=0,t},z=L.flatMap(e=>R(e)),B=e=>{let t=e.getContext(`2d`,{willReadFrequently:!0});if(!t)return null;let n=e.width,r=e.height;if(n<10||r<10)return null;let i=t.getImageData(0,0,n,r).data,a=Math.round(n*.06),o=Math.round(n*.94),s=Array(r).fill(0);for(let e=2;e<r-2;e++){let t=0;for(let r=a+2;r<o-2;r+=2){let a=(e*n+r)*4,o=(e*n+r-2)*4,s=i[a]*.299+i[a+1]*.587+i[a+2]*.114,c=i[o]*.299+i[o+1]*.587+i[o+2]*.114;Math.abs(s-c)>32&&t++}s[e]=t}let c=Math.max(8,Math.round((o-a)/55)),l=s.map(e=>e>=c);for(let e=2;e<r-2;e++)!l[e]&&(l[e-1]||l[e-2])&&(l[e+1]||l[e+2])&&(l[e]=!0);let u=[],d=-1;for(let e=0;e<=r;e++){let t=e<r&&l[e];if(t&&d<0&&(d=e),!t&&d>=0){let t=e-1,n=t-d+1;if(n>=r*.025&&n<=r*.22){let e=0;for(let n=d;n<=t;n++)e+=s[n];let r=e*n**1.35;u.push({top:d,bottom:t,bandHeight:n,score:r})}d=-1}}if(u.length===0)return null;u.sort((e,t)=>t.score-e.score);let f=u[0],p=Math.max(8,Math.round(f.bandHeight*.65)),m=Math.max(0,f.top-p),h=Math.min(r,f.bottom+p),g=Math.round(n*.01),_=Math.round(n*.98),v=h-m,y=document.createElement(`canvas`);y.width=Math.max(1,_),y.height=Math.max(1,v);let b=y.getContext(`2d`,{willReadFrequently:!0});return b?(b.drawImage(e,g,m,_,v,0,0,y.width,y.height),y):null},V=B(P)||L.map(e=>B(e)).find(e=>e!==null)||null,H=V?R(V).filter((e,t)=>t===0||t===1):z.filter((e,t)=>{let n=t%2;return n===0||n===1});(I?[N(I,0),N(I,180)].filter(e=>e!==null):[]).flatMap(e=>R(e)).filter((e,t)=>t===0||t===1||t===5||t===6),c&&(c.textContent=`카드번호를 분석하고 있습니다...`),o.disabled=!0,(async()=>{let e=null;try{d&&await d,e=u,u=null,e||(e=await(0,g.createWorker)(`eng`),await e.setParameters({tessedit_char_whitelist:`0123456789`,preserve_interword_spaces:`1`,tessedit_pageseg_mode:g.PSM.SINGLE_LINE}));let t=[],n=e=>{let t=0,n=!1;for(let r=e.length-1;r>=0;r--){let i=Number(e[r]);n&&(i*=2,i>9&&(i-=9)),t+=i,n=!n}return t%10==0},i=new Map,a=H.slice(0,1),o=H.slice(1),s=[...a,...o],f=[],p=0;for(let r of s){p++;let a=t.length,o=performance.now(),s=await e.recognize(r),c=(performance.now()-o)/1e3;console.log(`[OCR ${p}]`,c.toFixed(2)+`초`),f.push(c);let l=s.data.text.split(/\r?\n/).map(e=>e.trim()).filter(Boolean).map(e=>e.replace(/\D/g,``)).filter(Boolean),u=s.data.text.replace(/\D/g,``);for(let e=19;e>=13;e--)if(!(u.length<e))for(let n=0;n<=u.length-e;n++)t.push(u.slice(n,n+e));for(let e=0;e<l.length;e++){let n=``;for(let r=e;r<Math.min(e+5,l.length)&&(n+=l[r],!(n.length>19));r++)n.length>=13&&n.length<=19&&t.push(n)}let d=Array.from(new Set(t.slice(a).filter(e=>n(e))));for(let e of d)i.set(e,(i.get(e)||0)+1);if(Array.from(i.entries()).find(([,e])=>e>=2))break}let m=[];c&&(c.textContent=`카드번호 확인 완료 · 유효기간 분석 중...`),await e.setParameters({tessedit_char_whitelist:`0123456789/`,preserve_interword_spaces:`1`,tessedit_pageseg_mode:g.PSM.SINGLE_LINE});for(let t of[]){let n=(await e.recognize(t)).data.text.replace(/\D/g,``);for(let e=0;e<=n.length-4;e++){let t=n.slice(e,e+4),r=Number(t.slice(0,2)),i=Number(t.slice(2,4));if(r<1||r>12)continue;let a=new Date,o=a.getFullYear()%100,s=a.getMonth()+1;i<o||i===o&&r<s||m.push(t)}}let h=new Map;for(let e of m)h.set(e,(h.get(e)||0)+1);let _=Array.from(h.entries()).sort((e,t)=>t[1]-e[1])[0],v=_?_[0]:null,y=t.filter(e=>n(e)),b=new Map;for(let e of y)b.set(e,(b.get(e)||0)+1);let x=Array.from(b.entries()).sort((e,t)=>t[1]-e[1]),S=x[0],C=x[1];if(S&&S[1]>=2&&(!C||S[1]>C[1])&&S){let e=S[0],t=e.replace(/(\d{4})(?=\d)/g,`$1 `),n=v?v.slice(0,2)+` / `+v.slice(2,4):`인식 실패`;X=e,c&&(c.textContent=`카드번호 : `+t+`
유효기간 : `+n+`

OCR 전처리 : `+((performance.now()-r)/1e3-f.reduce((e,t)=>e+t,0)).toFixed(2)+`초
OCR 1차 : `+(f[0]??0).toFixed(2)+`초
OCR 2차 : `+(f[1]??0).toFixed(2)+`초`,c.style.whiteSpace=`pre-line`),history.pushState({},``,`/merchant-app/card/manual`),Z()}else x.length>0?(c&&(c.textContent=`카드번호 후보는 감지했지만 정확도가 부족합니다. 다시 촬영해주세요.`),l()):(c&&(c.textContent=`카드번호를 정확히 읽지 못했습니다. 빛 반사를 피해서 다시 촬영해주세요.`),l())}catch{c&&(c.textContent=`OCR 분석 중 오류가 발생했습니다.`)}finally{e&&await e.terminate();for(let e of z)e.width=0,e.height=0;for(let e of L)e.width=0,e.height=0;s&&s.getContext(`2d`)?.clearRect(0,0,s.width,s.height),o.disabled=!1}})()}),document.querySelector(`#mobile-ocr-card-back`)?.addEventListener(`click`,()=>{e&&=(e.getTracks().forEach(e=>{e.stop()}),null),t&&(t.srcObject=null),location.href=`/merchant-app/card`})}var X=``;function Z(){let e=sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`);if(!e){location.replace(`/merchant-app`);return}let t=Number(e);O.innerHTML=`
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
  결제금액 <span class="manual-required">필수</span>
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
  <span class="manual-required">필수</span>
  <span class="manual-card-check">카드번호를 재확인 해주세요.</span>
</label>
  
            <div class="mobile-manual-card-number-row">

  <input
    id="mobile-manual-card-number-1"
    type="text"
    inputmode="numeric"
    maxlength="4"
    autocomplete="off"
    placeholder="0000"
  >

  <input
    id="mobile-manual-card-number-2"
    type="text"
    inputmode="numeric"
    maxlength="4"
    autocomplete="off"
    placeholder="0000"
  >

  <input
    id="mobile-manual-card-number-3"
    type="text"
    inputmode="numeric"
    maxlength="4"
    autocomplete="off"
    placeholder="0000"
  >

  <input
    id="mobile-manual-card-number-4"
    type="text"
    inputmode="numeric"
    maxlength="4"
    autocomplete="off"
    placeholder="0000"
  >

</div>
  
  
            <label>
  유효기간 <span class="manual-required">필수</span>
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
    `,document.querySelector(`#mobile-manual-card-back`)?.addEventListener(`click`,()=>{let e=sessionStorage.getItem(`login_merchant_type`)||localStorage.getItem(`login_merchant_type`)||``;location.href=e===`수기결제`?`/merchant-app/home`:`/merchant-app/card`});let n=[document.querySelector(`#mobile-manual-card-number-1`),document.querySelector(`#mobile-manual-card-number-2`),document.querySelector(`#mobile-manual-card-number-3`),document.querySelector(`#mobile-manual-card-number-4`)];if(X){let e=X.replace(/[^0-9]/g,``).slice(0,16);n.forEach((t,n)=>{t&&(t.value=e.slice(n*4,n*4+4))}),X=``}n.forEach((e,t)=>{e?.addEventListener(`input`,()=>{e.value=e.value.replace(/[^0-9]/g,``).slice(0,4),e.value.length===4&&t<3&&n[t+1]?.focus()})});let r=document.querySelector(`#mobile-manual-expiry`);r?.addEventListener(`input`,()=>{let e=r.value.replace(/[^0-9]/g,``).slice(0,4);e.length>2?r.value=e.slice(0,2)+`/`+e.slice(2):r.value=e}),document.querySelector(`#mobile-manual-submit`)?.addEventListener(`click`,async()=>{let e=Number(document.querySelector(`#mobile-manual-amount`)?.value||0),n=(document.querySelector(`#mobile-manual-goods-name`)?.value||`일반 카드결제`).trim(),r=[`#mobile-manual-card-number-1`,`#mobile-manual-card-number-2`,`#mobile-manual-card-number-3`,`#mobile-manual-card-number-4`].map(e=>document.querySelector(e)?.value||``).join(``).replace(/[^0-9]/g,``),i=(document.querySelector(`#mobile-manual-expiry`)?.value||``).replace(/[^0-9]/g,``),a=document.querySelector(`#mobile-manual-installment`)?.value||`0`,o=(document.querySelector(`#mobile-manual-buyer-name`)?.value||`구매자`).trim(),s=(document.querySelector(`#mobile-manual-phone`)?.value||``).replace(/[^0-9]/g,``);if(!e||e<100){alert(`결제금액을 확인해주세요.`);return}if(r.length<13||r.length>19){alert(`카드번호를 확인해주세요.`);return}if(i.length!==4){alert(`유효기간을 MM/YY 형식으로 입력해주세요.`);return}let c=i.slice(0,2),l=i.slice(2,4);if(Number(c)<1||Number(c)>12){alert(`유효기간 월을 확인해주세요.`);return}let u=l+c;if(!confirm(n+`
`+e.toLocaleString()+`원을 결제할까요?`))return;let d=document.querySelector(`#mobile-manual-submit`);d&&(d.disabled=!0,d.textContent=`결제 처리 중...`);try{let i=await fetch(_(`/api/korpay-manual-pay`),{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({merchantId:t,amount:e,cardNumber:r,expiryYymm:u,installment:a,buyerName:o,billingIds:[],goodsName:n,customerPhone:s})}),c=await i.json();if(!i.ok||!c.success){alert(`결제 실패

`+(c.message||`카드결제가 승인되지 않았습니다.`));return}let l=String(c.orderId||``).trim();if(!l){alert(`결제는 승인됐지만 주문번호를 받지 못했습니다.
승인번호: `+(c.approvalNumber||`-`));return}let{data:d,error:f}=await C.rpc(`get_next_call_number`,{target_merchant_id:t});if(f||!d){alert(`결제는 승인됐지만 주문 대기번호 생성에 실패했습니다.
`+(f?.message||`번호를 받지 못했습니다.`));return}let p=Number(d),m=String(c.approvalNumber||``).trim(),h=/^\d{8}$/.test(m)?m:null,{error:g}=await C.from(`orders`).insert({merchant_id:t,order_no:String(p),call_number:p,pg_order_id:l,payment_key:c.tid||null,approval_number:h,items:[{name:n||`수기결제`,price:Number(e),quantity:1}],total_amount:Number(e),order_status:`접수`,payment_status:`결제완료`});if(g){alert(`결제는 승인됐지만 주문 저장에 실패했습니다.
`+g.message);return}alert(`결제가 승인되었습니다.

주문번호: `+p+`번
승인번호: `+(c.approvalNumber||`-`));let v=[`#mobile-manual-card-number-1`,`#mobile-manual-card-number-2`,`#mobile-manual-card-number-3`,`#mobile-manual-card-number-4`].map(e=>document.querySelector(e)),y=document.querySelector(`#mobile-manual-expiry`);v.forEach(e=>{e&&(e.value=``)}),y&&(y.value=``)}catch(e){console.error(`모바일 수기결제 오류:`,e),alert(`결제 요청 중 오류가 발생했습니다.`)}finally{d&&(d.disabled=!1,d.textContent=`결제 요청`)}})}function ne(){if(!(sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`))){location.replace(`/merchant-app`);return}let e=sessionStorage.getItem(`login_merchant_name`)||localStorage.getItem(`login_merchant_name`)||`가맹점`;O.innerHTML=`
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
    `,document.querySelector(`#mobile-sms-card-back`)?.addEventListener(`click`,()=>{let e=sessionStorage.getItem(`login_merchant_type`)||localStorage.getItem(`login_merchant_type`)||``;location.href=e===`수기결제`?`/merchant-app/home`:`/merchant-app/card`});let t=async()=>{let e=(document.querySelector(`#mobile-sms-product-name`)?.value||``).trim(),t=Number(document.querySelector(`#mobile-sms-amount`)?.value||0);if(!e)return alert(`상품명을 입력해주세요.`),``;if(!Number.isSafeInteger(t)||t<100)return alert(`결제금액을 확인해주세요.`),``;try{let n=window.Capacitor?.isNativePlatform?.()?`https://app.nxgsoft.co.kr/api/sms-payment-create`:`/api/sms-payment-create`,r=await fetch(n,{method:`POST`,credentials:`include`,headers:{"Content-Type":`application/json`,...await x()},body:JSON.stringify({productName:e,amount:t})}),i=await r.json();if(!r.ok||!i?.success||!i?.paymentLink)throw Error(i?.message||`SMS 결제링크 생성에 실패했습니다.`);return String(i.paymentLink)}catch(e){return console.error(`SMS 결제링크 생성 오류:`,e),alert(e instanceof Error?e.message:`SMS 결제링크 생성에 실패했습니다.`),``}};document.querySelector(`#mobile-sms-send`)?.addEventListener(`click`,async()=>{let n=(document.querySelector(`#mobile-sms-phone`)?.value||``).replace(/[^0-9]/g,``);if(!n){alert(`고객 휴대폰번호를 입력해주세요.`);return}let r=await t();if(!r)return;let i=Number(document.querySelector(`#mobile-sms-amount`)?.value||0),a=`[NXG PICK]
`+e+` 결제요청
결제금액: `+i.toLocaleString()+`원

`+r;if(window.Capacitor?.isNativePlatform?.()){try{await window.Capacitor.nativePromise(`NxgSms`,`compose`,{phone:n,message:a})}catch(e){console.error(`SMS 작성 오류:`,e),alert(`문자 작성 화면을 열지 못했습니다.`)}return}window.location.href=`sms:`+n+`?body=`+encodeURIComponent(a)}),document.querySelector(`#mobile-sms-copy`)?.addEventListener(`click`,async()=>{let e=await t();e&&(await navigator.clipboard.writeText(e),alert(`결제링크가 복사되었습니다.`))})}function Q(){let e=sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`);if(!e){location.replace(`/merchant-app`);return}let t=Number(e),n=sessionStorage.getItem(`login_merchant_name`)||localStorage.getItem(`login_merchant_name`)||`가맹점`;O.innerHTML=`
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
  `,document.querySelector(`#mobile-cash-back`)?.addEventListener(`click`,()=>{let e=sessionStorage.getItem(`login_merchant_type`)||localStorage.getItem(`login_merchant_type`)||``;location.href=e===`수기결제`?`/merchant-app/home`:`/merchant-app/card`});let r=document.querySelector(`#mobile-cash-type`),i=document.querySelector(`#mobile-cash-number`),a=document.querySelector(`#mobile-cash-number-label`);r?.addEventListener(`change`,()=>{r.value===`지출증빙`?(a&&(a.textContent=`사업자번호`),i&&(i.placeholder=`사업자번호 10자리`)):(a&&(a.textContent=`휴대폰번호`),i&&(i.placeholder=`휴대폰번호 또는 현금영수증 카드번호`))}),document.querySelector(`#mobile-cash-submit`)?.addEventListener(`click`,async()=>{let e=document.querySelector(`#mobile-cash-type`)?.value||``,r=Number(document.querySelector(`#mobile-cash-amount`)?.value||0),i=(document.querySelector(`#mobile-cash-order-name`)?.value||`현금결제`).trim(),a=(document.querySelector(`#mobile-cash-number`)?.value||``).replace(/[^0-9]/g,``);if(!r||r<=0){alert(`결제금액을 입력해주세요.`);return}if(!a){alert(e===`지출증빙`?`사업자번호를 입력해주세요.`:`휴대폰번호를 입력해주세요.`);return}let o=`CASH-`+t+`-`+Date.now(),s=document.querySelector(`#mobile-cash-submit`);s&&(s.disabled=!0,s.textContent=`발급 중...`);try{let s=await fetch(T+`/api/toss-cash-receipt`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({amount:r,orderId:o,orderName:i,type:e,customerIdentityNumber:a,taxFreeAmount:0})}),c=await s.json();if(!s.ok||!c.success){alert(`현금영수증 발급 실패: `+(c.message||`알 수 없는 오류`));return}let l=c?.data?.entityBody||c?.data?.cashReceipt||c?.cashReceipt||c?.data||c,u=Math.floor(r*10/11),d=r-u,f=a.replace(/[^0-9]/g,``),p=f.length>=7?f.slice(0,3)+`****`+f.slice(-4):f,m=String(l?.issueStatus||``),h=l?.issueNumber||l?.approvalNumber?`발급완료`:m===`FAILED`?`발급실패`:`발급요청`,{error:g}=await C.from(`cash_receipts`).insert({merchant_id:t,merchant_name:n,order_id:o,order_name:i,receipt_type:e,identity_number_masked:p,amount:r,supply_amount:u,vat_amount:d,tax_free_amount:0,approval_number:l?.issueNumber||l?.approvalNumber||null,receipt_key:l?.receiptKey||null,pg_company:`토스페이먼츠`,status:h,issued_at:new Date().toISOString(),raw_response:c});if(g){alert(`현금영수증은 발급됐지만 내역 저장에 실패했습니다.
`+g.message);return}alert(`현금영수증 발급이 완료되었습니다.`);let _=document.querySelector(`#mobile-cash-amount`),v=document.querySelector(`#mobile-cash-order-name`),y=document.querySelector(`#mobile-cash-number`);_&&(_.value=``),v&&(v.value=``),y&&(y.value=``)}catch(e){console.error(`모바일 현금영수증 오류:`,e),alert(`현금영수증 발급 중 오류가 발생했습니다.`)}finally{s&&(s.disabled=!1,s.textContent=`현금영수증 발급`)}})}async function $(){let e=sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`);if(!e){location.replace(`/merchant-app`);return}let t=Number(e),n=sessionStorage.getItem(`login_merchant_name`)||localStorage.getItem(`login_merchant_name`)||`가맹점`,r=new URLSearchParams(location.search),i=(e=>new Intl.DateTimeFormat(`en-CA`,{timeZone:`Asia/Seoul`,year:`numeric`,month:`2-digit`,day:`2-digit`}).format(e))(new Date),a=r.get(`start`)||i,o=r.get(`end`)||i,s=new Date(a+`T00:00:00+09:00`).toISOString(),c=new Date(o+`T23:59:59.999+09:00`).toISOString(),{data:l,error:u}=await C.from(`cash_receipts`).select(`*`).eq(`merchant_id`,t).gte(`issued_at`,s).lte(`issued_at`,c).order(`issued_at`,{ascending:!1});if(u){alert(`현금영수증 내역 조회 실패: `+u.message);return}let d=l||[],f=d.filter(e=>e.status!==`취소완료`),p=f.reduce((e,t)=>e+Number(t.amount||0),0);O.innerHTML=`
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
              value="${a}"
            >

          </div>


          <div>

            <label>
              종료일
            </label>

            <input
              id="mobile-cash-history-end"
              type="date"
              value="${o}"
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
              ${f.length}건
            </strong>
          </span>

          <span>
            승인금액 :
            <strong>
              ${p.toLocaleString()}원
            </strong>
          </span>

        </div>


        <div
          id="mobile-cash-history-list"
          class="merchant-mobile-order-list"
        >

          ${d.length===0?`
                <div
                  class="merchant-mobile-order-empty"
                >
                  현금영수증 내역이 없습니다.
                </div>
              `:d.map(e=>{let t=e.issued_at?new Date(e.issued_at).toLocaleString(`ko-KR`,{timeZone:`Asia/Seoul`}):`-`;return`
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
  `,document.querySelector(`#mobile-cash-history-back`)?.addEventListener(`click`,()=>{let e=sessionStorage.getItem(`login_merchant_type`)||localStorage.getItem(`login_merchant_type`)||``;location.href=e===`수기결제`?`/merchant-app/home`:`/merchant-app/card`}),document.querySelector(`#mobile-cash-history-search`)?.addEventListener(`click`,()=>{let e=document.querySelector(`#mobile-cash-history-start`)?.value||i,t=document.querySelector(`#mobile-cash-history-end`)?.value||i;location.href=`/merchant-app/card/cash-history?start=`+encodeURIComponent(e)+`&end=`+encodeURIComponent(t)});let m=(e,t)=>{document.querySelector(`#merchant-mobile-receipt-modal`)?.remove();let r=t?e.canceled_at:e.issued_at,i=r?new Date(r).toLocaleString(`ko-KR`,{timeZone:`Asia/Seoul`}):`-`,a=e.cancel_response?.data?.entityBody||e.cancel_response?.data?.cashReceipt||e.cancel_response?.data||{},o=a?.issueNumber||a?.approvalNumber||e.cancel_receipt_key||`-`;document.body.insertAdjacentHTML(`beforeend`,`
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
          `),document.querySelector(`#mobile-cash-receipt-close`)?.addEventListener(`click`,()=>{document.querySelector(`#merchant-mobile-receipt-modal`)?.remove()}),document.querySelector(`#mobile-cash-receipt-print`)?.addEventListener(`click`,()=>{window.print()})};document.querySelectorAll(`.mobile-cash-approval-receipt`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.id||0),n=d.find(e=>Number(e.id)===t);n&&m(n,!1)})}),document.querySelectorAll(`.mobile-cash-cancel-receipt`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.id||0),n=d.find(e=>Number(e.id)===t);n&&m(n,!0)})}),document.querySelectorAll(`.mobile-cash-cancel`).forEach(e=>{e.addEventListener(`click`,async()=>{let n=Number(e.dataset.id||0),r=d.find(e=>Number(e.id)===n);if(!r||!r.receipt_key){alert(`취소할 현금영수증 정보가 없습니다.`);return}let i=Number(r.amount||0);if(confirm(`현금영수증 ${i.toLocaleString()}원을 취소하시겠습니까?`)){e.disabled=!0,e.textContent=`취소 중...`;try{let e=await fetch(T+`/api/toss-cash-receipt-cancel`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({receiptKey:r.receipt_key})}),a=await e.json();if(!e.ok||!a.success){alert(`현금영수증 취소 실패: `+(a.message||`알 수 없는 오류`));return}let o=a?.data?.entityBody||a?.data?.cashReceipt||a?.data||a,{error:s}=await C.from(`cash_receipts`).update({status:`취소완료`,canceled_at:new Date().toISOString(),cancel_amount:i,cancel_receipt_key:o?.receiptKey||null,cancel_response:a}).eq(`id`,n).eq(`merchant_id`,t);if(s){alert(`현금영수증은 취소됐지만 내역 저장에 실패했습니다.
`+s.message);return}alert(`현금영수증 취소가 완료되었습니다.`),location.reload()}catch(e){console.error(`모바일 현금영수증 취소 오류:`,e),alert(`현금영수증 취소 중 오류가 발생했습니다.`)}finally{e.disabled=!1,e.textContent=`취소처리`}}})})}async function re(){let e=sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`);if(!e){location.replace(`/merchant-app`);return}let t=Number(e),n=sessionStorage.getItem(`login_merchant_name`)||localStorage.getItem(`login_merchant_name`)||`가맹점`;O.innerHTML=`
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
    `,document.querySelector(`#mobile-menu-card-back`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/card`});let{data:r,error:i}=await C.from(`products`).select(`*`).eq(`merchant_id`,t).eq(`status`,`판매중`).order(`sort_order`,{ascending:!0}).order(`id`,{ascending:!0}),o=document.querySelector(`#mobile-menu-product-list`);if(!o)return;if(i){o.innerHTML=`상품 조회 실패: `+i.message;return}let s=r||[];if(s.length===0){o.innerHTML=`
        <div class="merchant-mobile-order-empty">
          판매중인 상품이 없습니다.
        </div>
      `;return}let c=new Map,l=()=>{let e=0;s.forEach(t=>{let n=c.get(Number(t.id))||0;e+=Number(t.price||0)*n});let t=document.querySelector(`#mobile-menu-total-amount`);return t&&(t.textContent=e.toLocaleString()+`원`),e};o.innerHTML=s.map(e=>`
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
          `).join(``),document.querySelectorAll(`[data-menu-plus]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.menuPlus||0),n=(c.get(t)||0)+1;c.set(t,n);let r=document.querySelector(`#mobile-menu-quantity-`+t);r&&(r.textContent=String(n)),l()})}),document.querySelectorAll(`[data-menu-minus]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.menuMinus||0),n=c.get(t)||0,r=Math.max(0,n-1);c.set(t,r);let i=document.querySelector(`#mobile-menu-quantity-`+t);i&&(i.textContent=String(r)),l()})}),document.querySelector(`#mobile-menu-payment-submit`)?.addEventListener(`click`,async()=>{let e=s.map(e=>{let t=c.get(Number(e.id))||0;return{id:e.id,name:e.product_name,product_name:e.product_name,price:Number(e.price||0),quantity:t}}).filter(e=>e.quantity>0),r=e.reduce((e,t)=>e+Number(t.price)*Number(t.quantity),0);if(e.length===0||r<=0){alert(`결제할 상품을 선택해주세요.`);return}let{data:i,error:o}=await C.from(`merchants`).select(`
                merchant_name,
                online_pg_company_1,
                toss_client_key,
                korpay_pg_mid,
                korpay_pg_mkey
              `).eq(`id`,t).single();if(o||!i){alert(`가맹점 결제정보를 불러오지 못했습니다.`);return}let l=String(i.online_pg_company_1||``).trim();if(l!==`토스페이먼츠`&&l!==`코페이`){alert(`온라인결제 1 PG사를 확인해주세요.`);return}let{data:u,error:d}=await C.rpc(`get_next_call_number`,{target_merchant_id:t});if(d||!u){alert(`주문번호 생성에 실패했습니다.`);return}let f=Number(u),p=(l===`코페이`?`KORPAY-`:`TOSS-`)+f+`-`+Date.now();sessionStorage.setItem(`kiosk_call_number`,String(f)),sessionStorage.setItem(`kiosk_order_no`,p),sessionStorage.setItem(`kiosk_merchant_id`,String(t)),sessionStorage.setItem(`kiosk_items`,JSON.stringify(e)),sessionStorage.setItem(`kiosk_total_amount`,String(r));let m=new URLSearchParams(window.location.search).get(`table_token`)||``;if(m){let{data:e,error:n}=await C.from(`merchant_tables`).select(`id, merchant_id, table_number, public_token, status`).eq(`public_token`,m).eq(`merchant_id`,t).eq(`status`,`사용`).maybeSingle();if(n||!e){alert(`테이블 정보를 확인할 수 없습니다.`);return}sessionStorage.setItem(`kiosk_table_id`,String(e.id)),sessionStorage.setItem(`kiosk_table_number`,String(e.table_number)),sessionStorage.setItem(`kiosk_table_token`,String(e.public_token))}else sessionStorage.removeItem(`kiosk_table_id`),sessionStorage.removeItem(`kiosk_table_number`),sessionStorage.removeItem(`kiosk_table_token`);if(sessionStorage.setItem(`merchantId`,String(t)),sessionStorage.setItem(`merchantName`,i.merchant_name||n),sessionStorage.setItem(`message`,`모바일 메뉴결제`),sessionStorage.setItem(`selected_pg_company`,l),l===`코페이`){if(!i.korpay_pg_mid||!i.korpay_pg_mkey){alert(`코페이 PG MID 또는 MKEY가 등록되지 않았습니다.`);return}let a=E(),o=await D(String(i.korpay_pg_mid),a,r,String(i.korpay_pg_mkey)),s={merchantId:i.korpay_pg_mid,productName:e.length===1?e[0].name:e[0].name+` 외 `+(e.length-1)+`건`,orderNumber:p.replace(/[^a-zA-Z0-9]/g,``),amount:r,payMethod:`card`,returnUrl:T+`/api/korpay-return`,ediDate:a,hashKey:o,customerName:i.merchant_name||n,reserved:String(t),language:`ko`},c=window.KorpaySdk;if(!c){alert(`Korpay SDK를 찾을 수 없습니다.`);return}c.paymentTimeout=3e4,c.payment(`https://staging-payments.korpay.com/v1`,s,{onStart:()=>{let e=document.querySelector(`#mobile-menu-payment-submit`);e&&(e.disabled=!0,e.innerText=`결제창 호출 중...`)},onError:e=>{alert(String(e));let t=document.querySelector(`#mobile-menu-payment-submit`);t&&(t.disabled=!1,t.innerText=`카드 결제`)},onClose:()=>{let e=document.querySelector(`#mobile-menu-payment-submit`);e&&(e.disabled=!1,e.innerText=`카드 결제`)}});return}if(l===`토스페이먼츠`){let o=String(i.toss_client_key||w).trim();if(!o){alert(`토스 Client Key가 등록되지 않았습니다.`);return}await(await a(o)).requestPayment(`카드`,{amount:r,orderId:p.replace(/[^a-zA-Z0-9]/g,``),orderName:e.length===1?e[0].name:e[0].name+` 외 `+(e.length-1)+`건`,customerName:i.merchant_name||n,successUrl:window.location.origin+`/merchant-app/success?source=kiosk&pg=토스페이먼츠&merchantId=`+t+`&merchantName=`+encodeURIComponent(i.merchant_name||n),failUrl:window.location.origin+`/fail`});return}})}async function ie(){let e=new URLSearchParams(window.location.search),t=e.get(`orderId`)||``,n=e.get(`paymentKey`)||``,r=e.get(`amount`)||``,i=e.get(`merchantId`)||sessionStorage.getItem(`kiosk_merchant_id`)||sessionStorage.getItem(`login_merchant_id`)||``,a=e.get(`merchantName`)||sessionStorage.getItem(`merchantName`)||sessionStorage.getItem(`login_merchant_name`)||`가맹점`;if(!t||!n||!r||!i){O.innerHTML=`
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
      `,document.querySelector(`#mobile-success-orders`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/orders`});return}let o=Number(i),s=Number(r);O.innerHTML=`
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
    `;try{let{data:e,error:i}=await C.from(`merchants`).select(`
            merchant_name,
            fee_rate
          `).eq(`id`,o).maybeSingle();if(i||!e)throw Error(`가맹점 정보를 불러오지 못했습니다.`);let c=Number(e.fee_rate||0),l=Math.floor(s*c/100),u=s-l,{data:d}=await C.from(`payments`).select(`id`).eq(`order_id`,t).maybeSingle(),f=null;if(!d){let i=await fetch(T+`/api/toss-confirm`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({paymentKey:n,orderId:t,amount:r})});if(!i.ok){let e=await i.json();throw Error(e.message||`토스 결제 승인에 실패했습니다.`)}f=await i.json();let d={"3K":`기업비씨`,46:`광주`,71:`롯데`,30:`산업`,31:`BC`,51:`삼성`,38:`새마을`,41:`신한`,62:`신협`,36:`씨티`,33:`우리`,W1:`우리`,37:`우체국`,39:`저축`,35:`전북`,42:`제주`,15:`카카오뱅크`,"3A":`케이뱅크`,24:`토스뱅크`,21:`하나`,61:`현대`,11:`국민`,91:`농협`,34:`수협`},p=f.card?.acquirerCode||f.card?.issuerCode||``,m=d[p]||p,{count:h}=await C.from(`payments`).select(`*`,{count:`exact`,head:!0}),g=(h||0)+1,{error:_}=await C.from(`payments`).insert({order_number:g,order_id:t,payment_key:n,amount:s,fee_rate:c,fee_amount:l,settlement_amount:u,status:`paid`,message:sessionStorage.getItem(`message`)||`모바일 메뉴결제`,merchant_id:o,merchant_name:e.merchant_name||a,pg_company:`토스페이먼츠`,payment_method:f.method||`카드`,approval_number:f.card?.approveNo||``,card_company:m,card_number:f.card?.number||``,installment_months:f.card?.installmentPlanMonths?String(f.card.installmentPlanMonths):`일시불`,approved_at:f.approvedAt||new Date().toISOString()});if(_)throw Error(`결제내역 저장 실패: `+_.message)}let p=sessionStorage.getItem(`kiosk_order_no`)||``,m=sessionStorage.getItem(`kiosk_items`),h=sessionStorage.getItem(`kiosk_total_amount`),g=sessionStorage.getItem(`kiosk_call_number`),_=sessionStorage.getItem(`kiosk_table_id`),v=sessionStorage.getItem(`kiosk_table_number`),y=sessionStorage.getItem(`kiosk_table_token`),b=p?p.replace(/[^a-zA-Z0-9]/g,``):t,{data:x}=await C.from(`orders`).select(`id`).eq(`merchant_id`,o).eq(`pg_order_id`,b).maybeSingle();if(!x&&m&&h){let e=JSON.parse(m),{error:t}=await C.from(`orders`).insert({merchant_id:o,table_id:_?Number(_):null,table_number:v||null,table_token:y||null,order_no:g||`-`,call_number:g?Number(g):null,pg_order_id:b,payment_key:n,items:e,total_amount:Number(h),order_status:`접수`,payment_status:`결제완료`});if(t)throw Error(`주문 저장 실패: `+t.message)}sessionStorage.removeItem(`kiosk_order_no`),sessionStorage.removeItem(`kiosk_merchant_id`),sessionStorage.removeItem(`kiosk_items`),sessionStorage.removeItem(`kiosk_total_amount`),sessionStorage.removeItem(`kiosk_call_number`),window.history.replaceState({},``,`/merchant-app/success`),O.innerHTML=`
        <div class="merchant-mobile-home">
  
          <header class="merchant-mobile-header">
  
            <div>
  
              <div class="merchant-mobile-brand">
                NXG PICK
              </div>
  
              <div class="merchant-mobile-store">
                ${a}
              </div>
  
            </div>
  
          </header>
  
  
          <main class="merchant-mobile-content">
  
            <div class="merchant-mobile-manual-card">
  
              <h2>
                결제가 완료되었습니다.
              </h2>
  
              <p>
                ${s.toLocaleString()}원
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
      `,document.querySelector(`#mobile-success-orders`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/orders`}),document.querySelector(`#mobile-success-card`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/card`})}catch(e){console.error(`모바일 결제 완료 처리 오류:`,e),O.innerHTML=`
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
      `,document.querySelector(`#mobile-success-orders`)?.addEventListener(`click`,()=>{location.href=`/merchant-app/orders`})}}function ae(){let e=window.matchMedia(`(display-mode: standalone)`).matches||navigator.standalone===!0;if((k===`/merchant-app`||k===`/merchant-app/`)&&e&&(N.forEach(e=>{let t=localStorage.getItem(e);t!==null&&sessionStorage.setItem(e,t)}),sessionStorage.getItem(`login_merchant_id`))){location.replace(`/merchant-app/home`);return}O.innerHTML=`
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

        <button
  id="nxg-login-install-button"
  type="button"
  style="
    display:none;
    width:100%;
    height:48px;
    margin-top:12px;
    border:1px solid #174981;
    border-radius:10px;
    background:#ffffff;
    color:#174981;
    font-size:15px;
    font-weight:800;
    cursor:pointer;
  "
>
 앱 설치 
</button>

        <div class="merchant-app-login-footer">
          NXG PICK Merchant System
        </div>

      </section>

    </div>
  `;let t=document.querySelector(`#nxg-login-install-button`);t&&j()&&!M()&&(t.style.display=`block`,t.addEventListener(`click`,async()=>{let e=navigator.userAgent;if(/iphone|ipad|ipod/i.test(e)||navigator.platform===`MacIntel`&&navigator.maxTouchPoints>1){alert(`Safari의 공유 버튼을 누른 후
"홈 화면에 추가"를 선택해주세요.`);return}let n=/SamsungBrowser/i.test(e),r=/NAVER/i.test(e),i=/KAKAOTALK/i.test(e),a=/Chrome/i.test(e)&&!n&&!r&&!i;if(a&&A){await A.prompt(),(await A.userChoice).outcome===`accepted`&&(t.style.display=`none`),A=null;return}if(a){alert(`Chrome 오른쪽 위 메뉴에서
"앱 설치" 또는 "홈 화면에 추가"를 눌러주세요.`);return}window.location.href=`intent://app.nxgsoft.co.kr/merchant-app#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=https%3A%2F%2Fapp.nxgsoft.co.kr%2Fmerchant-app;end`})),document.querySelector(`#mobile-merchant-login`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.querySelector(`#mobile-login-id`),n=document.querySelector(`#mobile-login-password`),r=document.querySelector(`#mobile-login-message`),i=document.querySelector(`.merchant-app-login-button`),a=(t?.value||``).trim().toUpperCase(),o=n?.value.trim()||``;if(!a||!o){r&&(r.textContent=`아이디와 비밀번호를 입력해주세요.`);return}i&&(i.disabled=!0,i.textContent=`로그인 중...`),r&&(r.textContent=``);try{sessionStorage.removeItem(`nxg_native_merchant_session`);let e=await fetch(window.Capacitor?.isNativePlatform?.()?`https://app.nxgsoft.co.kr/api/merchant-login`:`/api/merchant-login`,{method:`POST`,headers:{"Content-Type":`application/json`,...window.Capacitor?.isNativePlatform?.()?{"X-NXG-NATIVE-APP":`1`}:{}},body:JSON.stringify({loginId:a,password:o})}),t=await e.json();if(e.ok&&t.success){let e=t.merchant;if(window.Capacitor?.isNativePlatform?.()){if(!t.nativeSessionToken)throw Error(`Native session unavailable`);let e=String(t.nativeSessionToken);await y(`save`,e),sessionStorage.setItem(`nxg_native_merchant_session`,e)}let n={login_merchant_id:String(e.id||``),login_merchant_code:String(e.loginId||``),login_merchant_name:String(e.name||``),login_merchant_type:String(e.type||`일반매장`)};Object.entries(n).forEach(([e,t])=>{sessionStorage.setItem(e,t),localStorage.setItem(e,t)}),[`hotel_staff_mode`,`hotel_staff_id`,`hotel_staff_name`,`hotel_staff_login_id`,`hotel_staff_role`].forEach(e=>{sessionStorage.removeItem(e),localStorage.removeItem(e)}),location.href=`/merchant-app/home`;return}if(e.status!==401){r&&(r.textContent=t?.message||`로그인할 수 없습니다.`);return}let n=await fetch(window.Capacitor?.isNativePlatform?.()?`https://app.nxgsoft.co.kr/api/hotel-staff-login`:`/api/hotel-staff-login`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({loginId:a,password:o})}),i=await n.json();if(n.ok&&i.success){let e={login_merchant_id:String(i.merchant.id),login_merchant_code:``,login_merchant_name:String(i.merchant.name||``),login_merchant_type:`호텔`,hotel_staff_mode:`true`,hotel_staff_id:String(i.staff.id),hotel_staff_name:String(i.staff.staffName||``),hotel_staff_login_id:String(i.staff.loginId||``),hotel_staff_role:String(i.staff.role||`STAFF`)};Object.entries(e).forEach(([e,t])=>{sessionStorage.setItem(e,t),localStorage.setItem(e,t)}),location.href=`/merchant-app/hotel/orders`;return}r&&(r.textContent=i?.message||t?.message||`아이디 또는 비밀번호가 올바르지 않습니다.`);return}catch(e){console.error(`모바일 로그인 오류:`,e),r&&(r.textContent=`로그인 중 오류가 발생했습니다.`)}finally{i&&(i.disabled=!1,i.textContent=`로그인`)}})}k===`/merchant-app/home`?(I(),m()):k===`/merchant-app/orders`?R():k===`/merchant-app/hotel/orders`?U():k===`/merchant-app/beauty/orders`?z():k===`/merchant-app/beauty/staff`?B():k===`/merchant-app/beauty/schedule`?V():k===`/merchant-app/beauty/products`?K():k===`/merchant-app/beauty/hours`?H():k.startsWith(`/table/`)?W():k===`/merchant-app/products`?K():k===`/merchant-app/tables`?G():k===`/merchant-app/table-qr`?ee():k===`/merchant-app/qr`?q():k===`/merchant-app/card`?J():k===`/merchant-app/card/ocr`?Y():k===`/merchant-app/card/manual`?Z():k===`/merchant-app/card/sms`?ne():k===`/merchant-app/card/cash`?Q():k===`/merchant-app/card/cash-history`?$():k===`/merchant-app/card/menu`?re():k===`/merchant-app/success`?ie():ae();