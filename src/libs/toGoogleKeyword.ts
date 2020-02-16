import { removeAllBrackets } from './nameFilters/removeAllBrackets';

export const toGoogleKeyword = (str: string) => {
  let keyword = removeAllBrackets(str);
  keyword = keyword.replace(/[\s]/gi, "+");
  keyword = encodeURIComponent(keyword);
  return keyword;
};
