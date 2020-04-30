import { GameItem } from "../interfaces/GameItem";
import { ComputedGameItem } from "../interfaces/ComputedGameItem";
import { Category } from "../interfaces/Category";
import { ThumbnailType } from "../interfaces/ThumbnailType";
import { toRetroArchThumbnail } from "./toRetroArchThumbnail";
import { AppConfigState } from "../states/appConfigState";
import * as path from "path";

export const createComputedGameItem = (
  item: GameItem,
  id: number,
  category: Category,
  appConfig: AppConfigState
): ComputedGameItem => {
  const { thumbnailPath } = appConfig;
  const { thumbnailDir } = category;
  const img = toRetroArchThumbnail(item.gameName);

  const box = path.resolve(thumbnailPath, thumbnailDir, ThumbnailType.BOX, img);
  const title = path.resolve(
    thumbnailPath,
    thumbnailDir,
    ThumbnailType.TITLE,
    img
  );
  const snap = path.resolve(
    thumbnailPath,
    thumbnailDir,
    ThumbnailType.SNAP,
    img
  );

  return {
    ...item,
    id,
    categoryName: category.name,
    thumbnailDir: category.thumbnailDir,
    thumbnails: {
      [ThumbnailType.BOX]: box,
      [ThumbnailType.TITLE]: title,
      [ThumbnailType.SNAP]: snap,
    },
    updateAt: new Date().getTime(),
  };
};
