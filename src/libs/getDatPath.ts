import { Category } from "../interfaces/Category";

export const getDatPath = (category: Category): string => {
  if (category.hasOwnProperty("datPath")) {
    return category.datPath;
  }
  return null;
};
