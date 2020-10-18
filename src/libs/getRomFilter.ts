import { Category, SubCategory } from "../interfaces/Category";

export const getRomFilter = (category: Category|SubCategory, filterName: string) => {
  if (category.hasOwnProperty("romFilter")) {
    const { romFilter } = category;
    if (romFilter.hasOwnProperty(filterName)) {
      return romFilter[filterName];
    }
  }
  return null;
};
