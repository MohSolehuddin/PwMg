const fs = require("fs");
const { encr } = require("./crypto");

function addData(res, newData, oldDataObj) {
  // Dapatkan waktu saat ini untuk digunakan sebagai ID dalam data
  newData.id = new Date().getTime();

  // Buat salinan newData untuk mengenkripsi data tanpa memodifikasi newData asli
  const encryptedData = { ...newData };

  // Enkripsi data sensitif secara dinamis
  Object.keys(encryptedData).forEach((property) => {
    // Lewati properti 'id' selama proses enkripsi
    if (property !== "title" && property !== "id") {
      // Enkripsi nilai properti
      encryptedData[property] = encr(
        `${encryptedData[property]}`,
        global.username,
        global.password
      );
    }
  });

  // Perbarui objek data yang ada
  oldDataObj.passwords.push(encryptedData);

  // Tulis objek data yang diperbarui ke file
  fs.writeFile("../PwMg/private/pw.json", JSON.stringify(oldDataObj), (err) => {
    if (err) {
      console.error("Error menambahkan password:", err);
      res.statusCode = 500; // Internal Server Error
      res.end("Internal Server Error");
    } else {
      res.statusCode = 302;
      res.setHeader("Location", "/home");
      res.end();
      console.log("Password berhasil ditambahkan");
    }
  });
}

module.exports = addData;
