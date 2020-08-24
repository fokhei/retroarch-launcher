import { ScannerState, createScannerState } from "../../states/scannerState";
import { AnyAction } from "redux";
import update from "immutability-helper";

export const showScannerHandler = (
  state: ScannerState = createScannerState(),
  action: AnyAction
): ScannerState => {
  return update(state, {
    categoryName: { $set: action.categoryName },
    visible: { $set: true },
  });
};

export const hideScannerHandler = (
  state: ScannerState = createScannerState(),
  _action: AnyAction
): ScannerState => {
  return update(state, {
    visible: { $set: false },
  });
};
