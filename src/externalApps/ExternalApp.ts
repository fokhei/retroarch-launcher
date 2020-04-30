import { ExternalAppType } from "./ExternalAppType";

export interface ExternalApp {
  type: ExternalAppType;
  execPath: string;
  coreDir?: string;
}
