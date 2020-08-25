import { ItemFilter, createItemFilter } from "../interfaces/itemFilter";
import { ExplorerConfig, createExplorerConfig } from "../states/explorerState";

export interface UIConfig {
  explorerConfig: ExplorerConfig;
  itemFilter: ItemFilter;
}

export const createUIConfig = (): UIConfig => {
  return {
    explorerConfig: createExplorerConfig(),
    itemFilter: createItemFilter(),
  };
};
