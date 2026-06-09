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
const { data: menuData } = await supabase
  .from('menus')
  .select('*')
  .eq('event_id', Number(eventId))

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

if (path === '/customer') {
  app.innerHTML = `
    <div class="page">
      <div class="payment-card">
        <h1>입금 현황 확인</h1>

        <div class="input-group">
          <label>이름</label>
          <input id="customer-name" type="text" placeholder="이름 입력">
        </div>

        <div class="input-group">
          <label>생년월일</label>
          <input id="customer-birth" type="text" placeholder="예: 1990-01-01">
        </div>

        <div class="input-group">
        <label>고객 확인 비밀번호</label>
<input id="customer-code-login" type="text" placeholder="비밀번호 입력">  
        </div>

        <button id="customer-login-button">확인하기</button>

        <div id="customer-result"></div>
      </div>
    </div>
  `

  document.querySelector<HTMLButtonElement>('#customer-login-button')!
    .addEventListener('click', async () => {
      const name = document.querySelector<HTMLInputElement>('#customer-name')!.value
      const birth = document.querySelector<HTMLInputElement>('#customer-birth')!.value
      const code = document.querySelector<HTMLInputElement>('#customer-code-login')!.value

      if (!name || !birth || !code) {
        alert('이름, 생년월일, 행사 코드를 입력해주세요')
        return
      }

      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('*')
        .eq('receiver_name', name)
        .eq('birth_date', birth)
        .eq('customer_code', code)
        .single()

      const resultBox = document.querySelector<HTMLDivElement>('#customer-result')!

      if (eventError || !eventData) {
        resultBox.innerHTML = `<p>일치하는 행사를 찾을 수 없습니다.</p>`
        return
      }

      const { data: paymentData, error: paymentError } = await supabase
        .from('payments')
        .select('*')
        .eq('event_id', eventData.id)

      if (paymentError) {
        resultBox.innerHTML = `<p>입금 내역을 불러오지 못했습니다.</p>`
        return
      }

      const totalAmount = (paymentData || []).reduce((sum, payment) => {
        return sum + Number(payment.amount)
      }, 0)

      const fee = Math.floor(totalAmount * 0.02)
      const settlementAmount = totalAmount - fee

      resultBox.innerHTML = `
        <div class="create-result-card">
          <h2>${eventData.receiver_name}</h2>
          <p><strong>행사 종류:</strong> ${eventData.event_type === 'funeral' ? '장례식' : '결혼식'}</p>
          <p><strong>총 입금액:</strong> ${totalAmount.toLocaleString()}원</p>
          <p><strong>결제 건수:</strong> ${(paymentData || []).length}건</p>
<p><strong>예상 정산금액:</strong> ${settlementAmount.toLocaleString()}원</p>
<p><strong>정산 상태:</strong> ${eventData.settlement_status || '정산 대기'}</p>

<button id="message-view-button" class="message-view-button">
  메시지 확인
</button>

<button id="ledger-download-button" class="message-view-button">
  장부 다운로드
</button>

<div id="message-popup-content" style="display:none;">
  <div class="admin-table-wrap">
    <table class="admin-table">
    <thead>
      <tr>
        <th>보낸 사람</th>
        <th>금액</th>
        <th>메시지</th>
        <th>결제시간</th>
      </tr>
    </thead>

    <tbody>
      ${(paymentData || []).map((payment) => `
        <tr>
          <td>${payment.sender_name || '익명'}</td>
          <td>${Number(payment.amount).toLocaleString()}원</td>
          <td>${payment.message || '-'}</td>
          <td>${new Date(payment.created_at).toLocaleString('ko-KR')}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
</div>
</div>
`

document.querySelector<HTMLButtonElement>('#message-view-button')!
  .addEventListener('click', () => {
    document.querySelector<HTMLButtonElement>('#ledger-download-button')!
    .addEventListener('click', () => {
  
      const rows = [
        ['보낸 사람', '금액', '메시지', '결제시간'],
  
        ...(paymentData || []).map((payment) => [
          payment.sender_name || '익명',
          Number(payment.amount).toLocaleString() + '원',
          payment.message || '-',
          new Date(payment.created_at).toLocaleString('ko-KR')
        ])
      ]
  
      const csvContent = rows
        .map((row) => row.map((cell) => `"${cell}"`).join(','))
        .join('\n')
  
      const blob = new Blob(
        ['\uFEFF' + csvContent],
        { type: 'text/csv;charset=utf-8;' }
      )
  
      const link = document.createElement('a')
  
      link.href = URL.createObjectURL(blob)
      link.download =
        `${eventData.receiver_name}-입금장부.csv`
  
      link.click()
    })

    const content =
      document.querySelector<HTMLDivElement>('#message-popup-content')!.innerHTML

    const popup = window.open('', '_blank', 'width=900,height=700')

    if (!popup) {
      alert('팝업이 차단되었습니다.')
      return
    }

    popup.document.write(`
      <html>
        <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>payment-app</title>
</head>
          <title>메시지 확인</title>

          <style>
            body {
              font-family: sans-serif;
              padding: 30px;
              background: #f9fafb;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              background: white;
            }

            th, td {
              border: 1px solid #ddd;
              padding: 12px;
              text-align: center;
            }

            th {
              background: #f3f4f6;
            }
          </style>
        </head>

<body>
  <h1>메시지 확인</h1>

  <input
    id="ledger-search"
    placeholder="보낸 사람 검색"
    style="width:100%;padding:14px;margin-bottom:20px;border:1px solid #ddd;border-radius:10px;"
  >

  ${content}

  <script>
    const searchInput = document.getElementById('ledger-search')

    searchInput.addEventListener('input', () => {
      const keyword = searchInput.value.toLowerCase()
      const rows = document.querySelectorAll('tbody tr')

      rows.forEach((row) => {
        const name = row.children[0].textContent.toLowerCase()
        row.style.display = name.includes(keyword) ? '' : 'none'
      })
    })
  </script>
  
</body>
</html>
`)

    popup.document.close()
  })

})

} else if (path === '/pay') {
  const params = new URLSearchParams(window.location.search)

  const merchantId = params.get('merchantId') || ''
  const merchantName = params.get('merchantName') || ''
  const productName = params.get('productName') || ''
  const amount = params.get('amount') || ''

  app.innerHTML = `
    <div class="page">
      <div class="payment-card">
        <h1>결제하기</h1>

        <p><strong>가맹점:</strong> ${merchantName}</p>
        <p><strong>상품명:</strong> ${productName}</p>
        <p><strong>결제금액:</strong> ${Number(amount).toLocaleString()}원</p>

        <button id="pay-button">결제하기</button>
      </div>
    </div>
  `

  document.querySelector<HTMLButtonElement>('#pay-button')!
    .addEventListener('click', async () => {
      const tossPayments = await loadTossPayments(clientKey)

      sessionStorage.setItem('merchantId', merchantId)
      sessionStorage.setItem('merchantName', merchantName)

      await tossPayments.requestPayment('카드', {
        amount: Number(amount),
        orderId: 'order-' + Date.now(),
        orderName: productName,
        customerName: merchantName,
        successUrl:
  window.location.origin +
  '/success?merchantId=' +
  merchantId +
  '&merchantName=' +
  encodeURIComponent(merchantName),
        failUrl: window.location.origin + '/fail',
      })
    })

} else if (path === '/payment-link-create') {
  const { data: merchantData, error: merchantError } = await supabase
    .from('merchants')
    .select('*')
    .order('id', { ascending: true })

  if (merchantError) {
    app.innerHTML = `<p>가맹점 목록을 불러오지 못했습니다.</p>`
  } else {
    app.innerHTML = `
      <div class="page">
        <div class="payment-card">
          <h1>결제링크 생성</h1>

          <div class="input-group">
            <label>가맹점 선택</label>
            <select id="link-merchant-select">
              ${(merchantData || []).map((merchant) => `
                <option
                  value="${merchant.id}"
                  data-name="${merchant.merchant_name}"
                >
                  ${merchant.merchant_id || 'MER' + String(merchant.id).padStart(4, '0')} / ${merchant.merchant_name}
                </option>
              `).join('')}
            </select>
          </div>

          <div class="input-group">
            <label>상품명</label>
            <input id="link-product-name" type="text" placeholder="예: 테스트 상품">
          </div>

          <div class="input-group">
            <label>결제금액</label>
            <input id="link-amount" type="number" placeholder="예: 10000">
          </div>

          <button id="create-payment-link-button">결제링크 생성</button>

          <div id="payment-link-result"></div>
        </div>
      </div>
    `

    document.querySelector<HTMLButtonElement>('#create-payment-link-button')!
      .addEventListener('click', () => {
        const merchantSelect =
          document.querySelector<HTMLSelectElement>('#link-merchant-select')!

        const merchantId = merchantSelect.value
        const merchantName =
          merchantSelect.selectedOptions[0].getAttribute('data-name') || ''

        const productName =
          document.querySelector<HTMLInputElement>('#link-product-name')!.value

        const amount =
          document.querySelector<HTMLInputElement>('#link-amount')!.value

        if (!merchantId || !productName || !amount) {
          alert('가맹점, 상품명, 금액을 입력해주세요')
          return
        }

        const paymentLink =
          `${window.location.origin}/pay?merchantId=${merchantId}&merchantName=${encodeURIComponent(merchantName)}&productName=${encodeURIComponent(productName)}&amount=${amount}`

        document.querySelector<HTMLDivElement>('#payment-link-result')!.innerHTML = `
          <div class="create-result-card">
            <h2>결제링크 생성 완료</h2>
            <p>${merchantName}</p>
            <p>${Number(amount).toLocaleString()}원</p>

            <a class="result-link-button" href="${paymentLink}" target="_blank">
              결제 링크 열기
            </a>

            <button id="copy-payment-link-button">링크 복사</button>
          </div>
        `

        document.querySelector<HTMLButtonElement>('#copy-payment-link-button')!
          .addEventListener('click', async () => {
            await navigator.clipboard.writeText(paymentLink)
            alert('결제링크가 복사되었습니다')
          })
      })
  }

} else if (path === '/voice-call') {
  app.innerHTML = `
    <div class="page">
      <div class="payment-card">
        <h1>음성 고객 호출</h1>

        <p id="voice-result">마이크 버튼을 누르고 말해주세요.</p>

        <button id="voice-start-button">🎤 말하기</button>
        <button id="test-call-button">34번 테스트 호출</button>
      </div>
    </div>
  `

  const speak = (text: string) => {
    const message = new SpeechSynthesisUtterance(text)
    message.lang = 'ko-KR'
    window.speechSynthesis.speak(message)
  }

  document.querySelector<HTMLButtonElement>('#test-call-button')!
    .addEventListener('click', () => {
      speak('삼십사번 고객님 주문 나왔습니다.')
    
    })

  document.querySelector<HTMLButtonElement>('#voice-start-button')!
    .addEventListener('click', () => {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition

      if (!SpeechRecognition) {
        alert('크롬 브라우저에서 테스트해주세요.')
        return
      }

      const recognition = new SpeechRecognition()
      recognition.lang = 'ko-KR'
      recognition.start()

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript

        document.querySelector<HTMLParagraphElement>('#voice-result')!.innerText =
          '인식된 말: ' + text

        const numberMatch = text.match(/[0-9]+/)

        if (!numberMatch) {
          speak('번호를 찾지 못했습니다.')
          return
        }

        const orderNumber = numberMatch[0]

        const numberToKorean = (num: number) => {
          const tens = Math.floor(num / 10)
          const ones = num % 10
        
          const tenText = ['', '십', '이십', '삼십', '사십', '오십', '육십', '칠십', '팔십', '구십']
          const oneText = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구']
        
          return tenText[tens] + oneText[ones]
        }
        const message =
  numberToKorean(Number(orderNumber)) +
  '번 고객님 주문 나왔습니다.'

speak(message)

setTimeout(() => {
  speak(message)
}, 5000)
      }
    })

} else if (path === '/shop') {
  const params = new URLSearchParams(window.location.search)
  const merchantId = params.get('id')

  const { data: merchantData, error: merchantError } = await supabase
    .from('merchants')
    .select('*')
    .eq('id', Number(merchantId))
    .single()

  const { data: productData, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('merchant_id', Number(merchantId))
    .eq('status', '판매중')
    .order('id', { ascending: true })

  if (merchantError || productError || !merchantData) {
    app.innerHTML = `<p>상점 정보를 불러오지 못했습니다.</p>`
  } else {
    app.innerHTML = `
      <div class="page">
        <div class="payment-card">
          <h1>${merchantData.merchant_name}</h1>
          <p>상품을 선택해주세요</p>

          <div class="menu-list">
            ${(productData || []).map((product) => `
              <div class="menu-card">
                ${
                  product.image_url
                    ? `<img src="${product.image_url}" alt="${product.product_name}">`
                    : ''
                }

                <h3>${product.product_name}</h3>
                <p>${Number(product.price).toLocaleString()}원</p>

                <button
                  class="shop-product-button"
                  data-name="${product.product_name}"
                  data-price="${product.price}"
                >
                  선택
                </button>
              </div>
            `).join('')}
          </div>

          <div class="input-group">
            <label>선택 상품</label>
            <input id="shop-selected-product" type="text" readonly>
          </div>

          <div class="input-group">
            <label>결제금액</label>
            <input id="shop-selected-amount" type="number" readonly>
          </div>

          <button id="shop-pay-button">결제하기</button>
        </div>
      </div>
    `

    const cart: {
      name: string
      price: number
      quantity: number
    }[] = []
    
    const renderCart = () => {
      const cartText = cart
        .map((item) => `${item.name} x ${item.quantity}`)
        .join(', ')
    
      const totalAmount = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity
      }, 0)
    
      document.querySelector<HTMLInputElement>('#shop-selected-product')!.value =
        cartText
    
      document.querySelector<HTMLInputElement>('#shop-selected-amount')!.value =
        String(totalAmount)
    }
    
    document.querySelectorAll('.shop-product-button')
      .forEach((button) => {
        button.addEventListener('click', () => {
          const name =
            (button as HTMLElement).getAttribute('data-name') || ''
    
          const price =
            Number((button as HTMLElement).getAttribute('data-price') || 0)
    
          const existingItem = cart.find((item) => item.name === name)
    
          if (existingItem) {
            existingItem.quantity += 1
          } else {
            cart.push({
              name,
              price,
              quantity: 1
            })
          }
    
          renderCart()
        })
      })
    
    document.querySelector<HTMLButtonElement>('#shop-pay-button')!
      .addEventListener('click', async () => {
        const totalAmount = cart.reduce((sum, item) => {
          return sum + item.price * item.quantity
        }, 0)
    
        const orderName = cart
          .map((item) => `${item.name} x ${item.quantity}`)
          .join(', ')
    
        if (cart.length === 0 || totalAmount === 0) {
          alert('상품을 선택해주세요')
          return
        }
    
        const tossPayments = await loadTossPayments(clientKey)
    
        sessionStorage.setItem('merchantId', String(merchantData.id))
        sessionStorage.setItem('merchantName', merchantData.merchant_name)
        sessionStorage.setItem('message', orderName)
    
        await tossPayments.requestPayment('카드', {
          amount: totalAmount,
          orderId: 'order-' + Date.now(),
          orderName: orderName,
          customerName: merchantData.merchant_name,
          successUrl:
            window.location.origin +
            '/success?merchantId=' +
            merchantData.id +
            '&merchantName=' +
            encodeURIComponent(merchantData.merchant_name),
          failUrl: window.location.origin + '/fail',
        })
      })
  }

} else if (path === '/product-create') {
  const { data: merchantData, error: merchantError } = await supabase
    .from('merchants')
    .select('*')
    .order('id', { ascending: true })

  if (merchantError) {
    app.innerHTML = `<p>가맹점 목록을 불러오지 못했습니다.</p>`
  } else {
    app.innerHTML = `
      <div class="page">
        <div class="payment-card">
          <h1>상품 등록</h1>

          <div class="input-group">
            <label>가맹점 선택</label>
            <select id="product-merchant-select">
              ${(merchantData || []).map((merchant) => `
                <option value="${merchant.id}">
                  ${merchant.merchant_id || 'MER' + String(merchant.id).padStart(4, '0')} / ${merchant.merchant_name}
                </option>
              `).join('')}
            </select>
          </div>

          <div class="input-group">
            <label>상품명</label>
            <input id="product-name" type="text" placeholder="예: 아메리카노">
          </div>

          <div class="input-group">
            <label>가격</label>
            <input id="product-price" type="number" placeholder="예: 4500">
          </div>

          <div class="input-group">
            <label>이미지 URL</label>
            <input id="product-image-url" type="text" placeholder="상품 이미지 주소">
          </div>

          <button id="product-create-button">상품 등록</button>

          <div id="product-result"></div>
        </div>
      </div>
    `

    document.querySelector<HTMLButtonElement>('#product-create-button')!
      .addEventListener('click', async () => {
        const merchantId =
  sessionStorage.getItem('login_merchant_id')

  const productName =
  document.querySelector<HTMLInputElement>('#product-name')!.value

        const price =
          Number(document.querySelector<HTMLInputElement>('#product-price')!.value)

        const imageUrl =
          document.querySelector<HTMLInputElement>('#product-image-url')!.value

        if (!merchantId || !productName || !price) {
          alert('가맹점, 상품명, 가격을 입력해주세요')
          return
        }

        const { error } = await supabase
          .from('products')
          .insert([
            {
              merchant_id: Number(merchantId),
              product_name: productName,
              price: price,
              image_url: imageUrl
            }
          ])

        const resultBox =
          document.querySelector<HTMLDivElement>('#product-result')!

        if (error) {
          resultBox.innerHTML = `<p>상품 등록 실패: ${error.message}</p>`
          return
        }

        resultBox.innerHTML = `<p>상품 등록 완료</p>`
      })
  }

} else if (path === '/merchant-create') {
  app.innerHTML = `
    <div class="page">
      <div class="payment-card">
        <h1>가맹점 등록</h1>

        <div class="input-group">
          <label>상호명</label>
          <input id="business-name" type="text" placeholder="예: 홍길동 푸드트럭">
        </div>

        <div class="input-group">
          <label>대표자명</label>
          <input id="owner-name" type="text" placeholder="대표자명 입력">
        </div>

        <div class="input-group">
          <label>연락처</label>
          <input id="merchant-phone" type="text" placeholder="010-0000-0000">
        </div>

        <div class="input-group">
  <label>사업자번호</label>
  <input id="business-number" type="text" placeholder="사업자번호 입력">
</div>

<div class="input-group">
  <label>이메일</label>
  <input id="merchant-email" type="text" placeholder="이메일 입력">
</div>

<div class="input-group">
  <label>우편번호</label>
  <input id="merchant-zipcode" type="text" placeholder="우편번호">
</div>

<div class="input-group">
  <label>주소</label>
  <input id="merchant-address" type="text" placeholder="기본주소">
</div>

<div class="input-group">
  <label>상세주소</label>
  <input id="merchant-address-detail" type="text" placeholder="상세주소">
</div>

<div class="input-group">
  <label>CPID</label>
  <input id="merchant-cpid" type="text" placeholder="예: MER0001">
</div>

<div class="input-group">
  <label>PG MID</label>
  <input id="merchant-pg-mid" type="text" placeholder="PG MID">
</div>

<div class="input-group">
  <label>단말기 MID</label>
  <input id="merchant-terminal-mid" type="text" placeholder="단말기 MID">
</div>

<div class="input-group">
  <label>개통일자</label>
  <input id="merchant-opened-at" type="date">
</div>

        <div class="input-group">
          <label>은행명</label>
          <input id="merchant-bank" type="text" placeholder="예: 국민은행">
        </div>

        <div class="input-group">
          <label>계좌번호</label>
          <input id="merchant-account" type="text" placeholder="계좌번호 입력">
        </div>

        <div class="input-group">
          <label>예금주</label>
          <input id="merchant-account-holder" type="text" placeholder="예금주 입력">
        </div>

        <div class="input-group">
          <label>수수료율 (%)</label>
          <input id="merchant-fee-rate" type="number" value="2">
        </div>

        <div class="input-group">
          <label>정산주기</label>
          <select id="settlement-cycle">
            <option value="D+1">D+1</option>
            <option value="D+4">D+4</option>
          </select>
        </div>

        <button id="merchant-create-button">가맹점 등록</button>

        <div id="merchant-result"></div>
      </div>
    </div>
  `

  document.querySelector<HTMLButtonElement>('#merchant-create-button')!
    .addEventListener('click', async () => {
      const businessName = document.querySelector<HTMLInputElement>('#business-name')!.value
      const ownerName = document.querySelector<HTMLInputElement>('#owner-name')!.value
      const phone = document.querySelector<HTMLInputElement>('#merchant-phone')!.value
      const bankName = document.querySelector<HTMLInputElement>('#merchant-bank')!.value
      const accountNumber = document.querySelector<HTMLInputElement>('#merchant-account')!.value
      const accountHolder = document.querySelector<HTMLInputElement>('#merchant-account-holder')!.value
      const feeRate = Number(document.querySelector<HTMLInputElement>('#merchant-fee-rate')!.value)
      const settlementCycle = document.querySelector<HTMLSelectElement>('#settlement-cycle')!.value

      if (!businessName || !ownerName || !phone || !bankName || !accountNumber || !accountHolder) {
        alert('필수 정보를 모두 입력해주세요')
        return
      }

      const insertData = {
        business_name: businessName,
        merchant_name: businessName,
        owner_name: ownerName,
        phone: phone,
        bank_name: bankName,
        account_number: accountNumber,
        account_holder: accountHolder,
        fee_rate: feeRate,
        settlement_cycle: settlementCycle,
      
        business_number: document.querySelector<HTMLInputElement>('#business-number')?.value || '',
        email: document.querySelector<HTMLInputElement>('#merchant-email')?.value || '',
        zipcode: document.querySelector<HTMLInputElement>('#merchant-zipcode')?.value || '',
        address: document.querySelector<HTMLInputElement>('#merchant-address')?.value || '',
        address_detail: document.querySelector<HTMLInputElement>('#merchant-address-detail')?.value || '',
        cpid: document.querySelector<HTMLInputElement>('#merchant-cpid')?.value || '',
        pg_mid: document.querySelector<HTMLInputElement>('#merchant-pg-mid')?.value || '',
        terminal_mid: document.querySelector<HTMLInputElement>('#merchant-terminal-mid')?.value || '',
        opened_at: document.querySelector<HTMLInputElement>('#merchant-opened-at')?.value || null,
      
        status: '대기'
      }
      
      console.log('등록 저장 데이터:', insertData)
      
      const { data, error } = await supabase
        .from('merchants')
        .insert([insertData])
        .select()
      
      console.log('등록 결과 data:', data)
      console.log('등록 error:', error)

      const resultBox = document.querySelector<HTMLDivElement>('#merchant-result')!

      if (error) {
        resultBox.innerHTML = `<p>가맹점 등록 실패: ${error.message}</p>`
        return
      }

      resultBox.innerHTML = `<p>가맹점 등록 완료</p>`

alert('가맹점 등록 완료')

setTimeout(() => {
  location.href = '/merchant-admin'
}, 800)
    })

} else if (path === '/create') {
  app.innerHTML = `
    <div class="page">
      <div class="payment-card ${isFuneral ? 'funeral-card' : 'wedding-card'}">
        <h1>행사 생성</h1>

        <div class="input-group">
          <label>행사 종류</label>
          <select id="event-type">
            <option value="wedding">결혼식</option>
            <option value="funeral">장례식</option>
            <option value="store">푸드트럭 / 행사장</option>
          </select>
        </div>

        <div class="input-group">
          <label>이름 입력</label>
          <input id="receiver-name" type="text" placeholder="김철수 ♥ 박영희 / 故 홍길동">
        </div>
        <div class="input-group">
  <label>생년월일</label>
  <input id="birth-date" type="text" placeholder="예: 1990-01-01">
</div>
<div class="input-group">
  <label>주민번호</label>
  <input id="resident-number" type="text" placeholder="예: 900101-1234567">
</div>

<div class="input-group">
  <label>연락처</label>
  <input id="phone" type="text" placeholder="예: 010-1234-5678">
</div>

<div class="input-group">
  <label>주소</label>
  <input id="address" type="text" placeholder="주소 입력">
</div>

<div class="input-group">
<label>고객 확인 비밀번호</label>
<input id="customer-code" type="text" placeholder="예: 1234 또는 원하는 비밀번호">
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
<div class="input-group">
  <label>메뉴 이름</label>
  <input id="menu-name" type="text" placeholder="예: 아메리카노">
</div>

<div class="input-group">
  <label>메뉴 가격</label>
  <input id="menu-price" type="number" placeholder="예: 4500">
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
      const birthDate = document.querySelector<HTMLInputElement>('#birth-date')!.value
      const customerCode =
  document.querySelector<HTMLInputElement>('#customer-code')!.value
      const bankName = document.querySelector<HTMLInputElement>('#bank-name')!.value
      const accountNumber = document.querySelector<HTMLInputElement>('#account-number')!.value
      const accountHolder = document.querySelector<HTMLInputElement>('#account-holder')!.value
      const menuName =
  document.querySelector<HTMLInputElement>('#menu-name')!.value

const menuPrice =
  Number(
    document.querySelector<HTMLInputElement>('#menu-price')!.value
  )
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
            birth_date: birthDate,
customer_code: customerCode,
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

      if (eventId && menuName && menuPrice) {
        const { error: menuError } = await supabase
          .from('menus')
          .insert([
            {
              event_id: eventId,
              name: menuName,
              price: menuPrice
            }
          ])
      
        if (menuError) {
          alert('메뉴 저장 실패: ' + menuError.message)
          return
        }
      }

      const eventLink = `${window.location.origin}/${eventType}?id=${eventId}`

      document.querySelector<HTMLDivElement>('#result-link')!.innerHTML = `
  <div class="create-result-card">
    <h2>✅ 행사 생성 완료</h2>
    <p class="result-name">${receiverNameInput}</p>
    <p class="result-desc">
      결제 링크와 전용 QR이 생성되었습니다.
    </p>

    <p class="result-code">
  행사 코드: <strong>${customerCode}</strong>
</p>

    <a class="result-link-button" href="${eventLink}" target="_blank">
      결제 링크 열기
    </a>

    <button id="copy-link-button">링크 복사</button>
    <button id="sms-link-button">문자로 보내기</button>
    <button id="kakao-link-button">카카오 공유</button>

    <h3>행사 전용 QR</h3>
    <canvas id="event-qr-canvas"></canvas>

    <button id="download-qr-button">QR 이미지 저장</button>
  </div>
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

        const eventQrCanvas =
  document.getElementById('event-qr-canvas') as HTMLCanvasElement

await QRCode.toCanvas(
  eventQrCanvas,
  eventLink,
  {
    width: 220
  }
)

document.querySelector<HTMLButtonElement>('#download-qr-button')!
  .addEventListener('click', () => {
    const qrImage = eventQrCanvas.toDataURL('image/png')

    const link = document.createElement('a')
    link.href = qrImage
    link.download = 'event-qr.png'
    link.click()
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
            
            <div class="search-box">
  <input
    id="payment-search"
    type="text"
    placeholder="주문번호 또는 이름 검색"
  >
</div>

           <div id="payment-list"></div>
           <div id="payment-list"></div>

<div class="sales-filter-buttons">
  <button id="sales-daily">일별 매출</button>
  <button id="sales-monthly">월별 매출</button>
  <button id="sales-yearly">연별 매출</button>
</div>

<div id="sales-summary"></div>

<h2>생성된 행사 목록</h2> 
            <h2>생성된 행사 목록</h2>

<div class="event-filter-buttons">
  <button id="filter-all">전체</button>
  <button id="filter-wedding">결혼식</button>
  <button id="filter-funeral">장례식</button>
</div>

<div id="event-list"></div>
 <h2>가맹점 목록</h2>
<div id="merchant-list"></div> 
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

        const { data: merchantData, error: merchantError } = await supabase
  .from('merchants')
  .select('*')
  .order('created_at', { ascending: false })

      const list = document.querySelector<HTMLDivElement>('#payment-list')!
      const eventList = document.querySelector<HTMLDivElement>('#event-list')!
      const merchantList =
  document.querySelector<HTMLDivElement>('#merchant-list')!

  if (merchantError) {
    merchantList.innerHTML =
      `<p>가맹점 목록 불러오기 실패: ${merchantError.message}</p>`
  } else {
    merchantList.innerHTML =
      `<p>등록된 가맹점 수: ${(merchantData || []).length}개</p>`
  }

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
       
        const today = new Date().toISOString().slice(0, 10)

const todayPayments = data.filter((payment) => {
  return (
    new Date(payment.created_at)
      .toISOString()
      .slice(0, 10) === today
  )
})

const todayAmount = todayPayments.reduce((sum, payment) => {
  return sum + Number(payment.amount)
}, 0)
        
        document.querySelector<HTMLDivElement>('#settlement-box')!.innerHTML = `
  <div class="dashboard-cards">

    <div class="dashboard-card">
      <p>총 결제금액</p>
      <h2>${totalAmount.toLocaleString()}원</h2>
    </div>

    <div class="dashboard-card">
      <p>플랫폼 수수료</p>
      <h2>${platformFee.toLocaleString()}원</h2>
    </div>

    <div class="dashboard-card">
      <p>예상 정산금액</p>
      <h2>${settlementAmount.toLocaleString()}원</h2>
    </div>

    <div class="dashboard-card">
  <p>오늘 결제건수</p>
  <h2>${todayPayments.length}건</h2>
</div>

<div class="dashboard-card">
  <p>오늘 결제금액</p>
  <h2>${todayAmount.toLocaleString()}원</h2>
</div>
  </div>
`
        list.innerHTML = `
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>주문번호</th>
<th>금액</th>
<th>보낸 사람</th>
<th>메시지</th>
<th>상태</th>
<th>결제시간</th>
              </tr>
            </thead>
            <tbody>
              ${data.map((payment) => `
                <tr>
            <td>${payment.order_id}</td>
            <td>${Number(payment.amount).toLocaleString()}원</td>
            <td>${payment.sender_name || '-'}</td>
            <td>${payment.message || '-'}</td>
            <td>
  ${payment.order_status || '준비중'}

  ${
    payment.order_status !== '완료'
      ? `
        <button
          class="complete-order-button"
          data-id="${payment.id}"
        >
          완료
        </button>
      `
      : ''
  }
</td>
            <td>${new Date(payment.created_at).toLocaleString('ko-KR')}</td>      
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
 `

document.querySelectorAll('.complete-order-button')
  .forEach((button) => {

    button.addEventListener('click', async () => {

      const paymentId =
        (button as HTMLElement)
          .getAttribute('data-id')

          const { data: updatedData, error } = await supabase
          .from('payments')
          .update({
            order_status: '완료'
          })
          .eq('id', Number(paymentId))
          .select()
        
        if (error) {
          alert('주문 상태 변경 실패: ' + error.message)
          return
        }
        
        if (!updatedData || updatedData.length === 0) {
          alert('변경된 데이터가 없습니다. RLS 또는 ID 문제입니다.')
          return
        }
        
        alert('완료 처리되었습니다')
        location.reload()
        })
    })

    const salesSummary = document.querySelector<HTMLDivElement>('#sales-summary')!

const renderSalesSummary = (type: 'daily' | 'monthly' | 'yearly') => {
  const salesMap = new Map<string, number>()

  data.forEach((payment) => {
    const date = new Date(payment.created_at)

    let key = ''

    if (type === 'daily') {
      key = date.toISOString().slice(0, 10)
    }

    if (type === 'monthly') {
      key = date.toISOString().slice(0, 7)
    }

    if (type === 'yearly') {
      key = String(date.getFullYear())
    }

    const current = salesMap.get(key) || 0
    salesMap.set(key, current + Number(payment.amount))
  })

  salesSummary.innerHTML = `
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>기간</th>
            <th>매출</th>
          </tr>
        </thead>
        <tbody>
          ${Array.from(salesMap.entries()).map(([period, amount]) => `
            <tr>
              <td>${period}</td>
              <td>${amount.toLocaleString()}원</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `
}

document.querySelector<HTMLButtonElement>('#sales-daily')!
  .addEventListener('click', () => renderSalesSummary('daily'))

document.querySelector<HTMLButtonElement>('#sales-monthly')!
  .addEventListener('click', () => renderSalesSummary('monthly'))

document.querySelector<HTMLButtonElement>('#sales-yearly')!
  .addEventListener('click', () => renderSalesSummary('yearly'))
  
      const searchInput = document.querySelector<HTMLInputElement>('#payment-search')!

      searchInput.addEventListener('input', () => {
        const keyword = searchInput.value.toLowerCase()
      
        const filteredData = data.filter((payment) => {
          return (
            String(payment.order_id).toLowerCase().includes(keyword) ||
            String(payment.status).toLowerCase().includes(keyword)
          )
        })
      
        list.innerHTML = `
          <div class="admin-table-wrap">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>주문번호</th>
<th>금액</th>
<th>보낸 사람</th>
<th>메시지</th>
<th>상태</th>
<th>처리</th>
<th>결제시간</th>
                </tr>
              </thead>
              <tbody>
                ${filteredData.map((payment) => `
                  <tr>
                    <td>${payment.order_id}</td>
                    <td>${Number(payment.amount).toLocaleString()}원</td>
                    <td>${payment.sender_name || '-'}</td>
                    <td>${payment.message || '-'}</td>
                    <td>${payment.status}</td>
                    <td>${new Date(payment.created_at).toLocaleString('ko-KR')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `
      })
    } 
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
    const renderEvents = (filteredEvents: typeof eventData) => {
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
              ${filteredEvents.map((event) => {
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
    }
    
    renderEvents(eventData)
    
    document.querySelector('#filter-all')!
      .addEventListener('click', () => {
        renderEvents(eventData)
      })
    
    document.querySelector('#filter-wedding')!
      .addEventListener('click', () => {
        renderEvents(
          eventData.filter((event) => event.event_type === 'wedding')
        )
      })
    
    document.querySelector('#filter-funeral')!
      .addEventListener('click', () => {
        renderEvents(
          eventData.filter((event) => event.event_type === 'funeral')
        )
      })  

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
if (!orderId || !paymentKey || !amount) {
  app.innerHTML = `
    <div class="page">
      <div class="payment-card">
        <h1>이미 처리된 주문입니다</h1>
        <button id="home-button">확인</button>
      </div>
    </div>
  `

  document.querySelector<HTMLButtonElement>('#home-button')!
    .addEventListener('click', () => {
      window.location.href = '/'
    })

} else {


const eventId = sessionStorage.getItem('currentEventId')
const currentEventType =
  sessionStorage.getItem('currentEventType')

const senderName = sessionStorage.getItem('senderName')
const message = sessionStorage.getItem('message')

const merchantId =
  params.get('merchantId') || sessionStorage.getItem('merchantId')

const merchantName =
  params.get('merchantName') || sessionStorage.getItem('merchantName')

  const { count } = await supabase
  .from('payments')
  .select('*', { count: 'exact', head: true })

const nextOrderNumber = (count || 0) + 1

const { data: existingPayment } = await supabase
  .from('payments')
  .select('id')
  .eq('order_id', orderId)
  .maybeSingle()

if (existingPayment) {
  console.log('이미 저장된 주문입니다.')
} else {
const { error } = await supabase.from('payments').insert([
  {
    order_number: nextOrderNumber,
    order_id: orderId,
    payment_key: paymentKey,
    amount: Number(amount),
    status: 'paid',
    event_id: eventId ? Number(eventId) : null,
    sender_name: senderName,
message: message,
merchant_id: merchantId ? Number(merchantId) : null,
merchant_name: merchantName
  }
  ]) 

  if (error) {
    alert('DB 저장 실패: ' + error.message)
  } else {
    alert('DB 저장 성공')
  }
}
window.history.replaceState({}, '', '/success')

  app.innerHTML = `
    <div class="page">
      <div class="payment-card">
    
      <h1>
  ${
    currentEventType === 'funeral'
    ? '<span style="display:block;">명복을 빌어 주셔서</span><span style="display:block;">감사합니다.</span>'
    : '<span style="display:block;">주문이</span><span style="display:block;">접수되었습니다</span>'
  }
</h1>
        <p class="order-number-title">주문번호</p>

<div class="order-number-box">
  ${nextOrderNumber}번
</div>

<p class="order-wait-message">
  고객 호출 시까지<br>
  잠시만 기다려주세요.
</p>

<p class="payment-amount">
  결제금액 : ${Number(amount).toLocaleString()}원
</p>
        <button id="home-button">확인</button>
        </div>
    </div>
  `

  document.querySelector<HTMLButtonElement>('#home-button')!
  .addEventListener('click', () => {
    window.close()
  })

  document.querySelector<HTMLButtonElement>('#contact-button')!
  .addEventListener('click', () => {
    window.location.href =
      'sms:010-9938-2962?body=' +
      encodeURIComponent(
        '안녕하세요. 모바일 축의금/부의금 결제 솔루션 도입 문의드립니다.'
      )
  }) 
}
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

    } else if (path === '/admin-login' || path === '/') {
  app.innerHTML = `
  <div class="nxg-login-page">
    <div class="nxg-login-left">
      <div class="nxg-logo">NXG SOFT</div>
      <h1>
        결제부터 정산까지,<br/>
        통합 정산 솔루션
      </h1>
      <p>
        가맹점 결제와 주문, 정산을 한 곳에서 관리하는<br/>
        NXG 관리자 시스템입니다.
      </p>

      <div class="nxg-login-features">
        <div>통합관리</div>
        <div>QR결제</div>
        <div>주문관리</div>
        <div>실시간 정산</div>
      </div>
    </div>

    <div class="nxg-login-card">
    <div class="nxg-admin-badge">NXG PAYMENT ADMIN</div>  
    <h2>관리자 로그인</h2>

      <input id="admin-login-id" placeholder="아이디" />
      <input id="admin-login-password" type="password" placeholder="비밀번호" />

      <button id="admin-login-button">
        로그인
      </button>
      <button id="go-merchant-apply-button" class="merchant-join-button">
  신규 가입
</button>

      <div class="nxg-login-footer">
        NXG Payment Admin System
      </div>
    </div>
  </div>

  `

  document.querySelector<HTMLButtonElement>('#admin-login-button')
    ?.addEventListener('click', () => {
      const loginId =
        (document.querySelector<HTMLInputElement>('#admin-login-id')?.value || '').trim()

      const password =
        (document.querySelector<HTMLInputElement>('#admin-login-password')?.value || '').trim()

      if (loginId === 'nxg001' && password === '1234') {
        sessionStorage.setItem('admin_id', loginId)
        location.href = '/pg-admin'
        return
      }

      alert('아이디 또는 비밀번호가 올바르지 않습니다.')
    })

    document.querySelector('#go-merchant-apply-button')
  ?.addEventListener('click', () => {
    location.href = '/merchant-apply'
  })

  } else if (path === '/pg-admin') {

  if (!sessionStorage.getItem('admin_id')) {
  location.href = '/admin-login'
}

    const adminId =
      sessionStorage.getItem('admin_id') || 'nxg001'
  
    app.innerHTML = `
      <div class="admin-wrap">
        <div class="admin-top-user">
          ${adminId}
          <span id="admin-logout" style="cursor:pointer;">
            | 로그아웃
          </span>
        </div>
  
        <div class="admin-menu">
  <a class="admin-tab" data-page="dashboard">대시보드</a>
<a class="admin-tab" data-page="merchant">가맹점관리</a>
<a class="admin-tab" data-page="payment">결제관리</a>
  <a class="admin-tab" data-page="payout">출금관리</a>
  <a class="admin-tab" data-page="settlement">정산관리</a>
  <a class="admin-tab" data-page="tax">세무관리</a>
  <a class="admin-tab" data-page="order">주문관리</a>
  <a class="admin-tab" data-page="mini">미니상점</a>
  <a class="admin-tab" data-page="setting">설정관리</a>
</div>
  
        <div class="admin-sub-menu">
          승인내역조회 | POS주문내역조회 | 승인거절 내역조회 | 카드결제 | 현금영수증 발급
        </div>
  
        <div class="admin-title">
          ▶ 결제관리 > 승인내역조회
        </div>
  
        <div class="admin-search-box">
          <div>
            <select><option>다우데이타</option><option>코페이</option><option>전체</option></select>
            <select><option>거래일자</option><option>승인일자</option></select>
            <input value="20260528" />
            <span>~</span>
            <input value="20260528" />
            <button class="quick-btn">오늘</button>
            <button class="quick-btn">어제</button>
            <button class="quick-btn">당월</button>
            <select><option>가맹점ID</option><option>가맹점명</option></select>
            <input />
          </div>
  
        <div class="filter-row">
  <div class="tab-group">
    <button class="tab active">전체</button>
    <button class="tab">4일결제</button>
    <button class="tab">3일결제</button>
    <button class="tab">1일결제</button>
  </div>

  <div class="tab-group">
    <button class="tab active">전체</button>
    <button class="tab">무선단말기</button>
    <button class="tab">수기결제</button>
    <button class="tab">QR결제</button>
  </div>
</div>

<div class="payment-search-line">
  <select><option>신용카드결제</option></select>
  <select><option>신용카드전체</option></select>
  <select><option>기본키</option></select>
  <button class="search-btn">🔍 검색</button>
</div>  
  
          <div>
            <select><option>전체</option><option>승인</option><option>취소</option><option>완료</option></select>
            <select><option>전체</option><option>정산완료</option><option>정산대기</option></select>
          </div>
        </div>
  
        <div class="admin-summary">
          검색된 데이터 : 0건 &nbsp;&nbsp;&nbsp;
          사용자 : 0명 &nbsp;&nbsp;&nbsp;
          전체금액 : 0원
          <span>카드취소를 원하는 데이터의 거래번호를 클릭해주세요.</span>
        </div>
  
        <div class="admin-table-top">
          <button>엑셀 다운로드</button>
          <select id="admin-page-size">
  <option value="10">10개씩 보기</option>
  <option value="20" selected>20개씩 보기</option>
  <option value="50">50개씩 보기</option>
  <option value="100">100개씩 보기</option>
</select>
        </div>
  
        <table class="admin-table">
          <thead>
            <tr>
              <th>No</th>
              <th>승인일<br/>승인번호</th>
              <th>취소일<br/>거래번호</th>
              <th>가맹점아이디/구분<br/>가맹점상호/가맹점명</th>
              <th>매입사/구매자연락처<br/>구매상품/구매자 성함</th>
              <th>메모</th>
              <th>카드번호<br/>할부구분</th>
              <th>결제수단<br/>결제금액</th>
              <th>거래방식<br/>물품금액</th>
              <th>부가세<br/>봉사료</th>
              <th>거래수수료<br/>가맹점금액</th>
            </tr>
          </thead>
          <tbody id="paymentTableBody">
  <tr>
    <td colspan="11" class="empty-row">검색해주세요.</td>
  </tr>
</tbody>
        </table>
      </div>
       `
       const searchBtn = document.querySelector('.search-btn')
       const paymentTableBody =
  document.querySelector<HTMLTableSectionElement>('#paymentTableBody')!
       
       function formatDate(dateText: string) {
        if (!dateText) return '-'
      
        const date = new Date(dateText)
      
        return date.toLocaleString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'     
        })
      }
      
      function getStatusText(status: string) {
        if (status === 'paid') return '승인'
        if (status === 'cancel') return '취소'
        if (status === 'ready') return '대기'
        return status || '-'
      }

       searchBtn?.addEventListener('click', async () => {
         const result = await supabase
           .from('payments')
           .select('*')
           .order('created_at', { ascending: false })
       
         if (result.error) {
           alert('결제내역 조회 실패: ' + result.error.message)
           return
         }
       
         const payments = result.data || []

         const summaryBox = document.querySelector('.admin-summary')

const totalAmount = payments.reduce((sum, payment) => {
  return sum + Number(payment.amount || 0)
}, 0)

if (summaryBox) {
  summaryBox.innerHTML =
    '검색된 데이터 : ' + payments.length + '건 &nbsp;&nbsp;&nbsp;' +
    '사용자 : ' + payments.length + '명 &nbsp;&nbsp;&nbsp;' +
    '전체금액 : ' + totalAmount.toLocaleString() + '원 ' +
    '<span>카드취소를 원하는 데이터의 거래번호를 클릭해주세요.</span>'
}
       
         paymentTableBody.innerHTML = ''
       
         payments.forEach((payment, index) => {
           const tr = document.createElement('tr')
       
           tr.innerHTML =
             '<td>' + (index + 1) + '</td>' +
             '<td>' + formatDate(payment.created_at) + '<br/>' + (payment.order_id || '-') + '</td>' +
             '<td>-<br/>' + (payment.payment_key || '-') + '</td>' +
             '<td>' + (payment.event_id || '-') + '<br/>-</td>' +
             '<td>-<br/>-</td>' +
             '<td>-</td>' +
             '<td>-<br/>-</td>' +
             '<td>' + getStatusText(payment.status) + '<br/>' + Number(payment.amount || 0).toLocaleString() + '원</td>' +
             '<td>온라인<br/>' + Number(payment.amount || 0).toLocaleString() + '원</td>' +
             '<td>0원<br/>0원</td>' +
             '<td>0원<br/>' + Number(payment.amount || 0).toLocaleString() + '원</td>'
       
           paymentTableBody.appendChild(tr)
         })
       })
       document.querySelector('#admin-logout')
       ?.addEventListener('click', () => {
     
         if (!confirm('로그아웃 하시겠습니까?')) {
           return
         }
     
         sessionStorage.removeItem('admin_id')
     
         location.href = '/admin-login'
       })
       const adminTabs = document.querySelectorAll('.admin-tab')

       adminTabs.forEach((tab) => {
        tab.addEventListener('click', async () => {
          adminTabs.forEach((item) => {
            item.classList.remove('active')
          })
      
          tab.classList.add('active')
      
          const page = tab.getAttribute('data-page')

    if (page === 'dashboard') {
      const subMenu = document.querySelector('.admin-sub-menu')
      const titleBox = document.querySelector('.admin-title')
      const searchBox = document.querySelector('.admin-search-box')
      const summaryBox = document.querySelector('.admin-summary')
      const tableHead = document.querySelector('.admin-table thead')
      const paymentTableBody =
        document.querySelector<HTMLTableSectionElement>('#paymentTableBody')!
    
      if (subMenu) {
        subMenu.innerHTML = '오늘 현황 | 월간 현황 | 정산 현황 | 출금 현황'
      }
    
      if (titleBox) {
        titleBox.innerHTML = `
          <div class="dashboard-title">
            <h2>NXG 관리자 대시보드</h2>
            <p>결제, 정산, 출금 현황을 실시간으로 확인할 수 있습니다.</p>
          </div>
      
          <div style="margin-top:10px;">
            ▶ 대시보드 > 오늘 현황
          </div>
        `
      }
    
      if (searchBox) {
        searchBox.innerHTML = ''
      }
    
      const { data: payments, error: paymentError } = await supabase
        .from('payments')
        .select('*')
    
      const { data: merchants, error: merchantError } = await supabase
        .from('merchants')
        .select('*')
    
      if (paymentError || merchantError) {
        alert('대시보드 데이터를 불러오지 못했습니다')
        return
      }
    
      const today = new Date().toISOString().slice(0, 10)
    
      const todayPayments = (payments || []).filter((payment) => {
        return String(payment.created_at || '').slice(0, 10) === today
      })
    
      const todayAmount = todayPayments.reduce((sum, payment) => {
        return sum + Number(payment.amount || 0)
      }, 0)
    
      const totalAmount = (payments || []).reduce((sum, payment) => {
        return sum + Number(payment.amount || 0)
      }, 0)
    
      const settlementWaitingAmount = (payments || []).reduce((sum, payment) => {
        if (payment.settlement_status === '정산완료') {
          return sum
        }
    
        const amount = Number(payment.amount || 0)
        const feeAmount = Math.floor(amount * 0.02)
    
        return sum + amount - feeAmount
      }, 0)
    
      const payoutWaitingAmount = (payments || []).reduce((sum, payment) => {
        if (
          payment.settlement_status === '정산완료' &&
          payment.payout_status !== '출금완료'
        ) {
          return sum + Number(payment.settlement_amount || payment.amount || 0)
        }
    
        return sum
      }, 0)
    
      if (summaryBox) {
        summaryBox.innerHTML =
          '<div class="dashboard-cards">' +
            '<div class="dashboard-card"><h3>오늘 결제금액</h3><strong>' + todayAmount.toLocaleString() + '원</strong></div>' +
            '<div class="dashboard-card"><h3>전체 결제금액</h3><strong>' + totalAmount.toLocaleString() + '원</strong></div>' +
            '<div class="dashboard-card"><h3>정산대기금액</h3><strong>' + settlementWaitingAmount.toLocaleString() + '원</strong></div>' +
            '<div class="dashboard-card"><h3>출금대기금액</h3><strong>' + payoutWaitingAmount.toLocaleString() + '원</strong></div>' +
            '<div class="dashboard-card"><h3>가맹점 수</h3><strong>' + (merchants || []).length + '개</strong></div>' +
          '</div>'
      }
    
      if (tableHead) {
        tableHead.innerHTML =
          '<tr>' +
            '<th>No</th>' +
            '<th>가맹점명</th>' +
            '<th>주문번호</th>' +
            '<th>결제금액</th>' +
            '<th>결제상태</th>' +
            '<th>정산상태</th>' +
            '<th>출금상태</th>' +
            '<th>결제일</th>' +
          '</tr>'
      }
    
      paymentTableBody.innerHTML = ''
    
      ;(payments || []).slice(0, 10).forEach((payment, index) => {
        const tr = document.createElement('tr')
    
        tr.innerHTML =
          '<td>' + (index + 1) + '</td>' +
          '<td>' + (payment.merchant_name || '-') + '</td>' +
          '<td>' + (payment.order_id || '-') + '</td>' +
          '<td>' + Number(payment.amount || 0).toLocaleString() + '원</td>' +
          '<td>' + (payment.status || '-') + '</td>' +
          '<td>' + (payment.settlement_status || '정산대기') + '</td>' +
          '<td>' + (payment.payout_status || '출금대기') + '</td>' +
          '<td>' + formatDate(payment.created_at) + '</td>'
    
        paymentTableBody.appendChild(tr)
      })
    }

    if (page === 'merchant') {
      const subMenu = document.querySelector('.admin-sub-menu')
const titleBox = document.querySelector('.admin-title')

if (subMenu) {
  subMenu.innerHTML =
  '<span class="sub-tab" data-sub="merchant-apply">가입신청 관리</span> | ' +
  '<span class="sub-tab" data-sub="merchant-list">승인가맹점</span> | ' +
  '<span class="sub-tab" data-sub="merchant-add">업체/가맹점 등록</span> | ' +
  '<span class="sub-tab" data-sub="fee-setting">결제 수수료 설정</span>'
}
document.querySelector('[data-sub="merchant-add"]')
  ?.addEventListener('click', () => {
    sessionStorage.setItem('selected_merchant_id', '')
    sessionStorage.setItem('merchant_sub_page', 'merchant-add')
    document.querySelector('[data-sub="merchant-add"]')
  ?.addEventListener('click', () => {
    sessionStorage.setItem('selected_merchant_id', '')
    sessionStorage.setItem('merchant_sub_page', 'merchant-add')

    const titleBox = document.querySelector('.admin-title')
    const searchBox = document.querySelector('.admin-search-box')
    const summaryBox = document.querySelector('.admin-summary')
    const tableTop = document.querySelector('.admin-table-top')
    const tableHead = document.querySelector('.admin-table thead')
    const paymentTableBody =
      document.querySelector<HTMLTableSectionElement>('#paymentTableBody')!

    document.querySelectorAll('.sub-tab')
      .forEach((item) => item.classList.remove('active'))

    document.querySelector('[data-sub="merchant-add"]')
      ?.classList.add('active')

    if (titleBox) {
      titleBox.innerHTML = '▶ 가맹점관리 > 업체/가맹점 등록'
    }

    if (searchBox) {
      searchBox.innerHTML = ''
    }

    if (summaryBox) {
      summaryBox.innerHTML =
        '<div class="merchant-detail-header">' +
          '<h2>업체/가맹점 등록 정보</h2>' +
          '<p>신규 가맹점 등록 또는 기존 가맹점 정보를 확인합니다.</p>' +
        '</div>'
    }

    if (tableTop) {
      tableTop.innerHTML = ''
    }

    if (tableHead) {
      tableHead.innerHTML = ''
    }

    paymentTableBody.innerHTML =
      '<tr><td colspan="12">업체/가맹점 등록 화면 준비중</td></tr>'
  })
  })

if (titleBox) {
  titleBox.innerHTML = '▶ 가맹점관리 > 가맹점 관리'
}
const searchBox = document.querySelector('.admin-search-box')

if (searchBox) {
  searchBox.innerHTML =
  '<div class="merchant-filter-line">' +
    '<span class="filter-label">• 검색</span>' +
    '<select><option>전체</option><option>다우데이타</option><option>코페이</option></select>' +
    '<input placeholder="시작일" />' +
    '<span>~</span>' +
    '<input placeholder="종료일" />' +
    '<button class="quick-btn">오늘</button>' +
    '<button class="quick-btn">어제</button>' +
    '<button class="quick-btn">당월</button>' +
    '<select><option>전체</option><option>운영</option><option>중지</option><option>가입대기</option></select>' +
    '<select><option>가맹점명</option><option>담당자명</option><option>대리점명</option><option>지사명</option><option>주민번호</option><option>사업자번호</option><option>단말기CPID</option></select>' +
    '<input placeholder="검색어 입력" />' +
    '<button class="merchant-search-btn">검색</button>' +
  '</div>'
}
const tableTop = document.querySelector('.admin-table-top')

if (tableTop) {
  tableTop.innerHTML =
    '<button>엑셀 다운로드</button>' +
    '<select id="admin-page-size">' +
      '<option value="10">10개씩 보기</option>' +
      '<option value="20" selected>20개씩 보기</option>' +
      '<option value="50">50개씩 보기</option>' +
      '<option value="100">100개씩 보기</option>' +
    '</select>'
}
      const result = await supabase
        .from('merchants')
        .select('*')
        .order('id', { ascending: true })
    
      if (result.error) {
        alert('가맹점 조회 실패: ' + result.error.message)
        return
      }
    
      const keywordInput =
  document.querySelector<HTMLInputElement>(
    '.merchant-filter-line input:last-of-type'
  )

const searchKeyword = keywordInput?.value?.trim() || ''
      
      let merchants = result.data || []
      
      if (searchKeyword) {
        merchants = merchants.filter((merchant) => {
          return (
            String(merchant.merchant_name || '').includes(searchKeyword) ||
            String(merchant.owner_name || '').includes(searchKeyword) ||
            String(merchant.phone || '').includes(searchKeyword) ||
            String(merchant.account_holder || '').includes(searchKeyword)
          )
        })
      }

      const summaryBox = document.querySelector('.admin-summary')

if (summaryBox) {
  summaryBox.innerHTML =
    '<div class="merchant-status-cards">' +
      '<div class="merchant-status-card">' +
        '<p>신청대기</p>' +
        '<strong>8건</strong>' +
      '</div>' +
      '<div class="merchant-status-card">' +
        '<p>심사중</p>' +
        '<strong>3건</strong>' +
      '</div>' +
      '<div class="merchant-status-card">' +
        '<p>승인완료</p>' +
        '<strong>' + merchants.length + '건</strong>' +
      '</div>' +
      '<div class="merchant-status-card danger">' +
        '<p>반려</p>' +
        '<strong>2건</strong>' +
      '</div>' +
    '</div>' +
    '<div style="margin-top:16px;">' +
    '<button id="copy-merchant-apply-link" class="merchant-apply-btn">🔗 가입신청 링크 생성</button>' +
    '</div>'
}

document.querySelector('#copy-merchant-apply-link')
  ?.addEventListener('click', async () => {
    const applyUrl =
      window.location.origin + '/merchant-apply'

    await navigator.clipboard.writeText(applyUrl)

    alert('가입신청 링크가 복사되었습니다.')
  })
      
      const tableHead = document.querySelector('.admin-table thead')
      const paymentTableBody =
  document.querySelector<HTMLTableSectionElement>('#paymentTableBody')!
      
  if (summaryBox) {
    summaryBox.innerHTML =
      '<div class="merchant-status-cards">' +
        '<div class="merchant-status-card">' +
          '<p>신청대기</p>' +
          '<strong>8건</strong>' +
        '</div>' +
        '<div class="merchant-status-card">' +
          '<p>심사중</p>' +
          '<strong>3건</strong>' +
        '</div>' +
        '<div class="merchant-status-card">' +
          '<p>승인완료</p>' +
          '<strong>' + merchants.length + '건</strong>' +
        '</div>' +
        '<div class="merchant-status-card danger">' +
          '<p>반려</p>' +
          '<strong>2건</strong>' +
        '</div>' +
      '</div>' +
      '<div style="margin-top:16px;">' +
        '<button id="copy-merchant-apply-link" class="merchant-search-btn">🔗 가입신청 링크 생성</button>' +
      '</div>'
  }
  
  document.querySelector('#copy-merchant-apply-link')
    ?.addEventListener('click', async () => {
      const applyUrl =
        window.location.origin + '/merchant-apply'
  
      await navigator.clipboard.writeText(applyUrl)
  
      alert('가입신청 링크가 복사되었습니다.')
    })
      
      if (tableHead) {
        tableHead.innerHTML =
          '<tr>' +
            '<th>No</th>' +
            '<th>가맹점ID</th>' +
            '<th>가맹점명</th>' +
            '<th>대표자</th>' +
            '<th>연락처</th>' +
            '<th>수수료율</th>' +
            '<th>정산은행</th>' +
            '<th>계좌번호</th>' +
            '<th>예금주</th>' +
            '<th>정산주기</th>' +
            '<th>상태</th>' +
            '<th>관리</th>'
          '</tr>'
      }
      
      paymentTableBody.innerHTML = ''
      
      merchants.forEach((merchant, index) => {
        const tr = document.createElement('tr')
      
        tr.innerHTML =
  '<td>' + (index + 1) + '</td>' +
  '<td><button class="merchant-link-btn" data-id="' + merchant.id + '">MER' + String(merchant.id).padStart(4, '0') + '</button></td>' +
'<td><button class="merchant-link-btn" data-id="' + merchant.id + '">' + (merchant.merchant_name || '-') + '</button></td>' +
  '<td>' + (merchant.owner_name || '-') + '</td>' +
  '<td>' + (merchant.phone || '-') + '</td>' +
  '<td>' + (merchant.fee_rate || 0) + '%</td>' +
  '<td>' + (merchant.bank_name || '-') + '</td>' +
  '<td>' + (merchant.account_number || '-') + '</td>' +
  '<td>' + (merchant.account_holder || '-') + '</td>' +
  '<td>' + (merchant.settlement_cycle || '-') + '</td>' +
  '<td>' + (merchant.status || '운영') + '</td>' +
'<td><button class="merchant-link-btn merchant-view-btn" data-id="' + merchant.id + '">보기</button></td>'
      
  paymentTableBody.appendChild(tr)

  const merchantButtons = tr.querySelectorAll('.merchant-link-btn')

merchantButtons.forEach((button) => {
  button.addEventListener('click', () => {
    sessionStorage.setItem('selected_merchant_id', String(merchant.id))

    if (titleBox) {
      titleBox.innerHTML = '▶ 가맹점관리 > 업체/가맹점 등록'
    }
    
    if (searchBox) {
      searchBox.innerHTML = ''
    }
    
    if (summaryBox) {
      summaryBox.innerHTML =
        '<div class="merchant-detail-header">' +
          '<h2>업체/가맹점 등록 정보</h2>' +
          '<p>가맹점 등록정보, PG정보, 정산정보를 확인하고 수정합니다.</p>' +
        '</div>'
    }
    
    if (tableTop) {
      tableTop.innerHTML = ''
    }
    
    const tableHead = document.querySelector('.admin-table thead')
    const paymentTableBody =
      document.querySelector<HTMLTableSectionElement>('#paymentTableBody')!
    
    if (tableHead) {
      tableHead.innerHTML = ''
    }
    
    paymentTableBody.innerHTML =
      '<tr>' +
        '<td colspan="12">' +
          '<div class="merchant-detail-page">' +
    
            '<div class="merchant-detail-section">' +
              '<h3>등록정보</h3>' +
              '<div class="merchant-detail-grid">' +
                '<label>등록구분</label><select><option>가맹점</option><option>담당자</option><option>대리점</option></select>' +
                '<label>소속 대리점</label><select><option>본사</option><option>에이드컴퍼니</option></select>' +
                '<label>사용 PG사</label><select><option>다우데이타</option><option>코페이</option></select>' +
                '<label>회사구분</label><select><option>개인(일반)</option><option>개인사업자</option><option>법인사업자</option></select>' +
                '<label>CPID</label><input id="cpid" value="' + (merchant.cpid || ('MER' + String(merchant.id).padStart(4, '0'))) + '" />' +
                '<label>사업자번호</label><input id="business_number" value="' + (merchant.business_number || '') + '" />' +
                '<label>운영상태</label>' +
'<select>' +
  '<option>운영</option>' +
  '<option>중지</option>' +
'</select>' +
'<label>개통일자</label>' +
'<input type="date" value="" />' +
'<label>비밀번호 초기화</label>' +
'<button type="button" id="reset-merchant-password" class="reset-password-btn">1234로 초기화</button>' +

              '</div>' +
            '</div>' +
    
           '<div class="merchant-detail-section">' +
  '<h3>기본정보</h3>' +
  '<div class="merchant-detail-grid">' +

    '<label>가맹점명</label>' +
    '<input id="merchant-name" value="' + (merchant.merchant_name || '') + '" />' +

    '<label>대표자</label>' +
    '<input id="owner-name" value="' + (merchant.owner_name || '') + '" />' +

    '<label>주민번호</label>' +
    '<input id="resident-number" value="" placeholder="000000-0000000" />' +

    '<label>연락처</label>' +
    '<input id="phone" value="' + (merchant.phone || '') + '" />' +

    '<label>수수료율</label>' +
    '<input id="fee-rate" value="' + (merchant.fee_rate || 0) + '" />' +

   '<label>이메일</label><input id="email" value="' + (merchant.email || '') + '" />' +

'<label>법인번호</label><input id="business_number" value="' + (merchant.business_number || '') + '" />' +

    '<label>과세구분</label>' +
    '<select id="tax-type">' +
      '<option>과세</option>' +
      '<option>비과세</option>' +
    '</select>' +

    '<label>취급품목</label>' +
    '<input id="product-item" value="" />' +

    '<label>업태/종목</label>' +
    '<div class="business-type-row">' +
      '<input id="business-type" value="" placeholder="업태" />' +
      '<input id="business-category" value="" placeholder="종목" />' +
    '</div>' +

   '<label>주소</label>' +
'<div class="address-one-line">' +
 '<input id="zipcode" class="zipcode-input" placeholder="우편번호" value="' + (merchant.zipcode || '') + '" />' +
'<button type="button" class="address-search-btn">우편번호 찾기</button>' +
'<input id="address" class="address-main-input" placeholder="기본주소" value="' + (merchant.address || '') + '" />' +
'<input id="address_detail" class="address-detail-input" placeholder="상세주소" value="' + (merchant.address_detail || '') + '" />' +
'</div>' +

  '</div>' +
'</div>' +

    
            '<div class="merchant-detail-section">' +
              '<h3>PG / 단말기 정보</h3>' +
              '<div class="merchant-detail-grid">' +
                '<label>PG MID</label><input id="pg_mid" value="' + (merchant.pg_mid || '') + '" />' +
'<label>단말기 MID</label><input id="terminal_mid" value="' + (merchant.terminal_mid || '') + '" />' +
'<label>개통번호</label><input id="opened_at" value="' + (merchant.opened_at || '') + '" />' +
'<label>관리번호</label><input value="" />' +
'<label>무선단말기 개통번호</label><input value="" />' +
'<label>무선단말기 관리번호</label><input value="" />' +
              '</div>' +
            '</div>' +
    
            '<div class="merchant-detail-section">' +
  '<h3>정산정보</h3>' +
  '<div class="merchant-detail-grid">' +
   '<label>정산은행</label><input id="bank_name" value="' + (merchant.bank_name || '') + '" />' +
'<label>계좌번호</label><input id="account_number" value="' + (merchant.account_number || '') + '" />' +
'<label>예금주</label><input id="account_holder" value="' + (merchant.account_holder || '') + '" />' +
'<label>정산주기</label>' +
'<select id="settlement_cycle">' +
  '<option value="1일" ' + (merchant.settlement_cycle === '1일' ? 'selected' : '') + '>1일</option>' +
  '<option value="3일" ' + (merchant.settlement_cycle === '3일' ? 'selected' : '') + '>3일</option>' +
  '<option value="4일" ' + ((merchant.settlement_cycle || '4일') === '4일' ? 'selected' : '') + '>4일</option>' +
  '<option value="7일" ' + (merchant.settlement_cycle === '7일' ? 'selected' : '') + '>7일</option>' +
'</select>' +
  '</div>' +
'</div>' +

'<div class="merchant-detail-section">' +
  '<h3>위험관리 / 한도설정</h3>' +
  '<div class="merchant-detail-grid merchant-risk-grid">' +
    '<label>최대할부기간</label>' +
    '<select>' +
      '<option>2개월</option>' +
      '<option>3개월</option>' +
      '<option>4개월</option>' +
      '<option>5개월</option>' +
      '<option>6개월</option>' +
      '<option>10개월</option>' +
      '<option>12개월</option>' +
    '</select>' +
    '<label>1일 승인한도</label><input value="" />' +
    '<label>월한도</label><input value="" />' +
    '<label>연한도</label><input value="" />' +
  '</div>' +
'</div>' +
    
'<div class="merchant-detail-section">' +
  '<h3>첨부서류</h3>' +
  '<div class="merchant-file-grid">' +
    '<label>사업자등록증</label><input type="file" />' +
    '<label>통장사본</label><input type="file" />' +
    '<label>대표자 신분증</label><input type="file" />' +
    '<label>판매상품 사진</label><input type="file" />' +
    '<label>기타서류</label><input type="file" />' +
    '<label>메모</label><textarea placeholder="심사 메모를 입력하세요"></textarea>' +
  '</div>' +
'</div>' +

            '<div class="merchant-detail-actions">' +
            '<button class="merchant-save-btn" id="save-merchant-info">저장</button>' +
              '<button class="merchant-save-btn" id="approve-merchant">승인</button>' +
'<button class="merchant-reject-btn" id="reject-merchant">반려</button>' +
'<button class="merchant-close-btn" id="back-merchant-list">목록으로</button>' +
            '</div>' +
    
          '</div>' +
        '</td>' +
      '</tr>'
    
      document.querySelector('#back-merchant-list')
      ?.addEventListener('click', () => {
        location.reload()
      })
    
      document.querySelector('#save-merchant-info')
  ?.addEventListener('click', async () => {
    const merchantName =
      (document.querySelector<HTMLInputElement>('#merchant-name')?.value || '').trim()

    const ownerName =
      (document.querySelector<HTMLInputElement>('#owner-name')?.value || '').trim()

    const phone =
      (document.querySelector<HTMLInputElement>('#phone')?.value || '').trim()

    const feeRate =
      Number(document.querySelector<HTMLInputElement>('#fee-rate')?.value || 0)

      console.log('저장할 값 확인', {
        business_number: document.querySelector<HTMLInputElement>('#business_number')?.value,
        email: document.querySelector<HTMLInputElement>('#email')?.value,
        zipcode: document.querySelector<HTMLInputElement>('#zipcode')?.value,
        address: document.querySelector<HTMLInputElement>('#address')?.value,
        address_detail: document.querySelector<HTMLInputElement>('#address_detail')?.value,
        cpid: document.querySelector<HTMLInputElement>('#cpid')?.value,
        pg_mid: document.querySelector<HTMLInputElement>('#pg_mid')?.value,
        terminal_mid: document.querySelector<HTMLInputElement>('#terminal_mid')?.value,
        opened_at: document.querySelector<HTMLInputElement>('#opened_at')?.value
      })

      const getValue = (id: string) =>
  (document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null)?.value || ''

      const updateData = {
        merchant_name: merchantName,
        owner_name: ownerName,
        phone: phone,
        fee_rate: feeRate,
      
        business_number: getValue('business_number'),
        email: getValue('email'),
        zipcode: getValue('zipcode'),
        address: getValue('address'),
        address_detail: getValue('address_detail'),
        cpid: getValue('cpid'),
        pg_mid: getValue('pg_mid'),
        terminal_mid: getValue('terminal_mid'),
        opened_at: getValue('opened_at') || null,
      
        bank_name: getValue('bank_name'),
        account_number: getValue('account_number'),
        account_holder: getValue('account_holder'),
        settlement_cycle: getValue('settlement_cycle')
      }
    
      console.log('실제 저장 데이터:', updateData)
      
      const { data, error } = await supabase
  .from('merchants')
  .update(updateData)
  .eq('id', merchant.id)
  .select()

console.log('저장 대상 merchant.id:', merchant.id)
console.log('저장 결과 data:', data)
console.log('저장 error:', error)

    if (error) {
      alert('저장 실패: ' + error.message)
      return
    }

    alert('저장되었습니다.')
    location.reload()
  })
    document.querySelector('#approve-merchant')
      ?.addEventListener('click', async () => {
        if (!confirm('이 가맹점을 승인하시겠습니까?')) return
    
        const { error } = await supabase
          .from('merchants')
          .update({
            status: '운영'
          })
          .eq('id', merchant.id)
    
        if (error) {
          alert('승인 실패: ' + error.message)
          return
        }
    
        alert('승인되었습니다.')
        location.reload()
      })
    
    document.querySelector('#reject-merchant')
      ?.addEventListener('click', async () => {
        if (!confirm('이 가맹점을 반려하시겠습니까?')) return
    
        const { error } = await supabase
          .from('merchants')
          .update({
            status: '반려'
          })
          .eq('id', merchant.id)
    
        if (error) {
          alert('반려 실패: ' + error.message)
          return
        }
    
        alert('반려되었습니다.')
        location.reload()
      })
    
    })
    })
    })
    }
    
   
if (page === 'settlement') {
  const subMenu = document.querySelector('.admin-sub-menu')
  const titleBox = document.querySelector('.admin-title')
  const searchBox = document.querySelector('.admin-search-box')
  const summaryBox = document.querySelector('.admin-summary')
  const tableHead = document.querySelector('.admin-table thead')
  const paymentTableBody =
    document.querySelector<HTMLTableSectionElement>('#paymentTableBody')!

  if (subMenu) {
    subMenu.innerHTML =
      '정산예정내역 | 정산완료내역 | 정산보류내역'
  }

  if (titleBox) {
    titleBox.innerHTML = '▶ 정산관리 > 정산예정내역'
  }

  if (searchBox) {
    searchBox.innerHTML =
      '<div class="payment-search-line">' +
        '<button class="settlement-filter-btn" data-status="전체">전체</button>' +
        '<button class="settlement-filter-btn" data-status="정산대기">정산대기</button>' +
        '<button class="settlement-filter-btn" data-status="정산완료">정산완료</button>' +
      '</div>'
  }

  const { data: payments, error } = await supabase
    .from('payments')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    alert('정산내역 조회 실패: ' + error.message)
    return
  }

  const settlementRows = (payments || []).map((payment) => {
    const amount = Number(payment.amount || 0)
    const feeRate = 2
    const feeAmount = Math.floor(amount * feeRate / 100)
    const settlementAmount = amount - feeAmount

    const paymentDate = new Date(payment.created_at)
    const dueDate = new Date(paymentDate)
    dueDate.setDate(dueDate.getDate() + 1)

    return {
      ...payment,
      feeRate,
      feeAmount,
      settlementAmount,
      dueDate
    }
  })

  const totalAmount = settlementRows.reduce((sum, row) => {
    return sum + Number(row.amount || 0)
  }, 0)

  const totalFee = settlementRows.reduce((sum, row) => {
    return sum + row.feeAmount
  }, 0)

  const totalSettlement = settlementRows.reduce((sum, row) => {
    return sum + row.settlementAmount
  }, 0)

  if (summaryBox) {
    summaryBox.innerHTML =
      '결제금액 : ' + totalAmount.toLocaleString() + '원 &nbsp;&nbsp;&nbsp;' +
      '수수료 : ' + totalFee.toLocaleString() + '원 &nbsp;&nbsp;&nbsp;' +
      '정산예정금액 : ' + totalSettlement.toLocaleString() + '원'
  }

  if (searchBox) {
    searchBox.innerHTML =
      '<div class="payment-search-line">' +
        '<button class="settlement-filter-btn" data-status="전체">전체</button>' +
        '<button class="settlement-filter-btn" data-status="정산대기">정산대기</button>' +
        '<button class="settlement-filter-btn" data-status="정산완료">정산완료</button>' +
      '</div>'
  }

  if (tableHead) {
    tableHead.innerHTML =
      '<tr>' +
        '<th>No</th>' +
        '<th>가맹점ID</th>' +
        '<th>가맹점명</th>' +
        '<th>결제금액</th>' +
        '<th>수수료율</th>' +
        '<th>수수료</th>' +
        '<th>정산예정금액</th>' +
        '<th>결제일</th>' +
        '<th>정산예정일</th>' +
        '<th>정산상태</th>' +
      '</tr>'
  }

  let currentSettlementStatus = '전체'
let currentSettlementPageSize = 20

const renderSettlementTable = () => {
  const filteredRows = settlementRows.filter((row) => {
    const status = row.settlement_status || '정산대기'
    return currentSettlementStatus === '전체' || status === currentSettlementStatus
  })

  const visibleRows = filteredRows.slice(0, currentSettlementPageSize)

  paymentTableBody.innerHTML = ''

  visibleRows.forEach((row, index) => {
    const tr = document.createElement('tr')

    tr.className = 'settlement-row'
    tr.setAttribute(
      'data-status',
      row.settlement_status || '정산대기'
    )

    tr.innerHTML =
      '<td>' + (index + 1) + '</td>' +
      '<td>' +
        (row.merchant_id
          ? 'MER' + String(row.merchant_id).padStart(4, '0')
          : '-') +
      '</td>' +
      '<td>' + (row.merchant_name || '-') + '</td>' +
      '<td>' + Number(row.amount || 0).toLocaleString() + '원</td>' +
      '<td>' + row.feeRate + '%</td>' +
      '<td>' + row.feeAmount.toLocaleString() + '원</td>' +
      '<td>' + row.settlementAmount.toLocaleString() + '원</td>' +
      '<td>' + formatDate(row.created_at) + '</td>' +
      '<td>' + row.dueDate.toISOString().slice(0, 10) + '</td>' +
      '<td>' +
        (row.settlement_status === '정산완료'
          ? '정산완료'
          : '<button class="settlement-complete-button" data-id="' + row.id + '">정산완료</button>') +
      '</td>'

    paymentTableBody.appendChild(tr)
  })

  document.querySelectorAll('.settlement-complete-button')
    .forEach((button) => {
      button.addEventListener('click', async () => {
        const paymentId =
          (button as HTMLElement).getAttribute('data-id')

        const { error } = await supabase
          .from('payments')
          .update({
            settlement_status: '정산완료'
          })
          .eq('id', Number(paymentId))

        if (error) {
          alert('정산완료 처리 실패: ' + error.message)
          return
        }

        alert('정산완료 처리되었습니다')
        location.reload()
      })
    })
}

renderSettlementTable()

document.querySelectorAll('.settlement-filter-btn')
  .forEach((button) => {
    button.addEventListener('click', () => {
      currentSettlementStatus =
        (button as HTMLElement).getAttribute('data-status') || '전체'

      renderSettlementTable()
    })
  })

  document.querySelector<HTMLSelectElement>('#admin-page-size')!
  .addEventListener('change', (event) => {
    currentSettlementPageSize =
      Number((event.target as HTMLSelectElement).value)

    renderSettlementTable()
  })
  
}

if (page === 'payout') {
  const subMenu = document.querySelector('.admin-sub-menu')
  const titleBox = document.querySelector('.admin-title')
  const searchBox = document.querySelector('.admin-search-box')
  const summaryBox = document.querySelector('.admin-summary')
  const tableHead = document.querySelector('.admin-table thead')
  const paymentTableBody =
    document.querySelector<HTMLTableSectionElement>('#paymentTableBody')!

  if (subMenu) {
    subMenu.innerHTML = '출금예정내역 | 출금완료내역'
  }

  if (titleBox) {
    titleBox.innerHTML = '▶ 출금관리 > 출금예정내역'
  }

  if (searchBox) {
    searchBox.innerHTML =
      '<div class="payment-search-line">' +
        '<button class="payout-filter-btn" data-status="전체">전체</button>' +
        '<button class="payout-filter-btn" data-status="출금대기">출금대기</button>' +
        '<button class="payout-filter-btn" data-status="출금완료">출금완료</button>' +
      '</div>'
  }

  const { data: payments, error } = await supabase
    .from('payments')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    alert('출금내역 조회 실패: ' + error.message)
    return
  }

  const payoutRows = (payments || []).filter((payment) => {
    return payment.settlement_status === '정산완료'
  })

  const totalPayoutAmount = payoutRows.reduce((sum, payment) => {
    return sum + Number(payment.settlement_amount || payment.amount || 0)
  }, 0)

  if (summaryBox) {
    summaryBox.innerHTML =
      '출금대상 : ' + payoutRows.length + '건 &nbsp;&nbsp;&nbsp;' +
      '출금예정금액 : ' + totalPayoutAmount.toLocaleString() + '원 &nbsp;&nbsp;&nbsp;' +
      '출금시간 : 오후 3시'
  }

  if (tableHead) {
    tableHead.innerHTML =
      '<tr>' +
        '<th>No</th>' +
        '<th>가맹점ID</th>' +
        '<th>가맹점명</th>' +
        '<th>출금예정금액</th>' +
        '<th>출금시간</th>' +
        '<th>출금상태</th>' +
        '<th>처리</th>' +
      '</tr>'
  }

  paymentTableBody.innerHTML = ''

  payoutRows.forEach((row, index) => {
    const tr = document.createElement('tr')

    const payoutAmount =
      Number(row.settlement_amount || row.amount || 0)

    tr.innerHTML =
      '<td>' + (index + 1) + '</td>' +
      '<td>' +
        (row.merchant_id
          ? 'MER' + String(row.merchant_id).padStart(4, '0')
          : '-') +
      '</td>' +
      '<td>' + (row.merchant_name || '-') + '</td>' +
      '<td>' + payoutAmount.toLocaleString() + '원</td>' +
      '<td>15:00</td>' +
      '<td>' + (row.payout_status || '출금대기') + '</td>' +
      '<td>' +
        (row.payout_status === '출금완료'
          ? '출금완료'
          : '<button class="payout-complete-button" data-id="' + row.id + '">출금완료</button>') +
      '</td>'

    paymentTableBody.appendChild(tr)
  })

  document.querySelectorAll('.payout-complete-button')
    .forEach((button) => {
      button.addEventListener('click', async () => {
        const paymentId =
          (button as HTMLElement).getAttribute('data-id')

        const { error } = await supabase
          .from('payments')
          .update({
            payout_status: '출금완료'
          })
          .eq('id', Number(paymentId))

        if (error) {
          alert('출금완료 처리 실패: ' + error.message)
          return
        }

        alert('출금완료 처리되었습니다')
        location.reload()
      })
    })
}

if (page === 'order') {
  const subMenu = document.querySelector('.admin-sub-menu')
  const titleBox = document.querySelector('.admin-title')
  const searchBox = document.querySelector('.admin-search-box')
  const summaryBox = document.querySelector('.admin-summary')
  const tableHead = document.querySelector('.admin-table thead')
  const paymentTableBody =
    document.querySelector<HTMLTableSectionElement>('#paymentTableBody')!

    if (subMenu) {
      subMenu.innerHTML = ''
    }

  if (titleBox) {
    titleBox.innerHTML = '▶ 주문관리 > 주문접수'
  }

  if (searchBox) {
    searchBox.innerHTML =
      '<div class="payment-search-line">' +
        '<button class="order-filter-btn" data-status="전체">전체</button>' +
        '<button class="order-filter-btn" data-status="준비중">준비중</button>' +
        '<button class="order-filter-btn" data-status="완료">완료</button>' +
      '</div>'
  }

  const loginMerchantId = Number(
    sessionStorage.getItem('login_merchant_id')
  )

  const { data: orders, error } = await supabase
  .from('orders')
  .select('*')
  .eq('merchant_id', loginMerchantId)
  .order('created_at', { ascending: false })

  if (error) {
    alert('주문내역 조회 실패: ' + error.message)
    return
  }

  if (summaryBox) {
    summaryBox.innerHTML =
      '주문수 : ' + (orders || []).length + '건'
  }

  if (tableHead) {
    tableHead.innerHTML =
      '<tr>' +
        '<th>No</th>' +
        '<th>주문번호</th>' +
        '<th>가맹점명</th>' +
        '<th>주문내용</th>' +
        '<th>결제금액</th>' +
        '<th>주문상태</th>' +
        '<th>처리</th>' +
        '<th>고객호출</th>' +
      '</tr>'
  }

  paymentTableBody.innerHTML = ''

  ;(orders || []).forEach((order, index) => {
    const tr = document.createElement('tr')

    const orderNumber =
  order.order_no?.split('-')[1] ||
  order.order_no ||
  index + 1

const orderItems = Array.isArray(order.items)
  ? order.items
      .map((item: any) => item.name + ' x ' + item.quantity)
      .join(', ')
  : '-'

tr.innerHTML =
  '<td>' + (index + 1) + '</td>' +
  '<td>' + orderNumber + '번</td>' +
  '<td>MER' + String(order.merchant_id || 1).padStart(4, '0') + '</td>' +
  '<td>' + orderItems + '</td>' +
  '<td>' + Number(order.total_amount || 0).toLocaleString() + '원</td>' +
  '<td>' + (order.order_status || '접수') + '</td>' +
      '<td>' +
        (order.order_status === '완료'
          ? '완료'
          : '<button class="order-complete-button" data-id="' + order.id + '">조리완료</button>') +
      '</td>' +
      '<td>' +
        '<select class="call-message-select">' +
  '<option value="주문 나왔습니다.">주문 나왔습니다.</option>' +
  '<option value="주문이 준비되었습니다.">주문이 준비되었습니다.</option>' +
  '<option value="음식을 찾아가 주세요.">음식을 찾아가 주세요.</option>' +
  '<option value="카운터로 와주세요.">카운터로 와주세요.</option>' +
  '<option value="픽업 부탁드립니다.">픽업 부탁드립니다.</option>' +
  '<option value="아따 싸게싸게 챙겨가쇼.">아따 싸게싸게 챙겨가쇼.</option>' +
  '<option value="챙겨 갈껀가 말껀가.">챙겨 갈껀가 말껀가.</option>' +
  '<option value="행님 주문 나왔습니다.">행님 주문 나왔습니다.</option>' +
'</select>' +
'<button class="customer-call-button" data-number="' + orderNumber + '">' +
  '고객호출' +
'</button>'
      '</td>'

    paymentTableBody.appendChild(tr)
  })

  const numberToKorean = (num: number) => {
    const tens = Math.floor(num / 10)
    const ones = num % 10

    const tenText = ['', '십', '이십', '삼십', '사십', '오십', '육십', '칠십', '팔십', '구십']
    const oneText = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구']

    return tenText[tens] + oneText[ones]
  }

  const speak = (text: string) => {
    const message = new SpeechSynthesisUtterance(text)
    message.lang = 'ko-KR'
    message.rate = 0.95
    window.speechSynthesis.speak(message)
  }
  const playNewOrderSound = () => {
    const audio = new Audio(
      'https://actions.google.com/sounds/v1/alarms/dingdong.ogg'
    )
  
    audio.play()
  
    setTimeout(() => {
      speak('새 주문이 접수되었습니다.')
    }, 1000)
  }
  document.querySelectorAll('.customer-call-button')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const number =
          (button as HTMLElement).getAttribute('data-number') || ''

          const tr = (button as HTMLElement).closest('tr')
          const select =
            tr?.querySelector<HTMLSelectElement>('.call-message-select')
          
          const selectedMessage =
            select?.value || '주문 나왔습니다.'
          
          const callMessage =
            numberToKorean(Number(number)) +
            '번 고객님 ' +
            selectedMessage

        window.speechSynthesis.cancel()

        speak(callMessage)

        setTimeout(() => {
          speak(callMessage)
        }, 5000)
      })
    })

    document.querySelectorAll('.order-complete-button')
    .forEach((button) => {
      button.addEventListener('click', async () => {
        const orderId =
          (button as HTMLElement).getAttribute('data-id')
  
        const { error } = await supabase
          .from('orders')
          .update({
            order_status: '완료'
          })
          .eq('id', Number(orderId))
  
        if (error) {
          alert('조리완료 처리 실패: ' + error.message)
          return
        }
  
        alert('조리완료 처리되었습니다')
  
        const tr = (button as HTMLElement).closest('tr')

if (tr) {
  const statusCell = tr.children[5]
  const actionCell = tr.children[6]

  if (statusCell) {
    statusCell.textContent = '완료'
  }

  if (actionCell) {
    actionCell.textContent = '완료'
  }
}
      })
    })
    let lastOrderCount = (orders || []).length

setInterval(async () => {
  const loginMerchantId = Number(
    sessionStorage.getItem('login_merchant_id')
  )

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('merchant_id', loginMerchantId)

  if (error || !data) {
    return
  }

  if (data.length > lastOrderCount) {
    playNewOrderSound()
    lastOrderCount = data.length
  
  }
}, 3000)

}

if (page === 'mini') {

  document.querySelector('.admin-wrap')
  ?.classList.add('mini-mode')

  const subMenu = document.querySelector('.admin-sub-menu')
  const titleBox = document.querySelector('.admin-title')
  const searchBox = document.querySelector('.admin-search-box')
  const summaryBox = document.querySelector('.admin-summary')
  const tableHead = document.querySelector('.admin-table thead')
  const paymentTableBody =
    document.querySelector<HTMLTableSectionElement>('#paymentTableBody')!

  if (subMenu) {
    subMenu.innerHTML =
  '<button class="mini-sub-tab" id="mini-product-tab">상품관리</button>' +
  '<button class="mini-sub-tab" id="mini-mall-tab">쇼핑몰관리</button>' +
  '<button class="mini-sub-tab" id="mini-qr-tab">QR관리</button>'
  document.querySelector('#mini-product-tab')
  ?.addEventListener('click', () => {
    location.reload()
  })

  document.querySelector('#mini-mall-tab')
  ?.addEventListener('click', () => {
    const loginMerchantId =
      sessionStorage.getItem('login_merchant_id')

    if (!loginMerchantId) {
      alert('가맹점 로그인 후 이용 가능합니다.')
      location.href = '/merchant-login'
      return
    }

    const kioskUrl =
      window.location.origin + '/kiosk?merchant_id=' + loginMerchantId

    if (titleBox) {
      titleBox.innerHTML = '▶ 미니상점 > 쇼핑몰관리'
    }

    if (searchBox) {
      searchBox.innerHTML = ''
    }

    if (summaryBox) {
      summaryBox.innerHTML =
        '고객이 접속하는 미니상점 주소입니다.'
    }

    if (tableHead) {
      tableHead.innerHTML = ''
    }

    paymentTableBody.innerHTML =
      '<tr>' +
      '<td colspan="8" style="padding:40px; text-align:center;">' +
      '<h2>내 미니상점 주소</h2>' +
      '<p id="mall-url-text" style="font-size:18px; font-weight:bold;">' +
      kioskUrl +
      '</p>' +
      '<button id="copy-mall-url">주소복사</button>' +
      '<button id="open-mall-url" style="margin-left:10px;">새창열기</button>' +
      '</td>' +
      '</tr>'

    document.querySelector('#copy-mall-url')
      ?.addEventListener('click', async () => {
        await navigator.clipboard.writeText(kioskUrl)
        alert('상점 주소가 복사되었습니다.')
      })

    document.querySelector('#open-mall-url')
      ?.addEventListener('click', () => {
        window.open(kioskUrl, '_blank')
      })
  })

document.querySelector('#mini-qr-tab')
  ?.addEventListener('click', () => {
    if (titleBox) {
      titleBox.innerHTML = '▶ 미니상점 > QR관리'
    }

    if (searchBox) {
      searchBox.innerHTML =
        '<button id="show-kiosk-qr">QR생성</button>' +
        '<div id="kiosk-qr-box" style="margin-top:20px;"></div>'
    }

    if (summaryBox) {
      summaryBox.innerHTML =
        'QR을 생성해서 매장에 비치할 수 있습니다.'
    }

    paymentTableBody.innerHTML = ''
  })
  document.querySelector('#mini-qr-tab')
  ?.addEventListener('click', async () => {

    const qrBox =
      document.querySelector<HTMLDivElement>('#kiosk-qr-box')

    if (!qrBox) {
      alert('QR 영역을 찾을 수 없습니다.')
      return
    }

    const loginMerchantId =
      sessionStorage.getItem('login_merchant_id')

    if (!loginMerchantId) {
      alert('가맹점 로그인 후 QR 생성이 가능합니다.')
      return
    }

    const kioskUrl =
      window.location.origin +
      '/kiosk?merchant_id=' +
      loginMerchantId

      qrBox.innerHTML =
      '<div style="text-align:center;">' +
      '<canvas id="kiosk-qr-canvas"></canvas>' +
      '<br><br>' +
      '<button id="copy-kiosk-url">주소복사</button>' +
'<br><br>' +
'<button id="download-kiosk-qr">QR다운로드</button>' +
'</div>'

    const canvas =
      document.querySelector<HTMLCanvasElement>(
        '#kiosk-qr-canvas'
      )!

    await QRCode.toCanvas(canvas, kioskUrl, {
      width: 180,
      margin: 2,
    })

    document.querySelector('#copy-kiosk-url')
      ?.addEventListener('click', async () => {
        await navigator.clipboard.writeText(kioskUrl)
        alert('QR 주소가 복사되었습니다.')
      })
      document.querySelector('#download-kiosk-qr')
  ?.addEventListener('click', () => {
    const canvas =
      document.querySelector<HTMLCanvasElement>('#kiosk-qr-canvas')!

    const link = document.createElement('a')
    link.download = 'NXG-QR.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  })
  })
  }


  if (titleBox) {
    titleBox.innerHTML = '▶ 미니상점 > 상품관리'
  }

  if (searchBox) {
    searchBox.innerHTML =
      '<button id="move-product-create">상품등록</button>'
  }

  const loginMerchantId = Number(
    sessionStorage.getItem('login_merchant_id')
  )

  const { data: products, error } = await supabase
  .from('products')
  .select('*')
  .eq('merchant_id', loginMerchantId)
  .order('id', { ascending: false })

  if (error) {
    alert('상품조회 실패 : ' + error.message)
    return
  }

  if (summaryBox) {
    summaryBox.innerHTML =
      '상품수 : ' + (products?.length || 0) + '개'
  }

  if (tableHead) {
    tableHead.innerHTML =
      '<tr>' +
      '<th>No</th>' +
      '<th>가맹점ID</th>' +
      '<th>상품명</th>' +
      '<th>판매가</th>' +
      '<th>상태</th>' +
      '<th>관리</th>' +
      '<th>주문링크</th>' +
      '</tr>'
  }

  paymentTableBody.innerHTML = ''

  products?.forEach((product, index) => {
    const tr = document.createElement('tr')

    tr.innerHTML =
      '<td>' + (index + 1) + '</td>' +
      '<td>MER' + String(product.merchant_id).padStart(4, '0') + '</td>' +
      '<td>' + product.product_name + '</td>' +
      '<td>' + Number(product.price).toLocaleString() + '원</td>' +
      '<td>' + (product.status || '판매중') + '</td>' +
'<td>' +
  '<button class="product-status-button" data-id="' + product.id + '" data-status="' + (product.status || '판매중') + '">' +
    ((product.status || '판매중') === '판매중' ? '판매중지' : '판매재개') +
  '</button>' +
  '<button class="product-delete-button" data-id="' + product.id + '" style="margin-left:6px;">삭제</button>' +
'</td>' +

'<td><button class="quick-btn" onclick="window.open(\'/kiosk?merchant_id=' +
product.merchant_id +
'\')">상점보기</button></td>'

    paymentTableBody.appendChild(tr)
  })

  document.querySelectorAll('.product-status-button')
  .forEach((button) => {
    button.addEventListener('click', async () => {
      const productId = (button as HTMLElement).getAttribute('data-id')
      const currentStatus = (button as HTMLElement).getAttribute('data-status')

      const nextStatus =
        currentStatus === '판매중' ? '판매중지' : '판매중'

      const { error } = await supabase
        .from('products')
        .update({
          status: nextStatus
        })
        .eq('id', Number(productId))

      if (error) {
        alert('상태 변경 실패: ' + error.message)
        return
      }

      alert('상품 상태가 변경되었습니다.')
      location.reload()
    })
  })

document.querySelectorAll('.product-delete-button')
  .forEach((button) => {
    button.addEventListener('click', async () => {
      const productId = (button as HTMLElement).getAttribute('data-id')

      if (!confirm('정말 이 상품을 삭제할까요?')) {
        return
      }

      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', Number(productId))

      if (error) {
        alert('상품 삭제 실패: ' + error.message)
        return
      }

      alert('상품이 삭제되었습니다.')
      location.reload()
    })
  })

  document.querySelector('#move-product-create')
    ?.addEventListener('click', () => {
      location.href = '/product-create'
    })
    
        }

        if (page === 'setting') {
          const subMenu = document.querySelector('.admin-sub-menu')
          const titleBox = document.querySelector('.admin-title')
          const searchBox = document.querySelector('.admin-search-box')
          const summaryBox = document.querySelector('.admin-summary')
          const tableHead = document.querySelector('.admin-table thead')
          const paymentTableBody =
            document.querySelector<HTMLTableSectionElement>('#paymentTableBody')!
        
          if (subMenu) subMenu.innerHTML = ''
          if (titleBox) titleBox.innerHTML = '▶ 설정관리 > 음성설정'
          if (searchBox) searchBox.innerHTML = ''
          if (summaryBox) summaryBox.innerHTML = '주문알림과 고객호출 문구를 설정합니다.'
          if (tableHead) tableHead.innerHTML = ''
        
          const savedCallMessage =
            sessionStorage.getItem('customer_call_message') || '주문 나왔습니다.'
        
          const savedNewOrderMessage =
            sessionStorage.getItem('new_order_message') || '새 주문이 접수되었습니다.'
        
          paymentTableBody.innerHTML =
            '<tr>' +
            '<td colspan="8" style="padding:40px;">' +
            '<h2>음성 설정</h2>' +
        
            '<div style="margin:20px 0;">' +
            '<label>고객호출 문구</label><br>' +
            '<select id="customer-call-message-setting" style="width:360px; height:40px;">' +
            '<option value="주문 나왔습니다.">주문 나왔습니다.</option>' +
            '<option value="주문이 준비되었습니다.">주문이 준비되었습니다.</option>' +
            '<option value="음식을 찾아가 주세요.">음식을 찾아가 주세요.</option>' +
            '<option value="카운터로 와주세요.">카운터로 와주세요.</option>' +
            '<option value="픽업 부탁드립니다.">픽업 부탁드립니다.</option>' +
            '<option value="아따~ 싸게싸게 챙겨가쇼~">아따~ 싸게싸게 챙겨가쇼~</option>' +
            '<option value="챙겨 갈껀가 말껀가.">챙겨 갈껀가 말껀가.</option>' +
            '</select>' +
            '</div>' +
        
            '<div style="margin:20px 0;">' +
            '<label>새 주문 알림 문구</label><br>' +
            '<select id="new-order-message-setting" style="width:360px; height:40px;">' +
            '<option value="새 주문이 접수되었습니다.">새 주문이 접수되었습니다.</option>' +
            '<option value="주문 들어왔습니다.">주문 들어왔습니다.</option>' +
            '<option value="사장님 주문 들어왔어요.">사장님 주문 들어왔어요.</option>' +
            '<option value="새 주문입니다.">새 주문입니다.</option>' +
            '<option value="놀지 말고 일 하세요.">놀지 말고 일 하세요.</option>' +
            '<option value="주문 왔다...만들껀가 말껀가.">주문 왔다...만들껀가 말껀가.</option>' +
            '</select>' +
            '</div>' +
        
            '<button id="preview-call-message" style="width:120px; height:40px; margin-right:8px;">호출 미리듣기</button>' +
'<button id="preview-new-order-message" style="width:140px; height:40px; margin-right:8px;">주문알림 미리듣기</button>' +
'<button id="save-voice-setting" style="width:160px; height:40px;">저장</button>' +
'</td>' +
            '</tr>'
        
          const callSelect =
            document.querySelector<HTMLSelectElement>('#customer-call-message-setting')!
        
          const newOrderSelect =
            document.querySelector<HTMLSelectElement>('#new-order-message-setting')!
        
          callSelect.value = savedCallMessage
          newOrderSelect.value = savedNewOrderMessage

          const speakPreview = (text: string) => {
            const message = new SpeechSynthesisUtterance(text)
            message.lang = 'ko-KR'
            message.rate = 0.95
          
            window.speechSynthesis.cancel()
            window.speechSynthesis.speak(message)
          }

          document.querySelector('#preview-call-message')
  ?.addEventListener('click', () => {
    speakPreview(
      '사십구번 고객님 ' + callSelect.value
    )
  })

  document.querySelector('#preview-new-order-message')
  ?.addEventListener('click', () => {

    if (
      newOrderSelect.value ===
      '주문 왔다...만들껀가 말껀가.'
    ) {
      speakPreview('주문 왔다.')

      setTimeout(() => {
        speakPreview('만들껀가 말껀가.')
      }, 1000)

      return
    }

    if (
      newOrderSelect.value ===
      '놀지 말고 일 하세요.'
    ) {

      const audio = new Audio(
        'https://actions.google.com/sounds/v1/alarms/dingdong.ogg'
      )
    
      audio.volume = 1
    
      audio.play()
        .then(() => {
          console.log('벨소리 성공')
        })
        .catch((err) => {
          console.log('벨소리 실패', err)
        })
    
      setTimeout(() => {
        speakPreview('놀지 말고 일 하세요.')
      }, 1500)
    
      return
    }

    speakPreview(newOrderSelect.value)
  })
        
          document.querySelector('#save-voice-setting')
            ?.addEventListener('click', () => {
              sessionStorage.setItem('customer_call_message', callSelect.value)
              sessionStorage.setItem('new_order_message', newOrderSelect.value)
        
              alert('음성 설정이 저장되었습니다.')
            })
        }

if (page === 'payment') {
const subMenu = document.querySelector('.admin-sub-menu')
const titleBox = document.querySelector('.admin-title')
const searchBox = document.querySelector('.admin-search-box')
const summaryBox = document.querySelector('.admin-summary')
const tableHead = document.querySelector('.admin-table thead')
const paymentTableBody =
  document.querySelector<HTMLTableSectionElement>('#paymentTableBody')!

if (subMenu) {
  subMenu.innerHTML =
    '승인내역조회 | POS주문내역조회 | 승인거절 내역조회 | 카드결제 | 현금영수증 발급'
}

if (titleBox) {
  titleBox.innerHTML = '▶ 결제관리 > 승인내역조회'
}

if (searchBox) {
  searchBox.innerHTML =
    '<div class="payment-search-line">' +
      '<select><option>전체 PG</option><option>토스</option><option>코페이</option></select>' +
      '<select><option>거래일자</option><option>승인일자</option></select>' +
      '<input placeholder="시작일" />' +
      '<span>~</span>' +
      '<input placeholder="종료일" />' +
      '<button class="quick-btn">오늘</button>' +
      '<button class="quick-btn">어제</button>' +
      '<button class="quick-btn">당월</button>' +
      '<select><option>가맹점ID</option><option>가맹점명</option><option>주문번호</option></select>' +
      '<input placeholder="검색어 입력" />' +
      '<button class="search-btn">🔍 검색</button>' +
    '</div>'
}

const result = await supabase
  .from('payments')
  .select('*')
  .order('created_at', { ascending: false })

if (result.error) {
  alert('결제내역 조회 실패: ' + result.error.message)
  return
}

const payments = result.data || []

if (summaryBox) {
  const totalAmount = payments.reduce((sum, payment) => {
    return sum + Number(payment.amount || 0)
  }, 0)

  summaryBox.innerHTML =
    '검색된 데이터 : ' + payments.length + '건 &nbsp;&nbsp;&nbsp;' +
    '사용자 : ' + payments.length + '명 &nbsp;&nbsp;&nbsp;' +
    '전체금액 : ' + totalAmount.toLocaleString() + '원'
}

if (tableHead) {
  tableHead.innerHTML =
    '<tr>' +
      '<th>No</th>' +
      '<th>승인일<br/>승인번호</th>' +
      '<th>취소일<br/>거래번호</th>' +
      '<th>가맹점아이디/구분<br/>가맹점상호/가맹점명</th>' +
      '<th>매입사/구매자연락처<br/>구매상품/구매자 성함</th>' +
      '<th>메모</th>' +
      '<th>카드번호<br/>할부구분</th>' +
      '<th>결제수단<br/>결제금액</th>' +
      '<th>거래방식<br/>물품금액</th>' +
      '<th>부가세<br/>봉사료</th>' +
      '<th>거래수수료<br/>가맹점금액</th>' +
    '</tr>'
}

paymentTableBody.innerHTML = ''

payments.forEach((payment, index) => {
  const tr = document.createElement('tr')

  tr.innerHTML =
    '<td>' + (index + 1) + '</td>' +
    '<td>' + formatDate(payment.created_at) + '<br/>' + (payment.order_id || '-') + '</td>' +
    '<td>-<br/>' + (payment.payment_key || '-') + '</td>' +
    '<td>' + (payment.event_id || '-') + '<br/>-</td>' +
    '<td>-<br/>' + (payment.sender_name || '-') + '</td>' +
    '<td>' + (payment.message || '-') + '</td>' +
    '<td>-<br/>일시불</td>' +
    '<td>' + getStatusText(payment.status) + '<br/>' + Number(payment.amount || 0).toLocaleString() + '원</td>' +
    '<td>온라인<br/>' + Number(payment.amount || 0).toLocaleString() + '원</td>' +
    '<td>0원<br/>0원</td>' +
    '<td>0원<br/>' + Number(payment.amount || 0).toLocaleString() + '원</td>'

  paymentTableBody.appendChild(tr)
})
}
})
})

  } else if (path === '/store') {
    const params = new URLSearchParams(window.location.search)
    const eventId = params.get('id')
  
    const { data: menuData } = await supabase
      .from('menus')
      .select('*')
      .eq('event_id', Number(eventId))
  
    app.innerHTML = `
      <div class="page">
        <div class="payment-card">
          <h1>메뉴 주문</h1>
          <p>불러온 메뉴 수: ${(menuData || []).length}개</p>
  
          <div class="menu-list">
            ${(menuData || []).map((menu) => `
              <div class="menu-card">
                ${menu.image_url ? `<img src="${menu.image_url}" alt="${menu.name}">` : ''}
                <h3>${menu.name}</h3>
                <p>${Number(menu.price).toLocaleString()}원</p>
  
                <button
                  class="menu-select-button"
                  data-name="${menu.name}"
                  data-price="${menu.price}"
                >
                  선택하기
                </button>
              </div>
            `).join('')}
          </div>
  
          <div class="input-group">
            <label>선택 메뉴</label>
            <input id="order-name-input" type="text" readonly>
          </div>
  
          <div class="input-group">
            <label>결제 금액</label>
            <input id="amount-input" type="number" readonly>
          </div>
        
          <div class="input-group">
            <label>요청사항</label>
            <input id="message-input" type="text" placeholder="예: 덜 맵게 해주세요">
          </div>
  
          <button id="pay-button">결제하기</button>
        </div>
      </div>
    `
  
    document.querySelectorAll('.menu-select-button').forEach((button) => {
      button.addEventListener('click', () => {
        const price = (button as HTMLElement).getAttribute('data-price')
        const name = (button as HTMLElement).getAttribute('data-name')
  
        document.querySelector<HTMLInputElement>('#amount-input')!.value = price || ''
        document.querySelector<HTMLInputElement>('#order-name-input')!.value = name || ''
      })
    })
  
    document.querySelector<HTMLButtonElement>('#pay-button')!
      .addEventListener('click', async () => {
        const amountValue = Number(document.querySelector<HTMLInputElement>('#amount-input')!.value)
        const customerNameValue = '현장고객'
        const messageValue = document.querySelector<HTMLInputElement>('#message-input')!.value
        const orderNameValue = document.querySelector<HTMLInputElement>('#order-name-input')!.value
  
        if (!amountValue || !orderNameValue) {
          alert('메뉴를 선택해주세요')
          return
        }
  
        const tossPayments = await loadTossPayments(clientKey)
  
        sessionStorage.setItem('currentEventId', eventId || '')
        sessionStorage.setItem('currentEventType', 'store')
        sessionStorage.setItem('senderName', customerNameValue)
        sessionStorage.setItem('message', `${orderNameValue} / ${messageValue}`)
  
        const shortOrderNumber =
  String(Date.now()).slice(-4)

const orderIdValue =
  'order-' + shortOrderNumber
        await tossPayments.requestPayment('카드', {
          amount: amountValue,
          orderId: orderIdValue,
          orderName: orderNameValue,
          customerName: customerNameValue,
          successUrl: window.location.origin + '/success',
          failUrl: window.location.origin + '/fail',
        })
      })
  
  } else if (path === '/wedding' || path === '/funeral') {

    app.innerHTML = `
      <div class="page">
        <div class="payment-card ${isFuneral ? 'funeral-card' : 'wedding-card'}">
          <h1>${receiverName}</h1>
          <p>${paymentTitle}</p>

          <div class="menu-list">
  ${(menuData || []).map((menu) => `
    <div class="menu-card">
      ${menu.image_url ? `<img src="${menu.image_url}" alt="${menu.name}">` : ''}
      <h3>${menu.name}</h3>
      <p>${Number(menu.price).toLocaleString()}원</p>

      <button
        class="menu-select-button"
        data-price="${menu.price}"
      >
        선택하기
      </button>
    </div>
  `).join('')}
</div>
  
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
  
          <p class="secure-text">
            안전한 결제 시스템으로 보호됩니다
          </p>
        </div>
      </div>
    `

    document.querySelectorAll('.menu-select-button')
  .forEach((button) => {

    button.addEventListener('click', () => {

      const price =
        (button as HTMLElement)
          .getAttribute('data-price')

      document.querySelector<HTMLInputElement>('#amount-input')!
        .value = price || ''
    })
  })

  
    document.querySelector<HTMLButtonElement>('#pay-button')!
      .addEventListener('click', async () => {
        const amountInput = document.querySelector<HTMLInputElement>('#amount-input')!
        const nameInput = document.querySelector<HTMLInputElement>('#name-input')!
        const messageInput = document.querySelector<HTMLInputElement>('#message-input')!
        const amountValue = Number(amountInput.value)
        const customerNameValue = nameInput.value
        const messageValue = messageInput.value
  
        if (!amountValue || !customerNameValue) {
          alert('금액과 이름을 입력해주세요')
          return
        }
  
        const tossPayments = await loadTossPayments(clientKey)
  
        sessionStorage.setItem('currentEventId', eventId || '')
        sessionStorage.setItem('currentEventType', isFuneral ? 'funeral' : 'wedding')
        sessionStorage.setItem('senderName', customerNameValue)
        sessionStorage.setItem('message', messageValue)

       await tossPayments.requestPayment('카드', {
          amount: amountValue,
          orderId: 'order-' + Date.now(),
          orderName: paymentTitle,
          customerName: customerNameValue,
          successUrl: window.location.origin + '/success',
          failUrl: window.location.origin + '/fail',
        })
      })
  
    } else if (path === '/merchant-login') {
      app.innerHTML = `
        <div class="page">
          <div class="payment-card">
            <h1>가맹점 로그인</h1>

            <label>아이디</label>
            <input id="merchant-login-id" placeholder="아이디를 입력하세요" />

            <label>비밀번호</label>
            <input id="merchant-login-password" type="password" placeholder="비밀번호를 입력하세요" />

            <button class="gold-button" id="merchant-login-button">
              로그인
            </button>
          </div>
        </div>
      `

      document.querySelector<HTMLButtonElement>('#merchant-login-button')!
        .addEventListener('click', async () => {
          const loginId =
            document.querySelector<HTMLInputElement>('#merchant-login-id')!.value

          const password =
            document.querySelector<HTMLInputElement>('#merchant-login-password')!.value

          if (!loginId || !password) {
            alert('아이디와 비밀번호를 입력해주세요.')
            return
          }

          const { data: merchant, error } = await supabase
            .from('merchants')
            .select('*')
            .eq('login_id', loginId)
            .eq('password', password)
            .single()

          if (error || !merchant) {
            alert('로그인 정보가 올바르지 않습니다.')
            return
          }

          sessionStorage.setItem('login_merchant_id', String(merchant.id))
          sessionStorage.setItem('login_merchant_code', merchant.merchant_id)
          sessionStorage.setItem('login_merchant_name', merchant.merchant_name)

          alert(merchant.merchant_name + '님 로그인되었습니다.')

          window.location.href = '/merchant-admin'
        })


    } else if (path === '/kiosk') {
      const params = new URLSearchParams(window.location.search)
      const merchantId = Number(params.get('merchant_id') || 1)

      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('merchant_id', merchantId)
        .eq('status', '판매중')
        .order('id', { ascending: true })

      if (error) {
        app.innerHTML = `
          <div class="page">
            <h1>상품을 불러오지 못했습니다.</h1>
            <p>${error.message}</p>
          </div>
        `
      } else {
        app.innerHTML = `
          <div class="kiosk-page">
            <div class="kiosk-header">
              <h1>NXG 미니상점</h1>
              <div class="cart-badge">
                장바구니 <span id="cart-count">0</span>
              </div>
            </div>

            <div class="kiosk-hero">
              <h2>어서오세요!</h2>
              <p>원하시는 상품을 선택해주세요.</p>
            </div>

            <div class="kiosk-products">
              ${(products || []).map((product) => `
                <div class="kiosk-product-card">
                  ${product.image_url ? `
                    <img src="${product.image_url}" alt="${product.product_name}">
                  ` : `
                    <div class="no-image">이미지 없음</div>
                  `}

                  <div class="kiosk-product-info">
                    <h3>${product.product_name}</h3>
                    <p>${Number(product.price).toLocaleString()}원</p>
                  </div>

                  <button 
                    class="add-cart-button"
                    data-id="${product.id}"
                    data-name="${product.product_name}"
                    data-price="${product.price}"
                  >
                    담기
                  </button>
                </div>
              `).join('')}
            </div>

            <div class="kiosk-cart">
              <h2>장바구니</h2>
              <div id="cart-items">
                <p class="empty-cart">상품을 선택해주세요.</p>
              </div>

              <div class="cart-total">
                <span>총 결제금액</span>
                <strong id="cart-total-price">0원</strong>
              </div>

              </div>

<div class="kiosk-bottom-bar">
  <div class="bottom-total">
    <span>총 결제금액</span>
    <strong id="cart-total-price-bottom">0원</strong>
  </div>

  <button class="gold-button" id="kiosk-pay-button">
    결제하기
  </button>
</div>
            </div>
          </div>
        `

        const cart: {
          id: number
          name: string
          price: number
          quantity: number
        }[] = []

        const renderCart = () => {
          const cartItems = document.querySelector<HTMLDivElement>('#cart-items')!
          const cartCount = document.querySelector<HTMLSpanElement>('#cart-count')!
          const cartTotalPrice = document.querySelector<HTMLElement>('#cart-total-price')!
          const cartTotalPriceBottom =
            document.querySelector<HTMLElement>('#cart-total-price-bottom')
        
          const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0)
          const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
        
          cartCount.textContent = String(totalCount)
          cartTotalPrice.textContent = totalPrice.toLocaleString() + '원'
        
          if (cartTotalPriceBottom) {
            cartTotalPriceBottom.textContent = totalPrice.toLocaleString() + '원'
          }
          
          

          if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">상품을 선택해주세요.</p>'
            return
          }

          cartItems.innerHTML = cart.map((item) => `
            <div class="cart-item">
              <div>
                <strong>${item.name}</strong>
                <p>${item.price.toLocaleString()}원 x ${item.quantity}</p>
              </div>
              <div class="cart-item-buttons">
                <button class="cart-minus" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="cart-plus" data-id="${item.id}">+</button>
              </div>
            </div>
          `).join('')

          document.querySelectorAll<HTMLButtonElement>('.cart-plus').forEach((button) => {
            button.addEventListener('click', () => {
              const id = Number(button.dataset.id)
              const item = cart.find((cartItem) => cartItem.id === id)
              if (item) {
                item.quantity += 1
                renderCart()
              }
            })
          })

          document.querySelectorAll<HTMLButtonElement>('.cart-minus').forEach((button) => {
            button.addEventListener('click', () => {
              const id = Number(button.dataset.id)
              const item = cart.find((cartItem) => cartItem.id === id)

              if (item) {
                item.quantity -= 1

                if (item.quantity <= 0) {
                  const index = cart.findIndex((cartItem) => cartItem.id === id)
                  cart.splice(index, 1)
                }

                renderCart()
              }
            })
          })
        }

        document.querySelectorAll<HTMLButtonElement>('.add-cart-button').forEach((button) => {
          button.addEventListener('click', () => {
            const id = Number(button.dataset.id)
            const name = button.dataset.name || ''
            const price = Number(button.dataset.price)

            const existingItem = cart.find((item) => item.id === id)

            if (existingItem) {
              existingItem.quantity += 1
            } else {
              cart.push({
                id,
                name,
                price,
                quantity: 1,
              })
            }

            renderCart()
          })
        })

        document.querySelector<HTMLButtonElement>('#kiosk-pay-button')!
  .addEventListener('click', async () => {
    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    if (cart.length === 0) {
      alert('상품을 먼저 선택해주세요.')
      return
    }

    const callNumber = Math.floor(1 + Math.random() * 99)
const orderNo = 'ORD-' + callNumber + '-' + Date.now()
sessionStorage.setItem('kiosk_call_number', String(callNumber))

    sessionStorage.setItem('kiosk_order_no', orderNo)
    sessionStorage.setItem('kiosk_merchant_id', String(merchantId))
    sessionStorage.setItem('kiosk_items', JSON.stringify(cart))
    sessionStorage.setItem('kiosk_total_amount', String(totalPrice))

    const tossPayments = await loadTossPayments(clientKey)

    await tossPayments.requestPayment('카드', {
      amount: totalPrice,
      orderId: orderNo,
      orderName: 'NXG 미니상점 주문',
      customerName: '미니상점 고객',
      successUrl: window.location.origin + '/kiosk-success',
      failUrl: window.location.origin + '/fail',
    })
  })
          
      }
    } else if (path === '/kiosk-success') {
      const orderNo = sessionStorage.getItem('kiosk_order_no')
      const merchantId = sessionStorage.getItem('kiosk_merchant_id')
      const itemsText = sessionStorage.getItem('kiosk_items')
      const totalAmount = sessionStorage.getItem('kiosk_total_amount')
      const callNumber = sessionStorage.getItem('kiosk_call_number')
  
      const items = itemsText ? JSON.parse(itemsText) : []
  
      if (!orderNo || !merchantId || !totalAmount) {
        app.innerHTML = `
          <div class="page">
            <div class="payment-card">
              <h1>주문 정보가 없습니다.</h1>
              <button onclick="location.href='/kiosk?merchant_id=1'">상점으로 돌아가기</button>
            </div>
          </div>
        `
      } else {
        const { error } = await supabase
          .from('orders')
          .insert({
            merchant_id: Number(merchantId),
            order_no: orderNo,
            items: items,
            total_amount: Number(totalAmount),
            order_status: '접수',
            payment_status: '결제완료',
          })
  
        if (error) {
          app.innerHTML = `
            <div class="page">
              <div class="payment-card">
                <h1>주문 저장 실패</h1>
                <p>${error.message}</p>
              </div>
            </div>
          `
        } else {
          sessionStorage.removeItem('kiosk_order_no')
          sessionStorage.removeItem('kiosk_merchant_id')
          sessionStorage.removeItem('kiosk_items')
          sessionStorage.removeItem('kiosk_total_amount')
  
          app.innerHTML = `
  <div class="page">
    <div class="payment-card">

      <h1 style="
  font-size:28px;
  margin-bottom:20px;
  font-weight:700;
">
  결제가 완료되었습니다.
</h1>

      <p style="
  margin-top:25px;
  font-size:40px;
  font-weight:800;
  margin-bottom:10px;
">
  주문번호
</p>

      <div style="
  font-size:150px;
  font-weight:900;
  color:#d4af37;
  line-height:1;
  margin:10px 0 30px;
">
  ${callNumber}
</div>

      <div style="
  background:#f8f5ee;
  border-radius:12px;
  padding:20px;
  margin:20px auto;
  width:80%;
  font-size:28px;
  font-weight:bold;
">
  결제금액 :
  ${Number(totalAmount).toLocaleString()}원
</div>

      <p style="
  margin-top:30px;
  font-size:30px;
  font-weight:600;
">
  잠시만 기다려주세요.
</p>

    </div>
  </div>
`
        }
      }
  } else {
    app.innerHTML = `
      <div class="page">
        <div class="landing-card">
         <p class="brand-title">PAY FLOW</p>
         <h1>모바일 축의금 · 부의금 결제 솔루션</h1> 

         <p class="hero-badge">
  QR · 링크 · 모바일 간편결제 지원
</p>
  
          <p class="landing-subtitle">
            결혼식과 장례식에서 QR·링크·카카오 공유로 간편하게 결제하고,
            관리자 페이지에서 행사별 정산까지 확인할 수 있습니다.
          </p>

          <div class="landing-features">
            <div>QR 결제</div>
            <div>링크 공유</div>
            <div>카카오 공유</div>
            <div>행사별 정산</div>
            <div>계좌 등록</div>
            <div>관리자 대시보드</div>
          </div>
  
          <div class="landing-buttons">
         <button class="gold-button" id="create-button">행사 생성하기</button>
<button class="gold-button" id="admin-button">관리자 페이지</button>
<button class="gold-button" id="contact-button">도입 문의</button>   
          </div>
  
          <div class="demo-section">
  <h2>데모 체험</h2>

  <div class="demo-cards">
    <a class="demo-card wedding-demo" href="/wedding">
      💍 웨딩 결제 데모
    </a>

    <a class="demo-card funeral-demo" href="/funeral">
      🕊 장례 결제 데모
    </a>
  </div>
</div>
  
          <p class="secure-text">
            웨딩홀 · 장례식장 · 행사 업체를 위한 비대면 결제 관리 시스템
          </p>
         
          <div class="landing-flow">
  <h2>이용 흐름</h2>

    <div class="flow-steps">
    <div>1. 행사 생성</div>
    <div>2. 링크/QR 공유</div>
    <div>3. 고객 결제</div>
    <div>4. 관리자 정산</div>
  </div>
</div>
</div>
</div>
`
  
    document.querySelector<HTMLButtonElement>('#create-button')!
      .addEventListener('click', () => {
        window.location.href = '/create'
      })
  
      document.querySelector<HTMLButtonElement>('#admin-button')!
      .addEventListener('click', () => {
        window.location.href = '/admin'
      })

     document.querySelector<HTMLButtonElement>('#contact-button')!
  .addEventListener('click', () => {
    window.location.href =
      'sms:010-9938-2962?body=' +
      encodeURIComponent(
        '안녕하세요. 모바일 축의금/부의금 결제 솔루션 도입 문의드립니다.'
      )
  })
  }  