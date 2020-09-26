import { MappingState } from "../states/mappingState";

export const getTeknoParrotProfile = (
  mapping: MappingState,
  gameName: string
): string => {
  const key = gameName;
  const found = mapping.teknoParrot.hasOwnProperty(key);
  // console.log("[getTeknoParrotProfile]", found, key, mapping);
  if (found) {
    return mapping.teknoParrot[key];
  } 
   
    
  
  return "";
};
