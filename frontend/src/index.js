import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { store } from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("App"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <div>Test</div>
    <App />
  </Provider>
  // </React.StrictMode>
);
