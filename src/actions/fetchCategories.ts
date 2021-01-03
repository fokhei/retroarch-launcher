import fs from "fs";
import * as path from "path";
import { Category } from "../interfaces/Category";
const scanSync = require("scan-dir-recursive/sync");

export const FETCH_CATEGORIES = "FETCH_CATEGORIES";

export const fetchCategories = (appDataDir: string) => {
  let success = false;
  let error = null;
  let categories: Array<Category> = [];

  const categoriesPath = path.resolve(appDataDir, "categories");
  let files = scanSync(categoriesPath);
  files = files.filter((file) => {
    const ext = path.extname(file);
    return ext == ".json";
  });

  files.map((file) => {
    const text: string = fs.readFileSync(file).toString();
    try {
      const json = JSON.parse(text);
      json.category.subCategoriesMap = {};
      if (json.category.hasOwnProperty("subCategories")) {
        json.category.subCategories.map((subCat) => {
          json.category.subCategoriesMap[subCat.name] = subCat;
        });
      }

      categories.push(json.category);
    } catch (err) {
      error = `Error on parse file: ${file}`;
    }
  });

  success = true;

  return {
    type: FETCH_CATEGORIES,
    success,
    error,
    categories,
  };
};
