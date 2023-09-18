const fs = require("fs");
const path = require("path");

function extractWordsFromCode(code) {
  const names = code.match(/(?:function\s+(\w+)\s*\([^)]*\)|(\w+)\s*=\s*\([^)]*\)\s*=>)/g) || [];
  // code.match(/const\s+(\w+)\s*=\s*\(/g) || [];
  const componentNames = code.match(/<(?:[A-Z]\w+|\/[A-Z]\w+)>/g) || [];
  return {
    functions: names,
    components: componentNames.map((name) => name.replace(/[<>]/g, "")),
  };
}

function parseTextToStructure2(lines) {
  const result = {};
  let currentComponent = null;
  if (Array.isArray(lines)) {
    for (const line of lines) {
      const componentName = line;
      if (componentName) {
        if (currentComponent === null) {
          currentComponent = componentName;
          result[currentComponent] = {};
        } else {
          result[currentComponent][componentName] = {};
        }
      }
    }
  } else {
    const componentName = lines;
    if (componentName) {
      if (currentComponent === null) {
        currentComponent = componentName;
        result[currentComponent] = {};
      } else {
        result[currentComponent][componentName] = {};
      }
    }
  }
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
      const extractedWords = extractWordsFromCode(fileContent);
      console.log(extractedWords/PersistGate)
      const objectRepresentation = parseTextToStructure2(extractedWords);
      if (Object.keys(objectRepresentation).length > 0) {
        result[file] = objectRepresentation;
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
  function convertJsonToFormat(json) {
    const result = [];

    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        const obj = { name: key, children: [] };
        const child = json[key];

        if (typeof child === "object" && Object.keys(child).length > 0) {
          obj.children = convertJsonToFormat(child);
        }

        result.push(obj);
      }
    }

    return result;
  }

  const parsedInput = JSON.parse(JSON.stringify(folderData, null, 2));
  const formattedData = convertJsonToFormat(parsedInput);

  const jsonString = JSON.stringify(formattedData, null, 2); // The second argument (null) is for replacer function, and 2 for indentation

  // Specify the file path
  const filePath = "data.json";

  // Write JSON data to the file
  try {
    fs.writeFileSync(filePath, jsonString, "utf8");
    console.log("JSON data has been written to " + filePath);
  } catch (err) {
    console.error("Error writing JSON data: " + err);
  }
}
