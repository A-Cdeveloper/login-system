import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import AuthContextProvider from "./store/authContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./main.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
