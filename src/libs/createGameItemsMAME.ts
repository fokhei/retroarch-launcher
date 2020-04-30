import * as path from "path";
import { DatIndexes } from "../interfaces/DatIndexes";
import { getRomFilter } from "./getRomFilter";
import { DriverStatus } from "../interfaces/DriverStatus";
import { createGameItem } from "./createGameItem";
import { Category } from "../interfaces/Category";
import { GameItem } from "../interfaces/GameItem";
import { mameGroups } from "../mameGroups";
import { serials } from "../mameGroups/serials";

const mameGroupKeys = Object.keys(mameGroups);
const serialKeys = Object.keys(serials);

export const createGameItemsMAME = (
  category: Category,
  files: Array<string>,
  datIndexes: DatIndexes
): Array<GameItem> => {


  console.log("createGameItemsMAME")
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
      let driver = index.sourcefile.replace(".cpp", "");

      let subCategoryName = "";
      if (serialKeys.includes(driver)) {
        subCategoryName = serials[driver];
      } else {
        for (let i = 0; i < mameGroupKeys.length; i++) {
          const key = mameGroupKeys[i];
          const mameGroup = mameGroups[key];
          if (mameGroup.drivers.includes(driver)) {
            subCategoryName = key;
            break;
          }
        }

        if (subCategoryName == "") {
          if (index.diskName != "") {
            subCategoryName = "CHD";
          }
        }
      }

      let shouldExport = true;
      if (includeStatus) {
        if (!includeStatus.includes(index.driverStatus as DriverStatus)) {
          shouldExport = false;
        }
      }

      if (shouldExport) {
        const item = createGameItem(romPath, index.gameName, subCategoryName);
        items.push(item);
      }
    }
  });

  return items;
};
