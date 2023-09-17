const fs = require("fs");
const {key1,key2} = require('./key');
// function untuk update data berdasarkan id
async function updateData(res, id, title, username, pass, email, noHp) {
    let OldData = oldData();
    const index = OldData.passwords.findIndex((data) => data.id === Number(id));

    if (index === -1) {
        console.log("Data tidak ditemukan");
        return;
    }

    // membuat struktur pass baru
    const updatedData = {
        id: OldData.passwords[index].id,
        title: title,
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
                console.log("password gagal diupdate!!");
            } else {
              res.statusCode = 302;
              res.setHeader('Location', '/home');
              res.end();
              console.log("password berhasil diupdate");
            }
        }
    );
}

module.exports = updateData;
