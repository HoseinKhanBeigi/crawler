import React from 'react';
import PropTypes from 'prop-types';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import s from './Branches.scss';
import KianTable from '../../components/KianTable';
import { tableColumns } from './utils/tableColumns';
import { BRANCHES_LIST_TABLE } from '../../store/settings/settings.constants';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../serviceConfig';
import withModal from '../../components/HOC/withModal';
import {
  DRAWER_FOR_VIEW_UNIT_DETAIL,
  MODAL_FOR_ADD_BRANCH,
  MODAL_FOR_DELETE_UNIT,
  MODAL_FOR_EDIT_UNIT,
  MODAL_FOR_TOGGLE_UNIT_ACTIVATION,
} from '../../components/ModalRoot/repository';
import { kianTableApi } from '../../components/KianTable/helpers/globalApi';
import { unitToggleActivationLabel } from '../../components/Unit/utils/unitHelpers';
import unitSearchSchema from '../../components/Unit/utils/unitSearchSchema';
import useUnit from '../../components/Unit/hooks/useUnit';
import history from '../../history';
import { Actions } from '../../utils/aclActions';

const unitType = 'BRANCH';

const Branches = ({ title: tableTitle, ...props }) => {
  const { parentId } = props;
  const {
    searchLeadResult,
    cities,
    provinces,
    searchLeadHandler,
    filterCitiesHandler,
  } = useUnit();

  const refreshTable = () => {
    kianTableApi(BRANCHES_LIST_TABLE).refreshTable();
  };

  const activityButton = [
    {
      label: 'شعبه جدید',
      authority: Actions.branchCreate,
      icon: 'plus',
      action: () =>
        props.showModalAction({
          type: MODAL_FOR_ADD_BRANCH,
        }),
    },
  ];

  const showModal = type => modalProps => () => {
    props.showModalAction({
      type,
      props: modalProps,
    });
  };

  const generateContextMenu = () => {
    const defaults = [
      {
        label: `مشاهده`,
        authority: Actions.branchFindByCode,
        action: data =>
          showModal(DRAWER_FOR_VIEW_UNIT_DETAIL)({
            data,
            unitType,
          })(),
      },
      {
        label: 'لیست کارمندان',
        authority: Actions.employeeAllRead,
        action: row => history.push(`/employee-management/${row.id}`),
      },
      {
        label: 'لیست کارگزار ها',
        authority: Actions.employeeAllRead,
        action: row => history.push(`/agents/${row.id}`),
      },
    ];
    if (!parentId) {
      defaults.push(
        {
          label: 'ویرایش',
          authority: Actions.branchCreate,
          action: row =>
            props.showModalAction({
              type: MODAL_FOR_EDIT_UNIT,
              props: {
                data: row,
                unitType,
              },
            }),
        },
        {
          label: rowData => unitToggleActivationLabel(rowData?.status),
          authority: Actions.branchChangeStatus,
          action: data =>
            showModal(MODAL_FOR_TOGGLE_UNIT_ACTIVATION)({
              data,
              unitType,
              onStatusChange: refreshTable,
            })(),
        },
        {
          label: () => <p style={{ color: 'red' }}>حذف</p>,
          authority: Actions.branchDelete,
          action: row =>
            props.showModalAction({
              type: MODAL_FOR_DELETE_UNIT,
              props: {
                data: row,
                unitType,
                onFinish: refreshTable,
              },
            }),
        },
      );
    }
    return defaults;
  };

  return (
    <div className={s.wrapper}>
      <KianTable
        headerTitle={tableTitle}
        title={tableTitle}
        withSort={false}
        endpoint={
          parentId
            ? `${resolveVariable(
                BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
              )}/branch?example.unitType=${unitType}&sortDirection=DESC&example.parentId=${parentId}`
            : `${resolveVariable(
                BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
              )}/branch?example.unitType=${unitType}&sortDirection=DESC`
        }
        searchData={unitSearchSchema({
          cities,
          onSearchLead: searchLeadHandler,
          searchLeadResult,
          onFilterCities: filterCitiesHandler,
          provinces,
          unitType,
        })}
        columns={tableColumns}
        activityButton={!parentId && activityButton}
        tableId={BRANCHES_LIST_TABLE}
        contextMenu={generateContextMenu()}
        persistInLocalStorage={false}
      />
    </div>
  );
};

Branches.propTypes = {
  showModalAction: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  parentId: PropTypes.string,
};
Branches.defaultProps = {
  parentId: '',
};

export default withStyle(s)(withModal(Branches));
