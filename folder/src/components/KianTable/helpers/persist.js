const TABLE_DATA = 'TABLE_DATA';

const persist = data => {
  localStorage.setItem(TABLE_DATA, JSON.stringify(data));
};

const savedData = () => JSON.parse(localStorage.getItem(TABLE_DATA)) || {};

export const getTableDataFromLocalStorage = tableId => savedData()[tableId];

export const saveTableDataInLocalStorage = (data, tableId) => {
  persist({
    ...savedData(),
    [tableId]: data,
  });
};

export const removeTableDataFromLocalStorage = tableId => {
  const { [tableId]: removed, ...remained } = savedData();
  persist(remained);
};
