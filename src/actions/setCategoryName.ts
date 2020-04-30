export const SET_CATEGORY_NAME = "SET_CATEGORY_NAME";

export const setCategoryName = (categoryName: string, subCategoryName?: string) => {
  return {
    type: SET_CATEGORY_NAME,
    categoryName,
    subCategoryName
  };
};
