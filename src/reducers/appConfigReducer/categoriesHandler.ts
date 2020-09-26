import {
  AppConfigState,
  createAppConfigState,
} from "../../states/appConfigState";
import { AnyAction } from "redux";

export const categoriesHandler = (
  state: AppConfigState = createAppConfigState(),
  action: AnyAction
): AppConfigState => {
  const { success, error, categories } = action;
  return Object.assign(
    { ...state },
    {
      categories,
      remotes: {
        categories: {
          success,
          error,
        },
      },
    }
  );
};
