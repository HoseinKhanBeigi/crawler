const sejamStaus = {
  INIT: 'کاربر در سجام ثبت نام نکرده است',
  NOTFOUND: 'کاربر در سجام ثبت نام نکرده است',
  SUCCESSPAYMENT: 'ثبت نام کاربر در سجام کامل نشده است',
  POLICYACCEPTED: 'ثبت نام کاربر در سجام کامل نشده است',
  TRACECODE: 'کد پیگیری سجام صادر شده است. در انتظار احراز هویت حضوری.',
  INVALIDINFORMATION: 'عدم تایید اطلاعات توسط سجام. نیاز به ویرایش اطلاعات',
  PENDINGVALIDATION: 'در انتظار تایید اطلاعات توسط سجام',
  SEJAMI: 'کاربر در سجام احراز هویت شده است(سجامی).',
  SUSPEND: 'کاربر در سجام تعلیق شده است',
  DEAD: 'صاحب کد ملی فوت شده است',
  SEMISEJAMI:
    'شبه سجامی، در انتظار احراز هویت مجدد یا اصلاح شماره همراه در سجام',
  INVALIDNATIONALCODE: 'کد ملی اشتباه است',
};
const translateSejamStatus = status => sejamStaus[status];

export default translateSejamStatus;
