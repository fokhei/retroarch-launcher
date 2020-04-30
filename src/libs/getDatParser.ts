import { Category } from "../interfaces/Category";
import { DatParser } from "../interfaces/DatPaser";

export const getDatParser = (category: Category): DatParser => {
  if (category.hasOwnProperty("datParser")) {
    return category.datParser as DatParser;
  }
  return null;
};
