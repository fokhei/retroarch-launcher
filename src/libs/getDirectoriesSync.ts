const { readdirSync } = require("fs");
import * as path from "path";

export const getDirectoriesSync = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => path.resolve(source, dirent.name));
