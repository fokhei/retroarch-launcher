//remove [UCAS-40064]

export const removePspIdBracket = (str: string) => {
  var out = str.replace(/\s?\[(\w{4})(-?)(\d{5})\]\s?/gi, "");
  return out;
};
