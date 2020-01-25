interface AppConfig {
  retroArch: {
    exe: string;
    dir: {
      cores: string;
      playlists: string;
      thumbnails: string;
    };
  };
  windowOption: Electron.BrowserWindowConstructorOptions;
  shortNames: {
    [key: string]: string
  }
}
