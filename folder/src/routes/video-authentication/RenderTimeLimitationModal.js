import React from 'react';
import PropTypes from 'prop-types';

const RenderTimeLimitationModal = props => (
  <>
    {props.type === 'warning' ? (
      <p>
        لطفا توجه داشته باشید برای احراز هویت
        <b> حداکثر 10 دقیقه </b> فرصت دارید و در صورتی که پروسه احراز هویت در 10
        دقیقه به اتمام نرسد، شما به صورت سیستمی از پروسه احراز هویت خارج می شوید
      </p>
    ) : (
      <p>
        زمان شما به اتمام رسید. متاسفانه در زمان مقرر شما نتوانستید پروسه احراز
        هویت را به اتمام برسانید
      </p>
    )}
  </>
);
RenderTimeLimitationModal.propTypes = {
  type: PropTypes.string,
};
RenderTimeLimitationModal.defaultProps = {
  type: 'warning',
};
export default RenderTimeLimitationModal;
