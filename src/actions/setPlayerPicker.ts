export const SET_PLAYER_PICKER = "SET_PLAYER_PICKER";

export const setPlayerPicker = (visible: boolean) => {
  return {
    type: SET_PLAYER_PICKER,
    visible,
  };
};
