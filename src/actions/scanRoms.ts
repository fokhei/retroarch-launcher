import * as path from "path";
import { getFiles } from "../libs/getFiles";
import { createDatIndexes } from "../libs/createDatIndexes";
import { createGameItems } from "../libs/createGameItems";
import { exportGeneralPlaylist } from "../exporters/exportGeneralPlaylist";
import { AppConfigState } from "../states/appConfigState";
import { getCategory } from "../libs/getCategory";
import { DatIndexes } from "../interfaces/DatIndexes";
import { GameItem } from "../interfaces/GameItem";
import { getScanType } from "../libs/getScanType";
import { ScanType } from "../interfaces/ScanType";
import { getDirectoriesSync } from "../libs/getDirectoriesSync";
import { createGameItemsFBA } from "../libs/createGameItemsFBA";
import { createGameItemsMAME } from "../libs/createGameItemsMAME";
import { GAME_LIST_DIR_NAME } from "../libs/constants";
import { filterExts } from "../libs/filterExts";
import { SubCategory as Category } from "../interfaces/Category";
import { getDatParser } from '../libs/getDatParser';
const scanSync = require("scan-dir-recursive/sync");

export const SCAN_ROMS_START = "SCAN_ROMS_START";
export const SCAN_ROMS_SUCCESS = "SCAN_ROMS_SUCCESS";
export const SCAN_ROMS_ERROR = "SCAN_ROMS_ERROR";

export const scanRoms = (appConfig: AppConfigState, categoryName: string) => {
  return (dispatch) => {
    dispatch(scanRomsStart(categoryName));

    const category = getCategory(appConfig, categoryName);
    const datIndexes = createDatIndexes(category);
    const datParser = getDatParser(category);
    const { appDataDir } = appConfig;
    const gamelistPath = path.resolve(appDataDir, GAME_LIST_DIR_NAME);

    if (categoryName == "FBA") {
      return getFiles(category.romsPath)
        .then((files: Array<string>) => {
          const items = createGameItemsFBA(category, files, datIndexes);
          exportGeneralPlaylist(category, items, gamelistPath);
          dispatch(scanRomsSuccess(categoryName, datIndexes, items, appConfig));
        })
        .catch((err: any) => {
          dispatch(scanRomsError(err));
        });
    } else if (categoryName == "MAME") {
      return getFiles(category.romsPath)
        .then((files: Array<string>) => {
          const items = createGameItemsMAME(category, files, datIndexes);
          exportGeneralPlaylist(category, items, gamelistPath);
          dispatch(scanRomsSuccess(categoryName, datIndexes, items, appConfig));
        })
        .catch((err: any) => {
          dispatch(scanRomsError(err));
        });
    } else {
      let items: Array<GameItem> = [];

      const createGameItemsByScanCategory = (
        category: Category,
        subCategoryName: string = ""
      ): Array<GameItem> => {
        let items: Array<GameItem> = [];
        let dirsOrFiles: Array<string> = [];
        const scanType = getScanType(category);
        if (scanType == ScanType.FOLDER) {
          dirsOrFiles = getDirectoriesSync(category.romsPath);
        } else if (scanType == ScanType.FILE) {
          dirsOrFiles = filterExts(
            scanSync(category.romsPath),
            category.scanExts
          );
        } else {
          throw Error(`unhandle scanType "${scanType}"!`);
        }

        items = createGameItems(
          category,
          subCategoryName,
          dirsOrFiles,
          datIndexes,
          datParser,
          scanType,
          category.isArchive
        );
        return items;
      };

      if (category.hasOwnProperty("subCategories")) {
        const { subCategories } = category;
        subCategories.map((subCategory) => {
          items = items.concat(
            createGameItemsByScanCategory(subCategory, subCategory.name)
          );
        });
      } else {
        items = items.concat(createGameItemsByScanCategory(category, ""));
      }

      if (items.length) {
        exportGeneralPlaylist(category, items, gamelistPath);
      }
      dispatch(scanRomsSuccess(categoryName, datIndexes, items, appConfig));
    }
  };
};

export const scanRomsStart = (categoryName: String) => {
  return {
    type: SCAN_ROMS_START,
    categoryName,
  };
};

export const scanRomsSuccess = (
  categoryName: String,
  datIndexes: DatIndexes,
  items: Array<GameItem>,
  appConfig: AppConfigState
) => {
  return {
    type: SCAN_ROMS_SUCCESS,
    categoryName,
    datIndexes,
    items,
    appConfig,
  };
};

export const scanRomsError = (error: any) => {
  return {
    type: SCAN_ROMS_ERROR,
    error,
  };
};
