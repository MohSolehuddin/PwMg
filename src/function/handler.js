const fs = require("fs");
const querystring = require("querystring");
const plainTextData = require("./plainTextData");
const addData = require("./addData");
const deleteData = require("./deleteData");
const updateData = require("./updateData");
const sendToClient = require("./sendToClient");
const { mySHA3, decr } = require("./crypto");
const oldData = require("./oldData");
//API data
function data(req, res) {
  const { method, url } = req;
  if (method === "POST" && url === "/addPassword") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      let data = JSON.parse(body);
      addData(res, data, oldData());
    });
  }
  if (method === "DELETE" && url === "/deletePassword") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const data = JSON.parse(body);
      const { id } = data;
      let result = await deleteData(id);

      if (!result.status) {
        res.writeHead(200, { "Content-Type": "text/json" });
        res.write(JSON.stringify(result));
        res.end();
      }
      if (result.status) {
        res.writeHead(200, { "Content-Type": "text/json" });
        res.write(JSON.stringify(result));
        res.end();
      }
    });
  }
  if (method === "POST" && url === "/getPasswords") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      let data = JSON.parse(body);
      let originalData = await plainTextData(data.title);
      res.writeHead(200, { "Content-Type": "text/json" });
      res.write(originalData);
      res.end();
    });
  }
}
function Category(req, res) {
  fs.readFile("./private/pw.json", "utf8", (err, data) => {
    if (err) {
      console.error("Gagal membaca data password:", err);
      return;
    }
    try {
      // Parse JSON
      const jsonData = JSON.parse(data);
      // Dapatkan semua nilai "title" dari array "passwords" dan filter yang unik
      const uniqueTitles = jsonData.passwords
        .map((item) => item.title)
        .filter((value, index, self) => self.indexOf(value) === index);
      // Cetak hasil
      let dataJson = JSON.stringify({ titles: uniqueTitles }, null, 2);
      res.writeHead(200, { "Content-Type": "text/json" });
      res.write(dataJson);
      res.end();
    } catch (error) {
      console.error("Gagal mengurai JSON:", error);
    }
  });
}
//update password
function updatePw(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const data = querystring.parse(body);
    let result = await updateData(res, data, oldData());
  });
}

// PAGE
function style(req, res) {
  sendToClient("./style.css", "text/css", res);
}
function script(req, res) {
  sendToClient("./script.js", "text/javascript", res);
}
// src
function copyIcon(req, res) {
  sendToClient("./src/icons/clipboard.svg", "image/svg+xml", res);
}
function copyIconCheck(req, res) {
  sendToClient("./src/icons/clipboard-check.svg", "image/svg+xml", res);
}
function styleHome(req, res) {
  sendToClient("./home/style.css", "text/css", res);
}
// Fungsi untuk menangani request ke landing page
function homePage(req, res) {
  if (global.username === undefined) {
    res.statusCode = 302;
    res.setHeader("Location", "/");
    res.end();
  } else {
    sendToClient("./home/index.html", "text/html", res);
  }
}
function scriptHome(req, res) {
  sendToClient("./home/script.js", "text/javascript", res);
}
//about
function aboutPage(req, res) {
  sendToClient("./about/index.html", "text/html", res);
}
function styleAbout(req, res) {
  sendToClient("./about/style.css", "text/css", res);
}
function scriptAbout(req, res) {
  sendToClient("./about/script.js", "text/javascript", res);
}
// Fungsi untuk menangani request yang tidak dikenali
function notFound(req, res) {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.write("Guhhh, Mak tager napak deknak ben, tadek url lah, belih belih");
  res.end();
}
// Fungsi untuk menangani request ke halaman utama
//login
function loginPage(req, res) {
  global.sampleDataForLogin = oldData().passwords[0];
  sampleDataForLogin !== undefined
    ? sendToClient("./login.html", "text/html", res)
    : sendToClient("./register.html", "text/html", res);
}

function handleLogin(req, res) {
  if (req.method === "POST" && req.url === "/login") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const data = querystring.parse(body);
      global.username = mySHA3(data.username);
      global.password = mySHA3(data.password);

      global.sampleDataForLogin = oldData().passwords[0];
      if (sampleDataForLogin !== undefined) {
        global.isLogin = decr(
          sampleDataForLogin.Password.encryptedData,
          global.username,
          global.password,
          sampleDataForLogin.Password.iv
        );
        if (isLogin !== undefined) {
          res.statusCode = 302;
          res.setHeader("Location", "/home").end();
          console.log("Login success");
        } else {
          res.setHeader("Content-Type", "text/html").write(
            `<!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Login</title>
                                <link rel="stylesheet" href="style.css">
                            </head>
                            <body class="container">
                                <form method="post" action="/login" class="formInput">
                                    <h2 class="judul">Password Management</h2>
                                    <h3>Login</h3>
                                    <h5 style="color: red;">Username atau password salah!</h5>
                                    <div class="input-group">
                                        <input type="text" placeholder="username" id="username" name="username" autocomplete="off">
                                    </div>
                                    <div class="input-group">
                                        <input type="password" placeholder="Password" id="password" name="password" autocomplete="off">
                                        <button id="showButton" class="showButton" type="button" onclick="showPassword('password')">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/></svg>
                                        </button>
                                    </div>
                                    <button type="submit" class="button">Log In</button>
                                    <h5 class="creator warning">kunjungi pembuat: <a href="https://msytc.vercel.app/">msytc.vercel.app</a></h5>
                                </form>
                                <script type="text/javascript" charset="utf-8">
                                    function showPassword(id, buttonId) {
                                        if (buttonId === undefined) {
                                            buttonId = "showButton";
                                        }
                                        let password = document.getElementById(\`\${id}\`);
                                        let showButton = document.getElementById(\`\${buttonId}\`);
                                        password.type = password.type === "password" ? "text" : "password";
                                        showButton.innerHTML = password.type === "password" ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16"><path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/><path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/></svg>';
                                    }
                                </script>
                            </body>
                            </html>`
          );
          res.end();
          console.log("username atau password salah");
        }
      } else {
        res.statusCode = 302;
        res.setHeader("Location", "/home").end();
        console.log("Create account!!!");
      }
    });
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
}
module.exports = {
  data,
  handleLogin,
  loginPage,
  style,
  script,
  aboutPage,
  scriptAbout,
  styleAbout,
  styleHome,
  scriptHome,
  homePage,
  copyIconCheck,
  copyIcon,
  notFound,
  Category,
  updatePw,
};
