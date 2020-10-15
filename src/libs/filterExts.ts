import { extname } from "path";

export const filterExts = (files: Array<string>, exts: Array<string> = []) => {
  if (exts && exts.length) {
    return [...files].filter((file) => {
      const ext = extname(file);
      return exts.includes(ext);
    });
  }
  return files;
};
