export const groupByFilters = {
  LEVEL: 'LEVEL',
  TYPE: 'TYPE',
};

export const localizedGroupByFiltersNames = {
  [groupByFilters.LEVEL]: 'سطح',
  [groupByFilters.TYPE]: 'نوع',
};

export const groupByLevelOptionsNames = {
  PROVIDERS: 'PROVIDERS',
  SALE_CHANNELS: 'SALE_CHANNELS',
  PRODUCTS: 'PRODUCTS',
};

export const groupByTypeOptionsNames = {
  ANNULMENT: 'ANNULMENT',
  EXPORTATION: 'EXPORTATION',
  BALANCE: 'BALANCE',
  ISSUANCE: 'ISSUANCE',
};

export const groupByFiltersOptions = {
  [groupByFilters.LEVEL]: {
    [groupByLevelOptionsNames.PROVIDERS]: {
      title: 'تامین کنندگان',
      value: 'PROVIDERS',
    },
    [groupByLevelOptionsNames.PRODUCTS]: {
      title: 'محصولات',
      value: 'PRODUCTS',
    },
    [groupByLevelOptionsNames.SALE_CHANNELS]: {
      title: 'کانال های فروش',
      value: 'SALE_CHANNELS',
    },
  },
  [groupByFilters.TYPE]: {
    [groupByTypeOptionsNames.EXPORTATION]: {
      title: 'صدور',
      value: 'EXPORTATION',
    },
    [groupByTypeOptionsNames.ANNULMENT]: { title: 'ابطال', value: 'ANNULMENT' },
    [groupByTypeOptionsNames.ISSUANCE]: { title: 'نت صدور', value: 'ISSUANCE' },
    [groupByTypeOptionsNames.BALANCE]: { title: 'مانده', value: 'BALANCE' },
  },
};

const getFieldOptions = (fieldName, fields) =>
  fields?.find(field => field.name === fieldName)?.options || [];

const availableOptions = (fieldName, fields) => {
  const fieldOptions = getFieldOptions(fieldName, fields);
  return Object.entries(groupByFiltersOptions[fieldName])
    .filter(([key]) => fieldOptions.includes(key))
    .map(([, option]) => option);
};
const availableFields = fieldNames => field =>
  (fieldNames || []).includes(field.name);

export const groupBySchema = ({ fields }) =>
  [
    {
      name: groupByFilters.LEVEL,
      title: localizedGroupByFiltersNames[groupByFilters.LEVEL],
      options: availableOptions(groupByFilters.LEVEL, fields),
    },
    {
      name: groupByFilters.TYPE,
      title: localizedGroupByFiltersNames[groupByFilters.TYPE],
      options: availableOptions(groupByFilters.TYPE, fields),
    },
  ].filter(availableFields(fields?.map(field => field.name)));
