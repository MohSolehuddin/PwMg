const fs = require("fs");

function oldData() {
  const data = fs.readFileSync("./private/pw.json", "utf8");
  const parseData = JSON.parse(data);
  return parseData;
}
module.exports = oldData;
