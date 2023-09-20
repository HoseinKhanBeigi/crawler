import React from 'react';
import PropTypes from 'prop-types';
import CPTooltip from '../CP/CPTooltip';

const EllipsisTruncateString = ({ text, maxChar }) =>
  text.length > maxChar ? (
    <CPTooltip title={text}>{`${text.slice(0, maxChar)} ...`}</CPTooltip>
  ) : (
    text
  );
EllipsisTruncateString.propTypes = {
  text: PropTypes.string.isRequired,
  maxChar: PropTypes.number,
};

EllipsisTruncateString.defaultProps = {
  maxChar: 12,
};

export default EllipsisTruncateString;
