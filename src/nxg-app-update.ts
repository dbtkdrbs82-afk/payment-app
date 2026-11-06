import { Capacitor } from '@capacitor/core'
import {
  AppUpdate,
  AppUpdateAvailability
} from '@capawesome/capacitor-app-update'

let checking = false

export async function nxgCheckForAppUpdate(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return
  if (Capacitor.getPlatform() !== 'android') return

  // 결제 중에는 업데이트 안내 금지
  if (window.location.pathname !== '/merchant-app/home') return

  if (checking) return
  checking = true

  try {
    const info = await AppUpdate.getAppUpdateInfo()

    if (
      info.updateAvailability !==
      AppUpdateAvailability.UPDATE_AVAILABLE
    ) return

    if (window.location.pathname !== '/merchant-app/home') return

    if (document.getElementById('nxg-update-dialog')) return

    const version = String(info.availableVersionCode || 'new')

    // Google Play 우선순위 4 이상은 필수 업데이트로 취급
    const required = Number(info.updatePriority || 0) >= 4

    const snoozeKey = 'nxg_update_later_' + version

    if (!required) {
      const snoozedUntil = Number(
        localStorage.getItem(snoozeKey) || '0'
      )

      if (Date.now() < snoozedUntil) return
    }

    const overlay = document.createElement('div')
    overlay.id = 'nxg-update-dialog'
    overlay.style.cssText = `
      position:fixed;
      inset:0;
      z-index:2147483647;
      display:flex;
      align-items:center;
      justify-content:center;
      background:rgba(0,0,0,0.55);
      padding:20px;
      box-sizing:border-box;
    `

    const panel = document.createElement('div')
    panel.style.cssText = `
      width:100%;
      max-width:360px;
      padding:24px;
      box-sizing:border-box;
      background:#ffffff;
      color:#172033;
      border-radius:16px;
      text-align:center;
      box-shadow:0 10px 36px rgba(0,0,0,0.2);
    `

    const title = document.createElement('h2')
    title.textContent = required
      ? 'NXG PICK 필수 업데이트'
      : 'NXG PICK 업데이트 안내'

    title.style.cssText = `
      margin:0 0 14px;
      font-size:20px;
      font-weight:800;
    `

    const description = document.createElement('p')
    description.textContent = required
      ? '중요한 업데이트가 있습니다. 최신 버전으로 업데이트해 주세요.'
      : '새로운 버전이 출시되었습니다. 최신 버전으로 업데이트하시겠습니까?'

    description.style.cssText = `
      font-size:15px;
      line-height:1.6;
      margin:0 0 22px;
    `

    const buttons = document.createElement('div')
    buttons.style.cssText = `
      display:flex;
      gap:10px;
    `

    const updateButton = document.createElement('button')
    updateButton.textContent = '업데이트'
    updateButton.style.cssText = `
      flex:1;
      padding:14px 10px;
      background:#1677ff;
      border:0;
      border-radius:9px;
      color:white;
      font-size:15px;
      font-weight:700;
      cursor:pointer;
    `

    updateButton.addEventListener('click', async () => {
      updateButton.disabled = true

      try {
        if (required && info.immediateUpdateAllowed) {
          await AppUpdate.performImmediateUpdate()
        } else {
          await AppUpdate.openAppStore()
        }
      } catch (error) {
        console.error('NXG 업데이트 실행 실패:', error)
        alert('업데이트 화면을 열지 못했습니다.')
      } finally {
        updateButton.disabled = false
      }
    })

    if (!required) {
      const laterButton = document.createElement('button')
      laterButton.textContent = '나중에'
      laterButton.style.cssText = `
        flex:1;
        padding:14px 10px;
        background:#eef1f5;
        border:0;
        border-radius:9px;
        color:#333333;
        font-size:15px;
        font-weight:700;
        cursor:pointer;
      `

      laterButton.addEventListener('click', () => {
        localStorage.setItem(
          snoozeKey,
          String(Date.now() + 24 * 60 * 60 * 1000)
        )
        overlay.remove()
      })

      buttons.appendChild(laterButton)
    }

    buttons.appendChild(updateButton)

    panel.appendChild(title)
    panel.appendChild(description)
    panel.appendChild(buttons)
    overlay.appendChild(panel)

    document.body.appendChild(overlay)

  } catch (error) {
    console.warn('NXG 업데이트 확인 오류:', error)
  } finally {
    checking = false
  }
}