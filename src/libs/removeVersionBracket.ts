//remove (1.0.0)

export const removeVersionBracket = (str: string) => {
  var out = str.replace(/\s?\([\d\.\w]+\)\s?/gi, "");
  out = out.replace(/\sv[\d\.]+/gi, "");
  return out;
};
