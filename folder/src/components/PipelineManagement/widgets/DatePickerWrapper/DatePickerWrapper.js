import React, { useMemo } from 'react';
import DatePicker from 'react-datepicker2';
import moment from 'moment';
import momentJalaali from 'moment-jalaali';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './DatePickerWrapper.scss';
import Calendar from '../../icons/calendar';

momentJalaali.loadPersian({ dialect: 'persian-modern' });

const DatePickerWrapper = ({
  label,
  onChange,
  dateValue,
  isRequired,
  readOnly,
}) => {
  const datePickerOnchange = value => {
    const newTimeStamp = new Date(moment(value).format('YYYY/M/D')).getTime();
    onChange(newTimeStamp);
  };

  function checkDateValueValidation() {
    if ((dateValue && dateValue > 73800000) || dateValue < 0) {
      return true;
    }
    return false;
  }

  const date = useMemo(() => {
    if (checkDateValueValidation()) {
      return new Date(dateValue);
    }
    return new Date(Date.now());
  }, [dateValue]);

  return (
    <div className={styles.datePickerContainer}>
      <div className={styles.dateTitle}>
        {isRequired ? '*' : ''}
        {label}
      </div>
      <div className={styles.datePickerWrapper}>
        <DatePicker
          isGregorian={false}
          onChange={value => datePickerOnchange(value)}
          value={momentJalaali(date)}
          timePicker={false}
          disabled={readOnly}
        />
        <Calendar />
      </div>
    </div>
  );
};

DatePickerWrapper.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  dateValue: PropTypes.any,
  isRequired: PropTypes.bool,
  readOnly: PropTypes.bool.isRequired,
};
DatePickerWrapper.defaultProps = {
  onChange: () => {},
  dateValue: null,
  isRequired: false,
};

export default withStyles(styles)(DatePickerWrapper);
