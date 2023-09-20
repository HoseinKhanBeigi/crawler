import React, { useEffect, useState } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Col, Divider, Row, Radio } from 'antd';
import PropTypes from 'prop-types';
// eslint-disable-next-line css-modules/no-unused-class
import s from './ModalForAddEmployee.scss';
import aclFormService from '../../../../service/aclFormService';
import AddExistEmployee from './AddExistEmployee';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../../../serviceConfig';
import AddNewEmployee from './AddNewEmployee';

const EmployeeInfoStep = props => {
  const { onChangeStep, okTitle } = props;
  const [roles, setRoles] = useState([]);
  const [activeTab, setActiveTab] = useState('searchPerson');

  const onChange = e => {
    setActiveTab(e.target.value);
  };

  const getRoleList = () => {
    aclFormService.getAllAclActions().then(response => {
      const { result } = response;
      setRoles(result);
    });
  };

  useEffect(() => {
    // getBranchList();
    getRoleList();
  }, []);

  const employeeInfoStepRender = () => {
    if (
      resolveVariable(BASE_VARIABLE_KEYS.ABBR) === 'demo' ||
      resolveVariable(BASE_VARIABLE_KEYS.ABBR) === 'khobregan' ||
      resolveVariable(BASE_VARIABLE_KEYS.ABBR) === 'levant'
    ) {
      return (
        <>
          <Row gutter={24}>
            <Divider />
            <Col gutter={24}>
              <Radio.Group onChange={onChange} value={activeTab}>
                <Radio value="searchPerson">جستجو در میان اشخاص موجود</Radio>
                <Radio value="newPerson">افزودن شخص جدید</Radio>
              </Radio.Group>
            </Col>
          </Row>
          {activeTab === 'searchPerson' ? (
            <AddExistEmployee
              roles={roles}
              onChangeStep={onChangeStep}
              okTitle={okTitle}
            />
          ) : (
            <AddNewEmployee
              roles={roles}
              closeModal={props.closeModal}
              onChangeStep={onChangeStep}
              okTitle={okTitle}
            />
          )}
        </>
      );
    }
    return (
      <AddExistEmployee
        roles={roles}
        onChangeStep={onChangeStep}
        okTitle={okTitle}
      />
    );
  };

  return employeeInfoStepRender();
};
EmployeeInfoStep.propTypes = {
  onChangeStep: PropTypes.func.isRequired,
  okTitle: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
export default withStyles(s)(EmployeeInfoStep);
