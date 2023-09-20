import React from 'react';
import { Col } from 'antd';
import PropTypes from 'prop-types';

const Column = props => {
  const { children, grid } = props;

  const columnProps = () => {
    if (grid && typeof grid === 'object') {
      return {
        xs: 24,
        sm: 12,
        md: 8,
        xl: 6,
        xxl: 4,
        ...grid,
      };
    }

    if (grid && grid === 'auto') {
      return {};
    }

    return { span: grid || 24 };
  };

  return <Col {...columnProps()}>{children}</Col>;
};

Column.propTypes = {
  children: PropTypes.node.isRequired,
  grid: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};

Column.defaultProps = {
  grid: null,
};

export default Column;
