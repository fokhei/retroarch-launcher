export const removeDoubleSpace = (str: string) => {
  let out = str.replace(/\s{2,}/gi, " ");
  out = out.trim();
  return out;
};
