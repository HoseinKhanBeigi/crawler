import * as Yup from 'yup';

import { voipStatus } from '../../../../utils/voipTypes';

const typeList = [
  {
    text: 'تماس ورودی',
    value: 'INCOMING',
  },
  {
    text: 'تماس خروجی',
    value: 'OUTGOING',
  },
];

export const voipForm = (
  callTypes,
  followUpMessageVisibility,
  setFollowUpMessageVisibility,
) => [
  {
    name: 'subject',
    label: 'عنوان تماس',
    type: 'input',
    validation: Yup.string().required('این فیلد ضروری است'),
    config: {
      required: true,
      placeholder: 'عنوان تماس را اینجا بنویسید',
      grid: 12,
    },
  },
  {
    name: 'code',
    label: 'دلیل تماس',
    type: 'select',
    validation: Yup.string().required('این فیلد ضروری است'),
    data: callTypes?.map(type => ({
      value: type.code,
      label: type.title,
    })),
    config: {
      required: true,
      grid: 12,
      placeholder: 'انتخاب کنید',
    },
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'جزئیات تماس',
    validation: Yup.string().required('این فیلد ضروری است'),
    config: {
      required: true,
      placeholder: 'جزئیات تماس را اینجا بنویسید',
      grid: 24,
    },
  },
  {
    name: 'followUp',
    label: 'نیاز به پیگیری ',
    validation: Yup.string().required('این فیلد ضروری است'),
    type: 'radio',
    onChange: value => setFollowUpMessageVisibility(value),
    config: {
      grid: 24,
      required: true,
    },
    data: [
      {
        label: 'دارد',
        value: true,
      },
      {
        label: 'ندارد',
        value: false,
      },
    ],
  },
  {
    name: 'followUpMessage',
    type: 'textarea',
    label: 'پیام برای پیگیری',
    validation: followUpMessageVisibility
      ? Yup.string().required('این فیلد ضروری است')
      : null,
    config: {
      required: followUpMessageVisibility,
      placeholder: 'لطفا جزییات پیگیری را وارد کنید : ',
      grid: 24,
      visibile: followUpMessageVisibility,
    },
  },
];

export const manualForm = (
  callTypes,
  handleSetDate,
  followUpMessageVisibility,
  setFollowUpMessageVisibility,
) => [
  {
    name: 'callType',
    label: 'نوع تماس',
    type: 'select',
    validation: Yup.string().required('این فیلد ضروری است'),
    data: typeList?.map(type => ({
      value: type.value,
      label: type.text,
    })),
    config: {
      required: true,
      grid: 12,
      placeholder: 'انتخاب کنید',
    },
  },
  {
    name: 'voipStatusType',
    label: 'وضعیت',
    type: 'select',
    validation: Yup.string().required('این فیلد ضروری است'),
    data: voipStatus?.map(type => ({
      value: type.value,
      label: type.text,
    })),
    config: {
      required: true,
      grid: 12,
      placeholder: 'انتخاب کنید',
    },
  },
  {
    name: 'timeDate',
    label: 'تاریخ تماس',
    type: 'date',
    validation: Yup.string().required('این فیلد ضروری است'),
    onChange: handleSetDate,
    config: {
      required: true,
      grid: 12,
      placeholder: 'انتخاب کنید',
    },
  },
  {
    name: 'duration',
    label: 'طول مکالمه',
    type: 'input',
    validation: Yup.string().required('این فیلد ضروری است'),
    config: {
      required: true,
      grid: 12,
      placeholder: 'انتخاب کنید',
    },
  },
  {
    name: 'subject',
    label: 'عنوان تماس',
    type: 'input',
    validation: Yup.string().required('این فیلد ضروری است'),
    config: {
      required: true,
      grid: 12,
      placeholder: 'عنوان تماس را اینجا بنویسید',
    },
  },
  {
    name: 'code',
    label: 'دلیل تماس',
    validation: Yup.string().required('این فیلد ضروری است'),
    type: 'select',
    data: callTypes?.map(type => ({
      value: type.code,
      label: type.title,
    })),
    config: {
      required: true,
      grid: 12,
      placeholder: 'انتخاب کنید',
    },
  },
  {
    name: 'description',
    label: 'جزئیات تماس',
    type: 'textarea',
    validation: Yup.string().required('این فیلد ضروری است'),
    config: {
      required: true,
      grid: 24,
      placeholder: 'جزئیات تماس را اینجا بنویسید',
    },
  },
  {
    name: 'followUp',
    label: 'نیاز به پیگیری ',
    validation: Yup.string().required('این فیلد ضروری است'),
    type: 'radio',
    onChange: value => setFollowUpMessageVisibility(value),
    config: {
      grid: 24,
      required: true,
    },
    data: [
      {
        label: 'دارد',
        value: true,
      },
      {
        label: 'ندارد',
        value: false,
      },
    ],
  },
  {
    name: 'followUpMessage',
    type: 'textarea',
    label: 'پیام برای پیگیری',
    validation: followUpMessageVisibility
      ? Yup.string().required('این فیلد ضروری است')
      : null,
    config: {
      required: followUpMessageVisibility,
      placeholder: 'لطفا جزییات پیگیری را وارد کنید : ',
      grid: 24,
      visibile: followUpMessageVisibility,
    },
  },
];
