import { GameItemState } from "../states/gameItemState";
import lazy from "lazy.js";
import { CategoryBookmark } from "../libs/categoryAll";

export const ADD_TO_BOOKMARK = "ADD_TO_BOOKMARK";
export const REMOVE_FROM_BOOKMARK = "REMOVE_FROM_BOOKMARK";
export const CLEAR_ALL_BOOKMARK = "CLEAR_ALL_BOOKMARK";

export const addToBookmark = (
    ids: Array<number>,
    gameItem: GameItemState
) => {
    const bookmarkIds = lazy([...gameItem.bookmarkIds]).concat(ids).uniq().toArray();
    const { searchResults } = gameItem
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
    return {
        type: CLEAR_ALL_BOOKMARK,
        bookmarkIds,
        searchResults
    };
};


