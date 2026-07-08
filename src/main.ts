import './style.css'
import { loadTossPayments } from '@tosspayments/payment-sdk'
import { createClient } from '@supabase/supabase-js'
import Tesseract from 'tesseract.js'
import QRCode from 'qrcode'

const clientKey = 'test_ck_LlDJaYngroaYkOqwzpPl3ezGdRpX'
const adminPassword = '1234'
const adminSecondCode = '5678'

const supabaseUrl = 'https://rnmptlxdeihvfwegoqnf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJubXB0bHhkZWlodmZ3ZWdvcW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MzcwMDMsImV4cCI6MjA5NDIxMzAwM30.5SeOiuZgFmU7RUu5kzLpLBUwC91SYI3WxqRFoafMrG8'

const supabase = createClient(supabaseUrl, supabaseKey)
const app = document.querySelector<HTMLDivElement>('#app')!
const path = window.location.pathname

function getMemberMenuHtml(activeMenu: string) {
  return `
    <div class="member-main-tabs">
      <button id="merchant-home-tab" class="${activeMenu === 'home' ? 'active' : ''}">관리홈</button>
      <button id="merchant-member-tab" class="${activeMenu === 'members' ? 'active' : ''}">회원관리</button>
      <button id="merchant-billing-tab" class="${activeMenu === 'billings' ? 'active' : ''}">청구관리</button>
      <button id="merchant-batch-tab" class="${activeMenu === 'batch' ? 'active' : ''}">수기결제</button>
      <button id="merchant-payment-list-tab" class="${activeMenu === 'payments' ? 'active' : ''}">결제내역</button>
    </div>
  `
}

function bindMemberMenuEvents() {
  document.querySelector('#merchant-home-tab')
    ?.addEventListener('click', () => {
      location.href = '/merchant-admin'
    })

  document.querySelector('#merchant-member-tab')
    ?.addEventListener('click', () => {
      location.href = '/merchant-members'
    })

  document.querySelector('#merchant-billing-tab')
    ?.addEventListener('click', () => {
      location.href = '/merchant-billings'
    })

  document.querySelector('#merchant-batch-tab')
    ?.addEventListener('click', () => {
      location.href = '/merchant-batch'
    })

    document.querySelector('#merchant-payment-list-tab')
    ?.addEventListener('click', () => {
      alert('결제내역 화면 준비중입니다.')
    })
}

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

        const usePg = merchantData.pg_company || ''
        sessionStorage.setItem('selected_pg_company', usePg)

if (usePg === '코페이') {
  if (!merchantData.korpay_pg_mid || !merchantData.korpay_pg_mkey) {
    alert('코페이 인증결제 MID 또는 MKEY가 등록되지 않았습니다.')
    return
  }

  alert(
    '코페이 인증결제 준비 완료\n\n' +
    'MID 등록 확인됨\n' +
    'MKEY 등록 확인됨'
  )

  return
}

if (usePg === '토스페이먼츠') {
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
      '/success?source=kiosk&merchantId=' +
      merchantData.id +
      '&merchantName=' +
      encodeURIComponent(merchantData.merchant_name),
    failUrl: window.location.origin + '/fail',
  })

  return
}

alert('사용 PG사가 등록되지 않았습니다. 가맹점 정보에서 사용 PG사를 확인해주세요.')
      })
  }

  const productMerchantId =
  Number(sessionStorage.getItem('login_merchant_id'))


    app.innerHTML = `
      <div class="page">
        <div class="payment-card">
          <h1>상품 등록</h1>


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

          <h2 style="margin-top:30px;">등록된 상품</h2>

<div id="merchant-product-list"></div>
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
              merchant_id: productMerchantId,
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
  

} else if (path === '/merchant-apply') {
  app.innerHTML = `
    <div class="page">
      <div class="payment-card merchant-terms-card">
        <h1>가맹점 가입 신청</h1>
        <p>서비스 이용을 위해 아래 약관에 동의해주세요.</p>

        <div class="terms-box">

  <h3>서비스 이용약관</h3>

  <div class="terms-content full-terms-scroll">

제1조 목적

본 이용약관은 “NXGSOFT”(이하 "모바일 전자결제서비스“”오픈마켓 통신판매대행")의 서비스의 이용조건과 운영에 관한 제반사항 규정을 목적으로 합니다.

제2조 용어의 정의

본 약관에서 사용되는 주요한 용어의 정의는 다음과 같습니다.

① NXGSOFT : PG 전자결제서비스를 탑재한 오픈마켓 모바일웹으로서 회원들이 NXGSOFT 모바일 웹의 입점주가 되어 상품을 등록, 판매하고, 정산받는 시스템이다.
② 회원 : NXGSOFT 서비스의 약관에 동의하고 개인정보를 제공하여 회원등록을 한 자로서, 이용계약을 체결 후 모바일웹에 입점하여 판매활동을 사용하는자를 말한다.
③ 이용계약 : NXGSOFT 이용과 관련하여 모바일가입 회원간에 체결 하는 계약을 말한다.
④ 회원 아이디(이하 "ID") : 회원의 식별과 회원의 서비스 이용을 위하여 회원별로 부여하는 고유한 문자와 숫자의 조합을 말한다.
⑤ 비밀번호 : 회원이 부여받은 ID와 일치된 회원임을 확인하고 회원의 권익보호를 위하여 회원이 선정한 문자와 숫자의 조합을 말한다.
⑥ 해지 : 회원이 NXGSOFT 이용계약을 해약하는 것을 말한다.
⑦ 카드리더기, 수기결제, SMS문자결제 : NXGSOFT 모바일웹에서 카드결제 안에 있는 결제의 종류이고 3가지 동작으로 대면, 비대면 카드결제를 받을수 있다.
⑧ PG전자결제서비스 : NXGSOFT가 PG사에 가맹점으로 등록후 사용하는 전자결제서비스다.
⑨ 수수료 : 회원들이 NXGSOFT 모바일웹을 통해 상품을 판매할 때 부담해야 하는 판매 수수료이다. 판매대금 정산일에 수수료를 제외한 금액을 정산해준다.
⑩ 정산일 : NXGSOFT 약관에서 정하는 회원들의 판매대금 정산일을 말한다.
⑪ 미니상점 : NXGSOFT 웹에서 각 회원들이 프로필 소개,상품등록, 판매, 관리할수 있는 기능.
⑫ 판매금지항목 : 카드사가 지정한 판매금지 목록들을 말한다.

제3조 약관외 준칙

NXGSOFT는 필요한 경우 별도로 운영정책을 공지 안내할 수 있으며, 본 약관과 운영정책이 중첩될 경우 운영정책이 우선 적용됩니다.

제4조 이용계약 체결

① 이용계약은 회원으로 등록하여 ‘NXGSOFT 서비스를 이용하려는 자의 본 약관 내용에 대한 동의와 가입신청에 대하여 운영자의 이용승낙으로 성립합니다.
② 회원으로 등록하여 서비스를 이용하려는 자는 NXGSOFT 이용 가입신청시 본 약관을 읽고 아래에 있는 "동의합니다"를 선택하는 것으로 본 약관에 대한 동의 의사 표시를 합니다.

제5조 서비스 이용 신청

① 회원으로 등록하여 NXGSOFT를 이용하려는 이용자는 모바일웹에서 요청하는 제반정보(이용자ID,비밀번호, 닉네임, 계좌번호 등)를 제공해야 합니다.
② 타인의 정보를 도용하거나 허위의 정보를 등록하는 등 본인의 진정한 정보를 등록하지 않은 회원은 웹 이용과 관련하여 아무런 권리를 주장할 수 없으며, 관계 법령에 따라 처벌 받을 수 있습니다.

제6조 개인정보처리방침

NXGSOFT는 회원가입시 제공한 개인정보 중 비밀번호를 가지고 있지 않으며 이와 관련된 부분은 NXGSOFT의 개인정보처리방침을 따릅니다.
NXGSOFT는 관계법령이 정하는 바에 따라 회원등록정보를 포함한 회원의 개인정보를 보호하기 위하여 노력을 합니다.
회원의 개인정보보호에 관하여 관계법령 및 NXGSOFT 서비스가 정하는 개인정보처리방침에 정한 바에 따릅니다.
단, 회원의 귀책사유로 인해 노출된 정보에 대해 운영자는 일체의 책임을 지지 않습니다.
운영자는 회원이 미풍양속에 저해되거나 국가안보에 위배되는 게시물 등 위법한 게시물을 등록 · 배포할 경우 관련기관의 요청이 있을시 회원의 자료를 열람 및 해당 자료를 관련기관에 제출할 수 있습니다.
① 미니 상점 이용시 구매자가 판매자의 이메일 및 SMS문자로 구매문의를 할수 있도록 정보를 제공합니다.

제7조 NXGSOFT의 권리와 의무

① NXGSOFT는 이용회원으로부터 제기되는 의견이나 불만이 정당하다고 인정할 경우에는 가급적빨리 처리하여야 합니다. 다만, 개인적인 사정으로 신속한 처리가 곤란한 경우에는 사후에공지 또는 이용회원에게 SMS문자, 전자우편 등을 보내는 등 최선을 다합니다.
② 운영자는 계속적이고 안정적인 NXGSOFT 서비스 제공을 위하여 설비에 장애가 생기거나 유실된 때에는 이를 지체 없이 수리 또는 복구할 수 있도록 해야합니다. 다만, 천재지변 또는 웹운영자에 부득이한 사유가 있는 경우, 모바일웹 운영을 일시 정지할 수 있습니다.
③ NXGSOFT는 모바일웹에서 회원들이 가입시 지정한 정산일에 맞추어 상품판매에 대한 대금을 회원 명이의 등록된 계좌로 지급합니다.
(단 PG사의 부득이한 전산망 오류나 설비에 장애가 생기는 경우 예정일 보다 정산이 늦어질수 있습니다.)
④ NXGSOFT는 판매대금에서 공제된 수수료에 대한 전자세금계산서를 사업자 및 개인에게 모두 발급합니다. (단 현금영수증 발행 기능은 NXGSOFT의 매출과 무관합니다.)
⑤ NXGSOFT는 회원의 판매대금 결제사고 리스크 관리를 위해 보증보험증권 발급을 요구 할수 있습니다.
⑥ NXGSOFT는 통신판매중개자로서 판매자 회원과 일반 구매자 사이의 분쟁 발생시 중재 역활을 수행해야 하고, 구매자의 이의가 지속될 경우 소비자보호원으로 안내 하도록합니다.
⑦ NXGSOFT는 카드사가 정한 판매금지항목을 준수하고, 회원들에게 공지하도록 합니다. 만약 공지에도 불구하고 회원이 판매금지항목 거래시 결제취소는 물론 정산대금 입금정지를 할수 있습니다. 때에 따라서 민,형사상의 조치를 취합니다.
⑧ 오픈마켓 운영 품질을 위해 회원들의 업로드 상품게시글을 상시 모니터합니다. 음란물 및 음란서적, 성인용품등의 판매시 예고없이 게시물이 삭제되며, 강제탈퇴 조치합니다.

제8조 회원의 의무

① 회원은 본 약관에서 규정하는 사항과 NXGSOFT가 정한 제반규정, 공지사항 및 운영정책 등 NXGSOFT가 공지하는 사항 및 관계법령을 준수하여야 하며, 기타 NXGSOFT의 업무에 방해가 되는 행위, NXGSOFT의 명예를 손상시키는 행위를 해서는 안됩니다.
② 회원은 NXGSOFT의 명시적 동의가 없는 한 서비스의 이용권한, 기타 이용계약상 지위를 타인에게 양도, 증여할 수 없으며, 이를 담보로 제공할 수 없습니다.
③ 이용고객은 아이디 및 비밀번호 관리에 상당한 주의를 기울여야 하며, NXGSOFT의 동의 없이 제3자에게 아이디를 제공하여 이용하게 할 수 없습니다.
④ 회원은 NXGSOFT의 지적 재산권 및 저작권을 침해해서는 안됩니다.
⑤ 모바일웹 및 본사 사이트에 등록되어 있는 각종 이미지 및 컨텐츠를 무단으로 이용 또는 복제를 하여, 상업의 목적으로 이용시 그에 따른 손해배상을 해야 합니다.
⑥ 회원은 일반 소비자와 허위로 거래를 하고 부당하게 판매대금을 정산 받은 경우, 형사상 책임을 물어야 하며, NXGSOFT가 금전적 피해를 입을 경우 명예훼손 및 영업방해 영업손실에 따른 3배에 책임을 물도록합니다.
⑦ 회원으로 하여금 결제대금 민원 및 사고 발생시 원만한 해결을 위해 회원의 남은 정산대금의 지급이 보류 됩니다.
⑧ 미니상점으로 상품 판매시 온라인 거래에 따른 운송장 번호를 구매자에게 통화 및 문자를 이용하여 알려야 하고, 배송전 상태의 주문건이 4일 이상 지속될 경우 일방적으로 NXGSOFT로 부터 주문취소 조치를 받게됩니다.
⑨ 미니상점을 이용한 온라인 거래가 불량하다고 판단되는 횟수가 NXGSOFT 내부 기준에 부합된다면, 회원 자격이 박탈될수 있고, 그에 따른 서비스 이용료 환불또한 불가합니다.
⑩ 무료가입 미니상점 사용을 제외한, 유료가입 서비스의 경우 가입후 비용 환불이 불가합니다. 회원가입 처리를 위한 전산 관리비 및 인건비등이 가입즉시 발생이되며, 개인정보활용 시스템에 대한 지출비용등이 발생됨으로 환불이 불가합니다.
⑪ 카드리더기의 경우 배송완료일 제외 구입후 7일이내 환불이 가능합니다. 단 1회이상 모바일웹에서 카드결제가 확인될 경우 환불이 불가합니다.
⑫ 카드거래에 따른 기본한도 및 건당 결제승인한가 모자를 경우 NXGSOFT가 안내하는 보증보험으로 가입해야 합니다.
⑬ 판매상품과 관련없는 이미지를 상품등록하거나 게시해서는 안됩니다. 해당 게시물은 예고없이 삭제됩니다.

제9조 서비스 이용시간

① 서비스 이용시간은 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴 1일 24시간을 원칙으로 합니다. 단, NXGSOFT의 시스템 정기점검, 증설 및 교체를 위해 사이트가 정한 날이나 시간에 서비스를 일시중단 할 수 있으며 예정된 작업으로 인한 서비스 일시 중단은 모바일웹 및 본사 홈페이지에 사전에 공지하오니 수시로 참고하시길 바랍니다.
② 단, NXGSOFT 모바일웹은 다음 경우에 대하여 사전 공지나 예고없이 서비스를 일시적 혹은 영구적으로 중단할 수 있습니다.
- 긴급한 시스템 점검, 증설, 교체, 고장 혹은 오동작을 일으키는 경우
- 국가비상사태, 정전, 천재지변 등의 불가항력적인 사유가 있는 경우
- 전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를 중지한 경우
- 서비스 이용의 폭주 등으로 정상적인 서비스 이용에 지장이 있는 경우
③ 전항에 의한 서비스 중단의 경우 NXGSOFT는 사전에 공지사항 등을 통하여 회원에게 통지 합니다. 단, 모바일웹이 통제할 수 없는 사유로 발생한 서비스의 중단에 대하여 사전공지가 불가능한 경우에는 사후공지로 대신합니다.

제10조 서비스 이용 해지

① 회원이 NXGSOFT와의 이용계약을 해지하고자 하는 경우에는 회원 본인이 온라인을 통하여 등록해지신청을 하여야 합니다.
② 해지신청과 동시에 NXGSOFT가 제공하는 사이트 관련 프로그램이 회원관리 화면에서 자동적으로 삭제됨으로 운영자는 더 이상 해지신청자의 정보를 볼 수 없습니다.
제11조 서비스 이용 제한
회원은 다음 각 호에 해당하는 행위를 하여서는 아니되며 해당 행위를 한 경우에 NXGSOFT 회원의 서비스 이용 제한 및 적법한 조치를 취할 수 있으며 이용계약을 해지하거나 기간을 정하여 서비스를 중지할 수 있습니다.
① 회원 가입시 혹은 가입 후 정보 변경시 허위 내용을 등록하는 행위
② 타인의 NXGSOFT 모바일웹 이용을 방해하거나 정보를 도용하는 행위
③ NXGSOFT의 운영진, 직원 또는 관계자를 사칭하는 행위
④ NXGSOFT, 기타 제3자의 인격권 또는 지적재산권을 침해하거나 업무를 방해하는 행위
⑤ 다른 회원의 ID를 부정하게 사용하는 행위
⑥ 다른 회원에 대한 개인정보를 그 동의 없이 수집, 저장, 공개하는 행위
⑦ 범죄와 결부된다고 객관적으로 판단되는 행위
⑧ 기타 관련 법령에 위배되는 행위
⑨ NXGSOFT가 규정하는 판매금지항목 거래행위
⑩ 회원가입시 NXGSOFT 서비스를 이용하여 판매하는 상품의 품목을 허위기재시
⑪ 가입회원과 예금주가 다를 경우
⑫ 미니상점 3회 이상 판매상품 배송 미이행시 서비스 제한을 합니다.

제12조 판매취소 및 결제취소

① 미니상점 판매 이용시 구매자가 구매확정전 7일이내 주문취소 요청시 회원은 판매상품을 돌려받거 즉시 결제취소 해야 합니다.
② 카드리더기 및 일반 전자결제의 경우 해당 정산일 전까지 즉시 결체취소가 가능하고, 정산이 이미 되고난 후 거래취소의 경우 회원과 소비자간 원만한 해결을 하도록합니다.
③ 미니상점에서 판매상품의 재고가 없을 경우 결제취소를 해야 합니다.

제 13조 수수료

① NXGSOFT의 모바일웹을 이용하여 판매된 대금의 수수료는 다음과 같습니다.
- 무료회원 미니상점 판매대금 - 7%
- 유료회원 미니상점, 카드리더기, 수기결제, SMS문자결제를 이용한 물건 판매 - 3.96%
- 위 각항목에서 익일정산 서비스 신청시 수수료가 1%씩 인상된다.

제14조 게시물의 관리

①회원은 미니상점등에 음란 서적 및 음란물을 상품으로 게시할수 없습니다. 불량 게시물 및 자료에 대하여 상시 모니터링이 되며 예고 없이 삭제됩니다.
한편, 이용회원이 올린 게시물에 대해서는 게시자 본인에게 책임이 있으니 회원스스로 본 이용약관에서 위배되는 게시물은 게재해서된 안됩니다.
② 정보통신윤리위원회 등 공공기관의 시정요구가 있는 경우 NXGSOFT는 회원의 사전동의 없이 게시물을 삭제하거나 이동 할 수 있습니다.
3. 불량게시물의 판단기준은 다음과 같습니다.
- 다른 회원 또는 제3자에게 심한 모욕을 주거나 명예를 손상시키는 내용인 경우
- 공공질서 및 미풍양속에 위반되는 내용을 유포하거나 링크시키는 경우
- 불법복제 또는 해킹을 조장하는 내용인 경우
- 영리를 목적으로 하는 광고일 경우
- 범죄와 결부된다고 객관적으로 인정되는 내용일 경우
- 다른 이용자 또는 제3자와 저작권 등 기타 권리를 침해하는 경우
- 기타 관계법령에 위배된다고 판단되는 경우4. 사이트 및 운영자는 게시물 등에 대하여 제3자로부터 명예훼손, 지적재산권 등의 권리 침해를 이유로 게시중단 요청을 받은 경우 이를 임시로 게시중단(전송중단)할 수 있으며, 게시중단 요청자와 게시물 등록자 간에 소송, 합의 기타 이에 준하는 관련기관의 결정 등이 이루어져 사이트에 접수된 경우 이에 따릅니다.

제15조 게시물의 보관

사이트 운영자가 불가피한 사정으로 본 사이트를 중단하게 될 경우, 회원에게 사전 공지를 하고 게시물의 이전이 쉽도록 모든 조치를 취하기 위해 노력합니다.

제16조 게시물에 대한 저작권

① 회원이 NXGSOFT 사이트 내에 게시한 게시물의 저작권은 게시한 회원에게 귀속됩니다. 또한 NXGSOFT는 게시자의 동의 없이 게시물을 상업적으로 이용할 수 없습니다. 다만 비영리 목적인 경우는 그러하지 아니하며, 또한 서비스 내의 게재권을 갖습니다.
② 회원은 서비스를 이용하여 취득한 정보를 임의 가공, 판매하는 행위 등 서비스에 게재된 자료를 상업적으로 사용할 수 없습니다.
③ 운영자는 회원이 게시하거나 등록하는 NXGSOFT 모바일웹 내의 내용물, 게시 내용에 대해 제12조 각 호에 해당된다고 판단되는 경우 사전통지 없이 삭제하거나 이동 또는 등록 거부할 수 있습니다.

제17조 손해배상

① NXGSOFT에서 발생한 모든 민,형법상 책임은 회원 본인에게 1차적으로 있습니다.
② NXGSOFT로부터 회원이 받은 손해가 천재지변 등 불가항력적이거나 회원의 고의 또는 과실로 인하여 발생한 때에는 손해배상을 하지 하지 않습니다.

제18조 면책

① 회원은 NXGSOFT의 서비스 제공으로부터 기대되는 이익을 얻지 못하였거나 서비스 자료에 대한 취사선택 또는 이용으로 발생하는 손해 등에 대해서는 책임이 면제됩니다.
② 운영자는 본 사이트의 서비스 기반 및 타 통신업자가 제공하는 전기통신서비스의 장애로 인한 경우에는 책임이 면제되며 본 사이트의 서비스 기반과 관련되어 발생한 손해에 대해서는 사이트의 이용약관에 준합니다
③ NXGSOFT는 회원이 저장, 게시 또는 전송한 자료와 관련하여 일체의 책임을 지지 않습니다.
④ NXGSOFT는 회원의 귀책사유로 인하여 서비스 이용의 장애가 발생한 경우에는 책임지지 아니합니다.
⑤ NXGSOFT는 회원 상호간 또는 회원과 제3자 상호간, 기타 회원의 본 서비스 내외를 불문한 일체의 활동(데이터 전송, 기타 커뮤니티 활동 포함)에 대하여 책임을 지지 않습니다.
⑥ NXGSOFT는 회원이 게시 또는 전송한 자료 및 본 모바일웹으로 소비자가 제공받을 수 있는 모든 자료들의 진위, 신뢰도, 정확성 등 그 내용에 대해서는 책임지지 아니합니다.
⑦ NXGSOFT는 회원 상호간 또는 회원과 제3자 상호간에 서비스를 매개로 하여 물품거래 등을 한 경우에 그로부터 발생하는 일체의 손해에 대하여 책임지지 아니합니다.
⑧ NXGSOFT는 회원의 귀책사유 없이 회원간 또는 회원과 제3자간에 발생한 일체의 분쟁에 대하여 책임지지 아니합니다.
⑨ NXGSOFT는 서버 등 설비의 관리, 점검, 보수, 교체 과정 또는 소프트웨어의 운용 과정에서 고의 또는 고의에 준하는 중대한 과실 없이 발생할 수 있는 시스템의 장애, 제3자의 공격으로 인한 시스템의 장애, 국내외의 저명한 연구기관이나 보안관련 업체에 의해 대응방법이 개발되지 아니한 컴퓨터 바이러스 등의 유포나 기타 운영자가 통제할 수 없는 불가항력적 사유로 인한 회원의 손해에 대하여 책임지지 않습니다.


부칙 이 약관은 <모바일웹 개설일> 부터 시행합니다.

  </div>

  <div class="terms-agree-group">

  <label>
    <input type="checkbox" id="agree-service">
    서비스 이용약관에 동의합니다. (필수)
  </label>

  <label>
    <input type="checkbox" id="agree-private">
    개인정보 수집 및 이용에 동의합니다. (필수)
  </label>

  <label>
    <input type="checkbox" id="agree-payment">
    정산 및 결제서비스 이용에 동의합니다. (필수)
  </label>

</div>

</div>
          

        <button id="go-apply-form">가입신청서 작성하기</button>

        <div id="apply-message"></div>
      </div>
    </div>
  `

  document.querySelector<HTMLButtonElement>('#go-apply-form')!
    .addEventListener('click', () => {
      const agreeService =
        document.querySelector<HTMLInputElement>('#agree-service')?.checked

      const agreePrivate =
        document.querySelector<HTMLInputElement>('#agree-private')?.checked

      const agreePayment =
        document.querySelector<HTMLInputElement>('#agree-payment')?.checked

      if (!agreeService || !agreePrivate || !agreePayment) {
        alert('필수 약관에 모두 동의해주세요.')
        return
      }
      
      location.href = '/merchant-apply-form'
    })
  } else if (path === '/merchant-apply-form') {

    app.innerHTML = `
  <div class="apply-page">
    <div class="apply-card">
      <h1>가맹점 가입신청서</h1>
      <p class="apply-desc">PG 등록 심사를 위해 모든 필수항목을 정확히 입력해주세요.</p>

      <div class="apply-section">
        <h3>1. 신청자 기본정보</h3>
        <div class="apply-grid">
          <label>대표자명 *</label>
          <input id="apply-owner-name" type="text">

          <label>휴대폰번호 *</label>
          <input id="apply-phone" type="text" placeholder="010-0000-0000">

          <label>이메일 *</label>
          <input id="apply-email" type="email">

          <label>사업자유형 *</label>
          <select id="apply-business-type">
            <option value="">선택</option>
            <option value="일반(비사업자)">일반(비사업자)</option>
            <option value="개인사업자">개인사업자</option>
            <option value="법인사업자">법인사업자</option>
          </select>
        </div>
      </div>

      <div class="apply-section">
  <h3>2. 사업자 / 판매정보</h3>
  <div class="apply-grid">
    <label>상호명 *</label>
    <input id="apply-merchant-name" type="text">

    <label>사업자번호 *</label>
    <input id="apply-business-number" type="text" placeholder="사업자번호">

    <label>주민번호 *</label>
    <input id="apply-resident-number" type="text" placeholder="주민등록번호">

    <label>업태/종목 *</label>
<div class="apply-two-inputs">
  <input id="apply-business-category" type="text" placeholder="업태">
  <input id="apply-business-item" type="text" placeholder="종목">
</div>

    <label>취급품목 *</label>
    <input id="apply-product-item" type="text">
  </div>
</div>

      <div class="apply-section">
  <h3>3. 주소정보</h3>

  <div class="address-row">
  <label>우편번호 *</label>
  <input id="apply-zipcode">
  <button id="find-postcode-btn">
    우편번호 찾기
  </button>
</div>

  <div class="address-row-full">
    <label>기본주소 *</label>
    <input id="apply-address">
  </div>

  <div class="address-row-full">
    <label>상세주소 *</label>
    <input id="apply-address-detail">
  </div>
</div>

      <div class="apply-section">
        <h3>4. 정산정보</h3>
        <div class="apply-grid">
          <label>예금주 *</label>
          <input id="apply-account-holder" type="text">

          <label>은행명 *</label>
          <input id="apply-bank-name" type="text">

          <label>계좌번호 *</label>
          <input id="apply-account-number" type="text">

          <label>정산주기 *</label>
          <select id="apply-settlement-cycle">
            <option value="">선택</option>
            <option value="일반">일반</option>
            <option value="익일">익일</option>
          </select>
        </div>
      </div>

      <div class="apply-section">
        <h3>5. 결제조건</h3>
        <div class="apply-grid">
          <label>결제방법 *</label>
          <select id="apply-payment-method">
            <option value="">선택</option>
            <option value="수기결제">수기결제</option>
            <option value="QR결제">QR결제</option>
            <option value="무선단말기">무선단말기</option>
            <option value="전체">전체</option>
          </select>

          <label>결제수수료 *</label>
          <input id="apply-payment-fee" type="text" placeholder="예: 협의 / 3.5%">

          <label>담당자 전화번호</label>
          <input id="apply-recommender-phone" type="text">
        </div>
      </div>

      <div class="apply-section">
  <h3>6. 첨부서류 / 메모</h3>
  <p class="apply-help">PG 심사를 위해 필수 서류를 첨부해주세요.</p>

  <div class="apply-grid">
    <label>사업자등록증 *</label>
<input id="apply-file-business-license" type="file">

<label>통장사본 *</label>
<input id="apply-file-bankbook" type="file">

<label>대표자 신분증 *</label>
<input id="apply-file-id-card" type="file">

<label>판매상품 사진</label>
<input id="apply-file-product-photo" type="file">

<label>기타서류</label>
<input id="apply-file-extra" type="file">

<label>메모</label>
<textarea id="apply-memo" placeholder="추가 요청사항"></textarea>
  </div>
</div>

      <button id="merchant-apply-submit" class="apply-submit-btn">가입신청</button>
      <div id="merchant-apply-result"></div>
    </div>
  </div>
