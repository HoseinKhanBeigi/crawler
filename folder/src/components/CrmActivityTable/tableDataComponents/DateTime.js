import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// eslint-disable-next-line css-modules/no-unused-class
import s from '../../CrmActivityTable/tableDataComponents/tableDataComponents.scss';
import convertToJalaliDate from '../../../utils/date';

const DateTime = props => {
  const { text } = props;
  return (
    <>
      <div className={s.dateTime}>
        {text && convertToJalaliDate(text)}
        <span className={s.time2}>
          {text && convertToJalaliDate(text, 'HH:mm:ss')}
        </span>
      </div>
    </>
  );
};

DateTime.propTypes = {
  text: PropTypes.number.isRequired,
};

export default withStyles(s)(DateTime);
