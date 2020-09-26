import fs from "fs";
import * as path from "path";
export const FETCH_DIR = "FETCH_DIR";

export const fetchDir = () => {
  let success = false;
  let error = null;
  let appDataDir = "";
  let thumbnailPath = "";
  let teknoParrotDir = "";
  const filePath = path.resolve("dir.json");
  if (!fs.existsSync(filePath)) {
    error = `File not found: ${filePath}`;
  } else {
    try {
      const text: string = fs.readFileSync(filePath).toString();
      const json: any = JSON.parse(text);
      appDataDir = json.appDataDir;
      thumbnailPath = json.thumbnailPath;
      teknoParrotDir = json.teknoParrotDir;
      success = true;
    } catch (e) {
      error = `Error on parse file: ${filePath}`;
    }
  }
  return {
    type: FETCH_DIR,
    success,
    error,
    appDataDir,
    thumbnailPath,
    teknoParrotDir
  };
};
