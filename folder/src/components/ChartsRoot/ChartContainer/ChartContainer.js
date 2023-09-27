import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CPEmpty from '../../CP/CPEmpty';
// eslint-disable-next-line css-modules/no-unused-class
import s from '../styles/Charts.scss';
import CPLoading from '../../CP/CPLoading';

const ChartContainer = ({ chartContainerRef, loading, noData }) =>
  noData ? (
    <CPEmpty className={s.loading} description="داده‌ای موجود نمیباشد" />
  ) : (
    <div style={{ width: '100%', height: '100%' }}>
      {loading ? (
        <div className={s.loading}>
          <CPLoading spinning />
        </div>
      ) : (
        <div ref={chartContainerRef} className={s.wrapper} />
      )}
    </div>
  );

ChartContainer.propTypes = {
  noData: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  chartContainerRef: PropTypes.object.isRequired,
};

export default withStyles(s)(ChartContainer);
