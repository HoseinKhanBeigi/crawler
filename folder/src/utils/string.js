export const getFileExtensionFromPath = path => path && path.split('.').pop();
export const isPersianAlphabet = string => /^[\u0600-\u06FF\s]+$/.test(string);
export const convertFarsiDigits = str =>
  str.replace(/([۰-۹])/g, token =>
    String.fromCharCode(token.charCodeAt(0) - 1728),
  );
