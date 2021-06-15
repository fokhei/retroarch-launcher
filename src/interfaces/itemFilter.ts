import { CategoryAll } from "../libs/constants";


export enum OrderBy {
  NAME,
  RANDOM,
}

export interface ItemFilter {
  categoryName: string;
  subCategoryName: string;
  keyword: string;
  favourOnly: boolean;
  orderBy: OrderBy;
}

export const createItemFilter = (): ItemFilter => {
  return {
    categoryName: CategoryAll,
    subCategoryName: "",
    keyword: "",
    favourOnly: false,
    orderBy: OrderBy.NAME,
  };
};
