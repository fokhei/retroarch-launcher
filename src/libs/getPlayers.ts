import { Category } from "../interfaces/Category";
import { Player } from "../externalApps/Player";
import { ComputedGameItem } from "../interfaces/ComputedGameItem";

export const getPlayers = (
  category: Category,
  item: ComputedGameItem
): Array<Player> => {
  if (!item.isArchive) {
    if (category.hasOwnProperty("players")) {
      return category.players;
    }
  }

  return [];
};
