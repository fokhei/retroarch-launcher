import { AppConfigState, createAppConfigState } from "./appConfigState";
import { ScannerState, createScannerState } from "./scannerState";
import { ExplorerState, createExplorerState } from "./explorerState";
import { GameItemState, createGameItemState } from "./gameItemState";
import { FavourState, createFavourState } from "./favourState";
import { createMappingState, MappingState } from "./mappingState";

export interface RootState {
  appConfig: AppConfigState;
  gameItem: GameItemState;
  explorer: ExplorerState;
  scanner: ScannerState;
  favour: FavourState;
  mapping: MappingState;
}

export const createRootState = (): RootState => {
  return {
    appConfig: createAppConfigState(),
    gameItem: createGameItemState(),
    explorer: createExplorerState(),
    scanner: createScannerState(),
    favour: createFavourState(),
    mapping: createMappingState(),
  };
};
