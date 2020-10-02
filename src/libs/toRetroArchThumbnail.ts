export const toRetroArchThumbnail = (label: string) => {
  let img = label.replace(/[&*/:`<>?\\|\"]/gi, "_");
  return img + ".png";
};
