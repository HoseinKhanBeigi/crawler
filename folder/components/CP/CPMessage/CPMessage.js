import { message } from 'antd';

const CPMessage = (text, type = 'info', timeout = 3) => {
  if (!process.env.BROWSER || !text) return; // should check this and return if we call this function outside of browser!

  switch (type) {
    case 'success': {
      message.success(text, timeout);
      break;
    }
    case 'warning': {
      message.warning(text, timeout);
      break;
    }
    case 'error': {
      message.error(text, timeout);
      break;
    }
    default: {
      message.info(text, timeout);
      break;
    }
  }
};

export default CPMessage;
