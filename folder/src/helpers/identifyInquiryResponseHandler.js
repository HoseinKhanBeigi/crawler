export const fixPersianDate = date => {
  const correctDate = date?.toString(10).split('');
  if (correctDate) {
    correctDate.splice(4, 0, '/');
    correctDate.splice(7, 0, '/');
    correctDate.join('');
  }
  return correctDate;
};

export const genderDetermination = code => {
  const codes = ['زن', 'مرد'];
  return codes[code];
};

export const liveDetermination = code => {
  const codes = ['زنده', 'مرده'];
  return codes[code];
};
