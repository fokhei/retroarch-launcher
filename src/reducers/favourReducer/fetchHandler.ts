import { AnyAction } from "redux";
import fs from "fs";
import * as path from "path";
import { FavourState, createFavourState } from "../../states/favourState";
import { FAVOUR_FILE_NAME } from "../../libs/constants";

export const fetchHandler = (
  state: FavourState = createFavourState(),
  action: AnyAction
): FavourState => {
  const favourPath = path.resolve(action.appDataDir, FAVOUR_FILE_NAME);
  let next: FavourState = { ...state };
  const fetch = {
    success: false,
    error: null,
  };

  if (fs.existsSync(favourPath)) {
    try {
      const text: string = fs.readFileSync(favourPath).toString();
      const json = JSON.parse(text);
      fetch.success = true;
      next = Object.assign(state, json, { fetch });
    } catch (error) {
      fetch.error = "Error on parse favour file";
    }
  } else {
    fetch.success = true;
    fs.writeFileSync(favourPath, JSON.stringify({ list: next.list }));
  }

  return next;
};
