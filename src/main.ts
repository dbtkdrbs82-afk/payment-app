import './style.css'
import { loadTossPayments } from '@tosspayments/payment-sdk'

const clientKey = 'test_ck_LlDJaYngroaYkOqwzpPl3ezGdRpX'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="page">
    <div class="payment-card">
      <h1>결제 테스트</h1>
      <p>상품명: 테스트 상품</p>
      <p>금액: 1,000원</p>
      <button id="pay-button">결제하기</button>
    </div>
  </div>
`

document.querySelector<HTMLButtonElement>('#pay-button')!.addEventListener('click', async () => {
  const tossPayments = await loadTossPayments(clientKey)

  await tossPayments.requestPayment('카드', {
    amount: 1000,
    orderId: 'order-' + Date.now(),
    orderName: '테스트 상품',
    customerName: '홍길동',
    successUrl: window.location.origin + '/success',
    failUrl: window.location.origin + '/fail',
  })
})
const path = window.location.pathname;

if (path === "/success") {
  const params = new URLSearchParams(window.location.search);

  const orderId = params.get("orderId");
  const amount = params.get("amount");

  document.querySelector("#app")!.innerHTML = `
    <div class="page">
      <div class="payment-card">
        <h1>결제 성공</h1>
        <p>주문번호: ${orderId}</p>
        <p>결제금액: ${amount}원</p>
        <button onclick="window.location.href='/'">
          처음으로
        </button>
      </div>
    </div>
  `;
}