import { toGoogleKeyword } from "./toGoogleKeyword";
import { shell } from "electron";
import { ComputedGameItem } from "../interfaces/ComputedGameItem";
import { AppConfigState } from "../states/appConfigState";
import { getCategory } from "./getCategory";

export const googleSearch = (
  config: AppConfigState,
  item: ComputedGameItem,
  suffix: string = ""
) => {
  let keyword = "";
  const category = getCategory(config, item.categoryName);
  if (category) {
    keyword += category.shortName + "+";
  }
  keyword += item.gameName;
  if (suffix) {
    keyword += "+" + suffix;
  }
  const q = toGoogleKeyword(keyword);
  shell.openExternal(`https://www.google.com/search?tbm=isch&q=${q}`);
};
