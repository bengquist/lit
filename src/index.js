import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import store from "./ducks/store";

const options = {
  position: "top center",
  timeout: 3500,
  offset: "20px",
  transition: "scale",
  type: "success"
};

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <HashRouter>
        <App />
      </HashRouter>
    </AlertProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
