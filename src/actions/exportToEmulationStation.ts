import { AppConfigState } from '../states/appConfigState';
import { ThumbnailType } from '../interfaces/ThumbnailType';

export const EXPORT_TO_EMULATION_STATION = "EXPORT_TO_EMULATION_STATION";

export const exportToEmulationStation = (romDist: string, imgDist: string, thumbnailType:ThumbnailType, appConfig:AppConfigState) => {
  return {
    type: EXPORT_TO_EMULATION_STATION,
    romDist,
    imgDist,
    thumbnailType,
    appConfig
  };
};
