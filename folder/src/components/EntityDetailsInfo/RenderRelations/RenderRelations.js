import React, { memo } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RenderRelations.scss';
import Link from '../../Link';

const RenderRelations = props => {
  const { data } = props;
  if (data) {
    return data?.map(items => (
      <React.Fragment>
        <span className={s.wrapper}>
          <Link to={`/lead/${items.relationLevantId}`} className={s.name}>
            {items.name}
          </Link>
          <span className={s.relation}>
            <b>نسبت: </b>
            <p>{items.relationTitle}</p>
          </span>
        </span>
      </React.Fragment>
    ));
  }

  return null;
};

export default withStyles(s)(memo(RenderRelations));
