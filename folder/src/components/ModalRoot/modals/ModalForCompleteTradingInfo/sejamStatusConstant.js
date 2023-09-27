const sejamStaus = {
  Init: 'کاربر در سجام ثبت نام نکرده است',
  NOTFOUND: 'کاربر در سجام ثبت نام نکرده است',
  SuccessPayment: 'ثبت نام کاربر در سجام کامل نشده است',
  PolicyAccepted: 'ثبت نام کاربر در سجام کامل نشده است',
  TraceCode: 'کد پیگیری سجام; در انتظار احراز هویت حضوری.',
  InvalidInformation: 'عدم تایید اطلاعات توسط سجام. نیاز به ویرایش اطلاعات',
  PendingValidation: 'در انتظار تایید اطلاعات توسط سجام',
  Sejami: 'احراز هویت شده در سجام (سجامی)',
  Suspend: 'کاربر در سجام تعلیق شده است',
  Dead: 'صاحب کد ملی فوت شده است',
  SemiSejami: '.شبه سجامی',
};
const translateSejamStatus = status => sejamStaus[status];
export default translateSejamStatus;
