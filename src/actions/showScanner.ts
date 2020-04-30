export const SHOW_SCANNER = "SHOW_SCANNER";

export const showScanner = (categoryName: string) => {
  return {
    type: SHOW_SCANNER,
    categoryName,
  };
};
