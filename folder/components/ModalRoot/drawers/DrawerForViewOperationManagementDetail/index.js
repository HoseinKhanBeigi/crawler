/* eslint-disable import/first */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import KianDrawer from '../../../KianDrawer/KianDrawer';
import { DRAWER_FOR_OPERATION_MANAGEMENT_VIEW } from '../../repository';
import RenderDetail from '../../../RenderDetail/RenderDetail';
import { Tag } from 'antd';
import operationManagementService from '../../../../service/operationManagementService';
import OperationBranchTable from '../../modals/ModalForEditOperationManagementBranch/components/OperationBranchRelationTable';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './style.scss';

const DrawerForViewOperationManagementDetail = ({ name, code, status, id }) => {
  const [visible, setVisible] = useState(true);
  const [operationBranch, setOperationBranch] = useState(false);
  const closeDrawer = () => {
    setVisible(false);
  };
  useEffect(() => {
    operationManagementService.getRelationOperationalBranches(id).then(res => {
      setOperationBranch(res.content);
    });
  }, [id]);
  return (
    <KianDrawer
      drawerId={DRAWER_FOR_OPERATION_MANAGEMENT_VIEW}
      title={name}
      visible={visible}
      onClose={closeDrawer}
      onCancel={closeDrawer}
    >
      <RenderDetail maxWidth={100}>
        <RenderDetail.Row title="نام شعبه" data={name} />
        <RenderDetail.Row
          type="node"
          title="کد شعبه"
          data={
            <span
              style={{
                color: '#1890ff',
                marginTop: '-3px',
              }}
            >
              {code}
            </span>
          }
        />
        <RenderDetail.Row
          type="node"
          title="وضعیت"
          data={
            <Tag
              style={{
                backgroundColor: '#effffa',
                borderColor: '#93efd2',
                color: '#13c29a',
                margin: 0,
                marginTop: '-3px',
              }}
            >
              {status !== 'ACTIVE' ? 'غیر فعال‌' : 'فعال‌'}
            </Tag>
          }
        />
      </RenderDetail>
      <OperationBranchTable data={operationBranch} isRemove={false}>
        <div className={s.titr}>شعبه ها</div>
      </OperationBranchTable>
    </KianDrawer>
  );
};

DrawerForViewOperationManagementDetail.propTypes = {
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default withStyles(s)(DrawerForViewOperationManagementDetail);
