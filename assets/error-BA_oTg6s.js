var S=Object.defineProperty;var L=(e,t,o)=>t in e?S(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var c=(e,t,o)=>L(e,typeof t!="symbol"?t+"":t,o);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();const d={SET_USER:"SET_USER",LOGIN:"LOGIN",LOGOUT:"LOGOUT",UPDATE_USER:"UPDATE_USER"},E={user:null,isLoggedIn:!1},g=e=>Object.freeze({...e}),P=(e,t)=>{switch(t.type){case d.SET_USER:return g({...e,user:t.payload});case d.LOGIN:return g({...e,user:t.payload,isLoggedIn:!0});case d.LOGOUT:return g({...e,user:null,isLoggedIn:!1});case d.UPDATE_USER:return g({...e,user:{...e.user,...t.payload}});default:return e}},U=()=>{let e=g(E);const t=[],o=()=>e,n=a=>{if(!a||typeof a!="object"||!a.type)return;const l=P(e,a);l!==e&&(e=l,t.forEach(v=>v(e)))};return{getState:o,mutations:{setUser:a=>n({type:d.SET_USER,payload:a}),login:a=>n({type:d.LOGIN,payload:a}),logout:()=>n({type:d.LOGOUT}),updateUser:a=>n({type:d.UPDATE_USER,payload:a})},subscribe:a=>typeof a!="function"?(console.error("Listener must be a function."),()=>{}):(t.push(a),()=>{const l=t.indexOf(a);l>-1&&t.splice(l,1)})}},u=U();class O{constructor(){c(this,"guards",[])}use(t){return this.guards.push(t),this}check(t,o){for(const n of this.guards){const r=n(t,o);if(r!==!0)return typeof r=="string"?r:!1}return!0}}const T=(e=[],t=[])=>(o,n)=>{const{isLoggedIn:r}=u.getState();return e.includes(o)&&!r?"/login":t.includes(o)&&r?"/":!0},I=[{id:1,content:"오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",createdAt:"5분 전",thumbnail:"https://menu.moneys.co.kr/moneyweek/thumb/2025/01/10/06/2025011016581868696_1.jpg",author:"윈터"},{id:2,content:"아 저녁 뭐 먹지?",createdAt:"15분 전",thumbnail:"https://img.khan.co.kr/lady/2023/07/25/news-p.v1.20230725.e1c02b0bdeb04153bc35d5f1e7c58952.png",author:"공유"},{id:3,content:"항해 화이팅",createdAt:"2시간 전",thumbnail:"https://i.namu.wiki/i/5T0t5RmKUuagSX92QJJXRbH6alkHcUUuCIGrKvhBsw_m7F9VNIMP_jj9iOFOUmeHkZ1eRomkeyi7yhyUAd4eIg.webp",author:"예지"},{id:4,content:"오늘이 일요일이라니,,,",createdAt:"4시간 전",thumbnail:"https://entertainimg.kbsmedia.co.kr/cms/uploads/PERSON_20220421091123_3fc3eded50f5447a91bc6a6d6631eded.jpg",author:"강동원"}],k=["/login"],R=["/profile"];class j{constructor(t){c(this,"root",null);c(this,"routes",{});c(this,"basePath","/front_5th_chapter1-1");c(this,"currentComponent",null);c(this,"currentPath",null);c(this,"guard",new O);this.routes=t,this.root=document.getElementById("root")||document.body,this.guard.use(T(R,k)),window.addEventListener("DOMContentLoaded",()=>this.handleRoute(),{once:!0}),this.initEventListeners(),this.initClickHandler(),u.subscribe(()=>this.handleRoute())}useGuard(t){return this.guard.use(t),this}initEventListeners(){}initClickHandler(){document.addEventListener("click",t=>{t.target.tagName==="A"&&(t.preventDefault(),this.handleClickLink(t))})}handleClickLink(){}getPath(){return"/"}handleRoute(){const t=this.getPath(),o=this.guard.check(t,{router:this,state:u.getState()});if(o!==!0){this.navigateTo(o);return}const n=this.currentPath===t;if(this.currentPath=t,n&&this.currentComponent){console.log("skip re-render");return}this.currentComponent&&(console.log("Unmount previous page"),this.currentComponent.unmount(),this.currentComponent=null);const s=(this.routes[t]||this.routes[404])({...u.getState()});this.root.innerHTML=s.html,s.mount(this.root),this.currentComponent=s,window.scrollTo(0,0)}navigateTo(){}}function m(e={}){const{name:t,render:o,onMount:n,onUpdate:r,onUnmount:s,defaultProps:a,defaultState:l}=e;return(v={})=>{let y=null,p={...l},f={...a,...v};const h={};return{html:o({...f,...p,children:h}),mount:i=>{y=i,console.log(`${t} is mounted.`),n==null||n(y,{...f,...p,children:h})},update:i=>{f={...f,...i},r==null||r(y,{...f,...p,children:h})},unmount:()=>{Object.values(h).forEach(i=>{i&&i.unmount&&typeof i.unmount=="function"&&i.unmount()}),console.log(`${t} is unmounted.`),s==null||s(y,{...f,...p,children:h}),p={...l}}}}}const b="user",_=({username:e,email:t,bio:o})=>{const n={username:e,email:t,bio:o};return localStorage.setItem(b,JSON.stringify(n)),u.mutations.login(n),window.navigateTo("/"),n},$=()=>{localStorage.getItem(b)&&(localStorage.removeItem(b),u.mutations.logout(),window.navigateTo("/login"))},A=({username:e,email:t,bio:o})=>{const n={username:e,email:t,bio:o};u.mutations.updateUser(n),localStorage.setItem(b,JSON.stringify(n))},D=()=>{const e=localStorage.getItem(b);if(!e){u.mutations.logout();return}const t=JSON.parse(e);return u.mutations.login(t),t},x=m({name:"Header",defaultState:{onLogout:null},render:({isLoggedIn:e})=>{const t=n=>{if(window.location.href.includes("index.hash.html")){const s=window.location.hash;return(s?s.substring(1):"/")===n}return window.location.pathname.endsWith(n)};return`
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          ${(e?[{path:"/",text:"홈"},{path:"/profile",text:"프로필"},{path:"#",text:"로그아웃",id:"logout"}]:[{path:"/",text:"홈"},{path:"/login",text:"로그인"}]).map(n=>`
                <li>
                  <a 
                    href="${n.path}" 
                    class="${t(n.path)?"text-blue-600 font-bold":"text-gray-600"}"
                    ${n.id?`id="${n.id}"`:""}
                  >
                    ${n.text}
                  </a>
                </li>
              `).join("")}
        </ul>
      </nav>
    `},onMount:(e,{onLogout:t})=>{const o=e.querySelector("#logout");t=n=>{n.preventDefault(),$()},o&&o.addEventListener("click",t)},onUnmount:(e,{onLogout:t})=>{const o=e.querySelector("#logout");o&&o.removeEventListener("click",t)}}),w=m({name:"Footer",render:()=>`
    <footer class="bg-gray-200 p-4 text-center">
      <p>&copy; ${new Date().getFullYear()} 항해플러스. All rights reserved.</p>
    </footer>
  `,onMount:()=>{},onUnmount:()=>{}}),C=m({name:"Post",render:({content:e,createdAt:t,thumbnail:o,author:n})=>`
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center mb-2">
          <img src="${o}" alt="프로필" class="w-10 h-10 rounded-full mr-2">
          <div>
            <p class="font-bold">${n}</p>
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
    `,onMount:()=>{},onUnmount:()=>{}}),N=m({name:"HomePage",render:({isLoggedIn:e,children:t})=>(t.header=x({isLoggedIn:e}),t.footer=w(),t.posts=I.map(({content:o,createdAt:n,thumbnail:r,author:s})=>C({content:o,createdAt:n,thumbnail:r,author:s})),`
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          ${t.header.html}

          <main class="p-4">
            <div class="mb-4 bg-white rounded-lg shadow p-4">
              <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
              <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
            </div>

            <div class="space-y-4">
              ${t.posts.map(o=>o.html).join("")}
            </div>
          </main>

          ${t.footer.html}
        </div>
      </div>
    `),onMount:(e,{children:t})=>{t.header.mount(e),t.footer.mount(e),t.posts.forEach(o=>o.mount(e))},onUnmount:()=>{}}),G=m({name:"ProfilePage",defaultState:{onSubmit:null},render:({isLoggedIn:e,user:t,children:o})=>(o.header=x({isLoggedIn:e}),o.footer=w(),`
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${o.header.html}
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
        ${o.footer.html}
      </div>
    </div>
  `),onMount:(e,{children:t,onSubmit:o})=>{t.header.mount(e),t.footer.mount(e),o=r=>{r.preventDefault();const s=e.querySelector("#username").value,a=e.querySelector("#email").value,l=e.querySelector("#bio").value;A({username:s,email:a,bio:l})};const n=e.querySelector("#profile-form");n&&n.addEventListener("submit",o)},onUnmount:(e,{onSubmit:t})=>{const o=e.querySelector("#profile-form");o&&o.removeEventListener("submit",t)}}),q=m({name:"LoginPage",defaultState:{onLogin:null},render:()=>`
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
    `,onMount:(e,{onLogin:t})=>{const o=e.querySelector("#login-form");t=n=>{n.preventDefault();const r=e.querySelector("#username").value;_({username:r,bio:"",email:""})},o&&o.addEventListener("submit",t)},onUnmount:(e,{onLogin:t})=>{const o=e.querySelector("#login-form");o&&o.removeEventListener("submit",t)}}),M=m({name:"ErrorPage",render:()=>`
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
    `,onMount:()=>{},onUnmount:()=>{}});export{M as E,N as H,q as L,G as P,j as R,D as k};
