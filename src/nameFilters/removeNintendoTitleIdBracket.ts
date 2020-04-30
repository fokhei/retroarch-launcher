//remove  [01000A10041EA000].

export const removeNintendoTitleIdBracket = (str: string) => {
  var out = str.replace(/\s?\[([ABCDEF\d]{16})\]\s?/gi, "");
  return out;
};
