
import { createClient } from '@supabase/supabase-js'

import {
  saveVerifiedNxgPickOrder,
  getNxgPickLatestOrder,
  getNxgPickVisibleOrders
} from './nxg-pick-multi-orders'


// 기존 main.ts와 동일한 공개 Supabase 접속 정보
const nxgOrderDb = createClient(
  'https://rnmptlxdeihvfwegoqnf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJubXB0bHhkZWlodmZ3ZWdvcW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MzcwMDMsImV4cCI6MjA5NDIxMzAwM30.5SeOiuZgFmU7RUu5kzLpLBUwC91SYI3WxqRFoafMrG8'
)

// 결제완료 확인 후 고객의 다중 주문 목록에 등록
export async function registerVerifiedNxgPickCurrentOrder(): Promise<boolean> {
  const params = new URLSearchParams(window.location.search)

  if (
    window.location.pathname !== '/success' ||
    params.get('source') !== 'kiosk'
  ) {
    return false
  }

  const pgOrderId = String(
    params.get('orderId') || ''
  ).replace(/[^a-zA-Z0-9]/g, '')



  const latestOrder = getNxgPickLatestOrder()

  const merchantId = String(
    params.get('merchantId') ||
    (
      latestOrder?.pgOrderId === pgOrderId
        ? latestOrder.merchantId
        : ''
    ) ||
    sessionStorage.getItem('kiosk_merchant_id') ||
    sessionStorage.getItem('merchantId') ||
    ''
  )



  if (!pgOrderId || !/^\d+$/.test(merchantId)) {
    return false
  }

  try {
    const { data: order, error } = await nxgOrderDb
      .from('orders')
      .select(
        'merchant_id,pg_order_id,order_no,call_number,payment_status'
      )
      .eq('pg_order_id', pgOrderId)
      .eq('merchant_id', Number(merchantId))
      .eq('payment_status', '결제완료')
      .maybeSingle()

    if (error || !order) return false

    const { data: merchant } = await nxgOrderDb
      .from('merchants')
      .select('merchant_name,merchant_type')
      .eq('id', Number(merchantId))
      .maybeSingle()

    // 기존 다른 가맹점 유형에는 적용하지 않음
    if (merchant?.merchant_type !== '일반매장') {
      return false
    }

    return saveVerifiedNxgPickOrder(
      order,
      merchantId,
      String(merchant.merchant_name || ''),
      pgOrderId
    )
  } catch {
    return false
  }
}


/* NXG PICK 다른 가맹점 주문 상태 조회 */
/* DB 조회 전용, 기존 주문·결제 데이터 변경 없음 */

export async function updateNxgPickOtherOrderStatuses(): Promise<void> {
    const panel = document.getElementById(
      'nxg-pick-other-orders'
    )

    if (!panel) return

    if (document.visibilityState !== 'visible') return

    const { getNxgPickVisibleOrders } =
      await import('./nxg-pick-multi-orders')

    const currentOrderId = String(
      new URLSearchParams(location.search).get('orderId') || ''
    ).replace(/[^a-zA-Z0-9]/g, '')

    const orders = getNxgPickVisibleOrders()
      .filter((order) => order.pgOrderId !== currentOrderId)
      .slice(0, 9)

    if (orders.length === 0) return

    try {
      const { data, error } = await nxgOrderDb
        .from('orders')
        .select('merchant_id,pg_order_id,order_status')
        .eq('payment_status', '결제완료')
        .in(
          'pg_order_id',
          orders.map((order) => order.pgOrderId)
        )

      if (error) return

      const list = panel.querySelector('div')
      if (!list) return

      const rows = Array.from(list.children)

      orders.forEach((order, index) => {
        const found = (data || []).find(
          (item) =>
            String(item.merchant_id) === order.merchantId &&
            String(item.pg_order_id) === order.pgOrderId
        )

        const number = rows[index]?.querySelector('strong')
        if (!number) return

        const status = !found
          ? '확인중'
          : found.order_status === '완료'
            ? '준비완료'
            : found.order_status === '접수'
              ? '접수'
              : '준비중'


number.textContent = '주문번호 ' + order.orderNumber + '번'

const statusText = rows[index]?.querySelector<HTMLElement>(
  '.nxg-pick-other-status'
)

if (statusText) {
  statusText.textContent =
    status === '준비완료'
      ? '상품이 준비되었습니다. 픽업해주세요.'
      : status === '접수'
        ? '잠시만 기다려주세요.'
        : status === '확인중'
          ? '주문 상태 확인 중'
          : '상품을 준비하고 있습니다.'

  statusText.style.color =
    status === '준비완료' ? '#16a34a' : '#6b7280'

  statusText.style.fontWeight =
    status === '준비완료' ? '800' : '500'
}

number.style.color =
  status === '준비완료' ? '#16a34a' : '#222222'

      })
    } catch (error) {
      console.error('NXG PICK 주문 상태 조회 실패:', error)
    }
  }


