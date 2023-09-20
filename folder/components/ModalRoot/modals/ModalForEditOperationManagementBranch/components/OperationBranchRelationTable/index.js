/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/first */
import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './style.scss';
import { Actions } from '../../../../../../utils/aclActions';
import HandleAclPermission from '../../../../../HandleAclPermission/HandleAclPermission';
import useAclPermission from '../../../../../../hooks/useAclPermission';
import RemoveButton from './RemoveButton';

const OperationBranchListTable = ({ data, isRemove, onDelete, children }) => {
  const hasDeleteAcl = useAclPermission(Actions.deleteOperationBranchRelation);
  const columns = [
    {
      title: 'نام شعبه',
      dataIndex: 'targetBranchName',
      key: 'targetBranchName',
    },
    {
      title: 'کد شعبه',
      dataIndex: 'targetBranchCode',
      key: 'targetBranchCode',
    },
  ];
  const func = () => {
    columns.push({
      title: 'عملیات',
      key: 'action',
      width: 73,
      render: row => <RemoveButton data={row} onDelete={onDelete} />,
    });
  };
  return (
    <HandleAclPermission wich={Actions.getDataOperationBranchRelation}>
      <>
        {children}
        <Table
          columns={columns}
          bordered
          loading={!data}
          dataSource={data}
          size="small"
          pagination={false}
          className={s.table}
        />
        {isRemove && hasDeleteAcl && func()}
      </>
    </HandleAclPermission>
  );
};
OperationBranchListTable.propTypes = {
  data: PropTypes.array.isRequired,
  isRemove: PropTypes.bool.isRequired,
  onDelete: PropTypes.func,
  children: PropTypes.node.isRequired,
};
OperationBranchListTable.defaultProps = {
  onDelete: () => {},
};
export default withStyles(s)(OperationBranchListTable);
