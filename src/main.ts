import './style.css'
import { loadTossPayments } from '@tosspayments/payment-sdk'
import { createClient } from '@supabase/supabase-js'
import QRCode from 'qrcode'

const clientKey = 'test_ck_LlDJaYngroaYkOqwzpPl3ezGdRpX'
const adminPassword = '1234'
const adminSecondCode = '5678'

const supabaseUrl = 'https://rnmptlxdeihvfwegoqnf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJubXB0bHhkZWlodmZ3ZWdvcW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MzcwMDMsImV4cCI6MjA5NDIxMzAwM30.5SeOiuZgFmU7RUu5kzLpLBUwC91SYI3WxqRFoafMrG8'

const supabase = createClient(supabaseUrl, supabaseKey)
const app = document.querySelector<HTMLDivElement>('#app')!
const path = window.location.pathname

const isFuneral = path.includes('funeral')

const params = new URLSearchParams(window.location.search)
const eventId = params.get('id')

let receiverName = isFuneral ? '故 홍길동' : '김철수 ♥ 박영희'
let paymentTitle = isFuneral ? '부의금 보내기' : '축의금 보내기'
let messageLabel = isFuneral ? '추모 메시지' : '축하 메시지'

if (eventId) {
  const { data } = await supabase
    .from('events')
    .select('*')
    .eq('id', eventId)
    .single()

  if (data) {
    receiverName = data.receiver_name
    paymentTitle = data.payment_title
    messageLabel =
      data.event_type === 'funeral'
        ? '추모 메시지'
        : '축하 메시지'
  }
}

