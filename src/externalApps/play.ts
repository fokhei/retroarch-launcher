import fs from "fs";
import * as path from "path";
import { ComputedGameItem } from "../interfaces/ComputedGameItem";
import { Player } from "./Player";
import { execFile } from "child_process";
import { ExternalAppType } from "./ExternalAppType";
import { AppConfigState } from "../states/appConfigState";
import { getExternalApp } from "../libs/getExternalApp";

export const play = (
  appConfig: AppConfigState,
  item: ComputedGameItem,
  player: Player
) => {
  if (player) {


    const romExist = fs.existsSync(item.romPath);
    if(!romExist) {
      console.error(`file not exist: ${item.romPath}`);
      
    }

    const app = getExternalApp(appConfig, player.type);
    if (app) {
      switch (app.type) {
        case ExternalAppType.RETROARCH: {
          const corePath = path.resolve(
            app.coreDir,
            player.retroArchCore + ".dll"
          );
          const params = ["-L", corePath, item.romPath];
          execFile(app.execPath, params, (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
          break;
        }

        case ExternalAppType.TEKNOPARROT: {
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
          break;
        }

        case ExternalAppType.DFENDRELOADED:
          execFile(app.execPath, (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
          break;

        case ExternalAppType.M2EMULATOR: {
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
          break;
        }

        case ExternalAppType.SUPERMODEL: {
          const romBasename = path.basename(item.romPath);
          const params = [romBasename];
          const appBasename = path.basename(app.execPath);
          const cwd = app.execPath.replace(appBasename, "");
          const options = { cwd };
          execFile(app.execPath, params, options, (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
          break;
        }

        default:
          console.error(`unhandled externalApp type: ${app.type}`);
          break;
      }
    }
  }
};
