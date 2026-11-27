type MidType = 'pg' | 'terminal' | 'manual'
type SettlementCycle = '1일' | '3일'

const typeNames: Record<MidType, string> = {
  pg: 'PG',
  terminal: '단말기',
  manual: '수기'
}

type PoolItem = {
  has_mkey?: boolean
  id: string
  mid_type: MidType
  mid: string
  settlement_cycle: SettlementCycle | null
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
  let currentCycle: SettlementCycle | null = '1일'
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
      <button type="button" data-mid-type="pg" data-mid-cycle="1일">PG MID / 1일</button>
      <button type="button" data-mid-type="terminal" data-mid-cycle="1일">단말기 MID / 1일</button>
      <button type="button" data-mid-type="manual" data-mid-cycle="1일">수기 MID / 1일</button>
    </div>

    <div style="display:flex;gap:8px;margin:8px 0">
      <button type="button" data-mid-type="pg" data-mid-cycle="3일">PG MID / 3일</button>
      <button type="button" data-mid-type="terminal" data-mid-cycle="3일">단말기 MID / 3일</button>
      <button type="button" data-mid-type="manual" data-mid-cycle="3일">수기 MID / 3일</button>
    </div>

    <details style="margin:12px 0;color:#64748b">
      <summary style="cursor:pointer">미분류 MID 정리 (기존 등록분)</summary>
      <div style="display:flex;gap:8px;margin-top:10px">
        <button type="button" data-mid-type="pg" data-mid-cycle="">PG 미분류</button>
        <button type="button" data-mid-type="terminal" data-mid-cycle="">단말기 미분류</button>
        <button type="button" data-mid-type="manual" data-mid-cycle="">수기 미분류</button>
      </div>
    </details>

    <div style="display:none">
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
      placeholder="일괄 등록: MID와 MKEY를 두 줄씩 입력&#10;MID 1&#10;MKEY 1&#10;MID 2&#10;MKEY 2"
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

    mid.disabled = value || currentCycle === null
    mkey.disabled = value || currentCycle === null
    bulk.disabled = value || currentCycle === null

    dialog.querySelectorAll<HTMLButtonElement>(
      '#pool-single-register, #pool-bulk-register'
    ).forEach(button => {
      button.disabled = value || currentCycle === null
    })
  }

  function updateTabs() {
    mkey.placeholder = currentType === 'terminal'
      ? 'MKEY (선택사항)'
      : 'MKEY (필수)'

    bulk.placeholder = currentType === 'terminal'
      ? '단말기 일괄 등록: MID만 한 줄씩\nMID 1\nMID 2\nMID 3'
      : '일괄 등록: MID와 MKEY를 두 줄씩 입력\nMID 1\nMKEY 1\nMID 2\nMKEY 2'

    title.textContent = typeNames[currentType] + ' MID / ' + (currentCycle ? currentCycle + ' 정산' : '미분류 정리')

    tabs.forEach(button => {
      const active = button.dataset.midType === currentType && (button.dataset.midCycle || null) === currentCycle
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
    newType?: MidType,
    newCycle?: SettlementCycle
  ) {
    if (
      busy ||
      item.mid_type !== currentType ||
      item.settlement_cycle !== currentCycle
    ) return

    if (correction === 'change_type') {
      if (!newType || !newCycle) {
        alert('MID 종류와 정산주기를 선택해주세요.')
        return
      }

      if (
        newType === item.mid_type &&
        newCycle === item.settlement_cycle
      ) {
        alert('변경된 내용이 없습니다.')
        return
      }
    }

    const message = correction === 'delete'
      ? item.mid + ' MID를 보관함에서 삭제하시겠습니까?'
      : item.mid + ' MID를\n' +
        typeNames[newType!] + ' / ' +
        newCycle + ' 정산으로 변경하시겠습니까?'

    if (!confirm(message)) return

    setBusy(true)

    try {
      await poolRequest({
        action: 'correct',
        correction,
        pool_id: item.id,
        mid_type: item.mid_type,
        settlement_cycle: item.settlement_cycle,
        new_type: newType || null,
        new_cycle: newCycle || null
      })

      alert(
        correction === 'delete'
          ? 'MID 삭제 완료'
          : 'MID 종류 및 정산주기 변경 완료'
      )

      await refresh()

    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : 'MID 변경 실패'
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
        mid_type: currentType,
        settlement_cycle: currentCycle
      })

      const items: PoolItem[] = result.items || []

      count.textContent = '미사용 MID: ' + items.length + '개'

      items.forEach((item, index) => {
        const tr = document.createElement('tr')

        const values = [
          String(index + 1),
          item.mid,
          item.has_mkey === false ? '없음' : '********',
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

        const cycleSelect = document.createElement('select')

        cycleSelect.style.cssText =
          'width:90px!important;min-width:0!important;' +
          'height:36px!important;padding:5px!important;' +
          'border:1px solid #cbd5e1;border-radius:6px;' +
          'font-size:13px;background:white;color:#17365d;'

        const cycleOptions = [
          { value: '', label: '미분류' },
          { value: '1일', label: '1일 정산' },
          { value: '3일', label: '3일 정산' }
        ]

        cycleOptions.forEach(cycle => {
          const option = document.createElement('option')
          option.value = cycle.value
          option.textContent = cycle.label
          option.disabled = cycle.value === ''
          cycleSelect.appendChild(option)
        })

        cycleSelect.value = item.settlement_cycle || ''


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
            typeSelect.value as MidType,
            cycleSelect.value as SettlementCycle
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
          cycleSelect,
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

    if (!currentCycle) {
      alert('1일 또는 3일 정산 탭을 선택해주세요.')
      return
    }

    if (
      !pairs.length ||
      pairs.length > 100 ||
      pairs.some(pair => !pair.mid || (currentType !== 'terminal' && !pair.mkey))
    ) {
      alert('MID와 MKEY를 정확히 입력해주세요.')
      return
    }

    if (!confirm(
      typeNames[currentType] + ' MID / ' + currentCycle + ' 정산 ' +
      pairs.length + '개를 등록하시겠습니까?'
    )) return

    setBusy(true)

    try {
      await poolRequest({
        action: 'register',
        items: pairs.map(pair => ({
          mid_type: currentType,
          settlement_cycle: currentCycle,
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

      // MID / MKEY 두 줄을 한 세트로 처리
      const lines = bulk.value
        .replace(/\r\n?/g, '\n')
        .split('\n')

      // 마지막 빈 줄만 제거
      while (
        lines.length &&
        !lines[lines.length - 1].trim()
      ) {
        lines.pop()
      }

      if (!lines.length) {
        alert('MID와 MKEY를 입력해주세요.')
        return
      }

      if (currentType === 'terminal') {
        if (lines.length > 100) {
          alert('한 번에 최대 100개까지 등록 가능합니다.')
          return
        }

        const mids = lines.map(line => line.trim())

        if (mids.some(value => !value || /[\s\/,|]/.test(value))) {
          alert('단말기 MID만 한 줄씩 입력해주세요.')
          return
        }

        void register(
          mids.map(value => ({
            mid: value,
            mkey: ''
          }))
        )

        return
      }

      if (lines.length % 2 !== 0) {
        alert(
          'MID와 MKEY의 줄 개수가 맞지 않습니다.\n' +
          'MID 한 줄, MKEY 한 줄씩 입력해주세요.'
        )
        return
      }

      if (lines.length > 200) {
        alert('한 번에 최대 100세트까지 등록 가능합니다.')
        return
      }

      const pairs: {
        mid: string
        mkey: string
      }[] = []

      for (let i = 0; i < lines.length; i += 2) {

        const midValue = lines[i].trim()
        const mkeyValue = lines[i + 1].trim()

        if (!midValue || !mkeyValue) {
          alert(
            (i + 1) + '~' + (i + 2) +
            '번째 줄을 확인해주세요.\n' +
            '중간에 빈 줄이 있으면 안 됩니다.'
          )
          return
        }

        if (
          /[\s\/,|]/.test(midValue) ||
          /\s/.test(mkeyValue)
        ) {
          alert(
            (i + 1) + '~' + (i + 2) +
            '번째 줄의 입력 형식을 확인해주세요.\n' +
            'MID와 MKEY를 각각 한 줄씩 입력해주세요.'
          )
          return
        }

        pairs.push({
          mid: midValue,
          mkey: mkeyValue
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
      currentCycle = (button.dataset.midCycle || null) as SettlementCycle | null

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
  mkey: string
  settlement_cycle: SettlementCycle
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

  const merchantCycleSelect =
    document.querySelector<HTMLSelectElement>('#settlement_cycle')

  function readMerchantCycle(): SettlementCycle | null {
    const value = merchantCycleSelect?.value

    // 가맹점 정산주기와 코페이 MID 정산주기는 별개
    // NXG 1일 정산: 코페이 1일 MID
    // NXG 3일 / 4일 / 7일 정산: 코페이 3일 MID

    if (value === '1일') {
      return '1일'
    }

    if (
      value === '3일' ||
      value === '4일' ||
      value === '7일'
    ) {
      return '3일'
    }

    return null
  }

  const updatePendingForCycle: (() => boolean)[] = []

  merchantCycleSelect?.addEventListener('change', () => {
    const cleared = updatePendingForCycle
      .map(update => update())
      .filter(Boolean).length

    if (cleared > 0) {
      alert(
        '필요한 코페이 MID 정산주기가 변경되어 임시 선택한 MID ' +
        cleared + '개를 취소했습니다.\n' +
        '변경된 기준에 맞는 코페이 MID를 다시 선택해주세요.'
      )
    }
  })

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

      // nxg-terminal-mid-only: only an existing wireless terminal MID.
      if (target.midType === 'terminal' && midInput.value.trim()) {
        const wrapper = document.createElement('div')
        wrapper.style.cssText = 'display:flex;gap:5px;align-items:center;min-width:0;width:100%;'
        midInput.replaceWith(wrapper)
        wrapper.appendChild(midInput)
        midInput.style.setProperty('flex', '1 1 0', 'important')
        midInput.style.setProperty('width', 'auto', 'important')
        midInput.style.setProperty('min-width', '0', 'important')
        const button = document.createElement('button')
        button.type = 'button'
        button.textContent = '직접 변경'
        button.style.cssText = 'flex:0 0 auto!important;width:auto!important;white-space:nowrap;padding:6px 9px;'
        wrapper.appendChild(button)
        button.onclick = async () => {
          if (button.disabled || saveButton?.disabled) return
          const expectedMid = midInput.value
          const entered = prompt('새 단말기 MID를 입력해주세요. MKEY는 변경되지 않습니다.', expectedMid)
          if (entered === null) return
          const newMid = entered.trim()
          if (!newMid || newMid === expectedMid) return
          if (!confirm('단말기 MID만 변경하시겠습니까?\n기존: ' + expectedMid + '\n신규: ' + newMid + '\n기존 결제내역은 수정하지 않습니다.')) return
          button.disabled = true
          if (saveButton) saveButton.disabled = true
          try {
            const result = await poolRequest({
              action: 'terminal_mid_only',
              merchant_id: merchantId,
              expected_mid: expectedMid,
              new_mid: newMid
            })
            midInput.value = String(result.mid)
            alert('단말기 MID 변경 완료')
          } catch (error) {
            alert(error instanceof Error ? error.message : '단말기 MID 변경 실패')
          } finally {
            button.disabled = false
            if (saveButton) saveButton.disabled = false
          }
        }
      }
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

      // 선택한 MID와 짝이 맞는 MKEY 표시
      mkeyInput!.value = pending?.mkey || ''

      mkeyInput!.placeholder = target.midType === 'terminal'
        ? (pending?.mkey ? 'MKEY 자동입력 완료' : 'MKEY 없음')
        : (pending ? 'MKEY 자동입력 완료' : 'MKEY 자동입력')

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

    updatePendingForCycle.push(() => {
      const pending = pendingByInput.get(midInput)

      if (
        pending &&
        pending.settlement_cycle !== readMerchantCycle()
      ) {
        pendingByInput.delete(midInput)
        renderPending()
        return true
      }

      renderPending()
      return false
    })

    async function openSelector() {
      if (!midInput || !mkeyInput) return
      if (saveButton?.disabled) return

      const selectedCycle = readMerchantCycle()

      if (!selectedCycle) {
        alert(
          '가맹점 정산주기는 1일, 3일, 4일, 7일 중 선택해주세요.\n' +
          '가맹점 정산주기를 먼저 선택해주세요.'
        )

        merchantCycleSelect?.focus()
        return
      }

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
        typeNames[target.midType] + ' MID / ' + selectedCycle + ' 정산 선택' +
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
          mid_type: target.midType,
          settlement_cycle: selectedCycle
        })

        items = (result.items || []).filter(
          (item: PoolItem) =>
            item.mid_type === target.midType &&
            item.settlement_cycle === selectedCycle &&
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

      submit.onclick = async () => {
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

        busy = true
        submit.disabled = true
        cancel.disabled = true
        select.disabled = true

        try {
          const preview = await poolRequest({
            action: 'preview',
            pool_id: selected.id,
            mid_type: target.midType,
            settlement_cycle: selectedCycle
          })

          const pair = preview.item

          if (
            !pair ||
            pair.id !== selected.id ||
            pair.mid_type !== target.midType ||
            pair.settlement_cycle !== selectedCycle ||
            pair.mid !== selected.mid ||
            typeof pair.mkey !== 'string' ||
            (target.midType !== 'terminal' && !pair.mkey)
          ) {
            throw new Error('MID / MKEY 정보가 일치하지 않습니다.')
          }

          if (readMerchantCycle() !== selectedCycle) {
            throw new Error('정산주기가 변경되었습니다. 다시 선택해주세요.')
          }

          if (!midInput.isConnected || !mkeyInput.isConnected) {
            dialog.close()
            return
          }

          // MID와 MKEY를 현재 화면에만 임시 입력
          // 아직 DB 저장 및 보관함 삭제하지 않음
          pendingByInput.set(midInput, {
            merchantId,
            pool_id: selected.id,
            mid_type: target.midType,
            slot: target.slot,
            mid: pair.mid,
            mkey: pair.mkey,
            settlement_cycle: selectedCycle
          })

          renderPending()
          dialog.close()

        } catch (error) {
          alert(
            error instanceof Error
              ? error.message
              : 'MID / MKEY 조회 실패'
          )

        } finally {
          busy = false
          submit.disabled = !select.value
          cancel.disabled = false
          select.disabled = items.length === 0
        }
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
