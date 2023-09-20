import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Icon, Row, Typography } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UnitRegistrationFinishInfo.scss';
import CPButton from '../../../CP/CPButton';

const { Text } = Typography;

const unitName = {
  BRANCH: 'شعبه',
  REPRESENTATIVE: 'نمایندگی',
  AGENT: 'کارگزاری',
};

const UnitRegistrationFinishInfo = props => {
  const { unitId: id, onFinish, unitType } = props;
  return (
    <>
      <div className={s.container}>
        <Row
          gutter={24}
          type="flex"
          justify="center"
          style={{ flexDirection: 'column', alignItems: 'center' }}
        >
          <div className={s.icon}>
            <Icon type="like" />
          </div>
          <div
            className={s.text}
          >{`${unitName[unitType]} با موفقیت ثبت شد`}</div>
          <div className={s.code_container}>
            <span>{`کد ${unitName[unitType]}`}</span>
            <Text copyable>{id}</Text>
          </div>
        </Row>
      </div>
      <Divider />
      <Row type="flex" justify="end">
        <CPButton type="primary" onClick={onFinish}>
          انجام شد
        </CPButton>
      </Row>
    </>
  );
};
UnitRegistrationFinishInfo.defaultProps = {
  unitType: 'BRANCH',
};
UnitRegistrationFinishInfo.propTypes = {
  unitId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onFinish: PropTypes.func.isRequired,
  unitType: PropTypes.string,
};
export default withStyles(s)(UnitRegistrationFinishInfo);
