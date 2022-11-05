const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
const { stdin, stdout, exit } = require('process');
const resultFile = fs.createWriteStream(filePath);
const readLine = require('readline').createInterface({
  input: stdin,
  output: stdout,
});

function closeScript() {
  readLine.write(`Bye-bye! :)`);
  readLine.close();
  resultFile.end();
  exit(0);
}

readLine.write(`Please, type text for new file. \n`);

readLine.on('line', (value) =>
  value.trim().toLocaleLowerCase() === 'exit'
    ? closeScript()
    : resultFile.write(`${value} \n`)
);

process.on('beforeExit', () => {
  readLine.write(`Bye-bye! :)`);
  exit();
});
