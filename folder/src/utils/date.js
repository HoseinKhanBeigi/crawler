import moment from 'moment-jalaali';

moment.locale('fa');
moment.loadPersian({ dialect: 'persian-modern' });

export default function convertToJalaliDate(date, format = 'jYYYY/jMM/jDD') {
  const isValidDate = moment(date).isValid();
  if (isValidDate) {
    const jalaliDate = moment(date).format(format);
    return jalaliDate;
  }
  const epochDate = parseInt(date, 10);
  const epochDataConverted = new Date(epochDate);
  const jalaliDate = moment(epochDataConverted).format(format);
  return jalaliDate;
}
