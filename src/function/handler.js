const fs = require('fs');
const querystring = require('querystring');
const plainTextData = require('./plainTextData');
const addData = require('./addData');
const deleteData = require('./deleteData');
const updateData = require('./updateData');
const sendToClient = require('./sendToClient');
const { mySHA3 } = require('./cryptojs');
const mainDir = require('./mainDir');
const oldData = require('./oldData');
//API data
function data(req, res) {
    const { method, url } = req;
    if (method === "POST" && url === "/addPassword") {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const data = querystring.parse(body);
            addData(res, data, oldData());
        });
    }
    if (method === "DELETE" && url === "/deletePassword") {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const data = JSON.parse(body);
            const { id } = data;
            deleteData(res, id);
        });
    }
    if (method === "POST" && url === "/getPasswords") {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            let data = JSON.parse(body);
            let originalData = await plainTextData(data.title);
            res.writeHead(200, { "Content-Type": "text/json" });
            res.write(originalData);
            res.end();
        });
    }
}
function Category(req, res) {
    fs.readFile('./private/pw.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Gagal membaca data password:', err);
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
            res.writeHead(200, { "Content-Type": "text/json" });
            res.write(dataJson);
            res.end();
        } catch (error) {
            console.error('Gagal mengurai JSON:', error);
        }
    });
}
//update password
function updatePw(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        const data = querystring.parse(body);
        let result = await updateData(res, data, oldData());
    });
}

// PAGE 
function style(req, res) {
    sendToClient('./style.css', 'text/css', res);
}
function script(req, res) {
    sendToClient('./script.js', 'text/javascript', res);
}
// src
function copyIcon(req, res) {
    sendToClient('./src/icons/clipboard.svg', "image/svg+xml", res);
}
function copyIconCheck(req, res) {
    sendToClient('./src/icons/clipboard-check.svg', "image/svg+xml", res)
}
function styleHome(req, res) {
    sendToClient("./home/style.css", 'text/css', res);
}
// Fungsi untuk menangani request ke landing page
function homePage(req, res) {
    sendToClient("./home/index.html", 'text/html', res);
}
function scriptHome(req, res) {
    sendToClient("./home/script.js", "text/javascript", res);
}
//about
function aboutPage(req, res) {
    sendToClient("./about/index.html", 'text/html', res);
}
function styleAbout(req, res) {
    sendToClient("./about/style.css", 'text/css', res);
}
function scriptAbout(req, res) {
    sendToClient("./about/script.js", 'text/javascript', res);
}
// Fungsi untuk menangani request yang tidak dikenali
function notFound(req, res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('alamatt url tidak ditemukan');
    res.end();
}
// Fungsi untuk menangani request ke halaman utama
//login
function loginPage(req, res) {
    sendToClient('./index.html', 'text/html', res)
}
function handleLogin(req, res) {
    if (req.method === 'POST' && req.url === '/login') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const data = querystring.parse(body);
            global.username = mySHA3(data.username);
            global.password = mySHA3(data.password);
            console.log(global.username);
            console.log('Login Successfull!');
            res.statusCode = 302;
            res.setHeader('Location', '/home');
            res.end();

            // let obj = {
            //     username: mySHA3(data.username),
            //     password: mySHA3(data.password)
            // }
            // fs.writeFile(`./private/keySesion.json`, JSON.stringify(obj), err => {
            //     if (err) {
            //         console.error('gagal menambahkan data:', err);
            //         res.statusCode = 500;
            //         res.end('Internal Server Error');
            //     } else {
            //         console.log('Login Successfull!');
            //         res.statusCode = 302;
            //         res.setHeader('Location', '/home');
            //         res.end();
            //     }
            // });
        });
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
}
module.exports = { data, handleLogin, loginPage, style, script, aboutPage, scriptAbout, styleAbout, styleHome, scriptHome, homePage, copyIconCheck, copyIcon, notFound, Category, updatePw }