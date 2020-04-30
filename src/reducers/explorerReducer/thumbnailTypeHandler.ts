import { AnyAction } from "redux";
import update from "immutability-helper";
import { ExplorerState, createExplorerState } from "../../states/explorerState";

export const setThumbnailTypeHandler = (
  state: ExplorerState | any = createExplorerState(),
  action: AnyAction
): ExplorerState => {
  return update(state, {
    thumbnailType: { $set: action.thumbnailType },
  });
};
