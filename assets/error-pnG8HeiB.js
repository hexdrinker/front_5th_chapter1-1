var g=Object.defineProperty;var y=(e,t,s)=>t in e?g(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var u=(e,t,s)=>y(e,typeof t!="symbol"?t+"":t,s);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function s(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(n){if(n.ep)return;n.ep=!0;const a=s(n);fetch(n.href,a)}})();const i={SET_USER:"SET_USER",LOGIN:"LOGIN",LOGOUT:"LOGOUT",UPDATE_USER:"UPDATE_USER"},x={user:null,isLoggedIn:!1},m=e=>Object.freeze({...e}),v=(e,t)=>{switch(t.type){case i.SET_USER:return m({...e,user:t.payload});case i.LOGIN:return m({...e,user:t.payload,isLoggedIn:!0});case i.LOGOUT:return m({...e,user:null,isLoggedIn:!1});case i.UPDATE_USER:return m({...e,user:{...e.user,...t.payload}});default:return e}},w=()=>{let e=m(x);const t=[],s=()=>e,o=r=>{if(!r||typeof r!="object"||!r.type)return;const c=v(e,r);c!==e&&(e=c,t.forEach(f=>f(e)))};return{getState:s,mutations:{setUser:r=>o({type:i.SET_USER,payload:r}),login:r=>o({type:i.LOGIN,payload:r}),logout:()=>o({type:i.LOGOUT}),updateUser:r=>o({type:i.UPDATE_USER,payload:r})},subscribe:r=>typeof r!="function"?(console.error("Listener must be a function."),()=>{}):(t.push(r),()=>{const c=t.indexOf(r);c>-1&&t.splice(c,1)})}},l=w();class I{constructor(t){u(this,"root",null);u(this,"routes",{});u(this,"authRequired",["/profile"]);u(this,"publicOnly",["/login"]);u(this,"basePath","/front_5th_chapter1-1");this.routes=t,this.root=document.getElementById("root")||document.body,window.addEventListener("DOMContentLoaded",()=>this.handleRoute()),this.initEventListeners(),this.initClickHandler(),l.subscribe(()=>this.handleRoute())}initEventListeners(){}initClickHandler(){document.addEventListener("click",t=>{t.target.tagName==="A"&&(t.preventDefault(),this.handleClickLink(t))})}handleClickLink(){}getPath(){return"/"}checkAccess(t){const{isLoggedIn:s}=l.getState();return this.authRequired.includes(t)?s:this.publicOnly.includes(t)?!s:!0}handleRoute(){const t=this.getPath(),{isLoggedIn:s}=l.getState();if(!this.checkAccess(t)){s?this.navigateTo("/"):this.navigateTo("/login");return}const n=(this.routes[t]||this.routes[404])({...l.getState()});this.root.innerHTML=n.html,n.mount(this.root),window.scrollTo(0,0)}navigateTo(){}}function d(e,t){return(s={})=>({html:e(s),mount:o=>{t&&t(o,s)}})}const p="user",S=({username:e,email:t,bio:s})=>{const o={username:e,email:t,bio:s};return localStorage.setItem(p,JSON.stringify(o)),l.mutations.login(o),window.navigateTo("/"),o},L=()=>{localStorage.getItem(p)&&(localStorage.removeItem(p),l.mutations.logout(),window.navigateTo("/login"))},O=({username:e,email:t,bio:s})=>{const o={username:e,email:t,bio:s};l.mutations.updateUser(o),localStorage.setItem(p,JSON.stringify(o))},P=()=>{const e=localStorage.getItem(p);if(!e){l.mutations.logout();return}const t=JSON.parse(e);return l.mutations.login(t),t},b=d(({isLoggedIn:e})=>{const t=o=>{const n=window.location.href.includes("index.hash.html");if(console.log(n),n){const a=window.location.hash,r=a?a.substring(1):"/";return console.log(r,o),r===o}return console.log(o,window.location.pathname),window.location.pathname.endsWith(o)};return`
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          ${(e?[{path:"/",text:"홈"},{path:"/profile",text:"프로필"},{path:"#",text:"로그아웃",id:"logout"}]:[{path:"/",text:"홈"},{path:"/login",text:"로그인"}]).map(o=>`
                <li>
                  <a 
                    href="${o.path}" 
                    class="${t(o.path)?"text-blue-600 font-bold":"text-gray-600"}"
                    ${o.id?`id="${o.id}"`:""}
                  >
                    ${o.text}
                  </a>
                </li>
              `).join("")}
        </ul>
      </nav>
    `},e=>{const t=e.querySelector("#logout");t&&t.addEventListener("click",s=>{s.preventDefault(),L()})}),h=d(()=>`
    <footer class="bg-gray-200 p-4 text-center">
      <p>&copy; ${new Date().getFullYear()} 항해플러스. All rights reserved.</p>
    </footer>
  `,()=>{}),E=d(({content:e,createdAt:t,thumbnail:s,author:o})=>`
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center mb-2">
          <img src="${s}" alt="프로필" class="w-10 h-10 rounded-full mr-2">
          <div>
            <p class="font-bold">${o}</p>
            <p class="text-sm text-gray-500">${t}</p>
          </div>
        </div>
        <p>${e}</p>
        <div class="mt-2 flex justify-between text-gray-500">
          <button>좋아요</button>
          <button>댓글</button>
          <button>공유</button>
        </div>
      </div>
    `,()=>{}),U=[{id:1,content:"오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",createdAt:"5분 전",thumbnail:"https://menu.moneys.co.kr/moneyweek/thumb/2025/01/10/06/2025011016581868696_1.jpg",author:"윈터"},{id:2,content:"아 저녁 뭐 먹지?",createdAt:"15분 전",thumbnail:"https://img.khan.co.kr/lady/2023/07/25/news-p.v1.20230725.e1c02b0bdeb04153bc35d5f1e7c58952.png",author:"공유"},{id:3,content:"항해 화이팅",createdAt:"2시간 전",thumbnail:"https://i.namu.wiki/i/5T0t5RmKUuagSX92QJJXRbH6alkHcUUuCIGrKvhBsw_m7F9VNIMP_jj9iOFOUmeHkZ1eRomkeyi7yhyUAd4eIg.webp",author:"예지"},{id:4,content:"오늘이 일요일이라니,,,",createdAt:"4시간 전",thumbnail:"https://entertainimg.kbsmedia.co.kr/cms/uploads/PERSON_20220421091123_3fc3eded50f5447a91bc6a6d6631eded.jpg",author:"강동원"}],k=d(({isLoggedIn:e})=>{const t=b({isLoggedIn:e}),s=h(),o=U.map(({content:n,createdAt:a,thumbnail:r,author:c})=>E({content:n,createdAt:a,thumbnail:r,author:c}).html);return`
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          ${t.html}

          <main class="p-4">
            <div class="mb-4 bg-white rounded-lg shadow p-4">
              <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
              <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
            </div>

            <div class="space-y-4">
              ${o.join("")}
            </div>
          </main>

          ${s.html}
        </div>
      </div>
    `},(e,{isLoggedIn:t})=>{b({isLoggedIn:t}).mount(e)}),R=d(({isLoggedIn:e,user:t})=>{const s=b({isLoggedIn:e}),o=h();return`
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${s.html}

        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
              내 프로필
            </h2>
            <form id="profile-form">
              <div class="mb-4">
                <label
                  for="username"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >사용자 이름</label
                >
                <input
                  type="text"
                  id="username"
                  name="username"
                  value="${(t==null?void 0:t.username)||""}"
                  class="w-full p-2 border rounded"
                />
              </div>
              <div class="mb-4">
                <label
                  for="email"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >이메일</label
                >
                <input
                  type="email"
                  id="email"
                  name="email"
                  value="${(t==null?void 0:t.email)||""}"
                  class="w-full p-2 border rounded"
                />
              </div>
              <div class="mb-6">
                <label
                  for="bio"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >자기소개</label
                >
                <textarea
                  id="bio"
                  name="bio"
                  rows="4"
                  class="w-full p-2 border rounded"
                >${(t==null?void 0:t.bio)||""}</textarea
                >
              </div>
              <button
                type="submit"
                class="w-full bg-blue-600 text-white p-2 rounded font-bold"
              >
                프로필 업데이트
              </button>
            </form>
          </div>
        </main>

        ${o.html}
      </div>
    </div>
  `},(e,{isLoggedIn:t})=>{b({isLoggedIn:t}).mount(e);const s=e.querySelector("#profile-form");s&&s.addEventListener("submit",o=>{o.preventDefault();const n=e.querySelector("#username").value,a=e.querySelector("#email").value,r=e.querySelector("#bio").value;O({username:n,email:a,bio:r})})}),$=d(()=>`
      <main class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
          <form id="login-form">
            <div class="mb-4">
              <input type="text" id="username" name="username" placeholder="사용자 이름" class="w-full p-2 border rounded">
            </div>
            <div class="mb-6">
              <input type="password" id="password"name="password" placeholder="비밀번호" class="w-full p-2 border rounded">
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
          </form>
          <div class="mt-4 text-center">
            <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
          </div>
          <hr class="my-6">
          <div class="text-center">
            <button id="signup-button" class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
          </div>
        </div>
      </main>
    `,e=>{const t=e.querySelector("#login-form");t&&t.addEventListener("submit",s=>{s.preventDefault();const o=e.querySelector("#username").value;S({username:o,bio:"",email:""})})}),A=d(()=>`
      <main class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
          <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
          <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
          <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
          <p class="text-gray-600 mb-8">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
          <a href="/" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">
            홈으로 돌아가기
          </a>
        </div>
      </main>
    `,()=>{});export{A as E,k as H,$ as L,R as P,I as R,P as k};
