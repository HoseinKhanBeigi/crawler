import jalaliMoment from 'moment-jalaali';

export const filters = {
  PRODUCTS: 'PRODUCTS',
  DATE: 'DATE',
  DATE_FROM: 'DATE_FROM',
  DATE_TO: 'DATE_TO',
  SALE_CHANNELS: 'SALE_CHANNELS',
  PROVIDERS: 'PROVIDERS',
};

export const localizedFiltersNames = {
  [filters.PRODUCTS]: 'محصولات',
  [filters.DATE]: 'بازه زمانی',
  [filters.DATE_FROM]: 'بازه زمانی از',
  [filters.DATE_TO]: 'بازه زمانی تا',
  [filters.SALE_CHANNELS]: 'کانال های فروش',
  [filters.PROVIDERS]: 'تامین کنندگان',
};

export const dateFilterOptions = {
  SELECT_RANGE: 'SELECT_RANGE',
  PAST_SIX_MONTHS: 'PAST_SIX_MONTHS',
  PAST_THREE_MONTHS: 'PAST_THREE_MONTHS',
  LAST_YEAR: 'LAST_YEAR',
  CURRENT_YEAR: 'CURRENT_YEAR',
};

export const localizedDateFilterOptions = {
  [dateFilterOptions.SELECT_RANGE]: 'انتخاب بازه زمانی',
  [dateFilterOptions.PAST_SIX_MONTHS]: 'شش ماه گذشته',
  [dateFilterOptions.PAST_THREE_MONTHS]: 'سه ماه گذشته',
  [dateFilterOptions.LAST_YEAR]: 'سال گذشته',
  [dateFilterOptions.CURRENT_YEAR]: 'سال جاری',
};

export const dateFilterOptionsValues = {
  [dateFilterOptions.PAST_SIX_MONTHS]: {
    dateFrom: jalaliMoment().subtract(6, 'jMonth'),
    dateTo: jalaliMoment(),
  },
  [dateFilterOptions.PAST_THREE_MONTHS]: {
    dateFrom: jalaliMoment().subtract(3, 'jMonth'),
    dateTo: jalaliMoment(),
  },
  [dateFilterOptions.LAST_YEAR]: {
    dateFrom: jalaliMoment().subtract(1, 'jYear'),
    dateTo: jalaliMoment(),
  },
  [dateFilterOptions.CURRENT_YEAR]: {
    dateFrom: jalaliMoment().startOf('jYear'),
    dateTo: jalaliMoment().endOf('jYear'),
  },
};

const showDateRanges = selectedDateFilter =>
  selectedDateFilter === dateFilterOptions.SELECT_RANGE;

export const filtersSchema = ({
  products,
  providers,
  filterFields,
  saleChannels,
  selectedDateFilterOption,
  setSelectedDateFilterOption,
}) =>
  [
    {
      name: filters.DATE,
      label: localizedFiltersNames[filters.DATE],
      type: 'select',
      onChange: setSelectedDateFilterOption,
      data: Object.keys(dateFilterOptions).map(key => ({
        value: key,
        label: localizedDateFilterOptions[key],
      })),
      config: {
        grid: 24,
        placeholder: 'بازه زمانی را انتخاب کنید',
      },
    },
    {
      name: filters.DATE_FROM,
      label: localizedFiltersNames[filters.DATE_FROM],
      type: 'date',
      config: {
        grid: 24,
        placeholder: 'تاریخ را انتخاب کنید',
      },
    },
    {
      name: filters.DATE_TO,
      label: localizedFiltersNames[filters.DATE_TO],
      type: 'date',
      config: {
        grid: 24,
        placeholder: 'تاریخ را انتخاب کنید',
      },
    },
    {
      name: filters.PROVIDERS,
      label: localizedFiltersNames[filters.PROVIDERS],
      type: 'select',
      mode: 'multiple',
      data:
        providers &&
        providers.map(({ title, code }) => ({ value: code, label: title })),
      config: {
        grid: 24,
        withDeleteButton: true,
        placeholder: 'نام تامین کننده را انتخاب کنید',
      },
    },
    {
      name: filters.SALE_CHANNELS,
      label: localizedFiltersNames[filters.SALE_CHANNELS],
      type: 'select',
      mode: 'multiple',
      data:
        saleChannels &&
        saleChannels.map(({ title, code }) => ({ value: code, label: title })),
      config: {
        grid: 24,
        withDeleteButton: true,
        placeholder: 'نام کانال فروش را انتخاب کنید',
      },
    },
    {
      name: filters.PRODUCTS,
      label: localizedFiltersNames[filters.PRODUCTS],
      type: 'select',
      mode: 'multiple',
      data:
        products &&
        products.map(({ title, code }) => ({ value: code, label: title })),
      config: {
        grid: 24,
        withDeleteButton: true,
        placeholder: 'نام محصول را انتخاب کنید',
      },
    },
  ].filter(
    field =>
      filterFields?.includes(field.name) ||
      (showDateRanges(selectedDateFilterOption) &&
        (field.name === filters.DATE_FROM || field.name === filters.DATE_TO)),
  );
