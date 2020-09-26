import { AnyAction } from "redux";
import update from "immutability-helper";
import { MappingState, createMappingState } from "../../states/mappingState";

export const fetchHandler = (
  state: MappingState = createMappingState(),
  action: AnyAction
): MappingState => {
  const { error, success, teknoParrot } = action;
  return update(state, {
    teknoParrot: { $set: teknoParrot },
    remotes: {
      fetch: {
        error: { $set: error },
        success: { $set: success },
      },
    },
  });
};
