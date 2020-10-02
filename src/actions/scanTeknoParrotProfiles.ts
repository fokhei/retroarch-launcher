import fs from "fs";
import * as path from "path";
import { AppConfigState } from "../states/appConfigState";
import { NotificationManager } from "react-notifications";
import { getFiles } from "../libs/getFiles";
import readXmlAsJs from "../libs/readXmlAsJs";
import { MappingState } from "../states/mappingState";
import { removeSymbolForFileName } from "../nameFilters/removeSymbolForFileName";
import { removeDoubleSpace } from "../nameFilters/removeDoubleSpace";

export const SCAN_TEKNOPARROT_PROFILES_SUCCESS =
  "SCAN_TEKNOPARROT_PROFILES_SUCCESS";

export const scanTeknoParrotProfiles = (
  appConfig: AppConfigState,
  mapping: MappingState
) => {
  const filePath = path.resolve(appConfig.teknoParrotDir, "GameProfiles");

  const onError = (error: any) => {
    NotificationManager.error(
      error.toString(),
      "Fail to fetch TeknoParrot Profiles"
    );
  };

  return (dispatch) => {
    if (!fs.existsSync(filePath)) {
      onError(`File not found: ${filePath}`);
    } else {
      let next: any = { ...mapping, teknoParrot: {} };
      delete next.remotes;

      getFiles(filePath)
        .then((files: Array<string>) => {
          files.map((file) => {
            const xml = readXmlAsJs(file);
            const profileName = path.basename(file);
            const gameName = xml.GameProfile.GameName._text;
            const romFolderName = removeDoubleSpace(
              removeSymbolForFileName(gameName)
            );
          
            next.teknoParrot[romFolderName] = profileName;
          });
          // console.log(mapping);
          const dist = path.resolve(appConfig.appDataDir, "mapping.json");

          fs.writeFileSync(dist, JSON.stringify(next));
          NotificationManager.success("Fetch success!");
          dispatch(scanTeknoParrotProfilesSuccess(next.teknoParrot));
        })
        .catch((err: any) => {
          onError(err);
        });
    }
  };
};

const scanTeknoParrotProfilesSuccess = (teknoParrot: any) => {
  return {
    type: SCAN_TEKNOPARROT_PROFILES_SUCCESS,
    teknoParrot,
  };
};
