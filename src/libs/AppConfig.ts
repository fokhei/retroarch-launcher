export interface Platform {
  shortName: string;
  romsPath: string;
  thumbnailDB: string;
  dllName: string;
  options: PlatformOptions;
}

interface PlatformOptions {
  skipNonFirstDisc?: boolean;
  removeLang?: boolean;
  removeDisc?: boolean;
  removeVersion?: boolean;
  removeTitleId?: boolean;
  datPath?: string;
  datParser?: DatParser;
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

export default AppConfig;
