import { AnyAction } from "redux";
import { GameItemState, createGameItemState } from "../../states/gameItemState";
import fs from "fs";
import * as path from "path";
import { AppConfigState } from "../../states/appConfigState";
import { ThumbnailType } from "../../interfaces/ThumbnailType";
import { getThumbnailInfo } from "../../libs/getThumbnailInfo";
const fsExtra = require("fs-extra");

export const exportToEmulationStationHandler = (
  state: GameItemState = createGameItemState(),
  action: AnyAction
): GameItemState => {
  const romDist = action.romDist as string;
  const imgDist = action.imgDist as string;
  const thumbnailType = action.thumbnailType as ThumbnailType;
  const appConfig = action.appConfig as AppConfigState;

  const { itemFilter, searchResults } = state;
  const { categoryName } = itemFilter;

  const romDistPath = path.resolve(romDist, categoryName);
  const imgDistPath = path.resolve(imgDist, categoryName);

  if (!fs.existsSync(romDistPath)) {
    fs.mkdirSync(romDistPath);
  }
  if (!fs.existsSync(imgDistPath)) {
    fs.mkdirSync(imgDistPath);
  }

  let xml = "";
  searchResults.map((gameItem) => {
    const romBasename = path.basename(gameItem.romPath);
    fsExtra.copySync(gameItem.romPath, path.resolve(romDistPath, romBasename));

    const thumbnailInfo = getThumbnailInfo(gameItem, thumbnailType, appConfig);
    const imgBaseName = path.basename(thumbnailInfo.local);
    fsExtra.copySync(
      thumbnailInfo.local,
      path.resolve(imgDistPath, imgBaseName)
    );

    xml += `
    <game>
        <path>./${romBasename}</path>
        <name>${gameItem.gameName}</name>
        <image>${categoryName}/${imgBaseName}</image>
    </game>
    `;
  });

  xml = `<?xml version="1.0"?>
  <gameList>
    ${xml}
  </gameList>`;
  //console.log(xml)
  const xmlDist = path.resolve(romDistPath, "gamelist.xml");
  fs.writeFileSync(xmlDist, xml);
  return state;
};
