import React, { memo } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RenderDetails.scss';

const RenderDetails = props => {
  const { data } = props;
  if (data) {
    return data?.map(items => (
      <React.Fragment>
        <span className={s.details}>
          <b>{items.title}</b>
          <p>{items.value}</p>
        </span>
      </React.Fragment>
    ));
  }

  return null;
};

export default withStyles(s)(memo(RenderDetails));
