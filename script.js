const fs = require("fs");
const path = require("path");

function extractWordsFromCode(code) {
  const functionRegex =
    /(function\s+(\w+)\s*\([^)]*\)|const\s+(\w+)\s*=\s*\([^)]*\)\s*=>)/g;

  // Find function names
  const functionNames = [];
  let match;
  while ((match = functionRegex.exec(code)) !== null) {
    // Use match[2] for regular function names and match[3] for arrow function variable names
    if (match[2]) {
      functionNames.push(`${match[2]}`);
    } else if (match[3]) {
      functionNames.push(`${match[3]}`);
    }
  }

  const componentNames = code.match(/<(?:[A-Z]\w+|\/[A-Z]\w+)>/g) || [];
  return {
    functions: functionNames,
    components: componentNames.map((name) => name.replace(/[<>]/g, "")),
  };
}

function parseTextToStructure(lines) {
  // console.log(lines, "line");
  const result = {};
  let currentComponent = result;

  const componentName = lines;
  if (componentName) {
    currentComponent[componentName] = {};
    currentComponent = currentComponent[componentName];
  } else {
    currentComponent = result; // Move back to the root component
  }

  // console.log(result, "res");
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

      const objectRepresentation = parseTextToStructure(extractedWords);

      if (Object.keys(extractedWords).length > 0) {
        result[file] = extractedWords;
      }
    }
  });

  console.log(result);

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
    // console.log(json,"json")
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
