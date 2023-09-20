export const unitToggleActivationLabel = status => {
  const unitStatus = {
    ACTIVE: 'غیرفعال‌سازی',
    INACTIVE: 'فعال‌سازی',
  };
  return unitStatus[status];
};

export const unitTypeNames = {
  BRANCH: 'شعبه',
  REPRESENTATIVE: 'نمایندگی',
  AGENT: 'کارگزار',
};
