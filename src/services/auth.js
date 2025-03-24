import store from "../store.js";

const AUTH_KEY = "user";

const login = ({ username, email, bio }) => {
  const userData = {
    username,
    email,
    bio,
  };

  localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
  store.mutations.login(userData);
  window.navigateTo("/");

  return userData;
};

const logout = () => {
  const loggedInUSer = localStorage.getItem(AUTH_KEY);
  if (!loggedInUSer) {
    return;
  }
  localStorage.removeItem(AUTH_KEY);

  store.mutations.logout();

  window.navigateTo("/login");
};

const isLoggedIn = () => {
  return store.getState().isLoggedIn;
};

const getCurrentUser = () => {
  return store.getState().user;
};

const updateUser = ({ username, email, bio }) => {
  const userData = {
    username,
    email,
    bio,
  };

  store.mutations.updateUser(userData);
  localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
};

const keepAuth = () => {
  const userData = localStorage.getItem(AUTH_KEY);
  if (!userData) {
    store.mutations.logout();
    return;
  }

  const parsedUserData = JSON.parse(userData);
  store.mutations.login(parsedUserData);

  return parsedUserData;
};

export { login, logout, updateUser, isLoggedIn, getCurrentUser, keepAuth };
