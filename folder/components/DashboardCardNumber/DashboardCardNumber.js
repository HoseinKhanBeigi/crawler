import React, { memo } from 'react';
import { Skeleton } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import cs from 'classnames';
import s from './DashboardCardNumber.scss';

const DashboardCardNumber = props => {
  const { title, icon, count, percent, skeleton, className } = props;
  return (
    <div className={s.root}>
      <div className={cs(s.infoBox, className)}>
        {skeleton ? (
          <>
            <div className={s.infoBoxIcon}>
              <Skeleton active avatar paragraph={false} title={false} />
            </div>
            <div className={s.infoBoxContent}>
              <Skeleton active paragraph={{ rows: 1 }} />
            </div>
          </>
        ) : (
          <>
            <span className={s.infoBoxIcon}>{icon}</span>
            <div className={s.infoBoxContent}>
              <span className={s.infoBoxNumber}>
                <CountUp end={count} separator="," />
                {percent && <small>%</small>}
              </span>
              <span className={s.infoBoxText}>{title}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

DashboardCardNumber.propTypes = {
  skeleton: PropTypes.bool,
  title: PropTypes.string,
  icon: PropTypes.node,
  count: PropTypes.number,
  percent: PropTypes.bool,
  className: PropTypes.string,
};

DashboardCardNumber.defaultProps = {
  skeleton: false,
  title: false,
  icon: null,
  count: null,
  percent: false,
  className: null,
};

export default withStyles(s)(memo(DashboardCardNumber));
