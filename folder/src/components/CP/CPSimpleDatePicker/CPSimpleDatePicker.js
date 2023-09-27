/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-jalaali';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import s from './CPSimpleDatePicker.scss';
import CPInputGroup from '../CPInputGroup';
import CPSelect from '../CPSelect';

const days = Array.from(new Array(31), (val, index) => ({
  text: `${index + 1}`,
  value: `${index + 1}`,
}));

const months = Array.from(new Array(12), (val, index) => ({
  text: `${index + 1}`,
  value: `${index + 1}`,
}));

const years = Array.from(new Array(210), (val, index) => ({
  text: `${index + 1200}`,
  value: `${index + 1200}`,
}));

class CPSimpleDatePicker extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    defaultValue: PropTypes.number,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    defaultValue: null,
    disabled: false,
  };

  constructor(props) {
    super(props);

    moment.locale('fa');
    moment.loadPersian({
      dialect: 'persian-modern',
      usePersianDigits: false,
    });

    const { defaultValue } = props;
    // const defaultValue = 761702400000;
    const m = moment(defaultValue);

    if (defaultValue && m.isValid()) {
      const momentArray = m.format('jYYYY/jMM/jDD').split('/');
      this.state = {
        year: momentArray[0],
        month: momentArray[1],
        day: momentArray[2],
      };
    } else {
      this.state = {
        year: null,
        month: null,
        day: null,
      };
    }
  }

  checkDate = () => {
    const { year, month, day } = this.state;
    const date = `${year}/${month}/${day}`;
    const m = moment(date, 'jYYYY/jM/jD');
    const valid = m.isValid();

    if (valid) {
      this.props.onChange(m._d);
    }
  };

  handleChange = async (key, value) => {
    await this.setState({ [key]: value });
    this.checkDate();
  };

  render() {
    const { className, disabled } = this.props;
    const { year, month, day } = this.state;

    return (
      <CPInputGroup
        className={cs(s.selectDate, disabled && s.disabled, className)}
        compact
      >
        <CPSelect
          className={s.select}
          placeholder="روز"
          defaultValue={day || 'روز'}
          dataSource={days}
          onChange={e => {
            this.handleChange('day', e);
          }}
          {...(disabled ? { disabled: true } : {})}
          showSearch
        />
        <CPSelect
          className={s.select}
          placeholder="ماه"
          defaultValue={month || 'ماه'}
          dataSource={months}
          onChange={e => {
            this.handleChange('month', e);
          }}
          {...(disabled ? { disabled: true } : {})}
          showSearch
        />
        <CPSelect
          className={s.select}
          placeholder="سال"
          defaultValue={year || 'سال'}
          dataSource={years}
          onChange={e => {
            this.handleChange('year', e);
          }}
          {...(disabled ? { disabled: true } : {})}
          showSearch
        />
      </CPInputGroup>
    );
  }
}

export default withStyles(s)(CPSimpleDatePicker);
export const CPSimpleDatePickerTest = CPSimpleDatePicker;
