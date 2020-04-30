import fs from "fs";
import * as path from "path";
import { AppConfigState } from "../states/appConfigState";
import { ComputedGameItem } from "../interfaces/ComputedGameItem";
import { ThumbnailType } from "../interfaces/ThumbnailType";
import { prepareThumbnailDir } from "../libs/prepareThumbnailDir";
import webp from "webp-converter";
import { ipcRenderer } from "electron";
import { AppEvent } from "../interfaces/AppEvent";

export const SET_THUMBNAIL_START = "SET_THUMBNAIL_START";
export const SET_THUMBNAIL_SUCCESS = "SET_THUMBNAIL_SUCCESS";
export const SET_THUMBNAIL_ERROR = "SET_THUMBNAIL_ERROR";

export const setThumbnail = (
  filePath: string,
  item: ComputedGameItem,
  thumbnailType: ThumbnailType,
  appConfig: AppConfigState
) => {
  return (dispatch) => {
    dispatch(setThumbnailStart());

    prepareThumbnailDir(appConfig, item);
    const ext = path.extname(filePath).toLowerCase();
    let outPath = item.thumbnails[thumbnailType];

    if (ext == ".png") {
      const inStr = fs.createReadStream(filePath);
      const outStr = fs.createWriteStream(outPath);
      inStr.on("end", () => {
        // console.log(`file wite to ${outPath} successfully.`);
        dispatch(setThumbnailSuccess(item));
      });
      inStr.on("error", (err) => {
        dispatch(setThumbnailError(err));
      });

      return inStr.pipe(outStr);
    } else if (ext == ".jpg" || ext == ".jpeg" || ext == ".bmp") {
      ipcRenderer.removeAllListeners(AppEvent.WRITE_JIMP_IMAGE_SUCCESS);
      ipcRenderer.removeAllListeners(AppEvent.WRITE_JIMP_IMAGE_ERROR);

      ipcRenderer.once(AppEvent.WRITE_JIMP_IMAGE_SUCCESS, () => {
        dispatch(setThumbnailSuccess(item));
      });
      ipcRenderer.once(
        AppEvent.WRITE_JIMP_IMAGE_ERROR,
        (_evt: any, err: any) => {
          dispatch(setThumbnailError(err));
        }
      );
      return ipcRenderer.send(AppEvent.WRITE_JIMP_IMAGE, filePath, outPath);

    } else if (ext == ".webp") {
      const temp = "tmp.png";
      return webp.dwebp(filePath, temp, "-o", (status: string, err: any) => {
        //if conversion successful status will be '100'
        //if conversion fails status will be '101'
        if (err) {
          dispatch(setThumbnailError(err));
        } else {
          if (status == "100") {
            fs.renameSync(temp, outPath);
            dispatch(setThumbnailSuccess(item));
          } else {
            dispatch(setThumbnailError("webp status:" + status));
          }
        }
      });
    }
  };
};

export const setThumbnailStart = () => {
  return {
    type: SET_THUMBNAIL_START,
  };
};

export const setThumbnailSuccess = (item: ComputedGameItem) => {
  return {
    type: SET_THUMBNAIL_SUCCESS,
    item
  };
};

export const setThumbnailError = (error: any) => {
  return {
    type: SET_THUMBNAIL_ERROR,
    error,
  };
};
