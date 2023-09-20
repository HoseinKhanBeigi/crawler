import React from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';

const statusList = {
  ACTIVE: {
    title: 'فعال',
    style: {
      color: '#13c29a',
      backgroundColor: '#effffa',
      borderColor: '#93efd2',
    },
  },
  INACTIVE: {
    title: 'غیرفعال',
    style: {
      color: '#ff5252',
      backgroundColor: '#ffe9e9',
      borderColor: '#ffa8a8',
    },
  },
};

const UnitStatusTag = props => (
  <Tag style={statusList[props?.status]?.style}>
    {statusList[props.status]?.title}
  </Tag>
);
UnitStatusTag.propTypes = {
  status: PropTypes.string,
};
UnitStatusTag.defaultProps = {
  status: '',
};
export default UnitStatusTag;
