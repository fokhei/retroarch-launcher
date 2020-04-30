import { DatIndexes } from "../interfaces/DatIndexes";
import { GameItem } from "../interfaces/GameItem";

export interface ScannerState {
  visible: boolean;
  categoryName: string;
  success: boolean;
  error: any;
  datIndexes: DatIndexes;
  items: Array<GameItem>;
}

export const createScannerState = (): ScannerState => {
  return {
    visible: false,
    categoryName: "",
    success: false,
    error: null,
    datIndexes: null,
    items: [],
  };
};
