import * as path from "path";
import { createPlayListItem } from "./createPlayListItem";
import { RetroArchPlayListItem } from "./RetroArchPlayListItem";
import AppConfig, {
  getPlatformOptions,
  DatParser,
  getNameFilter,
  getRomFilter
} from "./AppConfig";
import { removeLangBracket } from "./nameFilters/removeLangBracket";
import { removeDiscBracket } from "./nameFilters/removeDiscBracket";
import { removeAlias } from "./nameFilters/removeAlias";
import { removeVersionBracket } from "./nameFilters/removeVersionBracket";
import { removeNintendoTitleIdBracket } from "./nameFilters/removeNintendoTitleIdBracket";
import { DatIndexes } from "../parsers/datParsers";
import nameParsers from "../parsers/nameParsers";
import { removeDoubleSpace } from "./nameFilters/removeDoubleSpace";
import { removeAllBrackets } from "./nameFilters/removeAllBrackets";
import { removeNonFirstBrackets } from "./nameFilters/removeNonFirstBrackets";

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

    if (!skip) {
      if (getRomFilter(platform, "excludeBios")) {
        const matchs = gameName.match(/\[BIOS\]/);
        if (matchs) {
          skip = true;
        }
      }
    }

    if (!skip) {
      if (getRomFilter(platform, "excludeNonFirstDisc")) {
        const matchs = gameName.match(/\(Disc ([\w\d]+)\)/);
        if (matchs) {
          const diskNum = Number(matchs[1]);
          if (!isNaN(diskNum)) {
            if (diskNum > 1) {
              skip = true;
            }
          } else {
            skip = (matchs[1] != "I" && matchs[1] != "A");
          }
        }
      }
    }

    if (!skip) {
      if (getRomFilter(platform, "excludeBeta")) {
        const matchs = gameName.match(/\(Beta\s?\d?\)/);
        if (matchs) {
          skip = true;
        }
      }
    }

    if (!skip) {
      if (getRomFilter(platform, "excludeProto")) {
        const matchs = gameName.match(/\(Proto\)/);
        if (matchs) {
          skip = true;
        }
      }
    }

    if (!skip) {
      if (getRomFilter(platform, "excludeSample")) {
        const matchs = gameName.match(/\(Sample\)/);
        if (matchs) {
          skip = true;
        }
      }
    }

    if (!skip) {
      if (getRomFilter(platform, "excludeDemo")) {
        const matchs = gameName.match(/\(Demo\)/);
        if (matchs) {
          skip = true;
        }
      }
    }

    if (!skip) {
      if (getNameFilter(platform, "removeLang")) {
        gameName = removeLangBracket(gameName);
      }
      if (getNameFilter(platform, "removeDisc")) {
        gameName = removeDiscBracket(gameName);
      }
      if (getNameFilter(platform, "removeVersion")) {
        gameName = removeVersionBracket(gameName);
      }
      if (getNameFilter(platform, "removeTitleId")) {
        gameName = removeNintendoTitleIdBracket(gameName);
      }
      if (getNameFilter(platform, "removeAllBrackets")) {
        gameName = removeAllBrackets(gameName);
      }

      if (getNameFilter(platform, "removeNonFirstBrackets")) {
        gameName = removeNonFirstBrackets(gameName);
      }

      gameName = removeDoubleSpace(gameName);
      const item = createPlayListItem(config, category, file, gameName);
      items.push(item);
    }
  });
  return items;
};
