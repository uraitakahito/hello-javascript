import fs from 'node:fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const target = path.join(__dirname, 'a.txt');

const readStream = fs.createReadStream(target, {
  highWaterMark: 2
});
readStream.on("end", function () {
  // This may not been called since we are destroying the stream
  console.log("end: All the data in the file has been read");
});
readStream.on("close", function(err) {
  console.log("close: Stream has been destroyed and file has been closed");
});
let i = 0
readStream.on("readable", () => {
  let chunck
  while (true) {
    i++
    chunck = readStream.read()
    if (chunck == null) break
    console.log(i + " " + chunck.toString())
  }
});
