const path = require('path'); // Import modul 'path'

module.exports = {
  {
    target: 'node', 
    entry: './server.js', // Masukkan entri proyek Anda di sini
    output: {
      filename: 'bundle.js', // Nama file output
      path: path.resolve(__dirname, '/'), // Direktori output
    }
  },
  {
    entry: './home/script.js',
    output: {
      filename: '/home/script.js',
      path: path.resolve(__dirname, '/home/'),
    },
  },
  {
    entry: './about/script.js',
    output: {
      filename: '/about/script.js',
      path: path.resolve(__dirname, '/about/'),
    },
  }
};
