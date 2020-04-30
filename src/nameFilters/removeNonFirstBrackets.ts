export const removeNonFirstBrackets = (str: string) => {
  let out = str;
  const matches = out.match(/([\)\]])(\s?[\(\[].+[\)\]].?)/gi);
  if (matches) {
    const found = matches.toString();
    const tail = found.substr(0, 1);
    out = out.replace(found, tail);
  }

  return out;
};
