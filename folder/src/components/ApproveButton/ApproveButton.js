import React, { memo } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import s from './ApproveButton.scss';
import CPRadio from '../CP/CPRadio';

const verificationStatus = [
  {
    value: 'APPROVED',
    name: 'تایید',
  },
  {
    value: 'REJECTED',
    name: 'رد',
  },
];

function ApproveButton(props) {
  const { item, value, primaryValue, rejectedByQC, fetchSejamStatus } = props;

  if (
    (primaryValue && primaryValue === 'APPROVED' && !rejectedByQC) ||
    fetchSejamStatus
  ) {
    return (
      <div className={s.root}>
        <Icon
          className={s.icon}
          type="check-circle"
          theme="twoTone"
          twoToneColor="#52c41a"
        />
        <p>تایید شده است</p>
      </div>
    );
  }

  return (
    <CPRadio
      onChange={e => props.handleChange(item, e.target.value)}
      model={verificationStatus}
      value={value}
    />
  );
}

ApproveButton.propTypes = {
  primaryValue: PropTypes.string,
  rejectedByQC: PropTypes.bool,
  item: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  fetchSejamStatus: PropTypes.string,
};

ApproveButton.defaultProps = {
  handleChange: () => {},
  primaryValue: null,
  rejectedByQC: false,
  fetchSejamStatus: '',
};

export default withStyles(s)(memo(ApproveButton));
export const ApproveButtonTest = ApproveButton;
