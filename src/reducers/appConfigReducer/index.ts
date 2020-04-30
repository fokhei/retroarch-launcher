import { AnyAction } from "redux";
import {
  AppConfigState,
  createAppConfigState,
} from "../../states/appConfigState";
import { FETCH_APP_CONFIG } from "../../actions/fetchAppConfig";
import { fetchHandler } from "./fetchHandler";

const appConfigReducer = (
  state: AppConfigState | any = createAppConfigState(),
  action: AnyAction
): AppConfigState => {
  switch (action.type) {
    case FETCH_APP_CONFIG:
      return fetchHandler(state, action);

    default:
      return state;
  }
};
export default appConfigReducer;
