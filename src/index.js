import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "typeface-roboto";
import "./i18n.js";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div>loading...</div>}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
