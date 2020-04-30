export const SET_GRID_SIZE = "SET_GRID_SIZE";

export const setGridSize = (gridSize: number) => {
  return {
    type: SET_GRID_SIZE,
    gridSize,
  };
};
