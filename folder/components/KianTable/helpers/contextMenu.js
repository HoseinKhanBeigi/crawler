export const currentContextMenuRow = () =>
  JSON.parse(localStorage.getItem('contextMenuRow'));

export const setContextMenuRowObject = row =>
  localStorage.setItem('contextMenuRow', JSON.stringify(row));
