import React, { memo } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RenderProducts.scss';

const RenderProducts = props => {
  const { data } = props;
  if (data) {
    return data?.map(items => (
      <React.Fragment>
        <span className={s.products}>
          <b>نام اپلیکیشن: </b>
          <p>{items.applicationName}</p>
        </span>
        <span className={s.products}>
          <b>نام محصول: </b>
          <p>{items.title}</p>
        </span>
      </React.Fragment>
    ));
  }

  return null;
};

export default withStyles(s)(memo(RenderProducts));
