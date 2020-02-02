import * as path from "path";
import { createPlayListItem } from "./createPlayListItem";
import { RetroArchPlayListItem } from "./RetroArchPlayListItem";
import AppConfig, { getPlatformOptions } from "./AppConfig";
import { removeLangBracket } from "./removeLangBracket";
import { removeDiscBracket } from "./removeDiscBracket";

export const createPlaylistItems = (
  config: AppConfig,
  category: string,
  files: Array<string>
): Array<RetroArchPlayListItem> => {
  const platform = config.platforms[category];

  let items = [];
  files.forEach(file => {
    const romName = path.basename(file);
    const ext = path.extname(romName);
    let gameName = romName.replace(ext, "");
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
      if (getPlatformOptions(platform, "removeLangInfo")) {
        gameName = removeLangBracket(gameName);
      }
      if (getPlatformOptions(platform, "removeDiscInfo")) {
        gameName = removeDiscBracket(gameName);
      }

      const item = createPlayListItem(config, category, file, gameName);
      items.push(item);
    }
  });
  return items;
};
