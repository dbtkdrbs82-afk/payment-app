
import { mountNxgPickMultiOrders } from './nxg-pick-multi-orders'

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
      await registerVerifiedNxgPickCurrentOrder()

      // 기존 화면 아래에 다른 주문 목록 추가
      mountNxgPickMultiOrders()

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
