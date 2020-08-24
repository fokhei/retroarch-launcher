import { AnyAction } from "redux";
import update from "immutability-helper";
import { ExplorerState, createExplorerState } from "../../states/explorerState";

export const setPlayerPickerHandler = (
  state: ExplorerState = createExplorerState(),
  action: AnyAction
): ExplorerState => {
  
  return update(state, {
    showPlayerPicker: { $set: action.visible },
  });
};
