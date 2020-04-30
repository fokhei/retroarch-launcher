import { Category } from "../interfaces/Category";

export const getNameFilter = (category: Category, filterName: string) => {
  if (category.hasOwnProperty("nameFilter")) {
    const { nameFilter } = category;
    if (nameFilter.hasOwnProperty(filterName)) {
      return nameFilter[filterName];
    }
  }
  return null;
};
