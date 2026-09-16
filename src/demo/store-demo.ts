import './store-demo.css'

const app =
  document.querySelector<HTMLDivElement>('#app')!

type DemoProduct = {
  id: number
  category: string
  name: string
  price: number
  image: string
}

type CartItem = DemoProduct & {
  quantity: number
}

const products: DemoProduct[] = [
    {
      id: 1,
      category: '커피',
      name: '아메리카노',
      price: 4500,
      image: '/demo-americano.png'
    },
    {
      id: 2,
      category: '커피',
      name: '카페라떼',
      price: 5000,
      image: '/demo-cafe-latte.png'
    },
    {
      id: 3,
      category: '음료',
      name: '딸기라떼',
      price: 5500,
      image: '/demo-strawberry-latte.png'
    },
    {
      id: 4,
      category: '음료',
      name: '오렌지 에이드',
      price: 6000,
      image: '/demo-orange-ade.png'
    },
    {
      id: 5,
      category: '디저트',
      name: '클럽 샌드위치',
      price: 7500,
      image: '/demo-club-sandwich.png'
    },
    {
      id: 6,
      category: '디저트',
      name: '치즈 케이크',
      price: 6500,
      image: '/demo-cheese-cake.png'
    }
  ]

let selectedCategory = '전체'

const cart: CartItem[] = []

function formatPrice(
  price: number
) {
  return price.toLocaleString('ko-KR') + '원'
}

function getCartCount() {
  return cart.reduce(
    (sum, item) =>
      sum + item.quantity,
    0
  )
}

function getCartTotal() {
  return cart.reduce(
    (sum, item) =>
      sum +
      item.price *
      item.quantity,
    0
  )
}

function renderStart() {

  app.innerHTML = `
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
  `

  document
    .querySelector(
      '#store-demo-start'
    )
    ?.addEventListener(
      'click',
      () => {
        renderCustomerOrder()
      }
    )
}

function renderCustomerOrder() {

  const categories =
    [
      '전체',
      '커피',
      '음료',
      '디저트'
    ]

  const visibleProducts =
    selectedCategory === '전체'
      ? products
      : products.filter(
          product =>
            product.category ===
            selectedCategory
        )

  app.innerHTML = `
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

          ${categories
            .map(
              category => `
                <button
                  type="button"
                  class="${
                    selectedCategory ===
                    category
                      ? 'active'
                      : ''
                  }"
                  data-category="${category}"
                >
                  ${category}
                </button>
              `
            )
            .join('')}

        </div>


        <section class="demo-product-list">

          ${visibleProducts
            .map(
              product => `

                <article
                  class="demo-product-card"
                >

                  <div
                    class="demo-product-image"
                  >
                    <img
  src="${product.image}"
  alt="${product.name}"
  class="demo-product-image"
