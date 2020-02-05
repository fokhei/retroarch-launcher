//remove (En,Fr,De,Es,It)

export const removeLangBracket = (str: string) => {
  var out = str.replace(/\s?\([En|Fr|De|Es|It|Nl|Sv|Ja|,]+\)\s?/gi, "");
  return out;
};


