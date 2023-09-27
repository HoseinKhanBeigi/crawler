/* eslint-disable css-modules/no-unused-class */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { Row, Statistic, Divider } from 'antd';
import s from './Detail.scss';

const Statistics = props => {
  const { data } = props;
  return (
    <Row type="flex" gutter={24} justify="center" className={s.statistics}>
      {data?.map((item, index) => (
        <>
          <Statistic
            className={s.statistic_item}
            title={item?.title}
            value={item?.value}
          />
          {index !== data.length - 1 && (
            <Divider className={s.divider} type="vertical" />
          )}
        </>
      ))}
    </Row>
  );
};
Statistics.defaultProps = {
  data: [],
};
Statistics.propTypes = {
  data: PropTypes.array,
};
export default withStyles(s)(Statistics);
