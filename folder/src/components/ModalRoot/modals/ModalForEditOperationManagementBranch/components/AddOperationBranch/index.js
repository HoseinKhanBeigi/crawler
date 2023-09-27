/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable import/first */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import CPButton from '../../../../../CP/CPButton/CPButton';
import FormCreateOperationBranch from './FormCreateOperationBranch';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './style.scss';
import PropTypes from 'prop-types';
import operationManagementService from '../../../../../../service/operationManagementService';

const AddOperation = props => {
  const { onAdd, id, branchList } = props;
  const [isVisible, setIsVisible] = useState(false);
  const handleIsVisible = () => {
    setIsVisible(prev => !prev);
  };

  const onCreateOpertionBranch = async value => {
    const response = await operationManagementService.addRelationOperationalBranches(
      id,
      value.id,
    );
    if (response) {
      value.id = response.result;
      value.targetBranchName = value.name;
      value.targetBranchCode = value.code;
      onAdd(value);
    }
    setIsVisible(false);
  };
  return (
    <div className={s.wrapper}>
      {isVisible ? (
        <FormCreateOperationBranch
          onSubmit={onCreateOpertionBranch}
          tableData={branchList}
          onCancle={setIsVisible.bind(null, false)}
        />
      ) : (
        <CPButton
          type="dashed"
          icon="plus"
          size="large"
          className={s.add_operation}
          onClick={handleIsVisible}
        >
          افزودن شعبه جدید
        </CPButton>
      )}
    </div>
  );
};
AddOperation.prototype = {
  onAdd: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  branchList: PropTypes.array.isRequired,
};
export default withStyles(s)(AddOperation);
