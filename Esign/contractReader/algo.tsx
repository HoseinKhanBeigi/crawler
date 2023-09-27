/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState, useRef, useReducer } from 'react';

import style from './algo.scss';

function Algo({ data1 }: any) {
  const renderTable = tableArray => {
    return (
      // eslint-disable-next-line react/react-in-jsx-scope
      <div className={style.table}>
        {tableArray?.map((row, index) => (
          // eslint-disable-next-line react/react-in-jsx-scope
          <div key={row} className={style.row}>
            {row.map(col => (
              // eslint-disable-next-line react/react-in-jsx-scope
              <div key={col} className={style.cell}>
                {
                  // eslint-disable-next-line react/react-in-jsx-scope
                  <span key={col}>
                    {col.text} &nbsp;{' '}
                    {// eslint-disable-next-line no-nested-ternary
                    Array.isArray(col?.itemValue)
                      ? !col.div
                        ? col?.value?.map(e => (
                            // eslint-disable-next-line react/react-in-jsx-scope
                            <span style={{ paddingLeft: '16px' }}>{e}</span>
                          ))
                        : col?.itemValue?.map(e => (
                            // eslint-disable-next-line react/react-in-jsx-scope
                            <div style={{ paddingLeft: '16px' }}>{e}</div>
                          ))
                      : col?.itemValue}
                  </span>
                }
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className={style.history}>
        <div
          style={{ direction: 'rtl', textAlign: 'right' }}
          className={style.page}
        >
          {data1.map(e =>
            e.pages?.map(page => (
              <div
                className="pageContent"
                style={{
                  marginTop: '20px',
                  border: '2px solid black',
                  borderRadius: '5px',
                  padding: '10px',
                }}
              >
                {page.entities.map(item => (
                  <>
                    {// eslint-disable-next-line no-nested-ternary
                    item.id !== 'table' ? (
                      // eslint-disable-next-line no-nested-ternary
                      item.bold || item.contractTitle ? (
                        // eslint-disable-next-line react/react-in-jsx-scope
                        <div
                          style={{
                            fontWeight: 'bold',
                            fontSize: '24px',
                            marginBottom: '20px',
                            textAlign: 'center',
                          }}
                        >
                          {item.text}
                        </div>
                      ) : // eslint-disable-next-line no-nested-ternary
                      item.description ? (
                        <div
                          style={{
                            textAlign: 'center',
                            fontSize: '11px',
                            marginBottom: '10px',
                            marginTop: '5px',
                          }}
                        >
                          {item.text}
                        </div>
                      ) : item.title ? (
                        <div
                          style={{
                            fontWeight: 'bold',
                            fontSize: '15px',
                            marginBottom: '10px',
                            marginTop: '5px',
                          }}
                        >
                          {item.text}
                        </div>
                      ) : (
                        // eslint-disable-next-line react/react-in-jsx-scope
                        <div className={style.text}>
                          {item.text}
                          {item?.itemValue?.map((itemValue, index) => (
                            <span>
                              {' '}
                              &nbsp;{itemValue} &nbsp;{' '}
                              {item.value[index] === ''
                                ? '......................'
                                : item.value[index]}
                              &nbsp;
                            </span>
                          ))}
                        </div>
                      )
                    ) : (
                      renderTable(item?.table)
                    )}
                  </>
                ))}

                {
                  // eslint-disable-next-line react/react-in-jsx-scope

                  <div className={style.sign}>
                    <span>امضاومهر کارگزاری</span>
                    <span>امضاومهر مشتری</span>
                  </div>
                }
              </div>
            )),
          )}
        </div>
      </div>
    </>
  );
}

export default Algo;
