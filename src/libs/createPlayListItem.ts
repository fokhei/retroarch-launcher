import * as path from "path";
import { RetroArchPlayListItem } from "./RetroArchPlayListItem";
import AppConfig from "./AppConfig";

export const createPlayListItem = (
  config: AppConfig,
  category: string,
  romPath: string,
  gameName: string
): RetroArchPlayListItem => {
  const platform = config.platforms[category];
  let corePath = "";
  if (platform.dllName) {
    corePath = path.resolve(config.retroArch.cores, platform.dllName);
  }
  const item: RetroArchPlayListItem = {
    path: romPath,
    label: gameName,
    core_path: corePath,
    core_name: "",
    crc32: "00000000|crc",
    db_name: platform.thumbnailDB
  };
  return item;
};
createPlayListItem;
