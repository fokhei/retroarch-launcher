import { GameItem } from "../interfaces/GameItem";

export const createGameItem = (
  romPath: string,
  gameName: string,
  subCategoryName: string,
  isArchive: boolean
): GameItem => {
  return {
    romPath,
    gameName,
    subCategoryName,
    isArchive: isArchive ? isArchive : false,
  };
};
