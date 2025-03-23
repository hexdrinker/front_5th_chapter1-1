import store from "../store.js";

const AUTH_KEY = "user";

const login = (username) => {
  const userData = { username };

  localStorage.setItem(AUTH_KEY, JSON.stringify(userData));

  store.setState({
    user: userData,
    isLoggedIn: true,
  });

  window.navigateTo("/");

  return userData;
};

const logout = () => {
  const loggedInUSer = localStorage.getItem(AUTH_KEY);
  if (!loggedInUSer) {
    return;
  }
  localStorage.removeItem(AUTH_KEY);

  store.setState({
    user: null,
    isLoggedIn: false,
  });

  window.navigateTo("/");
};

const isLoggedIn = () => {
  return store.getState().isLoggedIn;
};

const getCurrentUser = () => {
  return store.getState().user;
};

const keepAuth = () => {
  const userData = localStorage.getItem(AUTH_KEY);
  if (!userData) return null;

  const parsedUserData = JSON.parse(userData);

  store.setState({
    user: parsedUserData,
    isLoggedIn: true,
  });

  return parsedUserData;
};

export { login, logout, isLoggedIn, getCurrentUser, keepAuth };
