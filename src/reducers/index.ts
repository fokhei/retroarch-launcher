import { combineReducers } from "redux";
import appConfigReducer from "./appConfigReducer";
import gameItemReducer from "./gameItemReducer";
import explorerReducer from "./explorerReducer";
import scannerReducer from "./scannerReducer";
import favourReducer from "./favourReducer";
import mappingReducer from "./mappingReducer";

const rootReducer = combineReducers({
  appConfig: appConfigReducer,
  gameItem: gameItemReducer,
  explorer: explorerReducer,
  scanner: scannerReducer,
  favour: favourReducer,
  mapping: mappingReducer,
});

export default rootReducer;
