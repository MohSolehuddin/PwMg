const fs = require("fs").promises;
const { encr, decr, mySHA3 } = require('./cryptojs');
const { key1, key2, session } = require('./key');

//function menampilkan data json
async function plainTextData(title) {
  try {
    // mengambil data passwords dari file pw.json
    const data = await fs.readFile(`/sdcard/PwMg/private/pw.json`, 'utf8');
    // rubah data ke format objek
    let parseData = JSON.parse(data);
    // dekripsi dan filter data berdasarkan judul
    let decryptedData = parseData.passwords
      .filter(password => password.title === title)
      .map(password => {
        return {
          id: password.id,
          name: decr(password.name, key1, key2),
          username: decr(password.username, key1, key2),
          pw: decr(password.pw, key1, key2),
          email: decr(password.email, key1, key2),
          no: decr(password.no, key1, key2)
        };
      });
    let obj = {};
    obj["passwords"] = decryptedData;
    console.log("decrypted Data berhasil di buat");
    return JSON.stringify(obj);
  } catch (e) {
    console.error("Error:", e);
  }
}

module.exports = plainTextData;
