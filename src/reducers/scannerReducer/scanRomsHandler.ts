import { ScannerState, createScannerState } from "../../states/scannerState";
import { AnyAction } from "redux";
import update from "immutability-helper";

export const scanRomsStartHandler = (
  state: ScannerState | any = createScannerState(),
  action: AnyAction
): ScannerState => {
  // console.log("scanRomsStartHandler", action);
  return update(state, {
    categoryName: { $set: action.categoryName },
    success: { $set: false },
    error: { $set: null },
    datIndexes: { $set: null },
    items: { $set: [] },
  });
};

export const scanRomsSuccessHandler = (
  state: ScannerState | any = createScannerState(),
  action: AnyAction
): ScannerState => {
  // console.log("scanRomsSuccessHandler", action);
  return update(state, {
    success: { $set: true },
    datIndexes: { $set: action.datIndexes },
    items: { $set: action.items },
  });
};

export const scanRomsErrorHandler = (
  state: ScannerState | any = createScannerState(),
  action: AnyAction
): ScannerState => {
  // console.log("scanRomsErrorHandler", action);
  return update(state, {
    error: { $set: action.error },
  });
};
