import fs from "fs";
import * as path from "path";
import { Category } from "../interfaces/Category";

export const FETCH_CATEGORIES = "FETCH_CATEGORIES";

export const fetchCategories = (appDataDir: string) => {
  let success = false;
  let error = null;
  let categories: Array<Category> = [];

  const filePath = path.resolve(appDataDir, "categories.json");
  if (!fs.existsSync(filePath)) {
    error = `File not found: ${filePath}`;
  } else {
    try {
      const text: string = fs.readFileSync(filePath).toString();
      // eval("categories=" + text);
      const json = JSON.parse(text);
      categories = json.categories;
      success = true;
    } catch (error) {
      error = `Error on parse file: ${filePath}`;
    }
  }

  return {
    type: FETCH_CATEGORIES,
    success,
    error,
    categories,
  };
};
