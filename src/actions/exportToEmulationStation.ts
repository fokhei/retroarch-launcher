import fs from "fs";
import * as path from "path";
import { AppConfigState } from "../states/appConfigState";
import { ThumbnailType } from "../interfaces/ThumbnailType";
import { getThumbnailInfo } from "../libs/getThumbnailInfo";
import { GameItemState } from "../states/gameItemState";
const fsExtra = require("fs-extra");

export const EXPORT_TO_EMULATION_STATION_START =
  "EXPORT_TO_EMULATION_STATION_START";
export const EXPORT_TO_EMULATION_STATION_SUCCESS =
  "EXPORT_TO_EMULATION_STATION_SUCCESS";
export const EXPORT_TO_EMULATION_STATION_ERROR =
  "EXPORT_TO_EMULATION_STATION_FAIL";
export const EXPORT_TO_EMULATION_STATION_RESET =
  "EXPORT_TO_EMULATION_STATION_RESET";

export const exportToEmulationStation = (
  distination: string,
  exportFiles: boolean,
  exportThumbnails: boolean,
  thumbnailType: ThumbnailType,
  appConfig: AppConfigState,
  gameItem: GameItemState
) => {
  return (dispatch) => {
    dispatch(exportToEmulationStationStart());

    const { searchResults } = gameItem;
    const imgDist = path.resolve(distination, "thumbnails");


    setTimeout(() => {
      try {

        if (exportThumbnails) {
          if (!fs.existsSync(imgDist)) {
            fs.mkdirSync(imgDist);
          }
        }


        let xml = "";

        searchResults.sort();

        searchResults.map((gameItem) => {
          const romBasename = path.basename(gameItem.romPath);

          if (exportFiles) {
            const filePath = path.resolve(distination, romBasename);
            if (!fs.existsSync(filePath)) {
              fsExtra.copySync(gameItem.romPath, filePath);
            }
          }

          const thumbnailInfo = getThumbnailInfo(
            gameItem,
            thumbnailType,
            appConfig
          );
          const imgBaseName = path.basename(thumbnailInfo.local);
          if (exportThumbnails) {
            const imgPath = path.resolve(imgDist, imgBaseName);
            if (!fs.existsSync(imgPath)) {
              fsExtra.copySync(thumbnailInfo.local, imgPath);
            }
          }

          xml += `
        <game>
            <path>./${romBasename}</path>
            <name>${gameItem.gameName}</name>`;
          if (exportThumbnails) {
            xml += `
            <image>./thumbnails/${imgBaseName}</image>`;
          }

          xml += `
        </game>
        `;
        });

        xml = `<?xml version="1.0"?>
  <gameList>
    ${xml}
  </gameList>`;
        const xmlDist = path.resolve(distination, "gamelist.xml");
        fs.writeFileSync(xmlDist, xml);
        dispatch(exportToEmulationStationSuccess());
      } catch (error) {
        dispatch(exportToEmulationStationError(error));
      }
    });
  };
};

export const exportToEmulationStationStart = () => {
  return {
    type: EXPORT_TO_EMULATION_STATION_START,
  };
};

export const exportToEmulationStationSuccess = () => {
  return {
    type: EXPORT_TO_EMULATION_STATION_SUCCESS,
  };
};

export const exportToEmulationStationError = (error: any) => {
  return {
    type: EXPORT_TO_EMULATION_STATION_ERROR,
    error,
  };
};

export const exportToEmulationStationReset = () => {
  return {
    type: EXPORT_TO_EMULATION_STATION_RESET,
  };
};
