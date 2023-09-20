import React, { memo } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Icon } from 'antd';
import s from './StatCard.scss';
import CPCard from '../CP/CPCard';
import CPProgress from '../CP/CPProgress';

const StatCard = props => {
  const { title, icon, progressColor, percent, count } = props;

  return (
    <CPCard className={s.card}>
      <div className={s.info}>
        <Icon type={icon} style={{ backgroundColor: progressColor }} />
        <span className={s.titleCount}>
          <small>{title}</small>
          <p>{count}</p>
        </span>
      </div>
      <CPProgress
        type="line"
        percent={percent}
        strokeWidth={4}
        strokeColor={progressColor}
        showInfo={false}
      />
      <small>{`افزایش نسبت به هفته گذشته: %${percent}`}</small>
    </CPCard>
  );
};

StatCard.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  progressColor: PropTypes.string,
  percent: PropTypes.number,
  count: PropTypes.number,
};

StatCard.defaultProps = {
  title: 'بازدید سایت',
  icon: 'bar-chart',
  progressColor: '#00c0ef',
  percent: 80,
  count: 55,
};

export default withStyles(s)(memo(StatCard));
export const StatCardTest = StatCard;
