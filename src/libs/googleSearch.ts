import AppConfig, { getPlatform } from "./AppConfig";
import { toGoogleKeyword } from "./toGoogleKeyword";
import { shell } from "electron";
import { ComputedPlayListItem } from "./ComputedPlaylistItem";

export const googleSearch = (
  config: AppConfig,
  item: ComputedPlayListItem,
  suffix: string = ""
) => {
  let keyword = "";
  const platform = getPlatform(config, item.db_name);
  if (platform) {
    keyword += platform.shortName + "+";
  }
  keyword += item.label;
  if (suffix) {
    keyword += "+" + suffix;
  }
  const q = toGoogleKeyword(keyword);
  shell.openExternal(`https://www.google.com/search?tbm=isch&q=${q}`);
};
