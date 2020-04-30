//remove  ", The"

export const removeThe = (str: string) => {
  return str.replace(/,\sThe/gi, "");
};
