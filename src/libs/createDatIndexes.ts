import { Category } from "../interfaces/Category";
import { DatIndexes } from "../interfaces/DatIndexes";
import { getDatParser } from "./getDatParser";
import datParsers from "../parsers/datParser";

export const createDatIndexes = (category: Category): DatIndexes => {
  const datParser = getDatParser(category);
  if (datParser) {
    if (datParsers.hasOwnProperty(datParser)) {
      let datIndexes: DatIndexes = {};
      const func = datParsers[datParser];
      return func(category, datIndexes);
    }
  }
  return null;
};

