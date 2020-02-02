interface Platform {
  shortName: string;
  romsPath: string;
  thumbnailDB: string;
  dllName: string;
  options: PlatformOptions;
}

interface PlatformOptions {
  skipNonFirstDisc?: boolean;
  removeLangInfo?: boolean;
  removeDiscInfo?: boolean;
  datPath?: string;
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