`
document.querySelector('#find-postcode-btn')
  ?.addEventListener('click', () => {
    alert('우편번호 찾기 기능 연결 예정')
  })
   
document.querySelector<HTMLButtonElement>('#merchant-apply-submit')
?.addEventListener('click', async () => {

  const businessFile =
  document.querySelector<HTMLInputElement>('#apply-file-business-license')?.files?.[0]

const bankbookFile =
  document.querySelector<HTMLInputElement>('#apply-file-bankbook')?.files?.[0]

const idCardFile =
  document.querySelector<HTMLInputElement>('#apply-file-id-card')?.files?.[0]

const productPhotoFile =
  document.querySelector<HTMLInputElement>('#apply-file-product-photo')?.files?.[0]

const extraFile =
  document.querySelector<HTMLInputElement>('#apply-file-extra')?.files?.[0]

if (!businessFile || !bankbookFile || !idCardFile) {
  alert('필수 서류를 모두 첨부해주세요.')
  return
}

const safeTime = Date.now()

const businessFileName =
  `${safeTime}_business.${businessFile.name.split('.').pop() || 'file'}`

const bankbookFileName =
  `${safeTime}_bankbook.${bankbookFile.name.split('.').pop() || 'file'}`

const idCardFileName =
  `${safeTime}_idcard.${idCardFile.name.split('.').pop() || 'file'}`

const productPhotoFileName = productPhotoFile
  ? `${safeTime}_product.${productPhotoFile.name.split('.').pop() || 'file'}`
  : ''

const extraFileName = extraFile
  ? `${safeTime}_extra.${extraFile.name.split('.').pop() || 'file'}`
  : ''

const businessUpload = await supabase.storage
  .from('merchant-files')
  .upload(businessFileName, businessFile)

if (businessUpload.error) {
  alert('사업자등록증 업로드 실패: ' + businessUpload.error.message)
  return
}

const bankbookUpload = await supabase.storage
  .from('merchant-files')
  .upload(bankbookFileName, bankbookFile)

if (bankbookUpload.error) {
  alert('통장사본 업로드 실패: ' + bankbookUpload.error.message)
  return
}

const idCardUpload = await supabase.storage
  .from('merchant-files')
  .upload(idCardFileName, idCardFile)

if (idCardUpload.error) {
  alert('신분증 업로드 실패: ' + idCardUpload.error.message)
  return
}

if (productPhotoFile) {
  const productPhotoUpload = await supabase.storage
    .from('merchant-files')
    .upload(productPhotoFileName, productPhotoFile)

  if (productPhotoUpload.error) {
    alert('판매상품 사진 업로드 실패: ' + productPhotoUpload.error.message)
    return
  }
}

if (extraFile) {
  const extraUpload = await supabase.storage
    .from('merchant-files')
    .upload(extraFileName, extraFile)

  if (extraUpload.error) {
    alert('기타서류 업로드 실패: ' + extraUpload.error.message)
    return
  }
}

  const insertData = {
    merchant_name: (document.getElementById('apply-merchant-name') as HTMLInputElement)?.value || '',
    owner_name: (document.getElementById('apply-owner-name') as HTMLInputElement)?.value || '',
    phone: (document.getElementById('apply-phone') as HTMLInputElement)?.value || '',

    business_number: (document.getElementById('apply-business-number') as HTMLInputElement)?.value || '',
    resident_number: (document.getElementById('apply-resident-number') as HTMLInputElement)?.value || '',

    email: (document.getElementById('apply-email') as HTMLInputElement)?.value || '',

    zipcode: (document.getElementById('apply-zipcode') as HTMLInputElement)?.value || '',
    address: (document.getElementById('apply-address') as HTMLInputElement)?.value || '',
    address_detail: (document.getElementById('apply-address-detail') as HTMLInputElement)?.value || '',

    bank_name: (document.getElementById('apply-bank-name') as HTMLInputElement)?.value || '',
    account_number: (document.getElementById('apply-account-number') as HTMLInputElement)?.value || '',
    account_holder: (document.getElementById('apply-account-holder') as HTMLInputElement)?.value || '',

    settlement_cycle: (document.getElementById('apply-settlement-cycle') as HTMLSelectElement)?.value || '',

    business_license_url: businessFileName,
bankbook_url: bankbookFileName,
id_card_url: idCardFileName,
product_photo_url: productPhotoFileName,
extra_file_url: extraFileName,
memo: (document.getElementById('apply-memo') as HTMLTextAreaElement)?.value || '',
    status: '신청'
  }

  const { error } = await supabase
    .from('merchants')
    .insert([insertData])

  if (error) {
    alert('신청 실패 : ' + error.message)
    return
  }

  alert('가입신청이 완료되었습니다.')

  location.href = '/'
})

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
<th>영수증</th>
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

<td>
  <button
    class="admin-receipt-btn"
    data-order="${payment.order_id || ''}"
    data-order-number="${payment.order_number || ''}"
    data-amount="${payment.amount || 0}"
    data-sender="${payment.sender_name || ''}"
    data-merchant="${payment.merchant_name || ''}"
    data-date="${payment.created_at || ''}"
  >
    보기
  </button>
</td>

<td>${new Date(payment.created_at).toLocaleString('ko-KR')}</td>      
</tr>
              `).join('')}
            </tbody>
          </table>
        </div>
 `

 document.querySelectorAll('.admin-receipt-btn')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const target = button as HTMLElement

      const orderId = target.dataset.order || '-'
      const orderNumber = target.dataset.orderNumber || '-'
      const amount = Number(target.dataset.amount || 0)
      const sender = target.dataset.sender || '-'
      const merchant = target.dataset.merchant || '-'
      const date = target.dataset.date
        ? new Date(target.dataset.date).toLocaleString('ko-KR')
        : '-'

      alert(
        'NXG PICK 영수증\\n\\n' +
        '주문번호: ' + orderNumber + '\\n' +
        '주문ID: ' + orderId + '\\n' +
        '상점명: ' + merchant + '\\n' +
        '주문자명: ' + sender + '\\n' +
        '결제금액: ' + amount.toLocaleString() + '원\\n' +
        '결제일시: ' + date
      )
    })
  })

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

const source = params.get('source')

const merchantId =
  params.get('merchantId') || sessionStorage.getItem('merchantId')

let merchantName =
  params.get('merchantName') || sessionStorage.getItem('merchantName') || ''

  let feeRate = 0

if (merchantId) {
  const { data: merchantFeeData } = await supabase
    .from('merchants')
    .select('fee_rate, merchant_name')
    .eq('id', Number(merchantId))
    .maybeSingle()

  feeRate = Number(merchantFeeData?.fee_rate || 0)

  if (!merchantName) {
    merchantName = merchantFeeData?.merchant_name || ''
  }
}

const paymentAmount = Number(amount)
const feeAmount = Math.floor(paymentAmount * feeRate / 100)
const settlementAmount = paymentAmount - feeAmount

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
      amount: paymentAmount,
      fee_rate: feeRate,
      fee_amount: feeAmount,
      settlement_amount: settlementAmount,
      status: 'paid',
      event_id: eventId ? Number(eventId) : null,
      sender_name: senderName,
      message: message,
      merchant_id: merchantId ? Number(merchantId) : null,
      merchant_name: merchantName,
      pg_company:
      params.get('pg') ||
      sessionStorage.getItem('selected_pg_company') ||
      '토스페이먼츠',
payment_method: '카드',
card_company: '결제사 제공값',
card_number: '결제사 제공값',
installment_months: '일시불',
approved_at: new Date().toISOString()
    }
  ])

  if (error) {
    alert('DB 저장 실패: ' + error.message)
  } else {
    alert('DB 저장 성공')
  }
  if (source === 'kiosk') {
    const orderNo = sessionStorage.getItem('kiosk_order_no')
    const merchantId = sessionStorage.getItem('kiosk_merchant_id')
    const itemsText = sessionStorage.getItem('kiosk_items')
    const totalAmount = sessionStorage.getItem('kiosk_total_amount')
  
    if (orderNo && merchantId && totalAmount) {
      const items = itemsText ? JSON.parse(itemsText) : []
  
      await supabase.from('orders').insert({
        merchant_id: Number(merchantId),
        order_no: orderNo,
        items,
        total_amount: Number(totalAmount),
        order_status: '접수',
        payment_status: '결제완료',
      })
  
      sessionStorage.removeItem('kiosk_order_no')
      sessionStorage.removeItem('kiosk_merchant_id')
      sessionStorage.removeItem('kiosk_items')
      sessionStorage.removeItem('kiosk_total_amount')
    }
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
<button id="receipt-view-btn" class="receipt-view-btn">
  영수증 확인
</button>

<p class="payment-amount">
  결제금액 : ${Number(amount).toLocaleString()}원
</p>
        <button id="home-button">확인</button>
        
       <div id="receipt-modal" class="receipt-modal">
  <div class="receipt-box receipt-approve">

    <div class="receipt-header">
      <h2>NXG PICK</h2>
      <h3>신용카드 매출전표 <span>(승인)</span></h3>
    </div>

    <section>
      <h4>결제정보</h4>
      <table>
        <tr>
          <th>카드번호</th>
          <td>결제사 제공값</td>
          <th>카드종류</th>
          <td>신용카드</td>
        </tr>
        <tr>
          <th>거래종류</th>
          <td>승인성공</td>
          <th>할부개월</th>
          <td>일시불</td>
        </tr>
        <tr>
          <th>거래일시</th>
          <td colspan="3">${new Date().toLocaleString()}</td>
        </tr>
      </table>
    </section>

    <div class="receipt-grid">
      <section>
        <h4>구매정보</h4>
        <table>
          <tr><th>주문자명</th><td>${senderName || '-'}</td></tr>
          <tr><th>승인번호</th><td>결제사 제공값</td></tr>
          <tr><th>주문번호</th><td>${nextOrderNumber}</td></tr>
          <tr><th>상품명 / 구매자</th><td>${merchantName || '-'}</td></tr>
        </table>
      </section>

      <section>
        <h4>결제금액정보</h4>
        <table>
          <tr>
            <th>과세금액</th>
            <td>${Math.floor(Number(amount) / 1.1).toLocaleString()}원</td>
          </tr>
          <tr>
            <th>비과세금액</th>
            <td>0원</td>
          </tr>
          <tr>
            <th>부가세</th>
            <td>${(Number(amount) - Math.floor(Number(amount) / 1.1)).toLocaleString()}원</td>
          </tr>
          <tr>
            <th>주문금액</th>
            <td>${Number(amount).toLocaleString()}원</td>
          </tr>
          <tr>
            <th>할인금액</th>
            <td>0원</td>
          </tr>
          <tr class="receipt-total">
            <th>총 결제금액</th>
            <td>${Number(amount).toLocaleString()}원</td>
          </tr>
        </table>
      </section>
    </div>

    <section>
      <h4>상점정보</h4>
      <table>
        <tr>
          <th>상점명</th>
          <td>${merchantName || '-'}</td>
          <th>대표자명</th>
          <td>-</td>
        </tr>
        <tr>
          <th>URL주소</th>
          <td>-</td>
          <th>사업자번호</th>
          <td>-</td>
        </tr>
        <tr>
          <th>이용/환불문의</th>
          <td colspan="3">-</td>
        </tr>
        <tr>
          <th>주소</th>
          <td colspan="3">-</td>
        </tr>
      </table>
    </section>

    <section>
      <h4>결제서비스업체(PG)정보</h4>
      <table>
        <tr>
          <tr>
  <th style="width:180px">카드사 가맹점명</th>
  <td>토스페이먼츠</td>
  <th style="width:140px">사업자번호</th>
  <td style="width:180px">-</td>
</tr>

<tr>
  <th>대표자명</th>
  <td>-</td>
  <th>가맹점번호</th>
  <td style="width:180px">-</td>
</tr>
        <tr>
          <th>주소</th>
          <td colspan="3">-</td>
        </tr>
      </table>
    </section>

    <div class="receipt-notice">
      * 신용카드 청구서에는 실제 결제 PG사명으로 표시됩니다.<br>
      * 본 매출전표는 부가가치세법 기준에 따라 발행되었습니다.
    </div>

    <div class="receipt-actions">
      <button>이메일 발송</button>
      <button onclick="window.print()">인쇄하기</button>
      <button id="receipt-close-btn">닫기</button>
    </div>
</div>
  </div>
</div>
    </div>
  `

  document.querySelector<HTMLButtonElement>('#home-button')!
  .addEventListener('click', () => {
    const merchantId =
      sessionStorage.getItem('merchantId') ||
      sessionStorage.getItem('kiosk_merchant_id')

    if (merchantId) {
      window.location.href = '/kiosk?merchant_id=' + merchantId
    } else {
      window.location.href = '/merchant-login'
    }
  })
  document.querySelector('#receipt-view-btn')
  ?.addEventListener('click', () => {
    document.querySelector<HTMLElement>('#receipt-modal')!.style.display = 'flex'
  })

