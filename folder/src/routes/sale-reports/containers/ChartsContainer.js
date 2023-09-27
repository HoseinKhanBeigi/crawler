import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// eslint-disable-next-line camelcase
import SaleReportsControl from '../components/SaleReportsControlSection/SaleReportsControlSection';
import s from './ChartsContainer.scss';
import ChartLoader from '../../../components/ChartsRoot/ChartLoader/ChartLoader';
import useSaleReportsFilter from '../hooks/useSaleReportsFilter';
import ChartFilterTagsSection from '../components/ChartFilterTagsSection/ChartFilterTagsSection';
import ChartFilterDrawer from '../components/ChartFilterDrawer/ChartFilterDrawer';
import { prepareFiltersForRequest } from '../../../helpers/chartReportServiceHelpers';

// eslint-disable-next-line camelcase

const reportsName = charts =>
  charts.length && charts.map(report => report.name);

const ChartsContainer = ({ name, charts }) => {
  const {
    crmUsers,
    productsList,
    filterFormRef,
    selectedChart,
    crmUsersLoading,
    onSubmitFilters,
    filterFormValues,
    setSelectedChart,
    toggleFilterDrawer,
    isFilterDrawerOpen,
    setFilterFormValues,
    clearFiltersHandler,
    saleProductsLoading,
    setIsFilterDrawerOpen,
  } = useSaleReportsFilter(charts);

  const ChartComponent = useMemo(() => {
    const Chart = charts[selectedChart]?.component;
    const chartOptions = charts[selectedChart]?.chartOptions;
    const service = async () => {
      try {
        const { service: getData, prepareDataForChartCallback } = charts[
          selectedChart
        ];
        const { result = [] } = await getData(
          prepareFiltersForRequest(filterFormValues),
        );
        const dataPreparedForChart = prepareDataForChartCallback(result);
        return Promise.resolve(dataPreparedForChart);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    return (
      <div
        style={{ height: '100%' }}
        key={`ChartComponent_${name}_${selectedChart}`}
      >
        {Chart ? (
          <ChartLoader>
            <Chart service={service} options={chartOptions} />
          </ChartLoader>
        ) : null}
      </div>
    );
  }, [filterFormValues, selectedChart]);

  const ChartInfo = useMemo(
    () => (
      <div className={s.charts__info}>
        <h3>{charts[selectedChart]?.title}</h3>
        <ChartFilterTagsSection
          filterFields={charts[selectedChart]?.filterFields}
          crmUsers={crmUsers}
          productsList={productsList}
          setFilterFormValues={setFilterFormValues}
          filters={filterFormValues}
          key={name}
        />
      </div>
    ),
    [selectedChart, filterFormValues],
  );

  const hasFilter = charts[selectedChart]?.filterFields?.length;

  return (
    <>
      <div className={s.container}>
        <SaleReportsControl
          hasFilter={hasFilter}
          clearFiltersHandler={clearFiltersHandler}
          onChartTypeChange={setSelectedChart}
          type={name}
          reports={reportsName(charts)}
          toggleFilterDrawer={toggleFilterDrawer}
        />
        <div className={s.charts}>
          {ChartInfo}
          {ChartComponent}
        </div>
      </div>
      {hasFilter && (
        <ChartFilterDrawer
          filterOptions={charts[selectedChart]}
          filterFormRef={filterFormRef}
          formValues={filterFormValues}
          onSubmitFilters={onSubmitFilters}
          isFilterDrawerOpen={isFilterDrawerOpen}
          setIsFilterDrawerOpen={setIsFilterDrawerOpen}
          crmUsers={crmUsers}
          loading={crmUsersLoading && saleProductsLoading}
          productsList={productsList}
        />
      )}
    </>
  );
};

ChartsContainer.propTypes = {
  name: PropTypes.string.isRequired,
  charts: PropTypes.array.isRequired,
};
export default withStyles(s)(ChartsContainer);
