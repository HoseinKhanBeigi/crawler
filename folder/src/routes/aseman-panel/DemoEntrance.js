import React from 'react';
import { Button } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../videoKyc/VideoKycEntrance.scss';
import history from '../../history';

const kycTypes = [
  {
    link: '/aseman-panel/business',
    imagePath: '/images/icons8_business.svg',
    title: 'کسب‌و‌کار',
    description:
      'مشاهده، بررسی و تعریف تامین‌کنندگان، محصولات و کانال‌های فروش',
  },
  {
    link: '/aseman-panel/provider',
    imagePath: '/images/icons8_diversity.svg',
    title: 'تامین‌کننده',
    description: 'مشاهده، بررسی و تعریف محصولات و کانال‌های فروش آنها',
  },
  {
    link: '/aseman-panel/channel',
    imagePath: '/images/icons8_shop.svg',
    title: 'کانال فروش',
    description: 'مشاهده و بررسی تامین‌کنندگان و محصولات آنها',
  },
];

const DemoEntrance = () => (
  <div className={s.container}>
    <div className={s.heading}>
      <img src="/images/icons8_decentralized_network.svg" alt="salam" />
      <h2>پنل مدیریت پلتفرم آسمان</h2>
      <p>بخش موردنظر خود را انتخاب کنید</p>
    </div>
    <div className={s.cards}>
      {kycTypes.map(type => (
        <div className={s.card}>
          <img src={type.imagePath} alt="logo" />
          <h2>{type.title}</h2>
          <p>{type.description}</p>
          <Button
            size="large"
            onClick={() => {
              history.push(type.link);
            }}
            block
            type="primary"
          >{`مشاهده ${type.title}`}</Button>
        </div>
      ))}
    </div>
  </div>
);

DemoEntrance.propTypes = {};

export default withStyles(s)(DemoEntrance);
