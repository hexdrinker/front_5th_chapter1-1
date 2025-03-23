import store from "./store";

export default class Router {
  root = null;
  routes = {};
  authRequired = ["/profile"];
  publicOnly = ["/login"];

  constructor(routes) {
    this.routes = routes;
    this.root = document.getElementById("root") || document.body;

    window.addEventListener("DOMContentLoaded", () => this.handleRoute());

    window.addEventListener("popstate", () => this.handleRoute());

    document.addEventListener("click", (e) => {
      if (
        e.target.tagName === "A" &&
        e.target.href.startsWith(window.location.origin)
      ) {
        e.preventDefault();
        this.navigateTo(e.target.pathname);
      }
    });
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
    const path = window.location.pathname;
    const { isLoggedIn } = store.getState();

    if (!this.checkAccess(path)) {
      if (isLoggedIn) {
        this.navigateTo("/");
      } else {
        this.navigateTo("/login");
      }
      return;
    }

    const component = this.routes[path] || this.routes["404"];
    const page = component();

    if (page.template) {
      this.root.innerHTML = page.template;

      if (page.init) {
        page.init();
      }
    } else {
      this.root.innerHTML = page;
    }
  }

  navigateTo(path) {
    window.history.pushState({}, "", path);
    this.handleRoute();
  }
}
