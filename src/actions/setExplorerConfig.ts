import { ExplorerConfig } from "../states/explorerState";

export const SET_EXPLORER_CONFIG = "SET_EXPLORER_CONFIG";

export const setExplorerConfig = (explorerConfig: ExplorerConfig) => {
  return {
    type: SET_EXPLORER_CONFIG,
    explorerConfig,
  };
};
