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

export const SCAN_ROMS_START = "SCAN_ROMS_START";
export const SCAN_ROMS_SUCCESS = "SCAN_ROMS_SUCCESS";
export const SCAN_ROMS_ERROR = "SCAN_ROMS_ERROR";

export const scanRoms = (appConfig: AppConfigState, categoryName: string) => {
  return (dispatch) => {
    dispatch(scanRomsStart(categoryName));
    const category = getCategory(appConfig, categoryName);
    const datIndexes = createDatIndexes(category);
    if (categoryName == "FBA") {
      return getFiles(category.romsPath)
        .then((files: Array<string>) => {
          const items = createGameItemsFBA(category, files, datIndexes);
          exportGeneralPlaylist(category, items, appConfig.gamelistPath);
          dispatch(scanRomsSuccess(categoryName, datIndexes, items, appConfig));
        })
        .catch((err: any) => {
          dispatch(scanRomsError(err));
        });
    } else if (categoryName == "MAME") {
      return getFiles(category.romsPath)
        .then((files: Array<string>) => {
          const items = createGameItemsMAME(category, files, datIndexes);
          exportGeneralPlaylist(category, items, appConfig.gamelistPath);
          dispatch(scanRomsSuccess(categoryName, datIndexes, items, appConfig));
        })
        .catch((err: any) => {
          dispatch(scanRomsError(err));
        });
    } else {
      const scanType = getScanType(category);
      if (scanType == ScanType.FILE) {
        return getFiles(category.romsPath)
          .then((files: Array<string>) => {
            const items = createGameItems(category, "", files, datIndexes);
            exportGeneralPlaylist(category, items, appConfig.gamelistPath);
            dispatch(
              scanRomsSuccess(categoryName, datIndexes, items, appConfig)
            );
          })
          .catch((err: any) => {
            dispatch(scanRomsError(err));
          });
      } else if (scanType == ScanType.FOLDER) {
        const dirs = getDirectoriesSync(category.romsPath);
        const items = createGameItems(category, "", dirs, datIndexes);
        exportGeneralPlaylist(category, items, appConfig.gamelistPath);
        dispatch(scanRomsSuccess(categoryName, datIndexes, items, appConfig));
      }
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
