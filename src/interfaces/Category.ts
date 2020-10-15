import { RomFilter } from "./RomFilter";
import { NameFilter } from "./NameFilter";
import { ScanType } from "./ScanType";
import { Player } from "../externalApps/Player";
import { DatParser } from "./DatPaser";

export interface Category {
  name: string;
  thumbnailDir: string;
  shortName: string;
  romsPath: string;
  scanType?: ScanType;
  scanExts?: Array<string>;
  datPath?: string;
  datParser?: DatParser;
  romFilter?: RomFilter;
  nameFilter?: NameFilter;
  players?: Array<Player>;
}
