import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import momentJalaali from 'moment-jalaali';
import moment from 'moment';
import { TimePicker } from 'antd';
import cs from 'classnames';
import s from './CPDateTimePicker.scss';
import CPSingleDatePicker from '../../CP/CPSingleDatePicker';

class CPDateTimePicker extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    defaultValue: PropTypes.string,
    minDate: PropTypes.number, // timestamp
    maxDate: PropTypes.number, // timestamp
    id: PropTypes.string,
    pickTime: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    onChange: () => {},
    defaultValue: null,
    minDate: null,
    maxDate: null,
    id: 'date_input',
    pickTime: true,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // get value from parent.
    if (nextProps.value !== null && nextProps.value !== prevState.final) {
      return {
        final: nextProps.value,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const currentTime = new Date();
    currentTime.setHours(0);
    currentTime.setMinutes(0);
    currentTime.setSeconds(0);

    this.state = {
      final: props.defaultValue
        ? parseInt(props.defaultValue, 10)
        : currentTime.getTime(),
    };
  }

  onChange = () => {
    const { final } = this.state;
    this.props.onChange(final);
  };

  /**
   * Just set date (year, month, day) and do not change the time (hours, minutes, sec)
   * @param timestamp
   */
  setDate = timestamp => {
    // const { final } = this.state;
    const newDate = new Date(timestamp).getTime();

    this.props.onChange(newDate);

    this.setState({
      final: newDate,
    });
  };

  /**
   * Just set time (hours, minutes, sec) and do not change the date (year, month, day)
   * @param value is moment object
   */
  setTime = value => {
    const { final } = this.state;

    const hours = value?.hours() || 0;
    const minutes = value?.minutes() || 0;
    const seconds = value?.seconds() || 0;

    const currentDate = new Date(final);
    currentDate.setHours(hours);
    currentDate.setMinutes(minutes);
    currentDate.setSeconds(seconds);

    this.props.onChange(new Date(currentDate).getTime());

    this.setState({
      final: new Date(currentDate).getTime(),
    });
  };

  render() {
    const { className, minDate, maxDate, id } = this.props;
    const { final } = this.state;

    return (
      <div className={cs(s.root, className)}>
        <div className={s.date}>
          <CPSingleDatePicker
            displayFormat="jYYYY/jM/jD"
            date={final && final !== '' ? new Date(final) : new Date()}
            onChange={value => {
              this.setDate(value.date - 12 * 60 * 60 * 1000);
            }}
            minDate={minDate}
            maxDate={maxDate}
            id={id}
          />
        </div>
        {this.props.pickTime && (
          <div className={s.time}>
            <TimePicker
              value={final ? moment(final) : null}
              onChange={momentObj => {
                this.setTime(momentObj);
              }}
              disabled={!final}
              id={`time-picker-${id}`}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(s)(CPDateTimePicker);
export const CPDateTimePickerTest = CPDateTimePicker;
