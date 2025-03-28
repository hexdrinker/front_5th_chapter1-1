import store from "../store";
import { NavigationGuard } from "../guards";
import { authGuard } from "../guards/auth";
import { AUTH_REQUIRED_PATH, PUBLIC_ONLY_PATH } from "../constants";

export default class Router {
  root = null;
  routes = {};
  basePath = "/front_5th_chapter1-1";
  currentComponent = null;
  currentPath = null;
  guard = new NavigationGuard();

  constructor(routes) {
    this.routes = routes;
    this.root = document.getElementById("root") || document.body;

    this.guard.use(authGuard(AUTH_REQUIRED_PATH, PUBLIC_ONLY_PATH));

    window.addEventListener("DOMContentLoaded", () => this.handleRoute(), {
      once: true,
    });
    this.initEventListeners();
    this.initClickHandler();
    this.prevState = { ...store.getState() };

    const handleAuthStateChange = () => {
      const currentState = store.getState();

      if (this.prevState.isLoggedIn !== currentState.isLoggedIn) {
        console.log(
          "detect auth state changing:",
          currentState.isLoggedIn ? "loggedIn" : "loggedOut",
        );

        const targetPath = currentState.isLoggedIn ? "/" : "/login";
        if (this.getPath() !== targetPath) {
          this.navigateTo(targetPath);
        }

        this.prevState = { ...currentState };
      }
    };

    store.subscribe(handleAuthStateChange);
  }

  useGuard(guardFn) {
    this.guard.use(guardFn);
    return this;
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

  handleRoute() {
    const path = this.getPath();

    const isSamePath = this.currentPath === path;
    this.currentPath = path;

    if (isSamePath && this.currentComponent) {
      console.log("skip re-render");
      return;
    }

    const guardResult = this.guard.check(path, {
      router: this,
      state: store.getState(),
    });

    if (guardResult !== true) {
      this.navigateTo(guardResult);
      return;
    }

    if (this.currentComponent) {
      console.log("-------------------");
      this.currentComponent.unmount();
      this.currentComponent = null;
    }

    const Component = this.routes[path] || this.routes["404"];
    const component = Component({ ...store.getState() });

    this.root.innerHTML = component.html;
    component.mount(this.root);

    this.currentComponent = component;

    window.scrollTo(0, 0);
  }

  navigateTo() {}
}
