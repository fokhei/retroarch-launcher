import { combineReducers } from "redux";
import appConfigReducer from "./appConfigReducer";
import gameItemReducer from "./gameItemReducer";
import explorerReducer from "./explorerReducer";
import scannerReducer from "./scannerReducer";
import mappingReducer from "./mappingReducer";

const rootReducer = combineReducers({
  appConfig: appConfigReducer,
  gameItem: gameItemReducer,
  explorer: explorerReducer,
  scanner: scannerReducer,
  mapping: mappingReducer,
});

export default rootReducer;
