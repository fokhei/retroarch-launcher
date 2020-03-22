import fs from "fs";
import * as path from "path";
import AppConfig, { DriverStatus, getRomFilter } from "./AppConfig";
import { DatIndexes } from "../parsers/datParsers";
import { createPlayListItem } from "./createPlayListItem";
import { ExportPlaylistResult, exportPlaylistFile } from "./exportPlaylistFile";

interface ExportFbaPlaylistFilesProps {
  config: AppConfig;
  category: string;
  indexes: DatIndexes;
  callback: (results: Array<ExportPlaylistResult>) => void;
}

const groups = [
  "Capcom",
  "SNK",
  "Midway",
  "Konami",
  "Namco",
  "Sega",
  "Taito",
  "IGS"
];

export const exportFbaPlaylistFiles = (props: ExportFbaPlaylistFilesProps) => {
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

            let lpl = "";
            if (Number(index.year) <= 1984) {
              lpl = "Classic";
            } else {
              for (let i = 0; i < groups.length; i++) {
                if (index.manufacturer.includes(groups[i])) {
                  lpl = groups[i];
                  break;
                }
              }
            }

            if (lpl == "") {
              lpl = "Misc";
            }

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
      let category = "FBA - " + key;
      results.push(exportPlaylistFile(config, category, items));
    });

    callback(results);
  });
};
