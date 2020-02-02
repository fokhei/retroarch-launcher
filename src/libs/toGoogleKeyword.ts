import { removeBrackets } from './removeBrackets';

export const toGoogleKeyword = (str: string) => {
  let keyword = removeBrackets(str);
  keyword = keyword.replace(/[\s]/gi, "+");
  keyword = encodeURIComponent(keyword);
  return keyword;
};