document.querySelector('#receipt-close-btn')
  ?.addEventListener('click', () => {
    document.querySelector<HTMLElement>('#receipt-modal')!.style.display = 'none'
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
        <div>자동정산</div>
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
    ?.addEventListener('click', async () => {
      const loginId =
        (document.querySelector<HTMLInputElement>('#admin-login-id')?.value || '').trim()

      const password =
        (document.querySelector<HTMLInputElement>('#admin-login-password')?.value || '').trim()

      const { data: adminUser, error: adminLoginError } = await supabase
  .from('admin_users')
  .select('*')
  .eq('login_id', loginId)
  .eq('password', password)
  .eq('status', '사용중')
  .single()

if (adminUser && !adminLoginError) {
  sessionStorage.setItem('admin_id', adminUser.login_id)
  sessionStorage.setItem('admin_name', adminUser.admin_name || '')
  sessionStorage.setItem('admin_role', adminUser.role || '')

  location.replace('/pg-admin')
  return
}

      alert('아이디 또는 비밀번호가 올바르지 않습니다.')
    })

    document.querySelector('#go-merchant-apply-button')
  ?.addEventListener('click', () => {
    location.href = '/merchant-create'
  })

    document.querySelector('#go-merchant-apply-button')
  ?.addEventListener('click', () => {
    location.href = '/merchant-apply'
  })

  } else if (path === '/pg-admin') {

    history.pushState(null, '', '/pg-admin')

window.onpopstate = () => {
  history.pushState(null, '', '/pg-admin')
}

  if (!sessionStorage.getItem('admin_id')) {
    location.replace('/admin-login')
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
  <a class="admin-tab" data-page="merchant">가맹점관리</a>
<a class="admin-tab" data-page="payment">결제관리</a>
<a class="admin-tab" data-page="payout">출금관리</a>
<a class="admin-tab" data-page="tax">세무관리</a>
<a class="admin-tab" data-page="organization">조직관리</a>
  
</div>
  
        <div class="admin-sub-menu">
  업체/가맹점 등록 | 결제 수수료 설정
</div>

<div class="admin-title">
  ▶ 가맹점관리 > 가맹점 관리
</div>

<div class="admin-search-box"></div>

<div class="admin-summary"></div>

<div class="admin-table-top">
  <button>엑셀 다운로드</button>

  <select id="admin-page-size">
    <option value="10">10개씩 보기</option>
    <option value="20">20개씩 보기</option>
    <option value="50">50개씩 보기</option>
    <option value="100">100개씩 보기</option>
  </select>
</div>

<div class="admin-table-scroll">
  <table class="admin-table">
    <thead>
      <tr>
        <th>승인일</th>
        <th>승인번호</th>
        <th>가맹점</th>
        <th>주문번호</th>
        <th>결제키</th>
        <th>상태</th>
        <th>금액</th>
      </tr>
    </thead>
    <tbody id="paymentTableBody"></tbody>
  </table>
</div>
</div>
`

       const searchBtn = document.querySelector('.search-btn')
       const paymentTableBody =
  document.querySelector<HTMLTableSectionElement>('#paymentTableBody')!
   
  document.querySelector('.admin-table-scroll')?.classList.add('payment-table-scroll')
document.querySelector('.admin-table')?.classList.add('payment-admin-table')
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
             '<td>' + (payment.merchant_name || '-') + '<br/>' + (payment.merchant_id || '-') + '</td>' +
             '<td>-<br/>-</td>' +
             '<td>-</td>' +
             '<td>-<br/>-</td>' +
             '<td>' + getStatusText(payment.status) + '<br/>' + Number(payment.amount || 0).toLocaleString() + '원</td>' +
             '<td>' + (payment.pg_company || '온라인') + '<br/>' + Number(payment.amount || 0).toLocaleString() + '원</td>' +
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

       const adminWindow = window as Window & {
        cancelApproveClickReady?: boolean
      }
      
      if (!adminWindow.cancelApproveClickReady) {
        adminWindow.cancelApproveClickReady = true
      
        document.addEventListener('click', async (event) => {
          const target = event.target as HTMLElement
      
          if (!target.classList.contains('cancel-approve-btn')) return
      
          const requestId = Number(target.dataset.id)
      
          if (!requestId) {
            alert('취소요청 ID를 찾을 수 없습니다.')
            return
          }
      
          if (!confirm('취소 승인 처리하시겠습니까?')) return
      
          const { data: cancelRequest, error: requestFindError } = await supabase
            .from('cancel_requests')
            .select('*')
            .eq('id', requestId)
            .single()
      
          if (requestFindError || !cancelRequest) {
            alert('취소요청 정보를 찾지 못했습니다.')
            return
          }
      
          const { error: paymentUpdateError } = await supabase
            .from('payments')
            .update({
              status: 'cancel',
              canceled_at: new Date().toISOString()
            })
            .eq('id', Number(cancelRequest.payment_id))
      
          if (paymentUpdateError) {
            alert('결제 취소 처리 실패: ' + paymentUpdateError.message)
            return
          }
      
          const { error: requestUpdateError } = await supabase
            .from('cancel_requests')
            .update({
              status: '승인'
            })
            .eq('id', requestId)
      
          if (requestUpdateError) {
            alert('취소요청 상태 변경 실패: ' + requestUpdateError.message)
            return
          }
      
          alert('취소 승인 처리되었습니다.')
          location.reload()
        })
      }

       const adminTabs = document.querySelectorAll<HTMLElement>('.admin-tab')

const savedAdminPage = sessionStorage.getItem('adminPage') || 'merchant'

requestAnimationFrame(() => {
  const savedAdminTab =
    document.querySelector<HTMLElement>('.admin-tab[data-page="' + savedAdminPage + '"]')

  if (savedAdminTab) {
    savedAdminTab.click()
  } else {
    document.querySelector<HTMLElement>('.admin-tab[data-page="merchant"]')?.click()
  }
})
      
      adminTabs.forEach((tab) => {
        tab.addEventListener('click', async () => {
          adminTabs.forEach((item) => {
            item.classList.remove('active')
          })
      
          tab.classList.add('active')
      
          const page = tab.getAttribute('data-page')

          if (page) sessionStorage.setItem('adminPage', page)

            

          if (page === 'organization') {
            const subMenu = document.querySelector('.admin-sub-menu')
            const titleBox = document.querySelector('.admin-title')
            const searchBox = document.querySelector('.admin-search-box')
            const summaryBox = document.querySelector('.admin-summary')
            const tableTop = document.querySelector('.admin-table-top')
            const tableHead = document.querySelector('.admin-table thead')
            const paymentTableBody =
              document.querySelector<HTMLTableSectionElement>('#paymentTableBody')
          
              if (subMenu) {
                subMenu.innerHTML = ''
              }
              
              if (titleBox) {
                titleBox.innerHTML = '▶ 조직관리'
              }
          
            if (searchBox) searchBox.innerHTML = ''
            if (tableTop) tableTop.innerHTML = ''
            if (tableHead) tableHead.innerHTML = ''
            if (paymentTableBody) paymentTableBody.innerHTML = ''
          
            const { data: adminUsers, error } = await supabase
              .from('admin_users')
              .select('*')
              .order('id', { ascending: true })
          
            if (error) {
              alert('조직 정보를 불러오지 못했습니다: ' + error.message)
              return
            }
            const { data: cancelRequests, error: cancelError } = await supabase
  .from('cancel_requests')
  .select('*')
  .eq('status', '요청중')

if (cancelError) {
  alert('취소요청 정보를 불러오지 못했습니다: ' + cancelError.message)
  return
}

const getManagerCancelBadge = (managerId: number) => {
  const count = (cancelRequests || []).filter((request) =>
    Number(request.manager_admin_id) === Number(managerId)
  ).length

  return count > 0
  ? ' <span class="manager-cancel-btn" data-manager-id="' + managerId + '" style="display:inline-block; cursor:pointer; color:red; font-weight:700; margin-left:8px;">🔴' + count + '</span>'
  : ''
}
          
            const rootUsers = (adminUsers || []).filter((user) =>
              user.login_id === 'NXGMASTER16'
            )
          
            const branchUsers = (adminUsers || []).filter((user) =>
              user.role === 'BRANCH'
            )
          
            const agencyUsers = (adminUsers || []).filter((user) =>
              user.role === 'AGENCY'
            )
          
            const managerUsers = (adminUsers || []).filter((user) =>
              user.role === 'MANAGER'
            )
            const branchCardHtml = branchUsers.map((branch) =>
              '<button class="org-branch-card" data-branch-id="' + branch.id + '">' +
                '<strong>🏢 ' + (branch.admin_name || '-') + '</strong>' +
              '</button>'
            ).join('')

            if (summaryBox) {
              summaryBox.innerHTML =
                '<div class="merchant-detail-header">' +
                  '<h2>조직관리</h2>' +
                  '<p>지사를 선택하면 하위 대리점과 담당자를 확인할 수 있습니다.</p>' +
'<div class="org-branch-card-row">' + branchCardHtml + '</div>' +
                '</div>' +
          
                '<div class="merchant-detail-page" style="border:1px solid #ddd; border-radius:12px; background:#fff; overflow:hidden;">' +
  '<div style="display:grid; grid-template-columns: 1fr 420px; min-height:260px;">' +
    '<div id="organization-tree-panel" style="padding:24px; border-right:1px solid #ddd;">' +
                  rootUsers.map((root) =>
                    '<div style="padding:16px; border:1px solid #ddd; border-radius:10px; margin-bottom:16px;">' +
                      '<h3>👑 ' + (root.admin_name || '-') + '</h3>' +
          
                      branchUsers
                        .filter((branch) => branch.parent_admin_id === root.id)
                        .map((branch) =>
                          '<div style="margin-left:24px; margin-top:12px;">' +
                            '<strong>🏢 ' + (branch.admin_name || '-') + '</strong>' +
          
                            agencyUsers
                              .filter((agency) => agency.parent_admin_id === branch.id)
                              .map((agency) =>
                                '<div style="margin-left:24px; margin-top:8px;">' +
                                  '🏬 ' + (agency.admin_name || '-') +
          
                                  managerUsers
                                    .filter((manager) => manager.parent_admin_id === agency.id)
                                    .map((manager) =>
                                      '<div style="margin-left:24px; margin-top:6px;">' +
                                        '👤 ' + (manager.admin_name || '-') + getManagerCancelBadge(manager.id) +
                                      '</div>'
                                    ).join('') +
                                '</div>'
                              ).join('') +
          
                            managerUsers
                              .filter((manager) => manager.parent_admin_id === branch.id)
                              .map((manager) =>
                                '<div style="margin-left:24px; margin-top:6px;">' +
                                  '👤 ' + (manager.admin_name || '-') + getManagerCancelBadge(manager.id) +
                                '</div>'
                              ).join('') +
                          '</div>'
                        ).join('') +
                        '</div>'
                      ).join('') +
                      '</div>' +
'<div id="organization-work-panel" style="padding:24px; background:#fff;">' +
  '<h3>업무 패널</h3>' +
  '<p>왼쪽 조직도에서 담당자 또는 알림을 선택하면 상세 업무가 표시됩니다.</p>' +
'</div>' +
'</div>' +
'</div>'
            }

            const { data: orgMerchants, error: orgMerchantError } = await supabase
  .from('merchants')
  .select('id, merchant_name, manager_admin_id')

if (orgMerchantError) {
  alert('조직 가맹점 정보를 불러오지 못했습니다: ' + orgMerchantError.message)
  return
}

const getManagerMerchantCount = (managerId: number) => {
  return (orgMerchants || []).filter((merchant) =>
    Number(merchant.manager_admin_id) === Number(managerId)
  ).length
}

const branchCards = branchUsers.map((branch) => {
  const agencies = agencyUsers.filter((agency) =>
    Number(agency.parent_admin_id) === Number(branch.id)
  )

  const agencyIds = agencies.map((agency) => Number(agency.id))

  const managers = managerUsers.filter((manager) =>
    agencyIds.includes(Number(manager.parent_admin_id))
  )

  const merchantCount = managers.reduce((sum, manager) => {
    return sum + getManagerMerchantCount(Number(manager.id))
  }, 0)

  return (
    '<button class="org-v2-card org-branch-v2" data-id="' + branch.id + '">' +
      '<strong>🏢 ' + (branch.admin_name || '-') + '</strong>' +
      '<span>대리점 ' + agencies.length + '개</span>' +
      '<span>담당자 ' + managers.length + '명</span>' +
      '<span>가맹점 ' + merchantCount + '개</span>' +
    '</button>'
  )
}).join('')

if (summaryBox) {
  summaryBox.innerHTML =
    '<div class="merchant-detail-header">' +
      '<h2>조직관리</h2>' +
      '<p>지사 → 대리점 → 담당자 순서로 조직을 확인합니다.</p>' +
    '</div>' +

    '<div class="org-v2-wrap">' +
      '<h3>지사 목록</h3>' +
      '<div class="org-v2-grid">' + branchCards + '</div>' +

      '<div id="org-v2-agency-area"></div>' +
      '<div id="org-v2-manager-area"></div>' +
      '<div id="org-v2-merchant-area"></div>' +
    '</div>'
}

document.querySelectorAll<HTMLButtonElement>('.org-branch-v2')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const branchId = Number(button.dataset.id)

      const agencies = agencyUsers.filter((agency) =>
        Number(agency.parent_admin_id) === branchId
      )

      const agencyArea =
        document.querySelector<HTMLElement>('#org-v2-agency-area')

      const managerArea =
        document.querySelector<HTMLElement>('#org-v2-manager-area')

      const merchantArea =
        document.querySelector<HTMLElement>('#org-v2-merchant-area')

      if (managerArea) managerArea.innerHTML = ''
      if (merchantArea) merchantArea.innerHTML = ''

      if (!agencyArea) return

      agencyArea.innerHTML =
        '<h3>대리점 목록</h3>' +
        '<div class="org-v2-grid">' +
          agencies.map((agency) => {
            const managers = managerUsers.filter((manager) =>
              Number(manager.parent_admin_id) === Number(agency.id)
            )

            const merchantCount = managers.reduce((sum, manager) => {
              return sum + getManagerMerchantCount(Number(manager.id))
            }, 0)

            return (
              '<button class="org-v2-card org-agency-v2" data-id="' + agency.id + '">' +
                '<strong>🤝 ' + (agency.admin_name || '-') + '</strong>' +
                '<span>담당자 ' + managers.length + '명</span>' +
                '<span>가맹점 ' + merchantCount + '개</span>' +
              '</button>'
            )
          }).join('') +
        '</div>'

      document.querySelectorAll<HTMLButtonElement>('.org-agency-v2')
        .forEach((agencyButton) => {
          agencyButton.addEventListener('click', () => {
            const agencyId = Number(agencyButton.dataset.id)

            const managers = managerUsers.filter((manager) =>
              Number(manager.parent_admin_id) === Number(agencyId)
            )

            const managerArea =
              document.querySelector<HTMLElement>('#org-v2-manager-area')

            const merchantArea =
              document.querySelector<HTMLElement>('#org-v2-merchant-area')

            if (merchantArea) merchantArea.innerHTML = ''

            if (!managerArea) return

            managerArea.innerHTML =
              '<h3>담당자 목록</h3>' +
              '<div class="org-v2-list">' +
                managers.map((manager) =>
                  '<button class="org-v2-manager-row" data-id="' + manager.id + '">' +
                    '👤 ' + (manager.admin_name || '-') +
                    ' <strong>' + getManagerMerchantCount(Number(manager.id)) + '</strong>' +
                  '</button>'
                ).join('') +
              '</div>'

            document.querySelectorAll<HTMLButtonElement>('.org-v2-manager-row')
              .forEach((managerButton) => {
                managerButton.addEventListener('click', () => {
                  const managerId = Number(managerButton.dataset.id)

                  const merchantList = (orgMerchants || []).filter((merchant) =>
                    Number(merchant.manager_admin_id) === managerId
                  )

                  const merchantArea =
                    document.querySelector<HTMLElement>('#org-v2-merchant-area')

                  if (!merchantArea) return

                  merchantArea.innerHTML =
                    '<h3>담당 가맹점</h3>' +
                    '<div class="org-v2-merchant-box">' +
                      (
                        merchantList.length === 0
                          ? '<p>연결된 가맹점이 없습니다.</p>'
                          : merchantList.map((merchant, index) =>
                              '<p>' + (index + 1) + '. ' + (merchant.merchant_name || '-') + '</p>'
                            ).join('')
                      ) +
                    '</div>'
                })
              })
          })
        })
    })
  })

            document.querySelectorAll('.manager-cancel-btn')
  .forEach((button) => {

    button.addEventListener('click', async () => {

      const managerId = Number(
        (button as HTMLButtonElement).dataset.managerId
      )

      const workPanel =
        document.querySelector<HTMLElement>('#organization-work-panel')

      if (!workPanel) return
      
      const { data: requests, error } = await supabase
  .from('cancel_requests')
  .select('*')
  .eq('manager_admin_id', managerId)
  .eq('status', '요청중')
  .order('id', { ascending: false })

if (error) {
  alert('취소요청 조회 실패: ' + error.message)
  return
}
const paymentIds = (requests || [])
  .map((request) => request.payment_id)
  .filter((paymentId) => paymentId)

const { data: cancelPayments, error: paymentError } = await supabase
  .from('payments')
  .select('*')
  .in('id', paymentIds)

if (paymentError) {
  alert('결제정보 조회 실패: ' + paymentError.message)
  return
}
workPanel.innerHTML =
'<h3>취소 요청</h3>' +
'<p>총 ' + ((requests || []).length) + '건</p>' +

((requests || []).length === 0
  ? '<p>현재 취소요청이 없습니다.</p>'
  : (requests || []).map((request) =>
      '<div style="border:1px solid #ddd; border-radius:8px; padding:12px; margin-top:12px;">' +
        '<p><b>가맹점 ID</b> : ' + (request.merchant_id || '-') + '</p>' +
        (() => {
          const payment = (cancelPayments || []).find((item) =>
            Number(item.id) === Number(request.payment_id)
          )
        
          const amount = Number(payment?.amount || 0)
          const feeAmount = Number(payment?.fee_amount || 0)
          const settlementAmount = Number(payment?.settlement_amount || 0)
          const cancelTransferFee = 500
          const totalRefundDepositAmount = settlementAmount + cancelTransferFee
        
          return (
            '<p><b>결제금액</b> : ' + amount.toLocaleString() + '원</p>' +
            '<p><b>수수료</b> : ' + feeAmount.toLocaleString() + '원</p>' +
            '<p><b>환수금액</b> : ' + settlementAmount.toLocaleString() + '원</p>' +
            '<p><b>결제취소이체수수료</b> : ' + cancelTransferFee.toLocaleString() + '원</p>' +
            '<p style="font-size:18px;font-weight:700;color:#d32f2f;">' +
              '총 입금금액 : ' + totalRefundDepositAmount.toLocaleString() + '원' +
            '</p>'
          )
        })() +
        '<p><b>결제 ID</b> : ' + (request.payment_id || '-') + '</p>' +
        '<p><b>사유</b> : ' + (request.reason || '-') + '</p>' +
        '<p><b>상태</b> : ' + (request.status || '-') + '</p>' +
        
        '<button class="cancel-approve-btn" data-id="' + request.id + '">승인</button> ' +
        '<button class="cancel-reject-btn" data-id="' + request.id + '">반려</button>' +
      '</div>'
    ).join('')
)

    })

  })
          
            return
          }

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
    '<span class="sub-tab" data-sub="merchant-add">업체/가맹점 등록</span>' +
    '<span class="sub-tab" data-sub="admin-users">담당자관리</span>'
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
    const summaryBox = document.querySelector('.admin-summary')
    const tableTop = document.querySelector('.admin-table-top')
    const tableHead = document.querySelector('.admin-table thead')
    const paymentTableBody =
      document.querySelector<HTMLTableSectionElement>('#paymentTableBody')!

    document.querySelectorAll('.sub-tab')
      .forEach((item) => item.classList.remove('active'))

    document.querySelector('[data-sub="merchant-add"]')
      ?.classList.add('active')

      document.querySelector('[data-sub="admin-users"]')
  ?.addEventListener('click', async () => {
    document.querySelectorAll('.sub-tab')
      .forEach((tab) => tab.classList.remove('active'))

    document.querySelector('[data-sub="admin-users"]')
      ?.classList.add('active')

    if (titleBox) {
      titleBox.innerHTML = '▶ 가맹점관리 > 담당자관리'
    }

    const { data: adminUsers, error } = await supabase
      .from('admin_users')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      alert('담당자 조회 실패: ' + error.message)
      return
    }

    if (summaryBox) {
      summaryBox.innerHTML =
        '<div class="merchant-detail-header">' +
          '<h2>담당자관리</h2>' +
          '<p>운영자, 지사, 대리점, 담당자 계정을 관리합니다.</p>' +
        '</div>' +

        '<div style="margin-bottom:16px;">' +
          '<button id="add-admin-user-btn" class="merchant-save-btn">+ 담당자 등록</button>' +
        '</div>' +

        '<table class="admin-table">' +
          '<thead>' +
            '<tr>' +
              '<th>이름</th>' +
              '<th>아이디</th>' +
              '<th>권한</th>' +
              '<th>상태</th>' +
              '<th>관리</th>' +
            '</tr>' +
          '</thead>' +
          '<tbody>' +
            (adminUsers || []).map((user) =>
              '<tr>' +
                '<td>' + (user.admin_name || '-') + '</td>' +
                '<td>' + (user.login_id || '-') + '</td>' +
                '<td>' + (user.role || '-') + '</td>' +
                '<td>' + (user.status || '-') + '</td>' +
                '<td>' +
                  '<button class="admin-user-edit-btn" data-id="' + user.id + '">수정</button>' +
                '</td>' +
              '</tr>'
            ).join('') +
          '</tbody>' +
        '</table>'
    }

    document.querySelector('#add-admin-user-btn')
  ?.addEventListener('click', () => {

    document.querySelectorAll<HTMLButtonElement>('.admin-user-edit-btn')
  .forEach((button) => {
    button.addEventListener('click', async () => {
      const adminUserId = Number(button.dataset.id)

      const { data: adminUser, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', adminUserId)
        .single()

      if (error || !adminUser) {
        alert('담당자 정보를 불러오지 못했습니다.')
        return
      }

      if (!summaryBox) return

      summaryBox.innerHTML =
        '<div class="merchant-detail-header">' +
          '<h2>담당자 수정</h2>' +
          '<p>담당자 계정 정보를 수정합니다.</p>' +
        '</div>' +

        '<div class="merchant-detail-grid">' +

          '<label>권한</label>' +
          '<select id="edit-admin-role">' +
            '<option value="MASTER" ' + (adminUser.role === 'MASTER' ? 'selected' : '') + '>최고관리자</option>' +
            '<option value="BRANCH" ' + (adminUser.role === 'BRANCH' ? 'selected' : '') + '>지사</option>' +
            '<option value="AGENCY" ' + (adminUser.role === 'AGENCY' ? 'selected' : '') + '>대리점</option>' +
            '<option value="MANAGER" ' + (adminUser.role === 'MANAGER' ? 'selected' : '') + '>담당자</option>' +
          '</select>' +

          '<label>이름</label>' +
          '<input id="edit-admin-name" value="' + (adminUser.admin_name || '') + '" />' +

          '<label>아이디</label>' +
          '<input id="edit-admin-login-id" value="' + (adminUser.login_id || '') + '" readonly />' +

          '<label>비밀번호</label>' +
          '<input id="edit-admin-password" value="' + (adminUser.password || '') + '" />' +

          '<label>상태</label>' +
          '<select id="edit-admin-status">' +
            '<option value="사용중" ' + (adminUser.status === '사용중' ? 'selected' : '') + '>사용중</option>' +
            '<option value="사용정지" ' + (adminUser.status === '사용정지' ? 'selected' : '') + '>사용정지</option>' +
          '</select>' +

        '</div>' +

        '<div class="merchant-detail-actions">' +
          '<button id="update-admin-user" class="merchant-save-btn">저장</button>' +
          '<button id="back-admin-user-list" class="merchant-close-btn">목록</button>' +
        '</div>'

      document.querySelector('#back-admin-user-list')
        ?.addEventListener('click', () => {
          document.querySelector('[data-sub="admin-users"]')
            ?.dispatchEvent(new Event('click'))
        })

      document.querySelector('#update-admin-user')
        ?.addEventListener('click', async () => {
          const { error: updateError } = await supabase
            .from('admin_users')
            .update({
              admin_name: (document.querySelector<HTMLInputElement>('#edit-admin-name')?.value || '').trim(),
              password: (document.querySelector<HTMLInputElement>('#edit-admin-password')?.value || '').trim(),
              role: (document.querySelector<HTMLSelectElement>('#edit-admin-role')?.value || '').trim(),
              status: (document.querySelector<HTMLSelectElement>('#edit-admin-status')?.value || '').trim()
            })
            .eq('id', adminUser.id)

          if (updateError) {
            alert('수정 실패: ' + updateError.message)
            return
          }

          alert('수정되었습니다.')

          document.querySelector('[data-sub="admin-users"]')
            ?.dispatchEvent(new Event('click'))
        })
    })
  })

    if (!summaryBox) return

    summaryBox.innerHTML =

      '<div class="merchant-detail-header">' +
        '<h2>담당자 등록</h2>' +
        '<p>지사 / 대리점 / 담당자를 등록합니다.</p>' +
      '</div>' +

      '<div class="merchant-detail-grid">' +

        '<label>권한</label>' +
        '<select id="admin-role">' +
          '<option value="BRANCH">지사</option>' +
          '<option value="AGENCY">대리점</option>' +
          '<option value="MANAGER" selected>담당자</option>' +
        '</select>' +

        '<label>이름</label>' +
        '<input id="admin-name" />' +

        '<label>비밀번호</label>' +
        '<input id="admin-password" value="1234" />' +

      '</div>' +

      '<div class="merchant-detail-actions">' +
        '<button id="save-admin-user" class="merchant-save-btn">저장</button>' +
        '<button id="back-admin-user-list" class="merchant-close-btn">목록</button>' +
      '</div>'
      document.querySelector('#back-admin-user-list')
  ?.addEventListener('click', () => {
    document.querySelector('[data-sub="admin-users"]')
      ?.dispatchEvent(new Event('click'))
  })

document.querySelector('#save-admin-user')
  ?.addEventListener('click', async () => {
    const role =
  (document.querySelector<HTMLSelectElement>('#admin-role')?.value || '').trim()

const adminName =
  (document.querySelector<HTMLInputElement>('#admin-name')?.value || '').trim()

const password =
  (document.querySelector<HTMLInputElement>('#admin-password')?.value || '1234').trim()

    if (!adminName) {
      alert('이름을 입력해주세요.')
      return
    }

    const prefix =
      role === 'BRANCH'
        ? 'S'
        : role === 'AGENCY'
          ? 'A'
          : 'B'

    const { data: lastUsers, error: lastError } = await supabase
      .from('admin_users')
      .select('login_id')
      .like('login_id', prefix + '%')
      .order('id', { ascending: false })
      .limit(1)

    if (lastError) {
      alert('아이디 생성 실패: ' + lastError.message)
      return
    }

    let nextNumber = 1

    if (lastUsers && lastUsers.length > 0) {
      const lastLoginId = lastUsers[0].login_id || ''
      const numberPart = Number(lastLoginId.replace(prefix, ''))

      if (!isNaN(numberPart)) {
        nextNumber = numberPart + 1
      }
    }

    const loginId = prefix + String(nextNumber).padStart(4, '0')

    const { error } = await supabase
      .from('admin_users')
      .insert({
        admin_name: adminName,
        login_id: loginId,
        password: password,
        role: role,
status: '사용중',
parent_admin_id: 2
      })

    if (error) {
      alert('담당자 저장 실패: ' + error.message)
      return
    }

    alert(
      '등록되었습니다.\n\n' +
      '아이디: ' + loginId + '\n' +
      '비밀번호: ' + password
    )

    document.querySelector('[data-sub="admin-users"]')
      ?.dispatchEvent(new Event('click'))
  })
  })
  })

    if (titleBox) {
      titleBox.innerHTML = '▶ 가맹점관리 > 업체/가맹점 등록'
    }

    
    if (summaryBox) {
  summaryBox.innerHTML =
    '<div class="merchant-detail-header">' +
      '<h2>신규가입신청서</h2>' +
      '<p>신규 가맹점 가입신청 정보를 입력합니다.</p>' +
    '</div>'
}

if (tableTop) {
  tableTop.innerHTML = ''
}

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
            '<label>등록구분</label><select id="register-type"><option>가맹점</option><option>담당자</option><option>대리점</option></select>' +
            '<label>소속 대리점</label><select id="agency-name"><option>본사</option><option>에이드컴퍼니</option></select>' +
            '<label>사용 PG사</label><select id="pg-company"><option>다우데이타</option><option>코페이</option><option>토스페이먼츠</option></select>' +
            '<label>회사구분</label><select id="company-type"><option>개인(일반)</option><option>개인사업자</option><option>법인사업자</option></select>' +
            '<label>CPID</label><input id="cpid" placeholder="자동생성 또는 직접입력" />' +
            '<label>사업자번호</label><input id="business_number" />' +
            '<label>운영상태</label><select id="status"><option>신청</option><option>심사중</option><option>운영</option><option>중지</option></select>' +
            '<label>개통일자</label><input id="opened_at" type="date" />' +
          '</div>' +
        '</div>' +

        '<div class="merchant-detail-section">' +
          '<h3>기본정보</h3>' +
          '<div class="merchant-detail-grid">' +
            '<label>가맹점명</label><input id="merchant-name" />' +
            '<label>대표자</label><input id="owner-name" />' +
            '<label>주민번호</label><input id="resident-number" placeholder="000000-0000000" />' +
            '<label>연락처</label><input id="phone" />' +
            '<label>수수료율</label><input id="fee-rate" value="0" />' +
            '<label>이메일</label><input id="email" />' +
            '<label>법인번호</label><input id="corporate-number" />' +
            '<label>과세구분</label><select id="tax-type"><option>과세</option><option>비과세</option></select>' +
            '<label>취급품목</label><input id="product-item" />' +
            '<label>업태/종목</label>' +
            '<div class="business-type-row">' +
              '<input id="business-type" placeholder="업태" />' +
              '<input id="business-category" placeholder="종목" />' +
            '</div>' +
            '<label>주소</label>' +
            '<div class="address-one-line">' +
              '<input id="zipcode" class="zipcode-input" placeholder="우편번호" />' +
              '<button type="button" class="address-search-btn">우편번호 찾기</button>' +
              '<input id="address" class="address-main-input" placeholder="기본주소" />' +
              '<input id="address_detail" class="address-detail-input" placeholder="상세주소" />' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="merchant-detail-section">' +
  '<h3>PG / 단말기 정보</h3>' +

  '<h4>코페이</h4>' +
  '<div class="merchant-detail-grid">' +
    '<label>코페이 PG MID</label><input id="korpay_pg_mid" />' +
    '<label>코페이 PG Mkey</label><input id="korpay_pg_mkey" />' +
    '<label>코페이 단말기 MID</label><input id="korpay_terminal_mid" />' +
    '<label>코페이 단말기 Mkey</label><input id="korpay_terminal_mkey" />' +
    '<label>코페이 수기 MID</label><input id="korpay_manual_mid" />' +
    '<label>코페이 수기 Mkey</label><input id="korpay_manual_mkey" />' +
  '</div>' +

  '<h4>토스</h4>' +
  '<div class="merchant-detail-grid">' +
    '<label>토스 Client Key</label><input id="toss_client_key" />' +
    '<label>토스 Secret Key</label><input id="toss_secret_key" />' +
    '<label>토스 MID</label><input id="toss_mid" />' +
  '</div>' +

  '<h4>다우데이타</h4>' +
  '<div class="merchant-detail-grid">' +
    '<label>다우 PG MID</label><input id="daou_pg_mid" />' +
    '<label>다우 PG Mkey</label><input id="daou_pg_mkey" />' +
    '<label>다우 단말기 MID</label><input id="daou_terminal_mid" />' +
    '<label>다우 단말기 Mkey</label><input id="daou_terminal_mkey" />' +
    '<label>다우 수기 MID</label><input id="daou_manual_mid" />' +
    '<label>다우 수기 Mkey</label><input id="daou_manual_mkey" />' +
  '</div>' +

  '<h4>기존 관리번호</h4>' +
  '<div class="merchant-detail-grid">' +
    '<label>개통번호</label><input id="open-number" />' +
    '<label>관리번호</label><input id="manage-number" />' +
    '<label>무선단말기 개통번호</label><input id="wireless-open-number" />' +
    '<label>무선단말기 관리번호</label><input id="wireless-manage-number" />' +
  '</div>' +
'</div>' +

        '<div class="merchant-detail-section">' +
          '<h3>정산정보</h3>' +
          '<div class="merchant-detail-grid">' +
            '<label>정산은행</label><input id="bank_name" />' +
            '<label>계좌번호</label><input id="account_number" />' +
            '<label>예금주</label><input id="account_holder" />' +
            '<label>정산주기</label>' +
            '<select id="settlement_cycle">' +
              '<option value="1일">1일</option>' +
              '<option value="3일">3일</option>' +
              '<option value="4일" selected>4일</option>' +
              '<option value="7일">7일</option>' +
            '</select>' +
          '</div>' +
        '</div>' +

        '<div class="merchant-detail-section">' +
          '<h3>위험관리 / 한도설정</h3>' +
          '<div class="merchant-detail-grid merchant-risk-grid">' +
            '<label>최대할부기간</label>' +
            '<select id="installment-month">' +
              '<option>2개월</option><option>3개월</option><option>4개월</option><option>5개월</option><option>6개월</option><option>10개월</option><option>12개월</option>' +
            '</select>' +
            '<label>1일 승인한도</label><input id="daily-limit" />' +
            '<label>월한도</label><input id="monthly-limit" />' +
            '<label>연한도</label><input id="yearly-limit" />' +
          '</div>' +
        '</div>' +

        '<div class="merchant-detail-section">' +
          '<h3>첨부서류</h3>' +
          '<div class="merchant-file-list">' +
            '<div class="merchant-file-row"><label>사업자등록증</label><input id="business-license-file" type="file" /></div>' +
'<div class="merchant-file-row"><label>통장사본</label><input id="bankbook-file" type="file" /></div>' +
'<div class="merchant-file-row"><label>대표자 신분증</label><input id="id-card-file" type="file" /></div>' +
'<div class="merchant-file-row"><label>판매상품 사진</label><input id="product-photo-file" type="file" /></div>' +
'<div class="merchant-file-row"><label>기타서류</label><input id="extra-file" type="file" /></div>' +
            '<div class="merchant-file-row"><label>메모</label><textarea id="merchant-memo" placeholder="심사 메모를 입력하세요"></textarea></div>' +
          '</div>' +
        '</div>' +

        '<div class="merchant-detail-actions">' +
          '<button class="merchant-save-btn" id="save-new-merchant">저장</button>' +
          '<button class="merchant-close-btn" id="back-merchant-list">목록으로</button>' +
        '</div>' +

      '</div>' +
    '</td>' +
  '</tr>'

document.querySelector('#save-new-merchant')
  ?.addEventListener('click', async () => {
    const merchantName = (document.querySelector<HTMLInputElement>('#merchant-name')?.value || '').trim()
    const ownerName = (document.querySelector<HTMLInputElement>('#owner-name')?.value || '').trim()
    const businessNumber = (document.querySelector<HTMLInputElement>('#business_number')?.value || '').trim()
    const phone = (document.querySelector<HTMLInputElement>('#phone')?.value || '').trim()
    const email = (document.querySelector<HTMLInputElement>('#email')?.value || '').trim()
    const cpid = (document.querySelector<HTMLInputElement>('#cpid')?.value || '').trim()
const feeRate = Number((document.querySelector<HTMLInputElement>('#fee-rate')?.value || '0').trim())
const pgMid = (document.querySelector<HTMLInputElement>('#pg_mid')?.value || '').trim()
const terminalMid = (document.querySelector<HTMLInputElement>('#terminal_mid')?.value || '').trim()
const bankName = (document.querySelector<HTMLInputElement>('#bank_name')?.value || '').trim()
const accountNumber = (document.querySelector<HTMLInputElement>('#account_number')?.value || '').trim()
const accountHolder = (document.querySelector<HTMLInputElement>('#account_holder')?.value || '').trim()
const settlementCycle = (document.querySelector<HTMLSelectElement>('#settlement_cycle')?.value || '').trim()
const zipcode = (document.querySelector<HTMLInputElement>('#zipcode')?.value || '').trim()
const address = (document.querySelector<HTMLInputElement>('#address')?.value || '').trim()
const addressDetail = (document.querySelector<HTMLInputElement>('#address_detail')?.value || '').trim()
const registerType = (document.querySelector<HTMLSelectElement>('#register-type')?.value || '').trim()
const agencyName = (document.querySelector<HTMLSelectElement>('#agency-name')?.value || '').trim()
const pgCompany = (document.querySelector<HTMLSelectElement>('#pg-company')?.value || '').trim()
const companyType = (document.querySelector<HTMLSelectElement>('#company-type')?.value || '').trim()
const merchantStatus = (document.querySelector<HTMLSelectElement>('#status')?.value || '').trim()
const merchantType =(document.querySelector('#merchant-type') as HTMLSelectElement)?.value || '일반매장'
const openedAt = (document.querySelector<HTMLInputElement>('#opened_at')?.value || '').trim()
const residentNumber = (document.querySelector<HTMLInputElement>('#resident-number')?.value || '').trim()
const corporateNumber = (document.querySelector<HTMLInputElement>('#corporate-number')?.value || '').trim()
const taxType = (document.querySelector<HTMLSelectElement>('#tax-type')?.value || '').trim()
const productItem = (document.querySelector<HTMLInputElement>('#product-item')?.value || '').trim()
const businessType = (document.querySelector<HTMLInputElement>('#business-type')?.value || '').trim()
const businessCategory = (document.querySelector<HTMLInputElement>('#business-category')?.value || '').trim()
const openNumber = (document.querySelector<HTMLInputElement>('#open-number')?.value || '').trim()
const manageNumber = (document.querySelector<HTMLInputElement>('#manage-number')?.value || '').trim()
const wirelessOpenNumber = (document.querySelector<HTMLInputElement>('#wireless-open-number')?.value || '').trim()
const wirelessManageNumber = (document.querySelector<HTMLInputElement>('#wireless-manage-number')?.value || '').trim()
const installmentMonth = (document.querySelector<HTMLSelectElement>('#installment-month')?.value || '').trim()
const dailyLimit = (document.querySelector<HTMLInputElement>('#daily-limit')?.value || '').trim()
const monthlyLimit = (document.querySelector<HTMLInputElement>('#monthly-limit')?.value || '').trim()
const yearlyLimit = (document.querySelector<HTMLInputElement>('#yearly-limit')?.value || '').trim()
const memo = (document.querySelector<HTMLTextAreaElement>('#merchant-memo')?.value || '').trim()

const uploadMerchantFile = async (inputId: string, folderName: string) => {
  const fileInput = document.querySelector<HTMLInputElement>(inputId)
  const file = fileInput?.files?.[0]

  if (!file) return ''

  const fileExt = file.name.split('.').pop() || 'file'
const filePath = folderName + '/' + Date.now() + '-' + Math.random().toString(36).slice(2) + '.' + fileExt

  const { error } = await supabase.storage
    .from('merchant-files')
    .upload(filePath, file)

  if (error) {
    throw new Error(error.message)
  }

  const { data } = supabase.storage
    .from('merchant-files')
    .getPublicUrl(filePath)

  return data.publicUrl
}

let businessLicenseUrl = ''
let bankbookUrl = ''
let idCardUrl = ''
let productPhotoUrl = ''
let extraFileUrl = ''

try {
  businessLicenseUrl = await uploadMerchantFile('#business-license-file', 'business-license')
  bankbookUrl = await uploadMerchantFile('#bankbook-file', 'bankbook')
  idCardUrl = await uploadMerchantFile('#id-card-file', 'id-card')
  productPhotoUrl = await uploadMerchantFile('#product-photo-file', 'product-photo')
  extraFileUrl = await uploadMerchantFile('#extra-file', 'extra')
} catch (uploadError) {
  alert('파일 업로드 실패: ' + (uploadError as Error).message)
  return
}

if (!merchantName) {
      alert('가맹점명을 입력해주세요.')
      return
    }

    if (!ownerName) {
      alert('대표자명을 입력해주세요.')
      return
    }

    const { error } = await supabase
      .from('merchants')
      .insert({
  merchant_name: merchantName,
  merchant_type: merchantType,
  owner_name: ownerName,
  business_number: businessNumber,
  phone: phone,
  email: email,
  cpid: cpid,
  fee_rate: feeRate,
  pg_mid: pgMid,
  terminal_mid: terminalMid,
  bank_name: bankName,
  account_number: accountNumber,
  account_holder: accountHolder,
  settlement_cycle: settlementCycle,
  zipcode: zipcode,
  address: address,
  address_detail: addressDetail,

  register_type: registerType,
  agency_name: agencyName,
  pg_company: pgCompany,
  company_type: companyType,
  opened_at: openedAt,
  resident_number: residentNumber,
  corporate_number: corporateNumber,
  tax_type: taxType,
  product_item: productItem,
  business_type: businessType,
  business_category: businessCategory,
  open_number: openNumber,
  manage_number: manageNumber,
  wireless_open_number: wirelessOpenNumber,
  wireless_manage_number: wirelessManageNumber,
  installment_month: installmentMonth,
  daily_limit: dailyLimit,
  monthly_limit: monthlyLimit,
  yearly_limit: yearlyLimit,
  memo: memo,

business_license_url: businessLicenseUrl,
bankbook_url: bankbookUrl,
id_card_url: idCardUrl,
product_photo_url: productPhotoUrl,
extra_file_url: extraFileUrl,

status: merchantStatus || '신청'
})

    if (error) {
      alert('저장 실패: ' + error.message)
      return
    }

    alert('신규가입신청서가 저장되었습니다.')
    location.reload()
  })
 })
  })

  const defaultMerchantTab =
  document.querySelector<HTMLElement>('[data-page="merchant"]')

defaultMerchantTab?.click()

document.addEventListener('click', async (event) => {
  const target = event.target as HTMLElement

  if (target.dataset.sub !== 'admin-users') return

  document.querySelectorAll('.sub-tab')
    .forEach((tab) => tab.classList.remove('active'))

  target.classList.add('active')

  const titleBox = document.querySelector('.admin-title')
  const summaryBox = document.querySelector('.admin-summary')
  const tableTop = document.querySelector('.admin-table-top')
  const tableHead = document.querySelector('.admin-table thead')
  const paymentTableBody =
    document.querySelector<HTMLTableSectionElement>('#paymentTableBody')

  if (titleBox) {
    titleBox.innerHTML = '▶ 가맹점관리 > 담당자관리'
  }

  if (tableTop) tableTop.innerHTML = ''
  if (tableHead) tableHead.innerHTML = ''
  if (paymentTableBody) paymentTableBody.innerHTML = ''

  const { data: adminUsers, error } = await supabase
    .from('admin_users')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    alert('담당자 조회 실패: ' + error.message)
    return
  }

  if (!summaryBox) return

  summaryBox.innerHTML =
    '<div class="merchant-detail-header">' +
      '<h2>담당자관리</h2>' +
      '<p>운영자, 지사, 대리점, 담당자 계정을 관리합니다.</p>' +
'</div>' +

'<div style="margin-bottom:16px;">' +
  '<button id="safe-add-admin-user-btn" class="merchant-save-btn">+ 담당자 등록</button>' +
'</div>' +

'<table class="admin-table">' +
      '<thead>' +
        '<tr>' +
          '<th>이름</th>' +
          '<th>아이디</th>' +
          '<th>권한</th>' +
          '<th>상태</th>' +
          '<th>관리</th>' +
        '</tr>' +
      '</thead>' +
      '<tbody>' +
        (adminUsers || []).map((user) =>
          '<tr>' +
            '<td>' + (user.admin_name || '-') + '</td>' +
            '<td>' + (user.login_id || '-') + '</td>' +
            '<td>' +
  (
    user.role === 'MASTER'
      ? '최고관리자'
      : user.role === 'BRANCH'
        ? '지사'
        : user.role === 'AGENCY'
          ? '대리점'
          : user.role === 'MANAGER'
            ? '담당자'
            : '-'
  ) +
'</td>' +
            '<td>' + (user.status || '-') + '</td>' +
            '<td>' +
  '<button class="admin-user-edit-btn" data-id="' + user.id + '">' +
    '수정' +
  '</button>' +
'</td>' +
          '</tr>'
        ).join('') +
      '</tbody>' +
    '</table>'

    const appWindow = window as Window & {
      adminUserEditClickReady?: boolean
    }
    
    if (!appWindow.adminUserEditClickReady) {
      appWindow.adminUserEditClickReady = true
    
      document.addEventListener('click', async (event) => {
        const target = event.target as HTMLElement
    
        if (!target.classList.contains('admin-user-edit-btn')) return

const adminUserId = Number(target.dataset.id)

const { data: adminUser, error } = await supabase
  .from('admin_users')
  .select('*')
  .eq('id', adminUserId)
  .single()

if (error || !adminUser) {
  alert('담당자 정보를 불러오지 못했습니다.')
  return
}

if (!summaryBox) return

summaryBox.innerHTML =
  '<div class="merchant-detail-header">' +
    '<h2>담당자 수정</h2>' +
    '<p>담당자 계정 정보를 수정합니다.</p>' +
  '</div>' +

  '<div class="merchant-detail-grid">' +
    '<label>권한</label>' +
    '<select id="edit-admin-role" ' + (adminUser.login_id === 'NXGMASTER16' ? 'disabled' : '') + '>' +
      '<option value="MASTER" ' + (adminUser.role === 'MASTER' ? 'selected' : '') + '>최고관리자</option>' +
      '<option value="BRANCH" ' + (adminUser.role === 'BRANCH' ? 'selected' : '') + '>지사</option>' +
      '<option value="AGENCY" ' + (adminUser.role === 'AGENCY' ? 'selected' : '') + '>대리점</option>' +
      '<option value="MANAGER" ' + (adminUser.role === 'MANAGER' ? 'selected' : '') + '>담당자</option>' +
    '</select>' +

    '<label>이름</label>' +
    '<input id="edit-admin-name" value="' + (adminUser.admin_name || '') + '" />' +

    '<label>아이디</label>' +
    '<input id="edit-admin-login-id" value="' + (adminUser.login_id || '') + '" readonly />' +

    '<label>비밀번호</label>' +
    '<input id="edit-admin-password" value="' + (adminUser.password || '') + '" />' +

    '<label>상태</label>' +
    '<select id="edit-admin-status" ' + (adminUser.login_id === 'NXGMASTER16' ? 'disabled' : '') + '>' +
      '<option value="사용중" ' + (adminUser.status === '사용중' ? 'selected' : '') + '>사용중</option>' +
      '<option value="사용정지" ' + (adminUser.status === '사용정지' ? 'selected' : '') + '>사용정지</option>' +
      '<option value="퇴사" ' + (adminUser.status === '퇴사' ? 'selected' : '') + '>퇴사</option>' +
    '</select>' +
  '</div>' +

  '<div class="merchant-detail-actions">' +
    '<button id="safe-update-admin-user" class="merchant-save-btn" data-id="' + adminUser.id + '">저장</button>' +
    '<button id="safe-cancel-admin-user-edit" class="merchant-close-btn">취소</button>' +
  '</div>'

  document.querySelector('#safe-cancel-admin-user-edit')
  ?.addEventListener('click', () => {
    document.querySelector<HTMLElement>('[data-sub="admin-users"]')?.click()
  })

document.querySelector('#safe-update-admin-user')
  ?.addEventListener('click', async () => {
    const newRole =
      (document.querySelector<HTMLSelectElement>('#edit-admin-role')?.value || adminUser.role).trim()

    const newName =
      (document.querySelector<HTMLInputElement>('#edit-admin-name')?.value || '').trim()

    const newPassword =
      (document.querySelector<HTMLInputElement>('#edit-admin-password')?.value || '').trim()

    const newStatus =
      (document.querySelector<HTMLSelectElement>('#edit-admin-status')?.value || adminUser.status).trim()

    if (!newName) {
      alert('이름을 입력해주세요.')
      return
    }

    const isRootMaster = adminUser.login_id === 'NXGMASTER16'

    let newLoginId = adminUser.login_id

    if (!isRootMaster && adminUser.role !== newRole) {
      const prefix =
        newRole === 'BRANCH'
          ? 'S'
          : newRole === 'AGENCY'
            ? 'A'
            : newRole === 'MANAGER'
              ? 'B'
              : 'NXGMASTER'

      if (newRole !== 'MASTER') {
        const { data: lastUsers, error: lastError } = await supabase
          .from('admin_users')
          .select('login_id')
          .like('login_id', prefix + '%')
          .order('id', { ascending: false })
          .limit(1)

        if (lastError) {
          alert('아이디 생성 실패: ' + lastError.message)
          return
        }

        let nextNumber = 1

        if (lastUsers && lastUsers.length > 0) {
          const lastLoginId = lastUsers[0].login_id || ''
          const numberPart = Number(lastLoginId.replace(prefix, ''))

          if (!isNaN(numberPart)) {
            nextNumber = numberPart + 1
          }
        }

        newLoginId = prefix + String(nextNumber).padStart(4, '0')
      }
    }

    const updateData = isRootMaster
      ? {
          admin_name: newName,
          password: newPassword
        }
      : {
          admin_name: newName,
          password: newPassword,
          role: newRole,
          status: newStatus,
          login_id: newLoginId
        }

    const { error } = await supabase
      .from('admin_users')
      .update(updateData)
      .eq('id', adminUser.id)

    if (error) {
      alert('수정 실패: ' + error.message)
      return
    }

    alert('수정되었습니다.')

    document.querySelector<HTMLElement>('[data-sub="admin-users"]')?.click()
  })
      })
    }
    
    document.querySelector('#safe-add-admin-user-btn')
      ?.addEventListener('click', () => {
    if (!summaryBox) return

    summaryBox.innerHTML =
      '<div class="merchant-detail-header">' +
        '<h2>담당자 등록</h2>' +
        '<p>담당자 계정을 등록합니다.</p>' +
      '</div>' +

      '<div class="merchant-detail-grid">' +
        '<label>권한</label>' +
        '<select id="safe-admin-role">' +
          '<option value="BRANCH">지사</option>' +
          '<option value="AGENCY">대리점</option>' +
          '<option value="MANAGER" selected>담당자</option>' +
        '</select>' +

        '<label>이름</label>' +
        '<input id="safe-admin-name" />' +

        '<label>비밀번호</label>' +
'<input id="safe-admin-password" value="1234" />' +

'<label>상위조직</label>' +
'<select id="safe-parent-admin-id">' +
  '<option value="">선택</option>' +
'</select>' +

'</div>' +

      '<div class="merchant-detail-actions">' +
        '<button id="safe-save-admin-user" class="merchant-save-btn">저장</button>' +
        '<button id="safe-back-admin-user-list" class="merchant-close-btn">목록</button>' +
      '</div>'

      const parentSelect =
  document.querySelector<HTMLSelectElement>('#safe-parent-admin-id')

if (parentSelect) {
  parentSelect.innerHTML = '<option value="">선택</option>'

  ;(adminUsers || [])
    .filter((user) =>
      user.role === 'MASTER' ||
      user.role === 'BRANCH' ||
      user.role === 'AGENCY'
    )
    .forEach((user) => {
      const option = document.createElement('option')
      option.value = String(user.id)

      option.textContent =
        user.role === 'MASTER'
          ? '대표관리자 - ' + user.admin_name
          : user.role === 'BRANCH'
            ? '지사 - ' + user.admin_name
            : '대리점 - ' + user.admin_name

      parentSelect.appendChild(option)
    })
}

      document.querySelector('#safe-back-admin-user-list')
  ?.addEventListener('click', () => {
    const adminUsersTab =
      document.querySelector<HTMLElement>('[data-sub="admin-users"]')

    adminUsersTab?.click()
  })
  

document.querySelector('#safe-save-admin-user')
  ?.addEventListener('click', async () => {
    const role =
      (document.querySelector<HTMLSelectElement>('#safe-admin-role')?.value || 'MANAGER').trim()

    const adminName =
      (document.querySelector<HTMLInputElement>('#safe-admin-name')?.value || '').trim()

    const password =
      (document.querySelector<HTMLInputElement>('#safe-admin-password')?.value || '1234').trim()
    const parentAdminId =
      Number(
        document.querySelector<HTMLSelectElement>('#safe-parent-admin-id')
          ?.value || 0
      )
    if (!adminName) {
      alert('이름을 입력해주세요.')
      return
    }
    if (!parentAdminId) {
      alert('상위조직을 선택해주세요.')
      return
    }

    const prefix =
      role === 'BRANCH'
        ? 'S'
        : role === 'AGENCY'
          ? 'A'
          : 'B'

    const { data: lastUsers, error: lastError } = await supabase
      .from('admin_users')
      .select('login_id')
      .like('login_id', prefix + '%')
      .order('id', { ascending: false })
      .limit(1)

    if (lastError) {
      alert('아이디 생성 실패: ' + lastError.message)
      return
    }

    let nextNumber = 1

    if (lastUsers && lastUsers.length > 0) {
      const lastLoginId = lastUsers[0].login_id || ''
      const numberPart = Number(lastLoginId.replace(prefix, ''))

      if (!isNaN(numberPart)) {
        nextNumber = numberPart + 1
      }
    }

    const loginId = prefix + String(nextNumber).padStart(4, '0')

    const { error } = await supabase
      .from('admin_users')
      .insert({
        admin_name: adminName,
        login_id: loginId,
        password: password,
        role: role,
        status: '사용중',
        parent_admin_id: parentAdminId
      })

    if (error) {
      alert('담당자 저장 실패: ' + error.message)
      return
    }

    alert(
      '등록되었습니다.\n\n' +
      '아이디: ' + loginId + '\n' +
      '비밀번호: ' + password
    )

    document.querySelector('[data-sub="admin-users"]')
      ?.dispatchEvent(new Event('click'))
  })
  })
})

document.addEventListener('change', (event) => {
  const target = event.target as HTMLElement

  if (target.id === 'admin-page-size') {
    const select = target as HTMLSelectElement

    sessionStorage.setItem('admin_page_size', select.value)

    const activeTab =
      document.querySelector<HTMLElement>('.admin-tab.active')

    if (activeTab) {
      activeTab.click()
    }

    return
  }

  if (target.id === 'withdraw-page-size') {
    const select = target as HTMLSelectElement

    sessionStorage.setItem('withdraw_page_size', select.value)

    const activeTab =
      document.querySelector<HTMLElement>('.admin-tab.active')

    if (activeTab) {
      activeTab.click()
    }
  }
})

if (titleBox) {
  titleBox.innerHTML = '▶ 가맹점관리 > 가맹점 관리'
}
const searchBox = document.querySelector('.admin-search-box')

if (searchBox) {
  searchBox.innerHTML =
    '<div class="merchant-filter-line">' +
      '<span class="filter-label">• 검색</span>' +

      '<select id="merchant-pg-filter">' +
        '<option value="">전체 PG</option>' +
        '<option value="다우데이타">다우데이타</option>' +
        '<option value="코페이">코페이</option>' +
        '<option value="토스페이먼츠">토스페이먼츠</option>' +
      '</select>' +

      '<input id="merchant-start-date" type="date" />' +
      '<span>~</span>' +
      '<input id="merchant-end-date" type="date" />' +

      '<button class="quick-btn" data-range="today">오늘</button>' +
      '<button class="quick-btn" data-range="yesterday">어제</button>' +
      '<button class="quick-btn" data-range="month">당월</button>' +

      '<select id="merchant-status-filter">' +
        '<option value="">전체 상태</option>' +
        '<option value="운영">운영</option>' +
        '<option value="중지">중지</option>' +
        '<option value="신청">가입대기</option>' +
      '</select>' +

      '<select id="merchant-search-type">' +
  '<option value="all">전체검색</option>' +
  '<option value="name">가맹점명 / 대표자명</option>' +
  '<option value="business_number">사업자번호</option>' +
  '<option value="resident_number">주민번호</option>' +
  '<option value="cpid">단말기 CPID</option>' +
  '<option value="pg_mid">PG사 MID</option>' +
  '<option value="terminal_mid">단말기 MID</option>' +
'</select>' +

      '<input id="merchant-search-keyword" placeholder="검색어 입력" />' +
'<button class="merchant-search-btn" type="button">검색</button>' +
'</div>'
}

const tableTop = document.querySelector('.admin-table-top')

if (tableTop) {
  tableTop.innerHTML =
    '<select id="admin-page-size">' +
      '<option value="10">10개씩 보기</option>' +
      '<option value="20">20개씩 보기</option>' +
      '<option value="50">50개씩 보기</option>' +
    '</select>' +
    '<div id="merchant-pagination" class="merchant-pagination"></div>'
}

document.querySelectorAll<HTMLButtonElement>('.quick-btn')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const range = button.dataset.range

      const today = new Date()
      const yyyy = today.getFullYear()
      const mm = String(today.getMonth() + 1).padStart(2, '0')
      const dd = String(today.getDate()).padStart(2, '0')

      const todayText = yyyy + '-' + mm + '-' + dd

      const startInput =
        document.querySelector<HTMLInputElement>('#merchant-start-date')

      const endInput =
        document.querySelector<HTMLInputElement>('#merchant-end-date')

      if (!startInput || !endInput) return

      if (range === 'today') {
        startInput.value = todayText
        endInput.value = todayText
      }

      if (range === 'yesterday') {
        const yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)

        const y = yesterday.getFullYear()
        const m = String(yesterday.getMonth() + 1).padStart(2, '0')
        const d = String(yesterday.getDate()).padStart(2, '0')

        startInput.value = y + '-' + m + '-' + d
        endInput.value = y + '-' + m + '-' + d
      }

      if (range === 'month') {
        startInput.value = yyyy + '-' + mm + '-01'
        endInput.value = todayText
      }
    })
  })

const merchantSearchButton =
  document.querySelector<HTMLButtonElement>('.merchant-search-btn')

  merchantSearchButton?.addEventListener('click', async () => {
  

      const result = await supabase
        .from('merchants')
        .select('*')
        .order('id', { ascending: true })
    
      if (result.error) {
        alert('가맹점 조회 실패: ' + result.error.message)
        return
      }
    
      const pgFilter =
  document.querySelector<HTMLSelectElement>('#merchant-pg-filter')?.value || ''

const statusFilter =
  document.querySelector<HTMLSelectElement>('#merchant-status-filter')?.value || ''

const searchType =
  document.querySelector<HTMLSelectElement>('#merchant-search-type')?.value || 'all'

  const keyword =
  document.querySelector<HTMLInputElement>('#merchant-search-keyword')?.value.trim() || ''

const cleanKeyword = keyword.replace(/-/g, '')

const startDate =
  document.querySelector<HTMLInputElement>('#merchant-start-date')?.value || ''

const endDate =
  document.querySelector<HTMLInputElement>('#merchant-end-date')?.value || ''

let merchants = result.data || []

if (pgFilter) {
  merchants = merchants.filter((merchant) =>
    String(merchant.pg_company || '').includes(pgFilter)
  )
}

if (statusFilter) {
  merchants = merchants.filter((merchant) =>
    String(merchant.status || '') === statusFilter
  )
}

if (startDate) {
  merchants = merchants.filter((merchant) =>
    String(merchant.created_at || '').slice(0, 10) >= startDate
  )
}

if (endDate) {
  merchants = merchants.filter((merchant) =>
    String(merchant.created_at || '').slice(0, 10) <= endDate
  )
}

if (keyword) {
  merchants = merchants.filter((merchant) => {
    const targetMap: Record<string, string> = {
      name:
        String(merchant.merchant_name || '') + ' ' +
        String(merchant.owner_name || ''),
    
      business_number: String(merchant.business_number || '').replace(/-/g, ''),
      resident_number: String(merchant.resident_number || '').replace(/-/g, ''),
      cpid: String(merchant.cpid || ''),

      pg_mid:
      String(merchant.pg_mid || '') + ' ' +
      String(merchant.korpay_pg_mid || '') + ' ' +
      String(merchant.korpay_manual_mid || '') + ' ' +
      String(merchant.toss_mid || '') + ' ' +
      String(merchant.toss_client_key || '') + ' ' +
      String(merchant.daou_pg_mid || '') + ' ' +
      String(merchant.daou_manual_mid || ''),
    
    terminal_mid:
      String(merchant.terminal_mid || '') + ' ' +
      String(merchant.korpay_terminal_mid || '') + ' ' +
      String(merchant.daou_terminal_mid || '')
    }

    if (searchType !== 'all') {
      return targetMap[searchType]?.includes(cleanKeyword)
    }

    return Object.values(targetMap).some((value) =>
      value.replace(/-/g, '').includes(cleanKeyword)
    )
  })
}

      const summaryBox = document.querySelector('.admin-summary')
      
      const tableHead = document.querySelector('.admin-table thead')
      
      const paymentTableBody =
  document.querySelector<HTMLTableSectionElement>('#paymentTableBody')!
  

      
  const { data: allMerchants } = await supabase
  .from('merchants')
  .select('status')

const waitingCount =
  allMerchants?.filter((item) => item.status === '신청').length || 0

const approvedCount =
  allMerchants?.filter((item) =>
    ['승인', '승인완료', '운영', '대기'].includes(item.status || '')
  ).length || 0

const rejectedCount =
  allMerchants?.filter((item) => item.status === '반려').length || 0

  const totalMerchantCount = allMerchants?.length || 0  
  if (summaryBox) {
    summaryBox.innerHTML =
      '<div class="merchant-status-cards">' +
      '<div class="merchant-status-card">' +
  '<p>전체 가맹점</p>' +
  '<strong>' + totalMerchantCount + '건</strong>' +
'</div>' +  
      '<div class="merchant-status-card">' +
          '<p>신청대기</p>' +
          '<strong>' + waitingCount + '건</strong>' +
        '</div>' +
        '<div class="merchant-status-card">' +
          '<p>승인완료</p>' +
          '<strong>' + approvedCount + '건</strong>' +
        '</div>' +
        '<div class="merchant-status-card danger">' +
          '<p>반려</p>' +
          '<strong>' + rejectedCount + '건</strong>' +
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
            '<th>정산주기</th>' +
            '<th>상태</th>' 
          '</tr>'
      }
      
      paymentTableBody.innerHTML = ''
      
      const savedAdminPageSize =
  sessionStorage.getItem('admin_page_size') || '20'

const pageSizeSelect =
  document.querySelector('#admin-page-size') as HTMLSelectElement | null

if (pageSizeSelect) {
  pageSizeSelect.value = savedAdminPageSize
}

const adminPageSize =
  Number(savedAdminPageSize) || 20

merchants
  .slice(0, adminPageSize)
  .forEach((merchant, index) => {
       
    const tr = document.createElement('tr')
      
        tr.innerHTML =
  '<td>' + (index + 1) + '</td>' +
  '<td><button class="merchant-link-btn" data-id="' + merchant.id + '">MER' + String(merchant.id).padStart(4, '0') + '</button></td>' +
'<td><button class="merchant-link-btn" data-id="' + merchant.id + '">' + (merchant.merchant_name || '-') + '</button></td>' +
  '<td>' + (merchant.owner_name || '-') + '</td>' +
  '<td>' + (merchant.phone || '-') + '</td>' +
  '<td>' + (merchant.fee_rate || 0) + '%</td>' +
  '<td>' + (merchant.settlement_cycle || '-') + '</td>' +
  '<td>' + (merchant.status || '운영') + '</td>' 

      
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
'<label>등록구분</label>' +
'<select id="register_type">' +
  '<option ' + (merchant.register_type === '가맹점' ? 'selected' : '') + '>가맹점</option>' +
  '<option ' + (merchant.register_type === '담당자' ? 'selected' : '') + '>담당자</option>' +
  '<option ' + (merchant.register_type === '대리점' ? 'selected' : '') + '>대리점</option>' +
'</select>' +

'<label>소속 대리점</label>' +
'<select id="agency_name">' +
  '<option value="' + (merchant.agency_name || '본사') + '">' + (merchant.agency_name || '본사') + '</option>' +
'</select>' +

'<label>사용 PG사</label>' +
'<select id="pg_company">' +
  '<option ' + (merchant.pg_company === '다우데이타' ? 'selected' : '') + '>다우데이타</option>' +
  '<option ' + (merchant.pg_company === '코페이' ? 'selected' : '') + '>코페이</option>' +
  '<option ' + (merchant.pg_company === '토스페이먼츠' ? 'selected' : '') + '>토스페이먼츠</option>' +
'</select>' +

'<label>회사구분</label>' +
'<select id="company_type">' +
  '<option ' + (merchant.company_type === '개인(일반)' ? 'selected' : '') + '>개인(일반)</option>' +
  '<option ' + (merchant.company_type === '개인사업자' ? 'selected' : '') + '>개인사업자</option>' +
  '<option ' + (merchant.company_type === '법인사업자' ? 'selected' : '') + '>법인사업자</option>' +
'</select>' +
                '<label>CPID</label><input id="cpid" value="' + (merchant.cpid || ('MER' + String(merchant.id).padStart(4, '0'))) + '" />' +
                '<label>사업자번호</label><input id="business_number" value="' + (merchant.business_number || '') + '" />' +
                '<label>운영상태</label>' +
'<select id="merchant_status">' +
  '<option ' + (merchant.status === '신청' ? 'selected' : '') + '>신청</option>' +
  '<option ' + (merchant.status === '심사중' ? 'selected' : '') + '>심사중</option>' +
  '<option ' + (merchant.status === '운영' ? 'selected' : '') + '>운영</option>' +
  '<option ' + (merchant.status === '중지' ? 'selected' : '') + '>중지</option>' +
'</select>' +
'<label>개통일자</label>' +
'<input id="opened_at" type="date" value="' + (merchant.opened_at || '') + '" />' +

'<label>비밀번호</label>' +
'<input id="merchant-password-input" type="text" value="' + (merchant.merchant_password || '') + '" placeholder="비밀번호 입력" />' +

              '</div>' +
            '</div>' +
    
           '<div class="merchant-detail-section">' +
  '<h3>기본정보</h3>' +
  '<div class="merchant-detail-grid">' +

    '<label>가맹점명</label>' +
    '<input id="merchant-name" value="' + (merchant.merchant_name || '') + '" />' +
    '<label>가맹점 유형</label>' +
'<select id="merchant-type">' +
'<option value="일반매장" ' + (merchant.merchant_type === '일반매장' ? 'selected' : '') + '>일반매장</option>' +
'<option value="학원" ' + (merchant.merchant_type === '학원' ? 'selected' : '') + '>학원</option>' +
'<option value="아파트관리" ' + (merchant.merchant_type === '아파트관리' ? 'selected' : '') + '>아파트관리</option>' +
'<option value="청소업체" ' + (merchant.merchant_type === '청소업체' ? 'selected' : '') + '>청소업체</option>' +
'<option value="렌탈" ' + (merchant.merchant_type === '렌탈' ? 'selected' : '') + '>렌탈</option>' +
'<option value="결혼" ' + (merchant.merchant_type === '결혼' ? 'selected' : '') + '>결혼</option>' +
'<option value="장례" ' + (merchant.merchant_type === '장례' ? 'selected' : '') + '>장례</option>' +
'</select>' +

    '<label>대표자</label>' +
    '<input id="owner-name" value="' + (merchant.owner_name || '') + '" />' +

    '<label>주민번호</label>' +
'<input id="resident-number" value="' + (merchant.resident_number || '') + '" placeholder="000000-0000000" />' +

    '<label>연락처</label>' +
    '<input id="phone" value="' + (merchant.phone || '') + '" />' +

    '<label>수수료율</label>' +
    '<input id="fee-rate" value="' + (merchant.fee_rate || 0) + '" />' +

   '<label>이메일</label><input id="email" value="' + (merchant.email || '') + '" />' +

'<label>법인번호</label><input id="corporate-number" value="' + (merchant.corporate_number || '') + '" />' +

    '<label>과세구분</label>' +
'<select id="tax-type">' +
  '<option ' + (merchant.tax_type === '과세' ? 'selected' : '') + '>과세</option>' +
  '<option ' + (merchant.tax_type === '비과세' ? 'selected' : '') + '>비과세</option>' +
'</select>' +

    '<label>취급품목</label>' +
'<input id="product-item" value="' + (merchant.product_item || '') + '" />' +

    '<label>업태/종목</label>' +
    '<div class="business-type-row">' +
      '<input id="business-type" value="' + (merchant.business_type || '') + '" placeholder="업태" />' +
      '<input id="business-category" value="' + (merchant.business_category || '') + '" placeholder="종목" />' +
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

    '<label>코페이 PG MID</label><input id="korpay_pg_mid" value="' + (merchant.korpay_pg_mid || '') + '" />' +
    '<label>코페이 PG MKEY</label><input id="korpay_pg_mkey" value="' + (merchant.korpay_pg_mkey || '') + '" />' +

    '<label>코페이 단말기 MID</label><input id="korpay_terminal_mid" value="' + (merchant.korpay_terminal_mid || '') + '" />' +
    '<label>코페이 단말기 MKEY</label><input id="korpay_terminal_mkey" value="' + (merchant.korpay_terminal_mkey || '') + '" />' +

    '<label>코페이 수기 MID</label><input id="korpay_manual_mid" value="' + (merchant.korpay_manual_mid || '') + '" />' +
    '<label>코페이 수기 MKEY</label><input id="korpay_manual_mkey" value="' + (merchant.korpay_manual_mkey || '') + '" />' +

    '<label>토스 Client Key</label><input id="toss_client_key" value="' + (merchant.toss_client_key || '') + '" />' +
    '<label>토스 Secret Key</label><input id="toss_secret_key" value="' + (merchant.toss_secret_key || '') + '" />' +

    '<label>토스 MID</label><input id="toss_mid" value="' + (merchant.toss_mid || '') + '" />' +
    '<label></label><div></div>' +

    '<label>다우 PG MID</label><input id="daou_pg_mid" value="' + (merchant.daou_pg_mid || '') + '" />' +
    '<label>다우 PG MKEY</label><input id="daou_pg_mkey" value="' + (merchant.daou_pg_mkey || '') + '" />' +

    '<label>다우 단말기 MID</label><input id="daou_terminal_mid" value="' + (merchant.daou_terminal_mid || '') + '" />' +
    '<label>다우 단말기 MKEY</label><input id="daou_terminal_mkey" value="' + (merchant.daou_terminal_mkey || '') + '" />' +

    '<label>다우 수기 MID</label><input id="daou_manual_mid" value="' + (merchant.daou_manual_mid || '') + '" />' +
    '<label>다우 수기 MKEY</label><input id="daou_manual_mkey" value="' + (merchant.daou_manual_mkey || '') + '" />' +

  '</div>' +
'</div>' +
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
'<select id="installment-month">' +
      '<option ' + (merchant.installment_month === '2개월' ? 'selected' : '') + '>2개월</option>' +
'<option ' + (merchant.installment_month === '3개월' ? 'selected' : '') + '>3개월</option>' +
'<option ' + (merchant.installment_month === '4개월' ? 'selected' : '') + '>4개월</option>' +
'<option ' + (merchant.installment_month === '5개월' ? 'selected' : '') + '>5개월</option>' +
'<option ' + (merchant.installment_month === '6개월' ? 'selected' : '') + '>6개월</option>' +
'<option ' + (merchant.installment_month === '10개월' ? 'selected' : '') + '>10개월</option>' +
'<option ' + (merchant.installment_month === '12개월' ? 'selected' : '') + '>12개월</option>' +
    '</select>' +
    '<label>1일 승인한도</label><input id="daily-limit" value="' + (merchant.daily_limit || '') + '" />' +
    '<label>월한도</label><input id="monthly-limit" value="' + (merchant.monthly_limit || '') + '" />' +
    '<label>연한도</label><input id="yearly-limit" value="' + (merchant.yearly_limit || '') + '" />' +
  '</div>' +
'</div>' +
    
'<div class="merchant-detail-section">' +
  '<h3>첨부서류</h3>' +
  '<div class="merchant-file-list">' +

    '<div class="merchant-file-row">' +
      '<label>사업자등록증</label>' +
      '<input type="file" />' +
      '<span>기존 파일: ' +
        (merchant.business_license_url ? '<a href="' + merchant.business_license_url + '" target="_blank">보기</a>' : '첨부파일 없음') +
      '</span>' +
    '</div>' +

    '<div class="merchant-file-row">' +
      '<label>통장사본</label>' +
      '<input type="file" />' +
      '<span>기존 파일: ' +
        (merchant.bankbook_url ? '<a href="' + merchant.bankbook_url + '" target="_blank">보기</a>' : '첨부파일 없음') +
      '</span>' +
    '</div>' +

    '<div class="merchant-file-row">' +
      '<label>대표자 신분증</label>' +
      '<input type="file" />' +
      '<span>기존 파일: ' +
        (merchant.id_card_url ? '<a href="' + merchant.id_card_url + '" target="_blank">보기</a>' : '첨부파일 없음') +
      '</span>' +
    '</div>' +

    '<div class="merchant-file-row">' +
      '<label>판매상품 사진</label>' +
      '<input type="file" />' +
      '<span>기존 파일: ' +
        (merchant.product_photo_url ? '<a href="' + merchant.product_photo_url + '" target="_blank">보기</a>' : '첨부파일 없음') +
      '</span>' +
    '</div>' +

    '<div class="merchant-file-row">' +
      '<label>기타서류</label>' +
      '<input type="file" />' +
      '<span>기존 파일: ' +
        (merchant.extra_file_url ? '<a href="' + merchant.extra_file_url + '" target="_blank">보기</a>' : '첨부파일 없음') +
      '</span>' +
    '</div>' +

    '<div class="merchant-file-row">' +
      '<label>메모</label>' +
      '<textarea id="merchant-memo" placeholder="심사 메모를 입력하세요">' + (merchant.memo || '') + '</textarea>' +
    '</div>' +

  '</div>' +
'</div>' +
            '<div class="merchant-detail-actions">' +
            '<button class="merchant-save-btn" id="save-merchant-info">저장</button>' +
              '<button class="merchant-save-btn" id="approve-merchant">개통완료</button>' +
              '<button class="merchant-save-btn" id="show-merchant-login">로그인정보 확인</button>' +
'<button class="merchant-reject-btn" id="delete-merchant">삭제</button>' +
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

      

      const getValue = (id: string) =>
  (document.getElementById(id) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null)?.value || ''
      
      const updateData: any = {
  merchant_name: merchantName,
  merchant_type: getValue('merchant-type'),
  owner_name: ownerName,
  phone: phone,
  fee_rate: feeRate,
  register_type: getValue('register_type'),
agency_name: getValue('agency_name'),
pg_company: getValue('pg_company'),
company_type: getValue('company_type'),
status: getValue('merchant_status'),

  resident_number: getValue('resident-number'),
        business_number: getValue('business_number'),
        email: getValue('email'),
        zipcode: getValue('zipcode'),
        address: getValue('address'),
        address_detail: getValue('address_detail'),
        cpid: getValue('cpid'),
        korpay_pg_mid: getValue('korpay_pg_mid'),
korpay_pg_mkey: getValue('korpay_pg_mkey'),
korpay_terminal_mid: getValue('korpay_terminal_mid'),
korpay_terminal_mkey: getValue('korpay_terminal_mkey'),
korpay_manual_mid: getValue('korpay_manual_mid'),
korpay_manual_mkey: getValue('korpay_manual_mkey'),

toss_client_key: getValue('toss_client_key'),
toss_secret_key: getValue('toss_secret_key'),
toss_mid: getValue('toss_mid'),

daou_pg_mid: getValue('daou_pg_mid'),
daou_pg_mkey: getValue('daou_pg_mkey'),
daou_terminal_mid: getValue('daou_terminal_mid'),
daou_terminal_mkey: getValue('daou_terminal_mkey'),
daou_manual_mid: getValue('daou_manual_mid'),
daou_manual_mkey: getValue('daou_manual_mkey'),
        opened_at: getValue('opened_at') || null,
      
        bank_name: getValue('bank_name'),
        account_number: getValue('account_number'),
        account_holder: getValue('account_holder'),
        settlement_cycle: getValue('settlement_cycle'),
        memo: getValue('merchant-memo')
      }

      const newPassword = getValue('merchant-password-input')

if (newPassword) {
  updateData.merchant_password = newPassword
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
    if (!confirm('개통완료 처리하시겠습니까?')) return

    const loginId =
      merchant.merchant_login_id || 'MER' + String(merchant.id).padStart(4, '0')

    const password =
      merchant.merchant_password || '1234'

    const { error } = await supabase
      .from('merchants')
      .update({
        status: '운영',
        merchant_login_id: loginId,
        merchant_password: password
      })
      .eq('id', merchant.id)

    if (error) {
      alert('개통완료 실패: ' + error.message)
      return
    }

    alert('개통완료 처리되었습니다.')

location.reload()
  })

  document.querySelector('#show-merchant-login')
  ?.addEventListener('click', () => {
    alert(
      '가맹점 로그인정보\n\n' +
      '로그인 주소 : https://payment-app-ybtf.vercel.app/merchant-login\n' +
      '아이디 : ' + (merchant.merchant_login_id || '-') + '\n' +
      '비밀번호 : ' + (merchant.merchant_password || '-')
    )
  })
  document.querySelector('#delete-merchant')
  ?.addEventListener('click', async () => {
    if (!confirm('이 신청내역을 삭제하시겠습니까?')) return

    const { error } = await supabase
      .from('merchants')
      .delete()
      .eq('id', merchant.id)

    if (error) {
      alert('삭제 실패: ' + error.message)
      return
    }

    alert('삭제되었습니다.')
    location.reload()
  })
    
})
})
})
})

merchantSearchButton?.click()
}

if (page === 'payout') {
      const subMenu = document.querySelector('.admin-sub-menu')
      const titleBox = document.querySelector('.admin-title')
      const searchBox = document.querySelector('.admin-search-box')
      const summaryBox = document.querySelector('.admin-summary')
      const tableHead = document.querySelector('.admin-table thead')
      const paymentTableBody =
        document.querySelector<HTMLTableSectionElement>('#paymentTableBody')!
        const tableTop = document.querySelector('.admin-table-top')

        if (tableTop) {
          tableTop.innerHTML =
            '<button>엑셀 다운로드</button>' +
            '<select id="withdraw-page-size">' +
              '<option value="10">10개씩 보기</option>' +
              '<option value="20">20개씩 보기</option>' +
              '<option value="50">50개씩 보기</option>' +
            '</select>'
        }
      let payoutPage = 1
      let payoutPageSize = Number(sessionStorage.getItem('withdraw_page_size') || 10)
    
      if (subMenu) {
        subMenu.innerHTML = '출금예정내역 | 출금완료내역'
      }
    
      if (titleBox) {
        titleBox.innerHTML = '▶ 출금관리 > 출금예정내역'
      }
    
      if (searchBox) {
        searchBox.innerHTML = `
          <div class="payout-search-panel">
            <div class="payout-search-row">
              <span class="payout-search-label">조회기준</span>
    
              <label><input type="radio" name="payout-date-type" value="거래일" checked> 거래일</label>
              <label><input type="radio" name="payout-date-type" value="가맹점출금예정일"> 가맹점출금예정일</label>
              <label><input type="radio" name="payout-date-type" value="회사입금예정일"> 회사입금예정일</label>
    
              <span class="payout-search-label">기간</span>
              <input id="payout-start-date" type="date">
              <span>~</span>
              <input id="payout-end-date" type="date">
    
              <button id="payout-today-btn" class="payout-small-btn">오늘</button>
              <button id="payout-yesterday-btn" class="payout-small-btn">어제</button>
              <button id="payout-month-btn" class="payout-small-btn">당월</button>
            </div>
    
            <div class="payout-search-row">
              <span class="payout-search-label">PG</span>
              <select id="payout-pg-filter">
                <option value="전체">전체</option>
                <option value="토스페이먼츠">토스페이먼츠</option>
                <option value="코페이">코페이</option>
              </select>
    
              <span class="payout-search-label">출금상태</span>
              <select id="payout-status-filter">
                <option value="전체">전체</option>
                <option value="출금대기">출금대기</option>
                <option value="출금보류">출금보류</option>
                <option value="계좌오류">계좌오류</option>
                <option value="계좌인증">계좌인증</option>
                <option value="출금완료">출금완료</option>
                <option value="출금오류">출금오류</option>
              </select>
    
              <span class="payout-search-label">조회대상</span>
              <select id="payout-target-filter">
                <option value="전체">전체</option>
                <option value="가맹점">가맹점</option>
                <option value="담당자">담당자</option>
                <option value="대리점">대리점</option>
                <option value="지사">지사</option>
              </select>
    
              <input id="payout-keyword" type="text" placeholder="검색어">
              <button id="payout-search-btn" class="payout-search-btn">조회</button>
    
              
            </div>
          </div>
        `
      }
    
      if (tableHead) {
        tableHead.innerHTML =
          '<tr>' +
            '<th>No</th>' +
            '<th>가맹점ID</th>' +
            '<th>가맹점명</th>' +
            '<th>PG사</th>' +
            '<th>결제금액</th>' +
            '<th>수수료</th>' +
            '<th>출금예정금액</th>' +
            '<th>출금예정일</th>' +
            '<th>출금상태</th>' +
            '<th>처리</th>' +
          '</tr>'
      }
    
      const { data: payments, error } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false })
    
      if (error) {
        alert('출금내역 조회 실패: ' + error.message)
        return
      }
    
      const payoutRows = payments || []
    
      const getPayoutDate = (createdAt: string) => {
        const paymentDate = new Date(createdAt)
        const payoutDate = new Date(paymentDate)
        payoutDate.setDate(payoutDate.getDate() + 1)
        return payoutDate.toISOString().slice(0, 10)
      }
    
      const getFilteredPayoutRows = () => {
        const pgFilter =
          (document.querySelector('#payout-pg-filter') as HTMLSelectElement)?.value || '전체'
    
        const statusFilter =
          (document.querySelector('#payout-status-filter') as HTMLSelectElement)?.value || '전체'
    
        const keyword =
          ((document.querySelector('#payout-keyword') as HTMLInputElement)?.value || '').trim()
    
        return payoutRows.filter((row) => {
          const payoutStatus = row.payout_status || '출금대기'
    
          if (pgFilter !== '전체' && row.pg_company !== pgFilter) {
            return false
          }
    
          if (statusFilter !== '전체' && payoutStatus !== statusFilter) {
            return false
          }
    
          if (keyword) {
            const searchText =
              String(row.merchant_id || '') + ' ' +
              String(row.merchant_name || '') + ' ' +
              String(row.pg_company || '') + ' ' +
              String(row.order_id || '') + ' ' +
              String(row.payment_key || '')
    
            if (!searchText.includes(keyword)) {
              return false
            }
          }
    
          return true
        })
      }
    
      const renderPayoutTable = () => {
        const filteredRows = getFilteredPayoutRows()
    
        const totalPayoutAmount = filteredRows.reduce((sum, row) => {
          const amount = Number(row.amount || 0)
          const feeAmount = Number(row.fee_amount || 0)
          const payoutAmount = Number(row.settlement_amount || amount - feeAmount)
          return sum + payoutAmount
        }, 0)
    
        if (summaryBox) {
          summaryBox.innerHTML =
            '출금대상 : ' + filteredRows.length + '건 &nbsp;&nbsp;&nbsp;' +
            '출금예정금액 : ' + totalPayoutAmount.toLocaleString() + '원 &nbsp;&nbsp;&nbsp;' +
            '출금시간 : 오후 3시'
        }
    
        const totalPages = Math.max(1, Math.ceil(filteredRows.length / payoutPageSize))
    
        if (payoutPage > totalPages) {
          payoutPage = totalPages
        }
    
        const startIndex = (payoutPage - 1) * payoutPageSize
        const visibleRows = filteredRows.slice(startIndex, startIndex + payoutPageSize)
    
        paymentTableBody.innerHTML = ''
    
        visibleRows.forEach((row, index) => {
          const tr = document.createElement('tr')
    
          const amount = Number(row.amount || 0)
          const feeAmount = Number(row.fee_amount || 0)
          const payoutAmount = Number(row.settlement_amount || amount - feeAmount)
    
          tr.innerHTML =
            '<td>' + (startIndex + index + 1) + '</td>' +
            '<td>' +
              (row.merchant_id
                ? 'MER' + String(row.merchant_id).padStart(4, '0')
                : '-') +
            '</td>' +
            '<td>' + (row.merchant_name || '-') + '</td>' +
            '<td>' + (row.pg_company || '-') + '</td>' +
            '<td>' + amount.toLocaleString() + '원</td>' +
            '<td>' + feeAmount.toLocaleString() + '원</td>' +
            '<td>' + payoutAmount.toLocaleString() + '원</td>' +
            '<td>' + getPayoutDate(row.created_at) + '</td>' +
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
              const paymentId = (button as HTMLElement).getAttribute('data-id')
    
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
    
      
      const payoutPageSizeSelect =
  document.querySelector<HTMLSelectElement>('#withdraw-page-size')

if (payoutPageSizeSelect) {
  payoutPageSizeSelect.value = String(payoutPageSize)

  payoutPageSizeSelect.addEventListener('change', () => {
    payoutPageSize = Number(payoutPageSizeSelect.value)
    payoutPage = 1
    sessionStorage.setItem('withdraw_page_size', String(payoutPageSize))
    renderPayoutTable()
  })
}
    
      document.querySelector('#payout-search-btn')
        ?.addEventListener('click', () => {
          payoutPage = 1
          renderPayoutTable()
        })
    
      document.querySelector('#payout-pg-filter')
        ?.addEventListener('change', () => {
          payoutPage = 1
          renderPayoutTable()
        })
    
      document.querySelector('#payout-status-filter')
        ?.addEventListener('change', () => {
          payoutPage = 1
          renderPayoutTable()
        })
    
      renderPayoutTable()
    
    
} else if (page === 'order') {
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
  let currentOrderPage = 1
  let orderPageSize = 10
  const orderList = orders || []
  
  
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

  function renderMerchantOrderPage() {
    paymentTableBody.innerHTML = ''
  
    const totalOrderPage = Math.max(
      1,
      Math.ceil(orderList.length / orderPageSize)
    )
  
    if (currentOrderPage > totalOrderPage) {
      currentOrderPage = totalOrderPage
    }
  
    const start = (currentOrderPage - 1) * orderPageSize
    const end = start + orderPageSize
    const pageOrders = orderList.slice(start, end)
  
    pageOrders.forEach((order, index) => {
      const tr = document.createElement('tr')
  
      const orderNumber =
        order.order_no?.split('-')[1] ||
        order.order_no ||
        start + index + 1
  
      const orderItems = Array.isArray(order.items)
        ? order.items
            .map((item: any) => item.name + ' x ' + item.quantity)
            .join(', ')
        : '-'
  
      tr.innerHTML =
        '<td>' + (start + index + 1) + '</td>' +
        '<td>' +
        '<button ' +
          'class="merchant-receipt-link" ' +
          'data-order="' + orderNumber + '" ' +
          'data-amount="' + (order.total_amount || 0) + '" ' +
          'data-date="' + (order.created_at || '') + '" ' +
          'data-items="' + orderItems + '" ' +
          'data-payment-key="' + (order.payment_key || '-') + '" ' +
          'data-customer="' + (order.customer_name || '현장고객') + '"' +
        '>' +
          orderNumber + '번' +
        '</button>' +
        '</td>' +
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
          '</button>' +
        '</td>'
  
      paymentTableBody.appendChild(tr)
    })
  
    const pageInfo = document.querySelector('#order-page-info')
    if (pageInfo) {
      pageInfo.textContent = currentOrderPage + ' / ' + totalOrderPage
    }
  
    const prevButton =
      document.querySelector<HTMLButtonElement>('#order-prev-page')
  
    const nextButton =
      document.querySelector<HTMLButtonElement>('#order-next-page')
  
    if (prevButton) {
      prevButton.disabled = currentOrderPage <= 1
    }
  
    if (nextButton) {
      nextButton.disabled = currentOrderPage >= totalOrderPage
    }
  }
  
  renderMerchantOrderPage()
  
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
  
    console.log('클릭됨:', target.id)
  
    if (target.id === 'order-prev-page') {
      console.log('이전 클릭')
  
      if (currentOrderPage <= 1) return
  
      currentOrderPage = currentOrderPage - 1
      renderMerchantOrderPage()
    }
  
    if (target.id === 'order-next-page') {
      console.log('다음 클릭')
  
      const totalOrderPage = Math.max(
        1,
        Math.ceil(orderList.length / orderPageSize)
      )
  
      if (currentOrderPage >= totalOrderPage) return
  
      currentOrderPage = currentOrderPage + 1
      renderMerchantOrderPage()
    }
  })
  
  document.addEventListener('change', (event) => {
    const target = event.target as HTMLSelectElement
  
    console.log('변경됨:', target.id)
  
    if (target.id === 'merchant-page-size') {
      orderPageSize = Number(target.value)
      currentOrderPage = 1
  
      renderMerchantOrderPage()
    }
  })

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
      '<th>NO</th>' +
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

      const productId =
        (button as HTMLElement).getAttribute('data-id')

      if (!confirm('정말 삭제하시겠습니까?')) {
        return
      }

      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', Number(productId))

      if (error) {
        alert('삭제 실패 : ' + error.message)
        return
      }

      alert('삭제되었습니다.')

      location.reload()
    })

  })

  document.querySelectorAll('.product-edit-button')
  .forEach((button) => {

    button.addEventListener('click', async () => {

      const productId =
        Number(
          (button as HTMLElement).getAttribute('data-id')
        )

      const product =
        products?.find((p) => p.id === productId)

      if (!product) {
        return
      }

      const newName =
        prompt('상품명', product.product_name)

      if (!newName) {
        return
      }

      const newPrice =
        prompt('가격', String(product.price))

      if (!newPrice) {
        return
      }

      const { error } = await supabase
        .from('products')
        .update({
          product_name: newName,
          price: Number(newPrice)
        })
        .eq('id', productId)

      if (error) {
        alert('수정 실패 : ' + error.message)
        return
      }

      alert('수정되었습니다.')

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

        if (page === 'merchant-apply') {

          const { data: applyList, error } = await supabase
            .from('merchants')
            .select('*')
            .eq('status', '신청')
            .order('created_at', { ascending: false })
        
          if (error) {
            alert('가입신청 조회 실패 : ' + error.message)
            return
          }
        
          const subMenu = document.querySelector('.admin-sub-menu')
          const titleBox = document.querySelector('.admin-title')
          const summaryBox = document.querySelector('.admin-summary')
          const tableHead = document.querySelector('.admin-table thead')
          const paymentTableBody =
            document.querySelector<HTMLTableSectionElement>('#paymentTableBody')!
        
          if (subMenu) {
            subMenu.innerHTML = '가입신청 조회'
          }
        
          if (titleBox) {
            titleBox.innerHTML = '▶ 가맹점관리 > 가입신청 관리'
          }
        
          if (summaryBox) {
            summaryBox.innerHTML =
              '가입신청 : ' + (applyList || []).length + '건'
          }
        
          if (tableHead) {
            tableHead.innerHTML =
              '<tr>' +
              '<th>No</th>' +
              '<th>신청일</th>' +
              '<th>상호명</th>' +
              '<th>대표자</th>' +
              '<th>사업자번호</th>' +
              '<th>상태</th>' +
              '<th>처리</th>' +
              '</tr>'
          }
        
          paymentTableBody.innerHTML = ''
        
          ;(applyList || []).forEach((merchant, index) => {
        
            const tr = document.createElement('tr')
        
            tr.innerHTML =
              '<td>' + (index + 1) + '</td>' +
              '<td>' +
              new Date(merchant.created_at).toLocaleDateString('ko-KR') +
              '</td>' +
              '<td>' + (merchant.merchant_name || '-') + '</td>' +
              '<td>' + (merchant.ceo_name || '-') + '</td>' +
              '<td>' + (merchant.business_number || '-') + '</td>' +
              '<td>' + merchant.status + '</td>' +
              '<td>' +
              '<button class="merchant-approve" data-id="' +
              merchant.id +
              '">승인</button>' +
              '</td>'
        
            paymentTableBody.appendChild(tr)
        
          })
        }

        document.querySelectorAll('.merchant-approve')
  .forEach((button) => {
    button.addEventListener('click', async () => {
      const merchantId =
        (button as HTMLElement).getAttribute('data-id')

      if (!merchantId) {
        alert('가맹점 ID를 찾을 수 없습니다.')
        return
      }

      const loginId =
        'MER' + String(merchantId).padStart(4, '0')

      const tempPassword =
        '1234'

      const { error } = await supabase
        .from('merchants')
        .update({
          status: '승인',
          merchant_login_id: loginId,
          merchant_password: tempPassword
        })
        .eq('id', Number(merchantId))

      if (error) {
        alert('승인 실패: ' + error.message)
        return
      }

      alert(
        '승인 완료\n' +
        '가맹점 아이디: ' + loginId + '\n' +
        '임시 비밀번호: ' + tempPassword
      )

      location.reload()
    })
  })

if (page === 'payment') {
const subMenu = document.querySelector('.admin-sub-menu')
const titleBox = document.querySelector('.admin-title')
const searchBox = document.querySelector('.admin-search-box')
const summaryBox = document.querySelector('.admin-summary')
const tableHead = document.querySelector('.admin-table thead')
const paymentTableBody =
  document.querySelector<HTMLTableSectionElement>('#paymentTableBody')!
  const tableTop = document.querySelector('.admin-table-top')

if (tableTop) {
  tableTop.innerHTML =
    '<button>엑셀 다운로드</button>' +
    '<select id="admin-page-size">' +
      '<option value="10">10개씩 보기</option>' +
      '<option value="20">20개씩 보기</option>' +
      '<option value="50">50개씩 보기</option>' +
    '</select>'
}

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

    '<select id="payment-pg-filter">' +
      '<option value="all">전체 PG</option>' +
      '<option value="toss">토스</option>' +
      '<option value="korpay">코페이</option>' +
    '</select>' +

    '<select id="payment-date-type">' +
  '<option value="created_at">거래일자</option>' +
  '<option value="canceled_at">취소일자</option>' +
'</select>' +

    '<input id="payment-start-date" type="date" />' +
    '<span>~</span>' +
    '<input id="payment-end-date" type="date" />' +

    '<button class="quick-btn" id="payment-today-btn">오늘</button>' +
    '<button class="quick-btn" id="payment-yesterday-btn">어제</button>' +
    '<button class="quick-btn" id="payment-month-btn">당월</button>' +

    '<select id="payment-search-type">' +
  '<option value="all">전체검색</option>' +
  '<option value="name">가맹점명 / 대표자명</option>' +
  '<option value="manager">담당자</option>' +
  '<option value="agency">대리점</option>' +
  '<option value="branch">지사</option>' +
  '<option value="order_id">주문번호</option>' +
  '<option value="payment_key">결제키</option>' +
'</select>' +

    '<input id="payment-search-keyword" placeholder="검색어 입력" />' +

    '<button id="payment-search-btn" class="search-btn" type="button">🔍 검색</button>' +

'</div>'
}

document.querySelector('#payment-today-btn')
  ?.addEventListener('click', () => {
    const today = new Date()
    const todayText = today.toISOString().slice(0, 10)

    const startInput = document.querySelector<HTMLInputElement>('#payment-start-date')
    const endInput = document.querySelector<HTMLInputElement>('#payment-end-date')

    if (startInput) startInput.value = todayText
    if (endInput) endInput.value = todayText

    document.querySelector<HTMLButtonElement>('#payment-search-btn')?.click()
  })

document.querySelector('#payment-yesterday-btn')
  ?.addEventListener('click', () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    const yesterdayText = yesterday.toISOString().slice(0, 10)

    const startInput = document.querySelector<HTMLInputElement>('#payment-start-date')
    const endInput = document.querySelector<HTMLInputElement>('#payment-end-date')

    if (startInput) startInput.value = yesterdayText
    if (endInput) endInput.value = yesterdayText

    document.querySelector<HTMLButtonElement>('#payment-search-btn')?.click()
  })

document.querySelector('#payment-month-btn')
  ?.addEventListener('click', () => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const todayText = today.toISOString().slice(0, 10)

    const startInput = document.querySelector<HTMLInputElement>('#payment-start-date')
    const endInput = document.querySelector<HTMLInputElement>('#payment-end-date')

    if (startInput) startInput.value = yyyy + '-' + mm + '-01'
    if (endInput) endInput.value = todayText

    document.querySelector<HTMLButtonElement>('#payment-search-btn')?.click()
  })
  
  


  document.querySelector('#payment-search-btn')
  ?.addEventListener('click', () => {
    ;(window as any).paymentFilters = {
      pg: document.querySelector<HTMLSelectElement>('#payment-pg-filter')?.value || 'all',
      dateType: document.querySelector<HTMLSelectElement>('#payment-date-type')?.value || 'created_at',
      startDate: document.querySelector<HTMLInputElement>('#payment-start-date')?.value || '',
      endDate: document.querySelector<HTMLInputElement>('#payment-end-date')?.value || '',
      searchType: document.querySelector<HTMLSelectElement>('#payment-search-type')?.value || 'all',
      keyword: document.querySelector<HTMLInputElement>('#payment-search-keyword')?.value || ''
    }

    document
      .querySelector<HTMLElement>('.admin-tab[data-page="payment"]')
      ?.click()
  })

const savedPaymentFilters = (window as any).paymentFilters

if (savedPaymentFilters) {
  const pgSelect = document.querySelector<HTMLSelectElement>('#payment-pg-filter')
  const dateTypeSelect = document.querySelector<HTMLSelectElement>('#payment-date-type')
  const startInput = document.querySelector<HTMLInputElement>('#payment-start-date')
  const endInput = document.querySelector<HTMLInputElement>('#payment-end-date')
  const typeSelect = document.querySelector<HTMLSelectElement>('#payment-search-type')
  const keywordInput = document.querySelector<HTMLInputElement>('#payment-search-keyword')

  if (pgSelect) pgSelect.value = savedPaymentFilters.pg || 'all'
  if (dateTypeSelect) dateTypeSelect.value = savedPaymentFilters.dateType || 'created_at'
  if (startInput) startInput.value = savedPaymentFilters.startDate || ''
  if (endInput) endInput.value = savedPaymentFilters.endDate || ''
  if (typeSelect) typeSelect.value = savedPaymentFilters.searchType || 'all'
  if (keywordInput) keywordInput.value = savedPaymentFilters.keyword || ''
}

const result = await supabase
  .from('payments')
  .select('*')
  .order('created_at', { ascending: false })

if (result.error) {
  alert('결제내역 조회 실패: ' + result.error.message)
  return
}

let payments = result.data || []

const paymentFilters = (window as any).paymentFilters

if (paymentFilters) {
  const filters = paymentFilters

  const pg = filters.pg || 'all'
  const dateType = filters.dateType || 'created_at'
  const startDate = filters.startDate || ''
  const endDate = filters.endDate || ''
  const searchType = filters.searchType || 'all'
  const keyword = String(filters.keyword || '').trim().toLowerCase()

  if (pg !== 'all') {
    payments = payments.filter((payment) => {
      const pgText = String(payment.pg_company || '').toLowerCase()

      if (pg === 'toss') return pgText.includes('토스') || pgText.includes('toss')
      if (pg === 'korpay') return pgText.includes('코페이') || pgText.includes('korpay')

      return true
    })
  }

  if (startDate) {
    payments = payments.filter((payment) => {
      const targetDate = String(payment[dateType] || '').slice(0, 10)
      return targetDate >= startDate
    })
  }
  
  if (endDate) {
    payments = payments.filter((payment) => {
      const targetDate = String(payment[dateType] || '').slice(0, 10)
      return targetDate <= endDate
    })
  }

  if (keyword) {
    payments = payments.filter((payment) => {
      const targetMap: Record<string, string> = {
        name: String(payment.merchant_name || '').toLowerCase(),
        manager: String(payment.merchant_name || '').toLowerCase(),
        agency: String(payment.merchant_name || '').toLowerCase(),
        branch: String(payment.merchant_name || '').toLowerCase(),
        order_id: String(payment.order_id || '').toLowerCase(),
        payment_key: String(payment.payment_key || '').toLowerCase()
      }

      if (searchType === 'all') {
        return Object.values(targetMap).some((value) => value.includes(keyword))
      }

      return targetMap[searchType]?.includes(keyword) || false
    })
  }
}
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
      '<th>거래수수료<br/>가맹점금액</th>' +
    '</tr>'
}

paymentTableBody.innerHTML = ''

const paymentPageSizeSelect =
  document.querySelector('#admin-page-size') as HTMLSelectElement | null

const savedPaymentPageSize =
  sessionStorage.getItem('payment_page_size') || '10'

if (paymentPageSizeSelect) {
  paymentPageSizeSelect.value = savedPaymentPageSize

  paymentPageSizeSelect.onchange = () => {
    sessionStorage.setItem('payment_page_size', paymentPageSizeSelect.value)

    document
      .querySelector<HTMLElement>('.admin-tab[data-page="payment"]')
      ?.click()
  }
}

const adminPageSize = Number(savedPaymentPageSize) || 10
const visiblePayments = payments.slice(0, adminPageSize)

visiblePayments.forEach((payment, index) => {
  const tr = document.createElement('tr')

  tr.innerHTML =
    '<td>' + (index + 1) + '</td>' +
    '<td>' +
  formatDate(payment.created_at) + '<br/>' +
  '<button type="button" ' +
    'class="admin-receipt-btn admin-receipt-link" ' +
    'data-order="' + (payment.order_id || '') + '" ' +
    'data-order-number="' + (payment.order_number || '') + '" ' +
    'data-amount="' + (payment.amount || 0) + '" ' +
    'data-sender="' + (payment.sender_name || '') + '" ' +
    'data-merchant="' + (payment.merchant_name || '') + '" ' +
    'data-pg="' + (payment.pg_company || '토스페이먼츠') + '" ' +
    'data-merchant-id="' + (payment.merchant_id || '') + '" ' +
    'data-date="' + (payment.created_at || '') + '" ' +
    'data-status="' + (payment.status || '') + '"' +
  '>' +
    (payment.order_id || '-') +
  '</button>' +
'</td>' +
    '<td>' +
  '<button type="button" class="payment-cancel-link" data-id="' + payment.id + '">' +
    (payment.status === 'cancel' ? '취소완료' : '-') +
    '<br/>' +
    '<span title="' + (payment.payment_key || '-') + '">' +
      ((payment.payment_key || '-').length > 18
        ? (payment.payment_key || '-').substring(0, 18) + '...'
        : (payment.payment_key || '-')) +
    '</span>' +
  '</button>' +
'</td>' +
    '<td>' + (payment.merchant_name || '-') + '<br/>가맹점ID ' + (payment.merchant_id || '-') + '</td>' +
    '<td>-<br/>' + (payment.sender_name || '-') + '</td>' +
    '<td>' + (payment.message || '-') + '</td>' +
    '<td>-<br/>일시불</td>' +
    '<td>' + getStatusText(payment.status) + '<br/>' + Number(payment.amount || 0).toLocaleString() + '원</td>' +
    '<td>' + (payment.pg_company || '온라인') + '<br/>' + Number(payment.amount || 0).toLocaleString() + '원</td>' +
    '<td>0원<br/>' + Number(payment.amount || 0).toLocaleString() + '원</td>' 

if (payment.status === 'cancel') {
  tr.classList.add('payment-cancel-row')
}

paymentTableBody.appendChild(tr)
})

document.querySelectorAll('.payment-cancel-link')
  .forEach((button) => {
    button.addEventListener('click', async (event) => {
      event.preventDefault()
      event.stopPropagation()

      const paymentId = Number((button as HTMLElement).dataset.id)

      if (!window.confirm('이 결제를 실제 취소 처리할까요?')) {
        return
      }

      const { data: payment, error: paymentError } = await supabase
        .from('payments')
        .select('*')
        .eq('id', paymentId)
        .single()

      if (paymentError || !payment) {
        alert('결제정보를 불러오지 못했습니다.')
        return
      }

      if (payment.status === 'cancel') {
        alert('이미 취소된 결제입니다.')
        return
      }


      const { error } = await supabase
  .from('payments')
  .update({
    status: 'cancel',
    canceled_at: new Date().toISOString()
  })
  .eq('id', paymentId)

      if (error) {
        alert('DB 취소 저장 실패: ' + error.message)
        return
      }

      alert('취소 처리되었습니다.')

      const cancelButton = button as HTMLElement
      const paymentKeyText = cancelButton.querySelector('span')?.outerHTML || ''
      cancelButton.innerHTML = '취소완료<br/>' + paymentKeyText
    })
  })
document.querySelectorAll('.admin-receipt-btn')
  .forEach((button) => {
    button.addEventListener('click', async () => {
      const target = button as HTMLElement

      const orderId = target.dataset.order || '-'
      const orderNumber = target.dataset.orderNumber || '-'
      const amount = Number(target.dataset.amount || 0)
      const sender = target.dataset.sender || '-'
      const merchant = target.dataset.merchant || '-'
      const status = target.dataset.status || ''
      const isCanceled = status === 'cancel'

      console.log('status =', status)



const pgCompany =
  target.dataset.pg || '토스페이먼츠'



const date = target.dataset.date
        ? new Date(target.dataset.date).toLocaleString('ko-KR')
        : '-'

        const receiptHtml = `
        <div id="admin-receipt-modal" class="receipt-modal">
          <div class="receipt-box receipt-approve">
      
            <div class="receipt-header ${isCanceled ? 'receipt-cancel-mode' : 'receipt-approve-mode'}">
              <h2>NXG PICK</h2>
              <h3 class="${isCanceled ? 'receipt-cancel-title' : 'receipt-approve-title'}">
  신용카드 매출전표
  <span>${isCanceled ? '(취소)' : '(승인)'}</span>
</h3>
            </div>
      
            <section>
              <h4>결제정보</h4>
              <table>
                <tr>
                  <th>카드번호</th>
                  <td>결제사 제공값</td>
                  <th>카드종류</th>
                  <td>신용카드</td>
                </tr>
                <tr>
                  <th>거래종류</th>
                  <td class="${isCanceled ? 'receipt-cancel-text' : 'receipt-approve-text'}">
  ${isCanceled ? '취소완료' : '승인성공'}
</td>
                  <th>할부개월</th>
                  <td>일시불</td>
                </tr>
                <tr>
                  <th>거래일시</th>
                  <td colspan="3">${date}</td>
                </tr>
              </table>
            </section>
      
            <div class="receipt-grid">
              <section>
                <h4>구매정보</h4>
                <table>
                  <tr><th>주문자명</th><td>${sender}</td></tr>
                  <tr><th>승인번호</th><td>${orderId}</td></tr>
                  <tr><th>주문번호</th><td>${orderNumber}</td></tr>
                  <tr><th>상품명 / 구매자</th><td>${merchant}</td></tr>
                </table>
              </section>
      
              <section>
                <h4>결제금액정보</h4>
                <table>
                  <tr><th>과세금액</th><td>${Math.floor(amount / 1.1).toLocaleString()}원</td></tr>
                  <tr><th>비과세금액</th><td>0원</td></tr>
                  <tr><th>부가세</th><td>${(amount - Math.floor(amount / 1.1)).toLocaleString()}원</td></tr>
                  <tr><th>주문금액</th><td>${amount.toLocaleString()}원</td></tr>
                  <tr><th>할인금액</th><td>0원</td></tr>
                  <tr class="${isCanceled ? 'receipt-total receipt-total-cancel' : 'receipt-total'}">
  <th>총 결제금액</th>
  <td>${isCanceled ? '-' : ''}${amount.toLocaleString()}원</td>
</tr>
                </table>
              </section>
            </div>
      
            <section>
              <h4>상점정보</h4>
              <table>
                <tr><th>상점명</th><td>${merchant}</td><th>대표자명</th><td>-</td></tr>
                <tr><th>URL주소</th><td>-</td><th>사업자번호</th><td>-</td></tr>
                <tr><th>이용문의</th><td colspan="3">-</td></tr>
                <tr><th>주소</th><td colspan="3">-</td></tr>
              </table>
            </section>
      
            <section>
              <h4>결제서비스업체(PG)정보</h4>
              <table>
                <tr><th>카드사 가맹점명</th><td>${pgCompany}</td><th>사업자번호</th><td>-</td></tr>
                <tr><th>대표자명</th><td>-</td><th>가맹점번호</th><td>-</td></tr>
                <tr><th>주소</th><td colspan="3">-</td></tr>
              </table>
            </section>
      
            <div class="receipt-notice">
              * 신용카드 청구서에는 실제 결제 PG사명으로 표시됩니다.<br>
              * 본 매출전표는 부가가치세법 기준에 따라 발행되었습니다.
            </div>
      
            <div class="receipt-actions">
              <button>이메일 발송</button>
              <button onclick="window.print()">인쇄하기</button>
              <button id="admin-receipt-close-btn">닫기</button>
            </div>
      
          </div>
        </div>
      ` 
      
      document.querySelector('#admin-receipt-modal')?.remove()
      document.body.insertAdjacentHTML('beforeend', receiptHtml)
      
      document.querySelector<HTMLElement>('#admin-receipt-modal')!.style.display = 'flex'
      
      document.querySelector('#admin-receipt-close-btn')
  ?.addEventListener('click', () => {
    document.querySelector('#admin-receipt-modal')?.remove()
  })
})

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
      <div class="nxg-login-page">
        <div class="nxg-login-left">
          <div class="nxg-logo">NXG SOFT</div>
    
          <h1>
            주문부터 운영까지,<br/>
            가맹점 통합 관리
          </h1>
    
          <p>
            주문과 상품, QR을 한 곳에서 관리하는<br/>
            NXG PICK 가맹점 시스템입니다.
          </p>
    
          <div class="nxg-login-features">
            <div>주문관리</div>
            <div>상품관리</div>
            <div>PICK QR</div>
            <div>실시간 주문</div>
          </div>
        </div>
    
        <div class="nxg-login-card">
    
          <div class="nxg-admin-badge">
            NXG PICK ADMIN
          </div>
    
          <h2>가맹점 로그인</h2>
    
          <input
            id="merchant-login-id"
            placeholder="아이디"
          />
    
          <input
            id="merchant-login-password"
            type="password"
            placeholder="비밀번호"
          />
    
          <button id="merchant-login-button">
            로그인
          </button>
    
          <button
  id="merchant-signup-button"
  class="merchant-join-button"
          >
            신규 가입
          </button>
    
          <div class="nxg-login-footer">
            NXG PICK Merchant System
          </div>
    
        </div>
      </div>
      `
    

      document.querySelector<HTMLButtonElement>('#merchant-login-button')
  ?.addEventListener('click', async () => {
    const loginId =
      document.querySelector<HTMLInputElement>('#merchant-login-id')?.value.trim() || ''

    const password =
      document.querySelector<HTMLInputElement>('#merchant-login-password')?.value.trim() || ''

    if (!loginId || !password) {
      alert('아이디와 비밀번호를 입력해주세요.')
      return
    }

    const { data: merchants, error } = await supabase
      .from('merchants')
      .select('*')
      .eq('merchant_login_id', loginId)

    if (error) {
      alert('로그인 조회 실패: ' + error.message)
      return
    }

    const merchant = (merchants || []).find((item) => {
      return String(item.merchant_password || '').trim() === password
    })

    if (!merchant) {
      alert(
        '로그인 실패 확인\n\n' +
        '입력 아이디: ' + loginId + '\n' +
        '입력 비밀번호: ' + password + '\n' +
        '조회된 가맹점 수: ' + (merchants || []).length + '\n' +
        'DB 비밀번호: ' + ((merchants || [])[0]?.merchant_password || '없음')
      )
      return
    }

    sessionStorage.setItem('login_merchant_id', String(merchant.id))
    sessionStorage.setItem('login_merchant_code', merchant.merchant_login_id || '')
    sessionStorage.setItem('login_merchant_name', merchant.merchant_name || '')
    sessionStorage.setItem('login_merchant_type', merchant.merchant_type || '일반매장')

    alert((merchant.merchant_name || '가맹점') + '님 로그인되었습니다.')
    window.location.href = '/merchant-admin'
  })

        document.querySelector('#merchant-signup-button')
  ?.addEventListener('click', () => {
    location.href = '/merchant-apply'
  })

} else if (path === '/member-pay') {

  const params = new URLSearchParams(window.location.search)
  const merchantId = Number(params.get('merchant_id'))

  app.innerHTML = `
    <div class="member-pay-page">
      <div class="member-pay-card">
        <h1>수강료 결제</h1>
        <p>이름과 생년월일을 입력해주세요.</p>

        <label>이름</label>
        <input id="member-pay-name" placeholder="홍길동" />

        <label>생년월일</label>
        <input id="member-pay-birth" type="date" />

        <button id="member-search-btn">
          미납내역 조회
        </button>

        <div id="member-search-result"></div>
      </div>
    </div>
  `
  document.querySelector('#member-search-btn')
  ?.addEventListener('click', async () => {
    const memberName =
      (document.querySelector<HTMLInputElement>('#member-pay-name')?.value || '').trim()

    const birth =
      (document.querySelector<HTMLInputElement>('#member-pay-birth')?.value || '').trim()

    if (!merchantId) {
      alert('가맹점 정보가 없습니다.')
      return
    }

    if (!memberName || !birth) {
      alert('이름과 생년월일을 입력해주세요.')
      return
    }

    const { data: member, error: memberError } = await supabase
      .from('members')
      .select('*')
      .eq('merchant_id', merchantId)
      .eq('member_name', memberName)
      .eq('birth_date', birth)
      .single()

    if (memberError || !member) {
      alert('회원을 찾을 수 없습니다.')
      return
    }

    const { data: billings, error: billingError } = await supabase
      .from('billings')
      .select('*')
      .eq('merchant_id', merchantId)
      .eq('member_id', member.id)
      .eq('payment_status', '미납')
      .order('id', { ascending: false })

    if (billingError) {
      alert('미납내역 조회 실패: ' + billingError.message)
      return
    }

    const result =
      document.querySelector<HTMLElement>('#member-search-result')

    if (!result) {
      return
    }

    if (!billings || billings.length === 0) {
      result.innerHTML = `
        <p>미납내역이 없습니다.</p>
      `
      return
    }

    result.innerHTML =
      '<h2>' + member.member_name + '님 미납내역</h2>' +
      billings.map((billing) => `
        <div class="member-billing-card">
          <label>
            <input
              type="checkbox"
              class="member-billing-check"
              data-id="${billing.id}"
              data-amount="${billing.amount}"
            />

            <strong>${billing.billing_month || ''}</strong>
            -
            ${Number(billing.amount || 0).toLocaleString()}원
          </label>
        </div>
      `).join('') +
      `
        <div class="member-pay-total">
          총 결제금액:
          <strong id="member-pay-total-amount">0원</strong>
        </div>

        <button id="member-pay-button">
          결제하기
        </button>
      `

    document
      .querySelectorAll<HTMLInputElement>('.member-billing-check')
      .forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
          const checkedItems = Array.from(
            document.querySelectorAll<HTMLInputElement>('.member-billing-check:checked')
          )

          const total = checkedItems.reduce((sum, item) => {
            return sum + Number(item.dataset.amount || 0)
          }, 0)

          const totalBox =
            document.querySelector<HTMLElement>('#member-pay-total-amount')

          if (totalBox) {
            totalBox.textContent = total.toLocaleString() + '원'
          }
        })
      })

    document.querySelector('#member-pay-button')
  ?.addEventListener('click', () => {
    const checkedItems = Array.from(
      document.querySelectorAll<HTMLInputElement>('.member-billing-check:checked')
    )

    if (checkedItems.length === 0) {
      alert('결제할 항목을 선택해주세요.')
      return
    }

    const total = checkedItems.reduce((sum, item) => {
      return sum + Number(item.dataset.amount || 0)
    }, 0)

    alert(
      '결제방식 선택\n\n' +
      '선택건수: ' + checkedItems.length + '건\n' +
      '총 결제금액: ' + total.toLocaleString() + '원\n\n' +
      '다음 단계에서 카드결제 / 간편결제 선택창을 연결합니다.'
    )
  })
  })
 
      } else if (path === '/merchant-admin') {

      const merchantId =
        Number(sessionStorage.getItem('login_merchant_id'))

      const merchantName =
        sessionStorage.getItem('login_merchant_name') || ''

        if (!merchantId) {
          alert('로그인이 필요합니다.')
          location.href = '/merchant-login'
        }

        const params = new URLSearchParams(location.search)
const startDate = params.get('start')
const endDate = params.get('end')

let orderQuery = supabase
  .from('orders')
  .select('*')
  .eq('merchant_id', merchantId)

if (startDate && endDate) {
  orderQuery = orderQuery
    .gte('created_at', startDate + 'T00:00:00')
    .lte('created_at', endDate + 'T23:59:59')
}

const { data: orders, error } = await orderQuery
  .order('created_at', { ascending: false })
 
  const receivedOrders =
  (orders || []).filter((order) => order.order_status !== '완료')

const completedOrders =
  (orders || []).filter((order) => order.order_status === '완료')

const totalSales =
  (orders || []).reduce((sum, order) => {
    return sum + Number(order.total_amount || 0)
  }, 0)

const averageAmount =
  (orders || []).length > 0
    ? Math.floor(totalSales / (orders || []).length)
    : 0

    const merchantType =
  sessionStorage.getItem('login_merchant_type') || '일반매장'

const merchantMenu =
  merchantType === '일반매장'
    ? `

      <button id="merchant-order-tab">주문관리</button>
      <button id="merchant-product-tab">상품관리</button>
      <button id="merchant-qr-tab">PICK QR</button>
      <button id="merchant-card-tab">카드결제</button>
    `
    : `
      <button id="merchant-member-tab">회원관리</button>
      <button id="merchant-billing-tab">청구관리</button>
      <button id="merchant-batch-tab">수기결제</button>
      <button id="merchant-payment-list-tab">결제내역</button>
    `
    
    const isNormalStore =
  merchantType === '일반매장'

const merchantContent =
  isNormalStore
    ? ''
    : `
      <div class="merchant-type-ready-box">
       <div class="academy-dashboard">

  <div class="academy-card">
    <span>회원 수</span>
    <strong>3명</strong>
  </div>

  <div class="academy-card">
    <span>미납 건수</span>
    <strong>3건</strong>
  </div>

  <div class="academy-card">
    <span>완료 건수</span>
    <strong>1건</strong>
  </div>

  <div class="academy-card">
    <span>이번달 청구금액</span>
    <strong>350,000원</strong>
  </div>

</div> 
      </div>
    `

  let lastCheckedOrderId =
  Number(sessionStorage.getItem('last_checked_order_id_' + merchantId) || 0)

const newestOrderId =
  (orders || [])[0]?.id || 0

if (!lastCheckedOrderId && newestOrderId) {
  sessionStorage.setItem(
    'last_checked_order_id_' + merchantId,
    String(newestOrderId)
  )
  lastCheckedOrderId = newestOrderId
}

setInterval(async () => {
  const { data: latestOrders } = await supabase
    .from('orders')
    .select('id')
    .eq('merchant_id', merchantId)
    .order('id', { ascending: false })
    .limit(1)

  const latestOrderId = latestOrders?.[0]?.id || 0

  if (latestOrderId > lastCheckedOrderId) {
    sessionStorage.setItem(
      'last_checked_order_id_' + merchantId,
      String(latestOrderId)
    )

    const audioContext = new AudioContext()
const oscillator = audioContext.createOscillator()
const gainNode = audioContext.createGain()

oscillator.connect(gainNode)
gainNode.connect(audioContext.destination)

oscillator.frequency.value = 880
gainNode.gain.value = 0.3

oscillator.start()

setTimeout(() => {
  oscillator.stop()
  audioContext.close()
}, 300)

    setTimeout(() => {
      const message =
        new SpeechSynthesisUtterance('새 주문이 접수되었습니다.')

      message.lang = 'ko-KR'
      message.rate = 0.95

      window.speechSynthesis.speak(message)
    }, 1000)

    setTimeout(() => {
      location.reload()
    }, 5000)
  }
}, 5000)

if (error) {
  alert('주문내역 조회 실패: ' + error.message)
}

const channel = supabase
  .channel('merchant-orders-' + merchantId)
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'orders',
      filter: 'merchant_id=eq.' + merchantId
    },
    () => {
      const audio = new Audio(
        'https://actions.google.com/sounds/v1/alarms/dingdong.ogg'
      )

      audio.play()

      const message = new SpeechSynthesisUtterance(
        '새 주문이 접수되었습니다.'
      )

      message.lang = 'ko-KR'

      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(message)

      setTimeout(() => {
        location.reload()
      }, 1000)
    }
  )
  .subscribe()


      
      app.innerHTML = `
        <div class="pg-admin-page">
          <div class="merchant-pick-header">
         <h1>NXG PICK 주문관리</h1>

  <div class="merchant-user-box">
  <strong>${merchantName}님</strong>

   <button id="merchant-logout">
    로그아웃
  </button>

  <button id="merchant-setting-button"
          class="merchant-setting-button">
    ⚙️
  </button>
</div>
  </div>
</div>
</div>

<div class="merchant-toolbar">
  ${merchantMenu}

  ${isNormalStore ? `
    <span class="toolbar-divider"></span>
    <button class="order-filter-btn" data-status="전체">전체</button>
    <button class="order-filter-btn" data-status="준비중">준비중</button>
    <button class="order-filter-btn" data-status="완료">완료</button>
  ` : ''}

</div>

${merchantContent}

<div class="merchant-sales-filter ${isNormalStore ? '' : 'hide-for-type'}">
  <button id="sales-today">오늘</button>
  <button id="sales-month">이번달</button>
  <button id="sales-year">올해</button>

  <span class="date-wrap">
  <input id="sales-start-date" type="date" />
</span>
<span class="date-wave">~</span>
<span class="date-wrap">
  <input id="sales-end-date" type="date" />
</span>

  <button id="sales-search">검색</button>
  <button id="excel-download">엑셀 다운로드</button>
</div>


  <div class="merchant-sales-summary ${isNormalStore ? '' : 'hide-for-type'}">
  <div>
    <strong>주문수</strong>
    <span>${(orders || []).length}건</span>
  </div>

  <div>
    <strong>접수</strong>
    <span>${receivedOrders.length}건</span>
  </div>

  <div>
    <strong>완료</strong>
    <span>${completedOrders.length}건</span>
  </div>

  <div>
    <strong>매출합계</strong>
    <span>${totalSales.toLocaleString()}원</span>
  </div>

  <div>
    <strong>평균객단가</strong>
    <span>${averageAmount.toLocaleString()}원</span>
  </div>
</div>

  <div class="order-bottom-toolbar ${isNormalStore ? '' : 'hide-for-type'}">

   <select id="merchant-page-size">
    <option value="10">10개씩 보기</option>
    <option value="20">20개씩 보기</option>
    <option value="30">30개씩 보기</option>
    <option value="50">50개씩 보기</option>
    <option value="100">100개씩 보기</option>
  </select>

  <div class="order-pagination">
    <button id="order-prev-page">이전</button>

    <span id="order-page-info">
      1 / 2
    </span>

    <button id="order-next-page">
      다음
    </button>
  </div>

</div>
   
          <div class="admin-table-wrap ${isNormalStore ? '' : 'hide-for-type'}">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>주문번호</th>
                  <th>결제일시</th>
                  <th>주문내용</th>
                  <th>결제금액</th>
                  <th>주문상태</th>
                  <th>고객호출</th>
                </tr>
                            </thead>
              <tbody id="merchantOrderBody"></tbody>
            </table>

            <div id="merchantOrderCardList" class="merchant-order-card-list"></div>
          </div>
        </div>

                <div id="merchant-setting-modal"
             class="merchant-setting-modal">

          <div class="merchant-setting-box">
            <h3>⚙️ 매장 설정</h3>

            <label>호출 기본 문구</label>

            <input
              id="merchant-call-message"
              class="merchant-call-message"
              placeholder="예) 주문이 준비되었습니다."
            />

            <label style="margin-top:20px;display:block;">
              주문 접수 멘트
            </label>

            <input
              id="merchant-order-message"
              class="merchant-call-message"
              placeholder="예) 새로운 주문이 접수되었습니다."
            />

            <div class="setting-button-row">
              <button id="preview-call-message">호출 미리듣기</button>
              <button id="preview-order-message">주문 미리듣기</button>
              <button id="save-call-message">저장</button>
            </div>
          </div>
        </div>

        <div id="cancel-modal" class="cancel-modal">
          <div class="cancel-box">
            <h3>결제 취소</h3>

            <p id="cancel-order-info">결제를 취소하시겠습니까?</p>

            <input
              id="cancel-password"
              type="password"
              placeholder="취소 비밀번호 입력"
            />

            <textarea
              id="cancel-reason"
              placeholder="취소 사유 입력"
            ></textarea>

            <div class="cancel-button-row">
              <button id="direct-cancel-button">직접 취소</button>
              <button id="request-cancel-button">본사 승인요청</button>
              <button id="close-cancel-modal">닫기</button>
            </div>
          </div>
        </div>
      
      `

      const { data: merchantSetting } = await supabase
  .from('merchants')
  .select(`
    call_message,
    order_message,
    merchant_name,
    owner_name,
    corporate_number,
    business_number,
    phone,
    address,
    address_detail
  `)
  .eq('id', merchantId)
  .single()

