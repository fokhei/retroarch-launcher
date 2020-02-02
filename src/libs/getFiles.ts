import { promisify } from "util";
import { resolve } from "path";
import fs from "fs";

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

export const getFiles = async (dir: string) => {
  const subdirs = await readdir(dir);
  const files = await Promise.all(
    subdirs.map(async (subdir: string) => {
      const res = resolve(dir, subdir);
      return (await stat(res)).isDirectory() ? getFiles(res) : res;
    })
  );
  return files.reduce((a: Array<string>, f: Array<string>) => a.concat(f), []);
};
