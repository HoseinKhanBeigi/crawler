import * as Yup from 'yup';

const schema = handleTypeOfCall => {
  const form = [
    {
      name: 'subject',
      label: 'موضوع',
      placeHolder: 'لطفا موضوع تماس را وارد کنید :',
      type: 'input',
      grid: 24,
      validation: Yup.string().required('وارد کردن موضوع تماس اجباری میباشد'),
      config: {
        required: true,
      },
    },
    {
      name: 'typeOfCall',
      label: 'نوع تماس',
      type: 'select',
      onChange: handleTypeOfCall,
      validation: Yup.array().required('نوع تماس را انتخاب نکرده اید!!'),
      data: [
        {
          label: 'نوع 1',
          value: 'OWNER',
        },
        {
          label: 'نوع 2',
          value: 'TENANT',
        },
      ],
      config: {
        required: true,
        grid: 24,
      },
    },
    {
      name: 'callDetailDescription',
      label: 'جزییات تماس',
      type: 'textarea',
      grid: 24,
      placeHolder: 'لطفا جزییات تماس را وارد کنید : ',
      config: {
        required: false,
      },
    },
    {
      name: 'isFollowUp',
      label: 'نیاز به پیگیری',
      grid: 12,
      type: 'radio',
      data: [
        {
          label: 'دارد',
          value: 'isFollowUp',
        },
        {
          label: 'ندارد',
          value: 'notFollowUp',
        },
      ],
    },
    {
      name: 'isFollowUpِDescription',
      type: 'textarea',
      grid: 12,
      placeHolder: 'لطفا جزییات پیگیری را وارد کنید : ',
      config: {
        required: false,
      },
    },
  ];
  return form;
};

export default schema;
