import { execFile } from "child_process";
import { ExternalApp } from "./ExternalApp";
import { Player } from "./Player";
import { ComputedGameItem } from "../interfaces/ComputedGameItem";
import * as path from "path";

export const playOnTeknoParrot = (
  app: ExternalApp,
  _player: Player,
  _item: ComputedGameItem
) => {
  const params = [];
  const basename = path.basename(app.execPath);
  const cwd = app.execPath.replace(basename, "");
  const options = { cwd };
  execFile(app.execPath, params, options, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};
