import { AnyAction } from "redux";
import { createGameItemState, GameItemState } from "../../states/gameItemState";
import update from "immutability-helper";
import { ThumbnailInfo } from "../../interfaces/ThumbnailInfo";

export const downloadThumbnailStartHandler = (
  state: GameItemState = createGameItemState(),
  action: AnyAction
): GameItemState => {
  // console.log("downloadThumbnailStartHandler", action.info);
  return update(state, {
    download: {
      info: { $set: action.info },
      success: { $set: false },
      error: { $set: null },
    },
  });
};

export const downloadThumbnailSuccessHandler = (
  state: GameItemState = createGameItemState(),
  action: AnyAction
): GameItemState => {
  const info = action.info as ThumbnailInfo;
  // console.log("downloadThumbnailSuccessHandler", info);
  const pendingToDownload = state.pendingToDownload.slice(1);
  return update(state, {
    download: {
      success: { $set: true },
    },
    pendingToDownload: { $set: pendingToDownload },
    itemsMap: {
      [info.itemId.toString()]: {
        updateAt: {
          $set: new Date().getTime()
        }
      }
    }
  });
};

export const downloadThumbnailErrorHandler = (
  state: GameItemState = createGameItemState(),
  action: AnyAction
): GameItemState => {
  // console.log("downloadThumbnailErrorHandler");
  const pendingToDownload = state.pendingToDownload.slice(1);
  return update(state, {
    download: {
      error: { $set: action.error },
    },
    pendingToDownload: { $set: pendingToDownload },
  });
};
