import React, { createContext } from "react";
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

class Provider extends React.Component {
  render() {
    console.log("In Provider", this.props.children);
    return (
      <StoreContext.Provider value={this.props.store}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}

const store = createStore(combineReducers, applyMiddleware(logger, thunk));

console.log("Store ", store);
console.log("STATE ", store.getState());

export const StoreContext = createContext();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
