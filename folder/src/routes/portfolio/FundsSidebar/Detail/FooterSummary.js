/* eslint-disable css-modules/no-unused-class */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import toCommaSeparatedNumber from '../../../../utils/toCommaSeparatedNumber';
import convertToJalaliDate from '../../../../utils/date';
import s from './Detail.scss';

const FooterSummary = props => {
  const { data } = props;
  function renderAlert(item) {
    return (
      <div
        className={s.alert}
        style={{
          backgroundColor: item?.type === 'success' ? '#e5f7f7' : '#ffecec',
        }}
      >
        <span
          className={s.alert_count}
          style={{ color: item?.type === 'success' ? '#00b4ad' : '#ff5252' }}
        >
          <b>{item?.value}</b>
          {item?.label}
        </span>
        <span
          className={s.date}
          style={{ color: item?.type === 'success' ? '#aaadb5' : '#aaadb5' }}
        >
          {item?.date}
        </span>
      </div>
    );
  }

  return (
    <>
      <div className={s.footer_summary}>
        {renderAlert({
          type: 'success',
          value: data?.pendingBuyOrders?.amount
            ? toCommaSeparatedNumber(+data?.pendingBuyOrders?.amount)
            : '---',
          label:
            data?.type === 'NonETF'
              ? ' ریال در انتظار صدور'
              : data?.type === 'ETF'
              ? 'ریال در انتظار خرید'
              : '---',
          date: convertToJalaliDate(data?.pendingBuyOrders?.dueDate),
        })}
        {renderAlert({
          type: 'danger',
          value: data?.pendingSellOrders?.amount
            ? toCommaSeparatedNumber(data?.pendingSellOrders?.amount)
            : '---',
          label:
            data?.type === 'NonETF'
              ? ' ریال در انتظار ابطال'
              : data?.type === 'ETF'
              ? ' ریال در انتظار فروش'
              : '---',
          date: convertToJalaliDate(data?.pendingSellOrders?.dueDate),
        })}
        <div className={s.more_detail}>
          <div className={s.more_detail_item}>
            <span>بازدهی آخرین روز کاری</span>
            <b
              style={{
                color: data?.dailyRois?.toString().includes('+')
                  ? '#00b4ad'
                  : '',
              }}
            >
              %{data?.dailyRois}
            </b>
          </div>
          <div className={s.more_detail_item}>
            <span>
              {data?.type === 'NonETF'
                ? 'قیمت صدور هر واحد'
                : data?.type === 'ETF'
                ? 'قیمت خرید هر واحد'
                : '---'}
            </span>
            <b>{toCommaSeparatedNumber(+data?.unitBuyAmount)}</b>
          </div>
          <div className={s.more_detail_item}>
            <span>
              {data?.type === 'NonETF'
                ? ' قیمت ابطال هر واحد'
                : data?.type === 'ETF'
                ? 'قیمت فروش هر واحد'
                : '---'}
            </span>
            <b>{toCommaSeparatedNumber(+data?.unitSellAmount)}</b>
          </div>
        </div>
      </div>
    </>
  );
};
FooterSummary.defaultProps = {
  data: {},
};
FooterSummary.propTypes = {
  data: PropTypes.object,
};
export default withStyles(s)(FooterSummary);
