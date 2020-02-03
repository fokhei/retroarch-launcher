import * as path from "path";
import fs from "fs";
import { RetroArchPlayList } from "./RetroArchPlayList";
import { RetroArchPlayListItem } from "./RetroArchPlayListItem";
import AppConfig from "./AppConfig";

export interface ExportPlaylistResult {
  lpl: string;
  distFile: string;
  itemCount: number;
}

export const exportPlaylistFile = (
  config: AppConfig,
  category: string,
  items: Array<RetroArchPlayListItem>
): ExportPlaylistResult => {
  const playlist: RetroArchPlayList = {
    version: new Date().getTime().toString(),
    default_core_path: "",
    default_core_name: "",
    label_display_mode: 0,
    right_thumbnail_mode: 0,
    left_thumbnail_mode: 0,
    items
  };
  const lpl = category + ".lpl";
  const distFile = path.resolve(config.retroArch.playlists, lpl);
  fs.writeFileSync(distFile, JSON.stringify(playlist, null, 4));
  return {
    lpl,
    distFile,
    itemCount: items.length
  };
};
