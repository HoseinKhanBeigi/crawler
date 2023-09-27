import { defineMessages } from 'react-intl';

const messages = defineMessages({
  serverErr: {
    id: 'service.serverErr',
    description: 'service messages',
    defaultMessage: 'server error.',
  },
  invalidReq: {
    id: 'service.invalidReq',
    description: 'service messages',
    defaultMessage: 'invalid request.',
  },
  forbidden: {
    id: 'service.forbidden',
    description: 'service messages',
    defaultMessage: 'user have not the necessary permissions.',
  },
  unauthorized: {
    id: 'service.unauthorized',
    description: 'service messages',
    defaultMessage: 'authentication is required.',
  },
  wrongPassword: {
    id: 'service.wrongPassword',
    description: 'service messages',
    defaultMessage: 'wrong password.',
  },
  rateLimitExceeded: {
    id: 'service.rateLimitExceeded',
    description: 'تعداد دفعات درخواست این سرویس بیش از 4 یا 5 بار شده است.',
    defaultMessage: 'تعداد استعلام بیش از حد مجاز، لطفا دقایقی دیگر تلاش کنید.',
  },
  otpCodeError: {
    id: 'service.otpCodeError',
    description: '',
    defaultMessage: 'رمز یکبار مصرف اشتباه است.',
  },
  sejamRegistrationIncomplete: {
    id: 'service.sejamRegistrationIncomplete',
    description: '',
    defaultMessage: 'ثبت نام کاربر در سجام تکمیل نشده است.',
  },
  sejamTokenInvalid: {
    id: 'service.sejamTokenInvalid',
    description: '',
    defaultMessage: 'توکن سجام اشتباه یا منقضی میباشد.',
  },
  sejamUserNotExist: {
    id: 'service.sejamUserNotExist',
    description: '',
    defaultMessage: ' این کاربر قبلا در سجام ثبت نام نکرده است.',
  },
  serverErrorNotResponse: {
    id: 'service.serverErrorNotResponse',
    description: '',
    defaultMessage: 'این خطا هنگامی رخ میدهد که سرویس شما پاسخگو نباشد.',
  },
});

export default messages;
