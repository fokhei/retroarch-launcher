import { AnyAction } from "redux";
import fs from "fs";
import * as path from "path";
import { FavourState, createFavourState } from "../../states/favourState";
import { FAVOUR_FILE_NAME } from "../../libs/constants";
import update from "immutability-helper";

export const fetchHandler = (
  state: FavourState = createFavourState(),
  action: AnyAction
): FavourState => {
  const favourPath = path.resolve(action.appDataDir, FAVOUR_FILE_NAME);
  let list = [];
  const fetch = {
    success: false,
    error: null,
  };

  if (fs.existsSync(favourPath)) {
    try {
      const text: string = fs.readFileSync(favourPath).toString();
      const json = JSON.parse(text);
      list = json.list;
      fetch.success = true;
    } catch (error) {
      fetch.error = "Error on parse favour file";
    }
  } else {
    fetch.success = true;
    fs.writeFileSync(favourPath, JSON.stringify({ list }));
  }

  return update(state, {
    list: { $set: list },
    fetch: { $set: fetch },
  });
};
