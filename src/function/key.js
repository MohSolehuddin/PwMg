const ReadFileJsonAndChangeToObject = require('./ReadFileJsonAndChangeToObject');

//variabel inti
const key = ReadFileJsonAndChangeToObject('./private/keySesion.json');
const key1 = key.username;
const key2 = key.password;

module.exports = {key1, key2};