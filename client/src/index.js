import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { FileContextProvider } from "./contexts/index.jsx";

ReactDOM.render(
  <React.StrictMode>
    <FileContextProvider>
      <App />
    </FileContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
