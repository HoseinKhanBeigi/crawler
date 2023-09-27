import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';

const statusList = {
  DRAFT: {
    title: 'در انتظار تایید',
    style: {
      color: '#6e6e6e',
      backgroundColor: '#f9f9f9',
      borderColor: '#d9d9d9',
    },
  },
  PENDING_USER_CONFIRM: {
    title: 'در انتظار تایید',
    style: {
      color: '#6e6e6e',
      backgroundColor: '#f9f9f9',
      borderColor: '#d9d9d9',
    },
  },
  PENDING: {
    title: 'در انتظار تایید',
    style: {
      color: '#6e6e6e',
      backgroundColor: '#f9f9f9',
      borderColor: '#d9d9d9',
    },
  },
  SUCCESS: {
    title: 'موفق',
    style: {
      color: '#13c29a',
      backgroundColor: '#e6fff8',
      borderColor: '#5cdbb4',
    },
  },
  REJECTED: {
    title: 'ناموفق',
    style: {
      color: '#ff5252',
      backgroundColor: '#ffe9e9',
      borderColor: '#ffa8a8',
    },
  },
  CANCELED: {
    title: 'ناموفق',
    style: {
      color: '#ff5252',
      backgroundColor: '#ffe9e9',
      borderColor: '#ffa8a8',
    },
  },
  EXPIRED: {
    title: 'ناموفق',
    style: {
      color: '#ff5252',
      backgroundColor: '#ffe9e9',
      borderColor: '#ffa8a8',
    },
  },
  ABORT: {
    title: 'ناموفق',
    style: {
      color: '#ff5252',
      backgroundColor: '#ffe9e9',
      borderColor: '#ffa8a8',
    },
  },
  PENDING_CANCEL: {
    title: 'ناموفق',
    style: {
      color: '#ff5252',
      backgroundColor: '#ffe9e9',
      borderColor: '#ffa8a8',
    },
  },
  PENDING_ORDER_AMOUNT: {
    title: 'ناموفق',
    style: {
      color: '#ff5252',
      backgroundColor: '#ffe9e9',
      borderColor: '#ffa8a8',
    },
  },
};

const StatusChip = props => (
  <Tag style={statusList[props?.status]?.style}>
    {statusList[props.status]?.title}
  </Tag>
);
StatusChip.propTypes = {
  status: PropTypes.string,
};
StatusChip.defaultProps = {
  status: '',
};
export default StatusChip;
