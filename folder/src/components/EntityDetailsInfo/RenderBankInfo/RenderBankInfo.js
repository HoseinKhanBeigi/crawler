import React, { memo } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RenderBankInfo.scss';

const RenderBankAccountInfo = props => {
  const { data } = props;
  if (data) {
    return data?.map(items => (
      <div className={s.bankAccount}>
        {items.accountNumber && (
          <span className={s.bankInfo}>
            <b>شماره حساب: </b>
            <p>{items.accountNumber}</p>
          </span>
        )}
        {items.iban && (
          <span className={s.bankInfo}>
            <b>شماره شبا: </b>
            <p>{items.iban}</p>
          </span>
        )}
        {items.bankName && (
          <span className={s.bankInfo}>
            <b>نام بانک: </b>
            <p>{items.bankName}</p>
          </span>
        )}
      </div>
    ));
  }

  return null;
};

export default withStyles(s)(memo(RenderBankAccountInfo));
