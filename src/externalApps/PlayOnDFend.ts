import { execFile } from "child_process";
import { ExternalApp } from "./ExternalApp";
import { Player } from "./Player";
import { ComputedGameItem } from "../interfaces/ComputedGameItem";

export const playOnDFend = (
  app: ExternalApp,
  _player: Player,
  _item: ComputedGameItem
) => {
  execFile(app.execPath, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};
