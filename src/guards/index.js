export class NavigationGuard {
  guards = [];

  use(fn) {
    this.guards.push(fn);
    return this;
  }

  check(path, context) {
    for (const guard of this.guards) {
      const result = guard(path, context);

      if (result !== true) {
        return typeof result === "string" ? result : false;
      }
    }
    return true;
  }
}
