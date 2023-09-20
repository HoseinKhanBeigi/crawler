import * as Yup from 'yup';

const schema = (
  phoneCallTypes,
  followUpMessageVisibility,
  setFollowUpMessageVisibility,
) => {
  const form = [
    {
      name: 'subject',
      type: 'input',
      grid: 24,
      validation: Yup.string().required('این فیلد ضروری است'),
      config: {
        required: true,
        placeholder: 'لطفا موضوع تماس را وارد کنید :',
      },
    },
    {
      name: 'code',
      label: 'دلیل تماس',
      type: 'select',
      validation: Yup.string().required('این فیلد ضروری است'),
      data: phoneCallTypes?.map(type => ({
        value: type.code,
        label: type.title,
      })),
      config: {
        required: true,
        grid: 24,
      },
    },
    {
      name: 'description',
      type: 'textarea',
      validation: Yup.string().required('این فیلد ضروری است'),
      grid: 24,
      config: {
        required: true,
        placeholder: 'لطفا جزییات تماس را وارد کنید : ',
      },
    },
    {
      name: 'followUp',
      grid: 12,
      label: 'نیاز به پیگیری ',
      type: 'radio',
      onChange: value => setFollowUpMessageVisibility(value),
      validation: Yup.string().required('این فیلد ضروری است'),
      config: {
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
      validation: followUpMessageVisibility
        ? Yup.string().required('این فیلد ضروری است')
        : null,
      grid: 12,
      config: {
        required: followUpMessageVisibility,
        visibile: followUpMessageVisibility,
        placeholder: 'لطفا پیام برای پیگیری را وارد کنید : ',
      },
    },
  ];
  return form;
};

export default schema;
