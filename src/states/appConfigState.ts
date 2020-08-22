import { Category } from "../interfaces/Category";
import { ExternalApp } from '../externalApps/ExternalApp';

export interface AppConfigState {
  gamelistPath: string;
  thumbnailPath: string;
  externalApps: Array<ExternalApp>;
  categories: Array<Category>;
  fetch: {
    success: boolean;
    error: boolean;
  };
}

export const createAppConfigState = (): AppConfigState => {
  return {
    gamelistPath: "./playlists",
    thumbnailPath: "./thumbnails",
    externalApps: [],
    categories: [],
    fetch: {
      success: false,
      error: null,
    },
  };
};
