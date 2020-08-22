import { ResultLayout } from "../interfaces/ResultLayout";

export interface ExplorerState {
  selectedItemId: number;
  layout: ResultLayout;
  gridSize: number;
  showPlayerPicker: boolean;
}

export const createExplorerState = (): ExplorerState => {
  return {
    selectedItemId: 0,
    layout: ResultLayout.SNAPSHOT,
    gridSize: 160,
    showPlayerPicker: false,
  };
};
