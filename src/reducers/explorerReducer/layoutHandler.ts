import { AnyAction } from "redux";
import update from "immutability-helper";
import { ExplorerState, createExplorerState } from "../../states/explorerState";

export const setLayoutHandler = (
  state: ExplorerState | any = createExplorerState(),
  action: AnyAction
): ExplorerState => {
  return update(state, {
    layout: { $set: action.layout },
  });
};
