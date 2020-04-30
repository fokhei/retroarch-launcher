import { ResultLayout } from "../interfaces/ResultLayout";

export const SET_LAYOUT = "SET_LAYOUT";

export const setLayout = (layout: ResultLayout) => {
  return {
    type: SET_LAYOUT,
    layout,
  };
};
