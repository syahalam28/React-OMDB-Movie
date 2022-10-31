// Penggunaan Fetch dengan Thunk Async
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

const intialState = {
  data: [],
};
const reducer = (state = intialState, action) => {
  switch (action.type) {
    case "SET_MOVIES":
      let data = action.payload ? action.payload : [];
      return { ...state, data: data };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
