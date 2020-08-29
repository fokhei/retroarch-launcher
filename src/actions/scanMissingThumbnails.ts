import { ComputedGameItem } from "../interfaces/ComputedGameItem";
import { AppConfigState } from "../states/appConfigState";

export const SCAN_MISSING_THUMBNAILS = "SCAN_MISSING_THUMBNAILS";

export const scanMissingThumbnails = (
  items: Array<ComputedGameItem>,
  appConfig: AppConfigState
) => {
  return {
    type: SCAN_MISSING_THUMBNAILS,
    items,
    appConfig,
  };
};
