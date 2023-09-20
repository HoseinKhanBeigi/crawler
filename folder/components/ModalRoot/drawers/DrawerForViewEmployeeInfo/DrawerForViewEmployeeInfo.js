import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Descriptions, Spin, Tag } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import KianDrawer from '../../../KianDrawer/KianDrawer';
import { DRAWER_FOR_VIEW_EMPLOYEE_INFO } from '../../repository';
import RenderDetail from '../../../RenderDetail/RenderDetail';
import branchManagementService from '../../../../service/branchManagementService';
// eslint-disable-next-line css-modules/no-unused-class
import s from '../../../SearchFilterWithDetailBox/SearchFilterWithDetailBox.scss';

const { Item } = Descriptions;

const status = {
  ACTIVE: {
    title: 'فعال',
    style: {
      color: '#13c29a',
      backgroundColor: '#effffa',
      borderColor: '#93efd2',
    },
  },
  INACTIVE: {
    title: 'غیرفعال',
    style: {
      color: '#ff5252',
      backgroundColor: '#ffe9e9',
      borderColor: '#ffa8a8',
    },
  },
};

const schema = data => [
  {
    title: 'نام کامل',
    data: data?.fullName,
    type: 'string',
  },
  {
    title: 'کد ملی',
    data: data?.nationalCode,
    type: 'string',
  },
  {
    title: 'شماره موبایل',
    data: data?.sessionFors?.map(d => `${d.firstName} ${d.lastName}`),
    type: 'string',
  },
  // {
  //   title: 'ایمیل',
  //   data: data?.sessionFors?.map(d => `${d.firstName} ${d.lastName}`),
  //   type: 'tag',
  // },
  {
    title: 'کد پستی',
    data: data?.contact?.postalCode,
    type: 'string',
  },
  {
    title: 'آدرس',
    data: data?.contact?.address,
    type: 'string',
  },
  // {
  //   title: 'دسترسی',
  //   data: data?.sessionFors?.map(d => `${d.firstName} ${d.lastName}`),
  //   type: 'tag',
  // },
  {
    title: 'وضعیت فعالیت',
    data:
      data?.employeeDailyStatus === 'OFFWORK'
        ? 'مرخصی'
        : data?.employeeDailyStatus === 'ONDUTY'
        ? 'آماده کار'
        : '---',
    type: 'tag',
  },
  {
    title: 'حساب کاربری',
    data: status[data?.employeeOccupationalStatus]?.title && (
      <Tag
        style={{
          ...status[data?.employeeOccupationalStatus]?.style,
          margin: 0,
        }}
      >
        {status[data?.employeeOccupationalStatus]?.title}
      </Tag>
    ),
    type: 'node',
  },
];

const DrawerForViewEmployeeInfo = ({ data }) => {
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [employeeVoipInfo, setEmployeeVoipInfo] = useState(null);
  const closeDrawer = () => {
    setVisible(false);
  };
  useEffect(() => {
    if (data?.levantId) {
      (async () => {
        try {
          setLoading(true);
          const response = await branchManagementService.getEmployeeVoipInfoBylevantId(
            data.levantId,
          );
          setEmployeeVoipInfo(response);
        } catch (e) {
          // ...
        }
        setLoading(false);
      })();
    }
  }, []);

  const renderVoipInfo = () => (
    <Descriptions column={2} layout="vertical">
      <Item label="شماره سازمانی" className={s.label}>
        {employeeVoipInfo?.organizationNumber || '---'}
      </Item>
      <Item label="داخلی" className={s.label}>
        {employeeVoipInfo?.extensionNumber || '---'}
      </Item>
    </Descriptions>
  );
  return (
    <KianDrawer
      drawerId={DRAWER_FOR_VIEW_EMPLOYEE_INFO}
      title="مشاهده اطلاعات کارمند"
      visible={visible}
      onClose={closeDrawer}
      onCancel={closeDrawer}
    >
      <Spin spinning={loading}>
        <RenderDetail maxWidth={100}>
          {schema(data).map(item => (
            <RenderDetail.Row {...item} />
          ))}
        </RenderDetail>
        <div className={s.desc_container}>{renderVoipInfo()}</div>
      </Spin>
    </KianDrawer>
  );
};

DrawerForViewEmployeeInfo.propTypes = {
  data: PropTypes.object.isRequired,
};

export default withStyles(s)(DrawerForViewEmployeeInfo);
