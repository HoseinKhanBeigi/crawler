import * as yup from 'yup';

export const importantDetails = [
  {
    name: 'name',
    label: 'نام و نام‌خانوادگی',
    type: 'input',
    config: {
      disabled: true,
      grid: 12,
    },
  },
  {
    name: 'amount',
    label: 'اعتبار درخواستی',
    type: 'input',
    config: {
      disabled: true,
      grid: 12,
    },
  },
];

export const schema = (contractTypes, collateral, setContractMaxAmount) => [
  {
    name: 'documentIdentifier',
    label: 'شماره',
    type: 'input',
    validation: yup.string().required(`شماره ${collateral} را وارد نمایید`),
    config: {
      grid: 12,
    },
  },
  {
    name: 'worth',
    label: 'ارزش',
    type: 'input',
    validation: yup
      .number()
      .required('ارزش را وارد نمایید')
      .typeError('ارزش را به (ریال) وارد نمایید'),
    config: {
      grid: 12,
    },
  },
  {
    name: 'shareValue',
    label: 'درصد مالکیت',
    type: 'input',
    validation: yup
      .number()
      .required('درصد مالکیت را وارد نمایید')
      .integer('عدد صحیح وارد نمایید')
      .min(1, 'حداقل ۱ درصد')
      .max(100, 'حداکثر ۱۰۰ درصد')
      .typeError('عدد وارد نمایید (درصد)'),
    config: {
      grid: 12,
    },
  },
  {
    name: 'creditContractTypeId',
    label: 'نوع قرارداد',
    type: 'select',
    data: contractTypes,
    onChange: (value, { field }) =>
      setContractMaxAmount(field.data.find(d => d.value === value).maxAmount),
    validation: yup.number().required('نوع قرارداد را انتخاب نمایید'),
    config: {
      grid: 12,
    },
  },
  {
    name: 'description',
    label: 'توضیحات',
    type: 'textarea',
    validation: yup.string().required('توضیحات را وارد نمایید'),
    config: {
      grid: 24,
    },
  },
];

export const imageTabs = [
  {
    name: 'PAYROLL',
    title: 'فیش حقوقی',
  },
  {
    name: 'ACCOUNT_TURNOVER',
    title: 'گردش حساب',
  },
  {
    name: 'CHEQUE',
    title: 'چک',
  },
];
