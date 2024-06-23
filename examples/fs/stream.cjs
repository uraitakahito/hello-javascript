const fs = require('node:fs');

const readStream = fs.createReadStream("./a.txt", {
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
