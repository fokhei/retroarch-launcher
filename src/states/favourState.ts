export interface FavourState {
  list: Array<string>;
  fetch: {
    success: boolean;
    error: boolean;
  };
  updateAt: number;
}

export const createFavourState = (): FavourState => {
  return {
    list: [],
    fetch: {
      success: false,
      error: null,
    },
    updateAt: 0,
  };
};
