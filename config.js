{
  retroArch: {
    exe: "D:\\emu\\RetroArch\\retroarch.exe",
    cores: "D:\\emu\\RetroArch\\cores",
    playlists: "D:\\emu\\RetroArch\\playlists",
    thumbnails: "D:\\roms\\RetroArch - thumbnails"
  },
  windowOption: {
    width: 1100,
    height: 560
  },
  platforms: {
    DOS: {
      shortName: "dos",
      romsPath: "D:\\roms\\DOS\\games\\dosCenter",
      thumbnailDB: "DOS",
      dllName: "dosbox_svn_libretro.dll",
      options: {
        nameFilter: {
          removeAllBrackets: true,
          removeVersion: true
        }
      }
    },

    "DOS (中文遊戲)": {
      shortName: "dos",
      romsPath: "D:\\roms\\DOS\\games\\中文遊戲",
      thumbnailDB: "DOS",
      dllName: "dosbox_svn_libretro.dll",
      options: {
        nameFilter: {
          removeAllBrackets: true
        }
      }
    },

    "FBNeo - Arcade Games": {
      shortName: "fba",
      romsPath: "D:\\roms\\FBNeo\\arcade",
      thumbnailDB: "FBNeo - Arcade Games",
      dllName: "fbneo_libretro.dll",
      options: {
        datPath: "D:\\roms\\dats\\FinalBurn Neo 0.2.97.44 (Arcade).dat",
        datParser: "fba",
        romFilter: {
          includeStatus: ["good", "imperfect"],
          includeMinYear: 1984
        }
      }
    },

    MAME: {
      shortName: "mame",
      romsPath: "D:\\roms\\MAME\\v0.216-merged",
      thumbnailDB: "MAME",
      dllName: "mame_libretro.dll",
      options: {
        datPath: "D:\\roms\\dats\\MAME 0.216 (Arcade).dat",
        datParser: "mame",
        romFilter: {
          excludeRomOfs: ["awbios", "naomi"],
          includeStatus: ["good", "imperfect"],
          includeMinYear: 1984
        }
      
      }
    },

    "NEC - PC Engine CD - TurboGrafx-CD": {
      shortName: "pce",
      romsPath: "D:\\roms\\NEC - PC Engine CD - TurboGrafx-CD\\redump",
      thumbnailDB: "NEC - PC Engine CD - TurboGrafx-CD",
      dllName: "mednafen_pce_fast_libretro.dll"
    },

    "Nintendo - Family Computer Disk System": {
      shortName: "fds",
      romsPath: "D:\\roms\\Nintendo - Family Computer Disk System",
      thumbnailDB: "Nintendo - Family Computer Disk System",
      dllName: "nestopia_libretro.dll"
    },

    "Nintendo - Game Boy Advance": {
      shortName: "gba",
      romsPath: "D:\\roms\\Nintendo - Game Boy Advance",
      thumbnailDB: "Nintendo - Game Boy Advance",
      dllName: "mednafen_gba_libretro.dll"
    },

    "Nintendo - Game Boy Color": {
      shortName: "gbc",
      romsPath: "D:\\roms\\Nintendo - Game Boy Color",
      thumbnailDB: "Nintendo - Game Boy Color",
      dllName: "gambatte_libretro.dll"
    },

    "Nintendo - Game Boy": {
      shortName: "gb",
      romsPath: "D:\\roms\\Nintendo - Game Boy",
      thumbnailDB: "Nintendo - Game Boy",
      dllName: "gambatte_libretro.dll"
    },

    "Nintendo - GameCube": {
      shortName: "gamecube",
      romsPath: "D:\\roms\\Nintendo - GameCube\\redump-gcz",
      thumbnailDB: "Nintendo - GameCube",
      dllName: "dolphin_libretro.dll",
      options: {
        nameFilter: {
          removeLang: true,
          removeDisc: true
        },
        romFilter: {
          excludeNonFirstDisc: true
        }
      }
    },

    "Nintendo - Nintendo 3DS (中文遊戲)": {
      shortName: "3ds",
      romsPath: "D:\\roms\\Nintendo - Nintendo 3DS\\chinese",
      thumbnailDB: "Nintendo - Nintendo 3DS",
      dllName: "",
      options: {
        datPath:
          "D:\\roms\\dats\\No-Intro\\Nintendo - Nintendo 3DS (Encrypted) (20200110-095855).dat",
        datParser: "noIntro3ds"
      }
    },

    "Nintendo - Nintendo 3DS": {
      shortName: "3ds",
      romsPath: "D:\\roms\\Nintendo - Nintendo 3DS\\games",
      thumbnailDB: "Nintendo - Nintendo 3DS",
      dllName: "",
      options: {
        datPath:
          "D:\\roms\\dats\\No-Intro\\Nintendo - Nintendo 3DS (Encrypted) (20200110-095855).dat",
        datParser: "noIntro3ds"
      }
    },

    "Nintendo - Nintendo Entertainment System": {
      shortName: "nes",
      romsPath: "D:\\roms\\Nintendo - Nintendo Entertainment System",
      thumbnailDB: "Nintendo - Nintendo Entertainment System",
      dllName: "nestopia_libretro.dll"
    },

    "Nintendo - Super Nintendo Entertainment System": {
      shortName: "sfc",
      romsPath: "D:\\roms\\Nintendo - Super Nintendo Entertainment System\\no-intro",
      thumbnailDB: "Nintendo - Super Nintendo Entertainment System",
      dllName: "",
      options: { 
        romFilter: {
          excludeBeta: true,
          excludeProto: true,
          excludeSample: true,
          excludeDemo: true,
        }
      }
    },

    "Nintendo - Switch": {
      shortName: "switch",
      romsPath: "D:\\roms\\Nintendo - Switch",
      thumbnailDB: "Nintendo - Switch",
      dllName: "",
      options: {
        nameFilter: {
          removeVersion: true,
          removeTitleId: true
        }
      }
    },

    "Nintendo - Wii": {
      shortName: "wii",
      romsPath: "D:\\roms\\Nintendo - Wii",
      thumbnailDB: "Nintendo - Wii",
      dllName: "dolphin_libretro.dll",
      options: {
        nameFilter: {
          removeLang: true
        }
      }
    },

    "Sega - Mega Drive - Genesis": {
      shortName: "md",
      romsPath: "D:\\roms\\Sega - Mega Drive - Genesis",
      thumbnailDB: "Sega - Mega Drive - Genesis",
      dllName: "genesis_plus_gx_libretro.dll",
      options: {
        romFilter: {
          excludeBios: true,
          excludeBeta: true,
          excludeProto: true
        }
      }
    },

    "Sega - Mega-CD - Sega CD": {
      shortName: "sega-cd",
      romsPath: "D:\\roms\\Sega - Mega-CD - Sega CD\\games",
      thumbnailDB: "Sega - Mega-CD - Sega CD",
      dllName: "genesis_plus_gx_libretro.dll"
    },

    "Sega - Naomi - Atomiswave": {
      shortName: "naomi",
      romsPath: "D:\\roms\\MAME\\v0.216-merged",
      thumbnailDB: "MAME",
      dllName: "flycast_libretro.dll",
      options: {
        datPath: "D:\\roms\\dats\\MAME 0.216 (Arcade).dat",
        datParser: "mame",
        romFilter: {
          includeRomOfs: ["awbios", "naomi"]
        }
      }
    },

    "Sega - Saturn": {
      shortName: "ss",
      romsPath: "D:\\roms\\Sega - Saturn\\redump",
      thumbnailDB: "Sega - Saturn",
      dllName: "yabasanshiro_libretro.dll"
    },

    "Sony - PlayStation": {
      shortName: "ps1",
      romsPath: "D:\\roms\\Sony - PlayStation\\redump",
      thumbnailDB: "Sony - PlayStation",
      dllName: "pcsx_rearmed_libretro.dll",
      options: {
        romFilter: {
          excludeNonFirstDisc: true,
        },
        nameFilter: {
          removeDisc: true
        }
      }
    },

    "Sony - PlayStation Minis": {
      shortName: "ps-minis",
      romsPath: "D:\\roms\\Sony - PlayStation Minis\\cso",
      thumbnailDB: "Sony - PlayStation Minis",
      dllName: "ppsspp_libretro.dll"
    },

    "Sony - PlayStation Portable": {
      shortName: "psp",
      romsPath: "D:\\roms\\Sony - PlayStation Portable\\cso",
      thumbnailDB: "Sony - PlayStation Portable",
      dllName: "ppsspp_libretro.dll",
      options: {
        romFilter: {
          excludeNonFirstDisc: true
        }
      }
    },

    "Sony - Playstation Vita": {
      shortName: "psv",
      romsPath: "D:\\roms\\Sony - PlayStation Vita",
      thumbnailDB: "Sony - PlayStation Vita",
      dllName: "",
      options: {
        datPath: "D:\\roms\\dats\\noPayStation\\TSV\\GAMES\\PSV_GAMES.tsv",
        datParser: "noPayStationPsvTsv"
      }
    },

    "Taito Type X2": {
      shortName: "ttx2",
      romsPath: "D:\\roms\\Taito Type X2",
      thumbnailDB: "Taito Type X2"
    },

    "The 3DO Company - 3DO": {
      shortName: "3do",
      romsPath: "D:\\roms\\The 3DO Company - 3DO\\redump",
      thumbnailDB: "The 3DO Company - 3DO",
      dllName: "4do_libretro.dll"
    }
  }
};
