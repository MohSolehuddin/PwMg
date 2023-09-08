const fs = require("fs").fs;
const {encr, decr, mySHA3,} = require('./cryptojs');

//function menampilkan data json
async function plainTextData(title) {
  try {
    // mengambil data passwords dari file pw.json
    const data = await fs.promises.readFile(`/sdcard/PwMg/private/pw.json`, 'utf8');
    // rubah data ke format objek
    let parseData = JSON.parse(data);
    console.log("parseData", parseData);
    console.log("parseData", key1);
    // dekripsi dan filter data berdasarkan judul
    let decryptedData = await parseData.passwords
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
    console.log("obj:", obj);
    await fs.promises.writeFile(
        "/sdcard/PwMg/private/decryptPw.json",JSON.stringify(obj),
        (err) => {
            if (err) {
                console.log(err);
            } else {
              console.log("file passwords decryptedData berhasil di buat");
            }
        }
    );
  } catch (e) {
    console.error("Error:", e)
  }
}

module.exports = plainTextData;