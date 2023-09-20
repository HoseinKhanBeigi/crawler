import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { TimePicker } from 'antd';
import moment from 'moment';
import s from './CPTimePicker.css';

class CPTimePicker extends React.Component {
  static propTypes = {
    value: PropTypes.objectOf(PropTypes.any),
    format: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    minuteStep: PropTypes.number,
    hourStep: PropTypes.number,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    defaultOpenValue: PropTypes.objectOf(PropTypes.any),
    hideDisabledOptions: PropTypes.bool,
    disabledHours: PropTypes.func,
  };

  static defaultProps = {
    value: moment('00:00', 'HH:mm'),
    format: 'HH:mm',
    name: '',
    minuteStep: 1,
    placeholder: 'انتخاب زمان',
    hourStep: 1,
    onChange: () => {},
    onBlur: () => {},
    defaultOpenValue: moment('00:00', 'HH:mm'),
    hideDisabledOptions: false,
    disabledHours: () => {},
  };

  render() {
    const {
      value,
      format,
      name,
      minuteStep,
      hourStep,
      onChange,
      placeholder,
      onBlur,
      defaultOpenValue,
      hideDisabledOptions,
      disabledHours,
    } = this.props;
    return (
      <TimePicker
        placeholder={placeholder}
        style={{ width: '100%' }}
        value={value}
        format={format}
        name={name}
        minuteStep={minuteStep}
        hourStep={hourStep}
        onChange={onChange}
        onBlur={onBlur}
        defaultOpenValue={defaultOpenValue}
        hideDisabledOptions={hideDisabledOptions}
        disabledHours={disabledHours}
      />
    );
  }
}

export default withStyles(s)(CPTimePicker);
