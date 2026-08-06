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
  
        <div class="payment-card">
          <h2>직원관리 연결 완료</h2>
  
          <p>
            등록된 직원:
            ${(staffList || []).length}명
          </p>
  
          <p>
            다음 단계에서 직원 사진과 이름 등록 기능을 연결합니다.
          </p>
        </div>
  
      </div>
    `
  
    document.querySelector('#staff-go-admin')
      ?.addEventListener('click', () => {
        location.href = '/merchant-admin'
      })
  
    document.querySelector('#staff-go-service')
      ?.addEventListener('click', () => {
        location.href = '/merchant-service'
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