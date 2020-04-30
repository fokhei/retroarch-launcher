{

  playlistPath: "D:\\playlists",
  thumbnailPath: "D:\\thumbnails",

  externalApps: [
      {
          type: "RetroArch",
          execPath: "D:\\emu\\RetroArch\\retroarch.exe",
          coreDir: "D:\\emu\\RetroArch\\cores"
      },
      {
          type: "TeknoParrot",
          execPath: "D:\\emu\\TeknoParrot\\TeknoParrotUi.exe",
      },
      {
        type: "D-Fend Reloaded",
        execPath: "D:\\emu\\D-Fend Reloaded\\DFend.exe",
      },
      {
        type: "M2 Emulator",
        execPath: "D:\\emu\\m2emulator\\emulator_multicpu.exe",
      },

      {
        type: "SuperModel",
        execPath: "D:\\emu\\Supermodel\\Supermodel.exe",
      },

  ],


  categories: [


      {
          name: "Arcade PC - Standalone",
          thumbnailDir: "Arcade PC",
          shortName: "arcade",
          romsPath: "D:\\roms\\Arcade PC\\Standalone",
          scanType: "folder"
      },

      {
          name: "Arcade PC - TeknoParrot",
          thumbnailDir: "Arcade PC",
          shortName: "arcade",
          romsPath: "D:\\roms\\Arcade PC\\TeknoParrot",
          scanType: "folder",
          players: [{
              type: "TeknoParrot"
          }]
      },


      {
        name: "DOS",
        thumbnailDir: "DOS",
        shortName: "dos",
        romsPath: "F:\\roms\\DOS\\games\\dosCenter",
        nameFilter: {
          removeAllBrackets: true,
          removeVersion: true
        },
        players: [
          {
            type: "D-Fend Reloaded"
          },
          {
          type: "RetroArch",
          retroArchCore: "dosbox_svn_libretro"
        }]
      },


      {
        name: "DOS (中文)",
        thumbnailDir: "DOS",
        shortName: "dos",
        romsPath: "F:\\roms\\DOS\\games\\中文遊戲",
        nameFilter: {
          removeAllBrackets: true
        },
        players: [ {
          type: "D-Fend Reloaded"
        },{
          type: "RetroArch",
          retroArchCore: "dosbox_svn_libretro"
        }]
      },



      {
        name: "FBA",
        thumbnailDir: "FBNeo - Arcade Games",
        shortName: "fba",
        romsPath: "F:\\roms\\FBNeo\\arcade",
        datPath: "D:\\dats\\FinalBurn Neo 0.2.97.44 (Arcade).dat",
        datParser: "fba",
        romFilter: {
          includeStatus: ["good", "imperfect"],
        },
        players: [{
          type: "RetroArch",
          retroArchCore: "fbneo_libretro"
        }]
      },


      {
        name: "MAME",
        thumbnailDir: "MAME",
        shortName: "mame",
        romsPath: "F:\\roms\\MAME\\v0.216-merged",
        datPath: "D:\\dats\\MAME 0.216 (Arcade).dat",
        datParser: "mame",
        romFilter: {
          excludeRomOfs: ["awbios", "naomi"],
          includeStatus: ["good", "imperfect"],
        },
        players: [{
          type: "RetroArch",
          retroArchCore: "mame_libretro"
        }]
      },


      {
        name: "NEC - PC Engine CD - TurboGrafx-CD",
        thumbnailDir: "NEC - PC Engine CD - TurboGrafx-CD",
        shortName: "pce",
        romsPath: "F:\\roms\\NEC - PC Engine CD - TurboGrafx-CD\\redump",
        players: [{
            type: "RetroArch",
            retroArchCore: "mednafen_pce_fast_libretro"
        }],
      },


      {
        name: "Nintendo - Family Computer Disk System",
        thumbnailDir: "Nintendo - Family Computer Disk System",
        shortName: "fds",
        romsPath: "F:\\roms\\Nintendo - Family Computer Disk System",
        players: [{
            type: "RetroArch",
            retroArchCore: "nestopia_libretro"
        }],
      },




      {
          name: "Nintendo - Game Boy",
          thumbnailDir: "Nintendo - Game Boy",
          shortName: "gb",
          romsPath: "F:\\roms\\Nintendo - Game Boy",
          romFilter: {
              excludeBios: true
          },
          players: [{
              type: "RetroArch",
              retroArchCore: "gambatte_libretro"
          }],
      },


      {
        name: "Nintendo - Game Boy Advance",
        thumbnailDir: "Nintendo - Game Boy Advance",
        shortName: "gba",
        romsPath: "F:\\roms\\Nintendo - Game Boy Advance",
        players: [{
            type: "RetroArch",
            retroArchCore: "mednafen_gba_libretro"
        }],
      },



      {
          name: "Nintendo - Game Boy Color",
          thumbnailDir: "Nintendo - Game Boy Color",
          shortName: "gbc",
          romsPath: "F:\\roms\\Nintendo - Game Boy Color",
          romFilter: {
              excludeBios: true
          },
          players: [{
              type: "RetroArch",
              retroArchCore: "gambatte_libretro"
          }]
      },


      {
        name: "Nintendo - GameCube",
        thumbnailDir: "Nintendo - GameCube",
        shortName: "gba",
        romsPath: "F:\\roms\\Nintendo - GameCube\\redump-gcz",
        players: [{
            type: "RetroArch",
            retroArchCore: "dolphin_libretro"
        }],
        nameFilter: {
          removeLangBracket: true,
          removeDiscBracket: true
        },
        romFilter: {
          excludeNonFirstDisc: true
        }
      },



     

      {
        name: "Nintendo - Nintendo 3DS",
        thumbnailDir: "Nintendo - Nintendo 3DS",
        shortName: "3ds",
        romsPath: "D:\\roms\\Nintendo - Nintendo 3DS\\games",
        datPath:
        "D:\\dats\\No-Intro\\Nintendo - Nintendo 3DS (Encrypted) (20200110-095855).dat",
        datParser: "noIntro3ds"
      },


      {
        name: "Nintendo - Nintendo 3DS (中文)",
        thumbnailDir: "Nintendo - Nintendo 3DS",
        shortName: "3ds",
        romsPath: "D:\\roms\\Nintendo - Nintendo 3DS\\chinese",
        datPath:
        "D:\\dats\\No-Intro\\Nintendo - Nintendo 3DS (Encrypted) (20200110-095855).dat",
        datParser: "noIntro3ds"
      },



      {
        name: "Nintendo - Nintendo Entertainment System",
        thumbnailDir: "Nintendo - Nintendo Entertainment System",
        shortName: "nes",
        romsPath: "F:\\roms\\Nintendo - Nintendo Entertainment System",
        players: [{
            type: "RetroArch",
            retroArchCore: "nestopia_libretro"
        }],
      },


      {
        name: "Nintendo - Switch",
        thumbnailDir: "Nintendo - Switch",
        shortName: "nes",
        romsPath: "D:\\roms\\Nintendo - Switch",
        nameFilter: {
          removeVersion: true,
          removeTitleId: true
        }
      },


      {
        name: "Nintendo - Wii",
        thumbnailDir: "Nintendo - Wii",
        shortName: "wii",
        romsPath: "F:\\roms\\Nintendo - Wii",
        players: [{
            type: "RetroArch",
            retroArchCore: "dolphin_libretro"
        }],
        nameFilter: {
          removeLangBracket: true
        }
      },



      {
        name: "Sega - Mega Drive - Genesis",
        thumbnailDir: "Sega - Mega Drive - Genesis",
        shortName: "md",
        romsPath: "F:\\roms\\Sega - Mega Drive - Genesis",
        players: [{
            type: "RetroArch",
            retroArchCore: "genesis_plus_gx_libretro"
        }],
        romFilter: {
          excludeBios: true,
          excludeBeta: true,
          excludeProto: true
        }
      },



      {
        name: "Sega - Mega-CD - Sega CD",
        thumbnailDir: "Sega - Mega-CD - Sega CD",
        shortName: "sega-cd",
        romsPath: "F:\\roms\\Sega - Mega-CD - Sega CD\\games",
        players: [{
            type: "RetroArch",
            retroArchCore: "genesis_plus_gx_libretro"
        }]
      },



      {
        name: "Sega - Model2 (M2Emulator)",
        thumbnailDir: "MAME",
        shortName: "model2",
        romsPath: "D:\\emu\\m2emulator\\roms",
        datPath: "D:\\dats\\SEGA Model 2 Emulator v0.9-mod.dat",
        datParser: "m2emulator",
        players: [{
          type: "M2 Emulator"
        }]
      },



      {
        name: "Sega - Model3 (SuperModel)",
        thumbnailDir: "MAME",
        shortName: "model3",
        romsPath: "D:\\emu\\Supermodel",
        datPath: "D:\\emu\\Supermodel\\Config\\Games.xml",
        datParser: "supermodel",
        romFilter: {
          includeExts:[".zip"]
        },
        players: [
          {
            type: "SuperModel"
          }
        ]
      },



      {
        name: "Sega - Naomi - Atomiswave",
        thumbnailDir: "MAME",
        shortName: "mame",
        romsPath: "F:\\roms\\MAME\\v0.216-merged",
        datPath: "D:\\dats\\MAME 0.216 (Arcade).dat",
        datParser: "mame",
        romFilter: {
          includeRomOfs: ["awbios", "naomi"]
        },
        players: [
          {
            type: "RetroArch",
            retroArchCore: "flycast_libretro"
          }
        ]
      },



      {
        name: "Sega - Saturn",
        thumbnailDir: "Sega - Saturn",
        shortName: "ss",
        romsPath: "F:\\roms\\Sega - Saturn\\redump",
        romFilter: {
          excludeNonFirstDisc: true
        },
        nameFilter: {
          removeLangBracket: true,
          removeDiscBracket: true,
          removeNonFirstBrackets: true
        },
        players: [
          {
            type: "RetroArch",
            retroArchCore: "yabasanshiro_libretro"
          }
        ]
      },



      {
        name: "Sega - Saturn (中文)",
        thumbnailDir: "Sega - Saturn",
        shortName: "ss",
        romsPath: "F:\\roms\\Sega - Saturn\\chinese",
        players: [
          {
            type: "RetroArch",
            retroArchCore: "yabasanshiro_libretro"
          }
        ]
      },




      {
        name: "Sony - PlayStation",
        thumbnailDir: "Sony - PlayStation",
        shortName: "ps1",
        romsPath: "F:\\roms\\Sony - PlayStation\\redump-usa",
        romFilter: {
          excludeNonFirstDisc: true,
        },
        nameFilter: {
          removeDiscBracket: true
        },
        players: [
          {
            type: "RetroArch",
            retroArchCore: "pcsx_rearmed_libretro"
          }
        ]
      },



      {
        name: "Sony - PlayStation (中文)",
        thumbnailDir: "Sony - PlayStation",
        shortName: "ps1",
        romsPath: "F:\\roms\\Sony - PlayStation\\chinese",
        romFilter: {
          excludeNonFirstDisc: true,
        },
        nameFilter: {
          removeDiscBracket: true
        },
        players: [
          {
            type: "RetroArch",
            retroArchCore: "pcsx_rearmed_libretro"
          }
        ]
      },



      {
        name: "Sony - PlayStation Portable",
        thumbnailDir: "Sony - PlayStation Portable",
        shortName: "psp",
        romsPath: "F:\\roms\\Sony - PlayStation Portable\\cso",
        romFilter: {
          excludeNonFirstDisc: true
        },
        nameFilter: {
          removeDiscBracket: true,
          removePspIdBracket: true
        },
        players: [
          {
            type: "RetroArch",
            retroArchCore: "ppsspp_libretro"
          }
        ]
      },


      {
        name: "Sony - PlayStation Portable (中文)",
        thumbnailDir: "Sony - PlayStation Portable",
        shortName: "psp",
        romsPath: "F:\\roms\\Sony - PlayStation Portable\\chinese",
        romFilter: {
          excludeNonFirstDisc: true
        },
        nameFilter: {
          removeDiscBracket: true,
          removePspIdBracket: true
        },
        players: [
          {
            type: "RetroArch",
            retroArchCore: "ppsspp_libretro"
          }
        ]
      },


      {
        name: "Sony - PlayStation Portable (Minis)",
        thumbnailDir: "Sony - PlayStation Portable",
        shortName: "psp",
        romsPath: "F:\\roms\\Sony - PlayStation Portable\\minis",
        romFilter: {
          excludeNonFirstDisc: true
        },
        nameFilter: {
          removeDiscBracket: true,
          removePspIdBracket: true
        },
        players: [
          {
            type: "RetroArch",
            retroArchCore: "ppsspp_libretro"
          }
        ]
      },



      {
        name: "Sony - PlayStation Vita",
        thumbnailDir: "Sony - PlayStation Vita",
        shortName: "psv",
        romsPath: "F:\\roms\\Sony - PlayStation Vita",
        datPath: "D:\\dats\\noPayStation\\TSV\\GAMES\\PSV_GAMES.tsv",
        datParser: "noPayStationPsvTsv"
      },





      {
        name: "The 3DO Company - 3DO",
        thumbnailDir: "The 3DO Company - 3DO",
        shortName: "3do",
        romsPath: "F:\\roms\\The 3DO Company - 3DO\\redump",
        players: [
          {
            type: "RetroArch",
            retroArchCore: "opera_libretro"
          }
        ]
      },






  ]
};