const ReadFileJsonAndChangeToObject = require('./ReadFileJsonAndChangeToObject');

//variabel inti
const key = ReadFileJsonAndChangeToObject('./private/keySesion.json');
const key1 = key.username;
const key2 = key.password;
const { session } = ReadFileJsonAndChangeToObject('./src/sessionLogin.json');

module.exports = {key1, key2, session};