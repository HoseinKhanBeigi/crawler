import React, { useMemo } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './messageStatus.scss';

const MessageStatus = ({ status }) => {
  const renderStatus = useMemo(
    () =>
      status === 'ACTIVE' ? (
        <div strong className={s.activeStatus}>
          فعال
        </div>
      ) : (
        <div disabled className={s.inactiveStatus}>
          {' '}
          غیرفعال{' '}
        </div>
      ),
    [status],
  );

  return renderStatus;
};

MessageStatus.propTypes = {
  status: PropTypes.string.isRequired,
};
export default withStyles(s)(MessageStatus);
