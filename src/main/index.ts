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
import request from "request";
import { ThumbnailInfo } from "../libs/ThumbnailInfos";
import { getFiles } from "../libs/getFiles";
import { createPlaylistItems } from "../libs/createPlaylistItems";
import {
  exportPlaylistFile,
  ExportPlaylistResult
} from "../libs/exportPlaylistFile";
import AppConfig from "../libs/AppConfig";
import { createDatIndexes } from "../libs/createDatIndexes";
import { exportMamePlaylistFiles } from "../libs/exportMamePlaylistFiles";

let _id = 0;
let mainWindow: BrowserWindow | null;
let config: AppConfig;
let critialError: string | null = null;
let lpls: Array<string> = [];
let items: Array<ComputedPlayListItem> = [];
let itemsMap: ComputedPlayListMap = {};
let missingThumbnailInfos: Array<ThumbnailInfo> = [];
let downloadEvent: any;
let createPaylistEvent: any;

const configPath = "./config.js";
if (fs.existsSync(configPath)) {
  try {
    const text: string = fs.readFileSync(configPath).toString();
    eval("config="+ text) as AppConfig;
  } catch (e) {
    critialError = "parse error on config.js";
  }
} else {
  critialError = "config.js not found!";
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
  const files = fs.readdirSync(config.retroArch.playlists);
  files.map((file: string) => {
    const ext = path.extname(file);
    if (ext == ".lpl") {
      lpls.push(file);
      const text: any = fs.readFileSync(
        path.resolve(config.retroArch.playlists, file)
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
  event.reply(AppEvent.PLAYLISTS, lpls, items, itemsMap);
});

ipcMain.on(AppEvent.REFRESH_PLAYLIST, (event: any, category: string) => {
  removeItemsByCategory(category);
  const file = category + ".lpl";
  const text: any = fs.readFileSync(
    path.resolve(config.retroArch.playlists, file)
  );
  const playlist = JSON.parse(text) as RetroArchPlayList;
  playlist.items.map(item => {
    const computedItem = createComputedPlayListItem(item, category);
    items.push(computedItem);
    itemsMap[computedItem.id.toString()] = computedItem;
  });
  event.reply(AppEvent.PLAYLISTS, lpls, items, itemsMap);
});

ipcMain.on(AppEvent.REMOVE_PLAYLIST, (event: any, category: string) => {
  removeItemsByCategory(category);
  lpls = lazy(lpls)
    .reject(lpl => lpl == category + ".lpl")
    .toArray();
  event.reply(AppEvent.PLAYLISTS, lpls, items, itemsMap);
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
    prepareThumbnailDir(item);
    const ext = path.extname(filePath).toLowerCase();
    const thumbnailDir = config.retroArch.thumbnails.replace(/\\/gi, "/");
    const dbDir = path.resolve(thumbnailDir, item.db_name);
    const typeDir = path.resolve(dbDir, thumbnailType);
    let img = toRetroArchThumbnail(item.label);
    let outPath = path.resolve(typeDir, img);
    if (ext == ".png") {
      const inStr = fs.createReadStream(filePath);
      const outStr = fs.createWriteStream(outPath);
      inStr.on("end", () => {
        // console.log(`file wite to ${outPath} successfully.`);
        event.reply(AppEvent.ITEM_UPDATE, item.id);
      });
      inStr.pipe(outStr);
    } else if (ext == ".jpg" || ext == ".jpeg" || ext == ".bmp") {
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
    downloadEvent = event.reply(AppEvent.ITEM_UPDATE, item.id);
  }
);

ipcMain.on(
  AppEvent.DOWNLOAD_THUMBNAIL,
  (event: any, item: ComputedPlayListItem, thumbnailType: ThumbnailType) => {
    prepareThumbnailDir(item);
    const info = getThumbnailInfo(item, thumbnailType);

    if (!info.exist) {
      missingThumbnailInfos = [...missingThumbnailInfos, info];
      downloadEvent = event;
      downloadEvent.reply(
        AppEvent.MISSING_THUMBNAIL_INFOS,
        missingThumbnailInfos
      );
      downloadNext();
    }
  }
);

ipcMain.on(
  AppEvent.DOWNLOAD_THUMBNAILS,
  (event: any, item: ComputedPlayListItem) => {
    prepareThumbnailDir(item);
    const infos = getMissingThumbnailInfos(item);
    missingThumbnailInfos = [].concat(missingThumbnailInfos, infos);
    downloadEvent = event;
    downloadEvent.reply(
      AppEvent.MISSING_THUMBNAIL_INFOS,
      missingThumbnailInfos
    );
    downloadNext();
  }
);

ipcMain.on(
  AppEvent.DOWNLOAD_PLAYLIST_THUMBNAILS,
  (event: any, category: String) => {
    const targetItems = lazy(items)
      .filter(item => item.category == category)
      .toArray();
    if (targetItems.length) {
      const firstItem = targetItems[0];
      prepareThumbnailDir(firstItem);

      targetItems.map(item => {
        const infos = getMissingThumbnailInfos(item);
        missingThumbnailInfos = [].concat(missingThumbnailInfos, infos);
      });

      if (missingThumbnailInfos.length) {
        downloadEvent = event;
        downloadEvent.reply(
          AppEvent.MISSING_THUMBNAIL_INFOS,
          missingThumbnailInfos
        );
        downloadNext();
      }
    }
  }
);

ipcMain.on(AppEvent.CREATE_PLAYLIST, (event: any, category: string) => {
  if (category == "MAME") {
    const indexes = createDatIndexes(config, category);
    const callback = (results: Array<ExportPlaylistResult>) => {
      handleExportResults(event, category, results);
    };
    exportMamePlaylistFiles({
      config,
      category,
      indexes,
      callback
    });
  } else {
    const platform = config.platforms[category];
    getFiles(platform.romsPath)
      .then((files: Array<string>) => {
        const indexes = createDatIndexes(config, category);
        const items = createPlaylistItems(config, category, files, indexes);
        let result = exportPlaylistFile(config, category, items);
        handleExportResults(event, category, [result]);
      })
      .catch((err: any) => {
        console.error(err);
        createPaylistEvent.reply(AppEvent.CREATE_PLAYLIST_ERROR, err);
      });
  }
});

const handleExportResults = (
  event: any,
  category: string,
  results: Array<ExportPlaylistResult>
) => {
  results.map(result => {
    const { lpl } = result;
    if (!lpls.includes(lpl)) {
      lpls.push(lpl);
    }
  });
  event.reply(AppEvent.CREATE_PLAYLIST_SUCCESS, category, results);
};

const getThumbnailInfo = (
  item: ComputedPlayListItem,
  thumbnailType: ThumbnailType
): ThumbnailInfo => {
  const thumbnailDir = config.retroArch.thumbnails.replace(/\\/gi, "/");
  const dbDir = path.resolve(thumbnailDir, item.db_name);
  const typeDir = path.resolve(dbDir, thumbnailType);
  const category = encodeURIComponent(item.category);
  let img = toRetroArchThumbnail(item.label);
  let local = path.resolve(typeDir, img);
  let remote = `http://thumbnails.libretro.com/${category}/${thumbnailType}/${img}`;
  let exist = fs.existsSync(local);
  return {
    local,
    remote,
    exist
  };
};

const getMissingThumbnailInfos = (
  item: ComputedPlayListItem
): Array<ThumbnailInfo> => {
  let infos: Array<ThumbnailInfo> = [];
  let box = getThumbnailInfo(item, ThumbnailType.BOX);
  let title = getThumbnailInfo(item, ThumbnailType.TITLE);
  let snap = getThumbnailInfo(item, ThumbnailType.SNAP);
  if (!box.exist) {
    infos.push(box);
  }
  if (!title.exist) {
    infos.push(title);
  }
  if (!snap.exist) {
    infos.push(snap);
  }

  return infos;
};

const prepareThumbnailDir = (item: ComputedPlayListItem) => {
  const thumbnailDir = config.retroArch.thumbnails.replace(/\\/gi, "/");
  const dbDir = path.resolve(thumbnailDir, item.db_name);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir);
  }
  const boxDir = path.resolve(dbDir, ThumbnailType.BOX);
  if (!fs.existsSync(boxDir)) {
    fs.mkdirSync(boxDir);
  }
  const titleDir = path.resolve(dbDir, ThumbnailType.TITLE);
  if (!fs.existsSync(titleDir)) {
    fs.mkdirSync(titleDir);
  }
  const snapDir = path.resolve(dbDir, ThumbnailType.SNAP);
  if (!fs.existsSync(snapDir)) {
    fs.mkdirSync(snapDir);
  }
};

const downloadNext = () => {
  if (missingThumbnailInfos.length) {
    const info = missingThumbnailInfos.shift();
    download(info.remote, info.local, () => {
      downloadEvent.reply(
        AppEvent.MISSING_THUMBNAIL_INFOS,
        missingThumbnailInfos
      );
      downloadNext();
    });
  }
};

const download = (
  uri: string,
  filename: string,
  callback: (err: any) => void
) => {
  request.head(uri, (_err: any, res: any, _body: any) => {
    if (!res || !res.headers || !res.headers["content-length"]) {
      callback(new Error("zero content length"));
    } else {
      request(uri)
        .pipe(fs.createWriteStream(filename))
        .on("close", callback);
    }
  });
};

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
