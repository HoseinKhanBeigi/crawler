import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import {
  mdiAccountCash,
  mdiLayersTriple,
  mdiCashCheck,
  mdiFinance,
} from '@mdi/js';
import { Statistic, Col } from 'antd';
import Icon from '@mdi/react';
// eslint-disable-next-line css-modules/no-unused-class
import s from './Detail.scss';

const icons = {
  mdiAccountCash,
  mdiLayersTriple,
  mdiCashCheck,
  mdiFinance,
};
const MoreStatisticsList = props => {
  const { list } = props;
  return (
    <Col span={24} className={s.list_container}>
      {list?.map(({ label, value, icon }) => (
        <div className={s.list_item}>
          <Icon className={s.list_icon} path={icons[icon]} size="25px" />
          <Statistic className={s.statistic_item} title={label} value={value} />
        </div>
      ))}
      {/* <div className={s.list_item}>
        <Icon className={s.list_icon} path={mdiLayersTriple} size="25px" />
        <Statistic className={s.statistic_item} title={label} value={value} />
      </div>
      <div className={s.list_item}>
        <Icon className={s.list_icon} path={mdiCashCheck} size="25px" />
        <Statistic className={s.statistic_item} title={label} value={value} />
      </div>
      <div className={s.list_item}>
        <Icon className={s.list_icon} path={mdiFinance} size="25px" />
        <Statistic className={s.statistic_item} title={label} value={value} />
      </div> */}
    </Col>
  );
};
MoreStatisticsList.defaultProps = {
  list: [],
};
MoreStatisticsList.propTypes = {
  list: PropTypes.array,
};
export default withStyles(s)(MoreStatisticsList);
