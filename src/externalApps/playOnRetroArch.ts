import { execFile } from "child_process";
import * as path from "path";
import { ExternalApp } from "./ExternalApp";
import { Player } from "./Player";
import { ComputedGameItem } from "../interfaces/ComputedGameItem";

export const playOnRetroArch = (
  app: ExternalApp,
  player: Player,
  item: ComputedGameItem
) => {
  const corePath = path.resolve(app.coreDir, player.retroArchCore + ".dll");
  const params = ["-L", corePath, item.romPath];
  execFile(app.execPath, params, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};
