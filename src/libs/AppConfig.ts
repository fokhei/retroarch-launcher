interface platforms {
  shortName?: string;
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
