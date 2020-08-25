import { AnyAction } from "redux";
import update from "immutability-helper";
import { ExplorerState, createExplorerState } from "../../states/explorerState";
import { ipcRenderer } from "electron";
import { AppEvent } from "../../interfaces/AppEvent";
import { ComputedGameItem } from "../../interfaces/ComputedGameItem";
import lazy from "lazy.js";

export const searchHandler = (
  state: ExplorerState = createExplorerState(),
  action: AnyAction
): ExplorerState => {
  const searchResults = action.searchResults as Array<ComputedGameItem>;
  const { selectedItemId } = state.explorerConfig;
  if (selectedItemId) {
    const ids = lazy(searchResults).pluck("id").toArray();
    if (!ids.includes(selectedItemId)) {
      const next = update(state, {
        explorerConfig: {
          selectedItemId: { $set: 0 },
        },
      });
      ipcRenderer.sendSync(AppEvent.SET_EXPLORER_CONFIG, next.explorerConfig);
      return next;
    } else {
      return state;
    }
  } else {
    return state;
  }
};
