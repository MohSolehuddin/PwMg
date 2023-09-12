const ReadFileJsonAndChangeToObject = require('./ReadFileJsonAndChangeToObject');

function key1() {
  return ReadFileJsonAndChangeToObject('./private/keySesion.json').username;
}
function key2() {
  return ReadFileJsonAndChangeToObject('./private/keySesion.json').password;
}
module.exports = {key1, key2};