const express = require("express");
const fs = require("fs");
const mammoth = require("mammoth");

const app = express();
const port = 3001;

const docxFilePath = "./test3.docx";

// Read the DOCX file
fs.readFile(docxFilePath, (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  // Convert the DOCX to HTML
  mammoth
    .extractRawText({ buffer: data })
    .then((result) => {
      // Extracted HTML content with Persian text
      // const htmlContent = result.value;

      const jsonData = {
        content: result.value, // This assumes you want to store the text content.
      };

      const paragraphs = result.value.split("\n\n");

      // Create an array of objects with the name property
      const result1 = paragraphs.map((paragraph) => ({ name: paragraph }));
      const jsonText = JSON.stringify(result1, null, 2);
      // console.log(result);
      fs.writeFile("output.json", jsonText, (writeErr) => {
        if (writeErr) {
          console.error("Error writing JSON file:", writeErr);
        } else {
          console.log("JSON data has been written to output.json");
        }
      });
    })
    .catch((error) => {
      console.error("Error converting DOCX to HTML:", error);
    });
});
