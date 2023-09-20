import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
// eslint-disable-next-line css-modules/no-unused-class
import s from './ModalForEditEmployee.scss';
import CPModal from '../../../CP/CPModal';
import { MODAL_FOR_EDIT_EMPLOYEE } from '../../repository';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';
import CPTab from '../../../CP/CPTab';
import EmployeeInfoTab from './EmployeeInfoTab';
import AssignPipelineEmployee from '../../../AssignPipelineEmployee';
import { EMPLOYEE_MANAGEMENT_TABLE } from '../../../../store/settings/settings.constants';
import OrganizationInfoStep from '../../../OrganizationInfoStep';
import ProdcutEmployeeObserver from '../../../ProductEmployeeObserver';
import EmployeeStatus from './EmployeeStatus';
import { getPersonInfoAction } from '../../../../store/person/person.actions';
import { postEmployeeRegisteredInfoDetail } from '../../../../store/employeeManagement/employeeManagement.actions';

const ModalForEditCallDetail = props => {
  const { data: tableData, personInfoData } = props;
  const [visible, setVisible] = useState(true);
  const [data, setData] = useState(tableData);
  const { aclGroupCode, levantId } = data;

  const closeModal = () => {
    setVisible(false);
    /*
      reset employee registered info detail
    */
    props.postEmployeeRegisteredInfoDetail({});
  };

  const refreshTable = () => {
    kianTableApi(EMPLOYEE_MANAGEMENT_TABLE).refreshTable();
  };

  const onEditUnit = newAclGroupCode => {
    setData(prevState => ({ ...prevState, aclGroupCode: newAclGroupCode }));
  };

  useEffect(() => {
    (async () => {
      const result = await props.getPersonInfoAction(levantId);
      await props.postEmployeeRegisteredInfoDetail({
        userInfoDetail: result,
      });
    })();
  }, []);

  /*
    we here based on selected role in EmployeeInfoStep render it's component
  */
  const pipelineProductStep = {
    OPERATOR: {
      component: (
        <AssignPipelineEmployee
          employeeInfoDetail={data}
          okTitle="ثبت محصولات"
          editMode
          onSuccess={refreshTable}
        />
      ),
      title: 'محصولات',
    },
    OBSERVER: {
      component: (
        <ProdcutEmployeeObserver
          employeeInfoDetail={data}
          onSuccess={refreshTable}
          editMode
          okTitle="ثبت محصولات"
        />
      ),
      title: 'محصولات',
    },
  };

  const tabs = [
    {
      key: 4,
      tab: 'وضعیت',
      children: (
        <EmployeeStatus onSuccess={refreshTable} employeeInfoDetail={data} />
      ),
    },
    {
      key: 3,
      tab: pipelineProductStep[aclGroupCode]?.title,
      children: aclGroupCode ? (
        pipelineProductStep[aclGroupCode].component
      ) : (
        <h3>نقش انتخاب شده نامعتبر است</h3>
      ),
    },
    {
      key: 2,
      tab: 'مشخصات سازمانی',
      children: (
        <OrganizationInfoStep
          personInfo={{ ...data, ...personInfoData }}
          editMode
          onChangeStep={refreshTable}
          okTitle="ویرایش"
        />
      ),
    },
    {
      key: 1,
      tab: 'مشخصات کارمند',
      children: (
        <EmployeeInfoTab
          onFinish={newAclGroupCode => {
            refreshTable();
            onEditUnit(newAclGroupCode);
          }}
          onClose={closeModal}
          employeeInfoDetail={data}
        />
      ),
    },
  ];

  return (
    <CPModal
      title="ویرایش کارمند"
      visible={visible}
      width={768}
      onCancel={closeModal}
      className={s.modal_employee_container}
      footer={false}
      modalType={MODAL_FOR_EDIT_EMPLOYEE}
    >
      <div className="card-container">
        <CPTab defaultKey="1" position="top" tabPane={tabs} />
      </div>
    </CPModal>
  );
};

ModalForEditCallDetail.defaultProps = {
  data: {},
  postEmployeeRegisteredInfoDetail: () => {},
};
ModalForEditCallDetail.propTypes = {
  data: PropTypes.object,
  postEmployeeRegisteredInfoDetail: PropTypes.func,
  getPersonInfoAction: PropTypes.func.isRequired,
  personInfoData: PropTypes.object.isRequired,
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
)(withStyles(s)(ModalForEditCallDetail));
