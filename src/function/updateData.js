const fs = require("fs");
const { key1, key2 } = require('./key');
const oldData = require('./oldData');
const { encr } = require("./cryptojs")

// function untuk update data berdasarkan id
async function updateData(res, newData, OldData) {
    newData.id = Number(newData.id);
    const index = OldData.passwords.findIndex((data) => data.id == newData.id);

    if (index === -1) {
        console.log("Data tidak ditemukan");
        res.statusCode = 404;
        res.end("Data tidak ditemukan");
    }
    // Enkripsi data sensitif secara dinamis
    Object.keys(newData).forEach((property) => {
        // Lewati properti 'id' selama proses enkripsi
        if (property !== 'title' && property !== 'id') {
            // Enkripsi nilai properti
            newData[property] = encr(`${newData[property]}`, global.username, global.password);
        }
    });

    OldData.passwords.splice(index, 1, newData);

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
