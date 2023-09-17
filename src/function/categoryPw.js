const fs = require('fs');

// function baca file JSON
function categoryPw(callback) {
  fs.readFile('./private/pw.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Gagal membaca data password:', err);
      callback(err, null); // Call the callback with an error
      return;
    }
    try {
      // Parse JSON
      const jsonData = JSON.parse(data);
      // Dapatkan semua nilai "title" dari array "passwords" dan filter yang unik
      const uniqueTitles = jsonData.passwords
        .map(item => item.title)
        .filter((value, index, self) => self.indexOf(value) === index);
      // Cetak hasil
      let dataJson = JSON.stringify({ titles: uniqueTitles }, null, 2);
      callback(null, dataJson); // Call the callback with the result
    } catch (error) {
      console.error('Gagal mengurai JSON:', error);
      callback(error, null); // Call the callback with an error
    }
  });
}

module.exports = categoryPw;
