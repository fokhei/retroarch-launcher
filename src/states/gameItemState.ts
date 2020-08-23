import { ComputedGameItem } from "../interfaces/ComputedGameItem";
import { ThumbnailInfo } from "../interfaces/ThumbnailInfo";
import { CategoryAll } from "../libs/categoryAll";
import { ItemFilter } from "../interfaces/itemFilter";

export interface SubCategories {
  [categoryName: string]: Array<string>;
}

export interface GameItemState {
  _id: number;
  items: Array<ComputedGameItem>;
  itemsMap: {
    [id: string]: ComputedGameItem;
  };
  searchResults: Array<ComputedGameItem>;
  pendingToDownload: Array<ThumbnailInfo>;
  subCategories: SubCategories;
  itemFilter: ItemFilter;
  fetch: {
    success: boolean;
    error: any;
  };
  download: {
    info: ThumbnailInfo;
    success: boolean;
    error: any;
  };
  setThumbnail: {
    success: boolean;
    error: any;
  };
  exportToES: {
    success: boolean;
    error: any;
  };
}

export const createGameItemState = (): GameItemState => {
  return {
    _id: 0,
    items: [],
    itemsMap: {},
    searchResults: [],
    pendingToDownload: [],
    subCategories: {},
    itemFilter: {
      categoryName: CategoryAll,
      subCategoryName: "",
      keyword: "",
      favourOnly: false,
    },
    fetch: {
      success: false,
      error: null,
    },
    download: {
      info: null,
      success: false,
      error: null,
    },
    setThumbnail: {
      success: false,
      error: null,
    },
    exportToES: {
      success: false,
      error: null,
    },
  };
};
