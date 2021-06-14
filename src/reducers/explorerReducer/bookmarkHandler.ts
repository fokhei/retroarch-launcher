import { AnyAction } from "redux";
import update from "immutability-helper";
import { ExplorerState, createExplorerState } from "../../states/explorerState";


export const bookmarkHandler = (
    state: ExplorerState = createExplorerState(),
    action: AnyAction
): ExplorerState => {

    const explorerConfig = { ...state.explorerConfig, selectedItemId: 0 };

    return update(state, {
        explorerConfig: { $set: explorerConfig },
    });
};
