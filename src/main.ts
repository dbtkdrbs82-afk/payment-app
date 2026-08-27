import './style.css'
import { loadTossPayments } from '@tosspayments/payment-sdk'
import { createClient } from '@supabase/supabase-js'
import Tesseract from 'tesseract.js'
import QRCode from 'qrcode'
import * as XLSX from 'xlsx'
import { renderBeautyStaff } from './beauty/staff'

const clientKey = 'live_ck_GjLJoQ1aVZ2QXB2vMWyPVw6KYe2R'
const adminPassword = '1234'
const adminSecondCode = '5678'

const supabaseUrl = 'https://rnmptlxdeihvfwegoqnf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJubXB0bHhkZWlodmZ3ZWdvcW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MzcwMDMsImV4cCI6MjA5NDIxMzAwM30.5SeOiuZgFmU7RUu5kzLpLBUwC91SYI3WxqRFoafMrG8'

const supabase = createClient(supabaseUrl, supabaseKey)
const app = document.querySelector<HTMLDivElement>('#app')!
const loginMerchantType =
  sessionStorage.getItem('login_merchant_type') || ''

if (loginMerchantType === '호텔') {
  document.body.classList.add('hotel-mode')
} else {
  document.body.classList.remove('hotel-mode')
}
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
    location.href = '/merchant-academy-payments'
  })

    document.querySelector('#batch-dashboard-search-button')
  ?.addEventListener('click', () => {

    const startDate =
      document.querySelector<HTMLInputElement>(
        '#batch-dashboard-start-date'
      )?.value || ''

    const endDate =
      document.querySelector<HTMLInputElement>(
        '#batch-dashboard-end-date'
      )?.value || ''

    if (!startDate || !endDate) {
      alert('시작일과 종료일을 선택해주세요.')
      return
    }

    if (startDate > endDate) {
      alert('시작일이 종료일보다 늦을 수 없습니다.')
      return
    }

    const params =
      new URLSearchParams(location.search)

    params.set(
      'member_start_date',
      startDate
    )

    params.set(
      'member_end_date',
      endDate
    )

    location.href =
      '/merchant-admin?' +
      params.toString()
  })
}

/* =========================================
   아카데미 공통 페이징
========================================= */

function getAcademyPagination(
  totalCount: number,
  storagePrefix: string
) {
  const pageSize =
    Number(
      sessionStorage.getItem(
        storagePrefix + '_page_size'
      ) || '10'
    )

  let currentPage =
    Number(
      sessionStorage.getItem(
        storagePrefix + '_page'
      ) || '1'
    )

  const totalPages =
    Math.max(
      1,
      Math.ceil(totalCount / pageSize)
    )

  if (currentPage > totalPages) {
    currentPage = totalPages
  }

  if (currentPage < 1) {
    currentPage = 1
  }

  const startIndex =
    (currentPage - 1) * pageSize

  return {
    pageSize,
    currentPage,
    totalPages,
    startIndex
  }
}


function getAcademyPaginationHtml(
  idPrefix: string,
  pageSize: number,
  currentPage: number,
  totalPages: number
) {
  return `
    <div class="academy-pagination-toolbar">

      <select id="${idPrefix}-page-size">

        <option
          value="10"
          ${pageSize === 10 ? 'selected' : ''}
        >
          10개씩 보기
        </option>

        <option
          value="20"
          ${pageSize === 20 ? 'selected' : ''}
        >
          20개씩 보기
        </option>

        <option
          value="30"
          ${pageSize === 30 ? 'selected' : ''}
        >
          30개씩 보기
        </option>

        <option
          value="50"
          ${pageSize === 50 ? 'selected' : ''}
        >
          50개씩 보기
        </option>

        <option
          value="100"
          ${pageSize === 100 ? 'selected' : ''}
        >
          100개씩 보기
        </option>

      </select>


      <div class="academy-pagination-buttons">

        <button
          id="${idPrefix}-prev"
          ${currentPage <= 1 ? 'disabled' : ''}
        >
          이전
        </button>

        <strong>
          ${currentPage} / ${totalPages}
        </strong>

        <button
          id="${idPrefix}-next"
          ${currentPage >= totalPages ? 'disabled' : ''}
        >
          다음
        </button>

      </div>

    </div>
  `
}


function bindAcademyPagination(
  idPrefix: string,
  storagePrefix: string,
  currentPage: number,
  totalPages: number
) {
  document
    .querySelector<HTMLSelectElement>(
      '#' + idPrefix + '-page-size'
    )
    ?.addEventListener(
      'change',
      (event) => {

        const pageSize =
          Number(
            (
              event.target as HTMLSelectElement
            ).value
          )

        sessionStorage.setItem(
          storagePrefix + '_page_size',
          String(pageSize)
        )

        sessionStorage.setItem(
          storagePrefix + '_page',
          '1'
        )

        location.reload()
      }
    )


  document
    .querySelector(
      '#' + idPrefix + '-prev'
    )
    ?.addEventListener(
      'click',
      () => {

        if (currentPage <= 1) {
          return
        }

        sessionStorage.setItem(
          storagePrefix + '_page',
          String(currentPage - 1)
        )

        location.reload()
      }
    )


  document
    .querySelector(
      '#' + idPrefix + '-next'
    )
    ?.addEventListener(
      'click',
      () => {

        if (currentPage >= totalPages) {
          return
        }

        sessionStorage.setItem(
          storagePrefix + '_page',
          String(currentPage + 1)
        )

        location.reload()
      }
    )
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

  } else if (path === '/academy-chrome') {

    const chromeParams =
      new URLSearchParams(window.location.search)
  
    const merchantId =
      chromeParams.get('merchant_id') || ''
  
    if (!merchantId) {
      app.innerHTML = `
        <div class="page">
          <div class="payment-card">
            <h2>결제정보를 찾을 수 없습니다.</h2>
          </div>
        </div>
      `
    } else {
  
      const targetUrl =
  window.location.origin +
  '/academy-pay?merchant_id=' +
  encodeURIComponent(merchantId)

const cleanTarget =
  targetUrl.replace(/^https?:\/\//, '')

const chromeIntentUrl =
  'intent://' +
  cleanTarget +
  '#Intent;' +
  'scheme=https;' +
  'package=com.android.chrome;' +
  'S.browser_fallback_url=' +
  encodeURIComponent(targetUrl) +
  ';end'

app.innerHTML = `
        <div class="page">
          <div class="payment-card">
  
            <h1>안내</h1>
  
            <p style="
              text-align:center;
              line-height:1.7;
              margin:20px 0;
            ">
              안전한 결제를 위해<br />
              Chrome 브라우저로 연결합니다.
            </p>
  
            <a
  href="${chromeIntentUrl}"
  id="academy-open-chrome"
  style="
    display:block;
    width:100%;
    box-sizing:border-box;
    padding:16px;
    text-align:center;
    text-decoration:none;
    background:#174981;
    color:white;
    border-radius:8px;
    font-weight:700;
  "
>
  크롬으로 연결
</a>
  
          </div>
        </div>
      `
  
      
    }

  } else if (path === '/hotel-chrome') {

    const hotelChromeParams =
      new URLSearchParams(
        window.location.search
      )
  
    const merchantId =
      hotelChromeParams.get(
        'merchant_id'
      ) || ''
  
    const roomNumber =
      hotelChromeParams.get(
        'room'
      ) || ''
  
  
    if (
      !merchantId ||
      !roomNumber
    ) {
  
      app.innerHTML = `
        <div class="page">
          <div class="payment-card">
  
            <h2>
              객실 결제정보를 찾을 수 없습니다.
            </h2>
  
          </div>
        </div>
      `
  
    } else {
  
      const targetUrl =
        window.location.origin +
        '/hotel?merchant_id=' +
        encodeURIComponent(
          merchantId
        ) +
        '&room=' +
        encodeURIComponent(
          roomNumber
        )
  
  
      const cleanTarget =
        targetUrl.replace(
          /^https?:\/\//,
          ''
        )
  
  
      const chromeIntentUrl =
        'intent://' +
        cleanTarget +
        '#Intent;' +
        'scheme=https;' +
        'package=com.android.chrome;' +
        'S.browser_fallback_url=' +
        encodeURIComponent(
          targetUrl
        ) +
        ';end'
  
  
      app.innerHTML = `
        <div class="hotel-chrome-page">
  
          <div class="hotel-chrome-card">
  
            <div class="hotel-chrome-brand">
              NXG HOTEL
            </div>
  
            <div class="hotel-chrome-room">
              ROOM ${roomNumber}
            </div>
  
            <h1>
              안내
            </h1>
  
            <p>
              안전한 결제를 위해<br>
              Chrome 브라우저로 연결합니다.
            </p>
  
            <div class="hotel-chrome-icon">
              <div>Chrome</div>
            </div>
  
            <a
              href="${chromeIntentUrl}"
              class="hotel-chrome-button"
            >
              크롬으로 연결
            </a>
  
          </div>
  
        </div>
      `
    }
  
  } else if (path === '/academy-pay') {

    const academyParams =
      new URLSearchParams(window.location.search)
  
    const merchantId =
      Number(
        academyParams.get('merchant_id') || 0
      )
  
    if (!merchantId) {
      app.innerHTML = `
        <div class="page">
          <div class="payment-card">
            <h2>결제정보를 찾을 수 없습니다.</h2>
          </div>
        </div>
      `
    } else {
  
      const {
        data: merchant,
        error: merchantError
      } =
        await supabase
          .from('merchants')
          .select('id, merchant_name')
          .eq('id', merchantId)
          .single()
  
      if (
        merchantError ||
        !merchant
      ) {
        app.innerHTML = `
          <div class="page">
            <div class="payment-card">
              <h2>가맹점 정보를 찾을 수 없습니다.</h2>
            </div>
          </div>
        `
      } else {
  
        app.innerHTML = `
          <div class="page">
            <div class="payment-card">
  
              <h1>
                ${merchant.merchant_name}
              </h1>
  
              <h2 style="margin-top:12px;">
                QR 결제
              </h2>
  
              <div class="input-group">
                <label>회원명</label>
  
                <input
                  id="academy-pay-name"
                  type="text"
                  placeholder="이름을 입력해주세요"
                />
              </div>
  
              <div class="input-group">
                <label>요청사항</label>
  
                <textarea
                  id="academy-pay-message"
                  placeholder="동·호수, 이용료, 요청사항 등을 입력해주세요"
                ></textarea>
              </div>
  
              <div class="input-group">
                <label>결제금액</label>
  
                <input
                  id="academy-pay-amount"
                  type="number"
                  min="1"
                  placeholder="결제금액 입력"
                />
              </div>
  
              <button id="academy-pay-submit">
                결제하기
              </button>
  
            </div>
          </div>
        `
  
  
        document
          .querySelector('#academy-pay-submit')
          ?.addEventListener(
            'click',
            async () => {
  
              const memberName =
                (
                  document.querySelector<HTMLInputElement>(
                    '#academy-pay-name'
                  )?.value || ''
                ).trim()
  
              const message =
                (
                  document.querySelector<HTMLTextAreaElement>(
                    '#academy-pay-message'
                  )?.value || ''
                ).trim()
  
              const amount =
                Number(
                  document.querySelector<HTMLInputElement>(
                    '#academy-pay-amount'
                  )?.value || 0
                )
  
              if (!memberName) {
                alert('회원명을 입력해주세요.')
                return
              }
  
              if (
                !Number.isFinite(amount) ||
                amount <= 0
              ) {
                alert('결제금액을 입력해주세요.')
                return
              }
  
  
              sessionStorage.setItem(
                'merchantId',
                String(merchant.id)
              )
  
              sessionStorage.setItem(
                'merchantName',
                merchant.merchant_name || ''
              )
  
              sessionStorage.setItem(
                'senderName',
                memberName
              )
  
              sessionStorage.setItem(
                'message',
                message || '아카데미 QR 직접결제'
              )
  
              sessionStorage.setItem(
                'selected_pg_company',
                '토스페이먼츠'
              )
  
  
              const tossPayments =
                await loadTossPayments(clientKey)
  
              await tossPayments.requestPayment(
                '카드',
                {
                  amount,
  
                  orderId:
                    'ACADEMY-' +
                    merchant.id +
                    '-' +
                    Date.now(),
  
                  orderName:
                    merchant.merchant_name +
                    ' QR결제',
  
                  customerName:
                    memberName,
  
                  successUrl:
                    window.location.origin +
                    '/success?source=academy' +
                    '&merchantId=' +
                    merchant.id +
                    '&merchantName=' +
                    encodeURIComponent(
                      merchant.merchant_name || ''
                    ),
  
                  failUrl:
                    window.location.origin +
                    '/fail'
                }
              )
            }
          )
      }
    }

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
      
      const params = new URLSearchParams(window.location.search)
const ref = params.get('ref') || ''

location.href = ref
  ? '/merchant-apply-form?ref=' + encodeURIComponent(ref)
  : '/merchant-apply-form'
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

    <label id="business-number-label">사업자번호</label>
    <input
      id="apply-business-number"
      type="text"
      placeholder="사업자인 경우 입력">

    <label
      id="corporate-number-label"
      style="display:none;">
      법인번호 *
    </label>

    <input
      id="apply-corporate-number"
      type="text"
      placeholder="법인번호"
      style="display:none;">

    <label>주민번호 *</label>
    <input
      id="apply-resident-number"
      type="text"
      placeholder="주민등록번호">

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

</select>
        </div>
      </div>

      <div class="apply-section">
  <h3>6. 첨부서류 / 메모</h3>
  <p class="apply-help">PG 심사를 위해 필수 서류를 첨부해주세요.</p>

  <div class="apply-grid">
    <label>사업자등록증 </label>
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

document.querySelector<HTMLButtonElement>('#find-postcode-btn')
  ?.addEventListener('click', () => {

    new (window as any).daum.Postcode({
      oncomplete: (data: any) => {

        const zipcode =
          document.querySelector<HTMLInputElement>('#apply-zipcode')

        const address =
          document.querySelector<HTMLInputElement>('#apply-address')

        const addressDetail =
          document.querySelector<HTMLInputElement>('#apply-address-detail')

        if (zipcode) {
          zipcode.value = data.zonecode
        }

        if (address) {
          address.value =
            data.roadAddress || data.jibunAddress
        }

        addressDetail?.focus()
      }
    }).open()
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

  if (!bankbookFile || !idCardFile) {
    alert('통장사본과 신분증을 첨부해주세요.')
    return
  }

const safeTime = Date.now()

const businessFileName = businessFile
  ? `${safeTime}_business.${businessFile.name.split('.').pop() || 'file'}`
  : ''

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

  if (businessFile) {
    const businessUpload = await supabase.storage
      .from('merchant-files')
      .upload(businessFileName, businessFile)
  
    if (businessUpload.error) {
      alert('사업자등록증 업로드 실패: ' + businessUpload.error.message)
      return
    }
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

const applyParams = new URLSearchParams(window.location.search)
const refCode = (applyParams.get('ref') || '').replace(/-/g, '').trim()

let matchedManager: any = null
let matchedAgency: any = null
let matchedBranch: any = null

if (refCode) {
  const { data: managerData, error: managerError } = await supabase
    .from('admin_users')
    .select('*')
    .eq('role', 'MANAGER')
    .eq('status', '사용중')

  if (managerError) {
    alert('담당자 정보를 확인하지 못했습니다: ' + managerError.message)
    return
  }

  matchedManager = (managerData || []).find((user) =>
    String(user.phone || '').replace(/-/g, '').endsWith(refCode)
  )

  if (matchedManager?.parent_admin_id) {
    const { data: agencyData } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', matchedManager.parent_admin_id)
      .single()

    matchedAgency = agencyData || null
  }

  if (matchedAgency?.parent_admin_id) {
    const { data: branchData } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', matchedAgency.parent_admin_id)
      .single()

    matchedBranch = branchData || null
  }
}

  const insertData = {
    merchant_name: (document.getElementById('apply-merchant-name') as HTMLInputElement)?.value || '',
    manager_admin_id: matchedManager?.id || null,
manager_admin_name: matchedManager?.admin_name || '',
manager_phone: matchedManager?.phone || '',
agency_admin_id: matchedAgency?.id || null,
agency_name: matchedAgency?.admin_name || '본사',
agency_admin_name: matchedAgency?.admin_name || '',

branch_admin_id: matchedBranch?.id || null,
branch_admin_name: matchedBranch?.admin_name || '',
    owner_name: (document.getElementById('apply-owner-name') as HTMLInputElement)?.value || '',
    phone: (document.getElementById('apply-phone') as HTMLInputElement)?.value || '',

    business_number: (document.getElementById('apply-business-number') as HTMLInputElement)?.value || '',
    resident_number: (document.getElementById('apply-resident-number') as HTMLInputElement)?.value || '',
    business_category: (document.getElementById('apply-business-category') as HTMLInputElement)?.value || '',
business_type: (document.getElementById('apply-business-item') as HTMLInputElement)?.value || '',
product_item: (document.getElementById('apply-product-item') as HTMLInputElement)?.value || '',
    email: (document.getElementById('apply-email') as HTMLInputElement)?.value || '',

    zipcode: (document.getElementById('apply-zipcode') as HTMLInputElement)?.value || '',
    address: (document.getElementById('apply-address') as HTMLInputElement)?.value || '',
    address_detail: (document.getElementById('apply-address-detail') as HTMLInputElement)?.value || '',

    bank_name: (document.getElementById('apply-bank-name') as HTMLInputElement)?.value || '',
    account_number: (document.getElementById('apply-account-number') as HTMLInputElement)?.value || '',
    account_holder: (document.getElementById('apply-account-holder') as HTMLInputElement)?.value || '',

    settlement_cycle: (document.getElementById('apply-settlement-cycle') as HTMLSelectElement)?.value || '',


    business_license_url: businessFileName
  ? supabase.storage.from('merchant-files').getPublicUrl(businessFileName).data.publicUrl
  : '',

bankbook_url: bankbookFileName
  ? supabase.storage.from('merchant-files').getPublicUrl(bankbookFileName).data.publicUrl
  : '',

id_card_url: idCardFileName
  ? supabase.storage.from('merchant-files').getPublicUrl(idCardFileName).data.publicUrl
  : '',

product_photo_url: productPhotoFileName
  ? supabase.storage.from('merchant-files').getPublicUrl(productPhotoFileName).data.publicUrl
  : '',

extra_file_url: extraFileName
  ? supabase.storage.from('merchant-files').getPublicUrl(extraFileName).data.publicUrl
  : '',
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

location.href = '/merchant-login'
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

<div class="sales-filter-buttons">
  <button id="sales-daily">일별 매출</button>
  <button id="sales-monthly">월별 매출</button>
  <button id="sales-yearly">연별 매출</button>
</div>

<div id="sales-summary"></div>
 
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

  const senderName =
  sessionStorage.getItem('senderName')

const message =
  sessionStorage.getItem('message')

const source =
  params.get('source')

const hotelRoomNumber =
  source === 'hotel'
    ? (
        sessionStorage.getItem(
          'hotel_room_number'
        ) || ''
      )
    : ''

    const hotelCustomerRequest =
  source === 'hotel'
    ? (sessionStorage.getItem('hotel_customer_request') || '')
    : ''

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
  const confirmResponse = await fetch('/api/toss-confirm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      paymentKey,
      orderId,
      amount
    })
  })
  
  if (!confirmResponse.ok) {
    const confirmError = await confirmResponse.json()
  
    alert(
      '결제 승인 실패 : ' +
      (confirmError.message || '알 수 없는 오류')
    )
  
    throw new Error('토스 결제 승인 실패')
  }  

  const confirmResult = await confirmResponse.json()

  const tossCardCompanyMap: Record<string, string> = {
    '3K': '기업비씨',
    '46': '광주',
    '71': '롯데',
    '30': '산업',
    '31': 'BC',
    '51': '삼성',
    '38': '새마을',
    '41': '신한',
    '62': '신협',
    '36': '씨티',
    '33': '우리',
    'W1': '우리',
    '37': '우체국',
    '39': '저축',
    '35': '전북',
    '42': '제주',
    '15': '카카오뱅크',
    '3A': '케이뱅크',
    '24': '토스뱅크',
    '21': '하나',
    '61': '현대',
    '11': '국민',
    '91': '농협',
    '34': '수협'
  }
  
  const tossCardCompanyCode =
    confirmResult.card?.acquirerCode ||
    confirmResult.card?.issuerCode ||
    ''
  
  const tossCardCompany =
    tossCardCompanyMap[tossCardCompanyCode] ||
    tossCardCompanyCode

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
      merchant_id:
  merchantId
    ? Number(merchantId)
    : null,

merchant_name:
  merchantName,

room_number:
  hotelRoomNumber || null,

pg_company:
      params.get('pg') ||
      sessionStorage.getItem('selected_pg_company') ||
      '토스페이먼츠',
payment_method: confirmResult.method || '카드',

approval_number:
  confirmResult.card?.approveNo || '',

  card_company: tossCardCompany,

card_number:
  confirmResult.card?.number || '',

installment_months:
  confirmResult.card?.installmentPlanMonths
    ? String(confirmResult.card.installmentPlanMonths)
    : '일시불',

approved_at:
  confirmResult.approvedAt ||
  new Date().toISOString()
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
    const callNumber = sessionStorage.getItem('kiosk_call_number')
  
    if (orderNo && merchantId && totalAmount) {
      const items = itemsText ? JSON.parse(itemsText) : []
  
      await supabase.from('orders').insert({
        merchant_id: Number(merchantId),
      
        // 고객 화면에 표시할 주문 대기번호
        order_no: callNumber || '-',
        call_number: callNumber ? Number(callNumber) : null,
      
        // PG 결제 연결용 주문번호
        pg_order_id:
          orderNo.replace(/[^a-zA-Z0-9]/g, ''),
      
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

  if (source === 'hotel') {

    const hotelItemsText =
      sessionStorage.getItem(
        'hotel_items'
      )
  
    const hotelRoomNumber =
      sessionStorage.getItem(
        'hotel_room_number'
      ) || ''
  
    const hotelItems =
      hotelItemsText
        ? JSON.parse(hotelItemsText)
        : []
  
  
    if (
      merchantId &&
      hotelRoomNumber &&
      hotelItems.length > 0
    ) {
  
      const {
        error: hotelOrderError
      } =
        await supabase
          .from('orders')
          .insert({
            merchant_id:
              Number(merchantId),
  
            order_no:
              String(nextOrderNumber),
  
            pg_order_id:
              orderId,
  
            payment_key:
              paymentKey,
  
            room_number:
              hotelRoomNumber,

              customer_request:
  hotelCustomerRequest || null,
  
            items:
              hotelItems,
  
            total_amount:
              paymentAmount,
  
            order_status:
              '접수',
  
            payment_status:
              '결제완료'
          })
  
  
      if (hotelOrderError) {
  
        alert(
          '호텔 주문 저장 실패: ' +
          hotelOrderError.message
        )
  
      } else {
  
        sessionStorage.removeItem(
          'hotel_items'
        )
  
        sessionStorage.removeItem(
          'hotel_room_number'
        )
          sessionStorage.removeItem('hotel_customer_request')
      
      }
    }
  }
}
window.history.replaceState({}, '', '/success')

const isHotelSuccess =
  source === 'hotel'

const successTitleHtml =
  isHotelSuccess
    ? '<span style="display:block;">결제가</span><span style="display:block;">완료되었습니다</span>'
    : currentEventType === 'funeral'
      ? '<span style="display:block;">명복을 빌어 주셔서</span><span style="display:block;">감사합니다.</span>'
      : '<span style="display:block;">주문이</span><span style="display:block;">접수되었습니다</span>'

const successRoomHtml =
  isHotelSuccess
    ? `
      <p class="hotel-success-room">
        ROOM ${hotelRoomNumber || '-'}
      </p>
    `
    : ''

const successGuideHtml =
  isHotelSuccess
    ? `
      <p class="order-wait-message hotel-success-message">
        객실 추가결제가 정상 접수되었습니다.<br>
        요청하신 상품은 객실로 전달됩니다.
      </p>
    `
    : `
      <p class="order-wait-message">
        고객 호출 시까지<br>
        잠시만 기다려주세요.
      </p>
    `

  app.innerHTML = `
    <div class="page ${isHotelSuccess ? 'hotel-success-page' : ''}">
  <div class="payment-card ${isHotelSuccess ? 'hotel-success-card' : ''}">

  <h1>
    ${successTitleHtml}
  </h1>

  ${successRoomHtml}

  <p class="order-number-title">
    주문번호
  </p>

  <div class="order-number-box">
    ${nextOrderNumber}번
  </div>

  ${successGuideHtml}

  <button
    id="receipt-view-btn"
    class="receipt-view-btn ${isHotelSuccess ? 'hotel-success-receipt-button' : ''}"
  >
    영수증 확인
  </button>

<p class="payment-amount">
  결제금액 : ${Number(amount).toLocaleString()}원
</p>
        <button
  id="home-button"
  class="${isHotelSuccess ? 'hotel-success-home-button' : ''}"
>
  확인
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


    /* 호텔 결제 후에는
       해당 객실의 호텔 결제창으로 돌아가기 */
    if (
      source === 'hotel' &&
      merchantId &&
      hotelRoomNumber
    ) {

      window.location.href =
        '/hotel?merchant_id=' +
        merchantId +
        '&room=' +
        encodeURIComponent(
          hotelRoomNumber
        )

      return
    }


    /* 기존 일반매장 PICK */
    if (merchantId) {

      window.location.href =
        '/kiosk?merchant_id=' +
        merchantId

      return
    }


    window.location.href =
      '/merchant-login'
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
  (document.querySelector<HTMLInputElement>('#admin-login-id')?.value || '')
    .trim()
    .toUpperCase()

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
  sessionStorage.getItem('admin_id') || ''

  const adminRole =
  sessionStorage.getItem('admin_role') || ''
  
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

  ${
    adminRole === 'MANAGER'
      ? ''
      : adminRole === 'AGENCY' || adminRole === 'BRANCH'
        ? `
          <a class="admin-tab" data-page="organization">조직관리</a>
        `
        : `
          <a class="admin-tab" data-page="payout">출금관리</a>
          <a class="admin-tab" data-page="tax">세무관리</a>
          <a class="admin-tab" data-page="organization">조직관리</a>
        `
  }

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

       
       document.querySelector('#admin-logout')
?.addEventListener('click', () => {

  if (!confirm('로그아웃 하시겠습니까?')) {
    return
  }

  sessionStorage.removeItem('admin_id')
  sessionStorage.removeItem('admin_name')
  sessionStorage.removeItem('admin_role')

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

          const currentAdminId =
  sessionStorage.getItem('admin_id') || ''

if (currentAdminId !== 'NXGMASTER16') {
  alert('결제취소 승인은 대표관리자만 처리할 수 있습니다.')
  return
}
      
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

            if (page === 'tax') {
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
                titleBox.innerHTML = '▶ 세무관리'
              }
            
              if (searchBox) {
                searchBox.innerHTML = ''
              }
            
              if (tableTop) {
                tableTop.innerHTML = ''
              }
            
              if (tableHead) {
                tableHead.innerHTML = ''
              }
            
              if (paymentTableBody) {
                paymentTableBody.innerHTML = ''
              }
            
              if (summaryBox) {
                summaryBox.innerHTML =
                  '<div class="merchant-detail-header">' +
                    '<h2>세무관리</h2>' +
                  '</div>' +
            
                  '<div class="merchant-detail-section">' +
                    '<h3>헤더레코드 설정</h3>' +
            
                    '<div class="merchant-detail-grid">' +
            
                      '<label>회사코드</label>' +
                      '<select id="tax-company-code">' +
                        '<option value="NXGSOFT">NXGSOFT(nxgsoft)</option>' +
                      '</select>' +
            
                      '<label>결제년도</label>' +
                      '<input id="tax-year" value="2026" maxlength="4" />' +
            
                      '<label>분기구분</label>' +
                      '<select id="tax-quarter">' +
                        '<option value="1">1분기</option>' +
                        '<option value="2" selected>2분기</option>' +
                        '<option value="3">3분기</option>' +
                        '<option value="4">4분기</option>' +
                      '</select>' +
            
                      '<label>관할서코드</label>' +
                      '<input id="tax-office-code" value="119" />' +
            
                      '<label>제출년월일</label>' +
                      '<input id="tax-submit-date" type="date" value="2026-07-08" />' +
            
                      '<label>사업자등록번호</label>' +
                      '<input id="tax-business-number" value="2458101732" />' +
            
                      '<label>사업자상호</label>' +
                      '<input id="tax-business-name" value="NXGSOFT" />' +
            
                      '<label>사업자상호 영문명</label>' +
                      '<input id="tax-business-name-en" value="NXGSOFT" />' +
            
                      '<label>결제기간시작년월일</label>' +
                      '<input id="tax-period-start" type="date" value="2026-04-01" />' +
            
                      '<label>결제기간종료년월일</label>' +
                      '<input id="tax-period-end" type="date" value="2026-06-30" />' +
            
                      '<label>의뢰업체 전화번호</label>' +
                      '<input id="tax-company-phone" value="024311252" />' +
            
                      '<label>의뢰업체 휴대폰번호</label>' +
                      '<input id="tax-company-mobile" value="01099382962" />' +
            
                      '<label>의뢰업체 E-mail주소</label>' +
                      '<input id="tax-company-email" value="nxgsoft@naver.com" />' +
            
                      '<label>공급자 성명</label>' +
                      '<input id="tax-supplier-name" value="유상균" />' +
            
                      '<label>공급자 사업장주소</label>' +
                      '<input id="tax-supplier-address" value="서울시 금천구 가산디지털2로34, 2층 211-4" />' +
            
                      '<label>공급자 업태</label>' +
                      '<input id="tax-supplier-business-type" value="정보통신업" />' +
            
                      '<label>공급자 종목</label>' +
                      '<input id="tax-supplier-business-item" value="소프트웨어개발 및 개발용역업" />' +
            
                    '</div>' +
            
                    '<div class="merchant-detail-actions">' +
                      '<button id="tax-header-save-button" class="merchant-save-btn">' +
                        '수정하기' +
                      '</button>' +
                    '</div>' +
                  '</div>' +
            
                  '<div class="tax-download-row">' +
                  '<div class="tax-download-title">' +
                    '수수료 세금계산서' +
                  '</div>' +
                  '<button type="button" id="tax-excel-download-button" class="merchant-save-btn tax-download-button">' +
                    '내려받기' +
                  '</button>' +
                '</div>' +

                '<div class="tax-download-row">' +
                  '<div class="tax-download-title">' +
                    '전산매체신고양식' +
                  '</div>' +
                  '<button id="tax-text-download-button" class="merchant-save-btn tax-download-button">' +
                    '내려받기' +
                  '</button>' +
                '</div>'
              }
              
            
              const getTaxInputValue = (selector: string) => {
                return (
                  document.querySelector<HTMLInputElement | HTMLSelectElement>(selector)
                    ?.value || ''
                ).trim()
              }
            
              const setTaxInputValue = (
                selector: string,
                value: string | number | null | undefined
              ) => {
                const input =
                  document.querySelector<HTMLInputElement | HTMLSelectElement>(selector)
            
                if (input && value !== null && value !== undefined) {
                  input.value = String(value)
                }
              }
            
              const loadTaxHeaderSettings = async () => {
                const { data, error } = await supabase
                  .from('tax_header_settings')
                  .select('*')
                  .order('id', { ascending: false })
                  .limit(1)
                  .maybeSingle()
            
                if (error) {
                  alert('헤더레코드 불러오기 실패: ' + error.message)
                  return
                }
            
                if (!data) return
            
                setTaxInputValue('#tax-company-code', data.company_code)
                setTaxInputValue('#tax-year', data.payment_year)
                setTaxInputValue('#tax-quarter', data.quarter)
                setTaxInputValue('#tax-office-code', data.office_code)
                setTaxInputValue('#tax-submit-date', data.submit_date)
                setTaxInputValue('#tax-business-number', data.business_number)
                setTaxInputValue('#tax-business-name', data.business_name)
                setTaxInputValue('#tax-business-name-en', data.business_name_en)
                setTaxInputValue('#tax-period-start', data.period_start)
                setTaxInputValue('#tax-period-end', data.period_end)
                setTaxInputValue('#tax-company-phone', data.company_phone)
                setTaxInputValue('#tax-company-mobile', data.company_mobile)
                setTaxInputValue('#tax-company-email', data.company_email)
                setTaxInputValue('#tax-supplier-name', data.supplier_name)
                setTaxInputValue('#tax-supplier-address', data.supplier_address)
                setTaxInputValue(
                  '#tax-supplier-business-type',
                  data.supplier_business_type
                )
                setTaxInputValue(
                  '#tax-supplier-business-item',
                  data.supplier_business_item
                )
              }
            
              void loadTaxHeaderSettings()
            
              document.querySelector('#tax-header-save-button')
                ?.addEventListener('click', async () => {
                  const saveData = {
                    company_code: getTaxInputValue('#tax-company-code'),
                    tax_year: Number(getTaxInputValue('#tax-year')),
                    quarter: Number(getTaxInputValue('#tax-quarter')),
                    tax_office_code: getTaxInputValue('#tax-office-code'),
                    submission_date: getTaxInputValue('#tax-submit-date'),
                    business_number: getTaxInputValue('#tax-business-number'),
                    company_name: getTaxInputValue('#tax-business-name'),
                    company_name_english: getTaxInputValue('#tax-business-name-en'),
                    period_start: getTaxInputValue('#tax-period-start'),
                    period_end: getTaxInputValue('#tax-period-end'),
                    company_phone: getTaxInputValue('#tax-company-phone'),
                    manager_phone: getTaxInputValue('#tax-company-mobile'),
                    manager_email: getTaxInputValue('#tax-company-email'),
                    representative_name: getTaxInputValue('#tax-supplier-name'),
                    business_address: getTaxInputValue('#tax-supplier-address'),
                    business_type: getTaxInputValue('#tax-supplier-business-type'),
                    business_item: getTaxInputValue('#tax-supplier-business-item'),
                    updated_at: new Date().toISOString()
                  }
            
                  const { data: existingSetting, error: findError } = await supabase
                    .from('tax_header_settings')
                    .select('id')
                    .order('id', { ascending: false })
                    .limit(1)
                    .maybeSingle()
            
                  if (findError) {
                    alert('헤더레코드 확인 실패: ' + findError.message)
                    return
                  }
            
                  if (existingSetting?.id) {
                    const { error: updateError } = await supabase
                      .from('tax_header_settings')
                      .update(saveData)
                      .eq('id', existingSetting.id)
            
                    if (updateError) {
                      alert('헤더레코드 수정 실패: ' + updateError.message)
                      return
                    }
                  } else {
                    const { error: insertError } = await supabase
                      .from('tax_header_settings')
                      .insert(saveData)
            
                    if (insertError) {
                      alert('헤더레코드 저장 실패: ' + insertError.message)
                      return
                    }
                  }
            
                  alert('헤더레코드가 저장되었습니다.')
                })

                const taxExcelDownloadButton =
  document.querySelector<HTMLButtonElement>('#tax-excel-download-button')

if (!taxExcelDownloadButton) {
  alert('수수료 세금계산서 내려받기 버튼을 찾지 못했습니다.')
  return
}

taxExcelDownloadButton.onclick = async () => {
    const cleanNumber = (value: unknown) => {
      return String(value || '')
        .replace(/-/g, '')
        .replace(/\s/g, '')
        .trim()
    }

    const startDate =
      getTaxInputValue('#tax-period-start').replace(/-/g, '')

    const endDate =
      getTaxInputValue('#tax-period-end').replace(/-/g, '')

    const writeDate =
      getTaxInputValue('#tax-submit-date').replace(/-/g, '')

    const supplierBusinessNumber =
      cleanNumber(getTaxInputValue('#tax-business-number'))

    const supplierBusinessName =
      getTaxInputValue('#tax-business-name')

    const supplierName =
      getTaxInputValue('#tax-supplier-name')

    const supplierAddress =
      getTaxInputValue('#tax-supplier-address')

    const supplierBusinessType =
      getTaxInputValue('#tax-supplier-business-type')

    const supplierBusinessItem =
      getTaxInputValue('#tax-supplier-business-item')

    const supplierEmail =
      getTaxInputValue('#tax-company-email')

    if (!startDate || !endDate) {
      alert('결제기간 시작일과 종료일을 선택해주세요.')
      return
    }

    if (writeDate.length !== 8) {
      alert('제출년월일을 정확히 입력해주세요.')
      return
    }

    if (!supplierBusinessNumber) {
      alert('공급자 사업자등록번호를 입력해주세요.')
      return
    }

    const startIso =
      startDate.slice(0, 4) +
      '-' +
      startDate.slice(4, 6) +
      '-' +
      startDate.slice(6, 8) +
      'T00:00:00'

    const endIso =
      endDate.slice(0, 4) +
      '-' +
      endDate.slice(4, 6) +
      '-' +
      endDate.slice(6, 8) +
      'T23:59:59.999'

    const { data: payments, error: paymentError } = await supabase
      .from('payments')
      .select(
        'merchant_id, merchant_name, fee_amount, status, created_at'
      )
      .eq('status', 'paid')
      .gte('created_at', startIso)
      .lte('created_at', endIso)

    if (paymentError) {
      alert('결제내역 조회 실패: ' + paymentError.message)
      return
    }

    if (!payments || payments.length === 0) {
      alert('선택한 기간에 승인된 결제내역이 없습니다.')
      return
    }

    const merchantIds = [
      ...new Set(
        payments
          .map((payment) => Number(payment.merchant_id))
          .filter((merchantId) => merchantId > 0)
      )
    ]

    if (merchantIds.length === 0) {
      alert('가맹점과 연결된 결제내역이 없습니다.')
      return
    }

  
    const { data: merchants, error: merchantError } = await supabase
  .from('merchants')
  .select('*')
  .in('id', merchantIds)

    if (merchantError) {
      alert('가맹점 정보 조회 실패: ' + merchantError.message)
      return
    }

    const merchantMap = new Map<number, any>()

    ;((merchants || []) as any[]).forEach((merchant) => {
      merchantMap.set(Number(merchant.id), merchant)
    })

    const summaryMap = new Map<
      number,
      {
        merchant: any
        feeTotal: number
      }
    >()

    let excludedPaymentCount = 0

    payments.forEach((payment) => {
      const merchantId = Number(payment.merchant_id)

      if (!merchantId) {
        excludedPaymentCount += 1
        return
      }

      const merchant = merchantMap.get(merchantId)

      if (!merchant) {
        excludedPaymentCount += 1
        return
      }

      const current = summaryMap.get(merchantId)

      if (current) {
        current.feeTotal += Number(payment.fee_amount || 0)
      } else {
        summaryMap.set(merchantId, {
          merchant,
          feeTotal: Number(payment.fee_amount || 0)
        })
      }
    })

    if (summaryMap.size === 0) {
      alert('가맹점 정보와 연결된 결제내역이 없습니다.')
      return
    }

    let templateResponse: Response

    try {
      templateResponse = await fetch(
        '/tax-template.xlsx',
        {
          cache: 'no-store'
        }
      )
    } catch {
      alert('세금계산서 원본 양식 파일을 불러오지 못했습니다.')
      return
    }

    if (!templateResponse.ok) {
      alert(
        '세금계산서 원본 양식 파일을 찾을 수 없습니다.\n\n' +
        'public 폴더에 아래 파일이 있는지 확인해주세요.\n' +
'tax-template.xlsx'
      )
      return
    }

    const templateBuffer =
      await templateResponse.arrayBuffer()

    const workbook = XLSX.read(
      templateBuffer,
      {
        type: 'array',
        cellStyles: true,
        cellDates: false
      }
    )

    const worksheet = workbook.Sheets['Sheet1']

    if (!worksheet) {
      alert('원본 양식에서 Sheet1을 찾을 수 없습니다.')
      return
    }

    const originalRange = XLSX.utils.decode_range(
      worksheet['!ref'] || 'A1:BG1'
    )

    if (originalRange.e.c !== 58) {
      alert(
        '원본 세금계산서 양식의 항목 수가 다릅니다.\n' +
        '반드시 보내준 원본 파일을 사용해주세요.'
      )
      return
    }

    const expectedHeaders = [
      '전자(세금)계산서종류\n(01:일반, 02:영세율)',
      '작성일자',
      "공급자 등록번호\n('-'없이 입력)",
      '공급자\n종사업장번호',
      '공급자 상호',
      '공급자 성명',
      '공급자 사업장주소',
      '공급자 업태',
      '공급자 종목',
      '공급자 이메일',
      "공급받는자 등록번호\n('-'없이 입력)",
      '공급받는자\n종사업장번호',
      '공급받는자 상호',
      '공급받는자 성명',
      '공급받는자 사업장주소',
      '공급받는자 업태',
      '공급받는자 종목',
      '공급받는자 이메일1',
      '공급받는자 이메일2',
      '공급가액',
      '세액',
      '비고',
      '일자1\n(2자리,작성년월 제외)',
      '품목1',
      '규격1',
      '수량1',
      '단가1',
      '공급가액1',
      '세액1',
      '물품비고1',
      '일자2\n(2자리,작성년월 제외)',
      '품목2',
      '규격2',
      '수량2',
      '단가2',
      '공급가액2',
      '세액2',
      '물품비고2',
      '일자3\n(2자리,작성년월 제외)',
      '품목3',
      '규격3',
      '수량3',
      '단가3',
      '공급가액3',
      '세액3',
      '물품비고3',
      '일자4\n(2자리,작성년월 제외)',
      '품목4',
      '규격4',
      '수량4',
      '단가4',
      '공급가액4',
      '세액4',
      '물품비고4',
      '현금',
      '수표',
      '어음',
      '외상미수금',
      '영수(01)\n청구(02)'
    ]

    for (
      let columnIndex = 0;
      columnIndex < expectedHeaders.length;
      columnIndex += 1
    ) {
      const cellAddress = XLSX.utils.encode_cell({
        r: 0,
        c: columnIndex
      })

      const actualHeader =
        String(worksheet[cellAddress]?.v ?? '')

      if (actualHeader !== expectedHeaders[columnIndex]) {
        alert(
          '원본 양식의 제목이 변경되어 있습니다.\n\n' +
          '위치: ' + cellAddress + '\n' +
          '반드시 보내준 원본 파일을 다시 넣어주세요.'
        )
        return
      }
    }

    const templateCellStyles: Record<number, any> = {}

    for (let columnIndex = 0; columnIndex < 59; columnIndex += 1) {
      const templateAddress = XLSX.utils.encode_cell({
        r: 1,
        c: columnIndex
      })

      const templateCell = worksheet[templateAddress]

      if (templateCell?.s) {
        templateCellStyles[columnIndex] =
          JSON.parse(JSON.stringify(templateCell.s))
      }
    }

    const worksheetKeys = Object.keys(worksheet)

    worksheetKeys.forEach((key) => {
      if (key.startsWith('!')) return

      const decoded = XLSX.utils.decode_cell(key)

      if (decoded.r >= 1) {
        delete worksheet[key]
      }
    })

    const invoiceDay = writeDate.slice(6, 8)

    const outputRows = Array.from(summaryMap.values())
      .sort((first, second) => {
        const firstName =
          String(first.merchant.merchant_name || '')

        const secondName =
          String(second.merchant.merchant_name || '')

        return firstName.localeCompare(secondName, 'ko')
      })
      .map(({ merchant, feeTotal }) => {
        const supplyAmount =
          Math.round(Number(feeTotal || 0) / 1.1)

        const taxAmount =
          Number(feeTotal || 0) - supplyAmount

        const recipientNumber =
          cleanNumber(
            merchant.business_number ||
            merchant.resident_number
          )

        const recipientAddress = [
          merchant.address || '',
          merchant.address_detail || ''
        ]
          .filter(Boolean)
          .join(' ')
          .trim()

        return [
          '01',
          writeDate,
          supplierBusinessNumber,
          '',
          supplierBusinessName,
          supplierName,
          supplierAddress,
          supplierBusinessType,
          supplierBusinessItem,
          supplierEmail,
          recipientNumber,
          '',
          merchant.merchant_name || '',
          merchant.owner_name || '',
          recipientAddress,
          merchant.business_type || '',
          merchant.business_category || '',
          merchant.email || '',
          '',
          supplyAmount,
          taxAmount,
          '',
          invoiceDay,
          '결제승인수수료',
          '',
          '',
          '',
          supplyAmount,
          taxAmount,
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '01'
        ]
      })

    const writeCell = (
      rowIndex: number,
      columnIndex: number,
      value: string | number
    ) => {
      const address = XLSX.utils.encode_cell({
        r: rowIndex,
        c: columnIndex
      })

      const isNumber =
        typeof value === 'number'

      worksheet[address] = {
        t: isNumber ? 'n' : 's',
        v: value
      }

      const templateStyle =
        templateCellStyles[columnIndex]

      if (templateStyle) {
        worksheet[address].s =
          JSON.parse(JSON.stringify(templateStyle))
      }

      if (
        columnIndex === 2 ||
        columnIndex === 10
      ) {
        worksheet[address].t = 's'
        worksheet[address].z = '@'
      }
    }

    outputRows.forEach((row, outputIndex) => {
      const sheetRowIndex = outputIndex + 1

      for (
        let columnIndex = 0;
        columnIndex < 59;
        columnIndex += 1
      ) {
        writeCell(
          sheetRowIndex,
          columnIndex,
          row[columnIndex] ?? ''
        )
      }
    })

    worksheet['!ref'] =
      'A1:BG' + String(outputRows.length + 1)

    if (worksheet['!rows']?.[1]) {
      const templateRowSetting =
        JSON.parse(JSON.stringify(worksheet['!rows'][1]))

      worksheet['!rows'] = worksheet['!rows'] || []

      outputRows.forEach((_, index) => {
        worksheet['!rows']![index + 1] =
          JSON.parse(JSON.stringify(templateRowSetting))
      })
    }

    XLSX.writeFile(
      workbook,
      '수수료세금계산서_' +
        startDate +
        '_' +
        endDate +
        '.xlsx',
      {
        cellStyles: true,
        bookType: 'xlsx'
      }
    )

    let completeMessage =
      '수수료 세금계산서가 생성되었습니다.\n\n' +
      '생성 가맹점: ' +
      outputRows.length +
      '곳'

    if (excludedPaymentCount > 0) {
      completeMessage +=
        '\n가맹점 정보 미연결: ' +
        excludedPaymentCount +
        '건 제외'
    }

    alert(completeMessage)
}
const taxTextDownloadButton =
  document.querySelector<HTMLButtonElement>(
    '#tax-text-download-button'
  )

if (!taxTextDownloadButton) {
  alert('전산매체신고 내려받기 버튼을 찾지 못했습니다.')
  return
}

taxTextDownloadButton.onclick = async () => {
  const cleanNumber = (value: unknown) => {
    return String(value || '')
      .replace(/[^0-9]/g, '')
      .trim()
  }

  const paymentYear =
    cleanNumber(getTaxInputValue('#tax-year'))

  const quarter =
    cleanNumber(getTaxInputValue('#tax-quarter'))

  const officeCode =
    cleanNumber(getTaxInputValue('#tax-office-code'))

  const submitDate =
    cleanNumber(getTaxInputValue('#tax-submit-date'))

  const businessNumber =
    cleanNumber(getTaxInputValue('#tax-business-number'))

  const businessName =
    getTaxInputValue('#tax-business-name').trim()

  const periodStart =
    cleanNumber(getTaxInputValue('#tax-period-start'))

  const periodEnd =
    cleanNumber(getTaxInputValue('#tax-period-end'))

  const companyPhone =
    cleanNumber(getTaxInputValue('#tax-company-phone'))

  const companyMobile =
    cleanNumber(getTaxInputValue('#tax-company-mobile'))

  const companyEmail =
    getTaxInputValue('#tax-company-email').trim()

  if (paymentYear.length !== 4) {
    alert('귀속연도를 4자리로 입력해주세요.')
    return
  }

  if (!['1', '2', '3', '4'].includes(quarter)) {
    alert('분기를 1~4 중에서 선택해주세요.')
    return
  }

  if (officeCode.length !== 3) {
    alert('관할서코드를 3자리로 입력해주세요.')
    return
  }

  if (submitDate.length !== 8) {
    alert('제출년월일을 정확히 입력해주세요.')
    return
  }

  if (businessNumber.length !== 10) {
    alert('사업자등록번호를 정확히 입력해주세요.')
    return
  }

  if (!businessName) {
    alert('사업자상호를 입력해주세요.')
    return
  }

  if (
    periodStart.length !== 8 ||
    periodEnd.length !== 8
  ) {
    alert('결제기간 시작일과 종료일을 선택해주세요.')
    return
  }

  /*
   * 화면이 처음 열릴 때 iconv-lite가 실행되지 않도록
   * TXT 버튼을 눌렀을 때만 불러옵니다.
   */
  let iconv: any

  try {
    const bufferModule =
      await import('buffer')

    ;(globalThis as any).Buffer =
      bufferModule.Buffer

    const iconvModule =
      await import('iconv-lite')

    iconv =
      (iconvModule as any).default ||
      iconvModule
  } catch (error) {
    console.error(error)

    alert(
      'TXT 인코딩 모듈을 불러오지 못했습니다.\n\n' +
      '터미널에서 npm install iconv-lite buffer 를 실행해주세요.'
    )
    return
  }

  const byteLength = (value: string) => {
    return iconv.encode(value, 'cp949').length
  }

  /*
   * CP949 바이트 길이에 맞춰 글자를 자르고
   * 남는 자리를 공백으로 채웁니다.
   */
  const fitByteText = (
    value: unknown,
    length: number
  ) => {
    const text = String(value || '')
    let result = ''

    for (const character of text) {
      const nextText =
        result + character

      if (byteLength(nextText) > length) {
        break
      }

      result = nextText
    }

    const currentLength =
      byteLength(result)

    return (
      result +
      ' '.repeat(
        Math.max(0, length - currentLength)
      )
    )
  }

  const fitNumber = (
    value: unknown,
    length: number
  ) => {
    const numberText =
      cleanNumber(value)

    if (numberText.length >= length) {
      return numberText.slice(-length)
    }

    return numberText.padStart(length, '0')
  }

  /*
   * 신규 가맹점 아이디를 실제 신고파일의
   * 가맹점코드 자리인 12바이트로 만듭니다.
   *
   * 예:
   * MER1 → MER000000001
   * MER00400000 → MER000400000
   */
  const makeMerchantCode = (
    merchant: any
  ) => {
    const sourceCode =
      String(
        merchant.merchant_login_id ||
        merchant.cpid ||
        merchant.id ||
        ''
      ).trim()

    const codeNumber =
      cleanNumber(sourceCode)

    if (sourceCode.startsWith('MER')) {
      return (
        'CPID' +
        codeNumber.padStart(8, '0')
      ).slice(0, 12)
    }

    if (sourceCode.startsWith('CPID')) {
      return (
        'CPID' +
        codeNumber.padStart(8, '0')
      ).slice(0, 12)
    }

    return (
      'CPID' +
      codeNumber.padStart(8, '0')
    ).slice(0, 12)
  }

  const startIso =
    periodStart.slice(0, 4) +
    '-' +
    periodStart.slice(4, 6) +
    '-' +
    periodStart.slice(6, 8) +
    'T00:00:00'

  const endIso =
    periodEnd.slice(0, 4) +
    '-' +
    periodEnd.slice(4, 6) +
    '-' +
    periodEnd.slice(6, 8) +
    'T23:59:59.999'

  const {
    data: payments,
    error: paymentError
  } = await supabase
    .from('payments')
    .select(
      [
        'merchant_id',
        'amount',
        'status',
        'approved_at',
        'created_at'
      ].join(',')
    )
    .eq('status', 'paid')
    .gte('created_at', startIso)
    .lte('created_at', endIso)

  if (paymentError) {
    alert(
      'TXT 결제내역 조회 실패: ' +
      paymentError.message
    )
    return
  }

  if (!payments || payments.length === 0) {
    alert(
      '선택한 신고기간에 승인된 결제내역이 없습니다.'
    )
    return
  }

  const merchantIds = [
    ...new Set(
      payments
        .map((payment: any) =>
          Number(payment.merchant_id || 0)
        )
        .filter(
          (merchantId) =>
            merchantId > 0
        )
    )
  ]

  if (merchantIds.length === 0) {
    alert(
      '가맹점과 연결된 결제내역이 없습니다.'
    )
    return
  }

  const {
    data: merchants,
    error: merchantError
  } = await supabase
    .from('merchants')
    .select('*')
    .in('id', merchantIds)

  if (merchantError) {
    alert(
      'TXT 가맹점 정보 조회 실패: ' +
      merchantError.message
    )
    return
  }

  const merchantMap =
    new Map<number, any>()

  ;(merchants || []).forEach(
    (merchant: any) => {
      merchantMap.set(
        Number(merchant.id),
        merchant
      )
    }
  )

  const merchantMonthlyMap =
    new Map<
      string,
      {
        merchant: any
        paymentMonth: string
        paymentCount: number
        paymentAmount: number
      }
    >()

  let excludedPaymentCount = 0

  payments.forEach((payment: any) => {
    const merchantId =
      Number(payment.merchant_id || 0)

    const merchant =
      merchantMap.get(merchantId)

    if (!merchantId || !merchant) {
      excludedPaymentCount += 1
      return
    }

    const paymentDate =
      String(
        payment.approved_at ||
        payment.created_at ||
        ''
      )

    const paymentMonth =
      paymentDate
        .slice(0, 7)
        .replace(/-/g, '')

    if (paymentMonth.length !== 6) {
      excludedPaymentCount += 1
      return
    }

    const summaryKey =
      String(merchantId) +
      '-' +
      paymentMonth

    const currentSummary =
      merchantMonthlyMap.get(summaryKey)

    if (currentSummary) {
      currentSummary.paymentCount += 1
      currentSummary.paymentAmount +=
        Number(payment.amount || 0)
    } else {
      merchantMonthlyMap.set(
        summaryKey,
        {
          merchant,
          paymentMonth,
          paymentCount: 1,
          paymentAmount:
            Number(payment.amount || 0)
        }
      )
    }
  })

  if (merchantMonthlyMap.size === 0) {
    alert(
      'TXT에 작성할 가맹점 매출자료가 없습니다.'
    )
    return
  }

  /*
   * 실제 신고파일 HD 구조
   *
   * HD                2
   * 결제년도          4
   * 분기              1
   * 관할서코드        3
   * 제출년월일        8
   * 사업자등록번호   10
   * 사업자상호       40
   * 시작년월일        8
   * 종료년월일        8
   * 공백            146
   *
   * 총 230바이트
   */
  const headerLine =
    'HD' +
    fitNumber(paymentYear, 4) +
    fitNumber(quarter, 1) +
    fitNumber(officeCode, 3) +
    fitNumber(submitDate, 8) +
    fitNumber(businessNumber, 10) +
    fitByteText(businessName, 40) +
    fitNumber(periodStart, 8) +
    fitNumber(periodEnd, 8) +
    fitByteText('', 146)

  const headerLength =
    byteLength(headerLine)

  if (headerLength !== 230) {
    alert(
      'HD 길이 오류\n\n' +
      '현재 길이: ' +
      headerLength +
      '바이트'
    )
    return
  }

  const rows =
    Array.from(
      merchantMonthlyMap.values()
    ).sort((a, b) => {
      const firstNumber =
        cleanNumber(
          a.merchant.business_number ||
          a.merchant.resident_number
        )

      const secondNumber =
        cleanNumber(
          b.merchant.business_number ||
          b.merchant.resident_number
        )

      const numberResult =
        firstNumber.localeCompare(
          secondNumber
        )

      if (numberResult !== 0) {
        return numberResult
      }

      return a.paymentMonth.localeCompare(
        b.paymentMonth
      )
    })

  const lines: string[] = [
    headerLine
  ]

  let sequence = 1
  let totalPaymentCount = 0
  let totalPaymentAmount = 0

  const includedMerchantIds =
    new Set<number>()

  for (const row of rows) {
    const merchantBusinessNumber =
      cleanNumber(
        row.merchant.business_number
      )

    const merchantResidentNumber =
      cleanNumber(
        row.merchant.resident_number
      )

    const isBusiness =
      merchantBusinessNumber.length === 10

    const isResident =
      !isBusiness &&
      merchantResidentNumber.length === 13

    if (!isBusiness && !isResident) {
      excludedPaymentCount +=
        row.paymentCount
      continue
    }

    /*
     * 사업자
     * 사업자번호 10자리 + 공백 13자리
     *
     * 비사업자
     * 별표 10자리 + 주민번호 13자리
     */
    const merchantIdentity =
      isBusiness
        ? merchantBusinessNumber +
          ' '.repeat(13)
        : '**********' +
          merchantResidentNumber

    const ownerName =
      String(
        row.merchant.owner_name ||
        row.merchant.merchant_name ||
        ''
      ).trim()

    const merchantCode =
      makeMerchantCode(row.merchant)

    const paymentCount =
      Number(row.paymentCount || 0)

    const paymentAmount =
      Math.round(
        Number(row.paymentAmount || 0)
      )

    /*
     * 실제 신고파일 RD 구조
     *
     * RD                 2
     * 결제년도           4
     * 분기               1
     * 사업자등록번호    10
     * 일련번호           7
     * 신고대상번호      23
     * 대표자명          20
     * 가맹점코드        12
     * 결제년월           6
     * 공백               1
     * 결제건수           6
     * 금액1             12
     * 금액2             12
     * 결제금액          12
     * 합계금액          12
     * 회사명            20
     * 전화번호          11
     * 공백               2
     * 휴대폰번호        11
     * 이메일            40
     * 구분값             1
     * 공백               5
     *
     * 총 230바이트
     */
    const rdLine =
      'RD' +
      fitNumber(paymentYear, 4) +
      fitNumber(quarter, 1) +
      fitNumber(businessNumber, 10) +
      fitNumber(sequence, 7) +
      merchantIdentity +
      fitByteText(ownerName, 20) +
      fitByteText(merchantCode, 12) +
      fitNumber(row.paymentMonth, 6) +
      ' ' +
      fitNumber(paymentCount, 6) +
      fitNumber(0, 12) +
      fitNumber(0, 12) +
      fitNumber(paymentAmount * 10000, 12) +
      fitNumber(paymentAmount, 12) +
      fitByteText(businessName, 20) +
      fitNumber(companyPhone, 11) +
      '  ' +
      fitNumber(companyMobile, 11) +
      fitByteText(companyEmail, 40) +
      'C' +
      ' '.repeat(5)

    const rdLength =
      byteLength(rdLine)

    if (rdLength !== 230) {
      alert(
        'RD 길이 오류\n\n' +
        '가맹점: ' +
        ownerName +
        '\n결제년월: ' +
        row.paymentMonth +
        '\n현재 길이: ' +
        rdLength +
        '바이트'
      )
      return
    }

    lines.push(rdLine)

    includedMerchantIds.add(
      Number(row.merchant.id)
    )

    totalPaymentCount +=
      paymentCount

    totalPaymentAmount +=
      paymentAmount

    sequence += 1
  }

  if (lines.length === 1) {
    alert(
      '사업자번호 또는 주민번호가 등록된 가맹점이 없습니다.'
    )
    return
  }

  /*
   * 실제 신고파일 TD의 자리 구조
   *
   * TD                  2
   * 결제년도            4
   * 분기                1
   * 사업자등록번호     10
   * 신고 가맹점 수      7
   * 고정값 35           2
   * 전체 결제건수       8
   * 0 채움             18
   * 전체 결제금액      16
   * 전체 결제금액      15
   * 전체 결제건수       8
   * 전체 결제금액      16
   * 공백              123
   *
   * 총 230바이트
   */
  const tdLine =
    'TD' +
    fitNumber(paymentYear, 4) +
    fitNumber(quarter, 1) +
    fitNumber(businessNumber, 10) +
    fitNumber(
      includedMerchantIds.size,
      7
    ) +
    '35' +
    fitNumber(totalPaymentCount, 8) +
    fitNumber(0, 18) +
    fitNumber(totalPaymentAmount, 16) +
    fitNumber(totalPaymentAmount, 15) +
    fitNumber(totalPaymentCount, 8) +
    fitNumber(totalPaymentAmount, 16) +
    fitByteText('', 123)

  const tdLength =
    byteLength(tdLine)

  if (tdLength !== 230) {
    alert(
      'TD 길이 오류\n\n' +
      '현재 길이: ' +
      tdLength +
      '바이트'
    )
    return
  }

  lines.push(tdLine)

  const textContent =
    lines.join('\r\n')

  const encodedText =
    iconv.encode(
      textContent,
      'cp949'
    )

  const blob =
    new Blob(
      [
        new Uint8Array(
          encodedText
        )
      ],
      {
        type: 'text/plain'
      }
    )

  const fileName =
    'A_' +
    businessNumber +
    '_' +
    paymentYear +
    quarter +
    '_1.txt'

  const url =
    URL.createObjectURL(blob)

  const downloadLink =
    document.createElement('a')

  downloadLink.href = url
  downloadLink.download = fileName

  document.body.appendChild(
    downloadLink
  )

  downloadLink.click()

  document.body.removeChild(
    downloadLink
  )

  URL.revokeObjectURL(url)

  let completeMessage =
    '전산매체신고 파일이 생성되었습니다.\n\n' +
    '파일명: ' +
    fileName +
    '\nHD: 1건' +
    '\nRD: ' +
    String(lines.length - 2) +
    '건' +
    '\nTD: 1건'

  if (excludedPaymentCount > 0) {
    completeMessage +=
      '\n제외된 결제: ' +
      excludedPaymentCount +
      '건'
  }

  alert(completeMessage)
}
return
}

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
  if (summaryBox) summaryBox.innerHTML = ''
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
              
          
            let branchUsers = (adminUsers || []).filter((user) =>
              user.role === 'BRANCH'
            )
            
            let agencyUsers = (adminUsers || []).filter((user) =>
              user.role === 'AGENCY'
            )
            
            let managerUsers = (adminUsers || []).filter((user) =>
              user.role === 'MANAGER'
            )
            
            const currentOrganizationAdmin =
              (adminUsers || []).find((user) =>
                String(user.login_id || '').toUpperCase() === adminId.toUpperCase()
              )
            
            if (adminRole === 'BRANCH' && currentOrganizationAdmin) {
              branchUsers = branchUsers.filter((branch) =>
                Number(branch.id) === Number(currentOrganizationAdmin.id)
              )
            
              agencyUsers = agencyUsers.filter((agency) =>
                Number(agency.parent_admin_id) === Number(currentOrganizationAdmin.id)
              )
            
              const agencyIds = agencyUsers.map((agency) =>
                Number(agency.id)
              )
            
              managerUsers = managerUsers.filter((manager) =>
                agencyIds.includes(Number(manager.parent_admin_id)) ||
                Number(manager.parent_admin_id) === Number(currentOrganizationAdmin.id)
              )
            }
            
            if (adminRole === 'AGENCY' && currentOrganizationAdmin) {
              const currentAgencyId =
                Number(currentOrganizationAdmin.id)
            
              const parentBranchId =
                Number(currentOrganizationAdmin.parent_admin_id)
            
              branchUsers = branchUsers.filter((branch) =>
                Number(branch.id) === parentBranchId
              )
            
              agencyUsers = agencyUsers.filter((agency) =>
                Number(agency.id) === currentAgencyId
              )
            
              managerUsers = managerUsers.filter((manager) =>
                Number(manager.parent_admin_id) === currentAgencyId
              )
            }

           

            const { data: orgMerchants, error: orgMerchantError } = await supabase
            .from('merchants')
            .select(`
              id,
              merchant_name,
              settlement_cycle,
              branch_admin_id,
              agency_admin_id,
              manager_admin_id
            `)

if (orgMerchantError) {
  alert('조직 가맹점 정보를 불러오지 못했습니다: ' + orgMerchantError.message)
  return
}

const { data: orgPayments, error: orgPaymentError } = await supabase
  .from('payments')
  .select(`
    id,
    merchant_id,
    amount,
    status,
    approved_at,
    created_at
  `)
  .eq('status', 'paid')

if (orgPaymentError) {
  alert('조직 매출 정보를 불러오지 못했습니다: ' + orgPaymentError.message)
  return
}

const getOrgCommissionRate = (
  adminUser: any,
  settlementCycle: string
) => {
  if (!adminUser) return 0

  if (settlementCycle === '1일') {
    return Number(adminUser.commission_rate_1day || 0)
  }

  if (settlementCycle === '3일') {
    return Number(adminUser.commission_rate_3day || 0)
  }

  if (settlementCycle === '7일') {
    return Number(adminUser.commission_rate_7day || 0)
  }

  return Number(adminUser.commission_rate_4day || 0)
}

const getManagerMerchantCount = (managerId: number) =>
  (orgMerchants || []).filter((merchant) =>
    Number(merchant.manager_admin_id) === managerId
  ).length

  const getMerchantPaymentAmount = (merchantId: number) => {
    const now = new Date()
  
    const previousMonthStart = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1,
      0,
      0,
      0,
      0
    )
  
    const currentMonthStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
      0,
      0,
      0,
      0
    )
  
    return (orgPayments || [])
      .filter((payment) => {
        if (Number(payment.merchant_id) !== merchantId) {
          return false
        }
  
        const paymentDate = new Date(
          payment.approved_at || payment.created_at
        )
  
        return (
          paymentDate >= previousMonthStart &&
          paymentDate < currentMonthStart
        )
      })
      .reduce(
        (sum, payment) =>
          sum + Number(payment.amount || 0),
        0
      )
  }
  
  const getManagerCommissionSummary = (managerId: number) => {
    const manager = managerUsers.find((user) =>
      Number(user.id) === managerId
    )
  
    let totalSales = 0
    let commissionAmount = 0
  
    ;(orgMerchants || [])
      .filter((merchant) =>
        Number(merchant.manager_admin_id) === managerId
      )
      .forEach((merchant) => {
        const sales = getMerchantPaymentAmount(
          Number(merchant.id)
        )
  
        const rate = getOrgCommissionRate(
          manager,
          String(merchant.settlement_cycle || '4일')
        )
  
        totalSales += sales
        commissionAmount += Math.floor(
          sales * rate / 100
        )
      })
  
    return {
      totalSales,
      commissionAmount
    }
  }

  const getAgencyCommissionSummary = (agencyId: number) => {
  const agency = agencyUsers.find((user) =>
    Number(user.id) === agencyId
  )

  const managers = managerUsers.filter((manager) =>
    Number(manager.parent_admin_id) === agencyId
  )

  const managerIds = managers.map((manager) =>
    Number(manager.id)
  )

  let totalSales = 0
  let commissionAmount = 0

  ;(orgMerchants || []).forEach((merchant) => {
    const merchantAgencyId =
      Number(merchant.agency_admin_id || 0)

    const merchantManagerId =
      Number(merchant.manager_admin_id || 0)

    const belongsToAgency =
      merchantAgencyId === agencyId ||
      managerIds.includes(merchantManagerId)

    if (!belongsToAgency) return

    const sales =
      getMerchantPaymentAmount(Number(merchant.id))

    if (sales <= 0) return

    const settlementCycle =
      String(merchant.settlement_cycle || '4일')

    const agencyRate =
      getOrgCommissionRate(agency, settlementCycle)

    

    totalSales += sales

    commissionAmount += Math.floor(
      sales * agencyRate / 100
    )
  })

  return {
    totalSales,
    commissionAmount
  }
}

const getBranchCommissionSummary = (branchId: number) => {
  const branch = branchUsers.find((user) =>
    Number(user.id) === branchId
  )

  const agencies = agencyUsers.filter((agency) =>
    Number(agency.parent_admin_id) === branchId
  )

  const agencyIds = agencies.map((agency) =>
    Number(agency.id)
  )

  const managers = managerUsers.filter((manager) =>
    agencyIds.includes(Number(manager.parent_admin_id)) ||
    Number(manager.parent_admin_id) === branchId
  )

  const managerIds = managers.map((manager) =>
    Number(manager.id)
  )

  let totalSales = 0
  let commissionAmount = 0

  ;(orgMerchants || []).forEach((merchant) => {
    const merchantBranchId =
      Number(merchant.branch_admin_id || 0)

    const merchantAgencyId =
      Number(merchant.agency_admin_id || 0)

    const merchantManagerId =
      Number(merchant.manager_admin_id || 0)

    const belongsToBranch =
      merchantBranchId === branchId ||
      agencyIds.includes(merchantAgencyId) ||
      managerIds.includes(merchantManagerId)

    if (!belongsToBranch) return

    const sales =
      getMerchantPaymentAmount(Number(merchant.id))

    if (sales <= 0) return

    const settlementCycle =
      String(merchant.settlement_cycle || '4일')

    const branchRate =
      getOrgCommissionRate(branch, settlementCycle)

   

    totalSales += sales

    commissionAmount += Math.floor(
      sales * branchRate / 100
    )
  })

  return {
    totalSales,
    commissionAmount
  }
}

const getOrgAdminDisplayName = (adminUser: any) => {
  const name = String(adminUser?.admin_name || '').trim()
  const companyName = String(adminUser?.company_name || '').trim()

  if (companyName) {
    return companyName + (name ? '(' + name + ')' : '')
  }

  return name || '-'
}


const renderOrganizationHome = () => {

  const currentLoginId =
  sessionStorage.getItem('admin_id') || ''

if (adminRole === 'AGENCY') {
  const currentAgency = agencyUsers.find((agency) =>
    String(agency.login_id || '') === currentLoginId
  )

  if (!currentAgency || !summaryBox) {
    return
  }

  const managers = managerUsers.filter((manager) =>
    Number(manager.parent_admin_id) === Number(currentAgency.id)
  )

  const managerIds = managers.map((manager) =>
    Number(manager.id)
  )

  const merchantCount =
    (orgMerchants || []).filter((merchant) =>
      Number(merchant.agency_admin_id) === Number(currentAgency.id) ||
      managerIds.includes(Number(merchant.manager_admin_id))
    ).length

  const summary =
    getAgencyCommissionSummary(Number(currentAgency.id))

  summaryBox.innerHTML =
    '<div class="merchant-detail-header">' +
      '<h2>조직관리</h2>' +
      '<p>대리점 > 담당자 순서로 조회합니다.</p>' +
    '</div>' +

    '<div class="org-v2-wrap">' +
      '<div class="org-v2-breadcrumb">대리점</div>' +
      '<h3>내 대리점</h3>' +

      '<div class="org-v2-grid">' +
        '<button class="org-v2-card org-agency-v2" data-id="' + currentAgency.id + '">' +
          '<strong>🤝 ' + getOrgAdminDisplayName(currentAgency) + '</strong>' +
          '<span>담당자 ' + managers.length + '명</span>' +
          '<span>가맹점 ' + merchantCount + '개</span>' +
          '<span>총매출 ' + summary.totalSales.toLocaleString() + '원</span>' +
          '<strong>수수료 ' + summary.commissionAmount.toLocaleString() + '원</strong>' +
        '</button>' +
      '</div>' +

      '<div id="org-v2-detail-area"></div>' +
    '</div>'

  bindAgencyClick()
  return
}
 
  const branchCards = branchUsers.map((branch) => {
    const agencies = agencyUsers.filter((agency) =>
      Number(agency.parent_admin_id) === Number(branch.id)
    )

    const agencyIds = agencies.map((agency) => Number(agency.id))

    const managers = managerUsers.filter((manager) =>
      agencyIds.includes(Number(manager.parent_admin_id))
    )

    const merchantCount = (orgMerchants || []).filter((merchant) =>
      Number(merchant.branch_admin_id) === Number(branch.id)
    ).length

    const summary =
  getBranchCommissionSummary(Number(branch.id))

  return (
    '<button class="org-v2-card org-branch-v2" data-id="' + branch.id + '">' +
      '<strong>🏢 ' + getOrgAdminDisplayName(branch) + '</strong>' +
      '<span>대리점 ' + agencies.length + '개</span>' +
      '<span>담당자 ' + managers.length + '명</span>' +
      '<span>가맹점 ' + merchantCount + '개</span>' +
      '<span>총매출 ' + summary.totalSales.toLocaleString() + '원</span>' +
      '<strong>수수료 ' + summary.commissionAmount.toLocaleString() + '원</strong>' +
    '</button>'
  )
  }).join('')

  if (!summaryBox) return

  summaryBox.innerHTML =
    '<div class="merchant-detail-header">' +
      '<h2>조직관리</h2>' +
      '<p>본사 > 지사 > 대리점 > 담당자 순서로 조회합니다.</p>' +
    '</div>' +
    
    '<div class="org-v2-wrap">' +
      '<div class="org-v2-breadcrumb">본사</div>' +
      '<h3>지사 목록</h3>' +
      '<div class="org-v2-grid">' + branchCards + '</div>' +
      '<div id="org-v2-detail-area"></div>' +
    '</div>'

  bindBranchClick()
}

const bindBranchClick = () => {
  document.querySelectorAll<HTMLButtonElement>('.org-branch-v2')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const branchId = Number(button.dataset.id)
        const branch = branchUsers.find((item) => Number(item.id) === branchId)
        const agencies = agencyUsers.filter((agency) =>
          Number(agency.parent_admin_id) === branchId
        )

        const detailArea = document.querySelector<HTMLElement>('#org-v2-detail-area')
        if (!detailArea) return

        detailArea.innerHTML =
          '<div class="org-v2-breadcrumb">본사 > ' + (branch?.admin_name || '-') + '</div>' +
          '<div class="org-v2-toolbar">' +
            '<input id="org-agency-search" placeholder="대리점 검색" />' +
          '</div>' +
          '<div id="org-agency-list"></div>'

        

        const directBranchMerchants =
  (orgMerchants || []).filter((merchant) =>
    Number(merchant.branch_admin_id) === branchId &&
    !merchant.agency_admin_id &&
    !merchant.manager_admin_id
  )

if (directBranchMerchants.length > 0) {
  const merchantArea =
    document.querySelector<HTMLElement>('#org-v2-detail-area')

  if (merchantArea) {
    merchantArea.innerHTML +=
      '<h3>지사 직속 가맹점</h3>' +
      '<div class="org-v2-merchant-box">' +
        directBranchMerchants
          .slice(0, 20)
          .map((merchant, index) =>
            '<p>' +
              (index + 1) + '. ' +
              (merchant.merchant_name || '-') +
              ' (' +
              (merchant.id
                ? 'MER' + String(merchant.id).padStart(4, '0')
                : '-') +
              ')' +
            '</p>'
          )
          .join('') +
      '</div>'
  }
}

        const directManagers = managerUsers.filter((manager) =>
          Number(manager.parent_admin_id) === branchId
        )
        
        if (directManagers.length > 0) {
          const managerArea =
            document.querySelector<HTMLElement>('#org-v2-detail-area')
        
          if (managerArea) {
            managerArea.innerHTML +=
              '<h3>지사 직속 담당자</h3>' +
              '<div class="org-v2-list">' +
                directManagers.map((manager) =>
                  '<button class="org-v2-manager-row" data-id="' + manager.id + '">' +
                    '👤 ' + getOrgAdminDisplayName(manager) +
                    '<strong>' + getManagerMerchantCount(Number(manager.id)) + '</strong>' +
                  '</button>'
                ).join('') +
              '</div>'
          }
        
          bindManagerClick()
        }
        renderAgencyList(agencies)
      })
    })
}

const renderAgencyList = (agencies: any[]) => {
  const keyword =
    (document.querySelector<HTMLInputElement>('#org-agency-search')?.value || '').trim()

  const filtered = agencies.filter((agency) =>
    String(agency.admin_name || '').includes(keyword)
  )

  const listBox = document.querySelector<HTMLElement>('#org-agency-list')
  if (!listBox) return

  listBox.innerHTML =
    '<h3>대리점 목록</h3>' +
    '<div class="org-v2-grid">' +
    filtered.slice(0, 20).map((agency) => {
      const managers = managerUsers.filter((manager) =>
        Number(manager.parent_admin_id) === Number(agency.id)
      )
    
      const managerIds = managers.map((manager) =>
        Number(manager.id)
      )
    
      const merchantCount =
        (orgMerchants || []).filter((merchant) =>
          Number(merchant.agency_admin_id) === Number(agency.id) ||
          managerIds.includes(Number(merchant.manager_admin_id))
        ).length
    
      const summary =
        getAgencyCommissionSummary(Number(agency.id))
    
      return (
        '<button class="org-v2-card org-agency-v2" data-id="' + agency.id + '">' +
          '<strong>🤝 ' + getOrgAdminDisplayName(agency) + '</strong>' +
          '<span>담당자 ' + managers.length + '명</span>' +
          '<span>가맹점 ' + merchantCount + '개</span>' +
          '<span>총매출 ' + summary.totalSales.toLocaleString() + '원</span>' +
          '<strong>수수료 ' + summary.commissionAmount.toLocaleString() + '원</strong>' +
        '</button>'
      )
    }).join('') +
    '</div>'

    
  document.querySelector('#org-agency-search')
    ?.addEventListener('input', () => renderAgencyList(agencies))

  bindAgencyClick()

}

const bindAgencyClick = () => {
  document.querySelectorAll<HTMLButtonElement>('.org-agency-v2')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const agencyId = Number(button.dataset.id)

        const agency = agencyUsers.find((item) =>
          Number(item.id) === agencyId
        )

        const managers = managerUsers.filter((manager) =>
          Number(manager.parent_admin_id) === agencyId
        )

        const directAgencyMerchants =
          (orgMerchants || []).filter((merchant) =>
            Number(merchant.agency_admin_id) === agencyId &&
            !merchant.manager_admin_id
          )

        const detailArea =
          document.querySelector<HTMLElement>('#org-v2-detail-area')

        if (!detailArea) return

        detailArea.innerHTML =
          '<div class="org-v2-breadcrumb">' +
            '본사 > 대리점 > ' +
            getOrgAdminDisplayName(agency) +
          '</div>' +

          '<div class="org-v2-toolbar">' +
            '<input id="org-manager-search" placeholder="담당자 검색" />' +
          '</div>' +

          '<div id="org-manager-list"></div>' +

          (
            directAgencyMerchants.length > 0
              ? '<h3>대리점 직속 가맹점</h3>' +
                '<div class="org-v2-merchant-box">' +
                  directAgencyMerchants
                    .slice(0, 20)
                    .map((merchant, index) =>
                      '<p>' +
                        (index + 1) + '. ' +
                        (merchant.merchant_name || '-') +
                        ' (' +
                        (
                          merchant.id
                            ? 'MER' + String(merchant.id).padStart(4, '0')
                            : '-'
                        ) +
                        ')' +
                      '</p>'
                    )
                    .join('') +
                '</div>'
              : ''
          )

        renderManagerList(managers)
      })
    })
}

const renderManagerList = (managers: any[]) => {
  const keyword =
    (document.querySelector<HTMLInputElement>('#org-manager-search')?.value || '').trim()

  const filtered = managers.filter((manager) =>
    String(manager.admin_name || '').includes(keyword)
  )

  const listBox = document.querySelector<HTMLElement>('#org-manager-list')
  if (!listBox) return

  listBox.innerHTML =
    '<h3>담당자 목록</h3>' +
    '<div class="org-v2-list">' +
    filtered.slice(0, 20).map((manager) => {
      const summary =
        getManagerCommissionSummary(Number(manager.id))
    
      return (
        '<button class="org-v2-manager-row" data-id="' + manager.id + '">' +
          '<span>👤 ' + getOrgAdminDisplayName(manager) + '</span>' +
          '<span>가맹점 ' + getManagerMerchantCount(Number(manager.id)) + '개</span>' +
          '<span>총매출 ' + summary.totalSales.toLocaleString() + '원</span>' +
          '<strong>수수료 ' + summary.commissionAmount.toLocaleString() + '원</strong>' +
        '</button>'
      )
    }).join('')
    '</div>'


    document.querySelector('#org-manager-search')
    ?.addEventListener('input', () => {
      renderManagerList(managers)
    })

  bindManagerClick()
}

function bindManagerClick() {
  document.querySelectorAll<HTMLButtonElement>('.org-v2-manager-row')
    .forEach((button) => {

      button.onclick = () => {
        const managerId = Number(button.dataset.id)

        const manager =
          managerUsers.find(
            (item) => Number(item.id) === managerId
          )

        const merchantList =
          (orgMerchants || []).filter(
            (merchant) =>
              Number(merchant.manager_admin_id) === managerId
          )

        const outputArea =
          document.querySelector<HTMLElement>('#org-manager-list') ||
          document.querySelector<HTMLElement>('#org-v2-detail-area')

        if (!outputArea) return

        const managerSummary =
  getManagerCommissionSummary(managerId)

  outputArea.innerHTML =
  '<div class="org-v2-breadcrumb">' +
    '담당자 > ' + getOrgAdminDisplayName(manager) +
  '</div>' +

  '<div style="display:flex; gap:24px; margin:14px 0 18px 0; font-weight:700;">' +
    '<span>총매출 ' + managerSummary.totalSales.toLocaleString() + '원</span>' +
    '<span>수수료 ' + managerSummary.commissionAmount.toLocaleString() + '원</span>' +
  '</div>' +

  '<h3>담당 가맹점</h3>' +
  '<div class="org-v2-merchant-box">' +
    (
      merchantList.length === 0
        ? '<p>연결된 가맹점이 없습니다.</p>'
        : merchantList
            .slice(0, 20)
            .map(
              (merchant, index) =>
                '<p>' +
                  (index + 1) + '. ' +
                  (merchant.merchant_name || '-') +
                  ' (' +
                  (merchant.id
                    ? 'MER' + String(merchant.id).padStart(4, '0')
                    : '-') +
                  ')' +
                '</p>'
            )
            .join('')
    ) +
  '</div>'
      }
    })
}

renderOrganizationHome()

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

          
    if (page === 'merchant') {
      const subMenu = document.querySelector('.admin-sub-menu')
const titleBox = document.querySelector('.admin-title')

if (subMenu) {
  subMenu.innerHTML =
    '<span class="sub-tab" data-sub="merchant-add">업체/가맹점 등록</span>' +
    (
      adminRole === 'MANAGER'
        ? ''
        : '<span class="sub-tab" data-sub="admin-users">담당자관리</span>'
    )
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

    

    if (!summaryBox) return

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

    phone: (document.querySelector<HTMLInputElement>('#admin-phone')?.value || '').trim(),
    email: (document.querySelector<HTMLInputElement>('#admin-email')?.value || '').trim(),
    resident_number: (document.querySelector<HTMLInputElement>('#admin-resident-number')?.value || '').trim(),

    company_name: (document.querySelector<HTMLInputElement>('#admin-company-name')?.value || '').trim(),
    business_number: (document.querySelector<HTMLInputElement>('#admin-business-number')?.value || '').trim(),

    commission_rate_1day: Number(
      document.querySelector<HTMLInputElement>('#admin-commission-rate-1day')?.value || 0
    ),
    
    commission_rate_3day: Number(
      document.querySelector<HTMLInputElement>('#admin-commission-rate-3day')?.value || 0
    ),
    
    commission_rate_4day: Number(
      document.querySelector<HTMLInputElement>('#admin-commission-rate-4day')?.value || 0
    ),
    
    commission_rate_7day: Number(
      document.querySelector<HTMLInputElement>('#admin-commission-rate-7day')?.value || 0
    ),

    bank_name: (document.querySelector<HTMLInputElement>('#admin-bank-name')?.value || '').trim(),
    account_number: (document.querySelector<HTMLInputElement>('#admin-account-number')?.value || '').trim(),
    account_holder: (document.querySelector<HTMLInputElement>('#admin-account-holder')?.value || '').trim(),

    memo: (document.querySelector<HTMLTextAreaElement>('#admin-memo')?.value || '').trim(),

    status: '사용중',
    parent_admin_id: Number(
      document.querySelector<HTMLSelectElement>('#admin-parent-admin-id')?.value || 0
    ),
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
            '<label>소속 대리점</label><select id="agency-name"><option>불러오는 중...</option></select>' +
            '<label>사용 PG사</label>' +
'<div class="merchant-pg-select-grid">' +

  '<div class="merchant-pg-select-item">' +
    '<span>온라인결제 1</span>' +
    '<select id="online-pg-company-1">' +
      '<option value="">사용안함</option>' +
      '<option value="토스페이먼츠">토스페이먼츠</option>' +
      '<option value="코페이">코페이</option>' +
      '<option value="다우데이타">다우데이타</option>' +
    '</select>' +
  '</div>' +

  '<div class="merchant-pg-select-item">' +
    '<span>온라인결제 2</span>' +
    '<select id="online-pg-company-2">' +
      '<option value="">사용안함</option>' +
      '<option value="토스페이먼츠">토스페이먼츠</option>' +
      '<option value="코페이">코페이</option>' +
      '<option value="다우데이타">다우데이타</option>' +
    '</select>' +
  '</div>' +

  '<div class="merchant-pg-select-item">' +
    '<span>수기결제</span>' +
    '<select id="manual-pg-company">' +
      '<option value="">사용안함</option>' +
      '<option value="코페이">코페이</option>' +
      '<option value="다우데이타">다우데이타</option>' +
    '</select>' +
  '</div>' +

'</div>' +
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

  document.querySelector<HTMLButtonElement>('.address-search-btn')
  ?.addEventListener('click', () => {

    new (window as any).daum.Postcode({
      oncomplete: (data: any) => {

        const zipcode =
          document.querySelector<HTMLInputElement>('#zipcode')

        const address =
          document.querySelector<HTMLInputElement>('#address')

        const addressDetail =
          document.querySelector<HTMLInputElement>('#address_detail')

        if (zipcode) {
          zipcode.value = data.zonecode
        }

        if (address) {
          address.value =
            data.roadAddress || data.jibunAddress
        }

        addressDetail?.focus()
      }
    }).open()
  })

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
const onlinePgCompany1 =
  (
    document.querySelector<HTMLSelectElement>(
      '#online-pg-company-1'
    )?.value || ''
  ).trim()

const onlinePgCompany2 =
  (
    document.querySelector<HTMLSelectElement>(
      '#online-pg-company-2'
    )?.value || ''
  ).trim()

const manualPgCompany =
  (
    document.querySelector<HTMLSelectElement>(
      '#manual-pg-company'
    )?.value || ''
  ).trim()

const pgCompany =
  onlinePgCompany1 ||
  onlinePgCompany2 ||
  manualPgCompany ||
  ''
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
  online_pg_company_1: onlinePgCompany1,
  online_pg_company_2: onlinePgCompany2,
  manual_pg_company: manualPgCompany,
  
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

  const { data: allAdminUsers, error } = await supabase
  .from('admin_users')
  .select('*')
  .order('id', { ascending: true })

if (error) {
  alert('담당자 조회 실패: ' + error.message)
  return
}

let adminUsers = allAdminUsers || []

const currentAdminUser =
  adminUsers.find((user) =>
    String(user.login_id || '').toUpperCase() === adminId.toUpperCase()
  )

if (adminRole === 'BRANCH' && currentAdminUser) {
  const branchId = Number(currentAdminUser.id)

  const agencyIds =
    adminUsers
      .filter((user) =>
        user.role === 'AGENCY' &&
        Number(user.parent_admin_id) === branchId
      )
      .map((user) => Number(user.id))

  adminUsers = adminUsers.filter((user) =>
    Number(user.id) === branchId ||
    agencyIds.includes(Number(user.id)) ||
    (
      user.role === 'MANAGER' &&
      (
        Number(user.parent_admin_id) === branchId ||
        agencyIds.includes(Number(user.parent_admin_id))
      )
    )
  )
}

if (adminRole === 'AGENCY' && currentAdminUser) {
  const agencyId = Number(currentAdminUser.id)

  adminUsers = adminUsers.filter((user) =>
    Number(user.id) === agencyId ||
    (
      user.role === 'MANAGER' &&
      Number(user.parent_admin_id) === agencyId
    )
  )
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

    '<label>휴대폰번호</label>' +
'<input id="edit-admin-phone" value="' + (adminUser.phone || '') + '" placeholder="010-0000-0000" />' +

'<label>이메일</label>' +
'<input id="edit-admin-email" value="' + (adminUser.email || '') + '" />' +

'<label>주민등록번호</label>' +
'<input id="edit-admin-resident-number" value="' + (adminUser.resident_number || '') + '" />' +

'<label>회사명</label>' +
'<input id="edit-admin-company-name" value="' + (adminUser.company_name || '') + '" />' +

'<label>사업자번호</label>' +
'<input id="edit-admin-business-number" value="' + (adminUser.business_number || '') + '" />' +

'<label>1일 정산 수수료율(%)</label>' +
'<input id="edit-admin-commission-rate-1day" type="number" step="0.01" min="0" max="100" value="' + (adminUser.commission_rate_1day || 0) + '" />' +

'<label>3일 정산 수수료율(%)</label>' +
'<input id="edit-admin-commission-rate-3day" type="number" step="0.01" min="0" max="100" value="' + (adminUser.commission_rate_3day || 0) + '" />' +

'<label>4일 정산 수수료율(%)</label>' +
'<input id="edit-admin-commission-rate-4day" type="number" step="0.01" min="0" max="100" value="' + (adminUser.commission_rate_4day || 0) + '" />' +

'<label>7일 정산 수수료율(%)</label>' +
'<input id="edit-admin-commission-rate-7day" type="number" step="0.01" min="0" max="100" value="' + (adminUser.commission_rate_7day || 0) + '" />' +

'<label>은행명</label>' +
'<input id="edit-admin-bank-name" value="' + (adminUser.bank_name || '') + '" />' +

'<label>계좌번호</label>' +
'<input id="edit-admin-account-number" value="' + (adminUser.account_number || '') + '" />' +

'<label>예금주</label>' +
'<input id="edit-admin-account-holder" value="' + (adminUser.account_holder || '') + '" />' +

'<label>메모</label>' +
'<textarea id="edit-admin-memo">' + (adminUser.memo || '') + '</textarea>' +

    '<label>상태</label>' +
'<select id="edit-admin-status" ' + (adminUser.login_id === 'NXGMASTER16' ? 'disabled' : '') + '>' +
  '<option value="사용중" ' + (adminUser.status === '사용중' ? 'selected' : '') + '>사용중</option>' +
  '<option value="사용정지" ' + (adminUser.status === '사용정지' ? 'selected' : '') + '>사용정지</option>' +
  '<option value="퇴사" ' + (adminUser.status === '퇴사' ? 'selected' : '') + '>퇴사</option>' +
'</select>' +

'<label>상위조직</label>' +
'<select id="edit-parent-admin-id">' +
  '<option value="">선택</option>' +
'</select>' +

'</div>' +

  '<div class="merchant-detail-actions">' +
    '<button id="safe-update-admin-user" class="merchant-save-btn" data-id="' + adminUser.id + '">저장</button>' +
    '<button id="safe-cancel-admin-user-edit" class="merchant-close-btn">취소</button>' +
  '</div>'

  const editParentSelect =
  document.querySelector<HTMLSelectElement>('#edit-parent-admin-id')

if (editParentSelect) {
  editParentSelect.innerHTML = '<option value="">선택</option>'

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

      if (Number(adminUser.parent_admin_id) === Number(user.id)) {
        option.selected = true
      }

      editParentSelect.appendChild(option)
    })
}

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

      const newPhone =
  (document.querySelector<HTMLInputElement>('#edit-admin-phone')?.value || '').trim()
      
  const newEmail =
  (document.querySelector<HTMLInputElement>('#edit-admin-email')?.value || '').trim()

const newResidentNumber =
  (document.querySelector<HTMLInputElement>('#edit-admin-resident-number')?.value || '').trim()

const newCompanyName =
  (document.querySelector<HTMLInputElement>('#edit-admin-company-name')?.value || '').trim()

const newBusinessNumber =
  (document.querySelector<HTMLInputElement>('#edit-admin-business-number')?.value || '').trim()



const newBankName =
  (document.querySelector<HTMLInputElement>('#edit-admin-bank-name')?.value || '').trim()

const newAccountNumber =
  (document.querySelector<HTMLInputElement>('#edit-admin-account-number')?.value || '').trim()

const newAccountHolder =
  (document.querySelector<HTMLInputElement>('#edit-admin-account-holder')?.value || '').trim()

const newMemo =
  (document.querySelector<HTMLTextAreaElement>('#edit-admin-memo')?.value || '').trim()

    const newStatus =
      (document.querySelector<HTMLSelectElement>('#edit-admin-status')?.value || adminUser.status).trim()

      const newParentAdminId =
  Number(
    document.querySelector<HTMLSelectElement>('#edit-parent-admin-id')
      ?.value || 0
  )
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
      password: newPassword,
      phone: newPhone,
      email: newEmail,
      resident_number: newResidentNumber,
      company_name: newCompanyName,
      business_number: newBusinessNumber,

      commission_rate_1day: Number(
        document.querySelector<HTMLInputElement>(
          '#edit-admin-commission-rate-1day'
        )?.value || 0
      ),

      commission_rate_3day: Number(
        document.querySelector<HTMLInputElement>(
          '#edit-admin-commission-rate-3day'
        )?.value || 0
      ),

      commission_rate_4day: Number(
        document.querySelector<HTMLInputElement>(
          '#edit-admin-commission-rate-4day'
        )?.value || 0
      ),

      commission_rate_7day: Number(
        document.querySelector<HTMLInputElement>(
          '#edit-admin-commission-rate-7day'
        )?.value || 0
      ),

      bank_name: newBankName,
      account_number: newAccountNumber,
      account_holder: newAccountHolder,
      memo: newMemo
    }
  : {
      admin_name: newName,
      password: newPassword,
      phone: newPhone,
      email: newEmail,
      resident_number: newResidentNumber,
      company_name: newCompanyName,
      business_number: newBusinessNumber,

      commission_rate_1day: Number(
        document.querySelector<HTMLInputElement>(
          '#edit-admin-commission-rate-1day'
        )?.value || 0
      ),

      commission_rate_3day: Number(
        document.querySelector<HTMLInputElement>(
          '#edit-admin-commission-rate-3day'
        )?.value || 0
      ),

      commission_rate_4day: Number(
        document.querySelector<HTMLInputElement>(
          '#edit-admin-commission-rate-4day'
        )?.value || 0
      ),

      commission_rate_7day: Number(
        document.querySelector<HTMLInputElement>(
          '#edit-admin-commission-rate-7day'
        )?.value || 0
      ),

      bank_name: newBankName,
      account_number: newAccountNumber,
      account_holder: newAccountHolder,
      memo: newMemo,
      role: newRole,
      status: newStatus,
      login_id: newLoginId,
      parent_admin_id: newParentAdminId
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

'<label>휴대폰번호</label>' +
'<input id="admin-phone" placeholder="010-0000-0000" />' +

'<label>이메일</label>' +
'<input id="admin-email" />' +

'<label>주민등록번호</label>' +
'<input id="admin-resident-number" />' +

'<label>회사명</label>' +
'<input id="admin-company-name" />' +

'<label>사업자번호</label>' +
'<input id="admin-business-number" />' +

'<label>1일 정산 수수료율(%)</label>' +
'<input id="admin-commission-rate-1day" type="number" step="0.01" min="0" max="100" value="0" />' +

'<label>3일 정산 수수료율(%)</label>' +
'<input id="admin-commission-rate-3day" type="number" step="0.01" min="0" max="100" value="0" />' +

'<label>4일 정산 수수료율(%)</label>' +
'<input id="admin-commission-rate-4day" type="number" step="0.01" min="0" max="100" value="0" />' +

'<label>7일 정산 수수료율(%)</label>' +
'<input id="admin-commission-rate-7day" type="number" step="0.01" min="0" max="100" value="0" />' +

'<label>은행명</label>' +
'<input id="admin-bank-name" />' +

'<label>계좌번호</label>' +
'<input id="admin-account-number" />' +

'<label>예금주</label>' +
'<input id="admin-account-holder" />' +

'<label>메모</label>' +
'<textarea id="admin-memo"></textarea>' +

'</div>' +

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

      const residentNumber =
      (document.querySelector<HTMLInputElement>('#admin-resident-number')?.value || '').trim()
    
    const companyName =
      (document.querySelector<HTMLInputElement>('#admin-company-name')?.value || '').trim()
    
    const businessNumber =
      (document.querySelector<HTMLInputElement>('#admin-business-number')?.value || '').trim()
    
    const commissionRate =
      Number(
        document.querySelector<HTMLInputElement>('#admin-commission-rate')
          ?.value || 0
      )
    
    const bankName =
      (document.querySelector<HTMLInputElement>('#admin-bank-name')?.value || '').trim()
    
    const accountNumber =
      (document.querySelector<HTMLInputElement>('#admin-account-number')?.value || '').trim()
    
    const accountHolder =
      (document.querySelector<HTMLInputElement>('#admin-account-holder')?.value || '').trim()
    
    const memo =
      (document.querySelector<HTMLTextAreaElement>('#admin-memo')?.value || '').trim()

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
        parent_admin_id: parentAdminId,
      
        resident_number: residentNumber,
        company_name: companyName,
        business_number: businessNumber,
        commission_rate: commissionRate,
        bank_name: bankName,
        account_number: accountNumber,
        account_holder: accountHolder,
        memo: memo
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

if (adminRole === 'MANAGER') {
  const { data: currentManager, error: managerError } = await supabase
    .from('admin_users')
    .select('id')
    .eq('login_id', adminId)
    .single()

  if (managerError || !currentManager) {
    alert('담당자 정보를 확인하지 못했습니다.')
    return
  }

  merchants = merchants.filter((merchant) =>
    Number(merchant.manager_admin_id) === Number(currentManager.id)
  )
}

if (adminRole === 'AGENCY' || adminRole === 'BRANCH') {
  const { data: currentAdmin, error: currentAdminError } = await supabase
    .from('admin_users')
    .select('id')
    .eq('login_id', adminId)
    .single()

  if (currentAdminError || !currentAdmin) {
    alert('조직 정보를 확인하지 못했습니다.')
    return
  }

  if (adminRole === 'AGENCY') {
    merchants = merchants.filter((merchant) =>
      Number(merchant.agency_admin_id) === Number(currentAdmin.id)
    )
  }

  if (adminRole === 'BRANCH') {
    merchants = merchants.filter((merchant) =>
      Number(merchant.branch_admin_id) === Number(currentAdmin.id)
    )
  }
}

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

const pageSizeSelect =
  document.querySelector<HTMLSelectElement>('#admin-page-size')

const savedAdminPageSize =
  sessionStorage.getItem('admin_page_size') || '10'

if (pageSizeSelect) {
  pageSizeSelect.value = savedAdminPageSize
}

const adminPageSize =
  Number(savedAdminPageSize) || 10

const sortedMerchants = [...merchants].sort(
  (a, b) => Number(b.id || 0) - Number(a.id || 0)
)

const totalMerchantPages =
  Math.max(
    1,
    Math.ceil(sortedMerchants.length / adminPageSize)
  )

let merchantCurrentPage =
  Number(
    sessionStorage.getItem('merchant_admin_page') || '1'
  )

if (
  merchantCurrentPage < 1 ||
  merchantCurrentPage > totalMerchantPages
) {
  merchantCurrentPage = 1
}

const merchantStartIndex =
  (merchantCurrentPage - 1) * adminPageSize

merchants = sortedMerchants.slice(
  merchantStartIndex,
  merchantStartIndex + adminPageSize
)

      const summaryBox = document.querySelector('.admin-summary')
      
      const tableHead = document.querySelector('.admin-table thead')
      
      const paymentTableBody =
  document.querySelector<HTMLTableSectionElement>('#paymentTableBody')!
  

      
  let allMerchantsQuery = supabase
  .from('merchants')
  .select('status, manager_admin_id')

if (adminRole === 'MANAGER') {
  const { data: currentManager, error: managerSummaryError } = await supabase
    .from('admin_users')
    .select('id')
    .eq('login_id', adminId)
    .single()

  if (managerSummaryError || !currentManager) {
    alert('담당자 정보를 확인하지 못했습니다.')
    return
  }

  allMerchantsQuery =
    allMerchantsQuery.eq('manager_admin_id', currentManager.id)
}

const { data: allMerchants } = await allMerchantsQuery

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
      '<div style="margin-top:16px; display:flex; gap:8px;">' +
  '<button id="copy-merchant-apply-link" class="merchant-search-btn">🔗 가입신청 링크 생성</button>' +
  '<button id="merchant-bulk-check" class="merchant-search-btn">가맹점일괄조회</button>' +
'</div>'
  }
  
  document.querySelector('#copy-merchant-apply-link')
    ?.addEventListener('click', async () => {
      const applyUrl =
        window.location.origin + '/merchant-apply'
  
      await navigator.clipboard.writeText(applyUrl)
  
      alert('가입신청 링크가 복사되었습니다.')
    })
      
    document.querySelector('#merchant-bulk-check')
  ?.addEventListener('click', () => {

    const existingModal =
      document.querySelector('#merchant-bulk-check-modal')

    if (existingModal) {
      existingModal.remove()
    }

    const modal = document.createElement('div')
    modal.id = 'merchant-bulk-check-modal'

    modal.innerHTML = `
      <div class="merchant-bulk-check-backdrop">
        <div class="merchant-bulk-check-box">

          <h3>가맹점일괄조회</h3>

          <p>
            PG사 메일 내용을 그대로 붙여넣어 주세요.
          </p>

          <textarea
            id="merchant-bulk-check-input"
            placeholder="가맹점명, 사업자번호, 생년월일 등이 포함된 내용을 그대로 붙여넣어 주세요."
          ></textarea>

          <div class="merchant-bulk-check-actions">
            <button id="merchant-bulk-check-search" class="merchant-search-btn">
              조회
            </button>

            <button id="merchant-bulk-check-close" class="merchant-close-btn">
              닫기
            </button>
          </div>

          <div id="merchant-bulk-check-result"></div>

        </div>
      </div>
    `

    document.body.appendChild(modal)

    document.querySelector('#merchant-bulk-check-close')
      ?.addEventListener('click', () => {
        modal.remove()
      })

      document.querySelector('#merchant-bulk-check-search')
  ?.addEventListener('click', async () => {

    const input =
      document.querySelector<HTMLTextAreaElement>('#merchant-bulk-check-input')

    const resultBox =
      document.querySelector<HTMLDivElement>('#merchant-bulk-check-result')

    if (!input || !resultBox) return

    const rawText = input.value.trim()

    if (!rawText) {
      alert('조회할 내용을 붙여넣어 주세요.')
      return
    }

    const businessNumbers =
  rawText.match(/\b(?:\d{3}-\d{2}-\d{5}|\d{10})\b/g) || []

const residentNumbers =
  rawText.match(/\b(?:\d{6}-\d|\d{7})\b/g) || []

    const normalizedBusinessNumbers =
      [...new Set(
        businessNumbers.map(value =>
          value.replace(/[^0-9]/g, '')
        )
      )]

    const normalizedResidentNumbers =
      [...new Set(
        residentNumbers.map(value =>
          value.replace(/[^0-9]/g, '')
        )
      )]

    if (
      normalizedBusinessNumbers.length === 0 &&
      normalizedResidentNumbers.length === 0
    ) {
      resultBox.innerHTML =
        '<div style="padding:12px;">조회 가능한 사업자번호 또는 식별번호가 없습니다.</div>'
      return
    }

    const { data: merchants, error } = await supabase
      .from('merchants')
      .select('id, merchant_name, business_number, resident_number, status')

    if (error) {
      alert('가맹점 조회 실패: ' + error.message)
      return
    }

    const matchedMerchants =
      (merchants || []).filter((merchant: any) => {

        const businessNumber =
          String(merchant.business_number || '')
            .replace(/[^0-9]/g, '')

        const residentNumber =
          String(merchant.resident_number || '')
            .replace(/[^0-9]/g, '')

        const businessMatched =
          businessNumber &&
          normalizedBusinessNumbers.includes(businessNumber)

        const residentMatched =
          residentNumber &&
          normalizedResidentNumbers.some(number =>
            residentNumber.startsWith(number)
          )

        return businessMatched || residentMatched
      })

    if (matchedMerchants.length === 0) {
      resultBox.innerHTML =
        '<div style="padding:14px; font-weight:700;">' +
          '일치하는 가맹점이 없습니다.' +
        '</div>'
      return
    }

    resultBox.innerHTML =
      '<div style="margin-bottom:10px; font-weight:700;">' +
        '일치 가맹점 ' + matchedMerchants.length + '건' +
      '</div>' +

      matchedMerchants.map((merchant: any) => {

        const businessNumber =
          merchant.business_number || ''

        const residentNumber =
          merchant.resident_number
            ? String(merchant.resident_number).slice(0, 8)
            : ''

        return (
          '<div style="' +
            'padding:10px 12px;' +
            'margin-bottom:8px;' +
            'border:1px solid #f0b3b3;' +
            'border-radius:8px;' +
            'background:#fff6f6;' +
          '">' +

            '<strong>' +
              (merchant.merchant_name || '-') +
            '</strong>' +

            '<div style="margin-top:4px; font-size:12px; font-weight:700;">' +
  '가맹점ID: MER' + String(merchant.id).padStart(4, '0') +
'</div>' +

            '<div style="margin-top:4px; font-size:12px;">' +
              (businessNumber
                ? '사업자번호: ' + businessNumber
                : '식별번호: ' + residentNumber) +
            '</div>' +

            '<div style="margin-top:2px; font-size:12px;">' +
              '상태: ' + (merchant.status || '-') +
            '</div>' +

          '</div>'
        )
      }).join('')
  })
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
      
      document.querySelector('#merchant-pagination')?.remove()

      const merchantPagination =
        document.createElement('div')
      
      merchantPagination.id = 'merchant-pagination'
      merchantPagination.className = 'admin-pagination'
      merchantPagination.style.margin = '0 auto'
      
      merchantPagination.innerHTML =
        '<button id="merchant-prev-page"' +
          (merchantCurrentPage <= 1 ? ' disabled' : '') +
        '>' +
          '이전' +
        '</button>' +
      
        '<span>' +
          merchantCurrentPage +
          ' / ' +
          totalMerchantPages +
        '</span>' +
      
        '<button id="merchant-next-page"' +
          (
            merchantCurrentPage >= totalMerchantPages
              ? ' disabled'
              : ''
          ) +
        '>' +
          '다음' +
        '</button>'
      
        const merchantTableTop =
  document.querySelector('.admin-table-top')

merchantTableTop?.appendChild(
  merchantPagination
)
      
      document.querySelector('#merchant-prev-page')
        ?.addEventListener('click', () => {
          if (merchantCurrentPage <= 1) return
      
          sessionStorage.setItem(
            'merchant_admin_page',
            String(merchantCurrentPage - 1)
          )
      
          location.reload()
        })
        document.querySelector('#merchant-next-page')
        ?.addEventListener('click', () => {
          if (
            merchantCurrentPage >= totalMerchantPages
          ) return
      
          sessionStorage.setItem(
            'merchant_admin_page',
            String(merchantCurrentPage + 1)
          )
      
          location.reload()
        })

        pageSizeSelect?.addEventListener('change', () => {
          sessionStorage.setItem(
            'admin_page_size',
            pageSizeSelect.value
          )
        
          sessionStorage.setItem(
            'merchant_admin_page',
            '1'
          )
        
          location.reload()
        })
  
      merchants
      .forEach((merchant, index) => {
       
    const tr = document.createElement('tr')
      
        tr.innerHTML =
  '<td>' + (merchantStartIndex + index + 1) + '</td>'+
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
  button.addEventListener('click', async () => {
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
'<select id="register_type"' +
  ((adminRole === 'AGENCY' || adminRole === 'MANAGER') ? ' disabled' : '') +
'>' +
  '<option ' + (merchant.register_type === '가맹점' ? 'selected' : '') + '>가맹점</option>' +
  '<option ' + (merchant.register_type === '담당자' ? 'selected' : '') + '>담당자</option>' +
  '<option ' + (merchant.register_type === '대리점' ? 'selected' : '') + '>대리점</option>' +
'</select>' +

'<label>담당자</label>' +
'<div class="manager-select-group">' +

  '<select id="branch_admin_select"' +
  ((adminRole === 'AGENCY' || adminRole === 'MANAGER') ? ' disabled' : '') +
'>' +
    '<option value="">지사 선택</option>' +
  '</select>' +

  '<select id="agency_admin_select"' +
  ((adminRole === 'AGENCY' || adminRole === 'MANAGER') ? ' disabled' : '') +
'>' +
    '<option value="">대리점 선택</option>' +
  '</select>' +

  '<select id="manager_admin_id"' +
  ((adminRole === 'AGENCY' || adminRole === 'MANAGER') ? ' disabled' : '') +
'>' +
    '<option value="">담당자 선택</option>' +
  '</select>' +

'</div>' +

'<label>사용 PG사</label>' +
'<div class="merchant-pg-select-grid">' +

  '<div class="merchant-pg-select-item">' +
    '<span>온라인결제 1</span>' +
    '<select id="online-pg-company-1"' +
  ((adminRole === 'AGENCY' || adminRole === 'MANAGER') ? ' disabled' : '') +
'>' +
      '<option value="">사용안함</option>' +
      '<option value="토스페이먼츠" ' +
        (merchant.online_pg_company_1 === '토스페이먼츠' ? 'selected' : '') +
      '>토스페이먼츠</option>' +
      '<option value="코페이" ' +
        (merchant.online_pg_company_1 === '코페이' ? 'selected' : '') +
      '>코페이</option>' +
      '<option value="다우데이타" ' +
        (merchant.online_pg_company_1 === '다우데이타' ? 'selected' : '') +
      '>다우데이타</option>' +
    '</select>' +
  '</div>' +

  '<div class="merchant-pg-select-item">' +
    '<span>온라인결제 2</span>' +
    '<select id="online-pg-company-2"' +
  ((adminRole === 'AGENCY' || adminRole === 'MANAGER') ? ' disabled' : '') +
'>' +
      '<option value="">사용안함</option>' +
      '<option value="토스페이먼츠" ' +
        (merchant.online_pg_company_2 === '토스페이먼츠' ? 'selected' : '') +
      '>토스페이먼츠</option>' +
      '<option value="코페이" ' +
        (merchant.online_pg_company_2 === '코페이' ? 'selected' : '') +
      '>코페이</option>' +
      '<option value="다우데이타" ' +
        (merchant.online_pg_company_2 === '다우데이타' ? 'selected' : '') +
      '>다우데이타</option>' +
    '</select>' +
  '</div>' +

  '<div class="merchant-pg-select-item">' +
    '<span>수기결제</span>' +
    '<select id="manual-pg-company"' +
  ((adminRole === 'AGENCY' || adminRole === 'MANAGER') ? ' disabled' : '') +
'>' +
      '<option value="">사용안함</option>' +
      '<option value="코페이" ' +
        (merchant.manual_pg_company === '코페이' ? 'selected' : '') +
      '>코페이</option>' +
      '<option value="다우데이타" ' +
        (merchant.manual_pg_company === '다우데이타' ? 'selected' : '') +
      '>다우데이타</option>' +
    '</select>' +
  '</div>' +

'</div>' +

'<label>회사구분</label>' +
'<select id="company_type"' +
  ((adminRole === 'AGENCY' || adminRole === 'MANAGER') ? ' disabled' : '') +
'>' +
  '<option ' + (merchant.company_type === '개인(일반)' ? 'selected' : '') + '>개인(일반)</option>' +
  '<option ' + (merchant.company_type === '개인사업자' ? 'selected' : '') + '>개인사업자</option>' +
  '<option ' + (merchant.company_type === '법인사업자' ? 'selected' : '') + '>법인사업자</option>' +
'</select>' +
                '<label>CPID</label><input id="cpid" value="' +
  (merchant.cpid || ('MER' + String(merchant.id).padStart(4, '0'))) + '"' +
  ((adminRole === 'AGENCY' || adminRole === 'MANAGER') ? ' readonly' : '') +
' />' +
                '<label>사업자번호</label><input id="business_number" value="' +
  (merchant.business_number || '') + '"' +
  ((adminRole === 'AGENCY' || adminRole === 'MANAGER') ? ' readonly' : '') +
' />' +
                '<label>운영상태</label>' +
'<select id="merchant_status"' +
  ((adminRole === 'AGENCY' || adminRole === 'MANAGER') ? ' disabled' : '') +
'>' +
  '<option ' + (merchant.status === '신청' ? 'selected' : '') + '>신청</option>' +
  '<option ' + (merchant.status === '심사중' ? 'selected' : '') + '>심사중</option>' +
  '<option ' + (merchant.status === '운영' ? 'selected' : '') + '>운영</option>' +
  '<option ' + (merchant.status === '중지' ? 'selected' : '') + '>중지</option>' +
'</select>' +
'<label>개통일자</label>' +
'<input id="opened_at" type="date" value="' + (merchant.opened_at || '') + '"' +
  ((adminRole === 'AGENCY' || adminRole === 'MANAGER') ? ' readonly' : '') +
' />' +

'<label>비밀번호</label>' +
'<input id="merchant-password-input" type="text" value="' + (merchant.merchant_password || '') + '" placeholder="비밀번호 입력" />' +

              '</div>' +
            '</div>' +
    
           '<div class="merchant-detail-section">' +
  '<h3>기본정보</h3>' +
  '<div class="merchant-detail-grid">' +

    '<label>가맹점명</label>' +
    '<input id="merchant-name" value="' + (merchant.merchant_name || '') + '"' +
  ((adminRole === 'AGENCY' || adminRole === 'MANAGER') ? ' readonly' : '') +
' />' +
    '<label>가맹점 유형</label>' +
'<select id="merchant-type"' +
  ((adminRole === 'AGENCY' || adminRole === 'MANAGER') ? ' disabled' : '') +
'>' +
'<option value="일반매장" ' + (merchant.merchant_type === '일반매장' ? 'selected' : '') + '>일반매장</option>' +
'<option value="아카데미" ' + (merchant.merchant_type === '아카데미' ? 'selected' : '') + '>아카데미</option>' +
'<option value="결혼" ' + (merchant.merchant_type === '결혼' ? 'selected' : '') + '>결혼</option>' +
'<option value="장례" ' + (merchant.merchant_type === '장례' ? 'selected' : '') + '>장례</option>' +
'<option value="무선단말기" ' + (merchant.merchant_type === '무선단말기' ? 'selected' : '') + '>무선단말기</option>' +
'<option value="뷰티" ' + (merchant.merchant_type === '뷰티' ? 'selected' : '') + '>뷰티</option>' +
'<option value="호텔" ' + (merchant.merchant_type === '호텔' ? 'selected' : '') + '>호텔</option>' +
'</select>' +

    '<label>대표자</label>' +
    '<input id="owner-name" value="' + (merchant.owner_name || '') + '"' +
  ((adminRole === 'AGENCY' || adminRole === 'MANAGER') ? ' readonly' : '') +
' />' +

    '<label>주민번호</label>' +
'<input id="resident-number" value="' +
  (
    adminRole === 'AGENCY' || adminRole === 'MANAGER'
      ? String(merchant.resident_number || '')
          .replace(/^(\d{6}-?\d)(\d*)$/, '$1******')
      : (merchant.resident_number || '')
  ) +
'" placeholder="000000-0000000"' +
  ((adminRole === 'AGENCY' || adminRole === 'MANAGER') ? ' readonly' : '') +
' />' +

    '<label>연락처</label>' +
    '<input id="phone" value="' + (merchant.phone || '') + '" />' +

    '<label>수수료율</label>' +
    '<input id="fee-rate" value="' + (merchant.fee_rate || 0) + '"' +
  ((adminRole === 'AGENCY' || adminRole === 'MANAGER') ? ' readonly' : '') +
' />' +

   '<label>이메일</label><input id="email" value="' + (merchant.email || '') + '" />' +

'<label>법인번호</label><input id="corporate-number" value="' + (merchant.corporate_number || '') + '"' +
  ((adminRole === 'AGENCY' || adminRole === 'MANAGER') ? ' readonly' : '') +
' />' +

    '<label>과세구분</label>' +
'<select id="tax-type"' +
  ((adminRole === 'AGENCY' || adminRole === 'MANAGER') ? ' disabled' : '') +
'>' +
  '<option ' + (merchant.tax_type === '과세' ? 'selected' : '') + '>과세</option>' +
  '<option ' + (merchant.tax_type === '비과세' ? 'selected' : '') + '>비과세</option>' +
'</select>' +

    '<label>취급품목</label>' +
'<input id="product-item" value="' + (merchant.product_item || '') + '"' +
  ((adminRole === 'AGENCY' || adminRole === 'MANAGER') ? ' readonly' : '') +
' />' +

    '<label>업태/종목</label>' +
    '<div class="business-type-row">' +
      '<input id="business-type" value="' + (merchant.business_type || '') + '" placeholder="업태"' +
  ((adminRole === 'AGENCY' || adminRole === 'MANAGER') ? ' readonly' : '') +
' />' +

'<input id="business-category" value="' + (merchant.business_category || '') + '" placeholder="종목"' +
  ((adminRole === 'AGENCY' || adminRole === 'MANAGER') ? ' readonly' : '') +
' />' +
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

(
  adminRole === 'AGENCY' || adminRole === 'MANAGER'
    ? ''
    :
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
'</div>' 
)+
 

            '<div class="merchant-detail-section">' +
  '<h3>정산정보</h3>' +
  '<div class="merchant-detail-grid">' +
   '<label>정산은행</label><input id="bank_name" value="' + (merchant.bank_name || '') + '"' +
  (adminId === 'NXGMASTER16' ? '' : ' readonly') +
' />' +

'<label>계좌번호</label><input id="account_number" value="' +
  (
    adminRole === 'AGENCY' || adminRole === 'MANAGER'
      ? String(merchant.account_number || '').replace(/(\d{4})$/, '****')
      : (merchant.account_number || '')
  ) +
'"' +
  (adminId === 'NXGMASTER16' ? '' : ' readonly') +
' />' +

'<label>예금주</label><input id="account_holder" value="' + (merchant.account_holder || '') + '"' +
  (adminId === 'NXGMASTER16' ? '' : ' readonly') +
' />' +
'<label>정산주기</label>' +
'<select id="settlement_cycle"' +
  ((adminRole === 'AGENCY' || adminRole === 'MANAGER') ? ' disabled' : '') +
'>' +
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
'<select id="installment-month"' +
  ((adminRole === 'AGENCY' || adminRole === 'MANAGER') ? ' disabled' : '') +
'>' +
      '<option ' + (merchant.installment_month === '2개월' ? 'selected' : '') + '>2개월</option>' +
'<option ' + (merchant.installment_month === '3개월' ? 'selected' : '') + '>3개월</option>' +
'<option ' + (merchant.installment_month === '4개월' ? 'selected' : '') + '>4개월</option>' +
'<option ' + (merchant.installment_month === '5개월' ? 'selected' : '') + '>5개월</option>' +
'<option ' + (merchant.installment_month === '6개월' ? 'selected' : '') + '>6개월</option>' +
'<option ' + (merchant.installment_month === '10개월' ? 'selected' : '') + '>10개월</option>' +
'<option ' + (merchant.installment_month === '12개월' ? 'selected' : '') + '>12개월</option>' +
    '</select>' +
    '<label>1일 승인한도</label><input id="daily-limit" value="' + (merchant.daily_limit || '') + '"' +
  ((adminRole === 'AGENCY' || adminRole === 'MANAGER') ? ' readonly' : '') +
' />' +

'<label>월한도</label><input id="monthly-limit" value="' + (merchant.monthly_limit || '') + '"' +
  ((adminRole === 'AGENCY' || adminRole === 'MANAGER') ? ' readonly' : '') +
' />' +

'<label>연한도</label><input id="yearly-limit" value="' + (merchant.yearly_limit || '') + '"' +
  ((adminRole === 'AGENCY' || adminRole === 'MANAGER') ? ' readonly' : '') +
' />' +
  '</div>' +
'</div>' +
    
(
  adminRole === 'AGENCY' || adminRole === 'MANAGER'
    ? 
      '<div class="merchant-detail-section">' +
        '<h3>첨부서류</h3>' +
        '<p style="color:#777; padding:10px 0;">열람 권한이 없습니다.</p>' +
      '</div>'
    :
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
    '</div>'+ 
 
  '</div>' +
'</div>' 
) +
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

      document.querySelector<HTMLButtonElement>('.address-search-btn')
  ?.addEventListener('click', () => {

    new (window as any).daum.Postcode({
      oncomplete: (data: any) => {

        const zipcode =
          document.querySelector<HTMLInputElement>('#zipcode')

        const address =
          document.querySelector<HTMLInputElement>('#address')

        const addressDetail =
          document.querySelector<HTMLInputElement>('#address_detail')

        if (zipcode) {
          zipcode.value = data.zonecode
        }

        if (address) {
          address.value =
            data.roadAddress || data.jibunAddress
        }

        addressDetail?.focus()
      }
    }).open()
  })

  const branchSelect =
  document.querySelector<HTMLSelectElement>('#branch_admin_select')

const agencySelect =
  document.querySelector<HTMLSelectElement>('#agency_admin_select')

const managerSelect =
  document.querySelector<HTMLSelectElement>('#manager_admin_id')

const { data: organizationUsers, error: organizationUsersError } =
  await supabase
    .from('admin_users')
    .select('id, admin_name, login_id, role, status, parent_admin_id, phone')
    .eq('status', '사용중')

if (organizationUsersError) {
  console.error('조직정보 조회 실패:', organizationUsersError)
} else {

  const users = organizationUsers || []

  const branches =
    users.filter((user: any) =>
      user.role === 'BRANCH' ||
      String(user.login_id || '').startsWith('S')
    )

  const agencies =
    users.filter((user: any) =>
      user.role === 'AGENCY' ||
      String(user.login_id || '').startsWith('A')
    )

  const managers =
    users.filter((user: any) =>
      user.role === 'MANAGER' ||
      String(user.login_id || '').startsWith('B')
    )

  if (branchSelect) {
    branchSelect.innerHTML =
      '<option value="">지사 선택</option>' +
      branches.map((branch: any) =>
        '<option value="' + branch.id + '">' +
          (branch.admin_name || '-') +
        '</option>'
      ).join('')
  }

  branchSelect?.addEventListener('change', () => {

    const branchId = Number(branchSelect.value)

    if (agencySelect) {
      agencySelect.innerHTML =
        '<option value="">대리점 선택</option>'
    }

    if (managerSelect) {
      managerSelect.innerHTML =
        '<option value="">담당자 선택</option>'
    }

    if (!branchId) return

    const filteredAgencies =
      agencies.filter((agency: any) =>
        Number(agency.parent_admin_id) === branchId
      )

    if (agencySelect) {
      agencySelect.innerHTML =
        '<option value="">대리점 선택</option>' +
        filteredAgencies.map((agency: any) =>
          '<option value="' + agency.id + '">' +
            (agency.admin_name || '-') +
          '</option>'
        ).join('')
    }
  })

  agencySelect?.addEventListener('change', () => {

    const agencyId = Number(agencySelect.value)

    if (managerSelect) {
      managerSelect.innerHTML =
        '<option value="">담당자 선택</option>'
    }

    if (!agencyId) return

    const filteredManagers =
      managers.filter((manager: any) =>
        Number(manager.parent_admin_id) === agencyId
      )

    if (managerSelect) {
      managerSelect.innerHTML =
        '<option value="">담당자 선택</option>' +
        filteredManagers.map((manager: any) =>
          '<option value="' + manager.id + '">' +
            (manager.admin_name || '-') +
          '</option>'
        ).join('')
    }
  })

  const savedBranchId =
  Number(merchant.branch_admin_id || 0)

const savedAgencyId =
  Number(merchant.agency_admin_id || 0)

const savedManagerId =
  Number(merchant.manager_admin_id || 0)

if (savedBranchId && branchSelect) {
  branchSelect.value = String(savedBranchId)
  branchSelect.dispatchEvent(new Event('change'))
}

if (savedAgencyId && agencySelect) {
  agencySelect.value = String(savedAgencyId)
  agencySelect.dispatchEvent(new Event('change'))
}

if (savedManagerId && managerSelect) {
  managerSelect.value = String(savedManagerId)
}
}
    
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
  manager_admin_id: Number(getValue('manager_admin_id')) || null,

manager_admin_name:
  document.querySelector<HTMLSelectElement>('#manager_admin_id')
    ?.selectedOptions[0]?.textContent?.trim() || '',

manager_phone:
  organizationUsers?.find(
    (user: any) =>
      Number(user.id) === Number(getValue('manager_admin_id'))
  )?.phone || '',

agency_admin_id:
  Number(getValue('agency_admin_select')) || null,

agency_name:
  document.querySelector<HTMLSelectElement>('#agency_admin_select')
    ?.selectedOptions[0]?.textContent?.trim() || '',

agency_admin_name:
  document.querySelector<HTMLSelectElement>('#agency_admin_select')
    ?.selectedOptions[0]?.textContent?.trim() || '',

branch_admin_id:
  Number(getValue('branch_admin_select')) || null,

branch_admin_name:
  document.querySelector<HTMLSelectElement>('#branch_admin_select')
    ?.selectedOptions[0]?.textContent?.trim() || '',
    pg_company:
    getValue('online-pg-company-1') ||
    getValue('online-pg-company-2') ||
    getValue('manual-pg-company'),
  
  online_pg_company_1:
    getValue('online-pg-company-1'),
  
  online_pg_company_2:
    getValue('online-pg-company-2'),
  
  manual_pg_company:
    getValue('manual-pg-company'),
  
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

      const currentAdminId =
  sessionStorage.getItem('admin_id') || ''

if (currentAdminId !== 'NXGMASTER16') {
  delete updateData.bank_name
  delete updateData.account_number
  delete updateData.account_holder
}

if (adminRole === 'AGENCY' || adminRole === 'MANAGER') {
  const allowedUpdateData = {
    phone: updateData.phone,
    email: updateData.email,
    zipcode: updateData.zipcode,
    address: updateData.address,
    address_detail: updateData.address_detail
  }

  Object.keys(updateData).forEach((key) => {
    delete updateData[key]
  })

  Object.assign(updateData, allowedUpdateData)
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

    if (adminRole === 'AGENCY' || adminRole === 'MANAGER') {
      alert('권한이 없습니다.')
      return
    }

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
        merchant_password: password,
        opened_at: new Date().toISOString().slice(0, 10),
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

    if (adminRole === 'AGENCY' || adminRole === 'MANAGER') {
      alert('권한이 없습니다.')
      return
    }

    alert(
      '가맹점 로그인정보\n\n' +
      '로그인 주소 : https://payment-app-ybtf.vercel.app/merchant-login\n' +
      '아이디 : ' + (merchant.merchant_login_id || '-') + '\n' +
      '비밀번호 : ' + (merchant.merchant_password || '-')
    )
  })
  document.querySelector('#delete-merchant')
  ?.addEventListener('click', async () => {

    if (adminRole === 'AGENCY' || adminRole === 'MANAGER') {
      alert('권한이 없습니다.')
      return
    }

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

        if (titleBox) {
          titleBox.innerHTML = '▶ 출금관리'
        }
      
        if (searchBox) {
          searchBox.innerHTML = ''
        }
      
        if (summaryBox) {
          summaryBox.innerHTML = ''
        
        }
      
        if (tableHead) {
          tableHead.innerHTML = ''
        }
      
        if (paymentTableBody) {
          paymentTableBody.innerHTML = ''
        }

        if (tableTop) {
          tableTop.innerHTML =
            '<button>엑셀 다운로드</button>' +
        
            '<div class="payout-top-pagination">' +
              '<button id="payout-prev-top">이전</button>' +
              '<span id="payout-page-info-top">1 / 1</span>' +
              '<button id="payout-next-top">다음</button>' +
            '</div>' +
        
            '<select id="withdraw-page-size">' +
              '<option value="10">10개씩 보기</option>' +
              '<option value="20">20개씩 보기</option>' +
              '<option value="50">50개씩 보기</option>' +
            '</select>'
        }

      let payoutPage = 1
      let payoutPageSize = Number(sessionStorage.getItem('withdraw_page_size') || 10)
      let currentPayoutView = 'scheduled'
      if (subMenu) {
        subMenu.innerHTML = ''
      }
    
      document.querySelectorAll('.payout-sub-tab')
      .forEach((tab) => {
        tab.addEventListener('click', async () => {
    
          const view =
            (tab as HTMLElement).dataset.payoutView || 'scheduled'
            currentPayoutView = view
          document.querySelectorAll('.payout-sub-tab')
            .forEach((t) => t.classList.remove('active'))
    
          tab.classList.add('active')
    
          if (view === 'manager') {
    
            if (titleBox) {
              titleBox.innerHTML = '▶ 출금관리 > 담당자 정산'
            }
    
            const { data: paymentRows, error } = await supabase
  .from('payments')
  .select(`
    id,
    created_at,
    amount,
    status,
    branch_admin_id,
    branch_admin_name,
    branch_fee_rate,
    agency_admin_id,
    agency_admin_name,
    agency_fee_rate,
    manager_admin_id,
    manager_admin_name,
    manager_fee_rate
  `)
  .eq('status', 'paid')
  .order('created_at', { ascending: false })

if (error) {
  alert('담당자 정산 조회 실패: ' + error.message)
  return
}

type CommissionSummaryRow = {
  settlement_month: string
  role: 'BRANCH' | 'AGENCY' | 'MANAGER'
  admin_id: number
  admin_name: string
  commission_rate: number
  payment_count: number
  total_payment_amount: number
  commission_amount: number
}

const summaryMap = new Map<string, CommissionSummaryRow>()

const addCommissionSummary = (
  settlementMonth: string,
  role: 'BRANCH' | 'AGENCY' | 'MANAGER',
  adminId: number | null,
  adminName: string,
  commissionRate: number,
  paymentAmount: number
) => {
  if (!adminId || commissionRate <= 0) return

  const key = settlementMonth + '-' + role + '-' + adminId

  const commissionAmount = Math.floor(
    paymentAmount * commissionRate / 100
  )

  const existing = summaryMap.get(key)

  if (existing) {
    existing.payment_count += 1
    existing.total_payment_amount += paymentAmount
    existing.commission_amount += commissionAmount
  } else {
    summaryMap.set(key, {
      settlement_month: settlementMonth,
      role,
      admin_id: adminId,
      admin_name: adminName || '-',
      commission_rate: commissionRate,
      payment_count: 1,
      total_payment_amount: paymentAmount,
      commission_amount: commissionAmount
    })
  }
}

;(paymentRows || []).forEach((payment) => {
  const paymentAmount = Number(payment.amount || 0)

  const settlementMonth = payment.created_at
    ? String(payment.created_at).slice(0, 7)
    : '-'

  const branchFeeRate = Number(payment.branch_fee_rate || 0)
  const agencyFeeRate = Number(payment.agency_fee_rate || 0)
  const managerFeeRate = Number(payment.manager_fee_rate || 0)

  const branchActualRate = Math.max(
    branchFeeRate - agencyFeeRate,
    0
  )

  const agencyActualRate = Math.max(
    agencyFeeRate - managerFeeRate,
    0
  )

  const managerActualRate = Math.max(
    managerFeeRate,
    0
  )

  addCommissionSummary(
    settlementMonth,
    'BRANCH',
    payment.branch_admin_id
      ? Number(payment.branch_admin_id)
      : null,
    payment.branch_admin_name || '',
    branchActualRate,
    paymentAmount
  )

  addCommissionSummary(
    settlementMonth,
    'AGENCY',
    payment.agency_admin_id
      ? Number(payment.agency_admin_id)
      : null,
    payment.agency_admin_name || '',
    agencyActualRate,
    paymentAmount
  )

  addCommissionSummary(
    settlementMonth,
    'MANAGER',
    payment.manager_admin_id
      ? Number(payment.manager_admin_id)
      : null,
    payment.manager_admin_name || '',
    managerActualRate,
    paymentAmount
  )
})

const rows = Array.from(summaryMap.values())
  .sort((a, b) => {
    if (a.settlement_month !== b.settlement_month) {
      return b.settlement_month.localeCompare(a.settlement_month)
    }

    const roleOrder = {
      BRANCH: 1,
      AGENCY: 2,
      MANAGER: 3
    }

    return roleOrder[a.role] - roleOrder[b.role]
  })

if (tableHead) {
  tableHead.innerHTML =
    '<tr>' +
      '<th>정산월</th>' +
      '<th>구분</th>' +
      '<th>조직명</th>' +
      '<th>실제 지급률</th>' +
      '<th>결제건수</th>' +
      '<th>결제금액</th>' +
      '<th>지급예정액</th>' +
    '</tr>'
}

paymentTableBody.innerHTML = ''

rows.forEach((row) => {
  const tr = document.createElement('tr')

  tr.innerHTML =
    '<td>' + row.settlement_month + '</td>' +

    '<td>' +
      (
        row.role === 'BRANCH'
          ? '지사'
          : row.role === 'AGENCY'
            ? '대리점'
            : '담당자'
      ) +
    '</td>' +

    '<td>' + row.admin_name + '</td>' +
    '<td>' + row.commission_rate.toFixed(2) + '%</td>' +
    '<td>' + row.payment_count.toLocaleString() + '</td>' +
    '<td>' + row.total_payment_amount.toLocaleString() + '원</td>' +
    '<td>' + row.commission_amount.toLocaleString() + '원</td>'

  paymentTableBody.appendChild(tr)
})
          }
        })
      })

      if (titleBox) {
        titleBox.innerHTML = '▶ 출금관리 > 출금예정내역'
      }
    
      if (searchBox) {
        searchBox.innerHTML = `
          <div class="payout-search-panel">
            <div class="payout-search-row">
              <input type="hidden" name="payout-date-type" value="거래일">
    
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
            '<th>결제일</th>' +
            '<th>출금예정일</th>' +           
            '<th>출금상태</th>' +
            '<th>처리</th>' +
          '</tr>'
      }
    
      const { data: payments, error } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false })

        

        const { data: cancelRequests, error: cancelRequestError } =
  await supabase
    .from('cancel_requests')
    .select('id, payment_id, status, reason')
    .eq('status', '요청중')

    
if (cancelRequestError) {
  alert(
    '취소요청 조회 실패: ' +
    cancelRequestError.message
  )
  return
}

const cancelRequestMap =
  new Map<number, any>()

;(cancelRequests || []).forEach((request: any) => {
  cancelRequestMap.set(
    Number(request.payment_id),
    request
  )
})
        
        const { data: merchantCycles, error: merchantCyclesError } =
  await supabase
    .from('merchants')
    .select('id, settlement_cycle')

if (merchantCyclesError) {
  alert('가맹점 정산주기 조회 실패: ' + merchantCyclesError.message)
  return
}

const settlementCycleMap = new Map<number, string>()

;(merchantCycles || []).forEach((merchant: any) => {
  settlementCycleMap.set(
    Number(merchant.id),
    String(merchant.settlement_cycle || '1일')
  )
})
        if (error) {
          alert('출금내역 조회 실패: ' + error.message)
          return
        }

        const { data: holidayData, error: holidayError } = await supabase
  .from('holidays')
  .select('holiday_date')

if (holidayError) {
  alert('공휴일 조회 실패: ' + holidayError.message)
  return
}
        
        const holidaySet = new Set(
          (holidayData || []).map((holiday) => holiday.holiday_date)
        )
        
        let accountBalance = 0

try {
  const response = await fetch('/api/toss-balance')

  const result = await response.json()

  if (result.success) {
    accountBalance =
      Number(
        result.data?.entityBody?.availableAmount?.value || 0
      )
  }
} catch (error) {
  console.error('토스 잔액 조회 실패:', error)
}
        

        const duplicatePaymentKeys = new Set<string>()

        const duplicateKeyCount: Record<string, number> = {}
        
        ;(payments || []).forEach((payment: any) => {
          const approvalNumber =
            String(payment.approval_number || '').trim()
        
          const amount =
            Number(payment.amount || 0)
        
          if (!approvalNumber) {
            return
          }
        
          const duplicateKey =
            approvalNumber + '_' + amount
        
          duplicateKeyCount[duplicateKey] =
            (duplicateKeyCount[duplicateKey] || 0) + 1
        })
        
        Object.entries(duplicateKeyCount)
          .forEach(([duplicateKey, count]) => {
            if (count > 1) {
              duplicatePaymentKeys.add(duplicateKey)
            }
          })
        
        const duplicateErrorCount =
          duplicatePaymentKeys.size
          const payoutErrorPayments =
          (payments || []).filter((payment: any) => {
        
            return (
              payment.payout_status === '출금오류'
            )
          })
        
        const payoutErrorCount =
          payoutErrorPayments.length
          const accountErrorPayments =
          (payments || []).filter((payment: any) => {
        
            return (
              payment.payout_status === '계좌오류'
            )
          })
        
        const accountErrorCount =
          accountErrorPayments.length

        
        
        const formatPayoutDate = (date: Date) => {
          const year = date.getFullYear()
          const month = String(date.getMonth() + 1).padStart(2, '0')
          const day = String(date.getDate()).padStart(2, '0')
        
          return `${year}-${month}-${day}`
        }
        
        const getPayoutDate = (
          createdAt: string,
          settlementCycle: string
        ) => {
          const payoutDate = new Date(createdAt)
        
          const cycleText =
            String(settlementCycle || '1일').trim()
        
          const cycleNumberMatch =
            cycleText.match(/\d+/)
        
          const cycleDays =
            cycleNumberMatch
              ? Number(cycleNumberMatch[0])
              : 1
        
          payoutDate.setDate(
            payoutDate.getDate() + cycleDays
          )
        
          while (true) {
            const dayOfWeek = payoutDate.getDay()
            const dateText = formatPayoutDate(payoutDate)
        
            const isWeekend =
              dayOfWeek === 0 ||
              dayOfWeek === 6
        
            const isHoliday =
              holidaySet.has(dateText)
        
            if (!isWeekend && !isHoliday) {
              return dateText
            }
        
            payoutDate.setDate(
              payoutDate.getDate() + 1
            )
          }
        }     
           
        type PayoutGroup = {
          id: number
          merchant_id: number | string | null
          merchant_name: string         
          pg_company: string
          manager_admin_name: string
agency_admin_name: string
branch_admin_name: string
          created_at: string
          payout_date: string
          order_id: string
          payment_key: string
          amount: number
          fee_amount: number
          settlement_amount: number
          payout_status: string
          payment_count: number
          payment_ids: number[]
        
          payout_hold: boolean
          payout_hold_reason: string | null
          payout_hold_at: string | null
          payout_hold_by: string | null
          settlement_cycle: string
        }
        
        const payoutGroupMap: Record<string, PayoutGroup> = {}
        
        ;(payments || []).forEach((row: any) => {

          if (
            row.status === 'cancel' ||
            row.payout_status === '출금제외' ||
            row.settlement_status === '취소'
          ) {
            return
          }

          const settlementCycle =
  settlementCycleMap.get(
    Number(row.merchant_id)
  ) || '1일'

const payoutDate =
  getPayoutDate(
    row.created_at,
    settlementCycle
  )
        
          const groupKey =
            String(row.merchant_id || '') + '_' + payoutDate
        
          const amount = Number(row.amount || 0)
          const feeAmount = Number(row.fee_amount || 0)
        
          const settlementAmount = Number(
            row.settlement_amount ?? amount - feeAmount
          )
        
          if (!payoutGroupMap[groupKey]) {
            payoutGroupMap[groupKey] = {
              id: Number(row.id),
              merchant_id: row.merchant_id,
              merchant_name: row.merchant_name || '-',
              pg_company: row.pg_company || '-',
              manager_admin_name: row.manager_admin_name || '',
agency_admin_name: row.agency_admin_name || '',
branch_admin_name: row.branch_admin_name || '',
              created_at: row.created_at,
              payout_date: payoutDate,

              settlement_cycle:
  String(settlementCycle || '')
    .replace(/[^0-9]/g, ''),
              
                      order_id: row.order_id || '',
              payment_key: row.payment_key || '',

              amount: 0,
              fee_amount: 0,
              settlement_amount: 0,
        
              payout_status:
                row.payout_status || '출금대기',
        
                payment_count: 0,
                payment_ids: [],
                
                payout_hold: row.payout_hold === true,
                payout_hold_reason: row.payout_hold_reason || null,
                payout_hold_at: row.payout_hold_at || null,
                payout_hold_by: row.payout_hold_by || null
            }
          }
        
          const group = payoutGroupMap[groupKey]
        
          group.amount += amount
          group.fee_amount += feeAmount
          group.settlement_amount += settlementAmount
          group.payment_count += 1
          group.payment_ids.push(Number(row.id))
        
          if (row.payout_status === '출금오류') {
            group.payout_status = '출금오류'
          } else if (
            group.payout_status !== '출금오류' &&
            row.payout_status !== '출금완료'
          ) {
            group.payout_status = '출금대기'
          }
        })
        
        const payoutRows: PayoutGroup[] =
          Object.values(payoutGroupMap)
          
          const getFilteredPayoutRows = () => {
            const pgFilter =
              (document.querySelector('#payout-pg-filter') as HTMLSelectElement)?.value || '전체'
          
            const statusFilter =
              (document.querySelector('#payout-status-filter') as HTMLSelectElement)?.value || '전체'

              const targetFilter =
  (document.querySelector('#payout-target-filter') as HTMLSelectElement)?.value || '전체'
          
            const keyword =
              ((document.querySelector('#payout-keyword') as HTMLInputElement)?.value || '').trim()
          
            const startDate =
              (document.querySelector('#payout-start-date') as HTMLInputElement)?.value || ''
          
            const endDate =
              (document.querySelector('#payout-end-date') as HTMLInputElement)?.value || ''
          
            return payoutRows.filter((row) => {
              if (row.payout_hold === true) {
                return false
              }
          
              const payoutStatus = row.payout_status || '출금대기'
          
              if (pgFilter !== '전체' && row.pg_company !== pgFilter) {
                return false
              }
          
              if (statusFilter !== '전체' && payoutStatus !== statusFilter) {
                return false
              }
          
              if (startDate && row.payout_date < startDate) {
                return false
              }
          
              if (endDate && row.payout_date > endDate) {
                return false
              }

              if (targetFilter !== '전체' && keyword) {
                let targetText = ''
              
                if (targetFilter === '가맹점') {
                  targetText = String(row.merchant_name || '')
                } else if (targetFilter === '담당자') {
                  targetText = String(row.manager_admin_name || '')
                } else if (targetFilter === '대리점') {
                  targetText = String(row.agency_admin_name || '')
                } else if (targetFilter === '지사') {
                  targetText = String(row.branch_admin_name || '')
                }
              
                if (!targetText.includes(keyword)) {
                  return false
                }
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

          const getTossDepositDate = (createdAt: string) => {
            const koreaDateText = new Date(createdAt).toLocaleDateString('en-CA', {
              timeZone: 'Asia/Seoul'
            })
          
            const depositDate = new Date(koreaDateText + 'T12:00:00')
          
            let addedBusinessDays = 0
          
            while (addedBusinessDays < 4) {
              depositDate.setDate(depositDate.getDate() + 1)
          
              const dayOfWeek = depositDate.getDay()
          
              const dateText =
                depositDate.getFullYear() + '-' +
                String(depositDate.getMonth() + 1).padStart(2, '0') + '-' +
                String(depositDate.getDate()).padStart(2, '0')
          
              const isWeekend =
                dayOfWeek === 0 || dayOfWeek === 6
          
              const isHoliday =
                holidaySet.has(dateText)
          
              if (!isWeekend && !isHoliday) {
                addedBusinessDays += 1
              }
            }
          
            return (
              depositDate.getFullYear() + '-' +
              String(depositDate.getMonth() + 1).padStart(2, '0') + '-' +
              String(depositDate.getDate()).padStart(2, '0')
            )
          }

          const renderPayoutTable = () => {
            if (
              sessionStorage.getItem('adminPage') !== 'payout'
            ) {
              return
            }
          
            const filteredRows = getFilteredPayoutRows()

        const startDate =
  (document.querySelector('#payout-start-date') as HTMLInputElement)?.value || ''

const endDate =
  (document.querySelector('#payout-end-date') as HTMLInputElement)?.value || ''

        const adminId = sessionStorage.getItem('admin_id') || ''
        const canViewPayoutBalance = adminId === 'NXGMASTER16'
        const canManagePayoutHold = adminId === 'NXGMASTER16'
    
        const totalPayoutAmount = filteredRows.reduce((sum, row) => {
          const amount = Number(row.amount || 0)
          const feeAmount = Number(row.fee_amount || 0)
          const payoutAmount = Number(row.settlement_amount || amount - feeAmount)
          return sum + payoutAmount
        }, 0)

        const payoutCount = filteredRows.length

        const incomingExpectedAmount = payoutRows.reduce((sum, row) => {
          const pgCompany =
            String(row.pg_company || '').trim()
        
          if (pgCompany !== '토스페이먼츠') {
            return sum
          }
        
          const tossDepositDate =
            getTossDepositDate(row.created_at)
        
          if (startDate && tossDepositDate < startDate) {
            return sum
          }
        
          if (endDate && tossDepositDate > endDate) {
            return sum
          }
        
          const amount = Number(row.amount || 0)
        
          const pgFee = Math.floor(
            amount * 1.375 / 100
          )
        
          const pgVat = Math.floor(
            pgFee * 0.1
          )
        
          return sum + amount - pgFee - pgVat
        }, 0)
        
          
        
         
        
        const completedPayoutAmount = filteredRows.reduce((sum, row) => {
          if (row.payout_status !== '출금완료') {
            return sum
          }
        
          const amount = Number(row.amount || 0)
          const feeAmount = Number(row.fee_amount || 0)
          const settlementAmount = Number(
            row.settlement_amount || amount - feeAmount
          )
        
          return sum + settlementAmount
        }, 0)

        if (summaryBox) {         
          summaryBox.innerHTML = `
          <div class="payout-summary-cards">
        
            <div class="payout-summary-card target">
              <div class="payout-summary-icon">👥</div>
              <div class="payout-summary-info">
                <div class="payout-summary-title">출금대상</div>
                <div class="payout-summary-value">${payoutCount.toLocaleString()}건</div>
              </div>
            </div>

            <div class="payout-summary-card incoming">
  <div class="payout-summary-icon">🏦</div>
  <div class="payout-summary-info">
    <div class="payout-summary-title">입금예정금액</div>
    <div class="payout-summary-value">
      ${incomingExpectedAmount.toLocaleString()}원
    </div>
  </div>
</div>
        
${canViewPayoutBalance ? `
  <button
    type="button"
    id="payout-balance-button"
    class="payout-summary-card balance payout-summary-button"
  >
    <div class="payout-summary-icon">🏦</div>
    <div class="payout-summary-info">
      <div class="payout-summary-title">출금계좌잔액</div>
      <div class="payout-summary-value">
        ${accountBalance.toLocaleString()}원
      </div>
    </div>
  </button>
` : ''}
        
            <div class="payout-summary-card amount">
              <div class="payout-summary-icon">💳</div>
              <div class="payout-summary-info">
                <div class="payout-summary-title">출금예정금액</div>
                <div class="payout-summary-value">${totalPayoutAmount.toLocaleString()}원</div>
              </div>
            </div>

            <div class="payout-summary-card completed">
  <div class="payout-summary-icon">✅</div>
  <div class="payout-summary-info">
    <div class="payout-summary-title">출금완료</div>
    <div class="payout-summary-value">
      ${completedPayoutAmount.toLocaleString()}원
    </div>
  </div>
</div>
        
            <div
  id="duplicate-payment-card"
  class="payout-summary-card duplicate"
>
              <div class="payout-summary-icon">⚠️</div>
              <div class="payout-summary-info">
                <div class="payout-summary-title">중복결제오류</div>
                <div class="payout-summary-value">${duplicateErrorCount.toLocaleString()}건</div>
              </div>
            </div>
        
            <div
  id="payout-error-card"
  class="payout-summary-card payout-error"
>
              <div class="payout-summary-icon">❗</div>
              <div class="payout-summary-info">
                <div class="payout-summary-title">출금오류</div>
                <div class="payout-summary-value">${payoutErrorCount.toLocaleString()}건</div>
              </div>
            </div>
        
            <div
  id="account-error-card"
  class="payout-summary-card account-error"
>
              <div class="payout-summary-icon">💳</div>
              <div class="payout-summary-info">
                <div class="payout-summary-title">계좌오류</div>
                <div class="payout-summary-value">${accountErrorCount.toLocaleString()}건</div>
              </div>
            </div>
        
          </div>
        `
        }

        document.querySelector('#payout-balance-button')
  ?.addEventListener('click', async () => {

    const adminId =
  sessionStorage.getItem('admin_id') || ''

const adminPassword = prompt(
  '회사 회수계좌 확인을 위해 관리자 비밀번호를 입력해주세요.'
)

if (!adminPassword) {
  return
}

const { data: accountResult, error: accountFunctionError } =
  await supabase.functions.invoke('get-company-account', {
    body: {
      loginId: adminId,
      password: adminPassword
    }
  })

if (accountFunctionError) {
  alert(
    '회사 회수계좌 조회 실패: ' +
    accountFunctionError.message
  )
  return
}

if (!accountResult?.account) {
  alert(
    accountResult?.error ||
    '등록된 회사 회수계좌가 없습니다.'
  )
  return
}

const companyAccount = accountResult.account

    const existingModal =
      document.querySelector('#payout-balance-modal')

    if (existingModal) {
      existingModal.remove()
    }

    const modal = document.createElement('div')
    modal.id = 'payout-balance-modal'
    modal.className = 'payout-balance-modal'

    modal.innerHTML = `
      <div class="payout-balance-modal-card">

        <div class="payout-balance-modal-header">
          <h3>출금계좌 관리</h3>

          <button
            type="button"
            id="payout-balance-modal-close"
            class="payout-balance-modal-close"
          >
            ×
          </button>
        </div>

        <div class="payout-balance-modal-body">

          <div class="payout-balance-row">
            <span>현재 가상계좌잔액</span>
            <strong>${accountBalance.toLocaleString()}원</strong>
          </div>

          <div class="payout-balance-row">
  <span>회수금액</span>

  <div
    style="
      display:flex;
      gap:8px;
      align-items:center;
    "
  >
    <input
      id="withdraw-amount"
      type="text"
      value=""
      placeholder="0"
      style="
        width:150px;
        text-align:right;
      "
    />

    <button
      type="button"
      id="withdraw-all-button"
    >
      전액
    </button>
  </div>
</div>

          <div class="payout-company-account">
  <div class="payout-company-account-title">
    회사 회수계좌
  </div>

  <div class="payout-company-account-row">
  <span>은행</span>
  <strong>${companyAccount.bank_name}</strong>
</div>

<div class="payout-company-account-row">
  <span>예금주</span>
  <strong>${companyAccount.account_holder}</strong>
</div>

<div class="payout-company-account-row">
  <span>계좌번호</span>
  <strong>${companyAccount.account_number}</strong>
</div>

  <small>
    회수계좌는 운영관리자 화면에서 변경할 수 없습니다.
  </small>
</div>

        </div>

        <div class="payout-balance-modal-footer">
          <button
            type="button"
            id="payout-balance-history-button"
            class="payout-balance-secondary-button"
          >
            회수내역
          </button>

          <button
            type="button"
            id="payout-balance-withdraw-button"
            class="payout-balance-primary-button"
          >
            회사통장으로 회수
          </button>
        </div>

      </div>
    `

    document.body.appendChild(modal)

    const withdrawInput =
  document.querySelector<HTMLInputElement>(
    '#withdraw-amount'
  )

withdrawInput?.addEventListener('input', () => {

  const value =
    withdrawInput.value.replace(/,/g, '')
      .replace(/[^\d]/g, '')

  withdrawInput.value =
    value
      ? Number(value).toLocaleString()
      : ''

})

document
  .querySelector('#withdraw-all-button')
  ?.addEventListener('click', () => {

    if (!withdrawInput) return

    withdrawInput.value =
      accountBalance.toLocaleString()

  })

    document.querySelector('#payout-balance-modal-close')
      ?.addEventListener('click', () => {
        modal.remove()
      })

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.remove()
      }
    })

    document.querySelector('#payout-balance-history-button')
      ?.addEventListener('click', () => {
        alert('회수내역 기능은 다음 단계에서 연결합니다.')
      })

      document.querySelector('#payout-balance-withdraw-button')
  ?.addEventListener('click', async () => {
    const withdrawInput =
  document.querySelector<HTMLInputElement>(
    '#withdraw-amount'
  )

const withdrawAmount =
  Number(
    withdrawInput?.value
      .replace(/,/g, '') || 0
  )

if (withdrawAmount <= 0) {

  alert('회수금액을 입력해주세요.')

  return

}

if (withdrawAmount > accountBalance) {

  alert(
    '현재 가상계좌잔액보다 큰 금액은 회수할 수 없습니다.'
  )

  return

}


    const adminPassword = prompt(
      '회사계좌 회수를 위해 관리자 비밀번호를 입력해주세요.'
    )

    if (!adminPassword) {
      return
    }

    const { data: verifiedAdmin, error: verifyError } = await supabase
      .from('admin_users')
      .select('id, login_id, role, status')
      .eq('login_id', adminId)
      .eq('password', adminPassword)
      .eq('role', 'MASTER')
      .eq('status', '사용중')
      .maybeSingle()

    if (verifyError || !verifiedAdmin) {
      alert('관리자 비밀번호가 올바르지 않습니다.')
      return
    }

    const confirmMessage =
      '회사계좌로 회수하시겠습니까?\n\n' +
      '회수금액: ' +
      withdrawAmount.toLocaleString() +
      '원\n\n' +
'은행: ' + companyAccount.bank_name + '\n' +
'예금주: ' + companyAccount.account_holder + '\n' +
'계좌번호: ' + companyAccount.account_number + '\n\n' +
      '처리자: ' +
      verifiedAdmin.login_id

    if (!confirm(confirmMessage)) {
      return
    }

    try {
      const sellerResponse = await fetch('/api/toss-seller-get')
      const sellerResult = await sellerResponse.json()
    
      if (!sellerResponse.ok || !sellerResult.success) {
        alert('회사 회수용 셀러 조회에 실패했습니다.')
        return
      }
    
      const sellers =
        sellerResult?.data?.entityBody?.items || []
    
      const sweepSeller = sellers.find(
        (seller: any) =>
          String(seller.refSellerId || '').trim() ===
          'NXGSOFT01'
      )
    
      if (!sweepSeller?.id) {
        alert('NXGSOFT01 회수용 셀러를 찾을 수 없습니다.')
        return
      }
    
      if (sweepSeller.status !== 'APPROVED') {
        alert('NXGSOFT01 셀러가 지급가능 상태가 아닙니다.')
        return
      }
    
      const refPayoutId =
        'SWEEP-' +
        Date.now() +
        '-' +
        withdrawAmount
    
      const payoutResponse = await fetch(
        '/api/toss-payout',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            destination: sweepSeller.id,
            amount: withdrawAmount,
            transactionDescription: '잔액회수',
            refPayoutId,
          }),
        }
      )
    
      const payoutResult = await payoutResponse.json()
    
      if (!payoutResponse.ok || !payoutResult.success) {
        const errorMessage =
          payoutResult?.data?.error?.message ||
          payoutResult?.data?.message ||
          payoutResult?.message ||
          '회사계좌 회수에 실패했습니다.'
    
        alert(
          '회사계좌 회수 실패\n\n' +
          errorMessage
        )
    
        return
      }
    
      alert(
        '회사계좌 회수가 완료되었습니다.\n\n' +
        '회수금액: ' +
        withdrawAmount.toLocaleString() +
        '원'
      )
    
      modal.remove()
    
    } catch (error) {
      console.error('회사계좌 회수 오류:', error)
    
      alert(
        '회사계좌 회수 중 오류가 발생했습니다.'
      )
    }
  })
})

document.querySelector('#duplicate-payment-card')
  ?.addEventListener('click', () => {
    const duplicateGroups: Record<string, any[]> = {}

    ;(payments || []).forEach((payment: any) => {
      const approvalNumber =
        String(payment.approval_number || '').trim()

        const amount =
        Number(payment.amount || 0)
      
      const duplicateKey =
        approvalNumber + '_' + amount
      
      if (
        !approvalNumber ||
        !duplicatePaymentKeys.has(duplicateKey)
      ) {
        return
      }

      if (!duplicateGroups[duplicateKey]) {
        duplicateGroups[duplicateKey] = []
      }
      
      duplicateGroups[duplicateKey].push(payment)
    })

    const groupEntries = Object.entries(duplicateGroups)

    if (groupEntries.length === 0) {
      alert('중복결제 내역이 없습니다.')
      return
    }

    document.querySelector('#duplicate-payment-modal')?.remove()

    const modal = document.createElement('div')
    modal.id = 'duplicate-payment-modal'
    modal.className = 'duplicate-payment-modal'

    modal.innerHTML = `
      <div class="duplicate-payment-modal-card">
        <div class="duplicate-payment-modal-header">
          <h3>중복결제 관리</h3>

          <button
            type="button"
            id="duplicate-payment-modal-close"
            class="duplicate-payment-modal-close"
          >
            ×
          </button>
        </div>

        <div class="duplicate-payment-modal-body">
          ${groupEntries.map(([approvalNumber, rows]) => `
            <div class="duplicate-payment-group">
              <div class="duplicate-payment-group-title">
                승인번호 ${approvalNumber}
              </div>

              ${rows.map((row: any, index: number) => `
                <label class="duplicate-payment-row ${index === 0 ? 'keep-row' : 'delete-row'}">
  <input
    type="radio"
    name="keep-payment-${approvalNumber}"
    value="${row.id}"
    ${index === 0 ? 'checked' : ''}
  >

  <span class="duplicate-payment-status">
    ${index === 0 ? '정상 유지' : '삭제 예정'}
  </span>

  <span>${row.merchant_name || '-'}</span>

  <span>
    ${Number(row.amount || 0).toLocaleString()}원
  </span>

  <span>
    ${row.created_at
      ? new Date(row.created_at).toLocaleString()
      : '-'}
  </span>
</label>
              `).join('')}

              <button
                type="button"
                class="duplicate-payment-delete-button"
                data-approval-number="${approvalNumber}"
              >
                중복결제 삭제
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `

    document.body.appendChild(modal)

    document.querySelectorAll(
      '.duplicate-payment-row input[type="radio"]'
    ).forEach((radio) => {
      radio.addEventListener('change', () => {
        const input = radio as HTMLInputElement
        const groupName = input.name
    
        document.querySelectorAll<HTMLInputElement>(
          'input[name="' + groupName + '"]'
        ).forEach((groupRadio) => {
          const row = groupRadio.closest(
            '.duplicate-payment-row'
          )
    
          const status = row?.querySelector(
            '.duplicate-payment-status'
          )
    
          if (!row || !status) return
    
          if (groupRadio.checked) {
            row.classList.add('keep-row')
            row.classList.remove('delete-row')
            status.textContent = '정상 유지'
          } else {
            row.classList.add('delete-row')
            row.classList.remove('keep-row')
            status.textContent = '삭제 예정'
          }
        })
      })
    })

    document.querySelector('#duplicate-payment-modal-close')
      ?.addEventListener('click', () => {
        modal.remove()
      })

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.remove()
      }
    })

    document.querySelectorAll('.duplicate-payment-delete-button')
      .forEach((button) => {
        button.addEventListener('click', async () => {
          const approvalNumber =
            (button as HTMLElement).getAttribute('data-approval-number') || ''

          const selected =
            document.querySelector<HTMLInputElement>(
              'input[name="keep-payment-' +
              approvalNumber +
              '"]:checked'
            )

          if (!selected) {
            alert('정상으로 남길 결제를 선택해주세요.')
            return
          }

          const keepPaymentId = Number(selected.value)

          const deletePaymentIds =
            (duplicateGroups[approvalNumber] || [])
              .map((row: any) => Number(row.id))
              .filter((id: number) => id !== keepPaymentId)

          if (deletePaymentIds.length === 0) {
            alert('삭제할 중복결제가 없습니다.')
            return
          }

          const adminPassword = prompt(
            '중복결제 삭제를 위해 관리자 비밀번호를 입력해주세요.'
          )

          if (!adminPassword) {
            return
          }

          const selectedPayment =
  (duplicateGroups[approvalNumber] || [])
    .find(
      (row: any) =>
        Number(row.id) === keepPaymentId
    )

const confirmMessage =
  '중복결제를 삭제하시겠습니까?\n\n' +
  '승인번호: ' +
  approvalNumber +
  '\n\n' +
  '정상으로 남길 결제\n' +
  '- 가맹점: ' +
  (selectedPayment?.merchant_name || '-') +
  '\n' +
  '- 결제금액: ' +
  Number(selectedPayment?.amount || 0).toLocaleString() +
  '원\n\n' +
  '삭제 대상: ' +
  deletePaymentIds.length +
  '건\n\n' +
  '삭제되는 결제는 중복결제 이력에 백업됩니다.'

if (!confirm(confirmMessage)) {
  return
}

          const adminId =
            sessionStorage.getItem('admin_id') || ''

          const { data, error } =
            await supabase.functions.invoke(
              'delete-duplicate-payments',
              {
                body: {
                  loginId: adminId,
                  password: adminPassword,
                  keepPaymentId,
                  deletePaymentIds
                }
              }
            )

          if (error) {
            alert(
              '중복결제 삭제 실패: ' +
              error.message
            )
            return
          }

          if (!data?.success) {
            alert(
              data?.error ||
              '중복결제 삭제에 실패했습니다.'
            )
            return
          }

          alert(
            '중복결제 ' +
            data.deletedCount +
            '건 삭제 완료\n\n' +
            '✓ 원본 백업 완료\n' +
            '✓ 출금·정산 재계산 완료'
          )

          location.reload()
        })
      })
  })

  document.querySelector('#payout-error-card')
  ?.addEventListener('click', () => {
    if (payoutErrorPayments.length === 0) {
      alert('출금오류 내역이 없습니다.')
      return
    }

    document.querySelector('#payout-error-modal')?.remove()

    const modal = document.createElement('div')
    modal.id = 'payout-error-modal'
    modal.className = 'payout-error-modal'

    modal.innerHTML = `
      <div class="payout-error-modal-card">
        <div class="payout-error-modal-header">
          <h3>출금오류 관리</h3>

          <button
            type="button"
            id="payout-error-modal-close"
            class="payout-error-modal-close"
          >
            ×
          </button>
        </div>

        <div class="payout-error-modal-body">
          ${payoutErrorPayments.map((payment: any) => `
            <div class="payout-error-row">
              <div>
                <strong>${payment.merchant_name || '-'}</strong>
                <span>
                  ${payment.merchant_id
                    ? 'MER' + String(payment.merchant_id).padStart(4, '0')
                    : '-'}
                </span>
              </div>

              <div>
                <span>출금예정금액</span>
                <strong>
                  ${Number(
                    payment.settlement_amount ||
                    Number(payment.amount || 0) -
                    Number(payment.fee_amount || 0)
                  ).toLocaleString()}원
                </strong>
              </div>

              <div>
                <span>오류사유</span>
                <strong>
                  ${payment.payout_error_message || '출금 처리 실패'}
                </strong>
              </div>

              <button
                type="button"
                class="payout-error-retry-button"
                data-id="${payment.id}"
              >
                재처리
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `

    document.body.appendChild(modal)

    document.querySelector('#payout-error-modal-close')
      ?.addEventListener('click', () => {
        modal.remove()
      })

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.remove()
      }
    })

    document.querySelectorAll('.payout-error-retry-button')
      .forEach((button) => {
        button.addEventListener('click', async () => {
          const paymentId =
            Number((button as HTMLElement).getAttribute('data-id'))

          if (!paymentId) {
            alert('출금오류 결제정보를 찾을 수 없습니다.')
            return
          }

          if (!confirm('이 출금건을 다시 출금대기로 변경하시겠습니까?')) {
            return
          }

          const { error } = await supabase
            .from('payments')
            .update({
              payout_status: '출금대기',
              payout_error_code: null,
              payout_error_message: null,
              payout_last_attempt_at: new Date().toISOString()
            })
            .eq('id', paymentId)

          if (error) {
            alert('출금 재처리 실패: ' + error.message)
            return
          }

          alert('출금대기로 변경되었습니다.')
          location.reload()
        })
      })
  })

  document.querySelector('#account-error-card')
  ?.addEventListener('click', () => {
    if (accountErrorPayments.length === 0) {
      alert('계좌오류 내역이 없습니다.')
      return
    }

    document.querySelector('#account-error-modal')?.remove()

    const modal = document.createElement('div')
    modal.id = 'account-error-modal'
    modal.className = 'payout-error-modal'

    modal.innerHTML = `
      <div class="payout-error-modal-card">
        <div class="payout-error-modal-header">
          <h3>계좌오류 관리</h3>

          <button
            type="button"
            id="account-error-modal-close"
            class="payout-error-modal-close"
          >
            ×
          </button>
        </div>

        <div class="payout-error-modal-body">
          ${accountErrorPayments.map((payment: any) => `
            <div class="payout-error-row">
              <div>
                <strong>${payment.merchant_name || '-'}</strong>
                <span>
                  ${payment.merchant_id
                    ? 'MER' + String(payment.merchant_id).padStart(4, '0')
                    : '-'}
                </span>
              </div>

              <div>
                <span>출금예정금액</span>
                <strong>
                  ${Number(
                    payment.settlement_amount ||
                    Number(payment.amount || 0) -
                    Number(payment.fee_amount || 0)
                  ).toLocaleString()}원
                </strong>
              </div>

              <div>
                <span>계좌오류 사유</span>
                <strong>
                  ${payment.account_error_message || '계좌정보 확인 필요'}
                </strong>
              </div>

              <button
                type="button"
                class="account-error-check-button"
                data-merchant-id="${payment.merchant_id || ''}"
              >
                가맹점 확인
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `

    document.body.appendChild(modal)

    document.querySelector('#account-error-modal-close')
      ?.addEventListener('click', () => {
        modal.remove()
      })

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.remove()
      }
    })

    document.querySelectorAll('.account-error-check-button')
      .forEach((button) => {
        button.addEventListener('click', () => {
          const merchantId =
            (button as HTMLElement).getAttribute('data-merchant-id') || ''

          if (!merchantId) {
            alert('가맹점 정보를 찾을 수 없습니다.')
            return
          }

          sessionStorage.setItem('selected_merchant_id', merchantId)
          sessionStorage.setItem('adminPage', 'merchant')

          location.reload()
        })
      })
  })

const totalPages = Math.max(
  1,
  Math.ceil(filteredRows.length / payoutPageSize)
)
const pageInfoTop =
  document.querySelector<HTMLElement>('#payout-page-info-top')

const prevTop =
  document.querySelector<HTMLButtonElement>('#payout-prev-top')

const nextTop =
  document.querySelector<HTMLButtonElement>('#payout-next-top')

if (pageInfoTop) {
  pageInfoTop.textContent =
    payoutPage + ' / ' + totalPages
}

if (prevTop) {
  prevTop.disabled = payoutPage <= 1

  prevTop.onclick = () => {
    if (payoutPage <= 1) return

    payoutPage -= 1
    renderPayoutTable()
  }
}

if (nextTop) {
  nextTop.disabled = payoutPage >= totalPages

  nextTop.onclick = () => {
    if (payoutPage >= totalPages) return

    payoutPage += 1
    renderPayoutTable()
  }
}
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

          const settlementColorBar =
  '<span class="settlement-color-bar settlement-color-' +
  row.settlement_cycle +
  '"></span>'
    
          tr.innerHTML =
            '<td>' + (startIndex + index + 1) + '</td>' +
            '<td>' +
              (row.merchant_id
                ? 'MER' + String(row.merchant_id).padStart(4, '0')
                : '-') +
            '</td>' +
            '<td>' +
  settlementColorBar +
  (row.merchant_name || '-') +
  '<span class="payout-count-badge">' +
    row.payment_count +
  '</span>' +
'</td>' +

            '<td>' + (row.pg_company || '-') + '</td>' +
            '<td>' + amount.toLocaleString() + '원</td>' +
            '<td>' + feeAmount.toLocaleString() + '원</td>' +
            '<td>' + payoutAmount.toLocaleString() + '원</td>' +
            '<td>' + row.created_at.substring(0, 10) + '</td>' +
            '<td>' + row.payout_date + '</td>' +
            '<td>' + (row.payout_status || '출금대기') + '</td>' +
            '<td>' +

(row.payout_hold
  ? '<span class="payout-hold-badge">출금보류</span>' +
    '<br>' +
    (canManagePayoutHold
      ? '<button class="payout-hold-release-button" data-ids="' +
          row.payment_ids.join(',') +
        '">보류해제</button>'
      : '')

  : row.payout_status === '출금완료'

    ? '출금완료'

    : '<button class="payout-complete-button" data-ids="' +
        row.payment_ids.join(',') +
      '">출금완료</button>' +

      (canManagePayoutHold
        ? ' <button class="payout-hold-button" data-ids="' +
            row.payment_ids.join(',') +
          '">출금보류</button>'
        : '')

) +

'</td>';
    
          paymentTableBody.appendChild(tr)
        })
    
        
    
        document.querySelectorAll('.payout-complete-button')
  .forEach((button) => {
    button.addEventListener('click', async () => {
      const targetButton = button as HTMLButtonElement

      const paymentIdsText =
        targetButton.getAttribute('data-ids') || ''

      const paymentIds = paymentIdsText
        .split(',')
        .map((id) => Number(id))
        .filter((id) => !Number.isNaN(id))

      if (paymentIds.length === 0) {
        alert('출금대상 결제정보가 없습니다.')
        return
      }

      targetButton.disabled = true
      targetButton.textContent = '처리중'

      try {
        const { data: paymentRows, error: paymentError } =
          await supabase
            .from('payments')
            .select(`
              id,
              merchant_id,
              merchant_name,
              settlement_amount,
              payout_status,
              payout_hold
            `)
            .in('id', paymentIds)

        if (paymentError) {
          alert('결제정보 조회 실패: ' + paymentError.message)
          return
        }

        if (!paymentRows || paymentRows.length === 0) {
          alert('출금대상 결제정보가 없습니다.')
          return
        }

        const merchantIds = [
          ...new Set(
            paymentRows
              .map((row) => String(row.merchant_id || '').trim())
              .filter(Boolean)
          )
        ]

        if (merchantIds.length !== 1) {
          alert('서로 다른 가맹점의 결제건은 함께 출금할 수 없습니다.')
          return
        }

        const rawMerchantId = merchantIds[0]

const merchantId = rawMerchantId.startsWith('MER')
  ? rawMerchantId
  : 'MER' + rawMerchantId.padStart(4, '0')
        const merchantName =
          String(paymentRows[0].merchant_name || merchantId)

        const hasHoldPayment = paymentRows.some(
          (row) =>
            row.payout_hold === true ||
            row.payout_status === '출금보류'
        )

        if (hasHoldPayment) {
          alert('출금보류된 결제건이 포함되어 있습니다.')
          return
        }

        const payoutAmount = paymentRows.reduce(
          (sum, row) =>
            sum + Number(row.settlement_amount || 0),
          0
        )

        if (payoutAmount <= 0) {
          alert('출금예정금액이 올바르지 않습니다.')
          return
        }

        const sellerResponse = await fetch(
          '/api/toss-seller-get'
        )

        const sellerResult = await sellerResponse.json()

        if (!sellerResponse.ok || !sellerResult.success) {
          alert('토스 셀러 조회에 실패했습니다.')
          return
        }

        const sellers =
          sellerResult?.data?.entityBody?.items || []

        const seller = sellers.find(
          (item: any) =>
            String(item.refSellerId || '').trim() === merchantId
        )

        if (!seller?.id) {
          alert(
            merchantId +
              ' 가맹점이 토스 셀러로 등록되어 있지 않습니다.'
          )
          return
        }

        if (seller.status !== 'APPROVED') {
          alert(
            '토스 셀러가 지급가능 상태가 아닙니다.\n현재 상태: ' +
              seller.status
          )
          return
        }

        const balanceResponse = await fetch(
          '/api/toss-balance'
        )

        const balanceResult = await balanceResponse.json()

        if (!balanceResponse.ok || !balanceResult.success) {
          alert('토스 지급가능 잔액 조회에 실패했습니다.')
          return
        }

        const availableAmount = Number(
          balanceResult?.data?.entityBody
            ?.availableAmount?.value || 0
        )

        if (availableAmount < payoutAmount) {
          alert(
            '토스 지급대행 잔액이 부족합니다.\n\n' +
              '지급 가능 잔액: ' +
              availableAmount.toLocaleString() +
              '원\n' +
              '출금 예정 금액: ' +
              payoutAmount.toLocaleString() +
              '원'
          )
          return
        }

        if (
          !confirm(
            merchantName +
              ' 가맹점에 ' +
              payoutAmount.toLocaleString() +
              '원을 실제 지급하시겠습니까?'
          )
        ) {
          return
        }

        const minPaymentId = Math.min(...paymentIds)
        const maxPaymentId = Math.max(...paymentIds)

        const refPayoutId =
          'NXG-' +
          merchantId +
          '-' +
          minPaymentId +
          '-' +
          maxPaymentId

        const payoutResponse = await fetch(
          '/api/toss-payout',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              destination: seller.id,
              amount: payoutAmount,
              transactionDescription: '가맹점정산',
              refPayoutId
            })
          }
        )

        const payoutResult = await payoutResponse.json()

        if (!payoutResponse.ok || !payoutResult.success) {
          const errorMessage =
            payoutResult?.data?.error?.message ||
            payoutResult?.message ||
            '토스 지급 요청에 실패했습니다.'

          alert(errorMessage)
          return
        }

        const { error: updateError } = await supabase
  .from('payments')
  .update({
    payout_status: '출금완료',
    payout_time: new Date().toISOString()
  })
  .in('id', paymentIds)

        if (updateError) {
          alert(
            '토스 지급 요청은 전송됐지만 DB 저장에 실패했습니다.\n' +
              updateError.message
          )
          return
        }

        alert(
          '출금완료 처리되었습니다.\n\n' +
            '가맹점: ' +
            merchantName +
            '\n' +
            '지급금액: ' +
            payoutAmount.toLocaleString() +
            '원'
        )

        location.reload()
      } catch (error) {
        alert(
          error instanceof Error
            ? error.message
            : '출금 처리 중 오류가 발생했습니다.'
        )
      } finally {
        targetButton.disabled = false
        targetButton.textContent = '출금완료'
      }
    })
  })
}

      document.querySelectorAll('.payout-hold-button')
      .forEach((button) => {
        button.addEventListener('click', async () => {
          const currentAdminId =
            sessionStorage.getItem('admin_id') || ''
    
          if (currentAdminId !== 'NXGMASTER16') {
            alert('출금보류는 대표관리자만 처리할 수 있습니다.')
            return
          }
    
          const paymentIdsText =
            (button as HTMLElement).getAttribute('data-ids') || ''
    
          const paymentIds = paymentIdsText
            .split(',')
            .map((id) => Number(id))
            .filter((id) => !Number.isNaN(id))
    
          if (paymentIds.length === 0) {
            alert('출금보류 대상 결제정보가 없습니다.')
            return
          }
    
          const holdReason = prompt(
            '출금보류 사유를 입력해주세요.\n\n예: 불법거래 의심, 민원접수, 수사기관 요청'
          )
    
          if (!holdReason?.trim()) {
            return
          }
    
          const adminPassword = prompt(
            '출금보류 처리를 위해 관리자 비밀번호를 입력해주세요.'
          )
    
          if (!adminPassword) {
            return
          }
    
          const { data: verifiedAdmin, error: verifyError } =
            await supabase
              .from('admin_users')
              .select('login_id, role, status')
              .eq('login_id', currentAdminId)
              .eq('password', adminPassword)
              .eq('role', 'MASTER')
              .eq('status', '사용중')
              .maybeSingle()
    
          if (verifyError || !verifiedAdmin) {
            alert('관리자 비밀번호가 올바르지 않습니다.')
            return
          }
    
          if (
            !confirm(
              '이 가맹점의 현재 출금대상을 보류하시겠습니까?\n\n' +
              '보류사유: ' + holdReason.trim() + '\n' +
              '대상 결제: ' + paymentIds.length + '건'
            )
          ) {
            return
          }
    
          const { error } = await supabase
            .from('payments')
            .update({
              payout_hold: true,
              payout_hold_reason: holdReason.trim(),
              payout_hold_at: new Date().toISOString(),
              payout_hold_by: currentAdminId,
              payout_status: '출금보류'
            })
            .in('id', paymentIds)
    
          if (error) {
            alert('출금보류 처리 실패: ' + error.message)
            return
          }
    
          alert('출금보류 처리되었습니다.')
          location.reload()
        })
      })
    
    document.querySelectorAll('.payout-hold-release-button')
      .forEach((button) => {
        button.addEventListener('click', async () => {
          const currentAdminId =
            sessionStorage.getItem('admin_id') || ''
    
          if (currentAdminId !== 'NXGMASTER16') {
            alert('보류해제는 대표관리자만 처리할 수 있습니다.')
            return
          }
    
          const paymentIdsText =
            (button as HTMLElement).getAttribute('data-ids') || ''
    
          const paymentIds = paymentIdsText
            .split(',')
            .map((id) => Number(id))
            .filter((id) => !Number.isNaN(id))
    
          if (paymentIds.length === 0) {
            alert('보류해제 대상 결제정보가 없습니다.')
            return
          }
    
          const adminPassword = prompt(
            '보류해제를 위해 관리자 비밀번호를 입력해주세요.'
          )
    
          if (!adminPassword) {
            return
          }
    
          const { data: verifiedAdmin, error: verifyError } =
            await supabase
              .from('admin_users')
              .select('login_id, role, status')
              .eq('login_id', currentAdminId)
              .eq('password', adminPassword)
              .eq('role', 'MASTER')
              .eq('status', '사용중')
              .maybeSingle()
    
          if (verifyError || !verifiedAdmin) {
            alert('관리자 비밀번호가 올바르지 않습니다.')
            return
          }
    
          if (
            !confirm(
              '출금보류를 해제하시겠습니까?\n\n' +
              '해제 후에는 즉시 출금되지 않고 출금대기로 돌아갑니다.'
            )
          ) {
            return
          }
    
          const { error } = await supabase
            .from('payments')
            .update({
              payout_hold: false,
              payout_hold_reason: null,
              payout_hold_at: null,
              payout_hold_by: null,
              payout_status: '출금대기'
            })
            .in('id', paymentIds)
    
          if (error) {
            alert('보류해제 실패: ' + error.message)
            return
          }
    
          alert('보류가 해제되어 출금대기로 변경되었습니다.')
          location.reload()
        })
      })

      document.querySelector('#payout-error-card')
      
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
    if (currentPayoutView === 'manager') {
      const managerTab =
        document.querySelector<HTMLElement>(
          '.payout-sub-tab[data-payout-view="manager"]'
        )

      managerTab?.click()
      return
    }

    payoutPage = 1
    renderPayoutTable()
  })

  const payoutStartDate =
  document.querySelector<HTMLInputElement>('#payout-start-date')!

const payoutEndDate =
  document.querySelector<HTMLInputElement>('#payout-end-date')!

const formatDate = (date: Date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

document.querySelector('#payout-today-btn')
?.addEventListener('click', () => {
  const today = formatDate(new Date())

  payoutStartDate.value = today
  payoutEndDate.value = today

  payoutPage = 1
  renderPayoutTable()
})

document.querySelector('#payout-yesterday-btn')
?.addEventListener('click', () => {
  const date = new Date()
  date.setDate(date.getDate() - 1)

  const yesterday = formatDate(date)

  payoutStartDate.value = yesterday
  payoutEndDate.value = yesterday

  payoutPage = 1
  renderPayoutTable()
})

document.querySelector('#payout-month-btn')
?.addEventListener('click', () => {
  const today = new Date()

  const firstDay =
    new Date(today.getFullYear(), today.getMonth(), 1)

  payoutStartDate.value = formatDate(firstDay)
  payoutEndDate.value = formatDate(today)

  payoutPage = 1
  renderPayoutTable()
})

document.querySelector('#payout-pg-filter')
?.addEventListener('change', () => {
  if (currentPayoutView === 'manager') return

  payoutPage = 1
  renderPayoutTable()
})

document.querySelector('#payout-status-filter')
?.addEventListener('change', () => {
  if (currentPayoutView === 'manager') return

  payoutPage = 1
  renderPayoutTable()
})
document.querySelector('#payout-target-filter')
?.addEventListener('change', () => {
  if (currentPayoutView === 'manager') return

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

    const orderMerchantType =
  sessionStorage.getItem('login_merchant_type') || ''

const isBeautyOrderPage =
  orderMerchantType === '뷰티'

    if (titleBox) {
      titleBox.innerHTML =
        isBeautyOrderPage
          ? '▶ 뷰티 주문관리 > 예약접수'
          : '▶ 주문관리 > 주문접수'
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
    isBeautyOrderPage
      ? (
          '<tr>' +
            '<th>No</th>' +
            '<th>주문번호</th>' +
            '<th>예약일</th>' +
            '<th>예약시간</th>' +
            '<th>서비스 / 직원</th>' +
            '<th>결제금액</th>' +
            '<th>상태</th>' +
            '<th>처리</th>' +
          '</tr>'
        )
      : (
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
        )
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
          .map((item: any) =>
            item.name + ' x ' + item.quantity
          )
          .join(', ')
      : '-'

    const beautyOrderItems = Array.isArray(order.items)
      ? order.items
          .map((item: any) => {
            

            return (
              (item.name || '-') +
              ' / ' +
              '직원ID ' + (item.beauty_staff_id || order.beauty_staff_id || '-') +
              ' / ' +
              Number(item.price || 0).toLocaleString() +
              '원 x ' +
              Number(item.quantity || 1)
            )
          })
          .join('<br/>')
      : '-'

    tr.innerHTML =
      isBeautyOrderPage
        ? (
            '<td>' + (start + index + 1) + '</td>' +

            '<td>' +
              '<button ' +
                'class="merchant-receipt-link" ' +
                'data-order="' + orderNumber + '" ' +
                'data-amount="' + (order.total_amount || 0) + '" ' +
                'data-date="' + (order.created_at || '') + '" ' +
                'data-items="' + beautyOrderItems + '" ' +
                'data-payment-key="' + (order.payment_key || '-') + '" ' +
                'data-customer="' + (order.customer_name || '현장고객') + '"' +
              '>' +
                orderNumber + '번' +
              '</button>' +
            '</td>' +

            '<td>' +
  (order.reservation_date || '-') +
  '<br/>' +
  '<span class="approval-number cancel-approval-link" ' +
    'data-id="' + order.id + '" ' +
    'data-created-at="' + order.created_at + '" ' +
    'data-amount="' + order.total_amount + '">' +
    '결제/예약취소' +
  '</span>' +
'</td>' +

            '<td>' + (order.reservation_time || '-') + '</td>' +

            '<td style="line-height:1.8;">' +
              beautyOrderItems +
            '</td>' +

            '<td>' +
              Number(order.total_amount || 0).toLocaleString() +
              '원' +
            '</td>' +

            '<td>' +
              (
                order.cancel_status === '취소요청'
                  ? '<span class="order-status-cancel-request">취소요청</span>'
                  : order.order_status === '취소완료'
                    ? '<span class="order-status-cancel">취소완료</span>'
                    : order.order_status === '완료'
                      ? '<span class="order-status-complete">완료</span>'
                      : '<span class="order-status-received">접수</span>'
              ) +
            '</td>' +

            '<td>' +
              (
                order.order_status === '완료'
                  ? '완료'
                  : '<button class="order-complete-button" data-id="' +
                      order.id +
                    '">완료처리</button>'
              ) +
            '</td>'
          )
        : (
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

            '<td>MER' +
              String(order.merchant_id || 1).padStart(4, '0') +
            '</td>' +

           '<td>' + orderItems + '</td>' +

            '<td>' +
              Number(order.total_amount || 0).toLocaleString() +
              '원' +
            '</td>' +

            '<td>' +
              (
                order.cancel_status === '취소요청'
                  ? '<span class="order-status-cancel-request">취소요청</span>'
                  : order.order_status === '취소완료'
                    ? '<span class="order-status-cancel">취소완료</span>'
                    : order.order_status === '완료'
                      ? '<span class="order-status-complete">완료</span>'
                      : '<span class="order-status-received">접수</span>'
              ) +
            '</td>' +

            '<td>' +
              (
                order.order_status === '완료'
                  ? '완료'
                  : '<button class="order-complete-button" data-id="' +
                      order.id +
                    '">조리완료</button>'
              ) +
            '</td>' +

            '<td>' +
              '<button class="customer-call-button" data-number="' +
                orderNumber +
              '">' +
                '고객호출' +
              '</button>' +
            '</td>'
          )

    tr.setAttribute(
      'data-status',
      order.order_status || '접수'
    )

    paymentTableBody.appendChild(tr)
  })

  const pageInfo = document.querySelector('#order-page-info')

  if (pageInfo) {
    pageInfo.textContent =
      currentOrderPage + ' / ' + totalOrderPage
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
  'https://nxgsoft.co.kr/pay/?merchant_id=' +
  loginMerchantId

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
  'https://nxgsoft.co.kr/pay/?merchant_id=' +
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
              '<td>' +
  (merchant.merchant_name || '-') +
  '<br/><span style="font-size:12px;color:#555;">담당자: ' +
  (merchant.manager_admin_name || '-') +
  '</span>' +
  '<br/><span style="font-size:12px;color:#555;">' +
  (merchant.manager_phone || '-') +
  '</span>' +
'</td>' +
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
    '<button id="payment-excel-download">엑셀 다운로드</button>' +
    '<select id="admin-page-size">' +
      '<option value="10">10개씩 보기</option>' +
      '<option value="20">20개씩 보기</option>' +
      '<option value="50">50개씩 보기</option>' +
    '</select>'
}

if (subMenu) {
  subMenu.innerHTML =
    '승인내역조회 | 현금영수증 발급 | 고액 동일카드 조회'
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

if (adminRole === 'MANAGER') {
  const { data: currentManager, error: managerPaymentError } = await supabase
    .from('admin_users')
    .select('id')
    .eq('login_id', adminId)
    .single()

  if (managerPaymentError || !currentManager) {
    alert('담당자 정보를 확인하지 못했습니다.')
    return
  }

  const { data: managerMerchants, error: managerMerchantError } = await supabase
    .from('merchants')
    .select('id')
    .eq('manager_admin_id', currentManager.id)

  if (managerMerchantError) {
    alert('담당 가맹점 정보를 확인하지 못했습니다.')
    return
  }

  const managerMerchantIds =
    (managerMerchants || []).map((merchant) => Number(merchant.id))

  payments = payments.filter((payment) =>
    managerMerchantIds.includes(Number(payment.merchant_id))
  )
}

if (adminRole === 'AGENCY' || adminRole === 'BRANCH') {
  const { data: currentAdmin, error: currentAdminError } = await supabase
    .from('admin_users')
    .select('id')
    .eq('login_id', adminId)
    .single()

  if (currentAdminError || !currentAdmin) {
    alert('조직 정보를 확인하지 못했습니다.')
    return
  }

  let merchantQuery = supabase
    .from('merchants')
    .select('id')

  if (adminRole === 'AGENCY') {
    merchantQuery =
      merchantQuery.eq('agency_admin_id', currentAdmin.id)
  }

  if (adminRole === 'BRANCH') {
    merchantQuery =
      merchantQuery.eq('branch_admin_id', currentAdmin.id)
  }

  const { data: organizationMerchants, error: organizationMerchantError } =
    await merchantQuery

  if (organizationMerchantError) {
    alert('소속 가맹점 정보를 확인하지 못했습니다.')
    return
  }

  const organizationMerchantIds =
    (organizationMerchants || []).map((merchant) =>
      Number(merchant.id)
    )

  payments = payments.filter((payment) =>
    organizationMerchantIds.includes(Number(payment.merchant_id))
  )
}

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

const { data: paymentCancelRequests, error: paymentCancelRequestError } =
  await supabase
    .from('cancel_requests')
    .select('id, payment_id, status, reason')
    .eq('status', '요청중')

if (paymentCancelRequestError) {
  alert(
    '취소요청 조회 실패: ' +
    paymentCancelRequestError.message
  )
  return
}

const visiblePaymentIds =
  new Set(
    payments.map((payment) =>
      Number(payment.id)
    )
  )

const paymentCancelRequestMap =
  new Map<number, any>()

;(paymentCancelRequests || []).forEach((request: any) => {
  const paymentId =
    Number(request.payment_id)

  if (!visiblePaymentIds.has(paymentId)) {
    return
  }

  paymentCancelRequestMap.set(
    paymentId,
    request
  )
})

if (summaryBox) {
  const selectedDateType =
  document.querySelector<HTMLSelectElement>('#payment-date-type')?.value ||
  'created_at'

const totalAmount = payments.reduce((sum, payment) => {
  if (
    selectedDateType === 'created_at' &&
    payment.status !== 'paid'
  ) {
    return sum
  }

  return sum + Number(payment.amount || 0)
}, 0)

  const merchantCount =
    new Set(
      payments
        .map((payment) => Number(payment.merchant_id))
        .filter((merchantId) => merchantId > 0)
    ).size

  const cancelRequestCount =
    paymentCancelRequestMap.size

  summaryBox.innerHTML =
    '<div class="payment-mini-summary">' +

      '<div class="payment-mini-summary-card all-payments">' +
  '<strong>검색 데이터</strong>' +
  '<span>' + payments.length.toLocaleString() + '건</span>' +
'</div>' +

      '<div class="payment-mini-summary-card">' +
        '<strong>가맹점</strong>' +
        '<span>' + merchantCount.toLocaleString() + '곳</span>' +
      '</div>' +

      '<div class="payment-mini-summary-card">' +
        '<strong>전체금액</strong>' +
        '<span>' + totalAmount.toLocaleString() + '원</span>' +
      '</div>' +

      '<div class="payment-mini-summary-card cancel-request">' +
  '<strong>취소요청</strong>' +
  '<span>' + cancelRequestCount.toLocaleString() + '건</span>' +
'</div>' +

    '</div>'
}

document
  .querySelector('.payment-mini-summary-card.cancel-request')
  ?.addEventListener('click', () => {
    sessionStorage.setItem(
      'payment_cancel_request_filter',
      '요청중'
    )

    document
      .querySelector<HTMLElement>(
        '.admin-tab[data-page="payment"]'
      )
      ?.click()
  })

  document
  .querySelector('.payment-mini-summary-card.all-payments')
  ?.addEventListener('click', () => {
    sessionStorage.removeItem(
      'payment_cancel_request_filter'
    )

    document
      .querySelector<HTMLElement>(
        '.admin-tab[data-page="payment"]'
      )
      ?.click()
  })

if (tableHead) {
  tableHead.innerHTML =
    '<tr>' +
      '<th>No</th>' +
      '<th>승인일<br/>승인번호</th>' +
      '<th>취소일<br/>거래번호</th>' +
      '<th>가맹점아이디/구분<br/>가맹점상호/가맹점명</th>' +
      '<th>매입사</th>' +
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

const cancelRequestFilter =
  sessionStorage.getItem('payment_cancel_request_filter')

const filteredVisiblePayments =
  cancelRequestFilter === '요청중'
    ? payments.filter((payment) =>
        paymentCancelRequestMap.has(Number(payment.id))
      )
    : payments

    document
  .querySelector<HTMLButtonElement>('#payment-excel-download')
  ?.addEventListener('click', () => {
    if (filteredVisiblePayments.length === 0) {
      alert('다운로드할 결제내역이 없습니다.')
      return
    }

    const excelRows = filteredVisiblePayments.map(
      (payment: any, index: number) => {
        const amount = Number(payment.amount || 0)
        const feeAmount = Number(payment.fee_amount || 0)

        const settlementAmount = Number(
          payment.settlement_amount ?? amount - feeAmount
        )

        const installmentMonths =
          Number(payment.installment_months || 0)

        return {
          No: index + 1,

          승인일:
            payment.approved_at ||
            payment.created_at ||
            '',

          승인번호:
            payment.approval_number || '',

          취소일:
            payment.canceled_at || '',

          거래번호:
            payment.order_id ||
            payment.payment_key ||
            '',

          가맹점ID:
            payment.merchant_id
              ? 'MER' +
                String(payment.merchant_id).padStart(4, '0')
              : '',

          가맹점명:
            payment.merchant_name || '',

          매입사:
            payment.card_company || '',

          구매자연락처:
            payment.buyer_phone ||
            payment.phone ||
            '',

          구매상품:
            payment.order_name ||
            payment.product_name ||
            '',

          구매자성명:
            payment.sender_name ||
            payment.buyer_name ||
            '',

          메모:
            payment.message || '',

          카드번호:
            payment.card_number || '',

          할부구분:
            installmentMonths > 0
              ? installmentMonths + '개월'
              : '일시불',

          결제상태:
            payment.status === 'cancel'
              ? '취소'
              : '승인',

          결제수단:
            payment.payment_method || '카드',

          결제금액:
            amount,

          거래방식:
            payment.pg_company || '',

          물품금액:
            amount,

          거래수수료:
            feeAmount,

          가맹점금액:
            settlementAmount
        }
      }
    )

    const totalExcelAmount =
      filteredVisiblePayments.reduce(
        (sum: number, payment: any) =>
          sum + Number(payment.amount || 0),
        0
      )

    excelRows.push({} as any)

    excelRows.push({
      No: '',
      승인일: '검색 건수',
      승인번호:
        filteredVisiblePayments.length + '건',
      취소일: '',
      거래번호: '',
      가맹점ID: '',
      가맹점명: '',
      매입사: '',
      구매자연락처: '',
      구매상품: '',
      구매자성명: '',
      메모: '',
      카드번호: '',
      할부구분: '',
      결제상태: '',
      결제수단: '',
      결제금액: '',
      거래방식: '',
      물품금액: '',
      거래수수료: '',
      가맹점금액: ''
    } as any)

    excelRows.push({
      No: '',
      승인일: '전체금액',
      승인번호: totalExcelAmount,
      취소일: '',
      거래번호: '',
      가맹점ID: '',
      가맹점명: '',
      매입사: '',
      구매자연락처: '',
      구매상품: '',
      구매자성명: '',
      메모: '',
      카드번호: '',
      할부구분: '',
      결제상태: '',
      결제수단: '',
      결제금액: '',
      거래방식: '',
      물품금액: '',
      거래수수료: '',
      가맹점금액: ''
    } as any)

    const worksheet =
      XLSX.utils.json_to_sheet(excelRows)

    worksheet['!cols'] = [
      { wch: 6 },
      { wch: 22 },
      { wch: 16 },
      { wch: 22 },
      { wch: 32 },
      { wch: 14 },
      { wch: 24 },
      { wch: 15 },
      { wch: 18 },
      { wch: 24 },
      { wch: 16 },
      { wch: 28 },
      { wch: 22 },
      { wch: 12 },
      { wch: 12 },
      { wch: 12 },
      { wch: 14 },
      { wch: 16 },
      { wch: 14 },
      { wch: 14 },
      { wch: 14 }
    ]

    const workbook =
      XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      '결제내역'
    )

    const today =
      new Date().toISOString().slice(0, 10)

    XLSX.writeFile(
      workbook,
      `결제내역_${today}.xlsx`
    )
  })

    const savedPaymentPage =
    Number(
      sessionStorage.getItem('payment_current_page') || '1'
    )
  
  const totalPaymentPages =
    Math.max(
      1,
      Math.ceil(
        filteredVisiblePayments.length / adminPageSize
      )
    )
  
  const currentPaymentPage =
    Math.min(
      Math.max(savedPaymentPage, 1),
      totalPaymentPages
    )
  
  const paymentStartIndex =
    (currentPaymentPage - 1) * adminPageSize
  
  const visiblePayments =
    filteredVisiblePayments.slice(
      paymentStartIndex,
      paymentStartIndex + adminPageSize
    )

    const paymentPageSizeSelectElement =
    document.querySelector<HTMLSelectElement>('#admin-page-size')
  
  const paymentToolbar =
    paymentPageSizeSelectElement?.parentElement
  
  paymentToolbar
    ?.querySelector('#payment-pagination')
    ?.remove()
  
  if (paymentToolbar) {
    paymentToolbar.style.position = 'relative'
  
    const paymentPagination =
      document.createElement('div')
  
    paymentPagination.id = 'payment-pagination'
  
    paymentPagination.innerHTML =
      '<button type="button" id="payment-prev-page">이전</button>' +
      '<span>' +
        currentPaymentPage +
        ' / ' +
        totalPaymentPages +
      '</span>' +
      '<button type="button" id="payment-next-page">다음</button>'
  
    paymentToolbar.appendChild(paymentPagination)
  
    document
      .querySelector<HTMLButtonElement>('#payment-prev-page')
      ?.addEventListener('click', () => {
        if (currentPaymentPage <= 1) return
  
        sessionStorage.setItem(
          'payment_current_page',
          String(currentPaymentPage - 1)
        )
  
        document
          .querySelector<HTMLElement>(
            '.admin-tab[data-page="payment"]'
          )
          ?.click()
      })
  
    document
      .querySelector<HTMLButtonElement>('#payment-next-page')
      ?.addEventListener('click', () => {
        if (currentPaymentPage >= totalPaymentPages) return
  
        sessionStorage.setItem(
          'payment_current_page',
          String(currentPaymentPage + 1)
        )
  
        document
          .querySelector<HTMLElement>(
            '.admin-tab[data-page="payment"]'
          )
          ?.click()
      })
  
    const prevButton =
      document.querySelector<HTMLButtonElement>(
        '#payment-prev-page'
      )
  
    const nextButton =
      document.querySelector<HTMLButtonElement>(
        '#payment-next-page'
      )
  
    if (prevButton) {
      prevButton.disabled = currentPaymentPage <= 1
    }
  
    if (nextButton) {
      nextButton.disabled =
        currentPaymentPage >= totalPaymentPages
    }
  }

visiblePayments.forEach((payment, index) => {
  const tr = document.createElement('tr')

  const cancelRequest =
    paymentCancelRequestMap.get(Number(payment.id))

  const cancelStatusText =
    payment.status === 'cancel'
      ? '취소완료'
      : cancelRequest
        ? '취소요청'
        : '-'

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
  (payment.approval_number || '-') +
  '</button>' +
'</td>' +
    '<td>' +
  '<button type="button" class="payment-cancel-link" data-id="' + payment.id + '">' +
  cancelStatusText +
    '<br/>' +
    '<span title="' + (payment.payment_key || '-') + '">' +
      ((payment.payment_key || '-').length > 18
        ? (payment.payment_key || '-').substring(0, 18) + '...'
        : (payment.payment_key || '-')) +
    '</span>' +
  '</button>' +
'</td>' +
    '<td>' + (payment.merchant_name || '-') + '<br/>가맹점ID ' + (payment.merchant_id || '-') + '</td>' +
    '<td>' +
  (payment.card_company || '-') +
'</td>' +

'<td>' +
  (payment.message || '-') +
'</td>' +

'<td>' +
  (payment.card_number || '-') +
  '<br/>' +
  (
    !payment.installment_months ||
    payment.installment_months === '00' ||
    payment.installment_months === '0' ||
    payment.installment_months === '일시불'
      ? '일시불'
      : payment.installment_months + '개월'
  ) +
'</td>' +
    '<td>' + getStatusText(payment.status) + '<br/>' + Number(payment.amount || 0).toLocaleString() + '원</td>' +
    '<td>' + (payment.pg_company || '온라인') + '<br/>' + Number(payment.amount || 0).toLocaleString() + '원</td>' +
    '<td>' +
  Number(payment.fee_amount || 0).toLocaleString() + '원<br/>' +
  Number(payment.settlement_amount || payment.amount || 0).toLocaleString() + '원' +
'</td>' 

if (payment.status === 'cancel') {
  tr.classList.add('payment-cancel-row')
}

paymentTableBody.appendChild(tr)
})

let isPaymentCancelProcessing = false

document.querySelectorAll('.payment-cancel-link')
  .forEach((button) => {
    button.addEventListener('click', async (event) => {
      event.preventDefault()
      event.stopPropagation()

      if (isPaymentCancelProcessing) {
        alert('취소 처리가 진행 중입니다. 잠시 후 다시 시도해주세요.')
        return
      }

      const paymentId = Number((button as HTMLElement).dataset.id)

      if (!window.confirm('이 결제를 실제 취소 처리할까요?')) {
        return
      }

      isPaymentCancelProcessing = true

document.querySelectorAll<HTMLElement>('.payment-cancel-link')
  .forEach((cancelButton) => {
    cancelButton.style.pointerEvents = 'none'
    cancelButton.style.opacity = '0.5'
  })

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


      const cancelRequest =
      paymentCancelRequestMap.get(Number(payment.id))
    
    const cancelReason =
      String(cancelRequest?.reason || '관리자 취소 승인').trim()

      const updateMerchantOrderCancelStatus = async () => {
        const orderCancelData = {
          order_status: '취소완료',
          payment_status: '취소완료',
          cancel_status: '취소완료',
          cancel_reason: cancelReason,
          cancel_requested_at: new Date().toISOString()
        }

        const paymentKeyForOrder =
          String(payment.payment_key || '').trim()

        const orderIdForOrder =
          String(payment.order_id || '').trim()

        const pgOrderIdForOrder =
          orderIdForOrder.replace(/[^a-zA-Z0-9]/g, '')

        let updatedOrderCount = 0

        if (paymentKeyForOrder) {
          const { data, error } =
            await supabase
              .from('orders')
              .update(orderCancelData)
              .eq('payment_key', paymentKeyForOrder)
              .select('id')

          if (error) {
            alert(
              '결제는 취소됐지만 가맹점 주문상태 반영에 실패했습니다.\n' +
              error.message
            )
            return false
          }

          updatedOrderCount += data?.length || 0
        }

        if (pgOrderIdForOrder) {
          const { data, error } =
            await supabase
              .from('orders')
              .update(orderCancelData)
              .eq('pg_order_id', pgOrderIdForOrder)
              .select('id')

          if (error) {
            alert(
              '결제는 취소됐지만 가맹점 주문상태 반영에 실패했습니다.\n' +
              error.message
            )
            return false
          }

          updatedOrderCount += data?.length || 0
        }

        if (updatedOrderCount === 0) {
          alert(
            '결제는 취소됐지만 가맹점 주문을 찾지 못했습니다.\n' +
            'payment_key 또는 주문번호 연결을 확인해야 합니다.'
          )
          return false
        }

        return true
      }

    if (String(payment.pg_company || '').includes('토스')) {
      if (!payment.payment_key) {
        alert('토스 paymentKey가 없습니다.')
        return
      }

      const tossCancelResponse = await fetch(
        '/api/toss-cancel',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            paymentKey: payment.payment_key,
            cancelReason
          })
        }
      )

      const tossCancelData =
        await tossCancelResponse.json()

      if (!tossCancelResponse.ok) {
        alert(
          '토스 실제 취소에 실패했습니다.\n\n' +
          (
            tossCancelData.message ||
            tossCancelData.error?.message ||
            '알 수 없는 오류'
          )
        )
        return
      }

      const { error: paymentUpdateError } =
        await supabase
          .from('payments')
          .update({
            status: 'cancel',
            canceled_at: new Date().toISOString(),
            payout_status: '출금제외',
            settlement_status: '취소'
          })
          .eq('id', Number(payment.id))

      if (paymentUpdateError) {
        alert(
          '토스 취소는 성공했지만 결제내역 수정에 실패했습니다.\n' +
          paymentUpdateError.message
        )
        return
      }

      const { error: cancelRequestUpdateError } =
        await supabase
          .from('cancel_requests')
          .update({
            status: '승인완료',
            processed_at: new Date().toISOString()
          })
          .eq('payment_id', Number(payment.id))
          .eq('status', '요청중')

      if (cancelRequestUpdateError) {
        alert(
          '토스 취소는 성공했지만 취소요청 상태 변경에 실패했습니다.\n' +
          cancelRequestUpdateError.message
        )
        return
      }

      const orderUpdateOk =
      await updateMerchantOrderCancelStatus()

    if (!orderUpdateOk) {
      return
    }

      alert('토스 결제가 실제 취소되었습니다.')
      location.reload()
      return
    }

    if (payment.pg_company !== '코페이') {
      alert(
        '현재 관리자 취소 API는 코페이 결제만 지원합니다.\n' +
        '결제 PG사: ' +
        (payment.pg_company || '-')
      )
      return
    } 
      
      const cancelResponse = await fetch(
        '/api/korpay-cancel',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            paymentId: Number(payment.id),
            cancelName:
              sessionStorage.getItem('admin_name') ||
              '관리자',
            cancelMessage: cancelReason
          })
        }
      )
      
      const cancelData = await cancelResponse.json()
      
      if (!cancelResponse.ok || !cancelData.success) {
        alert(
          '코페이 실제 취소에 실패했습니다.\n\n' +
          (cancelData.message || '알 수 없는 오류') +
          (
            cancelData.resultCode
              ? '\n응답코드: ' +
                cancelData.resultCode
              : ''
          )
        )
        return
      }
      
      const { error: cancelRequestUpdateError } =
        await supabase
          .from('cancel_requests')
          .update({
            status: '승인완료',
            processed_at: new Date().toISOString()
          })
          .eq('payment_id', Number(payment.id))
          .eq('status', '요청중')
      
      if (cancelRequestUpdateError) {
        alert(
          '코페이 취소는 성공했지만 취소요청 상태 변경에 실패했습니다.\n' +
          cancelRequestUpdateError.message
        )
        return
      }

      const orderUpdateOk =
      await updateMerchantOrderCancelStatus()

    if (!orderUpdateOk) {
      return
    }
      
      alert(
        '코페이 결제가 실제 취소되었습니다.\n' +
        '취소 Noti 수신 후 결제관리와 가맹점 화면에 자동 반영됩니다.'
      )
      
      location.reload()
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
      alert('아이디 또는 비밀번호가 올바르지 않습니다.')
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

const merchantTypeForOrderQuery =
  sessionStorage.getItem('login_merchant_type') || '일반매장'

const isBeautyOrderQuery =
  merchantTypeForOrderQuery === '뷰티'

  const beautyViewMode =
  params.get('view') || 'schedule'

const isBeautySalesView =
  isBeautyOrderQuery && beautyViewMode === 'sales'

const getTodayDateValue = () => {
  const now = new Date()

  const year = now.getFullYear()

  const month =
    String(now.getMonth() + 1).padStart(2, '0')

  const day =
    String(now.getDate()).padStart(2, '0')

  return year + '-' + month + '-' + day
}

const beautySearchStartDate =
  startDate || getTodayDateValue()

const beautySearchEndDate =
  endDate ||
  (
    isBeautyOrderQuery && !isBeautySalesView
      ? '9999-12-31'
      : getTodayDateValue()
  )

let orderQuery = supabase
  .from('orders')
  .select('*')
  .eq('merchant_id', merchantId)

  if (
    (!isBeautyOrderQuery || isBeautySalesView) &&
    startDate &&
    endDate
  ) {
    orderQuery = orderQuery
      .gte('created_at', startDate + 'T00:00:00')
      .lte('created_at', endDate + 'T23:59:59')
  }

  let { data: orders, error } = await orderQuery
  .order('created_at', { ascending: false })

  if (isBeautyOrderQuery && !isBeautySalesView) {
    orders = (orders || []).filter((order: any) => {
      const beautyItemDates =
      Array.isArray(order.items)
        ? order.items
            .map((item: any) => item.reservation_date || '')
            .filter((date: string) => !!date)
        : []
    
    const checkDates =
      beautyItemDates.length > 0
        ? beautyItemDates
        : [order.reservation_date || '']
    
    return checkDates.some((date: string) =>
      date >= beautySearchStartDate &&
      date <= beautySearchEndDate
    )
  })
}
 
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

    let settlementQuery = supabase
  .from('payments')
  .select('settlement_amount,payout_status,created_at')
  .eq('merchant_id', merchantId)

if (startDate && endDate) {
  settlementQuery = settlementQuery
    .gte('created_at', startDate + 'T00:00:00')
    .lte('created_at', endDate + 'T23:59:59')
}

const {
  data: settlementPayments,
  error: settlementError
} = await settlementQuery

if (settlementError) {
  console.error(
    '정산예정금액 조회 실패:',
    settlementError
  )
}

const settlementAmount =
  (settlementPayments || []).reduce(
    (sum, payment) => {
      return (
        sum +
        Number(payment.settlement_amount || 0)
      )
    },
    0
  )

const settlementComplete =
  (settlementPayments || []).length > 0 &&
  (settlementPayments || []).every(
    (payment) =>
      payment.payout_status === '출금완료'
  )

  const { data: merchantReceiptPayments } =
  await supabase
    .from('payments')
    .select(`
      id,
      order_id,
      payment_key,
      approval_number,
      card_number,
      card_company,
      pg_company,
      pg_mid,
      amount,
      created_at
    `)
    .eq('merchant_id', merchantId)
    .order('created_at', { ascending: false })
    .limit(500)

    const merchantType =
  sessionStorage.getItem('login_merchant_type') || '일반매장'

  const isNormalStore =
  merchantType === '일반매장'

  const isBeauty =
  merchantType === '뷰티'

const isAcademy =
  merchantType === '아카데미'

const isWirelessTerminal =
  merchantType === '무선단말기'

  const isHotel =
  merchantType === '호텔'

 
  let terminalPayments: any[] = []

if (isWirelessTerminal) {
  const { data, error } = await supabase
    .from('payments')
    .select(`
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
    `)
    .eq('merchant_id', merchantId)
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) {
    console.error(
      '무선단말기 거래내역 조회 실패:',
      error
    )
  }

  terminalPayments = data || []
}

let merchantMenu = ''
let merchantContent = ''

if (isBeauty) {
  merchantMenu = `
    <button id="merchant-order-tab">주문관리</button>
    <button id="merchant-staff-tab">직원관리</button>
    <button id="merchant-product-tab">서비스관리</button>
    <button id="merchant-qr-tab">PICK QR</button>
    <button id="merchant-card-tab">카드결제</button>
  `

  merchantContent = ''

} else if (isNormalStore) {
  merchantMenu = `
    <button id="merchant-order-tab">주문관리</button>
    <button id="merchant-product-tab">상품관리</button>
    <button id="merchant-qr-tab">PICK QR</button>
    <button id="merchant-card-tab">카드결제</button>
  `

  merchantContent = ''

} else if (isHotel) {
  merchantMenu = `
    <button id="merchant-order-tab">주문/결제내역</button>
    <button id="merchant-product-tab">상품관리</button>
    <button id="merchant-hotel-room-tab">객실관리</button>
    <button id="merchant-hotel-preview-tab">고객 결제창</button>
    <button id="merchant-card-tab">카드결제</button>
  `

  merchantContent = ''

} else if (isWirelessTerminal) {
  const getLocalDateValue = (date: Date) => {
    const year = date.getFullYear()
  
    const month =
      String(date.getMonth() + 1)
        .padStart(2, '0')
  
    const day =
      String(date.getDate())
        .padStart(2, '0')
  
    return `${year}-${month}-${day}`
  }
  
  const todayDateValue =
    getLocalDateValue(new Date())
  
    const terminalDateParams =
    new URLSearchParams(
      window.location.search
    )
  
  const selectedStartDate =
    terminalDateParams.get('terminal_start_date') ||
    todayDateValue
  
  const selectedEndDate =
    terminalDateParams.get('terminal_end_date') ||
    todayDateValue
  
  const selectedDatePayments =
    terminalPayments.filter((payment) => {
      const dateText =
        payment.status === 'cancel'
          ? payment.canceled_at ||
            payment.approved_at ||
            payment.created_at
          : payment.approved_at ||
            payment.created_at
  
      if (!dateText) return false
  
      const paymentDateValue =
        getLocalDateValue(
          new Date(dateText)
        )
  
      return (
        paymentDateValue >= selectedStartDate &&
        paymentDateValue <= selectedEndDate
      )
    })

    const terminalPageParams =
  new URLSearchParams(window.location.search)

const terminalCurrentPage =
  Math.max(
    1,
    Number(
      terminalPageParams.get('terminal_page') || 1
    )
  )

const terminalPageSize =
  Math.max(
    1,
    Number(
      terminalPageParams.get('terminal_page_size') || 10
    )
  )

const terminalTotalPages =
  Math.max(
    1,
    Math.ceil(
      selectedDatePayments.length /
      terminalPageSize
    )
  )

const terminalSafePage =
  Math.min(
    terminalCurrentPage,
    terminalTotalPages
  )

const terminalStartIndex =
  (terminalSafePage - 1) *
  terminalPageSize

const terminalPagedPayments =
  selectedDatePayments.slice(
    terminalStartIndex,
    terminalStartIndex +
      terminalPageSize
  )
  
  const selectedPaidPayments =
    selectedDatePayments.filter((payment) =>
      payment.status === 'paid'
    )
  
  const selectedCancelPayments =
    selectedDatePayments.filter((payment) =>
      payment.status === 'cancel'
    )
  
  const selectedApprovedAmount =
    selectedPaidPayments.reduce(
      (sum, payment) =>
        sum + Number(payment.amount || 0),
      0
    )
  
  const selectedCanceledAmount =
    selectedCancelPayments.reduce(
      (sum, payment) =>
        sum + Number(payment.amount || 0),
      0
    )
  
  const selectedNetAmount =
    selectedApprovedAmount -
    selectedCanceledAmount
  
  const selectedSettlementAmount =
    selectedPaidPayments.reduce(
      (sum, payment) =>
        sum +
        Number(
          payment.settlement_amount || 0
        ),
      0
    )
  
  const selectedTotalCount =
    selectedDatePayments.length
  
  const selectedApprovedCount =
    selectedPaidPayments.length
  
  const selectedCanceledCount =
    selectedCancelPayments.length

  

  const getTerminalStatusText =
    (status: string) => {
      if (status === 'paid') return '승인'
      if (status === 'cancel') return '취소'
      if (status === 'ready') return '대기'

      return status || '-'
    }

  const getTerminalDateText =
    (payment: any) => {
      const dateText =
        payment.status === 'cancel'
          ? payment.canceled_at ||
            payment.created_at
          : payment.approved_at ||
            payment.created_at

      if (!dateText) return '-'

      return new Date(dateText)
        .toLocaleString('ko-KR')
    }

  merchantMenu = `
    <button id="terminal-payment-tab">
      거래내역
    </button>

    
  `

  merchantContent = `
    <div class="merchant-type-ready-box">

    <div class="terminal-date-search-box">

  <div class="terminal-date-search-row">

    <input
      type="date"
      id="terminal-start-date-input"
      value="${selectedStartDate}"
    />

    <span class="terminal-date-wave">
      ~
    </span>

    <input
      type="date"
      id="terminal-end-date-input"
      value="${selectedEndDate}"
    />

    <button
      type="button"
      id="terminal-date-search-button"
    >
      조회
    </button>

    <button
      type="button"
      id="terminal-date-today-button"
    >
      오늘
    </button>

  </div>

</div>

<div class="academy-dashboard">

  <div class="academy-card">
    <span>총매출</span>

    <strong>
      ${selectedApprovedAmount.toLocaleString()}원
    </strong>

    <small>
      승인 ${selectedApprovedCount.toLocaleString()}건
    </small>
  </div>

  <div class="academy-card">
    <span>취소금액</span>

    <strong>
      ${selectedCanceledAmount.toLocaleString()}원
    </strong>

    <small>
      취소 ${selectedCanceledCount.toLocaleString()}건
    </small>
  </div>

  <div class="academy-card">
    <span>순매출</span>

    <strong>
      ${selectedNetAmount.toLocaleString()}원
    </strong>

    <small>
      총 거래 ${selectedTotalCount.toLocaleString()}건
    </small>
  </div>

  <div class="academy-card">
    <span>정산금액</span>

    <strong>
      ${selectedSettlementAmount.toLocaleString()}원
    </strong>

    <small>
      정산대상 ${selectedApprovedCount.toLocaleString()}건
    </small>
  </div>

</div> 

      <div class="admin-table-wrap">

      <div class="admin-table-top">
  <button id="terminal-excel-download">
    엑셀 다운로드
  </button>

  <div class="admin-pagination">
    <button
      id="terminal-prev-page"
      ${terminalSafePage <= 1 ? 'disabled' : ''}
    >
      이전
    </button>

    <span>
      ${terminalSafePage} / ${terminalTotalPages}
    </span>

    <button
      id="terminal-next-page"
      ${terminalSafePage >= terminalTotalPages ? 'disabled' : ''}
    >
      다음
    </button>
  </div>

  <select id="terminal-page-size">
    <option value="10" ${terminalPageSize === 10 ? 'selected' : ''}>
      10개씩 보기
    </option>

    <option value="20" ${terminalPageSize === 20 ? 'selected' : ''}>
      20개씩 보기
    </option>

    <option value="50" ${terminalPageSize === 50 ? 'selected' : ''}>
      50개씩 보기
    </option>
  </select>
</div>

        <table class="admin-table terminal-payment-table">

          <thead>
            <tr>
              <th>거래일시</th>
              <th>승인번호</th>
              <th>거래번호</th>
              <th>금액</th>
              <th>상태</th>
              <th>정산상태</th>
            </tr>
          </thead>

          <tbody>
            ${
              selectedDatePayments.length === 0
                ? `
                  <tr>
                    <td colspan="6">
                      등록된 무선단말기 거래내역이 없습니다.
                    </td>
                  </tr>
                `
                : terminalPagedPayments
                  .map((payment) => `
                      <tr>
                        <td>
                          ${getTerminalDateText(payment)}
                        </td>

                        <td>
                          ${payment.approval_number || '-'}
                        </td>

                        <td>
                          ${
                            payment.order_id ||
                            payment.payment_key ||
                            '-'
                          }
                        </td>

                        <td>
                          ${Number(
                            payment.amount || 0
                          ).toLocaleString()}원
                        </td>

                        <td>
                          ${getTerminalStatusText(
                            payment.status
                          )}
                        </td>

                        <td>
                          ${
                            payment.payout_status ||
                            payment.settlement_status ||
                            '정산대기'
                          }
                        </td>
                      </tr>
                    `)
                    .join('')
            }
          </tbody>

        </table>
      </div>

    </div>
  `

} else if (isAcademy) {

  const memberDashboardParams =
    new URLSearchParams(window.location.search)

  const now = new Date()

  const currentYear =
    now.getFullYear()

  const currentMonth =
    String(now.getMonth() + 1).padStart(2, '0')

  const monthStart =
    `${currentYear}-${currentMonth}-01`

  const monthEndDate =
    new Date(currentYear, now.getMonth() + 1, 0)

  const monthEnd =
    `${currentYear}-${currentMonth}-${String(
      monthEndDate.getDate()
    ).padStart(2, '0')}`

  const selectedStartDate =
    memberDashboardParams.get('member_start_date') ||
    monthStart

  const selectedEndDate =
    memberDashboardParams.get('member_end_date') ||
    monthEnd


  /* =========================
     회원 조회
  ========================= */

  const {
    data: memberDashboardMembers,
    error: memberDashboardMemberError
  } = await supabase
    .from('members')
    .select('*')
    .eq('merchant_id', merchantId)

  if (memberDashboardMemberError) {
    console.error(
      '회원 현황 조회 실패:',
      memberDashboardMemberError
    )
  }


  /* =========================
     청구 조회
  ========================= */

  const {
    data: memberDashboardBillings,
    error: memberDashboardBillingError
  } = await supabase
    .from('billings')
    .select('*')
    .eq('merchant_id', merchantId)

  if (memberDashboardBillingError) {
    console.error(
      '청구 현황 조회 실패:',
      memberDashboardBillingError
    )
  }
  
  /* =========================
   아카데미 정산 조회
========================= */

const {
  data: memberDashboardPayments,
  error: memberDashboardPaymentError
} = await supabase
  .from('payments')
  .select(
    'id, merchant_id, status, created_at, settlement_amount, payout_status'
  )
  .eq('merchant_id', merchantId)

if (memberDashboardPaymentError) {
  console.error(
    '아카데미 정산 현황 조회 실패:',
    memberDashboardPaymentError
  )
}

const allAcademyPayments =
  memberDashboardPayments || []

const filteredAcademyPayments =
  allAcademyPayments.filter((payment) => {

    const paymentDate =
      String(payment.created_at || '').slice(0, 10)

    if (!paymentDate) {
      return false
    }

    if (
      paymentDate < selectedStartDate ||
      paymentDate > selectedEndDate
    ) {
      return false
    }

    if (payment.status === 'cancel') {
      return false
    }

    return true
  })

const settlementPendingAmount =
  filteredAcademyPayments.reduce(
    (sum, payment) => {

      if (
        payment.payout_status === '출금완료' ||
        payment.payout_status === '지급정지'
      ) {
        return sum
      }

      return (
        sum +
        Number(payment.settlement_amount || 0)
      )
    },
    0
  )

const settlementCompletedAmount =
  filteredAcademyPayments.reduce(
    (sum, payment) => {

      if (payment.payout_status !== '출금완료') {
        return sum
      }

      return (
        sum +
        Number(payment.settlement_amount || 0)
      )
    },
    0
  )

  const allMembers =
    memberDashboardMembers || []

  const allBillings =
    memberDashboardBillings || []


  /* =========================
     전체 회원수
  ========================= */

  const filteredMembers =
  allMembers.filter((member) => {

    const joinedAt =
      String(member.joined_at || '').slice(0, 10)

    if (!joinedAt) {
      return false
    }

    return (
      joinedAt >= selectedStartDate &&
      joinedAt <= selectedEndDate
    )
  })

const totalMemberCount =
  filteredMembers.length

const newMemberCount =
  filteredMembers.length


  /* =========================
     선택 기간 청구
  ========================= */

  const filteredBillings =
    allBillings.filter((billing) => {

      /*
        created_at이 있으면 실제 청구 생성일 사용
        없으면 billing_month의 1일을 기준으로 사용
      */
      const billingDate =
        billing.created_at
          ? String(billing.created_at).slice(0, 10)
          : billing.billing_month
            ? String(billing.billing_month) + '-01'
            : ''

      if (!billingDate) {
        return false
      }

      return (
        billingDate >= selectedStartDate &&
        billingDate <= selectedEndDate
      )
    })


  const billingCount =
    filteredBillings.length


  const unpaidCount =
    filteredBillings.filter((billing) =>
      billing.payment_status !== '완료'
    ).length


  const completedCount =
    filteredBillings.filter((billing) =>
      billing.payment_status === '완료'
    ).length


  const billingAmount =
    filteredBillings.reduce(
      (sum, billing) =>
        sum + Number(billing.amount || 0),
      0
    )


  /* =========================
     상단 메뉴
  ========================= */

  merchantMenu = `
    <button id="merchant-member-tab">회원관리</button>
    <button id="merchant-billing-tab">청구관리</button>
    <button id="merchant-batch-tab">수기결제</button>
    <button id="merchant-payment-list-tab">결제내역</button>
  `


  /* =========================
     일괄관리 메인홈
  ========================= */

  merchantContent = `
    <div class="merchant-type-ready-box batch-home-dashboard">

    <div class="academy-settlement-grid">

  <div class="academy-card academy-settlement-card">
    <span>정산 예정 금액</span>
    <strong>
      ${settlementPendingAmount.toLocaleString()}원
    </strong>
  </div>

  <div class="academy-card academy-settlement-card">
    <span>정산 완료 금액</span>
    <strong>
      ${settlementCompletedAmount.toLocaleString()}원
    </strong>
  </div>

</div>

      <div class="academy-dashboard batch-dashboard-grid">

  <div class="academy-card">
    <span>전체 회원수</span>
    <strong>${totalMemberCount.toLocaleString()}명</strong>
  </div>

  <div class="academy-card">
    <span>신규회원</span>
    <strong>${newMemberCount.toLocaleString()}명</strong>
  </div>

  <div class="academy-card">
    <span>청구금액</span>
    <strong>${billingAmount.toLocaleString()}원</strong>
  </div>

  <div class="academy-card">
    <span>청구건수</span>
    <strong>${billingCount.toLocaleString()}건</strong>
  </div>

  <div class="academy-card">
    <span>미납건수</span>
    <strong>${unpaidCount.toLocaleString()}건</strong>
  </div>

  <div class="academy-card">
    <span>완료건수</span>
    <strong>${completedCount.toLocaleString()}건</strong>
  </div>

</div>


      <div class="batch-dashboard-search">

        <input
          id="batch-dashboard-start-date"
          type="date"
          value="${selectedStartDate}"
        />

        <span>~</span>

        <input
          id="batch-dashboard-end-date"
          type="date"
          value="${selectedEndDate}"
        />

        <button
          id="batch-dashboard-search-button"
          type="button"
        >
          검색
        </button>

      </div>

    </div>
  `

} else {
  merchantMenu = ''
  merchantContent = `
    <div class="merchant-type-ready-box">
      가맹점 유형을 확인해주세요.
    </div>
  `
}

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

  ${(isNormalStore || isBeauty || isHotel) ? `
    <span class="toolbar-divider"></span>
    <button class="order-filter-btn" data-status="전체">전체</button>
    <button class="order-filter-btn" data-status="준비중">준비중</button>
    <button class="order-filter-btn" data-status="완료">완료</button>
  ` : ''}

</div>

${merchantContent}

<div class="merchant-sales-filter ${(isNormalStore || isBeauty || isHotel) ? '' : 'hide-for-type'}">
  <div class="sales-filter-row sales-filter-button-row">
    <button id="sales-today" class="quick-btn">오늘</button>
    <button id="sales-month" class="quick-btn">이번달</button>
    <button id="sales-year" class="quick-btn">올해</button>
    <button id="excel-download" class="quick-btn">엑셀 다운로드</button>
  </div>

  <div class="sales-filter-row sales-filter-date-row">
    <span class="date-wrap">
      <input id="sales-start-date" type="date" />
    </span>
    <span class="date-wave">~</span>
    <span class="date-wrap">
      <input id="sales-end-date" type="date" />
    </span>
    <button id="sales-search" class="quick-btn">검색</button>
  </div>
</div>


  <div class="merchant-sales-summary ${(isNormalStore || isBeauty || isHotel) ? '' : 'hide-for-type'}">
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

  <div>
    <strong>정산예정금액</strong>

    <span class="merchant-settlement-value">
  ${settlementAmount.toLocaleString()}원

  <span
    class="${
      settlementComplete
        ? 'order-status-complete'
        : 'order-status-received'
    }"
  >
    ${
      settlementComplete
        ? '완료'
        : '대기'
    }
  </span>
</span>
  </div>
</div>

${isBeauty ? `
  <div style="
    display:flex;
    justify-content:center;
    gap:10px;
    margin:16px 0;
  ">
    <button
      id="beauty-schedule-view-button"
      type="button"
      style="
        padding:10px 18px;
        border-radius:999px;
        border:1px solid #d1d5db;
        background:${!isBeautySalesView ? '#111827' : '#ffffff'};
        color:${!isBeautySalesView ? '#ffffff' : '#111827'};
        font-weight:700;
        cursor:pointer;
      "
    >
      예약 스케줄
    </button>

    <button
      id="beauty-sales-view-button"
      type="button"
      style="
        padding:10px 18px;
        border-radius:999px;
        border:1px solid #d1d5db;
        background:${isBeautySalesView ? '#111827' : '#ffffff'};
        color:${isBeautySalesView ? '#ffffff' : '#111827'};
        font-weight:700;
        cursor:pointer;
      "
    >
      전체 매출
    </button>
  </div>
` : ''}

  <div class="order-bottom-toolbar ${(isNormalStore || isBeauty || isHotel) && !isAcademy ? '' : 'hide-for-type'}">

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
   
          <div class="merchant-order-table-wrap ${isAcademy ? 'academy-hide-order-list' : ''}">
            <table class="admin-table">
             <thead>
  ${
    isBeauty
      ? `
        <tr>
          <th>No</th>
          <th>주문번호</th>
          <th>예약일</th>
          <th>예약시간</th>
          <th>서비스 / 직원</th>
          <th>결제금액</th>
          <th>상태</th>
          <th>처리</th>
        </tr>
      `
      : isHotel
        ? `
          <tr>
            <th>No</th>
            <th>주문번호</th>
            <th>객실번호</th>
            <th>결제일시</th>
            <th>주문내용</th>
            <th>결제금액</th>
            <th>주문상태</th>
            <th>처리</th>
          </tr>
        `
        : `
          <tr>
            <th>No</th>
            <th>주문번호</th>
            <th>결제일시</th>
            <th>주문내용</th>
            <th>결제금액</th>
            <th>주문상태</th>
            <th>고객호출</th>
          </tr>
        `
  }
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

      document
  .querySelector('#beauty-schedule-view-button')
  ?.addEventListener('click', () => {
    const nextParams =
      new URLSearchParams(window.location.search)

    nextParams.delete('view')

    const queryText =
      nextParams.toString()

    location.href =
      '/merchant-admin' +
      (queryText ? '?' + queryText : '')
  })

document
  .querySelector('#beauty-sales-view-button')
  ?.addEventListener('click', () => {
    const nextParams =
      new URLSearchParams(window.location.search)

    nextParams.set('view', 'sales')

    location.href =
      '/merchant-admin?' + nextParams.toString()
  })

      document
  .querySelector('#terminal-date-search-button')
  ?.addEventListener('click', () => {
    const startDateInput =
      document.querySelector<HTMLInputElement>(
        '#terminal-start-date-input'
      )

    const endDateInput =
      document.querySelector<HTMLInputElement>(
        '#terminal-end-date-input'
      )

    if (
      !startDateInput?.value ||
      !endDateInput?.value
    ) {
      alert('조회 날짜를 선택해주세요.')
      return
    }

    if (
      startDateInput.value >
      endDateInput.value
    ) {
      alert(
        '시작일은 종료일보다 늦을 수 없습니다.'
      )
      return
    }

    const params =
      new URLSearchParams(
        window.location.search
      )

    params.delete('terminal_date')

    params.set(
      'terminal_start_date',
      startDateInput.value
    )

    params.set(
      'terminal_end_date',
      endDateInput.value
    )

    window.location.search =
      params.toString()
  })

document
  .querySelector('#terminal-date-today-button')
  ?.addEventListener('click', () => {
    const now = new Date()

    const year =
      now.getFullYear()

    const month =
      String(now.getMonth() + 1)
        .padStart(2, '0')

    const day =
      String(now.getDate())
        .padStart(2, '0')

    const todayValue =
      `${year}-${month}-${day}`

    const params =
      new URLSearchParams(
        window.location.search
      )

    params.delete('terminal_date')

    params.set(
      'terminal_start_date',
      todayValue
    )

    params.set(
      'terminal_end_date',
      todayValue
    )

    window.location.search =
      params.toString()
  })

  document
  .querySelector('#terminal-prev-page')
  ?.addEventListener('click', () => {
    const params =
      new URLSearchParams(
        window.location.search
      )

    const currentPage =
      Math.max(
        1,
        Number(
          params.get('terminal_page') || 1
        )
      )

    if (currentPage <= 1) return

    params.set(
      'terminal_page',
      String(currentPage - 1)
    )

    window.location.search =
      params.toString()
  })

  document
  .querySelector('#terminal-next-page')
  ?.addEventListener('click', () => {
    const params =
      new URLSearchParams(
        window.location.search
      )

    const currentPage =
      Math.max(
        1,
        Number(
          params.get('terminal_page') || 1
        )
      )

    params.set(
      'terminal_page',
      String(currentPage + 1)
    )

    window.location.search =
      params.toString()
  })
  document
  .querySelector('#terminal-page-size')
  ?.addEventListener('change', (event) => {
    const select =
      event.currentTarget as HTMLSelectElement

    const params =
      new URLSearchParams(
        window.location.search
      )

    params.set(
      'terminal_page_size',
      select.value
    )

    params.set(
      'terminal_page',
      '1'
    )

    window.location.search =
      params.toString()
  })
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
address_detail,
toss_mid,
korpay_mid
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

      const hotelRoomNumber =
    order.room_number || '-'

    const hotelCustomerRequest =
  String(order.customer_request || '').trim()

const hotelCustomerRequestHtml =
  hotelCustomerRequest
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\n/g, '<br>')

    const paymentForOrder =
    (merchantReceiptPayments || []).find((payment: any) => {
      const paymentOrderId =
        String(payment.order_id || '')
          .replace(/[^a-zA-Z0-9]/g, '')

      const orderPgId =
        String(order.pg_order_id || '')
          .replace(/[^a-zA-Z0-9]/g, '')

      const sameOrderId =
        paymentOrderId &&
        orderPgId &&
        paymentOrderId === orderPgId

      const samePaymentKey =
        order.payment_key &&
        payment.payment_key &&
        String(order.payment_key) ===
          String(payment.payment_key)

      const sameAmount =
        Number(payment.amount || 0) ===
        Number(order.total_amount || 0)

      const timeGap =
        Math.abs(
          new Date(payment.created_at).getTime() -
          new Date(order.created_at).getTime()
        )

      return (
        sameOrderId ||
        samePaymentKey ||
        (
          sameAmount &&
          timeGap < 1000 * 60 * 5
        )
      )
    })

  const receiptApprovalNumber =
    paymentForOrder?.approval_number || '-'

  const receiptPaymentKey =
    paymentForOrder?.payment_key || '-'

  const receiptCardNumber =
    paymentForOrder?.card_number || '결제사 제공값'

  const receiptCardCompany =
    '신용카드'

  const receiptPgCompany =
    paymentForOrder?.pg_company || '-'

    const receiptPgMid =
    paymentForOrder?.pg_mid ||
    (
      String(paymentForOrder?.pg_company || '').includes('토스')
        ? merchantSetting?.toss_mid
        : merchantSetting?.korpay_mid
    ) ||
    '-'

    if (isHotel) {

      tr.innerHTML =
        '<td>' + (index + 1) + '</td>' +
    
        '<td>' +
          '<button ' +
            'class="merchant-receipt-link" ' +
            'data-id="' + order.id + '" ' +
            'data-order="' + orderNumber + '" ' +
            'data-amount="' + (order.total_amount || 0) + '" ' +
            'data-date="' + (order.created_at || '') + '" ' +
            'data-status="' + (order.order_status || '') + '" ' +
            'data-cancel-status="' + (order.cancel_status || '') + '" ' +
            'data-cancel-date="' + (order.cancel_requested_at || '') + '" ' +
            'data-items="' + orderItems + '" ' +
            'data-payment-key="' + receiptPaymentKey + '" ' +
            'data-approval-number="' + receiptApprovalNumber + '" ' +
            'data-card-number="' + receiptCardNumber + '" ' +
            'data-card-company="' + receiptCardCompany + '" ' +
            'data-pg-company="' + receiptPgCompany + '" ' +
            'data-pg-mid="' + receiptPgMid + '" ' +
          '>' +
            orderNumber + '번' +
          '</button>' +
        '</td>' +
    
        '<td>' +
          '<strong class="hotel-order-room-number">' +
            'ROOM ' + hotelRoomNumber +
          '</strong>' +
        '</td>' +
    
        '<td>' +
          '<div>' +
            new Date(order.created_at).toLocaleString('ko-KR') +
          '</div>' +
    
          '<div class="approval-number cancel-approval-link" ' +
            'data-id="' + order.id + '" ' +
            'data-created-at="' + order.created_at + '" ' +
            'data-amount="' + order.total_amount + '">' +
            '승인번호 ' + receiptApprovalNumber +
          '</div>' +
    
          (
            order.cancel_status === '취소완료'
              ? '<div class="cancel-info">' +
                  '취소시각: ' +
                  (
                    order.cancel_requested_at
                      ? new Date(
                          order.cancel_requested_at
                        ).toLocaleString('ko-KR')
                      : '-'
                  ) +
                  '<br />취소사유: ' +
                  (order.cancel_reason || '-') +
                '</div>'
              : ''
          ) +
        '</td>' +
    
        '<td>' +
  '<div>' + orderItems + '</div>' +
  (
    String(order.customer_request || '').trim()
      ? '<div class="hotel-order-request">' +
          '<strong>요청사항</strong>' +
          '<div>' +
            String(order.customer_request || '')
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;')
              .replace(/\n/g, '<br>') +
          '</div>' +
        '</div>'
      : ''
  ) +
'</td>' +
    
        '<td>' +
          Number(
            order.total_amount || 0
          ).toLocaleString() +
          '원' +
        '</td>' +
    
        '<td>' +
          (
            order.cancel_status === '취소요청'
              ? '<span class="order-status-cancel-request">취소요청</span>'
              : order.order_status === '취소완료'
                ? '<span class="order-status-cancel">취소완료</span>'
                : order.order_status === '완료'
                  ? '<span class="order-status-complete">완료</span>'
                  : '<span class="order-status-received">접수</span>'
          ) +
        '</td>' +
    
        '<td>' +
  (
    order.cancel_status === '취소완료' ||
    order.order_status === '취소완료'
      ? '취소완료'
      : order.order_status === '완료'
        ? '완료'
        : '<button class="order-complete-button" data-id="' +
            order.id +
          '">완료처리</button>'
  ) +
'</td>'
    
    } else {

  tr.innerHTML =
    '<td>' + (index + 1) + '</td>' +
    '<td>' +
  '<button ' +
    'class="merchant-receipt-link" ' +
    'data-id="' + order.id + '" ' +
    'data-order="' + orderNumber + '" ' +
    'data-amount="' + (order.total_amount || 0) + '" ' +
    'data-date="' + (order.created_at || '') + '" ' +
    'data-status="' + (order.order_status || '') + '" ' +
'data-cancel-status="' + (order.cancel_status || '') + '" ' +
'data-cancel-date="' + (order.cancel_requested_at || '') + '" ' +
    'data-items="' + orderItems + '" ' +
    'data-payment-key="' + receiptPaymentKey + '" ' +
    'data-approval-number="' + receiptApprovalNumber + '" ' +
    'data-card-number="' + receiptCardNumber + '" ' +
    'data-card-company="' + receiptCardCompany + '" ' +
    'data-pg-company="' + receiptPgCompany + '" ' +
    'data-pg-mid="' + receiptPgMid + '" ' +
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
  '승인번호 ' + receiptApprovalNumber +
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
    '<td>' +
  '<div>' + orderItems + '</div>' +
  (
    hotelCustomerRequestHtml
      ? '<div class="hotel-order-request">' +
          '<strong>요청사항</strong>' +
          '<div>' + hotelCustomerRequestHtml + '</div>' +
        '</div>'
      : ''
  ) +
'</td>' +
    '<td>' + Number(order.total_amount || 0).toLocaleString() + '원</td>' +
    '<td>' +
  (
    order.cancel_status === '취소요청'
  ? '<span class="order-status-cancel-request">취소요청</span>'
  : order.order_status === '취소완료'
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
    }
    tr.setAttribute('data-status', order.order_status || '접수')

    if ((sessionStorage.getItem('login_merchant_type') || '') === '뷰티') {
      const beautyTableItems = Array.isArray(order.items)
  ? order.items
      .map((item: any) =>
        (item.name || '-') +
        ' / ' +
        (
          item.beauty_staff_name ||
          (
            item.beauty_staff_id || order.beauty_staff_id
              ? '직원ID ' +
                (item.beauty_staff_id || order.beauty_staff_id || '-')
              : '-'
          )
        ) +
        ' x ' +
        Number(item.quantity || 1)
      )
      .join('<br>')
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
            'data-items="' + beautyTableItems + '"' +
          '>' +
  (
    order.customer_name || order.customer_phone
      ? (order.customer_name || '-') +
        '<br>' +
        (order.customer_phone || '-')
      : orderNumber + '번'
  ) +
'</button>' +
        '</td>' +
    
       '<td>' +
(
  Array.isArray(order.items)
  ? Array.from(
      new Set(
        order.items.map((item: any) =>
          item.reservation_date ||
          order.reservation_date ||
          '-'
        )
      )
    ).join('<br>')
  : order.reservation_date || '-'
) +
'</td>' +

'<td>' +
(
  Array.isArray(order.items)
    ? order.items
        .map((item: any) =>
          item.reservation_time ||
          order.reservation_time ||
          '-'
        )
        .join('<br>')
    : order.reservation_time || '-'
) +
'</td>' +
    
        '<td style="line-height:1.8;">' +
          beautyTableItems +
        '</td>' +
    
        '<td>' +
          Number(order.total_amount || 0).toLocaleString() +
          '원' +
        '</td>' +
    
        '<td>' +
          (
            order.cancel_status === '취소요청'
              ? '<span class="order-status-cancel-request">취소요청</span>'
              : order.order_status === '취소완료'
                ? '<span class="order-status-cancel">취소완료</span>'
                : order.order_status === '완료'
                  ? '<span class="order-status-complete">완료</span>'
                  : '<span class="order-status-received">접수</span>'
          ) +
        '</td>' +
    
        '<td>' +
          (
            order.order_status === '완료'
              ? '완료'
              : '<button class="order-complete-button" data-id="' +
                  order.id +
                '">완료처리</button>'
          ) +
        '</td>'
    }

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
  (
    order.customer_name || order.customer_phone
      ? (order.customer_name || '-') +
        '<br>' +
        (order.customer_phone || '-')
      : orderNumber + '번'
  ) +
'</button>' +
        '<span>' +
          Number(order.total_amount || 0).toLocaleString() +
          '원' +
        '</span>' +
      '</div>' +

      '<div class="merchant-order-card-date">' +
  new Date(order.created_at).toLocaleString('ko-KR') +
'</div>' +

(
  isHotel
    ? '<div class="hotel-order-card-room">' +
        'ROOM ' + hotelRoomNumber +
      '</div>'
    : ''
) +

'<div class="approval-number cancel-approval-link" ' +
  'data-id="' + order.id + '" ' +
  'data-created-at="' + order.created_at + '" ' +
  'data-amount="' + order.total_amount + '">' +
  '승인번호 : ' + receiptApprovalNumber +
'</div>' +
      

    '<div class="merchant-order-card-items">' +
  orderItems +
'</div>' +

(
  isHotel && hotelCustomerRequestHtml
    ? '<div class="hotel-mobile-order-request">' +
        '<strong>요청사항</strong>' +
        '<div>' + hotelCustomerRequestHtml + '</div>' +
      '</div>'
    : ''
) +

'<div class="merchant-order-card-status">' +
  (
    order.cancel_status === '취소요청'
  ? '<span class="order-status-cancel-request">취소요청</span>'
  : order.order_status === '취소완료'
    ? '<span class="order-status-cancel">취소완료</span>'
    : order.order_status === '완료'
      ? '<span class="order-status-complete">완료</span>'
      : '<span class="order-status-received">접수</span>'
  ) +
'</div>' +

(
  isHotel
    ? (
        order.order_status === '완료'
          ? '<div class="hotel-card-complete-text">완료</div>'
          : '<button class="hotel-card-complete-button" ' +
              'data-id="' + order.id + '">' +
              '완료처리' +
            '</button>'
      )
    : (
        '<button class="customer-call-button merchant-card-call-button" ' +
          'data-id="' + order.id + '" ' +
          'data-number="' + orderNumber + '">' +
          '고객호출' +
        '</button>'
      )
)

      card.setAttribute('data-status', order.order_status || '접수')

    cardList.appendChild(card)

    const cardCallButton =
    card.querySelector<HTMLButtonElement>('.customer-call-button')
  
    const hotelCardCompleteButton =
  card.querySelector<HTMLButtonElement>(
    '.hotel-card-complete-button'
  )

hotelCardCompleteButton
  ?.addEventListener(
    'click',
    async () => {

      const { error } =
        await supabase
          .from('orders')
          .update({
            order_status: '완료'
          })
          .eq(
            'id',
            Number(order.id)
          )

      if (error) {
        alert(
          '완료 처리 실패: ' +
          error.message
        )
        return
      }


      const statusBox =
        card.querySelector(
          '.merchant-order-card-status'
        )

      if (statusBox) {
        statusBox.innerHTML =
          '<span class="order-status-complete">완료</span>'
      }


      card.setAttribute(
        'data-status',
        '완료'
      )

      hotelCardCompleteButton
        .replaceWith(
          document.createTextNode(
            '완료'
          )
        )
    }
  )

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

      const approvalNumber =
      target.getAttribute('data-approval-number') || '-'

    const cardNumber =
      target.getAttribute('data-card-number') || '결제사 제공값'

    const cardCompany =
      target.getAttribute('data-card-company') || '신용카드'

    const pgCompany =
      target.getAttribute('data-pg-company') || '-'

    const pgMid =
      target.getAttribute('data-pg-mid') || '-'

      const receiptStatus =
      target.getAttribute('data-status') || ''

    const receiptCancelStatus =
      target.getAttribute('data-cancel-status') || ''

    const receiptCancelDateText =
      target.getAttribute('data-cancel-date')
        ? new Date(
            target.getAttribute('data-cancel-date')!
          ).toLocaleString('ko-KR')
        : '-'

    const isCanceledReceipt =
      receiptStatus === '취소완료' ||
      receiptCancelStatus === '취소완료'

    const receiptTypeText =
      isCanceledReceipt ? '취소' : '승인'

    const receiptTradeText =
      isCanceledReceipt ? '취소완료' : '승인성공'

    const receiptTotalAmountText =
      isCanceledReceipt
        ? '-' + amount.toLocaleString() + '원'
        : amount.toLocaleString() + '원'

    const customerName =
      target.getAttribute('data-customer') || '현장고객'

      const receiptHtml = `
      <div id="admin-receipt-modal" class="receipt-modal">
        <div class="receipt-box receipt-approve">
    
          <div class="receipt-header ${isCanceledReceipt ? 'receipt-cancel-mode' : 'receipt-approve-mode'}">
            <h2>NXG PICK</h2>
            <h3 class="${isCanceledReceipt ? 'receipt-cancel-title' : 'receipt-approve-title'}">
              신용카드 매출전표 <span>(${receiptTypeText})</span>
            </h3>
          </div>
    
          <section>
            <h4>결제정보</h4>
            <table>
              <tr>
                <th>카드번호</th>
                <td>${cardNumber}</td>
                <th>카드종류</th>
                <td>${cardCompany}</td>
              </tr>
              <tr>
                <th>거래종류</th>
                <td class="${isCanceledReceipt ? 'receipt-cancel-text' : 'receipt-approve-text'}">
                  ${receiptTradeText}
                </td>
                <th>할부개월</th>
                <td>일시불</td>
              </tr>
              <tr>
                <th>거래일시</th>
                <td colspan="3">${date}</td>
              </tr>

              ${
                isCanceledReceipt
                  ? `
                    <tr>
                      <th>취소시각</th>
                      <td colspan="3">${receiptCancelDateText}</td>
                    </tr>
                  `
                  : ''
              }
            </table>
          </section>
    
          <div class="receipt-grid">
            <section>
              <h4>구매정보</h4>
              <table>
                <tr><th>주문자명</th><td>${customerName}</td></tr>
<tr><th>승인번호</th><td>${approvalNumber}</td></tr>
<tr><th>거래번호</th><td>${paymentKey}</td></tr>
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
                  <td>${receiptTotalAmountText}</td>
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
              <tr><th>카드사 가맹점명</th><td>${pgCompany}</td><th>사업자번호</th><td>-</td></tr>
              <tr><th>대표자명</th><td>-</td><th>가맹점번호</th><td>${pgMid}</td></tr>
              <tr><th>주소</th><td colspan="3">-</td></tr>
            </table>
          </section>
    
          <div class="receipt-actions">
            <button onclick="window.print()">인쇄하기</button>
            <button id="receipt-share-button">문자/카카오톡 발송</button>
            <button id="admin-receipt-close-btn">닫기</button>
          </div>
    
        </div>
      </div>
    `
    
    document.querySelector('#admin-receipt-modal')?.remove()
    document.body.insertAdjacentHTML('beforeend', receiptHtml)
    
    document.querySelector<HTMLElement>('#admin-receipt-modal')!.style.display = 'flex'
    
    document.querySelector('#receipt-share-button')
    ?.addEventListener('click', async () => {
      const receiptShareText =
        '[NXG PICK 영수증]\n' +
        '상점명: ' + (merchantSetting?.merchant_name || '-') + '\n' +
        '주문번호: ' + orderNo + '\n' +
        '승인번호: ' + approvalNumber + '\n' +
        '결제일시: ' + date + '\n' +
        '상품명: ' + items.replace(/<br\/>/g, ', ') + '\n' +
        '결제금액: ' + amount.toLocaleString() + '원'

      if (navigator.share) {
        await navigator.share({
          title: 'NXG PICK 영수증',
          text: receiptShareText
        })

        return
      }

      await navigator.clipboard.writeText(receiptShareText)

      alert(
        '영수증 내용이 복사되었습니다.\n' +
        '문자나 카카오톡에 붙여넣기 해주세요.'
      )
    })

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

  if (isHotel) {
    const hotelTopMenuIds = [
      'merchant-order-tab',
      'merchant-product-tab',
      'merchant-hotel-room-tab',
      'merchant-hotel-preview-tab',
      'merchant-card-tab'
    ]
  
    hotelTopMenuIds.forEach((id) => {
      const button =
        document.getElementById(id)
  
      if (!button) return
  
      button.style.setProperty(
        'background',
        '#b7924f',
        'important'
      )
  
      button.style.setProperty(
        'background-color',
        '#b7924f',
        'important'
      )
  
      button.style.setProperty(
        'border-color',
        '#b7924f',
        'important'
      )
  
      button.style.setProperty(
        'color',
        '#ffffff',
        'important'
      )
    })
  }

document.querySelector('#merchant-product-tab')
  ?.addEventListener('click', () => {
    location.href = '/merchant-product'
  })

  document.querySelector('#merchant-hotel-room-tab')
  ?.addEventListener('click', () => {
    location.href = '/merchant-hotel-rooms'
  })

  document.querySelector('#merchant-hotel-preview-tab')
  ?.addEventListener('click', () => {

    const hotelPreviewUrl =
      window.location.origin +
      '/hotel?merchant_id=' +
      merchantId +
      '&room=101'

    window.open(
      hotelPreviewUrl,
      '_blank'
    )
  })

  document.querySelector('#merchant-staff-tab')
  ?.addEventListener('click', () => {
    location.href = '/merchant-staff'
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
  document.querySelector('#merchant-payment-list-tab')
  ?.addEventListener('click', () => {
    location.href = '/merchant-academy-payments'
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


applyOrderFilter()

if (isAcademy) {
  bindMemberMenuEvents()
}

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

const getLocalDateTextForMerchant = (date: Date) => {
  const year = date.getFullYear()

  const month =
    String(date.getMonth() + 1).padStart(2, '0')

  const day =
    String(date.getDate()).padStart(2, '0')

  return year + '-' + month + '-' + day
}

const moveMerchantDate = (start: string, end: string) => {
  if (isBeauty) {
    const nextParams =
      new URLSearchParams(window.location.search)

    nextParams.set('start', start)
    nextParams.set('end', end)

    location.href =
      '/merchant-admin?' + nextParams.toString()

    return
  }

  location.href =
    '/merchant-admin?start=' + start + '&end=' + end
}

document.querySelector('#sales-today')
  ?.addEventListener('click', () => {
    const today =
      getLocalDateTextForMerchant(new Date())

    moveMerchantDate(today, today)
  })

document.querySelector('#sales-month')
  ?.addEventListener('click', () => {
    const now = new Date()

    const start =
      getLocalDateTextForMerchant(
        new Date(now.getFullYear(), now.getMonth(), 1)
      )

    const end =
      getLocalDateTextForMerchant(new Date())

    moveMerchantDate(start, end)
  })

document.querySelector('#sales-year')
  ?.addEventListener('click', () => {
    const now = new Date()

    const start =
      now.getFullYear() + '-01-01'

    const end =
      getLocalDateTextForMerchant(new Date())

    moveMerchantDate(start, end)
  })

document.querySelector('#sales-search')
  ?.addEventListener('click', () => {
    const start =
      (
        document.getElementById(
          'sales-start-date'
        ) as HTMLInputElement
      )?.value

    const end =
      (
        document.getElementById(
          'sales-end-date'
        ) as HTMLInputElement
      )?.value

    if (!start || !end) {
      alert('시작일과 종료일을 선택해주세요.')
      return
    }

    moveMerchantDate(start, end)
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
      document.querySelector<HTMLInputElement>('#cancel-password')

    const reasonInput =
      document.querySelector<HTMLTextAreaElement>('#cancel-reason')

    const password =
      (passwordInput?.value || '').trim()

    const reason =
      (reasonInput?.value || '').trim()

    const modal =
      document.querySelector<HTMLElement>('#cancel-modal')

    const orderCreatedAt =
      modal?.getAttribute('data-created-at') || ''

    const today =
      new Date().toISOString().slice(0, 10)

    const orderDate =
      orderCreatedAt.slice(0, 10)

    if (orderDate !== today) {
      alert(
        '당일 결제건만 직접 취소할 수 있습니다.\n' +
        '본사 승인요청을 이용해주세요.'
      )
      return
    }

    if (password !== '1234') {
      alert('취소 비밀번호가 일치하지 않습니다.')
      return
    }

    if (!reason) {
      alert('취소 사유를 입력해주세요.')
      return
    }

    const orderId =
      Number(
        modal?.getAttribute('data-order-id') || 0
      )

    if (!orderId) {
      alert('취소할 주문을 찾을 수 없습니다.')
      return
    }

    const directCancelButton =
      document.querySelector<HTMLButtonElement>(
        '#direct-cancel-button'
      )

    if (directCancelButton) {
      directCancelButton.disabled = true
      directCancelButton.textContent = '취소 처리 중...'
    }

    try {
      /* 주문정보 확인 */
      const { data: order, error: orderFindError } =
        await supabase
          .from('orders')
          .select(
            'id, merchant_id, total_amount, order_no'
          )
          .eq('id', orderId)
          .single()

      if (orderFindError || !order) {
        alert('주문정보를 불러오지 못했습니다.')
        return
      }

      /*
        현재 orders에 payment_id가 없으므로
        같은 가맹점 + 같은 금액의 가장 최근 승인 건을 찾음.
      */
      const { data: paymentRows, error: paymentFindError } =
        await supabase
          .from('payments')
          .select(
            'id, pg_company, payment_key, status, amount, created_at'
          )
          .eq('merchant_id', Number(order.merchant_id))
          .eq('amount', Number(order.total_amount))
          .eq('status', 'paid')
          .order('created_at', { ascending: false })
          .limit(1)

      if (paymentFindError) {
        alert(
          '결제정보 조회에 실패했습니다.\n' +
          paymentFindError.message
        )
        return
      }

      const targetPayment =
        Array.isArray(paymentRows) &&
        paymentRows.length > 0
          ? paymentRows[0]
          : null

      if (!targetPayment) {
        alert(
          '연결된 승인 결제를 찾지 못했습니다.\n' +
          '가맹점ID: ' + order.merchant_id + '\n' +
          '금액: ' +
          Number(order.total_amount).toLocaleString() +
          '원'
        )
        return
      }

      let cancelResponse: Response
let cancelData: any

if (targetPayment.pg_company === '코페이') {
  cancelResponse = await fetch(
    '/api/korpay-cancel',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        paymentId: Number(targetPayment.id),
        cancelName:
          sessionStorage.getItem(
            'login_merchant_name'
          ) || '가맹점',
        cancelMessage: reason
      })
    }
  )

  cancelData = await cancelResponse.json()

  if (!cancelResponse.ok || !cancelData.success) {
    alert(
      '코페이 실제 취소에 실패했습니다.\n\n' +
      (cancelData.message || '알 수 없는 오류')
    )
    return
  }
} else if (
  targetPayment.pg_company === '토스페이먼츠'
) {
  if (!targetPayment.payment_key) {
    alert('토스 paymentKey가 없습니다.')
    return
  }

  cancelResponse = await fetch(
    '/api/toss-cancel',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        paymentKey: targetPayment.payment_key,
        cancelReason: reason
      })
    }
  )

  cancelData = await cancelResponse.json()

  if (!cancelResponse.ok) {
    alert(
      '토스 실제 취소에 실패했습니다.\n\n' +
      (cancelData.message || '알 수 없는 오류')
    )
    return
  }

  const { error: paymentCancelError } =
    await supabase
      .from('payments')
      .update({
        status: 'cancel',
        canceled_at: new Date().toISOString(),
        payout_status: '출금제외',
        settlement_status: '취소'
      })
      .eq('id', Number(targetPayment.id))

  if (paymentCancelError) {
    alert(
      '토스 결제는 취소됐지만 결제내역 수정에 실패했습니다.\n' +
      paymentCancelError.message
    )
    return
  }
} else {
  alert(
    '직접 취소를 지원하지 않는 PG사입니다.\n' +
    '결제 PG사: ' +
    (targetPayment.pg_company || '-')
  )
  return
}

      /* =========================================
   실제 취소된 PG사 표시
========================================= */

const canceledPgName =
targetPayment.pg_company === '토스페이먼츠'
  ? '토스페이먼츠'
  : targetPayment.pg_company === '코페이'
    ? '코페이'
    : targetPayment.pg_company || '결제'


/* =========================================
 가맹점 주문 상태 취소완료
========================================= */

const { error: orderCancelError } =
await supabase
  .from('orders')
  .update({
    order_status: '취소완료',
    payment_status: '취소완료',
    cancel_status: '취소완료',
    cancel_reason: reason,
    cancel_requested_at:
      new Date().toISOString()
  })
  .eq('id', orderId)

if (orderCancelError) {
alert(
  canceledPgName +
  ' 결제는 취소됐지만 ' +
  '주문 상태 수정에 실패했습니다.\n' +
  orderCancelError.message
)
return
}

alert(
canceledPgName +
' 결제가 실제 취소되었습니다.\n\n' +
'결제관리: 취소\n' +
'출금관리: 출금제외'
)

location.reload()

      location.reload()
    } catch (error) {
      console.error(error)

      alert(
        '취소 처리 중 오류가 발생했습니다.\n' +
        (
          error instanceof Error
            ? error.message
            : '알 수 없는 오류'
        )
      )
    } finally {
      if (directCancelButton) {
        directCancelButton.disabled = false
        directCancelButton.textContent = '직접 취소'
      }
    }
  })
  
  document.querySelector('#request-cancel-button')
  ?.addEventListener('click', async () => {
    const modal =
      document.querySelector<HTMLElement>('#cancel-modal')

    const reasonInput =
      document.querySelector<HTMLTextAreaElement>('#cancel-reason')

    const reason =
      (reasonInput?.value || '').trim()

    const orderId =
      Number(
        modal?.getAttribute('data-order-id') || 0
      )

    if (!orderId) {
      alert('취소 요청할 주문을 찾을 수 없습니다.')
      return
    }

    if (!reason) {
      alert('취소 사유를 입력해주세요.')
      return
    }

    const requestButton =
      document.querySelector<HTMLButtonElement>(
        '#request-cancel-button'
      )

    if (requestButton) {
      requestButton.disabled = true
      requestButton.textContent = '요청 처리 중...'
    }

    try {
      const { data: order, error: orderError } =
        await supabase
          .from('orders')
          .select(
            'id, order_no, merchant_id, total_amount, created_at, payment_key'
          )
          .eq('id', orderId)
          .single()

      if (orderError || !order) {
        alert('주문정보를 불러오지 못했습니다.')
        return
      }

      if (!order.payment_key) {
        alert(
          '이 주문에 결제 거래번호가 연결되어 있지 않습니다.\n' +
          '승인번호 연결 작업이 필요합니다.'
        )
        return
      }
      
      const { data: payment, error: paymentError } =
        await supabase
          .from('payments')
          .select(
            'id, amount, settlement_amount, manager_admin_id, manager_admin_name, status, created_at, payment_key'
          )
          .eq('payment_key', order.payment_key)
          .maybeSingle()

      if (paymentError) {
        alert(
          '결제정보 조회에 실패했습니다.\n' +
          paymentError.message
        )
        return
      }

    

      if (!payment) {
        alert('연결된 승인 결제를 찾지 못했습니다.')
        return
      }

      const { data: existingRequest } =
        await supabase
          .from('cancel_requests')
          .select('id')
          .eq('payment_id', Number(payment.id))
          .eq('status', '요청중')
          .maybeSingle()

      if (existingRequest) {
        alert('이미 본사 승인요청이 접수된 거래입니다.')
        return
      }

      const { error: requestError } =
        await supabase
          .from('cancel_requests')
          .insert({
            payment_id: Number(payment.id),
            merchant_id: Number(order.merchant_id),
            manager_admin_id:
              payment.manager_admin_id || null,
            manager_admin_name:
              payment.manager_admin_name || null,
            reason,
            status: '요청중'
          })

      if (requestError) {
        alert(
          '본사 승인요청 저장에 실패했습니다.\n' +
          requestError.message
        )
        return
      }

      const { error: holdError } =
        await supabase
          .from('payments')
          .update({
            payout_hold: true,
            payout_hold_reason:
              '익일 취소 본사 승인요청: ' + reason,
            payout_hold_at:
              new Date().toISOString(),
            payout_status: '지급정지'
          })
          .eq('id', Number(payment.id))

      if (holdError) {
        alert(
          '취소요청은 접수됐지만 지급정지 처리에 실패했습니다.\n' +
          holdError.message
        )
        return
      }

      const { error: orderRequestError } =
  await supabase
    .from('orders')
    .update({
      cancel_status: '취소요청',
      cancel_reason: reason,
      cancel_requested_at: new Date().toISOString()
    })
    .eq('id', orderId)

if (orderRequestError) {
  alert(
    '본사 승인요청은 접수됐지만 주문상태 표시 변경에 실패했습니다.\n' +
    orderRequestError.message
  )
  return
}

      const settlementAmount =
        Number(payment.settlement_amount || 0)

      const transferFee = 500

      alert(
        '본사 승인요청이 접수되었습니다.\n\n' +
        '지급상태: 지급정지\n' +
        '반환 예정금액: ' +
        (
          settlementAmount + transferFee
        ).toLocaleString() +
        '원\n\n' +
        '본사 안내 후 지정 계좌로 입금해주세요.'
      )

      location.reload()
    } catch (error) {
      console.error(error)

      alert(
        '본사 승인요청 중 오류가 발생했습니다.\n' +
        (
          error instanceof Error
            ? error.message
            : '알 수 없는 오류'
        )
      )
    } finally {
      if (requestButton) {
        requestButton.disabled = false
        requestButton.textContent = '본사 승인요청'
      }
    }
  })

      document.querySelector('#merchant-logout')
        ?.addEventListener('click', () => {

          channel.unsubscribe()

          sessionStorage.removeItem('login_merchant_id')
          sessionStorage.removeItem('login_merchant_name')
          sessionStorage.removeItem('login_merchant_code')
          location.href = '/merchant-login'
        })

      } else if (path === '/merchant-hotel-rooms') {

        const merchantId =
          Number(
            sessionStorage.getItem(
              'login_merchant_id'
            )
          )
      
        const merchantName =
          sessionStorage.getItem(
            'login_merchant_name'
          ) || ''
      
        const merchantType =
          sessionStorage.getItem(
            'login_merchant_type'
          ) || ''
      
        if (!merchantId) {
          alert('로그인이 필요합니다.')
          location.href = '/merchant-login'
        }
      
        if (merchantType !== '호텔') {
          alert('호텔 가맹점에서만 사용할 수 있습니다.')
          location.href = '/merchant-admin'
        }
      
      
        const {
          data: hotelRooms,
          error: hotelRoomsError
        } =
          await supabase
            .from('hotel_rooms')
            .select('*')
            .eq('merchant_id', merchantId)
            .order(
              'sort_order',
              { ascending: true }
            )
            .order(
              'room_number',
              { ascending: true }
            )
      
      
        if (hotelRoomsError) {
          alert(
            '객실 목록 조회 실패: ' +
            hotelRoomsError.message
          )
        }
      
      
        const rooms =
          hotelRooms || []
      
      
        const activeRoomCount =
          rooms.filter(
            (room) =>
              room.status === '사용중'
          ).length
      
      
        const inactiveRoomCount =
          rooms.filter(
            (room) =>
              room.status === '사용중지'
          ).length
      
      
        app.innerHTML = `
          <div class="hotel-room-admin-page">
      
            <div class="merchant-pick-header">
      
              <div>
                <h1>호텔 객실관리</h1>
                <p class="hotel-room-admin-desc">
                  객실을 등록하고 객실별 고객 결제창을 관리합니다.
                </p>
              </div>
      
              <div class="merchant-user-box">
                <strong>
                  ${merchantName}님
                </strong>
      
                <button id="hotel-room-logout">
                  로그아웃
                </button>
              </div>
      
            </div>
      
      
            <div class="merchant-toolbar hotel-room-toolbar">
      
              <button id="hotel-room-go-order">
                주문/결제내역
              </button>
      
              <button id="hotel-room-go-product">
                상품관리
              </button>
      
              <button
                id="hotel-room-go-room"
                class="active"
              >
                객실관리
              </button>
      
              <button id="hotel-room-go-card">
                카드결제
              </button>
      
            </div>
      
      
            <div class="hotel-room-summary">
      
              <div>
                <span>전체 객실</span>
                <strong>
                  ${rooms.length}개
                </strong>
              </div>
      
              <div>
                <span>사용중</span>
                <strong>
                  ${activeRoomCount}개
                </strong>
              </div>
      
              <div>
                <span>사용중지</span>
                <strong>
                  ${inactiveRoomCount}개
                </strong>
              </div>
      
            </div>
      
      
            <div class="hotel-room-content">
      
              <section class="hotel-room-create-card">
      
                <h2>
                  객실 등록
                </h2>
      
                <p>
                  호텔에서 사용할 객실번호를 입력해주세요.
                </p>
      
                <label>
                  객실번호
                </label>
      
                <input
                  id="hotel-room-number"
                  type="text"
                  placeholder="예: 101, 1203, A201"
                  autocomplete="off"
                />
      
                <button
                  id="hotel-room-create-button"
                >
                  객실 등록
                </button>
      
              </section>
      
      
              <section class="hotel-room-list-card">
      
                <div class="hotel-room-list-title">
      
                  <div>
                    <h2>
                      등록된 객실
                    </h2>
      
                    <p>
                      객실별 결제창 주소가 자동으로 연결됩니다.
                    </p>
                  </div>
      
                </div>
      
      
                ${
                  rooms.length === 0
                    ? `
                      <div class="hotel-room-empty">
                        등록된 객실이 없습니다.
                      </div>
                    `
                    : `
                      <div class="hotel-room-table-wrap">
      
                        <table class="hotel-room-table">
      
                          <thead>
  <tr>
    <th>객실번호</th>
    <th>상태</th>
    <th>고객 결제창</th>
    <th>객실 QR</th>
    <th>관리</th>
  </tr>
</thead>
      
                          <tbody>
      
                            ${rooms.map(
                              (room) => {
      
                                const hotelDirectUrl =
  window.location.origin +
  '/hotel?merchant_id=' +
  merchantId +
  '&room=' +
  encodeURIComponent(
    room.room_number
  )

const hotelQrUrl =
  window.location.origin +
  '/hotel-chrome?merchant_id=' +
  merchantId +
  '&room=' +
  encodeURIComponent(
    room.room_number
  )
      
                                return `
                                  <tr>
      
                                    <td>
                                      <strong class="hotel-room-number-text">
                                        ${room.room_number}
                                      </strong>
                                    </td>
      
                                    <td>
      
                                      <span
                                        class="${
                                          room.status ===
                                          '사용중'
                                            ? 'hotel-room-status-on'
                                            : 'hotel-room-status-off'
                                        }"
                                      >
                                        ${room.status}
                                      </span>
      
                                    </td>
      
                                    <td>

  <button
  class="hotel-room-open-button"
  data-url="${hotelDirectUrl}"
>
  결제창 열기
</button>

</td>

<td>

  <button
  class="hotel-room-qr-button"
  data-room="${room.room_number}"
  data-url="${hotelQrUrl}"
>
  QR 보기
</button>

</td>

<td>

  <button
    class="hotel-room-status-button"
                                        data-id="${room.id}"
                                        data-status="${room.status}"
                                      >
                                        ${
                                          room.status ===
                                          '사용중'
                                            ? '사용중지'
                                            : '사용하기'
                                        }
                                      </button>
      
                                    </td>
      
                                  </tr>
                                `
                              }
                            ).join('')}
      
                          </tbody>
      
                        </table>
      
                      </div>
                    `
                }
      
              </section>
      
            </div>

            <div
  id="hotel-room-qr-modal"
  class="hotel-room-qr-modal"
>

  <div class="hotel-room-qr-box">

    <div class="hotel-room-qr-header">

      <div>
        <span>NXG HOTEL</span>

        <h2 id="hotel-room-qr-title">
          객실 QR
        </h2>
      </div>

      <button
        id="hotel-room-qr-close-x"
        type="button"
      >
        ×
      </button>

    </div>


    <div class="hotel-room-qr-canvas-box">

      <canvas
        id="hotel-room-qr-canvas"
      ></canvas>

    </div>


    <p class="hotel-room-qr-guide">
      객실에 비치할 전용 QR입니다.<br>
      고객이 QR을 촬영하면 해당 객실 결제창으로 연결됩니다.
    </p>


    <div class="hotel-room-qr-actions">

      <button
        id="hotel-room-qr-download"
        type="button"
      >
        QR 이미지 저장
      </button>

      <button
        id="hotel-room-qr-close"
        type="button"
      >
        닫기
      </button>

    </div>

  </div>

</div>
      
          </div>
        `
      
      
        document
          .querySelector(
            '#hotel-room-create-button'
          )
          ?.addEventListener(
            'click',
            async () => {
      
              const roomInput =
                document.querySelector<HTMLInputElement>(
                  '#hotel-room-number'
                )
      
              const roomNumber =
                (
                  roomInput?.value || ''
                )
                  .trim()
                  .toUpperCase()
      
      
              if (!roomNumber) {
                alert(
                  '객실번호를 입력해주세요.'
                )
                return
              }
      
      
              const duplicateRoom =
                rooms.find(
                  (room) =>
                    String(
                      room.room_number
                    ).toUpperCase() ===
                    roomNumber
                )
      
      
              if (duplicateRoom) {
                alert(
                  '이미 등록된 객실번호입니다.'
                )
                return
              }
      
      
              const maxSortOrder =
                rooms.reduce(
                  (max, room) =>
                    Math.max(
                      max,
                      Number(
                        room.sort_order || 0
                      )
                    ),
                  0
                )
      
      
              const { error } =
                await supabase
                  .from('hotel_rooms')
                  .insert({
                    merchant_id:
                      merchantId,
      
                    room_number:
                      roomNumber,
      
                    status:
                      '사용중',
      
                    sort_order:
                      maxSortOrder + 1
                  })
      
      
              if (error) {
                alert(
                  '객실 등록 실패: ' +
                  error.message
                )
                return
              }
      
      
              alert(
                roomNumber +
                '호가 등록되었습니다.'
              )
      
              location.reload()
            }
          )
      
          document
          .querySelectorAll<HTMLButtonElement>(
            '.hotel-room-open-button'
          )
          .forEach((button) => {
        
            button.addEventListener(
              'click',
              () => {
        
                const url =
                  button.dataset.url || ''
        
                if (!url) {
                  return
                }
        
                window.open(
                  url,
                  '_blank'
                )
              }
            )
          })
        
        
        document
          .querySelectorAll<HTMLButtonElement>(
            '.hotel-room-qr-button'
          )
          .forEach((button) => {
        
            button.addEventListener(
              'click',
              () => {
        
                const roomNumber =
                  button.dataset.room || ''
        
                if (!roomNumber) {
                  return
                }
        
                location.href =
                  '/merchant-hotel-room-qr?room=' +
                  encodeURIComponent(
                    roomNumber
                  )
              }
            )
          })
       
        document
          .querySelectorAll<HTMLButtonElement>(
            '.hotel-room-status-button'
          )
          .forEach(
            (button) => {
      
              button.addEventListener(
                'click',
                async () => {
      
                  const roomId =
                    Number(
                      button.dataset.id
                    )
      
                  const currentStatus =
                    button.dataset.status ||
                    '사용중'
      
      
                  const nextStatus =
                    currentStatus ===
                    '사용중'
                      ? '사용중지'
                      : '사용중'
      
      
                  const { error } =
                    await supabase
                      .from('hotel_rooms')
                      .update({
                        status:
                          nextStatus
                      })
                      .eq(
                        'id',
                        roomId
                      )
                      .eq(
                        'merchant_id',
                        merchantId
                      )
      
      
                  if (error) {
                    alert(
                      '객실 상태 변경 실패: ' +
                      error.message
                    )
                    return
                  }
      
      
                  location.reload()
                }
              )
            }
          )
      
      
        document
          .querySelector(
            '#hotel-room-go-order'
          )
          ?.addEventListener(
            'click',
            () => {
              location.href =
                '/merchant-admin'
            }
          )
      
      
        document
          .querySelector(
            '#hotel-room-go-product'
          )
          ?.addEventListener(
            'click',
            () => {
              location.href =
                '/merchant-product'
            }
          )
      
      
        document
          .querySelector(
            '#hotel-room-go-room'
          )
          ?.addEventListener(
            'click',
            () => {
              location.href =
                '/merchant-hotel-rooms'
            }
          )
      
      
        document
          .querySelector(
            '#hotel-room-go-card'
          )
          ?.addEventListener(
            'click',
            () => {
              location.href =
                '/merchant-card'
            }
          )
      
      
        document
          .querySelector(
            '#hotel-room-logout'
          )
          ?.addEventListener(
            'click',
            () => {
      
              sessionStorage.removeItem(
                'login_merchant_id'
              )
      
              sessionStorage.removeItem(
                'login_merchant_name'
              )
      
              sessionStorage.removeItem(
                'login_merchant_code'
              )
      
              sessionStorage.removeItem(
                'login_merchant_type'
              )
      
              location.href =
                '/merchant-login'
            }
          )

        } else if (path === '/merchant-hotel-room-qr') {

          const merchantId =
            Number(
              sessionStorage.getItem(
                'login_merchant_id'
              ) || 0
            )
        
          const merchantName =
            sessionStorage.getItem(
              'login_merchant_name'
            ) || ''
        
          const merchantType =
            sessionStorage.getItem(
              'login_merchant_type'
            ) || ''
        
          const hotelQrParams =
            new URLSearchParams(
              window.location.search
            )
        
          const roomNumber =
            (
              hotelQrParams.get('room') || ''
            ).trim()
        
        
          if (!merchantId) {
            alert('로그인이 필요합니다.')
            location.href = '/merchant-login'
        
          } else if (
            merchantType !== '호텔'
          ) {
            alert(
              '호텔 가맹점에서만 사용할 수 있습니다.'
            )
            location.href = '/merchant-admin'
        
          } else if (!roomNumber) {
            alert(
              '객실번호를 찾을 수 없습니다.'
            )
            location.href =
              '/merchant-hotel-rooms'
        
          } else {
        
            const hotelQrUrl =
              window.location.origin +
              '/hotel-chrome?merchant_id=' +
              merchantId +
              '&room=' +
              encodeURIComponent(
                roomNumber
              )
        
        
            app.innerHTML = `
              <div class="hotel-poster-admin-page">
        
                <div class="hotel-poster-admin-header no-print">
        
                  <div>
                    <h1>
                      객실 QR 안내문
                    </h1>
        
                    <p>
                      ${merchantName}
                      · ROOM ${roomNumber}
                    </p>
                  </div>
        
                  <button
                    id="hotel-poster-back"
                  >
                    객실관리
                  </button>
        
                </div>
        
        
                <div
                  id="hotel-poster-print-area"
                  class="hotel-poster-print-area"
                >
        
                  <img
                    src="/hotel-qr-guide-poster.png"
                    class="hotel-poster-image"
                    alt="호텔 QR 결제 안내"
                  />
        
        
                  <div
                    class="hotel-poster-qr"
                  >
                    <canvas
                      id="hotel-poster-qr-canvas"
                    ></canvas>
                  </div>
        
        
                  <div
                    class="hotel-poster-room-number"
                  >
                    ROOM ${roomNumber}
                  </div>
        
                </div>
        
        
                <div class="hotel-poster-controls no-print">
        
                  <div class="hotel-poster-link">
        
                    <span>
                      ROOM ${roomNumber} 링크주소
                    </span>
        
                    <strong>
                      ${hotelQrUrl}
                    </strong>
        
                  </div>
        
        
                  <button
                    id="hotel-poster-copy"
                  >
                    📋 링크 복사
                  </button>
        
                  <button
                    id="hotel-poster-print"
                  >
                    🖨️ 인쇄
                  </button>
        
                </div>
        
              </div>
            `
        
        
            const qrCanvas =
              document.querySelector<HTMLCanvasElement>(
                '#hotel-poster-qr-canvas'
              )
        
        
            if (qrCanvas) {
        
              await QRCode.toCanvas(
                qrCanvas,
                hotelQrUrl,
                {
                  width: 320,
                  margin: 1
                }
              )
            }
        
        
            document
              .querySelector(
                '#hotel-poster-copy'
              )
              ?.addEventListener(
                'click',
                async () => {
        
                  await navigator
                    .clipboard
                    .writeText(
                      hotelQrUrl
                    )
        
                  alert(
                    'ROOM ' +
                    roomNumber +
                    ' 링크가 복사되었습니다.'
                  )
                }
              )
        
        
            document
              .querySelector(
                '#hotel-poster-print'
              )
              ?.addEventListener(
                'click',
                () => {
                  window.print()
                }
              )
        
        
            document
              .querySelector(
                '#hotel-poster-back'
              )
              ?.addEventListener(
                'click',
                () => {
                  location.href =
                    '/merchant-hotel-rooms'
                }
              )
          }

} else if (path === '/merchant-product') {

  const merchantId =
    Number(sessionStorage.getItem('login_merchant_id'))

  const merchantName =
    sessionStorage.getItem('login_merchant_name') || ''

    const merchantType =
  sessionStorage.getItem('login_merchant_type') || '일반매장'

const isBeauty =
  merchantType === '뷰티'

  

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

  let beautyStaff: any[] = []

if (isBeauty) {
  const { data: staffData, error: staffError } =
    await supabase
      .from('beauty_staff')
      .select('id, staff_name, position, photo_url, status')
      .eq('merchant_id', merchantId)
      .eq('status', '근무중')
      .order('id', { ascending: false })

  if (staffError) {
    alert('직원 목록 조회 실패: ' + staffError.message)
  } else {
    beautyStaff = staffData || []
  }
}

let beautyStaffServiceRows: any[] = []

if (isBeauty) {
  const {
    data: staffServiceData,
    error: staffServiceError
  } = await supabase
    .from('beauty_staff_services')
    .select('staff_id, service_id')
    .eq('merchant_id', merchantId)

  if (staffServiceError) {
    alert(
      '담당직원 연결 조회 실패: ' +
      staffServiceError.message
    )
  } else {
    beautyStaffServiceRows =
      staffServiceData || []
  }
}

  if (error) {
    alert('상품 목록 조회 실패: ' + error.message)
  }

  app.innerHTML = `
    <div class="pg-admin-page">
      <div class="merchant-pick-header">
        <h1>
${
  isBeauty
    ? 'NXG BEAUTY 서비스관리'
    : 'NXG PICK 상품관리'
}
</h1>

        <div class="merchant-user-box">
          <strong>${merchantName}님</strong>
          <button id="merchant-product-logout">로그아웃</button>
        </div>
      </div>

      <div class="merchant-toolbar">
        <button id="go-merchant-order">주문관리</button>

${
  isBeauty
    ? '<button id="go-merchant-staff">직원관리</button>'
    : ''
}

<button id="go-merchant-product">
${
  isBeauty
    ? '서비스관리'
    : '상품관리'
}
</button>

${
  merchantType === '호텔'
    ? ''
    : '<button id="go-merchant-qr">PICK QR</button>'
}
      </div>

      <div class="payment-card">
  <div class="merchant-product-layout">

    <div class="product-create-card">
      <h2>
${
  isBeauty
    ? '서비스 등록'
    : '상품 등록'
}
</h2>

    <div class="input-group">
      <label>
${
  isBeauty
    ? '서비스명'
    : '상품명'
}
</label>
      <input id="merchant-product-name"placeholder="${
  isBeauty
    ? '예: 셋팅펌'
    : '예: 아메리카노'
}"" />
    </div>

    <div class="input-group">
      <label>가격</label>
      <input id="merchant-product-price" type="number" placeholder="예: 4500" />
    </div>
    ${
      isBeauty
        ? ''
        : `
          <div class="input-group">
            <label>카테고리</label>
    
            <input
  id="merchant-product-category"
  type="text"
  placeholder="카테고리 직접 입력"
  style="
    height:42px;
    border:1px solid #d1d5db;
    border-radius:8px;
    padding:0 12px;
    box-sizing:border-box;
  "
/>
          </div>
        `
    }

${
  isBeauty
    ? `
      <div class="input-group">
        <label>소요시간</label>

        <select id="merchant-product-duration">
          <option value="15">15분</option>
          <option value="30" selected>30분</option>
          <option value="45">45분</option>
          <option value="60">60분</option>
          <option value="90">90분</option>
          <option value="120">120분</option>
          <option value="150">150분</option>
          <option value="180">180분</option>
        </select>
      </div>
    `
    : ''
}


    <div class="input-group">
      <label>
${
  isBeauty
    ? '서비스 이미지'
    : '상품 이미지'
}
</label>
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

    <button id="merchant-product-create">
${
  isBeauty
    ? '서비스 등록'
    : '상품 등록'
}
</button>
  </div>

  <div class="product-list-card">
    <h2>
${
  isBeauty
    ? '등록된 서비스'
    : '등록된 상품'
}
</h2>

    <div class="product-summary-row">
      <span>
${
  isBeauty
    ? '총 서비스 : '
    : '총 상품 : '
}
${(products || []).length}개
</span>
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

      const assignedStaffIds =
  beautyStaffServiceRows
    .filter(
      (row) =>
        Number(row.service_id) ===
        Number(product.id)
    )
    .map((row) => Number(row.staff_id))

const assignedStaff =
  beautyStaff.filter((staff) =>
    assignedStaffIds.includes(Number(staff.id))
  )

  const assignedStaffHtml =
  isBeauty
    ? (
        assignedStaff.length > 0
          ? '<div style="margin-top:10px;width:100%;text-align:center;">' +
              '<div style="font-size:12px;color:#64748b;margin-bottom:6px;">담당직원</div>' +
              '<div style="font-size:13px;font-weight:700;">' +
                assignedStaff
                  .map((staff) => staff.staff_name || '-')
                  .join(', ') +
              '</div>' +
            '</div>'
          : '<p style="margin-top:10px;color:#94a3b8;font-size:13px;">담당직원 미설정</p>'
      )
    : ''

item.className = 'product-item-card'

  item.innerHTML =
    '<div class="product-thumb">' +
      productImage +
    '</div>' +

    '<div class="product-info">' +
  '<h3>' + (product.product_name || '-') + '</h3>' +
  '<p>' + Number(product.price || 0).toLocaleString() + '원</p>' +

  (
    isBeauty
      ? '<p>소요시간 : ' +
          Number(product.duration_minutes || 30) +
          '분</p>'
      : ''
  ) +


  '<span class="' +
    ((product.status || '판매중') === '판매중'
      ? 'product-on'
      : 'product-off') +
  '">' +
    (product.status || '판매중') +
  '</span>' +
  assignedStaffHtml +
'</div>' +

    '<div class="product-actions">' +
    '<div class="product-sort-row">' +
  '<button class="product-up-button" data-id="' + product.id + '" data-sort="' + (product.sort_order || 0) + '">▲</button>' +
  '<button class="product-down-button" data-id="' + product.id + '" data-sort="' + (product.sort_order || 0) + '">▼</button>' +
'</div>' +

(isBeauty
  ? '<button class="beauty-staff-setting-button" data-id="' +
      product.id +
      '">담당직원 설정</button>'
  : '') +

  '<button class="product-edit-button" data-id="' + product.id + '">수정</button>' +
  '<button class="product-status-button" data-id="' + product.id + '" data-status="' + (product.status || '판매중') + '">' +
    ((product.status || '판매중') === '판매중' ? '판매중지' : '판매중') +
  '</button>' +
  '<button class="product-delete-button" data-id="' + product.id + '">삭제</button>' +
'</div>'

  productBody.appendChild(item)
})

document.querySelectorAll('.beauty-staff-setting-button')
  .forEach((button) => {
    button.addEventListener('click', async () => {
      const productId =
        Number(
          (button as HTMLElement).getAttribute('data-id')
        )

      const product =
        products?.find(
          (item) => item.id === productId
        )

      if (!product) {
        alert('서비스 정보를 찾을 수 없습니다.')
        return
      }

      const { data: connectedStaff, error: connectedError } =
  await supabase
    .from('beauty_staff_services')
    .select('staff_id')
    .eq('merchant_id', merchantId)
    .eq('service_id', productId)

if (connectedError) {
  alert(
    '담당직원 조회 실패: ' +
    connectedError.message
  )
  return
}

const connectedStaffIds =
  (connectedStaff || []).map(
    (item) => Number(item.staff_id)
  )

const overlay =
  document.createElement('div')

      overlay.style.cssText = `
        position:fixed;
        inset:0;
        z-index:9999;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:20px;
        box-sizing:border-box;
        background:rgba(0,0,0,0.45);
      `

      overlay.innerHTML = `
        <div style="
          width:100%;
          max-width:480px;
          max-height:80vh;
          overflow-y:auto;
          padding:26px;
          box-sizing:border-box;
          border-radius:18px;
          background:#ffffff;
          box-shadow:0 20px 60px rgba(0,0,0,0.25);
        ">
          <h2 style="margin:0 0 8px;">
            담당직원 설정
          </h2>

          <p style="margin:0 0 22px;">
            ${product.product_name || '서비스'}
          </p>

          <label style="
            display:flex;
            align-items:center;
            gap:10px;
            padding:14px 0;
            border-bottom:1px solid #e5e7eb;
            font-weight:700;
          ">
            <input
              id="beauty-select-all-staff"
              type="checkbox"
            />
            전체 직원 선택
          </label>

          <div style="margin-top:12px;">
            ${
              beautyStaff.length > 0
                ? beautyStaff.map((staff) => `
                    <label style="
                      display:flex;
                      align-items:center;
                      gap:12px;
                      padding:12px 0;
                      border-bottom:1px solid #f1f5f9;
                    ">
                      <input
                        type="checkbox"
                        class="beauty-service-staff-checkbox"
                        value="${staff.id}"
                        ${
                          connectedStaffIds.includes(
                            Number(staff.id)
                          )
                            ? 'checked'
                            : ''
                        }
                      />

                      ${
                        staff.photo_url
                          ? `
                            <img
                              src="${staff.photo_url}"
                              alt="${staff.staff_name || ''}"
                              style="
                                width:52px;
                                height:52px;
                                border-radius:50%;
                                object-fit:cover;
                              "
                            />
                          `
                          : ''
                      }

                      <span>
                        <strong>
                          ${staff.staff_name || '-'}
                        </strong>

                        ${
                          staff.position
                            ? `<br><small>${staff.position}</small>`
                            : ''
                        }
                      </span>
                    </label>
                  `).join('')
                : `
                  <p style="color:#64748b;">
                    등록된 직원이 없습니다.
                  </p>
                `
            }
          </div>

          <div style="
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:10px;
            margin-top:24px;
          ">
            <button id="beauty-staff-setting-cancel">
              취소
            </button>

            <button id="beauty-staff-setting-save">
              저장
            </button>
          </div>
        </div>
      `

      document.body.appendChild(overlay)

      const staffCheckboxes =
        Array.from(
          overlay.querySelectorAll<HTMLInputElement>(
            '.beauty-service-staff-checkbox'
          )
        )

      const selectAll =
        overlay.querySelector<HTMLInputElement>(
          '#beauty-select-all-staff'
        )

      if (selectAll) {
        selectAll.checked =
          staffCheckboxes.length > 0 &&
          staffCheckboxes.every(
            (checkbox) => checkbox.checked
          )

        selectAll.addEventListener('change', () => {
          staffCheckboxes.forEach((checkbox) => {
            checkbox.checked = selectAll.checked
          })
        })
      }

      staffCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
          if (!selectAll) return

          selectAll.checked =
            staffCheckboxes.length > 0 &&
            staffCheckboxes.every(
              (item) => item.checked
            )
        })
      })

      overlay.querySelector(
        '#beauty-staff-setting-cancel'
      )?.addEventListener('click', () => {
        overlay.remove()
      })

      overlay.querySelector(
        '#beauty-staff-setting-save'
      )?.addEventListener('click', async () => {
        const selectedStaffIds =
          staffCheckboxes
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => Number(checkbox.value))

        const { error: deleteError } =
          await supabase
            .from('beauty_staff_services')
            .delete()
            .eq('merchant_id', merchantId)
            .eq('service_id', productId)

        if (deleteError) {
          alert(
            '기존 담당직원 삭제 실패: ' +
            deleteError.message
          )
          return
        }

        if (selectedStaffIds.length > 0) {
          const rows =
            selectedStaffIds.map((staffId) => ({
              merchant_id: merchantId,
              staff_id: staffId,
              service_id: productId
            }))

          const { error: insertError } =
            await supabase
              .from('beauty_staff_services')
              .insert(rows)

          if (insertError) {
            alert(
              '담당직원 저장 실패: ' +
              insertError.message
            )
            return
          }
        }

        alert('담당직원이 저장되었습니다.')
        overlay.remove()
      })
    })
  })

  document.querySelectorAll('.beauty-staff-setting-button')
  .forEach((button) => {
    button.addEventListener('click', async () => {
      const productId =
        Number(
          (button as HTMLElement).getAttribute('data-id')
        )

      const product =
        products?.find(
          (item) => item.id === productId
        )

      if (!product) {
        alert('서비스 정보를 찾을 수 없습니다.')
        return
      }

      const overlay =
        document.createElement('div')

      overlay.style.cssText = `
        position:fixed;
        inset:0;
        z-index:9999;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:20px;
        box-sizing:border-box;
        background:rgba(0,0,0,0.45);
      `

      overlay.innerHTML = `
        <div style="
          width:100%;
          max-width:480px;
          max-height:80vh;
          overflow-y:auto;
          padding:26px;
          box-sizing:border-box;
          border-radius:18px;
          background:#ffffff;
          box-shadow:0 20px 60px rgba(0,0,0,0.25);
        ">
          <h2 style="margin:0 0 8px;">
            담당직원 설정
          </h2>

          <p style="margin:0 0 22px;">
            ${product.product_name || '서비스'}
          </p>

          <div>
            ${
              beautyStaff.length > 0
                ? beautyStaff.map((staff) => `
                    <label style="
                      display:flex;
                      align-items:center;
                      gap:12px;
                      padding:12px 0;
                      border-bottom:1px solid #f1f5f9;
                    ">
                      <input
  type="checkbox"
  class="beauty-service-staff-checkbox"
  value="${staff.id}"
  ''
/>

                      ${
                        staff.photo_url
                          ? `
                            <img
                              src="${staff.photo_url}"
                              alt="${staff.staff_name || ''}"
                              style="
                                width:52px;
                                height:52px;
                                border-radius:50%;
                                object-fit:cover;
                              "
                            />
                          `
                          : ''
                      }

                      <span>
                        <strong>
                          ${staff.staff_name || '-'}
                        </strong>

                        ${
                          staff.position
                            ? `<br><small>${staff.position}</small>`
                            : ''
                        }
                      </span>
                    </label>
                  `).join('')
                : `
                  <p style="color:#64748b;">
                    등록된 직원이 없습니다.
                  </p>
                `
            }
          </div>

          <div style="
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:10px;
            margin-top:24px;
          ">
            <button id="beauty-staff-setting-cancel">
              취소
            </button>

            <button id="beauty-staff-setting-save">
              저장
            </button>
          </div>
        </div>
      `

      document.body.appendChild(overlay)

      overlay.querySelector(
        '#beauty-staff-setting-cancel'
      )?.addEventListener('click', () => {
        overlay.remove()
      })

      overlay.querySelector(
        '#beauty-staff-setting-save'
      )?.addEventListener('click', () => {
        alert('저장 기능은 다음 단계에서 연결합니다.')
      })
    })
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
  isBeauty
    ? '뷰티서비스'
    : (
        (document.getElementById('merchant-product-category') as HTMLSelectElement)
          ?.value || '기타'
      )

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

    document.querySelector('#go-merchant-staff')
  ?.addEventListener('click', () => {
    location.href = '/merchant-staff'
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

  } else if (path === '/merchant-staff') {

    await renderBeautyStaff(app, supabase)
  

  } else if (path === '/merchant-qr') {

    const merchantId =
      Number(sessionStorage.getItem('login_merchant_id'))
  
    const merchantName =
      sessionStorage.getItem('login_merchant_name') || ''
  
    if (!merchantId) {
      alert('로그인이 필요합니다.')
      location.href = '/merchant-login'
    }
  
    const merchantType =
  sessionStorage.getItem('login_merchant_type') || '일반매장'

  const kioskUrl =
  merchantType === '아카데미'
    ? (
        window.location.origin +
        '/academy-chrome?merchant_id=' +
        merchantId
      )
    : (
        'https://nxgsoft.co.kr/pay/?merchant_id=' +
        merchantId
      )

   
  
  app.innerHTML = `
  <div class="pg-admin-page">

    <div class="merchant-pick-header no-print">
      <h1>
  ${merchantType === '아카데미'
    ? '아카데미 QR관리'
    : 'NXG PICK QR관리'}
</h1>

      <div class="merchant-user-box">
        <strong>${merchantName}님</strong>
        <button id="merchant-qr-logout">로그아웃</button>
      </div>
    </div>

    ${
      merchantType === '아카데미'
        ? `
          <div class="merchant-toolbar no-print">
            <button id="qr-go-academy-home">
              관리홈
            </button>
          </div>
        `
        : `
          <div class="merchant-toolbar no-print">
            <button id="qr-go-order">주문관리</button>
            <button id="qr-go-product">상품관리</button>
            <button id="qr-go-qr">PICK QR</button>
          </div>
        `
    }

    <div class="qr-management-wrap">

      <div id="qr-print-area" class="qr-print-area">

      <div class="qr-guide-poster-wrap">
  <img
    class="qr-guide-poster"
    src="/qr-guide-poster.png"
    alt="QR코드 결제 방법 안내"
  />
</div>

          <div class="qr-print-main">

  <div id="merchant-qr-box" class="merchant-qr-box"></div>

  <div class="qr-print-message">
    QR코드를 스캔해 주문해주세요
  </div>

</div>

        </div>

      </div>

      <div class="qr-admin-controls no-print">

        <div class="qr-link-box">
          <div class="qr-link-label">링크주소</div>
          <div class="qr-link-url">${kioskUrl}</div>
        </div>

        <div
          id="copy-kiosk-url"
          role="button"
          tabindex="0"
          class="qr-admin-button"
        >
          📋 링크 복사
        </div>

        <div
          id="print-qr"
          role="button"
          tabindex="0"
          class="qr-admin-button qr-print-button"
        >
          🖨️ 인쇄
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

      document
  .querySelector('#qr-go-academy-home')
  ?.addEventListener('click', () => {
    location.href = '/merchant-admin'
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

        const memberParams =
  new URLSearchParams(location.search)

const memberKeyword =
  (memberParams.get('member_keyword') || '')
    .trim()
    .toLowerCase()

const memberRows =
  (members || []).filter((member) => {

    if (!memberKeyword) {
      return true
    }

    const memberName =
      String(member.member_name || '')
        .trim()
        .toLowerCase()

    return memberName.includes(memberKeyword)
  })

const memberPagination =
  getAcademyPagination(
    memberRows.length,
    'academy_members'
  )

const memberPageRows =
  memberRows.slice(
    memberPagination.startIndex,
    memberPagination.startIndex +
      memberPagination.pageSize
  )
    
      app.innerHTML = `
        <div class="merchant-members-page">
    
          <h1>회원관리</h1>

          ${getMemberMenuHtml('members')}

          <div class="academy-member-search-row">
          
            <input
              id="academy-member-search-input"
              type="text"
              placeholder="회원명 입력"
              value="${memberParams.get('member_keyword') || ''}"
            />
          
            <button
              id="academy-member-search-btn"
              type="button"
            >
              검색
            </button>
          
            <button
              id="add-member-btn"
              type="button"
            >
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
              ${memberPageRows.map(member => `
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

          ${getAcademyPaginationHtml(
            'academy-members',
            memberPagination.pageSize,
            memberPagination.currentPage,
            memberPagination.totalPages
          )}

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

      document.querySelector('#academy-member-search-btn')
  ?.addEventListener('click', () => {

    const keyword =
      (
        document.querySelector<HTMLInputElement>(
          '#academy-member-search-input'
        )?.value || ''
      ).trim()

    sessionStorage.setItem(
      'academy_members_page',
      '1'
    )

    const params =
      new URLSearchParams()

    if (keyword) {
      params.set(
        'member_keyword',
        keyword
      )
    }

    location.href =
      '/merchant-members' +
      (
        params.toString()
          ? '?' + params.toString()
          : ''
      )
  })

  document.querySelector('#academy-member-search-input')
  ?.addEventListener('keydown', (event) => {

    if ((event as KeyboardEvent).key !== 'Enter') {
      return
    }

    document.querySelector<HTMLButtonElement>(
      '#academy-member-search-btn'
    )?.click()
  })

      bindAcademyPagination(
        'academy-members',
        'academy_members',
        memberPagination.currentPage,
        memberPagination.totalPages
      )

      document.querySelector('#add-member-btn')
  ?.addEventListener('click', () => {

    const modal =
      document.querySelector<HTMLElement>('#member-modal')

    const title =
      modal?.querySelector('h2')

    const saveButton =
      document.querySelector<HTMLButtonElement>('#save-member-btn')

    const nameInput =
      document.querySelector<HTMLInputElement>('#member-name')

    const birthInput =
      document.querySelector<HTMLInputElement>('#member-birth-date')

    const phoneInput =
      document.querySelector<HTMLInputElement>('#member-phone')

    const billingDayInput =
      document.querySelector<HTMLInputElement>('#member-billing-day')

    const monthlyFeeInput =
      document.querySelector<HTMLInputElement>('#member-monthly-fee')

    const emailInput =
      document.querySelector<HTMLInputElement>('#member-email')

    const addressInput =
      document.querySelector<HTMLInputElement>('#member-address')

    const memoInput =
      document.querySelector<HTMLTextAreaElement>('#member-memo')


    if (title) {
      title.textContent = '회원 추가'
    }

    if (saveButton) {
      delete saveButton.dataset.editId
      saveButton.textContent = '저장'
    }

    if (nameInput) nameInput.value = ''
    if (birthInput) birthInput.value = ''
    if (phoneInput) phoneInput.value = ''
    if (billingDayInput) billingDayInput.value = ''
    if (monthlyFeeInput) monthlyFeeInput.value = ''
    if (emailInput) emailInput.value = ''
    if (addressInput) addressInput.value = ''
    if (memoInput) memoInput.value = ''

    if (modal) {
      modal.style.display = 'flex'
    }
  })

document.querySelector('#close-member-modal')
  ?.addEventListener('click', () => {
    document.querySelector<HTMLElement>('#member-modal')!.style.display = 'none'
  })

  document.querySelector('#save-member-btn')
  ?.addEventListener('click', async () => {

    const saveButton =
      document.querySelector<HTMLButtonElement>('#save-member-btn')

    const editId =
      Number(saveButton?.dataset.editId || 0)

    const memberName =
      (
        document.querySelector<HTMLInputElement>('#member-name')?.value || ''
      ).trim()

    const phone =
      (
        document.querySelector<HTMLInputElement>('#member-phone')?.value || ''
      ).trim()

    const email =
      (
        document.querySelector<HTMLInputElement>('#member-email')?.value || ''
      ).trim()

    const address =
      (
        document.querySelector<HTMLInputElement>('#member-address')?.value || ''
      ).trim()

    const memo =
      (
        document.querySelector<HTMLTextAreaElement>('#member-memo')?.value || ''
      ).trim()

    const birthDate =
      document.querySelector<HTMLInputElement>(
        '#member-birth-date'
      )?.value || ''

    const billingDay =
      Number(
        document.querySelector<HTMLInputElement>(
          '#member-billing-day'
        )?.value || 0
      )

    const monthlyFee =
      Number(
        document.querySelector<HTMLInputElement>(
          '#member-monthly-fee'
        )?.value || 0
      )


    if (!memberName) {
      alert('회원명을 입력해주세요.')
      return
    }


    /* =========================
       수정
    ========================= */

    if (editId) {

      const { error } = await supabase
        .from('members')
        .update({
          member_name: memberName,
          phone,
          email,
          address,
          memo,
          birth_date: birthDate,
          billing_day: billingDay,
          monthly_fee: monthlyFee
        })
        .eq('id', editId)
    
      if (error) {
        alert('회원 수정 실패: ' + error.message)
        return
      }
    
      alert('회원 정보가 수정되었습니다.')
      location.reload()
      return
    }


    /* =========================
       신규 등록
    ========================= */

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

  document.querySelectorAll('.member-edit-btn')
  .forEach((button) => {

    button.addEventListener('click', () => {

      const memberId =
        Number((button as HTMLElement).dataset.id)

      const member =
        (members || []).find(
          (item) => Number(item.id) === memberId
        )

      if (!member) {
        alert('회원 정보를 찾을 수 없습니다.')
        return
      }

      const modal =
        document.querySelector<HTMLElement>('#member-modal')

      if (!modal) {
        return
      }

      const title =
        modal.querySelector('h2')

      if (title) {
        title.textContent = '회원 수정'
      }

      const nameInput =
        document.querySelector<HTMLInputElement>('#member-name')

      const birthInput =
        document.querySelector<HTMLInputElement>('#member-birth-date')

      const phoneInput =
        document.querySelector<HTMLInputElement>('#member-phone')

      const billingDayInput =
        document.querySelector<HTMLInputElement>('#member-billing-day')

      const monthlyFeeInput =
        document.querySelector<HTMLInputElement>('#member-monthly-fee')

      const emailInput =
        document.querySelector<HTMLInputElement>('#member-email')

      const addressInput =
        document.querySelector<HTMLInputElement>('#member-address')

      const memoInput =
        document.querySelector<HTMLTextAreaElement>('#member-memo')

      if (nameInput) {
        nameInput.value = member.member_name || ''
      }

      if (birthInput) {
        birthInput.value = member.birth_date || ''
      }

      if (phoneInput) {
        phoneInput.value = member.phone || ''
      }

      if (billingDayInput) {
        billingDayInput.value =
          member.billing_day
            ? String(member.billing_day)
            : ''
      }

      if (monthlyFeeInput) {
        monthlyFeeInput.value =
          member.monthly_fee
            ? String(member.monthly_fee)
            : ''
      }

      if (emailInput) {
        emailInput.value = member.email || ''
      }

      if (addressInput) {
        addressInput.value = member.address || ''
      }

      if (memoInput) {
        memoInput.value = member.memo || ''
      }

      const saveButton =
        document.querySelector<HTMLButtonElement>('#save-member-btn')

      if (saveButton) {
        saveButton.dataset.editId =
          String(member.id)

        saveButton.textContent = '수정 저장'
      }

      modal.style.display = 'flex'
    })

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


const today = new Date()

const currentYear =
  today.getFullYear()

const currentMonthNumber =
  today.getMonth() + 1

const currentMonth =
  currentYear +
  '-' +
  String(currentMonthNumber).padStart(2, '0')

const currentMonthStart =
  currentMonth + '-01'

const currentMonthLastDay =
  new Date(
    currentYear,
    currentMonthNumber,
    0
  ).getDate()

const currentMonthEnd =
  currentMonth +
  '-' +
  String(currentMonthLastDay).padStart(2, '0')


const billingParams =
  new URLSearchParams(location.search)

const billingStartDate =
  billingParams.get('billing_start_date') ||
  currentMonthStart

const billingEndDate =
  billingParams.get('billing_end_date') ||
  currentMonthEnd

  const billingMemberKeyword =
  (billingParams.get('billing_member_keyword') || '')
    .trim()
    .toLowerCase()


/* =========================
   회원 조회
========================= */

const { data: members, error: membersError } =
  await supabase
    .from('members')
    .select('*')
    .eq('merchant_id', merchantId)

    if (membersError) {
      alert('회원 조회 실패: ' + membersError.message)
    }


/* =========================
   기존 이번달 청구 조회
========================= */

const {
  data: currentMonthBillings,
  error: currentMonthBillingError
} = await supabase
  .from('billings')
  .select('*')
  .eq('merchant_id', merchantId)
  .eq('billing_month', currentMonth)

  if (currentMonthBillingError) {
    alert(
      '이번달 청구 조회 실패: ' +
      currentMonthBillingError.message
    )
    
  }


/* =========================
   청구일이 도래한 회원 자동청구
========================= */

const existingMemberIds =
  (currentMonthBillings || []).map(
    (billing) => Number(billing.member_id)
  )

const todayDay =
  today.getDate()

const autoBillingMembers =
  (members || []).filter((member) => {

    const billingDay =
      Number(member.billing_day || 0)

    const monthlyFee =
      Number(member.monthly_fee || 0)

    const isActive =
      (member.status || '사용중') === '사용중'

    const billingAlreadyExists =
      existingMemberIds.includes(
        Number(member.id)
      )

    return (
      isActive &&
      monthlyFee > 0 &&
      billingDay > 0 &&
      billingDay <= todayDay &&
      !billingAlreadyExists
    )
  })


  if (autoBillingMembers.length > 0) {

    const autoBillingRows =
      autoBillingMembers.map((member) => ({
        merchant_id: merchantId,
        member_id: member.id,
        billing_month: currentMonth,
        amount: Number(member.monthly_fee || 0),
        memo: '정기청구',
        payment_status: '미납',
        send_status: '미발송'
      }))
  
    const { error: autoBillingError } =
      await supabase
        .from('billings')
        .insert(autoBillingRows)
  
    if (autoBillingError) {
      alert(
        '자동 청구 생성 실패: ' +
        autoBillingError.message
      )
    }
  }
  
  /* =========================
     전체 청구 다시 조회
  ========================= */

const { data: allBillings, error: billingError } =
  await supabase
    .from('billings')
    .select('*')
    .eq('merchant_id', merchantId)
    .order('id', { ascending: false })

if (billingError) {
  alert('청구 조회 실패: ' + billingError.message)
}


/* =========================
   날짜 검색
========================= */

const billings =
  (allBillings || []).filter((billing) => {

    let billingDate = ''

    if (billing.created_at) {
      billingDate =
        String(billing.created_at).slice(0, 10)
    } else if (billing.billing_month) {
      billingDate =
        String(billing.billing_month) + '-01'
    }

    if (!billingDate) {
      return false
    }

    const memberName =
  String(
    (members || []).find(
      (member) =>
        Number(member.id) ===
        Number(billing.member_id)
    )?.member_name || ''
  )
    .trim()
    .toLowerCase()

const dateMatched =
  billingDate >= billingStartDate &&
  billingDate <= billingEndDate

const memberMatched =
  !billingMemberKeyword ||
  memberName.includes(billingMemberKeyword)

return (
  dateMatched &&
  memberMatched
)
  })

  const billingPagination =
  getAcademyPagination(
    billings.length,
    'academy_billings'
  )

const billingPageRows =
  billings.slice(
    billingPagination.startIndex,
    billingPagination.startIndex +
      billingPagination.pageSize
  )

  app.innerHTML = `
    <div class="merchant-members-page">
      <h1>청구관리</h1>
      ${getMemberMenuHtml('billings')}

      <div class="billing-date-search">

  <input
    id="billing-start-date"
    type="date"
    value="${billingStartDate}"
  />

  <span>~</span>

  <input
    id="billing-end-date"
    type="date"
    value="${billingEndDate}"
  />

  <input
    id="billing-member-search-input"
    type="text"
    placeholder="회원명 입력"
    value="${billingParams.get('billing_member_keyword') || ''}"
  />

  <button
    id="billing-date-search-btn"
    type="button"
  >
    검색
  </button>

</div>


<div class="billing-button-group">

  <button
    id="bulk-add-billing-btn"
    class="billing-action-btn bulk-add-billing-btn"
  >
    ➕ 선택건 추가청구
  </button>

  <button
    id="billing-kakao-send-btn"
    class="billing-action-btn kakao-send-btn"
  >
    <span class="kakao-talk-badge">TALK</span>
    선택건 문자 / 카카오 발송
  </button>

</div>

      <table class="admin-table academy-billing-table">
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
  ${billingPageRows.map(billing => `
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
      ? `
        <div class="billing-action-buttons">
  <button
    class="billing-complete-btn"
    data-id="${billing.id}"
  >
    완료
  </button>

  <button
    class="billing-delete-btn"
    data-id="${billing.id}"
  >
    취소
  </button>
</div>
      `
      : '-'
  }
</td>
    </tr>
  `).join('')}
</tbody>
      </table>

      ${getAcademyPaginationHtml(
        'academy-billings',
        billingPagination.pageSize,
        billingPagination.currentPage,
        billingPagination.totalPages
      )}

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

  document.querySelector('#billing-date-search-btn')
  ?.addEventListener('click', () => {

    const startDate =
      document.querySelector<HTMLInputElement>(
        '#billing-start-date'
      )?.value || ''

    const endDate =
      document.querySelector<HTMLInputElement>(
        '#billing-end-date'
      )?.value || ''

    const memberKeyword =
      (
        document.querySelector<HTMLInputElement>(
          '#billing-member-search-input'
        )?.value || ''
      ).trim()

    if (!startDate || !endDate) {
      alert('시작일과 종료일을 선택해주세요.')
      return
    }

    if (startDate > endDate) {
      alert('시작일이 종료일보다 늦을 수 없습니다.')
      return
    }

    sessionStorage.setItem(
      'academy_billings_page',
      '1'
    )

    const params =
      new URLSearchParams()

    params.set(
      'billing_start_date',
      startDate
    )

    params.set(
      'billing_end_date',
      endDate
    )

    if (memberKeyword) {
      params.set(
        'billing_member_keyword',
        memberKeyword
      )
    }

    location.href =
      '/merchant-billings?' +
      params.toString()
  })

  bindAcademyPagination(
    'academy-billings',
    'academy_billings',
    billingPagination.currentPage,
    billingPagination.totalPages
  )

  document.querySelectorAll('.billing-complete-btn')
  .forEach((button) => {

    button.addEventListener('click', async () => {

      const billingId =
        Number(
          (button as HTMLElement).dataset.id
        )

      if (!billingId) {
        alert('청구 정보를 찾을 수 없습니다.')
        return
      }

      const confirmed =
        confirm('이 청구건을 완료처리하시겠습니까?')

      if (!confirmed) {
        return
      }

      const { error } =
        await supabase
          .from('billings')
          .update({
            payment_status: '완료'
          })
          .eq('id', billingId)

      if (error) {
        alert(
          '완료처리 실패: ' +
          error.message
        )
        return
      }

      alert('완료처리되었습니다.')
      location.reload()
    })

  })

  document
  .querySelectorAll<HTMLButtonElement>(
    '.billing-delete-btn'
  )
  .forEach((button) => {

    button.addEventListener(
      'click',
      async () => {

        const billingId =
          Number(button.dataset.id || 0)

        if (!billingId) {
          alert('청구정보를 찾을 수 없습니다.')
          return
        }

        if (
          !confirm(
            '이 청구건을 취소하시겠습니까?\n\n' +
            '아직 결제되지 않은 청구건만 취소할 수 있습니다.'
          )
        ) {
          return
        }

        const {
          data: billing,
          error: findError
        } =
          await supabase
            .from('billings')
            .select('id, payment_status')
            .eq('id', billingId)
            .eq('merchant_id', merchantId)
            .single()

        if (
          findError ||
          !billing
        ) {
          alert('청구정보 조회 실패')
          return
        }

        if (
          (billing.payment_status || '미납') !== '미납'
        ) {
          alert(
            '이미 결제 완료된 청구건은 여기서 취소할 수 없습니다.'
          )
          return
        }

        const { error } =
          await supabase
            .from('billings')
            .delete()
            .eq('id', billingId)
            .eq('merchant_id', merchantId)

        if (error) {
          alert(
            '청구취소 실패: ' +
            error.message
          )
          return
        }

        alert('청구가 취소되었습니다.')
        location.reload()
      }
    )
  })

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
      alert('추가청구할 회원을 선택해주세요.')
      return
    }

    const amountText =
      prompt(
        '추가 청구금액을 입력해주세요.\n예: 30000'
      )

    if (!amountText) {
      return
    }

    const addAmount =
      Number(
        amountText
          .replace(/,/g, '')
          .trim()
      )

    if (!addAmount || addAmount <= 0) {
      alert('추가금액을 올바르게 입력해주세요.')
      return
    }

    const addMemo =
      (
        prompt(
          '추가청구 내용을 입력해주세요.\n예: 교재비, 재료비, 추가수업비'
        ) || ''
      ).trim()

    if (!addMemo) {
      alert('추가청구 내용을 입력해주세요.')
      return
    }

    const {
      data: selectedBillings,
      error: selectError
    } = await supabase
      .from('billings')
      .select('*')
      .eq('merchant_id', merchantId)
      .in('id', ids)

    if (selectError) {
      alert(
        '청구 조회 실패: ' +
        selectError.message
      )
      return
    }

    if (
      !selectedBillings ||
      selectedBillings.length === 0
    ) {
      alert('선택한 청구정보를 찾을 수 없습니다.')
      return
    }

    const newBillingRows =
      selectedBillings.map((billing) => ({
        merchant_id: merchantId,
        member_id: Number(billing.member_id),
        billing_month:
          billing.billing_month || currentMonth,
        amount: addAmount,
        memo: '추가청구 - ' + addMemo,
        payment_status: '미납',
        send_status: '미발송'
      }))

    const { error: insertError } =
      await supabase
        .from('billings')
        .insert(newBillingRows)

    if (insertError) {
      alert(
        '추가청구 등록 실패: ' +
        insertError.message
      )
      return
    }

    alert(
      selectedBillings.length +
      '건의 추가청구가 등록되었습니다.\n\n' +
      '추가금액: ' +
      addAmount.toLocaleString() +
      '원\n' +
      '내용: ' +
      addMemo
    )

    location.reload()
  })

      
  document
  .querySelector('#billing-kakao-send-btn')
  ?.addEventListener('click', () => {
    alert('준비중')
  })


} else if (path === '/merchant-academy-payments') {

  const merchantId =
    Number(
      sessionStorage.getItem('login_merchant_id')
    )

  if (!merchantId) {
    alert('로그인이 필요합니다.')
    location.href = '/merchant-login'
  }


  /* =========================
     기본 날짜
  ========================= */

  const today =
    new Date()

  const currentYear =
    today.getFullYear()

  const currentMonthNumber =
    today.getMonth() + 1

  const currentMonth =
    currentYear +
    '-' +
    String(currentMonthNumber).padStart(2, '0')

  const currentMonthStart =
    currentMonth + '-01'

  const currentMonthLastDay =
    new Date(
      currentYear,
      currentMonthNumber,
      0
    ).getDate()

  const currentMonthEnd =
    currentMonth +
    '-' +
    String(currentMonthLastDay).padStart(2, '0')


  const paymentParams =
    new URLSearchParams(location.search)

  const paymentStartDate =
    paymentParams.get('payment_start_date') ||
    currentMonthStart

  const paymentEndDate =
    paymentParams.get('payment_end_date') ||
    currentMonthEnd

    const paymentMemberKeyword =
  (paymentParams.get('payment_member_keyword') || '')
    .trim()
    .toLowerCase()


  /* =========================
     회원 조회
  ========================= */

  const { data: members } =
    await supabase
      .from('members')
      .select('*')
      .eq('merchant_id', merchantId)


  /* =========================
     결제내역 조회
  ========================= */

  const { data: paymentRows, error: paymentError } =
    await supabase
      .from('payments')
      .select('*')
      .eq('merchant_id', merchantId)
      .order('id', { ascending: false })

  if (paymentError) {
    alert(
      '결제내역 조회 실패: ' +
      paymentError.message
    )
  }


  /* =========================
     날짜 필터
  ========================= */

  const academyPayments =
    (paymentRows || []).filter((payment) => {

      const paymentDate =
        String(
          payment.approved_at ||
          payment.created_at ||
          ''
        ).slice(0, 10)

      if (!paymentDate) {
        return false
      }

      const memberName =
  String(
    payment.sender_name ||
    payment.buyer_name ||
    ''
  )
    .trim()
    .toLowerCase()

const dateMatched =
  paymentDate >= paymentStartDate &&
  paymentDate <= paymentEndDate

const memberMatched =
  !paymentMemberKeyword ||
  memberName.includes(paymentMemberKeyword)

return (
  dateMatched &&
  memberMatched
)
    })


  /* =========================
     페이징
  ========================= */

  const paymentPagination =
    getAcademyPagination(
      academyPayments.length,
      'academy_payments'
    )

  const paymentPageRows =
    academyPayments.slice(
      paymentPagination.startIndex,
      paymentPagination.startIndex +
        paymentPagination.pageSize
    )


  app.innerHTML = `
    <div class="merchant-members-page">

      <h1>결제내역</h1>

      ${getMemberMenuHtml('payments')}


      <div class="billing-date-search">

        <input
          id="academy-payment-start-date"
          type="date"
          value="${paymentStartDate}"
        />

        <span>~</span>

        <input
          id="academy-payment-end-date"
          type="date"
          value="${paymentEndDate}"
        />

        <input
  id="academy-payment-member-search-input"
  type="text"
  placeholder="회원명 입력"
  value="${paymentParams.get('payment_member_keyword') || ''}"
/>

        <button
          id="academy-payment-search-btn"
          type="button"
        >
          검색
        </button>

      </div>


      <table class="admin-table academy-payment-table">

        <thead>
          <tr>
            <th>No</th>
            <th>승인일시</th>
            <th>회원명</th>
            <th>결제금액</th>
            <th>카드번호</th>
            <th>승인번호</th>
            <th>결제상태</th>
          </tr>
        </thead>

        <tbody>

          ${
            paymentPageRows.map((payment, index) => {

              const member =
                (members || []).find(
                  (item) =>
                    Number(item.id) ===
                    Number(payment.member_id)
                )

              const cardNumber =
                payment.card_number
                  ? String(payment.card_number)
                  : '-'

              return `
                <tr>

                  <td>
                    ${
                      paymentPagination.startIndex +
                      index +
                      1
                    }
                  </td>

                  <td>
  <button
  type="button"
  class="academy-receipt-link"
  data-id="${payment.id}"
  style="
    border:0;
    background:#174981;
    color:#ffffff;
    padding:6px 10px;
    width:170px;
    border-radius:7px;
    cursor:pointer;
    font:inherit;
    font-weight:700;
    white-space:nowrap;
  "
>
    ${
      payment.approved_at ||
      payment.created_at ||
      '-'
    }
  </button>
</td>

                  <td>
                    ${
                      member?.member_name ||
                      payment.buyer_name ||
                      payment.sender_name ||
                      '-'
                    }
                  </td>

                  <td>
                    ${Number(
                      payment.amount || 0
                    ).toLocaleString()}원
                  </td>

                  <td>
                    ${cardNumber}
                  </td>

                  <td>
  ${
    payment.status === 'cancel'
      ? (
          payment.approval_number ||
          '취소완료'
        )
      : `
        <button
  type="button"
  class="academy-cancel-approval-link"
  data-payment-id="${payment.id}"
  data-amount="${payment.amount || 0}"
  data-created-at="${
    payment.approved_at ||
    payment.created_at ||
    ''
  }"
  data-pg="${payment.pg_company || ''}"
  style="
    border:0;
    background:#174981;
    color:#ffffff;
    padding:6px 10px;
    width:110px;
    border-radius:7px;
    cursor:pointer;
    font:inherit;
    font-weight:700;
    white-space:nowrap;
  "
>
  ${payment.approval_number || '-'}
</button>
      `
  }
</td>

                  <td>
                    ${
                      payment.status ||
                      payment.order_status ||
                      '-'
                    }
                  </td>

                </tr>
              `
            }).join('')
          }

        </tbody>

      </table>


      ${getAcademyPaginationHtml(
        'academy-payments',
        paymentPagination.pageSize,
        paymentPagination.currentPage,
        paymentPagination.totalPages
      )}

      <div id="academy-cancel-modal" class="cancel-modal">
  <div class="cancel-box">

    <h3>결제 취소</h3>

    <p id="academy-cancel-order-info">
      결제를 취소하시겠습니까?
    </p>

    <input
      id="academy-cancel-password"
      type="password"
      placeholder="취소 비밀번호 입력"
    />

    <textarea
      id="academy-cancel-reason"
      placeholder="취소 사유 입력"
    ></textarea>

    <div class="cancel-button-row">

      <button id="academy-direct-cancel-button">
        직접 취소
      </button>

      <button id="academy-request-cancel-button">
        본사 승인요청
      </button>

      <button id="academy-close-cancel-modal">
        닫기
      </button>

    </div>

  </div>
</div>

    </div>
  `


  bindMemberMenuEvents()


  bindAcademyPagination(
    'academy-payments',
    'academy_payments',
    paymentPagination.currentPage,
    paymentPagination.totalPages
  )

  document
  .querySelectorAll<HTMLElement>(
    '.academy-cancel-approval-link'
  )
  .forEach((item) => {

    item.addEventListener('click', () => {

      const modal =
        document.querySelector<HTMLElement>(
          '#academy-cancel-modal'
        )

      if (!modal) return

      const paymentId =
        item.dataset.paymentId || ''

      const amount =
        Number(item.dataset.amount || 0)

      const createdAt =
        item.dataset.createdAt || ''

      const pgCompany =
        item.dataset.pg || ''

      const info =
        document.querySelector<HTMLElement>(
          '#academy-cancel-order-info'
        )

      if (info) {
        info.textContent =
          '결제금액 ' +
          amount.toLocaleString() +
          '원을 취소하시겠습니까?'
      }

      modal.dataset.paymentId =
        paymentId

      modal.dataset.createdAt =
        createdAt

      modal.dataset.pg =
        pgCompany

      modal.style.display =
        'flex'
    })
  })


document
  .querySelector(
    '#academy-close-cancel-modal'
  )
  ?.addEventListener('click', () => {

    const modal =
      document.querySelector<HTMLElement>(
        '#academy-cancel-modal'
      )

    if (modal) {
      modal.style.display =
        'none'
    }
  })

  document
  .querySelector('#academy-direct-cancel-button')
  ?.addEventListener('click', async () => {

    const modal =
      document.querySelector<HTMLElement>(
        '#academy-cancel-modal'
      )

    if (!modal) return

    const paymentId =
      Number(
        modal.dataset.paymentId || 0
      )

    const createdAt =
      modal.dataset.createdAt || ''

    const password =
      (
        document.querySelector<HTMLInputElement>(
          '#academy-cancel-password'
        )?.value || ''
      ).trim()

    const reason =
      (
        document.querySelector<HTMLTextAreaElement>(
          '#academy-cancel-reason'
        )?.value || ''
      ).trim()

    if (!paymentId) {
      alert('취소할 결제정보를 찾을 수 없습니다.')
      return
    }

    if (!reason) {
      alert('취소 사유를 입력해주세요.')
      return
    }

    const today =
      new Date().toISOString().slice(0, 10)

    const paymentDate =
      createdAt.slice(0, 10)

    if (paymentDate !== today) {
      alert(
        '당일 결제건만 직접 취소할 수 있습니다.\n' +
        '본사 승인요청을 이용해주세요.'
      )
      return
    }

    if (password !== '1234') {
      alert('취소 비밀번호가 일치하지 않습니다.')
      return
    }

    const {
      data: payment,
      error: paymentError
    } =
      await supabase
        .from('payments')
        .select(
          'id, merchant_id, pg_company, payment_key, status'
        )
        .eq('id', paymentId)
        .single()

    if (
      paymentError ||
      !payment
    ) {
      alert('결제정보를 불러오지 못했습니다.')
      return
    }

    if (payment.status === 'cancel') {
      alert('이미 취소된 결제입니다.')
      return
    }

    const directCancelButton =
      document.querySelector<HTMLButtonElement>(
        '#academy-direct-cancel-button'
      )

    if (directCancelButton) {
      directCancelButton.disabled = true
      directCancelButton.textContent =
        '취소 처리 중...'
    }

    try {

      /* =========================
         코페이
      ========================= */

      if (payment.pg_company === '코페이') {

        const cancelResponse =
          await fetch(
            '/api/korpay-cancel',
            {
              method: 'POST',
              headers: {
                'Content-Type':
                  'application/json'
              },
              body: JSON.stringify({
                paymentId:
                  Number(payment.id),

                cancelName:
                  sessionStorage.getItem(
                    'login_merchant_name'
                  ) || '가맹점',

                cancelMessage:
                  reason
              })
            }
          )

        const cancelData =
          await cancelResponse.json()

        if (
          !cancelResponse.ok ||
          !cancelData.success
        ) {
          alert(
            '코페이 실제 취소에 실패했습니다.\n\n' +
            (
              cancelData.message ||
              '알 수 없는 오류'
            )
          )
          return
        }
      }

      /* =========================
         토스페이먼츠
      ========================= */

      else if (
        payment.pg_company ===
        '토스페이먼츠'
      ) {

        if (!payment.payment_key) {
          alert(
            '토스 paymentKey가 없습니다.'
          )
          return
        }

        const cancelResponse =
          await fetch(
            '/api/toss-cancel',
            {
              method: 'POST',
              headers: {
                'Content-Type':
                  'application/json'
              },
              body: JSON.stringify({
                paymentKey:
                  payment.payment_key,

                cancelReason:
                  reason
              })
            }
          )

        const cancelData =
          await cancelResponse.json()

        if (!cancelResponse.ok) {
          alert(
            '토스 실제 취소에 실패했습니다.\n\n' +
            (
              cancelData.message ||
              '알 수 없는 오류'
            )
          )
          return
        }

        const {
          error: updateError
        } =
          await supabase
            .from('payments')
            .update({
              status: 'cancel',
              canceled_at:
                new Date().toISOString(),

              payout_status:
                '출금제외',

              settlement_status:
                '취소'
            })
            .eq(
              'id',
              Number(payment.id)
            )

        if (updateError) {
          alert(
            '토스 취소는 성공했지만 ' +
            '결제내역 수정에 실패했습니다.\n' +
            updateError.message
          )
          return
        }
      }

      /* =========================
         지원하지 않는 PG
      ========================= */

      else {

        alert(
          '직접 취소를 지원하지 않는 PG사입니다.\n' +
          '결제 PG사: ' +
          (payment.pg_company || '-')
        )

        return
      }

      alert(
        '결제가 취소되었습니다.'
      )

      location.reload()

    } catch (error) {

      console.error(error)

      alert(
        '취소 처리 중 오류가 발생했습니다.'
      )

    } finally {

      if (directCancelButton) {
        directCancelButton.disabled =
          false

        directCancelButton.textContent =
          '직접 취소'
      }
    }
  })

  

  document
  .querySelector('#academy-request-cancel-button')
  ?.addEventListener('click', async () => {

    const modal =
      document.querySelector<HTMLElement>(
        '#academy-cancel-modal'
      )

    if (!modal) return

    const paymentId =
      Number(modal.dataset.paymentId || 0)

    const reason =
      (
        document.querySelector<HTMLTextAreaElement>(
          '#academy-cancel-reason'
        )?.value || ''
      ).trim()

    if (!paymentId) {
      alert('취소할 결제정보를 찾을 수 없습니다.')
      return
    }

    if (!reason) {
      alert('취소 사유를 입력해주세요.')
      return
    }

    const requestButton =
      document.querySelector<HTMLButtonElement>(
        '#academy-request-cancel-button'
      )

    if (requestButton) {
      requestButton.disabled = true
      requestButton.textContent = '요청 처리 중...'
    }

    try {

      const {
        data: payment,
        error: paymentError
      } =
        await supabase
          .from('payments')
          .select(`
            id,
            merchant_id,
            merchant_name,
            amount,
            settlement_amount,
            manager_admin_id,
            manager_admin_name,
            status
          `)
          .eq('id', paymentId)
          .single()

      if (
        paymentError ||
        !payment
      ) {
        alert('결제정보를 불러오지 못했습니다.')
        return
      }

      if (payment.status === 'cancel') {
        alert('이미 취소된 결제입니다.')
        return
      }

      const {
        data: existingRequest
      } =
        await supabase
          .from('cancel_requests')
          .select('id')
          .eq(
            'payment_id',
            Number(payment.id)
          )
          .eq('status', '요청중')
          .maybeSingle()

      if (existingRequest) {
        alert(
          '이미 본사 승인요청이 접수된 거래입니다.'
        )
        return
      }

      const {
        error: requestError
      } =
        await supabase
          .from('cancel_requests')
          .insert({
            payment_id:
              Number(payment.id),

            merchant_id:
              Number(payment.merchant_id),

            manager_admin_id:
              payment.manager_admin_id || null,

            manager_admin_name:
              payment.manager_admin_name || null,

            reason,
            status: '요청중'
          })

      if (requestError) {
        alert(
          '본사 승인요청 저장에 실패했습니다.\n' +
          requestError.message
        )
        return
      }

      const {
        error: holdError
      } =
        await supabase
          .from('payments')
          .update({
            payout_hold: true,

            payout_hold_reason:
              '익일 취소 본사 승인요청: ' +
              reason,

            payout_hold_at:
              new Date().toISOString(),

            payout_status:
              '지급정지'
          })
          .eq(
            'id',
            Number(payment.id)
          )

      if (holdError) {
        alert(
          '취소요청은 접수됐지만 지급정지 처리에 실패했습니다.\n' +
          holdError.message
        )
        return
      }

      const settlementAmount =
        Number(
          payment.settlement_amount || 0
        )

      const transferFee = 500

      alert(
        '본사 승인요청이 접수되었습니다.\n\n' +
        '지급상태: 지급정지\n' +
        '반환 예정금액: ' +
        (
          settlementAmount +
          transferFee
        ).toLocaleString() +
        '원\n\n' +
        '본사 안내 후 지정 계좌로 입금해주세요.'
      )

      location.reload()

    } catch (error) {

      console.error(error)

      alert(
        '본사 승인요청 중 오류가 발생했습니다.'
      )

    } finally {

      if (requestButton) {
        requestButton.disabled = false
        requestButton.textContent =
          '본사 승인요청'
      }
    }
  })

  document
  .querySelectorAll<HTMLButtonElement>(
    '.academy-receipt-link'
  )
  .forEach((button) => {

    button.addEventListener(
      'click',
      async () => {

        const paymentId =
          Number(button.dataset.id || 0)

        if (!paymentId) {
          return
        }

        const {
          data: payment,
          error: paymentError
        } =
          await supabase
            .from('payments')
            .select('*')
            .eq('id', paymentId)
            .single()

        if (
          paymentError ||
          !payment
        ) {
          alert('영수증 정보를 불러오지 못했습니다.')
          return
        }

        const {
          data: merchant
        } =
          await supabase
            .from('merchants')
            .select('*')
            .eq(
              'id',
              Number(payment.merchant_id)
            )
            .maybeSingle()

        const isCanceled =
          payment.status === 'cancel'

        const amount =
          Number(payment.amount || 0)

        const supplyAmount =
          Math.floor(amount / 1.1)

        const vatAmount =
          amount - supplyAmount

        const date =
          payment.approved_at ||
          payment.created_at
            ? new Date(
                payment.approved_at ||
                payment.created_at
              ).toLocaleString('ko-KR')
            : '-'

        const canceledAt =
          payment.canceled_at
            ? new Date(
                payment.canceled_at
              ).toLocaleString('ko-KR')
            : '-'

        const receiptHtml = `
          <div
  id="academy-receipt-modal"
  class="receipt-modal"
  style="display:flex;"
>
  <div
    class="receipt-box receipt-approve ${
      isCanceled
        ? 'academy-receipt-cancel'
        : ''
    }"
  >

              <div class="receipt-header ${
                isCanceled
                  ? 'receipt-cancel-mode'
                  : 'receipt-approve-mode'
              }">

                <h2>NXG PICK</h2>

                <h3 class="${
                  isCanceled
                    ? 'receipt-cancel-title'
                    : 'receipt-approve-title'
                }">
                  신용카드 매출전표
                  <span>
                    ${
                      isCanceled
                        ? '(취소)'
                        : '(승인)'
                    }
                  </span>
                </h3>

              </div>


              <section>
                <h4>결제정보</h4>

                <table>

                  <tr>
                    <th>카드번호</th>
                    <td>
                      ${
                        payment.card_number ||
                        '-'
                      }
                    </td>

                    <th>카드종류</th>
                    <td>신용카드</td>
                  </tr>

                  <tr>
                    <th>거래종류</th>

                    <td class="${
                      isCanceled
                        ? 'receipt-cancel-text'
                        : 'receipt-approve-text'
                    }">
                      ${
                        isCanceled
                          ? '취소완료'
                          : '승인성공'
                      }
                    </td>

                    <th>할부개월</th>
                    <td>
                      ${
                        payment.installment_months ||
                        '일시불'
                      }
                    </td>
                  </tr>

                  <tr>
                    <th>거래일시</th>
                    <td colspan="3">
                      ${date}
                    </td>
                  </tr>

                  ${
                    isCanceled
                      ? `
                        <tr>
                          <th>취소시각</th>
                          <td colspan="3">
                            ${canceledAt}
                          </td>
                        </tr>
                      `
                      : ''
                  }

                </table>
              </section>


              <div class="receipt-grid">

                <section>
                  <h4>구매정보</h4>

                  <table>

                    <tr>
                      <th>회원명</th>
                      <td>
                        ${
                          payment.sender_name ||
                          payment.buyer_name ||
                          '-'
                        }
                      </td>
                    </tr>

                    <tr>
                      <th>승인번호</th>
                      <td>
                        ${
                          payment.approval_number ||
                          '-'
                        }
                      </td>
                    </tr>

                    <tr>
                      <th>거래번호</th>
                      <td>
                        ${
                          payment.payment_key ||
                          '-'
                        }
                      </td>
                    </tr>

                    <tr>
                      <th>요청사항</th>
                      <td>
                        ${
                          payment.message ||
                          '-'
                        }
                      </td>
                    </tr>

                  </table>
                </section>


                <section>
                  <h4>결제금액정보</h4>

                  <table>

  <tr>
    <th>과세금액</th>
    <td>
      ${
        isCanceled
          ? '-' + supplyAmount.toLocaleString()
          : supplyAmount.toLocaleString()
      }원
    </td>
  </tr>

  <tr>
    <th>비과세금액</th>
    <td>0원</td>
  </tr>

  <tr>
    <th>부가세</th>
    <td>
      ${
        isCanceled
          ? '-' + vatAmount.toLocaleString()
          : vatAmount.toLocaleString()
      }원
    </td>
  </tr>

  <tr>
    <th>주문금액</th>
    <td>
      ${
        isCanceled
          ? '-' + amount.toLocaleString()
          : amount.toLocaleString()
      }원
    </td>
  </tr>

  <tr>
    <th>할인금액</th>
    <td>0원</td>
  </tr>

  <tr class="receipt-total">
    <th>총 결제금액</th>
    <td>
      ${
        isCanceled
          ? '-' + amount.toLocaleString()
          : amount.toLocaleString()
      }원
    </td>
  </tr>

</table>
                </section>

              </div>


              <section>
                <h4>상점정보</h4>

                <table>

                  <tr>
                    <th>상점명</th>
                    <td>
                      ${
                        merchant?.merchant_name ||
                        payment.merchant_name ||
                        '-'
                      }
                    </td>

                    <th>대표자명</th>
                    <td>
                      ${
                        merchant?.owner_name ||
                        '-'
                      }
                    </td>
                  </tr>

                  <tr>
                    <th>URL주소</th>
                    <td>-</td>

                    <th>사업자번호</th>
                    <td>
                      ${
                        merchant?.business_number ||
                        '-'
                      }
                    </td>
                  </tr>

                  <tr>
                    <th>이용문의</th>
                    <td colspan="3">
                      ${
                        merchant?.phone ||
                        '-'
                      }
                    </td>
                  </tr>

                  <tr>
                    <th>주소</th>
                    <td colspan="3">
                      ${
                        [
                          merchant?.address,
                          merchant?.address_detail
                        ]
                          .filter(Boolean)
                          .join(' ') ||
                        '-'
                      }
                    </td>
                  </tr>

                </table>
              </section>


              <section>
                <h4>결제서비스업체(PG)정보</h4>

                <table>

                  <tr>
                    <th>카드사 가맹점명</th>
                    <td>
                      ${
                        payment.pg_company ||
                        '-'
                      }
                    </td>

                    <th>가맹점번호</th>
                    <td>
                      ${
                        payment.pg_mid ||
                        merchant?.toss_mid ||
                        merchant?.korpay_manual_mid ||
                        '-'
                      }
                    </td>
                  </tr>

                  <tr>
                    <th>카드사</th>
                    <td>
                      ${
                        payment.card_company ||
                        '-'
                      }
                    </td>

                    <th>결제방식</th>
                    <td>
                      ${
                        payment.payment_method ||
                        '-'
                      }
                    </td>
                  </tr>

                </table>
              </section>


              <div class="receipt-actions">

                <button
                  id="academy-receipt-print"
                >
                  인쇄하기
                </button>

                <button
                  id="academy-receipt-close"
                >
                  닫기
                </button>

              </div>

            </div>
          </div>
        `

        document
          .querySelector(
            '#academy-receipt-modal'
          )
          ?.remove()

        document.body.insertAdjacentHTML(
          'beforeend',
          receiptHtml
        )


        document
          .querySelector(
            '#academy-receipt-print'
          )
          ?.addEventListener(
            'click',
            () => {
              window.print()
            }
          )


        document
          .querySelector(
            '#academy-receipt-close'
          )
          ?.addEventListener(
            'click',
            () => {

              document
                .querySelector(
                  '#academy-receipt-modal'
                )
                ?.remove()

            }
          )
      }
    )
  })

  document
    .querySelector('#academy-payment-search-btn')
    ?.addEventListener('click', () => {

      const startDate =
        document.querySelector<HTMLInputElement>(
          '#academy-payment-start-date'
        )?.value || ''

      const endDate =
        document.querySelector<HTMLInputElement>(
          '#academy-payment-end-date'
        )?.value || ''

      if (!startDate || !endDate) {
        alert(
          '시작일과 종료일을 선택해주세요.'
        )
        return
      }

      if (startDate > endDate) {
        alert(
          '시작일이 종료일보다 늦을 수 없습니다.'
        )
        return
      }

      sessionStorage.setItem(
        'academy_payments_page',
        '1'
      )

      const params =
        new URLSearchParams()

      params.set(
        'payment_start_date',
        startDate
      )

      params.set(
        'payment_end_date',
        endDate
      )

      const memberKeyword =
  (
    document.querySelector<HTMLInputElement>(
      '#academy-payment-member-search-input'
    )?.value || ''
  ).trim()

if (memberKeyword) {
  params.set(
    'payment_member_keyword',
    memberKeyword
  )
}

      location.href =
        '/merchant-academy-payments?' +
        params.toString()
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

    

    const batchGroupedMap =
    new Map<string, any>()
  
  ;(billings || []).forEach((billing) => {
  
    const member =
      (members || []).find(
        (item) =>
          Number(item.id) ===
          Number(billing.member_id)
      )
  
    const groupKey =
      String(billing.member_id) +
      '|' +
      String(billing.billing_month || '')
  
    const existing =
      batchGroupedMap.get(groupKey)
  
      if (existing) {
        existing.amount +=
          Number(billing.amount || 0)
      
        existing.billing_count += 1
      
        existing.billing_ids.push(
          Number(billing.id)
        )
      
        return
      }
  
      batchGroupedMap.set(
        groupKey,
        {
          ...billing,
      
          member_name:
            member?.member_name || '',
      
          amount:
            Number(billing.amount || 0),
      
          billing_count: 1,
      
          billing_ids: [
            Number(billing.id)
          ]
        }
      )
  })
  
  const batchRows =
    Array.from(
      batchGroupedMap.values()
    )
  
  const batchPagination =
    getAcademyPagination(
      batchRows.length,
      'academy_batch'
    )
  
  const batchPageRows =
    batchRows.slice(
      batchPagination.startIndex,
      batchPagination.startIndex +
        batchPagination.pageSize
    )

  app.innerHTML = `
    <div class="merchant-members-page">
      <h1>수기결제</h1>

${getMemberMenuHtml('batch')}

      <div class="academy-batch-tools">

  <button id="batch-template-download-btn">
    📥 선택건 엑셀 다운로드
  </button>

  <label
    for="batch-excel-file"
    class="academy-batch-upload-label"
  >
    📂 결제파일 선택
  </label>

  <input
    id="batch-excel-file"
    type="file"
    accept=".xlsx,.xls"
    style="display:none;"
  />

  <button id="batch-excel-load-btn">
    엑셀 불러오기
  </button>

  <button id="batch-complete-btn">
    💳 선택건 결제
  </button>

</div>

<div
  id="batch-excel-file-name"
  class="academy-batch-file-name"
>
  선택된 파일 없음
</div>

<div
  id="batch-excel-preview"
  class="academy-batch-excel-preview"
  style="display:none;"
>
</div>

      <table class="admin-table academy-batch-table">
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
  ${batchPageRows.map((billing) => `
    <tr>
      <td>
        <input
  type="checkbox"
  class="batch-billing-check"
  data-id="${billing.id}"
  data-ids="${(billing.billing_ids || []).join(',')}"
/>
      </td>

      <td>
        ${billing.member_name || ''}
      </td>

      <td>
        ${billing.billing_month || ''}
      </td>

      <td>
        ${Number(
          billing.amount || 0
        ).toLocaleString()}원
      </td>

      <td>
        ${
          Number(billing.billing_count || 1) > 1
            ? '미납 (' +
              billing.billing_count +
              '건 합산)'
            : '미납'
        }
      </td>
    </tr>
  `).join('')}
</tbody>
      </table>

      ${getAcademyPaginationHtml(
        'academy-batch',
        batchPagination.pageSize,
        batchPagination.currentPage,
        batchPagination.totalPages
      )}

      <div id="payment-method-modal" class="modal-overlay" style="display:none;">
  <div class="modal-box">

    <h2>💳 결제방식 선택</h2>

    <div id="payment-method-summary" class="payment-method-summary">
  선택건수: 0건<br />
  총 결제금액: 0원
</div>

<button id="pay-qr-btn" class="payment-method-btn">
  🔳 QR결제
</button>

<button id="pay-cash-receipt-btn" class="payment-method-btn">
  🧾 현금영수증
</button>

<button id="close-payment-method-modal">
  닫기
</button>

  </div>
</div>
    </div>
  `

  bindMemberMenuEvents()

  bindAcademyPagination(
    'academy-batch',
    'academy_batch',
    batchPagination.currentPage,
    batchPagination.totalPages
  )

  /* =========================================
   선택 청구건 엑셀 양식 다운로드
========================================= */

document.querySelector('#batch-template-download-btn')
?.addEventListener('click', () => {

  const checkedItems = Array.from(
    document.querySelectorAll<HTMLInputElement>(
      '.batch-billing-check:checked'
    )
  )

  const ids =
  checkedItems.flatMap((item) =>
    String(item.dataset.ids || '')
      .split(',')
      .map((id) => Number(id))
      .filter((id) => id > 0)
  )

  if (ids.length === 0) {
    alert('엑셀로 내려받을 청구건을 선택해주세요.')
    return
  }

  const selectedBillings =
    (billings || []).filter((billing) =>
      ids.includes(Number(billing.id))
    )

    const excelGroupedMap =
    new Map<string, any>()
  
  selectedBillings.forEach((billing) => {
  
    const member =
      (members || []).find(
        (item) =>
          Number(item.id) ===
          Number(billing.member_id)
      )
  
    const groupKey =
      String(billing.member_id) +
      '|' +
      String(billing.billing_month || '')
  
    const existing =
      excelGroupedMap.get(groupKey)
  
    if (existing) {
      existing.결제금액 +=
        Number(billing.amount || 0)
  
      existing.청구ID +=
        ',' + String(billing.id)
  
      existing.상품명 =
        '정기/추가청구 합산'
  
      return
    }
  
    excelGroupedMap.set(
      groupKey,
      {
        청구ID:
          String(billing.id),
  
        회원명:
          member?.member_name || '',
  
        청구월:
          billing.billing_month || '',
  
        결제금액:
          Number(billing.amount || 0),
  
        카드번호: '',
        유효기간월: '',
        유효기간년: '',
        할부개월: '00',
  
        상품명:
          billing.memo?.includes('추가청구')
            ? '추가청구'
            : '정기결제',
  
        연락처:
          member?.phone || ''
      }
    )
  })
  
  const excelRows =
    Array.from(
      excelGroupedMap.values()
    )

  const worksheet =
    XLSX.utils.json_to_sheet(excelRows)

    /* 카드번호 열(E열)을 텍스트 형식으로 고정 */
for (let rowIndex = 2; rowIndex <= excelRows.length + 1; rowIndex += 1) {
  const cellAddress = `E${rowIndex}`
  const cell = worksheet[cellAddress]

  if (cell) {
    cell.t = 's'
    cell.z = '@'
  }
}

  worksheet['!cols'] = [
    { wch: 10 },
    { wch: 24 },
    { wch: 12 },
    { wch: 14 },
    { wch: 24 },
    { wch: 12 },
    { wch: 12 },
    { wch: 12 },
    { wch: 20 },
    { wch: 18 }
  ]

  const workbook =
    XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    '수기결제'
  )

  const todayText =
    new Date().toISOString().slice(0, 10)

  XLSX.writeFile(
    workbook,
    `아카데미_수기결제_${todayText}.xlsx`
  )
})


/* =========================================
 파일 선택 표시
========================================= */

const batchExcelFileInput =
document.querySelector<HTMLInputElement>(
  '#batch-excel-file'
)

batchExcelFileInput
?.addEventListener('change', () => {

  const fileNameBox =
    document.querySelector<HTMLElement>(
      '#batch-excel-file-name'
    )

  const file =
    batchExcelFileInput.files?.[0]

  if (!fileNameBox) {
    return
  }

  fileNameBox.textContent =
    file
      ? file.name
      : '선택된 파일 없음'
})

/* =========================================
   아카데미 비인증 엑셀 결제 데이터
   카드 원문은 DB 저장 안 함
========================================= */

let academyBatchExcelRows: Array<{
  billingIds: number[]
  memberName: string
  billingMonth: string
  amount: number

  cardNumber: string
  expiryMonth: string
  expiryYear: string

  installment: string
  productName: string
  phone: string

  valid: boolean
  errorMessage: string
}> = []


/* =========================================
   엑셀 불러오기
========================================= */

document.querySelector('#batch-excel-load-btn')
  ?.addEventListener('click', async () => {

    const fileInput =
      document.querySelector<HTMLInputElement>(
        '#batch-excel-file'
      )

    const file =
      fileInput?.files?.[0]

    if (!file) {
      alert('결제할 엑셀 파일을 선택해주세요.')
      return
    }

    try {

      const buffer =
        await file.arrayBuffer()

      const workbook =
        XLSX.read(buffer, {
          type: 'array'
        })

      const firstSheetName =
        workbook.SheetNames[0]

      if (!firstSheetName) {
        alert('엑셀 시트를 찾을 수 없습니다.')
        return
      }

      const worksheet =
        workbook.Sheets[firstSheetName]

      const rawRows =
        XLSX.utils.sheet_to_json<Record<string, any>>(
          worksheet,
          {
            defval: '',
            raw: false
          }
        )

      if (rawRows.length === 0) {
        alert('엑셀에 결제 데이터가 없습니다.')
        return
      }


      academyBatchExcelRows =
        rawRows.map((row) => {

          const billingIds =
  String(row['청구ID'] || '')
    .split(',')
    .map((id) =>
      Number(
        String(id).trim()
      )
    )
    .filter((id) => id > 0)

          const memberName =
            String(row['회원명'] || '').trim()

          const billingMonth =
            String(row['청구월'] || '').trim()

          const amount =
            Number(
              String(row['결제금액'] || '0')
                .replace(/,/g, '')
                .replace(/원/g, '')
                .trim()
            )

          const cardNumber =
            String(row['카드번호'] || '')
              .replace(/[^0-9]/g, '')

          const expiryMonth =
            String(row['유효기간월'] || '')
              .replace(/[^0-9]/g, '')
              .padStart(2, '0')
              .slice(-2)

          const expiryYear =
            String(row['유효기간년'] || '')
              .replace(/[^0-9]/g, '')
              .slice(-2)

          const installment =
            String(row['할부개월'] || '00')
              .replace(/[^0-9]/g, '')
              .padStart(2, '0')
              .slice(-2)

          const productName =
            String(
              row['상품명'] || '정기결제'
            ).trim()

          const phone =
            String(row['연락처'] || '')
              .replace(/[^0-9]/g, '')


          const errors: string[] = []


          if (billingIds.length === 0) {
            errors.push('청구ID 없음')
          }

          if (!memberName) {
            errors.push('회원명 없음')
          }

          if (!amount || amount <= 0) {
            errors.push('결제금액 오류')
          }

          if (
            cardNumber.length < 14 ||
            cardNumber.length > 16
          ) {
            errors.push('카드번호 오류')
          }

          if (
            Number(expiryMonth) < 1 ||
            Number(expiryMonth) > 12
          ) {
            errors.push('유효기간 월 오류')
          }

          if (expiryYear.length !== 2) {
            errors.push('유효기간 년 오류')
          }


          return {
            billingIds,
            memberName,
            billingMonth,
            amount,

            cardNumber,
            expiryMonth,
            expiryYear,

            installment,
            productName,
            phone,

            valid: errors.length === 0,
            errorMessage: errors.join(', ')
          }
        })


      const preview =
        document.querySelector<HTMLElement>(
          '#batch-excel-preview'
        )

      if (!preview) {
        return
      }


      const validCount =
        academyBatchExcelRows.filter(
          (row) => row.valid
        ).length

      const invalidCount =
        academyBatchExcelRows.length -
        validCount

      const totalAmount =
        academyBatchExcelRows
          .filter((row) => row.valid)
          .reduce(
            (sum, row) =>
              sum + row.amount,
            0
          )


      preview.innerHTML = `
        <div class="academy-batch-preview-summary">

          <strong>
            총 ${academyBatchExcelRows.length}건
          </strong>

          <span>
            정상 ${validCount}건
          </span>

          <span>
            오류 ${invalidCount}건
          </span>

          <span>
            결제예정 ${totalAmount.toLocaleString()}원
          </span>

        </div>

        <div class="academy-batch-preview-table-wrap">

          <table class="academy-batch-preview-table">

            <thead>
              <tr>
                <th>No</th>
                <th>회원명</th>
                <th>청구월</th>
                <th>결제금액</th>
                <th>카드번호</th>
                <th>유효기간</th>
                <th>할부</th>
                <th>상품명</th>
                <th>연락처</th>
                <th>상태</th>
              </tr>
            </thead>

            <tbody>

              ${
                academyBatchExcelRows
                  .map((row, index) => {

                    const last4 =
                      row.cardNumber.length >= 4
                        ? row.cardNumber.slice(-4)
                        : ''

                    const maskedCard =
                      last4
                        ? `****-${last4}`
                        : '-'

                    return `
                      <tr>

                        <td>
                          ${index + 1}
                        </td>

                        <td>
                          ${row.memberName || '-'}
                        </td>

                        <td>
                          ${row.billingMonth || '-'}
                        </td>

                        <td>
                          ${row.amount.toLocaleString()}원
                        </td>

                        <td>
                          ${maskedCard}
                        </td>

                        <td>
                          ${
                            row.expiryMonth &&
                            row.expiryYear
                              ? row.expiryMonth +
                                '/' +
                                row.expiryYear
                              : '-'
                          }
                        </td>

                        <td>
                          ${
                            row.installment === '00'
                              ? '일시불'
                              : Number(row.installment) +
                                '개월'
                          }
                        </td>

                        <td>
                          ${row.productName || '-'}
                        </td>

                        <td>
                          ${row.phone || '-'}
                        </td>

                        <td>
                          ${
                            row.valid
                              ? `
                                <span class="academy-batch-valid">
                                  정상
                                </span>
                              `
                              : `
                                <span
  class="academy-batch-invalid"
  title="${row.errorMessage}"
>
  오류 - ${row.errorMessage}
</span>
                              `
                          }
                        </td>

                      </tr>
                    `
                  })
                  .join('')
              }

            </tbody>

          </table>

        </div>
      `

      preview.style.display = 'block'

      preview.insertAdjacentHTML(
        'beforeend',
        `
          <div class="academy-batch-submit-wrap">
            <button
              id="academy-batch-payment-submit"
              type="button"
            >
              💳 일괄 결제 실행
            </button>
          </div>
        `
      )
      
      
      document.querySelector('#academy-batch-payment-submit')
        ?.addEventListener('click', async () => {
      
          const merchantId =
            Number(
              sessionStorage.getItem('login_merchant_id') || 0
            )
      
          if (!merchantId) {
            alert('가맹점 정보를 찾을 수 없습니다.')
            return
          }
      
          const validRows =
            academyBatchExcelRows.filter(
              (row) => row.valid
            )
      
          if (validRows.length === 0) {
            alert('결제 가능한 정상 데이터가 없습니다.')
            return
          }
      
          const invalidCount =
            academyBatchExcelRows.length -
            validRows.length
      
          if (invalidCount > 0) {
            alert(
              '오류 데이터가 ' +
              invalidCount +
              '건 있습니다.\n' +
              '오류건을 수정한 뒤 다시 불러와주세요.'
            )
            return
          }
      
          const totalAmount =
            validRows.reduce(
              (sum, row) =>
                sum + Number(row.amount || 0),
              0
            )
      
          const confirmed =
            confirm(
              '총 ' +
              validRows.length +
              '건을 결제합니다.\n' +
              '총 결제금액: ' +
              totalAmount.toLocaleString() +
              '원\n\n' +
              '결제를 실행하시겠습니까?'
            )
      
          if (!confirmed) {
            return
          }
      
          const submitButton =
            document.querySelector<HTMLButtonElement>(
              '#academy-batch-payment-submit'
            )
      
          if (submitButton) {
            submitButton.disabled = true
            submitButton.textContent =
              '결제 처리 중...'
          }
      
          let successCount = 0
let failCount = 0

const failMessages: string[] = []


      
          try {
      
            for (
              let index = 0;
              index < validRows.length;
              index += 1
            ) {
      
              const row =
                validRows[index]
      
              if (submitButton) {
                submitButton.textContent =
                  '결제 처리 중 ' +
                  (index + 1) +
                  ' / ' +
                  validRows.length
              }
      
              try {
      
                const expiryYymm =
                  row.expiryYear +
                  row.expiryMonth
      
                const response =
                  await fetch(
                    '/api/korpay-manual-pay',
                    {
                      method: 'POST',
      
                      headers: {
                        'Content-Type':
                          'application/json'
                      },
      
                      body: JSON.stringify({
                        merchantId,
                        amount: row.amount,
                        cardNumber: row.cardNumber,
                        expiryYymm,
                        installment: row.installment,
                      
                        buyerName:
                          row.memberName,
                      
                        billingIds:
                          row.billingIds,
                      
                        goodsName:
                          row.productName || '정기결제',
                      
                        customerPhone:
                          row.phone || ''
                      })
                    }
                  )
      
                const data =
                  await response.json()
      
                if (
                  !response.ok ||
                  !data.success
                ) {
      
                  failCount += 1
      
                  failMessages.push(
                    row.memberName +
                    ' : ' +
                    (
                      data.message ||
                      '결제 실패'
                    )
                  )
      
                  continue
                }
      
      
                const { error: billingUpdateError } =
  await supabase
    .from('billings')
    .update({
      payment_status: '완료'
    })
    .in('id', row.billingIds)
    .eq('merchant_id', merchantId)
      
                if (billingUpdateError) {
      
                  failCount += 1
      
                  failMessages.push(
                    row.memberName +
                    ' : 결제 승인 성공 / 청구 완료처리 실패'
                  )
      
                  continue
                }
      
  /* =========================
   아카데미 회원명 연결
   짧게 재시도 후 다음 결제로 진행
========================= */

const paymentTid =
String(data.tid || '').trim()

const paymentOrderId =
String(data.orderId || '').trim()

let paymentId: number | null = null

for (
let retry = 0;
retry < 6;
retry += 1
) {

let foundPayment: any = null

if (paymentTid) {
  const { data: tidPayment } =
    await supabase
      .from('payments')
      .select('id')
      .eq('merchant_id', merchantId)
      .eq('payment_key', paymentTid)
      .maybeSingle()

  foundPayment = tidPayment
}

if (
  !foundPayment &&
  paymentOrderId
) {
  const { data: orderPayment } =
    await supabase
      .from('payments')
      .select('id')
      .eq('merchant_id', merchantId)
      .eq('order_id', paymentOrderId)
      .maybeSingle()

  foundPayment = orderPayment
}

if (foundPayment?.id) {
  paymentId =
    Number(foundPayment.id)

  break
}

await new Promise((resolve) =>
  setTimeout(resolve, 300)
)
}

if (paymentId) {
const { error: paymentMemberError } =
  await supabase
    .from('payments')
    .update({
      sender_name:
        row.memberName,

      message:
        '아카데미 정기결제 / 청구ID ' +
        row.billingIds.join(',')
    })
    .eq('id', paymentId)

if (paymentMemberError) {
  console.error(
    '아카데미 회원명 저장 실패:',
    paymentMemberError
  )
}
}

      
                row.cardNumber = ''
                row.expiryMonth = ''
                row.expiryYear = ''
      
                successCount += 1
      
              } catch (rowError) {
      
                console.error(
                  '다건 수기결제 행 오류:',
                  rowError
                )
      
                failCount += 1
      
                failMessages.push(
                  row.memberName +
                  ' : 결제 요청 오류'
                )
              }
            }
      
            
      
            let resultMessage =
              '일괄결제가 완료되었습니다.\n\n' +
              '성공: ' +
              successCount +
              '건\n' +
              '실패: ' +
              failCount +
              '건'
      
            if (failMessages.length > 0) {
      
              resultMessage +=
                '\n\n[실패내역]\n' +
                failMessages
                  .slice(0, 10)
                  .join('\n')
            }
      
            alert(resultMessage)
      
      
            academyBatchExcelRows.forEach(
              (row) => {
                row.cardNumber = ''
                row.expiryMonth = ''
                row.expiryYear = ''
              }
            )
      
            if (successCount > 0) {
              location.reload()
            }
      
          } finally {
      
            if (submitButton) {
              submitButton.disabled = false
              submitButton.textContent =
                '💳 일괄 결제 실행'
            }
          }
      
        })

    } catch (error) {

      console.error(
        '엑셀 불러오기 실패:',
        error
      )

      alert(
        '엑셀 파일을 읽는 중 오류가 발생했습니다.'
      )
    }

  })

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
  })

document.querySelector('#close-payment-method-modal')
  ?.addEventListener('click', () => {
    const paymentModal =
      document.querySelector<HTMLElement>('#payment-method-modal')

    if (paymentModal) {
      paymentModal.style.display = 'none'
    }
  })

  document.querySelector('#pay-qr-btn')
  ?.addEventListener('click', () => {

    const checkedItems = Array.from(
      document.querySelectorAll<HTMLInputElement>(
        '.batch-billing-check:checked'
      )
    )

    const ids =
      checkedItems.flatMap((item) =>
        String(item.dataset.ids || item.dataset.id || '')
          .split(',')
          .map((id) => Number(id))
          .filter((id) => id > 0)
      )

    

    const selectedBillings =
      (billings || []).filter((billing) =>
        ids.includes(Number(billing.id))
      )

    const totalAmount =
      selectedBillings.reduce(
        (sum, billing) =>
          sum + Number(billing.amount || 0),
        0
      )

    sessionStorage.setItem(
      'academy_qr_billing_ids',
      ids.join(',')
    )

    sessionStorage.setItem(
      'academy_qr_amount',
      String(totalAmount)
    )

    location.href =
      '/merchant-qr'
  })

  document.querySelector('#pay-cash-receipt-btn')
  ?.addEventListener('click', () => {

    const checkedItems =
      Array.from(
        document.querySelectorAll<HTMLInputElement>(
          '.batch-billing-check:checked'
        )
      )

    const ids =
      checkedItems.flatMap((item) =>
        String(
          item.dataset.ids ||
          item.dataset.id ||
          ''
        )
          .split(',')
          .map((id) => Number(id))
          .filter((id) => id > 0)
      )

    

    const selectedBillings =
      (billings || []).filter((billing) =>
        ids.includes(Number(billing.id))
      )

    const totalAmount =
      selectedBillings.reduce(
        (sum, billing) =>
          sum + Number(billing.amount || 0),
        0
      )

    const existingModal =
      document.querySelector(
        '#cash-receipt-modal'
      )

    if (existingModal) {
      existingModal.remove()
    }

    const modal =
      document.createElement('div')

    modal.id =
      'cash-receipt-modal'

    modal.className =
      'cash-receipt-modal'

    modal.innerHTML = `
      <div class="cash-receipt-modal-card">

        <div class="cash-receipt-modal-header">

          <h3>현금영수증 발급</h3>

          <button
            type="button"
            id="cash-receipt-modal-close"
            class="cash-receipt-modal-close"
          >
            ×
          </button>

        </div>

        <div class="cash-receipt-modal-body">

          <label>구분</label>

          <select id="cash-receipt-type">
            <option value="소득공제">
              소득공제
            </option>

            <option value="지출증빙">
              지출증빙
            </option>
          </select>


          <label>결제금액</label>

          <input
  id="cash-receipt-amount"
  type="number"
  min="1"
  value="${totalAmount > 0 ? totalAmount : ''}"
  placeholder="결제금액 입력"
/>


          <label>
            휴대폰번호 / 사업자번호
          </label>

          <input
            id="cash-receipt-number"
            type="text"
            placeholder="숫자만 입력"
          />


          <label>품목명</label>

          <input
            id="cash-receipt-order-name"
            type="text"
            value="아카데미 현금결제"
          />


          <button
            type="button"
            id="cash-receipt-submit"
            class="cash-receipt-submit"
          >
            현금영수증 발급
          </button>

        </div>

      </div>
    `

    document.body.appendChild(modal)

    const paymentMethodModal =
      document.querySelector<HTMLElement>(
        '#payment-method-modal'
      )

    if (paymentMethodModal) {
      paymentMethodModal.style.display =
        'none'
    }


    document
      .querySelector(
        '#cash-receipt-modal-close'
      )
      ?.addEventListener(
        'click',
        () => {
          modal.remove()
        }
      )


    modal.addEventListener(
      'click',
      (event) => {

        if (event.target === modal) {
          modal.remove()
        }

      }
    )


    document
      .querySelector(
        '#cash-receipt-type'
      )
      ?.addEventListener(
        'change',
        () => {

          const typeSelect =
            document.querySelector<HTMLSelectElement>(
              '#cash-receipt-type'
            )

          const numberInput =
            document.querySelector<HTMLInputElement>(
              '#cash-receipt-number'
            )

          if (
            !typeSelect ||
            !numberInput
          ) {
            return
          }

          numberInput.placeholder =
            typeSelect.value ===
            '지출증빙'
              ? '사업자번호 10자리'
              : '휴대폰번호 또는 현금영수증 카드번호'
        }
      )


    document
      .querySelector(
        '#cash-receipt-submit'
      )
      ?.addEventListener(
        'click',
        async () => {

          const type =
            (
              document.querySelector<HTMLSelectElement>(
                '#cash-receipt-type'
              )?.value || ''
            )

          const amount =
            Number(
              document.querySelector<HTMLInputElement>(
                '#cash-receipt-amount'
              )?.value || 0
            )

          const customerIdentityNumber =
            (
              document.querySelector<HTMLInputElement>(
                '#cash-receipt-number'
              )?.value || ''
            ).trim()

          const orderName =
            (
              document.querySelector<HTMLInputElement>(
                '#cash-receipt-order-name'
              )?.value ||
              '아카데미 현금결제'
            )

          if (!customerIdentityNumber) {

            alert(
              type === '지출증빙'
                ? '사업자번호를 입력해주세요.'
                : '휴대폰번호를 입력해주세요.'
            )

            return
          }

          const orderId =
            'CASH-' +
            merchantId +
            '-' +
            Date.now()

          const submitButton =
            document.querySelector<HTMLButtonElement>(
              '#cash-receipt-submit'
            )

          if (submitButton) {
            submitButton.disabled =
              true

            submitButton.textContent =
              '발급 중...'
          }

          try {

            const response =
              await fetch(
                '/api/toss-cash-receipt',
                {
                  method: 'POST',

                  headers: {
                    'Content-Type':
                      'application/json'
                  },

                  body: JSON.stringify({
                    amount,
                    orderId,
                    orderName,
                    type,
                    customerIdentityNumber,
                    taxFreeAmount: 0
                  })
                }
              )

            const result =
              await response.json()

            if (
              !response.ok ||
              !result.success
            ) {

              alert(
                '현금영수증 발급 실패: ' +
                (
                  result.message ||
                  '알 수 없는 오류'
                )
              )

              return
            }


            const {
              error: billingUpdateError
            } =
              await supabase
                .from('billings')
                .update({
                  payment_status:
                    '완료'
                })
                .in(
                  'id',
                  ids
                )

            if (billingUpdateError) {

              alert(
                '현금영수증은 발급됐지만 청구상태 변경에 실패했습니다.\n' +
                billingUpdateError.message
              )

              return
            }


            alert(
              '현금영수증 발급이 완료되었습니다.'
            )

            modal.remove()

            location.reload()

          } catch (error) {

            console.error(error)

            alert(
              '현금영수증 발급 중 오류가 발생했습니다.'
            )

          } finally {

            if (submitButton) {

              submitButton.disabled =
                false

              submitButton.textContent =
                '현금영수증 발급'
            }

          }

        }
      )

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
  <button id="card-go-card">카드결제</button>
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

        <button class="merchant-card-payment-box" id="cash-receipt-payment">
  <strong>현금영수증</strong>
  <span>현금 결제 건의 소득공제 또는 지출증빙 영수증을 발급합니다.</span>
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
          location.href = '/merchant-card-ocr?mode=ocr'
        })
      
      document.querySelector('#manual-card-payment')
        ?.addEventListener('click', () => {
          location.href = '/merchant-card-ocr?mode=manual'
        })
    
      document.querySelector('#menu-card-payment')
        ?.addEventListener('click', () => {
          location.href = '/kiosk?merchant_id=' + merchantId
        })
        document.querySelector('#cash-receipt-payment')
  ?.addEventListener('click', () => {
    
    const existingModal =
      document.querySelector('#cash-receipt-modal')

    if (existingModal) {
      existingModal.remove()
    }

    const modal = document.createElement('div')
    modal.id = 'cash-receipt-modal'
    modal.className = 'cash-receipt-modal'

    modal.innerHTML = `
      <div class="cash-receipt-modal-card">

        <div class="cash-receipt-modal-header">
          <h3>현금영수증 발급</h3>

          <button
            type="button"
            id="cash-receipt-modal-close"
            class="cash-receipt-modal-close"
          >
            ×
          </button>
        </div>

        <div class="cash-receipt-modal-body">

          <label>구분</label>
          <select id="cash-receipt-type">
            <option value="소득공제">소득공제</option>
            <option value="지출증빙">지출증빙</option>
          </select>

          <label>결제금액</label>
          <input
            id="cash-receipt-amount"
            type="number"
            min="1"
            placeholder="금액 입력"
          />

          <label>휴대폰번호 / 사업자번호</label>
          <input
            id="cash-receipt-number"
            type="text"
            placeholder="숫자만 입력"
          />

          <label>품목명</label>
          <input
            id="cash-receipt-order-name"
            type="text"
            value="현금결제"
          />

          <button
            type="button"
            id="cash-receipt-submit"
            class="cash-receipt-submit"
          >
            현금영수증 발급
          </button>

        </div>

      </div>
    `

    document.body.appendChild(modal)

    document.querySelector('#cash-receipt-modal-close')
      ?.addEventListener('click', () => {
        modal.remove()
      })

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.remove()
      }
    })

    document.querySelector('#cash-receipt-type')
      ?.addEventListener('change', () => {
        const typeSelect =
          document.querySelector<HTMLSelectElement>(
            '#cash-receipt-type'
          )

        const numberInput =
          document.querySelector<HTMLInputElement>(
            '#cash-receipt-number'
          )

        if (!typeSelect || !numberInput) return

        numberInput.placeholder =
          typeSelect.value === '지출증빙'
            ? '사업자번호 10자리'
            : '휴대폰번호 또는 현금영수증 카드번호'
      })
  

  document.querySelector('#cash-receipt-submit')
  ?.addEventListener('click', async () => {
    const type =
      (
        document.querySelector(
          '#cash-receipt-type'
        ) as HTMLSelectElement | null
      )?.value || ''

    const amount =
      Number(
        (
          document.querySelector(
            '#cash-receipt-amount'
          ) as HTMLInputElement | null
        )?.value || 0
      )

    const customerIdentityNumber =
      (
        document.querySelector(
          '#cash-receipt-number'
        ) as HTMLInputElement | null
      )?.value || ''

    const orderName =
      (
        document.querySelector(
          '#cash-receipt-order-name'
        ) as HTMLInputElement | null
      )?.value || '현금결제'

    if (amount <= 0) {
      alert('결제금액을 입력해주세요.')
      return
    }

    if (!customerIdentityNumber.trim()) {
      alert(
        type === '지출증빙'
          ? '사업자번호를 입력해주세요.'
          : '휴대폰번호를 입력해주세요.'
      )
      return
    }

    const orderId =
      'CASH-' +
      merchantId +
      '-' +
      Date.now()

    const submitButton =
      document.querySelector<HTMLButtonElement>(
        '#cash-receipt-submit'
      )

    if (submitButton) {
      submitButton.disabled = true
      submitButton.textContent = '발급 중...'
    }

    try {
      const response = await fetch(
        '/api/toss-cash-receipt',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            amount,
            orderId,
            orderName,
            type,
            customerIdentityNumber,
            taxFreeAmount: 0
          })
        }
      )

      const result = await response.json()

      if (!response.ok || !result.success) {
        alert(
          '현금영수증 발급 실패: ' +
          (
            result.message ||
            '알 수 없는 오류'
          )
        )
        return
      }

      alert(
        '현금영수증 발급 요청이 완료되었습니다.'
      )

      document.querySelector('#cash-receipt-modal')?.remove()
    } catch (error) {
      alert(
        '현금영수증 발급 중 오류가 발생했습니다.'
      )
    } finally {
      if (submitButton) {
        submitButton.disabled = false
        submitButton.textContent =
          '현금영수증 발급'
      }
    }
  })
  })
      } else if (path === '/merchant-card-manual') {

        const merchantId =
          Number(sessionStorage.getItem('login_merchant_id') || 0)
      
        if (!merchantId) {
          location.href = '/merchant-login'        
        }
      
        app.innerHTML = `
  <div
    class="merchant-card-ocr-page"
    style="
      width:100%;
      max-width:100%;
      padding:24px 14px 110px;
      box-sizing:border-box;
      overflow-x:hidden;
    "
  >

    <h1
      style="
        margin:0 0 12px;
        font-size:30px;
        line-height:1.2;
      "
    >
      일반 수기결제
    </h1>

    <p
      style="
        margin:0 0 22px;
        font-size:16px;
        color:#555;
      "
    >
      카드정보를 직접 입력해주세요.
    </p>

    <div
      class="payment-card manual-payment-card"
      style="
        display:flex;
        flex-direction:column;
        width:100%;
        max-width:420px;
        min-width:0;
        margin:0 auto;
        padding:18px 14px;
        box-sizing:border-box;
        overflow:hidden;
      "
    >

      <label>결제금액</label>
      <input
        id="manual-payment-amount"
        type="number"
        min="100"
        placeholder="결제금액"
        style="width:100%;box-sizing:border-box;"
      />

      <label>상품명</label>
      <input
        id="manual-product-name"
        type="text"
        placeholder="상품명"
        style="width:100%;box-sizing:border-box;"
      />

      <label>카드번호</label>
      <input
        id="manual-card-number"
        type="text"
        inputmode="numeric"
        maxlength="19"
        placeholder="0000-0000-0000-0000"
        style="width:100%;box-sizing:border-box;"
      />

      <label>유효기간</label>
      <input
        id="manual-expiry"
        type="text"
        inputmode="numeric"
        maxlength="5"
        placeholder="MM/YY"
        style="width:100%;box-sizing:border-box;"
      />

      <label>할부개월</label>
      <select
        id="manual-installment"
        style="width:100%;box-sizing:border-box;"
      >
        <option value="0">일시불</option>
        <option value="2">2개월</option>
        <option value="3">3개월</option>
        <option value="4">4개월</option>
        <option value="5">5개월</option>
        <option value="6">6개월</option>
        <option value="12">12개월</option>
      </select>

      <button id="manual-payment-submit" class="merchant-save-btn">
        결제 요청
      </button>

      <button id="manual-payment-back" class="merchant-close-btn">
        이전
      </button>

    </div>
  </div>
`
      
        document.querySelector('#manual-payment-back')
          ?.addEventListener('click', () => {
            location.href = '/merchant-card-payment'
          })
      
        document.querySelector('#manual-card-number')
          ?.addEventListener('input', (event) => {
            const input = event.target as HTMLInputElement
            const numbers = input.value.replace(/\D/g, '').slice(0, 16)
      
            input.value =
              numbers.match(/.{1,4}/g)?.join('-') || numbers
          })
      
        document.querySelector('#manual-expiry')
          ?.addEventListener('input', (event) => {
            const input = event.target as HTMLInputElement
            const numbers = input.value.replace(/\D/g, '').slice(0, 4)
      
            input.value =
              numbers.length > 2
                ? numbers.slice(0, 2) + '/' + numbers.slice(2)
                : numbers
          })
      
        document.querySelector('#manual-payment-submit')
          ?.addEventListener('click', () => {
            alert('입력 화면 연결 완료. 다음 단계에서 코페이 승인 API를 연결합니다.')
          })
      

      } else if (path === '/merchant-card-ocr') {
        const mode =
  new URLSearchParams(location.search).get('mode') || 'ocr'

        app.innerHTML = `
          <div class="merchant-card-ocr-page">
      
          ${
            mode === 'ocr'
              ? `
                <h1>OCR 카드결제</h1>
                <p>실물카드를 촬영하거나 카드정보를 직접 입력해주세요.</p>
          
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
          
                
              `
              : `
                <h1>일반 수기결제</h1>
                <p>카드정보를 직접 입력해주세요.</p>
              `
          }
          
          <div class="ocr-action-box">
            <button id="ocr-back-btn">
              이전으로
            </button>
          </div>
      
          

          <div class="ocr-payment-form">
  <label>결제금액</label>
  <input
    id="ocr-amount"
    type="number"
    inputmode="numeric"
    placeholder="결제금액"
  />

  <label>카드번호</label>
  <input
    id="ocr-card-number"
    inputmode="numeric"
    maxlength="16"
    placeholder="${
      mode === 'ocr'
        ? '카드 스캔 후 자동 입력됩니다'
        : '카드번호를 직접 입력하세요'
    }"
  />

  <label>유효기간</label>
  <div>
    <input
      id="ocr-exp-month"
      inputmode="numeric"
      maxlength="2"
      placeholder="월"
    />
    <input
      id="ocr-exp-year"
      inputmode="numeric"
      maxlength="2"
      placeholder="년"
    />
  </div>

 


  <label>할부방법</label>
  <select id="ocr-installment">
    <option value="00">일시불</option>
    <option value="02">2개월</option>
    <option value="03">3개월</option>
    <option value="04">4개월</option>
    <option value="05">5개월</option>
    <option value="06">6개월</option>
    <option value="07">7개월</option>
    <option value="08">8개월</option>
    <option value="09">9개월</option>
    <option value="10">10개월</option>
    <option value="11">11개월</option>
    <option value="12">12개월</option>
  </select>

  <label>상품명</label>
  <input
    id="ocr-product-name"
    value="일반 카드결제"
  />

  <label>구매자 연락처</label>
  <input
    id="ocr-customer-phone"
    inputmode="tel"
    placeholder="선택 입력"
  />

  <button id="ocr-payment-submit">결제하기</button>
</div>
</div>
        `
      
        document.querySelector('#ocr-back-btn')
          ?.addEventListener('click', () => {
            location.href = '/merchant-card'
          })

          const savedCardPaymentAmount =
  sessionStorage.getItem('card_payment_amount') || ''

const amountInput =
  document.querySelector<HTMLInputElement>('#ocr-amount')

if (amountInput && savedCardPaymentAmount) {
  amountInput.value = savedCardPaymentAmount
  amountInput.readOnly = true
}

const savedCardPaymentItems =
  sessionStorage.getItem('card_payment_items') || '[]'

const savedItems = JSON.parse(savedCardPaymentItems)

const productNameInput =
  document.querySelector<HTMLInputElement>(
    '#ocr-product-name'
  )

if (
  productNameInput &&
  Array.isArray(savedItems) &&
  savedItems.length > 0
) {
  productNameInput.value =
    savedItems
      .map((item: any) =>
        String(item.name || item.product_name || '상품') +
        ' x ' +
        Number(item.quantity || 1)
      )
      .join(', ')

  productNameInput.readOnly = true
}
      
          document.querySelector('#ocr-card-image')
          ?.addEventListener('change', async (e: any) => {
            const file = e.target.files?.[0]
        
            if (!file) return
        
            const reader = new FileReader()
        
            reader.onload = async (event) => {
              const image =
                document.querySelector<HTMLImageElement>(
                  '#ocr-preview-image'
                )
        
              if (!image) return
        
              image.src = String(event.target?.result)
              image.style.display = 'block'

              await image.decode()
        
              alert('카드 인식 중입니다. 잠시만 기다려주세요.')
        
              try {

                const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

if (!ctx) {
  alert('이미지 처리에 실패했습니다.')
  return
}

canvas.width = image.naturalWidth
canvas.height = image.naturalHeight

ctx.drawImage(image, 0, 0)

const imageData = ctx.getImageData(
  0,
  0,
  canvas.width,
  canvas.height
)

const data = imageData.data

for (let i = 0; i < data.length; i += 4) {
  const gray =
    data[i] * 0.3 +
    data[i + 1] * 0.59 +
    data[i + 2] * 0.11

  const value = gray > 150 ? 255 : 0

  data[i] = value
  data[i + 1] = value
  data[i + 2] = value
}

ctx.putImageData(imageData, 0, 0)

const result = await Tesseract.recognize(
  canvas,
  'eng'
)
        
                const text = result.data.text
                
                console.log('OCR 원문:', text)
                                      
                const normalizedText = text
                  .replace(/[Oo]/g, '0')
                  .replace(/[Il|]/g, '1')
        
                const cardNumberCandidates =
                  normalizedText.match(
                    /(?:\d[\s-]?){13,19}/g
                  ) || []
        
                const cardNumber =
                  cardNumberCandidates
                    .map((value) =>
                      value.replace(/\D/g, '')
                    )
                    .find(
                      (value) =>
                        value.length >= 13 &&
                        value.length <= 19
                    )
        
                const expiryMatch =
                  normalizedText.match(
                    /\b(0[1-9]|1[0-2])[\s\/.-]?(\d{2})\b/
                  )
        
                const cardNumberInput =
                  document.querySelector<HTMLInputElement>(
                    '#ocr-card-number'
                  )
        
                const expMonthInput =
                  document.querySelector<HTMLInputElement>(
                    '#ocr-exp-month'
                  )
        
                const expYearInput =
                  document.querySelector<HTMLInputElement>(
                    '#ocr-exp-year'
                  )
        
                let recognizedCount = 0
        
                if (cardNumber && cardNumberInput) {
                  cardNumberInput.value = cardNumber
                  recognizedCount += 1
                }
        
                if (
                  expiryMatch &&
                  expMonthInput &&
                  expYearInput
                ) {
                  expMonthInput.value = expiryMatch[1]
                  expYearInput.value = expiryMatch[2]
                  recognizedCount += 1
                }
        
                if (recognizedCount === 2) {
                  alert(
                    '카드번호와 유효기간을 인식했습니다.'
                  )
                } else if (recognizedCount === 1) {
                  alert(
                    '일부 정보만 인식했습니다. 나머지는 직접 입력해주세요.'
                  )
                } else {
                  alert(
                    '카드정보를 인식하지 못했습니다. 직접 입력해주세요.'
                  )
                }
              } catch (error) {
                console.error('OCR 인식 오류:', error)
        
                alert(
                  '카드 인식 중 오류가 발생했습니다. 직접 입력해주세요.'
                )
              }
            }
        
            reader.readAsDataURL(file)
          })
        
           
          document.querySelector('#ocr-payment-submit')
          ?.addEventListener('click', async () => {
            const merchantId =
              Number(sessionStorage.getItem('login_merchant_id') || 0)
        
            const amount =
              Number(
                (
                  document.querySelector(
                    '#ocr-amount'
                  ) as HTMLInputElement
                )?.value || 0
              )
        
            const cardNumber =
              (
                document.querySelector(
                  '#ocr-card-number'
                ) as HTMLInputElement
              )?.value || ''
        
            const expMonth =
              (
                document.querySelector(
                  '#ocr-exp-month'
                ) as HTMLInputElement
              )?.value || ''
        
            const expYear =
              (
                document.querySelector(
                  '#ocr-exp-year'
                ) as HTMLInputElement
              )?.value || ''

             
        
            const installment =
              (
                document.querySelector(
                  '#ocr-installment'
                ) as HTMLSelectElement
              )?.value || '00'
        
            const goodsName =
              (
                document.querySelector(
                  '#ocr-product-name'
                ) as HTMLInputElement
              )?.value || '일반 카드결제'
        
            const customerPhone =
              (
                document.querySelector(
                  '#ocr-customer-phone'
                ) as HTMLInputElement
              )?.value || ''
        
            const expiryYymm =
              expYear.trim() + expMonth.trim()
        
            if (!merchantId) {
              alert('가맹점 정보를 찾을 수 없습니다.')
              return
            }
        
            if (!amount || amount <= 0) {
              alert('결제금액을 입력해주세요.')
              return
            }

           
        
            if (!cardNumber.trim()) {
              alert('카드번호를 입력해주세요.')
              return
            }
        
            if (
              expMonth.trim().length !== 2 ||
              expYear.trim().length !== 2
            ) {
              alert('유효기간 월/년을 각각 2자리로 입력해주세요.')
              return
            }
        
            const submitButton =
              document.querySelector<HTMLButtonElement>(
                '#ocr-payment-submit'
              )
        
            if (submitButton) {
              submitButton.disabled = true
              submitButton.textContent = '결제 처리 중...'
            }
        
            try {
              const response = await fetch(
                '/api/korpay-manual-pay',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    merchantId,
                    amount,
                    cardNumber,
                    expiryYymm,
                    installment,
                    goodsName,
                    customerPhone
                  })
                }
              )
        
              const data = await response.json()
        
              if (!response.ok || !data.success) {
                alert(
                  '결제 실패: ' +
                  (data.message || '알 수 없는 오류') +
                  '\n응답코드: ' +
                  (data.resultCode || '-') +
                  '\n사용 MID: ' +
                  (data.usedMid || '-') +
                  '\nMKEY 끝 4자리: ' +
                  (data.usedMkeyLast4 || '-')
                )
                return
              }
        
              const manualOrderNo =
              String(data.orderId || '').trim()
            
            if (!manualOrderNo) {
              alert(
                '결제는 승인됐지만 주문번호를 받지 못했습니다.\n' +
                '승인번호: ' +
                (data.approvalNumber || '-')
              )
              return
            }

            const {
              data: nextManualCallNumber,
              error: manualCallNumberError
            } = await supabase.rpc('get_next_call_number', {
              target_merchant_id: Number(merchantId)
            })
            
            if (manualCallNumberError || !nextManualCallNumber) {
              alert(
                '주문 대기번호 생성에 실패했습니다.\n' +
                (
                  manualCallNumberError?.message ||
                  '번호를 받지 못했습니다.'
                )
              )
              return
            }
            
            const manualCallNumber =
              Number(nextManualCallNumber)

              const rawApprovalNumber =
  String(data.approvalNumber || '').trim()

const approvalNumber =
  /^\d{8}$/.test(rawApprovalNumber)
    ? rawApprovalNumber
    : null

  const { error: orderSaveError } = await supabase
  .from('orders')
  .insert({
    merchant_id: Number(merchantId),

    order_no: String(manualCallNumber),

    call_number: manualCallNumber,
    pg_order_id: manualOrderNo,

    payment_key: data.tid || null,
    approval_number: approvalNumber,

    items: [
      {
        name: goodsName || '수기결제',
        price: Number(amount),
        quantity: 1
      }
    ],

    total_amount: Number(amount),
    order_status: '접수',
    payment_status: '결제완료'
  })

if (orderSaveError) {
  alert(
    '결제는 승인됐지만 주문 저장에 실패했습니다.\n' +
    orderSaveError.message
  )
  return
}

alert(
  '결제가 승인되었습니다.\n' +
  '승인번호: ' +
  (data.approvalNumber || '-')
)

location.href = '/merchant-admin'
            } catch (error) {
              alert(
                '결제 요청 중 오류가 발생했습니다.'
              )
              console.error(error)
            } finally {
              if (submitButton) {
                submitButton.disabled = false
                submitButton.textContent = '결제하기'
              }
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

        } else if (path === '/hotel') {

          const hotelParams =
            new URLSearchParams(window.location.search)
        
          const merchantId =
            Number(hotelParams.get('merchant_id') || 0)
        
          const roomNumber =
            (hotelParams.get('room') || '').trim()

            const browserLanguage =
            (
              navigator.languages?.[0] ||
              navigator.language ||
              'ko'
            ).toLowerCase()
          
          const testLanguage =
            (hotelParams.get('lang') || '').toLowerCase()
          
          const hotelLanguage =
            testLanguage === 'en' ||
            testLanguage === 'ja' ||
            testLanguage === 'zh' ||
            testLanguage === 'ko'
              ? testLanguage
              : browserLanguage.startsWith('ja')
                ? 'ja'
                : browserLanguage.startsWith('zh')
                  ? 'zh'
                  : browserLanguage.startsWith('en')
                    ? 'en'
                    : 'ko'

                    const hotelText = {
                      ko: {
                        hotelNotFound: '호텔 정보를 찾을 수 없습니다.',
                        welcomeTitle: '편안한 시간을 보내고 계신가요?',
                        welcomeMessage:
                          '객실에서 필요한 상품과 서비스를 간편하게 주문하고 결제하실 수 있습니다.',
                        pick: 'PICK',
                        cartEmpty: '상품을 선택해주세요.',
                        totalAmount: '총 결제금액',
                        request: '요청사항',
                        optional: '선택',
                        requestPlaceholder:
                          '예: 수건 2개 더 부탁드립니다. / 문 앞에 놓아주세요.',
                        pay: '결제하기'
                      },
                    
                      en: {
                        hotelNotFound: 'Hotel information could not be found.',
                        welcomeTitle: 'Enjoying your stay?',
                        welcomeMessage:
                          'Order and pay for the items and services you need.',
                        pick: 'PICK',
                        cartEmpty: 'Please select an item.',
                        totalAmount: 'Total',
                        request: 'Request',
                        optional: 'Optional',
                        requestPlaceholder:
                          'e.g. Please bring two extra towels. / Please leave it at the door.',
                        pay: 'Pay Now'
                      },
                    
                      ja: {
                        hotelNotFound: 'ホテル情報が見つかりません。',
                        welcomeTitle: '快適にお過ごしでしょうか？',
                        welcomeMessage:
                          '必要な商品やサービスを簡単に注文・決済できます。',
                        pick: 'PICK',
                        cartEmpty: '商品を選択してください。',
                        totalAmount: 'お支払い金額',
                        request: 'ご要望',
                        optional: '任意',
                        requestPlaceholder:
                          '例：タオルを2枚追加してください。 / ドアの前に置いてください。',
                        pay: 'お支払い'
                      },
                    
                      zh: {
                        hotelNotFound: '找不到酒店信息。',
                        welcomeTitle: '祝您入住愉快',
                        welcomeMessage:
                          '您可以轻松订购并支付所需的商品和服务。',
                        pick: 'PICK',
                        cartEmpty: '请选择商品。',
                        totalAmount: '支付金额',
                        request: '备注',
                        optional: '选填',
                        requestPlaceholder:
                          '例如：请再送两条毛巾。/ 请放在门口。',
                        pay: '立即支付'
                      }
                    }[hotelLanguage]
        
          if (!merchantId) {
            app.innerHTML = `
              <div class="hotel-shop-page">
                <div class="hotel-error-card">
                ${hotelText.hotelNotFound}
                </div>
              </div>
            `
          } else {
        
            const {
              data: hotelMerchant,
              error: hotelMerchantError
            } =
              await supabase
                .from('merchants')
                .select(
                  'id, merchant_name, online_pg_company_1, toss_client_key'
                )
                .eq('id', merchantId)
                .maybeSingle()
        
            const {
              data: hotelProducts,
              error: hotelProductsError
            } =
              await supabase
                .from('products')
                .select('*')
                .eq('merchant_id', merchantId)
                .eq('status', '판매중')
                .order('sort_order', { ascending: true })
                .order('id', { ascending: true })
        
            if (
              hotelMerchantError ||
              hotelProductsError ||
              !hotelMerchant
            ) {
              app.innerHTML = `
                <div class="hotel-shop-page">
                  <div class="hotel-error-card">
                    호텔 정보를 불러오지 못했습니다.
                  </div>
                </div>
              `
            } else {
        
              const groupedHotelProducts =
                (hotelProducts || []).reduce(
                  (groups: any, product: any) => {
        
                    const category =
                      product.category || 'OTHER'
        
                    if (!groups[category]) {
                      groups[category] = []
                    }
        
                    groups[category].push(product)
        
                    return groups
                  },
                  {}
                )
        
              const hotelCategories =
                Object.keys(groupedHotelProducts)
        
              app.innerHTML = `
                <div class="hotel-shop-page">
        
                  <header class="hotel-shop-header">
        
                    <div class="hotel-brand-area">
                      <div class="hotel-brand-small">
                        NXG HOTEL SERVICE
                      </div>
        
                      <h1>
                        ${hotelMerchant.merchant_name || 'HOTEL'}
                      </h1>
        
                      <p>
                        ROOM SERVICE & AMENITIES
                      </p>
                    </div>
        
                    ${
                      roomNumber
                        ? `
                          <div class="hotel-room-badge">
                            <span>ROOM</span>
                            <strong>${roomNumber}</strong>
                          </div>
                        `
                        : ''
                    }
        
                  </header>
        
        
                  <section class="hotel-welcome-area">
        
                    <div class="hotel-welcome-label">
                      PRIVATE ROOM SERVICE
                    </div>
        
                    <h2>
                    ${hotelText.welcomeTitle}
                    </h2>
        
                    <p>
                    ${hotelText.welcomeMessage}
                    </p>
        
                  </section>
        
        
                  ${
                    hotelCategories.length > 0
                      ? `
                        <div class="hotel-category-tabs">
        
                          ${hotelCategories.map(
                            (category, index) => `
                              <button
                                type="button"
                                class="hotel-category-tab ${
                                  index === 0
                                    ? 'active'
                                    : ''
                                }"
                                data-category="${category}"
                              >
                                ${category}
                              </button>
                            `
                          ).join('')}
        
                        </div>
                      `
                      : ''
                  }
        
        
                  <main class="hotel-product-area">
        
                    ${hotelCategories.map(
                      (category, categoryIndex) => `
        
                        <section
                          class="hotel-category-section ${
                            categoryIndex === 0
                              ? ''
                              : 'hotel-category-hidden'
                          }"
                          data-hotel-category="${category}"
                        >
        
                          <div class="hotel-product-grid">
        
                            ${groupedHotelProducts[category]
                              .map(
                                (product: any) => `
        
                                  <article class="hotel-product-card">
        
                                    <div class="hotel-product-image">
        
                                      ${
                                        product.image_url
                                          ? `
                                            <img
                                              src="${product.image_url}"
                                              alt="${product.product_name}"
                                            >
                                          `
                                          : `
                                            <div class="hotel-no-image">
                                              <span>NXG HOTEL</span>
                                            </div>
                                          `
                                      }
        
                                    </div>
        
                                    <div class="hotel-product-info">
        
                                      <div>
                                        <h3>
                                          ${product.product_name}
                                        </h3>
        
                                        <p>
                                          ${Number(
                                            product.price
                                          ).toLocaleString()}원
                                        </p>
                                      </div>
        
                                      <button
                                        type="button"
                                        class="hotel-add-button"
                                        data-id="${product.id}"
                                        data-name="${product.product_name}"
                                        data-price="${product.price}"
                                      >
                                        +
                                      </button>
        
                                    </div>
        
                                  </article>
                                `
                              )
                              .join('')}
        
                          </div>
        
                        </section>
        
                      `
                    ).join('')}
        
                  </main>
        
        
                  <section class="hotel-pick-card">
        
                    <div class="hotel-pick-title">
        
                      <div>
                        <span>YOUR SELECTION</span>
                        <h2>PICK</h2>
                      </div>
        
                      ${
                        roomNumber
                          ? `
                            <div class="hotel-pick-room">
                              ROOM ${roomNumber}
                            </div>
                          `
                          : ''
                      }
        
                    </div>
        
                    <div id="hotel-cart-items">
  <div class="hotel-cart-empty">
    ${hotelText.cartEmpty}
  </div>
</div>
        
                    <div class="hotel-cart-total">
                      <span>${hotelText.totalAmount}</span>
        
                      <strong id="hotel-total-price">
                        0원
                      </strong>
                    </div>

                    <div class="hotel-customer-request">
  <label for="hotel-customer-request">
  ${hotelText.request}
  <span>${hotelText.optional}</span>
</label>

<textarea
  id="hotel-customer-request"
  maxlength="200"
  placeholder="${hotelText.requestPlaceholder}"
></textarea>
</div>
        
                    <button
                      type="button"
                      id="hotel-pay-button"
                      class="hotel-pay-button"
                    >
                    ${hotelText.pay}
                    </button>
        
                  </section>
        
        
                  <footer class="hotel-shop-footer">
        
                    <strong>
                      NXG HOTEL
                    </strong>
        
                    <span>
                      Secure Payment Service
                    </span>
        
                  </footer>
        
                </div>
              `
        
        
              type HotelCartItem = {
                id: number
                name: string
                price: number
                quantity: number
              }
        
              const hotelCart: HotelCartItem[] = []
        
        
              const renderHotelCart = () => {
        
                const cartBox =
                  document.querySelector<HTMLDivElement>(
                    '#hotel-cart-items'
                  )
        
                const totalBox =
                  document.querySelector<HTMLElement>(
                    '#hotel-total-price'
                  )
        
                if (!cartBox || !totalBox) {
                  return
                }
        
                if (hotelCart.length === 0) {
        
                  cartBox.innerHTML = `
                    <div class="hotel-cart-empty">
                      상품을 선택해주세요.
                    </div>
                  `
        
                  totalBox.textContent = '0원'
        
                  return
                }
        
        
                cartBox.innerHTML =
                  hotelCart.map(
                    (item) => `
        
                      <div
                        class="hotel-cart-item"
                        data-id="${item.id}"
                      >
        
                        <div class="hotel-cart-item-name">
        
                          <strong>
                            ${item.name}
                          </strong>
        
                          <span>
                            ${Number(
                              item.price
                            ).toLocaleString()}원
                          </span>
        
                        </div>
        
                        <div class="hotel-cart-control">
        
                          <button
                            type="button"
                            class="hotel-cart-minus"
                            data-id="${item.id}"
                          >
                            −
                          </button>
        
                          <span>
                            ${item.quantity}
                          </span>
        
                          <button
                            type="button"
                            class="hotel-cart-plus"
                            data-id="${item.id}"
                          >
                            +
                          </button>
        
                        </div>
        
                      </div>
                    `
                  ).join('')
        
        
                const totalPrice =
                  hotelCart.reduce(
                    (sum, item) =>
                      sum +
                      item.price *
                      item.quantity,
                    0
                  )
        
                totalBox.textContent =
                  totalPrice.toLocaleString() +
                  '원'
        
        
                document
                  .querySelectorAll<HTMLButtonElement>(
                    '.hotel-cart-plus'
                  )
                  .forEach((button) => {
        
                    button.addEventListener(
                      'click',
                      () => {
        
                        const id =
                          Number(button.dataset.id)
        
                        const item =
                          hotelCart.find(
                            (cartItem) =>
                              cartItem.id === id
                          )
        
                        if (item) {
                          item.quantity += 1
                          renderHotelCart()
                        }
                      }
                    )
                  })
        
        
                document
                  .querySelectorAll<HTMLButtonElement>(
                    '.hotel-cart-minus'
                  )
                  .forEach((button) => {
        
                    button.addEventListener(
                      'click',
                      () => {
        
                        const id =
                          Number(button.dataset.id)
        
                        const item =
                          hotelCart.find(
                            (cartItem) =>
                              cartItem.id === id
                          )
        
                        if (!item) {
                          return
                        }
        
                        item.quantity -= 1
        
                        if (item.quantity <= 0) {
        
                          const index =
                            hotelCart.findIndex(
                              (cartItem) =>
                                cartItem.id === id
                            )
        
                          if (index >= 0) {
                            hotelCart.splice(
                              index,
                              1
                            )
                          }
                        }
        
                        renderHotelCart()
                      }
                    )
                  })
              }
        
        
              document
                .querySelectorAll<HTMLButtonElement>(
                  '.hotel-category-tab'
                )
                .forEach((button) => {
        
                  button.addEventListener(
                    'click',
                    () => {
        
                      const category =
                        button.dataset.category || ''
        
                      document
                        .querySelectorAll(
                          '.hotel-category-tab'
                        )
                        .forEach((tab) => {
                          tab.classList.remove(
                            'active'
                          )
                        })
        
                      button.classList.add(
                        'active'
                      )
        
                      document
                        .querySelectorAll<HTMLElement>(
                          '.hotel-category-section'
                        )
                        .forEach((section) => {
        
                          section.classList.toggle(
                            'hotel-category-hidden',
                            section.dataset
                              .hotelCategory !==
                              category
                          )
                        })
                    }
                  )
                })
        
        
              document
                .querySelectorAll<HTMLButtonElement>(
                  '.hotel-add-button'
                )
                .forEach((button) => {
        
                  button.addEventListener(
                    'click',
                    () => {
        
                      const id =
                        Number(button.dataset.id)
        
                      const name =
                        button.dataset.name || ''
        
                      const price =
                        Number(
                          button.dataset.price || 0
                        )
        
                      const existing =
                        hotelCart.find(
                          (item) =>
                            item.id === id
                        )
        
                      if (existing) {
                        existing.quantity += 1
                      } else {
        
                        hotelCart.push({
                          id,
                          name,
                          price,
                          quantity: 1
                        })
                      }
        
                      renderHotelCart()
                    }
                  )
                })
        
        
              document
                .querySelector<HTMLButtonElement>(
                  '#hotel-pay-button'
                )
                ?.addEventListener(
                  'click',
                  async () => {
        
                    const totalPrice =
                      hotelCart.reduce(
                        (sum, item) =>
                          sum +
                          item.price *
                          item.quantity,
                        0
                      )
        
                    if (
                      hotelCart.length === 0 ||
                      totalPrice <= 0
                    ) {
                      alert(
                        '상품을 먼저 선택해주세요.'
                      )
                      return
                    }
        
        
                    if (
                      hotelMerchant.online_pg_company_1 !==
                      '토스페이먼츠'
                    ) {
                      alert(
                        '온라인결제 1이 토스페이먼츠로 설정되지 않았습니다.'
                      )
                      return
                    }
        
        
                    const tossClientKey =
                      String(
                        hotelMerchant.toss_client_key ||
                        clientKey
                      ).trim()
        
                    if (!tossClientKey) {
                      alert(
                        '토스 Client Key가 등록되지 않았습니다.'
                      )
                      return
                    }
        
        
                    const orderName =
                      hotelCart
                        .map(
                          (item) =>
                            item.name +
                            ' x ' +
                            item.quantity
                        )
                        .join(', ')
        
        
                    sessionStorage.setItem(
                      'merchantId',
                      String(merchantId)
                    )
        
                    sessionStorage.setItem(
                      'merchantName',
                      hotelMerchant.merchant_name ||
                      ''
                    )
        
                    sessionStorage.setItem(
                      'hotel_room_number',
                      roomNumber
                    )
        
                    sessionStorage.setItem(
                      'hotel_items',
                      JSON.stringify(hotelCart)
                    )

                    const hotelCustomerRequest =
  document.querySelector<HTMLTextAreaElement>('#hotel-customer-request')
    ?.value.trim() || ''

sessionStorage.setItem(
  'hotel_customer_request',
  hotelCustomerRequest
)
        
                    sessionStorage.setItem(
                      'message',
                      roomNumber
                        ? '호텔 ' +
                          roomNumber +
                          '호 추가결제 / ' +
                          orderName
                        : '호텔 추가결제 / ' +
                          orderName
                    )
        
                    sessionStorage.setItem(
                      'selected_pg_company',
                      '토스페이먼츠'
                    )
        
                    sessionStorage.removeItem(
                      'senderName'
                    )
        
        
                    const tossPayments =
                      await loadTossPayments(
                        tossClientKey
                      )
        
                    await tossPayments.requestPayment(
                      '카드',
                      {
                        amount: totalPrice,
        
                        orderId:
                          'HOTEL' +
                          merchantId +
                          Date.now(),
        
                        orderName:
                          roomNumber
                            ? 'ROOM ' +
                              roomNumber +
                              ' 추가결제'
                            : '호텔 추가결제',
        
                        customerName:
                          hotelMerchant.merchant_name ||
                          '호텔 고객',
        
                        successUrl:
                          window.location.origin +
                          '/success?source=hotel' +
                          '&pg=토스페이먼츠' +
                          '&merchantId=' +
                          merchantId +
                          '&merchantName=' +
                          encodeURIComponent(
                            hotelMerchant.merchant_name ||
                            ''
                          ),
        
                        failUrl:
                          window.location.origin +
                          '/fail'
                      }
                    )
                  }
                )
            }
          }
          
    } else if (path === '/kiosk') {
      const params = new URLSearchParams(window.location.search)
      const merchantId = Number(params.get('merchant_id') || 1)

      const { data: kioskMerchant } = await supabase
  .from('merchants')
  .select('merchant_type')
  .eq('id', merchantId)
  .maybeSingle()

const isBeautyKiosk =
  kioskMerchant?.merchant_type === '뷰티'

let beautyKioskStaff: any[] = []
let beautyKioskStaffServices: any[] = []

if (isBeautyKiosk) {
  const { data: staffData, error: staffError } =
    await supabase
      .from('beauty_staff')
      .select('id, staff_name, position, photo_url')
      .eq('merchant_id', merchantId)
      .eq('status', '근무중')
      .order('id', { ascending: true })

  if (staffError) {
    alert('직원 목록 조회 실패: ' + staffError.message)
  } else {
    beautyKioskStaff = staffData || []
  }

  const { data: connectionData, error: connectionError } =
    await supabase
      .from('beauty_staff_services')
      .select('staff_id, service_id')
      .eq('merchant_id', merchantId)

  if (connectionError) {
    alert(
      '직원 서비스 조회 실패: ' +
      connectionError.message
    )
  } else {
    beautyKioskStaffServices =
      connectionData || []
  }
}

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
              <h1
  id="kiosk-main-home-title"
  style="cursor:pointer;"
>
  키오스 PICK
</h1>
              <div class="cart-badge">
                PICK <span id="cart-count">0</span>
              </div>
            </div>          

            ${
              isBeautyKiosk
                ? `
                  <div
  class="beauty-kiosk-staff-list"
  style="
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    gap:14px;
    margin:12px 0 16px;
  "
>
                    ${beautyKioskStaff.map((staff, index) => `
                      <button
  class="beauty-kiosk-staff-button ${index === 0 ? 'active' : ''}"
  data-staff-id="${staff.id}"
  style="
    width:150px;
    min-height:105px;
    padding:14px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:7px;
    border-radius:16px;
  "
>
                        ${
                          staff.photo_url
                            ? `
                              <img
                                src="${staff.photo_url}"
                                alt="${staff.staff_name || ''}"
                                style="
                                  width:76px;
                                  height:76px;
                                  border-radius:50%;
                                  object-fit:cover;
                                "
                              />
                            `
                            : ''
                        }
            
                        <strong>${staff.staff_name || '-'}</strong>
            
                        ${
                          staff.position
                            ? `<span>${staff.position}</span>`
                            : ''
                        }
                      </button>
                    `).join('')}
                  </div>
                `
                : ''
            }

            ${
              isBeautyKiosk
                ? ''
                : `
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
                `
            }

             <div
  class="kiosk-category-list"
  style="${
    isBeautyKiosk
      ? 'display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,240px));gap:14px;justify-content:center;'
      : ''
  }"
>
  ${Object.keys(groupedProducts).map((category) => `
    <section
      class="kiosk-category-section ${
        isBeautyKiosk
          ? ''
          : (
              Object.keys(groupedProducts)[0] === category
                ? ''
                : 'hidden-category'
            )
      }"
      data-category-section="${category}"
      style="${isBeautyKiosk ? 'display:contents;' : ''}"
    >
      ${
        isBeautyKiosk
          ? ''
          : `<h2 class="kiosk-category-title">${category}</h2>`
      }

      <div
        class="kiosk-products"
        style="${isBeautyKiosk ? 'display:contents;' : ''}"
      >
        ${groupedProducts[category].map((product: any) => `
          <div
            class="kiosk-product-card"
            data-product-id="${product.id}"
            style="${
              isBeautyKiosk
                ? 'min-height:0;height:auto;overflow:hidden;'
                : ''
            }"
          >
            ${
              product.image_url
                ? `
                  <img
                    src="${product.image_url}"
                    alt="${product.product_name}"
                    style="${
                      isBeautyKiosk
                        ? 'width:100%;height:175px;object-fit:cover;display:block;'
                        : ''
                    }"
                  >
                `
                : (
                  isBeautyKiosk
                    ? ''
                    : '<div class="no-image">이미지 없음</div>'
                )
            }

            <div
              class="kiosk-product-info"
              style="${
                isBeautyKiosk
                  ? 'display:flex;align-items:center;justify-content:space-between;gap:8px;padding:12px 12px 6px;'
                  : ''
              }"
            >
              <h3
                style="${
                  isBeautyKiosk
                    ? 'margin:0;font-size:17px;line-height:1.2;'
                    : ''
                }"
              >
                ${product.product_name}
              </h3>

              <p
                style="${
                  isBeautyKiosk
                    ? 'margin:0;font-size:14px;font-weight:700;white-space:nowrap;'
                    : ''
                }"
              >
                ${Number(product.price).toLocaleString()}원
              </p>
            </div>

            <button 
              class="add-cart-button"
              data-id="${product.id}"
              data-name="${product.product_name}"
              data-price="${product.price}"
              style="${
                isBeautyKiosk
                  ? 'width:calc(100% - 20px);height:38px;margin:8px 10px 10px;'
                  : ''
              }"
            >
              담기
            </button>
          </div>
        `).join('')}
      </div>
    </section>
  `).join('')}
</div>
${
  isBeautyKiosk
    ? `
      
    `
    : ''
}
            <div
  class="kiosk-cart"
  style="${
    isBeautyKiosk
      ? 'max-width:760px;margin:16px auto 110px;padding:20px 24px;min-height:0;'
      : ''
  }"
>
${
  isBeautyKiosk
    ? `
      <div style="
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:12px;
        margin:0 0 14px;
      ">
        <h2 style="margin:0;font-size:24px;">PICK</h2>

        <div style="
          display:flex;
          align-items:center;
          gap:6px;
        ">
          <strong style="
            font-size:14px;
            white-space:nowrap;
          ">예약자</strong>

          <input
            id="beauty-customer-name"
            type="text"
            placeholder="이름"
            style="
              width:120px;
              height:32px;
              border:1px solid #d1d5db;
              border-radius:8px;
              padding:0 8px;
              box-sizing:border-box;
            "
          />

          <input
            id="beauty-customer-phone"
            type="tel"
            placeholder="연락처"
            style="
              width:150px;
              height:32px;
              border:1px solid #d1d5db;
              border-radius:8px;
              padding:0 8px;
              box-sizing:border-box;
            "
          />
        </div>
      </div>
    `
    : '<h2>PICK</h2>'
}
              <div id="cart-items">
              ${
                isBeautyKiosk
                  ? ''
                  : '<p class="empty-cart">상품을 선택해주세요.</p>'
              }
              </div>

              <div class="cart-total">
                <span>총 결제금액</span>
                <strong id="cart-total-price">0원</strong>
              </div>

              </div>

              <div class="kiosk-company-info">

  <div><strong>주식회사 엔엑스지소프트</strong></div>

  <div>
    대표 : 유상균
  </div>

  <div>
    사업자등록번호 : 245-81-01732 |
    통신판매업신고번호 : 2024-서울금천-2499
  </div>

  <div>
    서울특별시 금천구 가산디지털2로 34, 211-4N호
  </div>

  <div>
  대표 번호 : 02-431-1252 |
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

  <div class="kiosk-payment-buttons">

  <button
    class="kiosk-toss-pay-button"
    id="kiosk-toss-pay-button">
    모바일 결제
  </button>

  

  <button
    class="kiosk-card-pay-button"
    id="kiosk-card-pay-button">
    수기 결제
  </button>

</div>
</div>
            </div>
                 </div>
                 </div>
        `
        document.querySelector('#kiosk-main-home-title')
  ?.addEventListener('click', () => {
    location.href = '/merchant-admin'
  })

        const beautyReservationTimes: string[] = [
          '09:00',
          '09:30',
          '10:00',
          '10:30',
          '11:00',
          '11:30',
          '12:00',
          '12:30',
          '13:00',
          '13:30',
          '14:00',
          '14:30',
          '15:00',
          '15:30',
          '16:00',
          '16:30',
          '17:00',
          '17:30',
          '18:00',
          '18:30'
        ]
        
        function updateBeautyReservationTimes(
          reservedOrders: any[]
        ) {
          const timeSelect =
            document.querySelector<HTMLSelectElement>(
              '#beauty-reservation-time'
            )
        
          if (!timeSelect) return
        
          timeSelect.innerHTML =
            '<option value="">시간 선택</option>'
        
          beautyReservationTimes.forEach((time) => {
            const option =
              document.createElement('option')
        
            option.value = time
        
            option.textContent =
              reservedOrders.some(
                (row) =>
                  row.reservation_time === time
              )
                ? time + ' (예약완료)'
                : time
        
            option.disabled =
              reservedOrders.some(
                (row) =>
                  row.reservation_time === time
              )
        
            timeSelect.appendChild(option)
          })
        }

        if (isBeautyKiosk && beautyKioskStaff.length > 0) {
          const filterBeautyProductsByStaff = (
            staffId: number
          ) => {
            const allowedServiceIds =
              beautyKioskStaffServices
                .filter(
                  (row) =>
                    Number(row.staff_id) === staffId
                )
                .map(
                  (row) =>
                    Number(row.service_id)
                )
        
            document
              .querySelectorAll<HTMLElement>(
                '.kiosk-product-card'
              )
              .forEach((card) => {
                const productId =
                  Number(
                    card.getAttribute(
                      'data-product-id'
                    )
                  )
        
                card.style.display =
                  allowedServiceIds.includes(productId)
                    ? ''
                    : 'none'
              })

              
          }
        
          document
            .querySelectorAll<HTMLElement>(
              '.beauty-kiosk-staff-button'
            )
            .forEach((button) => {
              button.addEventListener('click', () => {
                document
                  .querySelectorAll(
                    '.beauty-kiosk-staff-button'
                  )
                  .forEach((item) =>
                    item.classList.remove('active')
                  )

                  selectedBeautyStaffId =
  Number(
    button.getAttribute('data-staff-id')
  )
        
                button.classList.add('active')
        
                filterBeautyProductsByStaff(
                  Number(
                    button.getAttribute(
                      'data-staff-id'
                    )
                  )
                )
              })
            })
        
          filterBeautyProductsByStaff(
            Number(beautyKioskStaff[0].id)
          )
          const timeSelect =
  document.querySelector<HTMLSelectElement>(
    '#beauty-reservation-time'
  )

if (timeSelect) {
  beautyReservationTimes.forEach((time) => {
    const option = document.createElement('option')

    option.value = time
    option.textContent = time

    timeSelect.appendChild(option)
  })
}
        }

        const reservationDateInput =
  document.querySelector<HTMLInputElement>(
    '#beauty-reservation-date'
  )

reservationDateInput?.addEventListener(
  'change',
  async () => {
    if (!selectedBeautyStaffId) return

    const reservationDate =
      reservationDateInput.value

    if (!reservationDate) return

    const { data: reservedOrders } =
      await supabase
        .from('orders')
        .select('reservation_time')
        .eq(
          'beauty_staff_id',
          selectedBeautyStaffId
        )
        .eq(
          'reservation_date',
          reservationDate
        )

    updateBeautyReservationTimes(
      reservedOrders || []
    )
  }
)

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
    cart_key: string
    id: number
    name: string
    price: number
    quantity: number
    beauty_staff_id?: number
beauty_staff_name?: string
reservation_date?: string
reservation_time?: string
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
            cartItems.innerHTML = isBeautyKiosk
  ? ''
  : '<p class="empty-cart">상품을 선택해주세요.</p>'
            return
          }

          cartItems.innerHTML = cart.map((item) => `
            <div class="cart-item">
              <div>
                <strong>
  ${item.name}
  ${
    isBeautyKiosk
      ? ' / ' + (item.beauty_staff_name || '-')
      : ''
  }
</strong>

                ${
                  isBeautyKiosk
                    ? `
                      <div style="
                        display:flex;
                        align-items:center;
                        gap:4px;
                        margin:4px 0 0 0;
                      ">
                        <input
                          type="date"
                          class="beauty-cart-date-input"
                          data-key="${item.cart_key}"
                          value="${item.reservation_date || ''}"
                          style="
                            width:140px;
                            height:32px;
                            border:1px solid #d1d5db;
                            border-radius:8px;
                            padding:0 6px;
                            box-sizing:border-box;
                          "
                        />
                
                        <select
                          class="beauty-cart-time-select"
                          data-key="${item.cart_key}"
                          style="
                            width:130px;
                            height:32px;
                            border:1px solid #d1d5db;
                            border-radius:8px;
                            padding:0 6px;
                            box-sizing:border-box;
                          "
                        >
                          <option value="">예약시간 선택</option>
                          ${beautyReservationTimes.map((time) => `
                            <option
                              value="${time}"
                              ${item.reservation_time === time ? 'selected' : ''}
                            >
                              ${time}
                            </option>
                          `).join('')}
                        </select>
                      </div>
                    `
                    : ''
                }

                <p>${item.price.toLocaleString()}원 x ${item.quantity}</p>
              </div>
              <div class="cart-item-buttons">
                <button class="cart-minus" data-key="${item.cart_key}">-</button>
<span>${item.quantity}</span>
<button class="cart-plus" data-key="${item.cart_key}">+</button>
              </div>
            </div>
          `).join('')

          document.querySelectorAll<HTMLButtonElement>('.cart-plus').forEach((button) => {
            button.addEventListener('click', () => {
              const key = button.dataset.key || ''
const item = cart.find(
  (cartItem) => cartItem.cart_key === key
)
              if (item) {
                item.quantity += 1
                renderCart()
              }
            })
          })

          document
  .querySelectorAll<HTMLInputElement>(
    '.beauty-cart-date-input'
  )
  .forEach((input) => {
    input.addEventListener('change', () => {
      const key = input.dataset.key || ''

      const item = cart.find(
        (cartItem) => cartItem.cart_key === key
      )

      if (item) {
        item.reservation_date = input.value
      }
    })
  })

          document
  .querySelectorAll<HTMLSelectElement>(
    '.beauty-cart-time-select'
  )
  .forEach((select) => {
    select.addEventListener('change', () => {
      const key = select.dataset.key || ''

      const item = cart.find(
        (cartItem) => cartItem.cart_key === key
      )

      if (item) {
        item.reservation_time = select.value
      }
    })
  })

          document.querySelectorAll<HTMLButtonElement>('.cart-minus').forEach((button) => {
            button.addEventListener('click', () => {
              const key = button.dataset.key || ''
const item = cart.find(
  (cartItem) => cartItem.cart_key === key
)

              if (item) {
                item.quantity -= 1

                if (item.quantity <= 0) {
                  const index = cart.findIndex(
                    (cartItem) => cartItem.cart_key === key
                  )
                  cart.splice(index, 1)
                }

                renderCart()
              }
            })
          })
        }

        

        let selectedBeautyStaffId =
  isBeautyKiosk && beautyKioskStaff.length > 0
    ? Number(beautyKioskStaff[0].id)
    : 0

        document.querySelectorAll<HTMLButtonElement>('.add-cart-button').forEach((button) => {
          button.addEventListener('click', () => {
            const id = Number(button.dataset.id)
            const name = button.dataset.name || ''
            const price = Number(button.dataset.price)

            const beautyStaffIdForCart =
  isBeautyKiosk
    ? selectedBeautyStaffId
    : 0

const cartKey =
  isBeautyKiosk
    ? String(id) + '-' + String(beautyStaffIdForCart)
    : String(id)

const existingItem = cart.find(
  (item) => item.cart_key === cartKey
)

            if (existingItem) {
              existingItem.quantity += 1
            } else {
              cart.push({
                cart_key: cartKey,
                id,
                name,
                price,
                quantity: 1,
              
                beauty_staff_id:
  isBeautyKiosk
    ? selectedBeautyStaffId
    : undefined,

beauty_staff_name:
  isBeautyKiosk
    ? (
        beautyKioskStaff.find(
          (staff) =>
            Number(staff.id) === Number(selectedBeautyStaffId)
        )?.staff_name || ''
      )
      : undefined,

      reservation_date: '',
      reservation_time: ''
              })
            }

            renderCart()
          })
        })

        document.querySelector<HTMLButtonElement>('#kiosk-toss-pay-button')
  ?.addEventListener('click', async () => {

    

    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    if (cart.length === 0 || totalPrice <= 0) {
      alert('상품을 먼저 선택해주세요.')
      return
    }

    const { data: tossMerchant, error: tossMerchantError } =
      await supabase
        .from('merchants')
        .select(
          'merchant_name, online_pg_company_1, toss_client_key'
        )
        .eq('id', Number(merchantId))
        .single()

    if (tossMerchantError || !tossMerchant) {
      alert('가맹점 토스 결제정보를 불러오지 못했습니다.')
      return
    }

    if (tossMerchant.online_pg_company_1 !== '토스페이먼츠') {
      alert('온라인결제 1이 토스페이먼츠로 설정되지 않았습니다.')
      return
    }

    const tossClientKey =
      String(tossMerchant.toss_client_key || clientKey).trim()

    if (!tossClientKey) {
      alert('토스 Client Key가 등록되지 않았습니다.')
      return
    }

    const { data: nextCallNumber, error: callNumberError } =
  await supabase.rpc('get_next_call_number', {
    target_merchant_id: Number(merchantId)
  })

if (callNumberError || !nextCallNumber) {
  alert(
    '주문 대기번호 생성에 실패했습니다.\n' +
    (callNumberError?.message || '번호를 받지 못했습니다.')
  )
  return
}

const callNumber = Number(nextCallNumber)

const orderNo =
  'TOSS-' + callNumber + '-' + Date.now()

    sessionStorage.setItem(
      'kiosk_call_number',
      String(callNumber)
    )

    sessionStorage.setItem(
      'kiosk_order_no',
      orderNo
    )

    sessionStorage.setItem(
      'kiosk_merchant_id',
      String(merchantId)
    )

    const beautyReservationDate =
    cart.find((item) => item.reservation_date)
      ?.reservation_date || ''

      if (
        isBeautyKiosk &&
        cart.some(
          (item) =>
            !item.reservation_date ||
            !item.reservation_time
        )
      ) {
        alert('PICK 항목별 예약날짜와 예약시간을 모두 선택해주세요.')
        return
      }

      const beautyCustomerName =
  document
    .querySelector<HTMLInputElement>(
      '#beauty-customer-name'
    )
    ?.value.trim() || ''

const beautyCustomerPhone =
  document
    .querySelector<HTMLInputElement>(
      '#beauty-customer-phone'
    )
    ?.value.trim() || ''

if (
  isBeautyKiosk &&
  (!beautyCustomerName || !beautyCustomerPhone)
) {
  alert('예약자 이름과 연락처를 입력해주세요.')
  return
}

  const kioskOrderItems =
  isBeautyKiosk
    ? cart.map((item) => ({
        ...item,
        reservation_date: item.reservation_date || '',
        reservation_time: item.reservation_time || ''
      }))
    : cart

sessionStorage.setItem(
  'kiosk_items',
  JSON.stringify(kioskOrderItems)
)

sessionStorage.setItem(
  'beauty_customer_name',
  beautyCustomerName
)

sessionStorage.setItem(
  'beauty_customer_phone',
  beautyCustomerPhone
)

sessionStorage.setItem(
  'beauty_reservation_date',
  beautyReservationDate
)

sessionStorage.setItem(
  'beauty_reservation_time',
  ''
)

    if (isBeautyKiosk) {
      sessionStorage.setItem(
        'beauty_staff_id',
        String(selectedBeautyStaffId)
      )
    }

    sessionStorage.setItem(
      'beauty_reservation_date',
      (
        document.querySelector<HTMLInputElement>(
          '#beauty-reservation-date'
        )?.value || ''
      )
    )
    
    sessionStorage.setItem(
      'beauty_reservation_time',
      (
        document.querySelector<HTMLSelectElement>(
          '#beauty-reservation-time'
        )?.value || ''
      )
    )

    sessionStorage.setItem(
      'kiosk_total_amount',
      String(totalPrice)
    )

    sessionStorage.setItem(
      'merchantId',
      String(merchantId)
    )

    sessionStorage.setItem(
      'merchantName',
      tossMerchant.merchant_name || ''
    )

    sessionStorage.setItem(
      'message',
      '키오스 PICK 주문'
    )

    sessionStorage.setItem(
      'selected_pg_company',
      '토스페이먼츠'
    )

    const tossPayments =
      await loadTossPayments(tossClientKey)

    await tossPayments.requestPayment('카드', {
      amount: totalPrice,

      orderId:
        orderNo.replace(/[^a-zA-Z0-9]/g, ''),

      orderName: '키오스 PICK 주문',

      customerName:
        tossMerchant.merchant_name || '키오스 고객',

      successUrl:
        window.location.origin +
        '/success?source=kiosk' +
        '&pg=토스페이먼츠' +
        '&merchantId=' +
        merchantId +
        '&merchantName=' +
        encodeURIComponent(
          tossMerchant.merchant_name || ''
        ),

      failUrl:
        window.location.origin + '/fail'
    })
  })

        

document.querySelector('#kiosk-card-pay-button')
  ?.addEventListener('click', () => {
    

    const params =
      new URLSearchParams(window.location.search)

    const merchantId =
      params.get('merchant_id') || ''

    if (!merchantId) {
      alert('가맹점 정보를 찾을 수 없습니다.')
      return
    }

    sessionStorage.setItem(
      'card_payment_merchant_id',
      merchantId
    )

    const beautyReservationDate =
  cart.find((item) => item.reservation_date)
    ?.reservation_date || ''

    if (
      isBeautyKiosk &&
      cart.some(
        (item) =>
          !item.reservation_date ||
          !item.reservation_time
      )
    ) {
      alert('PICK 항목별 예약날짜와 예약시간을 모두 선택해주세요.')
      return
    }

    const beautyCustomerName =
  document
    .querySelector<HTMLInputElement>(
      '#beauty-customer-name'
    )
    ?.value.trim() || ''

const beautyCustomerPhone =
  document
    .querySelector<HTMLInputElement>(
      '#beauty-customer-phone'
    )
    ?.value.trim() || ''

if (
  isBeautyKiosk &&
  (!beautyCustomerName || !beautyCustomerPhone)
) {
  alert('예약자 이름과 연락처를 입력해주세요.')
  return
}

    const cardOrderItems =
    isBeautyKiosk
      ? cart.map((item) => ({
          ...item,
          reservation_date: item.reservation_date || '',
          reservation_time: item.reservation_time || ''
        }))
      : cart

sessionStorage.setItem(
  'card_payment_items',
  JSON.stringify(cardOrderItems)
)

sessionStorage.setItem(
  'beauty_customer_name',
  beautyCustomerName
)

sessionStorage.setItem(
  'beauty_customer_phone',
  beautyCustomerPhone
)

sessionStorage.setItem(
  'beauty_reservation_date',
  beautyReservationDate
)

sessionStorage.setItem(
  'beauty_reservation_time',
  ''
)
    
    sessionStorage.setItem(
      'card_payment_amount',
      String(
        cart.reduce(
          (sum, item) =>
            sum + item.price * item.quantity,
          0
        )
      )
    )

    if (isBeautyKiosk) {
      sessionStorage.setItem(
        'beauty_staff_id',
        String(selectedBeautyStaffId)
      )
    }
    
   

    location.href =
  '/merchant-card-ocr?mode=ocr&merchant_id=' +
  encodeURIComponent(merchantId)
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
            beauty_staff_id:
  sessionStorage.getItem('beauty_staff_id')
    ? Number(sessionStorage.getItem('beauty_staff_id'))
    : null,

reservation_date:
  sessionStorage.getItem(
    'beauty_reservation_date'
  ) || null,

reservation_time:
  sessionStorage.getItem(
    'beauty_reservation_time'
  ) || null,

  customer_name:
  sessionStorage.getItem(
    'beauty_customer_name'
  ) || null,

customer_phone:
  sessionStorage.getItem(
    'beauty_customer_phone'
  ) || null,

total_amount: Number(totalAmount),
            order_status: '접수',
            payment_status: '결제완료',
          })
  
          const { data: merchantData } = await supabase
  .from('merchants')
  .select(
    'merchant_name, fee_rate, settlement_cycle, branch_admin_id, agency_admin_id, manager_admin_id'
  )
  .eq('id', Number(merchantId))
  .maybeSingle()

  const kioskAmount = Number(totalAmount)
  const kioskFeeRate = Number(merchantData?.fee_rate || 0)
  const kioskFeeAmount = Math.floor(kioskAmount * kioskFeeRate / 100)
  const kioskSettlementAmount = kioskAmount - kioskFeeAmount
  
  const managerAdminId = merchantData?.manager_admin_id
let managerAdminName = ''
let managerFeeRate = 0

let agencyAdminId: number | null =
  merchantData?.agency_admin_id
    ? Number(merchantData.agency_admin_id)
    : null

let agencyAdminName = ''
let agencyFeeRate = 0

let branchAdminId: number | null =
  merchantData?.branch_admin_id
    ? Number(merchantData.branch_admin_id)
    : null

let branchAdminName = ''
let branchFeeRate = 0

const settlementCycle =
  String(merchantData?.settlement_cycle || '4일')

const getCommissionRate = (adminUser: any) => {
  if (!adminUser) return 0

  if (settlementCycle === '1일') {
    return Number(adminUser.commission_rate_1day || 0)
  }

  if (settlementCycle === '3일') {
    return Number(adminUser.commission_rate_3day || 0)
  }

  if (settlementCycle === '7일') {
    return Number(adminUser.commission_rate_7day || 0)
  }

  return Number(adminUser.commission_rate_4day || 0)
}

if (managerAdminId) {
  const { data: managerData } = await supabase
    .from('admin_users')
    .select(
      'id, admin_name, parent_admin_id, commission_rate_1day, commission_rate_3day, commission_rate_4day, commission_rate_7day'
    )
    .eq('id', Number(managerAdminId))
    .maybeSingle()

  if (managerData) {
    managerAdminName =
      managerData.admin_name || ''

    managerFeeRate =
      getCommissionRate(managerData)

    if (!agencyAdminId && managerData.parent_admin_id) {
      agencyAdminId =
        Number(managerData.parent_admin_id)
    }
  }
}

if (agencyAdminId) {
  const { data: agencyData } = await supabase
    .from('admin_users')
    .select(
      'id, admin_name, parent_admin_id, commission_rate_1day, commission_rate_3day, commission_rate_4day, commission_rate_7day'
    )
    .eq('id', agencyAdminId)
    .maybeSingle()

  if (agencyData) {
    agencyAdminName =
      agencyData.admin_name || ''

    agencyFeeRate =
      getCommissionRate(agencyData)

    if (!branchAdminId && agencyData.parent_admin_id) {
      branchAdminId =
        Number(agencyData.parent_admin_id)
    }
  }
}

if (branchAdminId) {
  const { data: branchData } = await supabase
    .from('admin_users')
    .select(
      'id, admin_name, commission_rate_1day, commission_rate_3day, commission_rate_4day, commission_rate_7day'
    )
    .eq('id', branchAdminId)
    .maybeSingle()

  if (branchData) {
    branchAdminName =
      branchData.admin_name || ''

    branchFeeRate =
      getCommissionRate(branchData)
  }
}

if (managerAdminId) {
  const { data: managerData } = await supabase
    .from('admin_users')
    .select('id, admin_name, commission_rate, parent_admin_id')
    .eq('id', Number(managerAdminId))
    .maybeSingle()

  if (managerData) {
    managerAdminName = managerData.admin_name || ''
    managerFeeRate = Number(managerData.commission_rate || 0)

    agencyAdminId = managerData.parent_admin_id
      ? Number(managerData.parent_admin_id)
      : null
  }
}

if (agencyAdminId) {
  const { data: agencyData } = await supabase
    .from('admin_users')
    .select('id, admin_name, commission_rate, parent_admin_id')
    .eq('id', agencyAdminId)
    .maybeSingle()

  if (agencyData) {
    agencyAdminName = agencyData.admin_name || ''
    agencyFeeRate = Number(agencyData.commission_rate || 0)

    branchAdminId = agencyData.parent_admin_id
      ? Number(agencyData.parent_admin_id)
      : null
  }
}

if (branchAdminId) {
  const { data: branchData } = await supabase
    .from('admin_users')
    .select('id, admin_name, commission_rate')
    .eq('id', branchAdminId)
    .maybeSingle()

  if (branchData) {
    branchAdminName = branchData.admin_name || ''
    branchFeeRate = Number(branchData.commission_rate || 0)
  }
}
  
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

      beauty_staff_id:
      sessionStorage.getItem('beauty_staff_id')
        ? Number(sessionStorage.getItem('beauty_staff_id'))
        : null,
    
    reservation_date:
      sessionStorage.getItem(
        'beauty_reservation_date'
      ) || null,
    
    reservation_time:
      sessionStorage.getItem(
        'beauty_reservation_time'
      ) || null,
    
    manager_admin_id: managerAdminId,
manager_admin_name: managerAdminName,
manager_fee_rate: managerFeeRate,

agency_admin_id: agencyAdminId,
agency_admin_name: agencyAdminName,
agency_fee_rate: agencyFeeRate,

branch_admin_id: branchAdminId,
branch_admin_name: branchAdminName,
branch_fee_rate: branchFeeRate,
  
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
          sessionStorage.removeItem('beauty_customer_name')
          sessionStorage.removeItem('beauty_customer_phone')
  
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

    } else if (path === '/kiosk-card-success') {
      const merchantId =
        sessionStorage.getItem('card_payment_merchant_id')
    
      const itemsText =
        sessionStorage.getItem('card_payment_items')
    
      const totalAmount =
        sessionStorage.getItem('card_payment_amount')
    
      const items = itemsText
        ? JSON.parse(itemsText)
        : []
    
        const {
          data: nextCallNumber,
          error: callNumberError
        } = await supabase.rpc('get_next_call_number', {
          target_merchant_id: Number(merchantId)
        })
        
        if (callNumberError || !nextCallNumber) {
          app.innerHTML = `
            <div class="page">
              <div class="payment-card">
                <h1>주문번호 생성에 실패했습니다.</h1>
              </div>
            </div>
          `
        } else {
          const callNumber = Number(nextCallNumber)
        
          const orderNo =
            'CARD-' + callNumber + '-' + Date.now()
        
          if (!merchantId || !totalAmount) {
            app.innerHTML = `
              <div class="page">
                <div class="payment-card">
                  <h1>주문 정보가 없습니다.</h1>
                </div>
              </div>
            `
          } else {
            const { error } = await supabase
              .from('orders')
              .insert({
                merchant_id: Number(merchantId),
        
                order_no: String(callNumber),
                call_number: callNumber,
                pg_order_id: orderNo,
        
                items,
                total_amount: Number(totalAmount),
                order_status: '접수',
                payment_status: '결제완료',

beauty_staff_id:
  sessionStorage.getItem('beauty_staff_id')
    ? Number(sessionStorage.getItem('beauty_staff_id'))
    : null,

reservation_date:
  sessionStorage.getItem('beauty_reservation_date') || null,

reservation_time:
  sessionStorage.getItem('beauty_reservation_time') || null
              })
        
            if (error) {
              app.innerHTML = `
                <div class="page">
                  <div class="payment-card">
                    <h1>주문 저장에 실패했습니다.</h1>
                  </div>
                </div>
              `
            }
          }
        }
        
        const callNumber = Number(nextCallNumber)
        
        const orderNo =
          'CARD-' + callNumber + '-' + Date.now()
    
      if (!merchantId || !totalAmount) {
        app.innerHTML = `
          <div class="page">
            <div class="payment-card">
              <h1>주문 정보가 없습니다.</h1>
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
            payment_status: '결제완료'
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
          app.innerHTML = `
            <div class="page">
              <div class="payment-card">
                <h1>결제가 완료되었습니다.</h1>
                <p>주문번호</p>
                <div style="
                  font-size:100px;
                  font-weight:900;
                  color:#d4af37;
                ">
                  ${callNumber}
                </div>
                <p>
                  결제금액 :
                  ${Number(totalAmount).toLocaleString()}원
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

void getKorpayEdiDate
void createKorpayHash