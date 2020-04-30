import { removeAllBrackets } from "../nameFilters/removeAllBrackets";
import { removeThe } from "../nameFilters/removeThe";

export const toGoogleKeyword = (str: string) => {
  let keyword = removeAllBrackets(str);
  keyword = removeThe(keyword);
  keyword = keyword.replace(/\s\-\s/gi, "+");
  keyword = keyword.replace(/\s\:\s/gi, "+");
  keyword = keyword.replace(/[\s]/gi, "+");
  keyword = keyword.replace(/\+{2}/gi, "+");
  keyword = encodeURIComponent(keyword);
  return keyword;
};
