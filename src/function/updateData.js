const fs = require("fs");
const { key1, key2 } = require('./key');
const oldData = require('./oldData');
const {encr} = require("./cryptojs")

// function untuk update data berdasarkan id
async function updateData(res, id, title, name, username, pass, email, noHp) {
    if (!id || !title || !name || !username || !pass || !email || !noHp) {
        console.log("Input tidak lengkap");
        res.statusCode = 500;
        res.end("Data tidak lengkap");
        return;
    }

    let OldData = oldData();
    const index = OldData.passwords.findIndex((data) => data.id == Number(id));

    if (index === -1) {
        console.log("Data tidak ditemukan");
        res.statusCode = 404;
        res.end("Data tidak ditemukan");
    }

    // membuat struktur pass baru
    const updatedData = {
        id: OldData.passwords[index].id,
        title,
        name: encr(name, key1(), key2()),
        username: encr(username, key1(), key2()),
        pw: encr(pass, key1(), key2()),
        email: encr(email, key1(), key2()),
        no: encr(noHp, key1(), key2())
    };

    OldData.passwords.splice(index, 1, updatedData);

    fs.writeFile(
        "./private/pw.json",
        JSON.stringify(OldData),
        (err) => {
            if (err) {
                console.error("Gagal menulis ke file:", err);
                res.statusCode = 500;
                res.end("Gagal mengupdate data");
            } else {
                console.log("Data berhasil diupdate");
                res.statusCode = 302;
                res.setHeader('Location', '/home');
                res.end(); // Hanya perlu mengarahkan ulang tanpa pesan tambahan
            }
        }
    );
}
module.exports = updateData;
