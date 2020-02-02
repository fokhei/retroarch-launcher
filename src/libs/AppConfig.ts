interface platforms {
  shortName: string;
  romsPath: string;
  thumbnailDB: string;
  dllName: string;
  datPath: string;
}

interface AppConfig {
  retroArch: {
    exe: string;
    cores: string;
    playlists: string;
    thumbnails: string;
  };
  windowOption: Electron.BrowserWindowConstructorOptions;
  platforms: {
    [key: string]: platforms;
  };
}
