import * as Yup from 'yup';
import aclUnitTypes from '../../constants/aclUnitTypes';

const aclNameFormSchema = [
  {
    name: 'title',
    type: 'input',
    label: 'نام دسترسی',
    validation: Yup.string().required('این فیلد اجباری است'),
    config: {
      required: true,
      placeholder: 'نام دسترسی را وارد کنید',
      grid: 6,
    },
  },
  {
    name: 'code',
    type: 'input',
    label: 'کد دسترسی',
    validation: Yup.string().required('این فیلد اجباری است'),
    config: {
      required: true,
      placeholder: 'نام دسترسی را وارد کنید',
      grid: 6,
    },
  },
  {
    name: 'unitTypes',
    type: 'select',
    mode: 'multiple',
    label: 'مرتبه سازمانی',
    validation: Yup.string().required('این فیلد اجباری است'),
    data: Object.entries(aclUnitTypes).map(([value, label]) => ({
      value,
      label,
    })),
    config: {
      required: true,
      placeholder: 'مرتبه سازمانی را انتخاب کنید',
      grid: 6,
    },
  },
];

export default aclNameFormSchema;
