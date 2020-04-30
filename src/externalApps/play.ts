import { ComputedGameItem } from "../interfaces/ComputedGameItem";
import { Player } from "./Player";
import { ExternalAppType } from "./ExternalAppType";
import { AppConfigState } from "../states/appConfigState";
import { getExternalApp } from "../libs/getExternalApp";
import { playOnRetroArch } from "./playOnRetroArch";
import { playOnTeknoParrot } from "./playOnTeknoParrot";
import { playOnDFend } from "./PlayOnDFend";
import { playOnM2Emulator } from "./playOnM2Emulator";
import { playOnSuperModel } from './playOnSuperModel';

export const play = (
  appConfig: AppConfigState,
  item: ComputedGameItem,
  player: Player
) => {
  if (player) {
    const app = getExternalApp(appConfig, player.type);
    if (app) {
      switch (app.type) {
        case ExternalAppType.RETROARCH:
          playOnRetroArch(app, player, item);
          break;

        case ExternalAppType.TEKNOPARROT:
          playOnTeknoParrot(app, player, item);
          break;

        case ExternalAppType.DFENDRELOADED:
          playOnDFend(app, player, item);
          break;

        case ExternalAppType.M2EMULATOR:
          playOnM2Emulator(app, player, item);
          break;

          case ExternalAppType.SUPERMODEL:
            playOnSuperModel(app, player, item);
            break;

        default:
          console.error(`unhandled externalApp type: ${app.type}`);
          break;
      }
    }
  }
};
