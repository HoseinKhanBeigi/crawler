import saleOpportunityStates from '../../../utils/saleOpportunityStates';
import {
  dateFilterOptions,
  filterFormFieldsName,
  filterFormFieldsNameTranslate,
} from '../../../helpers/chartReportServiceHelpers';

const showDateRanges = selectedDateFilter =>
  selectedDateFilter === dateFilterOptions.SELECT_RANGE;

const filterFormSchema = ({
  crmUsers,
  saleProducts,
  filterFields,
  dateFilterOptions: dateOptions,
  selectedDateFilterOption,
  setSelectedDateFilterOption,
}) =>
  [
    {
      name: filterFormFieldsName.saleProducts,
      label: filterFormFieldsNameTranslate[filterFormFieldsName.saleProducts],
      type: 'select',
      mode: 'multiple',
      data:
        saleProducts &&
        saleProducts?.map(({ name, id }) => ({
          value: id,
          label: name,
        })),
      config: {
        grid: 24,
        withDeleteButton: true,
        placeholder: 'نام محصول را انتخاب کنید',
      },
    },
    {
      name: filterFormFieldsName.users,
      label: filterFormFieldsNameTranslate[filterFormFieldsName.users],
      type: 'select',
      mode: 'multiple',
      data:
        crmUsers &&
        crmUsers?.map(a => ({
          label: `${a.fullName}`,
          value: a.levantId,
        })),
      config: {
        grid: 24,
        withDeleteButton: true,
        placeholder: 'نام کاربر را انتخاب کنید',
      },
    },
    {
      name: filterFormFieldsName.saleState,
      label: filterFormFieldsNameTranslate[filterFormFieldsName.saleState],
      type: 'select',
      mode: 'multiple',
      data: Object.entries(saleOpportunityStates).map(([value, label]) => ({
        label,
        value,
      })),
      config: {
        grid: 24,
        withDeleteButton: true,
        placeholder: 'مرحله فروش را انتخاب کنید',
      },
    },
    {
      name: filterFormFieldsName.date,
      label: filterFormFieldsNameTranslate[filterFormFieldsName.date],
      type: 'select',
      onChange: setSelectedDateFilterOption,
      data: Object.entries(dateFilterOptions)
        .map(([, label]) => ({
          label,
          value: label,
        }))
        .filter(item => dateOptions && dateOptions.includes(item.label)),
      config: {
        grid: 24,
        placeholder: 'بازه زمانی را انتخاب کنید',
      },
    },
    {
      name: filterFormFieldsName.dateFrom,
      label: filterFormFieldsNameTranslate[filterFormFieldsName.dateFrom],
      type: 'date',
      config: {
        visible: showDateRanges(selectedDateFilterOption),
        grid: 24,
        placeholder: 'تاریخ را انتخاب کنید',
      },
    },
    {
      name: filterFormFieldsName.dateTo,
      label: filterFormFieldsNameTranslate[filterFormFieldsName.dateTo],
      type: 'date',
      config: {
        visible: showDateRanges(selectedDateFilterOption),
        grid: 24,
        placeholder: 'تاریخ را انتخاب کنید',
      },
    },
  ].filter(
    input =>
      filterFields.includes(input.name) ||
      (filterFields.includes(filterFormFieldsName.date) &&
        (input.name === filterFormFieldsName.dateFrom ||
          input.name === filterFormFieldsName.dateTo)),
  );
export default filterFormSchema;
