import * as path from "path";
import { DatIndexes } from "../interfaces/DatIndexes";
import { getRomFilter } from "./getRomFilter";
import { DriverStatus } from "../interfaces/DriverStatus";
import { createGameItem } from "./createGameItem";
import { Category } from "../interfaces/Category";
import { GameItem } from "../interfaces/GameItem";

const groups = [
  "Capcom",
  "SNK",
  "Midway",
  "Konami",
  "Namco",
  "Sega",
  "Taito",
  "IGS",
];

export const createGameItemsFBA = (
  category: Category,
  files: Array<string>,
  datIndexes: DatIndexes
): Array<GameItem> => {
  let items: Array<GameItem> = [];
  const { romsPath } = category;
  const includeStatus = getRomFilter(category, "includeStatus") as Array<
    DriverStatus
  >;

  files.map((romPath: string) => {
    const romName = path.basename(romPath);

    if (datIndexes.hasOwnProperty(romName)) {
      const romPath = path.resolve(romsPath, romName);
      const index = datIndexes[romName];

      let shouldExport = true;
      if (includeStatus) {
        if (!includeStatus.includes(index.driverStatus as DriverStatus)) {
          shouldExport = false;
        }
      }

      if (shouldExport) {
        let subCategoryName = "";
        if (Number(index.year) <= 1984) {
          subCategoryName = "Classic";
        } else {
          for (let i = 0; i < groups.length; i++) {
            if (index.manufacturer.includes(groups[i])) {
              subCategoryName = groups[i];
              break;
            }
          }
        }

        const item = createGameItem(romPath, index.gameName, subCategoryName);
        items.push(item);
      }
    }
  });

  return items;
};
