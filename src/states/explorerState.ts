import { CategoryAll } from "../libs/CategoryAll";
import { ResultLayout } from "../interfaces/ResultLayout";
import { ThumbnailType } from "../interfaces/ThumbnailType";

export interface ExplorerState {
  categoryName: string;
  subCategoryName: string;
  keyword: string;
  selectedItemId: number;
  layout: ResultLayout;
  gridSize: number;
  thumbnailType: ThumbnailType;
  showPlayerPicker: boolean;
}

export const createExplorerState = (): ExplorerState => {
  return {
    categoryName: CategoryAll,
    subCategoryName: "",
    keyword: "",
    selectedItemId: 0,
    layout: ResultLayout.GRID,
    gridSize: 160,
    thumbnailType: ThumbnailType.SNAP,
    showPlayerPicker: false,
  };
};
