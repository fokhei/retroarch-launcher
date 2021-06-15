import { AnyAction } from "redux";
import { ExplorerState, createExplorerState } from "../../states/explorerState";

import { SET_EXPLORER_CONFIG } from "../../actions/setExplorerConfig";
import { explorerConfigHandler } from "./explorerConfigHandler";

import { SET_PLAYER_PICKER } from "../../actions/setPlayerPicker";
import { setPlayerPickerHandler } from "./playerPickerHandler";

import { SEARCH } from "../../actions/search";
import { searchHandler } from "./searchHandler";

import { SHOW_ES_EXPORTER } from "../../actions/showESExporter";
import { esExporterHandler } from "./esExporterHandler";

import { SHOW_DIG_EXPORTER } from "../../actions/showDigExporter";
import { digExporterHandler } from "./digExporterHandler";

import { FETCH_UI_CONFIG } from "../../actions/fetchUI";
import { uiConfigHandler } from "./uiConfigHandler";

import { REMOVE_FROM_BOOKMARK, CLEAR_ALL_BOOKMARK } from "../../actions/bookmark";
import { bookmarkHandler } from "./bookmarkHandler";

const explorerReducer = (
  state: ExplorerState = createExplorerState(),
  action: AnyAction
): ExplorerState => {
  switch (action.type) {
    case SET_EXPLORER_CONFIG:
      return explorerConfigHandler(state, action);

    case SET_PLAYER_PICKER:
      return setPlayerPickerHandler(state, action);

    case SHOW_ES_EXPORTER:
      return esExporterHandler(state, action);

    case SHOW_DIG_EXPORTER:
      return digExporterHandler(state, action);

    case FETCH_UI_CONFIG:
      return uiConfigHandler(state, action);

    case SEARCH:
      return searchHandler(state, action);

    case REMOVE_FROM_BOOKMARK:
    case CLEAR_ALL_BOOKMARK:
      return bookmarkHandler(state, action);

    default:
      return state;
  }
};
export default explorerReducer;
