type MerchantChoice = {
  id: number
  name: string
  amount: number
  count: number
}

export function selectPayoutMerchants(
  items: MerchantChoice[],
  actionLabel: string
): Promise<Set<number> | null> {
  return new Promise((resolve) => {
    const dialog = document.createElement('dialog')
    dialog.style.cssText =
      'width:min(94vw,560px);max-height:85vh;overflow:auto;' +
      'padding:20px;border:1px solid #ccc;border-radius:12px;' +
      'background:white;color:#222'

    const title = document.createElement('h3')
    title.textContent = '출금대상 가맹점 선택'
    dialog.appendChild(title)

    const allLabel = document.createElement('label')
    allLabel.style.cssText = 'display:flex;gap:8px;padding:12px;font-weight:bold'
    const allBox = document.createElement('input')
    allBox.type = 'checkbox'
    allLabel.append(allBox, document.createTextNode('전체선택'))
    dialog.appendChild(allLabel)

    const summary = document.createElement('div')
    summary.style.cssText =
      'padding:12px;background:#eef4ff;border-radius:8px;' +
      'font-weight:bold;margin:8px 0 12px;line-height:1.8'
    summary.setAttribute('aria-live', 'polite')
    dialog.appendChild(summary)

    const list = document.createElement('div')
    list.style.cssText = 'max-height:48vh;overflow:auto;border-top:1px solid #ddd'
    const boxes: Array<{ id: number; input: HTMLInputElement }> = []

    items.forEach((item) => {
      const label = document.createElement('label')
      label.style.cssText =
        'display:flex;gap:10px;align-items:center;' +
        'padding:10px;border-bottom:1px solid #eee'

      const input = document.createElement('input')
      input.type = 'checkbox'

      const detail = document.createElement('span')
      detail.textContent =
        'MER' + String(item.id).padStart(4, '0') +
        ' / ' + item.name +
        ' / ' + item.count + '건 / ' +
        item.amount.toLocaleString('ko-KR') + '원'

      label.append(input, detail)
      list.appendChild(label)
      boxes.push({ id: item.id, input })
    })

    dialog.appendChild(list)

    const footer = document.createElement('div')
    footer.style.cssText =
      'display:flex;justify-content:flex-end;gap:10px;margin-top:16px'

    const cancel = document.createElement('button')
    cancel.textContent = '취소'

    const ok = document.createElement('button')
    ok.textContent = actionLabel
    ok.disabled = true

    footer.append(cancel, ok)
    dialog.appendChild(footer)

    const refresh = () => {
      const selectedIds = new Set(
        boxes.filter((x) => x.input.checked).map((x) => x.id)
      )

      const chosen = items.filter((x) => selectedIds.has(x.id))
      const count = chosen.length
      const paymentCount = chosen.reduce((sum, x) => sum + x.count, 0)
      const amount = chosen.reduce((sum, x) => sum + x.amount, 0)

      summary.textContent =
        '전체 ' + items.length + '곳 / 선택 ' + count + '곳' +
        ' / 결제 ' + paymentCount.toLocaleString('ko-KR') + '건' +
        ' / 선택금액 ' + amount.toLocaleString('ko-KR') + '원'

      allBox.checked = count === boxes.length
      allBox.indeterminate = count > 0 && count < boxes.length
      ok.disabled = count === 0
      ok.textContent = actionLabel + ' (' + count + '곳)'
    }

    allBox.onchange = () => {
      boxes.forEach((x) => { x.input.checked = allBox.checked })
      refresh()
    }

    boxes.forEach((x) => { x.input.onchange = refresh })
    refresh()

    let result: Set<number> | null = null

    cancel.onclick = () => dialog.close()
    ok.onclick = () => {
      result = new Set(
        boxes.filter((x) => x.input.checked).map((x) => x.id)
      )
      dialog.close()
    }

    dialog.onclose = () => {
      dialog.remove()
      resolve(result)
    }

    document.body.appendChild(dialog)
    dialog.showModal()
  })
}