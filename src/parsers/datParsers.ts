import fs from "fs";
import parse from "csv-parse";
import { ParserType } from "./Parser";
import readXmlAsJs from "../libs/readXmlAsJs";
import { Platform, getPlatformOptions, DriverStatus } from "../libs/AppConfig";

export interface DatIndex {
  id: string;
  gameName: string;
}

export interface DatIndexes {
  [key: string]: DatIndex;
}

interface DatParsers {
  [key: string]: (props: DatParsersProps) => DatIndexes;
}

interface DatParsersProps {
  platform: Platform;
  indexes: DatIndexes;
}

const datParsers: DatParsers = {
  [ParserType.noIntro3ds]: (props: DatParsersProps) => {
    const { platform, indexes } = props;
    const datPath = getPlatformOptions(platform, "datPath") as string;
    const js = readXmlAsJs(datPath);
    js.datafile.game.map(game => {
      if (game.hasOwnProperty("game_id")) {
        const attrs = game._attributes;
        const { name } = attrs;
        const isbios = name.startsWith("[BIOS]");
        if (!isbios) {
          const id = game.game_id._text;
          const gameName = name;
          indexes[id] = {
            id,
            gameName
          };
        }
      }
    });
    return indexes;
  },
  [ParserType.noPayStationPsvTsv]: (props: DatParsersProps) => {
    const { platform, indexes } = props;
    const datPath = getPlatformOptions(platform, "datPath") as string;
    const txt = fs.readFileSync(datPath, "utf8");
    const parser = parse(txt, {
      delimiter: "	",
      skip_empty_lines: true
    });
    let record: any;
    while ((record = parser.read())) {
      const id = record[0];
      // const region = record[1];
      const gameName = record[2];
      indexes[id] = {
        id,
        gameName
      };
    }
    return indexes;
  },
  [ParserType.fba]: (props: DatParsersProps) => {
    const { platform, indexes } = props;
    const datPath = getPlatformOptions(platform, "datPath") as string;
    const exportStatus = getPlatformOptions(platform, "exportStatus") as Array<
      DriverStatus
    >;
    const exportYear = getPlatformOptions(platform, "exportYear") as number;
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

      if (exportStatus) {
        const driverStatus = game.driver._attributes.status;
        if (!exportStatus.includes(driverStatus)) {
          continue;
        }
      }

      if (exportYear) {
        const year = Number(game.year._text.substr(0, 4));
        if (year < exportYear) {
          continue;
        }
      }

      const id = name + ".zip";
      const gameName = game.description._text;
      indexes[id] = {
        id,
        gameName
      };
    }

    console.log(Object.keys(indexes).length)
    return indexes;
  }
};

export default datParsers;
