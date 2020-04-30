import lazy from "lazy.js";
import { Category } from "../interfaces/Category";
import { AppConfigState } from "../states/appConfigState";

export const getCategory = (
  appConfig: AppConfigState,
  categoryName: string
): Category => {
  return lazy(appConfig.categories).findWhere({ name: categoryName });
};
