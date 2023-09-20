import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import moment from 'moment-jalaali';

/* eslint-disable no-param-reassign */

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

export const stackedXYChartSchema = {
  jsonConfigCallback: category => data => ({
    data,
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
          text: 'اعداد به میلیارد ریال',
          fill: '#aaadb5',
        },
      },
    ],
    series: generateXYChartSeries(data, category),
    legend: {},
    cursor: {},
  }),
};

export const pieChartSchema = {
  jsonConfigCallback: (value, category) => data => ({
    data,
    rtl: true,
    series: [
      {
        type: 'PieSeries',
        dataFields: {
          value,
          category,
        },
        slices: {
          propertyFields: {
            fill: 'color',
          },
          template: {
            stroke: am4core.color('#fff'),
            strokeWidth: 2,
            strokeOpacity: 1,
          },
        },
        hiddenState: {
          properties: {
            opacity: 1,
            endAngle: -90,
            startAngle: -90,
          },
        },
      },
    ],
  }),
  imperativeConfigCallback: (chart, data) => {
    chart.data = data.map(d => ({
      ...d,
      ...(d.color && { color: am4core.color(d.color) }),
    }));
    chart.innerRadius = am4core.percent(50);
    chart.series.values[0].slices.template.propertyFields.fill = 'color';
  },
};

export const funnelChartSchema = {
  jsonConfigCallback: (value, category) => data => ({
    data,
    rtl: true,
    series: [
      {
        alignLabels: true,
        labelsOpposite: false,
        type: 'FunnelSeries',
        dataFields: {
          value,
          category,
        },
        labels: {
          text: '{category}: [bold]{value}[/]',
        },
      },
    ],
  }),
};

export const dateBasedXYChartSchema = {
  imperativeConfigCallback: (dateX, valueY, options) => (chart, data) => {
    chart.data = data;

    chart.rtl = true;

    if (options?.sortDate) {
      chart.events.on('beforedatavalidated', () => {
        chart.data.sort((a, b) => new Date(a[dateX]) - new Date(b[dateX]));
      });
    }

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    chart.yAxes.push(new am4charts.ValueAxis());

    if (options?.timeInterval === 'day') {
      dateAxis.tooltipDateFormat = 'YYYY/MM/d';

      dateAxis.renderer.labels.template.adapter.add('text', value =>
        moment(value?.length === 3 ? `${value} 01` : value).format(
          value?.length > 3 ? 'jDD jMMMM' : 'jMMMM',
        ),
      );

      dateAxis.adapter.add('getTooltipText', value =>
        moment(`${value}`).format('jDD jMMMM jYYYY'),
      );
    } else {
      dateAxis.tooltipDateFormat = 'YYYY/MM';
      dateAxis.renderer.labels.template.adapter.add('text', (value, target) =>
        moment(target.dataItem.dates.date).format('jMMMM'),
      );

      dateAxis.adapter.add('getTooltipText', value =>
        moment(`${value}/01`).format('jMMMM jYYYY'),
      );

      dateAxis.baseInterval = {
        timeUnit: 'month',
        count: 1,
      };
    }

    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = valueY;
    series.dataFields.dateX = dateX;
    series.strokeWidth = 2;
    series.minBulletDistance = 15;

    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = 'vertical';
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = 'middle';

    const bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color('#fff');

    const bullethover = bullet.states.create('hover');
    bullethover.properties.scale = 1.5;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = 'panXY';
    chart.cursor.snapToSeries = series;

    if (options?.withScrollbarY) {
      chart.scrollbarY = new am4core.Scrollbar();
      chart.scrollbarY.parent = chart.leftAxesContainer;
      chart.scrollbarY.toBack();
    }

    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);
    chart.scrollbarX.parent = chart.bottomAxesContainer;

    if (options?.lineColor) {
      series.stroke = am4core.color(options.lineColor);
    }

    dateAxis.start = 0.5;
  },
};
