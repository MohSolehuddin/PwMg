const fs = require("fs");

function ReadFileJsonAndChangeToObject(location) {
  const data = fs.readFileSync(`${location}`, "utf8");
  const parseData = JSON.parse(data);
  return parseData;
}

module.exports = ReadFileJsonAndChangeToObject;
