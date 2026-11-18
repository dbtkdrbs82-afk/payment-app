type MidType = 'pg' | 'terminal' | 'manual'

const typeNames: Record<MidType, string> = {
  pg: 'PG',
  terminal: '단말기',
  manual: '수기'
}

type PoolItem = {
  id: string
  mid_type: MidType
  mid: string
}

async function poolRequest(body: Record<string, unknown>) {
  const response = await fetch('/api/admin-korpay-mid-pool', {
    method: 'POST',
    credentials: 'include',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const result = await response.json()

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || 'MID 처리에 실패했습니다.')
  }

  return result
}

function ensureKorpayPoolStyles() {
  if (document.getElementById('nxg-mid-pool-scoped-style')) return

  const style = document.createElement('style')
  style.id = 'nxg-mid-pool-scoped-style'

  style.textContent = `
    #nxg-mid-pool-dialog,
    #nxg-mid-assign-dialog {
      box-sizing: border-box !important;
      position: fixed !important;
      inset: 0 !important;
      margin: auto !important;
      padding: 24px !important;
      max-height: 90vh !important;
      overflow: auto !important;
      font-size: 14px !important;
    }

    #nxg-mid-pool-dialog {
      width: 850px !important;
      max-width: 94vw !important;
    }

    #nxg-mid-assign-dialog {
      width: 560px !important;
      max-width: 94vw !important;
    }

    #nxg-mid-pool-dialog h2,
    #nxg-mid-assign-dialog h2 {
      font-size: 22px !important;
      white-space: nowrap !important;
      flex: 1 !important;
      margin: 0 !important;
    }

    #nxg-mid-pool-dialog button,
    #nxg-mid-assign-dialog button {
      box-sizing: border-box !important;
      width: auto !important;
      min-width: 0 !important;
      max-width: none !important;
      height: 42px !important;
      margin: 0 !important;
      padding: 0 20px !important;
      flex: 0 0 auto !important;
      white-space: nowrap !important;
      border-radius: 8px !important;
      font-size: 14px !important;
      font-weight: 600 !important;
      cursor: pointer !important;
      background: #174683 !important;
      color: white !important;
      border: 1px solid #174683 !important;
    }

    #nxg-mid-pool-dialog button:disabled,
    #nxg-mid-assign-dialog button:disabled {
      opacity: 0.5 !important;
      cursor: not-allowed !important;
    }

    #nxg-mid-pool-dialog #mid-pool-close,
    #nxg-mid-assign-dialog #mid-assign-cancel {
      background: white !important;
      color: #334155 !important;
      border: 1px solid #cbd5e1 !important;
    }

    #nxg-mid-pool-dialog button[data-mid-type] {
      flex: 1 1 0 !important;
      background: #fff !important;
      color: #174683 !important;
    }

    #nxg-mid-pool-dialog button[data-mid-type][aria-pressed="true"] {
      background: #174683 !important;
      color: white !important;
    }

    #nxg-mid-pool-dialog div:has(> #pool-single-mid) {
      display: grid !important;
      grid-template-columns: minmax(0,1fr) minmax(0,1fr) 90px !important;
      align-items: center !important;
      gap: 10px !important;
    }

    #nxg-mid-pool-dialog input,
    #nxg-mid-pool-dialog textarea,
    #nxg-mid-assign-dialog select {
      box-sizing: border-box !important;
      width: 100% !important;
      min-width: 0 !important;
      max-width: none !important;
      padding: 12px !important;
      margin: 0 !important;
      border: 1px solid #cbd5e1 !important;
      border-radius: 8px !important;
      font-size: 14px !important;
      color: #17365d !important;
      background: white !important;
    }

    #nxg-mid-pool-dialog input,
    #nxg-mid-assign-dialog select {
      height: 42px !important;
    }

    #nxg-mid-pool-dialog textarea {
      height: 110px !important;
      resize: vertical !important;
    }

    #nxg-mid-pool-dialog #pool-bulk-register {
      min-width: 120px !important;
    }

    #nxg-mid-pool-dialog table {
      width: 100% !important;
      min-width: 0 !important;
    }

    #nxg-mid-pool-dialog th,
    #nxg-mid-pool-dialog td {
      font-size: 14px !important;
      padding: 12px !important;
    }
  `

  document.head.appendChild(style)
}

