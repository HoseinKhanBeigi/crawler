import React, { useState } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Col, Descriptions, Divider, Row, Form } from 'antd';
import PropTypes from 'prop-types';
// eslint-disable-next-line css-modules/no-unused-class
import s from './ModalForAddEmployee.scss';
import CPSearchFilter from '../../../CP/CPSearchFilter';
import CPLoading from '../../../CP/CPLoading';
import CPSelect from '../../../CP/CPSelect';
import CPButton from '../../../CP/CPButton';
import {
  postEmployeeRegisteredInfoDetail,
  postRegisterEmployeeAction,
} from '../../../../store/employeeManagement/employeeManagement.actions';
import CPMessage from '../../../CP/CPMessage';

const { Item } = Form;
const AddExistEmployee = props => {
  const { onChangeStep, okTitle, roles } = props;
  const [userInfoDetail, setUserInfoDetail] = useState(false);
  const [employeeSubmitLoading, setEmployeeSubmitLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const renderUserInfoDesc = () => {
    const {
      firstName,
      lastName,
      mobilePhone,
      nationalCode,
      email,
      homeAddressInfo,
    } = userInfoDetail;
    return (
      <Descriptions layout="vertical" column={2}>
        <Item label="نام">{firstName || '---'}</Item>
        <Item label="نام خانوادگی">{lastName || '---'}</Item>
        <Item label="شماره تلفن">{mobilePhone || '---'}</Item>
        <Item label="کد ملی">{nationalCode || '---'}</Item>
        <Item label="ایمیل">{email || '---'}</Item>
        <Item label="کد پستی">{homeAddressInfo?.postalCode || '---'}</Item>
        <Item label="آدرس">{homeAddressInfo?.fullAddress || '---'}</Item>
      </Descriptions>
    );
  };

  const submitEmployeeRegister = async () => {
    const { levantId } = userInfoDetail;
    if (levantId && selectedRole) {
      const body = {
        levantId,
        aclGroupId: selectedRole,
      };
      setEmployeeSubmitLoading(true);
      const result = await props.postRegisterEmployeeAction(body);
      if (!result.err) {
        CPMessage('مشخصات کاربر با موفقیت ثبت شد.', 'success');
        onChangeStep(result);
        props.postEmployeeRegisteredInfoDetail({
          userInfoDetail,
          selectedRole: result.role?.code,
        });
        setEmployeeSubmitLoading(false);
      } else {
        CPMessage(result?.text, 'error');
        setEmployeeSubmitLoading(false);
      }
    } else CPMessage('لطفا مشخصات کاربر را کامل کنید', 'warning');
  };

  const handleSearchItemClick = item => {
    setUserInfoDetail(item);
  };

  return (
    <Row gutter={24}>
      <Col span={24}>
        <div className={s.employeeInfoDescription_container}>
          <Row gutter={24}>
            <Col span={12} className={s.searchBox_title}>
              <span>نام شخص مورد نظر را جستجو کنید</span>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <CPSearchFilter
                defaultValue={userInfoDetail?.mobilePhone}
                autoFocus
                size="small"
                ignoreContextWhenFullSearch={false}
                onClickItem={handleSearchItemClick}
                searchAll={false}
              />
            </Col>
          </Row>
          {renderUserInfoDesc()}
        </div>
        <CPLoading spinning={!roles} tip="در حال دریافت لیست نقش ها...">
          <Row gutter={24}>
            <Col span={24}>
              <div className={s.employeeInfoDescription_container}>
                <Row gutter={24}>
                  <Col span={12}>
                    <small>نقش</small>
                    <CPSelect
                      value={selectedRole}
                      defaultValue="لطفا نقش را انتخاب کنید"
                      dataSource={roles}
                      onChange={value => {
                        setSelectedRole(value);
                      }}
                    />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </CPLoading>
        <Row gutter={24}>
          <Divider />
        </Row>
        <Row
          gutter={24}
          style={{ justifyContent: 'space-between', direction: 'ltr' }}
        >
          <Col span={24} style={{ textAlign: 'left' }}>
            <CPButton
              type="primary"
              onClick={submitEmployeeRegister}
              className={s.button}
              loading={employeeSubmitLoading}
            >
              {okTitle}
            </CPButton>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
AddExistEmployee.propTypes = {
  onChangeStep: PropTypes.func,
  okTitle: PropTypes.string,
  postRegisterEmployeeAction: PropTypes.func.isRequired,
  postEmployeeRegisteredInfoDetail: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired,
};
AddExistEmployee.defaultProps = {
  onChangeStep: () => {},
  okTitle: 'ثبت و گام بعدی',
};
const mapDispatch = {
  postRegisterEmployeeAction,
  postEmployeeRegisteredInfoDetail,
};

export default connect(null, mapDispatch)(withStyles(s)(AddExistEmployee));
