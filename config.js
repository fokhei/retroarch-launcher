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
      romsPath: "F:\\roms\\DOS\\games\\dosCenter",
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
      romsPath: "F:\\roms\\DOS\\games\\中文遊戲",
      thumbnailDB: "DOS",
      dllName: "dosbox_svn_libretro.dll",
      options: {
        nameFilter: {
          removeAllBrackets: true
        }
      }
    },

    "FBA": {
      shortName: "fba",
      romsPath: "F:\\roms\\FBNeo\\arcade",
      thumbnailDB: "FBNeo - Arcade Games",
      dllName: "fbneo_libretro.dll",
      options: {
        datPath: "F:\\dats\\FinalBurn Neo 0.2.97.44 (Arcade).dat",
        datParser: "fba",
        romFilter: {
          includeStatus: ["good", "imperfect"],
          //includeMinYear: 1984
        }
      }
    },

    MAME: {
      shortName: "mame",
      romsPath: "F:\\roms\\MAME\\v0.216-merged",
      thumbnailDB: "MAME",
      dllName: "mame_libretro.dll",
      options: {
        datPath: "F:\\dats\\MAME 0.216 (Arcade).dat",
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
      romsPath: "F:\\roms\\NEC - PC Engine CD - TurboGrafx-CD\\redump",
      thumbnailDB: "NEC - PC Engine CD - TurboGrafx-CD",
      dllName: "mednafen_pce_fast_libretro.dll"
    },

    "Nintendo - Family Computer Disk System": {
      shortName: "fds",
      romsPath: "F:\\roms\\Nintendo - Family Computer Disk System",
      thumbnailDB: "Nintendo - Family Computer Disk System",
      dllName: "nestopia_libretro.dll"
    },

     "Nintendo - Game Boy": {
      shortName: "gb",
      romsPath: "F:\\roms\\Nintendo - Game Boy",
      thumbnailDB: "Nintendo - Game Boy",
      dllName: "gambatte_libretro.dll"
    },


    "Nintendo - Game Boy Advance": {
      shortName: "gba",
      romsPath: "F:\\roms\\Nintendo - Game Boy Advance",
      thumbnailDB: "Nintendo - Game Boy Advance",
      dllName: "mednafen_gba_libretro.dll"
    },

    "Nintendo - Game Boy Color": {
      shortName: "gbc",
      romsPath: "F:\\roms\\Nintendo - Game Boy Color",
      thumbnailDB: "Nintendo - Game Boy Color",
      dllName: "gambatte_libretro.dll"
    },

   

    "Nintendo - GameCube": {
      shortName: "gamecube",
      romsPath: "F:\\roms\\Nintendo - GameCube\\redump-gcz",
      thumbnailDB: "Nintendo - GameCube",
      dllName: "dolphin_libretro.dll",
      options: {
        nameFilter: {
          removeLangBracket: true,
          removeDiscBracket: true
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
      romsPath: "F:\\roms\\Nintendo - Nintendo Entertainment System",
      thumbnailDB: "Nintendo - Nintendo Entertainment System",
      dllName: "nestopia_libretro.dll"
    },

    "Nintendo - Super Nintendo Entertainment System": {
      shortName: "sfc",
      romsPath: "F:\\roms\\Nintendo - Super Nintendo Entertainment System\\no-intro",
      thumbnailDB: "Nintendo - Super Nintendo Entertainment System",
      dllName: "snes9x_libretro.dll",
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
      romsPath: "F:\\roms\\Nintendo - Switch",
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
      romsPath: "F:\\roms\\Nintendo - Wii",
      thumbnailDB: "Nintendo - Wii",
      dllName: "dolphin_libretro.dll",
      options: {
        nameFilter: {
          removeLangBracket: true
        }
      }
    },

    "Sega - Mega Drive - Genesis": {
      shortName: "md",
      romsPath: "F:\\roms\\Sega - Mega Drive - Genesis",
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
      romsPath: "F:\\roms\\Sega - Mega-CD - Sega CD\\games",
      thumbnailDB: "Sega - Mega-CD - Sega CD",
      dllName: "genesis_plus_gx_libretro.dll"
    },

    "Sega - Naomi - Atomiswave": {
      shortName: "naomi",
      romsPath: "F:\\roms\\MAME\\v0.216-merged",
      thumbnailDB: "MAME",
      dllName: "flycast_libretro.dll",
      options: {
        datPath: "F:\\dats\\MAME 0.216 (Arcade).dat",
        datParser: "mame",
        romFilter: {
          includeRomOfs: ["awbios", "naomi"]
        }
      }
    },

    "Sega - Saturn": {
      shortName: "ss",
      romsPath: "F:\\roms\\Sega - Saturn\\redump",
      thumbnailDB: "Sega - Saturn",
      dllName: "yabasanshiro_libretro.dll",
      options: {
        nameFilter: {
          removeLangBracket: true,
          removeDiscBracket: true,
          removeNonFirstBrackets: true
        },
        romFilter: {
          excludeNonFirstDisc: true
        }
      }
    },


    "Sega - Saturn (中文遊戲)": {
      shortName: "ss",
      romsPath: "F:\\roms\\Sega - Saturn\\chinese",
      thumbnailDB: "Sega - Saturn",
      dllName: "yabasanshiro_libretro.dll"
    },


    "Sony - PlayStation": {
      shortName: "ps1",
      romsPath: "F:\\roms\\Sony - PlayStation\\redump-usa",
      thumbnailDB: "Sony - PlayStation",
      dllName: "pcsx_rearmed_libretro.dll",
      options: {
        romFilter: {
          excludeNonFirstDisc: true,
        },
        nameFilter: {
          removeDiscBracket: true
        }
      }
    },


    "Sony - PlayStation (中文遊戲)": {
      shortName: "ps1",
      romsPath: "F:\\roms\\Sony - PlayStation\\chinese",
      thumbnailDB: "Sony - PlayStation",
      dllName: "pcsx_rearmed_libretro.dll",
      options: {
        romFilter: {
          excludeNonFirstDisc: true,
        },
        nameFilter: {
          removeDiscBracket: true
        }
      }
    },


   
    "Sony - PlayStation Portable": {
      shortName: "psp",
      romsPath: "F:\\roms\\Sony - PlayStation Portable\\cso",
      thumbnailDB: "Sony - PlayStation Portable",
      dllName: "ppsspp_libretro.dll",
      options: {
        romFilter: {
          excludeNonFirstDisc: true
        },
        nameFilter: {
          removeDiscBracket: true,
          removePspIdBracket: true
        }
      }
    },

    "Sony - PlayStation Portable (中文遊戲)": {
      shortName: "psp",
      romsPath: "F:\\roms\\Sony - PlayStation Portable\\chinese",
      thumbnailDB: "Sony - PlayStation Portable",
      dllName: "ppsspp_libretro.dll",
      options: {
        romFilter: {
          excludeNonFirstDisc: true
        },
        nameFilter: {
          removeDiscBracket: true,
          removePspIdBracket: true
        }
      }
    },

    "Sony - PlayStation Portable (Minis)": {
      shortName: "psp-minis",
      romsPath: "F:\\roms\\Sony - PlayStation Portable\\minis",
      thumbnailDB: "Sony - PlayStation Portable",
      dllName: "ppsspp_libretro.dll",
      options: {
        nameFilter: {
          removePspIdBracket: true
        }
      }
    },



    "Sony - PlayStation Vita": {
      shortName: "psv",
      romsPath: "F:\\roms\\Sony - PlayStation Vita",
      thumbnailDB: "Sony - PlayStation Vita",
      dllName: "",
      options: {
        datPath: "F:\\dats\\noPayStation\\TSV\\GAMES\\PSV_GAMES.tsv",
        datParser: "noPayStationPsvTsv"
      }
    },

    "Taito - Type X": {
      shortName: "ttx2",
      romsPath: "D:\\roms\\Taito - Type X\\games",
      thumbnailDB: "Taito - Type X",
      dllName: "",
      options: {
        scanType: "folder"
      }
    },

    "The 3DO Company - 3DO": {
      shortName: "3do",
      romsPath: "F:\\roms\\The 3DO Company - 3DO\\redump",
      thumbnailDB: "The 3DO Company - 3DO",
      dllName: "4do_libretro.dll"
    }




  }
};
