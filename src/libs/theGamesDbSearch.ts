import { toUrlKeyword } from "./toUrlKeyword";
import { shell } from "electron";
import { ComputedGameItem } from "../interfaces/ComputedGameItem";
import { AppConfigState } from "../states/appConfigState";
import { getCategory } from "./getCategory";

export const theGamesDbSearch = (
    config: AppConfigState,
    item: ComputedGameItem,
    suffix: string = ""
) => {
    let keyword = "";
    const category = getCategory(config, item.categoryName);
    keyword += item.gameName;
    if (suffix) {
        keyword += "+" + suffix;
    }
    const q = toUrlKeyword(keyword);
    const p = category.theGamsDbPlatform ? category.theGamsDbPlatform : 0;
    shell.openExternal(`https://thegamesdb.net/search.php?name=${q}&platform_id%5B%5D=${p}`)
};
