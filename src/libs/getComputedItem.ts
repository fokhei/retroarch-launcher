import { ComputedGameItem } from "../interfaces/ComputedGameItem";

export const getComputedItem = (
  itemsMap: {
    [id: string]: ComputedGameItem;
  },
  id: number
): ComputedGameItem => {
  const key = id.toString();
  if (itemsMap.hasOwnProperty(key)) {
    return itemsMap[key];
  }
  return null;
};
