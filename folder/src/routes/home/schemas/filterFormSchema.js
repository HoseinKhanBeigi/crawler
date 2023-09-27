import {
  dateFilterOptions,
  filterFormFieldsName,
  filterFormFieldsNameTranslate,
} from '../../../helpers/chartReportServiceHelpers';

const filterFormSchema = ({
  products,
  filterFields,
  dateFilterOptions: dateOptions,
}) =>
  [
    {
      name: filterFormFieldsName.product,
      label: filterFormFieldsNameTranslate[filterFormFieldsName.product],
      type: 'select',
      data:
        !!products?.length &&
        products.map(({ title, code }) => ({
          value: code,
          label: title,
        })),
      config: {
        grid: 12,
        placeholder: `${
          filterFormFieldsNameTranslate[filterFormFieldsName.product]
        } را انتخاب کنید`,
      },
    },
    {
      name: filterFormFieldsName.date,
      label: filterFormFieldsNameTranslate[filterFormFieldsName.date],
      type: 'select',
      data: Object.entries(dateFilterOptions)
        .map(([, label]) => ({
          label,
          value: label,
        }))
        .filter(item => dateOptions && dateOptions.includes(item.label)),
      config: {
        grid: 12,
        placeholder: `${
          filterFormFieldsNameTranslate[filterFormFieldsName.date]
        } را انتخاب کنید`,
      },
    },
  ].filter(input => filterFields.includes(input.name));
export default filterFormSchema;
