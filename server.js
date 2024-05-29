const http = require("http");
const url = require("url");
const { routes, notFound } = require("./src/function/routes");

// Membuat server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const handler = routes[path] || notFound;
  handler(req, res);
});
const port = 3000;
// Menjalankan server pada port 3000
server.listen(port, () => {
  console.log(`
aplikasi pengelola password Versi 1.0.0 berjalan di:
http://localhost:${port}
    
Panduan pengguna:
  -tekan CTRL + c, untuk keluar dari eksekusi aplikasi
Media sosial kami: https://msytc.vercel.app
`);
});
