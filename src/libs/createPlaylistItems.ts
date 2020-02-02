import * as path from "path";
import { createPlayListItem } from "./createPlayListItem";
import { RetroArchPlayListItem } from "./RetroArchPlayListItem";
import AppConfig, { getPlatformOptions, DatParser } from "./AppConfig";
import { removeLangBracket } from "./removeLangBracket";
import { removeDiscBracket } from "./removeDiscBracket";
import { removeAlias } from "./removeAlias";
import { removeVersionBracket } from "./removeVersionBracket";
import { removeNintendoTitleIdBracket } from "./removeNintendoTitleIdBracket";
import { DatIndexes } from "./createDatIndexes";

const updateGameNameByNoIntro3ds = (
  romName: string,
  indexes: DatIndexes,
  _defaultGameName: string
): string => {
  const reg = /(.+)\s\[([ABCDEF\d]{16})\]/gi;
  const arrs = reg.exec(romName);
  const id = arrs[2];
  if (indexes.hasOwnProperty(id)) {
    const index = indexes[id];
    return index.gameName;
  } else {
    return arrs[1];
  }
};

const updateGameNameByNoPayStationPsvTsv = (
  romName: string,
  indexes: DatIndexes,
  defaultGameName: string
): string => {
  const id = romName.match(/\w{4}\d{5}/);
  if (id) {
    if (indexes.hasOwnProperty(id.toString())) {
      const index = indexes[id.toString()];
      return index.gameName;
    }
  }
  return defaultGameName;
};

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
    if (datParser == DatParser.NoIntro_3ds) {
      gameName = updateGameNameByNoIntro3ds(romName, indexes, gameName);
    } else if (datParser == DatParser.noPayStation_Psv_Tsv) {
      gameName = updateGameNameByNoPayStationPsvTsv(romName, indexes, gameName);
    }

    let skip = false;
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

      gameName = gameName.trim();
      const item = createPlayListItem(config, category, file, gameName);
      items.push(item);
    }
  });
  return items;
};
