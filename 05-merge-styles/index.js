const { readFile, unlink, readdir, appendFile } = require('fs/promises');
const path = require('path');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
const stylesPath = path.join(__dirname, 'styles');

const createBundle = async () => {
  try {
    await appendFile(bundlePath, '');
    await unlink(bundlePath);
    await appendFile(bundlePath, '');

    const files = await readdir(stylesPath, { withFileTypes: true });

    const stylesArray = [];

    for (let i = 0; i < files.length; i++) {
      const fileName = files[i].name;
      if (files[i].isFile() && path.extname(fileName) === '.css') {
        const code = await readFile(path.join(stylesPath, fileName), 'utf-8');
        stylesArray.push(code);
        await appendFile(bundlePath, `${code}\n\n`);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

createBundle();
