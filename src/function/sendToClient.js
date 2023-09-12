const fs = require('fs');
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

module.exports = sendToClient;