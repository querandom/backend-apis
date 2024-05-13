import fs from "fs";
import path from "path";
import os from "os";

const END_OF_LINE_CHARACTER = os.EOL;
const filePath = path.resolve(process.env.PWD!, process.env.MESSAGE_FILE!);

export async function clearData(): Promise<undefined> {
  return new Promise((res, rej) => {
    fs.writeFile(filePath, "", function (err) {
      if (err) {
        rej(err);
      } else {
        res(undefined);
      }
    });
  });
}

export async function writeLine(data: string): Promise<undefined> {
  return new Promise((res, rej) => {
    fs.appendFile(filePath, data + END_OF_LINE_CHARACTER, (err) => {
      if (err) {
        rej(err);
      } else {
        res(undefined);
      }
    });
  });
}

// returns an array of lines in the document
export async function readLines(): Promise<string[]> {
  return new Promise((res, rej) => {
    fs.readFile(filePath, "utf8", function (err, data) {
      if (err) {
        rej(err);
        return;
      }

      res(data.split(END_OF_LINE_CHARACTER));
    });
  });
}
