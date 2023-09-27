import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ text }) => (
  <small>
    {`${text} `}
    <span style={{ color: 'red' }}>*</span>
  </small>
);

Label.propTypes = {
  text: PropTypes.string.isRequired,
};
export default Label;
