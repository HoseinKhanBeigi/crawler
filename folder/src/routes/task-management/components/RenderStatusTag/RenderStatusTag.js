import React from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';

const statusList = {
  LOW: {
    title: 'پایین',
    style: {
      color: '#13C2C2',
      backgroundColor: '#E6FFFB',
      borderColor: '#5CDBD3',
    },
  },
  MIDDLE: {
    title: 'متوسط',
    style: {
      color: '#1890FF',
      backgroundColor: '#E6F7FF',
      borderColor: '#69C0FF',
    },
  },
  HIGH: {
    title: 'بالا',
    style: {
      color: '#F5222D',
      backgroundColor: '#FFF1F0',
      borderColor: '#d9d9d9',
    },
  },
  IMMEDIATE: {
    title: 'فوری',
    style: {
      color: '#f1b54f',
      backgroundColor: '#faedb0',
      borderColor: '#eac17b',
    },
  },
};

const RenderStatusTag = props => (
  <Tag style={statusList[props?.status]?.style}>
    {statusList[props.status]?.title}
  </Tag>
);
RenderStatusTag.propTypes = {
  status: PropTypes.string,
};
RenderStatusTag.defaultProps = {
  status: '',
};
export default RenderStatusTag;
