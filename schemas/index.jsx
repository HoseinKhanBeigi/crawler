import { useEffect, useState, useRef, useReducer } from "react";
import html2pdf from "html2pdf.js";
import { saveAs } from "file-saver";
import data1 from "../formDocOne.json";
import "./schema.css";
import Table from "./table";

function Sechma() {
  const pageRef = useRef();
  const handleMoreThanThreeDot = (item) => {
    if (item.values) {
      const resultArray = [];
      let replacementIndex = 0;
      const dotPattern = /\.{3,}/g;
      const result = item.text.split(/(\.{3,})/);

      for (const sentence of result) {
        if (dotPattern.test(sentence)) {
          resultArray.push(item.values[replacementIndex]);
          replacementIndex++;
          const idx = resultArray.findIndex((e) => e === undefined);
          if (idx !== -1) {
            resultArray[idx] = "..........................";
          }
        } else {
          resultArray.push(sentence);
        }
      }

      return resultArray.map((el) => <>{el}</>);
    }
  };

  const convertToPdf = () => {
    const element = pageRef.current; // Replace with your HTML element's ID

    console.log(element);

    //  .forEach((el, i) => {
    //     html2pdf()
    //       .from(el)

    // .outputPdf((pdf) => {
    //   const pdfBlob = new Blob([pdf], { type: "application/pdf" });
    //   const pdfUrl = URL.createObjectURL(pdfBlob);
    //   window.open(pdfUrl); // Opens the PDF in a new tab
    // })
    //       .save("exported_file.pdf");
    //   });

    const pages = [...element.querySelectorAll(".pageContent")];
    const pdfDoc = html2pdf();

    pages.forEach((el) => {
      pdfDoc.from(el).outputPdf();
    });

    pdfDoc.save("exported_file.pdf");
  };

  const generatePDF = () => {
    window.print();
  };

  return (
    <>
      <button onClick={generatePDF}>Convert to PDF</button>
      <div className="container">
        <div className="pageA4" ref={pageRef}>
          {data1.map((e) =>
            e.pages?.map((page, idx) => (
              <div className="pageContent">
                {page.entities.map((item) => {
                  return (
                    <>
                      {item.id !== "table" ? (
                        item.bold || item.contractTitle ? (
                          <div className="itemText">{item.text}</div>
                        ) : item.description ? (
                          <div className="itemDescription">{item.text}</div>
                        ) : item.title ? (
                          <div className="itemTitle">{item.text}</div>
                        ) : (
                          <div className="text">
                            {!item.regex ? (
                              <>{item.text}</>
                            ) : (
                              <>{handleMoreThanThreeDot(item)}</>
                            )}
                          </div>
                        )
                      ) : (
                        <Table tableArray={item?.table} />
                      )}
                    </>
                  );
                })}

                <div className="sign">
                  <span>امضاومهر کارگزاری</span>
                  <span>امضاومهر مشتری</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Sechma;
