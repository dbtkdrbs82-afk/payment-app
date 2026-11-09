var e=`nxg_pick_multi_orders_v1`,t=10800*1e3,n=30;function r(){try{let r=JSON.parse(localStorage.getItem(e)||`[]`);if(!Array.isArray(r))return[];let i=Date.now();return r.filter(e=>typeof e==`object`&&!!e&&typeof e.merchantId==`string`&&typeof e.merchantName==`string`&&typeof e.pgOrderId==`string`&&typeof e.orderNumber==`string`&&typeof e.savedAt==`number`&&Number.isFinite(e.savedAt)&&e.savedAt<=i&&i-e.savedAt<t).slice(-n)}catch{return[]}}function i(t){if(!t.merchantId||!t.pgOrderId||!t.orderNumber)return!1;try{let i=r().filter(e=>e.merchantId!==t.merchantId||e.pgOrderId!==t.pgOrderId);return i.push({...t,savedAt:Date.now()}),localStorage.setItem(e,JSON.stringify(i.slice(-n))),!0}catch{return!1}}function a(){try{let e=localStorage.getItem(`nxg_last_kiosk_order`);if(!e)return null;let t=JSON.parse(e);return!t||!t.merchantId||!t.pgOrderId||!t.orderNumber?null:{merchantId:String(t.merchantId),pgOrderId:String(t.pgOrderId),orderNumber:String(t.orderNumber)}}catch{return null}}function o(){return r().sort((e,t)=>t.savedAt-e.savedAt).slice(0,10)}function s(e){let n=o().filter(t=>t.pgOrderId!==e).slice(0,9);if(n.length===0)return null;let r=document.createElement(`section`);r.id=`nxg-pick-other-orders`,r.style.cssText=`
    width:100%;
    margin:0;
    padding:0;
    border:0;
    background:transparent;
    text-align:left;
  `;let i=document.createElement(`style`);i.textContent=`
    #nxg-pick-other-orders .nxg-pick-other-stop {
  grid-column: 2;
  grid-row: 2;
  justify-self: end;
  align-self: start;
  margin-top: 0;
  background: #174981 !important;
}

  `,r.appendChild(i);let a=document.createElement(`div`);return a.style.cssText=`
    width:100%;
    max-height:420px;
    overflow-y:auto;
  `,n.forEach(e=>{let n=document.createElement(`div`);n.className=`nxg-pick-other-row`,n.dataset.nxgOrderId=e.pgOrderId,n.dataset.nxgMerchantId=e.merchantId,n.style.cssText=`
      display:grid;
      grid-template-columns:minmax(0,1fr) auto;
      align-items:center;
      column-gap:12px;
      row-gap:8px;
      padding:18px 6px;
      border-bottom:1px solid #e5e7eb;
    `;let r=document.createElement(`span`);r.textContent=e.merchantName||`가맹점 ${e.merchantId}`,r.style.cssText=`
      min-width:0;
      font-size:18px;
      font-weight:800;
      color:#222222;
      overflow-wrap:anywhere;
    `;let i=document.createElement(`strong`);i.textContent=`${e.orderNumber}번`,i.style.cssText=`
      max-width:150px;
      text-align:right;
      font-size:16px;
      font-weight:800;
      line-height:1.5;
      color:#c9a23b;
    `,r.style.gridColumn=`1`,r.style.gridRow=`1`,i.style.gridColumn=`2`,i.style.gridRow=`1`;let o=document.createElement(`span`);o.className=`nxg-pick-other-status`,o.textContent=`상품을 준비하고 있습니다. 잠시만 기다려주세요.`,o.style.cssText=`
      grid-column:1;
      grid-row:2;
      font-size:13px;
      line-height:1.5;
      color:#6b7280;
    `,n.appendChild(r),n.appendChild(o),n.appendChild(i),a.appendChild(n);let s=e.savedAt+t,c=()=>{Date.now()<s||(n.remove(),document.removeEventListener(`visibilitychange`,c))};window.setTimeout(c,Math.max(0,s-Date.now())),document.addEventListener(`visibilitychange`,c)}),r.appendChild(a),r}function c(e,t,n,r){if(e.payment_status!==`결제완료`||String(e.merchant_id)!==t||String(e.pg_order_id)!==r)return!1;let a=String(e.call_number||e.order_no||``);return a?i({merchantId:t,merchantName:n,pgOrderId:r,orderNumber:a}):!1}function l(){if(window.location.pathname!==`/success`)return;let e=new URLSearchParams(window.location.search);if(e.get(`source`)!==`kiosk`)return;let t=String(e.get(`orderId`)||``).replace(/[^a-zA-Z0-9]/g,``);if(!t)return;let n=document.querySelector(`#customer-alert-enable`);if(!n)return;let r=n.closest(`.payment-card`);if(!r||r.querySelector(`#nxg-pick-other-orders`))return;let i=s(t);if(!i)return;let a=r.querySelector(`#receipt-view-btn`);a?r.insertBefore(i,a):r.appendChild(i)}export{l as a,o as i,a as n,i as o,r,c as s,s as t};