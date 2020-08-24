import { AnyAction } from "redux";
import update from "immutability-helper";
import { GameItemState, createGameItemState } from "../../states/gameItemState";
import { ComputedGameItem } from "../../interfaces/ComputedGameItem";
import lazy from "lazy.js";
import { CategoryAll } from "../../libs/categoryAll";
import { ItemFilter, OrderBy } from "../../interfaces/itemFilter";
import { FavourState } from "../../states/favourState";

export const searchHandler = (
  state: GameItemState = createGameItemState(),
  action: AnyAction
): GameItemState => {
  const itemFilter = action.itemFilter as ItemFilter;
  const favour = action.favour as FavourState;

  const { categoryName, subCategoryName, keyword, favourOnly, orderBy } = itemFilter;

  const { items } = state;

  let seq: any = lazy(items);

  if (categoryName != CategoryAll) {
    seq = seq.filter((item) => item.categoryName == categoryName);
    if (subCategoryName) {
      seq = seq.filter((item) => item.subCategoryName == subCategoryName);
    }
  }
  if (keyword && keyword.trim() != "") {
    seq = seq.filter((item) =>
      item.gameName.toLowerCase().includes(keyword.toLowerCase().trim())
    );
  }

  if (favourOnly) {
    seq = seq.filter((item) => favour.list.includes(item.key));
  }

  if (orderBy == OrderBy.RANDOM) {
    seq = seq.shuffle();
  } else {
    seq.sortBy((item) => item.gameName);
  }

 

  const searchResults: Array<ComputedGameItem> = seq.toArray();

  return update(state, {
    searchResults: { $set: searchResults },
    itemFilter: { $set: itemFilter },
  });
};