if (path === '/create') {
  app.innerHTML = `
    <div class="page">
      <div class="payment-card ${isFuneral ? 'funeral-card' : 'wedding-card'}">
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
<div class="input-group">
  <label>은행명</label>
  <input id="bank-name" type="text" placeholder="예: 국민은행">
</div>

<div class="input-group">
  <label>계좌번호</label>
  <input id="account-number" type="text" placeholder="계좌번호 입력">
</div>

<div class="input-group">
  <label>예금주</label>
  <input id="account-holder" type="text" placeholder="예금주 입력">
</div>
        <button id="create-event-button">행사 생성</button>
        <div id="result-link"></div>
      </div>
    </div>
  `

  document.querySelector<HTMLButtonElement>('#create-event-button')!
    .addEventListener('click', async () => {
      const eventType = document.querySelector<HTMLSelectElement>('#event-type')!.value
      const receiverNameInput = document.querySelector<HTMLInputElement>('#receiver-name')!.value
      const bankName = document.querySelector<HTMLInputElement>('#bank-name')!.value
      const accountNumber = document.querySelector<HTMLInputElement>('#account-number')!.value
      const accountHolder = document.querySelector<HTMLInputElement>('#account-holder')!.value

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
            payment_title: paymentTitleValue,
            bank_name: bankName,
            account_number: accountNumber,
            account_holder: accountHolder,
            settlement_status: '정산 대기'
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
        <a href="${eventLink}" target="_blank">
  결제 링크 열기
</a>
        <button id="copy-link-button">링크 복사</button>
        <button id="sms-link-button">문자로 보내기</button>
        <button id="kakao-link-button">카카오 공유</button>
      `
      document.querySelector<HTMLInputElement>('#receiver-name')!.value = ''
      document.querySelector<HTMLInputElement>('#bank-name')!.value = ''
      document.querySelector<HTMLInputElement>('#account-number')!.value = ''
      document.querySelector<HTMLInputElement>('#account-holder')!.value = ''

      document.querySelector<HTMLButtonElement>('#copy-link-button')!
        .addEventListener('click', async () => {
          await navigator.clipboard.writeText(eventLink)
          alert('링크가 복사되었습니다')
        })

      document.querySelector<HTMLButtonElement>('#sms-link-button')!
        .addEventListener('click', () => {
          window.location.href = `sms:?body=${encodeURIComponent(eventLink)}`
        })

      document.querySelector<HTMLButtonElement>('#kakao-link-button')!
        .addEventListener('click', () => {
          const kakaoShareUrl =
            'https://share.kakao.com/talk/friends/picker/link?url=' +
            encodeURIComponent(eventLink)

          window.open(kakaoShareUrl, '_blank')
        })
    })

  } else if (path === '/admin') {
    const savedAdminLogin = localStorage.getItem('adminLogin')
  
    if (savedAdminLogin !== 'true') {
      app.innerHTML = `
        <div class="page">
          <div class="payment-card">
            <h1>관리자 로그인</h1>
  
            <div class="input-group">
              <label>비밀번호</label>
              <input id="admin-password" type="password" placeholder="비밀번호 입력">
            </div>
  <div class="input-group">
  <label>2차 인증코드</label>
  <input id="admin-second-code" type="password" placeholder="2차 코드 입력">
</div>
            <button id="admin-login-button">로그인</button>
          </div>
        </div>
      `
  
      document.querySelector<HTMLButtonElement>('#admin-login-button')!
        .addEventListener('click', () => {
          const passwordInput = document.querySelector<HTMLInputElement>('#admin-password')!.value
          const secondCodeInput = document.querySelector<HTMLInputElement>('#admin-second-code')!.value
          if (
            passwordInput === adminPassword &&
            secondCodeInput === adminSecondCode
          ) { 
            localStorage.setItem('adminLogin', 'true')
            window.location.reload()
          } else {
            alert('비밀번호가 틀렸습니다')
          }
        })
  
    } else {
      app.innerHTML = `
        <div class="page">
          <div class="admin-card">
            <h1>관리자 페이지</h1>
            <div id="settlement-box"></div>
            <p>결제내역을 불러오는 중...</p>
            <div id="payment-list"></div>
            
            <h2>생성된 행사 목록</h2>
<div id="event-list"></div>
  
            <h2>QR 결제</h2>
            <canvas id="qr-canvas"></canvas>
  
            <button id="home-button">결제 페이지로</button>
            <button id="logout-button">로그아웃</button>
          </div>
        </div>
      `
  
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false })
  
      const list = document.querySelector<HTMLDivElement>('#payment-list')!
      const eventList = document.querySelector<HTMLDivElement>('#event-list')!
      if (error) {
        list.innerHTML = `<p>결제내역 불러오기 실패: ${error.message}</p>`
      } else if (!data || data.length === 0) {
        list.innerHTML = `<p>아직 결제내역이 없습니다.</p>`
      } else {
        const totalAmount = data.reduce((sum, payment) => {
          return sum + Number(payment.amount)
        }, 0)
        
        const platformFeeRate = 0.02
        const platformFee = Math.floor(totalAmount * platformFeeRate)
        const settlementAmount = totalAmount - platformFee
        
        document.querySelector<HTMLDivElement>('#settlement-box')!.innerHTML = `
          <div class="settlement-box">
            <h2>정산 요약</h2>
            <p><strong>총 결제금액:</strong> ${totalAmount.toLocaleString()}원</p>
            <p><strong>플랫폼 수수료 2%:</strong> ${platformFee.toLocaleString()}원</p>
            <p><strong>예상 정산금액:</strong> ${settlementAmount.toLocaleString()}원</p>
          </div>
        ` 
        list.innerHTML = `
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>주문번호</th>
                <th>금액</th>
                <th>상태</th>
                <th>결제시간</th>
              </tr>
            </thead>
            <tbody>
              ${data.map((payment) => `
                <tr>
                  <td>${payment.order_id}</td>
                  <td>${Number(payment.amount).toLocaleString()}원</td>
                  <td>${payment.status}</td>
                  <td>${new Date(payment.created_at).toLocaleString('ko-KR')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `
      const { data: eventData, error: eventError } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (eventError) {
      eventList.innerHTML = `<p>행사 목록 불러오기 실패</p>`
    } else if (!eventData || eventData.length === 0) {
      eventList.innerHTML = `<p>생성된 행사가 없습니다.</p>`
    } else {
      eventList.innerHTML = `
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>행사명</th>
              <th>종류</th>
              <th>총 결제금액</th>
              <th>수수료</th>
              <th>정산금액</th>
              <th>은행명</th>
              <th>계좌번호</th>
              <th>예금주</th>
              <th>정산상태</th>
              <th>링크</th>
              <th>처리</th>
            </tr>
          </thead>
          <tbody>
            ${eventData.map((event) => {
              const eventPayments = (data || []).filter(
                (payment) => payment.event_id === event.id
              )
    
              const eventTotal = eventPayments.reduce((sum, payment) => {
                return sum + Number(payment.amount)
              }, 0)
    
              const eventFee = Math.floor(eventTotal * 0.02)
              const eventSettlement = eventTotal - eventFee
    
              const eventLink =
                `${window.location.origin}/${event.event_type}?id=${event.id}`
    
              return `
                <tr>
                  <td>${event.receiver_name}</td>
                  <td>${event.event_type === 'funeral' ? '장례식' : '결혼식'}</td>
                  <td>${eventTotal.toLocaleString()}원</td>
                  <td>${eventFee.toLocaleString()}원</td>
                  <td>${eventSettlement.toLocaleString()}원</td>
                  <td>${event.bank_name || '-'}</td>
                  <td>${event.account_number || '-'}</td>
                  <td>${event.account_holder || '-'}</td>
                  <td>${event.settlement_status || '정산 대기'}</td>
                  <td>
                    <a href="${eventLink}" target="_blank">열기</a>
                  </td>
                  <td>
                    <button class="settlement-button" data-id="${event.id}">
                      완료
                    </button>
                  </td>
                </tr>
              `
            }).join('')}
          </tbody>
        </table>
      </div>
    `   

    document.querySelectorAll('.settlement-button').forEach((button) => {
      button.addEventListener('click', async (e) => {
        const eventId = (e.target as HTMLElement).getAttribute('data-id')
    
        const { error } = await supabase
          .from('events')
          .update({
            settlement_status: '정산 완료'
          })
          .eq('id', eventId)
    
        if (error) {
          alert('정산 처리 실패')
          return
        }
    
        alert('정산 완료 처리되었습니다')
        window.location.reload()
      })
    })
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
  
      document.querySelector<HTMLButtonElement>('#logout-button')!
        .addEventListener('click', () => {
          localStorage.removeItem('adminLogin')
          window.location.reload()
        })
    }

} else if (path === '/success') {
  const params = new URLSearchParams(window.location.search)

  const orderId = params.get('orderId')
  const amount = params.get('amount')
  const paymentKey = params.get('paymentKey')
  const eventId = sessionStorage.getItem('currentEventId')
  const { error } = await supabase.from('payments').insert([
    {
      order_id: orderId,
      payment_key: paymentKey,
      amount: Number(amount),
      status: 'paid',
      event_id: eventId ? Number(eventId) : null
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

        <p class="secure-text">
  안전한 결제 시스템으로 보호됩니다
</p>
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
      sessionStorage.setItem('currentEventId', eventId || '')
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