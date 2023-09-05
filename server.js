const CryptoJS = require('crypto-js');
const http = require('http');
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');

// function hashing SHA3 customisasi
function mySHA3(msg) {
    const salt = "b94ddf1415258bd4b1fa236339bce8ab";
    const salt2 = "dff3d4e76569b8834a9b1b82e6e23f1e";
    const salt3 = "f64636289ae073fc82ca11db54c7eeb2";
    let resultSHA3 = CryptoJS.SHA3(`${salt}.${salt3}.${msg}.${salt2}`).toString();
    let hash = CryptoJS.MD5(resultSHA3).toString();
    return hash;
}
//function encrypt
function enc(msg, key) {
    let text = CryptoJS.AES.encrypt(msg, key);
    return text;
}
//function decrypt
function dec(msg, key) {
    const bytes = CryptoJS.AES.decrypt(msg.toString(), key);
    const text = bytes.toString(CryptoJS.enc.Utf8);
    return text;
}
//function encrypt lanjutan
function encr(msg, key1, key2) {
    let myKey = `${key1}j3k72l29${key2}`;
    let plainText = enc(msg, myKey).toString();
    return plainText;
}
// function decrypt lanjutan
function decr(msg, key1, key2) {
    let mykey = `${key1}j3k72l29${key2}`;
    let plainText = dec(msg, mykey);
    return plainText;
}

//function untuk baca file json dan rubah ke Object
function ReadFileJsonAndChangeToObject(location) {
    const data = fs.readFileSync(`${location}`, "utf8");
    // rubah format json ke objek
    const parseData = JSON.parse(data);
    return parseData;
}
//variabel inti
const key = ReadFileJsonAndChangeToObject('./private/keySesion.json');
const key1 = key.username;
const key2 = key.password;
console.log(`testing key key1 ${key1}, key2 ${key2}`);
const { session } = ReadFileJsonAndChangeToObject('./src/sessionLogin.json');

let chiperTexxt = encr("soleh tampan", `${key1}${key2}`,"hai");
console.log(decr(chiperTexxt, `${key1}${key2}`, "hai"));
//function tambah data,delete data, update data, dan baca data
// function mendapatkan data lama
function oldData() {
    //mendapatkan data lama
    const data = fs.readFileSync("/sdcard/PwMg/private/pw.json", "utf8");
    // rubah data lama dari format json ke objek
    const parseData = JSON.parse(data);
    return parseData;
}
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
          const data = querystring.parse(body);
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
          console.log(data.title);
          let originalData = await plainTextData(data.title);
        });
    }
}

// menambahkan data berdasarkan kategori
function addData(res, title, name, username, pass, email, noHp) {
    let oldDataObj = oldData();
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
        name: encr(name, key1, key2),
        username: encr(username, key1, key2),
        pw: encr(pass, key1, key2),
        email: encr(email, key1, key2),
        no: encr(noHp, key1, key2)
    };
    console.log(newData);
    oldDataObj.passwords.push(newData);
    fs.writeFile(
        "/sdcard/PwMg/private/pw.json",
        JSON.stringify(oldDataObj),
        (err) => {
            if (err) {
                console.log("password gagal di tambahkan!!");
            } else {
                res.statusCode = 302;
                res.setHeader('Location', '/home');
                res.end();
                console.log("password berhasil di tambahkan");
            }
        }
    );
}
// function hapus data berdasarkan id
async function deleteData(res, id) {
    let OldData = oldData();
    const index = OldData.passwords.findIndex((data) => data.id === Number(id));
    
    if (index === -1) {
        console.log("Data tidak ditemukan");
        return;
    }

    OldData.passwords.splice(index, 1);

    fs.writeFile(
        "/sdcard/PwMg/private/pw.json",
        JSON.stringify(OldData),
        (err) => {
            if (err) {
              console.log("password gagal dihapus!!");
            } else {
              res.statusCode = 302;
              res.setHeader('Location', '/home');
              res.end();
              console.log("password berhasil dihapus");
            }
        }
    );
}

// function untuk update data berdasarkan id
async function updateData(res, id, title, username, pass, email, noHp) {
    let OldData = oldData();
    const index = OldData.passwords.findIndex((data) => data.id === Number(id));

    if (index === -1) {
        console.log("Data tidak ditemukan");
        return;
    }

    // membuat struktur pass baru
    const updatedData = {
        id: OldData.passwords[index].id,
        title: title,
        name: encr(name, key1, key2),
        username: encr(username, key1, key2),
        pw: encr(pass, key1, key2),
        email: encr(email, key1, key2),
        no: encr(noHp, key1, key2)
    };

    OldData.passwords.splice(index, 1, updatedData);

    fs.writeFile(
        "/sdcard/PwMg/private/pw.json",
        JSON.stringify(OldData),
        (err) => {
            if (err) {
                console.log("password gagal diupdate!!");
            } else {
              res.statusCode = 302;
              res.setHeader('Location', '/home');
              res.end();
              console.log("password berhasil diupdate");
            }
        }
    );
}

//function menampilkan data json
async function plainTextData(title) {
  try {
    // mengambil data passwords dari file pw.json
    const data = await fs.promises.readFile(`/sdcard/PwMg/private/pw.json`, 'utf8');
    // rubah data ke format objek
    let parseData = JSON.parse(data);
    console.log("parseData", parseData);
    console.log("parseData", key1);
    // dekripsi dan filter data berdasarkan judul
    let decryptedData = await parseData.passwords
        .filter(password => password.title === title)
        .map(password => {
            return {
                id: password.id,
                name: decr(password.name, key1, key2),
                username: decr(password.username, key1, key2),
                pw: decr(password.pw, key1, key2),
                email: decr(password.email, key1, key2),
                no: decr(password.no, key1, key2)
            };
        });
    let obj = {};
    obj["passwords"] = decryptedData;
    console.log("obj:", obj);
    await fs.promises.writeFile(
        "/sdcard/PwMg/private/decryptPw.json",JSON.stringify(obj),
        (err) => {
            if (err) {
                console.log(err);
            } else {
              console.log("file passwords decryptedData berhasil di buat");
            }
        }
    );
  } catch (e) {
    console.error("Error:", e)
  }
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
                    console.log('data berhasil ditambahkan');
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
    sendToClient("./private/decryptPw.json", 'aplication/json', res);
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