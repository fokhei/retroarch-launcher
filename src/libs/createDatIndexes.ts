import fs from "fs";
import convert from "xml-js";
import parse from "csv-parse";
import AppConfig, { getPlatformOptions, DatParser } from "./AppConfig";

export interface DatIndex {
  id: string;
  gameName: string;
}

export interface DatIndexes {
  [key: string]: DatIndex;
}

const readXmlAsJs = (datPath: string): any => {
  const xml = fs.readFileSync(datPath, "utf8");
  return convert.xml2js(xml, { compact: true, spaces: 4 });
};

const createIndexByNoIntro3DS = (datPath: string, indexes: DatIndexes) => {
  const js = readXmlAsJs(datPath);
  js.datafile.game.map(game => {
    if (game.hasOwnProperty("game_id")) {
      const attrs = game._attributes;
      const { name } = attrs;
      const isbios = name.startsWith("[BIOS]");
      if (!isbios) {
        const id = game.game_id._text;
        const gameName = name;
        indexes[id] = {
          id,
          gameName
        };
      }
    }
  });
};

const createIndexByNoPayStationPsvTsv = (
  datPath: string,
  indexes: DatIndexes
) => {
  const txt = fs.readFileSync(datPath, "utf8");
  const parser = parse(txt, {
    delimiter: "	",
    skip_empty_lines: true
  });
  let record: any;
  while ((record = parser.read())) {
    const id = record[0];
    // const region = record[1];
    const gameName = record[2];
    indexes[id] = {
      id,
      gameName
    };
  }
};

export const createDatIndexes = (
  config: AppConfig,
  category: string
): DatIndexes => {
  const platform = config.platforms[category];
  const datPath = getPlatformOptions(platform, "datPath") as string;
  const datParser = getPlatformOptions(platform, "datParser") as DatParser;
  if (datPath) {
    let indexes: DatIndexes = {};
    if (datParser == DatParser.NoIntro_3ds) {
      createIndexByNoIntro3DS(datPath, indexes);
    } else if (datParser == DatParser.noPayStation_Psv_Tsv) {
      createIndexByNoPayStationPsvTsv(datPath, indexes);
    }
    // console.log(indexes);
    return indexes;
  }

  return null;
};