if (merchantSetting) {
  const callInput =
    document.querySelector('#merchant-call-message') as HTMLInputElement | null

  const orderInput =
    document.querySelector('#merchant-order-message') as HTMLInputElement | null

  if (callInput) {
    callInput.value = merchantSetting.call_message || ''
  }

  if (orderInput) {
    orderInput.value = merchantSetting.order_message || ''
  }
}

function numberToKorean(num: number) {
  const ones = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구']

  if (num === 0) {
    return '영'
  }

  const hundreds = Math.floor(num / 100)
  const tens = Math.floor((num % 100) / 10)
  const units = num % 10

  let result = ''

  if (hundreds > 0) {
    result += hundreds === 1
      ? '백'
      : ones[hundreds] + '백'
  }

  if (tens > 0) {
    result += tens === 1
      ? '십'
      : ones[tens] + '십'
  }

  if (units > 0) {
    result += ones[units]
  }

  return result
}

      const merchantOrderBody =
  document.querySelector<HTMLTableSectionElement>('#merchantOrderBody')!

merchantOrderBody.innerHTML = ''
const merchantOrderCardList =
  document.querySelector<HTMLDivElement>('#merchantOrderCardList')

if (merchantOrderCardList) {
  merchantOrderCardList.innerHTML = ''
}

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
    '<td>' +
  '<button ' +
    'class="merchant-receipt-link" ' +
    'data-id="' + order.id + '" ' +
    'data-order="' + orderNumber + '" ' +
    'data-amount="' + (order.total_amount || 0) + '" ' +
    'data-date="' + (order.created_at || '') + '" ' +
  '>' +
    orderNumber + '번' +
  '</button>' +
