import React from 'react';
import style from './contract.scss';

function ContractStage({ data }: any) {
  const renderParagraph = paragraph => {
    return (
      <p>
        {paragraph?.inputes?.map((item, index) => (
          <span key={item}>
            &nbsp;{item.text} &nbsp; {item.input.value}&nbsp;
            {/* eslint-disable-next-line no-prototype-builtins */}
            {item.hasOwnProperty('sign') ? (
              <span className={style.signAndData}>&nbsp;{item.sign}</span>
            ) : null}
          </span>
        ))}
      </p>
    );
  };

  const renderTable = tableArray => {
    return (
      <div className={style.table}>
        {tableArray?.map((row, idx) => (
          <div key={row} className={style.row}>
            {row.map((col, index) => (
              <div key={col} className={style.col}>
                {/* eslint-disable-next-line no-prototype-builtins */}

                {col.hasOwnProperty('type') ? (
                  <div className={style.colData}>
                    {col?.inputes?.map(input => {
                      return (
                        <div key={input}>
                          {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                          <label htmlFor={col?.type} key={input}>
                            {/* eslint-disable-next-line no-prototype-builtins */}
                            {input.hasOwnProperty('tableBlank')
                              ? input?.tableBlank.map(item => (
                                  <span key={input}>
                                    &nbsp;{item?.textBlank} &nbsp;{' '}
                                    {item.input.value}
                                  </span>
                                ))
                              : input.text}
                          </label>
                          <input type={col?.type} id={col?.type} />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  col?.inputes?.map(item => (
                    <>
                      <span key={item}>
                        &nbsp;{item.text} &nbsp; {item.input.value}&nbsp;
                      </span>
                    </>
                  ))
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderEntity = entity => {
    return (
      <>
        <h2>{entity.title}</h2>
        <>
          {entity?.table?.length !== undefined
            ? renderTable(entity?.table)
            : ''}
        </>
        {entity?.paragraphes?.map(paragraph => renderParagraph(paragraph))}
      </>
    );
  };

  const renderPage = page => {
    return (
      // eslint-disable-next-line react/react-in-jsx-scope
      <div className={style.page} style={{ textAlign: 'right' }}>
        {/* eslint-disable-next-line no-prototype-builtins */}
        {page.hasOwnProperty('contractNumber') ||
        page.hasOwnProperty('contractDate') ? (
          // eslint-disable-next-line react/react-in-jsx-scope
          <div className={style.contractDetails}>
            <span>
              شماره قرارداد:
              {page?.contractNumber}
            </span>
            <span>
              تاریخ قرارداد:
              {page?.contractDate}
            </span>
          </div>
        ) : null}
        {page?.entities?.map(entity => renderEntity(entity))}
        {/* eslint-disable-next-line no-prototype-builtins */}
        {page?.hasOwnProperty('sign') && (
          <div className={style.sign}>
            <span>امضاومهر کارگزاری</span>
            <span>امضاومهر مشتری</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ direction: 'rtl' }} className={style.page}>
      <div className={style.logos}>
        {data.logos?.map((logo, index) => (
          <img key={logo} src={logo} alt="logo" className={style.logo} />
        ))}
      </div>
      <h1 className={style.title}>{data.title}</h1>
      <h6>{data.desc}</h6>
      {data?.pages?.map(page => renderPage(page))}
    </div>
  );
}

export default ContractStage;
