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
  romDist: string,
  thumbnailType: ThumbnailType,
  appConfig: AppConfigState,
  gameItem: GameItemState
) => {
  return (dispatch) => {
    dispatch(exportToEmulationStationStart());

    const { searchResults } = gameItem;
    const imgDist = path.resolve(romDist, "thumbnails");

    if (!fs.existsSync(imgDist)) {
      fs.mkdirSync(imgDist);
    }

    setTimeout(() => {
      try {
        let xml = "";

        searchResults.map((gameItem) => {
          const romBasename = path.basename(gameItem.romPath);
          fsExtra.copySync(
            gameItem.romPath,
            path.resolve(romDist, romBasename)
          );

          const thumbnailInfo = getThumbnailInfo(
            gameItem,
            thumbnailType,
            appConfig
          );
          const imgBaseName = path.basename(thumbnailInfo.local);
          fsExtra.copySync(
            thumbnailInfo.local,
            path.resolve(imgDist, imgBaseName)
          );

          xml += `
        <game>
            <path>./${romBasename}</path>
            <name>${gameItem.gameName}</name>
            <image>./thumbnails/${imgBaseName}</image>
        </game>
        `;
        });

        xml = `<?xml version="1.0"?>
        <gameList>
          ${xml}
        </gameList>`;
        const xmlDist = path.resolve(romDist, "gamelist.xml");
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
