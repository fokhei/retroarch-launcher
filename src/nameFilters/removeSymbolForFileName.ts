export const removeSymbolForFileName = (str: string) => {
  let out = str.replace(/[&*/:`<>?\\|]/gi, "");
  out = out.trim();
  if (out.endsWith(".")) {
    out = out.substr(0, out.length-1);
  }
  return out;
};
