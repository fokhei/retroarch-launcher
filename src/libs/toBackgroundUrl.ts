export const toBackgroundUrl = (filePath: string, cacheId?:number) => {
  let bg = filePath.replace(/\\/gi, "\/");
  bg = bg.replace(/\'/gi, "\\'");
  bg = bg.replace(/#/gi, "%23");
  if (cacheId){
    bg += `?${cacheId}`;
  }
  return `url('${bg}')`;
};
