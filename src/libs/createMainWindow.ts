import { BrowserWindow } from "electron";
import { format as formatUrl } from "url";
import * as path from "path";



const createMainWindow = () => {
  const isDevelopment = process.env.NODE_ENV !== "production";

  let windowOption: Electron.BrowserWindowConstructorOptions = {
    width: 1120,
    height: 560,
    minWidth: 800,
    minHeight: 480,
    

    darkTheme: true,
    webPreferences: { nodeIntegration: true, webSecurity: false },
  };

  const window = new BrowserWindow(windowOption);
  window.removeMenu();

 

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true,
      })
    );
  }

  return window;
};

export default createMainWindow;
