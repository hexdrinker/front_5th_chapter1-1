import Router from "./Router";

export default class HashRouter extends Router {
  constructor(routes) {
    super(routes);
  }

  initEventListeners() {
    window.addEventListener("hashchange", () => this.handleRoute());
  }

  handleClickLink(e) {
    if (!e.target.getAttribute("href").includes("/")) {
      return;
    }
    this.navigateTo(e.target.getAttribute("href"));
  }

  getPath() {
    const hash = window.location.hash;
    return hash ? hash.substring(1) : "/";
  }

  navigateTo(path) {
    if (this.getPath() === path) return;

    window.location.hash = path;
  }
}
