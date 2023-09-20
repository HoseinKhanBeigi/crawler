import { Icon } from 'antd';
import * as Yup from 'yup';
import React from 'react';
import CPTooltip from '../../../CP/CPTooltip';

const unitTypeNames = {
  BRANCH: 'شعبه',
  REPRESENTATIVE: 'نمایندگی',
  AGENT: 'کارگزار',
};

export const addUnitDetailFormSchema = ({
  cities,
  provinces,
  unitType,
  onSelectProvince,
}) => {
  const form = [
    {
      name: 'name',
      type: 'input',
      label: `نام ${unitTypeNames[unitType]}`,
      suffix: (
        <CPTooltip title="حداکثر ۲۴ کارکتر">
          <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
        </CPTooltip>
      ),
      validation: Yup.string().required('این فیلد اجباری است'),
      config: {
        required: true,
        placeholder: `نام ${unitTypeNames[unitType]} را وارد کنید`,
        grid: 12,
      },
    },
    {
      name: 'provinceClassificationId',
      label: 'استان',
      type: 'select',
      validation: Yup.string().required('این فیلد اجباری است'),
      data: provinces?.map(a => ({
        value: a.id,
        label: a.name,
      })),
      onChange: onSelectProvince,
      config: {
        required: true,
        grid: 12,
        placeholder: 'استان را انتخاب کنید',
      },
    },
    {
      name: 'cityClassificationId',
      label: 'شهر',
      type: 'select',
      validation: Yup.string().required('این فیلد اجباری است'),
      data: cities?.map(a => ({
        value: a.id,
        label: a.name,
      })),
      config: {
        required: true,
        grid: 12,
        placeholder: 'شهر را انتخاب کنید',
      },
    },
    {
      name: 'tel',
      type: 'input',
      label: 'شماره تماس (به همراه پیش شماره)',
      validation: Yup.string().required('این فیلد ضروری است'),
      formatValue: val =>
        val
          .replace(/\D/g, () => '')
          .replace(/\d/g, (num, index) => (index === 3 ? `-${num}` : num)),
      config: {
        required: true,
        placeholder: 'مثال: ۴۵۵۴۷۵۸۶-۰۲۱',
        grid: 12,
      },
    },
    {
      name: 'postalCode',
      type: 'input',
      label: 'کد پستی',
      validation: Yup.string()
        .required('این فیلد ضروری است')
        .matches(/^[0-9]+$/, 'کد پستی فقط میتواند عدد باشد')
        .min(10, 'کد پستی باید شامل ۱۰ رقم باشد')
        .max(10, 'کد پستی باید شامل ۱۰ رقم باشد'),
      config: {
        required: true,
        placeholder: 'کد پستی را اینجا بنویسید',
        grid: 12,
      },
    },
    {
      name: 'address',
      type: 'textarea',
      label: `آدرس ${unitTypeNames[unitType]}`,
      validation: Yup.string().required('این فیلد ضروری است'),
      config: {
        required: true,
        placeholder: `آدرس ${unitTypeNames[unitType]} را اینجا بنویسید`,
        grid: 24,
      },
    },
  ];
  if (unitType === 'BRANCH') {
    form.push({
      name: 'operationType',
      type: 'toggle',
      label: `نوع شعبه`,
      validation: Yup.string().required('این فیلد اجباری است'),
      options: [
        { label: 'عملیاتی', value: 'OPERATIONAL' },
        { label: 'غیر عملیاتی', value: 'NON_OPERATIONAL' },
      ],
      config: {
        required: true,
        placeholder: 'نام شعبه را وارد کنید',
        grid: 12,
      },
    });
  }
  return form;
};
