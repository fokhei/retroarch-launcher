import { ComputedGameItem } from '../interfaces/ComputedGameItem';

export const TOGGLE_FAVOUR = "TOGGLE_FAVOUR";

export const toggleFavour = (
  item: ComputedGameItem
) => {
  return {
    type: TOGGLE_FAVOUR,
    item,
  };
};
