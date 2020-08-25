import { AnyAction } from "redux";
import update from "immutability-helper";
import { ExplorerState, createExplorerState } from "../../states/explorerState";
import { ipcRenderer } from "electron";
import { AppEvent } from "../../interfaces/AppEvent";

export const explorerConfigHandler = (
  state: ExplorerState = createExplorerState(),
  action: AnyAction
): ExplorerState => {
  ipcRenderer.sendSync(AppEvent.SET_EXPLORER_CONFIG, action.explorerConfig);
  return update(state, {
    explorerConfig: { $set: action.explorerConfig },
  });
};
