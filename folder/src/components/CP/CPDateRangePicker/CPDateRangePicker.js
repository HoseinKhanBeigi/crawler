import React from 'react';
import PropTypes from 'prop-types';
import momentJalaali from 'moment-jalaali';
import { DateRangePicker } from 'react-dates-jalali';

class CPDateRangePicker extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    autoFocus: PropTypes.bool,
    autoFocusEndDate: PropTypes.bool,
    startDatePlaceholderText: PropTypes.string,
    endDatePlaceholderText: PropTypes.string,
    initialStartDate: PropTypes.objectOf(PropTypes.any),
    initialEndDate: PropTypes.objectOf(PropTypes.any),
    disabled: PropTypes.bool,
    displayFormat: PropTypes.string,
    numberOfMonths: PropTypes.number,
  };

  static defaultProps = {
    onChange: () => {},
    autoFocus: false,
    autoFocusEndDate: false,
    startDatePlaceholderText: 'تاریخ شروع',
    endDatePlaceholderText: 'تاریخ پایان',
    initialStartDate: undefined,
    initialEndDate: undefined,
    disabled: false,
    displayFormat: 'jDD jMMMM jYYYY',
    numberOfMonths: 2,
  };

  constructor(props) {
    super(props);

    momentJalaali.locale('fa');
    momentJalaali.loadPersian({
      dialect: 'persian-modern',
      usePersianDigits: true,
    });
    let focusedInput = null;
    if (props.autoFocus) {
      focusedInput = 'startDate';
    } else if (props.autoFocusEndDate) {
      focusedInput = 'endDate';
    }

    this.state = {
      focusedInput,
      startDate: props.initialStartDate || null,
      endDate: props.initialEndDate || null,
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDatesChange({ startDate, endDate }) {
    const { onChange } = this.props;
    this.setState({
      startDate: startDate && momentJalaali(startDate),
      endDate: endDate && momentJalaali(endDate),
    });
    onChange({ startDate, endDate });
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  render() {
    const { focusedInput, startDate, endDate } = this.state;
    const {
      startDatePlaceholderText,
      endDatePlaceholderText,
      displayFormat,
      disabled,
      numberOfMonths,
    } = this.props;
    return (
      <DateRangePicker
        isRTL
        renderMonth={month => momentJalaali(month).format('jMMMM jYYYY')}
        onDatesChange={this.onDatesChange}
        onFocusChange={this.onFocusChange}
        startDatePlaceholderText={startDatePlaceholderText}
        endDatePlaceholderText={endDatePlaceholderText}
        focusedInput={focusedInput}
        startDate={startDate}
        endDate={endDate}
        startDateId="start"
        endDateId="end"
        numberOfMonths={numberOfMonths}
        isOutsideRange={() => false}
        displayFormat={displayFormat}
        disabled={disabled}
      />
    );
  }
}

export default CPDateRangePicker;
