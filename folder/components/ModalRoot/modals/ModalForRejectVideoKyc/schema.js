import * as Yup from 'yup';

export const schema = (types, setIsOtherReason, widthDesc) => [
  {
    name: 'rejectionCauseKycVideo',
    label: 'دلیل رد کردن',
    type: 'select',
    onChange: value => setIsOtherReason(value),
    validation: Yup.string().required('این فیلد اجباری است'),
    data: types?.map(a => ({
      value: a.value,
      label: a.text,
    })),
    config: {
      required: true,
      grid: 24,
      placeholder: 'لطفا دلیل رد کردن را انتخاب کنید',
    },
  },
  {
    label: 'توضیحات',
    name: 'description',
    type: 'textarea',
    validation:
      widthDesc === 'OTHER'
        ? Yup.string().required('این فیلد ضروری است')
        : null,
    config: {
      visibile: widthDesc === 'OTHER',
      required: true,
      placeholder: 'توضیحات رد کردن درخواست را بنویسید',
      grid: 24,
    },
  },
];
