import { AppConfigState } from "../states/appConfigState";
import { ComputedGameItem } from "../interfaces/ComputedGameItem";
import { ThumbnailInfo } from "../interfaces/ThumbnailInfo";
import { ThumbnailType } from "../interfaces/ThumbnailType";
import { getThumbnailInfo } from "./getThumbnailInfo";

export const getMissingThumbnailInfos = (
  item: ComputedGameItem,
  appConfig: AppConfigState
): Array<ThumbnailInfo> => {
  let infos: Array<ThumbnailInfo> = [];
  let box = getThumbnailInfo(item, ThumbnailType.BOX, appConfig);
  let title = getThumbnailInfo(item, ThumbnailType.TITLE, appConfig);
  let snap = getThumbnailInfo(item, ThumbnailType.SNAP, appConfig);
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
