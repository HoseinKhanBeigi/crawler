import React from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';

const statusList = {
  approved: {
    title: 'تایید شده',
    style: {
      color: '#13C2C2',
      backgroundColor: '#E6FFFB',
      borderColor: '#5CDBD3',
    },
  },
  pending: {
    title: 'در حال بررسی',
    style: {
      color: '#595959',
      backgroundColor: '#FAFAFA',
      borderColor: '#D9D9D9',
    },
  },
  rejected: {
    title: 'رد شده',
    style: {
      color: '#F5222D',
      backgroundColor: '#FFF1F0',
      borderColor: '#FF7875',
    },
  },
};

const FacilityItemStatus = props => (
  <Tag style={statusList[props?.status]?.style}>
    {statusList[props.status]?.title}
  </Tag>
);
FacilityItemStatus.propTypes = {
  status: PropTypes.string,
};
FacilityItemStatus.defaultProps = {
  status: '',
};
export default FacilityItemStatus;
