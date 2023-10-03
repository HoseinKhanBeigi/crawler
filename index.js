// const express = require("express");
// const fs = require("fs");
const mammoth = require("mammoth");
const fs = require("fs");
// const pdf = require("pdf-parse");

const docxFilePath = "./test4.docx";
const pageNumber = 28;
const tableArray = Array(4).fill([]);
// Read the DOCX file
fs.readFile(docxFilePath, (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }
  mammoth
    .extractRawText({ buffer: data })
    .then((result) => {
      const paragraphs = result.value.split("\n\n");
      const output = paragraphs
        .map((paragraph) => ({ text: paragraph }))
        .filter((e) => e.text !== "");

      const chunkSize = output.length / pageNumber;
      const res = [];
      for (let i = 0; i < output.length; i += chunkSize) {
        const page = output.slice(i, i + chunkSize);
        res.push({ pages: [{ entities: page }] });
      }

      res[0].pages[0].entities.push({ table: tableArray, id: "table" });
      tableArray.push(res[0].pages[0].entities.slice(6, 14));
      const jsonText = JSON.stringify(res, null, 2);
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