/>
                  </div>

                  <div
                    class="demo-product-info"
                  >

                    <small>
                      ${product.category}
                    </small>

                    <strong>
                      ${product.name}
                    </strong>

                    <span>
                      ${formatPrice(
                        product.price
                      )}
                    </span>

                  </div>

                  <button
                    type="button"
                    class="demo-product-add"
                    data-product-id="${product.id}"
                  >
                    담기
                  </button>

                </article>

              `
            )
            .join('')}

        </section>

      </main>


      <div class="demo-cart-bar">

        <div>

          <small>
            PICK
          </small>

          <strong>
            ${getCartCount()}개 ·
            ${formatPrice(
              getCartTotal()
            )}
          </strong>

        </div>

        <button
          id="demo-open-cart"
          type="button"
          ${
            cart.length === 0
              ? 'disabled'
              : ''
          }
        >
          주문하기
        </button>

      </div>

    </div>
  `


  document
    .querySelectorAll(
      '[data-category]'
    )
    .forEach(
      button => {

        button.addEventListener(
          'click',
          () => {

            selectedCategory =
              (
                button as HTMLButtonElement
              ).dataset.category ||
              '전체'

            renderCustomerOrder()
          }
        )

      }
    )


  document
    .querySelectorAll(
      '[data-product-id]'
    )
    .forEach(
      button => {

        button.addEventListener(
          'click',
          () => {

            const productId =
              Number(
                (
                  button as HTMLButtonElement
                ).dataset.productId
              )

            const product =
              products.find(
                item =>
                  item.id ===
                  productId
              )

            if (!product) {
              return
            }

            const existingItem =
              cart.find(
                item =>
                  item.id ===
                  product.id
              )

            if (existingItem) {

              existingItem.quantity += 1

            } else {

              cart.push({
                ...product,
                quantity: 1
              })

            }

            renderCustomerOrder()
          }
        )

      }
    )


    document
    .querySelector(
      '#demo-open-cart'
    )
    ?.addEventListener(
      'click',
      () => {
  
        if (cart.length === 0) {
          return
        }
  
        renderCart()
      }
    )
  }
  
  
  /* =========================================
     장바구니
  ========================================= */
  
  function renderCart() {
  
    app.innerHTML = `
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
  
            ${cart
              .map(
                item => `
                  <article
                    class="demo-cart-item"
                  >
  
                    <div class="demo-cart-item-image">
                      <img
  src="${item.image}"
  alt="${item.name}"
  class="demo-cart-image"
/>
                    </div>
  
  
                    <div class="demo-cart-item-info">
  
                      <strong>
                        ${item.name}
                      </strong>
  
                      <span>
                        ${formatPrice(
                          item.price
                        )}
                      </span>
  
  
                      <div class="demo-cart-quantity">
  
                        <button
                          type="button"
                          data-cart-minus="${item.id}"
                        >
                          −
                        </button>
  
                        <strong>
                          ${item.quantity}
                        </strong>
  
                        <button
                          type="button"
                          data-cart-plus="${item.id}"
                        >
                          +
                        </button>
  
                      </div>
  
                    </div>
  
  
                    <button
                      type="button"
                      class="demo-cart-delete"
                      data-cart-delete="${item.id}"
                    >
                      삭제
                    </button>
  
                  </article>
                `
              )
              .join('')}
  
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
                ${getCartCount()}개
              </strong>
            </div>
  
            <div class="total">
              <span>
                결제금액
              </span>
  
              <strong>
                ${formatPrice(
                  getCartTotal()
                )}
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
              ${formatPrice(
                getCartTotal()
              )}
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
    `
  
  
    /* 메뉴로 돌아가기 */
  
    document
      .querySelector(
        '#demo-cart-back'
      )
      ?.addEventListener(
        'click',
        () => {
  
          renderCustomerOrder()
  
        }
      )
  
  
    /* 수량 감소 */
  
    document
      .querySelectorAll(
        '[data-cart-minus]'
      )
      .forEach(
        button => {
  
          button.addEventListener(
            'click',
            () => {
  
              const id =
                Number(
                  (
                    button as HTMLButtonElement
                  ).dataset.cartMinus
                )
  
              const item =
                cart.find(
                  cartItem =>
                    cartItem.id === id
                )
  
              if (!item) {
                return
              }
  
              item.quantity -= 1
  
              if (item.quantity <= 0) {
  
                const index =
                  cart.findIndex(
                    cartItem =>
                      cartItem.id === id
                  )
  
                if (index >= 0) {
                  cart.splice(
                    index,
                    1
                  )
                }
              }
  
              if (cart.length === 0) {
  
                renderCustomerOrder()
                return
  
              }
  
              renderCart()
            }
          )
  
        }
      )
  
  
    /* 수량 증가 */
  
    document
      .querySelectorAll(
        '[data-cart-plus]'
      )
      .forEach(
        button => {
  
          button.addEventListener(
            'click',
            () => {
  
              const id =
                Number(
                  (
                    button as HTMLButtonElement
                  ).dataset.cartPlus
                )
  
              const item =
                cart.find(
                  cartItem =>
                    cartItem.id === id
                )
  
              if (!item) {
                return
              }
  
              item.quantity += 1
  
              renderCart()
            }
          )
  
        }
      )
  
  
    /* 상품 삭제 */
  
    document
      .querySelectorAll(
        '[data-cart-delete]'
      )
      .forEach(
        button => {
  
          button.addEventListener(
            'click',
            () => {
  
              const id =
                Number(
                  (
                    button as HTMLButtonElement
                  ).dataset.cartDelete
                )
  
              const index =
                cart.findIndex(
                  item =>
                    item.id === id
                )
  
              if (index >= 0) {
  
                cart.splice(
                  index,
                  1
                )
  
              }
  
              if (cart.length === 0) {
  
                renderCustomerOrder()
                return
  
              }
  
              renderCart()
            }
          )
  
        }
      )
  
  
    /* 결제 버튼 */
  
    document
      .querySelector(
        '#demo-payment-start'
      )
      ?.addEventListener(
        'click',
        () => {
  
          const request =
            (
              document.querySelector<HTMLTextAreaElement>(
                '#demo-customer-request'
              )?.value || ''
            ).trim()
  
          sessionStorage.setItem(
            'nxg_demo_request',
            request
          )
  
          renderDemoPayment()
  
        }
      )
  }

  /* =========================================
   가상 결제
========================================= */

