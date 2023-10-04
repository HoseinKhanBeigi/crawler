import React from 'react';
import style from '../schema.scss';

const Table = ({ tableArray }: any) => {
  return (
    <div className={style.table}>
      {tableArray?.map((row, index) => (
        <div key={row} className={style.row}>
          {row.map(col => (
            <div key={col} className={style.cell}>
              <span key={col}>
                  {col.text} &nbsp;{' '}
                  {Array.isArray(col?.itemValue)
                    ? !col.div
                      ? col?.value?.map(e => (
                          <span style={{ paddingLeft: '16px' }}>{e}</span>
                        ))
                      : col?.itemValue?.map(e => (
                        <div style={{ paddingLeft: '16px' }}>{e}</div>
                      ))
                  : col?.itemValue}
                </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Table;
