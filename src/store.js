const ActionTypes = {
  SET_USER: "SET_USER",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  UPDATE_USER: "UPDATE_USER",
};

const initialState = {
  user: null,
  isLoggedIn: false,
};

const createImmutable = (obj) => {
  return Object.freeze({ ...obj });
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return createImmutable({
        ...state,
        user: action.payload,
      });

    case ActionTypes.LOGIN:
      return createImmutable({
        ...state,
        user: action.payload,
        isLoggedIn: true,
      });

    case ActionTypes.LOGOUT:
      return createImmutable({
        ...state,
        user: null,
        isLoggedIn: false,
      });

    case ActionTypes.UPDATE_USER:
      return createImmutable({
        ...state,
        user: { ...state.user, ...action.payload },
      });

    default:
      return state;
  }
};

const createStore = () => {
  let currentState = createImmutable(initialState);
  const listeners = [];

  const getState = () => currentState;

  const dispatch = (action) => {
    if (!action || typeof action !== "object" || !action.type) {
      return;
    }

    const nextState = reducer(currentState, action);

    if (nextState !== currentState) {
      currentState = nextState;
      listeners.forEach((listener) => listener(currentState));
    }
  };

  const mutations = {
    setUser: (user) => dispatch({ type: ActionTypes.SET_USER, payload: user }),
    login: (user) => dispatch({ type: ActionTypes.LOGIN, payload: user }),
    logout: () => dispatch({ type: ActionTypes.LOGOUT }),
    updateUser: (userData) =>
      dispatch({ type: ActionTypes.UPDATE_USER, payload: userData }),
  };

  const subscribe = (listener) => {
    if (typeof listener !== "function") {
      console.error("Listener must be a function.");
      return () => {};
    }

    listeners.push(listener);

    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  };

  return {
    getState,
    mutations,
    subscribe,
  };
};

const store = createStore();

export default store;
