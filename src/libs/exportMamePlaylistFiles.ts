import fs from "fs";
import * as path from "path";
import AppConfig, { DriverStatus, getRomFilter } from "./AppConfig";
import { DatIndexes } from "../parsers/datParsers";
import { createPlayListItem } from "./createPlayListItem";
import { ExportPlaylistResult, exportPlaylistFile } from "./exportPlaylistFile";

import { mameGroups } from "../mameGroups/";
import { serials } from "../mameGroups/serials";

interface ExportMamePlaylistFilesProps {
  config: AppConfig;
  category: string;
  indexes: DatIndexes;
  callback: (results: Array<ExportPlaylistResult>) => void;
}

const mameGroupKeys = Object.keys(mameGroups);
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

  let playlist: any = {};
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

          let lpl = "";
          if (serialKeys.includes(driver)) {
            lpl = serials[driver];
          } else {
            for (let i = 0; i < mameGroupKeys.length; i++) {
              const key = mameGroupKeys[i];
              const mameGroup = mameGroups[key];
              if (mameGroup.drivers.includes(driver)) {
                lpl = key;
                break;
              }
            }

            if (lpl == "") {
              if (index.diskName != "") {
                lpl = "CHD";
              }
            }

            if (lpl == "") {
              lpl = "Misc";
            }
          }

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
            if (!playlist.hasOwnProperty(lpl)) {
              playlist[lpl] = [item];
            } else {
              playlist[lpl].push(item);
            }
          }
        }
      }
    });

    let results: Array<ExportPlaylistResult> = [];
    Object.keys(playlist).map(key => {
      const items = playlist[key];
      let category = "MAME - " + key;
      results.push(exportPlaylistFile(config, category, items));
    });

    callback(results);
  });
};
