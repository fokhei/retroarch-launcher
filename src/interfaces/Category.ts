import { RomFilter } from "./RomFilter";
import { NameFilter } from "./NameFilter";
import { ScanType } from "./ScanType";
import { Player } from "../externalApps/Player";
import { DatParser } from "./DatPaser";
import { DigOption } from "./DigOption";

export interface SubCategory {
  name: string;
  romsPath: string;
  scanType?: ScanType;
  scanExts?: Array<string>;
  romFilter?: RomFilter;
  nameFilter?: NameFilter;
  isArchive?: boolean;
  isFavour?: boolean;
  teknoParrotIntegration?: boolean;
}

export interface Category extends SubCategory {
  thumbnailDir: string;
  shortName: string;
  dig: DigOption;
  theGamsDbPlatform?: number;
  datPath?: string;
  datParser?: DatParser;
  players?: Array<Player>;
  subCategories: Array<SubCategory>;
  subCategoriesMap: Record<string, SubCategory>;
  rowIndex: number;
}
