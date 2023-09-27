import CPMessage from '../../components/CP/CPMessage';

/* eslint-disable no-unused-expressions */

let forbidden = false;

const logoutHandler = () => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (process.env.BROWSER) window.location.href = '/logout';
    }, 1000);
  };
};

const forceLogout = logoutHandler();

export const errorHandler = async (axiosResponse, errorObject) => {
  const { message = '' } = axiosResponse?.config || {};
  const { data } = axiosResponse || {};
  switch (data?.status) {
    case 403:
      !forbidden && CPMessage('خطای اعتبارسنجی!', 'error');
      forbidden = true;
      forceLogout();
      break;
    default:
      CPMessage(data?.detail || message?.error || 'مشکلی پیش آمد!', 'error');
      break;
  }
  return errorObject;
};
