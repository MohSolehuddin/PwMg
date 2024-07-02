const fs = require("fs");
const { encr } = require("./crypto");

function addData(res, newData, oldDataObj) {
  newData.id = new Date().getTime();

  //Buat salinan
  const encryptedData = { ...newData };

  Object.keys(encryptedData).forEach((property) => {
    // Lewati id
    if (property !== "title" && property !== "id") {
      // encrypt jika bukan string kosong
      if (encryptedData[property].trim() !== "") {
        encryptedData[property] = encr(
          `${encryptedData[property]}`,
          global.username,
          global.password
        );
      } else {
        delete encryptedData[property];
      }
    }
  });

  // Perbarui objek
  oldDataObj.passwords.push(encryptedData);

  // Tulis objek data
  fs.writeFile("../PwMg/private/pw.json", JSON.stringify(oldDataObj), (err) => {
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

module.exports = addData;
