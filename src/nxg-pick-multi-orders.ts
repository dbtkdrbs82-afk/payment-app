// NXG PICK 다중 가맹점 주문 관리
// 기존 결제 및 고객호출 기능과 독립

export type NxgPickTrackedOrder = {
    merchantId: string
    merchantName: string
    pgOrderId: string
    orderNumber: string
    savedAt: number
  }

  const STORAGE_KEY = 'nxg_pick_multi_orders_v1'
  const MAX_AGE = 24 * 60 * 60 * 1000
  const MAX_ORDERS = 30

  // 저장된 주문 목록 가져오기
  export function getNxgPickTrackedOrders(): NxgPickTrackedOrder[] {
    try {
      const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || '[]'
      )

      if (!Array.isArray(saved)) return []

      const now = Date.now()

      return saved
        .filter((order): order is NxgPickTrackedOrder =>
          order !== null &&
          typeof order === 'object' &&
          typeof order.merchantId === 'string' &&
          typeof order.merchantName === 'string' &&
          typeof order.pgOrderId === 'string' &&
          typeof order.orderNumber === 'string' &&
          typeof order.savedAt === 'number' &&
          Number.isFinite(order.savedAt) &&
          order.savedAt <= now &&
          now - order.savedAt < MAX_AGE
        )
        .slice(-MAX_ORDERS)
    } catch {
      return []
    }
  }

  // 새로운 주문 추가
  export function saveNxgPickTrackedOrder(
    order: Omit<NxgPickTrackedOrder, 'savedAt'>
  ): boolean {
    if (
      !order.merchantId ||
      !order.pgOrderId ||
      !order.orderNumber
    ) {
      return false
    }

    try {
      const orders = getNxgPickTrackedOrders().filter(
        (saved) =>
          saved.merchantId !== order.merchantId ||
          saved.pgOrderId !== order.pgOrderId
      )

      orders.push({
        ...order,
        savedAt: Date.now()
      })

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(orders.slice(-MAX_ORDERS))
      )

      return true
    } catch {
      return false
    }
  }

  // 특정 주문만 제거
  export function removeNxgPickTrackedOrder(
    merchantId: string,
    pgOrderId: string
  ): void {
    try {
      const orders = getNxgPickTrackedOrders().filter(
        (order) =>
          order.merchantId !== merchantId ||
          order.pgOrderId !== pgOrderId
      )

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(orders)
      )
    } catch {
      // 기존 주문 및 결제 기능에는 영향 없음
    }
  }

  // 기존 NXG PICK 마지막 주문정보 읽기
export function getNxgPickLatestOrder() {
    try {
      const text = localStorage.getItem(
        'nxg_last_kiosk_order'
      )

      if (!text) return null

      const order = JSON.parse(text)

      if (
        !order ||
        !order.merchantId ||
        !order.pgOrderId ||
        !order.orderNumber
      ) {
        return null
      }

      return {
        merchantId: String(order.merchantId),
        pgOrderId: String(order.pgOrderId),
        orderNumber: String(order.orderNumber)
      }
    } catch {
      return null
    }
  }

  // 고객 주문표에 표시할 최대 주문 건수
export const NXG_PICK_VISIBLE_ORDER_COUNT = 10

// 최근 주문 10건 가져오기
export function getNxgPickVisibleOrders(): NxgPickTrackedOrder[] {
  return getNxgPickTrackedOrders()
    .sort((a, b) => b.savedAt - a.savedAt)
    .slice(0, NXG_PICK_VISIBLE_ORDER_COUNT)
}

// 기존 주문표 아래에 표시할 다른 가맹점 주문 목록