export function openKorpayMidPool() {
  if (
    location.pathname !== '/pg-admin' ||
    sessionStorage.getItem('admin_id') !== 'NXGMASTER16' ||
    sessionStorage.getItem('admin_role') !== 'MASTER'
  ) return

  if (document.querySelector('#nxg-mid-pool-dialog')) return

  let currentType: MidType = 'pg'
  let busy = false

  const dialog = document.createElement('dialog')
  dialog.id = 'nxg-mid-pool-dialog'

  dialog.style.cssText =
    'width:850px;max-width:94vw;max-height:88vh;' +
    'border:1px solid #d6dfeb;border-radius:14px;' +
    'padding:24px;background:#fff;color:#17365d;'

  dialog.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between">
      <h2 style="margin:0">코페이 MID 보관함</h2>
      <button type="button" id="mid-pool-close">닫기</button>
    </div>

    <p style="color:#64748b">
      미사용 MID만 관리합니다.
    </p>

    <div style="display:flex;gap:8px;margin:20px 0">
      <button type="button" data-mid-type="pg">PG MID</button>
      <button type="button" data-mid-type="terminal">단말기 MID</button>
      <button type="button" data-mid-type="manual">수기 MID</button>
    </div>

    <h3 id="mid-pool-title"></h3>

    <div style="display:flex;gap:8px;margin-bottom:10px">
      <input id="pool-single-mid" placeholder="MID"
        autocomplete="off" style="flex:1;min-width:0;padding:12px">
      <input id="pool-single-mkey" placeholder="MKEY"
        type="password" autocomplete="off"
        style="flex:1;min-width:0;padding:12px">
      <button type="button" id="pool-single-register">등록</button>
    </div>

    <textarea id="pool-bulk-input"
      autocomplete="off"
      spellcheck="false"
      placeholder="일괄 등록: 한 줄에 MID와 MKEY 한 세트&#10;엑셀에서 MID / MKEY 2개 열을 복사해 붙여넣으세요."
      style="box-sizing:border-box;width:100%;height:110px;padding:12px"
    ></textarea>

    <div style="display:flex;justify-content:flex-end;margin:8px 0 20px">
      <button type="button" id="pool-bulk-register">일괄 등록</button>
    </div>

    <strong id="mid-pool-count">미사용 MID 조회 중</strong>

    <div style="max-height:330px;overflow:auto;margin-top:12px">
      <table style="width:100%;border-collapse:collapse;text-align:center">
        <thead style="background:#eef3fa">
          <tr>
            <th style="padding:10px">No</th>
            <th>MID</th>
            <th>MKEY</th>
            <th>상태</th><th>관리</th>
          </tr>
        </thead>
        <tbody id="mid-pool-rows"></tbody>
      </table>
    </div>
  `

  ensureKorpayPoolStyles(); document.body.appendChild(dialog)

  const mid = dialog.querySelector<HTMLInputElement>('#pool-single-mid')!
  const mkey = dialog.querySelector<HTMLInputElement>('#pool-single-mkey')!
  const bulk = dialog.querySelector<HTMLTextAreaElement>('#pool-bulk-input')!
  const title = dialog.querySelector<HTMLElement>('#mid-pool-title')!
  const count = dialog.querySelector<HTMLElement>('#mid-pool-count')!
  const tbody = dialog.querySelector<HTMLTableSectionElement>('#mid-pool-rows')!
  const tabs = dialog.querySelectorAll<HTMLButtonElement>('[data-mid-type]')

  function setBusy(value: boolean) {
    busy = value

    dialog.querySelectorAll<HTMLButtonElement>('button')
      .forEach(button => {
        button.disabled = value
      })

    dialog.querySelectorAll<HTMLSelectElement>('select').forEach(select => {
      select.disabled = value
    })

    mid.disabled = value
    mkey.disabled = value
    bulk.disabled = value
  }

  function updateTabs() {
    title.textContent = typeNames[currentType] + ' MID 등록'

    tabs.forEach(button => {
      const active = button.dataset.midType === currentType
      button.setAttribute('aria-pressed', String(active))

      button.style.cssText =
        'flex:1;padding:12px;border-radius:8px;' +
        'border:1px solid #244c80;cursor:pointer;' +
        (active
          ? 'background:#174683;color:white;'
          : 'background:white;color:#174683;')
    })
  }

  async function correctPoolItem(
    item: PoolItem,
    correction: 'change_type' | 'delete',
    newType?: MidType
  ) {
    if (busy || item.mid_type !== currentType) return

    if (correction === 'change_type') {
      if (!newType || newType === item.mid_type) {
        alert('변경할 MID 종류를 선택해주세요.')
        return
      }
    }

    const message = correction === 'delete'
      ? item.mid + ' MID를 보관함에서 삭제하시겠습니까?\n다시 사용하려면 재등록해야 합니다.'
      : item.mid + '의 종류를 ' +
        typeNames[item.mid_type] + '에서 ' +
        typeNames[newType!] + '(으)로 변경하시겠습니까?'

    if (!confirm(message)) return

    setBusy(true)

    try {
      await poolRequest({
        action: 'correct',
        correction,
        pool_id: item.id,
        mid_type: item.mid_type,
        new_type: newType || null
      })

      alert(
        correction === 'delete'
          ? 'MID 삭제 완료'
          : 'MID 종류 변경 완료'
      )

      await refresh()

    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : 'MID 수정 실패'
      )

      await refresh()

    } finally {
      setBusy(false)
    }
  }

  async function refresh() {
    updateTabs()
    tbody.replaceChildren()

    count.textContent = '조회 중...'

    try {
      const result = await poolRequest({
        action: 'list',
        mid_type: currentType
      })

      const items: PoolItem[] = result.items || []

      count.textContent = '미사용 MID: ' + items.length + '개'

      items.forEach((item, index) => {
        const tr = document.createElement('tr')

        const values = [
          String(index + 1),
          item.mid,
          '********',
          '미사용'
        ]

        values.forEach(value => {
          const td = document.createElement('td')
          td.textContent = value
          td.style.cssText = 'padding:12px;border-bottom:1px solid #e2e8f0'
          tr.appendChild(td)
        })

        const actionTd = document.createElement('td')

        const actions = document.createElement('div')

        actions.style.cssText =
          'display:flex;align-items:center;justify-content:center;' +
          'gap:6px;flex-wrap:wrap;'

        const typeSelect = document.createElement('select')

        typeSelect.style.cssText =
          'width:95px!important;min-width:0!important;' +
          'height:36px!important;padding:5px!important;' +
          'border:1px solid #cbd5e1;border-radius:6px;' +
          'font-size:13px;background:white;color:#17365d;'

        const types: MidType[] = [
          'pg', 'terminal', 'manual'
        ]

        types.forEach(type => {
          const option = document.createElement('option')
          option.value = type
          option.textContent = typeNames[type]
          typeSelect.appendChild(option)
        })

        typeSelect.value = item.mid_type

        const changeButton = document.createElement('button')

        changeButton.type = 'button'
        changeButton.textContent = '변경'

        changeButton.style.setProperty(
          'padding', '0 10px', 'important'
        )

        changeButton.style.setProperty(
          'height', '36px', 'important'
        )

        changeButton.onclick = () => {
          void correctPoolItem(
            item,
            'change_type',
            typeSelect.value as MidType
          )
        }

        const deleteButton = document.createElement('button')

        deleteButton.type = 'button'
        deleteButton.textContent = '삭제'

        deleteButton.style.setProperty(
          'background', '#fff', 'important'
        )

        deleteButton.style.setProperty(
          'color', '#dc2626', 'important'
        )

        deleteButton.style.setProperty(
          'border-color', '#dc2626', 'important'
        )

        deleteButton.style.setProperty(
          'padding', '0 10px', 'important'
        )

        deleteButton.style.setProperty(
          'height', '36px', 'important'
        )

        deleteButton.onclick = () => {
          void correctPoolItem(item, 'delete')
        }

        actions.append(
          typeSelect,
          changeButton,
          deleteButton
        )

        actionTd.appendChild(actions)
        tr.appendChild(actionTd)

        tbody.appendChild(tr)
      })
    } catch (error) {
      count.textContent = error instanceof Error
        ? error.message
        : 'MID 조회 실패'
    }
  }

  async function register(
    pairs: { mid: string; mkey: string }[]
  ) {
    if (busy) return

    if (
      !pairs.length ||
      pairs.length > 100 ||
      pairs.some(pair => !pair.mid || !pair.mkey)
    ) {
      alert('MID와 MKEY를 정확히 입력해주세요.')
      return
    }

    if (!confirm(
      typeNames[currentType] + ' MID ' +
      pairs.length + '개를 등록하시겠습니까?'
    )) return

    setBusy(true)

    try {
      await poolRequest({
        action: 'register',
        items: pairs.map(pair => ({
          mid_type: currentType,
          mid: pair.mid,
          mkey: pair.mkey
        }))
      })

      mid.value = ''
      mkey.value = ''
      bulk.value = ''

      alert('MID 등록 완료')
      await refresh()
    } catch (error) {
      alert(error instanceof Error
        ? error.message
        : 'MID 등록 실패')
    } finally {
      setBusy(false)
    }
  }

  dialog.querySelector('#pool-single-register')
    ?.addEventListener('click', () => {
      void register([{
        mid: mid.value.trim(),
        mkey: mkey.value.trim()
      }])
    })

  dialog.querySelector('#pool-bulk-register')
    ?.addEventListener('click', () => {
      const lines = bulk.value
        .split(/\r?\n/)
        .filter(line => line.trim())

      const pairs: { mid: string; mkey: string }[] = []

      for (let i = 0; i < lines.length; i++) {
        const parts = lines[i]
          .split('\t')
          .map(value => value.trim())

        if (parts.length !== 2 || parts.some(value => !value)) {
          alert((i + 1) + '번째 줄의 MID / MKEY를 확인해주세요.')
          return
        }

        pairs.push({
          mid: parts[0],
          mkey: parts[1]
        })
      }

      void register(pairs)
    })

  tabs.forEach(button => {
    button.addEventListener('click', async () => {
      if (busy) return

      if (mid.value || mkey.value || bulk.value) {
        if (!confirm('입력 중인 정보를 비우고 종류를 변경하시겠습니까?')) return
      }

      mid.value = ''
      mkey.value = ''
      bulk.value = ''

      currentType = button.dataset.midType as MidType

      setBusy(true)
      try {
        await refresh()
      } finally {
        setBusy(false)
      }
    })
  })

  dialog.querySelector('#mid-pool-close')
    ?.addEventListener('click', () => {
      if (!busy) dialog.close()
    })

  dialog.addEventListener('cancel', event => {
    if (busy) event.preventDefault()
  })

  dialog.addEventListener('close', () => {
    mid.value = ''
    mkey.value = ''
    bulk.value = ''
    dialog.remove()
  })

  dialog.showModal()

  setBusy(true)
  void refresh().finally(() => setBusy(false))
}

export function mountKorpayMidPoolButton() {
  if (
    location.pathname !== '/pg-admin' ||
    sessionStorage.getItem('admin_id') !== 'NXGMASTER16' ||
    sessionStorage.getItem('admin_role') !== 'MASTER'
  ) return

  if (document.querySelector('#open-korpay-mid-pool')) return

  const anchor = document.querySelector('#merchant-bulk-check')
  if (!anchor) return

  const button = document.createElement('button')
  button.id = 'open-korpay-mid-pool'
  button.type = 'button'
  button.className = 'merchant-search-btn'
  button.textContent = 'MID 보관함'

  anchor.insertAdjacentElement('afterend', button)

  button.addEventListener('click', openKorpayMidPool)
}

type PendingAssignment = {
  merchantId: number
  pool_id: string
  mid_type: MidType
  slot: number
  mid: string
}

// 현재 열려있는 가맹점 화면에만 임시 선택정보 보관
const pendingByInput =
  new WeakMap<HTMLInputElement, PendingAssignment>()

export function getKorpayPoolAssignments(merchantId: number) {
  const result: {
    pool_id: string
    mid_type: MidType
    slot: number
  }[] = []

  document.querySelectorAll<HTMLInputElement>(
    'input[data-pool-bound="true"]'
  ).forEach(input => {
    const pending = pendingByInput.get(input)

    if (pending?.merchantId === merchantId) {
      result.push({
        pool_id: pending.pool_id,
        mid_type: pending.mid_type,
        slot: pending.slot
      })
    }
  })

  return result
}

export function mountKorpayMidAssignment(merchantId: number) {
  if (
    location.pathname !== '/pg-admin' ||
    sessionStorage.getItem('admin_id') !== 'NXGMASTER16' ||
    sessionStorage.getItem('admin_role') !== 'MASTER'
  ) return

  if (!Number.isSafeInteger(merchantId) || merchantId <= 0) return

  const targets: {
    midType: MidType
    slot: number
    midId: string
    mkeyId: string
  }[] = [
    {
      midType: 'pg',
      slot: 1,
      midId: 'korpay_pg_mid',
      mkeyId: 'korpay_pg_mkey'
    },
    {
      midType: 'terminal',
      slot: 1,
      midId: 'korpay_terminal_mid',
      mkeyId: 'korpay_terminal_mkey'
    },
    ...Array.from({ length: 10 }, (_, index) => ({
      midType: 'manual' as MidType,
      slot: index + 1,
      midId: index === 0
        ? 'korpay_manual_mid'
        : 'korpay_manual_mid_' + (index + 1),
      mkeyId: index === 0
        ? 'korpay_manual_mkey'
        : 'korpay_manual_mkey_' + (index + 1)
    }))
  ]

  const saveButton =
    document.querySelector<HTMLButtonElement>('#save-merchant-info')

  const heading = document.getElementById('korpay_pg_mid')
    ?.closest('.merchant-detail-section')
    ?.querySelector('h3')

  if (
    heading &&
    !document.getElementById('nxg-mid-pending-notice')
  ) {
    const notice = document.createElement('p')

    notice.id = 'nxg-mid-pending-notice'

    notice.style.cssText =
      'padding:10px;background:#eff6ff;color:#174683;' +
      'border-radius:6px;font-size:13px;margin:8px 0;'

    notice.textContent =
      'MID 선택은 임시 상태입니다. 하단 저장 버튼을 눌러야 실제 배정됩니다.'

    heading.insertAdjacentElement('afterend', notice)
  }

  // 임시 선택한 상태에서 개통완료하는 실수 방지
  document.getElementById('approve-merchant')
    ?.addEventListener('click', event => {
      if (getKorpayPoolAssignments(merchantId).length > 0) {
        event.preventDefault()
        event.stopImmediatePropagation()
        alert('선택한 MID를 먼저 최종 저장해주세요.')
      }
    }, true)

  targets.forEach(target => {
    const midInput =
      document.getElementById(target.midId) as HTMLInputElement | null

    const mkeyInput =
      document.getElementById(target.mkeyId) as HTMLInputElement | null

    if (!midInput || !mkeyInput) return
    if (midInput.dataset.poolBound === 'true') return

    midInput.dataset.poolBound = 'true'
    midInput.readOnly = true
    mkeyInput.readOnly = true
    mkeyInput.type = 'password'

    const occupied = Boolean(
      midInput.value.trim() ||
      mkeyInput.value.trim()
    )

    // 기존에 저장된 MID는 계속 보호
    if (occupied) {
      midInput.title = '기존 등록 MID는 보호됩니다.'
      midInput.style.cursor = 'default'
      return
    }

    const wrapper = document.createElement('div')

    wrapper.style.cssText =
      'display:flex!important;gap:5px;align-items:center;' +
      'min-width:0;width:100%;'

    midInput.replaceWith(wrapper)
    wrapper.appendChild(midInput)

    midInput.style.setProperty('flex', '1 1 0', 'important')
    midInput.style.setProperty('width', 'auto', 'important')
    midInput.style.setProperty('min-width', '0', 'important')

    const clearButton = document.createElement('button')

    clearButton.type = 'button'
    clearButton.textContent = '취소'

    clearButton.style.cssText =
      'display:none!important;width:auto!important;' +
      'min-width:0!important;flex:0 0 auto!important;' +
      'height:32px!important;padding:0 8px!important;' +
      'background:#fff!important;color:#dc2626!important;' +
      'border:1px solid #dc2626!important;' +
      'border-radius:5px!important;font-size:12px!important;'

    wrapper.appendChild(clearButton)

    function renderPending() {
      const pending = pendingByInput.get(midInput!)

      midInput!.value = pending?.mid || ''
      midInput!.style.cursor = 'pointer'

      midInput!.placeholder =
        typeNames[target.midType] + ' MID 선택'

      midInput!.title = pending
        ? '임시 선택 상태: 클릭하여 다시 선택'
        : '미사용 MID 보관함에서 선택'

      midInput!.style.backgroundColor =
        pending ? '#fff7d6' : '#ffffff'

      // 실제 비밀키는 최종 저장 시 서버에서 가져옴
      mkeyInput!.value = ''

      mkeyInput!.placeholder = pending
        ? '선택완료 / 저장 시 자동입력'
        : 'MKEY 자동입력'

      mkeyInput!.style.backgroundColor =
        pending ? '#fff7d6' : '#f1f5f9'

      clearButton.style.setProperty(
        'display',
        pending ? 'inline-block' : 'none',
        'important'
      )
    }

    clearButton.onclick = () => {
      if (saveButton?.disabled) return

      pendingByInput.delete(midInput)
      renderPending()
    }

    renderPending()

    async function openSelector() {
      if (!midInput || !mkeyInput) return
      if (saveButton?.disabled) return

      if (
        document.getElementById('nxg-mid-assign-dialog')
      ) return

      ensureKorpayPoolStyles()

      const dialog = document.createElement('dialog')

      dialog.id = 'nxg-mid-assign-dialog'

      dialog.style.cssText =
        'width:560px;max-width:92vw;border:1px solid #d6dfeb;' +
        'border-radius:14px;padding:24px;background:white;color:#17365d;'

      dialog.innerHTML = `
        <h2 id="mid-assign-title"></h2>

        <p id="mid-assign-merchant"></p>

        <p style="color:#64748b">
          지금은 임시 선택만 합니다.
          가맹점 최종 저장 전에는 보관함에서 삭제되지 않습니다.
        </p>

        <select id="mid-assign-select"></select>

        <p id="mid-assign-count"></p>

        <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:24px">
          <button type="button" id="mid-assign-cancel">닫기</button>
          <button type="button" id="mid-assign-submit">선택</button>
        </div>
      `

      document.body.appendChild(dialog)

      const title =
        dialog.querySelector<HTMLElement>('#mid-assign-title')!

      const merchantLabel =
        dialog.querySelector<HTMLElement>('#mid-assign-merchant')!

      const select =
        dialog.querySelector<HTMLSelectElement>('#mid-assign-select')!

      const count =
        dialog.querySelector<HTMLElement>('#mid-assign-count')!

      const submit =
        dialog.querySelector<HTMLButtonElement>('#mid-assign-submit')!

      const cancel =
        dialog.querySelector<HTMLButtonElement>('#mid-assign-cancel')!

      title.textContent =
        typeNames[target.midType] + ' MID 선택' +
        (target.midType === 'manual'
          ? ' (' + target.slot + '번)'
          : '')

      merchantLabel.textContent =
        '가맹점: MER' + String(merchantId).padStart(4, '0')

      let busy = true
      let items: PoolItem[] = []

      submit.disabled = true
      select.disabled = true

      cancel.onclick = () => {
        if (!busy) dialog.close()
      }

      dialog.addEventListener('cancel', event => {
        if (busy) event.preventDefault()
      })

      dialog.addEventListener('close', () => dialog.remove())

      dialog.showModal()

      try {
        const current = pendingByInput.get(midInput)

        const usedIds = new Set(
          getKorpayPoolAssignments(merchantId)
            .filter(item => item.pool_id !== current?.pool_id)
            .map(item => item.pool_id)
        )

        const result = await poolRequest({
          action: 'list',
          mid_type: target.midType
        })

        items = (result.items || []).filter(
          (item: PoolItem) =>
            item.mid_type === target.midType &&
            !usedIds.has(item.id)
        )

        const placeholder = document.createElement('option')

        placeholder.value = ''
        placeholder.textContent = '미사용 MID를 선택해주세요'

        select.appendChild(placeholder)

        items.forEach(item => {
          const option = document.createElement('option')

          option.value = item.id
          option.textContent = item.mid

          select.appendChild(option)
        })

        count.textContent =
          '선택 가능 MID: ' + items.length + '개'

        if (
          current &&
          items.some(item => item.id === current.pool_id)
        ) {
          select.value = current.pool_id
        }

        select.disabled = items.length === 0

        select.onchange = () => {
          submit.disabled = busy || !select.value
        }

      } catch (error) {
        count.textContent = error instanceof Error
          ? error.message
          : 'MID 조회 실패'

      } finally {
        busy = false
        submit.disabled = !select.value
      }

      submit.onclick = () => {
        if (busy || !select.value || saveButton?.disabled) return

        const selected = items.find(
          item => item.id === select.value
        )

        if (
          !selected ||
          selected.mid_type !== target.midType
        ) return

        const current = pendingByInput.get(midInput)

        if (
          getKorpayPoolAssignments(merchantId).some(
            item =>
              item.pool_id === selected.id &&
              item.pool_id !== current?.pool_id
          )
        ) {
          alert('이미 다른 칸에서 선택한 MID입니다.')
          return
        }

        // DB 저장하지 않음. 현재 화면에만 임시 보관.
        pendingByInput.set(midInput, {
          merchantId,
          pool_id: selected.id,
          mid_type: target.midType,
          slot: target.slot,
          mid: selected.mid
        })

        renderPending()
        dialog.close()
      }
    }

    midInput.onclick = () => {
      void openSelector()
    }

    midInput.onkeydown = event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        void openSelector()
      }
    }
  })
}
