import './style.css'
import { loadTossPayments } from '@tosspayments/payment-sdk'
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = "https://rnmptlxdeihvfwegoqnf.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJubXB0bHhkZWlodmZ3ZWdvcW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MzcwMDMsImV4cCI6MjA5NDIxMzAwM30.5SeOiuZgFmU7RUu5kzLpLBUwC91SYI3WxqRFoafMrG8"
const supabase = createClient(supabaseUrl, supabaseKey)
const clientKey = 'test_ck_LlDJaYngroaYkOqwzpPl3ezGdRpX'
const app = document.querySelector<HTMLDivElement>('#app')!
const path = window.location.pathname

if (path === '/success') {
  const params = new URLSearchParams(window.location.search)

  const orderId = params.get('orderId')
  const amount = params.get('amount')
  const paymentKey = params.get('paymentKey')
  const { error } = await supabase.from('payments').insert([
    {
      order_id: orderId,
      payment_key: paymentKey,
      amount: Number(amount),
      status: 'paid'
    }
  ])
  
  if (error) {
    alert('DB 저장 실패: ' + error.message)
    console.error(error)
  } else {
    alert('DB 저장 성공')
  }
  app.innerHTML = `
    <div class="page">
      <div class="payment-card">
        <h1>결제 성공</h1>
        <p>주문번호: ${orderId}</p>
        <p>결제금액: ${Number(amount).toLocaleString()}원</p>
        <p class="small-text">결제키: ${paymentKey}</p>
        <button id="home-button">처음으로</button>
      </div>
    </div>
  `

  document.querySelector<HTMLButtonElement>('#home-button')!
    .addEventListener('click', () => {
      window.location.href = '/'
    })
} else if (path === '/fail') {
  const params = new URLSearchParams(window.location.search)

  const code = params.get('code')
  const message = params.get('message')

  app.innerHTML = `
    <div class="page">
      <div class="payment-card">
        <h1>결제 실패</h1>
        <p>에러 코드: ${code}</p>
        <p>${message}</p>
        <button id="home-button">처음으로</button>
      </div>
    </div>
  `

  document.querySelector<HTMLButtonElement>('#home-button')!
    .addEventListener('click', () => {
      window.location.href = '/'
    })
} else {
  app.innerHTML = `
    <div class="page">
      <div class="payment-card">
        <h1>결제 테스트</h1>
        <p>상품명: 테스트 상품</p>
        <p>금액: 1,000원</p>
        <button id="pay-button">결제하기</button>
      </div>
    </div>
  `

  document.querySelector<HTMLButtonElement>('#pay-button')!
    .addEventListener('click', async () => {
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
}