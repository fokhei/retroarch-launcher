import {
  AppConfigState,
  createAppConfigState,
} from "../../states/appConfigState";
import { AnyAction } from "redux";

export const dirHandler = (
  state: AppConfigState = createAppConfigState(),
  action: AnyAction
): AppConfigState => {
  const { success, error, appDataDir, thumbnailPath } = action;
  return Object.assign(
    { ...state },
    {
      appDataDir,
      thumbnailPath,
      remotes: {
        dir: {
          success,
          error,
        },
      },
    }
  );
};
