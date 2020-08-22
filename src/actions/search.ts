import { FavourState } from "../states/favourState";
import { ItemFilter } from "../interfaces/itemFilter";

export const SEARCH = "SEARCH";

export const search = (itemFilter: ItemFilter, favour: FavourState) => {
  return {
    type: SEARCH,
    itemFilter,
    favour,
  };
};
