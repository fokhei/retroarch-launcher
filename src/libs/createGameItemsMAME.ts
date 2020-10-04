import * as path from "path";
import { DatIndexes } from "../interfaces/DatIndexes";
import { getRomFilter } from "./getRomFilter";
import { DriverStatus } from "../interfaces/DriverStatus";
import { createGameItem } from "./createGameItem";
import { Category } from "../interfaces/Category";
import { GameItem } from "../interfaces/GameItem";
import { removeAlias } from '../nameFilters/removeAlias';
import { mameGroups } from "../libs/mameGroups";

// interface SpecifiedRoms {
//   [key: string]: Array<string>; //subCategory : romName[]
// }

// interface ManufacturerGroup {
//   name: string;
//   manufacturers: Array<string>;
// }

// interface DriverGroup {
//   name: string;
//   drivers: Array<string>;
// }

// const specifiedRoms: SpecifiedRoms = {
//   Sexy: [
//     "gemcrush",
//     "landbrk",
//     "prtytime",
//     "sexyboom",
//     "suplup",
//     "roldfrog",
//     "vivdolls",
//   ],
//   MahJong: [
//     "jngolady",
//     "jangou",
//     "saklove",
//     "dw2001",
//     "dwpc",
//     "bakatono",
//     "danchih",
//     "ejanhs",
//     "ejsakura",
//     "hasamu",
//     "himesiki",
//     "froman2b",
//     "janshin",
//     "dokyusei",
//     "dokyusp",
//     "mjgtaste",
//     "mgakuen",
//     "mgakuen2",
//     "gakusai",
//     "gakusai2",
//     "mjnquest",
//     "matchit",
//     "minasan",
//     "pastelg",
//     "ar_pm",
//     "kiwame",
//     "kiwames",
//     "shanghai",
//     "shanhigw",
//     "shangha2",
//     "shangha3",
//     "shngmtkb",
//     "sjryuko",
//     "mahmajn",
//     "mahmajn2",
//     "toride2g",
//     "touryuu",
//     "vmahjong",
//     "myfairld",
//     "mj4simai",
//     "yumefuda",
//   ],
//   Gamble: [
//     "bmcpokr",
//     "genius6",
//     "meosism",
//     "untoucha",
//     "5clown",
//     "dpoker",
//     "endrichs",
//     "galgame2",
//     "promutrv",
//     "showhand",
//     "showdown",
//     "suhosong",
//     "threeds",
//     "vliner",
//     "yukon",
//   ],
//   Classic: [
//     "cmpacman",
//     "barata",
//     "m660",
//     "psurge",
//     "tapatune",
//     "tgtpanic",
//     "topsecex",
//     "arkatour",
//     "rbibb",
//     "vsgshoe",
//   ],
//   Misc: [
//     "battlcry",
//     "bikkuri",
//     "cdracula",
//     "cairblad",
//     "ddenlovj",
//     "keithlcy",
//     "drifto94",
//     "dynagear",
//     "eaglshot",
//     "animaljr",
//     "gdfs",
//     "mmpanic",
//     "mslider",
//     "nratechu",
//     "nettoqc",
//     "sxyreact",
//     "sxyreac2",
//     "pairsnb",
//     "akamaru",
//     "pastelis",
//     "quizchq",
//     "quiztvqq",
//     "hotdebut",
//     "reikaids",
//     "renju",
//     "stmblade",
//     "survarts",
//     "funkyfig",
//     "twineag2",
//     "ultrax",
//     "vasara",
//     "vasara2",
//     "vbowl",
//   ],
// };

