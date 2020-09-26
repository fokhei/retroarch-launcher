import fs from "fs";
import * as path from "path";
import { ExternalApp } from "../externalApps/ExternalApp";

export const FETCH_EXTERNAL_APPS = "FETCH_EXTERNAL_APPS";

export const fetchExternalApps = (appDataDir: string) => {
  let success = false;
  let error = null;
  let externalApps: Array<ExternalApp> = [];
  const filePath = path.resolve(appDataDir, "externalApps.json");
  if (!fs.existsSync(filePath)) {
    error = `File not found: ${filePath}`;
  } else {
    try {
      const text: string = fs.readFileSync(filePath).toString();
      const json: any = JSON.parse(text);
      externalApps = json.externalApps;
      success = true;
    } catch (e) {
      error = `Error on parse file: ${filePath}`;
    }
  }
  return {
    type: FETCH_EXTERNAL_APPS,
    success,
    error,
    externalApps,
  };
};
