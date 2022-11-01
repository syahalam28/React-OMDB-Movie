// Penggunaan Fetch dengan Thunk Async
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
const SET_LOGIN_PENDING = "SET_LOGIN_PENDING";
const SET_LOGIN_SUCCESS = "SET_LOGIN_SUCCESS";
const SET_LOGIN_ERROR = "SET_LOGIN_ERROR";

const intialState = {
  data: [],
  isLoginPending: false,
  isLoginSuccess: false,
  loginError: null,
};
const reducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_LOGIN_PENDING:
      return { ...state, isLoginPending: action.isLoginPending };
    case SET_LOGIN_SUCCESS:
      return { ...state, isLoginSuccess: action.isLoginSuccess };
    case SET_LOGIN_ERROR:
      return { ...state, loginError: action.loginError };
    case "SET_MOVIES":
      let data = action.payload ? action.payload : [];
      return { ...state, data: data };
    default:
      return state;
  }
};

// Login

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
