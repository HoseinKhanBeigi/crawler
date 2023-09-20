import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Descriptions, Row } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// eslint-disable-next-line css-modules/no-unused-class
import s from './ModalForEditEmployee.scss';
import CPLoading from '../../../CP/CPLoading';
import CPSelect from '../../../CP/CPSelect';
import CPButton from '../../../CP/CPButton';
import { postEmployeeRegisteredInfoDetail } from '../../../../store/employeeManagement/employeeManagement.actions';
import { getPersonInfoAction } from '../../../../store/person/person.actions';
import aclFormService from '../../../../service/aclFormService';
import aclUnitEmployeeGroupServices from '../../../../service/aclUnitEmployeeGroupServices';
import HandleAclPermission from '../../../HandleAclPermission';
import { Actions } from '../../../../utils/aclActions';

const { Item } = Descriptions;

const EmployeeInfoTab = props => {
  const { employeeInfoDetail, personInfoData, onClose, onFinish } = props;
  const [rolesList, setRolesList] = useState([]);
  const [selectedRole, setSelectedRole] = useState(
    employeeInfoDetail?.aclGroupId,
  );
  const [submitFormLoading, setSubmitFormLoading] = useState(false);
  const { unitEmployeeId } = employeeInfoDetail;

  const roleListFactory = items =>
    items.map((item, index) => ({
      key: index,
      text: item.title,
      value: item.id,
    }));

  const getRolesList = () => {
    aclFormService.getAllAclActions().then(response => {
      const { result } = response;
      setRolesList(roleListFactory(result));
    });
  };

  useEffect(() => {
    getRolesList();
  }, []);

  const submitEmployeeBranchChange = () => {
    setSubmitFormLoading(true);
    aclUnitEmployeeGroupServices
      .updateEmployeeRole(unitEmployeeId, selectedRole)
      .then(({ result }) => {
        if (onFinish && typeof onFinish === 'function') {
          onFinish(result);
        }
      })
      .finally(() => {
        setSubmitFormLoading(false);
      });
  };

  const renderUserInfoDesc = () => {
    const { fullName, nationalCode, contact } = employeeInfoDetail;
    const { address, postalCode, cityName } = contact || {};
    return (
      <Descriptions layout="vertical" column={2}>
        <Item label="نام و نام خانوادگی">{fullName || 'ندارد'}</Item>
        <Item label="شماره تلفن">{personInfoData?.mobilePhone || 'ندارد'}</Item>
        <Item label="کد ملی">{nationalCode || 'ندارد'}</Item>
        <Item label="کد پستی">{postalCode || 'ندارد'}</Item>
        <Item label="آدرس">{`${cityName} - ${address}` || 'ندارد'}</Item>
      </Descriptions>
    );
  };
  return (
    <>
      <Row gutter={24}>
        <Col span={24}>
          <div className={s.employeeInfoDescription_container}>
            <CPLoading
              spinning={!personInfoData && !selectedRole}
              tip="در حال دریافت مشخصات کارمند..."
            >
              {renderUserInfoDesc()}
              <HandleAclPermission wich={Actions.employeeEditRoleAction}>
                <Row gutter={24}>
                  <Col span={12}>
                    <small>نقش</small>
                    <CPSelect
                      defaultValue={selectedRole}
                      dataSource={rolesList}
                      onChange={value => {
                        setSelectedRole(value);
                      }}
                    />
                  </Col>
                </Row>
              </HandleAclPermission>
              <HandleAclPermission wich={Actions.employeeEditRoleAction}>
                <Row gutter={24}>
                  <Col span={24}>
                    <div className={s.footer}>
                      <CPButton
                        type="primary"
                        onClick={submitEmployeeBranchChange}
                        className={s.button}
                        loading={submitFormLoading}
                      >
                        ثبت مشخصات
                      </CPButton>
                      <CPButton
                        type="default"
                        onClick={onClose}
                        className={s.button}
                      >
                        انصراف
                      </CPButton>
                    </div>
                  </Col>
                </Row>
              </HandleAclPermission>
            </CPLoading>
          </div>
        </Col>
      </Row>
    </>
  );
};

EmployeeInfoTab.defaultProps = {
  employeeInfoDetail: {},
  personInfoData: {},
  onClose: () => {},
  onFinish: undefined,
};
EmployeeInfoTab.propTypes = {
  employeeInfoDetail: PropTypes.object,
  personInfoData: PropTypes.object,
  onClose: () => {},
  onFinish: PropTypes.func,
};

const mapDispatch = {
  getPersonInfoAction,
  postEmployeeRegisteredInfoDetail,
};

const mapStateToProps = state => ({
  personInfoData: state.person.personInfoData,
});

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(EmployeeInfoTab));