'</td>' +
    '<td>' +
  '<div>' + new Date(order.created_at).toLocaleString('ko-KR') + '</div>' +
 '<div class="approval-number cancel-approval-link" ' +
  'data-id="' + order.id + '" ' +
  'data-created-at="' + order.created_at + '" ' +
  'data-amount="' + order.total_amount + '">' +
  '승인번호 ' + (order.payment_key || '-') +
'</div>' + 
(
  order.cancel_status === '취소완료'
    ? '<div class="cancel-info">' +
        '취소시각: ' +
        (order.cancel_requested_at
          ? new Date(order.cancel_requested_at).toLocaleString('ko-KR')
          : '-') +
        '<br />취소사유: ' +
        (order.cancel_reason || '-') +
      '</div>'
    : ''
) +
'</td>' +
    '<td>' + orderItems + '</td>' +
    '<td>' + Number(order.total_amount || 0).toLocaleString() + '원</td>' +
    '<td>' +
  (
    order.order_status === '취소완료'
  ? '<span class="order-status-cancel">취소완료</span>'
  : order.order_status === '완료'
    ? '<span class="order-status-complete">완료</span>'
    : '<span class="order-status-received">접수</span>'
  ) +
'</td>' +
    
    '<td>' +
      '<button class="customer-call-button" data-id="' + order.id + '" data-number="' + orderNumber + '">' +
  '고객호출' +
