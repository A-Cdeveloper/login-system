import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import AuthContextProvider from "./store/authContext";
import { Provider } from "react-redux";
import store from "../src/store/redux/store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./main.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthContextProvider>
);
