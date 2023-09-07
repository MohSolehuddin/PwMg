const CryptoJS = require('crypto-js');

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

module.exports = {
  encr, decr, mySHA3,
}