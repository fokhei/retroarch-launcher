import React from "react";
import ReactRom from "react-dom";
import App from "../containers/App";
import { AppEvent } from "../interfaces/AppEvent";
import { ipcRenderer } from "electron";
import rootReducer from "../reducers";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import "react-virtualized/styles.css";
import "react-notifications/lib/notifications.css";
import ErrorBoundary from "../components/ErrorBoundary";
import thunkMiddleware from "redux-thunk";

const onKeyUp = (evt: KeyboardEvent) => {
  if (evt.keyCode == 123) {
    //F12
    evt.preventDefault();
    ipcRenderer.send(AppEvent.OPEN_DEV_TOOLS);
  } else if (evt.keyCode == 116) {
    //F5
    evt.preventDefault();
    ipcRenderer.send(AppEvent.RELOAD);
  } else if (evt.keyCode == 83) {
    if (evt.ctrlKey) {
      //ctr + S
      evt.preventDefault();
      ipcRenderer.send(AppEvent.SAVE_SETTING);
    }
  }
};
window.addEventListener("keyup", onKeyUp, true);

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

ReactRom.render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>,
  document.getElementById("root")
);
