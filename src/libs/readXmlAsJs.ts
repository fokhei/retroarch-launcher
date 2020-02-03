import fs from "fs";
import convert from "xml-js";

const readXmlAsJs = (datPath: string): any => {
  const xml = fs.readFileSync(datPath, "utf8");
  const convertAny = convert.xml2js as any;
  return convertAny(xml, { compact: true, spaces: 4 });
};

export default readXmlAsJs;
