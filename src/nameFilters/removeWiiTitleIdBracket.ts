//remove  [01000A10041EA000].

export const removeWiiTitleIdBracket = (str: string) => {
    var out = str.replace(/\s?\[([\w\d]{6})\]\s?/gi, ""); 
    return out;
  };
  