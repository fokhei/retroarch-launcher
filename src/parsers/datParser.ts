import fs from "fs";
import parse from "csv-parse";
import { DatParsers } from "../interfaces/DatParsers";
import { ParserType } from "../interfaces/NameParserType";
import { Category } from "../interfaces/Category";
import { DatIndexes } from "../interfaces/DatIndexes";
import { removeAllBrackets } from "../nameFilters/removeAllBrackets";
import { getRomFilter } from "../libs/getRomFilter";
import { getDatPath } from "../libs/getDatPath";
import { readXmlAsJs } from "../libs/readXmlAsJs";
import { DriverStatus } from "../interfaces/DriverStatus";

const datParsers: DatParsers = {
  [ParserType.NO_INTRO_3DS]: (category: Category, datIndexes: DatIndexes) => {
    const datPath = getDatPath(category);
    const js = readXmlAsJs(datPath);
    js.datafile.game.map((game) => {
      if (game.hasOwnProperty("game_id")) {
        const attrs = game._attributes;
        const { name } = attrs;
        const isbios = name.startsWith("[BIOS]");
        if (!isbios) {
          const id = game.game_id._text;
          const gameName = name;
          datIndexes[id] = {
            id,
            gameName,
          };
        }
      }
    });
    return datIndexes;
  },
  [ParserType.NO_PAY_STATION_PSV_TSV]: (
    category: Category,
    datIndexes: DatIndexes
  ) => {
    const datPath = getDatPath(category);
    const txt = fs.readFileSync(datPath, "utf8");
    const parser = parse(txt, {
      delimiter: "	",
      skip_empty_lines: true,
    });
    let record: any;
    while ((record = parser.read())) {
      const id = record[0];
      const region = record[1];
      const fileName = record[2];
      const gameName = removeAllBrackets(fileName) + ` (${region})`;
      datIndexes[id] = {
        id,
        gameName,
      };
    }
    return datIndexes;
  },
  [ParserType.FBA]: (category: Category, datIndexes: DatIndexes) => {
    const datPath = getDatPath(category);
    const includeStatus = getRomFilter(category, "includeStatus") as Array<
      DriverStatus
    >;

    const js = readXmlAsJs(datPath);
    const games = js.datafile.game;
    const { length } = games;
    for (let i = 0; i < length; i++) {
      const game = games[i];
      const attrs = game._attributes;
      const { name, isbios } = attrs;

      if (isbios) {
        continue;
      }

      if (!game.hasOwnProperty("driver")) {
        continue;
      }

      // if (attrs.hasOwnProperty("cloneof")) {
      //   continue;
      // }

      if (includeStatus) {
        const driverStatus = game.driver._attributes.status;
        if (!includeStatus.includes(driverStatus)) {
          continue;
        }
      }

      let manufacturer = "";
      if (game.hasOwnProperty("manufacturer")) {
        manufacturer = game.manufacturer._text;
      }

      const id = name + ".zip";
      const gameName = game.description._text;
      const driverStatus = game.driver._attributes.status;
      const year = game.year._text.substr(0, 4);
      let cloneOf = "";
      if (attrs.hasOwnProperty("cloneof")) {
        cloneOf = attrs.cloneof;
      }

      datIndexes[id] = {
        id,
        gameName,
        manufacturer,
        driverStatus,
        year,
        cloneOf,
      };
    }
    return datIndexes;
  },

  [ParserType.MAME]: (category: Category, datIndexes: DatIndexes) => {
    const datPath = getDatPath(category);
    const excludeRomOfs = getRomFilter(category, "excludeRomOfs") as Array<
      string
    >;
    const includeRomOfs = getRomFilter(category, "includeRomOfs") as Array<
      string
    >;

    const js = readXmlAsJs(datPath);
    const games = js.datafile.machine;
    const { length } = games;
    for (let i = 0; i < length; i++) {
      const game = games[i];
      const attrs = game._attributes;
      const {
        name,
        isbios,
        isdevice,
        runnable,
        ismechanical,
        romof,
        sourcefile,
      } = attrs;

      if (isdevice || isbios || ismechanical || runnable) {
        continue;
      }

      if (excludeRomOfs && excludeRomOfs.length) {
        if (excludeRomOfs.includes(romof)) {
          continue;
        }
      }

      if (includeRomOfs && includeRomOfs.length) {
        if (!includeRomOfs.includes(romof)) {
          continue;
        }
      }

      let diskName = "";
      if (game.hasOwnProperty("disk")) {
        const disk = game.disk;
        if (disk.hasOwnProperty("_attributes")) {
          const diskAttrs = game.disk._attributes;
          if (diskAttrs.hasOwnProperty("name")) {
            diskName = diskAttrs.name;
            // console.log(label, "|", name, "|", diskName);
          }
        }
      }

      if (game.hasOwnProperty("driver")) {
        const driverStatus = game.driver._attributes.status;
        const gameName = game.description._text;
        const id = name + ".zip";
        const year = game.year._text.substr(0, 4);

        let manufacturer = "";
        if (game.hasOwnProperty("manufacturer")) {
          manufacturer = game.manufacturer._text;
        }

        let cloneOf = "";
        if (attrs.hasOwnProperty("cloneof")) {
          cloneOf = attrs.cloneof;
        }

        datIndexes[id] = {
          id,
          gameName,
          sourcefile,
          driverStatus,
          diskName,
          year,
          manufacturer,
          cloneOf
        };
      }
    }

    return datIndexes;
  },

  [ParserType.M2_EMULATOR]: (category: Category, datIndexes: DatIndexes) => {
    const datPath = getDatPath(category);
    const js = readXmlAsJs(datPath);
    const games = js.datafile.game;
    const { length } = games;
    for (let i = 0; i < length; i++) {
      const game = games[i];
      const attrs = game._attributes;
      const { isbios, name } = attrs;
      const id = name + ".zip";
      if (isbios) {
        continue;
      }
      const gameName = game.description._text;
      datIndexes[id] = {
        id,
        gameName,
      };
    }
    return datIndexes;
  },

  [ParserType.SUPER_MODEL]: (category: Category, datIndexes: DatIndexes) => {
    const datPath = getDatPath(category);
    const js = readXmlAsJs(datPath);
    const games = js.games.game;
    const { length } = games;
    for (let i = 0; i < length; i++) {
      const game = games[i];
      const attrs = game._attributes;
      const { name } = attrs;
      const id = name + ".zip";
      let gameName = game.identity.title._text;
      if (game.identity.hasOwnProperty("version")) {
        gameName += ` (${game.identity.version._text})`;
      }
      datIndexes[id] = {
        id,
        gameName,
      };
    }
    return datIndexes;
  },
};

export default datParsers;