/* NXG PICK 다른 가맹점 고객호출 알림 */
/* 기존 고객호출 기능과 별도로 동작 */


export function setupNxgPickOtherOrderAlerts(): void {
    const panel = document.getElementById('nxg-pick-other-orders')
    const button = document.getElementById('customer-alert-enable')

    if (!panel || !button) return

    const ACK_KEY = 'nxg_pick_multi_acknowledged_v1'

    let enabled =
      button instanceof HTMLButtonElement && button.disabled

    let checking = false
    let soundContext: AudioContext | null = null

    const activeCalls = new Map<string, HTMLElement>()

    let acknowledgedCalls = new Set<string>()

    try {
      const saved = JSON.parse(
        localStorage.getItem(ACK_KEY) || '[]'
      )

      if (Array.isArray(saved)) {
acknowledgedCalls = new Set(
          saved.filter((value): value is string =>
            typeof value === 'string'
          )
        )
      }
    } catch {
      acknowledgedCalls = new Set<string>()
    }
const playAlarm = () => {
      if (
        !enabled ||
        activeCalls.size === 0 ||
        document.visibilityState !== 'visible'
      ) return

      if ('vibrate' in navigator) {
        navigator.vibrate([250, 120, 250, 120, 600])
      }

      const ctx = soundContext

      if (!ctx || ctx.state !== 'running') return

      ;[880, 1040, 1320].forEach((frequency, index) => {
        const oscillator = ctx.createOscillator()
        const gain = ctx.createGain()
        const start = ctx.currentTime + index * 0.25

        oscillator.type = 'sine'
        oscillator.frequency.value = frequency

        gain.gain.setValueAtTime(0.18, start)
        gain.gain.setValueAtTime(0, start + 0.18)

        oscillator.connect(gain)
        gain.connect(ctx.destination)

        oscillator.start(start)
        oscillator.stop(start + 0.18)
      })
    }

    const checkOtherCalls = async () => {
      if (
        !enabled ||
        checking ||
        document.visibilityState !== 'visible'
      ) return

      checking = true

      try {
        const { getNxgPickVisibleOrders } =
          await import('./nxg-pick-multi-orders')

        const currentOrderId = String(
          new URLSearchParams(location.search).get('orderId') || ''
        ).replace(/[^a-zA-Z0-9]/g, '')

        const orders = getNxgPickVisibleOrders()
          .filter((order) => order.pgOrderId !== currentOrderId)
          .slice(0, 9)

        if (!orders.length) {
          activeCalls.clear()
          return
        }

        const { data, error } = await nxgOrderDb
          .from('orders')
          .select(
            'merchant_id,pg_order_id,order_status,last_called_at,customer_acknowledged_at'
          )
          .eq('payment_status', '결제완료')
          .in('pg_order_id', orders.map((order) => order.pgOrderId))

        if (error) return

        const list = panel.querySelector('div')
        if (!list) return

        const rows = Array.from(list.children) as HTMLElement[]
        const nextCalls = new Map<string, HTMLElement>()

        orders.forEach((order, index) => {
          const row = rows[index]
          if (!row) return

          const found = (data || []).find(
            (item) =>
              String(item.merchant_id) === order.merchantId &&
              String(item.pg_order_id) === order.pgOrderId
          )

          const callKey =
            found?.order_status === '완료' &&
            found.last_called_at &&
            !found.customer_acknowledged_at
              ? `${order.merchantId}:${order.pgOrderId}:${found.last_called_at}`
              : ''

          let stopButton =
            row.querySelector<HTMLButtonElement>(
              '.nxg-pick-other-stop'
            )

          if (!callKey || acknowledgedCalls.has(callKey)) {
            stopButton?.remove()
            return
          }

          nextCalls.set(callKey, row)

          if (stopButton?.dataset.callKey !== callKey) {
            stopButton?.remove()

            stopButton = document.createElement('button')
            stopButton.type = 'button'
            stopButton.className = 'nxg-pick-other-stop'
            stopButton.dataset.callKey = callKey
            stopButton.textContent = '알림 끄기'

            stopButton.style.cssText = `
              border:0;
              border-radius:8px;
              background:#dc2626;
              color:white;
              padding:8px 10px;
              font-size:12px;
              font-weight:700;
              cursor:pointer;
            `

            stopButton.addEventListener('click', () => {
              acknowledgedCalls.add(callKey)
              activeCalls.delete(callKey)

              try {
                localStorage.setItem(
                  ACK_KEY,
                  JSON.stringify(
                    [...acknowledgedCalls].slice(-100)
                  )
                )
              } catch {
                // 기기 저장이 제한된 경우에도 화면 알림은 중지
              }

              stopButton?.remove()

              if ('vibrate' in navigator) {
                navigator.vibrate(0)
              }
            })

            row.appendChild(stopButton)
          }
        })

        const hasNewCall = [...nextCalls.keys()].some(
          (key) => !activeCalls.has(key)
        )

        activeCalls.clear()

        nextCalls.forEach((row, key) => {
          activeCalls.set(key, row)
        })

        if (hasNewCall) {
          playAlarm()
        }
      } catch (error) {
        console.error('다중 주문 고객호출 확인 실패:', error)
      } finally {
        checking = false
      }
    }

    button.addEventListener('click', () => {
      enabled = true

      try {
        soundContext ??= new AudioContext()
        void soundContext.resume().catch(() => {})
      } catch {
        soundContext = null
      }

      void checkOtherCalls()
    })

    // 다른 주문 호출 상태 확인
    window.setInterval(() => {
      void checkOtherCalls()
    }, 5000)

    // 미확인 호출이 있을 때 진동·소리 반복
    window.setInterval(() => {
      playAlarm()
    }, 3500)

    if (enabled) {
      void checkOtherCalls()
    }
  }

/* 현재 주문의 실제 준비 상태 조회 */
/* 알림 확인 여부와 관계없이 주문 상태 유지 */

export async function getNxgPickCurrentOrderStatus(): Promise<string | null> {
  const pgOrderId = String(
    new URLSearchParams(location.search).get('orderId') || ''
  ).replace(/[^a-zA-Z0-9]/g, '')

  const order = getNxgPickVisibleOrders().find(
    (item) => item.pgOrderId === pgOrderId
  )

  if (!order) return null

  try {
    const { data, error } = await nxgOrderDb
      .from('orders')
      .select('order_status')
      .eq('merchant_id', Number(order.merchantId))
      .eq('pg_order_id', order.pgOrderId)
      .eq('payment_status', '결제완료')
      .maybeSingle()

    if (error || !data) return null

    return String(data.order_status || '')
  } catch {
    return null
  }
}
