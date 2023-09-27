/* eslint-disable import/first */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import KianDrawer from '../../../KianDrawer/KianDrawer';
import { DRAWER_FOR_VIEW_DISPATCH_GROUP } from '../../repository';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.scss';
import ShowGroupData from '../../../../routes/operation-mgmt/DispatchesManagement/ShowGroupData';
import { Col, Row } from 'antd';
import CPButton from '../../../CP/CPButton/CPButton';

const DrawerForViewDispatchGroup = props => {
  const { name, applications, branches, fromDate, fromDays } = props;
  const [visible, setVisible] = useState(true);
  const closeDrawer = () => {
    setVisible(false);
  };
  return (
    <KianDrawer
      drawerId={DRAWER_FOR_VIEW_DISPATCH_GROUP}
      title={`مشاهده گروه ${name}`}
      visible={visible}
      onClose={closeDrawer}
      onCancel={closeDrawer}
    >
      <div className={s.titr}>مشخصات گروه </div>
      <ShowGroupData
        name={name}
        applications={applications}
        branches={Object.values(branches)?.map(item => ({ text: item }))}
        fromDate={fromDate}
        fromDays={fromDays}
      />
      <div className={s.titr}>اعضای گروه </div>
      <div className={s.container}>
        <Row gutter={[16, 22]}>
          <Col span={6}>
            <div className={s.key}>نام گروه</div>
          </Col>
          <Col span={9}>
            <div className={s.title}>۲۳ نفر</div>
          </Col>
          <Col span={9}>
            <CPButton>لیست اعضای گروه</CPButton>
          </Col>
        </Row>
      </div>
    </KianDrawer>
  );
};

DrawerForViewDispatchGroup.propTypes = {
  name: PropTypes.string.isRequired,
  applications: PropTypes.string,
  branches: PropTypes.string,
  fromDays: PropTypes.number,
  fromDate: PropTypes.number,
};
DrawerForViewDispatchGroup.defaultProps = {
  applications: [],
  branches: {},
  fromDays: null,
  fromDate: null,
};

export default withStyles(s)(DrawerForViewDispatchGroup);
