export const toGoogleKeyword = (str: string) => {
  let keyword = str.replace(/[\s]/gi, "+");
  keyword = encodeURIComponent(keyword);
  return keyword;
};
