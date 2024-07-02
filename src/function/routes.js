const {
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
} = require("./handler");

const routes = {
  //path url
  "/": loginPage,
  "/login": handleLogin,
  "/home": homePage,
  "/about": aboutPage,
  "/addPassword": data,
  "/deletePassword": data,
  "/getPasswords": data,
  "/category": Category,
  "/update": updatePw,

  // style and logic
  //login page
  "/style.css": style,
  "/script.js": script,
  //home Page
  "/home/style.css": styleHome,
  "/home/script.js": scriptHome,
  //about Page
  "/about/style.css": styleAbout,
  "/about/script.js": scriptAbout,
  //src
  "/src/icons/clipboard.svg": copyIcon,
  "/src/icons/clipboard-check.svg": copyIconCheck,
};
module.exports = { routes, notFound };
