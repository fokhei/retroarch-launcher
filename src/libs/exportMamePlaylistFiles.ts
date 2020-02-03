import fs from "fs";
import * as path from "path";
import AppConfig, { getPlatformOptions, DriverStatus } from "./AppConfig";
import { DatIndexes } from "../parsers/datParsers";
import { createPlayListItem } from "./createPlayListItem";
import { ExportPlaylistResult, exportPlaylistFile } from "./exportPlaylistFile";

interface ExportMamePlaylistFilesProps {
  config: AppConfig;
  category: string;
  indexes: DatIndexes;
  callback: (results: Array<ExportPlaylistResult>) => void;
}

const lpls = {
  "cps1.cpp": "Capcom - CP System I",
  "cps2.cpp": "Capcom - CP System II",
  "cps3.cpp": "Capcom - CP System III",
  "pgm.cpp": "PGM",
  "namcos12.cpp": "Namco - System12",
  "namcos22.cpp": "Namco - System22",
  "model2.cpp": "Sega - Model2",
  "model3.cpp": "Sega - Model3",
  "stv.cpp": "Sega - STV",
  "neogeo.cpp": "SNK - Neo Geo",
  "zn.cpp": "Sony - ZN1 - ZN2",
  //"model1.cpp": "Sega - Model1",
  //"ddenlovr.cpp": "Dynax",
  //"expro02.cpp": "Kaneko - EXPRO02",
  //"eolith.cpp": "Eolith",
  //"midtunit.cpp": "Midway - T unit system",
  //"paradise.cpp": "Paradise",
  //"peplus.cpp" : "Players Edge Plus",
  //"gaelco3d.cpp": "Gaelco 3D",
  //"m72.cpp" : "Irem M-72",
  //"m92.cpp" : "Irem M-92",
  //"itech32.cpp": "Itech32",
  //"ksys573.cpp": "Konami System573",
  //"mitchell.cpp" : "Mitchell",
  //"namcos1.cpp": "Namco S1",
  //"namcos2.cpp": "Namco S2",
  //"nmk16.cpp": "NMK 16",
  //"segas16b.cpp": "Sega System 16",
  //"segas18.cpp": "Sega System 18",
  //"system1.cpp": "Sega System 1",
  //"segas24.cpp": "Sega System 24",
  //"segas32.cpp": "Sega System 32",
  //"segac2.cpp": "Sega System C-2",
  //"seta.cpp": "Seta1",
  //"taito_f2.cpp": "Taito F2",
  //"taito_f3.cpp" : "Taito F3",
  //"toaplan2.cpp": "Toaplan",
  //"triforce.cpp" : "Triforce",
  // "williams.cpp": "Williams",
  chd: "MAME - CHD",
  misc: "MAME"
};

const sourcefiles = Object.keys(lpls);

export const exportMamePlaylistFiles = (
  props: ExportMamePlaylistFilesProps
) => {
  const { config, category, indexes, callback } = props;
  const platform = config.platforms[category];
  const { romsPath } = platform;
  const exportStatus = getPlatformOptions(platform, "exportStatus") as Array<
    DriverStatus
  >;
  const exportYear = getPlatformOptions(platform, "exportYear") as number;
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
          let key = "misc";
          let shouldExport = false;
          if (sourcefiles.includes(index.sourcefile)) {
            key = index.sourcefile;
            shouldExport = true;
          } else {
            let diskExist = true;
            if (index.diskName != "") {
              key = "chd";
              const diskPath = path.resolve(
                romsPath,
                romName,
                index.diskName + ".chd"
              );
              diskExist = fs.existsSync(diskPath);
            }
            if (diskExist) {
              if (exportStatus.includes(index.driverStatus as DriverStatus)) {
                const gameYear = Number(index.year);
                if (gameYear >= exportYear) {
                  shouldExport = true;
                }
              }
            }
          }

          if (shouldExport) {
            const item = createPlayListItem(
              config,
              category,
              romPath,
              index.gameName
            );
            // let item = {
            //   path: romPath,
            //   label: index.gameName,
            //   core_path: dllPath,
            //   core_name: core,
            //   crc32: "00000000|crc",
            //   db_name: db
            // };

            if (!playlists.hasOwnProperty(key)) {
              playlists[key] = [item];
            } else {
              playlists[key].push(item);
            }
          }
        }
      }
    });
    let results: Array<ExportPlaylistResult> = [];
    Object.keys(playlists).map(key => {
      const items = playlists[key];
      const subCategory = lpls[key];
      results.push(exportPlaylistFile(config, subCategory, items));
    });
    callback(results);
  });
};
