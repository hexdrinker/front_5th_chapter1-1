var p=Object.defineProperty;var b=(e,t,s)=>t in e?p(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var l=(e,t,s)=>b(e,typeof t!="symbol"?t+"":t,s);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();class f{constructor(){this.state={user:null,isLoggedIn:!1},this.listeners=[]}getState(){return this.state}setState(t){this.state={...this.state,...t},this.listeners.forEach(s=>s(this.state))}subscribe(t){return this.listeners.push(t),()=>{this.listeners=this.listeners.filter(s=>s!==t)}}}const a=new f;class v{constructor(t){l(this,"root",null);l(this,"routes",{});l(this,"authRequired",["/profile"]);l(this,"publicOnly",["/login"]);this.routes=t,this.root=document.getElementById("root")||document.body,window.addEventListener("DOMContentLoaded",()=>this.handleRoute()),this.initEventListeners(),this.initClickHandler()}initEventListeners(){}initClickHandler(){document.addEventListener("click",t=>{t.target.tagName==="A"&&(t.preventDefault(),this.handleClickLink(t))})}handleClickLink(){}getPath(){return"/"}checkAccess(t){const{isLoggedIn:s}=a.getState();return this.authRequired.includes(t)?s:this.publicOnly.includes(t)?!s:!0}handleRoute(){const t=this.getPath(),{isLoggedIn:s}=a.getState();if(!this.checkAccess(t)){s?this.navigateTo("/"):this.navigateTo("/login");return}const n=(this.routes[t]||this.routes[404])();n.template?(this.root.innerHTML=n.template,n.init&&n.init()):this.root.innerHTML=n,window.scrollTo(0,0)}navigateTo(){}}class x extends v{constructor(t){super(t)}initEventListeners(){window.addEventListener("popstate",()=>this.handleRoute())}handleClickLink(t){this.navigateTo(t.target.pathname)}getPath(){return window.location.pathname}navigateTo(t){window.history.pushState({},"",t),this.handleRoute()}}const d="user",w=({username:e,email:t,bio:s})=>{const i={username:e,email:t,bio:s};return localStorage.setItem(d,JSON.stringify(i)),a.setState({user:i,isLoggedIn:!0}),window.navigateTo("/"),i},y=()=>{localStorage.getItem(d)&&(localStorage.removeItem(d),a.setState({user:null,isLoggedIn:!1}),window.navigateTo("/login"))},L=({username:e,email:t,bio:s})=>{const i={username:e,email:t,bio:s};a.setState({user:i}),localStorage.setItem(d,JSON.stringify(i))},S=()=>{const e=localStorage.getItem(d);if(!e){a.setState({user:null,isLoggedIn:!1});return}const t=JSON.parse(e);return a.setState({user:t,isLoggedIn:!0}),t},m=({isLoggedIn:e})=>{const t=o=>{if(window.location.href.includes("index.hash.html")){const c=window.location.hash;return(c?c.substring(1):"/")===o}return window.location.pathname===o};return{template:`
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
  `,init:()=>{const o=document.getElementById("logout");o&&o.addEventListener("click",r=>{r.preventDefault(),y()})}}},h=()=>`
  <footer class="bg-gray-200 p-4 text-center">
    <p>&copy; ${new Date().getFullYear()} 항해플러스. All rights reserved.</p>
  </footer>
`,I=({content:e,createdAt:t,thumbnail:s,author:i})=>`
    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex items-center mb-2">
        <img src="${s}" alt="프로필" class="w-10 h-10 rounded-full mr-2">
        <div>
          <p class="font-bold">${i}</p>
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
  `,E=[{id:1,content:"오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",createdAt:"5분 전",thumbnail:"https://menu.moneys.co.kr/moneyweek/thumb/2025/01/10/06/2025011016581868696_1.jpg",author:"윈터"},{id:2,content:"아 저녁 뭐 먹지?",createdAt:"15분 전",thumbnail:"https://img.khan.co.kr/lady/2023/07/25/news-p.v1.20230725.e1c02b0bdeb04153bc35d5f1e7c58952.png",author:"공유"},{id:3,content:"항해 화이팅",createdAt:"2시간 전",thumbnail:"https://i.namu.wiki/i/5T0t5RmKUuagSX92QJJXRbH6alkHcUUuCIGrKvhBsw_m7F9VNIMP_jj9iOFOUmeHkZ1eRomkeyi7yhyUAd4eIg.webp",author:"예지"},{id:4,content:"오늘이 일요일이라니,,,",createdAt:"4시간 전",thumbnail:"https://entertainimg.kbsmedia.co.kr/cms/uploads/PERSON_20220421091123_3fc3eded50f5447a91bc6a6d6631eded.jpg",author:"강동원"}],k=()=>{const{isLoggedIn:e}=a.getState(),t=m({isLoggedIn:e});return{template:`
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${t.template}

        <main class="p-4">
          <div class="mb-4 bg-white rounded-lg shadow p-4">
            <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
            <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
          </div>

          <div class="space-y-4">
            ${E.map(n=>I({content:n.content,createdAt:n.createdAt,thumbnail:n.thumbnail,author:n.author})).join("")}
          </div>
        </main>

        ${h()}
      </div>
    </div>
  `,init:()=>{t.init()}}},$=()=>{const{isLoggedIn:e,user:t}=a.getState(),s=m({isLoggedIn:e});return{template:`
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${s.template}

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

        ${h()}
      </div>
    </div>
  `,init:()=>{s.init();const o=document.querySelector("#profile-form");o&&o.addEventListener("submit",r=>{r.preventDefault();const c=document.getElementById("username").value,u=document.getElementById("email").value,g=document.getElementById("bio").value;L({username:c,email:u,bio:g})})}}},P=()=>({template:`
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
  `,init:()=>{const s=document.getElementById("login-form");s&&s.addEventListener("submit",i=>{i.preventDefault();const n=document.getElementById("username").value;w({username:n,bio:"",email:""})})}}),O=()=>`
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
`,A={"/":k,"/profile":$,"/login":P,404:O};if(!document.getElementById("root")){const e=document.createElement("div");e.id="root",document.body.appendChild(e)}const T=new x(A);window.navigateTo=e=>T.navigateTo(e);S();
