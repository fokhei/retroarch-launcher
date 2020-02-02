//remove (Disc X)

export const removeDiscBracket = (str: string) => {
  var out = str.replace(/\s?\(Disc (\d{1})\)\s?/gi, "");
  return out;
};
