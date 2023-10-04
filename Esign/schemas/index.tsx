import React, { useEffect, useState, useRef, useReducer } from 'react';
import style from './schema.scss';
import Table from './table';

function Sechma({ data1 }: any) {
  const pageRef = useRef();
  const handleMoreThanThreeDot = item => {
    if (item.values) {
      const resultArray: any = [];
      let replacementIndex = 0;
      const dotPattern = /\.{3,}/g;
      const result = item.text.split(/(\.{3,})/);

      for (const sentence of result) {
        if (dotPattern.test(sentence)) {
          resultArray.push(item.values[replacementIndex]);
          replacementIndex++;
          const idx = resultArray.findIndex(e => e === undefined);
          if (idx !== -1) {
            resultArray[idx] = '..........................';
          }
        } else {
          resultArray.push(sentence);
        }
      }

      return resultArray.map(el => <>{el}</>);
    }
  };

  const generatePDF = () => {
    window.print();
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.pageA4}>
          {data1?.map(e =>
            e.pages?.map((page, idx) => (
              <div className={style.pageContent}>
                {page.entities.map(item => {
                  return (
                    <>
                      {item.id !== 'table' ? (
                        item.bold || item.contractTitle ? (
                          <div className={style.itemText}>{item.text}</div>
                        ) : // eslint-disable-next-line no-nested-ternary
                        item.description ? (
                          <div className={style.itemDescription}>
                            {item.text}
                          </div>
                        ) : item.title ? (
                          <div className={style.itemTitle}>{item.text}</div>
                        ) : (
                          <div className={style.text}>
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

                <div className={style.sign}>
                  <span>امضاومهر کارگزاری</span>
                  <span>امضاومهر مشتری</span>
                </div>
              </div>
            )),
          )}
        </div>
      </div>
    </>
  );
}

export default Sechma;
