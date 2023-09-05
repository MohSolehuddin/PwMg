const fs = require('fs');

function addKategory(newData, file_path, callback) {
  // membaca file JSON yang sudah ada
  fs.readFile(file_path, 'utf8', (err, data) => {
    if (err) return callback(err);

    let parsedData = JSON.parse(data);

    // menambahkan objek baru ke dalam array data
    parsedData.passwords.push(newData);

    // menulis kembali file JSON dengan data yang sudah ditambahkan
    fs.writeFile(file_path, JSON.stringify(parsedData), (err) => {
      if (err) return callback(err);
      return callback(null, 'Data berhasil ditambahkan');
    });
  });
}

// contoh penggunaan function
let newData = {
  nama: "kamu",
  kamu: "hahah "
}
addKategory(newData,'/sdcard/Termux/pw.json',
  (err, message) => {
    if (err) return console.error(err);
    console.log(message);
  }
);