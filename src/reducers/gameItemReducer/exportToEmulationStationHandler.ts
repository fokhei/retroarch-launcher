import { AnyAction } from "redux";
import { GameItemState, createGameItemState } from "../../states/gameItemState";
import update from "immutability-helper";

export const exportToEmulationStationStartHandler = (
  state: GameItemState = createGameItemState(),
  _action: AnyAction
): GameItemState => {
  return update(state, {
    exportToES: {
      success: { $set: false },
      error: { $set: null },
    },
  });
};

export const exportToEmulationStationSuccessHandler = (
  state: GameItemState = createGameItemState(),
  _action: AnyAction
): GameItemState => {
  return update(state, {
    exportToES: {
      success: { $set: true },
    },
  });
};

export const exportToEmulationStationErrorHandler = (
  state: GameItemState = createGameItemState(),
  action: AnyAction
): GameItemState => {
  return update(state, {
    exportToES: {
      error: { $set: action.error },
    },
  });
};

export const exportToEmulationStationResetHandler = (
  state: GameItemState = createGameItemState(),
  _action: AnyAction
): GameItemState => {
  return update(state, {
    exportToES: {
      success: { $set: false },
      error: { $set: null },
    },
  });
};
