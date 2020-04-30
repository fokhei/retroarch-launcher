export const SET_ITEM_ID = "SET_ITEM_ID";

export const setItemId = (selectedItemId: number) => {
  return {
    type: SET_ITEM_ID,
    selectedItemId,
  };
};
