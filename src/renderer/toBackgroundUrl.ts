export const toBackgroundUrl = (filePath: string) => {
  let bg = filePath.replace(/\'/, "\\'");
  bg = bg.replace(/#/, "%23");

  return `url('${bg}')`;
};
 