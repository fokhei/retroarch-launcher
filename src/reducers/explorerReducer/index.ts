import { AnyAction } from "redux";
import { ExplorerState, createExplorerState } from "../../states/explorerState";

import { SET_LAYOUT } from "../../actions/setLayout";
import { setLayoutHandler } from "./layoutHandler";

import { SET_THUMBNAIL_TYPE } from "../../actions/setThumbnailType";
import { setThumbnailTypeHandler } from "./thumbnailTypeHandler";

import { SET_GRID_SIZE } from "../../actions/setGridSize";
import { setGridSizeHandler } from "./gridSizeHandler";

import { SET_ITEM_ID } from "../../actions/setItemId";
import { setItemIdHandler } from "./itemIdHandler";

import { SET_PLAYER_PICKER } from "../../actions/setPlayerPicker";
import { setPlayerPickerHandler } from "./playerPickerHandler";

import { SEARCH } from "../../actions/search";
import { searchHandler } from "./searchHandler";

import { SHOW_ES_EXPORTER } from "../../actions/showESExporter";
import { esExporterHandler } from "./esExporterHandler";

const explorerReducer = (
  state: ExplorerState | any = createExplorerState(),
  action: AnyAction
): ExplorerState => {
  switch (action.type) {
    case SET_LAYOUT:
      return setLayoutHandler(state, action);
    case SET_THUMBNAIL_TYPE:
      return setThumbnailTypeHandler(state, action);
    case SET_GRID_SIZE:
      return setGridSizeHandler(state, action);
    case SET_ITEM_ID:
      return setItemIdHandler(state, action);
    case SET_PLAYER_PICKER:
      return setPlayerPickerHandler(state, action);
    case SEARCH:
      return searchHandler(state, action);
    case SHOW_ES_EXPORTER:
      return esExporterHandler(state, action);

    default:
      return state;
  }
};
export default explorerReducer;
