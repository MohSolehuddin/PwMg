const fs = require("fs");
const oldData = require("./oldData");

// function hapus data berdasarkan id
async function deleteData(res, id) {
    let OldData = oldData();
    const index = OldData.passwords.findIndex((data) => data.id === Number(id));
    
    if (index === -1) {
        console.log("Data tidak ditemukan");
        return;
    }

    OldData.passwords.splice(index, 1);

    fs.writeFile(
        "/sdcard/PwMg/private/pw.json",
        JSON.stringify(OldData),
        (err) => {
            if (err) {
              console.log("password gagal dihapus!!");
            } else {
              res.statusCode = 302;
              res.setHeader('Location', '/home');
              res.end();
              console.log("password berhasil dihapus");
            }
        }
    );
}

module.exports = deleteData;