import { AnyAction } from "redux";
import update from "immutability-helper";
import { MappingState, createMappingState } from "../../states/mappingState";

export const scanTeknoParrotProfilesHandler = (
  state: MappingState = createMappingState(),
  action: AnyAction
): MappingState => {
  return update(state, {
    teknoParrot: { $set: action.teknoParrot },
  });
};
