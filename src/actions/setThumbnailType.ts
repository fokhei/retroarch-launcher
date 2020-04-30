import { ThumbnailType } from "../interfaces/ThumbnailType";

export const SET_THUMBNAIL_TYPE = "SET_THUMBNAIL_TYPE";

export const setThumbnailType = (thumbnailType: ThumbnailType) => {
  return {
    type: SET_THUMBNAIL_TYPE,
    thumbnailType,
  };
};
