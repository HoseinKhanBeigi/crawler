const fs = require("fs");
const pdf = require("pdf-parse");

// Replace 'your-pdf-file.pdf' with the path to your PDF file
const pdfFilePath = "Online.pdf";
const pageNumber = 36;

// Read the PDF file
const dataBuffer = fs.readFileSync(pdfFilePath);

// Parse the PDF content
pdf(dataBuffer)
  .then(function (data) {
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
    // const jsonText = JSON.stringify(res, null, 2);
    // const test = JSON.parse(jsonText).find((e) =>
    //   e.pages.find((page) =>
    //     page.entities.find(
    //       (entity) => entity.text === "آتی قرارداد – ریسک بیانیه"
    //     )
    //   )
    // );
    // fs.writeFile("outputPdf.json", jsonText, (writeErr) => {
    //   if (writeErr) {
    //     console.error("Error writing JSON file:", writeErr);
    //   } else {
    //     console.log("JSON data has been written to output.json");
    //   }
    // });
    // const jsonTest = JSON.stringify(test, null, 2);

    const sliceText = [  {"text":":اولویتبندیها و سفارشها ثبت(٢"}, {
      "text": " فیمابین قرارداد و ریسک ۀبیانی فرم باید آتی قراردادهای بازار در فعالیت منظور به مشتریان ۀهم "
    },
    {
      "text": " بازار در آن اعتبار و سفارش انواع .میشود ابلاغ و تهیه بورس توسط ریسک ۀبیانی فرم .کنند امضا و تکمیل کارگزار نزد را کارگزار و مشتری"
    },
    {
      "text": " اوراق و بورس سازمان هیئتمدیرة مصوب تهران، بهادار اوراق بورس در معاملات انجام ۀنحو اجرایی دستورالعمل“ شرح به آتی قراردادهای"
    },
    {
      "text": " بر معاملاتی ۀسامان در ثبتشده سفارشهای اجرای همچنین .شودمی انتخاب بورس توسط فنی، ملاحظات براساس که است ”بهادار"
    },
    {
      "text": ".میشود انجام سفارش ثبت زمانی اولویت اساس بر قیمتها، برابری صورت در و قیمت اولویت اساس"
    }]

      .map((obj) => obj.text)
      .join(" ");


    fs.writeFile("test.json", jsonString(sliceText), (writeErr) => {
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
