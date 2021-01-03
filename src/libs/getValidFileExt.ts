export const getValidFileExt = (filePath: string): string => {
  const reg = /\.([0-9a-z]+)(?:[\?#]|$)/i;
  const matchs = filePath.match(reg);
  if (matchs) {
    return matchs[0];
  }
  return "";
};
