import { AnyAction } from "redux";
import update from "immutability-helper";
import { getMissingThumbnailInfos } from "../../libs/getMissingThumbnailInfos";
import { GameItemState, createGameItemState } from "../../states/gameItemState";

export const scanMissingThumbnailHandler = (
  state: GameItemState | any = createGameItemState(),
  action: AnyAction
): GameItemState => {
  const infos = getMissingThumbnailInfos(action.item, action.appCOnfig);
  const pendingToDownload = state.pendingToDownload.concat(infos);
  return update(state, {
    pendingToDownload: { $set: pendingToDownload },
  });
};
