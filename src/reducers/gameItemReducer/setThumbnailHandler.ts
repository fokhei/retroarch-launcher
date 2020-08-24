import { AnyAction } from "redux";
import update from "immutability-helper";
import { GameItemState, createGameItemState } from "../../states/gameItemState";
import { ComputedGameItem } from "../../interfaces/ComputedGameItem";

export const setThumbnailStartHandler = (
  state: GameItemState = createGameItemState(),
  action: AnyAction
): GameItemState => {
  // console.log("setThumbnailStartHandler", action);
  return update(state, {
    setThumbnail: {
      success: { $set: false },
      error: { $set: null },
    },
  });
};

export const setThumbnailSuccessHandler = (
  state: GameItemState = createGameItemState(),
  action: AnyAction
): GameItemState => {
  // console.log("setThumbnailSuccessHandler", action);
  const item = action.item as ComputedGameItem;
  return update(state, {
    setThumbnail: {
      success: { $set: true },
    },
    itemsMap: {
      [item.id.toString()]: {
        updateAt: { $set: new Date().getTime() },
      },
    },
  });
};

export const setThumbnailErrorHandler = (
  state: GameItemState = createGameItemState(),
  action: AnyAction
): GameItemState => {
  // console.log("setThumbnailErrorHandler", action);
  return update(state, {
    setThumbnail: {
      error: { $set: action.error },
    },
  });
};
