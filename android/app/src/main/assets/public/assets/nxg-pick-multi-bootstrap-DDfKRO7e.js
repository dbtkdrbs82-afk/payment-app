const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/nxg-pick-verified-order-wXrITI8E.js","assets/nxg-pick-verified-order-vJpoP9ef.js","assets/preload-helper-DSXbuxSR.js","assets/dist-U4vKvSEI.js","assets/nxg-pick-multi-orders-DCHnCmdm.js"])))=>i.map(i=>d[i]);
import{t as e}from"./preload-helper-DSXbuxSR.js";import{a as t,i as n}from"./nxg-pick-multi-orders-DCHnCmdm.js";import{i as r,n as i,r as a}from"./nxg-pick-verified-order-vJpoP9ef.js";function o(){let o=new URLSearchParams(window.location.search);if(window.location.pathname!==`/success`||o.get(`source`)!==`kiosk`||!o.get(`orderId`))return;let s=document.getElementById(`app`);if(!s)return;let c=!1,l=async()=>{if(!(c||!s.querySelector(`#customer-alert-enable`))){c=!0,u.disconnect();try{if(!await i())return;t();let o=document.querySelector(`.nxg-pick-compact .payment-card`);if(o&&!o.querySelector(`#nxg-pick-unified`)){let t=o.querySelector(`.order-number-title`),r=o.querySelector(`.order-number-box`),i=o.querySelector(`.order-wait-message`),a=o.querySelector(`#customer-alert-enable`),s=o.querySelector(`#receipt-view-btn`);if(t&&r&&i&&a&&s){let c=new URLSearchParams(location.search),l=String(c.get(`orderId`)||``).replace(/[^a-zA-Z0-9]/g,``),u=n().find(e=>e.pgOrderId===l),d=document.createElement(`section`);d.id=`nxg-pick-unified`,d.style.cssText=`
            width:100%;
            margin:12px 0;
            text-align:left;
          `,o.insertBefore(d,s),d.appendChild(a);let f=document.createElement(`div`);f.style.cssText=`
            display:grid;
            grid-template-columns:minmax(0,1fr) auto;
            align-items:center;
            gap:14px;
            padding:20px 6px;
            border-bottom:1px solid #e5e7eb;
          `;let p=document.createElement(`div`);p.style.minWidth=`0`;let m=document.createElement(`div`);m.textContent=u?.merchantName||c.get(`merchantName`)||`현재 매장`,m.style.cssText=`
            font-size:19px;
            font-weight:800;
            color:#222;
            margin-bottom:8px;
            overflow-wrap:anywhere;
          `,p.appendChild(m),p.appendChild(i),i.style.setProperty(`font-size`,`14px`,`important`),i.style.setProperty(`text-align`,`left`,`important`);let h=document.createElement(`div`);h.style.cssText=`
            display:flex;
            align-items:center;
            gap:6px;
            white-space:nowrap;
          `,t.style.setProperty(`font-size`,`13px`,`important`),t.style.setProperty(`margin`,`0`,`important`),r.style.setProperty(`font-size`,`26px`,`important`),r.style.setProperty(`margin`,`0`,`important`),r.style.setProperty(`padding`,`0`,`important`),r.style.setProperty(`background`,`transparent`,`important`),r.style.setProperty(`color`,`#16a34a`,`important`);let g=document.createElement(`div`);g.style.cssText=`
  display:flex;
  align-items:center;
  justify-content:flex-end;
  gap:6px;
`,g.appendChild(t),g.appendChild(r),h.style.flexDirection=`column`,h.style.alignItems=`flex-end`,h.appendChild(g);let _=o.querySelector(`#customer-vibration-stop`);if(_){_.textContent=`알림 끄기`,_.style.width=`auto`,_.style.fontSize=`13px`,_.style.background=`#174981`,_.style.setProperty(`padding`,`8px 12px`,`important`),_.style.setProperty(`margin-top`,`6px`,`important`),h.appendChild(_);let e=document.createElement(`style`);e.textContent=`
    #nxg-pick-unified #customer-vibration-stop,
    #nxg-pick-unified .nxg-pick-other-stop {
      width:100px !important;
      min-height:38px !important;
      padding:8px 10px !important;
      font-size:14px !important;
      font-weight:700 !important;
      line-height:1.4 !important;
      border-radius:8px !important;
      background:#174981 !important;
      color:#ffffff !important;
      box-sizing:border-box !important;
      white-space:nowrap !important;
      text-align:center !important;
    }
  `,d.appendChild(e)}f.appendChild(p),f.appendChild(h),d.appendChild(f),m.style.fontSize=`18px`,t.style.setProperty(`font-size`,`18px`,`important`),r.style.setProperty(`font-size`,`18px`,`important`);let v=document.createElement(`style`);v.textContent=`
            #nxg-pick-unified .nxg-pick-other-row strong {
              font-size:18px !important;
            }

            #nxg-pick-unified .nxg-pick-other-status {
              font-size:14px !important;
              line-height:1.5 !important;
            }
          `,d.appendChild(v);let y=document.createElement(`div`);y.style.cssText=`
            font-size:14px;
            line-height:1.5;
            font-weight:500;
            color:#6b7280;
          `,p.appendChild(y);let b=!1,x=async()=>{if(!(b||document.visibilityState!==`visible`)){b=!0;try{let{getNxgPickCurrentOrderStatus:t}=await e(async()=>{let{getNxgPickCurrentOrderStatus:e}=await import(`./nxg-pick-verified-order-wXrITI8E.js`);return{getNxgPickCurrentOrderStatus:e}},__vite__mapDeps([0,1,2,3,4])),n=await t();if(n===null)return;let r=n===`완료`;y.textContent=r?`상품이 준비되었습니다. 픽업해주세요.`:`잠시만 기다려주세요.`,y.style.color=r?`#16a34a`:`#6b7280`,y.style.fontWeight=r?`800`:`500`,i.style.display=`none`}catch(e){console.error(`현재 주문 상태 표시 오류:`,e)}finally{b=!1}}};x(),window.setInterval(()=>{x()},5e3);let S=document.getElementById(`nxg-pick-other-orders`);S&&d.appendChild(S);let C=o.querySelector(`h1`);C&&(C.style.display=`none`);let w=o.querySelector(`.payment-amount`);w&&(w.style.display=`none`)}}if(!document.getElementById(`nxg-pick-other-orders`))return;a(),r(),window.setInterval(()=>{document.visibilityState===`visible`&&document.getElementById(`nxg-pick-other-orders`)&&r()},5e3)}catch(e){console.error(`NXG PICK 다중 주문 실행 오류:`,e)}}},u=new MutationObserver(()=>{l()});u.observe(s,{childList:!0,subtree:!0}),l()}export{o as startNxgPickMultiOrders};