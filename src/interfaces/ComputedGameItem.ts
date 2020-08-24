import { GameItem } from "./GameItem";

export interface ComputedGameItem extends GameItem {
  id: number;
  key: string;
  categoryName: string;
  thumbnailDir: string;
  thumbnails: {
    [key: string]: string;
  };
  updateAt: number;
}
