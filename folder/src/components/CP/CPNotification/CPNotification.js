import { notification } from 'antd';

const CPNotification = (
  title = '',
  desc = '',
  type = 'info',
  timeout = 0,
  place = 'bottomRight',
) => {
  if (title !== '' || desc !== '') {
    notification[type]({
      message: title,
      description: desc,
      placement: place,
      duration: parseInt(timeout, 10),
    });
  }
};

export default CPNotification;
