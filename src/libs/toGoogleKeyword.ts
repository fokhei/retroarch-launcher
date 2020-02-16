import { removeAllBrackets } from './naming/removeAllBrackets';

export const toGoogleKeyword = (str: string) => {
  let keyword = removeAllBrackets(str);
  keyword = keyword.replace(/[\s]/gi, "+");
  keyword = encodeURIComponent(keyword);
  return keyword;
};
