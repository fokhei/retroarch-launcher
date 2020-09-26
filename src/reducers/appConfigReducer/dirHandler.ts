import {
  AppConfigState,
  createAppConfigState,
} from "../../states/appConfigState";
import { AnyAction } from "redux";

export const dirHandler = (
  state: AppConfigState = createAppConfigState(),
  action: AnyAction
): AppConfigState => {
  const { success, error, appDataDir, thumbnailPath, teknoParrotDir } = action;

  return Object.assign(
    { ...state },
    {
      appDataDir,
      thumbnailPath,
      teknoParrotDir,
      remotes: {
        dir: {
          success,
          error,
        },
      },
    }
  );
};
