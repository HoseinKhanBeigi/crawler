import React from 'react';
import PropTypes from 'prop-types';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import useAmChart from '../../../hooks/useAmChart';
import ChartContainer from '../../../components/ChartsRoot/ChartContainer/ChartContainer';

const generateXYChartSeries = (data, category) => {
  const valueY = new Set();
  data.forEach(value => {
    Object.keys(value)
      .filter(key => key !== category)
      .forEach(name => {
        valueY.add(name);
      });
  });
  return [...valueY.values()].map(key => ({
    type: 'ColumnSeries',
    dataFields: {
      valueY: key,
      categoryX: category,
    },
    name: key,
    stacked: true,
    sequencedInterpolation: true,
    columns: {
      template: {
        width: am4core.percent(60),
        tooltipText: '[bold]{name}[/]\n[font-size:12px]{categoryX}: {valueY}',
      },
    },
    bullets: [
      {
        type: 'LabelBullet',
        locationY: 0.5,
        label: {
          text: '{valueY}',
          hideOversized: true,
        },
      },
    ],
  }));
};

const StackedColumnChart = ({
  category,
  service,
  valuesTitle,
  dataTransformBeforeInject,
  withLegend,
}) => {
  const { loading, chartContainerRef, noData } = useAmChart(
    service,
    {
      chartType: am4charts.XYChart,
      jsonConfigCallback: data => ({
        data:
          typeof dataTransformBeforeInject === 'function'
            ? dataTransformBeforeInject(data)
            : data,
        rtl: true,
        xAxes: [
          {
            type: 'CategoryAxis',
            renderer: {
              grid: {
                template: {
                  location: 0,
                },
              },
              minGridDistance: 20,
            },
            groupData: true,
            dataFields: {
              category,
            },
          },
        ],
        yAxes: [
          {
            type: 'ValueAxis',
            title: {
              text: valuesTitle,
              fill: '#aaadb5',
            },
          },
        ],
        series: generateXYChartSeries(
          typeof dataTransformBeforeInject === 'function'
            ? dataTransformBeforeInject(data)
            : data,
          category,
        ),
        legend: withLegend ? {} : undefined,
        cursor: {},
      }),
    },
    [service],
  );

  return (
    <ChartContainer
      chartContainerRef={chartContainerRef}
      loading={loading}
      noData={noData}
    />
  );
};

StackedColumnChart.propTypes = {
  valuesTitle: PropTypes.string,
  category: PropTypes.string.isRequired,
  service: PropTypes.func.isRequired,
  dataTransformBeforeInject: PropTypes.func,
  withLegend: PropTypes.bool,
};

StackedColumnChart.defaultProps = {
  valuesTitle: undefined,
  dataTransformBeforeInject: undefined,
  withLegend: true,
};

export default StackedColumnChart;
