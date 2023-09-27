import React from 'react';
import * as am4charts from '@amcharts/amcharts4/charts';
import moment from 'moment-jalaali';
import PropTypes from 'prop-types';
import * as am4core from '@amcharts/amcharts4/core';
import useAmChart from '../../../hooks/useAmChart';
// eslint-disable-next-line css-modules/no-unused-class
import ChartContainer from '../../../components/ChartsRoot/ChartContainer/ChartContainer';

/* eslint-disable no-param-reassign */

const MultiSeriesDateAxisChart = ({
  serviceCallback,
  withScrollbarY,
  dataTransformBeforeInject,
  sortDate,
  valueAxisTitle,
  dateFieldName,
}) => {
  const { noData, chartContainerRef, loading } = useAmChart(
    serviceCallback,
    {
      chartType: am4charts.XYChart,
      imperativeConfigCallback: (chart, data) => {
        chart.data =
          typeof dataTransformBeforeInject === 'function'
            ? dataTransformBeforeInject(data)
            : data;

        chart.rtl = true;

        if (sortDate) {
          chart.events.on('beforedatavalidated', () => {
            chart.data.sort(
              (a, b) => new Date(a[dateFieldName]) - new Date(b[dateFieldName]),
            );
          });
        }

        const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        if (valueAxisTitle) {
          valueAxis.title.text = valueAxisTitle;
          valueAxis.title.fill = '#aaadb5';
        }

        function processOver(hoveredSeries) {
          hoveredSeries.toFront();

          hoveredSeries.segments.each(_segment => {
            _segment.setState('hover');
          });

          hoveredSeries.legendDataItem.marker.setState('default');
          hoveredSeries.legendDataItem.label.setState('default');

          chart.series.each(_series => {
            if (_series !== hoveredSeries) {
              _series.segments.each(_segment => {
                _segment.setState('dimmed');
              });
              _series.bulletsContainer.setState('dimmed');
              _series.legendDataItem.marker.setState('dimmed');
              _series.legendDataItem.label.setState('dimmed');
            }
          });
        }

        function processOut() {
          chart.series.each(_series => {
            _series.segments.each(_segment => {
              _segment.setState('default');
            });
            _series.bulletsContainer.setState('default');
            _series.legendDataItem.marker.setState('default');
            _series.legendDataItem.label.setState('default');
          });
        }

        dateAxis.tooltipDateFormat = 'YYYY/MM/d';

        dateAxis.renderer.labels.template.adapter.add('text', value =>
          moment(value?.length === 3 ? `${value} 01` : value).format(
            value?.length > 3 ? 'jDD jMMMM' : 'jMMMM',
          ),
        );

        dateAxis.adapter.add('getTooltipText', value =>
          moment(`${value}`).format('jDD jMMMM jYYYY'),
        );

        function makeSeries(valueFieldName, title, lineColor) {
          const series = chart.series.push(new am4charts.LineSeries());
          series.dataFields.valueY = valueFieldName;
          series.dataFields.dateX = dateFieldName;
          series.strokeWidth = 2;
          series.minBulletDistance = 15;
          series.tensionX = 0.875;
          series.name = title;

          series.tooltip.background.cornerRadius = 20;
          series.tooltip.background.strokeOpacity = 0;
          series.tooltip.pointerOrientation = 'vertical';
          series.tooltip.label.minWidth = 40;
          series.tooltip.label.minHeight = 40;
          series.tooltip.label.textAlign = 'middle';
          if (lineColor) series.stroke = am4core.color(lineColor);

          const segment = series.segments.template;
          segment.interactionsEnabled = true;

          const hoverState = segment.states.create('hover');
          hoverState.properties.strokeWidth = 3;

          const dimmed = segment.states.create('dimmed');
          dimmed.properties.stroke = am4core.color('#dadada');

          segment.events.on('over', event => {
            processOver(event.target.parent.parent.parent);
          });

          segment.events.on('out', event => {
            processOut(event.target.parent.parent.parent);
          });

          const bullet = series.bullets.push(new am4charts.CircleBullet());
          bullet.circle.strokeWidth = 2;
          bullet.circle.radius = 4;
          bullet.circle.fill = am4core.color('#fff');

          const bulletHover = bullet.states.create('hover');
          bulletHover.properties.scale = 1.5;

          return series;
        }

        const series = data.categories.map(({ code, title }) =>
          makeSeries(code, title),
        );

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = 'panXY';
        chart.cursor.snapToSeries = series;

        if (withScrollbarY) {
          chart.scrollbarY = new am4core.Scrollbar();
          chart.scrollbarY.parent = chart.leftAxesContainer;
          chart.scrollbarY.toBack();
        }

        chart.scrollbarX = new am4charts.XYChartScrollbar();
        series.forEach(s => {
          chart.scrollbarX.series.push(s);
        });
        chart.scrollbarX.parent = chart.bottomAxesContainer;

        chart.legend = new am4charts.Legend();
        chart.legend.position = 'bottom';
        chart.legend.scrollable = true;

        chart.legend.markers.template.states.create(
          'dimmed',
        ).properties.opacity = 0.3;
        chart.legend.labels.template.states.create(
          'dimmed',
        ).properties.opacity = 0.3;

        chart.legend.itemContainers.template.events.on('over', event => {
          processOver(event.target.dataItem.dataContext);
        });

        chart.legend.itemContainers.template.events.on('out', event => {
          processOut(event.target.dataItem.dataContext);
        });

        dateAxis.start = 0.5;
      },
    },
    [serviceCallback],
  );
  return (
    <ChartContainer
      chartContainerRef={chartContainerRef}
      loading={loading}
      noData={noData}
    />
  );
};

MultiSeriesDateAxisChart.propTypes = {
  serviceCallback: PropTypes.func.isRequired,
  dateFieldName: PropTypes.string,
  withScrollbarY: PropTypes.bool,
  dataTransformBeforeInject: PropTypes.func,
  sortDate: PropTypes.bool,
  valueAxisTitle: PropTypes.string,
};

MultiSeriesDateAxisChart.defaultProps = {
  withScrollbarY: false,
  dataTransformBeforeInject: undefined,
  sortDate: false,
  valueAxisTitle: undefined,
  dateFieldName: 'date',
};

export default MultiSeriesDateAxisChart;
