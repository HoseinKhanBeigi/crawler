const fs = require('fs');
const mammoth = require('mammoth');
const cheerio = require('cheerio');

const docxFilePath = 'test.docx';
const outputFile = 'output.json';

fs.readFile(docxFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading DOCX file:', err);
    return;
  }

  mammoth.extractRawText({ path: docxFilePath })
    .then((result) => {
      const htmlContent = result.value;
      console.log(htmlContent)
      const $ = cheerio.load(htmlContent, { decodeEntities: false, xmlMode: true });

      // Extract data using jQuery-like selectors
      const title = $('h1').text();
      const paragraphs = $('p').map((_, elem) => $(elem).text()).get();
      try {
        // Parse the JSON content
        const parsedData = htmlContent
    
     
        // Convert the modified data back to JSON
        const jsonData = JSON.stringify(parsedData, null, 2); // Use null and 2 for pretty formatting
    
        // Write the JSON data to the output file
        fs.writeFile(outputFile, jsonData, (err) => {
          if (err) {
            console.error('Error writing output file:', err);
            return;
          }
    
          console.log('Data has been successfully written to', outputFile);
        });
      } catch (parseError) {
        console.error('Error parsing input JSON:', parseError);
      }
      

      // Create a JSON object
      const jsonData = {
        title,
        paragraphs,
      };

      // Print or use the JSON data as needed
      console.log(JSON.stringify(jsonData, null, 2));
    })
    .catch((error) => {
      console.error('Error extracting text:', error);
    });
});
