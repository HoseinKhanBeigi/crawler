const fs = require("fs");
const path = require("path");

function extractWordsWithCapital(content) {
  const words = content.match(/[A-Z][a-z]*/g);
  const result = {};

  if (!words) {
    return result;
  }

  words.forEach((word) => {
    if (word === words[0]) {
      result[word] = {};
    } else if (word.startsWith(words[0])) {
      const subWord = word.substring(words[0].length);
      if (subWord.length > 0) {
        result[words[0]][subWord] = {};
      }
    }
  });

  return result;
}

function processFilesInFolder(folderPath) {
  const files = fs.readdirSync(folderPath);
  const result = {};

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      const capitalWordData = extractWordsWithCapital(fileContent);

      if (Object.keys(capitalWordData).length > 0) {
        result[file] = capitalWordData;
      }
    }
  });

  return result;
}

function buildFolderData(rootDir) {
  const folderData = {};

  function crawlDirectory(directory, parentData) {
    const folders = fs.readdirSync(directory);

    folders.forEach((item) => {
      const itemPath = path.join(directory, item);
      const stats = fs.statSync(itemPath);

      if (stats.isDirectory()) {
        const folderFiles = processFilesInFolder(itemPath);

        if (!parentData) {
          folderData[item] = folderFiles;
        } else {
          parentData[item] = folderFiles;
        }

        crawlDirectory(
          itemPath,
          parentData ? parentData[item] : folderData[item]
        );
      }
    });
  }

  crawlDirectory(rootDir);
  return folderData;
}

if (require.main === module) {
  const rootDirectory = "./folder";
  const folderData = buildFolderData(rootDirectory);
  // console.log(Object.keys(folderData), "ads");
}
