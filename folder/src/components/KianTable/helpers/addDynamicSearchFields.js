const createSearchDataWithColumns = columns =>
  columns.map(col => ({
    title: col.name,
    name: col.code,
    type: 'select',
  }));

export default function addDynamicSearchFields(searchData, columns) {
  return [...searchData, ...createSearchDataWithColumns(columns)];
}
