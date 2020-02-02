import * as path from "path";
import { RetroArchPlayListItem } from "./RetroArchPlayListItem";
import AppConfig from './AppConfig';

export const createPlayListItem = (
  config: AppConfig,
  category: string,
  romPath: string,
  gameName: string
): RetroArchPlayListItem => {
  const platform = config.platforms[category];

  const item: RetroArchPlayListItem = {
    path: romPath,
    label: gameName,
    core_path: path.resolve(config.retroArch.cores, platform.dllName),
    core_name: "",
    crc32: "00000000|crc",
    db_name: platform.thumbnailDB
  };
  return item;
};
createPlayListItem;
