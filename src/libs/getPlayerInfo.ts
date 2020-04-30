import { Player } from "../externalApps/Player";
import { PlayerInfo } from "../externalApps/PlayerInfo";
import { ExternalAppType } from "../externalApps/ExternalAppType";

export const getPlayerInfo = (player: Player): PlayerInfo => {
  let name: string = player.type as string;
  switch (player.type) {
    case ExternalAppType.RETROARCH:
      name = "RetroArch";
      break;
    default:
      break;
  }
  return { name };
};
