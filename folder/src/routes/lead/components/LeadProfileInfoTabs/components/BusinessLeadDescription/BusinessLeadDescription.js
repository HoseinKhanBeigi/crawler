import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BusinessLeadDescription.scss';
import RenderDetailRow from '../../../../../sessions/components/SessionDrawer/components/RenderDetailRow/RenderDetailRow';

const BusinessLeadDescription = ({ data }) => (
  <div className={s.container}>
    {data.map((value, index) => (
      <RenderDetailRow
        data={value.data || '---'}
        title={value.title}
        titleMaxWidth={100}
        /* eslint-disable-next-line react/no-array-index-key */
        key={index}
      />
    ))}
  </div>
);

BusinessLeadDescription.propTypes = {
  data: PropTypes.array.isRequired,
};

export default withStyles(s)(BusinessLeadDescription);
