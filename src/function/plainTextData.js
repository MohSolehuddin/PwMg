const fs = require("fs").promises;
const { encr, decr, mySHA3 } = require('./cryptojs');
const { key1, key2 } = require('./key');

//function menampilkan data json
async function plainTextData(title) {
  try {
    // mengambil data passwords dari file pw.json
    const data = await fs.readFile(`./private/pw.json`, 'utf8');
    // rubah data ke format objek
    let parseData = JSON.parse(data);
    // dekripsi dan filter data berdasarkan judul
    let decryptedData = parseData.passwords
      .filter(password => password.title.toUpperCase() === title.toUpperCase())
      .map(password => {
        let result= {};
        for (let prop in password) {
          if (password.hasOwnProperty(prop)) {
            if (prop != "id") {
              if (prop != "title") {
                result[prop] = decr(password[prop].encryptedData, key1(), key2(),password[prop].iv);
              }
            } else {
              console.log(result["Password"]);
              result[prop] = result["Password"] !== "" ? password[prop] : "username/password salah";
            }
          }
        }
        return result;
      });
    let obj = {};
    obj["passwords"] = decryptedData;
    console.log("decrypted Data berhasil di buat");
    return JSON.stringify(obj);
  } catch (e) {
    console.error(e);
  }
}

module.exports = plainTextData;
