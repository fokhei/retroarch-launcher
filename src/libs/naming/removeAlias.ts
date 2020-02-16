//remove  - 捷徑.ink

export const removeAlias = (str: string) => {
  var out = str.replace(/\s\-\s捷徑\.lnk/gi, "");
  return out;
};
