import * as path from "path";
import { Category } from "../interfaces/Category";
import { DatIndexes } from "../interfaces/DatIndexes";
import { createGameItem } from "./createGameItem";
import { GameItem } from "../interfaces/GameItem";
import { getDatParser } from "./getDatParser";
import { nameParsers } from "../parsers/nameParsers";
import { removeLangBracket } from "../nameFilters/removeLangBracket";
import { removeDiscBracket } from "../nameFilters/removeDiscBracket";
import { removeAlias } from "../nameFilters/removeAlias";
import { removeVersionBracket } from "../nameFilters/removeVersionBracket";
import { removeNintendoTitleIdBracket } from "../nameFilters/removeNintendoTitleIdBracket";
import { removeDoubleSpace } from "../nameFilters/removeDoubleSpace";
import { removeAllBrackets } from "../nameFilters/removeAllBrackets";
import { removeNonFirstBrackets } from "../nameFilters/removeNonFirstBrackets";
import { removePspIdBracket } from "../nameFilters/removePspIdBracket";
import { getRomFilter } from "./getRomFilter";
import { getNameFilter } from "./getNameFilter";


export const createGameItems = (
  category: Category,
  subCategoryName: string,
  files: Array<string>,
  datIndexes?: DatIndexes
): Array<GameItem> => {
  let items = [];
  files.forEach((file) => {
    const romName = removeAlias(path.basename(file));
    const ext = path.extname(romName);
    let gameName = romName.replace(ext, "");
    let skip = false;


    const datParser = getDatParser(category);
    if (datParser) {
      if (nameParsers.hasOwnProperty(datParser)) {
        const func = nameParsers[datParser];
        gameName = func(romName, datIndexes);
        skip = !gameName;
      }
    }

    

    if (!skip) {
      const includeExts = getRomFilter(category, "includeExts");
      if (includeExts && includeExts.length) {
        skip = !includeExts.includes(ext);
      }
    }

    if (!skip) {
      if (getRomFilter(category, "excludeBios")) {
        const matchs = gameName.match(/\[BIOS\]/gi);
        if (matchs) {
          skip = true;
        }
      }
    }

    if (!skip) {
      if (getRomFilter(category, "excludeNonFirstDisc")) {
        const matchs = gameName.match(/Disc\s?([\w\d]+)\)/gi);
        if (matchs) {
          const diskNum = Number(matchs[1]);
          if (!isNaN(diskNum)) {
            if (diskNum > 1) {
              skip = true;
            }
          } else {
            skip = matchs[1] != "I" && matchs[1] != "A";
          }
        }
      }
    }

    if (!skip) {
      if (getRomFilter(category, "excludeBeta")) {
        const matchs = gameName.match(/\(Beta\s?\d?\)/gi);
        if (matchs) {
          skip = true;
        }
      }
    }

    if (!skip) {
      if (getRomFilter(category, "excludeProto")) {
        const matchs = gameName.match(/\(Proto\s?/gi);
        if (matchs) {
          skip = true;
        }
      }
    }

    if (!skip) {
      if (getRomFilter(category, "excludeSample")) {
        const matchs = gameName.match(/\(Sample\)/gi);
        if (matchs) {
          skip = true;
        }
      }
    }

    if (!skip) {
      if (getRomFilter(category, "excludeDemo")) {
        const matchs = gameName.match(/\(Demo\)/gi);
        if (matchs) {
          skip = true;
        }
      }
    }

    if (!skip) {
      if (getRomFilter(category, "excludeDlc")) {
        const matchs = gameName.match(/\[DLC\]/gi);
        if (matchs) {
          skip = true;
        }
      }
    }


    if (!skip) {
      if (getRomFilter(category, "excludeUpdate")) {
        const matchs = gameName.match(/\[UPDATE\sv(\d.+)\]/gi);
        if (matchs) {
          skip = true;
        }
      }
    }


    if (!skip) {
      if (getRomFilter(category, "excludeNonUsa")) {
        const matchs = gameName.match(/\(USA\)/gi);
        if (!matchs) {
          skip = true;
        }
      }
    }


    if (!skip) {
      if (getRomFilter(category, "excludeDiagnostics")) {
        const matchs = gameName.match(/Diagnostic(s?)/gi);
        if (matchs) {
          skip = true;
        }
      }
    }

    



    if (!skip) {
      if (getNameFilter(category, "removeLangBracket")) {
        gameName = removeLangBracket(gameName);
      }
      if (getNameFilter(category, "removeDiscBracket")) {
        gameName = removeDiscBracket(gameName);
      }
      if (getNameFilter(category, "removeVersion")) {
        gameName = removeVersionBracket(gameName);
      }
      if (getNameFilter(category, "removeTitleId")) {
        gameName = removeNintendoTitleIdBracket(gameName);
      }
      if (getNameFilter(category, "removeNonFirstBrackets")) {
        gameName = removeNonFirstBrackets(gameName);
      }
      if (getNameFilter(category, "removePspIdBracket")) {
        gameName = removePspIdBracket(gameName);
      }
      if (getNameFilter(category, "removeAllBrackets")) {
        gameName = removeAllBrackets(gameName);
      }

      gameName = removeDoubleSpace(gameName);
      const item = createGameItem(file, gameName, subCategoryName);
      items.push(item);
    }
  });
  return items;
};
