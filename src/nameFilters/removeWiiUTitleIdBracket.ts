//remove  [01000A10041EA000].

export const removeWiiUTitleIdBracket = (str: string) => {
  var out = str.replace(/\s?\[([\w\d]{16})\]\s?/gi, "");
  return out;
};
