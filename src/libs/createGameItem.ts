import { GameItem } from "../interfaces/GameItem";

export const createGameItem = (
  romPath: string,
  gameName: string,
  subCategoryName: string
): GameItem => {
  return {
    romPath,
    gameName,
    subCategoryName
  };
};
