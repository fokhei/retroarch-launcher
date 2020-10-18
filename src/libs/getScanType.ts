import { SubCategory } from "../interfaces/Category";
import { ScanType } from "../interfaces/ScanType";

export const getScanType = (subCategory: SubCategory): ScanType => {
  if (subCategory.hasOwnProperty("scanType")) {
    return subCategory.scanType as ScanType;
  }
  return ScanType.FILE;
};
