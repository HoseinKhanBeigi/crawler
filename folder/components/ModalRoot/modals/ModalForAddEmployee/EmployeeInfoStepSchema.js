import * as Yup from 'yup';
import { checkNationalCode } from '../../../../utils/validateField';

export const validationSchema = Yup.object().shape({
  mobileNumber: Yup.number()
    .required('پر کردن فیلد الزامی می باشد.')
    .typeError('تنها وارد کردن اعداد مجاز می باشد.')
    .positive('شماره موبایل نمی تواند یک عدد منفی باشد.')
    .test('len', 'شماره موبایل وارد شده صحیح نیست.', val =>
      new RegExp('^(0)?9\\d{9}$').test(val),
    )
    .nullable(),
  nationalCode: Yup.string()
    .required('پر کردن فیلد الزامی می باشد.')
    .test('nationalCodeCorrect', 'کد ملی وارد شده صحیح نیست.', val =>
      checkNationalCode(val),
    )
    .nullable(),
  email: Yup.string()
    .email('ایمیل معتبر نیست.')
    .nullable(),
  birthdate: Yup.number()
    .test('dob', 'تاریخ تولد باید مربوط به ۱۸ سال پیش و قبلتر باشد', value => {
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age -= 1;
      }
      return age >= 18;
    })
    .required('پر کردن فیلد الزامی می باشد.')
    .nullable(),
  SelectedRole: Yup.number()
    .required('پر کردن فیلد الزامی می باشد.')
    .nullable(),
});
