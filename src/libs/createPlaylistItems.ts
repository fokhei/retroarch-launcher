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
      const reg = /(.+)\s\[([ABCDEF\d]{16})\]/gi;
      const arrs = reg.exec(romName);
      const titleId = arrs[2];
      if (indexes.hasOwnProperty(titleId)) {
        const index = indexes[titleId];
        gameName = index.gameName;
      }
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
