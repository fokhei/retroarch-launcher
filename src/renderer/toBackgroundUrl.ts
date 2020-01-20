export const toBackgroundUrl = (filePath: string) => {
  let bg = filePath.replace(/\'/, "\\'");
  return `url('${bg}')`;
};
 