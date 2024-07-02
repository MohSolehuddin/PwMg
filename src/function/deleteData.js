const fs = require("fs");
const oldData = require("./oldData");

// function hapus data berdasarkan id
async function deleteData(id) {
  let OldData = oldData();
  const index = OldData.passwords.findIndex((data) => data.id === Number(id));

  if (index === -1) {
    return { status: false, message: "Data tidak di temukan" };
  }

  OldData.passwords.splice(index, 1);

  return new Promise((res, rej) => {
    fs.writeFile("./private/pw.json", JSON.stringify(OldData), (err) => {
      if (err) {
        rej({ status: false, message: "Password gagal di hapus" });
      } else {
        res({ status: true, message: "Password berhasil di hapus" });
      }
    });
  });
}

module.exports = deleteData;
