const fs = require("fs");
const {encr, decr} = require('./crypt.js')
const oldData = require("./oldData");

// function mendapatkan data lama
// function mendapatkan data lama
function oldData() {
  //mendapatkan data lama
  const data = fs.readFileSync("/sdcard/Termux/pw.json", "utf8");
  // rubah data lama dari format json ke objek
  const parseData = JSON.parse(data);
  return parseData;
}

//menambahkan kategory
function newCategory(oldData, category) {
  // category baru
  const newCategory = {
    [category]: []
  };

  // cek apakah category sudah ada atau belum
  if (oldData.passwords.findIndex((x) => x[category]) === -1) {
    // jika tidak ada maka push dan tampung ke variabel baru
    oldData.passwords.push(newCategory);

    // simpan kembali data ke pw.json
    fs.writeFile(
      "/sdcard/Termux/pw.json",
      JSON.stringify(oldData),
      (err) => {
        if (err) {
          console.log(
            `kategori password gagal di tambahkan: \n errorr :    ${err}`
          );
        } else {
          console.log("kategori password berhasil di tambahkan");
        }
      }
    );
  } else {
    console.log("maaf category sebelumnya sudah ada!!!!!");
  }
}

// menambahkan data berdasarkan kategori
async function newData(title, username, pass, email, noHp) {
  let oldData = oldData();

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
    username: encr(username, key1, key2, kodeUnik),
    pw: encr(pass, key1, key2, kodeUnik),
    email: encr(email, key1, key2, kodeUnik),
    no: encr(noHp, key1, key2, kodeUnik)
  };

  oldData.passwords.push(newData);
  fs.writeFile(
    "/sdcard/Termux/pw.json",
    JSON.stringify(oldData),
    (err) => {
      if (err) {
        console.log("password gagal di tambahkan!!");
      } else {
        console.log("password berhasil di tambahkan");
      }
    }
  );
}

//function menampilkan data json
function printData() {
  // mengambil data passwords dari file pw.json
  const data = fs.readFileSync('/sdcard/Termux/pw.json', 'utf8');
  
  //rubah data ke format objek
  let parseData = JSON.parse(data);
  
  //decript data
  let oryData = {passwords: []};
  for (let i in parseData.passwords) {
    let obj = {
      id: parseData.passwords[i].id,
      title: parseData.passwords[i].title,
      username: decr(parseData.passwords[i].username, key1, key2, kodeUnik),
      pw: decr(parseData.passwords[i].pass, key1, key2, kodeUnik),
      email: decr(parseData.passwords[i].email, key1, key2, kodeUnik),
      no: decr(parseData.passwords[i].noHp, key1, key2, kodeUnik)
    }
    oryData.passwords.push(obj);
  }
  return oryData;
}
