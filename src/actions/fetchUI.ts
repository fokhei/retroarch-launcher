import fs from "fs";
import * as path from "path";
import { UI_FILE_NAME } from "../libs/constants";
import { UIConfig, createUIConfig } from "../libs/uiConfig";

export const FETCH_UI_CONFIG = "FETCH_UI_CONFIG";

export const fetchUIConfig = (appDataDir: string) => {
  const uiPath = path.resolve(appDataDir, UI_FILE_NAME);

  let config: UIConfig = createUIConfig();
  if (fs.existsSync(uiPath)) {
    try {
      const text: string = fs.readFileSync(uiPath).toString();
      config = JSON.parse(text) as UIConfig;
    } catch (_error) {}
  } else {
    fs.writeFileSync(uiPath, JSON.stringify(config));
  }

  return {
    type: FETCH_UI_CONFIG,
    config,
  };
};
