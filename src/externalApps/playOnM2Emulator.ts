import { execFile } from "child_process";
import { ExternalApp } from "./ExternalApp";
import { Player } from "./Player";
import { ComputedGameItem } from "../interfaces/ComputedGameItem";
import * as path from "path";

export const playOnM2Emulator = (
  app: ExternalApp,
  _player: Player,
  item: ComputedGameItem
) => {
  const romBasename = path.basename(item.romPath);
  const ext = path.extname(romBasename);
  const romName = romBasename.replace(ext, "");
  const params = [romName];
  const appBasename = path.basename(app.execPath);
  const cwd = app.execPath.replace(appBasename, "");
  const options = { cwd };
  execFile(app.execPath, params, options, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};
