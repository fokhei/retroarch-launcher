import fs from "fs";
import convert from "xml-js";
import AppConfig, { getPlatformOptions, DatParser } from "./AppConfig";

export interface DatIndex {
  id: string;
  gameName: string;
}

export interface DatIndexes {
  [key: string]: DatIndex;
}

const readXMLAsJs = (datPath: string): any => {
  const xml = fs.readFileSync(datPath, "utf8");
  return convert.xml2js(xml, { compact: true, spaces: 4 });
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
      const js = readXMLAsJs(datPath);
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
    }
    console.log(indexes);
    return indexes;
  }

  return null;
};
