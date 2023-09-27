import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { mdiArrowLeft } from '@mdi/js';
import Icon from '@mdi/react';
import { Row } from 'antd';
import PropTypes from 'prop-types';
import s from './PreveiwHandGestures.scss';
import CPEmpty from '../../../../CP/CPEmpty';

const text = {
  1: 'حرکت اول',
  2: 'حرکت دوم',
  3: 'حرکت سوم',
  4: 'حرکت چهارم',
  5: 'حرکت پنجم',
};
const PreveiwHandGestures = props => {
  const { data, bordered } = props;
  const gestures = data?.expectedResult?.split(',');
  return (
    <div
      className={s.container}
      style={{ border: bordered ? 'dashed 1px #d9d9d9' : 'none' }}
    >
      {gestures?.length ? (
        gestures?.map((item, index) => (
          <Row type="flex" align="middle" justify="start">
            <img
              className={s.handGesture}
              alt={index}
              src={`/images/HandGestureNumbers/L${item}.svg`}
            />
            <Row type="flex" justify="start" align="middle">
              <span className={s.item_text}>{text[index + 1]}</span>
              {index < gestures.length - 1 && (
                <Icon className={s.icon} size="16px" path={mdiArrowLeft} />
              )}
            </Row>
          </Row>
        ))
      ) : (
        <CPEmpty description="موردی برای نمایش وجود ندارد" />
      )}
    </div>
  );
};
PreveiwHandGestures.propTypes = {
  data: PropTypes.object,
  bordered: PropTypes.bool,
};
PreveiwHandGestures.defaultProps = {
  data: {},
  bordered: true,
};
export default withStyles(s)(PreveiwHandGestures);
