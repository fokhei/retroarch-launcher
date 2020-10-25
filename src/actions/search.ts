import { ItemFilter, OrderBy } from "../interfaces/itemFilter";
import { GameItemState } from "../states/gameItemState";
import lazy from "lazy.js";
import { CategoryAll } from "../libs/categoryAll";
import { ComputedGameItem } from "../interfaces/ComputedGameItem";

export const SEARCH = "SEARCH";

export const search = (
  itemFilter: ItemFilter,
  gameItem: GameItemState
) => {
  const {
    categoryName,
    subCategoryName,
    keyword,
    favourOnly,
    orderBy,
  } = itemFilter;

  let seq: any = lazy(gameItem.items);

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
    // seq = seq.filter((item) => favour.list.includes(item.key));
  }

  if (orderBy == OrderBy.RANDOM) {
    seq = seq.shuffle();
  } else {
    seq = seq.sortBy((item) => item.gameName);
  }

  const searchResults: Array<ComputedGameItem> = seq.toArray();

  return {
    type: SEARCH,
    itemFilter,
    searchResults,
  };
};
