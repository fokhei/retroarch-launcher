import { AnyAction } from "redux";
import update from "immutability-helper";
import { ExplorerState, createExplorerState } from "../../states/explorerState";

export const setCategoryNameHandler = (
  state: ExplorerState | any = createExplorerState(),
  action: AnyAction
): ExplorerState => {


  let subCategoryName = action.subCategoryName || "";
  return update(state, {
    categoryName: { $set: action.categoryName },
    subCategoryName: { $set: subCategoryName},
    selectedItemId: { $set: 0 }
  });
};