'</button>'
    '</td>'

    tr.setAttribute('data-status', order.order_status || '접수')

    merchantOrderBody.appendChild(tr)

  const cardList =
    document.querySelector<HTMLDivElement>('#merchantOrderCardList')

  if (cardList) {
    const card = document.createElement('div')
    card.className = 'merchant-order-card'

    card.innerHTML =
      '<div class="merchant-order-card-top">' +
        '<button ' +
  'class="merchant-receipt-link merchant-card-receipt-link" ' +
  'data-order="' + orderNumber + '" ' +
  'data-amount="' + (order.total_amount || 0) + '" ' +
  'data-date="' + (order.created_at || '') + '" ' +
  'data-items="' + orderItems + '"' +
'>' +
  orderNumber + '번' +
'</button>' +
        '<span>' +
          Number(order.total_amount || 0).toLocaleString() +
          '원' +
        '</span>' +
      '</div>' +

      '<div class="merchant-order-card-date">' +
  new Date(order.created_at).toLocaleString('ko-KR') +
'</div>' +

'<div class="approval-number cancel-approval-link" ' +
  'data-id="' + order.id + '" ' +
  'data-created-at="' + order.created_at + '" ' +
  'data-amount="' + order.total_amount + '">' +
  '승인번호 : ' + (order.payment_key || '-') +
'</div>' +
      

    '<div class="merchant-order-card-items">' +
      orderItems +
    '</div>' +

    '<div class="merchant-order-card-status">' +
  (
    order.order_status === '취소완료'
  ? '<span class="order-status-cancel">취소완료</span>'
  : order.order_status === '완료'
    ? '<span class="order-status-complete">완료</span>'
    : '<span class="order-status-received">접수</span>'
  ) +
'</div>' +

      '<button class="customer-call-button merchant-card-call-button" ' +
        'data-id="' + order.id + '" ' +
        'data-number="' + orderNumber + '">' +
        '고객호출' +
      '</button>'

      card.setAttribute('data-status', order.order_status || '접수')

    cardList.appendChild(card)

    const cardCallButton =
    card.querySelector<HTMLButtonElement>('.customer-call-button')
  
    const receiptButtons =
  document.querySelectorAll('.merchant-receipt-link')

receiptButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button as HTMLElement

    const orderNo =
      target.getAttribute('data-order') || '-'

    const amount =
      Number(target.getAttribute('data-amount') || 0)

    const date =
      target.getAttribute('data-date')
        ? new Date(target.getAttribute('data-date')!).toLocaleString('ko-KR')
        : '-'

    const items =
      target.getAttribute('data-items') || '-'

      const paymentKey =
      target.getAttribute('data-payment-key') || '-'

    const customerName =
      target.getAttribute('data-customer') || '현장고객'

      const receiptHtml = `
      <div id="admin-receipt-modal" class="receipt-modal">
        <div class="receipt-box receipt-approve">
    
          <div class="receipt-header">
            <h2>NXG PICK</h2>
            <h3>신용카드 매출전표 <span>(승인)</span></h3>
          </div>
    
          <section>
            <h4>결제정보</h4>
            <table>
              <tr>
                <th>카드번호</th>
                <td>결제사 제공값</td>
                <th>카드종류</th>
                <td>신용카드</td>
              </tr>
              <tr>
                <th>거래종류</th>
                <td>승인성공</td>
                <th>할부개월</th>
                <td>일시불</td>
              </tr>
              <tr>
                <th>거래일시</th>
                <td colspan="3">${date}</td>
              </tr>
            </table>
          </section>
    
          <div class="receipt-grid">
            <section>
              <h4>구매정보</h4>
              <table>
                <tr><th>주문자명</th><td>${customerName}</td></tr>
<tr><th>승인번호</th><td>${paymentKey}</td></tr>
<tr><th>주문번호</th><td>${orderNo}</td></tr>
<tr><th>상품명 / 구매자</th><td>${items}</td></tr>
              </table>
            </section>
    
            <section>
              <h4>결제금액정보</h4>
              <table>
                <tr><th>과세금액</th><td>${Math.floor(amount / 1.1).toLocaleString()}원</td></tr>
                <tr><th>비과세금액</th><td>0원</td></tr>
                <tr><th>부가세</th><td>${(amount - Math.floor(amount / 1.1)).toLocaleString()}원</td></tr>
                <tr><th>주문금액</th><td>${amount.toLocaleString()}원</td></tr>
                <tr><th>할인금액</th><td>0원</td></tr>
                <tr class="receipt-total">
                  <th>총 결제금액</th>
                  <td>${amount.toLocaleString()}원</td>
                </tr>
              </table>
            </section>
          </div>
    
          <section>
            <h4>상점정보</h4>
            <table>
              <tr>
  <th>상점명</th>
  <td>${merchantSetting?.merchant_name || '-'}</td>
  <th>대표자명</th>
  <td>${merchantSetting?.owner_name || '-'}</td>
</tr>

<tr>
  <th>URL주소</th>
  <td>-</td>
  <th>사업자번호</th>
  <td>${merchantSetting?.business_number || merchantSetting?.corporate_number || '-'}</td>
</tr>

<tr>
  <th>이용문의</th>
  <td colspan="3">${merchantSetting?.phone || '-'}</td>
</tr>

<tr>
  <th>주소</th>
  <td colspan="3">
    ${(merchantSetting?.address || '') + ' ' + (merchantSetting?.address_detail || '')}
  </td>
</tr>
            </table>
          </section>
    
          <section>
            <h4>결제서비스업체(PG)정보</h4>
            <table>
              <tr><th>카드사 가맹점명</th><td>토스페이먼츠</td><th>사업자번호</th><td>-</td></tr>
              <tr><th>대표자명</th><td>-</td><th>가맹점번호</th><td>-</td></tr>
              <tr><th>주소</th><td colspan="3">-</td></tr>
            </table>
          </section>
    
          <div class="receipt-actions">
            <button onclick="window.print()">인쇄하기</button>
            <button id="admin-receipt-close-btn">닫기</button>
          </div>
    
        </div>
      </div>
    `
    
    document.querySelector('#admin-receipt-modal')?.remove()
    document.body.insertAdjacentHTML('beforeend', receiptHtml)
    
    document.querySelector<HTMLElement>('#admin-receipt-modal')!.style.display = 'flex'
    
    document.querySelector('#admin-receipt-close-btn')
      ?.addEventListener('click', () => {
        document.querySelector('#admin-receipt-modal')?.remove()
      })
  })
})

  cardCallButton?.addEventListener('click', async () => {
    const savedCallMessage =
      (
        document.querySelector(
          '#merchant-call-message'
        ) as HTMLInputElement
      )?.value || '주문이 준비되었습니다.'
  
      const callMessage =
      Number(orderNumber) +
      '번 고객님 ' +
      savedCallMessage
    
    window.speechSynthesis.cancel()
    
    speechSynthesis.speak(
      new SpeechSynthesisUtterance(callMessage)
    )
  
    cardCallButton.textContent = '호출완료'
    cardCallButton.style.background = '#6b7280'
    const statusBox =
  card.querySelector('.merchant-order-card-status')

if (statusBox) {
  statusBox.innerHTML =
    '<span class="order-status-complete">완료</span>'
}
  
    const { error } = await supabase
      .from('orders')
      .update({
        order_status: '완료'
      })
      .eq('id', Number(order.id))
  
    if (error) {
      alert('주문상태 변경 실패: ' + error.message)
    }
  }) 
  }

})
document.querySelectorAll('.admin-table .customer-call-button')
  .forEach((button) => {
    button.addEventListener('click', async () => {
      const number =
        (button as HTMLElement).getAttribute('data-number') || '0'

      const orderId =
        (button as HTMLElement).getAttribute('data-id')

      const callInput =
        document.querySelector('#merchant-call-message') as HTMLInputElement | null

      const savedCallMessage =
        callInput?.value || '주문이 준비되었습니다.'

      const callMessage =
  numberToKorean(Number(number)) +
  '번 고객님 ' +
  savedCallMessage

      window.speechSynthesis.cancel()

      speechSynthesis.speak(
        new SpeechSynthesisUtterance(callMessage)
      )

      ;(button as HTMLButtonElement).textContent = '호출완료'
      ;(button as HTMLButtonElement).style.background = '#6b7280'

      const tr = (button as HTMLElement).closest('tr')

      if (tr) {
        const statusCell = tr.children[5]

        if (statusCell) {
          statusCell.innerHTML =
            '<span class="order-status-complete">완료</span>'
        }
      }

      if (orderId) {
        const { error } = await supabase
          .from('orders')
          .update({
            order_status: '완료'
          })
          .eq('id', Number(orderId))

        if (error) {
          alert('주문상태 변경 실패: ' + error.message)
        }
      }
    })
  })

document.querySelector('#merchant-product-tab')
  ?.addEventListener('click', () => {
    location.href = '/merchant-product'
  })

document.querySelector('#merchant-qr-tab')
  ?.addEventListener('click', () => {
    location.href = '/merchant-qr'
  })

  document.querySelector('#merchant-card-tab')
  ?.addEventListener('click', () => {
    location.href = '/merchant-card'
  })
  document.querySelector('#merchant-member-tab')
  ?.addEventListener('click', () => {
    location.href = '/merchant-members'
  })
  document.querySelector('#merchant-batch-tab')
  ?.addEventListener('click', () => {
    location.href = '/merchant-batch'
  })
  document.querySelector('#merchant-billing-tab')
  ?.addEventListener('click', () => {
    location.href = '/merchant-billings'
  })
  document.querySelector('#billing-back-btn')
  ?.addEventListener('click', () => {
    location.href = '/merchant-admin'
  })

  let currentOrderFilter = '전체'

  let currentPageSize = Number(
    sessionStorage.getItem('merchant_page_size') || '10'
  )

let currentPage = 1

function applyOrderFilter() {
  const rows = Array.from(
    document.querySelectorAll<HTMLTableRowElement>('#merchantOrderBody tr')
  )

  const cards = Array.from(
    document.querySelectorAll<HTMLElement>('.merchant-order-card')
  )

  const checkVisible = (status: string) => {
    if (currentOrderFilter === '전체') return true
    if (currentOrderFilter === '준비중') return status !== '완료'
    return status === '완료'
  }

  const filteredRows = rows.filter((row) => {
    const status = row.getAttribute('data-status') || '접수'
    return checkVisible(status)
  })

  const filteredCards = cards.filter((card) => {
    const status = card.getAttribute('data-status') || '접수'
    return checkVisible(status)
  })

  const isMobileOrderView =
  window.matchMedia('(max-width: 768px)').matches

const totalItems = isMobileOrderView
  ? filteredCards.length
  : filteredRows.length
  const totalPages = Math.max(1, Math.ceil(totalItems / currentPageSize))

  if (currentPage > totalPages) {
    currentPage = totalPages
  }

  const startIndex = (currentPage - 1) * currentPageSize
  const endIndex = startIndex + currentPageSize

  rows.forEach((row) => {
    row.style.display = 'none'
  })

  filteredRows
    .slice(startIndex, endIndex)
    .forEach((row) => {
      row.style.display = ''
    })

  cards.forEach((card) => {
    card.style.display = 'none'
  })

  filteredCards
    .slice(startIndex, endIndex)
    .forEach((card) => {
      card.style.display = ''
    })

  const pageInfo =
    document.querySelector('#order-page-info')

  if (pageInfo) {
    pageInfo.textContent = currentPage + ' / ' + totalPages
  }
}

document.querySelectorAll('.order-filter-btn')
  .forEach((button) => {
    button.addEventListener('click', () => {
      currentOrderFilter =
        (button as HTMLElement).getAttribute('data-status') || '전체'

        currentPage = 1

      applyOrderFilter()
    })
  })

  const merchantPageSizeSelect =
  document.querySelector<HTMLSelectElement>('#merchant-page-size')

if (merchantPageSizeSelect) {
  merchantPageSizeSelect.value = String(currentPageSize)

  merchantPageSizeSelect.addEventListener('change', (e) => {
    currentPageSize = Number(
      (e.target as HTMLSelectElement).value
    )

    sessionStorage.setItem(
      'merchant_page_size',
      String(currentPageSize)
    )

    currentPage = 1

    applyOrderFilter()
  })
}

document.querySelector('#order-prev-page')
  ?.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--

      applyOrderFilter()
    }
  })

  const orderPrevPageButton =
  document.querySelector<HTMLButtonElement>('#order-prev-page')

if (orderPrevPageButton) {
  orderPrevPageButton.onclick = () => {
    console.log('이전 클릭됨')

    if (currentPage <= 1) return

    currentPage = currentPage - 1
    applyOrderFilter()
  }
}

const orderNextPageButton =
  document.querySelector<HTMLButtonElement>('#order-next-page')

if (orderNextPageButton) {
  orderNextPageButton.onclick = () => {
    console.log('다음 클릭됨')

    const rows = Array.from(
      document.querySelectorAll<HTMLTableRowElement>('#merchantOrderBody tr')
    )

    const cards = Array.from(
      document.querySelectorAll<HTMLElement>('.merchant-order-card')
    )

    const totalItems =
      window.matchMedia('(max-width: 768px)').matches
        ? cards.length
        : rows.length

    const totalPages = Math.max(
      1,
      Math.ceil(totalItems / currentPageSize)
    )

    if (currentPage >= totalPages) return

    currentPage = currentPage + 1
    applyOrderFilter()
  }
}

const merchantPageSizeButton =
  document.querySelector<HTMLSelectElement>('#merchant-page-size')

if (merchantPageSizeButton) {
  merchantPageSizeButton.onchange = () => {
    console.log('보기 개수 변경됨')

    currentPageSize = Number(merchantPageSizeButton.value)
    currentPage = 1

    applyOrderFilter()
  }
}

applyOrderFilter()

  document.querySelector('#merchant-setting-button')
  ?.addEventListener('click', () => {

    const modal =
      document.querySelector<HTMLElement>(
        '#merchant-setting-modal'
      )

      if (modal) {
      
        modal.style.display = 'flex'
      }
})

document.querySelector('#merchant-setting-modal')
  ?.addEventListener('click', (e) => {

    if (e.target === e.currentTarget) {

      const modal =
        document.querySelector<HTMLElement>(
          '#merchant-setting-modal'
        )

      if (modal) {
        modal.style.display = 'none'
      }
    }
})

function convertNumberToKorean(num: number) {
  const ones = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구']

  if (num === 0) {
    return '영'
  }

  const hundreds = Math.floor(num / 100)
  const tens = Math.floor((num % 100) / 10)
  const units = num % 10

  let result = ''

  if (hundreds > 0) {
    result += hundreds === 1
      ? '백'
      : ones[hundreds] + '백'
  }

  if (tens > 0) {
    result += tens === 1
      ? '십'
      : ones[tens] + '십'
  }

  if (units > 0) {
    result += ones[units]
  }

  return result
}

document.querySelector('#preview-call-message')
  ?.addEventListener('click', () => {

    const message =
      (
        document.querySelector(
          '#merchant-call-message'
        ) as HTMLInputElement
      )?.value ||
      '주문이 준비되었습니다.'

      const koreanNumber =
      convertNumberToKorean(18)
    
    speechSynthesis.speak(
      new SpeechSynthesisUtterance(
        koreanNumber + '번 고객님 ' + message
      )
    )
})

document.querySelector('#preview-order-message')
  ?.addEventListener('click', () => {

    const message =
      (
        document.querySelector(
          '#merchant-order-message'
        ) as HTMLInputElement
      )?.value ||
      '새로운 주문이 접수되었습니다.'

    speechSynthesis.speak(
      new SpeechSynthesisUtterance(
        message
      )
    )
})

document.querySelector('#save-call-message')
  ?.addEventListener('click', async () => {

    const callMessage =
      (
        document.querySelector(
          '#merchant-call-message'
        ) as HTMLInputElement
      )?.value || ''

    const orderMessage =
      (
        document.querySelector(
          '#merchant-order-message'
        ) as HTMLInputElement
      )?.value || ''

      const { error } = await supabase
      .from('merchants')
      .update({
        call_message: callMessage,
        order_message: orderMessage
      })
      .eq('id', merchantId)
    
    if (error) {
      alert('설정 저장 실패: ' + error.message)
      return
    }
    
    alert('설정이 저장되었습니다.')
})

