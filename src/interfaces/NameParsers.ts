import { DatIndexes } from "./DatIndexes";

export interface NameParsers {
  [key: string]: (romName: string, datIndexes: DatIndexes) => string | null;
}