function renderDemoPayment() {

    const request =
      sessionStorage.getItem(
        'nxg_demo_request'
      ) || ''
  
    let selectedPaymentMethod =
      '카드'
  
    const renderPaymentScreen = () => {
  
      app.innerHTML = `
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
                ${formatPrice(
                  getCartTotal()
                )}
              </strong>
  
            </section>
  
  
            <section class="demo-pay-method">
  
              <h2>결제수단</h2>
  
              <div class="demo-pay-method-grid">
  
                <button
                  type="button"
                  data-demo-pay="카드"
                  class="${
                    selectedPaymentMethod ===
                    '카드'
                      ? 'active'
                      : ''
                  }"
                >
                  <span>💳</span>
                  카드결제
                </button>
  
                <button
                  type="button"
                  data-demo-pay="간편결제"
                  class="${
                    selectedPaymentMethod ===
                    '간편결제'
                      ? 'active'
                      : ''
                  }"
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
              ${formatPrice(
                getCartTotal()
              )} 가상 결제하기
            </button>
  
          </main>
  
        </div>
      `
  
  
      document
        .querySelector(
          '#demo-payment-back'
        )
        ?.addEventListener(
          'click',
          () => {
            renderCart()
          }
        )
  
  
      document
        .querySelectorAll(
          '[data-demo-pay]'
        )
        .forEach(
          button => {
  
            button.addEventListener(
              'click',
              () => {
  
                selectedPaymentMethod =
                  (
                    button as HTMLButtonElement
                  ).dataset.demoPay ||
                  '카드'
  
                renderPaymentScreen()
              }
            )
  
          }
        )
  
  
      document
        .querySelector(
          '#demo-fake-payment'
        )
        ?.addEventListener(
          'click',
          () => {
  
            const orderNumber =
              'DEMO-' +
              String(
                Date.now()
              ).slice(-6)
  
            const demoOrder = {
              orderNumber,
              items: cart.map(
                item => ({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  image: item.image
                })
              ),
              totalAmount:
                getCartTotal(),
              request,
              paymentMethod:
                selectedPaymentMethod,
              status: '접수',
              createdAt:
                new Date().toISOString()
            }
  
            localStorage.setItem(
              'nxg_store_demo_order',
              JSON.stringify(
                demoOrder
              )
            )
  
            renderPaymentComplete(
              demoOrder
            )
          }
        )
    }
  
    renderPaymentScreen()
  }
  
  
  /* =========================================
     결제 완료
  ========================================= */
  
  function renderPaymentComplete(
    order: any
  ) {
  
    app.innerHTML = `
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
              ${order.orderNumber}
            </strong>
            <br><br>
  
            결제금액<br>
            <strong>
              ${formatPrice(
                order.totalAmount
              )}
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
    `
  
  
    document
      .querySelector(
        '#demo-open-merchant'
      )
      ?.addEventListener(
        'click',
        () => {
  
            renderDemoMerchantOrders()
  
        }
      )
  }

  /* =========================================
   가맹점 모바일 주문관리 DEMO
========================================= */

function renderDemoMerchantOrders() {

    const savedOrder =
      localStorage.getItem(
        'nxg_store_demo_order'
      )
  
    if (!savedOrder) {
      renderStart()
      return
    }
  
    const order =
      JSON.parse(savedOrder)
  
    app.innerHTML = `
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
                ${formatPrice(
                  order.totalAmount
                )}
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
                  ${order.orderNumber}
                </strong>
              </div>
  
              <span
                id="demo-order-status"
                class="demo-order-status"
              >
                ${order.status}
              </span>
  
            </div>
  
  
            <div class="demo-merchant-items">
  
              ${order.items
                .map(
                  (item: any) => `
                    <div>
                      <span>
                        ${item.emoji}
                        ${item.name}
                      </span>
  
                      <strong>
                        ${item.quantity}개
                      </strong>
                    </div>
                  `
                )
                .join('')}
  
            </div>
  
  
            ${
              order.request
                ? `
                  <div class="demo-merchant-request">
  
                    <small>
                      고객 요청사항
                    </small>
  
                    <strong>
                      ${order.request}
                    </strong>
  
                  </div>
                `
                : ''
            }
  
  
            <div class="demo-merchant-total">
  
              <span>
                결제완료
              </span>
  
              <strong>
                ${formatPrice(
                  order.totalAmount
                )}
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
    `
  
    document
  .querySelector(
    '#demo-customer-call'
  )
  ?.addEventListener(
    'click',
    () => {

      const message =
        '주문하신 상품이 준비되었습니다. 픽업대로 와주세요.'

      const speech =
        new SpeechSynthesisUtterance(
          message
        )

      speech.lang = 'ko-KR'
      speech.rate = 1
      speech.pitch = 1
      speech.volume = 1

      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(
        speech
      )

      alert(
        '고객 호출을 실행했습니다.\n\nDEMO에서는 음성으로 호출을 체험합니다.'
      )

    }
  )
  
  document
  .querySelector(
    '#demo-order-complete'
  )
  ?.addEventListener(
    'click',
    () => {

      order.status =
        '완료'

      localStorage.setItem(
        'nxg_store_demo_order',
        JSON.stringify(order)
      )

      renderDemoComplete(
        order
      )
    }
  )
  }

  /* =========================================
   DEMO 체험 완료
========================================= */

function renderDemoComplete(
    order: any
  ) {
  
    app.innerHTML = `
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
                ${order.orderNumber}
              </strong>
            </div>
  
            <div>
              <span>
                결제금액
              </span>
  
              <strong>
                ${formatPrice(
                  order.totalAmount
                )}
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
    `
  
  
    document
      .querySelector(
        '#demo-restart'
      )
      ?.addEventListener(
        'click',
        () => {
  
          cart.splice(
            0,
            cart.length
          )
  
          selectedCategory =
            '전체'
  
          sessionStorage.removeItem(
            'nxg_demo_request'
          )
  
          localStorage.removeItem(
            'nxg_store_demo_order'
          )
  
          renderStart()
        }
      )
  }

renderStart()