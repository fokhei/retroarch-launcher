import {
  AppConfigState,
  createAppConfigState,
} from "../../states/appConfigState";
import { AnyAction } from "redux";

export const externalAppsHandler = (
  state: AppConfigState = createAppConfigState(),
  action: AnyAction
): AppConfigState => {
  const { success, error, externalApps } = action;
  return Object.assign(
    { ...state },
    {
      externalApps,
      remotes: {
        externalApps: {
          success,
          error,
        },
      },
    }
  );
};
