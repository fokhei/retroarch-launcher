export const removeAllBrackets = (str: string) => {
  let out = str.replace(/\[.+\]/gi, "");
  out = out.replace(/\(.+\)/gi, "");
  out = out.replace(/\s{2,}/gi, " ");
  out = out.trim();
  return out;
};
