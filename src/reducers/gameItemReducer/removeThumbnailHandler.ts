import { AnyAction } from "redux";
import update from "immutability-helper";
import { GameItemState, createGameItemState } from "../../states/gameItemState";
import { shell } from "electron";
import { ComputedGameItem } from "../../interfaces/ComputedGameItem";

export const removeThumbnailHandler = (
  state: GameItemState = createGameItemState(),
  action: AnyAction
): GameItemState => {
  const item = action.item as ComputedGameItem;
  const thumbnailType = action.thumbnailType;
  const thumbnail = item.thumbnails[thumbnailType];
  shell.moveItemToTrash(thumbnail);

  return update(state, {
    itemsMap: {
      [item.id]: {
        updateAt: { $set: new Date().getTime() },
      },
    },
  });
};
