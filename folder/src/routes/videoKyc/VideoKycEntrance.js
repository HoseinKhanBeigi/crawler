import React from 'react';
import { Button } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './VideoKycEntrance.scss';
import history from '../../history';
import { Actions } from '../../utils/aclActions';
import HandleAclPermission from '../../components/HandleAclPermission';

const kycTypes = [
  {
    link: '/videoKyc/kian',
    imagePath: '/images/kian_logo.png',
    title: 'احراز هویت کیان',
    description:
      'مشاهده، بررسی و مدیریت فرآیند احراز هویت برای افراد احراز هویت شده در اکوسیستم کیان',
    aclCode: Actions.kianVideoKycAllRead,
  },
  {
    link: '/videoKyc/sejam',
    imagePath: '/images/sejam_logo.png',
    title: 'احراز هویت سجام',
    description:
      'مشاهده و بررسی فرآیند احراز هویت افرادی که برای دریافت کد بورسی در سجام احراز هویت شده‌اند',
    aclCode: Actions.sejamVideoKycAllRead,
  },
];

const VideoKycEntrance = () => (
  <div className={s.container}>
    <div className={s.heading}>
      <img src="/images/fingerprint_image.png" alt="salam" />
      <h2>پنل مدیریت احراز هویت</h2>
      <p>نوع احراز هویت موردنظر را انتخاب کنید</p>
    </div>
    <div className={s.cards}>
      {kycTypes.map(type => (
        <HandleAclPermission wich={type.aclCode}>
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
        </HandleAclPermission>
      ))}
    </div>
  </div>
);

export default withStyles(s)(VideoKycEntrance);
