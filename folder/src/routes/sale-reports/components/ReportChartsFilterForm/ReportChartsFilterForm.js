import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import PropTypes from 'prop-types';
// import PropTypes from 'prop-types';
import FormBuilder from '../../../../components/FormBuilder';
import CPLoading from '../../../../components/CP/CPLoading';
import {
  dateFilterOptions,
  filterFormFieldsName,
} from '../../../../helpers/chartReportServiceHelpers';
import filterFormSchema from '../../schemas/filterFormSchema';

const ReportChartsFilterForm = React.forwardRef(
  (
    { crmUsers, saleProducts, loading, value, onSubmit, filterOptions },
    ref,
  ) => {
    const [selectedDateFilterOption, setSelectedDateFilterOption] = useState(
      value ? value[filterFormFieldsName.date] : null,
    );

    useEffect(() => {
      if (value) {
        setSelectedDateFilterOption(value[filterFormFieldsName.date]);
      }
    }, [value]);

    const submitFormCallback = useRef();
    const bindSubmitFormCallback = props => {
      submitFormCallback.current = props?.submitForm;
    };
    useImperativeHandle(
      ref,
      () => ({
        submit: submitFormCallback.current,
      }),
      [],
    );

    return (
      <CPLoading spinning={loading}>
        <FormBuilder
          bindFormikProps={bindSubmitFormCallback}
          hideSubmit
          initialValues={value}
          schema={filterFormSchema({
            crmUsers,
            saleProducts,
            filterFields: filterOptions?.filterFields || [],
            dateFilterOptions:
              filterOptions?.defaultDateFilter &&
              filterOptions?.dateFilterOptions,
            selectedDateFilterOption,
            setSelectedDateFilterOption,
          })}
          onSubmit={form => {
            if (selectedDateFilterOption !== dateFilterOptions.SELECT_RANGE) {
              const {
                [filterFormFieldsName.dateFrom]: dateFromField,
                [filterFormFieldsName.dateTo]: dateToField,
                ...values
              } = form;
              onSubmit(values);
            } else {
              onSubmit(form);
            }
          }}
          layout="vertical"
        />
      </CPLoading>
    );
  },
);

ReportChartsFilterForm.propTypes = {
  value: PropTypes.object.isRequired,
  crmUsers: PropTypes.object.isRequired,
  saleProducts: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  filterOptions: PropTypes.array.isRequired,
};

export default ReportChartsFilterForm;
