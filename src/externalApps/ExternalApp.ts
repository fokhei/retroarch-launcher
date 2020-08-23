export interface ExternalApp {
  name: string;
  execPath: string;
  params?: Array<string>;
  pickerFilters?: Array<string>;
}
