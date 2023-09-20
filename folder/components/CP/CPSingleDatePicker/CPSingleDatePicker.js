import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import momentJalaali from 'moment-jalaali';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates-jalali';
import s from './CPSingleDatePicker.scss';

const CPSingleDatePicker = ({
  focused,
  displayFormat,
  disabled,
  placeholder,
  id,
  numberOfMonths,
  label,
  required,
  ...props
}) => {
  momentJalaali.locale('fa');
  momentJalaali.loadPersian({
    dialect: 'persian-modern',
    usePersianDigits: false,
  });
  const [date, setDate] = useState(null);
  const [focus, setFocus] = useState(focused);
  const onDateChange = value => {
    props.onChange({ date: value });
    setDate(value);
  };

  // TODO isOutOfRange functionality is ok, but view is not.
  const isOutOfRange = day => {
    const { minDate, maxDate } = props;
    let min = false;
    let max = false;
    if (maxDate) {
      max = day.isAfter(moment(maxDate));
    }
    if (minDate) {
      min = day.isBefore(moment(minDate));
    }
    return min || max;
  };

  useEffect(() => {
    const validDate =
      new Date(props.date).getTime() > 0 ? momentJalaali(props.date) : null;
    setDate(validDate);
  }, [props.date]);

  return (
    <React.Fragment>
      {label && (
        <span className={s.controlLabel}>
          {label}
          {required && <span style={{ color: 'red' }}>*</span>}
        </span>
      )}
      <SingleDatePicker
        placeholder={placeholder}
        isRTL
        required={required}
        renderMonth={month => momentJalaali(month).format('jMMMM jYYYY')}
        id={id}
        date={date}
        numberOfMonths={numberOfMonths}
        focused={focus}
        onDateChange={dateValue => onDateChange(dateValue)}
        onFocusChange={focusedItem => setFocus(focusedItem.focused)}
        isOutsideRange={day => isOutOfRange(day)}
        displayFormat={displayFormat}
        disabled={disabled}
      />
    </React.Fragment>
  );
};

CPSingleDatePicker.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  displayFormat: PropTypes.string,
  id: PropTypes.string,
  numberOfMonths: PropTypes.number,
  focused: PropTypes.bool,
  required: PropTypes.bool,
  date: PropTypes.number,
  label: PropTypes.string,
  minDate: PropTypes.number, // timestamp
  maxDate: PropTypes.number, // timestamp
};

CPSingleDatePicker.defaultProps = {
  onChange: () => {},
  id: 'date_input',
  placeholder: 'تاریخ',
  disabled: false,
  required: false,
  displayFormat: 'jDD jMMMM jYYYY',
  numberOfMonths: 1,
  focused: false,
  date: null,
  label: '',
  minDate: null,
  maxDate: null,
};

export default withStyles(s)(CPSingleDatePicker);
