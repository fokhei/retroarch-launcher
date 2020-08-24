import { AnyAction } from "redux";
import update from "immutability-helper";
import { GameItemState, createGameItemState } from "../../states/gameItemState";
import fs from "fs";
import * as path from "path";
import { Playlist } from "../../interfaces/PlayList";
import { createComputedGameItem } from "../../libs/createComputedItem";
import { ComputedGameItem } from "../../interfaces/ComputedGameItem";
import { getCategory } from "../../libs/getCategory";
import lazy from "lazy.js";
import { GAME_LIST_DIR_NAME } from '../../libs/constants';

let _id = 0;

export const fetchAllItemsHandler = (
  state: GameItemState = createGameItemState(),
  action: AnyAction
): GameItemState => {
  let items: Array<ComputedGameItem> = [];
  let itemsMap = {};
  let subCategories = {};

  const { appConfig } = action;
  const { appDataDir } = appConfig;

  if (!fs.existsSync(appDataDir)) {
    fs.mkdirSync(appDataDir);
  }


  const gamelistPath = path.resolve(appDataDir, GAME_LIST_DIR_NAME);
  if (!fs.existsSync(gamelistPath)) {
    fs.mkdirSync(gamelistPath);
  }

  const files = fs.readdirSync(gamelistPath);
  files.map((file: string) => {
    const ext = path.extname(file);
    if (ext == ".json") {
      const text: any = fs.readFileSync(path.resolve(gamelistPath, file));
      const playlist = JSON.parse(text) as Playlist;
      const categoryName = file.replace(ext, "");
      const category = getCategory(appConfig, categoryName);
      playlist.items.map((item) => {
        const id = ++_id;
        const computedItem = createComputedGameItem(
          item,
          id,
          category,
          action.appConfig
        );
        items.push(computedItem);
        itemsMap[computedItem.id.toString()] = computedItem;

        if (item.subCategoryName != "") {
          if (subCategories.hasOwnProperty(categoryName)) {
            const subCat = subCategories[categoryName];
            if (!subCat.includes(item.subCategoryName)) {
              subCat.push(item.subCategoryName);
            }
          } else {
            subCategories[categoryName] = [item.subCategoryName];
          }
        }
      });
    }
  });

  Object.keys(subCategories).map((key) => {
    const subCat = subCategories[key];
    subCategories[key] = lazy(subCat).sort().toArray();
  });

  return update(state, {
    _id: { $set: _id },
    items: { $set: items },
    itemsMap: { $set: itemsMap },
    subCategories: { $set: subCategories },
    fetch: {
      success: {
        $set: true,
      },
    },
  });
};
