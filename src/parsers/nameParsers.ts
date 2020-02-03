import { DatIndexes } from "./datParsers";
import { ParserType } from "./Parser";

interface NameParserProps {
  romName: string;
  indexes: DatIndexes;
  gameName: string;
}

interface NameParsers {
  [key: string]: (props: NameParserProps) => string | null;
}

const nameParsers: NameParsers = {
  [ParserType.noIntro3ds]: (props: NameParserProps) => {
    const { romName, indexes } = props;
    const reg = /(.+)\s\[([ABCDEF\d]{16})\]/gi;
    const arrs = reg.exec(romName);
    const id = arrs[2];
    if (indexes.hasOwnProperty(id)) {
      const index = indexes[id];
      return index.gameName;
    } else {
      return arrs[1];
    }
  },
  [ParserType.noPayStationPsvTsv]: (props: NameParserProps) => {
    const { romName, indexes, gameName } = props;
    const id = romName.match(/\w{4}\d{5}/);
    if (id) {
      if (indexes.hasOwnProperty(id.toString())) {
        const index = indexes[id.toString()];
        return index.gameName;
      }
    }
    return gameName;
  },

  [ParserType.fba]: (props: NameParserProps) => {
    const { romName, indexes } = props;
    if (indexes.hasOwnProperty(romName)) {
      const index = indexes[romName];
      return index.gameName;
    }
    return null;
  },

  [ParserType.mame]: (props: NameParserProps) => {
    const { romName, indexes } = props;
    if (indexes.hasOwnProperty(romName)) {
      const index = indexes[romName];
      return index.gameName;
    }
    return null;
  }
};

export default nameParsers;
