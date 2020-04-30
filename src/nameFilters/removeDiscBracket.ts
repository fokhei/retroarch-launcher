//remove (Disc X)
//remove (UMD Disc X)
export const removeDiscBracket = (str: string) => {
  var out = str.replace(/\((UMD\s?)Disc\s?(\d{1})\)/gi, "");
  return out;
};


