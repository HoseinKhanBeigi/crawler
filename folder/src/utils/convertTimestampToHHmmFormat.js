import moment from 'moment';

const convertTimestampToHHmmFormat = timestamp =>
  moment(
    `${
      new Date(timestamp).getHours() < 10
        ? `0${new Date(timestamp).getHours()}`
        : new Date(timestamp).getHours()
    }:${
      new Date(timestamp).getMinutes() < 10
        ? `0${new Date(timestamp).getMinutes()}`
        : new Date(timestamp).getMinutes()
    }`,
    'HH:mm',
  );
export default convertTimestampToHHmmFormat;
