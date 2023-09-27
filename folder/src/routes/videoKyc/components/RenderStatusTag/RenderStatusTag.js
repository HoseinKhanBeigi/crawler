import React from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';

const statusList = {
  PERSONAL_INFO: {
    title: 'دریافت اطلاعات',
    style: {
      color: '#6e6e6e',
      backgroundColor: '#f9f9f9',
      borderColor: '#d9d9d9',
    },
  },
  IMAGE: {
    title: 'ارسال سلفی',
    style: {
      color: '#6e6e6e',
      backgroundColor: '#f9f9f9',
      borderColor: '#d9d9d9',
    },
  },
  VIDEO: {
    title: 'ارسال ویدیو',
    style: {
      color: '#6e6e6e',
      backgroundColor: '#f9f9f9',
      borderColor: '#d9d9d9',
    },
  },
  SIGNATURE: {
    title: 'ارسال امضا',
    style: {
      color: '#6e6e6e',
      backgroundColor: '#f9f9f9',
      borderColor: '#d9d9d9',
    },
  },
  SUBMITTED: {
    title: 'در انتظار بررسی',
    style: {
      color: '#1890ff',
      backgroundColor: '#f6fbff',
      borderColor: '#86c5ff',
    },
  },
  APPROVED: {
    title: 'تایید شده',
    style: {
      color: '#13c29a',
      backgroundColor: '#e6fff8',
      borderColor: '#5cdbb4',
    },
  },
  REJECTED: {
    title: 'رد شده',
    style: {
      color: '#ff5252',
      backgroundColor: '#ffe9e9',
      borderColor: '#ffa8a8',
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
