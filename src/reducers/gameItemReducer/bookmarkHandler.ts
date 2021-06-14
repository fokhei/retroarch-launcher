import { AnyAction } from "redux";
import update from "immutability-helper";
import { GameItemState, createGameItemState } from "../../states/gameItemState";


export const bookmarkHandler = (
    state: GameItemState = createGameItemState(),
    action: AnyAction
): GameItemState => {
    const { bookmarkIds, searchResults } = action;

    return update(state, {
        bookmarkIds: { $set: bookmarkIds },
        searchResults: { $set: searchResults }
    });
};
