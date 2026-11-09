var e=document.querySelector(`#app`),t=[{id:1,category:`커피`,name:`아메리카노`,price:4500,image:`/demo-americano.png`},{id:2,category:`커피`,name:`카페라떼`,price:5e3,image:`/demo-cafe-latte.png`},{id:3,category:`음료`,name:`딸기라떼`,price:5500,image:`/demo-strawberry-latte.png`},{id:4,category:`음료`,name:`오렌지 에이드`,price:6e3,image:`/demo-orange-ade.png`},{id:5,category:`디저트`,name:`클럽 샌드위치`,price:7500,image:`/demo-club-sandwich.png`},{id:6,category:`디저트`,name:`치즈 케이크`,price:6500,image:`/demo-cheese-cake.png`}],n=`전체`,r=[];function i(e){return e.toLocaleString(`ko-KR`)+`원`}function a(){return r.reduce((e,t)=>e+t.quantity,0)}function o(){return r.reduce((e,t)=>e+t.price*t.quantity,0)}function s(){e.innerHTML=`
    <div class="store-demo-page">

      <div class="store-demo-box">

        <div class="store-demo-brand">
          NXG PICK
        </div>

        <h1>
          일반매장 체험
        </h1>

        <p>
          고객이 QR을 촬영한 뒤<br>
          메뉴를 선택하고 주문하는 과정을<br>
          직접 체험해보세요.
        </p>

        <button
          id="store-demo-start"
          type="button"
        >
          체험 시작하기
        </button>

      </div>

    </div>
  `,document.querySelector(`#store-demo-start`)?.addEventListener(`click`,()=>{c()})}function c(){let s=[`전체`,`커피`,`음료`,`디저트`],u=n===`전체`?t:t.filter(e=>e.category===n);e.innerHTML=`
    <div class="demo-customer-page">

      <header class="demo-customer-header">

        <div>
          <div class="demo-customer-brand">
            NXG PICK
          </div>

          <strong>
            NXG CAFE
          </strong>
        </div>

        <span class="demo-badge">
          DEMO
        </span>

      </header>


      <main class="demo-customer-content">

        <section class="demo-customer-intro">

          <small>
            QR 주문 체험
          </small>

          <h1>
            메뉴를 선택해주세요
          </h1>

          <p>
            원하는 상품을 담고<br>
            주문까지 직접 체험할 수 있습니다.
          </p>

        </section>


        <div class="demo-category-list">

          ${s.map(e=>`
                <button
                  type="button"
                  class="${n===e?`active`:``}"
                  data-category="${e}"
                >
                  ${e}
                </button>
              `).join(``)}

        </div>


        <section class="demo-product-list">

          ${u.map(e=>`

                <article
                  class="demo-product-card"
                >

                  <div
                    class="demo-product-image"
                  >
                    <img
  src="${e.image}"
  alt="${e.name}"
  class="demo-product-image"
/>
                  </div>

                  <div
                    class="demo-product-info"
                  >

                    <small>
                      ${e.category}
                    </small>

                    <strong>
                      ${e.name}
                    </strong>

                    <span>
                      ${i(e.price)}
                    </span>

                  </div>

                  <button
                    type="button"
                    class="demo-product-add"
                    data-product-id="${e.id}"
                  >
                    담기
                  </button>

                </article>

              `).join(``)}

        </section>

      </main>


      <div class="demo-cart-bar">

        <div>

          <small>
            PICK
          </small>

          <strong>
            ${a()}개 ·
            ${i(o())}
          </strong>

        </div>

        <button
          id="demo-open-cart"
          type="button"
          ${r.length===0?`disabled`:``}
        >
          주문하기
        </button>

      </div>

    </div>
  `,document.querySelectorAll(`[data-category]`).forEach(e=>{e.addEventListener(`click`,()=>{n=e.dataset.category||`전체`,c()})}),document.querySelectorAll(`[data-product-id]`).forEach(e=>{e.addEventListener(`click`,()=>{let n=Number(e.dataset.productId),i=t.find(e=>e.id===n);if(!i)return;let a=r.find(e=>e.id===i.id);a?a.quantity+=1:r.push({...i,quantity:1}),c()})}),document.querySelector(`#demo-open-cart`)?.addEventListener(`click`,()=>{r.length!==0&&l()})}function l(){e.innerHTML=`
      <div class="demo-customer-page">
  
        <header class="demo-customer-header">
  
          <div>
            <div class="demo-customer-brand">
              NXG PICK
            </div>
  
            <strong>
              NXG CAFE
            </strong>
          </div>
  
          <span class="demo-badge">
            DEMO
          </span>
  
        </header>
  
  
        <main class="demo-customer-content">
  
          <div class="demo-cart-title">
  
            <button
              id="demo-cart-back"
              type="button"
            >
              ‹
            </button>
  
            <div>
              <small>
                주문 확인
              </small>
  
              <h1>
                PICK
              </h1>
            </div>
  
          </div>
  
  
          <section class="demo-cart-items">
  
            ${r.map(e=>`
                  <article
                    class="demo-cart-item"
                  >
  
                    <div class="demo-cart-item-image">
                      <img
  src="${e.image}"
  alt="${e.name}"
  class="demo-cart-image"
/>
                    </div>
  
  
                    <div class="demo-cart-item-info">
  
                      <strong>
                        ${e.name}
                      </strong>
  
                      <span>
                        ${i(e.price)}
                      </span>
  
  
                      <div class="demo-cart-quantity">
  
                        <button
                          type="button"
                          data-cart-minus="${e.id}"
                        >
                          −
                        </button>
  
                        <strong>
                          ${e.quantity}
                        </strong>
  
                        <button
                          type="button"
                          data-cart-plus="${e.id}"
                        >
                          +
                        </button>
  
                      </div>
  
                    </div>
  
  
                    <button
                      type="button"
                      class="demo-cart-delete"
                      data-cart-delete="${e.id}"
                    >
                      삭제
                    </button>
  
                  </article>
                `).join(``)}
  
          </section>
  
  
          <section class="demo-request-box">
  
            <label
              for="demo-customer-request"
            >
              요청사항
            </label>
  
            <textarea
              id="demo-customer-request"
              maxlength="100"
              placeholder="예) 빨대 2개 부탁드립니다."
            ></textarea>
  
          </section>
  
  
          <section class="demo-payment-summary">
  
            <div>
              <span>
                주문수량
              </span>
  
              <strong>
                ${a()}개
              </strong>
            </div>
  
            <div class="total">
              <span>
                결제금액
              </span>
  
              <strong>
                ${i(o())}
              </strong>
            </div>
  
          </section>
  
        </main>
  
  
        <div class="demo-cart-payment-bar">
  
          <div>
            <small>
              총 결제금액
            </small>
  
            <strong>
              ${i(o())}
            </strong>
          </div>
  
          <button
            id="demo-payment-start"
            type="button"
          >
            주문 · 결제하기
          </button>
  
        </div>
  
      </div>
    `,document.querySelector(`#demo-cart-back`)?.addEventListener(`click`,()=>{c()}),document.querySelectorAll(`[data-cart-minus]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.cartMinus),n=r.find(e=>e.id===t);if(n){if(--n.quantity,n.quantity<=0){let e=r.findIndex(e=>e.id===t);e>=0&&r.splice(e,1)}if(r.length===0){c();return}l()}})}),document.querySelectorAll(`[data-cart-plus]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.cartPlus),n=r.find(e=>e.id===t);n&&(n.quantity+=1,l())})}),document.querySelectorAll(`[data-cart-delete]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.cartDelete),n=r.findIndex(e=>e.id===t);if(n>=0&&r.splice(n,1),r.length===0){c();return}l()})}),document.querySelector(`#demo-payment-start`)?.addEventListener(`click`,()=>{let e=(document.querySelector(`#demo-customer-request`)?.value||``).trim();sessionStorage.setItem(`nxg_demo_request`,e),u()})}function u(){let t=sessionStorage.getItem(`nxg_demo_request`)||``,n=`카드`,a=()=>{e.innerHTML=`
        <div class="demo-customer-page">
  
          <header class="demo-customer-header">
            <div>
              <div class="demo-customer-brand">
                NXG PICK
              </div>
              <strong>NXG CAFE</strong>
            </div>
  
            <span class="demo-badge">
              DEMO
            </span>
          </header>
  
  
          <main class="demo-customer-content">
  
            <div class="demo-cart-title">
  
              <button
                id="demo-payment-back"
                type="button"
              >
                ‹
              </button>
  
              <div>
                <small>결제 체험</small>
                <h1>결제하기</h1>
              </div>
  
            </div>
  
  
            <section class="demo-pay-amount">
  
              <span>총 결제금액</span>
  
              <strong>
                ${i(o())}
              </strong>
  
            </section>
  
  
            <section class="demo-pay-method">
  
              <h2>결제수단</h2>
  
              <div class="demo-pay-method-grid">
  
                <button
                  type="button"
                  data-demo-pay="카드"
                  class="${n===`카드`?`active`:``}"
                >
                  <span>💳</span>
                  카드결제
                </button>
  
                <button
                  type="button"
                  data-demo-pay="간편결제"
                  class="${n===`간편결제`?`active`:``}"
                >
                  <span>📱</span>
                  간편결제
                </button>
  
              </div>
  
            </section>
  
  
            <div class="demo-pay-notice">
              DEMO 결제입니다.<br>
              실제 카드 승인이나 결제는 발생하지 않습니다.
            </div>
  
  
            <button
              id="demo-fake-payment"
              class="demo-fake-payment"
              type="button"
            >
              ${i(o())} 가상 결제하기
            </button>
  
          </main>
  
        </div>
      `,document.querySelector(`#demo-payment-back`)?.addEventListener(`click`,()=>{l()}),document.querySelectorAll(`[data-demo-pay]`).forEach(e=>{e.addEventListener(`click`,()=>{n=e.dataset.demoPay||`카드`,a()})}),document.querySelector(`#demo-fake-payment`)?.addEventListener(`click`,()=>{let e={orderNumber:`DEMO-`+String(Date.now()).slice(-6),items:r.map(e=>({id:e.id,name:e.name,price:e.price,quantity:e.quantity,image:e.image})),totalAmount:o(),request:t,paymentMethod:n,status:`접수`,createdAt:new Date().toISOString()};localStorage.setItem(`nxg_store_demo_order`,JSON.stringify(e)),d(e)})};a()}function d(t){e.innerHTML=`
      <div class="store-demo-page">
  
        <div class="store-demo-box">
  
          <div
            style="
              font-size:58px;
              margin-bottom:18px;
            "
          >
            ✓
          </div>
  
          <div class="store-demo-brand">
            NXG PICK
          </div>
  
          <h1>
            주문이 완료되었습니다
          </h1>
  
          <p>
            주문번호<br>
            <strong>
              ${t.orderNumber}
            </strong>
            <br><br>
  
            결제금액<br>
            <strong>
              ${i(t.totalAmount)}
            </strong>
          </p>
  
          <div class="demo-pay-notice">
            체험용 주문입니다.<br>
            실제 결제는 발생하지 않았습니다.
          </div>
  
          <button
            id="demo-open-merchant"
            type="button"
            style="
              margin-top:22px;
            "
          >
            가맹점에서 주문 확인하기
          </button>
  
        </div>
  
      </div>
    `,document.querySelector(`#demo-open-merchant`)?.addEventListener(`click`,()=>{f()})}function f(){let t=localStorage.getItem(`nxg_store_demo_order`);if(!t){s();return}let n=JSON.parse(t);e.innerHTML=`
      <div class="demo-merchant-page">
  
        <header class="demo-merchant-header">
  
          <div>
            <div class="demo-merchant-brand">
              NXG PICK
            </div>
  
            <strong>
              NXG CAFE
            </strong>
          </div>
  
          <span class="demo-badge">
            DEMO
          </span>
  
        </header>
  
  
        <main class="demo-merchant-content">
  
          <div class="demo-merchant-title">
  
            <div>
              <small>
                가맹점 모바일
              </small>
  
              <h1>
                주문관리
              </h1>
            </div>
  
            <span>
              주문접수
            </span>
  
          </div>
  
  
          <section class="demo-merchant-summary">
  
            <div>
              <span>오늘 주문</span>
              <strong>1건</strong>
            </div>
  
            <div>
              <span>오늘 매출</span>
              <strong>
                ${i(n.totalAmount)}
              </strong>
            </div>
  
          </section>
  
  
          <div class="demo-merchant-filter">
  
            <button class="active">
              전체
            </button>
  
            <button>
              접수
            </button>
  
            <button>
              완료
            </button>
  
          </div>
  
  
          <section class="demo-merchant-order">
  
            <div class="demo-merchant-order-head">
  
              <div>
                <small>
                  주문번호
                </small>
  
                <strong>
                  ${n.orderNumber}
                </strong>
              </div>
  
              <span
                id="demo-order-status"
                class="demo-order-status"
              >
                ${n.status}
              </span>
  
            </div>
  
  
            <div class="demo-merchant-items">
  
              ${n.items.map(e=>`
                    <div>
                      <span>
                        ${e.emoji}
                        ${e.name}
                      </span>
  
                      <strong>
                        ${e.quantity}개
                      </strong>
                    </div>
                  `).join(``)}
  
            </div>
  
  
            ${n.request?`
                  <div class="demo-merchant-request">
  
                    <small>
                      고객 요청사항
                    </small>
  
                    <strong>
                      ${n.request}
                    </strong>
  
                  </div>
                `:``}
  
  
            <div class="demo-merchant-total">
  
              <span>
                결제완료
              </span>
  
              <strong>
                ${i(n.totalAmount)}
              </strong>
  
            </div>
  
  
            <div class="demo-order-actions">

  <button
    id="demo-customer-call"
    class="demo-customer-call"
    type="button"
  >
    고객 호출
  </button>

  <button
    id="demo-order-complete"
    class="demo-order-complete"
    type="button"
  >
    주문 완료처리
  </button>

</div>
  
          </section>
  
        </main>
  
      </div>
    `,document.querySelector(`#demo-customer-call`)?.addEventListener(`click`,()=>{let e=new SpeechSynthesisUtterance(`주문하신 상품이 준비되었습니다. 픽업대로 와주세요.`);e.lang=`ko-KR`,e.rate=1,e.pitch=1,e.volume=1,window.speechSynthesis.cancel(),window.speechSynthesis.speak(e),alert(`고객 호출을 실행했습니다.

DEMO에서는 음성으로 호출을 체험합니다.`)}),document.querySelector(`#demo-order-complete`)?.addEventListener(`click`,()=>{n.status=`완료`,localStorage.setItem(`nxg_store_demo_order`,JSON.stringify(n)),p(n)})}function p(t){e.innerHTML=`
      <div class="store-demo-page">
  
        <div class="store-demo-box">
  
          <div class="demo-complete-icon">
            ✓
          </div>
  
          <div class="store-demo-brand">
            NXG PICK
          </div>
  
          <h1>
            체험이 완료되었습니다
          </h1>
  
          <p>
            고객의 QR 주문부터<br>
            결제와 가맹점 주문 처리까지<br>
            직접 체험하셨습니다.
          </p>
  
  
          <div class="demo-complete-order">
  
            <div>
              <span>
                주문번호
              </span>
  
              <strong>
                ${t.orderNumber}
              </strong>
            </div>
  
            <div>
              <span>
                결제금액
              </span>
  
              <strong>
                ${i(t.totalAmount)}
              </strong>
            </div>
  
            <div>
              <span>
                주문상태
              </span>
  
              <strong>
                완료
              </strong>
            </div>
  
          </div>
  
  
          <div class="demo-complete-flow">
            QR 주문 → 결제 → 주문접수 → 고객호출 → 완료
          </div>
  
  
          <button
            id="demo-restart"
            type="button"
          >
            다시 체험하기
          </button>
  
        </div>
  
      </div>
    `,document.querySelector(`#demo-restart`)?.addEventListener(`click`,()=>{r.splice(0,r.length),n=`전체`,sessionStorage.removeItem(`nxg_demo_request`),localStorage.removeItem(`nxg_store_demo_order`),s()})}s();