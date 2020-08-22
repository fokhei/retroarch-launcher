import { AnyAction } from "redux";
import { FavourState, createFavourState } from "../../states/favourState";
import update from "immutability-helper";
import { ipcRenderer } from 'electron';
import { AppEvent } from '../../interfaces/AppEvent';

export const toggleHandler = (
  state: FavourState | any = createFavourState(),
  action: AnyAction
): FavourState => {
  const { romPath } = action;

  let list = [...state.list];
  if (list.includes(romPath)) {
    list = list.filter((item) => item != romPath);
  } else {
    list.push(romPath);
    list.sort();
  }
  
  const next =  update(state, {
    list: { $set: list },
    updateAt: { $set: new Date().getTime() } 
  });
  ipcRenderer.sendSync(AppEvent.SET_FAVOUR_STATE, next);
  return next;
};
