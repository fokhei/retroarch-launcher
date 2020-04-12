export interface Platform {
  shortName: string;
  romsPath: string;
  thumbnailDB: string;
  dllName: string;
  options: PlatformOptions;
}

interface RomFilter {
  excludeBios?: boolean;
  excludeNonFirstDisc?: boolean;
  includeRomOfs?: Array<string>;
  excludeRomOfs?: Array<string>;
  excludeBeta?: boolean;
  excludeProto?: boolean;
  excludeSample?: boolean;
  excludeDemo?: boolean;
  includeStatus?: Array<string>;
}


interface NameFilter {
  removeLang?: boolean;
  removeDisc?: boolean;
  removeVersion?: boolean;
  removeTitleId?: boolean;
  removeAllBrackets?: boolean;
  removeNonFirstBrackets?: boolean;
}

export enum ScanType {
  FILE= "file",
  FOLDER = "folder"
}

interface PlatformOptions {
  datPath?: string;
  datParser?: DatParser;
  scanType?: ScanType;
  romFilter?: RomFilter;
  nameFilter?: NameFilter;
}

export enum DatParser {
  NoIntro_3ds = "NoIntro_3ds",
  noPayStation_Psv_Tsv = "noPayStation_Psv_Tsv"
}

export enum DriverStatus {
  GOOD = "good",
  IMPERFECT = "imperfect",
  PRELIMINARY = "preliminary"
}

export interface AppConfig {
  retroArch: {
    exe: string;
    cores: string;
    playlists: string;
    thumbnails: string;
  };
  windowOption: Electron.BrowserWindowConstructorOptions;
  platforms: {
    [key: string]: Platform;
  };
}

export const getPlatform = (config: AppConfig, category: string): Platform => {
  if (config.platforms.hasOwnProperty(category)) {
    return config.platforms[category];
  }
  return null;
};

export const getPlatformOptions = (
  platform: Platform,
  optionName: string
): PlatformOptions => {
  if (platform) {
    if (platform.hasOwnProperty("options")) {
      const options = platform.options;
      if (options.hasOwnProperty(optionName)) {
        return options[optionName];
      }
      return null;
    }
    return null;
  }
  return null;
};

export const getRomFilter = (platform: Platform, filterName: string) => {
  const filters = getPlatformOptions(platform, "romFilter");
  if (filters && filters.hasOwnProperty(filterName)) {
    return filters[filterName];
  }
  return null;
};

export const getNameFilter = (platform: Platform, filterName: string) => {
  const filters = getPlatformOptions(platform, "nameFilter");
  if (filters && filters.hasOwnProperty(filterName)) {
    return filters[filterName];
  }
  return null;
};

export default AppConfig;
