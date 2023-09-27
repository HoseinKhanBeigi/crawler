// {
//   "id": 65917,
//   "name": "test8",
//   "description": "تست رضوان",
//   "context": "KIAN_DIGITAL",
//   "parent": {
//   "id": 65914,
//     "name": "test5",
//     "description": "تست رضوان",
//     "context": "DOHI",
//     "kycElements": [
//     "JOB_ADDRESS",
//     "OTP"
//   ],
//     "kycElementListFull": {
//     "JOB_ADDRESS": "آدرس شغلی",
//       "OTP": "اعتبار سنجی موبایل"
//   }
// },
//   "kycElements": [
//   "AI_SELFIE_IMAGE",
//   "SABT_AHVAL_INQUIRY",
//   "JOB_ADDRESS",
//   "OTP"
// ],
//   "kycElementListFull": {
//   "AI_SELFIE_IMAGE": "تطابق عکس سلفی با عکس کارت ملی توسط هوش مصنوعی",
//     "SABT_AHVAL_INQUIRY": "استعلام ثبت احوال",
//     "JOB_ADDRESS": "آدرس شغلی",
//     "OTP": "اعتبار سنجی موبایل"
// }
// }
import React from 'react';
import { Tag } from 'antd';
import MoreList from '../../../components/MoreList';

export default [
  {
    title: 'شناسه سطح',
    dataIndex: 'id',
  },
  {
    title: 'نام سطح',
    dataIndex: 'name',
  },
  {
    title: 'توضیحات',
    dataIndex: 'description',
  },
  {
    title: 'المان ها',
    dataIndex: 'kycElementListFull',
    render: list =>
      Object.values(list || {}).map((element, index) =>
        index < 5 ? (
          <Tag
            color="#f9f9f9"
            style={{ color: '#6e6e6e', border: '1px solid #d9d9d9' }}
          >
            {element}
          </Tag>
        ) : (
          <MoreList
            list={list}
            index={index}
            renderContent={value => `${value?.title || '---'}`}
          />
        ),
      ),
  },
  // {
  //   title: 'تاریخ آخرین ویرایش',
  //   dataIndex: 'name',
  // },
];
