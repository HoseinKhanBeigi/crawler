export const getProductCodeSelector = state =>
  state.opportunities?.currentUser?.productCode;

const nonEditableProductCodes = [];

export const isProductEditableSelector = state =>
  !nonEditableProductCodes.includes(getProductCodeSelector(state));
