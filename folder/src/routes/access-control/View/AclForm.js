import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button, Table } from 'antd';
import useAclForm from '../Controller/hooks/useAclForm';
import s from './AclForm.scss';
import aclTableSchema from '../Model/schemas/tableSchema';
import AclRowCheckbox from './components/AclRowCheckbox/AclRowCheckbox';
import FormBuilder from '../../../components/FormBuilder';
import aclNameFormSchema from '../Model/schemas/aclNameFormSchema';
import HandleAclPermission from '../../../components/HandleAclPermission';
import { Actions } from '../../../utils/aclActions';
import aclUnitTypes from '../constants/aclUnitTypes';

/* eslint-disable react/prop-types */

const AclForm = ({ aclGroupId, editMode, refLink }) => {
  const {
    allActions,
    loading,
    changeMenuAccessSwitchHandler,
    changeCRUDDropdownHandler,
    getCRUDDropdownValue,
    getHasCRUDDropdown,
    getMenuAccessSwitchState,
    getMenuAccessSwitchDisabledState,
    getCRUDDropdownDataSource,
    toggleExpandRowHandler,
    expandedRows,
    viewMode,
    submitFormHandler,
    forceUpdate,
    isPostingData,
    redirectHandler,
    formInfoData,
  } = useAclForm(aclGroupId, editMode, refLink);

  const boundSubmitFormHandlerRef = useRef();

  const columns = aclTableSchema(viewMode)({
    getMenuAccessSwitchState,
    changeMenuAccessSwitchHandler,
    changeCRUDDropdownHandler,
    getMenuAccessSwitchDisabledState,
    getHasCRUDDropdown,
    getCRUDDropdownDataSource,
    getCRUDDropdownValue,
  });

  const expandedRowRender = (record, i) => (
    <Table
      columns={columns}
      dataSource={allActions[i].subFeatures}
      childrenColumnName="temp"
      pagination={false}
      bordered
    />
  );

  const renderExpandRowIcon = ({ record, expanded }) =>
    record.subFeatures.length ? (
      <AclRowCheckbox
        id={record.id}
        onChange={toggleExpandRowHandler}
        checked={expanded}
      />
    ) : null;

  const bindFormSubmitHandler = props => {
    if (!boundSubmitFormHandlerRef.current) {
      boundSubmitFormHandlerRef.current = props?.submitForm;
      forceUpdate();
    }
  };

  const renderNameForm = () => (
    <>
      <FormBuilder
        onSubmit={submitFormHandler}
        bindFormikProps={bindFormSubmitHandler}
        hideSubmit
        initialValues={formInfoData}
        schema={aclNameFormSchema}
      />
      <div className={s.header__buttons}>
        <Button htmlType="reset" onClick={redirectHandler}>
          انصراف
        </Button>
        {editMode && aclGroupId ? (
          <HandleAclPermission wich={Actions.aclGroupUpdate}>
            <Button
              htmlType="submit"
              loading={isPostingData}
              onClick={boundSubmitFormHandlerRef.current}
              type="primary"
            >
              اعمال تغییرات
            </Button>
          </HandleAclPermission>
        ) : (
          <HandleAclPermission wich={Actions.aclGroupCreate}>
            <Button
              htmlType="submit"
              loading={isPostingData}
              onClick={boundSubmitFormHandlerRef.current}
              type="primary"
            >
              ثبت دسترسی
            </Button>
          </HandleAclPermission>
        )}
      </div>
    </>
  );

  const renderNameInViewMode = () => (
    <div className={s.title}>
      <div>
        <p>نام دسترسی</p>
        <h3>{formInfoData.title}</h3>
      </div>
      <div>
        <p>کد دسترسی</p>
        <h3>{formInfoData.code}</h3>
      </div>
      <div>
        <p>مرتبه سازمانی</p>
        <h3>
          {formInfoData.unitTypes.map(type => aclUnitTypes[type]).join(', ')}
        </h3>
      </div>
    </div>
  );

  return (
    <div className={s.wrapper}>
      {!loading && (
        <div className={s.header}>
          {viewMode ? renderNameInViewMode() : renderNameForm()}
        </div>
      )}
      <Table
        columns={columns}
        loading={loading}
        expandedRowRender={expandedRowRender}
        childrenColumnName="temp"
        expandIcon={renderExpandRowIcon}
        rowKey={record => record.id}
        expandedRowKeys={expandedRows}
        dataSource={allActions}
        pagination={false}
        bordered
      />
    </div>
  );
};

AclForm.propTypes = {
  aclGroupId: PropTypes.number,
  editMode: PropTypes.bool,
  refLink: PropTypes.string,
};
AclForm.defaultProps = {
  aclGroupId: undefined,
  editMode: false,
  refLink: '/roles',
};

export default withStyles(s)(AclForm);
