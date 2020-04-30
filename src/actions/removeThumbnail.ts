import { ComputedGameItem } from "../interfaces/ComputedGameItem";
import { ThumbnailType } from '../interfaces/ThumbnailType';

export const REMOVE_THUMBNAIL = "REMOVE_THUMBNAIL";

export const removeThumbnail = (item: ComputedGameItem, thumbnailType: ThumbnailType) => {
  return {
    type: REMOVE_THUMBNAIL,
    item,
    thumbnailType
  };
};
