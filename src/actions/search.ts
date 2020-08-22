import { ItemFliter } from "../states/gameItemState";
import { FavourState } from '../states/favourState';

export const SEARCH = "SEARCH";

export const search = (itemFilter: ItemFliter, favour: FavourState) => {
  return {
    type: SEARCH,
    itemFilter,
    favour
  };
};
