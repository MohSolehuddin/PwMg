const fs = require('fs');

// function baca file JSON
function category() {
  fs.readFile('./private/pw.json', 'utf8', (err, data) => {
      if (err) {
          console.error('Gagal membaca file JSON:', err);
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
          return JSON.stringify({ titles: uniqueTitles }, null, 2);
      } catch (error) {
          console.error('Gagal mengurai JSON:', error);
      }
  });
}
module.exports = category;