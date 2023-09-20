import React, { useState, useEffect } from 'react';
import { Radio } from 'antd';
import PropTypes from 'prop-types';

const CPToggleButton = props => {
  const { onChange, buttons, defaultValue } = props;
  const [toggleDefaultValue, setToggleDefaultValue] = useState(defaultValue);

  const handleChange = value => {
    setToggleDefaultValue(value);
    onChange(value);
  };

  useEffect(() => {
    setToggleDefaultValue(defaultValue);
  }, [defaultValue]);

  return (
    <>
      <Radio.Group
        value={toggleDefaultValue}
        onChange={e => handleChange(e.target.value)}
      >
        {buttons?.map(b => (
          <Radio.Button value={b.value}>{b.label}</Radio.Button>
        ))}
      </Radio.Group>
    </>
  );
};
CPToggleButton.defaultProps = {
  onChange: () => {},
  buttons: [],
  defaultValue: '',
};
CPToggleButton.propTypes = {
  onChange: PropTypes.func,
  buttons: PropTypes.array,
  defaultValue: PropTypes.string,
};
export default CPToggleButton;
