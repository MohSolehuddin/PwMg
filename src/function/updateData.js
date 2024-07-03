const fs = require("fs");
const { encr } = require("./crypto");

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
    // Lewati id
    if (property !== "title" && property !== "id") {
      // enkripsi hanya jika ada data
      if (newData[property].trim() !== "") {
        // Enkripsi nilai properti
        newData[property] = encr(
          `${newData[property]}`,
          global.username,
          global.password
        );
      } else {
        delete newData[property];
      }
    }
  });

  OldData.passwords.splice(index, 1, newData);

  fs.writeFile("./private/pw.json", JSON.stringify(OldData), (err) => {
    if (err) {
      res.writeHead(302, { "Content-Type": "text/json" });
      res.write(
        JSON.stringify({ success: false, message: "Gagal menambahkan data" })
      );
      res.end();
    } else {
      res.writeHead(200, { "Content-Type": "text/json" });
      res.write(
        JSON.stringify({ success: true, message: "Berhasil menambahkan data" })
      );
      res.end();
    }
  });
}
module.exports = updateData;
