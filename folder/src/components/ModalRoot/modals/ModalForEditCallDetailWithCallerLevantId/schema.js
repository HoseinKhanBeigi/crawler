import * as Yup from 'yup';

export const schema = (
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
      placeholder: 'لطفا موضوع تماس را وارد کنید :',
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
    type: 'radio',
    onChange: value => setFollowUpMessageVisibility(value),
    validation: Yup.string().required('این فیلد ضروری است'),
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
      visibile: followUpMessageVisibility,
      placeholder: 'لطفا جزییات پیگیری را وارد کنید : ',
      grid: 24,
    },
  },
];
