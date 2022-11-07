const { copyFile, readdir, mkdir, rm } = require('fs/promises');
const path = require('path');
const filesPath = path.join(__dirname, 'files');
const copyFilesPath = path.join(__dirname, 'files-copy');

const createCopy = async () => {
  try {
    await mkdir(copyFilesPath, { recursive: true });
    await clearCopy();

    const files = await readdir(filesPath);

    for (let file of files) {
      await copyFile(
        path.join(copyFilesPath, file),
        path.join(filesPath, file)
      );
    }
  } catch (err) {
    console.error(err);
  }
};

async function clearCopy() {
  const copyFile = await readdir(copyFilesPath);

  for (let file of copyFile) {
    await rm(path.join(copyFile, file), { force: true });
  }
}

createCopy();