import { AppConfigState } from "../states/appConfigState";

export const FETCH_ALL_ITEMS = "FETCH_ALL_ITEMS";

export const fetchAllItems = (appConfig: AppConfigState) => {
  return {
    type: FETCH_ALL_ITEMS,
    appConfig,
  };
};
