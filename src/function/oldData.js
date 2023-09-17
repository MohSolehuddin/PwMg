const fs = require('fs') 

// function mendapatkan data lama
function oldData() {
    //mendapatkan data lama
    const data = fs.readFileSync("./private/pw.json", "utf8");
    // rubah data lama dari format json ke objek
    const parseData = JSON.parse(data);
    return parseData;
}
module.exports = oldData;