export function createNxgPickOtherOrdersPanel(
  currentPgOrderId: string
): HTMLElement | null {

  const orders = getNxgPickVisibleOrders()
    .filter((order) => order.pgOrderId !== currentPgOrderId)
    .slice(0, 9)

  if (orders.length === 0) return null

  const panel = document.createElement('section')
  panel.id = 'nxg-pick-other-orders'
  panel.style.cssText = `
    width:100%;
    margin:0;
    padding:0;
    border:0;
    background:transparent;
    text-align:left;
  `

  // 기존 개별 알림 끄기 버튼의 위치 유지
  const style = document.createElement('style')
  style.textContent = `
    #nxg-pick-other-orders .nxg-pick-other-stop {
  grid-column: 2;
  grid-row: 2;
  justify-self: end;
  align-self: start;
  margin-top: 0;
  background: #174981 !important;
}

  `
  panel.appendChild(style)

  const list = document.createElement('div')
  list.style.cssText = `
    width:100%;
    max-height:420px;
    overflow-y:auto;
  `

  orders.forEach((order) => {
    const row = document.createElement('div')
    row.className = 'nxg-pick-other-row'

    row.style.cssText = `
      display:grid;
      grid-template-columns:minmax(0,1fr) auto;
      align-items:center;
      column-gap:12px;
      row-gap:8px;
      padding:18px 6px;
      border-bottom:1px solid #e5e7eb;
    `

    const name = document.createElement('span')
    name.textContent =
      order.merchantName || `가맹점 ${order.merchantId}`

    name.style.cssText = `
      min-width:0;
      font-size:18px;
      font-weight:800;
      color:#222222;
      overflow-wrap:anywhere;
    `

    const number = document.createElement('strong')
    number.textContent = `${order.orderNumber}번`

    number.style.cssText = `
      max-width:150px;
      text-align:right;
      font-size:16px;
      font-weight:800;
      line-height:1.5;
      color:#c9a23b;
    `
// 매장명은 왼쪽 위
    name.style.gridColumn = '1'
    name.style.gridRow = '1'

    // 주문번호는 오른쪽 위
    number.style.gridColumn = '2'
    number.style.gridRow = '1'

    // 주문 상태는 매장명 아래
    const statusText = document.createElement('span')
    statusText.className = 'nxg-pick-other-status'
    statusText.textContent = '잠시만 기다려주세요.'

    statusText.style.cssText = `
      grid-column:1;
      grid-row:2;
      font-size:13px;
      line-height:1.5;
      color:#6b7280;
    `

    row.appendChild(name)
    row.appendChild(statusText)
    row.appendChild(number)
    list.appendChild(row)

  })

  panel.appendChild(list)

  return panel
}


  // 실제 결제완료가 확인된 주문만 다중 주문 목록에 등록
export function saveVerifiedNxgPickOrder(
    dbOrder: {
      merchant_id: number | string
      pg_order_id: string
      order_no: string
      call_number?: number | null
      payment_status: string
    },
    merchantId: string,
    merchantName: string,
    pgOrderId: string
  ): boolean {

    if (dbOrder.payment_status !== '결제완료') {
      return false
    }

    if (
      String(dbOrder.merchant_id) !== merchantId ||
      String(dbOrder.pg_order_id) !== pgOrderId
    ) {
      return false
    }

    const orderNumber = String(
      dbOrder.call_number || dbOrder.order_no || ''
    )

    if (!orderNumber) return false

    return saveNxgPickTrackedOrder({
      merchantId,
      merchantName,
      pgOrderId,
      orderNumber
    })
  }
/* NXG PICK 다중 주문표 화면 연결 */
export function mountNxgPickMultiOrders(): void {
    if (window.location.pathname !== '/success') return
  const params = new URLSearchParams(window.location.search)
   if (params.get('source') !== 'kiosk') return
  const currentOrderId = String(
      params.get('orderId') || ''
    ).replace(/[^a-zA-Z0-9]/g, '')
   if (!currentOrderId) return
    // 기존 픽업 알림 주문표가 표시된 경우에만 실행
    const alertButton =
      document.querySelector<HTMLButtonElement>(
        '#customer-alert-enable'
      )
  if (!alertButton) return
  const paymentCard =
      alertButton.closest<HTMLElement>('.payment-card')
   if (!paymentCard) return
  // 중복 표시 방지
    if (
      paymentCard.querySelector('#nxg-pick-other-orders')
    ) {
      return
    }

    // 기존 주문표는 유지하고 다른 주문 목록만 추가
    const otherOrdersPanel =
      createNxgPickOtherOrdersPanel(currentOrderId)

    if (!otherOrdersPanel) return

    const receiptButton =
      paymentCard.querySelector('#receipt-view-btn')

    if (receiptButton) {
      paymentCard.insertBefore(
        otherOrdersPanel,
        receiptButton
      )
    } else {
      paymentCard.appendChild(otherOrdersPanel)
    }
  }