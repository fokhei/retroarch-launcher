import { app, BrowserWindow, ipcMain } from "electron";
import createMainWindow from "../libs/createMainWindow";
import { AppEvent } from "../interfaces/AppEvent";
import Jimp from "Jimp";
import childProcess from "child_process";
import psTree from "ps-tree";
import { FavourState } from "../states/favourState";
import { AppConfigState } from "../states/appConfigState";
import fs from "fs";
import * as path from "path";
import { FAVOUR_FILE_NAME } from '../libs/constants';

let mainWindow: BrowserWindow;
let devTools: BrowserWindow;
let appConfig: AppConfigState;
let favour: FavourState;

const saveBeforeQuit = () => {
  if (appConfig) {
    if (favour) {
      const favourPath = path.resolve(appConfig.appDataDir, FAVOUR_FILE_NAME);
      fs.writeFileSync(favourPath, JSON.stringify({ list: favour.list }));
    }
  }
};

app.whenReady().then(() => {
  mainWindow = createMainWindow();
  mainWindow.on("close", (e) => {
    saveBeforeQuit();
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      mainWindow = null;
      const child = childProcess.exec("node -e 'while (true);'", () => {});
      psTree(child.pid, (_err: any, children: Array<any>) => {
        childProcess.spawn("kill", ["-9"].concat(children.map((p) => p.PID)));
      });
      app.quit();
    }
  });

  ipcMain.on(AppEvent.OPEN_DEV_TOOLS, (_event: any) => {
    if (!devTools) {
      devTools = new BrowserWindow();
      devTools.removeMenu();
      mainWindow.webContents.setDevToolsWebContents(devTools.webContents);
      mainWindow.webContents.openDevTools({ mode: "detach" });
      mainWindow.webContents.once("did-finish-load", function () {
        const windowBounds = mainWindow.getBounds();
        devTools.setPosition(
          windowBounds.x + windowBounds.width,
          windowBounds.y
        );
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

  ipcMain.on(
    AppEvent.SET_APP_CONFIG,
    (event: any, appConfigState: AppConfigState) => {
      appConfig = appConfigState;
      event.returnValue = true;
    }
  );

  ipcMain.on(
    AppEvent.SET_FAVOUR_STATE,
    (event: any, favourState: FavourState) => {
      favour = favourState;
      event.returnValue = true;
    }
  );
});
