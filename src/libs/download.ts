import fs from "fs";
import request from "request";
export const download = (
  uri: string,
  filename: string,
  callback: (err: any) => void
) => {
  request.head(uri, (_err: any, res: any, _body: any) => {
    if (!res || !res.headers || !res.headers["content-length"]) {
      callback(new Error("Fail to download"));
    } else {
      request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
    }
  });
};
