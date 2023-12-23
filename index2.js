// const express = require("express");
// const fs = require("fs");
const mammoth = require("mammoth");
// const puppeteer = require("puppeteer");
const fs = require("fs");
// const pdf = require("pdf-parse");

const docxFilePath = "./formDocOne.json";
const pageNumber = 28;
const tableArray = Array(4).fill([]);

// const browser = await puppeteer.launch();
// const page = await browser.newPage();
// const htmlContent = "<div>pdf<div>";
// await page.setContent(htmlContent);
// const pdfPath = "output.pdf";
// const pdf = await page.pdf({ path: pdfPath, format: "A4" });
// await browser.close();
// // res.setHeader("Content-Type", "application/pdf");
// // res.setHeader("Content-Disposition", "inline; filename=example.pdf");
// // console.log(pdf, "pdf");
// // res.status(200).json(pdf);

// Read the DOCX file

// char to applicationList
const handleSpace = (count) => {
  let space = "";
  [...Array(count).keys()].map((e) => {
    space += " ";
  });

  return space;
};

fs.readFile(docxFilePath, (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  try {
    // Parse the JSON data
    const jsonData = JSON.parse(data);
    jsonData.map((e) =>
      e.pages.map((page) =>
        page.entities.map((entity) => {
          if (entity.text) {
            return entity;
          } 
          return entity
        })
      )
    );

    // console.log(jsonText1);

    // const jsonText = jsonData[0].pages[0].entities[4].table.map((row) => {
    //   return row.map((col) => {
    //     if (col.text === "نام و نام خانوادگی:") {
    //       return (col.text += handleSpace(47));
    //     }
    //     return col;
    //   });
    // });
    // const jsonText = JSON.stringify(jsonData, null, 2);
    // fs.writeFile("newFormDocOne.json", jsonText, (writeErr) => {
    //   if (writeErr) {
    //     console.error("Error writing JSON file:", writeErr);
    //   } else {
    //     console.log("JSON data has been written to output.json");
    //   }
    // });
  } catch (jsonError) {
    console.error("Error parsing JSON:", jsonError);
  }
});

// fs.readFile(docxFilePath, (err, data) => {
//   if (err) {
//     console.error("Error reading the file:", err);
//     return;
//   }
//   mammoth
//     .extractRawText({ buffer: data })
//     .then((result) => {
//       console.log(result);
//       const paragraphs = result.value.split("\n");
//       const output = paragraphs
//         .map((paragraph) => ({ text: paragraph }))
//         .filter((e) => e.text !== "");

//       const chunkSize = output.length / pageNumber;
//       const res = [];
//       for (let i = 0; i < output.length; i += chunkSize) {
//         const page = output.slice(i, i + chunkSize);
//         res.push({ pages: [{ entities: page }] });
//       }

//       const jsonText = JSON.stringify(res, null, 2);
//       fs.writeFile("real2.json", jsonText, (writeErr) => {
//         if (writeErr) {
//           console.error("Error writing JSON file:", writeErr);
//         } else {
//           console.log("JSON data has been written to output.json");
//         }
//       });
//     })
//     .catch((error) => {
//       console.error("Error converting DOCX to HTML:", error);
//     });
// });