// export const gamble: DriverGroup = {
//   name: "Gamble",
//   drivers: [
//     "a1supply",
//     "acefruit",
//     "aces1",
//     "adp",
//     "ampoker2",
//     "amusco",
//     "aristmk4",
//     "aristmk5",
//     "aristmk6",
//     "avt",
//     "bfmsys83",
//     "bfmsys85",
//     "bfm_ad5sw",
//     "bfm_sc1",
//     "bfm_sc2",
//     "bfm_sc4",
//     "bfm_sc5sw",
//     "bfm_swp",
//     "big10",
//     "bingo",
//     "bingoc",
//     "bingoman",
//     "bingor",
//     "bingowav",
//     "blitz68k",
//     "buster",
//     "cabaret",
//     "calomega",
//     "cardline",
//     "caswin",
//     "cb2001",
//     "cchance",
//     "chance32",
//     "changyu",
//     "chsuper",
//     "clpoker",
//     "coinmstr",
//     "corona",
//     "cromptons",
//     "d9final",
//     "dblcrown",
//     "dfruit",
//     "dreambal",
//     "drw80pkr",
//     "dwarfd",
//     "dynadice",
//     "feversoc",
//     "fortecar",
//     "fresh",
//     "funtech",
//     "funworld",
//     "galaxi",
//     "gamtor",
//     "gatron",
//     "gei",
//     "gluck2",
//     "goldnpkr",
//     "goldstar",
//     "guab",
//     "highvdeo",
//     "hitpoker",
//     "igs009",
//     "igspoker",
//     "jackie",
//     "jackpool",
//     "jangou",
//     "jokrwild",
//     "jubilee",
//     "kas89",
//     "ltcasino",
//     "luckgrln",
//     "lucky37",
//     "lucky74",
//     "luckybal",
//     "lvcards",
//     "magic10",
//     "magicard",
//     "magicfly",
//     "magreel",
//     "magtouch",
//     "majorpkr",
//     "merit",
//     "meritm",
//     "meyc8080",
//     "meyc8088",
//     "mgames",
//     "mil4000",
//     "miniboy7",
//     "mpu12wbk",
//     "mpu4dealem",
//     "mpu4mod2sw",
//     "mpu4vid",
//     "mtouchxl",
//     "multfish",
//     "murogem",
//     "murogmbl",
//     "norautp",
//     "nsmpoker",
//     "pcat_dyn",
//     "pcat_nit",
//     "peplus",
//     "poker72",
//     "pokerout",
//     "re900",
//     "roul",
//     "sanremo",
//     "segajw",
//     "segam1",
//     "sfbonus",
//     "sigmab52",
//     "skylncr",
//     "sliver",
//     "slotcarn",
//     "smsmcorp",
//     "snookr10",
//     "speedatk",
//     "splus",
//     "spoker",
//     "spool99",
//     "statriv2",
//     "subsino",
//     "subsino2",
//     "summit",
//     "supdrapo",
//     "supercrd",
//     "thedealr",
//     "tmspoker",
//     "unkpoker",
//     "videopkr",
//     "vpoker",
//     "vroulet",
//     "wallc",
//     "wildpkr",
//     "wms",
//   ],
// };

// const mahjong: DriverGroup = {
//   name: "MahJong",
//   drivers: [
//     "albazc",
//     "anes",
//     "bmcpokr",
//     "bnstars",
//     "chinsan",
//     "csplayh5",
//     "cultures",
//     "ddenlovr",
//     "dunhuang",
//     "dynax",
//     "fromanc2",
//     "fromance",
//     "go2000",
//     "goodejan",
//     "hanaawas",
//     "hnayayoi",
//     "homedata",
//     "igs011",
//     "igs017",
//     "jalmah",
//     "jantotsu",
//     "jongkyo",
//     "macs",
//     "mirage",
//     "mjkjidai",
//     "mjsenpu",
//     "mjsister",
//     "mrjong",
//     "nbmj8688",
//     "nbmj8891",
//     "nbmj8900",
//     "nbmj8991",
//     "nbmj9195",
//     "nightgal",
//     "niyanpai",
//     "ojankohs",
//     "pinkiri8",
//     "psikyo4",
//     "rbmk",
//     "rmhaihai",
//     "ron",
//     "royalmah",
//     "seibucats",
//     "sengokmj",
//     "simple_st0016",
//     "srmp2",
//     "srmp5",
//     "srmp6",
//     "ssv",
//     "tmmjprd",
//   ],
// };

// const sexy: DriverGroup = {
//   name: "Sexy",
//   drivers: [
//     "discoboy",
//     "expro02",
//     "galpani3",
//     "galpanic",
//     "galspnbl",
//     "gumbo",
//     "missb2",
//     "paradise",
//     "suprnova",
//     "zerozone",
//   ],
// };

// const classic: DriverGroup = {
//   name: "Classic",
//   drivers: [
//     "8080bw",
//     "pacman",
//     "dotrikun",
//     "usgames",
//     "4enraya",
//     "30test",
//     "minivadr",
//     "pingpong",
//     "jankenmn",
//     "kungfur",
//     "tomcat",
//     "vertigo",
//   ],
// };

// const nonAcrade: DriverGroup = {
//   name: "Non Arcade",
//   drivers: [
//     "playch10",
//     "multigam",
//     "megadriv_acbl",
//     "snesb",
//     "photon2",
//     "pengadvb",
//     "kontest",
//   ],
// };

// const manufacturerGroup: Array<ManufacturerGroup> = [
//   {
//     name: "Capcom",
//     manufacturers: ["Capcom"],
//   },
//   {
//     name: "SNK",
//     manufacturers: ["SNK", "Playmore"],
//   },
//   {
//     name: "IGS",
//     manufacturers: ["IGS"],
//   },

