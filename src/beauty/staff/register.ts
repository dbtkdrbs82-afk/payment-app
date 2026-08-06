export function renderBeautyStaffRegister(
    container: HTMLElement,
    supabase: any,
    merchantId: number
  ) {
    container.innerHTML = `
      <div class="product-create-card">
        <h2>직원 등록</h2>
  
        <div class="input-group">
          <label>직원 사진</label>
  
          <input
            id="beauty-staff-photo"
            type="file"
            accept="image/*"
          />
  
          <div
            id="beauty-staff-photo-preview"
            style="
              width:160px;
              height:160px;
              margin-top:12px;
              border:1px dashed #cbd5e1;
              border-radius:16px;
              display:flex;
              align-items:center;
              justify-content:center;
              overflow:hidden;
              background:#f8fafc;
              color:#64748b;
            "
          >
            사진 미리보기
          </div>
        </div>
  
        <div class="input-group">
          <label>직원명</label>
          <input
            id="beauty-staff-name"
            placeholder="예: 김민지"
          />
        </div>
  
        <div class="input-group">
          <label>직급</label>
          <select id="beauty-staff-position">
            <option value="원장">원장</option>
            <option value="실장">실장</option>
            <option value="디자이너" selected>디자이너</option>
            <option value="네일리스트">네일리스트</option>
            <option value="관리사">관리사</option>
            <option value="타투이스트">타투이스트</option>
            <option value="기타">기타</option>
          </select>
        </div>
  
        <button id="beauty-staff-create">
          직원 등록
        </button>
      </div>
    `
  
    const photoInput =
      document.getElementById(
        'beauty-staff-photo'
      ) as HTMLInputElement
  
    const preview =
      document.getElementById(
        'beauty-staff-photo-preview'
      ) as HTMLDivElement
  
    photoInput.addEventListener('change', () => {
      const file = photoInput.files?.[0]
  
      if (!file) {
        preview.innerHTML = '사진 미리보기'
        return
      }
  
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 선택할 수 있습니다.')
        photoInput.value = ''
        preview.innerHTML = '사진 미리보기'
        return
      }
  
      const previewUrl = URL.createObjectURL(file)
  
      preview.innerHTML = `
        <img
          src="${previewUrl}"
          alt="직원 사진 미리보기"
          style="
            width:100%;
            height:100%;
            object-fit:cover;
          "
        />
      `
    })
  
    document.querySelector('#beauty-staff-create')
      ?.addEventListener('click', async () => {
        const staffName =
          (
            document.getElementById(
              'beauty-staff-name'
            ) as HTMLInputElement
          ).value.trim()
  
        const position =
          (
            document.getElementById(
              'beauty-staff-position'
            ) as HTMLSelectElement
          ).value
  
        const photoFile =
          photoInput.files?.[0]
  
        if (!staffName) {
          alert('직원명을 입력해주세요.')
          return
        }
  
        if (!photoFile) {
          alert('직원 사진을 선택해주세요.')
          return
        }
  
        const createButton =
          document.getElementById(
            'beauty-staff-create'
          ) as HTMLButtonElement
  
        createButton.disabled = true
        createButton.textContent = '등록 중...'
  
        const extension =
          photoFile.name
            .split('.')
            .pop()
            ?.toLowerCase() || 'jpg'
  
        const filePath =
          merchantId +
          '/' +
          Date.now() +
          '-' +
          crypto.randomUUID() +
          '.' +
          extension
  
        const { error: uploadError } =
          await supabase.storage
            .from('beauty-staff')
            .upload(
              filePath,
              photoFile,
              {
                cacheControl: '3600',
                upsert: false
              }
            )
  
        if (uploadError) {
          alert(
            '직원 사진 업로드 실패: ' +
            uploadError.message
          )
  
          createButton.disabled = false
          createButton.textContent = '직원 등록'
          return
        }
  
        const { data: publicUrlData } =
          supabase.storage
            .from('beauty-staff')
            .getPublicUrl(filePath)
  
        const photoUrl =
          publicUrlData.publicUrl
  
        const { error: insertError } =
          await supabase
            .from('beauty_staff')
            .insert({
              merchant_id: merchantId,
              staff_name: staffName,
              position: position,
              photo_url: photoUrl,
              phone: '',
              work_start: '10:00',
              work_end: '19:00',
              break_start: null,
              break_end: null,
              off_days: [],
              status: '근무중'
            })
  
        if (insertError) {
          await supabase.storage
            .from('beauty-staff')
            .remove([filePath])
  
          alert(
            '직원 등록 실패: ' +
            insertError.message
          )
  
          createButton.disabled = false
          createButton.textContent = '직원 등록'
          return
        }
  
        alert('직원이 등록되었습니다.')
        location.reload()
      })
  }