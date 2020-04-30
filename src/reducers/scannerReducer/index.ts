import { AnyAction } from "redux";
import { ScannerState, createScannerState } from "../../states/scannerState";
import { SHOW_SCANNER } from "../../actions/showScanner";
import { showScannerHandler } from "./visibleHandler";
import { HIDE_SCANNER } from "../../actions/hideScanner";
import { hideScannerHandler } from "./visibleHandler";
import {
  SCAN_ROMS_START,
  SCAN_ROMS_SUCCESS,
  SCAN_ROMS_ERROR,
} from "../../actions/scanRoms";
import {
  scanRomsStartHandler,
  scanRomsSuccessHandler,
  scanRomsErrorHandler,
} from "./scanRomsHandler";

const scannerReducer = (
  state: ScannerState | any = createScannerState(),
  action: AnyAction
): ScannerState => {
  switch (action.type) {
    case SHOW_SCANNER:
      return showScannerHandler(state, action);
    case HIDE_SCANNER:
      return hideScannerHandler(state, action);
    case SCAN_ROMS_START:
      return scanRomsStartHandler(state, action);
    case SCAN_ROMS_SUCCESS:
      return scanRomsSuccessHandler(state, action);
    case SCAN_ROMS_ERROR:
      return scanRomsErrorHandler(state, action);
    default:
      return state;
  }
};
export default scannerReducer;
