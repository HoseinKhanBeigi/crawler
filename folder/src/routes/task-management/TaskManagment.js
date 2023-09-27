import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { columns } from './tableData';
import searchData from './searchShema';
import withModal from '../../components/HOC/withModal';
import { kianTableApi } from '../../components/KianTable/helpers/globalApi';
import KianTable from '../../components/KianTable/KianTable';
import branchManagementService from '../../service/branchManagementService';
import { TASK_MANAGEMENT_TABLE } from '../../store/settings/settings.constants';
import {
  DRAWER_FOR_SHOW_AND_UPDATE_TASK,
  MODAL_FOR_CHNAGE_TASK_STATUS,
  MODAL_FOR_ADD_TASK,
  MODAL_FOR_DELETE_TASK,
  DRAWER_FOR_TASK_TAGGING,
} from '../../components/ModalRoot/repository';
import { Actions } from '../../utils/aclActions';
import { getTagsAction } from '../../store/tag/tag.actions';

const TaskManagment = props => {
  const endPoint = {
    allTasks: 'task-management/search?sort=createdDate,desc',
    assignedTasks: `task-management/search?sort=createdDate,desc&isAssigneeCurrentUser=true`,
    createdTasks: `task-management/search?sort=createdDate,desc&isCreatorCurrentUser=false`,
  };
  const [crmLeadUsers, setCrmLeadUsers] = useState([]);
  const [endpoint, setEndPoint] = useState(endPoint.allTasks);

  useEffect(() => {
    props.getTagsAction();
    branchManagementService.getAllCurrentUnitEmployee().then(response => {
      if (response.additionalInfo) {
        delete response.additionalInfo;
      }
      const crmUser = Object.values(response.result);
      setCrmLeadUsers(crmUser);
    });
  }, []);

  const handleFilter = async value => {
    await setEndPoint(endPoint[value]);
    kianTableApi(TASK_MANAGEMENT_TABLE).refreshTable();
  };

  const filterButton = {
    onChange: handleFilter,
    defaultValue: 'allTasks',
    buttons: [
      {
        label: 'همه کارها',
        value: 'allTasks',
      },
      {
        label: 'کارهای محول شده به من',
        value: 'assignedTasks',
      },
      {
        label: 'کارهای ایجاد شده',
        value: 'createdTasks',
      },
    ],
  };

  const showModal = type => modalProps => () => {
    props.showModalAction({
      type,
      props: modalProps,
    });
  };

  const activityButton = [
    {
      label: 'ایجاد کار جدید',
      icon: 'usergroup-add',
      authority: Actions.createTask,
      action: () =>
        props.showModalAction({
          type: MODAL_FOR_ADD_TASK,
          props: {
            byCard: false,
          },
        }),
    },
  ];

  const contextMenu = [
    {
      label: 'مشاهده',
      authority: Actions.showTask,
      action: row =>
        showModal(DRAWER_FOR_SHOW_AND_UPDATE_TASK)({
          data: row,
        })(),
    },
    {
      label: ' برچسب زدن',
      authority: Actions.showTask,
      action: row =>
        showModal(DRAWER_FOR_TASK_TAGGING)({
          data: row,
        })(),
    },
    {
      label: 'تغییر وضعیت',
      icon: 'edit',
      authority: Actions.updateTaskStatus,
      action: row => {
        showModal(MODAL_FOR_CHNAGE_TASK_STATUS)({
          data: row,
        })();
      },
    },
    {
      label: () => <div style={{ color: 'red' }}>حذف</div>,
      icon: 'delete',
      authority: Actions.deleteTask,
      action: row =>
        showModal(MODAL_FOR_DELETE_TASK)({
          data: row,
        })(),
    },
  ];

  return (
    <>
      <KianTable
        endpoint={endpoint}
        searchData={searchData(crmLeadUsers, props.tags)}
        activityButton={activityButton}
        toggleButton={filterButton}
        withSort={false}
        contextMenu={contextMenu}
        tableId={TASK_MANAGEMENT_TABLE}
        columns={columns}
        headerTitle="مدیریت کارها"
        persistInLocalStorage={false}
      />
    </>
  );
};
TaskManagment.defaultProps = {};
TaskManagment.propTypes = {
  showModalAction: PropTypes.func.isRequired,
  getTagsAction: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired,
};
const mapDispatch = {
  getTagsAction,
};

const mapState = state => ({
  applications: state.applications.data,
  templates: state.phoneCalls.call,
  tags: state.tag?.data?.content,
});
export default connect(mapState, mapDispatch)(withModal(TaskManagment));
