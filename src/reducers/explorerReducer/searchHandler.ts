import { AnyAction } from "redux";
import update from "immutability-helper";
import { ExplorerState, createExplorerState } from "../../states/explorerState";

export const searchHandler = (
  state: ExplorerState = createExplorerState(),
  _action: AnyAction
): ExplorerState => {
  return update(state, {
    selectedItemId: { $set: 0 },
  });
};
