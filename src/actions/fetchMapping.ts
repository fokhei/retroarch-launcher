import fs from "fs";
import * as path from "path";
import { AppConfigState } from "../states/appConfigState";
export const FETCH_MAPPING = "FETCH_MAPPING";

export const fetchMapping = (appConfig: AppConfigState) => {
  let success = false;
  let error = null;
  let teknoParrot: any = {};

  const filePath = path.resolve(appConfig.appDataDir, "mapping.json");
  if (!fs.existsSync(filePath)) {
    error = `File not found: ${filePath}`;
  } else {
    try {
      const text: string = fs.readFileSync(filePath).toString();
      const json = JSON.parse(text);

      if (json.hasOwnProperty("teknoParrot")) {
        teknoParrot = json.teknoParrot;
      }
      success = true;
    } catch (e) {
      error = `Error on parse file: ${filePath}`;
    }
  }
  return {
    type: FETCH_MAPPING,
    success,
    error,
    teknoParrot,
  };
};
