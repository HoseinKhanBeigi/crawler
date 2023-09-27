import { useLayoutEffect, useRef, useState } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
// eslint-disable-next-line camelcase
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

// eslint-disable-next-line camelcase
function am4themes_crmTheme(target) {
  if (target instanceof am4core.ColorSet) {
    // eslint-disable-next-line no-param-reassign
    target.list = [
      am4core.color('#3E98FF'),
      am4core.color('#FF363E'),
      am4core.color('#FFA130'),
      am4core.color('#19DBA7'),
      am4core.color('#D36CE6'),
      am4core.color('#B1CC21'),
      am4core.color('#434AFF'),
      am4core.color('#C21868'),
      am4core.color('#E95C38'),
      am4core.color('#009BA4'),
      am4core.color('#898DB7'),
    ];
  }
}

am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_crmTheme);

/**
 * service callback that get chart data.
 *
 * @async
 * @callback getData
 * @return {Promise} The data from the URL.
 */

/**
 * Callback function that returns amChart config object.
 *
 * @callback jsonConfigCallback
 * @param data - the Data.
 * @return {Object} amChart config
 */

/**
 * Callback function that add additional config to the chart
 *
 * @callback imperativeConfigCallback
 * @param chartRef - the Chart Ref.
 * @param [data] - the Data.
 * @param [chartContainerRef] - the Chart Container Ref.
 */

/**
 * AmCharts Config Object
 *
 * @typedef {Object} AmChartConfig
 * @property {jsonConfigCallback} [jsonConfigCallback] - Callback that returns config object.
 * @property {imperativeConfigCallback} [imperativeConfigCallback] - Callback function that add additional config to the chart
 * @property chartType - chart type e.g am4charts.XYChart
 */

/**
 * @typedef {Object} useAmChartReturnObject
 * @property {Object} chartContainerRef - chart containers reference,
 * @property {Object} chartRef - chart reference,
 * @property {boolean} loading - loading state,
 * @property {boolean} noData - no data boolean,
 */

/**
 * custom hook that creates amChart4 chart from configs.
 *
 * @param {getData} getDataAsync - callback that request chart data and returns axios Response object.
 * @param {AmChartConfig} amChartConfig - chart config object.
 * @param {Array} deps - an array of dependencies that rerender chart base on.
 * @returns {useAmChartReturnObject}
 */
const useAmChart = (
  getDataAsync,
  { jsonConfigCallback, imperativeConfigCallback, chartType },
  deps = [],
) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  useLayoutEffect(() => {
    setLoading(true);
    setNoData(false);
    getDataAsync().then(data => {
      if (data) {
        setLoading(false);
        chartRef.current = am4core.createFromConfig(
          jsonConfigCallback ? jsonConfigCallback(data) : {},
          chartContainerRef.current,
          chartType,
        );
        if (imperativeConfigCallback) {
          imperativeConfigCallback(chartRef.current, data);
        }
      } else {
        setLoading(false);
        setNoData(true);
      }
    });
    return () => {
      chartRef.current?.dispose();
    };
  }, [...deps]);

  return {
    chartContainerRef,
    chartRef,
    loading,
    noData,
  };
};
export default useAmChart;
