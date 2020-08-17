import { AnyAction } from "redux";
import update from "immutability-helper";
import { GameItemState, createGameItemState } from "../../states/gameItemState";
import { ComputedGameItem } from "../../interfaces/ComputedGameItem";
import lazy from "lazy.js";
import { CategoryAll } from "../../libs/CategoryAll";

export const searchHandler = (
  state: GameItemState | any = createGameItemState(),
  action: AnyAction
): GameItemState => {
  const { categoryName, subCategoryName, keyword } = action;
  const { items } = state;

  let seq: any = lazy(items);

  if (categoryName != CategoryAll) {
    seq = seq.filter((item) => item.categoryName == categoryName);
    if( subCategoryName ) {
      seq = seq.filter((item) => item.subCategoryName == subCategoryName);
    }
  }
  if (keyword.trim() != "") {
    seq = seq.filter((item) => item.gameName.toLowerCase().includes(keyword.toLowerCase().trim()));
  }
  seq.sortBy((item) => item.gameName);

  const searchResults: Array<ComputedGameItem> = seq.toArray();

  return update(state, {
    searchResults: { $set: searchResults },
  });
};
