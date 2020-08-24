import { AnyAction } from "redux";
import update from "immutability-helper";
import { ExplorerState, createExplorerState } from "../../states/explorerState";

export const esExporterHandler = (
  state: ExplorerState = createExplorerState(),
  action: AnyAction
): ExplorerState => {
  return update(state, {
    showESExporter: { $set: action.visible },
  });
};
