import fs from "fs";
import * as path from "path";
import { ComputedGameItem } from "../interfaces/ComputedGameItem";
import { Player } from "./Player";
import { execFile } from "child_process";
import { AppConfigState } from "../states/appConfigState";
import { getExternalApp } from "../libs/getExternalApp";
import { NotificationManager } from "react-notifications";
import { getTeknoParrotProfile } from "../libs/getTeknoParrotProfile";
import { MappingState } from "../states/mappingState";

const { dialog } = require("electron").remote;

export const play = (
  appConfig: AppConfigState,
  mapping: MappingState,
  item: ComputedGameItem,
  player: Player
) => {
  if (player) {
    let shouldExec = true;
    const romExist = fs.existsSync(item.romPath);

    if (!romExist) {
      NotificationManager.error(item.romPath, "Game file not exist!");
      shouldExec = false;
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
        shouldExec = false;
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
          const profile = getTeknoParrotProfile(mapping, item.gameName);
          if (profile != "") {
            param = param.replace("%teknoParrotProfile%", profile);
          } else {
            NotificationManager.error(
              item.gameName,
              "Fail to map TeknoParrot profile"
            );
            shouldExec = false;
            return;
          }
        }
        args.push(param);
      });
    }

    if (execPath == "%pickPath%") {
      execPath = pickPath;
    }

    if (shouldExec) {
      const basename = path.basename(execPath);
      const cwd = execPath.replace(basename, "");
      const options: any = { cwd };
      execFile(execPath, args, options, (err: any) => {
        if (err) {
          // NotificationManager.error(err.toString());
        }
      });
    }
  }
};
