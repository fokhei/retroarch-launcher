import { AnyAction } from "redux";
import update from "immutability-helper";
import { ExplorerState, createExplorerState } from "../../states/explorerState";

export const digExporterHandler = (
  state: ExplorerState = createExplorerState(),
  action: AnyAction
): ExplorerState => {
  return update(state, {
    showDigExporter: { $set: action.visible },
  });
};
