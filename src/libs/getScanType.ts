import { Category } from "../interfaces/Category";
import { ScanType } from "../interfaces/ScanType";

export const getScanType = (category: Category): ScanType => {
  if (category.hasOwnProperty("scanType")) {
    return category.scanType as ScanType;
  }
  return ScanType.FILE;
};
