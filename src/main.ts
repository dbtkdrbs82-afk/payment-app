import './style.css'
import { loadTossPayments } from '@tosspayments/payment-sdk'
import { createClient } from '@supabase/supabase-js'
import QRCode from 'qrcode'

const clientKey = 'test_ck_LlDJaYngroaYkOqwzpPl3ezGdRpX'

const supabaseUrl = 'https://rnmptlxdeihvfwegoqnf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJubXB0bHhkZWlodmZ3ZWdvcW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MzcwMDMsImV4cCI6MjA5NDIxMzAwM30.5SeOiuZgFmU7RUu5kzLpLBUwC91SYI3WxqRFoafMrG8'

const supabase = createClient(supabaseUrl, supabaseKey)
const app = document.querySelector<HTMLDivElement>('#app')!
const path = window.location.pathname

const isFuneral = path === '/funeral'
const receiverName = isFuneral ? '故 홍길동' : '김철수 ♥ 박영희'
const paymentTitle = isFuneral ? '부의금 보내기' : '축의금 보내기'
const messageLabel = isFuneral ? '추모 메시지' : '축하 메시지'

if (path === '/create') {
  app.innerHTML = `
    <div class="page">
      <div class="payment-card">
        <h1>행사 생성</h1>

        <div class="input-group">
          <label>행사 종류</label>
          <select id="event-type">
            <option value="wedding">결혼식</option>
            <option value="funeral">장례식</option>
          </select>
        </div>

        <div class="input-group">
          <label>이름 입력</label>
          <input id="receiver-name" type="text" placeholder="김철수 ♥ 박영희 / 故 홍길동">
        </div>

        <button id="create-event-button">행사 생성</button>
        <div id="result-link"></div>
      </div>
    </div>
  `

  document.querySelector<HTMLButtonElement>('#create-event-button')!
    .addEventListener('click', async () => {
      const eventType = (
        document.querySelector<HTMLSelectElement>('#event-type')!
      ).value

      const receiverNameInput = (
        document.querySelector<HTMLInputElement>('#receiver-name')!
      ).value

      if (!receiverNameInput) {
        alert('이름을 입력해주세요')
        return
      }

      const paymentTitleValue =
        eventType === 'funeral' ? '부의금 보내기' : '축의금 보내기'

      const { data, error } = await supabase
        .from('events')
        .insert([
          {
            event_type: eventType,
            receiver_name: receiverNameInput,
            payment_title: paymentTitleValue
          }
        ])
        .select()

      if (error) {
        alert('행사 생성 실패: ' + error.message)
        return
      }

      const eventId = data[0].id
      const eventLink = `${window.location.origin}/${eventType}?id=${eventId}`

      document.querySelector<HTMLDivElement>('#result-link')!.innerHTML = `
        <p>생성 완료</p>
        <a href="${eventLink}" target="_blank">${eventLink}</a>
      `
    })

} else if (path === '/admin') {
  app.innerHTML = `
    <div class="page">
      <div class="admin-card">
        <h1>관리자 페이지</h1>
        <p>결제내역을 불러오는 중...</p>
        <div id="payment-list"></div>

        <h2>QR 결제</h2>
        <canvas id="qr-canvas"></canvas>

        <button id="home-button">결제 페이지로</button>
      </div>
    </div>
  `

  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .order('created_at', { ascending: false })

  const list = document.querySelector<HTMLDivElement>('#payment-list')!

  if (error) {
    list.innerHTML = `<p>결제내역 불러오기 실패: ${error.message}</p>`
  } else if (!data || data.length === 0) {
    list.innerHTML = `<p>아직 결제내역이 없습니다.</p>`
  } else {
    list.innerHTML = data.map((payment) => `
      <div class="payment-row">
        <p><strong>주문번호:</strong> ${payment.order_id}</p>
        <p><strong>금액:</strong> ${Number(payment.amount).toLocaleString()}원</p>
        <p><strong>상태:</strong> ${payment.status}</p>
        <p><strong>시간:</strong> ${new Date(payment.created_at).toLocaleString()}</p>
      </div>
    `).join('')
  }

  const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement

  await QRCode.toCanvas(
    canvas,
    window.location.origin,
    { width: 250 }
  )

  document.querySelector<HTMLButtonElement>('#home-button')!
    .addEventListener('click', () => {
      window.location.href = '/'
    })

} else if (path === '/success') {
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
        <button id="admin-button">관리자 페이지</button>
      </div>
    </div>
  `

  document.querySelector<HTMLButtonElement>('#home-button')!
    .addEventListener('click', () => {
      window.location.href = '/'
    })

  document.querySelector<HTMLButtonElement>('#admin-button')!
    .addEventListener('click', () => {
      window.location.href = '/admin'
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
      <div class="payment-card ${isFuneral ? 'funeral-card' : 'wedding-card'}">
        <h1>${receiverName}</h1>
        <p>${paymentTitle}</p>

        <div class="input-group">
          <label>보낼 금액</label>
          <input id="amount-input" type="number" placeholder="금액 입력">
        </div>

        <div class="input-group">
          <label>보내는 사람 이름</label>
          <input id="name-input" type="text" placeholder="이름 입력">
        </div>

        <div class="input-group">
          <label>${messageLabel}</label>
          <input id="message-input" type="text" placeholder="${messageLabel} 입력">
        </div>

        <button id="pay-button">결제하기</button>
        <button id="admin-button">관리자 페이지</button>
      </div>
    </div>
  `

  document.querySelector<HTMLButtonElement>('#pay-button')!
    .addEventListener('click', async () => {
      const amountInput = document.querySelector<HTMLInputElement>('#amount-input')!
      const nameInput = document.querySelector<HTMLInputElement>('#name-input')!

      const amountValue = Number(amountInput.value)
      const customerNameValue = nameInput.value

      if (!amountValue || !customerNameValue) {
        alert('금액과 이름을 입력해주세요')
        return
      }

      const tossPayments = await loadTossPayments(clientKey)

      await tossPayments.requestPayment('카드', {
        amount: amountValue,
        orderId: 'order-' + Date.now(),
        orderName: paymentTitle,
        customerName: customerNameValue,
        successUrl: window.location.origin + '/success',
        failUrl: window.location.origin + '/fail',
      })
    })

  document.querySelector<HTMLButtonElement>('#admin-button')!
    .addEventListener('click', () => {
      window.location.href = '/admin'
    })
}