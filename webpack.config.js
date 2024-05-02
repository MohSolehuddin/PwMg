const path = require('path'); // Import modul 'path'

module.exports = [
  {
    target: 'node',
    entry: './server.js', // Masukkan entri proyek Anda di sini
    output: {
      filename: 'bundle.js', // Nama file output
      path: path.resolve(__dirname, 'dist'), // Direktori output
    }
  },
  {
    entry: './home/script.js',
    output: {
      filename: 'script.js',
      path: path.resolve(__dirname, 'dist', 'home'),
    },
  },
  {
    entry: './about/script.js',
    output: {
      filename: 'script.js',
      path: path.resolve(__dirname, 'dist', 'about'),
    },
  }
];