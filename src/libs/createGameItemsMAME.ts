import * as path from "path";
import { DatIndexes } from "../interfaces/DatIndexes";
import { getRomFilter } from "./getRomFilter";
import { DriverStatus } from "../interfaces/DriverStatus";
import { createGameItem } from "./createGameItem";
import { Category } from "../interfaces/Category";
import { GameItem } from "../interfaces/GameItem";
import { removeAlias } from "../nameFilters/removeAlias";
import { mameGroups } from "../libs/mameGroups";

export const createGameItemsMAME = (
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
    const romName = path.basename(removeAlias(romPath));

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

        const ext = path.extname(romName);
        const noExt = romName.replace(ext, "");

        if (subCategoryName == "") {
          const keys = Object.keys(mameGroups);
          for (let i = 0; i < keys.length; i++) {
            const catName = keys[i];
            const cat = mameGroups[catName];
            if (cat.includes(noExt)) {
              subCategoryName = catName;
              break;
            }
          }
        }

       

        if (subCategoryName == "") {
          subCategoryName = "Misc";
        }

        const item = createGameItem(romPath, index.gameName, subCategoryName, false, false);
        items.push(item);
      }
    }
  });

  return items;
};