//   {
//     name: "Sexy",
//     manufacturers: [
//       "Hi-max",
//       "Playmark",
//       "Comad",
//       "Daigom",
//       "Promat",
//       "Yun Sung",
//       "Yanyaka",
//       "Barko Corp",
//       "GAV Company",
//     ],
//   },

  // {
  //   name: "Midway",
  //   manufacturers: ["Midway"],
  // },
  // {
  //   name: "Konami",
  //   manufacturers: ["Konami"],
  // },
  // {
  //   name: "Namco",
  //   manufacturers: ["Namco"],
  // },
  // {
  //   name: "Sega",
  //   manufacturers: ["Sega"],
  // },
  // {
  //   name: "Taito",
  //   manufacturers: ["Taito"],
  // },

  // {
  //   name: "Data East",
  //   manufacturers: ["Data East"],
  // },

  // {
  //   name: "Psikyo",
  //   manufacturers: ["Psikyo"],
  // },

  // {
  //   name: "Jaleco",
  //   manufacturers: ["Jaleco"],
  // },
  // {
  //   name: "Irem",
  //   manufacturers: ["Irem"],
  // },

  // {
  //   name: "Toaplan",
  //   manufacturers: ["Toaplan"],
  // },

  // {
  //   name: "Technos",
  //   manufacturers: ["Technos"],
  // },

  // {
  //   name: "Tecmo",
  //   manufacturers: ["Tecmo"],
  // },

  // {
  //   name: "Sammy",
  //   manufacturers: ["Sammy"],
  // },

  // {
  //   name: "Mitchell",
  //   manufacturers: ["Mitchell"],
  // },
// ];

export const createGameItemsMAME = (
  category: Category,
  files: Array<string>,
  datIndexes: DatIndexes
): Array<GameItem> => {
  let items: Array<GameItem> = [];
  const { romsPath } = category;
  const includeStatus = getRomFilter(category, "includeStatus") as Array<
    DriverStatus
  >;

  files.map((romPath: string) => {
    const romName = path.basename(removeAlias(romPath));

    if (datIndexes.hasOwnProperty(romName)) {
      const romPath = path.resolve(romsPath, romName);
      const index = datIndexes[romName];

      let shouldExport = true;
      if (includeStatus) {
        if (!includeStatus.includes(index.driverStatus as DriverStatus)) {
          shouldExport = false;
        }
      }

      if (shouldExport) {
        let subCategoryName = "";

        const ext = path.extname(romName);
        const noExt = romName.replace(ext, "");


        if (subCategoryName == "") {
          const keys = Object.keys(mameGroups);
          for (let i = 0; i < keys.length; i++) {
            const catName = keys[i];
            const cat = mameGroups[catName];
            if (cat.includes(noExt)) {
              subCategoryName = catName;
              break;
            }
          }
        }
        



        // if (subCategoryName == "") {
        //   const specifiedRomKeys = Object.keys(specifiedRoms);
        //   for (let i = 0; i < specifiedRomKeys.length; i++) {
        //     const catName = specifiedRomKeys[i];
        //     const cat = specifiedRoms[catName];
        //     if (cat.includes(noExt)) {
        //       subCategoryName = catName;
        //       break;
        //     }
        //   }
        // }

        // const driver = index.sourcefile.replace(".cpp", "");

        // if (subCategoryName == "") {
        //   if (gamble.drivers.includes(driver)) {
        //     subCategoryName = gamble.name;
        //   }
        // }

        // if (subCategoryName == "") {
        //   if (mahjong.drivers.includes(driver)) {
        //     subCategoryName = mahjong.name;
        //   }
        // }

        // if (subCategoryName == "") {
        //   if (sexy.drivers.includes(driver)) {
        //     subCategoryName = sexy.name;
        //   }
        // }

        // if (subCategoryName == "") {
        //   if (nonAcrade.drivers.includes(driver)) {
        //     subCategoryName = nonAcrade.name;
        //   }
        // }

        // if (subCategoryName == "") {
        //   if (classic.drivers.includes(driver)) {
        //     subCategoryName = classic.name;
        //   }
        // }

        // if (subCategoryName == "") {
        //   if (
        //     Number(index.year) <= 1984 ||
        //     index.year == "1980?" ||
        //     index.year == "198?" ||
        //     index.year == "19??"
        //   ) {
        //     subCategoryName = "Classic";
        //   }
        // }

        // if (subCategoryName == "") {
        //   for (let i = 0; i < manufacturerGroup.length; i++) {
        //     const subGroup = manufacturerGroup[i];
        //     for (let j = 0; j < subGroup.manufacturers.length; j++) {
        //       const pattern = subGroup.manufacturers[j];
        //       if (index.manufacturer.match(new RegExp(pattern, "gi"))) {
        //         subCategoryName = subGroup.name;
        //         break;
        //       }
        //     }
        //     if (subCategoryName != "") {
        //       break;
        //     }
        //   }
        // }

        if (subCategoryName == "") {
          if (index.diskName != "") {
            subCategoryName = "Misc (CHD)";
          } else {
            subCategoryName = "Misc";
          }
        }

        const item = createGameItem(romPath, index.gameName, subCategoryName);
        items.push(item);
      }
    }
  });

  return items;
};
