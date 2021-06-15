import { GameItemState } from "../states/gameItemState";
import lazy from "lazy.js";
import { ipcRenderer } from "electron";
import { AppEvent } from "../interfaces/AppEvent";
import { CategoryBookmark } from "../libs/constants";

export const ADD_TO_BOOKMARK = "ADD_TO_BOOKMARK";
export const REMOVE_FROM_BOOKMARK = "REMOVE_FROM_BOOKMARK";
export const CLEAR_ALL_BOOKMARK = "CLEAR_ALL_BOOKMARK";

export const addToBookmark = (
    ids: Array<number>,
    gameItem: GameItemState
) => {
    const bookmarkIds = lazy([...gameItem.bookmarkIds]).concat(ids).uniq().toArray();
    const { searchResults } = gameItem;
    ipcRenderer.sendSync(AppEvent.SET_BOOKMARK_IDS, bookmarkIds);
    return {
        type: ADD_TO_BOOKMARK,
        bookmarkIds,
        searchResults
    };
};

export const removeFromBookmark = (
    ids: Array<number>,
    gameItem: GameItemState
) => {
    const bookmarkIds = lazy([...gameItem.bookmarkIds]).reject(id => ids.includes(id)).toArray();
    let searchResults = [...gameItem.searchResults];
    if (gameItem.itemFilter.categoryName == CategoryBookmark) {
        searchResults = lazy(searchResults).reject(item => ids.includes(item.id)).toArray();
    }
    ipcRenderer.sendSync(AppEvent.SET_BOOKMARK_IDS, bookmarkIds);
    return {
        type: REMOVE_FROM_BOOKMARK,
        bookmarkIds,
        searchResults
    };
};



export const clearAllBookmark = (
    gameItem: GameItemState
) => {
    let bookmarkIds = [...gameItem.bookmarkIds];
    let searchResults = [...gameItem.searchResults];
    if (gameItem.itemFilter.categoryName == CategoryBookmark) {
        searchResults = lazy(searchResults).reject(item => bookmarkIds.includes(item.id)).toArray();
    }
    bookmarkIds = [];
    ipcRenderer.sendSync(AppEvent.SET_BOOKMARK_IDS, bookmarkIds);
    return {
        type: CLEAR_ALL_BOOKMARK,
        bookmarkIds,
        searchResults
    };
};


