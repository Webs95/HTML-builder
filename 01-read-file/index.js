const fs = require('fs');
const path = require('path');
const { log } = console;
const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'));
readStream.on('data', (dataPart) => log(dataPart.toString()));
