export const createSettingsWithHiddenColumns = (uiSettings, tableId, cols) => {
  const newSettings = { ...uiSettings };
  if (newSettings.tables[tableId]) {
    if (
      JSON.stringify(newSettings.tables[tableId].hiddenColumns) ===
      JSON.stringify(cols)
    ) {
      return null;
    }
    newSettings.tables[tableId].hiddenColumns = cols;
  } else {
    newSettings.tables[tableId] = {
      hiddenColumns: cols,
    };
  }
  return newSettings;
};

export const createSettingsWithTablesTheme = (uiSettings, theme) => {
  const newSettings = { ...uiSettings };
  newSettings.globalSettings.table.theme = theme;
  return newSettings;
};

export const createSettingsWithTablesSize = (uiSettings, size) => {
  const newSettings = { ...uiSettings };
  newSettings.globalSettings.table.size = size;
  return newSettings;
};
