import { app, BrowserWindow } from "electron";
import createMainWindow from "./createWindow";
import { AppEvent } from "../libs/AppEvent";
import { ipcMain } from "electron";
import fs from "fs";
import * as path from "path";
import { RetroArchPlayList } from "../libs/RetroArchPlayList";
import { ComputedPlayListItem } from "../libs/ComputedPlaylistItem";
import { ComputedPlayListMap } from "../libs/ComputedPlayListMap";
import { ThumbnailType } from "../libs/ThumbnailType";
import { toRetroArchThumbnail } from "../libs/toRetroArchThumbnail";
import rimraf from "rimraf";
import Jimp from "Jimp";
import lazy from "lazy.js";
import { RetroArchPlayListItem } from "../libs/RetroArchPlayListItem";

let _id = 0;
let mainWindow: BrowserWindow | null;
let config: AppConfig;
let critialError: string | null = null;
let lpls: Array<string> = [];
let items: Array<ComputedPlayListItem> = [];
let itemsMap: ComputedPlayListMap = {};

const configPath = "./config.json";
if (fs.existsSync(configPath)) {
  try {
    const text: any = fs.readFileSync(configPath);
    config = JSON.parse(text) as AppConfig;
  } catch (e) {
    critialError = "parse error on config.json";
  }
} else {
  critialError = "config.json not found!";
}

ipcMain.on(AppEvent.MAIN_VIEW_MOUNT, (event: any) => {
  if (config) {
    event.reply(AppEvent.CONFIG, config);
  } else {
    event.reply(AppEvent.CRITICAL_ERROR, critialError);
  }
});

ipcMain.on(AppEvent.REFRESH_PLAYLISTS, (event: any) => {
  _id = 0;
  lpls = [];
  items = [];
  itemsMap = {};
  const files = fs.readdirSync(config.retroArch.dir.playlists);
  files.map((file: string) => {
    const ext = path.extname(file);
    if (ext == ".lpl") {
      lpls.push(file);
      const text: any = fs.readFileSync(
        path.resolve(config.retroArch.dir.playlists, file)
      );
      const playlist = JSON.parse(text) as RetroArchPlayList;
      playlist.items.map(item => {
        const category = file.replace(ext, "");
        const computedItem = createComputedPlayListItem(item, category);
        items.push(computedItem);
        itemsMap[computedItem.id.toString()] = computedItem;
      });
    }
  });
  event.reply(AppEvent.PLAYLISTS, lpls.sort(), items, itemsMap);
});

ipcMain.on(AppEvent.REFRESH_PLAYLIST, (event: any, category: string) => {
  removeItemsByCategory(category);
  const file = category + ".lpl";
  const text: any = fs.readFileSync(
    path.resolve(config.retroArch.dir.playlists, file)
  );
  const playlist = JSON.parse(text) as RetroArchPlayList;
  playlist.items.map(item => {
    const computedItem = createComputedPlayListItem(item, category);
    items.push(computedItem);
    itemsMap[computedItem.id.toString()] = computedItem;
  });
  event.reply(AppEvent.PLAYLISTS, lpls.sort(), items, itemsMap);
});


const createComputedPlayListItem = (
  item: RetroArchPlayListItem,
  category: string
): ComputedPlayListItem => {
  const id = ++_id;
  return {
    ...item,
    id,
    category,
    basename: path.basename(item.path),
    extname: path.extname(item.path)
  };
};

ipcMain.on(AppEvent.IS_FILE_EXISTS, (event: any, filePath: string) => {
  event.returnValue = fs.existsSync(filePath);
});

ipcMain.on(
  AppEvent.SET_THUMBNAIL,
  (
    event: any,
    filePath: string,
    item: ComputedPlayListItem,
    thumbnailType: ThumbnailType
  ) => {
    const ext = path.extname(filePath).toLowerCase();

    const thumbnailDir = config.retroArch.dir.thumbnails.replace(/\\/gi, "/");
    
    const dbDir = path.resolve(thumbnailDir, item.db_name);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir);
    }

    const typeDir = path.resolve(dbDir, thumbnailType);
    if (!fs.existsSync(typeDir)) {
      fs.mkdirSync(typeDir);
    }
    let img = toRetroArchThumbnail(item.label);
    // img = img.replace(/\'/, "\\'");
    let outPath = path.resolve(typeDir, img);

    if (ext == ".png") {
      const inStr = fs.createReadStream(filePath);
      const outStr = fs.createWriteStream(outPath);
      inStr.on("end", () => {
        // console.log(`file wite to ${outPath} successfully.`);
        event.reply(AppEvent.ITEM_UPDATE, item.id);
      });
      inStr.pipe(outStr);
    } else if (ext == ".jpg" || ext == ".jpeg") {
      Jimp.read(filePath, (err: any, image: any) => {
        if (!err) {
          image.write(outPath, () => {
            event.reply(AppEvent.ITEM_UPDATE, item.id);
          });
        }
      });
    }
  }
);

ipcMain.on(
  AppEvent.REMOVE_THUMBNAIL,
  (event: any, item: ComputedPlayListItem, filePath: string) => {
    if (fs.existsSync(filePath)) {
      rimraf.sync(filePath);
    }
    event.reply(AppEvent.ITEM_UPDATE, item.id);
  }
);



const removeItemsByCategory = (category: string) => {
  items = lazy(items)
    .reject(item => item.category == category)
    .toArray();

  regenItemsMap();
};

const regenItemsMap = () => {
  itemsMap = {};
  items.map(item => {
    itemsMap[item.id.toString()] = item;
  });
};

app.commandLine.appendSwitch("--disable-http-cache");
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    mainWindow = createMainWindow(config);
    mainWindow.on("closed", () => {
      mainWindow = null;
    });
  }
});

app.on("ready", () => {
  mainWindow = createMainWindow(config);
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});
