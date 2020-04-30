import { AnyAction } from "redux";
import update from "immutability-helper";
import { GameItemState, createGameItemState } from "../../states/gameItemState";
import lazy from "lazy.js";
import { GameItem } from "../../interfaces/GameItem";
import { ComputedGameItem } from "../../interfaces/ComputedGameItem";
import { createComputedGameItem } from "../../libs/createComputedItem";
import { getCategory } from "../../libs/getCategory";

export const scanRomsSuccessHandler = (
  state: GameItemState | any = createGameItemState(),
  action: AnyAction
): GameItemState => {
  const { categoryName, appConfig } = action;
  const items = action.items as Array<GameItem>;
  const category = getCategory(appConfig, categoryName);
  let { _id } = state;
  //   console.log("scanRomsSuccessHandler", categoryName, items);

  let nextItems = lazy(state.items)
    .reject((item: ComputedGameItem) => item.categoryName == categoryName)
    .toArray();

  items.map((item) => {
    nextItems.push(createComputedGameItem(item, ++_id, category, appConfig));
  });

  let nextItemsMap = {};
  nextItems.map((item: ComputedGameItem) => {
    nextItemsMap[item.id.toString()] = item;
  });

  return update(state, {
    _id: { $set: _id },
    items: { $set: nextItems },
    itemsMap: { $set: nextItemsMap },
  });
};
