import React from 'react';
import PropTypes from 'prop-types';
import { columns } from './tableData';
import withModal from '../../components/HOC/withModal';
import KianTable from '../../components/KianTable';
import { EMPLOYEE_MANAGEMENT_TABLE } from '../../store/settings/settings.constants';
import {
  DRAWER_FOR_VIEW_EMPLOYEE_INFO,
  MODAL_FOR_ADD_EMPLOYEE,
  MODAL_FOR_EDIT_EMPLOYEE,
  MODAL_FOR_TOGGLE_EMPLOYEE_ACTIVATION,
} from '../../components/ModalRoot/repository';
import { Actions } from '../../utils/aclActions';
import branchManagementService from '../../service/branchManagementService';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../serviceConfig';
import CPPopConfirm from '../../components/CP/CPPopConfirm';
import { kianTableApi } from '../../components/KianTable/helpers/globalApi';

const EmployeeManagement = props => {
  const { unitId } = props;
  const hasAccess = !unitId;

  const handleActivationLabel = status => {
    const unitStatus = {
      ACTIVE: 'غیرفعال‌سازی',
      INACTIVE: 'فعال‌سازی',
    };
    return unitStatus[status];
  };
  const refreshTable = () => {
    kianTableApi(EMPLOYEE_MANAGEMENT_TABLE).refreshTable();
  };

  const sendActivationInUnitEmployeeStatus = data => {
    branchManagementService.activateEmployeeInUnit(data.unitEmployeeId);
    refreshTable();
  };

  const sendInactivationInUnitEmployeeStatus = data => {
    branchManagementService.inactivateEmployeeInUnit(data.unitEmployeeId);
    refreshTable();
  };

  const sendInactivationInOrganizationEmployeeStatus = data => {
    branchManagementService.InactivateEmployeeInOrganization(data.userId);
    refreshTable();
  };

  const activityButton = [
    {
      label: 'کاربر جدید ',
      icon: 'solution',
      authority: Actions.employeRegister,
      action: () =>
        props.showModalAction({
          type: MODAL_FOR_ADD_EMPLOYEE,
        }),
    },
  ];
  const contextMenu = [
    {
      label: 'مشاهده',
      icon: 'view',
      authority: Actions.employeeAllRead,
      action: row =>
        props.showModalAction({
          type: DRAWER_FOR_VIEW_EMPLOYEE_INFO,
          props: {
            data: row,
          },
        }),
    },
    {
      label: rowData => handleActivationLabel(rowData?.unitEmployeeStatus),
      authority: Actions.employeeActivate,
      action: data =>
        props.showModalAction({
          type: MODAL_FOR_TOGGLE_EMPLOYEE_ACTIVATION,
          props: {
            data,
          },
        }),
    },
    ...(hasAccess
      ? [
          {
            label: 'ویرایش',
            icon: 'edit',
            authority: Actions.employeRegister,
            action: row =>
              props.showModalAction({
                type: MODAL_FOR_EDIT_EMPLOYEE,
                props: {
                  data: row,
                },
              }),
          },
        ]
      : []),
    {
      label: row => (
        <CPPopConfirm
          okText="بلی"
          cancelText="خیر"
          title="آیا از فعال کردن این شخص اطمینان دارید ؟"
          onConfirm={() => {
            sendActivationInUnitEmployeeStatus(row);
          }}
          placement="topRight"
        >
          فعال کردن در واحد
        </CPPopConfirm>
      ),
      authority: Actions.employeeAllRead,
      action: () => {},
    },
    {
      label: row => (
        <CPPopConfirm
          okText="بلی"
          cancelText="خیر"
          title="آیا از غیرفعال کردن این شخص در واحد اطمینان دارید ؟"
          onConfirm={() => {
            sendInactivationInUnitEmployeeStatus(row);
          }}
          placement="topRight"
        >
          غیرفعال کردن در واحد
        </CPPopConfirm>
      ),
      authority: Actions.employeeAllRead,
      action: () => {},
    },
    {
      label: row => (
        <CPPopConfirm
          okText="بلی"
          cancelText="خیر"
          title="آیا از غیرفعال کردن این شخص در کل سازمان اطمینان دارید ؟"
          onConfirm={() => {
            sendInactivationInOrganizationEmployeeStatus(row);
          }}
          placement="topRight"
        >
          غیرفعال کردن در کل سازمان
        </CPPopConfirm>
      ),
      authority: Actions.employeeAllRead,
      action: () => {},
    },
  ];

  return (
    <>
      <KianTable
        withSearch={false}
        endpoint={
          !unitId
            ? `${resolveVariable(
                BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
              )}/employee?sortDirection=DESC`
            : `${resolveVariable(
                BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
              )}/employee?sortDirection=DESC&unitId=${unitId}`
        }
        activityButton={hasAccess && activityButton}
        withSort={false}
        tableId={EMPLOYEE_MANAGEMENT_TABLE}
        columns={columns}
        headerTitle="مدیریت کارمندان"
        contextMenu={contextMenu}
        persistInLocalStorage={false}
      />
    </>
  );
};
EmployeeManagement.propTypes = {
  showModalAction: PropTypes.func.isRequired,
  unitId: PropTypes.string,
};
EmployeeManagement.defaultProps = {
  unitId: '',
};

export default withModal(EmployeeManagement);
