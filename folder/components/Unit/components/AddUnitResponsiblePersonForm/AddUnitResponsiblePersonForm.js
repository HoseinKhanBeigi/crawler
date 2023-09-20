import React, { useEffect, useState } from 'react';
import { Col, Divider, Row } from 'antd';
import PropTypes from 'prop-types';
import SearchFilterWithDetailBox from '../../../SearchFilterWithDetailBox';
import CPButton from '../../../CP/CPButton';
import { unitServices } from '../../../../service/unitService';
import { unitTypeNames } from '../../utils/unitHelpers';
import aclFormService from '../../../../service/aclFormService';
import CPSelect from '../../../CP/CPSelect';

const AddUnitResponsiblePersonForm = props => {
  const {
    onSubmit,
    onCancel,
    unitId,
    cancelLabel,
    submitLabel,
    defaultValue,
    unitType,
    operationType,
  } = props;
  const { phoneNumber, roleId } = defaultValue;
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState([]);
  const [managerLevantId, setManagerLevantId] = useState(null);
  const [selectedRole, setSelectedRole] = useState(roleId);
  const [roles, setRoles] = useState([]);

  const roleListFactory = items => {
    const rolesList = items.map((item, index) => ({
      key: index,
      text: item.title,
      value: item.id,
    }));
    return rolesList;
  };

  const getRoleList = () => {
    aclFormService.getAllAclActions().then(response => {
      const { result } = response;
      setRoles(roleListFactory(result));
    });
  };

  useEffect(() => {
    getRoleList();
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    const body = {
      aclGroupId: selectedRole,
      managerLevantId,
      id: unitId,
      operationType,
    };
    unitServices.updateUnitRequest(body, unitType).then(
      response => {
        setLoading(false);
        onSubmit(response);
      },
      () => setLoading(false),
    );
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleSearchClick = d => {
    const {
      firstName,
      lastName,
      nationalCode,
      mobile,
      email,
      levantId,
      homeAddressInfo,
    } = d;
    const { fullAddress, postalCode } = homeAddressInfo;
    setManagerLevantId(levantId);
    setDetail([
      { value: firstName, label: 'نام' },
      { value: lastName, label: 'نام خانوادگی' },
      { value: nationalCode, label: 'کد ملی' },
      { value: mobile, label: 'شماره موبایل' },
      { value: postalCode, label: 'کد پستی' },
      { value: email, label: 'ایمیل' },
      { value: fullAddress, label: 'آدرس' },
    ]);
  };

  const isButtonDisabled = !(managerLevantId && selectedRole);

  return (
    <>
      <SearchFilterWithDetailBox
        defaultValue={phoneNumber}
        onClickItem={handleSearchClick}
        lists={detail}
        width="100%"
        withSearchButton={false}
        headerTitle={`نام مسئول ${unitTypeNames[unitType]}`}
      />
      {managerLevantId && (
        <Row gutter={24}>
          <Col span={12}>
            <small>نقش</small>
            <CPSelect
              value={selectedRole}
              isRequired
              placeholder="لطفا نقش را انتخاب کنید"
              defaultValue={selectedRole}
              dataSource={roles}
              onChange={value => {
                setSelectedRole(value);
              }}
            />
          </Col>
        </Row>
      )}
      <Divider />
      <Row type="flex" justify="end">
        <CPButton
          type="default"
          style={{ margin: '0 8px' }}
          onClick={handleCancel}
        >
          {cancelLabel}
        </CPButton>
        <CPButton
          loading={loading}
          type="primary"
          disabled={isButtonDisabled}
          onClick={handleSubmit}
        >
          {submitLabel}
        </CPButton>
      </Row>
    </>
  );
};
AddUnitResponsiblePersonForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  operationType: PropTypes.string,
  unitId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  submitLabel: PropTypes.string.isRequired,
  cancelLabel: PropTypes.string,
  defaultValue: PropTypes.object,
  unitType: PropTypes.oneOf(['BRANCH', 'REPRESENTATIVE', 'AGENT']).isRequired,
};

AddUnitResponsiblePersonForm.defaultProps = {
  cancelLabel: 'انصراف',
  defaultValue: '',
  operationType: undefined,
};

export default AddUnitResponsiblePersonForm;
