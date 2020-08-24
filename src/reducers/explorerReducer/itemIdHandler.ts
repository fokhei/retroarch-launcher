import { AnyAction } from "redux";
import update from "immutability-helper";
import { ExplorerState, createExplorerState } from "../../states/explorerState";

export const setItemIdHandler = (
  state: ExplorerState = createExplorerState(),
  action: AnyAction
): ExplorerState => {
  return update(state, {
    selectedItemId: { $set: action.selectedItemId },
  });
};
