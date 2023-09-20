import React from 'react';
import * as Yup from 'yup';
import { Icon } from 'antd';
import CPToolTip from '../CP/CPTooltip';
import toCommaSeparatedNumber from '../../utils/toCommaSeparatedNumber';

const nameInputMaxChar = 32;
const descriptionMaxChar = 800;

export const schema = [
  {
    name: 'name',
    type: 'input',
    label: 'نام محصول',
    suffix: (
      <CPToolTip title={`حداکثر ${nameInputMaxChar} کارکتر`}>
        <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
      </CPToolTip>
    ),
    validation: Yup.string()
      .max(nameInputMaxChar, 'حداکثر ۳۲ کاراکتر مجاز است')
      .required('این فیلد اجباری است'),
    config: {
      required: true,
      placeholder: 'نام محصول را وارد کنید',
      grid: 24,
    },
  },
  {
    name: 'productPrice',
    type: 'input',
    label: 'بهای محصول (ریال)',
    suffix: (
      <p style={{ fontWeight: 'bold', fontSize: 12, color: '#262626' }}>ریال</p>
    ),
    validation: Yup.string()
      .matches(/^[0-9,]*$/, 'بهای محصول را وارد کنید')
      .nullable(),
    formatValue: toCommaSeparatedNumber,
    config: {
      required: true,
      placeholder: 'بهای محصول را وارد کنید',
      grid: 24,
    },
  },
  {
    name: 'description',
    label: 'توضیحات',
    type: 'textarea',
    validation: Yup.string()
      .max(descriptionMaxChar, 'حداکثر ۸۰۰ کارکتر')
      .nullable(),

    suffix: (
      <CPToolTip title={`حداکثر ${descriptionMaxChar} کارکتر`}>
        <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
      </CPToolTip>
    ),
    config: {
      rows: 4,
      placeholder: 'متن توضیحات...',
      required: false,
      grid: 24,
    },
  },
];
