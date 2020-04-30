import { ThumbnailInfo } from "../interfaces/ThumbnailInfo";
import { download } from "../libs/download";

export const DOWNLOAD_THUMBNAIL_START = "DOWNLOAD_THUMBNAIL_START";
export const DOWNLOAD_THUMBNAIL_SUCCESS = "DOWNLOAD_THUMBNAIL_SUCCESS";
export const DOWNLOAD_THUMBNAIL_ERROR = "DOWNLOAD_THUMBNAIL_ERROR";

export const downloadThumbnail = (info: ThumbnailInfo) => {
  return (dispatch) => {
    dispatch(downloadThumbnailStart(info));

    return download(info.remote, info.local, (err: any) => {
      if (err) {
        dispatch(downloadThumbnailError(err));
      } else {
        dispatch(downloadThumbnailSuccess(info));
      }
    });
  };
};

export const downloadThumbnailStart = (info: ThumbnailInfo) => {
  return {
    type: DOWNLOAD_THUMBNAIL_START,
    info,
  };
};

export const downloadThumbnailSuccess = (info: ThumbnailInfo) => {
  return {
    type: DOWNLOAD_THUMBNAIL_SUCCESS,
    info,
  };
};

export const downloadThumbnailError = (error: any) => {
  return {
    type: DOWNLOAD_THUMBNAIL_ERROR,
    error,
  };
};
