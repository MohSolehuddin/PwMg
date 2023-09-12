const crypto = require('crypto');

// Function untuk hashing SHA3 dengan kustomisasi
function mySHA3(msg) {
    const salt = "b94ddf1415258bd4b1fa236339bce8ab";
    const salt2 = "dff3d4e76569b8834a9b1b82e6e23f1e";
    const salt3 = "f64636289ae073fc82ca11db54c7eeb2";
    const data = `${salt}.${salt3}.${msg}.${salt2}`;
    const hash = crypto.createHash('sha3-256').update(data).digest('hex');
    return hash;
}

// Function untuk mengenkripsi
function enc(msg, key) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
    let encrypted = cipher.update(msg, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
        encryptedData: encrypted,
        iv: iv.toString('hex')
    };
}

// Function untuk mendekripsi
function dec(encryptedData, key, savedIv) {
    try {
        // Mengonversi IV yang disimpan dari heksadesimal kembali ke buffer
        const iv = Buffer.from(savedIv, 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (e) {
        console.error(e);
        return "dekripsi gagal, tolong login dengan benar";
    }
}

// Function untuk mengenkripsi lanjutan
function encr(msg, key1, key2) {
    try {
        // Gabungkan kunci key1 dan key2 dengan separator yang sesuai
        let myKey = `${key1}j3k72l29${key2}`;
        // Konversi kunci menjadi panjang yang sesuai untuk AES-256-CBC (32 byte)
        myKey = mySHA3(myKey).substring(0, 64); // Gunakan SHA3 untuk menghasilkan kunci 256-bit
        const { encryptedData, iv } = enc(msg, myKey); // Enkripsi dengan IV yang dihasilkan
        return {
            encryptedData,
            iv
        };
    } catch (e) {
        console.error(e);
        return "enkripsi gagal";
    }
}

// Function untuk mendekripsi lanjutan
function decr(encryptedData, key1, key2, savedIv) {
    try {
        // Gabungkan kunci key1 dan key2 dengan separator yang sesuai
        let myKey = `${key1}j3k72l29${key2}`;
        // Konversi kunci menjadi panjang yang sesuai untuk AES-256-CBC (32 byte)
        myKey = mySHA3(myKey).substring(0, 64); // Gunakan SHA3 untuk menghasilkan kunci 256-bit
        return dec(encryptedData, myKey, savedIv);
    } catch (e) {
        console.error(e);
        return "dekripsi gagal, tolong login dengan benar";
    }
}

module.exports = {
    encr,
    decr,
    mySHA3,
};
