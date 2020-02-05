import { removeBrackets } from './removeAllBrackets';

export const toGoogleKeyword = (str: string) => {
  let keyword = removeBrackets(str);
  keyword = keyword.replace(/[\s]/gi, "+");
  keyword = encodeURIComponent(keyword);
  return keyword;
};
