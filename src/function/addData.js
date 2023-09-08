const fs = require('fs')
const oldData = require("./oldData");
const {encr, decr, mySHA3,} = require('./cryptojs');

// menambahkan data berdasarkan kategori
function addData(res, title, name, username, pass, email, noHp) {
    let oldDataObj = oldData();
    // dapatkan waktu terkini untuk di jadikan id dalam sebuah data
    const time = new Date();
    //cek no hp
    if (!noHp) {
        noHp = "_";
    }
    // cek email
    if (!email) {
        email = "_";
    }
    // membuat struktur pass baru
    const newData = {
        id: time.getTime(),
        title: title,
        name: encr(name, key1, key2),
        username: encr(username, key1, key2),
        pw: encr(pass, key1, key2),
        email: encr(email, key1, key2),
        no: encr(noHp, key1, key2)
    };
    console.log(newData);
    oldDataObj.passwords.push(newData);
    fs.writeFile(
        "/sdcard/PwMg/private/pw.json",
        JSON.stringify(oldDataObj),
        (err) => {
            if (err) {
                console.log("password gagal di tambahkan!!");
            } else {
                res.statusCode = 302;
                res.setHeader('Location', '/home');
                res.end();
                console.log("password berhasil di tambahkan");
            }
        }
    );
}
module.exports = addData;