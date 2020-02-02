//remove (En,Fr,De,Es,It)

export const removeLangBracket = (str: string) => {
  var out = str.replace(/\s?\([En|Fr|De|Es|It|,]+\)\s?/gi, "");
  return out;
};


