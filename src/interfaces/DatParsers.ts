import { DatIndexes } from "./DatIndexes";
import { Category } from "./Category";

export interface DatParsers {
  [key: string]: (category: Category, datIndexes: DatIndexes) => DatIndexes;
}
