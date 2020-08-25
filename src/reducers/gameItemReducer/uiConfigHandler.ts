import { AnyAction } from "redux";
import update from "immutability-helper";
import { GameItemState, createGameItemState } from "../../states/gameItemState";
import { UIConfig } from "../../libs/uiConfig";

export const uiConfigHandler = (
  state: GameItemState = createGameItemState(),
  action: AnyAction
): GameItemState => {
  const config = action.config as UIConfig;

  return update(state, {
    itemFilter: { $set: config.itemFilter },
  });
};
