import AppConfig, { getPlatformOptions, DatParser } from "./AppConfig";
import datParsers, { DatIndexes } from "../parsers/datParsers";

export const createDatIndexes = (
  config: AppConfig,
  category: string
): DatIndexes => {
  const platform = config.platforms[category];
  const datParser = getPlatformOptions(platform, "datParser") as DatParser;

  if (datParser) {
    if (datParsers.hasOwnProperty(datParser)) {
      let indexes: DatIndexes = {};
      const func = datParsers[datParser];
      return func({ platform, indexes });
    }
  }
  return null;
};
