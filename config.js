{

  appDataDir: "D:\\.retrobarrel",
  thumbnailPath: "D:\\thumbnails",

  externalApps: [
      {
        name: "RetroArch",
        execPath: "D:\\emu\\RetroArch\\retroarch.exe",
        params: ["-L", "%retroArchCore%", "%romPath%"]
      },

      {
        name: "TeknoParrot",
        execPath: "D:\\emu\\TeknoParrot\\TeknoParrotUi.exe",
        params: ["--profile=%teknoParrotProfile%"]
      },
      
      {
        name: "M2 Emulator",
        execPath: "D:\\emu\\m2emulator\\emulator_multicpu.exe",
        params: ["%romBasenameNoExt%"],
       
      },

      {
        name: "SuperModel",
        execPath: "D:\\emu\\Supermodel\\Supermodel.exe",
        params: ["%romBasename%"],
        
      },

      {
        name: "TIC-80",
        execPath: "D:\\emu\\tic80\\tic80.exe",
        params: ["%romPath%"]
      },


      {
        name: "Standalone",
        execPath: "%pickPath%",
        pickerFilters: ["exe", "bat"]
      },


      {
        name: "DOSBox",
        execPath: "D:\\emu\\DOSBox-0.72\\dosbox.exe",
        pickerFilters: ["exe", "bat", "com"],
        params: ["%pickPath%"]
        
      },


      {
        name: "PCX2",
        execPath: "D:\\emu\\PCSX2\\pcsx2.exe",
        params: ["%romPath%"]
        
      },

  ],


  categories: [


      {
          name: "Arcade PC - Standalone",
          thumbnailDir: "Arcade PC",
          shortName: "arcade",
          romsPath: "D:\\roms\\Arcade PC\\Standalone",
          scanType: "folder",
          players: [
            {name: "Standalone"}
          ]
      },

      {
          name: "Arcade PC - TeknoParrot",
          thumbnailDir: "Arcade PC",
          shortName: "arcade",
          romsPath: "D:\\roms\\Arcade PC\\TeknoParrot",
          scanType: "folder",
          players: [{
              name: "TeknoParrot"
          }]
      },


      {
          name: "Atari - 2600",
          thumbnailDir: "Atari - 2600",
          shortName: "atari2600",
          romsPath: "F:\\roms\\Atari - 2600\\no-intro",
          romFilter: {
            excludeBios: true,
            excludeBeta: true,
            excludeProto: true,
            excludeNonUsa: true
          },
           players: [{
	          name: "RetroArch",
	          retroArchCore: "D:\\emu\\RetroArch\\cores\\stella_libretro.dll"
	        }]
      },


      {
          name: "Atari - 5200",
          thumbnailDir: "Atari - 5200",
          shortName: "atari5200",
          romsPath: "F:\\roms\\Atari - 5200\\no-intro",
          romFilter: {
            excludeBios: true,
            excludeBeta: true,
            excludeProto: true,
            excludeDemo: true,
            excludeDiagnostics: true,
          },
          players: [{
	          name: "RetroArch",
	          retroArchCore: "D:\\emu\\RetroArch\\cores\\atari800_libretro.dll"
	        }]
      },


      {
          name: "Atari - 7800",
          thumbnailDir: "Atari - 7800",
          shortName: "atari7800",
          romsPath: "F:\\roms\\Atari - 7800\\no-intro",
          romFilter: {
            excludeBios: true,
            excludeBeta: true,
            excludeProto: true,
            excludeDemo: true,
            excludeDiagnostics: true,
          }
      },


      {
          name: "Atari - Jaguar",
          thumbnailDir: "Atari - Jaguar",
          shortName: "jaguar",
          romsPath: "F:\\roms\\Atari - Jaguar\\no-intro",
          romFilter: {
            excludeBios: true,
            excludeBeta: true,
            excludeProto: true,
            excludeDemo: true,
          },
          players: [{
	          name: "RetroArch",
	          retroArchCore: "D:\\emu\\RetroArch\\cores\\virtualjaguar_libretro.dll"
	        }]
      },


      {
          name: "Atari - Lynx",
          thumbnailDir: "Atari - Lynx",
          shortName: "lynx",
          romsPath: "F:\\roms\\Atari - Lynx\\no-intro",
          romFilter: {
            excludeBios: true,
            excludeBeta: true,
            excludeProto: true,
            excludeDemo: true,
          },
          players: [{
	          name: "RetroArch",
	          retroArchCore: "D:\\emu\\RetroArch\\cores\\handy_libretro.dll"
	        }]
      },


      //  {
      //     name: "Atari - ST",
      //     thumbnailDir: "Atari - ST",
      //     shortName: "atari st",
      //     romsPath: "F:\\roms\\Atari - ST\\no-intro",
      //     players: [{
	    //       name: "RetroArch",
	    //       retroArchCore: "D:\\emu\\RetroArch\\cores\\hatari_libretro.dll"
	    //     }]
      // },



       {
          name: "Bandai - WonderSwan",
          thumbnailDir: "Bandai - WonderSwan",
          shortName: "wonderSwan",
          romsPath: "F:\\roms\\Bandai - WonderSwan\\no-intro",
          romFilter: {
            excludeBios: true
          },
          players: [{
	          name: "RetroArch",
	          retroArchCore: "D:\\emu\\RetroArch\\cores\\mednafen_wswan_libretro.dll"
	        }]
      },



       {
          name: "Bandai - WonderSwan Color",
          thumbnailDir: "Bandai - WonderSwan Color",
          shortName: "wonderSwan",
          romsPath: "F:\\roms\\Bandai - WonderSwan Color\\no-intro",
          romFilter: {
            excludeBios: true
          },
          players: [{
	          name: "RetroArch",
	          retroArchCore: "D:\\emu\\RetroArch\\cores\\mednafen_wswan_libretro.dll"
	        }]
      },



      {
        name: "Microsoft - DOS",
        thumbnailDir: "Microsoft - DOS",
        shortName: "dos",
        romsPath: "F:\\roms\\Microsoft - DOS\\games\\dosCenter",
        nameFilter: {
          removeAllBrackets: true,
          removeVersion: true
        },
        players: [ {
          name: "DOSBox"
        }]
      },


      {
        name: "Microsoft - DOS (中文)",
        thumbnailDir: "Microsoft - DOS",
        shortName: "dos",
        romsPath: "F:\\roms\\Microsoft - DOS\\games\\中文遊戲",
        nameFilter: {
          removeAllBrackets: true
        },
        players: [ {
          name: "DOSBox"
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
          name: "RetroArch",
          retroArchCore: "D:\\emu\\RetroArch\\cores\\fbneo_libretro.dll"
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
          name: "RetroArch",
          retroArchCore: "D:\\emu\\RetroArch\\cores\\mame_libretro.dll"
        }]
      },


      {
        name: "NEC - PC Engine CD - TurboGrafx-CD",
        thumbnailDir: "NEC - PC Engine CD - TurboGrafx-CD",
        shortName: "pce",
        romsPath: "F:\\roms\\NEC - PC Engine CD - TurboGrafx-CD\\redump",
        players: [{
          name: "RetroArch",
            retroArchCore: "D:\\emu\\RetroArch\\cores\\mednafen_pce_fast_libretro.dll"
        }],
      },


      {
        name: "Nintendo - Family Computer Disk System",
        thumbnailDir: "Nintendo - Family Computer Disk System",
        shortName: "fds",
        romsPath: "F:\\roms\\Nintendo - Family Computer Disk System",
        players: [{
          name: "RetroArch",
            retroArchCore: "D:\\emu\\RetroArch\\cores\\nestopia_libretro.dll"
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
            name: "RetroArch",
              retroArchCore: "D:\\emu\\RetroArch\\cores\\gambatte_libretro.dll"
          }],
      },


      {
        name: "Nintendo - Game Boy Advance",
        thumbnailDir: "Nintendo - Game Boy Advance",
        shortName: "gba",
        romsPath: "F:\\roms\\Nintendo - Game Boy Advance",
        players: [{
          name: "RetroArch",
            retroArchCore: "D:\\emu\\RetroArch\\cores\\mednafen_gba_libretro.dll"
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
            name: "RetroArch",
              retroArchCore: "D:\\emu\\RetroArch\\cores\\gambatte_libretro.dll"
          }]
      },


      {
        name: "Nintendo - GameCube",
        thumbnailDir: "Nintendo - GameCube",
        shortName: "gba",
        romsPath: "F:\\roms\\Nintendo - GameCube\\redump",
        players: [{
          name: "RetroArch",
            retroArchCore: "D:\\emu\\RetroArch\\cores\\dolphin_libretro.dll"
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
        name: "Nintendo - GameCube (中文)",
        thumbnailDir: "Nintendo - GameCube",
        shortName: "gba",
        romsPath: "F:\\roms\\Nintendo - GameCube\\chinese",
        players: [{
          name: "RetroArch",
            retroArchCore: "D:\\emu\\RetroArch\\cores\\dolphin_libretro.dll"
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
          name: "RetroArch",
            retroArchCore: "D:\\emu\\RetroArch\\cores\\nestopia_libretro.dll"
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
          name: "RetroArch",
            retroArchCore: "D:\\emu\\RetroArch\\cores\\dolphin_libretro.dll"
        }],
        nameFilter: {
          removeLangBracket: true
        }
      },



      {
        name: "Nintendo - Wii U",
        thumbnailDir: "Nintendo - Wii U",
        shortName: "wiiu",
        romsPath: "D:\\roms\\Nintendo - Wii U\\roms",
        romFilter: {
          excludeUpdate: true,
          excludeDlc: true
        },
        nameFilter: {
          removeTitleId: true
        }
      },


      {
        name: "Nintendo - Wii U  (中文)",
        thumbnailDir: "Nintendo - Wii U",
        shortName: "wiiu",
        romsPath: "D:\\roms\\Nintendo - Wii U\\chinese",
        romFilter: {
          excludeUpdate: true,
          excludeDlc: true
        },
        nameFilter: {
          removeTitleId: true
        }
      },


       {
        name: "Nintendo - Wii U  (中文 Patch)",
        thumbnailDir: "Nintendo - Wii U",
        shortName: "wiiu",
        romsPath: "D:\\roms\\Nintendo - Wii U\\chinese-patch",
        romFilter: {
          excludeUpdate: true,
          excludeDlc: true
        },
        nameFilter: {
          removeTitleId: true
        }
      },


       {
        name: "OpenDingux - Games",
        thumbnailDir: "OpenDingux - Games",
        shortName: "openDingux",
        romsPath: "D:\\roms\\OpenDingux - Games"
      },





      {
        name: "Sega - Dreamcast",
        thumbnailDir: "Sega - Dreamcast",
        shortName: "dc",
        romsPath: "F:\\roms\\Sega - Dreamcast\\redump-unzipped",
        scanType: "folder",
        players: [{
          name: "RetroArch",
            retroArchCore: "D:\\emu\\RetroArch\\cores\\flycast_libretro.dll"
        }]
      },


      {
        name: "Sega - Dreamcast (中文)",
        thumbnailDir: "Sega - Dreamcast",
        shortName: "dc",
        romsPath: "F:\\roms\\Sega - Dreamcast\\chinese",
        players: [{
          name: "RetroArch",
            retroArchCore: "D:\\emu\\RetroArch\\cores\\flycast_libretro.dll"
        }]
      },



      {
        name: "Sega - Mega Drive - Genesis",
        thumbnailDir: "Sega - Mega Drive - Genesis",
        shortName: "md",
        romsPath: "F:\\roms\\Sega - Mega Drive - Genesis",
        players: [{
          name: "RetroArch",
            retroArchCore: "genesis_plus_gx_libretro.dll"
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
          name: "RetroArch",
            retroArchCore: "D:\\emu\\RetroArch\\cores\\genesis_plus_gx_libretro.dll"
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
          name: "M2 Emulator"
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
            name: "SuperModel"
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
            name: "RetroArch",
            retroArchCore: "D:\\emu\\RetroArch\\cores\\flycast_libretro.dll"
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
            name: "RetroArch",
            retroArchCore: "D:\\emu\\RetroArch\\cores\\yabasanshiro_libretro.dll"
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
            name: "RetroArch",
            retroArchCore: "D:\\emu\\RetroArch\\cores\\yabasanshiro_libretro.dll"
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
            name: "RetroArch",
            retroArchCore: "D:\\emu\\RetroArch\\cores\\pcsx_rearmed_libretro.dll"
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
            name: "RetroArch",
            retroArchCore: "D:\\emu\\RetroArch\\cores\\pcsx_rearmed_libretro.dll"
          }
        ]
      },



       {
        name: "Sony - PlayStation 2",
        thumbnailDir: "Sony - PlayStation 2",
        shortName: "ps2",
        romsPath: "D:\\roms\\Sony - PlayStation 2\\redump",
        romFilter: {
          excludeNonFirstDisc: true,
        },
        nameFilter: {
          removeDiscBracket: true
        },
        players: [
          {
            name: "PCX2"
          }
        ]
      },


      {
        name: "Sony - PlayStation 2 (中文)",
        thumbnailDir: "Sony - PlayStation 2",
        shortName: "ps2",
        romsPath: "D:\\roms\\Sony - PlayStation 2\\chinese",
        romFilter: {
          excludeNonFirstDisc: true,
        },
        nameFilter: {
          removeDiscBracket: true
        },
        players: [
          {
            name: "RetroArch",
            retroArchCore: "D:\\emu\\RetroArch\\cores\\play_libretro.dll"
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
            name: "RetroArch",
            retroArchCore: "D:\\emu\\RetroArch\\cores\\ppsspp_libretro.dll"
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
            name: "RetroArch",
            retroArchCore: "D:\\emu\\RetroArch\\cores\\ppsspp_libretro.dll"
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
            name: "RetroArch",
            retroArchCore: "D:\\emu\\RetroArch\\cores\\ppsspp_libretro.dll"
          }
        ]
      },



      {
        name: "Sony - PlayStation Vita",
        thumbnailDir: "Sony - PlayStation Vita",
        shortName: "psv",
        romsPath: "D:\\roms\\Sony - PlayStation Vita",
        datPath: "D:\\dats\\noPayStation\\TSV\\GAMES\\PSV_GAMES.tsv",
        datParser: "noPayStationPsvTsv"
      },



      {
        name: "TIC-80",
        thumbnailDir: "TIC-80",
        shortName: "tic80",
        romsPath: "D:\\roms\\TIC-80\\games",
        players: [
          {name:"TIC-80"}
        ]
      },


      {
        name: "The 3DO Company - 3DO",
        thumbnailDir: "The 3DO Company - 3DO",
        shortName: "3do",
        romsPath: "F:\\roms\\The 3DO Company - 3DO\\redump",
        players: [
          {
            name: "RetroArch",
            retroArchCore: "D:\\emu\\RetroArch\\cores\\opera_libretro.dll"
          }
        ]
      },






  ]
};