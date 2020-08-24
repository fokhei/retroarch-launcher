export interface ItemFilter {
  categoryName: string;
  subCategoryName: string;
  keyword: string;
  favourOnly: boolean;
  orderBy: OrderBy;
}

export enum OrderBy {
  NAME,
  RANDOM,
}
