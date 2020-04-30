import fs from "fs";
import * as path from "path";
import { ComputedGameItem } from "../interfaces/ComputedGameItem";
import { ThumbnailType } from "../interfaces/ThumbnailType";
import { ThumbnailInfo } from "../interfaces/ThumbnailInfo";
import { AppConfigState } from "../states/appConfigState";
import { toRetroArchThumbnail } from "./toRetroArchThumbnail";

export const getThumbnailInfo = (
  item: ComputedGameItem,
  thumbnailType: ThumbnailType,
  appConfig: AppConfigState
): ThumbnailInfo => {
  const basePath = appConfig.thumbnailPath.replace(/\\/gi, "/");
  const thumbnailPath = path.resolve(basePath, item.thumbnailDir);
  const typePath = path.resolve(thumbnailPath, thumbnailType);
  const category = encodeURIComponent(item.thumbnailDir);
  const img = toRetroArchThumbnail(item.gameName);
  const local = path.resolve(typePath, img);
  const remote = `http://thumbnails.libretro.com/${category}/${thumbnailType}/${img}`;
  const exist = fs.existsSync(local);
  return {
    itemId: item.id,
    local,
    remote,
    exist,
  };
};
