const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/buffer-CrNaw1tJ.js","assets/buffer-C4l1YQ12.js","assets/chunk-jRWAZmH_.js","assets/lib-DjzcyrWH.js"])))=>i.map(i=>d[i]);
import{a as e,i as t,n,o as r,r as i,t as a}from"./chunk-jRWAZmH_.js";import{t as o}from"./preload-helper-DSXbuxSR.js";import{n as s,r as c,t as l}from"./browser-F7CVyOIs.js";var u=a(((e,t)=>{var n=function(e){var t=Object.prototype,n=t.hasOwnProperty,r=Object.defineProperty||function(e,t,n){e[t]=n.value},i,a=typeof Symbol==`function`?Symbol:{},o=a.iterator||`@@iterator`,s=a.asyncIterator||`@@asyncIterator`,c=a.toStringTag||`@@toStringTag`;function l(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{l({},``)}catch{l=function(e,t,n){return e[t]=n}}function u(e,t,n,i){var a=t&&t.prototype instanceof _?t:_,o=Object.create(a.prototype);return r(o,`_invoke`,{value:E(e,n,new A(i||[]))}),o}e.wrap=u;function d(e,t,n){try{return{type:`normal`,arg:e.call(t,n)}}catch(e){return{type:`throw`,arg:e}}}var f=`suspendedStart`,p=`suspendedYield`,m=`executing`,h=`completed`,g={};function _(){}function v(){}function y(){}var b={};l(b,o,function(){return this});var x=Object.getPrototypeOf,S=x&&x(x(j([])));S&&S!==t&&n.call(S,o)&&(b=S);var C=y.prototype=_.prototype=Object.create(b);v.prototype=y,r(C,`constructor`,{value:y,configurable:!0}),r(y,`constructor`,{value:v,configurable:!0}),v.displayName=l(y,c,`GeneratorFunction`);function w(e){[`next`,`throw`,`return`].forEach(function(t){l(e,t,function(e){return this._invoke(t,e)})})}e.isGeneratorFunction=function(e){var t=typeof e==`function`&&e.constructor;return t?t===v||(t.displayName||t.name)===`GeneratorFunction`:!1},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,y):(e.__proto__=y,l(e,c,`GeneratorFunction`)),e.prototype=Object.create(C),e},e.awrap=function(e){return{__await:e}};function T(e,t){function i(r,a,o,s){var c=d(e[r],e,a);if(c.type===`throw`)s(c.arg);else{var l=c.arg,u=l.value;return u&&typeof u==`object`&&n.call(u,`__await`)?t.resolve(u.__await).then(function(e){i(`next`,e,o,s)},function(e){i(`throw`,e,o,s)}):t.resolve(u).then(function(e){l.value=e,o(l)},function(e){return i(`throw`,e,o,s)})}}var a;function o(e,n){function r(){return new t(function(t,r){i(e,n,t,r)})}return a=a?a.then(r,r):r()}r(this,`_invoke`,{value:o})}w(T.prototype),l(T.prototype,s,function(){return this}),e.AsyncIterator=T,e.async=function(t,n,r,i,a){a===void 0&&(a=Promise);var o=new T(u(t,n,r,i),a);return e.isGeneratorFunction(n)?o:o.next().then(function(e){return e.done?e.value:o.next()})};function E(e,t,n){var r=f;return function(i,a){if(r===m)throw Error(`Generator is already running`);if(r===h){if(i===`throw`)throw a;return M()}for(n.method=i,n.arg=a;;){var o=n.delegate;if(o){var s=D(o,n);if(s){if(s===g)continue;return s}}if(n.method===`next`)n.sent=n._sent=n.arg;else if(n.method===`throw`){if(r===f)throw r=h,n.arg;n.dispatchException(n.arg)}else n.method===`return`&&n.abrupt(`return`,n.arg);r=m;var c=d(e,t,n);if(c.type===`normal`){if(r=n.done?h:p,c.arg===g)continue;return{value:c.arg,done:n.done}}else c.type===`throw`&&(r=h,n.method=`throw`,n.arg=c.arg)}}}function D(e,t){var n=t.method,r=e.iterator[n];if(r===i)return t.delegate=null,n===`throw`&&e.iterator.return&&(t.method=`return`,t.arg=i,D(e,t),t.method===`throw`)||n!==`return`&&(t.method=`throw`,t.arg=TypeError(`The iterator does not provide a '`+n+`' method`)),g;var a=d(r,e.iterator,t.arg);if(a.type===`throw`)return t.method=`throw`,t.arg=a.arg,t.delegate=null,g;var o=a.arg;if(!o)return t.method=`throw`,t.arg=TypeError(`iterator result is not an object`),t.delegate=null,g;if(o.done)t[e.resultName]=o.value,t.next=e.nextLoc,t.method!==`return`&&(t.method=`next`,t.arg=i);else return o;return t.delegate=null,g}w(C),l(C,c,`Generator`),l(C,o,function(){return this}),l(C,`toString`,function(){return`[object Generator]`});function O(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function k(e){var t=e.completion||{};t.type=`normal`,delete t.arg,e.completion=t}function A(e){this.tryEntries=[{tryLoc:`root`}],e.forEach(O,this),this.reset(!0)}e.keys=function(e){var t=Object(e),n=[];for(var r in t)n.push(r);return n.reverse(),function e(){for(;n.length;){var r=n.pop();if(r in t)return e.value=r,e.done=!1,e}return e.done=!0,e}};function j(e){if(e){var t=e[o];if(t)return t.call(e);if(typeof e.next==`function`)return e;if(!isNaN(e.length)){var r=-1,a=function t(){for(;++r<e.length;)if(n.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=i,t.done=!0,t};return a.next=a}}return{next:M}}e.values=j;function M(){return{value:i,done:!0}}return A.prototype={constructor:A,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=i,this.done=!1,this.delegate=null,this.method=`next`,this.arg=i,this.tryEntries.forEach(k),!e)for(var t in this)t.charAt(0)===`t`&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=i)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if(e.type===`throw`)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function r(n,r){return s.type=`throw`,s.arg=e,t.next=n,r&&(t.method=`next`,t.arg=i),!!r}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],s=o.completion;if(o.tryLoc===`root`)return r(`end`);if(o.tryLoc<=this.prev){var c=n.call(o,`catchLoc`),l=n.call(o,`finallyLoc`);if(c&&l){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else if(l){if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else throw Error(`try statement without catch or finally`)}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r];if(i.tryLoc<=this.prev&&n.call(i,`finallyLoc`)&&this.prev<i.finallyLoc){var a=i;break}}a&&(e===`break`||e===`continue`)&&a.tryLoc<=t&&t<=a.finallyLoc&&(a=null);var o=a?a.completion:{};return o.type=e,o.arg=t,a?(this.method=`next`,this.next=a.finallyLoc,g):this.complete(o)},complete:function(e,t){if(e.type===`throw`)throw e.arg;return e.type===`break`||e.type===`continue`?this.next=e.arg:e.type===`return`?(this.rval=this.arg=e.arg,this.method=`return`,this.next=`end`):e.type===`normal`&&t&&(this.next=t),g},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),k(n),g}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if(r.type===`throw`){var i=r.arg;k(n)}return i}}throw Error(`illegal catch attempt`)},delegateYield:function(e,t,n){return this.delegate={iterator:j(e),resultName:t,nextLoc:n},this.method===`next`&&(this.arg=i),g}},e}(typeof t==`object`?t.exports:{});try{regeneratorRuntime=n}catch{typeof globalThis==`object`?globalThis.regeneratorRuntime=n:Function(`r`,`regeneratorRuntime = r`)(n)}})),d=a(((e,t)=>{t.exports=(e,t)=>`${e}-${t}-${Math.random().toString(16).slice(3,8)}`})),f=a(((e,t)=>{var n=d(),r=0;t.exports=({id:e,action:t,payload:i={}})=>{let a=e;return a===void 0&&(a=n(`Job`,r),r+=1),{id:a,action:t,payload:i}}})),p=a((e=>{var t=!1;e.logging=t,e.setLogging=e=>{t=e},e.log=(...n)=>t?console.log.apply(e,n):null})),m=a(((e,t)=>{var n=f(),{log:r}=p(),i=d(),a=0;t.exports=()=>{let t=i(`Scheduler`,a),o={},s={},c=[];a+=1;let l=()=>c.length,u=()=>Object.keys(o).length,d=()=>{if(c.length!==0){let e=Object.keys(o);for(let t=0;t<e.length;t+=1)if(s[e[t]]===void 0){c[0](o[e[t]]);break}}},f=(i,a)=>new Promise((o,l)=>{let u=n({action:i,payload:a});c.push(async t=>{c.shift(),s[t.id]=u;try{o(await t[i].apply(e,[...a,u.id]))}catch(e){l(e)}finally{delete s[t.id],d()}}),r(`[${t}]: Add ${u.id} to JobQueue`),r(`[${t}]: JobQueue length=${c.length}`),d()});return{addWorker:e=>(o[e.id]=e,r(`[${t}]: Add ${e.id}`),r(`[${t}]: Number of workers=${u()}`),d(),e.id),addJob:async(e,...n)=>{if(u()===0)throw Error(`[${t}]: You need to have at least one worker before adding jobs`);return f(e,n)},terminate:async()=>{Object.keys(o).forEach(async e=>{await o[e].terminate()}),c=[]},getQueueLen:l,getNumWorkers:u}}})),h=a(((e,n)=>{n.exports=e=>{let n={};return typeof WorkerGlobalScope<`u`?n.type=`webworker`:typeof document==`object`?n.type=`browser`:typeof process==`object`&&typeof t==`function`&&(n.type=`node`),e===void 0?n:n[e]}})),g=a(((e,t)=>{var n=h()(`type`)===`browser`?e=>new URL(e,window.location.href).href:e=>e;t.exports=e=>{let t={...e};return[`corePath`,`workerPath`,`langPath`].forEach(r=>{e[r]&&(t[r]=n(t[r]))}),t}})),_=a(((e,t)=>{t.exports={TESSERACT_ONLY:0,LSTM_ONLY:1,TESSERACT_LSTM_COMBINED:2,DEFAULT:3}})),v=i({author:()=>``,browser:()=>O,bugs:()=>F,collective:()=>L,contributors:()=>k,default:()=>R,dependencies:()=>M,description:()=>x,devDependencies:()=>j,homepage:()=>I,jsdelivr:()=>E,license:()=>A,main:()=>S,name:()=>y,overrides:()=>N,repository:()=>P,scripts:()=>D,type:()=>C,types:()=>w,unpkg:()=>T,version:()=>b}),y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,ee=n((()=>{y=`tesseract.js`,b=`7.0.0`,x=`Pure Javascript Multilingual OCR`,S=`src/index.js`,C=`commonjs`,w=`src/index.d.ts`,T=`dist/tesseract.min.js`,E=`dist/tesseract.min.js`,D={start:`node scripts/server.js`,build:`rimraf dist && webpack --config scripts/webpack.config.prod.js && rollup -c scripts/rollup.esm.mjs`,"profile:tesseract":`webpack-bundle-analyzer dist/tesseract-stats.json`,"profile:worker":`webpack-bundle-analyzer dist/worker-stats.json`,prepublishOnly:`npm run build`,wait:`rimraf dist && wait-on http://localhost:3000/dist/tesseract.min.js`,test:`npm-run-all -p -r start test:all`,"test:all":`npm-run-all wait test:browser test:node:all`,"test:browser":`karma start karma.conf.js`,"test:node":`nyc mocha --exit --bail --require ./scripts/test-helper.mjs`,"test:node:all":`npm run test:node -- ./tests/*.test.mjs`,lint:`eslint src`,"lint:fix":`eslint --fix src`,postinstall:`opencollective-postinstall || true`},O={"./src/worker/node/index.js":`./src/worker/browser/index.js`},k=[`jeromewu`],A=`Apache-2.0`,j={"@babel/core":`^7.21.4`,"@babel/eslint-parser":`^7.21.3`,"@babel/preset-env":`^7.21.4`,"@rollup/plugin-commonjs":`^24.1.0`,acorn:`^8.8.2`,"babel-loader":`^9.1.2`,buffer:`^6.0.3`,cors:`^2.8.5`,eslint:`^7.32.0`,"eslint-config-airbnb-base":`^14.2.1`,"eslint-plugin-import":`^2.27.5`,"expect.js":`^0.3.1`,express:`^4.18.2`,mocha:`^10.2.0`,"npm-run-all":`^4.1.5`,karma:`^6.4.2`,"karma-chrome-launcher":`^3.2.0`,"karma-firefox-launcher":`^2.1.2`,"karma-mocha":`^2.0.1`,"karma-webpack":`^5.0.0`,nyc:`^15.1.0`,rimraf:`^5.0.0`,rollup:`^3.20.7`,"wait-on":`^7.0.1`,webpack:`^5.79.0`,"webpack-bundle-analyzer":`^4.8.0`,"webpack-cli":`^5.0.1`,"webpack-dev-middleware":`^6.0.2`,"rollup-plugin-sourcemaps":`^0.6.3`},M={"bmp-js":`^0.1.0`,"idb-keyval":`^6.2.0`,"is-url":`^1.2.4`,"node-fetch":`^2.6.9`,"opencollective-postinstall":`^2.0.3`,"regenerator-runtime":`^0.13.3`,"tesseract.js-core":`^7.0.0`,"wasm-feature-detect":`^1.8.0`,zlibjs:`^0.3.1`},N={"@rollup/pluginutils":`^5.0.2`},P={type:`git`,url:`https://github.com/naptha/tesseract.js.git`},F={url:`https://github.com/naptha/tesseract.js/issues`},I=`https://github.com/naptha/tesseract.js`,L={type:`opencollective`,url:`https://opencollective.com/tesseractjs`},R={name:y,version:b,description:x,main:S,type:C,types:w,unpkg:T,jsdelivr:E,scripts:D,browser:O,author:``,contributors:k,license:A,devDependencies:j,dependencies:M,overrides:N,repository:P,bugs:F,homepage:I,collective:L}})),te=a(((e,t)=>{t.exports={workerBlobURL:!0,logger:()=>{}}})),ne=a(((t,n)=>{var r=(ee(),e(v).default).version;n.exports={...te(),workerPath:`https://cdn.jsdelivr.net/npm/tesseract.js@v${r}/dist/worker.min.js`}})),re=a(((e,t)=>{t.exports=({workerPath:e,workerBlobURL:t})=>{let n;if(Blob&&URL&&t){let t=new Blob([`importScripts("${e}");`],{type:`application/javascript`});n=new Worker(URL.createObjectURL(t))}else n=new Worker(e);return n}})),ie=a(((e,t)=>{t.exports=e=>{e.terminate()}})),z=a(((e,t)=>{t.exports=(e,t)=>{e.onmessage=({data:e})=>{t(e)}}})),B=a(((e,t)=>{t.exports=async(e,t)=>{e.postMessage(t)}})),ae=a(((e,t)=>{var n=e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>{t(r.result)},r.onerror=({target:{error:{code:e}}})=>{n(Error(`File could not be read! Code=${e}`))},r.readAsArrayBuffer(e)}),r=async e=>{let t=e;return e===void 0?`undefined`:(typeof e==`string`?t=/data:image\/([a-zA-Z]*);base64,([^"]*)/.test(e)?atob(e.split(`,`)[1]).split(``).map(e=>e.charCodeAt(0)):await(await fetch(e)).arrayBuffer():typeof HTMLElement<`u`&&e instanceof HTMLElement?(e.tagName===`IMG`&&(t=await r(e.src)),e.tagName===`VIDEO`&&(t=await r(e.poster)),e.tagName===`CANVAS`&&await new Promise(r=>{e.toBlob(async e=>{t=await n(e),r()})})):typeof OffscreenCanvas<`u`&&e instanceof OffscreenCanvas?t=await n(await e.convertToBlob()):(e instanceof File||e instanceof Blob)&&(t=await n(e)),new Uint8Array(t))};t.exports=r})),oe=a(((e,t)=>{t.exports={defaultOptions:ne(),spawnWorker:re(),terminateWorker:ie(),onMessage:z(),send:B(),loadImage:ae()}})),V=a(((e,t)=>{var n=g(),r=f(),{log:i}=p(),a=d(),o=_(),{defaultOptions:s,spawnWorker:c,terminateWorker:l,onMessage:u,loadImage:m,send:h}=oe(),v=0;t.exports=async(e=`eng`,t=o.LSTM_ONLY,d={},f={})=>{let p=a(`Worker`,v),{logger:g,errorHandler:_,...y}=n({...s,...d}),b={},x=typeof e==`string`?e.split(`+`):e,S=t,C=f,w=[o.DEFAULT,o.LSTM_ONLY].includes(t)&&!y.legacyCore,T,E,D=new Promise((e,t)=>{E=e,T=t}),O=e=>{T(e.message)},k=c(y);k.onerror=O,v+=1;let A=({id:e,action:t,payload:n})=>new Promise((r,a)=>{i(`[${p}]: Start ${e}, action=${t}`);let o=`${t}-${e}`;b[o]={resolve:r,reject:a},h(k,{workerId:p,jobId:e,action:t,payload:n})}),j=()=>console.warn("`load` is depreciated and should be removed from code (workers now come pre-loaded)"),M=e=>A(r({id:e,action:`load`,payload:{options:{lstmOnly:w,corePath:y.corePath,logging:y.logging}}})),N=(e,t,n)=>A(r({id:n,action:`FS`,payload:{method:`writeFile`,args:[e,t]}})),P=(e,t)=>A(r({id:t,action:`FS`,payload:{method:`readFile`,args:[e,{encoding:`utf8`}]}})),F=(e,t)=>A(r({id:t,action:`FS`,payload:{method:`unlink`,args:[e]}})),I=(e,t,n)=>A(r({id:n,action:`FS`,payload:{method:e,args:t}})),L=(e,t)=>A(r({id:t,action:`loadLanguage`,payload:{langs:e,options:{langPath:y.langPath,dataPath:y.dataPath,cachePath:y.cachePath,cacheMethod:y.cacheMethod,gzip:y.gzip,lstmOnly:[o.DEFAULT,o.LSTM_ONLY].includes(S)&&!y.legacyLang}}})),R=(e,t,n,i)=>A(r({id:i,action:`initialize`,payload:{langs:e,oem:t,config:n}})),ee=(e=`eng`,t,n,r)=>{if(w&&[o.TESSERACT_ONLY,o.TESSERACT_LSTM_COMBINED].includes(t))throw Error(`Legacy model requested but code missing.`);let i=t||S;S=i;let a=n||C;C=a;let s=(typeof e==`string`?e.split(`+`):e).filter(e=>!x.includes(e));return x.push(...s),s.length>0?L(s,r).then(()=>R(e,i,a,r)):R(e,i,a,r)},te=(e={},t)=>A(r({id:t,action:`setParameters`,payload:{params:e}})),ne=async(e,t={},n={text:!0},i)=>A(r({id:i,action:`recognize`,payload:{image:await m(e),options:t,output:n}})),re=async(e,t)=>{if(w)throw Error("`worker.detect` requires Legacy model, which was not loaded.");return A(r({id:t,action:`detect`,payload:{image:await m(e)}}))},ie=async()=>(k!==null&&(l(k),k=null),Promise.resolve());u(k,({workerId:e,jobId:t,status:n,action:r,data:a})=>{let o=`${r}-${t}`;if(n===`resolve`)i(`[${e}]: Complete ${t}`),b[o].resolve({jobId:t,data:a}),delete b[o];else if(n===`reject`)if(b[o].reject(a),delete b[o],r===`load`&&T(a),_)_(a);else throw Error(a);else n===`progress`&&g({...a,userJobId:t})});let z={id:p,worker:k,load:j,writeText:N,readText:P,removeFile:F,FS:I,reinitialize:ee,setParameters:te,recognize:ne,detect:re,terminate:ie};return M().then(()=>L(e)).then(()=>R(e,t,f)).then(()=>E(z)).catch(()=>{}),D}})),se=a(((e,t)=>{var n=V();t.exports={recognize:async(e,t,r)=>{let i=await n(t,1,r);return i.recognize(e).finally(async()=>{await i.terminate()})},detect:async(e,t)=>{let r=await n(`osd`,0,t);return r.detect(e).finally(async()=>{await r.terminate()})}}})),ce=a(((e,t)=>{t.exports={AFR:`afr`,AMH:`amh`,ARA:`ara`,ASM:`asm`,AZE:`aze`,AZE_CYRL:`aze_cyrl`,BEL:`bel`,BEN:`ben`,BOD:`bod`,BOS:`bos`,BUL:`bul`,CAT:`cat`,CEB:`ceb`,CES:`ces`,CHI_SIM:`chi_sim`,CHI_TRA:`chi_tra`,CHR:`chr`,CYM:`cym`,DAN:`dan`,DEU:`deu`,DZO:`dzo`,ELL:`ell`,ENG:`eng`,ENM:`enm`,EPO:`epo`,EST:`est`,EUS:`eus`,FAS:`fas`,FIN:`fin`,FRA:`fra`,FRK:`frk`,FRM:`frm`,GLE:`gle`,GLG:`glg`,GRC:`grc`,GUJ:`guj`,HAT:`hat`,HEB:`heb`,HIN:`hin`,HRV:`hrv`,HUN:`hun`,IKU:`iku`,IND:`ind`,ISL:`isl`,ITA:`ita`,ITA_OLD:`ita_old`,JAV:`jav`,JPN:`jpn`,KAN:`kan`,KAT:`kat`,KAT_OLD:`kat_old`,KAZ:`kaz`,KHM:`khm`,KIR:`kir`,KOR:`kor`,KUR:`kur`,LAO:`lao`,LAT:`lat`,LAV:`lav`,LIT:`lit`,MAL:`mal`,MAR:`mar`,MKD:`mkd`,MLT:`mlt`,MSA:`msa`,MYA:`mya`,NEP:`nep`,NLD:`nld`,NOR:`nor`,ORI:`ori`,PAN:`pan`,POL:`pol`,POR:`por`,PUS:`pus`,RON:`ron`,RUS:`rus`,SAN:`san`,SIN:`sin`,SLK:`slk`,SLV:`slv`,SPA:`spa`,SPA_OLD:`spa_old`,SQI:`sqi`,SRP:`srp`,SRP_LATN:`srp_latn`,SWA:`swa`,SWE:`swe`,SYR:`syr`,TAM:`tam`,TEL:`tel`,TGK:`tgk`,TGL:`tgl`,THA:`tha`,TIR:`tir`,TUR:`tur`,UIG:`uig`,UKR:`ukr`,URD:`urd`,UZB:`uzb`,UZB_CYRL:`uzb_cyrl`,VIE:`vie`,YID:`yid`}})),le=a(((e,t)=>{t.exports={OSD_ONLY:`0`,AUTO_OSD:`1`,AUTO_ONLY:`2`,AUTO:`3`,SINGLE_COLUMN:`4`,SINGLE_BLOCK_VERT_TEXT:`5`,SINGLE_BLOCK:`6`,SINGLE_LINE:`7`,SINGLE_WORD:`8`,CIRCLE_WORD:`9`,SINGLE_CHAR:`10`,SPARSE_TEXT:`11`,SPARSE_TEXT_OSD:`12`,RAW_LINE:`13`}})),ue=r(a(((e,t)=>{u();var n=m(),r=V(),i=se(),a=ce(),o=_(),s=le(),{setLogging:c}=p();t.exports={languages:a,OEM:o,PSM:s,createScheduler:n,createWorker:r,setLogging:c,...i}}))(),1),de=r(l(),1),fe={};fe.version=`0.18.5`;var pe=1200,me=1252,he=[874,932,936,949,950,1250,1251,1252,1253,1254,1255,1256,1257,1258,1e4],ge={0:1252,1:65001,2:65001,77:1e4,128:932,129:949,130:1361,134:936,136:950,161:1253,162:1254,163:1258,177:1255,178:1256,186:1257,204:1251,222:874,238:1250,255:1252,69:6969},_e=function(e){he.indexOf(e)!=-1&&(me=ge[0]=e)};function ve(){_e(1252)}var ye=function(e){pe=e,_e(e)};function be(){ye(1200),ve()}function xe(e){for(var t=[],n=0,r=e.length;n<r;++n)t[n]=e.charCodeAt(n);return t}function Se(e){for(var t=[],n=0;n<e.length>>1;++n)t[n]=String.fromCharCode(e.charCodeAt(2*n)+(e.charCodeAt(2*n+1)<<8));return t.join(``)}function Ce(e){for(var t=[],n=0;n<e.length>>1;++n)t[n]=String.fromCharCode(e.charCodeAt(2*n+1)+(e.charCodeAt(2*n)<<8));return t.join(``)}var we=function(e){var t=e.charCodeAt(0),n=e.charCodeAt(1);return t==255&&n==254?Se(e.slice(2)):t==254&&n==255?Ce(e.slice(2)):t==65279?e.slice(1):e},Te=function(e){return String.fromCharCode(e)},Ee=function(e){return String.fromCharCode(e)},De,Oe=null,ke=!0,Ae=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`;function je(e){for(var t=``,n=0,r=0,i=0,a=0,o=0,s=0,c=0,l=0;l<e.length;)n=e.charCodeAt(l++),a=n>>2,r=e.charCodeAt(l++),o=(n&3)<<4|r>>4,i=e.charCodeAt(l++),s=(r&15)<<2|i>>6,c=i&63,isNaN(r)?s=c=64:isNaN(i)&&(c=64),t+=Ae.charAt(a)+Ae.charAt(o)+Ae.charAt(s)+Ae.charAt(c);return t}function Me(e){var t=``,n=0,r=0,i=0,a=0,o=0,s=0,c=0;e=e.replace(/[^\w\+\/\=]/g,``);for(var l=0;l<e.length;)a=Ae.indexOf(e.charAt(l++)),o=Ae.indexOf(e.charAt(l++)),n=a<<2|o>>4,t+=String.fromCharCode(n),s=Ae.indexOf(e.charAt(l++)),r=(o&15)<<4|s>>2,s!==64&&(t+=String.fromCharCode(r)),c=Ae.indexOf(e.charAt(l++)),i=(s&3)<<6|c,c!==64&&(t+=String.fromCharCode(i));return t}var Ne=(function(){return typeof Buffer<`u`&&typeof process<`u`&&process.versions!==void 0&&!!process.versions.node})(),Pe=(function(){if(typeof Buffer<`u`){var e=!Buffer.from;if(!e)try{Buffer.from(`foo`,`utf8`)}catch{e=!0}return e?function(e,t){return t?new Buffer(e,t):new Buffer(e)}:Buffer.from.bind(Buffer)}return function(){}})();function Fe(e){return Ne?Buffer.alloc?Buffer.alloc(e):new Buffer(e):typeof Uint8Array<`u`?new Uint8Array(e):Array(e)}function Ie(e){return Ne?Buffer.allocUnsafe?Buffer.allocUnsafe(e):new Buffer(e):typeof Uint8Array<`u`?new Uint8Array(e):Array(e)}var Le=function(e){return Ne?Pe(e,`binary`):e.split(``).map(function(e){return e.charCodeAt(0)&255})};function Re(e){if(typeof ArrayBuffer>`u`)return Le(e);for(var t=new ArrayBuffer(e.length),n=new Uint8Array(t),r=0;r!=e.length;++r)n[r]=e.charCodeAt(r)&255;return t}function ze(e){if(Array.isArray(e))return e.map(function(e){return String.fromCharCode(e)}).join(``);for(var t=[],n=0;n<e.length;++n)t[n]=String.fromCharCode(e[n]);return t.join(``)}function Be(e){if(typeof Uint8Array>`u`)throw Error(`Unsupported`);return new Uint8Array(e)}function Ve(e){if(typeof ArrayBuffer>`u`)throw Error(`Unsupported`);if(e instanceof ArrayBuffer)return Ve(new Uint8Array(e));for(var t=Array(e.length),n=0;n<e.length;++n)t[n]=e[n];return t}var He=Ne?function(e){return Buffer.concat(e.map(function(e){return Buffer.isBuffer(e)?e:Pe(e)}))}:function(e){if(typeof Uint8Array<`u`){var t=0,n=0;for(t=0;t<e.length;++t)n+=e[t].length;var r=new Uint8Array(n),i=0;for(t=0,n=0;t<e.length;n+=i,++t)if(i=e[t].length,e[t]instanceof Uint8Array)r.set(e[t],n);else if(typeof e[t]==`string`)throw`wtf`;else r.set(new Uint8Array(e[t]),n);return r}return[].concat.apply([],e.map(function(e){return Array.isArray(e)?e:[].slice.call(e)}))};function Ue(e){for(var t=[],n=0,r=e.length+250,i=Fe(e.length+255),a=0;a<e.length;++a){var o=e.charCodeAt(a);if(o<128)i[n++]=o;else if(o<2048)i[n++]=192|o>>6&31,i[n++]=128|o&63;else if(o>=55296&&o<57344){o=(o&1023)+64;var s=e.charCodeAt(++a)&1023;i[n++]=240|o>>8&7,i[n++]=128|o>>2&63,i[n++]=128|s>>6&15|(o&3)<<4,i[n++]=128|s&63}else i[n++]=224|o>>12&15,i[n++]=128|o>>6&63,i[n++]=128|o&63;n>r&&(t.push(i.slice(0,n)),n=0,i=Fe(65535),r=65530)}return t.push(i.slice(0,n)),He(t)}var We=/\u0000/g,Ge=/[\u0001-\u0006]/g;function Ke(e){for(var t=``,n=e.length-1;n>=0;)t+=e.charAt(n--);return t}function qe(e,t){var n=``+e;return n.length>=t?n:Dn(`0`,t-n.length)+n}function Je(e,t){var n=``+e;return n.length>=t?n:Dn(` `,t-n.length)+n}function Ye(e,t){var n=``+e;return n.length>=t?n:n+Dn(` `,t-n.length)}function Xe(e,t){var n=``+Math.round(e);return n.length>=t?n:Dn(`0`,t-n.length)+n}function Ze(e,t){var n=``+e;return n.length>=t?n:Dn(`0`,t-n.length)+n}var Qe=2**32;function $e(e,t){return e>Qe||e<-Qe?Xe(e,t):Ze(Math.round(e),t)}function et(e,t){return t||=0,e.length>=7+t&&(e.charCodeAt(t)|32)==103&&(e.charCodeAt(t+1)|32)==101&&(e.charCodeAt(t+2)|32)==110&&(e.charCodeAt(t+3)|32)==101&&(e.charCodeAt(t+4)|32)==114&&(e.charCodeAt(t+5)|32)==97&&(e.charCodeAt(t+6)|32)==108}var tt=[[`Sun`,`Sunday`],[`Mon`,`Monday`],[`Tue`,`Tuesday`],[`Wed`,`Wednesday`],[`Thu`,`Thursday`],[`Fri`,`Friday`],[`Sat`,`Saturday`]],nt=[[`J`,`Jan`,`January`],[`F`,`Feb`,`February`],[`M`,`Mar`,`March`],[`A`,`Apr`,`April`],[`M`,`May`,`May`],[`J`,`Jun`,`June`],[`J`,`Jul`,`July`],[`A`,`Aug`,`August`],[`S`,`Sep`,`September`],[`O`,`Oct`,`October`],[`N`,`Nov`,`November`],[`D`,`Dec`,`December`]];function rt(e){return e||={},e[0]=`General`,e[1]=`0`,e[2]=`0.00`,e[3]=`#,##0`,e[4]=`#,##0.00`,e[9]=`0%`,e[10]=`0.00%`,e[11]=`0.00E+00`,e[12]=`# ?/?`,e[13]=`# ??/??`,e[14]=`m/d/yy`,e[15]=`d-mmm-yy`,e[16]=`d-mmm`,e[17]=`mmm-yy`,e[18]=`h:mm AM/PM`,e[19]=`h:mm:ss AM/PM`,e[20]=`h:mm`,e[21]=`h:mm:ss`,e[22]=`m/d/yy h:mm`,e[37]=`#,##0 ;(#,##0)`,e[38]=`#,##0 ;[Red](#,##0)`,e[39]=`#,##0.00;(#,##0.00)`,e[40]=`#,##0.00;[Red](#,##0.00)`,e[45]=`mm:ss`,e[46]=`[h]:mm:ss`,e[47]=`mmss.0`,e[48]=`##0.0E+0`,e[49]=`@`,e[56]=`"上午/下午 "hh"時"mm"分"ss"秒 "`,e}var H={0:`General`,1:`0`,2:`0.00`,3:`#,##0`,4:`#,##0.00`,9:`0%`,10:`0.00%`,11:`0.00E+00`,12:`# ?/?`,13:`# ??/??`,14:`m/d/yy`,15:`d-mmm-yy`,16:`d-mmm`,17:`mmm-yy`,18:`h:mm AM/PM`,19:`h:mm:ss AM/PM`,20:`h:mm`,21:`h:mm:ss`,22:`m/d/yy h:mm`,37:`#,##0 ;(#,##0)`,38:`#,##0 ;[Red](#,##0)`,39:`#,##0.00;(#,##0.00)`,40:`#,##0.00;[Red](#,##0.00)`,45:`mm:ss`,46:`[h]:mm:ss`,47:`mmss.0`,48:`##0.0E+0`,49:`@`,56:`"上午/下午 "hh"時"mm"分"ss"秒 "`},it={5:37,6:38,7:39,8:40,23:0,24:0,25:0,26:0,27:14,28:14,29:14,30:14,31:14,50:14,51:14,52:14,53:14,54:14,55:14,56:14,57:14,58:14,59:1,60:2,61:3,62:4,67:9,68:10,69:12,70:13,71:14,72:14,73:15,74:16,75:17,76:20,77:21,78:22,79:45,80:46,81:47,82:0},at={5:`"$"#,##0_);\\("$"#,##0\\)`,63:`"$"#,##0_);\\("$"#,##0\\)`,6:`"$"#,##0_);[Red]\\("$"#,##0\\)`,64:`"$"#,##0_);[Red]\\("$"#,##0\\)`,7:`"$"#,##0.00_);\\("$"#,##0.00\\)`,65:`"$"#,##0.00_);\\("$"#,##0.00\\)`,8:`"$"#,##0.00_);[Red]\\("$"#,##0.00\\)`,66:`"$"#,##0.00_);[Red]\\("$"#,##0.00\\)`,41:`_(* #,##0_);_(* \\(#,##0\\);_(* "-"_);_(@_)`,42:`_("$"* #,##0_);_("$"* \\(#,##0\\);_("$"* "-"_);_(@_)`,43:`_(* #,##0.00_);_(* \\(#,##0.00\\);_(* "-"??_);_(@_)`,44:`_("$"* #,##0.00_);_("$"* \\(#,##0.00\\);_("$"* "-"??_);_(@_)`};function ot(e,t,n){for(var r=e<0?-1:1,i=e*r,a=0,o=1,s=0,c=1,l=0,u=0,d=Math.floor(i);l<t&&(d=Math.floor(i),s=d*o+a,u=d*l+c,!(i-d<5e-8));)i=1/(i-d),a=o,o=s,c=l,l=u;if(u>t&&(l>t?(u=c,s=a):(u=l,s=o)),!n)return[0,r*s,u];var f=Math.floor(r*s/u);return[f,r*s-f*u,u]}function st(e,t,n){if(e>2958465||e<0)return null;var r=e|0,i=Math.floor(86400*(e-r)),a=0,o=[],s={D:r,T:i,u:86400*(e-r)-i,y:0,m:0,d:0,H:0,M:0,S:0,q:0};if(Math.abs(s.u)<1e-6&&(s.u=0),t&&t.date1904&&(r+=1462),s.u>.9999&&(s.u=0,++i==86400&&(s.T=i=0,++r,++s.D)),r===60)o=n?[1317,10,29]:[1900,2,29],a=3;else if(r===0)o=n?[1317,8,29]:[1900,1,0],a=6;else{r>60&&--r;var c=new Date(1900,0,1);c.setDate(c.getDate()+r-1),o=[c.getFullYear(),c.getMonth()+1,c.getDate()],a=c.getDay(),r<60&&(a=(a+6)%7),n&&(a=vt(c,o))}return s.y=o[0],s.m=o[1],s.d=o[2],s.S=i%60,i=Math.floor(i/60),s.M=i%60,i=Math.floor(i/60),s.H=i,s.q=a,s}var ct=new Date(1899,11,31,0,0,0),lt=ct.getTime(),ut=new Date(1900,2,1,0,0,0);function dt(e,t){var n=e.getTime();return t?n-=1461*24*60*60*1e3:e>=ut&&(n+=1440*60*1e3),(n-(lt+(e.getTimezoneOffset()-ct.getTimezoneOffset())*6e4))/(1440*60*1e3)}function ft(e){return e.indexOf(`.`)==-1?e:e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/,`$1`)}function pt(e){return e.indexOf(`E`)==-1?e:e.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/,`$1E`).replace(/(E[+-])(\d)$/,`$10$2`)}function mt(e){var t=e<0?12:11,n=ft(e.toFixed(12));return n.length<=t||(n=e.toPrecision(10),n.length<=t)?n:e.toExponential(5)}function ht(e){var t=ft(e.toFixed(11));return t.length>(e<0?12:11)||t===`0`||t===`-0`?e.toPrecision(6):t}function gt(e){var t=Math.floor(Math.log(Math.abs(e))*Math.LOG10E);return ft(pt((t>=-4&&t<=-1?e.toPrecision(10+t):Math.abs(t)<=9?mt(e):t===10?e.toFixed(10).substr(0,12):ht(e)).toUpperCase()))}function _t(e,t){switch(typeof e){case`string`:return e;case`boolean`:return e?`TRUE`:`FALSE`;case`number`:return(e|0)===e?e.toString(10):gt(e);case`undefined`:return``;case`object`:if(e==null)return``;if(e instanceof Date)return Yt(14,dt(e,t&&t.date1904),t)}throw Error(`unsupported value in General format: `+e)}function vt(e,t){t[0]-=581;var n=e.getDay();return e<60&&(n=(n+6)%7),n}function yt(e,t,n,r){var i=``,a=0,o=0,s=n.y,c,l=0;switch(e){case 98:s=n.y+543;case 121:switch(t.length){case 1:case 2:c=s%100,l=2;break;default:c=s%1e4,l=4;break}break;case 109:switch(t.length){case 1:case 2:c=n.m,l=t.length;break;case 3:return nt[n.m-1][1];case 5:return nt[n.m-1][0];default:return nt[n.m-1][2]}break;case 100:switch(t.length){case 1:case 2:c=n.d,l=t.length;break;case 3:return tt[n.q][0];default:return tt[n.q][1]}break;case 104:switch(t.length){case 1:case 2:c=1+(n.H+11)%12,l=t.length;break;default:throw`bad hour format: `+t}break;case 72:switch(t.length){case 1:case 2:c=n.H,l=t.length;break;default:throw`bad hour format: `+t}break;case 77:switch(t.length){case 1:case 2:c=n.M,l=t.length;break;default:throw`bad minute format: `+t}break;case 115:if(t!=`s`&&t!=`ss`&&t!=`.0`&&t!=`.00`&&t!=`.000`)throw`bad second format: `+t;return n.u===0&&(t==`s`||t==`ss`)?qe(n.S,t.length):(o=r>=2?r===3?1e3:100:r===1?10:1,a=Math.round(o*(n.S+n.u)),a>=60*o&&(a=0),t===`s`?a===0?`0`:``+a/o:(i=qe(a,2+r),t===`ss`?i.substr(0,2):`.`+i.substr(2,t.length-1)));case 90:switch(t){case`[h]`:case`[hh]`:c=n.D*24+n.H;break;case`[m]`:case`[mm]`:c=(n.D*24+n.H)*60+n.M;break;case`[s]`:case`[ss]`:c=((n.D*24+n.H)*60+n.M)*60+Math.round(n.S+n.u);break;default:throw`bad abstime format: `+t}l=t.length===3?1:2;break;case 101:c=s,l=1;break}return l>0?qe(c,l):``}function bt(e){var t=3;if(e.length<=t)return e;for(var n=e.length%t,r=e.substr(0,n);n!=e.length;n+=t)r+=(r.length>0?`,`:``)+e.substr(n,t);return r}var xt=/%/g;function St(e,t,n){var r=t.replace(xt,``),i=t.length-r.length;return Vt(e,r,n*10**(2*i))+Dn(`%`,i)}function Ct(e,t,n){for(var r=t.length-1;t.charCodeAt(r-1)===44;)--r;return Vt(e,t.substr(0,r),n/10**(3*(t.length-r)))}function wt(e,t){var n,r=e.indexOf(`E`)-e.indexOf(`.`)-1;if(e.match(/^#+0.0E\+0$/)){if(t==0)return`0.0E+0`;if(t<0)return`-`+wt(e,-t);var i=e.indexOf(`.`);i===-1&&(i=e.indexOf(`E`));var a=Math.floor(Math.log(t)*Math.LOG10E)%i;if(a<0&&(a+=i),n=(t/10**a).toPrecision(r+1+(i+a)%i),n.indexOf(`e`)===-1){var o=Math.floor(Math.log(t)*Math.LOG10E);for(n.indexOf(`.`)===-1?n=n.charAt(0)+`.`+n.substr(1)+`E+`+(o-n.length+a):n+=`E+`+(o-a);n.substr(0,2)===`0.`;)n=n.charAt(0)+n.substr(2,i)+`.`+n.substr(2+i),n=n.replace(/^0+([1-9])/,`$1`).replace(/^0+\./,`0.`);n=n.replace(/\+-/,`-`)}n=n.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/,function(e,t,n,r){return t+n+r.substr(0,(i+a)%i)+`.`+r.substr(a)+`E`})}else n=t.toExponential(r);return e.match(/E\+00$/)&&n.match(/e[+-]\d$/)&&(n=n.substr(0,n.length-1)+`0`+n.charAt(n.length-1)),e.match(/E\-/)&&n.match(/e\+/)&&(n=n.replace(/e\+/,`e`)),n.replace(`e`,`E`)}var Tt=/# (\?+)( ?)\/( ?)(\d+)/;function Et(e,t,n){var r=parseInt(e[4],10),i=Math.round(t*r),a=Math.floor(i/r),o=i-a*r,s=r;return n+(a===0?``:``+a)+` `+(o===0?Dn(` `,e[1].length+1+e[4].length):Je(o,e[1].length)+e[2]+`/`+e[3]+qe(s,e[4].length))}function Dt(e,t,n){return n+(t===0?``:``+t)+Dn(` `,e[1].length+2+e[4].length)}var Ot=/^#*0*\.([0#]+)/,kt=/\).*[0#]/,At=/\(###\) ###\\?-####/;function jt(e){for(var t=``,n,r=0;r!=e.length;++r)switch(n=e.charCodeAt(r)){case 35:break;case 63:t+=` `;break;case 48:t+=`0`;break;default:t+=String.fromCharCode(n)}return t}function Mt(e,t){var n=10**t;return``+Math.round(e*n)/n}function Nt(e,t){var n=e-Math.floor(e),r=10**t;return t<(``+Math.round(n*r)).length?0:Math.round(n*r)}function Pt(e,t){return+(t<(``+Math.round((e-Math.floor(e))*10**t)).length)}function Ft(e){return e<2147483647&&e>-2147483648?``+(e>=0?e|0:e-1|0):``+Math.floor(e)}function It(e,t,n){if(e.charCodeAt(0)===40&&!t.match(kt)){var r=t.replace(/\( */,``).replace(/ \)/,``).replace(/\)/,``);return n>=0?It(`n`,r,n):`(`+It(`n`,r,-n)+`)`}if(t.charCodeAt(t.length-1)===44)return Ct(e,t,n);if(t.indexOf(`%`)!==-1)return St(e,t,n);if(t.indexOf(`E`)!==-1)return wt(t,n);if(t.charCodeAt(0)===36)return`$`+It(e,t.substr(t.charAt(1)==` `?2:1),n);var i,a,o,s,c=Math.abs(n),l=n<0?`-`:``;if(t.match(/^00+$/))return l+$e(c,t.length);if(t.match(/^[#?]+$/))return i=$e(n,0),i===`0`&&(i=``),i.length>t.length?i:jt(t.substr(0,t.length-i.length))+i;if(a=t.match(Tt))return Et(a,c,l);if(t.match(/^#+0+$/))return l+$e(c,t.length-t.indexOf(`0`));if(a=t.match(Ot))return i=Mt(n,a[1].length).replace(/^([^\.]+)$/,`$1.`+jt(a[1])).replace(/\.$/,`.`+jt(a[1])).replace(/\.(\d*)$/,function(e,t){return`.`+t+Dn(`0`,jt(a[1]).length-t.length)}),t.indexOf(`0.`)===-1?i.replace(/^0\./,`.`):i;if(t=t.replace(/^#+([0.])/,`$1`),a=t.match(/^(0*)\.(#*)$/))return l+Mt(c,a[2].length).replace(/\.(\d*[1-9])0*$/,`.$1`).replace(/^(-?\d*)$/,`$1.`).replace(/^0\./,a[1].length?`0.`:`.`);if(a=t.match(/^#{1,3},##0(\.?)$/))return l+bt($e(c,0));if(a=t.match(/^#,##0\.([#0]*0)$/))return n<0?`-`+It(e,t,-n):bt(``+(Math.floor(n)+Pt(n,a[1].length)))+`.`+qe(Nt(n,a[1].length),a[1].length);if(a=t.match(/^#,#*,#0/))return It(e,t.replace(/^#,#*,/,``),n);if(a=t.match(/^([0#]+)(\\?-([0#]+))+$/))return i=Ke(It(e,t.replace(/[\\-]/g,``),n)),o=0,Ke(Ke(t.replace(/\\/g,``)).replace(/[0#]/g,function(e){return o<i.length?i.charAt(o++):e===`0`?`0`:``}));if(t.match(At))return i=It(e,`##########`,n),`(`+i.substr(0,3)+`) `+i.substr(3,3)+`-`+i.substr(6);var u=``;if(a=t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))return o=Math.min(a[4].length,7),s=ot(c,10**o-1,!1),i=``+l,u=Vt(`n`,a[1],s[1]),u.charAt(u.length-1)==` `&&(u=u.substr(0,u.length-1)+`0`),i+=u+a[2]+`/`+a[3],u=Ye(s[2],o),u.length<a[4].length&&(u=jt(a[4].substr(a[4].length-u.length))+u),i+=u,i;if(a=t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))return o=Math.min(Math.max(a[1].length,a[4].length),7),s=ot(c,10**o-1,!0),l+(s[0]||(s[1]?``:`0`))+` `+(s[1]?Je(s[1],o)+a[2]+`/`+a[3]+Ye(s[2],o):Dn(` `,2*o+1+a[2].length+a[3].length));if(a=t.match(/^[#0?]+$/))return i=$e(n,0),t.length<=i.length?i:jt(t.substr(0,t.length-i.length))+i;if(a=t.match(/^([#0?]+)\.([#0]+)$/)){i=``+n.toFixed(Math.min(a[2].length,10)).replace(/([^0])0+$/,`$1`),o=i.indexOf(`.`);var d=t.indexOf(`.`)-o,f=t.length-i.length-d;return jt(t.substr(0,d)+i+t.substr(t.length-f))}if(a=t.match(/^00,000\.([#0]*0)$/))return o=Nt(n,a[1].length),n<0?`-`+It(e,t,-n):bt(Ft(n)).replace(/^\d,\d{3}$/,`0$&`).replace(/^\d*$/,function(e){return`00,`+(e.length<3?qe(0,3-e.length):``)+e})+`.`+qe(o,a[1].length);switch(t){case`###,##0.00`:return It(e,`#,##0.00`,n);case`###,###`:case`##,###`:case`#,###`:var p=bt($e(c,0));return p===`0`?``:l+p;case`###,###.00`:return It(e,`###,##0.00`,n).replace(/^0\./,`.`);case`#,###.00`:return It(e,`#,##0.00`,n).replace(/^0\./,`.`);default:}throw Error(`unsupported format |`+t+`|`)}function Lt(e,t,n){for(var r=t.length-1;t.charCodeAt(r-1)===44;)--r;return Vt(e,t.substr(0,r),n/10**(3*(t.length-r)))}function Rt(e,t,n){var r=t.replace(xt,``),i=t.length-r.length;return Vt(e,r,n*10**(2*i))+Dn(`%`,i)}function zt(e,t){var n,r=e.indexOf(`E`)-e.indexOf(`.`)-1;if(e.match(/^#+0.0E\+0$/)){if(t==0)return`0.0E+0`;if(t<0)return`-`+zt(e,-t);var i=e.indexOf(`.`);i===-1&&(i=e.indexOf(`E`));var a=Math.floor(Math.log(t)*Math.LOG10E)%i;if(a<0&&(a+=i),n=(t/10**a).toPrecision(r+1+(i+a)%i),!n.match(/[Ee]/)){var o=Math.floor(Math.log(t)*Math.LOG10E);n.indexOf(`.`)===-1?n=n.charAt(0)+`.`+n.substr(1)+`E+`+(o-n.length+a):n+=`E+`+(o-a),n=n.replace(/\+-/,`-`)}n=n.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/,function(e,t,n,r){return t+n+r.substr(0,(i+a)%i)+`.`+r.substr(a)+`E`})}else n=t.toExponential(r);return e.match(/E\+00$/)&&n.match(/e[+-]\d$/)&&(n=n.substr(0,n.length-1)+`0`+n.charAt(n.length-1)),e.match(/E\-/)&&n.match(/e\+/)&&(n=n.replace(/e\+/,`e`)),n.replace(`e`,`E`)}function Bt(e,t,n){if(e.charCodeAt(0)===40&&!t.match(kt)){var r=t.replace(/\( */,``).replace(/ \)/,``).replace(/\)/,``);return n>=0?Bt(`n`,r,n):`(`+Bt(`n`,r,-n)+`)`}if(t.charCodeAt(t.length-1)===44)return Lt(e,t,n);if(t.indexOf(`%`)!==-1)return Rt(e,t,n);if(t.indexOf(`E`)!==-1)return zt(t,n);if(t.charCodeAt(0)===36)return`$`+Bt(e,t.substr(t.charAt(1)==` `?2:1),n);var i,a,o,s,c=Math.abs(n),l=n<0?`-`:``;if(t.match(/^00+$/))return l+qe(c,t.length);if(t.match(/^[#?]+$/))return i=``+n,n===0&&(i=``),i.length>t.length?i:jt(t.substr(0,t.length-i.length))+i;if(a=t.match(Tt))return Dt(a,c,l);if(t.match(/^#+0+$/))return l+qe(c,t.length-t.indexOf(`0`));if(a=t.match(Ot))return i=(``+n).replace(/^([^\.]+)$/,`$1.`+jt(a[1])).replace(/\.$/,`.`+jt(a[1])),i=i.replace(/\.(\d*)$/,function(e,t){return`.`+t+Dn(`0`,jt(a[1]).length-t.length)}),t.indexOf(`0.`)===-1?i.replace(/^0\./,`.`):i;if(t=t.replace(/^#+([0.])/,`$1`),a=t.match(/^(0*)\.(#*)$/))return l+(``+c).replace(/\.(\d*[1-9])0*$/,`.$1`).replace(/^(-?\d*)$/,`$1.`).replace(/^0\./,a[1].length?`0.`:`.`);if(a=t.match(/^#{1,3},##0(\.?)$/))return l+bt(``+c);if(a=t.match(/^#,##0\.([#0]*0)$/))return n<0?`-`+Bt(e,t,-n):bt(``+n)+`.`+Dn(`0`,a[1].length);if(a=t.match(/^#,#*,#0/))return Bt(e,t.replace(/^#,#*,/,``),n);if(a=t.match(/^([0#]+)(\\?-([0#]+))+$/))return i=Ke(Bt(e,t.replace(/[\\-]/g,``),n)),o=0,Ke(Ke(t.replace(/\\/g,``)).replace(/[0#]/g,function(e){return o<i.length?i.charAt(o++):e===`0`?`0`:``}));if(t.match(At))return i=Bt(e,`##########`,n),`(`+i.substr(0,3)+`) `+i.substr(3,3)+`-`+i.substr(6);var u=``;if(a=t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))return o=Math.min(a[4].length,7),s=ot(c,10**o-1,!1),i=``+l,u=Vt(`n`,a[1],s[1]),u.charAt(u.length-1)==` `&&(u=u.substr(0,u.length-1)+`0`),i+=u+a[2]+`/`+a[3],u=Ye(s[2],o),u.length<a[4].length&&(u=jt(a[4].substr(a[4].length-u.length))+u),i+=u,i;if(a=t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))return o=Math.min(Math.max(a[1].length,a[4].length),7),s=ot(c,10**o-1,!0),l+(s[0]||(s[1]?``:`0`))+` `+(s[1]?Je(s[1],o)+a[2]+`/`+a[3]+Ye(s[2],o):Dn(` `,2*o+1+a[2].length+a[3].length));if(a=t.match(/^[#0?]+$/))return i=``+n,t.length<=i.length?i:jt(t.substr(0,t.length-i.length))+i;if(a=t.match(/^([#0]+)\.([#0]+)$/)){i=``+n.toFixed(Math.min(a[2].length,10)).replace(/([^0])0+$/,`$1`),o=i.indexOf(`.`);var d=t.indexOf(`.`)-o,f=t.length-i.length-d;return jt(t.substr(0,d)+i+t.substr(t.length-f))}if(a=t.match(/^00,000\.([#0]*0)$/))return n<0?`-`+Bt(e,t,-n):bt(``+n).replace(/^\d,\d{3}$/,`0$&`).replace(/^\d*$/,function(e){return`00,`+(e.length<3?qe(0,3-e.length):``)+e})+`.`+qe(0,a[1].length);switch(t){case`###,###`:case`##,###`:case`#,###`:var p=bt(``+c);return p===`0`?``:l+p;default:if(t.match(/\.[0#?]*$/))return Bt(e,t.slice(0,t.lastIndexOf(`.`)),n)+jt(t.slice(t.lastIndexOf(`.`)))}throw Error(`unsupported format |`+t+`|`)}function Vt(e,t,n){return(n|0)===n?Bt(e,t,n):It(e,t,n)}function Ht(e){for(var t=[],n=!1,r=0,i=0;r<e.length;++r)switch(e.charCodeAt(r)){case 34:n=!n;break;case 95:case 42:case 92:++r;break;case 59:t[t.length]=e.substr(i,r-i),i=r+1}if(t[t.length]=e.substr(i),n===!0)throw Error(`Format |`+e+`| unterminated string `);return t}var Ut=/\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;function Wt(e){for(var t=0,n=``,r=``;t<e.length;)switch(n=e.charAt(t)){case`G`:et(e,t)&&(t+=6),t++;break;case`"`:for(;e.charCodeAt(++t)!==34&&t<e.length;);++t;break;case`\\`:t+=2;break;case`_`:t+=2;break;case`@`:++t;break;case`B`:case`b`:if(e.charAt(t+1)===`1`||e.charAt(t+1)===`2`)return!0;case`M`:case`D`:case`Y`:case`H`:case`S`:case`E`:case`m`:case`d`:case`y`:case`h`:case`s`:case`e`:case`g`:return!0;case`A`:case`a`:case`上`:if(e.substr(t,3).toUpperCase()===`A/P`||e.substr(t,5).toUpperCase()===`AM/PM`||e.substr(t,5).toUpperCase()===`上午/下午`)return!0;++t;break;case`[`:for(r=n;e.charAt(t++)!==`]`&&t<e.length;)r+=e.charAt(t);if(r.match(Ut))return!0;break;case`.`:case`0`:case`#`:for(;t<e.length&&(`0#?.,E+-%`.indexOf(n=e.charAt(++t))>-1||n==`\\`&&e.charAt(t+1)==`-`&&`0#`.indexOf(e.charAt(t+2))>-1););break;case`?`:for(;e.charAt(++t)===n;);break;case`*`:++t,(e.charAt(t)==` `||e.charAt(t)==`*`)&&++t;break;case`(`:case`)`:++t;break;case`1`:case`2`:case`3`:case`4`:case`5`:case`6`:case`7`:case`8`:case`9`:for(;t<e.length&&`0123456789`.indexOf(e.charAt(++t))>-1;);break;case` `:++t;break;default:++t;break}return!1}function Gt(e,t,n,r){for(var i=[],a=``,o=0,s=``,c=`t`,l,u,d,f=`H`;o<e.length;)switch(s=e.charAt(o)){case`G`:if(!et(e,o))throw Error(`unrecognized character `+s+` in `+e);i[i.length]={t:`G`,v:`General`},o+=7;break;case`"`:for(a=``;(d=e.charCodeAt(++o))!==34&&o<e.length;)a+=String.fromCharCode(d);i[i.length]={t:`t`,v:a},++o;break;case`\\`:var p=e.charAt(++o),m=p===`(`||p===`)`?p:`t`;i[i.length]={t:m,v:p},++o;break;case`_`:i[i.length]={t:`t`,v:` `},o+=2;break;case`@`:i[i.length]={t:`T`,v:t},++o;break;case`B`:case`b`:if(e.charAt(o+1)===`1`||e.charAt(o+1)===`2`){if(l==null&&(l=st(t,n,e.charAt(o+1)===`2`),l==null))return``;i[i.length]={t:`X`,v:e.substr(o,2)},c=s,o+=2;break}case`M`:case`D`:case`Y`:case`H`:case`S`:case`E`:s=s.toLowerCase();case`m`:case`d`:case`y`:case`h`:case`s`:case`e`:case`g`:if(t<0||l==null&&(l=st(t,n),l==null))return``;for(a=s;++o<e.length&&e.charAt(o).toLowerCase()===s;)a+=s;s===`m`&&c.toLowerCase()===`h`&&(s=`M`),s===`h`&&(s=f),i[i.length]={t:s,v:a},c=s;break;case`A`:case`a`:case`上`:var h={t:s,v:s};if(l??=st(t,n),e.substr(o,3).toUpperCase()===`A/P`?(l!=null&&(h.v=l.H>=12?`P`:`A`),h.t=`T`,f=`h`,o+=3):e.substr(o,5).toUpperCase()===`AM/PM`?(l!=null&&(h.v=l.H>=12?`PM`:`AM`),h.t=`T`,o+=5,f=`h`):e.substr(o,5).toUpperCase()===`上午/下午`?(l!=null&&(h.v=l.H>=12?`下午`:`上午`),h.t=`T`,o+=5,f=`h`):(h.t=`t`,++o),l==null&&h.t===`T`)return``;i[i.length]=h,c=s;break;case`[`:for(a=s;e.charAt(o++)!==`]`&&o<e.length;)a+=e.charAt(o);if(a.slice(-1)!==`]`)throw`unterminated "[" block: |`+a+`|`;if(a.match(Ut)){if(l==null&&(l=st(t,n),l==null))return``;i[i.length]={t:`Z`,v:a.toLowerCase()},c=a.charAt(1)}else a.indexOf(`$`)>-1&&(a=(a.match(/\$([^-\[\]]*)/)||[])[1]||`$`,Wt(e)||(i[i.length]={t:`t`,v:a}));break;case`.`:if(l!=null){for(a=s;++o<e.length&&(s=e.charAt(o))===`0`;)a+=s;i[i.length]={t:`s`,v:a};break}case`0`:case`#`:for(a=s;++o<e.length&&`0#?.,E+-%`.indexOf(s=e.charAt(o))>-1;)a+=s;i[i.length]={t:`n`,v:a};break;case`?`:for(a=s;e.charAt(++o)===s;)a+=s;i[i.length]={t:s,v:a},c=s;break;case`*`:++o,(e.charAt(o)==` `||e.charAt(o)==`*`)&&++o;break;case`(`:case`)`:i[i.length]={t:r===1?`t`:s,v:s},++o;break;case`1`:case`2`:case`3`:case`4`:case`5`:case`6`:case`7`:case`8`:case`9`:for(a=s;o<e.length&&`0123456789`.indexOf(e.charAt(++o))>-1;)a+=e.charAt(o);i[i.length]={t:`D`,v:a};break;case` `:i[i.length]={t:s,v:s},++o;break;case`$`:i[i.length]={t:`t`,v:`$`},++o;break;default:if(`,$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP`.indexOf(s)===-1)throw Error(`unrecognized character `+s+` in `+e);i[i.length]={t:`t`,v:s},++o;break}var g=0,_=0,v;for(o=i.length-1,c=`t`;o>=0;--o)switch(i[o].t){case`h`:case`H`:i[o].t=f,c=`h`,g<1&&(g=1);break;case`s`:(v=i[o].v.match(/\.0+$/))&&(_=Math.max(_,v[0].length-1)),g<3&&(g=3);case`d`:case`y`:case`M`:case`e`:c=i[o].t;break;case`m`:c===`s`&&(i[o].t=`M`,g<2&&(g=2));break;case`X`:break;case`Z`:g<1&&i[o].v.match(/[Hh]/)&&(g=1),g<2&&i[o].v.match(/[Mm]/)&&(g=2),g<3&&i[o].v.match(/[Ss]/)&&(g=3)}switch(g){case 0:break;case 1:l.u>=.5&&(l.u=0,++l.S),l.S>=60&&(l.S=0,++l.M),l.M>=60&&(l.M=0,++l.H);break;case 2:l.u>=.5&&(l.u=0,++l.S),l.S>=60&&(l.S=0,++l.M);break}var y=``,b;for(o=0;o<i.length;++o)switch(i[o].t){case`t`:case`T`:case` `:case`D`:break;case`X`:i[o].v=``,i[o].t=`;`;break;case`d`:case`m`:case`y`:case`h`:case`H`:case`M`:case`s`:case`e`:case`b`:case`Z`:i[o].v=yt(i[o].t.charCodeAt(0),i[o].v,l,_),i[o].t=`t`;break;case`n`:case`?`:for(b=o+1;i[b]!=null&&((s=i[b].t)===`?`||s===`D`||(s===` `||s===`t`)&&i[b+1]!=null&&(i[b+1].t===`?`||i[b+1].t===`t`&&i[b+1].v===`/`)||i[o].t===`(`&&(s===` `||s===`n`||s===`)`)||s===`t`&&(i[b].v===`/`||i[b].v===` `&&i[b+1]!=null&&i[b+1].t==`?`));)i[o].v+=i[b].v,i[b]={v:``,t:`;`},++b;y+=i[o].v,o=b-1;break;case`G`:i[o].t=`t`,i[o].v=_t(t,n);break}var x=``,S,C;if(y.length>0){y.charCodeAt(0)==40?(S=t<0&&y.charCodeAt(0)===45?-t:t,C=Vt(`n`,y,S)):(S=t<0&&r>1?-t:t,C=Vt(`n`,y,S),S<0&&i[0]&&i[0].t==`t`&&(C=C.substr(1),i[0].v=`-`+i[0].v)),b=C.length-1;var w=i.length;for(o=0;o<i.length;++o)if(i[o]!=null&&i[o].t!=`t`&&i[o].v.indexOf(`.`)>-1){w=o;break}var T=i.length;if(w===i.length&&C.indexOf(`E`)===-1){for(o=i.length-1;o>=0;--o)i[o]==null||`n?`.indexOf(i[o].t)===-1||(b>=i[o].v.length-1?(b-=i[o].v.length,i[o].v=C.substr(b+1,i[o].v.length)):b<0?i[o].v=``:(i[o].v=C.substr(0,b+1),b=-1),i[o].t=`t`,T=o);b>=0&&T<i.length&&(i[T].v=C.substr(0,b+1)+i[T].v)}else if(w!==i.length&&C.indexOf(`E`)===-1){for(b=C.indexOf(`.`)-1,o=w;o>=0;--o)if(!(i[o]==null||`n?`.indexOf(i[o].t)===-1)){for(u=i[o].v.indexOf(`.`)>-1&&o===w?i[o].v.indexOf(`.`)-1:i[o].v.length-1,x=i[o].v.substr(u+1);u>=0;--u)b>=0&&(i[o].v.charAt(u)===`0`||i[o].v.charAt(u)===`#`)&&(x=C.charAt(b--)+x);i[o].v=x,i[o].t=`t`,T=o}for(b>=0&&T<i.length&&(i[T].v=C.substr(0,b+1)+i[T].v),b=C.indexOf(`.`)+1,o=w;o<i.length;++o)if(!(i[o]==null||`n?(`.indexOf(i[o].t)===-1&&o!==w)){for(u=i[o].v.indexOf(`.`)>-1&&o===w?i[o].v.indexOf(`.`)+1:0,x=i[o].v.substr(0,u);u<i[o].v.length;++u)b<C.length&&(x+=C.charAt(b++));i[o].v=x,i[o].t=`t`,T=o}}}for(o=0;o<i.length;++o)i[o]!=null&&`n?`.indexOf(i[o].t)>-1&&(S=r>1&&t<0&&o>0&&i[o-1].v===`-`?-t:t,i[o].v=Vt(i[o].t,i[o].v,S),i[o].t=`t`);var E=``;for(o=0;o!==i.length;++o)i[o]!=null&&(E+=i[o].v);return E}var Kt=/\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;function qt(e,t){if(t==null)return!1;var n=parseFloat(t[2]);switch(t[1]){case`=`:if(e==n)return!0;break;case`>`:if(e>n)return!0;break;case`<`:if(e<n)return!0;break;case`<>`:if(e!=n)return!0;break;case`>=`:if(e>=n)return!0;break;case`<=`:if(e<=n)return!0;break}return!1}function Jt(e,t){var n=Ht(e),r=n.length,i=n[r-1].indexOf(`@`);if(r<4&&i>-1&&--r,n.length>4)throw Error(`cannot find right format for |`+n.join(`|`)+`|`);if(typeof t!=`number`)return[4,n.length===4||i>-1?n[n.length-1]:`@`];switch(n.length){case 1:n=i>-1?[`General`,`General`,`General`,n[0]]:[n[0],n[0],n[0],`@`];break;case 2:n=i>-1?[n[0],n[0],n[0],n[1]]:[n[0],n[1],n[0],`@`];break;case 3:n=i>-1?[n[0],n[1],n[0],n[2]]:[n[0],n[1],n[2],`@`];break;case 4:break}var a=t>0?n[0]:t<0?n[1]:n[2];if(n[0].indexOf(`[`)===-1&&n[1].indexOf(`[`)===-1)return[r,a];if(n[0].match(/\[[=<>]/)!=null||n[1].match(/\[[=<>]/)!=null){var o=n[0].match(Kt),s=n[1].match(Kt);return qt(t,o)?[r,n[0]]:qt(t,s)?[r,n[1]]:[r,n[o!=null&&s!=null?2:1]]}return[r,a]}function Yt(e,t,n){n??={};var r=``;switch(typeof e){case`string`:r=e==`m/d/yy`&&n.dateNF?n.dateNF:e;break;case`number`:r=e==14&&n.dateNF?n.dateNF:(n.table==null?H:n.table)[e],r??=n.table&&n.table[it[e]]||H[it[e]],r??=at[e]||`General`;break}if(et(r,0))return _t(t,n);t instanceof Date&&(t=dt(t,n.date1904));var i=Jt(r,t);if(et(i[1]))return _t(t,n);if(t===!0)t=`TRUE`;else if(t===!1)t=`FALSE`;else if(t===``||t==null)return``;return Gt(i[1],t,n,i[0])}function Xt(e,t){if(typeof t!=`number`){t=+t||-1;for(var n=0;n<392;++n){if(H[n]==null){t<0&&(t=n);continue}if(H[n]==e){t=n;break}}t<0&&(t=391)}return H[t]=e,t}function Zt(e){for(var t=0;t!=392;++t)e[t]!==void 0&&Xt(e[t],t)}function Qt(){H=rt()}var $t={5:`"$"#,##0_);\\("$"#,##0\\)`,6:`"$"#,##0_);[Red]\\("$"#,##0\\)`,7:`"$"#,##0.00_);\\("$"#,##0.00\\)`,8:`"$"#,##0.00_);[Red]\\("$"#,##0.00\\)`,23:`General`,24:`General`,25:`General`,26:`General`,27:`m/d/yy`,28:`m/d/yy`,29:`m/d/yy`,30:`m/d/yy`,31:`m/d/yy`,32:`h:mm:ss`,33:`h:mm:ss`,34:`h:mm:ss`,35:`h:mm:ss`,36:`m/d/yy`,41:`_(* #,##0_);_(* (#,##0);_(* "-"_);_(@_)`,42:`_("$"* #,##0_);_("$"* (#,##0);_("$"* "-"_);_(@_)`,43:`_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)`,44:`_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)`,50:`m/d/yy`,51:`m/d/yy`,52:`m/d/yy`,53:`m/d/yy`,54:`m/d/yy`,55:`m/d/yy`,56:`m/d/yy`,57:`m/d/yy`,58:`m/d/yy`,59:`0`,60:`0.00`,61:`#,##0`,62:`#,##0.00`,63:`"$"#,##0_);\\("$"#,##0\\)`,64:`"$"#,##0_);[Red]\\("$"#,##0\\)`,65:`"$"#,##0.00_);\\("$"#,##0.00\\)`,66:`"$"#,##0.00_);[Red]\\("$"#,##0.00\\)`,67:`0%`,68:`0.00%`,69:`# ?/?`,70:`# ??/??`,71:`m/d/yy`,72:`m/d/yy`,73:`d-mmm-yy`,74:`d-mmm`,75:`mmm-yy`,76:`h:mm`,77:`h:mm:ss`,78:`m/d/yy h:mm`,79:`mm:ss`,80:`[h]:mm:ss`,81:`mmss.0`},en=/[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;function tn(e){var t=typeof e==`number`?H[e]:e;return t=t.replace(en,`(\\d+)`),RegExp(`^`+t+`$`)}function nn(e,t,n){var r=-1,i=-1,a=-1,o=-1,s=-1,c=-1;(t.match(en)||[]).forEach(function(e,t){var l=parseInt(n[t+1],10);switch(e.toLowerCase().charAt(0)){case`y`:r=l;break;case`d`:a=l;break;case`h`:o=l;break;case`s`:c=l;break;case`m`:o>=0?s=l:i=l;break}}),c>=0&&s==-1&&i>=0&&(s=i,i=-1);var l=(``+(r>=0?r:new Date().getFullYear())).slice(-4)+`-`+(`00`+(i>=1?i:1)).slice(-2)+`-`+(`00`+(a>=1?a:1)).slice(-2);l.length==7&&(l=`0`+l),l.length==8&&(l=`20`+l);var u=(`00`+(o>=0?o:0)).slice(-2)+`:`+(`00`+(s>=0?s:0)).slice(-2)+`:`+(`00`+(c>=0?c:0)).slice(-2);return o==-1&&s==-1&&c==-1?l:r==-1&&i==-1&&a==-1?u:l+`T`+u}var rn=(function(){var e={};e.version=`1.2.0`;function t(){for(var e=0,t=Array(256),n=0;n!=256;++n)e=n,e=e&1?-306674912^e>>>1:e>>>1,e=e&1?-306674912^e>>>1:e>>>1,e=e&1?-306674912^e>>>1:e>>>1,e=e&1?-306674912^e>>>1:e>>>1,e=e&1?-306674912^e>>>1:e>>>1,e=e&1?-306674912^e>>>1:e>>>1,e=e&1?-306674912^e>>>1:e>>>1,e=e&1?-306674912^e>>>1:e>>>1,t[n]=e;return typeof Int32Array<`u`?new Int32Array(t):t}var n=t();function r(e){var t=0,n=0,r=0,i=typeof Int32Array<`u`?new Int32Array(4096):Array(4096);for(r=0;r!=256;++r)i[r]=e[r];for(r=0;r!=256;++r)for(n=e[r],t=256+r;t<4096;t+=256)n=i[t]=n>>>8^e[n&255];var a=[];for(r=1;r!=16;++r)a[r-1]=typeof Int32Array<`u`?i.subarray(r*256,r*256+256):i.slice(r*256,r*256+256);return a}var i=r(n),a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14];function b(e,t){for(var r=t^-1,i=0,a=e.length;i<a;)r=r>>>8^n[(r^e.charCodeAt(i++))&255];return~r}function x(e,t){for(var r=t^-1,i=e.length-15,b=0;b<i;)r=y[e[b++]^r&255]^v[e[b++]^r>>8&255]^_[e[b++]^r>>16&255]^g[e[b++]^r>>>24]^h[e[b++]]^m[e[b++]]^p[e[b++]]^f[e[b++]]^d[e[b++]]^u[e[b++]]^l[e[b++]]^c[e[b++]]^s[e[b++]]^o[e[b++]]^a[e[b++]]^n[e[b++]];for(i+=15;b<i;)r=r>>>8^n[(r^e[b++])&255];return~r}function S(e,t){for(var r=t^-1,i=0,a=e.length,o=0,s=0;i<a;)o=e.charCodeAt(i++),o<128?r=r>>>8^n[(r^o)&255]:o<2048?(r=r>>>8^n[(r^(192|o>>6&31))&255],r=r>>>8^n[(r^(128|o&63))&255]):o>=55296&&o<57344?(o=(o&1023)+64,s=e.charCodeAt(i++)&1023,r=r>>>8^n[(r^(240|o>>8&7))&255],r=r>>>8^n[(r^(128|o>>2&63))&255],r=r>>>8^n[(r^(128|s>>6&15|(o&3)<<4))&255],r=r>>>8^n[(r^(128|s&63))&255]):(r=r>>>8^n[(r^(224|o>>12&15))&255],r=r>>>8^n[(r^(128|o>>6&63))&255],r=r>>>8^n[(r^(128|o&63))&255]);return~r}return e.table=n,e.bstr=b,e.buf=x,e.str=S,e})(),U=(function(){var e={};e.version=`1.2.1`;function t(e,t){for(var n=e.split(`/`),r=t.split(`/`),i=0,a=0,o=Math.min(n.length,r.length);i<o;++i){if(a=n[i].length-r[i].length)return a;if(n[i]!=r[i])return n[i]<r[i]?-1:1}return n.length-r.length}function n(e){if(e.charAt(e.length-1)==`/`)return e.slice(0,-1).indexOf(`/`)===-1?e:n(e.slice(0,-1));var t=e.lastIndexOf(`/`);return t===-1?e:e.slice(0,t+1)}function r(e){if(e.charAt(e.length-1)==`/`)return r(e.slice(0,-1));var t=e.lastIndexOf(`/`);return t===-1?e:e.slice(t+1)}function i(e,t){typeof t==`string`&&(t=new Date(t));var n=t.getHours();n=n<<6|t.getMinutes(),n=n<<5|t.getSeconds()>>>1,e.write_shift(2,n);var r=t.getFullYear()-1980;r=r<<4|t.getMonth()+1,r=r<<5|t.getDate(),e.write_shift(2,r)}function a(e){var t=e.read_shift(2)&65535,n=e.read_shift(2)&65535,r=new Date,i=n&31;n>>>=5;var a=n&15;n>>>=4,r.setMilliseconds(0),r.setFullYear(n+1980),r.setMonth(a-1),r.setDate(i);var o=t&31;t>>>=5;var s=t&63;return t>>>=6,r.setHours(t),r.setMinutes(s),r.setSeconds(o<<1),r}function o(e){hi(e,0);for(var t={},n=0;e.l<=e.length-4;){var r=e.read_shift(2),i=e.read_shift(2),a=e.l+i,o={};switch(r){case 21589:n=e.read_shift(1),n&1&&(o.mtime=e.read_shift(4)),i>5&&(n&2&&(o.atime=e.read_shift(4)),n&4&&(o.ctime=e.read_shift(4))),o.mtime&&(o.mt=new Date(o.mtime*1e3));break}e.l=a,t[r]=o}return t}var s;function c(){return s||={}}function l(e,t){if(e[0]==80&&e[1]==75)return Be(e,t);if((e[0]|32)==109&&(e[1]|32)==105)return Qe(e,t);if(e.length<512)throw Error(`CFB file size `+e.length+` < 512`);var n=3,r=512,i=0,a=0,o=0,s=0,c=0,l=[],m=e.slice(0,512);hi(m,0);var g=u(m);switch(n=g[0],n){case 3:r=512;break;case 4:r=4096;break;case 0:if(g[1]==0)return Be(e,t);default:throw Error(`Major Version: Expected 3 or 4 saw `+n)}r!==512&&(m=e.slice(0,r),hi(m,28));var y=e.slice(0,r);d(m,n);var b=m.read_shift(4,`i`);if(n===3&&b!==0)throw Error(`# Directory Sectors: Expected 0 saw `+b);m.l+=4,o=m.read_shift(4,`i`),m.l+=4,m.chk(`00100000`,`Mini Stream Cutoff Size: `),s=m.read_shift(4,`i`),i=m.read_shift(4,`i`),c=m.read_shift(4,`i`),a=m.read_shift(4,`i`);for(var x=-1,S=0;S<109&&(x=m.read_shift(4,`i`),!(x<0));++S)l[S]=x;var C=f(e,r);h(c,a,C,r,l);var w=_(C,o,l,r);w[o].name=`!Directory`,i>0&&s!==O&&(w[s].name=`!MiniFAT`),w[l[0]].name=`!FAT`,w.fat_addrs=l,w.ssz=r;var T={},E=[],D=[],k=[];v(o,w,C,E,i,T,D,s),p(D,k,E),E.shift();var A={FileIndex:D,FullPaths:k};return t&&t.raw&&(A.raw={header:y,sectors:C}),A}function u(e){if(e[e.l]==80&&e[e.l+1]==75)return[0,0];e.chk(k,`Header Signature: `),e.l+=16;var t=e.read_shift(2,`u`);return[e.read_shift(2,`u`),t]}function d(e,t){var n=9;switch(e.l+=2,n=e.read_shift(2)){case 9:if(t!=3)throw Error(`Sector Shift: Expected 9 saw `+n);break;case 12:if(t!=4)throw Error(`Sector Shift: Expected 12 saw `+n);break;default:throw Error(`Sector Shift: Expected 9 or 12 saw `+n)}e.chk(`0600`,`Mini Sector Shift: `),e.chk(`000000000000`,`Reserved: `)}function f(e,t){for(var n=Math.ceil(e.length/t)-1,r=[],i=1;i<n;++i)r[i-1]=e.slice(i*t,(i+1)*t);return r[n-1]=e.slice(n*t),r}function p(e,t,n){for(var r=0,i=0,a=0,o=0,s=0,c=n.length,l=[],u=[];r<c;++r)l[r]=u[r]=r,t[r]=n[r];for(;s<u.length;++s)r=u[s],i=e[r].L,a=e[r].R,o=e[r].C,l[r]===r&&(i!==-1&&l[i]!==i&&(l[r]=l[i]),a!==-1&&l[a]!==a&&(l[r]=l[a])),o!==-1&&(l[o]=r),i!==-1&&r!=l[r]&&(l[i]=l[r],u.lastIndexOf(i)<s&&u.push(i)),a!==-1&&r!=l[r]&&(l[a]=l[r],u.lastIndexOf(a)<s&&u.push(a));for(r=1;r<c;++r)l[r]===r&&(a!==-1&&l[a]!==a?l[r]=l[a]:i!==-1&&l[i]!==i&&(l[r]=l[i]));for(r=1;r<c;++r)if(e[r].type!==0){if(s=r,s!=l[s])do s=l[s],t[r]=t[s]+`/`+t[r];while(s!==0&&l[s]!==-1&&s!=l[s]);l[r]=-1}for(t[0]+=`/`,r=1;r<c;++r)e[r].type!==2&&(t[r]+=`/`)}function m(e,t,n){for(var r=e.start,i=e.size,a=[],o=r;n&&i>0&&o>=0;)a.push(t.slice(o*D,o*D+D)),i-=D,o=si(n,o*4);return a.length===0?K(0):He(a).slice(0,e.size)}function h(e,t,n,r,i){var a=O;if(e===O){if(t!==0)throw Error(`DIFAT chain shorter than expected`)}else if(e!==-1){var o=n[e],s=(r>>>2)-1;if(!o)return;for(var c=0;c<s&&(a=si(o,c*4))!==O;++c)i.push(a);h(si(o,r-4),t-1,n,r,i)}}function g(e,t,n,r,i){var a=[],o=[];i||=[];var s=r-1,c=0,l=0;for(c=t;c>=0;){i[c]=!0,a[a.length]=c,o.push(e[c]);var u=n[Math.floor(c*4/r)];if(l=c*4&s,r<4+l)throw Error(`FAT boundary crossed: `+c+` 4 `+r);if(!e[u])break;c=si(e[u],l)}return{nodes:a,data:Ir([o])}}function _(e,t,n,r){var i=e.length,a=[],o=[],s=[],c=[],l=r-1,u=0,d=0,f=0,p=0;for(u=0;u<i;++u)if(s=[],f=u+t,f>=i&&(f-=i),!o[f]){c=[];var m=[];for(d=f;d>=0;){m[d]=!0,o[d]=!0,s[s.length]=d,c.push(e[d]);var h=n[Math.floor(d*4/r)];if(p=d*4&l,r<4+p)throw Error(`FAT boundary crossed: `+d+` 4 `+r);if(!e[h]||(d=si(e[h],p),m[d]))break}a[f]={nodes:s,data:Ir([c])}}return a}function v(e,t,n,r,i,a,o,s){for(var c=0,l=r.length?2:0,u=t[e].data,d=0,f=0,p;d<u.length;d+=128){var h=u.slice(d,d+128);hi(h,64),f=h.read_shift(2),p=Rr(h,0,f-l),r.push(p);var _={name:p,type:h.read_shift(1),color:h.read_shift(1),L:h.read_shift(4,`i`),R:h.read_shift(4,`i`),C:h.read_shift(4,`i`),clsid:h.read_shift(16),state:h.read_shift(4,`i`),start:0,size:0};h.read_shift(2)+h.read_shift(2)+h.read_shift(2)+h.read_shift(2)!==0&&(_.ct=y(h,h.l-8)),h.read_shift(2)+h.read_shift(2)+h.read_shift(2)+h.read_shift(2)!==0&&(_.mt=y(h,h.l-8)),_.start=h.read_shift(4,`i`),_.size=h.read_shift(4,`i`),_.size<0&&_.start<0&&(_.size=_.type=0,_.start=O,_.name=``),_.type===5?(c=_.start,i>0&&c!==O&&(t[c].name=`!StreamData`)):_.size>=4096?(_.storage=`fat`,t[_.start]===void 0&&(t[_.start]=g(n,_.start,t.fat_addrs,t.ssz)),t[_.start].name=_.name,_.content=t[_.start].data.slice(0,_.size)):(_.storage=`minifat`,_.size<0?_.size=0:c!==O&&_.start!==O&&t[c]&&(_.content=m(_,t[c].data,(t[s]||{}).data))),_.content&&hi(_.content,0),a[p]=_,o.push(_)}}function y(e,t){return new Date((oi(e,t+4)/1e7*2**32+oi(e,t)/1e7-11644473600)*1e3)}function b(e,t){return c(),l(s.readFileSync(e),t)}function x(e,t){var n=t&&t.type;switch(n||Ne&&Buffer.isBuffer(e)&&(n=`buffer`),n||`base64`){case`file`:return b(e,t);case`base64`:return l(Le(Me(e)),t);case`binary`:return l(Le(e),t)}return l(e,t)}function S(e,t){var n=t||{},r=n.root||`Root Entry`;if(e.FullPaths||=[],e.FileIndex||=[],e.FullPaths.length!==e.FileIndex.length)throw Error(`inconsistent CFB structure`);e.FullPaths.length===0&&(e.FullPaths[0]=r+`/`,e.FileIndex[0]={name:r,type:5}),n.CLSID&&(e.FileIndex[0].clsid=n.CLSID),C(e)}function C(e){var t=`Sh33tJ5`;if(!U.find(e,`/`+t)){var n=K(4);n[0]=55,n[1]=n[3]=50,n[2]=54,e.FileIndex.push({name:t,type:2,content:n,size:4,L:69,R:69,C:69}),e.FullPaths.push(e.FullPaths[0]+t),w(e)}}function w(e,i){S(e);for(var a=!1,o=!1,s=e.FullPaths.length-1;s>=0;--s){var c=e.FileIndex[s];switch(c.type){case 0:o?a=!0:(e.FileIndex.pop(),e.FullPaths.pop());break;case 1:case 2:case 5:o=!0,isNaN(c.R*c.L*c.C)&&(a=!0),c.R>-1&&c.L>-1&&c.R==c.L&&(a=!0);break;default:a=!0;break}}if(!(!a&&!i)){var l=new Date(1987,1,19),u=0,d=Object.create?Object.create(null):{},f=[];for(s=0;s<e.FullPaths.length;++s)d[e.FullPaths[s]]=!0,e.FileIndex[s].type!==0&&f.push([e.FullPaths[s],e.FileIndex[s]]);for(s=0;s<f.length;++s){var p=n(f[s][0]);o=d[p],o||(f.push([p,{name:r(p).replace(`/`,``),type:1,clsid:j,ct:l,mt:l,content:null}]),d[p]=!0)}for(f.sort(function(e,n){return t(e[0],n[0])}),e.FullPaths=[],e.FileIndex=[],s=0;s<f.length;++s)e.FullPaths[s]=f[s][0],e.FileIndex[s]=f[s][1];for(s=0;s<f.length;++s){var m=e.FileIndex[s],h=e.FullPaths[s];if(m.name=r(h).replace(`/`,``),m.L=m.R=m.C=-(m.color=1),m.size=m.content?m.content.length:0,m.start=0,m.clsid=m.clsid||j,s===0)m.C=f.length>1?1:-1,m.size=0,m.type=5;else if(h.slice(-1)==`/`){for(u=s+1;u<f.length&&n(e.FullPaths[u])!=h;++u);for(m.C=u>=f.length?-1:u,u=s+1;u<f.length&&n(e.FullPaths[u])!=n(h);++u);m.R=u>=f.length?-1:u,m.type=1}else n(e.FullPaths[s+1]||``)==n(h)&&(m.R=s+1),m.type=2}}}function T(e,t){var n=t||{};if(n.fileType==`mad`)return $e(e,n);switch(w(e),n.fileType){case`zip`:return Ue(e,n)}var r=(function(e){for(var t=0,n=0,r=0;r<e.FileIndex.length;++r){var i=e.FileIndex[r];if(i.content){var a=i.content.length;a>0&&(a<4096?t+=a+63>>6:n+=a+511>>9)}}for(var o=e.FullPaths.length+3>>2,s=t+7>>3,c=t+127>>7,l=s+n+o+c,u=l+127>>7,d=u<=109?0:Math.ceil((u-109)/127);l+u+d+127>>7>u;)d=++u<=109?0:Math.ceil((u-109)/127);var f=[1,d,u,c,o,n,t,0];return e.FileIndex[0].size=t<<6,f[7]=(e.FileIndex[0].start=f[0]+f[1]+f[2]+f[3]+f[4]+f[5])+(f[6]+7>>3),f})(e),i=K(r[7]<<9),a=0,o=0;for(a=0;a<8;++a)i.write_shift(1,A[a]);for(a=0;a<8;++a)i.write_shift(2,0);for(i.write_shift(2,62),i.write_shift(2,3),i.write_shift(2,65534),i.write_shift(2,9),i.write_shift(2,6),a=0;a<3;++a)i.write_shift(2,0);for(i.write_shift(4,0),i.write_shift(4,r[2]),i.write_shift(4,r[0]+r[1]+r[2]+r[3]-1),i.write_shift(4,0),i.write_shift(4,4096),i.write_shift(4,r[3]?r[0]+r[1]+r[2]-1:O),i.write_shift(4,r[3]),i.write_shift(-4,r[1]?r[0]-1:O),i.write_shift(4,r[1]),a=0;a<109;++a)i.write_shift(-4,a<r[2]?r[1]+a:-1);if(r[1])for(o=0;o<r[1];++o){for(;a<236+o*127;++a)i.write_shift(-4,a<r[2]?r[1]+a:-1);i.write_shift(-4,o===r[1]-1?O:o+1)}var s=function(e){for(o+=e;a<o-1;++a)i.write_shift(-4,a+1);e&&(++a,i.write_shift(-4,O))};for(o=a=0,o+=r[1];a<o;++a)i.write_shift(-4,M.DIFSECT);for(o+=r[2];a<o;++a)i.write_shift(-4,M.FATSECT);s(r[3]),s(r[4]);for(var c=0,l=0,u=e.FileIndex[0];c<e.FileIndex.length;++c)u=e.FileIndex[c],u.content&&(l=u.content.length,!(l<4096)&&(u.start=o,s(l+511>>9)));for(s(r[6]+7>>3);i.l&511;)i.write_shift(-4,M.ENDOFCHAIN);for(o=a=0,c=0;c<e.FileIndex.length;++c)u=e.FileIndex[c],u.content&&(l=u.content.length,!(!l||l>=4096)&&(u.start=o,s(l+63>>6)));for(;i.l&511;)i.write_shift(-4,M.ENDOFCHAIN);for(a=0;a<r[4]<<2;++a){var d=e.FullPaths[a];if(!d||d.length===0){for(c=0;c<17;++c)i.write_shift(4,0);for(c=0;c<3;++c)i.write_shift(4,-1);for(c=0;c<12;++c)i.write_shift(4,0);continue}u=e.FileIndex[a],a===0&&(u.start=u.size?u.start-1:O);var f=a===0&&n.root||u.name;if(l=2*(f.length+1),i.write_shift(64,f,`utf16le`),i.write_shift(2,l),i.write_shift(1,u.type),i.write_shift(1,u.color),i.write_shift(-4,u.L),i.write_shift(-4,u.R),i.write_shift(-4,u.C),u.clsid)i.write_shift(16,u.clsid,`hex`);else for(c=0;c<4;++c)i.write_shift(4,0);i.write_shift(4,u.state||0),i.write_shift(4,0),i.write_shift(4,0),i.write_shift(4,0),i.write_shift(4,0),i.write_shift(4,u.start),i.write_shift(4,u.size),i.write_shift(4,0)}for(a=1;a<e.FileIndex.length;++a)if(u=e.FileIndex[a],u.size>=4096)if(i.l=u.start+1<<9,Ne&&Buffer.isBuffer(u.content))u.content.copy(i,i.l,0,u.size),i.l+=u.size+511&-512;else{for(c=0;c<u.size;++c)i.write_shift(1,u.content[c]);for(;c&511;++c)i.write_shift(1,0)}for(a=1;a<e.FileIndex.length;++a)if(u=e.FileIndex[a],u.size>0&&u.size<4096)if(Ne&&Buffer.isBuffer(u.content))u.content.copy(i,i.l,0,u.size),i.l+=u.size+63&-64;else{for(c=0;c<u.size;++c)i.write_shift(1,u.content[c]);for(;c&63;++c)i.write_shift(1,0)}if(Ne)i.l=i.length;else for(;i.l<i.length;)i.write_shift(1,0);return i}function E(e,t){var n=e.FullPaths.map(function(e){return e.toUpperCase()}),r=n.map(function(e){var t=e.split(`/`);return t[t.length-(e.slice(-1)==`/`?2:1)]}),i=!1;t.charCodeAt(0)===47?(i=!0,t=n[0].slice(0,-1)+t):i=t.indexOf(`/`)!==-1;var a=t.toUpperCase(),o=i===!0?n.indexOf(a):r.indexOf(a);if(o!==-1)return e.FileIndex[o];var s=!a.match(Ge);for(a=a.replace(We,``),s&&(a=a.replace(Ge,`!`)),o=0;o<n.length;++o)if((s?n[o].replace(Ge,`!`):n[o]).replace(We,``)==a||(s?r[o].replace(Ge,`!`):r[o]).replace(We,``)==a)return e.FileIndex[o];return null}var D=64,O=-2,k=`d0cf11e0a1b11ae1`,A=[208,207,17,224,161,177,26,225],j=`00000000000000000000000000000000`,M={MAXREGSECT:-6,DIFSECT:-4,FATSECT:-3,ENDOFCHAIN:O,FREESECT:-1,HEADER_SIGNATURE:k,HEADER_MINOR_VERSION:`3e00`,MAXREGSID:-6,NOSTREAM:-1,HEADER_CLSID:j,EntryTypes:[`unknown`,`storage`,`stream`,`lockbytes`,`property`,`root`]};function N(e,t,n){c();var r=T(e,n);s.writeFileSync(t,r)}function P(e){for(var t=Array(e.length),n=0;n<e.length;++n)t[n]=String.fromCharCode(e[n]);return t.join(``)}function F(e,t){var n=T(e,t);switch(t&&t.type||`buffer`){case`file`:return c(),s.writeFileSync(t.filename,n),n;case`binary`:return typeof n==`string`?n:P(n);case`base64`:return je(typeof n==`string`?n:P(n));case`buffer`:if(Ne)return Buffer.isBuffer(n)?n:Pe(n);case`array`:return typeof n==`string`?Le(n):n}return n}var I;function L(e){try{var t=e.InflateRaw,n=new t;if(n._processChunk(new Uint8Array([3,0]),n._finishFlushFlag),n.bytesRead)I=e;else throw Error(`zlib does not expose bytesRead`)}catch(e){console.error(`cannot use native zlib: `+(e.message||e))}}function R(e,t){if(!I)return Re(e,t);var n=I.InflateRaw,r=new n,i=r._processChunk(e.slice(e.l),r._finishFlushFlag);return e.l+=r.bytesRead,i}function ee(e){return I?I.deflateRawSync(e):Ce(e)}var te=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],ne=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258],re=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577];function ie(e){var t=(e<<1|e<<11)&139536|(e<<5|e<<15)&558144;return(t>>16|t>>8|t)&255}for(var z=typeof Uint8Array<`u`,B=z?new Uint8Array(256):[],ae=0;ae<256;++ae)B[ae]=ie(ae);function oe(e,t){var n=B[e&255];return t<=8?n>>>8-t:(n=n<<8|B[e>>8&255],t<=16?n>>>16-t:(n=n<<8|B[e>>16&255],n>>>24-t))}function V(e,t){var n=t&7,r=t>>>3;return(e[r]|(n<=6?0:e[r+1]<<8))>>>n&3}function se(e,t){var n=t&7,r=t>>>3;return(e[r]|(n<=5?0:e[r+1]<<8))>>>n&7}function ce(e,t){var n=t&7,r=t>>>3;return(e[r]|(n<=4?0:e[r+1]<<8))>>>n&15}function le(e,t){var n=t&7,r=t>>>3;return(e[r]|(n<=3?0:e[r+1]<<8))>>>n&31}function ue(e,t){var n=t&7,r=t>>>3;return(e[r]|(n<=1?0:e[r+1]<<8))>>>n&127}function de(e,t,n){var r=t&7,i=t>>>3,a=(1<<n)-1,o=e[i]>>>r;return n<8-r||(o|=e[i+1]<<8-r,n<16-r)||(o|=e[i+2]<<16-r,n<24-r)||(o|=e[i+3]<<24-r),o&a}function fe(e,t,n){var r=t&7,i=t>>>3;return r<=5?e[i]|=(n&7)<<r:(e[i]|=n<<r&255,e[i+1]=(n&7)>>8-r),t+3}function pe(e,t,n){var r=t&7,i=t>>>3;return n=(n&1)<<r,e[i]|=n,t+1}function me(e,t,n){var r=t&7,i=t>>>3;return n<<=r,e[i]|=n&255,n>>>=8,e[i+1]=n,t+8}function he(e,t,n){var r=t&7,i=t>>>3;return n<<=r,e[i]|=n&255,n>>>=8,e[i+1]=n&255,e[i+2]=n>>>8,t+16}function ge(e,t){var n=e.length,r=2*n>t?2*n:t+5,i=0;if(n>=t)return e;if(Ne){var a=Ie(r);if(e.copy)e.copy(a);else for(;i<e.length;++i)a[i]=e[i];return a}else if(z){var o=new Uint8Array(r);if(o.set)o.set(e);else for(;i<n;++i)o[i]=e[i];return o}return e.length=r,e}function _e(e){for(var t=Array(e),n=0;n<e;++n)t[n]=0;return t}function ve(e,t,n){var r=1,i=0,a=0,o=0,s=0,c=e.length,l=z?new Uint16Array(32):_e(32);for(a=0;a<32;++a)l[a]=0;for(a=c;a<n;++a)e[a]=0;c=e.length;var u=z?new Uint16Array(c):_e(c);for(a=0;a<c;++a)l[i=e[a]]++,r<i&&(r=i),u[a]=0;for(l[0]=0,a=1;a<=r;++a)l[a+16]=s=s+l[a-1]<<1;for(a=0;a<c;++a)s=e[a],s!=0&&(u[a]=l[s+16]++);var d=0;for(a=0;a<c;++a)if(d=e[a],d!=0)for(s=oe(u[a],r)>>r-d,o=(1<<r+4-d)-1;o>=0;--o)t[s|o<<d]=d&15|a<<4;return r}var ye=z?new Uint16Array(512):_e(512),be=z?new Uint16Array(32):_e(32);if(!z){for(var xe=0;xe<512;++xe)ye[xe]=0;for(xe=0;xe<32;++xe)be[xe]=0}(function(){for(var e=[],t=0;t<32;t++)e.push(5);ve(e,be,32);var n=[];for(t=0;t<=143;t++)n.push(8);for(;t<=255;t++)n.push(9);for(;t<=279;t++)n.push(7);for(;t<=287;t++)n.push(8);ve(n,ye,288)})();var Se=(function(){for(var e=z?new Uint8Array(32768):[],t=0,n=0;t<re.length-1;++t)for(;n<re[t+1];++n)e[n]=t;for(;n<32768;++n)e[n]=29;var r=z?new Uint8Array(259):[];for(t=0,n=0;t<ne.length-1;++t)for(;n<ne[t+1];++n)r[n]=t;function i(e,t){for(var n=0;n<e.length;){var r=Math.min(65535,e.length-n),i=n+r==e.length;for(t.write_shift(1,+i),t.write_shift(2,r),t.write_shift(2,~r&65535);r-- >0;)t[t.l++]=e[n++]}return t.l}function a(t,n){for(var i=0,a=0,o=z?new Uint16Array(32768):[];a<t.length;){var s=Math.min(65535,t.length-a);if(s<10){for(i=fe(n,i,+(a+s==t.length)),i&7&&(i+=8-(i&7)),n.l=i/8|0,n.write_shift(2,s),n.write_shift(2,~s&65535);s-- >0;)n[n.l++]=t[a++];i=n.l*8;continue}i=fe(n,i,+(a+s==t.length)+2);for(var c=0;s-- >0;){var l=t[a];c=(c<<5^l)&32767;var u=-1,d=0;if((u=o[c])&&(u|=a&-32768,u>a&&(u-=32768),u<a))for(;t[u+d]==t[a+d]&&d<250;)++d;if(d>2){l=r[d],l<=22?i=me(n,i,B[l+1]>>1)-1:(me(n,i,3),i+=5,me(n,i,B[l-23]>>5),i+=3);var f=l<8?0:l-4>>2;f>0&&(he(n,i,d-ne[l]),i+=f),l=e[a-u],i=me(n,i,B[l]>>3),i-=3;var p=l<4?0:l-2>>1;p>0&&(he(n,i,a-u-re[l]),i+=p);for(var m=0;m<d;++m)o[c]=a&32767,c=(c<<5^t[a])&32767,++a;s-=d-1}else l<=143?l+=48:i=pe(n,i,1),i=me(n,i,B[l]),o[c]=a&32767,++a}i=me(n,i,0)-1}return n.l=(i+7)/8|0,n.l}return function(e,t){return e.length<8?i(e,t):a(e,t)}})();function Ce(e){var t=K(50+Math.floor(e.length*1.1)),n=Se(e,t);return t.slice(0,n)}var we=z?new Uint16Array(32768):_e(32768),Te=z?new Uint16Array(32768):_e(32768),Ee=z?new Uint16Array(128):_e(128),De=1,Oe=1;function ke(e,t){var n=le(e,t)+257;t+=5;var r=le(e,t)+1;t+=5;var i=ce(e,t)+4;t+=4;for(var a=0,o=z?new Uint8Array(19):_e(19),s=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],c=1,l=z?new Uint8Array(8):_e(8),u=z?new Uint8Array(8):_e(8),d=o.length,f=0;f<i;++f)o[te[f]]=a=se(e,t),c<a&&(c=a),l[a]++,t+=3;var p=0;for(l[0]=0,f=1;f<=c;++f)u[f]=p=p+l[f-1]<<1;for(f=0;f<d;++f)(p=o[f])!=0&&(s[f]=u[p]++);var m=0;for(f=0;f<d;++f)if(m=o[f],m!=0){p=B[s[f]]>>8-m;for(var h=(1<<7-m)-1;h>=0;--h)Ee[p|h<<m]=m&7|f<<3}var g=[];for(c=1;g.length<n+r;)switch(p=Ee[ue(e,t)],t+=p&7,p>>>=3){case 16:for(a=3+V(e,t),t+=2,p=g[g.length-1];a-- >0;)g.push(p);break;case 17:for(a=3+se(e,t),t+=3;a-- >0;)g.push(0);break;case 18:for(a=11+ue(e,t),t+=7;a-- >0;)g.push(0);break;default:g.push(p),c<p&&(c=p);break}var _=g.slice(0,n),v=g.slice(n);for(f=n;f<286;++f)_[f]=0;for(f=r;f<30;++f)v[f]=0;return De=ve(_,we,286),Oe=ve(v,Te,30),t}function Ae(e,t){if(e[0]==3&&!(e[1]&3))return[Fe(t),2];for(var n=0,r=0,i=Ie(t||1<<18),a=0,o=i.length>>>0,s=0,c=0;!(r&1);){if(r=se(e,n),n+=3,r>>>1)r>>1==1?(s=9,c=5):(n=ke(e,n),s=De,c=Oe);else{n&7&&(n+=8-(n&7));var l=e[n>>>3]|e[(n>>>3)+1]<<8;if(n+=32,l>0)for(!t&&o<a+l&&(i=ge(i,a+l),o=i.length);l-- >0;)i[a++]=e[n>>>3],n+=8;continue}for(;;){!t&&o<a+32767&&(i=ge(i,a+32767),o=i.length);var u=de(e,n,s),d=r>>>1==1?ye[u]:we[u];if(n+=d&15,d>>>=4,!(d>>>8&255))i[a++]=d;else if(d==256)break;else{d-=257;var f=d<8?0:d-4>>2;f>5&&(f=0);var p=a+ne[d];f>0&&(p+=de(e,n,f),n+=f),u=de(e,n,c),d=r>>>1==1?be[u]:Te[u],n+=d&15,d>>>=4;var m=d<4?0:d-2>>1,h=re[d];for(m>0&&(h+=de(e,n,m),n+=m),!t&&o<p&&(i=ge(i,p+100),o=i.length);a<p;)i[a]=i[a-h],++a}}}return t?[i,n+7>>>3]:[i.slice(0,a),n+7>>>3]}function Re(e,t){var n=Ae(e.slice(e.l||0),t);return e.l+=n[1],n[0]}function ze(e,t){if(e)typeof console<`u`&&console.error(t);else throw Error(t)}function Be(e,t){var n=e;hi(n,0);var r={FileIndex:[],FullPaths:[]};S(r,{root:t.root});for(var i=n.length-4;(n[i]!=80||n[i+1]!=75||n[i+2]!=5||n[i+3]!=6)&&i>=0;)--i;n.l=i+4,n.l+=4;var a=n.read_shift(2);for(n.l+=6,n.l=n.read_shift(4),i=0;i<a;++i){n.l+=20;var s=n.read_shift(4),c=n.read_shift(4),l=n.read_shift(2),u=n.read_shift(2),d=n.read_shift(2);n.l+=8;var f=n.read_shift(4),p=o(n.slice(n.l+l,n.l+l+u));n.l+=l+u+d;var m=n.l;n.l=f+4,Ve(n,s,c,r,p),n.l=m}return r}function Ve(e,t,n,r,i){e.l+=2;var s=e.read_shift(2),c=e.read_shift(2),l=a(e);if(s&8257)throw Error(`Unsupported ZIP encryption`);for(var u=e.read_shift(4),d=e.read_shift(4),f=e.read_shift(4),p=e.read_shift(2),m=e.read_shift(2),h=``,g=0;g<p;++g)h+=String.fromCharCode(e[e.l++]);if(m){var _=o(e.slice(e.l,e.l+m));(_[21589]||{}).mt&&(l=_[21589].mt),((i||{})[21589]||{}).mt&&(l=i[21589].mt)}e.l+=m;var v=e.slice(e.l,e.l+d);switch(c){case 8:v=R(e,f);break;case 0:break;default:throw Error(`Unsupported ZIP Compression method `+c)}var y=!1;s&8&&(u=e.read_shift(4),u==134695760&&(u=e.read_shift(4),y=!0),d=e.read_shift(4),f=e.read_shift(4)),d!=t&&ze(y,`Bad compressed size: `+t+` != `+d),f!=n&&ze(y,`Bad uncompressed size: `+n+` != `+f),tt(r,h,v,{unsafe:!0,mt:l})}function Ue(e,t){var n=t||{},r=[],a=[],o=K(1),s=n.compression?8:0,c=0,l=0,u=0,d=0,f=0,p=e.FullPaths[0],m=p,h=e.FileIndex[0],g=[],_=0;for(l=1;l<e.FullPaths.length;++l)if(m=e.FullPaths[l].slice(p.length),h=e.FileIndex[l],!(!h.size||!h.content||m==`Sh33tJ5`)){var v=d,y=K(m.length);for(u=0;u<m.length;++u)y.write_shift(1,m.charCodeAt(u)&127);y=y.slice(0,y.l),g[f]=rn.buf(h.content,0);var b=h.content;s==8&&(b=ee(b)),o=K(30),o.write_shift(4,67324752),o.write_shift(2,20),o.write_shift(2,c),o.write_shift(2,s),h.mt?i(o,h.mt):o.write_shift(4,0),o.write_shift(-4,c&8?0:g[f]),o.write_shift(4,c&8?0:b.length),o.write_shift(4,c&8?0:h.content.length),o.write_shift(2,y.length),o.write_shift(2,0),d+=o.length,r.push(o),d+=y.length,r.push(y),d+=b.length,r.push(b),c&8&&(o=K(12),o.write_shift(-4,g[f]),o.write_shift(4,b.length),o.write_shift(4,h.content.length),d+=o.l,r.push(o)),o=K(46),o.write_shift(4,33639248),o.write_shift(2,0),o.write_shift(2,20),o.write_shift(2,c),o.write_shift(2,s),o.write_shift(4,0),o.write_shift(-4,g[f]),o.write_shift(4,b.length),o.write_shift(4,h.content.length),o.write_shift(2,y.length),o.write_shift(2,0),o.write_shift(2,0),o.write_shift(2,0),o.write_shift(2,0),o.write_shift(4,0),o.write_shift(4,v),_+=o.l,a.push(o),_+=y.length,a.push(y),++f}return o=K(22),o.write_shift(4,101010256),o.write_shift(2,0),o.write_shift(2,0),o.write_shift(2,f),o.write_shift(2,f),o.write_shift(4,_),o.write_shift(4,d),o.write_shift(2,0),He([He(r),He(a),o])}var Ke={htm:`text/html`,xml:`text/xml`,gif:`image/gif`,jpg:`image/jpeg`,png:`image/png`,mso:`application/x-mso`,thmx:`application/vnd.ms-officetheme`,sh33tj5:`application/octet-stream`};function qe(e,t){if(e.ctype)return e.ctype;var n=e.name||``,r=n.match(/\.([^\.]+)$/);return r&&Ke[r[1]]||t&&(r=(n=t).match(/[\.\\]([^\.\\])+$/),r&&Ke[r[1]])?Ke[r[1]]:`application/octet-stream`}function Je(e){for(var t=je(e),n=[],r=0;r<t.length;r+=76)n.push(t.slice(r,r+76));return n.join(`\r
`)+`\r
`}function Ye(e){var t=e.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g,function(e){var t=e.charCodeAt(0).toString(16).toUpperCase();return`=`+(t.length==1?`0`+t:t)});t=t.replace(/ $/gm,`=20`).replace(/\t$/gm,`=09`),t.charAt(0)==`
`&&(t=`=0D`+t.slice(1)),t=t.replace(/\r(?!\n)/gm,`=0D`).replace(/\n\n/gm,`
=0A`).replace(/([^\r\n])\n/gm,`$1=0A`);for(var n=[],r=t.split(`\r
`),i=0;i<r.length;++i){var a=r[i];if(a.length==0){n.push(``);continue}for(var o=0;o<a.length;){var s=76,c=a.slice(o,o+s);c.charAt(s-1)==`=`?s--:c.charAt(s-2)==`=`?s-=2:c.charAt(s-3)==`=`&&(s-=3),c=a.slice(o,o+s),o+=s,o<a.length&&(c+=`=`),n.push(c)}}return n.join(`\r
`)}function Xe(e){for(var t=[],n=0;n<e.length;++n){for(var r=e[n];n<=e.length&&r.charAt(r.length-1)==`=`;)r=r.slice(0,r.length-1)+e[++n];t.push(r)}for(var i=0;i<t.length;++i)t[i]=t[i].replace(/[=][0-9A-Fa-f]{2}/g,function(e){return String.fromCharCode(parseInt(e.slice(1),16))});return Le(t.join(`\r
`))}function Ze(e,t,n){for(var r=``,i=``,a=``,o,s=0;s<10;++s){var c=t[s];if(!c||c.match(/^\s*$/))break;var l=c.match(/^(.*?):\s*([^\s].*)$/);if(l)switch(l[1].toLowerCase()){case`content-location`:r=l[2].trim();break;case`content-type`:a=l[2].trim();break;case`content-transfer-encoding`:i=l[2].trim();break}}switch(++s,i.toLowerCase()){case`base64`:o=Le(Me(t.slice(s).join(``)));break;case`quoted-printable`:o=Xe(t.slice(s));break;default:throw Error(`Unsupported Content-Transfer-Encoding `+i)}var u=tt(e,r.slice(n.length),o,{unsafe:!0});a&&(u.ctype=a)}function Qe(e,t){if(P(e.slice(0,13)).toLowerCase()!=`mime-version:`)throw Error(`Unsupported MAD header`);var n=t&&t.root||``,r=(Ne&&Buffer.isBuffer(e)?e.toString(`binary`):P(e)).split(`\r
`),i=0,a=``;for(i=0;i<r.length;++i)if(a=r[i],/^Content-Location:/i.test(a)&&(a=a.slice(a.indexOf(`file`)),n||=a.slice(0,a.lastIndexOf(`/`)+1),a.slice(0,n.length)!=n))for(;n.length>0&&(n=n.slice(0,n.length-1),n=n.slice(0,n.lastIndexOf(`/`)+1),a.slice(0,n.length)!=n););var o=(r[1]||``).match(/boundary="(.*?)"/);if(!o)throw Error(`MAD cannot find boundary`);var s=`--`+(o[1]||``),c={FileIndex:[],FullPaths:[]};S(c);var l,u=0;for(i=0;i<r.length;++i){var d=r[i];d!==s&&d!==s+`--`||(u++&&Ze(c,r.slice(l,i),n),l=i)}return c}function $e(e,t){var n=t||{},r=n.boundary||`SheetJS`;r=`------=`+r;for(var i=[`MIME-Version: 1.0`,`Content-Type: multipart/related; boundary="`+r.slice(2)+`"`,``,``,``],a=e.FullPaths[0],o=a,s=e.FileIndex[0],c=1;c<e.FullPaths.length;++c)if(o=e.FullPaths[c].slice(a.length),s=e.FileIndex[c],!(!s.size||!s.content||o==`Sh33tJ5`)){o=o.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g,function(e){return`_x`+e.charCodeAt(0).toString(16)+`_`}).replace(/[\u0080-\uFFFF]/g,function(e){return`_u`+e.charCodeAt(0).toString(16)+`_`});for(var l=s.content,u=Ne&&Buffer.isBuffer(l)?l.toString(`binary`):P(l),d=0,f=Math.min(1024,u.length),p=0,m=0;m<=f;++m)(p=u.charCodeAt(m))>=32&&p<128&&++d;var h=d>=f*4/5;i.push(r),i.push(`Content-Location: `+(n.root||`file:///C:/SheetJS/`)+o),i.push(`Content-Transfer-Encoding: `+(h?`quoted-printable`:`base64`)),i.push(`Content-Type: `+qe(s,o)),i.push(``),i.push(h?Ye(u):Je(u))}return i.push(r+`--\r
`),i.join(`\r
`)}function et(e){var t={};return S(t,e),t}function tt(e,t,n,i){var a=i&&i.unsafe;a||S(e);var o=!a&&U.find(e,t);if(!o){var s=e.FullPaths[0];t.slice(0,s.length)==s?s=t:(s.slice(-1)!=`/`&&(s+=`/`),s=(s+t).replace(`//`,`/`)),o={name:r(t),type:2},e.FileIndex.push(o),e.FullPaths.push(s),a||U.utils.cfb_gc(e)}return o.content=n,o.size=n?n.length:0,i&&(i.CLSID&&(o.clsid=i.CLSID),i.mt&&(o.mt=i.mt),i.ct&&(o.ct=i.ct)),o}function nt(e,t){S(e);var n=U.find(e,t);if(n){for(var r=0;r<e.FileIndex.length;++r)if(e.FileIndex[r]==n)return e.FileIndex.splice(r,1),e.FullPaths.splice(r,1),!0}return!1}function rt(e,t,n){S(e);var i=U.find(e,t);if(i){for(var a=0;a<e.FileIndex.length;++a)if(e.FileIndex[a]==i)return e.FileIndex[a].name=r(n),e.FullPaths[a]=n,!0}return!1}function H(e){w(e,!0)}return e.find=E,e.read=x,e.parse=l,e.write=F,e.writeFile=N,e.utils={cfb_new:et,cfb_add:tt,cfb_del:nt,cfb_mov:rt,cfb_gc:H,ReadShift:li,CheckField:mi,prep_blob:hi,bconcat:He,use_zlib:L,_deflateRaw:Ce,_inflateRaw:Re,consts:M},e})(),an=void 0;function on(e){return typeof e==`string`?Re(e):Array.isArray(e)?Be(e):e}function sn(e,t,n){if(an!==void 0&&an.writeFileSync)return n?an.writeFileSync(e,t,n):an.writeFileSync(e,t);if(typeof Deno<`u`){if(n&&typeof t==`string`)switch(n){case`utf8`:t=new TextEncoder(n).encode(t);break;case`binary`:t=Re(t);break;default:throw Error(`Unsupported encoding `+n)}return Deno.writeFileSync(e,t)}var r=n==`utf8`?gr(t):t;if(typeof IE_SaveFile<`u`)return IE_SaveFile(r,e);if(typeof Blob<`u`){var i=new Blob([on(r)],{type:`application/octet-stream`});if(typeof navigator<`u`&&navigator.msSaveBlob)return navigator.msSaveBlob(i,e);if(typeof saveAs<`u`)return saveAs(i,e);if(typeof URL<`u`&&typeof document<`u`&&document.createElement&&URL.createObjectURL){var a=URL.createObjectURL(i);if(typeof chrome==`object`&&typeof(chrome.downloads||{}).download==`function`)return URL.revokeObjectURL&&typeof setTimeout<`u`&&setTimeout(function(){URL.revokeObjectURL(a)},6e4),chrome.downloads.download({url:a,filename:e,saveAs:!0});var o=document.createElement(`a`);if(o.download!=null)return o.download=e,o.href=a,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL&&typeof setTimeout<`u`&&setTimeout(function(){URL.revokeObjectURL(a)},6e4),a}}if(typeof $<`u`&&typeof File<`u`&&typeof Folder<`u`)try{var s=File(e);return s.open(`w`),s.encoding=`binary`,Array.isArray(t)&&(t=ze(t)),s.write(t),s.close(),t}catch(e){if(!e.message||!e.message.match(/onstruct/))throw e}throw Error(`cannot save file `+e)}function cn(e){if(an!==void 0)return an.readFileSync(e);if(typeof Deno<`u`)return Deno.readFileSync(e);if(typeof $<`u`&&typeof File<`u`&&typeof Folder<`u`)try{var t=File(e);t.open(`r`),t.encoding=`binary`;var n=t.read();return t.close(),n}catch(e){if(!e.message||!e.message.match(/onstruct/))throw e}throw Error(`Cannot access file `+e)}function ln(e){for(var t=Object.keys(e),n=[],r=0;r<t.length;++r)Object.prototype.hasOwnProperty.call(e,t[r])&&n.push(t[r]);return n}function un(e,t){for(var n=[],r=ln(e),i=0;i!==r.length;++i)n[e[r[i]][t]]??(n[e[r[i]][t]]=r[i]);return n}function dn(e){for(var t=[],n=ln(e),r=0;r!==n.length;++r)t[e[n[r]]]=n[r];return t}function fn(e){for(var t=[],n=ln(e),r=0;r!==n.length;++r)t[e[n[r]]]=parseInt(n[r],10);return t}function pn(e){for(var t=[],n=ln(e),r=0;r!==n.length;++r)t[e[n[r]]]??(t[e[n[r]]]=[]),t[e[n[r]]].push(n[r]);return t}var mn=new Date(1899,11,30,0,0,0);function hn(e,t){var n=e.getTime();t&&(n-=1462*24*60*60*1e3);var r=mn.getTime()+(e.getTimezoneOffset()-mn.getTimezoneOffset())*6e4;return(n-r)/(1440*60*1e3)}var gn=new Date,_n=mn.getTime()+(gn.getTimezoneOffset()-mn.getTimezoneOffset())*6e4,vn=gn.getTimezoneOffset();function yn(e){var t=new Date;return t.setTime(e*24*60*60*1e3+_n),t.getTimezoneOffset()!==vn&&t.setTime(t.getTime()+(t.getTimezoneOffset()-vn)*6e4),t}function bn(e){var t=0,n=0,r=!1,i=e.match(/P([0-9\.]+Y)?([0-9\.]+M)?([0-9\.]+D)?T([0-9\.]+H)?([0-9\.]+M)?([0-9\.]+S)?/);if(!i)throw Error(`|`+e+`| is not an ISO8601 Duration`);for(var a=1;a!=i.length;++a)if(i[a]){switch(n=1,a>3&&(r=!0),i[a].slice(i[a].length-1)){case`Y`:throw Error(`Unsupported ISO Duration Field: `+i[a].slice(i[a].length-1));case`D`:n*=24;case`H`:n*=60;case`M`:if(r)n*=60;else throw Error(`Unsupported ISO Duration Field: M`);case`S`:break}t+=n*parseInt(i[a],10)}return t}var xn=new Date(`2017-02-19T19:06:09.000Z`),Sn=isNaN(xn.getFullYear())?new Date(`2/19/17`):xn,Cn=Sn.getFullYear()==2017;function wn(e,t){var n=new Date(e);if(Cn)return t>0?n.setTime(n.getTime()+n.getTimezoneOffset()*60*1e3):t<0&&n.setTime(n.getTime()-n.getTimezoneOffset()*60*1e3),n;if(e instanceof Date)return e;if(Sn.getFullYear()==1917&&!isNaN(n.getFullYear())){var r=n.getFullYear();return e.indexOf(``+r)>-1||n.setFullYear(n.getFullYear()+100),n}var i=e.match(/\d+/g)||[`2017`,`2`,`19`,`0`,`0`,`0`],a=new Date(+i[0],i[1]-1,+i[2],+i[3]||0,+i[4]||0,+i[5]||0);return e.indexOf(`Z`)>-1&&(a=new Date(a.getTime()-a.getTimezoneOffset()*60*1e3)),a}function Tn(e,t){if(Ne&&Buffer.isBuffer(e)){if(t){if(e[0]==255&&e[1]==254)return gr(e.slice(2).toString(`utf16le`));if(e[1]==254&&e[2]==255)return gr(Ce(e.slice(2).toString(`binary`)))}return e.toString(`binary`)}if(typeof TextDecoder<`u`)try{if(t){if(e[0]==255&&e[1]==254)return gr(new TextDecoder(`utf-16le`).decode(e.slice(2)));if(e[0]==254&&e[1]==255)return gr(new TextDecoder(`utf-16be`).decode(e.slice(2)))}var n={"€":``,"‚":``,ƒ:``,"„":``,"…":``,"†":``,"‡":``,ˆ:``,"‰":``,Š:``,"‹":``,Œ:``,Ž:``,"‘":``,"’":``,"“":``,"”":``,"•":``,"–":``,"—":``,"˜":``,"™":``,š:``,"›":``,œ:``,ž:``,Ÿ:``};return Array.isArray(e)&&(e=new Uint8Array(e)),new TextDecoder(`latin1`).decode(e).replace(/[€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ]/g,function(e){return n[e]||e})}catch{}for(var r=[],i=0;i!=e.length;++i)r.push(String.fromCharCode(e[i]));return r.join(``)}function En(e){if(typeof JSON<`u`&&!Array.isArray(e))return JSON.parse(JSON.stringify(e));if(typeof e!=`object`||!e)return e;if(e instanceof Date)return new Date(e.getTime());var t={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=En(e[n]));return t}function Dn(e,t){for(var n=``;n.length<t;)n+=e;return n}function On(e){var t=Number(e);if(!isNaN(t))return isFinite(t)?t:NaN;if(!/\d/.test(e))return t;var n=1,r=e.replace(/([\d]),([\d])/g,`$1$2`).replace(/[$]/g,``).replace(/[%]/g,function(){return n*=100,``});return!isNaN(t=Number(r))||(r=r.replace(/[(](.*)[)]/,function(e,t){return n=-n,t}),!isNaN(t=Number(r)))?t/n:t}var kn=[`january`,`february`,`march`,`april`,`may`,`june`,`july`,`august`,`september`,`october`,`november`,`december`];function An(e){var t=new Date(e),n=new Date(NaN),r=t.getYear(),i=t.getMonth(),a=t.getDate();if(isNaN(a))return n;var o=e.toLowerCase();if(o.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)){if(o=o.replace(/[^a-z]/g,``).replace(/([^a-z]|^)[ap]m?([^a-z]|$)/,``),o.length>3&&kn.indexOf(o)==-1)return n}else if(o.match(/[a-z]/))return n;return r<0||r>8099?n:(i>0||a>1)&&r!=101?t:e.match(/[^-0-9:,\/\\]/)?n:t}var jn=(function(){var e=`abacaba`.split(/(:?b)/i).length==5;return function(t,n,r){if(e||typeof n==`string`)return t.split(n);for(var i=t.split(n),a=[i[0]],o=1;o<i.length;++o)a.push(r),a.push(i[o]);return a}})();function Mn(e){return e?e.content&&e.type?Tn(e.content,!0):e.data?we(e.data):e.asNodeBuffer&&Ne?we(e.asNodeBuffer().toString(`binary`)):e.asBinary?we(e.asBinary()):e._data&&e._data.getContent?we(Tn(Array.prototype.slice.call(e._data.getContent(),0))):null:null}function Nn(e){if(!e)return null;if(e.data)return xe(e.data);if(e.asNodeBuffer&&Ne)return e.asNodeBuffer();if(e._data&&e._data.getContent){var t=e._data.getContent();return typeof t==`string`?xe(t):Array.prototype.slice.call(t)}return e.content&&e.type?e.content:null}function Pn(e){return e&&e.name.slice(-4)===`.bin`?Nn(e):Mn(e)}function Fn(e,t){for(var n=e.FullPaths||ln(e.files),r=t.toLowerCase().replace(/[\/]/g,`\\`),i=r.replace(/\\/g,`/`),a=0;a<n.length;++a){var o=n[a].replace(/^Root Entry[\/]/,``).toLowerCase();if(r==o||i==o)return e.files?e.files[n[a]]:e.FileIndex[a]}return null}function In(e,t){var n=Fn(e,t);if(n==null)throw Error(`Cannot find file `+t+` in zip`);return n}function Ln(e,t,n){if(!n)return Pn(In(e,t));if(!t)return null;try{return Ln(e,t)}catch{return null}}function Rn(e,t,n){if(!n)return Mn(In(e,t));if(!t)return null;try{return Rn(e,t)}catch{return null}}function zn(e,t,n){if(!n)return Nn(In(e,t));if(!t)return null;try{return zn(e,t)}catch{return null}}function Bn(e){for(var t=e.FullPaths||ln(e.files),n=[],r=0;r<t.length;++r)t[r].slice(-1)!=`/`&&n.push(t[r].replace(/^Root Entry[\/]/,``));return n.sort()}function Vn(e,t,n){if(e.FullPaths){if(typeof n==`string`){var r=Ne?Pe(n):Ue(n);return U.utils.cfb_add(e,t,r)}U.utils.cfb_add(e,t,n)}else e.file(t,n)}function Hn(){return U.utils.cfb_new()}function Un(e,t){switch(t.type){case`base64`:return U.read(e,{type:`base64`});case`binary`:return U.read(e,{type:`binary`});case`buffer`:case`array`:return U.read(e,{type:`buffer`})}throw Error(`Unrecognized type `+t.type)}function Wn(e,t){if(e.charAt(0)==`/`)return e.slice(1);var n=t.split(`/`);t.slice(-1)!=`/`&&n.pop();for(var r=e.split(`/`);r.length!==0;){var i=r.shift();i===`..`?n.pop():i!==`.`&&n.push(i)}return n.join(`/`)}var Gn=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r
`,Kn=/([^"\s?>\/]+)\s*=\s*((?:")([^"]*)(?:")|(?:')([^']*)(?:')|([^'">\s]+))/g,qn=/<[\/\?]?[a-zA-Z0-9:_-]+(?:\s+[^"\s?>\/]+\s*=\s*(?:"[^"]*"|'[^']*'|[^'">\s=]+))*\s*[\/\?]?>/gm,Jn=Gn.match(qn)?qn:/<[^>]*>/g,Yn=/<\w*:/,Xn=/<(\/?)\w+:/;function W(e,t,n){for(var r={},i=0,a=0;i!==e.length&&!((a=e.charCodeAt(i))===32||a===10||a===13);++i);if(t||(r[0]=e.slice(0,i)),i===e.length)return r;var o=e.match(Kn),s=0,c=``,l=0,u=``,d=``,f=1;if(o)for(l=0;l!=o.length;++l){for(d=o[l],a=0;a!=d.length&&d.charCodeAt(a)!==61;++a);for(u=d.slice(0,a).trim();d.charCodeAt(a+1)==32;)++a;for(f=+((i=d.charCodeAt(a+1))==34||i==39),c=d.slice(a+1+f,d.length-f),s=0;s!=u.length&&u.charCodeAt(s)!==58;++s);if(s===u.length)u.indexOf(`_`)>0&&(u=u.slice(0,u.indexOf(`_`))),r[u]=c,n||(r[u.toLowerCase()]=c);else{var p=(s===5&&u.slice(0,5)===`xmlns`?`xmlns`:``)+u.slice(s+1);if(r[p]&&u.slice(s-3,s)==`ext`)continue;r[p]=c,n||(r[p.toLowerCase()]=c)}}return r}function Zn(e){return e.replace(Xn,`<$1`)}var Qn={"&quot;":`"`,"&apos;":`'`,"&gt;":`>`,"&lt;":`<`,"&amp;":`&`},$n=dn(Qn),er=(function(){var e=/&(?:quot|apos|gt|lt|amp|#x?([\da-fA-F]+));/gi,t=/_x([\da-fA-F]{4})_/gi;return function n(r){var i=r+``,a=i.indexOf(`<![CDATA[`);if(a==-1)return i.replace(e,function(e,t){return Qn[e]||String.fromCharCode(parseInt(t,e.indexOf(`x`)>-1?16:10))||e}).replace(t,function(e,t){return String.fromCharCode(parseInt(t,16))});var o=i.indexOf(`]]>`);return n(i.slice(0,a))+i.slice(a+9,o)+n(i.slice(o+3))}})(),tr=/[&<>'"]/g,nr=/[\u0000-\u0008\u000b-\u001f]/g;function rr(e){return(e+``).replace(tr,function(e){return $n[e]}).replace(nr,function(e){return`_x`+(`000`+e.charCodeAt(0).toString(16)).slice(-4)+`_`})}function ir(e){return rr(e).replace(/ /g,`_x0020_`)}var ar=/[\u0000-\u001f]/g;function or(e){return(e+``).replace(tr,function(e){return $n[e]}).replace(/\n/g,`<br/>`).replace(ar,function(e){return`&#x`+(`000`+e.charCodeAt(0).toString(16)).slice(-4)+`;`})}function sr(e){return(e+``).replace(tr,function(e){return $n[e]}).replace(ar,function(e){return`&#x`+e.charCodeAt(0).toString(16).toUpperCase()+`;`})}var cr=(function(){var e=/&#(\d+);/g;function t(e,t){return String.fromCharCode(parseInt(t,10))}return function(n){return n.replace(e,t)}})();function lr(e){return e.replace(/(\r\n|[\r\n])/g,`&#10;`)}function ur(e){switch(e){case 1:case!0:case`1`:case`true`:case`TRUE`:return!0;default:return!1}}function dr(e){for(var t=``,n=0,r=0,i=0,a=0,o=0,s=0;n<e.length;){if(r=e.charCodeAt(n++),r<128){t+=String.fromCharCode(r);continue}if(i=e.charCodeAt(n++),r>191&&r<224){o=(r&31)<<6,o|=i&63,t+=String.fromCharCode(o);continue}if(a=e.charCodeAt(n++),r<240){t+=String.fromCharCode((r&15)<<12|(i&63)<<6|a&63);continue}o=e.charCodeAt(n++),s=((r&7)<<18|(i&63)<<12|(a&63)<<6|o&63)-65536,t+=String.fromCharCode(55296+(s>>>10&1023)),t+=String.fromCharCode(56320+(s&1023))}return t}function fr(e){var t=Fe(2*e.length),n,r,i=1,a=0,o=0,s;for(r=0;r<e.length;r+=i)i=1,(s=e.charCodeAt(r))<128?n=s:s<224?(n=(s&31)*64+(e.charCodeAt(r+1)&63),i=2):s<240?(n=(s&15)*4096+(e.charCodeAt(r+1)&63)*64+(e.charCodeAt(r+2)&63),i=3):(i=4,n=(s&7)*262144+(e.charCodeAt(r+1)&63)*4096+(e.charCodeAt(r+2)&63)*64+(e.charCodeAt(r+3)&63),n-=65536,o=55296+(n>>>10&1023),n=56320+(n&1023)),o!==0&&(t[a++]=o&255,t[a++]=o>>>8,o=0),t[a++]=n%256,t[a++]=n>>>8;return t.slice(0,a).toString(`ucs2`)}function pr(e){return Pe(e,`binary`).toString(`utf8`)}var mr=`foo bar bazâð£`,hr=Ne&&(pr(mr)==dr(mr)&&pr||fr(mr)==dr(mr)&&fr)||dr,gr=Ne?function(e){return Pe(e,`utf8`).toString(`binary`)}:function(e){for(var t=[],n=0,r=0,i=0;n<e.length;)switch(r=e.charCodeAt(n++),!0){case r<128:t.push(String.fromCharCode(r));break;case r<2048:t.push(String.fromCharCode(192+(r>>6))),t.push(String.fromCharCode(128+(r&63)));break;case r>=55296&&r<57344:r-=55296,i=e.charCodeAt(n++)-56320+(r<<10),t.push(String.fromCharCode(240+(i>>18&7))),t.push(String.fromCharCode(144+(i>>12&63))),t.push(String.fromCharCode(128+(i>>6&63))),t.push(String.fromCharCode(128+(i&63)));break;default:t.push(String.fromCharCode(224+(r>>12))),t.push(String.fromCharCode(128+(r>>6&63))),t.push(String.fromCharCode(128+(r&63)))}return t.join(``)},_r=(function(){var e={};return function(t,n){var r=t+`|`+(n||``);return e[r]?e[r]:e[r]=RegExp(`<(?:\\w+:)?`+t+`(?: xml:space="preserve")?(?:[^>]*)>([\\s\\S]*?)</(?:\\w+:)?`+t+`>`,n||``)}})(),vr=(function(){var e=[[`nbsp`,` `],[`middot`,`·`],[`quot`,`"`],[`apos`,`'`],[`gt`,`>`],[`lt`,`<`],[`amp`,`&`]].map(function(e){return[RegExp(`&`+e[0]+`;`,`ig`),e[1]]});return function(t){for(var n=t.replace(/^[\t\n\r ]+/,``).replace(/[\t\n\r ]+$/,``).replace(/>\s+/g,`>`).replace(/\s+</g,`<`).replace(/[\t\n\r ]+/g,` `).replace(/<\s*[bB][rR]\s*\/?>/g,`
`).replace(/<[^>]*>/g,``),r=0;r<e.length;++r)n=n.replace(e[r][0],e[r][1]);return n}})(),yr=(function(){var e={};return function(t){return e[t]===void 0?e[t]=RegExp(`<(?:vt:)?`+t+`>([\\s\\S]*?)</(?:vt:)?`+t+`>`,`g`):e[t]}})(),br=/<\/?(?:vt:)?variant>/g,xr=/<(?:vt:)([^>]*)>([\s\S]*)</;function Sr(e,t){var n=W(e),r=e.match(yr(n.baseType))||[],i=[];if(r.length!=n.size){if(t.WTF)throw Error(`unexpected vector length `+r.length+` != `+n.size);return i}return r.forEach(function(e){var t=e.replace(br,``).match(xr);t&&i.push({v:hr(t[2]),t:t[1]})}),i}var Cr=/(^\s|\s$|\n)/;function wr(e,t){return`<`+e+(t.match(Cr)?` xml:space="preserve"`:``)+`>`+t+`</`+e+`>`}function Tr(e){return ln(e).map(function(t){return` `+t+`="`+e[t]+`"`}).join(``)}function G(e,t,n){return`<`+e+(n==null?``:Tr(n))+(t==null?`/`:(t.match(Cr)?` xml:space="preserve"`:``)+`>`+t+`</`+e)+`>`}function Er(e,t){try{return e.toISOString().replace(/\.\d*/,``)}catch(e){if(t)throw e}return``}function Dr(e,t){switch(typeof e){case`string`:var n=G(`vt:lpwstr`,rr(e));return t&&(n=n.replace(/&quot;/g,`_x0022_`)),n;case`number`:return G((e|0)==e?`vt:i4`:`vt:r8`,rr(String(e)));case`boolean`:return G(`vt:bool`,e?`true`:`false`)}if(e instanceof Date)return G(`vt:filetime`,Er(e));throw Error(`Unable to serialize `+e)}function Or(e){if(Ne&&Buffer.isBuffer(e))return e.toString(`utf8`);if(typeof e==`string`)return e;if(typeof Uint8Array<`u`&&e instanceof Uint8Array)return hr(ze(Ve(e)));throw Error(`Bad input format: expected Buffer or string`)}var kr=/<(\/?)([^\s?><!\/:]*:|)([^\s?<>:\/]+)(?:[\s?:\/][^>]*)?>/gm,Ar={CORE_PROPS:`http://schemas.openxmlformats.org/package/2006/metadata/core-properties`,CUST_PROPS:`http://schemas.openxmlformats.org/officeDocument/2006/custom-properties`,EXT_PROPS:`http://schemas.openxmlformats.org/officeDocument/2006/extended-properties`,CT:`http://schemas.openxmlformats.org/package/2006/content-types`,RELS:`http://schemas.openxmlformats.org/package/2006/relationships`,TCMNT:`http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments`,dc:`http://purl.org/dc/elements/1.1/`,dcterms:`http://purl.org/dc/terms/`,dcmitype:`http://purl.org/dc/dcmitype/`,mx:`http://schemas.microsoft.com/office/mac/excel/2008/main`,r:`http://schemas.openxmlformats.org/officeDocument/2006/relationships`,sjs:`http://schemas.openxmlformats.org/package/2006/sheetjs/core-properties`,vt:`http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes`,xsi:`http://www.w3.org/2001/XMLSchema-instance`,xsd:`http://www.w3.org/2001/XMLSchema`},jr=[`http://schemas.openxmlformats.org/spreadsheetml/2006/main`,`http://purl.oclc.org/ooxml/spreadsheetml/main`,`http://schemas.microsoft.com/office/excel/2006/main`,`http://schemas.microsoft.com/office/excel/2006/2`],Mr={o:`urn:schemas-microsoft-com:office:office`,x:`urn:schemas-microsoft-com:office:excel`,ss:`urn:schemas-microsoft-com:office:spreadsheet`,dt:`uuid:C2F41010-65B3-11d1-A29F-00AA00C14882`,mv:`http://macVmlSchemaUri`,v:`urn:schemas-microsoft-com:vml`,html:`http://www.w3.org/TR/REC-html40`};function Nr(e,t){for(var n=1-2*(e[t+7]>>>7),r=((e[t+7]&127)<<4)+(e[t+6]>>>4&15),i=e[t+6]&15,a=5;a>=0;--a)i=i*256+e[t+a];return r==2047?i==0?n*(1/0):NaN:(r==0?r=-1022:(r-=1023,i+=2**52),n*2**(r-52)*i)}function Pr(e,t,n){var r=(t<0||1/t==-1/0)<<7,i=0,a=0,o=r?-t:t;isFinite(o)?o==0?i=a=0:(i=Math.floor(Math.log(o)/Math.LN2),a=o*2**(52-i),i<=-1023&&(!isFinite(a)||a<2**52)?i=-1022:(a-=2**52,i+=1023)):(i=2047,a=isNaN(t)?26985:0);for(var s=0;s<=5;++s,a/=256)e[n+s]=a&255;e[n+6]=(i&15)<<4|a&15,e[n+7]=i>>4|r}var Fr=function(e){for(var t=[],n=10240,r=0;r<e[0].length;++r)if(e[0][r])for(var i=0,a=e[0][r].length;i<a;i+=n)t.push.apply(t,e[0][r].slice(i,i+n));return t},Ir=Ne?function(e){return e[0].length>0&&Buffer.isBuffer(e[0][0])?Buffer.concat(e[0].map(function(e){return Buffer.isBuffer(e)?e:Pe(e)})):Fr(e)}:Fr,Lr=function(e,t,n){for(var r=[],i=t;i<n;i+=2)r.push(String.fromCharCode(ii(e,i)));return r.join(``).replace(We,``)},Rr=Ne?function(e,t,n){return Buffer.isBuffer(e)?e.toString(`utf16le`,t,n).replace(We,``):Lr(e,t,n)}:Lr,zr=function(e,t,n){for(var r=[],i=t;i<t+n;++i)r.push((`0`+e[i].toString(16)).slice(-2));return r.join(``)},Br=Ne?function(e,t,n){return Buffer.isBuffer(e)?e.toString(`hex`,t,t+n):zr(e,t,n)}:zr,Vr=function(e,t,n){for(var r=[],i=t;i<n;i++)r.push(String.fromCharCode(ri(e,i)));return r.join(``)},Hr=Ne?function(e,t,n){return Buffer.isBuffer(e)?e.toString(`utf8`,t,n):Vr(e,t,n)}:Vr,Ur=function(e,t){var n=oi(e,t);return n>0?Hr(e,t+4,t+4+n-1):``},Wr=Ur,Gr=function(e,t){var n=oi(e,t);return n>0?Hr(e,t+4,t+4+n-1):``},Kr=Gr,qr=function(e,t){var n=2*oi(e,t);return n>0?Hr(e,t+4,t+4+n-1):``},Jr=qr,Yr=function(e,t){var n=oi(e,t);return n>0?Rr(e,t+4,t+4+n):``},Xr=Yr,Zr=function(e,t){var n=oi(e,t);return n>0?Hr(e,t+4,t+4+n):``},Qr=Zr,$r=function(e,t){return Nr(e,t)},ei=$r,ti=function(e){return Array.isArray(e)||typeof Uint8Array<`u`&&e instanceof Uint8Array};Ne&&(Wr=function(e,t){if(!Buffer.isBuffer(e))return Ur(e,t);var n=e.readUInt32LE(t);return n>0?e.toString(`utf8`,t+4,t+4+n-1):``},Kr=function(e,t){if(!Buffer.isBuffer(e))return Gr(e,t);var n=e.readUInt32LE(t);return n>0?e.toString(`utf8`,t+4,t+4+n-1):``},Jr=function(e,t){if(!Buffer.isBuffer(e))return qr(e,t);var n=2*e.readUInt32LE(t);return e.toString(`utf16le`,t+4,t+4+n-1)},Xr=function(e,t){if(!Buffer.isBuffer(e))return Yr(e,t);var n=e.readUInt32LE(t);return e.toString(`utf16le`,t+4,t+4+n)},Qr=function(e,t){if(!Buffer.isBuffer(e))return Zr(e,t);var n=e.readUInt32LE(t);return e.toString(`utf8`,t+4,t+4+n)},ei=function(e,t){return Buffer.isBuffer(e)?e.readDoubleLE(t):$r(e,t)},ti=function(e){return Buffer.isBuffer(e)||Array.isArray(e)||typeof Uint8Array<`u`&&e instanceof Uint8Array});function ni(){Rr=function(e,t,n){return De.utils.decode(1200,e.slice(t,n)).replace(We,``)},Hr=function(e,t,n){return De.utils.decode(65001,e.slice(t,n))},Wr=function(e,t){var n=oi(e,t);return n>0?De.utils.decode(me,e.slice(t+4,t+4+n-1)):``},Kr=function(e,t){var n=oi(e,t);return n>0?De.utils.decode(pe,e.slice(t+4,t+4+n-1)):``},Jr=function(e,t){var n=2*oi(e,t);return n>0?De.utils.decode(1200,e.slice(t+4,t+4+n-1)):``},Xr=function(e,t){var n=oi(e,t);return n>0?De.utils.decode(1200,e.slice(t+4,t+4+n)):``},Qr=function(e,t){var n=oi(e,t);return n>0?De.utils.decode(65001,e.slice(t+4,t+4+n)):``}}De!==void 0&&ni();var ri=function(e,t){return e[t]},ii=function(e,t){return e[t+1]*256+e[t]},ai=function(e,t){var n=e[t+1]*256+e[t];return n<32768?n:(65535-n+1)*-1},oi=function(e,t){return e[t+3]*(1<<24)+(e[t+2]<<16)+(e[t+1]<<8)+e[t]},si=function(e,t){return e[t+3]<<24|e[t+2]<<16|e[t+1]<<8|e[t]},ci=function(e,t){return e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3]};function li(e,t){var n=``,r,i,a=[],o,s,c,l;switch(t){case`dbcs`:if(l=this.l,Ne&&Buffer.isBuffer(this))n=this.slice(this.l,this.l+2*e).toString(`utf16le`);else for(c=0;c<e;++c)n+=String.fromCharCode(ii(this,l)),l+=2;e*=2;break;case`utf8`:n=Hr(this,this.l,this.l+e);break;case`utf16le`:e*=2,n=Rr(this,this.l,this.l+e);break;case`wstr`:if(De!==void 0)n=De.utils.decode(pe,this.slice(this.l,this.l+2*e));else return li.call(this,e,`dbcs`);e=2*e;break;case`lpstr-ansi`:n=Wr(this,this.l),e=4+oi(this,this.l);break;case`lpstr-cp`:n=Kr(this,this.l),e=4+oi(this,this.l);break;case`lpwstr`:n=Jr(this,this.l),e=4+2*oi(this,this.l);break;case`lpp4`:e=4+oi(this,this.l),n=Xr(this,this.l),e&2&&(e+=2);break;case`8lpp4`:e=4+oi(this,this.l),n=Qr(this,this.l),e&3&&(e+=4-(e&3));break;case`cstr`:for(e=0,n=``;(o=ri(this,this.l+ e++))!==0;)a.push(Te(o));n=a.join(``);break;case`_wstr`:for(e=0,n=``;(o=ii(this,this.l+e))!==0;)a.push(Te(o)),e+=2;e+=2,n=a.join(``);break;case`dbcs-cont`:for(n=``,l=this.l,c=0;c<e;++c){if(this.lens&&this.lens.indexOf(l)!==-1)return o=ri(this,l),this.l=l+1,s=li.call(this,e-c,o?`dbcs-cont`:`sbcs-cont`),a.join(``)+s;a.push(Te(ii(this,l))),l+=2}n=a.join(``),e*=2;break;case`cpstr`:if(De!==void 0){n=De.utils.decode(pe,this.slice(this.l,this.l+e));break}case`sbcs-cont`:for(n=``,l=this.l,c=0;c!=e;++c){if(this.lens&&this.lens.indexOf(l)!==-1)return o=ri(this,l),this.l=l+1,s=li.call(this,e-c,o?`dbcs-cont`:`sbcs-cont`),a.join(``)+s;a.push(Te(ri(this,l))),l+=1}n=a.join(``);break;default:switch(e){case 1:return r=ri(this,this.l),this.l++,r;case 2:return r=(t===`i`?ai:ii)(this,this.l),this.l+=2,r;case 4:case-4:return t===`i`||!(this[this.l+3]&128)?(r=(e>0?si:ci)(this,this.l),this.l+=4,r):(i=oi(this,this.l),this.l+=4,i);case 8:case-8:if(t===`f`)return i=e==8?ei(this,this.l):ei([this[this.l+7],this[this.l+6],this[this.l+5],this[this.l+4],this[this.l+3],this[this.l+2],this[this.l+1],this[this.l+0]],0),this.l+=8,i;e=8;case 16:n=Br(this,this.l,e);break}}return this.l+=e,n}var ui=function(e,t,n){e[n]=t&255,e[n+1]=t>>>8&255,e[n+2]=t>>>16&255,e[n+3]=t>>>24&255},di=function(e,t,n){e[n]=t&255,e[n+1]=t>>8&255,e[n+2]=t>>16&255,e[n+3]=t>>24&255},fi=function(e,t,n){e[n]=t&255,e[n+1]=t>>>8&255};function pi(e,t,n){var r=0,i=0;if(n===`dbcs`){for(i=0;i!=t.length;++i)fi(this,t.charCodeAt(i),this.l+2*i);r=2*t.length}else if(n===`sbcs`){if(De!==void 0&&me==874)for(i=0;i!=t.length;++i){var a=De.utils.encode(me,t.charAt(i));this[this.l+i]=a[0]}else for(t=t.replace(/[^\x00-\x7F]/g,`_`),i=0;i!=t.length;++i)this[this.l+i]=t.charCodeAt(i)&255;r=t.length}else if(n===`hex`){for(;i<e;++i)this[this.l++]=parseInt(t.slice(2*i,2*i+2),16)||0;return this}else if(n===`utf16le`){var o=Math.min(this.l+e,this.length);for(i=0;i<Math.min(t.length,e);++i){var s=t.charCodeAt(i);this[this.l++]=s&255,this[this.l++]=s>>8}for(;this.l<o;)this[this.l++]=0;return this}else switch(e){case 1:r=1,this[this.l]=t&255;break;case 2:r=2,this[this.l]=t&255,t>>>=8,this[this.l+1]=t&255;break;case 3:r=3,this[this.l]=t&255,t>>>=8,this[this.l+1]=t&255,t>>>=8,this[this.l+2]=t&255;break;case 4:r=4,ui(this,t,this.l);break;case 8:if(r=8,n===`f`){Pr(this,t,this.l);break}case 16:break;case-4:r=4,di(this,t,this.l);break}return this.l+=r,this}function mi(e,t){var n=Br(this,this.l,e.length>>1);if(n!==e)throw Error(t+`Expected `+e+` saw `+n);this.l+=e.length>>1}function hi(e,t){e.l=t,e.read_shift=li,e.chk=mi,e.write_shift=pi}function gi(e,t){e.l+=t}function K(e){var t=Fe(e);return hi(t,0),t}function _i(e,t,n){if(e){var r,i,a;hi(e,e.l||0);for(var o=e.length,s=0,c=0;e.l<o;){s=e.read_shift(1),s&128&&(s=(s&127)+((e.read_shift(1)&127)<<7));var l=sv[s]||sv[65535];for(r=e.read_shift(1),a=r&127,i=1;i<4&&r&128;++i)a+=((r=e.read_shift(1))&127)<<7*i;c=e.l+a;var u=l.f&&l.f(e,a,n);if(e.l=c,t(u,l,s))return}}}function vi(){var e=[],t=Ne?256:2048,n=function(e){var t=K(e);return hi(t,0),t},r=n(t),i=function(){r&&=(r.length>r.l&&(r=r.slice(0,r.l),r.l=r.length),r.length>0&&e.push(r),null)},a=function(e){return r&&e<r.length-r.l?r:(i(),r=n(Math.max(e+1,t)))};return{next:a,push:function(e){i(),r=e,r.l??=r.length,a(t)},end:function(){return i(),He(e)},_bufs:e}}function q(e,t,n,r){var i=+t,a;if(!isNaN(i)){r||=sv[i].p||(n||[]).length||0,a=1+ +(i>=128)+1,r>=128&&++a,r>=16384&&++a,r>=2097152&&++a;var o=e.next(a);i<=127?o.write_shift(1,i):(o.write_shift(1,(i&127)+128),o.write_shift(1,i>>7));for(var s=0;s!=4;++s)if(r>=128)o.write_shift(1,(r&127)+128),r>>=7;else{o.write_shift(1,r);break}r>0&&ti(n)&&e.push(n)}}function yi(e,t,n){var r=En(e);if(t.s?(r.cRel&&(r.c+=t.s.c),r.rRel&&(r.r+=t.s.r)):(r.cRel&&(r.c+=t.c),r.rRel&&(r.r+=t.r)),!n||n.biff<12){for(;r.c>=256;)r.c-=256;for(;r.r>=65536;)r.r-=65536}return r}function bi(e,t,n){var r=En(e);return r.s=yi(r.s,t.s,n),r.e=yi(r.e,t.s,n),r}function xi(e,t){if(e.cRel&&e.c<0)for(e=En(e);e.c<0;)e.c+=t>8?16384:256;if(e.rRel&&e.r<0)for(e=En(e);e.r<0;)e.r+=t>8?1048576:t>5?65536:16384;var n=J(e);return!e.cRel&&e.cRel!=null&&(n=ki(n)),!e.rRel&&e.rRel!=null&&(n=Ti(n)),n}function Si(e,t){return e.s.r==0&&!e.s.rRel&&e.e.r==(t.biff>=12?1048575:t.biff>=8?65536:16384)&&!e.e.rRel?(e.s.cRel?``:`$`)+Oi(e.s.c)+`:`+(e.e.cRel?``:`$`)+Oi(e.e.c):e.s.c==0&&!e.s.cRel&&e.e.c==(t.biff>=12?16383:255)&&!e.e.cRel?(e.s.rRel?``:`$`)+wi(e.s.r)+`:`+(e.e.rRel?``:`$`)+wi(e.e.r):xi(e.s,t.biff)+`:`+xi(e.e,t.biff)}function Ci(e){return parseInt(Ei(e),10)-1}function wi(e){return``+(e+1)}function Ti(e){return e.replace(/([A-Z]|^)(\d+)$/,`$1$$$2`)}function Ei(e){return e.replace(/\$(\d+)$/,`$1`)}function Di(e){for(var t=Ai(e),n=0,r=0;r!==t.length;++r)n=26*n+t.charCodeAt(r)-64;return n-1}function Oi(e){if(e<0)throw Error(`invalid column `+e);var t=``;for(++e;e;e=Math.floor((e-1)/26))t=String.fromCharCode((e-1)%26+65)+t;return t}function ki(e){return e.replace(/^([A-Z])/,`$$$1`)}function Ai(e){return e.replace(/^\$([A-Z])/,`$1`)}function ji(e){return e.replace(/(\$?[A-Z]*)(\$?\d*)/,`$1,$2`).split(`,`)}function Mi(e){for(var t=0,n=0,r=0;r<e.length;++r){var i=e.charCodeAt(r);i>=48&&i<=57?t=10*t+(i-48):i>=65&&i<=90&&(n=26*n+(i-64))}return{c:n-1,r:t-1}}function J(e){for(var t=e.c+1,n=``;t;t=(t-1)/26|0)n=String.fromCharCode((t-1)%26+65)+n;return n+(e.r+1)}function Ni(e){var t=e.indexOf(`:`);return t==-1?{s:Mi(e),e:Mi(e)}:{s:Mi(e.slice(0,t)),e:Mi(e.slice(t+1))}}function Pi(e,t){return t===void 0||typeof t==`number`?Pi(e.s,e.e):(typeof e!=`string`&&(e=J(e)),typeof t!=`string`&&(t=J(t)),e==t?e:e+`:`+t)}function Fi(e){var t={s:{c:0,r:0},e:{c:0,r:0}},n=0,r=0,i=0,a=e.length;for(n=0;r<a&&!((i=e.charCodeAt(r)-64)<1||i>26);++r)n=26*n+i;for(t.s.c=--n,n=0;r<a&&!((i=e.charCodeAt(r)-48)<0||i>9);++r)n=10*n+i;if(t.s.r=--n,r===a||i!=10)return t.e.c=t.s.c,t.e.r=t.s.r,t;for(++r,n=0;r!=a&&!((i=e.charCodeAt(r)-64)<1||i>26);++r)n=26*n+i;for(t.e.c=--n,n=0;r!=a&&!((i=e.charCodeAt(r)-48)<0||i>9);++r)n=10*n+i;return t.e.r=--n,t}function Ii(e,t){var n=e.t==`d`&&t instanceof Date;if(e.z!=null)try{return e.w=Yt(e.z,n?hn(t):t)}catch{}try{return e.w=Yt((e.XF||{}).numFmtId||(n?14:0),n?hn(t):t)}catch{return``+t}}function Li(e,t,n){return e==null||e.t==null||e.t==`z`?``:e.w===void 0?(e.t==`d`&&!e.z&&n&&n.dateNF&&(e.z=n.dateNF),e.t==`e`?Ha[e.v]||e.v:t==null?Ii(e,e.v):Ii(e,t)):e.w}function Ri(e,t){var n=t&&t.sheet?t.sheet:`Sheet1`,r={};return r[n]=e,{SheetNames:[n],Sheets:r}}function zi(e,t,n){var r=n||{},i=e?Array.isArray(e):r.dense;Oe!=null&&i==null&&(i=Oe);var a=e||(i?[]:{}),o=0,s=0;if(a&&r.origin!=null){if(typeof r.origin==`number`)o=r.origin;else{var c=typeof r.origin==`string`?Mi(r.origin):r.origin;o=c.r,s=c.c}a[`!ref`]||=`A1:A1`}var l={s:{c:1e7,r:1e7},e:{c:0,r:0}};if(a[`!ref`]){var u=Fi(a[`!ref`]);l.s.c=u.s.c,l.s.r=u.s.r,l.e.c=Math.max(l.e.c,u.e.c),l.e.r=Math.max(l.e.r,u.e.r),o==-1&&(l.e.r=o=u.e.r+1)}for(var d=0;d!=t.length;++d)if(t[d]){if(!Array.isArray(t[d]))throw Error(`aoa_to_sheet expects an array of arrays`);for(var f=0;f!=t[d].length;++f)if(t[d][f]!==void 0){var p={v:t[d][f]},m=o+d,h=s+f;if(l.s.r>m&&(l.s.r=m),l.s.c>h&&(l.s.c=h),l.e.r<m&&(l.e.r=m),l.e.c<h&&(l.e.c=h),t[d][f]&&typeof t[d][f]==`object`&&!Array.isArray(t[d][f])&&!(t[d][f]instanceof Date))p=t[d][f];else if(Array.isArray(p.v)&&(p.f=t[d][f][1],p.v=p.v[0]),p.v===null)if(p.f)p.t=`n`;else if(r.nullError)p.t=`e`,p.v=0;else if(r.sheetStubs)p.t=`z`;else continue;else typeof p.v==`number`?p.t=`n`:typeof p.v==`boolean`?p.t=`b`:p.v instanceof Date?(p.z=r.dateNF||H[14],r.cellDates?(p.t=`d`,p.w=Yt(p.z,hn(p.v))):(p.t=`n`,p.v=hn(p.v),p.w=Yt(p.z,p.v))):p.t=`s`;if(i)a[m]||(a[m]=[]),a[m][h]&&a[m][h].z&&(p.z=a[m][h].z),a[m][h]=p;else{var g=J({c:h,r:m});a[g]&&a[g].z&&(p.z=a[g].z),a[g]=p}}}return l.s.c<1e7&&(a[`!ref`]=Pi(l)),a}function Bi(e,t){return zi(null,e,t)}function Vi(e){return e.read_shift(4,`i`)}function Hi(e,t){return t||=K(4),t.write_shift(4,e),t}function Ui(e){var t=e.read_shift(4);return t===0?``:e.read_shift(t,`dbcs`)}function Wi(e,t){var n=!1;return t??=(n=!0,K(4+2*e.length)),t.write_shift(4,e.length),e.length>0&&t.write_shift(0,e,`dbcs`),n?t.slice(0,t.l):t}function Gi(e){return{ich:e.read_shift(2),ifnt:e.read_shift(2)}}function Ki(e,t){return t||=K(4),t.write_shift(2,e.ich||0),t.write_shift(2,e.ifnt||0),t}function qi(e,t){var n=e.l,r=e.read_shift(1),i=Ui(e),a=[],o={t:i,h:i};if(r&1){for(var s=e.read_shift(4),c=0;c!=s;++c)a.push(Gi(e));o.r=a}else o.r=[{ich:0,ifnt:0}];return e.l=n+t,o}function Ji(e,t){var n=!1;return t??=(n=!0,K(15+4*e.t.length)),t.write_shift(1,0),Wi(e.t,t),n?t.slice(0,t.l):t}var Yi=qi;function Xi(e,t){var n=!1;return t??=(n=!0,K(23+4*e.t.length)),t.write_shift(1,1),Wi(e.t,t),t.write_shift(4,1),Ki({ich:0,ifnt:0},t),n?t.slice(0,t.l):t}function Zi(e){var t=e.read_shift(4),n=e.read_shift(2);return n+=e.read_shift(1)<<16,e.l++,{c:t,iStyleRef:n}}function Qi(e,t){return t??=K(8),t.write_shift(-4,e.c),t.write_shift(3,e.iStyleRef||e.s),t.write_shift(1,0),t}function $i(e){var t=e.read_shift(2);return t+=e.read_shift(1)<<16,e.l++,{c:-1,iStyleRef:t}}function ea(e,t){return t??=K(4),t.write_shift(3,e.iStyleRef||e.s),t.write_shift(1,0),t}var ta=Ui,na=Wi;function ra(e){var t=e.read_shift(4);return t===0||t===4294967295?``:e.read_shift(t,`dbcs`)}function ia(e,t){var n=!1;return t??=(n=!0,K(127)),t.write_shift(4,e.length>0?e.length:4294967295),e.length>0&&t.write_shift(0,e,`dbcs`),n?t.slice(0,t.l):t}var aa=Ui,oa=ra,sa=ia;function ca(e){var t=e.slice(e.l,e.l+4),n=t[0]&1,r=t[0]&2;e.l+=4;var i=r===0?ei([0,0,0,0,t[0]&252,t[1],t[2],t[3]],0):si(t,0)>>2;return n?i/100:i}function la(e,t){t??=K(4);var n=0,r=0,i=e*100;if(e==(e|0)&&e>=-536870912&&e<1<<29?r=1:i==(i|0)&&i>=-536870912&&i<1<<29&&(r=1,n=1),r)t.write_shift(-4,((n?i:e)<<2)+(n+2));else throw Error(`unsupported RkNumber `+e)}function ua(e){var t={s:{},e:{}};return t.s.r=e.read_shift(4),t.e.r=e.read_shift(4),t.s.c=e.read_shift(4),t.e.c=e.read_shift(4),t}function da(e,t){return t||=K(16),t.write_shift(4,e.s.r),t.write_shift(4,e.e.r),t.write_shift(4,e.s.c),t.write_shift(4,e.e.c),t}var fa=ua,pa=da;function ma(e){if(e.length-e.l<8)throw`XLS Xnum Buffer underflow`;return e.read_shift(8,`f`)}function ha(e,t){return(t||K(8)).write_shift(8,e,`f`)}function ga(e){var t={},n=e.read_shift(1)>>>1,r=e.read_shift(1),i=e.read_shift(2,`i`),a=e.read_shift(1),o=e.read_shift(1),s=e.read_shift(1);switch(e.l++,n){case 0:t.auto=1;break;case 1:t.index=r;var c=Va[r];c&&(t.rgb=hu(c));break;case 2:t.rgb=hu([a,o,s]);break;case 3:t.theme=r;break}return i!=0&&(t.tint=i>0?i/32767:i/32768),t}function _a(e,t){if(t||=K(8),!e||e.auto)return t.write_shift(4,0),t.write_shift(4,0),t;e.index==null?e.theme==null?(t.write_shift(1,5),t.write_shift(1,0)):(t.write_shift(1,6),t.write_shift(1,e.theme)):(t.write_shift(1,2),t.write_shift(1,e.index));var n=e.tint||0;if(n>0?n*=32767:n<0&&(n*=32768),t.write_shift(2,n),!e.rgb||e.theme!=null)t.write_shift(2,0),t.write_shift(1,0),t.write_shift(1,0);else{var r=e.rgb||`FFFFFF`;typeof r==`number`&&(r=(`000000`+r.toString(16)).slice(-6)),t.write_shift(1,parseInt(r.slice(0,2),16)),t.write_shift(1,parseInt(r.slice(2,4),16)),t.write_shift(1,parseInt(r.slice(4,6),16)),t.write_shift(1,255)}return t}function va(e){var t=e.read_shift(1);return e.l++,{fBold:t&1,fItalic:t&2,fUnderline:t&4,fStrikeout:t&8,fOutline:t&16,fShadow:t&32,fCondense:t&64,fExtend:t&128}}function ya(e,t){t||=K(2);var n=(e.italic?2:0)|(e.strike?8:0)|(e.outline?16:0)|(e.shadow?32:0)|(e.condense?64:0)|(e.extend?128:0);return t.write_shift(1,n),t.write_shift(1,0),t}function ba(e,t){var n={2:`BITMAP`,3:`METAFILEPICT`,8:`DIB`,14:`ENHMETAFILE`},r=e.read_shift(4);switch(r){case 0:return``;case 4294967295:case 4294967294:return n[e.read_shift(4)]||``}if(r>400)throw Error(`Unsupported Clipboard: `+r.toString(16));return e.l-=4,e.read_shift(0,t==1?`lpstr`:`lpwstr`)}function xa(e){return ba(e,1)}function Sa(e){return ba(e,2)}var Ca=2,wa=3,Ta=11,Ea=12,Da=19,Oa=64,ka=65,Aa=71,ja=4108,Ma=4126,Na=80,Pa=81,Fa=[Na,Pa],Ia={1:{n:`CodePage`,t:Ca},2:{n:`Category`,t:Na},3:{n:`PresentationFormat`,t:Na},4:{n:`ByteCount`,t:wa},5:{n:`LineCount`,t:wa},6:{n:`ParagraphCount`,t:wa},7:{n:`SlideCount`,t:wa},8:{n:`NoteCount`,t:wa},9:{n:`HiddenCount`,t:wa},10:{n:`MultimediaClipCount`,t:wa},11:{n:`ScaleCrop`,t:Ta},12:{n:`HeadingPairs`,t:ja},13:{n:`TitlesOfParts`,t:Ma},14:{n:`Manager`,t:Na},15:{n:`Company`,t:Na},16:{n:`LinksUpToDate`,t:Ta},17:{n:`CharacterCount`,t:wa},19:{n:`SharedDoc`,t:Ta},22:{n:`HyperlinksChanged`,t:Ta},23:{n:`AppVersion`,t:wa,p:`version`},24:{n:`DigSig`,t:ka},26:{n:`ContentType`,t:Na},27:{n:`ContentStatus`,t:Na},28:{n:`Language`,t:Na},29:{n:`Version`,t:Na},255:{},2147483648:{n:`Locale`,t:Da},2147483651:{n:`Behavior`,t:Da},1919054434:{}},La={1:{n:`CodePage`,t:Ca},2:{n:`Title`,t:Na},3:{n:`Subject`,t:Na},4:{n:`Author`,t:Na},5:{n:`Keywords`,t:Na},6:{n:`Comments`,t:Na},7:{n:`Template`,t:Na},8:{n:`LastAuthor`,t:Na},9:{n:`RevNumber`,t:Na},10:{n:`EditTime`,t:Oa},11:{n:`LastPrinted`,t:Oa},12:{n:`CreatedDate`,t:Oa},13:{n:`ModifiedDate`,t:Oa},14:{n:`PageCount`,t:wa},15:{n:`WordCount`,t:wa},16:{n:`CharCount`,t:wa},17:{n:`Thumbnail`,t:Aa},18:{n:`Application`,t:Na},19:{n:`DocSecurity`,t:wa},255:{},2147483648:{n:`Locale`,t:Da},2147483651:{n:`Behavior`,t:Da},1919054434:{}},Ra={1:`US`,2:`CA`,3:``,7:`RU`,20:`EG`,30:`GR`,31:`NL`,32:`BE`,33:`FR`,34:`ES`,36:`HU`,39:`IT`,41:`CH`,43:`AT`,44:`GB`,45:`DK`,46:`SE`,47:`NO`,48:`PL`,49:`DE`,52:`MX`,55:`BR`,61:`AU`,64:`NZ`,66:`TH`,81:`JP`,82:`KR`,84:`VN`,86:`CN`,90:`TR`,105:`JS`,213:`DZ`,216:`MA`,218:`LY`,351:`PT`,354:`IS`,358:`FI`,420:`CZ`,886:`TW`,961:`LB`,962:`JO`,963:`SY`,964:`IQ`,965:`KW`,966:`SA`,971:`AE`,972:`IL`,974:`QA`,981:`IR`,65535:`US`},za=[null,`solid`,`mediumGray`,`darkGray`,`lightGray`,`darkHorizontal`,`darkVertical`,`darkDown`,`darkUp`,`darkGrid`,`darkTrellis`,`lightHorizontal`,`lightVertical`,`lightDown`,`lightUp`,`lightGrid`,`lightTrellis`,`gray125`,`gray0625`];function Ba(e){return e.map(function(e){return[e>>16&255,e>>8&255,e&255]})}var Va=En(Ba([0,16777215,16711680,65280,255,16776960,16711935,65535,0,16777215,16711680,65280,255,16776960,16711935,65535,8388608,32768,128,8421376,8388736,32896,12632256,8421504,10066431,10040166,16777164,13434879,6684774,16744576,26316,13421823,128,16711935,16776960,65535,8388736,8388608,32896,255,52479,13434879,13434828,16777113,10079487,16751052,13408767,16764057,3368703,3394764,10079232,16763904,16750848,16737792,6710937,9868950,13158,3381606,13056,3355392,10040064,10040166,3355545,3355443,16777215,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])),Ha={0:`#NULL!`,7:`#DIV/0!`,15:`#VALUE!`,23:`#REF!`,29:`#NAME?`,36:`#NUM!`,42:`#N/A`,43:`#GETTING_DATA`,255:`#WTF?`},Ua={"#NULL!":0,"#DIV/0!":7,"#VALUE!":15,"#REF!":23,"#NAME?":29,"#NUM!":36,"#N/A":42,"#GETTING_DATA":43,"#WTF?":255},Wa={"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml":`workbooks`,"application/vnd.ms-excel.sheet.macroEnabled.main+xml":`workbooks`,"application/vnd.ms-excel.sheet.binary.macroEnabled.main":`workbooks`,"application/vnd.ms-excel.addin.macroEnabled.main+xml":`workbooks`,"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml":`workbooks`,"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml":`sheets`,"application/vnd.ms-excel.worksheet":`sheets`,"application/vnd.ms-excel.binIndexWs":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml":`charts`,"application/vnd.ms-excel.chartsheet":`charts`,"application/vnd.ms-excel.macrosheet+xml":`macros`,"application/vnd.ms-excel.macrosheet":`macros`,"application/vnd.ms-excel.intlmacrosheet":`TODO`,"application/vnd.ms-excel.binIndexMs":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml":`dialogs`,"application/vnd.ms-excel.dialogsheet":`dialogs`,"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml":`strs`,"application/vnd.ms-excel.sharedStrings":`strs`,"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml":`styles`,"application/vnd.ms-excel.styles":`styles`,"application/vnd.openxmlformats-package.core-properties+xml":`coreprops`,"application/vnd.openxmlformats-officedocument.custom-properties+xml":`custprops`,"application/vnd.openxmlformats-officedocument.extended-properties+xml":`extprops`,"application/vnd.openxmlformats-officedocument.customXmlProperties+xml":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.customProperty":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml":`comments`,"application/vnd.ms-excel.comments":`comments`,"application/vnd.ms-excel.threadedcomments+xml":`threadedcomments`,"application/vnd.ms-excel.person+xml":`people`,"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml":`metadata`,"application/vnd.ms-excel.sheetMetadata":`metadata`,"application/vnd.ms-excel.pivotTable":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml":`TODO`,"application/vnd.openxmlformats-officedocument.drawingml.chart+xml":`TODO`,"application/vnd.ms-office.chartcolorstyle+xml":`TODO`,"application/vnd.ms-office.chartstyle+xml":`TODO`,"application/vnd.ms-office.chartex+xml":`TODO`,"application/vnd.ms-excel.calcChain":`calcchains`,"application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml":`calcchains`,"application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings":`TODO`,"application/vnd.ms-office.activeX":`TODO`,"application/vnd.ms-office.activeX+xml":`TODO`,"application/vnd.ms-excel.attachedToolbars":`TODO`,"application/vnd.ms-excel.connections":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml":`TODO`,"application/vnd.ms-excel.externalLink":`links`,"application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml":`links`,"application/vnd.ms-excel.pivotCacheDefinition":`TODO`,"application/vnd.ms-excel.pivotCacheRecords":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml":`TODO`,"application/vnd.ms-excel.queryTable":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml":`TODO`,"application/vnd.ms-excel.userNames":`TODO`,"application/vnd.ms-excel.revisionHeaders":`TODO`,"application/vnd.ms-excel.revisionLog":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml":`TODO`,"application/vnd.ms-excel.tableSingleCells":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml":`TODO`,"application/vnd.ms-excel.slicer":`TODO`,"application/vnd.ms-excel.slicerCache":`TODO`,"application/vnd.ms-excel.slicer+xml":`TODO`,"application/vnd.ms-excel.slicerCache+xml":`TODO`,"application/vnd.ms-excel.wsSortMap":`TODO`,"application/vnd.ms-excel.table":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml":`TODO`,"application/vnd.openxmlformats-officedocument.theme+xml":`themes`,"application/vnd.openxmlformats-officedocument.themeOverride+xml":`TODO`,"application/vnd.ms-excel.Timeline+xml":`TODO`,"application/vnd.ms-excel.TimelineCache+xml":`TODO`,"application/vnd.ms-office.vbaProject":`vba`,"application/vnd.ms-office.vbaProjectSignature":`TODO`,"application/vnd.ms-office.volatileDependencies":`TODO`,"application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml":`TODO`,"application/vnd.ms-excel.controlproperties+xml":`TODO`,"application/vnd.openxmlformats-officedocument.model+data":`TODO`,"application/vnd.ms-excel.Survey+xml":`TODO`,"application/vnd.openxmlformats-officedocument.drawing+xml":`drawings`,"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml":`TODO`,"application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml":`TODO`,"application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml":`TODO`,"application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml":`TODO`,"application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml":`TODO`,"application/vnd.openxmlformats-officedocument.vmlDrawing":`TODO`,"application/vnd.openxmlformats-package.relationships+xml":`rels`,"application/vnd.openxmlformats-officedocument.oleObject":`TODO`,"image/png":`TODO`,sheet:`js`},Ga={workbooks:{xlsx:`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml`,xlsm:`application/vnd.ms-excel.sheet.macroEnabled.main+xml`,xlsb:`application/vnd.ms-excel.sheet.binary.macroEnabled.main`,xlam:`application/vnd.ms-excel.addin.macroEnabled.main+xml`,xltx:`application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml`},strs:{xlsx:`application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml`,xlsb:`application/vnd.ms-excel.sharedStrings`},comments:{xlsx:`application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml`,xlsb:`application/vnd.ms-excel.comments`},sheets:{xlsx:`application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml`,xlsb:`application/vnd.ms-excel.worksheet`},charts:{xlsx:`application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml`,xlsb:`application/vnd.ms-excel.chartsheet`},dialogs:{xlsx:`application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml`,xlsb:`application/vnd.ms-excel.dialogsheet`},macros:{xlsx:`application/vnd.ms-excel.macrosheet+xml`,xlsb:`application/vnd.ms-excel.macrosheet`},metadata:{xlsx:`application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml`,xlsb:`application/vnd.ms-excel.sheetMetadata`},styles:{xlsx:`application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml`,xlsb:`application/vnd.ms-excel.styles`}};function Ka(){return{workbooks:[],sheets:[],charts:[],dialogs:[],macros:[],rels:[],strs:[],comments:[],threadedcomments:[],links:[],coreprops:[],extprops:[],custprops:[],themes:[],styles:[],calcchains:[],vba:[],drawings:[],metadata:[],people:[],TODO:[],xmlns:``}}function qa(e){var t=Ka();if(!e||!e.match)return t;var n={};if((e.match(Jn)||[]).forEach(function(e){var r=W(e);switch(r[0].replace(Yn,`<`)){case`<?xml`:break;case`<Types`:t.xmlns=r[`xmlns`+(r[0].match(/<(\w+):/)||[``,``])[1]];break;case`<Default`:n[r.Extension]=r.ContentType;break;case`<Override`:t[Wa[r.ContentType]]!==void 0&&t[Wa[r.ContentType]].push(r.PartName);break}}),t.xmlns!==Ar.CT)throw Error(`Unknown Namespace: `+t.xmlns);return t.calcchain=t.calcchains.length>0?t.calcchains[0]:``,t.sst=t.strs.length>0?t.strs[0]:``,t.style=t.styles.length>0?t.styles[0]:``,t.defaults=n,delete t.calcchains,t}function Ja(e,t){var n=pn(Wa),r=[],i;r[r.length]=Gn,r[r.length]=G(`Types`,null,{xmlns:Ar.CT,"xmlns:xsd":Ar.xsd,"xmlns:xsi":Ar.xsi}),r=r.concat([[`xml`,`application/xml`],[`bin`,`application/vnd.ms-excel.sheet.binary.macroEnabled.main`],[`vml`,`application/vnd.openxmlformats-officedocument.vmlDrawing`],[`data`,`application/vnd.openxmlformats-officedocument.model+data`],[`bmp`,`image/bmp`],[`png`,`image/png`],[`gif`,`image/gif`],[`emf`,`image/x-emf`],[`wmf`,`image/x-wmf`],[`jpg`,`image/jpeg`],[`jpeg`,`image/jpeg`],[`tif`,`image/tiff`],[`tiff`,`image/tiff`],[`pdf`,`application/pdf`],[`rels`,`application/vnd.openxmlformats-package.relationships+xml`]].map(function(e){return G(`Default`,null,{Extension:e[0],ContentType:e[1]})}));var a=function(n){e[n]&&e[n].length>0&&(i=e[n][0],r[r.length]=G(`Override`,null,{PartName:(i[0]==`/`?``:`/`)+i,ContentType:Ga[n][t.bookType]||Ga[n].xlsx}))},o=function(n){(e[n]||[]).forEach(function(e){r[r.length]=G(`Override`,null,{PartName:(e[0]==`/`?``:`/`)+e,ContentType:Ga[n][t.bookType]||Ga[n].xlsx})})},s=function(t){(e[t]||[]).forEach(function(e){r[r.length]=G(`Override`,null,{PartName:(e[0]==`/`?``:`/`)+e,ContentType:n[t][0]})})};return a(`workbooks`),o(`sheets`),o(`charts`),s(`themes`),[`strs`,`styles`].forEach(a),[`coreprops`,`extprops`,`custprops`].forEach(s),s(`vba`),s(`comments`),s(`threadedcomments`),s(`drawings`),o(`metadata`),s(`people`),r.length>2&&(r[r.length]=`</Types>`,r[1]=r[1].replace(`/>`,`>`)),r.join(``)}var Ya={WB:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument`,SHEET:`http://sheetjs.openxmlformats.org/officeDocument/2006/relationships/officeDocument`,HLINK:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink`,VML:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing`,XPATH:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLinkPath`,XMISS:`http://schemas.microsoft.com/office/2006/relationships/xlExternalLinkPath/xlPathMissing`,XLINK:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLink`,CXML:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXml`,CXMLP:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXmlProps`,CMNT:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments`,CORE_PROPS:`http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties`,EXT_PROPS:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties`,CUST_PROPS:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties`,SST:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings`,STY:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles`,THEME:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme`,CHART:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart`,CHARTEX:`http://schemas.microsoft.com/office/2014/relationships/chartEx`,CS:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/chartsheet`,WS:[`http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet`,`http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet`],DS:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/dialogsheet`,MS:`http://schemas.microsoft.com/office/2006/relationships/xlMacrosheet`,IMG:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/image`,DRAW:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing`,XLMETA:`http://schemas.openxmlformats.org/officeDocument/2006/relationships/sheetMetadata`,TCMNT:`http://schemas.microsoft.com/office/2017/10/relationships/threadedComment`,PEOPLE:`http://schemas.microsoft.com/office/2017/10/relationships/person`,VBA:`http://schemas.microsoft.com/office/2006/relationships/vbaProject`};function Xa(e){var t=e.lastIndexOf(`/`);return e.slice(0,t+1)+`_rels/`+e.slice(t+1)+`.rels`}function Za(e,t){var n={"!id":{}};if(!e)return n;t.charAt(0)!==`/`&&(t=`/`+t);var r={};return(e.match(Jn)||[]).forEach(function(e){var i=W(e);if(i[0]===`<Relationship`){var a={};a.Type=i.Type,a.Target=i.Target,a.Id=i.Id,i.TargetMode&&(a.TargetMode=i.TargetMode);var o=i.TargetMode===`External`?i.Target:Wn(i.Target,t);n[o]=a,r[i.Id]=a}}),n[`!id`]=r,n}function Qa(e){var t=[Gn,G(`Relationships`,null,{xmlns:Ar.RELS})];return ln(e[`!id`]).forEach(function(n){t[t.length]=G(`Relationship`,null,e[`!id`][n])}),t.length>2&&(t[t.length]=`</Relationships>`,t[1]=t[1].replace(`/>`,`>`)),t.join(``)}function $a(e,t,n,r,i,a){if(i||={},e[`!id`]||={},e[`!idx`]||=1,t<0)for(t=e[`!idx`];e[`!id`][`rId`+t];++t);if(e[`!idx`]=t+1,i.Id=`rId`+t,i.Type=r,i.Target=n,a?i.TargetMode=a:[Ya.HLINK,Ya.XPATH,Ya.XMISS].indexOf(i.Type)>-1&&(i.TargetMode=`External`),e[`!id`][i.Id])throw Error(`Cannot rewrite rId `+t);return e[`!id`][i.Id]=i,e[(`/`+i.Target).replace(`//`,`/`)]=i,t}var eo=`application/vnd.oasis.opendocument.spreadsheet`;function to(e,t){for(var n=Or(e),r,i;r=kr.exec(n);)switch(r[3]){case`manifest`:break;case`file-entry`:if(i=W(r[0],!1),i.path==`/`&&i.type!==eo)throw Error(`This OpenDocument is not a spreadsheet`);break;case`encryption-data`:case`algorithm`:case`start-key-generation`:case`key-derivation`:throw Error(`Unsupported ODS Encryption`);default:if(t&&t.WTF)throw r}}function no(e){var t=[Gn];t.push(`<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
`),t.push(`  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>
`);for(var n=0;n<e.length;++n)t.push(`  <manifest:file-entry manifest:full-path="`+e[n][0]+`" manifest:media-type="`+e[n][1]+`"/>
`);return t.push(`</manifest:manifest>`),t.join(``)}function ro(e,t,n){return[`  <rdf:Description rdf:about="`+e+`">
`,`    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/`+(n||`odf`)+`#`+t+`"/>
`,`  </rdf:Description>
`].join(``)}function io(e,t){return[`  <rdf:Description rdf:about="`+e+`">
`,`    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="`+t+`"/>
`,`  </rdf:Description>
`].join(``)}function ao(e){var t=[Gn];t.push(`<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
`);for(var n=0;n!=e.length;++n)t.push(ro(e[n][0],e[n][1])),t.push(io(``,e[n][0]));return t.push(ro(``,`Document`,`pkg`)),t.push(`</rdf:RDF>`),t.join(``)}function oo(){return`<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>SheetJS `+fe.version+`</meta:generator></office:meta></office:document-meta>`}var so=[[`cp:category`,`Category`],[`cp:contentStatus`,`ContentStatus`],[`cp:keywords`,`Keywords`],[`cp:lastModifiedBy`,`LastAuthor`],[`cp:lastPrinted`,`LastPrinted`],[`cp:revision`,`RevNumber`],[`cp:version`,`Version`],[`dc:creator`,`Author`],[`dc:description`,`Comments`],[`dc:identifier`,`Identifier`],[`dc:language`,`Language`],[`dc:subject`,`Subject`],[`dc:title`,`Title`],[`dcterms:created`,`CreatedDate`,`date`],[`dcterms:modified`,`ModifiedDate`,`date`]],co=(function(){for(var e=Array(so.length),t=0;t<so.length;++t){var n=so[t],r=`(?:`+n[0].slice(0,n[0].indexOf(`:`))+`:)`+n[0].slice(n[0].indexOf(`:`)+1);e[t]=RegExp(`<`+r+`[^>]*>([\\s\\S]*?)</`+r+`>`)}return e})();function lo(e){var t={};e=hr(e);for(var n=0;n<so.length;++n){var r=so[n],i=e.match(co[n]);i!=null&&i.length>0&&(t[r[1]]=er(i[1])),r[2]===`date`&&t[r[1]]&&(t[r[1]]=wn(t[r[1]]))}return t}function uo(e,t,n,r,i){i[e]!=null||t==null||t===``||(i[e]=t,t=rr(t),r[r.length]=n?G(e,t,n):wr(e,t))}function fo(e,t){var n=t||{},r=[Gn,G(`cp:coreProperties`,null,{"xmlns:cp":Ar.CORE_PROPS,"xmlns:dc":Ar.dc,"xmlns:dcterms":Ar.dcterms,"xmlns:dcmitype":Ar.dcmitype,"xmlns:xsi":Ar.xsi})],i={};if(!e&&!n.Props)return r.join(``);e&&(e.CreatedDate!=null&&uo(`dcterms:created`,typeof e.CreatedDate==`string`?e.CreatedDate:Er(e.CreatedDate,n.WTF),{"xsi:type":`dcterms:W3CDTF`},r,i),e.ModifiedDate!=null&&uo(`dcterms:modified`,typeof e.ModifiedDate==`string`?e.ModifiedDate:Er(e.ModifiedDate,n.WTF),{"xsi:type":`dcterms:W3CDTF`},r,i));for(var a=0;a!=so.length;++a){var o=so[a],s=n.Props&&n.Props[o[1]]!=null?n.Props[o[1]]:e?e[o[1]]:null;s===!0?s=`1`:s===!1?s=`0`:typeof s==`number`&&(s=String(s)),s!=null&&uo(o[0],s,null,r,i)}return r.length>2&&(r[r.length]=`</cp:coreProperties>`,r[1]=r[1].replace(`/>`,`>`)),r.join(``)}var po=[[`Application`,`Application`,`string`],[`AppVersion`,`AppVersion`,`string`],[`Company`,`Company`,`string`],[`DocSecurity`,`DocSecurity`,`string`],[`Manager`,`Manager`,`string`],[`HyperlinksChanged`,`HyperlinksChanged`,`bool`],[`SharedDoc`,`SharedDoc`,`bool`],[`LinksUpToDate`,`LinksUpToDate`,`bool`],[`ScaleCrop`,`ScaleCrop`,`bool`],[`HeadingPairs`,`HeadingPairs`,`raw`],[`TitlesOfParts`,`TitlesOfParts`,`raw`]],mo=[`Worksheets`,`SheetNames`,`NamedRanges`,`DefinedNames`,`Chartsheets`,`ChartNames`];function ho(e,t,n,r){var i=[];if(typeof e==`string`)i=Sr(e,r);else for(var a=0;a<e.length;++a)i=i.concat(e[a].map(function(e){return{v:e}}));var o=typeof t==`string`?Sr(t,r).map(function(e){return e.v}):t,s=0,c=0;if(o.length>0)for(var l=0;l!==i.length;l+=2){switch(c=+i[l+1].v,i[l].v){case`Worksheets`:case`工作表`:case`Листы`:case`أوراق العمل`:case`ワークシート`:case`גליונות עבודה`:case`Arbeitsblätter`:case`Çalışma Sayfaları`:case`Feuilles de calcul`:case`Fogli di lavoro`:case`Folhas de cálculo`:case`Planilhas`:case`Regneark`:case`Hojas de cálculo`:case`Werkbladen`:n.Worksheets=c,n.SheetNames=o.slice(s,s+c);break;case`Named Ranges`:case`Rangos con nombre`:case`名前付き一覧`:case`Benannte Bereiche`:case`Navngivne områder`:n.NamedRanges=c,n.DefinedNames=o.slice(s,s+c);break;case`Charts`:case`Diagramme`:n.Chartsheets=c,n.ChartNames=o.slice(s,s+c);break}s+=c}}function go(e,t,n){var r={};return t||={},e=hr(e),po.forEach(function(n){var i=(e.match(_r(n[0]))||[])[1];switch(n[2]){case`string`:i&&(t[n[1]]=er(i));break;case`bool`:t[n[1]]=i===`true`;break;case`raw`:var a=e.match(RegExp(`<`+n[0]+`[^>]*>([\\s\\S]*?)</`+n[0]+`>`));a&&a.length>0&&(r[n[1]]=a[1]);break}}),r.HeadingPairs&&r.TitlesOfParts&&ho(r.HeadingPairs,r.TitlesOfParts,t,n),t}function _o(e){var t=[],n=G;return e||={},e.Application=`SheetJS`,t[t.length]=Gn,t[t.length]=G(`Properties`,null,{xmlns:Ar.EXT_PROPS,"xmlns:vt":Ar.vt}),po.forEach(function(r){if(e[r[1]]!==void 0){var i;switch(r[2]){case`string`:i=rr(String(e[r[1]]));break;case`bool`:i=e[r[1]]?`true`:`false`;break}i!==void 0&&(t[t.length]=n(r[0],i))}}),t[t.length]=n(`HeadingPairs`,n(`vt:vector`,n(`vt:variant`,`<vt:lpstr>Worksheets</vt:lpstr>`)+n(`vt:variant`,n(`vt:i4`,String(e.Worksheets))),{size:2,baseType:`variant`})),t[t.length]=n(`TitlesOfParts`,n(`vt:vector`,e.SheetNames.map(function(e){return`<vt:lpstr>`+rr(e)+`</vt:lpstr>`}).join(``),{size:e.Worksheets,baseType:`lpstr`})),t.length>2&&(t[t.length]=`</Properties>`,t[1]=t[1].replace(`/>`,`>`)),t.join(``)}var vo=/<[^>]+>[^<]*/g;function yo(e,t){var n={},r=``,i=e.match(vo);if(i)for(var a=0;a!=i.length;++a){var o=i[a],s=W(o);switch(s[0]){case`<?xml`:break;case`<Properties`:break;case`<property`:r=er(s.name);break;case`</property>`:r=null;break;default:if(o.indexOf(`<vt:`)===0){var c=o.split(`>`),l=c[0].slice(4),u=c[1];switch(l){case`lpstr`:case`bstr`:case`lpwstr`:n[r]=er(u);break;case`bool`:n[r]=ur(u);break;case`i1`:case`i2`:case`i4`:case`i8`:case`int`:case`uint`:n[r]=parseInt(u,10);break;case`r4`:case`r8`:case`decimal`:n[r]=parseFloat(u);break;case`filetime`:case`date`:n[r]=wn(u);break;case`cy`:case`error`:n[r]=er(u);break;default:if(l.slice(-1)==`/`)break;t.WTF&&typeof console<`u`&&console.warn(`Unexpected`,o,l,c)}}else if(o.slice(0,2)!==`</`&&t.WTF)throw Error(o)}}return n}function bo(e){var t=[Gn,G(`Properties`,null,{xmlns:Ar.CUST_PROPS,"xmlns:vt":Ar.vt})];if(!e)return t.join(``);var n=1;return ln(e).forEach(function(r){++n,t[t.length]=G(`property`,Dr(e[r],!0),{fmtid:`{D5CDD505-2E9C-101B-9397-08002B2CF9AE}`,pid:n,name:rr(r)})}),t.length>2&&(t[t.length]=`</Properties>`,t[1]=t[1].replace(`/>`,`>`)),t.join(``)}var xo={Title:`Title`,Subject:`Subject`,Author:`Author`,Keywords:`Keywords`,Comments:`Description`,LastAuthor:`LastAuthor`,RevNumber:`Revision`,Application:`AppName`,LastPrinted:`LastPrinted`,CreatedDate:`Created`,ModifiedDate:`LastSaved`,Category:`Category`,Manager:`Manager`,Company:`Company`,AppVersion:`Version`,ContentStatus:`ContentStatus`,Identifier:`Identifier`,Language:`Language`},So;function Co(e,t,n){So||=dn(xo),t=So[t]||t,e[t]=n}function wo(e,t){var n=[];return ln(xo).map(function(e){for(var t=0;t<so.length;++t)if(so[t][1]==e)return so[t];for(t=0;t<po.length;++t)if(po[t][1]==e)return po[t];throw e}).forEach(function(r){if(e[r[1]]!=null){var i=t&&t.Props&&t.Props[r[1]]!=null?t.Props[r[1]]:e[r[1]];switch(r[2]){case`date`:i=new Date(i).toISOString().replace(/\.\d*Z/,`Z`);break}typeof i==`number`?i=String(i):i===!0||i===!1?i=i?`1`:`0`:i instanceof Date&&(i=new Date(i).toISOString().replace(/\.\d*Z/,``)),n.push(wr(xo[r[1]]||r[1],i))}}),G(`DocumentProperties`,n.join(``),{xmlns:Mr.o})}function To(e,t){var n=[`Worksheets`,`SheetNames`],r=`CustomDocumentProperties`,i=[];return e&&ln(e).forEach(function(t){if(Object.prototype.hasOwnProperty.call(e,t)){for(var r=0;r<so.length;++r)if(t==so[r][1])return;for(r=0;r<po.length;++r)if(t==po[r][1])return;for(r=0;r<n.length;++r)if(t==n[r])return;var a=e[t],o=`string`;typeof a==`number`?(o=`float`,a=String(a)):a===!0||a===!1?(o=`boolean`,a=a?`1`:`0`):a=String(a),i.push(G(ir(t),a,{"dt:dt":o}))}}),t&&ln(t).forEach(function(n){if(Object.prototype.hasOwnProperty.call(t,n)&&!(e&&Object.prototype.hasOwnProperty.call(e,n))){var r=t[n],a=`string`;typeof r==`number`?(a=`float`,r=String(r)):r===!0||r===!1?(a=`boolean`,r=r?`1`:`0`):r instanceof Date?(a=`dateTime.tz`,r=r.toISOString()):r=String(r),i.push(G(ir(n),r,{"dt:dt":a}))}}),`<`+r+` xmlns="`+Mr.o+`">`+i.join(``)+`</`+r+`>`}function Eo(e){var t=e.read_shift(4),n=e.read_shift(4);return new Date((n/1e7*2**32+t/1e7-11644473600)*1e3).toISOString().replace(/\.000/,``)}function Do(e){var t=(typeof e==`string`?new Date(Date.parse(e)):e).getTime()/1e3+11644473600,n=t%2**32,r=(t-n)/2**32;n*=1e7,r*=1e7;var i=n/2**32|0;i>0&&(n%=2**32,r+=i);var a=K(8);return a.write_shift(4,n),a.write_shift(4,r),a}function Oo(e,t,n){var r=e.l,i=e.read_shift(0,`lpstr-cp`);if(n)for(;e.l-r&3;)++e.l;return i}function ko(e,t,n){var r=e.read_shift(0,`lpwstr`);return n&&(e.l+=4-(r.length+1&3)&3),r}function Ao(e,t,n){return t===31?ko(e):Oo(e,t,n)}function jo(e,t,n){return Ao(e,t,n===!1?0:4)}function Mo(e,t){if(!t)throw Error(`VtUnalignedString must have positive length`);return Ao(e,t,0)}function No(e){for(var t=e.read_shift(4),n=[],r=0;r!=t;++r){var i=e.l;n[r]=e.read_shift(0,`lpwstr`).replace(We,``),e.l-i&2&&(e.l+=2)}return n}function Po(e){for(var t=e.read_shift(4),n=[],r=0;r!=t;++r)n[r]=e.read_shift(0,`lpstr-cp`).replace(We,``);return n}function Fo(e){var t=e.l,n=Bo(e,Pa);return e[e.l]==0&&e[e.l+1]==0&&e.l-t&2&&(e.l+=2),[n,Bo(e,wa)]}function Io(e){for(var t=e.read_shift(4),n=[],r=0;r<t/2;++r)n.push(Fo(e));return n}function Lo(e,t){for(var n=e.read_shift(4),r={},i=0;i!=n;++i){var a=e.read_shift(4),o=e.read_shift(4);r[a]=e.read_shift(o,t===1200?`utf16le`:`utf8`).replace(We,``).replace(Ge,`!`),t===1200&&o%2&&(e.l+=2)}return e.l&3&&(e.l=e.l>>3<<2),r}function Ro(e){var t=e.read_shift(4),n=e.slice(e.l,e.l+t);return e.l+=t,(t&3)>0&&(e.l+=4-(t&3)&3),n}function zo(e){var t={};return t.Size=e.read_shift(4),e.l+=t.Size+3-(t.Size-1)%4,t}function Bo(e,t,n){var r=e.read_shift(2),i,a=n||{};if(e.l+=2,t!==Ea&&r!==t&&Fa.indexOf(t)===-1&&!((t&65534)==4126&&(r&65534)==4126))throw Error(`Expected type `+t+` saw `+r);switch(t===Ea?r:t){case 2:return i=e.read_shift(2,`i`),a.raw||(e.l+=2),i;case 3:return i=e.read_shift(4,`i`),i;case 11:return e.read_shift(4)!==0;case 19:return i=e.read_shift(4),i;case 30:return Oo(e,r,4).replace(We,``);case 31:return ko(e);case 64:return Eo(e);case 65:return Ro(e);case 71:return zo(e);case 80:return jo(e,r,!a.raw).replace(We,``);case 81:return Mo(e,r).replace(We,``);case 4108:return Io(e);case 4126:case 4127:return r==4127?No(e):Po(e);default:throw Error(`TypedPropertyValue unrecognized type `+t+` `+r)}}function Vo(e,t){var n=K(4),r=K(4);switch(n.write_shift(4,e==80?31:e),e){case 3:r.write_shift(-4,t);break;case 5:r=K(8),r.write_shift(8,t,`f`);break;case 11:r.write_shift(4,+!!t);break;case 64:r=Do(t);break;case 31:case 80:for(r=K(4+2*(t.length+1)+(t.length%2?0:2)),r.write_shift(4,t.length+1),r.write_shift(0,t,`dbcs`);r.l!=r.length;)r.write_shift(1,0);break;default:throw Error(`TypedPropertyValue unrecognized type `+e+` `+t)}return He([n,r])}function Ho(e,t){var n=e.l,r=e.read_shift(4),i=e.read_shift(4),a=[],o=0,s=0,c=-1,l={};for(o=0;o!=i;++o)a[o]=[e.read_shift(4),e.read_shift(4)+n];a.sort(function(e,t){return e[1]-t[1]});var u={};for(o=0;o!=i;++o){if(e.l!==a[o][1]){var d=!0;if(o>0&&t)switch(t[a[o-1][0]].t){case 2:e.l+2===a[o][1]&&(e.l+=2,d=!1);break;case 80:e.l<=a[o][1]&&(e.l=a[o][1],d=!1);break;case 4108:e.l<=a[o][1]&&(e.l=a[o][1],d=!1);break}if((!t||o==0)&&e.l<=a[o][1]&&(d=!1,e.l=a[o][1]),d)throw Error(`Read Error: Expected address `+a[o][1]+` at `+e.l+` :`+o)}if(t){var f=t[a[o][0]];if(u[f.n]=Bo(e,f.t,{raw:!0}),f.p===`version`&&(u[f.n]=String(u[f.n]>>16)+`.`+(`0000`+String(u[f.n]&65535)).slice(-4)),f.n==`CodePage`)switch(u[f.n]){case 0:u[f.n]=1252;case 874:case 932:case 936:case 949:case 950:case 1250:case 1251:case 1253:case 1254:case 1255:case 1256:case 1257:case 1258:case 1e4:case 1200:case 1201:case 1252:case 65e3:case-536:case 65001:case-535:ye(s=u[f.n]>>>0&65535);break;default:throw Error(`Unsupported CodePage: `+u[f.n])}}else if(a[o][0]===1){if(s=u.CodePage=Bo(e,Ca),ye(s),c!==-1){var p=e.l;e.l=a[c][1],l=Lo(e,s),e.l=p}}else if(a[o][0]===0){if(s===0){c=o,e.l=a[o+1][1];continue}l=Lo(e,s)}else{var m=l[a[o][0]],h;switch(e[e.l]){case 65:e.l+=4,h=Ro(e);break;case 30:e.l+=4,h=jo(e,e[e.l-4]).replace(/\u0000+$/,``);break;case 31:e.l+=4,h=jo(e,e[e.l-4]).replace(/\u0000+$/,``);break;case 3:e.l+=4,h=e.read_shift(4,`i`);break;case 19:e.l+=4,h=e.read_shift(4);break;case 5:e.l+=4,h=e.read_shift(8,`f`);break;case 11:e.l+=4,h=Zo(e,4);break;case 64:e.l+=4,h=wn(Eo(e));break;default:throw Error(`unparsed value: `+e[e.l])}u[m]=h}}return e.l=n+r,u}var Uo=[`CodePage`,`Thumbnail`,`_PID_LINKBASE`,`_PID_HLINKS`,`SystemIdentifier`,`FMTID`];function Wo(e){switch(typeof e){case`boolean`:return 11;case`number`:return(e|0)==e?3:5;case`string`:return 31;case`object`:if(e instanceof Date)return 64;break}return-1}function Go(e,t,n){var r=K(8),i=[],a=[],o=8,s=0,c=K(8),l=K(8);if(c.write_shift(4,2),c.write_shift(4,1200),l.write_shift(4,1),a.push(c),i.push(l),o+=8+c.length,!t){l=K(8),l.write_shift(4,0),i.unshift(l);var u=[K(4)];for(u[0].write_shift(4,e.length),s=0;s<e.length;++s){var d=e[s][0];for(c=K(8+2*(d.length+1)+(d.length%2?0:2)),c.write_shift(4,s+2),c.write_shift(4,d.length+1),c.write_shift(0,d,`dbcs`);c.l!=c.length;)c.write_shift(1,0);u.push(c)}c=He(u),a.unshift(c),o+=8+c.length}for(s=0;s<e.length;++s)if(!(t&&!t[e[s][0]])&&!(Uo.indexOf(e[s][0])>-1||mo.indexOf(e[s][0])>-1)&&e[s][1]!=null){var f=e[s][1],p=0;if(t){p=+t[e[s][0]];var m=n[p];if(m.p==`version`&&typeof f==`string`){var h=f.split(`.`);f=(h[0]<<16)+(+h[1]||0)}c=Vo(m.t,f)}else{var g=Wo(f);g==-1&&(g=31,f=String(f)),c=Vo(g,f)}a.push(c),l=K(8),l.write_shift(4,t?p:2+s),i.push(l),o+=8+c.length}var _=8*(a.length+1);for(s=0;s<a.length;++s)i[s].write_shift(4,_),_+=a[s].length;return r.write_shift(4,o),r.write_shift(4,a.length),He([r].concat(i,a))}function Ko(e,t,n){var r=e.content;if(!r)return{};hi(r,0);var i,a,o,s,c=0;r.chk(`feff`,`Byte Order: `),r.read_shift(2);var l=r.read_shift(4),u=r.read_shift(16);if(u!==U.utils.consts.HEADER_CLSID&&u!==n)throw Error(`Bad PropertySet CLSID `+u);if(i=r.read_shift(4),i!==1&&i!==2)throw Error(`Unrecognized #Sets: `+i);if(a=r.read_shift(16),s=r.read_shift(4),i===1&&s!==r.l)throw Error(`Length mismatch: `+s+` !== `+r.l);i===2&&(o=r.read_shift(16),c=r.read_shift(4));var d=Ho(r,t),f={SystemIdentifier:l};for(var p in d)f[p]=d[p];if(f.FMTID=a,i===1)return f;if(c-r.l==2&&(r.l+=2),r.l!==c)throw Error(`Length mismatch 2: `+r.l+` !== `+c);var m;try{m=Ho(r,null)}catch{}for(p in m)f[p]=m[p];return f.FMTID=[a,o],f}function qo(e,t,n,r,i,a){var o=K(i?68:48),s=[o];o.write_shift(2,65534),o.write_shift(2,0),o.write_shift(4,842412599),o.write_shift(16,U.utils.consts.HEADER_CLSID,`hex`),o.write_shift(4,i?2:1),o.write_shift(16,t,`hex`),o.write_shift(4,i?68:48);var c=Go(e,n,r);if(s.push(c),i){var l=Go(i,null,null);o.write_shift(16,a,`hex`),o.write_shift(4,68+c.length),s.push(l)}return He(s)}function Jo(e,t){return e.read_shift(t),null}function Yo(e,t){t||=K(e);for(var n=0;n<e;++n)t.write_shift(1,0);return t}function Xo(e,t,n){for(var r=[],i=e.l+t;e.l<i;)r.push(n(e,i-e.l));if(i!==e.l)throw Error(`Slurp error`);return r}function Zo(e,t){return e.read_shift(t)===1}function Qo(e,t){return t||=K(2),t.write_shift(2,+!!e),t}function $o(e){return e.read_shift(2,`u`)}function es(e,t){return t||=K(2),t.write_shift(2,e),t}function ts(e,t){return Xo(e,t,$o)}function ns(e){var t=e.read_shift(1);return e.read_shift(1)===1?t:t===1}function rs(e,t,n){return n||=K(2),n.write_shift(1,t==`e`?+e:+!!e),n.write_shift(1,+(t==`e`)),n}function is(e,t,n){var r=e.read_shift(n&&n.biff>=12?2:1),i=`sbcs-cont`,a=pe;n&&n.biff>=8&&(pe=1200),!n||n.biff==8?e.read_shift(1)&&(i=`dbcs-cont`):n.biff==12&&(i=`wstr`),n.biff>=2&&n.biff<=5&&(i=`cpstr`);var o=r?e.read_shift(r,i):``;return pe=a,o}function as(e){var t=pe;pe=1200;var n=e.read_shift(2),r=e.read_shift(1),i=r&4,a=r&8,o=1+(r&1),s=0,c,l={};a&&(s=e.read_shift(2)),i&&(c=e.read_shift(4));var u=o==2?`dbcs-cont`:`sbcs-cont`,d=n===0?``:e.read_shift(n,u);return a&&(e.l+=4*s),i&&(e.l+=c),l.t=d,a||(l.raw=`<t>`+l.t+`</t>`,l.r=l.t),pe=t,l}function os(e){var t=e.t||``,n=1,r=K(3+(n>1?2:0));r.write_shift(2,t.length),r.write_shift(1,(n>1?8:0)|1),n>1&&r.write_shift(2,n);var i=K(2*t.length);return i.write_shift(2*t.length,t,`utf16le`),He([r,i])}function ss(e,t,n){var r;if(n){if(n.biff>=2&&n.biff<=5)return e.read_shift(t,`cpstr`);if(n.biff>=12)return e.read_shift(t,`dbcs-cont`)}return r=e.read_shift(1)===0?e.read_shift(t,`sbcs-cont`):e.read_shift(t,`dbcs-cont`),r}function cs(e,t,n){var r=e.read_shift(n&&n.biff==2?1:2);return r===0?(e.l++,``):ss(e,r,n)}function ls(e,t,n){if(n.biff>5)return cs(e,t,n);var r=e.read_shift(1);return r===0?(e.l++,``):e.read_shift(r,n.biff<=4||!e.lens?`cpstr`:`sbcs-cont`)}function us(e,t,n){return n||=K(3+2*e.length),n.write_shift(2,e.length),n.write_shift(1,1),n.write_shift(31,e,`utf16le`),n}function ds(e){var t=e.read_shift(1);e.l++;var n=e.read_shift(2);return e.l+=2,[t,n]}function fs(e){var t=e.read_shift(4),n=e.l,r=!1;t>24&&(e.l+=t-24,e.read_shift(16)===`795881f43b1d7f48af2c825dc4852763`&&(r=!0),e.l=n);var i=e.read_shift((r?t-24:t)>>1,`utf16le`).replace(We,``);return r&&(e.l+=24),i}function ps(e){for(var t=e.read_shift(2),n=``;t-- >0;)n+=`../`;var r=e.read_shift(0,`lpstr-ansi`);if(e.l+=2,e.read_shift(2)!=57005)throw Error(`Bad FileMoniker`);if(e.read_shift(4)===0)return n+r.replace(/\\/g,`/`);var i=e.read_shift(4);if(e.read_shift(2)!=3)throw Error(`Bad FileMoniker`);var a=e.read_shift(i>>1,`utf16le`).replace(We,``);return n+a}function ms(e,t){var n=e.read_shift(16);switch(t-=16,n){case`e0c9ea79f9bace118c8200aa004ba90b`:return fs(e,t);case`0303000000000000c000000000000046`:return ps(e,t);default:throw Error(`Unsupported Moniker `+n)}}function hs(e){var t=e.read_shift(4);return t>0?e.read_shift(t,`utf16le`).replace(We,``):``}function gs(e,t){t||=K(6+e.length*2),t.write_shift(4,1+e.length);for(var n=0;n<e.length;++n)t.write_shift(2,e.charCodeAt(n));return t.write_shift(2,0),t}function _s(e,t){var n=e.l+t,r=e.read_shift(4);if(r!==2)throw Error(`Unrecognized streamVersion: `+r);var i=e.read_shift(2);e.l+=2;var a,o,s,c,l=``,u,d;i&16&&(a=hs(e,n-e.l)),i&128&&(o=hs(e,n-e.l)),(i&257)==257&&(s=hs(e,n-e.l)),(i&257)==1&&(c=ms(e,n-e.l)),i&8&&(l=hs(e,n-e.l)),i&32&&(u=e.read_shift(16)),i&64&&(d=Eo(e)),e.l=n;var f=o||s||c||``;f&&l&&(f+=`#`+l),f||=`#`+l,i&2&&f.charAt(0)==`/`&&f.charAt(1)!=`/`&&(f=`file://`+f);var p={Target:f};return u&&(p.guid=u),d&&(p.time=d),a&&(p.Tooltip=a),p}function vs(e){var t=K(512),n=0,r=e.Target;r.slice(0,7)==`file://`&&(r=r.slice(7));var i=r.indexOf(`#`),a=i>-1?31:23;switch(r.charAt(0)){case`#`:a=28;break;case`.`:a&=-3;break}t.write_shift(4,2),t.write_shift(4,a);var o=[8,6815827,6619237,4849780,83];for(n=0;n<o.length;++n)t.write_shift(4,o[n]);if(a==28)r=r.slice(1),gs(r,t);else if(a&2){for(o=`e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b`.split(` `),n=0;n<o.length;++n)t.write_shift(1,parseInt(o[n],16));var s=i>-1?r.slice(0,i):r;for(t.write_shift(4,2*(s.length+1)),n=0;n<s.length;++n)t.write_shift(2,s.charCodeAt(n));t.write_shift(2,0),a&8&&gs(i>-1?r.slice(i+1):``,t)}else{for(o=`03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46`.split(` `),n=0;n<o.length;++n)t.write_shift(1,parseInt(o[n],16));for(var c=0;r.slice(c*3,c*3+3)==`../`||r.slice(c*3,c*3+3)==`..\\`;)++c;for(t.write_shift(2,c),t.write_shift(4,r.length-3*c+1),n=0;n<r.length-3*c;++n)t.write_shift(1,r.charCodeAt(n+3*c)&255);for(t.write_shift(1,0),t.write_shift(2,65535),t.write_shift(2,57005),n=0;n<6;++n)t.write_shift(4,0)}return t.slice(0,t.l)}function ys(e){return[e.read_shift(1),e.read_shift(1),e.read_shift(1),e.read_shift(1)]}function bs(e,t){var n=ys(e,t);return n[3]=0,n}function xs(e){return{r:e.read_shift(2),c:e.read_shift(2),ixfe:e.read_shift(2)}}function Ss(e,t,n,r){return r||=K(6),r.write_shift(2,e),r.write_shift(2,t),r.write_shift(2,n||0),r}function Cs(e){var t=e.read_shift(2),n=e.read_shift(2);return e.l+=8,{type:t,flags:n}}function ws(e,t,n){return t===0?``:ls(e,t,n)}function Ts(e,t,n){var r=n.biff>8?4:2;return[e.read_shift(r),e.read_shift(r,`i`),e.read_shift(r,`i`)]}function Es(e){return[e.read_shift(2),ca(e)]}function Ds(e,t,n){e.l+=4,t-=4;var r=e.l+t,i=is(e,t,n),a=e.read_shift(2);if(r-=e.l,a!==r)throw Error(`Malformed AddinUdf: padding = `+r+` != `+a);return e.l+=a,i}function Os(e){var t=e.read_shift(2),n=e.read_shift(2),r=e.read_shift(2),i=e.read_shift(2);return{s:{c:r,r:t},e:{c:i,r:n}}}function ks(e,t){return t||=K(8),t.write_shift(2,e.s.r),t.write_shift(2,e.e.r),t.write_shift(2,e.s.c),t.write_shift(2,e.e.c),t}function As(e){var t=e.read_shift(2),n=e.read_shift(2),r=e.read_shift(1),i=e.read_shift(1);return{s:{c:r,r:t},e:{c:i,r:n}}}var js=As;function Ms(e){e.l+=4;var t=e.read_shift(2),n=e.read_shift(2),r=e.read_shift(2);return e.l+=12,[n,t,r]}function Ns(e){var t={};return e.l+=4,e.l+=16,t.fSharedNote=e.read_shift(2),e.l+=4,t}function Ps(e){return e.l+=4,e.cf=e.read_shift(2),{}}function Fs(e){e.l+=2,e.l+=e.read_shift(2)}var Is={0:Fs,4:Fs,5:Fs,6:Fs,7:Ps,8:Fs,9:Fs,10:Fs,11:Fs,12:Fs,13:Ns,14:Fs,15:Fs,16:Fs,17:Fs,18:Fs,19:Fs,20:Fs,21:Ms};function Ls(e,t){for(var n=e.l+t,r=[];e.l<n;){var i=e.read_shift(2);e.l-=2;try{r.push(Is[i](e,n-e.l))}catch{return e.l=n,r}}return e.l!=n&&(e.l=n),r}function Rs(e,t){var n={BIFFVer:0,dt:0};switch(n.BIFFVer=e.read_shift(2),t-=2,t>=2&&(n.dt=e.read_shift(2),e.l-=2),n.BIFFVer){case 1536:case 1280:case 1024:case 768:case 512:case 2:case 7:break;default:if(t>6)throw Error(`Unexpected BIFF Ver `+n.BIFFVer)}return e.read_shift(t),n}function zs(e,t,n){var r=1536,i=16;switch(n.bookType){case`biff8`:break;case`biff5`:r=1280,i=8;break;case`biff4`:r=4,i=6;break;case`biff3`:r=3,i=6;break;case`biff2`:r=2,i=4;break;case`xla`:break;default:throw Error(`unsupported BIFF version`)}var a=K(i);return a.write_shift(2,r),a.write_shift(2,t),i>4&&a.write_shift(2,29282),i>6&&a.write_shift(2,1997),i>8&&(a.write_shift(2,49161),a.write_shift(2,1),a.write_shift(2,1798),a.write_shift(2,0)),a}function Bs(e,t){return t===0||e.read_shift(2),1200}function Vs(e,t,n){if(n.enc)return e.l+=t,``;var r=e.l,i=ls(e,0,n);return e.read_shift(t+r-e.l),i}function Hs(e,t){var n=!t||t.biff==8,r=K(n?112:54);for(r.write_shift(t.biff==8?2:1,7),n&&r.write_shift(1,0),r.write_shift(4,859007059),r.write_shift(4,5458548|(n?0:536870912));r.l<r.length;)r.write_shift(1,n?0:32);return r}function Us(e,t,n){var r=n&&n.biff==8||t==2?e.read_shift(2):(e.l+=t,0);return{fDialog:r&16,fBelow:r&64,fRight:r&128}}function Ws(e,t,n){var r=e.read_shift(4),i=e.read_shift(1)&3,a=e.read_shift(1);switch(a){case 0:a=`Worksheet`;break;case 1:a=`Macrosheet`;break;case 2:a=`Chartsheet`;break;case 6:a=`VBAModule`;break}var o=is(e,0,n);return o.length===0&&(o=`Sheet1`),{pos:r,hs:i,dt:a,name:o}}function Gs(e,t){var n=!t||t.biff>=8?2:1,r=K(8+n*e.name.length);r.write_shift(4,e.pos),r.write_shift(1,e.hs||0),r.write_shift(1,e.dt),r.write_shift(1,e.name.length),t.biff>=8&&r.write_shift(1,1),r.write_shift(n*e.name.length,e.name,t.biff<8?`sbcs`:`utf16le`);var i=r.slice(0,r.l);return i.l=r.l,i}function Ks(e,t){for(var n=e.l+t,r=e.read_shift(4),i=e.read_shift(4),a=[],o=0;o!=i&&e.l<n;++o)a.push(as(e));return a.Count=r,a.Unique=i,a}function qs(e,t){var n=K(8);n.write_shift(4,e.Count),n.write_shift(4,e.Unique);for(var r=[],i=0;i<e.length;++i)r[i]=os(e[i],t);var a=He([n].concat(r));return a.parts=[n.length].concat(r.map(function(e){return e.length})),a}function Js(e,t){var n={};return n.dsst=e.read_shift(2),e.l+=t-2,n}function Ys(e){var t={};t.r=e.read_shift(2),t.c=e.read_shift(2),t.cnt=e.read_shift(2)-t.c;var n=e.read_shift(2);e.l+=4;var r=e.read_shift(1);return e.l+=3,r&7&&(t.level=r&7),r&32&&(t.hidden=!0),r&64&&(t.hpt=n/20),t}function Xs(e){var t=Cs(e);if(t.type!=2211)throw Error(`Invalid Future Record `+t.type);return e.read_shift(4)!==0}function Zs(e){return e.read_shift(2),e.read_shift(4)}function Qs(e,t,n){var r=0;n&&n.biff==2||(r=e.read_shift(2));var i=e.read_shift(2);return n&&n.biff==2&&(r=1-(i>>15),i&=32767),[{Unsynced:r&1,DyZero:(r&2)>>1,ExAsc:(r&4)>>2,ExDsc:(r&8)>>3},i]}function $s(e){var t=e.read_shift(2),n=e.read_shift(2),r=e.read_shift(2),i=e.read_shift(2),a=e.read_shift(2),o=e.read_shift(2),s=e.read_shift(2),c=e.read_shift(2),l=e.read_shift(2);return{Pos:[t,n],Dim:[r,i],Flags:a,CurTab:o,FirstTab:s,Selected:c,TabRatio:l}}function ec(){var e=K(18);return e.write_shift(2,0),e.write_shift(2,0),e.write_shift(2,29280),e.write_shift(2,17600),e.write_shift(2,56),e.write_shift(2,0),e.write_shift(2,0),e.write_shift(2,1),e.write_shift(2,500),e}function tc(e,t,n){return n&&n.biff>=2&&n.biff<5?{}:{RTL:e.read_shift(2)&64}}function nc(e){var t=K(18),n=1718;return e&&e.RTL&&(n|=64),t.write_shift(2,n),t.write_shift(4,0),t.write_shift(4,64),t.write_shift(4,0),t.write_shift(4,0),t}function rc(){}function ic(e,t,n){var r={dyHeight:e.read_shift(2),fl:e.read_shift(2)};switch(n&&n.biff||8){case 2:break;case 3:case 4:e.l+=2;break;default:e.l+=10;break}return r.name=is(e,0,n),r}function ac(e,t){var n=e.name||`Arial`,r=t&&t.biff==5,i=K(r?15+n.length:16+2*n.length);return i.write_shift(2,(e.sz||12)*20),i.write_shift(4,0),i.write_shift(2,400),i.write_shift(4,0),i.write_shift(2,0),i.write_shift(1,n.length),r||i.write_shift(1,1),i.write_shift((r?1:2)*n.length,n,r?`sbcs`:`utf16le`),i}function oc(e){var t=xs(e);return t.isst=e.read_shift(4),t}function sc(e,t,n,r){var i=K(10);return Ss(e,t,r,i),i.write_shift(4,n),i}function cc(e,t,n){n.biffguess&&n.biff==2&&(n.biff=5);var r=e.l+t,i=xs(e,6);return n.biff==2&&e.l++,i.val=cs(e,r-e.l,n),i}function lc(e,t,n,r,i){var a=!i||i.biff==8,o=K(8+ +a+(1+a)*n.length);return Ss(e,t,r,o),o.write_shift(2,n.length),a&&o.write_shift(1,1),o.write_shift((1+a)*n.length,n,a?`utf16le`:`sbcs`),o}function uc(e,t,n){return[e.read_shift(2),ls(e,0,n)]}function dc(e,t,n,r){var i=n&&n.biff==5;r||=K(i?3+t.length:5+2*t.length),r.write_shift(2,e),r.write_shift(i?1:2,t.length),i||r.write_shift(1,1),r.write_shift((i?1:2)*t.length,t,i?`sbcs`:`utf16le`);var a=r.length>r.l?r.slice(0,r.l):r;return a.l??=a.length,a}var fc=ls;function pc(e,t,n){var r=e.l+t,i=n.biff==8||!n.biff?4:2,a=e.read_shift(i),o=e.read_shift(i),s=e.read_shift(2),c=e.read_shift(2);return e.l=r,{s:{r:a,c:s},e:{r:o,c}}}function mc(e,t){var n=t.biff==8||!t.biff?4:2,r=K(2*n+6);return r.write_shift(n,e.s.r),r.write_shift(n,e.e.r+1),r.write_shift(2,e.s.c),r.write_shift(2,e.e.c+1),r.write_shift(2,0),r}function hc(e){var t=e.read_shift(2),n=e.read_shift(2),r=Es(e);return{r:t,c:n,ixfe:r[0],rknum:r[1]}}function gc(e,t){for(var n=e.l+t-2,r=e.read_shift(2),i=e.read_shift(2),a=[];e.l<n;)a.push(Es(e));if(e.l!==n)throw Error(`MulRK read error`);var o=e.read_shift(2);if(a.length!=o-i+1)throw Error(`MulRK length mismatch`);return{r,c:i,C:o,rkrec:a}}function _c(e,t){for(var n=e.l+t-2,r=e.read_shift(2),i=e.read_shift(2),a=[];e.l<n;)a.push(e.read_shift(2));if(e.l!==n)throw Error(`MulBlank read error`);var o=e.read_shift(2);if(a.length!=o-i+1)throw Error(`MulBlank length mismatch`);return{r,c:i,C:o,ixfe:a}}function vc(e,t,n,r){var i={},a=e.read_shift(4),o=e.read_shift(4),s=e.read_shift(4),c=e.read_shift(2);return i.patternType=za[s>>26],r.cellStyles?(i.alc=a&7,i.fWrap=a>>3&1,i.alcV=a>>4&7,i.fJustLast=a>>7&1,i.trot=a>>8&255,i.cIndent=a>>16&15,i.fShrinkToFit=a>>20&1,i.iReadOrder=a>>22&2,i.fAtrNum=a>>26&1,i.fAtrFnt=a>>27&1,i.fAtrAlc=a>>28&1,i.fAtrBdr=a>>29&1,i.fAtrPat=a>>30&1,i.fAtrProt=a>>31&1,i.dgLeft=o&15,i.dgRight=o>>4&15,i.dgTop=o>>8&15,i.dgBottom=o>>12&15,i.icvLeft=o>>16&127,i.icvRight=o>>23&127,i.grbitDiag=o>>30&3,i.icvTop=s&127,i.icvBottom=s>>7&127,i.icvDiag=s>>14&127,i.dgDiag=s>>21&15,i.icvFore=c&127,i.icvBack=c>>7&127,i.fsxButton=c>>14&1,i):i}function yc(e,t,n){var r={};return r.ifnt=e.read_shift(2),r.numFmtId=e.read_shift(2),r.flags=e.read_shift(2),r.fStyle=r.flags>>2&1,t-=6,r.data=vc(e,t,r.fStyle,n),r}function bc(e,t,n,r){var i=n&&n.biff==5;r||=K(i?16:20),r.write_shift(2,0),e.style?(r.write_shift(2,e.numFmtId||0),r.write_shift(2,65524)):(r.write_shift(2,e.numFmtId||0),r.write_shift(2,t<<4));var a=0;return e.numFmtId>0&&i&&(a|=1024),r.write_shift(4,a),r.write_shift(4,0),i||r.write_shift(4,0),r.write_shift(2,0),r}function xc(e){e.l+=4;var t=[e.read_shift(2),e.read_shift(2)];if(t[0]!==0&&t[0]--,t[1]!==0&&t[1]--,t[0]>7||t[1]>7)throw Error(`Bad Gutters: `+t.join(`|`));return t}function Sc(e){var t=K(8);return t.write_shift(4,0),t.write_shift(2,e[0]?e[0]+1:0),t.write_shift(2,e[1]?e[1]+1:0),t}function Cc(e,t,n){var r=xs(e,6);(n.biff==2||t==9)&&++e.l;var i=ns(e,2);return r.val=i,r.t=i===!0||i===!1?`b`:`e`,r}function wc(e,t,n,r,i,a){var o=K(8);return Ss(e,t,r,o),rs(n,a,o),o}function Tc(e,t,n){n.biffguess&&n.biff==2&&(n.biff=5);var r=xs(e,6);return r.val=ma(e,8),r}function Ec(e,t,n,r){var i=K(14);return Ss(e,t,r,i),ha(n,i),i}var Dc=ws;function Oc(e,t,n){var r=e.l+t,i=e.read_shift(2),a=e.read_shift(2);if(n.sbcch=a,a==1025||a==14849)return[a,i];if(a<1||a>255)throw Error(`Unexpected SupBook type: `+a);for(var o=ss(e,a),s=[];r>e.l;)s.push(cs(e));return[a,i,o,s]}function kc(e,t,n){var r=e.read_shift(2),i,a={fBuiltIn:r&1,fWantAdvise:r>>>1&1,fWantPict:r>>>2&1,fOle:r>>>3&1,fOleLink:r>>>4&1,cf:r>>>5&1023,fIcon:r>>>15&1};return n.sbcch===14849&&(i=Ds(e,t-2,n)),a.body=i||e.read_shift(t-2),typeof i==`string`&&(a.Name=i),a}var Ac=[`_xlnm.Consolidate_Area`,`_xlnm.Auto_Open`,`_xlnm.Auto_Close`,`_xlnm.Extract`,`_xlnm.Database`,`_xlnm.Criteria`,`_xlnm.Print_Area`,`_xlnm.Print_Titles`,`_xlnm.Recorder`,`_xlnm.Data_Form`,`_xlnm.Auto_Activate`,`_xlnm.Auto_Deactivate`,`_xlnm.Sheet_Title`,`_xlnm._FilterDatabase`];function jc(e,t,n){var r=e.l+t,i=e.read_shift(2),a=e.read_shift(1),o=e.read_shift(1),s=e.read_shift(n&&n.biff==2?1:2),c=0;(!n||n.biff>=5)&&(n.biff!=5&&(e.l+=2),c=e.read_shift(2),n.biff==5&&(e.l+=2),e.l+=4);var l=ss(e,o,n);i&32&&(l=Ac[l.charCodeAt(0)]);var u=r-e.l;n&&n.biff==2&&--u;var d=r==e.l||s===0||!(u>0)?[]:am(e,u,n,s);return{chKey:a,Name:l,itab:c,rgce:d}}function Mc(e,t,n){if(n.biff<8)return Nc(e,t,n);for(var r=[],i=e.l+t,a=e.read_shift(n.biff>8?4:2);a--!==0;)r.push(Ts(e,n.biff>8?12:6,n));if(e.l!=i)throw Error(`Bad ExternSheet: `+e.l+` != `+i);return r}function Nc(e,t,n){e[e.l+1]==3&&e[e.l]++;var r=is(e,t,n);return r.charCodeAt(0)==3?r.slice(1):r}function Pc(e,t,n){if(n.biff<8){e.l+=t;return}var r=e.read_shift(2),i=e.read_shift(2);return[ss(e,r,n),ss(e,i,n)]}function Fc(e,t,n){var r=As(e,6);e.l++;var i=e.read_shift(1);return t-=8,[om(e,t,n),i,r]}function Ic(e,t,n){var r=js(e,6);switch(n.biff){case 2:e.l++,t-=7;break;case 3:case 4:e.l+=2,t-=8;break;default:e.l+=6,t-=12}return[r,rm(e,t,n,r)]}function Lc(e){return[e.read_shift(4)!==0,e.read_shift(4)!==0,e.read_shift(4)]}function Rc(e,t,n){if(!(n.biff<8)){var r=e.read_shift(2),i=e.read_shift(2),a=e.read_shift(2),o=e.read_shift(2),s=ls(e,0,n);return n.biff<8&&e.read_shift(1),[{r,c:i},s,o,a]}}function zc(e,t,n){return Rc(e,t,n)}function Bc(e,t){for(var n=[],r=e.read_shift(2);r--;)n.push(Os(e,t));return n}function Vc(e){var t=K(2+e.length*8);t.write_shift(2,e.length);for(var n=0;n<e.length;++n)ks(e[n],t);return t}function Hc(e,t,n){if(n&&n.biff<8)return Wc(e,t,n);var r=Ms(e,22);return{cmo:r,ft:Ls(e,t-22,r[1])}}var Uc={8:function(e,t){var n=e.l+t;e.l+=10;var r=e.read_shift(2);e.l+=4,e.l+=2,e.l+=2,e.l+=2,e.l+=4;var i=e.read_shift(1);return e.l+=i,e.l=n,{fmt:r}}};function Wc(e,t,n){e.l+=4;var r=e.read_shift(2),i=e.read_shift(2),a=e.read_shift(2);e.l+=2,e.l+=2,e.l+=2,e.l+=2,e.l+=2,e.l+=2,e.l+=2,e.l+=2,e.l+=2,e.l+=6,t-=36;var o=[];return o.push((Uc[r]||gi)(e,t,n)),{cmo:[i,r,a],ft:o}}function Gc(e,t,n){var r=e.l,i=``;try{e.l+=4;var a=(n.lastobj||{cmo:[0,0]}).cmo[1];[0,5,7,11,12,14].indexOf(a)==-1?e.l+=6:ds(e,6,n);var o=e.read_shift(2);e.read_shift(2),$o(e,2);var s=e.read_shift(2);e.l+=s;for(var c=1;c<e.lens.length-1;++c){if(e.l-r!=e.lens[c])throw Error(`TxO: bad continue record`);var l=e[e.l],u=ss(e,e.lens[c+1]-e.lens[c]-1);if(i+=u,i.length>=(l?o:2*o))break}if(i.length!==o&&i.length!==o*2)throw Error(`cchText: `+o+` != `+i.length);return e.l=r+t,{t:i}}catch{return e.l=r+t,{t:i}}}function Kc(e,t){var n=Os(e,8);return e.l+=16,[n,_s(e,t-24)]}function qc(e){var t=K(24),n=Mi(e[0]);t.write_shift(2,n.r),t.write_shift(2,n.r),t.write_shift(2,n.c),t.write_shift(2,n.c);for(var r=`d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b`.split(` `),i=0;i<16;++i)t.write_shift(1,parseInt(r[i],16));return He([t,vs(e[1])])}function Jc(e,t){e.read_shift(2);var n=Os(e,8),r=e.read_shift((t-10)/2,`dbcs-cont`);return r=r.replace(We,``),[n,r]}function Yc(e){var t=e[1].Tooltip,n=K(10+2*(t.length+1));n.write_shift(2,2048);var r=Mi(e[0]);n.write_shift(2,r.r),n.write_shift(2,r.r),n.write_shift(2,r.c),n.write_shift(2,r.c);for(var i=0;i<t.length;++i)n.write_shift(2,t.charCodeAt(i));return n.write_shift(2,0),n}function Xc(e){var t=[0,0],n=e.read_shift(2);return t[0]=Ra[n]||n,n=e.read_shift(2),t[1]=Ra[n]||n,t}function Zc(e){return e||=K(4),e.write_shift(2,1),e.write_shift(2,1),e}function Qc(e){for(var t=e.read_shift(2),n=[];t-- >0;)n.push(bs(e,8));return n}function $c(e){for(var t=e.read_shift(2),n=[];t-- >0;)n.push(bs(e,8));return n}function el(e){e.l+=2;var t={cxfs:0,crc:0};return t.cxfs=e.read_shift(2),t.crc=e.read_shift(4),t}function tl(e,t,n){if(!n.cellStyles)return gi(e,t);var r=n&&n.biff>=12?4:2,i=e.read_shift(r),a=e.read_shift(r),o=e.read_shift(r),s=e.read_shift(r),c=e.read_shift(2);r==2&&(e.l+=2);var l={s:i,e:a,w:o,ixfe:s,flags:c};return(n.biff>=5||!n.biff)&&(l.level=c>>8&7),l}function nl(e,t){var n=K(12);n.write_shift(2,t),n.write_shift(2,t),n.write_shift(2,e.width*256),n.write_shift(2,0);var r=0;return e.hidden&&(r|=1),n.write_shift(1,r),r=e.level||0,n.write_shift(1,r),n.write_shift(2,0),n}function rl(e,t){var n={};return t<32?n:(e.l+=16,n.header=ma(e,8),n.footer=ma(e,8),e.l+=2,n)}function il(e,t,n){var r={area:!1};if(n.biff!=5)return e.l+=t,r;var i=e.read_shift(1);return e.l+=3,i&16&&(r.area=!0),r}function al(e){for(var t=K(2*e),n=0;n<e;++n)t.write_shift(2,n+1);return t}var ol=xs,sl=ts,cl=cs;function ll(e){var t=e.read_shift(2),n=e.read_shift(2),r=e.read_shift(4),i={fmt:t,env:n,len:r,data:e.slice(e.l,e.l+r)};return e.l+=r,i}function ul(e,t,n){n.biffguess&&n.biff==5&&(n.biff=2);var r=xs(e,6);++e.l;var i=ls(e,t-7,n);return r.t=`str`,r.val=i,r}function dl(e){var t=xs(e,6);++e.l;var n=ma(e,8);return t.t=`n`,t.val=n,t}function fl(e,t,n){var r=K(15);return uv(r,e,t),r.write_shift(8,n,`f`),r}function pl(e){var t=xs(e,6);++e.l;var n=e.read_shift(2);return t.t=`n`,t.val=n,t}function ml(e,t,n){var r=K(9);return uv(r,e,t),r.write_shift(2,n),r}function hl(e){var t=e.read_shift(1);return t===0?(e.l++,``):e.read_shift(t,`sbcs-cont`)}function gl(e,t){e.l+=6,e.l+=2,e.l+=1,e.l+=3,e.l+=1,e.l+=t-13}function _l(e,t,n){var r=e.l+t,i=xs(e,6),a=ss(e,e.read_shift(2),n);return e.l=r,i.t=`str`,i.val=a,i}var vl=[2,3,48,49,131,139,140,245],yl=(function(){var e={1:437,2:850,3:1252,4:1e4,100:852,101:866,102:865,103:861,104:895,105:620,106:737,107:857,120:950,121:949,122:936,123:932,124:874,125:1255,126:1256,150:10007,151:10029,152:10006,200:1250,201:1251,202:1254,203:1253,0:20127,8:865,9:437,10:850,11:437,13:437,14:850,15:437,16:850,17:437,18:850,19:932,20:850,21:437,22:850,23:865,24:437,25:437,26:850,27:437,28:863,29:850,31:852,34:852,35:852,36:860,37:850,38:866,55:850,64:852,77:936,78:949,79:950,80:874,87:1252,88:1252,89:1252,108:863,134:737,135:852,136:857,204:1257,255:16969},t=dn({1:437,2:850,3:1252,4:1e4,100:852,101:866,102:865,103:861,104:895,105:620,106:737,107:857,120:950,121:949,122:936,123:932,124:874,125:1255,126:1256,150:10007,151:10029,152:10006,200:1250,201:1251,202:1254,203:1253,0:20127});function n(t,n){var r=[],i=Fe(1);switch(n.type){case`base64`:i=Le(Me(t));break;case`binary`:i=Le(t);break;case`buffer`:case`array`:i=t;break}hi(i,0);var a=i.read_shift(1),o=!!(a&136),s=!1,c=!1;switch(a){case 2:break;case 3:break;case 48:s=!0,o=!0;break;case 49:s=!0,o=!0;break;case 131:break;case 139:break;case 140:c=!0;break;case 245:break;default:throw Error(`DBF Unsupported Version: `+a.toString(16))}var l=0,u=521;a==2&&(l=i.read_shift(2)),i.l+=3,a!=2&&(l=i.read_shift(4)),l>1048576&&(l=1e6),a!=2&&(u=i.read_shift(2));var d=i.read_shift(2),f=n.codepage||1252;a!=2&&(i.l+=16,i.read_shift(1),i[i.l]!==0&&(f=e[i[i.l]]),i.l+=1,i.l+=2),c&&(i.l+=36);for(var p=[],m={},h=Math.min(i.length,a==2?521:u-10-(s?264:0)),g=c?32:11;i.l<h&&i[i.l]!=13;)switch(m={},m.name=De.utils.decode(f,i.slice(i.l,i.l+g)).replace(/[\u0000\r\n].*$/g,``),i.l+=g,m.type=String.fromCharCode(i.read_shift(1)),a!=2&&!c&&(m.offset=i.read_shift(4)),m.len=i.read_shift(1),a==2&&(m.offset=i.read_shift(2)),m.dec=i.read_shift(1),m.name.length&&p.push(m),a!=2&&(i.l+=c?13:14),m.type){case`B`:(!s||m.len!=8)&&n.WTF&&console.log(`Skipping `+m.name+`:`+m.type);break;case`G`:case`P`:n.WTF&&console.log(`Skipping `+m.name+`:`+m.type);break;case`+`:case`0`:case`@`:case`C`:case`D`:case`F`:case`I`:case`L`:case`M`:case`N`:case`O`:case`T`:case`Y`:break;default:throw Error(`Unknown Field Type: `+m.type)}if(i[i.l]!==13&&(i.l=u-1),i.read_shift(1)!==13)throw Error(`DBF Terminator not found `+i.l+` `+i[i.l]);i.l=u;var _=0,v=0;for(r[0]=[],v=0;v!=p.length;++v)r[0][v]=p[v].name;for(;l-- >0;){if(i[i.l]===42){i.l+=d;continue}for(++i.l,r[++_]=[],v=0,v=0;v!=p.length;++v){var y=i.slice(i.l,i.l+p[v].len);i.l+=p[v].len,hi(y,0);var b=De.utils.decode(f,y);switch(p[v].type){case`C`:b.trim().length&&(r[_][v]=b.replace(/\s+$/,``));break;case`D`:b.length===8?r[_][v]=new Date(+b.slice(0,4),b.slice(4,6)-1,+b.slice(6,8)):r[_][v]=b;break;case`F`:r[_][v]=parseFloat(b.trim());break;case`+`:case`I`:r[_][v]=c?y.read_shift(-4,`i`)^2147483648:y.read_shift(4,`i`);break;case`L`:switch(b.trim().toUpperCase()){case`Y`:case`T`:r[_][v]=!0;break;case`N`:case`F`:r[_][v]=!1;break;case``:case`?`:break;default:throw Error(`DBF Unrecognized L:|`+b+`|`)}break;case`M`:if(!o)throw Error(`DBF Unexpected MEMO for type `+a.toString(16));r[_][v]=`##MEMO##`+(c?parseInt(b.trim(),10):y.read_shift(4));break;case`N`:b=b.replace(/\u0000/g,``).trim(),b&&b!=`.`&&(r[_][v]=+b||0);break;case`@`:r[_][v]=new Date(y.read_shift(-8,`f`)-621356832e5);break;case`T`:r[_][v]=new Date((y.read_shift(4)-2440588)*864e5+y.read_shift(4));break;case`Y`:r[_][v]=y.read_shift(4,`i`)/1e4+y.read_shift(4,`i`)/1e4*2**32;break;case`O`:r[_][v]=-y.read_shift(-8,`f`);break;case`B`:if(s&&p[v].len==8){r[_][v]=y.read_shift(8,`f`);break}case`G`:case`P`:y.l+=p[v].len;break;case`0`:if(p[v].name===`_NullFlags`)break;default:throw Error(`DBF Unsupported data type `+p[v].type)}}}if(a!=2&&i.l<i.length&&i[i.l++]!=26)throw Error(`DBF EOF Marker missing `+(i.l-1)+` of `+i.length+` `+i[i.l-1].toString(16));return n&&n.sheetRows&&(r=r.slice(0,n.sheetRows)),n.DBF=p,r}function r(e,t){var r=t||{};r.dateNF||=`yyyymmdd`;var i=Bi(n(e,r),r);return i[`!cols`]=r.DBF.map(function(e){return{wch:e.len,DBF:e}}),delete r.DBF,i}function i(e,t){try{return Ri(r(e,t),t)}catch(e){if(t&&t.WTF)throw e}return{SheetNames:[],Sheets:{}}}var a={B:8,C:250,L:1,D:8,"?":0,"":0};function o(e,n){var r=n||{};if(+r.codepage>=0&&ye(+r.codepage),r.type==`string`)throw Error(`Cannot write DBF to JS string`);var i=vi(),o=ob(e,{header:1,raw:!0,cellDates:!0}),s=o[0],c=o.slice(1),l=e[`!cols`]||[],u=0,d=0,f=0,p=1;for(u=0;u<s.length;++u){if(((l[u]||{}).DBF||{}).name){s[u]=l[u].DBF.name,++f;continue}if(s[u]!=null){if(++f,typeof s[u]==`number`&&(s[u]=s[u].toString(10)),typeof s[u]!=`string`)throw Error(`DBF Invalid column name `+s[u]+` |`+typeof s[u]+`|`);if(s.indexOf(s[u])!==u){for(d=0;d<1024;++d)if(s.indexOf(s[u]+`_`+d)==-1){s[u]+=`_`+d;break}}}}var m=Fi(e[`!ref`]),h=[],g=[],_=[];for(u=0;u<=m.e.c-m.s.c;++u){var v=``,y=``,b=0,x=[];for(d=0;d<c.length;++d)c[d][u]!=null&&x.push(c[d][u]);if(x.length==0||s[u]==null){h[u]=`?`;continue}for(d=0;d<x.length;++d){switch(typeof x[d]){case`number`:y=`B`;break;case`string`:y=`C`;break;case`boolean`:y=`L`;break;case`object`:y=x[d]instanceof Date?`D`:`C`;break;default:y=`C`}b=Math.max(b,String(x[d]).length),v=v&&v!=y?`C`:y}b>250&&(b=250),y=((l[u]||{}).DBF||{}).type,y==`C`&&l[u].DBF.len>b&&(b=l[u].DBF.len),v==`B`&&y==`N`&&(v=`N`,_[u]=l[u].DBF.dec,b=l[u].DBF.len),g[u]=v==`C`||y==`N`?b:a[v]||0,p+=g[u],h[u]=v}var S=i.next(32);for(S.write_shift(4,318902576),S.write_shift(4,c.length),S.write_shift(2,296+32*f),S.write_shift(2,p),u=0;u<4;++u)S.write_shift(4,0);for(S.write_shift(4,0|(+t[me]||3)<<8),u=0,d=0;u<s.length;++u)if(s[u]!=null){var C=i.next(32),w=(s[u].slice(-10)+`\0\0\0\0\0\0\0\0\0\0\0`).slice(0,11);C.write_shift(1,w,`sbcs`),C.write_shift(1,h[u]==`?`?`C`:h[u],`sbcs`),C.write_shift(4,d),C.write_shift(1,g[u]||a[h[u]]||0),C.write_shift(1,_[u]||0),C.write_shift(1,2),C.write_shift(4,0),C.write_shift(1,0),C.write_shift(4,0),C.write_shift(4,0),d+=g[u]||a[h[u]]||0}var T=i.next(264);for(T.write_shift(4,13),u=0;u<65;++u)T.write_shift(4,0);for(u=0;u<c.length;++u){var E=i.next(p);for(E.write_shift(1,0),d=0;d<s.length;++d)if(s[d]!=null)switch(h[d]){case`L`:E.write_shift(1,c[u][d]==null?63:c[u][d]?84:70);break;case`B`:E.write_shift(8,c[u][d]||0,`f`);break;case`N`:var D=`0`;for(typeof c[u][d]==`number`&&(D=c[u][d].toFixed(_[d]||0)),f=0;f<g[d]-D.length;++f)E.write_shift(1,32);E.write_shift(1,D,`sbcs`);break;case`D`:c[u][d]?(E.write_shift(4,(`0000`+c[u][d].getFullYear()).slice(-4),`sbcs`),E.write_shift(2,(`00`+(c[u][d].getMonth()+1)).slice(-2),`sbcs`),E.write_shift(2,(`00`+c[u][d].getDate()).slice(-2),`sbcs`)):E.write_shift(8,`00000000`,`sbcs`);break;case`C`:var O=String(c[u][d]==null?``:c[u][d]).slice(0,g[d]);for(E.write_shift(1,O,`sbcs`),f=0;f<g[d]-O.length;++f)E.write_shift(1,32);break}}return i.next(1).write_shift(1,26),i.end()}return{to_workbook:i,to_sheet:r,from_sheet:o}})(),bl=(function(){var e={AA:`À`,BA:`Á`,CA:`Â`,DA:195,HA:`Ä`,JA:197,AE:`È`,BE:`É`,CE:`Ê`,HE:`Ë`,AI:`Ì`,BI:`Í`,CI:`Î`,HI:`Ï`,AO:`Ò`,BO:`Ó`,CO:`Ô`,DO:213,HO:`Ö`,AU:`Ù`,BU:`Ú`,CU:`Û`,HU:`Ü`,Aa:`à`,Ba:`á`,Ca:`â`,Da:227,Ha:`ä`,Ja:229,Ae:`è`,Be:`é`,Ce:`ê`,He:`ë`,Ai:`ì`,Bi:`í`,Ci:`î`,Hi:`ï`,Ao:`ò`,Bo:`ó`,Co:`ô`,Do:245,Ho:`ö`,Au:`ù`,Bu:`ú`,Cu:`û`,Hu:`ü`,KC:`Ç`,Kc:`ç`,q:`æ`,z:`œ`,a:`Æ`,j:`Œ`,DN:209,Dn:241,Hy:255,S:169,c:170,R:174,"B ":180,0:176,1:177,2:178,3:179,5:181,6:182,7:183,Q:185,k:186,b:208,i:216,l:222,s:240,y:248,"!":161,'"':162,"#":163,"(":164,"%":165,"'":167,"H ":168,"+":171,";":187,"<":188,"=":189,">":190,"?":191,"{":223},t=RegExp(`\x1BN(`+ln(e).join(`|`).replace(/\|\|\|/,`|\\||`).replace(/([?()+])/g,`\\$1`)+`|\\|)`,`gm`),n=function(t,n){var r=e[n];return typeof r==`number`?Ee(r):r},r=function(e,t,n){var r=t.charCodeAt(0)-32<<4|n.charCodeAt(0)-48;return r==59?e:Ee(r)};e[`|`]=254;function i(e,t){switch(t.type){case`base64`:return a(Me(e),t);case`binary`:return a(e,t);case`buffer`:return a(Ne&&Buffer.isBuffer(e)?e.toString(`binary`):ze(e),t);case`array`:return a(Tn(e),t)}throw Error(`Unrecognized type `+t.type)}function a(e,i){var a=e.split(/[\n\r]+/),o=-1,s=-1,c=0,l=0,u=[],d=[],f=null,p={},m=[],h=[],g=[],_=0,v;for(+i.codepage>=0&&ye(+i.codepage);c!==a.length;++c){_=0;var y=a[c].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g,r).replace(t,n),b=y.replace(/;;/g,`\0`).split(`;`).map(function(e){return e.replace(/\u0000/g,`;`)}),x=b[0],S;if(y.length>0)switch(x){case`ID`:break;case`E`:break;case`B`:break;case`O`:break;case`W`:break;case`P`:b[1].charAt(0)==`P`&&d.push(y.slice(3).replace(/;;/g,`;`));break;case`C`:var C=!1,w=!1,T=!1,E=!1,D=-1,O=-1;for(l=1;l<b.length;++l)switch(b[l].charAt(0)){case`A`:break;case`X`:s=parseInt(b[l].slice(1))-1,w=!0;break;case`Y`:for(o=parseInt(b[l].slice(1))-1,w||(s=0),v=u.length;v<=o;++v)u[v]=[];break;case`K`:S=b[l].slice(1),S.charAt(0)===`"`?S=S.slice(1,S.length-1):S===`TRUE`?S=!0:S===`FALSE`?S=!1:isNaN(On(S))?isNaN(An(S).getDate())||(S=wn(S)):(S=On(S),f!==null&&Wt(f)&&(S=yn(S))),De!==void 0&&typeof S==`string`&&(i||{}).type!=`string`&&(i||{}).codepage&&(S=De.utils.decode(i.codepage,S)),C=!0;break;case`E`:E=!0;var k=xf(b[l].slice(1),{r:o,c:s});u[o][s]=[u[o][s],k];break;case`S`:T=!0,u[o][s]=[u[o][s],`S5S`];break;case`G`:break;case`R`:D=parseInt(b[l].slice(1))-1;break;case`C`:O=parseInt(b[l].slice(1))-1;break;default:if(i&&i.WTF)throw Error(`SYLK bad record `+y)}if(C&&(u[o][s]&&u[o][s].length==2?u[o][s][0]=S:u[o][s]=S,f=null),T){if(E)throw Error(`SYLK shared formula cannot have own formula`);var A=D>-1&&u[D][O];if(!A||!A[1])throw Error(`SYLK shared formula cannot find base`);u[o][s][1]=wf(A[1],{r:o-D,c:s-O})}break;case`F`:var j=0;for(l=1;l<b.length;++l)switch(b[l].charAt(0)){case`X`:s=parseInt(b[l].slice(1))-1,++j;break;case`Y`:for(o=parseInt(b[l].slice(1))-1,v=u.length;v<=o;++v)u[v]=[];break;case`M`:_=parseInt(b[l].slice(1))/20;break;case`F`:break;case`G`:break;case`P`:f=d[parseInt(b[l].slice(1))];break;case`S`:break;case`D`:break;case`N`:break;case`W`:for(g=b[l].slice(1).split(` `),v=parseInt(g[0],10);v<=parseInt(g[1],10);++v)_=parseInt(g[2],10),h[v-1]=_===0?{hidden:!0}:{wch:_},Ou(h[v-1]);break;case`C`:s=parseInt(b[l].slice(1))-1,h[s]||(h[s]={});break;case`R`:o=parseInt(b[l].slice(1))-1,m[o]||(m[o]={}),_>0?(m[o].hpt=_,m[o].hpx=ju(_)):_===0&&(m[o].hidden=!0);break;default:if(i&&i.WTF)throw Error(`SYLK bad record `+y)}j<1&&(f=null);break;default:if(i&&i.WTF)throw Error(`SYLK bad record `+y)}}return m.length>0&&(p[`!rows`]=m),h.length>0&&(p[`!cols`]=h),i&&i.sheetRows&&(u=u.slice(0,i.sheetRows)),[u,p]}function o(e,t){var n=i(e,t),r=n[0],a=n[1],o=Bi(r,t);return ln(a).forEach(function(e){o[e]=a[e]}),o}function s(e,t){return Ri(o(e,t),t)}function c(e,t,n,r){var i=`C;Y`+(n+1)+`;X`+(r+1)+`;K`;switch(e.t){case`n`:i+=e.v||0,e.f&&!e.F&&(i+=`;E`+Cf(e.f,{r:n,c:r}));break;case`b`:i+=e.v?`TRUE`:`FALSE`;break;case`e`:i+=e.w||e.v;break;case`d`:i+=`"`+(e.w||e.v)+`"`;break;case`s`:i+=`"`+e.v.replace(/"/g,``).replace(/;/g,`;;`)+`"`;break}return i}function l(e,t){t.forEach(function(t,n){var r=`F;W`+(n+1)+` `+(n+1)+` `;t.hidden?r+=`0`:(typeof t.width==`number`&&!t.wpx&&(t.wpx=Cu(t.width)),typeof t.wpx==`number`&&!t.wch&&(t.wch=wu(t.wpx)),typeof t.wch==`number`&&(r+=Math.round(t.wch))),r.charAt(r.length-1)!=` `&&e.push(r)})}function u(e,t){t.forEach(function(t,n){var r=`F;`;t.hidden?r+=`M0;`:t.hpt?r+=`M`+20*t.hpt+`;`:t.hpx&&(r+=`M`+20*Au(t.hpx)+`;`),r.length>2&&e.push(r+`R`+(n+1))})}function d(e,t){var n=[`ID;PWXL;N;E`],r=[],i=Fi(e[`!ref`]),a,o=Array.isArray(e),s=`\r
`;n.push(`P;PGeneral`),n.push(`F;P0;DG0G8;M255`),e[`!cols`]&&l(n,e[`!cols`]),e[`!rows`]&&u(n,e[`!rows`]),n.push(`B;Y`+(i.e.r-i.s.r+1)+`;X`+(i.e.c-i.s.c+1)+`;D`+[i.s.c,i.s.r,i.e.c,i.e.r].join(` `));for(var d=i.s.r;d<=i.e.r;++d)for(var f=i.s.c;f<=i.e.c;++f){var p=J({r:d,c:f});a=o?(e[d]||[])[f]:e[p],!(!a||a.v==null&&(!a.f||a.F))&&r.push(c(a,e,d,f,t))}return n.join(s)+s+r.join(s)+s+`E`+s}return{to_workbook:s,to_sheet:o,from_sheet:d}})(),xl=(function(){function e(e,n){switch(n.type){case`base64`:return t(Me(e),n);case`binary`:return t(e,n);case`buffer`:return t(Ne&&Buffer.isBuffer(e)?e.toString(`binary`):ze(e),n);case`array`:return t(Tn(e),n)}throw Error(`Unrecognized type `+n.type)}function t(e,t){for(var n=e.split(`
`),r=-1,i=-1,a=0,o=[];a!==n.length;++a){if(n[a].trim()===`BOT`){o[++r]=[],i=0;continue}if(!(r<0)){var s=n[a].trim().split(`,`),c=s[0],l=s[1];++a;for(var u=n[a]||``;(u.match(/["]/g)||[]).length&1&&a<n.length-1;)u+=`
`+n[++a];switch(u=u.trim(),+c){case-1:if(u===`BOT`){o[++r]=[],i=0;continue}else if(u!==`EOD`)throw Error(`Unrecognized DIF special command `+u);break;case 0:u===`TRUE`?o[r][i]=!0:u===`FALSE`?o[r][i]=!1:isNaN(On(l))?isNaN(An(l).getDate())?o[r][i]=l:o[r][i]=wn(l):o[r][i]=On(l),++i;break;case 1:u=u.slice(1,u.length-1),u=u.replace(/""/g,`"`),ke&&u&&u.match(/^=".*"$/)&&(u=u.slice(2,-1)),o[r][i++]=u===``?null:u;break}if(u===`EOD`)break}}return t&&t.sheetRows&&(o=o.slice(0,t.sheetRows)),o}function n(t,n){return Bi(e(t,n),n)}function r(e,t){return Ri(n(e,t),t)}return{to_workbook:r,to_sheet:n,from_sheet:(function(){var e=function(e,t,n,r,i){e.push(t),e.push(n+`,`+r),e.push(`"`+i.replace(/"/g,`""`)+`"`)},t=function(e,t,n,r){e.push(t+`,`+n),e.push(t==1?`"`+r.replace(/"/g,`""`)+`"`:r)};return function(n){var r=[],i=Fi(n[`!ref`]),a,o=Array.isArray(n);e(r,`TABLE`,0,1,`sheetjs`),e(r,`VECTORS`,0,i.e.r-i.s.r+1,``),e(r,`TUPLES`,0,i.e.c-i.s.c+1,``),e(r,`DATA`,0,0,``);for(var s=i.s.r;s<=i.e.r;++s){t(r,-1,0,`BOT`);for(var c=i.s.c;c<=i.e.c;++c){var l=J({r:s,c});if(a=o?(n[s]||[])[c]:n[l],!a){t(r,1,0,``);continue}switch(a.t){case`n`:var u=ke?a.w:a.v;!u&&a.v!=null&&(u=a.v),u==null?ke&&a.f&&!a.F?t(r,1,0,`=`+a.f):t(r,1,0,``):t(r,0,u,`V`);break;case`b`:t(r,0,+!!a.v,a.v?`TRUE`:`FALSE`);break;case`s`:t(r,1,0,!ke||isNaN(a.v)?a.v:`="`+a.v+`"`);break;case`d`:a.w||=Yt(a.z||H[14],hn(wn(a.v))),ke?t(r,0,a.w,`V`):t(r,1,0,a.w);break;default:t(r,1,0,``)}}}return t(r,-1,0,`EOD`),r.join(`\r
`)}})()}})(),Sl=(function(){function e(e){return e.replace(/\\b/g,`\\`).replace(/\\c/g,`:`).replace(/\\n/g,`
`)}function t(e){return e.replace(/\\/g,`\\b`).replace(/:/g,`\\c`).replace(/\n/g,`\\n`)}function n(t,n){for(var r=t.split(`
`),i=-1,a=-1,o=0,s=[];o!==r.length;++o){var c=r[o].trim().split(`:`);if(c[0]===`cell`){var l=Mi(c[1]);if(s.length<=l.r)for(i=s.length;i<=l.r;++i)s[i]||(s[i]=[]);switch(i=l.r,a=l.c,c[2]){case`t`:s[i][a]=e(c[3]);break;case`v`:s[i][a]=+c[3];break;case`vtf`:var u=c[c.length-1];case`vtc`:switch(c[3]){case`nl`:s[i][a]=!!+c[4];break;default:s[i][a]=+c[4];break}c[2]==`vtf`&&(s[i][a]=[s[i][a],u])}}}return n&&n.sheetRows&&(s=s.slice(0,n.sheetRows)),s}function r(e,t){return Bi(n(e,t),t)}function i(e,t){return Ri(r(e,t),t)}var a=[`socialcalc:version:1.5`,`MIME-Version: 1.0`,`Content-Type: multipart/mixed; boundary=SocialCalcSpreadsheetControlSave`].join(`
`),o=[`--SocialCalcSpreadsheetControlSave`,`Content-type: text/plain; charset=UTF-8`].join(`
`)+`
`,s=[`# SocialCalc Spreadsheet Control Save`,`part:sheet`].join(`
`),c=`--SocialCalcSpreadsheetControlSave--`;function l(e){if(!e||!e[`!ref`])return``;for(var n=[],r=[],i,a=``,o=Ni(e[`!ref`]),s=Array.isArray(e),c=o.s.r;c<=o.e.r;++c)for(var l=o.s.c;l<=o.e.c;++l)if(a=J({r:c,c:l}),i=s?(e[c]||[])[l]:e[a],!(!i||i.v==null||i.t===`z`)){switch(r=[`cell`,a,`t`],i.t){case`s`:case`str`:r.push(t(i.v));break;case`n`:i.f?(r[2]=`vtf`,r[3]=`n`,r[4]=i.v,r[5]=t(i.f)):(r[2]=`v`,r[3]=i.v);break;case`b`:r[2]=`vt`+(i.f?`f`:`c`),r[3]=`nl`,r[4]=i.v?`1`:`0`,r[5]=t(i.f||(i.v?`TRUE`:`FALSE`));break;case`d`:var u=hn(wn(i.v));r[2]=`vtc`,r[3]=`nd`,r[4]=``+u,r[5]=i.w||Yt(i.z||H[14],u);break;case`e`:continue}n.push(r.join(`:`))}return n.push(`sheet:c:`+(o.e.c-o.s.c+1)+`:r:`+(o.e.r-o.s.r+1)+`:tvf:1`),n.push(`valueformat:1:text-wiki`),n.join(`
`)}function u(e){return[a,o,s,o,l(e),c].join(`
`)}return{to_workbook:i,to_sheet:r,from_sheet:u}})(),Cl=(function(){function e(e,t,n,r,i){i.raw?t[n][r]=e:e===``||(e===`TRUE`?t[n][r]=!0:e===`FALSE`?t[n][r]=!1:isNaN(On(e))?isNaN(An(e).getDate())?t[n][r]=e:t[n][r]=wn(e):t[n][r]=On(e))}function t(t,n){var r=n||{},i=[];if(!t||t.length===0)return i;for(var a=t.split(/[\r\n]/),o=a.length-1;o>=0&&a[o].length===0;)--o;for(var s=10,c=0,l=0;l<=o;++l)c=a[l].indexOf(` `),c==-1?c=a[l].length:c++,s=Math.max(s,c);for(l=0;l<=o;++l){i[l]=[];var u=0;for(e(a[l].slice(0,s).trim(),i,l,u,r),u=1;u<=(a[l].length-s)/10+1;++u)e(a[l].slice(s+(u-1)*10,s+u*10).trim(),i,l,u,r)}return r.sheetRows&&(i=i.slice(0,r.sheetRows)),i}var n={44:`,`,9:`	`,59:`;`,124:`|`},r={44:3,9:2,59:1,124:0};function i(e){for(var t={},i=!1,a=0,o=0;a<e.length;++a)(o=e.charCodeAt(a))==34?i=!i:!i&&o in n&&(t[o]=(t[o]||0)+1);for(a in o=[],t)Object.prototype.hasOwnProperty.call(t,a)&&o.push([t[a],a]);if(!o.length)for(a in t=r,t)Object.prototype.hasOwnProperty.call(t,a)&&o.push([t[a],a]);return o.sort(function(e,t){return e[0]-t[0]||r[e[1]]-r[t[1]]}),n[o.pop()[1]]||44}function a(e,t){var n=t||{},r=``;Oe!=null&&n.dense==null&&(n.dense=Oe);var a=n.dense?[]:{},o={s:{c:0,r:0},e:{c:0,r:0}};e.slice(0,4)==`sep=`?e.charCodeAt(5)==13&&e.charCodeAt(6)==10?(r=e.charAt(4),e=e.slice(7)):e.charCodeAt(5)==13||e.charCodeAt(5)==10?(r=e.charAt(4),e=e.slice(6)):r=i(e.slice(0,1024)):r=n&&n.FS?n.FS:i(e.slice(0,1024));var s=0,c=0,l=0,u=0,d=0,f=r.charCodeAt(0),p=!1,m=0,h=e.charCodeAt(0);e=e.replace(/\r\n/gm,`
`);var g=n.dateNF==null?null:tn(n.dateNF);function _(){var t=e.slice(u,d),r={};if(t.charAt(0)==`"`&&t.charAt(t.length-1)==`"`&&(t=t.slice(1,-1).replace(/""/g,`"`)),t.length===0)r.t=`z`;else if(n.raw)r.t=`s`,r.v=t;else if(t.trim().length===0)r.t=`s`,r.v=t;else if(t.charCodeAt(0)==61)t.charCodeAt(1)==34&&t.charCodeAt(t.length-1)==34?(r.t=`s`,r.v=t.slice(2,-1).replace(/""/g,`"`)):Ef(t)?(r.t=`n`,r.f=t.slice(1)):(r.t=`s`,r.v=t);else if(t==`TRUE`)r.t=`b`,r.v=!0;else if(t==`FALSE`)r.t=`b`,r.v=!1;else if(!isNaN(l=On(t)))r.t=`n`,n.cellText!==!1&&(r.w=t),r.v=l;else if(!isNaN(An(t).getDate())||g&&t.match(g)){r.z=n.dateNF||H[14];var i=0;g&&t.match(g)&&(t=nn(t,n.dateNF,t.match(g)||[]),i=1),n.cellDates?(r.t=`d`,r.v=wn(t,i)):(r.t=`n`,r.v=hn(wn(t,i))),n.cellText!==!1&&(r.w=Yt(r.z,r.v instanceof Date?hn(r.v):r.v)),n.cellNF||delete r.z}else r.t=`s`,r.v=t;if(r.t==`z`||(n.dense?(a[s]||(a[s]=[]),a[s][c]=r):a[J({c,r:s})]=r),u=d+1,h=e.charCodeAt(u),o.e.c<c&&(o.e.c=c),o.e.r<s&&(o.e.r=s),m==f)++c;else if(c=0,++s,n.sheetRows&&n.sheetRows<=s)return!0}outer:for(;d<e.length;++d)switch(m=e.charCodeAt(d)){case 34:h===34&&(p=!p);break;case f:case 10:case 13:if(!p&&_())break outer;break;default:break}return d-u>0&&_(),a[`!ref`]=Pi(o),a}function o(e,n){return!(n&&n.PRN)||n.FS||e.slice(0,4)==`sep=`||e.indexOf(`	`)>=0||e.indexOf(`,`)>=0||e.indexOf(`;`)>=0?a(e,n):Bi(t(e,n),n)}function s(e,t){var n=``,r=t.type==`string`?[0,0,0,0]:By(e,t);switch(t.type){case`base64`:n=Me(e);break;case`binary`:n=e;break;case`buffer`:n=t.codepage==65001?e.toString(`utf8`):t.codepage&&De!==void 0?De.utils.decode(t.codepage,e):Ne&&Buffer.isBuffer(e)?e.toString(`binary`):ze(e);break;case`array`:n=Tn(e);break;case`string`:n=e;break;default:throw Error(`Unrecognized type `+t.type)}return r[0]==239&&r[1]==187&&r[2]==191?n=hr(n.slice(3)):t.type!=`string`&&t.type!=`buffer`&&t.codepage==65001?n=hr(n):t.type==`binary`&&De!==void 0&&t.codepage&&(n=De.utils.decode(t.codepage,De.utils.encode(28591,n))),n.slice(0,19)==`socialcalc:version:`?Sl.to_sheet(t.type==`string`?n:hr(n),t):o(n,t)}function c(e,t){return Ri(s(e,t),t)}function l(e){for(var t=[],n=Fi(e[`!ref`]),r,i=Array.isArray(e),a=n.s.r;a<=n.e.r;++a){for(var o=[],s=n.s.c;s<=n.e.c;++s){var c=J({r:a,c:s});if(r=i?(e[a]||[])[s]:e[c],!r||r.v==null){o.push(`          `);continue}for(var l=(r.w||(Li(r),r.w)||``).slice(0,10);l.length<10;)l+=` `;o.push(l+(s===0?` `:``))}t.push(o.join(``))}return t.join(`
`)}return{to_workbook:c,to_sheet:s,from_sheet:l}})();function wl(e,t){var n=t||{},r=!!n.WTF;n.WTF=!0;try{var i=bl.to_workbook(e,n);return n.WTF=r,i}catch(i){if(n.WTF=r,!i.message.match(/SYLK bad record ID/)&&r)throw i;return Cl.to_workbook(e,t)}}var Tl=(function(){function e(e,t,n){if(e){hi(e,e.l||0);for(var r=n.Enum||I;e.l<e.length;){var i=e.read_shift(2),a=r[i]||r[65535],o=e.read_shift(2),s=e.l+o,c=a.f&&a.f(e,o,n);if(e.l=s,t(c,a,i))return}}}function t(e,t){switch(t.type){case`base64`:return n(Le(Me(e)),t);case`binary`:return n(Le(e),t);case`buffer`:case`array`:return n(e,t)}throw`Unsupported type `+t.type}function n(t,n){if(!t)return t;var r=n||{};Oe!=null&&r.dense==null&&(r.dense=Oe);var i=r.dense?[]:{},a=`Sheet1`,o=``,s=0,c={},l=[],u=[],d={s:{r:0,c:0},e:{r:0,c:0}},f=r.sheetRows||0;if(t[2]==0&&(t[3]==8||t[3]==9)&&t.length>=16&&t[14]==5&&t[15]===108)throw Error(`Unsupported Works 3 for Mac file`);if(t[2]==2)r.Enum=I,e(t,function(e,t,n){switch(n){case 0:r.vers=e,e>=4096&&(r.qpro=!0);break;case 6:d=e;break;case 204:e&&(o=e);break;case 222:o=e;break;case 15:case 51:r.qpro||(e[1].v=e[1].v.slice(1));case 13:case 14:case 16:n==14&&(e[2]&112)==112&&(e[2]&15)>1&&(e[2]&15)<15&&(e[1].z=r.dateNF||H[14],r.cellDates&&(e[1].t=`d`,e[1].v=yn(e[1].v))),r.qpro&&e[3]>s&&(i[`!ref`]=Pi(d),c[a]=i,l.push(a),i=r.dense?[]:{},d={s:{r:0,c:0},e:{r:0,c:0}},s=e[3],a=o||`Sheet`+(s+1),o=``);var u=r.dense?(i[e[0].r]||[])[e[0].c]:i[J(e[0])];if(u){u.t=e[1].t,u.v=e[1].v,e[1].z!=null&&(u.z=e[1].z),e[1].f!=null&&(u.f=e[1].f);break}r.dense?(i[e[0].r]||(i[e[0].r]=[]),i[e[0].r][e[0].c]=e[1]):i[J(e[0])]=e[1];break;default:}},r);else if(t[2]==26||t[2]==14)r.Enum=L,t[2]==14&&(r.qpro=!0,t.l=0),e(t,function(e,t,n){switch(n){case 204:a=e;break;case 22:e[1].v=e[1].v.slice(1);case 23:case 24:case 25:case 37:case 39:case 40:if(e[3]>s&&(i[`!ref`]=Pi(d),c[a]=i,l.push(a),i=r.dense?[]:{},d={s:{r:0,c:0},e:{r:0,c:0}},s=e[3],a=`Sheet`+(s+1)),f>0&&e[0].r>=f)break;r.dense?(i[e[0].r]||(i[e[0].r]=[]),i[e[0].r][e[0].c]=e[1]):i[J(e[0])]=e[1],d.e.c<e[0].c&&(d.e.c=e[0].c),d.e.r<e[0].r&&(d.e.r=e[0].r);break;case 27:e[14e3]&&(u[e[14e3][0]]=e[14e3][1]);break;case 1537:u[e[0]]=e[1],e[0]==s&&(a=e[1]);break;default:break}},r);else throw Error(`Unrecognized LOTUS BOF `+t[2]);if(i[`!ref`]=Pi(d),c[o||a]=i,l.push(o||a),!u.length)return{SheetNames:l,Sheets:c};for(var p={},m=[],h=0;h<u.length;++h)c[l[h]]?(m.push(u[h]||l[h]),p[u[h]]=c[u[h]]||c[l[h]]):(m.push(u[h]),p[u[h]]={"!ref":`A1`});return{SheetNames:m,Sheets:p}}function r(e,t){var n=t||{};if(+n.codepage>=0&&ye(+n.codepage),n.type==`string`)throw Error(`Cannot write WK1 to JS string`);var r=vi(),i=Fi(e[`!ref`]),o=Array.isArray(e),s=[];Y(r,0,a(1030)),Y(r,6,c(i));for(var l=Math.min(i.e.r,8191),u=i.s.r;u<=l;++u)for(var f=wi(u),m=i.s.c;m<=i.e.c;++m){u===i.s.r&&(s[m]=Oi(m));var g=s[m]+f,_=o?(e[u]||[])[m]:e[g];if(!(!_||_.t==`z`))if(_.t==`n`)(_.v|0)==_.v&&_.v>=-32768&&_.v<=32767?Y(r,13,p(u,m,_.v)):Y(r,14,h(u,m,_.v));else{var v=Li(_);Y(r,15,d(u,m,v.slice(0,239)))}}return Y(r,1),r.end()}function i(e,t){var n=t||{};if(+n.codepage>=0&&ye(+n.codepage),n.type==`string`)throw Error(`Cannot write WK3 to JS string`);var r=vi();Y(r,0,o(e));for(var i=0,a=0;i<e.SheetNames.length;++i)(e.Sheets[e.SheetNames[i]]||{})[`!ref`]&&Y(r,27,F(e.SheetNames[i],a++));var s=0;for(i=0;i<e.SheetNames.length;++i){var c=e.Sheets[e.SheetNames[i]];if(!(!c||!c[`!ref`])){for(var l=Fi(c[`!ref`]),u=Array.isArray(c),d=[],f=Math.min(l.e.r,8191),p=l.s.r;p<=f;++p)for(var m=wi(p),h=l.s.c;h<=l.e.c;++h){p===l.s.r&&(d[h]=Oi(h));var g=d[h]+m,_=u?(c[p]||[])[h]:c[g];if(!(!_||_.t==`z`))if(_.t==`n`)Y(r,23,E(p,h,s,_.v));else{var v=Li(_);Y(r,22,C(p,h,s,v.slice(0,239)))}}++s}}return Y(r,1),r.end()}function a(e){var t=K(2);return t.write_shift(2,e),t}function o(e){var t=K(26);t.write_shift(2,4096),t.write_shift(2,4),t.write_shift(4,0);for(var n=0,r=0,i=0,a=0;a<e.SheetNames.length;++a){var o=e.SheetNames[a],s=e.Sheets[o];if(!(!s||!s[`!ref`])){++i;var c=Ni(s[`!ref`]);n<c.e.r&&(n=c.e.r),r<c.e.c&&(r=c.e.c)}}return n>8191&&(n=8191),t.write_shift(2,n),t.write_shift(1,i),t.write_shift(1,r),t.write_shift(2,0),t.write_shift(2,0),t.write_shift(1,1),t.write_shift(1,2),t.write_shift(4,0),t.write_shift(4,0),t}function s(e,t,n){var r={s:{c:0,r:0},e:{c:0,r:0}};return t==8&&n.qpro?(r.s.c=e.read_shift(1),e.l++,r.s.r=e.read_shift(2),r.e.c=e.read_shift(1),e.l++,r.e.r=e.read_shift(2),r):(r.s.c=e.read_shift(2),r.s.r=e.read_shift(2),t==12&&n.qpro&&(e.l+=2),r.e.c=e.read_shift(2),r.e.r=e.read_shift(2),t==12&&n.qpro&&(e.l+=2),r.s.c==65535&&(r.s.c=r.e.c=r.s.r=r.e.r=0),r)}function c(e){var t=K(8);return t.write_shift(2,e.s.c),t.write_shift(2,e.s.r),t.write_shift(2,e.e.c),t.write_shift(2,e.e.r),t}function l(e,t,n){var r=[{c:0,r:0},{t:`n`,v:0},0,0];return n.qpro&&n.vers!=20768?(r[0].c=e.read_shift(1),r[3]=e.read_shift(1),r[0].r=e.read_shift(2),e.l+=2):(r[2]=e.read_shift(1),r[0].c=e.read_shift(2),r[0].r=e.read_shift(2)),r}function u(e,t,n){var r=e.l+t,i=l(e,t,n);if(i[1].t=`s`,n.vers==20768){e.l++;var a=e.read_shift(1);return i[1].v=e.read_shift(a,`utf8`),i}return n.qpro&&e.l++,i[1].v=e.read_shift(r-e.l,`cstr`),i}function d(e,t,n){var r=K(7+n.length);r.write_shift(1,255),r.write_shift(2,t),r.write_shift(2,e),r.write_shift(1,39);for(var i=0;i<r.length;++i){var a=n.charCodeAt(i);r.write_shift(1,a>=128?95:a)}return r.write_shift(1,0),r}function f(e,t,n){var r=l(e,t,n);return r[1].v=e.read_shift(2,`i`),r}function p(e,t,n){var r=K(7);return r.write_shift(1,255),r.write_shift(2,t),r.write_shift(2,e),r.write_shift(2,n,`i`),r}function m(e,t,n){var r=l(e,t,n);return r[1].v=e.read_shift(8,`f`),r}function h(e,t,n){var r=K(13);return r.write_shift(1,255),r.write_shift(2,t),r.write_shift(2,e),r.write_shift(8,n,`f`),r}function g(e,t,n){var r=e.l+t,i=l(e,t,n);if(i[1].v=e.read_shift(8,`f`),n.qpro)e.l=r;else{var a=e.read_shift(2);b(e.slice(e.l,e.l+a),i),e.l+=a}return i}function _(e,t,n){var r=t&32768;return t&=-32769,t=(r?e:0)+(t>=8192?t-16384:t),(r?``:`$`)+(n?Oi(t):wi(t))}var v={51:[`FALSE`,0],52:[`TRUE`,0],70:[`LEN`,1],80:[`SUM`,69],81:[`AVERAGEA`,69],82:[`COUNTA`,69],83:[`MINA`,69],84:[`MAXA`,69],111:[`T`,1]},y=`.........+.-.*./.^.=.<>.<=.>=.<.>.....&.......`.split(`.`);function b(e,t){hi(e,0);for(var n=[],r=0,i=``,a=``,o=``,s=``;e.l<e.length;){var c=e[e.l++];switch(c){case 0:n.push(e.read_shift(8,`f`));break;case 1:a=_(t[0].c,e.read_shift(2),!0),i=_(t[0].r,e.read_shift(2),!1),n.push(a+i);break;case 2:var l=_(t[0].c,e.read_shift(2),!0),u=_(t[0].r,e.read_shift(2),!1);a=_(t[0].c,e.read_shift(2),!0),i=_(t[0].r,e.read_shift(2),!1),n.push(l+u+`:`+a+i);break;case 3:if(e.l<e.length){console.error(`WK1 premature formula end`);return}break;case 4:n.push(`(`+n.pop()+`)`);break;case 5:n.push(e.read_shift(2));break;case 6:for(var d=``;c=e[e.l++];)d+=String.fromCharCode(c);n.push(`"`+d.replace(/"/g,`""`)+`"`);break;case 8:n.push(`-`+n.pop());break;case 23:n.push(`+`+n.pop());break;case 22:n.push(`NOT(`+n.pop()+`)`);break;case 20:case 21:s=n.pop(),o=n.pop(),n.push([`AND`,`OR`][c-20]+`(`+o+`,`+s+`)`);break;default:if(c<32&&y[c])s=n.pop(),o=n.pop(),n.push(o+y[c]+s);else if(v[c]){if(r=v[c][1],r==69&&(r=e[e.l++]),r>n.length){console.error(`WK1 bad formula parse 0x`+c.toString(16)+`:|`+n.join(`|`)+`|`);return}var f=n.slice(-r);n.length-=r,n.push(v[c][0]+`(`+f.join(`,`)+`)`)}else if(c<=7)return console.error(`WK1 invalid opcode `+c.toString(16));else if(c<=24)return console.error(`WK1 unsupported op `+c.toString(16));else if(c<=30)return console.error(`WK1 invalid opcode `+c.toString(16));else if(c<=115)return console.error(`WK1 unsupported function opcode `+c.toString(16));else return console.error(`WK1 unrecognized opcode `+c.toString(16))}}n.length==1?t[1].f=``+n[0]:console.error(`WK1 bad formula parse |`+n.join(`|`)+`|`)}function x(e){var t=[{c:0,r:0},{t:`n`,v:0},0];return t[0].r=e.read_shift(2),t[3]=e[e.l++],t[0].c=e[e.l++],t}function S(e,t){var n=x(e,t);return n[1].t=`s`,n[1].v=e.read_shift(t-4,`cstr`),n}function C(e,t,n,r){var i=K(6+r.length);i.write_shift(2,e),i.write_shift(1,n),i.write_shift(1,t),i.write_shift(1,39);for(var a=0;a<r.length;++a){var o=r.charCodeAt(a);i.write_shift(1,o>=128?95:o)}return i.write_shift(1,0),i}function w(e,t){var n=x(e,t);n[1].v=e.read_shift(2);var r=n[1].v>>1;if(n[1].v&1)switch(r&7){case 0:r=(r>>3)*5e3;break;case 1:r=(r>>3)*500;break;case 2:r=(r>>3)/20;break;case 3:r=(r>>3)/200;break;case 4:r=(r>>3)/2e3;break;case 5:r=(r>>3)/2e4;break;case 6:r=(r>>3)/16;break;case 7:r=(r>>3)/64;break}return n[1].v=r,n}function T(e,t){var n=x(e,t),r=e.read_shift(4),i=e.read_shift(4),a=e.read_shift(2);if(a==65535)return r===0&&i===3221225472?(n[1].t=`e`,n[1].v=15):r===0&&i===3489660928?(n[1].t=`e`,n[1].v=42):n[1].v=0,n;var o=a&32768;return a=(a&32767)-16446,n[1].v=(1-o*2)*(i*2**(a+32)+r*2**a),n}function E(e,t,n,r){var i=K(14);if(i.write_shift(2,e),i.write_shift(1,n),i.write_shift(1,t),r==0)return i.write_shift(4,0),i.write_shift(4,0),i.write_shift(2,65535),i;var a=0,o=0,s=0,c=0;return r<0&&(a=1,r=-r),o=Math.log2(r)|0,r/=2**(o-31),c=r>>>0,c&2147483648||(r/=2,++o,c=r>>>0),r-=c,c|=2147483648,c>>>=0,r*=2**32,s=r>>>0,i.write_shift(4,s),i.write_shift(4,c),o+=16383+(a?32768:0),i.write_shift(2,o),i}function D(e,t){var n=T(e,14);return e.l+=t-14,n}function O(e,t){var n=x(e,t),r=e.read_shift(4);return n[1].v=r>>6,n}function k(e,t){var n=x(e,t),r=e.read_shift(8,`f`);return n[1].v=r,n}function A(e,t){var n=k(e,14);return e.l+=t-10,n}function j(e,t){return e[e.l+t-1]==0?e.read_shift(t,`cstr`):``}function M(e,t){var n=e[e.l++];n>t-1&&(n=t-1);for(var r=``;r.length<n;)r+=String.fromCharCode(e[e.l++]);return r}function N(e,t,n){if(!(!n.qpro||t<21)){var r=e.read_shift(1);return e.l+=17,e.l+=1,e.l+=2,[r,e.read_shift(t-21,`cstr`)]}}function P(e,t){for(var n={},r=e.l+t;e.l<r;){var i=e.read_shift(2);if(i==14e3){for(n[i]=[0,``],n[i][0]=e.read_shift(2);e[e.l];)n[i][1]+=String.fromCharCode(e[e.l]),e.l++;e.l++}}return n}function F(e,t){var n=K(5+e.length);n.write_shift(2,14e3),n.write_shift(2,t);for(var r=0;r<e.length;++r){var i=e.charCodeAt(r);n[n.l++]=i>127?95:i}return n[n.l++]=0,n}var I={0:{n:`BOF`,f:$o},1:{n:`EOF`},2:{n:`CALCMODE`},3:{n:`CALCORDER`},4:{n:`SPLIT`},5:{n:`SYNC`},6:{n:`RANGE`,f:s},7:{n:`WINDOW1`},8:{n:`COLW1`},9:{n:`WINTWO`},10:{n:`COLW2`},11:{n:`NAME`},12:{n:`BLANK`},13:{n:`INTEGER`,f},14:{n:`NUMBER`,f:m},15:{n:`LABEL`,f:u},16:{n:`FORMULA`,f:g},24:{n:`TABLE`},25:{n:`ORANGE`},26:{n:`PRANGE`},27:{n:`SRANGE`},28:{n:`FRANGE`},29:{n:`KRANGE1`},32:{n:`HRANGE`},35:{n:`KRANGE2`},36:{n:`PROTEC`},37:{n:`FOOTER`},38:{n:`HEADER`},39:{n:`SETUP`},40:{n:`MARGINS`},41:{n:`LABELFMT`},42:{n:`TITLES`},43:{n:`SHEETJS`},45:{n:`GRAPH`},46:{n:`NGRAPH`},47:{n:`CALCCOUNT`},48:{n:`UNFORMATTED`},49:{n:`CURSORW12`},50:{n:`WINDOW`},51:{n:`STRING`,f:u},55:{n:`PASSWORD`},56:{n:`LOCKED`},60:{n:`QUERY`},61:{n:`QUERYNAME`},62:{n:`PRINT`},63:{n:`PRINTNAME`},64:{n:`GRAPH2`},65:{n:`GRAPHNAME`},66:{n:`ZOOM`},67:{n:`SYMSPLIT`},68:{n:`NSROWS`},69:{n:`NSCOLS`},70:{n:`RULER`},71:{n:`NNAME`},72:{n:`ACOMM`},73:{n:`AMACRO`},74:{n:`PARSE`},102:{n:`PRANGES??`},103:{n:`RRANGES??`},104:{n:`FNAME??`},105:{n:`MRANGES??`},204:{n:`SHEETNAMECS`,f:j},222:{n:`SHEETNAMELP`,f:M},65535:{n:``}},L={0:{n:`BOF`},1:{n:`EOF`},2:{n:`PASSWORD`},3:{n:`CALCSET`},4:{n:`WINDOWSET`},5:{n:`SHEETCELLPTR`},6:{n:`SHEETLAYOUT`},7:{n:`COLUMNWIDTH`},8:{n:`HIDDENCOLUMN`},9:{n:`USERRANGE`},10:{n:`SYSTEMRANGE`},11:{n:`ZEROFORCE`},12:{n:`SORTKEYDIR`},13:{n:`FILESEAL`},14:{n:`DATAFILLNUMS`},15:{n:`PRINTMAIN`},16:{n:`PRINTSTRING`},17:{n:`GRAPHMAIN`},18:{n:`GRAPHSTRING`},19:{n:`??`},20:{n:`ERRCELL`},21:{n:`NACELL`},22:{n:`LABEL16`,f:S},23:{n:`NUMBER17`,f:T},24:{n:`NUMBER18`,f:w},25:{n:`FORMULA19`,f:D},26:{n:`FORMULA1A`},27:{n:`XFORMAT`,f:P},28:{n:`DTLABELMISC`},29:{n:`DTLABELCELL`},30:{n:`GRAPHWINDOW`},31:{n:`CPA`},32:{n:`LPLAUTO`},33:{n:`QUERY`},34:{n:`HIDDENSHEET`},35:{n:`??`},37:{n:`NUMBER25`,f:O},38:{n:`??`},39:{n:`NUMBER27`,f:k},40:{n:`FORMULA28`,f:A},142:{n:`??`},147:{n:`??`},150:{n:`??`},151:{n:`??`},152:{n:`??`},153:{n:`??`},154:{n:`??`},155:{n:`??`},156:{n:`??`},163:{n:`??`},174:{n:`??`},175:{n:`??`},176:{n:`??`},177:{n:`??`},184:{n:`??`},185:{n:`??`},186:{n:`??`},187:{n:`??`},188:{n:`??`},195:{n:`??`},201:{n:`??`},204:{n:`SHEETNAMECS`,f:j},205:{n:`??`},206:{n:`??`},207:{n:`??`},208:{n:`??`},256:{n:`??`},259:{n:`??`},260:{n:`??`},261:{n:`??`},262:{n:`??`},263:{n:`??`},265:{n:`??`},266:{n:`??`},267:{n:`??`},268:{n:`??`},270:{n:`??`},271:{n:`??`},384:{n:`??`},389:{n:`??`},390:{n:`??`},393:{n:`??`},396:{n:`??`},512:{n:`??`},514:{n:`??`},513:{n:`??`},516:{n:`??`},517:{n:`??`},640:{n:`??`},641:{n:`??`},642:{n:`??`},643:{n:`??`},644:{n:`??`},645:{n:`??`},646:{n:`??`},647:{n:`??`},648:{n:`??`},658:{n:`??`},659:{n:`??`},660:{n:`??`},661:{n:`??`},662:{n:`??`},665:{n:`??`},666:{n:`??`},768:{n:`??`},772:{n:`??`},1537:{n:`SHEETINFOQP`,f:N},1600:{n:`??`},1602:{n:`??`},1793:{n:`??`},1794:{n:`??`},1795:{n:`??`},1796:{n:`??`},1920:{n:`??`},2048:{n:`??`},2049:{n:`??`},2052:{n:`??`},2688:{n:`??`},10998:{n:`??`},12849:{n:`??`},28233:{n:`??`},28484:{n:`??`},65535:{n:``}};return{sheet_to_wk1:r,book_to_wk3:i,to_workbook:t}})();function El(e){var t={},n=e.match(Jn),r=0,i=!1;if(n)for(;r!=n.length;++r){var a=W(n[r]);switch(a[0].replace(/\w*:/g,``)){case`<condense`:break;case`<extend`:break;case`<shadow`:if(!a.val)break;case`<shadow>`:case`<shadow/>`:t.shadow=1;break;case`</shadow>`:break;case`<charset`:if(a.val==`1`)break;t.cp=ge[parseInt(a.val,10)];break;case`<outline`:if(!a.val)break;case`<outline>`:case`<outline/>`:t.outline=1;break;case`</outline>`:break;case`<rFont`:t.name=a.val;break;case`<sz`:t.sz=a.val;break;case`<strike`:if(!a.val)break;case`<strike>`:case`<strike/>`:t.strike=1;break;case`</strike>`:break;case`<u`:if(!a.val)break;switch(a.val){case`double`:t.uval=`double`;break;case`singleAccounting`:t.uval=`single-accounting`;break;case`doubleAccounting`:t.uval=`double-accounting`;break}case`<u>`:case`<u/>`:t.u=1;break;case`</u>`:break;case`<b`:if(a.val==`0`)break;case`<b>`:case`<b/>`:t.b=1;break;case`</b>`:break;case`<i`:if(a.val==`0`)break;case`<i>`:case`<i/>`:t.i=1;break;case`</i>`:break;case`<color`:a.rgb&&(t.color=a.rgb.slice(2,8));break;case`<color>`:case`<color/>`:case`</color>`:break;case`<family`:t.family=a.val;break;case`<family>`:case`<family/>`:case`</family>`:break;case`<vertAlign`:t.valign=a.val;break;case`<vertAlign>`:case`<vertAlign/>`:case`</vertAlign>`:break;case`<scheme`:break;case`<scheme>`:case`<scheme/>`:case`</scheme>`:break;case`<extLst`:case`<extLst>`:case`</extLst>`:break;case`<ext`:i=!0;break;case`</ext>`:i=!1;break;default:if(a[0].charCodeAt(1)!==47&&!i)throw Error(`Unrecognized rich format `+a[0])}}return t}var Dl=(function(){var e=_r(`t`),t=_r(`rPr`);function n(n){var r=n.match(e);if(!r)return{t:`s`,v:``};var i={t:`s`,v:er(r[1])},a=n.match(t);return a&&(i.s=El(a[1])),i}var r=/<(?:\w+:)?r>/g,i=/<\/(?:\w+:)?r>/;return function(e){return e.replace(r,``).split(i).map(n).filter(function(e){return e.v})}})(),Ol=(function(){var e=/(\r\n|\n)/g;function t(e,t,n){var r=[];e.u&&r.push(`text-decoration: underline;`),e.uval&&r.push(`text-underline-style:`+e.uval+`;`),e.sz&&r.push(`font-size:`+e.sz+`pt;`),e.outline&&r.push(`text-effect: outline;`),e.shadow&&r.push(`text-shadow: auto;`),t.push(`<span style="`+r.join(``)+`">`),e.b&&(t.push(`<b>`),n.push(`</b>`)),e.i&&(t.push(`<i>`),n.push(`</i>`)),e.strike&&(t.push(`<s>`),n.push(`</s>`));var i=e.valign||``;return i==`superscript`||i==`super`?i=`sup`:i==`subscript`&&(i=`sub`),i!=``&&(t.push(`<`+i+`>`),n.push(`</`+i+`>`)),n.push(`</span>`),e}function n(n){var r=[[],n.v,[]];return n.v?(n.s&&t(n.s,r[0],r[2]),r[0].join(``)+r[1].replace(e,`<br/>`)+r[2].join(``)):``}return function(e){return e.map(n).join(``)}})(),kl=/<(?:\w+:)?t[^>]*>([^<]*)<\/(?:\w+:)?t>/g,Al=/<(?:\w+:)?r>/,jl=/<(?:\w+:)?rPh.*?>([\s\S]*?)<\/(?:\w+:)?rPh>/g;function Ml(e,t){var n=t?t.cellHTML:!0,r={};return e?(e.match(/^\s*<(?:\w+:)?t[^>]*>/)?(r.t=er(hr(e.slice(e.indexOf(`>`)+1).split(/<\/(?:\w+:)?t>/)[0]||``)),r.r=hr(e),n&&(r.h=or(r.t))):e.match(Al)&&(r.r=hr(e),r.t=er(hr((e.replace(jl,``).match(kl)||[]).join(``).replace(Jn,``))),n&&(r.h=Ol(Dl(r.r)))),r):{t:``}}var Nl=/<(?:\w+:)?sst([^>]*)>([\s\S]*)<\/(?:\w+:)?sst>/,Pl=/<(?:\w+:)?(?:si|sstItem)>/g,Fl=/<\/(?:\w+:)?(?:si|sstItem)>/;function Il(e,t){var n=[],r=``;if(!e)return n;var i=e.match(Nl);if(i){r=i[2].replace(Pl,``).split(Fl);for(var a=0;a!=r.length;++a){var o=Ml(r[a].trim(),t);o!=null&&(n[n.length]=o)}i=W(i[1]),n.Count=i.count,n.Unique=i.uniqueCount}return n}var Ll=/^\s|\s$|[\t\n\r]/;function Rl(e,t){if(!t.bookSST)return``;var n=[Gn];n[n.length]=G(`sst`,null,{xmlns:jr[0],count:e.Count,uniqueCount:e.Unique});for(var r=0;r!=e.length;++r)if(e[r]!=null){var i=e[r],a=`<si>`;i.r?a+=i.r:(a+=`<t`,i.t||=``,i.t.match(Ll)&&(a+=` xml:space="preserve"`),a+=`>`+rr(i.t)+`</t>`),a+=`</si>`,n[n.length]=a}return n.length>2&&(n[n.length]=`</sst>`,n[1]=n[1].replace(`/>`,`>`)),n.join(``)}function zl(e){return[e.read_shift(4),e.read_shift(4)]}function Bl(e,t){var n=[],r=!1;return _i(e,function(e,i,a){switch(a){case 159:n.Count=e[0],n.Unique=e[1];break;case 19:n.push(e);break;case 160:return!0;case 35:r=!0;break;case 36:r=!1;break;default:if(i.T,!r||t.WTF)throw Error(`Unexpected record 0x`+a.toString(16))}}),n}function Vl(e,t){return t||=K(8),t.write_shift(4,e.Count),t.write_shift(4,e.Unique),t}var Hl=Ji;function Ul(e){var t=vi();q(t,159,Vl(e));for(var n=0;n<e.length;++n)q(t,19,Hl(e[n]));return q(t,160),t.end()}function Wl(e){if(De!==void 0)return De.utils.encode(me,e);for(var t=[],n=e.split(``),r=0;r<n.length;++r)t[r]=n[r].charCodeAt(0);return t}function Gl(e,t){var n={};return n.Major=e.read_shift(2),n.Minor=e.read_shift(2),t>=4&&(e.l+=t-4),n}function Kl(e){var t={};return t.id=e.read_shift(0,`lpp4`),t.R=Gl(e,4),t.U=Gl(e,4),t.W=Gl(e,4),t}function ql(e){for(var t=e.read_shift(4),n=e.l+t-4,r={},i=e.read_shift(4),a=[];i-- >0;)a.push({t:e.read_shift(4),v:e.read_shift(0,`lpp4`)});if(r.name=e.read_shift(0,`lpp4`),r.comps=a,e.l!=n)throw Error(`Bad DataSpaceMapEntry: `+e.l+` != `+n);return r}function Jl(e){var t=[];e.l+=4;for(var n=e.read_shift(4);n-- >0;)t.push(ql(e));return t}function Yl(e){var t=[];e.l+=4;for(var n=e.read_shift(4);n-- >0;)t.push(e.read_shift(0,`lpp4`));return t}function Xl(e){var t={};return e.read_shift(4),e.l+=4,t.id=e.read_shift(0,`lpp4`),t.name=e.read_shift(0,`lpp4`),t.R=Gl(e,4),t.U=Gl(e,4),t.W=Gl(e,4),t}function Zl(e){var t=Xl(e);if(t.ename=e.read_shift(0,`8lpp4`),t.blksz=e.read_shift(4),t.cmode=e.read_shift(4),e.read_shift(4)!=4)throw Error(`Bad !Primary record`);return t}function Ql(e,t){var n=e.l+t,r={};r.Flags=e.read_shift(4)&63,e.l+=4,r.AlgID=e.read_shift(4);var i=!1;switch(r.AlgID){case 26126:case 26127:case 26128:i=r.Flags==36;break;case 26625:i=r.Flags==4;break;case 0:i=r.Flags==16||r.Flags==4||r.Flags==36;break;default:throw`Unrecognized encryption algorithm: `+r.AlgID}if(!i)throw Error(`Encryption Flags/AlgID mismatch`);return r.AlgIDHash=e.read_shift(4),r.KeySize=e.read_shift(4),r.ProviderType=e.read_shift(4),e.l+=8,r.CSPName=e.read_shift(n-e.l>>1,`utf16le`),e.l=n,r}function $l(e,t){var n={},r=e.l+t;return e.l+=4,n.Salt=e.slice(e.l,e.l+16),e.l+=16,n.Verifier=e.slice(e.l,e.l+16),e.l+=16,e.read_shift(4),n.VerifierHash=e.slice(e.l,r),e.l=r,n}function eu(e){var t=Gl(e);switch(t.Minor){case 2:return[t.Minor,tu(e,t)];case 3:return[t.Minor,nu(e,t)];case 4:return[t.Minor,ru(e,t)]}throw Error(`ECMA-376 Encrypted file unrecognized Version: `+t.Minor)}function tu(e){if((e.read_shift(4)&63)!=36)throw Error(`EncryptionInfo mismatch`);return{t:`Std`,h:Ql(e,e.read_shift(4)),v:$l(e,e.length-e.l)}}function nu(){throw Error(`File is password-protected: ECMA-376 Extensible`)}function ru(e){var t=[`saltSize`,`blockSize`,`keyBits`,`hashSize`,`cipherAlgorithm`,`cipherChaining`,`hashAlgorithm`,`saltValue`];e.l+=4;var n=e.read_shift(e.length-e.l,`utf8`),r={};return n.replace(Jn,function(e){var n=W(e);switch(Zn(n[0])){case`<?xml`:break;case`<encryption`:case`</encryption>`:break;case`<keyData`:t.forEach(function(e){r[e]=n[e]});break;case`<dataIntegrity`:r.encryptedHmacKey=n.encryptedHmacKey,r.encryptedHmacValue=n.encryptedHmacValue;break;case`<keyEncryptors>`:case`<keyEncryptors`:r.encs=[];break;case`</keyEncryptors>`:break;case`<keyEncryptor`:r.uri=n.uri;break;case`</keyEncryptor>`:break;case`<encryptedKey`:r.encs.push(n);break;default:throw n[0]}}),r}function iu(e,t){var n={},r=n.EncryptionVersionInfo=Gl(e,4);if(t-=4,r.Minor!=2)throw Error(`unrecognized minor version code: `+r.Minor);if(r.Major>4||r.Major<2)throw Error(`unrecognized major version code: `+r.Major);n.Flags=e.read_shift(4),t-=4;var i=e.read_shift(4);return t-=4,n.EncryptionHeader=Ql(e,i),t-=i,n.EncryptionVerifier=$l(e,t),n}function au(e){var t={},n=t.EncryptionVersionInfo=Gl(e,4);if(n.Major!=1||n.Minor!=1)throw`unrecognized version code `+n.Major+` : `+n.Minor;return t.Salt=e.read_shift(16),t.EncryptedVerifier=e.read_shift(16),t.EncryptedVerifierHash=e.read_shift(16),t}function ou(e){var t=0,n,r=Wl(e),i=r.length+1,a,o,s,c,l;for(n=Fe(i),n[0]=r.length,a=1;a!=i;++a)n[a]=r[a-1];for(a=i-1;a>=0;--a)o=n[a],s=t&16384?1:0,c=t<<1&32767,l=s|c,t=l^o;return t^52811}var su=(function(){var e=[187,255,255,186,255,255,185,128,0,190,15,0,191,15,0],t=[57840,7439,52380,33984,4364,3600,61902,12606,6258,57657,54287,34041,10252,43370,20163],n=[44796,19929,39858,10053,20106,40212,10761,31585,63170,64933,60267,50935,40399,11199,17763,35526,1453,2906,5812,11624,23248,885,1770,3540,7080,14160,28320,56640,55369,41139,20807,41614,21821,43642,17621,28485,56970,44341,19019,38038,14605,29210,60195,50791,40175,10751,21502,43004,24537,18387,36774,3949,7898,15796,31592,63184,47201,24803,49606,37805,14203,28406,56812,17824,35648,1697,3394,6788,13576,27152,43601,17539,35078,557,1114,2228,4456,30388,60776,51953,34243,7079,14158,28316,14128,28256,56512,43425,17251,34502,7597,13105,26210,52420,35241,883,1766,3532,4129,8258,16516,33032,4657,9314,18628],r=function(e){return(e/2|e*128)&255},i=function(e,t){return r(e^t)},a=function(e){for(var r=t[e.length-1],i=104,a=e.length-1;a>=0;--a)for(var o=e[a],s=0;s!=7;++s)o&64&&(r^=n[i]),o*=2,--i;return r};return function(t){for(var n=Wl(t),r=a(n),o=n.length,s=Fe(16),c=0;c!=16;++c)s[c]=0;var l,u,d;for((o&1)==1&&(l=r>>8,s[o]=i(e[0],l),--o,l=r&255,u=n[n.length-1],s[o]=i(u,l));o>0;)--o,l=r>>8,s[o]=i(n[o],l),--o,l=r&255,s[o]=i(n[o],l);for(o=15,d=15-n.length;d>0;)l=r>>8,s[o]=i(e[d],l),--o,--d,l=r&255,s[o]=i(n[o],l),--o,--d;return s}})(),cu=function(e,t,n,r,i){i||=t,r||=su(e);var a,o;for(a=0;a!=t.length;++a)o=t[a],o^=r[n],o=(o>>5|o<<3)&255,i[a]=o,++n;return[i,n,r]},lu=function(e){var t=0,n=su(e);return function(e){var r=cu(``,e,t,n);return t=r[1],r[0]}};function uu(e,t,n,r){var i={key:$o(e),verificationBytes:$o(e)};return n.password&&(i.verifier=ou(n.password)),r.valid=i.verificationBytes===i.verifier,r.valid&&(r.insitu=lu(n.password)),i}function du(e,t,n){var r=n||{};return r.Info=e.read_shift(2),e.l-=2,r.Info===1?r.Data=au(e,t):r.Data=iu(e,t),r}function fu(e,t,n){var r={Type:n.biff>=8?e.read_shift(2):0};return r.Type?du(e,t-2,r):uu(e,n.biff>=8?t:t-2,n,r),r}var pu=(function(){function e(e,n){switch(n.type){case`base64`:return t(Me(e),n);case`binary`:return t(e,n);case`buffer`:return t(Ne&&Buffer.isBuffer(e)?e.toString(`binary`):ze(e),n);case`array`:return t(Tn(e),n)}throw Error(`Unrecognized type `+n.type)}function t(e,t){var n=(t||{}).dense?[]:{},r=e.match(/\\trowd.*?\\row\b/g);if(!r.length)throw Error(`RTF missing table`);var i={s:{c:0,r:0},e:{c:0,r:r.length-1}};return r.forEach(function(e,t){Array.isArray(n)&&(n[t]=[]);for(var r=/\\\w+\b/g,a=0,o,s=-1;o=r.exec(e);){switch(o[0]){case`\\cell`:var c=e.slice(a,r.lastIndex-o[0].length);if(c[0]==` `&&(c=c.slice(1)),++s,c.length){var l={v:c,t:`s`};Array.isArray(n)?n[t][s]=l:n[J({r:t,c:s})]=l}break}a=r.lastIndex}s>i.e.c&&(i.e.c=s)}),n[`!ref`]=Pi(i),n}function n(t,n){return Ri(e(t,n),n)}function r(e){for(var t=[`{\\rtf1\\ansi`],n=Fi(e[`!ref`]),r,i=Array.isArray(e),a=n.s.r;a<=n.e.r;++a){t.push(`\\trowd\\trautofit1`);for(var o=n.s.c;o<=n.e.c;++o)t.push(`\\cellx`+(o+1));for(t.push(`\\pard\\intbl`),o=n.s.c;o<=n.e.c;++o){var s=J({r:a,c:o});r=i?(e[a]||[])[o]:e[s],!(!r||r.v==null&&(!r.f||r.F))&&(t.push(` `+(r.w||(Li(r),r.w))),t.push(`\\cell`))}t.push(`\\pard\\intbl\\row`)}return t.join(``)+`}`}return{to_workbook:n,to_sheet:e,from_sheet:r}})();function mu(e){var t=e.slice(+(e[0]===`#`)).slice(0,6);return[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)]}function hu(e){for(var t=0,n=1;t!=3;++t)n=n*256+(e[t]>255?255:e[t]<0?0:e[t]);return n.toString(16).toUpperCase().slice(1)}function gu(e){var t=e[0]/255,n=e[1]/255,r=e[2]/255,i=Math.max(t,n,r),a=Math.min(t,n,r),o=i-a;if(o===0)return[0,0,t];var s=0,c=0,l=i+a;switch(c=o/(l>1?2-l:l),i){case t:s=((n-r)/o+6)%6;break;case n:s=(r-t)/o+2;break;case r:s=(t-n)/o+4;break}return[s/6,c,l/2]}function _u(e){var t=e[0],n=e[1],r=e[2],i=n*2*(r<.5?r:1-r),a=r-i/2,o=[a,a,a],s=6*t,c;if(n!==0)switch(s|0){case 0:case 6:c=i*s,o[0]+=i,o[1]+=c;break;case 1:c=i*(2-s),o[0]+=c,o[1]+=i;break;case 2:c=i*(s-2),o[1]+=i,o[2]+=c;break;case 3:c=i*(4-s),o[1]+=c,o[2]+=i;break;case 4:c=i*(s-4),o[2]+=i,o[0]+=c;break;case 5:c=i*(6-s),o[2]+=c,o[0]+=i;break}for(var l=0;l!=3;++l)o[l]=Math.round(o[l]*255);return o}function vu(e,t){if(t===0)return e;var n=gu(mu(e));return t<0?n[2]*=1+t:n[2]=1-(1-n[2])*(1-t),hu(_u(n))}var yu=6,bu=15,xu=1,Su=yu;function Cu(e){return Math.floor((e+Math.round(128/Su)/256)*Su)}function wu(e){return Math.floor((e-5)/Su*100+.5)/100}function Tu(e){return Math.round((e*Su+5)/Su*256)/256}function Eu(e){return Tu(wu(Cu(e)))}function Du(e){var t=Math.abs(e-Eu(e)),n=Su;if(t>.005)for(Su=xu;Su<bu;++Su)Math.abs(e-Eu(e))<=t&&(t=Math.abs(e-Eu(e)),n=Su);Su=n}function Ou(e){e.width?(e.wpx=Cu(e.width),e.wch=wu(e.wpx),e.MDW=Su):e.wpx?(e.wch=wu(e.wpx),e.width=Tu(e.wch),e.MDW=Su):typeof e.wch==`number`&&(e.width=Tu(e.wch),e.wpx=Cu(e.width),e.MDW=Su),e.customWidth&&delete e.customWidth}var ku=96;function Au(e){return e*96/ku}function ju(e){return e*ku/96}var Mu={None:`none`,Solid:`solid`,Gray50:`mediumGray`,Gray75:`darkGray`,Gray25:`lightGray`,HorzStripe:`darkHorizontal`,VertStripe:`darkVertical`,ReverseDiagStripe:`darkDown`,DiagStripe:`darkUp`,DiagCross:`darkGrid`,ThickDiagCross:`darkTrellis`,ThinHorzStripe:`lightHorizontal`,ThinVertStripe:`lightVertical`,ThinReverseDiagStripe:`lightDown`,ThinHorzCross:`lightGrid`};function Nu(e,t,n,r){t.Borders=[];var i={},a=!1;(e[0].match(Jn)||[]).forEach(function(e){var n=W(e);switch(Zn(n[0])){case`<borders`:case`<borders>`:case`</borders>`:break;case`<border`:case`<border>`:case`<border/>`:i={},n.diagonalUp&&(i.diagonalUp=ur(n.diagonalUp)),n.diagonalDown&&(i.diagonalDown=ur(n.diagonalDown)),t.Borders.push(i);break;case`</border>`:break;case`<left/>`:break;case`<left`:case`<left>`:break;case`</left>`:break;case`<right/>`:break;case`<right`:case`<right>`:break;case`</right>`:break;case`<top/>`:break;case`<top`:case`<top>`:break;case`</top>`:break;case`<bottom/>`:break;case`<bottom`:case`<bottom>`:break;case`</bottom>`:break;case`<diagonal`:case`<diagonal>`:case`<diagonal/>`:break;case`</diagonal>`:break;case`<horizontal`:case`<horizontal>`:case`<horizontal/>`:break;case`</horizontal>`:break;case`<vertical`:case`<vertical>`:case`<vertical/>`:break;case`</vertical>`:break;case`<start`:case`<start>`:case`<start/>`:break;case`</start>`:break;case`<end`:case`<end>`:case`<end/>`:break;case`</end>`:break;case`<color`:case`<color>`:break;case`<color/>`:case`</color>`:break;case`<extLst`:case`<extLst>`:case`</extLst>`:break;case`<ext`:a=!0;break;case`</ext>`:a=!1;break;default:if(r&&r.WTF&&!a)throw Error(`unrecognized `+n[0]+` in borders`)}})}function Pu(e,t,n,r){t.Fills=[];var i={},a=!1;(e[0].match(Jn)||[]).forEach(function(e){var n=W(e);switch(Zn(n[0])){case`<fills`:case`<fills>`:case`</fills>`:break;case`<fill>`:case`<fill`:case`<fill/>`:i={},t.Fills.push(i);break;case`</fill>`:break;case`<gradientFill>`:break;case`<gradientFill`:case`</gradientFill>`:t.Fills.push(i),i={};break;case`<patternFill`:case`<patternFill>`:n.patternType&&(i.patternType=n.patternType);break;case`<patternFill/>`:case`</patternFill>`:break;case`<bgColor`:i.bgColor||={},n.indexed&&(i.bgColor.indexed=parseInt(n.indexed,10)),n.theme&&(i.bgColor.theme=parseInt(n.theme,10)),n.tint&&(i.bgColor.tint=parseFloat(n.tint)),n.rgb&&(i.bgColor.rgb=n.rgb.slice(-6));break;case`<bgColor/>`:case`</bgColor>`:break;case`<fgColor`:i.fgColor||={},n.theme&&(i.fgColor.theme=parseInt(n.theme,10)),n.tint&&(i.fgColor.tint=parseFloat(n.tint)),n.rgb!=null&&(i.fgColor.rgb=n.rgb.slice(-6));break;case`<fgColor/>`:case`</fgColor>`:break;case`<stop`:case`<stop/>`:break;case`</stop>`:break;case`<color`:case`<color/>`:break;case`</color>`:break;case`<extLst`:case`<extLst>`:case`</extLst>`:break;case`<ext`:a=!0;break;case`</ext>`:a=!1;break;default:if(r&&r.WTF&&!a)throw Error(`unrecognized `+n[0]+` in fills`)}})}function Fu(e,t,n,r){t.Fonts=[];var i={},a=!1;(e[0].match(Jn)||[]).forEach(function(e){var o=W(e);switch(Zn(o[0])){case`<fonts`:case`<fonts>`:case`</fonts>`:break;case`<font`:case`<font>`:break;case`</font>`:case`<font/>`:t.Fonts.push(i),i={};break;case`<name`:o.val&&(i.name=hr(o.val));break;case`<name/>`:case`</name>`:break;case`<b`:i.bold=o.val?ur(o.val):1;break;case`<b/>`:i.bold=1;break;case`<i`:i.italic=o.val?ur(o.val):1;break;case`<i/>`:i.italic=1;break;case`<u`:switch(o.val){case`none`:i.underline=0;break;case`single`:i.underline=1;break;case`double`:i.underline=2;break;case`singleAccounting`:i.underline=33;break;case`doubleAccounting`:i.underline=34;break}break;case`<u/>`:i.underline=1;break;case`<strike`:i.strike=o.val?ur(o.val):1;break;case`<strike/>`:i.strike=1;break;case`<outline`:i.outline=o.val?ur(o.val):1;break;case`<outline/>`:i.outline=1;break;case`<shadow`:i.shadow=o.val?ur(o.val):1;break;case`<shadow/>`:i.shadow=1;break;case`<condense`:i.condense=o.val?ur(o.val):1;break;case`<condense/>`:i.condense=1;break;case`<extend`:i.extend=o.val?ur(o.val):1;break;case`<extend/>`:i.extend=1;break;case`<sz`:o.val&&(i.sz=+o.val);break;case`<sz/>`:case`</sz>`:break;case`<vertAlign`:o.val&&(i.vertAlign=o.val);break;case`<vertAlign/>`:case`</vertAlign>`:break;case`<family`:o.val&&(i.family=parseInt(o.val,10));break;case`<family/>`:case`</family>`:break;case`<scheme`:o.val&&(i.scheme=o.val);break;case`<scheme/>`:case`</scheme>`:break;case`<charset`:if(o.val==`1`)break;o.codepage=ge[parseInt(o.val,10)];break;case`<color`:if(i.color||={},o.auto&&(i.color.auto=ur(o.auto)),o.rgb)i.color.rgb=o.rgb.slice(-6);else if(o.indexed){i.color.index=parseInt(o.indexed,10);var s=Va[i.color.index];i.color.index==81&&(s=Va[1]),s||=Va[1],i.color.rgb=s[0].toString(16)+s[1].toString(16)+s[2].toString(16)}else o.theme&&(i.color.theme=parseInt(o.theme,10),o.tint&&(i.color.tint=parseFloat(o.tint)),o.theme&&n.themeElements&&n.themeElements.clrScheme&&(i.color.rgb=vu(n.themeElements.clrScheme[i.color.theme].rgb,i.color.tint||0)));break;case`<color/>`:case`</color>`:break;case`<AlternateContent`:a=!0;break;case`</AlternateContent>`:a=!1;break;case`<extLst`:case`<extLst>`:case`</extLst>`:break;case`<ext`:a=!0;break;case`</ext>`:a=!1;break;default:if(r&&r.WTF&&!a)throw Error(`unrecognized `+o[0]+` in fonts`)}})}function Iu(e,t,n){t.NumberFmt=[];for(var r=ln(H),i=0;i<r.length;++i)t.NumberFmt[r[i]]=H[r[i]];var a=e[0].match(Jn);if(a)for(i=0;i<a.length;++i){var o=W(a[i]);switch(Zn(o[0])){case`<numFmts`:case`</numFmts>`:case`<numFmts/>`:case`<numFmts>`:break;case`<numFmt`:var s=er(hr(o.formatCode)),c=parseInt(o.numFmtId,10);if(t.NumberFmt[c]=s,c>0){if(c>392){for(c=392;c>60&&t.NumberFmt[c]!=null;--c);t.NumberFmt[c]=s}Xt(s,c)}break;case`</numFmt>`:break;default:if(n.WTF)throw Error(`unrecognized `+o[0]+` in numFmts`)}}}function Lu(e){var t=[`<numFmts>`];return[[5,8],[23,26],[41,44],[50,392]].forEach(function(n){for(var r=n[0];r<=n[1];++r)e[r]!=null&&(t[t.length]=G(`numFmt`,null,{numFmtId:r,formatCode:rr(e[r])}))}),t.length===1?``:(t[t.length]=`</numFmts>`,t[0]=G(`numFmts`,null,{count:t.length-2}).replace(`/>`,`>`),t.join(``))}var Ru=[`numFmtId`,`fillId`,`fontId`,`borderId`,`xfId`],zu=[`applyAlignment`,`applyBorder`,`applyFill`,`applyFont`,`applyNumberFormat`,`applyProtection`,`pivotButton`,`quotePrefix`];function Bu(e,t,n){t.CellXf=[];var r,i=!1;(e[0].match(Jn)||[]).forEach(function(e){var a=W(e),o=0;switch(Zn(a[0])){case`<cellXfs`:case`<cellXfs>`:case`<cellXfs/>`:case`</cellXfs>`:break;case`<xf`:case`<xf/>`:for(r=a,delete r[0],o=0;o<Ru.length;++o)r[Ru[o]]&&(r[Ru[o]]=parseInt(r[Ru[o]],10));for(o=0;o<zu.length;++o)r[zu[o]]&&(r[zu[o]]=ur(r[zu[o]]));if(t.NumberFmt&&r.numFmtId>392){for(o=392;o>60;--o)if(t.NumberFmt[r.numFmtId]==t.NumberFmt[o]){r.numFmtId=o;break}}t.CellXf.push(r);break;case`</xf>`:break;case`<alignment`:case`<alignment/>`:var s={};a.vertical&&(s.vertical=a.vertical),a.horizontal&&(s.horizontal=a.horizontal),a.textRotation!=null&&(s.textRotation=a.textRotation),a.indent&&(s.indent=a.indent),a.wrapText&&(s.wrapText=ur(a.wrapText)),r.alignment=s;break;case`</alignment>`:break;case`<protection`:break;case`</protection>`:case`<protection/>`:break;case`<AlternateContent`:i=!0;break;case`</AlternateContent>`:i=!1;break;case`<extLst`:case`<extLst>`:case`</extLst>`:break;case`<ext`:i=!0;break;case`</ext>`:i=!1;break;default:if(n&&n.WTF&&!i)throw Error(`unrecognized `+a[0]+` in cellXfs`)}})}function Vu(e){var t=[];return t[t.length]=G(`cellXfs`,null),e.forEach(function(e){t[t.length]=G(`xf`,null,e)}),t[t.length]=`</cellXfs>`,t.length===2?``:(t[0]=G(`cellXfs`,null,{count:t.length-2}).replace(`/>`,`>`),t.join(``))}var Hu=(function(){var e=/<(?:\w+:)?numFmts([^>]*)>[\S\s]*?<\/(?:\w+:)?numFmts>/,t=/<(?:\w+:)?cellXfs([^>]*)>[\S\s]*?<\/(?:\w+:)?cellXfs>/,n=/<(?:\w+:)?fills([^>]*)>[\S\s]*?<\/(?:\w+:)?fills>/,r=/<(?:\w+:)?fonts([^>]*)>[\S\s]*?<\/(?:\w+:)?fonts>/,i=/<(?:\w+:)?borders([^>]*)>[\S\s]*?<\/(?:\w+:)?borders>/;return function(a,o,s){var c={};if(!a)return c;a=a.replace(/<!--([\s\S]*?)-->/gm,``).replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm,``);var l;return(l=a.match(e))&&Iu(l,c,s),(l=a.match(r))&&Fu(l,c,o,s),(l=a.match(n))&&Pu(l,c,o,s),(l=a.match(i))&&Nu(l,c,o,s),(l=a.match(t))&&Bu(l,c,s),c}})();function Uu(e,t){var n=[Gn,G(`styleSheet`,null,{xmlns:jr[0],"xmlns:vt":Ar.vt})],r;return e.SSF&&(r=Lu(e.SSF))!=null&&(n[n.length]=r),n[n.length]=`<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>`,n[n.length]=`<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>`,n[n.length]=`<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>`,n[n.length]=`<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>`,(r=Vu(t.cellXfs))&&(n[n.length]=r),n[n.length]=`<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>`,n[n.length]=`<dxfs count="0"/>`,n[n.length]=`<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>`,n.length>2&&(n[n.length]=`</styleSheet>`,n[1]=n[1].replace(`/>`,`>`)),n.join(``)}function Wu(e,t){return[e.read_shift(2),Ui(e,t-2)]}function Gu(e,t,n){n||=K(6+4*t.length),n.write_shift(2,e),Wi(t,n);var r=n.length>n.l?n.slice(0,n.l):n;return n.l??=n.length,r}function Ku(e,t,n){var r={};r.sz=e.read_shift(2)/20;var i=va(e,2,n);switch(i.fItalic&&(r.italic=1),i.fCondense&&(r.condense=1),i.fExtend&&(r.extend=1),i.fShadow&&(r.shadow=1),i.fOutline&&(r.outline=1),i.fStrikeout&&(r.strike=1),e.read_shift(2)===700&&(r.bold=1),e.read_shift(2)){case 1:r.vertAlign=`superscript`;break;case 2:r.vertAlign=`subscript`;break}var a=e.read_shift(1);a!=0&&(r.underline=a);var o=e.read_shift(1);o>0&&(r.family=o);var s=e.read_shift(1);switch(s>0&&(r.charset=s),e.l++,r.color=ga(e,8),e.read_shift(1)){case 1:r.scheme=`major`;break;case 2:r.scheme=`minor`;break}return r.name=Ui(e,t-21),r}function qu(e,t){t||=K(153),t.write_shift(2,e.sz*20),ya(e,t),t.write_shift(2,e.bold?700:400);var n=0;e.vertAlign==`superscript`?n=1:e.vertAlign==`subscript`&&(n=2),t.write_shift(2,n),t.write_shift(1,e.underline||0),t.write_shift(1,e.family||0),t.write_shift(1,e.charset||0),t.write_shift(1,0),_a(e.color,t);var r=0;return e.scheme==`major`&&(r=1),e.scheme==`minor`&&(r=2),t.write_shift(1,r),Wi(e.name,t),t.length>t.l?t.slice(0,t.l):t}var Ju=[`none`,`solid`,`mediumGray`,`darkGray`,`lightGray`,`darkHorizontal`,`darkVertical`,`darkDown`,`darkUp`,`darkGrid`,`darkTrellis`,`lightHorizontal`,`lightVertical`,`lightDown`,`lightUp`,`lightGrid`,`lightTrellis`,`gray125`,`gray0625`],Yu,Xu=gi;function Zu(e,t){t||=K(84),Yu||=dn(Ju);var n=Yu[e.patternType];n??=40,t.write_shift(4,n);var r=0;if(n!=40)for(_a({auto:1},t),_a({auto:1},t);r<12;++r)t.write_shift(4,0);else{for(;r<4;++r)t.write_shift(4,0);for(;r<12;++r)t.write_shift(4,0)}return t.length>t.l?t.slice(0,t.l):t}function Qu(e,t){var n=e.l+t,r=e.read_shift(2),i=e.read_shift(2);return e.l=n,{ixfe:r,numFmtId:i}}function $u(e,t,n){return n||=K(16),n.write_shift(2,t||0),n.write_shift(2,e.numFmtId||0),n.write_shift(2,0),n.write_shift(2,0),n.write_shift(2,0),n.write_shift(1,0),n.write_shift(1,0),n.write_shift(1,0),n.write_shift(1,0),n.write_shift(1,0),n.write_shift(1,0),n}function ed(e,t){return t||=K(10),t.write_shift(1,0),t.write_shift(1,0),t.write_shift(4,0),t.write_shift(4,0),t}var td=gi;function nd(e,t){return t||=K(51),t.write_shift(1,0),ed(null,t),ed(null,t),ed(null,t),ed(null,t),ed(null,t),t.length>t.l?t.slice(0,t.l):t}function rd(e,t){return t||=K(52),t.write_shift(4,e.xfId),t.write_shift(2,1),t.write_shift(1,+e.builtinId),t.write_shift(1,0),ia(e.name||``,t),t.length>t.l?t.slice(0,t.l):t}function id(e,t,n){var r=K(2052);return r.write_shift(4,e),ia(t,r),ia(n,r),r.length>r.l?r.slice(0,r.l):r}function ad(e,t,n){var r={};for(var i in r.NumberFmt=[],H)r.NumberFmt[i]=H[i];r.CellXf=[],r.Fonts=[];var a=[],o=!1;return _i(e,function(e,i,s){switch(s){case 44:r.NumberFmt[e[0]]=e[1],Xt(e[1],e[0]);break;case 43:r.Fonts.push(e),e.color.theme!=null&&t&&t.themeElements&&t.themeElements.clrScheme&&(e.color.rgb=vu(t.themeElements.clrScheme[e.color.theme].rgb,e.color.tint||0));break;case 1025:break;case 45:break;case 46:break;case 47:a[a.length-1]==617&&r.CellXf.push(e);break;case 48:case 507:case 572:case 475:break;case 1171:case 2102:case 1130:case 512:case 2095:case 3072:break;case 35:o=!0;break;case 36:o=!1;break;case 37:a.push(s),o=!0;break;case 38:a.pop(),o=!1;break;default:if(i.T>0)a.push(s);else if(i.T<0)a.pop();else if(!o||n.WTF&&a[a.length-1]!=37)throw Error(`Unexpected record 0x`+s.toString(16))}}),r}function od(e,t){if(t){var n=0;[[5,8],[23,26],[41,44],[50,392]].forEach(function(e){for(var r=e[0];r<=e[1];++r)t[r]!=null&&++n}),n!=0&&(q(e,615,Hi(n)),[[5,8],[23,26],[41,44],[50,392]].forEach(function(n){for(var r=n[0];r<=n[1];++r)t[r]!=null&&q(e,44,Gu(r,t[r]))}),q(e,616))}}function sd(e){var t=1;t!=0&&(q(e,611,Hi(t)),q(e,43,qu({sz:12,color:{theme:1},name:`Calibri`,family:2,scheme:`minor`})),q(e,612))}function cd(e){var t=2;t!=0&&(q(e,603,Hi(t)),q(e,45,Zu({patternType:`none`})),q(e,45,Zu({patternType:`gray125`})),q(e,604))}function ld(e){var t=1;t!=0&&(q(e,613,Hi(t)),q(e,46,nd({})),q(e,614))}function ud(e){q(e,626,Hi(1)),q(e,47,$u({numFmtId:0,fontId:0,fillId:0,borderId:0},65535)),q(e,627)}function dd(e,t){q(e,617,Hi(t.length)),t.forEach(function(t){q(e,47,$u(t,0))}),q(e,618)}function fd(e){q(e,619,Hi(1)),q(e,48,rd({xfId:0,builtinId:0,name:`Normal`})),q(e,620)}function pd(e){q(e,505,Hi(0)),q(e,506)}function md(e){q(e,508,id(0,`TableStyleMedium9`,`PivotStyleMedium4`)),q(e,509)}function hd(e,t){var n=vi();return q(n,278),od(n,e.SSF),sd(n,e),cd(n,e),ld(n,e),ud(n,e),dd(n,t.cellXfs),fd(n,e),pd(n,e),md(n,e),q(n,279),n.end()}var gd=[`</a:lt1>`,`</a:dk1>`,`</a:lt2>`,`</a:dk2>`,`</a:accent1>`,`</a:accent2>`,`</a:accent3>`,`</a:accent4>`,`</a:accent5>`,`</a:accent6>`,`</a:hlink>`,`</a:folHlink>`];function _d(e,t,n){t.themeElements.clrScheme=[];var r={};(e[0].match(Jn)||[]).forEach(function(e){var i=W(e);switch(i[0]){case`<a:clrScheme`:case`</a:clrScheme>`:break;case`<a:srgbClr`:r.rgb=i.val;break;case`<a:sysClr`:r.rgb=i.lastClr;break;case`<a:dk1>`:case`</a:dk1>`:case`<a:lt1>`:case`</a:lt1>`:case`<a:dk2>`:case`</a:dk2>`:case`<a:lt2>`:case`</a:lt2>`:case`<a:accent1>`:case`</a:accent1>`:case`<a:accent2>`:case`</a:accent2>`:case`<a:accent3>`:case`</a:accent3>`:case`<a:accent4>`:case`</a:accent4>`:case`<a:accent5>`:case`</a:accent5>`:case`<a:accent6>`:case`</a:accent6>`:case`<a:hlink>`:case`</a:hlink>`:case`<a:folHlink>`:case`</a:folHlink>`:i[0].charAt(1)===`/`?(t.themeElements.clrScheme[gd.indexOf(i[0])]=r,r={}):r.name=i[0].slice(3,i[0].length-1);break;default:if(n&&n.WTF)throw Error(`Unrecognized `+i[0]+` in clrScheme`)}})}function vd(){}function yd(){}var bd=/<a:clrScheme([^>]*)>[\s\S]*<\/a:clrScheme>/,xd=/<a:fontScheme([^>]*)>[\s\S]*<\/a:fontScheme>/,Sd=/<a:fmtScheme([^>]*)>[\s\S]*<\/a:fmtScheme>/;function Cd(e,t,n){t.themeElements={};var r;[[`clrScheme`,bd,_d],[`fontScheme`,xd,vd],[`fmtScheme`,Sd,yd]].forEach(function(i){if(!(r=e.match(i[1])))throw Error(i[0]+` not found in themeElements`);i[2](r,t,n)})}var wd=/<a:themeElements([^>]*)>[\s\S]*<\/a:themeElements>/;function Td(e,t){(!e||e.length===0)&&(e=Ed());var n,r={};if(!(n=e.match(wd)))throw Error(`themeElements not found in theme`);return Cd(n[0],r,t),r.raw=e,r}function Ed(e,t){if(t&&t.themeXLSX)return t.themeXLSX;if(e&&typeof e.raw==`string`)return e.raw;var n=[Gn];return n[n.length]=`<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">`,n[n.length]=`<a:themeElements>`,n[n.length]=`<a:clrScheme name="Office">`,n[n.length]=`<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>`,n[n.length]=`<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>`,n[n.length]=`<a:dk2><a:srgbClr val="1F497D"/></a:dk2>`,n[n.length]=`<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>`,n[n.length]=`<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>`,n[n.length]=`<a:accent2><a:srgbClr val="C0504D"/></a:accent2>`,n[n.length]=`<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>`,n[n.length]=`<a:accent4><a:srgbClr val="8064A2"/></a:accent4>`,n[n.length]=`<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>`,n[n.length]=`<a:accent6><a:srgbClr val="F79646"/></a:accent6>`,n[n.length]=`<a:hlink><a:srgbClr val="0000FF"/></a:hlink>`,n[n.length]=`<a:folHlink><a:srgbClr val="800080"/></a:folHlink>`,n[n.length]=`</a:clrScheme>`,n[n.length]=`<a:fontScheme name="Office">`,n[n.length]=`<a:majorFont>`,n[n.length]=`<a:latin typeface="Cambria"/>`,n[n.length]=`<a:ea typeface=""/>`,n[n.length]=`<a:cs typeface=""/>`,n[n.length]=`<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>`,n[n.length]=`<a:font script="Hang" typeface="맑은 고딕"/>`,n[n.length]=`<a:font script="Hans" typeface="宋体"/>`,n[n.length]=`<a:font script="Hant" typeface="新細明體"/>`,n[n.length]=`<a:font script="Arab" typeface="Times New Roman"/>`,n[n.length]=`<a:font script="Hebr" typeface="Times New Roman"/>`,n[n.length]=`<a:font script="Thai" typeface="Tahoma"/>`,n[n.length]=`<a:font script="Ethi" typeface="Nyala"/>`,n[n.length]=`<a:font script="Beng" typeface="Vrinda"/>`,n[n.length]=`<a:font script="Gujr" typeface="Shruti"/>`,n[n.length]=`<a:font script="Khmr" typeface="MoolBoran"/>`,n[n.length]=`<a:font script="Knda" typeface="Tunga"/>`,n[n.length]=`<a:font script="Guru" typeface="Raavi"/>`,n[n.length]=`<a:font script="Cans" typeface="Euphemia"/>`,n[n.length]=`<a:font script="Cher" typeface="Plantagenet Cherokee"/>`,n[n.length]=`<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>`,n[n.length]=`<a:font script="Tibt" typeface="Microsoft Himalaya"/>`,n[n.length]=`<a:font script="Thaa" typeface="MV Boli"/>`,n[n.length]=`<a:font script="Deva" typeface="Mangal"/>`,n[n.length]=`<a:font script="Telu" typeface="Gautami"/>`,n[n.length]=`<a:font script="Taml" typeface="Latha"/>`,n[n.length]=`<a:font script="Syrc" typeface="Estrangelo Edessa"/>`,n[n.length]=`<a:font script="Orya" typeface="Kalinga"/>`,n[n.length]=`<a:font script="Mlym" typeface="Kartika"/>`,n[n.length]=`<a:font script="Laoo" typeface="DokChampa"/>`,n[n.length]=`<a:font script="Sinh" typeface="Iskoola Pota"/>`,n[n.length]=`<a:font script="Mong" typeface="Mongolian Baiti"/>`,n[n.length]=`<a:font script="Viet" typeface="Times New Roman"/>`,n[n.length]=`<a:font script="Uigh" typeface="Microsoft Uighur"/>`,n[n.length]=`<a:font script="Geor" typeface="Sylfaen"/>`,n[n.length]=`</a:majorFont>`,n[n.length]=`<a:minorFont>`,n[n.length]=`<a:latin typeface="Calibri"/>`,n[n.length]=`<a:ea typeface=""/>`,n[n.length]=`<a:cs typeface=""/>`,n[n.length]=`<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>`,n[n.length]=`<a:font script="Hang" typeface="맑은 고딕"/>`,n[n.length]=`<a:font script="Hans" typeface="宋体"/>`,n[n.length]=`<a:font script="Hant" typeface="新細明體"/>`,n[n.length]=`<a:font script="Arab" typeface="Arial"/>`,n[n.length]=`<a:font script="Hebr" typeface="Arial"/>`,n[n.length]=`<a:font script="Thai" typeface="Tahoma"/>`,n[n.length]=`<a:font script="Ethi" typeface="Nyala"/>`,n[n.length]=`<a:font script="Beng" typeface="Vrinda"/>`,n[n.length]=`<a:font script="Gujr" typeface="Shruti"/>`,n[n.length]=`<a:font script="Khmr" typeface="DaunPenh"/>`,n[n.length]=`<a:font script="Knda" typeface="Tunga"/>`,n[n.length]=`<a:font script="Guru" typeface="Raavi"/>`,n[n.length]=`<a:font script="Cans" typeface="Euphemia"/>`,n[n.length]=`<a:font script="Cher" typeface="Plantagenet Cherokee"/>`,n[n.length]=`<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>`,n[n.length]=`<a:font script="Tibt" typeface="Microsoft Himalaya"/>`,n[n.length]=`<a:font script="Thaa" typeface="MV Boli"/>`,n[n.length]=`<a:font script="Deva" typeface="Mangal"/>`,n[n.length]=`<a:font script="Telu" typeface="Gautami"/>`,n[n.length]=`<a:font script="Taml" typeface="Latha"/>`,n[n.length]=`<a:font script="Syrc" typeface="Estrangelo Edessa"/>`,n[n.length]=`<a:font script="Orya" typeface="Kalinga"/>`,n[n.length]=`<a:font script="Mlym" typeface="Kartika"/>`,n[n.length]=`<a:font script="Laoo" typeface="DokChampa"/>`,n[n.length]=`<a:font script="Sinh" typeface="Iskoola Pota"/>`,n[n.length]=`<a:font script="Mong" typeface="Mongolian Baiti"/>`,n[n.length]=`<a:font script="Viet" typeface="Arial"/>`,n[n.length]=`<a:font script="Uigh" typeface="Microsoft Uighur"/>`,n[n.length]=`<a:font script="Geor" typeface="Sylfaen"/>`,n[n.length]=`</a:minorFont>`,n[n.length]=`</a:fontScheme>`,n[n.length]=`<a:fmtScheme name="Office">`,n[n.length]=`<a:fillStyleLst>`,n[n.length]=`<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>`,n[n.length]=`<a:gradFill rotWithShape="1">`,n[n.length]=`<a:gsLst>`,n[n.length]=`<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>`,n[n.length]=`<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>`,n[n.length]=`<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>`,n[n.length]=`</a:gsLst>`,n[n.length]=`<a:lin ang="16200000" scaled="1"/>`,n[n.length]=`</a:gradFill>`,n[n.length]=`<a:gradFill rotWithShape="1">`,n[n.length]=`<a:gsLst>`,n[n.length]=`<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>`,n[n.length]=`<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>`,n[n.length]=`</a:gsLst>`,n[n.length]=`<a:lin ang="16200000" scaled="0"/>`,n[n.length]=`</a:gradFill>`,n[n.length]=`</a:fillStyleLst>`,n[n.length]=`<a:lnStyleLst>`,n[n.length]=`<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>`,n[n.length]=`<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>`,n[n.length]=`<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>`,n[n.length]=`</a:lnStyleLst>`,n[n.length]=`<a:effectStyleLst>`,n[n.length]=`<a:effectStyle>`,n[n.length]=`<a:effectLst>`,n[n.length]=`<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>`,n[n.length]=`</a:effectLst>`,n[n.length]=`</a:effectStyle>`,n[n.length]=`<a:effectStyle>`,n[n.length]=`<a:effectLst>`,n[n.length]=`<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>`,n[n.length]=`</a:effectLst>`,n[n.length]=`</a:effectStyle>`,n[n.length]=`<a:effectStyle>`,n[n.length]=`<a:effectLst>`,n[n.length]=`<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>`,n[n.length]=`</a:effectLst>`,n[n.length]=`<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>`,n[n.length]=`<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>`,n[n.length]=`</a:effectStyle>`,n[n.length]=`</a:effectStyleLst>`,n[n.length]=`<a:bgFillStyleLst>`,n[n.length]=`<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>`,n[n.length]=`<a:gradFill rotWithShape="1">`,n[n.length]=`<a:gsLst>`,n[n.length]=`<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>`,n[n.length]=`<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>`,n[n.length]=`<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>`,n[n.length]=`</a:gsLst>`,n[n.length]=`<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>`,n[n.length]=`</a:gradFill>`,n[n.length]=`<a:gradFill rotWithShape="1">`,n[n.length]=`<a:gsLst>`,n[n.length]=`<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>`,n[n.length]=`<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>`,n[n.length]=`</a:gsLst>`,n[n.length]=`<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>`,n[n.length]=`</a:gradFill>`,n[n.length]=`</a:bgFillStyleLst>`,n[n.length]=`</a:fmtScheme>`,n[n.length]=`</a:themeElements>`,n[n.length]=`<a:objectDefaults>`,n[n.length]=`<a:spDef>`,n[n.length]=`<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>`,n[n.length]=`</a:spDef>`,n[n.length]=`<a:lnDef>`,n[n.length]=`<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>`,n[n.length]=`</a:lnDef>`,n[n.length]=`</a:objectDefaults>`,n[n.length]=`<a:extraClrSchemeLst/>`,n[n.length]=`</a:theme>`,n.join(``)}function Dd(e,t,n){var r=e.l+t;if(e.read_shift(4)!==124226){if(!n.cellStyles){e.l=r;return}var i=e.slice(e.l);e.l=r;var a;try{a=Un(i,{type:`array`})}catch{return}var o=Rn(a,`theme/theme/theme1.xml`,!0);if(o)return Td(o,n)}}function Od(e){return e.read_shift(4)}function kd(e){var t={};switch(t.xclrType=e.read_shift(2),t.nTintShade=e.read_shift(2),t.xclrType){case 0:e.l+=4;break;case 1:t.xclrValue=Ad(e,4);break;case 2:t.xclrValue=ys(e,4);break;case 3:t.xclrValue=Od(e,4);break;case 4:e.l+=4;break}return e.l+=8,t}function Ad(e,t){return gi(e,t)}function jd(e,t){return gi(e,t)}function Md(e){var t=e.read_shift(2),n=e.read_shift(2)-4,r=[t];switch(t){case 4:case 5:case 7:case 8:case 9:case 10:case 11:case 13:r[1]=kd(e,n);break;case 6:r[1]=jd(e,n);break;case 14:case 15:r[1]=e.read_shift(n===1?1:2);break;default:throw Error(`Unrecognized ExtProp type: `+t+` `+n)}return r}function Nd(e,t){var n=e.l+t;e.l+=2;var r=e.read_shift(2);e.l+=2;for(var i=e.read_shift(2),a=[];i-- >0;)a.push(Md(e,n-e.l));return{ixfe:r,ext:a}}function Pd(e,t){t.forEach(function(e){switch(e[0]){case 4:break;case 5:break;case 6:break;case 7:break;case 8:break;case 9:break;case 10:break;case 11:break;case 13:break;case 14:break;case 15:break}})}function Fd(e,t){return{flags:e.read_shift(4),version:e.read_shift(4),name:Ui(e,t-8)}}function Id(e){var t=K(12+2*e.name.length);return t.write_shift(4,e.flags),t.write_shift(4,e.version),Wi(e.name,t),t.slice(0,t.l)}function Ld(e){for(var t=[],n=e.read_shift(4);n-- >0;)t.push([e.read_shift(4),e.read_shift(4)]);return t}function Rd(e){var t=K(4+8*e.length);t.write_shift(4,e.length);for(var n=0;n<e.length;++n)t.write_shift(4,e[n][0]),t.write_shift(4,e[n][1]);return t}function zd(e,t){var n=K(8+2*t.length);return n.write_shift(4,e),Wi(t,n),n.slice(0,n.l)}function Bd(e){return e.l+=4,e.read_shift(4)!=0}function Vd(e,t){var n=K(8);return n.write_shift(4,e),n.write_shift(4,+!!t),n}function Hd(e,t,n){var r={Types:[],Cell:[],Value:[]},i=n||{},a=[],o=!1,s=2;return _i(e,function(e,t,n){switch(n){case 335:r.Types.push({name:e.name});break;case 51:e.forEach(function(e){s==1?r.Cell.push({type:r.Types[e[0]-1].name,index:e[1]}):s==0&&r.Value.push({type:r.Types[e[0]-1].name,index:e[1]})});break;case 337:s=+!!e;break;case 338:s=2;break;case 35:a.push(n),o=!0;break;case 36:a.pop(),o=!1;break;default:if(!t.T&&(!o||i.WTF&&a[a.length-1]!=35))throw Error(`Unexpected record 0x`+n.toString(16))}}),r}function Ud(){var e=vi();return q(e,332),q(e,334,Hi(1)),q(e,335,Id({name:`XLDAPR`,version:12e4,flags:3496657072})),q(e,336),q(e,339,zd(1,`XLDAPR`)),q(e,52),q(e,35,Hi(514)),q(e,4096,Hi(0)),q(e,4097,es(1)),q(e,36),q(e,53),q(e,340),q(e,337,Vd(1,!0)),q(e,51,Rd([[1,0]])),q(e,338),q(e,333),e.end()}function Wd(e,t,n){var r={Types:[],Cell:[],Value:[]};if(!e)return r;var i=!1,a=2,o;return e.replace(Jn,function(e){var t=W(e);switch(Zn(t[0])){case`<?xml`:break;case`<metadata`:case`</metadata>`:break;case`<metadataTypes`:case`</metadataTypes>`:break;case`<metadataType`:r.Types.push({name:t.name});break;case`</metadataType>`:break;case`<futureMetadata`:for(var s=0;s<r.Types.length;++s)r.Types[s].name==t.name&&(o=r.Types[s]);break;case`</futureMetadata>`:break;case`<bk>`:break;case`</bk>`:break;case`<rc`:a==1?r.Cell.push({type:r.Types[t.t-1].name,index:+t.v}):a==0&&r.Value.push({type:r.Types[t.t-1].name,index:+t.v});break;case`</rc>`:break;case`<cellMetadata`:a=1;break;case`</cellMetadata>`:a=2;break;case`<valueMetadata`:a=0;break;case`</valueMetadata>`:a=2;break;case`<extLst`:case`<extLst>`:case`</extLst>`:case`<extLst/>`:break;case`<ext`:i=!0;break;case`</ext>`:i=!1;break;case`<rvb`:if(!o)break;o.offsets||=[],o.offsets.push(+t.i);break;default:if(!i&&n.WTF)throw Error(`unrecognized `+t[0]+` in metadata`)}return e}),r}function Gd(){var e=[Gn];return e.push(`<metadata xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:xlrd="http://schemas.microsoft.com/office/spreadsheetml/2017/richdata" xmlns:xda="http://schemas.microsoft.com/office/spreadsheetml/2017/dynamicarray">
  <metadataTypes count="1">
    <metadataType name="XLDAPR" minSupportedVersion="120000" copy="1" pasteAll="1" pasteValues="1" merge="1" splitFirst="1" rowColShift="1" clearFormats="1" clearComments="1" assign="1" coerce="1" cellMeta="1"/>
  </metadataTypes>
  <futureMetadata name="XLDAPR" count="1">
    <bk>
      <extLst>
        <ext uri="{bdbb8cdc-fa1e-496e-a857-3c3f30c029c3}">
          <xda:dynamicArrayProperties fDynamic="1" fCollapsed="0"/>
        </ext>
      </extLst>
    </bk>
  </futureMetadata>
  <cellMetadata count="1">
    <bk>
      <rc t="1" v="0"/>
    </bk>
  </cellMetadata>
</metadata>`),e.join(``)}function Kd(e){var t=[];if(!e)return t;var n=1;return(e.match(Jn)||[]).forEach(function(e){var r=W(e);switch(r[0]){case`<?xml`:break;case`<calcChain`:case`<calcChain>`:case`</calcChain>`:break;case`<c`:delete r[0],r.i?n=r.i:r.i=n,t.push(r);break}}),t}function qd(e){var t={};t.i=e.read_shift(4);var n={};n.r=e.read_shift(4),n.c=e.read_shift(4),t.r=J(n);var r=e.read_shift(1);return r&2&&(t.l=`1`),r&8&&(t.a=`1`),t}function Jd(e,t,n){var r=[],i=!1;return _i(e,function(e,t,a){switch(a){case 63:r.push(e);break;default:if(!t.T&&(!i||n.WTF))throw Error(`Unexpected record 0x`+a.toString(16))}}),r}function Yd(e,t,n,r){if(!e)return e;var i=r||{},a=!1,o=!1;_i(e,function(e,t,n){if(!o)switch(n){case 359:case 363:case 364:case 366:case 367:case 368:case 369:case 370:case 371:case 472:case 577:case 578:case 579:case 580:case 581:case 582:case 583:case 584:case 585:case 586:case 587:break;case 35:a=!0;break;case 36:a=!1;break;default:if(!t.T&&(!a||i.WTF))throw Error(`Unexpected record 0x`+n.toString(16))}},i)}function Xd(e,t){if(!e)return`??`;var n=(e.match(/<c:chart [^>]*r:id="([^"]*)"/)||[``,``])[1];return t[`!id`][n].Target}var Zd=1024;function Qd(e,t){for(var n=[21600,21600],r=[`m0,0l0`,n[1],n[0],n[1],n[0],`0xe`].join(`,`),i=[G(`xml`,null,{"xmlns:v":Mr.v,"xmlns:o":Mr.o,"xmlns:x":Mr.x,"xmlns:mv":Mr.mv}).replace(/\/>/,`>`),G(`o:shapelayout`,G(`o:idmap`,null,{"v:ext":`edit`,data:e}),{"v:ext":`edit`}),G(`v:shapetype`,[G(`v:stroke`,null,{joinstyle:`miter`}),G(`v:path`,null,{gradientshapeok:`t`,"o:connecttype":`rect`})].join(``),{id:`_x0000_t202`,"o:spt":202,coordsize:n.join(`,`),path:r})];Zd<e*1e3;)Zd+=1e3;return t.forEach(function(e){var t=Mi(e[0]),n={color2:`#BEFF82`,type:`gradient`};n.type==`gradient`&&(n.angle=`-180`);var r=G(`v:fill`,n.type==`gradient`?G(`o:fill`,null,{type:`gradientUnscaled`,"v:ext":`view`}):null,n);++Zd,i=i.concat([`<v:shape`+Tr({id:`_x0000_s`+Zd,type:`#_x0000_t202`,style:`position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10`+(e[1].hidden?`;visibility:hidden`:``),fillcolor:`#ECFAD4`,strokecolor:`#edeaa1`})+`>`,r,G(`v:shadow`,null,{on:`t`,obscured:`t`}),G(`v:path`,null,{"o:connecttype":`none`}),`<v:textbox><div style="text-align:left"></div></v:textbox>`,`<x:ClientData ObjectType="Note">`,`<x:MoveWithCells/>`,`<x:SizeWithCells/>`,wr(`x:Anchor`,[t.c+1,0,t.r+1,0,t.c+3,20,t.r+5,20].join(`,`)),wr(`x:AutoFill`,`False`),wr(`x:Row`,String(t.r)),wr(`x:Column`,String(t.c)),e[1].hidden?``:`<x:Visible/>`,`</x:ClientData>`,`</v:shape>`])}),i.push(`</xml>`),i.join(``)}function $d(e,t,n,r){var i=Array.isArray(e),a;t.forEach(function(t){var o=Mi(t.ref);if(i?(e[o.r]||(e[o.r]=[]),a=e[o.r][o.c]):a=e[t.ref],!a){a={t:`z`},i?e[o.r][o.c]=a:e[t.ref]=a;var s=Fi(e[`!ref`]||`BDWGO1000001:A1`);s.s.r>o.r&&(s.s.r=o.r),s.e.r<o.r&&(s.e.r=o.r),s.s.c>o.c&&(s.s.c=o.c),s.e.c<o.c&&(s.e.c=o.c);var c=Pi(s);c!==e[`!ref`]&&(e[`!ref`]=c)}a.c||=[];var l={a:t.author,t:t.t,r:t.r,T:n};t.h&&(l.h=t.h);for(var u=a.c.length-1;u>=0;--u){if(!n&&a.c[u].T)return;n&&!a.c[u].T&&a.c.splice(u,1)}if(n&&r){for(u=0;u<r.length;++u)if(l.a==r[u].id){l.a=r[u].name||l.a;break}}a.c.push(l)})}function ef(e,t){if(e.match(/<(?:\w+:)?comments *\/>/))return[];var n=[],r=[],i=e.match(/<(?:\w+:)?authors>([\s\S]*)<\/(?:\w+:)?authors>/);i&&i[1]&&i[1].split(/<\/\w*:?author>/).forEach(function(e){if(!(e===``||e.trim()===``)){var t=e.match(/<(?:\w+:)?author[^>]*>(.*)/);t&&n.push(t[1])}});var a=e.match(/<(?:\w+:)?commentList>([\s\S]*)<\/(?:\w+:)?commentList>/);return a&&a[1]&&a[1].split(/<\/\w*:?comment>/).forEach(function(e){if(!(e===``||e.trim()===``)){var i=e.match(/<(?:\w+:)?comment[^>]*>/);if(i){var a=W(i[0]),o={author:a.authorId&&n[a.authorId]||`sheetjsghost`,ref:a.ref,guid:a.guid},s=Mi(a.ref);if(!(t.sheetRows&&t.sheetRows<=s.r)){var c=e.match(/<(?:\w+:)?text>([\s\S]*)<\/(?:\w+:)?text>/),l=!!c&&!!c[1]&&Ml(c[1])||{r:``,t:``,h:``};o.r=l.r,l.r==`<t></t>`&&(l.t=l.h=``),o.t=(l.t||``).replace(/\r\n/g,`
`).replace(/\r/g,`
`),t.cellHTML&&(o.h=l.h),r.push(o)}}}}),r}function tf(e){var t=[Gn,G(`comments`,null,{xmlns:jr[0]})],n=[];return t.push(`<authors>`),e.forEach(function(e){e[1].forEach(function(e){var r=rr(e.a);n.indexOf(r)==-1&&(n.push(r),t.push(`<author>`+r+`</author>`)),e.T&&e.ID&&n.indexOf(`tc=`+e.ID)==-1&&(n.push(`tc=`+e.ID),t.push(`<author>tc=`+e.ID+`</author>`))})}),n.length==0&&(n.push(`SheetJ5`),t.push(`<author>SheetJ5</author>`)),t.push(`</authors>`),t.push(`<commentList>`),e.forEach(function(e){var r=0,i=[];if(e[1][0]&&e[1][0].T&&e[1][0].ID?r=n.indexOf(`tc=`+e[1][0].ID):e[1].forEach(function(e){e.a&&(r=n.indexOf(rr(e.a))),i.push(e.t||``)}),t.push(`<comment ref="`+e[0]+`" authorId="`+r+`"><text>`),i.length<=1)t.push(wr(`t`,rr(i[0]||``)));else{for(var a=`Comment:
    `+i[0]+`
`,o=1;o<i.length;++o)a+=`Reply:
    `+i[o]+`
`;t.push(wr(`t`,rr(a)))}t.push(`</text></comment>`)}),t.push(`</commentList>`),t.length>2&&(t[t.length]=`</comments>`,t[1]=t[1].replace(`/>`,`>`)),t.join(``)}function nf(e,t){var n=[],r=!1,i={},a=0;return e.replace(Jn,function(o,s){var c=W(o);switch(Zn(c[0])){case`<?xml`:break;case`<ThreadedComments`:break;case`</ThreadedComments>`:break;case`<threadedComment`:i={author:c.personId,guid:c.id,ref:c.ref,T:1};break;case`</threadedComment>`:i.t!=null&&n.push(i);break;case`<text>`:case`<text`:a=s+o.length;break;case`</text>`:i.t=e.slice(a,s).replace(/\r\n/g,`
`).replace(/\r/g,`
`);break;case`<mentions`:case`<mentions>`:r=!0;break;case`</mentions>`:r=!1;break;case`<extLst`:case`<extLst>`:case`</extLst>`:case`<extLst/>`:break;case`<ext`:r=!0;break;case`</ext>`:r=!1;break;default:if(!r&&t.WTF)throw Error(`unrecognized `+c[0]+` in threaded comments`)}return o}),n}function rf(e,t,n){var r=[Gn,G(`ThreadedComments`,null,{xmlns:Ar.TCMNT}).replace(/[\/]>/,`>`)];return e.forEach(function(e){var i=``;(e[1]||[]).forEach(function(a,o){if(!a.T){delete a.ID;return}a.a&&t.indexOf(a.a)==-1&&t.push(a.a);var s={ref:e[0],id:`{54EE7951-7262-4200-6969-`+(`000000000000`+ n.tcid++).slice(-12)+`}`};o==0?i=s.id:s.parentId=i,a.ID=s.id,a.a&&(s.personId=`{54EE7950-7262-4200-6969-`+(`000000000000`+t.indexOf(a.a)).slice(-12)+`}`),r.push(G(`threadedComment`,wr(`text`,a.t||``),s))})}),r.push(`</ThreadedComments>`),r.join(``)}function af(e,t){var n=[],r=!1;return e.replace(Jn,function(e){var i=W(e);switch(Zn(i[0])){case`<?xml`:break;case`<personList`:break;case`</personList>`:break;case`<person`:n.push({name:i.displayname,id:i.id});break;case`</person>`:break;case`<extLst`:case`<extLst>`:case`</extLst>`:case`<extLst/>`:break;case`<ext`:r=!0;break;case`</ext>`:r=!1;break;default:if(!r&&t.WTF)throw Error(`unrecognized `+i[0]+` in threaded comments`)}return e}),n}function of(e){var t=[Gn,G(`personList`,null,{xmlns:Ar.TCMNT,"xmlns:x":jr[0]}).replace(/[\/]>/,`>`)];return e.forEach(function(e,n){t.push(G(`person`,null,{displayName:e,id:`{54EE7950-7262-4200-6969-`+(`000000000000`+n).slice(-12)+`}`,userId:e,providerId:`None`}))}),t.push(`</personList>`),t.join(``)}function sf(e){var t={};t.iauthor=e.read_shift(4);var n=fa(e,16);return t.rfx=n.s,t.ref=J(n.s),e.l+=16,t}function cf(e,t){return t??=K(36),t.write_shift(4,e[1].iauthor),pa(e[0],t),t.write_shift(4,0),t.write_shift(4,0),t.write_shift(4,0),t.write_shift(4,0),t}var lf=Ui;function uf(e){return Wi(e.slice(0,54))}function df(e,t){var n=[],r=[],i={},a=!1;return _i(e,function(e,o,s){switch(s){case 632:r.push(e);break;case 635:i=e;break;case 637:i.t=e.t,i.h=e.h,i.r=e.r;break;case 636:if(i.author=r[i.iauthor],delete i.iauthor,t.sheetRows&&i.rfx&&t.sheetRows<=i.rfx.r)break;i.t||=``,delete i.rfx,n.push(i);break;case 3072:break;case 35:a=!0;break;case 36:a=!1;break;case 37:break;case 38:break;default:if(!o.T&&(!a||t.WTF))throw Error(`Unexpected record 0x`+s.toString(16))}}),n}function ff(e){var t=vi(),n=[];return q(t,628),q(t,630),e.forEach(function(e){e[1].forEach(function(e){n.indexOf(e.a)>-1||(n.push(e.a.slice(0,54)),q(t,632,uf(e.a)))})}),q(t,631),q(t,633),e.forEach(function(e){e[1].forEach(function(r){r.iauthor=n.indexOf(r.a),q(t,635,cf([{s:Mi(e[0]),e:Mi(e[0])},r])),r.t&&r.t.length>0&&q(t,637,Xi(r)),q(t,636),delete r.iauthor})}),q(t,634),q(t,629),t.end()}var pf=`application/vnd.ms-office.vbaProject`;function mf(e){var t=U.utils.cfb_new({root:`R`});return e.FullPaths.forEach(function(n,r){if(!(n.slice(-1)===`/`||!n.match(/_VBA_PROJECT_CUR/))){var i=n.replace(/^[^\/]*/,`R`).replace(/\/_VBA_PROJECT_CUR\u0000*/,``);U.utils.cfb_add(t,i,e.FileIndex[r].content)}}),U.write(t)}function hf(e,t){t.FullPaths.forEach(function(n,r){if(r!=0){var i=n.replace(/[^\/]*[\/]/,`/_VBA_PROJECT_CUR/`);i.slice(-1)!==`/`&&U.utils.cfb_add(e,i,t.FileIndex[r].content)}})}var gf=[`xlsb`,`xlsm`,`xlam`,`biff8`,`xla`];function _f(){return{"!type":`dialog`}}function vf(){return{"!type":`dialog`}}function yf(){return{"!type":`macro`}}function bf(){return{"!type":`macro`}}var xf=(function(){var e=/(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g,t={r:0,c:0};function n(e,n,r,i){var a=!1,o=!1;r.length==0?o=!0:r.charAt(0)==`[`&&(o=!0,r=r.slice(1,-1)),i.length==0?a=!0:i.charAt(0)==`[`&&(a=!0,i=i.slice(1,-1));var s=r.length>0?parseInt(r,10)|0:0,c=i.length>0?parseInt(i,10)|0:0;return a?c+=t.c:--c,o?s+=t.r:--s,n+(a?``:`$`)+Oi(c)+(o?``:`$`)+wi(s)}return function(r,i){return t=i,r.replace(e,n)}})(),Sf=/(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g,Cf=(function(){return function(e,t){return e.replace(Sf,function(e,n,r,i,a,o){var s=Di(i)-(r?0:t.c),c=Ci(o)-(a?0:t.r),l=c==0?``:a?c+1:`[`+c+`]`,u=s==0?``:r?s+1:`[`+s+`]`;return n+`R`+l+`C`+u})}})();function wf(e,t){return e.replace(Sf,function(e,n,r,i,a,o){return n+(r==`$`?r+i:Oi(Di(i)+t.c))+(a==`$`?a+o:wi(Ci(o)+t.r))})}function Tf(e,t,n){var r=Ni(t).s,i=Mi(n);return wf(e,{r:i.r-r.r,c:i.c-r.c})}function Ef(e){return e.length!=1}function Df(e){return e.replace(/_xlfn\./g,``)}function Of(e){e.l+=1}function kf(e,t){var n=e.read_shift(t==1?1:2);return[n&16383,n>>14&1,n>>15&1]}function Af(e,t,n){var r=2;if(n){if(n.biff>=2&&n.biff<=5)return jf(e,t,n);n.biff==12&&(r=4)}var i=e.read_shift(r),a=e.read_shift(r),o=kf(e,2),s=kf(e,2);return{s:{r:i,c:o[0],cRel:o[1],rRel:o[2]},e:{r:a,c:s[0],cRel:s[1],rRel:s[2]}}}function jf(e){var t=kf(e,2),n=kf(e,2),r=e.read_shift(1),i=e.read_shift(1);return{s:{r:t[0],c:r,cRel:t[1],rRel:t[2]},e:{r:n[0],c:i,cRel:n[1],rRel:n[2]}}}function Mf(e,t,n){if(n.biff<8)return jf(e,t,n);var r=e.read_shift(n.biff==12?4:2),i=e.read_shift(n.biff==12?4:2),a=kf(e,2),o=kf(e,2);return{s:{r,c:a[0],cRel:a[1],rRel:a[2]},e:{r:i,c:o[0],cRel:o[1],rRel:o[2]}}}function Nf(e,t,n){if(n&&n.biff>=2&&n.biff<=5)return Pf(e,t,n);var r=e.read_shift(n&&n.biff==12?4:2),i=kf(e,2);return{r,c:i[0],cRel:i[1],rRel:i[2]}}function Pf(e){var t=kf(e,2),n=e.read_shift(1);return{r:t[0],c:n,cRel:t[1],rRel:t[2]}}function Ff(e){var t=e.read_shift(2),n=e.read_shift(2);return{r:t,c:n&255,fQuoted:!!(n&16384),cRel:n>>15,rRel:n>>15}}function If(e,t,n){var r=n&&n.biff?n.biff:8;if(r>=2&&r<=5)return Lf(e,t,n);var i=e.read_shift(r>=12?4:2),a=e.read_shift(2),o=(a&16384)>>14,s=(a&32768)>>15;if(a&=16383,s==1)for(;i>524287;)i-=1048576;if(o==1)for(;a>8191;)a-=16384;return{r:i,c:a,cRel:o,rRel:s}}function Lf(e){var t=e.read_shift(2),n=e.read_shift(1),r=(t&32768)>>15,i=(t&16384)>>14;return t&=16383,r==1&&t>=8192&&(t-=16384),i==1&&n>=128&&(n-=256),{r:t,c:n,cRel:i,rRel:r}}function Rf(e,t,n){return[(e[e.l++]&96)>>5,Af(e,n.biff>=2&&n.biff<=5?6:8,n)]}function zf(e,t,n){var r=(e[e.l++]&96)>>5,i=e.read_shift(2,`i`),a=8;if(n)switch(n.biff){case 5:e.l+=12,a=6;break;case 12:a=12;break}return[r,i,Af(e,a,n)]}function Bf(e,t,n){var r=(e[e.l++]&96)>>5;return e.l+=n&&n.biff>8?12:n.biff<8?6:8,[r]}function Vf(e,t,n){var r=(e[e.l++]&96)>>5,i=e.read_shift(2),a=8;if(n)switch(n.biff){case 5:e.l+=12,a=6;break;case 12:a=12;break}return e.l+=a,[r,i]}function Hf(e,t,n){return[(e[e.l++]&96)>>5,Mf(e,t-1,n)]}function Uf(e,t,n){var r=(e[e.l++]&96)>>5;return e.l+=n.biff==2?6:n.biff==12?14:7,[r]}function Wf(e){var t=e[e.l+1]&1;return e.l+=4,[t,1]}function Gf(e,t,n){e.l+=2;for(var r=e.read_shift(n&&n.biff==2?1:2),i=[],a=0;a<=r;++a)i.push(e.read_shift(n&&n.biff==2?1:2));return i}function Kf(e,t,n){var r=e[e.l+1]&255?1:0;return e.l+=2,[r,e.read_shift(n&&n.biff==2?1:2)]}function qf(e,t,n){var r=e[e.l+1]&255?1:0;return e.l+=2,[r,e.read_shift(n&&n.biff==2?1:2)]}function Jf(e){var t=e[e.l+1]&255?1:0;return e.l+=2,[t,e.read_shift(2)]}function Yf(e,t,n){var r=e[e.l+1]&255?1:0;return e.l+=n&&n.biff==2?3:4,[r]}function Xf(e){return[e.read_shift(1),e.read_shift(1)]}function Zf(e){return e.read_shift(2),Xf(e,2)}function Qf(e){return e.read_shift(2),Xf(e,2)}function $f(e,t,n){var r=(e[e.l]&96)>>5;return e.l+=1,[r,Nf(e,0,n)]}function ep(e,t,n){var r=(e[e.l]&96)>>5;return e.l+=1,[r,If(e,0,n)]}function tp(e,t,n){var r=(e[e.l]&96)>>5;e.l+=1;var i=e.read_shift(2);return n&&n.biff==5&&(e.l+=12),[r,i,Nf(e,0,n)]}function np(e,t,n){var r=(e[e.l]&96)>>5;e.l+=1;var i=e.read_shift(n&&n.biff<=3?1:2);return[vm[i],_m[i],r]}function rp(e,t,n){var r=e[e.l++],i=e.read_shift(1),a=n&&n.biff<=3?[r==88?-1:0,e.read_shift(1)]:ip(e);return[i,(a[0]===0?_m:gm)[a[1]]]}function ip(e){return[e[e.l+1]>>7,e.read_shift(2)&32767]}function ap(e,t,n){e.l+=n&&n.biff==2?3:4}function op(e,t,n){return e.l++,n&&n.biff==12?[e.read_shift(4,`i`),0]:[e.read_shift(2),e.read_shift(n&&n.biff==2?1:2)]}function sp(e){return e.l++,Ha[e.read_shift(1)]}function cp(e){return e.l++,e.read_shift(2)}function lp(e){return e.l++,e.read_shift(1)!==0}function up(e){return e.l++,ma(e,8)}function dp(e,t,n){return e.l++,is(e,t-1,n)}function fp(e,t){var n=[e.read_shift(1)];if(t==12)switch(n[0]){case 2:n[0]=4;break;case 4:n[0]=16;break;case 0:n[0]=1;break;case 1:n[0]=2;break}switch(n[0]){case 4:n[1]=Zo(e,1)?`TRUE`:`FALSE`,t!=12&&(e.l+=7);break;case 37:case 16:n[1]=Ha[e[e.l]],e.l+=t==12?4:8;break;case 0:e.l+=8;break;case 1:n[1]=ma(e,8);break;case 2:n[1]=ls(e,0,{biff:t>0&&t<8?2:t});break;default:throw Error(`Bad SerAr: `+n[0])}return n}function pp(e,t,n){for(var r=e.read_shift(n.biff==12?4:2),i=[],a=0;a!=r;++a)i.push((n.biff==12?fa:Os)(e,8));return i}function mp(e,t,n){var r=0,i=0;n.biff==12?(r=e.read_shift(4),i=e.read_shift(4)):(i=1+e.read_shift(1),r=1+e.read_shift(2)),n.biff>=2&&n.biff<8&&(--r,--i==0&&(i=256));for(var a=0,o=[];a!=r&&(o[a]=[]);++a)for(var s=0;s!=i;++s)o[a][s]=fp(e,n.biff);return o}function hp(e,t,n){var r=e.read_shift(1)>>>5&3,i=!n||n.biff>=8?4:2,a=e.read_shift(i);switch(n.biff){case 2:e.l+=5;break;case 3:case 4:e.l+=8;break;case 5:e.l+=12;break}return[r,0,a]}function gp(e,t,n){return n.biff==5?_p(e,t,n):[e.read_shift(1)>>>5&3,e.read_shift(2),e.read_shift(4)]}function _p(e){var t=e.read_shift(1)>>>5&3,n=e.read_shift(2,`i`);e.l+=8;var r=e.read_shift(2);return e.l+=12,[t,n,r]}function vp(e,t,n){var r=e.read_shift(1)>>>5&3;return e.l+=n&&n.biff==2?3:4,[r,e.read_shift(n&&n.biff==2?1:2)]}function yp(e,t,n){return[e.read_shift(1)>>>5&3,e.read_shift(n&&n.biff==2?1:2)]}function bp(e,t,n){var r=e.read_shift(1)>>>5&3;return e.l+=4,n.biff<8&&e.l--,n.biff==12&&(e.l+=2),[r]}function xp(e,t,n){var r=(e[e.l++]&96)>>5,i=e.read_shift(2),a=4;if(n)switch(n.biff){case 5:a=15;break;case 12:a=6;break}return e.l+=a,[r,i]}var Sp=gi,Cp=gi,wp=gi;function Tp(e,t,n){return e.l+=2,[Ff(e,4,n)]}function Ep(e){return e.l+=6,[]}var Dp=Tp,Op=Ep,kp=Ep,Ap=Tp;function jp(e){return e.l+=2,[$o(e),e.read_shift(2)&1]}var Mp=Tp,Np=jp,Pp=Ep,Fp=Tp,Ip=Tp,Lp=[`Data`,`All`,`Headers`,`??`,`?Data2`,`??`,`?DataHeaders`,`??`,`Totals`,`??`,`??`,`??`,`?DataTotals`,`??`,`??`,`??`,`?Current`];function Rp(e){e.l+=2;var t=e.read_shift(2),n=e.read_shift(2),r=e.read_shift(4),i=e.read_shift(2),a=e.read_shift(2),o=Lp[n>>2&31];return{ixti:t,coltype:n&3,rt:o,idx:r,c:i,C:a}}function zp(e){return e.l+=2,[e.read_shift(4)]}function Bp(e,t,n){return e.l+=5,e.l+=2,e.l+=n.biff==2?1:4,[`PTGSHEET`]}function Vp(e,t,n){return e.l+=n.biff==2?4:5,[`PTGENDSHEET`]}function Hp(e){return[e.read_shift(1)>>>5&3,e.read_shift(2)]}function Up(e){return[e.read_shift(1)>>>5&3,e.read_shift(2)]}function Wp(e){return e.l+=4,[0,0]}var Gp={1:{n:`PtgExp`,f:op},2:{n:`PtgTbl`,f:wp},3:{n:`PtgAdd`,f:Of},4:{n:`PtgSub`,f:Of},5:{n:`PtgMul`,f:Of},6:{n:`PtgDiv`,f:Of},7:{n:`PtgPower`,f:Of},8:{n:`PtgConcat`,f:Of},9:{n:`PtgLt`,f:Of},10:{n:`PtgLe`,f:Of},11:{n:`PtgEq`,f:Of},12:{n:`PtgGe`,f:Of},13:{n:`PtgGt`,f:Of},14:{n:`PtgNe`,f:Of},15:{n:`PtgIsect`,f:Of},16:{n:`PtgUnion`,f:Of},17:{n:`PtgRange`,f:Of},18:{n:`PtgUplus`,f:Of},19:{n:`PtgUminus`,f:Of},20:{n:`PtgPercent`,f:Of},21:{n:`PtgParen`,f:Of},22:{n:`PtgMissArg`,f:Of},23:{n:`PtgStr`,f:dp},26:{n:`PtgSheet`,f:Bp},27:{n:`PtgEndSheet`,f:Vp},28:{n:`PtgErr`,f:sp},29:{n:`PtgBool`,f:lp},30:{n:`PtgInt`,f:cp},31:{n:`PtgNum`,f:up},32:{n:`PtgArray`,f:Uf},33:{n:`PtgFunc`,f:np},34:{n:`PtgFuncVar`,f:rp},35:{n:`PtgName`,f:hp},36:{n:`PtgRef`,f:$f},37:{n:`PtgArea`,f:Rf},38:{n:`PtgMemArea`,f:vp},39:{n:`PtgMemErr`,f:Sp},40:{n:`PtgMemNoMem`,f:Cp},41:{n:`PtgMemFunc`,f:yp},42:{n:`PtgRefErr`,f:bp},43:{n:`PtgAreaErr`,f:Bf},44:{n:`PtgRefN`,f:ep},45:{n:`PtgAreaN`,f:Hf},46:{n:`PtgMemAreaN`,f:Hp},47:{n:`PtgMemNoMemN`,f:Up},57:{n:`PtgNameX`,f:gp},58:{n:`PtgRef3d`,f:tp},59:{n:`PtgArea3d`,f:zf},60:{n:`PtgRefErr3d`,f:xp},61:{n:`PtgAreaErr3d`,f:Vf},255:{}},Kp={64:32,96:32,65:33,97:33,66:34,98:34,67:35,99:35,68:36,100:36,69:37,101:37,70:38,102:38,71:39,103:39,72:40,104:40,73:41,105:41,74:42,106:42,75:43,107:43,76:44,108:44,77:45,109:45,78:46,110:46,79:47,111:47,88:34,120:34,89:57,121:57,90:58,122:58,91:59,123:59,92:60,124:60,93:61,125:61},qp={1:{n:`PtgElfLel`,f:jp},2:{n:`PtgElfRw`,f:Fp},3:{n:`PtgElfCol`,f:Dp},6:{n:`PtgElfRwV`,f:Ip},7:{n:`PtgElfColV`,f:Ap},10:{n:`PtgElfRadical`,f:Mp},11:{n:`PtgElfRadicalS`,f:Pp},13:{n:`PtgElfColS`,f:Op},15:{n:`PtgElfColSV`,f:kp},16:{n:`PtgElfRadicalLel`,f:Np},25:{n:`PtgList`,f:Rp},29:{n:`PtgSxName`,f:zp},255:{}},Jp={0:{n:`PtgAttrNoop`,f:Wp},1:{n:`PtgAttrSemi`,f:Yf},2:{n:`PtgAttrIf`,f:qf},4:{n:`PtgAttrChoose`,f:Gf},8:{n:`PtgAttrGoto`,f:Kf},16:{n:`PtgAttrSum`,f:ap},32:{n:`PtgAttrBaxcel`,f:Wf},33:{n:`PtgAttrBaxcel`,f:Wf},64:{n:`PtgAttrSpace`,f:Zf},65:{n:`PtgAttrSpaceSemi`,f:Qf},128:{n:`PtgAttrIfError`,f:Jf},255:{}};function Yp(e,t,n,r){if(r.biff<8)return gi(e,t);for(var i=e.l+t,a=[],o=0;o!==n.length;++o)switch(n[o][0]){case`PtgArray`:n[o][1]=mp(e,0,r),a.push(n[o][1]);break;case`PtgMemArea`:n[o][2]=pp(e,n[o][1],r),a.push(n[o][2]);break;case`PtgExp`:r&&r.biff==12&&(n[o][1][1]=e.read_shift(4),a.push(n[o][1]));break;case`PtgList`:case`PtgElfRadicalS`:case`PtgElfColS`:case`PtgElfColSV`:throw`Unsupported `+n[o][0];default:break}return t=i-e.l,t!==0&&a.push(gi(e,t)),a}function Xp(e,t,n){for(var r=e.l+t,i,a,o=[];r!=e.l;)t=r-e.l,a=e[e.l],i=Gp[a]||Gp[Kp[a]],(a===24||a===25)&&(i=(a===24?qp:Jp)[e[e.l+1]]),!i||!i.f?gi(e,t):o.push([i.n,i.f(e,t,n)]);return o}function Zp(e){for(var t=[],n=0;n<e.length;++n){for(var r=e[n],i=[],a=0;a<r.length;++a){var o=r[a];if(o)switch(o[0]){case 2:i.push(`"`+o[1].replace(/"/g,`""`)+`"`);break;default:i.push(o[1])}else i.push(``)}t.push(i.join(`,`))}return t.join(`;`)}var Qp={PtgAdd:`+`,PtgConcat:`&`,PtgDiv:`/`,PtgEq:`=`,PtgGe:`>=`,PtgGt:`>`,PtgLe:`<=`,PtgLt:`<`,PtgMul:`*`,PtgNe:`<>`,PtgPower:`^`,PtgSub:`-`};function $p(e,t){if(!e&&!(t&&t.biff<=5&&t.biff>=2))throw Error(`empty sheet name`);return/[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(e)?`'`+e+`'`:e}function em(e,t,n){if(!e)return`SH33TJSERR0`;if(n.biff>8&&(!e.XTI||!e.XTI[t]))return e.SheetNames[t];if(!e.XTI)return`SH33TJSERR6`;var r=e.XTI[t];if(n.biff<8)return t>1e4&&(t-=65536),t<0&&(t=-t),t==0?``:e.XTI[t-1];if(!r)return`SH33TJSERR1`;var i=``;if(n.biff>8)switch(e[r[0]][0]){case 357:return i=r[1]==-1?`#REF`:e.SheetNames[r[1]],r[1]==r[2]?i:i+`:`+e.SheetNames[r[2]];case 358:return n.SID==null?`SH33TJSSAME`+e[r[0]][0]:e.SheetNames[n.SID];case 355:default:return`SH33TJSSRC`+e[r[0]][0]}switch(e[r[0]][0][0]){case 1025:return i=r[1]==-1?`#REF`:e.SheetNames[r[1]]||`SH33TJSERR3`,r[1]==r[2]?i:i+`:`+e.SheetNames[r[2]];case 14849:return e[r[0]].slice(1).map(function(e){return e.Name}).join(`;;`);default:return e[r[0]][0][3]?(i=r[1]==-1?`#REF`:e[r[0]][0][3][r[1]]||`SH33TJSERR4`,r[1]==r[2]?i:i+`:`+e[r[0]][0][3][r[2]]):`SH33TJSERR2`}}function tm(e,t,n){var r=em(e,t,n);return r==`#REF`?r:$p(r,n)}function nm(e,t,n,r,i){var a=i&&i.biff||8,o={s:{c:0,r:0},e:{c:0,r:0}},s=[],c,l,u,d=0,f=0,p,m=``;if(!e[0]||!e[0][0])return``;for(var h=-1,g=``,_=0,v=e[0].length;_<v;++_){var y=e[0][_];switch(y[0]){case`PtgUminus`:s.push(`-`+s.pop());break;case`PtgUplus`:s.push(`+`+s.pop());break;case`PtgPercent`:s.push(s.pop()+`%`);break;case`PtgAdd`:case`PtgConcat`:case`PtgDiv`:case`PtgEq`:case`PtgGe`:case`PtgGt`:case`PtgLe`:case`PtgLt`:case`PtgMul`:case`PtgNe`:case`PtgPower`:case`PtgSub`:if(c=s.pop(),l=s.pop(),h>=0){switch(e[0][h][1][0]){case 0:g=Dn(` `,e[0][h][1][1]);break;case 1:g=Dn(`\r`,e[0][h][1][1]);break;default:if(g=``,i.WTF)throw Error(`Unexpected PtgAttrSpaceType `+e[0][h][1][0])}l+=g,h=-1}s.push(l+Qp[y[0]]+c);break;case`PtgIsect`:c=s.pop(),l=s.pop(),s.push(l+` `+c);break;case`PtgUnion`:c=s.pop(),l=s.pop(),s.push(l+`,`+c);break;case`PtgRange`:c=s.pop(),l=s.pop(),s.push(l+`:`+c);break;case`PtgAttrChoose`:break;case`PtgAttrGoto`:break;case`PtgAttrIf`:break;case`PtgAttrIfError`:break;case`PtgRef`:u=yi(y[1][1],o,i),s.push(xi(u,a));break;case`PtgRefN`:u=n?yi(y[1][1],n,i):y[1][1],s.push(xi(u,a));break;case`PtgRef3d`:d=y[1][1],u=yi(y[1][2],o,i),m=tm(r,d,i),s.push(m+`!`+xi(u,a));break;case`PtgFunc`:case`PtgFuncVar`:var b=y[1][0],x=y[1][1];b||=0,b&=127;var S=b==0?[]:s.slice(-b);s.length-=b,x===`User`&&(x=S.shift()),s.push(x+`(`+S.join(`,`)+`)`);break;case`PtgBool`:s.push(y[1]?`TRUE`:`FALSE`);break;case`PtgInt`:s.push(y[1]);break;case`PtgNum`:s.push(String(y[1]));break;case`PtgStr`:s.push(`"`+y[1].replace(/"/g,`""`)+`"`);break;case`PtgErr`:s.push(y[1]);break;case`PtgAreaN`:p=bi(y[1][1],n?{s:n}:o,i),s.push(Si(p,i));break;case`PtgArea`:p=bi(y[1][1],o,i),s.push(Si(p,i));break;case`PtgArea3d`:d=y[1][1],p=y[1][2],m=tm(r,d,i),s.push(m+`!`+Si(p,i));break;case`PtgAttrSum`:s.push(`SUM(`+s.pop()+`)`);break;case`PtgAttrBaxcel`:case`PtgAttrSemi`:break;case`PtgName`:f=y[1][2];var C=(r.names||[])[f-1]||(r[0]||[])[f],w=C?C.Name:`SH33TJSNAME`+String(f);w&&w.slice(0,6)==`_xlfn.`&&!i.xlfn&&(w=w.slice(6)),s.push(w);break;case`PtgNameX`:var T=y[1][1];f=y[1][2];var E;if(i.biff<=5)T<0&&(T=-T),r[T]&&(E=r[T][f]);else{var D=``;if(((r[T]||[])[0]||[])[0]==14849||(((r[T]||[])[0]||[])[0]==1025?r[T][f]&&r[T][f].itab>0&&(D=r.SheetNames[r[T][f].itab-1]+`!`):D=r.SheetNames[f-1]+`!`),r[T]&&r[T][f])D+=r[T][f].Name;else if(r[0]&&r[0][f])D+=r[0][f].Name;else{var O=(em(r,T,i)||``).split(`;;`);O[f-1]?D=O[f-1]:D+=`SH33TJSERRX`}s.push(D);break}E||={Name:`SH33TJSERRY`},s.push(E.Name);break;case`PtgParen`:var k=`(`,A=`)`;if(h>=0){switch(g=``,e[0][h][1][0]){case 2:k=Dn(` `,e[0][h][1][1])+k;break;case 3:k=Dn(`\r`,e[0][h][1][1])+k;break;case 4:A=Dn(` `,e[0][h][1][1])+A;break;case 5:A=Dn(`\r`,e[0][h][1][1])+A;break;default:if(i.WTF)throw Error(`Unexpected PtgAttrSpaceType `+e[0][h][1][0])}h=-1}s.push(k+s.pop()+A);break;case`PtgRefErr`:s.push(`#REF!`);break;case`PtgRefErr3d`:s.push(`#REF!`);break;case`PtgExp`:u={c:y[1][1],r:y[1][0]};var j={c:n.c,r:n.r};if(r.sharedf[J(u)]){var M=r.sharedf[J(u)];s.push(nm(M,o,j,r,i))}else{var N=!1;for(c=0;c!=r.arrayf.length;++c)if(l=r.arrayf[c],!(u.c<l[0].s.c||u.c>l[0].e.c)&&!(u.r<l[0].s.r||u.r>l[0].e.r)){s.push(nm(l[1],o,j,r,i)),N=!0;break}N||s.push(y[1])}break;case`PtgArray`:s.push(`{`+Zp(y[1])+`}`);break;case`PtgMemArea`:break;case`PtgAttrSpace`:case`PtgAttrSpaceSemi`:h=_;break;case`PtgTbl`:break;case`PtgMemErr`:break;case`PtgMissArg`:s.push(``);break;case`PtgAreaErr`:s.push(`#REF!`);break;case`PtgAreaErr3d`:s.push(`#REF!`);break;case`PtgList`:s.push(`Table`+y[1].idx+`[#`+y[1].rt+`]`);break;case`PtgMemAreaN`:case`PtgMemNoMemN`:case`PtgAttrNoop`:case`PtgSheet`:case`PtgEndSheet`:break;case`PtgMemFunc`:break;case`PtgMemNoMem`:break;case`PtgElfCol`:case`PtgElfColS`:case`PtgElfColSV`:case`PtgElfColV`:case`PtgElfLel`:case`PtgElfRadical`:case`PtgElfRadicalLel`:case`PtgElfRadicalS`:case`PtgElfRw`:case`PtgElfRwV`:throw Error(`Unsupported ELFs`);case`PtgSxName`:throw Error(`Unrecognized Formula Token: `+String(y));default:throw Error(`Unrecognized Formula Token: `+String(y))}if(i.biff!=3&&h>=0&&[`PtgAttrSpace`,`PtgAttrSpaceSemi`,`PtgAttrGoto`].indexOf(e[0][_][0])==-1){y=e[0][h];var P=!0;switch(y[1][0]){case 4:P=!1;case 0:g=Dn(` `,y[1][1]);break;case 5:P=!1;case 1:g=Dn(`\r`,y[1][1]);break;default:if(g=``,i.WTF)throw Error(`Unexpected PtgAttrSpaceType `+y[1][0])}s.push((P?g:``)+s.pop()+(P?``:g)),h=-1}}if(s.length>1&&i.WTF)throw Error(`bad formula stack`);return s[0]}function rm(e,t,n){var r=e.l+t,i=n.biff==2?1:2,a,o=e.read_shift(i);if(o==65535)return[[],gi(e,t-2)];var s=Xp(e,o,n);return t!==o+i&&(a=Yp(e,t-o-i,s,n)),e.l=r,[s,a]}function im(e,t,n){var r=e.l+t,i=n.biff==2?1:2,a,o=e.read_shift(i);if(o==65535)return[[],gi(e,t-2)];var s=Xp(e,o,n);return t!==o+i&&(a=Yp(e,t-o-i,s,n)),e.l=r,[s,a]}function am(e,t,n,r){var i=e.l+t,a=Xp(e,r,n),o;return i!==e.l&&(o=Yp(e,i-e.l,a,n)),[a,o]}function om(e,t,n){var r=e.l+t,i,a=e.read_shift(2),o=Xp(e,a,n);return a==65535?[[],gi(e,t-2)]:(t!==a+2&&(i=Yp(e,r-a-2,o,n)),[o,i])}function sm(e){var t;if(ii(e,e.l+6)!==65535)return[ma(e),`n`];switch(e[e.l]){case 0:return e.l+=8,[`String`,`s`];case 1:return t=e[e.l+2]===1,e.l+=8,[t,`b`];case 2:return t=e[e.l+2],e.l+=8,[t,`e`];case 3:return e.l+=8,[``,`s`]}return[]}function cm(e){if(e==null){var t=K(8);return t.write_shift(1,3),t.write_shift(1,0),t.write_shift(2,0),t.write_shift(2,0),t.write_shift(2,65535),t}else if(typeof e==`number`)return ha(e);return ha(0)}function lm(e,t,n){var r=e.l+t,i=xs(e,6);n.biff==2&&++e.l;var a=sm(e,8),o=e.read_shift(1);n.biff!=2&&(e.read_shift(1),n.biff>=5&&e.read_shift(4));var s=im(e,r-e.l,n);return{cell:i,val:a[0],formula:s,shared:o>>3&1,tt:a[1]}}function um(e,t,n,r,i){var a=Ss(t,n,i),o=cm(e.v),s=K(6);s.write_shift(2,33),s.write_shift(4,0);for(var c=K(e.bf.length),l=0;l<e.bf.length;++l)c[l]=e.bf[l];return He([a,o,s,c])}function dm(e,t,n){var r=Xp(e,e.read_shift(4),n),i=e.read_shift(4);return[r,i>0?Yp(e,i,r,n):null]}var fm=dm,pm=dm,mm=dm,hm=dm,gm={0:`BEEP`,1:`OPEN`,2:`OPEN.LINKS`,3:`CLOSE.ALL`,4:`SAVE`,5:`SAVE.AS`,6:`FILE.DELETE`,7:`PAGE.SETUP`,8:`PRINT`,9:`PRINTER.SETUP`,10:`QUIT`,11:`NEW.WINDOW`,12:`ARRANGE.ALL`,13:`WINDOW.SIZE`,14:`WINDOW.MOVE`,15:`FULL`,16:`CLOSE`,17:`RUN`,22:`SET.PRINT.AREA`,23:`SET.PRINT.TITLES`,24:`SET.PAGE.BREAK`,25:`REMOVE.PAGE.BREAK`,26:`FONT`,27:`DISPLAY`,28:`PROTECT.DOCUMENT`,29:`PRECISION`,30:`A1.R1C1`,31:`CALCULATE.NOW`,32:`CALCULATION`,34:`DATA.FIND`,35:`EXTRACT`,36:`DATA.DELETE`,37:`SET.DATABASE`,38:`SET.CRITERIA`,39:`SORT`,40:`DATA.SERIES`,41:`TABLE`,42:`FORMAT.NUMBER`,43:`ALIGNMENT`,44:`STYLE`,45:`BORDER`,46:`CELL.PROTECTION`,47:`COLUMN.WIDTH`,48:`UNDO`,49:`CUT`,50:`COPY`,51:`PASTE`,52:`CLEAR`,53:`PASTE.SPECIAL`,54:`EDIT.DELETE`,55:`INSERT`,56:`FILL.RIGHT`,57:`FILL.DOWN`,61:`DEFINE.NAME`,62:`CREATE.NAMES`,63:`FORMULA.GOTO`,64:`FORMULA.FIND`,65:`SELECT.LAST.CELL`,66:`SHOW.ACTIVE.CELL`,67:`GALLERY.AREA`,68:`GALLERY.BAR`,69:`GALLERY.COLUMN`,70:`GALLERY.LINE`,71:`GALLERY.PIE`,72:`GALLERY.SCATTER`,73:`COMBINATION`,74:`PREFERRED`,75:`ADD.OVERLAY`,76:`GRIDLINES`,77:`SET.PREFERRED`,78:`AXES`,79:`LEGEND`,80:`ATTACH.TEXT`,81:`ADD.ARROW`,82:`SELECT.CHART`,83:`SELECT.PLOT.AREA`,84:`PATTERNS`,85:`MAIN.CHART`,86:`OVERLAY`,87:`SCALE`,88:`FORMAT.LEGEND`,89:`FORMAT.TEXT`,90:`EDIT.REPEAT`,91:`PARSE`,92:`JUSTIFY`,93:`HIDE`,94:`UNHIDE`,95:`WORKSPACE`,96:`FORMULA`,97:`FORMULA.FILL`,98:`FORMULA.ARRAY`,99:`DATA.FIND.NEXT`,100:`DATA.FIND.PREV`,101:`FORMULA.FIND.NEXT`,102:`FORMULA.FIND.PREV`,103:`ACTIVATE`,104:`ACTIVATE.NEXT`,105:`ACTIVATE.PREV`,106:`UNLOCKED.NEXT`,107:`UNLOCKED.PREV`,108:`COPY.PICTURE`,109:`SELECT`,110:`DELETE.NAME`,111:`DELETE.FORMAT`,112:`VLINE`,113:`HLINE`,114:`VPAGE`,115:`HPAGE`,116:`VSCROLL`,117:`HSCROLL`,118:`ALERT`,119:`NEW`,120:`CANCEL.COPY`,121:`SHOW.CLIPBOARD`,122:`MESSAGE`,124:`PASTE.LINK`,125:`APP.ACTIVATE`,126:`DELETE.ARROW`,127:`ROW.HEIGHT`,128:`FORMAT.MOVE`,129:`FORMAT.SIZE`,130:`FORMULA.REPLACE`,131:`SEND.KEYS`,132:`SELECT.SPECIAL`,133:`APPLY.NAMES`,134:`REPLACE.FONT`,135:`FREEZE.PANES`,136:`SHOW.INFO`,137:`SPLIT`,138:`ON.WINDOW`,139:`ON.DATA`,140:`DISABLE.INPUT`,142:`OUTLINE`,143:`LIST.NAMES`,144:`FILE.CLOSE`,145:`SAVE.WORKBOOK`,146:`DATA.FORM`,147:`COPY.CHART`,148:`ON.TIME`,149:`WAIT`,150:`FORMAT.FONT`,151:`FILL.UP`,152:`FILL.LEFT`,153:`DELETE.OVERLAY`,155:`SHORT.MENUS`,159:`SET.UPDATE.STATUS`,161:`COLOR.PALETTE`,162:`DELETE.STYLE`,163:`WINDOW.RESTORE`,164:`WINDOW.MAXIMIZE`,166:`CHANGE.LINK`,167:`CALCULATE.DOCUMENT`,168:`ON.KEY`,169:`APP.RESTORE`,170:`APP.MOVE`,171:`APP.SIZE`,172:`APP.MINIMIZE`,173:`APP.MAXIMIZE`,174:`BRING.TO.FRONT`,175:`SEND.TO.BACK`,185:`MAIN.CHART.TYPE`,186:`OVERLAY.CHART.TYPE`,187:`SELECT.END`,188:`OPEN.MAIL`,189:`SEND.MAIL`,190:`STANDARD.FONT`,191:`CONSOLIDATE`,192:`SORT.SPECIAL`,193:`GALLERY.3D.AREA`,194:`GALLERY.3D.COLUMN`,195:`GALLERY.3D.LINE`,196:`GALLERY.3D.PIE`,197:`VIEW.3D`,198:`GOAL.SEEK`,199:`WORKGROUP`,200:`FILL.GROUP`,201:`UPDATE.LINK`,202:`PROMOTE`,203:`DEMOTE`,204:`SHOW.DETAIL`,206:`UNGROUP`,207:`OBJECT.PROPERTIES`,208:`SAVE.NEW.OBJECT`,209:`SHARE`,210:`SHARE.NAME`,211:`DUPLICATE`,212:`APPLY.STYLE`,213:`ASSIGN.TO.OBJECT`,214:`OBJECT.PROTECTION`,215:`HIDE.OBJECT`,216:`SET.EXTRACT`,217:`CREATE.PUBLISHER`,218:`SUBSCRIBE.TO`,219:`ATTRIBUTES`,220:`SHOW.TOOLBAR`,222:`PRINT.PREVIEW`,223:`EDIT.COLOR`,224:`SHOW.LEVELS`,225:`FORMAT.MAIN`,226:`FORMAT.OVERLAY`,227:`ON.RECALC`,228:`EDIT.SERIES`,229:`DEFINE.STYLE`,240:`LINE.PRINT`,243:`ENTER.DATA`,249:`GALLERY.RADAR`,250:`MERGE.STYLES`,251:`EDITION.OPTIONS`,252:`PASTE.PICTURE`,253:`PASTE.PICTURE.LINK`,254:`SPELLING`,256:`ZOOM`,259:`INSERT.OBJECT`,260:`WINDOW.MINIMIZE`,265:`SOUND.NOTE`,266:`SOUND.PLAY`,267:`FORMAT.SHAPE`,268:`EXTEND.POLYGON`,269:`FORMAT.AUTO`,272:`GALLERY.3D.BAR`,273:`GALLERY.3D.SURFACE`,274:`FILL.AUTO`,276:`CUSTOMIZE.TOOLBAR`,277:`ADD.TOOL`,278:`EDIT.OBJECT`,279:`ON.DOUBLECLICK`,280:`ON.ENTRY`,281:`WORKBOOK.ADD`,282:`WORKBOOK.MOVE`,283:`WORKBOOK.COPY`,284:`WORKBOOK.OPTIONS`,285:`SAVE.WORKSPACE`,288:`CHART.WIZARD`,289:`DELETE.TOOL`,290:`MOVE.TOOL`,291:`WORKBOOK.SELECT`,292:`WORKBOOK.ACTIVATE`,293:`ASSIGN.TO.TOOL`,295:`COPY.TOOL`,296:`RESET.TOOL`,297:`CONSTRAIN.NUMERIC`,298:`PASTE.TOOL`,302:`WORKBOOK.NEW`,305:`SCENARIO.CELLS`,306:`SCENARIO.DELETE`,307:`SCENARIO.ADD`,308:`SCENARIO.EDIT`,309:`SCENARIO.SHOW`,310:`SCENARIO.SHOW.NEXT`,311:`SCENARIO.SUMMARY`,312:`PIVOT.TABLE.WIZARD`,313:`PIVOT.FIELD.PROPERTIES`,314:`PIVOT.FIELD`,315:`PIVOT.ITEM`,316:`PIVOT.ADD.FIELDS`,318:`OPTIONS.CALCULATION`,319:`OPTIONS.EDIT`,320:`OPTIONS.VIEW`,321:`ADDIN.MANAGER`,322:`MENU.EDITOR`,323:`ATTACH.TOOLBARS`,324:`VBAActivate`,325:`OPTIONS.CHART`,328:`VBA.INSERT.FILE`,330:`VBA.PROCEDURE.DEFINITION`,336:`ROUTING.SLIP`,338:`ROUTE.DOCUMENT`,339:`MAIL.LOGON`,342:`INSERT.PICTURE`,343:`EDIT.TOOL`,344:`GALLERY.DOUGHNUT`,350:`CHART.TREND`,352:`PIVOT.ITEM.PROPERTIES`,354:`WORKBOOK.INSERT`,355:`OPTIONS.TRANSITION`,356:`OPTIONS.GENERAL`,370:`FILTER.ADVANCED`,373:`MAIL.ADD.MAILER`,374:`MAIL.DELETE.MAILER`,375:`MAIL.REPLY`,376:`MAIL.REPLY.ALL`,377:`MAIL.FORWARD`,378:`MAIL.NEXT.LETTER`,379:`DATA.LABEL`,380:`INSERT.TITLE`,381:`FONT.PROPERTIES`,382:`MACRO.OPTIONS`,383:`WORKBOOK.HIDE`,384:`WORKBOOK.UNHIDE`,385:`WORKBOOK.DELETE`,386:`WORKBOOK.NAME`,388:`GALLERY.CUSTOM`,390:`ADD.CHART.AUTOFORMAT`,391:`DELETE.CHART.AUTOFORMAT`,392:`CHART.ADD.DATA`,393:`AUTO.OUTLINE`,394:`TAB.ORDER`,395:`SHOW.DIALOG`,396:`SELECT.ALL`,397:`UNGROUP.SHEETS`,398:`SUBTOTAL.CREATE`,399:`SUBTOTAL.REMOVE`,400:`RENAME.OBJECT`,412:`WORKBOOK.SCROLL`,413:`WORKBOOK.NEXT`,414:`WORKBOOK.PREV`,415:`WORKBOOK.TAB.SPLIT`,416:`FULL.SCREEN`,417:`WORKBOOK.PROTECT`,420:`SCROLLBAR.PROPERTIES`,421:`PIVOT.SHOW.PAGES`,422:`TEXT.TO.COLUMNS`,423:`FORMAT.CHARTTYPE`,424:`LINK.FORMAT`,425:`TRACER.DISPLAY`,430:`TRACER.NAVIGATE`,431:`TRACER.CLEAR`,432:`TRACER.ERROR`,433:`PIVOT.FIELD.GROUP`,434:`PIVOT.FIELD.UNGROUP`,435:`CHECKBOX.PROPERTIES`,436:`LABEL.PROPERTIES`,437:`LISTBOX.PROPERTIES`,438:`EDITBOX.PROPERTIES`,439:`PIVOT.REFRESH`,440:`LINK.COMBO`,441:`OPEN.TEXT`,442:`HIDE.DIALOG`,443:`SET.DIALOG.FOCUS`,444:`ENABLE.OBJECT`,445:`PUSHBUTTON.PROPERTIES`,446:`SET.DIALOG.DEFAULT`,447:`FILTER`,448:`FILTER.SHOW.ALL`,449:`CLEAR.OUTLINE`,450:`FUNCTION.WIZARD`,451:`ADD.LIST.ITEM`,452:`SET.LIST.ITEM`,453:`REMOVE.LIST.ITEM`,454:`SELECT.LIST.ITEM`,455:`SET.CONTROL.VALUE`,456:`SAVE.COPY.AS`,458:`OPTIONS.LISTS.ADD`,459:`OPTIONS.LISTS.DELETE`,460:`SERIES.AXES`,461:`SERIES.X`,462:`SERIES.Y`,463:`ERRORBAR.X`,464:`ERRORBAR.Y`,465:`FORMAT.CHART`,466:`SERIES.ORDER`,467:`MAIL.LOGOFF`,468:`CLEAR.ROUTING.SLIP`,469:`APP.ACTIVATE.MICROSOFT`,470:`MAIL.EDIT.MAILER`,471:`ON.SHEET`,472:`STANDARD.WIDTH`,473:`SCENARIO.MERGE`,474:`SUMMARY.INFO`,475:`FIND.FILE`,476:`ACTIVE.CELL.FONT`,477:`ENABLE.TIPWIZARD`,478:`VBA.MAKE.ADDIN`,480:`INSERTDATATABLE`,481:`WORKGROUP.OPTIONS`,482:`MAIL.SEND.MAILER`,485:`AUTOCORRECT`,489:`POST.DOCUMENT`,491:`PICKLIST`,493:`VIEW.SHOW`,494:`VIEW.DEFINE`,495:`VIEW.DELETE`,509:`SHEET.BACKGROUND`,510:`INSERT.MAP.OBJECT`,511:`OPTIONS.MENONO`,517:`MSOCHECKS`,518:`NORMAL`,519:`LAYOUT`,520:`RM.PRINT.AREA`,521:`CLEAR.PRINT.AREA`,522:`ADD.PRINT.AREA`,523:`MOVE.BRK`,545:`HIDECURR.NOTE`,546:`HIDEALL.NOTES`,547:`DELETE.NOTE`,548:`TRAVERSE.NOTES`,549:`ACTIVATE.NOTES`,620:`PROTECT.REVISIONS`,621:`UNPROTECT.REVISIONS`,647:`OPTIONS.ME`,653:`WEB.PUBLISH`,667:`NEWWEBQUERY`,673:`PIVOT.TABLE.CHART`,753:`OPTIONS.SAVE`,755:`OPTIONS.SPELL`,808:`HIDEALL.INKANNOTS`},_m={0:`COUNT`,1:`IF`,2:`ISNA`,3:`ISERROR`,4:`SUM`,5:`AVERAGE`,6:`MIN`,7:`MAX`,8:`ROW`,9:`COLUMN`,10:`NA`,11:`NPV`,12:`STDEV`,13:`DOLLAR`,14:`FIXED`,15:`SIN`,16:`COS`,17:`TAN`,18:`ATAN`,19:`PI`,20:`SQRT`,21:`EXP`,22:`LN`,23:`LOG10`,24:`ABS`,25:`INT`,26:`SIGN`,27:`ROUND`,28:`LOOKUP`,29:`INDEX`,30:`REPT`,31:`MID`,32:`LEN`,33:`VALUE`,34:`TRUE`,35:`FALSE`,36:`AND`,37:`OR`,38:`NOT`,39:`MOD`,40:`DCOUNT`,41:`DSUM`,42:`DAVERAGE`,43:`DMIN`,44:`DMAX`,45:`DSTDEV`,46:`VAR`,47:`DVAR`,48:`TEXT`,49:`LINEST`,50:`TREND`,51:`LOGEST`,52:`GROWTH`,53:`GOTO`,54:`HALT`,55:`RETURN`,56:`PV`,57:`FV`,58:`NPER`,59:`PMT`,60:`RATE`,61:`MIRR`,62:`IRR`,63:`RAND`,64:`MATCH`,65:`DATE`,66:`TIME`,67:`DAY`,68:`MONTH`,69:`YEAR`,70:`WEEKDAY`,71:`HOUR`,72:`MINUTE`,73:`SECOND`,74:`NOW`,75:`AREAS`,76:`ROWS`,77:`COLUMNS`,78:`OFFSET`,79:`ABSREF`,80:`RELREF`,81:`ARGUMENT`,82:`SEARCH`,83:`TRANSPOSE`,84:`ERROR`,85:`STEP`,86:`TYPE`,87:`ECHO`,88:`SET.NAME`,89:`CALLER`,90:`DEREF`,91:`WINDOWS`,92:`SERIES`,93:`DOCUMENTS`,94:`ACTIVE.CELL`,95:`SELECTION`,96:`RESULT`,97:`ATAN2`,98:`ASIN`,99:`ACOS`,100:`CHOOSE`,101:`HLOOKUP`,102:`VLOOKUP`,103:`LINKS`,104:`INPUT`,105:`ISREF`,106:`GET.FORMULA`,107:`GET.NAME`,108:`SET.VALUE`,109:`LOG`,110:`EXEC`,111:`CHAR`,112:`LOWER`,113:`UPPER`,114:`PROPER`,115:`LEFT`,116:`RIGHT`,117:`EXACT`,118:`TRIM`,119:`REPLACE`,120:`SUBSTITUTE`,121:`CODE`,122:`NAMES`,123:`DIRECTORY`,124:`FIND`,125:`CELL`,126:`ISERR`,127:`ISTEXT`,128:`ISNUMBER`,129:`ISBLANK`,130:`T`,131:`N`,132:`FOPEN`,133:`FCLOSE`,134:`FSIZE`,135:`FREADLN`,136:`FREAD`,137:`FWRITELN`,138:`FWRITE`,139:`FPOS`,140:`DATEVALUE`,141:`TIMEVALUE`,142:`SLN`,143:`SYD`,144:`DDB`,145:`GET.DEF`,146:`REFTEXT`,147:`TEXTREF`,148:`INDIRECT`,149:`REGISTER`,150:`CALL`,151:`ADD.BAR`,152:`ADD.MENU`,153:`ADD.COMMAND`,154:`ENABLE.COMMAND`,155:`CHECK.COMMAND`,156:`RENAME.COMMAND`,157:`SHOW.BAR`,158:`DELETE.MENU`,159:`DELETE.COMMAND`,160:`GET.CHART.ITEM`,161:`DIALOG.BOX`,162:`CLEAN`,163:`MDETERM`,164:`MINVERSE`,165:`MMULT`,166:`FILES`,167:`IPMT`,168:`PPMT`,169:`COUNTA`,170:`CANCEL.KEY`,171:`FOR`,172:`WHILE`,173:`BREAK`,174:`NEXT`,175:`INITIATE`,176:`REQUEST`,177:`POKE`,178:`EXECUTE`,179:`TERMINATE`,180:`RESTART`,181:`HELP`,182:`GET.BAR`,183:`PRODUCT`,184:`FACT`,185:`GET.CELL`,186:`GET.WORKSPACE`,187:`GET.WINDOW`,188:`GET.DOCUMENT`,189:`DPRODUCT`,190:`ISNONTEXT`,191:`GET.NOTE`,192:`NOTE`,193:`STDEVP`,194:`VARP`,195:`DSTDEVP`,196:`DVARP`,197:`TRUNC`,198:`ISLOGICAL`,199:`DCOUNTA`,200:`DELETE.BAR`,201:`UNREGISTER`,204:`USDOLLAR`,205:`FINDB`,206:`SEARCHB`,207:`REPLACEB`,208:`LEFTB`,209:`RIGHTB`,210:`MIDB`,211:`LENB`,212:`ROUNDUP`,213:`ROUNDDOWN`,214:`ASC`,215:`DBCS`,216:`RANK`,219:`ADDRESS`,220:`DAYS360`,221:`TODAY`,222:`VDB`,223:`ELSE`,224:`ELSE.IF`,225:`END.IF`,226:`FOR.CELL`,227:`MEDIAN`,228:`SUMPRODUCT`,229:`SINH`,230:`COSH`,231:`TANH`,232:`ASINH`,233:`ACOSH`,234:`ATANH`,235:`DGET`,236:`CREATE.OBJECT`,237:`VOLATILE`,238:`LAST.ERROR`,239:`CUSTOM.UNDO`,240:`CUSTOM.REPEAT`,241:`FORMULA.CONVERT`,242:`GET.LINK.INFO`,243:`TEXT.BOX`,244:`INFO`,245:`GROUP`,246:`GET.OBJECT`,247:`DB`,248:`PAUSE`,251:`RESUME`,252:`FREQUENCY`,253:`ADD.TOOLBAR`,254:`DELETE.TOOLBAR`,255:`User`,256:`RESET.TOOLBAR`,257:`EVALUATE`,258:`GET.TOOLBAR`,259:`GET.TOOL`,260:`SPELLING.CHECK`,261:`ERROR.TYPE`,262:`APP.TITLE`,263:`WINDOW.TITLE`,264:`SAVE.TOOLBAR`,265:`ENABLE.TOOL`,266:`PRESS.TOOL`,267:`REGISTER.ID`,268:`GET.WORKBOOK`,269:`AVEDEV`,270:`BETADIST`,271:`GAMMALN`,272:`BETAINV`,273:`BINOMDIST`,274:`CHIDIST`,275:`CHIINV`,276:`COMBIN`,277:`CONFIDENCE`,278:`CRITBINOM`,279:`EVEN`,280:`EXPONDIST`,281:`FDIST`,282:`FINV`,283:`FISHER`,284:`FISHERINV`,285:`FLOOR`,286:`GAMMADIST`,287:`GAMMAINV`,288:`CEILING`,289:`HYPGEOMDIST`,290:`LOGNORMDIST`,291:`LOGINV`,292:`NEGBINOMDIST`,293:`NORMDIST`,294:`NORMSDIST`,295:`NORMINV`,296:`NORMSINV`,297:`STANDARDIZE`,298:`ODD`,299:`PERMUT`,300:`POISSON`,301:`TDIST`,302:`WEIBULL`,303:`SUMXMY2`,304:`SUMX2MY2`,305:`SUMX2PY2`,306:`CHITEST`,307:`CORREL`,308:`COVAR`,309:`FORECAST`,310:`FTEST`,311:`INTERCEPT`,312:`PEARSON`,313:`RSQ`,314:`STEYX`,315:`SLOPE`,316:`TTEST`,317:`PROB`,318:`DEVSQ`,319:`GEOMEAN`,320:`HARMEAN`,321:`SUMSQ`,322:`KURT`,323:`SKEW`,324:`ZTEST`,325:`LARGE`,326:`SMALL`,327:`QUARTILE`,328:`PERCENTILE`,329:`PERCENTRANK`,330:`MODE`,331:`TRIMMEAN`,332:`TINV`,334:`MOVIE.COMMAND`,335:`GET.MOVIE`,336:`CONCATENATE`,337:`POWER`,338:`PIVOT.ADD.DATA`,339:`GET.PIVOT.TABLE`,340:`GET.PIVOT.FIELD`,341:`GET.PIVOT.ITEM`,342:`RADIANS`,343:`DEGREES`,344:`SUBTOTAL`,345:`SUMIF`,346:`COUNTIF`,347:`COUNTBLANK`,348:`SCENARIO.GET`,349:`OPTIONS.LISTS.GET`,350:`ISPMT`,351:`DATEDIF`,352:`DATESTRING`,353:`NUMBERSTRING`,354:`ROMAN`,355:`OPEN.DIALOG`,356:`SAVE.DIALOG`,357:`VIEW.GET`,358:`GETPIVOTDATA`,359:`HYPERLINK`,360:`PHONETIC`,361:`AVERAGEA`,362:`MAXA`,363:`MINA`,364:`STDEVPA`,365:`VARPA`,366:`STDEVA`,367:`VARA`,368:`BAHTTEXT`,369:`THAIDAYOFWEEK`,370:`THAIDIGIT`,371:`THAIMONTHOFYEAR`,372:`THAINUMSOUND`,373:`THAINUMSTRING`,374:`THAISTRINGLENGTH`,375:`ISTHAIDIGIT`,376:`ROUNDBAHTDOWN`,377:`ROUNDBAHTUP`,378:`THAIYEAR`,379:`RTD`,380:`CUBEVALUE`,381:`CUBEMEMBER`,382:`CUBEMEMBERPROPERTY`,383:`CUBERANKEDMEMBER`,384:`HEX2BIN`,385:`HEX2DEC`,386:`HEX2OCT`,387:`DEC2BIN`,388:`DEC2HEX`,389:`DEC2OCT`,390:`OCT2BIN`,391:`OCT2HEX`,392:`OCT2DEC`,393:`BIN2DEC`,394:`BIN2OCT`,395:`BIN2HEX`,396:`IMSUB`,397:`IMDIV`,398:`IMPOWER`,399:`IMABS`,400:`IMSQRT`,401:`IMLN`,402:`IMLOG2`,403:`IMLOG10`,404:`IMSIN`,405:`IMCOS`,406:`IMEXP`,407:`IMARGUMENT`,408:`IMCONJUGATE`,409:`IMAGINARY`,410:`IMREAL`,411:`COMPLEX`,412:`IMSUM`,413:`IMPRODUCT`,414:`SERIESSUM`,415:`FACTDOUBLE`,416:`SQRTPI`,417:`QUOTIENT`,418:`DELTA`,419:`GESTEP`,420:`ISEVEN`,421:`ISODD`,422:`MROUND`,423:`ERF`,424:`ERFC`,425:`BESSELJ`,426:`BESSELK`,427:`BESSELY`,428:`BESSELI`,429:`XIRR`,430:`XNPV`,431:`PRICEMAT`,432:`YIELDMAT`,433:`INTRATE`,434:`RECEIVED`,435:`DISC`,436:`PRICEDISC`,437:`YIELDDISC`,438:`TBILLEQ`,439:`TBILLPRICE`,440:`TBILLYIELD`,441:`PRICE`,442:`YIELD`,443:`DOLLARDE`,444:`DOLLARFR`,445:`NOMINAL`,446:`EFFECT`,447:`CUMPRINC`,448:`CUMIPMT`,449:`EDATE`,450:`EOMONTH`,451:`YEARFRAC`,452:`COUPDAYBS`,453:`COUPDAYS`,454:`COUPDAYSNC`,455:`COUPNCD`,456:`COUPNUM`,457:`COUPPCD`,458:`DURATION`,459:`MDURATION`,460:`ODDLPRICE`,461:`ODDLYIELD`,462:`ODDFPRICE`,463:`ODDFYIELD`,464:`RANDBETWEEN`,465:`WEEKNUM`,466:`AMORDEGRC`,467:`AMORLINC`,468:`CONVERT`,724:`SHEETJS`,469:`ACCRINT`,470:`ACCRINTM`,471:`WORKDAY`,472:`NETWORKDAYS`,473:`GCD`,474:`MULTINOMIAL`,475:`LCM`,476:`FVSCHEDULE`,477:`CUBEKPIMEMBER`,478:`CUBESET`,479:`CUBESETCOUNT`,480:`IFERROR`,481:`COUNTIFS`,482:`SUMIFS`,483:`AVERAGEIF`,484:`AVERAGEIFS`},vm={2:1,3:1,10:0,15:1,16:1,17:1,18:1,19:0,20:1,21:1,22:1,23:1,24:1,25:1,26:1,27:2,30:2,31:3,32:1,33:1,34:0,35:0,38:1,39:2,40:3,41:3,42:3,43:3,44:3,45:3,47:3,48:2,53:1,61:3,63:0,65:3,66:3,67:1,68:1,69:1,70:1,71:1,72:1,73:1,74:0,75:1,76:1,77:1,79:2,80:2,83:1,85:0,86:1,89:0,90:1,94:0,95:0,97:2,98:1,99:1,101:3,102:3,105:1,106:1,108:2,111:1,112:1,113:1,114:1,117:2,118:1,119:4,121:1,126:1,127:1,128:1,129:1,130:1,131:1,133:1,134:1,135:1,136:2,137:2,138:2,140:1,141:1,142:3,143:4,144:4,161:1,162:1,163:1,164:1,165:2,172:1,175:2,176:2,177:3,178:2,179:1,184:1,186:1,189:3,190:1,195:3,196:3,197:1,198:1,199:3,201:1,207:4,210:3,211:1,212:2,213:2,214:1,215:1,225:0,229:1,230:1,231:1,232:1,233:1,234:1,235:3,244:1,247:4,252:2,257:1,261:1,271:1,273:4,274:2,275:2,276:2,277:3,278:3,279:1,280:3,281:3,282:3,283:1,284:1,285:2,286:4,287:3,288:2,289:4,290:3,291:3,292:3,293:4,294:1,295:3,296:1,297:3,298:1,299:2,300:3,301:3,302:4,303:2,304:2,305:2,306:2,307:2,308:2,309:3,310:2,311:2,312:2,313:2,314:2,315:2,316:4,325:2,326:2,327:2,328:2,331:2,332:2,337:2,342:1,343:1,346:2,347:1,350:4,351:3,352:1,353:2,360:1,368:1,369:1,370:1,371:1,372:1,373:1,374:1,375:1,376:1,377:1,378:1,382:3,385:1,392:1,393:1,396:2,397:2,398:2,399:1,400:1,401:1,402:1,403:1,404:1,405:1,406:1,407:1,408:1,409:1,410:1,414:4,415:1,416:1,417:2,420:1,421:1,422:2,424:1,425:2,426:2,427:2,428:2,430:3,438:3,439:3,440:3,443:2,444:2,445:2,446:2,447:6,448:6,449:2,450:2,464:2,468:3,476:2,479:1,480:2,65535:0};function ym(e){return e.slice(0,3)==`of:`&&(e=e.slice(3)),e.charCodeAt(0)==61&&(e=e.slice(1),e.charCodeAt(0)==61&&(e=e.slice(1))),e=e.replace(/COM\.MICROSOFT\./g,``),e=e.replace(/\[((?:\.[A-Z]+[0-9]+)(?::\.[A-Z]+[0-9]+)?)\]/g,function(e,t){return t.replace(/\./g,``)}),e=e.replace(/\[.(#[A-Z]*[?!])\]/g,`$1`),e.replace(/[;~]/g,`,`).replace(/\|/g,`;`)}function bm(e){return(`of:=`+e.replace(Sf,`$1[.$2$3$4$5]`).replace(/\]:\[/g,`:`)).replace(/;/g,`|`).replace(/,/g,`;`)}function xm(e){var t=e.split(`:`);return[t[0].split(`.`)[0],t[0].split(`.`)[1]+(t.length>1?`:`+(t[1].split(`.`)[1]||t[1].split(`.`)[0]):``)]}function Sm(e){return e.replace(/\./,`!`)}var Cm={},wm={},Tm=typeof Map<`u`;function Em(e,t,n){var r=0,i=e.length;if(n){if(Tm?n.has(t):Object.prototype.hasOwnProperty.call(n,t)){for(var a=Tm?n.get(t):n[t];r<a.length;++r)if(e[a[r]].t===t)return e.Count++,a[r]}}else for(;r<i;++r)if(e[r].t===t)return e.Count++,r;return e[i]={t},e.Count++,e.Unique++,n&&(Tm?(n.has(t)||n.set(t,[]),n.get(t).push(i)):(Object.prototype.hasOwnProperty.call(n,t)||(n[t]=[]),n[t].push(i))),i}function Dm(e,t){var n={min:e+1,max:e+1},r=-1;return t.MDW&&(Su=t.MDW),t.width==null?t.wpx==null?t.wch!=null&&(r=t.wch):r=wu(t.wpx):n.customWidth=1,r>-1?(n.width=Tu(r),n.customWidth=1):t.width!=null&&(n.width=t.width),t.hidden&&(n.hidden=!0),t.level!=null&&(n.outlineLevel=n.level=t.level),n}function Om(e,t){if(e){var n=[.7,.7,.75,.75,.3,.3];t==`xlml`&&(n=[1,1,1,1,.5,.5]),e.left??=n[0],e.right??=n[1],e.top??=n[2],e.bottom??=n[3],e.header??=n[4],e.footer??=n[5]}}function km(e,t,n){var r=n.revssf[t.z==null?`General`:t.z],i=60,a=e.length;if(r==null&&n.ssf){for(;i<392;++i)if(n.ssf[i]==null){Xt(t.z,i),n.ssf[i]=t.z,n.revssf[t.z]=r=i;break}}for(i=0;i!=a;++i)if(e[i].numFmtId===r)return i;return e[a]={numFmtId:r,fontId:0,fillId:0,borderId:0,xfId:0,applyNumberFormat:1},a}function Am(e,t,n,r,i,a){try{r.cellNF&&(e.z=H[t])}catch(e){if(r.WTF)throw e}if(!(e.t===`z`&&!r.cellStyles)){if(e.t===`d`&&typeof e.v==`string`&&(e.v=wn(e.v)),(!r||r.cellText!==!1)&&e.t!==`z`)try{if(H[t]??Xt($t[t]||`General`,t),e.t===`e`)e.w=e.w||Ha[e.v];else if(t===0)if(e.t===`n`)(e.v|0)===e.v?e.w=e.v.toString(10):e.w=gt(e.v);else if(e.t===`d`){var o=hn(e.v);(o|0)===o?e.w=o.toString(10):e.w=gt(o)}else if(e.v===void 0)return``;else e.w=_t(e.v,wm);else e.t===`d`?e.w=Yt(t,hn(e.v),wm):e.w=Yt(t,e.v,wm)}catch(e){if(r.WTF)throw e}if(r.cellStyles&&n!=null)try{e.s=a.Fills[n],e.s.fgColor&&e.s.fgColor.theme&&!e.s.fgColor.rgb&&(e.s.fgColor.rgb=vu(i.themeElements.clrScheme[e.s.fgColor.theme].rgb,e.s.fgColor.tint||0),r.WTF&&(e.s.fgColor.raw_rgb=i.themeElements.clrScheme[e.s.fgColor.theme].rgb)),e.s.bgColor&&e.s.bgColor.theme&&(e.s.bgColor.rgb=vu(i.themeElements.clrScheme[e.s.bgColor.theme].rgb,e.s.bgColor.tint||0),r.WTF&&(e.s.bgColor.raw_rgb=i.themeElements.clrScheme[e.s.bgColor.theme].rgb))}catch(e){if(r.WTF&&a.Fills)throw e}}}function jm(e,t,n){if(e&&e[`!ref`]){var r=Fi(e[`!ref`]);if(r.e.c<r.s.c||r.e.r<r.s.r)throw Error(`Bad range (`+n+`): `+e[`!ref`])}}function Mm(e,t){var n=Fi(t);n.s.r<=n.e.r&&n.s.c<=n.e.c&&n.s.r>=0&&n.s.c>=0&&(e[`!ref`]=Pi(n))}var Nm=/<(?:\w:)?mergeCell ref="[A-Z0-9:]+"\s*[\/]?>/g,Pm=/<(?:\w+:)?sheetData[^>]*>([\s\S]*)<\/(?:\w+:)?sheetData>/,Fm=/<(?:\w:)?hyperlink [^>]*>/gm,Im=/"(\w*:\w*)"/,Lm=/<(?:\w:)?col\b[^>]*[\/]?>/g,Rm=/<(?:\w:)?autoFilter[^>]*([\/]|>([\s\S]*)<\/(?:\w:)?autoFilter)>/g,zm=/<(?:\w:)?pageMargins[^>]*\/>/g,Bm=/<(?:\w:)?sheetPr\b(?:[^>a-z][^>]*)?\/>/,Vm=/<(?:\w:)?sheetPr[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetPr)>/,Hm=/<(?:\w:)?sheetViews[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetViews)>/;function Um(e,t,n,r,i,a,o){if(!e)return e;r||={"!id":{}},Oe!=null&&t.dense==null&&(t.dense=Oe);var s=t.dense?[]:{},c={s:{r:2e6,c:2e6},e:{r:0,c:0}},l=``,u=``,d=e.match(Pm);d?(l=e.slice(0,d.index),u=e.slice(d.index+d[0].length)):l=u=e;var f=l.match(Bm);f?Gm(f[0],s,i,n):(f=l.match(Vm))&&Km(f[0],f[1]||``,s,i,n,o,a);var p=(l.match(/<(?:\w*:)?dimension/)||{index:-1}).index;if(p>0){var m=l.slice(p,p+50).match(Im);m&&Mm(s,m[1])}var h=l.match(Hm);h&&h[1]&&ah(h[1],i);var g=[];if(t.cellStyles){var _=l.match(Lm);_&&eh(g,_)}d&&ch(d[1],s,t,c,a,o);var v=u.match(Rm);v&&(s[`!autofilter`]=nh(v[0]));var y=[],b=u.match(Nm);if(b)for(p=0;p!=b.length;++p)y[p]=Fi(b[p].slice(b[p].indexOf(`"`)+1));var x=u.match(Fm);x&&Zm(s,x,r);var S=u.match(zm);if(S&&(s[`!margins`]=Qm(W(S[0]))),!s[`!ref`]&&c.e.c>=c.s.c&&c.e.r>=c.s.r&&(s[`!ref`]=Pi(c)),t.sheetRows>0&&s[`!ref`]){var C=Fi(s[`!ref`]);t.sheetRows<=+C.e.r&&(C.e.r=t.sheetRows-1,C.e.r>c.e.r&&(C.e.r=c.e.r),C.e.r<C.s.r&&(C.s.r=C.e.r),C.e.c>c.e.c&&(C.e.c=c.e.c),C.e.c<C.s.c&&(C.s.c=C.e.c),s[`!fullref`]=s[`!ref`],s[`!ref`]=Pi(C))}return g.length>0&&(s[`!cols`]=g),y.length>0&&(s[`!merges`]=y),s}function Wm(e){if(e.length===0)return``;for(var t=`<mergeCells count="`+e.length+`">`,n=0;n!=e.length;++n)t+=`<mergeCell ref="`+Pi(e[n])+`"/>`;return t+`</mergeCells>`}function Gm(e,t,n,r){var i=W(e);n.Sheets[r]||(n.Sheets[r]={}),i.codeName&&(n.Sheets[r].CodeName=er(hr(i.codeName)))}function Km(e,t,n,r,i){Gm(e.slice(0,e.indexOf(`>`)),n,r,i)}function qm(e,t,n,r,i){var a=!1,o={},s=null;if(r.bookType!==`xlsx`&&t.vbaraw){var c=t.SheetNames[n];try{t.Workbook&&(c=t.Workbook.Sheets[n].CodeName||c)}catch{}a=!0,o.codeName=gr(rr(c))}if(e&&e[`!outline`]){var l={summaryBelow:1,summaryRight:1};e[`!outline`].above&&(l.summaryBelow=0),e[`!outline`].left&&(l.summaryRight=0),s=(s||``)+G(`outlinePr`,null,l)}!a&&!s||(i[i.length]=G(`sheetPr`,s,o))}var Jm=[`objects`,`scenarios`,`selectLockedCells`,`selectUnlockedCells`],Ym=[`formatColumns`,`formatRows`,`formatCells`,`insertColumns`,`insertRows`,`insertHyperlinks`,`deleteColumns`,`deleteRows`,`sort`,`autoFilter`,`pivotTables`];function Xm(e){var t={sheet:1};return Jm.forEach(function(n){e[n]!=null&&e[n]&&(t[n]=`1`)}),Ym.forEach(function(n){e[n]!=null&&!e[n]&&(t[n]=`0`)}),e.password&&(t.password=ou(e.password).toString(16).toUpperCase()),G(`sheetProtection`,null,t)}function Zm(e,t,n){for(var r=Array.isArray(e),i=0;i!=t.length;++i){var a=W(hr(t[i]),!0);if(!a.ref)return;var o=((n||{})[`!id`]||[])[a.id];o?(a.Target=o.Target,a.location&&(a.Target+=`#`+er(a.location))):(a.Target=`#`+er(a.location),o={Target:a.Target,TargetMode:`Internal`}),a.Rel=o,a.tooltip&&(a.Tooltip=a.tooltip,delete a.tooltip);for(var s=Fi(a.ref),c=s.s.r;c<=s.e.r;++c)for(var l=s.s.c;l<=s.e.c;++l){var u=J({c:l,r:c});r?(e[c]||(e[c]=[]),e[c][l]||(e[c][l]={t:`z`,v:void 0}),e[c][l].l=a):(e[u]||(e[u]={t:`z`,v:void 0}),e[u].l=a)}}}function Qm(e){var t={};return[`left`,`right`,`top`,`bottom`,`header`,`footer`].forEach(function(n){e[n]&&(t[n]=parseFloat(e[n]))}),t}function $m(e){return Om(e),G(`pageMargins`,null,e)}function eh(e,t){for(var n=!1,r=0;r!=t.length;++r){var i=W(t[r],!0);i.hidden&&=ur(i.hidden);var a=parseInt(i.min,10)-1,o=parseInt(i.max,10)-1;for(i.outlineLevel&&(i.level=+i.outlineLevel||0),delete i.min,delete i.max,i.width=+i.width,!n&&i.width&&(n=!0,Du(i.width)),Ou(i);a<=o;)e[a++]=En(i)}}function th(e,t){for(var n=[`<cols>`],r,i=0;i!=t.length;++i)(r=t[i])&&(n[n.length]=G(`col`,null,Dm(i,r)));return n[n.length]=`</cols>`,n.join(``)}function nh(e){return{ref:(e.match(/ref="([^"]*)"/)||[])[1]}}function rh(e,t,n,r){var i=typeof e.ref==`string`?e.ref:Pi(e.ref);n.Workbook||={Sheets:[]},n.Workbook.Names||(n.Workbook.Names=[]);var a=n.Workbook.Names,o=Ni(i);o.s.r==o.e.r&&(o.e.r=Ni(t[`!ref`]).e.r,i=Pi(o));for(var s=0;s<a.length;++s){var c=a[s];if(c.Name==`_xlnm._FilterDatabase`&&c.Sheet==r){c.Ref=`'`+n.SheetNames[r]+`'!`+i;break}}return s==a.length&&a.push({Name:`_xlnm._FilterDatabase`,Sheet:r,Ref:`'`+n.SheetNames[r]+`'!`+i}),G(`autoFilter`,null,{ref:i})}var ih=/<(?:\w:)?sheetView(?:[^>a-z][^>]*)?\/?>/;function ah(e,t){t.Views||=[{}],(e.match(ih)||[]).forEach(function(e,n){var r=W(e);t.Views[n]||(t.Views[n]={}),+r.zoomScale&&(t.Views[n].zoom=+r.zoomScale),ur(r.rightToLeft)&&(t.Views[n].RTL=!0)})}function oh(e,t,n,r){var i={workbookViewId:`0`};return(((r||{}).Workbook||{}).Views||[])[0]&&(i.rightToLeft=r.Workbook.Views[0].RTL?`1`:`0`),G(`sheetViews`,G(`sheetView`,null,i),{})}function sh(e,t,n,r){if(e.c&&n[`!comments`].push([t,e.c]),e.v===void 0&&typeof e.f!=`string`||e.t===`z`&&!e.f)return``;var i=``,a=e.t,o=e.v;if(e.t!==`z`)switch(e.t){case`b`:i=e.v?`1`:`0`;break;case`n`:i=``+e.v;break;case`e`:i=Ha[e.v];break;case`d`:r&&r.cellDates?i=wn(e.v,-1).toISOString():(e=En(e),e.t=`n`,i=``+(e.v=hn(wn(e.v)))),e.z===void 0&&(e.z=H[14]);break;default:i=e.v;break}var s=wr(`v`,rr(i)),c={r:t},l=km(r.cellXfs,e,r);switch(l!==0&&(c.s=l),e.t){case`n`:break;case`d`:c.t=`d`;break;case`b`:c.t=`b`;break;case`e`:c.t=`e`;break;case`z`:break;default:if(e.v==null){delete e.t;break}if(e.v.length>32767)throw Error(`Text length must not exceed 32767 characters`);if(r&&r.bookSST){s=wr(`v`,``+Em(r.Strings,e.v,r.revStrings)),c.t=`s`;break}c.t=`str`;break}if(e.t!=a&&(e.t=a,e.v=o),typeof e.f==`string`&&e.f){var u=e.F&&e.F.slice(0,t.length)==t?{t:`array`,ref:e.F}:null;s=G(`f`,rr(e.f),u)+(e.v==null?``:s)}return e.l&&n[`!links`].push([t,e.l]),e.D&&(c.cm=1),G(`c`,s,c)}var ch=(function(){var e=/<(?:\w+:)?c[ \/>]/,t=/<\/(?:\w+:)?row>/,n=/r=["']([^"']*)["']/,r=/<(?:\w+:)?is>([\S\s]*?)<\/(?:\w+:)?is>/,i=/ref=["']([^"']*)["']/,a=_r(`v`),o=_r(`f`);return function(s,c,l,u,d,f){for(var p=0,m=``,h=[],g=[],_=0,v=0,y=0,b=``,x,S,C=0,w=0,T,E,D=0,O=0,k=Array.isArray(f.CellXf),A,j=[],M=[],N=Array.isArray(c),P=[],F={},I=!1,L=!!l.sheetStubs,R=s.split(t),ee=0,te=R.length;ee!=te;++ee){m=R[ee].trim();var ne=m.length;if(ne!==0){var re=0;outa:for(p=0;p<ne;++p)switch(m[p]){case`>`:if(m[p-1]!=`/`){++p;break outa}if(l&&l.cellStyles){if(S=W(m.slice(re,p),!0),C=S.r==null?C+1:parseInt(S.r,10),w=-1,l.sheetRows&&l.sheetRows<C)continue;F={},I=!1,S.ht&&(I=!0,F.hpt=parseFloat(S.ht),F.hpx=ju(F.hpt)),S.hidden==`1`&&(I=!0,F.hidden=!0),S.outlineLevel!=null&&(I=!0,F.level=+S.outlineLevel),I&&(P[C-1]=F)}break;case`<`:re=p;break}if(re>=p)break;if(S=W(m.slice(re,p),!0),C=S.r==null?C+1:parseInt(S.r,10),w=-1,!(l.sheetRows&&l.sheetRows<C)){u.s.r>C-1&&(u.s.r=C-1),u.e.r<C-1&&(u.e.r=C-1),l&&l.cellStyles&&(F={},I=!1,S.ht&&(I=!0,F.hpt=parseFloat(S.ht),F.hpx=ju(F.hpt)),S.hidden==`1`&&(I=!0,F.hidden=!0),S.outlineLevel!=null&&(I=!0,F.level=+S.outlineLevel),I&&(P[C-1]=F)),h=m.slice(p).split(e);for(var ie=0;ie!=h.length&&h[ie].trim().charAt(0)==`<`;++ie);for(h=h.slice(ie),p=0;p!=h.length;++p)if(m=h[p].trim(),m.length!==0){if(g=m.match(n),_=p,v=0,y=0,m=`<c `+(m.slice(0,1)==`<`?`>`:``)+m,g!=null&&g.length===2){for(_=0,b=g[1],v=0;v!=b.length&&!((y=b.charCodeAt(v)-64)<1||y>26);++v)_=26*_+y;--_,w=_}else ++w;for(v=0;v!=m.length&&m.charCodeAt(v)!==62;++v);if(++v,S=W(m.slice(0,v),!0),S.r||=J({r:C-1,c:w}),b=m.slice(v),x={t:``},(g=b.match(a))!=null&&g[1]!==``&&(x.v=er(g[1])),l.cellFormula){if((g=b.match(o))!=null&&g[1]!==``){if(x.f=er(hr(g[1])).replace(/\r\n/g,`
`),l.xlfn||(x.f=Df(x.f)),g[0].indexOf(`t="array"`)>-1)x.F=(b.match(i)||[])[1],x.F.indexOf(`:`)>-1&&j.push([Fi(x.F),x.F]);else if(g[0].indexOf(`t="shared"`)>-1){E=W(g[0]);var z=er(hr(g[1]));l.xlfn||(z=Df(z)),M[parseInt(E.si,10)]=[E,z,S.r]}}else (g=b.match(/<f[^>]*\/>/))&&(E=W(g[0]),M[E.si]&&(x.f=Tf(M[E.si][1],M[E.si][2],S.r)));var B=Mi(S.r);for(v=0;v<j.length;++v)B.r>=j[v][0].s.r&&B.r<=j[v][0].e.r&&B.c>=j[v][0].s.c&&B.c<=j[v][0].e.c&&(x.F=j[v][1])}if(S.t==null&&x.v===void 0)if(x.f||x.F)x.v=0,x.t=`n`;else if(L)x.t=`z`;else continue;else x.t=S.t||`n`;switch(u.s.c>w&&(u.s.c=w),u.e.c<w&&(u.e.c=w),x.t){case`n`:if(x.v==``||x.v==null){if(!L)continue;x.t=`z`}else x.v=parseFloat(x.v);break;case`s`:if(x.v===void 0){if(!L)continue;x.t=`z`}else T=Cm[parseInt(x.v,10)],x.v=T.t,x.r=T.r,l.cellHTML&&(x.h=T.h);break;case`str`:x.t=`s`,x.v=x.v==null?``:hr(x.v),l.cellHTML&&(x.h=or(x.v));break;case`inlineStr`:g=b.match(r),x.t=`s`,g!=null&&(T=Ml(g[1]))?(x.v=T.t,l.cellHTML&&(x.h=T.h)):x.v=``;break;case`b`:x.v=ur(x.v);break;case`d`:l.cellDates?x.v=wn(x.v,1):(x.v=hn(wn(x.v,1)),x.t=`n`);break;case`e`:(!l||l.cellText!==!1)&&(x.w=x.v),x.v=Ua[x.v];break}if(D=O=0,A=null,k&&S.s!==void 0&&(A=f.CellXf[S.s],A!=null&&(A.numFmtId!=null&&(D=A.numFmtId),l.cellStyles&&A.fillId!=null&&(O=A.fillId))),Am(x,D,O,l,d,f),l.cellDates&&k&&x.t==`n`&&Wt(H[D])&&(x.t=`d`,x.v=yn(x.v)),S.cm&&l.xlmeta){var ae=(l.xlmeta.Cell||[])[S.cm-1];ae&&ae.type==`XLDAPR`&&(x.D=!0)}if(N){var oe=Mi(S.r);c[oe.r]||(c[oe.r]=[]),c[oe.r][oe.c]=x}else c[S.r]=x}}}}P.length>0&&(c[`!rows`]=P)}})();function lh(e,t,n,r){var i=[],a=[],o=Fi(e[`!ref`]),s=``,c,l=``,u=[],d=0,f=0,p=e[`!rows`],m=Array.isArray(e),h={r:l},g,_=-1;for(f=o.s.c;f<=o.e.c;++f)u[f]=Oi(f);for(d=o.s.r;d<=o.e.r;++d){for(a=[],l=wi(d),f=o.s.c;f<=o.e.c;++f){c=u[f]+l;var v=m?(e[d]||[])[f]:e[c];v!==void 0&&(s=sh(v,c,e,t,n,r))!=null&&a.push(s)}(a.length>0||p&&p[d])&&(h={r:l},p&&p[d]&&(g=p[d],g.hidden&&(h.hidden=1),_=-1,g.hpx?_=Au(g.hpx):g.hpt&&(_=g.hpt),_>-1&&(h.ht=_,h.customHeight=1),g.level&&(h.outlineLevel=g.level)),i[i.length]=G(`row`,a.join(``),h))}if(p)for(;d<p.length;++d)p&&p[d]&&(h={r:d+1},g=p[d],g.hidden&&(h.hidden=1),_=-1,g.hpx?_=Au(g.hpx):g.hpt&&(_=g.hpt),_>-1&&(h.ht=_,h.customHeight=1),g.level&&(h.outlineLevel=g.level),i[i.length]=G(`row`,``,h));return i.join(``)}function uh(e,t,n,r){var i=[Gn,G(`worksheet`,null,{xmlns:jr[0],"xmlns:r":Ar.r})],a=n.SheetNames[e],o=0,s=``,c=n.Sheets[a];c??={};var l=c[`!ref`]||`A1`,u=Fi(l);if(u.e.c>16383||u.e.r>1048575){if(t.WTF)throw Error(`Range `+l+` exceeds format limit A1:XFD1048576`);u.e.c=Math.min(u.e.c,16383),u.e.r=Math.min(u.e.c,1048575),l=Pi(u)}r||={},c[`!comments`]=[];var d=[];qm(c,n,e,t,i),i[i.length]=G(`dimension`,null,{ref:l}),i[i.length]=oh(c,t,e,n),t.sheetFormat&&(i[i.length]=G(`sheetFormatPr`,null,{defaultRowHeight:t.sheetFormat.defaultRowHeight||`16`,baseColWidth:t.sheetFormat.baseColWidth||`10`,outlineLevelRow:t.sheetFormat.outlineLevelRow||`7`})),c[`!cols`]!=null&&c[`!cols`].length>0&&(i[i.length]=th(c,c[`!cols`])),i[o=i.length]=`<sheetData/>`,c[`!links`]=[],c[`!ref`]!=null&&(s=lh(c,t,e,n,r),s.length>0&&(i[i.length]=s)),i.length>o+1&&(i[i.length]=`</sheetData>`,i[o]=i[o].replace(`/>`,`>`)),c[`!protect`]&&(i[i.length]=Xm(c[`!protect`])),c[`!autofilter`]!=null&&(i[i.length]=rh(c[`!autofilter`],c,n,e)),c[`!merges`]!=null&&c[`!merges`].length>0&&(i[i.length]=Wm(c[`!merges`]));var f=-1,p,m=-1;return c[`!links`].length>0&&(i[i.length]=`<hyperlinks>`,c[`!links`].forEach(function(e){e[1].Target&&(p={ref:e[0]},e[1].Target.charAt(0)!=`#`&&(m=$a(r,-1,rr(e[1].Target).replace(/#.*$/,``),Ya.HLINK),p[`r:id`]=`rId`+m),(f=e[1].Target.indexOf(`#`))>-1&&(p.location=rr(e[1].Target.slice(f+1))),e[1].Tooltip&&(p.tooltip=rr(e[1].Tooltip)),i[i.length]=G(`hyperlink`,null,p))}),i[i.length]=`</hyperlinks>`),delete c[`!links`],c[`!margins`]!=null&&(i[i.length]=$m(c[`!margins`])),(!t||t.ignoreEC||t.ignoreEC==null)&&(i[i.length]=wr(`ignoredErrors`,G(`ignoredError`,null,{numberStoredAsText:1,sqref:l}))),d.length>0&&(m=$a(r,-1,`../drawings/drawing`+(e+1)+`.xml`,Ya.DRAW),i[i.length]=G(`drawing`,null,{"r:id":`rId`+m}),c[`!drawing`]=d),c[`!comments`].length>0&&(m=$a(r,-1,`../drawings/vmlDrawing`+(e+1)+`.vml`,Ya.VML),i[i.length]=G(`legacyDrawing`,null,{"r:id":`rId`+m}),c[`!legacy`]=m),i.length>1&&(i[i.length]=`</worksheet>`,i[1]=i[1].replace(`/>`,`>`)),i.join(``)}function dh(e,t){var n={},r=e.l+t;n.r=e.read_shift(4),e.l+=4;var i=e.read_shift(2);e.l+=1;var a=e.read_shift(1);return e.l=r,a&7&&(n.level=a&7),a&16&&(n.hidden=!0),a&32&&(n.hpt=i/20),n}function fh(e,t,n){var r=K(145),i=(n[`!rows`]||[])[e]||{};r.write_shift(4,e),r.write_shift(4,0);var a=320;i.hpx?a=Au(i.hpx)*20:i.hpt&&(a=i.hpt*20),r.write_shift(2,a),r.write_shift(1,0);var o=0;i.level&&(o|=i.level),i.hidden&&(o|=16),(i.hpx||i.hpt)&&(o|=32),r.write_shift(1,o),r.write_shift(1,0);var s=0,c=r.l;r.l+=4;for(var l={r:e,c:0},u=0;u<16;++u)if(!(t.s.c>u+1<<10||t.e.c<u<<10)){for(var d=-1,f=-1,p=u<<10;p<u+1<<10;++p)l.c=p,(Array.isArray(n)?(n[l.r]||[])[l.c]:n[J(l)])&&(d<0&&(d=p),f=p);d<0||(++s,r.write_shift(4,d),r.write_shift(4,f))}var m=r.l;return r.l=c,r.write_shift(4,s),r.l=m,r.length>r.l?r.slice(0,r.l):r}function ph(e,t,n,r){var i=fh(r,n,t);(i.length>17||(t[`!rows`]||[])[r])&&q(e,0,i)}var mh=fa,hh=pa;function gh(){}function _h(e,t){var n={},r=e[e.l];return++e.l,n.above=!(r&64),n.left=!(r&128),e.l+=18,n.name=ta(e,t-19),n}function vh(e,t,n){n??=K(84+4*e.length);var r=192;t&&(t.above&&(r&=-65),t.left&&(r&=-129)),n.write_shift(1,r);for(var i=1;i<3;++i)n.write_shift(1,0);return _a({auto:1},n),n.write_shift(-4,-1),n.write_shift(-4,-1),na(e,n),n.slice(0,n.l)}function yh(e){return[Zi(e)]}function bh(e,t,n){return n??=K(8),Qi(t,n)}function xh(e){return[$i(e)]}function Sh(e,t,n){return n??=K(4),ea(t,n)}function Ch(e){return[Zi(e),e.read_shift(1),`b`]}function wh(e,t,n){return n??=K(9),Qi(t,n),n.write_shift(1,+!!e.v),n}function Th(e){return[$i(e),e.read_shift(1),`b`]}function Eh(e,t,n){return n??=K(5),ea(t,n),n.write_shift(1,+!!e.v),n}function Dh(e){return[Zi(e),e.read_shift(1),`e`]}function Oh(e,t,n){return n??=K(9),Qi(t,n),n.write_shift(1,e.v),n}function kh(e){return[$i(e),e.read_shift(1),`e`]}function Ah(e,t,n){return n??=K(8),ea(t,n),n.write_shift(1,e.v),n.write_shift(2,0),n.write_shift(1,0),n}function jh(e){return[Zi(e),e.read_shift(4),`s`]}function Mh(e,t,n){return n??=K(12),Qi(t,n),n.write_shift(4,t.v),n}function Nh(e){return[$i(e),e.read_shift(4),`s`]}function Ph(e,t,n){return n??=K(8),ea(t,n),n.write_shift(4,t.v),n}function Fh(e){return[Zi(e),ma(e),`n`]}function Ih(e,t,n){return n??=K(16),Qi(t,n),ha(e.v,n),n}function Lh(e){return[$i(e),ma(e),`n`]}function Rh(e,t,n){return n??=K(12),ea(t,n),ha(e.v,n),n}function zh(e){return[Zi(e),ca(e),`n`]}function Bh(e,t,n){return n??=K(12),Qi(t,n),la(e.v,n),n}function Vh(e){return[$i(e),ca(e),`n`]}function Hh(e,t,n){return n??=K(8),ea(t,n),la(e.v,n),n}function Uh(e){return[Zi(e),qi(e),`is`]}function Wh(e){return[Zi(e),Ui(e),`str`]}function Gh(e,t,n){return n??=K(12+4*e.v.length),Qi(t,n),Wi(e.v,n),n.length>n.l?n.slice(0,n.l):n}function Kh(e){return[$i(e),Ui(e),`str`]}function qh(e,t,n){return n??=K(8+4*e.v.length),ea(t,n),Wi(e.v,n),n.length>n.l?n.slice(0,n.l):n}function Jh(e,t,n){var r=e.l+t,i=Zi(e);i.r=n[`!row`];var a=[i,e.read_shift(1),`b`];return n.cellFormula?(e.l+=2,a[3]=nm(pm(e,r-e.l,n),null,i,n.supbooks,n)):e.l=r,a}function Yh(e,t,n){var r=e.l+t,i=Zi(e);i.r=n[`!row`];var a=[i,e.read_shift(1),`e`];return n.cellFormula?(e.l+=2,a[3]=nm(pm(e,r-e.l,n),null,i,n.supbooks,n)):e.l=r,a}function Xh(e,t,n){var r=e.l+t,i=Zi(e);i.r=n[`!row`];var a=[i,ma(e),`n`];return n.cellFormula?(e.l+=2,a[3]=nm(pm(e,r-e.l,n),null,i,n.supbooks,n)):e.l=r,a}function Zh(e,t,n){var r=e.l+t,i=Zi(e);i.r=n[`!row`];var a=[i,Ui(e),`str`];return n.cellFormula?(e.l+=2,a[3]=nm(pm(e,r-e.l,n),null,i,n.supbooks,n)):e.l=r,a}var Qh=fa,$h=pa;function eg(e,t){return t??=K(4),t.write_shift(4,e),t}function tg(e,t){var n=e.l+t,r=fa(e,16),i=ra(e),a=Ui(e),o=Ui(e),s=Ui(e);e.l=n;var c={rfx:r,relId:i,loc:a,display:s};return o&&(c.Tooltip=o),c}function ng(e,t){var n=K(50+4*(e[1].Target.length+(e[1].Tooltip||``).length));pa({s:Mi(e[0]),e:Mi(e[0])},n),sa(`rId`+t,n);var r=e[1].Target.indexOf(`#`);return Wi((r==-1?``:e[1].Target.slice(r+1))||``,n),Wi(e[1].Tooltip||``,n),Wi(``,n),n.slice(0,n.l)}function rg(){}function ig(e,t,n){var r=e.l+t,i=ua(e,16),a=e.read_shift(1),o=[i];return o[2]=a,n.cellFormula?o[1]=fm(e,r-e.l,n):e.l=r,o}function ag(e,t,n){var r=e.l+t,i=[fa(e,16)];return n.cellFormula&&(i[1]=hm(e,r-e.l,n)),e.l=r,i}function og(e,t,n){n??=K(18);var r=Dm(e,t);n.write_shift(-4,e),n.write_shift(-4,e),n.write_shift(4,(r.width||10)*256),n.write_shift(4,0);var i=0;return t.hidden&&(i|=1),typeof r.width==`number`&&(i|=2),t.level&&(i|=t.level<<8),n.write_shift(2,i),n}var sg=[`left`,`right`,`top`,`bottom`,`header`,`footer`];function cg(e){var t={};return sg.forEach(function(n){t[n]=ma(e,8)}),t}function lg(e,t){return t??=K(48),Om(e),sg.forEach(function(n){ha(e[n],t)}),t}function ug(e){var t=e.read_shift(2);return e.l+=28,{RTL:t&32}}function dg(e,t,n){n??=K(30);var r=924;return(((t||{}).Views||[])[0]||{}).RTL&&(r|=32),n.write_shift(2,r),n.write_shift(4,0),n.write_shift(4,0),n.write_shift(4,0),n.write_shift(1,0),n.write_shift(1,0),n.write_shift(2,0),n.write_shift(2,100),n.write_shift(2,0),n.write_shift(2,0),n.write_shift(2,0),n.write_shift(4,0),n}function fg(e){var t=K(24);return t.write_shift(4,4),t.write_shift(4,1),pa(e,t),t}function pg(e,t){return t??=K(66),t.write_shift(2,e.password?ou(e.password):0),t.write_shift(4,1),[[`objects`,!1],[`scenarios`,!1],[`formatCells`,!0],[`formatColumns`,!0],[`formatRows`,!0],[`insertColumns`,!0],[`insertRows`,!0],[`insertHyperlinks`,!0],[`deleteColumns`,!0],[`deleteRows`,!0],[`selectLockedCells`,!1],[`sort`,!0],[`autoFilter`,!0],[`pivotTables`,!0],[`selectUnlockedCells`,!1]].forEach(function(n){n[1]?t.write_shift(4,+(e[n[0]]!=null&&!e[n[0]])):t.write_shift(4,e[n[0]]!=null&&e[n[0]]?0:1)}),t}function mg(){}function hg(){}function gg(e,t,n,r,i,a,o){if(!e)return e;var s=t||{};r||={"!id":{}},Oe!=null&&s.dense==null&&(s.dense=Oe);var c=s.dense?[]:{},l,u={s:{r:2e6,c:2e6},e:{r:0,c:0}},d=[],f=!1,p=!1,m,h,g,_,v,y,b,x,S,C=[];s.biff=12,s[`!row`]=0;var w=0,T=!1,E=[],D={},O=s.supbooks||i.supbooks||[[]];if(O.sharedf=D,O.arrayf=E,O.SheetNames=i.SheetNames||i.Sheets.map(function(e){return e.name}),!s.supbooks&&(s.supbooks=O,i.Names))for(var k=0;k<i.Names.length;++k)O[0][k+1]=i.Names[k];var A=[],j=[],M=!1;sv[16]={n:`BrtShortReal`,f:Lh};var N,P;if(_i(e,function(e,t,k){if(!p)switch(k){case 148:l=e;break;case 0:m=e,s.sheetRows&&s.sheetRows<=m.r&&(p=!0),x=wi(_=m.r),s[`!row`]=m.r,(e.hidden||e.hpt||e.level!=null)&&(e.hpt&&(e.hpx=ju(e.hpt)),j[e.r]=e);break;case 2:case 3:case 4:case 5:case 6:case 7:case 8:case 9:case 10:case 11:case 13:case 14:case 15:case 16:case 17:case 18:case 62:switch(h={t:e[2]},e[2]){case`n`:h.v=e[1];break;case`s`:b=Cm[e[1]],h.v=b.t,h.r=b.r;break;case`b`:h.v=!!e[1];break;case`e`:h.v=e[1],s.cellText!==!1&&(h.w=Ha[h.v]);break;case`str`:h.t=`s`,h.v=e[1];break;case`is`:h.t=`s`,h.v=e[1].t;break}if((g=o.CellXf[e[0].iStyleRef])&&Am(h,g.numFmtId,null,s,a,o),v=e[0].c==-1?v+1:e[0].c,s.dense?(c[_]||(c[_]=[]),c[_][v]=h):c[Oi(v)+x]=h,s.cellFormula){for(T=!1,w=0;w<E.length;++w){var F=E[w];m.r>=F[0].s.r&&m.r<=F[0].e.r&&v>=F[0].s.c&&v<=F[0].e.c&&(h.F=Pi(F[0]),T=!0)}!T&&e.length>3&&(h.f=e[3])}if(u.s.r>m.r&&(u.s.r=m.r),u.s.c>v&&(u.s.c=v),u.e.r<m.r&&(u.e.r=m.r),u.e.c<v&&(u.e.c=v),s.cellDates&&g&&h.t==`n`&&Wt(H[g.numFmtId])){var I=st(h.v);I&&(h.t=`d`,h.v=new Date(I.y,I.m-1,I.d,I.H,I.M,I.S,I.u))}N&&=(N.type==`XLDAPR`&&(h.D=!0),void 0),P&&=void 0;break;case 1:case 12:if(!s.sheetStubs||f)break;h={t:`z`,v:void 0},v=e[0].c==-1?v+1:e[0].c,s.dense?(c[_]||(c[_]=[]),c[_][v]=h):c[Oi(v)+x]=h,u.s.r>m.r&&(u.s.r=m.r),u.s.c>v&&(u.s.c=v),u.e.r<m.r&&(u.e.r=m.r),u.e.c<v&&(u.e.c=v),N&&=(N.type==`XLDAPR`&&(h.D=!0),void 0),P&&=void 0;break;case 176:C.push(e);break;case 49:N=((s.xlmeta||{}).Cell||[])[e-1];break;case 494:var L=r[`!id`][e.relId];for(L?(e.Target=L.Target,e.loc&&(e.Target+=`#`+e.loc),e.Rel=L):e.relId==``&&(e.Target=`#`+e.loc),_=e.rfx.s.r;_<=e.rfx.e.r;++_)for(v=e.rfx.s.c;v<=e.rfx.e.c;++v)s.dense?(c[_]||(c[_]=[]),c[_][v]||(c[_][v]={t:`z`,v:void 0}),c[_][v].l=e):(y=J({c:v,r:_}),c[y]||(c[y]={t:`z`,v:void 0}),c[y].l=e);break;case 426:if(!s.cellFormula)break;E.push(e),S=s.dense?c[_][v]:c[Oi(v)+x],S.f=nm(e[1],u,{r:m.r,c:v},O,s),S.F=Pi(e[0]);break;case 427:if(!s.cellFormula)break;D[J(e[0].s)]=e[1],S=s.dense?c[_][v]:c[Oi(v)+x],S.f=nm(e[1],u,{r:m.r,c:v},O,s);break;case 60:if(!s.cellStyles)break;for(;e.e>=e.s;)A[e.e--]={width:e.w/256,hidden:!!(e.flags&1),level:e.level},M||(M=!0,Du(e.w/256)),Ou(A[e.e+1]);break;case 161:c[`!autofilter`]={ref:Pi(e)};break;case 476:c[`!margins`]=e;break;case 147:i.Sheets[n]||(i.Sheets[n]={}),e.name&&(i.Sheets[n].CodeName=e.name),(e.above||e.left)&&(c[`!outline`]={above:e.above,left:e.left});break;case 137:i.Views||=[{}],i.Views[0]||(i.Views[0]={}),e.RTL&&(i.Views[0].RTL=!0);break;case 485:break;case 64:case 1053:break;case 151:break;case 152:case 175:case 644:case 625:case 562:case 396:case 1112:case 1146:case 471:case 1050:case 649:case 1105:case 589:case 607:case 564:case 1055:case 168:case 174:case 1180:case 499:case 507:case 550:case 171:case 167:case 1177:case 169:case 1181:case 551:case 552:case 661:case 639:case 478:case 537:case 477:case 536:case 1103:case 680:case 1104:case 1024:case 663:case 535:case 678:case 504:case 1043:case 428:case 170:case 3072:case 50:case 2070:case 1045:break;case 35:f=!0;break;case 36:f=!1;break;case 37:d.push(k),f=!0;break;case 38:d.pop(),f=!1;break;default:if(!t.T&&(!f||s.WTF))throw Error(`Unexpected record 0x`+k.toString(16))}},s),delete s.supbooks,delete s[`!row`],!c[`!ref`]&&(u.s.r<2e6||l&&(l.e.r>0||l.e.c>0||l.s.r>0||l.s.c>0))&&(c[`!ref`]=Pi(l||u)),s.sheetRows&&c[`!ref`]){var F=Fi(c[`!ref`]);s.sheetRows<=+F.e.r&&(F.e.r=s.sheetRows-1,F.e.r>u.e.r&&(F.e.r=u.e.r),F.e.r<F.s.r&&(F.s.r=F.e.r),F.e.c>u.e.c&&(F.e.c=u.e.c),F.e.c<F.s.c&&(F.s.c=F.e.c),c[`!fullref`]=c[`!ref`],c[`!ref`]=Pi(F))}return C.length>0&&(c[`!merges`]=C),A.length>0&&(c[`!cols`]=A),j.length>0&&(c[`!rows`]=j),c}function _g(e,t,n,r,i,a,o){if(t.v===void 0)return!1;var s=``;switch(t.t){case`b`:s=t.v?`1`:`0`;break;case`d`:t=En(t),t.z=t.z||H[14],t.v=hn(wn(t.v)),t.t=`n`;break;case`n`:case`e`:s=``+t.v;break;default:s=t.v;break}var c={r:n,c:r};switch(c.s=km(i.cellXfs,t,i),t.l&&a[`!links`].push([J(c),t.l]),t.c&&a[`!comments`].push([J(c),t.c]),t.t){case`s`:case`str`:return i.bookSST?(s=Em(i.Strings,t.v,i.revStrings),c.t=`s`,c.v=s,o?q(e,18,Ph(t,c)):q(e,7,Mh(t,c))):(c.t=`str`,o?q(e,17,qh(t,c)):q(e,6,Gh(t,c))),!0;case`n`:return t.v==(t.v|0)&&t.v>-1e3&&t.v<1e3?o?q(e,13,Hh(t,c)):q(e,2,Bh(t,c)):o?q(e,16,Rh(t,c)):q(e,5,Ih(t,c)),!0;case`b`:return c.t=`b`,o?q(e,15,Eh(t,c)):q(e,4,wh(t,c)),!0;case`e`:return c.t=`e`,o?q(e,14,Ah(t,c)):q(e,3,Oh(t,c)),!0}return o?q(e,12,Sh(t,c)):q(e,1,bh(t,c)),!0}function vg(e,t,n,r){var i=Fi(t[`!ref`]||`A1`),a,o=``,s=[];q(e,145);var c=Array.isArray(t),l=i.e.r;t[`!rows`]&&(l=Math.max(i.e.r,t[`!rows`].length-1));for(var u=i.s.r;u<=l;++u){o=wi(u),ph(e,t,i,u);var d=!1;if(u<=i.e.r)for(var f=i.s.c;f<=i.e.c;++f){u===i.s.r&&(s[f]=Oi(f)),a=s[f]+o;var p=c?(t[u]||[])[f]:t[a];if(!p){d=!1;continue}d=_g(e,p,u,f,r,t,d)}}q(e,146)}function yg(e,t){!t||!t[`!merges`]||(q(e,177,eg(t[`!merges`].length)),t[`!merges`].forEach(function(t){q(e,176,$h(t))}),q(e,178))}function bg(e,t){!t||!t[`!cols`]||(q(e,390),t[`!cols`].forEach(function(t,n){t&&q(e,60,og(n,t))}),q(e,391))}function xg(e,t){!t||!t[`!ref`]||(q(e,648),q(e,649,fg(Fi(t[`!ref`]))),q(e,650))}function Sg(e,t,n){t[`!links`].forEach(function(t){t[1].Target&&q(e,494,ng(t,$a(n,-1,t[1].Target.replace(/#.*$/,``),Ya.HLINK)))}),delete t[`!links`]}function Cg(e,t,n,r){if(t[`!comments`].length>0){var i=$a(r,-1,`../drawings/vmlDrawing`+(n+1)+`.vml`,Ya.VML);q(e,551,sa(`rId`+i)),t[`!legacy`]=i}}function wg(e,t,n,r){if(t[`!autofilter`]){var i=t[`!autofilter`],a=typeof i.ref==`string`?i.ref:Pi(i.ref);n.Workbook||={Sheets:[]},n.Workbook.Names||(n.Workbook.Names=[]);var o=n.Workbook.Names,s=Ni(a);s.s.r==s.e.r&&(s.e.r=Ni(t[`!ref`]).e.r,a=Pi(s));for(var c=0;c<o.length;++c){var l=o[c];if(l.Name==`_xlnm._FilterDatabase`&&l.Sheet==r){l.Ref=`'`+n.SheetNames[r]+`'!`+a;break}}c==o.length&&o.push({Name:`_xlnm._FilterDatabase`,Sheet:r,Ref:`'`+n.SheetNames[r]+`'!`+a}),q(e,161,pa(Fi(a))),q(e,162)}}function Tg(e,t,n){q(e,133),q(e,137,dg(t,n)),q(e,138),q(e,134)}function Eg(e,t){t[`!protect`]&&q(e,535,pg(t[`!protect`]))}function Dg(e,t,n,r){var i=vi(),a=n.SheetNames[e],o=n.Sheets[a]||{},s=a;try{n&&n.Workbook&&(s=n.Workbook.Sheets[e].CodeName||s)}catch{}var c=Fi(o[`!ref`]||`A1`);if(c.e.c>16383||c.e.r>1048575){if(t.WTF)throw Error(`Range `+(o[`!ref`]||`A1`)+` exceeds format limit A1:XFD1048576`);c.e.c=Math.min(c.e.c,16383),c.e.r=Math.min(c.e.c,1048575)}return o[`!links`]=[],o[`!comments`]=[],q(i,129),(n.vbaraw||o[`!outline`])&&q(i,147,vh(s,o[`!outline`])),q(i,148,hh(c)),Tg(i,o,n.Workbook),bg(i,o,e,t,n),vg(i,o,e,t,n),Eg(i,o),wg(i,o,n,e),yg(i,o),Sg(i,o,r),o[`!margins`]&&q(i,476,lg(o[`!margins`])),(!t||t.ignoreEC||t.ignoreEC==null)&&xg(i,o),Cg(i,o,e,r),q(i,130),i.end()}function Og(e){var t=[],n=e.match(/^<c:numCache>/),r;(e.match(/<c:pt idx="(\d*)">(.*?)<\/c:pt>/gm)||[]).forEach(function(e){var r=e.match(/<c:pt idx="(\d*?)"><c:v>(.*)<\/c:v><\/c:pt>/);r&&(t[+r[1]]=n?+r[2]:r[2])});var i=er((e.match(/<c:formatCode>([\s\S]*?)<\/c:formatCode>/)||[``,`General`])[1]);return(e.match(/<c:f>(.*?)<\/c:f>/gm)||[]).forEach(function(e){r=e.replace(/<.*?>/g,``)}),[t,i,r]}function kg(e,t,n,r,i,a){var o=a||{"!type":`chart`};if(!e)return a;var s=0,c=0,l=`A`,u={s:{r:2e6,c:2e6},e:{r:0,c:0}};return(e.match(/<c:numCache>[\s\S]*?<\/c:numCache>/gm)||[]).forEach(function(e){var t=Og(e);u.s.r=u.s.c=0,u.e.c=s,l=Oi(s),t[0].forEach(function(e,n){o[l+wi(n)]={t:`n`,v:e,z:t[1]},c=n}),u.e.r<c&&(u.e.r=c),++s}),s>0&&(o[`!ref`]=Pi(u)),o}function Ag(e,t,n,r,i){if(!e)return e;r||={"!id":{}};var a={"!type":`chart`,"!drawel":null,"!rel":``},o,s=e.match(Bm);return s&&Gm(s[0],a,i,n),(o=e.match(/drawing r:id="(.*?)"/))&&(a[`!rel`]=o[1]),r[`!id`][a[`!rel`]]&&(a[`!drawel`]=r[`!id`][a[`!rel`]]),a}function jg(e,t){return e.l+=10,{name:Ui(e,t-10)}}function Mg(e,t,n,r,i){if(!e)return e;r||={"!id":{}};var a={"!type":`chart`,"!drawel":null,"!rel":``},o=[],s=!1;return _i(e,function(e,r,c){switch(c){case 550:a[`!rel`]=e;break;case 651:i.Sheets[n]||(i.Sheets[n]={}),e.name&&(i.Sheets[n].CodeName=e.name);break;case 562:case 652:case 669:case 679:case 551:case 552:case 476:case 3072:break;case 35:s=!0;break;case 36:s=!1;break;case 37:o.push(c);break;case 38:o.pop();break;default:if(r.T>0)o.push(c);else if(r.T<0)o.pop();else if(!s||t.WTF)throw Error(`Unexpected record 0x`+c.toString(16))}},t),r[`!id`][a[`!rel`]]&&(a[`!drawel`]=r[`!id`][a[`!rel`]]),a}var Ng=[[`allowRefreshQuery`,!1,`bool`],[`autoCompressPictures`,!0,`bool`],[`backupFile`,!1,`bool`],[`checkCompatibility`,!1,`bool`],[`CodeName`,``],[`date1904`,!1,`bool`],[`defaultThemeVersion`,0,`int`],[`filterPrivacy`,!1,`bool`],[`hidePivotFieldList`,!1,`bool`],[`promptedSolutions`,!1,`bool`],[`publishItems`,!1,`bool`],[`refreshAllConnections`,!1,`bool`],[`saveExternalLinkValues`,!0,`bool`],[`showBorderUnselectedTables`,!0,`bool`],[`showInkAnnotation`,!0,`bool`],[`showObjects`,`all`],[`showPivotChartFilter`,!1,`bool`],[`updateLinks`,`userSet`]],Pg=[[`activeTab`,0,`int`],[`autoFilterDateGrouping`,!0,`bool`],[`firstSheet`,0,`int`],[`minimized`,!1,`bool`],[`showHorizontalScroll`,!0,`bool`],[`showSheetTabs`,!0,`bool`],[`showVerticalScroll`,!0,`bool`],[`tabRatio`,600,`int`],[`visibility`,`visible`]],Fg=[],Ig=[[`calcCompleted`,`true`],[`calcMode`,`auto`],[`calcOnSave`,`true`],[`concurrentCalc`,`true`],[`fullCalcOnLoad`,`false`],[`fullPrecision`,`true`],[`iterate`,`false`],[`iterateCount`,`100`],[`iterateDelta`,`0.001`],[`refMode`,`A1`]];function Lg(e,t){for(var n=0;n!=e.length;++n)for(var r=e[n],i=0;i!=t.length;++i){var a=t[i];if(r[a[0]]==null)r[a[0]]=a[1];else switch(a[2]){case`bool`:typeof r[a[0]]==`string`&&(r[a[0]]=ur(r[a[0]]));break;case`int`:typeof r[a[0]]==`string`&&(r[a[0]]=parseInt(r[a[0]],10));break}}}function Rg(e,t){for(var n=0;n!=t.length;++n){var r=t[n];if(e[r[0]]==null)e[r[0]]=r[1];else switch(r[2]){case`bool`:typeof e[r[0]]==`string`&&(e[r[0]]=ur(e[r[0]]));break;case`int`:typeof e[r[0]]==`string`&&(e[r[0]]=parseInt(e[r[0]],10));break}}}function zg(e){Rg(e.WBProps,Ng),Rg(e.CalcPr,Ig),Lg(e.WBView,Pg),Lg(e.Sheets,Fg),wm.date1904=ur(e.WBProps.date1904)}function Bg(e){return!e.Workbook||!e.Workbook.WBProps?`false`:ur(e.Workbook.WBProps.date1904)?`true`:`false`}var Vg=`][*?/\\`.split(``);function Hg(e,t){if(e.length>31){if(t)return!1;throw Error(`Sheet names cannot exceed 31 chars`)}var n=!0;return Vg.forEach(function(r){if(e.indexOf(r)!=-1){if(!t)throw Error(`Sheet name cannot contain : \\ / ? * [ ]`);n=!1}}),n}function Ug(e,t,n){e.forEach(function(r,i){Hg(r);for(var a=0;a<i;++a)if(r==e[a])throw Error(`Duplicate Sheet Name: `+r);if(n){var o=t&&t[i]&&t[i].CodeName||r;if(o.charCodeAt(0)==95&&o.length>22)throw Error(`Bad Code Name: Worksheet`+o)}})}function Wg(e){if(!e||!e.SheetNames||!e.Sheets)throw Error(`Invalid Workbook`);if(!e.SheetNames.length)throw Error(`Workbook is empty`);var t=e.Workbook&&e.Workbook.Sheets||[];Ug(e.SheetNames,t,!!e.vbaraw);for(var n=0;n<e.SheetNames.length;++n)jm(e.Sheets[e.SheetNames[n]],e.SheetNames[n],n)}var Gg=/<\w+:workbook/;function Kg(e,t){if(!e)throw Error(`Could not find file`);var n={AppVersion:{},WBProps:{},WBView:[],Sheets:[],CalcPr:{},Names:[],xmlns:``},r=!1,i=`xmlns`,a={},o=0;if(e.replace(Jn,function(s,c){var l=W(s);switch(Zn(l[0])){case`<?xml`:break;case`<workbook`:s.match(Gg)&&(i=`xmlns`+s.match(/<(\w+):/)[1]),n.xmlns=l[i];break;case`</workbook>`:break;case`<fileVersion`:delete l[0],n.AppVersion=l;break;case`<fileVersion/>`:case`</fileVersion>`:break;case`<fileSharing`:break;case`<fileSharing/>`:break;case`<workbookPr`:case`<workbookPr/>`:Ng.forEach(function(e){if(l[e[0]]!=null)switch(e[2]){case`bool`:n.WBProps[e[0]]=ur(l[e[0]]);break;case`int`:n.WBProps[e[0]]=parseInt(l[e[0]],10);break;default:n.WBProps[e[0]]=l[e[0]]}}),l.codeName&&(n.WBProps.CodeName=hr(l.codeName));break;case`</workbookPr>`:break;case`<workbookProtection`:break;case`<workbookProtection/>`:break;case`<bookViews`:case`<bookViews>`:case`</bookViews>`:break;case`<workbookView`:case`<workbookView/>`:delete l[0],n.WBView.push(l);break;case`</workbookView>`:break;case`<sheets`:case`<sheets>`:case`</sheets>`:break;case`<sheet`:switch(l.state){case`hidden`:l.Hidden=1;break;case`veryHidden`:l.Hidden=2;break;default:l.Hidden=0}delete l.state,l.name=er(hr(l.name)),delete l[0],n.Sheets.push(l);break;case`</sheet>`:break;case`<functionGroups`:case`<functionGroups/>`:break;case`<functionGroup`:break;case`<externalReferences`:case`</externalReferences>`:case`<externalReferences>`:break;case`<externalReference`:break;case`<definedNames/>`:break;case`<definedNames>`:case`<definedNames`:r=!0;break;case`</definedNames>`:r=!1;break;case`<definedName`:a={},a.Name=hr(l.name),l.comment&&(a.Comment=l.comment),l.localSheetId&&(a.Sheet=+l.localSheetId),ur(l.hidden||`0`)&&(a.Hidden=!0),o=c+s.length;break;case`</definedName>`:a.Ref=er(hr(e.slice(o,c))),n.Names.push(a);break;case`<definedName/>`:break;case`<calcPr`:delete l[0],n.CalcPr=l;break;case`<calcPr/>`:delete l[0],n.CalcPr=l;break;case`</calcPr>`:break;case`<oleSize`:break;case`<customWorkbookViews>`:case`</customWorkbookViews>`:case`<customWorkbookViews`:break;case`<customWorkbookView`:case`</customWorkbookView>`:break;case`<pivotCaches>`:case`</pivotCaches>`:case`<pivotCaches`:break;case`<pivotCache`:break;case`<smartTagPr`:case`<smartTagPr/>`:break;case`<smartTagTypes`:case`<smartTagTypes>`:case`</smartTagTypes>`:break;case`<smartTagType`:break;case`<webPublishing`:case`<webPublishing/>`:break;case`<fileRecoveryPr`:case`<fileRecoveryPr/>`:break;case`<webPublishObjects>`:case`<webPublishObjects`:case`</webPublishObjects>`:break;case`<webPublishObject`:break;case`<extLst`:case`<extLst>`:case`</extLst>`:case`<extLst/>`:break;case`<ext`:r=!0;break;case`</ext>`:r=!1;break;case`<ArchID`:break;case`<AlternateContent`:case`<AlternateContent>`:r=!0;break;case`</AlternateContent>`:r=!1;break;case`<revisionPtr`:break;default:if(!r&&t.WTF)throw Error(`unrecognized `+l[0]+` in workbook`)}return s}),jr.indexOf(n.xmlns)===-1)throw Error(`Unknown Namespace: `+n.xmlns);return zg(n),n}function qg(e){var t=[Gn];t[t.length]=G(`workbook`,null,{xmlns:jr[0],"xmlns:r":Ar.r});var n=e.Workbook&&(e.Workbook.Names||[]).length>0,r={codeName:`ThisWorkbook`};e.Workbook&&e.Workbook.WBProps&&(Ng.forEach(function(t){e.Workbook.WBProps[t[0]]!=null&&e.Workbook.WBProps[t[0]]!=t[1]&&(r[t[0]]=e.Workbook.WBProps[t[0]])}),e.Workbook.WBProps.CodeName&&(r.codeName=e.Workbook.WBProps.CodeName,delete r.CodeName)),t[t.length]=G(`workbookPr`,null,r);var i=e.Workbook&&e.Workbook.Sheets||[],a=0;if(i&&i[0]&&i[0].Hidden){for(t[t.length]=`<bookViews>`,a=0;a!=e.SheetNames.length&&!(!i[a]||!i[a].Hidden);++a);a==e.SheetNames.length&&(a=0),t[t.length]=`<workbookView firstSheet="`+a+`" activeTab="`+a+`"/>`,t[t.length]=`</bookViews>`}for(t[t.length]=`<sheets>`,a=0;a!=e.SheetNames.length;++a){var o={name:rr(e.SheetNames[a].slice(0,31))};if(o.sheetId=``+(a+1),o[`r:id`]=`rId`+(a+1),i[a])switch(i[a].Hidden){case 1:o.state=`hidden`;break;case 2:o.state=`veryHidden`;break}t[t.length]=G(`sheet`,null,o)}return t[t.length]=`</sheets>`,n&&(t[t.length]=`<definedNames>`,e.Workbook&&e.Workbook.Names&&e.Workbook.Names.forEach(function(e){var n={name:e.Name};e.Comment&&(n.comment=e.Comment),e.Sheet!=null&&(n.localSheetId=``+e.Sheet),e.Hidden&&(n.hidden=`1`),e.Ref&&(t[t.length]=G(`definedName`,rr(e.Ref),n))}),t[t.length]=`</definedNames>`),t.length>2&&(t[t.length]=`</workbook>`,t[1]=t[1].replace(`/>`,`>`)),t.join(``)}function Jg(e,t){var n={};return n.Hidden=e.read_shift(4),n.iTabID=e.read_shift(4),n.strRelID=oa(e,t-8),n.name=Ui(e),n}function Yg(e,t){return t||=K(127),t.write_shift(4,e.Hidden),t.write_shift(4,e.iTabID),sa(e.strRelID,t),Wi(e.name.slice(0,31),t),t.length>t.l?t.slice(0,t.l):t}function Xg(e,t){var n={},r=e.read_shift(4);n.defaultThemeVersion=e.read_shift(4);var i=t>8?Ui(e):``;return i.length>0&&(n.CodeName=i),n.autoCompressPictures=!!(r&65536),n.backupFile=!!(r&64),n.checkCompatibility=!!(r&4096),n.date1904=!!(r&1),n.filterPrivacy=!!(r&8),n.hidePivotFieldList=!!(r&1024),n.promptedSolutions=!!(r&16),n.publishItems=!!(r&2048),n.refreshAllConnections=!!(r&262144),n.saveExternalLinkValues=!!(r&128),n.showBorderUnselectedTables=!!(r&4),n.showInkAnnotation=!!(r&32),n.showObjects=[`all`,`placeholders`,`none`][r>>13&3],n.showPivotChartFilter=!!(r&32768),n.updateLinks=[`userSet`,`never`,`always`][r>>8&3],n}function Zg(e,t){t||=K(72);var n=0;return e&&e.filterPrivacy&&(n|=8),t.write_shift(4,n),t.write_shift(4,0),na(e&&e.CodeName||`ThisWorkbook`,t),t.slice(0,t.l)}function Qg(e,t){var n={};return e.read_shift(4),n.ArchID=e.read_shift(4),e.l+=t-8,n}function $g(e,t,n){var r=e.l+t;e.l+=4,e.l+=1;var i=e.read_shift(4),a=aa(e),o=mm(e,0,n),s=ra(e);e.l=r;var c={Name:a,Ptg:o};return i<268435455&&(c.Sheet=i),s&&(c.Comment=s),c}function e_(e,t){var n={AppVersion:{},WBProps:{},WBView:[],Sheets:[],CalcPr:{},xmlns:``},r=[],i=!1;t||={},t.biff=12;var a=[],o=[[]];return o.SheetNames=[],o.XTI=[],sv[16]={n:`BrtFRTArchID$`,f:Qg},_i(e,function(e,s,c){switch(c){case 156:o.SheetNames.push(e.name),n.Sheets.push(e);break;case 153:n.WBProps=e;break;case 39:e.Sheet!=null&&(t.SID=e.Sheet),e.Ref=nm(e.Ptg,null,null,o,t),delete t.SID,delete e.Ptg,a.push(e);break;case 1036:break;case 357:case 358:case 355:case 667:o[0].length?o.push([c,e]):o[0]=[c,e],o[o.length-1].XTI=[];break;case 362:o.length===0&&(o[0]=[],o[0].XTI=[]),o[o.length-1].XTI=o[o.length-1].XTI.concat(e),o.XTI=o.XTI.concat(e);break;case 361:break;case 2071:case 158:case 143:case 664:case 353:break;case 3072:case 3073:case 534:case 677:case 157:case 610:case 2050:case 155:case 548:case 676:case 128:case 665:case 2128:case 2125:case 549:case 2053:case 596:case 2076:case 2075:case 2082:case 397:case 154:case 1117:case 553:case 2091:break;case 35:r.push(c),i=!0;break;case 36:r.pop(),i=!1;break;case 37:r.push(c),i=!0;break;case 38:r.pop(),i=!1;break;case 16:break;default:if(!s.T&&(!i||t.WTF&&r[r.length-1]!=37&&r[r.length-1]!=35))throw Error(`Unexpected record 0x`+c.toString(16))}},t),zg(n),n.Names=a,n.supbooks=o,n}function t_(e,t){q(e,143);for(var n=0;n!=t.SheetNames.length;++n)q(e,156,Yg({Hidden:t.Workbook&&t.Workbook.Sheets&&t.Workbook.Sheets[n]&&t.Workbook.Sheets[n].Hidden||0,iTabID:n+1,strRelID:`rId`+(n+1),name:t.SheetNames[n]}));q(e,144)}function n_(e,t){t||=K(127);for(var n=0;n!=4;++n)t.write_shift(4,0);return Wi(`SheetJS`,t),Wi(fe.version,t),Wi(fe.version,t),Wi(`7262`,t),t.length>t.l?t.slice(0,t.l):t}function r_(e,t){return t||=K(29),t.write_shift(-4,0),t.write_shift(-4,460),t.write_shift(4,28800),t.write_shift(4,17600),t.write_shift(4,500),t.write_shift(4,e),t.write_shift(4,e),t.write_shift(1,120),t.length>t.l?t.slice(0,t.l):t}function i_(e,t){if(!(!t.Workbook||!t.Workbook.Sheets)){for(var n=t.Workbook.Sheets,r=0,i=-1,a=-1;r<n.length;++r)!n[r]||!n[r].Hidden&&i==-1?i=r:n[r].Hidden==1&&a==-1&&(a=r);a>i||(q(e,135),q(e,158,r_(i)),q(e,136))}}function a_(e,t){var n=vi();return q(n,131),q(n,128,n_()),q(n,153,Zg(e.Workbook&&e.Workbook.WBProps||null)),i_(n,e,t),t_(n,e,t),q(n,132),n.end()}function o_(e,t,n){return t.slice(-4)===`.bin`?e_(e,n):Kg(e,n)}function s_(e,t,n,r,i,a,o,s){return t.slice(-4)===`.bin`?gg(e,r,n,i,a,o,s):Um(e,r,n,i,a,o,s)}function c_(e,t,n,r,i,a,o,s){return t.slice(-4)===`.bin`?Mg(e,r,n,i,a,o,s):Ag(e,r,n,i,a,o,s)}function l_(e,t,n,r,i,a,o,s){return t.slice(-4)===`.bin`?yf(e,r,n,i,a,o,s):bf(e,r,n,i,a,o,s)}function u_(e,t,n,r,i,a,o,s){return t.slice(-4)===`.bin`?_f(e,r,n,i,a,o,s):vf(e,r,n,i,a,o,s)}function d_(e,t,n,r){return t.slice(-4)===`.bin`?ad(e,n,r):Hu(e,n,r)}function f_(e,t,n){return Td(e,n)}function p_(e,t,n){return t.slice(-4)===`.bin`?Bl(e,n):Il(e,n)}function m_(e,t,n){return t.slice(-4)===`.bin`?df(e,n):ef(e,n)}function h_(e,t,n){return t.slice(-4)===`.bin`?Jd(e,t,n):Kd(e,t,n)}function g_(e,t,n,r){if(n.slice(-4)===`.bin`)return Yd(e,t,n,r)}function __(e,t,n){return t.slice(-4)===`.bin`?Hd(e,t,n):Wd(e,t,n)}function v_(e,t,n){return(t.slice(-4)===`.bin`?a_:qg)(e,n)}function y_(e,t,n,r,i){return(t.slice(-4)===`.bin`?Dg:uh)(e,n,r,i)}function b_(e,t,n){return(t.slice(-4)===`.bin`?hd:Uu)(e,n)}function x_(e,t,n){return(t.slice(-4)===`.bin`?Ul:Rl)(e,n)}function S_(e,t,n){return(t.slice(-4)===`.bin`?ff:tf)(e,n)}function C_(e){return(e.slice(-4)===`.bin`?Ud:Gd)()}var w_=/([\w:]+)=((?:")([^"]*)(?:")|(?:')([^']*)(?:'))/g,T_=/([\w:]+)=((?:")(?:[^"]*)(?:")|(?:')(?:[^']*)(?:'))/;function E_(e,t){var n=e.split(/\s+/),r=[];if(t||(r[0]=n[0]),n.length===1)return r;var i=e.match(w_),a,o,s,c;if(i)for(c=0;c!=i.length;++c)a=i[c].match(T_),(o=a[1].indexOf(`:`))===-1?r[a[1]]=a[2].slice(1,a[2].length-1):(s=a[1].slice(0,6)===`xmlns:`?`xmlns`+a[1].slice(6):a[1].slice(o+1),r[s]=a[2].slice(1,a[2].length-1));return r}function D_(e){var t=e.split(/\s+/),n={};if(t.length===1)return n;var r=e.match(w_),i,a,o,s;if(r)for(s=0;s!=r.length;++s)i=r[s].match(T_),(a=i[1].indexOf(`:`))===-1?n[i[1]]=i[2].slice(1,i[2].length-1):(o=i[1].slice(0,6)===`xmlns:`?`xmlns`+i[1].slice(6):i[1].slice(a+1),n[o]=i[2].slice(1,i[2].length-1));return n}var O_;function k_(e,t){var n=O_[e]||er(e);return n===`General`?_t(t):Yt(n,t)}function A_(e,t,n,r){var i=r;switch((n[0].match(/dt:dt="([\w.]+)"/)||[``,``])[1]){case`boolean`:i=ur(r);break;case`i2`:case`int`:i=parseInt(r,10);break;case`r4`:case`float`:i=parseFloat(r);break;case`date`:case`dateTime.tz`:i=wn(r);break;case`i8`:case`string`:case`fixed`:case`uuid`:case`bin.base64`:break;default:throw Error(`bad custprop:`+n[0])}e[er(t)]=i}function j_(e,t,n){if(e.t!==`z`){if(!n||n.cellText!==!1)try{e.t===`e`?e.w=e.w||Ha[e.v]:t===`General`?e.t===`n`?(e.v|0)===e.v?e.w=e.v.toString(10):e.w=gt(e.v):e.w=_t(e.v):e.w=k_(t||`General`,e.v)}catch(e){if(n.WTF)throw e}try{var r=O_[t]||t||`General`;if(n.cellNF&&(e.z=r),n.cellDates&&e.t==`n`&&Wt(r)){var i=st(e.v);i&&(e.t=`d`,e.v=new Date(i.y,i.m-1,i.d,i.H,i.M,i.S,i.u))}}catch(e){if(n.WTF)throw e}}}function M_(e,t,n){if(n.cellStyles&&t.Interior){var r=t.Interior;r.Pattern&&(r.patternType=Mu[r.Pattern]||r.Pattern)}e[t.ID]=t}function N_(e,t,n,r,i,a,o,s,c,l){var u=`General`,d=r.StyleID,f={};l||={};var p=[],m=0;for(d===void 0&&s&&(d=s.StyleID),d===void 0&&o&&(d=o.StyleID);a[d]!==void 0&&(a[d].nf&&(u=a[d].nf),a[d].Interior&&p.push(a[d].Interior),a[d].Parent);)d=a[d].Parent;switch(n.Type){case`Boolean`:r.t=`b`,r.v=ur(e);break;case`String`:r.t=`s`,r.r=cr(er(e)),r.v=e.indexOf(`<`)>-1?er(t||e).replace(/<.*?>/g,``):r.r;break;case`DateTime`:e.slice(-1)!=`Z`&&(e+=`Z`),r.v=(wn(e)-new Date(Date.UTC(1899,11,30)))/(1440*60*1e3),r.v===r.v?r.v<60&&--r.v:r.v=er(e),(!u||u==`General`)&&(u=`yyyy-mm-dd`);case`Number`:r.v===void 0&&(r.v=+e),r.t||=`n`;break;case`Error`:r.t=`e`,r.v=Ua[e],l.cellText!==!1&&(r.w=e);break;default:e==``&&t==``?r.t=`z`:(r.t=`s`,r.v=cr(t||e));break}if(j_(r,u,l),l.cellFormula!==!1)if(r.Formula){var h=er(r.Formula);h.charCodeAt(0)==61&&(h=h.slice(1)),r.f=xf(h,i),delete r.Formula,r.ArrayRange==`RC`?r.F=xf(`RC:RC`,i):r.ArrayRange&&(r.F=xf(r.ArrayRange,i),c.push([Fi(r.F),r.F]))}else for(m=0;m<c.length;++m)i.r>=c[m][0].s.r&&i.r<=c[m][0].e.r&&i.c>=c[m][0].s.c&&i.c<=c[m][0].e.c&&(r.F=c[m][1]);l.cellStyles&&(p.forEach(function(e){!f.patternType&&e.patternType&&(f.patternType=e.patternType)}),r.s=f),r.StyleID!==void 0&&(r.ixfe=r.StyleID)}function P_(e){e.t=e.v||``,e.t=e.t.replace(/\r\n/g,`
`).replace(/\r/g,`
`),e.v=e.w=e.ixfe=void 0}function F_(e,t){var n=t||{};Qt();var r=we(Or(e));(n.type==`binary`||n.type==`array`||n.type==`base64`)&&(r=De===void 0?hr(r):De.utils.decode(65001,xe(r)));var i=r.slice(0,1024).toLowerCase(),a=!1;if(i=i.replace(/".*?"/g,``),(i.indexOf(`>`)&1023)>Math.min(i.indexOf(`,`)&1023,i.indexOf(`;`)&1023)){var o=En(n);return o.type=`string`,Cl.to_workbook(r,o)}if(i.indexOf(`<?xml`)==-1&&[`html`,`table`,`head`,`meta`,`script`,`style`,`div`].forEach(function(e){i.indexOf(`<`+e)>=0&&(a=!0)}),a)return jv(r,n);O_={"General Number":`General`,"General Date":H[22],"Long Date":`dddd, mmmm dd, yyyy`,"Medium Date":H[15],"Short Date":H[14],"Long Time":H[19],"Medium Time":H[18],"Short Time":H[20],Currency:`"$"#,##0.00_);[Red]\\("$"#,##0.00\\)`,Fixed:H[2],Standard:H[4],Percent:H[10],Scientific:H[11],"Yes/No":`"Yes";"Yes";"No";@`,"True/False":`"True";"True";"False";@`,"On/Off":`"Yes";"Yes";"No";@`};var s,c=[],l;Oe!=null&&n.dense==null&&(n.dense=Oe);var u={},d=[],f=n.dense?[]:{},p=``,m={},h={},g=E_(`<Data ss:Type="String">`),_=0,v=0,y=0,b={s:{r:2e6,c:2e6},e:{r:0,c:0}},x={},S={},C=``,w=0,T=[],E={},D={},O=0,k=[],A=[],j={},M=[],N,P=!1,F=[],I=[],L={},R=0,ee=0,te={Sheets:[],WBProps:{date1904:!1}},ne={};kr.lastIndex=0,r=r.replace(/<!--([\s\S]*?)-->/gm,``);for(var re=``;s=kr.exec(r);)switch(s[3]=(re=s[3]).toLowerCase()){case`data`:if(re==`data`){if(s[1]===`/`){if((l=c.pop())[0]!==s[3])throw Error(`Bad state: `+l.join(`|`))}else s[0].charAt(s[0].length-2)!==`/`&&c.push([s[3],!0]);break}if(c[c.length-1][1])break;s[1]===`/`?N_(r.slice(_,s.index),C,g,c[c.length-1][0]==`comment`?j:m,{c:v,r:y},x,M[v],h,F,n):(C=``,g=E_(s[0]),_=s.index+s[0].length);break;case`cell`:if(s[1]===`/`)if(A.length>0&&(m.c=A),(!n.sheetRows||n.sheetRows>y)&&m.v!==void 0&&(n.dense?(f[y]||(f[y]=[]),f[y][v]=m):f[Oi(v)+wi(y)]=m),m.HRef&&(m.l={Target:er(m.HRef)},m.HRefScreenTip&&(m.l.Tooltip=m.HRefScreenTip),delete m.HRef,delete m.HRefScreenTip),(m.MergeAcross||m.MergeDown)&&(R=v+(parseInt(m.MergeAcross,10)|0),ee=y+(parseInt(m.MergeDown,10)|0),T.push({s:{c:v,r:y},e:{c:R,r:ee}})),!n.sheetStubs)m.MergeAcross?v=R+1:++v;else if(m.MergeAcross||m.MergeDown){for(var ie=v;ie<=R;++ie)for(var z=y;z<=ee;++z)(ie>v||z>y)&&(n.dense?(f[z]||(f[z]=[]),f[z][ie]={t:`z`}):f[Oi(ie)+wi(z)]={t:`z`});v=R+1}else ++v;else m=D_(s[0]),m.Index&&(v=m.Index-1),v<b.s.c&&(b.s.c=v),v>b.e.c&&(b.e.c=v),s[0].slice(-2)===`/>`&&++v,A=[];break;case`row`:s[1]===`/`||s[0].slice(-2)===`/>`?(y<b.s.r&&(b.s.r=y),y>b.e.r&&(b.e.r=y),s[0].slice(-2)===`/>`&&(h=E_(s[0]),h.Index&&(y=h.Index-1)),v=0,++y):(h=E_(s[0]),h.Index&&(y=h.Index-1),L={},(h.AutoFitHeight==`0`||h.Height)&&(L.hpx=parseInt(h.Height,10),L.hpt=Au(L.hpx),I[y]=L),h.Hidden==`1`&&(L.hidden=!0,I[y]=L));break;case`worksheet`:if(s[1]===`/`){if((l=c.pop())[0]!==s[3])throw Error(`Bad state: `+l.join(`|`));d.push(p),b.s.r<=b.e.r&&b.s.c<=b.e.c&&(f[`!ref`]=Pi(b),n.sheetRows&&n.sheetRows<=b.e.r&&(f[`!fullref`]=f[`!ref`],b.e.r=n.sheetRows-1,f[`!ref`]=Pi(b))),T.length&&(f[`!merges`]=T),M.length>0&&(f[`!cols`]=M),I.length>0&&(f[`!rows`]=I),u[p]=f}else b={s:{r:2e6,c:2e6},e:{r:0,c:0}},y=v=0,c.push([s[3],!1]),l=E_(s[0]),p=er(l.Name),f=n.dense?[]:{},T=[],F=[],I=[],ne={name:p,Hidden:0},te.Sheets.push(ne);break;case`table`:if(s[1]===`/`){if((l=c.pop())[0]!==s[3])throw Error(`Bad state: `+l.join(`|`))}else if(s[0].slice(-2)==`/>`)break;else c.push([s[3],!1]),M=[],P=!1;break;case`style`:s[1]===`/`?M_(x,S,n):S=E_(s[0]);break;case`numberformat`:S.nf=er(E_(s[0]).Format||`General`),O_[S.nf]&&(S.nf=O_[S.nf]);for(var B=0;B!=392&&H[B]!=S.nf;++B);if(B==392){for(B=57;B!=392;++B)if(H[B]==null){Xt(S.nf,B);break}}break;case`column`:if(c[c.length-1][0]!==`table`)break;if(N=E_(s[0]),N.Hidden&&(N.hidden=!0,delete N.Hidden),N.Width&&(N.wpx=parseInt(N.Width,10)),!P&&N.wpx>10){P=!0,Su=yu;for(var ae=0;ae<M.length;++ae)M[ae]&&Ou(M[ae])}P&&Ou(N),M[N.Index-1||M.length]=N;for(var oe=0;oe<+N.Span;++oe)M[M.length]=En(N);break;case`namedrange`:if(s[1]===`/`)break;te.Names||=[];var V=W(s[0]),se={Name:V.Name,Ref:xf(V.RefersTo.slice(1),{r:0,c:0})};te.Sheets.length>0&&(se.Sheet=te.Sheets.length-1),te.Names.push(se);break;case`namedcell`:break;case`b`:break;case`i`:break;case`u`:break;case`s`:break;case`em`:break;case`h2`:break;case`h3`:break;case`sub`:break;case`sup`:break;case`span`:break;case`alignment`:break;case`borders`:break;case`border`:break;case`font`:if(s[0].slice(-2)===`/>`)break;s[1]===`/`?C+=r.slice(w,s.index):w=s.index+s[0].length;break;case`interior`:if(!n.cellStyles)break;S.Interior=E_(s[0]);break;case`protection`:break;case`author`:case`title`:case`description`:case`created`:case`keywords`:case`subject`:case`category`:case`company`:case`lastauthor`:case`lastsaved`:case`lastprinted`:case`version`:case`revision`:case`totaltime`:case`hyperlinkbase`:case`manager`:case`contentstatus`:case`identifier`:case`language`:case`appname`:if(s[0].slice(-2)===`/>`)break;s[1]===`/`?Co(E,re,r.slice(O,s.index)):O=s.index+s[0].length;break;case`paragraphs`:break;case`styles`:case`workbook`:if(s[1]===`/`){if((l=c.pop())[0]!==s[3])throw Error(`Bad state: `+l.join(`|`))}else c.push([s[3],!1]);break;case`comment`:if(s[1]===`/`){if((l=c.pop())[0]!==s[3])throw Error(`Bad state: `+l.join(`|`));P_(j),A.push(j)}else c.push([s[3],!1]),l=E_(s[0]),j={a:l.Author};break;case`autofilter`:if(s[1]===`/`){if((l=c.pop())[0]!==s[3])throw Error(`Bad state: `+l.join(`|`))}else if(s[0].charAt(s[0].length-2)!==`/`){var ce=E_(s[0]);f[`!autofilter`]={ref:xf(ce.Range).replace(/\$/g,``)},c.push([s[3],!0])}break;case`name`:break;case`datavalidation`:if(s[1]===`/`){if((l=c.pop())[0]!==s[3])throw Error(`Bad state: `+l.join(`|`))}else s[0].charAt(s[0].length-2)!==`/`&&c.push([s[3],!0]);break;case`pixelsperinch`:break;case`componentoptions`:case`documentproperties`:case`customdocumentproperties`:case`officedocumentsettings`:case`pivottable`:case`pivotcache`:case`names`:case`mapinfo`:case`pagebreaks`:case`querytable`:case`sorting`:case`schema`:case`conditionalformatting`:case`smarttagtype`:case`smarttags`:case`excelworkbook`:case`workbookoptions`:case`worksheetoptions`:if(s[1]===`/`){if((l=c.pop())[0]!==s[3])throw Error(`Bad state: `+l.join(`|`))}else s[0].charAt(s[0].length-2)!==`/`&&c.push([s[3],!0]);break;case`null`:break;default:if(c.length==0&&s[3]==`document`||c.length==0&&s[3]==`uof`)return Uv(r,n);var le=!0;switch(c[c.length-1][0]){case`officedocumentsettings`:switch(s[3]){case`allowpng`:break;case`removepersonalinformation`:break;case`downloadcomponents`:break;case`locationofcomponents`:break;case`colors`:break;case`color`:break;case`index`:break;case`rgb`:break;case`targetscreensize`:break;case`readonlyrecommended`:break;default:le=!1}break;case`componentoptions`:switch(s[3]){case`toolbar`:break;case`hideofficelogo`:break;case`spreadsheetautofit`:break;case`label`:break;case`caption`:break;case`maxheight`:break;case`maxwidth`:break;case`nextsheetnumber`:break;default:le=!1}break;case`excelworkbook`:switch(s[3]){case`date1904`:te.WBProps.date1904=!0;break;case`windowheight`:break;case`windowwidth`:break;case`windowtopx`:break;case`windowtopy`:break;case`tabratio`:break;case`protectstructure`:break;case`protectwindow`:break;case`protectwindows`:break;case`activesheet`:break;case`displayinknotes`:break;case`firstvisiblesheet`:break;case`supbook`:break;case`sheetname`:break;case`sheetindex`:break;case`sheetindexfirst`:break;case`sheetindexlast`:break;case`dll`:break;case`acceptlabelsinformulas`:break;case`donotsavelinkvalues`:break;case`iteration`:break;case`maxiterations`:break;case`maxchange`:break;case`path`:break;case`xct`:break;case`count`:break;case`selectedsheets`:break;case`calculation`:break;case`uncalced`:break;case`startupprompt`:break;case`crn`:break;case`externname`:break;case`formula`:break;case`colfirst`:break;case`collast`:break;case`wantadvise`:break;case`boolean`:break;case`error`:break;case`text`:break;case`ole`:break;case`noautorecover`:break;case`publishobjects`:break;case`donotcalculatebeforesave`:break;case`number`:break;case`refmoder1c1`:break;case`embedsavesmarttags`:break;default:le=!1}break;case`workbookoptions`:switch(s[3]){case`owcversion`:break;case`height`:break;case`width`:break;default:le=!1}break;case`worksheetoptions`:switch(s[3]){case`visible`:if(s[0].slice(-2)!==`/>`)if(s[1]===`/`)switch(r.slice(O,s.index)){case`SheetHidden`:ne.Hidden=1;break;case`SheetVeryHidden`:ne.Hidden=2;break}else O=s.index+s[0].length;break;case`header`:f[`!margins`]||Om(f[`!margins`]={},`xlml`),isNaN(+W(s[0]).Margin)||(f[`!margins`].header=+W(s[0]).Margin);break;case`footer`:f[`!margins`]||Om(f[`!margins`]={},`xlml`),isNaN(+W(s[0]).Margin)||(f[`!margins`].footer=+W(s[0]).Margin);break;case`pagemargins`:var ue=W(s[0]);f[`!margins`]||Om(f[`!margins`]={},`xlml`),isNaN(+ue.Top)||(f[`!margins`].top=+ue.Top),isNaN(+ue.Left)||(f[`!margins`].left=+ue.Left),isNaN(+ue.Right)||(f[`!margins`].right=+ue.Right),isNaN(+ue.Bottom)||(f[`!margins`].bottom=+ue.Bottom);break;case`displayrighttoleft`:te.Views||=[],te.Views[0]||(te.Views[0]={}),te.Views[0].RTL=!0;break;case`freezepanes`:break;case`frozennosplit`:break;case`splithorizontal`:case`splitvertical`:break;case`donotdisplaygridlines`:break;case`activerow`:break;case`activecol`:break;case`toprowbottompane`:break;case`leftcolumnrightpane`:break;case`unsynced`:break;case`print`:break;case`printerrors`:break;case`panes`:break;case`scale`:break;case`pane`:break;case`number`:break;case`layout`:break;case`pagesetup`:break;case`selected`:break;case`protectobjects`:break;case`enableselection`:break;case`protectscenarios`:break;case`validprinterinfo`:break;case`horizontalresolution`:break;case`verticalresolution`:break;case`numberofcopies`:break;case`activepane`:break;case`toprowvisible`:break;case`leftcolumnvisible`:break;case`fittopage`:break;case`rangeselection`:break;case`papersizeindex`:break;case`pagelayoutzoom`:break;case`pagebreakzoom`:break;case`filteron`:break;case`fitwidth`:break;case`fitheight`:break;case`commentslayout`:break;case`zoom`:break;case`lefttoright`:break;case`gridlines`:break;case`allowsort`:break;case`allowfilter`:break;case`allowinsertrows`:break;case`allowdeleterows`:break;case`allowinsertcols`:break;case`allowdeletecols`:break;case`allowinserthyperlinks`:break;case`allowformatcells`:break;case`allowsizecols`:break;case`allowsizerows`:break;case`nosummaryrowsbelowdetail`:f[`!outline`]||={},f[`!outline`].above=!0;break;case`tabcolorindex`:break;case`donotdisplayheadings`:break;case`showpagelayoutzoom`:break;case`nosummarycolumnsrightdetail`:f[`!outline`]||={},f[`!outline`].left=!0;break;case`blackandwhite`:break;case`donotdisplayzeros`:break;case`displaypagebreak`:break;case`rowcolheadings`:break;case`donotdisplayoutline`:break;case`noorientation`:break;case`allowusepivottables`:break;case`zeroheight`:break;case`viewablerange`:break;case`selection`:break;case`protectcontents`:break;default:le=!1}break;case`pivottable`:case`pivotcache`:switch(s[3]){case`immediateitemsondrop`:break;case`showpagemultipleitemlabel`:break;case`compactrowindent`:break;case`location`:break;case`pivotfield`:break;case`orientation`:break;case`layoutform`:break;case`layoutsubtotallocation`:break;case`layoutcompactrow`:break;case`position`:break;case`pivotitem`:break;case`datatype`:break;case`datafield`:break;case`sourcename`:break;case`parentfield`:break;case`ptlineitems`:break;case`ptlineitem`:break;case`countofsameitems`:break;case`item`:break;case`itemtype`:break;case`ptsource`:break;case`cacheindex`:break;case`consolidationreference`:break;case`filename`:break;case`reference`:break;case`nocolumngrand`:break;case`norowgrand`:break;case`blanklineafteritems`:break;case`hidden`:break;case`subtotal`:break;case`basefield`:break;case`mapchilditems`:break;case`function`:break;case`refreshonfileopen`:break;case`printsettitles`:break;case`mergelabels`:break;case`defaultversion`:break;case`refreshname`:break;case`refreshdate`:break;case`refreshdatecopy`:break;case`versionlastrefresh`:break;case`versionlastupdate`:break;case`versionupdateablemin`:break;case`versionrefreshablemin`:break;case`calculation`:break;default:le=!1}break;case`pagebreaks`:switch(s[3]){case`colbreaks`:break;case`colbreak`:break;case`rowbreaks`:break;case`rowbreak`:break;case`colstart`:break;case`colend`:break;case`rowend`:break;default:le=!1}break;case`autofilter`:switch(s[3]){case`autofiltercolumn`:break;case`autofiltercondition`:break;case`autofilterand`:break;case`autofilteror`:break;default:le=!1}break;case`querytable`:switch(s[3]){case`id`:break;case`autoformatfont`:break;case`autoformatpattern`:break;case`querysource`:break;case`querytype`:break;case`enableredirections`:break;case`refreshedinxl9`:break;case`urlstring`:break;case`htmltables`:break;case`connection`:break;case`commandtext`:break;case`refreshinfo`:break;case`notitles`:break;case`nextid`:break;case`columninfo`:break;case`overwritecells`:break;case`donotpromptforfile`:break;case`textwizardsettings`:break;case`source`:break;case`number`:break;case`decimal`:break;case`thousandseparator`:break;case`trailingminusnumbers`:break;case`formatsettings`:break;case`fieldtype`:break;case`delimiters`:break;case`tab`:break;case`comma`:break;case`autoformatname`:break;case`versionlastedit`:break;case`versionlastrefresh`:break;default:le=!1}break;case`datavalidation`:switch(s[3]){case`range`:break;case`type`:break;case`min`:break;case`max`:break;case`sort`:break;case`descending`:break;case`order`:break;case`casesensitive`:break;case`value`:break;case`errorstyle`:break;case`errormessage`:break;case`errortitle`:break;case`inputmessage`:break;case`inputtitle`:break;case`combohide`:break;case`inputhide`:break;case`condition`:break;case`qualifier`:break;case`useblank`:break;case`value1`:break;case`value2`:break;case`format`:break;case`cellrangelist`:break;default:le=!1}break;case`sorting`:case`conditionalformatting`:switch(s[3]){case`range`:break;case`type`:break;case`min`:break;case`max`:break;case`sort`:break;case`descending`:break;case`order`:break;case`casesensitive`:break;case`value`:break;case`errorstyle`:break;case`errormessage`:break;case`errortitle`:break;case`cellrangelist`:break;case`inputmessage`:break;case`inputtitle`:break;case`combohide`:break;case`inputhide`:break;case`condition`:break;case`qualifier`:break;case`useblank`:break;case`value1`:break;case`value2`:break;case`format`:break;default:le=!1}break;case`mapinfo`:case`schema`:case`data`:switch(s[3]){case`map`:break;case`entry`:break;case`range`:break;case`xpath`:break;case`field`:break;case`xsdtype`:break;case`filteron`:break;case`aggregate`:break;case`elementtype`:break;case`attributetype`:break;case`schema`:case`element`:case`complextype`:case`datatype`:case`all`:case`attribute`:case`extends`:break;case`row`:break;default:le=!1}break;case`smarttags`:break;default:le=!1;break}if(le||s[3].match(/!\[CDATA/))break;if(!c[c.length-1][1])throw`Unrecognized tag: `+s[3]+`|`+c.join(`|`);if(c[c.length-1][0]===`customdocumentproperties`){if(s[0].slice(-2)===`/>`)break;s[1]===`/`?A_(D,re,k,r.slice(O,s.index)):(k=s,O=s.index+s[0].length);break}if(n.WTF)throw`Unrecognized tag: `+s[3]+`|`+c.join(`|`)}var de={};return!n.bookSheets&&!n.bookProps&&(de.Sheets=u),de.SheetNames=d,de.Workbook=te,de.SSF=En(H),de.Props=E,de.Custprops=D,de}function I_(e,t){switch(ky(t||={}),t.type||`base64`){case`base64`:return F_(Me(e),t);case`binary`:case`buffer`:case`file`:return F_(e,t);case`array`:return F_(ze(e),t)}}function L_(e,t){var n=[];return e.Props&&n.push(wo(e.Props,t)),e.Custprops&&n.push(To(e.Props,e.Custprops,t)),n.join(``)}function R_(){return``}function z_(e,t){var n=[`<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>`];return t.cellXfs.forEach(function(e,t){var r=[];r.push(G(`NumberFormat`,null,{"ss:Format":rr(H[e.numFmtId])}));var i={"ss:ID":`s`+(21+t)};n.push(G(`Style`,r.join(``),i))}),G(`Styles`,n.join(``))}function B_(e){return G(`NamedRange`,null,{"ss:Name":e.Name,"ss:RefersTo":`=`+Cf(e.Ref,{r:0,c:0})})}function V_(e){if(!((e||{}).Workbook||{}).Names)return``;for(var t=e.Workbook.Names,n=[],r=0;r<t.length;++r){var i=t[r];i.Sheet??(i.Name.match(/^_xlfn\./)||n.push(B_(i)))}return G(`Names`,n.join(``))}function H_(e,t,n,r){if(!e||!((r||{}).Workbook||{}).Names)return``;for(var i=r.Workbook.Names,a=[],o=0;o<i.length;++o){var s=i[o];s.Sheet==n&&(s.Name.match(/^_xlfn\./)||a.push(B_(s)))}return a.join(``)}function U_(e,t,n,r){if(!e)return``;var i=[];if(e[`!margins`]&&(i.push(`<PageSetup>`),e[`!margins`].header&&i.push(G(`Header`,null,{"x:Margin":e[`!margins`].header})),e[`!margins`].footer&&i.push(G(`Footer`,null,{"x:Margin":e[`!margins`].footer})),i.push(G(`PageMargins`,null,{"x:Bottom":e[`!margins`].bottom||`0.75`,"x:Left":e[`!margins`].left||`0.7`,"x:Right":e[`!margins`].right||`0.7`,"x:Top":e[`!margins`].top||`0.75`})),i.push(`</PageSetup>`)),r&&r.Workbook&&r.Workbook.Sheets&&r.Workbook.Sheets[n])if(r.Workbook.Sheets[n].Hidden)i.push(G(`Visible`,r.Workbook.Sheets[n].Hidden==1?`SheetHidden`:`SheetVeryHidden`,{}));else{for(var a=0;a<n&&!(r.Workbook.Sheets[a]&&!r.Workbook.Sheets[a].Hidden);++a);a==n&&i.push(`<Selected/>`)}return((((r||{}).Workbook||{}).Views||[])[0]||{}).RTL&&i.push(`<DisplayRightToLeft/>`),e[`!protect`]&&(i.push(wr(`ProtectContents`,`True`)),e[`!protect`].objects&&i.push(wr(`ProtectObjects`,`True`)),e[`!protect`].scenarios&&i.push(wr(`ProtectScenarios`,`True`)),e[`!protect`].selectLockedCells!=null&&!e[`!protect`].selectLockedCells?i.push(wr(`EnableSelection`,`NoSelection`)):e[`!protect`].selectUnlockedCells!=null&&!e[`!protect`].selectUnlockedCells&&i.push(wr(`EnableSelection`,`UnlockedCells`)),[[`formatCells`,`AllowFormatCells`],[`formatColumns`,`AllowSizeCols`],[`formatRows`,`AllowSizeRows`],[`insertColumns`,`AllowInsertCols`],[`insertRows`,`AllowInsertRows`],[`insertHyperlinks`,`AllowInsertHyperlinks`],[`deleteColumns`,`AllowDeleteCols`],[`deleteRows`,`AllowDeleteRows`],[`sort`,`AllowSort`],[`autoFilter`,`AllowFilter`],[`pivotTables`,`AllowUsePivotTables`]].forEach(function(t){e[`!protect`][t[0]]&&i.push(`<`+t[1]+`/>`)})),i.length==0?``:G(`WorksheetOptions`,i.join(``),{xmlns:Mr.x})}function W_(e){return e.map(function(e){return G(`Comment`,G(`ss:Data`,lr(e.t||``),{xmlns:`http://www.w3.org/TR/REC-html40`}),{"ss:Author":e.a})}).join(``)}function G_(e,t,n,r,i,a,o){if(!e||e.v==null&&e.f==null)return``;var s={};if(e.f&&(s[`ss:Formula`]=`=`+rr(Cf(e.f,o))),e.F&&e.F.slice(0,t.length)==t){var c=Mi(e.F.slice(t.length+1));s[`ss:ArrayRange`]=`RC:R`+(c.r==o.r?``:`[`+(c.r-o.r)+`]`)+`C`+(c.c==o.c?``:`[`+(c.c-o.c)+`]`)}if(e.l&&e.l.Target&&(s[`ss:HRef`]=rr(e.l.Target),e.l.Tooltip&&(s[`x:HRefScreenTip`]=rr(e.l.Tooltip))),n[`!merges`])for(var l=n[`!merges`],u=0;u!=l.length;++u)l[u].s.c!=o.c||l[u].s.r!=o.r||(l[u].e.c>l[u].s.c&&(s[`ss:MergeAcross`]=l[u].e.c-l[u].s.c),l[u].e.r>l[u].s.r&&(s[`ss:MergeDown`]=l[u].e.r-l[u].s.r));var d=``,f=``;switch(e.t){case`z`:if(!r.sheetStubs)return``;break;case`n`:d=`Number`,f=String(e.v);break;case`b`:d=`Boolean`,f=e.v?`1`:`0`;break;case`e`:d=`Error`,f=Ha[e.v];break;case`d`:d=`DateTime`,f=new Date(e.v).toISOString(),e.z??=e.z||H[14];break;case`s`:d=`String`,f=sr(e.v||``);break}s[`ss:StyleID`]=`s`+(21+km(r.cellXfs,e,r)),s[`ss:Index`]=o.c+1;var p=e.v==null?``:f,m=e.t==`z`?``:`<Data ss:Type="`+d+`">`+p+`</Data>`;return(e.c||[]).length>0&&(m+=W_(e.c)),G(`Cell`,m,s)}function K_(e,t){var n=`<Row ss:Index="`+(e+1)+`"`;return t&&(t.hpt&&!t.hpx&&(t.hpx=ju(t.hpt)),t.hpx&&(n+=` ss:AutoFitHeight="0" ss:Height="`+t.hpx+`"`),t.hidden&&(n+=` ss:Hidden="1"`)),n+`>`}function q_(e,t,n,r){if(!e[`!ref`])return``;var i=Fi(e[`!ref`]),a=e[`!merges`]||[],o=0,s=[];e[`!cols`]&&e[`!cols`].forEach(function(e,t){Ou(e);var n=!!e.width,r=Dm(t,e),i={"ss:Index":t+1};n&&(i[`ss:Width`]=Cu(r.width)),e.hidden&&(i[`ss:Hidden`]=`1`),s.push(G(`Column`,null,i))});for(var c=Array.isArray(e),l=i.s.r;l<=i.e.r;++l){for(var u=[K_(l,(e[`!rows`]||[])[l])],d=i.s.c;d<=i.e.c;++d){var f=!1;for(o=0;o!=a.length;++o)if(!(a[o].s.c>d)&&!(a[o].s.r>l)&&!(a[o].e.c<d)&&!(a[o].e.r<l)){(a[o].s.c!=d||a[o].s.r!=l)&&(f=!0);break}if(!f){var p={r:l,c:d},m=J(p),h=c?(e[l]||[])[d]:e[m];u.push(G_(h,m,e,t,n,r,p))}}u.push(`</Row>`),u.length>2&&s.push(u.join(``))}return s.join(``)}function J_(e,t,n){var r=[],i=n.SheetNames[e],a=n.Sheets[i],o=a?H_(a,t,e,n):``;return o.length>0&&r.push(`<Names>`+o+`</Names>`),o=a?q_(a,t,e,n):``,o.length>0&&r.push(`<Table>`+o+`</Table>`),r.push(U_(a,t,e,n)),r.join(``)}function Y_(e,t){t||={},e.SSF||=En(H),e.SSF&&(Qt(),Zt(e.SSF),t.revssf=fn(e.SSF),t.revssf[e.SSF[65535]]=0,t.ssf=e.SSF,t.cellXfs=[],km(t.cellXfs,{},{revssf:{General:0}}));var n=[];n.push(L_(e,t)),n.push(R_(e,t)),n.push(``),n.push(``);for(var r=0;r<e.SheetNames.length;++r)n.push(G(`Worksheet`,J_(r,t,e),{"ss:Name":rr(e.SheetNames[r])}));return n[2]=z_(e,t),n[3]=V_(e,t),Gn+G(`Workbook`,n.join(``),{xmlns:Mr.ss,"xmlns:o":Mr.o,"xmlns:x":Mr.x,"xmlns:ss":Mr.ss,"xmlns:dt":Mr.dt,"xmlns:html":Mr.html})}function X_(e){var t={},n=e.content;if(n.l=28,t.AnsiUserType=n.read_shift(0,`lpstr-ansi`),t.AnsiClipboardFormat=xa(n),n.length-n.l<=4)return t;var r=n.read_shift(4);if(r==0||r>40||(n.l-=4,t.Reserved1=n.read_shift(0,`lpstr-ansi`),n.length-n.l<=4)||(r=n.read_shift(4),r!==1907505652)||(t.UnicodeClipboardFormat=Sa(n),r=n.read_shift(4),r==0||r>40))return t;n.l-=4,t.Reserved2=n.read_shift(0,`lpwstr`)}var Z_=[60,1084,2066,2165,2175];function Q_(e,t,n,r,i){var a=r,o=[],s=n.slice(n.l,n.l+a);if(i&&i.enc&&i.enc.insitu&&s.length>0)switch(e){case 9:case 521:case 1033:case 2057:case 47:case 405:case 225:case 406:case 312:case 404:case 10:break;case 133:break;default:i.enc.insitu(s)}o.push(s),n.l+=a;for(var c=ii(n,n.l),l=cv[c],u=0;l!=null&&Z_.indexOf(c)>-1;)a=ii(n,n.l+2),u=n.l+4,c==2066?u+=4:(c==2165||c==2175)&&(u+=12),s=n.slice(u,n.l+4+a),o.push(s),n.l+=4+a,l=cv[c=ii(n,n.l)];var d=He(o);hi(d,0);var f=0;d.lens=[];for(var p=0;p<o.length;++p)d.lens.push(f),f+=o[p].length;if(d.length<r)throw`XLS Record 0x`+e.toString(16)+` Truncated: `+d.length+` < `+r;return t.f(d,d.length,i)}function $_(e,t,n){if(e.t!==`z`&&e.XF){var r=0;try{r=e.z||e.XF.numFmtId||0,t.cellNF&&(e.z=H[r])}catch(e){if(t.WTF)throw e}if(!t||t.cellText!==!1)try{e.t===`e`?e.w=e.w||Ha[e.v]:r===0||r==`General`?e.t===`n`?(e.v|0)===e.v?e.w=e.v.toString(10):e.w=gt(e.v):e.w=_t(e.v):e.w=Yt(r,e.v,{date1904:!!n,dateNF:t&&t.dateNF})}catch(e){if(t.WTF)throw e}if(t.cellDates&&r&&e.t==`n`&&Wt(H[r]||String(r))){var i=st(e.v);i&&(e.t=`d`,e.v=new Date(i.y,i.m-1,i.d,i.H,i.M,i.S,i.u))}}}function ev(e,t,n){return{v:e,ixfe:t,t:n}}function tv(e,t){var n={opts:{}},r={};Oe!=null&&t.dense==null&&(t.dense=Oe);var i=t.dense?[]:{},a={},o={},s=null,c=[],l=``,u={},d,f=``,p,m,h,g,_={},v=[],y,b,x=[],S=[],C={Sheets:[],WBProps:{date1904:!1},Views:[{}]},w={},T=function(e){return e<8?Va[e]:e<64&&S[e-8]||Va[e]},E=function(e,t,n){var r=t.XF.data;if(!(!r||!r.patternType||!n||!n.cellStyles)){t.s={},t.s.patternType=r.patternType;var i;(i=hu(T(r.icvFore)))&&(t.s.fgColor={rgb:i}),(i=hu(T(r.icvBack)))&&(t.s.bgColor={rgb:i})}},D=function(e,t,n){if(!(L>1)&&!(n.sheetRows&&e.r>=n.sheetRows)){if(n.cellStyles&&t.XF&&t.XF.data&&E(e,t,n),delete t.ixfe,delete t.XF,d=e,f=J(e),(!o||!o.s||!o.e)&&(o={s:{r:0,c:0},e:{r:0,c:0}}),e.r<o.s.r&&(o.s.r=e.r),e.c<o.s.c&&(o.s.c=e.c),e.r+1>o.e.r&&(o.e.r=e.r+1),e.c+1>o.e.c&&(o.e.c=e.c+1),n.cellFormula&&t.f){for(var r=0;r<v.length;++r)if(!(v[r][0].s.c>e.c||v[r][0].s.r>e.r)&&!(v[r][0].e.c<e.c||v[r][0].e.r<e.r)){t.F=Pi(v[r][0]),(v[r][0].s.c!=e.c||v[r][0].s.r!=e.r)&&delete t.f,t.f&&=``+nm(v[r][1],o,e,F,O);break}}n.dense?(i[e.r]||(i[e.r]=[]),i[e.r][e.c]=t):i[f]=t}},O={enc:!1,sbcch:0,snames:[],sharedf:_,arrayf:v,rrtabid:[],lastuser:``,biff:8,codepage:0,winlocked:0,cellStyles:!!t&&!!t.cellStyles,WTF:!!t&&!!t.wtf};t.password&&(O.password=t.password);var k,A=[],j=[],M=[],N=[],P=!1,F=[];F.SheetNames=O.snames,F.sharedf=O.sharedf,F.arrayf=O.arrayf,F.names=[],F.XTI=[];var I=0,L=0,R=0,ee=[],te=[],ne;O.codepage=1200,ye(1200);for(var re=!1;e.l<e.length-1;){var ie=e.l,z=e.read_shift(2);if(z===0&&I===10)break;var B=e.l===e.length?0:e.read_shift(2),ae=cv[z];if(ae&&ae.f){if(t.bookSheets&&I===133&&z!==133)break;if(I=z,ae.r===2||ae.r==12){var oe=e.read_shift(2);if(B-=2,!O.enc&&oe!==z&&((oe&255)<<8|oe>>8)!==z)throw Error(`rt mismatch: `+oe+`!=`+z);ae.r==12&&(e.l+=10,B-=10)}var V={};if(V=z===10?ae.f(e,B,O):Q_(z,ae,e,B,O),L==0&&[9,521,1033,2057].indexOf(I)===-1)continue;switch(z){case 34:n.opts.Date1904=C.WBProps.date1904=V;break;case 134:n.opts.WriteProtect=!0;break;case 47:if(O.enc||(e.l=0),O.enc=V,!t.password)throw Error(`File is password-protected`);if(V.valid==null)throw Error(`Encryption scheme unsupported`);if(!V.valid)throw Error(`Password is incorrect`);break;case 92:O.lastuser=V;break;case 66:var se=Number(V);switch(se){case 21010:se=1200;break;case 32768:se=1e4;break;case 32769:se=1252;break}ye(O.codepage=se),re=!0;break;case 317:O.rrtabid=V;break;case 25:O.winlocked=V;break;case 439:n.opts.RefreshAll=V;break;case 12:n.opts.CalcCount=V;break;case 16:n.opts.CalcDelta=V;break;case 17:n.opts.CalcIter=V;break;case 13:n.opts.CalcMode=V;break;case 14:n.opts.CalcPrecision=V;break;case 95:n.opts.CalcSaveRecalc=V;break;case 15:O.CalcRefMode=V;break;case 2211:n.opts.FullCalc=V;break;case 129:V.fDialog&&(i[`!type`]=`dialog`),V.fBelow||((i[`!outline`]||={}).above=!0),V.fRight||((i[`!outline`]||={}).left=!0);break;case 224:x.push(V);break;case 430:F.push([V]),F[F.length-1].XTI=[];break;case 35:case 547:F[F.length-1].push(V);break;case 24:case 536:ne={Name:V.Name,Ref:nm(V.rgce,o,null,F,O)},V.itab>0&&(ne.Sheet=V.itab-1),F.names.push(ne),F[0]||(F[0]=[],F[0].XTI=[]),F[F.length-1].push(V),V.Name==`_xlnm._FilterDatabase`&&V.itab>0&&V.rgce&&V.rgce[0]&&V.rgce[0][0]&&V.rgce[0][0][0]==`PtgArea3d`&&(te[V.itab-1]={ref:Pi(V.rgce[0][0][1][2])});break;case 22:O.ExternCount=V;break;case 23:F.length==0&&(F[0]=[],F[0].XTI=[]),F[F.length-1].XTI=F[F.length-1].XTI.concat(V),F.XTI=F.XTI.concat(V);break;case 2196:if(O.biff<8)break;ne!=null&&(ne.Comment=V[1]);break;case 18:i[`!protect`]=V;break;case 19:V!==0&&O.WTF&&console.error(`Password verifier: `+V);break;case 133:a[V.pos]=V,O.snames.push(V.name);break;case 10:if(--L)break;if(o.e){if(o.e.r>0&&o.e.c>0){if(o.e.r--,o.e.c--,i[`!ref`]=Pi(o),t.sheetRows&&t.sheetRows<=o.e.r){var ce=o.e.r;o.e.r=t.sheetRows-1,i[`!fullref`]=i[`!ref`],i[`!ref`]=Pi(o),o.e.r=ce}o.e.r++,o.e.c++}A.length>0&&(i[`!merges`]=A),j.length>0&&(i[`!objects`]=j),M.length>0&&(i[`!cols`]=M),N.length>0&&(i[`!rows`]=N),C.Sheets.push(w)}l===``?u=i:r[l]=i,i=t.dense?[]:{};break;case 9:case 521:case 1033:case 2057:if(O.biff===8&&(O.biff={9:2,521:3,1033:4}[z]||{512:2,768:3,1024:4,1280:5,1536:8,2:2,7:2}[V.BIFFVer]||8),O.biffguess=V.BIFFVer==0,V.BIFFVer==0&&V.dt==4096&&(O.biff=5,re=!0,ye(O.codepage=28591)),O.biff==8&&V.BIFFVer==0&&V.dt==16&&(O.biff=2),L++)break;if(i=t.dense?[]:{},O.biff<8&&!re&&(re=!0,ye(O.codepage=t.codepage||1252)),O.biff<5||V.BIFFVer==0&&V.dt==4096){l===``&&(l=`Sheet1`),o={s:{r:0,c:0},e:{r:0,c:0}};var le={pos:e.l-B,name:l};a[le.pos]=le,O.snames.push(l)}else l=(a[ie]||{name:``}).name;V.dt==32&&(i[`!type`]=`chart`),V.dt==64&&(i[`!type`]=`macro`),A=[],j=[],O.arrayf=v=[],M=[],N=[],P=!1,w={Hidden:(a[ie]||{hs:0}).hs,name:l};break;case 515:case 3:case 2:i[`!type`]==`chart`&&(t.dense?(i[V.r]||[])[V.c]:i[J({c:V.c,r:V.r})])&&++V.c,y={ixfe:V.ixfe,XF:x[V.ixfe]||{},v:V.val,t:`n`},R>0&&(y.z=ee[y.ixfe>>8&63]),$_(y,t,n.opts.Date1904),D({c:V.c,r:V.r},y,t);break;case 5:case 517:y={ixfe:V.ixfe,XF:x[V.ixfe],v:V.val,t:V.t},R>0&&(y.z=ee[y.ixfe>>8&63]),$_(y,t,n.opts.Date1904),D({c:V.c,r:V.r},y,t);break;case 638:y={ixfe:V.ixfe,XF:x[V.ixfe],v:V.rknum,t:`n`},R>0&&(y.z=ee[y.ixfe>>8&63]),$_(y,t,n.opts.Date1904),D({c:V.c,r:V.r},y,t);break;case 189:for(var ue=V.c;ue<=V.C;++ue){var de=V.rkrec[ue-V.c][0];y={ixfe:de,XF:x[de],v:V.rkrec[ue-V.c][1],t:`n`},R>0&&(y.z=ee[y.ixfe>>8&63]),$_(y,t,n.opts.Date1904),D({c:ue,r:V.r},y,t)}break;case 6:case 518:case 1030:if(V.val==`String`){s=V;break}if(y=ev(V.val,V.cell.ixfe,V.tt),y.XF=x[y.ixfe],t.cellFormula){var fe=V.formula;if(fe&&fe[0]&&fe[0][0]&&fe[0][0][0]==`PtgExp`){var pe=fe[0][0][1][0],me=fe[0][0][1][1],he=J({r:pe,c:me});_[he]?y.f=``+nm(V.formula,o,V.cell,F,O):y.F=((t.dense?(i[pe]||[])[me]:i[he])||{}).F}else y.f=``+nm(V.formula,o,V.cell,F,O)}R>0&&(y.z=ee[y.ixfe>>8&63]),$_(y,t,n.opts.Date1904),D(V.cell,y,t),s=V;break;case 7:case 519:if(s)s.val=V,y=ev(V,s.cell.ixfe,`s`),y.XF=x[y.ixfe],t.cellFormula&&(y.f=``+nm(s.formula,o,s.cell,F,O)),R>0&&(y.z=ee[y.ixfe>>8&63]),$_(y,t,n.opts.Date1904),D(s.cell,y,t),s=null;else throw Error(`String record expects Formula`);break;case 33:case 545:v.push(V);var ge=J(V[0].s);if(p=t.dense?(i[V[0].s.r]||[])[V[0].s.c]:i[ge],t.cellFormula&&p){if(!s||!ge||!p)break;p.f=``+nm(V[1],o,V[0],F,O),p.F=Pi(V[0])}break;case 1212:if(!t.cellFormula)break;if(f){if(!s)break;_[J(s.cell)]=V[0],p=t.dense?(i[s.cell.r]||[])[s.cell.c]:i[J(s.cell)],(p||{}).f=``+nm(V[0],o,d,F,O)}break;case 253:y=ev(c[V.isst].t,V.ixfe,`s`),c[V.isst].h&&(y.h=c[V.isst].h),y.XF=x[y.ixfe],R>0&&(y.z=ee[y.ixfe>>8&63]),$_(y,t,n.opts.Date1904),D({c:V.c,r:V.r},y,t);break;case 513:t.sheetStubs&&(y={ixfe:V.ixfe,XF:x[V.ixfe],t:`z`},R>0&&(y.z=ee[y.ixfe>>8&63]),$_(y,t,n.opts.Date1904),D({c:V.c,r:V.r},y,t));break;case 190:if(t.sheetStubs)for(var _e=V.c;_e<=V.C;++_e){var ve=V.ixfe[_e-V.c];y={ixfe:ve,XF:x[ve],t:`z`},R>0&&(y.z=ee[y.ixfe>>8&63]),$_(y,t,n.opts.Date1904),D({c:_e,r:V.r},y,t)}break;case 214:case 516:case 4:y=ev(V.val,V.ixfe,`s`),y.XF=x[y.ixfe],R>0&&(y.z=ee[y.ixfe>>8&63]),$_(y,t,n.opts.Date1904),D({c:V.c,r:V.r},y,t);break;case 0:case 512:L===1&&(o=V);break;case 252:c=V;break;case 1054:if(O.biff==4){ee[R++]=V[1];for(var be=0;be<R+163&&H[be]!=V[1];++be);be>=163&&Xt(V[1],R+163)}else Xt(V[1],V[0]);break;case 30:ee[R++]=V;for(var xe=0;xe<R+163&&H[xe]!=V;++xe);xe>=163&&Xt(V,R+163);break;case 229:A=A.concat(V);break;case 93:j[V.cmo[0]]=O.lastobj=V;break;case 438:O.lastobj.TxO=V;break;case 127:O.lastobj.ImData=V;break;case 440:for(g=V[0].s.r;g<=V[0].e.r;++g)for(h=V[0].s.c;h<=V[0].e.c;++h)p=t.dense?(i[g]||[])[h]:i[J({c:h,r:g})],p&&(p.l=V[1]);break;case 2048:for(g=V[0].s.r;g<=V[0].e.r;++g)for(h=V[0].s.c;h<=V[0].e.c;++h)p=t.dense?(i[g]||[])[h]:i[J({c:h,r:g})],p&&p.l&&(p.l.Tooltip=V[1]);break;case 28:if(O.biff<=5&&O.biff>=2)break;p=t.dense?(i[V[0].r]||[])[V[0].c]:i[J(V[0])];var Se=j[V[2]];p||(t.dense?(i[V[0].r]||(i[V[0].r]=[]),p=i[V[0].r][V[0].c]={t:`z`}):p=i[J(V[0])]={t:`z`},o.e.r=Math.max(o.e.r,V[0].r),o.s.r=Math.min(o.s.r,V[0].r),o.e.c=Math.max(o.e.c,V[0].c),o.s.c=Math.min(o.s.c,V[0].c)),p.c||=[],m={a:V[1],t:Se.TxO.t},p.c.push(m);break;case 2173:Pd(x[V.ixfe],V.ext);break;case 125:if(!O.cellStyles)break;for(;V.e>=V.s;)M[V.e--]={width:V.w/256,level:V.level||0,hidden:!!(V.flags&1)},P||(P=!0,Du(V.w/256)),Ou(M[V.e+1]);break;case 520:var Ce={};V.level!=null&&(N[V.r]=Ce,Ce.level=V.level),V.hidden&&(N[V.r]=Ce,Ce.hidden=!0),V.hpt&&(N[V.r]=Ce,Ce.hpt=V.hpt,Ce.hpx=ju(V.hpt));break;case 38:case 39:case 40:case 41:i[`!margins`]||Om(i[`!margins`]={}),i[`!margins`][{38:`left`,39:`right`,40:`top`,41:`bottom`}[z]]=V;break;case 161:i[`!margins`]||Om(i[`!margins`]={}),i[`!margins`].header=V.header,i[`!margins`].footer=V.footer;break;case 574:V.RTL&&(C.Views[0].RTL=!0);break;case 146:S=V;break;case 2198:k=V;break;case 140:b=V;break;case 442:l?w.CodeName=V||w.name:C.WBProps.CodeName=V||`ThisWorkbook`;break}}else ae||console.error(`Missing Info for XLS Record 0x`+z.toString(16)),e.l+=B}return n.SheetNames=ln(a).sort(function(e,t){return Number(e)-Number(t)}).map(function(e){return a[e].name}),t.bookSheets||(n.Sheets=r),!n.SheetNames.length&&u[`!ref`]?(n.SheetNames.push(`Sheet1`),n.Sheets&&(n.Sheets.Sheet1=u)):n.Preamble=u,n.Sheets&&te.forEach(function(e,t){n.Sheets[n.SheetNames[t]][`!autofilter`]=e}),n.Strings=c,n.SSF=En(H),O.enc&&(n.Encryption=O.enc),k&&(n.Themes=k),n.Metadata={},b!==void 0&&(n.Metadata.Country=b),F.names.length>0&&(C.Names=F.names),n.Workbook=C,n}var nv={SI:`e0859ff2f94f6810ab9108002b27b3d9`,DSI:`02d5cdd59c2e1b10939708002b2cf9ae`,UDI:`05d5cdd59c2e1b10939708002b2cf9ae`};function rv(e,t,n){var r=U.find(e,`/!DocumentSummaryInformation`);if(r&&r.size>0)try{var i=Ko(r,Ia,nv.DSI);for(var a in i)t[a]=i[a]}catch(e){if(n.WTF)throw e}var o=U.find(e,`/!SummaryInformation`);if(o&&o.size>0)try{var s=Ko(o,La,nv.SI);for(var c in s)t[c]??(t[c]=s[c])}catch(e){if(n.WTF)throw e}t.HeadingPairs&&t.TitlesOfParts&&(ho(t.HeadingPairs,t.TitlesOfParts,t,n),delete t.HeadingPairs,delete t.TitlesOfParts)}function iv(e,t){var n=[],r=[],i=[],a=0,o,s=un(Ia,`n`),c=un(La,`n`);if(e.Props)for(o=ln(e.Props),a=0;a<o.length;++a)(Object.prototype.hasOwnProperty.call(s,o[a])?n:Object.prototype.hasOwnProperty.call(c,o[a])?r:i).push([o[a],e.Props[o[a]]]);if(e.Custprops)for(o=ln(e.Custprops),a=0;a<o.length;++a)Object.prototype.hasOwnProperty.call(e.Props||{},o[a])||(Object.prototype.hasOwnProperty.call(s,o[a])?n:Object.prototype.hasOwnProperty.call(c,o[a])?r:i).push([o[a],e.Custprops[o[a]]]);var l=[];for(a=0;a<i.length;++a)Uo.indexOf(i[a][0])>-1||mo.indexOf(i[a][0])>-1||i[a][1]!=null&&l.push(i[a]);r.length&&U.utils.cfb_add(t,`/SummaryInformation`,qo(r,nv.SI,c,La)),(n.length||l.length)&&U.utils.cfb_add(t,`/DocumentSummaryInformation`,qo(n,nv.DSI,s,Ia,l.length?l:null,nv.UDI))}function av(e,t){t||={},ky(t),be(),t.codepage&&_e(t.codepage);var n,r;if(e.FullPaths){if(U.find(e,`/encryption`))throw Error(`File is password-protected`);n=U.find(e,`!CompObj`),r=U.find(e,`/Workbook`)||U.find(e,`/Book`)}else{switch(t.type){case`base64`:e=Le(Me(e));break;case`binary`:e=Le(e);break;case`buffer`:break;case`array`:Array.isArray(e)||(e=Array.prototype.slice.call(e));break}hi(e,0),r={content:e}}var i,a;if(n&&X_(n),t.bookProps&&!t.bookSheets)i={};else{var o=Ne?`buffer`:`array`;if(r&&r.content)i=tv(r.content,t);else if((a=U.find(e,`PerfectOffice_MAIN`))&&a.content)i=Tl.to_workbook(a.content,(t.type=o,t));else if((a=U.find(e,`NativeContent_MAIN`))&&a.content)i=Tl.to_workbook(a.content,(t.type=o,t));else if((a=U.find(e,`MN0`))&&a.content)throw Error(`Unsupported Works 4 for Mac file`);else throw Error(`Cannot find Workbook stream`);t.bookVBA&&e.FullPaths&&U.find(e,`/_VBA_PROJECT_CUR/VBA/dir`)&&(i.vbaraw=mf(e))}var s={};return e.FullPaths&&rv(e,s,t),i.Props=i.Custprops=s,t.bookFiles&&(i.cfb=e),i}function ov(e,t){var n=t||{},r=U.utils.cfb_new({root:`R`}),i=`/Workbook`;switch(n.bookType||`xls`){case`xls`:n.bookType=`biff8`;case`xla`:n.bookType||=`xla`;case`biff8`:i=`/Workbook`,n.biff=8;break;case`biff5`:i=`/Book`,n.biff=5;break;default:throw Error(`invalid type `+n.bookType+` for XLS CFB`)}return U.utils.cfb_add(r,i,Ev(e,n)),n.biff==8&&(e.Props||e.Custprops)&&iv(e,r),n.biff==8&&e.vbaraw&&hf(r,U.read(e.vbaraw,{type:typeof e.vbaraw==`string`?`binary`:`buffer`})),r}var sv={0:{f:dh},1:{f:yh},2:{f:zh},3:{f:Dh},4:{f:Ch},5:{f:Fh},6:{f:Wh},7:{f:jh},8:{f:Zh},9:{f:Xh},10:{f:Jh},11:{f:Yh},12:{f:xh},13:{f:Vh},14:{f:kh},15:{f:Th},16:{f:Lh},17:{f:Kh},18:{f:Nh},19:{f:qi},20:{},21:{},22:{},23:{},24:{},25:{},26:{},27:{},28:{},29:{},30:{},31:{},32:{},33:{},34:{},35:{T:1},36:{T:-1},37:{T:1},38:{T:-1},39:{f:$g},40:{},42:{},43:{f:Ku},44:{f:Wu},45:{f:Xu},46:{f:td},47:{f:Qu},48:{},49:{f:Vi},50:{},51:{f:Ld},52:{T:1},53:{T:-1},54:{T:1},55:{T:-1},56:{T:1},57:{T:-1},58:{},59:{},60:{f:tl},62:{f:Uh},63:{f:qd},64:{f:mg},65:{},66:{},67:{},68:{},69:{},70:{},128:{},129:{T:1},130:{T:-1},131:{T:1,f:gi,p:0},132:{T:-1},133:{T:1},134:{T:-1},135:{T:1},136:{T:-1},137:{T:1,f:ug},138:{T:-1},139:{T:1},140:{T:-1},141:{T:1},142:{T:-1},143:{T:1},144:{T:-1},145:{T:1},146:{T:-1},147:{f:_h},148:{f:mh,p:16},151:{f:rg},152:{},153:{f:Xg},154:{},155:{},156:{f:Jg},157:{},158:{},159:{T:1,f:zl},160:{T:-1},161:{T:1,f:fa},162:{T:-1},163:{T:1},164:{T:-1},165:{T:1},166:{T:-1},167:{},168:{},169:{},170:{},171:{},172:{T:1},173:{T:-1},174:{},175:{},176:{f:Qh},177:{T:1},178:{T:-1},179:{T:1},180:{T:-1},181:{T:1},182:{T:-1},183:{T:1},184:{T:-1},185:{T:1},186:{T:-1},187:{T:1},188:{T:-1},189:{T:1},190:{T:-1},191:{T:1},192:{T:-1},193:{T:1},194:{T:-1},195:{T:1},196:{T:-1},197:{T:1},198:{T:-1},199:{T:1},200:{T:-1},201:{T:1},202:{T:-1},203:{T:1},204:{T:-1},205:{T:1},206:{T:-1},207:{T:1},208:{T:-1},209:{T:1},210:{T:-1},211:{T:1},212:{T:-1},213:{T:1},214:{T:-1},215:{T:1},216:{T:-1},217:{T:1},218:{T:-1},219:{T:1},220:{T:-1},221:{T:1},222:{T:-1},223:{T:1},224:{T:-1},225:{T:1},226:{T:-1},227:{T:1},228:{T:-1},229:{T:1},230:{T:-1},231:{T:1},232:{T:-1},233:{T:1},234:{T:-1},235:{T:1},236:{T:-1},237:{T:1},238:{T:-1},239:{T:1},240:{T:-1},241:{T:1},242:{T:-1},243:{T:1},244:{T:-1},245:{T:1},246:{T:-1},247:{T:1},248:{T:-1},249:{T:1},250:{T:-1},251:{T:1},252:{T:-1},253:{T:1},254:{T:-1},255:{T:1},256:{T:-1},257:{T:1},258:{T:-1},259:{T:1},260:{T:-1},261:{T:1},262:{T:-1},263:{T:1},264:{T:-1},265:{T:1},266:{T:-1},267:{T:1},268:{T:-1},269:{T:1},270:{T:-1},271:{T:1},272:{T:-1},273:{T:1},274:{T:-1},275:{T:1},276:{T:-1},277:{},278:{T:1},279:{T:-1},280:{T:1},281:{T:-1},282:{T:1},283:{T:1},284:{T:-1},285:{T:1},286:{T:-1},287:{T:1},288:{T:-1},289:{T:1},290:{T:-1},291:{T:1},292:{T:-1},293:{T:1},294:{T:-1},295:{T:1},296:{T:-1},297:{T:1},298:{T:-1},299:{T:1},300:{T:-1},301:{T:1},302:{T:-1},303:{T:1},304:{T:-1},305:{T:1},306:{T:-1},307:{T:1},308:{T:-1},309:{T:1},310:{T:-1},311:{T:1},312:{T:-1},313:{T:-1},314:{T:1},315:{T:-1},316:{T:1},317:{T:-1},318:{T:1},319:{T:-1},320:{T:1},321:{T:-1},322:{T:1},323:{T:-1},324:{T:1},325:{T:-1},326:{T:1},327:{T:-1},328:{T:1},329:{T:-1},330:{T:1},331:{T:-1},332:{T:1},333:{T:-1},334:{T:1},335:{f:Fd},336:{T:-1},337:{f:Bd,T:1},338:{T:-1},339:{T:1},340:{T:-1},341:{T:1},342:{T:-1},343:{T:1},344:{T:-1},345:{T:1},346:{T:-1},347:{T:1},348:{T:-1},349:{T:1},350:{T:-1},351:{},352:{},353:{T:1},354:{T:-1},355:{f:oa},357:{},358:{},359:{},360:{T:1},361:{},362:{f:Mc},363:{},364:{},366:{},367:{},368:{},369:{},370:{},371:{},372:{T:1},373:{T:-1},374:{T:1},375:{T:-1},376:{T:1},377:{T:-1},378:{T:1},379:{T:-1},380:{T:1},381:{T:-1},382:{T:1},383:{T:-1},384:{T:1},385:{T:-1},386:{T:1},387:{T:-1},388:{T:1},389:{T:-1},390:{T:1},391:{T:-1},392:{T:1},393:{T:-1},394:{T:1},395:{T:-1},396:{},397:{},398:{},399:{},400:{},401:{T:1},403:{},404:{},405:{},406:{},407:{},408:{},409:{},410:{},411:{},412:{},413:{},414:{},415:{},416:{},417:{},418:{},419:{},420:{},421:{},422:{T:1},423:{T:1},424:{T:-1},425:{T:-1},426:{f:ig},427:{f:ag},428:{},429:{T:1},430:{T:-1},431:{T:1},432:{T:-1},433:{T:1},434:{T:-1},435:{T:1},436:{T:-1},437:{T:1},438:{T:-1},439:{T:1},440:{T:-1},441:{T:1},442:{T:-1},443:{T:1},444:{T:-1},445:{T:1},446:{T:-1},447:{T:1},448:{T:-1},449:{T:1},450:{T:-1},451:{T:1},452:{T:-1},453:{T:1},454:{T:-1},455:{T:1},456:{T:-1},457:{T:1},458:{T:-1},459:{T:1},460:{T:-1},461:{T:1},462:{T:-1},463:{T:1},464:{T:-1},465:{T:1},466:{T:-1},467:{T:1},468:{T:-1},469:{T:1},470:{T:-1},471:{},472:{},473:{T:1},474:{T:-1},475:{},476:{f:cg},477:{},478:{},479:{T:1},480:{T:-1},481:{T:1},482:{T:-1},483:{T:1},484:{T:-1},485:{f:gh},486:{T:1},487:{T:-1},488:{T:1},489:{T:-1},490:{T:1},491:{T:-1},492:{T:1},493:{T:-1},494:{f:tg},495:{T:1},496:{T:-1},497:{T:1},498:{T:-1},499:{},500:{T:1},501:{T:-1},502:{T:1},503:{T:-1},504:{},505:{T:1},506:{T:-1},507:{},508:{T:1},509:{T:-1},510:{T:1},511:{T:-1},512:{},513:{},514:{T:1},515:{T:-1},516:{T:1},517:{T:-1},518:{T:1},519:{T:-1},520:{T:1},521:{T:-1},522:{},523:{},524:{},525:{},526:{},527:{},528:{T:1},529:{T:-1},530:{T:1},531:{T:-1},532:{T:1},533:{T:-1},534:{},535:{},536:{},537:{},538:{T:1},539:{T:-1},540:{T:1},541:{T:-1},542:{T:1},548:{},549:{},550:{f:oa},551:{},552:{},553:{},554:{T:1},555:{T:-1},556:{T:1},557:{T:-1},558:{T:1},559:{T:-1},560:{T:1},561:{T:-1},562:{},564:{},565:{T:1},566:{T:-1},569:{T:1},570:{T:-1},572:{},573:{T:1},574:{T:-1},577:{},578:{},579:{},580:{},581:{},582:{},583:{},584:{},585:{},586:{},587:{},588:{T:-1},589:{},590:{T:1},591:{T:-1},592:{T:1},593:{T:-1},594:{T:1},595:{T:-1},596:{},597:{T:1},598:{T:-1},599:{T:1},600:{T:-1},601:{T:1},602:{T:-1},603:{T:1},604:{T:-1},605:{T:1},606:{T:-1},607:{},608:{T:1},609:{T:-1},610:{},611:{T:1},612:{T:-1},613:{T:1},614:{T:-1},615:{T:1},616:{T:-1},617:{T:1},618:{T:-1},619:{T:1},620:{T:-1},625:{},626:{T:1},627:{T:-1},628:{T:1},629:{T:-1},630:{T:1},631:{T:-1},632:{f:lf},633:{T:1},634:{T:-1},635:{T:1,f:sf},636:{T:-1},637:{f:Yi},638:{T:1},639:{},640:{T:-1},641:{T:1},642:{T:-1},643:{T:1},644:{},645:{T:-1},646:{T:1},648:{T:1},649:{},650:{T:-1},651:{f:jg},652:{},653:{T:1},654:{T:-1},655:{T:1},656:{T:-1},657:{T:1},658:{T:-1},659:{},660:{T:1},661:{},662:{T:-1},663:{},664:{T:1},665:{},666:{T:-1},667:{},668:{},669:{},671:{T:1},672:{T:-1},673:{T:1},674:{T:-1},675:{},676:{},677:{},678:{},679:{},680:{},681:{},1024:{},1025:{},1026:{T:1},1027:{T:-1},1028:{T:1},1029:{T:-1},1030:{},1031:{T:1},1032:{T:-1},1033:{T:1},1034:{T:-1},1035:{},1036:{},1037:{},1038:{T:1},1039:{T:-1},1040:{},1041:{T:1},1042:{T:-1},1043:{},1044:{},1045:{},1046:{T:1},1047:{T:-1},1048:{T:1},1049:{T:-1},1050:{},1051:{T:1},1052:{T:1},1053:{f:hg},1054:{T:1},1055:{},1056:{T:1},1057:{T:-1},1058:{T:1},1059:{T:-1},1061:{},1062:{T:1},1063:{T:-1},1064:{T:1},1065:{T:-1},1066:{T:1},1067:{T:-1},1068:{T:1},1069:{T:-1},1070:{T:1},1071:{T:-1},1072:{T:1},1073:{T:-1},1075:{T:1},1076:{T:-1},1077:{T:1},1078:{T:-1},1079:{T:1},1080:{T:-1},1081:{T:1},1082:{T:-1},1083:{T:1},1084:{T:-1},1085:{},1086:{T:1},1087:{T:-1},1088:{T:1},1089:{T:-1},1090:{T:1},1091:{T:-1},1092:{T:1},1093:{T:-1},1094:{T:1},1095:{T:-1},1096:{},1097:{T:1},1098:{},1099:{T:-1},1100:{T:1},1101:{T:-1},1102:{},1103:{},1104:{},1105:{},1111:{},1112:{},1113:{T:1},1114:{T:-1},1115:{T:1},1116:{T:-1},1117:{},1118:{T:1},1119:{T:-1},1120:{T:1},1121:{T:-1},1122:{T:1},1123:{T:-1},1124:{T:1},1125:{T:-1},1126:{},1128:{T:1},1129:{T:-1},1130:{},1131:{T:1},1132:{T:-1},1133:{T:1},1134:{T:-1},1135:{T:1},1136:{T:-1},1137:{T:1},1138:{T:-1},1139:{T:1},1140:{T:-1},1141:{},1142:{T:1},1143:{T:-1},1144:{T:1},1145:{T:-1},1146:{},1147:{T:1},1148:{T:-1},1149:{T:1},1150:{T:-1},1152:{T:1},1153:{T:-1},1154:{T:-1},1155:{T:-1},1156:{T:-1},1157:{T:1},1158:{T:-1},1159:{T:1},1160:{T:-1},1161:{T:1},1162:{T:-1},1163:{T:1},1164:{T:-1},1165:{T:1},1166:{T:-1},1167:{T:1},1168:{T:-1},1169:{T:1},1170:{T:-1},1171:{},1172:{T:1},1173:{T:-1},1177:{},1178:{T:1},1180:{},1181:{},1182:{},2048:{T:1},2049:{T:-1},2050:{},2051:{T:1},2052:{T:-1},2053:{},2054:{},2055:{T:1},2056:{T:-1},2057:{T:1},2058:{T:-1},2060:{},2067:{},2068:{T:1},2069:{T:-1},2070:{},2071:{},2072:{T:1},2073:{T:-1},2075:{},2076:{},2077:{T:1},2078:{T:-1},2079:{},2080:{T:1},2081:{T:-1},2082:{},2083:{T:1},2084:{T:-1},2085:{T:1},2086:{T:-1},2087:{T:1},2088:{T:-1},2089:{T:1},2090:{T:-1},2091:{},2092:{},2093:{T:1},2094:{T:-1},2095:{},2096:{T:1},2097:{T:-1},2098:{T:1},2099:{T:-1},2100:{T:1},2101:{T:-1},2102:{},2103:{T:1},2104:{T:-1},2105:{},2106:{T:1},2107:{T:-1},2108:{},2109:{T:1},2110:{T:-1},2111:{T:1},2112:{T:-1},2113:{T:1},2114:{T:-1},2115:{},2116:{},2117:{},2118:{T:1},2119:{T:-1},2120:{},2121:{T:1},2122:{T:-1},2123:{T:1},2124:{T:-1},2125:{},2126:{T:1},2127:{T:-1},2128:{},2129:{T:1},2130:{T:-1},2131:{T:1},2132:{T:-1},2133:{T:1},2134:{},2135:{},2136:{},2137:{T:1},2138:{T:-1},2139:{T:1},2140:{T:-1},2141:{},3072:{},3073:{},4096:{T:1},4097:{T:-1},5002:{T:1},5003:{T:-1},5081:{T:1},5082:{T:-1},5083:{},5084:{T:1},5085:{T:-1},5086:{T:1},5087:{T:-1},5088:{},5089:{},5090:{},5092:{T:1},5093:{T:-1},5094:{},5095:{T:1},5096:{T:-1},5097:{},5099:{},65535:{n:``}},cv={6:{f:lm},10:{f:Jo},12:{f:$o},13:{f:$o},14:{f:Zo},15:{f:Zo},16:{f:ma},17:{f:Zo},18:{f:Zo},19:{f:$o},20:{f:Dc},21:{f:Dc},23:{f:Mc},24:{f:jc},25:{f:Zo},26:{},27:{},28:{f:zc},29:{},34:{f:Zo},35:{f:kc},38:{f:ma},39:{f:ma},40:{f:ma},41:{f:ma},42:{f:Zo},43:{f:Zo},47:{f:fu},49:{f:ic},51:{f:$o},60:{},61:{f:$s},64:{f:Zo},65:{f:rc},66:{f:$o},77:{},80:{},81:{},82:{},85:{f:$o},89:{},90:{},91:{},92:{f:Vs},93:{f:Hc},94:{},95:{f:Zo},96:{},97:{},99:{f:Zo},125:{f:tl},128:{f:xc},129:{f:Us},130:{f:$o},131:{f:Zo},132:{f:Zo},133:{f:Ws},134:{},140:{f:Xc},141:{f:$o},144:{},146:{f:$c},151:{},152:{},153:{},154:{},155:{},156:{f:$o},157:{},158:{},160:{f:sl},161:{f:rl},174:{},175:{},176:{},177:{},178:{},180:{},181:{},182:{},184:{},185:{},189:{f:gc},190:{f:_c},193:{f:Jo},197:{},198:{},199:{},200:{},201:{},202:{f:Zo},203:{},204:{},205:{},206:{},207:{},208:{},209:{},210:{},211:{},213:{},215:{},216:{},217:{},218:{f:$o},220:{},221:{f:Zo},222:{},224:{f:yc},225:{f:Bs},226:{f:Jo},227:{},229:{f:Bc},233:{},235:{},236:{},237:{},239:{},240:{},241:{},242:{},244:{},245:{},246:{},247:{},248:{},249:{},251:{},252:{f:Ks},253:{f:oc},255:{f:Js},256:{},259:{},290:{},311:{},312:{},315:{},317:{f:ts},318:{},319:{},320:{},330:{},331:{},333:{},334:{},335:{},336:{},337:{},338:{},339:{},340:{},351:{},352:{f:Zo},353:{f:Jo},401:{},402:{},403:{},404:{},405:{},406:{},407:{},408:{},425:{},426:{},427:{},428:{},429:{},430:{f:Oc},431:{f:Zo},432:{},433:{},434:{},437:{},438:{f:Gc},439:{f:Zo},440:{f:Kc},441:{},442:{f:cs},443:{},444:{f:$o},445:{},446:{},448:{f:Jo},449:{f:Zs,r:2},450:{f:Jo},512:{f:pc},513:{f:ol},515:{f:Tc},516:{f:cc},517:{f:Cc},519:{f:cl},520:{f:Ys},523:{},545:{f:Ic},549:{f:Qs},566:{},574:{f:tc},638:{f:hc},659:{},1048:{},1054:{f:uc},1084:{},1212:{f:Fc},2048:{f:Jc},2049:{},2050:{},2051:{},2052:{},2053:{},2054:{},2055:{},2056:{},2057:{f:Rs},2058:{},2059:{},2060:{},2061:{},2062:{},2063:{},2064:{},2066:{},2067:{},2128:{},2129:{},2130:{},2131:{},2132:{},2133:{},2134:{},2135:{},2136:{},2137:{},2138:{},2146:{},2147:{r:12},2148:{},2149:{},2150:{},2151:{f:Jo},2152:{},2154:{},2155:{},2156:{},2161:{},2162:{},2164:{},2165:{},2166:{},2167:{},2168:{},2169:{},2170:{},2171:{},2172:{f:el,r:12},2173:{f:Nd,r:12},2174:{},2175:{},2180:{},2181:{},2182:{},2183:{},2184:{},2185:{},2186:{},2187:{},2188:{f:Zo,r:12},2189:{},2190:{r:12},2191:{},2192:{},2194:{},2195:{},2196:{f:Pc,r:12},2197:{},2198:{f:Dd,r:12},2199:{},2200:{},2201:{},2202:{f:Lc,r:12},2203:{f:Jo},2204:{},2205:{},2206:{},2207:{},2211:{f:Xs},2212:{},2213:{},2214:{},2215:{},4097:{},4098:{},4099:{},4102:{},4103:{},4105:{},4106:{},4107:{},4108:{},4109:{},4116:{},4117:{},4118:{},4119:{},4120:{},4121:{},4122:{},4123:{},4124:{},4125:{},4126:{},4127:{},4128:{},4129:{},4130:{},4132:{},4133:{},4134:{f:$o},4135:{},4146:{},4147:{},4148:{},4149:{},4154:{},4156:{},4157:{},4158:{},4159:{},4160:{},4161:{},4163:{},4164:{f:il},4165:{},4166:{},4168:{},4170:{},4171:{},4174:{},4175:{},4176:{},4177:{},4187:{},4188:{f:Qc},4189:{},4191:{},4192:{},4193:{},4194:{},4195:{},4196:{},4197:{},4198:{},4199:{},4200:{},0:{f:pc},1:{},2:{f:pl},3:{f:dl},4:{f:ul},5:{f:Cc},7:{f:hl},8:{},9:{f:Rs},11:{},22:{f:$o},30:{f:fc},31:{},32:{},33:{f:Ic},36:{},37:{f:Qs},50:{f:gl},62:{},52:{},67:{},68:{f:$o},69:{},86:{},126:{},127:{f:ll},135:{},136:{},137:{},145:{},148:{},149:{},150:{},169:{},171:{},188:{},191:{},192:{},194:{},195:{},214:{f:_l},223:{},234:{},354:{},421:{},518:{f:lm},521:{f:Rs},536:{f:jc},547:{f:kc},561:{},579:{},1030:{f:lm},1033:{f:Rs},1091:{},2157:{},2163:{},2177:{},2240:{},2241:{},2242:{},2243:{},2244:{},2245:{},2246:{},2247:{},2248:{},2249:{},2250:{},2251:{},2262:{r:12},29282:{}};function Y(e,t,n,r){var i=t;if(!isNaN(i)){var a=r||(n||[]).length||0,o=e.next(4);o.write_shift(2,i),o.write_shift(2,a),a>0&&ti(n)&&e.push(n)}}function lv(e,t,n,r){var i=r||(n||[]).length||0;if(i<=8224)return Y(e,t,n,i);var a=t;if(!isNaN(a)){for(var o=n.parts||[],s=0,c=0,l=0;l+(o[s]||8224)<=8224;)l+=o[s]||8224,s++;var u=e.next(4);for(u.write_shift(2,a),u.write_shift(2,l),e.push(n.slice(c,c+l)),c+=l;c<i;){for(u=e.next(4),u.write_shift(2,60),l=0;l+(o[s]||8224)<=8224;)l+=o[s]||8224,s++;u.write_shift(2,l),e.push(n.slice(c,c+l)),c+=l}}}function uv(e,t,n){return e||=K(7),e.write_shift(2,t),e.write_shift(2,n),e.write_shift(2,0),e.write_shift(1,0),e}function dv(e,t,n,r){var i=K(9);return uv(i,e,t),rs(n,r||`b`,i),i}function fv(e,t,n){var r=K(8+2*n.length);return uv(r,e,t),r.write_shift(1,n.length),r.write_shift(n.length,n,`sbcs`),r.l<r.length?r.slice(0,r.l):r}function pv(e,t,n,r){if(t.v!=null)switch(t.t){case`d`:case`n`:var i=t.t==`d`?hn(wn(t.v)):t.v;i==(i|0)&&i>=0&&i<65536?Y(e,2,ml(n,r,i)):Y(e,3,fl(n,r,i));return;case`b`:case`e`:Y(e,5,dv(n,r,t.v,t.t));return;case`s`:case`str`:Y(e,4,fv(n,r,(t.v||``).slice(0,255)));return}Y(e,1,uv(null,n,r))}function mv(e,t,n,r){var i=Array.isArray(t),a=Fi(t[`!ref`]||`A1`),o,s=``,c=[];if(a.e.c>255||a.e.r>16383){if(r.WTF)throw Error(`Range `+(t[`!ref`]||`A1`)+` exceeds format limit A1:IV16384`);a.e.c=Math.min(a.e.c,255),a.e.r=Math.min(a.e.c,16383),o=Pi(a)}for(var l=a.s.r;l<=a.e.r;++l){s=wi(l);for(var u=a.s.c;u<=a.e.c;++u){l===a.s.r&&(c[u]=Oi(u)),o=c[u]+s;var d=i?(t[l]||[])[u]:t[o];d&&pv(e,d,l,u,r)}}}function hv(e,t){var n=t||{};Oe!=null&&n.dense==null&&(n.dense=Oe);for(var r=vi(),i=0,a=0;a<e.SheetNames.length;++a)e.SheetNames[a]==n.sheet&&(i=a);if(i==0&&n.sheet&&e.SheetNames[0]!=n.sheet)throw Error(`Sheet not found: `+n.sheet);return Y(r,n.biff==4?1033:n.biff==3?521:9,zs(e,16,n)),mv(r,e.Sheets[e.SheetNames[i]],i,n,e),Y(r,10),r.end()}function gv(e,t,n){Y(e,49,ac({sz:12,color:{theme:1},name:`Arial`,family:2,scheme:`minor`},n))}function _v(e,t,n){t&&[[5,8],[23,26],[41,44],[50,392]].forEach(function(r){for(var i=r[0];i<=r[1];++i)t[i]!=null&&Y(e,1054,dc(i,t[i],n))})}function vv(e,t){var n=K(19);n.write_shift(4,2151),n.write_shift(4,0),n.write_shift(4,0),n.write_shift(2,3),n.write_shift(1,1),n.write_shift(4,0),Y(e,2151,n),n=K(39),n.write_shift(4,2152),n.write_shift(4,0),n.write_shift(4,0),n.write_shift(2,3),n.write_shift(1,0),n.write_shift(4,0),n.write_shift(2,1),n.write_shift(4,4),n.write_shift(2,0),ks(Fi(t[`!ref`]||`A1`),n),n.write_shift(4,4),Y(e,2152,n)}function yv(e,t){for(var n=0;n<16;++n)Y(e,224,bc({numFmtId:0,style:!0},0,t));t.cellXfs.forEach(function(n){Y(e,224,bc(n,0,t))})}function bv(e,t){for(var n=0;n<t[`!links`].length;++n){var r=t[`!links`][n];Y(e,440,qc(r)),r[1].Tooltip&&Y(e,2048,Yc(r))}delete t[`!links`]}function xv(e,t){if(t){var n=0;t.forEach(function(t,r){++n<=256&&t&&Y(e,125,nl(Dm(r,t),r))})}}function Sv(e,t,n,r,i){var a=16+km(i.cellXfs,t,i);if(t.v==null&&!t.bf){Y(e,513,Ss(n,r,a));return}if(t.bf)Y(e,6,um(t,n,r,i,a));else switch(t.t){case`d`:case`n`:Y(e,515,Ec(n,r,t.t==`d`?hn(wn(t.v)):t.v,a,i));break;case`b`:case`e`:Y(e,517,wc(n,r,t.v,a,i,t.t));break;case`s`:case`str`:i.bookSST?Y(e,253,sc(n,r,Em(i.Strings,t.v,i.revStrings),a,i)):Y(e,516,lc(n,r,(t.v||``).slice(0,255),a,i));break;default:Y(e,513,Ss(n,r,a))}}function Cv(e,t,n){var r=vi(),i=n.SheetNames[e],a=n.Sheets[i]||{},o=(n||{}).Workbook||{},s=(o.Sheets||[])[e]||{},c=Array.isArray(a),l=t.biff==8,u,d=``,f=[],p=Fi(a[`!ref`]||`A1`),m=l?65536:16384;if(p.e.c>255||p.e.r>=m){if(t.WTF)throw Error(`Range `+(a[`!ref`]||`A1`)+` exceeds format limit A1:IV16384`);p.e.c=Math.min(p.e.c,255),p.e.r=Math.min(p.e.c,m-1)}Y(r,2057,zs(n,16,t)),Y(r,13,es(1)),Y(r,12,es(100)),Y(r,15,Qo(!0)),Y(r,17,Qo(!1)),Y(r,16,ha(.001)),Y(r,95,Qo(!0)),Y(r,42,Qo(!1)),Y(r,43,Qo(!1)),Y(r,130,es(1)),Y(r,128,Sc([0,0])),Y(r,131,Qo(!1)),Y(r,132,Qo(!1)),l&&xv(r,a[`!cols`]),Y(r,512,mc(p,t)),l&&(a[`!links`]=[]);for(var h=p.s.r;h<=p.e.r;++h){d=wi(h);for(var g=p.s.c;g<=p.e.c;++g){h===p.s.r&&(f[g]=Oi(g)),u=f[g]+d;var _=c?(a[h]||[])[g]:a[u];_&&(Sv(r,_,h,g,t),l&&_.l&&a[`!links`].push([u,_.l]))}}var v=s.CodeName||s.name||i;return l&&Y(r,574,nc((o.Views||[])[0])),l&&(a[`!merges`]||[]).length&&Y(r,229,Vc(a[`!merges`])),l&&bv(r,a),Y(r,442,us(v,t)),l&&vv(r,a),Y(r,10),r.end()}function wv(e,t,n){var r=vi(),i=(e||{}).Workbook||{},a=i.Sheets||[],o=i.WBProps||{},s=n.biff==8,c=n.biff==5;Y(r,2057,zs(e,5,n)),n.bookType==`xla`&&Y(r,135),Y(r,225,s?es(1200):null),Y(r,193,Yo(2)),c&&Y(r,191),c&&Y(r,192),Y(r,226),Y(r,92,Hs(`SheetJS`,n)),Y(r,66,es(s?1200:1252)),s&&Y(r,353,es(0)),s&&Y(r,448),Y(r,317,al(e.SheetNames.length)),s&&e.vbaraw&&Y(r,211),s&&e.vbaraw&&Y(r,442,us(o.CodeName||`ThisWorkbook`,n)),Y(r,156,es(17)),Y(r,25,Qo(!1)),Y(r,18,Qo(!1)),Y(r,19,es(0)),s&&Y(r,431,Qo(!1)),s&&Y(r,444,es(0)),Y(r,61,ec(n)),Y(r,64,Qo(!1)),Y(r,141,es(0)),Y(r,34,Qo(Bg(e)==`true`)),Y(r,14,Qo(!0)),s&&Y(r,439,Qo(!1)),Y(r,218,es(0)),gv(r,e,n),_v(r,e.SSF,n),yv(r,n),s&&Y(r,352,Qo(!1));var l=r.end(),u=vi();s&&Y(u,140,Zc()),s&&n.Strings&&lv(u,252,qs(n.Strings,n)),Y(u,10);var d=u.end(),f=vi(),p=0,m=0;for(m=0;m<e.SheetNames.length;++m)p+=(s?12:11)+(s?2:1)*e.SheetNames[m].length;var h=l.length+p+d.length;for(m=0;m<e.SheetNames.length;++m){var g=a[m]||{};Y(f,133,Gs({pos:h,hs:g.Hidden||0,dt:0,name:e.SheetNames[m]},n)),h+=t[m].length}var _=f.end();if(p!=_.length)throw Error(`BS8 `+p+` != `+_.length);var v=[];return l.length&&v.push(l),_.length&&v.push(_),d.length&&v.push(d),He(v)}function Tv(e,t){var n=t||{},r=[];e&&!e.SSF&&(e.SSF=En(H)),e&&e.SSF&&(Qt(),Zt(e.SSF),n.revssf=fn(e.SSF),n.revssf[e.SSF[65535]]=0,n.ssf=e.SSF),n.Strings=[],n.Strings.Count=0,n.Strings.Unique=0,Ay(n),n.cellXfs=[],km(n.cellXfs,{},{revssf:{General:0}}),e.Props||={};for(var i=0;i<e.SheetNames.length;++i)r[r.length]=Cv(i,n,e);return r.unshift(wv(e,r,n)),He(r)}function Ev(e,t){for(var n=0;n<=e.SheetNames.length;++n){var r=e.Sheets[e.SheetNames[n]];!r||!r[`!ref`]||Ni(r[`!ref`]).e.c>255&&typeof console<`u`&&console.error&&console.error(`Worksheet '`+e.SheetNames[n]+`' extends beyond column IV (255).  Data may be lost.`)}var i=t||{};switch(i.biff||2){case 8:case 5:return Tv(e,t);case 4:case 3:case 2:return hv(e,t)}throw Error(`invalid type `+i.bookType+` for BIFF`)}function Dv(e,t){var n=t||{};Oe!=null&&n.dense==null&&(n.dense=Oe);var r=n.dense?[]:{};e=e.replace(/<!--.*?-->/g,``);var i=e.match(/<table/i);if(!i)throw Error(`Invalid HTML: could not find <table>`);var a=e.match(/<\/table/i),o=i.index,s=a&&a.index||e.length,c=jn(e.slice(o,s),/(:?<tr[^>]*>)/i,`<tr>`),l=-1,u=0,d=0,f=0,p={s:{r:1e7,c:1e7},e:{r:0,c:0}},m=[];for(o=0;o<c.length;++o){var h=c[o].trim(),g=h.slice(0,3).toLowerCase();if(g==`<tr`){if(++l,n.sheetRows&&n.sheetRows<=l){--l;break}u=0;continue}if(!(g!=`<td`&&g!=`<th`)){var _=h.split(/<\/t[dh]>/i);for(s=0;s<_.length;++s){var v=_[s].trim();if(v.match(/<t[dh]/i)){for(var y=v,b=0;y.charAt(0)==`<`&&(b=y.indexOf(`>`))>-1;)y=y.slice(b+1);for(var x=0;x<m.length;++x){var S=m[x];S.s.c==u&&S.s.r<l&&l<=S.e.r&&(u=S.e.c+1,x=-1)}var C=W(v.slice(0,v.indexOf(`>`)));f=C.colspan?+C.colspan:1,((d=+C.rowspan)>1||f>1)&&m.push({s:{r:l,c:u},e:{r:l+(d||1)-1,c:u+f-1}});var w=C.t||C[`data-t`]||``;if(!y.length){u+=f;continue}if(y=vr(y),p.s.r>l&&(p.s.r=l),p.e.r<l&&(p.e.r=l),p.s.c>u&&(p.s.c=u),p.e.c<u&&(p.e.c=u),!y.length){u+=f;continue}var T={t:`s`,v:y};n.raw||!y.trim().length||w==`s`||(y===`TRUE`?T={t:`b`,v:!0}:y===`FALSE`?T={t:`b`,v:!1}:isNaN(On(y))?isNaN(An(y).getDate())||(T={t:`d`,v:wn(y)},n.cellDates||(T={t:`n`,v:hn(T.v)}),T.z=n.dateNF||H[14]):T={t:`n`,v:On(y)}),n.dense?(r[l]||(r[l]=[]),r[l][u]=T):r[J({r:l,c:u})]=T,u+=f}}}}return r[`!ref`]=Pi(p),m.length&&(r[`!merges`]=m),r}function Ov(e,t,n,r){for(var i=e[`!merges`]||[],a=[],o=t.s.c;o<=t.e.c;++o){for(var s=0,c=0,l=0;l<i.length;++l)if(!(i[l].s.r>n||i[l].s.c>o)&&!(i[l].e.r<n||i[l].e.c<o)){if(i[l].s.r<n||i[l].s.c<o){s=-1;break}s=i[l].e.r-i[l].s.r+1,c=i[l].e.c-i[l].s.c+1;break}if(!(s<0)){var u=J({r:n,c:o}),d=r.dense?(e[n]||[])[o]:e[u],f=d&&d.v!=null&&(d.h||or(d.w||(Li(d),d.w)||``))||``,p={};s>1&&(p.rowspan=s),c>1&&(p.colspan=c),r.editable?f=`<span contenteditable="true">`+f+`</span>`:d&&(p[`data-t`]=d&&d.t||`z`,d.v!=null&&(p[`data-v`]=d.v),d.z!=null&&(p[`data-z`]=d.z),d.l&&(d.l.Target||`#`).charAt(0)!=`#`&&(f=`<a href="`+d.l.Target+`">`+f+`</a>`)),p.id=(r.id||`sjs`)+`-`+u,a.push(G(`td`,f,p))}}return`<tr>`+a.join(``)+`</tr>`}var kv=`<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>`,Av=`</body></html>`;function jv(e,t){var n=e.match(/<table[\s\S]*?>[\s\S]*?<\/table>/gi);if(!n||n.length==0)throw Error(`Invalid HTML: could not find <table>`);if(n.length==1)return Ri(Dv(n[0],t),t);var r=gb();return n.forEach(function(e,n){_b(r,Dv(e,t),`Sheet`+(n+1))}),r}function Mv(e,t,n){return[].join(``)+`<table`+(n&&n.id?` id="`+n.id+`"`:``)+`>`}function Nv(e,t){var n=t||{},r=n.header==null?kv:n.header,i=n.footer==null?Av:n.footer,a=[r],o=Ni(e[`!ref`]);n.dense=Array.isArray(e),a.push(Mv(e,o,n));for(var s=o.s.r;s<=o.e.r;++s)a.push(Ov(e,o,s,n));return a.push(`</table>`+i),a.join(``)}function Pv(e,t,n){var r=n||{};Oe!=null&&(r.dense=Oe);var i=0,a=0;if(r.origin!=null)if(typeof r.origin==`number`)i=r.origin;else{var o=typeof r.origin==`string`?Mi(r.origin):r.origin;i=o.r,a=o.c}var s=t.getElementsByTagName(`tr`),c=Math.min(r.sheetRows||1e7,s.length),l={s:{r:0,c:0},e:{r:i,c:a}};if(e[`!ref`]){var u=Ni(e[`!ref`]);l.s.r=Math.min(l.s.r,u.s.r),l.s.c=Math.min(l.s.c,u.s.c),l.e.r=Math.max(l.e.r,u.e.r),l.e.c=Math.max(l.e.c,u.e.c),i==-1&&(l.e.r=i=u.e.r+1)}var d=[],f=0,p=e[`!rows`]||=[],m=0,h=0,g=0,_=0,v=0,y=0;for(e[`!cols`]||=[];m<s.length&&h<c;++m){var b=s[m];if(Lv(b)){if(r.display)continue;p[h]={hidden:!0}}var x=b.children;for(g=_=0;g<x.length;++g){var S=x[g];if(!(r.display&&Lv(S))){var C=S.hasAttribute(`data-v`)?S.getAttribute(`data-v`):S.hasAttribute(`v`)?S.getAttribute(`v`):vr(S.innerHTML),w=S.getAttribute(`data-z`)||S.getAttribute(`z`);for(f=0;f<d.length;++f){var T=d[f];T.s.c==_+a&&T.s.r<h+i&&h+i<=T.e.r&&(_=T.e.c+1-a,f=-1)}y=+S.getAttribute(`colspan`)||1,((v=+S.getAttribute(`rowspan`)||1)>1||y>1)&&d.push({s:{r:h+i,c:_+a},e:{r:h+i+(v||1)-1,c:_+a+(y||1)-1}});var E={t:`s`,v:C},D=S.getAttribute(`data-t`)||S.getAttribute(`t`)||``;C!=null&&(C.length==0?E.t=D||`z`:r.raw||C.trim().length==0||D==`s`||(C===`TRUE`?E={t:`b`,v:!0}:C===`FALSE`?E={t:`b`,v:!1}:isNaN(On(C))?isNaN(An(C).getDate())||(E={t:`d`,v:wn(C)},r.cellDates||(E={t:`n`,v:hn(E.v)}),E.z=r.dateNF||H[14]):E={t:`n`,v:On(C)})),E.z===void 0&&w!=null&&(E.z=w);var O=``,k=S.getElementsByTagName(`A`);if(k&&k.length)for(var A=0;A<k.length&&!(k[A].hasAttribute(`href`)&&(O=k[A].getAttribute(`href`),O.charAt(0)!=`#`));++A);O&&O.charAt(0)!=`#`&&(E.l={Target:O}),r.dense?(e[h+i]||(e[h+i]=[]),e[h+i][_+a]=E):e[J({c:_+a,r:h+i})]=E,l.e.c<_+a&&(l.e.c=_+a),_+=y}}++h}return d.length&&(e[`!merges`]=(e[`!merges`]||[]).concat(d)),l.e.r=Math.max(l.e.r,h-1+i),e[`!ref`]=Pi(l),h>=c&&(e[`!fullref`]=Pi((l.e.r=s.length-m+h-1+i,l))),e}function Fv(e,t){return Pv((t||{}).dense?[]:{},e,t)}function Iv(e,t){return Ri(Fv(e,t),t)}function Lv(e){var t=``,n=Rv(e);return n&&(t=n(e).getPropertyValue(`display`)),t||=e.style&&e.style.display,t===`none`}function Rv(e){return e.ownerDocument.defaultView&&typeof e.ownerDocument.defaultView.getComputedStyle==`function`?e.ownerDocument.defaultView.getComputedStyle:typeof getComputedStyle==`function`?getComputedStyle:null}function zv(e){return[er(e.replace(/[\t\r\n]/g,` `).trim().replace(/ +/g,` `).replace(/<text:s\/>/g,` `).replace(/<text:s text:c="(\d+)"\/>/g,function(e,t){return Array(parseInt(t,10)+1).join(` `)}).replace(/<text:tab[^>]*\/>/g,`	`).replace(/<text:line-break\/>/g,`
`).replace(/<[^>]*>/g,``))]}var Bv={day:[`d`,`dd`],month:[`m`,`mm`],year:[`y`,`yy`],hours:[`h`,`hh`],minutes:[`m`,`mm`],seconds:[`s`,`ss`],"am-pm":[`A/P`,`AM/PM`],"day-of-week":[`ddd`,`dddd`],era:[`e`,`ee`],quarter:[`\\Qm`,`m\\"th quarter"`]};function Vv(e,t){var n=t||{};Oe!=null&&n.dense==null&&(n.dense=Oe);var r=Or(e),i=[],a,o,s={name:``},c=``,l=0,u,d,f={},p=[],m=n.dense?[]:{},h,g,_={value:``},v=``,y=0,b,x=[],S=-1,C=-1,w={s:{r:1e6,c:1e7},e:{r:0,c:0}},T=0,E={},D=[],O={},k=0,A=0,j=[],M=1,N=1,P=[],F={Names:[]},I={},L=[``,``],R=[],ee={},te=``,ne=0,re=!1,ie=!1,z=0;for(kr.lastIndex=0,r=r.replace(/<!--([\s\S]*?)-->/gm,``).replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm,``);h=kr.exec(r);)switch(h[3]=h[3].replace(/_.*$/,``)){case`table`:case`工作表`:h[1]===`/`?(w.e.c>=w.s.c&&w.e.r>=w.s.r?m[`!ref`]=Pi(w):m[`!ref`]=`A1:A1`,n.sheetRows>0&&n.sheetRows<=w.e.r&&(m[`!fullref`]=m[`!ref`],w.e.r=n.sheetRows-1,m[`!ref`]=Pi(w)),D.length&&(m[`!merges`]=D),j.length&&(m[`!rows`]=j),u.name=u.名称||u.name,typeof JSON<`u`&&JSON.stringify(u),p.push(u.name),f[u.name]=m,ie=!1):h[0].charAt(h[0].length-2)!==`/`&&(u=W(h[0],!1),S=C=-1,w.s.r=w.s.c=1e7,w.e.r=w.e.c=0,m=n.dense?[]:{},D=[],j=[],ie=!0);break;case`table-row-group`:h[1]===`/`?--T:++T;break;case`table-row`:case`行`:if(h[1]===`/`){S+=M,M=1;break}if(d=W(h[0],!1),d.行号?S=d.行号-1:S==-1&&(S=0),M=+d[`number-rows-repeated`]||1,M<10)for(z=0;z<M;++z)T>0&&(j[S+z]={level:T});C=-1;break;case`covered-table-cell`:h[1]!==`/`&&++C,n.sheetStubs&&(n.dense?(m[S]||(m[S]=[]),m[S][C]={t:`z`}):m[J({r:S,c:C})]={t:`z`}),v=``,x=[];break;case`table-cell`:case`数据`:if(h[0].charAt(h[0].length-2)===`/`)++C,_=W(h[0],!1),N=parseInt(_[`number-columns-repeated`]||`1`,10),g={t:`z`,v:null},_.formula&&n.cellFormula!=0&&(g.f=ym(er(_.formula))),(_.数据类型||_[`value-type`])==`string`&&(g.t=`s`,g.v=er(_[`string-value`]||``),n.dense?(m[S]||(m[S]=[]),m[S][C]=g):m[J({r:S,c:C})]=g),C+=N-1;else if(h[1]!==`/`){++C,v=``,y=0,x=[],N=1;var B=M?S+M-1:S;if(C>w.e.c&&(w.e.c=C),C<w.s.c&&(w.s.c=C),S<w.s.r&&(w.s.r=S),B>w.e.r&&(w.e.r=B),_=W(h[0],!1),R=[],ee={},g={t:_.数据类型||_[`value-type`],v:null},n.cellFormula)if(_.formula&&=er(_.formula),_[`number-matrix-columns-spanned`]&&_[`number-matrix-rows-spanned`]&&(k=parseInt(_[`number-matrix-rows-spanned`],10)||0,A=parseInt(_[`number-matrix-columns-spanned`],10)||0,O={s:{r:S,c:C},e:{r:S+k-1,c:C+A-1}},g.F=Pi(O),P.push([O,g.F])),_.formula)g.f=ym(_.formula);else for(z=0;z<P.length;++z)S>=P[z][0].s.r&&S<=P[z][0].e.r&&C>=P[z][0].s.c&&C<=P[z][0].e.c&&(g.F=P[z][1]);switch((_[`number-columns-spanned`]||_[`number-rows-spanned`])&&(k=parseInt(_[`number-rows-spanned`],10)||0,A=parseInt(_[`number-columns-spanned`],10)||0,O={s:{r:S,c:C},e:{r:S+k-1,c:C+A-1}},D.push(O)),_[`number-columns-repeated`]&&(N=parseInt(_[`number-columns-repeated`],10)),g.t){case`boolean`:g.t=`b`,g.v=ur(_[`boolean-value`]);break;case`float`:g.t=`n`,g.v=parseFloat(_.value);break;case`percentage`:g.t=`n`,g.v=parseFloat(_.value);break;case`currency`:g.t=`n`,g.v=parseFloat(_.value);break;case`date`:g.t=`d`,g.v=wn(_[`date-value`]),n.cellDates||(g.t=`n`,g.v=hn(g.v)),g.z=`m/d/yy`;break;case`time`:g.t=`n`,g.v=bn(_[`time-value`])/86400,n.cellDates&&(g.t=`d`,g.v=yn(g.v)),g.z=`HH:MM:SS`;break;case`number`:g.t=`n`,g.v=parseFloat(_.数据数值);break;default:if(g.t===`string`||g.t===`text`||!g.t)g.t=`s`,_[`string-value`]!=null&&(v=er(_[`string-value`]),x=[]);else throw Error(`Unsupported value type `+g.t)}}else{if(re=!1,g.t===`s`&&(g.v=v||``,x.length&&(g.R=x),re=y==0),I.Target&&(g.l=I),R.length>0&&(g.c=R,R=[]),v&&n.cellText!==!1&&(g.w=v),re&&(g.t=`z`,delete g.v),(!re||n.sheetStubs)&&!(n.sheetRows&&n.sheetRows<=S))for(var ae=0;ae<M;++ae){if(N=parseInt(_[`number-columns-repeated`]||`1`,10),n.dense)for(m[S+ae]||(m[S+ae]=[]),m[S+ae][C]=ae==0?g:En(g);--N>0;)m[S+ae][C+N]=En(g);else for(m[J({r:S+ae,c:C})]=g;--N>0;)m[J({r:S+ae,c:C+N})]=En(g);w.e.c<=C&&(w.e.c=C)}N=parseInt(_[`number-columns-repeated`]||`1`,10),C+=N-1,N=0,g={},v=``,x=[]}I={};break;case`document`:case`document-content`:case`电子表格文档`:case`spreadsheet`:case`主体`:case`scripts`:case`styles`:case`font-face-decls`:case`master-styles`:if(h[1]===`/`){if((a=i.pop())[0]!==h[3])throw`Bad state: `+a}else h[0].charAt(h[0].length-2)!==`/`&&i.push([h[3],!0]);break;case`annotation`:if(h[1]===`/`){if((a=i.pop())[0]!==h[3])throw`Bad state: `+a;ee.t=v,x.length&&(ee.R=x),ee.a=te,R.push(ee)}else h[0].charAt(h[0].length-2)!==`/`&&i.push([h[3],!1]);te=``,ne=0,v=``,y=0,x=[];break;case`creator`:h[1]===`/`?te=r.slice(ne,h.index):ne=h.index+h[0].length;break;case`meta`:case`元数据`:case`settings`:case`config-item-set`:case`config-item-map-indexed`:case`config-item-map-entry`:case`config-item-map-named`:case`shapes`:case`frame`:case`text-box`:case`image`:case`data-pilot-tables`:case`list-style`:case`form`:case`dde-links`:case`event-listeners`:case`chart`:if(h[1]===`/`){if((a=i.pop())[0]!==h[3])throw`Bad state: `+a}else h[0].charAt(h[0].length-2)!==`/`&&i.push([h[3],!1]);v=``,y=0,x=[];break;case`scientific-number`:break;case`currency-symbol`:break;case`currency-style`:break;case`number-style`:case`percentage-style`:case`date-style`:case`time-style`:if(h[1]===`/`){if(E[s.name]=c,(a=i.pop())[0]!==h[3])throw`Bad state: `+a}else h[0].charAt(h[0].length-2)!==`/`&&(c=``,s=W(h[0],!1),i.push([h[3],!0]));break;case`script`:break;case`libraries`:break;case`automatic-styles`:break;case`default-style`:case`page-layout`:break;case`style`:break;case`map`:break;case`font-face`:break;case`paragraph-properties`:break;case`table-properties`:break;case`table-column-properties`:break;case`table-row-properties`:break;case`table-cell-properties`:break;case`number`:switch(i[i.length-1][0]){case`time-style`:case`date-style`:o=W(h[0],!1),c+=Bv[h[3]][+(o.style===`long`)];break}break;case`fraction`:break;case`day`:case`month`:case`year`:case`era`:case`day-of-week`:case`week-of-year`:case`quarter`:case`hours`:case`minutes`:case`seconds`:case`am-pm`:switch(i[i.length-1][0]){case`time-style`:case`date-style`:o=W(h[0],!1),c+=Bv[h[3]][+(o.style===`long`)];break}break;case`boolean-style`:break;case`boolean`:break;case`text-style`:break;case`text`:if(h[0].slice(-2)===`/>`)break;if(h[1]===`/`)switch(i[i.length-1][0]){case`number-style`:case`date-style`:case`time-style`:c+=r.slice(l,h.index);break}else l=h.index+h[0].length;break;case`named-range`:o=W(h[0],!1),L=xm(o[`cell-range-address`]);var oe={Name:o.name,Ref:L[0]+`!`+L[1]};ie&&(oe.Sheet=p.length),F.Names.push(oe);break;case`text-content`:break;case`text-properties`:break;case`embedded-text`:break;case`body`:case`电子表格`:break;case`forms`:break;case`table-column`:break;case`table-header-rows`:break;case`table-rows`:break;case`table-column-group`:break;case`table-header-columns`:break;case`table-columns`:break;case`null-date`:break;case`graphic-properties`:break;case`calculation-settings`:break;case`named-expressions`:break;case`label-range`:break;case`label-ranges`:break;case`named-expression`:break;case`sort`:break;case`sort-by`:break;case`sort-groups`:break;case`tab`:break;case`line-break`:break;case`span`:break;case`p`:case`文本串`:if([`master-styles`].indexOf(i[i.length-1][0])>-1)break;if(h[1]===`/`&&(!_||!_[`string-value`])){var V=zv(r.slice(y,h.index),b);v=(v.length>0?v+`
`:``)+V[0]}else b=W(h[0],!1),y=h.index+h[0].length;break;case`s`:break;case`database-range`:if(h[1]===`/`)break;try{L=xm(W(h[0])[`target-range-address`]),f[L[0]][`!autofilter`]={ref:L[1]}}catch{}break;case`date`:break;case`object`:break;case`title`:case`标题`:break;case`desc`:break;case`binary-data`:break;case`table-source`:break;case`scenario`:break;case`iteration`:break;case`content-validations`:break;case`content-validation`:break;case`help-message`:break;case`error-message`:break;case`database-ranges`:break;case`filter`:break;case`filter-and`:break;case`filter-or`:break;case`filter-condition`:break;case`list-level-style-bullet`:break;case`list-level-style-number`:break;case`list-level-properties`:break;case`sender-firstname`:case`sender-lastname`:case`sender-initials`:case`sender-title`:case`sender-position`:case`sender-email`:case`sender-phone-private`:case`sender-fax`:case`sender-company`:case`sender-phone-work`:case`sender-street`:case`sender-city`:case`sender-postal-code`:case`sender-country`:case`sender-state-or-province`:case`author-name`:case`author-initials`:case`chapter`:case`file-name`:case`template-name`:case`sheet-name`:break;case`event-listener`:break;case`initial-creator`:case`creation-date`:case`print-date`:case`generator`:case`document-statistic`:case`user-defined`:case`editing-duration`:case`editing-cycles`:break;case`config-item`:break;case`page-number`:break;case`page-count`:break;case`time`:break;case`cell-range-source`:break;case`detective`:break;case`operation`:break;case`highlighted-range`:break;case`data-pilot-table`:case`source-cell-range`:case`source-service`:case`data-pilot-field`:case`data-pilot-level`:case`data-pilot-subtotals`:case`data-pilot-subtotal`:case`data-pilot-members`:case`data-pilot-member`:case`data-pilot-display-info`:case`data-pilot-sort-info`:case`data-pilot-layout-info`:case`data-pilot-field-reference`:case`data-pilot-groups`:case`data-pilot-group`:case`data-pilot-group-member`:break;case`rect`:break;case`dde-connection-decls`:case`dde-connection-decl`:case`dde-link`:case`dde-source`:break;case`properties`:break;case`property`:break;case`a`:if(h[1]!==`/`){if(I=W(h[0],!1),!I.href)break;I.Target=er(I.href),delete I.href,I.Target.charAt(0)==`#`&&I.Target.indexOf(`.`)>-1?(L=xm(I.Target.slice(1)),I.Target=`#`+L[0]+`!`+L[1]):I.Target.match(/^\.\.[\\\/]/)&&(I.Target=I.Target.slice(3))}break;case`table-protection`:break;case`data-pilot-grand-total`:break;case`office-document-common-attrs`:break;default:switch(h[2]){case`dc:`:case`calcext:`:case`loext:`:case`ooo:`:case`chartooo:`:case`draw:`:case`style:`:case`chart:`:case`form:`:case`uof:`:case`表:`:case`字:`:break;default:if(n.WTF)throw Error(h)}}var se={Sheets:f,SheetNames:p,Workbook:F};return n.bookSheets&&delete se.Sheets,se}function Hv(e,t){t||={},Fn(e,`META-INF/manifest.xml`)&&to(Ln(e,`META-INF/manifest.xml`),t);var n=Rn(e,`content.xml`);if(!n)throw Error(`Missing content.xml in ODS / UOF file`);var r=Vv(hr(n),t);return Fn(e,`meta.xml`)&&(r.Props=lo(Ln(e,`meta.xml`))),r}function Uv(e,t){return Vv(e,t)}var Wv=(function(){var e=[`<office:master-styles>`,`<style:master-page style:name="mp1" style:page-layout-name="mp1">`,`<style:header/>`,`<style:header-left style:display="false"/>`,`<style:footer/>`,`<style:footer-left style:display="false"/>`,`</style:master-page>`,`</office:master-styles>`].join(``),t=`<office:document-styles `+Tr({"xmlns:office":`urn:oasis:names:tc:opendocument:xmlns:office:1.0`,"xmlns:table":`urn:oasis:names:tc:opendocument:xmlns:table:1.0`,"xmlns:style":`urn:oasis:names:tc:opendocument:xmlns:style:1.0`,"xmlns:text":`urn:oasis:names:tc:opendocument:xmlns:text:1.0`,"xmlns:draw":`urn:oasis:names:tc:opendocument:xmlns:drawing:1.0`,"xmlns:fo":`urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,"xmlns:dc":`http://purl.org/dc/elements/1.1/`,"xmlns:number":`urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0`,"xmlns:svg":`urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0`,"xmlns:of":`urn:oasis:names:tc:opendocument:xmlns:of:1.2`,"office:version":`1.2`})+`>`+e+`</office:document-styles>`;return function(){return Gn+t}})(),Gv=(function(){var e=function(e){return rr(e).replace(/  +/g,function(e){return`<text:s text:c="`+e.length+`"/>`}).replace(/\t/g,`<text:tab/>`).replace(/\n/g,`</text:p><text:p>`).replace(/^ /,`<text:s/>`).replace(/ $/,`<text:s/>`)},t=`          <table:table-cell />
`,n=`          <table:covered-table-cell/>
`,r=function(r,i,a){var o=[];o.push(`      <table:table table:name="`+rr(i.SheetNames[a])+`" table:style-name="ta1">
`);var s=0,c=0,l=Ni(r[`!ref`]||`A1`),u=r[`!merges`]||[],d=0,f=Array.isArray(r);if(r[`!cols`])for(c=0;c<=l.e.c;++c)o.push(`        <table:table-column`+(r[`!cols`][c]?` table:style-name="co`+r[`!cols`][c].ods+`"`:``)+`></table:table-column>
`);var p=``,m=r[`!rows`]||[];for(s=0;s<l.s.r;++s)p=m[s]?` table:style-name="ro`+m[s].ods+`"`:``,o.push(`        <table:table-row`+p+`></table:table-row>
`);for(;s<=l.e.r;++s){for(p=m[s]?` table:style-name="ro`+m[s].ods+`"`:``,o.push(`        <table:table-row`+p+`>
`),c=0;c<l.s.c;++c)o.push(t);for(;c<=l.e.c;++c){var h=!1,g={},_=``;for(d=0;d!=u.length;++d)if(!(u[d].s.c>c)&&!(u[d].s.r>s)&&!(u[d].e.c<c)&&!(u[d].e.r<s)){(u[d].s.c!=c||u[d].s.r!=s)&&(h=!0),g[`table:number-columns-spanned`]=u[d].e.c-u[d].s.c+1,g[`table:number-rows-spanned`]=u[d].e.r-u[d].s.r+1;break}if(h){o.push(n);continue}var v=J({r:s,c}),y=f?(r[s]||[])[c]:r[v];if(y&&y.f&&(g[`table:formula`]=rr(bm(y.f)),y.F&&y.F.slice(0,v.length)==v)){var b=Ni(y.F);g[`table:number-matrix-columns-spanned`]=b.e.c-b.s.c+1,g[`table:number-matrix-rows-spanned`]=b.e.r-b.s.r+1}if(!y){o.push(t);continue}switch(y.t){case`b`:_=y.v?`TRUE`:`FALSE`,g[`office:value-type`]=`boolean`,g[`office:boolean-value`]=y.v?`true`:`false`;break;case`n`:_=y.w||String(y.v||0),g[`office:value-type`]=`float`,g[`office:value`]=y.v||0;break;case`s`:case`str`:_=y.v==null?``:y.v,g[`office:value-type`]=`string`;break;case`d`:_=y.w||wn(y.v).toISOString(),g[`office:value-type`]=`date`,g[`office:date-value`]=wn(y.v).toISOString(),g[`table:style-name`]=`ce1`;break;default:o.push(t);continue}var x=e(_);if(y.l&&y.l.Target){var S=y.l.Target;S=S.charAt(0)==`#`?`#`+Sm(S.slice(1)):S,S.charAt(0)!=`#`&&!S.match(/^\w+:/)&&(S=`../`+S),x=G(`text:a`,x,{"xlink:href":S.replace(/&/g,`&amp;`)})}o.push(`          `+G(`table:table-cell`,G(`text:p`,x,{}),g)+`
`)}o.push(`        </table:table-row>
`)}return o.push(`      </table:table>
`),o.join(``)},i=function(e,t){e.push(` <office:automatic-styles>
`),e.push(`  <number:date-style style:name="N37" number:automatic-order="true">
`),e.push(`   <number:month number:style="long"/>
`),e.push(`   <number:text>/</number:text>
`),e.push(`   <number:day number:style="long"/>
`),e.push(`   <number:text>/</number:text>
`),e.push(`   <number:year/>
`),e.push(`  </number:date-style>
`);var n=0;t.SheetNames.map(function(e){return t.Sheets[e]}).forEach(function(t){if(t&&t[`!cols`]){for(var r=0;r<t[`!cols`].length;++r)if(t[`!cols`][r]){var i=t[`!cols`][r];if(i.width==null&&i.wpx==null&&i.wch==null)continue;Ou(i),i.ods=n;var a=t[`!cols`][r].wpx+`px`;e.push(`  <style:style style:name="co`+n+`" style:family="table-column">
`),e.push(`   <style:table-column-properties fo:break-before="auto" style:column-width="`+a+`"/>
`),e.push(`  </style:style>
`),++n}}});var r=0;t.SheetNames.map(function(e){return t.Sheets[e]}).forEach(function(t){if(t&&t[`!rows`]){for(var n=0;n<t[`!rows`].length;++n)if(t[`!rows`][n]){t[`!rows`][n].ods=r;var i=t[`!rows`][n].hpx+`px`;e.push(`  <style:style style:name="ro`+r+`" style:family="table-row">
`),e.push(`   <style:table-row-properties fo:break-before="auto" style:row-height="`+i+`"/>
`),e.push(`  </style:style>
`),++r}}}),e.push(`  <style:style style:name="ta1" style:family="table" style:master-page-name="mp1">
`),e.push(`   <style:table-properties table:display="true" style:writing-mode="lr-tb"/>
`),e.push(`  </style:style>
`),e.push(`  <style:style style:name="ce1" style:family="table-cell" style:parent-style-name="Default" style:data-style-name="N37"/>
`),e.push(` </office:automatic-styles>
`)};return function(e,t){var n=[Gn],a=Tr({"xmlns:office":`urn:oasis:names:tc:opendocument:xmlns:office:1.0`,"xmlns:table":`urn:oasis:names:tc:opendocument:xmlns:table:1.0`,"xmlns:style":`urn:oasis:names:tc:opendocument:xmlns:style:1.0`,"xmlns:text":`urn:oasis:names:tc:opendocument:xmlns:text:1.0`,"xmlns:draw":`urn:oasis:names:tc:opendocument:xmlns:drawing:1.0`,"xmlns:fo":`urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0`,"xmlns:xlink":`http://www.w3.org/1999/xlink`,"xmlns:dc":`http://purl.org/dc/elements/1.1/`,"xmlns:meta":`urn:oasis:names:tc:opendocument:xmlns:meta:1.0`,"xmlns:number":`urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0`,"xmlns:presentation":`urn:oasis:names:tc:opendocument:xmlns:presentation:1.0`,"xmlns:svg":`urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0`,"xmlns:chart":`urn:oasis:names:tc:opendocument:xmlns:chart:1.0`,"xmlns:dr3d":`urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0`,"xmlns:math":`http://www.w3.org/1998/Math/MathML`,"xmlns:form":`urn:oasis:names:tc:opendocument:xmlns:form:1.0`,"xmlns:script":`urn:oasis:names:tc:opendocument:xmlns:script:1.0`,"xmlns:ooo":`http://openoffice.org/2004/office`,"xmlns:ooow":`http://openoffice.org/2004/writer`,"xmlns:oooc":`http://openoffice.org/2004/calc`,"xmlns:dom":`http://www.w3.org/2001/xml-events`,"xmlns:xforms":`http://www.w3.org/2002/xforms`,"xmlns:xsd":`http://www.w3.org/2001/XMLSchema`,"xmlns:xsi":`http://www.w3.org/2001/XMLSchema-instance`,"xmlns:sheet":`urn:oasis:names:tc:opendocument:sh33tjs:1.0`,"xmlns:rpt":`http://openoffice.org/2005/report`,"xmlns:of":`urn:oasis:names:tc:opendocument:xmlns:of:1.2`,"xmlns:xhtml":`http://www.w3.org/1999/xhtml`,"xmlns:grddl":`http://www.w3.org/2003/g/data-view#`,"xmlns:tableooo":`http://openoffice.org/2009/table`,"xmlns:drawooo":`http://openoffice.org/2010/draw`,"xmlns:calcext":`urn:org:documentfoundation:names:experimental:calc:xmlns:calcext:1.0`,"xmlns:loext":`urn:org:documentfoundation:names:experimental:office:xmlns:loext:1.0`,"xmlns:field":`urn:openoffice:names:experimental:ooo-ms-interop:xmlns:field:1.0`,"xmlns:formx":`urn:openoffice:names:experimental:ooxml-odf-interop:xmlns:form:1.0`,"xmlns:css3t":`http://www.w3.org/TR/css3-text/`,"office:version":`1.2`}),o=Tr({"xmlns:config":`urn:oasis:names:tc:opendocument:xmlns:config:1.0`,"office:mimetype":`application/vnd.oasis.opendocument.spreadsheet`});t.bookType==`fods`?(n.push(`<office:document`+a+o+`>
`),n.push(oo().replace(/office:document-meta/g,`office:meta`))):n.push(`<office:document-content`+a+`>
`),i(n,e),n.push(`  <office:body>
`),n.push(`    <office:spreadsheet>
`);for(var s=0;s!=e.SheetNames.length;++s)n.push(r(e.Sheets[e.SheetNames[s]],e,s,t));return n.push(`    </office:spreadsheet>
`),n.push(`  </office:body>
`),t.bookType==`fods`?n.push(`</office:document>`):n.push(`</office:document-content>`),n.join(``)}})();function Kv(e,t){if(t.bookType==`fods`)return Gv(e,t);var n=Hn(),r=``,i=[],a=[];return r=`mimetype`,Vn(n,r,`application/vnd.oasis.opendocument.spreadsheet`),r=`content.xml`,Vn(n,r,Gv(e,t)),i.push([r,`text/xml`]),a.push([r,`ContentFile`]),r=`styles.xml`,Vn(n,r,Wv(e,t)),i.push([r,`text/xml`]),a.push([r,`StylesFile`]),r=`meta.xml`,Vn(n,r,Gn+oo()),i.push([r,`text/xml`]),a.push([r,`MetadataFile`]),r=`manifest.rdf`,Vn(n,r,ao(a)),i.push([r,`application/rdf+xml`]),r=`META-INF/manifest.xml`,Vn(n,r,no(i)),n}function qv(e){return new DataView(e.buffer,e.byteOffset,e.byteLength)}function Jv(e){return typeof TextDecoder<`u`?new TextDecoder().decode(e):hr(ze(e))}function Yv(e){return typeof TextEncoder<`u`?new TextEncoder().encode(e):Le(gr(e))}function Xv(e,t){outer:for(var n=0;n<=e.length-t.length;++n){for(var r=0;r<t.length;++r)if(e[n+r]!=t[r])continue outer;return!0}return!1}function Zv(e){var t=e.reduce(function(e,t){return e+t.length},0),n=new Uint8Array(t),r=0;return e.forEach(function(e){n.set(e,r),r+=e.length}),n}function Qv(e){return e-=e>>1&1431655765,e=(e&858993459)+(e>>2&858993459),(e+(e>>4)&252645135)*16843009>>>24}function $v(e,t){for(var n=(e[t+15]&127)<<7|e[t+14]>>1,r=e[t+14]&1,i=t+13;i>=t;--i)r=r*256+e[i];return(e[t+15]&128?-r:r)*10**(n-6176)}function ey(e,t,n){var r=Math.floor(n==0?0:Math.LOG10E*Math.log(Math.abs(n)))+6176-20,i=n/10**(r-6176);e[t+15]|=r>>7,e[t+14]|=(r&127)<<1;for(var a=0;i>=1;++a,i/=256)e[t+a]=i&255;e[t+15]|=n>=0?0:128}function ty(e,t){var n=t?t[0]:0,r=e[n]&127;varint:if(e[n++]>=128&&(r|=(e[n]&127)<<7,e[n++]<128||(r|=(e[n]&127)<<14,e[n++]<128)||(r|=(e[n]&127)<<21,e[n++]<128)||(r+=(e[n]&127)*2**28,++n,e[n++]<128)||(r+=(e[n]&127)*2**35,++n,e[n++]<128)||(r+=(e[n]&127)*2**42,++n,e[n++]<128)))break varint;return t&&(t[0]=n),r}function ny(e){var t=new Uint8Array(7);t[0]=e&127;var n=1;sz:if(e>127){if(t[n-1]|=128,t[n]=e>>7&127,++n,e<=16383||(t[n-1]|=128,t[n]=e>>14&127,++n,e<=2097151)||(t[n-1]|=128,t[n]=e>>21&127,++n,e<=268435455)||(t[n-1]|=128,t[n]=e/256>>>21&127,++n,e<=34359738367)||(t[n-1]|=128,t[n]=e/65536>>>21&127,++n,e<=4398046511103))break sz;t[n-1]|=128,t[n]=e/16777216>>>21&127,++n}return t.slice(0,n)}function ry(e){var t=0,n=e[t]&127;varint:if(e[t++]>=128){if(n|=(e[t]&127)<<7,e[t++]<128||(n|=(e[t]&127)<<14,e[t++]<128)||(n|=(e[t]&127)<<21,e[t++]<128))break varint;n|=(e[t]&127)<<28}return n}function iy(e){for(var t=[],n=[0];n[0]<e.length;){var r=n[0],i=ty(e,n),a=i&7;i=Math.floor(i/8);var o=0,s;if(i==0)break;switch(a){case 0:for(var c=n[0];e[n[0]++]>=128;);s=e.slice(c,n[0]);break;case 5:o=4,s=e.slice(n[0],n[0]+o),n[0]+=o;break;case 1:o=8,s=e.slice(n[0],n[0]+o),n[0]+=o;break;case 2:o=ty(e,n),s=e.slice(n[0],n[0]+o),n[0]+=o;break;default:throw Error(`PB Type ${a} for Field ${i} at offset ${r}`)}var l={data:s,type:a};t[i]==null?t[i]=[l]:t[i].push(l)}return t}function ay(e){var t=[];return e.forEach(function(e,n){e.forEach(function(e){e.data&&(t.push(ny(n*8+e.type)),e.type==2&&t.push(ny(e.data.length)),t.push(e.data))})}),Zv(t)}function oy(e,t){return e?.map(function(e){return t(e.data)})||[]}function sy(e){for(var t=[],n=[0];n[0]<e.length;){var r=ty(e,n),i=iy(e.slice(n[0],n[0]+r));n[0]+=r;var a={id:ry(i[1][0].data),messages:[]};i[2].forEach(function(t){var r=iy(t.data),i=ry(r[3][0].data);a.messages.push({meta:r,data:e.slice(n[0],n[0]+i)}),n[0]+=i}),i[3]?.[0]&&(a.merge=ry(i[3][0].data)>>>0>0),t.push(a)}return t}function cy(e){var t=[];return e.forEach(function(e){var n=[];n[1]=[{data:ny(e.id),type:0}],n[2]=[],e.merge!=null&&(n[3]=[{data:ny(+!!e.merge),type:0}]);var r=[];e.messages.forEach(function(e){r.push(e.data),e.meta[3]=[{type:0,data:ny(e.data.length)}],n[2].push({data:ay(e.meta),type:2})});var i=ay(n);t.push(ny(i.length)),t.push(i),r.forEach(function(e){return t.push(e)})}),Zv(t)}function ly(e,t){if(e!=0)throw Error(`Unexpected Snappy chunk type ${e}`);for(var n=[0],r=ty(t,n),i=[];n[0]<t.length;){var a=t[n[0]]&3;if(a==0){var o=t[n[0]++]>>2;if(o<60)++o;else{var s=o-59;o=t[n[0]],s>1&&(o|=t[n[0]+1]<<8),s>2&&(o|=t[n[0]+2]<<16),s>3&&(o|=t[n[0]+3]<<24),o>>>=0,o++,n[0]+=s}i.push(t.slice(n[0],n[0]+o)),n[0]+=o;continue}else{var c=0,l=0;if(a==1?(l=(t[n[0]]>>2&7)+4,c=(t[n[0]++]&224)<<3,c|=t[n[0]++]):(l=(t[n[0]++]>>2)+1,a==2?(c=t[n[0]]|t[n[0]+1]<<8,n[0]+=2):(c=(t[n[0]]|t[n[0]+1]<<8|t[n[0]+2]<<16|t[n[0]+3]<<24)>>>0,n[0]+=4)),i=[Zv(i)],c==0)throw Error(`Invalid offset 0`);if(c>i[0].length)throw Error(`Invalid offset beyond length`);if(l>=c)for(i.push(i[0].slice(-c)),l-=c;l>=i[i.length-1].length;)i.push(i[i.length-1]),l-=i[i.length-1].length;i.push(i[0].slice(-c,-c+l))}}var u=Zv(i);if(u.length!=r)throw Error(`Unexpected length: ${u.length} != ${r}`);return u}function uy(e){for(var t=[],n=0;n<e.length;){var r=e[n++],i=e[n]|e[n+1]<<8|e[n+2]<<16;n+=3,t.push(ly(r,e.slice(n,n+i))),n+=i}if(n!==e.length)throw Error(`data is not a valid framed stream!`);return Zv(t)}function dy(e){for(var t=[],n=0;n<e.length;){var r=Math.min(e.length-n,268435455),i=new Uint8Array(4);t.push(i);var a=ny(r),o=a.length;t.push(a),r<=60?(o++,t.push(new Uint8Array([r-1<<2]))):r<=256?(o+=2,t.push(new Uint8Array([240,r-1&255]))):r<=65536?(o+=3,t.push(new Uint8Array([244,r-1&255,r-1>>8&255]))):r<=16777216?(o+=4,t.push(new Uint8Array([248,r-1&255,r-1>>8&255,r-1>>16&255]))):r<=4294967296&&(o+=5,t.push(new Uint8Array([252,r-1&255,r-1>>8&255,r-1>>16&255,r-1>>>24&255]))),t.push(e.slice(n,n+r)),o+=r,i[0]=0,i[1]=o&255,i[2]=o>>8&255,i[3]=o>>16&255,n+=r}return Zv(t)}function fy(e,t,n,r){var i=qv(e),a=i.getUint32(4,!0),o=(r>1?12:8)+Qv(a&(r>1?3470:398))*4,s=-1,c=-1,l=NaN,u=new Date(2001,0,1);a&512&&(s=i.getUint32(o,!0),o+=4),o+=Qv(a&(r>1?12288:4096))*4,a&16&&(c=i.getUint32(o,!0),o+=4),a&32&&(l=i.getFloat64(o,!0),o+=8),a&64&&(u.setTime(u.getTime()+i.getFloat64(o,!0)*1e3),o+=8);var d;switch(e[2]){case 0:break;case 2:d={t:`n`,v:l};break;case 3:d={t:`s`,v:t[c]};break;case 5:d={t:`d`,v:u};break;case 6:d={t:`b`,v:l>0};break;case 7:d={t:`n`,v:l/86400};break;case 8:d={t:`e`,v:0};break;case 9:if(s>-1)d={t:`s`,v:n[s]};else if(c>-1)d={t:`s`,v:t[c]};else if(!isNaN(l))d={t:`n`,v:l};else throw Error(`Unsupported cell type ${e.slice(0,4)}`);break;default:throw Error(`Unsupported cell type ${e.slice(0,4)}`)}return d}function py(e,t,n){var r=qv(e),i=r.getUint32(8,!0),a=12,o=-1,s=-1,c=NaN,l=NaN,u=new Date(2001,0,1);i&1&&(c=$v(e,a),a+=16),i&2&&(l=r.getFloat64(a,!0),a+=8),i&4&&(u.setTime(u.getTime()+r.getFloat64(a,!0)*1e3),a+=8),i&8&&(s=r.getUint32(a,!0),a+=4),i&16&&(o=r.getUint32(a,!0),a+=4);var d;switch(e[1]){case 0:break;case 2:d={t:`n`,v:c};break;case 3:d={t:`s`,v:t[s]};break;case 5:d={t:`d`,v:u};break;case 6:d={t:`b`,v:l>0};break;case 7:d={t:`n`,v:l/86400};break;case 8:d={t:`e`,v:0};break;case 9:if(o>-1)d={t:`s`,v:n[o]};else throw Error(`Unsupported cell type ${e[1]} : ${i&31} : ${e.slice(0,4)}`);break;case 10:d={t:`n`,v:c};break;default:throw Error(`Unsupported cell type ${e[1]} : ${i&31} : ${e.slice(0,4)}`)}return d}function my(e,t){var n=new Uint8Array(32),r=qv(n),i=12,a=0;switch(n[0]=5,e.t){case`n`:n[1]=2,ey(n,i,e.v),a|=1,i+=16;break;case`b`:n[1]=6,r.setFloat64(i,+!!e.v,!0),a|=2,i+=8;break;case`s`:if(t.indexOf(e.v)==-1)throw Error(`Value ${e.v} missing from SST!`);n[1]=3,r.setUint32(i,t.indexOf(e.v),!0),a|=8,i+=4;break;default:throw`unsupported cell type `+e.t}return r.setUint32(8,a,!0),n.slice(0,i)}function hy(e,t){var n=new Uint8Array(32),r=qv(n),i=12,a=0;switch(n[0]=3,e.t){case`n`:n[2]=2,r.setFloat64(i,e.v,!0),a|=32,i+=8;break;case`b`:n[2]=6,r.setFloat64(i,+!!e.v,!0),a|=32,i+=8;break;case`s`:if(t.indexOf(e.v)==-1)throw Error(`Value ${e.v} missing from SST!`);n[2]=3,r.setUint32(i,t.indexOf(e.v),!0),a|=16,i+=4;break;default:throw`unsupported cell type `+e.t}return r.setUint32(4,a,!0),n.slice(0,i)}function gy(e,t,n){switch(e[0]){case 0:case 1:case 2:case 3:return fy(e,t,n,e[0]);case 5:return py(e,t,n);default:throw Error(`Unsupported payload version ${e[0]}`)}}function _y(e){return ty(iy(e)[1][0].data)}function vy(e,t){var n=iy(t.data),r=ry(n[1][0].data),i=n[3],a=[];return(i||[]).forEach(function(t){var n=iy(t.data),i=ry(n[1][0].data)>>>0;switch(r){case 1:a[i]=Jv(n[3][0].data);break;case 8:var o=e[_y(n[9][0].data)][0],s=e[_y(iy(o.data)[1][0].data)][0],c=ry(s.meta[1][0].data);if(c!=2001)throw Error(`2000 unexpected reference to ${c}`);a[i]=iy(s.data)[3].map(function(e){return Jv(e.data)}).join(``);break}}),a}function yy(e,t){var n=iy(e),r=ry(n[1][0].data)>>>0,i=ry(n[2][0].data)>>>0,a=n[8]?.[0]?.data&&ry(n[8][0].data)>0||!1,o,s;if(n[7]?.[0]?.data&&t!=0)o=n[7]?.[0]?.data,s=n[6]?.[0]?.data;else if(n[4]?.[0]?.data&&t!=1)o=n[4]?.[0]?.data,s=n[3]?.[0]?.data;else throw`NUMBERS Tile missing ${t} cell storage`;for(var c=a?4:1,l=qv(o),u=[],d=0;d<o.length/2;++d){var f=l.getUint16(d*2,!0);f<65535&&u.push([d,f])}if(u.length!=i)throw`Expected ${i} cells, found ${u.length}`;var p=[];for(d=0;d<u.length-1;++d)p[u[d][0]]=s.subarray(u[d][1]*c,u[d+1][1]*c);return u.length>=1&&(p[u[u.length-1][0]]=s.subarray(u[u.length-1][1]*c)),{R:r,cells:p}}function by(e,t){var n=iy(t.data),r=n?.[7]?.[0]?+(ry(n[7][0].data)>>>0>0):-1,i=oy(n[5],function(e){return yy(e,r)});return{nrows:ry(n[4][0].data)>>>0,data:i.reduce(function(e,t){return e[t.R]||(e[t.R]=[]),t.cells.forEach(function(n,r){if(e[t.R][r])throw Error(`Duplicate cell r=${t.R} c=${r}`);e[t.R][r]=n}),e},[])}}function xy(e,t,n){var r=iy(t.data),i={s:{r:0,c:0},e:{r:0,c:0}};if(i.e.r=(ry(r[6][0].data)>>>0)-1,i.e.r<0)throw Error(`Invalid row varint ${r[6][0].data}`);if(i.e.c=(ry(r[7][0].data)>>>0)-1,i.e.c<0)throw Error(`Invalid col varint ${r[7][0].data}`);n[`!ref`]=Pi(i);var a=iy(r[4][0].data),o=vy(e,e[_y(a[4][0].data)][0]),s=a[17]?.[0]?vy(e,e[_y(a[17][0].data)][0]):[],c=iy(a[3][0].data),l=0;c[1].forEach(function(t){var r=e[_y(iy(t.data)[2][0].data)][0],i=ry(r.meta[1][0].data);if(i!=6002)throw Error(`6001 unexpected reference to ${i}`);var a=by(e,r);a.data.forEach(function(e,t){e.forEach(function(e,r){var i=J({r:l+t,c:r}),a=gy(e,o,s);a&&(n[i]=a)})}),l+=a.nrows})}function Sy(e,t){var n=iy(t.data),r={"!ref":`A1`},i=e[_y(n[2][0].data)],a=ry(i[0].meta[1][0].data);if(a!=6001)throw Error(`6000 unexpected reference to ${a}`);return xy(e,i[0],r),r}function Cy(e,t){var n=iy(t.data),r={name:n[1]?.[0]?Jv(n[1][0].data):``,sheets:[]};return oy(n[2],_y).forEach(function(t){e[t].forEach(function(t){ry(t.meta[1][0].data)==6e3&&r.sheets.push(Sy(e,t))})}),r}function wy(e,t){var n=gb();if(oy(iy(t.data)[1],_y).forEach(function(t){e[t].forEach(function(t){if(ry(t.meta[1][0].data)==2){var r=Cy(e,t);r.sheets.forEach(function(e,t){_b(n,e,t==0?r.name:r.name+`_`+t,!0)})}})}),n.SheetNames.length==0)throw Error(`Empty NUMBERS file`);return n}function Ty(e){var t={},n=[];if(e.FullPaths.forEach(function(e){if(e.match(/\.iwpv2/))throw Error(`Unsupported password protection`)}),e.FileIndex.forEach(function(e){if(e.name.match(/\.iwa$/)){var r;try{r=uy(e.content)}catch(t){return console.log(`?? `+e.content.length+` `+(t.message||t))}var i;try{i=sy(r)}catch(e){return console.log(`## `+(e.message||e))}i.forEach(function(e){t[e.id]=e.messages,n.push(e.id)})}}),!n.length)throw Error(`File has no messages`);var r=(t?.[1]?.[0]?.meta?.[1])?.[0].data&&ry(t[1][0].meta[1][0].data)==1&&t[1][0];if(r||n.forEach(function(e){t[e].forEach(function(e){if(ry(e.meta[1][0].data)>>>0==1)if(!r)r=e;else throw Error(`Document has multiple roots`)})}),!r)throw Error(`Cannot find Document root`);return wy(t,r)}function Ey(e,t,n){if(!e[6]?.[0]||!e[7]?.[0])throw`Mutation only works on post-BNC storages!`;if(e[8]?.[0]?.data&&ry(e[8][0].data)>0)throw`Math only works with normal offsets`;for(var r=0,i=qv(e[7][0].data),a=0,o=[],s=qv(e[4][0].data),c=0,l=[],u=0;u<t.length;++u){if(t[u]==null){i.setUint16(u*2,65535,!0),s.setUint16(u*2,65535);continue}i.setUint16(u*2,a,!0),s.setUint16(u*2,c,!0);var d,f;switch(typeof t[u]){case`string`:d=my({t:`s`,v:t[u]},n),f=hy({t:`s`,v:t[u]},n);break;case`number`:d=my({t:`n`,v:t[u]},n),f=hy({t:`n`,v:t[u]},n);break;case`boolean`:d=my({t:`b`,v:t[u]},n),f=hy({t:`b`,v:t[u]},n);break;default:throw Error(`Unsupported value `+t[u])}o.push(d),a+=d.length,l.push(f),c+=f.length,++r}for(e[2][0].data=ny(r);u<e[7][0].data.length/2;++u)i.setUint16(u*2,65535,!0),s.setUint16(u*2,65535,!0);return e[6][0].data=Zv(o),e[3][0].data=Zv(l),r}function Dy(e,t){if(!t||!t.numbers)throw Error("Must pass a `numbers` option -- check the README");var n=e.Sheets[e.SheetNames[0]];e.SheetNames.length>1&&console.error(`The Numbers writer currently writes only the first table`);var r=Ni(n[`!ref`]);r.s.r=r.s.c=0;var i=!1;r.e.c>9&&(i=!0,r.e.c=9),r.e.r>49&&(i=!0,r.e.r=49),i&&console.error(`The Numbers writer is currently limited to ${Pi(r)}`);var a=ob(n,{range:r,header:1}),o=[`~Sh33tJ5~`];a.forEach(function(e){return e.forEach(function(e){typeof e==`string`&&o.push(e)})});var s={},c=[],l=U.read(t.numbers,{type:`base64`});l.FileIndex.map(function(e,t){return[e,l.FullPaths[t]]}).forEach(function(e){var t=e[0],n=e[1];if(t.type==2&&t.name.match(/\.iwa/)){var r=t.content;sy(uy(r)).forEach(function(e){c.push(e.id),s[e.id]={deps:[],location:n,type:ry(e.messages[0].meta[1][0].data)}})}}),c.sort(function(e,t){return e-t});var u=c.filter(function(e){return e>1}).map(function(e){return[e,ny(e)]});l.FileIndex.map(function(e,t){return[e,l.FullPaths[t]]}).forEach(function(e){var t=e[0];e[1],t.name.match(/\.iwa/)&&sy(uy(t.content)).forEach(function(e){e.messages.forEach(function(t){u.forEach(function(t){e.messages.some(function(e){return ry(e.meta[1][0].data)!=11006&&Xv(e.data,t[1])})&&s[t[0]].deps.push(e.id)})})})});for(var d=U.find(l,s[1].location),f=sy(uy(d.content)),p,m=0;m<f.length;++m){var h=f[m];h.id==1&&(p=h)}var g=_y(iy(p.messages[0].data)[1][0].data);for(d=U.find(l,s[g].location),f=sy(uy(d.content)),m=0;m<f.length;++m)h=f[m],h.id==g&&(p=h);for(g=_y(iy(p.messages[0].data)[2][0].data),d=U.find(l,s[g].location),f=sy(uy(d.content)),m=0;m<f.length;++m)h=f[m],h.id==g&&(p=h);for(g=_y(iy(p.messages[0].data)[2][0].data),d=U.find(l,s[g].location),f=sy(uy(d.content)),m=0;m<f.length;++m)h=f[m],h.id==g&&(p=h);var _=iy(p.messages[0].data);_[6][0].data=ny(r.e.r+1),_[7][0].data=ny(r.e.c+1);for(var v=_y(_[46][0].data),y=U.find(l,s[v].location),b=sy(uy(y.content)),x=0;x<b.length&&b[x].id!=v;++x);if(b[x].id!=v)throw`Bad ColumnRowUIDMapArchive`;var S=iy(b[x].messages[0].data);S[1]=[],S[2]=[],S[3]=[];for(var C=0;C<=r.e.c;++C){var w=[];w[1]=w[2]=[{type:0,data:ny(C+420690)}],S[1].push({type:2,data:ay(w)}),S[2].push({type:0,data:ny(C)}),S[3].push({type:0,data:ny(C)})}S[4]=[],S[5]=[],S[6]=[];for(var T=0;T<=r.e.r;++T)w=[],w[1]=w[2]=[{type:0,data:ny(T+726270)}],S[4].push({type:2,data:ay(w)}),S[5].push({type:0,data:ny(T)}),S[6].push({type:0,data:ny(T)});b[x].messages[0].data=ay(S),y.content=dy(cy(b)),y.size=y.content.length,delete _[46];var E=iy(_[4][0].data);E[7][0].data=ny(r.e.r+1);var D=_y(iy(E[1][0].data)[2][0].data);if(y=U.find(l,s[D].location),b=sy(uy(y.content)),b[0].id!=D)throw`Bad HeaderStorageBucket`;var O=iy(b[0].messages[0].data);for(T=0;T<a.length;++T){var k=iy(O[2][0].data);k[1][0].data=ny(T),k[4][0].data=ny(a[T].length),O[2][T]={type:O[2][0].type,data:ay(k)}}b[0].messages[0].data=ay(O),y.content=dy(cy(b)),y.size=y.content.length;var A=_y(E[2][0].data);if(y=U.find(l,s[A].location),b=sy(uy(y.content)),b[0].id!=A)throw`Bad HeaderStorageBucket`;for(O=iy(b[0].messages[0].data),C=0;C<=r.e.c;++C)k=iy(O[2][0].data),k[1][0].data=ny(C),k[4][0].data=ny(r.e.r+1),O[2][C]={type:O[2][0].type,data:ay(k)};b[0].messages[0].data=ay(O),y.content=dy(cy(b)),y.size=y.content.length;var j=_y(E[4][0].data);(function(){for(var e=U.find(l,s[j].location),t=sy(uy(e.content)),n,r=0;r<t.length;++r){var i=t[r];i.id==j&&(n=i)}var a=iy(n.messages[0].data);a[3]=[];var c=[];o.forEach(function(e,t){c[1]=[{type:0,data:ny(t)}],c[2]=[{type:0,data:ny(1)}],c[3]=[{type:2,data:Yv(e)}],a[3].push({type:2,data:ay(c)})}),n.messages[0].data=ay(a),e.content=dy(cy(t)),e.size=e.content.length})();var M=iy(E[3][0].data),N=M[1][0];delete M[2];var P=iy(N.data),F=_y(P[2][0].data);(function(){for(var e=U.find(l,s[F].location),t=sy(uy(e.content)),n,i=0;i<t.length;++i){var c=t[i];c.id==F&&(n=c)}var u=iy(n.messages[0].data);delete u[6],delete M[7];var d=new Uint8Array(u[5][0].data);u[5]=[];for(var f=0,p=0;p<=r.e.r;++p){var m=iy(d);f+=Ey(m,a[p],o),m[1][0].data=ny(p),u[5].push({data:ay(m),type:2})}u[1]=[{type:0,data:ny(r.e.c+1)}],u[2]=[{type:0,data:ny(r.e.r+1)}],u[3]=[{type:0,data:ny(f)}],u[4]=[{type:0,data:ny(r.e.r+1)}],n.messages[0].data=ay(u),e.content=dy(cy(t)),e.size=e.content.length})(),N.data=ay(P),E[3][0].data=ay(M),_[4][0].data=ay(E),p.messages[0].data=ay(_);var I=dy(cy(f));return d.content=I,d.size=d.content.length,l}function Oy(e){return function(t){for(var n=0;n!=e.length;++n){var r=e[n];t[r[0]]===void 0&&(t[r[0]]=r[1]),r[2]===`n`&&(t[r[0]]=Number(t[r[0]]))}}}function ky(e){Oy([[`cellNF`,!1],[`cellHTML`,!0],[`cellFormula`,!0],[`cellStyles`,!1],[`cellText`,!0],[`cellDates`,!1],[`sheetStubs`,!1],[`sheetRows`,0,`n`],[`bookDeps`,!1],[`bookSheets`,!1],[`bookProps`,!1],[`bookFiles`,!1],[`bookVBA`,!1],[`password`,``],[`WTF`,!1]])(e)}function Ay(e){Oy([[`cellDates`,!1],[`bookSST`,!1],[`bookType`,`xlsx`],[`compression`,!1],[`WTF`,!1]])(e)}function jy(e){return Ya.WS.indexOf(e)>-1?`sheet`:Ya.CS&&e==Ya.CS?`chart`:Ya.DS&&e==Ya.DS?`dialog`:Ya.MS&&e==Ya.MS?`macro`:e&&e.length?e:`sheet`}function My(e,t){if(!e)return 0;try{e=t.map(function(t){return t.id||=t.strRelID,[t.name,e[`!id`][t.id].Target,jy(e[`!id`][t.id].Type)]})}catch{return null}return!e||e.length===0?null:e}function Ny(e,t,n,r,i,a,o,s,c,l,u,d){try{a[r]=Za(Rn(e,n,!0),t);var f=Ln(e,t),p;switch(s){case`sheet`:p=s_(f,t,i,c,a[r],l,u,d);break;case`chart`:if(p=c_(f,t,i,c,a[r],l,u,d),!p||!p[`!drawel`])break;var m=Wn(p[`!drawel`].Target,t),h=Xa(m),g=Wn(Xd(Rn(e,m,!0),Za(Rn(e,h,!0),m)),m),_=Xa(g);p=kg(Rn(e,g,!0),g,c,Za(Rn(e,_,!0),g),l,p);break;case`macro`:p=l_(f,t,i,c,a[r],l,u,d);break;case`dialog`:p=u_(f,t,i,c,a[r],l,u,d);break;default:throw Error(`Unrecognized sheet type `+s)}o[r]=p;var v=[];a&&a[r]&&ln(a[r]).forEach(function(n){var i=``;if(a[r][n].Type==Ya.CMNT){i=Wn(a[r][n].Target,t);var o=m_(Ln(e,i,!0),i,c);if(!o||!o.length)return;$d(p,o,!1)}a[r][n].Type==Ya.TCMNT&&(i=Wn(a[r][n].Target,t),v=v.concat(nf(Ln(e,i,!0),c)))}),v&&v.length&&$d(p,v,!0,c.people||[])}catch(e){if(c.WTF)throw e}}function Py(e){return e.charAt(0)==`/`?e.slice(1):e}function Fy(e,t){if(Qt(),t||={},ky(t),Fn(e,`META-INF/manifest.xml`)||Fn(e,`objectdata.xml`))return Hv(e,t);if(Fn(e,`Index/Document.iwa`)){if(typeof Uint8Array>`u`)throw Error(`NUMBERS file parsing requires Uint8Array support`);if(Ty!==void 0){if(e.FileIndex)return Ty(e);var n=U.utils.cfb_new();return Bn(e).forEach(function(t){Vn(n,t,zn(e,t))}),Ty(n)}throw Error(`Unsupported NUMBERS file`)}if(!Fn(e,`[Content_Types].xml`))throw Fn(e,`index.xml.gz`)?Error(`Unsupported NUMBERS 08 file`):Fn(e,`index.xml`)?Error(`Unsupported NUMBERS 09 file`):Error(`Unsupported ZIP file`);var r=Bn(e),i=qa(Rn(e,`[Content_Types].xml`)),a=!1,o,s;if(i.workbooks.length===0&&(s=`xl/workbook.xml`,Ln(e,s,!0)&&i.workbooks.push(s)),i.workbooks.length===0){if(s=`xl/workbook.bin`,!Ln(e,s,!0))throw Error(`Could not find workbook`);i.workbooks.push(s),a=!0}i.workbooks[0].slice(-3)==`bin`&&(a=!0);var c={},l={};if(!t.bookSheets&&!t.bookProps){if(Cm=[],i.sst)try{Cm=p_(Ln(e,Py(i.sst)),i.sst,t)}catch(e){if(t.WTF)throw e}t.cellStyles&&i.themes.length&&(c=f_(Rn(e,i.themes[0].replace(/^\//,``),!0)||``,i.themes[0],t)),i.style&&(l=d_(Ln(e,Py(i.style)),i.style,c,t))}i.links.map(function(n){try{var r=Za(Rn(e,Xa(Py(n))),n);return g_(Ln(e,Py(n)),r,n,t)}catch{}});var u=o_(Ln(e,Py(i.workbooks[0])),i.workbooks[0],t),d={},f=``;i.coreprops.length&&(f=Ln(e,Py(i.coreprops[0]),!0),f&&(d=lo(f)),i.extprops.length!==0&&(f=Ln(e,Py(i.extprops[0]),!0),f&&go(f,d,t)));var p={};(!t.bookSheets||t.bookProps)&&i.custprops.length!==0&&(f=Rn(e,Py(i.custprops[0]),!0),f&&(p=yo(f,t)));var m={};if((t.bookSheets||t.bookProps)&&(u.Sheets?o=u.Sheets.map(function(e){return e.name}):d.Worksheets&&d.SheetNames.length>0&&(o=d.SheetNames),t.bookProps&&(m.Props=d,m.Custprops=p),t.bookSheets&&o!==void 0&&(m.SheetNames=o),t.bookSheets?m.SheetNames:t.bookProps))return m;o={};var h={};t.bookDeps&&i.calcchain&&(h=h_(Ln(e,Py(i.calcchain)),i.calcchain,t));var g=0,_={},v,y,b=u.Sheets;d.Worksheets=b.length,d.SheetNames=[];for(var x=0;x!=b.length;++x)d.SheetNames[x]=b[x].name;var S=a?`bin`:`xml`,C=i.workbooks[0].lastIndexOf(`/`),w=(i.workbooks[0].slice(0,C+1)+`_rels/`+i.workbooks[0].slice(C+1)+`.rels`).replace(/^\//,``);Fn(e,w)||(w=`xl/_rels/workbook.`+S+`.rels`);var T=Za(Rn(e,w,!0),w.replace(/_rels.*/,`s5s`));(i.metadata||[]).length>=1&&(t.xlmeta=__(Ln(e,Py(i.metadata[0])),i.metadata[0],t)),(i.people||[]).length>=1&&(t.people=af(Ln(e,Py(i.people[0])),t)),T&&=My(T,u.Sheets);var E=+!!Ln(e,`xl/worksheets/sheet.xml`,!0);wsloop:for(g=0;g!=d.Worksheets;++g){var D=`sheet`;if(T&&T[g]?(v=`xl/`+T[g][1].replace(/[\/]?xl\//,``),Fn(e,v)||(v=T[g][1]),Fn(e,v)||(v=w.replace(/_rels\/.*$/,``)+T[g][1]),D=T[g][2]):(v=`xl/worksheets/sheet`+(g+1-E)+`.`+S,v=v.replace(/sheet0\./,`sheet.`)),y=v.replace(/^(.*)(\/)([^\/]*)$/,`$1/_rels/$3.rels`),t&&t.sheets!=null)switch(typeof t.sheets){case`number`:if(g!=t.sheets)continue wsloop;break;case`string`:if(d.SheetNames[g].toLowerCase()!=t.sheets.toLowerCase())continue wsloop;break;default:if(Array.isArray&&Array.isArray(t.sheets)){for(var O=!1,k=0;k!=t.sheets.length;++k)typeof t.sheets[k]==`number`&&t.sheets[k]==g&&(O=1),typeof t.sheets[k]==`string`&&t.sheets[k].toLowerCase()==d.SheetNames[g].toLowerCase()&&(O=1);if(!O)continue wsloop}}Ny(e,v,y,d.SheetNames[g],g,_,o,D,t,u,c,l)}return m={Directory:i,Workbook:u,Props:d,Custprops:p,Deps:h,Sheets:o,SheetNames:d.SheetNames,Strings:Cm,Styles:l,Themes:c,SSF:En(H)},t&&t.bookFiles&&(e.files?(m.keys=r,m.files=e.files):(m.keys=[],m.files={},e.FullPaths.forEach(function(t,n){t=t.replace(/^Root Entry[\/]/,``),m.keys.push(t),m.files[t]=e.FileIndex[n]}))),t&&t.bookVBA&&(i.vba.length>0?m.vbaraw=Ln(e,Py(i.vba[0]),!0):i.defaults&&i.defaults.bin===pf&&(m.vbaraw=Ln(e,`xl/vbaProject.bin`,!0))),m}function Iy(e,t){var n=t||{},r=`Workbook`,i=U.find(e,r);try{if(r=`/!DataSpaces/Version`,i=U.find(e,r),!i||!i.content||(Kl(i.content),r=`/!DataSpaces/DataSpaceMap`,i=U.find(e,r),!i||!i.content))throw Error(`ECMA-376 Encrypted file missing `+r);var a=Jl(i.content);if(a.length!==1||a[0].comps.length!==1||a[0].comps[0].t!==0||a[0].name!==`StrongEncryptionDataSpace`||a[0].comps[0].v!==`EncryptedPackage`)throw Error(`ECMA-376 Encrypted file bad `+r);if(r=`/!DataSpaces/DataSpaceInfo/StrongEncryptionDataSpace`,i=U.find(e,r),!i||!i.content)throw Error(`ECMA-376 Encrypted file missing `+r);var o=Yl(i.content);if(o.length!=1||o[0]!=`StrongEncryptionTransform`)throw Error(`ECMA-376 Encrypted file bad `+r);if(r=`/!DataSpaces/TransformInfo/StrongEncryptionTransform/!Primary`,i=U.find(e,r),!i||!i.content)throw Error(`ECMA-376 Encrypted file missing `+r);Zl(i.content)}catch{}if(r=`/EncryptionInfo`,i=U.find(e,r),!i||!i.content)throw Error(`ECMA-376 Encrypted file missing `+r);var s=eu(i.content);if(r=`/EncryptedPackage`,i=U.find(e,r),!i||!i.content)throw Error(`ECMA-376 Encrypted file missing `+r);if(s[0]==4&&typeof decrypt_agile<`u`)return decrypt_agile(s[1],i.content,n.password||``,n);if(s[0]==2&&typeof decrypt_std76<`u`)return decrypt_std76(s[1],i.content,n.password||``,n);throw Error(`File is password-protected`)}function Ly(e,t){return t.bookType==`ods`?Kv(e,t):t.bookType==`numbers`?Dy(e,t):t.bookType==`xlsb`?Ry(e,t):zy(e,t)}function Ry(e,t){Zd=1024,e&&!e.SSF&&(e.SSF=En(H)),e&&e.SSF&&(Qt(),Zt(e.SSF),t.revssf=fn(e.SSF),t.revssf[e.SSF[65535]]=0,t.ssf=e.SSF),t.rels={},t.wbrels={},t.Strings=[],t.Strings.Count=0,t.Strings.Unique=0,Tm?t.revStrings=new Map:(t.revStrings={},t.revStrings.foo=[],delete t.revStrings.foo);var n=t.bookType==`xlsb`?`bin`:`xml`,r=gf.indexOf(t.bookType)>-1,i=Ka();Ay(t||={});var a=Hn(),o=``,s=0;if(t.cellXfs=[],km(t.cellXfs,{},{revssf:{General:0}}),e.Props||={},o=`docProps/core.xml`,Vn(a,o,fo(e.Props,t)),i.coreprops.push(o),$a(t.rels,2,o,Ya.CORE_PROPS),o=`docProps/app.xml`,!(e.Props&&e.Props.SheetNames))if(!e.Workbook||!e.Workbook.Sheets)e.Props.SheetNames=e.SheetNames;else{for(var c=[],l=0;l<e.SheetNames.length;++l)(e.Workbook.Sheets[l]||{}).Hidden!=2&&c.push(e.SheetNames[l]);e.Props.SheetNames=c}for(e.Props.Worksheets=e.Props.SheetNames.length,Vn(a,o,_o(e.Props,t)),i.extprops.push(o),$a(t.rels,3,o,Ya.EXT_PROPS),e.Custprops!==e.Props&&ln(e.Custprops||{}).length>0&&(o=`docProps/custom.xml`,Vn(a,o,bo(e.Custprops,t)),i.custprops.push(o),$a(t.rels,4,o,Ya.CUST_PROPS)),s=1;s<=e.SheetNames.length;++s){var u={"!id":{}},d=e.Sheets[e.SheetNames[s-1]];switch((d||{})[`!type`]||`sheet`){default:o=`xl/worksheets/sheet`+s+`.`+n,Vn(a,o,y_(s-1,o,t,e,u)),i.sheets.push(o),$a(t.wbrels,-1,`worksheets/sheet`+s+`.`+n,Ya.WS[0])}if(d){var f=d[`!comments`],p=!1,m=``;f&&f.length>0&&(m=`xl/comments`+s+`.`+n,Vn(a,m,S_(f,m,t)),i.comments.push(m),$a(u,-1,`../comments`+s+`.`+n,Ya.CMNT),p=!0),d[`!legacy`]&&p&&Vn(a,`xl/drawings/vmlDrawing`+s+`.vml`,Qd(s,d[`!comments`])),delete d[`!comments`],delete d[`!legacy`]}u[`!id`].rId1&&Vn(a,Xa(o),Qa(u))}return t.Strings!=null&&t.Strings.length>0&&(o=`xl/sharedStrings.`+n,Vn(a,o,x_(t.Strings,o,t)),i.strs.push(o),$a(t.wbrels,-1,`sharedStrings.`+n,Ya.SST)),o=`xl/workbook.`+n,Vn(a,o,v_(e,o,t)),i.workbooks.push(o),$a(t.rels,1,o,Ya.WB),o=`xl/theme/theme1.xml`,Vn(a,o,Ed(e.Themes,t)),i.themes.push(o),$a(t.wbrels,-1,`theme/theme1.xml`,Ya.THEME),o=`xl/styles.`+n,Vn(a,o,b_(e,o,t)),i.styles.push(o),$a(t.wbrels,-1,`styles.`+n,Ya.STY),e.vbaraw&&r&&(o=`xl/vbaProject.bin`,Vn(a,o,e.vbaraw),i.vba.push(o),$a(t.wbrels,-1,`vbaProject.bin`,Ya.VBA)),o=`xl/metadata.`+n,Vn(a,o,C_(o)),i.metadata.push(o),$a(t.wbrels,-1,`metadata.`+n,Ya.XLMETA),Vn(a,`[Content_Types].xml`,Ja(i,t)),Vn(a,`_rels/.rels`,Qa(t.rels)),Vn(a,`xl/_rels/workbook.`+n+`.rels`,Qa(t.wbrels)),delete t.revssf,delete t.ssf,a}function zy(e,t){Zd=1024,e&&!e.SSF&&(e.SSF=En(H)),e&&e.SSF&&(Qt(),Zt(e.SSF),t.revssf=fn(e.SSF),t.revssf[e.SSF[65535]]=0,t.ssf=e.SSF),t.rels={},t.wbrels={},t.Strings=[],t.Strings.Count=0,t.Strings.Unique=0,Tm?t.revStrings=new Map:(t.revStrings={},t.revStrings.foo=[],delete t.revStrings.foo);var n=`xml`,r=gf.indexOf(t.bookType)>-1,i=Ka();Ay(t||={});var a=Hn(),o=``,s=0;if(t.cellXfs=[],km(t.cellXfs,{},{revssf:{General:0}}),e.Props||={},o=`docProps/core.xml`,Vn(a,o,fo(e.Props,t)),i.coreprops.push(o),$a(t.rels,2,o,Ya.CORE_PROPS),o=`docProps/app.xml`,!(e.Props&&e.Props.SheetNames))if(!e.Workbook||!e.Workbook.Sheets)e.Props.SheetNames=e.SheetNames;else{for(var c=[],l=0;l<e.SheetNames.length;++l)(e.Workbook.Sheets[l]||{}).Hidden!=2&&c.push(e.SheetNames[l]);e.Props.SheetNames=c}e.Props.Worksheets=e.Props.SheetNames.length,Vn(a,o,_o(e.Props,t)),i.extprops.push(o),$a(t.rels,3,o,Ya.EXT_PROPS),e.Custprops!==e.Props&&ln(e.Custprops||{}).length>0&&(o=`docProps/custom.xml`,Vn(a,o,bo(e.Custprops,t)),i.custprops.push(o),$a(t.rels,4,o,Ya.CUST_PROPS));var u=[`SheetJ5`];for(t.tcid=0,s=1;s<=e.SheetNames.length;++s){var d={"!id":{}},f=e.Sheets[e.SheetNames[s-1]];switch((f||{})[`!type`]||`sheet`){default:o=`xl/worksheets/sheet`+s+`.`+n,Vn(a,o,uh(s-1,t,e,d)),i.sheets.push(o),$a(t.wbrels,-1,`worksheets/sheet`+s+`.`+n,Ya.WS[0])}if(f){var p=f[`!comments`],m=!1,h=``;if(p&&p.length>0){var g=!1;p.forEach(function(e){e[1].forEach(function(e){e.T==1&&(g=!0)})}),g&&(h=`xl/threadedComments/threadedComment`+s+`.`+n,Vn(a,h,rf(p,u,t)),i.threadedcomments.push(h),$a(d,-1,`../threadedComments/threadedComment`+s+`.`+n,Ya.TCMNT)),h=`xl/comments`+s+`.`+n,Vn(a,h,tf(p,t)),i.comments.push(h),$a(d,-1,`../comments`+s+`.`+n,Ya.CMNT),m=!0}f[`!legacy`]&&m&&Vn(a,`xl/drawings/vmlDrawing`+s+`.vml`,Qd(s,f[`!comments`])),delete f[`!comments`],delete f[`!legacy`]}d[`!id`].rId1&&Vn(a,Xa(o),Qa(d))}return t.Strings!=null&&t.Strings.length>0&&(o=`xl/sharedStrings.`+n,Vn(a,o,Rl(t.Strings,t)),i.strs.push(o),$a(t.wbrels,-1,`sharedStrings.`+n,Ya.SST)),o=`xl/workbook.`+n,Vn(a,o,qg(e,t)),i.workbooks.push(o),$a(t.rels,1,o,Ya.WB),o=`xl/theme/theme1.xml`,Vn(a,o,Ed(e.Themes,t)),i.themes.push(o),$a(t.wbrels,-1,`theme/theme1.xml`,Ya.THEME),o=`xl/styles.`+n,Vn(a,o,Uu(e,t)),i.styles.push(o),$a(t.wbrels,-1,`styles.`+n,Ya.STY),e.vbaraw&&r&&(o=`xl/vbaProject.bin`,Vn(a,o,e.vbaraw),i.vba.push(o),$a(t.wbrels,-1,`vbaProject.bin`,Ya.VBA)),o=`xl/metadata.`+n,Vn(a,o,Gd()),i.metadata.push(o),$a(t.wbrels,-1,`metadata.`+n,Ya.XLMETA),u.length>1&&(o=`xl/persons/person.xml`,Vn(a,o,of(u,t)),i.people.push(o),$a(t.wbrels,-1,`persons/person.xml`,Ya.PEOPLE)),Vn(a,`[Content_Types].xml`,Ja(i,t)),Vn(a,`_rels/.rels`,Qa(t.rels)),Vn(a,`xl/_rels/workbook.`+n+`.rels`,Qa(t.wbrels)),delete t.revssf,delete t.ssf,a}function By(e,t){var n=``;switch((t||{}).type||`base64`){case`buffer`:return[e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7]];case`base64`:n=Me(e.slice(0,12));break;case`binary`:n=e;break;case`array`:return[e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7]];default:throw Error(`Unrecognized type `+(t&&t.type||`undefined`))}return[n.charCodeAt(0),n.charCodeAt(1),n.charCodeAt(2),n.charCodeAt(3),n.charCodeAt(4),n.charCodeAt(5),n.charCodeAt(6),n.charCodeAt(7)]}function Vy(e,t){return U.find(e,`EncryptedPackage`)?Iy(e,t):av(e,t)}function Hy(e,t){var n,r=e,i=t||{};return i.type||=Ne&&Buffer.isBuffer(e)?`buffer`:`base64`,n=Un(r,i),Fy(n,i)}function Uy(e,t){var n=0;main:for(;n<e.length;)switch(e.charCodeAt(n)){case 10:case 13:case 32:++n;break;case 60:return I_(e.slice(n),t);default:break main}return Cl.to_workbook(e,t)}function Wy(e,t){var n=``,r=By(e,t);switch(t.type){case`base64`:n=Me(e);break;case`binary`:n=e;break;case`buffer`:n=e.toString(`binary`);break;case`array`:n=Tn(e);break;default:throw Error(`Unrecognized type `+t.type)}return r[0]==239&&r[1]==187&&r[2]==191&&(n=hr(n)),t.type=`binary`,Uy(n,t)}function Gy(e,t){var n=e;return t.type==`base64`&&(n=Me(n)),n=De.utils.decode(1200,n.slice(2),`str`),t.type=`binary`,Uy(n,t)}function Ky(e){return e.match(/[^\x00-\x7F]/)?gr(e):e}function qy(e,t,n,r){return r?(n.type=`string`,Cl.to_workbook(e,n)):Cl.to_workbook(t,n)}function Jy(e,t){be();var n=t||{};if(typeof ArrayBuffer<`u`&&e instanceof ArrayBuffer)return Jy(new Uint8Array(e),(n=En(n),n.type=`array`,n));typeof Uint8Array<`u`&&e instanceof Uint8Array&&!n.type&&(n.type=typeof Deno<`u`?`buffer`:`array`);var r=e,i=[0,0,0,0],a=!1;if(n.cellStyles&&(n.cellNF=!0,n.sheetStubs=!0),wm={},n.dateNF&&(wm.dateNF=n.dateNF),n.type||=Ne&&Buffer.isBuffer(e)?`buffer`:`base64`,n.type==`file`&&(n.type=Ne?`buffer`:`binary`,r=cn(e),typeof Uint8Array<`u`&&!Ne&&(n.type=`array`)),n.type==`string`&&(a=!0,n.type=`binary`,n.codepage=65001,r=Ky(e)),n.type==`array`&&typeof Uint8Array<`u`&&e instanceof Uint8Array&&typeof ArrayBuffer<`u`){var o=new Uint8Array(new ArrayBuffer(3));if(o.foo=`bar`,!o.foo)return n=En(n),n.type=`array`,Jy(Ve(r),n)}switch((i=By(r,n))[0]){case 208:if(i[1]===207&&i[2]===17&&i[3]===224&&i[4]===161&&i[5]===177&&i[6]===26&&i[7]===225)return Vy(U.read(r,n),n);break;case 9:if(i[1]<=8)return av(r,n);break;case 60:return I_(r,n);case 73:if(i[1]===73&&i[2]===42&&i[3]===0)throw Error(`TIFF Image File is not a spreadsheet`);if(i[1]===68)return wl(r,n);break;case 84:if(i[1]===65&&i[2]===66&&i[3]===76)return xl.to_workbook(r,n);break;case 80:return i[1]===75&&i[2]<9&&i[3]<9?Hy(r,n):qy(e,r,n,a);case 239:return i[3]===60?I_(r,n):qy(e,r,n,a);case 255:if(i[1]===254)return Gy(r,n);if(i[1]===0&&i[2]===2&&i[3]===0)return Tl.to_workbook(r,n);break;case 0:if(i[1]===0&&(i[2]>=2&&i[3]===0||i[2]===0&&(i[3]===8||i[3]===9)))return Tl.to_workbook(r,n);break;case 3:case 131:case 139:case 140:return yl.to_workbook(r,n);case 123:if(i[1]===92&&i[2]===114&&i[3]===116)return pu.to_workbook(r,n);break;case 10:case 13:case 32:return Wy(r,n);case 137:if(i[1]===80&&i[2]===78&&i[3]===71)throw Error(`PNG Image File is not a spreadsheet`);break}return vl.indexOf(i[0])>-1&&i[2]<=12&&i[3]<=31?yl.to_workbook(r,n):qy(e,r,n,a)}function Yy(e,t){switch(t.type){case`base64`:case`binary`:break;case`buffer`:case`array`:t.type=``;break;case`file`:return sn(t.file,U.write(e,{type:Ne?`buffer`:``}));case`string`:throw Error(`'string' output type invalid for '`+t.bookType+`' files`);default:throw Error(`Unrecognized type `+t.type)}return U.write(e,t)}function Xy(e,t){var n=En(t||{});return Zy(Ly(e,n),n)}function Zy(e,t){var n={},r=Ne?`nodebuffer`:typeof Uint8Array<`u`?`array`:`string`;if(t.compression&&(n.compression=`DEFLATE`),t.password)n.type=r;else switch(t.type){case`base64`:n.type=`base64`;break;case`binary`:n.type=`string`;break;case`string`:throw Error(`'string' output type invalid for '`+t.bookType+`' files`);case`buffer`:case`file`:n.type=r;break;default:throw Error(`Unrecognized type `+t.type)}var i=e.FullPaths?U.write(e,{fileType:`zip`,type:{nodebuffer:`buffer`,string:`binary`}[n.type]||n.type,compression:!!t.compression}):e.generate(n);if(typeof Deno<`u`&&typeof i==`string`){if(t.type==`binary`||t.type==`base64`)return i;i=new Uint8Array(Re(i))}return t.password&&typeof encrypt_agile<`u`?Yy(encrypt_agile(i,t.password),t):t.type===`file`?sn(t.file,i):t.type==`string`?hr(i):i}function Qy(e,t){var n=t||{};return Yy(ov(e,n),n)}function $y(e,t,n){n||=``;var r=n+e;switch(t.type){case`base64`:return je(gr(r));case`binary`:return gr(r);case`string`:return e;case`file`:return sn(t.file,r,`utf8`);case`buffer`:return Ne?Pe(r,`utf8`):typeof TextEncoder<`u`?new TextEncoder().encode(r):$y(r,{type:`binary`}).split(``).map(function(e){return e.charCodeAt(0)})}throw Error(`Unrecognized type `+t.type)}function eb(e,t){switch(t.type){case`base64`:return je(e);case`binary`:return e;case`string`:return e;case`file`:return sn(t.file,e,`binary`);case`buffer`:return Ne?Pe(e,`binary`):e.split(``).map(function(e){return e.charCodeAt(0)})}throw Error(`Unrecognized type `+t.type)}function tb(e,t){switch(t.type){case`string`:case`base64`:case`binary`:for(var n=``,r=0;r<e.length;++r)n+=String.fromCharCode(e[r]);return t.type==`base64`?je(n):t.type==`string`?hr(n):n;case`file`:return sn(t.file,e);case`buffer`:return e;default:throw Error(`Unrecognized type `+t.type)}}function nb(e,t){be(),Wg(e);var n=En(t||{});if(n.cellStyles&&(n.cellNF=!0,n.sheetStubs=!0),n.type==`array`){n.type=`binary`;var r=nb(e,n);return n.type=`array`,Re(r)}var i=0;if(n.sheet&&(i=typeof n.sheet==`number`?n.sheet:e.SheetNames.indexOf(n.sheet),!e.SheetNames[i]))throw Error(`Sheet not found: `+n.sheet+` : `+typeof n.sheet);switch(n.bookType||`xlsb`){case`xml`:case`xlml`:return $y(Y_(e,n),n);case`slk`:case`sylk`:return $y(bl.from_sheet(e.Sheets[e.SheetNames[i]],n),n);case`htm`:case`html`:return $y(Nv(e.Sheets[e.SheetNames[i]],n),n);case`txt`:return eb(ub(e.Sheets[e.SheetNames[i]],n),n);case`csv`:return $y(lb(e.Sheets[e.SheetNames[i]],n),n,`﻿`);case`dif`:return $y(xl.from_sheet(e.Sheets[e.SheetNames[i]],n),n);case`dbf`:return tb(yl.from_sheet(e.Sheets[e.SheetNames[i]],n),n);case`prn`:return $y(Cl.from_sheet(e.Sheets[e.SheetNames[i]],n),n);case`rtf`:return $y(pu.from_sheet(e.Sheets[e.SheetNames[i]],n),n);case`eth`:return $y(Sl.from_sheet(e.Sheets[e.SheetNames[i]],n),n);case`fods`:return $y(Kv(e,n),n);case`wk1`:return tb(Tl.sheet_to_wk1(e.Sheets[e.SheetNames[i]],n),n);case`wk3`:return tb(Tl.book_to_wk3(e,n),n);case`biff2`:n.biff||=2;case`biff3`:n.biff||=3;case`biff4`:return n.biff||=4,tb(Ev(e,n),n);case`biff5`:n.biff||=5;case`biff8`:case`xla`:case`xls`:return n.biff||=8,Qy(e,n);case`xlsx`:case`xlsm`:case`xlam`:case`xlsb`:case`numbers`:case`ods`:return Xy(e,n);default:throw Error(`Unrecognized bookType |`+n.bookType+`|`)}}function rb(e){if(!e.bookType){var t={xls:`biff8`,htm:`html`,slk:`sylk`,socialcalc:`eth`,Sh33tJS:`WTF`},n=e.file.slice(e.file.lastIndexOf(`.`)).toLowerCase();n.match(/^\.[a-z]+$/)&&(e.bookType=n.slice(1)),e.bookType=t[e.bookType]||e.bookType}}function ib(e,t,n){var r=n||{};return r.type=`file`,r.file=t,rb(r),nb(e,r)}function ab(e,t,n,r,i,a,o,s){var c=wi(n),l=s.defval,u=s.raw||!Object.prototype.hasOwnProperty.call(s,`raw`),d=!0,f=i===1?[]:{};if(i!==1)if(Object.defineProperty)try{Object.defineProperty(f,`__rowNum__`,{value:n,enumerable:!1})}catch{f.__rowNum__=n}else f.__rowNum__=n;if(!o||e[n])for(var p=t.s.c;p<=t.e.c;++p){var m=o?e[n][p]:e[r[p]+c];if(m===void 0||m.t===void 0){if(l===void 0)continue;a[p]!=null&&(f[a[p]]=l);continue}var h=m.v;switch(m.t){case`z`:if(h==null)break;continue;case`e`:h=h==0?null:void 0;break;case`s`:case`d`:case`b`:case`n`:break;default:throw Error(`unrecognized type `+m.t)}if(a[p]!=null){if(h==null)if(m.t==`e`&&h===null)f[a[p]]=null;else if(l!==void 0)f[a[p]]=l;else if(u&&h===null)f[a[p]]=null;else continue;else f[a[p]]=u&&(m.t!==`n`||m.t===`n`&&s.rawNumbers!==!1)?h:Li(m,h,s);h!=null&&(d=!1)}}return{row:f,isempty:d}}function ob(e,t){if(e==null||e[`!ref`]==null)return[];var n={t:`n`,v:0},r=0,i=1,a=[],o=0,s=``,c={s:{r:0,c:0},e:{r:0,c:0}},l=t||{},u=l.range==null?e[`!ref`]:l.range;switch(l.header===1?r=1:l.header===`A`?r=2:Array.isArray(l.header)?r=3:l.header??(r=0),typeof u){case`string`:c=Fi(u);break;case`number`:c=Fi(e[`!ref`]),c.s.r=u;break;default:c=u}r>0&&(i=0);var d=wi(c.s.r),f=[],p=[],m=0,h=0,g=Array.isArray(e),_=c.s.r,v=0,y={};g&&!e[_]&&(e[_]=[]);var b=l.skipHidden&&e[`!cols`]||[],x=l.skipHidden&&e[`!rows`]||[];for(v=c.s.c;v<=c.e.c;++v)if(!(b[v]||{}).hidden)switch(f[v]=Oi(v),n=g?e[_][v]:e[f[v]+d],r){case 1:a[v]=v-c.s.c;break;case 2:a[v]=f[v];break;case 3:a[v]=l.header[v-c.s.c];break;default:if(n??={w:`__EMPTY`,t:`s`},s=o=Li(n,null,l),h=y[o]||0,!h)y[o]=1;else{do s=o+`_`+ h++;while(y[s]);y[o]=h,y[s]=1}a[v]=s}for(_=c.s.r+i;_<=c.e.r;++_)if(!(x[_]||{}).hidden){var S=ab(e,c,_,f,r,a,g,l);(S.isempty===!1||(r===1?l.blankrows!==!1:l.blankrows))&&(p[m++]=S.row)}return p.length=m,p}var sb=/"/g;function cb(e,t,n,r,i,a,o,s){for(var c=!0,l=[],u=``,d=wi(n),f=t.s.c;f<=t.e.c;++f)if(r[f]){var p=s.dense?(e[n]||[])[f]:e[r[f]+d];if(p==null)u=``;else if(p.v!=null){c=!1,u=``+(s.rawNumbers&&p.t==`n`?p.v:Li(p,null,s));for(var m=0,h=0;m!==u.length;++m)if((h=u.charCodeAt(m))===i||h===a||h===34||s.forceQuotes){u=`"`+u.replace(sb,`""`)+`"`;break}u==`ID`&&(u=`"ID"`)}else p.f!=null&&!p.F?(c=!1,u=`=`+p.f,u.indexOf(`,`)>=0&&(u=`"`+u.replace(sb,`""`)+`"`)):u=``;l.push(u)}return s.blankrows===!1&&c?null:l.join(o)}function lb(e,t){var n=[],r=t??{};if(e==null||e[`!ref`]==null)return``;var i=Fi(e[`!ref`]),a=r.FS===void 0?`,`:r.FS,o=a.charCodeAt(0),s=r.RS===void 0?`
`:r.RS,c=s.charCodeAt(0),l=RegExp((a==`|`?`\\|`:a)+`+$`),u=``,d=[];r.dense=Array.isArray(e);for(var f=r.skipHidden&&e[`!cols`]||[],p=r.skipHidden&&e[`!rows`]||[],m=i.s.c;m<=i.e.c;++m)(f[m]||{}).hidden||(d[m]=Oi(m));for(var h=0,g=i.s.r;g<=i.e.r;++g)(p[g]||{}).hidden||(u=cb(e,i,g,d,o,c,a,r),u!=null&&(r.strip&&(u=u.replace(l,``)),(u||r.blankrows!==!1)&&n.push((h++?s:``)+u)));return delete r.dense,n.join(``)}function ub(e,t){t||={},t.FS=`	`,t.RS=`
`;var n=lb(e,t);return De===void 0||t.type==`string`?n:`ÿþ`+De.utils.encode(1200,n,`str`)}function db(e){var t=``,n,r=``;if(e==null||e[`!ref`]==null)return[];var i=Fi(e[`!ref`]),a=``,o=[],s,c=[],l=Array.isArray(e);for(s=i.s.c;s<=i.e.c;++s)o[s]=Oi(s);for(var u=i.s.r;u<=i.e.r;++u)for(a=wi(u),s=i.s.c;s<=i.e.c;++s)if(t=o[s]+a,n=l?(e[u]||[])[s]:e[t],r=``,n!==void 0){if(n.F!=null){if(t=n.F,!n.f)continue;r=n.f,t.indexOf(`:`)==-1&&(t=t+`:`+t)}if(n.f!=null)r=n.f;else if(n.t==`z`)continue;else if(n.t==`n`&&n.v!=null)r=``+n.v;else if(n.t==`b`)r=n.v?`TRUE`:`FALSE`;else if(n.w!==void 0)r=`'`+n.w;else if(n.v===void 0)continue;else r=n.t==`s`?`'`+n.v:``+n.v;c[c.length]=t+`=`+r}return c}function fb(e,t,n){var r=n||{},i=+!r.skipHeader,a=e||{},o=0,s=0;if(a&&r.origin!=null)if(typeof r.origin==`number`)o=r.origin;else{var c=typeof r.origin==`string`?Mi(r.origin):r.origin;o=c.r,s=c.c}var l,u={s:{c:0,r:0},e:{c:s,r:o+t.length-1+i}};if(a[`!ref`]){var d=Fi(a[`!ref`]);u.e.c=Math.max(u.e.c,d.e.c),u.e.r=Math.max(u.e.r,d.e.r),o==-1&&(o=d.e.r+1,u.e.r=o+t.length-1+i)}else o==-1&&(o=0,u.e.r=t.length-1+i);var f=r.header||[],p=0;t.forEach(function(e,t){ln(e).forEach(function(n){(p=f.indexOf(n))==-1&&(f[p=f.length]=n);var c=e[n],u=`z`,d=``,m=J({c:s+p,r:o+t+i});l=mb(a,m),c&&typeof c==`object`&&!(c instanceof Date)?a[m]=c:(typeof c==`number`?u=`n`:typeof c==`boolean`?u=`b`:typeof c==`string`?u=`s`:c instanceof Date?(u=`d`,r.cellDates||(u=`n`,c=hn(c)),d=r.dateNF||H[14]):c===null&&r.nullError&&(u=`e`,c=0),l?(l.t=u,l.v=c,delete l.w,delete l.R,d&&(l.z=d)):a[m]=l={t:u,v:c},d&&(l.z=d))})}),u.e.c=Math.max(u.e.c,s+f.length-1);var m=wi(o);if(i)for(p=0;p<f.length;++p)a[Oi(p+s)+m]={t:`s`,v:f[p]};return a[`!ref`]=Pi(u),a}function pb(e,t){return fb(null,e,t)}function mb(e,t,n){if(typeof t==`string`){if(Array.isArray(e)){var r=Mi(t);return e[r.r]||(e[r.r]=[]),e[r.r][r.c]||(e[r.r][r.c]={t:`z`})}return e[t]||(e[t]={t:`z`})}return typeof t==`number`?mb(e,J({r:t,c:n||0})):mb(e,J(t))}function hb(e,t){if(typeof t==`number`){if(t>=0&&e.SheetNames.length>t)return t;throw Error(`Cannot find sheet # `+t)}else if(typeof t==`string`){var n=e.SheetNames.indexOf(t);if(n>-1)return n;throw Error(`Cannot find sheet name |`+t+`|`)}else throw Error(`Cannot find sheet |`+t+`|`)}function gb(){return{SheetNames:[],Sheets:{}}}function _b(e,t,n,r){var i=1;if(!n)for(;i<=65535&&e.SheetNames.indexOf(n=`Sheet`+i)!=-1;++i,n=void 0);if(!n||e.SheetNames.length>=65535)throw Error(`Too many worksheets`);if(r&&e.SheetNames.indexOf(n)>=0){var a=n.match(/(^.*?)(\d+)$/);i=a&&+a[2]||0;var o=a&&a[1]||n;for(++i;i<=65535&&e.SheetNames.indexOf(n=o+i)!=-1;++i);}if(Hg(n),e.SheetNames.indexOf(n)>=0)throw Error(`Worksheet with name |`+n+`| already exists!`);return e.SheetNames.push(n),e.Sheets[n]=t,n}function vb(e,t,n){e.Workbook||={},e.Workbook.Sheets||(e.Workbook.Sheets=[]);var r=hb(e,t);switch(e.Workbook.Sheets[r]||(e.Workbook.Sheets[r]={}),n){case 0:case 1:case 2:break;default:throw Error(`Bad sheet visibility setting `+n)}e.Workbook.Sheets[r].Hidden=n}function yb(e,t){return e.z=t,e}function bb(e,t,n){return t?(e.l={Target:t},n&&(e.l.Tooltip=n)):delete e.l,e}function xb(e,t,n){return bb(e,`#`+t,n)}function Sb(e,t,n){e.c||=[],e.c.push({t,a:n||`SheetJS`})}function Cb(e,t,n,r){for(var i=typeof t==`string`?Fi(t):t,a=typeof t==`string`?t:Pi(t),o=i.s.r;o<=i.e.r;++o)for(var s=i.s.c;s<=i.e.c;++s){var c=mb(e,o,s);c.t=`n`,c.F=a,delete c.v,o==i.s.r&&s==i.s.c&&(c.f=n,r&&(c.D=!0))}return e}var wb={encode_col:Oi,encode_row:wi,encode_cell:J,encode_range:Pi,decode_col:Di,decode_row:Ci,split_cell:ji,decode_cell:Mi,decode_range:Ni,format_cell:Li,sheet_add_aoa:zi,sheet_add_json:fb,sheet_add_dom:Pv,aoa_to_sheet:Bi,json_to_sheet:pb,table_to_sheet:Fv,table_to_book:Iv,sheet_to_csv:lb,sheet_to_txt:ub,sheet_to_json:ob,sheet_to_html:Nv,sheet_to_formulae:db,sheet_to_row_object_array:ob,sheet_get_cell:mb,book_new:gb,book_append_sheet:_b,book_set_sheet_visibility:vb,cell_set_number_format:yb,cell_set_hyperlink:bb,cell_set_internal_link:xb,cell_add_comment:Sb,sheet_set_array_formula:Cb,consts:{SHEET_VISIBLE:0,SHEET_HIDDEN:1,SHEET_VERY_HIDDEN:2}};fe.version;function Tb(e,t,n){e.innerHTML=`
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
    `;let r=document.getElementById(`beauty-staff-photo`),i=document.getElementById(`beauty-staff-photo-preview`);r.addEventListener(`change`,()=>{let e=r.files?.[0];if(!e){i.innerHTML=`사진 미리보기`;return}if(!e.type.startsWith(`image/`)){alert(`이미지 파일만 선택할 수 있습니다.`),r.value=``,i.innerHTML=`사진 미리보기`;return}i.innerHTML=`
        <img
          src="${URL.createObjectURL(e)}"
          alt="직원 사진 미리보기"
          style="
            width:100%;
            height:100%;
            object-fit:cover;
          "
        />
      `}),document.querySelector(`#beauty-staff-create`)?.addEventListener(`click`,async()=>{let e=document.getElementById(`beauty-staff-name`).value.trim(),i=document.getElementById(`beauty-staff-position`).value,a=r.files?.[0];if(!e){alert(`직원명을 입력해주세요.`);return}if(!a){alert(`직원 사진을 선택해주세요.`);return}let o=document.getElementById(`beauty-staff-create`);o.disabled=!0,o.textContent=`등록 중...`;let s=a.name.split(`.`).pop()?.toLowerCase()||`jpg`,c=n+`/`+Date.now()+`-`+crypto.randomUUID()+`.`+s,{error:l}=await t.storage.from(`beauty-staff`).upload(c,a,{cacheControl:`3600`,upsert:!1});if(l){alert(`직원 사진 업로드 실패: `+l.message),o.disabled=!1,o.textContent=`직원 등록`;return}let{data:u}=t.storage.from(`beauty-staff`).getPublicUrl(c),d=u.publicUrl,{error:f}=await t.from(`beauty_staff`).insert({merchant_id:n,staff_name:e,position:i,photo_url:d,phone:``,work_start:`10:00`,work_end:`19:00`,break_start:null,break_end:null,off_days:[],status:`근무중`});if(f){await t.storage.from(`beauty-staff`).remove([c]),alert(`직원 등록 실패: `+f.message),o.disabled=!1,o.textContent=`직원 등록`;return}alert(`직원이 등록되었습니다.`),location.reload()})}function Eb(e,t){let n=t||[],r=n.filter(e=>(e.status||`근무중`)===`근무중`).length;e.innerHTML=`
      <div class="product-list-card">
        <h2>등록된 직원</h2>
  
        <div class="product-summary-row">
          <span>총 직원 : ${n.length}명</span>
          <span>근무중 : ${r}명</span>
          <span>
            근무중지 :
            ${n.length-r}명
          </span>
        </div>
  
        <div id="beauty-staff-card-list"></div>
      </div>
    `;let i=e.querySelector(`#beauty-staff-card-list`);if(i){if(n.length===0){i.innerHTML=`
        <div
          style="
            padding:60px 20px;
            text-align:center;
            color:#64748b;
          "
        >
          등록된 직원이 없습니다.
        </div>
      `;return}i.innerHTML=n.map(e=>{let t=e.staff_name||`이름 없음`,n=e.position||`직급 없음`,r=e.photo_url||``,i=e.status||`근무중`,a=i===`근무중`?`product-on`:`product-off`;return`
            <div
              class="product-item-card"
              style="
                display:flex;
                align-items:center;
                gap:20px;
              "
            >
              ${r?`
                <img
                  src="${r}"
                  alt="${t}"
                  style="
                    width:120px;
                    height:120px;
                    border-radius:16px;
                    object-fit:cover;
                    flex-shrink:0;
                  "
                />
              `:`
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
              `}
  
              <div class="product-info">
                <h3 style="margin:0 0 8px;">
                  ${t}
                </h3>
  
                <p style="margin:0 0 12px;">
                  ${n}
                </p>
  
                <span class="${a}">
  ${i}
</span>
</div>

<button
  type="button"
  class="beauty-staff-schedule-button"
  data-staff-id="${e.id}"
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
          `}).join(``),i.querySelectorAll(`.beauty-staff-schedule-button`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.staffId;t&&(location.href=`/merchant-beauty-schedule?staff_id=`+encodeURIComponent(t))})})}}async function Db(e,t){let n=Number(sessionStorage.getItem(`login_merchant_id`)),r=sessionStorage.getItem(`login_merchant_name`)||``;if(!n){alert(`로그인이 필요합니다.`),location.href=`/merchant-login`;return}let{data:i,error:a}=await t.from(`beauty_staff`).select(`*`).eq(`merchant_id`,n).order(`id`,{ascending:!1}),o=new Date,s=Number(sessionStorage.getItem(`beauty_staff_week_offset`)||`0`),c=new Date(o),l=o.getDay(),u=l===0?-6:1-l;c.setDate(o.getDate()+u+s*7),c.setHours(0,0,0,0);let d=Array.from({length:7},(e,t)=>{let n=new Date(c);return n.setDate(c.getDate()+t),{dateValue:n.getFullYear()+`-`+String(n.getMonth()+1).padStart(2,`0`)+`-`+String(n.getDate()).padStart(2,`0`),dayLabel:[`월`,`화`,`수`,`목`,`금`,`토`,`일`][t],dateLabel:String(n.getMonth()+1)+`/`+String(n.getDate())}}),f=d[0].dateLabel+` ~ `+d[6].dateLabel;a&&alert(`직원 목록 조회 실패: `+a.message);let p=d[0].dateValue,m=d[6].dateValue,{data:h,error:g}=await t.from(`beauty_staff_schedule`).select(`
      staff_id,
      schedule_date,
      schedule_time,
      status,
      order_id
    `).eq(`merchant_id`,n).gte(`schedule_date`,p).lte(`schedule_date`,m);g&&alert(`주간 스케줄 조회 실패: `+g.message);let _=[];for(let e=0;e<1440;e+=30){let t=String(Math.floor(e/60)).padStart(2,`0`),n=String(e%60).padStart(2,`0`);_.push(`${t}:${n}`)}let v=(e,t)=>_.every(n=>{let r=(h||[]).find(r=>Number(r.staff_id)===e&&String(r.schedule_date)===t&&String(r.schedule_time||``).slice(0,5)===n);return r?.order_id||r?.status===`예약완료`?!0:r?.status===`예약불가`});e.innerHTML=`
      <div class="pg-admin-page">
  
        <div class="merchant-pick-header">
          <h1>직원관리</h1>
  
          <div class="merchant-user-box">
            <strong>${r}님</strong>
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
  </div>

  <div
    class="beauty-staff-week-navigation"
  >

    <button
      type="button"
      id="beauty-staff-prev-week"
    >
      ◀ 이전주
    </button>

    <strong>
      ${f}
    </strong>

    <button
      type="button"
      id="beauty-staff-next-week"
    >
      다음주 ▶
    </button>

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


              ${d.map(e=>`
                  <div
                    class="beauty-staff-weekly-header"
                  >
                    <strong>
                      ${e.dayLabel}
                    </strong>

                    <span>
                      ${e.dateLabel}
                    </span>
                  </div>
                `).join(``)}


              ${(i||[]).map(e=>`

                  <div
                    class="beauty-staff-weekly-staff"
                  >
                    <strong>
                      ${e.staff_name||`이름 없음`}
                    </strong>

                    <span>
                      ${e.position||``}
                    </span>
                  </div>


                  ${d.map(t=>{let n=v(Number(e.id),t.dateValue);return`
                        <button
                          type="button"
                          class="
                            beauty-staff-weekly-work-button
                            ${n?`beauty-staff-weekly-off`:``}
                          "
                          data-staff-id="${e.id}"
                          data-date="${t.dateValue}"
                          data-current-status="${n?`OFF`:`WORK`}"
                        >
                          ${n?`OFF`:`근무`}
                        </button>
                      `}).join(``)}

                `).join(``)}

            </div>

          </div>


          ${(i||[]).length===0?`
                <div class="beauty-staff-weekly-empty">
                  등록된 직원이 없습니다.
                </div>
              `:``}

        </div>

      </div>

    </div>

  </div>

</div>
  
      </div>
    `;let y=document.getElementById(`beauty-staff-register-area`);y&&Tb(y,t,n);let b=document.getElementById(`beauty-staff-list-area`);b&&Eb(b,i||[]),document.querySelector(`#beauty-staff-prev-week`)?.addEventListener(`click`,()=>{sessionStorage.setItem(`beauty_staff_week_offset`,String(s-1)),location.reload()}),document.querySelector(`#beauty-staff-next-week`)?.addEventListener(`click`,()=>{sessionStorage.setItem(`beauty_staff_week_offset`,String(s+1)),location.reload()}),document.querySelectorAll(`.beauty-staff-weekly-work-button`).forEach(e=>{e.addEventListener(`click`,async()=>{let r=Number(e.dataset.staffId||0),i=e.dataset.date||``,a=e.dataset.currentStatus||`WORK`;if(!r||!i)return;if(e.disabled=!0,a===`OFF`){let{error:a}=await t.from(`beauty_staff_schedule`).delete().eq(`merchant_id`,n).eq(`staff_id`,r).eq(`schedule_date`,i).is(`order_id`,null);if(a){alert(`근무 전환 실패: `+a.message),e.disabled=!1;return}e.dataset.currentStatus=`WORK`,e.textContent=`근무`,e.classList.remove(`beauty-staff-weekly-off`),e.disabled=!1;return}let{data:o,error:s}=await t.from(`beauty_staff_schedule`).select(`
              schedule_time,
              status,
              order_id
            `).eq(`merchant_id`,n).eq(`staff_id`,r).eq(`schedule_date`,i);if(s){alert(`직원 스케줄 조회 실패: `+s.message),e.disabled=!1;return}let c=new Set;(o||[]).forEach(e=>{(e.order_id||e.status===`예약완료`)&&c.add(String(e.schedule_time||``).slice(0,5))});let l=_.filter(e=>!c.has(e)).map(e=>({merchant_id:n,staff_id:r,schedule_date:i,schedule_time:e,status:`예약불가`})),{error:u}=await t.from(`beauty_staff_schedule`).upsert(l,{onConflict:`staff_id,schedule_date,schedule_time`});if(u){alert(`OFF 설정 실패: `+u.message),e.disabled=!1;return}e.dataset.currentStatus=`OFF`,e.textContent=`OFF`,e.classList.add(`beauty-staff-weekly-off`),e.disabled=!1})}),document.querySelector(`#staff-go-admin`)?.addEventListener(`click`,()=>{location.href=`/merchant-admin`}),document.querySelector(`#staff-go-service`)?.addEventListener(`click`,()=>{location.href=`/merchant-product`}),document.querySelector(`#staff-go-staff`)?.addEventListener(`click`,()=>{location.href=`/merchant-staff`}),document.querySelector(`#staff-go-qr`)?.addEventListener(`click`,()=>{location.href=`/merchant-qr`}),document.querySelector(`#merchant-staff-logout`)?.addEventListener(`click`,()=>{sessionStorage.removeItem(`login_merchant_id`),sessionStorage.removeItem(`login_merchant_name`),sessionStorage.removeItem(`login_merchant_code`),sessionStorage.removeItem(`login_merchant_type`),location.href=`/merchant-login`})}var Ob;(function(e){e.Unimplemented=`UNIMPLEMENTED`,e.Unavailable=`UNAVAILABLE`})(Ob||={});var kb=class extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}},Ab=e=>e?.androidBridge?`android`:e?.webkit?.messageHandlers?.bridge?`ios`:`web`,jb=e=>{let t=e.CapacitorCustomPlatform||null,n=e.Capacitor||{},r=n.Plugins=n.Plugins||{},i=()=>t===null?Ab(e):t.name,a=()=>i()!==`web`,o=e=>!!(l.get(e)?.platforms.has(i())||s(e)),s=e=>n.PluginHeaders?.find(t=>t.name===e),c=t=>e.console.error(t),l=new Map;return n.convertFileSrc||=e=>e,n.getPlatform=i,n.handleError=c,n.isNativePlatform=a,n.isPluginAvailable=o,n.registerPlugin=(e,a={})=>{let o=l.get(e);if(o)return console.warn(`Capacitor plugin "${e}" already registered. Cannot register plugins twice.`),o.proxy;let c=i(),u=s(e),d,f=async()=>(!d&&c in a?d=d=typeof a[c]==`function`?await a[c]():a[c]:t!==null&&!d&&`web`in a&&(d=d=typeof a.web==`function`?await a.web():a.web),d),p=(t,r)=>{if(u){let i=u?.methods.find(e=>r===e.name);if(i)return i.rtype===`promise`?t=>n.nativePromise(e,r.toString(),t):(t,i)=>n.nativeCallback(e,r.toString(),t,i);if(t)return t[r]?.bind(t)}else if(t)return t[r]?.bind(t);else throw new kb(`"${e}" plugin is not implemented on ${c}`,Ob.Unimplemented)},m=t=>{let n,r=(...r)=>{let i=f().then(i=>{let a=p(i,t);if(a){let e=a(...r);return n=e?.remove,e}else throw new kb(`"${e}.${t}()" is not implemented on ${c}`,Ob.Unimplemented)});return t===`addListener`&&(i.remove=async()=>n()),i};return r.toString=()=>`${t.toString()}() { [capacitor code] }`,Object.defineProperty(r,`name`,{value:t,writable:!1,configurable:!1}),r},h=m(`addListener`),g=m(`removeListener`),_=(e,t)=>{let n=h({eventName:e},t),r=async()=>{g({eventName:e,callbackId:await n},t)},i=new Promise(e=>n.then(()=>e({remove:r})));return i.remove=async()=>{console.warn(`Using addListener() without 'await' is deprecated.`),await r()},i},v=new Proxy({},{get(e,t){switch(t){case`$$typeof`:return;case`toJSON`:return()=>({});case`addListener`:return u?_:h;case`removeListener`:return g;default:return m(t)}}});return r[e]=v,l.set(e,{name:e,proxy:v,platforms:new Set([...Object.keys(a),...u?[c]:[]])}),v},n.Exception=kb,n.DEBUG=!!n.DEBUG,n.isLoggingEnabled=!!n.isLoggingEnabled,n},Mb=(e=>e.Capacitor=jb(e))(typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}),Nb=Mb.registerPlugin,Pb=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);let r=this.windowListeners[e];return r&&!r.registered&&this.addWindowListener(r),n&&this.sendRetainedArgumentsForEvent(e),Promise.resolve({remove:async()=>this.removeListener(e,t)})}async removeAllListeners(){this.listeners={};for(let e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){let r=this.listeners[e];if(!r){if(n){let n=this.retainedEventArguments[e];n||=[],n.push(t),this.retainedEventArguments[e]=n}return}r.forEach(e=>e(t))}hasListeners(e){return!!this.listeners[e]?.length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:e=>{this.notifyListeners(t,e)}}}unimplemented(e=`not implemented`){return new Mb.Exception(e,Ob.Unimplemented)}unavailable(e=`not available`){return new Mb.Exception(e,Ob.Unavailable)}async removeListener(e,t){let n=this.listeners[e];if(!n)return;let r=n.indexOf(t);r!==-1&&this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){let t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(t=>{this.notifyListeners(e,t)}))}},Fb=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Ib=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),Lb=class extends Pb{async getCookies(){let e=document.cookie,t={};return e.split(`;`).forEach(e=>{if(e.length<=0)return;let[n,r]=e.replace(/=/,`CAP_COOKIE`).split(`CAP_COOKIE`);n=Ib(n).trim(),r=Ib(r).trim(),t[n]=r}),t}async setCookie(e){try{let t=Fb(e.key),n=Fb(e.value),r=e.expires?`; expires=${e.expires.replace(`expires=`,``)}`:``,i=(e.path||`/`).replace(`path=`,``),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:``;document.cookie=`${t}=${n||``}${r}; path=${i}; ${a};`}catch(e){return Promise.reject(e)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(e){return Promise.reject(e)}}async clearCookies(){try{let e=document.cookie.split(`;`)||[];for(let t of e)document.cookie=t.replace(/^ +/,``).replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}};Nb(`CapacitorCookies`,{web:()=>new Lb});var Rb=async e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>{let e=r.result;t(e.indexOf(`,`)>=0?e.split(`,`)[1]:e)},r.onerror=e=>n(e),r.readAsDataURL(e)}),zb=(e={})=>{let t=Object.keys(e);return Object.keys(e).map(e=>e.toLocaleLowerCase()).reduce((n,r,i)=>(n[r]=e[t[i]],n),{})},Bb=(e,t=!0)=>e?Object.entries(e).reduce((e,n)=>{let[r,i]=n,a,o;return Array.isArray(i)?(o=``,i.forEach(e=>{a=t?encodeURIComponent(e):e,o+=`${r}=${a}&`}),o.slice(0,-1)):(a=t?encodeURIComponent(i):i,o=`${r}=${a}`),`${e}&${o}`},``).substr(1):null,Vb=(e,t={})=>{let n=Object.assign({method:e.method||`GET`,headers:e.headers},t),r=zb(e.headers)[`content-type`]||``;if(typeof e.data==`string`)n.body=e.data;else if(r.includes(`application/x-www-form-urlencoded`)){let t=new URLSearchParams;for(let[n,r]of Object.entries(e.data||{}))t.set(n,r);n.body=t.toString()}else if(r.includes(`multipart/form-data`)||e.data instanceof FormData){let t=new FormData;if(e.data instanceof FormData)e.data.forEach((e,n)=>{t.append(n,e)});else for(let n of Object.keys(e.data))t.append(n,e.data[n]);n.body=t;let r=new Headers(n.headers);r.delete(`content-type`),n.headers=r}else (r.includes(`application/json`)||typeof e.data==`object`)&&(n.body=JSON.stringify(e.data));return n},Hb=class extends Pb{async request(e){let t=Vb(e,e.webFetchExtra),n=Bb(e.params,e.shouldEncodeUrlParams),r=n?`${e.url}?${n}`:e.url,i=await fetch(r,t),a=i.headers.get(`content-type`)||``,{responseType:o=`text`}=i.ok?e:{};a.includes(`application/json`)&&(o=`json`);let s,c;switch(o){case`arraybuffer`:case`blob`:c=await i.blob(),s=await Rb(c);break;case`json`:s=await i.json();break;default:s=await i.text()}let l={};return i.headers.forEach((e,t)=>{l[t]=e}),{data:s,headers:l,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:`GET`}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:`POST`}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:`PUT`}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:`PATCH`}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:`DELETE`}))}};Nb(`CapacitorHttp`,{web:()=>new Hb});var Ub;(function(e){e.Dark=`DARK`,e.Light=`LIGHT`,e.Default=`DEFAULT`})(Ub||={});var Wb;(function(e){e.StatusBar=`StatusBar`,e.NavigationBar=`NavigationBar`})(Wb||={});var Gb=class extends Pb{async setStyle(){this.unavailable(`not available for web`)}async setAnimation(){this.unavailable(`not available for web`)}async show(){this.unavailable(`not available for web`)}async hide(){this.unavailable(`not available for web`)}};Nb(`SystemBars`,{web:()=>new Gb});var Kb=`live_ck_GjLJoQ1aVZ2QXB2vMWyPVw6KYe2R`,qb=`1234`,Jb=`5678`,X=s(`https://rnmptlxdeihvfwegoqnf.supabase.co`,`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJubXB0bHhkZWlodmZ3ZWdvcW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MzcwMDMsImV4cCI6MjA5NDIxMzAwM30.5SeOiuZgFmU7RUu5kzLpLBUwC91SYI3WxqRFoafMrG8`),Z=document.querySelector(`#app`),Q=window.location.pathname;Mb.isNativePlatform()&&(Q===`/`||Q===`/index.html`)&&location.replace(`/merchant-app`);var Yb=[`login_merchant_id`,`login_merchant_code`,`login_merchant_name`,`login_merchant_type`];sessionStorage.getItem(`login_merchant_id`)||localStorage.getItem(`login_merchant_id`)&&Yb.forEach(e=>{let t=localStorage.getItem(e);t!==null&&sessionStorage.setItem(e,t)});var Xb=sessionStorage.getItem(`login_merchant_type`)||``;Xb===`호텔`?document.body.classList.add(`hotel-mode`):document.body.classList.remove(`hotel-mode`),Xb===`뷰티`?document.body.classList.add(`beauty-mode`):document.body.classList.remove(`beauty-mode`),Q===`/merchant-login`&&sessionStorage.getItem(`login_merchant_id`)&&location.replace(`/merchant-admin`),document.addEventListener(`click`,e=>{let t=e.target?.closest(`[id$="-logout"]`);if(!t||!t.id.startsWith(`merchant-`))return;let n=sessionStorage.getItem(`login_merchant_id`);n&&(sessionStorage.removeItem(`last_checked_order_id_`+n),sessionStorage.removeItem(`order_voice_initialized_`+n)),Yb.forEach(e=>{sessionStorage.removeItem(e),localStorage.removeItem(e)})},!0);function Zb(e){return`
    <div class="member-main-tabs">
      <button id="merchant-home-tab" class="${e===`home`?`active`:``}">관리홈</button>
      <button id="merchant-member-tab" class="${e===`members`?`active`:``}">회원관리</button>
      <button id="merchant-billing-tab" class="${e===`billings`?`active`:``}">청구관리</button>
      <button id="merchant-batch-tab" class="${e===`batch`?`active`:``}">수기결제</button>
      <button id="merchant-payment-list-tab" class="${e===`payments`?`active`:``}">결제내역</button>
    </div>
  `}function Qb(){document.querySelector(`#merchant-home-tab`)?.addEventListener(`click`,()=>{location.href=`/merchant-admin`}),document.querySelector(`#merchant-member-tab`)?.addEventListener(`click`,()=>{location.href=`/merchant-members`}),document.querySelector(`#merchant-billing-tab`)?.addEventListener(`click`,()=>{location.href=`/merchant-billings`}),document.querySelector(`#merchant-batch-tab`)?.addEventListener(`click`,()=>{location.href=`/merchant-batch`}),document.querySelector(`#merchant-payment-list-tab`)?.addEventListener(`click`,()=>{location.href=`/merchant-academy-payments`}),document.querySelector(`#batch-dashboard-search-button`)?.addEventListener(`click`,()=>{let e=document.querySelector(`#batch-dashboard-start-date`)?.value||``,t=document.querySelector(`#batch-dashboard-end-date`)?.value||``;if(!e||!t){alert(`시작일과 종료일을 선택해주세요.`);return}if(e>t){alert(`시작일이 종료일보다 늦을 수 없습니다.`);return}let n=new URLSearchParams(location.search);n.set(`member_start_date`,e),n.set(`member_end_date`,t),location.href=`/merchant-admin?`+n.toString()})}function $b(e,t){let n=Number(sessionStorage.getItem(t+`_page_size`)||`10`),r=Number(sessionStorage.getItem(t+`_page`)||`1`),i=Math.max(1,Math.ceil(e/n));r>i&&(r=i),r<1&&(r=1);let a=(r-1)*n;return{pageSize:n,currentPage:r,totalPages:i,startIndex:a}}function ex(e,t,n,r){return`
    <div class="academy-pagination-toolbar">

      <select id="${e}-page-size">

        <option
          value="10"
          ${t===10?`selected`:``}
        >
          10개씩 보기
        </option>

        <option
          value="20"
          ${t===20?`selected`:``}
        >
          20개씩 보기
        </option>

        <option
          value="30"
          ${t===30?`selected`:``}
        >
          30개씩 보기
        </option>

        <option
          value="50"
          ${t===50?`selected`:``}
        >
          50개씩 보기
        </option>

        <option
          value="100"
          ${t===100?`selected`:``}
        >
          100개씩 보기
        </option>

      </select>


      <div class="academy-pagination-buttons">

        <button
          id="${e}-prev"
          ${n<=1?`disabled`:``}
        >
          이전
        </button>

        <strong>
          ${n} / ${r}
        </strong>

        <button
          id="${e}-next"
          ${n>=r?`disabled`:``}
        >
          다음
        </button>

      </div>

    </div>
  `}function tx(e,t,n,r){document.querySelector(`#`+e+`-page-size`)?.addEventListener(`change`,e=>{let n=Number(e.target.value);sessionStorage.setItem(t+`_page_size`,String(n)),sessionStorage.setItem(t+`_page`,`1`),location.reload()}),document.querySelector(`#`+e+`-prev`)?.addEventListener(`click`,()=>{n<=1||(sessionStorage.setItem(t+`_page`,String(n-1)),location.reload())}),document.querySelector(`#`+e+`-next`)?.addEventListener(`click`,()=>{n>=r||(sessionStorage.setItem(t+`_page`,String(n+1)),location.reload())})}var nx=Q.includes(`funeral`),rx=new URLSearchParams(window.location.search).get(`id`),{data:ix}=await X.from(`menus`).select(`*`).eq(`event_id`,Number(rx)),ax=nx?`故 홍길동`:`김철수 ♥ 박영희`,ox=nx?`부의금 보내기`:`축의금 보내기`,sx=nx?`추모 메시지`:`축하 메시지`;if(rx){let{data:e}=await X.from(`events`).select(`*`).eq(`id`,rx).single();e&&(ax=e.receiver_name,ox=e.payment_title,sx=e.event_type===`funeral`?`추모 메시지`:`축하 메시지`)}if(Q===`/customer`)Z.innerHTML=`
    <div class="page">
      <div class="payment-card">
        <h1>입금 현황 확인</h1>

        <div class="input-group">
          <label>이름</label>
          <input id="customer-name" type="text" placeholder="이름 입력">
        </div>

        <div class="input-group">
          <label>생년월일</label>
          <input id="customer-birth" type="text" placeholder="예: 1990-01-01">
        </div>

        <div class="input-group">
        <label>고객 확인 비밀번호</label>
<input id="customer-code-login" type="text" placeholder="비밀번호 입력">  
        </div>

        <button id="customer-login-button">확인하기</button>

        <div id="customer-result"></div>
      </div>
    </div>
  `,document.querySelector(`#customer-login-button`).addEventListener(`click`,async()=>{let e=document.querySelector(`#customer-name`).value,t=document.querySelector(`#customer-birth`).value,n=document.querySelector(`#customer-code-login`).value;if(!e||!t||!n){alert(`이름, 생년월일, 행사 코드를 입력해주세요`);return}let{data:r,error:i}=await X.from(`events`).select(`*`).eq(`receiver_name`,e).eq(`birth_date`,t).eq(`customer_code`,n).single(),a=document.querySelector(`#customer-result`);if(i||!r){a.innerHTML=`<p>일치하는 행사를 찾을 수 없습니다.</p>`;return}let{data:o,error:s}=await X.from(`payments`).select(`*`).eq(`event_id`,r.id);if(s){a.innerHTML=`<p>입금 내역을 불러오지 못했습니다.</p>`;return}let c=(o||[]).reduce((e,t)=>e+Number(t.amount),0),l=c-Math.floor(c*.02);a.innerHTML=`
        <div class="create-result-card">
          <h2>${r.receiver_name}</h2>
          <p><strong>행사 종류:</strong> ${r.event_type===`funeral`?`장례식`:`결혼식`}</p>
          <p><strong>총 입금액:</strong> ${c.toLocaleString()}원</p>
          <p><strong>결제 건수:</strong> ${(o||[]).length}건</p>
<p><strong>예상 정산금액:</strong> ${l.toLocaleString()}원</p>
<p><strong>정산 상태:</strong> ${r.settlement_status||`정산 대기`}</p>

<button id="message-view-button" class="message-view-button">
  메시지 확인
</button>

<button id="ledger-download-button" class="message-view-button">
  장부 다운로드
</button>

<div id="message-popup-content" style="display:none;">
  <div class="admin-table-wrap">
    <table class="admin-table">
    <thead>
      <tr>
        <th>보낸 사람</th>
        <th>금액</th>
        <th>메시지</th>
        <th>결제시간</th>
      </tr>
    </thead>

    <tbody>
      ${(o||[]).map(e=>`
        <tr>
          <td>${e.sender_name||`익명`}</td>
          <td>${Number(e.amount).toLocaleString()}원</td>
          <td>${e.message||`-`}</td>
          <td>${new Date(e.created_at).toLocaleString(`ko-KR`)}</td>
        </tr>
      `).join(``)}
    </tbody>
  </table>
</div>
</div>
`,document.querySelector(`#message-view-button`).addEventListener(`click`,()=>{document.querySelector(`#ledger-download-button`).addEventListener(`click`,()=>{let e=[[`보낸 사람`,`금액`,`메시지`,`결제시간`],...(o||[]).map(e=>[e.sender_name||`익명`,Number(e.amount).toLocaleString()+`원`,e.message||`-`,new Date(e.created_at).toLocaleString(`ko-KR`)])].map(e=>e.map(e=>`"${e}"`).join(`,`)).join(`
`),t=new Blob([`﻿`+e],{type:`text/csv;charset=utf-8;`}),n=document.createElement(`a`);n.href=URL.createObjectURL(t),n.download=`${r.receiver_name}-입금장부.csv`,n.click()});let e=document.querySelector(`#message-popup-content`).innerHTML,t=window.open(``,`_blank`,`width=900,height=700`);if(!t){alert(`팝업이 차단되었습니다.`);return}t.document.write(`
      <html>
        <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>payment-app</title>
</head>
          <title>메시지 확인</title>

          <style>
            body {
              font-family: sans-serif;
              padding: 30px;
              background: #f9fafb;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              background: white;
            }

            th, td {
              border: 1px solid #ddd;
              padding: 12px;
              text-align: center;
            }

            th {
              background: #f3f4f6;
            }
          </style>
        </head>

<body>
  <h1>메시지 확인</h1>

  <input
    id="ledger-search"
    placeholder="보낸 사람 검색"
    style="width:100%;padding:14px;margin-bottom:20px;border:1px solid #ddd;border-radius:10px;"
  >

  ${e}

  <script>
    const searchInput = document.getElementById('ledger-search')

    searchInput.addEventListener('input', () => {
      const keyword = searchInput.value.toLowerCase()
      const rows = document.querySelectorAll('tbody tr')

      rows.forEach((row) => {
        const name = row.children[0].textContent.toLowerCase()
        row.style.display = name.includes(keyword) ? '' : 'none'
      })
    })
  <\/script>
  
</body>
</html>
`),t.document.close()})});else if(Q===`/pay`){let e=new URLSearchParams(window.location.search),t=Number(e.get(`merchantId`)||0),n=e.get(`merchantName`)||``,r=e.get(`productName`)||``,i=Number(e.get(`amount`)||0);if(!t||!r||!i)Z.innerHTML=`
      <div class="page">

        <div class="payment-card">

          <h1>
            결제정보를 확인할 수 없습니다.
          </h1>

        </div>

      </div>
    `;else{let{data:e,error:a}=await X.from(`merchants`).select(`
          merchant_name,
          online_pg_company_1,
          toss_client_key,
          korpay_pg_mid,
          korpay_pg_mkey
        `).eq(`id`,t).single();if(a||!e)Z.innerHTML=`
        <div class="page">

          <div class="payment-card">

            <h1>
              가맹점 정보를 찾을 수 없습니다.
            </h1>

          </div>

        </div>
      `;else{let a=e.merchant_name||n||`가맹점`,o=String(e.online_pg_company_1||``).trim();Z.innerHTML=`
        <div class="page">

          <div class="payment-card">

            <h1>
              결제하기
            </h1>

            <p>
              <strong>
                가맹점:
              </strong>

              ${a}
            </p>

            <p>
              <strong>
                상품명:
              </strong>

              ${r}
            </p>

            <p>
              <strong>
                결제금액:
              </strong>

              ${i.toLocaleString()}원
            </p>


            <button
              id="pay-button"
              type="button"
            >
              결제하기
            </button>

          </div>

        </div>
      `,document.querySelector(`#pay-button`)?.addEventListener(`click`,async()=>{if(sessionStorage.setItem(`merchantId`,String(t)),sessionStorage.setItem(`merchantName`,a),sessionStorage.setItem(`message`,`SMS결제 / `+r),sessionStorage.setItem(`selected_pg_company`,o),o===`토스페이먼츠`){let n=String(e.toss_client_key||Kb).trim();if(!n){alert(`토스 Client Key가 등록되지 않았습니다.`);return}await(await c(n)).requestPayment(`카드`,{amount:i,orderId:(`SMS-TOSS-`+Date.now()).replace(/[^a-zA-Z0-9]/g,``),orderName:r,customerName:a,successUrl:window.location.origin+`/success?source=sms&pg=토스페이먼츠&merchantId=`+t+`&merchantName=`+encodeURIComponent(a),failUrl:window.location.origin+`/fail`});return}if(o===`코페이`){if(!e.korpay_pg_mid||!e.korpay_pg_mkey){alert(`코페이 PG MID 또는 MKEY가 등록되지 않았습니다.`);return}let n=cx(),o=(`SMS-KORPAY-`+Date.now()).replace(/[^a-zA-Z0-9]/g,``),s=await lx(String(e.korpay_pg_mid),n,i,String(e.korpay_pg_mkey)),c={merchantId:e.korpay_pg_mid,productName:r,orderNumber:o,amount:i,payMethod:`card`,returnUrl:window.location.origin+`/api/korpay-return`,ediDate:n,hashKey:s,customerName:a,reserved:String(t),language:`ko`},l=window.KorpaySdk;if(!l){alert(`Korpay SDK를 찾을 수 없습니다.`);return}l.paymentTimeout=3e4,l.payment(`https://staging-payments.korpay.com/v1`,c,{onStart:()=>{let e=document.querySelector(`#pay-button`);e&&(e.disabled=!0,e.innerText=`결제창 호출 중...`)},onError:e=>{alert(String(e));let t=document.querySelector(`#pay-button`);t&&(t.disabled=!1,t.innerText=`결제하기`)},onClose:()=>{let e=document.querySelector(`#pay-button`);e&&(e.disabled=!1,e.innerText=`결제하기`)}});return}alert(`온라인결제 1 PG사가 설정되지 않았습니다.`)})}}}else if(Q===`/academy-chrome`){let e=new URLSearchParams(window.location.search).get(`merchant_id`)||``;if(!e)Z.innerHTML=`
        <div class="page">
          <div class="payment-card">
            <h2>결제정보를 찾을 수 없습니다.</h2>
          </div>
        </div>
      `;else{let t=window.location.origin+`/academy-pay?merchant_id=`+encodeURIComponent(e);Z.innerHTML=`
        <div class="page">
          <div class="payment-card">
  
            <h1>안내</h1>
  
            <p style="
              text-align:center;
              line-height:1.7;
              margin:20px 0;
            ">
              안전한 결제를 위해<br />
              Chrome 브라우저로 연결합니다.
            </p>
  
            <a
  href="${`intent://`+t.replace(/^https?:\/\//,``)+`#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=`+encodeURIComponent(t)+`;end`}"
  id="academy-open-chrome"
  style="
    display:block;
    width:100%;
    box-sizing:border-box;
    padding:16px;
    text-align:center;
    text-decoration:none;
    background:#174981;
    color:white;
    border-radius:8px;
    font-weight:700;
  "
>
  크롬으로 연결
</a>
  
          </div>
        </div>
      `}}else if(Q===`/hotel-chrome`){let e=new URLSearchParams(window.location.search),t=e.get(`merchant_id`)||``,n=e.get(`room`)||``;if(!t||!n)Z.innerHTML=`
        <div class="page">
          <div class="payment-card">
  
            <h2>
              객실 결제정보를 찾을 수 없습니다.
            </h2>
  
          </div>
        </div>
      `;else{let e=window.location.origin+`/hotel?merchant_id=`+encodeURIComponent(t)+`&room=`+encodeURIComponent(n);Z.innerHTML=`
        <div class="hotel-chrome-page">
  
          <div class="hotel-chrome-card">
  
            <div class="hotel-chrome-brand">
              NXG HOTEL
            </div>
  
            <div class="hotel-chrome-room">
              ROOM ${n}
            </div>
  
            <h1>
              안내
            </h1>
  
            <p>
              안전한 결제를 위해<br>
              Chrome 브라우저로 연결합니다.
            </p>
  
            <div class="hotel-chrome-icon">
              <div>Chrome</div>
            </div>
  
            <a
              href="${`intent://`+e.replace(/^https?:\/\//,``)+`#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=`+encodeURIComponent(e)+`;end`}"
              class="hotel-chrome-button"
            >
              크롬으로 연결
            </a>
  
          </div>
  
        </div>
      `}}else if(Q===`/academy-pay`){let e=new URLSearchParams(window.location.search),t=Number(e.get(`merchant_id`)||0);if(!t)Z.innerHTML=`
        <div class="page">
          <div class="payment-card">
            <h2>결제정보를 찾을 수 없습니다.</h2>
          </div>
        </div>
      `;else{let{data:e,error:n}=await X.from(`merchants`).select(`id, merchant_name`).eq(`id`,t).single();n||!e?Z.innerHTML=`
          <div class="page">
            <div class="payment-card">
              <h2>가맹점 정보를 찾을 수 없습니다.</h2>
            </div>
          </div>
        `:(Z.innerHTML=`
          <div class="page">
            <div class="payment-card">
  
              <h1>
                ${e.merchant_name}
              </h1>
  
              <h2 style="margin-top:12px;">
                QR 결제
              </h2>
  
              <div class="input-group">
                <label>회원명</label>
  
                <input
                  id="academy-pay-name"
                  type="text"
                  placeholder="이름을 입력해주세요"
                />
              </div>
  
              <div class="input-group">
                <label>요청사항</label>
  
                <textarea
                  id="academy-pay-message"
                  placeholder="동·호수, 이용료, 요청사항 등을 입력해주세요"
                ></textarea>
              </div>
  
              <div class="input-group">
                <label>결제금액</label>
  
                <input
                  id="academy-pay-amount"
                  type="number"
                  min="1"
                  placeholder="결제금액 입력"
                />
              </div>
  
              <button id="academy-pay-submit">
                결제하기
              </button>
  
            </div>
          </div>
        `,document.querySelector(`#academy-pay-submit`)?.addEventListener(`click`,async()=>{let t=(document.querySelector(`#academy-pay-name`)?.value||``).trim(),n=(document.querySelector(`#academy-pay-message`)?.value||``).trim(),r=Number(document.querySelector(`#academy-pay-amount`)?.value||0);if(!t){alert(`회원명을 입력해주세요.`);return}if(!Number.isFinite(r)||r<=0){alert(`결제금액을 입력해주세요.`);return}sessionStorage.setItem(`merchantId`,String(e.id)),sessionStorage.setItem(`merchantName`,e.merchant_name||``),sessionStorage.setItem(`senderName`,t),sessionStorage.setItem(`message`,n||`아카데미 QR 직접결제`),sessionStorage.setItem(`selected_pg_company`,`토스페이먼츠`),await(await c(Kb)).requestPayment(`카드`,{amount:r,orderId:`ACADEMY-`+e.id+`-`+Date.now(),orderName:e.merchant_name+` QR결제`,customerName:t,successUrl:window.location.origin+`/success?source=academy&merchantId=`+e.id+`&merchantName=`+encodeURIComponent(e.merchant_name||``),failUrl:window.location.origin+`/fail`})}))}}else if(Q===`/payment-link-create`){let{data:e,error:t}=await X.from(`merchants`).select(`*`).order(`id`,{ascending:!0});t?Z.innerHTML=`<p>가맹점 목록을 불러오지 못했습니다.</p>`:(Z.innerHTML=`
      <div class="page">
        <div class="payment-card">
          <h1>결제링크 생성</h1>

          <div class="input-group">
            <label>가맹점 선택</label>
            <select id="link-merchant-select">
              ${(e||[]).map(e=>`
                <option
                  value="${e.id}"
                  data-name="${e.merchant_name}"
                >
                  ${e.merchant_id||`MER`+String(e.id).padStart(4,`0`)} / ${e.merchant_name}
                </option>
              `).join(``)}
            </select>
          </div>

          <div class="input-group">
            <label>상품명</label>
            <input id="link-product-name" type="text" placeholder="예: 테스트 상품">
          </div>

          <div class="input-group">
            <label>결제금액</label>
            <input id="link-amount" type="number" placeholder="예: 10000">
          </div>

          <button id="create-payment-link-button">결제링크 생성</button>

          <div id="payment-link-result"></div>
        </div>
      </div>
    `,document.querySelector(`#create-payment-link-button`).addEventListener(`click`,()=>{let e=document.querySelector(`#link-merchant-select`),t=e.value,n=e.selectedOptions[0].getAttribute(`data-name`)||``,r=document.querySelector(`#link-product-name`).value,i=document.querySelector(`#link-amount`).value;if(!t||!r||!i){alert(`가맹점, 상품명, 금액을 입력해주세요`);return}let a=`${window.location.origin}/pay?merchantId=${t}&merchantName=${encodeURIComponent(n)}&productName=${encodeURIComponent(r)}&amount=${i}`;document.querySelector(`#payment-link-result`).innerHTML=`
          <div class="create-result-card">
            <h2>결제링크 생성 완료</h2>
            <p>${n}</p>
            <p>${Number(i).toLocaleString()}원</p>

            <a class="result-link-button" href="${a}" target="_blank">
              결제 링크 열기
            </a>

            <button id="copy-payment-link-button">링크 복사</button>
          </div>
        `,document.querySelector(`#copy-payment-link-button`).addEventListener(`click`,async()=>{await navigator.clipboard.writeText(a),alert(`결제링크가 복사되었습니다`)})}))}else if(Q===`/voice-call`){Z.innerHTML=`
    <div class="page">
      <div class="payment-card">
        <h1>음성 고객 호출</h1>

        <p id="voice-result">마이크 버튼을 누르고 말해주세요.</p>

        <button id="voice-start-button">🎤 말하기</button>
        <button id="test-call-button">34번 테스트 호출</button>
      </div>
    </div>
  `;let e=e=>{let t=new SpeechSynthesisUtterance(e);t.lang=`ko-KR`,window.speechSynthesis.speak(t)};document.querySelector(`#test-call-button`).addEventListener(`click`,()=>{e(`삼십사번 고객님 주문 나왔습니다.`)}),document.querySelector(`#voice-start-button`).addEventListener(`click`,()=>{let t=window.SpeechRecognition||window.webkitSpeechRecognition;if(!t){alert(`크롬 브라우저에서 테스트해주세요.`);return}let n=new t;n.lang=`ko-KR`,n.start(),n.onresult=t=>{let n=t.results[0][0].transcript;document.querySelector(`#voice-result`).innerText=`인식된 말: `+n;let r=n.match(/[0-9]+/);if(!r){e(`번호를 찾지 못했습니다.`);return}let i=r[0],a=(e=>{let t=Math.floor(e/10),n=e%10;return[``,`십`,`이십`,`삼십`,`사십`,`오십`,`육십`,`칠십`,`팔십`,`구십`][t]+[``,`일`,`이`,`삼`,`사`,`오`,`육`,`칠`,`팔`,`구`][n]})(Number(i))+`번 고객님 주문 나왔습니다.`;e(a),setTimeout(()=>{e(a)},5e3)}})}else if(Q===`/shop`){let e=new URLSearchParams(window.location.search).get(`id`),{data:t,error:n}=await X.from(`merchants`).select(`*`).eq(`id`,Number(e)).single(),{data:r,error:i}=await X.from(`products`).select(`*`).eq(`merchant_id`,Number(e)).eq(`status`,`판매중`).order(`id`,{ascending:!0});if(n||i||!t)Z.innerHTML=`<p>상점 정보를 불러오지 못했습니다.</p>`;else{Z.innerHTML=`
      <div class="page">
        <div class="payment-card">
          <h1>${t.merchant_name}</h1>
          <p>상품을 선택해주세요</p>

          <div class="menu-list">
            ${(r||[]).map(e=>`
              <div class="menu-card">
                ${e.image_url?`<img src="${e.image_url}" alt="${e.product_name}">`:``}

                <h3>${e.product_name}</h3>
                <p>${Number(e.price).toLocaleString()}원</p>

                <button
                  class="shop-product-button"
                  data-name="${e.product_name}"
                  data-price="${e.price}"
                >
                  선택
                </button>
              </div>
            `).join(``)}
          </div>

          <div class="input-group">
            <label>선택 상품</label>
            <input id="shop-selected-product" type="text" readonly>
          </div>

          <div class="input-group">
            <label>결제금액</label>
            <input id="shop-selected-amount" type="number" readonly>
          </div>

          <button id="shop-pay-button">결제하기</button>
        </div>
      </div>
    `;let e=[],n=()=>{let t=e.map(e=>`${e.name} x ${e.quantity}`).join(`, `),n=e.reduce((e,t)=>e+t.price*t.quantity,0);document.querySelector(`#shop-selected-product`).value=t,document.querySelector(`#shop-selected-amount`).value=String(n)};document.querySelectorAll(`.shop-product-button`).forEach(t=>{t.addEventListener(`click`,()=>{let r=t.getAttribute(`data-name`)||``,i=Number(t.getAttribute(`data-price`)||0),a=e.find(e=>e.name===r);a?a.quantity+=1:e.push({name:r,price:i,quantity:1}),n()})}),document.querySelector(`#shop-pay-button`).addEventListener(`click`,async()=>{let n=e.reduce((e,t)=>e+t.price*t.quantity,0),r=e.map(e=>`${e.name} x ${e.quantity}`).join(`, `);if(e.length===0||n===0){alert(`상품을 선택해주세요`);return}let i=t.pg_company||``;if(sessionStorage.setItem(`selected_pg_company`,i),i===`코페이`){if(!t.korpay_pg_mid||!t.korpay_pg_mkey){alert(`코페이 인증결제 MID 또는 MKEY가 등록되지 않았습니다.`);return}alert(`코페이 인증결제 준비 완료

MID 등록 확인됨
MKEY 등록 확인됨`);return}if(i===`토스페이먼츠`){let e=await c(Kb);sessionStorage.setItem(`merchantId`,String(t.id)),sessionStorage.setItem(`merchantName`,t.merchant_name),sessionStorage.setItem(`message`,r),await e.requestPayment(`카드`,{amount:n,orderId:`order-`+Date.now(),orderName:r,customerName:t.merchant_name,successUrl:window.location.origin+`/success?source=kiosk&merchantId=`+t.id+`&merchantName=`+encodeURIComponent(t.merchant_name),failUrl:window.location.origin+`/fail`});return}alert(`사용 PG사가 등록되지 않았습니다. 가맹점 정보에서 사용 PG사를 확인해주세요.`)})}let a=Number(sessionStorage.getItem(`login_merchant_id`));Z.innerHTML=`
      <div class="page">
        <div class="payment-card">
          <h1>상품 등록</h1>


          <div class="input-group">
            <label>상품명</label>
            <input id="product-name" type="text" placeholder="예: 아메리카노">
          </div>

          <div class="input-group">
            <label>가격</label>
            <input id="product-price" type="number" placeholder="예: 4500">
          </div>

          <div class="input-group">
            <label>이미지 URL</label>
            <input id="product-image-url" type="text" placeholder="상품 이미지 주소">
          </div>

          <h2 style="margin-top:30px;">등록된 상품</h2>

<div id="merchant-product-list"></div>
        </div>
      </div>
    `,document.querySelector(`#product-create-button`).addEventListener(`click`,async()=>{let e=sessionStorage.getItem(`login_merchant_id`),t=document.querySelector(`#product-name`).value,n=Number(document.querySelector(`#product-price`).value),r=document.querySelector(`#product-image-url`).value;if(!e||!t||!n){alert(`가맹점, 상품명, 가격을 입력해주세요`);return}let{error:i}=await X.from(`products`).insert([{merchant_id:a,product_name:t,price:n,image_url:r}]),o=document.querySelector(`#product-result`);if(i){o.innerHTML=`<p>상품 등록 실패: ${i.message}</p>`;return}o.innerHTML=`<p>상품 등록 완료</p>`})}else if(Q===`/merchant-apply`)Z.innerHTML=`
    <div class="page">
      <div class="payment-card merchant-terms-card">
        <h1>가맹점 가입 신청</h1>
        <p>서비스 이용을 위해 아래 약관에 동의해주세요.</p>

        <div class="terms-box">

  <h3>서비스 이용약관</h3>

  <div class="terms-content full-terms-scroll">

제1조 목적

본 이용약관은 “NXGSOFT”(이하 "모바일 전자결제서비스“”오픈마켓 통신판매대행")의 서비스의 이용조건과 운영에 관한 제반사항 규정을 목적으로 합니다.

제2조 용어의 정의

본 약관에서 사용되는 주요한 용어의 정의는 다음과 같습니다.

① NXGSOFT : PG 전자결제서비스를 탑재한 오픈마켓 모바일웹으로서 회원들이 NXGSOFT 모바일 웹의 입점주가 되어 상품을 등록, 판매하고, 정산받는 시스템이다.
② 회원 : NXGSOFT 서비스의 약관에 동의하고 개인정보를 제공하여 회원등록을 한 자로서, 이용계약을 체결 후 모바일웹에 입점하여 판매활동을 사용하는자를 말한다.
③ 이용계약 : NXGSOFT 이용과 관련하여 모바일가입 회원간에 체결 하는 계약을 말한다.
④ 회원 아이디(이하 "ID") : 회원의 식별과 회원의 서비스 이용을 위하여 회원별로 부여하는 고유한 문자와 숫자의 조합을 말한다.
⑤ 비밀번호 : 회원이 부여받은 ID와 일치된 회원임을 확인하고 회원의 권익보호를 위하여 회원이 선정한 문자와 숫자의 조합을 말한다.
⑥ 해지 : 회원이 NXGSOFT 이용계약을 해약하는 것을 말한다.
⑦ 카드리더기, 수기결제, SMS문자결제 : NXGSOFT 모바일웹에서 카드결제 안에 있는 결제의 종류이고 3가지 동작으로 대면, 비대면 카드결제를 받을수 있다.
⑧ PG전자결제서비스 : NXGSOFT가 PG사에 가맹점으로 등록후 사용하는 전자결제서비스다.
⑨ 수수료 : 회원들이 NXGSOFT 모바일웹을 통해 상품을 판매할 때 부담해야 하는 판매 수수료이다. 판매대금 정산일에 수수료를 제외한 금액을 정산해준다.
⑩ 정산일 : NXGSOFT 약관에서 정하는 회원들의 판매대금 정산일을 말한다.
⑪ 미니상점 : NXGSOFT 웹에서 각 회원들이 프로필 소개,상품등록, 판매, 관리할수 있는 기능.
⑫ 판매금지항목 : 카드사가 지정한 판매금지 목록들을 말한다.

제3조 약관외 준칙

NXGSOFT는 필요한 경우 별도로 운영정책을 공지 안내할 수 있으며, 본 약관과 운영정책이 중첩될 경우 운영정책이 우선 적용됩니다.

제4조 이용계약 체결

① 이용계약은 회원으로 등록하여 ‘NXGSOFT 서비스를 이용하려는 자의 본 약관 내용에 대한 동의와 가입신청에 대하여 운영자의 이용승낙으로 성립합니다.
② 회원으로 등록하여 서비스를 이용하려는 자는 NXGSOFT 이용 가입신청시 본 약관을 읽고 아래에 있는 "동의합니다"를 선택하는 것으로 본 약관에 대한 동의 의사 표시를 합니다.

제5조 서비스 이용 신청

① 회원으로 등록하여 NXGSOFT를 이용하려는 이용자는 모바일웹에서 요청하는 제반정보(이용자ID,비밀번호, 닉네임, 계좌번호 등)를 제공해야 합니다.
② 타인의 정보를 도용하거나 허위의 정보를 등록하는 등 본인의 진정한 정보를 등록하지 않은 회원은 웹 이용과 관련하여 아무런 권리를 주장할 수 없으며, 관계 법령에 따라 처벌 받을 수 있습니다.

제6조 개인정보처리방침

NXGSOFT는 회원가입시 제공한 개인정보 중 비밀번호를 가지고 있지 않으며 이와 관련된 부분은 NXGSOFT의 개인정보처리방침을 따릅니다.
NXGSOFT는 관계법령이 정하는 바에 따라 회원등록정보를 포함한 회원의 개인정보를 보호하기 위하여 노력을 합니다.
회원의 개인정보보호에 관하여 관계법령 및 NXGSOFT 서비스가 정하는 개인정보처리방침에 정한 바에 따릅니다.
단, 회원의 귀책사유로 인해 노출된 정보에 대해 운영자는 일체의 책임을 지지 않습니다.
운영자는 회원이 미풍양속에 저해되거나 국가안보에 위배되는 게시물 등 위법한 게시물을 등록 · 배포할 경우 관련기관의 요청이 있을시 회원의 자료를 열람 및 해당 자료를 관련기관에 제출할 수 있습니다.
① 미니 상점 이용시 구매자가 판매자의 이메일 및 SMS문자로 구매문의를 할수 있도록 정보를 제공합니다.

제7조 NXGSOFT의 권리와 의무

① NXGSOFT는 이용회원으로부터 제기되는 의견이나 불만이 정당하다고 인정할 경우에는 가급적빨리 처리하여야 합니다. 다만, 개인적인 사정으로 신속한 처리가 곤란한 경우에는 사후에공지 또는 이용회원에게 SMS문자, 전자우편 등을 보내는 등 최선을 다합니다.
② 운영자는 계속적이고 안정적인 NXGSOFT 서비스 제공을 위하여 설비에 장애가 생기거나 유실된 때에는 이를 지체 없이 수리 또는 복구할 수 있도록 해야합니다. 다만, 천재지변 또는 웹운영자에 부득이한 사유가 있는 경우, 모바일웹 운영을 일시 정지할 수 있습니다.
③ NXGSOFT는 모바일웹에서 회원들이 가입시 지정한 정산일에 맞추어 상품판매에 대한 대금을 회원 명이의 등록된 계좌로 지급합니다.
(단 PG사의 부득이한 전산망 오류나 설비에 장애가 생기는 경우 예정일 보다 정산이 늦어질수 있습니다.)
④ NXGSOFT는 판매대금에서 공제된 수수료에 대한 전자세금계산서를 사업자 및 개인에게 모두 발급합니다. (단 현금영수증 발행 기능은 NXGSOFT의 매출과 무관합니다.)
⑤ NXGSOFT는 회원의 판매대금 결제사고 리스크 관리를 위해 보증보험증권 발급을 요구 할수 있습니다.
⑥ NXGSOFT는 통신판매중개자로서 판매자 회원과 일반 구매자 사이의 분쟁 발생시 중재 역활을 수행해야 하고, 구매자의 이의가 지속될 경우 소비자보호원으로 안내 하도록합니다.
⑦ NXGSOFT는 카드사가 정한 판매금지항목을 준수하고, 회원들에게 공지하도록 합니다. 만약 공지에도 불구하고 회원이 판매금지항목 거래시 결제취소는 물론 정산대금 입금정지를 할수 있습니다. 때에 따라서 민,형사상의 조치를 취합니다.
⑧ 오픈마켓 운영 품질을 위해 회원들의 업로드 상품게시글을 상시 모니터합니다. 음란물 및 음란서적, 성인용품등의 판매시 예고없이 게시물이 삭제되며, 강제탈퇴 조치합니다.

제8조 회원의 의무

① 회원은 본 약관에서 규정하는 사항과 NXGSOFT가 정한 제반규정, 공지사항 및 운영정책 등 NXGSOFT가 공지하는 사항 및 관계법령을 준수하여야 하며, 기타 NXGSOFT의 업무에 방해가 되는 행위, NXGSOFT의 명예를 손상시키는 행위를 해서는 안됩니다.
② 회원은 NXGSOFT의 명시적 동의가 없는 한 서비스의 이용권한, 기타 이용계약상 지위를 타인에게 양도, 증여할 수 없으며, 이를 담보로 제공할 수 없습니다.
③ 이용고객은 아이디 및 비밀번호 관리에 상당한 주의를 기울여야 하며, NXGSOFT의 동의 없이 제3자에게 아이디를 제공하여 이용하게 할 수 없습니다.
④ 회원은 NXGSOFT의 지적 재산권 및 저작권을 침해해서는 안됩니다.
⑤ 모바일웹 및 본사 사이트에 등록되어 있는 각종 이미지 및 컨텐츠를 무단으로 이용 또는 복제를 하여, 상업의 목적으로 이용시 그에 따른 손해배상을 해야 합니다.
⑥ 회원은 일반 소비자와 허위로 거래를 하고 부당하게 판매대금을 정산 받은 경우, 형사상 책임을 물어야 하며, NXGSOFT가 금전적 피해를 입을 경우 명예훼손 및 영업방해 영업손실에 따른 3배에 책임을 물도록합니다.
⑦ 회원으로 하여금 결제대금 민원 및 사고 발생시 원만한 해결을 위해 회원의 남은 정산대금의 지급이 보류 됩니다.
⑧ 미니상점으로 상품 판매시 온라인 거래에 따른 운송장 번호를 구매자에게 통화 및 문자를 이용하여 알려야 하고, 배송전 상태의 주문건이 4일 이상 지속될 경우 일방적으로 NXGSOFT로 부터 주문취소 조치를 받게됩니다.
⑨ 미니상점을 이용한 온라인 거래가 불량하다고 판단되는 횟수가 NXGSOFT 내부 기준에 부합된다면, 회원 자격이 박탈될수 있고, 그에 따른 서비스 이용료 환불또한 불가합니다.
⑩ 무료가입 미니상점 사용을 제외한, 유료가입 서비스의 경우 가입후 비용 환불이 불가합니다. 회원가입 처리를 위한 전산 관리비 및 인건비등이 가입즉시 발생이되며, 개인정보활용 시스템에 대한 지출비용등이 발생됨으로 환불이 불가합니다.
⑪ 카드리더기의 경우 배송완료일 제외 구입후 7일이내 환불이 가능합니다. 단 1회이상 모바일웹에서 카드결제가 확인될 경우 환불이 불가합니다.
⑫ 카드거래에 따른 기본한도 및 건당 결제승인한가 모자를 경우 NXGSOFT가 안내하는 보증보험으로 가입해야 합니다.
⑬ 판매상품과 관련없는 이미지를 상품등록하거나 게시해서는 안됩니다. 해당 게시물은 예고없이 삭제됩니다.

제9조 서비스 이용시간

① 서비스 이용시간은 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴 1일 24시간을 원칙으로 합니다. 단, NXGSOFT의 시스템 정기점검, 증설 및 교체를 위해 사이트가 정한 날이나 시간에 서비스를 일시중단 할 수 있으며 예정된 작업으로 인한 서비스 일시 중단은 모바일웹 및 본사 홈페이지에 사전에 공지하오니 수시로 참고하시길 바랍니다.
② 단, NXGSOFT 모바일웹은 다음 경우에 대하여 사전 공지나 예고없이 서비스를 일시적 혹은 영구적으로 중단할 수 있습니다.
- 긴급한 시스템 점검, 증설, 교체, 고장 혹은 오동작을 일으키는 경우
- 국가비상사태, 정전, 천재지변 등의 불가항력적인 사유가 있는 경우
- 전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를 중지한 경우
- 서비스 이용의 폭주 등으로 정상적인 서비스 이용에 지장이 있는 경우
③ 전항에 의한 서비스 중단의 경우 NXGSOFT는 사전에 공지사항 등을 통하여 회원에게 통지 합니다. 단, 모바일웹이 통제할 수 없는 사유로 발생한 서비스의 중단에 대하여 사전공지가 불가능한 경우에는 사후공지로 대신합니다.

제10조 서비스 이용 해지

① 회원이 NXGSOFT와의 이용계약을 해지하고자 하는 경우에는 회원 본인이 온라인을 통하여 등록해지신청을 하여야 합니다.
② 해지신청과 동시에 NXGSOFT가 제공하는 사이트 관련 프로그램이 회원관리 화면에서 자동적으로 삭제됨으로 운영자는 더 이상 해지신청자의 정보를 볼 수 없습니다.
제11조 서비스 이용 제한
회원은 다음 각 호에 해당하는 행위를 하여서는 아니되며 해당 행위를 한 경우에 NXGSOFT 회원의 서비스 이용 제한 및 적법한 조치를 취할 수 있으며 이용계약을 해지하거나 기간을 정하여 서비스를 중지할 수 있습니다.
① 회원 가입시 혹은 가입 후 정보 변경시 허위 내용을 등록하는 행위
② 타인의 NXGSOFT 모바일웹 이용을 방해하거나 정보를 도용하는 행위
③ NXGSOFT의 운영진, 직원 또는 관계자를 사칭하는 행위
④ NXGSOFT, 기타 제3자의 인격권 또는 지적재산권을 침해하거나 업무를 방해하는 행위
⑤ 다른 회원의 ID를 부정하게 사용하는 행위
⑥ 다른 회원에 대한 개인정보를 그 동의 없이 수집, 저장, 공개하는 행위
⑦ 범죄와 결부된다고 객관적으로 판단되는 행위
⑧ 기타 관련 법령에 위배되는 행위
⑨ NXGSOFT가 규정하는 판매금지항목 거래행위
⑩ 회원가입시 NXGSOFT 서비스를 이용하여 판매하는 상품의 품목을 허위기재시
⑪ 가입회원과 예금주가 다를 경우
⑫ 미니상점 3회 이상 판매상품 배송 미이행시 서비스 제한을 합니다.

제12조 판매취소 및 결제취소

① 미니상점 판매 이용시 구매자가 구매확정전 7일이내 주문취소 요청시 회원은 판매상품을 돌려받거 즉시 결제취소 해야 합니다.
② 카드리더기 및 일반 전자결제의 경우 해당 정산일 전까지 즉시 결체취소가 가능하고, 정산이 이미 되고난 후 거래취소의 경우 회원과 소비자간 원만한 해결을 하도록합니다.
③ 미니상점에서 판매상품의 재고가 없을 경우 결제취소를 해야 합니다.

제 13조 수수료

① NXGSOFT의 모바일웹을 이용하여 판매된 대금의 수수료는 다음과 같습니다.
- 무료회원 미니상점 판매대금 - 7%
- 유료회원 미니상점, 카드리더기, 수기결제, SMS문자결제를 이용한 물건 판매 - 3.96%
- 위 각항목에서 익일정산 서비스 신청시 수수료가 1%씩 인상된다.

제14조 게시물의 관리

①회원은 미니상점등에 음란 서적 및 음란물을 상품으로 게시할수 없습니다. 불량 게시물 및 자료에 대하여 상시 모니터링이 되며 예고 없이 삭제됩니다.
한편, 이용회원이 올린 게시물에 대해서는 게시자 본인에게 책임이 있으니 회원스스로 본 이용약관에서 위배되는 게시물은 게재해서된 안됩니다.
② 정보통신윤리위원회 등 공공기관의 시정요구가 있는 경우 NXGSOFT는 회원의 사전동의 없이 게시물을 삭제하거나 이동 할 수 있습니다.
3. 불량게시물의 판단기준은 다음과 같습니다.
- 다른 회원 또는 제3자에게 심한 모욕을 주거나 명예를 손상시키는 내용인 경우
- 공공질서 및 미풍양속에 위반되는 내용을 유포하거나 링크시키는 경우
- 불법복제 또는 해킹을 조장하는 내용인 경우
- 영리를 목적으로 하는 광고일 경우
- 범죄와 결부된다고 객관적으로 인정되는 내용일 경우
- 다른 이용자 또는 제3자와 저작권 등 기타 권리를 침해하는 경우
- 기타 관계법령에 위배된다고 판단되는 경우4. 사이트 및 운영자는 게시물 등에 대하여 제3자로부터 명예훼손, 지적재산권 등의 권리 침해를 이유로 게시중단 요청을 받은 경우 이를 임시로 게시중단(전송중단)할 수 있으며, 게시중단 요청자와 게시물 등록자 간에 소송, 합의 기타 이에 준하는 관련기관의 결정 등이 이루어져 사이트에 접수된 경우 이에 따릅니다.

제15조 게시물의 보관

사이트 운영자가 불가피한 사정으로 본 사이트를 중단하게 될 경우, 회원에게 사전 공지를 하고 게시물의 이전이 쉽도록 모든 조치를 취하기 위해 노력합니다.

제16조 게시물에 대한 저작권

① 회원이 NXGSOFT 사이트 내에 게시한 게시물의 저작권은 게시한 회원에게 귀속됩니다. 또한 NXGSOFT는 게시자의 동의 없이 게시물을 상업적으로 이용할 수 없습니다. 다만 비영리 목적인 경우는 그러하지 아니하며, 또한 서비스 내의 게재권을 갖습니다.
② 회원은 서비스를 이용하여 취득한 정보를 임의 가공, 판매하는 행위 등 서비스에 게재된 자료를 상업적으로 사용할 수 없습니다.
③ 운영자는 회원이 게시하거나 등록하는 NXGSOFT 모바일웹 내의 내용물, 게시 내용에 대해 제12조 각 호에 해당된다고 판단되는 경우 사전통지 없이 삭제하거나 이동 또는 등록 거부할 수 있습니다.

제17조 손해배상

① NXGSOFT에서 발생한 모든 민,형법상 책임은 회원 본인에게 1차적으로 있습니다.
② NXGSOFT로부터 회원이 받은 손해가 천재지변 등 불가항력적이거나 회원의 고의 또는 과실로 인하여 발생한 때에는 손해배상을 하지 하지 않습니다.

제18조 면책

① 회원은 NXGSOFT의 서비스 제공으로부터 기대되는 이익을 얻지 못하였거나 서비스 자료에 대한 취사선택 또는 이용으로 발생하는 손해 등에 대해서는 책임이 면제됩니다.
② 운영자는 본 사이트의 서비스 기반 및 타 통신업자가 제공하는 전기통신서비스의 장애로 인한 경우에는 책임이 면제되며 본 사이트의 서비스 기반과 관련되어 발생한 손해에 대해서는 사이트의 이용약관에 준합니다
③ NXGSOFT는 회원이 저장, 게시 또는 전송한 자료와 관련하여 일체의 책임을 지지 않습니다.
④ NXGSOFT는 회원의 귀책사유로 인하여 서비스 이용의 장애가 발생한 경우에는 책임지지 아니합니다.
⑤ NXGSOFT는 회원 상호간 또는 회원과 제3자 상호간, 기타 회원의 본 서비스 내외를 불문한 일체의 활동(데이터 전송, 기타 커뮤니티 활동 포함)에 대하여 책임을 지지 않습니다.
⑥ NXGSOFT는 회원이 게시 또는 전송한 자료 및 본 모바일웹으로 소비자가 제공받을 수 있는 모든 자료들의 진위, 신뢰도, 정확성 등 그 내용에 대해서는 책임지지 아니합니다.
⑦ NXGSOFT는 회원 상호간 또는 회원과 제3자 상호간에 서비스를 매개로 하여 물품거래 등을 한 경우에 그로부터 발생하는 일체의 손해에 대하여 책임지지 아니합니다.
⑧ NXGSOFT는 회원의 귀책사유 없이 회원간 또는 회원과 제3자간에 발생한 일체의 분쟁에 대하여 책임지지 아니합니다.
⑨ NXGSOFT는 서버 등 설비의 관리, 점검, 보수, 교체 과정 또는 소프트웨어의 운용 과정에서 고의 또는 고의에 준하는 중대한 과실 없이 발생할 수 있는 시스템의 장애, 제3자의 공격으로 인한 시스템의 장애, 국내외의 저명한 연구기관이나 보안관련 업체에 의해 대응방법이 개발되지 아니한 컴퓨터 바이러스 등의 유포나 기타 운영자가 통제할 수 없는 불가항력적 사유로 인한 회원의 손해에 대하여 책임지지 않습니다.


부칙 이 약관은 <모바일웹 개설일> 부터 시행합니다.

  </div>

  <div class="terms-agree-group">

  <label>
    <input type="checkbox" id="agree-service">
    서비스 이용약관에 동의합니다. (필수)
  </label>

  <label>
    <input type="checkbox" id="agree-private">
    개인정보 수집 및 이용에 동의합니다. (필수)
  </label>

  <label>
    <input type="checkbox" id="agree-payment">
    정산 및 결제서비스 이용에 동의합니다. (필수)
  </label>

</div>

</div>
          

        <button id="go-apply-form">가입신청서 작성하기</button>

        <div id="apply-message"></div>
      </div>
    </div>
  `,document.querySelector(`#go-apply-form`).addEventListener(`click`,()=>{let e=document.querySelector(`#agree-service`)?.checked,t=document.querySelector(`#agree-private`)?.checked,n=document.querySelector(`#agree-payment`)?.checked;if(!e||!t||!n){alert(`필수 약관에 모두 동의해주세요.`);return}let r=new URLSearchParams(window.location.search).get(`ref`)||``;location.href=r?`/merchant-apply-form?ref=`+encodeURIComponent(r):`/merchant-apply-form`});else if(Q===`/merchant-apply-form`)Z.innerHTML=`
  <div class="apply-page">
    <div class="apply-card">
      <h1>가맹점 가입신청서</h1>
      <p class="apply-desc">PG 등록 심사를 위해 모든 필수항목을 정확히 입력해주세요.</p>

      <div class="apply-section">
        <h3>1. 신청자 기본정보</h3>
        <div class="apply-grid">
          <label>대표자명 *</label>
          <input id="apply-owner-name" type="text">

          <label>휴대폰번호 *</label>
          <input id="apply-phone" type="text" placeholder="010-0000-0000">

          <label>이메일 *</label>
          <input id="apply-email" type="email">

          <label>사업자유형 *</label>
          <select id="apply-business-type">
            <option value="">선택</option>
            <option value="일반(비사업자)">일반(비사업자)</option>
            <option value="개인사업자">개인사업자</option>
            <option value="법인사업자">법인사업자</option>
          </select>
        </div>
      </div>
      
   <div class="apply-section">
  <h3>2. 사업자 / 판매정보</h3>

  <div class="apply-grid">

    <label>상호명 *</label>
    <input id="apply-merchant-name" type="text">

    <label id="business-number-label">사업자번호</label>
    <input
      id="apply-business-number"
      type="text"
      placeholder="사업자인 경우 입력">

    <label
      id="corporate-number-label"
      style="display:none;">
      법인번호 *
    </label>

    <input
      id="apply-corporate-number"
      type="text"
      placeholder="법인번호"
      style="display:none;">

    <label>주민번호 *</label>
    <input
      id="apply-resident-number"
      type="text"
      placeholder="주민등록번호">

    <label>업태/종목 *</label>
    <div class="apply-two-inputs">
      <input id="apply-business-category" type="text" placeholder="업태">
      <input id="apply-business-item" type="text" placeholder="종목">
    </div>

    <label>취급품목 *</label>
    <input id="apply-product-item" type="text">

  </div>

</div>

      <div class="apply-section">
  <h3>3. 주소정보</h3>

  <div class="address-row">
  <label>우편번호 *</label>
  <input id="apply-zipcode">
  <button id="find-postcode-btn">
    우편번호 찾기
  </button>
</div>

  <div class="address-row-full">
    <label>기본주소 *</label>
    <input id="apply-address">
  </div>

  <div class="address-row-full">
    <label>상세주소 *</label>
    <input id="apply-address-detail">
  </div>
</div>

      <div class="apply-section">
        <h3>4. 정산정보</h3>
        <div class="apply-grid">
          <label>예금주 *</label>
          <input id="apply-account-holder" type="text">

          <label>은행명 *</label>
          <input id="apply-bank-name" type="text">

          <label>계좌번호 *</label>
          <input id="apply-account-number" type="text">

          <label>정산주기 *</label>
          <select id="apply-settlement-cycle">
            <option value="">선택</option>
            <option value="일반">일반</option>
            <option value="익일">익일</option>
          </select>
        </div>
      </div>

      <div class="apply-section">
        <h3>5. 결제조건</h3>
        <div class="apply-grid">
          <label>결제방법 *</label>
          <select id="apply-payment-method">
            <option value="">선택</option>
            <option value="수기결제">수기결제</option>
            <option value="QR결제">QR결제</option>
            <option value="무선단말기">무선단말기</option>
            <option value="전체">전체</option>
          </select>

</select>
        </div>
      </div>

      <div class="apply-section">
  <h3>6. 첨부서류 / 메모</h3>
  <p class="apply-help">PG 심사를 위해 필수 서류를 첨부해주세요.</p>

  <div class="apply-grid">
    <label>사업자등록증 </label>
<input id="apply-file-business-license" type="file">

<label>통장사본 *</label>
<input id="apply-file-bankbook" type="file">

<label>대표자 신분증 *</label>
<input id="apply-file-id-card" type="file">

<label>판매상품 사진</label>
<input id="apply-file-product-photo" type="file">

<label>기타서류</label>
<input id="apply-file-extra" type="file">

<label>메모</label>
<textarea id="apply-memo" placeholder="추가 요청사항"></textarea>
  </div>
</div>

      <button id="merchant-apply-submit" class="apply-submit-btn">가입신청</button>
      <div id="merchant-apply-result"></div>
    </div>
  </div>
`,document.querySelector(`#find-postcode-btn`)?.addEventListener(`click`,()=>{new window.daum.Postcode({oncomplete:e=>{let t=document.querySelector(`#apply-zipcode`),n=document.querySelector(`#apply-address`),r=document.querySelector(`#apply-address-detail`);t&&(t.value=e.zonecode),n&&(n.value=e.roadAddress||e.jibunAddress),r?.focus()}}).open()}),document.querySelector(`#merchant-apply-submit`)?.addEventListener(`click`,async()=>{let e=document.querySelector(`#apply-file-business-license`)?.files?.[0],t=document.querySelector(`#apply-file-bankbook`)?.files?.[0],n=document.querySelector(`#apply-file-id-card`)?.files?.[0],r=document.querySelector(`#apply-file-product-photo`)?.files?.[0],i=document.querySelector(`#apply-file-extra`)?.files?.[0];if(!t||!n){alert(`통장사본과 신분증을 첨부해주세요.`);return}let a=Date.now(),o=e?`${a}_business.${e.name.split(`.`).pop()||`file`}`:``,s=`${a}_bankbook.${t.name.split(`.`).pop()||`file`}`,c=`${a}_idcard.${n.name.split(`.`).pop()||`file`}`,l=r?`${a}_product.${r.name.split(`.`).pop()||`file`}`:``,u=i?`${a}_extra.${i.name.split(`.`).pop()||`file`}`:``;if(e){let t=await X.storage.from(`merchant-files`).upload(o,e);if(t.error){alert(`사업자등록증 업로드 실패: `+t.error.message);return}}let d=await X.storage.from(`merchant-files`).upload(s,t);if(d.error){alert(`통장사본 업로드 실패: `+d.error.message);return}let f=await X.storage.from(`merchant-files`).upload(c,n);if(f.error){alert(`신분증 업로드 실패: `+f.error.message);return}if(r){let e=await X.storage.from(`merchant-files`).upload(l,r);if(e.error){alert(`판매상품 사진 업로드 실패: `+e.error.message);return}}if(i){let e=await X.storage.from(`merchant-files`).upload(u,i);if(e.error){alert(`기타서류 업로드 실패: `+e.error.message);return}}let p=(new URLSearchParams(window.location.search).get(`ref`)||``).replace(/-/g,``).trim(),m=null,h=null,g=null;if(p){let{data:e,error:t}=await X.from(`admin_users`).select(`*`).eq(`role`,`MANAGER`).eq(`status`,`사용중`);if(t){alert(`담당자 정보를 확인하지 못했습니다: `+t.message);return}if(m=(e||[]).find(e=>String(e.phone||``).replace(/-/g,``).endsWith(p)),m?.parent_admin_id){let{data:e}=await X.from(`admin_users`).select(`*`).eq(`id`,m.parent_admin_id).single();h=e||null}if(h?.parent_admin_id){let{data:e}=await X.from(`admin_users`).select(`*`).eq(`id`,h.parent_admin_id).single();g=e||null}}let _={merchant_name:document.getElementById(`apply-merchant-name`)?.value||``,manager_admin_id:m?.id||null,manager_admin_name:m?.admin_name||``,manager_phone:m?.phone||``,agency_admin_id:h?.id||null,agency_name:h?.admin_name||`본사`,agency_admin_name:h?.admin_name||``,branch_admin_id:g?.id||null,branch_admin_name:g?.admin_name||``,owner_name:document.getElementById(`apply-owner-name`)?.value||``,phone:document.getElementById(`apply-phone`)?.value||``,company_type:document.getElementById(`apply-business-type`)?.value||``,business_number:document.getElementById(`apply-business-number`)?.value||``,resident_number:document.getElementById(`apply-resident-number`)?.value||``,business_category:document.getElementById(`apply-business-category`)?.value||``,business_type:document.getElementById(`apply-business-item`)?.value||``,product_item:document.getElementById(`apply-product-item`)?.value||``,email:document.getElementById(`apply-email`)?.value||``,zipcode:document.getElementById(`apply-zipcode`)?.value||``,address:document.getElementById(`apply-address`)?.value||``,address_detail:document.getElementById(`apply-address-detail`)?.value||``,bank_name:document.getElementById(`apply-bank-name`)?.value||``,account_number:document.getElementById(`apply-account-number`)?.value||``,account_holder:document.getElementById(`apply-account-holder`)?.value||``,settlement_cycle:document.getElementById(`apply-settlement-cycle`)?.value||``,business_license_url:o?X.storage.from(`merchant-files`).getPublicUrl(o).data.publicUrl:``,bankbook_url:s?X.storage.from(`merchant-files`).getPublicUrl(s).data.publicUrl:``,id_card_url:c?X.storage.from(`merchant-files`).getPublicUrl(c).data.publicUrl:``,product_photo_url:l?X.storage.from(`merchant-files`).getPublicUrl(l).data.publicUrl:``,extra_file_url:u?X.storage.from(`merchant-files`).getPublicUrl(u).data.publicUrl:``,memo:document.getElementById(`apply-memo`)?.value||``,status:`신청`},{data:v,error:y}=await X.from(`merchants`).insert([_]).select(`
      id,
      merchant_name,
      owner_name,
      phone,
      email,
      company_type,
      business_number,
      bank_name,
      account_number,
      account_holder
    `).single();if(y||!v){alert(`신청 실패 : `+(y?.message||`가맹점 정보를 확인할 수 없습니다.`));return}let b=`MER`+String(v.id).padStart(4,`0`),x=v.company_type===`일반(비사업자)`?`INDIVIDUAL`:v.company_type===`개인사업자`?`INDIVIDUAL_BUSINESS`:v.company_type===`법인사업자`?`CORPORATE`:``,S={경남:`39`,광주:`34`,단위농협:`12`,지역농협:`12`,부산:`32`,새마을금고:`45`,산림조합:`64`,신한:`88`,신협:`48`,씨티:`27`,우리:`20`,우체국:`71`,저축:`50`,전북:`37`,제주:`35`,카카오뱅크:`90`,카카오:`90`,케이뱅크:`89`,케이:`89`,토스뱅크:`92`,토스:`92`,하나:`81`,기업:`03`,IBK기업:`03`,국민:`06`,KB국민:`06`,대구:`31`,iM뱅크:`31`,산업:`02`,농협:`11`,NH농협:`11`,SC제일:`23`,수협:`07`}[String(v.bank_name||``).replace(/\s/g,``).replace(/은행/g,``)]||``;if(!x){alert(`토스 셀러 등록용 사업자유형을 확인해주세요.`);return}if(!S){alert(`토스 셀러 등록용 은행코드를 확인할 수 없습니다.
입력은행: `+v.bank_name);return}let C=String(v.phone||``).replace(/\D/g,``),w=String(v.business_number||``).replace(/\D/g,``),T={refSellerId:b,businessType:x,account:{bankCode:S,accountNumber:String(v.account_number||``).replace(/\D/g,``),holderName:v.account_holder},metadata:{nxgMerchantId:String(v.id)}};x===`INDIVIDUAL`?T.individual={name:v.owner_name,email:v.email,phone:C}:T.company={name:v.merchant_name,representativeName:v.owner_name,businessRegistrationNumber:w,email:v.email,phone:C};let E=await fetch(`/api/toss-seller-create`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(T)}),D=await E.json();if(!E.ok||!D.success){alert(`NXG 가입신청은 저장되었습니다.

다만 토스 셀러 등록에 실패했습니다.
`+(D?.data?.message||D?.message||`토스 셀러 등록정보를 확인해주세요.`));return}alert(`가입신청이 완료되었습니다.

토스 본인인증 안내가 발송됩니다.
휴대폰에서 본인인증을 완료해주세요.`),location.href=`/merchant-login`,alert(`가입신청이 완료되었습니다.`),location.href=`/merchant-login`});else if(Q===`/merchant-create`)Z.innerHTML=`
    <div class="page">
      <div class="payment-card">
        <h1>가맹점 등록</h1>

        <div class="input-group">
          <label>상호명</label>
          <input id="business-name" type="text" placeholder="예: 홍길동 푸드트럭">
        </div>

        <div class="input-group">
          <label>대표자명</label>
          <input id="owner-name" type="text" placeholder="대표자명 입력">
        </div>

        <div class="input-group">
          <label>연락처</label>
          <input id="merchant-phone" type="text" placeholder="010-0000-0000">
        </div>

        <div class="input-group">
  <label>사업자번호</label>
  <input id="business-number" type="text" placeholder="사업자번호 입력">
</div>

<div class="input-group">
  <label>이메일</label>
  <input id="merchant-email" type="text" placeholder="이메일 입력">
</div>

<div class="input-group">
  <label>우편번호</label>
  <input id="merchant-zipcode" type="text" placeholder="우편번호">
</div>

<div class="input-group">
  <label>주소</label>
  <input id="merchant-address" type="text" placeholder="기본주소">
</div>

<div class="input-group">
  <label>상세주소</label>
  <input id="merchant-address-detail" type="text" placeholder="상세주소">
</div>

<div class="input-group">
  <label>CPID</label>
  <input id="merchant-cpid" type="text" placeholder="예: MER0001">
</div>

<div class="input-group">
  <label>PG MID</label>
  <input id="merchant-pg-mid" type="text" placeholder="PG MID">
</div>

<div class="input-group">
  <label>단말기 MID</label>
  <input id="merchant-terminal-mid" type="text" placeholder="단말기 MID">
</div>

<div class="input-group">
  <label>개통일자</label>
  <input id="merchant-opened-at" type="date">
</div>

        <div class="input-group">
          <label>은행명</label>
          <input id="merchant-bank" type="text" placeholder="예: 국민은행">
        </div>

        <div class="input-group">
          <label>계좌번호</label>
          <input id="merchant-account" type="text" placeholder="계좌번호 입력">
        </div>

        <div class="input-group">
          <label>예금주</label>
          <input id="merchant-account-holder" type="text" placeholder="예금주 입력">
        </div>

        <div class="input-group">
          <label>수수료율 (%)</label>
          <input id="merchant-fee-rate" type="number" value="2">
        </div>

        <div class="input-group">
          <label>정산주기</label>
          <select id="settlement-cycle">
            <option value="D+1">D+1</option>
            <option value="D+4">D+4</option>
          </select>
        </div>

        <button id="merchant-create-button">가맹점 등록</button>

        <div id="merchant-result"></div>
      </div>
    </div>
  `,document.querySelector(`#merchant-create-button`).addEventListener(`click`,async()=>{let e=document.querySelector(`#business-name`).value,t=document.querySelector(`#owner-name`).value,n=document.querySelector(`#merchant-phone`).value,r=document.querySelector(`#merchant-bank`).value,i=document.querySelector(`#merchant-account`).value,a=document.querySelector(`#merchant-account-holder`).value,o=Number(document.querySelector(`#merchant-fee-rate`).value),s=document.querySelector(`#settlement-cycle`).value;if(!e||!t||!n||!r||!i||!a){alert(`필수 정보를 모두 입력해주세요`);return}let c={business_name:e,merchant_name:e,owner_name:t,phone:n,bank_name:r,account_number:i,account_holder:a,fee_rate:o,settlement_cycle:s,business_number:document.querySelector(`#business-number`)?.value||``,email:document.querySelector(`#merchant-email`)?.value||``,zipcode:document.querySelector(`#merchant-zipcode`)?.value||``,address:document.querySelector(`#merchant-address`)?.value||``,address_detail:document.querySelector(`#merchant-address-detail`)?.value||``,cpid:document.querySelector(`#merchant-cpid`)?.value||``,pg_mid:document.querySelector(`#merchant-pg-mid`)?.value||``,terminal_mid:document.querySelector(`#merchant-terminal-mid`)?.value||``,opened_at:document.querySelector(`#merchant-opened-at`)?.value||null,status:`대기`};console.log(`등록 저장 데이터:`,c);let{data:l,error:u}=await X.from(`merchants`).insert([c]).select();console.log(`등록 결과 data:`,l),console.log(`등록 error:`,u);let d=document.querySelector(`#merchant-result`);if(u){d.innerHTML=`<p>가맹점 등록 실패: ${u.message}</p>`;return}d.innerHTML=`<p>가맹점 등록 완료</p>`,alert(`가맹점 등록 완료`),setTimeout(()=>{location.href=`/merchant-admin`},800)});else if(Q===`/create`)Z.innerHTML=`
    <div class="page">
      <div class="payment-card ${nx?`funeral-card`:`wedding-card`}">
        <h1>행사 생성</h1>

        <div class="input-group">
          <label>행사 종류</label>
          <select id="event-type">
            <option value="wedding">결혼식</option>
            <option value="funeral">장례식</option>
            <option value="store">푸드트럭 / 행사장</option>
          </select>
        </div>

        <div class="input-group">
          <label>이름 입력</label>
          <input id="receiver-name" type="text" placeholder="김철수 ♥ 박영희 / 故 홍길동">
        </div>
        <div class="input-group">
  <label>생년월일</label>
  <input id="birth-date" type="text" placeholder="예: 1990-01-01">
</div>
<div class="input-group">
  <label>주민번호</label>
  <input id="resident-number" type="text" placeholder="예: 900101-1234567">
</div>

<div class="input-group">
  <label>연락처</label>
  <input id="phone" type="text" placeholder="예: 010-1234-5678">
</div>

<div class="input-group">
  <label>주소</label>
  <input id="address" type="text" placeholder="주소 입력">
</div>

<div class="input-group">
<label>고객 확인 비밀번호</label>
<input id="customer-code" type="text" placeholder="예: 1234 또는 원하는 비밀번호">
</div>
<div class="input-group">
  <label>은행명</label>
  <input id="bank-name" type="text" placeholder="예: 국민은행">
</div>

<div class="input-group">
  <label>계좌번호</label>
  <input id="account-number" type="text" placeholder="계좌번호 입력">
</div>

<div class="input-group">
  <label>예금주</label>
  <input id="account-holder" type="text" placeholder="예금주 입력">
</div>
<div class="input-group">
  <label>메뉴 이름</label>
  <input id="menu-name" type="text" placeholder="예: 아메리카노">
</div>

<div class="input-group">
  <label>메뉴 가격</label>
  <input id="menu-price" type="number" placeholder="예: 4500">
</div>
        <button id="create-event-button">행사 생성</button>
        <div id="result-link"></div>
      </div>
    </div>
  `,document.querySelector(`#create-event-button`).addEventListener(`click`,async()=>{let e=document.querySelector(`#event-type`).value,t=document.querySelector(`#receiver-name`).value,n=document.querySelector(`#birth-date`).value,r=document.querySelector(`#customer-code`).value,i=document.querySelector(`#bank-name`).value,a=document.querySelector(`#account-number`).value,o=document.querySelector(`#account-holder`).value,s=document.querySelector(`#menu-name`).value,c=Number(document.querySelector(`#menu-price`).value);if(!t){alert(`이름을 입력해주세요`);return}let l=e===`funeral`?`부의금 보내기`:`축의금 보내기`,{data:u,error:d}=await X.from(`events`).insert([{event_type:e,receiver_name:t,payment_title:l,birth_date:n,customer_code:r,bank_name:i,account_number:a,account_holder:o,settlement_status:`정산 대기`}]).select();if(d){alert(`행사 생성 실패: `+d.message);return}let f=u[0].id;if(f&&s&&c){let{error:e}=await X.from(`menus`).insert([{event_id:f,name:s,price:c}]);if(e){alert(`메뉴 저장 실패: `+e.message);return}}let p=`${window.location.origin}/${e}?id=${f}`;document.querySelector(`#result-link`).innerHTML=`
  <div class="create-result-card">
    <h2>✅ 행사 생성 완료</h2>
    <p class="result-name">${t}</p>
    <p class="result-desc">
      결제 링크와 전용 QR이 생성되었습니다.
    </p>

    <p class="result-code">
  행사 코드: <strong>${r}</strong>
</p>

    <a class="result-link-button" href="${p}" target="_blank">
      결제 링크 열기
    </a>

    <button id="copy-link-button">링크 복사</button>
    <button id="sms-link-button">문자로 보내기</button>
    <button id="kakao-link-button">카카오 공유</button>

    <h3>행사 전용 QR</h3>
    <canvas id="event-qr-canvas"></canvas>

    <button id="download-qr-button">QR 이미지 저장</button>
  </div>
`,document.querySelector(`#receiver-name`).value=``,document.querySelector(`#bank-name`).value=``,document.querySelector(`#account-number`).value=``,document.querySelector(`#account-holder`).value=``,document.querySelector(`#copy-link-button`).addEventListener(`click`,async()=>{await navigator.clipboard.writeText(p),alert(`링크가 복사되었습니다`)}),document.querySelector(`#sms-link-button`).addEventListener(`click`,()=>{window.location.href=`sms:?body=${encodeURIComponent(p)}`}),document.querySelector(`#kakao-link-button`).addEventListener(`click`,()=>{let e=`https://share.kakao.com/talk/friends/picker/link?url=`+encodeURIComponent(p);window.open(e,`_blank`)});let m=document.getElementById(`event-qr-canvas`);await de.toCanvas(m,p,{width:220}),document.querySelector(`#download-qr-button`).addEventListener(`click`,()=>{let e=m.toDataURL(`image/png`),t=document.createElement(`a`);t.href=e,t.download=`event-qr.png`,t.click()})});else if(Q===`/admin`)if(localStorage.getItem(`adminLogin`)!==`true`)Z.innerHTML=`
        <div class="page">
          <div class="payment-card">
            <h1>관리자 로그인</h1>
  
            <div class="input-group">
              <label>비밀번호</label>
              <input id="admin-password" type="password" placeholder="비밀번호 입력">
            </div>
  <div class="input-group">
  <label>2차 인증코드</label>
  <input id="admin-second-code" type="password" placeholder="2차 코드 입력">
</div>
            <button id="admin-login-button">로그인</button>
          </div>
        </div>
      `,document.querySelector(`#admin-login-button`).addEventListener(`click`,()=>{let e=document.querySelector(`#admin-password`).value,t=document.querySelector(`#admin-second-code`).value;e===qb&&t===Jb?(localStorage.setItem(`adminLogin`,`true`),window.location.reload()):alert(`비밀번호가 틀렸습니다`)});else{Z.innerHTML=`
        <div class="page">
          <div class="admin-card">
            <h1>관리자 페이지</h1>
            <div id="settlement-box"></div>
            
            <div class="search-box">
  <input
    id="payment-search"
    type="text"
    placeholder="주문번호 또는 이름 검색"
  >
</div>

           <div id="payment-list"></div>

<div class="sales-filter-buttons">
  <button id="sales-daily">일별 매출</button>
  <button id="sales-monthly">월별 매출</button>
  <button id="sales-yearly">연별 매출</button>
</div>

<div id="sales-summary"></div>
 
            <h2>생성된 행사 목록</h2>

<div class="event-filter-buttons">
  <button id="filter-all">전체</button>
  <button id="filter-wedding">결혼식</button>
  <button id="filter-funeral">장례식</button>
</div>

<div id="event-list"></div>
 <h2>가맹점 목록</h2>
<div id="merchant-list"></div> 
            <h2>QR 결제</h2>
            <canvas id="qr-canvas"></canvas>
  
            <button id="home-button">결제 페이지로</button>
            <button id="logout-button">로그아웃</button>
          </div>
        </div>
      `;let{data:e,error:t}=await X.from(`payments`).select(`*`).order(`created_at`,{ascending:!1}),{data:n,error:r}=await X.from(`merchants`).select(`*`).order(`created_at`,{ascending:!1}),i=document.querySelector(`#payment-list`),a=document.querySelector(`#event-list`),o=document.querySelector(`#merchant-list`);if(r?o.innerHTML=`<p>가맹점 목록 불러오기 실패: ${r.message}</p>`:o.innerHTML=`<p>등록된 가맹점 수: ${(n||[]).length}개</p>`,t)i.innerHTML=`<p>결제내역 불러오기 실패: ${t.message}</p>`;else if(!e||e.length===0)i.innerHTML=`<p>아직 결제내역이 없습니다.</p>`;else{let t=e.reduce((e,t)=>e+Number(t.amount),0),n=Math.floor(t*.02),r=t-n,a=new Date().toISOString().slice(0,10),o=e.filter(e=>new Date(e.created_at).toISOString().slice(0,10)===a),s=o.reduce((e,t)=>e+Number(t.amount),0);document.querySelector(`#settlement-box`).innerHTML=`
  <div class="dashboard-cards">

    <div class="dashboard-card">
      <p>총 결제금액</p>
      <h2>${t.toLocaleString()}원</h2>
    </div>

    <div class="dashboard-card">
      <p>플랫폼 수수료</p>
      <h2>${n.toLocaleString()}원</h2>
    </div>

    <div class="dashboard-card">
      <p>예상 정산금액</p>
      <h2>${r.toLocaleString()}원</h2>
    </div>

    <div class="dashboard-card">
  <p>오늘 결제건수</p>
  <h2>${o.length}건</h2>
</div>

<div class="dashboard-card">
  <p>오늘 결제금액</p>
  <h2>${s.toLocaleString()}원</h2>
</div>
  </div>
`,i.innerHTML=`
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>주문번호</th>
<th>금액</th>
<th>보낸 사람</th>
<th>메시지</th>
<th>상태</th>
<th>영수증</th>
<th>결제시간</th>
              </tr>
            </thead>
            <tbody>
              ${e.map(e=>`
                <tr>
            <td>${e.order_id}</td>
            <td>${Number(e.amount).toLocaleString()}원</td>
            <td>${e.sender_name||`-`}</td>
            <td>${e.message||`-`}</td>
            <td>
  ${e.order_status||`준비중`}

  ${e.order_status===`완료`?``:`
        <button
          class="complete-order-button"
          data-id="${e.id}"
        >
          완료
        </button>
      `}
</td>

<td>
  <button
    class="admin-receipt-btn"
    data-order="${e.order_id||``}"
    data-order-number="${e.order_number||``}"
    data-amount="${e.amount||0}"
    data-sender="${e.sender_name||``}"
    data-merchant="${e.merchant_name||``}"
    data-date="${e.created_at||``}"
  >
    보기
  </button>
</td>

<td>${new Date(e.created_at).toLocaleString(`ko-KR`)}</td>      
</tr>
              `).join(``)}
            </tbody>
          </table>
        </div>
 `,document.querySelectorAll(`.admin-receipt-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e,n=t.dataset.order||`-`,r=t.dataset.orderNumber||`-`,i=Number(t.dataset.amount||0),a=t.dataset.sender||`-`,o=t.dataset.merchant||`-`,s=t.dataset.date?new Date(t.dataset.date).toLocaleString(`ko-KR`):`-`;alert(`NXG PICK 영수증\\n\\n주문번호: `+r+`\\n주문ID: `+n+`\\n상점명: `+o+`\\n주문자명: `+a+`\\n결제금액: `+i.toLocaleString()+`원\\n결제일시: `+s)})}),document.querySelectorAll(`.complete-order-button`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`),{data:n,error:r}=await X.from(`payments`).update({order_status:`완료`}).eq(`id`,Number(t)).select();if(r){alert(`주문 상태 변경 실패: `+r.message);return}if(!n||n.length===0){alert(`변경된 데이터가 없습니다. RLS 또는 ID 문제입니다.`);return}alert(`완료 처리되었습니다`),location.reload()})});let c=document.querySelector(`#sales-summary`),l=t=>{let n=new Map;e.forEach(e=>{let r=new Date(e.created_at),i=``;t===`daily`&&(i=r.toISOString().slice(0,10)),t===`monthly`&&(i=r.toISOString().slice(0,7)),t===`yearly`&&(i=String(r.getFullYear()));let a=n.get(i)||0;n.set(i,a+Number(e.amount))}),c.innerHTML=`
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>기간</th>
            <th>매출</th>
          </tr>
        </thead>
        <tbody>
          ${Array.from(n.entries()).map(([e,t])=>`
            <tr>
              <td>${e}</td>
              <td>${t.toLocaleString()}원</td>
            </tr>
          `).join(``)}
        </tbody>
      </table>
    </div>
  `};document.querySelector(`#sales-daily`).addEventListener(`click`,()=>l(`daily`)),document.querySelector(`#sales-monthly`).addEventListener(`click`,()=>l(`monthly`)),document.querySelector(`#sales-yearly`).addEventListener(`click`,()=>l(`yearly`));let u=document.querySelector(`#payment-search`);u.addEventListener(`input`,()=>{let t=u.value.toLowerCase();i.innerHTML=`
          <div class="admin-table-wrap">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>주문번호</th>
<th>금액</th>
<th>보낸 사람</th>
<th>메시지</th>
<th>상태</th>
<th>처리</th>
<th>결제시간</th>
                </tr>
              </thead>
              <tbody>
                ${e.filter(e=>String(e.order_id).toLowerCase().includes(t)||String(e.status).toLowerCase().includes(t)).map(e=>`
                  <tr>
                    <td>${e.order_id}</td>
                    <td>${Number(e.amount).toLocaleString()}원</td>
                    <td>${e.sender_name||`-`}</td>
                    <td>${e.message||`-`}</td>
                    <td>${e.status}</td>
                    <td>${new Date(e.created_at).toLocaleString(`ko-KR`)}</td>
                  </tr>
                `).join(``)}
              </tbody>
            </table>
          </div>
        `})}let{data:s,error:c}=await X.from(`events`).select(`*`).order(`created_at`,{ascending:!1});if(c)a.innerHTML=`<p>행사 목록 불러오기 실패</p>`;else if(!s||s.length===0)a.innerHTML=`<p>생성된 행사가 없습니다.</p>`;else{a.innerHTML=`
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>행사명</th>
              <th>종류</th>
              <th>총 결제금액</th>
              <th>수수료</th>
              <th>정산금액</th>
              <th>은행명</th>
              <th>계좌번호</th>
              <th>예금주</th>
              <th>정산상태</th>
              <th>링크</th>
              <th>처리</th>
            </tr>
          </thead>
          <tbody>
            ${s.map(t=>{let n=(e||[]).filter(e=>e.event_id===t.id).reduce((e,t)=>e+Number(t.amount),0),r=Math.floor(n*.02),i=n-r,a=`${window.location.origin}/${t.event_type}?id=${t.id}`;return`
                <tr>
                  <td>${t.receiver_name}</td>
                  <td>${t.event_type===`funeral`?`장례식`:`결혼식`}</td>
                  <td>${n.toLocaleString()}원</td>
                  <td>${r.toLocaleString()}원</td>
                  <td>${i.toLocaleString()}원</td>
                  <td>${t.bank_name||`-`}</td>
                  <td>${t.account_number||`-`}</td>
                  <td>${t.account_holder||`-`}</td>
                  <td>${t.settlement_status||`정산 대기`}</td>
                  <td>
                    <a href="${a}" target="_blank">열기</a>
                  </td>
                  <td>
                    <button class="settlement-button" data-id="${t.id}">
                      완료
                    </button>
                  </td>
                </tr>
              `}).join(``)}
          </tbody>
        </table>
      </div>
    `;let t=t=>{a.innerHTML=`
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>행사명</th>
                <th>종류</th>
                <th>총 결제금액</th>
                <th>수수료</th>
                <th>정산금액</th>
                <th>은행명</th>
                <th>계좌번호</th>
                <th>예금주</th>
                <th>정산상태</th>
                <th>링크</th>
                <th>처리</th>
              </tr>
            </thead>
    
            <tbody>
              ${t.map(t=>{let n=(e||[]).filter(e=>e.event_id===t.id).reduce((e,t)=>e+Number(t.amount),0),r=Math.floor(n*.02),i=n-r,a=`${window.location.origin}/${t.event_type}?id=${t.id}`;return`
                  <tr>
                    <td>${t.receiver_name}</td>
                    <td>${t.event_type===`funeral`?`장례식`:`결혼식`}</td>
                    <td>${n.toLocaleString()}원</td>
                    <td>${r.toLocaleString()}원</td>
                    <td>${i.toLocaleString()}원</td>
                    <td>${t.bank_name||`-`}</td>
                    <td>${t.account_number||`-`}</td>
                    <td>${t.account_holder||`-`}</td>
                    <td>${t.settlement_status||`정산 대기`}</td>
    
                    <td>
                      <a href="${a}" target="_blank">열기</a>
                    </td>
    
                    <td>
                      <button class="settlement-button" data-id="${t.id}">
                        완료
                      </button>
                    </td>
                  </tr>
                `}).join(``)}
            </tbody>
          </table>
        </div>
      `};t(s),document.querySelector(`#filter-all`).addEventListener(`click`,()=>{t(s)}),document.querySelector(`#filter-wedding`).addEventListener(`click`,()=>{t(s.filter(e=>e.event_type===`wedding`))}),document.querySelector(`#filter-funeral`).addEventListener(`click`,()=>{t(s.filter(e=>e.event_type===`funeral`))}),document.querySelectorAll(`.settlement-button`).forEach(e=>{e.addEventListener(`click`,async e=>{let t=e.target.getAttribute(`data-id`),{error:n}=await X.from(`events`).update({settlement_status:`정산 완료`}).eq(`id`,t);if(n){alert(`정산 처리 실패`);return}alert(`정산 완료 처리되었습니다`),window.location.reload()})})}let l=document.getElementById(`qr-canvas`);await de.toCanvas(l,window.location.origin,{width:250}),document.querySelector(`#home-button`).addEventListener(`click`,()=>{window.location.href=`/`}),document.querySelector(`#logout-button`).addEventListener(`click`,()=>{localStorage.removeItem(`adminLogin`),window.location.reload()})}else if(Q===`/success`){let e=new URLSearchParams(window.location.search),t=e.get(`orderId`),n=e.get(`amount`),r=e.get(`paymentKey`);if(!t||!r||!n)Z.innerHTML=`
    <div class="page">
      <div class="payment-card">
        <h1>이미 처리된 주문입니다</h1>
        <button id="home-button">확인</button>
      </div>
    </div>
  `,document.querySelector(`#home-button`).addEventListener(`click`,()=>{window.location.href=`/`});else{let i=sessionStorage.getItem(`currentEventId`),a=sessionStorage.getItem(`currentEventType`),o=sessionStorage.getItem(`senderName`),s=sessionStorage.getItem(`message`),c=e.get(`source`),l=c===`hotel`&&sessionStorage.getItem(`hotel_room_number`)||``,u=c===`hotel`&&sessionStorage.getItem(`hotel_customer_request`)||``,d=e.get(`merchantId`)||sessionStorage.getItem(`merchantId`),f=e.get(`merchantName`)||sessionStorage.getItem(`merchantName`)||``,p=0,m=``,h=``;if(d){let{data:e}=await X.from(`merchants`).select(`
        fee_rate,
        merchant_name,
        merchant_type,
        toss_mid
      `).eq(`id`,Number(d)).maybeSingle();p=Number(e?.fee_rate||0),m=String(e?.merchant_type||``),h=String(e?.toss_mid||``),f||=e?.merchant_name||``}let g=Number(n),_=Math.floor(g*p/100),v=g-_,{count:y}=await X.from(`payments`).select(`*`,{count:`exact`,head:!0}),b=(y||0)+1,{data:x}=await X.from(`payments`).select(`id`).eq(`order_id`,t).maybeSingle();if(x)console.log(`이미 저장된 주문입니다.`);else{let a=await fetch(`/api/toss-confirm`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({paymentKey:r,orderId:t,amount:n})});if(!a.ok){let e=await a.json();throw alert(`결제 승인 실패 : `+(e.message||`알 수 없는 오류`)),Error(`토스 결제 승인 실패`)}let m=await a.json(),h={"3K":`기업비씨`,46:`광주`,71:`롯데`,30:`산업`,31:`BC`,51:`삼성`,38:`새마을`,41:`신한`,62:`신협`,36:`씨티`,33:`우리`,W1:`우리`,37:`우체국`,39:`저축`,35:`전북`,42:`제주`,15:`카카오뱅크`,"3A":`케이뱅크`,24:`토스뱅크`,21:`하나`,61:`현대`,11:`국민`,91:`농협`,34:`수협`},y=m.card?.acquirerCode||m.card?.issuerCode||``,x=h[y]||y,{error:S}=await X.from(`payments`).insert([{order_number:b,order_id:t,payment_key:r,amount:g,fee_rate:p,fee_amount:_,settlement_amount:v,status:`paid`,event_id:i?Number(i):null,sender_name:o,message:s,merchant_id:d?Number(d):null,merchant_name:f,room_number:l||null,pg_company:e.get(`pg`)||sessionStorage.getItem(`selected_pg_company`)||`토스페이먼츠`,payment_method:m.method||`카드`,approval_number:m.card?.approveNo||``,card_company:x,card_number:m.card?.number||``,installment_months:m.card?.installmentPlanMonths?String(m.card.installmentPlanMonths):`일시불`,approved_at:m.approvedAt||new Date().toISOString()}]);if(alert(S?`DB 저장 실패: `+S.message:`DB 저장 성공`),c===`kiosk`){let e=sessionStorage.getItem(`kiosk_order_no`),t=sessionStorage.getItem(`kiosk_merchant_id`),n=sessionStorage.getItem(`kiosk_items`),r=sessionStorage.getItem(`kiosk_total_amount`),i=sessionStorage.getItem(`kiosk_call_number`);if(e&&t&&r){let a=n?JSON.parse(n):[];await X.from(`orders`).insert({merchant_id:Number(t),order_no:i||`-`,call_number:i?Number(i):null,pg_order_id:e.replace(/[^a-zA-Z0-9]/g,``),customer_name:sessionStorage.getItem(`beauty_customer_name`)||null,customer_phone:sessionStorage.getItem(`beauty_customer_phone`)||null,items:a,total_amount:Number(r),order_status:`접수`,payment_status:`결제완료`}),sessionStorage.removeItem(`kiosk_order_no`),sessionStorage.removeItem(`kiosk_merchant_id`),sessionStorage.removeItem(`kiosk_items`),sessionStorage.removeItem(`kiosk_total_amount`)}}if(c===`hotel`){let e=sessionStorage.getItem(`hotel_items`),n=sessionStorage.getItem(`hotel_room_number`)||``,i=e?JSON.parse(e):[];if(d&&n&&i.length>0){let{error:e}=await X.from(`orders`).insert({merchant_id:Number(d),order_no:String(b),pg_order_id:t,payment_key:r,room_number:n,customer_request:u||null,items:i,total_amount:g,order_status:`접수`,payment_status:`결제완료`});e?alert(`호텔 주문 저장 실패: `+e.message):(sessionStorage.removeItem(`hotel_items`),sessionStorage.removeItem(`hotel_room_number`),sessionStorage.removeItem(`hotel_customer_request`))}}}window.history.replaceState({},``,`/success`);let S=c===`hotel`,C=m===`뷰티`,w=S?`<span style="display:block;">결제가</span><span style="display:block;">완료되었습니다</span>`:a===`funeral`?`<span style="display:block;">명복을 빌어 주셔서</span><span style="display:block;">감사합니다.</span>`:`<span style="display:block;">주문이</span><span style="display:block;">접수되었습니다</span>`,T=S?`
      <p class="hotel-success-room">
        ROOM ${l||`-`}
      </p>
    `:``;Z.innerHTML=`
    <div class="page ${S?`hotel-success-page`:``}">
  <div class="payment-card ${S?`hotel-success-card`:``}">

  <h1>
    ${w}
  </h1>

  ${T}

  <p class="order-number-title">
    주문번호
  </p>

  <div class="order-number-box">
    ${b}번
  </div>

  ${S?`
      <p class="order-wait-message hotel-success-message">
        객실 추가결제가 정상 접수되었습니다.<br>
        요청하신 상품은 객실로 전달됩니다.
      </p>
    `:`
      <p class="order-wait-message">
        고객 호출 시까지<br>
        잠시만 기다려주세요.
      </p>
    `}

  <button
    id="receipt-view-btn"
    class="receipt-view-btn ${S?`hotel-success-receipt-button`:C?`beauty-success-receipt-button`:``}"
  >
    영수증 확인
  </button>

<p class="payment-amount">
  결제금액 : ${Number(n).toLocaleString()}원
</p>
        <button
  id="home-button"
  class="${S?`hotel-success-home-button`:``}"
>
  확인
</button>
        
       <div id="receipt-modal" class="receipt-modal">
  <div class="receipt-box receipt-approve">

    <div class="receipt-header">
      <h2>NXG PICK</h2>
      <h3>신용카드 매출전표 <span>(승인)</span></h3>
    </div>

    <section>
      <h4>결제정보</h4>
      <table>
        <tr>
          <th>카드번호</th>
          <td>결제사 제공값</td>
          <th>카드종류</th>
          <td>신용카드</td>
        </tr>
        <tr>
          <th>거래종류</th>
          <td>승인성공</td>
          <th>할부개월</th>
          <td>일시불</td>
        </tr>
        <tr>
          <th>거래일시</th>
          <td colspan="3">${new Date().toLocaleString()}</td>
        </tr>
      </table>
    </section>

    <div class="receipt-grid">
      <section>
        <h4>구매정보</h4>
        <table>
          <tr><th>주문자명</th><td>${o||`-`}</td></tr>
          <tr><th>승인번호</th><td>결제사 제공값</td></tr>
          <tr><th>주문번호</th><td>${b}</td></tr>
          <tr><th>상품명 / 구매자</th><td>${f||`-`}</td></tr>
        </table>
      </section>

      <section>
        <h4>결제금액정보</h4>
        <table>
          <tr>
            <th>과세금액</th>
            <td>${Math.floor(Number(n)/1.1).toLocaleString()}원</td>
          </tr>
          <tr>
            <th>비과세금액</th>
            <td>0원</td>
          </tr>
          <tr>
            <th>부가세</th>
            <td>${(Number(n)-Math.floor(Number(n)/1.1)).toLocaleString()}원</td>
          </tr>
          <tr>
            <th>주문금액</th>
            <td>${Number(n).toLocaleString()}원</td>
          </tr>
          <tr>
            <th>할인금액</th>
            <td>0원</td>
          </tr>
          <tr class="receipt-total">
            <th>총 결제금액</th>
            <td>${Number(n).toLocaleString()}원</td>
          </tr>
        </table>
      </section>
    </div>

    <section>
      <h4>상점정보</h4>
      <table>
        <tr>
          <th>상점명</th>
          <td>${f||`-`}</td>
          <th>대표자명</th>
          <td>-</td>
        </tr>
        <tr>
          <th>URL주소</th>
          <td>-</td>
          <th>사업자번호</th>
          <td>-</td>
        </tr>
        <tr>
          <th>이용/환불문의</th>
          <td colspan="3">-</td>
        </tr>
        <tr>
          <th>주소</th>
          <td colspan="3">-</td>
        </tr>
      </table>
    </section>

    <section>
  <h4>결제서비스업체(PG)정보</h4>

  <table>
    <tr>
      <th style="width:180px">
        카드사 가맹점명
      </th>

      <td>
        토스페이먼츠
      </td>

      <th style="width:140px">
        사업자번호
      </th>

      <td style="width:180px">
        411-86-01799
      </td>
    </tr>

    <tr>
      <th>
        대표자명
      </th>

      <td>
        임한욱
      </td>

      <th>
        가맹점번호
      </th>

      <td style="width:180px">
        ${h||`-`}
      </td>
    </tr>

    <tr>
      <th>
        주소
      </th>

      <td colspan="3">
        서울특별시 강남구 테헤란로 131, 14층
      </td>
    </tr>
  </table>
</section>

    <div class="receipt-notice">
      * 신용카드 청구서에는 실제 결제 PG사명으로 표시됩니다.<br>
      * 본 매출전표는 부가가치세법 기준에 따라 발행되었습니다.
    </div>

    <div class="receipt-actions">
      <button>이메일 발송</button>
      <button onclick="window.print()">인쇄하기</button>
      <button id="receipt-close-btn">닫기</button>
    </div>
</div>
  </div>
</div>
    </div>
  `,document.querySelector(`#home-button`).addEventListener(`click`,()=>{let e=sessionStorage.getItem(`merchantId`)||sessionStorage.getItem(`kiosk_merchant_id`);if(c===`hotel`&&e&&l){window.location.href=`/hotel?merchant_id=`+e+`&room=`+encodeURIComponent(l);return}if(e){window.location.href=`/kiosk?merchant_id=`+e;return}window.location.href=`/merchant-login`}),document.querySelector(`#receipt-view-btn`)?.addEventListener(`click`,()=>{document.querySelector(`#receipt-modal`).style.display=`flex`}),document.querySelector(`#receipt-close-btn`)?.addEventListener(`click`,()=>{document.querySelector(`#receipt-modal`).style.display=`none`})}}else if(Q===`/fail`){let e=new URLSearchParams(window.location.search);Z.innerHTML=`
    <div class="page">
      <div class="payment-card">
        <h1>결제 실패</h1>
        <p>에러 코드: ${e.get(`code`)}</p>
        <p>${e.get(`message`)}</p>
        <button id="home-button">처음으로</button>
      </div>
    </div>
  `,document.querySelector(`#home-button`).addEventListener(`click`,()=>{window.location.href=`/`})}else if(Q===`/admin-login`||Q===`/`)Z.innerHTML=`
  <div class="nxg-login-page">
    <div class="nxg-login-left">
      <div class="nxg-logo">NXG SOFT</div>
      <h1>
        결제부터 정산까지,<br/>
        통합 정산 솔루션
      </h1>
      <p>
        가맹점 결제와 주문, 정산을 한 곳에서 관리하는<br/>
        NXG 관리자 시스템입니다.
      </p>

      <div class="nxg-login-features">
        <div>통합관리</div>
        <div>QR결제</div>
        <div>주문관리</div>
        <div>자동정산</div>
      </div>
    </div>

    <div class="nxg-login-card">
    <div class="nxg-admin-badge">NXG PAYMENT ADMIN</div>  
    <h2>관리자 로그인</h2>

      <input id="admin-login-id" placeholder="아이디" />
      <input id="admin-login-password" type="password" placeholder="비밀번호" />

      <button id="admin-login-button">
        로그인
      </button>
      <button id="go-merchant-apply-button" class="merchant-join-button">
  신규 가입
</button>

      <div class="nxg-login-footer">
        NXG Payment Admin System
      </div>
    </div>
  </div>

  `,document.querySelector(`#admin-login-button`)?.addEventListener(`click`,async()=>{let e=(document.querySelector(`#admin-login-id`)?.value||``).trim().toUpperCase(),t=(document.querySelector(`#admin-login-password`)?.value||``).trim(),{data:n,error:r}=await X.from(`admin_users`).select(`*`).eq(`login_id`,e).eq(`password`,t).eq(`status`,`사용중`).single();if(n&&!r){sessionStorage.setItem(`admin_id`,n.login_id),sessionStorage.setItem(`admin_name`,n.admin_name||``),sessionStorage.setItem(`admin_role`,n.role||``),location.replace(`/pg-admin`);return}alert(`아이디 또는 비밀번호가 올바르지 않습니다.`)}),document.querySelector(`#go-merchant-apply-button`)?.addEventListener(`click`,()=>{location.href=`/merchant-apply`});else if(Q===`/pg-admin`){history.pushState(null,``,`/pg-admin`),window.onpopstate=()=>{history.pushState(null,``,`/pg-admin`)},sessionStorage.getItem(`admin_id`)||location.replace(`/admin-login`);let e=sessionStorage.getItem(`admin_id`)||``,t=sessionStorage.getItem(`admin_role`)||``;Z.innerHTML=`
      <div class="admin-wrap">
        <div class="admin-top-user">
          ${e}
          <span id="admin-logout" style="cursor:pointer;">
            | 로그아웃
          </span>
        </div>
  
        <div class="admin-menu">

  <a class="admin-tab" data-page="merchant">가맹점관리</a>
  <a class="admin-tab" data-page="payment">결제관리</a>

  ${t===`MANAGER`?``:t===`AGENCY`||t===`BRANCH`?`
          <a class="admin-tab" data-page="organization">조직관리</a>
        `:`
          <a class="admin-tab" data-page="payout">출금관리</a>
          <a class="admin-tab" data-page="tax">세무관리</a>
          <a class="admin-tab" data-page="organization">조직관리</a>
        `}

</div>
  
        <div class="admin-sub-menu">
  업체/가맹점 등록 | 결제 수수료 설정
</div>

<div class="admin-title">
  ▶ 가맹점관리 > 가맹점 관리
</div>

<div class="admin-search-box"></div>

<div class="admin-summary"></div>

<div class="admin-table-top">
  <button>엑셀 다운로드</button>

  <select id="admin-page-size">
    <option value="10">10개씩 보기</option>
    <option value="20">20개씩 보기</option>
    <option value="50">50개씩 보기</option>
    <option value="100">100개씩 보기</option>
  </select>
</div>

<div class="admin-table-scroll">
  <table class="admin-table">
    <thead>
      <tr>
        <th>승인일</th>
        <th>승인번호</th>
        <th>가맹점</th>
        <th>주문번호</th>
        <th>결제키</th>
        <th>상태</th>
        <th>금액</th>
      </tr>
    </thead>
    <tbody id="paymentTableBody"></tbody>
  </table>
</div>
</div>
`,document.querySelector(`.admin-table-scroll`)?.classList.add(`payment-table-scroll`),document.querySelector(`.admin-table`)?.classList.add(`payment-admin-table`);function n(e){return e?new Date(e).toLocaleString(`ko-KR`,{year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,second:`2-digit`}):`-`}function i(e){return e===`paid`?`승인`:e===`cancel`?`취소`:e===`ready`?`대기`:e||`-`}document.querySelector(`#admin-logout`)?.addEventListener(`click`,()=>{confirm(`로그아웃 하시겠습니까?`)&&(sessionStorage.removeItem(`admin_id`),sessionStorage.removeItem(`admin_name`),sessionStorage.removeItem(`admin_role`),location.href=`/admin-login`)});let a=window;a.cancelApproveClickReady||(a.cancelApproveClickReady=!0,document.addEventListener(`click`,async e=>{let t=e.target;if(!t.classList.contains(`cancel-approve-btn`))return;if((sessionStorage.getItem(`admin_id`)||``)!==`NXGMASTER16`){alert(`결제취소 승인은 대표관리자만 처리할 수 있습니다.`);return}let n=Number(t.dataset.id);if(!n){alert(`취소요청 ID를 찾을 수 없습니다.`);return}if(!confirm(`취소 승인 처리하시겠습니까?`))return;let{data:r,error:i}=await X.from(`cancel_requests`).select(`*`).eq(`id`,n).single();if(i||!r){alert(`취소요청 정보를 찾지 못했습니다.`);return}let{error:a}=await X.from(`payments`).update({status:`cancel`,canceled_at:new Date().toISOString()}).eq(`id`,Number(r.payment_id));if(a){alert(`결제 취소 처리 실패: `+a.message);return}let{error:o}=await X.from(`cancel_requests`).update({status:`승인`}).eq(`id`,n);if(o){alert(`취소요청 상태 변경 실패: `+o.message);return}alert(`취소 승인 처리되었습니다.`),location.reload()}));let s=document.querySelectorAll(`.admin-tab`),c=sessionStorage.getItem(`adminPage`)||`merchant`;requestAnimationFrame(()=>{let e=document.querySelector(`.admin-tab[data-page="`+c+`"]`);e?e.click():document.querySelector(`.admin-tab[data-page="merchant"]`)?.click()}),s.forEach(a=>{a.addEventListener(`click`,async()=>{s.forEach(e=>{e.classList.remove(`active`)}),a.classList.add(`active`);let c=a.getAttribute(`data-page`);if(c&&sessionStorage.setItem(`adminPage`,c),c===`tax`){let e=document.querySelector(`.admin-sub-menu`),t=document.querySelector(`.admin-title`),n=document.querySelector(`.admin-search-box`),i=document.querySelector(`.admin-summary`),a=document.querySelector(`.admin-table-top`),s=document.querySelector(`.admin-table thead`),c=document.querySelector(`#paymentTableBody`);e&&(e.innerHTML=``),t&&(t.innerHTML=`▶ 세무관리`),n&&(n.innerHTML=``),a&&(a.innerHTML=``),s&&(s.innerHTML=``),c&&(c.innerHTML=``),i&&(i.innerHTML=`<div class="merchant-detail-header"><h2>세무관리</h2></div><div class="merchant-detail-section"><h3>헤더레코드 설정</h3><div class="merchant-detail-grid"><label>회사코드</label><select id="tax-company-code"><option value="NXGSOFT">NXGSOFT(nxgsoft)</option></select><label>결제년도</label><input id="tax-year" value="2026" maxlength="4" /><label>분기구분</label><select id="tax-quarter"><option value="1">1분기</option><option value="2" selected>2분기</option><option value="3">3분기</option><option value="4">4분기</option></select><label>관할서코드</label><input id="tax-office-code" value="119" /><label>제출년월일</label><input id="tax-submit-date" type="date" value="2026-07-08" /><label>사업자등록번호</label><input id="tax-business-number" value="2458101732" /><label>사업자상호</label><input id="tax-business-name" value="NXGSOFT" /><label>사업자상호 영문명</label><input id="tax-business-name-en" value="NXGSOFT" /><label>결제기간시작년월일</label><input id="tax-period-start" type="date" value="2026-04-01" /><label>결제기간종료년월일</label><input id="tax-period-end" type="date" value="2026-06-30" /><label>의뢰업체 전화번호</label><input id="tax-company-phone" value="024311252" /><label>의뢰업체 휴대폰번호</label><input id="tax-company-mobile" value="01099382962" /><label>의뢰업체 E-mail주소</label><input id="tax-company-email" value="nxgsoft@naver.com" /><label>공급자 성명</label><input id="tax-supplier-name" value="유상균" /><label>공급자 사업장주소</label><input id="tax-supplier-address" value="서울시 금천구 가산디지털2로34, 2층 211-4" /><label>공급자 업태</label><input id="tax-supplier-business-type" value="정보통신업" /><label>공급자 종목</label><input id="tax-supplier-business-item" value="소프트웨어개발 및 개발용역업" /></div><div class="merchant-detail-actions"><button id="tax-header-save-button" class="merchant-save-btn">수정하기</button></div></div><div class="tax-download-row"><div class="tax-download-title">수수료 세금계산서</div><button type="button" id="tax-excel-download-button" class="merchant-save-btn tax-download-button">내려받기</button></div><div class="tax-download-row"><div class="tax-download-title">전산매체신고양식</div><button id="tax-text-download-button" class="merchant-save-btn tax-download-button">내려받기</button></div>`);let l=e=>(document.querySelector(e)?.value||``).trim(),u=(e,t)=>{let n=document.querySelector(e);n&&t!=null&&(n.value=String(t))};(async()=>{let{data:e,error:t}=await X.from(`tax_header_settings`).select(`*`).order(`id`,{ascending:!1}).limit(1).maybeSingle();if(t){alert(`헤더레코드 불러오기 실패: `+t.message);return}e&&(u(`#tax-company-code`,e.company_code),u(`#tax-year`,e.payment_year),u(`#tax-quarter`,e.quarter),u(`#tax-office-code`,e.office_code),u(`#tax-submit-date`,e.submit_date),u(`#tax-business-number`,e.business_number),u(`#tax-business-name`,e.business_name),u(`#tax-business-name-en`,e.business_name_en),u(`#tax-period-start`,e.period_start),u(`#tax-period-end`,e.period_end),u(`#tax-company-phone`,e.company_phone),u(`#tax-company-mobile`,e.company_mobile),u(`#tax-company-email`,e.company_email),u(`#tax-supplier-name`,e.supplier_name),u(`#tax-supplier-address`,e.supplier_address),u(`#tax-supplier-business-type`,e.supplier_business_type),u(`#tax-supplier-business-item`,e.supplier_business_item))})(),document.querySelector(`#tax-header-save-button`)?.addEventListener(`click`,async()=>{let e={company_code:l(`#tax-company-code`),tax_year:Number(l(`#tax-year`)),quarter:Number(l(`#tax-quarter`)),tax_office_code:l(`#tax-office-code`),submission_date:l(`#tax-submit-date`),business_number:l(`#tax-business-number`),company_name:l(`#tax-business-name`),company_name_english:l(`#tax-business-name-en`),period_start:l(`#tax-period-start`),period_end:l(`#tax-period-end`),company_phone:l(`#tax-company-phone`),manager_phone:l(`#tax-company-mobile`),manager_email:l(`#tax-company-email`),representative_name:l(`#tax-supplier-name`),business_address:l(`#tax-supplier-address`),business_type:l(`#tax-supplier-business-type`),business_item:l(`#tax-supplier-business-item`),updated_at:new Date().toISOString()},{data:t,error:n}=await X.from(`tax_header_settings`).select(`id`).order(`id`,{ascending:!1}).limit(1).maybeSingle();if(n){alert(`헤더레코드 확인 실패: `+n.message);return}if(t?.id){let{error:n}=await X.from(`tax_header_settings`).update(e).eq(`id`,t.id);if(n){alert(`헤더레코드 수정 실패: `+n.message);return}}else{let{error:t}=await X.from(`tax_header_settings`).insert(e);if(t){alert(`헤더레코드 저장 실패: `+t.message);return}}alert(`헤더레코드가 저장되었습니다.`)});let d=document.querySelector(`#tax-excel-download-button`);if(!d){alert(`수수료 세금계산서 내려받기 버튼을 찾지 못했습니다.`);return}d.onclick=async()=>{let e=e=>String(e||``).replace(/-/g,``).replace(/\s/g,``).trim(),t=l(`#tax-period-start`).replace(/-/g,``),n=l(`#tax-period-end`).replace(/-/g,``),r=l(`#tax-submit-date`).replace(/-/g,``),i=e(l(`#tax-business-number`)),a=l(`#tax-business-name`),o=l(`#tax-supplier-name`),s=l(`#tax-supplier-address`),c=l(`#tax-supplier-business-type`),u=l(`#tax-supplier-business-item`),d=l(`#tax-company-email`);if(!t||!n){alert(`결제기간 시작일과 종료일을 선택해주세요.`);return}if(r.length!==8){alert(`제출년월일을 정확히 입력해주세요.`);return}if(!i){alert(`공급자 사업자등록번호를 입력해주세요.`);return}let f=t.slice(0,4)+`-`+t.slice(4,6)+`-`+t.slice(6,8)+`T00:00:00`,p=n.slice(0,4)+`-`+n.slice(4,6)+`-`+n.slice(6,8)+`T23:59:59.999`,{data:m,error:h}=await X.from(`payments`).select(`merchant_id, merchant_name, fee_amount, status, created_at`).eq(`status`,`paid`).gte(`created_at`,f).lte(`created_at`,p);if(h){alert(`결제내역 조회 실패: `+h.message);return}if(!m||m.length===0){alert(`선택한 기간에 승인된 결제내역이 없습니다.`);return}let g=[...new Set(m.map(e=>Number(e.merchant_id)).filter(e=>e>0))];if(g.length===0){alert(`가맹점과 연결된 결제내역이 없습니다.`);return}let{data:_,error:v}=await X.from(`merchants`).select(`*`).in(`id`,g);if(v){alert(`가맹점 정보 조회 실패: `+v.message);return}let y=new Map;(_||[]).forEach(e=>{y.set(Number(e.id),e)});let b=new Map,x=0;if(m.forEach(e=>{let t=Number(e.merchant_id);if(!t){x+=1;return}let n=y.get(t);if(!n){x+=1;return}let r=b.get(t);r?r.feeTotal+=Number(e.fee_amount||0):b.set(t,{merchant:n,feeTotal:Number(e.fee_amount||0)})}),b.size===0){alert(`가맹점 정보와 연결된 결제내역이 없습니다.`);return}let S;try{S=await fetch(`/tax-template.xlsx`,{cache:`no-store`})}catch{alert(`세금계산서 원본 양식 파일을 불러오지 못했습니다.`);return}if(!S.ok){alert(`세금계산서 원본 양식 파일을 찾을 수 없습니다.

public 폴더에 아래 파일이 있는지 확인해주세요.
tax-template.xlsx`);return}let C=Jy(await S.arrayBuffer(),{type:`array`,cellStyles:!0,cellDates:!1}),w=C.Sheets.Sheet1;if(!w){alert(`원본 양식에서 Sheet1을 찾을 수 없습니다.`);return}if(wb.decode_range(w[`!ref`]||`A1:BG1`).e.c!==58){alert(`원본 세금계산서 양식의 항목 수가 다릅니다.
반드시 보내준 원본 파일을 사용해주세요.`);return}let T=`전자(세금)계산서종류
(01:일반, 02:영세율).작성일자.공급자 등록번호
('-'없이 입력).공급자
종사업장번호.공급자 상호.공급자 성명.공급자 사업장주소.공급자 업태.공급자 종목.공급자 이메일.공급받는자 등록번호
('-'없이 입력).공급받는자
종사업장번호.공급받는자 상호.공급받는자 성명.공급받는자 사업장주소.공급받는자 업태.공급받는자 종목.공급받는자 이메일1.공급받는자 이메일2.공급가액.세액.비고.일자1
(2자리,작성년월 제외).품목1.규격1.수량1.단가1.공급가액1.세액1.물품비고1.일자2
(2자리,작성년월 제외).품목2.규격2.수량2.단가2.공급가액2.세액2.물품비고2.일자3
(2자리,작성년월 제외).품목3.규격3.수량3.단가3.공급가액3.세액3.물품비고3.일자4
(2자리,작성년월 제외).품목4.규격4.수량4.단가4.공급가액4.세액4.물품비고4.현금.수표.어음.외상미수금.영수(01)
청구(02)`.split(`.`);for(let e=0;e<T.length;e+=1){let t=wb.encode_cell({r:0,c:e});if(String(w[t]?.v??``)!==T[e]){alert(`원본 양식의 제목이 변경되어 있습니다.

위치: `+t+`
반드시 보내준 원본 파일을 다시 넣어주세요.`);return}}let E={};for(let e=0;e<59;e+=1){let t=w[wb.encode_cell({r:1,c:e})];t?.s&&(E[e]=JSON.parse(JSON.stringify(t.s)))}Object.keys(w).forEach(e=>{e.startsWith(`!`)||wb.decode_cell(e).r>=1&&delete w[e]});let D=r.slice(6,8),O=Array.from(b.values()).sort((e,t)=>{let n=String(e.merchant.merchant_name||``),r=String(t.merchant.merchant_name||``);return n.localeCompare(r,`ko`)}).map(({merchant:t,feeTotal:n})=>{let l=Math.round(Number(n||0)/1.1),f=Number(n||0)-l,p=e(t.business_number||t.resident_number),m=[t.address||``,t.address_detail||``].filter(Boolean).join(` `).trim();return[`01`,r,i,``,a,o,s,c,u,d,p,``,t.merchant_name||``,t.owner_name||``,m,t.business_type||``,t.business_category||``,t.email||``,``,l,f,``,D,`결제승인수수료`,``,``,``,l,f,``,``,``,``,``,``,``,``,``,``,``,``,``,``,``,``,``,``,``,``,``,``,``,``,``,``,``,``,``,`01`]}),k=(e,t,n)=>{let r=wb.encode_cell({r:e,c:t});w[r]={t:typeof n==`number`?`n`:`s`,v:n};let i=E[t];i&&(w[r].s=JSON.parse(JSON.stringify(i))),(t===2||t===10)&&(w[r].t=`s`,w[r].z=`@`)};if(O.forEach((e,t)=>{let n=t+1;for(let t=0;t<59;t+=1)k(n,t,e[t]??``)}),w[`!ref`]=`A1:BG`+String(O.length+1),w[`!rows`]?.[1]){let e=JSON.parse(JSON.stringify(w[`!rows`][1]));w[`!rows`]=w[`!rows`]||[],O.forEach((t,n)=>{w[`!rows`][n+1]=JSON.parse(JSON.stringify(e))})}ib(C,`수수료세금계산서_`+t+`_`+n+`.xlsx`,{cellStyles:!0,bookType:`xlsx`});let A=`수수료 세금계산서가 생성되었습니다.

생성 가맹점: `+O.length+`곳`;x>0&&(A+=`
가맹점 정보 미연결: `+x+`건 제외`),alert(A)};let f=document.querySelector(`#tax-text-download-button`);if(!f){alert(`전산매체신고 내려받기 버튼을 찾지 못했습니다.`);return}f.onclick=async()=>{let e=e=>String(e||``).replace(/[^0-9]/g,``).trim(),t=e(l(`#tax-year`)),n=e(l(`#tax-quarter`)),i=e(l(`#tax-office-code`)),a=e(l(`#tax-submit-date`)),s=e(l(`#tax-business-number`)),c=l(`#tax-business-name`).trim(),u=e(l(`#tax-period-start`)),d=e(l(`#tax-period-end`)),f=e(l(`#tax-company-phone`)),p=e(l(`#tax-company-mobile`)),m=l(`#tax-company-email`).trim();if(t.length!==4){alert(`귀속연도를 4자리로 입력해주세요.`);return}if(![`1`,`2`,`3`,`4`].includes(n)){alert(`분기를 1~4 중에서 선택해주세요.`);return}if(i.length!==3){alert(`관할서코드를 3자리로 입력해주세요.`);return}if(a.length!==8){alert(`제출년월일을 정확히 입력해주세요.`);return}if(s.length!==10){alert(`사업자등록번호를 정확히 입력해주세요.`);return}if(!c){alert(`사업자상호를 입력해주세요.`);return}if(u.length!==8||d.length!==8){alert(`결제기간 시작일과 종료일을 선택해주세요.`);return}let h;try{let e=await o(()=>import(`./buffer-CrNaw1tJ.js`).then(e=>r(e.default,1)),__vite__mapDeps([0,1,2]));globalThis.Buffer=e.Buffer;let t=await o(()=>import(`./lib-DjzcyrWH.js`).then(e=>r(e.default,1)),__vite__mapDeps([3,2,1]));h=t.default||t}catch(e){console.error(e),alert(`TXT 인코딩 모듈을 불러오지 못했습니다.

터미널에서 npm install iconv-lite buffer 를 실행해주세요.`);return}let g=e=>h.encode(e,`cp949`).length,_=(e,t)=>{let n=String(e||``),r=``;for(let e of n){let n=r+e;if(g(n)>t)break;r=n}let i=g(r);return r+` `.repeat(Math.max(0,t-i))},v=(t,n)=>{let r=e(t);return r.length>=n?r.slice(-n):r.padStart(n,`0`)},y=t=>{let n=String(t.merchant_login_id||t.cpid||t.id||``).trim(),r=e(n);return n.startsWith(`MER`)||n.startsWith(`CPID`),(`CPID`+r.padStart(8,`0`)).slice(0,12)},b=u.slice(0,4)+`-`+u.slice(4,6)+`-`+u.slice(6,8)+`T00:00:00`,x=d.slice(0,4)+`-`+d.slice(4,6)+`-`+d.slice(6,8)+`T23:59:59.999`,{data:S,error:C}=await X.from(`payments`).select([`merchant_id`,`amount`,`status`,`approved_at`,`created_at`].join(`,`)).eq(`status`,`paid`).gte(`created_at`,b).lte(`created_at`,x),{data:w,error:T}=await X.from(`cash_receipts`).select([`merchant_id`,`amount`,`status`,`issued_at`].join(`,`)).eq(`status`,`발급완료`).gte(`issued_at`,b).lte(`issued_at`,x);if(T){alert(`TXT 현금영수증 조회 실패: `+T.message);return}if(C){alert(`TXT 결제내역 조회 실패: `+C.message);return}if((!S||S.length===0)&&(!w||w.length===0)){alert(`선택한 신고기간에 승인된 카드결제 또는 현금영수증 내역이 없습니다.`);return}let E=[...new Set([...(S||[]).map(e=>Number(e.merchant_id||0)),...(w||[]).map(e=>Number(e.merchant_id||0))].filter(e=>e>0))];if(E.length===0){alert(`가맹점과 연결된 결제내역이 없습니다.`);return}let{data:D,error:O}=await X.from(`merchants`).select(`*`).in(`id`,E);if(O){alert(`TXT 가맹점 정보 조회 실패: `+O.message);return}let k=new Map;(D||[]).forEach(e=>{k.set(Number(e.id),e)});let A=new Map,j=0;S.forEach(e=>{let t=Number(e.merchant_id||0),n=k.get(t);if(!t||!n){j+=1;return}let r=String(e.approved_at||e.created_at||``).slice(0,7).replace(/-/g,``);if(r.length!==6){j+=1;return}let i=String(t)+`-`+r,a=A.get(i);a?(a.paymentCount+=1,a.paymentAmount+=Number(e.amount||0)):A.set(i,{merchant:n,paymentMonth:r,paymentCount:1,paymentAmount:Number(e.amount||0)})});let M=new Map;if((w||[]).forEach(e=>{let t=Number(e.merchant_id||0),n=k.get(t);if(!t||!n){j+=1;return}let r=String(e.issued_at||``).slice(0,7).replace(/-/g,``);if(r.length!==6){j+=1;return}let i=String(t)+`-`+r,a=M.get(i);a?(a.paymentCount+=1,a.paymentAmount+=Number(e.amount||0)):M.set(i,{merchant:n,paymentMonth:r,paymentCount:1,paymentAmount:Number(e.amount||0)})}),A.size===0&&M.size===0){alert(`TXT에 작성할 카드 또는 현금영수증 매출자료가 없습니다.`);return}let N=`HD`+v(t,4)+v(n,1)+v(i,3)+v(a,8)+v(s,10)+_(c,40)+v(u,8)+v(d,8)+_(``,146),P=g(N);if(P!==230){alert(`HD 길이 오류

현재 길이: `+P+`바이트`);return}let F=[...Array.from(A.values()).map(e=>({...e,recordType:`C`})),...Array.from(M.values()).map(e=>({...e,recordType:`6`}))].sort((t,n)=>{let r=e(t.merchant.business_number||t.merchant.resident_number),i=e(n.merchant.business_number||n.merchant.resident_number),a=r.localeCompare(i);if(a!==0)return a;let o=t.paymentMonth.localeCompare(n.paymentMonth);return o===0?t.recordType===n.recordType?0:t.recordType===`C`?-1:1:o}),I=[N],L=1,R=0,ee=0,te=new Set;for(let r of F){let i=e(r.merchant.business_number),a=e(r.merchant.resident_number),o=i.length===10,l=!o&&a.length===13;if(!o&&!l){j+=r.paymentCount;continue}let u=o?i+` `.repeat(13):`**********`+a,d=String(r.merchant.owner_name||r.merchant.merchant_name||``).trim(),h=y(r.merchant),b=Number(r.paymentCount||0),x=Math.round(Number(r.paymentAmount||0)),S=`RD`+v(t,4)+v(n,1)+v(s,10)+v(L,7)+u+_(d,20)+_(h,12)+v(r.paymentMonth,6)+` `+v(b,6)+v(0,12)+v(0,12)+v(x*1e4,12)+v(x,12)+_(c,20)+v(f,11)+`  `+v(p,11)+_(m,40)+r.recordType+` `.repeat(5),C=g(S);if(C!==230){alert(`RD 길이 오류

가맹점: `+d+`
결제년월: `+r.paymentMonth+`
현재 길이: `+C+`바이트`);return}I.push(S),te.add(Number(r.merchant.id)),R+=b,ee+=x,L+=1}if(I.length===1){alert(`사업자번호 또는 주민번호가 등록된 가맹점이 없습니다.`);return}let ne=`TD`+v(t,4)+v(n,1)+v(s,10)+v(te.size,7)+`35`+v(R,8)+v(0,18)+v(ee,16)+v(ee,15)+v(R,8)+v(ee,16)+_(``,123),re=g(ne);if(re!==230){alert(`TD 길이 오류

현재 길이: `+re+`바이트`);return}I.push(ne);let ie=I.join(`\r
`),z=h.encode(ie,`cp949`),B=new Blob([new Uint8Array(z)],{type:`text/plain`}),ae=`A_`+s+`_`+t+n+`_1.txt`,oe=URL.createObjectURL(B),V=document.createElement(`a`);V.href=oe,V.download=ae,document.body.appendChild(V),V.click(),document.body.removeChild(V),URL.revokeObjectURL(oe);let se=`전산매체신고 파일이 생성되었습니다.

파일명: `+ae+`
HD: 1건
RD: `+String(I.length-2)+`건
TD: 1건`;j>0&&(se+=`
제외된 결제: `+j+`건`),alert(se)};return}if(c===`organization`){let n=document.querySelector(`.admin-sub-menu`),r=document.querySelector(`.admin-title`),i=document.querySelector(`.admin-search-box`),a=document.querySelector(`.admin-summary`),o=document.querySelector(`.admin-table-top`),s=document.querySelector(`.admin-table thead`),c=document.querySelector(`#paymentTableBody`);n&&(n.innerHTML=``),r&&(r.innerHTML=`▶ 조직관리`),i&&(i.innerHTML=``),a&&(a.innerHTML=``),o&&(o.innerHTML=``),s&&(s.innerHTML=``),c&&(c.innerHTML=``);let{data:l,error:u}=await X.from(`admin_users`).select(`*`).order(`id`,{ascending:!0});if(u){alert(`조직 정보를 불러오지 못했습니다: `+u.message);return}let d=(l||[]).filter(e=>e.role===`BRANCH`),f=(l||[]).filter(e=>e.role===`AGENCY`),p=(l||[]).filter(e=>e.role===`MANAGER`),m=(l||[]).find(t=>String(t.login_id||``).toUpperCase()===e.toUpperCase());if(t===`BRANCH`&&m){d=d.filter(e=>Number(e.id)===Number(m.id)),f=f.filter(e=>Number(e.parent_admin_id)===Number(m.id));let e=f.map(e=>Number(e.id));p=p.filter(t=>e.includes(Number(t.parent_admin_id))||Number(t.parent_admin_id)===Number(m.id))}if(t===`AGENCY`&&m){let e=Number(m.id),t=Number(m.parent_admin_id);d=d.filter(e=>Number(e.id)===t),f=f.filter(t=>Number(t.id)===e),p=p.filter(t=>Number(t.parent_admin_id)===e)}let{data:h,error:g}=await X.from(`merchants`).select(`
              id,
              merchant_name,
              settlement_cycle,
              branch_admin_id,
              agency_admin_id,
              manager_admin_id
            `);if(g){alert(`조직 가맹점 정보를 불러오지 못했습니다: `+g.message);return}let{data:_,error:v}=await X.from(`payments`).select(`
    id,
    merchant_id,
    amount,
    status,
    approved_at,
    created_at
  `).eq(`status`,`paid`);if(v){alert(`조직 매출 정보를 불러오지 못했습니다: `+v.message);return}let y=(e,t)=>e?Number(t===`1일`?e.commission_rate_1day||0:t===`3일`?e.commission_rate_3day||0:t===`7일`?e.commission_rate_7day||0:e.commission_rate_4day||0):0,b=e=>(h||[]).filter(t=>Number(t.manager_admin_id)===e).length,x=e=>{let t=new Date,n=new Date(t.getFullYear(),t.getMonth(),1,0,0,0,0),r=new Date(t.getFullYear(),t.getMonth()+1,1,0,0,0,0);return(_||[]).filter(t=>{if(Number(t.merchant_id)!==e)return!1;let i=new Date(t.approved_at||t.created_at);return i>=n&&i<r}).reduce((e,t)=>e+Number(t.amount||0),0)},S=e=>{let t=p.find(t=>Number(t.id)===e),n=0,r=0;return(h||[]).filter(t=>Number(t.manager_admin_id)===e).forEach(e=>{let i=x(Number(e.id)),a=y(t,String(e.settlement_cycle||`4일`));n+=i,r+=Math.floor(i*a/100)}),{totalSales:n,commissionAmount:r}},C=e=>{let t=f.find(t=>Number(t.id)===e),n=p.filter(t=>Number(t.parent_admin_id)===e).map(e=>Number(e.id)),r=0,i=0;return(h||[]).forEach(a=>{let o=Number(a.agency_admin_id||0),s=Number(a.manager_admin_id||0);if(!(o===e||n.includes(s)))return;let c=x(Number(a.id));if(c<=0)return;let l=y(t,String(a.settlement_cycle||`4일`));r+=c,i+=Math.floor(c*l/100)}),{totalSales:r,commissionAmount:i}},w=e=>{let t=d.find(t=>Number(t.id)===e),n=f.filter(t=>Number(t.parent_admin_id)===e).map(e=>Number(e.id)),r=p.filter(t=>n.includes(Number(t.parent_admin_id))||Number(t.parent_admin_id)===e).map(e=>Number(e.id)),i=0,a=0;return(h||[]).forEach(o=>{let s=Number(o.branch_admin_id||0),c=Number(o.agency_admin_id||0),l=Number(o.manager_admin_id||0);if(!(s===e||n.includes(c)||r.includes(l)))return;let u=x(Number(o.id));if(u<=0)return;let d=y(t,String(o.settlement_cycle||`4일`));i+=u,a+=Math.floor(u*d/100)}),{totalSales:i,commissionAmount:a}},T=e=>{let t=String(e?.admin_name||``).trim(),n=String(e?.company_name||``).trim();return n?n+(t?`(`+t+`)`:``):t||`-`},E=()=>{let e=sessionStorage.getItem(`admin_id`)||``;if(t===`AGENCY`){let t=f.find(t=>String(t.login_id||``)===e);if(!t||!a)return;let n=p.filter(e=>Number(e.parent_admin_id)===Number(t.id)),r=n.map(e=>Number(e.id)),i=(h||[]).filter(e=>Number(e.agency_admin_id)===Number(t.id)||r.includes(Number(e.manager_admin_id))).length,o=C(Number(t.id));a.innerHTML=`<div class="merchant-detail-header"><h2>조직관리</h2><p>대리점 > 담당자 순서로 조회합니다.</p></div><div class="org-v2-wrap"><div class="org-v2-breadcrumb">대리점</div><h3>내 대리점</h3><div class="org-v2-grid"><button class="org-v2-card org-agency-v2" data-id="`+t.id+`"><strong>🤝 `+T(t)+`</strong><span>담당자 `+n.length+`명</span><span>가맹점 `+i+`개</span><span>총매출 `+o.totalSales.toLocaleString()+`원</span><strong>수수료 `+o.commissionAmount.toLocaleString()+`원</strong></button></div><div id="org-v2-detail-area"></div></div>`,k();return}let n=d.map(e=>{let t=f.filter(t=>Number(t.parent_admin_id)===Number(e.id)),n=t.map(e=>Number(e.id)),r=p.filter(e=>n.includes(Number(e.parent_admin_id))),i=(h||[]).filter(t=>Number(t.branch_admin_id)===Number(e.id)).length,a=w(Number(e.id));return`<button class="org-v2-card org-branch-v2" data-id="`+e.id+`"><strong>🏢 `+T(e)+`</strong><span>대리점 `+t.length+`개</span><span>담당자 `+r.length+`명</span><span>가맹점 `+i+`개</span><span>총매출 `+a.totalSales.toLocaleString()+`원</span><strong>수수료 `+a.commissionAmount.toLocaleString()+`원</strong></button>`}).join(``);a&&(a.innerHTML=`<div class="merchant-detail-header"><h2>조직관리</h2><p>본사 > 지사 > 대리점 > 담당자 순서로 조회합니다.</p></div><div class="org-v2-wrap"><div class="org-v2-breadcrumb">본사</div><h3>지사 목록</h3><div class="org-v2-grid">`+n+`</div><div id="org-v2-detail-area"></div></div>`,D())},D=()=>{document.querySelectorAll(`.org-branch-v2`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.id),n=d.find(e=>Number(e.id)===t),r=f.filter(e=>Number(e.parent_admin_id)===t),i=document.querySelector(`#org-v2-detail-area`);if(!i)return;i.innerHTML=`<div class="org-v2-breadcrumb">본사 > `+(n?.admin_name||`-`)+`</div><div class="org-v2-toolbar"><input id="org-agency-search" placeholder="대리점 검색" /></div><div id="org-agency-list"></div>`;let a=(h||[]).filter(e=>Number(e.branch_admin_id)===t&&!e.agency_admin_id&&!e.manager_admin_id);if(a.length>0){let e=document.querySelector(`#org-v2-detail-area`);e&&(e.innerHTML+=`<h3>지사 직속 가맹점</h3><div class="org-v2-merchant-box">`+a.slice(0,20).map((e,t)=>`<p>`+(t+1)+`. `+(e.merchant_name||`-`)+` (`+(e.id?`MER`+String(e.id).padStart(4,`0`):`-`)+`)</p>`).join(``)+`</div>`)}let o=p.filter(e=>Number(e.parent_admin_id)===t);if(o.length>0){let e=document.querySelector(`#org-v2-detail-area`);e&&(e.innerHTML+=`<h3>지사 직속 담당자</h3><div class="org-v2-list">`+o.map(e=>`<button class="org-v2-manager-row" data-id="`+e.id+`">👤 `+T(e)+`<strong>`+b(Number(e.id))+`</strong></button>`).join(``)+`</div>`),j()}O(r)})})},O=e=>{let t=(document.querySelector(`#org-agency-search`)?.value||``).trim(),n=e.filter(e=>String(e.admin_name||``).includes(t)),r=document.querySelector(`#org-agency-list`);r&&(r.innerHTML=`<h3>대리점 목록</h3><div class="org-v2-grid">`+n.slice(0,20).map(e=>{let t=p.filter(t=>Number(t.parent_admin_id)===Number(e.id)),n=t.map(e=>Number(e.id)),r=(h||[]).filter(t=>Number(t.agency_admin_id)===Number(e.id)||n.includes(Number(t.manager_admin_id))).length,i=C(Number(e.id));return`<button class="org-v2-card org-agency-v2" data-id="`+e.id+`"><strong>🤝 `+T(e)+`</strong><span>담당자 `+t.length+`명</span><span>가맹점 `+r+`개</span><span>총매출 `+i.totalSales.toLocaleString()+`원</span><strong>수수료 `+i.commissionAmount.toLocaleString()+`원</strong></button>`}).join(``)+`</div>`,document.querySelector(`#org-agency-search`)?.addEventListener(`input`,()=>O(e)),k())},k=()=>{document.querySelectorAll(`.org-agency-v2`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.id),n=f.find(e=>Number(e.id)===t),r=p.filter(e=>Number(e.parent_admin_id)===t),i=(h||[]).filter(e=>Number(e.agency_admin_id)===t&&!e.manager_admin_id),a=document.querySelector(`#org-v2-detail-area`);a&&(a.innerHTML=`<div class="org-v2-breadcrumb">본사 > 대리점 > `+T(n)+`</div><div class="org-v2-toolbar"><input id="org-manager-search" placeholder="담당자 검색" /></div><div id="org-manager-list"></div>`+(i.length>0?`<h3>대리점 직속 가맹점</h3><div class="org-v2-merchant-box">`+i.slice(0,20).map((e,t)=>`<p>`+(t+1)+`. `+(e.merchant_name||`-`)+` (`+(e.id?`MER`+String(e.id).padStart(4,`0`):`-`)+`)</p>`).join(``)+`</div>`:``),A(r))})})},A=e=>{let t=(document.querySelector(`#org-manager-search`)?.value||``).trim(),n=e.filter(e=>String(e.admin_name||``).includes(t)),r=document.querySelector(`#org-manager-list`);r&&(r.innerHTML=`<h3>담당자 목록</h3><div class="org-v2-list">`+n.slice(0,20).map(e=>{let t=S(Number(e.id));return`<button class="org-v2-manager-row" data-id="`+e.id+`"><span>👤 `+T(e)+`</span><span>가맹점 `+b(Number(e.id))+`개</span><span>총매출 `+t.totalSales.toLocaleString()+`원</span><strong>수수료 `+t.commissionAmount.toLocaleString()+`원</strong></button>`}).join(``),document.querySelector(`#org-manager-search`)?.addEventListener(`input`,()=>{A(e)}),j())};function j(){document.querySelectorAll(`.org-v2-manager-row`).forEach(e=>{e.onclick=()=>{let t=Number(e.dataset.id),n=p.find(e=>Number(e.id)===t),r=(h||[]).filter(e=>Number(e.manager_admin_id)===t),i=document.querySelector(`#org-manager-list`)||document.querySelector(`#org-v2-detail-area`);if(!i)return;let a=S(t);i.innerHTML=`<div class="org-v2-breadcrumb">담당자 > `+T(n)+`</div><div style="display:flex; gap:24px; margin:14px 0 18px 0; font-weight:700;"><span>총매출 `+a.totalSales.toLocaleString()+`원</span><span>수수료 `+a.commissionAmount.toLocaleString()+`원</span></div><h3>담당 가맹점</h3><div class="org-v2-merchant-box">`+(r.length===0?`<p>연결된 가맹점이 없습니다.</p>`:r.slice(0,20).map((e,t)=>`<p>`+(t+1)+`. `+(e.merchant_name||`-`)+` (`+(e.id?`MER`+String(e.id).padStart(4,`0`):`-`)+`)</p>`).join(``))+`</div>`}})}E(),document.querySelectorAll(`.manager-cancel-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=Number(e.dataset.managerId),n=document.querySelector(`#organization-work-panel`);if(!n)return;let{data:r,error:i}=await X.from(`cancel_requests`).select(`*`).eq(`manager_admin_id`,t).eq(`status`,`요청중`).order(`id`,{ascending:!1});if(i){alert(`취소요청 조회 실패: `+i.message);return}let a=(r||[]).map(e=>e.payment_id).filter(e=>e),{data:o,error:s}=await X.from(`payments`).select(`*`).in(`id`,a);if(s){alert(`결제정보 조회 실패: `+s.message);return}n.innerHTML=`<h3>취소 요청</h3><p>총 `+(r||[]).length+`건</p>`+((r||[]).length===0?`<p>현재 취소요청이 없습니다.</p>`:(r||[]).map(e=>`<div style="border:1px solid #ddd; border-radius:8px; padding:12px; margin-top:12px;"><p><b>가맹점 ID</b> : `+(e.merchant_id||`-`)+`</p>`+(()=>{let t=(o||[]).find(t=>Number(t.id)===Number(e.payment_id)),n=Number(t?.amount||0),r=Number(t?.fee_amount||0),i=Number(t?.settlement_amount||0),a=i+500;return`<p><b>결제금액</b> : `+n.toLocaleString()+`원</p><p><b>수수료</b> : `+r.toLocaleString()+`원</p><p><b>환수금액</b> : `+i.toLocaleString()+`원</p><p><b>결제취소이체수수료</b> : `+500 .toLocaleString()+`원</p><p style="font-size:18px;font-weight:700;color:#d32f2f;">총 입금금액 : `+a.toLocaleString()+`원</p>`})()+`<p><b>결제 ID</b> : `+(e.payment_id||`-`)+`</p><p><b>사유</b> : `+(e.reason||`-`)+`</p><p><b>상태</b> : `+(e.status||`-`)+`</p><button class="cancel-approve-btn" data-id="`+e.id+`">승인</button> <button class="cancel-reject-btn" data-id="`+e.id+`">반려</button></div>`).join(``))})});return}if(c===`merchant`){let n=document.querySelector(`.admin-sub-menu`),r=document.querySelector(`.admin-title`);n&&(n.innerHTML=`<span class="sub-tab" data-sub="merchant-add">업체/가맹점 등록</span>`+(t===`MANAGER`?``:`<span class="sub-tab" data-sub="admin-users">담당자관리</span>`)),document.querySelector(`[data-sub="merchant-add"]`)?.addEventListener(`click`,()=>{sessionStorage.setItem(`selected_merchant_id`,``),sessionStorage.setItem(`merchant_sub_page`,`merchant-add`),document.querySelector(`[data-sub="merchant-add"]`)?.addEventListener(`click`,()=>{sessionStorage.setItem(`selected_merchant_id`,``),sessionStorage.setItem(`merchant_sub_page`,`merchant-add`);let e=document.querySelector(`.admin-title`),t=document.querySelector(`.admin-summary`),n=document.querySelector(`.admin-table-top`),r=document.querySelector(`.admin-table thead`),i=document.querySelector(`#paymentTableBody`);document.querySelectorAll(`.sub-tab`).forEach(e=>e.classList.remove(`active`)),document.querySelector(`[data-sub="merchant-add"]`)?.classList.add(`active`),document.querySelector(`[data-sub="admin-users"]`)?.addEventListener(`click`,async()=>{document.querySelectorAll(`.sub-tab`).forEach(e=>e.classList.remove(`active`)),document.querySelector(`[data-sub="admin-users"]`)?.classList.add(`active`),e&&(e.innerHTML=`▶ 가맹점관리 > 담당자관리`);let{data:n,error:r}=await X.from(`admin_users`).select(`*`).order(`id`,{ascending:!0});if(r){alert(`담당자 조회 실패: `+r.message);return}t&&(t.innerHTML=`<div class="merchant-detail-header"><h2>담당자관리</h2><p>운영자, 지사, 대리점, 담당자 계정을 관리합니다.</p></div><div style="margin-bottom:16px;"><button id="add-admin-user-btn" class="merchant-save-btn">+ 담당자 등록</button></div><table class="admin-table"><thead><tr><th>이름</th><th>아이디</th><th>권한</th><th>상태</th><th>관리</th></tr></thead><tbody>`+(n||[]).map(e=>`<tr><td>`+(e.admin_name||`-`)+`</td><td>`+(e.login_id||`-`)+`</td><td>`+(e.role||`-`)+`</td><td>`+(e.status||`-`)+`</td><td><button class="admin-user-edit-btn" data-id="`+e.id+`">수정</button></td></tr>`).join(``)+`</tbody></table>`),document.querySelector(`#add-admin-user-btn`)?.addEventListener(`click`,()=>{t&&(document.querySelector(`#back-admin-user-list`)?.addEventListener(`click`,()=>{document.querySelector(`[data-sub="admin-users"]`)?.dispatchEvent(new Event(`click`))}),document.querySelector(`#save-admin-user`)?.addEventListener(`click`,async()=>{let e=(document.querySelector(`#admin-role`)?.value||``).trim(),t=(document.querySelector(`#admin-name`)?.value||``).trim(),n=(document.querySelector(`#admin-password`)?.value||`1234`).trim();if(!t){alert(`이름을 입력해주세요.`);return}let r=e===`BRANCH`?`S`:e===`AGENCY`?`A`:`B`,{data:i,error:a}=await X.from(`admin_users`).select(`login_id`).like(`login_id`,r+`%`).order(`id`,{ascending:!1}).limit(1);if(a){alert(`아이디 생성 실패: `+a.message);return}let o=1;if(i&&i.length>0){let e=i[0].login_id||``,t=Number(e.replace(r,``));isNaN(t)||(o=t+1)}let s=r+String(o).padStart(4,`0`),{error:c}=await X.from(`admin_users`).insert({admin_name:t,login_id:s,password:n,role:e,phone:(document.querySelector(`#admin-phone`)?.value||``).trim(),email:(document.querySelector(`#admin-email`)?.value||``).trim(),resident_number:(document.querySelector(`#admin-resident-number`)?.value||``).trim(),company_name:(document.querySelector(`#admin-company-name`)?.value||``).trim(),business_number:(document.querySelector(`#admin-business-number`)?.value||``).trim(),commission_rate_1day:Number(document.querySelector(`#admin-commission-rate-1day`)?.value||0),commission_rate_3day:Number(document.querySelector(`#admin-commission-rate-3day`)?.value||0),commission_rate_4day:Number(document.querySelector(`#admin-commission-rate-4day`)?.value||0),commission_rate_7day:Number(document.querySelector(`#admin-commission-rate-7day`)?.value||0),bank_name:(document.querySelector(`#admin-bank-name`)?.value||``).trim(),account_number:(document.querySelector(`#admin-account-number`)?.value||``).trim(),account_holder:(document.querySelector(`#admin-account-holder`)?.value||``).trim(),memo:(document.querySelector(`#admin-memo`)?.value||``).trim(),status:`사용중`,parent_admin_id:Number(document.querySelector(`#admin-parent-admin-id`)?.value||0)});if(c){alert(`담당자 저장 실패: `+c.message);return}alert(`등록되었습니다.

아이디: `+s+`
비밀번호: `+n),document.querySelector(`[data-sub="admin-users"]`)?.dispatchEvent(new Event(`click`))}))})}),e&&(e.innerHTML=`▶ 가맹점관리 > 업체/가맹점 등록`),t&&(t.innerHTML=`<div class="merchant-detail-header"><h2>신규가입신청서</h2><p>신규 가맹점 가입신청 정보를 입력합니다.</p></div>`),n&&(n.innerHTML=``),r&&(r.innerHTML=``),i.innerHTML=`<tr><td colspan="12"><div class="merchant-detail-page"><div class="merchant-detail-section"><h3>등록정보</h3><div class="merchant-detail-grid"><label>등록구분</label><select id="register-type"><option>가맹점</option><option>담당자</option><option>대리점</option></select><label>소속 대리점</label><select id="agency-name"><option>불러오는 중...</option></select><label>사용 PG사</label><div class="merchant-pg-select-grid"><div class="merchant-pg-select-item"><span>온라인결제 1</span><select id="online-pg-company-1"><option value="">사용안함</option><option value="토스페이먼츠">토스페이먼츠</option><option value="코페이">코페이</option><option value="다우데이타">다우데이타</option></select></div><div class="merchant-pg-select-item"><span>온라인결제 2</span><select id="online-pg-company-2"><option value="">사용안함</option><option value="토스페이먼츠">토스페이먼츠</option><option value="코페이">코페이</option><option value="다우데이타">다우데이타</option></select></div><div class="merchant-pg-select-item"><span>수기결제</span><select id="manual-pg-company"><option value="">사용안함</option><option value="코페이">코페이</option><option value="다우데이타">다우데이타</option></select></div></div><label>회사구분</label><select id="company-type"><option>개인(일반)</option><option>개인사업자</option><option>법인사업자</option></select><label>CPID</label><input id="cpid" placeholder="자동생성 또는 직접입력" /><label>사업자번호</label><input id="business_number" /><label>운영상태</label><select id="status"><option>신청</option><option>심사중</option><option>운영</option><option>중지</option></select><label>개통일자</label><input id="opened_at" type="date" /></div></div><div class="merchant-detail-section"><h3>기본정보</h3><div class="merchant-detail-grid"><label>가맹점명</label><input id="merchant-name" /><label>대표자</label><input id="owner-name" /><label>주민번호</label><input id="resident-number" placeholder="000000-0000000" /><label>연락처</label><input id="phone" /><label>수수료율</label><input id="fee-rate" value="0" /><label>이메일</label><input id="email" /><label>법인번호</label><input id="corporate-number" /><label>과세구분</label><select id="tax-type"><option>과세</option><option>비과세</option></select><label>취급품목</label><input id="product-item" /><label>업태/종목</label><div class="business-type-row"><input id="business-type" placeholder="업태" /><input id="business-category" placeholder="종목" /></div><label>주소</label><div class="address-one-line"><input id="zipcode" class="zipcode-input" placeholder="우편번호" /><button type="button" class="address-search-btn">우편번호 찾기</button><input id="address" class="address-main-input" placeholder="기본주소" /><input id="address_detail" class="address-detail-input" placeholder="상세주소" /></div></div></div><div class="merchant-detail-section"><h3>PG / 단말기 정보</h3><h4>코페이</h4><div class="merchant-detail-grid"><label>코페이 PG MID</label><input id="korpay_pg_mid" /><label>코페이 PG Mkey</label><input id="korpay_pg_mkey" /><label>코페이 단말기 MID</label><input id="korpay_terminal_mid" /><label>코페이 단말기 Mkey</label><input id="korpay_terminal_mkey" /><label>코페이 수기 MID</label><input id="korpay_manual_mid" /><label>코페이 수기 Mkey</label><input id="korpay_manual_mkey" /></div><h4>토스</h4><div class="merchant-detail-grid"><label>토스 Client Key</label><input id="toss_client_key" /><label>토스 Secret Key</label><input id="toss_secret_key" /><label>토스 MID</label><input id="toss_mid" /></div><h4>다우데이타</h4><div class="merchant-detail-grid"><label>다우 PG MID</label><input id="daou_pg_mid" /><label>다우 PG Mkey</label><input id="daou_pg_mkey" /><label>다우 단말기 MID</label><input id="daou_terminal_mid" /><label>다우 단말기 Mkey</label><input id="daou_terminal_mkey" /><label>다우 수기 MID</label><input id="daou_manual_mid" /><label>다우 수기 Mkey</label><input id="daou_manual_mkey" /></div><h4>기존 관리번호</h4><div class="merchant-detail-grid"><label>개통번호</label><input id="open-number" /><label>관리번호</label><input id="manage-number" /><label>무선단말기 개통번호</label><input id="wireless-open-number" /><label>무선단말기 관리번호</label><input id="wireless-manage-number" /></div></div><div class="merchant-detail-section"><h3>정산정보</h3><div class="merchant-detail-grid"><label>정산은행</label><input id="bank_name" /><label>계좌번호</label><input id="account_number" /><label>예금주</label><input id="account_holder" /><label>정산주기</label><select id="settlement_cycle"><option value="1일">1일</option><option value="3일">3일</option><option value="4일" selected>4일</option><option value="7일">7일</option></select></div></div><div class="merchant-detail-section"><h3>위험관리 / 한도설정</h3><div class="merchant-detail-grid merchant-risk-grid"><label>최대할부기간</label><select id="installment-month"><option>2개월</option><option>3개월</option><option>4개월</option><option>5개월</option><option>6개월</option><option>10개월</option><option>12개월</option></select><label>1일 승인한도</label><input id="daily-limit" /><label>월한도</label><input id="monthly-limit" /><label>연한도</label><input id="yearly-limit" /></div></div><div class="merchant-detail-section"><h3>첨부서류</h3><div class="merchant-file-list"><div class="merchant-file-row"><label>사업자등록증</label><input id="business-license-file" type="file" /></div><div class="merchant-file-row"><label>통장사본</label><input id="bankbook-file" type="file" /></div><div class="merchant-file-row"><label>대표자 신분증</label><input id="id-card-file" type="file" /></div><div class="merchant-file-row"><label>판매상품 사진</label><input id="product-photo-file" type="file" /></div><div class="merchant-file-row"><label>기타서류</label><input id="extra-file" type="file" /></div><div class="merchant-file-row"><label>메모</label><textarea id="merchant-memo" placeholder="심사 메모를 입력하세요"></textarea></div></div></div><div class="merchant-detail-actions"><button class="merchant-save-btn" id="save-new-merchant">저장</button><button class="merchant-close-btn" id="back-merchant-list">목록으로</button></div></div></td></tr>`,document.querySelector(`.address-search-btn`)?.addEventListener(`click`,()=>{new window.daum.Postcode({oncomplete:e=>{let t=document.querySelector(`#zipcode`),n=document.querySelector(`#address`),r=document.querySelector(`#address_detail`);t&&(t.value=e.zonecode),n&&(n.value=e.roadAddress||e.jibunAddress),r?.focus()}}).open()}),document.querySelector(`#save-new-merchant`)?.addEventListener(`click`,async()=>{let e=(document.querySelector(`#merchant-name`)?.value||``).trim(),t=(document.querySelector(`#owner-name`)?.value||``).trim(),n=(document.querySelector(`#business_number`)?.value||``).trim(),r=(document.querySelector(`#phone`)?.value||``).trim(),i=(document.querySelector(`#email`)?.value||``).trim(),a=(document.querySelector(`#cpid`)?.value||``).trim(),o=Number((document.querySelector(`#fee-rate`)?.value||`0`).trim()),s=(document.querySelector(`#pg_mid`)?.value||``).trim(),c=(document.querySelector(`#terminal_mid`)?.value||``).trim(),l=(document.querySelector(`#bank_name`)?.value||``).trim(),u=(document.querySelector(`#account_number`)?.value||``).trim(),d=(document.querySelector(`#account_holder`)?.value||``).trim(),f=(document.querySelector(`#settlement_cycle`)?.value||``).trim(),p=(document.querySelector(`#zipcode`)?.value||``).trim(),m=(document.querySelector(`#address`)?.value||``).trim(),h=(document.querySelector(`#address_detail`)?.value||``).trim(),g=(document.querySelector(`#register-type`)?.value||``).trim(),_=(document.querySelector(`#agency-name`)?.value||``).trim(),v=(document.querySelector(`#online-pg-company-1`)?.value||``).trim(),y=(document.querySelector(`#online-pg-company-2`)?.value||``).trim(),b=(document.querySelector(`#manual-pg-company`)?.value||``).trim(),x=v||y||b||``,S=(document.querySelector(`#company-type`)?.value||``).trim(),C=(document.querySelector(`#status`)?.value||``).trim(),w=document.querySelector(`#merchant-type`)?.value||`일반매장`,T=(document.querySelector(`#opened_at`)?.value||``).trim(),E=(document.querySelector(`#resident-number`)?.value||``).trim(),D=(document.querySelector(`#corporate-number`)?.value||``).trim(),O=(document.querySelector(`#tax-type`)?.value||``).trim(),k=(document.querySelector(`#product-item`)?.value||``).trim(),A=(document.querySelector(`#business-type`)?.value||``).trim(),j=(document.querySelector(`#business-category`)?.value||``).trim(),M=(document.querySelector(`#open-number`)?.value||``).trim(),N=(document.querySelector(`#manage-number`)?.value||``).trim(),P=(document.querySelector(`#wireless-open-number`)?.value||``).trim(),F=(document.querySelector(`#wireless-manage-number`)?.value||``).trim(),I=(document.querySelector(`#installment-month`)?.value||``).trim(),L=(document.querySelector(`#daily-limit`)?.value||``).trim(),R=(document.querySelector(`#monthly-limit`)?.value||``).trim(),ee=(document.querySelector(`#yearly-limit`)?.value||``).trim(),te=(document.querySelector(`#merchant-memo`)?.value||``).trim(),ne=async(e,t)=>{let n=document.querySelector(e)?.files?.[0];if(!n)return``;let r=n.name.split(`.`).pop()||`file`,i=t+`/`+Date.now()+`-`+Math.random().toString(36).slice(2)+`.`+r,{error:a}=await X.storage.from(`merchant-files`).upload(i,n);if(a)throw Error(a.message);let{data:o}=X.storage.from(`merchant-files`).getPublicUrl(i);return o.publicUrl},re=``,ie=``,z=``,B=``,ae=``;try{re=await ne(`#business-license-file`,`business-license`),ie=await ne(`#bankbook-file`,`bankbook`),z=await ne(`#id-card-file`,`id-card`),B=await ne(`#product-photo-file`,`product-photo`),ae=await ne(`#extra-file`,`extra`)}catch(e){alert(`파일 업로드 실패: `+e.message);return}if(!e){alert(`가맹점명을 입력해주세요.`);return}if(!t){alert(`대표자명을 입력해주세요.`);return}let{error:oe}=await X.from(`merchants`).insert({merchant_name:e,merchant_type:w,owner_name:t,business_number:n,phone:r,email:i,cpid:a,fee_rate:o,pg_mid:s,terminal_mid:c,bank_name:l,account_number:u,account_holder:d,settlement_cycle:f,zipcode:p,address:m,address_detail:h,register_type:g,agency_name:_,pg_company:x,online_pg_company_1:v,online_pg_company_2:y,manual_pg_company:b,company_type:S,opened_at:T,resident_number:E,corporate_number:D,tax_type:O,product_item:k,business_type:A,business_category:j,open_number:M,manage_number:N,wireless_open_number:P,wireless_manage_number:F,installment_month:I,daily_limit:L,monthly_limit:R,yearly_limit:ee,memo:te,business_license_url:re,bankbook_url:ie,id_card_url:z,product_photo_url:B,extra_file_url:ae,status:C||`신청`});if(oe){alert(`저장 실패: `+oe.message);return}alert(`신규가입신청서가 저장되었습니다.`),location.reload()})})}),document.querySelector(`[data-page="merchant"]`)?.click(),document.addEventListener(`click`,async n=>{let r=n.target;if(r.dataset.sub!==`admin-users`)return;document.querySelectorAll(`.sub-tab`).forEach(e=>e.classList.remove(`active`)),r.classList.add(`active`);let i=document.querySelector(`.admin-title`),a=document.querySelector(`.admin-summary`),o=document.querySelector(`.admin-table-top`),s=document.querySelector(`.admin-table thead`),c=document.querySelector(`#paymentTableBody`);i&&(i.innerHTML=`▶ 가맹점관리 > 담당자관리`),o&&(o.innerHTML=``),s&&(s.innerHTML=``),c&&(c.innerHTML=``);let{data:l,error:u}=await X.from(`admin_users`).select(`*`).order(`id`,{ascending:!0});if(u){alert(`담당자 조회 실패: `+u.message);return}let d=l||[],f=d.find(t=>String(t.login_id||``).toUpperCase()===e.toUpperCase());if(t===`BRANCH`&&f){let e=Number(f.id),t=d.filter(t=>t.role===`AGENCY`&&Number(t.parent_admin_id)===e).map(e=>Number(e.id));d=d.filter(n=>Number(n.id)===e||t.includes(Number(n.id))||n.role===`MANAGER`&&(Number(n.parent_admin_id)===e||t.includes(Number(n.parent_admin_id))))}if(t===`AGENCY`&&f){let e=Number(f.id);d=d.filter(t=>Number(t.id)===e||t.role===`MANAGER`&&Number(t.parent_admin_id)===e)}if(!a)return;a.innerHTML=`<div class="merchant-detail-header"><h2>담당자관리</h2><p>운영자, 지사, 대리점, 담당자 계정을 관리합니다.</p></div><div style="margin-bottom:16px;"><button id="safe-add-admin-user-btn" class="merchant-save-btn">+ 담당자 등록</button></div><table class="admin-table"><thead><tr><th>이름</th><th>아이디</th><th>권한</th><th>상태</th><th>관리</th></tr></thead><tbody>`+(d||[]).map(e=>`<tr><td>`+(e.admin_name||`-`)+`</td><td>`+(e.login_id||`-`)+`</td><td>`+(e.role===`MASTER`?`최고관리자`:e.role===`BRANCH`?`지사`:e.role===`AGENCY`?`대리점`:e.role===`MANAGER`?`담당자`:`-`)+`</td><td>`+(e.status||`-`)+`</td><td><button class="admin-user-edit-btn" data-id="`+e.id+`">수정</button></td></tr>`).join(``)+`</tbody></table>`;let p=window;p.adminUserEditClickReady||(p.adminUserEditClickReady=!0,document.addEventListener(`click`,async e=>{let t=e.target;if(!t.classList.contains(`admin-user-edit-btn`))return;let n=Number(t.dataset.id),{data:r,error:i}=await X.from(`admin_users`).select(`*`).eq(`id`,n).single();if(i||!r){alert(`담당자 정보를 불러오지 못했습니다.`);return}if(!a)return;a.innerHTML=`<div class="merchant-detail-header"><h2>담당자 수정</h2><p>담당자 계정 정보를 수정합니다.</p></div><div class="merchant-detail-grid"><label>권한</label><select id="edit-admin-role" `+(r.login_id===`NXGMASTER16`?`disabled`:``)+`><option value="MASTER" `+(r.role===`MASTER`?`selected`:``)+`>최고관리자</option><option value="BRANCH" `+(r.role===`BRANCH`?`selected`:``)+`>지사</option><option value="AGENCY" `+(r.role===`AGENCY`?`selected`:``)+`>대리점</option><option value="MANAGER" `+(r.role===`MANAGER`?`selected`:``)+`>담당자</option></select><label>이름</label><input id="edit-admin-name" value="`+(r.admin_name||``)+`" /><label>아이디</label><input id="edit-admin-login-id" value="`+(r.login_id||``)+`" readonly /><label>비밀번호</label><input id="edit-admin-password" value="`+(r.password||``)+`" /><label>휴대폰번호</label><input id="edit-admin-phone" value="`+(r.phone||``)+`" placeholder="010-0000-0000" /><label>이메일</label><input id="edit-admin-email" value="`+(r.email||``)+`" /><label>주민등록번호</label><input id="edit-admin-resident-number" value="`+(r.resident_number||``)+`" /><label>회사명</label><input id="edit-admin-company-name" value="`+(r.company_name||``)+`" /><label>사업자번호</label><input id="edit-admin-business-number" value="`+(r.business_number||``)+`" /><label>1일 정산 수수료율(%)</label><input id="edit-admin-commission-rate-1day" type="number" step="0.01" min="0" max="100" value="`+(r.commission_rate_1day||0)+`" /><label>3일 정산 수수료율(%)</label><input id="edit-admin-commission-rate-3day" type="number" step="0.01" min="0" max="100" value="`+(r.commission_rate_3day||0)+`" /><label>4일 정산 수수료율(%)</label><input id="edit-admin-commission-rate-4day" type="number" step="0.01" min="0" max="100" value="`+(r.commission_rate_4day||0)+`" /><label>7일 정산 수수료율(%)</label><input id="edit-admin-commission-rate-7day" type="number" step="0.01" min="0" max="100" value="`+(r.commission_rate_7day||0)+`" /><label>은행명</label><input id="edit-admin-bank-name" value="`+(r.bank_name||``)+`" /><label>계좌번호</label><input id="edit-admin-account-number" value="`+(r.account_number||``)+`" /><label>예금주</label><input id="edit-admin-account-holder" value="`+(r.account_holder||``)+`" /><label>메모</label><textarea id="edit-admin-memo">`+(r.memo||``)+`</textarea><label>상태</label><select id="edit-admin-status" `+(r.login_id===`NXGMASTER16`?`disabled`:``)+`><option value="사용중" `+(r.status===`사용중`?`selected`:``)+`>사용중</option><option value="사용정지" `+(r.status===`사용정지`?`selected`:``)+`>사용정지</option><option value="퇴사" `+(r.status===`퇴사`?`selected`:``)+`>퇴사</option></select><label>상위조직</label><select id="edit-parent-admin-id"><option value="">선택</option></select></div><div class="merchant-detail-actions"><button id="safe-update-admin-user" class="merchant-save-btn" data-id="`+r.id+`">저장</button><button id="safe-cancel-admin-user-edit" class="merchant-close-btn">취소</button></div>`;let o=document.querySelector(`#edit-parent-admin-id`);o&&(o.innerHTML=`<option value="">선택</option>`,(d||[]).filter(e=>e.role===`MASTER`||e.role===`BRANCH`||e.role===`AGENCY`).forEach(e=>{let t=document.createElement(`option`);t.value=String(e.id),t.textContent=e.role===`MASTER`?`대표관리자 - `+e.admin_name:e.role===`BRANCH`?`지사 - `+e.admin_name:`대리점 - `+e.admin_name,Number(r.parent_admin_id)===Number(e.id)&&(t.selected=!0),o.appendChild(t)})),document.querySelector(`#safe-cancel-admin-user-edit`)?.addEventListener(`click`,()=>{document.querySelector(`[data-sub="admin-users"]`)?.click()}),document.querySelector(`#safe-update-admin-user`)?.addEventListener(`click`,async()=>{let e=(document.querySelector(`#edit-admin-role`)?.value||r.role).trim(),t=(document.querySelector(`#edit-admin-name`)?.value||``).trim(),n=(document.querySelector(`#edit-admin-password`)?.value||``).trim(),i=(document.querySelector(`#edit-admin-phone`)?.value||``).trim(),a=(document.querySelector(`#edit-admin-email`)?.value||``).trim(),o=(document.querySelector(`#edit-admin-resident-number`)?.value||``).trim(),s=(document.querySelector(`#edit-admin-company-name`)?.value||``).trim(),c=(document.querySelector(`#edit-admin-business-number`)?.value||``).trim(),l=(document.querySelector(`#edit-admin-bank-name`)?.value||``).trim(),u=(document.querySelector(`#edit-admin-account-number`)?.value||``).trim(),d=(document.querySelector(`#edit-admin-account-holder`)?.value||``).trim(),f=(document.querySelector(`#edit-admin-memo`)?.value||``).trim(),p=(document.querySelector(`#edit-admin-status`)?.value||r.status).trim(),m=Number(document.querySelector(`#edit-parent-admin-id`)?.value||0);if(!t){alert(`이름을 입력해주세요.`);return}let h=r.login_id===`NXGMASTER16`,g=r.login_id;if(!h&&r.role!==e){let t=e===`BRANCH`?`S`:e===`AGENCY`?`A`:e===`MANAGER`?`B`:`NXGMASTER`;if(e!==`MASTER`){let{data:e,error:n}=await X.from(`admin_users`).select(`login_id`).like(`login_id`,t+`%`).order(`id`,{ascending:!1}).limit(1);if(n){alert(`아이디 생성 실패: `+n.message);return}let r=1;if(e&&e.length>0){let n=e[0].login_id||``,i=Number(n.replace(t,``));isNaN(i)||(r=i+1)}g=t+String(r).padStart(4,`0`)}}let _=h?{admin_name:t,password:n,phone:i,email:a,resident_number:o,company_name:s,business_number:c,commission_rate_1day:Number(document.querySelector(`#edit-admin-commission-rate-1day`)?.value||0),commission_rate_3day:Number(document.querySelector(`#edit-admin-commission-rate-3day`)?.value||0),commission_rate_4day:Number(document.querySelector(`#edit-admin-commission-rate-4day`)?.value||0),commission_rate_7day:Number(document.querySelector(`#edit-admin-commission-rate-7day`)?.value||0),bank_name:l,account_number:u,account_holder:d,memo:f}:{admin_name:t,password:n,phone:i,email:a,resident_number:o,company_name:s,business_number:c,commission_rate_1day:Number(document.querySelector(`#edit-admin-commission-rate-1day`)?.value||0),commission_rate_3day:Number(document.querySelector(`#edit-admin-commission-rate-3day`)?.value||0),commission_rate_4day:Number(document.querySelector(`#edit-admin-commission-rate-4day`)?.value||0),commission_rate_7day:Number(document.querySelector(`#edit-admin-commission-rate-7day`)?.value||0),bank_name:l,account_number:u,account_holder:d,memo:f,role:e,status:p,login_id:g,parent_admin_id:m},{error:v}=await X.from(`admin_users`).update(_).eq(`id`,r.id);if(v){alert(`수정 실패: `+v.message);return}alert(`수정되었습니다.`),document.querySelector(`[data-sub="admin-users"]`)?.click()})})),document.querySelector(`#safe-add-admin-user-btn`)?.addEventListener(`click`,()=>{if(!a)return;a.innerHTML=`<div class="merchant-detail-header"><h2>담당자 등록</h2><p>담당자 계정을 등록합니다.</p></div><div class="merchant-detail-grid"><label>권한</label><select id="safe-admin-role"><option value="BRANCH">지사</option><option value="AGENCY">대리점</option><option value="MANAGER" selected>담당자</option></select><label>이름</label><input id="safe-admin-name" /><label>비밀번호</label><input id="safe-admin-password" value="1234" /><label>상위조직</label><select id="safe-parent-admin-id"><option value="">선택</option></select><label>휴대폰번호</label><input id="admin-phone" placeholder="010-0000-0000" /><label>이메일</label><input id="admin-email" /><label>주민등록번호</label><input id="admin-resident-number" /><label>회사명</label><input id="admin-company-name" /><label>사업자번호</label><input id="admin-business-number" /><label>1일 정산 수수료율(%)</label><input id="admin-commission-rate-1day" type="number" step="0.01" min="0" max="100" value="0" /><label>3일 정산 수수료율(%)</label><input id="admin-commission-rate-3day" type="number" step="0.01" min="0" max="100" value="0" /><label>4일 정산 수수료율(%)</label><input id="admin-commission-rate-4day" type="number" step="0.01" min="0" max="100" value="0" /><label>7일 정산 수수료율(%)</label><input id="admin-commission-rate-7day" type="number" step="0.01" min="0" max="100" value="0" /><label>은행명</label><input id="admin-bank-name" /><label>계좌번호</label><input id="admin-account-number" /><label>예금주</label><input id="admin-account-holder" /><label>메모</label><textarea id="admin-memo"></textarea></div></div><div class="merchant-detail-actions"><button id="safe-save-admin-user" class="merchant-save-btn">저장</button><button id="safe-back-admin-user-list" class="merchant-close-btn">목록</button></div>`;let e=document.querySelector(`#safe-parent-admin-id`);e&&(e.innerHTML=`<option value="">선택</option>`,(d||[]).filter(e=>e.role===`MASTER`||e.role===`BRANCH`||e.role===`AGENCY`).forEach(t=>{let n=document.createElement(`option`);n.value=String(t.id),n.textContent=t.role===`MASTER`?`대표관리자 - `+t.admin_name:t.role===`BRANCH`?`지사 - `+t.admin_name:`대리점 - `+t.admin_name,e.appendChild(n)})),document.querySelector(`#safe-back-admin-user-list`)?.addEventListener(`click`,()=>{document.querySelector(`[data-sub="admin-users"]`)?.click()}),document.querySelector(`#safe-save-admin-user`)?.addEventListener(`click`,async()=>{let e=(document.querySelector(`#safe-admin-role`)?.value||`MANAGER`).trim(),t=(document.querySelector(`#safe-admin-name`)?.value||``).trim(),n=(document.querySelector(`#safe-admin-password`)?.value||`1234`).trim(),r=(document.querySelector(`#admin-resident-number`)?.value||``).trim(),i=(document.querySelector(`#admin-company-name`)?.value||``).trim(),a=(document.querySelector(`#admin-business-number`)?.value||``).trim(),o=Number(document.querySelector(`#admin-commission-rate`)?.value||0),s=(document.querySelector(`#admin-bank-name`)?.value||``).trim(),c=(document.querySelector(`#admin-account-number`)?.value||``).trim(),l=(document.querySelector(`#admin-account-holder`)?.value||``).trim(),u=(document.querySelector(`#admin-memo`)?.value||``).trim(),d=Number(document.querySelector(`#safe-parent-admin-id`)?.value||0);if(!t){alert(`이름을 입력해주세요.`);return}if(!d){alert(`상위조직을 선택해주세요.`);return}let f=e===`BRANCH`?`S`:e===`AGENCY`?`A`:`B`,{data:p,error:m}=await X.from(`admin_users`).select(`login_id`).like(`login_id`,f+`%`).order(`id`,{ascending:!1}).limit(1);if(m){alert(`아이디 생성 실패: `+m.message);return}let h=1;if(p&&p.length>0){let e=p[0].login_id||``,t=Number(e.replace(f,``));isNaN(t)||(h=t+1)}let g=f+String(h).padStart(4,`0`),{error:_}=await X.from(`admin_users`).insert({admin_name:t,login_id:g,password:n,role:e,status:`사용중`,parent_admin_id:d,resident_number:r,company_name:i,business_number:a,commission_rate:o,bank_name:s,account_number:c,account_holder:l,memo:u});if(_){alert(`담당자 저장 실패: `+_.message);return}alert(`등록되었습니다.

아이디: `+g+`
비밀번호: `+n),document.querySelector(`[data-sub="admin-users"]`)?.dispatchEvent(new Event(`click`))})})}),document.addEventListener(`change`,e=>{let t=e.target;if(t.id===`admin-page-size`){let e=t;sessionStorage.setItem(`admin_page_size`,e.value);let n=document.querySelector(`.admin-tab.active`);n&&n.click();return}if(t.id===`withdraw-page-size`){let e=t;sessionStorage.setItem(`withdraw_page_size`,e.value);let n=document.querySelector(`.admin-tab.active`);n&&n.click()}}),r&&(r.innerHTML=`▶ 가맹점관리 > 가맹점 관리`);let i=document.querySelector(`.admin-search-box`);i&&(i.innerHTML=`<div class="merchant-filter-line"><span class="filter-label">• 검색</span><select id="merchant-pg-filter"><option value="">전체 PG</option><option value="다우데이타">다우데이타</option><option value="코페이">코페이</option><option value="토스페이먼츠">토스페이먼츠</option></select><input id="merchant-start-date" type="date" /><span>~</span><input id="merchant-end-date" type="date" /><button class="quick-btn" data-range="today">오늘</button><button class="quick-btn" data-range="yesterday">어제</button><button class="quick-btn" data-range="month">당월</button><select id="merchant-status-filter"><option value="">전체 상태</option><option value="운영">운영</option><option value="중지">중지</option><option value="신청">가입대기</option></select><select id="merchant-search-type"><option value="all">전체검색</option><option value="name">가맹점명 / 대표자명</option><option value="business_number">사업자번호</option><option value="resident_number">주민번호</option><option value="cpid">단말기 CPID</option><option value="pg_mid">PG사 MID</option><option value="terminal_mid">단말기 MID</option></select><input id="merchant-search-keyword" placeholder="검색어 입력" /><button class="merchant-search-btn" type="button">검색</button></div>`);let a=document.querySelector(`.admin-table-top`);a&&(a.innerHTML=`<select id="admin-page-size"><option value="10">10개씩 보기</option><option value="20">20개씩 보기</option><option value="50">50개씩 보기</option></select><div id="merchant-pagination" class="merchant-pagination"></div>`),document.querySelectorAll(`.quick-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.range,n=new Date,r=n.getFullYear(),i=String(n.getMonth()+1).padStart(2,`0`),a=String(n.getDate()).padStart(2,`0`),o=r+`-`+i+`-`+a,s=document.querySelector(`#merchant-start-date`),c=document.querySelector(`#merchant-end-date`);if(!(!s||!c)){if(t===`today`&&(s.value=o,c.value=o),t===`yesterday`){let e=new Date(n);e.setDate(n.getDate()-1);let t=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,`0`),i=String(e.getDate()).padStart(2,`0`);s.value=t+`-`+r+`-`+i,c.value=t+`-`+r+`-`+i}t===`month`&&(s.value=r+`-`+i+`-01`,c.value=o)}})});let o=document.querySelector(`.merchant-search-btn`);o?.addEventListener(`click`,async()=>{let n=await X.from(`merchants`).select(`*`).order(`id`,{ascending:!0});if(n.error){alert(`가맹점 조회 실패: `+n.error.message);return}let o=document.querySelector(`#merchant-pg-filter`)?.value||``,s=document.querySelector(`#merchant-status-filter`)?.value||``,c=document.querySelector(`#merchant-search-type`)?.value||`all`,l=document.querySelector(`#merchant-search-keyword`)?.value.trim()||``,u=l.replace(/-/g,``),d=document.querySelector(`#merchant-start-date`)?.value||``,f=document.querySelector(`#merchant-end-date`)?.value||``,p=n.data||[];if(t===`MANAGER`){let{data:t,error:n}=await X.from(`admin_users`).select(`id`).eq(`login_id`,e).single();if(n||!t){alert(`담당자 정보를 확인하지 못했습니다.`);return}p=p.filter(e=>Number(e.manager_admin_id)===Number(t.id))}if(t===`AGENCY`||t===`BRANCH`){let{data:n,error:r}=await X.from(`admin_users`).select(`id`).eq(`login_id`,e).single();if(r||!n){alert(`조직 정보를 확인하지 못했습니다.`);return}t===`AGENCY`&&(p=p.filter(e=>Number(e.agency_admin_id)===Number(n.id))),t===`BRANCH`&&(p=p.filter(e=>Number(e.branch_admin_id)===Number(n.id)))}o&&(p=p.filter(e=>String(e.pg_company||``).includes(o))),s&&(p=p.filter(e=>String(e.status||``)===s)),d&&(p=p.filter(e=>String(e.created_at||``).slice(0,10)>=d)),f&&(p=p.filter(e=>String(e.created_at||``).slice(0,10)<=f)),l&&(p=p.filter(e=>{let t={name:String(e.merchant_name||``)+` `+String(e.owner_name||``),business_number:String(e.business_number||``).replace(/-/g,``),resident_number:String(e.resident_number||``).replace(/-/g,``),cpid:String(e.cpid||``),pg_mid:String(e.pg_mid||``)+` `+String(e.korpay_pg_mid||``)+` `+String(e.korpay_manual_mid||``)+` `+String(e.toss_mid||``)+` `+String(e.toss_client_key||``)+` `+String(e.daou_pg_mid||``)+` `+String(e.daou_manual_mid||``),terminal_mid:String(e.terminal_mid||``)+` `+String(e.korpay_terminal_mid||``)+` `+String(e.daou_terminal_mid||``)};return c===`all`?Object.values(t).some(e=>e.replace(/-/g,``).includes(u)):t[c]?.includes(u)}));let m=document.querySelector(`#admin-page-size`),h=sessionStorage.getItem(`admin_page_size`)||`10`;m&&(m.value=h);let g=Number(h)||10,_=[...p].sort((e,t)=>Number(t.id||0)-Number(e.id||0)),v=Math.max(1,Math.ceil(_.length/g)),y=Number(sessionStorage.getItem(`merchant_admin_page`)||`1`);(y<1||y>v)&&(y=1);let b=(y-1)*g;p=_.slice(b,b+g);let x=document.querySelector(`.admin-summary`),S=document.querySelector(`.admin-table thead`),C=document.querySelector(`#paymentTableBody`),w=X.from(`merchants`).select(`status, manager_admin_id`);if(t===`MANAGER`){let{data:t,error:n}=await X.from(`admin_users`).select(`id`).eq(`login_id`,e).single();if(n||!t){alert(`담당자 정보를 확인하지 못했습니다.`);return}w=w.eq(`manager_admin_id`,t.id)}let{data:T}=await w,E=T?.filter(e=>e.status===`신청`).length||0,D=T?.filter(e=>[`승인`,`승인완료`,`운영`,`대기`].includes(e.status||``)).length||0,O=T?.filter(e=>e.status===`반려`).length||0,k=T?.length||0;x&&(x.innerHTML=`<div class="merchant-status-cards"><div class="merchant-status-card"><p>전체 가맹점</p><strong>`+k+`건</strong></div><div class="merchant-status-card"><p>신청대기</p><strong>`+E+`건</strong></div><div class="merchant-status-card"><p>승인완료</p><strong>`+D+`건</strong></div><div class="merchant-status-card danger"><p>반려</p><strong>`+O+`건</strong></div></div><div style="margin-top:16px; display:flex; gap:8px;"><button id="copy-merchant-apply-link" class="merchant-search-btn">🔗 가입신청 링크 생성</button><button id="merchant-bulk-check" class="merchant-search-btn">가맹점일괄조회</button></div>`),document.querySelector(`#copy-merchant-apply-link`)?.addEventListener(`click`,async()=>{let e=window.location.origin+`/merchant-apply`;await navigator.clipboard.writeText(e),alert(`가입신청 링크가 복사되었습니다.`)}),document.querySelector(`#merchant-bulk-check`)?.addEventListener(`click`,()=>{let e=document.querySelector(`#merchant-bulk-check-modal`);e&&e.remove();let t=document.createElement(`div`);t.id=`merchant-bulk-check-modal`,t.innerHTML=`
      <div class="merchant-bulk-check-backdrop">
        <div class="merchant-bulk-check-box">

          <h3>가맹점일괄조회</h3>

          <p>
            PG사 메일 내용을 그대로 붙여넣어 주세요.
          </p>

          <textarea
            id="merchant-bulk-check-input"
            placeholder="가맹점명, 사업자번호, 생년월일 등이 포함된 내용을 그대로 붙여넣어 주세요."
          ></textarea>

          <div class="merchant-bulk-check-actions">
            <button id="merchant-bulk-check-search" class="merchant-search-btn">
              조회
            </button>

            <button id="merchant-bulk-check-close" class="merchant-close-btn">
              닫기
            </button>
          </div>

          <div id="merchant-bulk-check-result"></div>

        </div>
      </div>
    `,document.body.appendChild(t),document.querySelector(`#merchant-bulk-check-close`)?.addEventListener(`click`,()=>{t.remove()}),document.querySelector(`#merchant-bulk-check-search`)?.addEventListener(`click`,async()=>{let e=document.querySelector(`#merchant-bulk-check-input`),t=document.querySelector(`#merchant-bulk-check-result`);if(!e||!t)return;let n=e.value.trim();if(!n){alert(`조회할 내용을 붙여넣어 주세요.`);return}let r=n.match(/\b(?:\d{3}-\d{2}-\d{5}|\d{10})\b/g)||[],i=n.match(/\b(?:\d{6}-\d|\d{7})\b/g)||[],a=[...new Set(r.map(e=>e.replace(/[^0-9]/g,``)))],o=[...new Set(i.map(e=>e.replace(/[^0-9]/g,``)))];if(a.length===0&&o.length===0){t.innerHTML=`<div style="padding:12px;">조회 가능한 사업자번호 또는 식별번호가 없습니다.</div>`;return}let{data:s,error:c}=await X.from(`merchants`).select(`id, merchant_name, business_number, resident_number, status`);if(c){alert(`가맹점 조회 실패: `+c.message);return}let l=(s||[]).filter(e=>{let t=String(e.business_number||``).replace(/[^0-9]/g,``),n=String(e.resident_number||``).replace(/[^0-9]/g,``),r=t&&a.includes(t),i=n&&o.some(e=>n.startsWith(e));return r||i});if(l.length===0){t.innerHTML=`<div style="padding:14px; font-weight:700;">일치하는 가맹점이 없습니다.</div>`;return}t.innerHTML=`<div style="margin-bottom:10px; font-weight:700;">일치 가맹점 `+l.length+`건</div>`+l.map(e=>{let t=e.business_number||``,n=e.resident_number?String(e.resident_number).slice(0,8):``;return`<div style="padding:10px 12px;margin-bottom:8px;border:1px solid #f0b3b3;border-radius:8px;background:#fff6f6;"><strong>`+(e.merchant_name||`-`)+`</strong><div style="margin-top:4px; font-size:12px; font-weight:700;">가맹점ID: MER`+String(e.id).padStart(4,`0`)+`</div><div style="margin-top:4px; font-size:12px;">`+(t?`사업자번호: `+t:`식별번호: `+n)+`</div><div style="margin-top:2px; font-size:12px;">상태: `+(e.status||`-`)+`</div></div>`}).join(``)})}),S&&(S.innerHTML=`<tr><th>No</th><th>가맹점ID</th><th>가맹점명</th><th>대표자</th><th>연락처</th><th>수수료율</th><th>정산주기</th><th>상태</th>`),C.innerHTML=``,document.querySelector(`#merchant-pagination`)?.remove();let A=document.createElement(`div`);A.id=`merchant-pagination`,A.className=`admin-pagination`,A.style.margin=`0 auto`,A.innerHTML=`<button id="merchant-prev-page"`+(y<=1?` disabled`:``)+`>이전</button><span>`+y+` / `+v+`</span><button id="merchant-next-page"`+(y>=v?` disabled`:``)+`>다음</button>`,document.querySelector(`.admin-table-top`)?.appendChild(A),document.querySelector(`#merchant-prev-page`)?.addEventListener(`click`,()=>{y<=1||(sessionStorage.setItem(`merchant_admin_page`,String(y-1)),location.reload())}),document.querySelector(`#merchant-next-page`)?.addEventListener(`click`,()=>{y>=v||(sessionStorage.setItem(`merchant_admin_page`,String(y+1)),location.reload())}),m?.addEventListener(`change`,()=>{sessionStorage.setItem(`admin_page_size`,m.value),sessionStorage.setItem(`merchant_admin_page`,`1`),location.reload()}),p.forEach((n,o)=>{let s=document.createElement(`tr`);s.innerHTML=`<td>`+(b+o+1)+`</td><td><button class="merchant-link-btn" data-id="`+n.id+`">MER`+String(n.id).padStart(4,`0`)+`</button></td><td><button class="merchant-link-btn" data-id="`+n.id+`">`+(n.merchant_name||`-`)+`</button></td><td>`+(n.owner_name||`-`)+`</td><td>`+(n.phone||`-`)+`</td><td>`+(n.fee_rate||0)+`%</td><td>`+(n.settlement_cycle||`-`)+`</td><td>`+(n.status||`운영`)+`</td>`,C.appendChild(s),s.querySelectorAll(`.merchant-link-btn`).forEach(o=>{o.addEventListener(`click`,async()=>{sessionStorage.setItem(`selected_merchant_id`,String(n.id)),r&&(r.innerHTML=`▶ 가맹점관리 > 업체/가맹점 등록`),i&&(i.innerHTML=``),x&&(x.innerHTML=`<div class="merchant-detail-header"><h2>업체/가맹점 등록 정보</h2><p>가맹점 등록정보, PG정보, 정산정보를 확인하고 수정합니다.</p></div>`),a&&(a.innerHTML=``);let o=document.querySelector(`.admin-table thead`),s=document.querySelector(`#paymentTableBody`);o&&(o.innerHTML=``),s.innerHTML=`<tr><td colspan="12"><div class="merchant-detail-page"><div class="merchant-detail-section"><h3>등록정보</h3><div class="merchant-detail-grid"><label>등록구분</label><select id="register_type"`+(t===`AGENCY`||t===`MANAGER`?` disabled`:``)+`><option `+(n.register_type===`가맹점`?`selected`:``)+`>가맹점</option><option `+(n.register_type===`담당자`?`selected`:``)+`>담당자</option><option `+(n.register_type===`대리점`?`selected`:``)+`>대리점</option></select><label>담당자</label><div class="manager-select-group"><select id="branch_admin_select"`+(t===`AGENCY`||t===`MANAGER`?` disabled`:``)+`><option value="">지사 선택</option></select><select id="agency_admin_select"`+(t===`AGENCY`||t===`MANAGER`?` disabled`:``)+`><option value="">대리점 선택</option></select><select id="manager_admin_id"`+(t===`AGENCY`||t===`MANAGER`?` disabled`:``)+`><option value="">담당자 선택</option></select></div><label>사용 PG사</label><div class="merchant-pg-select-grid"><div class="merchant-pg-select-item"><span>온라인결제 1</span><select id="online-pg-company-1"`+(t===`AGENCY`||t===`MANAGER`?` disabled`:``)+`><option value="">사용안함</option><option value="토스페이먼츠" `+(n.online_pg_company_1===`토스페이먼츠`?`selected`:``)+`>토스페이먼츠</option><option value="코페이" `+(n.online_pg_company_1===`코페이`?`selected`:``)+`>코페이</option><option value="다우데이타" `+(n.online_pg_company_1===`다우데이타`?`selected`:``)+`>다우데이타</option></select></div><div class="merchant-pg-select-item"><span>온라인결제 2</span><select id="online-pg-company-2"`+(t===`AGENCY`||t===`MANAGER`?` disabled`:``)+`><option value="">사용안함</option><option value="토스페이먼츠" `+(n.online_pg_company_2===`토스페이먼츠`?`selected`:``)+`>토스페이먼츠</option><option value="코페이" `+(n.online_pg_company_2===`코페이`?`selected`:``)+`>코페이</option><option value="다우데이타" `+(n.online_pg_company_2===`다우데이타`?`selected`:``)+`>다우데이타</option></select></div><div class="merchant-pg-select-item"><span>수기결제</span><select id="manual-pg-company"`+(t===`AGENCY`||t===`MANAGER`?` disabled`:``)+`><option value="">사용안함</option><option value="코페이" `+(n.manual_pg_company===`코페이`?`selected`:``)+`>코페이</option><option value="다우데이타" `+(n.manual_pg_company===`다우데이타`?`selected`:``)+`>다우데이타</option></select></div></div><label>회사구분</label><select id="company_type"`+(t===`AGENCY`||t===`MANAGER`?` disabled`:``)+`><option `+(n.company_type===`개인(일반)`?`selected`:``)+`>개인(일반)</option><option `+(n.company_type===`개인사업자`?`selected`:``)+`>개인사업자</option><option `+(n.company_type===`법인사업자`?`selected`:``)+`>법인사업자</option></select><label>CPID</label><input id="cpid" value="`+(n.cpid||`MER`+String(n.id).padStart(4,`0`))+`"`+(t===`AGENCY`||t===`MANAGER`?` readonly`:``)+` /><label>사업자번호</label><input id="business_number" value="`+(n.business_number||``)+`"`+(t===`AGENCY`||t===`MANAGER`?` readonly`:``)+` /><label>운영상태</label><select id="merchant_status"`+(t===`AGENCY`||t===`MANAGER`?` disabled`:``)+`><option `+(n.status===`신청`?`selected`:``)+`>신청</option><option `+(n.status===`심사중`?`selected`:``)+`>심사중</option><option `+(n.status===`운영`?`selected`:``)+`>운영</option><option `+(n.status===`중지`?`selected`:``)+`>중지</option></select><label>개통일자</label><input id="opened_at" type="date" value="`+(n.opened_at||``)+`"`+(t===`AGENCY`||t===`MANAGER`?` readonly`:``)+` /><label>비밀번호</label><input id="merchant-password-input" type="text" value="`+(n.merchant_password||``)+`" placeholder="비밀번호 입력" /></div></div><div class="merchant-detail-section"><h3>기본정보</h3><div class="merchant-detail-grid"><label>가맹점명</label><input id="merchant-name" value="`+(n.merchant_name||``)+`"`+(t===`AGENCY`||t===`MANAGER`?` readonly`:``)+` /><label>가맹점 유형</label><select id="merchant-type"`+(t===`AGENCY`||t===`MANAGER`?` disabled`:``)+`><option value="일반매장" `+(n.merchant_type===`일반매장`?`selected`:``)+`>일반매장</option><option value="아카데미" `+(n.merchant_type===`아카데미`?`selected`:``)+`>아카데미</option><option value="결혼" `+(n.merchant_type===`결혼`?`selected`:``)+`>결혼</option><option value="장례" `+(n.merchant_type===`장례`?`selected`:``)+`>장례</option><option value="무선단말기" `+(n.merchant_type===`무선단말기`?`selected`:``)+`>무선단말기</option><option value="뷰티" `+(n.merchant_type===`뷰티`?`selected`:``)+`>뷰티</option><option value="호텔" `+(n.merchant_type===`호텔`?`selected`:``)+`>호텔</option></select><label>대표자</label><input id="owner-name" value="`+(n.owner_name||``)+`"`+(t===`AGENCY`||t===`MANAGER`?` readonly`:``)+` /><label>주민번호</label><input id="resident-number" value="`+(t===`AGENCY`||t===`MANAGER`?String(n.resident_number||``).replace(/^(\d{6}-?\d)(\d*)$/,`$1******`):n.resident_number||``)+`" placeholder="000000-0000000"`+(t===`AGENCY`||t===`MANAGER`?` readonly`:``)+` /><label>연락처</label><input id="phone" value="`+(n.phone||``)+`" /><label>수수료율</label><input id="fee-rate" value="`+(n.fee_rate||0)+`"`+(t===`AGENCY`||t===`MANAGER`?` readonly`:``)+` /><label>이메일</label><input id="email" value="`+(n.email||``)+`" /><label>법인번호</label><input id="corporate-number" value="`+(n.corporate_number||``)+`"`+(t===`AGENCY`||t===`MANAGER`?` readonly`:``)+` /><label>과세구분</label><select id="tax-type"`+(t===`AGENCY`||t===`MANAGER`?` disabled`:``)+`><option `+(n.tax_type===`과세`?`selected`:``)+`>과세</option><option `+(n.tax_type===`비과세`?`selected`:``)+`>비과세</option></select><label>취급품목</label><input id="product-item" value="`+(n.product_item||``)+`"`+(t===`AGENCY`||t===`MANAGER`?` readonly`:``)+` /><label>업태/종목</label><div class="business-type-row"><input id="business-type" value="`+(n.business_type||``)+`" placeholder="업태"`+(t===`AGENCY`||t===`MANAGER`?` readonly`:``)+` /><input id="business-category" value="`+(n.business_category||``)+`" placeholder="종목"`+(t===`AGENCY`||t===`MANAGER`?` readonly`:``)+` /></div><label>주소</label><div class="address-one-line"><input id="zipcode" class="zipcode-input" placeholder="우편번호" value="`+(n.zipcode||``)+`" /><button type="button" class="address-search-btn">우편번호 찾기</button><input id="address" class="address-main-input" placeholder="기본주소" value="`+(n.address||``)+`" /><input id="address_detail" class="address-detail-input" placeholder="상세주소" value="`+(n.address_detail||``)+`" /></div></div></div>`+(t===`AGENCY`||t===`MANAGER`?``:`<div class="merchant-detail-section"><h3>PG / 단말기 정보</h3><div class="merchant-detail-grid"><label>코페이 PG MID</label><input id="korpay_pg_mid" value="`+(n.korpay_pg_mid||``)+`" /><label>코페이 PG MKEY</label><input id="korpay_pg_mkey" value="`+(n.korpay_pg_mkey||``)+`" /><label>코페이 단말기 MID</label><input id="korpay_terminal_mid" value="`+(n.korpay_terminal_mid||``)+`" /><label>코페이 단말기 MKEY</label><input id="korpay_terminal_mkey" value="`+(n.korpay_terminal_mkey||``)+`" /><label>코페이 수기 MID</label><input id="korpay_manual_mid" value="`+(n.korpay_manual_mid||``)+`" /><label>코페이 수기 MKEY</label><input id="korpay_manual_mkey" value="`+(n.korpay_manual_mkey||``)+`" /><label>토스 Client Key</label><input id="toss_client_key" value="`+(n.toss_client_key||``)+`" /><label>토스 Secret Key</label><input id="toss_secret_key" value="`+(n.toss_secret_key||``)+`" /><label>토스 MID</label><input id="toss_mid" value="`+(n.toss_mid||``)+`" /><label></label><div></div><label>다우 PG MID</label><input id="daou_pg_mid" value="`+(n.daou_pg_mid||``)+`" /><label>다우 PG MKEY</label><input id="daou_pg_mkey" value="`+(n.daou_pg_mkey||``)+`" /><label>다우 단말기 MID</label><input id="daou_terminal_mid" value="`+(n.daou_terminal_mid||``)+`" /><label>다우 단말기 MKEY</label><input id="daou_terminal_mkey" value="`+(n.daou_terminal_mkey||``)+`" /><label>다우 수기 MID</label><input id="daou_manual_mid" value="`+(n.daou_manual_mid||``)+`" /><label>다우 수기 MKEY</label><input id="daou_manual_mkey" value="`+(n.daou_manual_mkey||``)+`" /></div></div>`)+`<div class="merchant-detail-section"><h3>정산정보</h3><div class="merchant-detail-grid"><label>정산은행</label><input id="bank_name" value="`+(n.bank_name||``)+`"`+(e===`NXGMASTER16`?``:` readonly`)+` /><label>계좌번호</label><input id="account_number" value="`+(t===`AGENCY`||t===`MANAGER`?String(n.account_number||``).replace(/(\d{4})$/,`****`):n.account_number||``)+`"`+(e===`NXGMASTER16`?``:` readonly`)+` /><label>예금주</label><input id="account_holder" value="`+(n.account_holder||``)+`"`+(e===`NXGMASTER16`?``:` readonly`)+` /><label>정산주기</label><select id="settlement_cycle"`+(t===`AGENCY`||t===`MANAGER`?` disabled`:``)+`><option value="1일" `+(n.settlement_cycle===`1일`?`selected`:``)+`>1일</option><option value="3일" `+(n.settlement_cycle===`3일`?`selected`:``)+`>3일</option><option value="4일" `+((n.settlement_cycle||`4일`)===`4일`?`selected`:``)+`>4일</option><option value="7일" `+(n.settlement_cycle===`7일`?`selected`:``)+`>7일</option></select></div></div><div class="merchant-detail-section"><h3>위험관리 / 한도설정</h3><div class="merchant-detail-grid merchant-risk-grid"><label>최대할부기간</label><select id="installment-month"`+(t===`AGENCY`||t===`MANAGER`?` disabled`:``)+`><option `+(n.installment_month===`2개월`?`selected`:``)+`>2개월</option><option `+(n.installment_month===`3개월`?`selected`:``)+`>3개월</option><option `+(n.installment_month===`4개월`?`selected`:``)+`>4개월</option><option `+(n.installment_month===`5개월`?`selected`:``)+`>5개월</option><option `+(n.installment_month===`6개월`?`selected`:``)+`>6개월</option><option `+(n.installment_month===`10개월`?`selected`:``)+`>10개월</option><option `+(n.installment_month===`12개월`?`selected`:``)+`>12개월</option></select><label>1일 승인한도</label><input id="daily-limit" value="`+(n.daily_limit||``)+`"`+(t===`AGENCY`||t===`MANAGER`?` readonly`:``)+` /><label>월한도</label><input id="monthly-limit" value="`+(n.monthly_limit||``)+`"`+(t===`AGENCY`||t===`MANAGER`?` readonly`:``)+` /><label>연한도</label><input id="yearly-limit" value="`+(n.yearly_limit||``)+`"`+(t===`AGENCY`||t===`MANAGER`?` readonly`:``)+` /></div></div>`+(t===`AGENCY`||t===`MANAGER`?`<div class="merchant-detail-section"><h3>첨부서류</h3><p style="color:#777; padding:10px 0;">열람 권한이 없습니다.</p></div>`:`<div class="merchant-detail-section"><h3>첨부서류</h3><div class="merchant-file-list"><div class="merchant-file-row"><label>사업자등록증</label><input type="file" /><span>기존 파일: `+(n.business_license_url?`<a href="`+n.business_license_url+`" target="_blank">보기</a>`:`첨부파일 없음`)+`</span></div><div class="merchant-file-row"><label>통장사본</label><input type="file" /><span>기존 파일: `+(n.bankbook_url?`<a href="`+n.bankbook_url+`" target="_blank">보기</a>`:`첨부파일 없음`)+`</span></div><div class="merchant-file-row"><label>대표자 신분증</label><input type="file" /><span>기존 파일: `+(n.id_card_url?`<a href="`+n.id_card_url+`" target="_blank">보기</a>`:`첨부파일 없음`)+`</span></div><div class="merchant-file-row"><label>판매상품 사진</label><input type="file" /><span>기존 파일: `+(n.product_photo_url?`<a href="`+n.product_photo_url+`" target="_blank">보기</a>`:`첨부파일 없음`)+`</span></div><div class="merchant-file-row"><label>기타서류</label><input type="file" /><span>기존 파일: `+(n.extra_file_url?`<a href="`+n.extra_file_url+`" target="_blank">보기</a>`:`첨부파일 없음`)+`</span></div><div class="merchant-file-row"><label>메모</label><textarea id="merchant-memo" placeholder="심사 메모를 입력하세요">`+(n.memo||``)+`</textarea></div></div></div>`)+`<div class="merchant-detail-actions"><button class="merchant-save-btn" id="save-merchant-info">저장</button><button class="merchant-save-btn" id="approve-merchant">개통완료</button><button class="merchant-save-btn" id="show-merchant-login">로그인정보 확인</button><button class="merchant-reject-btn" id="delete-merchant">삭제</button><button class="merchant-close-btn" id="back-merchant-list">목록으로</button></div></div></td></tr>`,document.querySelector(`.address-search-btn`)?.addEventListener(`click`,()=>{new window.daum.Postcode({oncomplete:e=>{let t=document.querySelector(`#zipcode`),n=document.querySelector(`#address`),r=document.querySelector(`#address_detail`);t&&(t.value=e.zonecode),n&&(n.value=e.roadAddress||e.jibunAddress),r?.focus()}}).open()});let c=document.querySelector(`#branch_admin_select`),l=document.querySelector(`#agency_admin_select`),u=document.querySelector(`#manager_admin_id`),{data:d,error:f}=await X.from(`admin_users`).select(`id, admin_name, login_id, role, status, parent_admin_id, phone`).eq(`status`,`사용중`);if(f)console.error(`조직정보 조회 실패:`,f);else{let e=d||[],t=e.filter(e=>e.role===`BRANCH`||String(e.login_id||``).startsWith(`S`)),r=e.filter(e=>e.role===`AGENCY`||String(e.login_id||``).startsWith(`A`)),i=e.filter(e=>e.role===`MANAGER`||String(e.login_id||``).startsWith(`B`));c&&(c.innerHTML=`<option value="">지사 선택</option>`+t.map(e=>`<option value="`+e.id+`">`+(e.admin_name||`-`)+`</option>`).join(``)),c?.addEventListener(`change`,()=>{let e=Number(c.value);if(l&&(l.innerHTML=`<option value="">대리점 선택</option>`),u&&(u.innerHTML=`<option value="">담당자 선택</option>`),!e)return;let t=r.filter(t=>Number(t.parent_admin_id)===e);l&&(l.innerHTML=`<option value="">대리점 선택</option>`+t.map(e=>`<option value="`+e.id+`">`+(e.admin_name||`-`)+`</option>`).join(``))}),l?.addEventListener(`change`,()=>{let e=Number(l.value);if(u&&(u.innerHTML=`<option value="">담당자 선택</option>`),!e)return;let t=i.filter(t=>Number(t.parent_admin_id)===e);u&&(u.innerHTML=`<option value="">담당자 선택</option>`+t.map(e=>`<option value="`+e.id+`">`+(e.admin_name||`-`)+`</option>`).join(``))});let a=Number(n.branch_admin_id||0),o=Number(n.agency_admin_id||0),s=Number(n.manager_admin_id||0);a&&c&&(c.value=String(a),c.dispatchEvent(new Event(`change`))),o&&l&&(l.value=String(o),l.dispatchEvent(new Event(`change`))),s&&u&&(u.value=String(s))}document.querySelector(`#back-merchant-list`)?.addEventListener(`click`,()=>{location.reload()}),document.querySelector(`#save-merchant-info`)?.addEventListener(`click`,async()=>{let e=(document.querySelector(`#merchant-name`)?.value||``).trim(),r=(document.querySelector(`#owner-name`)?.value||``).trim(),i=(document.querySelector(`#phone`)?.value||``).trim(),a=Number(document.querySelector(`#fee-rate`)?.value||0),o=e=>document.getElementById(e)?.value||``,s={merchant_name:e,merchant_type:o(`merchant-type`),owner_name:r,phone:i,fee_rate:a,register_type:o(`register_type`),manager_admin_id:Number(o(`manager_admin_id`))||null,manager_admin_name:document.querySelector(`#manager_admin_id`)?.selectedOptions[0]?.textContent?.trim()||``,manager_phone:d?.find(e=>Number(e.id)===Number(o(`manager_admin_id`)))?.phone||``,agency_admin_id:Number(o(`agency_admin_select`))||null,agency_name:document.querySelector(`#agency_admin_select`)?.selectedOptions[0]?.textContent?.trim()||``,agency_admin_name:document.querySelector(`#agency_admin_select`)?.selectedOptions[0]?.textContent?.trim()||``,branch_admin_id:Number(o(`branch_admin_select`))||null,branch_admin_name:document.querySelector(`#branch_admin_select`)?.selectedOptions[0]?.textContent?.trim()||``,pg_company:o(`online-pg-company-1`)||o(`online-pg-company-2`)||o(`manual-pg-company`),online_pg_company_1:o(`online-pg-company-1`),online_pg_company_2:o(`online-pg-company-2`),manual_pg_company:o(`manual-pg-company`),company_type:o(`company_type`),status:o(`merchant_status`),resident_number:o(`resident-number`),business_number:o(`business_number`),email:o(`email`),zipcode:o(`zipcode`),address:o(`address`),address_detail:o(`address_detail`),cpid:o(`cpid`),korpay_pg_mid:o(`korpay_pg_mid`),korpay_pg_mkey:o(`korpay_pg_mkey`),korpay_terminal_mid:o(`korpay_terminal_mid`),korpay_terminal_mkey:o(`korpay_terminal_mkey`),korpay_manual_mid:o(`korpay_manual_mid`),korpay_manual_mkey:o(`korpay_manual_mkey`),toss_client_key:o(`toss_client_key`),toss_secret_key:o(`toss_secret_key`),toss_mid:o(`toss_mid`),daou_pg_mid:o(`daou_pg_mid`),daou_pg_mkey:o(`daou_pg_mkey`),daou_terminal_mid:o(`daou_terminal_mid`),daou_terminal_mkey:o(`daou_terminal_mkey`),daou_manual_mid:o(`daou_manual_mid`),daou_manual_mkey:o(`daou_manual_mkey`),opened_at:o(`opened_at`)||null,bank_name:o(`bank_name`),account_number:o(`account_number`),account_holder:o(`account_holder`),settlement_cycle:o(`settlement_cycle`),memo:o(`merchant-memo`)};if((sessionStorage.getItem(`admin_id`)||``)!==`NXGMASTER16`&&(delete s.bank_name,delete s.account_number,delete s.account_holder),t===`AGENCY`||t===`MANAGER`){let e={phone:s.phone,email:s.email,zipcode:s.zipcode,address:s.address,address_detail:s.address_detail};Object.keys(s).forEach(e=>{delete s[e]}),Object.assign(s,e)}let c=o(`merchant-password-input`);c&&(s.merchant_password=c),console.log(`실제 저장 데이터:`,s);let{data:l,error:u}=await X.from(`merchants`).update(s).eq(`id`,n.id).select();if(console.log(`저장 대상 merchant.id:`,n.id),console.log(`저장 결과 data:`,l),console.log(`저장 error:`,u),u){alert(`저장 실패: `+u.message);return}alert(`저장되었습니다.`),location.reload()}),document.querySelector(`#approve-merchant`)?.addEventListener(`click`,async()=>{if(t===`AGENCY`||t===`MANAGER`){alert(`권한이 없습니다.`);return}if(!confirm(`개통완료 처리하시겠습니까?`))return;let e=n.merchant_login_id||`MER`+String(n.id).padStart(4,`0`),r=n.merchant_password||`1234`,{error:i}=await X.from(`merchants`).update({status:`운영`,merchant_login_id:e,merchant_password:r,opened_at:new Date().toISOString().slice(0,10)}).eq(`id`,n.id);if(i){alert(`개통완료 실패: `+i.message);return}alert(`개통완료 처리되었습니다.`),location.reload()}),document.querySelector(`#show-merchant-login`)?.addEventListener(`click`,()=>{if(t===`AGENCY`||t===`MANAGER`){alert(`권한이 없습니다.`);return}alert(`가맹점 로그인정보

로그인 주소 : https://payment-app-ybtf.vercel.app/merchant-login
아이디 : `+(n.merchant_login_id||`-`)+`
비밀번호 : `+(n.merchant_password||`-`))}),document.querySelector(`#delete-merchant`)?.addEventListener(`click`,async()=>{if(t===`AGENCY`||t===`MANAGER`){alert(`권한이 없습니다.`);return}if(!confirm(`이 신청내역을 삭제하시겠습니까?`))return;let{error:e}=await X.from(`merchants`).delete().eq(`id`,n.id);if(e){alert(`삭제 실패: `+e.message);return}alert(`삭제되었습니다.`),location.reload()})})})})}),o?.click()}if(c===`payout`){let e=document.querySelector(`.admin-sub-menu`),t=document.querySelector(`.admin-title`),n=document.querySelector(`.admin-search-box`),r=document.querySelector(`.admin-summary`),i=document.querySelector(`.admin-table thead`),a=document.querySelector(`#paymentTableBody`),o=document.querySelector(`.admin-table-top`);t&&(t.innerHTML=`▶ 출금관리`),n&&(n.innerHTML=``),r&&(r.innerHTML=``),i&&(i.innerHTML=``),a&&(a.innerHTML=``),o&&(o.innerHTML=`<button>엑셀 다운로드</button><div class="payout-top-pagination"><button id="payout-prev-top">이전</button><span id="payout-page-info-top">1 / 1</span><button id="payout-next-top">다음</button></div><select id="withdraw-page-size"><option value="10">10개씩 보기</option><option value="20">20개씩 보기</option><option value="50">50개씩 보기</option></select>`);let s=1,c=Number(sessionStorage.getItem(`withdraw_page_size`)||10),l=`scheduled`;e&&(e.innerHTML=``),document.querySelectorAll(`.payout-sub-tab`).forEach(e=>{e.addEventListener(`click`,async()=>{let n=e.dataset.payoutView||`scheduled`;if(l=n,document.querySelectorAll(`.payout-sub-tab`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),n===`manager`){t&&(t.innerHTML=`▶ 출금관리 > 담당자 정산`);let{data:e,error:n}=await X.from(`payments`).select(`
    id,
    created_at,
    amount,
    status,
    branch_admin_id,
    branch_admin_name,
    branch_fee_rate,
    agency_admin_id,
    agency_admin_name,
    agency_fee_rate,
    manager_admin_id,
    manager_admin_name,
    manager_fee_rate
  `).eq(`status`,`paid`).order(`created_at`,{ascending:!1});if(n){alert(`담당자 정산 조회 실패: `+n.message);return}let r=new Map,o=(e,t,n,i,a,o)=>{if(!n||a<=0)return;let s=e+`-`+t+`-`+n,c=Math.floor(o*a/100),l=r.get(s);l?(l.payment_count+=1,l.total_payment_amount+=o,l.commission_amount+=c):r.set(s,{settlement_month:e,role:t,admin_id:n,admin_name:i||`-`,commission_rate:a,payment_count:1,total_payment_amount:o,commission_amount:c})};(e||[]).forEach(e=>{let t=Number(e.amount||0),n=e.created_at?String(e.created_at).slice(0,7):`-`,r=Number(e.branch_fee_rate||0),i=Number(e.agency_fee_rate||0),a=Number(e.manager_fee_rate||0),s=Math.max(r-i,0),c=Math.max(i-a,0),l=Math.max(a,0);o(n,`BRANCH`,e.branch_admin_id?Number(e.branch_admin_id):null,e.branch_admin_name||``,s,t),o(n,`AGENCY`,e.agency_admin_id?Number(e.agency_admin_id):null,e.agency_admin_name||``,c,t),o(n,`MANAGER`,e.manager_admin_id?Number(e.manager_admin_id):null,e.manager_admin_name||``,l,t)});let s=Array.from(r.values()).sort((e,t)=>{if(e.settlement_month!==t.settlement_month)return t.settlement_month.localeCompare(e.settlement_month);let n={BRANCH:1,AGENCY:2,MANAGER:3};return n[e.role]-n[t.role]});i&&(i.innerHTML=`<tr><th>정산월</th><th>구분</th><th>조직명</th><th>실제 지급률</th><th>결제건수</th><th>결제금액</th><th>지급예정액</th></tr>`),a.innerHTML=``,s.forEach(e=>{let t=document.createElement(`tr`);t.innerHTML=`<td>`+e.settlement_month+`</td><td>`+(e.role===`BRANCH`?`지사`:e.role===`AGENCY`?`대리점`:`담당자`)+`</td><td>`+e.admin_name+`</td><td>`+e.commission_rate.toFixed(2)+`%</td><td>`+e.payment_count.toLocaleString()+`</td><td>`+e.total_payment_amount.toLocaleString()+`원</td><td>`+e.commission_amount.toLocaleString()+`원</td>`,a.appendChild(t)})}})}),t&&(t.innerHTML=`▶ 출금관리 > 출금예정내역`),n&&(n.innerHTML=`
          <div class="payout-search-panel">
            <div class="payout-search-row">
              <input type="hidden" name="payout-date-type" value="거래일">
    
              <span class="payout-search-label">기간</span>
              <input id="payout-start-date" type="date">
              <span>~</span>
              <input id="payout-end-date" type="date">
    
              <button id="payout-prev-btn" class="payout-small-btn">이전</button>
<button id="payout-today-btn" class="payout-small-btn">오늘</button>
<button id="payout-next-btn" class="payout-small-btn">다음</button>
<button id="payout-month-btn" class="payout-small-btn">당월</button>
            </div>
    
            <div class="payout-search-row">
              <span class="payout-search-label">PG</span>
              <select id="payout-pg-filter">
                <option value="전체">전체</option>
                <option value="토스페이먼츠">토스페이먼츠</option>
                <option value="코페이">코페이</option>
              </select>
    
              <span class="payout-search-label">출금상태</span>
              <select id="payout-status-filter">
                <option value="전체">전체</option>
                <option value="출금대기">출금대기</option>
                <option value="출금보류">출금보류</option>
                <option value="계좌오류">계좌오류</option>
                <option value="계좌인증">계좌인증</option>
                <option value="출금완료">출금완료</option>
                <option value="출금오류">출금오류</option>
              </select>
    
              <span class="payout-search-label">조회대상</span>
              <select id="payout-target-filter">
                <option value="전체">전체</option>
                <option value="가맹점">가맹점</option>
                <option value="담당자">담당자</option>
                <option value="대리점">대리점</option>
                <option value="지사">지사</option>
              </select>
    
              <input id="payout-keyword" type="text" placeholder="검색어">
              <button id="payout-search-btn" class="payout-search-btn">조회</button>
    
              
            </div>
          </div>
        `),i&&(i.innerHTML=`<tr><th>No</th><th>가맹점ID</th><th>가맹점명</th><th>PG사</th><th>결제금액</th><th>수수료</th><th>출금예정금액</th><th>결제일</th><th>출금예정일</th><th>출금상태</th><th>처리</th></tr>`);let{data:u,error:d}=await X.from(`payments`).select(`*`).order(`created_at`,{ascending:!1}),{data:f,error:p}=await X.from(`cancel_requests`).select(`id, payment_id, status, reason`).eq(`status`,`요청중`);if(p){alert(`취소요청 조회 실패: `+p.message);return}let m=new Map;(f||[]).forEach(e=>{m.set(Number(e.payment_id),e)});let{data:h,error:g}=await X.from(`merchants`).select(`id, settlement_cycle`);if(g){alert(`가맹점 정산주기 조회 실패: `+g.message);return}let _=new Map;if((h||[]).forEach(e=>{_.set(Number(e.id),String(e.settlement_cycle||`1일`))}),d){alert(`출금내역 조회 실패: `+d.message);return}let{data:v,error:y}=await X.from(`holidays`).select(`holiday_date`);if(y){alert(`공휴일 조회 실패: `+y.message);return}let b=new Set((v||[]).map(e=>e.holiday_date)),x=0;try{let e=await(await fetch(`/api/toss-balance`)).json();e.success&&(x=Number(e.data?.entityBody?.availableAmount?.value||0))}catch(e){console.error(`토스 잔액 조회 실패:`,e)}let S=new Set,C={};(u||[]).forEach(e=>{let t=String(e.approval_number||``).trim(),n=Number(e.amount||0);if(!t)return;let r=t+`_`+n;C[r]=(C[r]||0)+1}),Object.entries(C).forEach(([e,t])=>{t>1&&S.add(e)});let w=S.size,T=(u||[]).filter(e=>e.payout_status===`출금오류`),E=T.length,D=(u||[]).filter(e=>e.payout_status===`계좌오류`),O=D.length,k=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`,A=(e,t)=>{let n=new Date(e),r=String(t||`1일`).trim().match(/\d+/),i=r?Number(r[0]):1;if(i===0)for(;;){let e=n.getDay(),t=k(n),r=e===0||e===6,i=b.has(t);if(!r&&!i)return t;n.setDate(n.getDate()+1)}let a=0;for(;a<i;){n.setDate(n.getDate()+1);let e=n.getDay(),t=k(n),r=e===0||e===6,i=b.has(t);r||i||(a+=1)}return k(n)},j={};(u||[]).forEach(e=>{if(e.status===`cancel`||e.payout_status===`출금제외`||e.settlement_status===`취소`)return;let t=_.get(Number(e.merchant_id))||`1일`,n=A(e.created_at,t),r=String(e.merchant_id||``)+`_`+n,i=Number(e.amount||0),a=Number(e.fee_amount||0),o=Number(e.settlement_amount??i-a);j[r]||(j[r]={id:Number(e.id),merchant_id:e.merchant_id,merchant_name:e.merchant_name||`-`,pg_company:e.pg_company||`-`,manager_admin_name:e.manager_admin_name||``,agency_admin_name:e.agency_admin_name||``,branch_admin_name:e.branch_admin_name||``,created_at:e.created_at,payout_date:n,settlement_cycle:String(t||``).replace(/[^0-9]/g,``),order_id:e.order_id||``,payment_key:e.payment_key||``,amount:0,fee_amount:0,settlement_amount:0,payout_status:e.payout_status||`출금대기`,payout_time:e.payout_time||null,payment_count:0,payment_ids:[],payout_hold:e.payout_hold===!0,payout_hold_reason:e.payout_hold_reason||null,payout_hold_at:e.payout_hold_at||null,payout_hold_by:e.payout_hold_by||null});let s=j[r];s.amount+=i,s.fee_amount+=a,s.settlement_amount+=o,s.payment_count+=1,s.payment_ids.push(Number(e.id)),e.payout_time&&(!s.payout_time||e.payout_time>s.payout_time)&&(s.payout_time=e.payout_time),e.payout_status===`출금오류`?s.payout_status=`출금오류`:s.payout_status!==`출금오류`&&e.payout_status!==`출금완료`&&(s.payout_status=`출금대기`)});let M=Object.values(j),{data:N,error:P}=await X.from(`merchants`).select(`
      id,
      merchant_name,
      branch_admin_id,
      agency_admin_id,
      manager_admin_id
    `);if(P){alert(`출금 조직 가맹점 조회 실패: `+P.message);return}let{data:F,error:I}=await X.from(`admin_users`).select(`
      id,
      admin_name,
      company_name,
      role,
      parent_admin_id
    `);if(I){alert(`출금 조직정보 조회 실패: `+I.message);return}let L=new Map;(N||[]).forEach(e=>{L.set(Number(e.id),e)});let R=new Map;(F||[]).forEach(e=>{R.set(Number(e.id),e)});let ee=e=>{if(!e)return``;let t=String(e.company_name||``).trim(),n=String(e.admin_name||``).trim();return[t,n,t&&n?t+`(`+n+`)`:``].filter(Boolean).join(` `).toLowerCase()},te=e=>{let t=L.get(e);if(!t)return{merchant:``,manager:``,agency:``,branch:``};let n=t.manager_admin_id?R.get(Number(t.manager_admin_id)):null,r=t.agency_admin_id?R.get(Number(t.agency_admin_id)):null,i=t.branch_admin_id?R.get(Number(t.branch_admin_id)):null;if(!r&&n){let e=R.get(Number(n.parent_admin_id));e?.role===`AGENCY`&&(r=e),e?.role===`BRANCH`&&(i=e)}return!i&&r&&(i=R.get(Number(r.parent_admin_id))),{merchant:String(t.merchant_name||``).toLowerCase(),manager:ee(n),agency:ee(r),branch:ee(i)}},ne=`normal`,re=()=>{let e=document.querySelector(`#payout-pg-filter`)?.value||`전체`,t=document.querySelector(`#payout-status-filter`)?.value||`전체`,n=document.querySelector(`#payout-target-filter`)?.value||`전체`,r=(document.querySelector(`#payout-keyword`)?.value||``).trim(),i=document.querySelector(`#payout-start-date`)?.value||``,a=document.querySelector(`#payout-end-date`)?.value||``;return M.filter(o=>{if(o.payout_hold===!0)return!1;let s=o.payout_status||`출금대기`;if(e!==`전체`&&o.pg_company!==e||t!==`전체`&&s!==t)return!1;if(ne===`incoming`){let e=String(o.pg_company||``).trim(),t=``;if(e===`토스페이먼츠`?t=ie(o.created_at):e===`코페이`&&(t=A(o.created_at,o.settlement_cycle||`1일`)),i&&t<i||a&&t>a)return!1}else if(ne===`expected`){if(i&&o.payout_date<i||a&&o.payout_date>a||o.payout_status===`출금완료`||o.payout_status===`출금제외`)return!1}else if(ne===`completed`){if(o.payout_status!==`출금완료`||!o.payout_time)return!1;let e=new Date(o.payout_time).toLocaleDateString(`en-CA`,{timeZone:`Asia/Seoul`});if(i&&e<i||a&&e>a)return!1}else if(i&&o.payout_date<i||a&&o.payout_date>a)return!1;if(r){let e=r.toLowerCase(),t=te(Number(o.merchant_id)),i={전체:[t.merchant,t.manager,t.agency,t.branch,String(o.merchant_id||``),String(o.pg_company||``),String(o.order_id||``),String(o.payment_key||``)].join(` `).toLowerCase(),가맹점:t.merchant,담당자:t.manager,대리점:t.agency,지사:t.branch};if(!(i[n]||i.전체).includes(e))return!1}return!0})},ie=e=>{let t=new Date(e).toLocaleDateString(`en-CA`,{timeZone:`Asia/Seoul`}),n=new Date(t+`T12:00:00`),r=0;for(;r<4;){n.setDate(n.getDate()+1);let e=n.getDay(),t=n.getFullYear()+`-`+String(n.getMonth()+1).padStart(2,`0`)+`-`+String(n.getDate()).padStart(2,`0`),i=e===0||e===6,a=b.has(t);!i&&!a&&(r+=1)}return n.getFullYear()+`-`+String(n.getMonth()+1).padStart(2,`0`)+`-`+String(n.getDate()).padStart(2,`0`)},z=()=>{if(sessionStorage.getItem(`adminPage`)!==`payout`)return;let e=re(),t=document.querySelector(`#payout-start-date`)?.value||``,n=document.querySelector(`#payout-end-date`)?.value||``,i=sessionStorage.getItem(`admin_id`)||``,o=i===`NXGMASTER16`,l=i===`NXGMASTER16`,d=e.reduce((e,t)=>{if(t.payout_status===`출금완료`)return e;let n=Number(t.amount||0),r=Number(t.fee_amount||0);return e+Number(t.settlement_amount||n-r)},0),f=e.length,p=document.querySelector(`#payout-pg-filter`)?.value||`전체`,m=(u||[]).reduce((e,r)=>{if(r.status===`cancel`||r.payout_status===`출금제외`||r.settlement_status===`취소`)return e;let i=String(r.pg_company||``).trim();if(p!==`전체`&&i!==p)return e;let a=``;if(i===`토스페이먼츠`)a=ie(r.created_at);else if(i===`코페이`){let e=_.get(Number(r.merchant_id))||`1일`;a=A(r.created_at,e)}else return e;if(t&&a<t||n&&a>n)return e;let o=Number(r.amount||0);if(i===`토스페이먼츠`){let t=Math.floor(o*1.37/100),n=Math.floor(t*.1);return e+o-t-n}return e+Number(r.settlement_amount??o)},0),h=e.reduce((e,t)=>{if(t.payout_status!==`출금완료`)return e;let n=Number(t.amount||0),r=Number(t.fee_amount||0);return e+Number(t.settlement_amount||n-r)},0);r&&(r.innerHTML=`
          <div class="payout-summary-cards">
        
            <div class="payout-summary-card target">
              <div class="payout-summary-icon">👥</div>
              <div class="payout-summary-info">
                <div class="payout-summary-title">출금대상</div>
                <div class="payout-summary-value">${f.toLocaleString()}건</div>
              </div>
            </div>

           <div
  id="incoming-expected-card"
  class="payout-summary-card incoming"
  style="cursor:pointer;"
>
  <div class="payout-summary-icon">🏦</div>

  <div class="payout-summary-info">
    <div class="payout-summary-title">
      입금예정금액
    </div>

    <div class="payout-summary-value">
      ${m.toLocaleString()}원
    </div>
  </div>
</div>
        
${o?`
  <button
    type="button"
    id="payout-balance-button"
    class="payout-summary-card balance payout-summary-button"
  >
    <div class="payout-summary-icon">🏦</div>
    <div class="payout-summary-info">
      <div class="payout-summary-title">출금계좌잔액</div>
      <div class="payout-summary-value">
        ${x.toLocaleString()}원
      </div>
    </div>
  </button>
`:``}
        
            <div
  id="payout-expected-card"
  class="payout-summary-card amount"
  style="cursor:pointer;"
>
              <div class="payout-summary-icon">💳</div>
              <div class="payout-summary-info">
                <div class="payout-summary-title">출금예정금액</div>
                <div class="payout-summary-value">${d.toLocaleString()}원</div>
              </div>
            </div>

            <div
  id="payout-completed-card"
  class="payout-summary-card completed"
  style="cursor:pointer;"
>
  <div class="payout-summary-icon">✅</div>
  <div class="payout-summary-info">
    <div class="payout-summary-title">출금완료</div>
    <div class="payout-summary-value">
      ${h.toLocaleString()}원
    </div>
  </div>
</div>
        
            <div
  id="duplicate-payment-card"
  class="payout-summary-card duplicate"
>
              <div class="payout-summary-icon">⚠️</div>
              <div class="payout-summary-info">
                <div class="payout-summary-title">중복결제오류</div>
                <div class="payout-summary-value">${w.toLocaleString()}건</div>
              </div>
            </div>
        
            <div
  id="payout-error-card"
  class="payout-summary-card payout-error"
>
              <div class="payout-summary-icon">❗</div>
              <div class="payout-summary-info">
                <div class="payout-summary-title">출금오류</div>
                <div class="payout-summary-value">${E.toLocaleString()}건</div>
              </div>
            </div>
        
            <div
  id="account-error-card"
  class="payout-summary-card account-error"
>
              <div class="payout-summary-icon">💳</div>
              <div class="payout-summary-info">
                <div class="payout-summary-title">계좌오류</div>
                <div class="payout-summary-value">${O.toLocaleString()}건</div>
              </div>
            </div>
        
          </div>
        `),document.querySelector(`#incoming-expected-card`)?.addEventListener(`click`,()=>{ne=`incoming`,s=1;let e=document.querySelector(`#payout-status-filter`);e&&(e.value=`전체`),z()}),document.querySelector(`#payout-expected-card`)?.addEventListener(`click`,()=>{ne=`expected`,s=1;let e=document.querySelector(`#payout-status-filter`);e&&(e.value=`전체`),z()}),document.querySelector(`#payout-completed-card`)?.addEventListener(`click`,()=>{ne=`completed`,s=1;let e=document.querySelector(`#payout-status-filter`);e&&(e.value=`전체`),z()}),document.querySelector(`#payout-balance-button`)?.addEventListener(`click`,async()=>{let e=sessionStorage.getItem(`admin_id`)||``,t=prompt(`회사 회수계좌 확인을 위해 관리자 비밀번호를 입력해주세요.`);if(!t)return;let{data:n,error:r}=await X.functions.invoke(`get-company-account`,{body:{loginId:e,password:t}});if(r){alert(`회사 회수계좌 조회 실패: `+r.message);return}if(!n?.account){alert(n?.error||`등록된 회사 회수계좌가 없습니다.`);return}let i=n.account,a=document.querySelector(`#payout-balance-modal`);a&&a.remove();let o=document.createElement(`div`);o.id=`payout-balance-modal`,o.className=`payout-balance-modal`,o.innerHTML=`
      <div class="payout-balance-modal-card">

        <div class="payout-balance-modal-header">
          <h3>출금계좌 관리</h3>

          <button
            type="button"
            id="payout-balance-modal-close"
            class="payout-balance-modal-close"
          >
            ×
          </button>
        </div>

        <div class="payout-balance-modal-body">

          <div class="payout-balance-row">
            <span>현재 가상계좌잔액</span>
            <strong>${x.toLocaleString()}원</strong>
          </div>

          <div class="payout-balance-row">
  <span>회수금액</span>

  <div
    style="
      display:flex;
      gap:8px;
      align-items:center;
    "
  >
    <input
      id="withdraw-amount"
      type="text"
      value=""
      placeholder="0"
      style="
        width:150px;
        text-align:right;
      "
    />

    <button
      type="button"
      id="withdraw-all-button"
    >
      전액
    </button>
  </div>
</div>

          <div class="payout-company-account">
  <div class="payout-company-account-title">
    회사 회수계좌
  </div>

  <div class="payout-company-account-row">
  <span>은행</span>
  <strong>${i.bank_name}</strong>
</div>

<div class="payout-company-account-row">
  <span>예금주</span>
  <strong>${i.account_holder}</strong>
</div>

<div class="payout-company-account-row">
  <span>계좌번호</span>
  <strong>${i.account_number}</strong>
</div>

  <small>
    회수계좌는 운영관리자 화면에서 변경할 수 없습니다.
  </small>
</div>

        </div>

        <div class="payout-balance-modal-footer">
          <button
            type="button"
            id="payout-balance-history-button"
            class="payout-balance-secondary-button"
          >
            회수내역
          </button>

          <button
            type="button"
            id="payout-balance-withdraw-button"
            class="payout-balance-primary-button"
          >
            회사통장으로 회수
          </button>
        </div>

      </div>
    `,document.body.appendChild(o);let s=document.querySelector(`#withdraw-amount`);s?.addEventListener(`input`,()=>{let e=s.value.replace(/,/g,``).replace(/[^\d]/g,``);s.value=e?Number(e).toLocaleString():``}),document.querySelector(`#withdraw-all-button`)?.addEventListener(`click`,()=>{s&&(s.value=x.toLocaleString())}),document.querySelector(`#payout-balance-modal-close`)?.addEventListener(`click`,()=>{o.remove()}),o.addEventListener(`click`,e=>{e.target===o&&o.remove()}),document.querySelector(`#payout-balance-history-button`)?.addEventListener(`click`,()=>{alert(`회수내역 기능은 다음 단계에서 연결합니다.`)}),document.querySelector(`#payout-balance-withdraw-button`)?.addEventListener(`click`,async()=>{let t=document.querySelector(`#withdraw-amount`),n=Number(t?.value.replace(/,/g,``)||0);if(n<=0){alert(`회수금액을 입력해주세요.`);return}if(n>x){alert(`현재 가상계좌잔액보다 큰 금액은 회수할 수 없습니다.`);return}let r=prompt(`회사계좌 회수를 위해 관리자 비밀번호를 입력해주세요.`);if(!r)return;let{data:a,error:s}=await X.from(`admin_users`).select(`id, login_id, role, status`).eq(`login_id`,e).eq(`password`,r).eq(`role`,`MASTER`).eq(`status`,`사용중`).maybeSingle();if(s||!a){alert(`관리자 비밀번호가 올바르지 않습니다.`);return}let c=`회사계좌로 회수하시겠습니까?

회수금액: `+n.toLocaleString()+`원

은행: `+i.bank_name+`
예금주: `+i.account_holder+`
계좌번호: `+i.account_number+`

처리자: `+a.login_id;if(confirm(c))try{let e=await fetch(`/api/toss-seller-get`),t=await e.json();if(!e.ok||!t.success){alert(`회사 회수용 셀러 조회에 실패했습니다.`);return}let r=(t?.data?.entityBody?.items||[]).find(e=>String(e.refSellerId||``).trim()===`NXGSOFT01`);if(!r?.id){alert(`NXGSOFT01 회수용 셀러를 찾을 수 없습니다.`);return}if(r.status!==`APPROVED`){alert(`NXGSOFT01 셀러가 지급가능 상태가 아닙니다.`);return}let i=`SWEEP-`+Date.now()+`-`+n,a=await fetch(`/api/toss-payout`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({destination:r.id,amount:n,transactionDescription:`잔액회수`,refPayoutId:i})}),s=await a.json();if(!a.ok||!s.success){let e=s?.data?.error?.message||s?.data?.message||s?.message||`회사계좌 회수에 실패했습니다.`;alert(`회사계좌 회수 실패

`+e);return}alert(`회사계좌 회수가 완료되었습니다.

회수금액: `+n.toLocaleString()+`원`),o.remove()}catch(e){console.error(`회사계좌 회수 오류:`,e),alert(`회사계좌 회수 중 오류가 발생했습니다.`)}})}),document.querySelector(`#duplicate-payment-card`)?.addEventListener(`click`,()=>{let e={};(u||[]).forEach(t=>{let n=String(t.approval_number||``).trim(),r=Number(t.amount||0),i=n+`_`+r;!n||!S.has(i)||(e[i]||(e[i]=[]),e[i].push(t))});let t=Object.entries(e);if(t.length===0){alert(`중복결제 내역이 없습니다.`);return}document.querySelector(`#duplicate-payment-modal`)?.remove();let n=document.createElement(`div`);n.id=`duplicate-payment-modal`,n.className=`duplicate-payment-modal`,n.innerHTML=`
      <div class="duplicate-payment-modal-card">
        <div class="duplicate-payment-modal-header">
          <h3>중복결제 관리</h3>

          <button
            type="button"
            id="duplicate-payment-modal-close"
            class="duplicate-payment-modal-close"
          >
            ×
          </button>
        </div>

        <div class="duplicate-payment-modal-body">
          ${t.map(([e,t])=>`
            <div class="duplicate-payment-group">
              <div class="duplicate-payment-group-title">
                승인번호 ${e}
              </div>

              ${t.map((t,n)=>`
                <label class="duplicate-payment-row ${n===0?`keep-row`:`delete-row`}">
  <input
    type="radio"
    name="keep-payment-${e}"
    value="${t.id}"
    ${n===0?`checked`:``}
  >

  <span class="duplicate-payment-status">
    ${n===0?`정상 유지`:`삭제 예정`}
  </span>

  <span>${t.merchant_name||`-`}</span>

  <span>
    ${Number(t.amount||0).toLocaleString()}원
  </span>

  <span>
    ${t.created_at?new Date(t.created_at).toLocaleString():`-`}
  </span>
</label>
              `).join(``)}

              <button
                type="button"
                class="duplicate-payment-delete-button"
                data-approval-number="${e}"
              >
                중복결제 삭제
              </button>
            </div>
          `).join(``)}
        </div>
      </div>
    `,document.body.appendChild(n),document.querySelectorAll(`.duplicate-payment-row input[type="radio"]`).forEach(e=>{e.addEventListener(`change`,()=>{let t=e.name;document.querySelectorAll(`input[name="`+t+`"]`).forEach(e=>{let t=e.closest(`.duplicate-payment-row`),n=t?.querySelector(`.duplicate-payment-status`);!t||!n||(e.checked?(t.classList.add(`keep-row`),t.classList.remove(`delete-row`),n.textContent=`정상 유지`):(t.classList.add(`delete-row`),t.classList.remove(`keep-row`),n.textContent=`삭제 예정`))})})}),document.querySelector(`#duplicate-payment-modal-close`)?.addEventListener(`click`,()=>{n.remove()}),n.addEventListener(`click`,e=>{e.target===n&&n.remove()}),document.querySelectorAll(`.duplicate-payment-delete-button`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=t.getAttribute(`data-approval-number`)||``,r=document.querySelector(`input[name="keep-payment-`+n+`"]:checked`);if(!r){alert(`정상으로 남길 결제를 선택해주세요.`);return}let i=Number(r.value),a=(e[n]||[]).map(e=>Number(e.id)).filter(e=>e!==i);if(a.length===0){alert(`삭제할 중복결제가 없습니다.`);return}let o=prompt(`중복결제 삭제를 위해 관리자 비밀번호를 입력해주세요.`);if(!o)return;let s=(e[n]||[]).find(e=>Number(e.id)===i),c=`중복결제를 삭제하시겠습니까?

승인번호: `+n+`

정상으로 남길 결제
- 가맹점: `+(s?.merchant_name||`-`)+`
- 결제금액: `+Number(s?.amount||0).toLocaleString()+`원

삭제 대상: `+a.length+`건

삭제되는 결제는 중복결제 이력에 백업됩니다.`;if(!confirm(c))return;let l=sessionStorage.getItem(`admin_id`)||``,{data:u,error:d}=await X.functions.invoke(`delete-duplicate-payments`,{body:{loginId:l,password:o,keepPaymentId:i,deletePaymentIds:a}});if(d){alert(`중복결제 삭제 실패: `+d.message);return}if(!u?.success){alert(u?.error||`중복결제 삭제에 실패했습니다.`);return}alert(`중복결제 `+u.deletedCount+`건 삭제 완료

✓ 원본 백업 완료
✓ 출금·정산 재계산 완료`),location.reload()})})}),document.querySelector(`#payout-error-card`)?.addEventListener(`click`,()=>{if(T.length===0){alert(`출금오류 내역이 없습니다.`);return}document.querySelector(`#payout-error-modal`)?.remove();let e=document.createElement(`div`);e.id=`payout-error-modal`,e.className=`payout-error-modal`,e.innerHTML=`
      <div class="payout-error-modal-card">
        <div class="payout-error-modal-header">
          <h3>출금오류 관리</h3>

          <button
            type="button"
            id="payout-error-modal-close"
            class="payout-error-modal-close"
          >
            ×
          </button>
        </div>

        <div class="payout-error-modal-body">
          ${T.map(e=>`
            <div class="payout-error-row">
              <div>
                <strong>${e.merchant_name||`-`}</strong>
                <span>
  ${e.merchant_id?`MER`+String(e.merchant_id).padStart(4,`0`):`-`}
</span>

<span>
  결제일 :
  ${new Date(e.created_at).toLocaleDateString(`en-CA`,{timeZone:`Asia/Seoul`})}
</span>

<span>
  출금예정일 :
  ${A(e.created_at,_.get(Number(e.merchant_id))||`1일`)}
</span>
              </div>

              <div>
                <span>출금예정금액</span>
                <strong>
                  ${Number(e.settlement_amount||Number(e.amount||0)-Number(e.fee_amount||0)).toLocaleString()}원
                </strong>
              </div>

              <div>
                <span>오류사유</span>
                <strong>
                  ${e.payout_error_message||`출금 처리 실패`}
                </strong>
              </div>

              <button
                type="button"
                class="payout-error-retry-button"
                data-id="${e.id}"
              >
                재처리
              </button>
            </div>
          `).join(``)}
        </div>
      </div>
    `,document.body.appendChild(e),document.querySelector(`#payout-error-modal-close`)?.addEventListener(`click`,()=>{e.remove()}),e.addEventListener(`click`,t=>{t.target===e&&e.remove()}),document.querySelectorAll(`.payout-error-retry-button`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=Number(e.getAttribute(`data-id`));if(!t){alert(`출금오류 결제정보를 찾을 수 없습니다.`);return}if(!confirm(`이 출금건을 다시 출금대기로 변경하시겠습니까?`))return;let{error:n}=await X.from(`payments`).update({payout_status:`출금대기`,payout_error_code:null,payout_error_message:null,payout_last_attempt_at:new Date().toISOString()}).eq(`id`,t);if(n){alert(`출금 재처리 실패: `+n.message);return}alert(`출금대기로 변경되었습니다.`),location.reload()})})}),document.querySelector(`#account-error-card`)?.addEventListener(`click`,()=>{if(D.length===0){alert(`계좌오류 내역이 없습니다.`);return}document.querySelector(`#account-error-modal`)?.remove();let e=document.createElement(`div`);e.id=`account-error-modal`,e.className=`payout-error-modal`,e.innerHTML=`
      <div class="payout-error-modal-card">
        <div class="payout-error-modal-header">
          <h3>계좌오류 관리</h3>

          <button
            type="button"
            id="account-error-modal-close"
            class="payout-error-modal-close"
          >
            ×
          </button>
        </div>

        <div class="payout-error-modal-body">
          ${D.map(e=>`
            <div class="payout-error-row">
              <div>
                <strong>${e.merchant_name||`-`}</strong>
                <span>
                  ${e.merchant_id?`MER`+String(e.merchant_id).padStart(4,`0`):`-`}
                </span>
              </div>

              <div>
                <span>출금예정금액</span>
                <strong>
                  ${Number(e.settlement_amount||Number(e.amount||0)-Number(e.fee_amount||0)).toLocaleString()}원
                </strong>
              </div>

              <div>
                <span>계좌오류 사유</span>
                <strong>
                  ${e.account_error_message||`계좌정보 확인 필요`}
                </strong>
              </div>

              <button
                type="button"
                class="account-error-check-button"
                data-merchant-id="${e.merchant_id||``}"
              >
                가맹점 확인
              </button>
            </div>
          `).join(``)}
        </div>
      </div>
    `,document.body.appendChild(e),document.querySelector(`#account-error-modal-close`)?.addEventListener(`click`,()=>{e.remove()}),e.addEventListener(`click`,t=>{t.target===e&&e.remove()}),document.querySelectorAll(`.account-error-check-button`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-merchant-id`)||``;if(!t){alert(`가맹점 정보를 찾을 수 없습니다.`);return}sessionStorage.setItem(`selected_merchant_id`,t),sessionStorage.setItem(`adminPage`,`merchant`),location.reload()})})});let g=Math.max(1,Math.ceil(e.length/c)),v=document.querySelector(`#payout-page-info-top`),y=document.querySelector(`#payout-prev-top`),b=document.querySelector(`#payout-next-top`);v&&(v.textContent=s+` / `+g),y&&(y.disabled=s<=1,y.onclick=()=>{s<=1||(--s,z())}),b&&(b.disabled=s>=g,b.onclick=()=>{s>=g||(s+=1,z())}),s>g&&(s=g);let C=(s-1)*c,k=e.slice(C,C+c);a.innerHTML=``,k.forEach((e,t)=>{let n=document.createElement(`tr`),r=Number(e.amount||0),i=Number(e.fee_amount||0),o=Number(e.settlement_amount||r-i),s=`<span class="settlement-color-bar settlement-color-`+e.settlement_cycle+`"></span>`;n.innerHTML=`<td>`+(C+t+1)+`</td><td>`+(e.merchant_id?`MER`+String(e.merchant_id).padStart(4,`0`):`-`)+`</td><td>`+s+(e.merchant_name||`-`)+`<span class="payout-count-badge">`+e.payment_count+`</span></td><td>`+(e.pg_company||`-`)+`</td><td>`+r.toLocaleString()+`원</td><td>`+i.toLocaleString()+`원</td><td>`+o.toLocaleString()+`원</td><td>`+e.created_at.substring(0,10)+`</td><td>`+e.payout_date+`</td><td>`+(e.payout_status||`출금대기`)+`</td><td>`+(e.payout_hold?`<span class="payout-hold-badge">출금보류</span><br>`+(l?`<button class="payout-hold-release-button" data-ids="`+e.payment_ids.join(`,`)+`">보류해제</button>`:``):e.payout_status===`출금완료`?`출금완료`:`<button class="payout-complete-button" data-ids="`+e.payment_ids.join(`,`)+`">출금완료</button>`+(l?` <button class="payout-hold-button" data-ids="`+e.payment_ids.join(`,`)+`">출금보류</button>`:``))+`</td>`,a.appendChild(n)}),document.querySelectorAll(`.payout-complete-button`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e,n=(t.getAttribute(`data-ids`)||``).split(`,`).map(e=>Number(e)).filter(e=>!Number.isNaN(e));if(n.length===0){alert(`출금대상 결제정보가 없습니다.`);return}t.disabled=!0,t.textContent=`처리중`;try{let{data:e,error:t}=await X.from(`payments`).select(`
              id,
              merchant_id,
              merchant_name,
              settlement_amount,
              payout_status,
              payout_hold
            `).in(`id`,n);if(t){alert(`결제정보 조회 실패: `+t.message);return}if(!e||e.length===0){alert(`출금대상 결제정보가 없습니다.`);return}let r=[...new Set(e.map(e=>String(e.merchant_id||``).trim()).filter(Boolean))];if(r.length!==1){alert(`서로 다른 가맹점의 결제건은 함께 출금할 수 없습니다.`);return}let i=r[0],a=i.startsWith(`MER`)?i:`MER`+i.padStart(4,`0`),o=String(e[0].merchant_name||a);if(e.some(e=>e.payout_hold===!0||e.payout_status===`출금보류`)){alert(`출금보류된 결제건이 포함되어 있습니다.`);return}let s=e.reduce((e,t)=>e+Number(t.settlement_amount||0),0);if(s<=0){alert(`출금예정금액이 올바르지 않습니다.`);return}let c=await fetch(`/api/toss-seller-get`),l=await c.json();if(!c.ok||!l.success){alert(`토스 셀러 조회에 실패했습니다.`);return}let u=(l?.data?.entityBody?.items||[]).find(e=>String(e.refSellerId||``).trim()===a);if(!u?.id){alert(a+` 가맹점이 토스 셀러로 등록되어 있지 않습니다.`);return}if(u.status!==`PARTIALLY_APPROVED`&&u.status!==`APPROVED`){alert(`토스 셀러가 지급가능 상태가 아닙니다.
현재 상태: `+u.status);return}let d=await fetch(`/api/toss-balance`),f=await d.json();if(!d.ok||!f.success){alert(`토스 지급가능 잔액 조회에 실패했습니다.`);return}let p=Number(f?.data?.entityBody?.availableAmount?.value||0);if(p<s){alert(`토스 지급대행 잔액이 부족합니다.

지급 가능 잔액: `+p.toLocaleString()+`원
출금 예정 금액: `+s.toLocaleString()+`원`);return}if(!confirm(o+` 가맹점에 `+s.toLocaleString()+`원을 실제 지급하시겠습니까?`))return;let m=Math.min(...n),h=Math.max(...n),g=`NXG-`+a+`-`+m+`-`+h,_=await fetch(`/api/toss-payout`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({destination:u.id,amount:s,transactionDescription:`가맹점정산`,refPayoutId:g})}),v=await _.json();if(!_.ok||!v.success){let e=v?.data?.error?.message||v?.message||`토스 지급 요청에 실패했습니다.`;alert(e);return}let{error:y}=await X.from(`payments`).update({payout_status:`출금완료`,payout_time:new Date().toISOString()}).in(`id`,n);if(y){alert(`토스 지급 요청은 전송됐지만 DB 저장에 실패했습니다.
`+y.message);return}alert(`출금완료 처리되었습니다.

가맹점: `+o+`
지급금액: `+s.toLocaleString()+`원`),location.reload()}catch(e){alert(e instanceof Error?e.message:`출금 처리 중 오류가 발생했습니다.`)}finally{t.disabled=!1,t.textContent=`출금완료`}})})};document.querySelectorAll(`.payout-hold-button`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=sessionStorage.getItem(`admin_id`)||``;if(t!==`NXGMASTER16`){alert(`출금보류는 대표관리자만 처리할 수 있습니다.`);return}let n=(e.getAttribute(`data-ids`)||``).split(`,`).map(e=>Number(e)).filter(e=>!Number.isNaN(e));if(n.length===0){alert(`출금보류 대상 결제정보가 없습니다.`);return}let r=prompt(`출금보류 사유를 입력해주세요.

예: 불법거래 의심, 민원접수, 수사기관 요청`);if(!r?.trim())return;let i=prompt(`출금보류 처리를 위해 관리자 비밀번호를 입력해주세요.`);if(!i)return;let{data:a,error:o}=await X.from(`admin_users`).select(`login_id, role, status`).eq(`login_id`,t).eq(`password`,i).eq(`role`,`MASTER`).eq(`status`,`사용중`).maybeSingle();if(o||!a){alert(`관리자 비밀번호가 올바르지 않습니다.`);return}if(!confirm(`이 가맹점의 현재 출금대상을 보류하시겠습니까?

보류사유: `+r.trim()+`
대상 결제: `+n.length+`건`))return;let{error:s}=await X.from(`payments`).update({payout_hold:!0,payout_hold_reason:r.trim(),payout_hold_at:new Date().toISOString(),payout_hold_by:t,payout_status:`출금보류`}).in(`id`,n);if(s){alert(`출금보류 처리 실패: `+s.message);return}alert(`출금보류 처리되었습니다.`),location.reload()})}),document.querySelectorAll(`.payout-hold-release-button`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=sessionStorage.getItem(`admin_id`)||``;if(t!==`NXGMASTER16`){alert(`보류해제는 대표관리자만 처리할 수 있습니다.`);return}let n=(e.getAttribute(`data-ids`)||``).split(`,`).map(e=>Number(e)).filter(e=>!Number.isNaN(e));if(n.length===0){alert(`보류해제 대상 결제정보가 없습니다.`);return}let r=prompt(`보류해제를 위해 관리자 비밀번호를 입력해주세요.`);if(!r)return;let{data:i,error:a}=await X.from(`admin_users`).select(`login_id, role, status`).eq(`login_id`,t).eq(`password`,r).eq(`role`,`MASTER`).eq(`status`,`사용중`).maybeSingle();if(a||!i){alert(`관리자 비밀번호가 올바르지 않습니다.`);return}if(!confirm(`출금보류를 해제하시겠습니까?

해제 후에는 즉시 출금되지 않고 출금대기로 돌아갑니다.`))return;let{error:o}=await X.from(`payments`).update({payout_hold:!1,payout_hold_reason:null,payout_hold_at:null,payout_hold_by:null,payout_status:`출금대기`}).in(`id`,n);if(o){alert(`보류해제 실패: `+o.message);return}alert(`보류가 해제되어 출금대기로 변경되었습니다.`),location.reload()})}),document.querySelector(`#payout-error-card`);let B=document.querySelector(`#withdraw-page-size`);B&&(B.value=String(c),B.addEventListener(`change`,()=>{c=Number(B.value),s=1,sessionStorage.setItem(`withdraw_page_size`,String(c)),z()})),document.querySelector(`#payout-search-btn`)?.addEventListener(`click`,()=>{if(l===`manager`){document.querySelector(`.payout-sub-tab[data-payout-view="manager"]`)?.click();return}s=1,z()});let ae=document.querySelector(`#payout-start-date`),oe=document.querySelector(`#payout-end-date`),V=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`,se=V(new Date);ae.value=se,oe.value=se;let ce=e=>{let t=ae.value||V(new Date),n=new Date(t+`T00:00:00`);n.setDate(n.getDate()+e);let r=V(n);ae.value=r,oe.value=r,s=1,z()};document.querySelector(`#payout-prev-btn`)?.addEventListener(`click`,()=>{ce(-1)}),document.querySelector(`#payout-today-btn`)?.addEventListener(`click`,()=>{let e=V(new Date);ae.value=e,oe.value=e,s=1,z()}),document.querySelector(`#payout-next-btn`)?.addEventListener(`click`,()=>{ce(1)}),document.querySelector(`#payout-month-btn`)?.addEventListener(`click`,()=>{let e=new Date;ae.value=V(new Date(e.getFullYear(),e.getMonth(),1)),oe.value=V(e),s=1,z()}),document.querySelector(`#payout-pg-filter`)?.addEventListener(`change`,()=>{l!==`manager`&&(s=1,z())}),document.querySelector(`#payout-status-filter`)?.addEventListener(`change`,()=>{l!==`manager`&&(s=1,z())}),document.querySelector(`#payout-target-filter`)?.addEventListener(`change`,()=>{l!==`manager`&&(s=1,z())}),z()}else if(c===`order`){let e=document.querySelector(`.admin-sub-menu`),t=document.querySelector(`.admin-title`),n=document.querySelector(`.admin-search-box`),r=document.querySelector(`.admin-summary`),i=document.querySelector(`.admin-table thead`),a=document.querySelector(`#paymentTableBody`);e&&(e.innerHTML=``);let o=(sessionStorage.getItem(`login_merchant_type`)||``)===`뷰티`;t&&(t.innerHTML=o?`▶ 뷰티 주문관리 > 예약접수`:`▶ 주문관리 > 주문접수`),n&&(n.innerHTML=`<div class="payment-search-line"><button class="order-filter-btn" data-status="전체">전체</button><button class="order-filter-btn" data-status="준비중">준비중</button><button class="order-filter-btn" data-status="완료">완료</button></div>`);let s=Number(sessionStorage.getItem(`login_merchant_id`)),{data:c,error:l}=await X.from(`orders`).select(`*`).eq(`merchant_id`,s).order(`created_at`,{ascending:!1});if(l){alert(`주문내역 조회 실패: `+l.message);return}r&&(r.innerHTML=`주문수 : `+(c||[]).length+`건`);let u=1,d=10,f=c||[];i&&(i.innerHTML=o?`<tr><th>No</th><th>주문번호</th><th>예약자</th><th>연락처</th><th>예약일</th><th>예약시간</th><th>서비스 / 직원</th><th>결제금액</th><th>상태</th><th>처리</th></tr>`:`<tr><th>No</th><th>주문번호</th><th>가맹점명</th><th>주문내용</th><th>결제금액</th><th>주문상태</th><th>처리</th><th>고객호출</th></tr>`);function p(){a.innerHTML=``;let e=Math.max(1,Math.ceil(f.length/d));u>e&&(u=e);let t=(u-1)*d,n=t+d;f.slice(t,n).forEach((e,n)=>{let r=document.createElement(`tr`),i=e.order_no?.split(`-`)[1]||e.order_no||t+n+1,s=Array.isArray(e.items)?e.items.map(e=>e.name+` x `+e.quantity).join(`, `):`-`,c=Array.isArray(e.items)?e.items.map(t=>(t.name||`-`)+` / 직원ID `+(t.beauty_staff_id||e.beauty_staff_id||`-`)+` / `+Number(t.price||0).toLocaleString()+`원 x `+Number(t.quantity||1)).join(`<br/>`):`-`;r.innerHTML=o?`<td>`+(t+n+1)+`</td><td><button class="merchant-receipt-link" data-order="`+i+`" data-amount="`+(e.total_amount||0)+`" data-date="`+(e.created_at||``)+`" data-items="`+c+`" data-payment-key="`+(e.payment_key||`-`)+`" data-customer="`+(e.customer_name||`현장고객`)+`">`+i+`번</button></td><td>`+(e.customer_name||`-`)+`</td><td>`+(e.customer_phone||`-`)+`</td><td>`+(e.reservation_date||`-`)+`<br/><span class="approval-number cancel-approval-link" data-id="`+e.id+`" data-created-at="`+e.created_at+`" data-amount="`+e.total_amount+`">결제/예약취소</span></td><td>`+(e.reservation_time||`-`)+`</td><td style="line-height:1.8;">`+c+`</td><td>`+Number(e.total_amount||0).toLocaleString()+`원</td><td>`+(e.cancel_status===`취소요청`?`<span class="order-status-cancel-request">취소요청</span>`:e.order_status===`취소완료`?`<span class="order-status-cancel">취소완료</span>`:e.order_status===`완료`?`<span class="order-status-complete">완료</span>`:`<span class="order-status-received">접수</span>`)+`</td><td>`+(e.order_status===`완료`?`완료`:`<button class="order-complete-button" data-id="`+e.id+`">완료처리</button>`)+`</td>`:`<td>`+(t+n+1)+`</td><td><button class="merchant-receipt-link" data-order="`+i+`" data-amount="`+(e.total_amount||0)+`" data-date="`+(e.created_at||``)+`" data-items="`+s+`" data-payment-key="`+(e.payment_key||`-`)+`" data-customer="`+(e.customer_name||`현장고객`)+`">`+i+`번</button></td><td>MER`+String(e.merchant_id||1).padStart(4,`0`)+`</td><td>`+s+`</td><td>`+Number(e.total_amount||0).toLocaleString()+`원</td><td>`+(e.cancel_status===`취소요청`?`<span class="order-status-cancel-request">취소요청</span>`:e.order_status===`취소완료`?`<span class="order-status-cancel">취소완료</span>`:e.order_status===`완료`?`<span class="order-status-complete">완료</span>`:`<span class="order-status-received">접수</span>`)+`</td><td>`+(e.order_status===`완료`?`완료`:`<button class="order-complete-button" data-id="`+e.id+`">조리완료</button>`)+`</td><td><button class="customer-call-button" data-number="`+i+`">고객호출</button></td>`,r.setAttribute(`data-status`,e.order_status||`접수`),a.appendChild(r)});let r=document.querySelector(`#order-page-info`);r&&(r.textContent=u+` / `+e);let i=document.querySelector(`#order-prev-page`),s=document.querySelector(`#order-next-page`);i&&(i.disabled=u<=1),s&&(s.disabled=u>=e)}p(),document.addEventListener(`click`,e=>{let t=e.target;if(console.log(`클릭됨:`,t.id),t.id===`order-prev-page`){if(console.log(`이전 클릭`),u<=1)return;--u,p()}if(t.id===`order-next-page`){console.log(`다음 클릭`);let e=Math.max(1,Math.ceil(f.length/d));if(u>=e)return;u+=1,p()}}),document.addEventListener(`change`,e=>{let t=e.target;console.log(`변경됨:`,t.id),t.id===`merchant-page-size`&&(d=Number(t.value),u=1,p())});let m=e=>{let t=new SpeechSynthesisUtterance(e);t.lang=`ko-KR`,t.rate=.95,window.speechSynthesis.speak(t)},h=()=>{new Audio(`https://actions.google.com/sounds/v1/alarms/dingdong.ogg`).play(),setTimeout(()=>{m(`새 주문이 접수되었습니다.`)},1e3)};document.querySelectorAll(`.order-complete-button`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`),{error:n}=await X.from(`orders`).update({order_status:`완료`}).eq(`id`,Number(t));if(n){alert(`조리완료 처리 실패: `+n.message);return}alert(`조리완료 처리되었습니다`);let r=e.closest(`tr`);if(r){let e=r.children[5],t=r.children[6];e&&(e.textContent=`완료`),t&&(t.textContent=`완료`)}})});let g=(c||[]).length;setInterval(async()=>{let e=Number(sessionStorage.getItem(`login_merchant_id`)),{data:t,error:n}=await X.from(`orders`).select(`*`).eq(`merchant_id`,e);n||!t||t.length>g&&(h(),g=t.length)},3e3)}if(c===`mini`){document.querySelector(`.admin-wrap`)?.classList.add(`mini-mode`);let e=document.querySelector(`.admin-sub-menu`),t=document.querySelector(`.admin-title`),n=document.querySelector(`.admin-search-box`),r=document.querySelector(`.admin-summary`),i=document.querySelector(`.admin-table thead`),a=document.querySelector(`#paymentTableBody`);e&&(e.innerHTML=`<button class="mini-sub-tab" id="mini-product-tab">상품관리</button><button class="mini-sub-tab" id="mini-mall-tab">쇼핑몰관리</button><button class="mini-sub-tab" id="mini-qr-tab">QR관리</button>`,document.querySelector(`#mini-product-tab`)?.addEventListener(`click`,()=>{location.reload()}),document.querySelector(`#mini-mall-tab`)?.addEventListener(`click`,()=>{let e=sessionStorage.getItem(`login_merchant_id`);if(!e){alert(`가맹점 로그인 후 이용 가능합니다.`),location.href=`/merchant-login`;return}let o=`https://nxgsoft.co.kr/pay/?merchant_id=`+e;t&&(t.innerHTML=`▶ 미니상점 > 쇼핑몰관리`),n&&(n.innerHTML=``),r&&(r.innerHTML=`고객이 접속하는 미니상점 주소입니다.`),i&&(i.innerHTML=``),a.innerHTML=`<tr><td colspan="8" style="padding:40px; text-align:center;"><h2>내 미니상점 주소</h2><p id="mall-url-text" style="font-size:18px; font-weight:bold;">`+o+`</p><button id="copy-mall-url">주소복사</button><button id="open-mall-url" style="margin-left:10px;">새창열기</button></td></tr>`,document.querySelector(`#copy-mall-url`)?.addEventListener(`click`,async()=>{await navigator.clipboard.writeText(o),alert(`상점 주소가 복사되었습니다.`)}),document.querySelector(`#open-mall-url`)?.addEventListener(`click`,()=>{window.open(o,`_blank`)})}),document.querySelector(`#mini-qr-tab`)?.addEventListener(`click`,()=>{t&&(t.innerHTML=`▶ 미니상점 > QR관리`),n&&(n.innerHTML=`<button id="show-kiosk-qr">QR생성</button><div id="kiosk-qr-box" style="margin-top:20px;"></div>`),r&&(r.innerHTML=`QR을 생성해서 매장에 비치할 수 있습니다.`),a.innerHTML=``}),document.querySelector(`#mini-qr-tab`)?.addEventListener(`click`,async()=>{let e=document.querySelector(`#kiosk-qr-box`);if(!e){alert(`QR 영역을 찾을 수 없습니다.`);return}let t=sessionStorage.getItem(`login_merchant_id`);if(!t){alert(`가맹점 로그인 후 QR 생성이 가능합니다.`);return}let n=`https://nxgsoft.co.kr/pay/?merchant_id=`+t;e.innerHTML=`<div style="text-align:center;"><canvas id="kiosk-qr-canvas"></canvas><br><br><button id="copy-kiosk-url">주소복사</button><br><br><button id="download-kiosk-qr">QR다운로드</button></div>`;let r=document.querySelector(`#kiosk-qr-canvas`);await de.toCanvas(r,n,{width:180,margin:2}),document.querySelector(`#copy-kiosk-url`)?.addEventListener(`click`,async()=>{await navigator.clipboard.writeText(n),alert(`QR 주소가 복사되었습니다.`)}),document.querySelector(`#download-kiosk-qr`)?.addEventListener(`click`,()=>{let e=document.querySelector(`#kiosk-qr-canvas`),t=document.createElement(`a`);t.download=`NXG-QR.png`,t.href=e.toDataURL(`image/png`),t.click()})})),t&&(t.innerHTML=`▶ 미니상점 > 상품관리`),n&&(n.innerHTML=`<button id="move-product-create">상품등록</button>`);let o=Number(sessionStorage.getItem(`login_merchant_id`)),{data:s,error:c}=await X.from(`products`).select(`*`).eq(`merchant_id`,o).order(`id`,{ascending:!1});if(c){alert(`상품조회 실패 : `+c.message);return}r&&(r.innerHTML=`상품수 : `+(s?.length||0)+`개`),i&&(i.innerHTML=`<tr><th>NO</th><th>가맹점ID</th><th>상품명</th><th>판매가</th><th>상태</th><th>관리</th><th>주문링크</th></tr>`),a.innerHTML=``,s?.forEach((e,t)=>{let n=document.createElement(`tr`);n.innerHTML=`<td>`+(t+1)+`</td><td>MER`+String(e.merchant_id).padStart(4,`0`)+`</td><td>`+e.product_name+`</td><td>`+Number(e.price).toLocaleString()+`원</td><td>`+(e.status||`판매중`)+`</td><td><button class="product-status-button" data-id="`+e.id+`" data-status="`+(e.status||`판매중`)+`">`+((e.status||`판매중`)===`판매중`?`판매중지`:`판매재개`)+`</button><button class="product-delete-button" data-id="`+e.id+`" style="margin-left:6px;">삭제</button></td><td><button class="quick-btn" onclick="window.open('/kiosk?merchant_id=`+e.merchant_id+`')">상점보기</button></td>`,a.appendChild(n)}),document.querySelectorAll(`.product-status-button`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`),n=e.getAttribute(`data-status`)===`판매중`?`판매중지`:`판매중`,{error:r}=await X.from(`products`).update({status:n}).eq(`id`,Number(t));if(r){alert(`상태 변경 실패: `+r.message);return}alert(`상품 상태가 변경되었습니다.`),location.reload()})}),document.querySelectorAll(`.product-delete-button`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`);if(!confirm(`정말 삭제하시겠습니까?`))return;let{error:n}=await X.from(`products`).delete().eq(`id`,Number(t));if(n){alert(`삭제 실패 : `+n.message);return}alert(`삭제되었습니다.`),location.reload()})}),document.querySelectorAll(`.product-edit-button`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=Number(e.getAttribute(`data-id`)),n=s?.find(e=>e.id===t);if(!n)return;let r=prompt(`상품명`,n.product_name);if(!r)return;let i=prompt(`가격`,String(n.price));if(!i)return;let{error:a}=await X.from(`products`).update({product_name:r,price:Number(i)}).eq(`id`,t);if(a){alert(`수정 실패 : `+a.message);return}alert(`수정되었습니다.`),location.reload()})}),document.querySelectorAll(`.product-delete-button`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`);if(!confirm(`정말 이 상품을 삭제할까요?`))return;let{error:n}=await X.from(`products`).delete().eq(`id`,Number(t));if(n){alert(`상품 삭제 실패: `+n.message);return}alert(`상품이 삭제되었습니다.`),location.reload()})}),document.querySelector(`#move-product-create`)?.addEventListener(`click`,()=>{location.href=`/product-create`})}if(c===`setting`){let e=document.querySelector(`.admin-sub-menu`),t=document.querySelector(`.admin-title`),n=document.querySelector(`.admin-search-box`),r=document.querySelector(`.admin-summary`),i=document.querySelector(`.admin-table thead`),a=document.querySelector(`#paymentTableBody`);e&&(e.innerHTML=``),t&&(t.innerHTML=`▶ 설정관리 > 음성설정`),n&&(n.innerHTML=``),r&&(r.innerHTML=`주문알림과 고객호출 문구를 설정합니다.`),i&&(i.innerHTML=``);let o=sessionStorage.getItem(`customer_call_message`)||`주문 나왔습니다.`,s=sessionStorage.getItem(`new_order_message`)||`새 주문이 접수되었습니다.`;a.innerHTML=`<tr><td colspan="8" style="padding:40px;"><h2>음성 설정</h2><div style="margin:20px 0;"><label>고객호출 문구</label><br><select id="customer-call-message-setting" style="width:360px; height:40px;"><option value="주문 나왔습니다.">주문 나왔습니다.</option><option value="주문이 준비되었습니다.">주문이 준비되었습니다.</option><option value="음식을 찾아가 주세요.">음식을 찾아가 주세요.</option><option value="카운터로 와주세요.">카운터로 와주세요.</option><option value="픽업 부탁드립니다.">픽업 부탁드립니다.</option><option value="아따~ 싸게싸게 챙겨가쇼~">아따~ 싸게싸게 챙겨가쇼~</option><option value="챙겨 갈껀가 말껀가.">챙겨 갈껀가 말껀가.</option></select></div><div style="margin:20px 0;"><label>새 주문 알림 문구</label><br><select id="new-order-message-setting" style="width:360px; height:40px;"><option value="새 주문이 접수되었습니다.">새 주문이 접수되었습니다.</option><option value="주문 들어왔습니다.">주문 들어왔습니다.</option><option value="사장님 주문 들어왔어요.">사장님 주문 들어왔어요.</option><option value="새 주문입니다.">새 주문입니다.</option><option value="놀지 말고 일 하세요.">놀지 말고 일 하세요.</option><option value="주문 왔다...만들껀가 말껀가.">주문 왔다...만들껀가 말껀가.</option></select></div><button id="preview-call-message" style="width:120px; height:40px; margin-right:8px;">호출 미리듣기</button><button id="preview-new-order-message" style="width:140px; height:40px; margin-right:8px;">주문알림 미리듣기</button><button id="save-voice-setting" style="width:160px; height:40px;">저장</button></td></tr>`;let c=document.querySelector(`#customer-call-message-setting`),l=document.querySelector(`#new-order-message-setting`);c.value=o,l.value=s;let u=e=>{let t=new SpeechSynthesisUtterance(e);t.lang=`ko-KR`,t.rate=.95,window.speechSynthesis.cancel(),window.speechSynthesis.speak(t)};document.querySelector(`#preview-call-message`)?.addEventListener(`click`,()=>{u(`사십구번 고객님 `+c.value)}),document.querySelector(`#preview-new-order-message`)?.addEventListener(`click`,()=>{if(l.value===`주문 왔다...만들껀가 말껀가.`){u(`주문 왔다.`),setTimeout(()=>{u(`만들껀가 말껀가.`)},1e3);return}if(l.value===`놀지 말고 일 하세요.`){let e=new Audio(`https://actions.google.com/sounds/v1/alarms/dingdong.ogg`);e.volume=1,e.play().then(()=>{console.log(`벨소리 성공`)}).catch(e=>{console.log(`벨소리 실패`,e)}),setTimeout(()=>{u(`놀지 말고 일 하세요.`)},1500);return}u(l.value)}),document.querySelector(`#save-voice-setting`)?.addEventListener(`click`,()=>{sessionStorage.setItem(`customer_call_message`,c.value),sessionStorage.setItem(`new_order_message`,l.value),alert(`음성 설정이 저장되었습니다.`)})}if(c===`merchant-apply`){let{data:e,error:t}=await X.from(`merchants`).select(`*`).eq(`status`,`신청`).order(`created_at`,{ascending:!1});if(t){alert(`가입신청 조회 실패 : `+t.message);return}let n=document.querySelector(`.admin-sub-menu`),r=document.querySelector(`.admin-title`),i=document.querySelector(`.admin-summary`),a=document.querySelector(`.admin-table thead`),o=document.querySelector(`#paymentTableBody`);n&&(n.innerHTML=`가입신청 조회`),r&&(r.innerHTML=`▶ 가맹점관리 > 가입신청 관리`),i&&(i.innerHTML=`가입신청 : `+(e||[]).length+`건`),a&&(a.innerHTML=`<tr><th>No</th><th>신청일</th><th>상호명</th><th>대표자</th><th>사업자번호</th><th>상태</th><th>처리</th></tr>`),o.innerHTML=``,(e||[]).forEach((e,t)=>{let n=document.createElement(`tr`);n.innerHTML=`<td>`+(t+1)+`</td><td>`+new Date(e.created_at).toLocaleDateString(`ko-KR`)+`</td><td>`+(e.merchant_name||`-`)+`<br/><span style="font-size:12px;color:#555;">담당자: `+(e.manager_admin_name||`-`)+`</span><br/><span style="font-size:12px;color:#555;">`+(e.manager_phone||`-`)+`</span></td><td>`+(e.ceo_name||`-`)+`</td><td>`+(e.business_number||`-`)+`</td><td>`+e.status+`</td><td><button class="merchant-approve" data-id="`+e.id+`">승인</button></td>`,o.appendChild(n)})}if(document.querySelectorAll(`.merchant-approve`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`);if(!t){alert(`가맹점 ID를 찾을 수 없습니다.`);return}let n=`MER`+String(t).padStart(4,`0`),{error:r}=await X.from(`merchants`).update({status:`승인`,merchant_login_id:n,merchant_password:`1234`}).eq(`id`,Number(t));if(r){alert(`승인 실패: `+r.message);return}alert(`승인 완료
가맹점 아이디: `+n+`
임시 비밀번호: 1234`),location.reload()})}),c===`payment`){let r=document.querySelector(`.admin-sub-menu`),a=document.querySelector(`.admin-title`),o=document.querySelector(`.admin-search-box`),s=document.querySelector(`.admin-summary`),c=document.querySelector(`.admin-table thead`),l=document.querySelector(`#paymentTableBody`),u=document.querySelector(`.admin-table-top`),d=sessionStorage.getItem(`payment_sub_page`)||`approval`,f=(sessionStorage.getItem(`admin_id`)||``)===`NXGMASTER16`;if(u&&(u.innerHTML=`<button id="payment-excel-download">엑셀 다운로드</button><select id="admin-page-size"><option value="10">10개씩 보기</option><option value="20">20개씩 보기</option><option value="50">50개씩 보기</option></select>`),r&&(r.innerHTML=`
    <span
      id="payment-sub-approval"
      style="
        cursor:pointer;
        ${d===`approval`?`font-weight:700;color:#174981;`:``}
      "
    >
      승인내역조회
    </span>

    |

    <span
      id="payment-sub-cash"
      style="
        cursor:pointer;
        ${d===`cash`?`font-weight:700;color:#174981;`:``}
      "
    >
      현금영수증 발급
    </span>

    |

    ${f?`
          |
          <span
            id="payment-sub-head-office"
            style="
              cursor:pointer;
              ${d===`head-office`?`font-weight:700;color:#174981;`:``}
            "
          >
            본사 수수료 합계
          </span>
        `:``}
  `),document.querySelector(`#payment-sub-approval`)?.addEventListener(`click`,()=>{sessionStorage.setItem(`payment_sub_page`,`approval`),document.querySelector(`.admin-tab[data-page="payment"]`)?.click()}),document.querySelector(`#payment-sub-cash`)?.addEventListener(`click`,()=>{sessionStorage.setItem(`payment_sub_page`,`cash`),document.querySelector(`.admin-tab[data-page="payment"]`)?.click()}),document.querySelector(`#payment-sub-head-office`)?.addEventListener(`click`,()=>{sessionStorage.setItem(`payment_sub_page`,`head-office`),document.querySelector(`.admin-tab[data-page="payment"]`)?.click()}),d===`head-office`){if(!f){sessionStorage.setItem(`payment_sub_page`,`approval`),alert(`본사 마스터만 조회할 수 있습니다.`);return}a&&(a.innerHTML=`▶ 결제관리 > 본사 수수료 합계`);let e=e=>new Intl.DateTimeFormat(`en-CA`,{timeZone:`Asia/Seoul`,year:`numeric`,month:`2-digit`,day:`2-digit`}).format(e),t=e(new Date),n=t.slice(0,7)+`-01`,r=sessionStorage.getItem(`head_office_fee_start`)||n,i=sessionStorage.getItem(`head_office_fee_end`)||t,d=sessionStorage.getItem(`head_office_fee_pg`)||`all`,p=sessionStorage.getItem(`head_office_fee_target`)||`all`,m=sessionStorage.getItem(`head_office_fee_keyword`)||``;o&&(o.innerHTML=`
      <div class="payment-search-line">
  
        <strong>
          기간
        </strong>
  
        <input
          id="head-office-fee-start"
          type="date"
          value="${r}"
        />
  
        <span>
          ~
        </span>
  
        <input
          id="head-office-fee-end"
          type="date"
          value="${i}"
        />
  
  
        <button
          class="quick-btn"
          id="head-office-fee-prev"
          type="button"
            style="
  position:relative;
  top:-10px;
"
        >
          이전
        </button>
      
  
        <button
          class="quick-btn"
          id="head-office-fee-today"
          type="button"
            style="
  position:relative;
  top:-10px;
"
        >
          오늘
        </button>
        

  
        <button
          class="quick-btn"
          id="head-office-fee-next"
          type="button"
            style="
  position:relative;
  top:-10px;
"
        >
          다음
        </button>
        
  
        <button
          class="quick-btn"
          id="head-office-fee-month"
          type="button"
            style="
  position:relative;
  top:-10px;
"
        >
          당월
        </button>
    
  
  
        <strong>
          PG
        </strong>
  
        <select
          id="head-office-fee-pg"
        >
          <option
            value="all"
            ${d===`all`?`selected`:``}
          >
            전체
          </option>
  
          <option
            value="toss"
            ${d===`toss`?`selected`:``}
          >
            토스
          </option>
  
          <option
            value="korpay"
            ${d===`korpay`?`selected`:``}
          >
            코페이
          </option>
        </select>
  
  
        <strong>
          조회대상
        </strong>
  
        <select
          id="head-office-fee-target"
        >
          <option
            value="all"
            ${p===`all`?`selected`:``}
          >
            전체
          </option>
  
          <option
            value="merchant_id"
            ${p===`merchant_id`?`selected`:``}
          >
            가맹점ID
          </option>
  
          <option
            value="merchant_name"
            ${p===`merchant_name`?`selected`:``}
          >
            가맹점명
          </option>
        </select>
  
  
        <input
          id="head-office-fee-keyword"
          type="text"
          value="${m}"
          placeholder="검색어"
        />
  
  
        <button
          id="head-office-fee-search"
          class="search-btn"
          type="button"
        >
          조회
        </button>
  
      </div>
    `),u&&(u.innerHTML=`
          <div
            style="
              display:flex;
              justify-content:space-between;
              align-items:center;
              width:100%;
              gap:12px;
            "
          >
      
            <div
              id="head-office-pagination"
              class="merchant-pagination"
            ></div>
      
            <select
              id="head-office-page-size"
              style="
                width:120px;
                height:38px;
              "
            >
              <option value="10">
                10개씩 보기
              </option>
      
              <option value="20">
                20개씩 보기
              </option>
      
              <option value="50">
                50개씩 보기
              </option>
            </select>
      
          </div>
        `);let h=new Date(r+`T00:00:00+09:00`).toISOString(),g=new Date(i+`T23:59:59.999+09:00`).toISOString(),{data:_,error:v}=await X.from(`payments`).select(`
          id,
          merchant_id,
          merchant_name,
          amount,
          fee_rate,
          fee_amount,
          pg_company,
payment_method,
branch_admin_id,
          branch_fee_rate,
          agency_admin_id,
          agency_fee_rate,
          manager_admin_id,
          manager_fee_rate,
          created_at
        `).eq(`status`,`paid`).gte(`created_at`,h).lte(`created_at`,g).order(`created_at`,{ascending:!1});if(v){alert(`본사 수수료 조회 실패: `+v.message);return}let y=[...new Set((_||[]).map(e=>Number(e.merchant_id||0)).filter(e=>e>0))],{data:b,error:x}=await X.from(`merchants`).select(`id, settlement_cycle, branch_admin_id, agency_admin_id, manager_admin_id`).in(`id`,y.length>0?y:[0]);if(x){alert(`가맹점 정산주기 조회 실패: `+x.message);return}let S=new Map,C=new Map;(b||[]).forEach(e=>{let t=Number(e.id);S.set(t,String(e.settlement_cycle||`3일`)),C.set(t,e)});let{data:w,error:T}=await X.from(`admin_users`).select(`
        id,
        role,
        parent_admin_id,
        commission_rate_1day,
        commission_rate_3day,
        commission_rate_4day,
        commission_rate_7day
      `);if(T){alert(`조직 수수료 정보 조회 실패: `+T.message);return}let E=new Map;(w||[]).forEach(e=>{E.set(Number(e.id),e)});let D=(_||[]).map(e=>{let t=Number(e.amount||0),n=e.fee_amount!==null&&e.fee_amount!==void 0?Number(e.fee_amount||0):Math.floor(t*Number(e.fee_rate||0)/100),r=S.get(Number(e.merchant_id||0))||`4일`,i=C.get(Number(e.merchant_id||0)),a=Number(i?.manager_admin_id||e.manager_admin_id||0),o=Number(i?.agency_admin_id||e.agency_admin_id||0),s=Number(i?.branch_admin_id||e.branch_admin_id||0),c=a?E.get(a):null;if(!o&&c?.parent_admin_id){let e=E.get(Number(c.parent_admin_id));e?.role===`AGENCY`?o=Number(e.id):e?.role===`BRANCH`&&(s=Number(e.id))}let l=o?E.get(o):null;!s&&l?.parent_admin_id&&(s=Number(l.parent_admin_id));let u=s?E.get(s):null,d=e=>e?Number(r===`1일`?e.commission_rate_1day||0:r===`3일`?e.commission_rate_3day||0:r===`7일`?e.commission_rate_7day||0:e.commission_rate_4day||0):0,f=u?d(u):Number(e.branch_fee_rate||0),p=l?d(l):Number(e.agency_fee_rate||0),m=c?d(c):Number(e.manager_fee_rate||0),h=s?o?Math.max(f-p,0):a?Math.max(f-m,0):f:0,g=o?a?Math.max(p-m,0):p:0,_=a?m:0,v=Math.floor(t*h/100),y=Math.floor(t*g/100),b=Math.floor(t*_/100),x=v+y+b,w=r===`1일`,T=String(e.pg_company||``),D=String(e.payment_method||``),O=0;T.includes(`토스`)?O=1.37:T.includes(`코페이`)&&(O=D.includes(`수기`)?w?.95:.8:w?.75:.6);let k=Math.floor(t*O/100),A=k+Math.floor(k*.1),j=Math.max(n-A-x,0);return{...e,amount:t,merchantFeeAmount:n,pgTotalCost:A,organizationCommission:x,headOfficeCommission:j}}).filter(e=>{let t=String(e.pg_company||``);if(d===`toss`&&!t.includes(`토스`)||d===`korpay`&&!t.includes(`코페이`))return!1;let n=m.trim().toLowerCase();if(!n)return!0;let r=`MER`+String(e.merchant_id||0).padStart(4,`0`),i=String(e.merchant_name||``).toLowerCase();return p===`merchant_id`?r.toLowerCase().includes(n):p===`merchant_name`?i.includes(n):r.toLowerCase().includes(n)||i.includes(n)}),O=D.reduce((e,t)=>e+t.amount,0),k=D.reduce((e,t)=>e+t.merchantFeeAmount,0),A=D.reduce((e,t)=>e+Number(t.pgTotalCost||0),0),j=D.reduce((e,t)=>e+t.organizationCommission,0),M=D.reduce((e,t)=>e+t.headOfficeCommission,0);s&&(s.innerHTML=`
          <div
            class="payment-mini-summary"
            style="
              display:grid;
              grid-template-columns:repeat(6, minmax(0, 1fr));
              gap:10px;
              width:100%;
            "
          >
      
            <div
              class="payment-mini-summary-card"
            >
              <strong>
                승인건수
              </strong>
      
              <span>
                ${D.length.toLocaleString()}건
              </span>
            </div>
      
      
            <div
              class="payment-mini-summary-card"
            >
              <strong>
                총 승인금액
              </strong>
      
              <span>
                ${O.toLocaleString()}원
              </span>
            </div>
      
      
            <div
              class="payment-mini-summary-card"
            >
              <strong>
                가맹점 수수료 합계
              </strong>
      
              <span>
                ${k.toLocaleString()}원
              </span>
            </div>
      
      
            <div
              class="payment-mini-summary-card"
            >
              <strong>
                PG 원가
              </strong>
      
              <span>
                ${A.toLocaleString()}원
              </span>
            </div>
      
      
            <div
              class="payment-mini-summary-card"
            >
              <strong>
                조직 수수료 합계
              </strong>
      
              <span>
                ${j.toLocaleString()}원
              </span>
            </div>
      
      
            <div
              class="payment-mini-summary-card"
            >
              <strong>
                본사 실제 수익
              </strong>
      
              <span>
                ${M.toLocaleString()}원
              </span>
            </div>
      
          </div>
        `);let N=new Map;D.forEach(e=>{let t=Number(e.merchant_id||0),n=N.get(t);n?(n.paymentCount+=1,n.paymentAmount+=e.amount,n.merchantFee+=e.merchantFeeAmount,n.pgCost+=Number(e.pgTotalCost||0),n.organizationFee+=e.organizationCommission,n.headOfficeFee+=e.headOfficeCommission):N.set(t,{merchantId:t,merchantName:e.merchant_name||`-`,paymentCount:1,paymentAmount:e.amount,merchantFee:e.merchantFeeAmount,pgCost:Number(e.pgTotalCost||0),organizationFee:e.organizationCommission,headOfficeFee:e.headOfficeCommission})});let P=Array.from(N.values()).sort((e,t)=>t.headOfficeFee-e.headOfficeFee),F=Number(sessionStorage.getItem(`head_office_fee_page_size`)||`10`),I=[10,20,50].includes(F)?F:10,L=Number(sessionStorage.getItem(`head_office_fee_page`)||`1`),R=Math.max(1,Math.ceil(P.length/I)),ee=Math.min(Math.max(L,1),R),te=(ee-1)*I,ne=P.slice(te,te+I);c&&(c.innerHTML=`
        <tr>
          <th>No</th>
          <th>가맹점</th>
          <th>승인건수</th>
          <th>승인금액</th>
          <th>가맹점 수수료</th>
<th>PG 원가</th>
<th>조직 수수료</th>
<th>본사 실제 수익</th>
        </tr>
      `),l.innerHTML=P.length===0?`
          <tr>
            <td
              colspan="8"
              style="
                text-align:center;
                padding:30px;
              "
            >
              조회된 결제내역이 없습니다.
            </td>
          </tr>
        `:ne.map((e,t)=>{let n=`MER`+String(e.merchantId).padStart(4,`0`);return`
                <tr>
  
                  <td>
  ${te+t+1}
</td>
  
                  <td>
                    ${n}<br>
                    ${e.merchantName}
                  </td>
  
                  <td>
                    ${e.paymentCount.toLocaleString()}건
                  </td>
  
                  <td>
                    ${e.paymentAmount.toLocaleString()}원
                  </td>
  
                  <td>
                    ${e.merchantFee.toLocaleString()}원
                  </td>
  
                  <td>
  ${e.pgCost.toLocaleString()}원
</td>

                  <td>
                    ${e.organizationFee.toLocaleString()}원
                  </td>
  
                  <td>
                    <strong>
                      ${e.headOfficeFee.toLocaleString()}원
                    </strong>
                  </td>
  
                </tr>
              `}).join(``);let re=document.querySelector(`#head-office-page-size`);re&&(re.value=String(I),re.addEventListener(`change`,()=>{sessionStorage.setItem(`head_office_fee_page_size`,re.value),sessionStorage.setItem(`head_office_fee_page`,`1`),document.querySelector(`.admin-tab[data-page="payment"]`)?.click()}));let ie=document.querySelector(`#head-office-pagination`);if(ie){ie.innerHTML=``;for(let e=1;e<=R;e+=1){let t=document.createElement(`button`);t.type=`button`,t.textContent=String(e),e===ee&&t.classList.add(`active`),t.addEventListener(`click`,()=>{sessionStorage.setItem(`head_office_fee_page`,String(e)),document.querySelector(`.admin-tab[data-page="payment"]`)?.click()}),ie.appendChild(t)}}document.querySelector(`#head-office-fee-search`)?.addEventListener(`click`,()=>{let e=document.querySelector(`#head-office-fee-start`)?.value||n,r=document.querySelector(`#head-office-fee-end`)?.value||t,i=document.querySelector(`#head-office-fee-pg`)?.value||`all`,a=document.querySelector(`#head-office-fee-target`)?.value||`all`,o=document.querySelector(`#head-office-fee-keyword`)?.value.trim()||``;if(e>r){alert(`시작일이 종료일보다 늦을 수 없습니다.`);return}sessionStorage.setItem(`head_office_fee_start`,e),sessionStorage.setItem(`head_office_fee_end`,r),sessionStorage.setItem(`head_office_fee_pg`,i),sessionStorage.setItem(`head_office_fee_target`,a),sessionStorage.setItem(`head_office_fee_keyword`,o),sessionStorage.setItem(`head_office_fee_page`,`1`),document.querySelector(`.admin-tab[data-page="payment"]`)?.click()});let z=(t,n)=>{let r=new Date(t+`T12:00:00+09:00`);return r.setDate(r.getDate()+n),e(r)},B=(e,t)=>{sessionStorage.setItem(`head_office_fee_start`,e),sessionStorage.setItem(`head_office_fee_end`,t),sessionStorage.setItem(`head_office_fee_page`,`1`),document.querySelector(`.admin-tab[data-page="payment"]`)?.click()};document.querySelector(`#head-office-fee-prev`)?.addEventListener(`click`,()=>{B(z(r,-1),z(i,-1))}),document.querySelector(`#head-office-fee-today`)?.addEventListener(`click`,()=>{B(t,t)}),document.querySelector(`#head-office-fee-next`)?.addEventListener(`click`,()=>{B(z(r,1),z(i,1))}),document.querySelector(`#head-office-fee-month`)?.addEventListener(`click`,()=>{B(n,t)});return}if(d===`cash`){a&&(a.innerHTML=`▶ 결제관리 > 현금영수증 발급`);let e=new Date().toLocaleDateString(`en-CA`,{timeZone:`Asia/Seoul`}),t=sessionStorage.getItem(`cash_receipt_start_date`)||e,n=sessionStorage.getItem(`cash_receipt_end_date`)||e,r=sessionStorage.getItem(`cash_receipt_type`)||`all`,i=sessionStorage.getItem(`cash_receipt_keyword`)||``;o&&(o.innerHTML=`
      <div class="payment-search-line">

        <input
          id="cash-admin-start-date"
          type="date"
          value="${t}"
        />

        <span>~</span>

        <input
          id="cash-admin-end-date"
          type="date"
          value="${n}"
        />

        <select
          id="cash-admin-type"
        >
          <option
            value="all"
            ${r===`all`?`selected`:``}
          >
            전체구분
          </option>

          <option
            value="소득공제"
            ${r===`소득공제`?`selected`:``}
          >
            소득공제
          </option>

          <option
            value="지출증빙"
            ${r===`지출증빙`?`selected`:``}
          >
            지출증빙
          </option>
        </select>

        <input
          id="cash-admin-keyword"
          type="text"
          value="${i}"
          placeholder="가맹점명 / 승인번호 / 증빙번호"
        />

        <button
          id="cash-admin-search"
          class="search-btn"
          type="button"
        >
          🔍 검색
        </button>

      </div>
    `),u&&(u.innerHTML=`
      <button
        id="cash-receipt-excel-download"
        type="button"
      >
        엑셀 다운로드
      </button>
    `);let d=new Date(t+`T00:00:00+09:00`).toISOString(),f=new Date(n+`T23:59:59.999+09:00`).toISOString(),p=X.from(`cash_receipts`).select(`*`).gte(`issued_at`,d).lte(`issued_at`,f).order(`issued_at`,{ascending:!1});r!==`all`&&(p=p.eq(`receipt_type`,r));let{data:m,error:h}=await p;if(h){alert(`현금영수증 조회 실패: `+h.message);return}let g=m||[];if(i){let e=i.trim().toLowerCase();g=g.filter(t=>String(t.merchant_name||``).toLowerCase().includes(e)||String(t.approval_number||``).toLowerCase().includes(e)||String(t.identity_number_masked||``).toLowerCase().includes(e)||String(t.order_id||``).toLowerCase().includes(e))}let _=g.reduce((e,t)=>e+Number(t.amount||0),0),v=new Set(g.map(e=>Number(e.merchant_id))).size;s&&(s.innerHTML=`
      <div
        class="payment-mini-summary"
        style="
          display:grid;
          grid-template-columns:repeat(6, minmax(0, 1fr));
          gap:10px;
        "
      >

        <div
          class="payment-mini-summary-card"
        >
          <strong>
            검색 데이터
          </strong>

          <span>
            ${g.length.toLocaleString()}건
          </span>
        </div>

        <div
          class="payment-mini-summary-card"
        >
          <strong>
            가맹점
          </strong>

          <span>
            ${v.toLocaleString()}곳
          </span>
        </div>

        <div
          class="payment-mini-summary-card"
        >
          <strong>
            승인금액
          </strong>

          <span>
            ${_.toLocaleString()}원
          </span>
        </div>

      </div>
    `),c&&(c.innerHTML=`
      <tr>
        <th>No</th>
        <th>거래일시</th>
        <th>승인번호</th>
        <th>가맹점</th>
        <th>승인구분</th>
        <th>증빙번호</th>
        <th>품목명</th>
        <th>물품가액</th>
        <th>부가세</th>
        <th>승인금액</th>
        <th>상태</th>
        <th>PG사</th>
        <th>처리</th>
      </tr>
    `),l.innerHTML=``,g.forEach((e,t)=>{let n=document.createElement(`tr`),r=`MER`+String(e.merchant_id||0).padStart(4,`0`),i=e.issued_at?new Date(e.issued_at).toLocaleString(`ko-KR`,{timeZone:`Asia/Seoul`}):`-`;n.innerHTML=`
        <td>
          ${t+1}
        </td>

        <td>
          ${i}
        </td>

        <td>
          ${e.approval_number||`-`}
        </td>

        <td>
          ${r}<br>
          ${e.merchant_name||`-`}
        </td>

        <td>
          ${e.receipt_type||`-`}
        </td>

        <td>
          ${e.identity_number_masked||`-`}
        </td>

        <td>
          ${e.order_name||`-`}
        </td>

        <td>
          ${Number(e.supply_amount||0).toLocaleString()}원
        </td>

        <td>
          ${Number(e.vat_amount||0).toLocaleString()}원
        </td>

        <td>
          <strong>
            ${Number(e.amount||0).toLocaleString()}원
          </strong>
        </td>

        <td>
          ${e.status||`-`}
        </td>

        <td>
          ${e.pg_company||`-`}
        </td>

        <td>
  ${e.status===`취소완료`?`취소완료`:e.receipt_key?`
          <button
            type="button"
            class="cash-receipt-cancel-btn"
            data-id="${e.id}"
            data-receipt-key="${e.receipt_key}"
            data-amount="${e.amount||0}"
          >
            취소처리
          </button>
        `:`-`}
</td>

      `,l.appendChild(n)}),document.querySelectorAll(`.cash-receipt-cancel-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=Number(e.dataset.id||0),n=String(e.dataset.receiptKey||``),r=Number(e.dataset.amount||0);if(!t||!n){alert(`취소할 현금영수증 정보가 없습니다.`);return}if(confirm(`현금영수증 ${r.toLocaleString()}원을 취소하시겠습니까?`)){e.disabled=!0,e.textContent=`취소 중...`;try{let e=await fetch(`/api/toss-cash-receipt-cancel`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({receiptKey:n})}),i=await e.json();if(!e.ok||!i.success){alert(`현금영수증 취소 실패: `+(i.message||`알 수 없는 오류`));return}let a=i?.data?.entityBody||i?.data?.cashReceipt||i?.data||i,{error:o}=await X.from(`cash_receipts`).update({status:`취소완료`,canceled_at:new Date().toISOString(),cancel_amount:r,cancel_receipt_key:a?.receiptKey||null,cancel_response:i}).eq(`id`,t);if(o){alert(`현금영수증은 취소됐지만 내역 저장에 실패했습니다.
`+o.message);return}alert(`현금영수증 취소가 완료되었습니다.`),document.querySelector(`.admin-tab[data-page="payment"]`)?.click()}catch(e){console.error(`현금영수증 취소 오류:`,e),alert(`현금영수증 취소 중 오류가 발생했습니다.`)}finally{e.disabled=!1,e.textContent=`취소처리`}}})}),document.querySelector(`#cash-admin-search`)?.addEventListener(`click`,()=>{let t=document.querySelector(`#cash-admin-start-date`)?.value||e,n=document.querySelector(`#cash-admin-end-date`)?.value||e,r=document.querySelector(`#cash-admin-type`)?.value||`all`,i=document.querySelector(`#cash-admin-keyword`)?.value||``;sessionStorage.setItem(`cash_receipt_start_date`,t),sessionStorage.setItem(`cash_receipt_end_date`,n),sessionStorage.setItem(`cash_receipt_type`,r),sessionStorage.setItem(`cash_receipt_keyword`,i),document.querySelector(`.admin-tab[data-page="payment"]`)?.click()}),document.querySelector(`#cash-receipt-excel-download`)?.addEventListener(`click`,()=>{if(g.length===0){alert(`다운로드할 현금영수증 내역이 없습니다.`);return}let e=g.map((e,t)=>({No:t+1,거래일시:e.issued_at||``,승인번호:e.approval_number||``,가맹점ID:`MER`+String(e.merchant_id||0).padStart(4,`0`),가맹점명:e.merchant_name||``,승인구분:e.receipt_type||``,증빙번호:e.identity_number_masked||``,품목명:e.order_name||``,물품가액:Number(e.supply_amount||0),부가세:Number(e.vat_amount||0),승인금액:Number(e.amount||0),상태:e.status||``,PG사:e.pg_company||``})),t=wb.json_to_sheet(e),n=wb.book_new();wb.book_append_sheet(n,t,`현금영수증`),ib(n,`현금영수증내역.xlsx`)});return}a&&(a.innerHTML=`▶ 결제관리 > 승인내역조회`),o&&(o.innerHTML=`<div class="payment-search-line"><select id="payment-pg-filter"><option value="all">전체 PG</option><option value="toss">토스</option><option value="korpay">코페이</option></select><select id="payment-date-type"><option value="created_at">거래일자</option><option value="canceled_at">취소일자</option></select><input id="payment-start-date" type="date" /><span>~</span><input id="payment-end-date" type="date" /><button class="quick-btn" id="payment-prev-btn">이전</button><button class="quick-btn" id="payment-today-btn">오늘</button><button class="quick-btn" id="payment-next-btn">다음</button><button class="quick-btn" id="payment-month-btn">당월</button><select id="payment-search-type"><option value="all">전체검색</option><option value="name">가맹점명 / 대표자명</option><option value="manager">담당자</option><option value="agency">대리점</option><option value="branch">지사</option><option value="order_id">주문번호</option><option value="payment_key">결제키</option></select><input id="payment-search-keyword" placeholder="검색어 입력" /><button id="payment-search-btn" class="search-btn" type="button">🔍 검색</button></div>`);let p=e=>{let t=document.querySelector(`#payment-start-date`),n=document.querySelector(`#payment-end-date`);if(!t||!n)return;let r=t.value||new Date().toLocaleDateString(`en-CA`,{timeZone:`Asia/Seoul`}),i=new Date(r+`T00:00:00`);i.setDate(i.getDate()+e);let a=[i.getFullYear(),String(i.getMonth()+1).padStart(2,`0`),String(i.getDate()).padStart(2,`0`)].join(`-`);t.value=a,n.value=a,document.querySelector(`#payment-search-btn`)?.click()};if(document.querySelector(`#payment-prev-btn`)?.addEventListener(`click`,()=>{p(-1)}),document.querySelector(`#payment-today-btn`)?.addEventListener(`click`,()=>{let e=new Date().toLocaleDateString(`en-CA`,{timeZone:`Asia/Seoul`}),t=document.querySelector(`#payment-start-date`),n=document.querySelector(`#payment-end-date`);t&&(t.value=e),n&&(n.value=e),document.querySelector(`#payment-search-btn`)?.click()}),document.querySelector(`#payment-next-btn`)?.addEventListener(`click`,()=>{p(1)}),document.querySelector(`#payment-month-btn`)?.addEventListener(`click`,()=>{let e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,`0`),r=e.toISOString().slice(0,10),i=document.querySelector(`#payment-start-date`),a=document.querySelector(`#payment-end-date`);i&&(i.value=t+`-`+n+`-01`),a&&(a.value=r),document.querySelector(`#payment-search-btn`)?.click()}),document.querySelector(`#payment-search-btn`)?.addEventListener(`click`,()=>{window.paymentFilters={pg:document.querySelector(`#payment-pg-filter`)?.value||`all`,dateType:document.querySelector(`#payment-date-type`)?.value||`created_at`,startDate:document.querySelector(`#payment-start-date`)?.value||``,endDate:document.querySelector(`#payment-end-date`)?.value||``,searchType:document.querySelector(`#payment-search-type`)?.value||`all`,keyword:document.querySelector(`#payment-search-keyword`)?.value||``},document.querySelector(`.admin-tab[data-page="payment"]`)?.click()}),!window.paymentFilters){let e=new Date().toLocaleDateString(`en-CA`,{timeZone:`Asia/Seoul`});window.paymentFilters={pg:`all`,dateType:`created_at`,startDate:e,endDate:e,searchType:`all`,keyword:``}}let m=window.paymentFilters;if(m){let e=document.querySelector(`#payment-pg-filter`),t=document.querySelector(`#payment-date-type`),n=document.querySelector(`#payment-start-date`),r=document.querySelector(`#payment-end-date`),i=document.querySelector(`#payment-search-type`),a=document.querySelector(`#payment-search-keyword`);e&&(e.value=m.pg||`all`),t&&(t.value=m.dateType||`created_at`),n&&(n.value=m.startDate||``),r&&(r.value=m.endDate||``),i&&(i.value=m.searchType||`all`),a&&(a.value=m.keyword||``)}let h=await X.from(`payments`).select(`*`).order(`created_at`,{ascending:!1});if(h.error){alert(`결제내역 조회 실패: `+h.error.message);return}let g=h.data||[],{data:_,error:v}=await X.from(`merchants`).select(`
      id,
      merchant_name,
      branch_admin_id,
      agency_admin_id,
      manager_admin_id
    `);if(v){alert(`가맹점 조직정보 조회 실패: `+v.message);return}let{data:y,error:b}=await X.from(`admin_users`).select(`
      id,
      admin_name,
      company_name,
      role,
      parent_admin_id
    `);if(b){alert(`조직정보 조회 실패: `+b.message);return}let x=new Map;(_||[]).forEach(e=>{x.set(Number(e.id),e)});let S=new Map;(y||[]).forEach(e=>{S.set(Number(e.id),e)});let C=e=>{if(!e)return``;let t=String(e.company_name||``).trim(),n=String(e.admin_name||``).trim();return[t,n,t&&n?t+`(`+n+`)`:``].filter(Boolean).join(` `).toLowerCase()},w=e=>{let t=x.get(e);if(!t)return{manager:``,agency:``,branch:``};let n=t.manager_admin_id?S.get(Number(t.manager_admin_id)):null,r=t.agency_admin_id?S.get(Number(t.agency_admin_id)):null,i=t.branch_admin_id?S.get(Number(t.branch_admin_id)):null;if(!r&&n){let e=S.get(Number(n.parent_admin_id));e?.role===`AGENCY`&&(r=e),e?.role===`BRANCH`&&(i=e)}return!i&&r&&(i=S.get(Number(r.parent_admin_id))),{manager:C(n),agency:C(r),branch:C(i)}};if(t===`MANAGER`){let{data:t,error:n}=await X.from(`admin_users`).select(`id`).eq(`login_id`,e).single();if(n||!t){alert(`담당자 정보를 확인하지 못했습니다.`);return}let{data:r,error:i}=await X.from(`merchants`).select(`id`).eq(`manager_admin_id`,t.id);if(i){alert(`담당 가맹점 정보를 확인하지 못했습니다.`);return}let a=(r||[]).map(e=>Number(e.id));g=g.filter(e=>a.includes(Number(e.merchant_id)))}if(t===`AGENCY`||t===`BRANCH`){let{data:n,error:r}=await X.from(`admin_users`).select(`id`).eq(`login_id`,e).single();if(r||!n){alert(`조직 정보를 확인하지 못했습니다.`);return}let i=X.from(`merchants`).select(`id`);t===`AGENCY`&&(i=i.eq(`agency_admin_id`,n.id)),t===`BRANCH`&&(i=i.eq(`branch_admin_id`,n.id));let{data:a,error:o}=await i;if(o){alert(`소속 가맹점 정보를 확인하지 못했습니다.`);return}let s=(a||[]).map(e=>Number(e.id));g=g.filter(e=>s.includes(Number(e.merchant_id)))}let T=window.paymentFilters;if(T){let e=T,t=e.pg||`all`,n=e.dateType||`created_at`,r=e.startDate||``,i=e.endDate||``,a=e.searchType||`all`,o=String(e.keyword||``).trim().toLowerCase();t!==`all`&&(g=g.filter(e=>{let n=String(e.pg_company||``).toLowerCase();return t===`toss`?n.includes(`토스`)||n.includes(`toss`):t===`korpay`?n.includes(`코페이`)||n.includes(`korpay`):!0})),r&&(g=g.filter(e=>String(e[n]||``).slice(0,10)>=r)),i&&(g=g.filter(e=>String(e[n]||``).slice(0,10)<=i)),o&&(g=g.filter(e=>{let t=w(Number(e.merchant_id)),n={name:String(e.merchant_name||``).toLowerCase(),manager:t.manager,agency:t.agency,branch:t.branch,order_id:String(e.order_id||``).toLowerCase(),payment_key:String(e.payment_key||``).toLowerCase()};return a===`all`?Object.values(n).some(e=>e.includes(o)):n[a]?.includes(o)||!1}))}let{data:E,error:D}=await X.from(`cancel_requests`).select(`id, payment_id, status, reason`).eq(`status`,`요청중`);if(D){alert(`취소요청 조회 실패: `+D.message);return}let O=new Set(g.map(e=>Number(e.id))),k=new Map;if((E||[]).forEach(e=>{let t=Number(e.payment_id);O.has(t)&&k.set(t,e)}),s){let e=document.querySelector(`#payment-date-type`)?.value||`created_at`,t=g.reduce((t,n)=>e===`created_at`&&n.status!==`paid`?t:t+Number(n.amount||0),0),n=new Set(g.map(e=>Number(e.merchant_id)).filter(e=>e>0)).size,r=k.size;s.innerHTML=`<div class="payment-mini-summary"><div class="payment-mini-summary-card all-payments"><strong>검색 데이터</strong><span>`+g.length.toLocaleString()+`건</span></div><div class="payment-mini-summary-card"><strong>가맹점</strong><span>`+n.toLocaleString()+`곳</span></div><div class="payment-mini-summary-card"><strong>전체금액</strong><span>`+t.toLocaleString()+`원</span></div><div class="payment-mini-summary-card cancel-request"><strong>취소요청</strong><span>`+r.toLocaleString()+`건</span></div></div>`}document.querySelector(`.payment-mini-summary-card.cancel-request`)?.addEventListener(`click`,()=>{sessionStorage.setItem(`payment_cancel_request_filter`,`요청중`),document.querySelector(`.admin-tab[data-page="payment"]`)?.click()}),document.querySelector(`.payment-mini-summary-card.all-payments`)?.addEventListener(`click`,()=>{sessionStorage.removeItem(`payment_cancel_request_filter`),document.querySelector(`.admin-tab[data-page="payment"]`)?.click()}),c&&(c.innerHTML=`<tr><th>No</th><th>승인일<br/>승인번호</th><th>취소일<br/>거래번호</th><th>가맹점아이디/구분<br/>가맹점상호/가맹점명</th><th>매입사</th><th>메모</th><th>카드번호<br/>할부구분</th><th>결제수단<br/>결제금액</th><th>거래방식<br/>물품금액</th><th>거래수수료<br/>가맹점금액</th></tr>`),l.innerHTML=``;let A=document.querySelector(`#admin-page-size`),j=sessionStorage.getItem(`payment_page_size`)||`10`;A&&(A.value=j,A.onchange=()=>{sessionStorage.setItem(`payment_page_size`,A.value),document.querySelector(`.admin-tab[data-page="payment"]`)?.click()});let M=Number(j)||10,N=sessionStorage.getItem(`payment_cancel_request_filter`)===`요청중`?g.filter(e=>k.has(Number(e.id))):g;document.querySelector(`#payment-excel-download`)?.addEventListener(`click`,()=>{if(N.length===0){alert(`다운로드할 결제내역이 없습니다.`);return}let e=N.map((e,t)=>{let n=Number(e.amount||0),r=Number(e.fee_amount||0),i=Number(e.settlement_amount??n-r),a=Number(e.installment_months||0);return{No:t+1,승인일:e.approved_at||e.created_at||``,승인번호:e.approval_number||``,취소일:e.canceled_at||``,거래번호:e.order_id||e.payment_key||``,가맹점ID:e.merchant_id?`MER`+String(e.merchant_id).padStart(4,`0`):``,가맹점명:e.merchant_name||``,매입사:e.card_company||``,구매자연락처:e.buyer_phone||e.phone||``,구매상품:e.order_name||e.product_name||``,구매자성명:e.sender_name||e.buyer_name||``,메모:e.message||``,카드번호:e.card_number||``,할부구분:a>0?a+`개월`:`일시불`,결제상태:e.status===`cancel`?`취소`:`승인`,결제수단:e.payment_method||`카드`,결제금액:n,거래방식:e.pg_company||``,물품금액:n,거래수수료:r,가맹점금액:i}}),t=N.reduce((e,t)=>e+Number(t.amount||0),0);e.push({}),e.push({No:``,승인일:`검색 건수`,승인번호:N.length+`건`,취소일:``,거래번호:``,가맹점ID:``,가맹점명:``,매입사:``,구매자연락처:``,구매상품:``,구매자성명:``,메모:``,카드번호:``,할부구분:``,결제상태:``,결제수단:``,결제금액:``,거래방식:``,물품금액:``,거래수수료:``,가맹점금액:``}),e.push({No:``,승인일:`전체금액`,승인번호:t,취소일:``,거래번호:``,가맹점ID:``,가맹점명:``,매입사:``,구매자연락처:``,구매상품:``,구매자성명:``,메모:``,카드번호:``,할부구분:``,결제상태:``,결제수단:``,결제금액:``,거래방식:``,물품금액:``,거래수수료:``,가맹점금액:``});let n=wb.json_to_sheet(e);n[`!cols`]=[{wch:6},{wch:22},{wch:16},{wch:22},{wch:32},{wch:14},{wch:24},{wch:15},{wch:18},{wch:24},{wch:16},{wch:28},{wch:22},{wch:12},{wch:12},{wch:12},{wch:14},{wch:16},{wch:14},{wch:14},{wch:14}];let r=wb.book_new();wb.book_append_sheet(r,n,`결제내역`),ib(r,`결제내역_${new Date().toISOString().slice(0,10)}.xlsx`)});let P=Number(sessionStorage.getItem(`payment_current_page`)||`1`),F=Math.max(1,Math.ceil(N.length/M)),I=Math.min(Math.max(P,1),F),L=(I-1)*M,R=N.slice(L,L+M),ee=document.querySelector(`#admin-page-size`)?.parentElement;if(ee?.querySelector(`#payment-pagination`)?.remove(),ee){ee.style.position=`relative`;let e=document.createElement(`div`);e.id=`payment-pagination`,e.innerHTML=`<button type="button" id="payment-prev-page">이전</button><span>`+I+` / `+F+`</span><button type="button" id="payment-next-page">다음</button>`,ee.appendChild(e),document.querySelector(`#payment-prev-page`)?.addEventListener(`click`,()=>{I<=1||(sessionStorage.setItem(`payment_current_page`,String(I-1)),document.querySelector(`.admin-tab[data-page="payment"]`)?.click())}),document.querySelector(`#payment-next-page`)?.addEventListener(`click`,()=>{I>=F||(sessionStorage.setItem(`payment_current_page`,String(I+1)),document.querySelector(`.admin-tab[data-page="payment"]`)?.click())});let t=document.querySelector(`#payment-prev-page`),n=document.querySelector(`#payment-next-page`);t&&(t.disabled=I<=1),n&&(n.disabled=I>=F)}R.forEach((e,t)=>{let r=document.createElement(`tr`),a=k.get(Number(e.id)),o=e.status===`cancel`?`취소완료`:a?`취소요청`:`-`;r.innerHTML=`<td>`+(t+1)+`</td><td>`+n(e.created_at)+`<br/><button type="button" class="admin-receipt-btn admin-receipt-link" data-order="`+(e.order_id||``)+`" data-order-number="`+(e.order_number||``)+`" data-amount="`+(e.amount||0)+`" data-sender="`+(e.sender_name||``)+`" data-merchant="`+(e.merchant_name||``)+`" data-pg="`+(e.pg_company||`토스페이먼츠`)+`" data-merchant-id="`+(e.merchant_id||``)+`" data-date="`+(e.created_at||``)+`" data-status="`+(e.status||``)+`">`+(e.approval_number||`-`)+`</button></td><td><button type="button" class="payment-cancel-link" data-id="`+e.id+`">`+o+`<br/><span title="`+(e.payment_key||`-`)+`">`+((e.payment_key||`-`).length>18?(e.payment_key||`-`).substring(0,18)+`...`:e.payment_key||`-`)+`</span></button></td><td>`+(e.merchant_name||`-`)+`<br/>가맹점ID `+(e.merchant_id||`-`)+`</td><td>`+(e.card_company||`-`)+`</td><td>`+(e.message||`-`)+`</td><td>`+(e.card_number||`-`)+`<br/>`+(!e.installment_months||e.installment_months===`00`||e.installment_months===`0`||e.installment_months===`일시불`?`일시불`:e.installment_months+`개월`)+`</td><td>`+i(e.status)+`<br/>`+Number(e.amount||0).toLocaleString()+`원</td><td>`+(e.pg_company||`온라인`)+`<br/>`+Number(e.amount||0).toLocaleString()+`원</td><td>`+Number(e.fee_amount||0).toLocaleString()+`원<br/>`+Number(e.settlement_amount||e.amount||0).toLocaleString()+`원</td>`,e.status===`cancel`&&r.classList.add(`payment-cancel-row`),l.appendChild(r)}),document.querySelectorAll(`.payment-cancel-link`).forEach(e=>{e.addEventListener(`click`,async t=>{t.preventDefault(),t.stopPropagation();let n=Number(e.dataset.id);if(!window.confirm(`이 결제를 실제 취소 처리할까요?`))return;let r=e;r.style.pointerEvents=`none`,r.style.opacity=`0.5`;let{data:i,error:a}=await X.from(`payments`).select(`*`).eq(`id`,n).single();if(a||!i){alert(`결제정보를 불러오지 못했습니다.`);return}if(i.status===`cancel`){alert(`이미 취소된 결제입니다.`);return}let o=k.get(Number(i.id)),s=String(o?.reason||`관리자 취소 승인`).trim(),c=async()=>{let e={order_status:`취소완료`,payment_status:`취소완료`,cancel_status:`취소완료`,cancel_reason:s,cancel_requested_at:new Date().toISOString()},t=String(i.payment_key||``).trim(),n=String(i.order_id||``).trim().replace(/[^a-zA-Z0-9]/g,``),r=0;if(t){let{data:n,error:i}=await X.from(`orders`).update(e).eq(`payment_key`,t).select(`id`);if(i)return alert(`결제는 취소됐지만 가맹점 주문상태 반영에 실패했습니다.
`+i.message),!1;r+=n?.length||0}if(n){let{data:t,error:i}=await X.from(`orders`).update(e).eq(`pg_order_id`,n).select(`id`);if(i)return alert(`결제는 취소됐지만 가맹점 주문상태 반영에 실패했습니다.
`+i.message),!1;r+=t?.length||0}return r===0?(alert(`결제는 취소됐지만 가맹점 주문을 찾지 못했습니다.
payment_key 또는 주문번호 연결을 확인해야 합니다.`),!1):!0};if(String(i.pg_company||``).includes(`토스`)){if(!i.payment_key){alert(`토스 paymentKey가 없습니다.`);return}let e=await fetch(`/api/toss-cancel`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({paymentKey:i.payment_key,cancelReason:s})}),t=await e.json();if(!e.ok){alert(`토스 실제 취소에 실패했습니다.

`+(t.message||t.error?.message||`알 수 없는 오류`));return}let{error:n}=await X.from(`payments`).update({status:`cancel`,canceled_at:new Date().toISOString(),payout_status:`출금제외`,settlement_status:`취소`}).eq(`id`,Number(i.id));if(n){alert(`토스 취소는 성공했지만 결제내역 수정에 실패했습니다.
`+n.message);return}let{error:r}=await X.from(`cancel_requests`).update({status:`승인완료`,processed_at:new Date().toISOString()}).eq(`payment_id`,Number(i.id)).eq(`status`,`요청중`);if(r){alert(`토스 취소는 성공했지만 취소요청 상태 변경에 실패했습니다.
`+r.message);return}if(!await c())return;alert(`토스 결제가 실제 취소되었습니다.`),location.reload();return}if(i.pg_company!==`코페이`){alert(`현재 관리자 취소 API는 코페이 결제만 지원합니다.
결제 PG사: `+(i.pg_company||`-`));return}let l=await fetch(`/api/korpay-cancel`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({paymentId:Number(i.id),cancelName:sessionStorage.getItem(`admin_name`)||`관리자`,cancelMessage:s})}),u=await l.json();if(!l.ok||!u.success){alert(`코페이 실제 취소에 실패했습니다.

`+(u.message||`알 수 없는 오류`)+(u.resultCode?`
응답코드: `+u.resultCode:``));return}let{error:d}=await X.from(`cancel_requests`).update({status:`승인완료`,processed_at:new Date().toISOString()}).eq(`payment_id`,Number(i.id)).eq(`status`,`요청중`);if(d){alert(`코페이 취소는 성공했지만 취소요청 상태 변경에 실패했습니다.
`+d.message);return}await c()&&(alert(`코페이 결제가 실제 취소되었습니다.
취소 Noti 수신 후 결제관리와 가맹점 화면에 자동 반영됩니다.`),location.reload())})}),document.querySelectorAll(`.admin-receipt-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e,n=t.dataset.order||`-`,r=t.dataset.orderNumber||`-`,i=Number(t.dataset.amount||0),a=t.dataset.sender||`-`,o=t.dataset.merchant||`-`,s=t.dataset.status||``,c=s===`cancel`;console.log(`status =`,s);let l=t.dataset.pg||`토스페이먼츠`,u=t.dataset.date?new Date(t.dataset.date).toLocaleString(`ko-KR`):`-`,d=`
        <div id="admin-receipt-modal" class="receipt-modal">
          <div class="receipt-box receipt-approve">
      
            <div class="receipt-header ${c?`receipt-cancel-mode`:`receipt-approve-mode`}">
              <h2>NXG PICK</h2>
              <h3 class="${c?`receipt-cancel-title`:`receipt-approve-title`}">
  신용카드 매출전표
  <span>${c?`(취소)`:`(승인)`}</span>
</h3>
            </div>
      
            <section>
              <h4>결제정보</h4>
              <table>
                <tr>
                  <th>카드번호</th>
                  <td>결제사 제공값</td>
                  <th>카드종류</th>
                  <td>신용카드</td>
                </tr>
                <tr>
                  <th>거래종류</th>
                  <td class="${c?`receipt-cancel-text`:`receipt-approve-text`}">
  ${c?`취소완료`:`승인성공`}
</td>
                  <th>할부개월</th>
                  <td>일시불</td>
                </tr>
                <tr>
                  <th>거래일시</th>
                  <td colspan="3">${u}</td>
                </tr>
              </table>
            </section>
      
            <div class="receipt-grid">
              <section>
                <h4>구매정보</h4>
                <table>
                  <tr><th>주문자명</th><td>${a}</td></tr>
                  <tr><th>승인번호</th><td>${n}</td></tr>
                  <tr><th>주문번호</th><td>${r}</td></tr>
                  <tr><th>상품명 / 구매자</th><td>${o}</td></tr>
                </table>
              </section>
      
              <section>
                <h4>결제금액정보</h4>
                <table>
                  <tr><th>과세금액</th><td>${Math.floor(i/1.1).toLocaleString()}원</td></tr>
                  <tr><th>비과세금액</th><td>0원</td></tr>
                  <tr><th>부가세</th><td>${(i-Math.floor(i/1.1)).toLocaleString()}원</td></tr>
                  <tr><th>주문금액</th><td>${i.toLocaleString()}원</td></tr>
                  <tr><th>할인금액</th><td>0원</td></tr>
                  <tr class="${c?`receipt-total receipt-total-cancel`:`receipt-total`}">
  <th>총 결제금액</th>
  <td>${c?`-`:``}${i.toLocaleString()}원</td>
</tr>
                </table>
              </section>
            </div>
      
            <section>
              <h4>상점정보</h4>
              <table>
                <tr><th>상점명</th><td>${o}</td><th>대표자명</th><td>-</td></tr>
                <tr><th>URL주소</th><td>-</td><th>사업자번호</th><td>-</td></tr>
                <tr><th>이용문의</th><td colspan="3">-</td></tr>
                <tr><th>주소</th><td colspan="3">-</td></tr>
              </table>
            </section>
      
            <section>
              <h4>결제서비스업체(PG)정보</h4>
              <table>
                <tr><th>카드사 가맹점명</th><td>${l}</td><th>사업자번호</th><td>-</td></tr>
                <tr><th>대표자명</th><td>-</td><th>가맹점번호</th><td>-</td></tr>
                <tr><th>주소</th><td colspan="3">-</td></tr>
              </table>
            </section>
      
            <div class="receipt-notice">
              * 신용카드 청구서에는 실제 결제 PG사명으로 표시됩니다.<br>
              * 본 매출전표는 부가가치세법 기준에 따라 발행되었습니다.
            </div>
      
            <div class="receipt-actions">
              <button>이메일 발송</button>
              <button onclick="window.print()">인쇄하기</button>
              <button id="admin-receipt-close-btn">닫기</button>
            </div>
      
          </div>
        </div>
      `;document.querySelector(`#admin-receipt-modal`)?.remove(),document.body.insertAdjacentHTML(`beforeend`,d),document.querySelector(`#admin-receipt-modal`).style.display=`flex`,document.querySelector(`#admin-receipt-close-btn`)?.addEventListener(`click`,()=>{document.querySelector(`#admin-receipt-modal`)?.remove()})})})}})})}else if(Q===`/store`){let e=new URLSearchParams(window.location.search).get(`id`),{data:t}=await X.from(`menus`).select(`*`).eq(`event_id`,Number(e));Z.innerHTML=`
      <div class="page">
        <div class="payment-card">
          <h1>메뉴 주문</h1>
          <p>불러온 메뉴 수: ${(t||[]).length}개</p>
  
          <div class="menu-list">
            ${(t||[]).map(e=>`
              <div class="menu-card">
                ${e.image_url?`<img src="${e.image_url}" alt="${e.name}">`:``}
                <h3>${e.name}</h3>
                <p>${Number(e.price).toLocaleString()}원</p>
  
                <button
                  class="menu-select-button"
                  data-name="${e.name}"
                  data-price="${e.price}"
                >
                  선택하기
                </button>
              </div>
            `).join(``)}
          </div>
  
          <div class="input-group">
            <label>선택 메뉴</label>
            <input id="order-name-input" type="text" readonly>
          </div>
  
          <div class="input-group">
            <label>결제 금액</label>
            <input id="amount-input" type="number" readonly>
          </div>
        
          <div class="input-group">
            <label>요청사항</label>
            <input id="message-input" type="text" placeholder="예: 덜 맵게 해주세요">
          </div>
  
          <button id="pay-button">결제하기</button>
        </div>
      </div>
    `,document.querySelectorAll(`.menu-select-button`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-price`),n=e.getAttribute(`data-name`);document.querySelector(`#amount-input`).value=t||``,document.querySelector(`#order-name-input`).value=n||``})}),document.querySelector(`#pay-button`).addEventListener(`click`,async()=>{let t=Number(document.querySelector(`#amount-input`).value),n=`현장고객`,r=document.querySelector(`#message-input`).value,i=document.querySelector(`#order-name-input`).value;if(!t||!i){alert(`메뉴를 선택해주세요`);return}let a=await c(Kb);sessionStorage.setItem(`currentEventId`,e||``),sessionStorage.setItem(`currentEventType`,`store`),sessionStorage.setItem(`senderName`,n),sessionStorage.setItem(`message`,`${i} / ${r}`);let o=`order-`+String(Date.now()).slice(-4);await a.requestPayment(`카드`,{amount:t,orderId:o,orderName:i,customerName:n,successUrl:window.location.origin+`/success`,failUrl:window.location.origin+`/fail`})})}else if(Q===`/wedding`||Q===`/funeral`)Z.innerHTML=`
      <div class="page">
        <div class="payment-card ${nx?`funeral-card`:`wedding-card`}">
          <h1>${ax}</h1>
          <p>${ox}</p>

          <div class="menu-list">
  ${(ix||[]).map(e=>`
    <div class="menu-card">
      ${e.image_url?`<img src="${e.image_url}" alt="${e.name}">`:``}
      <h3>${e.name}</h3>
      <p>${Number(e.price).toLocaleString()}원</p>

      <button
        class="menu-select-button"
        data-price="${e.price}"
      >
        선택하기
      </button>
    </div>
  `).join(``)}
</div>
  
          <div class="input-group">
            <label>보낼 금액</label>
            <input id="amount-input" type="number" placeholder="금액 입력">
          </div>
  
          <div class="input-group">
            <label>보내는 사람 이름</label>
            <input id="name-input" type="text" placeholder="이름 입력">
          </div>
  
          <div class="input-group">
            <label>${sx}</label>
            <input id="message-input" type="text" placeholder="${sx} 입력">
          </div>
  
          <button id="pay-button">결제하기</button>
  
          <p class="secure-text">
            안전한 결제 시스템으로 보호됩니다
          </p>
        </div>
      </div>
    `,document.querySelectorAll(`.menu-select-button`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-price`);document.querySelector(`#amount-input`).value=t||``})}),document.querySelector(`#pay-button`).addEventListener(`click`,async()=>{let e=document.querySelector(`#amount-input`),t=document.querySelector(`#name-input`),n=document.querySelector(`#message-input`),r=Number(e.value),i=t.value,a=n.value;if(!r||!i){alert(`금액과 이름을 입력해주세요`);return}let o=await c(Kb);sessionStorage.setItem(`currentEventId`,rx||``),sessionStorage.setItem(`currentEventType`,nx?`funeral`:`wedding`),sessionStorage.setItem(`senderName`,i),sessionStorage.setItem(`message`,a),await o.requestPayment(`카드`,{amount:r,orderId:`order-`+Date.now(),orderName:ox,customerName:i,successUrl:window.location.origin+`/success`,failUrl:window.location.origin+`/fail`})});else if(Q===`/merchant-login`)Z.innerHTML=`
      <div class="nxg-login-page">
        <div class="nxg-login-left">
          <div class="nxg-logo">NXG SOFT</div>
    
          <h1>
            주문부터 운영까지,<br/>
            가맹점 통합 관리
          </h1>
    
          <p>
            주문과 상품, QR을 한 곳에서 관리하는<br/>
            NXG PICK 가맹점 시스템입니다.
          </p>
    
          <div class="nxg-login-features">
            <div>주문관리</div>
            <div>상품관리</div>
            <div>PICK QR</div>
            <div>실시간 주문</div>
          </div>
        </div>
    
        <div class="nxg-login-card">
    
          <div class="nxg-admin-badge">
            NXG PICK ADMIN
          </div>
    
          <h2>가맹점 로그인</h2>
    
          <input
            id="merchant-login-id"
            placeholder="아이디"
          />
    
          <input
            id="merchant-login-password"
            type="password"
            placeholder="비밀번호"
          />
    
          <button id="merchant-login-button">
            로그인
          </button>
    
          <button
  id="merchant-signup-button"
  class="merchant-join-button"
          >
            신규 가입
          </button>
    
          <div class="nxg-login-footer">
            NXG PICK Merchant System
          </div>
    
        </div>
      </div>
      `,document.querySelector(`#merchant-login-button`)?.addEventListener(`click`,async()=>{let e=document.querySelector(`#merchant-login-id`)?.value.trim()||``,t=document.querySelector(`#merchant-login-password`)?.value.trim()||``;if(!e||!t){alert(`아이디와 비밀번호를 입력해주세요.`);return}let{data:n,error:r}=await X.from(`merchants`).select(`*`).eq(`merchant_login_id`,e);if(r){alert(`로그인 조회 실패: `+r.message);return}let i=(n||[]).find(e=>String(e.merchant_password||``).trim()===t);if(!i){alert(`아이디 또는 비밀번호가 올바르지 않습니다.`);return}sessionStorage.setItem(`login_merchant_id`,String(i.id)),sessionStorage.setItem(`login_merchant_code`,i.merchant_login_id||``),sessionStorage.setItem(`login_merchant_name`,i.merchant_name||``),sessionStorage.setItem(`login_merchant_type`,i.merchant_type||`일반매장`),localStorage.setItem(`login_merchant_id`,String(i.id)),localStorage.setItem(`login_merchant_code`,i.merchant_login_id||``),localStorage.setItem(`login_merchant_name`,i.merchant_name||``),localStorage.setItem(`login_merchant_type`,i.merchant_type||`일반매장`),alert((i.merchant_name||`가맹점`)+`님 로그인되었습니다.`),window.location.href=`/merchant-admin`}),document.querySelector(`#merchant-signup-button`)?.addEventListener(`click`,()=>{location.href=`/merchant-apply`});else if(Q===`/member-pay`){let e=new URLSearchParams(window.location.search),t=Number(e.get(`merchant_id`));Z.innerHTML=`
    <div class="member-pay-page">
      <div class="member-pay-card">
        <h1>수강료 결제</h1>
        <p>이름과 생년월일을 입력해주세요.</p>

        <label>이름</label>
        <input id="member-pay-name" placeholder="홍길동" />

        <label>생년월일</label>
        <input id="member-pay-birth" type="date" />

        <button id="member-search-btn">
          미납내역 조회
        </button>

        <div id="member-search-result"></div>
      </div>
    </div>
  `,document.querySelector(`#member-search-btn`)?.addEventListener(`click`,async()=>{let e=(document.querySelector(`#member-pay-name`)?.value||``).trim(),n=(document.querySelector(`#member-pay-birth`)?.value||``).trim();if(!t){alert(`가맹점 정보가 없습니다.`);return}if(!e||!n){alert(`이름과 생년월일을 입력해주세요.`);return}let{data:r,error:i}=await X.from(`members`).select(`*`).eq(`merchant_id`,t).eq(`member_name`,e).eq(`birth_date`,n).single();if(i||!r){alert(`회원을 찾을 수 없습니다.`);return}let{data:a,error:o}=await X.from(`billings`).select(`*`).eq(`merchant_id`,t).eq(`member_id`,r.id).eq(`payment_status`,`미납`).order(`id`,{ascending:!1});if(o){alert(`미납내역 조회 실패: `+o.message);return}let s=document.querySelector(`#member-search-result`);if(s){if(!a||a.length===0){s.innerHTML=`
        <p>미납내역이 없습니다.</p>
      `;return}s.innerHTML=`<h2>`+r.member_name+`님 미납내역</h2>`+a.map(e=>`
        <div class="member-billing-card">
          <label>
            <input
              type="checkbox"
              class="member-billing-check"
              data-id="${e.id}"
              data-amount="${e.amount}"
            />

            <strong>${e.billing_month||``}</strong>
            -
            ${Number(e.amount||0).toLocaleString()}원
          </label>
        </div>
      `).join(``)+`
        <div class="member-pay-total">
          총 결제금액:
          <strong id="member-pay-total-amount">0원</strong>
        </div>

        <button id="member-pay-button">
          결제하기
        </button>
      `,document.querySelectorAll(`.member-billing-check`).forEach(e=>{e.addEventListener(`change`,()=>{let e=Array.from(document.querySelectorAll(`.member-billing-check:checked`)).reduce((e,t)=>e+Number(t.dataset.amount||0),0),t=document.querySelector(`#member-pay-total-amount`);t&&(t.textContent=e.toLocaleString()+`원`)})}),document.querySelector(`#member-pay-button`)?.addEventListener(`click`,()=>{let e=Array.from(document.querySelectorAll(`.member-billing-check:checked`));if(e.length===0){alert(`결제할 항목을 선택해주세요.`);return}let t=e.reduce((e,t)=>e+Number(t.dataset.amount||0),0);alert(`결제방식 선택

선택건수: `+e.length+`건
총 결제금액: `+t.toLocaleString()+`원

다음 단계에서 카드결제 / 간편결제 선택창을 연결합니다.`)})}})}else if(Q===`/merchant-admin`){let e=Number(sessionStorage.getItem(`login_merchant_id`)),t=sessionStorage.getItem(`login_merchant_name`)||``;e||(alert(`로그인이 필요합니다.`),location.href=`/merchant-login`);let n=new URLSearchParams(location.search),r=new Date().toLocaleDateString(`en-CA`,{timeZone:`Asia/Seoul`}),i=n.get(`start`)||r,a=n.get(`end`)||r,o=(sessionStorage.getItem(`login_merchant_type`)||`일반매장`)===`뷰티`,s=n.get(`view`)||`schedule`,c=o&&s===`sales`,l=()=>{let e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,`0`),r=String(e.getDate()).padStart(2,`0`);return t+`-`+n+`-`+r},u=i||l(),d=a||(o&&!c?`9999-12-31`:l()),f=X.from(`orders`).select(`*`).eq(`merchant_id`,e);(!o||c)&&i&&a&&(f=f.gte(`created_at`,i+`T00:00:00`).lte(`created_at`,a+`T23:59:59`));let{data:p,error:m}=await f.order(`created_at`,{ascending:!1});o&&!c&&(p=(p||[]).filter(e=>{let t=Array.isArray(e.items)?e.items.map(e=>e.reservation_date||``).filter(e=>!!e):[];return(t.length>0?t:[e.reservation_date||``]).some(e=>e>=u&&e<=d)}));let h=(p||[]).filter(e=>e.order_status!==`완료`),g=(p||[]).filter(e=>e.order_status===`완료`),_=(p||[]).reduce((e,t)=>e+Number(t.total_amount||0),0),v=(p||[]).length>0?Math.floor(_/(p||[]).length):0,{data:y,error:b}=await X.from(`merchants`).select(`settlement_cycle`).eq(`id`,e).single();b&&console.error(`정산주기 조회 실패:`,b);let x=String(y?.settlement_cycle||`1일`),{data:S,error:C}=await X.from(`holidays`).select(`holiday_date`);C&&console.error(`공휴일 조회 실패:`,C);let w=new Set((S||[]).map(e=>String(e.holiday_date))),T=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`,E=e=>{let t=new Date(e),n=x.match(/\d+/),r=n?Number(n[0]):1;if(r===0)for(;;){let e=T(t),n=t.getDay(),r=n===0||n===6,i=w.has(e);if(!r&&!i)return e;t.setDate(t.getDate()+1)}let i=0;for(;i<r;){t.setDate(t.getDate()+1);let e=T(t),n=t.getDay(),r=n===0||n===6,a=w.has(e);r||a||(i+=1)}return T(t)},{data:D,error:O}=await X.from(`payments`).select(`
        settlement_amount,
        payout_status,
        created_at,
        status
      `).eq(`merchant_id`,e);O&&console.error(`정산예정금액 조회 실패:`,O);let k=(D||[]).filter(e=>{if(e.status!==`paid`||!e.created_at)return!1;let t=E(e.created_at);return i&&a?t>=i&&t<=a:!0}),A=k.reduce((e,t)=>e+Number(t.settlement_amount||0),0),j=k.length>0&&k.every(e=>e.payout_status===`출금완료`),M=k.map(e=>e.created_at?T(new Date(e.created_at)):``).filter(Boolean).sort(),N=``;if(M.length>0){let e=M[0],t=M[M.length-1],n=e=>{let[t,n,r]=e.split(`-`);return t.slice(-2)+`.`+n+`.`+r};N=e===t?n(e):n(e)+`~`+n(t)}let{data:P}=await X.from(`payments`).select(`
      id,
      order_id,
      payment_key,
      approval_number,
      card_number,
      card_company,
      pg_company,
      pg_mid,
      amount,
      created_at
    `).eq(`merchant_id`,e).order(`created_at`,{ascending:!1}).limit(500),F=sessionStorage.getItem(`login_merchant_type`)||`일반매장`,I=F===`일반매장`,L=F===`뷰티`,R=F===`아카데미`,ee=F===`무선단말기`,te=F===`호텔`,ne=[];if(ee){let{data:t,error:n}=await X.from(`payments`).select(`
      id,
      created_at,
      approved_at,
      canceled_at,
      approval_number,
      order_id,
      payment_key,
      amount,
      settlement_amount,
      status,
      payout_status,
      settlement_status,
      pg_company
    `).eq(`merchant_id`,e).order(`created_at`,{ascending:!1}).limit(100);n&&console.error(`무선단말기 거래내역 조회 실패:`,n),ne=t||[]}let re=``,ie=``;if(L)re=`
    <button id="merchant-order-tab">주문관리</button>
    <button id="merchant-staff-tab">직원관리</button>
    <button id="merchant-product-tab">서비스관리</button>
    <button id="merchant-hours-tab">영업시간</button>
    <button id="merchant-qr-tab">PICK QR</button>
    <button id="merchant-card-tab">카드결제</button>
  `,ie=``;else if(I)re=`
    <button id="merchant-order-tab">주문관리</button>
    <button id="merchant-product-tab">상품관리</button>
    <button id="merchant-qr-tab">PICK QR</button>
    <button id="merchant-card-tab">카드결제</button>
  `,ie=``;else if(te)re=`
    <button id="merchant-order-tab">주문/결제내역</button>
    <button id="merchant-product-tab">상품관리</button>
    <button id="merchant-hotel-room-tab">객실관리</button>
    <button id="merchant-hotel-preview-tab">고객 결제창</button>
    <button id="merchant-card-tab">카드결제</button>
  `,ie=``;else if(ee){let t=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`,n=t(new Date),r=new URLSearchParams(window.location.search),i=r.get(`terminal_start_date`)||n,a=r.get(`terminal_end_date`)||n,{data:o}=await X.from(`merchants`).select(`settlement_cycle`).eq(`id`,e).single(),s=String(o?.settlement_cycle||`1일`),{data:c}=await X.from(`holidays`).select(`holiday_date`),l=new Set((c||[]).map(e=>String(e.holiday_date))),u=e=>{let n=new Date(e),r=s.match(/\d+/),i=r?Number(r[0]):1;if(i===0)for(;;){let e=t(n),r=n.getDay(),i=r===0||r===6,a=l.has(e);if(!i&&!a)return e;n.setDate(n.getDate()+1)}let a=0;for(;a<i;){n.setDate(n.getDate()+1);let e=t(n),r=n.getDay(),i=r===0||r===6,o=l.has(e);i||o||(a+=1)}return t(n)},d=ne.filter(e=>{let n=e.status===`cancel`?e.canceled_at||e.approved_at||e.created_at:e.approved_at||e.created_at;if(!n)return!1;let r=t(new Date(n));return r>=i&&r<=a}),f=new URLSearchParams(window.location.search),p=Math.max(1,Number(f.get(`terminal_page`)||1)),m=Math.max(1,Number(f.get(`terminal_page_size`)||10)),h=Math.max(1,Math.ceil(d.length/m)),g=Math.min(p,h),_=(g-1)*m,v=d.slice(_,_+m),y=d.filter(e=>e.status===`paid`),b=d.filter(e=>e.status===`cancel`),x=y.reduce((e,t)=>e+Number(t.amount||0),0),S=b.reduce((e,t)=>e+Number(t.amount||0),0),C=x-S,w=ne.filter(e=>{if(e.status!==`paid`)return!1;let t=e.approved_at||e.created_at;if(!t)return!1;let n=u(t);return n>=i&&n<=a}),T=w.reduce((e,t)=>e+Number(t.settlement_amount||0),0),E=w.length,D=w.map(e=>{let n=e.approved_at||e.created_at;return n?t(new Date(n)):``}).filter(Boolean).sort(),O=``;if(D.length>0){let e=D[0],t=D[D.length-1],n=e=>{let[t,n,r]=e.split(`-`);return t.slice(-2)+`.`+n+`.`+r};O=e===t?n(e):n(e)+`~`+n(t)}let k=d.length,A=y.length,j=b.length,M=e=>e===`paid`?`승인`:e===`cancel`?`취소`:e===`ready`?`대기`:e||`-`,N=e=>{let t=e.status===`cancel`?e.canceled_at||e.created_at:e.approved_at||e.created_at;return t?new Date(t).toLocaleString(`ko-KR`):`-`};re=`
    <button id="terminal-payment-tab">
      거래내역
    </button>

    
  `,ie=`
    <div class="merchant-type-ready-box">

    <div class="terminal-date-search-box">

  <div class="terminal-date-search-row">

    <input
      type="date"
      id="terminal-start-date-input"
      value="${i}"
    />

    <span class="terminal-date-wave">
      ~
    </span>

    <input
      type="date"
      id="terminal-end-date-input"
      value="${a}"
    />

    <div class="terminal-date-button-row">

  <button
    type="button"
    id="terminal-date-prev-button"
  >
    이전
  </button>

  <button
    type="button"
    id="terminal-date-today-button"
  >
    오늘
  </button>

  <button
    type="button"
    id="terminal-date-next-button"
  >
    다음
  </button>

  <button
    type="button"
    id="terminal-date-month-button"
  >
    당월
  </button>

  <button
    type="button"
    id="terminal-date-search-button"
  >
    조회
  </button>

</div>

  </div>

</div>

<div class="academy-dashboard">

  <div class="academy-card">
    <span>총매출</span>

    <strong>
      ${x.toLocaleString()}원
    </strong>

    <small>
      승인 ${A.toLocaleString()}건
    </small>
  </div>

  <div class="academy-card">
    <span>취소금액</span>

    <strong>
      ${S.toLocaleString()}원
    </strong>

    <small>
      취소 ${j.toLocaleString()}건
    </small>
  </div>

  <div class="academy-card">
    <span>순매출</span>

    <strong>
      ${C.toLocaleString()}원
    </strong>

    <small>
      총 거래 ${k.toLocaleString()}건
    </small>
  </div>

  <div class="academy-card">
    <span>정산금액</span>

    <strong>
      ${T.toLocaleString()}원
    </strong>

    <small
  style="
  display:block;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  font-size:11px;
  color:#d93025;
  font-weight:700;
"
>
  정산대상 ${E.toLocaleString()}건${O?` · `+O+` 결제건`:``}
</small>
  </div>

</div> 

      <div class="admin-table-wrap">

      <div class="admin-table-top">
  <button id="terminal-excel-download">
    엑셀 다운로드
  </button>

  <div class="admin-pagination">
    <button
      id="terminal-prev-page"
      ${g<=1?`disabled`:``}
    >
      이전
    </button>

    <span>
      ${g} / ${h}
    </span>

    <button
      id="terminal-next-page"
      ${g>=h?`disabled`:``}
    >
      다음
    </button>
  </div>

  <select id="terminal-page-size">
    <option value="10" ${m===10?`selected`:``}>
      10개씩 보기
    </option>

    <option value="20" ${m===20?`selected`:``}>
      20개씩 보기
    </option>

    <option value="50" ${m===50?`selected`:``}>
      50개씩 보기
    </option>
  </select>
</div>

        <table class="admin-table terminal-payment-table">

          <thead>
            <tr>
              <th>거래일시</th>
              <th>승인번호</th>
              <th>거래번호</th>
              <th>금액</th>
              <th>상태</th>
              <th>정산상태</th>
            </tr>
          </thead>

          <tbody>
            ${d.length===0?`
                  <tr>
                    <td colspan="6">
                      등록된 무선단말기 거래내역이 없습니다.
                    </td>
                  </tr>
                `:v.map(e=>`
                      <tr>
                        <td>
                          ${N(e)}
                        </td>

                        <td>
                          ${e.approval_number||`-`}
                        </td>

                        <td>
                          ${e.order_id||e.payment_key||`-`}
                        </td>

                        <td>
                          ${Number(e.amount||0).toLocaleString()}원
                        </td>

                        <td>
                          ${M(e.status)}
                        </td>

                        <td>
                          ${e.payout_status||e.settlement_status||`정산대기`}
                        </td>
                      </tr>
                    `).join(``)}
          </tbody>

        </table>
      </div>

    </div>
  `}else if(R){let t=new URLSearchParams(window.location.search),n=new Date,r=n.getFullYear(),i=String(n.getMonth()+1).padStart(2,`0`),a=`${r}-${i}-01`,o=new Date(r,n.getMonth()+1,0),s=`${r}-${i}-${String(o.getDate()).padStart(2,`0`)}`,c=t.get(`member_start_date`)||a,l=t.get(`member_end_date`)||s,{data:u,error:d}=await X.from(`members`).select(`*`).eq(`merchant_id`,e);d&&console.error(`회원 현황 조회 실패:`,d);let{data:f,error:p}=await X.from(`billings`).select(`*`).eq(`merchant_id`,e);p&&console.error(`청구 현황 조회 실패:`,p);let{data:m,error:h}=await X.from(`payments`).select(`id, merchant_id, status, created_at, settlement_amount, payout_status`).eq(`merchant_id`,e);h&&console.error(`아카데미 정산 현황 조회 실패:`,h);let g=m||[],{data:_,error:v}=await X.from(`merchants`).select(`settlement_cycle`).eq(`id`,e).single();v&&console.error(`아카데미 정산주기 조회 실패:`,v);let y=String(_?.settlement_cycle||`1일`),{data:b,error:x}=await X.from(`holidays`).select(`holiday_date`);x&&console.error(`아카데미 공휴일 조회 실패:`,x);let S=new Set((b||[]).map(e=>String(e.holiday_date))),C=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`,w=e=>{let t=new Date(e),n=y.match(/\d+/),r=n?Number(n[0]):1;if(r===0)for(;;){let e=C(t),n=t.getDay(),r=n===0||n===6,i=S.has(e);if(!r&&!i)return e;t.setDate(t.getDate()+1)}let i=0;for(;i<r;){t.setDate(t.getDate()+1);let e=C(t),n=t.getDay(),r=n===0||n===6,a=S.has(e);r||a||(i+=1)}return C(t)},T=g.filter(e=>{if(e.status===`cancel`||!e.created_at)return!1;let t=w(e.created_at);return!(t<c||t>l)}),E=T.reduce((e,t)=>t.payout_status===`출금완료`||t.payout_status===`지급정지`?e:e+Number(t.settlement_amount||0),0),D=T.reduce((e,t)=>t.payout_status===`출금완료`?e+Number(t.settlement_amount||0):e,0),O=T.filter(e=>e.payout_status!==`출금완료`&&e.payout_status!==`지급정지`),k=O.map(e=>e.created_at?C(new Date(e.created_at)):``).filter(Boolean).sort(),A=``;if(k.length>0){let e=k[0],t=k[k.length-1],n=e=>{let[t,n,r]=e.split(`-`);return t.slice(-2)+`.`+n+`.`+r};A=e===t?n(e):n(e)+`~`+n(t)}let j=u||[],M=f||[],N=j.filter(e=>{let t=String(e.joined_at||``).slice(0,10);return t?t>=c&&t<=l:!1}),P=N.length,F=N.length,I=M.filter(e=>{let t=e.created_at?String(e.created_at).slice(0,10):e.billing_month?String(e.billing_month)+`-01`:``;return t?t>=c&&t<=l:!1}),L=I.length,R=I.filter(e=>e.payment_status!==`완료`).length,ee=I.filter(e=>e.payment_status===`완료`).length,te=I.reduce((e,t)=>e+Number(t.amount||0),0);re=`
    <button id="merchant-member-tab">회원관리</button>
    <button id="merchant-billing-tab">청구관리</button>
    <button id="merchant-batch-tab">수기결제</button>
    <button id="merchant-payment-list-tab">결제내역</button>
  `,ie=`
    <div class="merchant-type-ready-box batch-home-dashboard">

    <div class="academy-settlement-grid">

  <div class="academy-card academy-settlement-card">
  <span>정산 예정 금액</span>

  <strong>
    ${E.toLocaleString()}원
  </strong>

  ${O.length>0?`
        <small
          style="
            display:block;
            margin-top:2px;
            white-space:nowrap;
            font-size:11px;
            line-height:1.1;
            color:#d93025;
            font-weight:700;
          "
        >
          정산대상 ${O.length.toLocaleString()}건 ·
          ${A} 결제건
        </small>
      `:``}
</div>

  <div class="academy-card academy-settlement-card">
    <span>정산 완료 금액</span>
    <strong>
      ${D.toLocaleString()}원
    </strong>
  </div>

</div>

      <div class="academy-dashboard batch-dashboard-grid">

  <div class="academy-card">
    <span>전체 회원수</span>
    <strong>${P.toLocaleString()}명</strong>
  </div>

  <div class="academy-card">
    <span>신규회원</span>
    <strong>${F.toLocaleString()}명</strong>
  </div>

  <div class="academy-card">
    <span>청구금액</span>
    <strong>${te.toLocaleString()}원</strong>
  </div>

  <div class="academy-card">
    <span>청구건수</span>
    <strong>${L.toLocaleString()}건</strong>
  </div>

  <div class="academy-card">
    <span>미납건수</span>
    <strong>${R.toLocaleString()}건</strong>
  </div>

  <div class="academy-card">
    <span>완료건수</span>
    <strong>${ee.toLocaleString()}건</strong>
  </div>

</div>


      <div class="batch-dashboard-search">

        <input
          id="batch-dashboard-start-date"
          type="date"
          value="${c}"
        />

        <span>~</span>

        <input
          id="batch-dashboard-end-date"
          type="date"
          value="${l}"
        />

        <button
          id="batch-dashboard-search-button"
          type="button"
        >
          검색
        </button>

      </div>

    </div>
  `}else re=``,ie=`
    <div class="merchant-type-ready-box">
      가맹점 유형을 확인해주세요.
    </div>
  `;let{data:z}=await X.from(`merchants`).select(`voice_enabled`).eq(`id`,e).maybeSingle(),B=z?.voice_enabled===!0,ae=Number(sessionStorage.getItem(`last_checked_order_id_`+e)||0),oe=Number((p||[])[0]?.id||0),V=`order_voice_initialized_`+e;sessionStorage.getItem(V)!==`true`&&(ae=oe,sessionStorage.setItem(`last_checked_order_id_`+e,String(oe)),sessionStorage.setItem(V,`true`)),setInterval(async()=>{let{data:t}=await X.from(`orders`).select(`id`).eq(`merchant_id`,e).order(`id`,{ascending:!1}).limit(1),n=t?.[0]?.id||0;if(n>ae){if(sessionStorage.setItem(`last_checked_order_id_`+e,String(n)),B){let e=new AudioContext,t=e.createOscillator(),n=e.createGain();t.connect(n),n.connect(e.destination),t.frequency.value=880,n.gain.value=.3,t.start(),setTimeout(()=>{t.stop(),e.close()},300),setTimeout(()=>{let e=new SpeechSynthesisUtterance(`새 주문이 접수되었습니다.`);e.lang=`ko-KR`,e.rate=.95,window.speechSynthesis.speak(e)},1e3)}setTimeout(()=>{location.reload()},5e3)}},5e3),m&&alert(`주문내역 조회 실패: `+m.message);let se=X.channel(`merchant-orders-`+e).on(`postgres_changes`,{event:`INSERT`,schema:`public`,table:`orders`,filter:`merchant_id=eq.`+e},()=>{if(!B){setTimeout(()=>{location.reload()},1e3);return}new Audio(`https://actions.google.com/sounds/v1/alarms/dingdong.ogg`).play();let e=new SpeechSynthesisUtterance(`새 주문이 접수되었습니다.`);e.lang=`ko-KR`,window.speechSynthesis.cancel(),window.speechSynthesis.speak(e),setTimeout(()=>{location.reload()},1e3)}).subscribe();Z.innerHTML=`
        <div class="pg-admin-page">
          <div class="merchant-pick-header">
         <h1>NXG PICK 주문관리</h1>

  <div class="merchant-user-box">
  <strong>${t}님</strong>

   <button id="merchant-logout">
    로그아웃
  </button>

  <button id="merchant-setting-button"
          class="merchant-setting-button">
    ⚙️
  </button>
</div>
  </div>
</div>
</div>

<div class="merchant-toolbar">
  ${re}

  ${I||L||te?`
    <span class="toolbar-divider"></span>
    <button class="order-filter-btn" data-status="전체">전체</button>
    <button class="order-filter-btn" data-status="준비중">준비중</button>
    <button class="order-filter-btn" data-status="완료">완료</button>
  `:``}

</div>

${ie}

<div class="merchant-sales-filter ${I||L||te?``:`hide-for-type`}">
  <div class="sales-filter-row sales-filter-button-row">
  <button id="sales-prev" class="quick-btn">이전</button>
  <button id="sales-today" class="quick-btn">오늘</button>
  <button id="sales-next" class="quick-btn">다음</button>
  <button id="sales-month" class="quick-btn">당월</button>
  <button id="excel-download" class="quick-btn">엑셀 다운로드</button>
</div>

  <div class="sales-filter-row sales-filter-date-row">
    <span class="date-wrap">
      <input id="sales-start-date" type="date" />
    </span>
    <span class="date-wave">~</span>
    <span class="date-wrap">
      <input id="sales-end-date" type="date" />
    </span>
    <button id="sales-search" class="quick-btn">조회</button>
  </div>
</div>


  <div class="merchant-sales-summary ${I||L||te?``:`hide-for-type`}">
  <div>
    <strong>주문수</strong>
    <span>${(p||[]).length}건</span>
  </div>

  <div>
    <strong>접수</strong>
    <span>${h.length}건</span>
  </div>

  <div>
    <strong>완료</strong>
    <span>${g.length}건</span>
  </div>

  <div>
    <strong>매출합계</strong>
    <span>${_.toLocaleString()}원</span>
  </div>

    <div>
    <strong>평균객단가</strong>
    <span>${v.toLocaleString()}원</span>
  </div>

  <div>
  <strong>정산예정금액</strong>

  <span class="merchant-settlement-value">
    ${A.toLocaleString()}원

    <span
      class="${j?`order-status-complete`:`order-status-received`}"
    >
      ${j?`완료`:`대기`}
    </span>
  </span>

  ${k.length>0?`
        <small
          style="
            display:block;
            margin-top:2px;
            white-space:nowrap;
            font-size:11px;
            line-height:1.1;
            color:#d93025;
            font-weight:700;
          "
        >
          정산대상 ${k.length.toLocaleString()}건 ·
          ${N} 결제건
        </small>
      `:``}
</div>
</div>

${L?`
  <div style="
    display:flex;
    justify-content:center;
    gap:10px;
    margin:16px 0;
  ">
    <button
      id="beauty-schedule-view-button"
      type="button"
      style="
        padding:10px 18px;
        border-radius:999px;
        border:1px solid #d1d5db;
        background:${c?`#ffffff`:`#111827`};
        color:${c?`#111827`:`#ffffff`};
        font-weight:700;
        cursor:pointer;
      "
    >
      예약 스케줄
    </button>

    <button
      id="beauty-sales-view-button"
      type="button"
      style="
        padding:10px 18px;
        border-radius:999px;
        border:1px solid #d1d5db;
        background:${c?`#111827`:`#ffffff`};
        color:${c?`#ffffff`:`#111827`};
        font-weight:700;
        cursor:pointer;
      "
    >
      전체 매출
    </button>
  </div>
`:``}

  <div class="order-bottom-toolbar ${(I||L||te)&&!R?``:`hide-for-type`}">

   <select id="merchant-page-size">
    <option value="10">10개씩 보기</option>
    <option value="20">20개씩 보기</option>
    <option value="30">30개씩 보기</option>
    <option value="50">50개씩 보기</option>
    <option value="100">100개씩 보기</option>
  </select>

  <div class="order-pagination">
    <button id="order-prev-page">이전</button>

    <span id="order-page-info">
      1 / 2
    </span>

    <button id="order-next-page">
      다음
    </button>
  </div>

</div>
   
          <div class="merchant-order-table-wrap ${R?`academy-hide-order-list`:``}">
            <table class="admin-table">
             <thead>
             ${L&&!c?`
    <tr>
      <th>No</th>
      <th>주문번호</th>
      <th>예약자</th>
      <th>연락처</th>
      <th>예약일</th>
      <th>예약시간</th>
      <th>서비스 / 직원</th>
      <th>결제금액</th>
      <th>상태</th>
      <th>처리</th>
    </tr>
  `:te?`
          <tr>
            <th>No</th>
            <th>주문번호</th>
            <th>객실번호</th>
            <th>결제일시</th>
            <th>주문내용</th>
            <th>결제금액</th>
            <th>주문상태</th>
            <th>처리</th>
          </tr>
        `:`
          <tr>
            <th>No</th>
            <th>주문번호</th>
            <th>결제일시</th>
            <th>주문내용</th>
            <th>결제금액</th>
            <th>주문상태</th>
            <th>고객호출</th>
          </tr>
        `}
</thead>
              <tbody id="merchantOrderBody"></tbody>
            </table>

            <div id="merchantOrderCardList" class="merchant-order-card-list"></div>
          </div>
        </div>

                <div id="merchant-setting-modal"
             class="merchant-setting-modal">

          <div class="merchant-setting-box">
            <h3>⚙️ 매장 설정</h3>

            <label style="
  display:flex;
  align-items:center;
  gap:8px;
  margin:10px 0 22px 0;
  font-weight:700;
  cursor:pointer;
">
  <input
    id="merchant-voice-enabled"
    type="checkbox"
    style="
      width:18px;
      height:18px;
      margin:0;
    "
  />
  음성 호출 사용
</label>

            <label>호출 기본 문구</label>

            <input
              id="merchant-call-message"
              class="merchant-call-message"
              placeholder="예) 주문이 준비되었습니다."
            />

            <label style="margin-top:20px;display:block;">
              주문 접수 멘트
            </label>

            <input
              id="merchant-order-message"
              class="merchant-call-message"
              placeholder="예) 새로운 주문이 접수되었습니다."
            />

            <div class="setting-button-row">
              <button id="preview-call-message">호출 미리듣기</button>
              <button id="preview-order-message">주문 미리듣기</button>
              <button id="save-call-message">저장</button>
            </div>
          </div>
        </div>

        <div id="cancel-modal" class="cancel-modal">
          <div class="cancel-box">
            <h3>결제 취소</h3>

            <p id="cancel-order-info">결제를 취소하시겠습니까?</p>

            <input
              id="cancel-password"
              type="password"
              placeholder="취소 비밀번호 입력"
            />

            <textarea
              id="cancel-reason"
              placeholder="취소 사유 입력"
            ></textarea>

            <div class="cancel-button-row">
              <button id="direct-cancel-button">직접 취소</button>
              <button id="request-cancel-button">본사 승인요청</button>
              <button id="close-cancel-modal">닫기</button>
            </div>
          </div>
        </div>
      
      `,document.querySelector(`#beauty-schedule-view-button`)?.addEventListener(`click`,()=>{let e=new URLSearchParams(window.location.search);e.delete(`view`);let t=e.toString();location.href=`/merchant-admin`+(t?`?`+t:``)}),document.querySelector(`#beauty-sales-view-button`)?.addEventListener(`click`,()=>{let e=new URLSearchParams(window.location.search);e.set(`view`,`sales`),location.href=`/merchant-admin?`+e.toString()}),document.querySelector(`#terminal-date-search-button`)?.addEventListener(`click`,()=>{let e=document.querySelector(`#terminal-start-date-input`),t=document.querySelector(`#terminal-end-date-input`);if(!e?.value||!t?.value){alert(`조회 날짜를 선택해주세요.`);return}if(e.value>t.value){alert(`시작일은 종료일보다 늦을 수 없습니다.`);return}let n=new URLSearchParams(window.location.search);n.delete(`terminal_date`),n.set(`terminal_start_date`,e.value),n.set(`terminal_end_date`,t.value),window.location.search=n.toString()});let ce=e=>{let t=document.querySelector(`#terminal-start-date-input`);if(!t)return;let n=t.value;if(!n)return;let r=new Date(n+`T00:00:00`);r.setDate(r.getDate()+e);let i=`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,`0`)}-${String(r.getDate()).padStart(2,`0`)}`,a=new URLSearchParams(window.location.search);a.delete(`terminal_date`),a.delete(`terminal_page`),a.set(`terminal_start_date`,i),a.set(`terminal_end_date`,i),window.location.search=a.toString()};document.querySelector(`#terminal-date-prev-button`)?.addEventListener(`click`,()=>{ce(-1)}),document.querySelector(`#terminal-date-next-button`)?.addEventListener(`click`,()=>{ce(1)}),document.querySelector(`#terminal-date-today-button`)?.addEventListener(`click`,()=>{let e=new Date,t=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`,n=new URLSearchParams(window.location.search);n.delete(`terminal_date`),n.set(`terminal_start_date`,t),n.set(`terminal_end_date`,t),window.location.search=n.toString()}),document.querySelector(`#terminal-date-month-button`)?.addEventListener(`click`,()=>{let e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,`0`),r=String(e.getDate()).padStart(2,`0`),i=`${t}-${n}-01`,a=`${t}-${n}-${r}`,o=new URLSearchParams(window.location.search);o.delete(`terminal_date`),o.delete(`terminal_page`),o.set(`terminal_start_date`,i),o.set(`terminal_end_date`,a),window.location.search=o.toString()}),document.querySelector(`#terminal-prev-page`)?.addEventListener(`click`,()=>{let e=new URLSearchParams(window.location.search),t=Math.max(1,Number(e.get(`terminal_page`)||1));t<=1||(e.set(`terminal_page`,String(t-1)),window.location.search=e.toString())}),document.querySelector(`#terminal-next-page`)?.addEventListener(`click`,()=>{let e=new URLSearchParams(window.location.search),t=Math.max(1,Number(e.get(`terminal_page`)||1));e.set(`terminal_page`,String(t+1)),window.location.search=e.toString()}),document.querySelector(`#terminal-page-size`)?.addEventListener(`change`,e=>{let t=e.currentTarget,n=new URLSearchParams(window.location.search);n.set(`terminal_page_size`,t.value),n.set(`terminal_page`,`1`),window.location.search=n.toString()});let{data:le}=await X.from(`merchants`).select(`
    voice_enabled,
    call_message,
    order_message,
    merchant_name,    
    owner_name,
    corporate_number,
    business_number,
    phone,
    address,
address_detail,
toss_mid,
korpay_mid
  `).eq(`id`,e).single();if(le){let e=document.querySelector(`#merchant-voice-enabled`);e&&(e.checked=le.voice_enabled===!0);let t=document.querySelector(`#merchant-call-message`),n=document.querySelector(`#merchant-order-message`);t&&(t.value=le.call_message||``),n&&(n.value=le.order_message||``)}function ue(e){let t=[``,`일`,`이`,`삼`,`사`,`오`,`육`,`칠`,`팔`,`구`];if(e===0)return`영`;let n=Math.floor(e/100),r=Math.floor(e%100/10),i=e%10,a=``;return n>0&&(a+=n===1?`백`:t[n]+`백`),r>0&&(a+=r===1?`십`:t[r]+`십`),i>0&&(a+=t[i]),a}let de=document.querySelector(`#merchantOrderBody`);de.innerHTML=``;let fe=document.querySelector(`#merchantOrderCardList`);fe&&(fe.innerHTML=``),(p||[]).forEach((e,t)=>{let n=document.createElement(`tr`),r=e.order_no?.split(`-`)[1]||e.order_no||t+1,i=Array.isArray(e.items)?e.items.map(e=>e.name+` x `+e.quantity).join(`, `):`-`,a=e.room_number||`-`,o=String(e.customer_request||``).trim().replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`).replace(/\n/g,`<br>`),s=(P||[]).find(t=>{let n=String(t.order_id||``).replace(/[^a-zA-Z0-9]/g,``),r=String(e.pg_order_id||``).replace(/[^a-zA-Z0-9]/g,``),i=n&&r&&n===r,a=e.payment_key&&t.payment_key&&String(e.payment_key)===String(t.payment_key),o=Number(t.amount||0)===Number(e.total_amount||0),s=Math.abs(new Date(t.created_at).getTime()-new Date(e.created_at).getTime());return i||a||o&&s<1e3*60*5}),l=s?.approval_number||`-`,u=s?.payment_key||`-`,d=s?.card_number||`결제사 제공값`,f=s?.pg_company||`-`,p=s?.pg_mid||(String(s?.pg_company||``).includes(`토스`)?le?.toss_mid:le?.korpay_mid)||`-`;if(te?n.innerHTML=`<td>`+(t+1)+`</td><td><button class="merchant-receipt-link" data-id="`+e.id+`" data-order="`+r+`" data-amount="`+(e.total_amount||0)+`" data-date="`+(e.created_at||``)+`" data-status="`+(e.order_status||``)+`" data-cancel-status="`+(e.cancel_status||``)+`" data-cancel-date="`+(e.cancel_requested_at||``)+`" data-items="`+i+`" data-payment-key="`+u+`" data-approval-number="`+l+`" data-card-number="`+d+`" data-card-company="신용카드" data-pg-company="`+f+`" data-pg-mid="`+p+`" >`+r+`번</button></td><td><strong class="hotel-order-room-number">ROOM `+a+`</strong></td><td><div>`+new Date(e.created_at).toLocaleString(`ko-KR`)+`</div><div class="approval-number cancel-approval-link" data-id="`+e.id+`" data-created-at="`+e.created_at+`" data-amount="`+e.total_amount+`">승인번호 `+l+`</div>`+(e.cancel_status===`취소완료`?`<div class="cancel-info">취소시각: `+(e.cancel_requested_at?new Date(e.cancel_requested_at).toLocaleString(`ko-KR`):`-`)+`<br />취소사유: `+(e.cancel_reason||`-`)+`</div>`:``)+`</td><td><div>`+i+`</div>`+(String(e.customer_request||``).trim()?`<div class="hotel-order-request"><strong>요청사항</strong><div>`+String(e.customer_request||``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`).replace(/\n/g,`<br>`)+`</div></div>`:``)+`</td><td>`+Number(e.total_amount||0).toLocaleString()+`원</td><td>`+(e.cancel_status===`취소요청`?`<span class="order-status-cancel-request">취소요청</span>`:e.order_status===`취소완료`?`<span class="order-status-cancel">취소완료</span>`:e.order_status===`완료`?`<span class="order-status-complete">완료</span>`:`<span class="order-status-received">접수</span>`)+`</td><td>`+(e.cancel_status===`취소완료`||e.order_status===`취소완료`?`취소완료`:e.order_status===`완료`?`완료`:`<button class="order-complete-button" data-id="`+e.id+`">완료처리</button>`)+`</td>`:n.innerHTML=`<td>`+(t+1)+`</td><td><button class="merchant-receipt-link" data-id="`+e.id+`" data-order="`+r+`" data-amount="`+(e.total_amount||0)+`" data-date="`+(e.created_at||``)+`" data-status="`+(e.order_status||``)+`" data-cancel-status="`+(e.cancel_status||``)+`" data-cancel-date="`+(e.cancel_requested_at||``)+`" data-items="`+i+`" data-payment-key="`+u+`" data-approval-number="`+l+`" data-card-number="`+d+`" data-card-company="신용카드" data-pg-company="`+f+`" data-pg-mid="`+p+`" >`+r+`번</button></td><td><div>`+new Date(e.created_at).toLocaleString(`ko-KR`)+`</div><div class="approval-number cancel-approval-link" data-id="`+e.id+`" data-created-at="`+e.created_at+`" data-amount="`+e.total_amount+`">승인번호 `+l+`</div>`+(e.cancel_status===`취소완료`?`<div class="cancel-info">취소시각: `+(e.cancel_requested_at?new Date(e.cancel_requested_at).toLocaleString(`ko-KR`):`-`)+`<br />취소사유: `+(e.cancel_reason||`-`)+`</div>`:``)+`</td><td><div>`+i+`</div>`+(o?`<div class="hotel-order-request"><strong>요청사항</strong><div>`+o+`</div></div>`:``)+`</td><td>`+Number(e.total_amount||0).toLocaleString()+`원</td><td>`+(e.cancel_status===`취소요청`?`<span class="order-status-cancel-request">취소요청</span>`:e.order_status===`취소완료`?`<span class="order-status-cancel">취소완료</span>`:e.order_status===`완료`?`<span class="order-status-complete">완료</span>`:`<span class="order-status-received">접수</span>`)+`</td><td><button class="customer-call-button" data-id="`+e.id+`" data-number="`+r+`">고객호출</button>`,n.setAttribute(`data-status`,e.order_status||`접수`),(sessionStorage.getItem(`login_merchant_type`)||``)===`뷰티`&&!c){let i=Array.isArray(e.items)?e.items.map(t=>(t.name||`-`)+` / `+(t.beauty_staff_name||(t.beauty_staff_id||e.beauty_staff_id?`직원ID `+(t.beauty_staff_id||e.beauty_staff_id||`-`):`-`))+` x `+Number(t.quantity||1)).join(`<br>`):`-`;n.innerHTML=`<td>`+(t+1)+`</td><td><button class="merchant-receipt-link" data-id="`+e.id+`" data-order="`+r+`" data-amount="`+(e.total_amount||0)+`" data-date="`+(e.created_at||``)+`" data-items="`+i+`">`+r+`번</button></td><td>`+(e.customer_name||`-`)+`</td><td>`+(e.customer_phone||`-`)+`</td><td>`+(Array.isArray(e.items)?Array.from(new Set(e.items.map(t=>t.reservation_date||e.reservation_date||`-`))).join(`<br>`):e.reservation_date||`-`)+`</td><td>`+(Array.isArray(e.items)?e.items.map(t=>t.reservation_time||e.reservation_time||`-`).join(`<br>`):e.reservation_time||`-`)+`</td><td style="line-height:1.8;">`+i+`</td><td>`+Number(e.total_amount||0).toLocaleString()+`원</td><td>`+(e.cancel_status===`취소요청`?`<span class="order-status-cancel-request">취소요청</span>`:e.order_status===`취소완료`?`<span class="order-status-cancel">취소완료</span>`:e.order_status===`완료`?`<span class="order-status-complete">완료</span>`:`<span class="order-status-received">접수</span>`)+`</td><td>`+(e.order_status===`완료`?`완료`:`<button class="order-complete-button" data-id="`+e.id+`">완료처리</button>`)+`</td>`}de.appendChild(n);let m=document.querySelector(`#merchantOrderCardList`);if(m){let t=document.createElement(`div`);t.className=`merchant-order-card`,t.innerHTML=`<div class="merchant-order-card-top"><button class="merchant-receipt-link merchant-card-receipt-link" data-order="`+r+`" data-amount="`+(e.total_amount||0)+`" data-date="`+(e.created_at||``)+`" data-items="`+i+`">`+(e.customer_name||e.customer_phone?(e.customer_name||`-`)+`<br>`+(e.customer_phone||`-`):r+`번`)+`</button><span>`+Number(e.total_amount||0).toLocaleString()+`원</span></div><div class="merchant-order-card-date">`+new Date(e.created_at).toLocaleString(`ko-KR`)+`</div>`+(te?`<div class="hotel-order-card-room">ROOM `+a+`</div>`:``)+`<div class="approval-number cancel-approval-link" data-id="`+e.id+`" data-created-at="`+e.created_at+`" data-amount="`+e.total_amount+`">승인번호 : `+l+`</div><div class="merchant-order-card-items">`+i+`</div>`+(te&&o?`<div class="hotel-mobile-order-request"><strong>요청사항</strong><div>`+o+`</div></div>`:``)+`<div class="merchant-order-card-status">`+(e.cancel_status===`취소요청`?`<span class="order-status-cancel-request">취소요청</span>`:e.order_status===`취소완료`?`<span class="order-status-cancel">취소완료</span>`:e.order_status===`완료`?`<span class="order-status-complete">완료</span>`:`<span class="order-status-received">접수</span>`)+`</div>`+(te?e.order_status===`완료`?`<div class="hotel-card-complete-text">완료</div>`:`<button class="hotel-card-complete-button" data-id="`+e.id+`">완료처리</button>`:`<button class="customer-call-button merchant-card-call-button" data-id="`+e.id+`" data-number="`+r+`">고객호출</button>`),t.setAttribute(`data-status`,e.order_status||`접수`),m.appendChild(t);let n=t.querySelector(`.customer-call-button`),s=t.querySelector(`.hotel-card-complete-button`);s?.addEventListener(`click`,async()=>{let{error:n}=await X.from(`orders`).update({order_status:`완료`}).eq(`id`,Number(e.id));if(n){alert(`완료 처리 실패: `+n.message);return}let r=t.querySelector(`.merchant-order-card-status`);r&&(r.innerHTML=`<span class="order-status-complete">완료</span>`),t.setAttribute(`data-status`,`완료`),s.replaceWith(document.createTextNode(`완료`))}),document.querySelectorAll(`.merchant-receipt-link`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e,n=t.getAttribute(`data-order`)||`-`,r=Number(t.getAttribute(`data-amount`)||0),i=t.getAttribute(`data-date`)?new Date(t.getAttribute(`data-date`)).toLocaleString(`ko-KR`):`-`,a=t.getAttribute(`data-items`)||`-`,o=t.getAttribute(`data-payment-key`)||`-`,s=t.getAttribute(`data-approval-number`)||`-`,c=t.getAttribute(`data-card-number`)||`결제사 제공값`,l=t.getAttribute(`data-card-company`)||`신용카드`,u=t.getAttribute(`data-pg-company`)||`-`,d=t.getAttribute(`data-pg-mid`)||`-`,f=t.getAttribute(`data-status`)||``,p=t.getAttribute(`data-cancel-status`)||``,m=t.getAttribute(`data-cancel-date`)?new Date(t.getAttribute(`data-cancel-date`)).toLocaleString(`ko-KR`):`-`,h=f===`취소완료`||p===`취소완료`,g=h?`취소`:`승인`,_=h?`취소완료`:`승인성공`,v=h?`-`+r.toLocaleString()+`원`:r.toLocaleString()+`원`,y=t.getAttribute(`data-customer`)||`현장고객`,b=`
      <div id="admin-receipt-modal" class="receipt-modal">
        <div class="receipt-box receipt-approve">
    
          <div class="receipt-header ${h?`receipt-cancel-mode`:`receipt-approve-mode`}">
            <h2>NXG PICK</h2>
            <h3 class="${h?`receipt-cancel-title`:`receipt-approve-title`}">
              신용카드 매출전표 <span>(${g})</span>
            </h3>
          </div>
    
          <section>
            <h4>결제정보</h4>
            <table>
              <tr>
                <th>카드번호</th>
                <td>${c}</td>
                <th>카드종류</th>
                <td>${l}</td>
              </tr>
              <tr>
                <th>거래종류</th>
                <td class="${h?`receipt-cancel-text`:`receipt-approve-text`}">
                  ${_}
                </td>
                <th>할부개월</th>
                <td>일시불</td>
              </tr>
              <tr>
                <th>거래일시</th>
                <td colspan="3">${i}</td>
              </tr>

              ${h?`
                    <tr>
                      <th>취소시각</th>
                      <td colspan="3">${m}</td>
                    </tr>
                  `:``}
            </table>
          </section>
    
          <div class="receipt-grid">
            <section>
              <h4>구매정보</h4>
              <table>
                <tr><th>주문자명</th><td>${y}</td></tr>
<tr><th>승인번호</th><td>${s}</td></tr>
<tr><th>거래번호</th><td>${o}</td></tr>
<tr><th>주문번호</th><td>${n}</td></tr>
<tr><th>상품명 / 구매자</th><td>${a}</td></tr>
              </table>
            </section>
    
            <section>
              <h4>결제금액정보</h4>
              <table>
                <tr><th>과세금액</th><td>${Math.floor(r/1.1).toLocaleString()}원</td></tr>
                <tr><th>비과세금액</th><td>0원</td></tr>
                <tr><th>부가세</th><td>${(r-Math.floor(r/1.1)).toLocaleString()}원</td></tr>
                <tr><th>주문금액</th><td>${r.toLocaleString()}원</td></tr>
                <tr><th>할인금액</th><td>0원</td></tr>
                <tr class="receipt-total">
                  <th>총 결제금액</th>
                  <td>${v}</td>
                </tr>
              </table>
            </section>
          </div>
    
          <section>
            <h4>상점정보</h4>
            <table>
              <tr>
  <th>상점명</th>
  <td>${le?.merchant_name||`-`}</td>
  <th>대표자명</th>
  <td>${le?.owner_name||`-`}</td>
</tr>

<tr>
  <th>URL주소</th>
  <td>-</td>
  <th>사업자번호</th>
  <td>${le?.business_number||le?.corporate_number||`-`}</td>
</tr>

<tr>
  <th>이용문의</th>
  <td colspan="3">${le?.phone||`-`}</td>
</tr>

<tr>
  <th>주소</th>
  <td colspan="3">
    ${(le?.address||``)+` `+(le?.address_detail||``)}
  </td>
</tr>
            </table>
          </section>
    
          <section>
            <h4>결제서비스업체(PG)정보</h4>
            <table>
              <tr><th>카드사 가맹점명</th><td>${u}</td><th>사업자번호</th><td>-</td></tr>
              <tr><th>대표자명</th><td>-</td><th>가맹점번호</th><td>${d}</td></tr>
              <tr><th>주소</th><td colspan="3">-</td></tr>
            </table>
          </section>
    
          <div class="receipt-actions">
            <button onclick="window.print()">인쇄하기</button>
            <button id="receipt-share-button">문자/카카오톡 발송</button>
            <button id="admin-receipt-close-btn">닫기</button>
          </div>
    
        </div>
      </div>
    `;document.querySelector(`#admin-receipt-modal`)?.remove(),document.body.insertAdjacentHTML(`beforeend`,b),document.querySelector(`#admin-receipt-modal`).style.display=`flex`,document.querySelector(`#receipt-share-button`)?.addEventListener(`click`,async()=>{let e=`[NXG PICK 영수증]
상점명: `+(le?.merchant_name||`-`)+`
주문번호: `+n+`
승인번호: `+s+`
결제일시: `+i+`
상품명: `+a.replace(/<br\/>/g,`, `)+`
결제금액: `+r.toLocaleString()+`원`;if(navigator.share){await navigator.share({title:`NXG PICK 영수증`,text:e});return}await navigator.clipboard.writeText(e),alert(`영수증 내용이 복사되었습니다.
문자나 카카오톡에 붙여넣기 해주세요.`)}),document.querySelector(`#admin-receipt-close-btn`)?.addEventListener(`click`,()=>{document.querySelector(`#admin-receipt-modal`)?.remove()})})}),n?.addEventListener(`click`,async()=>{if(!B){alert(`음성 호출 사용이 꺼져 있습니다.
매장 설정에서 음성 호출 사용을 체크해주세요.`);return}let i=document.querySelector(`#merchant-call-message`)?.value||`주문이 준비되었습니다.`,a=Number(r)+`번 고객님 `+i;window.speechSynthesis.cancel(),speechSynthesis.speak(new SpeechSynthesisUtterance(a)),n.textContent=`호출완료`,n.style.background=`#6b7280`;let o=t.querySelector(`.merchant-order-card-status`);o&&(o.innerHTML=`<span class="order-status-complete">완료</span>`);let{error:s}=await X.from(`orders`).update({order_status:`완료`}).eq(`id`,Number(e.id));s&&alert(`주문상태 변경 실패: `+s.message)})}}),document.querySelectorAll(`.admin-table .customer-call-button`).forEach(e=>{e.addEventListener(`click`,async()=>{if(!B){alert(`음성 호출 사용이 꺼져 있습니다.
매장 설정에서 음성 호출 사용을 체크해주세요.`);return}let t=e.getAttribute(`data-number`)||`0`,n=e.getAttribute(`data-id`),r=document.querySelector(`#merchant-call-message`)?.value||`주문이 준비되었습니다.`,i=ue(Number(t))+`번 고객님 `+r;window.speechSynthesis.cancel(),speechSynthesis.speak(new SpeechSynthesisUtterance(i)),e.textContent=`호출완료`,e.style.background=`#6b7280`;let a=e.closest(`tr`);if(a){let e=a.children[5];e&&(e.innerHTML=`<span class="order-status-complete">완료</span>`)}if(n){let{error:e}=await X.from(`orders`).update({order_status:`완료`}).eq(`id`,Number(n));e&&alert(`주문상태 변경 실패: `+e.message)}})}),te&&[`merchant-order-tab`,`merchant-product-tab`,`merchant-hotel-room-tab`,`merchant-hotel-preview-tab`,`merchant-card-tab`].forEach(e=>{let t=document.getElementById(e);t&&(t.style.setProperty(`background`,`#b7924f`,`important`),t.style.setProperty(`background-color`,`#b7924f`,`important`),t.style.setProperty(`border-color`,`#b7924f`,`important`),t.style.setProperty(`color`,`#ffffff`,`important`))}),document.querySelector(`#merchant-product-tab`)?.addEventListener(`click`,()=>{location.href=`/merchant-product`}),document.querySelector(`#merchant-hours-tab`)?.addEventListener(`click`,()=>{location.href=`/merchant-beauty-hours`}),document.querySelector(`#merchant-hotel-room-tab`)?.addEventListener(`click`,()=>{location.href=`/merchant-hotel-rooms`}),document.querySelector(`#merchant-hotel-preview-tab`)?.addEventListener(`click`,()=>{let t=window.location.origin+`/hotel?merchant_id=`+e+`&room=101`;window.open(t,`_blank`)}),document.querySelector(`#merchant-staff-tab`)?.addEventListener(`click`,()=>{location.href=`/merchant-staff`}),document.querySelector(`#merchant-qr-tab`)?.addEventListener(`click`,()=>{location.href=`/merchant-qr`}),document.querySelector(`#merchant-card-tab`)?.addEventListener(`click`,()=>{location.href=`/merchant-card`}),document.querySelector(`#merchant-member-tab`)?.addEventListener(`click`,()=>{location.href=`/merchant-members`}),document.querySelector(`#merchant-batch-tab`)?.addEventListener(`click`,()=>{location.href=`/merchant-batch`}),document.querySelector(`#merchant-billing-tab`)?.addEventListener(`click`,()=>{location.href=`/merchant-billings`}),document.querySelector(`#merchant-payment-list-tab`)?.addEventListener(`click`,()=>{location.href=`/merchant-academy-payments`}),document.querySelector(`#billing-back-btn`)?.addEventListener(`click`,()=>{location.href=`/merchant-admin`});let pe=`전체`,me=Number(sessionStorage.getItem(`merchant_page_size`)||`10`),he=1;function ge(){let e=Array.from(document.querySelectorAll(`#merchantOrderBody tr`)),t=Array.from(document.querySelectorAll(`.merchant-order-card`)),n=e=>pe===`전체`?!0:pe===`준비중`?e!==`완료`:e===`완료`,r=e.filter(e=>n(e.getAttribute(`data-status`)||`접수`)),i=t.filter(e=>n(e.getAttribute(`data-status`)||`접수`)),a=window.matchMedia(`(max-width: 768px)`).matches?i.length:r.length,o=Math.max(1,Math.ceil(a/me));he>o&&(he=o);let s=(he-1)*me,c=s+me;e.forEach(e=>{e.style.display=`none`}),r.slice(s,c).forEach(e=>{e.style.display=``}),t.forEach(e=>{e.style.display=`none`}),i.slice(s,c).forEach(e=>{e.style.display=``});let l=document.querySelector(`#order-page-info`);l&&(l.textContent=he+` / `+o)}document.querySelectorAll(`.order-filter-btn`).forEach(e=>{e.addEventListener(`click`,()=>{pe=e.getAttribute(`data-status`)||`전체`,he=1,ge()})});let _e=document.querySelector(`#merchant-page-size`);_e&&(_e.value=String(me),_e.addEventListener(`change`,e=>{me=Number(e.target.value),sessionStorage.setItem(`merchant_page_size`,String(me)),he=1,ge()}));let ve=document.querySelector(`#order-prev-page`);ve&&(ve.onclick=()=>{console.log(`이전 클릭됨`),!(he<=1)&&(--he,ge())});let ye=document.querySelector(`#order-next-page`);ye&&(ye.onclick=()=>{console.log(`다음 클릭됨`);let e=Array.from(document.querySelectorAll(`#merchantOrderBody tr`)),t=Array.from(document.querySelectorAll(`.merchant-order-card`)),n=window.matchMedia(`(max-width: 768px)`).matches?t.length:e.length,r=Math.max(1,Math.ceil(n/me));he>=r||(he+=1,ge())}),ge(),R&&Qb(),document.querySelector(`#merchant-setting-button`)?.addEventListener(`click`,()=>{let e=document.querySelector(`#merchant-setting-modal`);e&&(e.style.display=`flex`)}),document.querySelector(`#merchant-setting-modal`)?.addEventListener(`click`,e=>{if(e.target===e.currentTarget){let e=document.querySelector(`#merchant-setting-modal`);e&&(e.style.display=`none`)}});function be(e){let t=[``,`일`,`이`,`삼`,`사`,`오`,`육`,`칠`,`팔`,`구`];if(e===0)return`영`;let n=Math.floor(e/100),r=Math.floor(e%100/10),i=e%10,a=``;return n>0&&(a+=n===1?`백`:t[n]+`백`),r>0&&(a+=r===1?`십`:t[r]+`십`),i>0&&(a+=t[i]),a}document.querySelector(`#preview-call-message`)?.addEventListener(`click`,()=>{let e=document.querySelector(`#merchant-call-message`)?.value||`주문이 준비되었습니다.`,t=be(18);speechSynthesis.speak(new SpeechSynthesisUtterance(t+`번 고객님 `+e))}),document.querySelector(`#preview-order-message`)?.addEventListener(`click`,()=>{let e=document.querySelector(`#merchant-order-message`)?.value||`새로운 주문이 접수되었습니다.`;speechSynthesis.speak(new SpeechSynthesisUtterance(e))}),document.querySelector(`#save-call-message`)?.addEventListener(`click`,async()=>{let t=document.querySelector(`#merchant-voice-enabled`)?.checked===!0,n=document.querySelector(`#merchant-call-message`)?.value||``,r=document.querySelector(`#merchant-order-message`)?.value||``,{error:i}=await X.from(`merchants`).update({voice_enabled:t,call_message:n,order_message:r}).eq(`id`,e);if(i){alert(`설정 저장 실패: `+i.message);return}B=t,alert(`설정이 저장되었습니다.`)});let xe=e=>{let t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,`0`),r=String(e.getDate()).padStart(2,`0`);return t+`-`+n+`-`+r},Se=(e,t)=>{let n=new URLSearchParams(window.location.search);n.set(`start`,e),n.set(`end`,t),location.href=`/merchant-admin?`+n.toString()},Ce=e=>{let t=document.querySelector(`#sales-start-date`)?.value||i||xe(new Date),n=new Date(t+`T00:00:00`);n.setDate(n.getDate()+e);let r=xe(n);Se(r,r)};document.querySelector(`#sales-prev`)?.addEventListener(`click`,()=>{Ce(-1)}),document.querySelector(`#sales-today`)?.addEventListener(`click`,()=>{let e=xe(new Date);Se(e,e)}),document.querySelector(`#sales-next`)?.addEventListener(`click`,()=>{Ce(1)}),document.querySelector(`#sales-month`)?.addEventListener(`click`,()=>{let e=new Date;Se(xe(new Date(e.getFullYear(),e.getMonth(),1)),xe(e))}),document.querySelector(`#sales-search`)?.addEventListener(`click`,()=>{let e=document.getElementById(`sales-start-date`)?.value,t=document.getElementById(`sales-end-date`)?.value;if(!e||!t){alert(`시작일과 종료일을 선택해주세요.`);return}Se(e,t)}),document.querySelectorAll(`.cancel-approval-link`).forEach(e=>{e.addEventListener(`click`,()=>{let t=document.querySelector(`#cancel-modal`),n=e.getAttribute(`data-amount`)||`0`,r=document.querySelector(`#cancel-order-info`);r&&(r.textContent=`결제금액 `+Number(n).toLocaleString()+`원을 취소하시겠습니까?`),t&&(t.setAttribute(`data-order-id`,e.getAttribute(`data-id`)||``),t.setAttribute(`data-created-at`,e.getAttribute(`data-created-at`)||``),t.style.display=`flex`)})}),document.querySelector(`#cancel-modal`),document.querySelector(`#close-cancel-modal`)?.addEventListener(`click`,()=>{let e=document.querySelector(`#cancel-modal`);e&&(e.style.display=`none`)}),document.querySelector(`#direct-cancel-button`)?.addEventListener(`click`,async()=>{let e=document.querySelector(`#cancel-password`),t=document.querySelector(`#cancel-reason`),n=(e?.value||``).trim(),r=(t?.value||``).trim(),i=document.querySelector(`#cancel-modal`),a=i?.getAttribute(`data-created-at`)||``,o=new Date().toISOString().slice(0,10);if(a.slice(0,10)!==o){alert(`당일 결제건만 직접 취소할 수 있습니다.
본사 승인요청을 이용해주세요.`);return}if(n!==`1234`){alert(`취소 비밀번호가 일치하지 않습니다.`);return}if(!r){alert(`취소 사유를 입력해주세요.`);return}let s=Number(i?.getAttribute(`data-order-id`)||0);if(!s){alert(`취소할 주문을 찾을 수 없습니다.`);return}let c=document.querySelector(`#direct-cancel-button`);c&&(c.disabled=!0,c.textContent=`취소 처리 중...`);try{let{data:e,error:t}=await X.from(`orders`).select(`id, merchant_id, total_amount, order_no`).eq(`id`,s).single();if(t||!e){alert(`주문정보를 불러오지 못했습니다.`);return}let{data:n,error:i}=await X.from(`payments`).select(`id, pg_company, payment_key, status, amount, created_at`).eq(`merchant_id`,Number(e.merchant_id)).eq(`amount`,Number(e.total_amount)).eq(`status`,`paid`).order(`created_at`,{ascending:!1}).limit(1);if(i){alert(`결제정보 조회에 실패했습니다.
`+i.message);return}let a=Array.isArray(n)&&n.length>0?n[0]:null;if(!a){alert(`연결된 승인 결제를 찾지 못했습니다.
가맹점ID: `+e.merchant_id+`
금액: `+Number(e.total_amount).toLocaleString()+`원`);return}let o,c;if(a.pg_company===`코페이`){if(o=await fetch(`/api/korpay-cancel`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({paymentId:Number(a.id),cancelName:sessionStorage.getItem(`login_merchant_name`)||`가맹점`,cancelMessage:r})}),c=await o.json(),!o.ok||!c.success){alert(`코페이 실제 취소에 실패했습니다.

`+(c.message||`알 수 없는 오류`));return}}else if(a.pg_company===`토스페이먼츠`){if(!a.payment_key){alert(`토스 paymentKey가 없습니다.`);return}if(o=await fetch(`/api/toss-cancel`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({paymentKey:a.payment_key,cancelReason:r})}),c=await o.json(),!o.ok){alert(`토스 실제 취소에 실패했습니다.

`+(c.message||`알 수 없는 오류`));return}let{error:e}=await X.from(`payments`).update({status:`cancel`,canceled_at:new Date().toISOString(),payout_status:`출금제외`,settlement_status:`취소`}).eq(`id`,Number(a.id));if(e){alert(`토스 결제는 취소됐지만 결제내역 수정에 실패했습니다.
`+e.message);return}}else{alert(`직접 취소를 지원하지 않는 PG사입니다.
결제 PG사: `+(a.pg_company||`-`));return}let l=a.pg_company===`토스페이먼츠`?`토스페이먼츠`:a.pg_company===`코페이`?`코페이`:a.pg_company||`결제`,{error:u}=await X.from(`orders`).update({order_status:`취소완료`,payment_status:`취소완료`,cancel_status:`취소완료`,cancel_reason:r,cancel_requested_at:new Date().toISOString()}).eq(`id`,s);if(u){alert(l+` 결제는 취소됐지만 주문 상태 수정에 실패했습니다.
`+u.message);return}alert(l+` 결제가 실제 취소되었습니다.

결제관리: 취소
출금관리: 출금제외`),location.reload(),location.reload()}catch(e){console.error(e),alert(`취소 처리 중 오류가 발생했습니다.
`+(e instanceof Error?e.message:`알 수 없는 오류`))}finally{c&&(c.disabled=!1,c.textContent=`직접 취소`)}}),document.querySelector(`#request-cancel-button`)?.addEventListener(`click`,async()=>{let e=document.querySelector(`#cancel-modal`),t=(document.querySelector(`#cancel-reason`)?.value||``).trim(),n=Number(e?.getAttribute(`data-order-id`)||0);if(!n){alert(`취소 요청할 주문을 찾을 수 없습니다.`);return}if(!t){alert(`취소 사유를 입력해주세요.`);return}let r=document.querySelector(`#request-cancel-button`);r&&(r.disabled=!0,r.textContent=`요청 처리 중...`);try{let{data:e,error:r}=await X.from(`orders`).select(`id, order_no, merchant_id, total_amount, created_at, payment_key`).eq(`id`,n).single();if(r||!e){alert(`주문정보를 불러오지 못했습니다.`);return}if(!e.payment_key){alert(`이 주문에 결제 거래번호가 연결되어 있지 않습니다.
승인번호 연결 작업이 필요합니다.`);return}let{data:i,error:a}=await X.from(`payments`).select(`id, amount, settlement_amount, manager_admin_id, manager_admin_name, status, created_at, payment_key`).eq(`payment_key`,e.payment_key).maybeSingle();if(a){alert(`결제정보 조회에 실패했습니다.
`+a.message);return}if(!i){alert(`연결된 승인 결제를 찾지 못했습니다.`);return}let{data:o}=await X.from(`cancel_requests`).select(`id`).eq(`payment_id`,Number(i.id)).eq(`status`,`요청중`).maybeSingle();if(o){alert(`이미 본사 승인요청이 접수된 거래입니다.`);return}let{error:s}=await X.from(`cancel_requests`).insert({payment_id:Number(i.id),merchant_id:Number(e.merchant_id),manager_admin_id:i.manager_admin_id||null,manager_admin_name:i.manager_admin_name||null,reason:t,status:`요청중`});if(s){alert(`본사 승인요청 저장에 실패했습니다.
`+s.message);return}let{error:c}=await X.from(`payments`).update({payout_hold:!0,payout_hold_reason:`익일 취소 본사 승인요청: `+t,payout_hold_at:new Date().toISOString(),payout_status:`지급정지`}).eq(`id`,Number(i.id));if(c){alert(`취소요청은 접수됐지만 지급정지 처리에 실패했습니다.
`+c.message);return}let{error:l}=await X.from(`orders`).update({cancel_status:`취소요청`,cancel_reason:t,cancel_requested_at:new Date().toISOString()}).eq(`id`,n);if(l){alert(`본사 승인요청은 접수됐지만 주문상태 표시 변경에 실패했습니다.
`+l.message);return}let u=Number(i.settlement_amount||0);alert(`본사 승인요청이 접수되었습니다.

지급상태: 지급정지
반환 예정금액: `+(u+500).toLocaleString()+`원

본사 안내 후 지정 계좌로 입금해주세요.`),location.reload()}catch(e){console.error(e),alert(`본사 승인요청 중 오류가 발생했습니다.
`+(e instanceof Error?e.message:`알 수 없는 오류`))}finally{r&&(r.disabled=!1,r.textContent=`본사 승인요청`)}}),document.querySelector(`#merchant-logout`)?.addEventListener(`click`,()=>{se.unsubscribe(),sessionStorage.removeItem(`login_merchant_id`),sessionStorage.removeItem(`login_merchant_name`),sessionStorage.removeItem(`login_merchant_code`),location.href=`/merchant-login`})}else if(Q===`/merchant-hotel-rooms`){let e=Number(sessionStorage.getItem(`login_merchant_id`)),t=sessionStorage.getItem(`login_merchant_name`)||``,n=sessionStorage.getItem(`login_merchant_type`)||``;e||(alert(`로그인이 필요합니다.`),location.href=`/merchant-login`),n!==`호텔`&&(alert(`호텔 가맹점에서만 사용할 수 있습니다.`),location.href=`/merchant-admin`);let{data:r,error:i}=await X.from(`hotel_rooms`).select(`*`).eq(`merchant_id`,e).order(`sort_order`,{ascending:!0}).order(`room_number`,{ascending:!0});i&&alert(`객실 목록 조회 실패: `+i.message);let a=r||[],o=a.filter(e=>e.status===`사용중`).length,s=a.filter(e=>e.status===`사용중지`).length;Z.innerHTML=`
          <div class="hotel-room-admin-page">
      
            <div class="merchant-pick-header">
      
              <div>
                <h1>호텔 객실관리</h1>
                <p class="hotel-room-admin-desc">
                  객실을 등록하고 객실별 고객 결제창을 관리합니다.
                </p>
              </div>
      
              <div class="merchant-user-box">
                <strong>
                  ${t}님
                </strong>
      
                <button id="hotel-room-logout">
                  로그아웃
                </button>
              </div>
      
            </div>
      
      
            <div class="merchant-toolbar hotel-room-toolbar">
      
              <button id="hotel-room-go-order">
                주문/결제내역
              </button>
      
              <button id="hotel-room-go-product">
                상품관리
              </button>
      
              <button
                id="hotel-room-go-room"
                class="active"
              >
                객실관리
              </button>
      
              <button id="hotel-room-go-card">
                카드결제
              </button>
      
            </div>
      
      
            <div class="hotel-room-summary">
      
              <div>
                <span>전체 객실</span>
                <strong>
                  ${a.length}개
                </strong>
              </div>
      
              <div>
                <span>사용중</span>
                <strong>
                  ${o}개
                </strong>
              </div>
      
              <div>
                <span>사용중지</span>
                <strong>
                  ${s}개
                </strong>
              </div>
      
            </div>
      
      
            <div class="hotel-room-content">
      
              <section class="hotel-room-create-card">
      
                <h2>
                  객실 등록
                </h2>
      
                <p>
                  호텔에서 사용할 객실번호를 입력해주세요.
                </p>
      
                <label>
                  객실번호
                </label>
      
                <input
                  id="hotel-room-number"
                  type="text"
                  placeholder="예: 101, 1203, A201"
                  autocomplete="off"
                />
      
                <button
                  id="hotel-room-create-button"
                >
                  객실 등록
                </button>
      
              </section>
      
      
              <section class="hotel-room-list-card">
      
                <div class="hotel-room-list-title">
      
                  <div>
                    <h2>
                      등록된 객실
                    </h2>
      
                    <p>
                      객실별 결제창 주소가 자동으로 연결됩니다.
                    </p>
                  </div>
      
                </div>
      
      
                ${a.length===0?`
                      <div class="hotel-room-empty">
                        등록된 객실이 없습니다.
                      </div>
                    `:`
                      <div class="hotel-room-table-wrap">
      
                        <table class="hotel-room-table">
      
                          <thead>
  <tr>
    <th>객실번호</th>
    <th>상태</th>
    <th>고객 결제창</th>
    <th>객실 QR</th>
    <th>관리</th>
  </tr>
</thead>
      
                          <tbody>
      
                            ${a.map(t=>{let n=window.location.origin+`/hotel?merchant_id=`+e+`&room=`+encodeURIComponent(t.room_number),r=window.location.origin+`/hotel-chrome?merchant_id=`+e+`&room=`+encodeURIComponent(t.room_number);return`
                                  <tr>
      
                                    <td>
                                      <strong class="hotel-room-number-text">
                                        ${t.room_number}
                                      </strong>
                                    </td>
      
                                    <td>
      
                                      <span
                                        class="${t.status===`사용중`?`hotel-room-status-on`:`hotel-room-status-off`}"
                                      >
                                        ${t.status}
                                      </span>
      
                                    </td>
      
                                    <td>

  <button
  class="hotel-room-open-button"
  data-url="${n}"
>
  결제창 열기
</button>

</td>

<td>

  <button
  class="hotel-room-qr-button"
  data-room="${t.room_number}"
  data-url="${r}"
>
  QR 보기
</button>

</td>

<td>

  <button
    class="hotel-room-status-button"
                                        data-id="${t.id}"
                                        data-status="${t.status}"
                                      >
                                        ${t.status===`사용중`?`사용중지`:`사용하기`}
                                      </button>
      
                                    </td>
      
                                  </tr>
                                `}).join(``)}
      
                          </tbody>
      
                        </table>
      
                      </div>
                    `}
      
              </section>
      
            </div>

            <div
  id="hotel-room-qr-modal"
  class="hotel-room-qr-modal"
>

  <div class="hotel-room-qr-box">

    <div class="hotel-room-qr-header">

      <div>
        <span>NXG HOTEL</span>

        <h2 id="hotel-room-qr-title">
          객실 QR
        </h2>
      </div>

      <button
        id="hotel-room-qr-close-x"
        type="button"
      >
        ×
      </button>

    </div>


    <div class="hotel-room-qr-canvas-box">

      <canvas
        id="hotel-room-qr-canvas"
      ></canvas>

    </div>


    <p class="hotel-room-qr-guide">
      객실에 비치할 전용 QR입니다.<br>
      고객이 QR을 촬영하면 해당 객실 결제창으로 연결됩니다.
    </p>


    <div class="hotel-room-qr-actions">

      <button
        id="hotel-room-qr-download"
        type="button"
      >
        QR 이미지 저장
      </button>

      <button
        id="hotel-room-qr-close"
        type="button"
      >
        닫기
      </button>

    </div>

  </div>

</div>
      
          </div>
        `,document.querySelector(`#hotel-room-create-button`)?.addEventListener(`click`,async()=>{let t=(document.querySelector(`#hotel-room-number`)?.value||``).trim().toUpperCase();if(!t){alert(`객실번호를 입력해주세요.`);return}if(a.find(e=>String(e.room_number).toUpperCase()===t)){alert(`이미 등록된 객실번호입니다.`);return}let n=a.reduce((e,t)=>Math.max(e,Number(t.sort_order||0)),0),{error:r}=await X.from(`hotel_rooms`).insert({merchant_id:e,room_number:t,status:`사용중`,sort_order:n+1});if(r){alert(`객실 등록 실패: `+r.message);return}alert(t+`호가 등록되었습니다.`),location.reload()}),document.querySelectorAll(`.hotel-room-open-button`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.url||``;t&&window.open(t,`_blank`)})}),document.querySelectorAll(`.hotel-room-qr-button`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.room||``;t&&(location.href=`/merchant-hotel-room-qr?room=`+encodeURIComponent(t))})}),document.querySelectorAll(`.hotel-room-status-button`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=Number(t.dataset.id),r=(t.dataset.status||`사용중`)===`사용중`?`사용중지`:`사용중`,{error:i}=await X.from(`hotel_rooms`).update({status:r}).eq(`id`,n).eq(`merchant_id`,e);if(i){alert(`객실 상태 변경 실패: `+i.message);return}location.reload()})}),document.querySelector(`#hotel-room-go-order`)?.addEventListener(`click`,()=>{location.href=`/merchant-admin`}),document.querySelector(`#hotel-room-go-product`)?.addEventListener(`click`,()=>{location.href=`/merchant-product`}),document.querySelector(`#hotel-room-go-room`)?.addEventListener(`click`,()=>{location.href=`/merchant-hotel-rooms`}),document.querySelector(`#hotel-room-go-card`)?.addEventListener(`click`,()=>{location.href=`/merchant-card`}),document.querySelector(`#hotel-room-logout`)?.addEventListener(`click`,()=>{sessionStorage.removeItem(`login_merchant_id`),sessionStorage.removeItem(`login_merchant_name`),sessionStorage.removeItem(`login_merchant_code`),sessionStorage.removeItem(`login_merchant_type`),location.href=`/merchant-login`})}else if(Q===`/merchant-hotel-room-qr`){let e=Number(sessionStorage.getItem(`login_merchant_id`)||0),t=sessionStorage.getItem(`login_merchant_name`)||``,n=sessionStorage.getItem(`login_merchant_type`)||``,r=(new URLSearchParams(window.location.search).get(`room`)||``).trim();if(!e)alert(`로그인이 필요합니다.`),location.href=`/merchant-login`;else if(n!==`호텔`)alert(`호텔 가맹점에서만 사용할 수 있습니다.`),location.href=`/merchant-admin`;else if(!r)alert(`객실번호를 찾을 수 없습니다.`),location.href=`/merchant-hotel-rooms`;else{let n=window.location.origin+`/hotel-chrome?merchant_id=`+e+`&room=`+encodeURIComponent(r);Z.innerHTML=`
              <div class="hotel-poster-admin-page">
        
                <div class="hotel-poster-admin-header no-print">
        
                  <div>
                    <h1>
                      객실 QR 안내문
                    </h1>
        
                    <p>
                      ${t}
                      · ROOM ${r}
                    </p>
                  </div>
        
                  <button
                    id="hotel-poster-back"
                  >
                    객실관리
                  </button>
        
                </div>
        
        
                <div
                  id="hotel-poster-print-area"
                  class="hotel-poster-print-area"
                >
        
                  <img
                    src="/hotel-qr-guide-poster.png"
                    class="hotel-poster-image"
                    alt="호텔 QR 결제 안내"
                  />
        
        
                  <div
                    class="hotel-poster-qr"
                  >
                    <canvas
                      id="hotel-poster-qr-canvas"
                    ></canvas>
                  </div>
        
        
                  <div
                    class="hotel-poster-room-number"
                  >
                    ROOM ${r}
                  </div>
        
                </div>
        
        
                <div class="hotel-poster-controls no-print">
        
                  <div class="hotel-poster-link">
        
                    <span>
                      ROOM ${r} 링크주소
                    </span>
        
                    <strong>
                      ${n}
                    </strong>
        
                  </div>
        
        
                  <button
                    id="hotel-poster-copy"
                  >
                    📋 링크 복사
                  </button>
        
                  <button
                    id="hotel-poster-print"
                  >
                    🖨️ 인쇄
                  </button>
        
                </div>
        
              </div>
            `;let i=document.querySelector(`#hotel-poster-qr-canvas`);i&&await de.toCanvas(i,n,{width:320,margin:1}),document.querySelector(`#hotel-poster-copy`)?.addEventListener(`click`,async()=>{await navigator.clipboard.writeText(n),alert(`ROOM `+r+` 링크가 복사되었습니다.`)}),document.querySelector(`#hotel-poster-print`)?.addEventListener(`click`,()=>{window.print()}),document.querySelector(`#hotel-poster-back`)?.addEventListener(`click`,()=>{location.href=`/merchant-hotel-rooms`})}}else if(Q===`/merchant-product`){let e=Number(sessionStorage.getItem(`login_merchant_id`)),t=sessionStorage.getItem(`login_merchant_name`)||``,n=sessionStorage.getItem(`login_merchant_type`)||`일반매장`,r=n===`뷰티`;e||(alert(`로그인이 필요합니다.`),location.href=`/merchant-login`);let{data:i,error:a}=await X.from(`products`).select(`*`).eq(`merchant_id`,e).order(`sort_order`,{ascending:!0}).order(`id`,{ascending:!1}),o=[];if(r){let{data:t,error:n}=await X.from(`beauty_staff`).select(`id, staff_name, position, photo_url, status`).eq(`merchant_id`,e).eq(`status`,`근무중`).order(`id`,{ascending:!1});n?alert(`직원 목록 조회 실패: `+n.message):o=t||[]}let s=[];if(r){let{data:t,error:n}=await X.from(`beauty_staff_services`).select(`staff_id, service_id`).eq(`merchant_id`,e);n?alert(`담당직원 연결 조회 실패: `+n.message):s=t||[]}a&&alert(`상품 목록 조회 실패: `+a.message),Z.innerHTML=`
    <div class="pg-admin-page">
      <div class="merchant-pick-header">
        <h1>
${r?`NXG BEAUTY 서비스관리`:`NXG PICK 상품관리`}
</h1>

        <div class="merchant-user-box">
          <strong>${t}님</strong>
          <button id="merchant-product-logout">로그아웃</button>
        </div>
      </div>

      <div class="merchant-toolbar">
        <button id="go-merchant-order">주문관리</button>

${r?`<button id="go-merchant-staff">직원관리</button>`:``}

<button id="go-merchant-product">
${r?`서비스관리`:`상품관리`}
</button>

${n===`호텔`?``:`<button id="go-merchant-qr">PICK QR</button>`}
      </div>

      <div class="payment-card">
  <div class="merchant-product-layout">

    <div class="product-create-card">
      <h2>
${r?`서비스 등록`:`상품 등록`}
</h2>

    <div class="input-group">
      <label>
${r?`서비스명`:`상품명`}
</label>
      <input id="merchant-product-name"placeholder="${r?`예: 셋팅펌`:`예: 아메리카노`}"" />
    </div>

    <div class="input-group">
      <label>가격</label>
      <input id="merchant-product-price" type="number" placeholder="예: 4500" />
    </div>
    ${r?``:`
          <div class="input-group">
            <label>카테고리</label>
    
            <input
  id="merchant-product-category"
  type="text"
  placeholder="카테고리 직접 입력"
  style="
    height:42px;
    border:1px solid #d1d5db;
    border-radius:8px;
    padding:0 12px;
    box-sizing:border-box;
  "
/>
          </div>
        `}

${r?`
      <div class="input-group">
        <label>소요시간</label>

        <select id="merchant-product-duration">
          <option value="15">15분</option>
          <option value="30" selected>30분</option>
          <option value="45">45분</option>
          <option value="60">60분</option>
          <option value="90">90분</option>
          <option value="120">120분</option>
          <option value="150">150분</option>
          <option value="180">180분</option>
        </select>
      </div>
    `:``}


    <div class="input-group">
      <label>
${r?`서비스 이미지`:`상품 이미지`}
</label>
      <input
        id="merchant-product-image-file"
        type="file"
        accept="image/*"
      />
    </div>

    <div class="product-image-preview-box">
      <img id="product-image-preview" />
      <span id="product-image-preview-text">이미지 미리보기</span>
    </div>

    <button id="merchant-product-create">
${r?`서비스 등록`:`상품 등록`}
</button>
  </div>

  <div class="product-list-card">
    <h2>
${r?`등록된 서비스`:`등록된 상품`}
</h2>

    <div class="product-summary-row">
      <span>
${r?`총 서비스 : `:`총 상품 : `}
${(i||[]).length}개
</span>
      <span>판매중 : ${(i||[]).filter(e=>(e.status||`판매중`)===`판매중`).length}개</span>
      <span>판매중지 : ${(i||[]).filter(e=>e.status===`판매중지`).length}개</span>
    </div>

    <div id="merchantProductBody" class="product-card-list"></div>
  </div>

</div>
    </div>
  `;let c=document.querySelector(`#merchantProductBody`);c.innerHTML=``,(i||[]).forEach(e=>{let t=document.createElement(`div`),n=e.image_url?`<img src="`+e.image_url+`" />`:`<div class="product-no-image">이미지 없음</div>`,i=s.filter(t=>Number(t.service_id)===Number(e.id)).map(e=>Number(e.staff_id)),a=o.filter(e=>i.includes(Number(e.id))),l=r?a.length>0?`<div style="margin-top:10px;width:100%;text-align:center;"><div style="font-size:12px;color:#64748b;margin-bottom:6px;">담당직원</div><div style="font-size:13px;font-weight:700;">`+a.map(e=>e.staff_name||`-`).join(`, `)+`</div></div>`:`<p style="margin-top:10px;color:#94a3b8;font-size:13px;">담당직원 미설정</p>`:``;t.className=`product-item-card`,t.innerHTML=`<div class="product-thumb">`+n+`</div><div class="product-info"><h3>`+(e.product_name||`-`)+`</h3><p>`+Number(e.price||0).toLocaleString()+`원</p>`+(r?`<p>소요시간 : `+Number(e.duration_minutes||30)+`분</p>`:``)+`<span class="`+((e.status||`판매중`)===`판매중`?`product-on`:`product-off`)+`">`+(e.status||`판매중`)+`</span>`+l+`</div><div class="product-actions"><div class="product-sort-row"><button class="product-up-button" data-id="`+e.id+`" data-sort="`+(e.sort_order||0)+`">▲</button><button class="product-down-button" data-id="`+e.id+`" data-sort="`+(e.sort_order||0)+`">▼</button></div>`+(r?`<button class="beauty-staff-setting-button" data-id="`+e.id+`">담당직원 설정</button>`:``)+`<button class="product-edit-button" data-id="`+e.id+`">수정</button><button class="product-status-button" data-id="`+e.id+`" data-status="`+(e.status||`판매중`)+`">`+((e.status||`판매중`)===`판매중`?`판매중지`:`판매중`)+`</button><button class="product-delete-button" data-id="`+e.id+`">삭제</button></div>`,c.appendChild(t)}),document.querySelectorAll(`.beauty-staff-setting-button`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=Number(t.getAttribute(`data-id`)),r=i?.find(e=>e.id===n);if(!r){alert(`서비스 정보를 찾을 수 없습니다.`);return}let{data:a,error:s}=await X.from(`beauty_staff_services`).select(`staff_id`).eq(`merchant_id`,e).eq(`service_id`,n);if(s){alert(`담당직원 조회 실패: `+s.message);return}let c=(a||[]).map(e=>Number(e.staff_id)),l=document.createElement(`div`);l.style.cssText=`
        position:fixed;
        inset:0;
        z-index:9999;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:20px;
        box-sizing:border-box;
        background:rgba(0,0,0,0.45);
      `,l.innerHTML=`
        <div style="
          width:100%;
          max-width:480px;
          max-height:80vh;
          overflow-y:auto;
          padding:26px;
          box-sizing:border-box;
          border-radius:18px;
          background:#ffffff;
          box-shadow:0 20px 60px rgba(0,0,0,0.25);
        ">
          <h2 style="margin:0 0 8px;">
            담당직원 설정
          </h2>

          <p style="margin:0 0 22px;">
            ${r.product_name||`서비스`}
          </p>

          <label style="
            display:flex;
            align-items:center;
            gap:10px;
            padding:14px 0;
            border-bottom:1px solid #e5e7eb;
            font-weight:700;
          ">
            <input
              id="beauty-select-all-staff"
              type="checkbox"
            />
            전체 직원 선택
          </label>

          <div style="margin-top:12px;">
            ${o.length>0?o.map(e=>`
                    <label style="
                      display:flex;
                      align-items:center;
                      gap:12px;
                      padding:12px 0;
                      border-bottom:1px solid #f1f5f9;
                    ">
                      <input
                        type="checkbox"
                        class="beauty-service-staff-checkbox"
                        value="${e.id}"
                        ${c.includes(Number(e.id))?`checked`:``}
                      />

                      ${e.photo_url?`
                            <img
                              src="${e.photo_url}"
                              alt="${e.staff_name||``}"
                              style="
                                width:52px;
                                height:52px;
                                border-radius:50%;
                                object-fit:cover;
                              "
                            />
                          `:``}

                      <span>
                        <strong>
                          ${e.staff_name||`-`}
                        </strong>

                        ${e.position?`<br><small>${e.position}</small>`:``}
                      </span>
                    </label>
                  `).join(``):`
                  <p style="color:#64748b;">
                    등록된 직원이 없습니다.
                  </p>
                `}
          </div>

          <div style="
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:10px;
            margin-top:24px;
          ">
            <button id="beauty-staff-setting-cancel">
              취소
            </button>

            <button id="beauty-staff-setting-save">
              저장
            </button>
          </div>
        </div>
      `,document.body.appendChild(l);let u=Array.from(l.querySelectorAll(`.beauty-service-staff-checkbox`)),d=l.querySelector(`#beauty-select-all-staff`);d&&(d.checked=u.length>0&&u.every(e=>e.checked),d.addEventListener(`change`,()=>{u.forEach(e=>{e.checked=d.checked})})),u.forEach(e=>{e.addEventListener(`change`,()=>{d&&(d.checked=u.length>0&&u.every(e=>e.checked))})}),l.querySelector(`#beauty-staff-setting-cancel`)?.addEventListener(`click`,()=>{l.remove()}),l.querySelector(`#beauty-staff-setting-save`)?.addEventListener(`click`,async()=>{let t=u.filter(e=>e.checked).map(e=>Number(e.value)),{error:r}=await X.from(`beauty_staff_services`).delete().eq(`merchant_id`,e).eq(`service_id`,n);if(r){alert(`기존 담당직원 삭제 실패: `+r.message);return}if(t.length>0){let r=t.map(t=>({merchant_id:e,staff_id:t,service_id:n})),{error:i}=await X.from(`beauty_staff_services`).insert(r);if(i){alert(`담당직원 저장 실패: `+i.message);return}}alert(`담당직원이 저장되었습니다.`),l.remove()})})}),document.querySelectorAll(`.beauty-staff-setting-button`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=Number(e.getAttribute(`data-id`)),n=i?.find(e=>e.id===t);if(!n){alert(`서비스 정보를 찾을 수 없습니다.`);return}let r=document.createElement(`div`);r.style.cssText=`
        position:fixed;
        inset:0;
        z-index:9999;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:20px;
        box-sizing:border-box;
        background:rgba(0,0,0,0.45);
      `,r.innerHTML=`
        <div style="
          width:100%;
          max-width:480px;
          max-height:80vh;
          overflow-y:auto;
          padding:26px;
          box-sizing:border-box;
          border-radius:18px;
          background:#ffffff;
          box-shadow:0 20px 60px rgba(0,0,0,0.25);
        ">
          <h2 style="margin:0 0 8px;">
            담당직원 설정
          </h2>

          <p style="margin:0 0 22px;">
            ${n.product_name||`서비스`}
          </p>

          <div>
            ${o.length>0?o.map(e=>`
                    <label style="
                      display:flex;
                      align-items:center;
                      gap:12px;
                      padding:12px 0;
                      border-bottom:1px solid #f1f5f9;
                    ">
                      <input
  type="checkbox"
  class="beauty-service-staff-checkbox"
  value="${e.id}"
  ''
/>

                      ${e.photo_url?`
                            <img
                              src="${e.photo_url}"
                              alt="${e.staff_name||``}"
                              style="
                                width:52px;
                                height:52px;
                                border-radius:50%;
                                object-fit:cover;
                              "
                            />
                          `:``}

                      <span>
                        <strong>
                          ${e.staff_name||`-`}
                        </strong>

                        ${e.position?`<br><small>${e.position}</small>`:``}
                      </span>
                    </label>
                  `).join(``):`
                  <p style="color:#64748b;">
                    등록된 직원이 없습니다.
                  </p>
                `}
          </div>

          <div style="
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:10px;
            margin-top:24px;
          ">
            <button id="beauty-staff-setting-cancel">
              취소
            </button>

            <button id="beauty-staff-setting-save">
              저장
            </button>
          </div>
        </div>
      `,document.body.appendChild(r),r.querySelector(`#beauty-staff-setting-cancel`)?.addEventListener(`click`,()=>{r.remove()}),r.querySelector(`#beauty-staff-setting-save`)?.addEventListener(`click`,()=>{alert(`저장 기능은 다음 단계에서 연결합니다.`)})})}),document.querySelectorAll(`.product-up-button`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=Number(e.getAttribute(`data-id`)),n=i?.find(e=>e.id===t);if(!n)return;let r=(i||[]).findIndex(e=>e.id===t);if(r<=0){alert(`이미 맨 위 상품입니다.`);return}let a=(i||[])[r-1],o=Number(n.sort_order||r),s=Number(a.sort_order||r-1);await X.from(`products`).update({sort_order:s}).eq(`id`,n.id),await X.from(`products`).update({sort_order:o}).eq(`id`,a.id),location.reload()})}),document.querySelectorAll(`.product-down-button`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=Number(e.getAttribute(`data-id`)),n=i?.find(e=>e.id===t);if(!n)return;let r=(i||[]).findIndex(e=>e.id===t);if(r<0||r>=(i||[]).length-1){alert(`이미 맨 아래 상품입니다.`);return}let a=(i||[])[r+1],o=Number(n.sort_order||r),s=Number(a.sort_order||r+1);await X.from(`products`).update({sort_order:s}).eq(`id`,n.id),await X.from(`products`).update({sort_order:o}).eq(`id`,a.id),location.reload()})}),document.querySelectorAll(`.product-edit-button`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=Number(e.getAttribute(`data-id`)),n=i?.find(e=>e.id===t);if(!n){alert(`상품 정보를 찾을 수 없습니다.`);return}let a=prompt(`상품명`,n.product_name);if(!a)return;let o=prompt(`가격`,String(n.price));if(!o)return;let s=Number(n.duration_minutes||30);if(r){let e=prompt(`소요시간(분)`,String(n.duration_minutes||30));if(!e)return;if(s=Number(e),!Number.isFinite(s)||s<=0){alert(`소요시간을 정확히 입력해주세요.`);return}}let{error:c}=await X.from(`products`).update({product_name:a,price:Number(o),duration_minutes:r?s:n.duration_minutes}).eq(`id`,t);if(c){alert(`수정 실패 : `+c.message);return}alert(`수정되었습니다.`),location.reload()})}),document.querySelectorAll(`.product-delete-button`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=Number(e.getAttribute(`data-id`));if(!confirm(`정말 이 상품을 삭제할까요?`))return;let{error:n}=await X.from(`products`).delete().eq(`id`,t);if(n){alert(`상품 삭제 실패: `+n.message);return}alert(`상품이 삭제되었습니다.`),location.reload()})}),document.querySelector(`#merchant-product-image-file`)?.addEventListener(`change`,()=>{let e=document.getElementById(`merchant-product-image-file`)?.files?.[0],t=document.getElementById(`product-image-preview`),n=document.getElementById(`product-image-preview-text`);e&&(t.src=URL.createObjectURL(e),t.style.display=`block`,n.style.display=`none`)}),document.querySelector(`#merchant-product-create`)?.addEventListener(`click`,async()=>{let t=document.getElementById(`merchant-product-name`)?.value||``,n=Number(document.getElementById(`merchant-product-price`)?.value||0),i=r?Number(document.getElementById(`merchant-product-duration`)?.value||30):null,a=r?`뷰티서비스`:document.getElementById(`merchant-product-category`)?.value||`기타`,o=document.getElementById(`merchant-product-image-file`)?.files?.[0],s=``;if(o){let e=o.name.split(`.`).pop()||`png`,t=Date.now()+`_product.`+e,{error:n}=await X.storage.from(`merchant-files`).upload(t,o);if(n){alert(`상품 이미지 업로드 실패: `+n.message);return}let{data:r}=X.storage.from(`merchant-files`).getPublicUrl(t);s=r.publicUrl}if(!t||!n){alert(`상품명과 가격을 입력해주세요.`);return}let{error:c}=await X.from(`products`).insert({merchant_id:e,product_name:t,price:n,category:a,image_url:s,duration_minutes:r?i:null,status:`판매중`});if(c){alert(`상품 등록 실패: `+c.message);return}alert(`상품이 등록되었습니다.`),location.reload()}),document.querySelectorAll(`.product-status-button`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`),n=(e.getAttribute(`data-status`)||`판매중`)===`판매중`?`판매중지`:`판매중`,{error:r}=await X.from(`products`).update({status:n}).eq(`id`,Number(t));if(r){alert(`상태 변경 실패: `+r.message);return}location.reload()})}),document.querySelector(`#go-merchant-order`)?.addEventListener(`click`,()=>{location.href=`/merchant-admin`}),document.querySelector(`#go-merchant-staff`)?.addEventListener(`click`,()=>{location.href=`/merchant-staff`}),document.querySelector(`#go-merchant-product`)?.addEventListener(`click`,()=>{location.href=`/merchant-product`}),document.querySelector(`#go-merchant-qr`)?.addEventListener(`click`,()=>{location.href=`/merchant-qr`}),document.querySelector(`#merchant-product-logout`)?.addEventListener(`click`,()=>{sessionStorage.removeItem(`login_merchant_id`),sessionStorage.removeItem(`login_merchant_name`),sessionStorage.removeItem(`login_merchant_code`),location.href=`/merchant-login`})}else if(Q===`/merchant-staff`)await Db(Z,X);else if(Q===`/merchant-beauty-schedule`){let e=Number(sessionStorage.getItem(`login_merchant_id`)),t=sessionStorage.getItem(`login_merchant_name`)||``,n=new URLSearchParams(window.location.search),r=Number(n.get(`staff_id`));e||(alert(`로그인이 필요합니다.`),location.href=`/merchant-login`),r||(alert(`직원 정보가 없습니다.`),location.href=`/merchant-staff`);let{data:i,error:a}=await X.from(`beauty_staff`).select(`
        id,
        staff_name,
        position,
        photo_url,
        status
      `).eq(`id`,r).eq(`merchant_id`,e).maybeSingle();(a||!i)&&(alert(`직원 정보를 찾을 수 없습니다.`),location.href=`/merchant-staff`);let o=n.get(`date`)||(e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`)(new Date),{data:s,error:c}=await X.from(`beauty_staff_schedule`).select(`
        id,
        schedule_time,
        status,
        order_id
      `).eq(`merchant_id`,e).eq(`staff_id`,r).eq(`schedule_date`,o);c&&alert(`스케줄 조회 실패: `+c.message);let l=new Map;(s||[]).forEach(e=>{let t=String(e.schedule_time||``).slice(0,5);l.set(t,e)});let{data:u,error:d}=await X.from(`orders`).select(`
    id,
    items,
    order_status,
    payment_status
  `).eq(`merchant_id`,e);d&&alert(`예약내역 조회 실패: `+d.message),(u||[]).forEach(e=>{let t=String(e.order_status||``),n=String(e.payment_status||``);t.includes(`취소`)||n.includes(`취소`)||(Array.isArray(e.items)?e.items:[]).forEach(t=>{if(Number(t.beauty_staff_id)!==r||String(t.reservation_date||``)!==o)return;let n=String(t.reservation_time||``).slice(0,5);if(!n)return;let i=Number(t.duration_minutes||30)*Math.max(1,Number(t.quantity||1)),a=Number(n.slice(0,2))*60+Number(n.slice(3,5)),s=Math.max(1,Math.ceil(i/30));for(let t=0;t<s;t++){let n=a+t*30,r=`${String(Math.floor(n/60)).padStart(2,`0`)}:${String(n%60).padStart(2,`0`)}`,i=l.get(r);i?.order_id&&Number(i.order_id)===Number(e.id)&&i.status===`예약가능`||l.set(r,{...i||{},status:`예약완료`,order_id:e.id})}})});let f=[];for(let e=0;e<1440;e+=30){let t=String(Math.floor(e/60)).padStart(2,`0`),n=String(e%60).padStart(2,`0`);f.push(`${t}:${n}`)}Z.innerHTML=`
      <div class="pg-admin-page">
  
        <div class="merchant-pick-header">
  
          <h1>직원 스케줄관리</h1>
  
          <div class="merchant-user-box">
            <strong>${t}님</strong>
  
            <button
              id="beauty-schedule-back"
              type="button"
            >
              직원관리
            </button>
          </div>
  
        </div>
  
  
        <div
  class="payment-card"
  style="
    width:100%;
    max-width:1500px;
  "
>
  
          <div
            style="
              display:flex;
              align-items:center;
              justify-content:space-between;
              gap:20px;
              margin-bottom:20px;
            "
          >
  
            <div>
              <strong
                style="
                  display:block;
                  font-size:20px;
                  margin-bottom:5px;
                "
              >
              ${i?.staff_name||`-`}
              </strong>
  
              <span
                style="
                  color:#64748b;
                "
              >
              ${i?.position||``}
              </span>
            </div>
  
  
            <div
  style="
    display:flex;
    align-items:center;
    gap:6px;
    
  "
>
  <button
    id="beauty-schedule-prev"
    type="button"
    style="
      height:40px;
      padding:0 16px;
      border:0;
      border-radius:8px;
      background:#e8b4c2;
      color:#ffffff;
      font-weight:700;
      cursor:pointer;
      transform:translateY(-10px);
    "
  >
    이전
  </button>

  <button
    id="beauty-schedule-today"
    type="button"
    style="
      height:40px;
      padding:0 16px;
      border:0;
      border-radius:8px;
      background:#e8b4c2;
      color:#ffffff;
      font-weight:700;
      cursor:pointer;
      transform:translateY(-10px);
    "
  >
    오늘
  </button>

  <button
    id="beauty-schedule-next"
    type="button"
    style="
      height:40px;
      padding:0 16px;
      border:0;
      border-radius:8px;
      background:#e8b4c2;
      color:#ffffff;
      font-weight:700;
      cursor:pointer;
      transform:translateY(-10px);
    "
  >
    다음
  </button>

  <input
    id="beauty-schedule-date"
    type="date"
    value="${o}"
    style="
      height:40px;
      padding:0 12px;
      border:1px solid #cbd5e1;
      border-radius:8px;
      box-sizing:border-box;
    "
  />
</div>
  
          </div>
   
          <div
  style="
    display:flex;
    align-items:center;
    justify-content:flex-end;
    gap:8px;
    margin-bottom:12px;
  "
>
  <button
    id="beauty-schedule-reset-button"
    type="button"
    style="
      height:36px;
      padding:0 18px;
      border:0;
      border-radius:8px;
      background:#64748b;
      color:#ffffff;
      font-weight:700;
      cursor:pointer;
    "
  >
    리셋
  </button>

  <button
    id="beauty-schedule-on-button"
    type="button"
    style="
      height:36px;
      padding:0 18px;
      border:0;
      border-radius:8px;
      background:#16a34a;
      color:#ffffff;
      font-weight:700;
      cursor:pointer;
    "
  >
    ON
  </button>

  <button
    id="beauty-schedule-off-button"
    type="button"
    style="
      height:36px;
      padding:0 18px;
      border:0;
      border-radius:8px;
      background:#dc2626;
      color:#ffffff;
      font-weight:700;
      cursor:pointer;
    "
  >
    OFF
  </button>
</div>

          <div
  style="
    display:grid;
    grid-template-columns:repeat(8, minmax(100px, 1fr));
    gap:8px;
  "
>
  
            ${f.map(e=>{let t=l.get(e),n=t?.status||`예약가능`,r=n===`예약완료`,i=n===`예약가능`?`#15803d`:n===`예약불가`?`#dc2626`:n===`예약완료`?`#2563eb`:`#b45309`;return`
                  <div
                    style="
  border:1px solid #e2e8f0;
  border-radius:8px;
  padding:8px;
  background:#ffffff;
"
                  >
  
                    <strong
                      style="
                        display:block;
                        margin-bottom:8px;
                        font-size:16px;
                      "
                    >
                      ${e}
                    </strong>
  
     <select
  class="beauty-schedule-status"
  data-time="${e}"
  data-order-linked="${t?.order_id?`true`:`false`}"
  style="
  width:100%;
  height:30px;
  border:1px solid #cbd5e1;
  border-radius:7px;
  padding:0 8px;
  color:${i};
  font-weight:700;
"
>
  
                      <option
                        value="예약가능"
                        ${n===`예약가능`?`selected`:``}
                      >
                        예약가능
                      </option>
  
                      <option
                        value="예약불가"
                        ${n===`예약불가`?`selected`:``}
                      >
                        예약불가
                      </option>
  
                      <option
                        value="휴게"
                        ${n===`휴게`?`selected`:``}
                      >
                        휴게
                      </option>
  
                      ${r?`
                            <option
                              value="예약완료"
                              selected
                            >
                              예약완료
                            </option>
                          `:``}
  
                    </select>
  
                  </div>
                `}).join(``)}
  
          </div>
  
        </div>
  
      </div>
    `,document.querySelector(`#beauty-schedule-back`)?.addEventListener(`click`,()=>{location.href=`/merchant-staff`}),document.querySelector(`#beauty-schedule-date`)?.addEventListener(`change`,e=>{let t=e.target;location.href=`/merchant-beauty-schedule?staff_id=`+encodeURIComponent(String(r))+`&date=`+encodeURIComponent(t.value)});let p=e=>{let t=new Date(o+`T00:00:00`);t.setDate(t.getDate()+e);let n=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}-${String(t.getDate()).padStart(2,`0`)}`;location.href=`/merchant-beauty-schedule?staff_id=`+encodeURIComponent(String(r))+`&date=`+encodeURIComponent(n)};document.querySelector(`#beauty-schedule-prev`)?.addEventListener(`click`,()=>{p(-1)}),document.querySelector(`#beauty-schedule-today`)?.addEventListener(`click`,()=>{let e=new Date,t=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`;location.href=`/merchant-beauty-schedule?staff_id=`+encodeURIComponent(String(r))+`&date=`+encodeURIComponent(t)}),document.querySelector(`#beauty-schedule-next`)?.addEventListener(`click`,()=>{p(1)}),document.querySelectorAll(`.beauty-schedule-status`).forEach(t=>{t.addEventListener(`change`,async()=>{let n=t.dataset.time||``,i=t.value;if(t.style.color=i===`예약가능`?`#15803d`:i===`예약불가`?`#dc2626`:i===`예약완료`?`#2563eb`:`#b45309`,!n)return;let a=Number(l.get(n)?.order_id||0);t.disabled=!0;let{error:s}=await X.from(`beauty_staff_schedule`).upsert({merchant_id:e,staff_id:r,schedule_date:o,schedule_time:n,status:i,order_id:a||null},{onConflict:`staff_id,schedule_date,schedule_time`});if(s){alert(`스케줄 저장 실패: `+s.message),t.disabled=!1;return}t.disabled=!1})});let m=async t=>{let n=Array.from(document.querySelectorAll(`.beauty-schedule-status`)).filter(e=>e.dataset.orderLinked!==`true`),i=n.map(n=>({merchant_id:e,staff_id:r,schedule_date:o,schedule_time:n.dataset.time||``,status:t}));if(i.length===0)return;let{error:a}=await X.from(`beauty_staff_schedule`).upsert(i,{onConflict:`staff_id,schedule_date,schedule_time`});if(a){alert(`전체 스케줄 저장 실패: `+a.message);return}n.forEach(e=>{e.value=t,e.style.color=t===`예약가능`?`#15803d`:`#dc2626`})};document.querySelector(`#beauty-schedule-on-button`)?.addEventListener(`click`,async()=>{await m(`예약가능`)}),document.querySelector(`#beauty-schedule-off-button`)?.addEventListener(`click`,async()=>{await m(`예약불가`)}),document.querySelector(`#beauty-schedule-reset-button`)?.addEventListener(`click`,async()=>{if(!confirm(`이 직원의 선택한 날짜 스케줄을 초기화할까요?
예약완료 시간은 유지됩니다.`))return;let{error:t}=await X.from(`beauty_staff_schedule`).delete().eq(`merchant_id`,e).eq(`staff_id`,r).eq(`schedule_date`,o).is(`order_id`,null);if(t){alert(`스케줄 초기화 실패: `+t.message);return}document.querySelectorAll(`.beauty-schedule-status`).forEach(e=>{e.dataset.orderLinked!==`true`&&(e.value=`예약가능`,e.style.color=`#15803d`)}),alert(`스케줄이 초기화되었습니다.`)})}else if(Q===`/merchant-beauty-hours`){let e=Number(sessionStorage.getItem(`login_merchant_id`)),t=sessionStorage.getItem(`login_merchant_name`)||``;if(!e)alert(`로그인이 필요합니다.`),location.href=`/merchant-login`;else{let{data:n,error:r}=await X.from(`beauty_business_hours`).select(`
        id,
        weekday,
        open_time,
        close_time,
        is_closed,
        is_24_hours
      `).eq(`merchant_id`,e);r&&alert(`영업시간 조회 실패: `+r.message);let i=new Map;(n||[]).forEach(e=>{i.set(Number(e.weekday),e)});let a=[{value:1,label:`월요일`},{value:2,label:`화요일`},{value:3,label:`수요일`},{value:4,label:`목요일`},{value:5,label:`금요일`},{value:6,label:`토요일`},{value:0,label:`일요일`}],o=[];for(let e=0;e<1440;e+=30){let t=String(Math.floor(e/60)).padStart(2,`0`),n=String(e%60).padStart(2,`0`);o.push(`${t}:${n}`)}Z.innerHTML=`
      <div class="pg-admin-page">

        <div class="merchant-pick-header">

          <h1>영업시간 관리</h1>

          <div class="merchant-user-box">
            <strong>${t}님</strong>

            <button
              id="beauty-hours-back"
              type="button"
            >
              주문관리
            </button>
          </div>

        </div>


        <div
          class="payment-card"
          style="
            width:100%;
            max-width:1000px;
          "
        >

          <div
            style="
              margin-bottom:20px;
            "
          >
            <h2
              style="
                margin:0 0 6px;
              "
            >
              주간 영업시간
            </h2>

            <div
              style="
                color:#64748b;
                font-size:14px;
              "
            >
              요일별 영업시간을 설정해주세요.
            </div>
          </div>


          <div
            style="
              display:flex;
              flex-direction:column;
              gap:10px;
            "
          >

            ${a.map(e=>{let t=i.get(e.value),n=String(t?.open_time||`10:00`).slice(0,5),r=String(t?.close_time||`21:00`).slice(0,5),a=t?.is_closed===!0,s=t?.is_24_hours===!0;return`
                  <div
                    class="beauty-hours-row"
                    data-weekday="${e.value}"
                    style="
                      display:grid;
                      grid-template-columns:
                        120px 160px 30px 160px 100px 100px;
                      align-items:center;
                      gap:10px;
                      padding:12px;
                      border:1px solid #e2e8f0;
                      border-radius:10px;
                    "
                  >

                    <strong>
                      ${e.label}
                    </strong>


                    <select
                      class="beauty-hours-open"
                      ${a||s?`disabled`:``}
                      style="
                        height:38px;
                        border:1px solid #cbd5e1;
                        border-radius:8px;
                        padding:0 8px;
                      "
                    >
                      ${o.map(e=>`
                          <option
                            value="${e}"
                            ${e===n?`selected`:``}
                          >
                            ${e}
                          </option>
                        `).join(``)}
                    </select>


                    <span
                      style="
                        text-align:center;
                      "
                    >
                      ~
                    </span>


                    <select
                      class="beauty-hours-close"
                      ${a||s?`disabled`:``}
                      style="
                        height:38px;
                        border:1px solid #cbd5e1;
                        border-radius:8px;
                        padding:0 8px;
                      "
                    >
                      ${o.map(e=>`
                          <option
                            value="${e}"
                            ${e===r?`selected`:``}
                          >
                            ${e}
                          </option>
                        `).join(``)}
                    </select>


                    <label
                      style="
                        display:flex;
                        align-items:center;
                        gap:5px;
                        cursor:pointer;
                      "
                    >
                      <input
                        class="beauty-hours-closed"
                        type="checkbox"
                        ${a?`checked`:``}
                      />
                      휴무
                    </label>


                    <label
                      style="
                        display:flex;
                        align-items:center;
                        gap:5px;
                        cursor:pointer;
                      "
                    >
                      <input
                        class="beauty-hours-24"
                        type="checkbox"
                        ${s?`checked`:``}
                      />
                      24시간
                    </label>

                  </div>
                `}).join(``)}

          </div>


          <button
            id="beauty-hours-save"
            type="button"
            style="
              width:100%;
              height:48px;
              margin-top:20px;
              border:0;
              border-radius:9px;
              font-weight:700;
              cursor:pointer;
            "
          >
            영업시간 저장
          </button>

        </div>

      </div>
    `,document.querySelectorAll(`.beauty-hours-row`).forEach(e=>{let t=e.querySelector(`.beauty-hours-open`),n=e.querySelector(`.beauty-hours-close`),r=e.querySelector(`.beauty-hours-closed`),i=e.querySelector(`.beauty-hours-24`),a=()=>{!t||!n||!r||!i||(r.checked&&(i.checked=!1),i.checked&&(r.checked=!1),t.disabled=r.checked||i.checked,n.disabled=r.checked||i.checked)};r?.addEventListener(`change`,a),i?.addEventListener(`change`,a)}),document.querySelector(`#beauty-hours-save`)?.addEventListener(`click`,async()=>{let t=Array.from(document.querySelectorAll(`.beauty-hours-row`)).map(t=>{let n=Number(t.dataset.weekday),r=t.querySelector(`.beauty-hours-open`)?.value||`10:00`,i=t.querySelector(`.beauty-hours-close`)?.value||`21:00`,a=t.querySelector(`.beauty-hours-closed`)?.checked||!1,o=t.querySelector(`.beauty-hours-24`)?.checked||!1;return{merchant_id:e,weekday:n,open_time:a||o?null:r,close_time:a||o?null:i,is_closed:a,is_24_hours:o}}),{error:n}=await X.from(`beauty_business_hours`).upsert(t,{onConflict:`merchant_id,weekday`});alert(n?`영업시간 저장 실패: `+n.message:`영업시간이 저장되었습니다.`)}),document.querySelector(`#beauty-hours-back`)?.addEventListener(`click`,()=>{location.href=`/merchant-admin`})}}else if(Q===`/merchant-qr`){let e=Number(sessionStorage.getItem(`login_merchant_id`)),t=sessionStorage.getItem(`login_merchant_name`)||``;e||(alert(`로그인이 필요합니다.`),location.href=`/merchant-login`);let n=sessionStorage.getItem(`login_merchant_type`)||`일반매장`,r=n===`아카데미`?window.location.origin+`/academy-chrome?merchant_id=`+e:`https://nxgsoft.co.kr/pay/?merchant_id=`+e,{data:i,error:a}=await X.from(`merchants`).select(`qr_template_key`).eq(`id`,e).maybeSingle();a&&console.error(`QR 디자인 조회 실패:`,a);let o=i?.qr_template_key||`default`,s=o===`default`?`/qr-guide-poster.png`:`/qr-templates/${o}.png`,c=[{key:`default`,name:`기본형`,image:`/qr-guide-poster.png`},...Array.from({length:11},(e,t)=>{let n=String(t+1).padStart(2,`0`);return{key:`qr-design-${n}`,name:`디자인 ${t+1}`,image:`/qr-templates/qr-design-${n}.png`}})];Z.innerHTML=`
  <div class="pg-admin-page">

    <div class="merchant-pick-header no-print">
      <h1>
  ${n===`아카데미`?`아카데미 QR관리`:`NXG PICK QR관리`}
</h1>

      <div class="merchant-user-box">
        <strong>${t}님</strong>
        <button id="merchant-qr-logout">로그아웃</button>
      </div>
    </div>

    ${n===`아카데미`?`
          <div class="merchant-toolbar no-print">
            <button id="qr-go-academy-home">
              관리홈
            </button>
          </div>
        `:`
          <div class="merchant-toolbar no-print">
            <button id="qr-go-order">주문관리</button>
            <button id="qr-go-product">상품관리</button>
            <button id="qr-go-qr">PICK QR</button>
          </div>
        `}

    <div
  class="no-print"
  style="
    max-width:1200px;
    margin:0 auto 24px;
  "
>
  <h2
    style="
      margin:0 0 14px;
      font-size:20px;
    "
  >
    QR 디자인 선택
  </h2>

  <div
    style="
      display:grid;
      grid-template-columns:
        repeat(6, minmax(120px, 1fr));
      gap:12px;
    "
  >
    ${c.map(e=>{let t=e.key===o;return`
          <button
            type="button"
            class="qr-template-select-button"
            data-template-key="${e.key}"
            style="
              padding:8px;
              border:
                ${t?`3px solid #17457f`:`1px solid #d7dee8`};
              border-radius:12px;
              background:#ffffff;
              cursor:pointer;
            "
          >
            <img
              src="${e.image}"
              alt="${e.name}"
              style="
                width:100%;
                height:150px;
                object-fit:cover;
                border-radius:8px;
                display:block;
              "
            />

            <strong
              style="
                display:block;
                margin-top:8px;
              "
            >
              ${e.name}
              ${t?` ✓`:``}
            </strong>
          </button>
        `}).join(``)}
  </div>
</div>

    <div class="qr-management-wrap">

      <div
  id="qr-print-area"
  class="qr-print-area"
  data-qr-template="${o}"
>

      <div class="qr-guide-poster-wrap">
  <img
  class="qr-guide-poster"
  src="${s}"
  alt="QR코드 결제 안내"
/>
</div>

          <div class="qr-print-main">

  <div id="merchant-qr-box" class="merchant-qr-box"></div>

  <div class="qr-print-message">
    QR코드를 스캔해 주문해주세요
  </div>

</div>

        </div>

      </div>

      <div class="qr-admin-controls no-print">

        <div class="qr-link-box">
          <div class="qr-link-label">링크주소</div>
          <div class="qr-link-url">${r}</div>
        </div>

        <div
          id="copy-kiosk-url"
          role="button"
          tabindex="0"
          class="qr-admin-button"
        >
          📋 링크 복사
        </div>

        <div
          id="print-qr"
          role="button"
          tabindex="0"
          class="qr-admin-button qr-print-button"
        >
          🖨️ 인쇄
        </div>

      </div>

    </div>

  </div>
`;let l=document.querySelector(`#merchant-qr-box`);de.toCanvas(r,{width:240},(e,t)=>{if(e){alert(`QR 생성 실패`);return}l.innerHTML=``,l.appendChild(t)}),document.querySelectorAll(`.qr-template-select-button`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=t.dataset.templateKey;if(!n)return;let{error:r}=await X.from(`merchants`).update({qr_template_key:n}).eq(`id`,e);if(r){alert(`QR 디자인 저장 실패: `+r.message);return}location.reload()})}),document.querySelector(`#copy-kiosk-url`)?.addEventListener(`click`,async()=>{await navigator.clipboard.writeText(r),alert(`주소가 복사되었습니다.`)}),document.querySelector(`#print-qr`)?.addEventListener(`click`,()=>{window.print()}),document.querySelector(`#qr-go-order`)?.addEventListener(`click`,()=>{location.href=`/merchant-admin`}),document.querySelector(`#qr-go-product`)?.addEventListener(`click`,()=>{location.href=`/merchant-product`}),document.querySelector(`#qr-go-qr`)?.addEventListener(`click`,()=>{location.href=`/merchant-qr`}),document.querySelector(`#qr-go-academy-home`)?.addEventListener(`click`,()=>{location.href=`/merchant-admin`}),document.querySelector(`#merchant-qr-logout`)?.addEventListener(`click`,()=>{sessionStorage.removeItem(`login_merchant_id`),sessionStorage.removeItem(`login_merchant_name`),sessionStorage.removeItem(`login_merchant_code`),location.href=`/merchant-login`})}else if(Q===`/merchant-members`){let e=Number(sessionStorage.getItem(`login_merchant_id`));e||(alert(`로그인이 필요합니다.`),location.href=`/merchant-login`);let{data:t}=await X.from(`members`).select(`*`).eq(`merchant_id`,e).order(`id`,{ascending:!1}),n=new URLSearchParams(location.search),r=(n.get(`member_keyword`)||``).trim().toLowerCase(),i=(t||[]).filter(e=>r?String(e.member_name||``).trim().toLowerCase().includes(r):!0),a=$b(i.length,`academy_members`),o=i.slice(a.startIndex,a.startIndex+a.pageSize);Z.innerHTML=`
        <div class="merchant-members-page">
    
          <h1>회원관리</h1>

          ${Zb(`members`)}

          <div class="academy-member-search-row">
          
            <input
              id="academy-member-search-input"
              type="text"
              placeholder="회원명 입력"
              value="${n.get(`member_keyword`)||``}"
            />
          
            <button
              id="academy-member-search-btn"
              type="button"
            >
              검색
            </button>
          
            <button
              id="add-member-btn"
              type="button"
            >
              회원 추가
            </button>
          
          </div>
        
          <table class="admin-table">
            <thead>
              <tr>
  <th>이름</th>
  <th>생년월일</th>
  <th>가입일</th>
  <th>청구일</th>
  <th>월회비</th>
  <th>연락처</th>
  <th>이메일</th>
  <th>주소</th>
  <th>결제방식</th>
  <th>메모</th>
  <th>상태</th>
  <th>수정</th>
  <th>삭제</th>
</tr>
            </thead>
    
            <tbody>
              ${o.map(e=>`
                <tr>
  <td>${e.member_name||``}</td>

  <td>${e.birth_date||`-`}</td>

  <td>${e.joined_at||`-`}</td>
  <td>
  ${e.billing_day?e.billing_day+`일`:`-`}
</td>

<td>
  ${Number(e.monthly_fee||0).toLocaleString()}원
</td>

<td>${e.phone||``}</td>
  <td>${e.email||``}</td>
<td>${e.address||``}</td>
<td>${e.payment_method||`SMS결제`}</td>
<td>${e.memo||``}</td>
<td>${e.status||`사용중`}</td>
<td>
  <button
    class="member-edit-btn"
    data-id="${e.id}">
    수정
  </button>
</td>

<td>
  <button
    class="member-delete-btn"
    data-id="${e.id}">
    삭제
  </button>
</td>
                </tr>
              `).join(``)}
            </tbody>
          </table>

          ${ex(`academy-members`,a.pageSize,a.currentPage,a.totalPages)}

<div id="member-modal" class="member-modal">
  <div class="member-modal-box">
    <h2>회원 추가</h2>

    <label>회원명</label>
    <input id="member-name" placeholder="회원명" />

    <label>생년월일</label>
    <input id="member-birth-date" type="date" />

    <label>연락처</label>
    <input id="member-phone" placeholder="010-0000-0000" />

    <label>청구일</label>
    <input
     id="member-billing-day"
     type="number"
     min="1"
     max="31"
     placeholder="예: 25"
/>
     <label>월 회비</label>
<input
  id="member-monthly-fee"
  type="number"
  placeholder="예: 100000"
/>

    <label>이메일</label>
    <input id="member-email" placeholder="email@example.com" />

    <label>주소</label>
    <input id="member-address" placeholder="주소" />

    <label>메모</label>
    <textarea id="member-memo" placeholder="메모"></textarea>

    <div class="member-modal-actions">
      <button id="save-member-btn">저장</button>
      <button id="close-member-modal">닫기</button>
    </div>
  </div>
</div>

</div>
      `,Qb(),document.querySelector(`#academy-member-search-btn`)?.addEventListener(`click`,()=>{let e=(document.querySelector(`#academy-member-search-input`)?.value||``).trim();sessionStorage.setItem(`academy_members_page`,`1`);let t=new URLSearchParams;e&&t.set(`member_keyword`,e),location.href=`/merchant-members`+(t.toString()?`?`+t.toString():``)}),document.querySelector(`#academy-member-search-input`)?.addEventListener(`keydown`,e=>{e.key===`Enter`&&document.querySelector(`#academy-member-search-btn`)?.click()}),tx(`academy-members`,`academy_members`,a.currentPage,a.totalPages),document.querySelector(`#add-member-btn`)?.addEventListener(`click`,()=>{let e=document.querySelector(`#member-modal`),t=e?.querySelector(`h2`),n=document.querySelector(`#save-member-btn`),r=document.querySelector(`#member-name`),i=document.querySelector(`#member-birth-date`),a=document.querySelector(`#member-phone`),o=document.querySelector(`#member-billing-day`),s=document.querySelector(`#member-monthly-fee`),c=document.querySelector(`#member-email`),l=document.querySelector(`#member-address`),u=document.querySelector(`#member-memo`);t&&(t.textContent=`회원 추가`),n&&(delete n.dataset.editId,n.textContent=`저장`),r&&(r.value=``),i&&(i.value=``),a&&(a.value=``),o&&(o.value=``),s&&(s.value=``),c&&(c.value=``),l&&(l.value=``),u&&(u.value=``),e&&(e.style.display=`flex`)}),document.querySelector(`#close-member-modal`)?.addEventListener(`click`,()=>{document.querySelector(`#member-modal`).style.display=`none`}),document.querySelector(`#save-member-btn`)?.addEventListener(`click`,async()=>{let t=document.querySelector(`#save-member-btn`),n=Number(t?.dataset.editId||0),r=(document.querySelector(`#member-name`)?.value||``).trim(),i=(document.querySelector(`#member-phone`)?.value||``).trim(),a=(document.querySelector(`#member-email`)?.value||``).trim(),o=(document.querySelector(`#member-address`)?.value||``).trim(),s=(document.querySelector(`#member-memo`)?.value||``).trim(),c=document.querySelector(`#member-birth-date`)?.value||``,l=Number(document.querySelector(`#member-billing-day`)?.value||0),u=Number(document.querySelector(`#member-monthly-fee`)?.value||0);if(!r){alert(`회원명을 입력해주세요.`);return}if(n){let{error:e}=await X.from(`members`).update({member_name:r,phone:i,email:a,address:o,memo:s,birth_date:c,billing_day:l,monthly_fee:u}).eq(`id`,n);if(e){alert(`회원 수정 실패: `+e.message);return}alert(`회원 정보가 수정되었습니다.`),location.reload();return}let{error:d}=await X.from(`members`).insert({merchant_id:e,member_name:r,phone:i,email:a,address:o,memo:s,birth_date:c,billing_day:l,monthly_fee:u,joined_at:new Date().toISOString().slice(0,10),status:`사용중`});if(d){alert(`회원 저장 실패: `+d.message);return}alert(`회원이 등록되었습니다.`),location.reload()}),document.querySelectorAll(`.member-edit-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let n=Number(e.dataset.id),r=(t||[]).find(e=>Number(e.id)===n);if(!r){alert(`회원 정보를 찾을 수 없습니다.`);return}let i=document.querySelector(`#member-modal`);if(!i)return;let a=i.querySelector(`h2`);a&&(a.textContent=`회원 수정`);let o=document.querySelector(`#member-name`),s=document.querySelector(`#member-birth-date`),c=document.querySelector(`#member-phone`),l=document.querySelector(`#member-billing-day`),u=document.querySelector(`#member-monthly-fee`),d=document.querySelector(`#member-email`),f=document.querySelector(`#member-address`),p=document.querySelector(`#member-memo`);o&&(o.value=r.member_name||``),s&&(s.value=r.birth_date||``),c&&(c.value=r.phone||``),l&&(l.value=r.billing_day?String(r.billing_day):``),u&&(u.value=r.monthly_fee?String(r.monthly_fee):``),d&&(d.value=r.email||``),f&&(f.value=r.address||``),p&&(p.value=r.memo||``);let m=document.querySelector(`#save-member-btn`);m&&(m.dataset.editId=String(r.id),m.textContent=`수정 저장`),i.style.display=`flex`})}),document.querySelectorAll(`.member-delete-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=Number(e.dataset.id);if(!confirm(`삭제하시겠습니까?`))return;let{error:n}=await X.from(`members`).delete().eq(`id`,t);if(n){alert(`삭제 실패`);return}alert(`삭제되었습니다.`),location.reload()})})}else if(Q===`/merchant-billings`){let e=Number(sessionStorage.getItem(`login_merchant_id`));e||(alert(`로그인이 필요합니다.`),location.href=`/merchant-login`);let t=new Date,n=t.getFullYear(),r=t.getMonth()+1,i=n+`-`+String(r).padStart(2,`0`),a=i+`-01`,o=new Date(n,r,0).getDate(),s=i+`-`+String(o).padStart(2,`0`),c=new URLSearchParams(location.search),l=c.get(`billing_start_date`)||a,u=c.get(`billing_end_date`)||s,d=(c.get(`billing_member_keyword`)||``).trim().toLowerCase(),{data:f,error:p}=await X.from(`members`).select(`*`).eq(`merchant_id`,e);p&&alert(`회원 조회 실패: `+p.message);let{data:m,error:h}=await X.from(`billings`).select(`*`).eq(`merchant_id`,e).eq(`billing_month`,i);h&&alert(`이번달 청구 조회 실패: `+h.message);let g=(m||[]).map(e=>Number(e.member_id)),_=t.getDate(),v=(f||[]).filter(e=>{let t=Number(e.billing_day||0),n=Number(e.monthly_fee||0),r=(e.status||`사용중`)===`사용중`,i=g.includes(Number(e.id));return r&&n>0&&t>0&&t<=_&&!i});if(v.length>0){let t=v.map(t=>({merchant_id:e,member_id:t.id,billing_month:i,amount:Number(t.monthly_fee||0),memo:`정기청구`,payment_status:`미납`,send_status:`미발송`})),{error:n}=await X.from(`billings`).insert(t);n&&alert(`자동 청구 생성 실패: `+n.message)}let{data:y,error:b}=await X.from(`billings`).select(`*`).eq(`merchant_id`,e).order(`id`,{ascending:!1});b&&alert(`청구 조회 실패: `+b.message);let x=(y||[]).filter(e=>{let t=``;if(e.created_at?t=String(e.created_at).slice(0,10):e.billing_month&&(t=String(e.billing_month)+`-01`),!t)return!1;let n=String((f||[]).find(t=>Number(t.id)===Number(e.member_id))?.member_name||``).trim().toLowerCase(),r=t>=l&&t<=u,i=!d||n.includes(d);return r&&i}),S=$b(x.length,`academy_billings`),C=x.slice(S.startIndex,S.startIndex+S.pageSize);Z.innerHTML=`
    <div class="merchant-members-page">
      <h1>청구관리</h1>
      ${Zb(`billings`)}

      <div class="billing-date-search">

  <input
    id="billing-start-date"
    type="date"
    value="${l}"
  />

  <span>~</span>

  <input
    id="billing-end-date"
    type="date"
    value="${u}"
  />

  <input
    id="billing-member-search-input"
    type="text"
    placeholder="회원명 입력"
    value="${c.get(`billing_member_keyword`)||``}"
  />

  <button
    id="billing-date-search-btn"
    type="button"
  >
    검색
  </button>

</div>


<div class="billing-button-group">

  <button
    id="bulk-add-billing-btn"
    class="billing-action-btn bulk-add-billing-btn"
  >
    ➕ 선택건 추가청구
  </button>

  <button
    id="billing-kakao-send-btn"
    class="billing-action-btn kakao-send-btn"
  >
    <span class="kakao-talk-badge">TALK</span>
    선택건 문자 / 카카오 발송
  </button>

</div>

      <table class="admin-table academy-billing-table">
        <thead>
          <tr>
  <th>
  <input type="checkbox" id="billing-check-all" />
</th>
<th>회원명</th>
<th>청구월</th>
<th>금액</th>
<th>메모</th>
<th>발송상태</th>
<th>결제상태</th>
<th>처리</th>
</tr>
        </thead>

        <tbody id="billingBody">
  ${C.map(e=>`
    <tr>

  <td>
    <input
      type="checkbox"
      class="billing-send-check"
      data-id="${e.id}"
    />
  </td>

  <td>${(f||[]).find(t=>t.id===e.member_id)?.member_name||``}</td>
<td>${e.billing_month||``}</td>
<td>${Number(e.amount||0).toLocaleString()}원</td>
<td>${e.memo||``}</td>

<td>
  ${e.send_status===`발송완료`?`📨 발송완료`:`미발송`}
</td>

<td>${e.payment_status||`미납`}</td>

<td>
  ${(e.payment_status||`미납`)===`미납`?`
        <div class="billing-action-buttons">
  <button
    class="billing-complete-btn"
    data-id="${e.id}"
  >
    완료
  </button>

  <button
    class="billing-delete-btn"
    data-id="${e.id}"
  >
    취소
  </button>
</div>
      `:`-`}
</td>
    </tr>
  `).join(``)}
</tbody>
      </table>

      ${ex(`academy-billings`,S.pageSize,S.currentPage,S.totalPages)}

      <div id="billing-modal" class="member-modal">
  <div class="member-modal-box">
    <h2>➕ 추가 청구</h2>

    <label>회원명</label>
    <select id="billing-member-id">
      ${(f||[]).map(e=>`
        <option value="${e.id}">
          ${e.member_name||``}
        </option>
      `).join(``)}
    </select>

    <label>청구월</label>
    <input id="billing-month" type="month" />

    <label>금액</label>
    <input id="billing-amount" placeholder="금액" />

    <label>메모</label>
    <textarea id="billing-memo" placeholder="메모"></textarea>

    <div class="member-modal-actions">
      <button id="save-billing-btn">저장</button>
      <button id="close-billing-modal">닫기</button>
    </div>
  </div>
</div>
</div>
  `,Qb(),document.querySelector(`#billing-date-search-btn`)?.addEventListener(`click`,()=>{let e=document.querySelector(`#billing-start-date`)?.value||``,t=document.querySelector(`#billing-end-date`)?.value||``,n=(document.querySelector(`#billing-member-search-input`)?.value||``).trim();if(!e||!t){alert(`시작일과 종료일을 선택해주세요.`);return}if(e>t){alert(`시작일이 종료일보다 늦을 수 없습니다.`);return}sessionStorage.setItem(`academy_billings_page`,`1`);let r=new URLSearchParams;r.set(`billing_start_date`,e),r.set(`billing_end_date`,t),n&&r.set(`billing_member_keyword`,n),location.href=`/merchant-billings?`+r.toString()}),tx(`academy-billings`,`academy_billings`,S.currentPage,S.totalPages),document.querySelectorAll(`.billing-complete-btn`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=Number(e.dataset.id);if(!t){alert(`청구 정보를 찾을 수 없습니다.`);return}if(!confirm(`이 청구건을 완료처리하시겠습니까?`))return;let{error:n}=await X.from(`billings`).update({payment_status:`완료`}).eq(`id`,t);if(n){alert(`완료처리 실패: `+n.message);return}alert(`완료처리되었습니다.`),location.reload()})}),document.querySelectorAll(`.billing-delete-btn`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=Number(t.dataset.id||0);if(!n){alert(`청구정보를 찾을 수 없습니다.`);return}if(!confirm(`이 청구건을 취소하시겠습니까?

아직 결제되지 않은 청구건만 취소할 수 있습니다.`))return;let{data:r,error:i}=await X.from(`billings`).select(`id, payment_status`).eq(`id`,n).eq(`merchant_id`,e).single();if(i||!r){alert(`청구정보 조회 실패`);return}if((r.payment_status||`미납`)!==`미납`){alert(`이미 결제 완료된 청구건은 여기서 취소할 수 없습니다.`);return}let{error:a}=await X.from(`billings`).delete().eq(`id`,n).eq(`merchant_id`,e);if(a){alert(`청구취소 실패: `+a.message);return}alert(`청구가 취소되었습니다.`),location.reload()})}),document.querySelector(`#add-billing-btn`)?.addEventListener(`click`,()=>{document.querySelector(`#billing-modal`).style.display=`flex`}),document.querySelector(`#close-billing-modal`)?.addEventListener(`click`,()=>{document.querySelector(`#billing-modal`).style.display=`none`}),document.querySelector(`#bulk-add-billing-btn`)?.addEventListener(`click`,async()=>{let t=Array.from(document.querySelectorAll(`.billing-send-check:checked`)).map(e=>Number(e.dataset.id));if(t.length===0){alert(`추가청구할 회원을 선택해주세요.`);return}let n=prompt(`추가 청구금액을 입력해주세요.
예: 30000`);if(!n)return;let r=Number(n.replace(/,/g,``).trim());if(!r||r<=0){alert(`추가금액을 올바르게 입력해주세요.`);return}let a=(prompt(`추가청구 내용을 입력해주세요.
예: 교재비, 재료비, 추가수업비`)||``).trim();if(!a){alert(`추가청구 내용을 입력해주세요.`);return}let{data:o,error:s}=await X.from(`billings`).select(`*`).eq(`merchant_id`,e).in(`id`,t);if(s){alert(`청구 조회 실패: `+s.message);return}if(!o||o.length===0){alert(`선택한 청구정보를 찾을 수 없습니다.`);return}let c=o.map(t=>({merchant_id:e,member_id:Number(t.member_id),billing_month:t.billing_month||i,amount:r,memo:`추가청구 - `+a,payment_status:`미납`,send_status:`미발송`})),{error:l}=await X.from(`billings`).insert(c);if(l){alert(`추가청구 등록 실패: `+l.message);return}alert(o.length+`건의 추가청구가 등록되었습니다.

추가금액: `+r.toLocaleString()+`원
내용: `+a),location.reload()}),document.querySelector(`#billing-kakao-send-btn`)?.addEventListener(`click`,()=>{alert(`준비중`)})}else if(Q===`/merchant-academy-payments`){let e=Number(sessionStorage.getItem(`login_merchant_id`));e||(alert(`로그인이 필요합니다.`),location.href=`/merchant-login`);let t=new Date,n=t.getFullYear(),r=t.getMonth()+1,i=n+`-`+String(r).padStart(2,`0`),a=i+`-01`,o=new Date(n,r,0).getDate(),s=i+`-`+String(o).padStart(2,`0`),c=new URLSearchParams(location.search),l=c.get(`payment_start_date`)||a,u=c.get(`payment_end_date`)||s,d=(c.get(`payment_member_keyword`)||``).trim().toLowerCase(),{data:f}=await X.from(`members`).select(`*`).eq(`merchant_id`,e),{data:p,error:m}=await X.from(`payments`).select(`*`).eq(`merchant_id`,e).order(`id`,{ascending:!1});m&&alert(`결제내역 조회 실패: `+m.message);let h=(p||[]).filter(e=>{let t=String(e.approved_at||e.created_at||``).slice(0,10);if(!t)return!1;let n=String(e.sender_name||e.buyer_name||``).trim().toLowerCase(),r=t>=l&&t<=u,i=!d||n.includes(d);return r&&i}),g=$b(h.length,`academy_payments`),_=h.slice(g.startIndex,g.startIndex+g.pageSize);Z.innerHTML=`
    <div class="merchant-members-page">

      <h1>결제내역</h1>

      ${Zb(`payments`)}


      <div class="billing-date-search">

        <input
          id="academy-payment-start-date"
          type="date"
          value="${l}"
        />

        <span>~</span>

        <input
          id="academy-payment-end-date"
          type="date"
          value="${u}"
        />

        <input
  id="academy-payment-member-search-input"
  type="text"
  placeholder="회원명 입력"
  value="${c.get(`payment_member_keyword`)||``}"
/>

        <button
          id="academy-payment-search-btn"
          type="button"
        >
          검색
        </button>

      </div>


      <table class="admin-table academy-payment-table">

        <thead>
          <tr>
            <th>No</th>
            <th>승인일시</th>
            <th>회원명</th>
            <th>결제금액</th>
            <th>카드번호</th>
            <th>승인번호</th>
            <th>결제상태</th>
          </tr>
        </thead>

        <tbody>

          ${_.map((e,t)=>{let n=(f||[]).find(t=>Number(t.id)===Number(e.member_id)),r=e.card_number?String(e.card_number):`-`;return`
                <tr>

                  <td>
                    ${g.startIndex+t+1}
                  </td>

                  <td>
  <button
  type="button"
  class="academy-receipt-link"
  data-id="${e.id}"
  style="
    border:0;
    background:#174981;
    color:#ffffff;
    padding:6px 10px;
    width:170px;
    border-radius:7px;
    cursor:pointer;
    font:inherit;
    font-weight:700;
    white-space:nowrap;
  "
>
    ${e.approved_at||e.created_at||`-`}
  </button>
</td>

                  <td>
                    ${n?.member_name||e.buyer_name||e.sender_name||`-`}
                  </td>

                  <td>
                    ${Number(e.amount||0).toLocaleString()}원
                  </td>

                  <td>
                    ${r}
                  </td>

                  <td>
  ${e.status===`cancel`?e.approval_number||`취소완료`:`
        <button
  type="button"
  class="academy-cancel-approval-link"
  data-payment-id="${e.id}"
  data-amount="${e.amount||0}"
  data-created-at="${e.approved_at||e.created_at||``}"
  data-pg="${e.pg_company||``}"
  style="
    border:0;
    background:#174981;
    color:#ffffff;
    padding:6px 10px;
    width:110px;
    border-radius:7px;
    cursor:pointer;
    font:inherit;
    font-weight:700;
    white-space:nowrap;
  "
>
  ${e.approval_number||`-`}
</button>
      `}
</td>

                  <td>
                    ${e.status||e.order_status||`-`}
                  </td>

                </tr>
              `}).join(``)}

        </tbody>

      </table>


      ${ex(`academy-payments`,g.pageSize,g.currentPage,g.totalPages)}

      <div id="academy-cancel-modal" class="cancel-modal">
  <div class="cancel-box">

    <h3>결제 취소</h3>

    <p id="academy-cancel-order-info">
      결제를 취소하시겠습니까?
    </p>

    <input
      id="academy-cancel-password"
      type="password"
      placeholder="취소 비밀번호 입력"
    />

    <textarea
      id="academy-cancel-reason"
      placeholder="취소 사유 입력"
    ></textarea>

    <div class="cancel-button-row">

      <button id="academy-direct-cancel-button">
        직접 취소
      </button>

      <button id="academy-request-cancel-button">
        본사 승인요청
      </button>

      <button id="academy-close-cancel-modal">
        닫기
      </button>

    </div>

  </div>
</div>

    </div>
  `,Qb(),tx(`academy-payments`,`academy_payments`,g.currentPage,g.totalPages),document.querySelectorAll(`.academy-cancel-approval-link`).forEach(e=>{e.addEventListener(`click`,()=>{let t=document.querySelector(`#academy-cancel-modal`);if(!t)return;let n=e.dataset.paymentId||``,r=Number(e.dataset.amount||0),i=e.dataset.createdAt||``,a=e.dataset.pg||``,o=document.querySelector(`#academy-cancel-order-info`);o&&(o.textContent=`결제금액 `+r.toLocaleString()+`원을 취소하시겠습니까?`),t.dataset.paymentId=n,t.dataset.createdAt=i,t.dataset.pg=a,t.style.display=`flex`})}),document.querySelector(`#academy-close-cancel-modal`)?.addEventListener(`click`,()=>{let e=document.querySelector(`#academy-cancel-modal`);e&&(e.style.display=`none`)}),document.querySelector(`#academy-direct-cancel-button`)?.addEventListener(`click`,async()=>{let e=document.querySelector(`#academy-cancel-modal`);if(!e)return;let t=Number(e.dataset.paymentId||0),n=e.dataset.createdAt||``,r=(document.querySelector(`#academy-cancel-password`)?.value||``).trim(),i=(document.querySelector(`#academy-cancel-reason`)?.value||``).trim();if(!t){alert(`취소할 결제정보를 찾을 수 없습니다.`);return}if(!i){alert(`취소 사유를 입력해주세요.`);return}let a=new Date().toISOString().slice(0,10);if(n.slice(0,10)!==a){alert(`당일 결제건만 직접 취소할 수 있습니다.
본사 승인요청을 이용해주세요.`);return}if(r!==`1234`){alert(`취소 비밀번호가 일치하지 않습니다.`);return}let{data:o,error:s}=await X.from(`payments`).select(`id, merchant_id, pg_company, payment_key, status`).eq(`id`,t).single();if(s||!o){alert(`결제정보를 불러오지 못했습니다.`);return}if(o.status===`cancel`){alert(`이미 취소된 결제입니다.`);return}let c=document.querySelector(`#academy-direct-cancel-button`);c&&(c.disabled=!0,c.textContent=`취소 처리 중...`);try{if(o.pg_company===`코페이`){let e=await fetch(`/api/korpay-cancel`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({paymentId:Number(o.id),cancelName:sessionStorage.getItem(`login_merchant_name`)||`가맹점`,cancelMessage:i})}),t=await e.json();if(!e.ok||!t.success){alert(`코페이 실제 취소에 실패했습니다.

`+(t.message||`알 수 없는 오류`));return}}else if(o.pg_company===`토스페이먼츠`){if(!o.payment_key){alert(`토스 paymentKey가 없습니다.`);return}let e=await fetch(`/api/toss-cancel`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({paymentKey:o.payment_key,cancelReason:i})}),t=await e.json();if(!e.ok){alert(`토스 실제 취소에 실패했습니다.

`+(t.message||`알 수 없는 오류`));return}let{error:n}=await X.from(`payments`).update({status:`cancel`,canceled_at:new Date().toISOString(),payout_status:`출금제외`,settlement_status:`취소`}).eq(`id`,Number(o.id));if(n){alert(`토스 취소는 성공했지만 결제내역 수정에 실패했습니다.
`+n.message);return}}else{alert(`직접 취소를 지원하지 않는 PG사입니다.
결제 PG사: `+(o.pg_company||`-`));return}alert(`결제가 취소되었습니다.`),location.reload()}catch(e){console.error(e),alert(`취소 처리 중 오류가 발생했습니다.`)}finally{c&&(c.disabled=!1,c.textContent=`직접 취소`)}}),document.querySelector(`#academy-request-cancel-button`)?.addEventListener(`click`,async()=>{let e=document.querySelector(`#academy-cancel-modal`);if(!e)return;let t=Number(e.dataset.paymentId||0),n=(document.querySelector(`#academy-cancel-reason`)?.value||``).trim();if(!t){alert(`취소할 결제정보를 찾을 수 없습니다.`);return}if(!n){alert(`취소 사유를 입력해주세요.`);return}let r=document.querySelector(`#academy-request-cancel-button`);r&&(r.disabled=!0,r.textContent=`요청 처리 중...`);try{let{data:e,error:r}=await X.from(`payments`).select(`
            id,
            merchant_id,
            merchant_name,
            amount,
            settlement_amount,
            manager_admin_id,
            manager_admin_name,
            status
          `).eq(`id`,t).single();if(r||!e){alert(`결제정보를 불러오지 못했습니다.`);return}if(e.status===`cancel`){alert(`이미 취소된 결제입니다.`);return}let{data:i}=await X.from(`cancel_requests`).select(`id`).eq(`payment_id`,Number(e.id)).eq(`status`,`요청중`).maybeSingle();if(i){alert(`이미 본사 승인요청이 접수된 거래입니다.`);return}let{error:a}=await X.from(`cancel_requests`).insert({payment_id:Number(e.id),merchant_id:Number(e.merchant_id),manager_admin_id:e.manager_admin_id||null,manager_admin_name:e.manager_admin_name||null,reason:n,status:`요청중`});if(a){alert(`본사 승인요청 저장에 실패했습니다.
`+a.message);return}let{error:o}=await X.from(`payments`).update({payout_hold:!0,payout_hold_reason:`익일 취소 본사 승인요청: `+n,payout_hold_at:new Date().toISOString(),payout_status:`지급정지`}).eq(`id`,Number(e.id));if(o){alert(`취소요청은 접수됐지만 지급정지 처리에 실패했습니다.
`+o.message);return}let s=Number(e.settlement_amount||0);alert(`본사 승인요청이 접수되었습니다.

지급상태: 지급정지
반환 예정금액: `+(s+500).toLocaleString()+`원

본사 안내 후 지정 계좌로 입금해주세요.`),location.reload()}catch(e){console.error(e),alert(`본사 승인요청 중 오류가 발생했습니다.`)}finally{r&&(r.disabled=!1,r.textContent=`본사 승인요청`)}}),document.querySelectorAll(`.academy-receipt-link`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=Number(e.dataset.id||0);if(!t)return;let{data:n,error:r}=await X.from(`payments`).select(`*`).eq(`id`,t).single();if(r||!n){alert(`영수증 정보를 불러오지 못했습니다.`);return}let{data:i}=await X.from(`merchants`).select(`*`).eq(`id`,Number(n.merchant_id)).maybeSingle(),a=n.status===`cancel`,o=Number(n.amount||0),s=Math.floor(o*10/11),c=o-s,l=n.approved_at||n.created_at?new Date(n.approved_at||n.created_at).toLocaleString(`ko-KR`):`-`,u=n.canceled_at?new Date(n.canceled_at).toLocaleString(`ko-KR`):`-`,d=`
          <div
  id="academy-receipt-modal"
  class="receipt-modal"
  style="display:flex;"
>
  <div
    class="receipt-box receipt-approve ${a?`academy-receipt-cancel`:``}"
  >

              <div class="receipt-header ${a?`receipt-cancel-mode`:`receipt-approve-mode`}">

                <h2>NXG PICK</h2>

                <h3 class="${a?`receipt-cancel-title`:`receipt-approve-title`}">
                  신용카드 매출전표
                  <span>
                    ${a?`(취소)`:`(승인)`}
                  </span>
                </h3>

              </div>


              <section>
                <h4>결제정보</h4>

                <table>

                  <tr>
                    <th>카드번호</th>
                    <td>
                      ${n.card_number||`-`}
                    </td>

                    <th>카드종류</th>
                    <td>신용카드</td>
                  </tr>

                  <tr>
                    <th>거래종류</th>

                    <td class="${a?`receipt-cancel-text`:`receipt-approve-text`}">
                      ${a?`취소완료`:`승인성공`}
                    </td>

                    <th>할부개월</th>
                    <td>
                      ${n.installment_months||`일시불`}
                    </td>
                  </tr>

                  <tr>
                    <th>거래일시</th>
                    <td colspan="3">
                      ${l}
                    </td>
                  </tr>

                  ${a?`
                        <tr>
                          <th>취소시각</th>
                          <td colspan="3">
                            ${u}
                          </td>
                        </tr>
                      `:``}

                </table>
              </section>


              <div class="receipt-grid">

                <section>
                  <h4>구매정보</h4>

                  <table>

                    <tr>
                      <th>회원명</th>
                      <td>
                        ${n.sender_name||n.buyer_name||`-`}
                      </td>
                    </tr>

                    <tr>
                      <th>승인번호</th>
                      <td>
                        ${n.approval_number||`-`}
                      </td>
                    </tr>

                    <tr>
                      <th>거래번호</th>
                      <td>
                        ${n.payment_key||`-`}
                      </td>
                    </tr>

                    <tr>
                      <th>요청사항</th>
                      <td>
                        ${n.message||`-`}
                      </td>
                    </tr>

                  </table>
                </section>


                <section>
                  <h4>결제금액정보</h4>

                  <table>

  <tr>
    <th>과세금액</th>
    <td>
      ${a?`-`+s.toLocaleString():s.toLocaleString()}원
    </td>
  </tr>

  <tr>
    <th>비과세금액</th>
    <td>0원</td>
  </tr>

  <tr>
    <th>부가세</th>
    <td>
      ${a?`-`+c.toLocaleString():c.toLocaleString()}원
    </td>
  </tr>

  <tr>
    <th>주문금액</th>
    <td>
      ${a?`-`+o.toLocaleString():o.toLocaleString()}원
    </td>
  </tr>

  <tr>
    <th>할인금액</th>
    <td>0원</td>
  </tr>

  <tr class="receipt-total">
    <th>총 결제금액</th>
    <td>
      ${a?`-`+o.toLocaleString():o.toLocaleString()}원
    </td>
  </tr>

</table>
                </section>

              </div>


              <section>
                <h4>상점정보</h4>

                <table>

                  <tr>
                    <th>상점명</th>
                    <td>
                      ${i?.merchant_name||n.merchant_name||`-`}
                    </td>

                    <th>대표자명</th>
                    <td>
                      ${i?.owner_name||`-`}
                    </td>
                  </tr>

                  <tr>
                    <th>URL주소</th>
                    <td>-</td>

                    <th>사업자번호</th>
                    <td>
                      ${i?.business_number||`-`}
                    </td>
                  </tr>

                  <tr>
                    <th>이용문의</th>
                    <td colspan="3">
                      ${i?.phone||`-`}
                    </td>
                  </tr>

                  <tr>
                    <th>주소</th>
                    <td colspan="3">
                      ${[i?.address,i?.address_detail].filter(Boolean).join(` `)||`-`}
                    </td>
                  </tr>

                </table>
              </section>


              <section>
                <h4>결제서비스업체(PG)정보</h4>

                <table>

                  <tr>
                    <th>카드사 가맹점명</th>
                    <td>
                      ${n.pg_company||`-`}
                    </td>

                    <th>가맹점번호</th>
                    <td>
                      ${n.pg_mid||i?.toss_mid||i?.korpay_manual_mid||`-`}
                    </td>
                  </tr>

                  <tr>
                    <th>카드사</th>
                    <td>
                      ${n.card_company||`-`}
                    </td>

                    <th>결제방식</th>
                    <td>
                      ${n.payment_method||`-`}
                    </td>
                  </tr>

                </table>
              </section>


              <div class="receipt-actions">

                <button
                  id="academy-receipt-print"
                >
                  인쇄하기
                </button>

                <button
                  id="academy-receipt-close"
                >
                  닫기
                </button>

              </div>

            </div>
          </div>
        `;document.querySelector(`#academy-receipt-modal`)?.remove(),document.body.insertAdjacentHTML(`beforeend`,d),document.querySelector(`#academy-receipt-print`)?.addEventListener(`click`,()=>{window.print()}),document.querySelector(`#academy-receipt-close`)?.addEventListener(`click`,()=>{document.querySelector(`#academy-receipt-modal`)?.remove()})})}),document.querySelector(`#academy-payment-search-btn`)?.addEventListener(`click`,()=>{let e=document.querySelector(`#academy-payment-start-date`)?.value||``,t=document.querySelector(`#academy-payment-end-date`)?.value||``;if(!e||!t){alert(`시작일과 종료일을 선택해주세요.`);return}if(e>t){alert(`시작일이 종료일보다 늦을 수 없습니다.`);return}sessionStorage.setItem(`academy_payments_page`,`1`);let n=new URLSearchParams;n.set(`payment_start_date`,e),n.set(`payment_end_date`,t);let r=(document.querySelector(`#academy-payment-member-search-input`)?.value||``).trim();r&&n.set(`payment_member_keyword`,r),location.href=`/merchant-academy-payments?`+n.toString()})}else if(Q===`/merchant-batch`){let e=Number(sessionStorage.getItem(`login_merchant_id`));e||(alert(`로그인이 필요합니다.`),location.href=`/merchant-login`);let{data:t}=await X.from(`members`).select(`*`).eq(`merchant_id`,e),{data:n}=await X.from(`billings`).select(`*`).eq(`merchant_id`,e).eq(`payment_status`,`미납`).order(`id`,{ascending:!1}),r=new Map;(n||[]).forEach(e=>{let n=(t||[]).find(t=>Number(t.id)===Number(e.member_id)),i=String(e.member_id)+`|`+String(e.billing_month||``),a=r.get(i);if(a){a.amount+=Number(e.amount||0),a.billing_count+=1,a.billing_ids.push(Number(e.id));return}r.set(i,{...e,member_name:n?.member_name||``,amount:Number(e.amount||0),billing_count:1,billing_ids:[Number(e.id)]})});let i=Array.from(r.values()),a=$b(i.length,`academy_batch`),o=i.slice(a.startIndex,a.startIndex+a.pageSize);Z.innerHTML=`
    <div class="merchant-members-page">
      <h1>수기결제</h1>

${Zb(`batch`)}

      <div class="academy-batch-tools">

  <button id="batch-template-download-btn">
    📥 선택건 엑셀 다운로드
  </button>

  <label
    for="batch-excel-file"
    class="academy-batch-upload-label"
  >
    📂 결제파일 선택
  </label>

  <input
    id="batch-excel-file"
    type="file"
    accept=".xlsx,.xls"
    style="display:none;"
  />

  <button id="batch-excel-load-btn">
    엑셀 불러오기
  </button>

  <button id="batch-complete-btn">
    💳 선택건 결제
  </button>

</div>

<div
  id="batch-excel-file-name"
  class="academy-batch-file-name"
>
  선택된 파일 없음
</div>

<div
  id="batch-excel-preview"
  class="academy-batch-excel-preview"
  style="display:none;"
>
</div>

      <table class="admin-table academy-batch-table">
        <thead>
          <tr>
            <th>
  <input type="checkbox" id="batch-check-all" />
</th>
            <th>회원명</th>
            <th>청구월</th>
            <th>금액</th>
            <th>상태</th>
          </tr>
        </thead>

        <tbody>
  ${o.map(e=>`
    <tr>
      <td>
        <input
  type="checkbox"
  class="batch-billing-check"
  data-id="${e.id}"
  data-ids="${(e.billing_ids||[]).join(`,`)}"
/>
      </td>

      <td>
        ${e.member_name||``}
      </td>

      <td>
        ${e.billing_month||``}
      </td>

      <td>
        ${Number(e.amount||0).toLocaleString()}원
      </td>

      <td>
        ${Number(e.billing_count||1)>1?`미납 (`+e.billing_count+`건 합산)`:`미납`}
      </td>
    </tr>
  `).join(``)}
</tbody>
      </table>

      ${ex(`academy-batch`,a.pageSize,a.currentPage,a.totalPages)}

      <div id="payment-method-modal" class="modal-overlay" style="display:none;">
  <div class="modal-box">

    <h2>💳 결제방식 선택</h2>

    <div id="payment-method-summary" class="payment-method-summary">
  선택건수: 0건<br />
  총 결제금액: 0원
</div>

<button id="pay-qr-btn" class="payment-method-btn">
  🔳 QR결제
</button>

<button id="pay-cash-receipt-btn" class="payment-method-btn">
  🧾 현금영수증
</button>

<button id="close-payment-method-modal">
  닫기
</button>

  </div>
</div>
    </div>
  `,Qb(),tx(`academy-batch`,`academy_batch`,a.currentPage,a.totalPages),document.querySelector(`#batch-template-download-btn`)?.addEventListener(`click`,()=>{let e=Array.from(document.querySelectorAll(`.batch-billing-check:checked`)).flatMap(e=>String(e.dataset.ids||``).split(`,`).map(e=>Number(e)).filter(e=>e>0));if(e.length===0){alert(`엑셀로 내려받을 청구건을 선택해주세요.`);return}let r=(n||[]).filter(t=>e.includes(Number(t.id))),i=new Map;r.forEach(e=>{let n=(t||[]).find(t=>Number(t.id)===Number(e.member_id)),r=String(e.member_id)+`|`+String(e.billing_month||``),a=i.get(r);if(a){a.결제금액+=Number(e.amount||0),a.청구ID+=`,`+String(e.id),a.상품명=`정기/추가청구 합산`;return}i.set(r,{청구ID:String(e.id),회원명:n?.member_name||``,청구월:e.billing_month||``,결제금액:Number(e.amount||0),카드번호:``,유효기간월:``,유효기간년:``,할부개월:`00`,상품명:e.memo?.includes(`추가청구`)?`추가청구`:`정기결제`,연락처:n?.phone||``})});let a=Array.from(i.values()),o=wb.json_to_sheet(a);for(let e=2;e<=a.length+1;e+=1){let t=o[`E${e}`];t&&(t.t=`s`,t.z=`@`)}o[`!cols`]=[{wch:10},{wch:24},{wch:12},{wch:14},{wch:24},{wch:12},{wch:12},{wch:12},{wch:20},{wch:18}];let s=wb.book_new();wb.book_append_sheet(s,o,`수기결제`),ib(s,`아카데미_수기결제_${new Date().toISOString().slice(0,10)}.xlsx`)});let s=document.querySelector(`#batch-excel-file`);s?.addEventListener(`change`,()=>{let e=document.querySelector(`#batch-excel-file-name`),t=s.files?.[0];e&&(e.textContent=t?t.name:`선택된 파일 없음`)});let c=[];document.querySelector(`#batch-excel-load-btn`)?.addEventListener(`click`,async()=>{let e=document.querySelector(`#batch-excel-file`)?.files?.[0];if(!e){alert(`결제할 엑셀 파일을 선택해주세요.`);return}try{let t=Jy(await e.arrayBuffer(),{type:`array`}),n=t.SheetNames[0];if(!n){alert(`엑셀 시트를 찾을 수 없습니다.`);return}let r=t.Sheets[n],i=wb.sheet_to_json(r,{defval:``,raw:!1});if(i.length===0){alert(`엑셀에 결제 데이터가 없습니다.`);return}c=i.map(e=>{let t=String(e.청구ID||``).split(`,`).map(e=>Number(String(e).trim())).filter(e=>e>0),n=String(e.회원명||``).trim(),r=String(e.청구월||``).trim(),i=Number(String(e.결제금액||`0`).replace(/,/g,``).replace(/원/g,``).trim()),a=String(e.카드번호||``).replace(/[^0-9]/g,``),o=String(e.유효기간월||``).replace(/[^0-9]/g,``).padStart(2,`0`).slice(-2),s=String(e.유효기간년||``).replace(/[^0-9]/g,``).slice(-2),c=String(e.할부개월||`00`).replace(/[^0-9]/g,``).padStart(2,`0`).slice(-2),l=String(e.상품명||`정기결제`).trim(),u=String(e.연락처||``).replace(/[^0-9]/g,``),d=[];return t.length===0&&d.push(`청구ID 없음`),n||d.push(`회원명 없음`),(!i||i<=0)&&d.push(`결제금액 오류`),(a.length<14||a.length>16)&&d.push(`카드번호 오류`),(Number(o)<1||Number(o)>12)&&d.push(`유효기간 월 오류`),s.length!==2&&d.push(`유효기간 년 오류`),{billingIds:t,memberName:n,billingMonth:r,amount:i,cardNumber:a,expiryMonth:o,expiryYear:s,installment:c,productName:l,phone:u,valid:d.length===0,errorMessage:d.join(`, `)}});let a=document.querySelector(`#batch-excel-preview`);if(!a)return;let o=c.filter(e=>e.valid).length,s=c.length-o,l=c.filter(e=>e.valid).reduce((e,t)=>e+t.amount,0);a.innerHTML=`
        <div class="academy-batch-preview-summary">

          <strong>
            총 ${c.length}건
          </strong>

          <span>
            정상 ${o}건
          </span>

          <span>
            오류 ${s}건
          </span>

          <span>
            결제예정 ${l.toLocaleString()}원
          </span>

        </div>

        <div class="academy-batch-preview-table-wrap">

          <table class="academy-batch-preview-table">

            <thead>
              <tr>
                <th>No</th>
                <th>회원명</th>
                <th>청구월</th>
                <th>결제금액</th>
                <th>카드번호</th>
                <th>유효기간</th>
                <th>할부</th>
                <th>상품명</th>
                <th>연락처</th>
                <th>상태</th>
              </tr>
            </thead>

            <tbody>

              ${c.map((e,t)=>{let n=e.cardNumber.length>=4?e.cardNumber.slice(-4):``,r=n?`****-${n}`:`-`;return`
                      <tr>

                        <td>
                          ${t+1}
                        </td>

                        <td>
                          ${e.memberName||`-`}
                        </td>

                        <td>
                          ${e.billingMonth||`-`}
                        </td>

                        <td>
                          ${e.amount.toLocaleString()}원
                        </td>

                        <td>
                          ${r}
                        </td>

                        <td>
                          ${e.expiryMonth&&e.expiryYear?e.expiryMonth+`/`+e.expiryYear:`-`}
                        </td>

                        <td>
                          ${e.installment===`00`?`일시불`:Number(e.installment)+`개월`}
                        </td>

                        <td>
                          ${e.productName||`-`}
                        </td>

                        <td>
                          ${e.phone||`-`}
                        </td>

                        <td>
                          ${e.valid?`
                                <span class="academy-batch-valid">
                                  정상
                                </span>
                              `:`
                                <span
  class="academy-batch-invalid"
  title="${e.errorMessage}"
>
  오류 - ${e.errorMessage}
</span>
                              `}
                        </td>

                      </tr>
                    `}).join(``)}

            </tbody>

          </table>

        </div>
      `,a.style.display=`block`,a.insertAdjacentHTML(`beforeend`,`
          <div class="academy-batch-submit-wrap">
            <button
              id="academy-batch-payment-submit"
              type="button"
            >
              💳 일괄 결제 실행
            </button>
          </div>
        `),document.querySelector(`#academy-batch-payment-submit`)?.addEventListener(`click`,async()=>{let e=Number(sessionStorage.getItem(`login_merchant_id`)||0);if(!e){alert(`가맹점 정보를 찾을 수 없습니다.`);return}let t=c.filter(e=>e.valid);if(t.length===0){alert(`결제 가능한 정상 데이터가 없습니다.`);return}let n=c.length-t.length;if(n>0){alert(`오류 데이터가 `+n+`건 있습니다.
오류건을 수정한 뒤 다시 불러와주세요.`);return}let r=t.reduce((e,t)=>e+Number(t.amount||0),0);if(!confirm(`총 `+t.length+`건을 결제합니다.
총 결제금액: `+r.toLocaleString()+`원

결제를 실행하시겠습니까?`))return;let i=document.querySelector(`#academy-batch-payment-submit`);i&&(i.disabled=!0,i.textContent=`결제 처리 중...`);let a=0,o=0,s=[];try{for(let n=0;n<t.length;n+=1){let r=t[n];i&&(i.textContent=`결제 처리 중 `+(n+1)+` / `+t.length);try{let t=r.expiryYear+r.expiryMonth,n=await fetch(`/api/korpay-manual-pay`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({merchantId:e,amount:r.amount,cardNumber:r.cardNumber,expiryYymm:t,installment:r.installment,buyerName:r.memberName,billingIds:r.billingIds,goodsName:r.productName||`정기결제`,customerPhone:r.phone||``})}),i=await n.json();if(!n.ok||!i.success){o+=1,s.push(r.memberName+` : `+(i.message||`결제 실패`));continue}let{error:c}=await X.from(`billings`).update({payment_status:`완료`}).in(`id`,r.billingIds).eq(`merchant_id`,e);if(c){o+=1,s.push(r.memberName+` : 결제 승인 성공 / 청구 완료처리 실패`);continue}let l=String(i.tid||``).trim(),u=String(i.orderId||``).trim(),d=null;for(let t=0;t<6;t+=1){let t=null;if(l){let{data:n}=await X.from(`payments`).select(`id`).eq(`merchant_id`,e).eq(`payment_key`,l).maybeSingle();t=n}if(!t&&u){let{data:n}=await X.from(`payments`).select(`id`).eq(`merchant_id`,e).eq(`order_id`,u).maybeSingle();t=n}if(t?.id){d=Number(t.id);break}await new Promise(e=>setTimeout(e,300))}if(d){let{error:e}=await X.from(`payments`).update({sender_name:r.memberName,message:`아카데미 정기결제 / 청구ID `+r.billingIds.join(`,`)}).eq(`id`,d);e&&console.error(`아카데미 회원명 저장 실패:`,e)}r.cardNumber=``,r.expiryMonth=``,r.expiryYear=``,a+=1}catch(e){console.error(`다건 수기결제 행 오류:`,e),o+=1,s.push(r.memberName+` : 결제 요청 오류`)}}let n=`일괄결제가 완료되었습니다.

성공: `+a+`건
실패: `+o+`건`;s.length>0&&(n+=`

[실패내역]
`+s.slice(0,10).join(`
`)),alert(n),c.forEach(e=>{e.cardNumber=``,e.expiryMonth=``,e.expiryYear=``}),a>0&&location.reload()}finally{i&&(i.disabled=!1,i.textContent=`💳 일괄 결제 실행`)}})}catch(e){console.error(`엑셀 불러오기 실패:`,e),alert(`엑셀 파일을 읽는 중 오류가 발생했습니다.`)}}),document.querySelector(`#batch-check-all`)?.addEventListener(`change`,e=>{let t=e.target.checked;document.querySelectorAll(`.batch-billing-check`).forEach(e=>{e.checked=t})}),document.querySelector(`#batch-complete-btn`)?.addEventListener(`click`,async()=>{let e=Array.from(document.querySelectorAll(`.batch-billing-check:checked`)).map(e=>Number(e.dataset.id)),t=(n||[]).filter(t=>e.includes(t.id)).reduce((e,t)=>e+Number(t.amount||0),0),r=document.querySelector(`#payment-method-summary`);r&&(r.innerHTML=`선택건수: `+e.length+`건<br />총 결제금액: `+t.toLocaleString()+`원`);let i=document.querySelector(`#payment-method-modal`);i&&(i.style.display=`flex`)}),document.querySelector(`#close-payment-method-modal`)?.addEventListener(`click`,()=>{let e=document.querySelector(`#payment-method-modal`);e&&(e.style.display=`none`)}),document.querySelector(`#pay-qr-btn`)?.addEventListener(`click`,()=>{let e=Array.from(document.querySelectorAll(`.batch-billing-check:checked`)).flatMap(e=>String(e.dataset.ids||e.dataset.id||``).split(`,`).map(e=>Number(e)).filter(e=>e>0)),t=(n||[]).filter(t=>e.includes(Number(t.id))).reduce((e,t)=>e+Number(t.amount||0),0);sessionStorage.setItem(`academy_qr_billing_ids`,e.join(`,`)),sessionStorage.setItem(`academy_qr_amount`,String(t)),location.href=`/merchant-qr`}),document.querySelector(`#pay-cash-receipt-btn`)?.addEventListener(`click`,()=>{let t=Array.from(document.querySelectorAll(`.batch-billing-check:checked`)).flatMap(e=>String(e.dataset.ids||e.dataset.id||``).split(`,`).map(e=>Number(e)).filter(e=>e>0)),r=(n||[]).filter(e=>t.includes(Number(e.id))).reduce((e,t)=>e+Number(t.amount||0),0),i=document.querySelector(`#cash-receipt-modal`);i&&i.remove();let a=document.createElement(`div`);a.id=`cash-receipt-modal`,a.className=`cash-receipt-modal`,a.innerHTML=`
      <div class="cash-receipt-modal-card">

        <div class="cash-receipt-modal-header">

          <h3>현금영수증 발급</h3>

          <button
            type="button"
            id="cash-receipt-modal-close"
            class="cash-receipt-modal-close"
          >
            ×
          </button>

        </div>

        <div class="cash-receipt-modal-body">

          <label>구분</label>

          <select id="cash-receipt-type">
            <option value="소득공제">
              소득공제
            </option>

            <option value="지출증빙">
              지출증빙
            </option>
          </select>


          <label>결제금액</label>

          <input
  id="cash-receipt-amount"
  type="number"
  min="1"
  value="${r>0?r:``}"
  placeholder="결제금액 입력"
/>


          <label>
            휴대폰번호 / 사업자번호
          </label>

          <input
            id="cash-receipt-number"
            type="text"
            placeholder="숫자만 입력"
          />


          <label>품목명</label>

          <input
            id="cash-receipt-order-name"
            type="text"
            value="아카데미 현금결제"
          />


          <button
            type="button"
            id="cash-receipt-submit"
            class="cash-receipt-submit"
          >
            현금영수증 발급
          </button>

        </div>

      </div>
    `,document.body.appendChild(a);let o=document.querySelector(`#payment-method-modal`);o&&(o.style.display=`none`),document.querySelector(`#cash-receipt-modal-close`)?.addEventListener(`click`,()=>{a.remove()}),a.addEventListener(`click`,e=>{e.target===a&&a.remove()}),document.querySelector(`#cash-receipt-type`)?.addEventListener(`change`,()=>{let e=document.querySelector(`#cash-receipt-type`),t=document.querySelector(`#cash-receipt-number`);!e||!t||(t.placeholder=e.value===`지출증빙`?`사업자번호 10자리`:`휴대폰번호 또는 현금영수증 카드번호`)}),document.querySelector(`#cash-receipt-submit`)?.addEventListener(`click`,async()=>{let n=document.querySelector(`#cash-receipt-type`)?.value||``,r=Number(document.querySelector(`#cash-receipt-amount`)?.value||0),i=(document.querySelector(`#cash-receipt-number`)?.value||``).trim(),o=document.querySelector(`#cash-receipt-order-name`)?.value||`아카데미 현금결제`;if(!i){alert(n===`지출증빙`?`사업자번호를 입력해주세요.`:`휴대폰번호를 입력해주세요.`);return}let s=`CASH-`+e+`-`+Date.now(),c=document.querySelector(`#cash-receipt-submit`);c&&(c.disabled=!0,c.textContent=`발급 중...`);try{let c=await fetch(`/api/toss-cash-receipt`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({amount:r,orderId:s,orderName:o,type:n,customerIdentityNumber:i,taxFreeAmount:0})}),l=await c.json();if(!c.ok||!l.success){alert(`현금영수증 발급 실패: `+(l.message||`알 수 없는 오류`));return}let u=l?.data?.entityBody||l?.data?.cashReceipt||l?.cashReceipt||l?.data||l,d=Math.floor(r*10/11),f=r-d,p=i.replace(/[^0-9]/g,``),m=p.length>=7?p.slice(0,3)+`****`+p.slice(-4):p,h=String(u?.issueStatus||``),g=u?.issueNumber||u?.approvalNumber?`발급완료`:h===`FAILED`?`발급실패`:`발급요청`,_=sessionStorage.getItem(`login_merchant_name`)||localStorage.getItem(`login_merchant_name`)||`아카데미`,{error:v}=await X.from(`cash_receipts`).insert({merchant_id:e,merchant_name:_,order_id:s,order_name:o,receipt_type:n,identity_number_masked:m,amount:r,supply_amount:d,vat_amount:f,tax_free_amount:0,approval_number:u?.issueNumber||u?.approvalNumber||null,receipt_key:u?.receiptKey||null,pg_company:`토스페이먼츠`,status:g,issued_at:new Date().toISOString(),raw_response:l});if(v){alert(`현금영수증은 발급됐지만 내역 저장에 실패했습니다.
`+v.message);return}let{error:y}=await X.from(`billings`).update({payment_status:`완료`}).in(`id`,t);if(y){alert(`현금영수증은 발급됐지만 청구상태 변경에 실패했습니다.
`+y.message);return}alert(`현금영수증 발급이 완료되었습니다.`),a.remove(),location.reload()}catch(e){console.error(e),alert(`현금영수증 발급 중 오류가 발생했습니다.`)}finally{c&&(c.disabled=!1,c.textContent=`현금영수증 발급`)}})})}else if(Q===`/merchant-cash-receipts`){let e=Number(sessionStorage.getItem(`login_merchant_id`)),t=sessionStorage.getItem(`login_merchant_name`)||``;if(!e)alert(`로그인이 필요합니다.`),location.href=`/merchant-login`;else{let n=new Date().toLocaleDateString(`en-CA`,{timeZone:`Asia/Seoul`}),r=new URLSearchParams(location.search),i=r.get(`start`)||n,a=r.get(`end`)||n,o=new Date(i+`T00:00:00+09:00`).toISOString(),s=new Date(a+`T23:59:59.999+09:00`).toISOString(),{data:c,error:l}=await X.from(`cash_receipts`).select(`*`).eq(`merchant_id`,e).gte(`issued_at`,o).lte(`issued_at`,s).order(`issued_at`,{ascending:!1});l&&alert(`현금영수증 내역 조회 실패: `+l.message);let u=c||[],d=u.filter(e=>e.status!==`취소완료`).reduce((e,t)=>e+Number(t.amount||0),0);Z.innerHTML=`
      <div class="merchant-admin-page">

        <div class="merchant-card-header">

          <h1>
            현금영수증 내역
          </h1>

          <p>
            현금영수증 승인내역 확인 및 취소처리
          </p>

        </div>


        <div class="merchant-toolbar">

          <button
  id="cash-history-back"
  type="button"
  style="
    width:auto;
    min-width:90px;
  "
>
  카드결제
</button>

        </div>

<div
  style="
    display:flex;
    gap:10px;
    align-items:center;
    margin:20px 0;
    max-width:460px;
  "
>

  <input
    id="cash-history-start"
    type="date"
    value="${i}"
    style="
      width:140px;
      height:44px;
      box-sizing:border-box;
      padding:0 12px;
      font-size:14px;
    "
  />

  <span
    style="
      height:44px;
      display:flex;
      align-items:center;
      font-weight:700;
    "
  >
    ~
  </span>

  <input
    id="cash-history-end"
    type="date"
    value="${a}"
    style="
      width:140px;
      height:44px;
      box-sizing:border-box;
      padding:0 12px;
      font-size:14px;
    "
  />

  <button
    id="cash-history-search"
    type="button"
    style="
      width:90px;
      height:44px;
      flex:none;
      padding:0;
      box-sizing:border-box;
      font-size:14px;
      font-weight:700;
      position:relative;
top:-10px;
    "
  >
    조회
  </button>

</div>

        <div
          style="
            margin-bottom:20px;
            font-weight:700;
          "
        >
          정상 승인
          ${u.filter(e=>e.status!==`취소완료`).length.toLocaleString()}건
          /
          ${d.toLocaleString()}원
        </div>


        <div class="admin-table-wrap">

          <table class="admin-table">

            <thead>

              <tr>

                <th>No</th>
                <th>거래일시</th>
                <th>승인번호</th>
                <th>승인구분</th>
                <th>증빙번호</th>
                <th>품목명</th>
                <th>물품가액</th>
                <th>부가세</th>
                <th>승인금액</th>
                <th>상태</th>
                <th>영수증</th>
                <th>처리</th>

              </tr>

            </thead>


            <tbody>

              ${u.length===0?`
                    <tr>
                      <td
                        colspan="12"
                        style="
                          text-align:center;
                          padding:30px;
                        "
                      >
                        현금영수증 내역이 없습니다.
                      </td>
                    </tr>
                  `:u.map((e,t)=>{let n=e.issued_at?new Date(e.issued_at).toLocaleString(`ko-KR`,{timeZone:`Asia/Seoul`}):`-`;return`
                          <tr>

                            <td>
                              ${t+1}
                            </td>

                            <td>
                              ${n}
                            </td>

                            <td>
                              ${e.approval_number||`-`}
                            </td>

                            <td>
                              ${e.receipt_type||`-`}
                            </td>

                            <td>
                              ${e.identity_number_masked||`-`}
                            </td>

                            <td>
                              ${e.order_name||`-`}
                            </td>

                            <td>
                              ${Number(e.supply_amount||0).toLocaleString()}원
                            </td>

                            <td>
                              ${Number(e.vat_amount||0).toLocaleString()}원
                            </td>

                            <td>
                              <strong>
                                ${Number(e.amount||0).toLocaleString()}원
                              </strong>
                            </td>

                            <td>
                              ${e.status||`-`}
                            </td>

                            <td>

                              <button
                                type="button"
                                class="merchant-cash-approval-receipt"
                                data-id="${e.id}"
                              >
                                승인영수증
                              </button>

                              ${e.status===`취소완료`?`
                                    <button
                                      type="button"
                                      class="merchant-cash-cancel-receipt"
                                      data-id="${e.id}"
                                    >
                                      취소영수증
                                    </button>
                                  `:``}

                            </td>

                            <td>

                              ${e.status===`취소완료`?`취소완료`:e.receipt_key?`
                                      <button
                                        type="button"
                                        class="merchant-cash-cancel"
                                        data-id="${e.id}"
                                      >
                                        취소처리
                                      </button>
                                    `:`-`}

                            </td>

                          </tr>
                        `}).join(``)}

            </tbody>

          </table>

        </div>

      </div>
    `,document.querySelector(`#cash-history-back`)?.addEventListener(`click`,()=>{location.href=`/merchant-card`}),document.querySelector(`#cash-history-search`)?.addEventListener(`click`,()=>{let e=document.querySelector(`#cash-history-start`)?.value||n,t=document.querySelector(`#cash-history-end`)?.value||n;location.href=`/merchant-cash-receipts?start=`+encodeURIComponent(e)+`&end=`+encodeURIComponent(t)});let f=(e,n)=>{document.querySelector(`#merchant-cash-receipt-modal`)?.remove();let r=n?e.canceled_at:e.issued_at,i=r?new Date(r).toLocaleString(`ko-KR`,{timeZone:`Asia/Seoul`}):`-`,a=e.cancel_response?.data?.entityBody||e.cancel_response?.data?.cashReceipt||e.cancel_response?.data||{},o=a?.issueNumber||a?.approvalNumber||e.cancel_receipt_key||`-`,s=document.createElement(`div`);s.id=`merchant-cash-receipt-modal`,s.style.cssText=`
          position:fixed;
          inset:0;
          z-index:99999;
          background:rgba(0,0,0,0.55);
          display:flex;
          justify-content:center;
          align-items:center;
          padding:20px;
          box-sizing:border-box;
        `,s.innerHTML=`
          <div
            style="
              width:100%;
              max-width:520px;
              max-height:90vh;
              overflow:auto;
              background:white;
              border-radius:14px;
              padding:28px;
              box-sizing:border-box;
            "
          >

            <div
              style="
                text-align:center;
                border-bottom:3px solid ${n?`#c62828`:`#174981`};
                margin-bottom:24px;
                padding-bottom:18px;
              "
            >

              <h2
                style="
                  margin:0 0 8px;
                  color:${n?`#c62828`:`#174981`};
                "
              >
                ${n?`현금영수증 취소`:`현금영수증`}
              </h2>

              <strong>
                ${n?`취소 영수증`:`승인 영수증`}
              </strong>

            </div>


            <table
              style="
                width:100%;
                border-collapse:collapse;
              "
            >

              <tbody>

                <tr>
                  <th
                    style="padding:10px;border:1px solid #ddd;"
                  >
                    가맹점
                  </th>

                  <td
                    style="padding:10px;border:1px solid #ddd;"
                  >
                    ${t}
                  </td>
                </tr>


                <tr>
                  <th
                    style="padding:10px;border:1px solid #ddd;"
                  >
                    거래일시
                  </th>

                  <td
                    style="padding:10px;border:1px solid #ddd;"
                  >
                    ${i}
                  </td>
                </tr>


                <tr>
                  <th
                    style="padding:10px;border:1px solid #ddd;"
                  >
                    ${n?`취소처리번호`:`승인번호`}
                  </th>

                  <td
                    style="padding:10px;border:1px solid #ddd;"
                  >
                    ${n?o:e.approval_number||`-`}
                  </td>
                </tr>


                ${n?`
                      <tr>
                        <th
                          style="padding:10px;border:1px solid #ddd;"
                        >
                          원승인번호
                        </th>

                        <td
                          style="padding:10px;border:1px solid #ddd;"
                        >
                          ${e.approval_number||`-`}
                        </td>
                      </tr>
                    `:``}


                <tr>
                  <th
                    style="padding:10px;border:1px solid #ddd;"
                  >
                    승인구분
                  </th>

                  <td
                    style="padding:10px;border:1px solid #ddd;"
                  >
                    ${e.receipt_type||`-`}
                  </td>
                </tr>


                <tr>
                  <th
                    style="padding:10px;border:1px solid #ddd;"
                  >
                    증빙번호
                  </th>

                  <td
                    style="padding:10px;border:1px solid #ddd;"
                  >
                    ${e.identity_number_masked||`-`}
                  </td>
                </tr>


                <tr>
                  <th
                    style="padding:10px;border:1px solid #ddd;"
                  >
                    품목명
                  </th>

                  <td
                    style="padding:10px;border:1px solid #ddd;"
                  >
                    ${e.order_name||`-`}
                  </td>
                </tr>


                <tr>
                  <th
                    style="padding:10px;border:1px solid #ddd;"
                  >
                    물품가액
                  </th>

                  <td
                    style="padding:10px;border:1px solid #ddd;"
                  >
                    ${Number(e.supply_amount||0).toLocaleString()}원
                  </td>
                </tr>


                <tr>
                  <th
                    style="padding:10px;border:1px solid #ddd;"
                  >
                    부가세
                  </th>

                  <td
                    style="padding:10px;border:1px solid #ddd;"
                  >
                    ${Number(e.vat_amount||0).toLocaleString()}원
                  </td>
                </tr>


                <tr>

                  <th
                    style="
                      padding:12px;
                      border:1px solid #ddd;
                      background:${n?`#fff1f1`:`#f1f6fc`};
                    "
                  >
                    ${n?`취소금액`:`승인금액`}
                  </th>

                  <td
                    style="
                      padding:12px;
                      border:1px solid #ddd;
                      font-weight:800;
                      color:${n?`#c62828`:`#174981`};
                    "
                  >
                    ${Number(n?e.cancel_amount||e.amount||0:e.amount||0).toLocaleString()}원
                  </td>

                </tr>

              </tbody>

            </table>


            <div
              style="
                display:flex;
                gap:8px;
                justify-content:center;
                margin-top:24px;
              "
            >

              <button
                id="merchant-cash-receipt-print"
                type="button"
              >
                인쇄하기
              </button>

              <button
                id="merchant-cash-receipt-close"
                type="button"
              >
                닫기
              </button>

            </div>

          </div>
        `,document.body.appendChild(s),document.querySelector(`#merchant-cash-receipt-close`)?.addEventListener(`click`,()=>{s.remove()}),document.querySelector(`#merchant-cash-receipt-print`)?.addEventListener(`click`,()=>{window.print()}),s.addEventListener(`click`,e=>{e.target===s&&s.remove()})};document.querySelectorAll(`.merchant-cash-approval-receipt`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.id||0),n=u.find(e=>Number(e.id)===t);n&&f(n,!1)})}),document.querySelectorAll(`.merchant-cash-cancel-receipt`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.id||0),n=u.find(e=>Number(e.id)===t);n&&f(n,!0)})}),document.querySelectorAll(`.merchant-cash-cancel`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=Number(t.dataset.id||0),r=u.find(e=>Number(e.id)===n);if(!r||!r.receipt_key){alert(`취소할 현금영수증 정보가 없습니다.`);return}if(confirm(`현금영수증 ${Number(r.amount||0).toLocaleString()}원을 취소하시겠습니까?`)){t.disabled=!0,t.textContent=`취소 중...`;try{let t=await fetch(`/api/toss-cash-receipt-cancel`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({receiptKey:r.receipt_key})}),i=await t.json();if(!t.ok||!i.success){alert(`현금영수증 취소 실패: `+(i.message||`알 수 없는 오류`));return}let a=i?.data?.entityBody||i?.data?.cashReceipt||i?.data||i,{error:o}=await X.from(`cash_receipts`).update({status:`취소완료`,canceled_at:new Date().toISOString(),cancel_amount:Number(r.amount||0),cancel_receipt_key:a?.receiptKey||null,cancel_response:i}).eq(`id`,n).eq(`merchant_id`,e);if(o){alert(`현금영수증은 취소됐지만 내역 저장에 실패했습니다.
`+o.message);return}alert(`현금영수증 취소가 완료되었습니다.`),location.reload()}catch(e){console.error(`가맹점 현금영수증 취소 오류:`,e),alert(`현금영수증 취소 중 오류가 발생했습니다.`)}finally{t.disabled=!1,t.textContent=`취소처리`}}})})}}else if(Q===`/merchant-card`){let e=Number(sessionStorage.getItem(`login_merchant_id`));e||(alert(`로그인이 필요합니다.`),location.href=`/merchant-login`),Z.innerHTML=`
  <div class="merchant-admin-page">
    <div class="merchant-card-header">
      <h1>카드결제</h1>
      <p>카드결제 서비스를 선택해주세요.</p>
    </div>

    <div class="merchant-toolbar">
  <button id="card-go-order">주문관리</button>
  <button id="card-go-product">상품관리</button>
  <button id="card-go-qr">PICK QR</button>
  <button id="card-go-card">카드결제</button>
</div>

    <div class="merchant-card-payment-page">
      <div class="merchant-card-payment-grid">
        <button class="merchant-card-payment-box" id="ocr-card-payment">
          <strong>OCR 카드결제</strong>
          <span>실물카드 촬영 후 카드번호를 자동 인식하여 결제합니다.</span>
        </button>

        <button class="merchant-card-payment-box" id="manual-card-payment">
          <strong>일반 수기결제</strong>
          <span>카드번호와 유효기간을 직접 입력하여 결제합니다.</span>
        </button>

        <button class="merchant-card-payment-box" id="menu-card-payment">
          <strong>메뉴 선택 결제</strong>
          <span>상품을 선택한 뒤 카드결제를 진행합니다.</span>
        </button>

        <button class="merchant-card-payment-box" id="cash-receipt-payment">
  <strong>현금영수증</strong>
  <span>현금 결제 건의 소득공제 또는 지출증빙 영수증을 발급합니다.</span>
</button>

<button
  class="merchant-card-payment-box"
  id="cash-receipt-history"
>
  <strong>현금영수증 내역</strong>
  <span>
    현금영수증 승인내역 조회, 영수증 확인 및 취소처리를 합니다.
  </span>
</button>

<button
  class="merchant-card-payment-box"
  id="sms-card-payment"
>
  <strong>SMS결제</strong>
  <span>고객에게 온라인 카드결제 링크를 문자로 발송합니다.</span>
</button>

      </div>
    </div>
  </div>
`,document.querySelector(`#card-go-order`)?.addEventListener(`click`,()=>{location.href=`/merchant-admin`}),document.querySelector(`#card-go-product`)?.addEventListener(`click`,()=>{location.href=`/merchant-product`}),document.querySelector(`#card-go-qr`)?.addEventListener(`click`,()=>{location.href=`/merchant-qr`}),document.querySelector(`#card-go-card`)?.addEventListener(`click`,()=>{location.href=`/merchant-card`}),document.querySelector(`#merchant-card-logout`)?.addEventListener(`click`,()=>{sessionStorage.removeItem(`login_merchant_id`),sessionStorage.removeItem(`login_merchant_name`),sessionStorage.removeItem(`login_merchant_code`),location.href=`/merchant-login`}),document.querySelector(`#ocr-card-payment`)?.addEventListener(`click`,()=>{location.href=`/merchant-card-ocr?mode=ocr`}),document.querySelector(`#manual-card-payment`)?.addEventListener(`click`,()=>{location.href=`/merchant-card-ocr?mode=manual`}),document.querySelector(`#menu-card-payment`)?.addEventListener(`click`,()=>{location.href=`/kiosk?merchant_id=`+e}),document.querySelector(`#sms-card-payment`)?.addEventListener(`click`,()=>{location.href=`/merchant-card-sms`}),document.querySelector(`#cash-receipt-history`)?.addEventListener(`click`,()=>{location.href=`/merchant-cash-receipts`}),document.querySelector(`#cash-receipt-payment`)?.addEventListener(`click`,()=>{let t=document.querySelector(`#cash-receipt-modal`);t&&t.remove();let n=document.createElement(`div`);n.id=`cash-receipt-modal`,n.className=`cash-receipt-modal`,n.innerHTML=`
      <div class="cash-receipt-modal-card">

        <div class="cash-receipt-modal-header">
          <h3>현금영수증 발급</h3>

          <button
            type="button"
            id="cash-receipt-modal-close"
            class="cash-receipt-modal-close"
          >
            ×
          </button>
        </div>

        <div class="cash-receipt-modal-body">

          <label>구분</label>
          <select id="cash-receipt-type">
            <option value="소득공제">소득공제</option>
            <option value="지출증빙">지출증빙</option>
          </select>

          <label>결제금액</label>
          <input
            id="cash-receipt-amount"
            type="number"
            min="1"
            placeholder="금액 입력"
          />

          <label>휴대폰번호 / 사업자번호</label>
          <input
            id="cash-receipt-number"
            type="text"
            placeholder="숫자만 입력"
          />

          <label>품목명</label>
          <input
            id="cash-receipt-order-name"
            type="text"
            value="현금결제"
          />

          <button
            type="button"
            id="cash-receipt-submit"
            class="cash-receipt-submit"
          >
            현금영수증 발급
          </button>

        </div>

      </div>
    `,document.body.appendChild(n),document.querySelector(`#cash-receipt-modal-close`)?.addEventListener(`click`,()=>{n.remove()}),n.addEventListener(`click`,e=>{e.target===n&&n.remove()}),document.querySelector(`#cash-receipt-type`)?.addEventListener(`change`,()=>{let e=document.querySelector(`#cash-receipt-type`),t=document.querySelector(`#cash-receipt-number`);!e||!t||(t.placeholder=e.value===`지출증빙`?`사업자번호 10자리`:`휴대폰번호 또는 현금영수증 카드번호`)}),document.querySelector(`#cash-receipt-submit`)?.addEventListener(`click`,async()=>{let t=document.querySelector(`#cash-receipt-type`)?.value||``,n=Number(document.querySelector(`#cash-receipt-amount`)?.value||0),r=document.querySelector(`#cash-receipt-number`)?.value||``,i=document.querySelector(`#cash-receipt-order-name`)?.value||`현금결제`;if(n<=0){alert(`결제금액을 입력해주세요.`);return}if(!r.trim()){alert(t===`지출증빙`?`사업자번호를 입력해주세요.`:`휴대폰번호를 입력해주세요.`);return}let a=`CASH-`+e+`-`+Date.now(),o=document.querySelector(`#cash-receipt-submit`);o&&(o.disabled=!0,o.textContent=`발급 중...`);try{let o=await fetch(`/api/toss-cash-receipt`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({amount:n,orderId:a,orderName:i,type:t,customerIdentityNumber:r,taxFreeAmount:0})}),s=await o.json();if(!o.ok||!s.success){alert(`현금영수증 발급 실패: `+(s.message||`알 수 없는 오류`));return}let c=s?.data?.entityBody||s?.data?.cashReceipt||s?.cashReceipt||s?.data||s,l=Math.floor(n*10/11),u=n-l,d=r.replace(/[^0-9]/g,``),f=d.length>=7?d.slice(0,3)+`****`+d.slice(-4):d,p=String(c?.issueStatus||``),m=c?.issueNumber||c?.approvalNumber?`발급완료`:p===`FAILED`?`발급실패`:`발급요청`,h=sessionStorage.getItem(`login_merchant_name`)||localStorage.getItem(`login_merchant_name`)||``,{error:g}=await X.from(`cash_receipts`).insert({merchant_id:e,merchant_name:h,order_id:a,order_name:i,receipt_type:t,identity_number_masked:f,amount:n,supply_amount:l,vat_amount:u,tax_free_amount:0,approval_number:c?.issueNumber||c?.approvalNumber||null,receipt_key:c?.receiptKey||null,pg_company:`토스페이먼츠`,status:m,issued_at:new Date().toISOString(),raw_response:s});if(g){alert(`현금영수증은 발급됐지만 내역 저장에 실패했습니다.
`+g.message);return}alert(`현금영수증 발급이 완료되었습니다.`),document.querySelector(`#cash-receipt-modal`)?.remove()}catch{alert(`현금영수증 발급 중 오류가 발생했습니다.`)}finally{o&&(o.disabled=!1,o.textContent=`현금영수증 발급`)}})})}else if(Q===`/merchant-card-manual`)Number(sessionStorage.getItem(`login_merchant_id`)||0)||(location.href=`/merchant-login`),Z.innerHTML=`
  <div
    class="merchant-card-ocr-page"
    style="
      width:100%;
      max-width:100%;
      padding:24px 14px 110px;
      box-sizing:border-box;
      overflow-x:hidden;
    "
  >

    <h1
      style="
        margin:0 0 12px;
        font-size:30px;
        line-height:1.2;
      "
    >
      일반 수기결제
    </h1>

    <p
      style="
        margin:0 0 22px;
        font-size:16px;
        color:#555;
      "
    >
      카드정보를 직접 입력해주세요.
    </p>

    <div
      class="payment-card manual-payment-card"
      style="
        display:flex;
        flex-direction:column;
        width:100%;
        max-width:420px;
        min-width:0;
        margin:0 auto;
        padding:18px 14px;
        box-sizing:border-box;
        overflow:hidden;
      "
    >

      <label>결제금액</label>
      <input
        id="manual-payment-amount"
        type="number"
        min="100"
        placeholder="결제금액"
        style="width:100%;box-sizing:border-box;"
      />

      <label>상품명</label>
      <input
        id="manual-product-name"
        type="text"
        placeholder="상품명"
        style="width:100%;box-sizing:border-box;"
      />

      <label>카드번호</label>
      <input
        id="manual-card-number"
        type="text"
        inputmode="numeric"
        maxlength="19"
        placeholder="0000-0000-0000-0000"
        style="width:100%;box-sizing:border-box;"
      />

      <label>유효기간</label>
      <input
        id="manual-expiry"
        type="text"
        inputmode="numeric"
        maxlength="5"
        placeholder="MM/YY"
        style="width:100%;box-sizing:border-box;"
      />

      <label>할부개월</label>
      <select
        id="manual-installment"
        style="width:100%;box-sizing:border-box;"
      >
        <option value="0">일시불</option>
        <option value="2">2개월</option>
        <option value="3">3개월</option>
        <option value="4">4개월</option>
        <option value="5">5개월</option>
        <option value="6">6개월</option>
        <option value="12">12개월</option>
      </select>

      <button id="manual-payment-submit" class="merchant-save-btn">
        결제 요청
      </button>

      <button id="manual-payment-back" class="merchant-close-btn">
        이전
      </button>

    </div>
  </div>
`,document.querySelector(`#manual-payment-back`)?.addEventListener(`click`,()=>{location.href=`/merchant-card-payment`}),document.querySelector(`#manual-card-number`)?.addEventListener(`input`,e=>{let t=e.target,n=t.value.replace(/\D/g,``).slice(0,16);t.value=n.match(/.{1,4}/g)?.join(`-`)||n}),document.querySelector(`#manual-expiry`)?.addEventListener(`input`,e=>{let t=e.target,n=t.value.replace(/\D/g,``).slice(0,4);t.value=n.length>2?n.slice(0,2)+`/`+n.slice(2):n}),document.querySelector(`#manual-payment-submit`)?.addEventListener(`click`,()=>{alert(`입력 화면 연결 완료. 다음 단계에서 코페이 승인 API를 연결합니다.`)});else if(Q===`/merchant-card-sms`){let e=sessionStorage.getItem(`login_merchant_id`)||``,t=sessionStorage.getItem(`login_merchant_name`)||`가맹점`;if(!e)alert(`로그인이 필요합니다.`),location.href=`/merchant-login`;else{Z.innerHTML=`
              <div class="merchant-card-ocr-page">
        
                <h1>
                  SMS결제
                </h1>
        
                <p>
                  고객에게 온라인 카드결제 링크를 발송합니다.
                </p>
        
        
                <div class="ocr-payment-form">
        
                  <label>
                    상품명
                  </label>
        
                  <input
                    id="pc-sms-product-name"
                    type="text"
                    placeholder="상품명"
                  />
        
        
                  <label>
                    결제금액
                  </label>
        
                  <input
                    id="pc-sms-amount"
                    type="number"
                    inputmode="numeric"
                    min="100"
                    placeholder="결제금액"
                  />
        
        
                  <label>
                    고객 휴대폰번호
                  </label>
        
                  <input
                    id="pc-sms-phone"
                    type="tel"
                    inputmode="numeric"
                    placeholder="01012345678"
                  />
        
        
                  <button
                    id="pc-sms-send"
                    type="button"
                    class="merchant-save-btn"
                  >
                    결제링크 문자 발송
                  </button>
        
        
                  <button
                    id="pc-sms-copy"
                    type="button"
                    class="merchant-save-btn"
                  >
                    결제링크 복사
                  </button>
        
        
                  <button
                    id="pc-sms-back"
                    type="button"
                    class="merchant-close-btn"
                  >
                    이전
                  </button>
        
                </div>
        
              </div>
            `;let n=()=>{let n=(document.querySelector(`#pc-sms-product-name`)?.value||``).trim(),r=Number(document.querySelector(`#pc-sms-amount`)?.value||0);return n?!r||r<100?(alert(`결제금액을 확인해주세요.`),``):window.location.origin+`/pay?merchantId=`+encodeURIComponent(e)+`&merchantName=`+encodeURIComponent(t)+`&productName=`+encodeURIComponent(n)+`&amount=`+r:(alert(`상품명을 입력해주세요.`),``)};document.querySelector(`#pc-sms-back`)?.addEventListener(`click`,()=>{location.href=`/merchant-card`}),document.querySelector(`#pc-sms-send`)?.addEventListener(`click`,()=>{let e=(document.querySelector(`#pc-sms-phone`)?.value||``).replace(/[^0-9]/g,``);if(!e){alert(`고객 휴대폰번호를 입력해주세요.`);return}let r=n();if(!r)return;let i=Number(document.querySelector(`#pc-sms-amount`)?.value||0),a=`[NXG PICK]
`+t+` 결제요청
결제금액: `+i.toLocaleString()+`원

`+r;window.location.href=`sms:`+e+`?body=`+encodeURIComponent(a)}),document.querySelector(`#pc-sms-copy`)?.addEventListener(`click`,async()=>{let e=n();e&&(await navigator.clipboard.writeText(e),alert(`결제링크가 복사되었습니다.`))})}}else if(Q===`/merchant-card-ocr`){let e=new URLSearchParams(location.search).get(`mode`)||`ocr`;Z.innerHTML=`
          <div class="merchant-card-ocr-page">
      
          ${e===`ocr`?`
                <h1>OCR 카드결제</h1>
                <p>실물카드를 촬영하거나 카드정보를 직접 입력해주세요.</p>
          
                <div class="ocr-upload-box">
                  <label class="card-scan-button" for="ocr-card-image">
                    카드 촬영하기
                  </label>
          
                  <input
                    type="file"
                    id="ocr-card-image"
                    accept="image/*"
                    capture="environment"
                    style="display:none"
                  />
                </div>
          
                <div class="ocr-preview-box">
                  <img
                    id="ocr-preview-image"
                    style="max-width:400px; display:none;"
                  />
                </div>
          
                
              `:`
                <h1>일반 수기결제</h1>
                <p>카드정보를 직접 입력해주세요.</p>
              `}
          
          <div class="ocr-action-box">
            <button id="ocr-back-btn">
              이전으로
            </button>
          </div>
      
          

          <div class="ocr-payment-form">
  <label>결제금액</label>
  <input
    id="ocr-amount"
    type="number"
    inputmode="numeric"
    placeholder="결제금액"
  />

  <label>카드번호</label>
  <input
    id="ocr-card-number"
    inputmode="numeric"
    maxlength="16"
    placeholder="${e===`ocr`?`카드 스캔 후 자동 입력됩니다`:`카드번호를 직접 입력하세요`}"
  />

  <label>유효기간</label>
  <div>
    <input
      id="ocr-exp-month"
      inputmode="numeric"
      maxlength="2"
      placeholder="월"
    />
    <input
      id="ocr-exp-year"
      inputmode="numeric"
      maxlength="2"
      placeholder="년"
    />
  </div>

 


  <label>할부방법</label>
  <select id="ocr-installment">
    <option value="00">일시불</option>
    <option value="02">2개월</option>
    <option value="03">3개월</option>
    <option value="04">4개월</option>
    <option value="05">5개월</option>
    <option value="06">6개월</option>
    <option value="07">7개월</option>
    <option value="08">8개월</option>
    <option value="09">9개월</option>
    <option value="10">10개월</option>
    <option value="11">11개월</option>
    <option value="12">12개월</option>
  </select>

  <label>상품명</label>
  <input
    id="ocr-product-name"
    value="일반 카드결제"
  />

  <label>구매자 연락처</label>
  <input
    id="ocr-customer-phone"
    inputmode="tel"
    placeholder="선택 입력"
  />

  <button id="ocr-payment-submit">결제하기</button>
</div>
</div>
        `,document.querySelector(`#ocr-back-btn`)?.addEventListener(`click`,()=>{location.href=`/merchant-card`});let t=sessionStorage.getItem(`card_payment_amount`)||``,n=document.querySelector(`#ocr-amount`);n&&t&&(n.value=t,n.readOnly=!0);let r=sessionStorage.getItem(`card_payment_items`)||`[]`,i=JSON.parse(r),a=document.querySelector(`#ocr-product-name`);a&&Array.isArray(i)&&i.length>0&&(a.value=i.map(e=>String(e.name||e.product_name||`상품`)+` x `+Number(e.quantity||1)).join(`, `),a.readOnly=!0),document.querySelector(`#ocr-card-image`)?.addEventListener(`change`,async e=>{let t=e.target.files?.[0];if(!t)return;let n=new FileReader;n.onload=async e=>{let t=document.querySelector(`#ocr-preview-image`);if(t){t.src=String(e.target?.result),t.style.display=`block`,await t.decode(),alert(`카드 인식 중입니다. 잠시만 기다려주세요.`);try{let e=document.createElement(`canvas`),n=e.getContext(`2d`);if(!n){alert(`이미지 처리에 실패했습니다.`);return}e.width=t.naturalWidth,e.height=t.naturalHeight,n.drawImage(t,0,0);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e+=4){let t=i[e]*.3+i[e+1]*.59+i[e+2]*.11>150?255:0;i[e]=t,i[e+1]=t,i[e+2]=t}n.putImageData(r,0,0);let a=(await ue.default.recognize(e,`eng`)).data.text;console.log(`OCR 원문:`,a);let o=a.replace(/[Oo]/g,`0`).replace(/[Il|]/g,`1`),s=(o.match(/(?:\d[\s-]?){13,19}/g)||[]).map(e=>e.replace(/\D/g,``)).find(e=>e.length>=13&&e.length<=19),c=o.match(/\b(0[1-9]|1[0-2])[\s\/.-]?(\d{2})\b/),l=document.querySelector(`#ocr-card-number`),u=document.querySelector(`#ocr-exp-month`),d=document.querySelector(`#ocr-exp-year`),f=0;s&&l&&(l.value=s,f+=1),c&&u&&d&&(u.value=c[1],d.value=c[2],f+=1),alert(f===2?`카드번호와 유효기간을 인식했습니다.`:f===1?`일부 정보만 인식했습니다. 나머지는 직접 입력해주세요.`:`카드정보를 인식하지 못했습니다. 직접 입력해주세요.`)}catch(e){console.error(`OCR 인식 오류:`,e),alert(`카드 인식 중 오류가 발생했습니다. 직접 입력해주세요.`)}}},n.readAsDataURL(t)}),document.querySelector(`#ocr-payment-submit`)?.addEventListener(`click`,async()=>{let e=Number(sessionStorage.getItem(`login_merchant_id`)||0),t=Number(document.querySelector(`#ocr-amount`)?.value||0),n=document.querySelector(`#ocr-card-number`)?.value||``,r=document.querySelector(`#ocr-exp-month`)?.value||``,i=document.querySelector(`#ocr-exp-year`)?.value||``,a=document.querySelector(`#ocr-installment`)?.value||`00`,o=document.querySelector(`#ocr-product-name`)?.value||`일반 카드결제`,s=document.querySelector(`#ocr-customer-phone`)?.value||``,c=i.trim()+r.trim();if(!e){alert(`가맹점 정보를 찾을 수 없습니다.`);return}if(!t||t<=0){alert(`결제금액을 입력해주세요.`);return}if(!n.trim()){alert(`카드번호를 입력해주세요.`);return}if(r.trim().length!==2||i.trim().length!==2){alert(`유효기간 월/년을 각각 2자리로 입력해주세요.`);return}let l=document.querySelector(`#ocr-payment-submit`);l&&(l.disabled=!0,l.textContent=`결제 처리 중...`);try{let r=await fetch(`/api/korpay-manual-pay`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({merchantId:e,amount:t,cardNumber:n,expiryYymm:c,installment:a,goodsName:o,customerPhone:s})}),i=await r.json();if(!r.ok||!i.success){alert(`결제 실패: `+(i.message||`알 수 없는 오류`)+`
응답코드: `+(i.resultCode||`-`)+`
사용 MID: `+(i.usedMid||`-`)+`
MKEY 끝 4자리: `+(i.usedMkeyLast4||`-`));return}let l=String(i.orderId||``).trim();if(!l){alert(`결제는 승인됐지만 주문번호를 받지 못했습니다.
승인번호: `+(i.approvalNumber||`-`));return}let{data:u,error:d}=await X.rpc(`get_next_call_number`,{target_merchant_id:Number(e)});if(d||!u){alert(`주문 대기번호 생성에 실패했습니다.
`+(d?.message||`번호를 받지 못했습니다.`));return}let f=Number(u),p=String(i.approvalNumber||``).trim(),m=/^\d{8}$/.test(p)?p:null,{error:h}=await X.from(`orders`).insert({merchant_id:Number(e),order_no:String(f),call_number:f,pg_order_id:l,payment_key:i.tid||null,approval_number:m,items:[{name:o||`수기결제`,price:Number(t),quantity:1}],total_amount:Number(t),order_status:`접수`,payment_status:`결제완료`});if(h){alert(`결제는 승인됐지만 주문 저장에 실패했습니다.
`+h.message);return}alert(`결제가 승인되었습니다.
승인번호: `+(i.approvalNumber||`-`)),location.href=`/merchant-admin`}catch(e){alert(`결제 요청 중 오류가 발생했습니다.`),console.error(e)}finally{l&&(l.disabled=!1,l.textContent=`결제하기`)}})}else if(Q===`/merchant-batch-payment`)Z.innerHTML=`
            <div class="merchant-card-ocr-page">
        
              <h1>일괄승인</h1>
              <p>여러 건의 결제를 한 번에 승인할 수 있습니다.</p>
        
              <div class="ocr-action-box">
                <button id="batch-add-row">
                  회원 추가
                </button>
        
                <button id="batch-excel-upload">
                  엑셀 업로드
                </button>
        
                <button id="batch-submit">
                  승인 실행
                </button>
              </div>
        
              <table class="merchant-table">
                <thead>
                  <tr>
                    <th>이름</th>
                    <th>연락처</th>
                    <th>금액</th>
                    <th>상태</th>
                  </tr>
                </thead>
        
                <tbody id="batch-payment-body">
                  <tr>
                    <td><input placeholder="홍길동" /></td>
                    <td><input placeholder="01012345678" /></td>
                    <td><input placeholder="100000" /></td>
                    <td>대기</td>
                  </tr>
                </tbody>
              </table>
        
            </div>
          `;else if(Q===`/terms`)Z.innerHTML=`
            <div class="page">
              <div class="payment-card merchant-terms-card">
                <h1>이용약관</h1>
                <div class="terms-content full-terms-scroll">
                  NXG PICK 이용약관

NXG PICK은 안전한 결제 서비스를 제공하기 위해 운영됩니다.

이용자는 관련 법령 및 본 약관을 준수하여 서비스를 이용하여야 합니다.

회사는 서비스 품질 향상을 위해 시스템 점검 및 유지보수를 진행할 수 있으며, 필요한 경우 서비스 제공이 일시 중단될 수 있습니다.

이용자는 부정한 방법으로 서비스를 이용할 수 없으며, 관련 법령을 위반하는 경우 서비스 이용이 제한될 수 있습니다.

본 서비스 이용 시 본 약관에 동의한 것으로 간주됩니다.
                </div>
              </div>
            </div>
          `;else if(Q===`/privacy`)Z.innerHTML=`
            <div class="page">
              <div class="payment-card merchant-terms-card">
                <h1>개인정보처리방침</h1>
                <div class="terms-content full-terms-scroll">
                  개인정보처리방침

NXG PICK은 결제 처리 및 고객 응대를 위해 필요한 최소한의 개인정보를 수집합니다.

수집된 개인정보는 결제 처리, 주문 확인, 고객 문의 응대 및 관련 법령 준수를 위해 사용됩니다.

회사는 이용자의 개인정보를 안전하게 관리하며, 법령에 따른 경우를 제외하고 제3자에게 제공하지 않습니다.

개인정보는 관련 법령에서 정한 기간 동안 보관 후 안전하게 파기됩니다.
                </div>
              </div>
            </div>
          `;else if(Q===`/refund`)Z.innerHTML=`
            <div class="page">
              <div class="payment-card merchant-terms-card">
                <h1>환불정책</h1>
                <div class="terms-content full-terms-scroll">
                  환불정책

환불 및 결제 취소는 상품 또는 서비스를 제공한 가맹점의 정책에 따라 처리됩니다.

환불 요청은 해당 가맹점 또는 고객센터를 통해 접수할 수 있습니다.

카드 결제 취소 후 실제 환불 반영 시점은 카드사 정책에 따라 달라질 수 있습니다.

이미 제공이 완료된 상품 또는 서비스는 환불이 제한될 수 있습니다.
                </div>
              </div>
            </div>
          `;else if(Q===`/hotel`){let e=new URLSearchParams(window.location.search),t=Number(e.get(`merchant_id`)||0),n=(e.get(`room`)||``).trim(),r=(navigator.languages?.[0]||navigator.language||`ko`).toLowerCase(),i=(e.get(`lang`)||``).toLowerCase(),a={ko:{hotelNotFound:`호텔 정보를 찾을 수 없습니다.`,welcomeTitle:`편안한 시간을 보내고 계신가요?`,welcomeMessage:`객실에서 필요한 상품과 서비스를 간편하게 주문하고 결제하실 수 있습니다.`,pick:`PICK`,cartEmpty:`상품을 선택해주세요.`,totalAmount:`총 결제금액`,request:`요청사항`,optional:`선택`,requestPlaceholder:`예: 수건 2개 더 부탁드립니다. / 문 앞에 놓아주세요.`,pay:`결제하기`},en:{hotelNotFound:`Hotel information could not be found.`,welcomeTitle:`Enjoying your stay?`,welcomeMessage:`Order and pay for the items and services you need.`,pick:`PICK`,cartEmpty:`Please select an item.`,totalAmount:`Total`,request:`Request`,optional:`Optional`,requestPlaceholder:`e.g. Please bring two extra towels. / Please leave it at the door.`,pay:`Pay Now`},ja:{hotelNotFound:`ホテル情報が見つかりません。`,welcomeTitle:`快適にお過ごしでしょうか？`,welcomeMessage:`必要な商品やサービスを簡単に注文・決済できます。`,pick:`PICK`,cartEmpty:`商品を選択してください。`,totalAmount:`お支払い金額`,request:`ご要望`,optional:`任意`,requestPlaceholder:`例：タオルを2枚追加してください。 / ドアの前に置いてください。`,pay:`お支払い`},zh:{hotelNotFound:`找不到酒店信息。`,welcomeTitle:`祝您入住愉快`,welcomeMessage:`您可以轻松订购并支付所需的商品和服务。`,pick:`PICK`,cartEmpty:`请选择商品。`,totalAmount:`支付金额`,request:`备注`,optional:`选填`,requestPlaceholder:`例如：请再送两条毛巾。/ 请放在门口。`,pay:`立即支付`}}[i===`en`||i===`ja`||i===`zh`||i===`ko`?i:r.startsWith(`ja`)?`ja`:r.startsWith(`zh`)?`zh`:r.startsWith(`en`)?`en`:`ko`];if(!t)Z.innerHTML=`
              <div class="hotel-shop-page">
                <div class="hotel-error-card">
                ${a.hotelNotFound}
                </div>
              </div>
            `;else{let{data:e,error:r}=await X.from(`merchants`).select(`id, merchant_name, online_pg_company_1, toss_client_key`).eq(`id`,t).maybeSingle(),{data:i,error:o}=await X.from(`products`).select(`*`).eq(`merchant_id`,t).eq(`status`,`판매중`).order(`sort_order`,{ascending:!0}).order(`id`,{ascending:!0});if(r||o||!e)Z.innerHTML=`
                <div class="hotel-shop-page">
                  <div class="hotel-error-card">
                    호텔 정보를 불러오지 못했습니다.
                  </div>
                </div>
              `;else{let r=(i||[]).reduce((e,t)=>{let n=t.category||`OTHER`;return e[n]||(e[n]=[]),e[n].push(t),e},{}),o=Object.keys(r);Z.innerHTML=`
                <div class="hotel-shop-page">
        
                  <header class="hotel-shop-header">
        
                    <div class="hotel-brand-area">
                      <div class="hotel-brand-small">
                        NXG HOTEL SERVICE
                      </div>
        
                      <h1>
                        ${e.merchant_name||`HOTEL`}
                      </h1>
        
                      <p>
                        ROOM SERVICE & AMENITIES
                      </p>
                    </div>
        
                    ${n?`
                          <div class="hotel-room-badge">
                            <span>ROOM</span>
                            <strong>${n}</strong>
                          </div>
                        `:``}
        
                  </header>
        
        
                  <section class="hotel-welcome-area">
        
                    <div class="hotel-welcome-label">
                      PRIVATE ROOM SERVICE
                    </div>
        
                    <h2>
                    ${a.welcomeTitle}
                    </h2>
        
                    <p>
                    ${a.welcomeMessage}
                    </p>
        
                  </section>
        
        
                  ${o.length>0?`
                        <div class="hotel-category-tabs">
        
                          ${o.map((e,t)=>`
                              <button
                                type="button"
                                class="hotel-category-tab ${t===0?`active`:``}"
                                data-category="${e}"
                              >
                                ${e}
                              </button>
                            `).join(``)}
        
                        </div>
                      `:``}
        
        
                  <main class="hotel-product-area">
        
                    ${o.map((e,t)=>`
        
                        <section
                          class="hotel-category-section ${t===0?``:`hotel-category-hidden`}"
                          data-hotel-category="${e}"
                        >
        
                          <div class="hotel-product-grid">
        
                            ${r[e].map(e=>`
        
                                  <article class="hotel-product-card">
        
                                    <div class="hotel-product-image">
        
                                      ${e.image_url?`
                                            <img
                                              src="${e.image_url}"
                                              alt="${e.product_name}"
                                            >
                                          `:`
                                            <div class="hotel-no-image">
                                              <span>NXG HOTEL</span>
                                            </div>
                                          `}
        
                                    </div>
        
                                    <div class="hotel-product-info">
        
                                      <div>
                                        <h3>
                                          ${e.product_name}
                                        </h3>
        
                                        <p>
                                          ${Number(e.price).toLocaleString()}원
                                        </p>
                                      </div>
        
                                      <button
                                        type="button"
                                        class="hotel-add-button"
                                        data-id="${e.id}"
                                        data-name="${e.product_name}"
                                        data-price="${e.price}"
                                      >
                                        +
                                      </button>
        
                                    </div>
        
                                  </article>
                                `).join(``)}
        
                          </div>
        
                        </section>
        
                      `).join(``)}
        
                  </main>
        
        
                  <section class="hotel-pick-card">
        
                    <div class="hotel-pick-title">
        
                      <div>
                        <span>YOUR SELECTION</span>
                        <h2>PICK</h2>
                      </div>
        
                      ${n?`
                            <div class="hotel-pick-room">
                              ROOM ${n}
                            </div>
                          `:``}
        
                    </div>
        
                    <div id="hotel-cart-items">
  <div class="hotel-cart-empty">
    ${a.cartEmpty}
  </div>
</div>
        
                    <div class="hotel-cart-total">
                      <span>${a.totalAmount}</span>
        
                      <strong id="hotel-total-price">
                        0원
                      </strong>
                    </div>

                    <div class="hotel-customer-request">
  <label for="hotel-customer-request">
  ${a.request}
  <span>${a.optional}</span>
</label>

<textarea
  id="hotel-customer-request"
  maxlength="200"
  placeholder="${a.requestPlaceholder}"
></textarea>
</div>
        
                    <button
                      type="button"
                      id="hotel-pay-button"
                      class="hotel-pay-button"
                    >
                    ${a.pay}
                    </button>
        
                  </section>
        
        
                  <footer class="hotel-shop-footer">
        
                    <strong>
                      NXG HOTEL
                    </strong>
        
                    <span>
                      Secure Payment Service
                    </span>
        
                  </footer>
        
                </div>
              `;let s=[],l=()=>{let e=document.querySelector(`#hotel-cart-items`),t=document.querySelector(`#hotel-total-price`);if(!(!e||!t)){if(s.length===0){e.innerHTML=`
                    <div class="hotel-cart-empty">
                      상품을 선택해주세요.
                    </div>
                  `,t.textContent=`0원`;return}e.innerHTML=s.map(e=>`
        
                      <div
                        class="hotel-cart-item"
                        data-id="${e.id}"
                      >
        
                        <div class="hotel-cart-item-name">
        
                          <strong>
                            ${e.name}
                          </strong>
        
                          <span>
                            ${Number(e.price).toLocaleString()}원
                          </span>
        
                        </div>
        
                        <div class="hotel-cart-control">
        
                          <button
                            type="button"
                            class="hotel-cart-minus"
                            data-id="${e.id}"
                          >
                            −
                          </button>
        
                          <span>
                            ${e.quantity}
                          </span>
        
                          <button
                            type="button"
                            class="hotel-cart-plus"
                            data-id="${e.id}"
                          >
                            +
                          </button>
        
                        </div>
        
                      </div>
                    `).join(``),t.textContent=s.reduce((e,t)=>e+t.price*t.quantity,0).toLocaleString()+`원`,document.querySelectorAll(`.hotel-cart-plus`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.id),n=s.find(e=>e.id===t);n&&(n.quantity+=1,l())})}),document.querySelectorAll(`.hotel-cart-minus`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.id),n=s.find(e=>e.id===t);if(n){if(--n.quantity,n.quantity<=0){let e=s.findIndex(e=>e.id===t);e>=0&&s.splice(e,1)}l()}})})}};document.querySelectorAll(`.hotel-category-tab`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.category||``;document.querySelectorAll(`.hotel-category-tab`).forEach(e=>{e.classList.remove(`active`)}),e.classList.add(`active`),document.querySelectorAll(`.hotel-category-section`).forEach(e=>{e.classList.toggle(`hotel-category-hidden`,e.dataset.hotelCategory!==t)})})}),document.querySelectorAll(`.hotel-add-button`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.id),n=e.dataset.name||``,r=Number(e.dataset.price||0),i=s.find(e=>e.id===t);i?i.quantity+=1:s.push({id:t,name:n,price:r,quantity:1}),l()})}),document.querySelector(`#hotel-pay-button`)?.addEventListener(`click`,async()=>{let r=s.reduce((e,t)=>e+t.price*t.quantity,0);if(s.length===0||r<=0){alert(`상품을 먼저 선택해주세요.`);return}if(e.online_pg_company_1!==`토스페이먼츠`){alert(`온라인결제 1이 토스페이먼츠로 설정되지 않았습니다.`);return}let i=String(e.toss_client_key||Kb).trim();if(!i){alert(`토스 Client Key가 등록되지 않았습니다.`);return}let a=s.map(e=>e.name+` x `+e.quantity).join(`, `);sessionStorage.setItem(`merchantId`,String(t)),sessionStorage.setItem(`merchantName`,e.merchant_name||``),sessionStorage.setItem(`hotel_room_number`,n),sessionStorage.setItem(`hotel_items`,JSON.stringify(s));let o=document.querySelector(`#hotel-customer-request`)?.value.trim()||``;sessionStorage.setItem(`hotel_customer_request`,o),sessionStorage.setItem(`message`,n?`호텔 `+n+`호 추가결제 / `+a:`호텔 추가결제 / `+a),sessionStorage.setItem(`selected_pg_company`,`토스페이먼츠`),sessionStorage.removeItem(`senderName`),await(await c(i)).requestPayment(`카드`,{amount:r,orderId:`HOTEL`+t+Date.now(),orderName:n?`ROOM `+n+` 추가결제`:`호텔 추가결제`,customerName:e.merchant_name||`호텔 고객`,successUrl:window.location.origin+`/success?source=hotel&pg=토스페이먼츠&merchantId=`+t+`&merchantName=`+encodeURIComponent(e.merchant_name||``),failUrl:window.location.origin+`/fail`})})}}}else if(Q===`/kiosk`){let e=new URLSearchParams(window.location.search),t=Number(e.get(`merchant_id`)||1),{data:n}=await X.from(`merchants`).select(`merchant_type`).eq(`id`,t).maybeSingle(),r=n?.merchant_type===`뷰티`,i=[],a=[],o=[];if(r){let{data:e,error:n}=await X.from(`beauty_staff`).select(`id, staff_name, position, photo_url`).eq(`merchant_id`,t).eq(`status`,`근무중`).order(`id`,{ascending:!0});n?alert(`직원 목록 조회 실패: `+n.message):i=e||[];let{data:r,error:s}=await X.from(`beauty_staff_services`).select(`staff_id, service_id`).eq(`merchant_id`,t);s?alert(`직원 서비스 조회 실패: `+s.message):a=r||[];let{data:c,error:l}=await X.from(`beauty_business_hours`).select(`
            weekday,
            open_time,
            close_time,
            is_closed,
            is_24_hours
          `).eq(`merchant_id`,t);l?alert(`영업시간 조회 실패: `+l.message):o=c||[]}let{data:s,error:l}=await X.from(`products`).select(`*`).eq(`merchant_id`,t).eq(`status`,`판매중`).order(`sort_order`,{ascending:!0}).order(`id`,{ascending:!0});if(l)Z.innerHTML=`
          <div class="page">
            <h1>상품을 불러오지 못했습니다.</h1>
            <p>${l.message}</p>
          </div>
        `;else{let e=(s||[]).reduce((e,t)=>{let n=t.category||`기타`;return e[n]||(e[n]=[]),e[n].push(t),e},{});Z.innerHTML=`
          <div class="kiosk-page">
            <div class="kiosk-header">
              <h1
  id="kiosk-main-home-title"
  style="cursor:pointer;"
>
  키오스 PICK
</h1>
              <div class="cart-badge">
                PICK <span id="cart-count">0</span>
              </div>
            </div>          

            ${r?`
                  <div
  class="beauty-kiosk-staff-list"
  style="
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    gap:14px;
    margin:12px 0 16px;
  "
>
                    ${i.map((e,t)=>`
                      <button
  class="beauty-kiosk-staff-button ${t===0?`active`:``}"
  data-staff-id="${e.id}"
  style="
    width:150px;
    min-height:105px;
    padding:14px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:7px;
    border-radius:16px;
  "
>
                        ${e.photo_url?`
                              <img
                                src="${e.photo_url}"
                                alt="${e.staff_name||``}"
                                style="
                                  width:76px;
                                  height:76px;
                                  border-radius:50%;
                                  object-fit:cover;
                                "
                              />
                            `:``}
            
                        <strong>${e.staff_name||`-`}</strong>
            
                        ${e.position?`<span>${e.position}</span>`:``}
                      </button>
                    `).join(``)}
                  </div>
                `:``}

            ${r?``:`
                  <div class="kiosk-category-tabs">
                    ${Object.keys(e).map((e,t)=>`
                      <button
                        class="kiosk-category-tab ${t===0?`active`:``}"
                        data-category="${e}"
                      >
                        ${e}
                      </button>
                    `).join(``)}
                  </div>
                `}

             <div
  class="kiosk-category-list"
  style="${r?`display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,240px));gap:14px;justify-content:center;`:``}"
>
  ${Object.keys(e).map(t=>`
    <section
      class="kiosk-category-section ${r||Object.keys(e)[0]===t?``:`hidden-category`}"
      data-category-section="${t}"
      style="${r?`display:contents;`:``}"
    >
      ${r?``:`<h2 class="kiosk-category-title">${t}</h2>`}

      <div
        class="kiosk-products"
        style="${r?`display:contents;`:``}"
      >
        ${e[t].map(e=>`
          <div
            class="kiosk-product-card"
            data-product-id="${e.id}"
            style="${r?`min-height:0;height:auto;overflow:hidden;`:``}"
          >
            ${e.image_url?`
                  <img
                    src="${e.image_url}"
                    alt="${e.product_name}"
                    style="${r?`width:100%;height:175px;object-fit:cover;display:block;`:``}"
                  >
                `:r?``:`<div class="no-image">이미지 없음</div>`}

            <div
              class="kiosk-product-info"
              style="${r?`display:flex;align-items:center;justify-content:space-between;gap:8px;padding:12px 12px 6px;`:``}"
            >
              <h3
                style="${r?`margin:0;font-size:17px;line-height:1.2;`:``}"
              >
                ${e.product_name}
              </h3>

              <p
                style="${r?`margin:0;font-size:14px;font-weight:700;white-space:nowrap;`:``}"
              >
                ${Number(e.price).toLocaleString()}원
              </p>
            </div>

            <button 
              class="add-cart-button"
              data-id="${e.id}"
              data-name="${e.product_name}"
              data-price="${e.price}"
              style="${r?`width:calc(100% - 20px);height:38px;margin:8px 10px 10px;`:``}"
            >
              담기
            </button>
          </div>
        `).join(``)}
      </div>
    </section>
  `).join(``)}
</div>
${r?`
      
    `:``}
            <div
  class="kiosk-cart"
  style="${r?`max-width:760px;margin:16px auto 110px;padding:20px 24px;min-height:0;`:``}"
>
${r?`
      <div style="
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:12px;
        margin:0 0 14px;
      ">
        <h2 style="margin:0;font-size:24px;">PICK</h2>

        <div style="
          display:flex;
          align-items:center;
          gap:6px;
        ">
          <strong style="
            font-size:14px;
            white-space:nowrap;
          ">예약자</strong>

          <input
            id="beauty-customer-name"
            type="text"
            placeholder="이름"
            style="
              width:120px;
              height:32px;
              border:1px solid #d1d5db;
              border-radius:8px;
              padding:0 8px;
              box-sizing:border-box;
            "
          />

          <input
            id="beauty-customer-phone"
            type="tel"
            placeholder="연락처"
            style="
              width:150px;
              height:32px;
              border:1px solid #d1d5db;
              border-radius:8px;
              padding:0 8px;
              box-sizing:border-box;
            "
          />
        </div>
      </div>
    `:`<h2>PICK</h2>`}
              <div id="cart-items">
              ${r?``:`<p class="empty-cart">상품을 선택해주세요.</p>`}
              </div>

              <div class="cart-total">
                <span>총 결제금액</span>
                <strong id="cart-total-price">0원</strong>
              </div>

              </div>

              <div class="kiosk-company-info">

  <div><strong>주식회사 엔엑스지소프트</strong></div>

  <div>
    대표 : 유상균
  </div>

  <div>
    사업자등록번호 : 245-81-01732 |
    통신판매업신고번호 : 2024-서울금천-2499
  </div>

  <div>
    서울특별시 금천구 가산디지털2로 34, 211-4N호
  </div>

  <div>
  대표 번호 : 02-431-1252 |
  이메일 : nxgsoft@naver.com
</div>

<div>
  Copyright © NXG Soft. All rights reserved.
</div>

<div class="footer-links">
  <a href="/terms" target="_blank">이용약관 보기</a>
  <span>|</span>

  <a href="/privacy" target="_blank">
    개인정보처리방침 보기
  </a>
  <span>|</span>

  <a href="/refund" target="_blank">
    환불정책 보기
  </a>
</div>

</div>

<div class="kiosk-bottom-bar">
  <div class="bottom-total">
    <span>총 결제금액</span>
    <strong id="cart-total-price-bottom">0원</strong>
  </div>

  <div class="kiosk-payment-buttons">

  <button
    class="kiosk-toss-pay-button"
    id="kiosk-toss-pay-button">
    모바일 결제
  </button>

  <button
    class="kiosk-card-pay-button"
    id="kiosk-card-pay-button">
    수기 결제
  </button>

</div>
</div>
            </div>
                 </div>
                 </div>
        `,document.querySelector(`#kiosk-main-home-title`)?.addEventListener(`click`,()=>{location.href=`/merchant-admin`});let n=[];for(let e=0;e<1440;e+=30){let t=String(Math.floor(e/60)).padStart(2,`0`),r=String(e%60).padStart(2,`0`);n.push(`${t}:${r}`)}let l=e=>{if(!r||!e)return[];let t=new Date(e+`T00:00:00`).getDay(),i=o.find(e=>Number(e.weekday)===t);if(!i||i.is_closed===!0)return[];if(i.is_24_hours===!0)return[...n];let a=String(i.open_time||``).slice(0,5),s=String(i.close_time||``).slice(0,5);return!a||!s?[]:n.filter(e=>e>=a&&e<s)},u=(e,t)=>{let r=n.indexOf(e);if(r<0)return[];let i=Math.max(1,Math.ceil((Number(t)||30)/30));return n.slice(r,r+i)};function d(e){let t=document.querySelector(`#beauty-reservation-time`);t&&(t.innerHTML=`<option value="">시간 선택</option>`,n.forEach(n=>{let r=document.createElement(`option`);r.value=n,r.textContent=e.some(e=>e.reservation_time===n)?n+` (예약완료)`:n,r.disabled=e.some(e=>e.reservation_time===n),t.appendChild(r)}))}if(r&&i.length>0){let e=e=>{let t=a.filter(t=>Number(t.staff_id)===e).map(e=>Number(e.service_id));document.querySelectorAll(`.kiosk-product-card`).forEach(e=>{let n=Number(e.getAttribute(`data-product-id`));e.style.display=t.includes(n)?``:`none`})};document.querySelectorAll(`.beauty-kiosk-staff-button`).forEach(t=>{t.addEventListener(`click`,()=>{document.querySelectorAll(`.beauty-kiosk-staff-button`).forEach(e=>e.classList.remove(`active`)),h=Number(t.getAttribute(`data-staff-id`)),t.classList.add(`active`),e(Number(t.getAttribute(`data-staff-id`)))})}),e(Number(i[0].id));let t=document.querySelector(`#beauty-reservation-time`);t&&n.forEach(e=>{let n=document.createElement(`option`);n.value=e,n.textContent=e,t.appendChild(n)})}let f=document.querySelector(`#beauty-reservation-date`);f?.addEventListener(`change`,async()=>{if(!h)return;let e=f.value;if(!e)return;let{data:t}=await X.from(`orders`).select(`reservation_time`).eq(`beauty_staff_id`,h).eq(`reservation_date`,e);d(t||[])}),document.querySelectorAll(`.kiosk-category-tab`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-category`);document.querySelectorAll(`.kiosk-category-tab`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),document.querySelectorAll(`.kiosk-category-section`).forEach(e=>{e.getAttribute(`data-category-section`)===t?e.classList.remove(`hidden-category`):e.classList.add(`hidden-category`)})})});let p=[],m=()=>{let e=document.querySelector(`#cart-items`),i=document.querySelector(`#cart-count`),a=document.querySelector(`#cart-total-price`),o=document.querySelector(`#cart-total-price-bottom`),s=p.reduce((e,t)=>e+t.quantity,0),c=p.reduce((e,t)=>e+t.price*t.quantity,0);if(i.textContent=String(s),a.textContent=c.toLocaleString()+`원`,o&&(o.textContent=c.toLocaleString()+`원`),p.length===0){e.innerHTML=r?``:`<p class="empty-cart">상품을 선택해주세요.</p>`;return}e.innerHTML=p.map(e=>`
            <div class="cart-item">
              <div>
                <strong>
  ${e.name}
  ${r?` / `+(e.beauty_staff_name||`-`):``}
</strong>

                ${r?`
                      <div style="
                        display:flex;
                        align-items:center;
                        gap:4px;
                        margin:4px 0 0 0;
                      ">
                        <input
                          type="date"
                          class="beauty-cart-date-input"
                          data-key="${e.cart_key}"
                          value="${e.reservation_date||``}"
                          style="
                            width:140px;
                            height:32px;
                            border:1px solid #d1d5db;
                            border-radius:8px;
                            padding:0 6px;
                            box-sizing:border-box;
                          "
                        />
                
                        <select
                          class="beauty-cart-time-select"
                          data-key="${e.cart_key}"
                          style="
                            width:130px;
                            height:32px;
                            border:1px solid #d1d5db;
                            border-radius:8px;
                            padding:0 6px;
                            box-sizing:border-box;
                          "
                        >
                          <option value="">예약시간 선택</option>
                          ${l(e.reservation_date||``).map(t=>{let r=e.beauty_schedule_status?.[t]||`예약가능`,i=Number(e.duration_minutes||30)*Math.max(1,Number(e.quantity||1));t===`15:30`&&console.log(`뷰티시간확인`,{상품명:e.name,소요시간저장값:e.duration_minutes,실제계산분:i,상태1530:e.beauty_schedule_status?.[`15:30`],상태1600:e.beauty_schedule_status?.[`16:00`],상태1630:e.beauty_schedule_status?.[`16:30`]});let a=l(e.reservation_date||``),o=n.indexOf(t),s=Math.max(1,Math.ceil(i/30)),c=!1;for(let t=0;t<s;t++){let r=n[o+t];if(!r){c=!0;break}if(!a.includes(r)){c=!0;break}if((e.beauty_schedule_status?.[r]||`예약가능`)!==`예약가능`){c=!0;break}}let u=r!==`예약가능`||c,d=r===`예약완료`?`예약완료`:u?`예약불가`:``;return`
                              <option
                                value="${t}"
                                ${u?`disabled`:``}
                                ${e.reservation_time===t?`selected`:``}
                              >
                                ${t}${d?` `+d:``}
                              </option>
                            `}).join(``)}
                        </select>
                      </div>
                    `:``}

                <p>${e.price.toLocaleString()}원 x ${e.quantity}</p>
              </div>
              <div class="cart-item-buttons">
                <button class="cart-minus" data-key="${e.cart_key}">-</button>
<span>${e.quantity}</span>
<button class="cart-plus" data-key="${e.cart_key}">+</button>
              </div>
            </div>
          `).join(``),document.querySelectorAll(`.cart-plus`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.key||``,n=p.find(e=>e.cart_key===t);n&&(n.quantity+=1,m())})}),document.querySelectorAll(`.beauty-cart-date-input`).forEach(e=>{e.addEventListener(`change`,async()=>{let n=e.dataset.key||``,r=p.find(e=>e.cart_key===n);if(r){if(r.reservation_date=e.value,r.reservation_time=``,r.beauty_schedule_status={},r.beauty_staff_id&&e.value){let{data:n,error:i}=await X.from(`beauty_staff_schedule`).select(`
                schedule_time,
                status,
                order_id
              `).eq(`merchant_id`,t).eq(`staff_id`,r.beauty_staff_id).eq(`schedule_date`,e.value);if(i){alert(`직원 스케줄 조회 실패: `+i.message);return}let a={},o=new Set;(n||[]).forEach(e=>{let t=String(e.schedule_time||``).slice(0,5);if(!t)return;let n=String(e.status||`예약가능`);a[t]=n,e.order_id&&n===`예약가능`&&o.add(t)});let{data:s,error:c}=await X.from(`orders`).select(`
                  id,
                  items,
                  order_status,
                  payment_status
                `).eq(`merchant_id`,Number(t));if(c){alert(`기존 예약 조회 실패: `+c.message);return}(s||[]).forEach(t=>{let n=String(t.order_status||``),i=String(t.payment_status||``);n.includes(`취소`)||i.includes(`취소`)||(Array.isArray(t.items)?t.items:[]).forEach(t=>{if(Number(t.beauty_staff_id)!==Number(r.beauty_staff_id)||String(t.reservation_date||``)!==e.value)return;let n=String(t.reservation_time||``).slice(0,5);n&&u(n,Number(t.duration_minutes||30)*Math.max(1,Number(t.quantity||1))).forEach(e=>{o.has(e)||(a[e]=`예약완료`)})})}),r.beauty_schedule_status=a}m()}})}),document.querySelectorAll(`.beauty-cart-time-select`).forEach(e=>{e.addEventListener(`change`,()=>{let t=e.dataset.key||``,n=p.find(e=>e.cart_key===t);n&&(n.reservation_time=e.value)})}),document.querySelectorAll(`.cart-minus`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.key||``,n=p.find(e=>e.cart_key===t);if(n){if(--n.quantity,n.quantity<=0){let e=p.findIndex(e=>e.cart_key===t);p.splice(e,1)}m()}})})},h=r&&i.length>0?Number(i[0].id):0;document.querySelectorAll(`.add-cart-button`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.id),n=e.dataset.name||``,a=Number(e.dataset.price),o=(s||[]).find(e=>Number(e.id)===t),c=r?Number(o?.duration_minutes||30):30,l=r?h:0,u=r?String(t)+`-`+String(l):String(t),d=p.find(e=>e.cart_key===u);d?d.quantity+=1:p.push({cart_key:u,id:t,name:n,price:a,quantity:1,beauty_staff_id:r?h:void 0,beauty_staff_name:r?i.find(e=>Number(e.id)===Number(h))?.staff_name||``:void 0,reservation_date:``,reservation_time:``,duration_minutes:r?c:void 0}),m()})}),document.querySelector(`#kiosk-toss-pay-button`)?.addEventListener(`click`,async()=>{let e=p.reduce((e,t)=>e+t.price*t.quantity,0);if(p.length===0||e<=0){alert(`상품을 먼저 선택해주세요.`);return}let{data:n,error:i}=await X.from(`merchants`).select(`
      merchant_name,
      online_pg_company_1,
      toss_client_key,
      korpay_pg_mid,
      korpay_pg_mkey
    `).eq(`id`,Number(t)).single();if(i||!n){alert(`가맹점 온라인 결제정보를 불러오지 못했습니다.`);return}let a=String(n.online_pg_company_1||``).trim();if(a!==`토스페이먼츠`&&a!==`코페이`){alert(`온라인결제 1 PG사를 확인해주세요.`);return}let{data:o,error:s}=await X.rpc(`get_next_call_number`,{target_merchant_id:Number(t)});if(s||!o){alert(`주문 대기번호 생성에 실패했습니다.
`+(s?.message||`번호를 받지 못했습니다.`));return}let l=Number(o),u=(a===`코페이`?`KORPAY-`:`TOSS-`)+l+`-`+Date.now();sessionStorage.setItem(`kiosk_call_number`,String(l)),sessionStorage.setItem(`kiosk_order_no`,u),sessionStorage.setItem(`kiosk_merchant_id`,String(t));let d=p.find(e=>e.reservation_date)?.reservation_date||``;if(r&&p.some(e=>!e.reservation_date||!e.reservation_time)){alert(`PICK 항목별 예약날짜와 예약시간을 모두 선택해주세요.`);return}let f=document.querySelector(`#beauty-customer-name`)?.value.trim()||``,m=document.querySelector(`#beauty-customer-phone`)?.value.trim()||``;if(r&&(!f||!m)){alert(`예약자 이름과 연락처를 입력해주세요.`);return}let g=r?p.map(e=>({...e,reservation_date:e.reservation_date||``,reservation_time:e.reservation_time||``})):p;if(sessionStorage.setItem(`kiosk_items`,JSON.stringify(g)),sessionStorage.setItem(`beauty_customer_name`,f),sessionStorage.setItem(`beauty_customer_phone`,m),sessionStorage.setItem(`beauty_reservation_date`,d),sessionStorage.setItem(`beauty_reservation_time`,``),r&&sessionStorage.setItem(`beauty_staff_id`,String(h)),sessionStorage.setItem(`beauty_reservation_date`,document.querySelector(`#beauty-reservation-date`)?.value||``),sessionStorage.setItem(`beauty_reservation_time`,document.querySelector(`#beauty-reservation-time`)?.value||``),sessionStorage.setItem(`kiosk_total_amount`,String(e)),sessionStorage.setItem(`merchantId`,String(t)),sessionStorage.setItem(`merchantName`,n.merchant_name||``),sessionStorage.setItem(`message`,`키오스 PICK 주문`),sessionStorage.setItem(`selected_pg_company`,a),a===`코페이`){if(!n.korpay_pg_mid||!n.korpay_pg_mkey){alert(`코페이 PG MID 또는 MKEY가 등록되지 않았습니다.`);return}let r=cx(),i=await lx(String(n.korpay_pg_mid),r,e,String(n.korpay_pg_mkey)),a={merchantId:n.korpay_pg_mid,productName:`키오스 PICK 주문`,orderNumber:u.replace(/[^a-zA-Z0-9]/g,``),amount:e,payMethod:`card`,returnUrl:window.location.origin+`/api/korpay-return`,ediDate:r,hashKey:i,customerName:n.merchant_name||`키오스 고객`,reserved:String(t),language:`ko`},o=window.KorpaySdk;if(!o){alert(`Korpay SDK를 찾을 수 없습니다.`);return}o.paymentTimeout=3e4,o.payment(`https://staging-payments.korpay.com/v1`,a,{onStart:()=>{let e=document.querySelector(`#kiosk-toss-pay-button`);e&&(e.disabled=!0,e.innerText=`결제창 호출 중...`)},onError:e=>{alert(String(e));let t=document.querySelector(`#kiosk-toss-pay-button`);t&&(t.disabled=!1,t.innerText=`모바일 결제`)},onClose:()=>{let e=document.querySelector(`#kiosk-toss-pay-button`);e&&(e.disabled=!1,e.innerText=`모바일 결제`)}});return}if(a===`토스페이먼츠`){let r=String(n.toss_client_key||Kb).trim();if(!r){alert(`토스 Client Key가 등록되지 않았습니다.`);return}await(await c(r)).requestPayment(`카드`,{amount:e,orderId:u.replace(/[^a-zA-Z0-9]/g,``),orderName:`키오스 PICK 주문`,customerName:n.merchant_name||`키오스 고객`,successUrl:window.location.origin+`/success?source=kiosk&pg=토스페이먼츠&merchantId=`+t+`&merchantName=`+encodeURIComponent(n.merchant_name||``),failUrl:window.location.origin+`/fail`});return}}),document.querySelector(`#kiosk-card-pay-button`)?.addEventListener(`click`,()=>{let e=new URLSearchParams(window.location.search).get(`merchant_id`)||``;if(!e){alert(`가맹점 정보를 찾을 수 없습니다.`);return}sessionStorage.setItem(`card_payment_merchant_id`,e);let t=p.find(e=>e.reservation_date)?.reservation_date||``;if(r&&p.some(e=>!e.reservation_date||!e.reservation_time)){alert(`PICK 항목별 예약날짜와 예약시간을 모두 선택해주세요.`);return}let n=document.querySelector(`#beauty-customer-name`)?.value.trim()||``,i=document.querySelector(`#beauty-customer-phone`)?.value.trim()||``;if(r&&(!n||!i)){alert(`예약자 이름과 연락처를 입력해주세요.`);return}let a=r?p.map(e=>({...e,reservation_date:e.reservation_date||``,reservation_time:e.reservation_time||``})):p;sessionStorage.setItem(`card_payment_items`,JSON.stringify(a)),sessionStorage.setItem(`beauty_customer_name`,n),sessionStorage.setItem(`beauty_customer_phone`,i),sessionStorage.setItem(`beauty_reservation_date`,t),sessionStorage.setItem(`beauty_reservation_time`,``),sessionStorage.setItem(`card_payment_amount`,String(p.reduce((e,t)=>e+t.price*t.quantity,0))),r&&sessionStorage.setItem(`beauty_staff_id`,String(h)),location.href=`/merchant-card-ocr?mode=ocr&merchant_id=`+encodeURIComponent(e)})}}else if(Q===`/kiosk-success`){let e=sessionStorage.getItem(`kiosk_order_no`),t=sessionStorage.getItem(`kiosk_merchant_id`),n=sessionStorage.getItem(`kiosk_items`),r=sessionStorage.getItem(`kiosk_total_amount`),i=sessionStorage.getItem(`kiosk_call_number`),a=n?JSON.parse(n):[];if(!e||!t||!r)Z.innerHTML=`
          <div class="page">
            <div class="payment-card">
              <h1>주문 정보가 없습니다.</h1>
              <button onclick="location.href='/kiosk?merchant_id=1'">상점으로 돌아가기</button>
            </div>
          </div>
        `;else{let{error:n}=await X.from(`orders`).insert({merchant_id:Number(t),order_no:e,items:a,beauty_staff_id:sessionStorage.getItem(`beauty_staff_id`)?Number(sessionStorage.getItem(`beauty_staff_id`)):null,reservation_date:sessionStorage.getItem(`beauty_reservation_date`)||null,reservation_time:sessionStorage.getItem(`beauty_reservation_time`)||null,customer_name:sessionStorage.getItem(`beauty_customer_name`)||null,customer_phone:sessionStorage.getItem(`beauty_customer_phone`)||null,total_amount:Number(r),order_status:`접수`,payment_status:`결제완료`}),{data:o}=await X.from(`merchants`).select(`merchant_name, fee_rate, settlement_cycle, branch_admin_id, agency_admin_id, manager_admin_id`).eq(`id`,Number(t)).maybeSingle(),s=Number(r),c=Number(o?.fee_rate||0),l=Math.floor(s*c/100),u=s-l,d=o?.manager_admin_id,f=``,p=0,m=o?.agency_admin_id?Number(o.agency_admin_id):null,h=``,g=0,_=o?.branch_admin_id?Number(o.branch_admin_id):null,v=``,y=0,b=String(o?.settlement_cycle||`4일`),x=e=>e?Number(b===`1일`?e.commission_rate_1day||0:b===`3일`?e.commission_rate_3day||0:b===`7일`?e.commission_rate_7day||0:e.commission_rate_4day||0):0;if(d){let{data:e}=await X.from(`admin_users`).select(`id, admin_name, parent_admin_id, commission_rate_1day, commission_rate_3day, commission_rate_4day, commission_rate_7day`).eq(`id`,Number(d)).maybeSingle();e&&(f=e.admin_name||``,p=x(e),!m&&e.parent_admin_id&&(m=Number(e.parent_admin_id)))}if(m){let{data:e}=await X.from(`admin_users`).select(`id, admin_name, parent_admin_id, commission_rate_1day, commission_rate_3day, commission_rate_4day, commission_rate_7day`).eq(`id`,m).maybeSingle();e&&(h=e.admin_name||``,g=x(e),!_&&e.parent_admin_id&&(_=Number(e.parent_admin_id)))}if(_){let{data:e}=await X.from(`admin_users`).select(`id, admin_name, commission_rate_1day, commission_rate_3day, commission_rate_4day, commission_rate_7day`).eq(`id`,_).maybeSingle();e&&(v=e.admin_name||``,y=x(e))}if(d){let{data:e}=await X.from(`admin_users`).select(`id, admin_name, commission_rate, parent_admin_id`).eq(`id`,Number(d)).maybeSingle();e&&(f=e.admin_name||``,p=Number(e.commission_rate||0),m=e.parent_admin_id?Number(e.parent_admin_id):null)}if(m){let{data:e}=await X.from(`admin_users`).select(`id, admin_name, commission_rate, parent_admin_id`).eq(`id`,m).maybeSingle();e&&(h=e.admin_name||``,g=Number(e.commission_rate||0),_=e.parent_admin_id?Number(e.parent_admin_id):null)}if(_){let{data:e}=await X.from(`admin_users`).select(`id, admin_name, commission_rate`).eq(`id`,_).maybeSingle();e&&(v=e.admin_name||``,y=Number(e.commission_rate||0))}let{error:S}=await X.from(`payments`).insert({order_id:e,payment_key:`kiosk-`+e,amount:s,fee_rate:c,fee_amount:l,settlement_amount:u,status:`paid`,merchant_id:Number(t),merchant_name:o?.merchant_name||``,beauty_staff_id:sessionStorage.getItem(`beauty_staff_id`)?Number(sessionStorage.getItem(`beauty_staff_id`)):null,reservation_date:sessionStorage.getItem(`beauty_reservation_date`)||null,reservation_time:sessionStorage.getItem(`beauty_reservation_time`)||null,manager_admin_id:d,manager_admin_name:f,manager_fee_rate:p,agency_admin_id:m,agency_admin_name:h,agency_fee_rate:g,branch_admin_id:_,branch_admin_name:v,branch_fee_rate:y,order_status:`준비중`,pg_company:`코페이`});S&&alert(`결제내역 저장 실패: `+S.message),n?Z.innerHTML=`
            <div class="page">
              <div class="payment-card">
                <h1>주문 저장 실패</h1>
                <p>${n.message}</p>
              </div>
            </div>
          `:(sessionStorage.removeItem(`kiosk_order_no`),sessionStorage.removeItem(`kiosk_merchant_id`),sessionStorage.removeItem(`kiosk_items`),sessionStorage.removeItem(`kiosk_total_amount`),sessionStorage.removeItem(`beauty_customer_name`),sessionStorage.removeItem(`beauty_customer_phone`),Z.innerHTML=`
  <div class="page">
    <div class="payment-card">

      <h1 style="
  font-size:28px;
  margin-bottom:20px;
  font-weight:700;
">
  결제가 완료되었습니다.
</h1>

      <p style="
  margin-top:25px;
  font-size:40px;
  font-weight:800;
  margin-bottom:10px;
">
  주문번호
</p>

      <div style="
  font-size:150px;
  font-weight:900;
  color:#d4af37;
  line-height:1;
  margin:10px 0 30px;
">
  ${i}
</div>

      <div style="
  background:#f8f5ee;
  border-radius:12px;
  padding:20px;
  margin:20px auto;
  width:80%;
  font-size:28px;
  font-weight:bold;
">
  결제금액 :
  ${Number(r).toLocaleString()}원
</div>

      <p style="
  margin-top:30px;
  font-size:30px;
  font-weight:600;
">
  잠시만 기다려주세요.
</p>
<button id="receipt-view-btn" class="receipt-view-btn">
  영수증 확인
</button>

<div id="receipt-modal" class="receipt-modal">
  <div class="receipt-box receipt-approve">

    <div class="receipt-header">
      <h2>NXG PICK</h2>
      <h3>신용카드 매출전표 <span>(승인)</span></h3>
    </div>

    <section>
      <h4>결제정보</h4>
      <table>
        <tr>
          <th>카드번호</th>
          <td>결제사 제공값</td>
          <th>카드종류</th>
          <td>신용카드</td>
        </tr>
        <tr>
          <th>거래종류</th>
          <td>승인성공</td>
          <th>할부개월</th>
          <td>일시불</td>
        </tr>
        <tr>
          <th>거래일시</th>
          <td colspan="3">${new Date().toLocaleString()}</td>
        </tr>
      </table>
    </section>

    <div class="receipt-grid">
      <section>
        <h4>구매정보</h4>
        <table>
          <tr><th>주문자명</th><td>-</td></tr>
          <tr><th>승인번호</th><td>-</td></tr>
          <tr><th>주문번호</th><td>${i}</td></tr>
          <tr><th>상품명 / 구매자</th><td>-</td></tr>
        </table>
      </section>

      <section>
        <h4>결제금액정보</h4>
        <table>
          <tr><th>과세금액</th><td>${Math.floor(Number(r)/1.1).toLocaleString()}원</td></tr>
          <tr><th>비과세금액</th><td>0원</td></tr>
          <tr><th>부가세</th><td>${(Number(r)-Math.floor(Number(r)/1.1)).toLocaleString()}원</td></tr>
          <tr><th>주문금액</th><td>${Number(r).toLocaleString()}원</td></tr>
          <tr><th>할인금액</th><td>0원</td></tr>
          <tr class="receipt-total"><th>총 결제금액</th><td>${Number(r).toLocaleString()}원</td></tr>
        </table>
      </section>
    </div>

    <section>
      <h4>상점정보</h4>
      <table>
        <tr><th>상점명</th><td>-</td><th>대표자명</th><td>-</td></tr>
        <tr><th>URL주소</th><td>-</td><th>사업자번호</th><td>-</td></tr>
        <tr><th>이용/환불문의</th><td colspan="3">-</td></tr>
        <tr><th>주소</th><td colspan="3">-</td></tr>
      </table>
    </section>

    <section>
      <h4>결제서비스업체(PG)정보</h4>
      <table>
        <tr><th>카드사 가맹점명</th><td>토스페이먼츠</td><th>사업자번호</th><td>-</td></tr>
        <tr><th>대표자명</th><td>-</td><th>가맹점번호</th><td>-</td></tr>
        <tr><th>주소</th><td colspan="3">-</td></tr>
      </table>
    </section>

    <div class="receipt-notice">
      * 신용카드 청구서에는 실제 결제 PG사명으로 표시됩니다.<br>
      * 본 매출전표는 부가가치세법 기준에 따라 발행되었습니다.
    </div>

    <div class="receipt-actions">
      <button>이메일 발송</button>
      <button onclick="window.print()">인쇄하기</button>
      <button id="receipt-close-btn">닫기</button>
    </div>

  </div>
</div>

</div>
</div>
`,document.querySelector(`#receipt-view-btn`)?.addEventListener(`click`,()=>{document.querySelector(`#receipt-modal`).style.display=`flex`}),document.querySelector(`#receipt-close-btn`)?.addEventListener(`click`,()=>{document.querySelector(`#receipt-modal`).style.display=`none`}))}}else if(Q===`/kiosk-card-success`){let e=sessionStorage.getItem(`card_payment_merchant_id`),t=sessionStorage.getItem(`card_payment_items`),n=sessionStorage.getItem(`card_payment_amount`),r=t?JSON.parse(t):[],{data:i,error:a}=await X.rpc(`get_next_call_number`,{target_merchant_id:Number(e)});if(a||!i)Z.innerHTML=`
            <div class="page">
              <div class="payment-card">
                <h1>주문번호 생성에 실패했습니다.</h1>
              </div>
            </div>
          `;else{let t=Number(i),a=`CARD-`+t+`-`+Date.now();if(!e||!n)Z.innerHTML=`
              <div class="page">
                <div class="payment-card">
                  <h1>주문 정보가 없습니다.</h1>
                </div>
              </div>
            `;else{let{error:i}=await X.from(`orders`).insert({merchant_id:Number(e),order_no:String(t),call_number:t,pg_order_id:a,items:r,total_amount:Number(n),order_status:`접수`,payment_status:`결제완료`,beauty_staff_id:sessionStorage.getItem(`beauty_staff_id`)?Number(sessionStorage.getItem(`beauty_staff_id`)):null,reservation_date:sessionStorage.getItem(`beauty_reservation_date`)||null,reservation_time:sessionStorage.getItem(`beauty_reservation_time`)||null});i&&(Z.innerHTML=`
                <div class="page">
                  <div class="payment-card">
                    <h1>주문 저장에 실패했습니다.</h1>
                  </div>
                </div>
              `)}}let o=Number(i),s=`CARD-`+o+`-`+Date.now();if(!e||!n)Z.innerHTML=`
          <div class="page">
            <div class="payment-card">
              <h1>주문 정보가 없습니다.</h1>
            </div>
          </div>
        `;else{let{error:t}=await X.from(`orders`).insert({merchant_id:Number(e),order_no:s,items:r,total_amount:Number(n),order_status:`접수`,payment_status:`결제완료`});t?Z.innerHTML=`
            <div class="page">
              <div class="payment-card">
                <h1>주문 저장 실패</h1>
                <p>${t.message}</p>
              </div>
            </div>
          `:Z.innerHTML=`
            <div class="page">
              <div class="payment-card">
                <h1>결제가 완료되었습니다.</h1>
                <p>주문번호</p>
                <div style="
                  font-size:100px;
                  font-weight:900;
                  color:#d4af37;
                ">
                  ${o}
                </div>
                <p>
                  결제금액 :
                  ${Number(n).toLocaleString()}원
                </p>
              </div>
            </div>
          `}}else Z.innerHTML=`
        <div class="page">
        <div class="landing-card">
         <p class="brand-title">PAY FLOW</p>
         <h1>모바일 축의금 · 부의금 결제 솔루션</h1> 

         <p class="hero-badge">
  QR · 링크 · 모바일 간편결제 지원
</p>
  
          <p class="landing-subtitle">
            결혼식과 장례식에서 QR·링크·카카오 공유로 간편하게 결제하고,
            관리자 페이지에서 행사별 정산까지 확인할 수 있습니다.
          </p>

          <div class="landing-features">
            <div>QR 결제</div>
            <div>링크 공유</div>
            <div>카카오 공유</div>
            <div>행사별 정산</div>
            <div>계좌 등록</div>
            <div>관리자 대시보드</div>
          </div>
  
          <div class="landing-buttons">
         <button class="gold-button" id="create-button">행사 생성하기</button>
<button class="gold-button" id="admin-button">관리자 페이지</button>
<button class="gold-button" id="contact-button">도입 문의</button>   
          </div>
  
          <div class="demo-section">
  <h2>데모 체험</h2>

  <div class="demo-cards">
    <a class="demo-card wedding-demo" href="/wedding">
      💍 웨딩 결제 데모
    </a>

    <a class="demo-card funeral-demo" href="/funeral">
      🕊 장례 결제 데모
    </a>
  </div>
</div>
  
          <p class="secure-text">
            웨딩홀 · 장례식장 · 행사 업체를 위한 비대면 결제 관리 시스템
          </p>
         
          <div class="landing-flow">
  <h2>이용 흐름</h2>

    <div class="flow-steps">
    <div>1. 행사 생성</div>
    <div>2. 링크/QR 공유</div>
    <div>3. 고객 결제</div>
    <div>4. 관리자 정산</div>
  </div>
</div>
</div>
</div>
`,document.querySelector(`#create-button`).addEventListener(`click`,()=>{window.location.href=`/create`}),document.querySelector(`#admin-button`).addEventListener(`click`,()=>{window.location.href=`/admin`}),document.querySelector(`#contact-button`).addEventListener(`click`,()=>{window.location.href=`sms:010-9938-2962?body=%EC%95%88%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94.%20%EB%AA%A8%EB%B0%94%EC%9D%BC%20%EC%B6%95%EC%9D%98%EA%B8%88%2F%EB%B6%80%EC%9D%98%EA%B8%88%20%EA%B2%B0%EC%A0%9C%20%EC%86%94%EB%A3%A8%EC%85%98%20%EB%8F%84%EC%9E%85%20%EB%AC%B8%EC%9D%98%EB%93%9C%EB%A6%BD%EB%8B%88%EB%8B%A4.`});function cx(){let e=new Date,t=String(e.getFullYear()),n=String(e.getMonth()+1).padStart(2,`0`),r=String(e.getDate()).padStart(2,`0`),i=String(e.getHours()).padStart(2,`0`),a=String(e.getMinutes()).padStart(2,`0`),o=String(e.getSeconds()).padStart(2,`0`);return t+n+r+i+a+o}async function lx(e,t,n,r){let i=e+t+String(n)+r,a=new TextEncoder().encode(i),o=await crypto.subtle.digest(`SHA-256`,a);return Array.from(new Uint8Array(o)).map(e=>e.toString(16).padStart(2,`0`)).join(``)}