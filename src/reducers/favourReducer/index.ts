import { AnyAction } from "redux";
import { FavourState, createFavourState } from "../../states/favourState";
import { TOGGLE_FAVOUR } from "../../actions/toggleFavour";
import { toggleHandler } from "./toggleHandler";
import { FETCH_FAVOUR } from "../../actions/fetchFavour";
import { fetchHandler } from "./fetchHandler";

const explorerReducer = (
  state: FavourState | any = createFavourState(),
  action: AnyAction
): FavourState => {
  switch (action.type) {
    case TOGGLE_FAVOUR:
      return toggleHandler(state, action);
    case FETCH_FAVOUR:
      return fetchHandler(state, action);
    default:
      return state;
  }
};
export default explorerReducer;
