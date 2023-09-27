import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Skeleton, Spin } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ChartCard.scss';
import ChartLoader from '../../../../components/ChartsRoot/ChartLoader/ChartLoader';
import useDashboardChart from '../../hooks/useDashboardChart';
import FormBuilder from '../../../../components/FormBuilder';
import filterFormSchema from '../../schemas/filterFormSchema';
import CPButton from '../../../../components/CP/CPButton';
import { prepareFiltersForRequest } from '../../../../helpers/chartReportServiceHelpers';

const ChartCard = ({
  chart: Chart,
  dateFilterOptions,
  defaultFilter,
  filterFields,
  chartOptions,
  name,
  service,
  title,
  prepareDataForChartCallback,
  ...reduxProps
}) => {
  const { filterFormValues, onSubmitFilters, mounting } = useDashboardChart(
    name,
    defaultFilter,
  );
  const ChartComponent = useMemo(() => {
    const getDataHandler = async () => {
      try {
        const { result = [] } = await service(
          prepareFiltersForRequest(filterFormValues),
        );
        const dataPreparedForChart = prepareDataForChartCallback(result);
        return Promise.resolve(dataPreparedForChart);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    return (
      <div style={{ height: '100%' }} key={`ChartComponent_${name}`}>
        {Chart ? (
          <ChartLoader>
            <Chart service={getDataHandler} options={chartOptions} />
          </ChartLoader>
        ) : null}
      </div>
    );
  }, [filterFormValues]);

  const products = [
    reduxProps.products?.length > 2
      ? {
          title: 'همه محصولات',
          code: '',
        }
      : [],
    ...(reduxProps.products ? reduxProps.products : []),
  ];

  const submitFormCallbackRef = useRef();

  const bindFormikProps = formikProps => {
    submitFormCallbackRef.current = formikProps.submitForm;
  };

  const submitFormHandler = () => {
    if (submitFormCallbackRef.current) submitFormCallbackRef.current();
  };

  return (
    <div className={s.container}>
      {mounting ? (
        <Skeleton
          className={s.skeleton}
          active
          paragraph={filterFields?.length ? { rows: 2 } : false}
        />
      ) : (
        <>
          <h3>{title}</h3>
          {filterFields?.length && (
            <div className={s.form}>
              <FormBuilder
                bindFormikProps={bindFormikProps}
                schema={filterFormSchema({
                  filterFields,
                  dateFilterOptions,
                  products,
                })}
                onSubmit={onSubmitFilters}
                hideSubmit
                initialValues={filterFormValues}
                layout="horizontal"
              />
              <CPButton type="primary" onClick={submitFormHandler}>
                اعمال
              </CPButton>
            </div>
          )}
        </>
      )}
      <div>
        {mounting ? (
          <Spin className={s.skeletonSpin} spinning />
        ) : (
          ChartComponent
        )}
      </div>
    </div>
  );
};

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  chart: PropTypes.element.isRequired,
  service: PropTypes.func.isRequired,
  prepareDataForChartCallback: PropTypes.func.isRequired,
  filterFields: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
  chartOptions: PropTypes.object,
  defaultFilter: PropTypes.string,
  dateFilterOptions: PropTypes.array,
};

ChartCard.defaultProps = {
  defaultFilter: undefined,
  dateFilterOptions: undefined,
  chartOptions: undefined,
};

const mapStateToProps = state => ({
  products: state.getProducts.data,
});

export default connect(mapStateToProps)(withStyles(s)(ChartCard));
