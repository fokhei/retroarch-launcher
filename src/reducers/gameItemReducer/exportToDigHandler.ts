import { AnyAction } from "redux";
import { GameItemState, createGameItemState } from "../../states/gameItemState";
import update from "immutability-helper";

export const exportToDigStartHandler = (
  state: GameItemState = createGameItemState(),
  _action: AnyAction
): GameItemState => {
  return update(state, {
    exportToDig: {
      success: { $set: false },
      error: { $set: null },
    },
  });
};

export const exportToDigSuccessHandler = (
  state: GameItemState = createGameItemState(),
  _action: AnyAction
): GameItemState => {
  
  return update(state, {
    exportToDig: {
      success: { $set: true },
    },
  });
};

export const exportToDigErrorHandler = (
  state: GameItemState = createGameItemState(),
  action: AnyAction
): GameItemState => {
  return update(state, {
    exportToDig: {
      error: { $set: action.error },
    },
  });
};

export const exportToDigResetHandler = (
  state: GameItemState = createGameItemState(),
  _action: AnyAction
): GameItemState => {
  return update(state, {
    exportToDig: {
      success: { $set: false },
      error: { $set: null },
    },
  });
};
