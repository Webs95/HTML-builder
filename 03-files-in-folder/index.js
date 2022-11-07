const { readdir, stat } = require('fs/promises');
const path = require('path');
const currentPath = path.join(__dirname, 'secret-folder');

async function checkFiles() {
  try {
    const files = await readdir(currentPath, { withFileTypes: true });

    for (const file of files) {
      let fileStats = await stat(path.join(currentPath, file.name));

      if (file.isFile() && fileStats.isFile()) {
        let fileName = file.name.split('.')[0];
        let fileType = path.extname(file.name).slice(1);
        let fileSize = fileStats.size / 1024;

        console.log(`${fileName} - ${fileType} - ${fileSize.toFixed(3)}kb`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

checkFiles();
