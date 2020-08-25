import { AnyAction } from "redux";
import update from "immutability-helper";
import { ExplorerState, createExplorerState } from "../../states/explorerState";
import { UIConfig } from "../../libs/uiConfig";

export const uiConfigHandler = (
  state: ExplorerState = createExplorerState(),
  action: AnyAction
): ExplorerState => {
  const config = action.config as UIConfig;

  return update(state, {
    explorerConfig: { $set: config.explorerConfig },
    fetched: { $set: true },
  });
};
