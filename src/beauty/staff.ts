import { renderBeautyStaffRegister } from './staff/register'
import { renderBeautyStaffList } from './staff/list'

export async function renderBeautyStaff(
    app: HTMLElement,
    supabase: any
  ) {
    const merchantId =
      Number(sessionStorage.getItem('login_merchant_id'))
  
    const merchantName =
      sessionStorage.getItem('login_merchant_name') || ''
  
    if (!merchantId) {
      alert('로그인이 필요합니다.')
      location.href = '/merchant-login'
      return
    }
  
    const { data: staffList, error } = await supabase
  .from('beauty_staff')
  .select('*')
  .eq('merchant_id', merchantId)
  .order('id', { ascending: false })

  const today =
  new Date()

const monday =
  new Date(today)

const currentDay =
  today.getDay()

const mondayOffset =
  currentDay === 0
    ? -6
    : 1 - currentDay

monday.setDate(
  today.getDate() + mondayOffset
)

monday.setHours(
  0,
  0,
  0,
  0
)

const beautyWeekDates =
  Array.from(
    { length: 7 },
    (_, index) => {

      const date =
        new Date(monday)

      date.setDate(
        monday.getDate() + index
      )

      const dateValue =
        date.getFullYear() +
        '-' +
        String(
          date.getMonth() + 1
        ).padStart(2, '0') +
        '-' +
        String(
          date.getDate()
        ).padStart(2, '0')

      return {
        dateValue,

        dayLabel:
          [
            '월',
            '화',
            '수',
            '목',
            '금',
            '토',
            '일'
          ][index],

        dateLabel:
          String(
            date.getMonth() + 1
          ) +
          '/' +
          String(
            date.getDate()
          )
      }
    }
  )

const beautyWeekRangeText =
  beautyWeekDates[0].dateLabel +
  ' ~ ' +
  beautyWeekDates[6].dateLabel
  
    if (error) {
      alert('직원 목록 조회 실패: ' + error.message)
    }
  
    app.innerHTML = `
      <div class="pg-admin-page">
  
        <div class="merchant-pick-header">
          <h1>직원관리</h1>
  
          <div class="merchant-user-box">
            <strong>${merchantName}님</strong>
            <button id="merchant-staff-logout">로그아웃</button>
          </div>
        </div>
  
        <div class="merchant-toolbar">
          <button id="staff-go-admin">주문관리</button>
          <button id="staff-go-service">서비스관리</button>
          <button id="staff-go-staff">직원관리</button>
          <button id="staff-go-qr">PICK QR</button>
        </div>
  
        <div class="payment-card beauty-staff-page-card">

  <div
    class="
      merchant-product-layout
      beauty-staff-main-layout
    "
  >

    <div
      id="beauty-staff-register-area"
    ></div>


    <div class="beauty-staff-work-area">

      <div
        id="beauty-staff-list-area"
      ></div>


      <div
        id="beauty-staff-weekly-area"
      >

        <div class="beauty-staff-weekly-card">

          <div class="beauty-staff-weekly-head">

            <div>
              <h2>주간 근무표</h2>

              <p>
                ${beautyWeekRangeText}
              </p>
            </div>

          </div>


          <div class="beauty-staff-weekly-scroll">

            <div class="beauty-staff-weekly-grid">

              <div
                class="
                  beauty-staff-weekly-header
                  beauty-staff-weekly-name-header
                "
              >
                직원
              </div>


              ${beautyWeekDates
                .map((date) => `
                  <div
                    class="beauty-staff-weekly-header"
                  >
                    <strong>
                      ${date.dayLabel}
                    </strong>

                    <span>
                      ${date.dateLabel}
                    </span>
                  </div>
                `)
                .join('')}


              ${(staffList || [])
  .map((staff: any) => `

                  <div
                    class="beauty-staff-weekly-staff"
                  >
                    <strong>
                      ${staff.staff_name || '이름 없음'}
                    </strong>

                    <span>
                      ${staff.position || ''}
                    </span>
                  </div>


                  ${beautyWeekDates
                    .map((date) => `
                      <button
                        type="button"
                        class="beauty-staff-weekly-work-button"
                        data-staff-id="${staff.id}"
                        data-date="${date.dateValue}"
                      >
                        근무
                      </button>
                    `)
                    .join('')}

                `)
                .join('')}

            </div>

          </div>


          ${
            (staffList || []).length === 0
              ? `
                <div class="beauty-staff-weekly-empty">
                  등록된 직원이 없습니다.
                </div>
              `
              : ''
          }

        </div>

      </div>

    </div>

  </div>

</div>
  
      </div>
    `
    const staffRegisterArea =
    document.getElementById(
      'beauty-staff-register-area'
    )
  
  if (staffRegisterArea) {
    renderBeautyStaffRegister(
      staffRegisterArea,
      supabase,
      merchantId
    )
  }

  const staffListArea =
  document.getElementById(
    'beauty-staff-list-area'
  )

if (staffListArea) {
  renderBeautyStaffList(
    staffListArea,
    staffList || []
  )
}

    document.querySelector('#staff-go-admin')
      ?.addEventListener('click', () => {
        location.href = '/merchant-admin'
      })
  
      document.querySelector('#staff-go-service')
      ?.addEventListener('click', () => {
        location.href = '/merchant-product'
      })
  
    document.querySelector('#staff-go-staff')
      ?.addEventListener('click', () => {
        location.href = '/merchant-staff'
      })
  
    document.querySelector('#staff-go-qr')
      ?.addEventListener('click', () => {
        location.href = '/merchant-qr'
      })
  
    document.querySelector('#merchant-staff-logout')
      ?.addEventListener('click', () => {
        sessionStorage.removeItem('login_merchant_id')
        sessionStorage.removeItem('login_merchant_name')
        sessionStorage.removeItem('login_merchant_code')
        sessionStorage.removeItem('login_merchant_type')
  
        location.href = '/merchant-login'
      })
  }