import { BrowserWindow } from "electron";
import { format as formatUrl } from "url";
import * as path from "path";
import AppConfig from '../libs/AppConfig';

const createMainWindow = (config?: AppConfig) => {
  const isDevelopment = process.env.NODE_ENV !== "production";

  let windowOption: Electron.BrowserWindowConstructorOptions = {
    width: 1060,
    height: 560,
    darkTheme: true,
    webPreferences: { nodeIntegration: true, webSecurity: false }
  };
  if (config && config.windowOption) {
    Object.assign(windowOption, config.windowOption);
  }

  const window = new BrowserWindow(windowOption);
  window.removeMenu();
  // if (isDevelopment) {
  //    window.webContents.openDevTools();
  // }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true
      })
    );
  }

  // window.webContents.on("devtools-opened", () => {
  //   window.focus();
  //   setImmediate(() => {
  //     window.focus();
  //   });
  // });

  return window;
};

export default createMainWindow;
