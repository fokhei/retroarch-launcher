import fs from "fs";
import * as path from "path";
import { Category } from "../interfaces/Category";
import { GameItem } from "../interfaces/GameItem";
import { Playlist } from "../interfaces/PlayList";

export const exportGeneralPlaylist = (
  category: Category,
  items: Array<GameItem>,
  dir: string,
) => {
  const playlist: Playlist = {
    items,
  };
  const distPath = path.resolve(dir, `${category.name}.json`);
  fs.writeFileSync(distPath, JSON.stringify(playlist, null, 4));
};
