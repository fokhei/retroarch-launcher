import { app, BrowserWindow, ipcMain } from "electron";
import createMainWindow from "../libs/createMainWindow";
import { AppEvent } from "../interfaces/AppEvent";
import Jimp from "Jimp";
import childProcess from "child_process";
import psTree from "ps-tree";
import { AppConfigState } from "../states/appConfigState";
import fs from "fs";
import * as path from "path";
import { FAVOUR_FILE_NAME, UI_FILE_NAME } from "../libs/constants";
import { ExplorerConfig } from "../states/explorerState";
import { ItemFilter } from "../interfaces/itemFilter";

let mainWindow: BrowserWindow;
let devTools: BrowserWindow;
let appConfig: AppConfigState;
let favourList: Array<string>;
let explorerConfig: ExplorerConfig;
let itemFilter: ItemFilter;

const saveSetting = () => {
  if (appConfig) {
    if (explorerConfig && itemFilter) {
      const uiPath = path.resolve(appConfig.appDataDir, UI_FILE_NAME);
      fs.writeFileSync(
        uiPath,
        JSON.stringify({
          explorerConfig,
          itemFilter,
        })
      );
    }

    if (favourList) {
      const favourPath = path.resolve(appConfig.appDataDir, FAVOUR_FILE_NAME);
      fs.writeFileSync(favourPath, JSON.stringify({ list: favourList }));
    }
  }
};

app.whenReady().then(() => {
  mainWindow = createMainWindow();
  mainWindow.on("close", () => {
    saveSetting();
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
    devTools = new BrowserWindow();
    devTools.removeMenu();
    mainWindow.webContents.setDevToolsWebContents(devTools.webContents);
    mainWindow.webContents.openDevTools({ mode: "detach" });
    mainWindow.webContents.once("did-finish-load", function () {
      const windowBounds = mainWindow.getBounds();
      devTools.setPosition(windowBounds.x + windowBounds.width, windowBounds.y);
      devTools.setSize(windowBounds.width / 2, windowBounds.height);
    });

    devTools.show();
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

  ipcMain.on(AppEvent.SET_FAVOUR_LIST, (event: any, list: Array<string>) => {
    favourList = list;
    event.returnValue = true;
  });

  ipcMain.on(
    AppEvent.SET_EXPLORER_CONFIG,
    (event: any, config: ExplorerConfig) => {
      explorerConfig = config;
      event.returnValue = true;
    }
  );

  ipcMain.on(AppEvent.SET_ITEM_FILTER, (event: any, filter: ItemFilter) => {
    itemFilter = filter;
    event.returnValue = true;
  });

  ipcMain.on(AppEvent.SAVE_SETTING, (event: any) => {
    saveSetting();
    event.returnValue = true;
  });
});
