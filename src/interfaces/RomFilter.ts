export interface RomFilter {
  excludeBios?: boolean;
  excludeNonFirstDisc?: boolean;
  includeRomOfs?: Array<string>;
  excludeRomOfs?: Array<string>;
  excludeBeta?: boolean;
  excludeProto?: boolean;
  excludeSample?: boolean;
  excludeDemo?: boolean;
  includeStatus?: Array<string>;
  includeExts?: Array<string>;
}
