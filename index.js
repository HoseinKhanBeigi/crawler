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

    console.log(jsonData);

    jsonData.map((e) =>
      e.pages.map((page) =>
        page.entities.map((entity) => {
          if (entity.text) {
            return entity;
          } else if (entity.table) {
            if (Array.isArray(entity.table)) {
              return entity.table.map((row) =>
                row.map((col) => {
                  if (col.text === "نام و نام خانوادگی:") {
                    return (col.text += handleSpace(47));
                  } else if (col.text === "نام خانوادگی:") {
                    return (col.text += handleSpace(47));
                  } else if (col.text === "نام:") {
                    return (col.text += handleSpace(20));
                  } else if (col.text === "جنسیت:") {
                    return (col.text += handleSpace(60));
                  } else if (col.text === "نام پدر:") {
                    return (col.text += handleSpace(61));
                  } else if (col.text === "کد بورسی:") {
                    return (col.text += handleSpace(58));
                  } else if (col.text === "کد ملی:") {
                    return (col.text += handleSpace(61));
                  } else if (col.text === "سری و سریال شناسنامه:") {
                    return (col.text += handleSpace(50));
                  } else if (col.text === "سری و سریال شناسنامه:") {
                    return (col.text += handleSpace(36));
                  } else if (col.text === "محل صدور شناسنامه:") {
                    return (col.text += handleSpace(47));
                  } else if (col.text === "آدرس پست الکترونیکی:") {
                    return (col.text += handleSpace(39));
                  } else if (col.text === "شماره تلفن محل کار با کدشهر:") {
                    return (col.text += handleSpace(31));
                  } else if (col.text === "شماره حساب بانکی:") {
                    return (col.text += handleSpace(45));
                  } else if (col.text === "محل تولد:") {
                    return (col.text += handleSpace(53));
                  } else if (col.text === "نام و کد بانک:") {
                    return (col.text += handleSpace(53));
                  } else if (col.text === "روزنامه رسمی شماره:") {
                    return (col.text += handleSpace(43));
                  } else if (col.text === "آدرس منزل و کد پستی:") {
                    return (col.text += handleSpace(40));
                  } else if (col.text === "آدرس محل کار:") {
                    return (col.text += handleSpace(51));
                  } else if (col.text === "نام:") {
                    return (col.text += handleSpace(67));
                  } else if (col.text === "تلفن همراه:") {
                    return (col.text += handleSpace(42));
                  } else if (col.text === "شماره ثبت:") {
                    return (col.text += handleSpace(56));
                  } else if (col.text === "وضعیت تاهل:") {
                    return (col.text += handleSpace(57));
                  }  else if (col.text === "تاریخ تولد:") {
                    return (col.text += handleSpace(57));
                  } 


                  else if (col.text === "کدپستی:") {
                    return (col.text += handleSpace(57));
                  } 


                  else if (col.text === "تلفن ثابت به همراه کد شهر:") {
                    return (col.text += handleSpace(37));
                  } 


                  else if (col.text === "کدبورسی:") {
                    return (col.text += handleSpace(57));
                  } 

                  else if (col.text === "اطلاعات محل سکونت : کشور") {
                    return (col.text += handleSpace(32));
                  } 


                  else if (col.text === "استان:") {
                    return (col.text += handleSpace(57));
                  } 


                  else if (col.text === "شهر:") {
                    return (col.text += handleSpace(57));
                  } 


                  else if (col.text === " خیابان:") {
                    return (col.text += handleSpace(57));
                  } 


                  else if (col.text === " کوچه:") {
                    return (col.text += handleSpace(57));
                  } 


                  else if (col.text === "  پلاک:") {
                    return (col.text += handleSpace(57));
                  } 

                  else if (col.text === "واحد:") {
                    return (col.text += handleSpace(57));
                  } 
                  
                  else if (col.text === "کدبورسی:") {
                    return (col.text += handleSpace(60));
                  } else if (col.text === "شناسه ملی:") {
                    return (col.text += handleSpace(56));
                  } else if (col.text === "شماره تلفن دفتر مرکزی:") {
                    return (col.text += handleSpace(40));
                  } else if (col.text === "شماره فاکس دفتر مرکزی:") {
                    return (col.text += handleSpace(38));
                  } else if (col.text === "شماره و تاریخ روزنامه رسمی:") {
                    return (col.text += handleSpace(33));
                  } else if (col.text === "آدرس دفتر مرکزی و کدپستی:") {
                    return (col.text += handleSpace(115));
                  } else if (col.text === "تابعیت:") {
                    return (col.text += handleSpace(56));
                  } else if (col.text === "شماره پاسپورت/شماره ثبت:") {
                    return (col.text += handleSpace(35));
                  } else if (col.text === "شماره پاسپورت /شماره ثبت:") {
                    return (col.text += handleSpace(35));
                  } else if (col.text === "شماره سرمایه‌گذار خارجی:") {
                    return (col.text += handleSpace(37));
                  } else if (col.text === "شماره سرمایه گذارخارجی:") {
                    return (col.text += handleSpace(37));
                  } else if (
                    col.text === "شماره تلفن محل کار/ شماره تلفن مرکزی:"
                  ) {
                    return (col.text += handleSpace(17));
                  } else if (
                    col.text ===
                    "آدرس محل کار/ آدرس دفتر مرکزی در ایران و کدپستی:"
                  ) {
                    return (col.text += handleSpace(81));
                  } else if (
                    col.text ===
                    "آدرس محل کار/ آدرس دفتر مرکزی در خارج از کشور:"
                  ) {
                    return (col.text += handleSpace(85));
                  } else if (col.text === "شماره ثبت: 111591") {
                    return (col.text += handleSpace(42));
                  } else if (col.text === "تاریخ ثبت: 09/12/1373") {
                    return (col.text += handleSpace(85));
                  } else if (col.text === "محل ثبت: تهران") {
                    return (col.text += handleSpace(42));
                  } else if (col.text === "شماره ثبت نزد سازمان بورس: 10638") {
                    return (col.text += handleSpace(21));
                  } else if (col.text === "شماره تلفن دفتر مرکزی: 42382") {
                    return (col.text += handleSpace(28));
                  } else if (col.text === "شماره فاکس دفتر مرکزی: 88782462") {
                    return (col.text += handleSpace(20));
                  } else if (col.text === "کد پستی : 1517938314") {
                    return (col.text += handleSpace(34));
                  } else if (col.text === "پست الکترونیک:") {
                    return (col.text += handleSpace(34));
                  }

                  return col.text;
                })
              );
            }
          }
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
    const jsonText = JSON.stringify(jsonData, null, 2);
    fs.writeFile("newFormDocOne.json", jsonText, (writeErr) => {
      if (writeErr) {
        console.error("Error writing JSON file:", writeErr);
      } else {
        console.log("JSON data has been written to output.json");
      }
    });
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
