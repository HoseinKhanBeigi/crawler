import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Icon } from '@mdi/react';
import { mdiFilter } from '@mdi/js';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import * as am4charts from '@amcharts/amcharts4/charts';
// eslint-disable-next-line camelcase
// eslint-disable-next-line css-modules/no-unused-class
import s from '../../styles/Charts.scss';
import CPLoading from '../../../CP/CPLoading';
import useAmChart from '../../../../hooks/useAmChart';
import CPEmpty from '../../../CP/CPEmpty';
import { funnelChartSchema } from '../../schema/chartsSchema';

/* eslint-disable no-param-reassign */
/* eslint-disable  react/no-array-index-key */

const FunnelChart = ({ service }) => {
  const [chartData, setChartData] = useState(null);
  const { loading, chartContainerRef, noData } = useAmChart(
    service,
    {
      chartType: am4charts.SlicedChart,
      jsonConfigCallback: funnelChartSchema.jsonConfigCallback('count', 'name'),
      imperativeConfigCallback: (chart, data) => {
        setChartData(data);
        chart.paddingRight = 20;
        chart.paddingLeft = 20;
      },
    },
    [service],
  );
  const [moreInfoData, setMoreInfoData] = useState(null);
  const moreInfoRef = useRef();
  useLayoutEffect(() => {
    if (chartContainerRef.current && moreInfoRef.current) {
      moreInfoRef.current.style.setProperty(
        '--moreInfoHeight',
        `${chartContainerRef.current?.getBoundingClientRect().height}px`,
      );
      moreInfoRef.current.style.opacity = 1;
    }
  }, [loading]);

  useEffect(() => {
    if (chartData) {
      setMoreInfoData(
        [...chartData]
          .sort((a, b) => b.count - a.count)
          .reduce(
            (previousValue, currentValue, currentIndex, array) =>
              currentIndex !== array.length - 1
                ? [
                    ...previousValue,
                    (
                      (array[currentIndex + 1].count / currentValue.count ||
                        0) * 100
                    ).toFixed(1),
                  ]
                : previousValue,
            [],
          ),
      );
    }
  }, [chartData]);

  return noData ? (
    <CPEmpty className={s.loading} description="داده ای موجود نمیباشد" />
  ) : (
    <div style={{ width: '100%', height: '100%' }}>
      <CPLoading spinning={loading} wrapperClassName={s.loadingWrapper}>
        <div className={s.chart}>
          {!loading && (
            <div ref={moreInfoRef} className={s.chart__moreInfo}>
              {moreInfoData &&
                moreInfoData.map((percent, index) => (
                  <span
                    className={s.chart__moreInfo__rect}
                    key={Math.random() * 500 * index}
                  >
                    <p>
                      {`${percent}%`} <Icon path={mdiFilter} size="12px" />
                    </p>
                  </span>
                ))}
            </div>
          )}
          <div className={s.chart__wrapper}>
            <div ref={chartContainerRef} className={s.wrapper} />
          </div>
        </div>
      </CPLoading>
    </div>
  );
};

FunnelChart.propTypes = {
  service: PropTypes.func.isRequired,
};

export default withStyles(s)(FunnelChart);
