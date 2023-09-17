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
      .filter(password => password.title === title)
      .map(password => {
        return {
          id: password.id,
          name: decr(password.name.encryptedData, key1(), key2(),password.name.iv),
          username: decr(password.username.encryptedData, key1(), key2(), password.username.iv),
          pw: decr(password.pw.encryptedData, key1(), key2(),password.pw.iv),
          email: decr(password.email.encryptedData, key1(), key2(),password.email.iv),
          no: decr(password.no.encryptedData, key1(), key2(), password.no.iv)
        };
      });
    let obj = {};
    obj["passwords"] = decryptedData;
    console.log("decrypted Data berhasil di buat");
    return JSON.stringify(obj);
  } catch (e) {
    console.log("gagal mendapatkan data password, tolong login dengan username dan password yang benar, ingat bahwa passworddan username deckripsi tidak dapat di rubah, jika ingin merubah harus ingat dulu password dan username yang dulu");
  }
}

module.exports = plainTextData;
