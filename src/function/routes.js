const fs = require('fs');
const querystring = require('querystring');
const plainTextData = require('./plainTextData');
const addData = require('./addData');
const {mySHA3} = require('./cryptojs');
const deleteData = require('./deleteData');
const updateData = require('./updateData');

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
          const { category, name, username, password, gmail, no } = data;
          addData(res, category, name, username, password, gmail, no);
        });
    }
    if (method === "DELETE" && url === "/deletePassword") {
      let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
          const data = JSON.parse(body);
          console.log(data);
          const {id} = data;
          deleteData(res, id);
        });
    }
    if (method === "PUSH" && url === "/pushPassword") {
      let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
          const data = querystring.parse(body);
          const {id} = data;
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
          res.writeHead(200, {"Content-Type": "text/json"});
          res.write(originalData);
          res.end();
        });
    }
}

// PAGE 
function style(req, res) {
    sendToClient('./style.css', 'text/css', res);
}

function script(req, res) {
    sendToClient('./script.js', 'text/javascript', res);
}
// src
function srcBootstrapJs(req, res) {
    sendToClient("./src/bootstrap.bundle.min.js", 'text/javascript', res);
}

function srcBootstrapCss(req, res) {
    sendToClient("./src/bootstrap.min.css", 'text/css', res);
}

function srcMilligramCss(req, res) {
    sendToClient("./src/milligram.css", 'text/css', res);
}

function srcStyle(req, res) {
    sendToClient("./src/style.css", 'text/css', res);
}

function srcSrcipt(req, res) {
    sendToClient("./src/script.js", 'text/javascript', res);
}

function srcSessionLoginJson(req, res) {
    sendToClient("./src/sessionLogin.json", 'text/json', res);
}

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

function categoryDataJSON(req, res) {
    sendToClient("./home/categoryData.json", 'text/json', res);
}
// data passwords 
function pwJSON(req, res) {
    sendToClient("./private/decryptPw.json", 'text/json', res);
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
function sendToClient(path, type, res) {
    fs.readFile(path, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.write(`Error: ${err}`);
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': `${type}` });
            res.write(data);
            res.end();
        }
    });
}

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
            console.log(data);
            let obj = {
                username: mySHA3(data.username),
                password: mySHA3(data.password)
            }
            fs.writeFile('/sdcard/PwMg/private/keySesion.json', JSON.stringify(obj), err => {
                if (err) {
                    console.error('gagal menambahkan data:', err);
                    res.statusCode = 500;
                    res.end('Internal Server Error');
                } else {
                    console.log('Login Successfull!');
                    res.statusCode = 302;
                    res.setHeader('Location', '/home');
                    res.end();
                }
            });
        });
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
}


// Object yang berisi path dan fungsi yang akan dipanggil ketika path tersebut diakses
const routes = {
    //path url
    '/': loginPage,
    '/login': handleLogin,
    '/home': homePage,
    '/about': aboutPage,
    '/addPassword': data,
    '/deletePassword': data,
    '/getPasswords': data,
    
    // style and logic
    //login page
    '/style.css': style,
    '/script.js': script,
    //home Page
    '/home/style.css': styleHome,
    '/home/script.js': scriptHome,
    '/home/categoryData.json': categoryDataJSON,
    '/home/pw.json': pwJSON,
    //about Page
    '/about/style.css': styleAbout,
    '/about/script.js': scriptAbout,
    //src
    '/src/script.js': srcSrcipt,
    '/src/style.css': srcStyle,
    '/src/sessionLogin.json': srcSessionLoginJson,
    '/src/bootstrap.bundle.min.js': srcBootstrapJs,
    '/src/bootstrap.min.css': srcBootstrapCss,
    '/src/milligram.css': srcMilligramCss,
    '/src/icons/clipboard.svg': copyIcon,
    '/src/icons/clipboard-check.svg': copyIconCheck,
}
module.exports = {routes, notFound,};