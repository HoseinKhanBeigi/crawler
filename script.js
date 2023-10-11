const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");

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

  const regex = /<([A-Z][a-zA-Z0-9]+)[^>]*>/g;
  const components = [];
  let matchComponent;
  while ((matchComponent = regex.exec(code))) {
    components.push(matchComponent[1]);
  }

  return {
    children: [...new Set(functionNames), ...new Set(components)].map((e) => {
      return {
        name: e,
        children: [],
      };
    }),
    // components: [],
  };
}

function parseTextToStructure(lines) {
  const result = {};
  let currentComponent = result;

  const componentName = lines;
  if (componentName) {
    currentComponent[componentName] = {};
    currentComponent = currentComponent[componentName];
  } else {
    currentComponent = result; // Move back to the root component
  }
  return result;
}

function processFilesInFolder(folderPath) {
  const files = fs.readdirSync(folderPath);
  const result = {};

  const filteredPaths = files.filter((path) => {
    // Use a regular expression to check if the path ends with .scss, .css, or .json
    const regex = /\.(tsx|jsx|js)$/;
    return regex.test(path);
  });

  filteredPaths.forEach((file) => {
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
  const rootDirectory = "./folder2";
  const folderData = buildFolderData(rootDirectory);

  const parsedInput = JSON.parse(JSON.stringify(folderData, null, 2));
  const outputJSON = Object.entries(parsedInput).map(([name, item]) => ({
    name,
    children: [convertToDesiredFormat(item)],
  }));
  const filePath = "data.json";
  createJsonFile(parsedInput, filePath);
}

function convertToDesiredFormat(input) {
  if (typeof input === "object" && !Array.isArray(input)) {
    return {
      name: Object.keys(input)[0],
      children: Object.values(input).map(convertToDesiredFormat),
    };
  } else {
    return { name: input, children: [] };
  }
}

function createJsonFile(data, filePath) {
  const jsonString = JSON.stringify(data, null, 2); // The second argument (null) is for replacer function, and 2 for indentation
  try {
    fs.writeFileSync(filePath, jsonString, "utf8");
    console.log("JSON data has been written to " + filePath);
  } catch (err) {
    console.error("Error writing JSON data: " + err);
  }
}
