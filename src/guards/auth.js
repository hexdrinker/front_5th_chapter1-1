import store from "../store";

export const authGuard = (authRequired = [], publicOnly = []) => {
  // eslint-disable-next-line
  return (path, context) => {
    const { isLoggedIn } = store.getState();

    if (authRequired.includes(path) && !isLoggedIn) {
      return "/login";
    }

    if (publicOnly.includes(path) && isLoggedIn) {
      return "/";
    }

    return true;
  };
};
