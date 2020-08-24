import { AnyAction } from "redux";
import { GameItemState, createGameItemState } from "../../states/gameItemState";
import { FETCH_ALL_ITEMS } from "../../actions/fetchAllItems";
import { fetchAllItemsHandler } from "./fetchAllItemsHandler";
import { SEARCH } from "../../actions/search";
import { searchHandler } from "./searchHandler";
import {
  SET_THUMBNAIL_START,
  SET_THUMBNAIL_SUCCESS,
  SET_THUMBNAIL_ERROR,
} from "../../actions/setThumbnail";
import {
  setThumbnailStartHandler,
  setThumbnailSuccessHandler,
  setThumbnailErrorHandler,
} from "./setThumbnailHandler";
import { SCAN_MISSING_THUMBNAILS } from "../../actions/scanMissingThumbnails";
import { scanMissingThumbnailHandler } from "./scanMissingThumbnailHandler";
import {
  DOWNLOAD_THUMBNAIL_START,
  DOWNLOAD_THUMBNAIL_SUCCESS,
  DOWNLOAD_THUMBNAIL_ERROR,
} from "../../actions/downloadThumbnail";
import {
  downloadThumbnailStartHandler,
  downloadThumbnailSuccessHandler,
  downloadThumbnailErrorHandler,
} from "./downloadThumbnailHandler";
import { REMOVE_THUMBNAIL } from "../../actions/removeThumbnail";
import { removeThumbnailHandler } from "./removeThumbnailHandler";
import { SCAN_ROMS_SUCCESS } from "../../actions/scanRoms";
import { scanRomsSuccessHandler } from "./scanRomsHandler";
import {
  EXPORT_TO_EMULATION_STATION_START,
  EXPORT_TO_EMULATION_STATION_SUCCESS,
  EXPORT_TO_EMULATION_STATION_ERROR,
  EXPORT_TO_EMULATION_STATION_RESET,
} from "../../actions/exportToEmulationStation";
import {
  exportToEmulationStationStartHandler,
  exportToEmulationStationSuccessHandler,
  exportToEmulationStationErrorHandler,
  exportToEmulationStationResetHandler,
} from "./exportToEmulationStationHandler";

const gameItemReducer = (
  state: GameItemState = createGameItemState(),
  action: AnyAction
): GameItemState => {
  switch (action.type) {
    case FETCH_ALL_ITEMS:
      return fetchAllItemsHandler(state, action);
    case SEARCH:
      return searchHandler(state, action);

    case SCAN_MISSING_THUMBNAILS:
      return scanMissingThumbnailHandler(state, action);

    case DOWNLOAD_THUMBNAIL_START:
      return downloadThumbnailStartHandler(state, action);

    case DOWNLOAD_THUMBNAIL_SUCCESS:
      return downloadThumbnailSuccessHandler(state, action);

    case DOWNLOAD_THUMBNAIL_ERROR:
      return downloadThumbnailErrorHandler(state, action);

    case SET_THUMBNAIL_START:
      return setThumbnailStartHandler(state, action);

    case SET_THUMBNAIL_SUCCESS:
      return setThumbnailSuccessHandler(state, action);

    case SET_THUMBNAIL_ERROR:
      return setThumbnailErrorHandler(state, action);

    case REMOVE_THUMBNAIL:
      return removeThumbnailHandler(state, action);

    case SCAN_ROMS_SUCCESS:
      return scanRomsSuccessHandler(state, action);

    case EXPORT_TO_EMULATION_STATION_START:
      return exportToEmulationStationStartHandler(state, action);

    case EXPORT_TO_EMULATION_STATION_SUCCESS:
      return exportToEmulationStationSuccessHandler(state, action);

    case EXPORT_TO_EMULATION_STATION_ERROR:
      return exportToEmulationStationErrorHandler(state, action);

    case EXPORT_TO_EMULATION_STATION_RESET:
      return exportToEmulationStationResetHandler(state, action);

    default:
      return state;
  }
};
export default gameItemReducer;
