import { app, BrowserWindow, ipcMain } from "electron";
import createMainWindow from "../libs/createMainWindow";
import { AppEvent } from "../interfaces/AppEvent";
import Jimp from "Jimp";



let mainWindow: BrowserWindow;
let devTools: BrowserWindow;

// app.commandLine.appendSwitch("--disable-http-cache");
app.whenReady().then(() => {
  mainWindow = createMainWindow();



  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      mainWindow = null;
      app.quit();
    }
  });
  
  // app.on("activate", () => {
  //   if (BrowserWindow.getAllWindows().length === 0) {
  //     mainWindow = createMainWindow();
  //   }
  // });
  
  ipcMain.on(AppEvent.OPEN_DEV_TOOLS, (_event: any) => {
    if (!devTools) {
      devTools = new BrowserWindow();
      devTools.removeMenu();
      mainWindow.webContents.setDevToolsWebContents(devTools.webContents);
      mainWindow.webContents.openDevTools({ mode: "detach" });
      mainWindow.webContents.once("did-finish-load", function () {
        const windowBounds = mainWindow.getBounds();
        devTools.setPosition(windowBounds.x + windowBounds.width, windowBounds.y);
        devTools.setSize(windowBounds.width / 2, windowBounds.height);
      });
    } else {
      devTools.show();
    }
  });
  ipcMain.on(AppEvent.RELOAD, (_event: any) => {
    mainWindow.reload();
  });
  
  ipcMain.on(
    AppEvent.WRITE_JIMP_IMAGE,
    (event: any, filePath: string, outPath: string) => {
      Jimp.read(filePath, (err: any, image: any) => {
        if (err) {
          event.reply(AppEvent.WRITE_JIMP_IMAGE_ERROR, err);
        } else {
          image.write(outPath, () => {
            event.reply(AppEvent.WRITE_JIMP_IMAGE_SUCCESS, err);
          });
        }
      });
    }
  );


});

