import React, { memo } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import cs from 'classnames';
import s from './ShowTotalListOfElement.scss';

const ShowTotalListOfElement = props => {
  const { label, value, className } = props;
  return (
    <span className={cs(className, s.root)}>
      <span className={s.label}>{label}: </span>
      <span className={s.value}>{value}</span>
    </span>
  );
};

ShowTotalListOfElement.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
};

ShowTotalListOfElement.defaultProps = {
  label: 'تعداد کل',
  className: '',
};

export default withStyles(s)(memo(ShowTotalListOfElement));
