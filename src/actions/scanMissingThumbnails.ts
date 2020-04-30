import { ComputedGameItem } from "../interfaces/ComputedGameItem";
import { AppConfigState } from "../states/appConfigState";

export const SCAN_MISSING_THUMBNAILS = "SCAN_MISSING_THUMBNAILS";

export const scanMissingThumbnails = (
  item: ComputedGameItem,
  appCOnfig: AppConfigState
) => {
  return {
    type: SCAN_MISSING_THUMBNAILS,
    item,
    appCOnfig,
  };
};
