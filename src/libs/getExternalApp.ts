import { ExternalApp } from "../externalApps/ExternalApp";
import lazy from "lazy.js";
import { AppConfigState } from "../states/appConfigState";

export const getExternalApp = (
  appConfig: AppConfigState,
  type: string
): ExternalApp => {
  return lazy(appConfig.externalApps).findWhere({ type: type });
};
