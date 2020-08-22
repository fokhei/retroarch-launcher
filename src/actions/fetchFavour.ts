export const FETCH_FAVOUR = "FETCH_FAVOUR";

export const fetchFavour = (appDataDir: string) => {
  return {
    type: FETCH_FAVOUR,
    appDataDir,
  };
};
