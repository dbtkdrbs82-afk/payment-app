export function renderBeautyStaffList(
    container: HTMLElement,
    staffList: any[]
  ) {
    const staffItems = staffList || []
  
    const workingCount =
      staffItems.filter(
        (staff) =>
          (staff.status || '근무중') === '근무중'
      ).length
  
    container.innerHTML = `
      <div class="product-list-card">
        <h2>등록된 직원</h2>
  
        <div class="product-summary-row">
          <span>총 직원 : ${staffItems.length}명</span>
          <span>근무중 : ${workingCount}명</span>
          <span>
            근무중지 :
            ${staffItems.length - workingCount}명
          </span>
        </div>
  
        <div id="beauty-staff-card-list"></div>
      </div>
    `
  
    const cardList =
      container.querySelector<HTMLDivElement>(
        '#beauty-staff-card-list'
      )
  
    if (!cardList) return
  
    if (staffItems.length === 0) {
      cardList.innerHTML = `
        <div
          style="
            padding:60px 20px;
            text-align:center;
            color:#64748b;
          "
        >
          등록된 직원이 없습니다.
        </div>
      `
      return
    }
  
    cardList.innerHTML =
      staffItems
        .map((staff) => {
          const staffName =
            staff.staff_name || '이름 없음'
  
          const position =
            staff.position || '직급 없음'
  
          const photoUrl =
            staff.photo_url || ''
  
          const status =
            staff.status || '근무중'
  
          const statusClass =
            status === '근무중'
              ? 'product-on'
              : 'product-off'
  
          const photoHtml =
            photoUrl
              ? `
                <img
                  src="${photoUrl}"
                  alt="${staffName}"
                  style="
                    width:120px;
                    height:120px;
                    border-radius:16px;
                    object-fit:cover;
                    flex-shrink:0;
                  "
                />
              `
              : `
                <div
                  style="
                    width:120px;
                    height:120px;
                    border-radius:16px;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    background:#f1f5f9;
                    color:#64748b;
                    flex-shrink:0;
                  "
                >
                  사진 없음
                </div>
              `
  
          return `
            <div
              class="product-item-card"
              style="
                display:flex;
                align-items:center;
                gap:20px;
              "
            >
              ${photoHtml}
  
              <div class="product-info">
                <h3 style="margin:0 0 8px;">
                  ${staffName}
                </h3>
  
                <p style="margin:0 0 12px;">
                  ${position}
                </p>
  
                <span class="${statusClass}">
  ${status}
</span>
</div>

<button
  type="button"
  class="beauty-staff-schedule-button"
  data-staff-id="${staff.id}"
  style="
    margin-left:auto;
    padding:10px 16px;
    border:0;
    border-radius:8px;
    background:#1d4ed8;
    color:#ffffff;
    font-size:14px;
    font-weight:700;
    cursor:pointer;
    white-space:nowrap;
  "
>
  스케줄관리
</button>

</div>
          `
        })
        .join('')

        cardList
  .querySelectorAll<HTMLButtonElement>(
    '.beauty-staff-schedule-button'
  )
  .forEach((button) => {

    button.addEventListener(
      'click',
      () => {

        const staffId =
          button.dataset.staffId

        if (!staffId) {
          return
        }

        location.href =
          '/merchant-beauty-schedule?staff_id=' +
          encodeURIComponent(staffId)
      }
    )
  })
  }