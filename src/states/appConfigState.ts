import { Category } from "../interfaces/Category";
import { ExternalApp } from "../externalApps/ExternalApp";

export interface AppConfigState {
  appDataDir: string;
  thumbnailPath: string;
  teknoParrotDir: string;
  externalApps: Array<ExternalApp>;
  categories: Array<Category>;
  remotes: {
    dir: {
      success: boolean;
      error: any;
    };
    externalApps: {
      success: boolean;
      error: any;
    };
    categories: {
      success: boolean;
      error: any;
    };
  };
}

export const createAppConfigState = (): AppConfigState => {
  return {
    appDataDir: "",
    thumbnailPath: "",
    teknoParrotDir: "",
    externalApps: [],
    categories: [],
    remotes: {
      dir: {
        success: false,
        error: null,
      },
      externalApps: {
        success: false,
        error: null,
      },
      categories: {
        success: false,
        error: null,
      }
    },
  };
};
