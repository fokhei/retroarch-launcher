export const SEARCH = "SEARCH";

export const search = (categoryName: string, subCategoryName: string, keyword: string) => {
  return {
    type: SEARCH,
    categoryName,
    subCategoryName,
    keyword,
  };
};
