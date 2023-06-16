// react
import React from "react";
import ReactDOM from "react-dom/client";
// routing
import { BrowserRouter } from "react-router-dom";
//components
import App from "./App.jsx";
// css
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
