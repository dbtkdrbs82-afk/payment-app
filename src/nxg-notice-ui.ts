type Notice = {id:string;merchant_id:number|null;title:string;body:string;starts_at:string;ends_at:string;popup:boolean;link_url:string|null;updated_at:string}
const endpoint = '/api/nxg-notices'
const playUrl = 'https://play.google.com/store/apps/details?id=kr.co.nxgsoft.payment'
const dateText = (s:string) => new Date(s).toLocaleString('ko-KR',{timeZone:'Asia/Seoul'})
const kstInput = (d:Date) => new Date(d.getTime()+9*3600000).toISOString().slice(0,16)
const day = () => kstInput(new Date()).slice(0,10)
const btnCss = 'width:auto;min-height:42px;margin:0;padding:10px 14px;border:1px solid #d7e0eb;border-radius:9px;background:#174981;color:white;font:inherit;font-weight:700;cursor:pointer;white-space:normal;'
function button(text:string, fn:()=>void, secondary=false) {
  const b=document.createElement('button');b.type='button';b.textContent=text;b.style.cssText=btnCss+(secondary?'background:#eef3f9;color:#173758;':'');b.addEventListener('click',fn);return b
}
function node<K extends keyof HTMLElementTagNameMap>(tag:K,text='',style='') {const e=document.createElement(tag);e.textContent=text;e.style.cssText=style;return e}
function modal(id:string,title:string,closed?:()=>void) {
  document.getElementById(id)?.remove()
  const overlay=node('div','','position:fixed;inset:0;z-index:2147483600;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:14px;box-sizing:border-box;')
  overlay.id=id
  const panel=node('section','','width:100%;max-width:650px;max-height:90vh;max-height:90dvh;overflow:auto;overscroll-behavior:contain;background:white;color:#172033;border-radius:16px;padding:20px;box-sizing:border-box;text-align:left;font:16px/1.5 system-ui,sans-serif;box-shadow:0 12px 38px #0004;')
  panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-label',title)
  const top=node('div','','display:flex;gap:12px;align-items:center;justify-content:space-between;margin-bottom:14px;')
  const close=()=>{overlay.remove();closed?.()}
  top.append(node('h2',title,'font-size:22px;line-height:1.3;margin:0;color:#172033;'),button('닫기',close,true));panel.append(top);overlay.append(panel);document.body.append(overlay)
  return {panel,close}
}
async function api(action:string,payload:Record<string,unknown>={},url=endpoint,headers:Record<string,string>={}) {
  const response=await fetch(url,{method:'POST',credentials:'include',cache:'no-store',headers:{'Content-Type':'application/json',...headers},body:JSON.stringify({action,...payload})})
  const result=await response.json().catch(()=>null)
  if (!response.ok || result?.success!==true) throw Error(result?.message || '공지사항을 불러오지 못했습니다.')
  return result
}
const inputCss='display:block;width:100%;box-sizing:border-box;min-height:42px;font:inherit;color:#172033;background:white;border:1px solid #cbd5e1;border-radius:8px;padding:9px;margin:5px 0 12px;'
export function mountNxgNoticeAdmin() {
  const menu=document.querySelector('.admin-menu')
  if (!menu || document.getElementById('nxg-admin-notice-button')) return
  const b=button('공지사항',()=>void openAdmin())
  b.id='nxg-admin-notice-button';b.style.cssText+='margin:4px;align-self:center;';menu.append(b)
}
async function openAdmin() {
  const {panel}=modal('nxg-admin-notice-dialog','공지사항 관리')
  const status=node('p','','color:#536478;margin:8px 0;white-space:pre-wrap;')
  const form=node('form','','margin:0 0 18px;')
  const field=(label:string,control:HTMLElement)=>{const l=node('label',label,'display:block;font-weight:700;margin:0;');l.append(control);form.append(l);control.style.cssText=inputCss}
  const title=node('input');title.maxLength=120;title.required=true;field('제목',title)
  const body=node('textarea');body.rows=5;body.maxLength=5000;body.required=true;field('내용',body)
  const target=node('select');target.add(new Option('전체 가맹점','all'));target.add(new Option('특정 가맹점','one'));field('공지 대상',target)
  const picker=node('div','','display:none;border:1px solid #dbe3ee;padding:10px;border-radius:9px;margin-bottom:12px;')
  const search=node('input');search.placeholder='가맹점명 또는 MER0015';search.style.cssText=inputCss
  const results=node('select');results.style.cssText=inputCss;results.add(new Option('가맹점을 검색해 주세요',''))
  const searchBtn=button('가맹점 검색',()=>{void (async()=>{try{searchBtn.disabled=true;const r=await api('merchants',{q:search.value});results.replaceChildren(new Option('가맹점을 선택하세요',''));for(const m of r.merchants) results.add(new Option(m.merchant_name+' (MER'+String(m.id).padStart(4,'0')+')',String(m.id)));status.textContent=r.merchants.length?'':'검색 결과 없음'}catch(e){status.textContent=String((e as Error).message)}finally{searchBtn.disabled=false}})()},true)
  picker.append(search,searchBtn,results);form.append(picker)
  target.onchange=()=>{picker.style.display=target.value==='one'?'block':'none'}
  const starts=node('input');starts.type='datetime-local';starts.required=true;field('시작 (한국시간)',starts)
  const ends=node('input');ends.type='datetime-local';ends.required=true;field('종료 (한국시간)',ends)
  const mode=node('select');mode.add(new Option('일반 공지','list'));mode.add(new Option('홈 화면 팝업','popup'));field('표시 방식',mode)
  const link=node('input');link.type='url';link.placeholder='https://... (선택)';link.maxLength=1000;field('버튼 링크 (선택)',link)
  form.append(button('Google Play 업데이트 링크 넣기',()=>{link.value=playUrl},true))
  const actions=node('div','','display:flex;gap:10px;flex-wrap:wrap;margin:16px 0;')
  const save=button('공지 등록',()=>form.requestSubmit());let editId=''
  const reset=()=>{editId='';form.reset();starts.value=kstInput(new Date());ends.value=kstInput(new Date(Date.now()+7*86400000));picker.style.display='none';results.replaceChildren(new Option('가맹점을 검색해 주세요',''));save.textContent='공지 등록'}
  actions.append(save,button('새 공지 작성',reset,true));form.append(actions)
  const list=node('div');panel.append(form,status,node('h3','등록된 공지 (최근 100건)','margin:16px 0 10px;font-size:18px;'),list);reset()
  const reload=async()=>{
    const r=await api('list');list.replaceChildren()
    if(!r.notices.length) list.append(node('p','등록된 공지가 없습니다.'))
    for(const n of r.notices as Notice[]){
      const item=node('article','','padding:12px 0;border-top:1px solid #dbe3ee;')
      const active=Date.parse(n.starts_at)<=Date.now()&&Date.parse(n.ends_at)>Date.now()
      item.append(node('strong',n.title,'display:block;overflow-wrap:anywhere;'),node('p',(n.merchant_id==null?'전체 가맹점':'MER'+String(n.merchant_id).padStart(4,'0'))+' / '+(n.popup?'팝업':'일반')+' / '+(active?'게시 중':Date.parse(n.starts_at)>Date.now()?'예약':'종료'),'font-size:13px;color:#536478;margin:4px 0;'),node('p',dateText(n.starts_at)+' ~ '+dateText(n.ends_at),'font-size:13px;color:#536478;margin:4px 0 8px;'))
      const row=node('div','','display:flex;gap:8px;')
      row.append(button('수정',()=>{editId=n.id;title.value=n.title;body.value=n.body;target.value=n.merchant_id==null?'all':'one';picker.style.display=n.merchant_id==null?'none':'block';results.replaceChildren(new Option(n.merchant_id==null?'가맹점 검색':'MER'+String(n.merchant_id).padStart(4,'0'),n.merchant_id==null?'':String(n.merchant_id)));starts.value=kstInput(new Date(n.starts_at));ends.value=kstInput(new Date(n.ends_at));mode.value=n.popup?'popup':'list';link.value=n.link_url||'';save.textContent='수정 저장';panel.scrollTop=0},true),button('삭제',()=>{if(!confirm('이 공지를 삭제할까요?'))return;void (async()=>{try{await api('delete',{id:n.id});if(editId===n.id)reset();await reload();status.textContent='삭제 완료'}catch(e){status.textContent=(e as Error).message}})()},true));item.append(row);list.append(item)
    }
  }
  form.onsubmit=e=>{e.preventDefault();void(async()=>{try{if(target.value==='one'&&!results.value)throw Error('가맹점을 선택해주세요.');save.disabled=true;await api('save',{id:editId,title:title.value,body:body.value,merchant_id:target.value==='all'?null:Number(results.value),starts_at:new Date(starts.value+'+09:00').toISOString(),ends_at:new Date(ends.value+'+09:00').toISOString(),popup:mode.value==='popup',link_url:link.value});reset();await reload();status.textContent='저장 완료'}catch(e){status.textContent=(e as Error).message}finally{save.disabled=false}})()}
  try{await reload()}catch(e){status.textContent=(e as Error).message}
}
export function mountNxgMerchantNotices(root:HTMLElement,auth:()=>Promise<Record<string,string>>,update:()=>Promise<void>) {
  let data:Notice[]=[];let loading=false;let lastFetch=0;let autoReady=false
  const home=()=>location.pathname==='/merchant-app/home'&&!!sessionStorage.getItem('login_merchant_id')
  const key=(n:Notice)=>'nxg_notice_'+sessionStorage.getItem('login_merchant_id')+'_'+n.id+'_'+n.updated_at
  const safeGet=(store:Storage,k:string)=>{try{return store.getItem(k)}catch{return null}}
  const safeSet=(store:Storage,k:string,v:string)=>{try{store.setItem(k,v)}catch{/* storage unavailable */}}
  const openNotice=(n:Notice,auto=false)=>{
    if(!home()||document.getElementById('nxg-update-dialog'))return
    const {panel,close}=modal('nxg-merchant-notice-dialog','NXG PICK 공지사항',()=>safeSet(sessionStorage,key(n),'seen'))
    panel.append(node('h3',n.title,'margin:0 0 8px;font-size:20px;color:#172033;overflow-wrap:anywhere;'),node('p',n.body,'margin:0 0 16px;white-space:pre-wrap;overflow-wrap:anywhere;font-size:16px;color:#172033;'),node('p',dateText(n.starts_at),'font-size:13px;color:#64748b;'))
    if(n.link_url){try{const u=new URL(n.link_url);if(u.protocol==='https:'&&!u.username&&!u.password){const a=node('a',u.href===playUrl?'업데이트하기':'관련 링크 열기',btnCss+'display:block;text-align:center;text-decoration:none;margin:12px 0;');a.href=u.href;a.target='_blank';a.rel='noopener noreferrer';if(u.href===playUrl&&(window as any).Capacitor?.isNativePlatform?.()){a.addEventListener('click',e=>{e.preventDefault();void import('@capawesome/capacitor-app-update').then(m=>m.AppUpdate.openAppStore()).catch(()=>alert('Google Play를 열지 못했습니다.'))})}panel.append(a)}}catch{/* invalid link */}}
    if(auto)panel.append(button('오늘 하루 보지 않기',()=>{safeSet(localStorage,key(n),day());close()},true))
  }
  const openList=()=>{
    if(!home()||document.getElementById('nxg-update-dialog'))return
    const {panel}=modal('nxg-merchant-notice-dialog','NXG PICK 공지사항')
    if(!data.length)panel.append(node('p','현재 게시된 공지사항이 없습니다.'))
    for(const n of data){const b=button(n.title,()=>openNotice(n),true);b.style.cssText+='width:100%;text-align:left;white-space:normal;overflow-wrap:anywhere;margin-bottom:8px;';panel.append(b,node('p',dateText(n.starts_at),'font-size:13px;color:#64748b;margin:0 0 12px;'))}
  }
  const attach=()=>{
    if(!home())return
    const main=root.querySelector('.merchant-mobile-content');if(!main||root.querySelector('#nxg-notice-home'))return
    const bar=node('div','','padding:8px 0 12px;');bar.id='nxg-notice-home'
    const b=button('📢 공지사항',()=>{void refresh(true)},true);b.id='nxg-notice-button';b.style.cssText+='width:100%;text-align:left;';bar.append(b);main.prepend(bar);paint();maybePopup()
  }
  const paint=()=>{const b=root.querySelector<HTMLButtonElement>('#nxg-notice-button');if(b)b.textContent='📢 공지사항'+(data.length?' ('+data.length+')':'')}
  const maybePopup=()=>{
    if(!autoReady||!home()||document.getElementById('nxg-update-dialog')||document.getElementById('nxg-merchant-notice-dialog')||!root.querySelector('#nxg-notice-home'))return
    const n=data.find(x=>x.popup&&!safeGet(sessionStorage,key(x))&&safeGet(localStorage,key(x))!==day());if(n)openNotice(n,true)
  }
  const refresh=async(manual=false)=>{
    if(!home())return
    if(loading)return
    if(!manual&&Date.now()-lastFetch<10000){attach();return}
    loading=true
    try{
      if(!manual){autoReady=false;try{await update()}catch{/* Play check does not prevent notices */}}
      const native=!!(window as any).Capacitor?.isNativePlatform?.()
      const r=await api('read',{},native?'https://app.nxgsoft.co.kr'+endpoint:endpoint,await auth())
      if(!home())return
      data=r.notices;lastFetch=Date.now();attach();paint()
      if(manual){openList();return}
      // Update dialog has priority, do not overlap popups.
      autoReady=true;maybePopup()
    }catch(e){if(manual&&home()){const {panel}=modal('nxg-merchant-notice-dialog','공지사항');panel.append(node('p',(e as Error).message))}}finally{loading=false}
  }
  const observer=new MutationObserver(()=>{attach()});observer.observe(root,{childList:true});attach();void refresh()
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&home())void refresh()})
  return ()=>{if(home())void refresh()}
}
