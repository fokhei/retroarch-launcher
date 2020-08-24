import { AnyAction } from "redux";
import update from "immutability-helper";
import { ExplorerState, createExplorerState } from "../../states/explorerState";

export const setGridSizeHandler = (
  state: ExplorerState = createExplorerState(),
  action: AnyAction
): ExplorerState => {
  return update(state, {
    gridSize: { $set: action.gridSize },
  });
};
