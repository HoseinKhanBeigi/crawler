/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';

const Multiple = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill={fill}
  >
    <g id="Group_105" data-name="Group 105" transform="translate(-465 -220)">
      <path
        id="icons8-delete"
        d="M18.259,6.97a.7.7,0,0,0-.492.217l-4.788,4.791L8.191,7.187a.705.705,0,1,0-1,1l4.788,4.791L7.194,17.766a.705.705,0,1,0,1,1l4.788-4.791,4.788,4.791a.705.705,0,1,0,1-1l-4.788-4.791,4.788-4.791a.705.705,0,0,0-.5-1.214Z"
        transform="translate(460.019 215.03)"
      />
      <rect
        id="Rectangle_84"
        data-name="Rectangle 84"
        width="16"
        height="16"
        transform="translate(465 220)"
        fill="none"
      />
    </g>
  </svg>
);

Multiple.propTypes = {
  fill: PropTypes.string,
};
Multiple.defaultProps = {
  fill: '#6b778c',
};

export default Multiple;
