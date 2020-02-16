import * as path from "path";
import { createPlayListItem } from "./createPlayListItem";
import { RetroArchPlayListItem } from "./RetroArchPlayListItem";
import AppConfig, { getPlatformOptions, DatParser } from "./AppConfig";
import { removeLangBracket } from "./naming/removeLangBracket";
import { removeDiscBracket } from "./naming/removeDiscBracket";
import { removeAlias } from "./naming/removeAlias";
import { removeVersionBracket } from "./naming/removeVersionBracket";
import { removeNintendoTitleIdBracket } from "./naming/removeNintendoTitleIdBracket";
import { DatIndexes } from "../parsers/datParsers";
import nameParsers from "../parsers/nameParsers";
import { removeDoubleSpace } from './naming/removeDoubleSpace';
import { removeAllBrackets } from './naming/removeAllBrackets';


export const createPlaylistItems = (
  config: AppConfig,
  category: string,
  files: Array<string>,
  indexes?: DatIndexes
): Array<RetroArchPlayListItem> => {
  const platform = config.platforms[category];

  let items = [];
  files.forEach(file => {
    const romName = removeAlias(path.basename(file));
    const ext = path.extname(romName);
    let gameName = romName.replace(ext, "");

    const datParser = getPlatformOptions(platform, "datParser") as DatParser;
    if (datParser) {
      if (nameParsers.hasOwnProperty(datParser)) {
        const func = nameParsers[datParser];
        gameName = func({ romName, indexes, gameName });
      }
    }

    let skip = !gameName;
    //skipNonFirstDisc
    if (getPlatformOptions(platform, "skipNonFirstDisc")) {
      const diskMatch = gameName.match(/\(Disc (\d{1})\)/);
      if (diskMatch) {
        const diskNum = Number(diskMatch[1]);
        if (diskNum > 1) {
          skip = true;
        }
      }
    }

    if (!skip) {
      if (getPlatformOptions(platform, "removeLang")) {
        gameName = removeLangBracket(gameName);
      }
      if (getPlatformOptions(platform, "removeDisc")) {
        gameName = removeDiscBracket(gameName);
      }
      if (getPlatformOptions(platform, "removeVersion")) {
        gameName = removeVersionBracket(gameName);
      }
      if (getPlatformOptions(platform, "removeTitleId")) {
        gameName = removeNintendoTitleIdBracket(gameName);
      }
     
      if (getPlatformOptions(platform, "removeAllBrackets")) {
        gameName = removeAllBrackets(gameName);
      }

      gameName = removeDoubleSpace(gameName);
      const item = createPlayListItem(config, category, file, gameName);
      items.push(item);
    }
  });
  return items;
};
