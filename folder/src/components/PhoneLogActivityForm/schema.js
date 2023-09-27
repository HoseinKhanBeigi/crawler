import * as Yup from 'yup';
import { voipStatus } from '../../utils/voipTypes';

export const followUpList = [
  {
    value: true,
    name: 'نیاز به پیگیری دارد',
  },
  {
    value: false,
    name: 'نیاز به پیگیری ندارد',
  },
];

export const typeList = [
  {
    text: 'تماس ورودی',
    value: 'INCOMING',
  },
  {
    text: 'تماس خروجی',
    value: 'OUTGOING',
  },
];

export const schema = (
  phoneCallTypes,
  handleSetDate,
  visibileFollowUpInput,
  handleVisibileFollowUpInput,
  phoneNumbersDetail,
) => {
  const form = [
    {
      name: "phone",
      label: ' شماره تماس انتخابی',
      validation: Yup.string().required('این فیلد ضروری است'),
      type: 'select',
      data: phoneNumbersDetail?.map(num => ({
        value: num.value,
        label: num.label,
      })),
      config: {
        required: true,
        grid: 12,
        placeholder: 'انتخاب کنید',
      },
    },
    {
      label: 'عنوان تماس',
      name: 'subject',
      type: 'input',
      validation: Yup.string().required('این فیلد ضروری است'),
      config: {
        required: true,
        placeholder: ' عنوان تماس را اینجا بنویسید :',
        grid: 12,
      },
    },
    {
      name: 'voipType',
      label: 'نوع تماس',
      validation: Yup.string().required('این فیلد ضروری است'),
      type: 'select',
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
      name: 'code',
      label: 'دلیل تماس',
      validation: Yup.string().required('این فیلد ضروری است'),
      type: 'select',
      data: phoneCallTypes?.map(type => ({
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
      name: 'voipStatusType',
      label: 'وضعیت',
      validation: Yup.string().required('این فیلد ضروری است'),
      type: 'select',
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
      name: 'duration',
      type: 'input',
      label: 'طول مکالمه (ثانیه)',
      validation: Yup.string().required('این فیلد ضروری است'),
      config: {
        required: true,
        placeholder: 'طول مکالمه را اینجا بنویسید',
        grid: 12,
      },
    },
    {
      name: 'startDate',
      label: 'تاریخ تماس',
      type: 'date',
      onChange: handleSetDate,
      config: {
        required: true,
        grid: 12,
        placeholder: 'انتخاب کنید',
      },
    },
    {
      label: 'جزئیات تماس',
      name: 'description',
      type: 'textarea',
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
      onChange: handleVisibileFollowUpInput,
      config: {
        grid: 12,
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
      validation: visibileFollowUpInput
        ? Yup.string().required('این فیلد ضروری است')
        : null,
      config: {
        visibile: visibileFollowUpInput,
        required: visibileFollowUpInput,
        placeholder: 'لطفا جزییات پیگیری را وارد کنید : ',
        grid: 24,
      },
    },
  ];
  return form;
};
