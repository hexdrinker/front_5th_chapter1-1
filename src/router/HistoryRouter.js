import Router from "./Router";

export default class HistoryRouter extends Router {
  constructor(routes) {
    super(routes);
  }

  initEventListeners() {
    window.addEventListener("popstate", () => this.handleRoute());
  }

  handleClickLink(e) {
    const pathname = e.target.pathname;
    const path = pathname.startsWith(this.basePath)
      ? pathname.slice(this.basePath.length)
      : pathname;
    this.navigateTo(path);
  }

  getPath() {
    const fullPath = window.location.pathname;
    return fullPath.startsWith(this.basePath)
      ? fullPath.slice(this.basePath.length) || "/"
      : fullPath;
  }

  navigateTo(path) {
    const fullPath = path.startsWith("/")
      ? `${this.basePath}${path}`
      : `${this.basePath}/${path}`;

    window.history.pushState({}, "", fullPath);
    this.handleRoute();
  }
}
