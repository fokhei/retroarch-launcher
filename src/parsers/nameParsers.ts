import { NameParsers } from "../interfaces/NameParsers";
import { ParserType } from "../interfaces/NameParserType";
import { DatIndexes } from "../interfaces/DatIndexes";

export const nameParsers: NameParsers = {
  [ParserType.NO_INTRO_3DS]: (romName: string, datIndexes: DatIndexes) => {
    const reg = /(.+)\s\[([ABCDEF\d]{16})\]/gi;
    const arrs = reg.exec(romName);
    const id = arrs[2];
    if (datIndexes.hasOwnProperty(id)) {
      const index = datIndexes[id];
      return index.gameName;
    } else {
      return arrs[1];
    }
  },
  [ParserType.NO_PAY_STATION_PSV_TSV]: (
    romName: string,
    datIndexes: DatIndexes
  ) => {
    const id = romName.match(/\w{4}\d{5}/);
    if (id) {
      if (datIndexes.hasOwnProperty(id.toString())) {
        const index = datIndexes[id.toString()];
        return index.gameName;
      }
    }
    return romName;
  },

  [ParserType.FBA]: (romName: string, datIndexes: DatIndexes) => {
    if (datIndexes.hasOwnProperty(romName)) {
      const index = datIndexes[romName];
      return index.gameName;
    }
    return null;
  },

  [ParserType.MAME]: (romName: string, datIndexes: DatIndexes) => {
    if (datIndexes.hasOwnProperty(romName)) {
      const index = datIndexes[romName];
      return index.gameName;
    }
    return null;
  },

  [ParserType.M2_EMULATOR]: (romName: string, datIndexes: DatIndexes) => {
    if (datIndexes.hasOwnProperty(romName)) {
      const index = datIndexes[romName];
      return index.gameName;
    }
    return null;
  },

  [ParserType.SUPER_MODEL]: (romName: string, datIndexes: DatIndexes) => {
    if (datIndexes.hasOwnProperty(romName)) {
      const index = datIndexes[romName];
      return index.gameName;
    }
    return null;
  },
};

export default nameParsers;
