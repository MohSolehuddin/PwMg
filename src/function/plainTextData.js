const fs = require("fs").promises;
const { encr, decr, mySHA3 } = require("./crypto");

//function menampilkan data json
async function plainTextData(title) {
  try {
    // mengambil data
    const data = await fs.readFile(`./private/pw.json`, "utf8");
    let parseData = JSON.parse(data);
    // decrypt dan filter data berdasarkan judul
    let decryptedData = parseData.passwords
      .filter(
        (password) => password.title.toUpperCase() === title.toUpperCase()
      )
      .map((password) => {
        let result = {};
        for (let prop in password) {
          if (password.hasOwnProperty(prop)) {
            if (prop != "id") {
              if (prop != "title") {
                result[prop] = decr(
                  password[prop].encryptedData,
                  global.username,
                  global.password,
                  password[prop].iv
                );
              }
            } else {
              result[prop] =
                result["Password"] !== ""
                  ? password[prop]
                  : "username/password salah";
            }
          }
        }
        return result;
      });
    let obj = {};
    obj["passwords"] = decryptedData;
    return JSON.stringify(obj);
  } catch (e) {
    console.error(e);
  }
}

module.exports = plainTextData;
