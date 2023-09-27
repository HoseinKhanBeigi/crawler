const defaultTableApi = {
  refreshTable: () => {},
  resetTable: () => {},
  setLoading: () => {},
};

export const setKianTableGlobalApi = (tableApi, tableId) => {
  if (process.env.BROWSER && !window.KianTableApi) window.KianTableApi = {};
  if (tableId) window.KianTableApi[tableId] = tableApi;
};

export const unsetKianTableGlobalApi = tableId => {
  if (
    process.env.BROWSER &&
    window.KianTableApi &&
    window.KianTableApi[tableId]
  )
    window.KianTableApi[tableId] = defaultTableApi;
};

export const kianTableApi = tableId => {
  if (
    process.env.BROWSER &&
    window.KianTableApi &&
    window.KianTableApi[tableId]
  ) {
    return window.KianTableApi[tableId];
  }
  return defaultTableApi;
};
