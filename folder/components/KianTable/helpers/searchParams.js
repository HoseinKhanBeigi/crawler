export const hasSearchParams = () => window.location.search;

export const queryFilterObject = () => {
  const searchParams = new URLSearchParams(window.location.search);

  const searchObj = {};
  // eslint-disable-next-line
  for (const [key, value] of searchParams.entries()) {
    searchObj[key] = value;
  }

  return searchObj;
};

export const setSearchParams = filterObject => {
  const params = new URLSearchParams();
  Object.entries(filterObject).forEach(([key, value]) => {
    if (value && String(value).length) params.set(key, value);
  });

  window.history.replaceState(
    null,
    null,
    `${window.location.pathname}${params.toString() ? `?${params}` : ''}`,
  );
};
