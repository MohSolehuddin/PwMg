const fs = require("fs");

//function untuk baca file json dan rubah ke Object
function ReadFileJsonAndChangeToObject(location) {
  const data = fs.readFileSync(`${location}`, "utf8");
  // rubah format json ke objek
  const parseData = JSON.parse(data);
  return parseData;
}

module.exports = ReadFileJsonAndChangeToObject;
