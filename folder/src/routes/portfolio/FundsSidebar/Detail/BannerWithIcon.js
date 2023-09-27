import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiCashMultiple, mdiShieldLock } from '@mdi/js';
import { Col } from 'antd';
// eslint-disable-next-line css-modules/no-unused-class
import s from './Detail.scss';

const BannerWithIcon = props => {
  const { price, type } = props;
  return (
    <Col span={24} className={s.branner_container}>
      <div
        className={s.banner}
        style={{
          backgroundColor: type === 'unlocked' ? '#e5f7f7' : '#f0f2f5',
          color: type === 'unlocked' ? '#00b4ad' : '#6c839e',
          marginTop: type === 'locked' ? '4px' : '0',
        }}
      >
        <div className={s.banner_item1}>
          <Icon
            path={type === 'unlocked' ? mdiCashMultiple : mdiShieldLock}
            size="20px"
          />
          <span className={s.branner_text}>
            {type === 'unlocked' ? 'قدرت خرید (ریال)' : 'مبلغ بلوکه شده'}
          </span>
        </div>
        <span>{price}</span>
      </div>
    </Col>
  );
};
BannerWithIcon.defaultProps = {
  price: '',
  type: 'unlocked',
};
BannerWithIcon.propTypes = {
  price: PropTypes.string,
  type: PropTypes.string,
};
export default withStyles(s)(BannerWithIcon);
