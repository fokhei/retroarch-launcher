import { Category } from "../interfaces/Category";
import { Player } from "../externalApps/Player";

export const getPlayers = (category: Category): Array<Player> => {
  if (category.hasOwnProperty("players")) {
    return category.players;
  }
  return [];
};
