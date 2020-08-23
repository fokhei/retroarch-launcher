import fs from "fs";
import * as path from "path";
import { ComputedGameItem } from "../interfaces/ComputedGameItem";
import { Player } from "./Player";
import { execFile } from "child_process";
import { AppConfigState } from "../states/appConfigState";
import { getExternalApp } from "../libs/getExternalApp";
import { NotificationManager } from "react-notifications";
import { getTeknoParrotProfile } from "../libs/teknoParrotProfile";

const { dialog } = require("electron").remote;

export const play = (
  appConfig: AppConfigState,
  item: ComputedGameItem,
  player: Player
) => {
  if (player) {
    const romExist = fs.existsSync(item.romPath);

    if (!romExist) {
      NotificationManager.error(item.romPath, "Game file not exist!");
      return;
    }

    const app = getExternalApp(appConfig, player.name);
    let execPath = app.execPath;
    let pickPath = "";

    if (app.hasOwnProperty("pickerFilters")) {
      const dialogOptions: any = {
        title: "Select executable",
        properties: ["openFile"],
        defaultPath: item.romPath,
        filters: [{ name: "Executable", extensions: app.pickerFilters }],
      };
      const results = dialog.showOpenDialog(null, dialogOptions);
      if (!results) {
        return;
      }
      pickPath = results[0];
    }

    let args: Array<string> = [];

    if (app.hasOwnProperty("params")) {
      app.params.map((param) => {
        if (param == "%retroArchCore%") {
          if (player.hasOwnProperty("retroArchCore")) {
            param = player.retroArchCore;
          }
        } else if (param == "%romPath%") {
          param = item.romPath;
        } else if (param == "%romBasename%") {
          param = path.basename(item.romPath);
        } else if (param == "%romBasenameNoExt%") {
          const romBasename = path.basename(item.romPath);
          const ext = path.extname(romBasename);
          param = romBasename.replace(ext, "");
        } else if (param == "%pickPath%") {
          param = pickPath;
        } else if (param == "--profile=%teknoParrotProfile%") {
          const profile = getTeknoParrotProfile(item.gameName);
          param = param.replace("%teknoParrotProfile%", profile);
        }
        args.push(param);
      });
    }

    if (execPath == "%pickPath%") {
      execPath = pickPath;
    }

    const basename = path.basename(execPath);
    const cwd = execPath.replace(basename, "");
    const options: any = { cwd };
    execFile(execPath, args, options, (err: any) => {
      if (err) {
        NotificationManager.error(err.toString());
      }
    });
  }
};
