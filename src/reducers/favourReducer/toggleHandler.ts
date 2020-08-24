import { AnyAction } from "redux";
import { FavourState, createFavourState } from "../../states/favourState";
import update from "immutability-helper";
import { ipcRenderer } from "electron";
import { AppEvent } from "../../interfaces/AppEvent";
import { ComputedGameItem } from "../../interfaces/ComputedGameItem";

export const toggleHandler = (
  state: FavourState = createFavourState(),
  action: AnyAction
): FavourState => {
  const gameItem = action.item as ComputedGameItem;
  const { key } = gameItem;

  let list = [...state.list];

  if (list.includes(key)) {
    list = list.filter((item) => item != key);
  } else {
    list.push(key);
    list.sort();
  }

  const next = update(state, {
    list: { $set: list },
    updateAt: { $set: new Date().getTime() },
  });
  ipcRenderer.sendSync(AppEvent.SET_FAVOUR_STATE, next);
  return next;
};
