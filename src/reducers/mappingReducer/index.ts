import { AnyAction } from "redux";
import { MappingState, createMappingState } from "../../states/mappingState";
import { FETCH_MAPPING } from "../../actions/fetchMapping";
import { fetchHandler } from "./fetchHandler";
import { SCAN_TEKNOPARROT_PROFILES_SUCCESS } from "../../actions/scanTeknoParrotProfiles";
import { scanTeknoParrotProfilesHandler } from "./scanTeknoParrotProfilesHandler";

const mappingReducer = (
  state: MappingState = createMappingState(),
  action: AnyAction
): MappingState => {
  switch (action.type) {
    case FETCH_MAPPING:
      return fetchHandler(state, action);
    case SCAN_TEKNOPARROT_PROFILES_SUCCESS:
      return scanTeknoParrotProfilesHandler(state, action);
    default:
      return state;
  }
};
export default mappingReducer;
