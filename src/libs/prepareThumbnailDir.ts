import fs from "fs";
import * as path from "path";
import { ThumbnailType } from "../interfaces/ThumbnailType";
import { ComputedGameItem } from "../interfaces/ComputedGameItem";
import { AppConfigState } from "../states/appConfigState";

export const prepareThumbnailDir = (
  appConfig: AppConfigState,
  item: ComputedGameItem
) => {
  const basePath = appConfig.thumbnailPath.replace(/\\/gi, "/");

  const thumbnailPath = path.resolve(basePath, item.thumbnailDir);
  if (!fs.existsSync(thumbnailPath)) {
    fs.mkdirSync(thumbnailPath);
  }
  const boxPath = path.resolve(thumbnailPath, ThumbnailType.BOX);
  if (!fs.existsSync(boxPath)) {
    fs.mkdirSync(boxPath);
  }
  const titlePath = path.resolve(thumbnailPath, ThumbnailType.TITLE);
  if (!fs.existsSync(titlePath)) {
    fs.mkdirSync(titlePath);
  }
  const snapPath = path.resolve(thumbnailPath, ThumbnailType.SNAP);
  if (!fs.existsSync(snapPath)) {
    fs.mkdirSync(snapPath);
  }
};
