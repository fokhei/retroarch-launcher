import * as path from "path";
import { createPlayListItem } from "./createPlayListItem";
import { RetroArchPlayListItem } from "./RetroArchPlayListItem";

export const createPlaylistItems = (
  config: AppConfig,
  category: string,
  files: Array<string>
): Array<RetroArchPlayListItem> => {
  let items = [];
  files.forEach(file => {
    const romName = path.basename(file);
    const ext = path.extname(romName);
    let gameName = romName.replace(ext, "");
    let skip = false;
    // const diskMatch = gameName.match(/\(Disc (\d{1})\)/);
    // if (diskMatch) {
    //   const diskNum = diskMatch[1];
    //   if (diskNum > 1) {
    //     skip = true;
    //   }
    // }

    if (!skip) {
      //   gameName = removeLangBracket(gameName);
      //   gameName = removeDiscBracket(gameName);
      // console.log(gameName);
      const item = createPlayListItem(config, category, file, gameName);
      items.push(item);
    }
  });
  return items;
};