document.querySelector('#sales-today')
  ?.addEventListener('click', () => {
    const today = new Date().toISOString().slice(0, 10)
    location.href = '/merchant-admin?start=' + today + '&end=' + today
  })

document.querySelector('#sales-month')
  ?.addEventListener('click', () => {
    const now = new Date()
    const start = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .slice(0, 10)

    const end = new Date().toISOString().slice(0, 10)

    location.href = '/merchant-admin?start=' + start + '&end=' + end
  })

document.querySelector('#sales-year')
  ?.addEventListener('click', () => {
    const now = new Date()
    const start = now.getFullYear() + '-01-01'
    const end = new Date().toISOString().slice(0, 10)

    location.href = '/merchant-admin?start=' + start + '&end=' + end
  })

document.querySelector('#sales-search')
  ?.addEventListener('click', () => {
    const start =
      (document.getElementById('sales-start-date') as HTMLInputElement)?.value

    const end =
      (document.getElementById('sales-end-date') as HTMLInputElement)?.value

    if (!start || !end) {
      alert('시작일과 종료일을 선택해주세요.')
      return
    }

    location.href = '/merchant-admin?start=' + start + '&end=' + end
  })


  document.querySelectorAll('.cancel-approval-link')
  .forEach((item) => {
    item.addEventListener('click', () => {
      const modal =
        document.querySelector<HTMLElement>('#cancel-modal')

      const amount =
        (item as HTMLElement).getAttribute('data-amount') || '0'

      const info =
        document.querySelector('#cancel-order-info')

      if (info) {
        info.textContent =
          '결제금액 ' +
          Number(amount).toLocaleString() +
          '원을 취소하시겠습니까?'
      }

      if (modal) {
        modal.setAttribute(
          'data-order-id',
          (item as HTMLElement).getAttribute('data-id') || ''
        )

        modal.setAttribute(
          'data-created-at',
          (item as HTMLElement).getAttribute('data-created-at') || ''
        )

        modal.style.display = 'flex'
      }
    })
  })

  document.querySelector<HTMLElement>('#cancel-modal')

document.querySelector('#close-cancel-modal')
  ?.addEventListener('click', () => {
    const modal =
      document.querySelector<HTMLElement>('#cancel-modal')

    if (modal) {
      modal.style.display = 'none'
    }
  })

  document.querySelector('#direct-cancel-button')
  ?.addEventListener('click', async () => {
    const passwordInput =
      document.querySelector('#cancel-password') as HTMLInputElement | null

    const reasonInput =
      document.querySelector('#cancel-reason') as HTMLTextAreaElement | null

    const password = passwordInput?.value || ''
    const reason = reasonInput?.value || ''

    const modal =
    document.querySelector<HTMLElement>('#cancel-modal')

const orderCreatedAt =
  modal?.getAttribute('data-created-at') || ''

const today =
  new Date().toISOString().slice(0, 10)

const orderDate =
  orderCreatedAt.slice(0, 10)

if (orderDate !== today) {
  alert('당일 결제건만 직접 취소할 수 있습니다.\n본사 승인요청을 이용해주세요.')
  return
}

    if (password !== '1234') {
      alert('취소 비밀번호가 일치하지 않습니다.')
      return
    }

    const orderId =
      modal?.getAttribute('data-order-id') || ''

    if (!orderId) {
      alert('취소할 주문을 찾을 수 없습니다.')
      return
    }

    const { error } = await supabase
      .from('orders')
      .update({
        order_status: '취소완료',
        payment_status: '취소완료',
        cancel_status: '취소완료',
        cancel_reason: reason,
        cancel_requested_at: new Date().toISOString()
      })
      .eq('id', Number(orderId))

    if (error) {
      alert('결제취소 처리 실패: ' + error.message)
      return
    }

    alert('결제취소 처리되었습니다.')

    location.reload()
  })

      document.querySelector('#merchant-logout')
        ?.addEventListener('click', () => {

          channel.unsubscribe()

          sessionStorage.removeItem('login_merchant_id')
          sessionStorage.removeItem('login_merchant_name')
          sessionStorage.removeItem('login_merchant_code')
          location.href = '/merchant-login'
        })

} else if (path === '/merchant-product') {

  const merchantId =
    Number(sessionStorage.getItem('login_merchant_id'))

  const merchantName =
    sessionStorage.getItem('login_merchant_name') || ''

  if (!merchantId) {
    alert('로그인이 필요합니다.')
    location.href = '/merchant-login'
  }

  const { data: products, error } = await supabase
  .from('products')
  .select('*')
  .eq('merchant_id', merchantId)
  .order('sort_order', { ascending: true })
  .order('id', { ascending: false })

  if (error) {
    alert('상품 목록 조회 실패: ' + error.message)
  }

  app.innerHTML = `
    <div class="pg-admin-page">
      <div class="merchant-pick-header">
        <h1>NXG PICK 상품관리</h1>

        <div class="merchant-user-box">
          <strong>${merchantName}님</strong>
          <button id="merchant-product-logout">로그아웃</button>
        </div>
      </div>

      <div class="merchant-toolbar">
        <button id="go-merchant-order">주문관리</button>
        <button id="go-merchant-product">상품관리</button>
        <button id="go-merchant-qr">PICK QR</button>
      </div>

      <div class="payment-card">
  <div class="merchant-product-layout">

    <div class="product-create-card">
      <h2>상품 등록</h2>

    <div class="input-group">
      <label>상품명</label>
      <input id="merchant-product-name" placeholder="예: 아메리카노" />
    </div>

    <div class="input-group">
      <label>가격</label>
      <input id="merchant-product-price" type="number" placeholder="예: 4500" />
    </div>
    <div class="input-group">
  <label>카테고리</label>

  <select id="merchant-product-category">
    <option value="커피">커피</option>
    <option value="에이드">에이드</option>
    <option value="음료">음료</option>
    <option value="식사">식사</option>
    <option value="디저트">디저트</option>
    <option value="기타">기타</option>
  </select>
</div>

    <div class="input-group">
      <label>상품 이미지</label>
      <input
        id="merchant-product-image-file"
        type="file"
        accept="image/*"
      />
    </div>

    <div class="product-image-preview-box">
      <img id="product-image-preview" />
      <span id="product-image-preview-text">이미지 미리보기</span>
    </div>

    <button id="merchant-product-create">상품 등록</button>
  </div>

  <div class="product-list-card">
    <h2>등록된 상품</h2>

    <div class="product-summary-row">
      <span>총 상품 : ${(products || []).length}개</span>
      <span>판매중 : ${(products || []).filter((p) => (p.status || '판매중') === '판매중').length}개</span>
      <span>판매중지 : ${(products || []).filter((p) => p.status === '판매중지').length}개</span>
    </div>

    <div id="merchantProductBody" class="product-card-list"></div>
  </div>

</div>
    </div>
  `

  const productBody =
  document.querySelector<HTMLDivElement>('#merchantProductBody')!

productBody.innerHTML = ''

;(products || []).forEach((product) => {
  const item = document.createElement('div')

  const productImage =
    product.image_url
      ? '<img src="' + product.image_url + '" />'
      : '<div class="product-no-image">이미지 없음</div>'

  item.className = 'product-item-card'

  item.innerHTML =
    '<div class="product-thumb">' +
      productImage +
    '</div>' +

    '<div class="product-info">' +
      '<h3>' + (product.product_name || '-') + '</h3>' +
      '<p>' + Number(product.price || 0).toLocaleString() + '원</p>' +
      '<span class="' + ((product.status || '판매중') === '판매중' ? 'product-on' : 'product-off') + '">' +
        (product.status || '판매중') +
      '</span>' +
    '</div>' +

    '<div class="product-actions">' +
    '<div class="product-sort-row">' +
  '<button class="product-up-button" data-id="' + product.id + '" data-sort="' + (product.sort_order || 0) + '">▲</button>' +
  '<button class="product-down-button" data-id="' + product.id + '" data-sort="' + (product.sort_order || 0) + '">▼</button>' +
'</div>' +
  '<button class="product-edit-button" data-id="' + product.id + '">수정</button>' +
  '<button class="product-status-button" data-id="' + product.id + '" data-status="' + (product.status || '판매중') + '">' +
    ((product.status || '판매중') === '판매중' ? '판매중지' : '판매중') +
  '</button>' +
  '<button class="product-delete-button" data-id="' + product.id + '">삭제</button>' +
'</div>'

  productBody.appendChild(item)
})
 
document.querySelectorAll('.product-up-button')
  .forEach((button) => {
    button.addEventListener('click', async () => {
      const productId =
        Number((button as HTMLElement).getAttribute('data-id'))

      const currentProduct =
        products?.find((p) => p.id === productId)

      if (!currentProduct) {
        return
      }

      const currentIndex =
        (products || []).findIndex((p) => p.id === productId)

      if (currentIndex <= 0) {
        alert('이미 맨 위 상품입니다.')
        return
      }

      const prevProduct =
        (products || [])[currentIndex - 1]

      const currentSort =
        Number(currentProduct.sort_order || currentIndex)

      const prevSort =
        Number(prevProduct.sort_order || currentIndex - 1)

      await supabase
        .from('products')
        .update({ sort_order: prevSort })
        .eq('id', currentProduct.id)

      await supabase
        .from('products')
        .update({ sort_order: currentSort })
        .eq('id', prevProduct.id)

      location.reload()
    })
  })

document.querySelectorAll('.product-down-button')
  .forEach((button) => {
    button.addEventListener('click', async () => {
      const productId =
        Number((button as HTMLElement).getAttribute('data-id'))

      const currentProduct =
        products?.find((p) => p.id === productId)

      if (!currentProduct) {
        return
      }

      const currentIndex =
        (products || []).findIndex((p) => p.id === productId)

      if (
        currentIndex < 0 ||
        currentIndex >= (products || []).length - 1
      ) {
        alert('이미 맨 아래 상품입니다.')
        return
      }

      const nextProduct =
        (products || [])[currentIndex + 1]

      const currentSort =
        Number(currentProduct.sort_order || currentIndex)

      const nextSort =
        Number(nextProduct.sort_order || currentIndex + 1)

      await supabase
        .from('products')
        .update({ sort_order: nextSort })
        .eq('id', currentProduct.id)

      await supabase
        .from('products')
        .update({ sort_order: currentSort })
        .eq('id', nextProduct.id)

      location.reload()
    })
  })

document.querySelectorAll('.product-edit-button')
  .forEach((button) => {
    button.addEventListener('click', async () => {
      const productId =
        Number((button as HTMLElement).getAttribute('data-id'))

      const product =
        products?.find((p) => p.id === productId)

      if (!product) {
        alert('상품 정보를 찾을 수 없습니다.')
        return
      }

      const newName =
        prompt('상품명', product.product_name)

      if (!newName) {
        return
      }

      const newPrice =
        prompt('가격', String(product.price))

      if (!newPrice) {
        return
      }

      const { error } = await supabase
        .from('products')
        .update({
          product_name: newName,
          price: Number(newPrice)
        })
        .eq('id', productId)

      if (error) {
        alert('수정 실패 : ' + error.message)
        return
      }

      alert('수정되었습니다.')
      location.reload()
    })
  })

document.querySelectorAll('.product-delete-button')
  .forEach((button) => {
    button.addEventListener('click', async () => {
      const productId =
        Number((button as HTMLElement).getAttribute('data-id'))

      if (!confirm('정말 이 상품을 삭제할까요?')) {
        return
      }

      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)

      if (error) {
        alert('상품 삭제 실패: ' + error.message)
        return
      }

      alert('상품이 삭제되었습니다.')
      location.reload()
    })
  })

