import {
  AppConfigState,
  createAppConfigState,
} from "../../states/appConfigState";
import { AnyAction } from "redux";
import fs from "fs";
import { ipcRenderer } from 'electron';
import { AppEvent } from '../../interfaces/AppEvent';

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
    ipcRenderer.sendSync(AppEvent.SET_APP_CONFIG, config);


  } catch (error) {
    fetch.error = "Error on parse appConfig";
  }



  return Object.assign(state, config, { fetch });
};
