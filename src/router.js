import store from "./store";

export default class Router {
  root = null;
  routes = {};
  authRequired = ["/profile"];
  publicOnly = ["/login"];
  basePath = "/front_5th_chapter1-1";

  constructor(routes) {
    this.routes = routes;
    this.root = document.getElementById("root") || document.body;

    window.addEventListener("DOMContentLoaded", () => this.handleRoute());
    this.initEventListeners();
    this.initClickHandler();

    store.subscribe(() => this.handleRoute());
  }

  initEventListeners() {}

  initClickHandler() {
    document.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault();
        this.handleClickLink(e);
      }
    });
  }

  handleClickLink() {}

  getPath() {
    return "/";
  }

  checkAccess(path) {
    const { isLoggedIn } = store.getState();

    if (this.authRequired.includes(path)) {
      return isLoggedIn;
    }

    if (this.publicOnly.includes(path)) {
      return !isLoggedIn;
    }

    return true;
  }

  handleRoute() {
    const path = this.getPath();
    const { isLoggedIn } = store.getState();

    if (!this.checkAccess(path)) {
      if (isLoggedIn) {
        this.navigateTo("/");
      } else {
        this.navigateTo("/login");
      }
      return;
    }

    const Component = this.routes[path] || this.routes["404"];
    // 페이지마다 글로벌 상태 공유
    const component = Component({ ...store.getState() });

    this.root.innerHTML = component.html;
    component.mount(this.root);

    window.scrollTo(0, 0);
  }

  navigateTo() {}
}
