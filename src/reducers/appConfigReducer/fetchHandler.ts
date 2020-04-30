import {
  AppConfigState,
  createAppConfigState,
} from "../../states/appConfigState";
import { AnyAction } from "redux";
import fs from "fs";

export const fetchHandler = (
  state: AppConfigState | any = createAppConfigState(),
  _action: AnyAction
): AppConfigState => {
  const configPath = "./config.js";
  let config: any;
  let fetch: any = {
    success: false,
    error: null,
  };

  try {
    const text: string = fs.readFileSync(configPath).toString();
    eval("config=" + text);
    fetch.success = true;
  } catch (error) {
    fetch.error = error;
  }

  return Object.assign(state, config, { fetch });
};
