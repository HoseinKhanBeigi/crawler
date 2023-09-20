import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CPMultiSelect.css';

const CPOption = Select.Option;

class CPMultiSelect extends React.Component {
  static propTypes = {
    dataSource: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.array,
    loading: PropTypes.bool,
    autoClearSearchValue: PropTypes.bool,
    label: PropTypes.string,
  };

  static defaultProps = {
    dataSource: [],
    value: [],
    onChange: () => {},
    placeholder: '',
    disabled: false,
    loading: false,
    label: '',
    autoClearSearchValue: false,
  };

  render() {
    const {
      onChange,
      dataSource,
      placeholder,
      disabled,
      label,
      value,
      loading,
      autoClearSearchValue,
      ...other
    } = this.props;
    const children = dataSource.map(option => (
      <CPOption value={option.value} key={option.value}>
        {option.text}
      </CPOption>
    ));

    return (
      <React.Fragment>
        {label && <span className={s.controlLabel}>{label}</span>}
        <Select
          value={value}
          loading={loading}
          showArrow
          mode="multiple"
          autoClearSearchValue={autoClearSearchValue}
          style={{ width: '100%' }}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          {...other}
        >
          {children}
        </Select>
      </React.Fragment>
    );
  }
}

export default withStyles(s)(CPMultiSelect);
