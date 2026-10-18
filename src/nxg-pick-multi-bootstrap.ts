
import {
    mountNxgPickMultiOrders,
    getNxgPickVisibleOrders
  } from './nxg-pick-multi-orders'

import {
  registerVerifiedNxgPickCurrentOrder,
  updateNxgPickOtherOrderStatuses,
  setupNxgPickOtherOrderAlerts
} from './nxg-pick-verified-order'

// NXG PICK QR 결제완료 화면 전용
export function startNxgPickMultiOrders(): void {
  const params = new URLSearchParams(window.location.search)

  if (
    window.location.pathname !== '/success' ||
    params.get('source') !== 'kiosk' ||
    !params.get('orderId')
  ) {
    return
  }

  const app = document.getElementById('app')
  if (!app) return

  let started = false

  const initialize = async () => {
    if (
      started ||
      !app.querySelector('#customer-alert-enable')
    ) {
      return
    }

    started = true
    observer.disconnect()

    try {
      // 실제 결제완료 주문만 저장
      const isGeneralStore =
  await registerVerifiedNxgPickCurrentOrder()

if (!isGeneralStore) return

      // 기존 화면 아래에 다른 주문 목록 추가
      mountNxgPickMultiOrders()
      // 일반매장 주문표 화면 정리
      const card = document.querySelector<HTMLElement>(
        '.nxg-pick-compact .payment-card'
      )

      if (card && !card.querySelector('#nxg-pick-unified')) {
        const numberTitle =
          card.querySelector<HTMLElement>('.order-number-title')

        const numberBox =
          card.querySelector<HTMLElement>('.order-number-box')

        const waitMessage =
          card.querySelector<HTMLElement>('.order-wait-message')

        const alertButton =
          card.querySelector<HTMLElement>('#customer-alert-enable')

        const receiptButton =
          card.querySelector<HTMLElement>('#receipt-view-btn')

        if (
          numberTitle &&
          numberBox &&
          waitMessage &&
          alertButton &&
          receiptButton
        ) {
          const params = new URLSearchParams(location.search)

          const currentId = String(
            params.get('orderId') || ''
          ).replace(/[^a-zA-Z0-9]/g, '')

          const currentOrder = getNxgPickVisibleOrders()
            .find((order) => order.pgOrderId === currentId)

          const section = document.createElement('section')
          section.id = 'nxg-pick-unified'
          section.style.cssText = `
            width:100%;
            margin:12px 0;
            text-align:left;
          `

          card.insertBefore(section, receiptButton)
          section.appendChild(alertButton)

          const row = document.createElement('div')
          row.style.cssText = `
            display:grid;
            grid-template-columns:minmax(0,1fr) auto;
            align-items:center;
            gap:14px;
            padding:20px 6px;
            border-bottom:1px solid #e5e7eb;
          `

          const left = document.createElement('div')
          left.style.minWidth = '0'

          const merchant = document.createElement('div')
          merchant.textContent =
            currentOrder?.merchantName ||
            params.get('merchantName') ||
            '현재 매장'

          merchant.style.cssText = `
            font-size:19px;
            font-weight:800;
            color:#222;
            margin-bottom:8px;
            overflow-wrap:anywhere;
          `

          left.appendChild(merchant)
          left.appendChild(waitMessage)

          waitMessage.style.setProperty(
            'font-size', '14px', 'important'
          )
          waitMessage.style.setProperty(
            'text-align', 'left', 'important'
          )

          const right = document.createElement('div')
          right.style.cssText = `
            display:flex;
            align-items:center;
            gap:6px;
            white-space:nowrap;
          `

          numberTitle.style.setProperty(
            'font-size', '13px', 'important'
          )
          numberTitle.style.setProperty(
            'margin', '0', 'important'
          )

          numberBox.style.setProperty(
            'font-size', '26px', 'important'
          )
          numberBox.style.setProperty(
            'margin', '0', 'important'
          )
          numberBox.style.setProperty(
            'padding', '0', 'important'
          )
          numberBox.style.setProperty(
            'background', 'transparent', 'important'
          )
          numberBox.style.setProperty(
            'color', '#16a34a', 'important'
          )

          right.appendChild(numberTitle)
          right.appendChild(numberBox)

          row.appendChild(left)
          row.appendChild(right)
          section.appendChild(row)

          const otherPanel =
            document.getElementById('nxg-pick-other-orders')

          if (otherPanel) {
            section.appendChild(otherPanel)
          }

          // 기존 큰 제목만 숨김
          const heading = card.querySelector<HTMLElement>('h1')
          if (heading) heading.style.display = 'none'

          // 결제금액은 화면에서만 숨김
          const amount =
            card.querySelector<HTMLElement>('.payment-amount')

          if (amount) amount.style.display = 'none'
        }
      }


      const panel = document.getElementById(
        'nxg-pick-other-orders'
      )

      if (!panel) return

      // 다른 가맹점의 고객호출 알림
      setupNxgPickOtherOrderAlerts()

      // 다른 주문의 준비 상태 확인
      void updateNxgPickOtherOrderStatuses()

      window.setInterval(() => {
        if (
          document.visibilityState === 'visible' &&
          document.getElementById('nxg-pick-other-orders')
        ) {
          void updateNxgPickOtherOrderStatuses()
        }
      }, 5000)

    } catch (error) {
      console.error(
        'NXG PICK 다중 주문 실행 오류:',
        error
      )
    }
  }

  // 기존 결제완료 화면이 표시될 때까지 기다림
  const observer = new MutationObserver(() => {
    void initialize()
  })

  observer.observe(app, {
    childList: true,
    subtree: true
  })

  void initialize()
}
