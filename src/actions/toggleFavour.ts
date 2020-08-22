export const TOGGLE_FAVOUR = "TOGGLE_FAVOUR";

export const toggleFavour = (
  romPath: string
) => {
  return {
    type: TOGGLE_FAVOUR,
    romPath,
  };
};
