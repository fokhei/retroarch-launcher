import { combineReducers } from "redux";
import appConfigReducer from "./appConfigReducer";
import gameItemReducer from "./gameItemReducer";
import explorerReducer from "./explorerReducer";
import scannerReducer from "./scannerReducer";

const rootReducer = combineReducers({
  appConfig: appConfigReducer,
  gameItem: gameItemReducer,
  explorer: explorerReducer,
  scanner: scannerReducer,
});

export default rootReducer;
