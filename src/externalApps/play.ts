import fs from "fs";
import * as path from "path";
import { ComputedGameItem } from "../interfaces/ComputedGameItem";
import { Player } from "./Player";
import { execFile } from "child_process";
import { AppConfigState } from "../states/appConfigState";
import { getExternalApp } from "../libs/getExternalApp";
import { NotificationManager } from "react-notifications";

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
        }
        args.push(param);
      });
    }

    const basename = path.basename(app.execPath);
    const cwd = app.execPath.replace(basename, "");
    const options: any = { cwd };
    execFile(app.execPath, args, options, (err: any) => {
      if (err) {
        NotificationManager.error(err.toString());
      }
    });

    /*
    if (app) {
      switch (app.name) {
        case "RetroArch": {
          const corePath = path.resolve(
            app.retroArchCoreDir,
            player.retroArchCore + ".dll"
          );
          const params = ["-L", corePath, item.romPath];
          execFile(app.execPath, params, execErrorHandler);
          break;
        }

        case "TeknoParrot": {
          const params = [];
          const basename = path.basename(app.execPath);
          const cwd = app.execPath.replace(basename, "");
          const options = { cwd };
          execFile(app.execPath, params, options, execErrorHandler);
          break;
        }

        case "D-Fend Reloaded":
          execFile(app.execPath, execErrorHandler);
          break;

        case "M2 Emulator": {
          const romBasename = path.basename(item.romPath);
          const ext = path.extname(romBasename);
          const romName = romBasename.replace(ext, "");
          const params = [romName];
          const appBasename = path.basename(app.execPath);
          const cwd = app.execPath.replace(appBasename, "");
          const options = { cwd };
          execFile(app.execPath, params, options, execErrorHandler);
          break;
        }

        case "SuperModel": {
          const romBasename = path.basename(item.romPath);
          const params = [romBasename];
          const appBasename = path.basename(app.execPath);
          const cwd = app.execPath.replace(appBasename, "");
          const options = { cwd };
          execFile(app.execPath, params, options, execErrorHandler);
          break;
        }

        default:
          NotificationManager.error(app.name, "Unhandled externalApp type!");
          break;
      }
      
    }
    */
  }
};
