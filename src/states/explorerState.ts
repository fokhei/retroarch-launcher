import { ResultLayout } from "../interfaces/ResultLayout";

export interface ExplorerConfig {
  selectedItemId: number;
  layout: ResultLayout;
  gridSize: number;
}

export interface ExplorerState {
  explorerConfig: ExplorerConfig;
  showPlayerPicker: boolean;
  showESExporter: boolean;
  fetched: boolean;
}

export const createExplorerConfig = (): ExplorerConfig => {
  return {
    selectedItemId: 0,
    layout: ResultLayout.SNAPSHOT,
    gridSize: 160,
  };
};

export const createExplorerState = (): ExplorerState => {
  return {
    explorerConfig: createExplorerConfig(),
    showPlayerPicker: false,
    showESExporter: false,
    fetched: false,
  };
};