document.querySelector('#merchant-product-image-file')
  ?.addEventListener('change', () => {
    const file =
      (document.getElementById('merchant-product-image-file') as HTMLInputElement)
        ?.files?.[0]

    const preview =
      document.getElementById('product-image-preview') as HTMLImageElement

    const previewText =
      document.getElementById('product-image-preview-text') as HTMLSpanElement

    if (!file) return

    preview.src = URL.createObjectURL(file)
    preview.style.display = 'block'
    previewText.style.display = 'none'
  })

  document.querySelector('#merchant-product-create')
    ?.addEventListener('click', async () => {
      const productName =
        (document.getElementById('merchant-product-name') as HTMLInputElement)?.value || ''

      const price =
        Number((document.getElementById('merchant-product-price') as HTMLInputElement)?.value || 0)

        const category =
        (document.getElementById('merchant-product-category') as HTMLSelectElement)?.value || '기타'

        const imageFile =
        (document.getElementById(
          'merchant-product-image-file'
        ) as HTMLInputElement)?.files?.[0]
      
      let imageUrl = ''
      
      if (imageFile) {
        const fileExt =
          imageFile.name.split('.').pop() || 'png'
      
        const fileName =
          Date.now() + '_product.' + fileExt
      
          const { error: uploadError } =
          await supabase.storage
            .from('merchant-files')
            .upload(fileName, imageFile)
      
        if (uploadError) {
          alert(
            '상품 이미지 업로드 실패: ' +
            uploadError.message
          )
          return
        }
      
        const { data } = supabase.storage
  .from('merchant-files')
  .getPublicUrl(fileName)
      
        imageUrl = data.publicUrl
      }

      if (!productName || !price) {
        alert('상품명과 가격을 입력해주세요.')
        return
      }

      const { error } = await supabase
        .from('products')
        .insert({
          merchant_id: merchantId,
          product_name: productName,
          price: price,
          category: category,
          image_url: imageUrl,
          status: '판매중'
        })

      if (error) {
        alert('상품 등록 실패: ' + error.message)
        return
      }

      alert('상품이 등록되었습니다.')
      location.reload()
    })

  document.querySelectorAll('.product-status-button')
    .forEach((button) => {
      button.addEventListener('click', async () => {
        const productId =
          (button as HTMLElement).getAttribute('data-id')

        const currentStatus =
          (button as HTMLElement).getAttribute('data-status') || '판매중'

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

        location.reload()
      })
    })

  document.querySelector('#go-merchant-order')
    ?.addEventListener('click', () => {
      location.href = '/merchant-admin'
    })

  document.querySelector('#go-merchant-product')
    ?.addEventListener('click', () => {
      location.href = '/merchant-product'
    })

  document.querySelector('#go-merchant-qr')
    ?.addEventListener('click', () => {
      location.href = '/merchant-qr'
    })

  document.querySelector('#merchant-product-logout')
    ?.addEventListener('click', () => {
      sessionStorage.removeItem('login_merchant_id')
      sessionStorage.removeItem('login_merchant_name')
      sessionStorage.removeItem('login_merchant_code')
      location.href = '/merchant-login'
    })

  } else if (path === '/merchant-qr') {

    const merchantId =
      Number(sessionStorage.getItem('login_merchant_id'))
  
    const merchantName =
      sessionStorage.getItem('login_merchant_name') || ''
  
    if (!merchantId) {
      alert('로그인이 필요합니다.')
      location.href = '/merchant-login'
    }
  
    const kioskUrl =
      window.location.origin + '/kiosk?merchant_id=' + merchantId
  
    app.innerHTML = `
      <div class="pg-admin-page">
        <div class="merchant-pick-header">
          <h1>NXG PICK QR관리</h1>
  
          <div class="merchant-user-box">
            <strong>${merchantName}님</strong>
            <button id="merchant-qr-logout">로그아웃</button>
          </div>
        </div>
  
        <div class="merchant-toolbar">
          <button id="qr-go-order">주문관리</button>
          <button id="qr-go-product">상품관리</button>
          <button id="qr-go-qr">PICK QR</button>
        </div>
  
        <div class="payment-card" style="max-width:720px;">
          <h2>가맹점 주문 QR</h2>
  
          <p style="font-weight:700;margin-top:16px;">
            ${merchantName}
          </p>
  
          <div id="merchant-qr-box" style="
            width:260px;
            height:260px;
            margin:24px auto;
            display:flex;
            align-items:center;
            justify-content:center;
            border:1px solid #d9dee7;
            border-radius:16px;
            background:white;
          "></div>
  
          <div style="
            padding:14px;
            border:1px solid #d9dee7;
            border-radius:8px;
            background:#f8fafc;
            word-break:break-all;
            margin-bottom:18px;
          ">
            ${kioskUrl}
          </div>
  
      <div class="qr-button-row">
  <button id="copy-kiosk-url" class="qr-button">주소 복사</button>
  <button id="print-qr" class="qr-button">인쇄</button>
</div>
</div>
</div>
</div>
`

  const qrBox =
      document.querySelector<HTMLDivElement>('#merchant-qr-box')!
  
    QRCode.toCanvas(kioskUrl, { width: 240 }, (error, canvas) => {
      if (error) {
        alert('QR 생성 실패')
        return
      }
  
      qrBox.innerHTML = ''
      qrBox.appendChild(canvas)
    })
  
    document.querySelector('#copy-kiosk-url')
      ?.addEventListener('click', async () => {
        await navigator.clipboard.writeText(kioskUrl)
        alert('주소가 복사되었습니다.')
      })
  
    document.querySelector('#print-qr')
      ?.addEventListener('click', () => {
        window.print()
      })
  
    document.querySelector('#qr-go-order')
      ?.addEventListener('click', () => {
        location.href = '/merchant-admin'
      })
  
    document.querySelector('#qr-go-product')
      ?.addEventListener('click', () => {
        location.href = '/merchant-product'
      })
  
    document.querySelector('#qr-go-qr')
      ?.addEventListener('click', () => {
        location.href = '/merchant-qr'
      })
  
    document.querySelector('#merchant-qr-logout')
      ?.addEventListener('click', () => {
        sessionStorage.removeItem('login_merchant_id')
        sessionStorage.removeItem('login_merchant_name')
        sessionStorage.removeItem('login_merchant_code')
        location.href = '/merchant-login'
      })

    } else if (path === '/merchant-members') {

      const merchantId =
        Number(sessionStorage.getItem('login_merchant_id'))
    
      if (!merchantId) {
        alert('로그인이 필요합니다.')
        location.href = '/merchant-login'
      }
    
      const { data: members } = await supabase
        .from('members')
        .select('*')
        .eq('merchant_id', merchantId)
        .order('id', { ascending: false })
    
      app.innerHTML = `
        <div class="merchant-members-page">
    
          <h1>회원관리</h1>

${getMemberMenuHtml('members')}

<div style="margin-bottom:16px;">
            <button id="add-member-btn">
              회원 추가
            </button>
            
            </div>
        
          <table class="admin-table">
            <thead>
              <tr>
  <th>이름</th>
  <th>생년월일</th>
  <th>가입일</th>
  <th>청구일</th>
  <th>월회비</th>
  <th>연락처</th>
  <th>이메일</th>
  <th>주소</th>
  <th>결제방식</th>
  <th>메모</th>
  <th>상태</th>
  <th>수정</th>
  <th>삭제</th>
</tr>
            </thead>
    
            <tbody>
              ${(members || []).map(member => `
                <tr>
  <td>${member.member_name || ''}</td>

  <td>${member.birth_date || '-'}</td>

  <td>${member.joined_at || '-'}</td>
  <td>
  ${
    member.billing_day
      ? member.billing_day + '일'
      : '-'
  }
</td>

<td>
  ${Number(member.monthly_fee || 0).toLocaleString()}원
</td>

<td>${member.phone || ''}</td>
  <td>${member.email || ''}</td>
<td>${member.address || ''}</td>
<td>${member.payment_method || 'SMS결제'}</td>
<td>${member.memo || ''}</td>
<td>${member.status || '사용중'}</td>
<td>
  <button
    class="member-edit-btn"
    data-id="${member.id}">
    수정
  </button>
</td>

<td>
  <button
    class="member-delete-btn"
    data-id="${member.id}">
    삭제
  </button>
</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

<div id="member-modal" class="member-modal">
  <div class="member-modal-box">
    <h2>회원 추가</h2>

    <label>회원명</label>
    <input id="member-name" placeholder="회원명" />

    <label>생년월일</label>
    <input id="member-birth-date" type="date" />

    <label>연락처</label>
    <input id="member-phone" placeholder="010-0000-0000" />

    <label>청구일</label>
    <input
     id="member-billing-day"
     type="number"
     min="1"
     max="31"
     placeholder="예: 25"
/>
     <label>월 회비</label>
<input
  id="member-monthly-fee"
  type="number"
  placeholder="예: 100000"
/>

    <label>이메일</label>
    <input id="member-email" placeholder="email@example.com" />

    <label>주소</label>
    <input id="member-address" placeholder="주소" />

    <label>메모</label>
    <textarea id="member-memo" placeholder="메모"></textarea>

    <div class="member-modal-actions">
      <button id="save-member-btn">저장</button>
      <button id="close-member-modal">닫기</button>
    </div>
  </div>
</div>

</div>
      `

      bindMemberMenuEvents()

      document.querySelector('#add-member-btn')
  ?.addEventListener('click', () => {
    document.querySelector<HTMLElement>('#member-modal')!.style.display = 'flex'
  })

document.querySelector('#close-member-modal')
  ?.addEventListener('click', () => {
    document.querySelector<HTMLElement>('#member-modal')!.style.display = 'none'
  })

document.querySelector('#save-member-btn')
  ?.addEventListener('click', async () => {
    const memberName =
      (document.querySelector<HTMLInputElement>('#member-name')?.value || '').trim()

    const phone =
      (document.querySelector<HTMLInputElement>('#member-phone')?.value || '').trim()

    const email =
      (document.querySelector<HTMLInputElement>('#member-email')?.value || '').trim()

    const address =
      (document.querySelector<HTMLInputElement>('#member-address')?.value || '').trim()

    const memo =
      (document.querySelector<HTMLTextAreaElement>('#member-memo')?.value || '').trim()

      const birthDate =
  document.querySelector<HTMLInputElement>('#member-birth-date')?.value || ''

const billingDay =
  Number(
    document.querySelector<HTMLInputElement>('#member-billing-day')?.value || 0
  )

  const monthlyFee =
  Number(
    document.querySelector<HTMLInputElement>('#member-monthly-fee')?.value || 0
  )

    if (!memberName) {
      alert('회원명을 입력해주세요.')
      return
    }

    const { error } = await supabase
  .from('members')
  .insert({
    merchant_id: merchantId,
    member_name: memberName,
    phone,
    email,
    address,
    memo,
    birth_date: birthDate,
    billing_day: billingDay,
    monthly_fee: monthlyFee,
    joined_at: new Date().toISOString().slice(0, 10),
    status: '사용중'
  })

    if (error) {
      alert('회원 저장 실패: ' + error.message)
      return
    }

    alert('회원이 등록되었습니다.')
    location.reload()
  })

  document.querySelectorAll('.member-delete-btn')
  .forEach((button) => {

    button.addEventListener('click', async () => {

      const memberId =
        Number((button as HTMLElement).dataset.id)

      if (!confirm('삭제하시겠습니까?')) {
        return
      }

      const { error } = await supabase
        .from('members')
        .delete()
        .eq('id', memberId)

      if (error) {
        alert('삭제 실패')
        return
      }

      alert('삭제되었습니다.')

      location.reload()
    })

  })

} else if (path === '/merchant-billings') {

  const merchantId =
    Number(sessionStorage.getItem('login_merchant_id'))

    if (!merchantId) {
      alert('로그인이 필요합니다.')
      location.href = '/merchant-login'
    }
    const { data: members } = await supabase
  .from('members')
  .select('*')
  .eq('merchant_id', merchantId)

  const { data: billings } = await supabase
  .from('billings')
  .select('*')
  .eq('merchant_id', merchantId)
  .order('id', { ascending: false })

  app.innerHTML = `
    <div class="merchant-members-page">
      <h1>청구관리</h1>
      ${getMemberMenuHtml('billings')}

      <div class="billing-button-group">
  <button id="auto-billing-btn" class="billing-action-btn auto-billing-btn">
    📅 오늘 청구 생성
  </button>

  <button id="bulk-add-billing-btn" class="billing-action-btn bulk-add-billing-btn">
    ➕ 선택건 추가청구
  </button>

  <button id="billing-kakao-send-btn" class="billing-action-btn kakao-send-btn">
    <span class="kakao-talk-badge">TALK</span>
    선택건 카카오발송
  </button>
</div>

      <table class="admin-table">
        <thead>
          <tr>
  <th>
  <input type="checkbox" id="billing-check-all" />
</th>
<th>회원명</th>
<th>청구월</th>
<th>금액</th>
<th>메모</th>
<th>발송상태</th>
<th>결제상태</th>
<th>처리</th>
</tr>
        </thead>

        <tbody id="billingBody">
  ${(billings || []).map(billing => `
    <tr>

  <td>
    <input
      type="checkbox"
      class="billing-send-check"
      data-id="${billing.id}"
    />
  </td>

  <td>${
    (members || []).find(member => member.id === billing.member_id)?.member_name || ''
  }</td>
<td>${billing.billing_month || ''}</td>
<td>${Number(billing.amount || 0).toLocaleString()}원</td>
<td>${billing.memo || ''}</td>

<td>
  ${
    billing.send_status === '발송완료'
      ? '📨 발송완료'
      : '미발송'
  }
</td>

<td>${billing.payment_status || '미납'}</td>

<td>
  ${
    (billing.payment_status || '미납') === '미납'
      ? `<button class="billing-complete-btn" data-id="${billing.id}">완료처리</button>`
      : '-'
  }
</td>
    </tr>
  `).join('')}
</tbody>
      </table>

      <div id="billing-modal" class="member-modal">
  <div class="member-modal-box">
    <h2>➕ 추가 청구</h2>

    <label>회원명</label>
    <select id="billing-member-id">
      ${(members || []).map(member => `
        <option value="${member.id}">
          ${member.member_name || ''}
        </option>
      `).join('')}
    </select>

    <label>청구월</label>
    <input id="billing-month" type="month" />

    <label>금액</label>
    <input id="billing-amount" placeholder="금액" />

    <label>메모</label>
    <textarea id="billing-memo" placeholder="메모"></textarea>

    <div class="member-modal-actions">
      <button id="save-billing-btn">저장</button>
      <button id="close-billing-modal">닫기</button>
    </div>
  </div>
</div>
</div>
  `

  bindMemberMenuEvents()

  document.querySelector('#add-billing-btn')
  ?.addEventListener('click', () => {
    document.querySelector<HTMLElement>('#billing-modal')!.style.display = 'flex'
  })

document.querySelector('#close-billing-modal')
  ?.addEventListener('click', () => {
    document.querySelector<HTMLElement>('#billing-modal')!.style.display = 'none'
  })
  document.querySelector('#bulk-add-billing-btn')
  ?.addEventListener('click', async () => {
    const checkedItems = Array.from(
      document.querySelectorAll<HTMLInputElement>(
        '.billing-send-check:checked'
      )
    )

    const ids = checkedItems.map((item) =>
      Number(item.dataset.id)
    )

    if (ids.length === 0) {
      alert('추가청구할 청구건을 선택해주세요.')
      return
    }

    const amountText = prompt('추가할 금액을 입력해주세요. 예: 30000')

    if (!amountText) {
      return
    }

    const addAmount = Number(amountText)

    if (!addAmount || addAmount <= 0) {
      alert('추가금액을 올바르게 입력해주세요.')
      return
    }

    const addMemo = prompt('추가청구 메모를 입력해주세요. 예: 교재비') || '추가청구'

    const { data: selectedBillings, error: selectError } = await supabase
      .from('billings')
      .select('*')
      .in('id', ids)

    if (selectError) {
      alert('청구 조회 실패: ' + selectError.message)
      return
    }

    for (const billing of selectedBillings || []) {
      const currentAmount = Number(billing.amount || 0)
      const currentMemo = billing.memo || ''

      const nextMemo =
        currentMemo
          ? currentMemo + ' / ' + addMemo + '(+' + addAmount.toLocaleString() + '원)'
          : addMemo + '(+' + addAmount.toLocaleString() + '원)'

      const { error } = await supabase
        .from('billings')
        .update({
          amount: currentAmount + addAmount,
          memo: nextMemo
        })
        .eq('id', billing.id)

      if (error) {
        alert('추가청구 실패: ' + error.message)
        return
      }
    }

    alert(ids.length + '건에 추가청구가 반영되었습니다.')
    location.reload()
  })  
  document.querySelector('#billing-kakao-send-btn')
  ?.addEventListener('click', async () => {
  
    const checkedItems = Array.from(
      document.querySelectorAll<HTMLInputElement>(
        '.billing-send-check:checked'
      )
    )
  
    const ids = checkedItems.map(item =>
      Number(item.dataset.id)
    )
  
    if (ids.length === 0) {
      alert('발송할 회원을 선택해주세요.')
      return
    }
  
    const { error } = await supabase
      .from('billings')
      .update({
        send_status: '발송완료'
      })
      .in('id', ids)
  
    if (error) {
      alert('발송 처리 실패: ' + error.message)
      return
    }
  
    alert(ids.length + '건 발송 처리되었습니다.')
  
    location.reload()
  })

  document.querySelector('#auto-billing-btn')
  ?.addEventListener('click', async () => {
    const today = new Date()

    const billingMonth =
      today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0')

      if (!confirm('오늘 청구일에 해당하는 회원의 ' + billingMonth + ' 청구를 생성하시겠습니까?')) {
      return
    }

    const { data: membersData, error: memberError } = await supabase
      .from('members')
      .select('*')
      .eq('merchant_id', merchantId)
      .eq('status', '사용중')

    if (memberError) {
      alert('회원 조회 실패: ' + memberError.message)
      return
    }

    const todayDay = today.getDate()

const targetMembers = (membersData || []).filter((member) => {
  return (
    Number(member.monthly_fee || 0) > 0 &&
    Number(member.billing_day || 0) === todayDay
  )
})

    if (targetMembers.length === 0) {
      alert('오늘 청구일에 해당하는 회원이 없습니다.')
      return
    }

    const { data: existingBillings, error: existingError } = await supabase
  .from('billings')
  .select('member_id')
  .eq('merchant_id', merchantId)
  .eq('billing_month', billingMonth)

if (existingError) {
  alert('기존 청구 조회 실패: ' + existingError.message)
  return
}

const existingMemberIds =
  (existingBillings || []).map((billing) => billing.member_id)

const newTargetMembers = targetMembers.filter((member) => {
  return !existingMemberIds.includes(member.id)
})

if (newTargetMembers.length === 0) {
  alert('이미 이번달 청구가 모두 생성되어 있습니다.')
  return
}

const billingRows = newTargetMembers.map((member) => {
      return {
        merchant_id: merchantId,
        member_id: member.id,
        billing_month: billingMonth,
        amount: Number(member.monthly_fee || 0),
        memo: '자동청구',
        payment_status: '미납',
        send_status: '미발송',
      }
    })

    const { error } = await supabase
      .from('billings')
      .insert(billingRows)

    if (error) {
      alert('자동청구 생성 실패: ' + error.message)
      return
    }

    alert(newTargetMembers.length + '건의 청구가 생성되었습니다.')
    location.reload()
  })
  document.querySelector('#billing-check-all')
?.addEventListener('change', (event) => {
  const checked = (event.target as HTMLInputElement).checked

  document
    .querySelectorAll<HTMLInputElement>('.billing-send-check')
    .forEach((checkbox) => {
      checkbox.checked = checked
    })
})

  document.querySelector('#save-billing-btn')
  ?.addEventListener('click', async () => {
    const memberId =
      Number((document.querySelector<HTMLSelectElement>('#billing-member-id')?.value || 0))

    const billingMonth =
      (document.querySelector<HTMLInputElement>('#billing-month')?.value || '').trim()

    const amount =
      Number(document.querySelector<HTMLInputElement>('#billing-amount')?.value || 0)

    const memo =
      (document.querySelector<HTMLTextAreaElement>('#billing-memo')?.value || '').trim()

    if (!memberId || !billingMonth || !amount) {
      alert('회원명, 청구월, 금액을 입력해주세요.')
      return
    }

    const { error } = await supabase
      .from('billings')
      .insert({
        merchant_id: merchantId,
        member_id: memberId,
        billing_month: billingMonth,
        amount: amount,
        memo: memo,
        payment_status: '미납'
      })

    if (error) {
      alert('청구 저장 실패: ' + error.message)
      return
    }

    alert('추가 청구가 등록되었습니다.')
    location.reload()
  })
  
  document.addEventListener('click', async (event) => {
    const target = event.target as HTMLElement
  
    if (!target.classList.contains('billing-complete-btn')) {
      return
    }
    

    const billingId = target.getAttribute('data-id')
  
    if (!billingId) {
      return
    }
  
    if (!confirm('수납 완료 처리하시겠습니까?')) {
      return
    }
  
    const { data, error } = await supabase
  .from('billings')
  .update({
    payment_status: '완료'
  })
  .eq('id', Number(billingId))
  .select()


  
    if (error) {
      alert('수납 처리 실패: ' + error.message)
      return
    }
  
    if (!data || data.length === 0) {
      alert('수정된 데이터가 없습니다. billingId=' + billingId)
      return
    }

    alert('수납 완료 처리되었습니다.')
    location.reload()
  })

} else if (path === '/merchant-batch') {

  const merchantId =
    Number(sessionStorage.getItem('login_merchant_id'))

  if (!merchantId) {
    alert('로그인이 필요합니다.')
    location.href = '/merchant-login'
  }

  const { data: members } = await supabase
    .from('members')
    .select('*')
    .eq('merchant_id', merchantId)

  const { data: billings } = await supabase
    .from('billings')
    .select('*')
    .eq('merchant_id', merchantId)
    .eq('payment_status', '미납')
    .order('id', { ascending: false })

  app.innerHTML = `
    <div class="merchant-members-page">
      <h1>수기결제</h1>

${getMemberMenuHtml('batch')}

      <div class="billing-button-group">
        <button id="batch-complete-btn">💳 선택건 결제</button>
      </div>

      <table class="admin-table">
        <thead>
          <tr>
            <th>
  <input type="checkbox" id="batch-check-all" />
</th>
            <th>회원명</th>
            <th>청구월</th>
            <th>금액</th>
            <th>상태</th>
          </tr>
        </thead>

        <tbody>
          ${(billings || []).map((billing) => `
            <tr>
              <td>
                <input
                  type="checkbox"
                  class="batch-billing-check"
                  data-id="${billing.id}"
                />
              </td>
              <td>${
                (members || []).find((member) => member.id === billing.member_id)?.member_name || ''
              }</td>
              <td>${billing.billing_month || ''}</td>
              <td>${Number(billing.amount || 0).toLocaleString()}원</td>
              <td>${billing.payment_status || '미납'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div id="payment-method-modal" class="modal-overlay" style="display:none;">
  <div class="modal-box">

    <h2>💳 결제방식 선택</h2>

    <div id="payment-method-summary" class="payment-method-summary">
  선택건수: 0건<br />
  총 결제금액: 0원
</div>

    <button id="pay-card-btn" class="payment-method-btn">
      💳 카드번호 결제
    </button>

    <button id="pay-phone-btn" class="payment-method-btn">
      📱 휴대폰페이
    </button>

    <button id="pay-qr-btn" class="payment-method-btn">
      🔳 QR결제
    </button>

    <button id="pay-link-btn" class="payment-method-btn">
      🔗 결제링크 발송
    </button>

    <button id="close-payment-method-modal">
      닫기
    </button>

  </div>
</div>
    </div>
  `

  bindMemberMenuEvents()

  document.querySelector('#batch-check-all')
  ?.addEventListener('change', (event) => {
    const checked = (event.target as HTMLInputElement).checked

    document
      .querySelectorAll<HTMLInputElement>('.batch-billing-check')
      .forEach((checkbox) => {
        checkbox.checked = checked
      })
  })

  document.querySelector('#batch-complete-btn')
  ?.addEventListener('click', async () => {
    const checkedItems = Array.from(
      document.querySelectorAll<HTMLInputElement>('.batch-billing-check:checked')
    )

    const ids = checkedItems.map((item) => Number(item.dataset.id))

    if (ids.length === 0) {
      alert('승인할 청구건을 선택해주세요.')
      return
    }

    const selectedBillings = (billings || []).filter((billing) => {
      return ids.includes(billing.id)
    })
    
    const totalAmount = selectedBillings.reduce((sum, billing) => {
      return sum + Number(billing.amount || 0)
    }, 0)
    
    const summaryBox =
      document.querySelector<HTMLElement>('#payment-method-summary')
    
    if (summaryBox) {
      summaryBox.innerHTML =
        '선택건수: ' + ids.length + '건<br />' +
        '총 결제금액: ' + totalAmount.toLocaleString() + '원'
    }

    const paymentModal =
  document.querySelector<HTMLElement>('#payment-method-modal')

if (paymentModal) {
  paymentModal.style.display = 'flex'
}

return

    const { error } = await supabase
      .from('billings')
      .update({
        payment_status: '완료'
      })
      .in('id', ids)

    if (error) {
      alert('일괄승인 실패: ' + (error?.message || '알 수 없는 오류'))
      return
    }

    alert('일괄승인 완료')
    location.reload()
  })

document.querySelector('#close-payment-method-modal')
  ?.addEventListener('click', () => {
    const paymentModal =
      document.querySelector<HTMLElement>('#payment-method-modal')

    if (paymentModal) {
      paymentModal.style.display = 'none'
    }
  })

  document.querySelector('#pay-card-btn')
  ?.addEventListener('click', () => {
    alert('카드번호 결제 연결 예정입니다.')
  })

document.querySelector('#pay-phone-btn')
  ?.addEventListener('click', () => {
    alert('휴대폰페이 연결 예정입니다.')
  })

document.querySelector('#pay-qr-btn')
  ?.addEventListener('click', () => {
    alert('QR결제 연결 예정입니다.')
  })

document.querySelector('#pay-link-btn')
  ?.addEventListener('click', () => {
    alert('결제링크 발송 연결 예정입니다.')
  })


    } else if (path === '/merchant-card') { 
      const merchantId = Number(sessionStorage.getItem('login_merchant_id'))
  
      if (!merchantId) {
        alert('로그인이 필요합니다.')
        location.href = '/merchant-login'
      }
    

      app.innerHTML = `
  <div class="merchant-admin-page">
    <div class="merchant-card-header">
      <h1>카드결제</h1>
      <p>카드결제 서비스를 선택해주세요.</p>
    </div>

    <div class="merchant-toolbar">
      <button id="card-go-order">주문관리</button>
      <button id="card-go-product">상품관리</button>
      <button id="card-go-qr">PICK QR</button>
      <button id="card-go-card" class="active">카드결제</button>
    </div>

    <div class="merchant-card-payment-page">
      <div class="merchant-card-payment-grid">
        <button class="merchant-card-payment-box" id="ocr-card-payment">
          <strong>OCR 카드결제</strong>
          <span>실물카드 촬영 후 카드번호를 자동 인식하여 결제합니다.</span>
        </button>

        <button class="merchant-card-payment-box" id="manual-card-payment">
          <strong>일반 수기결제</strong>
          <span>카드번호와 유효기간을 직접 입력하여 결제합니다.</span>
        </button>

        <button class="merchant-card-payment-box" id="menu-card-payment">
          <strong>메뉴 선택 결제</strong>
          <span>상품을 선택한 뒤 카드결제를 진행합니다.</span>
        </button>

        <button class="merchant-card-payment-box" id="batch-card-payment">
  <strong>일괄승인</strong>
  <span>학원비, 관리비, 회비 등을 한 번에 승인합니다.</span>
</button>

      </div>
    </div>
  </div>
`
    
      document.querySelector('#card-go-order')
        ?.addEventListener('click', () => {
          location.href = '/merchant-admin'
        })
    
      document.querySelector('#card-go-product')
        ?.addEventListener('click', () => {
          location.href = '/merchant-product'
        })
    
      document.querySelector('#card-go-qr')
        ?.addEventListener('click', () => {
          location.href = '/merchant-qr'
        })
    
      document.querySelector('#card-go-card')
        ?.addEventListener('click', () => {
          location.href = '/merchant-card'
        })
    
      document.querySelector('#merchant-card-logout')
        ?.addEventListener('click', () => {
          sessionStorage.removeItem('login_merchant_id')
          sessionStorage.removeItem('login_merchant_name')
          sessionStorage.removeItem('login_merchant_code')
          location.href = '/merchant-login'
        })
    
        document.querySelector('#ocr-card-payment')
        ?.addEventListener('click', () => {
          location.href = '/merchant-card-ocr'
        })
    
      document.querySelector('#manual-card-payment')
        ?.addEventListener('click', () => {
          alert('일반 수기결제 화면은 다음 단계에서 연결합니다.')
        })
    
      document.querySelector('#menu-card-payment')
        ?.addEventListener('click', () => {
          location.href = '/kiosk?merchant_id=' + merchantId
        })
        document.querySelector('#batch-card-payment')
        ?.addEventListener('click', () => {
          location.href = '/merchant-batch-payment'
        })

      } else if (path === '/merchant-card-ocr') {

        app.innerHTML = `
          <div class="merchant-card-ocr-page">
      
            <h1>카드 스캔 결제</h1>
<p>실물카드를 직접 촬영해주세요.</p>
      
            <div class="ocr-upload-box">
         <label class="card-scan-button" for="ocr-card-image">
  카드 촬영하기
</label>

<input
  type="file"
  id="ocr-card-image"
  accept="image/*"
  capture="environment"
  style="display:none"
/>
            </div>
      
            <div class="ocr-preview-box">
              <img
                id="ocr-preview-image"
                style="max-width:400px; display:none;"
              />
            </div>
      
            <div class="ocr-action-box">
              <button id="ocr-start-btn">
                카드정보 인식하기
              </button>
      
              <button id="ocr-back-btn">
                이전으로
              </button>
            </div>
      
          

          <div class="ocr-payment-form">
  <label>상품명</label>
  <input id="ocr-product-name" placeholder="상품명을 입력하세요" />

  <label>구매자 연락처</label>
  <input id="ocr-customer-phone" placeholder="010-0000-0000" />

  <label>결제금액</label>
  <input id="ocr-amount" placeholder="결제금액" />

  <label>카드번호</label>
  <input id="ocr-card-number" placeholder="카드 스캔 후 자동 입력됩니다" />

  <label>유효기간</label>
  <div>
    <input id="ocr-exp-month" placeholder="월" />
    <input id="ocr-exp-year" placeholder="년" />
  </div>

  <label>할부방법</label>
  <select id="ocr-installment">
    <option>일시불</option>
    <option>2개월</option>
    <option>3개월</option>
    <option>6개월</option>
    <option>12개월</option>
  </select>

  <button id="ocr-payment-submit">결제하기</button>
</div>
</div>
        `
      
        document.querySelector('#ocr-back-btn')
          ?.addEventListener('click', () => {
            location.href = '/merchant-card'
          })
      
        document.querySelector('#ocr-card-image')
          ?.addEventListener('change', (e: any) => {
      
            const file = e.target.files?.[0]
            if (!file) return
      
            const reader = new FileReader()
      
            reader.onload = (event) => {
              const img =
                document.querySelector<HTMLImageElement>('#ocr-preview-image')
      
              if (!img) return
      
              img.src = String(event.target?.result)
              img.style.display = 'block'
            }
      
            reader.readAsDataURL(file)
          })
      
          document.querySelector('#ocr-start-btn')
          ?.addEventListener('click', async () => {
        
            const image =
              document.querySelector<HTMLImageElement>('#ocr-preview-image')
        
            if (!image?.src) {
              alert('카드를 먼저 촬영해주세요.')
              return
            }
        
            alert('카드 인식 중입니다. 잠시만 기다려주세요.')
        
            const result = await Tesseract.recognize(
              image.src,
              'eng'
            )
        
            const text = result.data.text
            alert(text)

const cardNumberMatch =
  text.match(/\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}/)

  if (cardNumberMatch) {
    const cardNumberInput =
      document.querySelector<HTMLInputElement>('#ocr-card-number')
  
    if (cardNumberInput) {
      cardNumberInput.value = cardNumberMatch[0].replace(/\D/g, '')
    }
  
    alert('카드번호를 인식했습니다.')
  } else {
    alert('카드번호를 찾지 못했습니다. 직접 입력해주세요.')
  }
          })
      
        } else if (path === '/merchant-batch-payment') {

          app.innerHTML = `
            <div class="merchant-card-ocr-page">
        
              <h1>일괄승인</h1>
              <p>여러 건의 결제를 한 번에 승인할 수 있습니다.</p>
        
              <div class="ocr-action-box">
                <button id="batch-add-row">
                  회원 추가
                </button>
        
                <button id="batch-excel-upload">
                  엑셀 업로드
                </button>
        
                <button id="batch-submit">
                  승인 실행
                </button>
              </div>
        
              <table class="merchant-table">
                <thead>
                  <tr>
                    <th>이름</th>
                    <th>연락처</th>
                    <th>금액</th>
                    <th>상태</th>
                  </tr>
                </thead>
        
                <tbody id="batch-payment-body">
                  <tr>
                    <td><input placeholder="홍길동" /></td>
                    <td><input placeholder="01012345678" /></td>
                    <td><input placeholder="100000" /></td>
                    <td>대기</td>
                  </tr>
                </tbody>
              </table>
        
            </div>
          `

        } else if (path === '/terms') {
          app.innerHTML = `
            <div class="page">
              <div class="payment-card merchant-terms-card">
                <h1>이용약관</h1>
                <div class="terms-content full-terms-scroll">
                  NXG PICK 이용약관

NXG PICK은 안전한 결제 서비스를 제공하기 위해 운영됩니다.

이용자는 관련 법령 및 본 약관을 준수하여 서비스를 이용하여야 합니다.

회사는 서비스 품질 향상을 위해 시스템 점검 및 유지보수를 진행할 수 있으며, 필요한 경우 서비스 제공이 일시 중단될 수 있습니다.

이용자는 부정한 방법으로 서비스를 이용할 수 없으며, 관련 법령을 위반하는 경우 서비스 이용이 제한될 수 있습니다.

본 서비스 이용 시 본 약관에 동의한 것으로 간주됩니다.
                </div>
              </div>
            </div>
          `
        } else if (path === '/privacy') {
          app.innerHTML = `
            <div class="page">
              <div class="payment-card merchant-terms-card">
                <h1>개인정보처리방침</h1>
                <div class="terms-content full-terms-scroll">
                  개인정보처리방침

NXG PICK은 결제 처리 및 고객 응대를 위해 필요한 최소한의 개인정보를 수집합니다.

수집된 개인정보는 결제 처리, 주문 확인, 고객 문의 응대 및 관련 법령 준수를 위해 사용됩니다.

회사는 이용자의 개인정보를 안전하게 관리하며, 법령에 따른 경우를 제외하고 제3자에게 제공하지 않습니다.

개인정보는 관련 법령에서 정한 기간 동안 보관 후 안전하게 파기됩니다.
                </div>
              </div>
            </div>
          `
        } else if (path === '/refund') {
          app.innerHTML = `
            <div class="page">
              <div class="payment-card merchant-terms-card">
                <h1>환불정책</h1>
                <div class="terms-content full-terms-scroll">
                  환불정책

환불 및 결제 취소는 상품 또는 서비스를 제공한 가맹점의 정책에 따라 처리됩니다.

환불 요청은 해당 가맹점 또는 고객센터를 통해 접수할 수 있습니다.

카드 결제 취소 후 실제 환불 반영 시점은 카드사 정책에 따라 달라질 수 있습니다.

이미 제공이 완료된 상품 또는 서비스는 환불이 제한될 수 있습니다.
                </div>
              </div>
            </div>
          `
          
    } else if (path === '/kiosk') {
      const params = new URLSearchParams(window.location.search)
      const merchantId = Number(params.get('merchant_id') || 1)

      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('merchant_id', merchantId)
        .eq('status', '판매중')
        .order('sort_order', { ascending: true })
        .order('id', { ascending: true })

      if (error) {
        app.innerHTML = `
          <div class="page">
            <h1>상품을 불러오지 못했습니다.</h1>
            <p>${error.message}</p>
          </div>
        `
      } else {

        const groupedProducts =
  (products || []).reduce((groups: any, product: any) => {
    const category = product.category || '기타'

    if (!groups[category]) {
      groups[category] = []
    }

    groups[category].push(product)

    return groups
  }, {})

        app.innerHTML = `
          <div class="kiosk-page">
            <div class="kiosk-header">
              <h1>키오스 PICK</h1>
              <div class="cart-badge">
                장바구니 <span id="cart-count">0</span>
              </div>
            </div>

            <div class="kiosk-hero">
              <h2>어서오세요!</h2>
              <p>원하시는 상품을 선택해주세요.</p>
            </div>

            <div class="kiosk-category-tabs">
  ${Object.keys(groupedProducts).map((category, index) => `
    <button
      class="kiosk-category-tab ${index === 0 ? 'active' : ''}"
      data-category="${category}"
    >
      ${category}
    </button>
  `).join('')}
</div>

            <div class="kiosk-category-list">
  ${Object.keys(groupedProducts).map((category) => `
    <section
  class="kiosk-category-section ${Object.keys(groupedProducts)[0] === category ? '' : 'hidden-category'}"
  data-category-section="${category}"
>
      <h2 class="kiosk-category-title">${category}</h2>

      <div class="kiosk-products">
        ${groupedProducts[category].map((product: any) => `
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
    </section>
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

              <div class="kiosk-company-info">

  <div><strong>NXG 소프트</strong></div>

  <div>
    대표 : 유상균
  </div>

  <div>
    사업자등록번호 : 245-81-01732 |
    통신판매업신고번호 : 2024-서울금천-2499
  </div>

  <div>
    서울특별시 금천구 가산디지털2로 34, 211-4호
  </div>

  <div>
  고객센터 : 02-431-1252 |
  이메일 : nxgsoft@naver.com
</div>

<div>
  Copyright © NXG Soft. All rights reserved.
</div>

<div class="footer-links">
  <a href="/terms" target="_blank">이용약관 보기</a>
  <span>|</span>

  <a href="/privacy" target="_blank">
    개인정보처리방침 보기
  </a>
  <span>|</span>

  <a href="/refund" target="_blank">
    환불정책 보기
  </a>
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

        document.querySelectorAll('.kiosk-category-tab')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const category =
        (button as HTMLElement).getAttribute('data-category')

      document.querySelectorAll('.kiosk-category-tab')
        .forEach((tab) => tab.classList.remove('active'))

      button.classList.add('active')

      document.querySelectorAll('.kiosk-category-section')
        .forEach((section) => {
          const sectionCategory =
            (section as HTMLElement).getAttribute('data-category-section')

          if (sectionCategory === category) {
            section.classList.remove('hidden-category')
          } else {
            section.classList.add('hidden-category')
          }
        })
    })
  })

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
          const totalPrice = cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          )
        
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
    console.log('결제 버튼 클릭됨')
      
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

    const { data: payMerchant, error: payMerchantError } = await supabase
  .from('merchants')
  .select('pg_company, korpay_pg_mid, korpay_pg_mkey, merchant_name')
  .eq('id', Number(merchantId))
  .single()

if (payMerchantError || !payMerchant) {
  alert('가맹점 결제 정보를 불러오지 못했습니다.')
  return
}

const selectedPg = payMerchant.pg_company || '코페이'

if (selectedPg === '토스페이먼츠') {
  const tossPayments = await loadTossPayments(clientKey)

  sessionStorage.setItem('merchantId', String(merchantId))
  sessionStorage.setItem('merchantName', payMerchant.merchant_name || '')
  sessionStorage.setItem('message', '키오스 PICK 주문')

  await tossPayments.requestPayment('카드', {
    amount: totalPrice,
    orderId: orderNo.replace(/[^a-zA-Z0-9]/g, ''),
    orderName: '키오스 PICK 주문',
    customerName: payMerchant.merchant_name || '미니상점 고객',
    successUrl:
      window.location.origin +
      '/success?source=kiosk&merchantId=' +
      merchantId +
      '&merchantName=' +
      encodeURIComponent(payMerchant.merchant_name || ''),
    failUrl: window.location.origin + '/fail',
  })

  return
}

if (selectedPg === '코페이') {
  if (!payMerchant.korpay_pg_mid || !payMerchant.korpay_pg_mkey) {
    alert('코페이 PG MID 또는 MKEY가 등록되지 않았습니다.')
    return
  }

  const ediDate = getKorpayEdiDate()
  const hashKey = await createKorpayHash(
    payMerchant.korpay_pg_mid,
    ediDate,
    totalPrice,
    payMerchant.korpay_pg_mkey
  )

  const paymentData = {
    merchantId: payMerchant.korpay_pg_mid,
    productName: 'NXG 미니상점 주문',
    orderNumber: orderNo.replace(/[^a-zA-Z0-9]/g, ''),
    amount: totalPrice,
    payMethod: 'card',
    returnUrl: window.location.origin + '/api/korpay-return',
    ediDate: ediDate,
    hashKey: hashKey,
    customerName: '미니상점 고객',
    reserved: String(merchantId),
    language: 'ko',
  }

  const korpay = (window as any).KorpaySdk
  korpay.paymentTimeout = 30000

  korpay.payment(
    'https://staging-payments.korpay.com/v1',
    paymentData,
    {
      onStart: () => {
        const payButton = document.querySelector<HTMLButtonElement>('#kiosk-pay-button')
        if (payButton) {
          payButton.disabled = true
          payButton.innerText = '결제창 호출 중...'
        }
      },
      onError: (err: any) => {
        alert(String(err))
        const payButton = document.querySelector<HTMLButtonElement>('#kiosk-pay-button')
        if (payButton) {
          payButton.disabled = false
          payButton.innerText = '결제하기'
        }
      },
      onClose: () => {
        const payButton = document.querySelector<HTMLButtonElement>('#kiosk-pay-button')
        if (payButton) {
          payButton.disabled = false
          payButton.innerText = '결제하기'
        }
      },
    }
  )

  return
}

alert('사용 PG사가 설정되지 않았습니다.')
return
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
  
          const { data: merchantData } = await supabase
  .from('merchants')
  .select('merchant_name, fee_rate')
  .eq('id', Number(merchantId))
  .maybeSingle()

const kioskAmount = Number(totalAmount)
const kioskFeeRate = Number(merchantData?.fee_rate || 0)
const kioskFeeAmount = Math.floor(kioskAmount * kioskFeeRate / 100)
const kioskSettlementAmount = kioskAmount - kioskFeeAmount

const { error: paymentSaveError } = await supabase
  .from('payments')
  .insert({
    order_id: orderNo,
    payment_key: 'kiosk-' + orderNo,
    amount: kioskAmount,
    fee_rate: kioskFeeRate,
    fee_amount: kioskFeeAmount,
    settlement_amount: kioskSettlementAmount,
    status: 'paid',
    merchant_id: Number(merchantId),
    merchant_name: merchantData?.merchant_name || '',
    order_status: '준비중',
    pg_company: '코페이'
  })

if (paymentSaveError) {
  alert('결제내역 저장 실패: ' + paymentSaveError.message)
}

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
<button id="receipt-view-btn" class="receipt-view-btn">
  영수증 확인
</button>

<div id="receipt-modal" class="receipt-modal">
  <div class="receipt-box receipt-approve">

    <div class="receipt-header">
      <h2>NXG PICK</h2>
      <h3>신용카드 매출전표 <span>(승인)</span></h3>
    </div>

    <section>
      <h4>결제정보</h4>
      <table>
        <tr>
          <th>카드번호</th>
          <td>결제사 제공값</td>
          <th>카드종류</th>
          <td>신용카드</td>
        </tr>
        <tr>
          <th>거래종류</th>
          <td>승인성공</td>
          <th>할부개월</th>
          <td>일시불</td>
        </tr>
        <tr>
          <th>거래일시</th>
          <td colspan="3">${new Date().toLocaleString()}</td>
        </tr>
      </table>
    </section>

    <div class="receipt-grid">
      <section>
        <h4>구매정보</h4>
        <table>
          <tr><th>주문자명</th><td>-</td></tr>
          <tr><th>승인번호</th><td>-</td></tr>
          <tr><th>주문번호</th><td>${callNumber}</td></tr>
          <tr><th>상품명 / 구매자</th><td>-</td></tr>
        </table>
      </section>

      <section>
        <h4>결제금액정보</h4>
        <table>
          <tr><th>과세금액</th><td>${Math.floor(Number(totalAmount) / 1.1).toLocaleString()}원</td></tr>
          <tr><th>비과세금액</th><td>0원</td></tr>
          <tr><th>부가세</th><td>${(Number(totalAmount) - Math.floor(Number(totalAmount) / 1.1)).toLocaleString()}원</td></tr>
          <tr><th>주문금액</th><td>${Number(totalAmount).toLocaleString()}원</td></tr>
          <tr><th>할인금액</th><td>0원</td></tr>
          <tr class="receipt-total"><th>총 결제금액</th><td>${Number(totalAmount).toLocaleString()}원</td></tr>
        </table>
      </section>
    </div>

    <section>
      <h4>상점정보</h4>
      <table>
        <tr><th>상점명</th><td>-</td><th>대표자명</th><td>-</td></tr>
        <tr><th>URL주소</th><td>-</td><th>사업자번호</th><td>-</td></tr>
        <tr><th>이용/환불문의</th><td colspan="3">-</td></tr>
        <tr><th>주소</th><td colspan="3">-</td></tr>
      </table>
    </section>

    <section>
      <h4>결제서비스업체(PG)정보</h4>
      <table>
        <tr><th>카드사 가맹점명</th><td>토스페이먼츠</td><th>사업자번호</th><td>-</td></tr>
        <tr><th>대표자명</th><td>-</td><th>가맹점번호</th><td>-</td></tr>
        <tr><th>주소</th><td colspan="3">-</td></tr>
      </table>
    </section>

    <div class="receipt-notice">
      * 신용카드 청구서에는 실제 결제 PG사명으로 표시됩니다.<br>
      * 본 매출전표는 부가가치세법 기준에 따라 발행되었습니다.
    </div>

    <div class="receipt-actions">
      <button>이메일 발송</button>
      <button onclick="window.print()">인쇄하기</button>
      <button id="receipt-close-btn">닫기</button>
    </div>

  </div>
</div>

</div>
</div>
`
document.querySelector('#receipt-view-btn')
  ?.addEventListener('click', () => {
    document.querySelector<HTMLElement>('#receipt-modal')!.style.display = 'flex'
  })
  document.querySelector('#receipt-close-btn')
  ?.addEventListener('click', () => {
    document.querySelector<HTMLElement>('#receipt-modal')!.style.display = 'none'
  })
        }
      }
    } else if (path === '/member-pay') {

      const params = new URLSearchParams(window.location.search)
      const merchantId = params.get('merchant_id')
  
      app.innerHTML = `
        <div class="member-pay-page">
          <div class="member-pay-card">
            <h1>수강료 결제</h1>
            <p>이름과 생년월일을 입력해주세요.</p>
  
            <label>이름</label>
            <input id="member-pay-name" placeholder="홍길동" />
  
            <label>생년월일</label>
            <input id="member-pay-birth" type="date" />
  
            <button id="member-search-btn">
              미납내역 조회
            </button>
  
            <div id="member-search-result"></div>
          </div>
        </div>
      `
  
      document.querySelector('#member-search-btn')
  ?.addEventListener('click', async () => {

    const memberName =
      (document.querySelector('#member-pay-name') as HTMLInputElement).value

    const birth =
      (document.querySelector('#member-pay-birth') as HTMLInputElement).value

    if (!memberName || !birth) {
      alert('이름과 생년월일을 입력해주세요.')
      return
    }

    const { data: member, error: memberError } = await supabase
  .from('members')
  .select('*')
  .eq('merchant_id', Number(merchantId))
  .eq('member_name', memberName)
  .eq('birth_date', birth)
  .single()

if (memberError) {
  alert('회원 조회 실패: ' + memberError.message)
  return
}

const { data: billings, error: billingError } = await supabase
.from('billings')
.select('*')
.eq('member_id', member.id)
.eq('payment_status', '미납')

if (billingError) {
alert('미납 조회 실패 : ' + billingError.message)
return
}

const result =
document.querySelector<HTMLElement>('#member-search-result')

if (result) {

if ((billings || []).length === 0) {

  result.innerHTML = `
    <p>미납내역이 없습니다.</p>
  `

} else {

  result.innerHTML =
  '<h2>' + member.member_name + '님 미납내역</h2>' +

  (billings || []).map((billing) => `
    <div class="member-billing-card">

      <label>

        <input
          type="checkbox"
          class="member-billing-check"
          data-id="${billing.id}"
          data-amount="${billing.amount}"
        />

        <strong>${billing.billing_month}</strong>

        ${Number(billing.amount).toLocaleString()}원

      </label>

    </div>
  `).join('') +

  `
  <div class="member-pay-total">

    총 결제금액

    <strong id="member-pay-total-amount">
      0원
    </strong>

  </div>

  <button id="member-pay-button">

    결제하기

  </button>
`
document
  .querySelectorAll<HTMLInputElement>('.member-billing-check')
  .forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const checkedItems = Array.from(
        document.querySelectorAll<HTMLInputElement>('.member-billing-check:checked')
      )

      const total = checkedItems.reduce((sum, item) => {
        return sum + Number(item.dataset.amount || 0)
      }, 0)

      const totalBox =
        document.querySelector<HTMLElement>('#member-pay-total-amount')

      if (totalBox) {
        totalBox.textContent = total.toLocaleString() + '원'
      }
    })
  })

document.querySelector('#member-pay-button')
  ?.addEventListener('click', () => {
    alert('결제 기능 연결 예정입니다.')
  })
}

}

  })
  
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
  function getKorpayEdiDate() {
    const now = new Date()
    const yyyy = String(now.getFullYear())
    const MM = String(now.getMonth() + 1).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    const HH = String(now.getHours()).padStart(2, '0')
    const mm = String(now.getMinutes()).padStart(2, '0')
    const ss = String(now.getSeconds()).padStart(2, '0')
  
    return yyyy + MM + dd + HH + mm + ss
  }
  
  async function createKorpayHash(
    merchantId: string,
    ediDate: string,
    amount: number,
    mKey: string
  ) {
    const text = merchantId + ediDate + String(amount) + mKey
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
  
    return hashArray
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('')
  }