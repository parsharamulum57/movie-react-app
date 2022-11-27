import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import combineReducers from "./reducers";
import thunk from "redux-thunk";

//logger(obj)(next)(action)
/*const logger = function ({ dispatch, getState }) {
  return function (next) {
    return function (action) {
      //middleWare code
      console.log(
        "In logger middle ware action = " + action.type + " next = " + next
      );
      next(action);
    };
  };
};*/

// Another way of writing
const logger =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action !== "function") {
      console.log("In logger middle ware action = " + action.type);
    }
    next(action);
  };

/* Instead of below code, we can use thunk provided by redux thunk 
const thunk =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    //console.log("action =", action);
    if (typeof action === "function") {
      action(store.dispatch);
      return;
    }
    next(action);
  };*/

const store = createStore(combineReducers, applyMiddleware(logger, thunk));

console.log("Store ", store);
console.log("STATE ", store.getState());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App store={store} />
  // </React.StrictMode>
);
