const http = require('http');
const url = require('url');
const {routes, notFound} = require('./src/function/routes');

// Membuat server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const handler = routes[path] || notFound;
    handler(req, res);
});

// Menjalankan server pada port 3000
server.listen(3000, () => {
    console.log('Server berjalan pada port 3000');
    console.log(`http://localhost:3000`);
});