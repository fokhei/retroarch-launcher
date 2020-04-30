import { ComputedGameItem } from "../interfaces/ComputedGameItem";
import { ThumbnailInfo } from "../interfaces/ThumbnailInfo";


export interface SubCategories {
  [categoryName: string]: Array<string>
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
}

export const createGameItemState = (): GameItemState => {
  return {
    _id: 0,
    items: [],
    itemsMap: {},
    searchResults: [],
    pendingToDownload: [],
    subCategories: {},
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
  };
};
