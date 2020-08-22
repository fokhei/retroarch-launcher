import { CategoryAll } from "../libs/CategoryAll";
import { ResultLayout } from "../interfaces/ResultLayout";

export interface ExplorerState {
  categoryName: string;
  subCategoryName: string;
  keyword: string;
  selectedItemId: number;
  layout: ResultLayout;
  gridSize: number;
  showPlayerPicker: boolean;
}

export const createExplorerState = (): ExplorerState => {
  return {
    categoryName: CategoryAll,
    subCategoryName: "",
    keyword: "",
    selectedItemId: 0,
    layout: ResultLayout.SNAPSHOT,
    gridSize: 160,
    showPlayerPicker: false,
  };
};
