export const checkIban = iban =>
  iban.toLowerCase().startsWith('ir')
    ? iban.length === 26 && iban
    : iban.length === 24 && `IR${iban}`;

export const checkNationalCode = code => {
  if (!/^\d{10}$/.test(code)) return false;
  const check = +code[9];
  const sum =
    Array(9)
      .fill()
      .map((_, i) => +code[i] * (10 - i))
      .reduce((x, y) => x + y) % 11;
  return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11);
};

export const checkPhoneNumber = phone => phone.length === 11;

export const checkPostalCode = code => code.length === 10;
