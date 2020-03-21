import fs from "fs";
import * as path from "path";
import AppConfig, { DriverStatus, getRomFilter } from "./AppConfig";
import { DatIndexes } from "../parsers/datParsers";
import { createPlayListItem } from "./createPlayListItem";
import { ExportPlaylistResult, exportPlaylistFile } from "./exportPlaylistFile";

import { serials } from "../mameGroups/serials";
import { classics } from "../mameGroups/classics";
import { gamble } from "../mameGroups/gamble";
import { mahjong } from "../mameGroups/mahjong";
import { sexy } from "../mameGroups/sexy";

interface ExportMamePlaylistFilesProps {
  config: AppConfig;
  category: string;
  indexes: DatIndexes;
  callback: (results: Array<ExportPlaylistResult>) => void;
}

const serialKeys = Object.keys(serials);

export const exportMamePlaylistFiles = (
  props: ExportMamePlaylistFilesProps
) => {
  const { config, category, indexes, callback } = props;
  const platform = config.platforms[category];
  const { romsPath } = platform;
  const includeStatus = getRomFilter(platform, "includeStatus") as Array<
    DriverStatus
  >;
  // const incldueMinYear = getRomFilter(platform, "incldueMinYear") as number;
  let playlists: any = {};
  fs.readdir(romsPath, (err: any, files: Array<string>) => {
    if (err) {
      throw err;
    }
    files.map((fileOrDirName: string) => {
      const stats = fs.lstatSync(path.resolve(romsPath, fileOrDirName));
      if (!stats.isDirectory()) {
        const romName = fileOrDirName;
        if (indexes.hasOwnProperty(romName)) {
          const romPath = path.resolve(romsPath, romName);
          const index = indexes[romName];
          let driver = index.sourcefile.replace(".cpp", "");

          let lpl = "Misc";
          if (serialKeys.includes(driver)) {
            lpl = serials[driver];
          } else {
            if (classics.includes(driver)) {
              lpl = "Cassics";
            } else if (gamble.includes(driver)) {
              lpl = "Gamble";
            } else if (mahjong.includes(driver)) {
              lpl = "MahJong";
            } else if (sexy.includes(driver)) {
              lpl = "Sexy";
            } else if (index.diskName != "") {
              lpl = "CHD";
            }
          }

          // let cpp = "misc";

          // if (sourcefiles.includes(index.sourcefile)) {
          //   cpp = index.sourcefile;
          //   shouldExport = true;
          // } else {
          // let diskExist = true;
          // if (index.diskName != "") {
          // lpl = "CHD";
          // const diskPath = path.resolve(
          //   romsPath,
          //   romName.replace(".zip", ""),
          //   index.diskName + ".chd"
          // );
          // diskExist = fs.existsSync(diskPath);
          // diskExist = true;
          // }
          // if (diskExist) {
          // if (
          //   includeStatus &&
          //   includeStatus.includes(index.driverStatus as DriverStatus)
          // ) {
          //   const gameYear = Number(index.year);
          //   if (!isNaN(gameYear) && gameYear >= incldueMinYear) {
          //     shouldExport = true;
          //   }
          // }
          // shouldExport = true;
          // }
          // }

          let shouldExport = true;
          if (includeStatus) {
            if (!includeStatus.includes(index.driverStatus as DriverStatus)) {
              shouldExport = false;
            }
          }

          if (shouldExport) {
            const item = createPlayListItem(
              config,
              category,
              romPath,
              index.gameName
            );
            if (!playlists.hasOwnProperty(lpl)) {
              playlists[lpl] = [item];
            } else {
              playlists[lpl].push(item);
            }
          }
        }
      }
    });

    let results: Array<ExportPlaylistResult> = [];
    Object.keys(playlists).map(lpl => {
      const items = playlists[lpl];
      let category = "MAME - " + lpl;
      results.push(exportPlaylistFile(config, category, items));
    });

    callback(results);
  });
};
