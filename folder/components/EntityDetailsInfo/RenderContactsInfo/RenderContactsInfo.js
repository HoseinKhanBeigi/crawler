import React, { memo } from 'react';
import cs from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { returnAddress } from '../../../utils/index';
import s from './RenderContactsInfo.scss';

/* render every item of mapping DOM */
const renderTemplate = (title, data, contacts, ltr = true) => (
  <span className={s.address}>
    <b>{title}</b>
    <p
      className={cs(
        contacts ? 'maskContactData' : 'unMaskContactData',
        ltr ? 'ltr' : undefined,
      )}
    >
      {data}
    </p>
  </span>
);

/* render type of address(living, business, ...) */
const renderAddressType = type => {
  if (type === 'LIVING') {
    return 'آدرس منزل :';
  } else if (type === 'BUSINESS') {
    return 'آدرس محل کار :';
  }
  return 'سایر :';
};

const RenderContactInfo = props => {
  const { data, contacts } = props;
  if (data) {
    return data?.map(items => (
      <React.Fragment>
        {(items.address ||
          returnAddress(items.state, items.city, items.street)) &&
          renderTemplate(
            renderAddressType(items.type),
            returnAddress(items.state, items.city, items.street),
            contacts,
            false,
          )}
        {items.postalCode &&
          renderTemplate('کد پستی:', items.postalCode, contacts)}
        {items.tel && renderTemplate('شماره تماس:', items.tel, contacts)}
        {items.emailAddress &&
          renderTemplate('ایمیل:', items.emailAddress, contacts)}
      </React.Fragment>
    ));
  }
  return null;
};

export default withStyles(s)(memo(RenderContactInfo));
