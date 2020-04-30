import { AnyAction } from "redux";
import update from "immutability-helper";
import { ExplorerState, createExplorerState } from "../../states/explorerState";

export const setKeywordHandler = (
  state: ExplorerState | any = createExplorerState(),
  action: AnyAction
): ExplorerState => {
  return update(state, {
    keyword: { $set: action.keyword },
    selectedItemId: { $set: 0 },
  });
};
