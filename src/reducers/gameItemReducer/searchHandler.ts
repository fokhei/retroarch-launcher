import { AnyAction } from "redux";
import update from "immutability-helper";
import { GameItemState, createGameItemState } from "../../states/gameItemState";
import { ComputedGameItem } from "../../interfaces/ComputedGameItem";
import { ItemFilter } from "../../interfaces/itemFilter";
import { ipcRenderer } from "electron";
import { AppEvent } from "../../interfaces/AppEvent";

export const searchHandler = (
  state: GameItemState = createGameItemState(),
  action: AnyAction
): GameItemState => {
  const itemFilter = action.itemFilter as ItemFilter;
  const searchResults = action.searchResults as Array<ComputedGameItem>;

  ipcRenderer.sendSync(AppEvent.SET_ITEM_FILTER, itemFilter);
  return update(state, {
    itemFilter: { $set: itemFilter },
    searchResults: { $set: searchResults },
  });
};
