import { GameItem } from "./GameItem";

export interface ComputedGameItem extends GameItem {
  id: number;
  categoryName: string;
  thumbnailDir: string;
  thumbnails: {
    [key: string]: string;
  };
  updateAt: number;
}
