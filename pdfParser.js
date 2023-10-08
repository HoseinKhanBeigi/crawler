const fs = require("fs");
const pdf = require("pdf-parse");

// Replace 'your-pdf-file.pdf' with the path to your PDF file
const pdfFilePath = "real.pdf";
const pageNumber = 3;

// Read the PDF file
const dataBuffer = fs.readFileSync(pdfFilePath);

// Parse the PDF content
pdf(dataBuffer)
  .then(function (data) {
    console.log(data)
    const paragraphs = data.text.split("\n");
    const output = paragraphs
      .map((paragraph) => ({ text: paragraph }))
      .filter((e) => e.text !== "");

    const chunkSize = output.length / pageNumber;
    const res = [];
    for (let i = 0; i < output.length; i += chunkSize) {
      const page = output.slice(i, i + chunkSize);
      res.push({ pages: [{ entities: page }] });
    }
    const jsonText = JSON.stringify(res, null, 2);
    fs.writeFile("real.json", jsonText, (writeErr) => {
      if (writeErr) {
        console.error("Error writing JSON file:", writeErr);
      } else {
        console.log("JSON data has been written to output.json");
      }
    });
  })
  .catch(function (error) {
    console.error(error);
  });

function jsonString(data) {
  const jsonTest = JSON.stringify(data, null, 2);
  return jsonTest;
}
