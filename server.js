const http = require('http');
const url = require('url');
const ReadFileJsonAndChangeToObject = require('./src/function/ReadFileJsonAndChangeToObject');
const {routes, notFound} = require('./src/function/routes');

//variabel inti
const key = ReadFileJsonAndChangeToObject('./private/keySesion.json');
const key1 = key.username;
const key2 = key.password;
const { session } = ReadFileJsonAndChangeToObject('./src/sessionLogin.json');

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