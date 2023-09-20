export const addRowIndex = (content, page, size) => {
  const addition = page * size + 1;
  return content.map((c, i) => ({
    rowIndex: addition + i,
    ...c,
  }));
};

const withSortColumn = (columns, withSort) =>
  columns.map(c => ({
    ...c,
    sorter: c.sorter !== undefined ? c.sorter : withSort,
  }));

export const addRowIndexColumn = (columns, withSort) => [
  {
    title: 'ردیف',
    dataIndex: 'rowIndex',
    key: 'rowIndex',
    width: 50,
  },
  ...withSortColumn(columns, withSort),
];
