import { AnyAction } from "redux";
import {
  AppConfigState,
  createAppConfigState,
} from "../../states/appConfigState";
import { FETCH_DIR } from "../../actions/fetchDir";
import { FETCH_EXTERNAL_APPS } from "../../actions/fetchExternalApps";
import { FETCH_CATEGORIES } from "../../actions/fetchCategories";
import { categoriesHandler } from "./categoriesHandler";
import { dirHandler } from "./dirHandler";
import { externalAppsHandler } from "./externalAppsHandler";

const appConfigReducer = (
  state: AppConfigState = createAppConfigState(),
  action: AnyAction
): AppConfigState => {
  switch (action.type) {
    case FETCH_DIR:
      return dirHandler(state, action);
    case FETCH_EXTERNAL_APPS:
      return externalAppsHandler(state, action);
    case FETCH_CATEGORIES:
      return categoriesHandler(state, action);
    default:
      return state;
  }
};
export default appConfigReducer;
