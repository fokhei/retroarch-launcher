export interface MappingState {
  teknoParrot: {
    [key: string]: string;
  };
  remotes: {
    fetch: {
      success: boolean;
      error: any;
    };
  };
}

export const createMappingState = (): MappingState => {
  return {
    teknoParrot: {},
    remotes: {
      fetch: {
        success: false,
        error: null,
      },
    },
  };
};
