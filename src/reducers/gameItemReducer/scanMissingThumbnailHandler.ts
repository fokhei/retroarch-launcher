import { AnyAction } from "redux";
import update from "immutability-helper";
import { getMissingThumbnailInfos } from "../../libs/getMissingThumbnailInfos";
import { GameItemState, createGameItemState } from "../../states/gameItemState";

export const scanMissingThumbnailHandler = (
  state: GameItemState = createGameItemState(),
  action: AnyAction
): GameItemState => {
  const { items, appConfig } = action;
  let pendingToDownload = [...state.pendingToDownload];
  items.map((item) => {
    const infos = getMissingThumbnailInfos(item, appConfig);
    pendingToDownload = pendingToDownload.concat(infos);
  });

  return update(state, {
    pendingToDownload: { $set: pendingToDownload },
  });
};
