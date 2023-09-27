import React from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';

const statusList = {
  ENABLE: {
    title: 'فعال',
    style: {
      color: '#13c29a',
      backgroundColor: '#effffa',
      borderColor: '#93efd2',
    },
  },
  DISABLE: {
    title: 'غیرفعال',
    style: {
      color: '#ff5252',
      backgroundColor: '#ffe9e9',
      borderColor: '#ffa8a8',
    },
  },
};

const GroupStatus = props => (
  <Tag style={statusList[props?.status]?.style}>
    {statusList[props.status]?.title}
  </Tag>
);
GroupStatus.propTypes = {
  status: PropTypes.string,
};
GroupStatus.defaultProps = {
  status: '',
};
export default GroupStatus;
